#!/usr/bin/env python3
"""The variables quiz, in Chromium at phone (390 px) and desktop (1200 px) widths.

Checks: the quiz holds questions from her own calculation stems (which symbol the question sentence asks for) and
two per symbol (what it means; which symbol a meaning is); every question has one keyed option among distinct
options, and the keyed one is the symbol the source question asks for; no question sentence names its own answer;
Cp and Cp after the nth dose are never each other's wrong option; Terms (Quiz me) lists the quiz by family and
Equations offers it; Start drills exactly that pool; a right answer is recorded under the symbol's concept. Any page
or console error fails the run.

    python3 var_test.py
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


SHAPE = """(() => {
  const asks = VAR_QS.filter(q => q.fromQ), bad = [], named = [], twins = [], wrongKey = [];
  VAR_QS.forEach(q => { const t = q.options.map(o => o.t), c = q.options.filter(o => o.correct);
    if (c.length !== 1 || new Set(t).size !== t.length || t.length < 4) bad.push(q.id);
    const has = s => t.includes(ASKS[s][0]);
    if ((q.varKey === 'Cp' && has('Cpn')) || (q.varKey === 'Cpn' && has('Cp'))) twins.push(q.id); });
  asks.forEach(q => { const src = byId(q.fromQ), c = q.options.find(o => o.correct).t;
    if (!src || src.asks !== q.varKey || c !== ASKS[src.asks][0]) wrongKey.push(q.id);
    const sent = q.stem.split('“')[1] || '';
    if (new RegExp('(^|[^A-Za-z0-9])' + c.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&').replace(/∞/g, '') + '(?![A-Za-z0-9])').test(sent)) named.push(q.id); });
  const keys = new Set(VAR_QS.map(q => q.varKey));
  return {n: VAR_QS.length, asks: asks.length, keys: keys.size, means: [...keys].every(k => byId('var-' + k + '-means') && byId('var-' + k + '-symbol')),
          ids: VAR_QS.length === new Set(VAR_QS.map(q => q.id)).size, bad, named, twins, wrongKey};
})()"""


def run(page, width):
    print(f'\n=== variables quiz at {width} px ===')
    s = page.evaluate(SHAPE)
    check(s['asks'] >= 150 and s['n'] == s['asks'] + 2 * s['keys'] and s['means'] and s['ids'],
          f"{s['asks']} questions from her stems and two per symbol for {s['keys']} symbols ({s['n']} in all, ids unique)")
    check(not s['bad'], 'every question has one keyed option among four or more distinct options', ', '.join(s['bad'][:5]))
    check(not s['wrongKey'], 'the keyed symbol is the one the source calculation asks for', ', '.join(s['wrongKey'][:5]))
    check(not s['named'], 'no question sentence names its own answer', ', '.join(s['named'][:5]))
    check(not s['twins'], 'Cp and Cp after the nth dose are never each other\'s wrong option', ', '.join(s['twins'][:5]))
    page.evaluate("show('terms'); TV.mode = 'quiz'; renderTerms()"); page.wait_for_timeout(200)
    rows = page.evaluate("[...document.querySelectorAll('#v-terms [data-varquiz]')].map(b => b.dataset.varquiz)")
    groups = page.evaluate("VAR_GROUPS")
    check(rows == ['all'] + groups, f'Terms, Quiz me lists the quiz: all variables and each of the {len(groups)} families', str(rows))
    page.evaluate("show('eq')"); page.wait_for_timeout(200)
    check(page.evaluate("!!document.querySelector('#v-eq [data-varquiz=\"all\"]')"), 'Equations offers the quiz')
    page.click('#v-eq [data-varquiz="all"]'); page.wait_for_timeout(300)
    d = page.evaluate("[VIEW, Q && Q.pool.length, Q && Q.pool.every(q => q.varKey), Q && Q.current && Q.current.id]")
    check(d[0] == 'quiz' and d[1] == s['n'] and d[2], f'Start drills the whole quiz and only it {d[:3]}')
    page.evaluate("""(() => { const q = Q.current, i = q.options.findIndex(o => o.correct); document.querySelector(`#v-quiz button[data-o="${i}"]`).click(); })()""")
    page.wait_for_timeout(200)
    r = page.evaluate(f"(() => {{ const q = byId('{d[3]}'), s = st(q.concept); return [q.concept, s.correct, s.asked.includes(q.id), !!document.querySelector('#v-quiz .why .verdict.ok')]; }})()")
    check(r[0].startswith('var:') and r[1] >= 1 and r[2] and r[3], f"a right answer is marked right and recorded under the symbol's concept {r}")
    sw = page.evaluate("document.documentElement.scrollWidth - innerWidth")
    check(sw <= 1, f'no sideways scroll ({sw})')


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width in (390, 1200):
            page = browser.new_page(viewport={'width': width, 'height': 860})
            errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            page.add_init_script("window.prompt = () => 'VarTest'; window.confirm = () => true;")
            page.goto(URL); page.wait_for_timeout(1200)
            run(page, width)
            check(not errs, f'no page or console errors at {width} px', '; '.join(errs[:3]))
            page.close()
        browser.close()
    print(f'\n{len(fails)} failure(s)' if fails else '\nall variables quiz checks passed')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
