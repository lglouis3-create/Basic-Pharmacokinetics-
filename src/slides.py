#!/usr/bin/env python3
"""Put the slide a question cites into that question's explanation.

A citation names a deck and a slide, either by the slide's own printed number
("Introduction.pdf slide 17") or by its title ('2IVBolusAdministration.pdf,
slide "Volume of Distribution"'). This resolves both to a page of the PDF,
renders that page, and stores it in images.json so the question can show it.

The printed number is not the PDF page number. Her decks carry a title page
and unnumbered poll slides that the deck's own numbering skips, so printed
slide 17 of Introduction.pdf is PDF page 20. The number printed in the footer
is what a citation means and what this file matches on.

The rendered slide is attached as `teachImg`, which the drill shows only after
an answer is submitted. It is never attached as `img`, which appears beside
the stem, because a slide frequently carries the answer to the question asked
about it.

    python3 slides.py --report     # resolve every citation, write nothing
    python3 slides.py              # resolve, render, update images.json

The decks are the course owner's own files and are not in this repository, so
with decks/ absent this prints SKIP and changes nothing.
"""
import argparse
import base64
import io
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DECKS = os.path.join(HERE, 'decks')
WIDTH = 880           # rendered width in pixels
QUALITY = 62          # WebP quality
MAX_PRINTED = 60      # a footer number larger than this is a date or a stray

# Regions painted out of a rendered slide, as fractions of the page
# (left, top, right, bottom). Used where a handwritten note on the slide
# contradicts what the question keys, which would leave a reader holding two
# answers with nothing to choose between them. Nothing else on the slide is
# touched, and a note on the question says what was covered and why.
MASKS = {
    # "Changing Dose": the third bullet of the handwritten block reads "rate
    # constant increases". Raising the dose raises the rates of absorption and
    # elimination; ka and k do not move. m5-c22 keys exactly that distinction.
    ('5---Pharmacokinetics-of-Oral-Absorption.pdf', 18): [(0.706, 0.383, 0.851, 0.428)],
}

# Slide titles the extractor cannot read, because an equation on the slide is
# set in larger type than the title and is taken for it. Checked against the
# rendered pages. (deck, title as printed) -> PDF page.
TITLE_PAGES = {
    ('6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf',
     'Drug accumulation with repeated administration'): 3,
    ('6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf',
     'Amount of Drug in the Body Following Repeated IV Bolus Injections'): 6,
    ('6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf',
     'Plasma Drug Concentration at Any Time After n Doses'): 14,
    ('6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf',
     'Plasma Drug Concentration at Steady State'): 17,
}

QUESTION_FILES = ['q1_module1.js', 'q2_module2.js', 'q3_module3.js',
                  'q4_module4.js', 'q5_module5.js', 'q7_module6.js', 'q6_figures.js']
ARRAYS = ['Q_MODULE1', 'Q_MODULE2', 'Q_MODULE3', 'Q_MODULE4', 'Q_MODULE5', 'Q_MODULE6', 'Q_FIGURES']


def norm(s):
    """Fold a slide title for matching: lower case, letters and digits only."""
    return re.sub(r'[^a-z0-9]+', ' ', (s or '').lower()).strip()


def deck_index(path):
    """(printed slide number -> page, normalised title -> page) for one deck."""
    import pdfplumber
    numbers, titles = {}, {}
    with pdfplumber.open(path) as doc:
        for i, page in enumerate(doc.pages, start=1):
            h = page.height
            words = page.extract_words(extra_attrs=['size']) or []
            # the printed slide number sits in the footer band, on the right
            feet = [w for w in words
                    if w['bottom'] > h * 0.88 and w['text'].strip().isdigit()
                    and 0 < int(w['text'].strip()) <= MAX_PRINTED]
            if feet:
                n = int(sorted(feet, key=lambda w: -w['x0'])[0]['text'])
                numbers.setdefault(n, i)
            # the title is the run of largest type nearest the top
            body = [w for w in words if (w.get('size') or 0) > 0]
            if body:
                mx = max(w['size'] for w in body)
                top = [w for w in body if w['size'] >= mx - 0.6]
                top.sort(key=lambda w: (round(w['top'] / 6), w['x0']))
                t = norm(' '.join(w['text'] for w in top))
                if len(t) > 3:
                    titles.setdefault(t, i)
    for (deck, title), page in TITLE_PAGES.items():
        if os.path.basename(path) == deck:
            titles[norm(title)] = page
    return numbers, titles


def load_bank():
    js = ';'.join(f'require("{os.path.join(HERE, f)}")' for f in [])  # not a module
    src = '\n'.join(open(os.path.join(HERE, f), encoding='utf-8').read() for f in QUESTION_FILES)
    src += ('\nconsole.log(JSON.stringify([].concat(' + ','.join(ARRAYS)
            + ').map(q=>({id:q.id,cite:q.cite,teachImg:q.teachImg||null}))));')
    tmp = os.path.join(HERE, '.bank_tmp.js')
    open(tmp, 'w', encoding='utf-8').write(src)
    try:
        r = subprocess.run(['node', tmp], capture_output=True, text=True, check=True)
        return json.loads(r.stdout)
    finally:
        os.unlink(tmp)


