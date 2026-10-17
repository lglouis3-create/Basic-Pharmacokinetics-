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

# Weak spots, Concepts: one multiple-choice concept missed three times with the
# same wrong option (struggling), one numeric concept missed once with a named
# kind (unfamiliar), and one concept with two wordings answered right three
# times across two sessions ten days ago (mastered, its spaced check due).
CONCEPT_SEED = """() => {
  DB.answers = []; DB.concepts = {}; DB.qn = 0; DB.settings.mode = 'long';
  const byC = {}; QUESTIONS.forEach(q => (byC[q.concept] ||= []).push(q));
  const mcq = QUESTIONS.find(q => qType(q) === 'mc' && !isMulti(q) && q.options.some(o => !o.correct && o.why));
  const num = QUESTIONS.find(q => qType(q) === 'numeric' && q.concept !== mcq.concept);
  const two = Object.values(byC).find(a => a.length > 1 && a[0].concept !== mcq.concept && a[0].concept !== num.concept);
  const now = Date.now(), MIN = 60000, old = now - 10 * 86400000;
  const add = (q, result, at, picked, missKind) => { DB.qn++; const a = {qid: q.id, concept: q.concept, result, at, qn: DB.qn};
    if (picked !== undefined) a.picked = picked; if (missKind) a.missKind = missKind; DB.answers.push(a); };
  add(two[0], 'correct', old); add(two[1], 'correct', old + 5 * MIN); add(two[0], 'correct', old + 120 * MIN);
  const w = mcq.options.findIndex(o => !o.correct && o.why), r = mcq.options.findIndex(o => o.correct);
  [[w, 'wrong'], [r, 'correct'], [w, 'wrong'], [w, 'wrong']].forEach(([p, res], k) => add(mcq, res, now - (10 - k) * MIN, p));
  add(num, 'wrong', now - 5 * MIN, '1.234', 'unit');
  save();
  return {struggling: conceptTitle(mcq.concept), mastered: conceptTitle(two[0].concept)};
}"""


def concept_check(b, shots):
    """The Concepts section of Weak spots at phone and desktop width, light and dark."""
    path = pathlib.Path(course_output()).resolve()
    for scheme in ('light', 'dark'):
        for w in (390, 1100):
            ctx = b.new_context(viewport={'width': w, 'height': 900}, color_scheme=scheme)
            page = ctx.new_page()
            errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.add_init_script("window.prompt = () => 'Concepts'; window.alert = () => {}")
            page.goto(path.as_uri())
            page.wait_for_timeout(700)
            names = page.evaluate(CONCEPT_SEED)
            page.evaluate("show('gaps')")
            page.wait_for_timeout(250)
            page.evaluate("document.querySelectorAll('#v-gaps details.cmore, #v-gaps details.clegend').forEach(d => d.open = true)")
            page.wait_for_timeout(100)
            print(f'\n=== Weak spots, concepts: {w} px, {scheme} ===')
            cards = page.evaluate("""() => [...document.querySelectorAll('#v-gaps .ccard')].map(c => ({
              t: c.querySelector('.chead b').textContent, s: c.querySelector('.cstat').textContent, txt: c.innerText,
              r: c.getBoundingClientRect().right}))""")
            strug = [c for c in cards if c['t'] == names['struggling']]
            check(bool(strug) and strug[0]['s'] == 'Struggling', f"struggling card shown ({names['struggling']})",
                  f"cards: {[(c['t'], c['s']) for c in cards]}")
            check(bool(strug) and 'You chose this 3 times' in strug[0]['txt'] and 'Why it is not the answer' in strug[0]['txt'],
                  'the wrong option chosen 3 times is shown with its why')
            check(bool(strug) and '3 misses in 4 attempts, last 4 at 25%' in strug[0]['txt'], 'the evidence line gives exact counts')
            check(any('Most common kind of miss: Unit conversion' in c['txt'] for c in cards), 'a numeric concept shows its most common kind of miss')
            txt = page.inner_text('#v-gaps')
            check(f"Mastered (1)" in txt and names['mastered'] in txt, f"mastered concept folded away ({names['mastered']})")
            check('Due for spaced review (1)' in txt, 'the mastered concept is listed as due for spaced review')
            bad = [x for x in ('undefined', 'NaN') if x in txt]
            check(not bad, 'no undefined or NaN on Weak spots', ', '.join(bad))
            sw = page.evaluate('[document.documentElement.scrollWidth, window.innerWidth]')
            over = [c['t'] for c in cards if c['r'] > w + 0.5]
            check(sw[0] <= sw[1] and not over, 'concept cards fit the width', f'scrollWidth {sw[0]}, past the edge: {over}')
            if shots:
                pathlib.Path(shots).mkdir(parents=True, exist_ok=True)
                box = page.evaluate("""() => { const hs = [...document.querySelectorAll('#v-gaps h3')], i = hs.findIndex(h => h.textContent === 'Concepts');
                  const top = hs[i].getBoundingClientRect().top + scrollY, end = hs[i + 1] ? hs[i + 1].getBoundingClientRect().top + scrollY : top + 1200;
                  return {x: 0, y: top - 8, width: innerWidth, height: end - top}; }""")
                page.screenshot(path=f'{shots}/concepts-{scheme}-{w}.png', full_page=True, clip=box)
            page.evaluate("document.querySelector('#v-gaps [data-cpractice]').click()")
            page.wait_for_timeout(200)
            check(page.evaluate("VIEW === 'quiz' && Q && Q.label.startsWith('Concept: ') && Q.sweep.every(id => byId(id).concept === byId(Q.sweep[0]).concept)"),
                  'Practice this concept opens a quiz on that concept')
            check(not errs, 'no page errors', '; '.join(errs[:2]))
            ctx.close()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--shots', help='write a screenshot of every tab here')
    ap.add_argument('--concept-shots', help='write a screenshot of the Weak spots concepts section here')
    a = ap.parse_args()
    path = pathlib.Path(course_output()).resolve()
    with sync_playwright() as p:
        b = p.chromium.launch()
        concept_check(b, a.concept_shots)
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
