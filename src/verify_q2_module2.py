# -*- coding: utf-8 -*-
"""Independent recomputation of every numeric answer and every arithmetic line
in q2_module2.js. Nothing is read from the bank except the keyed values that
are being checked; all right-hand sides are computed here from the source data."""
import json, math, sys

B = {q['id']: q for q in json.load(open('bank.json', encoding='utf-8'))}
E, N = math.exp, math.log
fails = []

def chk(label, keyed, mine, tol):
    ok = abs(keyed - mine) <= tol
    if not ok: fails.append(label)
    print("  %-58s keyed %-12s mine %-14s %s" %
          (label, ('%g' % keyed), ('%.6g' % mine), 'OK' if ok else '*** MISMATCH ***'))

def ans(qid, mine, note=''):
    q = B[qid]
    print("\n%s  [%s]  units=%s  tol=%s %s" % (qid, q['skill'], q['units'], q['tol'], note))
    chk('ANSWER', q['answer'], mine, q['tol'])

def step(qid, i, label, keyed, mine, tol):
    chk("step %d %s | %s" % (i, B[qid]['steps'][i]['k'], label), keyed, mine, tol)

# ---------------- m2-n-k1 : IV Bolus Practice 1a ----------------
k1 = N(1.59/0.64)/1.0
ans('m2-n-k1', k1)
step('m2-n-k1',1,'ratio 1.59/0.64',           2.4844, 1.59/0.64, 5e-4)
step('m2-n-k1',2,'ln(ratio) = 0.91002',       0.91002, k1, 5e-5)
step('m2-n-k1',3,'reported 0.9100',           0.9100, round(k1,4), 1e-9)

# ---------------- m2-n-t1 ----------------
t1 = 0.693/0.91
ans('m2-n-t1', t1)
step('m2-n-t1',2,'0.693/0.91 = 0.7615',       0.7615, t1, 5e-5)

# ---------------- m2-n-c0a ----------------
c0a = 0.40*E(0.91*2.5)
ans('m2-n-c0a', c0a)
step('m2-n-c0a',1,'exponent 0.91*2.5 = 2.275',2.275, 0.91*2.5, 1e-9)
step('m2-n-c0a',2,'e^2.275 = 9.7279',         9.7279, E(2.275), 5e-5)
step('m2-n-c0a',2,'0.40*9.7279 = 3.8912',     3.8912, c0a, 5e-5)

# ---------------- m2-n-c15 ----------------
c15 = 3.89*E(-0.91*0.25)
ans('m2-n-c15', c15)
step('m2-n-c15',0,'15 min -> 0.25 hr',        0.25, 15.0/60.0, 1e-12)
step('m2-n-c15',2,'exponent -0.91*0.25',     -0.2275, -0.91*0.25, 1e-9)
step('m2-n-c15',2,'e^-0.2275 = 0.79652',      0.79652, E(-0.2275), 5e-6)
step('m2-n-c15',3,'3.89*0.79652 = 3.0985',    3.0985, c15, 5e-5)

# ---------------- m2-n-vd1 ----------------
vd1 = 50.0/3.89
ans('m2-n-vd1', vd1)
step('m2-n-vd1',2,'50/3.89 = 12.853',         12.853, vd1, 5e-4)

# ---------------- m2-n-cl1 ----------------
cl1 = 12.85*0.91
ans('m2-n-cl1', cl1)
step('m2-n-cl1',1,'12.85*0.91 = 11.6935',     11.6935, cl1, 5e-5)
step('m2-n-cl1',2,'unrounded 12.8535*0.91002',11.697, (50/3.89)*N(1.59/0.64), 5e-4)

# ---------------- m2-n-d3a ----------------
d3a = 12.85*0.25
ans('m2-n-d3a', d3a)
step('m2-n-d3a',1,'12.85*0.25 = 3.2125',      3.2125, d3a, 1e-9)
step('m2-n-d3a',2,'50*e^(-0.91*3) = 3.2610',  3.2610, 50*E(-0.91*3), 5e-5)

# ---------------- m2-n-999a ----------------
t999 = 10*0.76
ans('m2-n-999a', t999)
step('m2-n-999a',1,'10 * 0.76 hr = 7.6',      7.6, t999, 1e-12)
step('m2-n-999a',2,'ln(1000)/0.91 = 7.591',   7.591, N(1000)/0.91, 5e-4)

# ---------------- m2-n-k2 : IV Bolus Practice 2a ----------------
k2 = N(6.6/2.18)/(8.0-4.0)
ans('m2-n-k2', k2)
step('m2-n-k2',2,'ratio 6.6/2.18 = 3.0275',   3.0275, 6.6/2.18, 5e-5)
step('m2-n-k2',2,'ln(ratio) = 1.10774',       1.10774, N(6.6/2.18), 5e-6)
step('m2-n-k2',3,'0.276936',                  0.276936, k2, 5e-7)

