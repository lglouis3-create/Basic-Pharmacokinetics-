"""Extra practice: problems written for this drill in her formats.

Every stem follows one of her recurring skeletons (STYLE.md, "Recurring stem
skeletons") with numbers chosen here, so none of these is her problem and
none of their numbers is hers. They are kept out of the main bank (EXTRAS,
not QUESTIONS): they never reach the exam simulator, the module counts or her
drills, and are offered only under "Extra practice" on each Calculations page.
Each answer is computed from the stem's own numbers and the working printed
uses the same rounded values. Run:  python3 gen/extra.py  (writes q11_extra.js)
"""
import math, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from wslib import num, write_plain
ln, e = math.log, math.exp
F = lambda x, d=2: f'{x:.{d}f}'
CITE = 'Written for this drill in her format; the numbers are not hers'
LEC = {1: ('L01', 1), 2: ('L02', 1), 3: ('L04', 1), 4: ('L05', 2), 5: ('L06', 2), 6: ('L07', 2)}

def X(xtype, i, module, topic, sub, skill, stem, units, value, d, steps, teach, setup=None, givens=None, check=None, asks=None):
    lec, ex = LEC[module]
    ans = round(value, d)
    more = {}
    if setup: more['setup'] = setup
    if givens: more['givens'] = givens
    if asks: more['asks'] = asks
    if check:
        # bounds to four significant figures, lo rounded down and hi up so lo ≤ ans ≤ hi still holds
        def sig(x, up):
            if x == 0: return 0
            p = 3 - math.floor(math.log10(abs(x))); f = 10 ** p
            v = (math.ceil(x * f - 1e-9) if up else math.floor(x * f + 1e-9)) / f
            return int(v) if v == int(v) else v
        check = dict(check)
        if 'lo' in check: check['lo'] = sig(check['lo'], False)
        if 'hi' in check: check['hi'] = sig(check['hi'], True)
        more['check'] = check
    num(f'x-{xtype}-{i}', stem=stem, units=units, ans=ans, calc=value, module=module, lecture=lec, exam=ex,
        topic=topic, sub=sub, skill=skill, concept=f'x-{xtype}', steps=steps, teach=teach, cite=CITE,
        extra=True, xtype=xtype, **more)

def CK(t, lo=None, hi=None):
    """The sanity check on a result: one or two sentences and, where the stem or the kinetics gives a hard bound, lo/hi."""
    c = dict(t=t)
    if lo is not None: c['lo'] = lo
    if hi is not None: c['hi'] = hi
    return c

