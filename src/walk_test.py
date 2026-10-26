#!/usr/bin/env python3
"""Drive the guide walkthroughs in Chromium at phone (390 px) and desktop (1200 px) widths.

The built page is served from the repository root, so the slide images load from slides/ as they do on the
class site. The device voice is replaced by a stand-in that finishes each sentence after a few milliseconds, so
the parts advance on their own. For every section with a walkthrough: it opens, every slide its parts name
loads, stepping a part moves the slide with it, playing advances the parts, pause holds the position and resume
continues from it, the position survives closing the panel, and the page never scrolls sideways. Any page or
console error fails the run.

    python3 walk_test.py
"""
import functools, http.server, os, re, sys, threading
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
NAME = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", open(os.path.join(HERE, 'course.js')).read()).group(1)
FAKE_VOICE = """
(() => {
  const fs = {q: [], speak(u){ this.q.push(u); setTimeout(() => { if(!u._x && u.onend) u.onend(); }, 15); },
              cancel(){ this.q.forEach(u => u._x = true); this.q = []; }, getVoices(){ return []; }};
  Object.defineProperty(window, 'speechSynthesis', {value: fs, configurable: true});
  window.SpeechSynthesisUtterance = function(t){ this.text = t; };
  window.prompt = () => 'WalkTest';
})();
"""
fails = []


def check(ok, label, detail=''):
    print(('  ok   ' if ok else '  FAIL ') + label + ('' if ok else f'  ({detail})'))
    if not ok: fails.append(label)


