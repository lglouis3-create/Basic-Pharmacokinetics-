"""Her homework problems, her wording, with the numbers changed.

The graded homework stays hers: every stem below keeps her sentences and
swaps the inputs for new ones in the same range, so the problem reads as she
writes it but none of the answers is a graded answer. Every answer is
computed here from the new inputs by her own method (her worked keys are in
STYLE.md), and the printed working uses the same rounded values the answer
does. Run:  python3 gen/ws_homework.py   (writes q10_homework.js)
"""
import math, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import wslib
from wslib import num, mc, chain, write
ln, e = math.log, math.exp
f2 = lambda x: f'{x:.2f}'
f1 = lambda x: f'{x:.1f}'
f3 = lambda x: f'{x:.3f}'
f4 = lambda x: f'{x:.4f}'
NOTE = 'Her homework wording with different numbers, so this is not the graded answer.'

T_ORDER = [{'h': 'Deciding the order from a table', 'list': [
    'Zero order: the same amount is lost in each equal time step, so C against t is a straight line.',
    'First order: the same fraction is lost in each equal time step, so ln C against t is a straight line.',
    'Check equal time steps: constant differences mean zero order; constant ratios mean first order.']}]
T_K1 = [{'h': 'First order from two points', 'list': [
    'k = {{frac:ln(C1/C2)|t2 − t1}}, in reciprocal time.',
    't½ = {{frac:0.693|k}}.',
    'Back to time zero: ln C0 = ln Ct + kt, so C0 = Ct e^(kt).',
    'Volume = amount ÷ concentration; mg ÷ (mcg/mL) needs the mg turned into mcg first.',
    'A 75% fall leaves 25%, which is two half-lives.']}]
T_K0 = [{'h': 'Zero order from a table', 'list': [
    'k0 = {{frac:A1 − A2|t2 − t1}}, an amount per unit time.',
    'Back to time zero: A0 = At + k0 t.',
    't½ = {{frac:A0|2k0}}: the zero-order half-life depends on the starting amount.']}]
T_TWO = [{'h': 'Half-life from two points, both orders', 'list': [
    'First order: k = {{frac:ln(C0/C)|t}}, then t½ = {{frac:0.693|k}}.',
    'Zero order: k0 = {{frac:C0 − C|t}}, then t½ = {{frac:C0|2k0}}.',
    'The same two points give different half-lives, which is why the order has to be known first.']}]
T_BOLUS = [{'h': 'One-compartment IV bolus from two points', 'list': [
    'k = {{frac:ln(C1/C2)|t2 − t1}}; t½ = {{frac:0.693|k}}.',
    'C0 = C1 e^(k t1), extrapolating back to time zero.',
    'VD = {{frac:Dose|C0}}; the dose in mg/kg is multiplied by the weight first (lb ÷ 2.2 = kg).',
    'Fraction eliminated: 50% at 1 t½, 75% at 2, 87.5% at 3, whatever the dose.',
    'Cl = k × VD.']}]
T_BIEXP = [{'h': 'The two-compartment equation', 'list': [
    'Cp = A e^(−αt) + B e^(−βt); α is the larger exponent (distribution), β the smaller (elimination).',
    'Elimination half-life t½β = {{frac:0.693|β}}.',
    'At t = 0 both exponentials are 1, so Cp0 = A + B.',
    'Volume of the central compartment Vp = {{frac:D0|A + B}}.']}]
T_INF = [{'h': 'Continuous IV infusion', 'list': [
    'Css = {{frac:R|Cl}}, so R = Css × Cl.',
    'k = {{frac:Cl|VD}}; t½ = {{frac:0.693|k}}.',
    'During the infusion: C = {{frac:R|Cl}}(1 − e^(−kt)).',
    'Fraction of Css reached = 1 − e^(−kt); 95% takes ln(20)/k, about 4.32 half-lives, whatever the rate.',
    'Loading dose DL = Css × VD. After the infusion stops: C = Css e^(−kt).',
    'Doubling R doubles Css but does not change the time to reach it.']}]
T_CRCL = [{'h': 'Creatinine clearance', 'list': [
    'Height in cm ÷ 2.54 = inches; count the inches over 60 and round to a whole inch, as her keys do.',
    'IBW: male 50 + 2.3 × (inches over 5 ft); female 45.5 + 2.3 × (inches over 5 ft).',
    'CrCl = {{frac:(140 − age)(IBW)|72 × SCr}}, × 0.85 if female; reported in mL/min.']}]
T_CL = [{'h': 'Clearance after an IV bolus', 'list': [
    'Dose and VD scale with weight: mg/kg × kg, L/kg × kg.',
    'C = {{frac:D0|VD}} e^(−kt); AUC = {{frac:D0|ClT}} = {{frac:D0|kVD}}.',
    'fe = {{frac:amount unchanged in urine|dose}}; ke = fe × k; ClR = fe × ClT; ClH = ClT − ClR.',
    'Compare ClR in mL/min with a GFR of about 120 mL/min to name the renal mechanism.',
    'Same AUC at a new clearance: new dose = AUC × new Cl.']}]
T_ORAL = [{'h': 'One oral dose', 'list': [
    'k = 0.693/t½; ka = 0.693/t½ absorption, with the absorption half-life in hours.',
    'tmax = {{frac:ln(ka/k)|ka − k}}: it does not depend on the dose.',
    'Cmax = {{frac:F ka D0|VD(ka − k)}} (e^(−k tmax) − e^(−ka tmax)): proportional to the dose.',
    'AUC = {{frac:F D0|k VD}}: proportional to the dose.']}]
T_MULTI = [{'h': 'Repeated IV bolus at steady state', 'list': [
    'C0 = {{frac:D0|VD}} for one dose; k = 0.693/t½.',
    'Cmax∞ = {{frac:C0|1 − e^(−kτ)}}; Cmin∞ = Cmax∞ e^(−kτ).',
    'Cavg∞ = {{frac:D0|VD k τ}}, below the midpoint of peak and trough.',
    'After the last dose the level falls from Cmax∞: C = Cmax∞ e^(−kt).']}]
H = lambda n: f'Homework-{n}.pdf'
M1 = dict(module=1, lecture='L01', exam=1, topic='orders')

# ---------------------------------------------------------------- HW1 P1
C0, k = 240.0, 0.115
ts = [0.5, 1, 2, 4, 8, 12, 16]
cs = [round(C0 * e(-k * t), 1) for t in ts]
tab = '\n'.join(f'{t:g} | {c}' for t, c in zip(ts, cs))
S = ('1. A pharmacist dissolved 300 milligrams of a new antibiotic drug into a volume of purified water and placed the solution in a refrigerator (4°C). '
     'At various time intervals, the pharmacist removed a small aliquot from the solution and measured the amount of drug contained in each aliquot. The following data were obtained.\n\n'
     f'Time (hr) | Drug (mcg/mL)\n{tab}\n\n')