def resolve(cite, decks, index):
    """A citation -> (deck file, page) or (deck file, None) or (None, None)."""
    deck = next((d for d in decks if d in (cite or '')), None)
    if not deck:
        return None, None, 'no deck named'
    numbers, titles = index[deck]
    m = re.search(r'slides?\s+(\d+)', cite, re.I)
    if m:
        n = int(m.group(1))
        pg = numbers.get(n)
        return deck, pg, ('printed slide %d' % n if pg else 'printed slide %d not found' % n)
    q = re.search(r'["“]([^"”]{4,})["”]', cite)
    if q:
        want = norm(q.group(1))
        if want in titles:
            return deck, titles[want], 'title exact'
        hit = next((p for t, p in titles.items() if t.startswith(want) or want.startswith(t)), None)
        if hit:
            return deck, hit, 'title prefix'
        # Subscripts are lost by text extraction, so "Effect of ka and k on
        # Cmax, tmax and AUC" comes off the slide as "effect of k and k on c t
        # and auc". Compare the word sets instead, and accept only a clear
        # single best match.
        wset = set(want.split())
        scored = []
        for t, p in titles.items():
            tset = set(t.split())
            if not tset:
                continue
            share = len(wset & tset) / min(len(wset), len(tset))
            scored.append((share, len(wset & tset), p, t))
        scored.sort(reverse=True)
        if scored and scored[0][0] >= 0.6 and scored[0][1] >= 3 and (
                len(scored) == 1 or scored[0][0] - scored[1][0] >= 0.15):
            return deck, scored[0][2], 'title by word overlap'
        return deck, None, 'title %r not found' % q.group(1)[:32]
    return deck, None, 'no slide named'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--report', action='store_true', help='resolve only, write nothing')
    a = ap.parse_args()

    if not os.path.isdir(DECKS) or not os.listdir(DECKS):
        print('\n=== Slide images ===')
        print('  SKIP: no decks/ directory. The lecture PDFs are the course owner\'s')
        print('  own files and are not part of this repository.')
        return 0

    import pymupdf
    import PIL.Image
    import PIL.ImageDraw

    files = sorted(f for f in os.listdir(DECKS) if f.lower().endswith('.pdf'))
    index = {f: deck_index(os.path.join(DECKS, f)) for f in files}
    print('\n=== Slide images ===')
    for f in files:
        n, t = index[f]
        print(f'  {f[:44]:44s} {len(n):3d} numbered, {len(t):3d} titled')

    bank = load_bank()
    wanted, per_q, unresolved = {}, {}, []
    for q in bank:
        deck, page, how = resolve(q['cite'], files, index)
        if not deck or not page:
            unresolved.append((q['id'], how, (q['cite'] or '')[:58]))
            continue
        key = 'slide_' + re.sub(r'[^A-Za-z0-9]+', '', deck.replace('.pdf', ''))[:18] + '_p%d' % page
        wanted[key] = (deck, page)
        per_q[q['id']] = key

    print(f'\n  {len(per_q)} of {len(bank)} questions resolve to a slide; '
          f'{len(wanted)} distinct slides')
    if unresolved:
        by = {}
        for _, how, _ in unresolved:
            by[how.split(' not found')[0][:28]] = by.get(how.split(' not found')[0][:28], 0) + 1
        print('  unresolved, by reason:')
        for k, v in sorted(by.items(), key=lambda kv: -kv[1]):
            print(f'    {v:4d}  {k}')
        for row in unresolved[:6]:
            print(f'       {row[0]:12s} {row[1][:34]:34s} {row[2]}')

    if a.report:
        return 0

    images = json.load(open(os.path.join(HERE, 'images.json')))
    drawn = {k: v for k, v in images.items() if not k.startswith('slide_')}
    out = dict(drawn)
    total = 0
    for key, (deck, page) in sorted(wanted.items()):
        doc = pymupdf.open(os.path.join(DECKS, deck))
        pg = doc[page - 1]
        s = WIDTH / pg.rect.width
        pix = pg.get_pixmap(matrix=pymupdf.Matrix(s, s))
        img = PIL.Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        for x0, y0, x1, y1 in MASKS.get((deck, page), []):
            PIL.ImageDraw.Draw(img).rectangle(
                [int(x0 * img.width), int(y0 * img.height),
                 int(x1 * img.width), int(y1 * img.height)], fill='white')
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=QUALITY, method=6)
        raw = buf.getvalue()
        total += len(raw)
        out[key] = 'data:image/webp;base64,' + base64.b64encode(raw).decode('ascii')
    json.dump(out, open(os.path.join(HERE, 'images.json'), 'w'), indent=0, sort_keys=True)
    json.dump(per_q, open(os.path.join(HERE, '.slide_refs.json'), 'w'), indent=0, sort_keys=True)
    print(f'\n  {len(wanted)} slides rendered at {WIDTH}px, {total/1024/1024:.2f} MB '
          f'({total/max(1,len(wanted))/1024:.0f} KB each), plus {len(drawn)} drawn figures')
    print('  images.json written; .slide_refs.json maps question id -> image key')
    return 0


if __name__ == '__main__':
    sys.exit(main())
