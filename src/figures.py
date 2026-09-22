#!/usr/bin/env python3
"""Draw the concentration-versus-time figures the graph questions ask about.

Why these are drawn rather than cropped from the decks. Every one of these
questions turns on what the axis is doing, and Dr. Mosley says so directly:
"you've got to pay attention to the axis" and "if you look at that scale and it
is not changing by a regular step but by a factor of 10, that tells you it is a
logarithmic scale". A crop of an annotated slide carries her handwriting, a
caption that often names the answer, and a raster axis that blurs when zoomed.
Drawing the curve puts the axis under this file's control, so a figure can show
a decade scale with no "log" label on it, exactly as she warns the exam will.

Where a curve uses numbers from one of her slides, the entry below says which
slide, and the question that carries the figure cites the same one.

Output. Each figure is an SVG data URL in images.json, keyed by name. SVG keeps
the file small and stays sharp on a phone; the drill embeds it like any other
figure with {{fig:key|caption}} or a question's img/teachImg field.

    python3 figures.py            # rewrite images.json
    python3 figures.py --dir out  # also write each figure as a .svg to look at

Colours are the app's own accent and amber. The pair is the one validated for
colour-vision deficiency separation; nothing here uses more than two series.
"""
import argparse
import base64
import json
import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# Two series at most, so this validated pair is never extended.
BLUE = '#2F5FA8'
AMBER = '#B26B00'
INK = '#16202E'
DIM = '#5A6878'
GRID = '#E7ECF1'
AXIS = '#C3CCD8'

W, H = 720, 430
L, R, T, B = 86, 26, 22, 66          # margins
PW, PH = W - L - R, H - T - B


def esc(s):
    return (str(s).replace('&', '&amp;').replace('<', '&lt;')
            .replace('>', '&gt;').replace('"', '&quot;'))


