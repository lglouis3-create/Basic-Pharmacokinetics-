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
L, R, T, B = 96, 26, 22, 74          # margins (room for the larger axis text)
PW, PH = W - L - R, H - T - B


def esc(s):
    return (str(s).replace('&', '&amp;').replace('<', '&lt;')
            .replace('>', '&gt;').replace('"', '&quot;'))


class Plot:
    """A single panel with linear x and either a linear or a decade y axis."""

    def __init__(self, xmax, yticks, log=False, xlabel='Time (hours)',
                 ylabel='Plasma drug concentration', xticks=None,
                 w=W, h=H, l=L, r=R, t=T, b=B, fs=1.55, numbers=True):
        self.numbers = numbers            # False draws the shape with unnumbered axes
        self.xmax, self.log, self.yticks = xmax, log, yticks
        self.xlabel, self.ylabel = xlabel, ylabel
        self.xticks = xticks if xticks is not None else yticks and None
        self.ymin, self.ymax = min(yticks), max(yticks)
        self.W, self.H, self.L, self.R, self.T, self.B = w, h, l, r, t, b
        self.PW, self.PH = w - l - r, h - t - b
        self.fs = fs                      # type scale, so a tall figure reads on a phone
        self.parts = []

    def px(self, x):
        return self.L + self.PW * x / self.xmax

    def py(self, y):
        if self.log:
            y = max(y, self.ymin)
            lo, hi = math.log10(self.ymin), math.log10(self.ymax)
            f = (math.log10(y) - lo) / (hi - lo)
        else:
            f = (y - self.ymin) / (self.ymax - self.ymin)
        return self.T + self.PH * (1 - f)

    def frame(self, xticks):
        p = []
        for y in self.yticks:                      # recessive horizontal grid
            yy = self.py(y)
            p.append(f'<line x1="{self.L}" y1="{yy:.1f}" x2="{self.L+self.PW}" y2="{yy:.1f}" '
                     f'stroke="{GRID}" stroke-width="1"/>')
            lab = ('%g' % y)
            if self.numbers:
                p.append(f'<text x="{self.L-11}" y="{yy+4:.1f}" text-anchor="end" '
                         f'font-size="{13*self.fs:.1f}" fill="{DIM}">{lab}</text>')
        for x in xticks:
            xx = self.px(x)
            p.append(f'<line x1="{xx:.1f}" y1="{self.T+self.PH}" x2="{xx:.1f}" y2="{self.T+self.PH+6}" '
                     f'stroke="{AXIS}" stroke-width="1"/>')
            if self.numbers:
                p.append(f'<text x="{xx:.1f}" y="{self.T+self.PH+24}" text-anchor="middle" '
                         f'font-size="{13*self.fs:.1f}" fill="{DIM}">{"%g" % x}</text>')
        p.append(f'<line x1="{self.L}" y1="{self.T}" x2="{self.L}" y2="{self.T+self.PH}" stroke="{AXIS}" stroke-width="1.5"/>')
        p.append(f'<line x1="{self.L}" y1="{self.T+self.PH}" x2="{self.L+self.PW}" y2="{self.T+self.PH}" stroke="{AXIS}" stroke-width="1.5"/>')
        p.append(f'<text x="{self.L+self.PW/2:.0f}" y="{self.H-14}" text-anchor="middle" '
                 f'font-size="{14*min(self.fs, 1.35):.1f}" fill="{INK}">{esc(self.xlabel)}</text>')
        # axis titles stop growing at 1.35 so a long rotated title still fits the panel height
        p.append(f'<text x="18" y="{self.T+self.PH/2:.0f}" text-anchor="middle" font-size="{14*min(self.fs, 1.35):.1f}" '
                 f'fill="{INK}" transform="rotate(-90 18 {self.T+self.PH/2:.0f})">{esc(self.ylabel)}</text>')
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

    def band(self, upper, lower, x0, x1, fill, opacity=0.28, n=160):
        """Shade the region between two curves from x0 to x1: the area one curve
        has that the other does not."""
        xs = [x0 + (x1 - x0) * i / n for i in range(n + 1)]
        top = [f'{self.px(x):.1f},{self.py(upper(x)):.1f}' for x in xs]
        bot = [f'{self.px(x):.1f},{self.py(lower(x)):.1f}' for x in reversed(xs)]
        self.parts.append(f'<polygon points="{" ".join(top + bot)}" fill="{fill}" '
                          f'fill-opacity="{opacity}" stroke="none"/>')
        return self

    def xband(self, x0, x1, fill='#EEF2F6'):
        """A full-height band behind the curves, marking a stretch of time."""
        self.parts.insert(0, f'<rect x="{self.px(x0):.1f}" y="{self.T}" width="{self.px(x1)-self.px(x0):.1f}" '
                             f'height="{self.PH}" fill="{fill}"/>')
        return self

    def text(self, x, y, text, size=15, color=INK, anchor='start', weight='400', dy=0):
        """Free text at data coordinates, with a halo so it reads over lines."""
        self.parts.append(f'<text x="{self.px(x):.1f}" y="{self.py(y)+dy:.1f}" text-anchor="{anchor}" '
                          f'font-size="{size}" font-weight="{weight}" fill="{color}" stroke="#FFFFFF" '
                          f'stroke-width="4" paint-order="stroke">{esc(text)}</text>')
        return self

    def points(self, xs, ys, color=BLUE):
        for x, y in zip(xs, ys):
            # a 2px surface ring keeps a marker legible where it sits on the line
            self.parts.append(f'<circle cx="{self.px(x):.1f}" cy="{self.py(y):.1f}" r="5" '
                              f'fill="{color}" stroke="#FFFFFF" stroke-width="2"/>')
        return self

    def hline(self, y, color=DIM, dash='5 4'):
        yy = self.py(y)
        self.parts.append(f'<line x1="{self.L}" y1="{yy:.1f}" x2="{self.L+self.PW}" y2="{yy:.1f}" '
                          f'stroke="{color}" stroke-width="1.5" stroke-dasharray="{dash}"/>')
        return self

    def vline(self, x, y, color=DIM, dash='5 4'):
        xx = self.px(x)
        self.parts.append(f'<line x1="{xx:.1f}" y1="{self.py(y):.1f}" x2="{xx:.1f}" '
                          f'y2="{self.T+self.PH}" stroke="{color}" stroke-width="1.5" stroke-dasharray="{dash}"/>')
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
                          f'font-size="{13.5*self.fs:.1f}" fill="{INK}" stroke="#FFFFFF" '
                          f'stroke-width="4" paint-order="stroke">{esc(text)}</text>')
        return self

    def note(self, text):
        self.parts.append(f'<text x="{self.L}" y="{self.T-6}" font-size="{12.5*self.fs:.1f}" fill="{DIM}">{esc(text)}</text>')
        return self

    def svg(self, title):
        body = '\n'.join(self.parts)
        return (f'<svg xmlns="http://www.w3.org/2000/svg" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" viewBox="0 0 {self.W} {self.H}" '
                f'width="{self.W}" height="{self.H}" role="img" aria-label="{esc(title)}">'
                f'<title>{esc(title)}</title>'
                f'<rect width="{self.W}" height="{self.H}" fill="#FFFFFF"/>\n{body}\n</svg>')


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
p.frame([0, 2, 4, 6, 8, 10]).curve(lambda t: 300 - 28 * t)   # ends at 20, so the bend shows without running into the floor
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


# ---- what a rate constant is, against what a rate is ---------------------
# The amount in the body against time for two doses of the same drug. The
# dotted segment at a point is the slope there, which is the rate leaving at
# that moment. Doubling the dose doubles that rate and leaves the constant
# alone, and the proof sits on the figure: once the larger dose has decayed to
# the smaller one's starting amount, it is losing drug at the smaller one's
# starting rate.
KEL = 0.2
p = Plot(14, [0, 50, 100, 150, 200], xlabel='Time (hours)',
         ylabel='Amount of drug in the body (mg)', w=760, h=500, l=96, r=30, t=86, b=70, fs=1.2)
p.frame([0, 2, 4, 6, 8, 10, 12, 14])


def tangent(pl, a0, t0, color, span=2.6):
    """A segment carrying the slope the curve has at t0. Drawn forward only, so
    it never runs off the top of the panel at time zero."""
    a = a0 * math.exp(-KEL * t0)
    slope = -KEL * a
    x2, y2 = t0 + span, a + slope * span
    pl.parts.append(f'<line x1="{pl.px(t0):.1f}" y1="{pl.py(a):.1f}" x2="{pl.px(x2):.1f}" '
                    f'y2="{pl.py(y2):.1f}" stroke="{color}" stroke-width="2.5" '
                    f'stroke-linecap="round" stroke-dasharray="1 5"/>')
    pl.parts.append(f'<circle cx="{pl.px(t0):.1f}" cy="{pl.py(a):.1f}" r="6" fill="{color}" '
                    f'stroke="#FFFFFF" stroke-width="2"/>')


p.curve(lambda t: 200 * math.exp(-KEL * t), color=AMBER)
p.curve(lambda t: 100 * math.exp(-KEL * t), color=BLUE)
tangent(p, 200, 0, AMBER)
tangent(p, 200, math.log(2) / KEL, AMBER)
tangent(p, 100, 0, BLUE)
p.label(9.4, 62, '200 mg dose', color=AMBER, swatch=True)
p.label(9.4, 34, '100 mg dose', color=BLUE, swatch=True)
p.label(2.9, 176, '40 mg/hr leaving')
p.label(4.5, 108, '20 mg/hr leaving')
p.label(2.5, 74, '20 mg/hr leaving')
p.parts.append(f'<text x="96" y="30" font-size="17.5" font-weight="600" fill="{INK}">'
               f'The same drug at two doses</text>')
p.parts.append(f'<text x="96" y="52" font-size="15.5" fill="{DIM}">Each dotted segment is how fast '
               f'drug is leaving at that moment: the rate, in mg/hr.</text>')
p.parts.append(f'<text x="96" y="72" font-size="15.5" fill="{DIM}">At all three marked points '
               f'rate \u00f7 amount = 0.2 per hour. That unchanging ratio is k.</text>')
fig('rate_vs_constant', 'Amount in the body against time for two doses, with the rate of loss marked at three points',
    p.svg('Amount against time for two doses with the rate of loss marked at three points'))

# ---- what each constant does to the curve --------------------------------
# Three panels, each holding the unchanged drug as a faint reference, so one
# change is compared at a time rather than four curves at once.
FB, DB, VB, KAB, KB = 1.0, 100.0, 20.0, 1.0, 0.2


def oral_of(F, D, V, ka, k):
    pre = F * D * ka / (V * (ka - k))
    return (lambda t: pre * (math.exp(-k * t) - math.exp(-ka * t)),
            math.log(ka / k) / (ka - k), F * D / (V * k))


base_fn, base_tmax, base_auc = oral_of(FB, DB, VB, KAB, KB)
base_cmax = base_fn(base_tmax)
PANEL = [('Dose doubled, k\u2090 and k unchanged', (FB, 2 * DB, VB, KAB, KB),
          'Twice the drug, same two constants'),
         ('Absorption constant k\u2090 doubled', (FB, DB, VB, 2 * KAB, KB),
          'Drug goes in twice as fast, leaves at the same constant'),
         ('Elimination constant k doubled', (FB, DB, VB, KAB, 2 * KB),
          'Drug goes in at the same constant, leaves twice as fast')]
