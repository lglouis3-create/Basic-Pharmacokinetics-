#!/usr/bin/env python3
"""Every tab at phone and desktop width, in light and dark colour schemes.

For each width (375 px, 1100 px) and colour scheme: seeds a profile with
answers (right, wrong, guessed; multiple choice, numeric and matching) so
Weak spots and the review plan have content, then opens every tab and checks
no page error, no sideways scroll, and no "undefined" or "NaN" on screen. It
also answers a matching question at each width and checks every dropdown fits
the screen, and steps through each step-through figure.

The drill has no dark theme of its own; the dark pass checks the page still
renders under a dark system setting.

    python3 sweep_test.py [--shots DIR]
"""
import argparse
import pathlib
import sys

from playwright.sync_api import sync_playwright

from browser_test import course_output

fails = []


def check(ok, label, detail=''):
    print(('  ok    ' if ok else '  FAIL  ') + label + (f'  — {detail}' if detail and not ok else ''))
    if not ok:
        fails.append(label)


SEED = """() => {
  const now = Date.now(), pick = t => QUESTIONS.filter(q => qType(q) === t);
  const mc = pick('mc'), num = pick('numeric'), mt = pick('match');
  let i = 0;
  const add = (q, result, picked) => { DB.answers.push({qid: q.id, concept: q.concept, result, at: now - (40 - i++) * 30000, qn: i, picked}); };
  mc.slice(0, 12).forEach((q, k) => {
    const right = q.options.findIndex(o => o.correct), wrong = q.options.findIndex(o => !o.correct);
    add(q, k % 3 === 0 ? 'wrong' : k % 3 === 1 ? 'guessed' : 'correct', k % 3 === 0 ? wrong : right);
  });
  num.slice(0, 6).forEach((q, k) => add(q, k % 2 ? 'correct' : 'wrong', k % 2 ? String(q.answer) : '1.234'));
  mt.slice(0, 2).forEach(q => { const p = {}; q.pairs.forEach((x, j) => p[x.l] = q.pairs[(j + 1) % q.pairs.length].r); add(q, 'wrong', p); });
  for (const a of DB.answers) { const s = st(a.concept); s.seen++; if (a.result === 'correct') { s.correct++; s.box = 1; } else s.wrong++; }
  save();
}"""

TABS = ['topics', 'quiz', 'gaps', 'exam', 'guide', 'tell', 'terms', 'diag', 'eq', 'ref', 'settings']


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--shots', help='write a screenshot of every tab here')
    a = ap.parse_args()
    path = pathlib.Path(course_output()).resolve()
    with sync_playwright() as p:
        b = p.chromium.launch()
        for scheme in ('light', 'dark'):
            for w in (375, 1100):
                ctx = b.new_context(viewport={'width': w, 'height': 900}, color_scheme=scheme)
                page = ctx.new_page()
                errs = []
                page.on('pageerror', lambda e: errs.append(str(e)))
                page.add_init_script("window.prompt = () => 'Sweep'; window.alert = () => {}")
                page.goto(path.as_uri())
                page.wait_for_timeout(500); page.evaluate("['guide','ref','tell','diag'].forEach(p => LS.set(FOLD_KEY + p, 'open'))")
                page.wait_for_timeout(700)
                page.evaluate(SEED)
                print(f'\n=== {w} px, {scheme} ===')
                for t in TABS:
                    if t == 'quiz':
                        page.evaluate("startQuiz(null, null)")
                    else:
                        page.evaluate(f"show('{t}')")
                    page.wait_for_timeout(250)
                    sw = page.evaluate('[document.documentElement.scrollWidth, window.innerWidth]')
                    txt = page.inner_text(f'#v-{t}')
                    bad = [x for x in ('undefined', 'NaN') if x in txt]
                    check(sw[0] <= sw[1], f'{t}: no sideways scroll', f'scrollWidth {sw[0]} > {sw[1]}')
                    check(not bad, f'{t}: no undefined or NaN on screen', ', '.join(bad))
                    if a.shots:
                        pathlib.Path(a.shots).mkdir(parents=True, exist_ok=True)
                        page.screenshot(path=f'{a.shots}/{scheme}-{w}-{t}.png', full_page=False)
                # a matching question: each dropdown inside the screen
                page.evaluate("""() => { const q = QUESTIONS.find(q => qType(q) === 'match');
                  Q = {pool: [q], label: 'match', since: Date.now(), sweep: [q.id], i: 0, current: null, answered: 0,
                       lastId: null, examMode: false, picked: null, revealed: false}; nextQuestion(); show('quiz'); }""")
                page.wait_for_timeout(200)
                over = page.evaluate("""() => [...document.querySelectorAll('#v-quiz select')]
                  .filter(s => s.getBoundingClientRect().right > window.innerWidth + 0.5).length""")
                n = page.evaluate("document.querySelectorAll('#v-quiz select').length")
                sw = page.evaluate('[document.documentElement.scrollWidth, window.innerWidth]')
                check(n > 0 and over == 0 and sw[0] <= sw[1], f'matching question: {n} dropdowns fit the screen',
                      f'{over} past the edge, scrollWidth {sw[0]}')
                if a.shots:
                    page.screenshot(path=f'{a.shots}/{scheme}-{w}-match.png')
                # the session line above the quiz
                check('This session:' in page.inner_text('#v-quiz'), 'session line shown above the question')
                # step-through figures at this width
                page.evaluate("show('diag')")
                for k in page.evaluate('Object.keys(STEPFIGS)'):
                    fig = f'#v-diag [data-stepfig="{k}"]'
                    page.locator(f'{fig} [data-go="1"]').scroll_into_view_if_needed()
                    page.click(f'{fig} [data-go="1"]'); page.wait_for_timeout(950)
                    sw = page.evaluate('[document.documentElement.scrollWidth, window.innerWidth]')
                    check(sw[0] <= sw[1], f'{k}: step 2 fits the width')
                check(not errs, 'no page errors', '; '.join(errs[:2]))
                ctx.close()
        b.close()
    print('\nSweep passed\n' if not fails else f'\n{len(fails)} SWEEP PROBLEMS\n')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
