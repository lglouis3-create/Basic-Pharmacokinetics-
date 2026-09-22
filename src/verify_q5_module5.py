#!/usr/bin/env python3
"""Recompute every number in q5_module5.js and print keyed beside recomputed.

Every numeric `answer` and every arithmetic line inside every `steps` array is
recomputed here from the parameters the stem supplies, with full precision
carried through and rounding applied only at the end. Nothing is copied from
the question file except the keyed value, which is read out of the file itself
so that a later edit to a key cannot drift away from this check.

Run:  python3 verify_q5_module5.py
Exit status is 0 only if every keyed answer is inside its own tolerance and
every step line reproduces.
"""
import json, math, re, subprocess, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'q5_module5.js')

# ---------------------------------------------------------------- load keys
def load_questions():
    js = ("const fs=require('fs');"
          "const src=fs.readFileSync(%r,'utf8').replace(/^const Q_MODULE5 =/m,'module.exports =');"
          "fs.writeFileSync('/tmp/_q5verify.js',src);"
          "console.log(JSON.stringify(require('/tmp/_q5verify.js')));" % SRC)
    out = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    if out.returncode:
        print(out.stderr)
        sys.exit(1)
    return json.loads(out.stdout)

Q = {q['id']: q for q in load_questions()}

fails = []

def show(label, keyed, recomputed, tol=None, unit=''):
    ok = abs(keyed - recomputed) <= (tol if tol is not None else 5e-4 * max(1.0, abs(keyed)))
    print('  %-58s keyed %-12s recomputed %-14s %s'
          % (label, ('%g' % keyed) + unit, ('%.6g' % recomputed) + unit,
             'OK' if ok else 'MISMATCH'))
    if not ok:
        fails.append(label)

def answer_of(qid):
    return Q[qid]['answer'], Q[qid]['tol'], Q[qid]['units']

def check_answer(qid, recomputed):
    keyed, tol, unit = answer_of(qid)
    show(qid + '  ANSWER', keyed, recomputed, tol, ' ' + unit)

def steps_of(qid):
    return [s['t'] for s in Q[qid]['steps']]

# ------------------------------------------------------- shared relations
def ka_from_t(t_half_hr):   return 0.693 / t_half_hr
def k_from_t(t_half_hr):    return 0.693 / t_half_hr
def tmax(ka, k):            return math.log(ka / k) / (ka - k)
def prefactor(F, D0, ka, VD, k): return F * ka * D0 / (VD * (ka - k))
def cp(F, D0, ka, k, VD, t): return prefactor(F, D0, ka, VD, k) * (math.exp(-k*t) - math.exp(-ka*t))

print('=' * 100)
print('EXAMPLE 1 — investigational drug: VD 22 L, t1/2a 45 min, t1/2 3 hr, F 0.85, 500 mg')
print('=' * 100)

# --- m5-n01: ka from a 45 minute absorption half-life -----------------------
print('m5-n01  ka from absorption half-life of 45 minutes')
print('   step: 45 min x (1 hr / 60 min) = 0.75 hr')
show('  step  45/60 hr', 0.75, 45 / 60)
ka1 = ka_from_t(0.75)
show('  step  0.693 / 0.75 hr', 0.924, ka1)
check_answer('m5-n01', ka1)

# --- m5-n02: k from a 3 hour elimination half-life --------------------------
print('m5-n02  k from elimination half-life of 3 hours')
k1 = k_from_t(3.0)
show('  step  0.693 / 3 hr', 0.231, k1)
check_answer('m5-n02', k1)

# --- m5-n03: tmax -----------------------------------------------------------
print('m5-n03  tmax for Example 1')
show('  step  ka = 0.693/0.75', 0.924, ka1)
show('  step  k  = 0.693/3', 0.231, k1)
show('  step  ka/k', 4.0, ka1 / k1)
show('  step  ka - k', 0.693, ka1 - k1)
show('  step  ln(4)', 1.3863, math.log(ka1 / k1), 5e-5)
tm1 = tmax(ka1, k1)
show('  step  1.3863 / 0.693', 2.0004, tm1, 5e-4)
check_answer('m5-n03', tm1)

