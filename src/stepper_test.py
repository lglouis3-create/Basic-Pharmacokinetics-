#!/usr/bin/env python3
"""Step-through figures: every step settles cleanly, and figure text stays readable.

For each figure in STEPFIGS, drawn on the Diagrams tab:
  - after Replay, every Next, and a burst of rapid clicks ending on a dot,
    exactly one step is shown, the active dot and caption match it, no
    fade-out copy is left behind and no inline transform is left on a shape;
  - between consecutive steps no shape both fades out and fades back in
    (a shape in both steps stays where it is or glides);
  - in every step of every step-through figure, and in every drawn figure,
    no text runs outside its SVG and no two text labels overlap.

    python3 stepper_test.py
"""
import pathlib
import sys

from playwright.sync_api import sync_playwright

from browser_test import course_output

fails = []


def check(ok, label, detail=''):
    print(('  ok    ' if ok else '  FAIL  ') + label + (f'  — {detail}' if detail and not ok else ''))
    if not ok:
        fails.append(label)


SETTLE = """(key) => {
  const bad = [], fig = document.querySelector(`#v-diag [data-stepfig="${key}"]`);
  const on = fig.querySelectorAll('.st.on');
  if (on.length !== 1) bad.push('steps shown: ' + on.length);
  const i = [...fig.querySelectorAll('.st')].indexOf(on[0]);
  const d = [...fig.querySelectorAll('.sdot')].findIndex(x => x.classList.contains('on'));
  const c = [...fig.querySelectorAll('.stcap')].findIndex(x => x.classList.contains('on'));
  if (i !== d) bad.push('dot ' + d + ' vs step ' + i);
  if (i !== c) bad.push('caption ' + c + ' vs step ' + i);
  if (fig.querySelector('.st-out')) bad.push('fade-out copy left behind');
  if (on[0]) on[0].querySelectorAll('*').forEach(el => { if (el.style.transform) bad.push('leftover transform'); });
  return [...new Set(bad)];
}"""

REFADE = """(key) => {
  const fig = document.querySelector(`#v-diag [data-stepfig="${key}"]`);
  const g = fig.querySelector('.st-out'); if (!g) return 0;
  const on = fig.querySelector('.st.on'), sel = 'text,circle,rect,ellipse,line,polyline,polygon,path';
  const sig = el => el.getAttribute('data-k') || [el.tagName, (el.getAttribute('class') || '').replace(/\\b(fadein|glide)\\b/g, '').trim(),
    el.tagName === 'text' ? el.textContent : (el.getAttribute('fill') || '')].join('|');
  const gs = {}; g.querySelectorAll(sel).forEach(e => { const s = sig(e); gs[s] = (gs[s] || 0) + 1; });
  let n = 0; on.querySelectorAll('.fadein').forEach(e => { const s = sig(e); if (gs[s]) { n++; gs[s]--; } });
  return n;
}"""

# Text boxes of the visible SVG text in one figure root: outside the SVG, or
# overlapping another label by more than a sliver (2 px each way).
TEXTSCAN = """(root) => {
  const out = [];
  root.querySelectorAll('svg').forEach(svg => {
    const sb = svg.getBoundingClientRect();
    const ts = [...svg.querySelectorAll('text')].filter(t => t.closest('.st') ? t.closest('.st').classList.contains('on') : !t.closest('.st-out'))
      .map(t => ({t: t.textContent.trim(), r: t.getBoundingClientRect()})).filter(x => x.t && x.r.width);
    ts.forEach(x => { if (x.r.left < sb.left - 1 || x.r.right > sb.right + 1 || x.r.top < sb.top - 1 || x.r.bottom > sb.bottom + 1) out.push('outside: ' + x.t); });
    for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) {
      const a = ts[i].r, b = ts[j].r;
      const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (w > 2 && h > 2) out.push('overlap: "' + ts[i].t + '" / "' + ts[j].t + '"');
    }
  });
  return out;
}"""


