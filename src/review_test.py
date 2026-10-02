"""Checks the module layout on the Topics page, in a real browser.

Each module is one card with Concepts, Calculations and (where she handed
out problems) Worksheets. Concepts lists her objectives and a drill started
from one draws only concept questions from that objective. Calculations
lists the kinds of problem; Single problems draws only calculations of that
kind, every calculation belongs to exactly one kind, and each kind carries a
worked example. Worksheets holds only her handout problems, never a lecture
example. Every problem set has a Start button somewhere.

    python3 review_test.py
"""
import pathlib, sys
from playwright.sync_api import sync_playwright

OUT = pathlib.Path('/mnt/user-data/outputs/PHAR4221_Drill.html')
fails = []
def ok(msg, cond):
    print(('  ok    ' if cond else '  FAIL  ') + msg)
    if not cond: fails.append(msg)

def drain(pg):
    ids, seen = [], set()
    for _ in range(300):
        cur = pg.evaluate("Q && Q.current && Q.current.id")
        if not cur or cur in seen: break
        seen.add(cur); ids.append(cur)
        pg.evaluate("Q.revealed = true; nextQuestion()")
    return ids

def page(pg, module, sec):
    pg.evaluate("MODPAGE = null; show('topics')"); pg.wait_for_timeout(100)
    pg.click(f'.modbtn[data-mod="{module}"][data-sec="{sec}"]'); pg.wait_for_timeout(150)

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1100, 'height': 1300})
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.add_init_script("window.prompt = () => 'Layout'")
    pg.goto(OUT.as_uri()); pg.wait_for_timeout(700)

    print('\n=== Module layout ===')
    mods = pg.evaluate("outline().filter(m => m.module != null && modulePool(m.module).length).map(m => m.module)")
    ok(f'one card per module ({len(mods)})', pg.locator('.modcard').count() == len(mods))
    ok('no topic list or review switch on the main page',
       pg.locator('#v-topics details.topic').count() == 0 and pg.locator('#v-topics .rtab').count() == 0)
    untyped = pg.evaluate("QUESTIONS.filter(q => kindOf(q) === 'calc' && !calcTypeOf(q)).map(q => q.id)")
    ok('every calculation belongs to a kind of problem', not untyped)
    orphan = pg.evaluate("""QUESTIONS.filter(q => kindOf(q) === 'concept' &&
        !OBJECTIVES.some(o => o.module === q.module && o.subs.includes(subKey(q)))).map(q => q.id)""")
    ok('every concept question belongs to one of her objectives', not orphan)
    badex = pg.evaluate("CALC_TYPES.filter(t => !byId(t.example) || calcTypeOf(byId(t.example)) !== t).map(t => t.id)")
    ok('every kind of problem has a worked example of its own kind', not badex)

    chain_buttons = set()
    for m in mods:
        page(pg, m, 'concepts')
        n = pg.locator('#v-topics [data-obj]').count()
        ok(f'module {m}: {n} objectives listed', n > 0)
        pg.locator('#v-topics [data-obj]').first.click(); pg.wait_for_timeout(150)
        pool = pg.evaluate("Q.pool.map(kindOf)"); served = drain(pg)
        ok(f'module {m}: an objective drill draws only concepts ({len(pool)})', pool and all(k == 'concept' for k in pool))

        page(pg, m, 'calcs')
        types = pg.locator('#v-topics [data-ctype]').count()
        ok(f'module {m}: {types} kinds of calculation, each with a worked example',
           types > 0 and pg.locator('#v-topics .ctype details.worked .steps').count() >= types)
        tid = pg.get_attribute('#v-topics [data-ctype]', 'data-ctype')
        pg.locator('#v-topics [data-ctype]').first.click(); pg.wait_for_timeout(150)
        pool = pg.evaluate(f"Q.pool.map(q => calcTypeOf(q) && calcTypeOf(q).id)")
        ok(f'module {m}: Single problems draws only its own kind ({len(pool)})', pool and all(x == tid for x in pool))
        page(pg, m, 'calcs')
        pg.evaluate("document.querySelectorAll('#v-topics details').forEach(d => d.open = true)")
        chain_buttons |= set(pg.eval_on_selector_all('#v-topics button[data-chain]', 'bs => bs.map(b => b.dataset.chain)'))

        pg.evaluate("MODPAGE = null; show('topics')")
        if pg.locator(f'.modbtn[data-mod="{m}"][data-sec="worksheets"]').count():
            page(pg, m, 'worksheets')
            ws = pg.eval_on_selector_all('#v-topics button[data-chain]', 'bs => bs.map(b => b.dataset.chain)')
            srcs = pg.evaluate("ids => ids.map(id => CHAINS.find(c => c.id === id).src)", ws)
            ok(f'module {m}: worksheets hold only handout problems ({len(ws)})', ws and 'example' not in srcs)
            chain_buttons |= set(ws)

    ok('extra practice stays out of the main bank and the exam pools',
       pg.evaluate("EXTRAS.length > 0 && !EXTRAS.some(x => QUESTIONS.includes(x)) && !POOLS.some(p => poolQuestions(p).some(q => q.extra))"))
    pg.evaluate("MODPAGE = {module: 6, sec: 'calcs'}; show('topics')")
    pg.locator('#v-topics [data-xtype]').first.click(); pg.wait_for_timeout(150)
    ok('an Extra practice row draws only extra problems of its kind',
       pg.evaluate("Q.pool.length > 0 && Q.pool.every(q => q.extra && q.xtype === Q.pool[0].xtype)"))
    allc = set(pg.evaluate("CHAINS.map(c => c.id)"))
    ok(f'every problem set has a Start button ({len(chain_buttons & allc)} of {len(allc)})', allc <= chain_buttons)

    pg.evaluate("MODPAGE = null; show('topics')")
    pg.click('#v-topics button[data-view="eq"]'); pg.wait_for_timeout(200)
    ok('the Equations entry in the outline opens the equation drill', pg.evaluate("VIEW") == 'eq')
    pg.evaluate("MODPAGE = {module: 6, sec: 'calcs'}; show('topics')")
    pg.click('#nav button[data-v="topics"]'); pg.wait_for_timeout(150)
    ok('tapping Topics while on a module page returns to the module list', pg.locator('.modcard').count() == len(mods))

    # answer layout: on one page, then back to one at a time, never repeating
    pg.evaluate("MODPAGE = {module: 6, sec: 'calcs'}; show('topics')")
    pg.click('#v-topics [data-calcall]'); pg.wait_for_timeout(150)
    pg.click('#v-quiz [data-layout="all"]'); pg.wait_for_timeout(200)
    cards = pg.locator('#v-quiz .allcard').count()
    ok(f'All on one page shows the drill as cards ({cards})', cards >= 2)
    first = pg.locator('#v-quiz .allcard').first
    fid = first.get_attribute('data-qid')
    first.locator('input.numin').fill(str(pg.evaluate(f"byId('{fid}').answer")))
    first.locator('[data-check]').click(); pg.wait_for_timeout(150)
    ok('a card answered on the page is marked in place and logged',
       pg.locator(f'#v-quiz .allcard[data-qid="{fid}"] .verdict.ok').count() == 1 and pg.evaluate("DB.answers.slice(-1)[0].qid") == fid)
    pg.click('#v-quiz [data-layout="one"]'); pg.wait_for_timeout(150)
    seen = []
    for _ in range(40):
        cur = pg.evaluate("Q && Q.current && Q.current.id")
        if not cur: break
        seen.append(cur); pg.evaluate("Q.revealed = true; markDone(Q.current.id); nextQuestion()")
    ok(f'switching back to one at a time never asks it again ({len(seen)} served)', fid not in seen)
    pg.evaluate("DB.settings.layout = 'all'; EX = null; show('exam')"); pg.wait_for_timeout(150)
    pg.click('#startExam'); pg.wait_for_timeout(300)
    n = pg.locator('#v-exam .allcard').count()
    ok(f'the exam on one page shows every question ({n})', n == pg.evaluate("EX.qs.length") and pg.locator('#exClock').count() == 1)
    pg.evaluate("window.confirm = () => true"); pg.click('#exEnd'); pg.wait_for_timeout(300)
    ok('submitting the one-page paper shows the result', pg.evaluate("EX && EX.done"))
    pg.evaluate("DB.settings.layout = 'one'; EX = null")

    ok('no uncaught error', not errs)
    if errs: print('   ', errs[:3])
    b.close()
print('\nLayout test ' + ('passed' if not fails else 'FAILED: %d' % len(fails)))
sys.exit(1 if fails else 0)