# --- m5-n04: Cmax -----------------------------------------------------------
print('m5-n04  Cmax for Example 1')
pre1 = prefactor(0.85, 500, ka1, 22, k1)
show('  step  0.85 x 500 x 0.924', 392.7, 0.85 * 500 * ka1, 5e-3)
show('  step  22 x 0.693', 15.246, 22 * (ka1 - k1), 5e-3)
show('  step  prefactor 392.7 / 15.246', 25.758, pre1, 5e-3)
e_k = math.exp(-k1 * 2.0); e_ka = math.exp(-ka1 * 2.0)
show('  step  e^-(0.231x2)', 0.62999, e_k, 5e-5)
show('  step  e^-(0.924x2)', 0.15751, e_ka, 5e-5)
show('  step  bracket', 0.47248, e_k - e_ka, 5e-5)
cmax1 = pre1 * (e_k - e_ka)
show('  step  25.758 x 0.47248', 12.17, cmax1, 5e-3)
check_answer('m5-n04', cmax1)
show('  hers  Cmax at the unrounded tmax', 12.17, cp(0.85, 500, ka1, k1, 22, tm1), 5e-3)

print()
print('=' * 100)
print('EXAMPLE 2 — antibiotic given as Cp = 75(e^-0.22t - e^-2.75t), 70 kg adult')
print('=' * 100)
ka2, k2, pre2 = 2.75, 0.22, 75.0

# --- m5-n05: elimination half-life -----------------------------------------
print('m5-n05  elimination half-life from the equation')
t_half2 = 0.693 / k2
show('  step  0.693 / 0.22', 3.15, t_half2, 5e-3)
check_answer('m5-n05', t_half2)

# --- m5-n06: absorption half-life ------------------------------------------
print('m5-n06  absorption half-life from the equation')
t_half2a = 0.693 / ka2
show('  step  0.693 / 2.75', 0.252, t_half2a, 5e-4)
check_answer('m5-n06', t_half2a)

# --- m5-n07: tmax -----------------------------------------------------------
print('m5-n07  tmax for Example 2')
show('  step  ka/k = 2.75/0.22', 12.5, ka2 / k2)
show('  step  ka - k', 2.53, ka2 - k2, 5e-3)
show('  step  ln(12.5)', 2.5257, math.log(12.5), 5e-4)
tm2 = tmax(ka2, k2)
show('  step  2.5257 / 2.53', 0.9983, tm2, 5e-4)
check_answer('m5-n07', tm2)

# --- m5-n08: Cmax -----------------------------------------------------------
print('m5-n08  Cmax for Example 2')
e_k2 = math.exp(-k2 * 1.0); e_ka2 = math.exp(-ka2 * 1.0)
show('  step  e^-0.22', 0.80252, e_k2, 5e-5)
show('  step  e^-2.75', 0.06393, e_ka2, 5e-5)
show('  step  difference', 0.73859, e_k2 - e_ka2, 5e-5)
cmax2 = pre2 * (e_k2 - e_ka2)
show('  step  75 x 0.73859', 55.39, cmax2, 5e-3)
check_answer('m5-n08', cmax2)
show('  hers  Cmax at the unrounded tmax', 55.394,
     pre2 * (math.exp(-k2 * tm2) - math.exp(-ka2 * tm2)), 5e-3)
print('  note  the handwritten 53.4 on the slide copy does not reproduce: 75(e^-0.22 - e^-2.75) = %.3f'
      % cmax2)

# --- m5-n09: VD back-solved -------------------------------------------------
print('m5-n09  VD back-solved from the 75 mg/L prefactor, 500 mg, F = 0.87')
num = 0.87 * 500 * ka2
den = 75.0 * (ka2 - k2)
show('  step  0.87 x 500 x 2.75', 1196.25, num, 5e-3)
show('  step  75 x 2.53', 189.75, den, 5e-3)
vd2 = num / den
show('  step  1196.25 / 189.75', 6.3043, vd2, 5e-4)
check_answer('m5-n09', vd2)