PH_, PW_ = 350, 760
parts = [f'<rect width="{PW_}" height="{PH_*3}" fill="#FFFFFF"/>']
for i, (title, args, caption) in enumerate(PANEL):
    fn, tmax, auc = oral_of(*args)
    cmax = fn(tmax)
    pan = Plot(12, [0, 2, 4, 6, 8], xlabel='Time (hours)', ylabel='Concentration (mg/L)',
               w=PW_, h=PH_, l=90, r=26, t=84, b=62, fs=1.25)
    pan.frame([0, 2, 4, 6, 8, 10, 12])
    pan.curve(base_fn, color=DIM, dash='5 5')          # the unchanged drug, recessive
    pan.curve(fn, color=BLUE)
    pan.vline(tmax, cmax)
    pan.points([tmax], [cmax])
    pan.label(7.0, 7.3, 'unchanged drug', color=DIM, swatch=True)
    pan.parts.append(f'<text x="90" y="26" font-size="18" font-weight="600" fill="{INK}">{esc(title)}</text>')
    pan.parts.append(f'<text x="90" y="46" font-size="15" fill="{DIM}">{esc(caption)}</text>')
    pan.parts.append(
        f'<text x="90" y="68" font-size="15" fill="{INK}">'
        f'C\u2098\u2090\u2093 {cmax:.1f} mg/L (was {base_cmax:.1f}) \u00b7 '
        f't\u2098\u2090\u2093 {tmax:.1f} hr (was {base_tmax:.1f}) \u00b7 '
        f'AUC {auc:g} (was {base_auc:g})</text>')
    inner = '\n'.join(pan.parts)
    parts.append(f'<g transform="translate(0,{i*PH_})">{inner}</g>')
body = '\n'.join(parts)
FIGS['ka_k_effects'] = (
    'Three panels: doubling the dose, doubling the absorption rate constant, and doubling the elimination rate constant',
    f'<svg xmlns="http://www.w3.org/2000/svg" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" viewBox="0 0 {PW_} {PH_*3}" width="{PW_}" '
    f'height="{PH_*3}" role="img" aria-label="Effect of dose, absorption rate constant and '
    f'elimination rate constant on the oral curve"><title>Effect of dose, ka and k on the oral '
    f'concentration curve</title>{body}</svg>')



def stack(key, title, panels, pw, ph):
    """Several Plot panels one above another in a single SVG, so a comparison
    reads top to bottom on a phone rather than as columns too narrow to read."""
    parts = [f'<rect width="{pw}" height="{ph*len(panels)}" fill="#FFFFFF"/>']
    for i, pan in enumerate(panels):
        parts.append(f'<g transform="translate(0,{i*ph})">' + '\n'.join(pan.parts) + '</g>')
    FIGS[key] = (title,
        f'<svg xmlns="http://www.w3.org/2000/svg" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" viewBox="0 0 {pw} {ph*len(panels)}" width="{pw}" '
        f'height="{ph*len(panels)}" role="img" aria-label="{esc(title)}"><title>{esc(title)}</title>'
        + '\n'.join(parts) + '</svg>')


def heading(pan, title, line, big=1.0):
    pan.parts.append(f'<text x="18" y="{30*big:.0f}" font-size="{21*big:.1f}" font-weight="600" fill="{INK}">{esc(title)}</text>')
    pan.parts.append(f'<text x="18" y="{58*big:.0f}" font-size="{17*big:.1f}" fill="{DIM}">{esc(line)}</text>')


# ---- raising k against raising ka, from the slide's own parameters ---------
# "Effect of ka and k on Cmax, tmax and AUC": dose 100 mg, VD 10 L, F taken as
# 1, and the constant that is not varied held at 0.1 hr-1 in each panel. These
# reproduce the slide's peaks (2.50 at 6.9 hr for k = 0.2; 6.69 at 4.0 hr for
# ka = 0.5). Every value printed below is computed from them here.
SD, SV, SFIX = 100.0, 10.0, 0.1
STYLES = [None, '9 6', '2 5']


def slide_curve(ka, k):
    fn, tmax, auc = oral_of(1.0, SD, SV, ka, k)
    return fn, tmax, fn(tmax), auc


def kk_panel(which):
    """Two curves, the constant at 0.2 and at 0.5 /hr, with the area between
    them shaded: area the raised curve loses, and for ka the area it gains
    before the curves cross. The AUC difference is the shaded area."""
    color = BLUE if which == 'k' else AMBER
    ymax = 3 if which == 'k' else 8
    pan = Plot(20, list(range(0, ymax + 1, 1 if which == 'k' else 2)),
               xlabel='Time (hours)', ylabel='Concentration (µg/mL)',
               w=600, h=500, l=82, r=24, t=112, b=66, fs=1.4)
    pan.frame([0, 4, 8, 12, 16, 20])
    lo = slide_curve(SFIX, 0.2) if which == 'k' else slide_curve(0.2, SFIX)
    hi = slide_curve(SFIX, 0.5) if which == 'k' else slide_curve(0.5, SFIX)
    base, raised = lo[0], hi[0]
    if which == 'k':
        pan.band(base, raised, 0.02, 20, DIM, 0.22)
        pan.text(11.0, 1.55, f'total lost: {lo[3] - hi[3]:.0f}', size=17, color=INK, weight='600')
    else:
        # where the faster-absorbed curve drops below the slower one
        lo_t, hi_t = 1.0, 19.0
        for _ in range(80):
            mid = (lo_t + hi_t) / 2
            (lo_t, hi_t) = (mid, hi_t) if raised(mid) > base(mid) else (lo_t, mid)
        cross = (lo_t + hi_t) / 2
        gained = sum((raised(x) - base(x)) * 0.001 for x in [i * 0.001 for i in range(1, int(cross * 1000))])
        pan.band(raised, base, 0.02, cross, AMBER, 0.30)
        pan.band(base, raised, cross, 20, DIM, 0.22)
        pan.text(2.2, 5.3, f'gained {gained:.1f}', size=15, weight='600')
        pan.text(12.6, 4.3, f'total lost later: {gained:.1f}', size=15, weight='600')
        pan.vline(cross, base(cross), color=DIM, dash='3 4')
        pan.text(cross, 0.35, f'cross at {cross:.1f} hr', size=14, color=DIM, anchor='middle')
    pan.curve(base, color=color, dash='9 6')
    pan.curve(raised, color=color)
    for fn, tmax, cmax, _ in (lo, hi):
        pan.points([tmax], [cmax], color=color)
    name = 'k' if which == 'k' else 'kₐ'
    pan.label(lo[1] + 0.4, lo[2], f'{name} 0.2', dy=-10)
    pan.label(hi[1] + 0.4, hi[2], f'{name} 0.5', dy=-10)
    if which == 'k':
        heading(pan, 'k raised 0.2 → 0.5 /hr (kₐ held at 0.1)',
                f'AUC {lo[3]:.0f} → {hi[3]:.0f}: the shaded area is lost.', big=1.1)
    else:
        heading(pan, 'kₐ raised 0.2 → 0.5 /hr (k held at 0.1)',
                f'AUC {lo[3]:.0f} → {hi[3]:.0f}: area gained early = area lost late.', big=1.1)
    return pan, (lo, hi)


kpan, KROWS = kk_panel('k')
apan, AROWS = kk_panel('ka')
stack('k_vs_ka', 'Raising k against raising ka, with the area each change gains or loses shaded', [kpan, apan], 600, 500)


# ---- flip-flop: one drug, two products, one set of axes -----------------
# A picture of a relationship, so the axes carry no numbers. Same k for both
# curves; only the release, and so ka, differs. On a log scale a first-order
# fall is a straight line, and the tail of each curve falls at the smaller of
# its two constants.
FK = 0.3
ir = lambda t: 1.2 * 10 / (1.2 - FK) * (math.exp(-FK * t) - math.exp(-1.2 * t))
er = lambda t: 0.1 * 10 / (0.1 - FK) * (math.exp(-FK * t) - math.exp(-0.1 * t))
ff = Plot(24, [0.01, 0.1, 1, 10], log=True, xlabel='Time', ylabel='Concentration (log scale)',
          w=600, h=560, l=60, r=24, t=112, b=46, fs=1.4, numbers=False)
ff.frame([0, 6, 12, 18, 24])
ff.xband(12, 24)
ff.text(18, 7.5, 'the tail', size=16, color=DIM, anchor='middle', weight='600')
ff.curve(ir, color=BLUE, x0=0.02)
ff.curve(er, color=AMBER, x0=0.02)
ff.text(1.3, ir(1.3), 'Immediate release', size=16, weight='600', dy=-12)
ff.text(2.4, er(2.4), 'Extended release', size=16, weight='600', dy=28)
ff.text(12.6, ir(16.5), 'steep: falls with k', size=16, color=BLUE, dy=-8)
ff.text(12.8, er(12.8), 'shallow: falls with kₐ', size=16, color=AMBER, dy=-14)
heading(ff, 'One drug, two products: same k', 'The tail falls at the smaller of kₐ and k.', big=1.1)
ff.parts.append(f'<text x="18" y="96" font-size="17" fill="{DIM}">'
                + esc('Immediate: kₐ > k, tail shows k.  Extended: kₐ < k, tail shows kₐ.') + '</text>')
FIGS['flipflop'] = ('One drug given as an immediate-release and an extended-release product: the tail of each curve',
                    ff.svg('Immediate against extended release: which constant sets the slope of the tail'))


# ---- the three input types -------------------------------------------------
def input_panel(fn, title, line, stop=None):
    pan = Plot(16, [0, 5, 10], xlabel='Time', ylabel='Concentration',
               w=600, h=320, l=60, r=24, t=92, b=42, fs=1.4, numbers=False)
    pan.frame([0, 4, 8, 12, 16])
    pan.curve(fn, color=BLUE)
    if stop is not None:
        pan.vline(stop, 10, color=DIM)
        pan.label(stop + 0.2, 9.2, 'release ends')
    heading(pan, title, line)
    return pan


K3, T3 = 0.3, 8.0
def zero_in(t):
    if t <= T3:
        return 8 * (1 - math.exp(-K3 * t))
    return 8 * (1 - math.exp(-K3 * T3)) * math.exp(-K3 * (t - T3))


stack('input_types', 'IV bolus, oral tablet and IV infusion, each with first-order elimination', [
    input_panel(lambda t: 10 * math.exp(-K3 * t), 'IV bolus',
                'Instantaneous in, first-order out: highest at time zero, then falls.'),
    input_panel(lambda t: 13.33 * (math.exp(-K3 * t) - math.exp(-1.2 * t)), 'Oral tablet or capsule',
                'First-order in, first-order out: rises to a peak, then falls.'),
    input_panel(zero_in, 'IV infusion or controlled-release product',
                'Zero-order in, first-order out: levels off.', stop=T3),
], 600, 320)

# ---- module 6: repeated IV bolus, her Example 1 -----------------------------
# 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Example 1":
# t1/2 4 hr, VD 25% of body weight, 10 mg/kg every 8 hours, so C0 = 10/0.25 =
# 40 mg/L. Six doses, then none. Each dose adds its own C0e^-kt on top of what
# is left of the ones before it, which is superposition drawn out. The values
# labelled are the ones she works on the Example 1 slides and in the 09-23
# lecture: 40 and 10 for the first dose, 53.3, 13.3 and 28.9 at steady state.
MK, MTAU, MC0, MN = 0.693 / 4, 8.0, 40.0, 6


def md_curve(t):
    return sum(MC0 * math.exp(-MK * (t - i * MTAU)) for i in range(MN) if t >= i * MTAU - 1e-9)


md = Plot(64, [0, 10, 20, 30, 40, 50, 60], xlabel='Time (hours)', ylabel='Concentration (mg/L)',
          w=720, h=520, l=76, r=24, t=96, b=62, fs=1.3)
