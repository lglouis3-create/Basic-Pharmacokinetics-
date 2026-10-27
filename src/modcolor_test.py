#!/usr/bin/env python3
"""Module colours: every title that names one module carries that module's colour, and no question does.

In Chromium at 820 px: each Topics module card has the bar and the square of its own module; the equation sheet's
legend lists every module it holds, 7b and 8 included, in nine different colours; each Guides module section and
each Worksheets module folder carries its module's bar; a drill question and an Exam sim paper carry no module
colour; in the dark theme the sheet's module badges have dark text that reads at 4.5 : 1 or better. Any page or
console error fails the run.

    python3 modcolor_test.py
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


OWN = """sel => [...document.querySelectorAll(sel)].map(el => {
  const t = el.querySelector('.mname, summary h2, summary > b') || el, name = ownText(t), cls = [...el.classList].find(c => /^m\\d$/.test(c));
  return [name.slice(0, 40), modOfTitle(name), cls ? +cls.slice(1) : null, t.classList.contains('mc')]; })"""


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 820, 'height': 1100})
        errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        page.add_init_script("window.prompt = () => 'ColourTest'; window.confirm = () => true;")
        page.goto(URL); page.wait_for_timeout(1200)
        page.evaluate("show('topics')"); page.wait_for_timeout(300)
        cards = page.evaluate(OWN, '#v-topics .module.mbar')
        n_mods = page.evaluate("new Set(COURSE.topicsMenu.map(t => t.module).filter(Number.isFinite)).size")
        check(len(cards) == n_mods and all(c[1] == c[2] and c[3] for c in cards),
              f'each of the {n_mods} Topics module cards has the bar and square of its own module', str(cards))
        page.evaluate("show('ref')"); page.wait_for_timeout(300)
        leg = page.evaluate("""[...document.querySelectorAll('#v-ref .smlegend .smkey')].map(k => [k.textContent.trim(), getComputedStyle(k.querySelector('i')).backgroundColor])""")
        names = [l[0] for l in leg]
        check('Module 7b' in names and 'Module 8' in names and len({l[1] for l in leg}) == len(leg) == 9,
              f'the sheet legend lists 7b and 8, nine modules in nine colours', str(leg))
        page.evaluate("show('guide')"); page.wait_for_timeout(300)
        gs = page.evaluate(OWN, '#v-guide details.mbar')
        check(len(gs) >= n_mods and all(g[1] == g[2] for g in gs), f'each Guides module section carries its own module bar ({len(gs)})', str([g for g in gs if g[1] != g[2]] or gs))
        page.evaluate("show('sheets')"); page.wait_for_timeout(300)
        ws = page.evaluate(OWN, '#v-sheets details.srcgrp.mbar')
        check(len(ws) == n_mods and all(w[1] == w[2] for w in ws), f'each Worksheets module folder carries its own module bar ({len(ws)})', str(ws[:4]))
        # no colour on a question
        page.evaluate("startSweepOf(QUESTIONS.filter(q => q.module === 8).slice(0, 3), 'colour test')"); page.wait_for_timeout(400)
        q = page.evaluate("[VIEW, document.querySelectorAll('#v-quiz .mc, #v-quiz .mbar').length]")
        check(q == ['quiz', 0], f'a drill question carries no module colour {q}')
        page.evaluate("show('exam'); document.getElementById('startExam').click()"); page.wait_for_timeout(500)
        e = page.evaluate("[!!EX, document.querySelectorAll('#v-exam .mc, #v-exam .mbar').length]")
        check(e == [True, 0], f'an Exam sim paper carries no module colour {e}')
        # dark theme: the badges' text is dark on the light module colours
        page.evaluate("document.documentElement.dataset.theme = 'dark'; show('ref')"); page.wait_for_timeout(300)
        cr = page.evaluate("""(() => { const L = c => { const v = c.match(/\\d+/g).slice(0, 3).map(x => x / 255).map(x => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
          const out = {}; document.querySelectorAll('#v-ref .smbadge').forEach(b => { const s = getComputedStyle(b), a = L(s.color), c = L(s.backgroundColor);
            const r = (Math.max(a, c) + 0.05) / (Math.min(a, c) + 0.05); out[b.textContent.trim()] = Math.min(out[b.textContent.trim()] || 99, Math.round(r * 100) / 100); }); return out; })()""")
        check(cr and min(cr.values()) >= 4.5, f'in the dark theme every module badge reads at 4.5 : 1 or better {cr}')
        check(not errs, 'no page or console errors', '; '.join(errs[:3]))
        browser.close()
    print(f'\n{len(fails)} failure(s)' if fails else '\nall module colour checks passed')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
