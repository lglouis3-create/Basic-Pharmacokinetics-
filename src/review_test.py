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
import os, pathlib, sys
REPO = pathlib.Path(__file__).resolve().parent.parent
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
    print('\n=== Folded sections ===')
    pg.evaluate("show('ref')"); pg.wait_for_timeout(200)
    ok('Reference opens with its sections folded and grouped by exam',
       pg.locator('#v-ref details.dsec').count() >= 10 and pg.locator('#v-ref details.dsec[open]').count() == 0 and pg.locator('#v-ref details.dgrp').count() == 2)
    ok('the exam being prepared for is the open group', pg.evaluate("document.querySelector('#v-ref details.dgrp[data-examgrp=\"doc-2\"]').open") is True and pg.evaluate("document.querySelector('#v-ref details.dgrp[data-examgrp=\"doc-1\"]').open") is False)
    pg.click('#v-ref [data-fold="open"]'); pg.wait_for_timeout(150)
    ok('Expand all opens every section', pg.locator('#v-ref details.dsec:not([open])').count() == 0)
    pg.reload(); pg.wait_for_timeout(600); pg.evaluate("show('ref')"); pg.wait_for_timeout(200)
    ok('the choice survives a reload', pg.locator('#v-ref details.dsec:not([open])').count() == 0)
    pg.evaluate("show('guide')"); pg.wait_for_timeout(200)
    ok('Guides folds each objective inside its module', pg.locator('#v-guide details.dmod').count() >= 8 and pg.locator('#v-guide details.dsec').count() >= 30)
    pg.evaluate("show('tell')"); pg.wait_for_timeout(200)
    ok('Tell apart has an Exam 1, a both-exams and an Exam 2 group', pg.locator('#v-tell details.dgrp').count() == 3)
    pg.evaluate("show('settings')"); pg.wait_for_timeout(200)
    ok('the change log in Settings starts folded', pg.evaluate("document.getElementById('changelog').open") is False)
    pg.evaluate("['guide','ref','tell','diag'].forEach(p => LS.set(FOLD_KEY + p, 'open'))"); pg.evaluate("show('topics')"); pg.wait_for_timeout(200)

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

    pg.evaluate("RET = []; backBtn(); show('tell')"); pg.wait_for_timeout(200)
    pg.select_option('select[data-xsel="dosing"]', 'm3-infusion'); pg.wait_for_timeout(200)
    pg.click('[data-jump="diag:dg-infusion_steps"]'); pg.wait_for_timeout(500)
    pg.click('#backbtn'); pg.wait_for_timeout(300)
    ok('the way back from a step-through reopens the Explain-one card it left',
       pg.evaluate("VIEW") == 'tell' and pg.evaluate("document.querySelector('select[data-xsel=\"dosing\"]').value") == 'm3-infusion' and pg.locator('[data-xout="dosing"] .xexp').count() == 1)
    pg.evaluate("RET = []; backBtn(); show('quiz')"); pg.wait_for_timeout(150)

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
    ok('the quiz hint names the 2% rule and no absolute tolerance', 'within 2% of the keyed value' in pg.locator('#v-quiz .sata').inner_text() and 'within 0.' not in pg.locator('#v-quiz .sata').inner_text())
    pg.fill('#v-quiz #numIn', '7'); pg.keyboard.press('Enter'); pg.wait_for_timeout(200)
    ok('a quiz answer typed after the paper is graded from the quiz box', pg.evaluate("Q.revealed && String(Q.picked) === '7'"))
    ok('a blank numeric miss reads as left blank', pg.evaluate("pickedRead(Q.current, {picked: ''}).txt") == 'left blank')
    pg.evaluate("RET = []; backBtn(); EX = null; startPool(QUESTIONS.filter(q => q.id === 'cq3-5'), 'x'); show('quiz')"); pg.wait_for_timeout(150)
    pg.fill('#v-quiz #numIn', '2.6 hr'); pg.keyboard.press('Enter'); pg.wait_for_timeout(200)
    ok('a number typed with its unit is graded right', pg.evaluate("Q.revealed && gradeAnswer(Q.current, Q.picked)"))
    ok('the article before a miss kind is right', pg.evaluate("[an('unit conversion'), an('algebra'), an('set-up')].join('|')") == 'a unit conversion|an algebra|a set-up')

    print('\n=== Equations: one module at a time ===')
    pg.evaluate("RET = []; backBtn(); EX = null; SU = null; EQ = null; show('eq')"); pg.wait_for_timeout(150)
    pg.click('#v-eq button[data-pick="m:4"]'); pg.wait_for_timeout(200)
    ok('Only Module 4 selects that module and nothing else', pg.evaluate("eqChosen().length === EQUATIONS.filter(e => e.module === 4).length && eqChosen().every(id => EQ_BY_ID[id].module === 4)"))
    pg.click('#v-eq button[data-start="type"]'); pg.wait_for_timeout(200)
    ok('Start then drills only that module', pg.evaluate("EQ && EQ.queue.every(id => EQ_BY_ID[id].module === 4)"))
    pg.evaluate("EQ = null")

    print('\n=== Set-up drill, sheet map, guess then stuck ===')
    pg.evaluate("RET = []; backBtn(); EX = null; SU = null; EQ = null; show('eq')"); pg.wait_for_timeout(150)
    ok('the Equations picker offers the set-up drill with a scope per module', pg.locator('#v-eq .sucard').count() == 1 and pg.locator('#v-eq button[data-su="all"]').count() == 1 and pg.locator('#v-eq button[data-su="3"]').count() == 1)
    pg.click('#v-eq button[data-su="3"]'); pg.wait_for_timeout(200)
    ok('starting it shows one of her Module 3 stems with four lines to choose from', pg.locator('#v-eq .suq .stem').count() == 1 and pg.locator('#v-eq .suopt').count() == 4 and pg.evaluate("SU.queue.every(q => q.module === 3)"))
    wrong = pg.evaluate("(() => { const q = SU.queue[SU.i]; return SU.page[q.id].options.findIndex(o => o.id !== q.setup.eq); })()")
    pg.click(f'#v-eq button[data-suopt="{wrong}"]'); pg.wait_for_timeout(200)
    sud = pg.evaluate("({w: document.querySelectorAll('#v-eq .suopt.wrong').length, r: document.querySelectorAll('#v-eq .suopt.right').length, vb: document.querySelectorAll('#v-eq .verdict.bad').length, sr: document.querySelectorAll('#v-eq .suright').length, asked: SU.asked, right: SU.right, id: SU.queue[SU.i].id, layout: layoutOf(), picked: SU.page[SU.queue[SU.i].id].picked})")
    ok(f'a wrong pick is marked, the right line is shown with why, and the lines used on the way ({sud})', sud['w'] == 1 and sud['r'] == 1 and sud['vb'] == 1 and sud['sr'] == 1 and sud['asked'] == 1 and sud['right'] == 0)
    ok('the wrong line is tallied per equation', pg.evaluate("Object.values(suStats()).some(r => r.wrong === 1)"))
    pg.click('#v-eq [data-sushow]'); pg.wait_for_timeout(150)
    ok('Show the problem worked out opens the keyed answer and the steps in place', pg.locator('#v-eq .suwork .steps .step').count() >= 1 and pg.locator('#v-eq .suq').count() == 1)
    pg.evaluate("(() => { const q = suPoolAll().find(x => x.setup.eq === 'thalf-cl-vd'); SU = {queue: [q], i: 0, right: 0, asked: 0, scope: 'all', page: {}}; renderEq(); })()"); pg.wait_for_timeout(150)
    right = pg.evaluate("(() => { const q = SU.queue[0]; return SU.page[q.id].options.findIndex(o => o.id === q.setup.eq); })()")
    pg.click(f'#v-eq button[data-suopt="{right}"]'); pg.wait_for_timeout(150)
    ok('a line the sheet does not print comes with the way to reach it', pg.locator('#v-eq .derive').count() == 1 and 'Cl = k' in pg.locator('#v-eq .derive').inner_text())
    ok('the stems come shuffled', pg.evaluate("(() => { const a = suScopePool('all').map(q => q.id); const s1 = shuffle(a.slice()), s2 = shuffle(a.slice()); return s1.join() !== s2.join() || s1.join() !== a.join(); })()"))
    ok('Work the full problem opens that stem in the quiz', (pg.click('#v-eq [data-suwork]'), pg.wait_for_timeout(200), pg.evaluate("VIEW === 'quiz' && Q.pool.length === 1 && Q.current.setup != null"))[2])
    pg.evaluate("show('ref')"); pg.wait_for_timeout(200)
    pg.evaluate("(() => { const s = document.querySelector('#v-ref .sheetmap'); let d = s.closest('details'); while(d){ d.open = true; d = d.parentElement.closest('details'); } })()")
    ok('Reference opens with the sheet map first: 52 lines in four columns, coloured by module', pg.locator('#v-ref .sheetmap .smlines .smline').count() == 52 + 5 and pg.locator('#v-ref .sheetmap .smcol').count() == 5 and pg.locator('#v-ref .sheetmap .smline.m6').count() >= 10)
    ok('the first folded section of Reference is the sheet map', pg.locator('#v-ref details.dsec').first.locator('h3').inner_text().startswith('Her equation sheet'))
    ok('every line carries its dosing model label', pg.locator('#v-ref .sheetmap .smline .smmodel').count() == 52 + 5)
    pg.click('#v-ref [data-sheetorder="asks"]'); pg.wait_for_timeout(200)
    ok('By what is asked regroups the same lines under the quantity asked, C at a time first', pg.locator('#v-ref .sheetmap .smline').count() == 52 + 5 and pg.locator('#v-ref .sheetmap .smcol').first.inner_text().startswith('C at a time') and pg.evaluate("sheetOrder()") == 'asks')
    pg.click('#v-ref [data-sheetorder="model"]'); pg.wait_for_timeout(200)
    ok('By dosing model groups them by model and the choice is remembered', pg.locator('#v-ref .sheetmap .smcol').count() >= 15 and pg.evaluate("localStorage.getItem(SHEET_ORDER_KEY)") == 'model')
    pg.click('#v-ref [data-sheetorder="print"]'); pg.wait_for_timeout(200)
    ok('the printable sheet reproduces the two pages in two columns with a model tag on every line', pg.evaluate("(() => { const d = document.createElement('div'); d.innerHTML = sheetPrintHTML(); return d.querySelectorAll('.sppage').length === 2 && d.querySelectorAll('.spcol').length === 4 && d.querySelectorAll('.spline').length === 57 && d.querySelectorAll('.sptag').length === 57; })()"))
    pg.click('#v-ref .sheetmap [data-sheetdrill="css"]'); pg.wait_for_timeout(200)
    ok('Drill this line starts the typing drill on that one line', pg.evaluate("VIEW === 'eq' && EQ && EQ.queue.length === 1 && EQ.queue[0] === 'css' && EQ.mode === 'type'"))
    pg.evaluate("EQ = null; SU = null; startPool(QUESTIONS.filter(q => q.id === 'inf-n5'), 'x'); show('quiz')"); pg.wait_for_timeout(150)
    pg.fill('#v-quiz #numIn', '2.84'); pg.keyboard.press('Enter'); pg.wait_for_timeout(200)
    pg.click('#btnGuess'); pg.wait_for_timeout(200)
    ok('a correct answer marked as a guess is asked where it got stuck', pg.locator('#v-quiz .misskind').count() == 1 and 'stuck' in pg.locator('#v-quiz .misskind p').inner_text())
    pg.click('#v-quiz [data-mk="setup"]'); pg.wait_for_timeout(200)
    last = pg.evaluate("DB.answers[DB.answers.length-1]")
    ok('the kind of miss is written onto the guessed entry', last['result'] == 'guessed' and last.get('missKind') == 'setup')
    ok('a set-up miss names the line and offers the set-up drill for the module', pg.locator('#v-quiz [data-sheetsetup="3"]').count() == 1 and pg.locator('#v-quiz .misskind').count() == 0)
    pg.click('#v-quiz [data-sheetsetup="3"]'); pg.wait_for_timeout(200)
    ok('that chip starts the drill scoped to the module', pg.evaluate("VIEW === 'eq' && SU && SU.scope === '3'"))
    pg.click('#v-eq [data-layout="all"]'); pg.wait_for_timeout(200)
    ok('All on one page shows ten stems at once, each with its own four lines', pg.locator('#v-eq .suq').count() == 10 and pg.locator('#v-eq .suq').first.locator('.suopt').count() == 4)
    right = pg.evaluate("(() => { const q = SU.queue[SU.i + 2]; return SU.page[q.id].options.findIndex(o => o.id === q.setup.eq); })()")
    pg.click(f'#v-eq [data-suq="2"] button[data-suopt="{right}"]'); pg.wait_for_timeout(150)
    ok('a card answered on the page is marked in place and the tally moves', pg.locator('#v-eq [data-suq="2"] .verdict.ok').count() == 1 and pg.locator('#v-eq .suq').count() == 10 and pg.evaluate("SU.asked === 1 && SU.right === 1"))
    pg.click('#v-eq [data-sunext="page"]'); pg.wait_for_timeout(200)
    ok('Next moves on by a page', pg.evaluate("SU.i === 10"))
    pg.click('#v-eq [data-layout="one"]'); pg.wait_for_timeout(200)
    ok('switching back shows one stem at a time', pg.locator('#v-eq .suq').count() == 1 and pg.evaluate("layoutOf() === 'one'"))
    pg.evaluate("SU = null")

    print('\n=== No, I was right ===')
    pg.evaluate("RET = []; backBtn(); EX = null; startPool(QUESTIONS.filter(q => q.id === 'cq3-7'), 'x'); show('quiz')"); pg.wait_for_timeout(150)
    pg.evaluate("st('renal-clearance-from-urine').box = 2; st('renal-clearance-from-urine').streak = 2; save()")
    pg.fill('#v-quiz #numIn', '=3.13'); pg.keyboard.press('Enter'); pg.wait_for_timeout(200)
    ok('a number with a stray character is graded wrong', pg.evaluate("Q.revealed && !gradeAnswer(Q.current, Q.picked)") and pg.locator('#btnRight').count() == 1)
    pg.click('#btnRight'); pg.wait_for_timeout(200)
    last = pg.evaluate("DB.answers[DB.answers.length-1]")
    stc = pg.evaluate("DB.concepts['renal-clearance-from-urine']")
    ok('the log entry flips to correct and is marked as an override', last['result'] == 'correct' and last.get('overrode') is True and 'missKind' not in last)
    ok('box and streak go back to where they were and advance', stc['box'] == 3 and stc['streak'] == 3)
    ok('the verdict reads as counted right and the miss-kind prompt is gone', pg.locator('#v-quiz .verdict.ok').count() == 1 and pg.locator('#v-quiz .misskind').count() == 0 and pg.locator('#btnRight').count() == 0)
    ok('a second press has nothing to flip', pg.evaluate("markRight(Q.current)") is False)

    pg.evaluate("const qs = QUESTIONS.filter(q => q.id === 'cq3-6'); startPaper(qs, 5, {title:'probe', paper:'probe', sata:{per:[],drawn:0}, coverage:{drawn:0,missing:0,short:[],shares:[]}}); show('exam')"); pg.wait_for_timeout(200)
    pg.fill('#v-exam #numIn', '188..2'); pg.wait_for_timeout(100)
    pg.evaluate("finishExam()"); pg.wait_for_timeout(200)
    ok('the paper scores the slip as a miss', pg.evaluate("DB.exams[DB.exams.length-1].right") == 0 and pg.locator('#v-exam button[data-right]').count() == 1)
    pg.click('#v-exam button[data-right]'); pg.wait_for_timeout(200)
    ok('a submitted paper offers the clip and does not play it on its own', pg.locator('#cheerGo').count() == 1 and pg.locator('#cheer').count() == 0)
    # the headless browser cannot decode the clip, so the box is read in the same tick it opens
    src = pg.evaluate("(() => { document.getElementById('cheerGo').click(); const v = document.querySelector('#cheer video'); return v ? v.getAttribute('src') : null; })()")
    ok('pressing the offer opens the box with one of the two clips', src in ('media/cheer-1.mp4', 'media/cheer-2.mp4'))
    ok('Close removes it', pg.evaluate("(() => { const b = document.getElementById('cheer'); if(b) b.remove(); celebrate(); document.getElementById('cheerClose').click(); return !document.getElementById('cheer'); })()"))
    ok('two clips are on offer and both files are in the repository', pg.evaluate("CHEER.length") == 2 and all((REPO / p).exists() for p in pg.evaluate("CHEER")))
    pg.evaluate("DB.settings.cheer = false; save(); const b = document.getElementById('cheer'); if(b) b.remove(); renderExamResult()"); pg.wait_for_timeout(100)
    ok('with the setting off there is no offer', pg.locator('#cheerGo').count() == 0 and pg.locator('#cheer').count() == 0)
    pg.evaluate("DB.settings.cheer = true; save()")
    ok('the paper remembers which log entry each answer made', pg.evaluate("Array.isArray(EX.logQn) && EX.logQn.length === EX.qs.length"))
    ok('the review counts it right and the paper record follows', pg.evaluate("DB.exams[DB.exams.length-1].right") == 1 and pg.locator('#v-exam h2').inner_text().startswith('probe — 1 / 1') and pg.locator('#v-exam button[data-right]').count() == 0)
    pg.evaluate("EX = null")

    pg.evaluate("show('eq')"); pg.wait_for_timeout(150)
    eqid = pg.evaluate("EQUATIONS[0].id")
    pg.evaluate("EQ = {queue:[%r], i:0, mode:'type', step:'type', asked:0, right:0, slots:[], tray:[]}; eqLoad(); renderEq()" % eqid); pg.wait_for_timeout(150)
    pg.fill('#eqIn', 'nonsense'); pg.keyboard.press('Enter'); pg.wait_for_timeout(200)
    ok('a wrong equation offers the override', pg.locator('#eqRight').count() == 1 and pg.evaluate("eqStat(%r).wrong" % eqid) >= 1)
    before = pg.evaluate("eqStat(%r).right" % eqid)
    pg.click('#eqRight'); pg.wait_for_timeout(150)
    ok('the equation record flips to right', pg.evaluate("eqStat(%r).right" % eqid) == before + 1 and pg.evaluate("EQ.ok") is True and pg.locator('#eqRight').count() == 0)
    pg.evaluate("EQ = null; show('eq')"); pg.wait_for_timeout(100)
    pg.evaluate("EQ = {queue:[%r], i:0, mode:'type', step:'type', asked:0, right:0, slots:[], tray:[]}; eqLoad(); renderEq()" % eqid); pg.wait_for_timeout(150)
    pg.click('#eqShow'); pg.wait_for_timeout(150)
    ok('Show me offers no override', pg.locator('#eqRight').count() == 0)
    pg.evaluate("EQ = null")

    print('\n=== What the wrong number says ===')
    pg.evaluate("Q = null; EQ = null; SU = null; startSweepOf([byId('m6-p1g')], 'probe')"); pg.wait_for_timeout(200)
    pg.fill('#v-quiz #numIn', '2.49'); pg.keyboard.press('Enter'); pg.wait_for_timeout(250)
    diag = pg.evaluate("(() => { const d = document.querySelector('#v-quiz .misskind .diag'); return d ? d.textContent : ''; })()")
    ok('a wrong number is read back: ' + diag[:60], '2.49 is 42.37 ÷ 17.03' in diag and 'points to algebra' in diag)
    ok('the kind it points to is marked as suggested, and every kind stays choosable', pg.evaluate("document.querySelector('#v-quiz .misskind button.suggest').dataset.mk") == 'algebra' and pg.locator('#v-quiz .misskind button[data-mk]').count() == 4)
    pg.click('#v-quiz .misskind button[data-mk="setup"]'); pg.wait_for_timeout(200)
    last = pg.evaluate("DB.answers[DB.answers.length-1]")
    ok('the student\'s choice is logged, with what the number pointed to beside it', last['missKind'] == 'setup' and last.get('missSuggest') == 'algebra')
    ok('the feedback says both', 'The number itself pointed to algebra' in pg.inner_text('#v-quiz'))
    pg.evaluate("show('gaps')"); pg.wait_for_timeout(150)
    ok('Weak spots shows the disagreement on the missed card', 'the number itself pointed to algebra' in pg.inner_text('#v-gaps'))
    pg.evaluate("DB.answers.pop(); save(); Q = null")

    print('\n=== The givens table and the sanity check ===')
    pg.evaluate("Q = null; EQ = null; SU = null; DB.settings.layout = 'one'; startSweepOf([byId('ws6-b2g')], 'probe')"); pg.wait_for_timeout(200)
    ok('before the answer, a button offers the givens and no table shows', pg.locator('#v-quiz [data-givens]').count() == 1 and pg.locator('#v-quiz .givens').count() == 0)
    pg.click('#v-quiz [data-givens]'); pg.wait_for_timeout(150)
    ok('the table lists symbol and value only, roles hidden', pg.locator('#v-quiz .givens tr').count() == 7 and pg.locator('#v-quiz .givens .grole').count() == 0 and 'not needed' not in pg.inner_text('#v-quiz .givens'))
    pg.fill('#v-quiz #numIn', '0.033'); pg.keyboard.press('Enter'); pg.wait_for_timeout(250)
    diag = pg.evaluate("(() => { const d = document.querySelector('#v-quiz .misskind .diag'); return d ? d.textContent : ''; })()")
    ok('a number outside the stem\'s bounds is read as a set-up slip with the check text: ' + diag[:50], 'lies outside what the stem allows' in diag and 'two half-lives' in diag and pg.evaluate("document.querySelector('#v-quiz .misskind button.suggest').dataset.mk") == 'setup')
    pg.click('#v-quiz .misskind button[data-mk="setup"]'); pg.wait_for_timeout(200)
    ok('after the answer the table shows every role, distractors marked not needed', pg.locator('#v-quiz .givens .grole').count() == 7 and pg.locator('#v-quiz .givens .gskip').count() == 4)
    ok('the roles render fractions and the sanity check follows the working', pg.locator('#v-quiz .givens .frac').count() >= 1 and pg.locator('#v-quiz .sanity').count() == 1 and '10 → 5 → 2.5' in pg.inner_text('#v-quiz .sanity'))
    ok('the trough question names the trough-from-peak line, not the C0 form', pg.evaluate("byId('ws6-b2g').setup.eq") == 'cmin-from-cmax' and 'Divide the two sheet lines' in pg.inner_text('#v-quiz .derive'))
    pg.evaluate("DB.answers.pop(); save(); Q = null; suStart('6')"); pg.wait_for_timeout(200)
    pg.evaluate("SU.queue.unshift(SU.queue.splice(SU.queue.findIndex(q => q.id === 'ws6-b2g'), 1)[0]); SU.i = 0; renderEq()"); pg.wait_for_timeout(150)
    pg.evaluate("(() => { const q = SU.queue[0], st = suState(q); const i = st.options.findIndex(o => o.id === q.setup.eq); document.querySelector('#v-eq [data-suopt=\"' + i + '\"]').click(); })()"); pg.wait_for_timeout(150)
    pg.click('#v-eq [data-sushow]'); pg.wait_for_timeout(150)
    ok('the set-up drill\'s worked block carries the givens and the check too', pg.locator('#v-eq .suwork .givens').count() == 1 and pg.locator('#v-eq .suwork .sanity').count() == 1)
    pg.evaluate("SU = null; show('topics')"); pg.wait_for_timeout(100)

    print('\n=== Plan the problem: model, line, givens ===')
    pg.evaluate("Q = null; EQ = null; SU = null; DB.settings.layout = 'one'; suStart('plan:6')"); pg.wait_for_timeout(200)
    pg.evaluate("SU.queue.unshift(SU.queue.splice(SU.queue.findIndex(q => q.id === 'ws6-b2g'), 1)[0]); SU.i = 0; renderEq()"); pg.wait_for_timeout(150)
    ok('the plan card asks for the dosing model first and holds the line back', pg.locator('#v-eq [data-sumodel]').count() == 10 and pg.locator('#v-eq [data-suopt]').count() == 0)
    pg.click('#v-eq [data-sumodel="oral"]'); pg.wait_for_timeout(150)
    ok('a wrong model is named against the right one, with the stem\'s words', 'Not Single oral dose' in pg.inner_text('#v-eq .verdict') and 'Repeated IV bolus' in pg.inner_text('#v-eq .verdict') and pg.locator('#v-eq [data-suopt]').count() == 4)
    pg.evaluate("(() => { const q = SU.queue[0], st = suState(q); const i = st.options.findIndex(o => o.id === q.setup.eq); document.querySelector('#v-eq [data-suopt=\"' + i + '\"]').click(); })()"); pg.wait_for_timeout(150)
    ok('after the line, the givens are offered as ticks with the roles hidden', pg.locator('#v-eq [data-sugiv]').count() == 7 and pg.locator('#v-eq .surole').count() == 0 and pg.locator('#v-eq [data-sugivcheck]').count() == 1)
    pg.click('#v-eq [data-sugiv="0"]'); pg.click('#v-eq [data-sugiv="5"]'); pg.click('#v-eq [data-sugiv="6"]'); pg.click('#v-eq [data-sugiv="1"]'); pg.wait_for_timeout(150)
    ok('ticks toggle and show as pressed', pg.locator('#v-eq [data-sugiv][aria-pressed="true"]').count() == 4)
    pg.click('#v-eq [data-sugivcheck]'); pg.wait_for_timeout(200)
    txt = pg.inner_text('#v-eq')
    ok('the check marks the one not-needed tick and shows every role', '1 not needed' in txt and pg.locator('#v-eq .surole').count() == 7 and pg.locator('#v-eq .sugiv.wrong').count() == 1)
    ok('the plan is then written out: model, line, givens, estimate', pg.locator('#v-eq .suplan li').count() == 4 and 'Before computing' in txt and 'Set aside' in txt)
    pg.evaluate("SU.page[SU.queue[0].id].giv = new Set(planNeeded(SU.queue[0])); SU.page[SU.queue[0].id].givChecked = false; SU.page[SU.queue[0].id].modelOk = true; SU.plans = 0; renderEq()"); pg.wait_for_timeout(100)
    pg.click('#v-eq [data-sugivcheck]'); pg.wait_for_timeout(150)
    ok('a plan with all three right counts as complete', pg.evaluate("SU.plans") == 1 and 'right givens' in pg.inner_text('#v-eq .verdict:last-of-type, #v-eq .why'))
    ok('the Equations card offers the plan drill per module', pg.evaluate("SU = null; show('eq'); document.querySelectorAll('.sucard [data-su^=\"plan:\"]').length") >= 2)
    pg.evaluate("SU = null; show('topics')"); pg.wait_for_timeout(100)

    print('\n=== Weak spots: repairs per kind of miss, Reference anchors ===')
    pg.evaluate("Q = null; EQ = null; SU = null")
    land = pg.evaluate("""(() => { const q = QUESTIONS.find(q => q.module === 2 && qType(q) === 'numeric');
      const l = linksFor(q).find(x => x[0] === 'ref'); if(!l) return 'no ref link'; show('ref');
      const t = document.getElementById(l[1]); return t ? t.textContent.trim() : 'no target'; })()""")
    ok('a Module 2 question\'s Reference chip lands on the Module 2 heading, not the one before it: ' + land[:40], land.startswith('Module 2'))
    ok('the sheet map is a Reference anchor', pg.evaluate("refAnchor('Her equation sheet')") == 'ref-0')
    seed = pg.evaluate("""(() => { const pool = suPoolAll().filter(q => QUESTIONS.includes(q));
      const a = pool.find(q => q.module === 2), b2 = pool.find(q => q.module === 3 && q.id !== a.id), c = pool.find(q => q.module === 5);
      const n = DB.answers.length;
      DB.answers.push({qid: a.id, result: 'wrong', missKind: 'setup', picked: '1', t: Date.now()});
      DB.answers.push({qid: b2.id, result: 'wrong', missKind: 'algebra', picked: '1', t: Date.now()});
      DB.answers.push({qid: c.id, result: 'wrong', missKind: 'unit', picked: '1', t: Date.now()});
      DB.answers.push({qid: c.id, result: 'wrong', missKind: 'round', picked: '1', t: Date.now()});
      show('gaps'); const el = document.getElementById('v-gaps');
      const lines = [b2.setup.eq, ...(b2.setup.pre || [])].filter(id => EQ_BY_ID[id]);
      return {n, ids: [a.id, b2.id, c.id], fixes: [...el.querySelectorAll('.fixrow b')].map(x => x.textContent),
        setupChips: [...el.querySelectorAll('.fixrow [data-sheetsetup]')].map(x => x.dataset.sheetsetup),
        unitJump: !!el.querySelector('.fixrow [data-jump^="ref:ref-"]'),
        typeIds: (el.querySelector('.fixrow [data-eqtype]') || {dataset: {}}).dataset.eqtype, lines: lines.join(','),
        cardLines: el.querySelectorAll('.missq .mline').length, cardChips: el.querySelectorAll('.missq .explainmore').length,
        missed: el.querySelectorAll('.missq').length,
        numMissed: [...new Set(DB.answers.filter(x => x.result === 'wrong').map(x => x.qid))].filter(id => byId(id) && qType(byId(id)) === 'numeric' && byId(id).setup && EQ_BY_ID[byId(id).setup.eq]).length}; })()""")
    ok('one repair per kind of miss that happened: ' + ', '.join(seed['fixes']), seed['fixes'] == ['Set-up', 'Unit conversion', 'Algebra', 'Rounding'])
    ok('the set-up repair offers the drill on the module where the line was wrong, and the sheet map', 'plan:2' in seed['setupChips'] and pg.evaluate("!!document.querySelector('#v-gaps .fixrow [data-jump=\"ref:ref-0\"]')"))
    ok('the unit repair jumps into Reference', seed['unitJump'])
    ok('the algebra repair names the lines behind the miss: ' + str(seed['typeIds']), seed['typeIds'] == seed['lines'])
    ok('every missed calculation card shows the line that solves it and Explain-more chips', seed['cardLines'] == seed['numMissed'] >= 3 and seed['cardChips'] == seed['missed'] >= 3)
    pg.click('#v-gaps .fixrow [data-eqtype]'); pg.wait_for_timeout(200)
    ok('clicking it opens the typing drill on those lines', pg.evaluate("VIEW === 'eq' && EQ && EQ.mode === 'type' && EQ.queue.join(',')") == seed['lines'])
    pg.evaluate("EQ = null; show('gaps')"); pg.wait_for_timeout(100)
    pg.click('#v-gaps .fixrow [data-sheetsetup]'); pg.wait_for_timeout(200)
    ok('the set-up chip starts the plan drill on that module', pg.evaluate("VIEW === 'eq' && SU && SU.scope === '2' && SU.mode === 'plan' && SU.queue.every(q => q.module === 2)"))
    pg.evaluate("SU = null; show('gaps')"); pg.wait_for_timeout(100)
    pg.click('#v-gaps .missq [data-jump^="guide:"], #v-gaps .missq [data-jump^="ref:"]'); pg.wait_for_timeout(200)
    ok('an Explain-more chip on a missed card jumps and offers the way back to Weak spots', pg.evaluate("VIEW !== 'gaps' && RET.length && RET[RET.length-1].view === 'gaps'"))
    pg.evaluate("RET = []; DB.answers.splice(%d); save(); show('gaps')" % seed['n']); pg.wait_for_timeout(100)
    ok('the set-up card offers no chip for a scope with no stems', pg.evaluate("""(() => { const keep = EXAM; const e3 = COURSE.exams.find(e => e.id === 3); if(!e3) return true;
      EXAM = e3; const h = suCardHTML(); EXAM = keep; return suScopePool('exam:3').length ? true : !h.includes('data-su="exam:3"'); })()"""))

    ok('no uncaught error', not errs)
    if errs: print('   ', errs[:3])
    b.close()
print('\nLayout test ' + ('passed' if not fails else 'FAILED: %d' % len(fails)))
sys.exit(1 if fails else 0)