md.frame([0, 8, 16, 24, 32, 40, 48, 56, 64])
md.xband(12, 20)
md.text(16, 58, '3 to 5 half-lives', size=14, color=DIM, anchor='middle')
md.hline(53.3, color=BLUE); md.hline(13.3, color=BLUE)
md.hline(33.3, color=DIM, dash='2 4'); md.hline(28.9, color=AMBER)
md.curve(lambda t: MC0 * math.exp(-MK * t), color=AMBER, dash='6 5', n=320)
md.curve(md_curve, color=BLUE, n=1400)
md.points([0, 8], [40.0, 10.0], color=AMBER)
md.text(0.9, 42.5, '40', size=14)
md.text(9.0, 7.0, '10', size=14)
md.text(63, 55.3, 'Cmax 53.3', size=14, anchor='end')
md.text(63, 35.3, 'midpoint 33.3', size=14, color=DIM, anchor='end')
md.text(63, 24.2, 'Cavg 28.9', size=14, color=AMBER, anchor='end')
md.text(63, 15.3, 'Cmin 13.3', size=14, anchor='end')
md.label(20, 4.5, 'the first dose alone', color=AMBER, swatch=True)
heading(md, 'Six doses of 10 mg/kg every 8 hours, then none',
        't\u00bd 4 hr, VD 0.25 L/kg, so each dose adds C0 = 40 mg/L.', big=1.0)
FIGS['md_bolus'] = ('Repeated IV bolus doses every 8 hours rising to a steady state between the same peak and trough',
                    md.svg('Repeated IV bolus: accumulation to steady state, then decline after the last dose'))


# ---- module 6, second lecture: two intermittent infusions, her Example 4 ----
# 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Example 4":
# 300 mg over 2 hours (R = 150 mg/hr), the second infusion starting 6 hours
# after the first started, k 0.15 hr-1, VD 15 L. Each infusion on its own is
# the Module 3 infusion curve, stopped at 2 hours and then declining. The
# plasma concentration is their sum. Values labelled are computed here from
# those inputs: 17.28 at the end of each infusion; at 12 hours 3.86 from the
# first, 9.48 from the second, 13.34 together.
IK, IR, IV = 0.15, 150.0, 15.0


def one_infusion(t, start, dur):
    if t < start:
        return 0.0
    if t <= start + dur:
        return IR / (IV * IK) * (1 - math.exp(-IK * (t - start)))
    end = IR / (IV * IK) * (1 - math.exp(-IK * dur))
    return end * math.exp(-IK * (t - start - dur))


inf1 = lambda t: one_infusion(t, 0.0, 2.0)
inf2 = lambda t: one_infusion(t, 6.0, 2.0)
both = lambda t: inf1(t) + inf2(t)

ti = Plot(14, [0, 5, 10, 15, 20, 25, 30], xlabel='Time (hours)', ylabel='Concentration (mg/L)',
          w=720, h=500, l=76, r=24, t=96, b=62, fs=1.3)
ti.frame([0, 2, 4, 6, 8, 10, 12, 14])
ti.xband(0, 2); ti.xband(6, 8)
ti.curve(inf1, color=AMBER, dash='6 5', n=700)
ti.curve(inf2, color=AMBER, dash='2 5', n=700)
ti.curve(both, color=BLUE, n=1400)
ti.vline(12, both(12))
ti.points([2, 8, 12], [inf1(2), both(8), both(12)], color=BLUE)
ti.text(2.2, inf1(2) + 1.4, '17.28', size=14)
ti.text(8.2, both(8) + 1.4, '%.2f' % both(8), size=14)
ti.text(12.2, both(12) + 1.4, '%.2f at 12 hr' % both(12), size=14)
ti.text(12.15, inf2(12) - 1.3, 'second: %.2f' % inf2(12), size=13, color=AMBER)
ti.text(12.15, inf1(12) - 1.3, 'first: %.2f' % inf1(12), size=13, color=AMBER)
ti.text(1.0, 1.0, 'infusion 1', size=13, color=DIM)
ti.text(6.1, 1.0, 'infusion 2', size=13, color=DIM)
ti.label(0.3, 28.6, 'plasma concentration, the sum', color=BLUE, swatch=True)
ti.label(0.3, 26.4, 'each infusion on its own', color=AMBER, swatch=True)
heading(ti, 'Two 2-hour infusions of 300 mg, starting at 0 and 6 hours',
        'k 0.15 hr\u207b\u00b9, VD 15 L. At 12 hr the first has declined 10 hr and the second 4 hr.', big=1.0)
FIGS['two_infusions'] = ('Two intermittent IV infusions: each curve on its own and their sum, read at 12 hours',
                         ti.svg('Two intermittent infusions added on a time line'))


# ---- step-through figures ----------------------------------------------------
# The same two Module 6 examples, drawn one stage at a time. Each step is a
# <g class="st"> group inside one inline SVG; the frame and heading sit outside
# the groups and never change. Every shape carries a data-k made from its own
# markup, so a shape present in two consecutive steps is recognised as the same
# shape and stays put while the new ones fade in. The captions are HTML under
# the figure, so they wrap on a phone. Every number in a caption is computed
# here from the slide's inputs, formatted to the places the bank prints.
STEPS = {}


def keyed(parts):
    import hashlib
    out = []
    for p in parts:
        k = hashlib.md5(p.encode('utf-8')).hexdigest()[:10]
        out.append(p.replace(' ', f' data-k="k{k}" ', 1) if p.startswith('<') else p)
    return out


def stepped(key, title, plot, steps, footer=''):
    """plot: a Plot already framed and headed. steps: [(tag, caption, draw)],
    where draw(plot) adds that step's shapes to plot.parts."""
    base = plot.parts[:]
    groups = []
    for i, (tag, cap, draw) in enumerate(steps):
        plot.parts = []
        draw(plot)
        groups.append(f'<g class="st{" on" if i == 0 else ""}" data-step="{i + 1}">' + '\n'.join(keyed(plot.parts)) + '</g>')
    plot.parts = base
    svg = plot.svg(title).replace('\n</svg>', '\n' + '\n'.join(groups) + '\n</svg>')
    STEPS[key] = {'title': title, 'svg': svg, 'steps': [{'tag': t, 'cap': c} for t, c, _ in steps], 'footer': footer}


# Example 1, dose by dose. Same inputs as md_bolus above.
R1 = math.exp(-MK * MTAU)
peaks = [MC0 * (1 - R1 ** n) / (1 - R1) for n in range(1, MN + 1)]


def seg(pl, a, b, fn=md_curve, color=BLUE, dash=None):
    pts = []
    for i in range(121):
        t = a + (b - a) * i / 120
        pts.append(f'{pl.px(t):.1f},{pl.py(fn(t)):.1f}')
    d = f' stroke-dasharray="{dash}"' if dash else ''
    pl.parts.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="{color}" stroke-width="2" '
                    f'stroke-linecap="round" stroke-linejoin="round"{d}/>')


def md_upto(pl, b):
    """One polyline per dosing interval, each starting with the vertical jump
    the dose makes (from what was left to the new peak), so consecutive
    intervals join into one curve rather than reading as separate lines."""
    for i in range(int(b // MTAU)):
        a0, b0 = i * MTAU, min((i + 1) * MTAU, b) - 1e-6
        pts = [] if i == 0 else [f'{pl.px(a0):.1f},{pl.py(md_curve(a0 - 1e-6)):.1f}']
        for j in range(121):
            t = a0 + 1e-6 + (b0 - a0 - 1e-6) * j / 120
            pts.append(f'{pl.px(t):.1f},{pl.py(md_curve(t)):.1f}')
        pl.parts.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="{BLUE}" stroke-width="2" '
                        f'stroke-linecap="round" stroke-linejoin="round"/>')


def md_s1(pl):
    md_upto(pl, 8); pl.points([0, 8], [MC0, md_curve(8 - 1e-6)], color=AMBER)
    pl.text(0.9, 42.5, '40', size=14); pl.text(9.0, 7.0, '10', size=14)


def md_s2(pl):
    md_s1(pl); md_upto(pl, 16); pl.points([8, 16], [peaks[1], md_curve(16 - 1e-6)])
    pl.text(9.0, peaks[1] + 2.5, '%.1f' % peaks[1], size=14)


def md_s3(pl):
    md_upto(pl, 48); pl.points([i * MTAU for i in range(MN)], peaks)


def md_s4(pl):
    md_s3(pl); pl.xband(12, 20)
    pl.text(16, 58, '3 to 5 half-lives', size=14, color=DIM, anchor='middle')
    pl.hline(53.3, color=BLUE); pl.hline(13.3, color=BLUE)
    pl.hline(33.3, color=DIM, dash='2 4'); pl.hline(28.9, color=AMBER)
    pl.text(63, 55.3, 'Cmax 53.3', size=14, anchor='end')
    pl.text(63, 35.3, 'midpoint 33.3', size=14, color=DIM, anchor='end')
    pl.text(63, 24.2, 'Cavg 28.9', size=14, color=AMBER, anchor='end')
    pl.text(63, 15.3, 'Cmin 13.3', size=14, anchor='end')


def md_s5(pl):
    md_s3(pl)
    pts = [f'{pl.px(48):.1f},{pl.py(md_curve(48 - 1e-6)):.1f}'] + \
          [f'{pl.px(48 + 16 * j / 120 + 1e-6):.1f},{pl.py(md_curve(48 + 16 * j / 120 + 1e-6)):.1f}' for j in range(121)]
    pl.parts.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="{BLUE}" stroke-width="2" '
                    f'stroke-linecap="round" stroke-linejoin="round"/>')
    pl.text(56, 8.0, 'no seventh dose', size=14, color=DIM, anchor='middle')


ms = Plot(64, [0, 10, 20, 30, 40, 50, 60], xlabel='Time (hours)', ylabel='Concentration (mg/L)',
          w=720, h=520, l=76, r=24, t=96, b=62, fs=1.3)
ms.frame([0, 8, 16, 24, 32, 40, 48, 56, 64])
heading(ms, 'Six doses of 10 mg/kg every 8 hours, then none',
        't½ 4 hr, VD 0.25 L/kg, so each dose adds C0 = 40 mg/L.', big=1.0)
# Each caption is a list of lines (joined with newlines): the drill shows one
# line at a time, and any division is written as a stacked fraction.
stepped('md_bolus_steps', 'Repeated IV bolus, dose by dose', ms, [
    ('dose 1', '\n'.join([
        'Dose 1, 10 mg/kg, arrives at time zero; the same dose follows every 8 hours. C0, the concentration one dose produces on its own, is the dose over the apparent volume of distribution, VD 0.25 L/kg: '
        'C0 = {{frac:10 mg/kg|0.25 L/kg}} = 40 mg/L.',
        'The half-life, the time for the concentration to fall by half, is 4 hr, so eight hours is two half-lives.',
        'So 40 mg/L halves to 20, then to %.0f mg/L just before dose 2.' % md_curve(8 - 1e-6)]), md_s1),
    ('dose 2', '\n'.join([
        'Dose 2 adds another 40 mg/L to the %.0f mg/L still present: %.0f + 40 = %.1f mg/L.' % (md_curve(8 - 1e-6), md_curve(8 - 1e-6), peaks[1]),
        'Over the next 8 hours that %.1f falls by two half-lives to %.1f mg/L by 16 hr.' % (peaks[1], md_curve(16 - 1e-6))]), md_s2),
    ('doses 3 to 6', '\n'.join([
        'Each dose adds 40 mg/L to a larger remainder, so each peak is higher than the last by a smaller amount.',
        'The peaks climb ' + ', '.join('%.1f' % p for p in peaks) + ' mg/L and stop climbing.']), md_s3),
    ('steady state', '\n'.join([
        'The climb is over within 3 to 5 half-lives, here 12 to 20 hours. This is steady state: each dose now replaces exactly what was lost.',
        'At steady state the curve repeats between the peak, Cmax 53.3 mg/L, and the trough, Cmin 13.3 mg/L: 53.3 halved twice over the two half-lives of the interval.',
        'The average over an interval is Cavg = {{frac:dose|VD × k × τ}} = {{frac:10 mg/kg|0.25 L/kg × 0.173 hr⁻¹ × 8 hr}} = 28.9 mg/L. k, the elimination rate constant, is {{frac:0.693|4 hr}} = 0.173 hr⁻¹; τ, the dosing interval, is 8 hr. Cavg sits below the midpoint of 33.3 mg/L, {{frac:53.3 + 13.3|2}}, because the curve spends more of each interval at the lower concentrations.']), md_s4),
    ('after the last dose', '\n'.join([
        'After the sixth dose no more drug comes in.',
        'The level falls by first-order elimination alone, halving every 4 hours.']), md_s5),
])


