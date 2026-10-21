#!/usr/bin/env python3
"""Printable worksheets: one PDF pair per source document, made from the built page.

For every file the page's sheetFiles() names (src/views.js, WORKSHEETS), this
loads the built drill in Chromium, prints sheetHTML(source, mode) into a bare
page with the drill's own renderers and stylesheet, measures the print layout,
and writes the PDF with page.pdf() to the repository root:

    sheets/module-<label>/<source>-worksheet.pdf     her problems, with room to work
    sheets/module-<label>/<source>-solutions.pdf     the same pages, then the solutions
    sheets/module-<label>/<source>-changed-*.pdf     homework only: the changed numbers

Letter size. Before printing, each part is measured: a calculation part's work
area must be at least 70 mm, any other part's at least 25 mm, and no part may
be taller than one page (a part is kept whole with break-inside: avoid, so a
taller one would be split). A failure stops the run.

A file is printed again only when its markup or the page's stylesheet changed:
sheets/manifest.json keeps a hash per file, so an unchanged sheet keeps its
bytes and is not rewritten by every build. PDFs no longer named are removed.

    python3 gen/sheets.py [--force]
"""
import hashlib
import json
import os
import re
import sys

from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # src/
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, 'sheets')
MANIFEST = os.path.join(OUT, 'manifest.json')

MM = 96 / 25.4                     # CSS px per mm
MARGIN = {'top': '14mm', 'bottom': '16mm', 'left': '15mm', 'right': '15mm'}
CONTENT_W_MM = 215.9 - 30          # Letter width less the side margins
CONTENT_H_MM = 279.4 - 30          # Letter height less top and bottom margins
MIN_CALC_MM, MIN_OTHER_MM = 70, 25

FOOTER = ('<div style="font-size:8px;color:#666;width:100%;padding:0 15mm;display:flex;'
          'justify-content:space-between;font-family:DejaVu Sans,sans-serif">'
          '<span class="title"></span><span>page <span class="pageNumber"></span> of '
          '<span class="totalPages"></span></span></div>')


def built_page():
    src = open(os.path.join(HERE, 'course.js'), encoding='utf-8').read()
    m = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", src)
    if not m:
        sys.exit("ERROR: course.js declares no output: '<filename>'")
    return os.path.join(ROOT, m.group(1))


# Print one sheet into the bare page and return what the checks need.
RENDER = """([src, mode, title]) => {
  document.documentElement.setAttribute('data-theme', 'light');
  document.body.className = 'wsprint';
  document.body.innerHTML = sheetHTML(src, mode);
  document.title = title;
  const mm = r => r.height / (96 / 25.4);
  return [...document.querySelectorAll('.wspart')].map(p => ({
    label: p.dataset.label, qid: p.dataset.qid, calc: p.classList.contains('calc'),
    work: mm(p.querySelector('.wswork').getBoundingClientRect()), height: mm(p.getBoundingClientRect())}));
}"""


def main():
    force = '--force' in sys.argv
    page_path = built_page()
    if not os.path.exists(page_path):
        sys.exit('ERROR: build the page first: ' + page_path)
    old = {}
    if os.path.exists(MANIFEST) and not force:
        try:
            old = json.load(open(MANIFEST, encoding='utf-8')).get('files', {})
        except ValueError:
            old = {}
    fails, made, kept, new = [], 0, 0, {}
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': round(CONTENT_W_MM * MM), 'height': 1000},
                                color_scheme='light')
        page.goto('file://' + page_path)
        page.wait_for_function("typeof sheetHTML === 'function'")
        files = page.evaluate('sheetFiles()')
        style = page.evaluate("[...document.querySelectorAll('style')].map(s => s.textContent).join('')")
        meta = {f['src']: page.evaluate("id => { const s = SRC_BY[id]; return {title: s.title}; }", f['src'])
                for f in files}
        page.emulate_media(media='print', color_scheme='light')
        for f in files:
            markup = page.evaluate('([s, m]) => sheetHTML(s, m)', [f['src'], f['mode']])
            digest = hashlib.sha256((style + '\0' + markup).encode('utf-8')).hexdigest()
            new[f['path']] = digest
            dest = os.path.join(ROOT, f['path'])
            title = re.sub(r'\s*\(solutions\)\s*$', '', meta[f['src']]['title'], flags=re.I)
            title += (', changed numbers' if f['variant'] == 'changed' else '') + \
                     (' — with solutions' if f['sol'] else ' — worksheet')
            parts = page.evaluate(RENDER, [f['src'], f['mode'], title])
            for pt in parts:
                need = MIN_CALC_MM if pt['calc'] else MIN_OTHER_MM
                if pt['work'] + 0.5 < need:
                    fails.append(f"{f['path']}: part {pt['label']} ({pt['qid']}) has {pt['work']:.0f} mm to work in, under {need} mm")
                if pt['height'] > CONTENT_H_MM:
                    fails.append(f"{f['path']}: part {pt['label']} ({pt['qid']}) is {pt['height']:.0f} mm tall, more than a page")
            if not parts:
                fails.append(f"{f['path']}: no parts")
            if not force and old.get(f['path']) == digest and os.path.exists(dest):
                kept += 1
                continue
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            page.pdf(path=dest + '.tmp', format='Letter', margin=MARGIN, print_background=True,
                     display_header_footer=True, header_template='<div></div>', footer_template=FOOTER)
            os.replace(dest + '.tmp', dest)
            made += 1
        browser.close()
    # files no longer named
    gone = 0
    for d, _, fs in os.walk(OUT):
        for fn in fs:
            rel = os.path.relpath(os.path.join(d, fn), ROOT).replace(os.sep, '/')
            if fn.endswith('.pdf') and rel not in new:
                os.remove(os.path.join(d, fn))
                gone += 1
    os.makedirs(OUT, exist_ok=True)
    with open(MANIFEST, 'w', encoding='utf-8') as fh:
        json.dump({'note': 'Written by src/gen/sheets.py: a hash of each PDF\'s print markup and stylesheet.',
                   'files': dict(sorted(new.items()))}, fh, indent=1)
        fh.write('\n')
    size = sum(os.path.getsize(os.path.join(d, fn)) for d, _, fs in os.walk(OUT) for fn in fs)
    print(f'sheets: {len(new)} PDFs for {len({f["src"] for f in files})} sources '
          f'({made} printed, {kept} unchanged, {gone} removed), {size / 1048576:.1f} MB in sheets/')
    if fails:
        print('\n'.join('  FAIL  ' + x for x in fails))
        sys.exit(1)


if __name__ == '__main__':
    main()
