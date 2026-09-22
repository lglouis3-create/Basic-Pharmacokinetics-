#!/usr/bin/env python3
"""Recompute every numeric answer and every arithmetic line in q3_module3.js.

Nothing here reads a value out of the question file except to compare against it:
each expected number below is computed from Dr. Mosley's stated source data.
"""
import json, re, sys
from math import exp, log

SRC = open('q3_module3.js', encoding='utf-8').read()

# ---- pull the numeric questions out of the JS source -----------------------
def questions():
    out = {}
    for block in re.split(r"\n(?=\{id:'inf-)", SRC):
        m = re.match(r"\{id:'(inf-[^']+)'", block)
        if not m or "type:'numeric'" not in block:
            continue
        qid = m.group(1)
        ans = float(re.search(r"\n answer:([-\d.]+),", block).group(1))
        tol = float(re.search(r"\n tol:([-\d.]+),", block).group(1))
        units = re.search(r"\n units:'([^']*)'", block).group(1)
        steps = re.findall(r"\{k:'(setup|unit|algebra|round)', t:'((?:[^'\\]|\\.)*)'", block)
        out[qid] = dict(answer=ans, tol=tol, units=units,
                        steps=[s[1].replace("\\'", "'") for s in steps])
    return out

Q = questions()

# ---- independent recomputation --------------------------------------------
def k_of(t_half): return 0.693 / t_half

ANS = {}   # qid -> recomputed answer
LINES = [] # (qid, step index, label, recomputed value, decimals)

def line(qid, i, label, val, dec):
    LINES.append((qid, i, label, val, dec))

# n1  Example 1: t1/2 6 hr, VD 30 L, R 50 mg/hr
k = k_of(6); cl = k * 30
line('inf-n1', 0, 'k = 0.693/6', k, 4)
line('inf-n1', 1, 'Cl = k*VD', cl, 3)
line('inf-n1', 2, 'Css = 50/Cl', 50 / cl, 2)
line('inf-n1', 3, 'Css reported', 50 / cl, 2)
ANS['inf-n1'] = 50 / cl

# n2  Example 2: R for Css 20 mg/L, same drug
line('inf-n2', 0, 'k = 0.693/6', k, 4)
line('inf-n2', 2, 'R = 20*k*30', 20 * k * 30, 1)
line('inf-n2', 3, 'R reported', 20 * k * 30, 1)
ANS['inf-n2'] = 20 * k * 30

# n3  Example 3: R 50 mg/hr, ClT 4.5 L/hr, k 0.15 /hr, t 8 hr
css3 = 50 / 4.5; f3 = 1 - exp(-0.15 * 8)
line('inf-n3', 1, 'R/Cl = 50/4.5', css3, 2)
line('inf-n3', 2, '1-e^-1.2', f3, 4)
line('inf-n3', 3, 'Cp = 11.11*0.6988', 11.11 * 0.6988, 2)
ANS['inf-n3'] = css3 * f3

# n4  Example 4: time to 90% of Css, k 0.15 /hr
line('inf-n4', 1, '1-0.9', 1 - 0.9, 1)
line('inf-n4', 2, '-ln(0.1)', -log(0.1), 4)
line('inf-n4', 2, 't = 2.3026/0.15', 2.3026 / 0.15, 2)
line('inf-n4', 3, 't reported', -log(0.1) / 0.15, 2)
ANS['inf-n4'] = -log(0.1) / 0.15

# n5  Example 5: Css 15 mg/L, t1/2 5 hr, 12 hr after cessation
k5 = k_of(5)
line('inf-n5', 1, 'k = 0.693/5', k5, 4)
line('inf-n5', 2, 'exponent k*12', k5 * 12, 4)
line('inf-n5', 3, 'Cp = 15*e^-1.6632', 15 * exp(-k5 * 12), 2)
ANS['inf-n5'] = 15 * exp(-k5 * 12)

# n6  Example 6: 150 mg over 6 hr, k 0.231 /hr, VD 15 L, end of infusion
R6 = 150 / 6; cl6 = 0.231 * 15; css6 = R6 / cl6; f6 = 1 - exp(-0.231 * 6)
line('inf-n6', 0, 'R = 150/6', R6, 0)
line('inf-n6', 1, 'Cl = 0.231*15', cl6, 3)
line('inf-n6', 2, 'Css = 25/3.465', css6, 3)
line('inf-n6', 3, 'exponent 0.231*6', 0.231 * 6, 3)
line('inf-n6', 3, '1-e^-1.386', f6, 4)
line('inf-n6', 4, 'Cp6 = 7.215*0.7499', 7.215 * 0.7499, 2)
ANS['inf-n6'] = css6 * f6

