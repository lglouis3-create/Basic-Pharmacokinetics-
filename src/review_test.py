"""Checks the four review modes on the Topics page, in a real browser.

Written against a report that reviewing concepts still showed calculations and
still described topics in terms of them. Each mode has to show only what its
name says, and a drill started from a split row has to serve only its own kind
all the way through, not just on its first question.

    python3 review_test.py
"""
import pathlib, re, sys
from playwright.sync_api import sync_playwright

OUT = pathlib.Path('/mnt/user-data/outputs/PHAR4221_Drill.html')
fails = []
def ok(msg, cond):
    print(('  ok    ' if cond else '  FAIL  ') + msg)
    if not cond: fails.append(msg)

def mode(pg, m):
    pg.evaluate("show('topics')"); pg.wait_for_timeout(150)
    pg.click(f'#v-topics .rtab[data-review="{m}"]'); pg.wait_for_timeout(200)
    pg.evaluate("document.querySelectorAll('#v-topics details').forEach(d => d.open = true)")
    pg.wait_for_timeout(150)

def drain(pg):
    """Answer everything the drill will serve; return the kind of each question."""
    kinds, seen = [], set()
    for _ in range(300):
        cur = pg.evaluate("Q && Q.current && Q.current.id")
        if not cur or cur in seen: break
        seen.add(cur); kinds.append(pg.evaluate("kindOf(Q.current)"))
        pg.evaluate("Q.revealed = true; nextQuestion()")
    return kinds

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1100, 'height': 1300})
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(OUT.as_uri()); pg.wait_for_timeout(700)

    tabs = pg.eval_on_selector_all('#v-topics .rtab', 'bs => bs.map(b => b.dataset.review)')
    ok('the switch offers Everything, Concepts, Calculations and Stepwise calculations',
       tabs == ['all', 'concept', 'calc', 'chain'])
    nums = [int(re.search(r'\d+', t).group()) for t in
            pg.eval_on_selector_all('#v-topics .rtab small', 'ss => ss.map(s => s.textContent)')]
    ok(f'concepts and calculations add up to everything ({nums[1]} + {nums[2]} = {nums[0]})',
       nums[1] + nums[2] == nums[0])

    # --- Concepts: no calculation anywhere in the modules
    mode(pg, 'concept')
    body = ' '.join(pg.eval_on_selector_all('#v-topics details.module',
                                            'ds => ds.map(d => d.innerText)'))
    ok('reviewing concepts, no module mentions a calculation',
       not re.search(r'calculat', body, re.I))
    ok('reviewing concepts, no stepwise problem set is shown',
       pg.locator('#v-topics .stepwise').count() == 0)
    skills = pg.eval_on_selector_all('#v-topics .chip[data-f="skill"]', 'cs => cs.map(c => c.dataset.v)')
    calc_only = pg.evaluate("""s => s.filter(id => id !== 'all' &&
        !QUESTIONS.some(q => skillOf(q) === id && kindOf(q) === 'concept'))""", skills)
    ok('reviewing concepts, no skill chip names a calculation-only skill', not calc_only)
    rows = pg.locator('#v-topics details.topic .subrow button[data-t]')
    n = rows.count()
    ok(f'every subtopic start button still works ({n})', n > 10)
    pg.locator('#v-topics details.module').first.locator('.ksplit button').first.click()
    pg.wait_for_timeout(200)
    pool = pg.evaluate("Q.pool.map(kindOf)")
    k = drain(pg)
    ok(f'a topic drilled under Concepts can only ever draw concepts ({len(pool)} in its pool)',
       pool and all(x == 'concept' for x in pool))
    ok(f'and what it served were all concepts ({len(k)} served)', k and all(x == 'concept' for x in k))

    # --- Everything: the split rows serve their own kind to the end
    for kind, label in (('concept', 'Concepts in'), ('calc', 'Calculations in')):
        mode(pg, 'all')
        pg.locator('#v-topics .subrow', has_text=label).first.locator('button').click()
        pg.wait_for_timeout(200)
        pool = pg.evaluate("Q.pool.map(kindOf)")
        k = drain(pg)
        ok(f'"{label} ..." can only ever draw {kind} questions ({len(pool)} in its pool, {len(k)} served)',
           pool and all(x == kind for x in pool) and k and all(x == kind for x in k))

    # --- Calculations: single ones and the stepwise sets, each under its own heading
    mode(pg, 'calc')
    ok('reviewing calculations, the stepwise sets appear under their own heading',
       pg.locator('#v-topics .stepwise h4', has_text='Stepwise calculations').count() >= 5)
    kinds = pg.evaluate("""() => [...document.querySelectorAll('#v-topics details.topic')]
        .map(d => d.querySelector('summary .tname').firstChild.textContent.trim())""")
    ok('reviewing calculations, topics with no calculation are left out',
       'What pharmacokinetics is' not in kinds)

    # --- Stepwise only
    mode(pg, 'chain')
    ok('stepwise mode shows no topic cards', pg.locator('#v-topics details.topic').count() == 0)
    sets = pg.locator('#v-topics button[data-chain]').count()
    ok(f'stepwise mode shows every problem set ({sets})', sets == pg.evaluate("CHAINS.length"))
    ok('stepwise mode leaves out the mixed drills and passes',
       pg.locator('#v-topics .sweepcard').count() == 0 and 'Mixed drills' not in pg.inner_text('#v-topics'))

    # --- the outline's Equations entry opens the drill
    mode(pg, 'all')
    pg.click('#v-topics button[data-view="eq"]'); pg.wait_for_timeout(200)
    ok('the Equations entry in the outline opens the equation drill',
       pg.evaluate("VIEW") == 'eq')

    ok('no uncaught error', not errs)
    if errs: print('   ', errs[:3])
    b.close()
print('\nReview-mode test ' + ('passed' if not fails else 'FAILED: %d' % len(fails)))
sys.exit(1 if fails else 0)
