#!/usr/bin/env python3
"""Drive the built app in a real browser and fail on anything a user would hit.

The node checks parse the bank and exercise the engine, but they stub out the
DOM. This opens the actual file in Chromium, answers a question of every type
the bank holds, reveals the explanation and visits every view, so a fault that
only appears once the page runs — a boot error, a view that throws on click, an
image that does not decode — is caught before the file is delivered.

The path comes from course.js unless one is given on the command line.

    python3 browser_test.py [path-to-html]
"""
import glob, json, os, pathlib, re, sys
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))


def course_output():
    src = open(os.path.join(HERE, "course.js"), encoding="utf-8").read()
    m = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", src)
    if not m:
        sys.exit("ERROR: course.js declares no output")
    return "/mnt/user-data/outputs/" + m.group(1)


HTML = sys.argv[1] if len(sys.argv) > 1 else course_output()

# The question files that are actually BUILT, read out of build.py's DATA_FILES
# rather than globbed. A glob picks up fixtures and retired banks that sit in
# the directory but are not in the page — q1_sample.js is one — and then reports
# the page as short of questions it was never meant to carry.
def built_question_files():
    src = open(os.path.join(HERE, 'build.py'), encoding='utf-8').read()
    m = re.search(r'DATA_FILES\s*=\s*\[(.*?)\]', src, re.S)
    if not m:
        sys.exit('ERROR: could not read DATA_FILES out of build.py')
    names = re.findall(r"['\"]([^'\"]+\.js)['\"]", m.group(1))
    return [os.path.join(HERE, n) for n in names
            if re.match(r'^q.*\.js$', n) and os.path.exists(os.path.join(HERE, n))]


QSRC = built_question_files()

# A question object opens at column 0. The TOPICS entries in the first question
# file are indented, so they are not counted.
QRE = re.compile(r"(?m)^\{id:'[^']+',")


def source_counts():
    """How many questions and images the sources hold, so the page can be
    compared against them instead of against a number written here."""
    n = sum(len(QRE.findall(open(f, encoding='utf-8').read())) for f in QSRC)
    if n == 0:
        sys.exit('ERROR: counted no questions in the sources — the count pattern is wrong')
    return n, len(json.load(open(os.path.join(HERE, 'images.json'))))


fails = []
def check(ok, label, detail=''):
    print(('  ok    ' if ok else '  FAIL  ') + label + (f'  — {detail}' if detail and not ok else ''))
    if not ok:
        fails.append(label)


def skip(label, why):
    print(f'  SKIP  {label}  — {why}')


