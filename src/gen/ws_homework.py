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
    'Zero order: the same amount is lost in each equal time step, because the rate does not depend on how much is present, so C against t is a straight line on ordinary axes; k0 is an amount or concentration per unit time.',
    'First order: the same fraction is lost in each equal time step, because the rate is proportional to the amount remaining, so ln C against t is a straight line; k is a fraction per unit time, in reciprocal time.',
    'Check equal time steps: constant differences mean zero order; constant ratios mean first order. A first-order table also shows a constant half-life, while a zero-order half-life, {{frac:A0|2k0}}, depends on the starting amount.',
    'How she tests it: her data-table stems do not state the order. Her Homework 1 key reads it from the plot (ln C against t a straight line, so first order), and her Math Review 3 keys zero order as the drug decreasing at a constant amount per unit time.',
    'Chapter 2, "Determination of Order": plot the data on a rectangular graph first; a straight line means zero order, and a curve that straightens on a semilog graph means first order.']}]
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
    'C = {{frac:D0|VD}} e^(−kt); AUC = {{frac:D0|ClT}} = {{frac:D0|kVD}}, because the amount removed over all time, ClT × AUC, equals the dose given.',
    'fe = {{frac:amount unchanged in urine|dose}}, no units; ke = fe × k; ClR = fe × ClT; ClH = ClT − ClR, because the kidney did the share fe of the elimination and clearances by separate routes add.',
    'Compare ClR in mL/min with the GFR (glomerular filtration rate, the volume of plasma the glomeruli filter per minute, about 120 mL/min in a healthy adult): equal means filtration only; above means active secretion adds drug to the urine beyond what was filtered; below means some filtered drug is reabsorbed back into the blood.',
    'fe says how much of the elimination is renal, not how the kidney does it; only ClR set against the GFR names the mechanism.',
    'Same AUC at a new clearance: new dose = AUC × new Cl. With VD unchanged, t½ = {{frac:0.693 VD|Cl}}, so a lower clearance lengthens the half-life.',
    'Her slides "Renal Excretion", "Active Secretion" and "Tubular Reabsorption" state the three cases; Chapter 15, "Filtration Only" and Table 15-2, compares a drug\'s renal clearance with inulin, which is filtered only.']}]
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
        options=[('First order', True, f'Over each 4-hour step from 4 to 16 hr the concentration falls by the same fraction ({f2(cs[3]/cs[4])}, {f2(cs[4]/cs[5])}, {f2(cs[5]/cs[6])}), so ln C against time is a straight line. A constant fraction lost per equal time is first order, because the rate is proportional to the amount remaining.'),
                 ('Zero order', False, f'Picking this reads a falling concentration as a constant loss per hour. Zero order needs equal drops in equal times; from 4 to 8 hr the concentration falls {f1(cs[3]-cs[4])} mcg/mL but from 12 to 16 hr only {f1(cs[5]-cs[6])} mcg/mL. The drops shrink while the ratios stay constant, which is first order.'),
                 ('Neither: it needs a third plot', False, 'This answer treats the two orders as needing a third test to separate them. Two plots settle it: C against t curves downward, because the drop per step shrinks, and ln C against t is a straight line, because the fraction lost per step is constant; that straight line is the first-order signature.')],
        teach=T_ORDER, note=NOTE, cite=f'{H(1)}, problem 1a (her wording; numbers changed)'),
     num('hw1-1b', asks='k', stem=S + 'b. What is the rate constant k for the decomposition of this antibiotic?', units='hr⁻¹', ans=round(kk, 4), calc=k, **M1, sub='decide', skill='krate', concept='first-order-k-from-table',
         steps=[('setup', 'k = {{frac:ln(C1) − ln(C2)|t2 − t1}}, with t1 = 1 hr and t2 = 16 hr', 'For first order, ln C = ln C0 − kt, so ln C against t is a straight line with slope −k, where k is the first-order rate constant. Two points far apart give the slope with the least error; her key uses the 1 hr and 16 hr points, 15 hours apart.'),
                ('algebra', f'k = {{{{frac:ln({cs[1]}) − ln({cs[6]})|15 hr}}}} = {{{{frac:{f4(ln(cs[1]/cs[6]))}|15 hr}}}} = {f4(kk)} hr⁻¹', f'ln({cs[1]}) − ln({cs[6]}) = ln({{{{frac:{cs[1]}|{cs[6]}}}}}) = {f4(ln(cs[1]/cs[6]))}: the mcg/mL cancel inside the logarithm, leaving a pure number. Dividing by the 15 hr between the points leaves reciprocal hours, so k = {f4(kk)} hr⁻¹, the fraction of the drug lost per hour.')],
         setup=dict(eq='first-ln', pre=[], why='The table of "Drug (mcg/mL)" against "Time (hr)" was found first order in part a, so the first-order decline block applies. Two concentrations and their times are given and "the rate constant k" is asked, so the natural-log line ln C = ln C0 − kt is rearranged to k = (ln C1 − ln C2)/(t2 − t1).'),
         givens=[['D0', '300 milligrams', 'not needed: k comes from the slope, not the amount'], ['temperature', '4°C', 'not needed'],
                 ['C1', f'{cs[1]} mcg/mL at 1 hr', 'ln(C1), the first point'], ['C2', f'{cs[6]} mcg/mL at 16 hr', 'ln(C2), the second point'],
                 ['t2 − t1', '16 hr − 1 hr', 'the denominator, 15 hr']],
         check=dict(t=f'Between 2 and 8 hr the level falls from {cs[2]} to {cs[4]}, about half, so the half-life is near 6 hr and k near {{{{frac:0.693|6}}}}, a little over 0.115 hr⁻¹; the two-point slope gives {f4(kk)} hr⁻¹.', lo=0),
         teach=T_K1, note=NOTE, cite=f'{H(1)}, problem 1b (her wording; numbers changed)'),
     num('hw1-1c', asks='thalf', stem=S + 'c. What is the half-life t½?', units='hr', ans=round(th, 2), calc=0.693 / k, **M1, sub='half', skill='krate', concept='thalf-from-k',
         steps=[('setup', f't½ = {{{{frac:0.693|k}}}} = {{{{frac:0.693|{f4(kk)} hr⁻¹}}}} = {f2(th)} hr', f'The half-life t½ is the time for C to fall to half, so e^(−k t½) = 0.5 and k t½ = ln 2 = 0.693, giving t½ = {{{{frac:0.693|k}}}}. With k = {f4(kk)} hr⁻¹ from part b, the reciprocal hours in the denominator invert to hours: {f2(th)} hr for every halving, whatever the starting concentration.')],
         setup=dict(eq='thalf-first', pre=['first-ln'], why='Same first-order "decomposition" as part b, so the first-order block. k is known from part b and "the half-life t½" is asked, so t½ = 0.693/k, the first-order half-life line, is used directly.'),
         givens=[['D0', '300 milligrams', 'not needed: a first-order half-life does not depend on the amount'],
                 ['table', f'{cs[1]} mcg/mL at 1 hr and {cs[6]} mcg/mL at 16 hr', f'gave k = {f4(kk)} hr⁻¹ in part b, the denominator']],
         check=dict(t=f'From 2 hr ({cs[2]}) to 8 hr ({cs[4]}) the level falls to about half, so the half-life is near 6 hr; {{{{frac:0.693|{f4(kk)}}}}} = {f2(th)} hr agrees.', lo=0),
         teach=T_K1, note=NOTE, cite=f'{H(1)}, problem 1c (her wording; numbers changed)'),
     num('hw1-1d', asks='volume', stem=S + 'd. What was the initial volume of water used to prepare the original solution?', units='mL', ans=round(vol), calc=300000 / C0, **M1, sub='first', skill='vddose', concept='volume-from-c0',
         steps=[('setup', f'ln C0 = ln C + kt = ln({cs[1]}) + ({f4(kk)})(1) → C0 = {f1(c0)} mcg/mL', f'The first-order line ln C = ln C0 − kt rearranges to ln C0 = ln C + kt, with C0 the concentration the moment the drug dissolved. The 1 hr point, {cs[1]} mcg/mL, has declined for 1 hour at k = {f4(kk)} hr⁻¹; adding kt = {f4(kk)} undoes that decline: C0 = {f1(c0)} mcg/mL.'),
                ('unit', '300 mg × 1000 mcg/mg = 300,000 mcg', 'The 300 mg dissolved is the amount at time zero. The concentration is in mcg/mL, so the amount is put in micrograms, 300 × 1000 mcg/mg = 300,000 mcg; then mcg over mcg/mL cancels the micrograms and leaves millilitres, the unit asked for the volume.'),
                ('algebra', f'V = {{{{frac:300,000 mcg|{f1(c0)} mcg/mL}}}} = {round(vol)} mL', f'Concentration is amount over volume, C0 = {{{{frac:D0|V}}}}, so V = {{{{frac:D0|C0}}}}: the whole 300,000 mcg spread through the water at {f1(c0)} mcg/mL. The micrograms cancel and millilitres are left, {round(vol)} mL, the volume of purified water the pharmacist used.')],
         setup=dict(eq='cp-db-vd', pre=['first-ln'], why='First-order "decomposition" of the "300 milligrams" dissolved in water. The "initial volume" is asked, so the concentration-amount-volume line Cp = DB/VD is rearranged to V = D0/C0. C0 first, from the natural-log line rearranged to ln C0 = ln C + kt, because the measured concentrations are at later times and the line wants the concentration at time zero.'),
         givens=[['D0', '300 milligrams', 'written 300,000 mcg, the numerator'],
                 ['C1', f'{cs[1]} mcg/mL at 1 hr', f'brought back 1 hr to C0 = {f1(c0)} mcg/mL, the denominator']],
         check=dict(t=f'C0 must be a little above the 0.5 hr value of {cs[0]} mcg/mL; it is {f1(c0)}. Then 300,000 mcg at {f1(c0)} mcg/mL is {{{{frac:300,000|{f1(c0)}}}}}, a bit over 1000 mL: {round(vol)} mL.', lo=0),
         teach=T_K1, note=NOTE, cite=f'{H(1)}, problem 1d (her wording; numbers changed)'),
     num('hw1-1e', asks='t', stem=S + 'e. How much time is required for the concentration of drug to decrease by 75%?', units='hr', ans=round(2 * th, 2), calc=2 * 0.693 / k, **M1, sub='half', skill='krate', concept='time-to-fraction',
         steps=[('setup', f't = {{{{frac:ln(C0/C)|k}}}} = {{{{frac:ln(1/0.25)|{f4(kk)} hr⁻¹}}}}', f'The first-order line ln C = ln C0 − kt solved for the time is t = {{{{frac:ln(C0/C)|k}}}}. A 75% decrease leaves 25% of the starting concentration, so C0 over C = {{{{frac:1|0.25}}}} = 4 whatever the starting value, and k = {f4(kk)} hr⁻¹ is the rate constant from part b.'),
                ('algebra', f't = {{{{frac:1.3863|{f4(kk)} hr⁻¹}}}} = {f2(2*th)} hr = 2 × {f2(th)} hr', f'ln 4 = 1.3863, a pure number, so dividing by k in hr⁻¹ leaves hours: {{{{frac:1.3863|{f4(kk)} hr⁻¹}}}} = {f2(2*th)} hr. Falling to 25% is two halvings, 100% to 50% to 25%, so the time is exactly 2 × t½ = 2 × {f3(th)} hr, which checks the answer against part c.')],
         setup=dict(eq='first-ln', pre=[], why='First-order "decomposition", with "decrease by 75%" fixing the fraction left. The time is asked, so the natural-log line ln C = ln C0 − kt is solved for t = ln(C0/C)/k, with C0/C = 4 for the 25% remaining and k from part b.'),
         givens=[['D0', '300 milligrams', 'not needed: the time to a fraction does not depend on the amount'],
                 ['fraction', 'decrease by 75%', 'leaves 25%, so C0 over C is 4, two half-lives'],
                 ['table', f'{cs[1]} mcg/mL at 1 hr and {cs[6]} mcg/mL at 16 hr', f'gave k = {f4(kk)} hr⁻¹ in part b']],
         check=dict(t=f'Losing 75% leaves a quarter, two halvings, so the time is two half-lives: 2 × {f2(th)} hr = {f2(2*th)} hr, more than the one half-life of {f2(th)} hr.', lo=round(th, 2)),
         teach=T_K1, note=NOTE, cite=f'{H(1)}, problem 1e (her wording; numbers changed)')]
chain('hw1-p1', src='homework', module=1, name='Homework 1, problem 1: an antibiotic in solution (numbers changed)', setup='300 mg dissolved; seven concentrations from 0.5 to 16 hr; parts a–e', parts=p)

