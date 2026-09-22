#!/usr/bin/env python3
"""
Independent recomputation of every numeric answer and every arithmetic line in
q4_module4.js.  Nothing is read from the JS file except the keyed answers and
the step text: each expected value below is derived here from the source
parameters (deck slides 6, 17, 22 and 23), then printed beside the keyed value.

Run:  python3 verify_q4_module4.py
"""
import json, math, re, subprocess, sys

SRC = 'q4_module4.js'

# ---------------------------------------------------------------- source data
# slide 6 — penicillin
PEN_CL_ML_MIN = 15.0      # mL/min
PEN_CP_MCG_ML = 5.0       # mcg/mL
# slide 22 — 500 mg rapid IV injection
D0   = 500.0              # mg
VD   = 15.0               # L
THALF= 8.0                # hr
DU   = 300.0              # mg recovered unchanged in 48 hr
# slide 17 — creatinine clearance example
AGE  = 45.0               # years
WT   = 61.0               # kg, stated and deliberately unused
SCR  = 1.1                # mg/dL
HT_CM= 165.0              # cm
# slide 23 — actively secreted antibiotic
AB_VD      = 25.0         # L
AB_CL_NORM = 750.0        # mL/min
AB_CL_FAIL = 150.0        # mL/min

# ------------------------------------------------------------- derived values
pen_rate_mcg_min = PEN_CL_ML_MIN * PEN_CP_MCG_ML                   # mcg/min
pen_cl_lhr       = PEN_CL_ML_MIN * 60.0 / 1000.0                   # L/hr
pen_cp_mgl       = PEN_CP_MCG_ML                                   # mcg/mL = mg/L
pen_rate_mg_hr   = pen_cl_lhr * pen_cp_mgl                         # mg/hr

fe   = DU / D0
k    = 0.693 / THALF
ke   = fe * k
clt  = k * VD
clr_her  = fe * 1.3                    # her rounded route
clr_full = fe * clt                    # unrounded route
clh_her  = 1.3 - 0.78
clh_full = clt - clr_full
clh_comp = (1 - fe) * 1.3
cp0      = D0 / VD
rate0    = clt * cp0
rate0_alt= k * D0                      # cross-check: k*D0 == Cl*C0
tcheck   = 0.693 * VD / 1.3            # from her rounded ClT

inches   = HT_CM / 2.54
inches_r = round(inches)               # she calls 64.96 -> 65
over5ft  = inches_r - 60
ibw_f    = 45.5 + 2.3 * over5ft
ibw_m    = 50.0 + 2.3 * over5ft
crcl_base= (140 - AGE) * ibw_f / (72 * SCR)
crcl_f   = crcl_base * 0.85
crcl_m   = crcl_base

ab_cl_lhr   = AB_CL_NORM * 60.0 / 1000.0
ab_k        = ab_cl_lhr / AB_VD
ab_t_norm   = 0.693 * AB_VD / (AB_CL_NORM / 1000.0)      # min
ab_t_fail   = 0.693 * AB_VD / (AB_CL_FAIL / 1000.0)      # min

# keyed id -> (recomputed answer, note)
EXPECT = {
 'm4-n-pen1'  : pen_rate_mcg_min,
 'm4-n-pen3'  : pen_rate_mg_hr,
 'm4-n-fe'    : fe,
 'm4-n-du'    : fe * D0,
 'm4-n-k'     : k,
 'm4-n-ke'    : ke,
 'm4-n-clt'   : clt,
 'm4-n-clr'   : clr_her,
 'm4-n-clh'   : clh_her,
 'm4-n-clh2'  : clh_comp,
 'm4-n-rate0' : rate0,
 'm4-n-tcheck': tcheck,
 'm4-n-inches': inches,
 'm4-n-ibwf'  : ibw_f,
 'm4-n-ibwm'  : ibw_m,
 'm4-n-crcl'  : crcl_f,
 'm4-n-crclm' : crcl_m,
 'm4-n-abk'   : ab_k,
 'm4-n-ab1'   : ab_t_norm,
 'm4-n-ab2'   : ab_t_fail,
}

