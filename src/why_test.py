#!/usr/bin/env python3
"""Hear why: each ★ question's spoken reasoning, in Chromium at phone (390 px) and desktop (1200 px) widths.

The device voice is replaced by a recorder, so the test hears exactly what would be read. Checks: every ★ question
has a script (LIKELY_WHY) and no other question does; once a ★ multiple-choice and a ★ calculation question are
answered, Hear why sits under the explanation and Read along holds the same words; pressing it reads the script
sentence by sentence, in order, to the end; Pause stops the voice and Resume goes on from that sentence; moving to
the next question or another tab stops it; a question with no script has no button; with no device voice the words
open instead; a clip listed as recorded that fails to load falls back to the voice; and a submitted Exam sim paper
offers Hear why on its ★ questions. A script with a recorded clip (audio/why-<id>.mp3, served as on the class site)
plays the clip and not the device voice. Any page or console error fails the run.

    python3 why_test.py
"""
import functools, http.server, os, re, sys, threading
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
NAME = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", open(os.path.join(HERE, 'course.js')).read()).group(1)
fails = []

VOICE = """
window.__said = []; window.__hold = false;
const fake = {speaking: false, cancel(){ fake.q = null; }, getVoices(){ return []; },
  speak(u){ window.__said.push(u.text); fake.q = u; if(!window.__hold) setTimeout(() => { if(fake.q === u && u.onend) u.onend(); }, 15); }};
Object.defineProperty(window, 'speechSynthesis', {value: fake, configurable: true, writable: true});
window.SpeechSynthesisUtterance = function(t){ this.text = t; };
window.prompt = () => 'WhyTest'; window.confirm = () => true;
"""
DRIVE = """() => {
  window.driveTo = q => { startQuiz(q.topic); Q.current = q; Q.order = qType(q) === 'mc' ? q.options.map((o, i) => i) : [];
    Q.picked = qType(q) === 'match' ? {} : null; Q.revealed = false; Q.missKind = null; Q.startedAt = Date.now(); renderQuiz(); };
  window.answerRight = () => { const q = Q.current;
    if (qType(q) === 'numeric') { const i = document.getElementById('numIn'); i.value = String(q.answer); i.dispatchEvent(new Event('input', {bubbles: true})); document.getElementById('btnCheck').click(); return; }
    if (isMulti(q)) { correctSet(q).forEach(i => document.querySelector(`#v-quiz button[data-o="${i}"]`).click()); document.getElementById('btnCheck').click(); return; }
    document.querySelector(`#v-quiz button[data-o="${q.options.findIndex(o => o.correct)}"]`).click(); };
}"""


def check(ok, label, detail=''):
    print(('  ok   ' if ok else '  FAIL ') + label + ('' if ok else f'  ({detail})'))
    if not ok: fails.append(label)