# ---------------- m2-n-cl2 : IV Bolus Practice 3, problem 1c ----------------
kg   = 187.0/2.2
vd_l = 0.2*kg
k_c2 = 0.693/4.0
cl2  = 0.1733*vd_l
ans('m2-n-cl2', cl2)
step('m2-n-cl2',0,'187 lb / 2.2 = 85.0 kg',   85.0, kg, 5e-3)
step('m2-n-cl2',1,'0.2 L/kg * 85 kg = 17.0 L',17.0, vd_l, 5e-3)
step('m2-n-cl2',2,'0.693/4 = 0.17325 (key prints 0.1733)', 0.17325, k_c2, 1e-9)
step('m2-n-cl2',3,'0.1733*17 = 2.9461',       2.9461, cl2, 5e-5)
step('m2-n-cl2',4,'unrounded 0.17325*17',     2.9453, k_c2*vd_l, 5e-4)

# ---------------- m2-n-deck12 : deck one-compartment practice ----------------
vd_d = 0.10*80.0
d6   = vd_d*15.0
k_d  = N(200.0/d6)/6.0
d12  = 200.0*E(-k_d*12.0)
ans('m2-n-deck12', d12)
step('m2-n-deck12',0,'10% of 80 kg = 8 L',    8.0, vd_d, 1e-12)
step('m2-n-deck12',1,'8 L * 15 mg/L = 120 mg',120.0, d6, 1e-12)
step('m2-n-deck12',2,'ln(200/120)/6 = 0.08514',0.08514, k_d, 5e-6)
step('m2-n-deck12',3,'exponent -1.0217',     -1.0217, -k_d*12, 5e-5)
step('m2-n-deck12',3,'e^-1.0217 = 0.3600',    0.3600, E(-k_d*12), 5e-5)
step('m2-n-deck12',3,'200 * 0.3600 = 72.0 mg',72.0, d12, 5e-3)
print("  %-58s keyed %-12s mine %-14s %s" % ('note: t1/2 = 0.693/k unrounded', '8.14',
      '%.4f' % (0.693/k_d), 'OK' if abs(0.693/k_d-8.14)<0.005 else '*** MISMATCH ***'))
print("  %-58s keyed %-12s mine %-14s %s" % ('note: t1/2 with k = 0.085 (her spoken value)', '8.15',
      '%.4f' % (0.693/0.085), 'OK' if abs(0.693/0.085-8.15)<0.005 else '*** MISMATCH ***'))

# ---------------- m2-n-tb1 : IV Bolus Practice 3, problem 2a ----------------
tb1 = 0.693/0.198
ans('m2-n-tb1', tb1)
step('m2-n-tb1',1,'0.693/0.198 = 3.5000',     3.5000, tb1, 5e-5)

# ---------------- m2-n-c0ab ----------------
c0ab = 10.21+8.53
ans('m2-n-c0ab', c0ab)
step('m2-n-c0ab',1,'10.21 + 8.53 = 18.74',    18.74, c0ab, 1e-9)

# ---------------- m2-n-vp1 ----------------
vp1 = 300.0/(10.21+8.53)
ans('m2-n-vp1', vp1)
step('m2-n-vp1',2,'300/18.74 = 16.009',       16.009, vp1, 5e-4)

# ---------------- m2-n-theo : deck theophylline slide ----------------
theo = 12*E(-5.8*3) + 18*E(-0.16*3)
ans('m2-n-theo', theo)
step('m2-n-theo',1,'e^(-17.4) = 2.76e-8',     2.76e-8, E(-17.4), 5e-10)
step('m2-n-theo',1,'12 * e^-17.4 = 3.3e-7',   0.00000033, 12*E(-17.4), 5e-9)
step('m2-n-theo',2,'e^-0.48 = 0.61878',       0.61878, E(-0.48), 5e-6)
step('m2-n-theo',2,'18 * 0.61878 = 11.138',   11.138, 18*E(-0.48), 5e-4)
step('m2-n-theo',3,'A + B = 30 mg/L',         30.0, 12+18, 1e-12)
step('m2-n-theo',3,'beta t1/2 = 0.693/0.16',  4.33, 0.693/0.16, 5e-3)
step('m2-n-theo',0,'alpha t1/2 = 0.693/5.8',  0.12, 0.693/5.8, 5e-3)

# ---------------- in-class two-compartment sheet: k, k21, k12 ----------------
A,Bc,al,be = 8.45, 5.32, 2.18, 0.114
cross = A*be + Bc*al
sumAB = A + Bc
kk  = al*be*sumAB/cross
k21 = cross/sumAB
k12 = A*Bc*(be-al)**2/(sumAB*cross)