def main():
    path = pathlib.Path(HTML).resolve()
    if not path.exists():
        sys.exit(f'ERROR: {path} does not exist — run build.py first')

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 900})

        errors, console_errors = [], []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('console', lambda m: console_errors.append(m.text) if m.type == 'error' else None)

        print('\n=== Browser smoke test ===')
        page.goto(path.as_uri())
        page.wait_for_timeout(1200)

        # the app asks for a name on first run; answer the prompt if it appears
        page.evaluate("window.prompt = () => 'TestUser'")

        check(not errors, 'page loads with no uncaught JavaScript error',
              '; '.join(errors[:2]))
        check(not console_errors, 'no console errors on load', '; '.join(console_errors[:2]))

        body = page.inner_text('body')
        check(len(body) > 200, 'page renders visible text', f'only {len(body)} chars')

        # the course manifest reached the page and drove the chrome
        course = page.evaluate("() => ({title: document.title, h1: document.querySelector('header h1').textContent,"
                               " ns: NS, id: COURSE.id, exam: EXAM.name, pools: POOLS.length})")
        check(course['title'] == page.evaluate('COURSE.title'), 'the tab title comes from COURSE.title')
        check(course['h1'] == page.evaluate('COURSE.short'), 'the header line comes from COURSE.short')
        check(course['ns'] == page.evaluate('COURSE.ns'), 'the storage namespace comes from COURSE.ns')
        check(course['pools'] > 0, f"the blueprint has pools ({course['pools']})")
        print(f"        {course['id']} · {course['title']} · {course['exam']} · ns {course['ns']}")

        # the question bank reached the page, counted from the sources rather
        # than from a literal, so adding questions does not require editing this
        want_q, want_i = source_counts()
        n = page.evaluate('typeof QUESTIONS !== "undefined" ? QUESTIONS.length : -1')
        check(n == want_q, f'question bank present in the page ({n} of {want_q} in the sources)')
        imgs = page.evaluate('typeof IMAGES !== "undefined" ? Object.keys(IMAGES).length : -1')
        check(imgs == want_i, f'image bank present in the page ({imgs} of {want_i} in images.json)')

        if want_i:
            # every image decodes: a truncated base64 URL fails here and nowhere else
            bad = page.evaluate("""async () => {
                const bad = [];
                for (const [k, v] of Object.entries(IMAGES)) {
                    const ok = await new Promise(res => {
                        const im = new Image();
                        im.onload = () => res(im.naturalWidth > 0);
                        im.onerror = () => res(false);
                        im.src = v;
                    });
                    if (!ok) bad.push(k);
                }
                return bad;
            }""")
            check(not bad, f'all {imgs} embedded images decode', ', '.join(bad[:5]))
        else:
            skip('embedded images decode', 'images.json is empty')

        # Answer whatever is on screen, through the real rendered controls, so
        # every walk below exercises the same code a reader would.
        page.evaluate("""() => {
            window.answerCurrent = (allCorrect) => {
                const q = Q && Q.current; if (!q) return false;
                const kind = qType(q);
                if (kind === 'numeric') {
                    const inp = document.getElementById('numIn'); if (!inp) return false;
                    inp.value = String(allCorrect ? q.answer : q.answer + q.tol * 10 + 7);
                    inp.dispatchEvent(new Event('input', {bubbles: true}));
                    const chk = document.getElementById('btnCheck'); if (!chk) return false;
                    chk.click(); return true;
                }
                if (kind === 'match') {
                    const sels = [...document.querySelectorAll('#v-quiz .matchgrid select')];
                    if (!sels.length) return false;
                    for (const s of sels) {
                        const want = q.pairs.find(p => p.l === s.dataset.l);
                        s.value = allCorrect ? want.r : q.right.find(r => r !== want.r) || want.r;
                        s.dispatchEvent(new Event('change', {bubbles: true}));
                    }
                    const chk = document.getElementById('btnCheck'); if (!chk) return false;
                    chk.click(); return true;
                }
                const btns = [...document.querySelectorAll('#v-quiz button[data-o]')];
                if (!btns.length) return false;
                if (isMulti(q)) {
                    const want = allCorrect ? correctSet(q) : [+btns[0].dataset.o];
                    for (const i of want) { const b = document.querySelector(`#v-quiz button[data-o="${i}"]`); if (b) b.click(); }
                    const chk = document.getElementById('btnCheck'); if (!chk) return false;
                    chk.click();
                } else if (allCorrect) {
                    const c = q.options.findIndex(o => o.correct);
                    document.querySelector(`#v-quiz button[data-o="${c}"]`).click();
                } else btns[0].click();
                return true;
            };
            window.driveTo = (q) => {
                startQuiz(q.topic);
                Q.current = q;
                Q.order = qType(q) === 'mc' ? q.options.map((o, i) => i) : [];
                Q.picked = qType(q) === 'match' ? {} : null;
                Q.revealed = false; Q.missKind = null; Q.startedAt = Date.now();
                renderQuiz();
            };
        }""")
        started = page.evaluate("""() => {
            if (typeof startQuiz !== 'function') return 'no startQuiz';
            try { startQuiz(TOPICS[0].id); return 'ok'; } catch (e) { return String(e); }
        }""")
        check(started == 'ok', 'a quiz starts', started)
        page.wait_for_timeout(400)

        # Every question, answered through the real renderer. A fault in one
        # question's data only shows up when that question is the one on screen.
        every = page.evaluate("""() => {
            const bad = {controls: [], verdict: [], whys: [], cite: [], threw: []};
            for (const q of QUESTIONS) {
                try {
                    driveTo(q);
                    const kind = qType(q);
                    const el = document.getElementById('v-quiz');
                    if (kind === 'mc') {
                        const btns = el.querySelectorAll('button[data-o]');
                        if (btns.length !== q.options.length) { bad.controls.push(`${q.id} (${btns.length}/${q.options.length} options)`); continue; }
                    } else if (kind === 'numeric') {
                        if (!el.querySelector('input.numin')) { bad.controls.push(q.id + ' (no number box)'); continue; }
                        if (!el.querySelector('.numrow .units')) { bad.controls.push(q.id + ' (no units label)'); continue; }
                    } else if (kind === 'match') {
                        const sels = el.querySelectorAll('.matchgrid select');
                        if (sels.length !== q.left.length) { bad.controls.push(`${q.id} (${sels.length}/${q.left.length} selects)`); continue; }
                        const opts = sels[0].querySelectorAll('option').length - 1;
                        if (opts !== q.right.length) { bad.controls.push(`${q.id} (a select offers ${opts} of ${q.right.length} right items)`); continue; }
                    }
                    if (!answerCurrent(true)) { bad.verdict.push(q.id + ' (could not answer)'); continue; }
                    const panel = el.querySelector('.why');
                    if (!panel) { bad.verdict.push(q.id); continue; }
                    const verdict = panel.querySelector('.verdict');
                    if (!verdict || !verdict.classList.contains('ok'))
                        bad.verdict.push(q.id + ' (keyed answer not marked correct)');
                    if (kind === 'mc') {
                        const rows = panel.querySelectorAll('.wrow');
                        if (rows.length !== q.options.length) bad.whys.push(`${q.id} (${rows.length}/${q.options.length})`);
                    } else if (kind === 'numeric') {
                        const st = panel.querySelectorAll('.steps .step');
                        if (st.length !== q.steps.length) bad.whys.push(`${q.id} (${st.length}/${q.steps.length} steps)`);
                        if (!panel.querySelector('.stepwhy')) bad.whys.push(q.id + ' (a step carries no why)');
                    } else if (kind === 'match') {
                        const pr = panel.querySelectorAll('.pairrow');
                        if (pr.length !== q.pairs.length) bad.whys.push(`${q.id} (${pr.length}/${q.pairs.length} pairs)`);
                    }
                    /* A JavaScript value that leaked into the page through an
                       interpolated field. "[object Object]" and "NaN" are never
                       English, so they are looked for everywhere. "undefined"
                       and "null" ARE English — "the equation would be undefined
                       because its denominator would be zero" is correct prose —
                       so they are looked for only in the short structural slots
                       a field lands in, never in the written explanations. */
                    if (/\\[object Object\\]/.test(el.textContent))
                        bad.whys.push(`${q.id} ([object Object] reached the page)`);
                    if (/\\bNaN\\b/.test(el.textContent))
                        bad.whys.push(`${q.id} (NaN reached the page)`);
                    const slots = [...el.querySelectorAll(
                        '.stem, .verdict, .cite, .stepk, .stept, .mleft, .pairrow .pl,' +
                        ' button[data-o] span, .wtxt b, .numrow .units, .matchgrid option')];
                    const leaked = slots.filter(s => /\\b(undefined|null)\\b/.test(s.textContent));
                    if (leaked.length)
                        bad.whys.push(`${q.id} (undefined/null in a rendered field: "${leaked[0].textContent.slice(0, 60)}")`);
                    const cite = panel.querySelector('.cite');
                    if (!cite || cite.textContent.trim().length < 5) bad.cite.push(q.id);
                } catch (e) {
                    bad.threw.push(`${q.id}: ${e.message}`);
                }
            }
            return bad;
        }""")
        n_q = len(page.evaluate('QUESTIONS.map(q=>q.id)'))
        check(not every['threw'], f'all {n_q} questions answer without throwing',
              ' | '.join(every['threw'][:3]))
        check(not every['controls'], 'every question renders the controls its type needs',
              ', '.join(every['controls'][:5]))
        check(not every['verdict'], 'every answer produces an explanation panel',
              ', '.join(every['verdict'][:5]))
        check(not every['whys'], 'every explanation row, step or pair renders',
              ', '.join(every['whys'][:5]))
        check(not every['cite'], 'every question shows a citation',
              ', '.join(every['cite'][:5]))

        # Numeric questions: tolerance, the miss-kind question, and the working.
        numeric = page.evaluate("""() => {
            const qs = QUESTIONS.filter(q => qType(q) === 'numeric');
            const out = {n: qs.length};
            if (!qs.length) return out;
            const q = qs[0];
            // just inside the tolerance is right
            driveTo(q);
            let inp = document.getElementById('numIn');
            inp.value = String(q.answer + q.tol * 0.5);
            inp.dispatchEvent(new Event('input', {bubbles: true}));
            document.getElementById('btnCheck').click();
            out.withinTol = !!document.querySelector('#v-quiz .verdict.ok');
            // outside it is wrong, and the app asks which kind of miss it was
            driveTo(q);
            inp = document.getElementById('numIn');
            inp.value = String(q.answer + q.tol * 10 + 7);
            inp.dispatchEvent(new Event('input', {bubbles: true}));
            const before = DB.answers.length;
            document.getElementById('btnCheck').click();
            const el = document.getElementById('v-quiz');
            out.outsideTolWrong = !!el.querySelector('.verdict.bad');
            out.logged = DB.answers.length === before + 1 &&
                         DB.answers[DB.answers.length-1].qid === q.id &&
                         DB.answers[DB.answers.length-1].result === 'wrong' &&
                         typeof DB.answers[DB.answers.length-1].picked === 'string';
            out.asksKind = !!el.querySelector('.misskind');
            out.kindButtons = el.querySelectorAll('.misskind button[data-mk]').length;
            out.stepsHiddenFirst = !el.querySelector('.steps');
            // one click on a kind records it and reveals the working
            const btn = el.querySelector('.misskind button[data-mk="unit"]');
            out.hasUnitButton = !!btn;
            if (btn) btn.click();
            out.kindLogged = DB.answers[DB.answers.length-1].missKind === 'unit';
            out.stepsAfter = el.querySelectorAll('.steps .step').length;
            out.whysAfter = el.querySelectorAll('.steps .stepwhy').length;
            out.keyedShown = /\\d\\.\\d{4}/.test(el.querySelector('.verdict').textContent);
            out.unitsShown = el.querySelector('.verdict').textContent.includes(q.units);
            return out;
        }""")
        if not numeric['n']:
            skip('numeric questions', 'the bank holds none')
        else:
            check(numeric['withinTol'], 'an answer inside the tolerance is marked right')
            check(numeric['outsideTolWrong'], 'an answer outside the tolerance is marked wrong')
            check(numeric['logged'], 'the answer log stores what was typed')
            check(numeric['asksKind'] and numeric['kindButtons'] == 4 and numeric['hasUnitButton'],
                  'a missed calculation asks which of the four kinds of miss it was',
                  f"{numeric['kindButtons']} buttons")
            check(numeric['stepsHiddenFirst'], 'the working waits until the miss is named')
            check(numeric['kindLogged'], 'one click records the kind of miss')
            check(numeric['stepsAfter'] > 0 and numeric['whysAfter'] == numeric['stepsAfter'],
                  'naming the miss reveals every step with its why',
                  f"{numeric['stepsAfter']} steps, {numeric['whysAfter']} whys")
            check(numeric['keyedShown'] and numeric['unitsShown'],
                  'the keyed answer is shown to four decimal places with its units')

        # Match questions: every select offers every right value, all-or-nothing.
        match = page.evaluate("""() => {
            const qs = QUESTIONS.filter(q => qType(q) === 'match');
            const out = {n: qs.length};
            if (!qs.length) return out;
            const q = qs[0];
            const pick = (allRight) => {
                driveTo(q);
                for (const s of document.querySelectorAll('#v-quiz .matchgrid select')) {
                    const want = q.pairs.find(p => p.l === s.dataset.l);
                    s.value = allRight ? want.r : (q.right.find(r => r !== want.r) || want.r);
                    s.dispatchEvent(new Event('change', {bubbles: true}));
                }
                document.getElementById('btnCheck').click();
            };
            const el = document.getElementById('v-quiz');
            driveTo(q);
            const sels = [...el.querySelectorAll('.matchgrid select')];
            out.everySelectOffersEveryRight = sels.every(s =>
                q.right.every(r => [...s.options].some(o => o.value === r)));
            pick(true);
            out.allRight = !!el.querySelector('.verdict.ok');
            out.pairsShown = el.querySelectorAll('.pairrow').length === q.pairs.length;
            pick(false);
            out.anyWrongIsWrong = !!el.querySelector('.verdict.bad');
            // one right row and the rest wrong is still wrong
            driveTo(q);
            const s0 = el.querySelector('.matchgrid select');
            const w = q.pairs.find(p => p.l === s0.dataset.l);
            s0.value = w.r; s0.dispatchEvent(new Event('change', {bubbles: true}));
            document.getElementById('btnCheck').click();
            out.partialIsWrong = !!el.querySelector('.verdict.bad');
            return out;
        }""")
        if not match['n']:
            skip('match questions', 'the bank holds none')
        else:
            check(match['everySelectOffersEveryRight'], 'every select offers every right-hand value')
            check(match['allRight'], 'the complete correct pairing is marked right')
            check(match['pairsShown'], 'the reveal shows every pair with its why')
            check(match['anyWrongIsWrong'], 'a wrong pairing is marked wrong')
            check(match['partialIsWrong'], 'a partial pairing is marked wrong')

        # Select-all items through the real UI.
        sata = page.evaluate("""() => {
            const out = {};
            const qs = QUESTIONS.filter(isMulti);
            out.n = qs.length;
            if (!qs.length) return out;
            const q = qs[0];
            driveTo(q);
            const el = document.getElementById('v-quiz');
            out.banner = !!el.querySelector('.sata');
            out.toggles = el.querySelectorAll('button.opt.multi').length === q.options.length;
            const chk = () => document.getElementById('btnCheck');
            out.checkDisabledAtStart = !!chk() && chk().disabled;
            const want = correctSet(q);
            document.querySelector(`#v-quiz button[data-o="${want[0]}"]`).click();
            out.toggledOn = !!document.querySelector(`#v-quiz button[data-o="${want[0]}"].on`);
            out.checkEnabledAfterToggle = !!chk() && !chk().disabled;
            const before = DB.answers.length;
            chk().click();
            const v1 = el.querySelector('.verdict');
            out.partialMarkedWrong = !!v1 && v1.classList.contains('bad');
            const logged = DB.answers[DB.answers.length - 1];
            out.logged = DB.answers.length === before + 1 && logged.qid === q.id && logged.result === 'wrong'
                         && Array.isArray(logged.picked) && logged.picked.length === 1 && logged.picked[0] === want[0];
            out.youSelected = el.querySelectorAll('.youpicked').length === 1;
            driveTo(q);
            for (const i of want) document.querySelector(`#v-quiz button[data-o="${i}"]`).click();
            chk().click();
            const v2 = el.querySelector('.verdict');
            out.fullMarkedRight = !!v2 && v2.classList.contains('ok');
            out.guessOffered = !!document.getElementById('btnGuess');
            const wrong = q.options.findIndex(o => !o.correct);
            driveTo(q);
            for (const i of [...want, wrong]) document.querySelector(`#v-quiz button[data-o="${i}"]`).click();
            chk().click();
            const v3 = el.querySelector('.verdict');
            out.extraMarkedWrong = !!v3 && v3.classList.contains('bad');
            return out;
        }""")
        if not sata['n']:
            skip('select-all questions', 'the bank holds none')
        else:
            check(sata['banner'] and sata['toggles'], 'a select-all item renders its banner and toggle options')
            check(sata['checkDisabledAtStart'] and sata['checkEnabledAfterToggle'] and sata['toggledOn'],
                  'the Check button waits for a selection and toggles mark on')
            check(sata['partialMarkedWrong'], 'a partial selection is marked wrong')
            check(sata['logged'], 'the answer log stores the picked set and the verdict')
            check(sata['youSelected'], 'the review marks which options were selected')
            check(sata['fullMarkedRight'] and sata['guessOffered'],
                  'the complete correct set is marked right and can be flagged as a guess')
            check(sata['extraMarkedWrong'], 'the correct set plus a wrong option is marked wrong')

        # The full sweep: every question once, in order, no repeats, ending on
        # its own panel. A queue that loops or stops short is invisible until
        # someone actually walks it.
        sweep = page.evaluate("""() => {
            show('topics');
            const btn = document.getElementById('sweepAll');
            if (!btn) return {err: 'no "All questions" button on the topics view'};
            btn.click();
            if (!Q || !Q.sweep) return {err: 'sweep did not start'};
            const want = Q.sweep.length;
            const seen = new Set(); let dup = 0, n = 0;
            while (Q && Q.current && n < want + 20) {
                if (seen.has(Q.current.id)) dup++;
                seen.add(Q.current.id);
                if (!answerCurrent(false)) return {err: 'no controls at question ' + (n + 1)};
                const nx = document.getElementById('btnNext');
                if (!nx) return {err: 'no Next button at question ' + (n + 1)};
                nx.click(); n++;
            }
            return {want, answered: n, distinct: seen.size, dup,
                    ended: !!document.querySelector('#v-quiz .empty')};
        }""")
        check(not sweep.get('err'), 'the full sweep starts from the topics view', sweep.get('err', ''))
        if not sweep.get('err'):
            check(sweep['answered'] == sweep['want'],
                  f"the sweep serves all {sweep.get('want')} questions",
                  f"served {sweep.get('answered')}")
            check(sweep['dup'] == 0, 'the sweep repeats nothing', f"{sweep.get('dup')} repeats")
            check(sweep['distinct'] == sweep['want'], 'the sweep covers every question',
                  f"{sweep.get('distinct')} of {sweep.get('want')} distinct")
            check(sweep['ended'], 'the sweep ends on its completion panel')

        # The exam simulator: the blueprint draw, the clock, and — when the bank
        # cannot fill the paper — a plain statement of how many marks are missing.
        exam = page.evaluate("""() => {
            show('exam');
            const front = document.getElementById('v-exam');
            const cov = blueprintCoverage();
            const out = {missing: cov.missing, drawn: cov.drawn, total: TOTAL_MARKS,
                         noteOnFront: !!front.querySelector('.shortfall'),
                         noteText: (front.querySelector('.shortfall') || {}).textContent || ''};
            document.getElementById('startExam').click();
            out.paper = EX.qs.length;
            out.want = EXAM.questions;
            out.available = poolShares().reduce((s, o) =>
                s + Math.min(o.want, poolQuestions(o.pool).filter(q => !q.lowYield).length), 0);
            out.distinct = new Set(EX.qs.map(q => q.id)).size;
            out.clock = !!document.getElementById('exClock');
            out.noteOnPaper = !!document.getElementById('v-exam').querySelector('.shortfall');
            out.sata = EX.qs.filter(isMulti).length;
            out.sataTarget = EXAM_SATA;
            // every pool that contributed drew only its own questions
            const strays = EX.qs.filter(q => !poolOf(q)).map(q => q.id);
            out.strays = strays.slice(0, 4);
            clearInterval(EX.timer); EX = null;
            return out;
        }""")
        check(exam['paper'] == exam['available'],
              f"the paper draws every question the blueprint can fill ({exam['paper']} of {exam['want']})",
              f"drew {exam['paper']}, {exam['available']} available")
        check(exam['distinct'] == exam['paper'], 'no question appears twice on one paper')
        check(exam['clock'], 'the paper runs a clock')
        check(not exam['strays'], 'every question on the paper belongs to a blueprint pool',
              ', '.join(exam['strays']))
        if exam['missing']:
            check(exam['noteOnFront'] and exam['noteOnPaper'],
                  'a blueprint the bank cannot fill is stated on screen rather than padded')
            check(str(exam['drawn']) in exam['noteText'] and str(exam['missing']) in exam['noteText'],
                  'the shortfall names how many marks are drawn and how many are not coverable',
                  exam['noteText'][:120])
            print(f"        {exam['drawn']} of {exam['total']} marks drawn, {exam['missing']} not yet coverable")
        else:
            skip('blueprint shortfall notice', 'the bank covers the whole blueprint')

        # The app is opened from disk, where a browser can give the page an
        # opaque origin and make localStorage throw on the first read.
        denied = browser.new_page(viewport={'width': 1280, 'height': 900})
        denied_errors = []
        denied.on('pageerror', lambda e: denied_errors.append(str(e)))
        denied.add_init_script("""
            const boom = () => { throw new DOMException('denied', 'SecurityError'); };
            Object.defineProperty(window, 'localStorage', {configurable: true, get: boom});
        """)
        denied.goto(path.as_uri())
        denied.wait_for_timeout(1000)
        denied.evaluate("window.prompt = () => 'TestUser'")
        survived = denied.evaluate("""() => {
            try {
                if (typeof QUESTIONS === 'undefined') return {err: 'script did not finish'};
                startQuiz(TOPICS[0].id);
                const q = Q.current;
                if (qType(q) === 'numeric') {
                    const inp = document.getElementById('numIn'); if (!inp) return {err: 'no number box'};
                    inp.value = String(q.answer);
                    inp.dispatchEvent(new Event('input', {bubbles: true}));
                    document.getElementById('btnCheck').click();
                } else if (qType(q) === 'match') {
                    for (const s of document.querySelectorAll('#v-quiz .matchgrid select')) {
                        s.value = q.pairs.find(p => p.l === s.dataset.l).r;
                        s.dispatchEvent(new Event('change', {bubbles: true}));
                    }
                    document.getElementById('btnCheck').click();
                } else {
                    const btns = document.querySelectorAll('#v-quiz button[data-o]');
                    if (!btns.length) return {err: 'no options rendered'};
                    if (isMulti(q)) { for (const i of correctSet(q)) document.querySelector(`#v-quiz button[data-o="${i}"]`).click(); document.getElementById('btnCheck').click(); }
                    else btns[0].click();
                }
                return {ok: !!document.querySelector('#v-quiz .why')};
            } catch (e) { return {err: e.message}; }
        }""")
        check(not survived.get('err') and survived.get('ok'),
              'the drill still runs when the browser denies localStorage',
              survived.get('err', 'no explanation panel'))
        check(not denied_errors, 'no uncaught error with storage denied',
              '; '.join(denied_errors[:2]))
        denied.close()

        # The static documents are authored as HTML, so any label re-escaped for
        # an attribute or a caption can reach the reader as a literal "&mdash;".
        for view in ['ref', 'tell', 'guide']:
            doc = page.evaluate("""(v) => {
                show(v);
                const el = document.querySelector('#v-' + v);
                const raw = t => /&[a-z]+;/i.test(t);
                return {
                    figs: el.querySelectorAll('.reffig img').length,
                    secs: el.querySelectorAll('h3').length,
                    navs: el.querySelectorAll('.refnav a').length,
                    entities: [...el.querySelectorAll('figcaption, .refnav a, h3')]
                        .map(e => e.textContent).filter(raw).slice(0, 4),
                    tokens: /\\{\\{fig:/.test(el.innerHTML),
                    broken: [...el.querySelectorAll('.reffig img')]
                        .filter(i => !i.getAttribute('src').startsWith('data:image/'))
                        .map(i => i.getAttribute('alt')).slice(0, 4),
                };
            }""", view)
            check(doc['secs'] > 0 and doc['navs'] == doc['secs'],
                  f"'{view}' has {doc['secs']} sections, each with a jump link",
                  f"{doc['navs']} links for {doc['secs']} sections")
            check(not doc['broken'], f"every '{view}' figure is an embedded data URL",
                  ', '.join(doc['broken']))
            check(not doc['tokens'], f"no unexpanded figure token reached '{view}'")
            check(not doc['entities'], f"no raw HTML entity reaches the reader in '{view}'",
                  ' | '.join(doc['entities']))

        # Weak spots after mixed results: the next-step cards, the tables, and
        # the miss-kind breakdown a numeric bank earns.
        gaps = page.evaluate("""() => {
            show('gaps');
            const el = document.getElementById('v-gaps');
            return {cards: el.querySelectorAll('.nextcard').length,
                    pools: POOLS.length,
                    table: !!el.querySelector('table'),
                    missKind: el.innerText.includes('Where the calculations go wrong'),
                    numeric: QUESTIONS.filter(q => qType(q) === 'numeric').length,
                    text: el.innerText.length};
        }""")
        check(gaps['cards'] == gaps['pools'],
              f"weak spots shows a next-step card per blueprint pool ({gaps['cards']} of {gaps['pools']})")
        check(gaps['table'] and gaps['text'] > 200, 'weak spots renders its tables')
        if gaps['numeric']:
            check(gaps['missKind'], 'weak spots breaks numeric misses down by kind of miss')
        else:
            skip('miss-kind breakdown', 'the bank holds no numeric question')

        # every view renders without throwing
        for view in ['topics', 'quiz', 'gaps', 'exam', 'guide', 'tell', 'ref', 'settings']:
            r = page.evaluate(f"""() => {{
                try {{ if (typeof show === 'function') {{ show('{view}'); return 'ok'; }}
                      return 'no show()'; }} catch (e) {{ return String(e); }} }}""")
            page.wait_for_timeout(120)
            check(r == 'ok', f"view '{view}' renders", r)

        check(not errors, 'no uncaught error after interaction', '; '.join(errors[:2]))

        page.screenshot(path='/tmp/drill_screenshot.png', full_page=False)
        browser.close()

    print()
    if fails:
        print(f'{len(fails)} browser check(s) failed')
        sys.exit(1)
    print('Browser smoke test passed')


if __name__ == '__main__':
    main()
