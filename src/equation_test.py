"""Drives the equation drill in a real browser: picks a set, types answers,
builds one from its pieces, and checks what counts as right.

The checker is the part that has to be got right. A drill that rejects a
correct answer over a capital letter teaches the student to distrust it, and
one that accepts an inverted ratio teaches them the wrong equation. So the
typed forms below are run against the page's own comparison, not a copy of it.

    python3 equation_test.py
"""
import pathlib, sys
from playwright.sync_api import sync_playwright

SRC = pathlib.Path(__file__).resolve().parent
OUT = pathlib.Path('/mnt/user-data/outputs/PHAR4221_Drill.html')
fails = []
def ok(msg, cond):
    print(('  ok    ' if cond else '  FAIL  ') + msg)
    if not cond: fails.append(msg)

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1100, 'height': 1300})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(OUT.as_uri()); pg.wait_for_timeout(700)

    n = pg.evaluate("EQUATIONS.length")
    ok(f'{n} equations loaded', n >= 40)
    pg.click('#nav button[data-v="eq"]'); pg.wait_for_timeout(300)
    ok('the Equations view renders', 'Equations' in pg.inner_text('#v-eq'))
    ok('it opens on the ones she said to memorise',
       pg.evaluate("eqChosen().length") == pg.evaluate("EQ_MUST.length"))

    # --- what the checker accepts and refuses, run against the page's own code
    cases = [
        # (equation id, typed, should be accepted)
        ('thalf-first', '0.693/k', True),
        ('thalf-first', '0.693 / K', True),
        ('thalf-first', 't1/2 = 0.693/k', True),
        ('thalf-first', '.693/k', True),
        ('thalf-first', 'k/0.693', False),
        ('thalf-first', '0.693k', False),
        ('cl-k-vd', 'k*VD', True),
        ('cl-k-vd', 'kvd', True),
        ('cl-k-vd', 'K × Vd', True),
        ('cl-k-vd', 'k/VD', False),
        ('crcl', '(140-age)(IBW)/(72*SCr)', True),
        ('crcl', '(140 − age)(IBW) / (72 × Scr)', True),
        ('crcl', '(140+age)(IBW)/(72*SCr)', False),
        ('first-exp', 'C0*e^(-kt)', True),
        ('first-exp', 'c0e^-kt', True),
        ('first-exp', 'C0e**(-kt)', True),
        ('first-exp', 'C0*e^(kt)', False),
        ('tmax', 'ln(ka/k)/(ka-k)', True),
        ('tmax', 'LN(Ka/K)/(Ka–K)', True),
        ('tmax', 'ln(k/ka)/(ka-k)', False),
        ('css', 'R/Cl', True),
        ('css', 'R/(k*VD)', True),
        ('css', 'Cl/R', False),
        ('ibw-female', '45.5 + 2.3*(inches over 5 ft)', True),
        ('ibw-female', '50 + 2.3*(inches over 5 ft)', False),
        ('clh', '(1-fe)*ClT', True),
        ('clh', 'ClT - ClR', True),
        ('clh', 'fe*ClT', False),
    ]
    wrong = []
    for eid, typed, want in cases:
        got = pg.evaluate("([i,t]) => eqCorrect(EQ_BY_ID[i], t)", [eid, typed])
        if got != want: wrong.append((eid, typed, want, got))
    ok(f'{len(cases)} accept/refuse cases behave', not wrong)
    for w in wrong: print('        ', w)

    # --- typing drill, end to end
    pg.evaluate("eqSetChosen(['thalf-first']); eqStart('type')"); pg.wait_for_timeout(250)
    ok('the typing drill shows an input', pg.locator('#eqIn').count() == 1)
    pg.fill('#eqIn', '0.693 / k'); pg.click('#eqCheck'); pg.wait_for_timeout(200)
    ok('a correct typed answer is marked right', '✓ Correct' in pg.inner_text('#v-eq'))
    ok('the streak advanced', pg.evaluate("eqStat('thalf-first').streak") == 1)
    ok('the symbols are explained after answering', 'What each symbol is' in pg.inner_text('#v-eq'))
    pg.click('#eqNext'); pg.wait_for_timeout(200)
    ok('one equation, one pass, then the closing card', 'right of' in pg.inner_text('#v-eq'))

    # a wrong answer resets the streak and shows what was read
    pg.evaluate("eqStart('type')"); pg.wait_for_timeout(200)
    pg.fill('#eqIn', 'k/0.693'); pg.click('#eqCheck'); pg.wait_for_timeout(200)
    body = pg.inner_text('#v-eq')
    ok('a wrong typed answer is marked wrong', '✗ Not correct' in body)
    ok('and the right answer is shown', '0.693' in body)
    ok('and it says how the answer was read', 'once capitals and spacing are set aside' in body)
    ok('the streak went back to nothing', pg.evaluate("eqStat('thalf-first').streak") == 0)

    # --- building drill, by tapping
    pg.evaluate("eqSetChosen(['css']); eqStart('build')"); pg.wait_for_timeout(250)
    slots = pg.locator('.eqslot').count(); tiles = pg.locator('.eqtile').count()
    ok(f'the build view offers {slots} slots and {tiles} pieces', slots == 3 and tiles > slots)
    ok('Check is disabled while a slot is empty', pg.locator('#eqCheck').is_disabled())
    order = pg.evaluate("""() => {
      const want = EQ_BY_ID['css'].tokens;
      return want.map(w => EQ.tray.findIndex(t => t.t === w));
    }""")
    for t in order:
        pg.click(f'.eqtile[data-tile="{pg.evaluate("i => EQ.tray[i].i", t)}"]'); pg.wait_for_timeout(80)
    ok('placing every piece enables Check', not pg.locator('#eqCheck').is_disabled())
    pg.click('#eqCheck'); pg.wait_for_timeout(200)
    ok('the built equation is marked right', '✓ Correct' in pg.inner_text('#v-eq'))
    ok('each slot is marked individually', pg.locator('.eqslot.ok').count() == 3)

    # tapping a filled slot empties it again
    pg.evaluate("eqStart('build')"); pg.wait_for_timeout(200)
    pg.evaluate("eqPlace(EQ.tray[0].i)"); pg.wait_for_timeout(120)
    filled = pg.evaluate("EQ.slots.filter(s => s !== null).length")
    pg.click('.eqslot.full'); pg.wait_for_timeout(120)
    ok('tapping a filled slot clears it', filled == 1 and pg.evaluate("EQ.slots.filter(s => s !== null).length") == 0)

    # --- the picker
    pg.evaluate("EQ = null; renderEq()"); pg.wait_for_timeout(200)
    pg.click('#v-eq button[data-pick="all"]'); pg.wait_for_timeout(200)
    ok('"all" selects every equation', pg.evaluate("eqChosen().length") == n)
    pg.click('#v-eq button[data-pick="must"]'); pg.wait_for_timeout(200)
    ok('"the ones she said to memorise" narrows it', pg.evaluate("eqChosen().length") == pg.evaluate("EQ_MUST.length"))
    boxes = pg.locator('#v-eq input[data-eq]').count()
    ok(f'every equation has a tick box ({boxes})', boxes == n)

    # the choice survives a reload
    pg.evaluate("eqSetChosen(['css','tmax','clh'])"); pg.wait_for_timeout(300)
    pg.reload(); pg.wait_for_timeout(700)
    ok('the chosen set survives a reload', sorted(pg.evaluate("eqChosen()")) == ['clh','css','tmax'])

    ok('no uncaught error', not errs)
    if errs: print('   ', errs[:3])
    b.close()
print('\nEquation drill test ' + ('passed' if not fails else 'FAILED: %d' % len(fails)))
sys.exit(1 if fails else 0)