# n7  Example 6 continued: 3 hr after cessation
line('inf-n7', 0, 'R = 150/6', R6, 0)
line('inf-n7', 0, 'Cl = 0.231*15', cl6, 3)
line('inf-n7', 1, 'Cpeak = 7.215*0.7499', 7.215 * 0.7499, 2)
line('inf-n7', 3, 'e^-(0.231*3)', exp(-0.231 * 3), 1)
line('inf-n7', 3, 'Cp = 5.41*0.5', 5.41 * 0.5, 2)
ANS['inf-n7'] = css6 * f6 * exp(-0.231 * 3)

# n8  Example 7: R 20 mg/hr, k 0.16 /hr, VD 10 L, target 12.5 mcg/mL
line('inf-n8', 1, 'DL = 20/0.16', 20 / 0.16, 0)
line('inf-n8', 3, 'DL = 12.5*10', 12.5 * 10, 0)
ANS['inf-n8'] = 20 / 0.16

# n9  Example 8: DL 288 mg, R 50 mg/hr, t1/2 4 hr, VD 12 L, at 2 hr
k9 = k_of(4); bolus9 = (288 / 12) * exp(-k9 * 2)
css9 = 50 / (k9 * 12); inf9 = css9 * (1 - exp(-k9 * 2))
line('inf-n9', 1, 'k = 0.693/4', k9, 5)
line('inf-n9', 2, 'DL/VD = 288/12', 288 / 12, 0)
line('inf-n9', 2, 'exponent k*2 = 0.3465', k9 * 2, 4)
line('inf-n9', 2, 'e^-0.3465', exp(-k9 * 2), 4)
line('inf-n9', 2, 'bolus term', bolus9, 2)
line('inf-n9', 3, 'Css = 50/(k*12)', css9, 2)
line('inf-n9', 3, '1-e^-0.3465', 1 - exp(-k9 * 2), 4)
line('inf-n9', 3, 'infusion term', inf9, 2)
line('inf-n9', 4, 'sum 16.97+7.04', 16.97 + 7.04, 2)
ANS['inf-n9'] = bolus9 + inf9

# n10  Recap: Css 24 mg/L, t1/2 5 hr, VD 22 L -> rate
line('inf-n10', 1, 'k = 0.693/5', k5, 4)
line('inf-n10', 2, 'R = 24*k*22', 24 * k5 * 22, 2)
line('inf-n10', 3, 'R rounded', round(24 * k5 * 22), 0)
ANS['inf-n10'] = 24 * k5 * 22

# n11  Recap: Cp at 10 hr (2 half-lives) of a 24 mg/L plateau
line('inf-n11', 0, '10/5 half-lives', 10 / 5, 0)
line('inf-n11', 1, 'fraction at 2 t1/2', 1 - 0.5 ** 2, 2)
line('inf-n11', 2, 'Cp = 0.75*24', 0.75 * 24, 0)
line('inf-n11', 3, 'long route 24*(1-e^-10k)', 24 * (1 - exp(-k5 * 10)), 0)
ANS['inf-n11'] = 0.75 * 24

# n12  Recap: loading dose for Css 24 mg/L, VD 22 L
line('inf-n12', 1, 'DL = 24*22', 24 * 22, 0)
line('inf-n12', 2, 'DL reported', 24 * 22, 0)
ANS['inf-n12'] = 24 * 22

# n13  Recap: infusion stopped at 5 hr (1 t1/2), 3 hr later
line('inf-n13', 0, 'fraction at 1 t1/2', 1 - 0.5, 1)
line('inf-n13', 1, 'Cpeak = 0.5*24', 0.5 * 24, 0)
line('inf-n13', 2, 'k = 0.693/5', k5, 4)
line('inf-n13', 3, 'e^-(0.1386*3)', exp(-k5 * 3), 4)
line('inf-n13', 3, 'Cp = 12*0.6598', 12 * exp(-k5 * 3), 2)
ANS['inf-n13'] = 0.5 * 24 * exp(-k5 * 3)