# Example 4, stage by stage. Same inputs as two_infusions above.
def ti_s1(pl):
    pl.xband(0, 2); seg(pl, 0, 2, inf1)
    pl.points([2], [inf1(2)]); pl.text(2.2, inf1(2) + 1.4, '%.2f' % inf1(2), size=14)
    pl.text(1.0, 1.0, 'infusion 1', size=13, color=DIM)


def ti_s2(pl):
    ti_s1(pl); seg(pl, 2, 6, inf1)
    pl.points([6], [inf1(6)]); pl.text(6.2, inf1(6) + 1.4, '%.2f' % inf1(6), size=14)


def ti_s3(pl):
    ti_s1(pl); seg(pl, 2, 6, inf1); pl.xband(6, 8)
    pl.text(6.1, 1.0, 'infusion 2', size=13, color=DIM)
    seg(pl, 6, 8, inf1, color=AMBER, dash='6 5'); seg(pl, 6, 8, inf2, color=AMBER, dash='2 5'); seg(pl, 6, 8, both)
    pl.points([8], [both(8)]); pl.text(8.2, both(8) + 1.4, '%.2f' % both(8), size=14)
    pl.label(0.3, 28.6, 'plasma concentration, the sum', color=BLUE, swatch=True)
    pl.label(0.3, 26.4, 'each infusion on its own', color=AMBER, swatch=True)


def ti_s4(pl):
    ti_s3(pl)
    seg(pl, 8, 14, inf1, color=AMBER, dash='6 5'); seg(pl, 8, 14, inf2, color=AMBER, dash='2 5'); seg(pl, 8, 14, both)
    pl.vline(12, both(12)); pl.points([12], [both(12)])
    pl.text(12.2, both(12) + 1.4, '%.2f at 12 hr' % both(12), size=14)
    pl.text(12.15, inf2(12) - 1.3, 'second: %.2f' % inf2(12), size=13, color=AMBER)
    pl.text(12.15, inf1(12) - 1.3, 'first: %.2f' % inf1(12), size=13, color=AMBER)


ts = Plot(14, [0, 5, 10, 15, 20, 25, 30], xlabel='Time (hours)', ylabel='Concentration (mg/L)',
          w=720, h=500, l=76, r=24, t=96, b=62, fs=1.3)
ts.frame([0, 2, 4, 6, 8, 10, 12, 14])
heading(ts, 'Two 2-hour infusions of 300 mg, starting at 0 and 6 hours',
        'k 0.15 hr⁻¹, VD 15 L, so R = 150 mg/hr.', big=1.0)
stepped('two_infusions_steps', 'Two intermittent IV infusions, stage by stage', ts, [
    ('infusion 1', '\n'.join([
        'From 0 to 2 hr the first infusion runs. Its rate R is the dose over the infusion time: R = {{frac:300 mg|2 hr}} = 150 mg/hr.',
        'While it runs, the level climbs as a single infusion does: C = {{frac:R|VD × k}}(1 − e^(−kt)). VD is the apparent volume of distribution, 15 L; k is the elimination rate constant, the fraction lost per hour, 0.15 hr⁻¹.',
        'With t = 2 hr, the end of the infusion, that gives {{frac:150|15 × 0.15}}(1 − e^(−0.3)) = %.2f mg/L.' % inf1(2)]), ti_s1),
    ('infusion 1 stops', '\n'.join([
        'With the infusion off, nothing comes in and the level falls by first-order elimination (a fixed fraction lost per hour) from %.2f mg/L.' % inf1(2),
        'At 6 hr, four hours after it stopped: %.2f × e^(−0.15 × 4) = %.2f × e^(−0.6) = %.2f mg/L.' % (inf1(2), inf1(2), inf1(6))]), ti_s2),
    ('infusion 2', '\n'.join([
        'The second infusion starts at 6 hr and builds exactly as the first did, to %.2f mg/L at 8 hr.' % inf2(8),
        'By 8 hr, six hours after it stopped, the leftover of dose 1 has fallen to 17.28 × e^(−0.15 × 6) = %.2f mg/L.' % inf1(8),
        'The plasma level at 8 hr is the sum of the two: %.2f + %.2f = %.2f mg/L.' % (inf2(8), inf1(8), both(8))]), ti_s3),
    ('read at 12 hr', '\n'.join([
        'At 12 hr dose 1 has been declining for 10 hr since it stopped and gives %.2f mg/L.' % inf1(12),
        'Dose 2 has been declining for 4 hr since it stopped and gives %.2f mg/L.' % inf2(12),
        'The plasma concentration is the sum: %.2f + %.2f = %.2f mg/L.' % (inf1(12), inf2(12), both(12))]), ti_s4),
])



# ---- her worked examples, one step-through per dosing model -----------------
# Every number below is either printed on her sheet or slide (named at each
# figure) or computed here from the inputs she printed.

def lines(*ls):
    return '\n'.join(ls)


# (1) One-compartment IV bolus: IV Bolus Practice 1 (her solutions sheet).
# 50 mg IV bolus; plasma concentrations at 0.5, 1, 1.5, 2, 2.5, 3 hr. Her
# answers: k 0.91 hr-1, t½ 0.76 hr, C0 3.89 mg/L (from the 2.5-hr point),
# VD 12.85 L, ClT 11.7 L/hr, 3.2 mg left at 3 hr, 99.9% gone at 7.6 hr.
B1T = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
B1C = [2.52, 1.59, 1.00, 0.64, 0.40, 0.25]
B1K = round(math.log(1.59 / 0.64) / 1.0, 4)          # 0.91
B1T12 = 0.693 / 0.91
B1C0 = 0.40 * math.exp(0.91 * 2.5)                   # 3.89
B1VD = 50 / 3.89
B1CL = 12.85 * 0.91
b1line = lambda t: 3.89 * math.exp(-0.91 * t)
bs = Plot(8, [0.1, 1, 10], log=True, xlabel='Time (hours)', ylabel='Concentration (mg/L, log scale)',
          w=720, h=520, l=76, r=24, t=96, b=62, fs=1.3)
bs.frame([0, 1, 2, 3, 4, 5, 6, 7, 8])
heading(bs, 'A 50 mg IV bolus: her six plasma concentrations',
        'Measured at 0.5 to 3 hours; the line and every value are worked from them.', big=1.0)


def b1_s1(pl):
    pl.points(B1T, B1C)
    for t, c in zip(B1T, B1C):
        pl.text(t + 0.12, c, '%.2f' % c, size=13, dy=4)
    pl.text(3.4, 3.0, 'the points fall on a straight line on a log axis', size=14, color=DIM)


def b1_s2(pl):
    b1_s1(pl)
    seg(pl, 1.0, 2.0, b1line, color=AMBER)
    pl.points([1.0, 2.0], [1.59, 0.64], color=AMBER)
    pl.text(2.15, 1.1, 'slope between 1 and 2 hr', size=13, color=AMBER)


def b1_s3(pl):
    b1_s2(pl)
    seg(pl, 0.0, 3.0, b1line, color=BLUE, dash='6 5')
    pl.points([0], [3.89], color=AMBER)
    pl.text(0.12, 3.89, 'C0 = 3.89', size=14, dy=-10)


def b1_s4(pl):
    b1_s3(pl)
    pl.text(4.6, 2.0, 'VD = 12.85 L', size=14)
    pl.text(4.6, 1.3, 'ClT = 11.7 L/hr', size=14)


def b1_s5(pl):
    b1_s3(pl)
    seg(pl, 3.0, 7.6, b1line, color=BLUE, dash='6 5')
    pl.vline(7.6, b1line(7.6)); pl.points([7.6], [b1line(7.6)])
    pl.text(5.1, 0.17, 'ten half-lives: 0.1% left', size=13, color=DIM)
    pl.points([3.0], [0.25], color=AMBER); pl.text(3.4, 0.55, '3 hr: 3.2 mg in the body', size=13)


stepped('bolus1_steps', 'One-compartment IV bolus, from her data to every answer', bs, [
    ('the data', lines(
        'A 50 mg dose was given by IV bolus, all at once into a vein. The six measured concentrations, 2.52, 1.59, 1.00, 0.64, 0.40 and 0.25 mg/L at 0.5, 1, 1.5, 2, 2.5 and 3 hr, are plotted on a log axis.',
        'They fall on a straight line, so the drug is eliminated by a first-order process (a fixed fraction leaves each hour). One compartment, the whole body treated as one evenly mixed space, describes it.'), b1_s1),
    ('the slope gives k', lines(
        'k, the elimination rate constant, is the slope of the log line. Between 1 and 2 hr: k = {{frac:ln 1.59 − ln 0.64|2 hr − 1 hr}} = %.2f hr⁻¹.' % B1K,
        'The half-life, the time for the concentration to halve: t½ = {{frac:0.693|%.2f hr⁻¹}} = %.2f hr.' % (B1K, B1T12)), b1_s2),
    ('back to time zero', lines(
        'C0 is the concentration the dose would give at time zero, before any elimination. It is read by extending the line back to t = 0.',
        'From her 2.5-hr point: C0 = 0.40 × e^(0.91 × 2.5) = %.2f mg/L.' % B1C0), b1_s3),
    ('volume and clearance', lines(
        'VD, the apparent volume of distribution, is the dose over C0: VD = {{frac:50 mg|3.89 mg/L}} = %.2f L.' % B1VD,
        'ClT, total body clearance, is the volume cleared of drug per hour: ClT = k × VD = 0.91 × 12.85 = %.1f L/hr.' % B1CL), b1_s4),
    ('how long it lasts', lines(
        'The amount in the body at 3 hr is the volume times the concentration: 12.85 L × 0.25 mg/L = %.1f mg.' % (12.85 * 0.25),
        'Each half-life removes half of what is left, so ten half-lives leave 0.1%%: 99.9%% is gone at 10 × 0.76 = %.1f hr.' % (10 * 0.76)), b1_s5),
], footer='IV-Bolus-Practice-1---Solutions.pdf')


# (2) IV infusion: her in-class IV Infusions set, parts 1, 3 and 4.
# t½ 5 hr (k 0.1386 hr-1), VD 16 L, target Css 20 mg/L, so R = 44.35 mg/hr.
# Part 3: 3-hour infusion ends at 6.8 mg/L; part 4: 4 hr later, 3.9 mg/L.
IK2, IV2, IR2 = 0.1386, 16.0, 44.35
ICSS = IR2 / (IK2 * IV2)
inf_on = lambda t: ICSS * (1 - math.exp(-IK2 * t))
inf_stop3 = lambda t: inf_on(3.0) * math.exp(-IK2 * (t - 3.0))
ins = Plot(30, [0, 5, 10, 15, 20, 25], xlabel='Time (hours)', ylabel='Concentration (mg/L)',
           w=720, h=520, l=76, r=24, t=96, b=62, fs=1.3)
