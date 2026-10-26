#!/usr/bin/env python3
"""Weak spots are marked where they are studied, in Chromium at phone (390 px) and desktop (1200 px) widths.

A fresh profile misses three questions (a calculation with a set-up line, a Terms question and a figure question).
Each study tab must then mark what those concepts rest on: the objective's guide section, the equation row and the
sheet-map line, the worksheet card, the term card, the figure, and lines in Tell apart. Redrill must start a drill
on exactly those concepts. Answering each concept right must clear its marks, and the switch in Weak spots must turn
them all off. Any page or console error fails the run.

    python3 weak_test.py
"""
import os, re, sys
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
NAME = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", open(os.path.join(HERE, 'course.js')).read()).group(1)
URL = 'file://' + os.path.join(os.path.dirname(HERE), NAME)
fails = []


def check(ok, label, detail=''):
    print(('  ok   ' if ok else '  FAIL ') + label + ('' if ok else f'  ({detail})'))
    if not ok: fails.append(label)


PICK = """(() => {
  const calc = QUESTIONS.find(q => q.id === 'cq5-8');
  const term = TERM_QS.find(q => q.termId === 'pharmacokinetics');
  const fig = QUESTIONS.find(q => q.img && DIAGRAMS.some(g => g.figs.some(d => d.key === q.img)));
  return {calc: calc.id, eq: calc.setup.eq, src: SRC_OF[calc.id].src, term: term.id, termId: term.termId, fig: fig.id, fg: fig.img,
          gids: OBJECTIVES.filter(o => o.module === calc.module && o.subs.includes(subKey(calc))).map(wkGid)};
})()"""
MISS = """p => { const T = TERM_QS; const q = id => byId(id) || T.find(x => x.id === id);
  record(q(p.calc), 'wrong', '1', 30000, 'setup'); record(q(p.term), 'wrong', 0, 5000); record(q(p.fig), 'wrong', 0, 5000); save(); }"""
RIGHT = """p => { const T = TERM_QS; const q = id => byId(id) || T.find(x => x.id === id);
  [p.calc, p.term, p.fig].forEach(id => record(q(id), 'correct', null, 5000)); save(); }"""
MARKS = """p => {
  const n = sel => document.querySelectorAll(sel).length;
  show('guide'); const g = p.gids.map(id => document.getElementById(id)).filter(Boolean);
  const guide = g.length && g.every(s => s.classList.contains('wk') && s.querySelector('.wknote'));
  show('eq'); const eq = !!document.querySelector(`#v-eq input[data-eq="${p.eq}"]`) && !!document.querySelector(`#v-eq input[data-eq="${p.eq}"]`).closest('.wkl');
  show('ref'); const ref = [...document.querySelectorAll('#v-ref li.smline.wkl [data-sheetdrill]')].some(b => b.dataset.sheetdrill === p.eq);
  show('sheets'); const sheets = !!document.querySelector(`#v-sheets .srccard.wk[data-src="${p.src}"] .wknote`);
  show('terms'); const terms = !!document.querySelector(`#v-terms #term-${p.termId}.wk .wknote`);
  show('diag'); const diag = !!document.querySelector(`#v-diag #dg-${p.fg}.wk .wknote`);
  show('tell'); const tell = n('#v-tell .wkl');
  return {guide, eq, ref, sheets, terms, diag, tell, any: ['guide','eq','ref','sheets','terms','diag','tell'].reduce((s, v) => (show(v), s + n(`#v-${v} .wk, #v-${v} .wkl`)), 0)};
}"""


def run(page, width):
    print(f'\n=== weak spots at {width} px ===')
    p = page.evaluate(PICK)
    check(page.evaluate(MARKS, p)['any'] == 0, 'a fresh profile has no marks')
    page.evaluate(MISS, p)
    m = page.evaluate(MARKS, p)
    check(m['guide'], f"Guides: the objective's section is marked with the missed question ({', '.join(p['gids'])})")
    check(m['eq'], f"Equations: the line the calculation needs is marked ({p['eq']})")
    check(m['ref'], 'Reference: the sheet-map line is marked')
    check(m['sheets'], f"Worksheets: the sheet the question came from is marked ({p['src']})")
    check(m['terms'], f"Terms: the missed term is marked ({p['termId']})")
    check(m['diag'], f"Diagrams: the figure the question reads is marked ({p['fg']})")
    check(0 < m['tell'] <= 14, f"Tell apart: lines using its terms are marked, at most 14 ({m['tell']})")
    sw = page.evaluate("document.documentElement.scrollWidth - innerWidth")
    check(sw <= 0, 'no sideways scroll with marks on', f'{sw} px')
    page.evaluate("show('guide')")
    page.evaluate(f"document.querySelector('#{p['gids'][0]} [data-wkdrill]').click()"); page.wait_for_timeout(200)
    d = page.evaluate("[VIEW, Q && [...new Set(Q.pool.map(q => q.concept))]]")
    want = page.evaluate(f"[byId('{p['calc']}').concept]")
    check(d[0] == 'quiz' and d[1] == want, 'Redrill starts a drill on that concept alone', str(d))
    page.evaluate("Q = null")
    page.evaluate(RIGHT, p)
    check(page.evaluate(MARKS, p)['any'] == 0, 'answering each concept right clears every mark')
    page.evaluate(MISS, p); page.evaluate("show('gaps')")
    page.click('#wkhi'); page.wait_for_timeout(200)
    check(page.evaluate("DB.settings.weakHi") is False and page.evaluate(MARKS, p)['any'] == 0, 'the switch in Weak spots turns every mark off')
    page.evaluate("show('gaps')"); page.click('#wkhi'); page.wait_for_timeout(200)
    check(page.evaluate(MARKS, p)['guide'], 'turned back on, the marks return')


def main():
    with sync_playwright() as pw:
        exe = '/opt/pw-browsers/chromium'
        browser = pw.chromium.launch(**({'executable_path': exe} if os.path.exists(exe) and not os.path.isdir(exe) else {}))
        for width in (390, 1200):
            page = browser.new_page(viewport={'width': width, 'height': 860})
            errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            page.add_init_script(f"window.prompt = () => 'WeakTest{width}';")
            page.goto(URL); page.wait_for_timeout(1200)
            run(page, width)
            check(not errs, f'no page or console errors at {width} px', '; '.join(errs[:3]))
            page.close()
        browser.close()
    print(f'\n{len(fails)} failure(s)' if fails else '\nall weak-spot checks passed')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
