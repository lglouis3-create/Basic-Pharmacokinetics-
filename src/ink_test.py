#!/usr/bin/env python3
"""Write on a worksheet: drive the writing layer in Chromium at iPad (820 px) and phone (390 px) widths.

Opens a worksheet with a calculation from the Worksheets tab and checks: the work areas are larger than in the PDF
(480 px for a calculation, 200 px for a short answer) and More room / Less room change them by 240 px; a stroke
drawn with the mouse lands in that problem's ink, is drawn on its canvas and saved; undo, redo, the eraser and
Clear page work; once a Pencil touches, a finger scrolls instead of writing; the writing and the room come back
after a reload; Save as PDF prints the worksheet alone with the ink on it; Show solutions opens the solutions;
the page never scrolls sideways and nothing logs an error. Then scratch paper: a calculation question in a quiz
and on an exam paper opens its stem over a 720 px work area with no solutions; the writing is kept for the quiz,
and a new exam paper starts with clean scratch paper. Last, the GoodNotes-style gestures on scratch paper, with Pencil
events: a near-straight stroke held still for half a second snaps to a straight line whose end follows the Pencil
until it lifts, a closed loop snaps to an ellipse and a box to a box, a scribble and a stroke that is not held stay
as drawn, Hold to snap off stops all of it, the highlighter straightens but does not make shapes and sits under the
writing, two fingers tapped together undo while a two-finger scroll does not, and nothing on the page can be
selected or opens a menu.

    python3 ink_test.py
"""
import math, os, re, sys
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
NAME = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", open(os.path.join(HERE, 'course.js')).read()).group(1)
PAGE = 'file://' + os.path.join(os.path.dirname(HERE), NAME)
fails = []


def check(ok, label, detail=''):
    print(('  ok   ' if ok else '  FAIL ') + label + ('' if ok else f'  ({detail})'))
    if not ok: fails.append(label)


def stroke(page, sel, x0, y0, x1, y1, steps=12):
    b = page.locator(sel).bounding_box()
    page.mouse.move(b['x'] + x0, b['y'] + y0); page.mouse.down()
    for i in range(1, steps + 1):
        page.mouse.move(b['x'] + x0 + (x1 - x0) * i / steps, b['y'] + y0 + (y1 - y0) * i / steps)
    page.mouse.up()