kk = ln(cs[1] / cs[6]) / 15; th = 0.693 / kk; c0 = cs[1] * e(kk * 1); vol = 300000 / c0
p = [mc('hw1-1a', stem=S + 'a. Is the decomposition of this antibiotic a first-order or a zero-order process?', **M1, sub='decide', skill='order', concept='order-from-table',
        options=[('First order', True, f'Over each 4-hour step from 4 to 16 hr the concentration falls by the same fraction ({f2(cs[3]/cs[4])}, {f2(cs[4]/cs[5])}, {f2(cs[5]/cs[6])}), so ln C against time is a straight line.'),
                 ('Zero order', False, f'Zero order needs equal drops in equal times. From 4 to 8 hr it falls {f1(cs[3]-cs[4])} mcg/mL but from 12 to 16 hr only {f1(cs[5]-cs[6])}: the drops shrink.'),
                 ('Neither: it needs a third plot', False, 'Two plots settle it: C against t curves, ln C against t is straight, so the process is first order with no third test needed.')],
        teach=T_ORDER, note=NOTE, cite=f'{H(1)}, problem 1a (her wording; numbers changed)'),
     num('hw1-1b', stem=S + 'b. What is the rate constant k for the decomposition of this antibiotic?', units='hr⁻¹', ans=round(kk, 4), calc=k, **M1, sub='decide', skill='krate', concept='first-order-k-from-table',
         steps=[('setup', 'k = {{frac:ln(C1) − ln(C2)|t2 − t1}}, with t1 = 1 hr and t2 = 16 hr', 'Two points far apart on the straight ln C line give the slope; her key uses the 1 hr and 16 hr points.'),
                ('algebra', f'k = {{{{frac:ln({cs[1]}) − ln({cs[6]})|15 hr}}}} = {{{{frac:{f4(ln(cs[1]/cs[6]))}|15 hr}}}} = {f4(kk)} hr⁻¹', 'The concentration units cancel inside the logarithm, so dividing by hours leaves reciprocal hours.')],
         teach=T_K1, note=NOTE, cite=f'{H(1)}, problem 1b (her wording; numbers changed)'),
     num('hw1-1c', stem=S + 'c. What is the half-life t½?', units='hr', ans=round(th, 2), calc=0.693 / k, **M1, sub='half', skill='krate', concept='thalf-from-k',
         steps=[('setup', f't½ = {{{{frac:0.693|k}}}} = {{{{frac:0.693|{f4(kk)} hr⁻¹}}}} = {f2(th)} hr', 'The first-order half-life is 0.693 over k; reciprocal hours in the denominator leave hours.')],
         teach=T_K1, note=NOTE, cite=f'{H(1)}, problem 1c (her wording; numbers changed)'),
     num('hw1-1d', stem=S + 'd. What was the initial volume of water used to prepare the original solution?', units='mL', ans=round(vol), calc=300000 / C0, **M1, sub='first', skill='vddose', concept='volume-from-c0',
         steps=[('setup', f'ln C0 = ln C + kt = ln({cs[1]}) + ({f4(kk)})(1) → C0 = {f1(c0)} mcg/mL', 'Extrapolating the straight ln C line back to time zero gives the concentration the moment the drug dissolved.'),
                ('unit', '300 mg × 1000 mcg/mg = 300,000 mcg', 'The amount is put in micrograms so it matches the mcg/mL concentration and the volume comes out in mL.'),
                ('algebra', f'V = {{{{frac:300,000 mcg|{f1(c0)} mcg/mL}}}} = {round(vol)} mL', 'Amount divided by concentration gives volume: micrograms cancel and millilitres are left.')],
         teach=T_K1, note=NOTE, cite=f'{H(1)}, problem 1d (her wording; numbers changed)'),
     num('hw1-1e', stem=S + 'e. How much time is required for the concentration of drug to decrease by 75%?', units='hr', ans=round(2 * th, 2), calc=2 * 0.693 / k, **M1, sub='half', skill='krate', concept='time-to-fraction',
         steps=[('setup', f't = {{{{frac:ln(C0/C)|k}}}} = {{{{frac:ln(1/0.25)|{f4(kk)} hr⁻¹}}}}', 'A 75% decrease leaves 25% of the starting concentration, so C0/C = 4 whatever the starting value.'),
                ('algebra', f't = {{{{frac:1.3863|{f4(kk)} hr⁻¹}}}} = {f2(2*th)} hr = 2 × {f2(th)} hr', 'Falling to 25% is exactly two half-lives, which checks the answer against part c.')],
         teach=T_K1, note=NOTE, cite=f'{H(1)}, problem 1e (her wording; numbers changed)')]
chain('hw1-p1', src='homework', module=1, name='Homework 1, problem 1: an antibiotic in solution (numbers changed)', setup='300 mg dissolved; seven concentrations from 0.5 to 16 hr; parts a–e', parts=p)

# ---------------------------------------------------------------- HW1 P2
A0, k0 = 520, 24
ts2 = [0.5, 1, 2, 3, 6, 9, 12, 16]
am = [A0 - k0 * t for t in ts2]
tab2 = '\n'.join(f'{t:g} | {a:g}' for t, a in zip(ts2, am))
S2 = f'2. Below is the decrease in the amount of drug as a function of time.\n\nTime (hr) | Drug A (mg)\n{tab2}\n\n'
p = [mc('hw1-2a', stem=S2 + 'a. Does the decrease in the amount of drug A appear to be a zero-order or a first-order process?', **M1, sub='decide', skill='order', concept='order-from-table',
        options=[('Zero order', True, f'Each 3-hour step from 3 to 12 hr loses the same {3*k0} mg, so the amount against time is a straight line on ordinary axes.'),
                 ('First order', False, f'First order loses the same fraction per step. From 3 to 6 hr the ratio is {f3(am[3]/am[4])}, from 9 to 12 hr {f3(am[5]/am[6])}: the fraction grows, the amount lost does not.'),
                 ('Cannot tell without logarithms', False, 'Equal drops in equal times already show a straight line on ordinary axes, which is the zero-order signature.')],
        teach=T_ORDER, note=NOTE, cite=f'{H(1)}, problem 2a (her wording; numbers changed)'),
     num('hw1-2b', stem=S2 + 'b. What is the rate constant k?', units='mg/hr', ans=k0, calc=(am[1] - am[7]) / 15, **M1, sub='zero', skill='krate', concept='zero-order-k',
         steps=[('setup', 'k0 = {{frac:A1 − A2|t2 − t1}}', 'For zero order the rate constant is the constant amount lost per unit time, the slope of amount against time.'),
                ('algebra', f'k0 = {{{{frac:{am[1]:g} mg − {am[7]:g} mg|16 hr − 1 hr}}}} = {{{{frac:{am[1]-am[7]:g} mg|15 hr}}}} = {k0} mg/hr', 'Milligrams over hours: an amount per unit time, the unit of a zero-order rate constant.')],
         teach=T_K0, note=NOTE, cite=f'{H(1)}, problem 2b (her wording; numbers changed)'),
     num('hw1-2c', stem=S2 + 'c. What is the half-life t½?', units='hr', ans=round(A0 / (2 * k0), 2), calc=A0 / (2 * k0), **M1, sub='half', skill='krate', concept='zero-order-thalf',
         steps=[('setup', f'A0 = A + k0 t = {am[0]:g} mg + ({k0} mg/hr)(0.5 hr) = {A0} mg', 'The zero-order half-life needs the starting amount, so the line is extended back to time zero.'),
                ('algebra', f't½ = {{{{frac:A0|2k0}}}} = {{{{frac:{A0} mg|2({k0} mg/hr)}}}} = {f2(A0/(2*k0))} hr', 'Milligrams cancel and hours are left; unlike first order, this half-life depends on how much drug there is.')],
         teach=T_K0, note=NOTE, cite=f'{H(1)}, problem 2c (her wording; numbers changed)')]