# n14  In-class 1: Css 20 mg/L, t1/2 5 hr, VD 16 L -> rate
line('inf-n14', 0, 'k = 0.693/5', k5, 4)
line('inf-n14', 2, 'R = 20*k*16', 20 * k5 * 16, 2)
line('inf-n14', 3, 'R rounded', round(20 * k5 * 16), 0)
ANS['inf-n14'] = 20 * k5 * 16

# n15  In-class 4: 3 hr infusion at 44.35 mg/hr, then 4 hr after cessation
cl15 = k5 * 16; peak15 = (44.35 / cl15) * (1 - exp(-k5 * 3))
line('inf-n15', 0, 'Cl = k*16', cl15, 3)
line('inf-n15', 0, 'Cpeak', peak15, 2)
line('inf-n15', 2, 'e^-(0.1386*4)', exp(-k5 * 4), 4)
line('inf-n15', 3, 'Cp = 6.80*0.5744', 6.80 * exp(-k5 * 4), 2)
ANS['inf-n15'] = peak15 * exp(-k5 * 4)

# n16  Practice 3a: time to 95% of Css, t1/2 7 hr
k16 = k_of(7)
line('inf-n16', 0, '1-0.95', 1 - 0.95, 2)
line('inf-n16', 1, '-ln(0.05)', -log(0.05), 2)
line('inf-n16', 2, 'k = 0.693/7', k16, 3)
line('inf-n16', 3, 't = 3/0.099', 3 / 0.099, 1)
ANS['inf-n16'] = 3 / k16

# n17  Practice 3b: Css 10 mg/L, VD 23.1% of 65 kg, t1/2 7 hr -> rate
vd17 = 0.231 * 65
line('inf-n17', 0, 'VD = 0.231*65', vd17, 3)
line('inf-n17', 2, 'k = 0.693/7', k16, 3)
line('inf-n17', 3, 'R = 10*k*VD', 10 * k16 * vd17, 2)
line('inf-n17', 4, 'R recommended', round(10 * k16 * vd17), 0)
ANS['inf-n17'] = 10 * k16 * vd17

# n18  Practice 4a: Cl 5 + 6.55 L/hr, Css 10 mg/L, t1/2 6 hr -> loading dose
cl18 = 5 + 6.55; k18 = k_of(6); r18 = 10 * cl18
line('inf-n18', 0, 'ClT = 5+6.55', cl18, 2)
line('inf-n18', 1, 'R = 10*11.55', r18, 1)
line('inf-n18', 2, 'k = 0.693/6', k18, 4)
line('inf-n18', 3, 'DL = 115.5/0.1155', r18 / k18, 0)
ANS['inf-n18'] = r18 / k18

# ---- report ----------------------------------------------------------------
def fmt(v, dec):
    s = f"{v:.{dec}f}"
    return s

fails = 0
print("=" * 78)
print("ANSWER CHECK  (keyed answer vs independent recomputation)")
print("=" * 78)
print(f"{'id':<10}{'keyed':>12}{'recomputed':>16}{'diff':>12}{'tol':>8}  units")
for qid in sorted(ANS, key=lambda s: int(s[5:])):
    q = Q[qid]; rec = ANS[qid]; d = abs(rec - q['answer'])
    ok = d <= q['tol']
    fails += 0 if ok else 1
    print(f"{qid:<10}{q['answer']:>12}{rec:>16.5f}{d:>12.5f}{q['tol']:>8}  {q['units']}"
          f"   {'PASS' if ok else 'FAIL'}")

print()
print("=" * 78)
print("STEP-LINE CHECK  (every arithmetic line recomputed and matched in the text)")
print("=" * 78)
for qid, i, label, val, dec in LINES:
    text = Q[qid]['steps'][i]
    want = fmt(val, dec)
    alt = fmt(val, dec).rstrip('0').rstrip('.') if dec else want
    hit = (want in text) or (alt in text)
    if not hit:
        fails += 1
    print(f"{qid:<10}[{i}] {label:<26} recomputed {want:>12}   "
          f"{'found in step text' if hit else 'NOT FOUND -> ' + text}")

print()
print(f"numeric questions checked: {len(ANS)}   step lines checked: {len(LINES)}")
print("RESULT:", "ALL CHECKS PASS" if fails == 0 else f"{fails} FAILURE(S)")
sys.exit(1 if fails else 0)
