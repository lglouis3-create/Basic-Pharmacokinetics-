#!/usr/bin/env python3
"""Check every slide number cited anywhere in the bank against the real deck.

A citation drifts silently: the text stays plausible and only the number is
wrong, so reading does not catch it. This reads the page count of each deck on
hand and reports any cited slide that falls outside it, plus any deck named in a
citation that is not on hand to check.

Citations are scanned in `cite`, `teach`, `note`, every option's `why`, every
numeric step's `why` and every match pair's `why`, since slide numbers appear in
all of them.

The decks are the course owner's own files and are not part of this repository,
so with no PDFs present this check prints SKIP and exits 0. It only means
something where the decks are.

    python3 cite_check.py
"""
import glob, json, os, re, subprocess, sys

try:
    import pdfplumber
except ImportError:
    pdfplumber = None

HERE = os.path.dirname(os.path.abspath(__file__))

# Where to look for the lecture PDFs: a decks/ subdirectory, then here.
DECK_DIRS = ["decks", "."]

# ---------------------------------------------------------------------------
# COURSE-SPECIFIC TABLES. All three are empty on purpose.
# ---------------------------------------------------------------------------
# How a citation spells a deck -> the file on disk. Fill this in when a
# citation's spelling of a filename differs from the file's real name, or map a
# name to None to say "this deck exists but is not on hand, do not report it".
#   "introduction.pdf": "Introduction.pdf",
ALIASES = {}

# Lecture number -> file, for citations that say "Lecture #3" rather than
# naming the PDF. Keys are strings.
#   "1": "Introduction.pdf",
LECTURES = {}

# A citation may name a deck in words rather than by filename, as in
# "... slides 13; Absorption slide 24". BARE_DECK is the pattern that finds
# those names and BARE_MAP turns each one into a file on disk.
#   BARE_DECK = re.compile(r"\b(Introduction|IV Bolus)\b")
#   BARE_MAP = {"Introduction": "Introduction.pdf"}
BARE_DECK = None
BARE_MAP = {}
# ---------------------------------------------------------------------------

PDF_IN_TEXT = re.compile(r"([A-Za-z0-9_.\-]+\.pdf)", re.I)
LECTURE_IN_TEXT = re.compile(r"[Ll]ecture\s*#\s*(\d+)")
# "slide 34", "slides 29-30", "slides 46, 50, 56", "slides 42 to 62"
SLIDES = re.compile(r"slides?\s+((?:\d+\s*(?:[-–]|,|and|to)?\s*)+)", re.I)


def course_output():
    """The built file, named in course.js and nowhere else."""
    src = open(os.path.join(HERE, "course.js"), encoding="utf-8").read()
    m = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", src)
    if not m:
        sys.exit("ERROR: course.js declares no output")
    return "/mnt/user-data/outputs/" + m.group(1)


def page_counts():
    counts = {}
    for d in DECK_DIRS:
        for f in glob.glob(os.path.join(HERE, d, "*.pdf")):
            name = os.path.basename(f)
            if name in counts:
                continue
            try:
                with pdfplumber.open(f) as doc:
                    counts[name] = len(doc.pages)
            except Exception:
                pass
    return counts