def run(page, width):
    print(f'\n=== Hear why at {width} px ===')
    page.evaluate(DRIVE)
    # a recorded clip plays from audio/ (the site's copy), not the device voice
    rec = page.evaluate("WHY_CLIPS.find(id => LIKELY_WHY[id] && qType(byId(id)) === 'mc' && !isMulti(byId(id))) || null")
    if rec:
        page.evaluate(f"driveTo(byId('{rec}')); answerRight(); __said = []; document.querySelector('#v-quiz [data-hearwhy]').click()")
        try:
            page.wait_for_function("WHY && WHY.audio && WHY_AUDIO && WHY_AUDIO.currentTime > 1", timeout=20000); ok = True
        except Exception:
            ok = False
        meta = page.evaluate("document.querySelector('#v-quiz .whymeta').textContent")
        check(ok and meta == 'recorded narration' and page.evaluate("__said.length") == 0 and page.evaluate("WHY_AUDIO.src").endswith(f'audio/why-{rec}.mp3'),
              f'{rec}: a recorded script plays its clip in the narrator voice, not the device voice ({meta})')
        page.evaluate("whyStop()")
    n = page.evaluate("WHY_CLIPS.length")
    print(f'  ..   {n} scripts have a recorded clip; the voice checks below set them aside')
    page.evaluate("window.__clips = WHY_CLIPS.splice(0)")
    cov = page.evaluate("""(() => { const s = Object.keys(LIKELY_STARS), w = Object.keys(LIKELY_WHY);
      return [s.length, w.length, s.filter(i => !LIKELY_WHY[i]).length, w.filter(i => !LIKELY_STARS[i]).length]; })()""")
    check(cov[0] == cov[1] and cov[2] == 0 and cov[3] == 0, f'every ★ question has a script and no other question does {cov}')
    ids = page.evaluate("""(() => { const s = Object.keys(LIKELY_STARS).map(byId);
      return [s.find(q => qType(q) === 'mc' && !isMulti(q)).id, s.find(q => qType(q) === 'numeric').id, QUESTIONS.find(q => !LIKELY_STARS[q.id] && qType(q) === 'mc' && !isMulti(q)).id]; })()""")
    for qid in ids[:2]:
        page.evaluate(f"driveTo(byId('{qid}')); answerRight()"); page.wait_for_timeout(150)
        st = page.evaluate(f"""(() => {{ const b = document.querySelector('#v-quiz .why [data-hearwhy]'), t = document.querySelector('#v-quiz .why .whytx p');
          return [!!b && b.dataset.hearwhy === '{qid}', !!t && t.textContent === LIKELY_WHY['{qid}'], b ? b.textContent : null]; }})()""")
        check(st[0] and st[1] and st[2] == '🔊 Hear why', f'{qid}: Hear why sits under the explanation, with the same words in Read along', str(st))
        page.evaluate("__said = []; __hold = false; document.querySelector('#v-quiz [data-hearwhy]').click()")
        try:
            page.wait_for_function("WHY === null && __said.length > 0", timeout=20000); done = True
        except Exception:
            done = False
        said = page.evaluate(f"[__said, gwSents(LIKELY_WHY['{qid}'])]")
        check(done and said[0] == said[1], f'{qid}: it reads the script sentence by sentence, in order, to the end ({len(said[0])} of {len(said[1])})')
        check(page.evaluate("document.querySelector('#v-quiz [data-hearwhy]').textContent") == '🔊 Hear why', f'{qid}: at the end the button reads Hear why again')
    # pause and resume, then leaving the question
    qid = ids[1]
    page.evaluate(f"driveTo(byId('{qid}')); answerRight(); __said = []; __hold = true; document.querySelector('#v-quiz [data-hearwhy]').click()")
    page.wait_for_timeout(50)
    p1 = page.evaluate("[WHY && WHY.playing, document.querySelector('#v-quiz [data-hearwhy]').textContent, __said.length]")
    page.evaluate("speechSynthesis.q.onend()"); page.wait_for_timeout(30)        # the first sentence ends
    page.evaluate("document.querySelector('#v-quiz [data-hearwhy]').click()")    # Pause during the second
    p2 = page.evaluate("[WHY && WHY.playing, WHY && WHY.k, document.querySelector('#v-quiz [data-hearwhy]').textContent, __said.length]")
    page.evaluate("document.querySelector('#v-quiz [data-hearwhy]').click()")    # Resume
    p3 = page.evaluate("[WHY && WHY.playing, __said.slice(-1)[0] === __said[1], document.querySelector('#v-quiz [data-hearwhy]').textContent]")
    check(p1 == [True, '❚❚ Pause', 1] and p2 == [False, 1, '🔊 Resume', 2] and p3 == [True, True, '❚❚ Pause'],
          f'Pause stops the voice and Resume reads that sentence again {p1} {p2} {p3}')
    page.evaluate(f"driveTo(byId('{ids[2]}')); answerRight()"); page.wait_for_timeout(50)
    page.evaluate("speechSynthesis.q && speechSynthesis.q.onend && speechSynthesis.q.onend()"); page.wait_for_timeout(30)
    check(page.evaluate("WHY === null && !document.querySelector('#v-quiz [data-hearwhy]')"), 'moving to a question with no script stops it, and that question has no button')
    page.evaluate(f"driveTo(byId('{qid}')); answerRight(); __hold = true; document.querySelector('#v-quiz [data-hearwhy]').click(); show('topics')")
    check(page.evaluate("WHY === null"), 'leaving the tab stops it')
    # a clip listed as recorded that cannot load: the voice reads instead
    page.route(f'**/audio/why-{qid}.mp3', lambda r: r.abort())   # the clip cannot load, whether or not it exists
    page.evaluate(f"__hold = false; __said = []; WHY_CLIPS.push('{qid}'); show('quiz'); driveTo(byId('{qid}')); answerRight(); document.querySelector('#v-quiz [data-hearwhy]').click()")
    try:
        page.wait_for_function("__said.length > 0", timeout=10000); fell = True
    except Exception:
        fell = False
    check(fell, 'a recorded clip that fails to load falls back to the device voice')
    page.evaluate(f"whyStop(); WHY_CLIPS.splice(WHY_CLIPS.indexOf('{qid}'), 1)"); page.unroute(f'**/audio/why-{qid}.mp3')
    # no device voice: the words open
    page.evaluate(f"window.__keep = window.speechSynthesis; window.speechSynthesis = undefined; driveTo(byId('{qid}')); answerRight(); document.querySelector('#v-quiz [data-hearwhy]').click()")
    check(page.evaluate("!!document.querySelector('#v-quiz .whytx').open && WHY === null"), 'with no device voice the words open instead')
    page.evaluate("window.speechSynthesis = window.__keep")
    # a submitted paper
    page.evaluate("show('exam'); document.getElementById('startExam').click()"); page.wait_for_timeout(300)
    n = page.evaluate("""(() => { EX.qs.forEach((q, i) => { if (qType(q) === 'mc' && !isMulti(q)) EX.picks[i] = q.options.findIndex(o => o.correct); });
      const stars = EX.qs.filter(q => LIKELY_WHY[q.id]).length; finishExam(); return stars; })()""")
    page.wait_for_timeout(300)
    got = page.evaluate("document.querySelectorAll('#v-exam [data-hearwhy]').length")
    check(n > 0 and got == n, f"a submitted paper offers Hear why on each of its ★ questions ({got} of {n})")
    # the ★ drill on Topics: all, the concepts only, or the calculations only
    page.evaluate("MODPAGE = null; show('topics')"); page.wait_for_timeout(200)
    got = {}
    for k in ('all', 'concept', 'calc'):
        page.evaluate("show('topics')"); page.wait_for_timeout(150)
        page.click(f'#v-topics [data-likelykind="{k}"]'); page.wait_for_timeout(200)
        got[k] = page.evaluate(f"[VIEW, Q.pool.length, Q.pool.every(q => starOf(q) && ('{k}' === 'all' || kindOf(q) === '{k}'))]")
    want = page.evaluate("(() => { const s = QUESTIONS.filter(starOf); return [s.length, s.filter(q => kindOf(q) === 'concept').length, s.filter(q => kindOf(q) === 'calc').length]; })()")
    check([got[k][1] for k in ('all', 'concept', 'calc')] == want and all(g[0] == 'quiz' and g[2] for g in got.values()) and want[1] + want[2] == want[0],
          f"the ★ drill starts all {want[0]}, the {want[1]} concepts or the {want[2]} calculations {got}")
    page.evaluate("WHY_CLIPS.push(...__clips)")
    sw = page.evaluate("document.documentElement.scrollWidth - innerWidth")
    check(sw <= 1, f'no sideways scroll ({sw})')


def main():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
        def do_GET(self):
            if self.path == '/favicon.ico': self.send_response(204); self.end_headers(); return
            super().do_GET()
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    URL = f'http://127.0.0.1:{srv.server_address[1]}/{NAME}'
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width in (390, 1200):
            page = browser.new_page(viewport={'width': width, 'height': 860})
            errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.on('console', lambda m: errs.append(m.text + ' ' + (m.location or {}).get('url', '')) if m.type == 'error' and '/audio/why-' not in (m.location or {}).get('url', '') and 'ERR_FAILED' not in m.text else None)   # the clip the fallback check blocks
            page.add_init_script(VOICE)
            page.goto(URL); page.wait_for_timeout(1200)
            run(page, width)
            check(not errs, f'no page or console errors at {width} px', '; '.join(errs[:3]))
            page.close()
        browser.close()
    srv.shutdown()
    print(f'\n{len(fails)} failure(s)' if fails else '\nall Hear why checks passed')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