def main():
    path = pathlib.Path(course_output()).resolve()
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={'width': 1000, 'height': 1000})
        errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.add_init_script("window.prompt = () => 'StepTest'")
        page.goto(path.as_uri())
        page.wait_for_timeout(800)
        page.evaluate("show('diag')")
        keys = page.evaluate('Object.keys(STEPFIGS)')
        print(f'\n=== Step-through figures ({len(keys)}) ===')
        check(len(keys) > 0, 'step-through figures present')
        for k in keys:
            fig = f'#v-diag [data-stepfig="{k}"]'
            n = page.evaluate(f"document.querySelectorAll('{fig} .st').length")
            page.locator(fig).scroll_into_view_if_needed()
            page.click(f'{fig} [data-go="replay"]'); page.wait_for_timeout(700)
            bad = page.evaluate(SETTLE, k)
            check(not bad, f'{k}: replay settles', '; '.join(bad))
            refaded = 0
            for i in range(n):
                page.click(f'{fig} [data-go="1"]')
                refaded += page.evaluate(REFADE, k)
                page.wait_for_timeout(1000)
                bad = page.evaluate(SETTLE, k)
                check(not bad, f'{k}: step {(i + 1) % n + 1} of {n} settles', '; '.join(bad))
                over = page.evaluate(TEXTSCAN, page.query_selector(fig))
                check(not over, f'{k}: step {(i + 1) % n + 1} labels inside the figure, none overlapping', '; '.join(over[:4]))
            check(refaded == 0, f'{k}: no shape fades out and back in between steps', f'{refaded} shapes')
            for i in range(7):
                page.click(f'{fig} [data-go="{1 if i % 3 else -1}"]'); page.wait_for_timeout(40)
            page.click(f'{fig} [data-go="dot"][data-i="{n - 1}"]'); page.wait_for_timeout(1100)
            bad = page.evaluate(SETTLE, k)
            check(not bad, f'{k}: settles after rapid clicks', '; '.join(bad))
            page.click(f'{fig} [data-go="play"]'); page.wait_for_timeout(300)
            label = page.inner_text(f'{fig} [data-go="play"]')
            check('Pause' in label, f'{k}: Play all starts and offers Pause')
            page.click(f'{fig} [data-go="play"]'); page.wait_for_timeout(100)
            check('Play all' in page.inner_text(f'{fig} [data-go="play"]'), f'{k}: Pause stops it')

        print('\n=== Drawn figures: text inside, no overlap ===')
        # every drawn figure, inlined so its text can be measured
        keys = page.evaluate("Object.keys(FIG_TITLES)")
        bad_all = []
        for k in keys:
            over = page.evaluate("""(k) => { const s = atob(IMAGES[k].split(',')[1]);
                const d = document.createElement('div'); d.id = 'scan'; d.style.width = '720px';
                d.innerHTML = new TextDecoder().decode(Uint8Array.from(s, c => c.charCodeAt(0)));
                document.body.appendChild(d); return k; }""", k)
            res = page.evaluate(TEXTSCAN, page.query_selector('#scan'))
            page.evaluate("document.getElementById('scan').remove()")
            if res:
                bad_all.append(f'{k}: ' + '; '.join(res[:3]))
        check(not bad_all, f'{len(keys)} drawn figures: labels inside, none overlapping', ' | '.join(bad_all))
        missing = page.evaluate("""() => { const on = new Set(DIAGRAMS.flatMap(g => g.figs.map(d => d.key)));
            const bad = [...Object.keys(FIG_TITLES), ...Object.keys(STEPFIGS)].filter(k => !on.has(k));
            DIAGRAMS.forEach(g => g.figs.forEach(d => { if (!['axes','shape','eq','how','asks'].every(f => d[f])) bad.push(d.key + ' (walk-through incomplete)');
              if (!IMAGES[d.key] && !STEPFIGS[d.key]) bad.push(d.key + ' (no figure)'); }));
            return bad; }""")
        check(not missing, 'every drawn figure is on the Diagrams tab with a full walk-through', ', '.join(missing))
        check(not errs, 'no page errors', '; '.join(errs[:2]))
        b.close()
    print('\nStep-through test passed\n' if not fails else f'\n{len(fails)} STEP-THROUGH PROBLEMS\n')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