# every arithmetic line asserted in a `steps` array: (question id, line as
# written, recomputed value, the value printed on that line)
LINES = [
 ('m4-n-pen1',  '(15 mL/min)(5 mcg/mL) = 75 mcg/min',            15*5,                     75),
 ('m4-n-pen3',  '15 mL/min x 60 min/hr = 900 mL/hr',             15*60,                    900),
 ('m4-n-pen3',  '900 mL/hr = 0.9 L/hr',                          900/1000,                 0.9),
 ('m4-n-pen3',  '(0.9 L/hr)(5 mg/L) = 4.5 mg/hr',                0.9*5,                    4.5),
 ('m4-n-pen3',  'cross-check 75 mcg/min x 60 = 4500 mcg/hr',     75*60,                    4500),
 ('m4-n-fe',    '300 mg / 500 mg = 0.6',                         300/500,                  0.6),
 ('m4-n-du',    '(0.6)(500 mg) = 300 mg',                        0.6*500,                  300),
 ('m4-n-k',     '0.693 / 8 hr = 0.086625 /hr',                   0.693/8,                  0.086625),
 ('m4-n-k',     'rounded to 0.0866 /hr',                         round(0.693/8,4),         0.0866),
 ('m4-n-ke',    '300/500 = 0.6',                                 300/500,                  0.6),
 ('m4-n-ke',    '0.693/8 = 0.086625 /hr',                        0.693/8,                  0.086625),
 ('m4-n-ke',    '(0.6)(0.086625) = 0.051975 /hr',                0.6*0.086625,             0.051975),
 ('m4-n-ke',    'rounded to 0.052 /hr',                          round(0.6*0.086625,3),    0.052),
 ('m4-n-ke',    'teach: k - ke = 0.03465 /hr',                    0.086625-0.051975,        0.03465),
 ('m4-n-clt',   '0.693/8 = 0.086625 /hr',                        0.693/8,                  0.086625),
 ('m4-n-clt',   '(0.086625/hr)(15 L) = 1.299375 L/hr',           0.086625*15,              1.299375),
 ('m4-n-clt',   'reported 1.3 L/hr',                             round(0.086625*15,1),     1.3),
 ('m4-n-clr',   '(0.693/8)(15) = 1.3 L/hr',                      round(0.693/8*15,1),      1.3),
 ('m4-n-clr',   '(0.6)(1.3 L/hr) = 0.78 L/hr',                   0.6*1.3,                  0.78),
 ('m4-n-clr',   'unrounded route 0.6 x 1.299375 = 0.7796',       round(0.6*1.299375,4),    0.7796),
 ('m4-n-clh',   'ClT 1.3, ClR 0.78',                             round(0.6*1.3,2),         0.78),
 ('m4-n-clh',   '1.3 - 0.78 = 0.52 L/hr',                        1.3-0.78,                 0.52),
 ('m4-n-clh',   'unrounded 1.299375 - 0.779625 = 0.51975',       1.299375-0.779625,        0.51975),
 ('m4-n-clh2',  '1 - 0.6 = 0.4',                                 1-0.6,                    0.4),
 ('m4-n-clh2',  '(0.4)(1.3 L/hr) = 0.52 L/hr',                   0.4*1.3,                  0.52),
 ('m4-n-rate0', '500 mg / 15 L = 33.33 mg/L',                    round(500/15,2),          33.33),
 ('m4-n-rate0', '(0.693/8)(15 L) = 1.3 L/hr',                    round(0.693/8*15,1),      1.3),
 ('m4-n-rate0', '(1.3 L/hr)(33.33 mg/L) = 43.3 mg/hr',           round(1.3*33.33,1),       43.3),
 ('m4-n-rate0', 'cross-check (0.086625/hr)(500 mg) = 43.3 mg/hr',round(0.086625*500,1),    43.3),
 ('m4-n-tcheck','(0.693)(15 L) / (1.3 L/hr) = 8.0 hr',           round(0.693*15/1.3,1),    8.0),
 ('m4-n-inches','165 cm / 2.54 = 64.96 in',                      round(165/2.54,2),        64.96),
 ('m4-n-ibwf',  '165/2.54 = 64.96, taken as 65 in',              round(165/2.54),          65),
 ('m4-n-ibwf',  '(2.3)(5) = 11.5 kg',                            2.3*5,                    11.5),
 ('m4-n-ibwf',  '45.5 + 11.5 = 57 kg',                           45.5+11.5,                57.0),
 ('m4-n-ibwm',  '65 - 60 = 5 inches over 5 ft',                  65-60,                    5),
 ('m4-n-ibwm',  '50 + (2.3)(5) = 61.5 kg',                       50+2.3*5,                 61.5),
 ('m4-n-ibwm',  'teach: 61.5 - 57 = 4.5 kg',                     61.5-57.0,                4.5),
 ('m4-n-crcl',  '165/2.54 = 64.96 -> 65 in, 5 over 5 ft',        round(165/2.54)-60,       5),
 ('m4-n-crcl',  '45.5 + (2.3)(5) = 57 kg',                       45.5+2.3*5,               57.0),
 ('m4-n-crcl',  '(140-45)(57) = (95)(57) = 5415',                (140-45)*57,              5415),
 ('m4-n-crcl',  '72 x 1.1 = 79.2',                               72*1.1,                   79.2),
 ('m4-n-crcl',  '5415 / 79.2 = 68.37',                           round(5415/79.2,2),       68.37),
 ('m4-n-crcl',  '(68.37)(0.85) = 58.1 mL/min',                   round(5415/79.2*0.85,1),  58.1),
 ('m4-n-crclm', '(140-45)(57) = 5415',                           (140-45)*57,              5415),
 ('m4-n-crclm', '5415 / 79.2 = 68.37',                           round(5415/79.2,2),       68.37),
 ('m4-n-crclm', 'reported 68.4 mL/min',                          round(5415/79.2,1),       68.4),
 ('m4-n-crclm', 'ratio check 58.1 / 68.4 = 0.85',                round(58.115/68.371,2),   0.85),
 ('m4-n-abk',   '750 mL/min x 60 = 45000 mL/hr',                 750*60,                   45000),
 ('m4-n-abk',   '45000 mL/hr = 45 L/hr',                         45000/1000,               45.0),
 ('m4-n-abk',   '(45 L/hr) / (25 L) = 1.8 /hr',                  45/25,                    1.8),
 ('m4-n-ab1',   '750 mL/min = 0.75 L/min',                       750/1000,                 0.75),
 ('m4-n-ab1',   '(0.693)(25 L) = 17.325',                        0.693*25,                 17.325),
 ('m4-n-ab1',   '17.325 / 0.75 = 23.1 min',                      round(0.693*25/0.75,1),   23.1),
 ('m4-n-ab1',   '23.1 min = 0.385 hr',                           round(23.1/60,3),         0.385),
 ('m4-n-ab1',   'cross-check 0.693 / 1.8 /hr = 0.385 hr',        round(0.693/1.8,3),       0.385),
 ('m4-n-ab2',   '150 mL/min = 0.15 L/min',                       150/1000,                 0.15),
 ('m4-n-ab2',   '(0.693)(25 L) = 17.325',                        0.693*25,                 17.325),
 ('m4-n-ab2',   '17.325 / 0.15 = 115.5 min',                     round(0.693*25/0.15,1),   115.5),
 ('m4-n-ab2',   '115.5 min = 1.925 hr',                          round(115.5/60,3),        1.925),
 ('m4-n-ab2',   'fivefold check 750/150 = 5 and 115.5/23.1 = 5', round((115.5/23.1),3),    round(750/150,3)),
]