def run(page, width):
    print(f'\n=== walkthroughs at {width} px ===')
    page.evaluate("LS.set(FOLD_KEY + 'guide', 'open'); show('guide')")
    page.wait_for_timeout(400)
    ids = page.evaluate("[...document.querySelectorAll('#v-guide section.gobj[id]')].map(s => s.id).filter(gwHas)")
    want = page.evaluate("Object.keys(GUIDE_WALK).length")
    check(len(ids) == want, f'every walkthrough has its section on the Guides tab ({len(ids)} of {want})')
    bars = page.evaluate("document.querySelectorAll('#v-guide .gwbar').length")
    check(bars == want, f'every section with a walkthrough shows a Listen bar ({bars})')
    # every slide the scripts name loads
    bad = page.evaluate("""async () => { const ss = [...new Set(Object.values(GUIDE_WALK).flatMap(w => w.segs.map(x => x.s)).filter(Boolean))];
      const r = await Promise.all(ss.map(s => new Promise(ok => { const [d, n] = s.split(':'), im = new Image();
        im.onload = () => ok(im.naturalWidth > 0 ? null : s); im.onerror = () => ok(s); im.src = gwSlideSrc(d, +n); })));
      return [ss.length, r.filter(Boolean)]; }""")
    check(not bad[1], f'all {bad[0]} slides the scripts name load', ', '.join(bad[1][:5]))
    for sid in ids:
        segs = page.evaluate(f"GUIDE_WALK['{sid}'].segs.map(x => x.s)")
        page.evaluate(f"(() => {{ const s = document.getElementById('{sid}'); openAncestors(s); s.querySelector('[data-gwopen]').scrollIntoView(); }})()")
        page.click(f'#{sid} [data-gwopen]')
        page.wait_for_selector(f'.gwpanel[data-gwp="{sid}"]')
        page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')   # Listen starts playing; this pauses
        page.evaluate(f"gwGo('{sid}', 0)")
        follow = True
        for i, s in enumerate(segs):
            if i: page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwstep="1"]')
            got = page.evaluate(f"""(() => {{ const p = document.querySelector('.gwpanel[data-gwp="{sid}"]'), im = p.querySelector('.gwslide img');
              return [+p.dataset.at, p.querySelector('.gwslide').dataset.sel || null, im ? im.complete && im.naturalWidth > 0 : null,
                      p.querySelector('.gwtx li.on') ? +p.querySelector('.gwtx li.on').dataset.gwi : -1]; }})()""")
            exp = s or page.evaluate(f"gwSlideOf('{sid}', {i})")
            if got[0] != i or got[3] != i or got[1] != exp: follow = False
        check(follow, f'{sid}: stepping through {len(segs)} parts moves the transcript and the slide with each part')
        # parts with a step figure: stepped to, the figure shows its last step; the slide folds behind a button
        figs = page.evaluate(f"GUIDE_WALK['{sid}'].segs.map((x, i) => x.f ? [i, x.f.k, x.f.at[x.f.at.length - 1][1]] : null).filter(Boolean)")
        if figs:
            ok = True
            for i, key, last in figs:
                page.evaluate(f"gwGo('{sid}', {i})")
                got = page.evaluate(f"""(() => {{ const p = document.querySelector('.gwpanel[data-gwp="{sid}"]'), f = p.querySelector('.gwfig');
                  const on = [...f.querySelectorAll('.st')].findIndex(s => s.classList.contains('on'));
                  return [f.hidden, f.dataset.k, on + 1, p.classList.contains('gwhasfig'), getComputedStyle(p.querySelector('.gwslide img') || document.body).display]; }})()""")
                if got != [False, key, last, True, 'none']: ok = False; print('       ', i, got)
            check(ok, f'{sid}: {len(figs)} parts show their step figure in full when stepped to, with her slide folded')
            i0, key0 = figs[0][0], figs[0][1]
            first = page.evaluate(f"GUIDE_WALK['{sid}'].segs[{i0}].f.at")
            page.evaluate(f"gwGo('{sid}', {i0})"); page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')
            page.wait_for_function(f"GW && (GW.i > {i0} || GW.k >= {first[-1][0]})", timeout=8000)
            page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')
            st = page.evaluate(f"""(() => {{ const f = document.querySelector('.gwpanel[data-gwp="{sid}"] .gwfig'); return [...f.querySelectorAll('.st')].findIndex(s => s.classList.contains('on')) + 1; }})()""")
            check(st >= first[0][1], f'{sid}: playing builds the figure with the narration (step {st})')
        # play from part 0, let it advance, pause, hold, resume
        page.evaluate(f"gwGo('{sid}', 0)")
        page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')
        page.wait_for_function(f"GW && GW.id === '{sid}' && (GW.i > 0 || GW.k > 1)", timeout=8000)
        page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')
        a = page.evaluate("[GW.i, GW.k, GW.playing]")
        page.wait_for_timeout(250)
        b = page.evaluate("[GW.i, GW.k, GW.playing]")
        sel = page.evaluate(f"document.querySelector('.gwpanel[data-gwp=\"{sid}\"] .gwslide').dataset.sel || null")
        check(a == b and a[2] is False and sel == page.evaluate(f"gwSlideOf('{sid}', {a[0]})"),
              f'{sid}: playing advanced to part {a[0] + 1} sentence {a[1] + 1}; pause holds it and the slide follows', f'{a} then {b}')
        page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')
        page.wait_for_timeout(60)
        c = page.evaluate("[GW.i, GW.k, GW.playing]")
        check(c[2] and (c[0], c[1]) >= (a[0], a[1]), f'{sid}: resume continues from where it paused', f'{a} then {c}')
        page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')
        at = page.evaluate("GW.i")
        page.click(f'#{sid} [data-gwopen]')        # close
        lab = page.inner_text(f'#{sid} [data-gwopen]')
        check(at == 0 or f'part {at + 1}' in lab, f'{sid}: closing keeps the place ({lab.strip()})')
        sw = page.evaluate("document.documentElement.scrollWidth - innerWidth")
        if sw > 0: check(False, f'{sid}: no sideways scroll', f'{sw} px wider than the screen')
    # keys: K plays and pauses, the arrows move a part
    sid = ids[0]
    page.evaluate(f"gwGo('{sid}', 0)")
    page.click(f'#{sid} [data-gwopen]'); page.wait_for_selector(f'.gwpanel[data-gwp="{sid}"]')
    page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')            # pause the autoplay
    page.evaluate(f"gwGo('{sid}', 0)")
    page.focus(f'.gwpanel[data-gwp="{sid}"] .gwtx li[data-gwi="0"]')
    page.keyboard.press('ArrowRight'); r1 = page.evaluate("GW.i")
    page.keyboard.press('ArrowLeft'); r0 = page.evaluate("GW.i")
    page.keyboard.press('k'); p1 = page.evaluate("GW.playing")
    page.keyboard.press('k'); p0 = page.evaluate("GW.playing")
    check((r1, r0, p1, p0) == (1, 0, True, False), 'keys: the arrows move a part, K plays and pauses', str((r1, r0, p1, p0)))
    page.focus('body'); page.keyboard.press(' '); p2 = page.evaluate("GW.playing"); page.keyboard.press(' ')
    check(p2 is True, 'keys: Space plays from the page while a walkthrough is open')
    # phone layout: transcript first, one part shown
    if width < 700:
        lay = page.evaluate(f"""(() => {{ const p = document.querySelector('.gwpanel[data-gwp="{sid}"]');
          const tx = p.querySelector('.gwtx').getBoundingClientRect(), vis = p.querySelector('.gwvis').getBoundingClientRect();
          const shown = [...p.querySelectorAll('.gwtx li')].filter(li => getComputedStyle(li).display !== 'none').length;
          return [tx.top < vis.top, shown]; }})()""")
        check(lay == [True, 1], 'phone: the transcript comes first and shows only the part being read', str(lay))
    # zoom
    page.click(f'.gwpanel[data-gwp="{sid}"] .gwslide img'); z = page.evaluate("!!document.querySelector('.gwzoom img')")
    page.keyboard.press('Escape'); z2 = page.evaluate("!!document.querySelector('.gwzoom')")
    check(z and not z2, 'the slide opens full size and Escape closes it')
    # continue to the next section at the end of the last part
    if len(ids) > 1:
        page.evaluate(f"LS.set(GW_CONT_KEY, '1'); gwGo('{sid}', GUIDE_WALK['{sid}'].segs.length - 1)")
        page.click(f'.gwpanel[data-gwp="{sid}"] [data-gwplay]')
        page.wait_for_function(f"GW && GW.id === '{ids[1]}'", timeout=10000)
        check(True, f'the last part ends and the next section ({ids[1]}) opens and plays')
        page.evaluate("gwStop()")
    page.evaluate("show('topics')")
    check(page.evaluate("GW === null"), 'changing tabs stops the walkthrough')


def main():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
        def do_GET(self):   # the browser asks for /favicon.ico on its own; the page declares no icon
            if self.path == '/favicon.ico': self.send_response(204); self.end_headers(); return
            super().do_GET()
    handler = functools.partial(Quiet, directory=ROOT)
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
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
            page.on('response', lambda r: errs.append(f'{r.status} {r.url}') if r.status >= 400 else None)
            page.add_init_script(FAKE_VOICE)
            page.goto(url); page.wait_for_timeout(1200)
            run(page, width)
            check(not errs, f'no page or console errors at {width} px', '; '.join(errs[:3]))
            page.close()
        browser.close()
    srv.shutdown()
    print(f'\n{len(fails)} failure(s)' if fails else '\nall walkthrough checks passed')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
