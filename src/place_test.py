#!/usr/bin/env python3
"""A reload comes back to the same place, in Chromium at phone (390 px) and desktop (1200 px) widths.

The built page is served from the repository root, as on the class site. For each case the page is set up, the
line at the top of the screen is noted, the page is reloaded, and the test checks that the same tab, the same
open sections and the same line at the same height come back:
  - Guides with a recorded walkthrough part playing: the panel reopens on the same part, paused, its button reads
    Resume, and Resume continues the clip from about where it stopped;
  - a Topics module page scrolled down;
  - a drill on a question: the same question comes back;
  - Worksheets with a module folder open;
  - Tell apart scrolled down.
Any page or console error fails the run.

    python3 place_test.py
"""
import functools, http.server, os, re, sys, threading
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
NAME = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", open(os.path.join(HERE, 'course.js')).read()).group(1)
fails = []
TOP = """(() => { const pane = document.getElementById('v-' + VIEW); const a = placeAnchor(pane); if(!a) return {y: Math.round(window.scrollY)};
  const el = a.id ? document.getElementById(a.id) : [...pane.querySelectorAll(a.tag)].filter(x => placeText(x) === a.txt)[a.n];
  return {key: a.id ? '#' + a.id : null, tag: a.tag, txt: a.txt, n: a.n, top: Math.round(el.getBoundingClientRect().top)}; })()"""


def check(ok, label, detail=''):
    print(('  ok   ' if ok else '  FAIL ') + label + ('' if ok else f'  ({detail})'))
    if not ok: fails.append(label)


def same_line(page, before, label):
    page.wait_for_timeout(1500)   # the second placement runs after images load
    k = page.evaluate("""want => { const pane = document.getElementById('v-' + VIEW);
      if(want.y != null) return Math.round(window.scrollY);
      const el = want.key ? document.getElementById(want.key.slice(1)) : [...pane.querySelectorAll(want.tag)].filter(x => placeText(x) === want.txt)[want.n];
      return el ? Math.round(el.getBoundingClientRect().top) : null; }""", before)
    want = before['y'] if before.get('y') is not None else before['top']
    check(k is not None and abs(k - want) <= 4, f'{label}: the same line comes back at the same height', f"{before} then {k}")


def run(page, width):
    print(f'\n=== reloads at {width} px ===')
    # 1. a recorded walkthrough part, playing, then the page is reloaded
    sid = page.evaluate("Object.keys(GUIDE_WALK).find(id => gwRec(id, 1))")   # a section whose part 2 is recorded
    page.evaluate(f"LS.set(FOLD_KEY + 'guide', 'open'); show('guide'); openAncestors(document.getElementById('{sid}'))")
    page.click(f'#{sid} [data-gwopen]'); page.wait_for_selector(f'.gwpanel[data-gwp="{sid}"]')
    page.evaluate(f"gwGo('{sid}', 1)")
    if not page.evaluate("GW && GW.playing"): page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')
    try:
        page.wait_for_function("GW && GW.audio && GW_AUDIO && GW_AUDIO.currentTime > 3", timeout=20000); played = True
    except Exception:
        played = False
    check(played, 'a recorded part plays before the reload')
    page.evaluate(f"document.querySelector('.gwpanel[data-gwp=\"{sid}\"]').scrollIntoView({{block: 'center'}})"); page.wait_for_timeout(600)
    t0 = page.evaluate("GW_AUDIO.currentTime"); before = page.evaluate(TOP)
    page.reload(); page.wait_for_timeout(1200)
    st = page.evaluate(f"[VIEW, !!document.querySelector('.gwpanel[data-gwp=\"{sid}\"]'), GW && GW.id, GW && GW.i, GW && GW.playing, "
                       f"document.querySelector('.gwpanel[data-gwp=\"{sid}\"] [data-gwplay]') && document.querySelector('.gwpanel[data-gwp=\"{sid}\"] [data-gwplay]').textContent]")
    check(st == ['guide', True, sid, 1, False, '▶ Resume'], 'Guides: the walkthrough reopens on the same part, paused, ready to Resume', str(st))
    same_line(page, before, 'Guides')
    page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')
    try:
        page.wait_for_function(f"GW && GW.playing && GW.i === 1 && GW_AUDIO && GW_AUDIO.currentTime > {max(0, t0 - 2.5)}", timeout=15000); res = True
    except Exception:
        res = False
    check(res, 'Resume continues the clip from about where it stopped', f"stopped at {t0:.1f} s, now {page.evaluate('GW_AUDIO && GW_AUDIO.currentTime')}")
    page.evaluate("gwPause()")
    # 2. a Topics module page, scrolled
    page.evaluate("MODPAGE = {module: 2, sec: 'concepts'}; show('topics')"); page.wait_for_timeout(300)
    page.mouse.wheel(0, 700); page.wait_for_timeout(700)
    before = page.evaluate(TOP); page.reload(); page.wait_for_timeout(1200)
    check(page.evaluate("[VIEW, MODPAGE && MODPAGE.module]") == ['topics', 2], 'Topics: the module page comes back', page.evaluate("[VIEW, MODPAGE]"))
    same_line(page, before, 'Topics')
    # 3. a drill on a question
    page.evaluate("startQuiz(TOPICS[1].id)"); page.wait_for_timeout(400)
    qid = page.evaluate("Q && Q.current && Q.current.id")
    page.mouse.wheel(0, 200); page.wait_for_timeout(700)
    page.reload(); page.wait_for_timeout(1200)
    got = page.evaluate("[VIEW, Q && Q.current && Q.current.id]")
    check(qid and got == ['quiz', qid], 'Drill: the same question comes back', f"{qid} then {got}")
    # 4. Worksheets with a module folder open
    page.evaluate("show('sheets')"); page.wait_for_timeout(300)
    page.evaluate("(() => { const d = document.querySelector('#v-sheets details[data-srcgrp=\"m3\"]'); d.open = true; d.scrollIntoView({block: 'start'}); })()")
    page.wait_for_timeout(700); before = page.evaluate(TOP); page.reload(); page.wait_for_timeout(1200)
    check(page.evaluate("[VIEW, !!(document.querySelector('#v-sheets details[data-srcgrp=\"m3\"]') || {}).open]") == ['sheets', True],
          'Worksheets: the open folder stays open')
    same_line(page, before, 'Worksheets')
    # 5. Tell apart, scrolled
    page.evaluate("show('tell')"); page.wait_for_timeout(300)
    page.mouse.wheel(0, 1500); page.wait_for_timeout(700)
    before = page.evaluate(TOP); page.reload(); page.wait_for_timeout(1200)
    check(page.evaluate("VIEW") == 'tell', 'Tell apart: the tab comes back')
    same_line(page, before, 'Tell apart')


def main():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
        def do_GET(self):
            if self.path == '/favicon.ico': self.send_response(204); self.end_headers(); return
            super().do_GET()
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{srv.server_address[1]}/{NAME}'
    with sync_playwright() as p:
        exe = '/opt/pw-browsers/chromium'
        browser = p.chromium.launch(**({'executable_path': exe} if os.path.exists(exe) and not os.path.isdir(exe) else {}))
        for width in (390, 1200):
            page = browser.new_page(viewport={'width': width, 'height': 860})
            errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            page.add_init_script("window.prompt = () => 'PlaceTest';")
            page.goto(url); page.wait_for_timeout(1200)
            run(page, width)
            check(not errs, f'no page or console errors at {width} px', '; '.join(errs[:3]))
            page.close()
        browser.close()
    srv.shutdown()
    print(f'\n{len(fails)} failure(s)' if fails else '\nall reload checks passed')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