def run(browser, width, height):
    print(f'\n=== write on a worksheet at {width} px ===')
    page = browser.new_page(viewport={'width': width, 'height': height})
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))
    page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    page.add_init_script("window.prompt = () => 'InkTest'; window.confirm = () => true; window.print = () => { window.__printed = (window.__printed || 0) + 1; };")
    page.goto(PAGE); page.wait_for_timeout(900)
    page.evaluate("Object.keys(localStorage).filter(k => k.includes(':ink')).forEach(k => localStorage.removeItem(k)); show('sheets'); document.querySelectorAll('#v-sheets details').forEach(d => d.open = true)")
    page.wait_for_timeout(300)
    n = page.evaluate("document.querySelectorAll('#v-sheets [data-ink][data-var]').length")
    check(n > 0, f'every worksheet card has Write on it ({n} buttons)')
    # the first worksheet with a calculation part
    sid = page.evaluate("""(() => { for (const b of document.querySelectorAll('#v-sheets [data-ink][data-var="main"]')) {
        const d = document.createElement('div'); d.innerHTML = sheetHTML(b.dataset.ink, 'worksheet');
        if (d.querySelector('.wspart.calc') && d.querySelector('.wswork.short')) return b.dataset.ink; } return null; })()""") or \
          page.evaluate("""(() => { for (const b of document.querySelectorAll('#v-sheets [data-ink][data-var="main"]')) {
        const d = document.createElement('div'); d.innerHTML = sheetHTML(b.dataset.ink, 'worksheet'); if (d.querySelector('.wspart.calc')) return b.dataset.ink; } return null; })()""")
    check(bool(sid), f'a worksheet with a calculation to write on ({sid})')
    btn = f'#v-sheets [data-ink="{sid}"][data-var="main"]'
    page.locator(btn).scroll_into_view_if_needed(); page.click(btn)
    page.wait_for_selector('#ink .inkpaper .wsdoc')
    calc = '#ink .wspart.calc'
    key = page.evaluate(f"document.querySelector('{calc}').dataset.ink")
    calc = f'#ink .wspart[data-ink="{key}"]'
    h = page.evaluate(f"document.querySelector('{calc} .wswork').getBoundingClientRect().height")
    check(h >= 479, f'a calculation has at least 480 px to work in on screen ({h:.0f} px)')
    hs = page.evaluate("(() => { const w = document.querySelector('#ink .wswork.short'); return w ? w.getBoundingClientRect().height : null; })()")
    if hs is not None: check(hs >= 199, f'a short answer has at least 200 px ({hs:.0f} px)')
    room = f'#ink .inkroom[data-inkfor="{key}"]'
    page.click(f'{room} [data-inkroom="1"]'); h2 = page.evaluate(f"document.querySelector('{calc} .wswork').getBoundingClientRect().height")
    page.click(f'{room} [data-inkroom="1"]'); page.click(f'{room} [data-inkroom="-1"]')
    h3 = page.evaluate(f"document.querySelector('{calc} .wswork').getBoundingClientRect().height")
    check(round(h2 - h) == 240 and round(h3 - h) == 240, f'More room adds 240 px and Less room takes it back ({h:.0f} → {h2:.0f} → {h3:.0f})')
    # write in the work area
    page.evaluate(f"document.querySelector('{calc} .wswork').scrollIntoView({{block: 'center'}})")
    ws = page.locator(f'{calc} .wswork').bounding_box(); cv = page.locator(f'{calc} > canvas.inkcv').bounding_box()
    oy = ws['y'] - cv['y']
    stroke(page, f'{calc} > canvas.inkcv', 30, oy + 40, 200, oy + 90)
    st = page.evaluate(f"[(INK.data.parts['{key}'] || []).length, (INK.data.parts['{key}'] || [{{p: []}}])[0].p.length]")
    check(st[0] == 1 and st[1] >= 6, f'a stroke in the work area is kept on its problem ({st[0]} stroke, {st[1] // 2} points)')
    ink_px = page.evaluate(f"""(() => {{ const c = document.querySelector('{calc} > canvas.inkcv'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
        let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++; return n; }})()""")
    check(ink_px > 50, f'the stroke is drawn on the canvas ({ink_px} pixels)')
    saved = page.evaluate(f"JSON.parse(localStorage.getItem(INK_KEY('{sid}', 'main'))).parts['{key}'].length")
    check(saved == 1, 'the stroke is saved in this browser')
    page.click('#ink [data-inkundo]'); u = page.evaluate(f"(INK.data.parts['{key}'] || []).length")
    page.click('#ink [data-inkredo]'); r = page.evaluate(f"(INK.data.parts['{key}'] || []).length")
    check((u, r) == (0, 1), f'undo removes the stroke and redo puts it back ({u}, {r})')
    page.click('#ink [data-inktool="erase"]'); stroke(page, f'{calc} > canvas.inkcv', 100, oy + 30, 100, oy + 110)
    e1 = page.evaluate(f"(INK.data.parts['{key}'] || []).length")
    page.click('#ink [data-inkundo]'); e2 = page.evaluate(f"(INK.data.parts['{key}'] || []).length")
    check((e1, e2) == (0, 1), f'the eraser removes a stroke it touches, and undo brings it back ({e1}, {e2})')
    page.click('#ink [data-inkcolor="#1E56C8"]')
    check(page.evaluate("INK.tool === 'pen' && INK.color === '#1E56C8'"), 'picking a colour returns to the pen in that colour')
    page.evaluate("document.getElementById('ink').scrollTop = 0")
    stroke(page, '#ink .wshead > canvas.inkcv', 80, 20, 180, 22)
    check(page.evaluate("(INK.data.parts.head || []).length") == 1, 'the name line takes writing too')
    # Pencil: once a pen touches, a finger scrolls and does not write
    res = page.evaluate(f"""(() => {{ const c = document.querySelector('{calc} > canvas.inkcv'), r = c.getBoundingClientRect(), ov = document.getElementById('ink');
        const ev = (t, type, x, y, id) => c.dispatchEvent(new PointerEvent(type, {{pointerType: t, clientX: r.left + x, clientY: r.top + y, pointerId: id, bubbles: true, isPrimary: true}}));
        INK.pencil = false; const before = (INK.data.parts['{key}'] || []).length;
        ev('pen', 'pointerdown', 40, r.height - 80, 7); ev('pen', 'pointermove', 90, r.height - 60, 7); ev('pen', 'pointermove', 140, r.height - 50, 7); ev('pen', 'pointerup', 140, r.height - 50, 7);
        const afterPen = (INK.data.parts['{key}'] || []).length, pencil = INK.pencil;
        ov.scrollTop = 200; const top0 = ov.scrollTop;
        ev('touch', 'pointerdown', 60, r.height - 100, 8); ev('touch', 'pointermove', 60, r.height - 160, 8); ev('touch', 'pointerup', 60, r.height - 160, 8);
        return [before, afterPen, pencil, (INK.data.parts['{key}'] || []).length, top0, ov.scrollTop]; }})()""")
    check(res[1] == res[0] + 1 and res[2] and res[3] == res[1] and res[5] > res[4],
          f'a Pencil writes and switches to Pencil only; then a finger scrolls the page and does not write {res}')
    # Show solutions
    page.click('#ink [data-inksol]')
    check(page.evaluate("!document.querySelector('#ink .inksol').hidden && !!document.querySelector('#ink .inksol .wssp')"), 'Show solutions opens the solutions under the worksheet')
    page.click('#ink [data-inksol]')
    sw = page.evaluate("document.getElementById('ink').scrollWidth - document.getElementById('ink').clientWidth")
    check(sw <= 0, f'the worksheet does not scroll sideways ({sw} px)')
    # Save as PDF: the worksheet alone, with the ink
    page.click('#ink [data-inkpdf]'); page.wait_for_timeout(200)
    page.emulate_media(media='print')
    pr = page.evaluate(f"""(() => {{ const vis = el => !!el && getComputedStyle(el).display !== 'none';
        const im = document.querySelector('{calc} > img.inkimg'), cv = document.querySelector('{calc} > canvas.inkcv');
        return [window.__printed || 0, vis(document.querySelector('header')), vis(document.querySelector('.inkbar')), vis(cv), vis(im), !!im && im.complete && im.naturalWidth > 0]; }})()""")
    pdf = page.pdf(format='Letter')
    page.emulate_media(media='screen')
    check(pr == [1, False, False, False, True, True], f'Save as PDF prints the worksheet alone, ink as pictures in place of the canvases {pr}')
    check(len(pdf) > 20000, f'the printed PDF has the worksheet ({len(pdf) // 1024} KB)')
    # Done, reload, reopen: the writing and the room come back
    page.click('#ink [data-inkdone]')
    lab = page.inner_text(btn)
    check(not page.evaluate("!!document.getElementById('ink')") and 'Continue' in lab, f'Done closes it and the card says {lab.strip()!r}')
    page.reload(); page.wait_for_timeout(900); page.evaluate("show('sheets'); document.querySelectorAll('#v-sheets details').forEach(d => d.open = true)"); page.wait_for_timeout(300)
    page.locator(btn).scroll_into_view_if_needed(); page.click(btn); page.wait_for_selector('#ink .inkpaper .wsdoc')
    back = page.evaluate(f"""(() => {{ const c = document.querySelector('{calc} > canvas.inkcv'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
        let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++;
        return [(INK.data.parts['{key}'] || []).length, (INK.data.parts.head || []).length, INK.data.room['{key}'] || 0, n > 50,
                Math.round(document.querySelector('{calc} .wswork').getBoundingClientRect().height)]; }})()""")
    check(back[:4] == [2, 1, 240, True] and back[4] >= 719, f'after a reload the writing and the extra room are back {back}')
    page.click('#ink [data-inkclear]')
    c1 = page.evaluate("Object.values(INK.data.parts).reduce((n, a) => n + a.length, 0)")
    page.click('#ink [data-inkundo]'); c2 = page.evaluate("Object.values(INK.data.parts).reduce((n, a) => n + a.length, 0)")
    check((c1, c2) == (0, 3), f'Clear page removes all of it and undo restores it ({c1}, {c2})')
    page.click('#ink [data-inkdone]')
    check(not errs, f'no page or console errors at {width} px', '; '.join(errs[:3]))
    page.close()