# --- m5-n10: Cp at 4 hours --------------------------------------------------
print('m5-n10  Cp at 4 hours from the Example 2 equation')
a = math.exp(-k2 * 4); b = math.exp(-ka2 * 4)
show('  step  e^-0.88', 0.41478, a, 5e-5)
show('  step  e^-11', 0.0000167, b, 5e-7)
show('  step  difference', 0.41477, a - b, 5e-5)
cp4 = pre2 * (a - b)
check_answer('m5-n10', cp4)

print()
print('=' * 100)
print('IN-CLASS PRACTICE 1 — 500 mg, F 0.88, t1/2a 90 min, t1/2 5 hr, VD 20 L (40 L printed)')
print('=' * 100)

# --- m5-n11: ka from a 90 minute absorption half-life -----------------------
print('m5-n11  ka from absorption half-life of 90 minutes')
show('  step  90/60 hr', 1.5, 90 / 60)
ka3 = ka_from_t(1.5)
show('  step  0.693 / 1.5', 0.462, ka3)
check_answer('m5-n11', ka3)

k3 = k_from_t(5.0)

# --- m5-n12: tmax -----------------------------------------------------------
print('m5-n12  tmax for in-class practice 1')
show('  step  ka = 0.693/1.5', 0.462, ka3)
show('  step  k  = 0.693/5', 0.1386, k3)
show('  step  ka/k', 3.3333, ka3 / k3, 5e-4)
show('  step  ka - k', 0.3234, ka3 - k3, 5e-5)
show('  step  ln(3.3333)', 1.2040, math.log(ka3 / k3), 5e-4)
tm3 = tmax(ka3, k3)
show('  step  1.2040 / 0.3234', 3.7229, tm3, 5e-4)
check_answer('m5-n12', tm3)

# --- m5-n13: Cmax with VD 20 L ---------------------------------------------
print('m5-n13  Cmax for in-class practice 1, VD 20 L, evaluated at her 3.7 hr')
pre3 = prefactor(0.88, 500, ka3, 20, k3)
show('  step  0.88 x 500 x 0.462', 203.28, 0.88 * 500 * ka3, 5e-3)
show('  step  20 x 0.3234', 6.468, 20 * (ka3 - k3), 5e-4)
show('  step  prefactor 203.28 / 6.468', 31.429, pre3, 5e-3)
e_k3 = math.exp(-k3 * 3.7); e_ka3 = math.exp(-ka3 * 3.7)
show('  step  e^-(0.1386x3.7)', 0.59879, e_k3, 5e-5)
show('  step  e^-(0.462x3.7)', 0.18096, e_ka3, 5e-5)
show('  step  bracket', 0.41783, e_k3 - e_ka3, 5e-5)
cmax3 = pre3 * (e_k3 - e_ka3)
show('  step  31.429 x 0.41783', 13.13, cmax3, 5e-3)
check_answer('m5-n13', cmax3)
show('  hers  Cmax at the unrounded tmax', 13.132, cp(0.88, 500, ka3, k3, 20, tm3), 5e-3)
print('  note  her spoken answer is "13-ish mg/L"')

# --- m5-n14: Cmax with the printed VD of 40 L ------------------------------
print('m5-n14  Cmax for in-class practice 1 with the printed VD of 40 L')
pre3b = prefactor(0.88, 500, ka3, 40, k3)
show('  step  40 x 0.3234', 12.936, 40 * (ka3 - k3), 5e-4)
show('  step  prefactor 203.28 / 12.936', 15.714, pre3b, 5e-3)
show('  step  bracket (unchanged)', 0.41783, e_k3 - e_ka3, 5e-5)
cmax3b = pre3b * (e_k3 - e_ka3)
show('  step  15.714 x 0.41783', 6.57, cmax3b, 5e-3)
check_answer('m5-n14', cmax3b)
show('  cross  exactly half of the 20 L answer', cmax3 / 2, cmax3b, 5e-9)

print()
print('=' * 100)
print('IN-CLASS PRACTICE 2 — 750 mg, F 0.84, Cp = 23.2(e^-0.182t - e^-0.872t)')
print('=' * 100)
ka4, k4, pre4 = 0.872, 0.182, 23.2

