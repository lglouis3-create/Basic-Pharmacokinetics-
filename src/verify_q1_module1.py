#!/usr/bin/env python3
"""Recompute every numeric `answer` and every arithmetic line in every `steps`
array of q1_module1.js, independently of the file, and print the keyed value
beside the recomputation."""
import json, re, subprocess, sys
from math import log, exp

SRC = 'q1_module1.js'

# ---- pull the bank out of the JS file ------------------------------------
js = open(SRC).read() + "\nconsole.log(JSON.stringify(Q_MODULE1));"
Q = json.loads(subprocess.run(['node', '-e', js], capture_output=True,
                              text=True, check=True).stdout)
BY = {q['id']: q for q in Q}

fails = []
def chk(label, keyed, mine, tol):
    ok = abs(keyed - mine) <= tol
    if not ok: fails.append(label)
    print(f"  {'ok ' if ok else 'FAIL'} {label:<52} keyed {keyed!s:<12} recomputed {mine:.6g}")

def ans(qid):
    q = BY[qid]; return q['answer'], q['tol'], q['units']

print("=" * 96)
print("NUMERIC ANSWERS — keyed value vs independent recomputation")
print("=" * 96)

# m1-ord-n01  first-order k, her points t=6 (208.1) and t=24 (43.8)
a,t,u = ans('m1-ord-n01'); k1 = -log(43.8/208.1)/18
chk('m1-ord-n01  k = -ln(43.8/208.1)/18 hr  ['+u+']', a, k1, t)

# m1-ord-n02  C0 = 123.8 * e^(0.0866*12)
a,t,u = ans('m1-ord-n02'); c0 = 123.8*exp(0.0866*12)
chk('m1-ord-n02  C0 = 123.8*e^(0.0866*12)  ['+u+']', a, c0, t)

# m1-ord-n03  t1/2 = 0.693/0.0866
a,t,u = ans('m1-ord-n03'); h = 0.693/0.0866
chk('m1-ord-n03  t1/2 = 0.693/0.0866  ['+u+']', a, h, t)

# m1-ord-n04  t = ln(10)/0.0866
a,t,u = ans('m1-ord-n04'); t90 = log(1/0.1)/0.0866
chk('m1-ord-n04  t = ln(1/0.1)/0.0866  ['+u+']', a, t90, t)

# m1-ord-n05  zero-order k0, her points t=2 (338) and t=24 (206)
a,t,u = ans('m1-ord-n05'); k0 = -(206-338)/(24-2)
chk('m1-ord-n05  k0 = -(206-338)/(24-2)  ['+u+']', a, k0, t)

# m1-ord-n06  zero-order t1/2 = C0/2k = 350/(2*6)
a,t,u = ans('m1-ord-n06'); z = 350/(2*6)
chk('m1-ord-n06  t1/2 = 350/(2*6)  ['+u+']', a, z, t)

# m1-ord-n08  A0 = 73 + 0.8*40 ; t1/2 = A0/(2*0.8)
a,t,u = ans('m1-ord-n08'); A0 = 73.0 + 0.8*40; z8 = A0/(2*0.8)
chk('m1-ord-n08  A0 = 105 mg -> t1/2 = 105/(2*0.8)  ['+u+']', a, z8, t)

# m1-ord-n09  k = (5.3827-3.3032)/15
a,t,u = ans('m1-ord-n09'); k9 = (5.3827-3.3032)/(16.0-1.0)
chk('m1-ord-n09  k = (5.3827-3.3032)/15  ['+u+']', a, k9, t)

# m1-ord-n10  lnC0 = 5.3827+0.13863 ; V = 200000/C0
a,t,u = ans('m1-ord-n10'); C0h = exp(5.3827 + 0.13863*1.0); V10 = 200000/C0h
chk('m1-ord-n10  V = 200000/e^(5.3827+0.13863)  ['+u+']', a, V10, t)

# m1-ord-n11  k0 = 0.15/1.5 ; A0 = 0.30+k0*2 ; V = 300/A0
a,t,u = ans('m1-ord-n11'); k11 = -(0.30-0.45)/(2.0-0.5); A011 = 0.30+k11*2.0; V11 = 300/A011
chk('m1-ord-n11  V = 300/(0.30+0.1*2)  ['+u+']', a, V11, t)

# m1-ord-n12  12.5% remaining = (1/2)^3 -> 3 * 8 hr
a,t,u = ans('m1-ord-n12'); n12 = log(1/0.125)/log(2)*8.0
chk('m1-ord-n12  [ln(1/0.125)/ln2] * 8 hr  ['+u+']', a, n12, t)

# m1-ord-n14  k = ln(300/80)/30 ; t1/2 = 0.693/k
a,t,u = ans('m1-ord-n14'); k14 = log(300/80)/30; h14 = 0.693/k14
chk('m1-ord-n14  t1/2 = 0.693/[ln(300/80)/30]  ['+u+']', a, h14, t)