class Plot:
    """A single panel with linear x and either a linear or a decade y axis."""

    def __init__(self, xmax, yticks, log=False, xlabel='Time (hours)',
                 ylabel='Plasma drug concentration', xticks=None):
        self.xmax, self.log, self.yticks = xmax, log, yticks
        self.xlabel, self.ylabel = xlabel, ylabel
        self.xticks = xticks if xticks is not None else yticks and None
        self.ymin, self.ymax = min(yticks), max(yticks)
        self.parts = []

    def px(self, x):
        return L + PW * x / self.xmax

    def py(self, y):
        if self.log:
            y = max(y, self.ymin)
            lo, hi = math.log10(self.ymin), math.log10(self.ymax)
            f = (math.log10(y) - lo) / (hi - lo)
        else:
            f = (y - self.ymin) / (self.ymax - self.ymin)
        return T + PH * (1 - f)

    def frame(self, xticks):
        p = []
        for y in self.yticks:                      # recessive horizontal grid
            yy = self.py(y)
            p.append(f'<line x1="{L}" y1="{yy:.1f}" x2="{L+PW}" y2="{yy:.1f}" '
                     f'stroke="{GRID}" stroke-width="1"/>')
            lab = ('%g' % y)
            p.append(f'<text x="{L-11}" y="{yy+4:.1f}" text-anchor="end" '
                     f'font-size="13" fill="{DIM}">{lab}</text>')
        for x in xticks:
            xx = self.px(x)
            p.append(f'<line x1="{xx:.1f}" y1="{T+PH}" x2="{xx:.1f}" y2="{T+PH+6}" '
                     f'stroke="{AXIS}" stroke-width="1"/>')
            p.append(f'<text x="{xx:.1f}" y="{T+PH+24}" text-anchor="middle" '
                     f'font-size="13" fill="{DIM}">{"%g" % x}</text>')
        p.append(f'<line x1="{L}" y1="{T}" x2="{L}" y2="{T+PH}" stroke="{AXIS}" stroke-width="1.5"/>')
        p.append(f'<line x1="{L}" y1="{T+PH}" x2="{L+PW}" y2="{T+PH}" stroke="{AXIS}" stroke-width="1.5"/>')
        p.append(f'<text x="{L+PW/2:.0f}" y="{H-14}" text-anchor="middle" '
                 f'font-size="14" fill="{INK}">{esc(self.xlabel)}</text>')
        p.append(f'<text x="18" y="{T+PH/2:.0f}" text-anchor="middle" font-size="14" '
                 f'fill="{INK}" transform="rotate(-90 18 {T+PH/2:.0f})">{esc(self.ylabel)}</text>')
        self.parts = p + self.parts
        return self

    def curve(self, fn, color=BLUE, dash=None, n=260, x0=0.0):
        pts = []
        for i in range(n + 1):
            x = x0 + (self.xmax - x0) * i / n
            y = fn(x)
            if self.log and y < self.ymin:
                continue
            pts.append(f'{self.px(x):.1f},{self.py(y):.1f}')
        d = f' stroke-dasharray="{dash}"' if dash else ''
        self.parts.append(f'<polyline points="{" ".join(pts)}" fill="none" '
                          f'stroke="{color}" stroke-width="2" stroke-linecap="round"'
                          f' stroke-linejoin="round"{d}/>')
        return self

    def points(self, xs, ys, color=BLUE):
        for x, y in zip(xs, ys):
            # a 2px surface ring keeps a marker legible where it sits on the line
            self.parts.append(f'<circle cx="{self.px(x):.1f}" cy="{self.py(y):.1f}" r="5" '
                              f'fill="{color}" stroke="#FFFFFF" stroke-width="2"/>')
        return self

    def hline(self, y, color=DIM, dash='5 4'):
        yy = self.py(y)
        self.parts.append(f'<line x1="{L}" y1="{yy:.1f}" x2="{L+PW}" y2="{yy:.1f}" '
                          f'stroke="{color}" stroke-width="1.5" stroke-dasharray="{dash}"/>')
        return self

    def vline(self, x, y, color=DIM, dash='5 4'):
        xx = self.px(x)
        self.parts.append(f'<line x1="{xx:.1f}" y1="{self.py(y):.1f}" x2="{xx:.1f}" '
                          f'y2="{T+PH}" stroke="{color}" stroke-width="1.5" stroke-dasharray="{dash}"/>')
        return self

    def label(self, x, y, text, color=None, anchor='start', dy=0, swatch=False):
        """Direct label. The text itself stays in ink; a short colour segment
        beside it carries the series identity, so nothing is colour-alone."""
        xx, yy = self.px(x), self.py(y) + dy
        tx = xx
        if swatch and color:
            self.parts.append(f'<line x1="{xx:.1f}" y1="{yy-4:.1f}" x2="{xx+18:.1f}" '
                              f'y2="{yy-4:.1f}" stroke="{color}" stroke-width="3" stroke-linecap="round"/>')
            tx = xx + 25
        self.parts.append(f'<text x="{tx:.1f}" y="{yy:.1f}" text-anchor="{anchor}" '
                          f'font-size="13.5" fill="{INK}">{esc(text)}</text>')
        return self

    def note(self, text):
        self.parts.append(f'<text x="{L}" y="{T-6}" font-size="12.5" fill="{DIM}">{esc(text)}</text>')
        return self

    def svg(self, title):
        body = '\n'.join(self.parts)
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
                f'width="{W}" height="{H}" role="img" aria-label="{esc(title)}">'
                f'<title>{esc(title)}</title>'
                f'<rect width="{W}" height="{H}" fill="#FFFFFF"/>\n{body}\n</svg>')


# --------------------------------------------------------------------------
# The figures.
# --------------------------------------------------------------------------
FIGS = {}


def fig(key, title, svg):
    FIGS[key] = (title, svg)


# ---- deciding the order from the shape of the line -----------------------
# A straight line on an evenly spaced concentration axis: a constant amount is
# lost per unit time. Zero order.
p = Plot(10, [0, 25, 50, 75, 100])
p.frame([0, 2, 4, 6, 8, 10]).curve(lambda t: 100 - 8 * t)
p.points([0, 2, 4, 6, 8, 10], [100 - 8 * t for t in (0, 2, 4, 6, 8, 10)])
fig('ord_linear_straight', 'Concentration against time on an evenly spaced axis, falling as a straight line',
    p.svg('Concentration against time, evenly spaced axis, straight declining line'))