def scratch(browser, width, height):
    print(f'\n=== scratch paper at {width} px ===')
    page = browser.new_page(viewport={'width': width, 'height': height})
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))
    page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    page.add_init_script("window.prompt = () => 'InkTest'; window.confirm = () => true; window.print = () => {};")
    page.goto(PAGE); page.wait_for_timeout(900)
    page.evaluate("Object.keys(localStorage).filter(k => k.includes(':ink')).forEach(k => localStorage.removeItem(k))")
    qid = page.evaluate("(() => { const q = QUESTIONS.find(q => qType(q) === 'numeric'); show('quiz'); startSweepOf([q], 'one', 'filtered'); return q.id; })()")
    page.wait_for_timeout(300)
    btn = '#v-quiz .inkscratch'
    check(page.locator(btn).count() == 1, f'a calculation question in the quiz has Scratch paper ({qid})')
    page.click(btn); page.wait_for_selector('#ink .inkpaper .wsdoc')
    info = page.evaluate("""[document.querySelector('#ink .wsq').textContent.length > 20,
        Math.round(document.querySelector('#ink .wswork').getBoundingClientRect().height),
        !!document.querySelector('#ink [data-inksol]'), INK.variant]""")
    check(info[0] and info[1] >= 719 and not info[2] and info[3] == 'scratch', f'it shows the stem over a 720 px work area, no solutions {info}')
    stroke(page, '#ink .wspart[data-ink="work"]', 60, 260, 260, 300)
    n = page.evaluate("(INK.data.parts.work || []).length")
    check(n == 1, f'a stroke lands on the scratch paper ({n})')
    page.click('#ink [data-inkdone]')
    kept = page.evaluate(f"inkCount('q:{qid}', 'scratch')")
    check(kept == 1 and page.evaluate("!document.getElementById('ink')"), f'Done closes it and the writing is kept ({kept})')
    # on an exam paper
    ex = page.evaluate("""(() => { show('exam'); document.getElementById('startExam').click();
        const i = EX.qs.findIndex(q => qType(q) === 'numeric'); if (i < 0) return null; EX.i = i; renderExam(); return [i, EX.ends]; })()""")
    check(ex is not None, 'the exam paper has a calculation question')
    if ex:
        page.wait_for_timeout(200)
        b = page.locator('#v-exam .inkscratch').first
        var = b.get_attribute('data-var')
        check(var == f'exam:{ex[1]}', f'its Scratch paper belongs to this paper ({var})')
        b.click(); page.wait_for_selector('#ink .inkpaper .wsdoc')
        check(not page.evaluate("!!document.querySelector('#ink [data-inksol]')"), 'no solutions on an exam paper')
        clk = page.evaluate("(document.querySelector('#ink .inkclock') || {}).textContent || ''")
        check(':' in clk, f'the time left on the paper shows over the scratch paper ({clk!r})')
        stroke(page, '#ink .wspart[data-ink="work"]', 60, 260, 260, 300)
        page.click('#ink [data-inkdone]')
        old = page.evaluate("Object.keys(localStorage).filter(k => k.includes(':ink:q:') && k.includes(':exam:')).length")
        page.evaluate("""(() => { EX.ends += 1000; const i = EX.qs.findIndex(q => qType(q) === 'numeric'); EX.i = i; renderExam(); })()""")
        page.locator('#v-exam .inkscratch').first.click(); page.wait_for_selector('#ink .inkpaper .wsdoc')
        fresh = page.evaluate("[(INK.data.parts.work || []).length, Object.keys(localStorage).filter(k => k.includes(':ink:q:') && k.includes(':exam:')).length]")
        page.click('#ink [data-inkdone]')
        check(old == 1 and fresh[0] == 0 and fresh[1] <= 1, f'a new paper starts with clean scratch paper and the old one is cleared ({old}, {fresh})')
    wide = page.evaluate("document.documentElement.scrollWidth - innerWidth")
    check(wide <= 1, f'no sideways scroll ({wide})')
    check(not errs, f'no page or console errors at {width} px', '; '.join(errs[:3]))
    page.close()