ans('m2-n-koverall', kk)
step('m2-n-koverall',1,'alpha*beta = 0.248520',   0.248520, al*be, 5e-7)
step('m2-n-koverall',1,'A + B = 13.77',           13.77, sumAB, 1e-9)
step('m2-n-koverall',1,'numerator = 3.42212',     3.42212, al*be*sumAB, 5e-6)
step('m2-n-koverall',2,'A*beta = 0.96330',        0.96330, A*be, 5e-6)
step('m2-n-koverall',2,'B*alpha = 11.5976',       11.5976, Bc*al, 5e-5)
step('m2-n-koverall',2,'denominator = 12.56090',  12.56090, cross, 5e-6)
step('m2-n-koverall',3,'3.42212/12.56090',        0.272442, kk, 5e-7)

ans('m2-n-k21', k21)
step('m2-n-k21',1,'cross product = 12.56090',     12.56090, cross, 5e-6)
step('m2-n-k21',2,'12.56090/13.77 = 0.912193',    0.912193, k21, 5e-7)

ans('m2-n-k12', k12)
step('m2-n-k12',1,'beta - alpha = -2.066',       -2.066, be-al, 5e-4)
step('m2-n-k12',1,'(beta-alpha)^2 = 4.268356',    4.268356, (be-al)**2, 5e-7)
step('m2-n-k12',2,'A*B = 44.954',                 44.954, A*Bc, 5e-4)
step('m2-n-k12',2,'numerator = 191.8797',         191.8797, A*Bc*(be-al)**2, 5e-4)
step('m2-n-k12',3,'denominator = 172.9636',       172.9636, sumAB*cross, 5e-4)
step('m2-n-k12',3,'191.8797/172.9636 = 1.109365', 1.109365, k12, 5e-6)

# ---------------- range / consistency checks ----------------
print("\nModel consistency checks")
chk('k21 lies between beta and alpha', 1.0, 1.0 if be < k21 < al else 0.0, 0)
chk('k12 lies between beta and alpha', 1.0, 1.0 if be < k12 < al else 0.0, 0)
chk('overall k exceeds beta',          1.0, 1.0 if kk > be else 0.0, 0)
chk('central volume 250/13.77 (quoted 18.16 L in Vt stem)', 18.16, 250.0/sumAB, 5e-3)

# ---------------- structural checks ----------------
print("\nStructural checks")
skills = {'recall','tell','read','apply','order','krate','conctime','vddose','auc',
          'multicpt','infusion','loading','clearance','crcl','oral'}
ids = set(B)
bad = []
for q in B.values():
    if q['skill'] not in skills: bad.append((q['id'],'bad skill'))
    if q.get('exam')!=1 or q.get('module')!=2: bad.append((q['id'],'bad exam/module'))
    if q.get('lecture') not in ('L02','L03'): bad.append((q['id'],'bad lecture'))
    if q.get('topic') not in ('bolus1','bolus2'): bad.append((q['id'],'bad topic'))
    if not q.get('cite'): bad.append((q['id'],'no cite'))
    if q.get('dupOf') and q['dupOf'] not in ids: bad.append((q['id'],'dangling dupOf'))
    t = q.get('type')
    if t=='numeric':
        if not q.get('steps'): bad.append((q['id'],'no steps'))
        for s in q['steps']:
            if s['k'] not in ('setup','unit','algebra','round'): bad.append((q['id'],'bad step k'))
            if not s.get('why'): bad.append((q['id'],'step without why'))
    elif t=='match':
        if len(q['pairs'])!=len(q['left']): bad.append((q['id'],'pair/left mismatch'))
        if not all(p.get('why') for p in q['pairs']): bad.append((q['id'],'pair without why'))
    else:
        co=[o for o in q['options'] if o['correct']]
        if q.get('multi'):
            if len(co)<2: bad.append((q['id'],'multi with <2 correct'))
            if len(co)==len(q['options']): bad.append((q['id'],'multi with no distractor'))
            if not q['stem'].rstrip().endswith('Select all that apply.'): bad.append((q['id'],'multi stem tag'))
        else:
            if len(co)!=1: bad.append((q['id'],'not exactly 1 correct'))
        if not all(o.get('why') for o in q['options']): bad.append((q['id'],'option without why'))
        longest=max(q['options'], key=lambda o: len(o['t']))
        if longest['correct']: bad.append((q['id'],'correct option is longest'))
print('  structural problems:', bad if bad else 'none')

print("\nCounts")
num=[q for q in B.values() if q.get('type')=='numeric']
mat=[q for q in B.values() if q.get('type')=='match']
mul=[q for q in B.values() if q.get('multi')]
print('  total %d | numeric %d | match %d | plain MC %d (of which select-all %d)'
      % (len(B), len(num), len(mat), len(B)-len(num)-len(mat), len(mul)))
from collections import Counter
print('  by skill:  ', dict(Counter(q['skill'] for q in B.values())))
print('  by lecture:', dict(Counter(q['lecture'] for q in B.values())))
print('  by source: ', dict(Counter(q.get('source') for q in B.values())))
print('  with note: ', sum(1 for q in B.values() if q.get('note')))

print("\n%d arithmetic mismatch(es)" % len(fails))
sys.exit(1 if fails or bad else 0)