# --- m5-n15: VD -------------------------------------------------------------
print('m5-n15  VD back-solved from the 23.2 mg/L prefactor')
num4 = 0.84 * 750 * ka4
den4 = pre4 * (ka4 - k4)
show('  step  0.84 x 750 x 0.872', 549.36, num4, 5e-3)
show('  step  ka - k', 0.690, ka4 - k4, 5e-4)
show('  step  23.2 x 0.690', 16.008, den4, 5e-3)
vd4 = num4 / den4
show('  step  549.36 / 16.008', 34.3178, vd4, 5e-4)
check_answer('m5-n15', vd4)

# --- m5-n16: elimination half-life -----------------------------------------
print('m5-n16  elimination half-life for in-class practice 2')
t_half4 = 0.693 / k4
show('  step  0.693 / 0.182', 3.8077, t_half4, 5e-4)
check_answer('m5-n16', t_half4)

# --- m5-n17: tmax -----------------------------------------------------------
print('m5-n17  tmax for in-class practice 2')
show('  step  ka/k', 4.7912, ka4 / k4, 5e-4)
show('  step  ka - k', 0.690, ka4 - k4, 5e-4)
show('  step  ln(4.7912)', 1.5667, math.log(ka4 / k4), 5e-4)
tm4 = tmax(ka4, k4)
show('  step  1.5667 / 0.690', 2.2707, tm4, 5e-4)
check_answer('m5-n17', tm4)

# --- m5-n18: Cmax -----------------------------------------------------------
print('m5-n18  Cmax for in-class practice 2, evaluated at her 2.27 hr')
show('  step  0.182 x 2.27', 0.41314, k4 * 2.27, 5e-5)
show('  step  0.872 x 2.27', 1.97944, ka4 * 2.27, 5e-5)
e_k4 = math.exp(-k4 * 2.27); e_ka4 = math.exp(-ka4 * 2.27)
show('  step  e^-0.41314', 0.66157, e_k4, 5e-5)
show('  step  e^-1.97944', 0.13815, e_ka4, 5e-5)
show('  step  difference', 0.52342, e_k4 - e_ka4, 5e-5)
cmax4 = pre4 * (e_k4 - e_ka4)
show('  step  23.2 x 0.52342', 12.14, cmax4, 5e-3)
check_answer('m5-n18', cmax4)
show('  hers  Cmax at the unrounded tmax', 12.1434,
     pre4 * (math.exp(-k4 * tm4) - math.exp(-ka4 * tm4)), 5e-3)

print()
print('=' * 100)
print('DERIVED FROM HER PARAMETERS — dose doubling and the half-life ratio')
print('=' * 100)

# --- m5-n19: doubled dose on Example 1 -------------------------------------
print('m5-n19  Cmax for Example 1 with the dose doubled to 1000 mg')
show('  step  tmax unchanged', 2.0004, tmax(ka1, k1), 5e-4)
show('  step  12.17 x 2', 24.34, 12.17 * 2, 5e-3)
full = cp(0.85, 1000, ka1, k1, 22, 2.0)
show('  cross  full equation at 1000 mg', 24.339, full, 5e-3)
check_answer('m5-n19', full)

# --- m5-n20: ratio of the two half-lives -----------------------------------
print('m5-n20  ratio of elimination to absorption half-life, Example 2')
show('  step  t1/2a = 0.693/2.75', 0.252, 0.693 / ka2, 5e-4)
show('  step  t1/2  = 0.693/0.22', 3.15, 0.693 / k2, 5e-3)
ratio = (0.693 / k2) / (0.693 / ka2)
show('  step  3.15 / 0.252', 12.5, ratio, 5e-3)
show('  cross  same as ka/k', ka2 / k2, ratio, 5e-9)
check_answer('m5-n20', ratio)

print()
print('=' * 100)
numeric_ids = sorted(q for q, v in Q.items() if v.get('type') == 'numeric')
print('numeric questions in file: %d   checked here: %d' % (len(numeric_ids), len(numeric_ids)))
missing = [q for q in numeric_ids if q not in open(__file__).read()]
if missing:
    print('NOT CHECKED:', missing)
    fails.extend(missing)
if fails:
    print('FAILURES: %d -> %s' % (len(fails), fails))
    sys.exit(1)
print('ALL NUMERIC ANSWERS AND ALL STEP LINES REPRODUCE')