PEN = """async ([path, hold, extra, tool]) => {
  const el = document.querySelector('#ink .wspart[data-ink="work"]'), c = el.querySelector(':scope > canvas.inkcv'), r = c.getBoundingClientRect();
  if (tool) document.querySelector(`#ink [data-inktool="${tool}"]`).click();
  const ev = (type, x, y) => c.dispatchEvent(new PointerEvent(type, {pointerType: 'pen', clientX: r.left + x, clientY: r.top + y, pointerId: 31, bubbles: true, cancelable: true, isPrimary: true}));
  const before = (INK.data.parts.work || []).length;
  ev('pointerdown', path[0][0], path[0][1]);
  for (const [x, y] of path.slice(1)) ev('pointermove', x, y);
  if (hold) await new Promise(f => setTimeout(f, hold));
  const snap = INK.live && INK.live.snap || null;
  for (const [x, y] of extra) ev('pointermove', x, y);
  const last = (extra.length ? extra : path)[(extra.length ? extra : path).length - 1];
  ev('pointerup', last[0], last[1]);
  if (tool) document.querySelector('#ink [data-inktool="pen"]').click();
  const list = INK.data.parts.work || [], s = list[list.length - 1];
  return {added: list.length - before, snap, n: s.p.length / 2, k: s.k || null, t: s.t, p: s.p.map(v => Math.round(v * r.width))};
}"""
TOUCH = """async ([moveBy, how]) => {
  const c = document.querySelector('#ink .wspart[data-ink="work"] > canvas.inkcv'), r = c.getBoundingClientRect();
  const ev = (type, x, y, id, t) => c.dispatchEvent(new PointerEvent(type, {pointerType: t || 'touch', clientX: r.left + x, clientY: r.top + y, pointerId: id, bubbles: true, cancelable: true}));
  const before = (INK.data.parts.work || []).length;
  if (how === 'pen') { ev('pointerdown', 40, 560, 51, 'pen'); ev('pointermove', 70, 565, 51, 'pen'); }
  ev('pointerdown', 80, 300, 41); ev('pointerdown', 160, 300, 42);
  if (moveBy) { ev('pointermove', 160, 300 - moveBy / 2, 42); ev('pointermove', 160, 300 - moveBy, 42); }
  if (how === 'pen') ev('pointermove', 100, 570, 51, 'pen');
  await new Promise(f => setTimeout(f, 60));
  const up = how === 'cancel' ? 'pointercancel' : 'pointerup';
  ev(up, 80, 300, 41); ev(up, 160, 300 - moveBy, 42);
  const mid = (INK.data.parts.work || []).length;
  if (how === 'pen') { ev('pointermove', 130, 575, 51, 'pen'); ev('pointerup', 130, 575, 51, 'pen'); }
  const list = INK.data.parts.work || [], s = list[list.length - 1];
  return [before, mid, list.length, how === 'pen' ? Math.round(s.p[s.p.length - 2] * r.width) : null];
}"""


