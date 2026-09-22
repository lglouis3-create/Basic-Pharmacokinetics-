"""Works one of her problem sets through, in a real browser, from its first
part to its last.

A set is only worth being a set if the parts arrive in the order she asks
them, each carrying the value the part before it produced. This drives the
page rather than the module, so it catches a set that resolves in the bank
but does not run: a part id that renders nothing, a progress line that counts
questions where it should count parts, or a set whose start button is missing
from the Topics view.

    python3 problemset_test.py

Requires the built page at /mnt/user-data/outputs and a Chromium that
Playwright can find.
"""
import pathlib, re, sys
from playwright.sync_api import sync_playwright
SRC = pathlib.Path(__file__).resolve().parent
OUT = pathlib.Path('/mnt/user-data/outputs/PHAR4221_Drill.html')
fails = []
def ok(msg, cond):
    print(('  ok    ' if cond else '  FAIL  ') + msg)
    if not cond: fails.append(msg)

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1100, 'height': 1200})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(OUT.as_uri()); pg.wait_for_timeout(700)

    chains = pg.evaluate("CHAINS.map(c => ({id:c.id, n:c.parts.length, name:c.name, module:c.module}))")
    ok(f'{len(chains)} problem sets declared', len(chains) >= 20)
    missing = pg.evaluate("CHAINS.flatMap(c => c.parts.filter(id => !byId(id)))")
    ok('every part id resolves to a question', not missing)

    # every module group lists its sets
    pg.evaluate("document.querySelectorAll('#v-topics details').forEach(d => d.open = true)")
    pg.wait_for_timeout(200)
    shown = pg.eval_on_selector_all('#v-topics button[data-chain]', 'bs => bs.map(b => b.dataset.c || b.getAttribute("data-chain"))')
    ok(f'all {len(chains)} sets have a start button ({len(shown)} shown)', len(shown) == len(chains))

    # work the eight-part battery straight through
    target = 'm2-points'
    want = pg.evaluate(f"CHAINS.find(c => c.id === '{target}').parts")
    pg.evaluate(f"startChain('{target}')")
    pg.wait_for_timeout(200)
    seen, labels = [], []
    for step in range(len(want) + 1):
        cur = pg.evaluate("Q && Q.current && Q.current.id")
        if cur is None: break
        seen.append(cur)
        labels.append(pg.inner_text('.qprog span'))
        setline = pg.eval_on_selector_all('.cset', 'ns => ns.map(n => n.textContent.trim())')
        if step == 0:
            ok('the shared vignette is printed above the stem', bool(setline))
        pg.fill('#numIn', str(pg.evaluate("Q.current.answer")))
        pg.click('#btnCheck'); pg.wait_for_timeout(120)
        pg.click('#btnNext'); pg.wait_for_timeout(120)
    ok(f'the set ran in her order ({len(seen)} parts)', seen == want)
    ok('the progress line counts parts, not questions', labels[0] == 'part 1 of %d' % len(want))
    done = pg.inner_text('#v-quiz')
    ok('the closing card names the set', 'every part of' in done)

    # a part met on its own offers the whole set
    pg.evaluate("startPool([byId('m4-n-clr')], 'one part')")
    pg.wait_for_timeout(150)
    pg.fill('#numIn', '0.78'); pg.click('#btnCheck'); pg.wait_for_timeout(150)
    body = pg.inner_text('#v-quiz')
    ok('a part answered alone says which set it belongs to', 'part 5 of 6' in body)
    ok('and offers to work the set', pg.locator('#btnChain').count() == 1)
    battery = pg.evaluate("CHAINS.find(c => c.id === 'm4-battery').parts")
    pg.click('#btnChain'); pg.wait_for_timeout(200)
    ok('that button starts the set at part 1',
       pg.evaluate("Q.chain && Q.chain.id") == 'm4-battery' and pg.evaluate("Q.current.id") == battery[0])

    ok('no uncaught error', not errs)
    if errs: print('   ', errs[:3])
    b.close()
print('\nProblem-set test ' + ('passed' if not fails else 'FAILED: %d' % len(fails)))
sys.exit(1 if fails else 0)
