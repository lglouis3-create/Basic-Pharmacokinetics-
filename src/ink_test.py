#!/usr/bin/env python3
"""Write on a worksheet: drive the writing layer in Chromium at iPad (820 px) and phone (390 px) widths.

Opens a worksheet with a calculation from the Worksheets tab and checks: the work areas are larger than in the PDF
(480 px for a calculation, 200 px for a short answer) and More room / Less room change them by 240 px; a stroke
drawn with the mouse lands in that problem's ink, is drawn on its canvas and saved; undo, redo, the eraser and
Clear page work; once a Pencil touches, a finger scrolls instead of writing; the writing and the room come back
after a reload; Save as PDF prints the worksheet alone with the ink on it; Show solutions opens the solutions;
the page never scrolls sideways and nothing logs an error.

    python3 ink_test.py
"""
import os, re, sys
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
    page.evaluate("Object.keys(localStorage).filter(k => k.includes(':ink')).forEach(k => localStorage.removeItem(k)); show('sheets')")
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
    page.reload(); page.wait_for_timeout(900); page.evaluate("show('sheets')"); page.wait_for_timeout(300)
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


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        run(browser, 820, 1180)
        run(browser, 390, 844)
        browser.close()
    print(f'\n{len(fails)} failure(s)' if fails else '\nall writing checks passed')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