# m1-ord-n15  k0 = (300-80)/30 ; t1/2 = 300/(2*k0)
a,t,u = ans('m1-ord-n15'); k15 = (300-80)/30; h15 = 300/(2*k15)
chk('m1-ord-n15  t1/2 = 300/(2*(220/30))  ['+u+']', a, h15, t)
print(f"       [also] with her rounded k0 = 7.33 (mg/mL)/day -> {300/(2*7.33):.4f} days")

# m1-ord-n16  ln(1000)/0.693
a,t,u = ans('m1-ord-n16'); n16 = log(1000)/0.693
chk('m1-ord-n16  ln(1000)/0.693  ['+u+']', a, n16, t)
print(f"       [also] halving table reaches 99.9% decomposed at n = 10")

# m1-auc-n01  trapezia 2->3 and 3->4
a,t,u = ans('m1-auc-n01'); auc1 = (18.4+11.1)/2*1 + (11.1+6.77)/2*1
chk('m1-auc-n01  (18.4+11.1)/2*1 + (11.1+6.77)/2*1  ['+u+']', a, auc1, t)

# m1-auc-n02  trapezia 0.5->1 (0.5 hr) and 1->2 (1 hr)
a,t,u = ans('m1-auc-n02'); auc2 = (38.9+30.3)/2*0.5 + (30.3+18.4)/2*1
chk('m1-auc-n02  (38.9+30.3)/2*0.5 + (30.3+18.4)/2*1  ['+u+']', a, auc2, t)

# ---- every arithmetic line inside every steps[] --------------------------
print()
print("=" * 96)
print("STEP LINES — every arithmetic assertion inside steps[], recomputed")
print("=" * 96)

STEP_CHECKS = {
 # (question id, step index): (printed value, recomputed value, tolerance, label)
 ('m1-ord-n01',0): (1.68, 208.1/123.8, 0.005, '208.1/123.8'),
 ('m1-ord-n01',0): (2.83, 123.8/43.8, 0.005, '123.8/43.8'),
 ('m1-ord-n01',2): (1.55838, log(208.1/43.8), 0.00002, 'ln(208.1/43.8)'),
 ('m1-ord-n01',3): (0.08658, log(208.1/43.8)/18, 0.00001, 'ln(208.1/43.8)/18'),
 ('m1-ord-n02',1): (1.0392, 0.0866*12, 0.0001, '0.0866*12'),
 ('m1-ord-n02',2): (349.98, 123.8*exp(0.0866*12), 0.01, '123.8*e^1.0392'),
 ('m1-ord-n03',1): (8.002, 0.693/0.0866, 0.001, '0.693/0.0866'),
 ('m1-ord-n04',2): (2.302585, log(10), 0.000001, 'ln(10)'),
 ('m1-ord-n04',3): (26.589, log(10)/0.0866, 0.001, 'ln(10)/0.0866'),
 ('m1-ord-n05',0): (24, 338-314, 0, '338-314'),
 ('m1-ord-n05',0): (36, 314-278, 0, '314-278'),
 ('m1-ord-n05',2): (132, 338-206, 0, '338-206'),
 ('m1-ord-n05',3): (6.0, 132/22, 0.0001, '132/22'),
 ('m1-ord-n06',2): (29.167, 350/12, 0.001, '350/12'),
 ('m1-ord-n08',1): (32.0, 0.8*40, 0.0001, '0.8*40'),
 ('m1-ord-n08',1): (105.0, 73.0+0.8*40, 0.0001, '73.0+32.0'),
 ('m1-ord-n08',3): (65.625, 105/(2*0.8), 0.0001, '105/1.6'),
 ('m1-ord-n09',1): (2.0795, 5.3827-3.3032, 0.00001, '5.3827-3.3032'),
 ('m1-ord-n09',2): (0.13863, 2.0795/15, 0.00001, '2.0795/15'),
 ('m1-ord-n10',1): (5.5213, 5.3827+0.13863, 0.0001, '5.3827+0.13863'),
 ('m1-ord-n10',1): (250.0, exp(5.3827+0.13863), 0.05, 'e^5.5213'),
 ('m1-ord-n10',3): (800, 200000/exp(5.3827+0.13863), 0.2, '200000/250.0'),
 ('m1-ord-n11',0): (0.1, -(0.30-0.45)/1.5, 0.0001, '0.15/1.5'),
 ('m1-ord-n11',1): (0.5, 0.30+0.1*2.0, 0.0001, '0.30+0.20'),
 ('m1-ord-n11',2): (600, 300/0.5, 0.0001, '300/0.5'),
 ('m1-ord-n12',2): (24, 3*8, 0, '3*8'),
 ('m1-ord-n14',1): (1.32176, log(300/80), 0.00001, 'ln(300/80) inside step 2'),
 ('m1-ord-n14',1): (0.04406, log(300/80)/30, 0.00001, 'ln(300/80)/30'),
 ('m1-ord-n14',3): (15.73, 0.693/(log(300/80)/30), 0.005, '0.693/0.04406'),
 ('m1-ord-n15',1): (7.333, 220/30, 0.001, '220/30'),
 ('m1-ord-n15',3): (20.45, 300/(2*(220/30)), 0.01, '300/(2*7.3333)'),
 ('m1-ord-n16',2): (6.907755, log(1000), 0.000001, 'ln(1000)'),
 ('m1-ord-n16',2): (9.97, log(1000)/0.693, 0.005, 'ln(1000)/0.693'),
 ('m1-auc-n01',2): (14.75, (18.4+11.1)/2*1, 0.0001, '(18.4+11.1)/2*1'),
 ('m1-auc-n01',3): (8.935, (11.1+6.77)/2*1, 0.0001, '(11.1+6.77)/2*1'),
 ('m1-auc-n01',4): (23.685, 14.75+8.935, 0.0001, '14.75+8.935'),
 ('m1-auc-n02',1): (17.30, (38.9+30.3)/2*0.5, 0.0001, '(38.9+30.3)/2*0.5'),
 ('m1-auc-n02',2): (24.35, (30.3+18.4)/2*1, 0.0001, '(30.3+18.4)/2*1'),
 ('m1-auc-n02',3): (41.65, 17.30+24.35, 0.0001, '17.30+24.35'),
}
# dict keys collapse duplicates, so re-declare the collapsed ones explicitly
EXTRA = [
 ('m1-ord-n01', 0, 1.68,   208.1/123.8,              0.005,  '208.1/123.8'),
 ('m1-ord-n02', 2, 2.8270, exp(0.0866*12),           0.0001, 'e^1.0392 (stated in why)'),
 ('m1-ord-n05', 0, 24,     338-314,                  0,      '338-314'),
 ('m1-ord-n05', 2, 132,    338-206,                  0,      '338-206'),
 ('m1-ord-n08', 1, 32.0,   0.8*40,                   0.0001, '0.8*40'),
 ('m1-ord-n10', 1, 5.5213, 5.3827+0.13863,           0.0001, '5.3827+0.13863'),
 ('m1-ord-n16', 2, 6.907755, log(1000),              1e-6,   'ln(1000)'),
]
rows = [(qid, i, p, m, t, lab) for (qid, i), (p, m, t, lab) in STEP_CHECKS.items()] + EXTRA
rows.sort(key=lambda r: (r[0], r[1]))
for qid, i, printed, mine, tol, lab in rows:
    step = BY[qid]['steps'][i]
    blob = step['t'] + ' ' + step['why']
    present = str(printed).rstrip('0').rstrip('.') in blob.replace(',', '') or str(printed) in blob
    ok = abs(printed - mine) <= tol
    if not ok: fails.append(f'{qid} step {i+1} {lab}')
    if not present: fails.append(f'{qid} step {i+1} value {printed} not found in step text')
    print(f"  {'ok ' if ok and present else 'FAIL'} {qid} step {i+1} [{step['k']:<7}] "
          f"{lab:<22} printed {printed!s:<11} recomputed {mine:.6g}"
          f"{'' if present else '   <-- NOT IN STEP TEXT'}")