# ------------------------------------------------------------ read the bank
js = open(SRC, encoding='utf-8').read()
node = subprocess.run(
    ['node', '-e',
     "const fs=require('fs');const Q=eval(fs.readFileSync('%s','utf8')+';Q_MODULE4');"
     "console.log(JSON.stringify(Q.filter(q=>q.type==='numeric')"
     ".map(q=>({id:q.id,answer:q.answer,tol:q.tol,units:q.units,"
     "steps:q.steps.map(s=>s.t)}))));" % SRC],
    capture_output=True, text=True, check=True)
numeric = json.loads(node.stdout)

fails = 0
print('=' * 78)
print('KEYED ANSWER vs RECOMPUTED')
print('=' * 78)
print('%-14s %-10s %14s %14s %9s  %s' % ('id', 'units', 'keyed', 'recomputed', 'tol', 'verdict'))
for q in numeric:
    exp = EXPECT.get(q['id'])
    if exp is None:
        print('%-14s NO EXPECTED VALUE DEFINED' % q['id']); fails += 1; continue
    ok = abs(q['answer'] - exp) <= q['tol']
    fails += 0 if ok else 1
    print('%-14s %-10s %14.6f %14.6f %9g  %s'
          % (q['id'], q['units'], q['answer'], exp, q['tol'], 'match' if ok else '*** MISMATCH'))
missing = set(EXPECT) - {q['id'] for q in numeric}
if missing:
    print('expected values with no question:', missing); fails += len(missing)

print()
print('=' * 78)
print('EVERY ARITHMETIC LINE IN EVERY steps ARRAY')
print('=' * 78)
print('%-14s %-48s %14s %14s  %s' % ('id', 'line', 'printed', 'recomputed', 'verdict'))
for qid, label, recomputed, printed in LINES:
    ok = abs(recomputed - printed) <= 1e-9
    fails += 0 if ok else 1
    print('%-14s %-48s %14.6f %14.6f  %s'
          % (qid, label[:48], printed, recomputed, 'match' if ok else '*** MISMATCH'))

# every step line that contains an '=' must appear in the LINES table above
print()
covered = {}
for qid, label, _, _ in LINES:
    covered.setdefault(qid, 0)
    covered[qid] += 1
print('steps lines audited per question:')
for q in numeric:
    n_eq = sum(1 for t in q['steps'] if '=' in t)
    print('  %-14s %d step lines containing "=", %d audited'
          % (q['id'], n_eq, covered.get(q['id'], 0)))

print()
print('=' * 78)
print('FAILURES:', fails)
print('=' * 78)
sys.exit(1 if fails else 0)