# ---------------------------------------------------------------- HW1 P2
A0, k0 = 520, 24
ts2 = [0.5, 1, 2, 3, 6, 9, 12, 16]
am = [A0 - k0 * t for t in ts2]
tab2 = '\n'.join(f'{t:g} | {a:g}' for t, a in zip(ts2, am))
S2 = f'2. Below is the decrease in the amount of drug as a function of time.\n\nTime (hr) | Drug A (mg)\n{tab2}\n\n'
p = [mc('hw1-2a', stem=S2 + 'a. Does the decrease in the amount of drug A appear to be a zero-order or a first-order process?', **M1, sub='decide', skill='order', concept='order-from-table',
        options=[('Zero order', True, f'Each 3-hour step from 3 to 12 hr loses the same {3*k0} mg, so the amount against time is a straight line on ordinary axes. A constant amount lost per equal time is zero order, because the rate does not depend on how much drug is left.'),
                 ('First order', False, f'Picking this reads any decline as first order. First order loses the same fraction per equal step, so successive ratios would be constant; from 3 to 6 hr the ratio is {f3(am[3]/am[4])}, from 9 to 12 hr {f3(am[5]/am[6])}. The fraction lost grows while the amount lost, {3*k0} mg per 3 hours, does not: zero order.'),
                 ('Cannot tell without logarithms', False, f'This answer treats the logarithmic plot as the only test of order. Equal drops in equal times, {3*k0} mg every 3 hours from 3 to 12 hr, already show that amount against time is a straight line on ordinary axes, the zero-order signature; a log plot would curve and add nothing.')],
        teach=T_ORDER, note=NOTE, cite=f'{H(1)}, problem 2a (her wording; numbers changed)'),
     num('hw1-2b', asks='k0', stem=S2 + 'b. What is the rate constant k?', units='mg/hr', ans=k0, calc=(am[1] - am[7]) / 15, **M1, sub='zero', skill='krate', concept='zero-order-k',
         steps=[('setup', 'k0 = {{frac:A1 − A2|t2 − t1}}', 'For zero order the amount falls by the same quantity each hour, A = A0 − k0 t, so k0, the zero-order rate constant, is the constant amount lost per unit time, the slope of amount against time: the difference between two amounts over the time between them, in mg/hr.'),
                ('algebra', f'k0 = {{{{frac:{am[1]:g} mg − {am[7]:g} mg|16 hr − 1 hr}}}} = {{{{frac:{am[1]-am[7]:g} mg|15 hr}}}} = {k0} mg/hr', f'{am[1]:g} mg at 1 hr minus {am[7]:g} mg at 16 hr is {am[1]-am[7]:g} mg lost over 16 − 1 = 15 hr; {{{{frac:{am[1]-am[7]:g} mg|15 hr}}}} = {k0} mg/hr. Milligrams over hours is an amount per unit time, the unit of a zero-order rate constant, unlike the hr⁻¹ of first order.')],
         setup=dict(eq='zero-line', pre=[], why='The "amount of drug" table was found zero order in part a, so the zero-order block applies. Amounts at two times are given and "the rate constant k" is asked, so the zero-order line C = C0 − kt, written in amount, is rearranged to k0 = (A1 − A2)/(t2 − t1).'),
         givens=[['A1', f'{am[1]:g} mg at 1 hr', 'the first amount'], ['A2', f'{am[7]:g} mg at 16 hr', 'the second amount'],
                 ['t2 − t1', '16 hr − 1 hr', 'the denominator, 15 hr']],
         check=dict(t=f'From 3 hr ({am[3]:g} mg) to 6 hr ({am[4]:g} mg) the drop is the same as from 9 to 12 hr, {am[5]:g} to {am[6]:g} mg, a constant loss; {am[1]:g} − {am[7]:g} = {am[1]-am[7]:g} mg over 15 hr is {k0} mg/hr.', lo=0),
         teach=T_K0, note=NOTE, cite=f'{H(1)}, problem 2b (her wording; numbers changed)'),
     num('hw1-2c', asks='thalf', stem=S2 + 'c. What is the half-life t½?', units='hr', ans=round(A0 / (2 * k0), 2), calc=A0 / (2 * k0), **M1, sub='half', skill='krate', concept='zero-order-thalf',
         steps=[('setup', f'A0 = A + k0 t = {am[0]:g} mg + ({k0} mg/hr)(0.5 hr) = {A0} mg', f'The zero-order line A = A0 − k0 t rearranges to A0 = A + k0 t, with A0 the amount at time zero. The first entry, {am[0]:g} mg at 0.5 hr, has already lost k0 t = ({k0} mg/hr)(0.5 hr) = {k0*0.5:g} mg; adding it back gives A0 = {A0} mg for the half-life.'),
                ('algebra', f't½ = {{{{frac:A0|2k0}}}} = {{{{frac:{A0} mg|2({k0} mg/hr)}}}} = {f2(A0/(2*k0))} hr', f'Half of A0 is {A0/2:g} mg, and at {k0} mg/hr that loss takes {{{{frac:{A0/2:g} mg|{k0} mg/hr}}}} = {f2(A0/(2*k0))} hr, which is t½ = {{{{frac:A0|2k0}}}}. The milligrams cancel and hours are left; unlike first order, this half-life grows with the starting amount, because a constant loss takes longer to remove half of a larger amount.')],
         setup=dict(eq='thalf-zero', pre=['zero-line'], why='Zero-order "decrease in the amount of drug A", so the zero-order block. k0 from part b is known and "the half-life t½" is asked, so t½ = A0/2k0. A0 first, from the zero-order line rearranged to A0 = A + k0 t, because this half-life wants the starting amount, not a tabulated one.'),
         givens=[['A at 0.5 hr', f'{am[0]:g} mg', f'brought back 0.5 hr to A0 = {A0} mg, the numerator'],
                 ['table', f'{am[1]:g} mg at 1 hr and {am[7]:g} mg at 16 hr', f'gave k0 = {k0} mg/hr in part b, in the denominator 2k0']],
         check=dict(t=f'Half of A0 = {A0} mg lies between the {am[5]:g} mg at 9 hr and the {am[6]:g} mg at 12 hr, so t½ is between 9 and 12 hr: {f2(A0/(2*k0))} hr.', lo=9, hi=12),
         teach=T_K0, note=NOTE, cite=f'{H(1)}, problem 2c (her wording; numbers changed)')]
chain('hw1-p2', src='homework', module=1, name='Homework 1, problem 2: drug A by amount (numbers changed)', setup='Eight amounts from 0.5 to 16 hr; order, k and half-life', parts=p)