def load_questions(out):
    """Read the bank out of the built page, the same way the node checks do."""
    js = r"""
      const fs=require('fs'),vm=require('vm');
      let c=[...fs.readFileSync(process.argv[1],'utf8')
        .matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
      const b=c.lastIndexOf('   BOOT'); c=c.slice(0,c.lastIndexOf('/* ===',b));
      c+='\nglobalThis.__Q=QUESTIONS;';
      const sb={console,localStorage:{getItem:()=>null,setItem(){},removeItem(){}},
        document:{querySelector:()=>({}),querySelectorAll:()=>[],getElementById:()=>({}),
                  createElement:()=>({}),body:{}},window:{},prompt:()=>'x',
        setTimeout:()=>0,clearTimeout(){},Date,Math,JSON,Object,Array,String,Number,
        Boolean,RegExp,Error,isNaN,parseInt,parseFloat};
      sb.globalThis=sb;vm.createContext(sb);vm.runInContext(c,sb);
      const tt=t=>Array.isArray(t)?t.map(p=>[p.h,p.t,...(p.list||[])].filter(Boolean).join('. ')).join(' '):(t||'');
      process.stdout.write(JSON.stringify(sb.__Q.map(q=>({
        id:q.id, cite:q.cite||'', teach:tt(q.teach), note:q.note||'',
        whys:[...(q.options||[]).map(o=>o.why||''),
              ...(q.steps||[]).map(s=>s.why||''),
              ...(q.pairs||[]).map(p=>p.why||'')]}))));
    """
    res = subprocess.run(["node", "-e", js, out], capture_output=True, text=True)
    if res.returncode != 0:
        sys.exit("ERROR: could not read the built page\n" + res.stderr.strip())
    return json.loads(res.stdout)


def resolve(name):
    """A deck as written in a citation -> the file on disk, or None."""
    key = name.lower()
    if key in ALIASES:
        return ALIASES[key]
    return name


def main():
    out = course_output()
    if not os.path.exists(out):
        print("\n=== Citation check ===")
        print(f"  SKIP: {out} does not exist — run build.py first.")
        return 0
    if pdfplumber is None:
        print("\n=== Citation check ===")
        print("  SKIP: pdfplumber is not installed, so no deck can be paged through.")
        return 0

    counts = page_counts()
    if not counts:
        print("\n=== Citation check ===")
        print("  SKIP: no lecture PDFs found under " +
              " or ".join(os.path.join(d) for d in DECK_DIRS) + ".")
        print("  The decks are the course's own files and are not part of this")
        print("  repository, so this check only means something where they are present.")
        return 0

    qs = load_questions(out)

    bad, unchecked, checked = [], {}, 0
    for q in qs:
        fields = [("cite", q["cite"]), ("teach", q["teach"]), ("note", q["note"])]
        fields += [(f"why {i}", w) for i, w in enumerate(q["whys"])]
        for field, text in fields:
            if not text:
                continue
            # walk the text, remembering the most recent deck named before each
            # slide reference, since one citation can name two decks
            marks = []
            for m in PDF_IN_TEXT.finditer(text):
                marks.append((m.start(), resolve(m.group(1)), m.group(1)))
            for m in LECTURE_IN_TEXT.finditer(text):
                marks.append((m.start(), LECTURES.get(m.group(1)), "Lecture #" + m.group(1)))
            if BARE_DECK is not None:
                for m in BARE_DECK.finditer(text):
                    marks.append((m.start(), BARE_MAP.get(m.group(1)), m.group(1)))
            marks.sort()
            for sm in SLIDES.finditer(text):
                prior = [x for x in marks if x[0] < sm.start()]
                if not prior:
                    continue
                _, fname, shown = prior[-1]
                nums = [int(n) for n in re.findall(r"\d+", sm.group(1))]
                if fname is None or fname not in counts:
                    unchecked[shown] = unchecked.get(shown, 0) + 1
                    continue
                n = counts[fname]
                checked += len(nums)
                over = [x for x in nums if x < 1 or x > n]
                if over:
                    bad.append((q["id"], field, shown, fname, n, over))

    print("\n=== Citation check ===")
    print(f"  {checked} slide references checked against {len(counts)} decks on hand")
    if unchecked:
        print("\n  decks named but not on hand (references not checked):")
        for k, v in sorted(unchecked.items(), key=lambda kv: -kv[1]):
            print(f"    {v:>4}  {k}")
    if bad:
        print(f"\n  {len(bad)} citation(s) point past the end of their deck:")
        for qid, field, shown, fname, n, over in bad:
            print(f"    {qid:10s} {field:8s} {shown} has {n} slides, cites {over}")
        return 1
    if checked:
        print("\n  every checked slide number exists in its deck")
        return 0
    print("\n  SKIP: decks were found but no citation named one of them")
    return 0


if __name__ == "__main__":
    sys.exit(main())