chain('hw1-p2', src='homework', module=1, name='Homework 1, problem 2: drug A by amount (numbers changed)', setup='Eight amounts from 0.5 to 16 hr; order, k and half-life', parts=p)

# ---------------------------------------------------------------- HW1 P3
Ci, Cf, T = 280, 84, 30
k1 = ln(Ci / Cf) / T; k0b = (Ci - Cf) / T
S3 = f'3. A solution of a drug was freshly prepared at a concentration of {Ci} mg/mL. After {T} days at 25°C, the drug concentration in the solution was {Cf} mg/mL. '
p = [num('hw1-3a', stem=S3 + 'a. Assuming first-order kinetics, when will the drug decline to one-half of the original concentration?', units='days', ans=round(0.693 / k1, 2), calc=0.693 / k1, **M1, sub='half', skill='krate', concept='thalf-both-orders',
         steps=[('setup', f'k = {{{{frac:ln({Ci}/{Cf})|{T} days}}}} = {{{{frac:{f4(ln(Ci/Cf))}|{T} days}}}} = {f4(k1)} day⁻¹', 'The first-order rate constant from two points; the time is in days, so k is per day.'),
                ('algebra', f't½ = {{{{frac:0.693|{f4(k1)} day⁻¹}}}} = {f2(0.693/k1)} days', 'The first-order half-life is 0.693 over k and does not depend on the starting concentration.')],
         teach=T_TWO, note=NOTE, cite=f'{H(1)}, problem 3a (her wording; numbers changed)'),
     num('hw1-3b', stem=S3 + 'b. Assuming zero-order kinetics, when will the drug decline to one-half of the original concentration?', units='days', ans=round(Ci / (2 * k0b), 2), calc=Ci / (2 * k0b), **M1, sub='half', skill='krate', concept='thalf-both-orders',
         steps=[('setup', f'k0 = {{{{frac:{Ci} − {Cf} mg/mL|{T} days}}}} = {f4(k0b)} (mg/mL)/day', 'The zero-order rate constant is the amount lost per day: a concentration per unit time.'),
                ('algebra', f't½ = {{{{frac:C0|2k0}}}} = {{{{frac:{Ci} mg/mL|2({f4(k0b)} (mg/mL)/day)}}}} = {f2(Ci/(2*k0b))} days', 'The concentration units cancel and days are left; the zero-order half-life uses the starting concentration.')],
         teach=T_TWO, note=NOTE, cite=f'{H(1)}, problem 3b (her wording; numbers changed)')]
chain('hw1-p3', src='homework', module=1, name='Homework 1, problem 3: one-half of the original, both orders (numbers changed)', setup=f'{Ci} mg/mL falling to {Cf} mg/mL in {T} days', parts=p)

# ---------------------------------------------------------------- HW2 P1
M2 = dict(module=2, lecture='L02', exam=1, topic='bolus1', sub='calc')
lb, dpk = 176, 15
wt = lb / 2.2; D = dpk * wt
c1, c2 = round(96 * e(-0.12 * 2), 1), round(96 * e(-0.12 * 8), 1)
kb = ln(c1 / c2) / 6; c0b = c1 * e(kb * 2); Vb = D / c0b
S = (f'1. A {lb}-lb male received a single IV bolus dose of an antibacterial agent at a dose level of {dpk} mg/kg. The concentration of drug in the plasma was {c1} mcg/mL and {c2} mcg/mL at 2 and 8 hours, respectively, '
     'following administration of the dose. The antibacterial agent displays, linear, first-order, one compartment pharmacokinetics. ')