# ---------------------------------------------------------------- HW1 P3
Ci, Cf, T = 280, 84, 30
k1 = ln(Ci / Cf) / T; k0b = (Ci - Cf) / T
S3 = f'3. A solution of a drug was freshly prepared at a concentration of {Ci} mg/mL. After {T} days at 25°C, the drug concentration in the solution was {Cf} mg/mL. '
p = [num('hw1-3a', asks='t', stem=S3 + 'a. Assuming first-order kinetics, when will the drug decline to one-half of the original concentration?', units='days', ans=round(0.693 / k1, 2), calc=0.693 / k1, **M1, sub='half', skill='krate', concept='thalf-both-orders',
         steps=[('setup', f'k = {{{{frac:ln({Ci}/{Cf})|{T} days}}}} = {{{{frac:{f4(ln(Ci/Cf))}|{T} days}}}} = {f4(k1)} day⁻¹', f'First order: ln C = ln C0 − kt, so k = {{{{frac:ln(C0/C)|t}}}}, the log of the ratio of starting to final concentration over the time between them. {{{{frac:{Ci}|{Cf}}}}} = {Ci/Cf:.3f}, a pure number because the mg/mL cancel, and ln {Ci/Cf:.3f} = {f4(ln(Ci/Cf))}; the time is in days, so k is in day⁻¹.'),
                ('algebra', f't½ = {{{{frac:0.693|{f4(k1)} day⁻¹}}}} = {f2(0.693/k1)} days', f't½ = {{{{frac:0.693|k}}}} because k t½ = ln 2 when C falls to half; the reciprocal days in k invert to days: {{{{frac:0.693|{f4(k1)} day⁻¹}}}} = {f2(0.693/k1)} days. A first-order half-life does not depend on the starting concentration: every halving takes the same {f2(0.693/k1)} days.')],
         setup=dict(eq='thalf-first', pre=['first-ln'], why='"Assuming first-order kinetics", so the first-order block. Two concentrations and the days between them are given and the time to "one-half of the original concentration" is asked, so t½ = 0.693/k. k first, from the natural-log line rearranged to k = ln(C0/C)/t, because the half-life line wants k.'),
         givens=[['C0', f'{Ci} mg/mL', 'the numerator of the ratio inside the logarithm'], ['t', f'{T} days', 'the denominator of k'],
                 ['temperature', '25°C', 'not needed'], ['C', f'{Cf} mg/mL', 'the denominator of the ratio inside the logarithm']],
         check=dict(t=f'{Ci} to {Cf} mg/mL is a fall to under a third in {T} days, more than one halving but less than two, so t½ is between 15 and {T} days: {f2(0.693/k1)} days.', lo=15, hi=T),
         teach=T_TWO, note=NOTE, cite=f'{H(1)}, problem 3a (her wording; numbers changed)'),
     num('hw1-3b', asks='t', stem=S3 + 'b. Assuming zero-order kinetics, when will the drug decline to one-half of the original concentration?', units='days', ans=round(Ci / (2 * k0b), 2), calc=Ci / (2 * k0b), **M1, sub='half', skill='krate', concept='thalf-both-orders',
         steps=[('setup', f'k0 = {{{{frac:{Ci} − {Cf} mg/mL|{T} days}}}} = {f4(k0b)} (mg/mL)/day', f'Zero order: C = C0 − k0 t, so k0 = {{{{frac:C0 − C|t}}}}, the constant loss per unit time. {Ci} − {Cf} = {Ci-Cf} mg/mL was lost over {T} days, so k0 = {f4(k0b)} (mg/mL)/day, a concentration per unit time rather than the day⁻¹ of a first-order k.'),
                ('algebra', f't½ = {{{{frac:C0|2k0}}}} = {{{{frac:{Ci} mg/mL|2({f4(k0b)} (mg/mL)/day)}}}} = {f2(Ci/(2*k0b))} days', f'Half of the original {Ci} mg/mL is {Ci/2:g} mg/mL; at a constant {f4(k0b)} (mg/mL)/day that loss takes {{{{frac:{Ci/2:g} mg/mL|{f4(k0b)} (mg/mL)/day}}}} = {f2(Ci/(2*k0b))} days, which is t½ = {{{{frac:C0|2k0}}}}. The mg/mL cancel and days are left; the zero-order half-life uses the starting concentration, so it differs from the first-order {f2(0.693/k1)} days of part a.')],
         setup=dict(eq='thalf-zero', pre=['zero-line'], why='"Assuming zero-order kinetics", so the zero-order block. The same two concentrations and time are given and the time to "one-half of the original concentration" is asked, so t½ = C0/2k0. k0 first, from the zero-order line rearranged to k0 = (C0 − C)/t, because this half-life wants both k0 and the starting concentration.'),
         givens=[['C0', f'{Ci} mg/mL', 'in k0 and the numerator of {{frac:C0|2k0}}'], ['t', f'{T} days', 'the denominator of k0'],
                 ['temperature', '25°C', 'not needed'], ['C', f'{Cf} mg/mL', 'subtracted from C0 in k0']],
         check=dict(t=f'Zero order loses the same amount each day. In {T} days more than half but less than three-quarters of the {Ci} mg/mL was lost, so halving takes between 20 and {T} days: {f2(Ci/(2*k0b))} days.', lo=20, hi=T),
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
p = [num('hw2-1a', asks='thalf', stem=S + 'a. What is the half-life of this agent in this patient?', units='hr', ans=round(tb, 2), calc=0.693 / 0.12, **M2, skill='krate', concept='thalf-two-points',
         steps=[('setup', f'k = {{{{frac:ln({c1}/{c2})|8 hr − 2 hr}}}} = {{{{frac:{f4(ln(c1/c2))}|6 hr}}}} = {f4(kb)} hr⁻¹', 'First order, so the rate constant is the log of the ratio of the two concentrations over the time between them.'),
                ('algebra', f't½ = {{{{frac:0.693|{f4(kb)} hr⁻¹}}}} = {f2(tb)} hr', f't½ = {{{{frac:0.693|k}}}}, because k t½ = ln 2 = 0.693 when the concentration falls to half. With k = {f4(kb)} hr⁻¹ the reciprocal hours invert to hours: {f2(tb)} hr per halving. Check: 2 to 8 hr is {f2(6/tb)} half-lives, and the concentration fell from {c1} to {c2} mcg/mL, about half.')],
         setup=dict(eq='thalf-first', pre=['first-ln'], why='"Single IV bolus dose" with "first-order, one compartment" kinetics, so the one-compartment bolus block. Two plasma concentrations "at 2 and 8 hours" are given and "the half-life" is asked, so t½ = 0.693/k. k first, from the natural-log line rearranged to k = ln(C1/C2)/(t2 − t1), because the half-life line wants k.'),
         givens=[['weight', f'{lb}-lb', 'not needed: the half-life comes from the two concentrations'], ['D0', f'{dpk} mg/kg', 'not needed'],
                 ['C1', f'{c1} mcg/mL at 2 hours', 'the numerator inside the logarithm'], ['C2', f'{c2} mcg/mL at 8 hours', 'the denominator inside the logarithm']],
         check=dict(t=f'From 2 to 8 hr the level fell from {c1} to {c2} mcg/mL, almost exactly half, so the 6 hours between the samples is about one half-life: {f2(tb)} hr, between 3 and 6.', lo=3, hi=6),
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1a (her wording; numbers changed)'),
     num('hw2-1b', asks='C0', stem=S + 'b. What is the expected initial plasma drug concentration of this dose of drug in this patient?', units='mcg/mL', ans=round(c0b, 1), calc=96, **M2, skill='conctime', concept='c0-back-extrapolation',
         steps=[('setup', f'C0 = C e^(kt) = ({c1} mcg/mL) e^(({f4(kb)})(2))', f'The one-compartment bolus line C = C0 e^(−kt) rearranges to C0 = C e^(kt), where C0 is the concentration the moment the dose is in. The first sample, {c1} mcg/mL at 2 hr, has already declined for 2 hours at k = {f4(kb)} hr⁻¹; multiplying by e^(kt) undoes that decline.'),
                ('algebra', f'C0 = ({c1})({f4(e(kb*2))}) = {f1(c0b)} mcg/mL', f'kt = ({f4(kb)} hr⁻¹)(2 hr) = {f4(kb*2)}, a pure number because the hours cancel, and e^({f4(kb*2)}) = {f4(e(kb*2))}. ({c1} mcg/mL)({f4(e(kb*2))}) = {f1(c0b)} mcg/mL: C0 keeps the unit of the measured concentration and is higher than the 2 hr sample, as the level at time zero must be.')],
         setup=dict(eq='first-exp', pre=['first-ln'], why='"Single IV bolus dose", "first-order, one compartment". The concentration at 2 hours and k from part a are known and the "initial plasma drug concentration" is asked, so the exponential line C = C0 e^(−kt) is rearranged to C0 = C e^(kt), undoing the 2 hours of decline.'),
         givens=[['weight', f'{lb}-lb', 'not needed: C0 comes from extrapolating a measured level'], ['D0', f'{dpk} mg/kg', 'not needed here; used with C0 in part c'],
                 ['C at 2 hours', f'{c1} mcg/mL', 'multiplied by e^(kt) to undo 2 hours of decline'], ['C at 8 hours', f'{c2} mcg/mL', f'gave k = {f4(kb)} hr⁻¹ in part a']],
         check=dict(t=f'C0 has to be above the 2-hour level of {c1} mcg/mL, and 2 hours at k = {f4(kb)} hr⁻¹ is about a third of a half-life, so the rise back is well under a doubling: {f1(c0b)} mcg/mL, between {c1} and 2 × {c1}.', lo=c1, hi=2 * c1),
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1b (her wording; numbers changed)'),
     num('hw2-1c', asks='VD', stem=S + 'c. What is the volume of distribution of this agent in this patient?', units='L', ans=round(Vb, 2), calc=D / 96, **M2, skill='vddose', concept='vd-from-c0',
         steps=[('unit', f'{lb} lb ÷ 2.2 lb/kg = {f1(wt)} kg; dose = ({dpk} mg/kg)({f1(wt)} kg) = {D:.0f} mg', f'The dose is {dpk} mg for each kilogram of body weight, and the weight is in pounds; 2.2 lb is 1 kg, so {{{{frac:{lb} lb|2.2 lb/kg}}}} = {f1(wt)} kg, the pounds cancelling. ({dpk} mg/kg)({f1(wt)} kg) = {D:.0f} mg: the kilograms cancel, leaving the whole dose D0 in milligrams.'),
                ('algebra', f'VD = {{{{frac:{D:.0f} mg|{f1(c0b)} mg/L}}}} = {f2(Vb)} L', f'Concentration is amount over volume, C0 = {{{{frac:D0|VD}}}}, so VD = {{{{frac:D0|C0}}}}: the volume of distribution is the apparent volume the {D:.0f} mg dose occupies at {f1(c0b)} mcg/mL. 1 mcg/mL is 1 mg/L, so mg over mg/L cancels the milligrams and leaves litres, {f2(Vb)} L.')],
         setup=dict(eq='cp-db-vd', pre=['first-ln', 'first-exp'], why='"Single IV bolus dose", one compartment. The dose per kilogram, the weight and C0 from part b are known and "the volume of distribution" is asked, so Cp = DB/VD is rearranged to VD = D0/C0. The dose in mg is formed from the "mg/kg" and the weight before dividing.'),
         givens=[['weight', f'{lb}-lb', f'converted: {{{{frac:{lb}|2.2}}}} = {f1(wt)} kg'], ['D0', f'{dpk} mg/kg', f'times {f1(wt)} kg gives D0 = {D:.0f} mg, the numerator'],
                 ['C at 2 hours', f'{c1} mcg/mL', f'extrapolated in part b to C0 = {f1(c0b)} mcg/mL, the denominator'], ['C at 8 hours', f'{c2} mcg/mL', 'not needed here: it served part a']],
         check=dict(t=f'A {D:.0f} mg dose giving {f1(c0b)} mg/L at time zero occupies {{{{frac:{D:.0f}|{f1(c0b)}}}}}, a little over 12 L: {f2(Vb)} L, above zero.', lo=0),
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1c (her wording; numbers changed)'),
     num('hw2-1d', asks='t', stem=S + 'd. How many hours following administration of the dose are required for 87.5% of the agent to be eliminated from the body?', units='hr', ans=round(3 * tb, 2), calc=3 * 0.693 / 0.12, **M2, skill='krate', concept='time-to-fraction',
         steps=[('setup', '87.5% eliminated leaves 12.5%: 100 → 50 → 25 → 12.5, three half-lives', '87.5% eliminated means 100 − 87.5 = 12.5% of the dose remains. With first-order elimination each half-life t½ removes half of what is left: 100% to 50% after one, to 25% after two, to 12.5% after three, so the time to 12.5% remaining is three half-lives.'),
                ('algebra', f't = 3 × {f2(tb)} hr = {f2(3*tb)} hr', f'3 × {f3(tb)} hr = {f2(3*tb)} hr, with t½ from part a carried unrounded. The same result comes from C = C0 e^(−kt) with C over C0 = 0.125: t = {{{{frac:ln 8|k}}}} = {{{{frac:2.0794|{f4(kb)} hr⁻¹}}}} = {f2(ln(8)/kb)} hr. The time to a stated fraction eliminated depends on k alone, not on the dose.')],
         setup=dict(eq='first-exp', pre=['first-ln', 'thalf-first'], why='"IV bolus", "first-order" elimination. "87.5% of the agent to be eliminated" fixes the fraction left and the time is asked, so the exponential line C = C0 e^(−kt) solved for t applies. The working counts half-lives instead: 12.5% left is three half-lives, so t = 3 × t½ with t½ from part a.'),
         givens=[['weight', f'{lb}-lb', 'not needed: the time to a fraction does not depend on the dose'], ['D0', f'{dpk} mg/kg', 'not needed'],
                 ['fraction eliminated', '87.5%', 'leaves 12.5%, three half-lives'], ['table', f'{c1} and {c2} mcg/mL at 2 and 8 hours', f'gave t½ = {f2(tb)} hr in part a']],
         check=dict(t=f'87.5% gone leaves 12.5%, which is 100 → 50 → 25 → 12.5, three halvings, so the time is three half-lives: 3 × {f2(tb)} = {f2(3*tb)} hr, more than the 6 hours between the two samples.', lo=round(2 * tb, 2)),
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1d (her wording; numbers changed)'),
     num('hw2-1e', asks='t', stem=S + 'e. If the dose were administered at a level of 7.5 mg/kg, how many hours following administration of the dose are required for 87.5% of the drug to be eliminated from the body?', units='hr', ans=round(3 * tb, 2), calc=3 * 0.693 / 0.12, **M2, skill='krate', concept='time-to-fraction',
         steps=[('setup', f'Halving the dose does not change k, so t = 3 × {f2(tb)} hr = {f2(3*tb)} hr', 'With first-order elimination the same fraction is lost per hour at any dose, so the time to lose 87.5% is unchanged.')],
         setup=dict(eq='first-exp', pre=['first-ln', 'thalf-first'], why='The same "first-order" bolus, now at "7.5 mg/kg". The fraction "87.5%" eliminated and the time are the same question as part d, so the exponential line C = C0 e^(−kt) solved for t applies. The dose does not appear in it, so the time is again three half-lives.'),
         givens=[['D0', '7.5 mg/kg', 'not needed: a first-order time to a fraction does not depend on the dose'],
                 ['fraction eliminated', '87.5%', 'leaves 12.5%, three half-lives'], ['table', f'{c1} and {c2} mcg/mL at 2 and 8 hours', f'gave t½ = {f2(tb)} hr in part a']],
         check=dict(t=f'Halving the dose halves every concentration but not the fraction lost per hour, so the time to lose 87.5% is still three half-lives: {f2(3*tb)} hr, the same as part d.', lo=round(2 * tb, 2)),
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1e (her wording; numbers changed)'),
     num('hw2-1f', asks='ClT', stem=S + 'f. What is the clearance of this agent in this patient?', units='L/hr', ans=round(kb * Vb, 2), calc=0.12 * D / 96, **M2, skill='clearance', concept='cl-from-k-vd',
         steps=[('setup', f'Cl = k × VD = ({f4(kb)} hr⁻¹)({f2(Vb)} L) = {f2(kb*Vb)} L/hr', f'Clearance Cl is the volume of plasma cleared of drug per unit time; with first-order elimination the fraction k of the drug in the body leaves each hour, and that drug was spread through VD, so Cl = k × VD. ({f4(kb)} hr⁻¹)({f2(Vb)} L) = {f2(kb*Vb)} L/hr, reciprocal hours times litres.')],
         setup=dict(eq='cl-k-vd', pre=['first-ln', 'cp-db-vd'], why='"Single IV bolus dose", "first-order, one compartment". k from part a and VD from part c are known and "the clearance" is asked, so Cl = k × VD is used directly.'),
         givens=[['weight', f'{lb}-lb', f'with the dose gave VD = {f2(Vb)} L in part c'], ['D0', f'{dpk} mg/kg', f'with the weight gave the {D:.0f} mg behind VD'],
                 ['table', f'{c1} and {c2} mcg/mL at 2 and 8 hours', f'gave k = {f4(kb)} hr⁻¹ in part a']],
         check=dict(t=f'The fraction k = {f4(kb)} of the {f2(Vb)} L leaves each hour, so about an eighth of the volume is cleared per hour: {f2(kb*Vb)} L/hr, well below the {f2(Vb)} L volume.', lo=0, hi=round(Vb, 2)),
         teach=T_BOLUS, note=NOTE, cite=f'{H(2)}, problem 1f (her wording; numbers changed)')]
chain('hw2-p1', src='homework', module=2, name='Homework 2, problem 1: two plasma points (numbers changed)', setup=f'{lb}-lb male, {dpk} mg/kg, {c1} and {c2} mcg/mL at 2 and 8 hr; parts a–f', parts=p)

# ---------------------------------------------------------------- HW2 P2
A, al, B, be, Dd = 8.72, 3.85, 5.40, 0.154, 350
S = (f'2. The equation below represents the concentration of drug in the plasma following IV bolus administration of a {Dd} mg bolus dose. (Concentration is given in mcg/mL and time in hours)\n\n'
     f'Cp = {A}e^(−{al}t) + {B:.2f}e^(−{be}t)\n\n')
M2b = dict(module=2, lecture='L03', exam=1, topic='bolus2', sub='calc')
c4 = A * e(-al * 4) + B * e(-be * 4)
p = [num('hw2-2a', asks='thalf', stem=S + 'a. What is the elimination half-life of this agent?', units='hr', ans=round(0.693 / be, 2), calc=0.693 / be, **M2b, skill='multicpt', concept='beta-half-life',
         steps=[('setup', f't½β = {{{{frac:0.693|β}}}} = {{{{frac:0.693|{be} hr⁻¹}}}} = {f2(0.693/be)} hr', 'The elimination phase is the smaller exponent, β; the larger, α, is distribution and is not the half-life asked for.')],
         setup=dict(eq='thalf-beta', pre=[], why='The stem gives a two-exponential equation for "IV bolus administration", so the two-compartment block. α and β are read from the equation and "the elimination half-life" is asked, so t½β = 0.693/β, the beta half-life line, using the smaller exponent.'),
         givens=[['D0', f'{Dd} mg bolus dose', 'not needed: half-life does not depend on the dose'], ['A', f'{A}', 'not needed: an intercept, not a rate'],
                 ['α', f'{al}', 'not needed: the larger exponent is distribution'], ['B', f'{B:.2f}', 'not needed'], ['β', f'{be}', 'the denominator of {{frac:0.693|β}}']],
         check=dict(t=f'β = {be} hr⁻¹ removes about 15% an hour, so halving takes between 4 and 5 hours: {f2(0.693/be)} hr. The α term, with a half-life well under an hour, is gone long before.', lo=0),
         teach=T_BIEXP, note=NOTE, cite=f'{H(2)}, problem 2a (her wording; numbers changed)'),
     num('hw2-2b', asks='C0', stem=S + 'b. What is the initial concentration of drug in the plasma upon administration of the dose?', units='mcg/mL', ans=round(A + B, 2), calc=A + B, **M2b, skill='multicpt', concept='c0-two-compartment',
         steps=[('setup', f'Cp0 = A + B = {A} + {B:.2f} = {f2(A+B)} mcg/mL', f'Cp = A e^(−αt) + B e^(−βt) gives the concentration at any time; at t = 0 both exponents are zero and e^0 = 1, so each term equals its intercept and Cp0 = A + B = {A} + {B:.2f} = {f2(A+B)} mcg/mL, the concentration the moment the {Dd} mg bolus is in.')],
         setup=dict(eq='c0-ab', pre=[], why='Two-compartment "IV bolus" equation. A and B are read from the equation and "the initial concentration" is asked, so Cp0 = A + B, the two-compartment time-zero line, because both exponentials equal 1 at t = 0.'),
         givens=[['D0', f'{Dd} mg bolus dose', 'not needed: the intercepts already carry the dose'], ['A', f'{A}', 'added to B'],
                 ['α', f'{al}', 'not needed: at t = 0 both exponentials equal 1'], ['B', f'{B:.2f}', 'added to A'], ['β', f'{be}', 'not needed: at t = 0 both exponentials equal 1']],
         check=dict(t=f'At time zero both exponentials are 1, so Cp0 is the plain sum {A} + {B:.2f} = {f2(A+B)} mcg/mL, above either intercept alone.', lo=A),
         teach=T_BIEXP, note=NOTE, cite=f'{H(2)}, problem 2b (her wording; numbers changed)'),
     num('hw2-2c', asks='Cp', stem=S + 'c. What is the concentration of drug in the plasma 4 hours after administration of the dose?', units='mcg/mL', ans=round(c4, 2), calc=c4, **M2b, skill='conctime', concept='biexp-at-t',
         steps=[('setup', f'Cp = {A}e^(−({al})(4)) + {B:.2f}e^(−({be})(4)) = {A}e^(−{al*4:.1f}) + {B:.2f}e^(−{be*4:.3f})', f'The two-compartment equation Cp = A e^(−αt) + B e^(−βt) holds at any time, so both terms are evaluated at t = 4 hr. α = {al} hr⁻¹ is the distribution rate constant and β = {be} hr⁻¹ the elimination rate constant; each exponent is hr⁻¹ times hours, a pure number: {al*4:.1f} and {be*4:.3f}.'),
                ('algebra', f'Cp = {A*e(-al*4):.5f} + {f3(B*e(-be*4))} = {f2(c4)} mcg/mL', 'By 4 hours the distribution term is almost gone, so the elimination term carries nearly all the concentration.')],
         setup=dict(eq='biexp', pre=[], why='Two-compartment "IV bolus" equation. A, α, B and β are read from the equation and the concentration "4 hours after administration" is asked, so Cp = Ae^(−αt) + Be^(−βt) is evaluated at t = 4 hr.'),
         givens=[['D0', f'{Dd} mg bolus dose', 'not needed'], ['A', f'{A}', 'the coefficient of e^(−αt)'], ['α', f'{al}', f'the exponent αt = {al} × 4 = {al*4:.1f}'],
                 ['B', f'{B:.2f}', 'the coefficient of e^(−βt)'], ['β', f'{be}', f'the exponent βt = {be} × 4 = {be*4:.3f}'], ['t', '4 hours', 't in both exponentials']],
         check=dict(t=f'By 4 hours the α term, e^(−{al*4:.1f}), is zero to five decimals, so only the B term is left; βt = {be*4:.3f} is a bit under 0.693, so a bit over half of {B:.2f} remains: {f2(c4)} mcg/mL, below {B:.2f}.', lo=0, hi=B),
         teach=T_BIEXP, note=NOTE, cite=f'{H(2)}, problem 2c (her wording; numbers changed)'),
     num('hw2-2d', asks='Vp', stem=S + 'd. What is the apparent volume of distribution of the central compartment?', units='L', ans=round(Dd / (A + B), 2), calc=Dd / (A + B), **M2b, skill='multicpt', concept='vp-from-ab',
         steps=[('setup', f'Vp = {{{{frac:D0|A + B}}}} = {{{{frac:{Dd} mg|{f2(A+B)} mg/L}}}} = {f2(Dd/(A+B))} L', f'The central compartment is the volume the dose first distributes into, so Vp = {{{{frac:D0|Cp0}}}} with Cp0 = A + B = {f2(A+B)} mcg/mL, the concentration at time zero. 1 mcg/mL equals 1 mg/L, so {Dd} mg over {f2(A+B)} mg/L cancels the milligrams and leaves litres, {f2(Dd/(A+B))} L.')],
         setup=dict(eq='vp-ab', pre=[], why='Two-compartment "IV bolus" of a stated "bolus dose" in mg. The dose and the intercepts A and B are known and "the apparent volume of distribution of the central compartment" is asked, so Vp = D0/(A + B), the central volume from the intercepts.'),
         givens=[['D0', f'{Dd} mg bolus dose', 'the numerator'], ['A', f'{A}', 'added to B for Cp0'], ['α', f'{al}', 'not needed'],
                 ['B', f'{B:.2f}', f'added to A for Cp0 = {f2(A+B)} mg/L, the denominator'], ['β', f'{be}', 'not needed']],
         check=dict(t=f'{Dd} mg producing {f2(A+B)} mg/L at time zero fills {{{{frac:{Dd}|{f2(A+B)}}}}}, about 25 L: {f2(Dd/(A+B))} L, above zero.', lo=0),
         teach=T_BIEXP, note=NOTE, cite=f'{H(2)}, problem 2d (her wording; numbers changed)')]
chain('hw2-p2', src='homework', module=2, name='Homework 2, problem 2: a biexponential equation (numbers changed)', setup=f'{Dd} mg IV bolus, Cp = {A}e^(−{al}t) + {B:.2f}e^(−{be}t)', parts=p)

# ---------------------------------------------------------------- HW3
M3 = dict(module=3, lecture='L04', exam=1, topic='infusion')
Cl3, V3, Css = 4.62, 30, 15
k3 = Cl3 / V3; R = Css * Cl3; t3 = 0.693 / k3; t95 = ln(20) / k3
S = (f'An antibiotic with a clearance of {Cl3} L/hr and an apparent volume of distribution of approximately {V3} L is to be administered by IV infusion to attain a steady-state plasma concentration of {Css} mcg/mL. ')
p = [num('hw3-a', asks='R', stem=S + f'a. What is an appropriate rate of infusion to achieve the desired steady-state concentration of {Css} mcg/mL?', units='mg/hr', ans=round(R, 2), calc=R, **M3, sub='rate', skill='infusion', concept='rate-for-css',
         steps=[('setup', f'R = Css × Cl = (15 mg/L)({Cl3} L/hr) = {f2(R)} mg/hr', f'At steady state the infusion rate R equals the rate of elimination, Cl × Css, where Cl is clearance and Css the steady-state concentration; Css = {{{{frac:R|Cl}}}} rearranges to R = Css × Cl. {Css} mcg/mL is {Css} mg/L, and (mg/L)(L/hr) cancels the litres, leaving mg/hr: ({Css} mg/L)({Cl3} L/hr) = {f2(R)} mg/hr.')],
         setup=dict(eq='css', pre=[], why='"Administered by IV infusion" to a "steady-state plasma concentration", so the infusion block at steady state. "Clearance" and the target Css are given and the "rate of infusion" is asked, so Css = R/Cl is rearranged to R = Css × Cl.'),
         givens=[['Cl', f'{Cl3} L/hr', 'multiplied by Css'], ['VD', f'approximately {V3} L', 'not needed: the rate at steady state needs clearance only'],
                 ['Css', f'{Css} mcg/mL', f'written {Css} mg/L, multiplied by clearance']],
         check=dict(t=f'Each hour {Cl3} L of plasma is cleared; keeping {Css} mg in each litre needs {Css} × {Cl3} = {f2(R)} mg/hr, 15 times the clearance. The rate is above zero.', lo=0),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part a (her wording; numbers changed)'),
     num('hw3-b', asks='thalf', stem=S + 'b. What is the half-life of the drug that is to be infused?', units='hr', ans=round(t3, 2), calc=t3, **M3, sub='time', skill='krate', concept='thalf-from-cl-vd',
         steps=[('setup', f'k = {{{{frac:Cl|VD}}}} = {{{{frac:{Cl3} L/hr|{V3} L}}}} = {f3(k3)} hr⁻¹', 'Clearance equals k times the volume, so dividing clearance by volume gives the rate constant in reciprocal hours.'),
                ('algebra', f't½ = {{{{frac:0.693|{f3(k3)} hr⁻¹}}}} = {f2(t3)} hr', f't½ = {{{{frac:0.693|k}}}}, because k t½ = ln 2 when the concentration falls to half; with k = {f3(k3)} hr⁻¹ the reciprocal hours invert to hours, {f2(t3)} hr. Elimination is a property of the drug and the patient, so an infusion does not change k or the half-life; it only sets the level reached.')],
         setup=dict(eq='thalf-first', pre=['cl-k-vd'], why='"IV infusion" with a "clearance" and a "volume of distribution" given. "The half-life" is asked, so t½ = 0.693/k. k first, from Cl = k × VD rearranged to k = Cl/VD, because the half-life line wants k and the stem gives clearance and volume instead.'),
         givens=[['Cl', f'{Cl3} L/hr', f'the numerator of k = {{{{frac:Cl|VD}}}} = {f3(k3)} hr⁻¹'], ['VD', f'approximately {V3} L', 'the denominator of k'],
                 ['Css', f'{Css} mcg/mL', 'not needed: half-life is a property of the drug and patient']],
         check=dict(t=f'k = {{{{frac:{Cl3}|{V3}}}}} = {f3(k3)} hr⁻¹ removes about 15% an hour, so halving takes between 4 and 5 hours: {f2(t3)} hr.', lo=0),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part b (her wording; numbers changed)'),
     num('hw3-c', asks='Cp', stem=S + 'c. What is the expected concentration of drug in the plasma 6 hours after the start of the infusion?', units='mg/L', ans=round(Css * (1 - e(-k3 * 6)), 2), calc=Css * (1 - e(-k3 * 6)), **M3, sub='pre', skill='conctime', concept='c-during-infusion',
         steps=[('setup', f'C = {{{{frac:R|Cl}}}}(1 − e^(−kt)) = 15 mg/L × (1 − e^(−({f3(k3)})(6)))', f'During a constant infusion the concentration is C = {{{{frac:R|Cl}}}}(1 − e^(−kt)); R over Cl is the plateau Css, here {Css} mg/L, and (1 − e^(−kt)) is the fraction of it reached by time t, because elimination has not yet grown to balance the input. k = {f3(k3)} hr⁻¹ from part b.'),
                ('algebra', f'C = 15 mg/L × (1 − {f4(e(-k3*6))}) = {f2(Css*(1-e(-k3*6)))} mg/L', f'kt = ({f3(k3)} hr⁻¹)(6 hr) = {k3*6:.3f}, a pure number, and e^(−{k3*6:.3f}) = {f4(e(-k3*6))} is the fraction of Css still missing; 1 − {f4(e(-k3*6))} = {f4(1-e(-k3*6))} has been reached. Six hours is {6/t3:.2f} half-lives of {f2(t3)} hr, so the level is {Css} × {f4(1-e(-k3*6))} = {f2(Css*(1-e(-k3*6)))} mg/L.')],
         setup=dict(eq='cp-infusing', pre=['cl-k-vd'], why='"IV infusion", "6 hours after the start of the infusion", before steady state. R, Cl and k from part b are known and the concentration during the infusion is asked, so Cp = (R/Cl)(1 − e^(−kt)) at t = 6 hr, with R/Cl the target Css.'),
         givens=[['Cl', f'{Cl3} L/hr', f'gave k = {f3(k3)} hr⁻¹ in part b, the exponent'], ['VD', f'approximately {V3} L', 'the denominator of k'],
                 ['Css', f'{Css} mcg/mL', f'the plateau R over Cl = {Css} mg/L the fraction is applied to'], ['t', '6 hours after the start', 't in 1 − e^(−kt)']],
         check=dict(t=f'Six hours is between one and two half-lives of the drug: after one half-life 50% of the plateau is reached, after two 75%, so the level lies between half the plateau and three-quarters of it: {f2(Css*(1-e(-k3*6)))} mg/L, below {Css}.', lo=Css / 2, hi=0.75 * Css),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part c (her wording; numbers changed)'),
     num('hw3-d', asks='t', stem=S + 'd. How much time is required to reach 95% of the steady-state concentration if no loading dose were used?', units='hr', ans=round(t95, 2), calc=t95, **M3, sub='time', skill='infusion', concept='time-to-css-fraction',
         steps=[('setup', '0.95 = 1 − e^(−kt) → e^(−kt) = 0.05 → t = {{frac:ln(20)|k}}', 'The fraction of Css reached during an infusion is {{frac:C|Css}} = 1 − e^(−kt), which depends only on kt. Setting it to 0.95 gives e^(−kt) = 0.05, so kt = −ln 0.05 = ln 20 = 2.9957 and t = {{frac:ln(20)|k}}; the infusion rate R cancels and plays no part.'),
                ('algebra', f't = {{{{frac:2.9957|{f3(k3)} hr⁻¹}}}} = {f2(t95)} hr (4.32 half-lives)', f'ln 20 = 2.9957 is a pure number, so dividing by k = {f3(k3)} hr⁻¹ leaves hours: {f2(t95)} hr. Because k = {{{{frac:0.693|t½}}}}, the same time is {{{{frac:2.9957|0.693}}}} = 4.32 half-lives of the {f2(t3)} hr from part b; without a loading dose, 95% of Css takes 4.32 half-lives at any infusion rate.')],
         setup=dict(eq='cp-infusing', pre=['cl-k-vd'], why='"IV infusion", "no loading dose". The fraction "95% of the steady-state concentration" is given and the time is asked, so the infusion line Cp = (R/Cl)(1 − e^(−kt)) is divided by Css and solved for t: 0.95 = 1 − e^(−kt), t = ln(20)/k, with k from part b.'),
         givens=[['Cl', f'{Cl3} L/hr', f'gave k = {f3(k3)} hr⁻¹ in part b, the denominator'], ['VD', f'approximately {V3} L', 'the denominator of k'],
                 ['Css', f'{Css} mcg/mL', 'not needed: the fraction 0.95 is dimensionless'], ['fraction', '95%', 'sets e^(−kt) = 0.05, so kt = ln(20) = 2.9957']],
         check=dict(t=f'Each half-life closes half the remaining gap: 50, 75, 87.5, about 94% after four, so 95% needs a little more than four half-lives: 4.32 × t½ = {f2(t95)} hr, between 4 and 5 half-lives.', lo=4 * t3, hi=5 * t3),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part d (her wording; numbers changed)'),
     num('hw3-e', asks='DL', stem=S + 'e. Recommend a loading dose to obtain the steady-state concentration immediately.', units='mg', ans=Css * V3, calc=Css * V3, **M3, sub='load', skill='loading', concept='loading-dose',
         steps=[('setup', f'DL = Css × VD = (15 mg/L)({V3} L) = {Css*V3} mg', 'The loading dose puts the steady-state amount in the body at once: concentration times volume gives an amount.')],
         setup=dict(eq='dl-css-vd', pre=[], why='"IV infusion" with "a loading dose to obtain the steady-state concentration immediately". The target Css and the "volume of distribution" are given and the loading dose is asked, so DL = Css × VD, the loading dose from the target.'),
         givens=[['Cl', f'{Cl3} L/hr', 'not needed: a loading dose fills the volume; clearance sets the rate'], ['VD', f'approximately {V3} L', 'multiplied by Css'],
                 ['Css', f'{Css} mcg/mL', f'written {Css} mg/L, multiplied by VD']],
         check=dict(t=f'To have {Css} mg in each of {V3} litres at once takes {Css} × {V3} = {Css*V3} mg. The dose is above zero.', lo=0),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part e (her wording; numbers changed)'),
     num('hw3-f', asks='Cp', stem=S + f'f. If the infusion were stopped after the desired steady-state concentration of {Css} mcg/mL was attained, what would the concentration be 8 hours after the cessation?', units='mg/L', ans=round(Css * e(-k3 * 8), 2), calc=Css * e(-k3 * 8), **M3, sub='stop', skill='conctime', concept='c-after-stop',
         steps=[('setup', f'C = Css e^(−kt) = 15 mg/L × e^(−({f3(k3)})(8))', f'Once the infusion stops nothing more goes in, so the plasma level follows the one-compartment decline C = C0 e^(−kt) with the concentration at the moment of stopping, Css = {Css} mg/L, as the starting point; k = {f3(k3)} hr⁻¹ from part b and t = 8 hr counted from the cessation.'),
                ('algebra', f'C = 15 × {f4(e(-k3*8))} = {f2(Css*e(-k3*8))} mg/L', f'kt = ({f3(k3)} hr⁻¹)(8 hr) = {k3*8:.3f}, a pure number, and e^(−{k3*8:.3f}) = {f4(e(-k3*8))} is the fraction of Css remaining: {Css} × {f4(e(-k3*8))} = {f2(Css*e(-k3*8))} mg/L. Eight hours is {8/t3:.2f} half-lives of {f2(t3)} hr, so a little over a quarter of Css is left.')],
         setup=dict(eq='cp-after-stop', pre=['cl-k-vd'], why='"The infusion were stopped" after Css "was attained", so the after-cessation line. Css is the starting level, k from part b is known, and the concentration "8 hours after the cessation" is asked, so Cp = Cpeak e^(−kt) with Cpeak = Css and t = 8 hr.'),
         givens=[['Cl', f'{Cl3} L/hr', f'gave k = {f3(k3)} hr⁻¹ in part b, the exponent'], ['VD', f'approximately {V3} L', 'the denominator of k'],
                 ['Css', f'{Css} mcg/mL', 'the level the decay starts from'], ['t', '8 hours after the cessation', 't in e^(−kt)']],
         check=dict(t=f'Eight hours is a little under two half-lives, so a little over a quarter of {Css} mg/L remains: {f2(Css*e(-k3*8))} mg/L, between 0.25 × {Css} and 0.5 × {Css}.', lo=0.25 * Css, hi=0.5 * Css),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part f (her wording; numbers changed)'),
     num('hw3-g', asks='Css', stem=S + 'g. If the infusion rate that you recommended in a (above) were doubled, what would the new steady-state concentration be?', units='mg/L', ans=2 * Css, calc=2 * Css, **M3, sub='css', skill='infusion', concept='css-proportional-to-rate',
         steps=[('setup', f'Css = {{{{frac:2R|Cl}}}} = {{{{frac:{f2(2*R)} mg/hr|{Cl3} L/hr}}}} = {2*Css} mg/L', f'Css = {{{{frac:R|Cl}}}}: at steady state the input R equals the elimination Cl × Css, so the plateau is proportional to the rate at a fixed clearance. Doubling R from {f2(R)} to {f2(2*R)} mg/hr with Cl still {Cl3} L/hr doubles Css from {Css} to {2*Css} mg/L; the litres per hour cancel to leave mg/L.')],
         setup=dict(eq='css', pre=[], why='"IV infusion" with the "infusion rate" "doubled" and "the new steady-state concentration" asked. Clearance is unchanged and the rate is 2R, so Css = R/Cl with the doubled rate: Css = 2R/Cl.'),
         givens=[['Cl', f'{Cl3} L/hr', 'the denominator, unchanged'], ['VD', f'approximately {V3} L', 'not needed: Css depends on rate and clearance only'],
                 ['Css', f'{Css} mcg/mL', 'the plateau at the original rate; doubles with the rate'], ['R', 'doubled', f'2R = {f2(2*R)} mg/hr, the numerator']],
         check=dict(t=f'Css is proportional to the rate at a fixed clearance, so doubling R doubles the plateau from {Css} to {2*Css} mg/L; the time to reach it does not change.', lo=Css),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part g (her wording; numbers changed)'),
     num('hw3-h', asks='t', stem=S + 'h. If the infusion rate that you recommended in a (above) were doubled, how long would it take to reach 95% of the new steady-state concentration (no loading dose)?', units='hr', ans=round(t95, 2), calc=t95, **M3, sub='time', skill='infusion', concept='time-to-css-fraction',
         steps=[('setup', f't = {{{{frac:ln(20)|k}}}} = {f2(t95)} hr, the same as part d', 'The time to a fraction of steady state depends only on k, so a faster rate reaches a higher plateau in the same time.')],
         setup=dict(eq='cp-infusing', pre=['cl-k-vd'], why='"Infusion rate" "doubled", "95% of the new steady-state concentration", "no loading dose". The time is asked, so the infusion line Cp = (R/Cl)(1 − e^(−kt)) is divided by Css and solved for t, t = ln(20)/k. R cancels, so the time equals part d.'),
         givens=[['Cl', f'{Cl3} L/hr', f'gave k = {f3(k3)} hr⁻¹ in part b, the denominator of ln(20) over k'], ['VD', f'approximately {V3} L', 'the denominator of k'],
                 ['Css', f'{Css} mcg/mL', 'not needed: R cancels out of the fraction reached'], ['R', 'doubled', 'not needed: the time to a fraction of steady state depends on k alone'],
                 ['fraction', '95%', 'sets kt = ln(20)']],
         check=dict(t=f'The fraction of the plateau reached is 1 − e^(−kt), with no R in it, so the doubled rate reaches 95% of its higher plateau in the same number of half-lives: {f2(t95)} hr, as in part d.', lo=4 * t3, hi=5 * t3),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part h (her wording; numbers changed)'),
     num('hw3-i', asks='Cp', stem=S + 'i. If the infusion were stopped after proceeding long enough at the rate determined in part g (above) to reach the new steady-state concentration, what would the concentration be 6 hours after the cessation?', units='mg/L', ans=round(2 * Css * e(-k3 * 6), 2), calc=2 * Css * e(-k3 * 6), **M3, sub='stop', skill='conctime', concept='c-after-stop',
         steps=[('setup', f'C = (30 mg/L) e^(−({f3(k3)})(6)) = 30 × {f4(e(-k3*6))} = {f2(2*Css*e(-k3*6))} mg/L', f'After the infusion stops the level follows C = C0 e^(−kt) from the concentration at cessation, the new plateau of {2*Css} mg/L from part g. k = {f3(k3)} hr⁻¹ is unchanged, so kt = {k3*6:.3f} and e^(−{k3*6:.3f}) = {f4(e(-k3*6))} of the plateau remains: {2*Css} × {f4(e(-k3*6))} = {f2(2*Css*e(-k3*6))} mg/L.')],
         setup=dict(eq='cp-after-stop', pre=['cl-k-vd', 'css'], why='"The infusion were stopped" after the doubled rate reached "the new steady-state concentration". The concentration "6 hours after the cessation" is asked, so Cp = Cpeak e^(−kt) with t = 6 hr. Cpeak first, from Css = 2R/Cl in part g, because the decay starts from the new plateau.'),
         givens=[['Cl', f'{Cl3} L/hr', f'gave k = {f3(k3)} hr⁻¹ in part b, the exponent'], ['VD', f'approximately {V3} L', 'the denominator of k'],
                 ['Css', f'{Css} mcg/mL', f'doubled in part g to {2*Css} mg/L, the level the decay starts from'], ['t', '6 hours after the cessation', 't in e^(−kt)']],
         check=dict(t=f'Six hours is between one and two half-lives, so between a quarter and a half of the {2*Css} mg/L plateau remains: {f2(2*Css*e(-k3*6))} mg/L, between 0.25 × {2*Css} and 0.5 × {2*Css}.', lo=0.5 * Css, hi=Css),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part i (her wording; numbers changed)'),
     num('hw3-j', asks='R', stem=S + 'j. What specific change would you make to achieve a steady state concentration of 9 mg/L? Give the new infusion rate.', units='mg/hr', ans=round(9 * Cl3, 2), calc=9 * Cl3, **M3, sub='rate', skill='infusion', concept='rate-for-css',
         steps=[('setup', f'Change the infusion rate: R = Css × Cl = (9 mg/L)({Cl3} L/hr) = {f2(9*Cl3)} mg/hr', f'Css = {{{{frac:R|Cl}}}}, and Cl, the clearance, is a property of the patient that cannot be prescribed, so the infusion rate R is the variable to change. For Css = 9 mg/L, R = Css × Cl = (9 mg/L)({Cl3} L/hr) = {f2(9*Cl3)} mg/hr, the litres cancelling; the rate falls from {f2(R)} mg/hr.')],
         setup=dict(eq='css', pre=[], why='"IV infusion" to "a steady state concentration of 9 mg/L", with "the new infusion rate" asked. Clearance is a fixed property of the patient, so Css = R/Cl is rearranged to R = Css × Cl with the new target.'),
         givens=[['Cl', f'{Cl3} L/hr', 'multiplied by the new target'], ['VD', f'approximately {V3} L', 'not needed: the rate at steady state needs clearance only'],
                 ['Css', f'{Css} mcg/mL', 'the old target, replaced by 9 mg/L'], ['new Css', '9 mg/L', 'multiplied by clearance']],
         check=dict(t=f'The target drops from {Css} to 9 mg/L, three-fifths of before, so the rate drops to three-fifths of the part a rate: 9 × {Cl3} = {f2(9*Cl3)} mg/hr, below it.', lo=0, hi=round(R, 2)),
         teach=T_INF, note=NOTE, cite=f'{H(3)}, part j (her wording; numbers changed)')]
chain('hw3-p1', src='homework', module=3, name='Homework 3: an antibiotic by infusion (numbers changed)', setup=f'Cl {Cl3} L/hr, VD about {V3} L, target {Css} mcg/mL; parts a–j', parts=p)

# ---------------------------------------------------------------- HW4 P1
M4 = dict(module=4, lecture='L05', exam=2, topic='clearance')
age, hcm, wkg, scr = 38, 163, 58, 0.92
inch = round(hcm / 2.54 - 60); ibw = 45.5 + 2.3 * inch; crcl = 0.85 * (140 - age) * ibw / (72 * scr)
ibw_x = 45.5 + 2.3 * (hcm / 2.54 - 60); crcl_x = 0.85 * (140 - age) * ibw_x / (72 * scr)
S = f'1. Using IBW, estimate the creatinine clearance for a {age}-year-old female patient who is {hcm} cm tall, weighs {wkg} kg, and has a serum creatinine of {scr} mg/dL. '
p = [num('hw4-1ibw', asks='IBW', stem=S + 'What is her IBW?', units='kg', ans=round(ibw, 1), calc=ibw_x, **M4, sub='crclcalc', skill='crcl', concept='ibw',
         steps=[('unit', f'{hcm} cm ÷ 2.54 = {hcm/2.54:.2f} in → {inch} in over 5 ft', 'The ideal body weight counts whole inches over five feet, so the height is converted and rounded as her keys do.'),
                ('algebra', f'IBW = 45.5 + 2.3({inch}) = {f1(ibw)} kg', f'The female form of the ideal body weight equation starts at 45.5 kg for a woman 5 ft tall and adds 2.3 kg for each inch over 5 ft: 45.5 + 2.3({inch}) = 45.5 + {2.3*inch:.1f} = {f1(ibw)} kg. The {wkg} kg she weighs is not used, because IBW depends on height and sex alone.')],
         setup=dict(eq='ibw-female', pre=[], why='"Using IBW" for a "female patient" of a stated height in cm, so the creatinine clearance block. Height is given and "her IBW" is asked, so IBW female = 45.5 + 2.3 × (inches over 5 ft). The cm is converted to inches and rounded before counting the inches over 5 ft.'),
         givens=[['age', f'{age}-year-old', 'not needed: IBW depends on height and sex'], ['height', f'{hcm} cm', f'{{{{frac:{hcm}|2.54}}}} = {hcm/2.54:.2f} in, {inch} in over 5 ft'],
                 ['weight', f'{wkg} kg', 'not needed: actual weight is not ideal weight'], ['SCr', f'{scr} mg/dL', 'not needed: it enters the CrCl line, not IBW']],
         check=dict(t=f'A woman 5 ft tall has an IBW of 45.5 kg, and {hcm} cm is only {inch} inches over, so the IBW is 45.5 plus a few kilograms: {f1(ibw)} kg, below her actual {wkg} kg.', lo=45.5),
         teach=T_CRCL, note=NOTE, cite=f'{H(4)}, problem 1 (her wording; numbers changed)'),
     num('hw4-1crcl', asks='CrCl', stem=S + 'What is the estimated CrCl?', units='mL/min', ans=round(crcl, 1), calc=crcl_x, **M4, sub='crclcalc', skill='crcl', concept='cockcroft-gault',
         steps=[('setup', f'CrCl = 0.85 × {{{{frac:(140 − {age})({f1(ibw)})|(72)({scr})}}}}', 'This is the Cockcroft-Gault equation with ideal body weight; the patient is female, so it is multiplied by 0.85.'),
                ('algebra', f'CrCl = 0.85 × {{{{frac:{(140-age)*ibw:.1f}|{72*scr:.2f}}}}} = {f1(crcl)} mL/min', f'(140 − {age})({f1(ibw)}) = {(140-age)*ibw:.1f} on top and (72)({scr}) = {72*scr:.2f} below; {{{{frac:{(140-age)*ibw:.1f}|{72*scr:.2f}}}}} = {f1((140-age)*ibw/(72*scr))}, and 0.85 × {f1((140-age)*ibw/(72*scr))} = {f1(crcl)} mL/min. The Cockcroft-Gault constants carry the units, so CrCl is reported in mL/min, the unit of the glomerular filtration rate it estimates.')],
         setup=dict(eq='crcl', pre=['ibw-female'], why='"Estimate the creatinine clearance" for a "female patient" with a "serum creatinine", so Cockcroft-Gault. Age, IBW and SCr are known and CrCl is asked, so CrCl = (140 − age)(IBW)/(72 × SCr), multiplied by 0.85 because she is female. IBW first, from the female IBW line, because the formula wants ideal weight.'),
         givens=[['age', f'{age}-year-old', f'140 − {age} = {140-age} in the numerator'], ['sex', 'female', 'multiplies by 0.85'],
                 ['height', f'{hcm} cm', f'gave IBW = {f1(ibw)} kg in the first part, the numerator'], ['weight', f'{wkg} kg', 'not needed: the question says to use IBW'],
                 ['SCr', f'{scr} mg/dL', f'the denominator with 72: 72 × {scr} = {72*scr:.2f}']],
         check=dict(t=f'A serum creatinine of {scr} mg/dL is normal for a young adult, so CrCl should come out near normal, below 100 mL/min and not far below it after the 0.85 for a woman: {f1(crcl)} mL/min.', lo=0),
         teach=T_CRCL, note=NOTE, cite=f'{H(4)}, problem 1 (her wording; numbers changed)')]
chain('hw4-p1', src='homework', module=4, name='Homework 4, problem 1: creatinine clearance (numbers changed)', setup=f'{age}-year-old female, {hcm} cm, SCr {scr} mg/dL', parts=p)

# ---------------------------------------------------------------- HW4 P2
th4, vkg, wt4, dpk4, uri = 6, 0.3, 70, 15, 735
D4 = dpk4 * wt4; V4 = vkg * wt4; k4 = 0.693 / th4; Cl4 = k4 * V4; auc4 = D4 / Cl4; fe4 = uri / D4
clr4 = fe4 * Cl4; clr4m = clr4 * 1000 / 60; Cln = 1.2
S = (f'2. A drug with an elimination half-life of approximately {th4} hours and an apparent volume of distribution of {vkg} L/kg was administered to a male volunteer ({wt4} kg) by a bolus intravenous injection at a dose level of {dpk4} mg/kg. ')
SU = f'Urine samples were collected and analyzed for 48 hours following the dose. {uri} mg of drug was recovered in the urine. '
c10 = D4 / V4 * e(-k4 * 10)
p = [num('hw4-2a', asks='Cp', stem=S + 'a. What is the expected plasma concentration 10 hours after administration of the dose?', units='mg/L', ans=round(c10, 2), calc=c10, **M4, sub='clcalc', skill='conctime', concept='c-at-t-bolus',
         steps=[('unit', f'D0 = ({dpk4} mg/kg)({wt4} kg) = {D4} mg; VD = ({vkg} L/kg)({wt4} kg) = {V4:g} L; k = 0.693/{th4} = {f4(k4)} hr⁻¹', f'The dose is {dpk4} mg per kilogram and the volume of distribution VD is {vkg} L per kilogram, so each is multiplied by the {wt4} kg weight, the kilograms cancelling: D0 = {D4} mg and VD = {V4:g} L. k, the elimination rate constant, is {{{{frac:0.693|t½}}}} = {{{{frac:0.693|{th4} hr}}}} = {f4(k4)} hr⁻¹.'),
                ('algebra', f'C10 = {{{{frac:{D4} mg|{V4:g} L}}}} e^(−({f4(k4)})(10)) = ({D4/V4:g})({f4(e(-k4*10))}) = {f2(c10)} mg/L', f'C0 = {{{{frac:D0|VD}}}} = {{{{frac:{D4} mg|{V4:g} L}}}} = {D4/V4:g} mg/L is the concentration at time zero; kt = ({f4(k4)})(10) = {k4*10:.3f}, a pure number, and e^(−{k4*10:.3f}) = {f4(e(-k4*10))} is the fraction left after 10 hours, {10/th4:.2f} half-lives: ({D4/V4:g})({f4(e(-k4*10))}) = {f2(c10)} mg/L.')],
         setup=dict(eq='first-exp', pre=['thalf-first', 'cp-db-vd'], why=f'"Bolus intravenous injection" with an "elimination half-life" and a "volume of distribution" per kg, so the one-compartment bolus block. The concentration "10 hours after administration" is asked, so C = C0 e^(−kt). k first, from t½ = 0.693/k, and C0 from Cp = DB/VD with the dose and volume scaled to the {wt4} kg weight.'),
         givens=[['t½', f'approximately {th4} hours', f'gives k = {{{{frac:0.693|{th4}}}}} = {f4(k4)} hr⁻¹'], ['VD', f'{vkg} L/kg', f'scaled to {wt4} kg: {V4:g} L, the denominator of C0'],
                 ['weight', f'{wt4} kg', 'scales both the dose and the volume'], ['D0', f'{dpk4} mg/kg', f'scaled to {wt4} kg: {D4} mg, the numerator of C0'],
                 ['t', '10 hours after administration', 't in e^(−kt)']],
         check=dict(t=f'C0 = {{{{frac:{D4}|{V4:g}}}}} = {D4/V4:g} mg/L, and 10 hours is between one and two half-lives of {th4} hours, so between 0.25 × {D4/V4:g} and 0.5 × {D4/V4:g} mg/L remains: {f2(c10)} mg/L.', lo=0.25 * D4 / V4, hi=0.5 * D4 / V4),
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2a (her wording; numbers changed)'),
     num('hw4-2b', asks='AUC', stem=S + 'b. What is the expected AUC in this patient following this IV bolus dose?', units='(mg/L)·hr', ans=round(auc4, 1), calc=auc4, **M4, sub='clcalc', skill='clearance', concept='auc-from-cl',
         steps=[('setup', f'ClT = k × VD = ({f4(k4)} hr⁻¹)({V4:g} L) = {f4(Cl4)} L/hr', f'Total clearance ClT is the volume of plasma cleared of drug per hour; the fraction k = {f4(k4)} hr⁻¹ of the drug leaves each hour from a volume VD = {V4:g} L, so ClT = k × VD = ({f4(k4)} hr⁻¹)({V4:g} L) = {f4(Cl4)} L/hr, reciprocal hours times litres giving litres per hour.'),
                ('algebra', f'AUC = {{{{frac:D0|ClT}}}} = {{{{frac:{D4} mg|{f4(Cl4)} L/hr}}}} = {f1(auc4)} (mg/L)·hr', f'AUC, the area under the concentration–time curve, is the total exposure from the dose; clearance removes drug at ClT × C, so over all time ClT × AUC = D0 and AUC = {{{{frac:D0|ClT}}}}. {{{{frac:{D4} mg|{f4(Cl4)} L/hr}}}}: dividing by L/hr multiplies by hr/L, so mg becomes (mg/L)·hr, {f1(auc4)} (mg/L)·hr.')],
         setup=dict(eq='cl-auc', pre=['thalf-first', 'cl-k-vd'], why='"Bolus intravenous injection", one compartment. Dose, t½ and VD are given and "the expected AUC" is asked, so Cl = D0/AUC is rearranged to AUC = D0/ClT. ClT first, from Cl = k × VD with k from t½ = 0.693/k, because the area line wants clearance and the stem gives half-life and volume.'),
         givens=[['t½', f'approximately {th4} hours', f'gives k = {f4(k4)} hr⁻¹, in ClT = kVD'], ['VD', f'{vkg} L/kg', f'scaled to {wt4} kg: {V4:g} L, in ClT = kVD = {f4(Cl4)} L/hr'],
                 ['weight', f'{wt4} kg', 'scales both the dose and the volume'], ['D0', f'{dpk4} mg/kg', f'scaled to {wt4} kg: {D4} mg, the numerator']],
         check=dict(t=f'AUC is also {{{{frac:C0|k}}}}: C0 = {D4/V4:g} mg/L over {f4(k4)} hr⁻¹ is about 433 (mg/L)·hr, agreeing with {D4} mg over {f4(Cl4)} L/hr: {f1(auc4)}.', lo=0),
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2b (her wording; numbers changed)'),
     num('hw4-2c', asks='ke', stem=S + f'c. Urine samples were collected and analyzed for 48 hours following the dose. If {uri} mg of drug was recovered in the urine, what is the excretion rate constant of this agent?', units='hr⁻¹', ans=round(fe4 * k4, 4), calc=fe4 * k4, **M4, sub='clcalc', skill='clearance', concept='ke-from-fe',
         steps=[('setup', f'fe = {{{{frac:{uri} mg|{D4} mg}}}} = {f2(fe4)}', 'Forty-eight hours is eight half-lives, so the urine holds essentially all the unchanged drug that will be excreted.'),
                ('algebra', f'ke = fe × k = ({f2(fe4)})({f4(k4)} hr⁻¹) = {f4(fe4*k4)} hr⁻¹', f'k = {f4(k4)} hr⁻¹ is the fraction of the drug in the body eliminated per hour by all routes; the kidney accounts for the fraction fe = {f2(fe4)} of that, so the excretion rate constant ke is that share of k: ({f2(fe4)})({f4(k4)} hr⁻¹) = {f4(fe4*k4)} hr⁻¹. fe has no units, so ke keeps hr⁻¹.')],
         setup=dict(eq='fe-k', pre=['thalf-first', 'fe'], why='"Bolus intravenous injection" with "mg of drug was recovered in the urine", so the renal block. Dose and urine amount are given and "the excretion rate constant" is asked, so ke = fe × k. fe first, from fe = Du/(F D0) with F = 1 for IV, and k from t½ = 0.693/k.'),
         givens=[['t½', f'approximately {th4} hours', f'gives k = {f4(k4)} hr⁻¹, multiplied by fe'], ['VD', f'{vkg} L/kg', 'not needed: fe and k need no volume'],
                 ['weight', f'{wt4} kg', f'scales the dose to {D4} mg, the denominator of fe'], ['D0', f'{dpk4} mg/kg', f'scaled to {wt4} kg: {D4} mg, the denominator of fe'],
                 ['collection', '48 hours', 'not needed for the number: eight half-lives, so all unchanged drug is in'], ['Du', f'{uri} mg', 'the numerator of fe']],
         check=dict(t=f'{uri} of {D4} mg, seven-tenths, left unchanged in urine, so the kidney does seven-tenths of the elimination: ke = {f2(fe4)} × {f4(k4)} = {f4(fe4*k4)} hr⁻¹, below k and above zero.', lo=0, hi=round(k4, 4)),
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2c (her wording; numbers changed)'),
     num('hw4-2d', asks='ClR', stem=S + SU + 'd. What is the renal clearance of this drug?', units='L/hr', ans=round(clr4, 3), calc=clr4, **M4, sub='clcalc', skill='clearance', concept='clr-from-fe',
         steps=[('setup', f'ClR = fe × ClT = ({f2(fe4)})({f4(Cl4)} L/hr) = {f3(clr4)} L/hr', f'Total clearance ClT = {f4(Cl4)} L/hr, from part b, is the plasma volume cleared per hour by all routes. The fraction fe = {f2(fe4)} found unchanged in urine is the share the kidney did, so renal clearance ClR = fe × ClT = ({f2(fe4)})({f4(Cl4)} L/hr) = {f3(clr4)} L/hr; fe has no units.'),
                ('unit', f'{f3(clr4)} L/hr × {{{{frac:1000 mL|L}}}} × {{{{frac:1 hr|60 min}}}} = {f1(clr4m)} mL/min', f'L/hr to mL/min: × 1000 mL/L turns litres into millilitres and dividing by 60 min/hr turns hours into minutes, so {f3(clr4)} × 1000 = {clr4*1000:.0f} mL/hr and {{{{frac:{clr4*1000:.0f} mL/hr|60 min/hr}}}} = {f1(clr4m)} mL/min. In mL/min the renal clearance can be set beside the glomerular filtration rate, about 120 mL/min, in part e.')],
         setup=dict(eq='clr', pre=['thalf-first', 'cl-k-vd', 'fe'], why='"Recovered in the urine" after an IV dose, so the renal block. fe from part c and ClT from part b are known and "the renal clearance" is asked, so ClR = fe × ClT. The L/hr result is then converted to mL/min for part e.'),
         givens=[['t½', f'approximately {th4} hours', f'gave ClT = kVD = {f4(Cl4)} L/hr in part b'], ['VD', f'{vkg} L/kg', f'scaled to {V4:g} L, inside ClT'],
                 ['weight', f'{wt4} kg', 'scales dose and volume'], ['D0', f'{dpk4} mg/kg', f'scaled to {D4} mg, the denominator of fe'],
                 ['collection', '48 hours', 'not needed for the number: long enough to collect all unchanged drug'], ['Du', f'{uri} mg', f'the numerator of fe = {f2(fe4)}']],
         check=dict(t=f'Seven-tenths of the drug leaves by the kidney, so renal clearance is seven-tenths of the total {f4(Cl4)} L/hr: {f3(clr4)} L/hr, below the total; in mL/min that is {f1(clr4m)}.', lo=0, hi=round(Cl4, 4)),
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2d (her wording; numbers changed)'),
     mc('hw4-2e', stem=S + SU + 'e. What is the probable mechanism for renal clearance of this drug?', **M4, sub='renalmech', skill='apply', concept='mechanism-from-clr',
        options=[('Filtration with partial reabsorption', True, f'Renal clearance is {f1(clr4m)} mL/min, below the GFR, the glomerular filtration rate of about 120 mL/min. Filtration alone would clear plasma at that rate, so a smaller renal clearance means some filtered drug moved back from the tubule into the blood: filtration with partial reabsorption.'),
                 ('Filtration with active secretion', False, f'Picking this reads a drug that is mostly renal (fe = {f2(fe4)}) as one the kidney secretes. Active secretion adds drug to the urine on top of filtration, so renal clearance would exceed the GFR of about 120 mL/min; here ClR is {f1(clr4m)} mL/min, far below it, so drug is being taken back, not added.'),
                 ('Filtration only', False, f'This answer takes filtration as the whole mechanism although renal clearance is below GFR. Filtration alone clears unbound drug at the glomerular filtration rate, about 120 mL/min; a renal clearance of {f1(clr4m)} mL/min is far less, so most of the filtered drug returns to the blood by reabsorption.'),
                 ('Active secretion only', False, f'Picking this treats secretion as a route that can replace filtration. Every unbound drug in plasma is filtered at the glomerulus, so filtration is always present, and secretion added to it would raise renal clearance above the GFR of about 120 mL/min; {f1(clr4m)} mL/min is below GFR, which only reabsorption produces.')],
        steps=[('setup', f'D0 = ({dpk4} mg/kg)({wt4} kg) = {D4} mg; fe = {{{{frac:Du|D0}}}} = {{{{frac:{uri} mg|{D4} mg}}}} = {f2(fe4)}', f'fe is the fraction of the dose that reaches the urine unchanged. It says how much of the elimination is renal, {int(round(fe4*100))}%, and nothing about how the kidney does it: a drug can be {int(round(fe4*100))}% renal by filtration alone, by filtration with reabsorption, or with secretion.'),
               ('setup', f'k = {{{{frac:0.693|{th4}}}}} = {f4(k4)} hr⁻¹; VD = ({vkg} L/kg)({wt4} kg) = {V4:g} L; ClT = kVD = ({f4(k4)})({V4:g}) = {f4(Cl4)} L/hr', 'The mechanism is read from renal clearance, and renal clearance is a share of total clearance, so total clearance comes first: the rate constant from the half-life and the volume scaled to the patient.'),
               ('algebra', f'ClR = fe × ClT = {f2(fe4)} × {f4(Cl4)} L/hr = {f3(clr4)} L/hr', 'Renal clearance is the renal fraction of total clearance: the same fe that was only a fraction in step 1 now scales a clearance, which has units and a physiological reference to compare against.'),
               ('unit', f'ClR = {f3(clr4)} L/hr × {{{{frac:1000 mL|1 L}}}} × {{{{frac:1 hr|60 min}}}} = {f1(clr4m)} mL/min', 'The glomerular filtration rate is quoted in mL/min, so renal clearance is put in the same unit before the two are compared; L cancels against mL per L and hr against hr per min.'),
               ('setup', f'Compare: ClR = {f1(clr4m)} mL/min against GFR of about 120 mL/min; {f1(clr4m)} is below 120', 'Filtration alone would clear unbound drug at the GFR. A renal clearance below the GFR means some filtered drug is taken back into the blood, so the mechanism is filtration with partial reabsorption; above the GFR would mean secretion adds drug to the urine.')],
        givens=[['t½', f'approximately {th4} hours', f'gives k = {{{{frac:0.693|{th4}}}}} = {f4(k4)} hr⁻¹, on the way to ClT'], ['VD', f'{vkg} L/kg', f'scaled to {V4:g} L, inside ClT = kVD'],
                ['weight', f'{wt4} kg', 'scales the dose and the volume'], ['D0', f'{dpk4} mg/kg', f'scaled to {D4} mg, the denominator of fe'],
                ['collection', '48 hours', 'not needed for the number: long enough to collect all unchanged drug'], ['Du', f'{uri} mg', f'the numerator of fe = {f2(fe4)}']],
        check=dict(t=f'fe = {f2(fe4)} alone cannot name the mechanism: a drug with the same fe but a much shorter half-life would have a renal clearance above GFR and be secreted. Only ClR in mL/min set against about 120 mL/min decides, and {f1(clr4m)} is well below it.'),
        teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2e (her wording; numbers changed)'),
     num('hw4-2f', asks='ClH', stem=S + SU + 'f. What is the hepatic clearance of this drug in this patient?', units='L/hr', ans=round(Cl4 - clr4, 3), calc=Cl4 - clr4, **M4, sub='clcalc', skill='clearance', concept='clh-from-clt',
         steps=[('setup', f'ClH = ClT − ClR = {f4(Cl4)} − {f3(clr4)} = {f3(Cl4-clr4)} L/hr', f'Total clearance ClT is the sum of the clearances by each route, ClT = ClR + ClH, so the hepatic clearance ClH is what remains after the renal clearance ClR from part d is subtracted: {f4(Cl4)} − {f3(clr4)} = {f3(Cl4-clr4)} L/hr, the fraction 1 − fe = {f2(1-fe4)} of the total.')],
         setup=dict(eq='clt-sum', pre=['thalf-first', 'cl-k-vd', 'fe', 'clr'], why='"Recovered in the urine" after an IV dose, so the renal block. ClR from part d and ClT from part b are known and "the hepatic clearance" is asked, so the clearance sum ClT = ClR + ClH is rearranged to ClH = ClT − ClR.'),
         givens=[['t½', f'approximately {th4} hours', f'gave ClT = {f4(Cl4)} L/hr in part b, the total'], ['VD', f'{vkg} L/kg', 'inside ClT'],
                 ['weight', f'{wt4} kg', 'scales dose and volume'], ['D0', f'{dpk4} mg/kg', 'the denominator of fe'],
                 ['collection', '48 hours', 'not needed for the number'], ['Du', f'{uri} mg', f'gave fe = {f2(fe4)} and ClR = {f3(clr4)} L/hr in part d, subtracted']],
         check=dict(t=f'The kidney does seven-tenths, so the liver does the other three-tenths of {f4(Cl4)} L/hr: {f3(Cl4-clr4)} L/hr, which is also {f4(Cl4)} − {f3(clr4)}; it is below the renal clearance and above zero.', lo=0, hi=round(clr4, 3)),
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2f (her wording; numbers changed)'),
     num('hw4-2g', asks='thalf', stem=S + f'g. If this drug were administered to a patient with partial renal failure and a clearance of {Cln} L/hr (assuming no change to the volume of distribution), what elimination half-life would you expect?', units='hr', ans=round(0.693 * V4 / Cln, 2), calc=0.693 * V4 / Cln, **M4, sub='clcalc', skill='krate', concept='thalf-from-cl-vd',
         steps=[('setup', f't½ = {{{{frac:0.693 VD|Cl}}}} = {{{{frac:0.693({V4:g} L)|{Cln} L/hr}}}} = {f2(0.693*V4/Cln)} hr', f't½ = {{{{frac:0.693 VD|Cl}}}} combines Cl = k × VD with k = {{{{frac:0.693|t½}}}}. VD is unchanged at {V4:g} L, so (0.693)({V4:g} L) = {0.693*V4:.3f} L and {{{{frac:{0.693*V4:.3f} L|{Cln} L/hr}}}} = {f2(0.693*V4/Cln)} hr, the litres cancelling. Clearance fell from {f4(Cl4)} to {Cln} L/hr, about half, so the half-life about doubled from {th4} hr.')],
         setup=dict(eq='thalf-cl-vd', pre=[], why='"Partial renal failure and a clearance of" a stated value, with "no change to the volume of distribution". Cl and VD are known and the "elimination half-life" is asked, so t½ = 0.693 × VD/ClT, the half-life from volume and clearance, with the new clearance.'),
         givens=[['t½', f'approximately {th4} hours', 'the normal half-life, replaced by the new one; not in the line'], ['VD', f'{vkg} L/kg', f'scaled to {V4:g} L, unchanged, the numerator with 0.693'],
                 ['weight', f'{wt4} kg', f'scales the volume to {V4:g} L'], ['D0', f'{dpk4} mg/kg', 'not needed: half-life does not depend on the dose'],
                 ['new Cl', f'{Cln} L/hr', 'the denominator']],
         check=dict(t=f'Clearance fell to {Cln} L/hr, about half of normal, with the volume unchanged, so the half-life about doubles from {th4} hr: {f2(0.693*V4/Cln)} hr, above {th4}.', lo=th4),
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2g (her wording; numbers changed)'),
     num('hw4-2h', asks='D0', stem=S + f'h. What dose would you recommend to provide the same AUC (as determined in part b) for this patient with partial renal failure and clearance of {Cln}L/hr?', units='mg', ans=round(auc4 * Cln, 1), calc=auc4 * Cln, **M4, sub='clcalc', skill='clearance', concept='dose-for-same-auc',
         steps=[('setup', f'D0 = AUC × Cl = ({f1(auc4)} (mg/L)·hr)({Cln} L/hr) = {f1(auc4*Cln)} mg', 'AUC = D0/Cl rearranged: a lower clearance needs a proportionally lower dose to give the same exposure.')],
         setup=dict(eq='cl-auc', pre=['thalf-first', 'cl-k-vd'], why='"The same AUC (as determined in part b)" at the "clearance" of the "partial renal failure" patient. AUC and the new Cl are known and the "dose" is asked, so Cl = D0/AUC is rearranged to D0 = AUC × Cl.'),
         givens=[['t½', f'approximately {th4} hours', f'gave the part b AUC of {f1(auc4)} (mg/L)·hr'], ['VD', f'{vkg} L/kg', 'inside the part b AUC'],
                 ['weight', f'{wt4} kg', f'scales the dose to {D4} mg, the normal dose'], ['D0', f'{dpk4} mg/kg', f'{D4} mg gave the AUC at normal clearance; the new dose is asked'],
                 ['new Cl', f'{Cln} L/hr', 'multiplied by the AUC']],
         check=dict(t=f'Dose and clearance scale together for the same AUC: clearance fell to {Cln} L/hr, about half of normal, so the dose falls to about half of the normal {dpk4} mg/kg × {wt4} kg: {f1(auc4*Cln)} mg, below it.', lo=0, hi=D4),
         teach=T_CL, note=NOTE, cite=f'{H(4)}, problem 2h (her wording; numbers changed)')]
chain('hw4-p2', src='homework', module=4, name='Homework 4, problem 2: clearance after an IV bolus (numbers changed)', setup=f't½ {th4} hr, VD {vkg} L/kg, {wt4} kg, {dpk4} mg/kg, {uri} mg in urine; parts a–h', parts=p)

# ---------------------------------------------------------------- HW5 P1
M5 = dict(module=5, lecture='L06', exam=2, topic='oral')
D5, F5, ta, te, V5 = 600, 0.9, 60, 5, 30
ka = 0.693 / (ta / 60); k5 = 0.693 / te; tm = ln(ka / k5) / (ka - k5)
cmax = lambda D: F5 * D * ka / (V5 * (ka - k5)) * (e(-k5 * tm) - e(-ka * tm))
auc = lambda D: F5 * D / (k5 * V5)
S = (f'1. A single {D5}mg dose of medication was administered orally. The medication is about {int(F5*100)}% orally bioavailable and is characterized as having an absorption half-life of approximately {ta} minutes, elimination half-life of approximately {te} hours, and apparent volume of distribution of {V5} L. ')
st_k = ('setup', f'ka = {{{{frac:0.693|1 hr}}}} = {f4(ka)} hr⁻¹; k = {{{{frac:0.693|{te} hr}}}} = {f4(k5)} hr⁻¹', f'The absorption half-life of {ta} minutes is {ta/60:g} hour, so ka, the absorption rate constant, is {{{{frac:0.693|1 hr}}}} = {f4(ka)} hr⁻¹, and k, the elimination rate constant, is {{{{frac:0.693|{te} hr}}}} = {f4(k5)} hr⁻¹. Each is 0.693 over its own half-life because k t½ = ln 2; both are in reciprocal hours.')
p = [num('hw5-1a', asks='tmax', stem=S + 'a. When does the maximum concentration of drug in the plasma occur?', units='hr', ans=round(tm, 2), calc=tm, **M5, sub='peak', skill='oral', concept='tmax-oral',
         steps=[st_k, ('algebra', f'tmax = {{{{frac:ln({f4(ka)}/{f4(k5)})|({f4(ka)} − {f4(k5)}) hr⁻¹}}}} = {{{{frac:{f4(ln(ka/k5))}|{f4(ka-k5)} hr⁻¹}}}} = {f2(tm)} hr', f'tmax, the time of the peak, is when the absorption rate equals the elimination rate: tmax = {{{{frac:ln(ka/k)|ka − k}}}}. {{{{frac:{f4(ka)}|{f4(k5)}}}}} = {ka/k5:.1f}, a pure ratio of rate constants, and ln {ka/k5:.1f} = {f4(ln(ka/k5))}; dividing by (ka − k) = {f4(ka-k5)} hr⁻¹ inverts the reciprocal hours to hours, {f2(tm)} hr.')],
         setup=dict(eq='tmax', pre=['thalf-abs', 'thalf-first'], why='"Administered orally" as a "single" dose with an "absorption half-life" and an "elimination half-life", so the single oral dose block. "When does the maximum concentration" occur asks for tmax, so tmax = ln(ka/k)/(ka − k). ka and k first, each 0.693 over its own half-life, because the line wants rate constants.'),
         givens=[['D0', f'{D5}mg', 'not needed: tmax does not depend on the dose'], ['F', f'{int(F5*100)}%', 'not needed: F scales height, not timing'],
                 ['absorption t½', f'approximately {ta} minutes', f'1 hour, so ka = {{{{frac:0.693|1}}}} = {f4(ka)} hr⁻¹'], ['t½', f'approximately {te} hours', f'gives k = {{{{frac:0.693|{te}}}}} = {f4(k5)} hr⁻¹'],
                 ['VD', f'{V5} L', 'not needed: tmax has no volume in it']],
         check=dict(t=f'Absorption, half-life 1 hour, is five times faster than elimination, half-life {te} hours, so the peak comes a few absorption half-lives in and before one elimination half-life: {f2(tm)} hr, between 1 and {te}.', lo=0),
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1a (her wording; numbers changed)'),
     num('hw5-1b', asks='Cmax', stem=S + 'b. What is the expected maximum concentration following this single oral dose?', units='mg/L', ans=round(cmax(D5), 2), calc=cmax(D5), **M5, sub='peak', skill='oral', concept='cmax-oral',
         steps=[st_k, ('algebra', f'Cmax = {{{{frac:(0.9)({D5} mg)({f4(ka)} hr⁻¹)|({V5} L)({f4(ka-k5)} hr⁻¹)}}}} (e^(−({f4(k5)})({f2(tm)})) − e^(−({f4(ka)})({f2(tm)})))', f'The single oral dose equation Cp = {{{{frac:F ka D0|VD(ka − k)}}}} (e^(−kt) − e^(−ka t)) at t = tmax = {f2(tm)} hr; F = {F5} is the fraction absorbed, D0 = {D5} mg, VD = {V5} L. On top, (0.9)({D5})({f4(ka)}) = {F5*D5*ka:.2f} mg·hr⁻¹; below, ({V5})({f4(ka-k5)}) = {V5*(ka-k5):.3f} L·hr⁻¹; the reciprocal hours cancel, leaving mg/L.'),
                ('round', f'Cmax = ({f3(F5*D5*ka/(V5*(ka-k5)))})({f4(e(-k5*tm)-e(-ka*tm))}) = {f2(cmax(D5))} mg/L', f'{{{{frac:{F5*D5*ka:.2f}|{V5*(ka-k5):.3f}}}}} = {f3(F5*D5*ka/(V5*(ka-k5)))} mg/L is the coefficient. At tmax the elimination term e^(−({f4(k5)})({f2(tm)})) = {f4(e(-k5*tm))} and the absorption term e^(−({f4(ka)})({f2(tm)})) = {f4(e(-ka*tm))}; their difference, {f4(e(-k5*tm)-e(-ka*tm))}, times the coefficient gives Cmax = {f2(cmax(D5))} mg/L.')],
         setup=dict(eq='oral-cp', pre=['thalf-abs', 'thalf-first', 'tmax'], why='"Single" dose "administered orally" with "bioavailable", "absorption half-life", "elimination half-life" and "volume of distribution" given. "The expected maximum concentration" is asked, so the oral line Cp = [F ka D0/(VD(ka − k))](e^(−kt) − e^(−ka t)) is evaluated at t = tmax. ka, k and tmax first, from their half-lives and the tmax line.'),
         givens=[['D0', f'{D5}mg', 'in the numerator F ka D0'], ['F', f'{int(F5*100)}%', f'written {F5}, in the numerator'],
                 ['absorption t½', f'approximately {ta} minutes', f'gives ka = {f4(ka)} hr⁻¹, in the numerator and in ka − k'], ['t½', f'approximately {te} hours', f'gives k = {f4(k5)} hr⁻¹, in ka − k and e^(−k tmax)'],
                 ['VD', f'{V5} L', 'in the denominator VD(ka − k)']],
         check=dict(t=f'If the whole absorbed dose were in the body at once the level would be {{{{frac:0.9 × {D5}|{V5}}}}} = 18 mg/L; some has been eliminated by {f2(tm)} hr and a little is unabsorbed, so Cmax is below 18: {f2(cmax(D5))} mg/L.', lo=0, hi=F5 * D5 / V5),
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1b (her wording; numbers changed)'),
     num('hw5-1c', asks='AUC', stem=S + 'c. What is the expected AUC following this single oral dose?', units='(mg/L)·hr', ans=round(auc(D5), 1), calc=auc(D5), **M5, sub='conc', skill='clearance', concept='auc-oral',
         steps=[('setup', f'AUC = {{{{frac:F D0|k VD}}}} = {{{{frac:(0.9)({D5} mg)|({f4(k5)} hr⁻¹)({V5} L)}}}} = {f1(auc(D5))} (mg/L)·hr', f'AUC, the area under the concentration–time curve, is the amount reaching the circulation over the clearance, because Cl × AUC = F D0. Only the absorbed F = {F5} of the {D5} mg counts; Cl = k × VD = ({f4(k5)} hr⁻¹)({V5} L) = {f4(k5*V5)} L/hr, and mg over L/hr is (mg/L)·hr.')],
         setup=dict(eq='cl-auc', pre=['thalf-first', 'cl-k-vd'], why='"Single" dose "administered orally", "orally bioavailable". F, D0, t½ and VD are given and "the expected AUC" is asked, so Cl = FD0/AUC is rearranged to AUC = F D0/Cl. Cl first, as k × VD with k from t½ = 0.693/k, because the stem gives half-life and volume rather than clearance.'),
         givens=[['D0', f'{D5}mg', 'in the numerator F D0'], ['F', f'{int(F5*100)}%', f'written {F5}, in the numerator'],
                 ['absorption t½', f'approximately {ta} minutes', 'not needed: AUC does not depend on ka'], ['t½', f'approximately {te} hours', f'gives k = {f4(k5)} hr⁻¹, in the denominator k VD'],
                 ['VD', f'{V5} L', 'in the denominator k VD']],
         check=dict(t=f'AUC is the absorbed dose over clearance; 0.9 × {D5} mg over ({f4(k5)} hr⁻¹)({V5} L) comes to about 130 (mg/L)·hr: {f1(auc(D5))}. Doubling the dose would double it.', lo=0),
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1c (her wording; numbers changed)'),
     num('hw5-1d', asks='tmax', stem=S + 'd. If the dose were increased to 1200 mg, when does the maximum concentration of drug in the plasma occur?', units='hr', ans=round(tm, 2), calc=tm, **M5, sub='changes', skill='oral', concept='tmax-dose-independent',
         steps=[('setup', f'tmax = {{{{frac:ln(ka/k)|ka − k}}}} = {f2(tm)} hr, unchanged', f'tmax = {{{{frac:ln(ka/k)|ka − k}}}} contains only ka = {f4(ka)} hr⁻¹, the absorption rate constant, and k = {f4(k5)} hr⁻¹, the elimination rate constant; the dose D0 does not appear. Doubling the dose to 1200 mg changes neither constant, because both processes are first order, so the peak still comes at {f2(tm)} hr.')],
         setup=dict(eq='tmax', pre=['thalf-abs', 'thalf-first'], why='"Dose were increased to 1200 mg" and "when does the maximum concentration" occur: single oral dose, tmax asked. tmax = ln(ka/k)/(ka − k) carries no dose, so the part a value is unchanged.'),
         givens=[['D0', '1200 mg', 'not needed: tmax has no dose in it'], ['F', f'{int(F5*100)}%', 'not needed'],
                 ['absorption t½', f'approximately {ta} minutes', f'gives ka = {f4(ka)} hr⁻¹'], ['t½', f'approximately {te} hours', f'gives k = {f4(k5)} hr⁻¹'],
                 ['VD', f'{V5} L', 'not needed']],
         check=dict(t=f'Both absorption and elimination are first order, so doubling the dose doubles every concentration but moves no timing: the peak is still at {f2(tm)} hr, the part a value.', lo=0),
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1d (her wording; numbers changed)'),
     num('hw5-1e', asks='Cmax', stem=S + 'e. If the dose were increased to 1200 mg, what is the maximum concentration of drug in the plasma that you would expect?', units='mg/L', ans=round(cmax(2 * D5), 2), calc=cmax(2 * D5), **M5, sub='changes', skill='oral', concept='cmax-dose-proportional',
         steps=[('setup', f'Cmax = 2 × {f2(cmax(D5))} mg/L = {f2(cmax(2*D5))} mg/L', 'With first-order kinetics the whole curve scales with the dose, so twice the dose gives twice the peak at the same time.')],
         setup=dict(eq='oral-cp', pre=['thalf-abs', 'thalf-first', 'tmax'], why='"Dose were increased to 1200 mg" and "maximum concentration" asked, single oral dose. The oral line Cp = [F ka D0/(VD(ka − k))](e^(−kt) − e^(−ka t)) is proportional to D0 at a fixed tmax, so Cmax is twice the part b value.'),
         givens=[['D0', '1200 mg', f'twice {D5} mg, so twice the part b peak'], ['F', f'{int(F5*100)}%', 'unchanged'],
                 ['absorption t½', f'approximately {ta} minutes', 'unchanged, so tmax is unchanged'], ['t½', f'approximately {te} hours', 'unchanged'], ['VD', f'{V5} L', 'unchanged']],
         check=dict(t=f'Cmax is proportional to the dose, so twice {D5} mg gives twice {f2(cmax(D5))} mg/L: {f2(cmax(2*D5))} mg/L, above the part b peak.', lo=round(cmax(D5), 2)),
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1e (her wording; numbers changed)'),
     num('hw5-1f', asks='AUC', stem=S + 'f. If the dose were increased to 1200 mg, what is the AUC that you would expect?', units='(mg/L)·hr', ans=round(auc(2 * D5), 1), calc=auc(2 * D5), **M5, sub='changes', skill='clearance', concept='auc-dose-proportional',
         steps=[('setup', f'AUC = 2 × {f1(auc(D5))} = {f1(auc(2*D5))} (mg/L)·hr', f'AUC = {{{{frac:F D0|Cl}}}}: the amount absorbed over the clearance. F = {F5} and Cl = k × VD = {f4(k5*V5)} L/hr do not change with the dose under first-order kinetics, so AUC is proportional to D0; 1200 mg is twice {D5} mg, and the area doubles from {f1(auc(D5))} to {f1(auc(2*D5))} (mg/L)·hr.')],
         setup=dict(eq='cl-auc', pre=['thalf-first', 'cl-k-vd'], why='"Dose were increased to 1200 mg" and "the AUC" asked, single oral dose. Cl = FD0/AUC rearranged to AUC = F D0/Cl is proportional to the dose at a fixed clearance, so the AUC is twice the part c value.'),
         givens=[['D0', '1200 mg', f'twice {D5} mg, so twice the part c area'], ['F', f'{int(F5*100)}%', 'unchanged'],
                 ['absorption t½', f'approximately {ta} minutes', 'not needed: AUC does not depend on ka'], ['t½', f'approximately {te} hours', 'unchanged'], ['VD', f'{V5} L', 'unchanged']],
         check=dict(t=f'AUC is proportional to the dose at a fixed clearance, so twice {D5} mg gives twice {f1(auc(D5))}: {f1(auc(2*D5))} (mg/L)·hr, above the part c area.', lo=round(auc(D5), 1)),
         teach=T_ORAL, note=NOTE, cite=f'{H(5)}, problem 1f (her wording; numbers changed)')]
chain('hw5-p1', src='homework', module=5, name='Homework 5, problem 1: one oral dose (numbers changed)', setup=f'{D5} mg, F {F5}, absorption t½ {ta} min, t½ {te} hr, VD {V5} L; parts a–f', parts=p)

# ---------------------------------------------------------------- HW5 P2
M6 = dict(module=6, lecture='L07', exam=2, topic='multi')
w6, dk, tau, t6, vp = 72, 12, 6, 3, 0.25
D6 = dk * w6; V6 = vp * w6; k6 = 0.693 / t6; C06 = D6 / V6; R6 = e(-k6 * tau)
cmx = C06 / (1 - R6); cmn = cmx * R6; cav = D6 / (V6 * k6 * tau); c8 = cmx * e(-k6 * 8)
S = (f'2. A {w6} kg male patient received multiple IV bolus injections of {dk} mg/kg every {tau} hours for 36 hours. The medication has an elimination half-life of {t6} hours and an apparent volume of distribution that is {int(vp*100)}% of body weight. ')
st0 = ('unit', f'D0 = ({dk} mg/kg)({w6} kg) = {D6} mg; VD = ({vp})({w6} kg) = {V6:g} L; k = 0.693/{t6} = {f3(k6)} hr⁻¹', f'The dose is {dk} mg per kilogram and the volume of distribution VD is {int(vp*100)}% of body weight, so both are multiplied by the {w6} kg weight: D0 = {D6} mg and VD = {V6:g} L, the kilograms cancelling. k, the elimination rate constant, is {{{{frac:0.693|t½}}}} = {{{{frac:0.693|{t6} hr}}}} = {f3(k6)} hr⁻¹.')
p = [num('hw5-2a', asks='Cavgss', stem=S + 'a. What is the average concentration of drug in the plasma at steady state?', units='mg/L', ans=round(cav, 2), calc=cav, **M6, sub='ssbolus', skill='multidose', concept='cavg-ss',
         steps=[st0, ('algebra', f'Cavg∞ = {{{{frac:D0|VD k τ}}}} = {{{{frac:{D6} mg|({V6:g} L)({f3(k6)} hr⁻¹)({tau} hr)}}}} = {f2(cav)} mg/L', f'Cavg∞, the average steady-state concentration, is the dose absorbed per interval over the plasma volume cleared per interval, Cl × τ with Cl = k × VD: ({V6:g} L)({f3(k6)} hr⁻¹)({tau} hr) = {V6*k6*tau:.2f} L, the hours cancelling. {{{{frac:{D6} mg|{V6*k6*tau:.2f} L}}}} = {f2(cav)} mg/L; F, the fraction absorbed, is 1 for an IV dose.')],
         setup=dict(eq='cavg-ss', pre=['thalf-first'], why=f'"Multiple IV bolus injections" "every {tau} hours" at "steady state", so the repeated-bolus block. Dose, VD, t½ and τ are known and "the average concentration" is asked, so Cavg∞ = F D0/(ClT τ), written as D0/(VD k τ) with F = 1. k first, from t½ = 0.693/k, with dose and VD scaled to the weight.'),
         givens=[['weight', f'{w6} kg', 'scales both the dose and the volume'], ['D0', f'{dk} mg/kg', f'scaled to {w6} kg: {D6} mg, the numerator'],
                 ['τ', f'every {tau} hours', 'in the denominator VD k τ'], ['duration', '36 hours', 'not needed for the number: 12 half-lives, so steady state is reached'],
                 ['t½', f'{t6} hours', f'gives k = {{{{frac:0.693|{t6}}}}} = {f3(k6)} hr⁻¹'], ['VD', f'{int(vp*100)}% of body weight', f'scaled to {w6} kg: {V6:g} L, in the denominator']],
         check=dict(t=f'C0 = {{{{frac:{D6}|{V6:g}}}}} mg/L per dose and kτ = {f3(k6)} × {tau}, so the average is C0 over kτ, a little under three-quarters of C0: {f2(cav)} mg/L, between the steady-state trough and peak.', lo=C06 * R6, hi=2 * C06),
         teach=T_MULTI, note=NOTE, cite=f'{H(5)}, problem 2a (her wording; numbers changed)'),
     num('hw5-2b', asks='Cmaxss', stem=S + 'b. What is the maximum concentration of drug in the plasma at steady state?', units='mg/L', ans=round(cmx, 2), calc=cmx, **M6, sub='ssbolus', skill='multidose', concept='cmax-ss',
         steps=[st0, ('algebra', f'C0 = {{{{frac:{D6} mg|{V6:g} L}}}} = {C06:g} mg/L; kτ = ({f3(k6)})({tau}) = {k6*tau:.3f}; e^(−kτ) = {f3(R6)}', f'C0 = {{{{frac:D0|VD}}}} = {C06:g} mg/L is the rise in concentration each dose produces. kτ = ({f3(k6)} hr⁻¹)({tau} hr) = {k6*tau:.3f}, a pure number, and e^(−kτ) = {f3(R6)} is the fraction of each dose left when the next is given; the interval τ = {tau} hr is {tau/t6:g} half-lives, so a quarter remains.'),
                ('algebra', f'Cmax∞ = {{{{frac:{C06:g} mg/L|1 − {f3(R6)}}}}} = {f2(cmx)} mg/L', f'Each dose adds C0 = {C06:g} mg/L to what remains of the earlier doses; at steady state the peak is the sum C0(1 + e^(−kτ) + e^(−2kτ) + ...) = {{{{frac:C0|1 − e^(−kτ)}}}}. 1 − {f3(R6)} = {1-R6:.3f}, so Cmax∞ = {{{{frac:{C06:g} mg/L|{1-R6:.3f}}}}} = {C06/round(1-R6,3):.2f} mg/L, {f2(cmx)} with the unrounded exponential.')],
         setup=dict(eq='cmax-ss', pre=['thalf-first', 'cp-db-vd'], why=f'"Multiple IV bolus injections" "every {tau} hours" at "steady state". "The maximum concentration" is asked, so Cmax∞ = C0/(1 − e^(−kτ)). k first, from t½ = 0.693/k, and C0 from Cp = DB/VD with the dose and volume scaled to the weight, because the line wants the single-dose peak.'),
         givens=[['weight', f'{w6} kg', 'scales both the dose and the volume'], ['D0', f'{dk} mg/kg', f'scaled to {w6} kg: {D6} mg, the numerator of C0'],
                 ['τ', f'every {tau} hours', f'the exponent kτ = {f3(k6)} × {tau} = {k6*tau:.3f}'], ['duration', '36 hours', 'not needed for the number: 12 half-lives, so steady state is reached'],
                 ['t½', f'{t6} hours', f'gives k = {{{{frac:0.693|{t6}}}}} = {f3(k6)} hr⁻¹'], ['VD', f'{int(vp*100)}% of body weight', f'scaled to {w6} kg: {V6:g} L, the denominator of C0']],
         check=dict(t=f'Six hours is two half-lives of {t6} hours, so a quarter of each dose remains at the next; the peak is C0 = {C06:g} mg/L over 1 − {f3(R6)}, a third more than {C06:g}: {f2(cmx)} mg/L, between {C06:g} and 2 × {C06:g}.', lo=C06, hi=2 * C06),
         teach=T_MULTI, note=NOTE, cite=f'{H(5)}, problem 2b (her wording; numbers changed)'),
     num('hw5-2c', asks='Cminss', stem=S + 'c. What is the minimum concentration of drug in the plasma at steady state?', units='mg/L', ans=round(cmn, 2), calc=cmn, **M6, sub='ssbolus', skill='multidose', concept='cmin-ss',
         steps=[('setup', f'Cmin∞ = Cmax∞ e^(−kτ) = ({f2(cmx)} mg/L)({f3(R6)}) = {f2(cmn)} mg/L', f'Cmin∞, the steady-state trough, is the level just before the next dose: the steady-state peak Cmax∞ = {f2(cmx)} mg/L after one full interval τ = {tau} hr of first-order decline, so Cmin∞ = Cmax∞ e^(−kτ) with e^(−kτ) = {f3(R6)} from part b, a pure number, leaving mg/L: {f2(cmn)} mg/L, which is also Cmax∞ − C0.')],
         setup=dict(eq='cmin-from-cmax', pre=['thalf-first', 'cp-db-vd', 'cmax-ss'], why='"Multiple IV bolus injections" at "steady state", with "the minimum concentration" asked. Cmax∞ from part b and kτ are known, so Cmin∞ = {{frac:C0 e^(−kτ)|1 − e^(−kτ)}}, which is Cmax∞ e^(−kτ): one interval of decline from the steady-state peak.'),
         givens=[['weight', f'{w6} kg', 'scales dose and volume inside the part b peak'], ['D0', f'{dk} mg/kg', f'inside Cmax∞ = {f2(cmx)} mg/L from part b'],
                 ['τ', f'every {tau} hours', f'the exponent kτ, with e^(−kτ) = {f3(R6)}'], ['duration', '36 hours', 'not needed for the number: steady state is reached'],
                 ['t½', f'{t6} hours', f'gives k = {f3(k6)} hr⁻¹; {tau} hours is two half-lives'], ['VD', f'{int(vp*100)}% of body weight', 'inside the part b peak']],
         check=dict(t=f'Six hours is two half-lives of {t6} hours, so the {f2(cmx)} mg/L peak halves twice to a quarter: {f2(cmx)} × {f3(R6)} = {f2(cmn)} mg/L, below the peak; it is also Cmax∞ − C0.', lo=0, hi=round(cmx, 2)),
         teach=T_MULTI, note=NOTE, cite=f'{H(5)}, problem 2c (her wording; numbers changed)'),
     num('hw5-2d', asks='Cp', stem=S + 'd. What is the expected concentration of drug in the plasma 8 hours after administration of the last dose?', units='mg/L', ans=round(c8, 2), calc=c8, **M6, sub='ndose', skill='multidose', concept='c-after-last-dose',
         steps=[('setup', f'C = Cmax∞ e^(−kt) = ({f2(cmx)} mg/L) e^(−({f3(k6)})(8)) = ({f2(cmx)})({f4(e(-k6*8))}) = {f2(c8)} mg/L', f'After the last dose nothing more is given, so the level follows C = C0 e^(−kt) from the steady-state peak Cmax∞ = {f2(cmx)} mg/L, the concentration the moment the last dose is in. kt = ({f3(k6)} hr⁻¹)(8 hr) = {k6*8:.3f}, a pure number, and e^(−{k6*8:.3f}) = {f4(e(-k6*8))} of the peak remains after 8 hours.')],
         setup=dict(eq='cp-after-last', pre=['thalf-first', 'cmax-ss'], why='"Multiple IV bolus injections" at steady state, "8 hours after administration of the last dose". Cp = (D0/VD)(1/(1 − e^(−kτ))) e^(−kt), the steady-state any-time line, is Cmax∞ e^(−kt) with t = 8 hr. Cmax∞ first, from part b, because the line starts from the steady-state peak.'),
         givens=[['weight', f'{w6} kg', 'scales dose and volume inside the part b peak'], ['D0', f'{dk} mg/kg', f'inside Cmax∞ = {f2(cmx)} mg/L from part b, the level the decay starts from'],
                 ['τ', f'every {tau} hours', 'not needed: the time asked is counted from the last dose'], ['duration', '36 hours', 'not needed for the number: steady state is reached'],
                 ['t½', f'{t6} hours', f'gives k = {f3(k6)} hr⁻¹ for the exponent kt = {f3(k6)} × 8'], ['VD', f'{int(vp*100)}% of body weight', 'inside the part b peak'],
                 ['t', '8 hours after administration of the last dose', 't in e^(−kt)']],
         check=dict(t=f'Eight hours is between two and three half-lives of {t6} hours, so between an eighth and a quarter of the {f2(cmx)} mg/L peak remains: {f2(c8)} mg/L, between 0.125 × {f2(cmx)} and 0.25 × {f2(cmx)}.', lo=0.125 * cmx, hi=0.25 * cmx),
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
