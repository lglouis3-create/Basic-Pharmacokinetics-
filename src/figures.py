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
                 ylabel='Plasma drug concentration', xticks=None,
                 w=W, h=H, l=L, r=R, t=T, b=B, fs=1.0, numbers=True):
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
                 f'font-size="{14*self.fs:.1f}" fill="{INK}">{esc(self.xlabel)}</text>')
        p.append(f'<text x="18" y="{self.T+self.PH/2:.0f}" text-anchor="middle" font-size="{14*self.fs:.1f}" '
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
               w=PW_, h=PH_, l=90, r=26, t=84, b=62, fs=1.1)
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
    varied = [0.2, 0.3, 0.5]
    color = BLUE if which == 'k' else AMBER
    ymax = 3 if which == 'k' else 8
    pan = Plot(20, list(range(0, ymax + 1, 1 if which == 'k' else 2)),
               xlabel='Time (hours)', ylabel='Concentration (µg/mL)',
               w=600, h=480, l=82, r=24, t=128, b=66, fs=1.4)
    pan.frame([0, 4, 8, 12, 16, 20])
    rows = []
    styles = STYLES if which == 'k' else STYLES[::-1]
    for v, dash in zip(varied, styles):
        ka, k = (SFIX, v) if which == 'k' else (v, SFIX)
        fn, tmax, cmax, auc = slide_curve(ka, k)
        pan.curve(fn, color=color, dash=dash)
        pan.vline(tmax, cmax, color=color, dash='2 4')
        pan.points([tmax], [cmax], color=color)
        pan.label(tmax + 0.35, cmax, f'{v:g}/hr', dy=-10)
        rows.append((v, tmax, cmax, auc))
    aucs = ' → '.join(f'{r[3]:.3g}' for r in rows)
    if which == 'k':
        heading(pan, 'k raised, kₐ held at 0.1 /hr',
                f'Peak lower and earlier. AUC {aucs}: falls.', big=1.1)
    else:
        heading(pan, 'kₐ raised, k held at 0.1 /hr',
                f'Peak higher and earlier. AUC {aucs}: same.', big=1.1)
    pan.parts.append(f'<text x="18" y="98" font-size="17" fill="{DIM}">Dots mark each peak; '
                     f'the dotted drop marks its tₘₐₓ.</text>')
    return pan, rows


kpan, KROWS = kk_panel('k')
apan, AROWS = kk_panel('ka')
stack('k_vs_ka', 'Raising k against raising ka, drawn from the slide parameters', [kpan, apan], 600, 480)


# ---- flip-flop: which constant the tail of an oral curve reports ----------
# A picture of a relationship, so the axes carry no numbers: only the order
# of the two constants matters. Semi-log, where a first-order fall is a line.
def flip_panel(ka, title, line, verdict):
    k, dv = 0.3, 10.0
    pan = Plot(24, [0.01, 0.1, 1, 10], log=True, xlabel='Time', ylabel='Concentration (log scale)',
               w=600, h=440, l=60, r=24, t=124, b=46, fs=1.4, numbers=False)
    pan.frame([0, 6, 12, 18, 24])
    iv = lambda t: dv * math.exp(-k * t)
    oral = lambda t: ka * dv / (ka - k) * (math.exp(-k * t) - math.exp(-ka * t))
    pan.curve(iv, color=DIM, dash='6 5')
    pan.curve(oral, color=BLUE, x0=0.02)
    pan.label(3.5, iv(3.5), 'IV dose, same drug', color=DIM, swatch=True, dy=-18)
    pan.label(14.0, oral(14.0), 'oral dose', color=BLUE, swatch=True, dy=-18)
    heading(pan, title, line)
    pan.parts.append(f'<text x="18" y="96" font-size="19" font-weight="600" '
                     f'fill="{INK}">{esc(verdict)}</text>')
    return pan


stack('flipflop', 'Immediate release against extended release: which constant the tail of the oral curve shows', [
    flip_panel(1.2, 'Immediate release: kₐ larger than k',
               'Absorption finishes early, so only elimination is left in the tail.',
               'Oral tail runs parallel to the IV line → its slope is k.'),
    flip_panel(0.1, 'Extended release: kₐ smaller than k',
               'Absorption is still going on in the tail and is now the slower step.',
               'Oral tail is flatter than the IV line → its slope is kₐ (flip-flop).'),
], 760, 420)


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


stack('input_types', 'Three ways drug can enter, each with first-order elimination', [
    input_panel(lambda t: 10 * math.exp(-K3 * t), 'Instantaneous in, first-order out',
                'IV bolus: highest at time zero, then falls.'),
    input_panel(lambda t: 13.33 * (math.exp(-K3 * t) - math.exp(-1.2 * t)), 'First-order in, first-order out',
                'Ordinary tablet: rises to a peak, then falls.'),
    input_panel(zero_in, 'Zero-order in, first-order out',
                'Infusion or constant-rate product: levels off.', stop=T3),
], 600, 320)

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
