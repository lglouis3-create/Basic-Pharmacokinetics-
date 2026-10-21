#!/usr/bin/env python3
"""The Worksheets tab and the worksheet PDFs (gen/sheets.py).

Gate:
  - every source with questions has its worksheet and solutions PDF (and, for
    homework with changed-number sets, the changed pair); each opens and has pages;
    sheets/manifest.json matches the current print markup, so no PDF is stale;
  - in every worksheet, every part's label is printed, its text starts on the
    page its label is on, and none of it continues onto another page (text
    positions in the PDF, read with pymupdf);
  - in the print layout, every calculation part has at least 70 mm to work in
    and every other part at least 25 mm;
  - a worksheet carries no solutions heading, answer line or key label; a
    solutions file starts its solutions on a new page, with one answer per part;
  - every link on the tab resolves: a PDF path exists under sheets/, a Drive
    link carries a well-formed file id; every "From:" line under an answer
    links a worksheet that exists;
  - the tab renders at 390 px and 1100 px, light and dark: no page error, no
    sideways scroll, no "undefined" or "NaN";
  - no PDF's text matches a private name pattern (decks/private_names.txt,
    gitignored; SKIP without it) or an e-mail address.

Report only (never fails): each worksheet part against her verbatim stems in
STYLE.md, by a fuzzy match, listing the parts STYLE.md quotes with different
wording; and the sources whose original is missing.

    python3 sheets_test.py [--shots DIR]
"""
import argparse
import difflib
from collections import Counter
import hashlib
import json
import os
import re
import sys

import pymupdf
from playwright.sync_api import sync_playwright

from browser_test import course_output

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DRIVE_ID = re.compile(r'^[A-Za-z0-9_-]{25,64}$')
MM = 96 / 25.4
fails = []


def check(ok, label, detail=''):
    print(('  ok    ' if ok else '  FAIL  ') + label + (f'  — {detail}' if detail and not ok else ''))
    if not ok:
        fails.append(label)


def norm(t):
    return re.sub(r'\W+', '', str(t).lower())


PARTS = """([src, mode]) => {
  document.documentElement.setAttribute('data-theme', 'light');
  document.body.className = 'wsprint';
  document.body.innerHTML = sheetHTML(src, mode);
  const mm = r => r.height / (96 / 25.4);
  return [...document.querySelectorAll('.wspart')].map(p => ({
    label: p.dataset.label, qid: p.dataset.qid, calc: p.classList.contains('calc'),
    work: mm(p.querySelector('.wswork').getBoundingClientRect()),
    head: p.querySelector('.wsq').innerText, all: p.innerText,
    caseText: (p.closest('.wsgroup').querySelector('.wscase') || {innerText: ''}).innerText,
    text: p.querySelector('.wstext').innerText,
    last: ([...p.querySelectorAll('.wsopts li, .wsright li')].pop() || p.querySelector('.wstext')).innerText}));
}"""


def pdf_pages(path):
    doc = pymupdf.open(path)
    return [pg.get_text() for pg in doc]


def locate(pages, parts):
    """For each part, the page its label and first words are on and the page its last words are on."""
    flat, starts = '', []
    for t in pages:
        starts.append(len(flat))
        flat += norm(t)
    page_at = lambda i: max(k for k, s in enumerate(starts) if s <= i)
    pos, out = 0, []
    for p in parts:
        head = norm(p['head'])[:40]
        i = flat.find(head, pos)
        if i < 0:
            out.append((p, None, None))
            continue
        tail = norm(p['last'])[-30:]
        j = flat.find(tail, i)
        out.append((p, page_at(i), page_at(j + len(tail) - 1) if j >= 0 else None))
        pos = i + len(head)
    return out