# The same evenly spaced axis, a curve: the amount lost per unit time shrinks
# as concentration falls. First order.
p = Plot(10, [0, 25, 50, 75, 100])
p.frame([0, 2, 4, 6, 8, 10]).curve(lambda t: 100 * math.exp(-0.25 * t))
p.points([0, 2, 4, 6, 8, 10], [100 * math.exp(-0.25 * t) for t in (0, 2, 4, 6, 8, 10)])
fig('ord_linear_curve', 'Concentration against time on an evenly spaced axis, falling as a curve',
    p.svg('Concentration against time, evenly spaced axis, curved decline'))

# Her own semi-logarithmic slide, redrawn: the axis steps by a factor of ten and
# is not labelled "log". Introduction.pdf slide 21 supplies the points.
p = Plot(6, [1, 10, 100, 1000], log=True)
xs = [0, 1, 2, 3, 4, 5, 6]
ys = [200, 93, 44, 21, 10, 4.9, 2.3]
p.frame(xs).curve(lambda t: 200 * math.exp(-math.log(200 / 2.3) / 6 * t))
p.points(xs, ys)
fig('ord_semilog_straight', 'Concentration against time on an axis marked 1, 10, 100, 1000, falling as a straight line',
    p.svg('Semi-logarithmic concentration against time, straight line'))

# A constant amount lost per unit time, drawn on the same decade axis: it bends
# away downward and is not straight.
p = Plot(10, [1, 10, 100, 1000], log=True)
p.frame([0, 2, 4, 6, 8, 10]).curve(lambda t: max(300 - 29.9 * t, 1e-6))
fig('ord_semilog_curve', 'Concentration against time on an axis marked 1, 10, 100, 1000, bending downward',
    p.svg('Semi-logarithmic concentration against time, curve bending down'))

# ---- one compartment against two ----------------------------------------
p = Plot(12, [1, 10, 100], log=True)
p.frame([0, 2, 4, 6, 8, 10, 12]).curve(lambda t: 80 * math.exp(-0.25 * t))
fig('cpt_one', 'Semi-logarithmic plot after an intravenous bolus: one straight line',
    p.svg('Semi-logarithmic plot after IV bolus showing a single straight line'))

# Her recap slide's own biexponential, C = 15e^-3.4t + 7e^-0.12t, redrawn, with
# the terminal line extrapolated back so the two phases are visible.
p = Plot(12, [1, 10, 100], log=True)
p.frame([0, 2, 4, 6, 8, 10, 12])
p.curve(lambda t: 7 * math.exp(-0.12 * t), color=AMBER, dash='6 5')
p.curve(lambda t: 15 * math.exp(-3.4 * t) + 7 * math.exp(-0.12 * t))
p.label(4.2, 26, 'measured concentration', color=BLUE, swatch=True)
p.label(4.2, 13, 'terminal line, extrapolated back', color=AMBER, swatch=True)
fig('cpt_two', 'Semi-logarithmic plot after an intravenous bolus: a steep early phase then a shallower straight phase',
    p.svg('Semi-logarithmic plot after IV bolus showing two phases'))

# ---- infusion ------------------------------------------------------------
p = Plot(40, [0, 5, 10, 15, 20, 25], xlabel='Time from the start of the infusion (hours)')
p.frame([0, 10, 20, 30, 40]).hline(20).curve(lambda t: 20 * (1 - math.exp(-0.1386 * t)))
p.label(21, 22.6, 'plateau')
fig('inf_css', 'Concentration during a constant-rate infusion, rising towards a plateau',
    p.svg('Concentration rising to a plateau during a constant rate infusion'))