# ---- also confirm the classification claims made in option `why` text ----
print()
print("=" * 96)
print("CLASSIFICATION CLAIMS IN OPTION TEXT")
print("=" * 96)
claims = [
 ('m1-ord-c07 losses 89.0->73.0 and 73.0->57.0 over 20 min', 16.0, 89.0-73.0, 0),
 ('m1-ord-c07 second loss',                                   16.0, 73.0-57.0, 0),
 ('m1-ord-c07 ratio 89.0/73.0',                               1.22, 89.0/73.0, 0.005),
 ('m1-ord-c07 ratio 73.0/57.0',                               1.28, 73.0/57.0, 0.005),
 ('m1-ord-c07 ratio 57.0/34.0',                               1.68, 57.0/34.0, 0.005),
 ('m1-ord-c08 dlnC 4->8 hr',                                  0.5542, 4.9670-4.4128, 1e-4),
 ('m1-ord-c08 dlnC 8->12 hr',                                 0.5542, 4.4128-3.8586, 1e-4),
 ('m1-ord-c08 dC 4->8 hr',                                    61.1, 143.6-82.5, 0.05),
 ('m1-ord-c08 dC 8->12 hr',                                   35.1, 82.5-47.4, 0.05),
 ('m1-ord-n05 ratio 338/314',                                 1.08, 338/314, 0.005),
 ('m1-ord-n05 ratio 314/278',                                 1.13, 314/278, 0.005),
]
for lab, printed, mine, tol in claims:
    ok = abs(printed-mine) <= tol
    if not ok: fails.append(lab)
    print(f"  {'ok ' if ok else 'FAIL'} {lab:<56} printed {printed!s:<9} recomputed {mine:.6g}")

print()
print("=" * 96)
print(f"{len(fails)} discrepancies" if fails else "ALL RECOMPUTATIONS AGREE WITH THE KEYED VALUES")
for f in fails: print('  -', f)
sys.exit(1 if fails else 0)