def style_quotes():
    """Her verbatim stems in STYLE.md: blockquote paragraphs, and the lines and list items in them."""
    paras, cur, single = [], [], []
    for line in open(os.path.join(HERE, 'STYLE.md'), encoding='utf-8'):
        if line.startswith('>'):
            cur.append(line[1:].strip())
            single.append(line[1:].strip())
        elif re.match(r'^- (?:\(?[a-z]\)|[a-z]\.|\d+\.) ', line):      # her parts, listed under "What is asked"
            single.append(line[2:].strip())
        elif cur:
            paras.append(' '.join(cur)); cur = []
    if cur:
        paras.append(' '.join(cur))
    lines = [x for x in single if len(x) > 20]
    for p in paras:
        lines += [x for x in re.split(r'(?<=[.?:])\s+(?=[a-z]\.\s|\(?[a-z]\)\s|\d+\.\s)', p) if len(x) > 20]
    def words(t):
        w = re.sub(r'[^\w.%]+', ' ', re.sub(r'[*_✔\\]', '', t.lower())).split()
        while w and re.fullmatch(r'(?:\d{1,2}|[a-z])\.?', w[0]):      # a leading "4." or "a."
            w = w[1:]
        return w
    return [(q, words(q)) for q in paras + lines], words


def word_diff(a, b):
    """Where the sheet's words differ from the quote's, inside the stretch they share."""
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    bl = [x for x in sm.get_matching_blocks() if x.size]
    lo, hi = (bl[0].b, bl[-1].b + bl[-1].size) if bl else (0, len(b))
    out = []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op != 'equal' and j2 >= lo and j1 <= hi:
            out.append(f"sheet [{' '.join(a[i1:i2])}] / STYLE [{' '.join(b[j1:j2])}]")
    return '; '.join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--shots')
    args = ap.parse_args()
    page_path = os.path.join(ROOT, os.path.basename(course_output()))
    names_file = os.path.join(HERE, 'decks', 'private_names.txt')
    names = [re.compile(l.strip(), re.I) for l in open(names_file, encoding='utf-8') if l.strip()] \
        if os.path.exists(names_file) else None
    email = re.compile(r'[\w.+-]+@[\w-]+\.[\w.]+')

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={'width': round((215.9 - 30) * MM), 'height': 1000}, color_scheme='light')
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.goto('file://' + page_path)
        page.wait_for_function("typeof sheetHTML === 'function'")
        files = page.evaluate('sheetFiles()')
        sources = page.evaluate("SRC_LIST.map(s => ({id: s.id, title: s.title, type: s.type, drive: s.drive, missing: s.missing, n: (s.items || []).length, variants: sheetVariants(s), changedSets: sheetPlan(s).changed.length}))")
        from_links = page.evaluate("Object.keys(SRC_OF).map(id => { const q = byId(id); return q ? [id, fromLineHTML(q)] : [id, '']; })")
        style = page.evaluate("[...document.querySelectorAll('style')].map(s => s.textContent).join('')")
        page.emulate_media(media='print', color_scheme='light')

        print('\n=== Every source has its PDFs ===')
        have = {(f['src'], f['variant'], f['sol']): f for f in files}
        for s in sources:
            if not s['n']:
                check(False, f"{s['id']}: has questions", s['missing'] or 'no items')
                continue
            need = [('main', False), ('main', True)] + ([('changed', False), ('changed', True)] if s['changedSets'] else [])
            miss = [f'{v}{" solutions" if sol else ""}' for v, sol in need if (s['id'], v, sol) not in have]
            check(not miss, f"{s['id']}: worksheet and solutions named", ', '.join(miss))
        manifest = json.load(open(os.path.join(ROOT, 'sheets', 'manifest.json'), encoding='utf-8')).get('files', {}) \
            if os.path.exists(os.path.join(ROOT, 'sheets', 'manifest.json')) else {}
        bad_open, stale, pages_of = [], [], {}
        for f in files:
            path = os.path.join(ROOT, f['path'])
            try:
                pages_of[f['path']] = pdf_pages(path)
                if not pages_of[f['path']]:
                    bad_open.append(f['path'] + ' (no pages)')
            except Exception as e:      # missing or unreadable
                bad_open.append(f"{f['path']} ({type(e).__name__})")
            markup = page.evaluate('([s, m]) => sheetHTML(s, m)', [f['src'], f['mode']])
            if manifest.get(f['path']) != hashlib.sha256((style + '\0' + markup).encode('utf-8')).hexdigest():
                stale.append(f['path'])
        check(not bad_open, f'all {len(files)} PDFs exist, open and have pages', '; '.join(bad_open[:8]))
        check(not stale, 'every PDF matches the current print markup (gen/sheets.py has run since the build)', ', '.join(stale[:8]))
        extra = [os.path.join(d, fn) for d, _, fs in os.walk(os.path.join(ROOT, 'sheets')) for fn in fs
                 if fn.endswith('.pdf') and os.path.relpath(os.path.join(d, fn), ROOT).replace(os.sep, '/') not in {f['path'] for f in files}]
        check(not extra, 'no PDF in sheets/ that the page does not name', ', '.join(extra[:5]))

        print('\n=== Parts whole, labelled, with room to work ===')
        split, unlabelled, short, leaks, solbad, nparts = [], [], [], [], [], 0
        quotes, words = style_quotes()
        style_report, seen_q = [], set()
        for f in files:
            if f['path'] not in pages_of:
                continue
            parts = page.evaluate(PARTS, [f['src'], f['mode']])
            pages = pages_of[f['path']]
            if not f['sol']:
                nparts += len(parts)
                for p in parts:
                    need = 70 if p['calc'] else 25
                    if p['work'] + 0.5 < need:
                        short.append(f"{f['path']} {p['label']}: {p['work']:.0f} mm")
            # in the solutions file the worksheet pages come first, so the parts are found the same way
            for p, a, b in locate(pages, parts):
                if a is None:
                    unlabelled.append(f"{f['path']} {p['label']} ({p['qid']})")
                elif b != a:
                    split.append(f"{f['path']} {p['label']} ({p['qid']}): page {a + 1} to {'?' if b is None else b + 1}")
            text = '\n'.join(pages)
            if not f['sol']:
                if re.search(r'^\s*Solutions\s*$', text, re.M) or 'Answer:' in text or 'Her key' in text or 'Worked by the drill' in text:
                    leaks.append(f['path'])
                # her verbatim stems, once per question (report only)
                if f['variant'] == 'main':
                    for p in parts:
                        if p['qid'] in seen_q or re.match(r'^(hw\d|hw7-|nl-hw-)', p['qid']):
                            continue
                        seen_q.add(p['qid'])
                        for kind, t in (('case', p['caseText']), ('part', p['text'])):
                            w = words(t)
                            if len(w) < 6:
                                continue
                            # how much of the sheet's wording is found, in order, in one quote
                            best, bq, cw = 0, '', Counter(w)
                            for q, qw in quotes:
                                if len(qw) < len(w) / 2 or len(qw) > 3 * len(w) + 10:
                                    continue
                                bound = sum((cw & Counter(qw)).values()) / len(w)
                                if bound <= best:
                                    continue
                                sm = difflib.SequenceMatcher(None, w, qw, autojunk=False)
                                r = sum(b.size for b in sm.get_matching_blocks()) / len(w)
                                if r > best:
                                    best, bq = r, q
                            if 0.75 <= best < 0.97:
                                style_report.append((f['src'], p['label'], kind, best, word_diff(w, words(bq)), bq))
            else:
                k = next((i for i, t in enumerate(pages) if re.search(r'^\s*Solutions\s*$', t, re.M)), None)
                first = pages[k].strip().split('\n')[0].strip() if k is not None else ''
                n_ans = text.count('Answer:')
                if k is None or first != 'Solutions' or n_ans != len(parts):
                    solbad.append(f"{f['path']} (solutions page {k}, first line {first!r}, {n_ans} answers for {len(parts)} parts)")
        check(not unlabelled, f'every part label and its first words found in its PDF ({nparts} worksheet parts)', '; '.join(unlabelled[:8]))
        check(not split, 'no part runs onto a second page', '; '.join(split[:8]))
        check(not short, 'calculation parts have at least 70 mm to work in, others 25 mm', '; '.join(short[:8]))
        check(not leaks, 'no worksheet carries a solutions heading, an answer line or a key label', ', '.join(leaks[:8]))
        check(not solbad, 'each solutions file starts its solutions on a new page, one answer per part', '; '.join(solbad[:6]))

        print('\n=== Private information in the PDFs ===')
        if names is None:
            print('  SKIP  name scan: decks/private_names.txt is not on this machine')
        hits = []
        for path, pages in pages_of.items():
            text = '\n'.join(pages)
            for k, rx in enumerate(names or []):
                if rx.search(text):
                    hits.append(f'{path}: name pattern #{k + 1}')
            if email.search(text):
                hits.append(f'{path}: an e-mail address')
        check(not hits, f'no PDF text matches a private name pattern or an e-mail address ({len(pages_of)} PDFs)', '; '.join(hits[:8]))

        print('\n=== Links ===')
        page.emulate_media(media='screen')
        page.goto('file://' + page_path)
        page.wait_for_function("typeof renderSheets === 'function'")
        page.click('#nav button[data-v="sheets"]')
        page.wait_for_timeout(200)
        hrefs = page.eval_on_selector_all('#v-sheets a[href]', 'as => as.map(a => [a.getAttribute("href"), a.target])')
        bad = []
        for h, tgt in hrefs:
            if h.startswith('https://drive.google.com/'):
                m = re.match(r'^https://drive\.google\.com/(?:file/d/([^/]+)/view|uc\?export=download&id=(.+))$', h)
                if not m or not DRIVE_ID.match(m.group(1) or m.group(2)):
                    bad.append(h)
            elif not h.startswith('sheets/') or not os.path.exists(os.path.join(ROOT, h)):
                bad.append(h)
            if tgt != '_blank':
                bad.append(h + ' (not target=_blank)')
        check(hrefs and not bad, f'every link on the tab resolves ({len(hrefs)} links)', '; '.join(bad[:6]))
        fbad = []
        for qid, h in from_links:
            if not h:
                continue
            for href in re.findall(r'href="([^"]+)"', h):
                href = href.replace('&amp;', '&')
                if href.startswith('sheets/') and not os.path.exists(os.path.join(ROOT, href)):
                    fbad.append(f'{qid}: {href}')
            if 'From: ' not in h or 'Worksheet</a>' not in h:
                fbad.append(f'{qid}: no From line or no Worksheet link')
        check(not fbad, f'every "From:" line links a worksheet that exists ({len(from_links)} questions)', '; '.join(fbad[:6]))
        btns = page.eval_on_selector_all('#v-sheets [data-srcgo]', 'bs => bs.length')
        page.click('#v-sheets [data-srcgo]')
        page.wait_for_timeout(200)
        check(page.evaluate("VIEW === 'quiz' && !!Q && !!Q.current"), f'Practice in the drill starts a problem set ({btns} buttons)')
        browser.close()

        print('\n=== The tab at 390 and 1100 px, light and dark ===')
        for scheme in ('light', 'dark'):
            for w in (390, 1100):
                b = pw.chromium.launch()
                ctx = b.new_context(viewport={'width': w, 'height': 900}, color_scheme=scheme)
                pg = ctx.new_page()
                errs = []
                pg.on('pageerror', lambda e: errs.append(str(e)))
                pg.goto('file://' + page_path)
                pg.wait_for_timeout(400)
                pg.click('#nav button[data-v="sheets"]')
                pg.wait_for_timeout(200)
                over = pg.evaluate('document.documentElement.scrollWidth - window.innerWidth')
                txt = pg.inner_text('#v-sheets')
                cards = pg.eval_on_selector_all('.srccard', 'cs => cs.length')
                check(not errs and over <= 0 and not re.search(r'\bundefined\b|\bNaN\b', txt) and cards == len(sources),
                      f'{w} px {scheme}: {cards} cards, no error, no sideways scroll, no undefined/NaN',
                      f'errors {errs[:2]}, overflow {over}px, cards {cards}/{len(sources)}')
                if args.shots:
                    os.makedirs(args.shots, exist_ok=True)
                    pg.screenshot(path=os.path.join(args.shots, f'tab-{w}-{scheme}.png'))
                b.close()
        check(not errors, 'no page error while printing the sheets', '; '.join(errors[:3]))

    print('\n=== Report: worksheet text against her verbatim stems in STYLE.md ===')
    print(f'  {len(style_report)} part(s) where STYLE.md quotes the same problem in different words (0.75 to 0.97 of its words found in order):')
    for src, lab, kind, r, d, q in style_report:
        print(f'  {src:10} {lab:12} {kind:4} {r:.2f}  {d[:300]}')
    print('\n=== Report: sources whose original is not on Drive ===')
    for s in sources:
        if not s['drive']:
            print(f"  FLAG  {s['id']}: {s['missing']}")

    print(f"\n{len(fails)} failure(s)" if fails else '\nall checks pass')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