PART = {0: 'all', 1: 'half', 2: 'a quarter', 3: 'an eighth', 4: 'a sixteenth', 5: 'a thirty-second'}
WORD = {1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five'}

def S(eq, pre, why):
    """The set-up equation of a numeric question: the catalog id of the line that gives the final number,
    the ids used earlier in the working, and the words of the stem that pick that line."""
    return dict(eq=eq, pre=list(pre), why=why)

T_DECIDE = [{'h': 'Rate constant from a table', 'list': ['Equal fractions lost in equal times: first order.', 'k = {{frac:ln(C1/C2)|t2 − t1}} from two points far apart.', 'Report k to four decimals, in reciprocal time.']}]
T_ZERO = [{'h': 'Zero order', 'list': ['C = C0 − k0 t: the same amount is lost every hour.', 't = {{frac:C0 − C|k0}} to fall from C0 to C.']}]
T_FIRST = [{'h': 'First order', 'list': ['C = C0 e^(−kt).', 'Back to time zero: C0 = C e^(kt).']}]
T_HALF = [{'h': 'Time to decompose', 'list': ['Remaining fraction = 1 − fraction decomposed.', 'A power of ½ remaining: count half-lives (50%, 75%, 87.5%, 93.75% decomposed = 1, 2, 3, 4 t½).', 'Otherwise t = {{frac:ln(C0/C)|k}} with k = 0.693/t½.', 'The amount of drug does not change the time.']}]
T_AUC = [{'h': 'Trapezoidal rule', 'list': ['Each segment: {{frac:Cn−1 + Cn|2}} × (tn − tn−1).', 'Add the segments; the unit is concentration × time.']}]
T_BOL = [{'h': 'One-compartment IV bolus', 'list': ['k = {{frac:ln(C1/C2)|t2 − t1}}; t½ = {{frac:0.693|k}}.', 'C0 = {{frac:D0|VD}}; C = C0 e^(−kt), with minutes turned into hours.', 'VD from a percentage of body weight: kg × percentage, read as litres.', 'ClT = k × VD.']}]
T_TWO = [{'h': 'Two-compartment rate constants', 'list': ['k = {{frac:ab(A + B)|Ab + Ba}}, with a = α and b = β.', 'k21 = {{frac:Ab + Ba|A + B}}.', 'Vp = {{frac:D0|A + B}}.']}]
T_INF = [{'h': 'Continuous infusion', 'list': ['k = 0.693/t½; Cl = k × VD.', 'R = Css × Cl.', 'During the infusion: C = {{frac:R|kVD}}(1 − e^(−kt)).', 'Fraction of Css = 1 − e^(−kt), so t = {{frac:ln(1/(1 − f))|k}}.', 'After it stops from steady state: C = Css e^(−kt).', 'Loading dose DL = Css × VD.']}]
T_CL = [{'h': 'Clearance', 'list': ['ClR = fe × ClT; ClH = ClT − ClR.', 'Rate of elimination = Cl × Cp.', 'C = {{frac:D0|VD}} e^(−kt) with k = {{frac:Cl|VD}}.', 't½ = {{frac:0.693 VD|Cl}}; match mL with mL/min, L with L/hr.']}]
T_CRCL = [{'h': 'Creatinine clearance', 'list': ['cm ÷ 2.54 = inches; whole inches over 60.', 'IBW: male 50 + 2.3 × inches over 5 ft; female 45.5 + 2.3 × inches over 5 ft.', 'CrCl = {{frac:(140 − age)(IBW)|72 × SCr}}, × 0.85 if female.']}]
T_ORAL = [{'h': 'One oral dose', 'list': ['k = 0.693/t½; ka = 0.693/t½ absorption, in hours.', 'tmax = {{frac:ln(ka/k)|ka − k}}.', 'Cp = {{frac:F ka D0|VD(ka − k)}} (e^(−kt) − e^(−ka t)); Cmax at t = tmax.', 'AUC = {{frac:F D0|k VD}}.']}]
T_MD = [{'h': 'Repeated IV bolus', 'list': ['C0 = {{frac:D0|VD}}; e^(−kτ) is the fraction of a dose left after one interval.', 'Cmax∞ = {{frac:C0|1 − e^(−kτ)}}; Cmin∞ = Cmax∞ e^(−kτ); Cavg∞ = {{frac:D0|VD k τ}}.', 'After n doses: Cp = C0 ({{frac:1 − e^(−nkτ)|1 − e^(−kτ)}}) e^(−kt).']}]
T_II = [{'h': 'Intermittent infusions', 'list': ['R = dose ÷ infusion time.', 'End of one infusion: C = {{frac:R|kVD}}(1 − e^(−k tinf)).', 'After it ends: C = Cend e^(−kt), t from the end of that infusion.', 'Two infusions: add each one\'s own contribution at the time asked.']}]
T_MO = [{'h': 'Multiple oral doses', 'list': ['Cavg∞ = {{frac:F D0|VD k τ}}.', 'Cmin∞ = {{frac:ka F D0|VD(ka − k)}} ({{frac:1|1 − e^(−kτ)}}) e^(−kτ).', 'tmax∞ = {{frac:1|ka − k}} ln[{{frac:ka(1 − e^(−kτ))|k(1 − e^(−ka τ))}}].']}]

# ----------------------------------------------------------------- Module 1
for i, (C0, k, ts, a, b, r) in enumerate([(420, 0.0693, [2, 6, 12, 24, 36, 48], 1, 4, (2, 3, 4)), (180, 0.1155, [1, 3, 6, 9, 12, 18], 1, 5, (1, 2, 3)), (250, 0.0462, [4, 8, 12, 24, 36, 48], 0, 4, (0, 1, 2))], 1):
    cs = [round(C0 * e(-k * t), 1) for t in ts]
    tab = '\n'.join(f'{t} | {c}' for t, c in zip(ts, cs))
    kk = ln(cs[a] / cs[b]) / (ts[b] - ts[a])
    # the pair of rows whose ratio is nearest to 2: a half-life read straight off the table
    hi_, hj_ = min(((p, q) for p in range(len(ts)) for q in range(p + 1, len(ts))), key=lambda pq: abs(cs[pq[0]] / cs[pq[1]] - 2))
    th = round(0.693 / kk); hdt = ts[hj_] - ts[hi_]; hratio = cs[hi_] / cs[hj_]
    hword = ('to half, one half-life' if abs(hratio - 2) < 0.02 else
             f'to just under half, as {hdt} hr is a little more than one half-life' if hratio > 2 else
             f'to just over half, as {hdt} hr is a little less than one half-life')
    other = [j for j in range(len(ts)) if j not in (a, b)]
    X('m1-decide', i, 1, 'orders', 'decide', 'krate',
      'In an experiment to study the chemical decomposition, a drug solution was prepared and a sample was obtained at different time points. The drug concentrations in the samples and the results were as follows:\n\nTime (hr) | Concentration (mg/L)\n' + tab + '\n\nWhat is the rate constant for the decrease in concentration?',
      'hr⁻¹', kk, 4,
      [('setup', f'Over two equal {ts[r[1]]-ts[r[0]]}-hr steps the ratios match: {cs[r[0]]}/{cs[r[1]]} = {F(cs[r[0]]/cs[r[1]],3)} and {cs[r[1]]}/{cs[r[2]]} = {F(cs[r[1]]/cs[r[2]],3)}, so first order', 'A fixed fraction lost per equal step of time is the first-order signature, so k comes from the log of a ratio.'),
       ('algebra', f'k = {{{{frac:ln({cs[a]}/{cs[b]})|{ts[b]} hr − {ts[a]} hr}}}} = {{{{frac:{F(ln(cs[a]/cs[b]),4)}|{ts[b]-ts[a]} hr}}}} = {F(kk,4)} hr⁻¹', 'Two points far apart on the table reduce the effect of rounding in the data; the units cancel inside the log.')], T_DECIDE,
      S('first-ln', [], '"chemical decomposition" with a table of concentration against time: a first-order decline, Module 1. Two concentrations C1 and C2 at times t1 and t2 are given and k is asked, so ln C = ln C0 − kt is rearranged to k = {{frac:ln(C1/C2)|t2 − t1}}. Equal ratios over equal time steps settle the order first.'),
      asks='k',
      givens=[['C1 at t1', f'{cs[a]} mg/L at {ts[a]} hr', 'the earlier of the two points far apart: the numerator inside the logarithm'],
              ['C2 at t2', f'{cs[b]} mg/L at {ts[b]} hr', f'the later point: the denominator inside the logarithm; t2 − t1 = {ts[b]-ts[a]} hr'],
              ['other rows', ', '.join(f'{ts[j]} hr' for j in other), 'not needed for k: equal ratios over equal time steps confirm first order']],
      check=CK(f'k = {F(kk,4)} hr⁻¹ means t½ = {{{{frac:0.693|{F(kk,4)}}}}} ≈ {th} hr. From {ts[hi_]} to {ts[hj_]} hr the table falls from {cs[hi_]} to {cs[hj_]} mg/L, {hword}, which fits; k must be positive.', lo=0))
for i, (R, C0, C) in enumerate([(5, 400, 250), (2.5, 150, 90), (8, 600, 420)], 1):
    X('m1-zero', i, 1, 'orders', 'zero', 'krate',
      f'A drug solution decomposes by a zero-order process at {R:g} (mg/mL)/hr from an initial concentration of {C0} mg/mL. How long will it take for the concentration to fall to {C} mg/mL?',
      'hr', (C0 - C) / R, 2,
      [('setup', 't = {{frac:C0 − C|k0}}', 'Zero order loses the same amount every hour, so the time is the amount to be lost divided by the rate.'),
       ('algebra', f't = {{{{frac:{C0} − {C} mg/mL|{R:g} (mg/mL)/hr}}}} = {F((C0-C)/R)} hr', 'The concentration units cancel, leaving hours; no logarithm is used for zero order.')], T_ZERO,
      S('zero-line', [], '"zero-order process" picks the zero-order line, C = C0 − kt. The rate k0, the initial concentration C0 and the final concentration C are given and the time is asked, so the line is solved for t: t = {{frac:C0 − C|k0}}. No hinge: no half-life is involved.'),
      asks='t',
      givens=[['k0', f'{R:g} (mg/mL)/hr', 'the zero-order rate: the denominator'],
              ['C0', f'{C0} mg/mL', 'the starting concentration: C0 − C is the numerator'],
              ['C', f'{C} mg/mL', 'the concentration reached, subtracted from C0']],
      check=CK(f'Multiply back: {F((C0-C)/R)} hr × {R:g} (mg/mL)/hr, taken from {C0} mg/mL, has to land on {C} mg/mL. The time is positive and no logarithm appears: a zero-order loss is the same every hour.', lo=0))
for i, (k, T, C) in enumerate([(0.0462, 10, 92.4), (0.1386, 4, 57.5), (0.0231, 24, 61.8)], 1):
    X('m1-first', i, 1, 'orders', 'first', 'conctime',
      f'A drug solution decomposes by a first-order process with a rate constant of {k} hr⁻¹. The concentration measured {T} hours after the solution was prepared was {C} mg/L. What was the initial concentration of the solution?',
      'mg/L', C * e(k * T), 1,
      [('setup', 'C0 = C e^(kt)', 'Rearranging C = C0 e^(−kt) for the starting concentration undoes the decline that happened over t.'),
       ('algebra', f'C0 = ({C} mg/L) e^(({k})({T})) = ({C})({F(e(k*T),4)}) = {F(C*e(k*T),1)} mg/L', 'The exponent kt is a pure number, so C0 keeps the unit of the measured concentration.')], T_FIRST,
      S('first-exp', [], '"first-order process" with "a rate constant" picks the exponential first-order line, C = C0 e^(−kt). The rate constant k, the time t and the concentration C at that time are given and "the initial concentration" C0 is asked, so the line is rearranged to C0 = C e^(kt).'),
      asks='C0',
      givens=[['k', f'{k} hr⁻¹', f'the exponent kt = {k} × {T}'],
              ['t', f'{T} hours', 'the time since preparation, in the exponent'],
              ['C', f'{C} mg/L', f'the measured concentration, multiplied by e^(kt) = {F(e(k*T),4)}']],
      check=CK(f'The solution started above the {C} mg/L measured later, so C0 > {C}. t½ = {{{{frac:0.693|{k}}}}} is longer than {T} hr, so less than one half-life has passed and C0 lies between {C} mg/L and twice that.', lo=C, hi=2 * C))
for i, (h, M, P) in enumerate([(6, 500, 75), (10, 250, 40), (5, 800, 93.75)], 1):
    t = ln(100 / (100 - P)) / (0.693 / h)
    nh = math.log2(100 / (100 - P)); whole = abs(nh - round(nh)) < 1e-9
    hcheck = (CK(f'{P:g}% decomposed leaves {100-P:g}%, which is {WORD[round(nh)]} halvings of 100%, so the time is {WORD[round(nh)]} half-lives: {round(nh)} × {h} hr = {F(t)} hr. The {M} mg does not change the time.', lo=(round(nh) - 1) * h, hi=(round(nh) + 1) * h) if whole else
              CK(f'{P:g}% decomposed leaves {100-P:g}%, more than half, so less than one half-life of {h} hr has passed: the time lies between 0 and {h} hr. The {M} mg does not change the time.', lo=0, hi=h) if nh < 1 else
              CK(f'{P:g}% decomposed leaves {100-P:g}%, between {PART[math.floor(nh)]} and {PART[math.floor(nh) + 1]} of the start, so the time lies between {math.floor(nh)} and {math.floor(nh) + 1} half-lives of {h} hr. The {M} mg does not change the time.', lo=math.floor(nh) * h, hi=(math.floor(nh) + 1) * h))
    X('m1-half', i, 1, 'orders', 'half', 'krate',
      f'If the half-life for decomposition of a drug is {h} hours, how long will it take for {M} mg of the drug to decompose by {P:g}%? Assume first-order kinetics and constant temperature.',
      'hr', t, 2,
      [('setup', f'{100-P:g}% remains; k = 0.693/{h} hr = {F(0.693/h,4)} hr⁻¹', 'The time depends on the fraction remaining, not on the amount; the milligrams do not enter the calculation.'),
       ('algebra', f't = {{{{frac:ln(100/{100-P:g})|{F(0.693/h,4)} hr⁻¹}}}} = {F(t)} hr', 'Where the fraction left is a power of one-half this equals a whole number of half-lives, which checks the answer.')], T_HALF,
      S('first-exp', ['thalf-first'], '"half-life for decomposition" and "first-order kinetics" pick the first-order decline, C = C0 e^(−kt). The percent decomposed gives the fraction remaining C/C0 and the time is asked, so the line is solved for t; the milligrams do not enter. k first, from the half-life, because the line wants k, not t½.'),
      asks='t',
      givens=[['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(0.693/h,4)} hr⁻¹'],
              ['amount', f'{M} mg', 'not needed: the time depends on the fraction remaining, not the amount'],
              ['decomposed', f'{P:g}%', f'leaves {100-P:g}% remaining, the ratio inside the logarithm']],
      check=hcheck)
for i, (ts, cs) in enumerate([([0.5, 1, 2, 4, 6], [42.1, 35.6, 25.4, 13.0, 6.6]), ([1, 2, 3, 5, 8], [18.2, 14.9, 12.2, 8.2, 4.5]), ([0, 2, 4, 8, 12], [60.0, 44.5, 33.0, 18.1, 10.0])], 1):
    segs = [(cs[j] + cs[j + 1]) / 2 * (ts[j + 1] - ts[j]) for j in range(len(ts) - 1)]
    X('m1-auc', i, 1, 'auc', 'trap', 'auc',
      'Plasma drug levels after a dose were as follows.\n\nTime (hr) | Plasma drug level (mcg/mL)\n' + '\n'.join(f'{t:g} | {c}' for t, c in zip(ts, cs)) + f'\n\nUsing the trapezoidal rule, what is the AUC from {ts[0]:g} to {ts[-1]:g} hours?',
      '(mcg/mL)·hr', sum(segs), 2,
      [('setup', 'AUC = Σ {{frac:Cn−1 + Cn|2}} (tn − tn−1)', 'Each pair of neighbouring points makes one trapezoid: the average height times the width of the time step.'),
       ('algebra', ' + '.join(F(s) for s in segs) + f' = {F(sum(segs))} (mcg/mL)·hr', 'Adding the trapezoids gives the area between the first and last sampling times, in concentration times hours.')], T_AUC,
      S('auc-trap', [], '"Using the trapezoidal rule" with a table of plasma level against time picks the trapezoidal line. Each pair of neighbouring points gives one segment, [(Cn−1 + Cn)/2](tn − tn−1), and the AUC asked between the first and last times is the sum of the segments. No hinge.'),
      asks='AUC',
      givens=[['t, Cp', f'{t:g} hr, {c} mcg/mL', 'the first height: with the next point it makes the first trapezoid' if j == 0 else
               'the last height: the area stops here' if j == len(ts) - 1 else 'shared by two neighbouring trapezoids, as the right then the left height'] for j, (t, c) in enumerate(zip(ts, cs))],
      check=CK(f'Every height lies between {cs[-1]} and {cs[0]} mcg/mL, so the area lies between those two heights times the span from {ts[0]:g} to {ts[-1]:g} hr. Each printed segment is an average height times a width, and the sum of the {WORD[len(segs)]} is the answer.',
               lo=cs[-1] * (ts[-1] - ts[0]), hi=cs[0] * (ts[-1] - ts[0])))

# ----------------------------------------------------------------- Module 2
for i, (C0, k, t1, t2) in enumerate([(24.0, 0.25, 1, 6), (60.0, 0.1155, 2, 10), (9.5, 0.4621, 0.5, 4)], 1):
    c1, c2 = round(C0 * e(-k * t1), 2), round(C0 * e(-k * t2), 2)
    kk = ln(c1 / c2) / (t2 - t1)
    nlo = math.floor(math.log2(c1 / c2)); dt = t2 - t1
    X('m2-k', i, 2, 'bolus1', 'calc', 'krate',
      f'A drug given by IV bolus injection gave plasma concentrations of {c1} mg/L at {t1:g} hours and {c2} mg/L at {t2:g} hours after the dose. Calculate the elimination rate constant.',
      'hr⁻¹', kk, 4,
      [('setup', 'k = {{frac:ln(C1/C2)|t2 − t1}}', 'One compartment after a bolus declines first order, so the log of the ratio over the time between the samples is k.'),
       ('algebra', f'k = {{{{frac:ln({c1}/{c2})|{t2:g} − {t1:g} hr}}}} = {F(kk,4)} hr⁻¹', 'The concentration units cancel inside the logarithm, so dividing by hours leaves reciprocal hours.')], T_BOL,
      S('first-ln', [], '"IV bolus injection" with two plasma concentrations at two times: one-compartment first-order decline after a bolus. C1 at t1 and C2 at t2 are given and "the elimination rate constant" is asked, so ln C = ln C0 − kt is rearranged to k = {{frac:ln(C1/C2)|t2 − t1}}. No hinge.'),
      asks='k',
      givens=[['C1', f'{c1} mg/L', 'the earlier concentration: the numerator inside the logarithm'],
              ['t1', f'{t1:g} hours', 'subtracted from t2 in the denominator'],
              ['C2', f'{c2} mg/L', 'the later concentration: the denominator inside the logarithm'],
              ['t2', f'{t2:g} hours', f'gives t2 − t1 = {dt:g} hr']],
      check=CK(f'{c1} falls to {c2} mg/L between {t1:g} and {t2:g} hr, a drop between {2**nlo}-fold and {2**(nlo+1)}-fold, so that span is {WORD[nlo]} to {WORD[nlo+1]} half-lives and k lies between {{{{frac:{nlo} × 0.693|{t2:g} − {t1:g} hr}}}} and {{{{frac:{nlo+1} × 0.693|{t2:g} − {t1:g} hr}}}}.',
               lo=nlo * 0.693 / dt, hi=(nlo + 1) * 0.693 / dt))
for i, (D, V, k) in enumerate([(100, 20, 0.35), (500, 42, 0.1733), (75, 9.5, 0.6931)], 1):
    c = D / V * e(-k * 0.25)
    X('m2-c', i, 2, 'bolus1', 'calc', 'conctime',
      f'A {D} mg IV bolus dose of a drug with a volume of distribution of {V:g} L and an elimination rate constant of {k} hr⁻¹ is given. What is the concentration of drug in the plasma 15 minutes after the dose was given?',
      'mg/L', c, 2,
      [('unit', '15 minutes = 0.25 hr', 'The rate constant is in reciprocal hours, so the time goes into hours before it enters the exponent.'),
       ('algebra', f'C = {{{{frac:{D} mg|{V:g} L}}}} e^(−({k})(0.25)) = ({F(D/V,3)})({F(e(-k*0.25),4)}) = {F(c)} mg/L', 'C0 = D0/VD, then a quarter hour of first-order decline.')], T_BOL,
      S('first-exp', ['cp-db-vd'], '"IV bolus dose" with "volume of distribution" and "elimination rate constant": one-compartment bolus. D0, VD, k and the time are given and the plasma concentration at that time is asked, so C = C0 e^(−kt). C0 first, from Cp = DB/VD with the dose as the amount, because the line wants C0; the minutes go into hours.'),
      asks='Cp',
      givens=[['D0', f'{D} mg', f'over VD: C0 = {{{{frac:{D}|{V:g}}}}} = {F(D/V,3)} mg/L'],
              ['VD', f'{V:g} L', 'the denominator of C0'],
              ['k', f'{k} hr⁻¹', f'the exponent kt = {k} × 0.25'],
              ['t', '15 minutes', 'becomes 0.25 hr before it enters the exponent']],
      check=CK(f'C0 = {F(D/V,3)} mg/L is the ceiling. kt = {k} × 0.25 is well under 0.693, so less than one half-life has passed: the answer lies between half of C0 and C0, close to C0.', lo=D / V / 2, hi=D / V))
for i, (lb, dk, h, pct) in enumerate([(176, 10, 3, 25), (143, 12, 5, 30), (209, 8, 7, 20)], 1):
    w = lb / 2.2; V = pct / 100 * w; cl = 0.693 / h * V
    X('m2-vdcl', i, 2, 'bolus1', 'calc', 'clearance',
      f'A {lb}-pound male patient received a drug by rapid IV injection at {dk} mg/kg. The drug has a half-life of {h} hours and an apparent volume of distribution of {pct}% of body weight. What is the total body clearance of this drug in this patient?',
      'L/hr', cl, 2,
      [('unit', f'{lb} lb ÷ 2.2 = {F(w,1)} kg; VD = (0.{pct:02d})({F(w,1)} kg) = {F(V,2)} L', 'The percentage of body weight is read as litres per kilogram, so the weight in kilograms gives the volume.'),
       ('algebra', f'ClT = k × VD = ({{{{frac:0.693|{h} hr}}}})({F(V,2)} L) = {F(cl)} L/hr', 'The dose does not enter clearance; reciprocal hours times litres gives litres per hour.')], T_BOL,
      S('cl-k-vd', ['thalf-first'], '"rapid IV injection" with "half-life" and "apparent volume of distribution": one-compartment bolus. t½ and VD, as a percentage of body weight, are given and "total body clearance" is asked, so Cl = k × VD. k first, from the half-life, because the line wants k, not t½; the dose per kg does not enter.'),
      asks='ClT',
      givens=[['weight', f'{lb}-pound', f'{{{{frac:{lb} lb|2.2}}}} = {F(w,1)} kg, the weight the volume scales with'],
              ['D0', f'{dk} mg/kg', 'not needed: the dose does not enter clearance'],
              ['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(0.693/h,4)} hr⁻¹'],
              ['VD', f'{pct}% of body weight', f'read as {pct/100:g} L/kg: VD = {F(V,2)} L']],
      check=CK(f'ClT = k × VD. k = {{{{frac:0.693|{h} hr}}}} lies between {{{{frac:0.5|{h} hr}}}} and 1 hr⁻¹, so ClT lies between half of {F(V,2)} L per {h} hr and {F(V,2)} L per hour.', lo=V / (2 * h), hi=V))
for i, (D, A, a, B, b, ask) in enumerate([(300, 12.4, 2.6, 6.8, 0.21, 'k'), (250, 9.1, 3.4, 4.6, 0.138, 'k21'), (400, 15.2, 1.9, 8.3, 0.096, 'vp')], 1):
    kval = a * b * (A + B) / (A * b + B * a); k21 = (A * b + B * a) / (A + B); vp = D / (A + B)
    q = {'k': ('What is the overall elimination rate constant, k?', 'hr⁻¹', kval, 4, f'k = {{{{frac:({a})({b})({A} + {B})|({A})({b}) + ({B})({a})}}}} = {F(kval,4)} hr⁻¹'),
         'k21': ('What is k21, the rate constant for transfer from the tissue to the central compartment?', 'hr⁻¹', k21, 4, f'k21 = {{{{frac:({A})({b}) + ({B})({a})|{A} + {B}}}}} = {F(k21,4)} hr⁻¹'),
         'vp': ('What is the apparent volume of distribution of the central compartment?', 'L', vp, 2, f'Vp = {{{{frac:{D} mg|{A} + {B} mg/L}}}} = {F(vp)} L')}[ask]
    X('m2-two', i, 2, 'bolus2', 'calc', 'multicpt',
      f'A {D}-mg IV bolus dose of a drug is described by A = {A} mg/L, B = {B} mg/L, α = {a} hr⁻¹ and β = {b} hr⁻¹. {q[0]}',
      q[1], q[2], q[3],
      [('setup', 'Identify the pieces: A and B are intercepts (mg/L); α is the larger exponent, β the smaller (hr⁻¹)', 'The two-compartment rate constants and volume are all built from the same four numbers she hands over.'),
       ('algebra', q[4], 'Intercepts times slopes keep the units consistent: mg/L cancels where it appears above and below the line.')], T_TWO,
      {'k': S('k-overall', [], '"IV bolus dose" described by "A", "B", "α" and "β": two-compartment bolus, model A. The intercepts A and B and the slopes α (a) and β (b) are given and "the overall elimination rate constant, k" is asked, so k = {{frac:(A + B)ab|Ab + Ba}} is filled in directly. No hinge.'),
       'k21': S('k21', [], '"IV bolus dose" described by "A", "B", "α" and "β": two-compartment bolus. The intercepts A and B and the slopes α (a) and β (b) are given and "k21, the rate constant for transfer from the tissue to the central compartment" is asked, so k21 = {{frac:Ab + Ba|A + B}} is filled in directly. No hinge.'),
       'vp': S('vp-ab', [], '"IV bolus dose" described by "A", "B", "α" and "β": two-compartment bolus. The dose D0 and the intercepts A and B are given and "the apparent volume of distribution of the central compartment" is asked, so Vp = {{frac:D0|A + B}}; the slopes are not needed. No hinge.')}[ask],
      asks={'k': 'k', 'k21': 'k21', 'vp': 'Vp'}[ask],
      givens=[['D0', f'{D}-mg', 'the numerator: Vp = D0 over the initial concentration A + B' if ask == 'vp' else f'not needed: {"k" if ask == "k" else "k21"} comes from the intercepts and slopes alone'],
              ['A', f'{A} mg/L', 'the α intercept: A + B is the denominator' if ask == 'vp' else 'the α intercept, paired with β in Ab'],
              ['B', f'{B} mg/L', 'the β intercept: A + B is the denominator' if ask == 'vp' else 'the β intercept, paired with α in Ba'],
              ['α', f'{a} hr⁻¹', 'not needed: the slopes do not enter Vp' if ask == 'vp' else 'the larger slope, a, in Ba' + (' and in ab(A + B)' if ask == 'k' else '')],
              ['β', f'{b} hr⁻¹', 'not needed: the slopes do not enter Vp' if ask == 'vp' else 'the smaller slope, b, in Ab' + (' and in ab(A + B)' if ask == 'k' else '')]],
      check={'k': CK(f'k lies between the two slopes: above β = {b} hr⁻¹ and below α = {a} hr⁻¹, because 1 over k is a weighted average of 1 over α and 1 over β. It is positive and in hr⁻¹.', lo=b, hi=a),
             'k21': CK(f'k21 is a weighted average of the slopes, so it lies between β = {b} hr⁻¹ and α = {a} hr⁻¹; the weight on α is B over (A + B), so with {"A larger than B it sits nearer β" if A > B else "B larger than A it sits nearer α"}.', lo=b, hi=a),
             'vp': CK(f'Cp0 = A + B lies between A = {A} mg/L and twice A, so Vp = {{{{frac:D0|Cp0}}}} lies between {{{{frac:{D} mg|2 × {A} mg/L}}}} and {{{{frac:{D} mg|{A} mg/L}}}}.', lo=D / (2 * A), hi=D / A)}[ask])

# ----------------------------------------------------------------- Module 3
for i, (Css, h, V) in enumerate([(15, 6, 30), (8, 4, 18), (25, 9, 40)], 1):
    R = Css * 0.693 / h * V
    X('m3-rate', i, 3, 'infusion', 'rate', 'infusion',
      f'You are asked to recommend an IV infusion rate to achieve a steady-state concentration of {Css} mg/L. The half-life of the drug is {h} hours and its volume of distribution is {V} L. What rate would you infuse this drug?',
      'mg/hr', R, 2,
      [('setup', f'k = 0.693/{h} hr = {F(0.693/h,4)} hr⁻¹; Cl = k × VD = {F(0.693/h*V,3)} L/hr', 'The infusion rate needed is set by clearance, which comes from k and the volume.'),
       ('algebra', f'R = Css × Cl = ({Css} mg/L)({F(0.693/h*V,3)} L/hr) = {F(R)} mg/hr', 'Css = R/Cl rearranged; mg/L times L/hr leaves mg per hour, a practical infusion rate.')], T_INF,
      S('css', ['thalf-first', 'cl-k-vd'], '"IV infusion rate" to achieve "a steady-state concentration": continuous infusion at steady state. Css, t½ and VD are given and the rate R is asked, so Css = R/Cl is rearranged to R = Css × Cl. k first, from the half-life, then Cl = k × VD, because the line wants Cl, not t½ and VD.'),
      asks='R',
      givens=[['Css', f'{Css} mg/L', 'the target: R = Css × Cl'],
              ['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(0.693/h,4)} hr⁻¹'],
              ['VD', f'{V} L', f'with k: Cl = k × VD = {F(0.693/h*V,3)} L/hr']],
      check=CK(f'Every half-life of {h} hr the infusion must replace about 0.693 of the steady-state amount Css × VD = {Css} mg/L × {V} L, so R is a little under {{{{frac:{Css} × {V}|{h}}}}} mg/hr and more than half of that.', lo=Css * V / (2 * h), hi=Css * V / h))
for i, (h, V, R, T) in enumerate([(5, 20, 40, 3), (8, 35, 60, 6), (3, 15, 25, 2)], 1):
    k = 0.693 / h; c = R / (k * V) * (1 - e(-k * T)); css = R / (k * V); nlo = math.floor(T / h)
    pre_check = (CK(f'Css = {F(css)} mg/L is the ceiling. {T} hr is less than one half-life of {h} hr, so under half of the way to Css has been covered: the answer lies between 0 and half of {F(css)} mg/L.', lo=0, hi=css / 2) if nlo == 0 else
                 CK(f'Css = {F(css)} mg/L is the ceiling. {T} hr is between {WORD[nlo]} and {WORD[nlo+1]} half-lives of {h} hr, so the gap to Css has closed to between {PART[nlo]} and {PART[nlo+1]} of Css; the answer is below Css.', lo=css * (1 - 0.5 ** nlo), hi=css * (1 - 0.5 ** (nlo + 1))))
    X('m3-pre', i, 3, 'infusion', 'pre', 'conctime',
      f'A drug with a half-life of {h} hours and a volume of distribution of {V} L is infused at {R} mg/hr WITHOUT a loading dose. What is the plasma concentration {T} hours after the start of the infusion?',
      'mg/L', c, 2,
      [('setup', f'k = {F(k,4)} hr⁻¹; Css = {{{{frac:R|kVD}}}} = {{{{frac:{R} mg/hr|({F(k,4)})({V} L)}}}} = {F(R/(k*V))} mg/L', 'The plateau the infusion is heading for is the rate over the clearance.'),
       ('algebra', f'C = {F(R/(k*V))} × (1 − e^(−({F(k,4)})({T}))) = {F(R/(k*V))} × {F(1-e(-k*T),4)} = {F(c)} mg/L', 'The bracket is the fraction of the plateau reached after that time on the infusion.')], T_INF,
      S('cp-infusing', ['thalf-first', 'cl-k-vd'], '"infused at" with "WITHOUT a loading dose" and a time "after the start of the infusion": an infusion before steady state. R, t½, VD and t are given and Cp at t is asked, so Cp = (R/Cl)(1 − e^(−kt)). k first, from the half-life, then Cl = k × VD, because the line wants k and Cl.'),
      asks='Cp',
      givens=[['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(k,4)} hr⁻¹'],
              ['VD', f'{V} L', f'with k under R: Css = {{{{frac:R|kVD}}}} = {F(css)} mg/L'],
              ['R', f'{R} mg/hr', 'the numerator of Css'],
              ['loading dose', 'WITHOUT', 'none, so the curve starts from zero and climbs toward Css'],
              ['t', f'{T} hours', f'since the start: the exponent kt = {F(k,4)} × {T}']],
      check=pre_check)
for i, (h, P) in enumerate([(6, 90), (4, 95), (10, 80)], 1):
    t = ln(1 / (1 - P / 100)) / (0.693 / h); nt = math.floor(math.log2(100 / (100 - P)))
    X('m3-time', i, 3, 'infusion', 'time', 'infusion',
      f'A drug with a half-life of {h} hours is infused at a constant rate with no loading dose. How long would it take to reach {P}% of the steady-state concentration?',
      'hr', t, 2,
      [('setup', f'{P/100:g} = 1 − e^(−kt) → t = {{{{frac:ln(1/{1-P/100:g})|k}}}}', 'The fraction of steady state reached depends only on kt, so the rate does not enter.'),
       ('algebra', f't = {{{{frac:{F(ln(1/(1-P/100)),4)}|{F(0.693/h,4)} hr⁻¹}}}} = {F(t)} hr', f'That is {F(t/h)} half-lives, the same for any infusion rate of this drug.')], T_INF,
      S('cp-infusing', ['thalf-first'], f'"infused at a constant rate with no loading dose" and "{P}% of the steady-state concentration": an infusion before steady state. Only t½ and the fraction of Css are given and "how long" is asked, so Cp = (R/Cl)(1 − e^(−kt)) is divided by Css = R/Cl and solved for t. k first, from the half-life, because the line wants k.'),
      asks='t',
      givens=[['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(0.693/h,4)} hr⁻¹'],
              ['rate', 'constant, no loading dose', 'not needed: the fraction of Css reached depends only on kt'],
              ['fraction of Css', f'{P}%', f'1 − e^(−kt) = {P/100:g}, so e^(−kt) = {1-P/100:g} is what the logarithm undoes']],
      check=CK(f'Each half-life closes half of the remaining gap to Css: after {WORD[nt]} half-lives {PART[nt]} of the gap remains and after {WORD[nt+1]} {PART[nt+1]}. Reaching {P}% leaves {100-P}%, between the two, so t lies between {nt} × {h} and {nt+1} × {h} hr.', lo=nt * h, hi=(nt + 1) * h))
for i, (h, V, R, T) in enumerate([(5, 22, 50, 8), (7, 30, 45, 4), (3, 12, 30, 6)], 1):
    k = 0.693 / h; css = R / (k * V); c = css * e(-k * T)
    ns = T / h; nlo = math.floor(ns + 1e-9); whole = abs(ns - round(ns)) < 1e-9
    stop_check = (CK(f'{T} hr after the stop is exactly {WORD[nlo]} half-lives of {h} hr, so Css = {F(css)} mg/L is cut to {PART[nlo]} of itself. The level falls from Css with nothing added, so the answer lies below {F(css)} mg/L and above zero.', lo=css / 2 ** (nlo + 1), hi=css / 2 ** (nlo - 1)) if whole else
                  CK(f'{T} hr after the stop is less than one half-life of {h} hr, so under half of Css = {F(css)} mg/L has gone: the answer lies between half of {F(css)} and {F(css)} mg/L.', lo=css / 2, hi=css) if nlo == 0 else
                  CK(f'{T} hr after the stop is between {WORD[nlo]} and {WORD[nlo+1]} half-lives of {h} hr, so the level lies between {PART[nlo+1]} and {PART[nlo]} of Css = {F(css)} mg/L; the decline starts from Css with nothing added.', lo=css / 2 ** (nlo + 1), hi=css / 2 ** nlo))
    X('m3-stop', i, 3, 'infusion', 'stop', 'conctime',
      f'A drug with a half-life of {h} hours and a volume of distribution of {V} L was infused at {R} mg/hr until steady state was reached. What is the concentration of drug in the plasma {T} hours after the cessation of the infusion?',
      'mg/L', c, 2,
      [('setup', f'Css = {{{{frac:R|kVD}}}} = {{{{frac:{R}|({F(k,4)})({V})}}}} = {F(css)} mg/L', 'The decline starts from steady state because the infusion ran long enough to reach it.'),
       ('algebra', f'C = {F(css)} e^(−({F(k,4)})({T})) = {F(c)} mg/L', 'Once the infusion stops nothing more enters, so the level falls first order from Css.')], T_INF,
      S('cp-after-stop', ['thalf-first', 'cl-k-vd', 'css'], '"infused at" "until steady state was reached", then a time "after the cessation of the infusion": decline after an infusion stops. t½, VD, R and t are given and Cp is asked, so Cp = Cpeak e^(−kt) with Cpeak = Css. k first from the half-life, Cl = k × VD, then Css = R/Cl gives the starting point.'),
      asks='Cp',
      givens=[['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(k,4)} hr⁻¹'],
              ['VD', f'{V} L', f'with k under R: Css = {{{{frac:R|kVD}}}} = {F(css)} mg/L, the starting point'],
              ['R', f'{R} mg/hr', 'the numerator of Css; the infusion ran to steady state'],
              ['t', f'{T} hours', f'after the stop: the exponent kt = {F(k,4)} × {T}']],
      check=stop_check)
for i, (Css, vkg, w) in enumerate([(12, 0.5, 70), (20, 0.25, 64), (6, 1.2, 80)], 1):
    V = vkg * w
    X('m3-load', i, 3, 'infusion', 'load', 'loading',
      f'Recommend a loading dose that will achieve a steady-state concentration of {Css} mg/L for an agent whose volume of distribution is {vkg} L/kg in a {w}-kg patient.',
      'mg', Css * V, 1,
      [('unit', f'VD = ({vkg} L/kg)({w} kg) = {V:g} L', 'A volume given per kilogram is multiplied by the patient weight before use.'),
       ('algebra', f'DL = Css × VD = ({Css} mg/L)({V:g} L) = {Css*V:g} mg', 'The loading dose puts the steady-state amount in the body at once: concentration times volume gives an amount.')], T_INF,
      S('dl-css-vd', [], '"loading dose" to achieve "a steady-state concentration": loading dose from the target, Module 3. Css and VD, given per kilogram and multiplied by the weight, are the data and DL is asked, so DL = Css × VD. No rate R is given, so the DL = R/k form is not used; no hinge.'),
      asks='DL',
      givens=[['Css', f'{Css} mg/L', 'the target concentration: DL = Css × VD'],
              ['VD', f'{vkg} L/kg', f'per kilogram; times the weight it is {V:g} L'],
              ['weight', f'{w}-kg', 'scales the volume to this patient']],
      check=CK(f'The loading dose is the amount in the body at steady state: {Css} mg in every litre of the {V:g} L volume, so {V:g} × {Css} = {Css*V:g} mg, well above the {Css} mg that fills a single litre.', lo=Css))

# ----------------------------------------------------------------- Module 4
for i, (cl, fe, ask) in enumerate([(4.8, 0.75, 'r'), (1.9, 0.3, 'h'), (6.2, 0.55, 'r')], 1):
    v = fe * cl if ask == 'r' else (1 - fe) * cl
    X('m4-cl', i, 4, 'clearance', 'clcalc', 'clearance',
      f'A drug has a total body clearance of {cl} L/hr, and {fe} of the dose is excreted unchanged in the urine. What is the {"renal" if ask == "r" else "hepatic"} clearance?',
      'L/hr', v, 3,
      [('setup', 'ClR = fe × ClT' if ask == 'r' else 'ClH = (1 − fe) × ClT', 'The fraction excreted unchanged is the renal share of total clearance; the rest is hepatic.'),
       ('algebra', f'{"ClR" if ask == "r" else "ClH"} = ({fe if ask == "r" else F(1-fe,2)})({cl} L/hr) = {F(v,3)} L/hr', 'fe has no units, so the renal or hepatic clearance keeps the unit L/hr.')], T_CL,
      S('clr', [], '"total body clearance" with the fraction "excreted unchanged in the urine": the clearance split of Module 4. ClT and fe are given and "the renal clearance" is asked, so ClR = fe × ClT. No hinge.') if ask == 'r' else
      S('clh', [], '"total body clearance" with the fraction "excreted unchanged in the urine": the clearance split of Module 4. ClT and fe are given and "the hepatic clearance" is asked, so ClH = (1 − fe) × ClT, the remainder after the renal share. No hinge.'),
      asks='ClR' if ask == 'r' else 'ClH',
      givens=[['ClT', f'{cl} L/hr', 'the whole clearance that fe splits into renal and hepatic shares'],
              ['fe', f'{fe}', 'the renal fraction: ClR = fe × ClT' if ask == 'r' else f'the renal fraction; the hepatic share is 1 − fe = {F(1-fe,2)}']],
      check=CK(f'ClR is the fraction {fe} of ClT = {cl} L/hr, so it lies between 0 and {cl} L/hr, {"above half of it because fe is above 0.5" if fe > 0.5 else "below half of it because fe is under 0.5"}. The hepatic clearance is the rest.', lo=0, hi=cl) if ask == 'r' else
            CK(f'ClH is the share not excreted unchanged, 1 − {fe} = {F(1-fe,2)} of ClT = {cl} L/hr, so it lies between 0 and {cl} L/hr, {"above half of it because fe is under 0.5" if fe < 0.5 else "below half of it because fe is above 0.5"}.', lo=0, hi=cl))
for i, (cl, V, D, T) in enumerate([(0.8, 12, 600, 10), (2.4, 30, 900, 6), (0.45, 7.5, 250, 12)], 1):
    k = cl / V; c = D / V * e(-k * T); C0 = D / V; nlo = math.floor(round(k, 4) * T / 0.693)
    amt_check = (CK(f'C0 = {F(C0,2)} mg/L. kt = {F(k,4)} × {T} is under 0.693, so less than one half-life has passed: the answer lies between half of C0 and C0.', lo=C0 / 2, hi=C0) if nlo == 0 else
                 CK(f'C0 = {F(C0,2)} mg/L. kt = {F(k,4)} × {T} is between {nlo} × 0.693 and {nlo+1} × 0.693, so {WORD[nlo]} to {WORD[nlo+1]} half-lives have passed and the answer lies between {PART[nlo+1]} and {PART[nlo]} of C0.', lo=C0 / 2 ** (nlo + 1), hi=C0 / 2 ** nlo))
    X('m4-amt', i, 4, 'clearance', 'clcalc', 'conctime',
      f'The average clearance and volume of distribution of a drug in the adult patient population are {cl} L/hr and {V:g} L, respectively. What is the expected plasma concentration {T} hours after a {D}-mg intravenous bolus dose of the drug?',
      'mg/L', c, 2,
      [('setup', f'k = {{{{frac:Cl|VD}}}} = {{{{frac:{cl} L/hr|{V:g} L}}}} = {F(k,4)} hr⁻¹', 'Clearance equals k times the volume, so dividing gives the rate constant.'),
       ('algebra', f'C = {{{{frac:{D} mg|{V:g} L}}}} e^(−({F(k,4)})({T})) = ({F(D/V,2)})({F(e(-k*T),4)}) = {F(c)} mg/L', 'C0 = D0/VD, then first-order decline for the stated time.')], T_CL,
      S('first-exp', ['cl-k-vd', 'cp-db-vd'], '"clearance and volume of distribution" with an "intravenous bolus dose": one-compartment bolus. Cl, VD, D0 and t are given and "the expected plasma concentration" at t is asked, so C = C0 e^(−kt). k first, from Cl = k × VD rearranged to k = Cl/VD, and C0 = D0/VD, because the line wants k and C0.'),
      asks='Cp',
      givens=[['Cl', f'{cl} L/hr', f'over VD: k = {{{{frac:Cl|VD}}}} = {F(k,4)} hr⁻¹'],
              ['VD', f'{V:g} L', f'under Cl for k, and under the dose: C0 = {F(C0,2)} mg/L'],
              ['t', f'{T} hours', f'the exponent kt = {F(k,4)} × {T}'],
              ['D0', f'{D}-mg', 'the amount over VD gives C0']],
      check=amt_check)
for i, (V, cl) in enumerate([(20, 250), (32, 180), (15, 90)], 1):
    t = 0.693 * V * 1000 / cl
    X('m4-k', i, 4, 'clearance', 'clcalc', 'krate',
      f'A new antibiotic is excreted by the kidney. The apparent volume of distribution is {V}L in the normal adult. The clearance of this drug is {cl} mL/min. What is the usual t½ for this drug?',
      'min', t, 1,
      [('unit', f'VD = {V} L = {V*1000:,} mL', 'Clearance is in mL/min, so the volume is put in mL and the half-life comes out in minutes.'),
       ('algebra', f't½ = {{{{frac:(0.693)({V*1000:,} mL)|{cl} mL/min}}}} = {F(t,1)} min', 'Millilitres cancel, leaving minutes; a larger clearance gives a shorter half-life.')], T_CL,
      S('thalf-cl-vd', [], '"apparent volume of distribution" and "clearance" of a drug "excreted by the kidney", with "the usual t½" asked: half-life from volume and clearance, Module 4. VD and Cl are given and t½ is asked, so t½ = {{frac:0.693 VD|ClT}} directly. The volume goes into mL to match mL/min, so the half-life comes out in minutes.'),
      asks='thalf',
      givens=[['VD', f'{V}L', f'{V} L = {V*1000:,} mL, to match mL/min; the numerator with 0.693'],
              ['Cl', f'{cl} mL/min', 'the denominator of t½ = {{frac:0.693 VD|Cl}}']],
      check=CK(f't½ is 0.693 of the time to clear a volume equal to VD once, {{{{frac:{V*1000:,} mL|{cl} mL/min}}}} min, so it is a little under that time and more than half of it. A larger clearance would shorten it.', lo=0.5 * V * 1000 / cl, hi=V * 1000 / cl))
for i, (age, sex, wkg, scr, hcm) in enumerate([(55, 'male', 88, 1.1, 180), (29, 'female', 70, 0.7, 160), (68, 'female', 59, 1.4, 155)], 1):
    inch = round(hcm / 2.54 - 60); ibw = (50 if sex == 'male' else 45.5) + 2.3 * inch
    cr = (140 - age) * ibw / (72 * scr) * (0.85 if sex == 'female' else 1)
    level = 'well below' if cr < 50 else 'below' if cr < 90 else 'near'
    fem = ', and the 0.85 factor lowers a female estimate' if sex == 'female' else ''
    X('m4-crcl', i, 4, 'clearance', 'crclcalc', 'crcl',
      f'Estimate the CrCl of a {age}-year-old {sex} who weighs {wkg} kg, SCr = {scr} mg/dL, and is {hcm} cm tall.',
      'mL/min', cr, 1,
      [('unit', f'{hcm} cm ÷ 2.54 = {F(hcm/2.54,2)} in → {inch} in over 5 ft; IBW = {50 if sex=="male" else 45.5} + 2.3({inch}) = {F(ibw,1)} kg', 'Her keys use ideal body weight from whole inches over five feet, not the weight given.'),
       ('algebra', f'CrCl = {"0.85 × " if sex=="female" else ""}{{{{frac:(140 − {age})({F(ibw,1)})|(72)({scr})}}}} = {F(cr,1)} mL/min', 'Cockcroft-Gault, with the 0.85 factor only for a female patient; reported in mL/min.')], T_CRCL,
      S('crcl', ['ibw-female' if sex == 'female' else 'ibw-male'], f'"Estimate the CrCl" of a "{sex}" with age, "SCr" and height picks Cockcroft-Gault. Age, SCr and the height are given and CrCl is asked, so CrCl = {{{{frac:(140 − age)(IBW)|72 × SCr}}}}{", times 0.85 for a female" if sex == "female" else ""}. IBW first, from the {sex} line with whole inches over 5 ft, because the line wants ideal body weight, not the weight given.'),
      asks='CrCl',
      givens=[['age', f'{age}-year-old', f'enters 140 − age = {140-age}'],
              ['sex', sex, 'picks the IBW line and the 0.85 factor' if sex == 'female' else 'picks the male IBW line; no female factor'],
              ['weight', f'{wkg} kg', 'not needed: her keys use ideal body weight from the height'],
              ['SCr', f'{scr} mg/dL', 'the denominator, multiplied by 72'],
              ['height', f'{hcm} cm', f'{inch} whole {"inch" if inch == 1 else "inches"} over 5 ft: IBW = {F(ibw,1)} kg, the numerator with 140 − age']],
      check=CK(f'A healthy young adult with SCr near 1 mg/dL clears roughly 100 mL/min. A {age}-year-old {sex} with SCr {scr} mg/dL should land {level} that{fem}; the result cannot be negative.', lo=0))

# ----------------------------------------------------------------- Module 5
for i, (D, Fp, V, h) in enumerate([(400, 85, 30, 6), (250, 70, 18, 4), (1000, 92, 50, 9)], 1):
    k = 0.693 / h; auc = Fp / 100 * D / (k * V); fhalf = Fp > 50
    X('m5-cl', i, 5, 'oral', 'conc', 'clearance',
      f'A single {D}-mg oral dose of a drug is given. The drug is {Fp}% bioavailable, the apparent volume of distribution is {V} L and the elimination half-life is {h} hours. What is the expected AUC?',
      '(mg/L)·hr', auc, 1,
      [('setup', f'ClT = k × VD = ({F(k,4)} hr⁻¹)({V} L) = {F(k*V,3)} L/hr', 'Clearance from the half-life and the volume; it does not depend on the route.'),
       ('algebra', f'AUC = {{{{frac:F D0|ClT}}}} = {{{{frac:({Fp/100:g})({D} mg)|{F(k*V,3)} L/hr}}}} = {F(auc,1)} (mg/L)·hr', 'Only the absorbed fraction reaches the plasma, so F multiplies the dose.')], T_ORAL,
      S('cl-auc', ['thalf-first', 'cl-k-vd'], '"single oral dose" that is "bioavailable" with VD and "elimination half-life", and "the expected AUC" asked. F, D0, VD and t½ are given, so the clearance line Cl = FD0/AUC is rearranged to AUC = FD0/Cl. k first, from the half-life, then Cl = k × VD, because the line wants Cl.'),
      asks='AUC',
      givens=[['D0', f'{D}-mg', 'with F: F D0 is the numerator'],
              ['F', f'{Fp}% bioavailable', f'read as {Fp/100:g}: the absorbed fraction multiplying the dose'],
              ['VD', f'{V} L', f'with k: Cl = k × VD = {F(k*V,3)} L/hr, the denominator'],
              ['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(k,4)} hr⁻¹']],
      check=CK(f'F = {Fp/100:g} is above 0.5 and below 1, so the AUC lies between half of {{{{frac:{D} mg|{F(k*V,3)} L/hr}}}} and all of it. The unit is (mg/L)·hr, and more drug absorbed means a larger area.', lo=0.5 * D / (k * V), hi=D / (k * V)) if fhalf else
            CK(f'F = {Fp/100:g} is below 1, so the AUC is below {{{{frac:{D} mg|{F(k*V,3)} L/hr}}}}. The unit is (mg/L)·hr, and more drug absorbed means a larger area.', lo=0, hi=D / (k * V)))
for i, mins in enumerate([30, 40, 120], 1):
    hrs = f'{mins/60:g}' if mins % 60 == 0 or mins == 30 else F(mins/60,4)
    kfrag = ('; it is exactly half an hour, so ka is twice 0.693' if mins == 30 else ', and below twice 0.693 because the half-life is longer than half an hour' if mins < 60 else
             '; it is exactly two hours, so ka is half of 0.693' if mins == 120 else '')
    k_check = (CK(f'A half-life of {mins} minutes is shorter than an hour, so ka is above 0.693 hr⁻¹{kfrag}; ka × {hrs} hr must give back 0.693.', lo=0.693, hi=None if mins == 30 else 2 * 0.693) if mins < 60 else
               CK(f'A half-life of {mins} minutes is longer than an hour, so ka is below 0.693 hr⁻¹{kfrag}; ka × {hrs} hr must give back 0.693.', lo=0, hi=0.693))
    X('m5-k', i, 5, 'oral', 'extravasc', 'krate',
      f'A drug given orally has a half-life of absorption of {mins} minutes. What is its absorption rate constant?',
      'hr⁻¹', 0.693 / (mins / 60), 4,
      [('unit', f'{mins} min = {mins/60:g} hr' if mins % 60 == 0 or mins == 30 else f'{mins} min = {F(mins/60,4)} hr', 'Rate constants in this course are per hour, so the absorption half-life goes into hours first.'),
       ('algebra', f'ka = {{{{frac:0.693|{F(mins/60,4)} hr}}}} = {F(0.693/(mins/60),4)} hr⁻¹', 'The absorption rate constant is 0.693 over the absorption half-life, the same first-order relation as k.')], T_ORAL,
      S('thalf-abs', [], '"given orally" with a "half-life of absorption": single oral dose, the absorption line. t½a is given and "its absorption rate constant" ka is asked, so t½a = 0.693/ka is rearranged to ka = 0.693/t½a. The minutes go into hours first, so ka comes out per hour; no hinge.'),
      asks='ka',
      givens=[['t½ absorption', f'{mins} minutes', f'goes into hours, {hrs} hr, then ka = 0.693 over it']],
      check=k_check)
for i, (D, A, k, ka, T) in enumerate([(600, 30.5, 0.15, 1.6, 2), (250, 12.8, 0.231, 2.1, 4), (900, 44.0, 0.0866, 0.95, 6)], 1):
    c = A * (e(-k * T) - e(-ka * T))
    X('m5-conc', i, 5, 'oral', 'conc', 'conctime',
      f'A drug given as a {D}-mg oral dose gives plasma concentrations described by Cp = {A}(e^(−{k}t) − e^(−{ka}t)), with Cp in mg/L and t in hours. What is the plasma concentration {T} hours after the dose?',
      'mg/L', c, 2,
      [('setup', f'Cp = {A}(e^(−({k})({T})) − e^(−({ka})({T})))', 'Put the time into both exponentials; the smaller exponent is elimination, the larger absorption.'),
       ('algebra', f'Cp = {A}({F(e(-k*T),4)} − {F(e(-ka*T),4)}) = {F(c)} mg/L', 'The difference of the two terms times the coefficient gives the concentration at that time.')], T_ORAL,
      S('oral-cp', [], '"oral dose" with "Cp = A(e^(−kt) − e^(−ka t))" is the single oral dose line, Cp = [F ka D0/(VD(ka − k))](e^(−kt) − e^(−ka t)), with its coefficient already evaluated. The coefficient, k, ka and t are given and Cp at t is asked, so the time goes into both exponentials. No hinge.'),
      asks='Cp',
      givens=[['D0', f'{D}-mg', 'not needed: the coefficient already holds F, D0 and VD'],
              ['coefficient', f'{A}', 'multiplies the bracket and carries the unit mg/L'],
              ['k', f'e^(−{k}t)', f'the smaller exponent, elimination: e^(−{k} × {T})'],
              ['ka', f'e^(−{ka}t)', f'the larger exponent, absorption: e^(−{ka} × {T})'],
              ['t', f'{T} hours', 'goes into both exponentials']],
      check=CK(f'Each exponential is below 1 and the bracket is their difference, so Cp is below the coefficient {A} mg/L. By {T} hr the absorption term is nearly gone, so Cp is a little under {A} × {F(e(-k*T),4)}.', lo=0, hi=A))
for i, (D, Fp, ma, h, V, ask) in enumerate([(500, 80, 30, 4, 25, 'c'), (250, 95, 60, 8, 40, 't'), (750, 75, 45, 5, 35, 'c')], 1):
    ka = 0.693 / (ma / 60); k = 0.693 / h; tm = ln(ka / k) / (ka - k)
    cm = Fp / 100 * D * ka / (V * (ka - k)) * (e(-k * tm) - e(-ka * tm))
    if ask == 't':
        X('m5-peak', i, 5, 'oral', 'peak', 'oral',
          f'A {D}-mg dose of a drug that is {Fp}% bioavailable is given by mouth. Its half-life of absorption is {ma} minutes, its elimination half-life is {h} hours and its VD is {V} L. When does the peak plasma concentration occur?',
          'hr', tm, 2,
          [('setup', f'ka = 0.693/{F(ma/60,2)} hr = {F(ka,4)} hr⁻¹; k = 0.693/{h} hr = {F(k,4)} hr⁻¹', 'Both rate constants come from their half-lives, with the absorption half-life in hours.'),
           ('algebra', f'tmax = {{{{frac:ln({F(ka,4)}/{F(k,4)})|({F(ka,4)} − {F(k,4)}) hr⁻¹}}}} = {F(tm)} hr', 'tmax depends only on ka and k; the dose, F and VD do not enter.')], T_ORAL,
          S('tmax', ['thalf-abs', 'thalf-first'], '"given by mouth" with "half-life of absorption" and "elimination half-life": single oral dose. Both half-lives are given and "when does the peak plasma concentration occur" is asked, so tmax = {{frac:ln(ka/k)|ka − k}}. ka first from t½a and k from t½, because the line wants the two rate constants, not the half-lives.'),
          asks='tmax',
          givens=[['D0', f'{D}-mg', 'not needed: tmax depends only on ka and k'],
                  ['F', f'{Fp}% bioavailable', 'not needed: tmax depends only on ka and k'],
                  ['t½ absorption', f'{ma} minutes', f'gives ka = {{{{frac:0.693|{F(ma/60,2)}}}}} = {F(ka,4)} hr⁻¹'],
                  ['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(k,4)} hr⁻¹'],
                  ['VD', f'{V} L', 'not needed: tmax depends only on ka and k']],
          check=CK(f'The peak comes once most of the absorption is over, so tmax is longer than the absorption half-life of {ma} minutes ({F(ma/60,2)} hr) and, because ka is far larger than k, shorter than the elimination half-life of {h} hr.', lo=ma / 60, hi=h))
    else:
        X('m5-peak', i, 5, 'oral', 'peak', 'oral',
          f'A {D}-mg dose of a drug that is {Fp}% bioavailable is given by mouth. Its half-life of absorption is {ma} minutes, its elimination half-life is {h} hours and its VD is {V} L. What is the peak plasma concentration?',
          'mg/L', cm, 2,
          [('setup', f'ka = {F(ka,4)} hr⁻¹; k = {F(k,4)} hr⁻¹; tmax = {{{{frac:ln(ka/k)|ka − k}}}} = {F(tm)} hr', 'The peak is the oral equation evaluated at tmax, so tmax comes first.'),
           ('algebra', f'Cmax = {{{{frac:({Fp/100:g})({D})({F(ka,4)})|({V})({F(ka-k,4)})}}}} (e^(−({F(k,4)})({F(tm)})) − e^(−({F(ka,4)})({F(tm)}))) = {F(cm)} mg/L', 'The coefficient carries F, the dose and the volume; the bracket is the difference of the two exponentials at the peak.')], T_ORAL,
          S('oral-cp', ['thalf-abs', 'thalf-first', 'tmax'], '"given by mouth" with "bioavailable", "half-life of absorption", "elimination half-life" and VD: single oral dose. F, D0, VD and both half-lives are given and "the peak plasma concentration" is asked, so the oral line Cp = [F ka D0/(VD(ka − k))](e^(−kt) − e^(−ka t)) is evaluated at tmax. ka and k first from their half-lives, then tmax.'),
          asks='Cmax',
          givens=[['D0', f'{D}-mg', 'the dose in the numerator with F and ka'],
                  ['F', f'{Fp}% bioavailable', f'read as {Fp/100:g}: multiplies the dose'],
                  ['t½ absorption', f'{ma} minutes', f'gives ka = {{{{frac:0.693|{F(ma/60,2)}}}}} = {F(ka,4)} hr⁻¹'],
                  ['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(k,4)} hr⁻¹'],
                  ['VD', f'{V} L', f'the denominator with (ka − k) = {F(ka-k,4)}']],
          check=CK(f'If the whole absorbed dose were in the volume at once the level would be {{{{frac:{Fp/100:g} × {D} mg|{V} L}}}}. Absorption is spread out while elimination runs, so Cmax is below that; with tmax = {F(tm)} hr shorter than the {h} hr half-life, it is above half of it.', lo=0.5 * Fp / 100 * D / V, hi=Fp / 100 * D / V))

# ----------------------------------------------------------------- Module 6
for i, (h, pct, dk, tau, w, ask) in enumerate([(6, 20, 8, 12, 70, 'max'), (3, 30, 5, 6, 60, 'min'), (5, 25, 12, 8, 80, 'avg')], 1):
    D = dk * w; V = pct / 100 * w; k = 0.693 / h; C0 = D / V; R = e(-k * tau)
    mx = C0 / (1 - R); val = {'max': mx, 'min': mx * R, 'avg': D / (V * k * tau)}[ask]
    word = {'max': 'maximum', 'min': 'minimum', 'avg': 'average'}[ask]
    hl = tau / h; wholeh = abs(hl - round(hl)) < 1e-9; ktau = k * tau
    hlfrag = f', {PART[round(hl)]} because τ = {tau} hr is {WORD[round(hl)]} half-lives of {h} hr' if wholeh else ''
    minfrag = (f': τ = {tau} hr is {WORD[round(hl)]} half-lives of {h} hr, so {PART[round(hl)]} of the printed peak {F(mx)} mg/L remains' if wholeh else
               f', so that fraction of the printed peak {F(mx)} mg/L remains')
    ss_check = {'max': CK(f'Cmax∞ is above the first-dose C0 = {F(C0)} mg/L. e^(−kτ) = {F(R,4)} of each dose remains at the next dose{hlfrag}, so the peak is C0 over (1 − {F(R,4)})' + (', under twice C0.' if R < 0.5 else '.'), lo=C0, hi=2 * C0 if R < 0.5 else None),
                'min': CK(f'The trough is the peak times e^(−kτ) = {F(R,4)}{minfrag}. It must lie below the first-dose C0 = {F(C0)} mg/L and above zero.', lo=0, hi=C0 if R < 0.5 else None),
                'avg': (CK(f'Cavg∞ = C0 over kτ, with C0 = {F(C0)} mg/L and kτ = {F(k,4)} × {tau}, a little over 1 because {tau} hr is more than 1.44 half-lives of {h} hr; so the average is a little under {F(C0)} mg/L and above half of it.', lo=C0 / 2, hi=C0) if 1 < ktau < 2 else
                        CK(f'Cavg∞ = C0 over kτ, with C0 = {F(C0)} mg/L and kτ = {F(k,4)} × {tau}; the average lies between the trough and the peak of the interval.'))}[ask]
    line = {'max': f'Cmax∞ = {{{{frac:{F(C0)}|1 − {F(R,4)}}}}} = {F(mx)} mg/L',
            'min': f'Cmin∞ = Cmax∞ × e^(−kτ) = ({F(mx)})({F(R,4)}) = {F(mx*R)} mg/L',
            'avg': f'Cavg∞ = {{{{frac:{D:g} mg|({V:g} L)({F(k,4)} hr⁻¹)({tau} hr)}}}} = {F(val)} mg/L'}[ask]
    X('m6-ss', i, 6, 'multi', 'ssbolus', 'multidose',
      f'An antibiotic has an average t½ of approximately {h} hours and an apparent VD that is {pct}% of body weight. The drug is to be administered {dk} mg/kg every {tau} hours by multiple IV bolus injections to a {w}-kg patient. What is the expected {word} concentration at steady state?',
      'mg/L', val, 2,
      [('unit', f'D0 = ({dk})({w}) = {D:g} mg; VD = ({pct/100:g})({w}) = {V:g} L; C0 = {F(C0)} mg/L; e^(−kτ) = e^(−({F(k,4)})({tau})) = {F(R,4)}', 'Dose and volume scale with weight; e^(−kτ) is the fraction of each dose left when the next is given.'),
       ('algebra', line, 'At steady state each dose adds to what is left of the earlier ones, so the peak is the single-dose C0 divided by 1 − e^(−kτ).')], T_MD,
      {'max': S('cmax-ss', ['thalf-first', 'cp-db-vd'], f'"every {tau} hours by multiple IV bolus injections" and "maximum concentration at steady state": repeated IV bolus at steady state. t½, VD as a percentage of weight, dose per kg and τ are given and Cmax∞ is asked, so Cmax,ss = {{{{frac:C0|1 − e^(−kτ)}}}}. k first, from the half-life, and C0 = D0/VD, because the line wants k and C0.'),
       'min': S('cmin-ss', ['thalf-first', 'cp-db-vd'], f'"every {tau} hours by multiple IV bolus injections" and "minimum concentration at steady state": repeated IV bolus at steady state. t½, VD as a percentage of weight, dose per kg and τ are given and Cmin∞ is asked, so Cmin,ss = {{{{frac:C0 e^(−kτ)|1 − e^(−kτ)}}}}, the steady-state maximum times e^(−kτ). k first, from the half-life, and C0 = D0/VD.'),
       'avg': S('cavg-ss', ['thalf-first', 'cl-k-vd'], f'"every {tau} hours by multiple IV bolus injections" and "average concentration at steady state": repeated IV bolus at steady state. t½, VD, dose per kg and τ are given and Cavg∞ is asked, so Cavg,ss = {{{{frac:F D0|ClT τ}}}}, written as D0 over VD k τ since Cl = k × VD, no F for IV. k first, from t½.')}[ask],
      asks={'max': 'Cmaxss', 'min': 'Cminss', 'avg': 'Cavgss'}[ask],
      givens=[['t½', f'approximately {h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(k,4)} hr⁻¹'],
              ['VD', f'{pct}% of body weight', f'read as {pct/100:g} L/kg: VD = {V:g} L'],
              ['D0', f'{dk} mg/kg', f'times the weight: D0 = {D:g} mg; C0 = {{{{frac:D0|VD}}}} = {F(C0)} mg/L'],
              ['τ', f'every {tau} hours', f'the exponent kτ = {F(k,4)} × {tau}; e^(−kτ) = {F(R,4)}'],
              ['weight', f'{w}-kg', 'scales both the dose and the volume']],
      check=ss_check)
for i, (D, V, h, tau, n, t) in enumerate([(400, 25, 6, 8, 3, 2), (250, 18, 4, 6, 4, 1), (600, 40, 8, 12, 2, 6)], 1):
    k = 0.693 / h; C0 = D / V
    acc = (1 - e(-n * k * tau)) / (1 - e(-k * tau)); c = C0 * acc * e(-k * t); nlo = math.floor(t / h)
    n_check = (CK(f'Right after dose {n} the level is C0 × {F(acc,4)} = {F(C0)} × {F(acc,4)} mg/L, above the single-dose C0. Then {t} hr of decline, less than one half-life of {h} hr, removes under half, so the answer lies between half of that and all of it.', lo=C0 * acc / 2, hi=C0 * acc) if nlo == 0 else
               CK(f'Right after dose {n} the level is C0 × {F(acc,4)} = {F(C0)} × {F(acc,4)} mg/L, above the single-dose C0. Then {t} hr of decline is {WORD[nlo]} to {WORD[nlo+1]} half-lives of {h} hr, so the answer lies between {PART[nlo+1]} and {PART[nlo]} of that.', lo=C0 * acc / 2 ** (nlo + 1), hi=C0 * acc / 2 ** nlo))
    X('m6-n', i, 6, 'multi', 'ndose', 'multidose',
      f'A drug with a half-life of {h} hours and a VD of {V} L is given as {D}-mg IV bolus doses every {tau} hours. What is the plasma concentration {t} hours after the dose number {n}?',
      'mg/L', c, 2,
      [('setup', f'Cp = {{{{frac:D0|VD}}}} ({{{{frac:1 − e^(−nkτ)|1 − e^(−kτ)}}}}) e^(−kt), n = {n}, t = {t} hr after that dose', 'Before steady state the n-dose bracket counts how much of the earlier doses is still present.'),
       ('algebra', f'Cp = ({F(C0)})({{{{frac:1 − {F(e(-n*k*tau),4)}|1 − {F(e(-k*tau),4)}}}}})({F(e(-k*t),4)}) = ({F(C0)})({F(acc,4)})({F(e(-k*t),4)}) = {F(c)} mg/L', 'Superposition: the doses add because the kinetics are first order.')], T_MD,
      S('cp-n', ['thalf-first', 'cp-db-vd'], f'"IV bolus doses every {tau} hours" and a time "after the dose number {n}": repeated IV bolus before steady state. D0, VD, t½, τ, n and t are given and Cp is asked, so Cp = (D0/VD)[(1 − e^(−nkτ))/(1 − e^(−kτ))]e^(−kt). k first, from the half-life, and C0 = D0/VD, because the line wants k and C0.'),
      asks='Cpn',
      givens=[['t½', f'{h} hours', f'gives k = {{{{frac:0.693|{h}}}}} = {F(k,4)} hr⁻¹'],
              ['VD', f'{V} L', f'under the dose: C0 = {F(C0)} mg/L'],
              ['D0', f'{D}-mg', 'the amount over VD gives C0'],
              ['τ', f'every {tau} hours', f'in both exponents of the bracket: kτ = {F(k,4)} × {tau}'],
              ['t', f'{t} hours', 'after dose n: the final exponent e^(−kt)'],
              ['n', f'dose number {n}', 'the count in 1 − e^(−nkτ)']],
      check=n_check)
for i, (D, T, k, V) in enumerate([(500, 1, 0.2, 20), (240, 2, 0.12, 16), (900, 1.5, 0.3, 30)], 1):
    R = D / T; c = R / (k * V) * (1 - e(-k * T))
    X('m6-inf1', i, 6, 'intermit', 'why', 'infusion',
      f'A {D}-mg dose of an antibiotic is administered as an intravenous (IV) infusion over a period of {T:g} hours (k = {k} hr⁻¹, VD = {V} L). What is the plasma concentration at the end of the infusion?',
      'mg/L', c, 2,
      [('setup', f'R = {{{{frac:{D} mg|{T:g} hr}}}} = {F(R,1)} mg/hr', 'An infusion delivers its dose at a constant rate, the dose divided by the infusion time.'),
       ('algebra', f'C = {{{{frac:{F(R,1)}|({k})({V})}}}}(1 − e^(−({k})({T:g}))) = ({F(R/(k*V))})({F(1-e(-k*T),4)}) = {F(c)} mg/L', 'The bracket uses the infusion time: the level climbs toward R/(kV) only while drug is going in.')], T_II,
      S('cp-infusing', ['r-dose-time', 'cl-k-vd'], '"administered as an intravenous (IV) infusion over a period of" hours, concentration "at the end of the infusion" asked: an infusion before steady state. D0, the infusion time, k and VD are given, so Cp = (R/Cl)(1 − e^(−kt)) with t the infusion time. R first, as the dose over the infusion time, and Cl = k × VD.'),
      asks='Cp',
      givens=[['D0', f'{D}-mg', f'over the infusion time: R = {F(R,1)} mg/hr'],
              ['infusion time', f'{T:g} hours', 'under D0 for R, and the time t in the exponent'],
              ['k', f'{k} hr⁻¹', f'the exponent kt = {k} × {T:g}; with VD under R'],
              ['VD', f'{V} L', 'with k under R: R over kVD is the plateau the infusion heads for']],
      check=CK(f'A bolus of the whole dose would give {{{{frac:{D} mg|{V} L}}}}; an infusion ends lower because elimination runs during the {T:g} hr. kt = {k} × {T:g} is under 0.693, so under half is lost: the answer is between half of that bolus level and all of it.', lo=D / V / 2, hi=D / V))
for i, (D, T, gap, k, V, at) in enumerate([(400, 2, 8, 0.1, 20, 14), (300, 1, 6, 0.2, 15, 10), (600, 2, 12, 0.08, 35, 18)], 1):
    R = D / T; cend = R / (k * V) * (1 - e(-k * T))
    c1 = cend * e(-k * (at - T)); c2 = cend * e(-k * (at - gap - T))
    X('m6-infadd', i, 6, 'intermit', 'add', 'multidose',
      f'{D} mg of a drug (k = {k} hr⁻¹, VD = {V} L) is infused over {T:g} hours. Exactly {gap} hours after the first infusion began, a second {D}-mg dose is infused over {T:g} hours. What is the plasma concentration {at} hours after the first infusion began?',
      'mg/L', c1 + c2, 2,
      [('setup', f'Each infusion ends at {F(cend)} mg/L; dose 1 has declined {at-T:g} hr and dose 2 {at-gap-T:g} hr by {at} hr', 'Each dose gets its own time measured from the end of that infusion; the two contributions add.'),
       ('algebra', f'C = {F(cend)}e^(−({k})({at-T:g})) + {F(cend)}e^(−({k})({at-gap-T:g})) = {F(c1)} + {F(c2)} = {F(c1+c2)} mg/L', 'Superposition: with first-order kinetics each infusion behaves as if the other were not there.')], T_II,
      S('cp-after-stop', ['r-dose-time', 'cl-k-vd', 'cp-infusing'], '"infused over" hours, then "a second dose is infused", concentration "after the first infusion began" asked: intermittent infusions that add. D0, infusion time, k, VD and the times are given, so each infusion ends at Cend from Cp = (R/Cl)(1 − e^(−kt)), then falls by Cp = Cpeak e^(−kt) from its own end, Cpeak = Cend; the two are summed.'),
      asks='Cp',
      givens=[['D0', f'{D} mg', f'each infusion: R = {{{{frac:{D} mg|{T:g} hr}}}} = {F(R,1)} mg/hr'],
              ['k', f'{k} hr⁻¹', 'in every exponent, and with VD under R'],
              ['VD', f'{V} L', f'with k under R: each infusion ends at {F(cend)} mg/L'],
              ['infusion time', f'over {T:g} hours', 'each decline is clocked from the end of its own infusion'],
              ['second dose', f'{gap} hours after the first infusion began', f'dose 2 ends at {gap+T:g} hr'],
              ['t', f'{at} hours', f'dose 1 has declined {at-T:g} hr and dose 2 {at-gap-T:g} hr by then']],
      check=CK(f'Each infusion ends at {F(cend)} mg/L and then falls, so neither term exceeds {F(cend)} and the sum is under twice {F(cend)} mg/L. Dose 2 has declined only {at-gap-T:g} hr, with k × that under 0.693, so it alone contributes more than half of {F(cend)}.', lo=cend / 2, hi=2 * cend))
for i, (D, Fp, V, k, ka, tau, ask) in enumerate([(500, 80, 60, 0.0866, 1.2, 12, 'avg'), (250, 90, 40, 0.1155, 1.5, 8, 'min'), (300, 70, 50, 0.0693, 0.8, 12, 'tmax')], 1):
    f = Fp / 100
    rise = f * D / V; Rt = e(-k * tau); ktau = k * tau; tm1 = ln(ka / k) / (ka - k)
    o_check = {'avg': (CK(f'Each absorbed dose raises the level by {{{{frac:{f:g} × {D} mg|{V} L}}}}; Cavg∞ is that rise over kτ = {k} × {tau}, a little above 1 ({tau} hr exceeds 1.44 half-lives), so the average is a little under the rise and above half of it.', lo=rise / 2, hi=rise) if 1 < ktau < 2 else
                       CK(f'Each absorbed dose raises the level by {{{{frac:{f:g} × {D} mg|{V} L}}}}; Cavg∞ is that rise over kτ = {k} × {tau}, and it lies between the trough and the peak.')),
               'min': CK(f'Each dose raises the level by {{{{frac:{f:g} × {D} mg|{V} L}}}}, and e^(−kτ) = {F(Rt,4)} of a dose is left at the next one, so an IV trough would be that rise times {{{{frac:{F(Rt,4)}|1 − {F(Rt,4)}}}}}; slow absorption lifts the oral trough above it, below the peak.', lo=rise * Rt / (1 - Rt), hi=rise / (1 - Rt)),
               'tmax': CK(f'At steady state the peak comes earlier than after a single dose, whose tmax = {{{{frac:ln(ka ÷ k)|ka − k}}}} with ka = {ka} and k = {k} hr⁻¹ is a few hours, so tmax∞ is positive and shorter than that single-dose tmax.', lo=0, hi=tm1)}[ask]
    o_roles = {'avg': ('with F: F D0 is the numerator', f'in the denominator: kτ = {k} × {tau}', 'the absorbed fraction multiplying the dose', 'in the denominator with k and τ', 'in the denominator with VD and τ', 'not needed: the average does not depend on the absorption rate'),
               'min': ('with F and ka in the numerator', f'in the exponents: e^(−kτ) = {F(Rt,4)}', 'the absorbed fraction multiplying the dose', 'in the denominator with (ka − k)', f'in (ka − k) = {F(ka-k,4)} and in the exponents', f'in the numerator and in (ka − k) = {F(ka-k,4)}'),
               'tmax': ('not needed: the peak time depends only on ka, k and τ', f'in both exponents: e^(−kτ) = {F(Rt,4)} and e^(−ka τ) = {F(e(-ka*tau),4)}', 'not needed: the peak time depends only on ka, k and τ', 'not needed: the peak time depends only on ka, k and τ', f'in (ka − k) = {F(ka-k,4)}, the exponent kτ and the denominator of the log', 'in (ka − k), the exponent ka τ and the numerator of the log')}[ask]
    if ask == 'avg':
        val = f * D / (V * k * tau); line = f'Cavg∞ = {{{{frac:({f:g})({D} mg)|({V} L)({k} hr⁻¹)({tau} hr)}}}} = {F(val)} mg/L'; units = 'mg/L'; word = 'the average plasma concentration at steady state'
    elif ask == 'min':
        val = ka * f * D / (V * (ka - k)) / (1 - e(-k * tau)) * e(-k * tau); line = f'Cmin∞ = {{{{frac:({ka})({f:g})({D})|({V})({F(ka-k,4)})}}}} ({{{{frac:1|1 − {F(e(-k*tau),4)}}}}})({F(e(-k*tau),4)}) = {F(val)} mg/L'; units = 'mg/L'; word = 'the minimum plasma concentration at steady state'
    else:
        val = 1 / (ka - k) * ln(ka * (1 - e(-k * tau)) / (k * (1 - e(-ka * tau)))); line = f'tmax∞ = {{{{frac:1|{F(ka-k,4)}}}}} ln[{{{{frac:({ka})(1 − {F(e(-k*tau),4)})|({k})(1 − {F(e(-ka*tau),4)})}}}}] = {F(val)} hr'; units = 'hr'; word = 'the time of the peak after a dose at steady state'
    X('m6-oral', i, 6, 'multoral', 'ossc', 'multidose' if ask != 'tmax' else 'oral',
      f'A patient receives {D} mg of a drug orally every {tau} hours. F = {f:g}, VD = {V} L, k = {k} hr⁻¹ and ka = {ka} hr⁻¹. What is {word}?',
      units, val, 2,
      [('setup', {'avg': 'Cavg∞ = {{frac:F D0|VD k τ}}', 'min': 'Cmin∞ = {{frac:ka F D0|VD(ka − k)}} ({{frac:1|1 − e^(−kτ)}}) e^(−kτ)', 'tmax': 'tmax∞ = {{frac:1|ka − k}} ln[{{frac:ka(1 − e^(−kτ))|k(1 − e^(−ka τ))}}]'}[ask],
        'At steady state the oral equations carry the accumulation factor 1/(1 − e^(−kτ)); the average needs only F, dose, VD, k and τ.'),
       ('algebra', line, 'Each factor in the equation is filled in from the stem; the units reduce to the unit asked for.')], T_MO,
      {'avg': S('cavg-ss', ['cl-k-vd'], f'"orally every {tau} hours" with "F", VD, k and ka: multiple oral doses at steady state. F, D0, VD, k and τ are given and "the average plasma concentration at steady state" is asked, so Cavg,ss = {{{{frac:F D0|ClT τ}}}}, written as F D0 over VD k τ with Cl = k × VD. ka does not enter; no hinge.'),
       'min': S('cmin-ss-oral', [], f'"orally every {tau} hours" with "F", VD, k and ka: multiple oral doses at steady state. F, D0, VD, k, ka and τ are given and "the minimum plasma concentration at steady state" is asked, so the oral trough line Cmin,ss = [ka F D0/(VD(ka − k))][1/(1 − e^(−kτ))]e^(−kτ) is filled in directly. No hinge: both rate constants are given.'),
       'tmax': S('tmax-ss', [], f'"orally every {tau} hours" with k and ka: multiple oral doses at steady state. k, ka and τ are given and "the time of the peak after a dose at steady state" is asked, so tmax,ss = [1/(ka − k)] ln[{{frac:ka(1 − e^(−kτ))|k(1 − e^(−ka τ))}}]. F, D0 and VD do not enter; no hinge.')}[ask],
      asks={'avg': 'Cavgss', 'min': 'Cminss', 'tmax': 'tmaxss'}[ask],
      givens=[['D0', f'{D} mg', o_roles[0]], ['τ', f'every {tau} hours', o_roles[1]], ['F', f'{f:g}', o_roles[2]],
              ['VD', f'{V} L', o_roles[3]], ['k', f'{k} hr⁻¹', o_roles[4]], ['ka', f'{ka} hr⁻¹', o_roles[5]]],
      check=o_check)

HEADER = '''/* ==========================================================================
   EXTRA PRACTICE (written for this drill)
   ==========================================================================
   Problems in her formats with numbers that are not hers, kept out of the
   main bank: EXTRAS never reach QUESTIONS, the exam simulator or the module
   counts. Written by src/gen/extra.py, which computes every answer from the
   stem's numbers. Edit the generator, not this file.
   ========================================================================== */'''
write_plain(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'q11_extra.js'), 'EXTRAS', HEADER)
