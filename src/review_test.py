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
    # a module's buttons sit inside its exam's card, which may start closed
    btn = f'.modbtn[data-mod="{module}"][data-sec="{sec}"]'
    if not pg.is_visible(btn):
        pg.click(f'details.examgrp:has({btn}) > summary'); pg.wait_for_timeout(100)
    pg.click(btn); pg.wait_for_timeout(150)

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1100, 'height': 1300})
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.add_init_script("window.prompt = () => 'Layout'")
    pg.goto(OUT.as_uri()); pg.wait_for_timeout(700)

    print('\n=== Module layout ===')
    mods = pg.evaluate("outline().filter(m => m.module != null && modulePool(m.module).length).map(m => m.module)")
    ok(f'one card per module ({len(mods)})', pg.locator('.modcard').count() == len(mods))
    grp = pg.evaluate("[...document.querySelectorAll('details.examgrp')].map(d => [+d.dataset.examgrp, [...d.querySelectorAll('.modbtn[data-sec=concepts]')].map(x => +x.dataset.mod), !!d.querySelector('.recapcard'), d.open])")
    want = {e: sorted({l['module'] for l in pg.evaluate('COURSE.lectures') if l['exam'] == e and l['module'] in mods}) for e, *_ in grp}
    ok('each exam card holds exactly its own modules: ' + '; '.join(f'exam {e}: {m}' for e, m, *_ in grp),
       all(sorted(m) == want[e] for e, m, *_ in grp) and sorted(x for _, m, *_ in grp for x in m) == sorted(mods))
    ok('each exam card ends with a review of the whole exam', all(r for *_, r, _ in grp))
    ok('only the exam being prepared for starts open',
       all(o == (e == pg.evaluate('EXAM.id')) for e, _, _, o in grp))
    print('\n=== Quiz prep ===')
    live = pg.evaluate("(COURSE.quizzes||[]).filter(quizLive).map(z=>z.id)")
    if live:
        qid = live[0]
        ok(f'a card for {qid} is on the page', pg.locator('.quizcard').count() == len(live))
        qmods = pg.evaluate("COURSE.quizzes.find(z=>z.id===%r).modules" % qid)
        pool_mods = pg.evaluate("[...new Set(quizScope(COURSE.quizzes.find(z=>z.id===%r)).map(q=>q.module))]" % qid)
        ok('the quiz pool holds only the modules she named', bool(pool_mods) and all(m in qmods for m in pool_mods))
        avail = pg.evaluate("quizScope(COURSE.quizzes.find(z=>z.id===%r)).filter(q=>!q.lowYield).length" % qid)
        pg.click('[data-quizn="8"]'); pg.wait_for_timeout(150)
        pg.click(f'[data-quizpaper="{qid}"]'); pg.wait_for_timeout(300)
        n = pg.evaluate("EX && EX.running ? EX.qs.length : 0")
        ok('a practice quiz of the chosen length starts on the exam engine', n == min(8, avail))
        ok('its clock runs on the quiz minutes', pg.evaluate("Math.round((EX.ends-Date.now())/60000)") == pg.evaluate("COURSE.quizzes.find(z=>z.id===%r).minutes" % qid))
        kinds = pg.evaluate("EX.qs.map(q => kindOf(q))")
        ok('the paper is half concept, half calculation, as her quizzes are', kinds.count('concept') == min(8, avail) // 2 and kinds.count('calc') == min(8, avail) - min(8, avail) // 2)
        ok('no worksheet part is on the paper while stand-alone items suffice', not any(i.startswith(('ws', 'hw')) for i in pg.evaluate("EX.qs.map(q => q.id)")))
        pg.evaluate("finishExam()"); pg.wait_for_timeout(200)
        ok('the paper is logged under the quiz, not the exam', pg.evaluate("DB.exams[DB.exams.length-1].exam") == qid)
        pg.evaluate("EX=null; show('topics')"); pg.wait_for_timeout(200)
        pg.click('[data-quizmin="15"]'); pg.wait_for_timeout(150)
        pg.click(f'[data-quizpaper="{qid}"]'); pg.wait_for_timeout(300)
        ok('a minutes chip sets the clock of the practice quiz', pg.evaluate("Math.round((EX.ends-Date.now())/60000)") == 15)
        pg.evaluate("clearInterval(EX.timer); EX=null; show('topics')"); pg.wait_for_timeout(200)
        pg.evaluate("EX=null; show('topics')"); pg.wait_for_timeout(200)
        pg.click(f'[data-quizhide="{qid}"]'); pg.wait_for_timeout(150)
        gone = pg.locator('.quizcard').count() == len(live) - 1
        pg.reload(); pg.wait_for_timeout(500)
        ok('Hide removes the card and the choice survives a reload', gone and pg.locator('.quizcard').count() == len(live) - 1)
        pg.evaluate("localStorage.removeItem(QUIZ_HIDE_KEY + %r)" % qid); pg.reload(); pg.wait_for_timeout(500)
        ok('a quiz whose time has passed shows no card',
           pg.evaluate("quizLive(Object.assign({}, COURSE.quizzes[0], {id:'past', when:'2000-01-01T08:00', minutes:24}))") is False)
    else:
        print('  skip  no quiz is live today, so the card is not on the page')

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

    # Explain more: every question links somewhere, and every target exists
    nolink = pg.evaluate("QUESTIONS.concat(EXTRAS).filter(q => !linksFor(q).length).map(q => q.id)")
    ok(f'every question has at least one Explain-more link ({len(nolink)} without)', not nolink)
    targets = pg.evaluate("[...new Set(QUESTIONS.concat(EXTRAS).flatMap(q => linksFor(q).map(l => l[0] + ':' + l[1])))]")
    missing = []
    for t in targets:
        v, a = t.split(':')
        pg.evaluate(f"show('{v}')")
        if not pg.evaluate(f"!!document.getElementById('{a}')"): missing.append(t)
    ok(f'every Explain-more target exists ({len(targets)} targets)', not missing)
    if missing: print('   ', missing[:8])
    pg.evaluate("RET = []; startChain('m6-ex1')"); pg.wait_for_timeout(150)
    pg.fill('#numIn', '1'); pg.click('#btnCheck'); pg.wait_for_timeout(150)
    pg.click('#v-quiz [data-mk="setup"]'); pg.wait_for_timeout(150)
    qid = pg.evaluate("Q.current.id")
    pg.locator('#v-quiz [data-jump]').first.click(); pg.wait_for_timeout(250)
    went = pg.evaluate("VIEW")
    ok(f'an Explain-more button opens its section ({went}) and offers the way back', went != 'quiz' and pg.locator('#backbtn').count() == 1)
    pg.click('#backbtn'); pg.wait_for_timeout(250)
    ok('the way back returns to the same answered question',
       pg.evaluate("VIEW") == 'quiz' and pg.evaluate("Q.current.id") == qid and pg.locator('#v-quiz .verdict').count() == 1 and pg.locator('#backbtn').count() == 0)

    pg.evaluate("RET = []; backBtn(); startPool(QUESTIONS.filter(q => q.id === 'fig-ord-4'), 'x')"); pg.wait_for_timeout(150)
    pg.locator('#v-quiz .opt').first.click(); pg.wait_for_timeout(150)
    pg.locator('#v-quiz [data-jump^="diag"]').click(); pg.wait_for_timeout(900)
    top = pg.evaluate("document.getElementById('dg-ord_semilog_curve').getBoundingClientRect().top")
    ok(f'a jump lands its section just below the header ({round(top)} px from the top)', 40 <= top <= 160)
    pg.click('#backbtn'); pg.wait_for_timeout(200)

    print('\n=== Number boxes on two tabs ===')
    # a numeric question parked on the Quiz tab must not catch the exam's typing
    pg.evaluate("RET = []; backBtn(); EX = null; startPool(QUESTIONS.filter(q => qType(q) === 'numeric').slice(0, 1), 'x')"); pg.wait_for_timeout(150)
    pg.evaluate("const qs = QUESTIONS.filter(q => qType(q) === 'numeric').slice(1, 3); startPaper(qs, 5, {title:'probe', paper:'probe', sata:{per:[],drawn:0}, coverage:{drawn:0,missing:0,short:[],shares:[]}}); show('exam')"); pg.wait_for_timeout(200)
    ok('the exam shows its own number box', pg.locator('#v-exam #numIn').count() == 1)
    pg.fill('#v-exam #numIn', '12.5'); pg.wait_for_timeout(100)
    ok('typing in the exam box is kept as the exam answer', pg.evaluate("EX.picks[0]") == '12.5')
    ok('the parked quiz question is untouched', pg.evaluate("Q.picked") is None)
    pg.evaluate("clearInterval(EX.timer); EX = null; show('quiz')"); pg.wait_for_timeout(150)
    pg.fill('#v-quiz #numIn', '7'); pg.keyboard.press('Enter'); pg.wait_for_timeout(200)
    ok('a quiz answer typed after the paper is graded from the quiz box', pg.evaluate("Q.revealed && String(Q.picked) === '7'"))
    ok('a blank numeric miss reads as left blank', pg.evaluate("pickedRead(Q.current, {picked: ''}).txt") == 'left blank')
    ok('the article before a miss kind is right', pg.evaluate("[an('unit conversion'), an('algebra'), an('set-up')].join('|')") == 'a unit conversion|an algebra|a set-up')

    ok('no uncaught error', not errs)
    if errs: print('   ', errs[:3])
    b.close()
print('\nLayout test ' + ('passed' if not fails else 'FAILED: %d' % len(fails)))
sys.exit(1 if fails else 0)