ins.frame([0, 5, 10, 15, 20, 25, 30])
heading(ins, 'An infusion at 44.35 mg/hr: t½ 5 hr, VD 16 L',
        'Her in-class set: the rate that holds 20 mg/L, and what a 3-hour infusion leaves.', big=1.0)


def in_s1(pl):
    seg(pl, 0, 3, inf_on)
    pl.points([3], [inf_on(3)]); pl.text(3.3, inf_on(3), '%.1f at 3 hr' % inf_on(3), size=14, dy=-6)


def in_s2(pl):
    seg(pl, 0, 30, inf_on)
    pl.hline(ICSS, color=DIM); pl.text(0.4, ICSS + 0.8, 'Css = 20 mg/L', size=14, color=DIM)
    for n, t in ((1, 5), (3, 15), (5, 25)):
        pl.points([t], [inf_on(t)])
        pl.text(t + 0.4, inf_on(t) - 1.4, '%d t½: %.1f' % (n, inf_on(t)), size=13)


def in_s3(pl):
    in_s2(pl)
    seg(pl, 3, 14, inf_stop3, color=AMBER, dash='6 5')
    pl.points([3, 7], [inf_on(3), inf_stop3(7)], color=AMBER)
    pl.text(7.3, inf_stop3(7), '%.1f, 4 hr after stopping at 3 hr' % inf_stop3(7), size=13, color=AMBER, dy=6)


stepped('infusion_steps', 'IV infusion: the climb to steady state, and the fall when it stops', ins, [
    ('the infusion starts', lines(
        'Drug runs in at a constant rate, R = 44.35 mg/hr, chosen so the plateau will be 20 mg/L. A constant rate in is a zero-order input.',
        'Elimination is first order: a fixed fraction leaves each hour. The elimination rate constant is k = {{frac:0.693|t½}} = {{frac:0.693|5 hr}} = 0.1386 hr⁻¹, t½ being the half-life, the time for the level to fall by half. So the amount leaving per hour grows as the level grows.',
        'VD, the apparent volume of distribution, is 16 L. Three hours in: C = {{frac:R|VD × k}}(1 − e^(−kt)) = {{frac:44.35|16 × 0.1386}}(1 − e^(−0.1386 × 3)) = %.1f mg/L, her part 3.' % inf_on(3)), in_s1),
    ('the climb to steady state', lines(
        'Css, the steady-state concentration, is where rate in equals rate out: Css = {{frac:R|k × VD}} = {{frac:44.35|0.1386 × 16}} = %.0f mg/L.' % ICSS,
        'The climb is set by the half-life alone. After 1 half-life (5 hr) the level is half of Css, %.1f; after 3 half-lives (15 hr) 87.5%%, %.1f; after 5 half-lives (25 hr) 96.9%%, %.1f.' % (inf_on(5), inf_on(15), inf_on(25)),
        'A faster rate would raise the plateau, not shorten the climb.'), in_s2),
    ('if it stops at 3 hr', lines(
        'Her part 4: the infusion is switched off at 3 hr, at %.1f mg/L. Nothing comes in, so the level falls by first-order elimination alone.' % inf_on(3),
        'Four hours later: C = %.1f × e^(−0.1386 × 4) = %.1f mg/L.' % (inf_on(3), inf_stop3(7))), in_s3),
], footer='In-Class IV Infusions - Solutions.pdf, parts 1, 3 and 4')


# (3) Loading dose with an infusion: the same in-class set, parts 1 and 2.
# DL = Css × VD = 320 mg; at 3 hr the bolus part is 13.2 and the infusion
# part 6.8, which add to 20 mg/L, the steady-state level, from the start.
LDL = ICSS * IV2
ld_bolus = lambda t: (LDL / IV2) * math.exp(-IK2 * t)
ld_sum = lambda t: ld_bolus(t) + inf_on(t)
lds = Plot(24, [0, 5, 10, 15, 20, 25], xlabel='Time (hours)', ylabel='Concentration (mg/L)',
           w=720, h=520, l=76, r=24, t=96, b=62, fs=1.3)
lds.frame([0, 4, 8, 12, 16, 20, 24])
heading(lds, 'A 320 mg loading dose with the 44.35 mg/hr infusion',
        'Her in-class set, part 2: the two parts at 3 hours, and their sum.', big=1.0)


def ld_s1(pl):
    seg(pl, 0, 24, ld_bolus, color=AMBER, dash='6 5')
    pl.points([3], [ld_bolus(3)], color=AMBER); pl.text(3.3, ld_bolus(3), 'bolus part: %.1f at 3 hr' % ld_bolus(3), size=13, color=AMBER, dy=-6)


def ld_s2(pl):
    ld_s1(pl)
    seg(pl, 0, 24, inf_on, color=AMBER, dash='2 5')
    pl.points([3], [inf_on(3)], color=AMBER); pl.text(3.3, inf_on(3), 'infusion part: %.1f at 3 hr' % inf_on(3), size=13, color=AMBER, dy=12)


def ld_s3(pl):
    ld_s2(pl)
    seg(pl, 0, 24, ld_sum, color=BLUE)
    pl.points([3], [ld_sum(3)]); pl.text(3.3, ld_sum(3) + 0.6, 'sum: %.0f mg/L, flat from the start' % ld_sum(3), size=14)


def ld_s4(pl):
    seg(pl, 0, 24, ld_sum, color=BLUE)
    seg(pl, 0, 24, inf_on, color=AMBER, dash='2 5')
    pl.points([16.6], [inf_on(16.6)], color=AMBER)
    pl.text(10.0, inf_on(16.6) - 2.6, 'infusion alone: 90% of Css only at 16.6 hr', size=13, color=AMBER)


stepped('loading_steps', 'Loading dose with an infusion: why the level is flat from the start', lds, [
    ('the bolus part', lines(
        'DL, the loading dose, is the amount in the body at steady state, the plateau the infusion is set to hold. Css is the target steady-state concentration, 20 mg/L, and VD the apparent volume of distribution, 16 L. DL = Css × VD = 20 mg/L × 16 L = %.0f mg, her part 1.' % LDL,
        'On its own that bolus starts at {{frac:320 mg|16 L}} = 20 mg/L and falls by first-order elimination (a fixed fraction lost per hour). The elimination rate constant is k = {{frac:0.693|5 hr}} = 0.1386 hr⁻¹, the half-life being 5 hr: at 3 hr, 20 × e^(−0.1386 × 3) = %.1f mg/L.' % ld_bolus(3)), ld_s1),
    ('the infusion part', lines(
        'The infusion on its own, at the rate R = 44.35 mg/hr, climbs toward Css as {{frac:R|VD × k}}(1 − e^(−kt)). At 3 hr: {{frac:44.35|16 × 0.1386}}(1 − e^(−0.1386 × 3)) = %.1f mg/L.' % inf_on(3)), ld_s2),
    ('the sum', lines(
        'The two run at once, so the concentrations add: %.1f + %.1f = %.0f mg/L at 3 hr, her part 2.' % (ld_bolus(3), inf_on(3), ld_sum(3)),
        'What the bolus part loses each hour the infusion part gains, so the sum stays at Css from the first minute.'), ld_s3),
    ('without the loading dose', lines(
        'The infusion alone reaches 90%% of Css only when 1 − e^(−kt) = 0.9, at t = {{frac:ln 10|0.1386 hr⁻¹}} = %.1f hr.' % (math.log(10) / IK2),
        'The loading dose replaces that wait; it does not change the plateau, which the rate sets.'), ld_s4),
], footer='In-Class IV Infusions - Solutions.pdf, parts 1 and 2')


# (4) Single oral dose: her Example 1 (5---Pharmacokinetics-of-Oral-Absorption).
# 500 mg, F 0.85, VD 22 L, absorption t½ 45 min, elimination t½ 3 hr. Her
# answers: tmax 2 hr, Cmax 12.17 mg/L.
OF, OD, OV = 0.85, 500.0, 22.0
OKA, OK = 0.693 / 0.75, 0.693 / 3
OA = OF * OD * OKA / (OV * (OKA - OK))
oral1 = lambda t: OA * (math.exp(-OK * t) - math.exp(-OKA * t))
OTMAX = math.log(OKA / OK) / (OKA - OK)
OCMAX = oral1(OTMAX)
ors = Plot(12, [0, 5, 10, 15], xlabel='Time (hours)', ylabel='Concentration (mg/L)',
           w=720, h=520, l=76, r=24, t=96, b=62, fs=1.3)
ors.frame([0, 2, 4, 6, 8, 10, 12])
heading(ors, 'A single 500 mg oral dose: her Example 1',
        'F 0.85, VD 22 L, absorption t½ 45 min, elimination t½ 3 hr.', big=1.0)


def or_s1(pl):
    seg(pl, 0, OTMAX, oral1)
    pl.text(0.3, 9.0, 'absorption faster than elimination: the level rises', size=13, color=DIM)


def or_s2(pl):
    or_s1(pl)
    pl.points([OTMAX], [OCMAX]); pl.vline(OTMAX, OCMAX)
    pl.text(OTMAX + 0.25, OCMAX + 0.3, 'Cmax %.2f at tmax %.0f hr' % (OCMAX, OTMAX), size=14)


def or_s3(pl):
    or_s2(pl)
    seg(pl, OTMAX, 12, oral1)
    pl.points([8], [oral1(8)]); pl.text(8.3, oral1(8) + 0.4, '%.2f at 8 hr' % oral1(8), size=13)
    pl.text(6.0, 7.4, 'elimination faster than absorption: the level falls', size=13, color=DIM)


def or_s4(pl):
    seg(pl, 0, 12, oral1)
    seg(pl, 0, 12, lambda t: OA * math.exp(-OK * t), color=AMBER, dash='6 5')
    seg(pl, 0, 3.5, lambda t: OA * math.exp(-OKA * t), color=AMBER, dash='2 5')
    pl.text(0.2, 13.9, '25.76 e^(−kt), the elimination term', size=13, color=AMBER)
    pl.text(1.1, 1.0, '25.76 e^(−ka t), the absorption term', size=13, color=AMBER)
    pl.text(6.0, 11.0, 'the curve is the difference of the two', size=13, color=DIM)


stepped('oral_steps', 'A single oral dose, from her Example 1 to the peak and beyond', ors, [
    ('absorption wins', lines(
        'Only F = 0.85 of the 500 mg tablet reaches the blood. It enters by first-order absorption: a fixed fraction of what is still in the gut enters each hour. The absorption rate constant ka is 0.693 over the absorption half-life of 0.75 hr (45 min): ka = {{frac:0.693|0.75 hr}} = %.3f hr⁻¹.' % OKA,
        'It leaves by first-order elimination (a fixed fraction of what is in the body leaves each hour). The elimination rate constant k is 0.693 over the elimination half-life of 3 hr: k = {{frac:0.693|3 hr}} = %.3f hr⁻¹. Early on far more enters per hour than leaves, so the level rises.' % OK), or_s1),
    ('the peak', lines(
        'tmax, the time of the peak, depends on the two rate constants only: tmax = {{frac:ln(ka ÷ k)|ka − k}} = {{frac:ln 4|0.693}} = %.1f hr.' % OTMAX,
        'Cmax, the peak concentration, is the curve at tmax, with D0 the 500 mg dose and VD, the apparent volume of distribution, 22 L. Cmax = {{frac:F ka D0|VD (ka − k)}}(e^(−k tmax) − e^(−ka tmax)). With the numbers in: {{frac:0.85 × 0.924 × 500|22 × 0.693}}(e^(−0.231 × 2) − e^(−0.924 × 2)) = %.2f mg/L, her answer.' % OCMAX,
        'At the peak the rate of absorption equals the rate of elimination.'), or_s2),
    ('elimination wins', lines(
        'After tmax more leaves per hour than enters, so the level falls. At 8 hr: %.2f mg/L.' % oral1(8),
        'Once the absorption site is empty the fall is elimination alone, with the slope k.'), or_s3),
    ('the two terms behind the curve', lines(
        'The equation is a difference of two exponentials with the same front factor, {{frac:F ka D0|VD (ka − k)}} = %.2f mg/L.' % OA,
        'The elimination term, 25.76 e^(−kt), falls slowly; the absorption term, 25.76 e^(−ka t), falls fast. The curve is the first minus the second.',
        'The front factor is not C0 (the time-zero concentration an IV bolus of the same amount would give): no concentration on an oral curve is ever as high as it.'), or_s4),
], footer='5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Example 1"; transcript 09-21')