def wobbly(x0, y0, x1, y1, n=30, amp=2.0):
    d = math.hypot(x1 - x0, y1 - y0); ux, uy = (x1 - x0) / d, (y1 - y0) / d
    return [[x0 + (x1 - x0) * i / n - uy * amp * math.sin(i * 1.3), y0 + (y1 - y0) * i / n + ux * amp * math.sin(i * 1.3)] for i in range(n + 1)]


def snaps(browser, width, height):
    print(f'\n=== hold to snap and two-finger undo at {width} px ===')
    page = browser.new_page(viewport={'width': width, 'height': height})
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))
    page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    page.add_init_script("window.prompt = () => 'InkTest'; window.confirm = () => true; window.print = () => {};")
    page.goto(PAGE); page.wait_for_timeout(900)
    page.evaluate("Object.keys(localStorage).filter(k => k.includes(':ink')).forEach(k => localStorage.removeItem(k)); localStorage.removeItem(NS + ':ink-prefs')")
    page.evaluate("(() => { const q = QUESTIONS.find(q => qType(q) === 'numeric'); show('quiz'); startSweepOf([q], 'one', 'filtered'); })()")
    page.wait_for_timeout(300); page.click('#v-quiz .inkscratch'); page.wait_for_selector('#ink .inkpaper .wsdoc')
    page.evaluate("document.querySelector('#ink .wspart[data-ink=\"work\"] .wswork').scrollIntoView({block: 'center'})")
    cw = page.evaluate("document.querySelector('#ink .wspart[data-ink=\"work\"] > canvas.inkcv').getBoundingClientRect().width")
    xr = min(cw - 30, 330)
    check(page.evaluate("INK.shapes === true && document.querySelector('#ink [data-inkshapes]').getAttribute('aria-pressed') === 'true'"), 'Hold to snap is on by default')
    # a line drawn and held: straight, and its end follows the Pencil until it lifts
    ln = wobbly(30, 220, xr, 280)
    r = page.evaluate(PEN, [ln, 700, [], None])
    check(r['added'] == 1 and r['snap'] == 'line' and r['n'] == 2 and abs(r['p'][0] - 30) <= 1 and abs(r['p'][1] - 220) <= 1,
          f"a near-straight stroke held still becomes a straight line from where it started ({r['snap']}, {r['n']} points, {r['p'][:4]})")
    r = page.evaluate(PEN, [ln, 700, [[xr - 20, 330], [xr - 40, 360]], None])
    check(r['n'] == 2 and abs(r['p'][2] - (xr - 40)) <= 1 and abs(r['p'][3] - 360) <= 1, f"after the snap the line's end follows the Pencil ({r['p']})")
    r = page.evaluate(PEN, [ln, 0, [], None])
    check(r['snap'] is None and r['n'] > 10, f"the same stroke lifted at once stays as drawn ({r['n']} points)")
    # closed shapes
    cx, cy, rad = min(cw / 2, 170), 420, 60
    loop = [[cx + (rad + 3 * math.sin(5 * a)) * math.cos(a), cy + (rad + 3 * math.sin(5 * a)) * 0.8 * math.sin(a)] for a in [2 * math.pi * i / 40 + 0.05 for i in range(42)]]
    r = page.evaluate(PEN, [loop, 700, [], None])
    check(r['snap'] == 'shape' and r['n'] == 73 and r['k'] is None, f"a closed loop held still becomes an ellipse ({r['snap']}, {r['n']} points)")
    bx0, by0, bx1, by1 = 40, 520, min(cw - 40, 220), 600
    box = [[bx0 + (bx1 - bx0) * i / 10, by0 + (i % 2)] for i in range(11)] + [[bx1 - (i % 2), by0 + (by1 - by0) * i / 8] for i in range(1, 9)] + \
          [[bx1 - (bx1 - bx0) * i / 10, by1 - (i % 2)] for i in range(1, 11)] + [[bx0 + (i % 2), by1 - (by1 - by0) * i / 8] for i in range(1, 8)]
    r = page.evaluate(PEN, [box, 700, [], None])
    check(r['snap'] == 'shape' and r['k'] == 'poly' and r['n'] == 5 and r['p'][:4] == [bx0, by0, round(bx1), by0],
          f"a box held still becomes a box with square corners ({r['snap']}, {r['k']}, {r['p']})")
    zig = [[40 + 12 * i, 650 + (30 if i % 2 else 0)] for i in range(12)]
    r = page.evaluate(PEN, [zig, 700, [], None])
    check(r['snap'] is None and r['n'] == 12, f"a scribble held still stays as drawn ({r['n']} points)")
    # Hold to snap off
    page.click('#ink [data-inkshapes]')
    off = page.evaluate("[INK.shapes, document.querySelector('#ink [data-inkshapes]').getAttribute('aria-pressed'), JSON.parse(localStorage.getItem(NS + ':ink-prefs')).shapes]")
    r = page.evaluate(PEN, [ln, 700, [], None])
    check(off == [False, 'false', False] and r['snap'] is None and r['n'] > 10, f"Hold to snap off: the held line stays as drawn, and the choice is saved ({off}, {r['n']} points)")
    page.click('#ink [data-inkshapes]')
    # the highlighter straightens, makes no shapes, and sits under the writing
    r = page.evaluate(PEN, [ln, 700, [], 'hl'])
    check(r['t'] == 'hl' and r['snap'] == 'line' and r['n'] == 2, f"a held highlighter stroke straightens ({r['t']}, {r['snap']})")
    r = page.evaluate(PEN, [loop, 700, [], 'hl'])
    check(r['t'] == 'hl' and r['snap'] is None and r['n'] > 20, f"a highlighter loop does not become a shape ({r['n']} points)")
    page.click('#ink [data-inksize="4"]'); page.click('#ink [data-inkcolor="#111111"]')
    page.evaluate(PEN, [[[30, 700], [80, 700], [130, 700], [180, 700]], 0, [], None])
    page.click('#ink [data-inkcolor="#C62828"]')
    page.evaluate(PEN, [[[105, 660], [105, 690], [105, 710], [105, 740]], 0, [], 'hl'])
    px = page.evaluate("""(() => { const c = document.querySelector('#ink .wspart[data-ink="work"] > canvas.inkcv'), k = c.width / c.getBoundingClientRect().width;
        const at = (x, y) => [...c.getContext('2d').getImageData(Math.round(x * k), Math.round(y * k), 1, 1).data];
        return [at(105, 700), at(105, 670)]; })()""")
    check(px[0][3] == 255 and all(abs(a - 17) <= 6 for a in px[0][:3]) and px[1][0] > px[1][1] + 40,
          f"a red highlighter drawn after black writing crosses it in red and the writing shows on top (crossing, highlighter alone: {px})")
    # two fingers tapped together undo; a two-finger scroll does not
    t = page.evaluate(TOUCH, [0, 'tap'])
    check(t[2] == t[0] - 1, f'two fingers tapped together undo the last stroke ({t})')
    t = page.evaluate(TOUCH, [80, 'tap'])
    check(t[2] == t[0], f'two fingers that move scroll and undo nothing ({t})')
    t = page.evaluate(TOUCH, [0, 'cancel'])
    check(t[2] == t[0], f'two touches the system cancels, such as a rejected palm, undo nothing ({t})')
    t = page.evaluate(TOUCH, [0, 'pen'])
    check(t[1] == t[0] and t[2] == t[0] + 1 and t[3] == 130,
          f"a hand that touches and lifts while the Pencil writes undoes nothing and does not end the Pencil's stroke ({t})")
    # the eraser removes a snapped line touched in its middle, far from both ends
    r = page.evaluate(PEN, [wobbly(30, 790, xr, 810), 700, [], None]); mx, my = (r['p'][0] + r['p'][2]) / 2, (r['p'][1] + r['p'][3]) / 2
    n0 = page.evaluate("(INK.data.parts.work || []).length")
    page.evaluate(PEN, [[[mx, my - 4], [mx, my], [mx, my + 4]], 0, [], 'erase'])
    n1 = page.evaluate("(INK.data.parts.work || []).length")
    check(r['n'] == 2 and n1 == n0 - 1, f'the eraser removes a straight line touched in its middle ({n0} → {n1})')
    # nothing on the page is selected or opens a menu
    sel = page.evaluate("""(() => { const q = document.querySelector('#ink .wsq'), c = document.querySelector('#ink .wspart[data-ink="work"] > canvas.inkcv');
        const fire = (el, type) => { const e = new Event(type, {bubbles: true, cancelable: true}); el.dispatchEvent(e); return e.defaultPrevented; };
        return [getComputedStyle(q).userSelect, fire(q, 'selectstart'), fire(q, 'contextmenu'), fire(c, 'touchstart')]; })()""")
    check(sel == ['none', True, True, True], f'the page cannot be selected, a long press opens no menu, and a touch on the canvas starts no browser gesture ({sel})')
    page.click('#ink [data-inkdone]')
    check(not errs, f'no page or console errors at {width} px', '; '.join(errs[:3]))
    page.close()


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        run(browser, 820, 1180)
        run(browser, 390, 844)
        scratch(browser, 820, 1180)
        scratch(browser, 390, 844)
        snaps(browser, 820, 1180)
        snaps(browser, 390, 844)
        browser.close()
    print(f'\n{len(fails)} failure(s)' if fails else '\nall writing checks passed')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