# Two infusion rates of the same drug. The plateau doubles; the time taken to
# reach it does not move, because it is set by the half-life alone.
p = Plot(40, [0, 10, 20, 30, 40, 50], xlabel='Time from the start of the infusion (hours)')
p.frame([0, 10, 20, 30, 40])
p.curve(lambda t: 40 * (1 - math.exp(-0.1386 * t)), color=AMBER)
p.curve(lambda t: 20 * (1 - math.exp(-0.1386 * t)), color=BLUE)
p.hline(40, AMBER, '5 4'); p.hline(20, BLUE, '5 4')
p.label(20.5, 44, 'twice the rate', color=AMBER, swatch=True)
p.label(20.5, 24, 'the original rate', color=BLUE, swatch=True)
fig('inf_two_rates', 'Two infusion rates of the same drug, plotted together',
    p.svg('Two infusion rates, different plateaus reached at the same time'))

# ---- module 4: rate of elimination against concentration -----------------
p = Plot(20, [0, 10, 20, 30, 40],
         xlabel='Plasma drug concentration (mg/L)',
         ylabel='Rate of elimination (mg/hr)')
p.frame([0, 5, 10, 15, 20]).curve(lambda c: 2.0 * c)
p.points([2, 6, 10, 14, 18], [2.0 * c for c in (2, 6, 10, 14, 18)])
fig('elim_rate_linear', 'Rate of elimination plotted against plasma concentration: a straight line through the origin',
    p.svg('Rate of elimination against concentration, straight line through the origin'))

# The same axes, a drug whose elimination rate does not change with
# concentration: a horizontal line.
p = Plot(20, [0, 10, 20, 30, 40],
         xlabel='Plasma drug concentration (mg/L)',
         ylabel='Rate of elimination (mg/hr)')
p.frame([0, 5, 10, 15, 20]).curve(lambda c: 20.0)
p.points([2, 6, 10, 14, 18], [20.0] * 5)
fig('elim_rate_flat', 'Rate of elimination plotted against plasma concentration: a horizontal line',
    p.svg('Rate of elimination against concentration, horizontal line'))

# ---- module 5: a single oral dose ---------------------------------------
KA, K, F, D, V = 0.924, 0.231, 0.85, 500.0, 22.0


def oral(t):
    return F * D * KA / (V * (KA - K)) * (math.exp(-K * t) - math.exp(-KA * t))


TMAX = math.log(KA / K) / (KA - K)
CMAX = oral(TMAX)

p = Plot(24, [0, 5, 10, 15, 20])
p.frame([0, 4, 8, 12, 16, 20, 24]).curve(oral)
p.vline(TMAX, CMAX)
p.points([TMAX], [CMAX])
p.label(TMAX + 0.4, CMAX, 'peak', dy=-10)
fig('oral_peak', 'Concentration against time after a single oral dose, rising to a peak and then falling',
    p.svg('Concentration after a single oral dose, rising to a peak then falling'))

# The same oral curve on a decade axis: the tail straightens once absorption is
# over, and the slope of that straight tail is the elimination rate constant.
p = Plot(24, [0.1, 1, 10, 100], log=True)
p.frame([0, 4, 8, 12, 16, 20, 24]).curve(oral, x0=0.05)
fig('oral_semilog', 'Concentration after a single oral dose on an axis marked 0.1, 1, 10, 100',
    p.svg('Semi-logarithmic plot after a single oral dose'))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dir', help='also write each figure as a .svg file to look at')
    a = ap.parse_args()
    out = {}
    for key, (title, svg) in FIGS.items():
        b64 = base64.b64encode(svg.encode('utf-8')).decode('ascii')
        out[key] = 'data:image/svg+xml;base64,' + b64
        if a.dir:
            os.makedirs(a.dir, exist_ok=True)
            open(os.path.join(a.dir, key + '.svg'), 'w', encoding='utf-8').write(svg)
        print(f'  {key:24s} {len(svg)/1024:5.1f} KB svg   {title[:58]}')
    path = os.path.join(HERE, 'images.json')
    json.dump(out, open(path, 'w'), indent=0, sort_keys=True)
    total = sum(len(v) for v in out.values())
    print(f'\n{len(out)} figures -> {path}  ({total/1024:.1f} KB of data URL)')


if __name__ == '__main__':
    main()