# (5) Multiple oral doses: her tetracycline Example 1 (6a---Multiple-Oral-Doses).
# 250 mg every 8 hr, F 0.75, VD 1.5 L/kg × 75 kg = 112.5 L, t½ 10 hr, ka 0.9.
# Her answers: first-dose tmax 3.1 hr, Cmax 1.35 mg/L; steady-state tmax 2.06
# hr; steady-state Cmax and Cmin from her inputs 3.39 and 2.44; Cavg 3.01.
MF, MD, MV, MKA, MK, MTAU2 = 0.75, 250.0, 112.5, 0.9, 0.693 / 10, 8.0
MA = MF * MD * MKA / (MV * (MKA - MK))
m_one = lambda t: MA * (math.exp(-MK * t) - math.exp(-MKA * t)) if t >= 0 else 0.0
m_tot = lambda t: sum(m_one(t - i * MTAU2) for i in range(10))
MT1 = math.log(MKA / MK) / (MKA - MK)
MTSS = math.log(MKA * (1 - math.exp(-MK * MTAU2)) / (MK * (1 - math.exp(-MKA * MTAU2)))) / (MKA - MK)
MACC = 1 / (1 - math.exp(-MK * MTAU2))
MCMAXSS = (MF * MD / MV) * MACC * math.exp(-MK * MTSS)
MCMINSS = (MKA * MF * MD / (MV * (MKA - MK))) * MACC * math.exp(-MK * MTAU2)
MCAVG = MF * MD / (MV * MK * MTAU2)
mos = Plot(80, [0, 1, 2, 3, 4], xlabel='Time (hours)', ylabel='Concentration (mg/L)',
           w=720, h=520, l=76, r=24, t=96, b=62, fs=1.3)
mos.frame([0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80])
heading(mos, '250 mg tetracycline every 8 hours: her Example 1',
        'F 0.75, VD 112.5 L, t½ 10 hr, ka 0.9 hr⁻¹.', big=1.0)


def mo_s1(pl):
    seg(pl, 0, 8, m_one)
    pl.points([MT1], [m_one(MT1)]); pl.text(MT1 + 0.6, m_one(MT1) + 0.12, 'dose 1: Cmax %.2f at %.1f hr' % (m_one(MT1), MT1), size=13)


def mo_s2(pl):
    mo_s1(pl)
    seg(pl, 8, 16, m_tot)
    seg(pl, 8, 16, lambda t: m_one(t), color=AMBER, dash='6 5')
    pl.text(16.6, 0.45, 'dose 2 on top of what is left', size=13, color=DIM)


def mo_s3(pl):
    seg(pl, 0, 72, m_tot)
    seg(pl, 0, 24, lambda t: m_one(t), color=AMBER, dash='6 5')
    pl.label(26, 0.45, 'the first dose alone', color=AMBER, swatch=True)
    pl.text(40, 3.75, 'peaks climb less each time', size=13, color=DIM)


def mo_s4(pl):
    mo_s3(pl)
    seg(pl, 72, 80, m_tot)
    pl.hline(MCMAXSS, color=BLUE); pl.hline(MCMINSS, color=BLUE); pl.hline(MCAVG, color=AMBER)
    pl.text(79, MCMAXSS + 0.12, 'Cmax∞ %.2f' % MCMAXSS, size=13, anchor='end')
    pl.text(79, MCAVG - 0.2, 'Cavg∞ %.2f' % MCAVG, size=13, anchor='end', color=AMBER)
    pl.text(79, MCMINSS - 0.2, 'Cmin∞ %.2f' % MCMINSS, size=13, anchor='end')


stepped('md_oral_steps', 'Multiple oral doses, dose by dose: her tetracycline example', mos, [
    ('dose 1', lines(
        'Each dose is 250 mg by mouth; F = 0.75 of it reaches the blood. VD, the apparent volume of distribution, is 1.5 L/kg × 75 kg = 112.5 L.',
        'The elimination half-life, the time for the level to fall by half, is 10 hr, so the elimination rate constant k = {{frac:0.693|10 hr}} = %.4f hr⁻¹. The absorption rate constant, the fraction of the unabsorbed dose entering the blood per hour, is ka = 0.9 hr⁻¹. So each dose on its own rises to a peak and falls, like a single oral dose.' % MK,
        'First-dose tmax, the time of the peak, = {{frac:ln(ka ÷ k)|ka − k}} = {{frac:ln(0.9 ÷ 0.0693)|0.9 − 0.0693}} = %.1f hr. Cmax, the peak concentration, = {{frac:F ka D0|VD (ka − k)}}(e^(−k tmax) − e^(−ka tmax)) = %.2f mg/L, her answers (D0 is the 250 mg dose).' % (MT1, m_one(MT1))), mo_s1),
    ('dose 2', lines(
        'Dose 2 at 8 hr adds its own curve on top of what is left of dose 1 (superposition: later doses do not change k, ka, F or VD).',
        'So the second peak is higher than the first, and the level just before dose 3 is higher than it was before dose 2.'), mo_s2),
    ('the climb', lines(
        'Every dose adds the same curve to a larger remainder. The half-life is 10 hr, so the climb is over within 3 to 5 half-lives, 30 to 50 hours.',
        'τ is the dosing interval, 8 hr. The accumulation factor {{frac:1|1 − e^(−kτ)}} = {{frac:1|1 − e^(−0.0693 × 8)}} = %.2f says how much higher the steady-state peak sits than the first-dose peak.' % MACC), mo_s3),
    ('steady state', lines(
        'At steady state (∞ marks it) the peak comes earlier in the interval. tmax∞ = {{frac:1|ka − k}} ln[{{frac:ka(1 − e^(−kτ))|k(1 − e^(−ka τ))}}] = %.2f hr after a dose, her answer, against %.1f hr for the first dose.' % (MTSS, MT1),
        'Cmax∞ = {{frac:F D0|VD}}({{frac:1|1 − e^(−kτ)}})e^(−k tmax∞) = %.2f mg/L. Cmin∞, at the end of the interval, = {{frac:ka F D0|VD (ka − k)}}({{frac:1|1 − e^(−kτ)}})e^(−kτ) = %.2f mg/L. Cavg∞ = {{frac:F D0|VD k τ}} = %.2f mg/L.' % (MCMAXSS, MCMINSS, MCAVG),
        'Her spoken values were about 3.3, 2.4 and 3; these are what her inputs give.'), mo_s4),
], footer='6a---Multiple-Oral-Doses.pdf, Example 1; transcript 09-28')


# (6) Two-compartment IV bolus: her theophylline practice slide.
# Cp = 12 e^(−5.8t) + 18 e^(−0.16t), mg/L and hours. Her answer at 3 hr:
# 11.14 mg/L; t½β 4.33 hr.
TA, TAL, TB, TBE = 12.0, 5.8, 18.0, 0.16
two_all = lambda t: TA * math.exp(-TAL * t) + TB * math.exp(-TBE * t)
two_b = lambda t: TB * math.exp(-TBE * t)
two_a = lambda t: TA * math.exp(-TAL * t)
tws = Plot(8, [1, 10, 100], log=True, xlabel='Time (hours)', ylabel='Concentration (mg/L, log scale)',
           w=720, h=520, l=76, r=24, t=96, b=62, fs=1.3)
tws.frame([0, 1, 2, 3, 4, 5, 6, 7, 8])
heading(tws, 'Theophylline after an IV bolus: her practice slide',
        'Cp = 12e^(−5.8t) + 18e^(−0.16t), in mg/L and hours, on a log axis.', big=1.0)


def tw_s1(pl):
    seg(pl, 0, 8, two_all)
    pl.points([0], [two_all(0)]); pl.text(0.15, 30, 'C0 = 12 + 18 = 30', size=14, dy=-8)
    pl.text(0.5, 60, 'steep at first, then one straight line', size=13, color=DIM)


def tw_s2(pl):
    tw_s1(pl)
    seg(pl, 0, 8, two_b, color=AMBER, dash='6 5')
    pl.points([0], [TB], color=AMBER); pl.text(0.15, TB, 'B = 18', size=14, color=AMBER, dy=14)
    pl.text(4.2, two_b(4.2), 'slope β = 0.16 hr⁻¹', size=13, color=AMBER, dy=-10)


def tw_s3(pl):
    tw_s2(pl)
    seg(pl, 0, 1.0, two_a, color=AMBER, dash='2 5')
    pl.points([0], [TA], color=AMBER); pl.text(0.15, TA, 'A = 12', size=14, color=AMBER, dy=14)
    pl.text(1.1, 2.5, 'residuals: curve minus the line, slope α = 5.8 hr⁻¹', size=13, color=AMBER)


def tw_s4(pl):
    seg(pl, 0, 8, two_all)
    seg(pl, 0, 8, two_b, color=AMBER, dash='6 5')
    pl.vline(3, two_all(3)); pl.points([3], [two_all(3)])
    pl.text(3.15, two_all(3), '%.2f at 3 hr' % two_all(3), size=14, dy=-8)


stepped('twocpt_steps', 'Two-compartment IV bolus: reading A, B, α and β off her theophylline curve', tws, [
    ('the curve', lines(
        'After the bolus the drug is all in the central compartment (the blood and the organs it reaches at once). It then moves into a tissue compartment and back, and leaves from the central one.',
        'On a log axis the curve is steep at first, while drug is still spreading into tissue, then becomes one straight line once the two compartments are in balance.',
        'The curve is Cp = 12e^(−5.8t) + 18e^(−0.16t), two exponential terms. C0, the concentration at time zero, is the sum of their two intercepts, the numbers in front: 12 + 18 = 30 mg/L.'), tw_s1),
    ('the terminal line', lines(
        'The straight part is the elimination phase, 18 e^(−0.16t). Extending it back to t = 0 gives the intercept B = 18 mg/L; its slope is β = 0.16 hr⁻¹.',
        'β sets the elimination half-life: t½β = {{frac:0.693|0.16 hr⁻¹}} = %.2f hr.' % (0.693 / TBE)), tw_s2),
    ('the residuals', lines(
        'Subtracting the terminal line from the early part of the curve leaves the distribution term, 12 e^(−5.8t): intercept A = 12 mg/L, slope α = 5.8 hr⁻¹.',
        'α is the larger constant, so this term is gone within an hour; that is why the early fall is steep.'), tw_s3),
    ('read at 3 hr', lines(
        'Put t = 3 into both terms: 12 × e^(−5.8 × 3) = %.4f, effectively nothing, and 18 × e^(−0.16 × 3) = %.2f.' % (two_a(3), two_b(3)),
        'Cp at 3 hr = %.2f mg/L, her answer. Only the β term is left by then.' % two_all(3)), tw_s4),
], footer='2IVBolusAdministration.pdf, slide "Practice" (theophylline)')


# ---- the eight dosing models, one panel each, on the same unnumbered axes ---
# Shapes only: the axes carry no numbers, so nothing here is a value from a
# slide. The same k is used in every panel so the curves differ only by how
# the drug goes in, which is the one thing that decides the model.
MK8 = 0.3          # elimination rate constant used in every panel
MA8 = 1.2          # absorption rate constant for the oral panels
MT8 = 16.0         # hours shown