tb = 0.693 / kb
p = [num('hw2-1a', stem=S + 'a. What is the half-life of this agent in this patient?', units='hr', ans=round(tb, 2), calc=0.693 / 0.12, **M2, skill='krate', concept='thalf-two-points',
         steps=[('setup', f'k = {{{{frac:ln({c1}/{c2})|8 hr − 2 hr}}}} = {{{{frac:{f4(ln(c1/c2))}|6 hr}}}} = {f4(kb)} hr⁻¹', 'First order, so the rate constant is the log of the ratio of the two concentrations over the time between them.'),
                ('algebra', f't½ = {{{{frac:0.693|{f4(kb)} hr⁻¹}}}} = {f2(tb)} hr', 'The first-order half-life; reciprocal hours in the denominator leave hours.')],
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1a (her wording; numbers changed)'),
     num('hw2-1b', stem=S + 'b. What is the expected initial plasma drug concentration of this dose of drug in this patient?', units='mcg/mL', ans=round(c0b, 1), calc=96, **M2, skill='conctime', concept='c0-back-extrapolation',
         steps=[('setup', f'C0 = C e^(kt) = ({c1} mcg/mL) e^(({f4(kb)})(2))', 'Extrapolating back the 2 hours from the first sample to the moment of the dose undoes 2 hours of decline.'),
                ('algebra', f'C0 = ({c1})({f4(e(kb*2))}) = {f1(c0b)} mcg/mL', 'The exponent kt has no units, so C0 keeps the unit of the measured concentration.')],
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1b (her wording; numbers changed)'),
     num('hw2-1c', stem=S + 'c. What is the volume of distribution of this agent in this patient?', units='L', ans=round(Vb, 2), calc=D / 96, **M2, skill='vddose', concept='vd-from-c0',
         steps=[('unit', f'{lb} lb ÷ 2.2 lb/kg = {f1(wt)} kg; dose = ({dpk} mg/kg)({f1(wt)} kg) = {D:.0f} mg', 'The dose is given per kilogram, so the weight in pounds is converted and multiplied in first.'),
                ('algebra', f'VD = {{{{frac:{D:.0f} mg|{f1(c0b)} mg/L}}}} = {f2(Vb)} L', 'mcg/mL equals mg/L, so milligrams divided by milligrams per litre leave litres.')],
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1c (her wording; numbers changed)'),
     num('hw2-1d', stem=S + 'd. How many hours following administration of the dose are required for 87.5% of the agent to be eliminated from the body?', units='hr', ans=round(3 * tb, 2), calc=3 * 0.693 / 0.12, **M2, skill='krate', concept='time-to-fraction',
         steps=[('setup', '87.5% eliminated leaves 12.5%: 100 → 50 → 25 → 12.5, three half-lives', 'Each half-life removes half of what is left, so three half-lives leave one-eighth, 12.5%.'),
                ('algebra', f't = 3 × {f2(tb)} hr = {f2(3*tb)} hr', 'The time to a stated fraction eliminated depends only on the half-life, not on the dose given.')],
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1d (her wording; numbers changed)'),
     num('hw2-1e', stem=S + 'e. If the dose were administered at a level of 7.5 mg/kg, how many hours following administration of the dose are required for 87.5% of the drug to be eliminated from the body?', units='hr', ans=round(3 * tb, 2), calc=3 * 0.693 / 0.12, **M2, skill='krate', concept='time-to-fraction',
         steps=[('setup', f'Halving the dose does not change k, so t = 3 × {f2(tb)} hr = {f2(3*tb)} hr', 'With first-order elimination the same fraction is lost per hour at any dose, so the time to lose 87.5% is unchanged.')],
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1e (her wording; numbers changed)'),
     num('hw2-1f', stem=S + 'f. What is the clearance of this agent in this patient?', units='L/hr', ans=round(kb * Vb, 2), calc=0.12 * D / 96, **M2, skill='clearance', concept='cl-from-k-vd',
         steps=[('setup', f'Cl = k × VD = ({f4(kb)} hr⁻¹)({f2(Vb)} L) = {f2(kb*Vb)} L/hr', 'Clearance is the rate constant times the volume: reciprocal hours times litres gives litres per hour.')],
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1f (her wording; numbers changed)')]
chain('hw2-p1', src='homework', module=2, name='Homework 2, problem 1: two plasma points (numbers changed)', setup=f'{lb}-lb male, {dpk} mg/kg, {c1} and {c2} mcg/mL at 2 and 8 hr; parts a–f', parts=p)

# ---------------------------------------------------------------- HW2 P2
A, al, B, be, Dd = 8.72, 3.85, 5.40, 0.154, 350
S = (f'2. The equation below represents the concentration of drug in the plasma following IV bolus administration of a {Dd} mg bolus dose. (Concentration is given in mcg/mL and time in hours)\n\n'
     f'Cp = {A}e^(−{al}t) + {B:.2f}e^(−{be}t)\n\n')
M2b = dict(module=2, lecture='L03', exam=1, topic='bolus2', sub='calc')
c4 = A * e(-al * 4) + B * e(-be * 4)
p = [num('hw2-2a', stem=S + 'a. What is the elimination half-life of this agent?', units='hr', ans=round(0.693 / be, 2), calc=0.693 / be, **M2b, skill='multicpt', concept='beta-half-life',
         steps=[('setup', f't½β = {{{{frac:0.693|β}}}} = {{{{frac:0.693|{be} hr⁻¹}}}} = {f2(0.693/be)} hr', 'The elimination phase is the smaller exponent, β; the larger, α, is distribution and is not the half-life asked for.')],
         teach=T_BIEXP, note=NOTE, cite=f'{H(2)}, problem 2a (her wording; numbers changed)'),
     num('hw2-2b', stem=S + 'b. What is the initial concentration of drug in the plasma upon administration of the dose?', units='mcg/mL', ans=round(A + B, 2), calc=A + B, **M2b, skill='multicpt', concept='c0-two-compartment',
         steps=[('setup', f'Cp0 = A + B = {A} + {B:.2f} = {f2(A+B)} mcg/mL', 'At t = 0 both exponential terms equal 1, so the initial concentration is the sum of the two intercepts.')],
         teach=T_BIEXP, note=NOTE, cite=f'{H(2)}, problem 2b (her wording; numbers changed)'),
     num('hw2-2c', stem=S + 'c. What is the concentration of drug in the plasma 4 hours after administration of the dose?', units='mcg/mL', ans=round(c4, 2), calc=c4, **M2b, skill='conctime', concept='biexp-at-t',
         steps=[('setup', f'Cp = {A}e^(−({al})(4)) + {B:.2f}e^(−({be})(4)) = {A}e^(−{al*4:.1f}) + {B:.2f}e^(−{be*4:.3f})', 'Both terms are evaluated at t = 4 hr; each exponent is a rate constant times hours, a pure number.'),
                ('algebra', f'Cp = {A*e(-al*4):.5f} + {f3(B*e(-be*4))} = {f2(c4)} mcg/mL', 'By 4 hours the distribution term is almost gone, so the elimination term carries nearly all the concentration.')],
         teach=T_BIEXP, note=NOTE, cite=f'{H(2)}, problem 2c (her wording; numbers changed)'),
     num('hw2-2d', stem=S + 'd. What is the apparent volume of distribution of the central compartment?', units='L', ans=round(Dd / (A + B), 2), calc=Dd / (A + B), **M2b, skill='multicpt', concept='vp-from-ab',
         steps=[('setup', f'Vp = {{{{frac:D0|A + B}}}} = {{{{frac:{Dd} mg|{f2(A+B)} mg/L}}}} = {f2(Dd/(A+B))} L', 'mcg/mL equals mg/L, so the dose over the initial concentration gives the central volume in litres.')],
         teach=T_BIEXP, note=NOTE, cite=f'{H(2)}, problem 2d (her wording; numbers changed)')]
chain('hw2-p2', src='homework', module=2, name='Homework 2, problem 2: a biexponential equation (numbers changed)', setup=f'{Dd} mg IV bolus, Cp = {A}e^(−{al}t) + {B:.2f}e^(−{be}t)', parts=p)

# ---------------------------------------------------------------- HW3
M3 = dict(module=3, lecture='L04', exam=1, topic='infusion')
Cl3, V3, Css = 4.62, 30, 15
k3 = Cl3 / V3; R = Css * Cl3; t3 = 0.693 / k3; t95 = ln(20) / k3
S = (f'An antibiotic with a clearance of {Cl3} L/hr and an apparent volume of distribution of approximately {V3} L is to be administered by IV infusion to attain a steady-state plasma concentration of {Css} mcg/mL. ')
p = [num('hw3-a', stem=S + f'a. What is an appropriate rate of infusion to achieve the desired steady-state concentration of {Css} mcg/mL?', units='mg/hr', ans=round(R, 2), calc=R, **M3, sub='rate', skill='infusion', concept='rate-for-css',
         steps=[('setup', f'R = Css × Cl = (15 mg/L)({Cl3} L/hr) = {f2(R)} mg/hr', 'Css = R/Cl rearranged; mcg/mL equals mg/L, and mg/L times L/hr leaves mg per hour, an infusion rate.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part a (her wording; numbers changed)'),
     num('hw3-b', stem=S + 'b. What is the half-life of the drug that is to be infused?', units='hr', ans=round(t3, 2), calc=t3, **M3, sub='time', skill='krate', concept='thalf-from-cl-vd',
         steps=[('setup', f'k = {{{{frac:Cl|VD}}}} = {{{{frac:{Cl3} L/hr|{V3} L}}}} = {f3(k3)} hr⁻¹', 'Clearance equals k times the volume, so dividing clearance by volume gives the rate constant in reciprocal hours.'),
                ('algebra', f't½ = {{{{frac:0.693|{f3(k3)} hr⁻¹}}}} = {f2(t3)} hr', 'The first-order half-life; the infusion does not change how fast the drug is eliminated.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part b (her wording; numbers changed)'),
     num('hw3-c', stem=S + 'c. What is the expected concentration of drug in the plasma 6 hours after the start of the infusion?', units='mg/L', ans=round(Css * (1 - e(-k3 * 6)), 2), calc=Css * (1 - e(-k3 * 6)), **M3, sub='pre', skill='conctime', concept='c-during-infusion',
         steps=[('setup', f'C = {{{{frac:R|Cl}}}}(1 − e^(−kt)) = 15 mg/L × (1 − e^(−({f3(k3)})(6)))', 'During the infusion the level climbs toward Css; the bracket is the fraction of Css reached by time t.'),
                ('algebra', f'C = 15 mg/L × (1 − {f4(e(-k3*6))}) = {f2(Css*(1-e(-k3*6)))} mg/L', 'Six hours is about 1.3 half-lives, so the level is a little under 60% of the steady state.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part c (her wording; numbers changed)'),
     num('hw3-d', stem=S + 'd. How much time is required to reach 95% of the steady-state concentration if no loading dose were used?', units='hr', ans=round(t95, 2), calc=t95, **M3, sub='time', skill='infusion', concept='time-to-css-fraction',
         steps=[('setup', '0.95 = 1 − e^(−kt) → e^(−kt) = 0.05 → t = {{frac:ln(20)|k}}', 'The fraction of steady state reached depends only on kt, so the target fraction fixes the time.'),
                ('algebra', f't = {{{{frac:2.9957|{f3(k3)} hr⁻¹}}}} = {f2(t95)} hr (4.32 half-lives)', 'The 95% point is 4.32 half-lives for any infusion rate; here 4.32 × the half-life from part b.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part d (her wording; numbers changed)'),
     num('hw3-e', stem=S + 'e. Recommend a loading dose to obtain the steady-state concentration immediately.', units='mg', ans=Css * V3, calc=Css * V3, **M3, sub='load', skill='loading', concept='loading-dose',
         steps=[('setup', f'DL = Css × VD = (15 mg/L)({V3} L) = {Css*V3} mg', 'The loading dose puts the steady-state amount in the body at once: concentration times volume gives an amount.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part e (her wording; numbers changed)'),
     num('hw3-f', stem=S + f'f. If the infusion were stopped after the desired steady-state concentration of {Css} mcg/mL was attained, what would the concentration be 8 hours after the cessation?', units='mg/L', ans=round(Css * e(-k3 * 8), 2), calc=Css * e(-k3 * 8), **M3, sub='stop', skill='conctime', concept='c-after-stop',
         steps=[('setup', f'C = Css e^(−kt) = 15 mg/L × e^(−({f3(k3)})(8))', 'Once the infusion stops nothing more goes in, so the level falls by first-order elimination from Css.'),
                ('algebra', f'C = 15 × {f4(e(-k3*8))} = {f2(Css*e(-k3*8))} mg/L', 'Eight hours is close to two half-lives, so a little over a quarter of Css remains.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part f (her wording; numbers changed)'),
     num('hw3-g', stem=S + 'g. If the infusion rate that you recommended in a (above) were doubled, what would the new steady-state concentration be?', units='mg/L', ans=2 * Css, calc=2 * Css, **M3, sub='css', skill='infusion', concept='css-proportional-to-rate',
         steps=[('setup', f'Css = {{{{frac:2R|Cl}}}} = {{{{frac:{f2(2*R)} mg/hr|{Cl3} L/hr}}}} = {2*Css} mg/L', 'Css is proportional to the rate at a fixed clearance, so doubling the rate doubles the steady-state level.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part g (her wording; numbers changed)'),
     num('hw3-h', stem=S + 'h. If the infusion rate that you recommended in a (above) were doubled, how long would it take to reach 95% of the new steady-state concentration (no loading dose)?', units='hr', ans=round(t95, 2), calc=t95, **M3, sub='time', skill='infusion', concept='time-to-css-fraction',
         steps=[('setup', f't = {{{{frac:ln(20)|k}}}} = {f2(t95)} hr, the same as part d', 'The time to a fraction of steady state depends only on k, so a faster rate reaches a higher plateau in the same time.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part h (her wording; numbers changed)'),
     num('hw3-i', stem=S + 'i. If the infusion were stopped after proceeding long enough at the rate determined in part g (above) to reach the new steady-state concentration, what would the concentration be 6 hours after the cessation?', units='mg/L', ans=round(2 * Css * e(-k3 * 6), 2), calc=2 * Css * e(-k3 * 6), **M3, sub='stop', skill='conctime', concept='c-after-stop',
         steps=[('setup', f'C = (30 mg/L) e^(−({f3(k3)})(6)) = 30 × {f4(e(-k3*6))} = {f2(2*Css*e(-k3*6))} mg/L', 'The decline starts from the new, doubled Css and follows the same first-order rate constant.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part i (her wording; numbers changed)'),
     num('hw3-j', stem=S + 'j. What specific change would you make to achieve a steady state concentration of 9 mg/L? Give the new infusion rate.', units='mg/hr', ans=round(9 * Cl3, 2), calc=9 * Cl3, **M3, sub='rate', skill='infusion', concept='rate-for-css',
         steps=[('setup', f'Change the infusion rate: R = Css × Cl = (9 mg/L)({Cl3} L/hr) = {f2(9*Cl3)} mg/hr', 'Clearance is a property of the patient, so the rate is the variable to change; Css moves in proportion to it.')],
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part j (her wording; numbers changed)')]
chain('hw3-p1', src='homework', module=3, name='Homework 3: an antibiotic by infusion (numbers changed)', setup=f'Cl {Cl3} L/hr, VD about {V3} L, target {Css} mcg/mL; parts a–j', parts=p)

# ---------------------------------------------------------------- HW4 P1
M4 = dict(module=4, lecture='L05', exam=2, topic='clearance')
age, hcm, wkg, scr = 38, 163, 58, 0.92
inch = round(hcm / 2.54 - 60); ibw = 45.5 + 2.3 * inch; crcl = 0.85 * (140 - age) * ibw / (72 * scr)
ibw_x = 45.5 + 2.3 * (hcm / 2.54 - 60); crcl_x = 0.85 * (140 - age) * ibw_x / (72 * scr)
S = f'1. Using IBW, estimate the creatinine clearance for a {age}-year-old female patient who is {hcm} cm tall, weighs {wkg} kg, and has a serum creatinine of {scr} mg/dL. '
p = [num('hw4-1ibw', stem=S + 'What is her IBW?', units='kg', ans=round(ibw, 1), calc=ibw_x, **M4, sub='crclcalc', skill='crcl', concept='ibw',
         steps=[('unit', f'{hcm} cm ÷ 2.54 = {hcm/2.54:.2f} in → {inch} in over 5 ft', 'The ideal body weight counts whole inches over five feet, so the height is converted and rounded as her keys do.'),
                ('algebra', f'IBW = 45.5 + 2.3({inch}) = {f1(ibw)} kg', f'Female form. The {wkg} kg she weighs is not used, because the question asks for IBW.')],
         teach=T_CRCL, note=NOTE, cite=f'{H(4)}, problem 1 (her wording; numbers changed)'),
     num('hw4-1crcl', stem=S + 'What is the estimated CrCl?', units='mL/min', ans=round(crcl, 1), calc=crcl_x, **M4, sub='crclcalc', skill='crcl', concept='cockcroft-gault',
         steps=[('setup', f'CrCl = 0.85 × {{{{frac:(140 − {age})({f1(ibw)})|(72)({scr})}}}}', 'This is the Cockcroft-Gault equation with ideal body weight; the patient is female, so it is multiplied by 0.85.'),
                ('algebra', f'CrCl = 0.85 × {{{{frac:{(140-age)*ibw:.1f}|{72*scr:.2f}}}}} = {f1(crcl)} mL/min', 'The units do not cancel algebraically; creatinine clearance is reported in mL/min by convention.')],
         teach=T_CRCL, note=NOTE, cite=f'{H(4)}, problem 1 (her wording; numbers changed)')]
chain('hw4-p1', src='homework', module=4, name='Homework 4, problem 1: creatinine clearance (numbers changed)', setup=f'{age}-year-old female, {hcm} cm, SCr {scr} mg/dL', parts=p)

# ---------------------------------------------------------------- HW4 P2
th4, vkg, wt4, dpk4, uri = 6, 0.3, 70, 15, 735
D4 = dpk4 * wt4; V4 = vkg * wt4; k4 = 0.693 / th4; Cl4 = k4 * V4; auc4 = D4 / Cl4; fe4 = uri / D4
clr4 = fe4 * Cl4; clr4m = clr4 * 1000 / 60; Cln = 1.2
S = (f'2. A drug with an elimination half-life of approximately {th4} hours and an apparent volume of distribution of {vkg} L/kg was administered to a male volunteer ({wt4} kg) by a bolus intravenous injection at a dose level of {dpk4} mg/kg. ')
SU = f'Urine samples were collected and analyzed for 48 hours following the dose. {uri} mg of drug was recovered in the urine. '
c10 = D4 / V4 * e(-k4 * 10)
p = [num('hw4-2a', stem=S + 'a. What is the expected plasma concentration 10 hours after administration of the dose?', units='mg/L', ans=round(c10, 2), calc=c10, **M4, sub='clcalc', skill='conctime', concept='c-at-t-bolus',
         steps=[('unit', f'D0 = ({dpk4} mg/kg)({wt4} kg) = {D4} mg; VD = ({vkg} L/kg)({wt4} kg) = {V4:g} L; k = 0.693/{th4} = {f4(k4)} hr⁻¹', 'The dose and the volume are both per kilogram, so each is multiplied by the 70 kg weight before use.'),
                ('algebra', f'C10 = {{{{frac:{D4} mg|{V4:g} L}}}} e^(−({f4(k4)})(10)) = ({D4/V4:g})({f4(e(-k4*10))}) = {f2(c10)} mg/L', 'C0 = D0/VD, then ten hours of first-order decline, which is a little under two half-lives.')],
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2a (her wording; numbers changed)'),
     num('hw4-2b', stem=S + 'b. What is the expected AUC in this patient following this IV bolus dose?', units='(mg/L)·hr', ans=round(auc4, 1), calc=auc4, **M4, sub='clcalc', skill='clearance', concept='auc-from-cl',
         steps=[('setup', f'ClT = k × VD = ({f4(k4)} hr⁻¹)({V4:g} L) = {f4(Cl4)} L/hr', 'Total clearance from the rate constant and the volume: reciprocal hours times litres.'),
                ('algebra', f'AUC = {{{{frac:D0|ClT}}}} = {{{{frac:{D4} mg|{f4(Cl4)} L/hr}}}} = {f1(auc4)} (mg/L)·hr', 'Milligrams divided by litres per hour leaves (mg/L)·hr, the unit of an area under the curve.')],
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2b (her wording; numbers changed)'),
     num('hw4-2c', stem=S + f'c. Urine samples were collected and analyzed for 48 hours following the dose. If {uri} mg of drug was recovered in the urine, what is the excretion rate constant of this agent?', units='hr⁻¹', ans=round(fe4 * k4, 4), calc=fe4 * k4, **M4, sub='clcalc', skill='clearance', concept='ke-from-fe',
         steps=[('setup', f'fe = {{{{frac:{uri} mg|{D4} mg}}}} = {f2(fe4)}', 'Forty-eight hours is eight half-lives, so the urine holds essentially all the unchanged drug that will be excreted.'),
                ('algebra', f'ke = fe × k = ({f2(fe4)})({f4(k4)} hr⁻¹) = {f4(fe4*k4)} hr⁻¹', 'The excretion rate constant is the renal share of the overall rate constant; fe has no units.')],
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2c (her wording; numbers changed)'),
     num('hw4-2d', stem=S + SU + 'd. What is the renal clearance of this drug?', units='L/hr', ans=round(clr4, 3), calc=clr4, **M4, sub='clcalc', skill='clearance', concept='clr-from-fe',
         steps=[('setup', f'ClR = fe × ClT = ({f2(fe4)})({f4(Cl4)} L/hr) = {f3(clr4)} L/hr', 'Renal clearance is the share of total clearance done by the kidney, which is the fraction excreted unchanged.'),
                ('unit', f'{f3(clr4)} L/hr × {{{{frac:1000 mL|L}}}} × {{{{frac:1 hr|60 min}}}} = {f1(clr4m)} mL/min', 'In mL/min it can be set beside the glomerular filtration rate of about 120 mL/min for part e.')],
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2d (her wording; numbers changed)'),
     mc('hw4-2e', stem=S + SU + 'e. What is the probable mechanism for renal clearance of this drug?', **M4, sub='renalmech', skill='apply', concept='mechanism-from-clr',
        options=[('Filtration with partial reabsorption', True, f'Renal clearance is {f1(clr4m)} mL/min, below a GFR of about 120 mL/min, so some filtered drug is returned to the blood.'),
                 ('Filtration with active secretion', False, 'Secretion adds to filtration and puts renal clearance above the GFR; this one is far below it.'),
                 ('Filtration only', False, 'Filtration alone gives a renal clearance close to the GFR, about 120 mL/min, not the value found in part d.'),
                 ('Active secretion only', False, 'Every unbound drug is filtered at the glomerulus, and secretion would raise clearance above the GFR.')],
        teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2e (her wording; numbers changed)'),
     num('hw4-2f', stem=S + SU + 'f. What is the hepatic clearance of this drug in this patient?', units='L/hr', ans=round(Cl4 - clr4, 3), calc=Cl4 - clr4, **M4, sub='clcalc', skill='clearance', concept='clh-from-clt',
         steps=[('setup', f'ClH = ClT − ClR = {f4(Cl4)} − {f3(clr4)} = {f3(Cl4-clr4)} L/hr', 'Total clearance is renal plus hepatic, so what the kidney does not clear the liver does.')],
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2f (her wording; numbers changed)'),
     num('hw4-2g', stem=S + f'g. If this drug were administered to a patient with partial renal failure and a clearance of {Cln} L/hr (assuming no change to the volume of distribution), what elimination half-life would you expect?', units='hr', ans=round(0.693 * V4 / Cln, 2), calc=0.693 * V4 / Cln, **M4, sub='clcalc', skill='krate', concept='thalf-from-cl-vd',
         steps=[('setup', f't½ = {{{{frac:0.693 VD|Cl}}}} = {{{{frac:0.693({V4:g} L)|{Cln} L/hr}}}} = {f2(0.693*V4/Cln)} hr', 'Same volume, about half the clearance, so about twice the half-life; L ÷ (L/hr) leaves hours.')],
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2g (her wording; numbers changed)'),
     num('hw4-2h', stem=S + f'h. What dose would you recommend to provide the same AUC (as determined in part b) for this patient with partial renal failure and clearance of {Cln}L/hr?', units='mg', ans=round(auc4 * Cln, 1), calc=auc4 * Cln, **M4, sub='clcalc', skill='clearance', concept='dose-for-same-auc',
         steps=[('setup', f'D0 = AUC × Cl = ({f1(auc4)} (mg/L)·hr)({Cln} L/hr) = {f1(auc4*Cln)} mg', 'AUC = D0/Cl rearranged: a lower clearance needs a proportionally lower dose to give the same exposure.')],
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2h (her wording; numbers changed)')]
chain('hw4-p2', src='homework', module=4, name='Homework 4, problem 2: clearance after an IV bolus (numbers changed)', setup=f't½ {th4} hr, VD {vkg} L/kg, {wt4} kg, {dpk4} mg/kg, {uri} mg in urine; parts a–h', parts=p)

# ---------------------------------------------------------------- HW5 P1
M5 = dict(module=5, lecture='L06', exam=2, topic='oral')
D5, F5, ta, te, V5 = 600, 0.9, 60, 5, 30
ka = 0.693 / (ta / 60); k5 = 0.693 / te; tm = ln(ka / k5) / (ka - k5)
cmax = lambda D: F5 * D * ka / (V5 * (ka - k5)) * (e(-k5 * tm) - e(-ka * tm))
auc = lambda D: F5 * D / (k5 * V5)
S = (f'1. A single {D5}mg dose of medication was administered orally. The medication is about {int(F5*100)}% orally bioavailable and is characterized as having an absorption half-life of approximately {ta} minutes, elimination half-life of approximately {te} hours, and apparent volume of distribution of {V5} L. ')
st_k = ('setup', f'ka = {{{{frac:0.693|1 hr}}}} = {f4(ka)} hr⁻¹; k = {{{{frac:0.693|{te} hr}}}} = {f4(k5)} hr⁻¹', 'The absorption half-life of 60 minutes is 1 hour; each rate constant is 0.693 over its own half-life.')
p = [num('hw5-1a', stem=S + 'a. When does the maximum concentration of drug in the plasma occur?', units='hr', ans=round(tm, 2), calc=tm, **M5, sub='peak', skill='oral', concept='tmax-oral',
         steps=[st_k, ('algebra', f'tmax = {{{{frac:ln({f4(ka)}/{f4(k5)})|({f4(ka)} − {f4(k5)}) hr⁻¹}}}} = {{{{frac:{f4(ln(ka/k5))}|{f4(ka-k5)} hr⁻¹}}}} = {f2(tm)} hr', 'The log of a ratio of rate constants is a pure number; dividing by reciprocal hours gives hours.')],
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1a (her wording; numbers changed)'),
     num('hw5-1b', stem=S + 'b. What is the expected maximum concentration following this single oral dose?', units='mg/L', ans=round(cmax(D5), 2), calc=cmax(D5), **M5, sub='peak', skill='oral', concept='cmax-oral',
         steps=[st_k, ('algebra', f'Cmax = {{{{frac:(0.9)({D5} mg)({f4(ka)} hr⁻¹)|({V5} L)({f4(ka-k5)} hr⁻¹)}}}} (e^(−({f4(k5)})({f2(tm)})) − e^(−({f4(ka)})({f2(tm)})))', 'The single-dose oral equation at tmax; reciprocal hours cancel and mg/L is left.'),
                ('round', f'Cmax = ({f3(F5*D5*ka/(V5*(ka-k5)))})({f4(e(-k5*tm)-e(-ka*tm))}) = {f2(cmax(D5))} mg/L', 'The coefficient times the difference of the two exponentials at the peak time gives the peak concentration.')],
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1b (her wording; numbers changed)'),
     num('hw5-1c', stem=S + 'c. What is the expected AUC following this single oral dose?', units='(mg/L)·hr', ans=round(auc(D5), 1), calc=auc(D5), **M5, sub='conc', skill='clearance', concept='auc-oral',
         steps=[('setup', f'AUC = {{{{frac:F D0|k VD}}}} = {{{{frac:(0.9)({D5} mg)|({f4(k5)} hr⁻¹)({V5} L)}}}} = {f1(auc(D5))} (mg/L)·hr', 'Only the absorbed dose counts; k times VD is the clearance, so this is F·D0 over Cl.')],
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1c (her wording; numbers changed)'),
     num('hw5-1d', stem=S + 'd. If the dose were increased to 1200 mg, when does the maximum concentration of drug in the plasma occur?', units='hr', ans=round(tm, 2), calc=tm, **M5, sub='changes', skill='oral', concept='tmax-dose-independent',
         steps=[('setup', f'tmax = {{{{frac:ln(ka/k)|ka − k}}}} = {f2(tm)} hr, unchanged', 'tmax depends only on ka and k; doubling the dose changes neither, so the peak comes at the same time.')],
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1d (her wording; numbers changed)'),
     num('hw5-1e', stem=S + 'e. If the dose were increased to 1200 mg, what is the maximum concentration of drug in the plasma that you would expect?', units='mg/L', ans=round(cmax(2 * D5), 2), calc=cmax(2 * D5), **M5, sub='changes', skill='oral', concept='cmax-dose-proportional',
         steps=[('setup', f'Cmax = 2 × {f2(cmax(D5))} mg/L = {f2(cmax(2*D5))} mg/L', 'With first-order kinetics the whole curve scales with the dose, so twice the dose gives twice the peak at the same time.')],
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1e (her wording; numbers changed)'),
     num('hw5-1f', stem=S + 'f. If the dose were increased to 1200 mg, what is the AUC that you would expect?', units='(mg/L)·hr', ans=round(auc(2 * D5), 1), calc=auc(2 * D5), **M5, sub='changes', skill='clearance', concept='auc-dose-proportional',
         steps=[('setup', f'AUC = 2 × {f1(auc(D5))} = {f1(auc(2*D5))} (mg/L)·hr', 'AUC = F·D0/Cl is proportional to the dose at a fixed clearance, so it doubles with the dose.')],
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1f (her wording; numbers changed)')]
chain('hw5-p1', src='homework', module=5, name='Homework 5, problem 1: one oral dose (numbers changed)', setup=f'{D5} mg, F {F5}, absorption t½ {ta} min, t½ {te} hr, VD {V5} L; parts a–f', parts=p)

# ---------------------------------------------------------------- HW5 P2
M6 = dict(module=6, lecture='L07', exam=2, topic='multi')
w6, dk, tau, t6, vp = 72, 12, 6, 3, 0.25
D6 = dk * w6; V6 = vp * w6; k6 = 0.693 / t6; C06 = D6 / V6; R6 = e(-k6 * tau)
cmx = C06 / (1 - R6); cmn = cmx * R6; cav = D6 / (V6 * k6 * tau); c8 = cmx * e(-k6 * 8)
S = (f'2. A {w6} kg male patient received multiple IV bolus injections of {dk} mg/kg every {tau} hours for 36 hours. The medication has an elimination half-life of {t6} hours and an apparent volume of distribution that is {int(vp*100)}% of body weight. ')
st0 = ('unit', f'D0 = ({dk} mg/kg)({w6} kg) = {D6} mg; VD = ({vp})({w6} kg) = {V6:g} L; k = 0.693/{t6} = {f3(k6)} hr⁻¹', 'The dose is per kilogram and the volume a share of body weight, so both are worked out for 72 kg first.')
p = [num('hw5-2a', stem=S + 'a. What is the average concentration of drug in the plasma at steady state?', units='mg/L', ans=round(cav, 2), calc=cav, **M6, sub='ssbolus', skill='multidose', concept='cavg-ss',
         steps=[st0, ('algebra', f'Cavg∞ = {{{{frac:D0|VD k τ}}}} = {{{{frac:{D6} mg|({V6:g} L)({f3(k6)} hr⁻¹)({tau} hr)}}}} = {f2(cav)} mg/L', 'Dose over volume, k and the interval; hours cancel and mg/L is left. F is 1 for IV.')],
         teach=T_MULTI, note=NOTE, cite=f'{H(5)}, problem 2a (her wording; numbers changed)'),
     num('hw5-2b', stem=S + 'b. What is the maximum concentration of drug in the plasma at steady state?', units='mg/L', ans=round(cmx, 2), calc=cmx, **M6, sub='ssbolus', skill='multidose', concept='cmax-ss',
         steps=[st0, ('algebra', f'C0 = {{{{frac:{D6} mg|{V6:g} L}}}} = {C06:g} mg/L; kτ = ({f3(k6)})({tau}) = {k6*tau:.3f}; e^(−kτ) = {f3(R6)}', 'Six hours is two half-lives, so a quarter of each dose is left when the next one is given.'),
                ('algebra', f'Cmax∞ = {{{{frac:{C06:g} mg/L|1 − {f3(R6)}}}}} = {f2(cmx)} mg/L', 'Dividing the single-dose peak by 1 − e^(−kτ) adds the drug carried over from all earlier doses.')],
         teach=T_MULTI, note=NOTE, cite=f'{H(5)}, problem 2b (her wording; numbers changed)'),
     num('hw5-2c', stem=S + 'c. What is the minimum concentration of drug in the plasma at steady state?', units='mg/L', ans=round(cmn, 2), calc=cmn, **M6, sub='ssbolus', skill='multidose', concept='cmin-ss',
         steps=[('setup', f'Cmin∞ = Cmax∞ e^(−kτ) = ({f2(cmx)} mg/L)({f3(R6)}) = {f2(cmn)} mg/L', 'The trough is the peak after one full interval of first-order decline, just before the next dose.')],
         teach=T_MULTI, note=NOTE, cite=f'{H(5)}, problem 2c (her wording; numbers changed)'),
     num('hw5-2d', stem=S + 'd. What is the expected concentration of drug in the plasma 8 hours after administration of the last dose?', units='mg/L', ans=round(c8, 2), calc=c8, **M6, sub='ndose', skill='multidose', concept='c-after-last-dose',
         steps=[('setup', f'C = Cmax∞ e^(−kt) = ({f2(cmx)} mg/L) e^(−({f3(k6)})(8)) = ({f2(cmx)})({f4(e(-k6*8))}) = {f2(c8)} mg/L', 'After the last dose no further dose is given, so the level falls from the steady-state peak for 8 hours.')],
         teach=T_MULTI, note=NOTE, cite=f'{H(5)}, problem 2d (her wording; numbers changed)')]
chain('hw5-p2', src='homework', module=6, name='Homework 5, problem 2: repeated IV bolus (numbers changed)', setup=f'{w6} kg, {dk} mg/kg every {tau} hr, t½ {t6} hr, VD {int(vp*100)}% of weight; parts a–d', parts=p)

HEADER = '''/* ==========================================================================
   WORKSHEETS: HER HOMEWORK, NUMBERS CHANGED
   ==========================================================================
   Homework 1–5 in her wording with new inputs, so none of these is a graded
   answer. Written by src/gen/ws_homework.py, which computes every answer
   from the new inputs by her method and fails on any mismatch. Edit the
   generator, not this file.
   ========================================================================== */'''
write(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'q10_homework.js'), 'Q_HOMEWORK', HEADER)