def model_panel(title, line, draw, log=False, ymax=10.0):
    if log:
        pan = Plot(MT8, [0.1, 1, 10], log=True, xlabel='Time', ylabel='Concentration (log scale)',
                   w=600, h=320, l=60, r=24, t=92, b=42, fs=1.4, numbers=False)
    else:
        pan = Plot(MT8, [0, ymax / 2, ymax], xlabel='Time', ylabel='Concentration',
                   w=600, h=320, l=60, r=24, t=92, b=42, fs=1.4, numbers=False)
    pan.frame([0, 4, 8, 12, 16])
    draw(pan)
    heading(pan, title, line)
    return pan


def m8_bolus1(pan):
    pan.curve(lambda t: 10 * math.exp(-MK8 * t), color=BLUE)
    pan.text(0.3, 9.2, 'C0', size=15, color=BLUE)


def m8_bolus2(pan):
    pan.curve(lambda t: 7 * math.exp(-1.5 * t) + 3 * math.exp(-0.15 * t), color=BLUE, x0=0.0)
    pan.text(0.8, 5.2, 'steep: distribution', size=15, color=DIM)
    pan.text(8.0, 1.75, 'shallow: elimination', size=15, color=DIM)


def m8_infusion(pan):
    stop = 10.0
    css = 8.0
    pan.curve(lambda t: css * (1 - math.exp(-MK8 * t)) if t <= stop
              else css * (1 - math.exp(-MK8 * stop)) * math.exp(-MK8 * (t - stop)), color=BLUE)
    pan.hline(css, color=DIM)
    pan.text(0.4, 8.75, 'Css', size=15, color=DIM)
    pan.vline(stop, 10, color=DIM)
    pan.label(stop + 0.2, 9.2, 'infusion stops')


def m8_loading(pan):
    css = 8.0
    pan.curve(lambda t: css * (1 - math.exp(-MK8 * t)), color=AMBER, dash='6 5')
    pan.curve(lambda t: css, color=BLUE)
    pan.text(0.4, 8.75, 'Css from the start', size=15, color=BLUE)
    pan.label(6.0, 5.2, 'infusion alone', color=AMBER, swatch=True)


def m8_oral(pan):
    a = 10 * MA8 / (MA8 - MK8)
    fn = lambda t: a * (math.exp(-MK8 * t) - math.exp(-MA8 * t))
    tmax = math.log(MA8 / MK8) / (MA8 - MK8)
    pan.curve(fn, color=BLUE)
    pan.points([tmax], [fn(tmax)])
    pan.text(tmax + 0.4, fn(tmax) + 0.2, 'Cmax at tmax', size=15)


TAU8 = 4.0


def m8_mdbolus(pan):
    c0 = 4.0
    fn = lambda t: sum(c0 * math.exp(-MK8 * (t - i * TAU8)) for i in range(4) if t >= i * TAU8 - 1e-9)
    pan.curve(fn, color=BLUE, n=1200)
    pan.curve(lambda t: c0 * math.exp(-MK8 * t), color=AMBER, dash='6 5')
    pan.label(7.6, 0.75, 'the first dose alone', color=AMBER, swatch=True)
    pan.text(15.8, 8.6, 'peaks and troughs level off', size=15, color=DIM, anchor='end')


def m8_intermit(pan):
    dur, gap, r = 2.0, 6.0, 4.0

    def one(t, start):
        if t < start:
            return 0.0
        if t <= start + dur:
            return r / MK8 * (1 - math.exp(-MK8 * (t - start)))
        return r / MK8 * (1 - math.exp(-MK8 * dur)) * math.exp(-MK8 * (t - start - dur))
    pan.curve(lambda t: one(t, 0) + one(t, gap) + one(t, 2 * gap), color=BLUE, n=1200)
    pan.text(2.2, 7.4, 'rises while infusing', size=15, color=DIM)
    pan.text(4.2, 3.6, 'falls between', size=15, color=DIM)


def m8_mdoral(pan):
    a = 4 * MA8 / (MA8 - MK8)
    one = lambda t: a * (math.exp(-MK8 * t) - math.exp(-MA8 * t)) if t >= 0 else 0.0
    pan.curve(lambda t: sum(one(t - i * TAU8) for i in range(4)), color=BLUE, n=1200)
    pan.curve(lambda t: one(t), color=AMBER, dash='6 5')
    pan.label(9.0, 1.1, 'the first dose alone', color=AMBER, swatch=True)
    pan.text(15.8, 8.6, 'rounded peaks level off', size=15, color=DIM, anchor='end')


MODEL_PANELS = [
    ('model_bolus1', 'One-compartment IV bolus (Module 2)',
     'All in at once, first order out: highest at time zero, then falls.', m8_bolus1, False),
    ('model_bolus2', 'Two-compartment IV bolus (Module 2)',
     'Log axis: a steep early fall, then a shallower straight line.', m8_bolus2, True),
    ('model_infusion', 'IV infusion, one compartment (Module 3)',
     'Constant rate in, first order out: climbs to Css, falls once stopped.', m8_infusion, False),
    ('model_loading', 'Loading dose with an infusion (Module 3)',
     'The bolus supplies the steady-state amount: flat at Css.', m8_loading, False),
    ('model_oral', 'Single oral dose (Module 5)',
     'First order in, first order out: rises to Cmax at tmax, then falls.', m8_oral, False),
    ('model_mdbolus', 'Repeated IV bolus (Module 6)',
     'The same dose every τ: a saw-tooth climbing to a plateau.', m8_mdbolus, False),
    ('model_intermit', 'Intermittent IV infusion (Module 6)',
     'Each dose infused over a set time: a rise, a fall, then a higher rise.', m8_intermit, False),
    ('model_mdoral', 'Multiple oral doses (Module 6a)',
     'The oral curve every τ: rounded peaks climbing to a plateau.', m8_mdoral, False),
]
for _key, _title, _line, _draw, _log in MODEL_PANELS:
    _pan = model_panel(_title, _line, _draw, log=_log)
    FIGS[_key] = (_title + ': the shape of the curve', _pan.svg(_title))
stack('models_all', 'The eight dosing models on the same axes: how the drug goes in decides the shape',
      [model_panel(t, l, d, log=g) for _, t, l, d, g in MODEL_PANELS], 600, 320)



# ==========================================================================
# Explanatory figures (no lecture figure behind them: each draws arithmetic
# the course states, or a relation the textbook states, and says which).
# ==========================================================================

# ---- the half-life ladder: 0.5^n left, 1 - 0.5^n reached -------------------
# 0.5^n and 1 - 0.5^n are arithmetic. The 3.3, 4.32 and 6.6 half-life marks
# are the textbook's (Shargel 7e Chapter 9, printout pp. 7-8, citing Chapter
# 6 Table 6-1): 90%, 95% and 99% of steady state.
HL_W, HL_H = 720, 400
hl1 = Plot(10, [0, 25, 50, 75, 100], xlabel='Half-lives elapsed', ylabel='Percent of the dose left',
           w=HL_W, h=HL_H, l=90, r=26, t=84, b=66, fs=1.3)
hl1.frame(list(range(0, 11)))
heading(hl1, 'What is left after each half-life', 'Each half-life removes half of what remains: 100, 50, 25, 12.5 ...')
for n in range(0, 11):
    left = 100 * 0.5 ** n
    x0, x1 = hl1.px(n) - 11, hl1.px(n) + 11
    hl1.parts.append(f'<rect x="{x0:.1f}" y="{hl1.py(left):.1f}" width="22" height="{hl1.py(0)-hl1.py(left):.1f}" fill="{BLUE}" fill-opacity="0.85"/>')
    lab = ('%g' % left) if n <= 4 else ('%.1f' % left if n <= 6 else '%.2f' % left)
    if n <= 6 or n == 10:
        hl1.text(n, left, lab, size=13, anchor='middle', dy=-7)
hl1.text(7.2, 60, 'ten half-lives: 0.1% left', size=14, color=DIM)
hl2 = Plot(10, [0, 25, 50, 75, 100], xlabel='Half-lives elapsed', ylabel='Percent of steady state reached',
           w=HL_W, h=HL_H, l=90, r=26, t=84, b=66, fs=1.3)
hl2.frame(list(range(0, 11)))
heading(hl2, 'How close to the plateau after each half-life', 'The mirror image: 50, 75, 87.5, 93.75 ... percent of steady state')
hl2.curve(lambda n: 100 * (1 - 0.5 ** n), color=BLUE)
for n in range(1, 5):
    hl2.points([n], [100 * (1 - 0.5 ** n)])
    hl2.text(n, 100 * (1 - 0.5 ** n), '%g' % (100 * (1 - 0.5 ** n)), size=13, anchor='middle', dy=18)
for n, pct, anc, dy in ((3.3, 90, 'end', -10), (4.32, 95, 'start', 22), (6.6, 99, 'start', -8)):
    hl2.vline(n, pct, color=AMBER); hl2.points([n], [pct], color=AMBER)
    hl2.text(n + (0.12 if anc == 'start' else -0.12), pct, f'{pct}% at {n:g} half-lives', size=13, color=AMBER, anchor=anc, dy=dy)
stack('halflife_ladder', 'The half-life ladder: what is left after each half-life, and how close a regimen is to steady state',
      [hl1, hl2], HL_W, HL_H)

# ---- the accumulation factor against tau in half-lives ----------------------
# R = 1 / (1 - e^(-k tau)) = 1 / (1 - 0.5^(tau / t½)) (Shargel 7e Chapter 9
# printout p. 6, Equation 9.2); R = 2 when tau = t½ (p. 22, "dose ratio 2.0").
def accum(x):
    return 1 / (1 - 0.5 ** x)

af = Plot(4, [1, 2, 3, 4], xlabel='Dosing interval τ, in half-lives', ylabel='Accumulation factor R',
          w=720, h=460, l=90, r=26, t=84, b=66, fs=1.3, xticks=[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4])
af.frame([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4])
heading(af, 'How much a regimen accumulates', 'R depends only on how τ compares with the half-life, never on the dose')
af.curve(accum, x0=0.5)
for x in (0.5, 1, 2, 3, 4):
    af.points([x], [accum(x)], color=AMBER)
    if x == 4:
        af.text(x - 0.08, accum(x), 'R = %.2f' % accum(x), size=14, anchor='end', dy=-8)
    elif x == 3:
        af.text(x, accum(x), 'R = %.2f' % accum(x), size=14, anchor='middle', dy=-24)
    elif x == 1:
        af.text(x + 0.1, accum(x), 'R = %.2f' % accum(x), size=14, dy=20)
    else:
        af.text(x + 0.08, accum(x), 'R = %.2f' % accum(x), size=14, dy=-6 if x > 0.5 else 4)
af.hline(2, color=AMBER)
af.text(1.25, 2.0, 'τ = one half-life: R = 2, the plateau peak is twice the first', size=13, color=AMBER, dy=-10)
af.text(2.3, 1.62, 'a long τ accumulates little', size=13, color=DIM)
fig('accum_factor', 'The accumulation factor R against the dosing interval measured in half-lives', af.svg('Accumulation factor against dosing interval'))

# ---- the trapezoidal rule, strip by strip (her Introduction slide 25) ------
# Her points: 38.9, 30.3, 18.4, 11.1, 6.77, 4.10 mcg/mL at 0.5, 1, 2, 3, 4, 5 hr;
# asked for the AUC from 2 to 4 hr. Keyed 23.7 (question m1-auc-n01).
AUT = [0.5, 1, 2, 3, 4, 5]
AUC_ = [38.9, 30.3, 18.4, 11.1, 6.77, 4.10]
A23 = (18.4 + 11.1) / 2 * 1
A34 = (11.1 + 6.77) / 2 * 1
au = Plot(5.5, [0, 10, 20, 30, 40], xlabel='Time (hours)', ylabel='Plasma level (mcg/mL)',
          w=720, h=520, l=90, r=26, t=96, b=62, fs=1.3, xticks=[0, 1, 2, 3, 4, 5])
au.frame([0, 1, 2, 3, 4, 5])
heading(au, 'Area under the curve by the trapezoidal rule', 'Her six plasma levels; the AUC from 2 to 4 hours is asked')


def au_poly(pl, a, b, color):
    i, j = AUT.index(a), AUT.index(b)
    pts = [f'{pl.px(a):.1f},{pl.py(0):.1f}', f'{pl.px(a):.1f},{pl.py(AUC_[i]):.1f}',
           f'{pl.px(b):.1f},{pl.py(AUC_[j]):.1f}', f'{pl.px(b):.1f},{pl.py(0):.1f}']
    pl.parts.append(f'<polygon points="{" ".join(pts)}" fill="{color}" fill-opacity="0.3" stroke="{color}" stroke-width="1.5"/>')


def au_s1(pl):
    pts = ' '.join(f'{pl.px(t):.1f},{pl.py(c):.1f}' for t, c in zip(AUT, AUC_))
    pl.parts.append(f'<polyline points="{pts}" fill="none" stroke="{BLUE}" stroke-width="2"/>')
    pl.points(AUT, AUC_)
    for t, c in zip(AUT, AUC_):
        pl.text(t + 0.1, c, '%g' % c, size=13, dy=-6)


def au_s2(pl):
    au_s1(pl); pl.xband(2, 4)
    pl.text(2.1, 36, 'rows inside 2 to 4 hr: 18.4, 11.1, 6.77', size=13, color=DIM)


def au_s3(pl):
    au_s2(pl); au_poly(pl, 2, 3, AMBER)
    pl.text(2.5, 5, '%.2f' % A23, size=14, anchor='middle', weight='600')


def au_s4(pl):
    au_s3(pl); au_poly(pl, 3, 4, BLUE)
    pl.text(3.5, 3, '%.3f' % A34, size=14, anchor='middle', weight='600')


def au_s5(pl):
    au_s4(pl)
    pl.text(2.9, 26, 'AUC 2 to 4 hr = %.2f + %.3f = %.3f' % (A23, A34, A23 + A34), size=14, weight='600')
    pl.text(3.0, 21.5, 'reported as 23.7 mcg·hr/mL', size=14)


stepped('auc_steps', 'The trapezoidal rule on her data, one strip at a time', au, [
    ('the data', lines(
        'Six plasma levels are plotted against time and joined by straight lines.',
        'There is no equation for this curve, only the measured points, so the area is estimated from the points.'), au_s1),
    ('choose the rows', lines(
        'The question asks for the AUC from 2 to 4 hours, so only the rows at 2, 3 and 4 hours are used.',
        'The 0.5 and 1 hour rows are before the interval and the 5 hour row is after it; none of them enters the sum.'), au_s2),
    ('the first strip', lines(
        'Each strip is a trapezoid: its area is the average of its two heights times its width.',
        'From 2 to 3 hr: {{frac:18.4 + 11.1|2}} × 1 hr = %.2f mcg·hr/mL.' % A23), au_s3),
    ('the second strip', lines(
        'From 3 to 4 hr: {{frac:11.1 + 6.77|2}} × 1 hr = %.3f mcg·hr/mL.' % A34,
        'The width is read from the time column each time; here both strips are 1 hour wide.'), au_s4),
    ('add the strips', lines(
        'AUC from 2 to 4 hr = %.2f + %.3f = %.3f, reported as 23.7 mcg·hr/mL.' % (A23, A34, A23 + A34),
        'The unit is concentration times time: mcg/mL × hr = mcg·hr/mL.'), au_s5),
], footer='Introduction.pdf slide 25 (question m1-auc-n01)')


# ---- renal handling: filtration + secretion - reabsorption = excretion -----
# Her slides 12, 13, 18, 19 of 4---Clearance-and-Elimination.pdf (the three
# processes, 120 mL/min as the reference); Shargel 8e Chapter 15 printout
# p. 15 (only unbound drug is filtered; Equation 15.42; Table 15-2).
def box(parts, x, y, w, h, title, line, fill='#F3F6FA', stroke=AXIS):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>')
    parts.append(f'<text x="{x+w/2}" y="{y+30}" text-anchor="middle" font-size="19" font-weight="600" fill="{INK}">{esc(title)}</text>')
    for i, ln in enumerate(line.split('\n')):
        parts.append(f'<text x="{x+w/2}" y="{y+56+i*22}" text-anchor="middle" font-size="16" fill="{DIM}">{esc(ln)}</text>')


def arrow(parts, x1, y1, x2, y2, color=BLUE, label='', lx=None, ly=None):
    parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="3" marker-end="url(#ah)"/>')
    if label:
        parts.append(f'<text x="{lx}" y="{ly}" text-anchor="middle" font-size="15" font-weight="600" fill="{color}" '
                     f'stroke="#FFFFFF" stroke-width="4" paint-order="stroke">{esc(label)}</text>')


RW, RH = 720, 640
rp = [f'<rect width="{RW}" height="{RH}" fill="#FFFFFF"/>',
      f'<defs><marker id="ah" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">'
      f'<path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/></marker></defs>']
rp.append(f'<text x="18" y="32" font-size="21" font-weight="600" fill="{INK}">How the kidney handles a drug</text>')
rp.append(f'<text x="18" y="58" font-size="17" fill="{DIM}">Two processes put drug into the urine, one takes it back</text>')
box(rp, 24, 90, 160, 300, 'Blood', 'drug arrives in\nthe renal artery\n\nonly unbound\ndrug is filtered')
box(rp, 536, 90, 160, 300, 'Tubule', 'the fluid that\nbecomes urine')
arrow(rp, 184, 160, 536, 160, BLUE, 'Filtration (passive): unbound Cp × GFR', 360, 146)
arrow(rp, 184, 250, 536, 250, BLUE, 'Secretion (active, a transporter)', 360, 236)
arrow(rp, 536, 340, 184, 340, AMBER, 'Reabsorption (back to blood)', 360, 326)
arrow(rp, 616, 390, 616, 428, BLUE, '', 0, 0)
box(rp, 160, 432, 536, 100, 'Urine', 'excretion rate = filtration + secretion − reabsorption', fill='#FFF7E8', stroke=AMBER)
rp.append(f'<text x="24" y="572" font-size="16" font-weight="600" fill="{INK}">Renal clearance = excretion rate ÷ Cp, read against GFR, 120 mL/min</text>')
rp.append(f'<text x="24" y="600" font-size="14.5" fill="{DIM}">above 120: secretion adds · about 120: filtration alone · below 120: some reabsorbed</text>')
fig('renal_handling', 'The kidney: filtration and secretion move drug into the tubule, reabsorption takes it back, and the net rate is the excretion rate',
    f'<svg xmlns="http://www.w3.org/2000/svg" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" viewBox="0 0 {RW} {RH}" width="{RW}" height="{RH}" role="img" '
    f'aria-label="How the kidney handles a drug"><title>How the kidney handles a drug</title>' + '\n'.join(rp) + '</svg>')


# ---- units cancelling in the four equations she uses most -------------------
# Unit arithmetic only; the equations are on her sheet (reference.js, Section
# 2). The cancelled unit is shown in amber.
UW, UH = 720, 540
up = [f'<rect width="{UW}" height="{UH}" fill="#FFFFFF"/>',
      f'<text x="18" y="32" font-size="21" font-weight="600" fill="{INK}">Units that cancel</text>',
      f'<text x="18" y="58" font-size="17" fill="{DIM}">Write the units in with the numbers; what is left is the unit of the answer</text>']
ROWS = [
    ('Cl = k × VD', [('hr⁻¹', INK), (' × ', DIM), ('L', INK), ('  =  ', DIM), ('L/hr', BLUE)], 'a rate constant times a volume is a volume per time'),
    ('Cl = Dose ÷ AUC', [('mg', AMBER), (' ÷ ', DIM), ('mg', AMBER), ('·hr/L', INK), ('  =  ', DIM), ('L/hr', BLUE)], 'mg cancels; dividing by hr/L is multiplying by L/hr'),
    ('R = Css × Cl', [('mg/', INK), ('L', AMBER), (' × ', DIM), ('L', AMBER), ('/hr', INK), ('  =  ', DIM), ('mg/hr', BLUE)], 'L cancels; a concentration times a clearance is a dosing rate'),
    ('t½ = 0.693 ÷ k', [('1', INK), (' ÷ ', DIM), ('hr⁻¹', INK), ('  =  ', DIM), ('hr', BLUE)], 'dividing by a per-hour constant gives hours'),
    ('VD = Dose ÷ C0', [('mg', AMBER), (' ÷ ', DIM), ('mg', AMBER), ('/L', INK), ('  =  ', DIM), ('L', BLUE)], 'mg cancels; dividing by per-litre gives litres'),
]
for i, (eq, chunks, note) in enumerate(ROWS):
    y = 110 + i * 86
    up.append(f'<rect x="18" y="{y-26}" width="{UW-36}" height="76" rx="8" fill="{"#F7F9FB" if i % 2 else "#FFFFFF"}"/>')
    up.append(f'<text x="30" y="{y}" font-size="19" font-weight="600" fill="{INK}">{esc(eq)}</text>')
    spans = ''
    for txt, col in chunks:
        deco = ' text-decoration="line-through"' if col == AMBER else ''
        wt = '600' if col in (AMBER, BLUE) else '400'
        spans += f'<tspan fill="{col}" font-weight="{wt}"{deco}>{esc(txt)}</tspan>'
    up.append(f'<text x="300" y="{y}" font-size="19" xml:space="preserve">{spans}</text>')
    up.append(f'<text x="30" y="{y+30}" font-size="15" fill="{DIM}">{esc(note)}</text>')
fig('unit_cancel', 'Units cancelling in five equations: the unit left over is the unit of the answer',
    f'<svg xmlns="http://www.w3.org/2000/svg" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" viewBox="0 0 {UW} {UH}" width="{UW}" height="{UH}" role="img" '
    f'aria-label="Units cancelling"><title>Units cancelling</title>' + '\n'.join(up) + '</svg>')

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
    json.dump({k: v[0] for k, v in FIGS.items()}, open(os.path.join(HERE, 'figtitles.json'), 'w'),
              indent=0, sort_keys=True, ensure_ascii=False)
    json.dump(STEPS, open(os.path.join(HERE, 'steps.json'), 'w'), indent=0, sort_keys=True, ensure_ascii=False)
    for key, st in STEPS.items():
        print(f'  {key:24s} {len(st["svg"])/1024:5.1f} KB svg   {len(st["steps"])} steps')
        for s_ in st['steps']:
            print('      ', s_['tag'], '|', s_['cap'])
    path = os.path.join(HERE, 'images.json')
    # images.json also holds the rendered lecture slides, written by slides.py.
    # Rewriting only the drawn figures would delete them, so they are carried
    # across untouched.
    if os.path.exists(path):
        kept = {k: v for k, v in json.load(open(path)).items() if k.startswith('slide_')}
        out.update(kept)
        print(f'  kept {len(kept)} rendered slides')
    json.dump(out, open(path, 'w'), indent=0, sort_keys=True)
    total = sum(len(v) for v in out.values())
    print(f'\n{len(out)} figures -> {path}  ({total/1024:.1f} KB of data URL)')


if __name__ == '__main__':
    main()
