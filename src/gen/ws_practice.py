import math, sys
sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__)))
from wslib import *
ln, e = math.log, math.exp

# ---------------------------------------------------------------- teach blocks
T_CRCL = [{'h': 'The method, in order', 'list': [
    'Height in centimetres: divide by 2.54 to get inches, then count the inches over 60 (5 ft).',
    'Ideal body weight (IBW): male 50 + 2.3 × (inches over 5 ft); female 45.5 + 2.3 × (inches over 5 ft).',
    'CrCl = {{frac:(140 − age)(IBW)|72 × SCr}}, then × 0.85 if the patient is female.',
    'Her keys use IBW, not the weight given in the stem.',
    'Report CrCl in mL/min. It estimates the glomerular filtration rate (GFR), about 120 mL/min in a healthy adult.']}]
T_THALF_CL = [{'h': 'Half-life from clearance and volume', 'list': [
    'Cl = k × VD (one of the equations she expects without the sheet).',
    'k = 0.693/t½, so t½ = {{frac:0.693 VD|Cl}}.',
    'A larger volume or a smaller clearance gives a longer half-life.',
    'Keep the units matched: L with L/hr gives hours; mL with mL/min gives minutes.']}]
T_DB = [{'h': 'Amount in the body', 'list': [
    'Cp = {{frac:DB|VD}}, so DB = Cp × VD.',
    'mg/L × L = mg: the litres cancel and an amount is left.']}]
T_RATE = [{'h': 'Rate of elimination', 'list': [
    'Rate of elimination = Cl × Cp (on the equation sheet).',
    'L/hr × mg/L = mg/hr: an amount leaving per hour.',
    'Clearance stays constant; the rate falls as the concentration falls. Half the concentration, half the rate.']}]
T_CT = [{'h': 'Concentration at a time after an IV bolus', 'list': [
    'C0 = {{frac:D0|VD}}, the concentration the moment the dose is in.',
    'C = C0 e^(−kt), first-order decline.',
    'k can come from clearance: k = {{frac:Cl|VD}}.']}]
T_FE = [{'h': 'Fraction excreted unchanged', 'list': [
    'fe = {{frac:Du∞|FD0}}: the share of the dose that leaves in urine as unchanged drug.',
    'After an IV dose F = 1, so fe = amount recovered unchanged ÷ dose.',
    'ke = fe × k: the excretion rate constant is the renal share of k.',
    'ClR = fe × ClT, and ClH = ClT − ClR = (1 − fe) ClT.']}]
T_AUC = [{'h': 'AUC from dose and clearance', 'list': [
    'ClT = {{frac:FD0|AUC}}, so AUC = {{frac:FD0|ClT}}.',
    'mg ÷ (L/hr) = (mg/L) × hr, the unit of an area under a concentration–time curve.']}]
T_CLT_K = [{'h': 'Total clearance from volume and half-life', 'list': [
    'k = 0.693/t½.',
    'ClT = VD × k. When VD is given per kilogram or as a percentage of body weight, multiply by the weight first.',
    'L/hr to mL/min: × 1000 mL/L, ÷ 60 min/hr.']}]
T_SPLIT = [{'h': 'Splitting total clearance', 'list': [
    'ClR = fe × ClT (renal: the share excreted unchanged).',
    'ClH = ClT − ClR = (1 − fe) × ClT (hepatic or metabolic: the rest).',
    'ClT = ClR + ClH.']}]
T_MECH = [{'h': 'Reading the renal mechanism', 'list': [
    'Compare renal clearance with the GFR, estimated by CrCl or taken as about 120 mL/min.',
    'Equal to GFR: filtration only.',
    'Greater than GFR: filtration plus active secretion.',
    'Less than GFR: filtration with partial reabsorption.']}]
T_TMAX = [{'h': 'Time to peak after one oral dose', 'list': [
    'tmax = {{frac:ln(ka/k)|ka − k}}.',
    'k = 0.693/t½; ka = 0.693/t½ absorption.',
    'The dose and F do not appear: the time to peak depends only on ka and k.']}]
T_CMAX = [{'h': 'Peak concentration after one oral dose', 'list': [
    'Cp = {{frac:F ka D0|VD(ka − k)}} (e^(−k t) − e^(−ka t)).',
    'Cmax is that equation at t = tmax.',
    'Cmax is proportional to the dose: twice the dose, twice the peak, same tmax.',
    'A smaller k (slower elimination) gives a later and higher peak.']}]
T_COEF = [{'h': 'Reading the fitted oral equation', 'list': [
    'The fitted form is Cp = A(e^(−kt) − e^(−ka t)).',
    'The smaller exponent is k; the larger is ka.',
    'A = {{frac:F ka D0|VD(ka − k)}}, so VD = {{frac:F ka D0|A(ka − k)}}.',
    'Put A in mg/L before solving for a volume in litres.']}]
T_KHALF = [{'h': 'Half-lives from rate constants', 'list': [
    't½ = {{frac:0.693|k}} for elimination; t½a = {{frac:0.693|ka}} for absorption.',
    'In a fitted oral equation the smaller exponent is k and the larger is ka.',
    'A rate constant in hr⁻¹ gives a half-life in hours.']}]
T_C0IV = [{'h': 'The same dose as an IV bolus', 'list': [
    'C0 = {{frac:D0|VD}}, with the whole dose: an IV dose is 100% available, so no F.']}]

CL1 = 'Clearance--26-Elimination-Practice-1-Solutions.pdf'
CL2 = 'Clearance--26-Elimination-Practice-2-Solutions.pdf'
CL3 = 'Clearance--26-Elimination-Practice-3-Solutions-281-29.pdf'
CL4 = 'Clearance--26-Elimination-Practice-4-Solutions.pdf'
M4 = dict(module=4, lecture='L05', topic='clearance')

# ------------------------------------------------------- Clearance Practice 1
s0 = 'Estimate the CrCl of a 36-year-old male who weighs 160 lb, SCr =0.8 mg/dL, and 68” tall.'
ibw = 50 + 2.3 * 8; crcl = (140 - 36) * ibw / (72 * 0.8)
p1 = [num('ws4-1-crcl', stem=s0, units='mL/min', ans=123.5, calc=crcl, **M4, sub='crclcalc', skill='crcl', concept='cockcroft-gault',
    steps=[('unit', '68 in − 60 in = 8 inches over 5 ft', 'The ideal body weight equation counts only the inches above five feet, so 60 inches are subtracted from the height.'),
           ('algebra', 'IBW = 50 + 2.3(8) = 68.4 kg', 'The male form starts at 50 kg. The 160 lb total body weight is not used, because her keys use ideal body weight.'),
           ('setup', 'CrCl = {{frac:(140 − 36)(68.4)|(72)(0.8)}}', 'This is the Cockcroft-Gault equation; the patient is male, so the 0.85 factor for a female patient is not applied.'),
           ('round', 'CrCl = 123.5 mL/min', 'The result is reported to one decimal place in mL/min, the unit creatinine clearance is always given in.')],
    teach=T_CRCL, cite=f'{CL1}, page 1, first problem')]
S1 = 'The average clearance and volume of distribution of an antiepileptic agent in the adult patient population are 0.5 L/hr and 9 L, respectively.'
U1 = ' Urine was collected for 96 hours and 25 mg of unchanged the agent was recovered from the original 700-mg dose.'
k1 = 0.5 / 9
p1 += [
 num('ws4-1a', stem=S1 + ' Calculate the half-life of the agent.', units='hr', ans=12.5, calc=0.693 * 9 / 0.5, **M4, sub='clcalc', skill='krate', concept='thalf-from-cl-vd',
     steps=[('setup', 't½ = {{frac:0.693 VD|Cl}}', 'Cl = k × VD and k = 0.693/t½ combined give t½ = 0.693 VD/Cl, so the half-life comes straight from volume and clearance.'),
            ('algebra', 't½ = {{frac:0.693(9 L)|0.5 L/hr}} = 12.5 hr', 'Litres in the numerator cancel with the litres in L/hr, leaving hours, the unit of a half-life.')],
     teach=T_THALF_CL, cite=f'{CL1}, page 1, part a'),
 num('ws4-1b', stem=S1 + ' What is the amount of the agent in the body when the concentration of drug in the plasma is 60 mg/L?', units='mg', ans=540, calc=60 * 9, **M4, sub='clcalc', skill='vddose', concept='amount-from-cp-vd',
     steps=[('setup', 'DB = Cp × VD', 'Concentration is amount divided by volume, Cp = DB/VD, so multiplying the concentration by the volume gives the amount in the body.'),
            ('algebra', 'DB = (60 mg/L)(9 L) = 540 mg', 'Litres cancel between mg/L and L, leaving milligrams, the amount of drug in the body at that concentration.')],
     teach=T_DB, cite=f'{CL1}, page 1, part b'),
 num('ws4-1c', stem=S1 + ' What is the rate of elimination (mg/hr) when the concentration of drug in the plasma is 50 mg/L?', units='mg/hr', ans=25, calc=50 * 0.5, **M4, sub='clcalc', skill='clearance', concept='rate-of-elimination',
     steps=[('setup', 'Rate of elimination = (Cl)(Cp)', 'The rate of elimination is clearance times concentration, a line on the equation sheet; it gives mg per hour.'),
            ('algebra', 'Rate = (50 mg/L)(0.5 L/hr) = 25 mg/hr', 'Litres cancel between L/hr and mg/L, leaving mg per hour: an amount leaving the body per unit time.')],
     teach=T_RATE, cite=f'{CL1}, page 1, part c'),
 num('ws4-1d', stem=S1 + ' What is the rate of elimination (mg/hr) when the concentration of drug in the plasma is 25 mg/L?', units='mg/hr', ans=12.5, calc=25 * 0.5, **M4, sub='clcalc', skill='clearance', concept='rate-of-elimination',
     steps=[('setup', 'Rate of elimination = (Cl)(Cp)', 'Clearance is constant at 0.5 L/hr, so the rate of elimination is again clearance times the plasma concentration.'),
            ('algebra', 'Rate = (25 mg/L)(0.5 L/hr) = 12.5 mg/hr', 'Clearance is the same as in part c, so half the concentration gives half the rate: elimination rate is proportional to concentration.')],
     teach=T_RATE, cite=f'{CL1}, page 1, part d'),
 num('ws4-1e', stem=S1 + ' What is the expected plasma concentration 12 hours after a 700-mg intravenous bolus dose of the agent?', units='mg/L', ans=40, calc=700 / 9 * e(-0.0556 * 12), **M4, sub='clcalc', skill='conctime', concept='c-at-t-from-cl',
     steps=[('setup', 'k = {{frac:Cl|VD}} = {{frac:0.5 L/hr|9 L}} = 0.0556 hr⁻¹', 'Cl = k × VD rearranged gives k = Cl/VD; litres cancel and reciprocal hours are left, the unit a rate constant needs.'),
            ('setup', 'C = {{frac:D0|VD}} e^(−kt)', 'After an IV bolus the concentration starts at D0/VD and falls exponentially with the first-order rate constant.'),
            ('algebra', 'C12 = {{frac:700 mg|9 L}} e^(−(0.0556)(12)) = (77.78)(0.513)', 'The exponent kt is (0.0556 hr⁻¹)(12 hr) = 0.667, a pure number because the hours cancel.'),
            ('round', 'C12 = 40 mg/L', 'The product is 39.9 mg/L, reported as 40 mg/L; about half the initial 77.8 mg/L remains after 12 hours.')],
     teach=T_CT, cite=f'{CL1}, page 1, part e'),
 num('ws4-1f', stem=S1 + U1 + ' What is the fraction of drug excreted in the urine?', units='(fraction)', ans=0.036, calc=25 / 700, **M4, sub='clcalc', skill='clearance', concept='fe-from-urine',
     steps=[('setup', 'fe = {{frac:Du∞|D0}}', 'The dose was given intravenously, so F = 1, and fe is the amount recovered unchanged divided by the dose.'),
            ('algebra', 'fe = {{frac:25 mg|700 mg}} = 0.036', 'Milligrams cancel between the amount recovered and the dose, so fe is a pure fraction, here 3.6% of the dose.')],
     teach=T_FE, cite=f'{CL1}, page 2, part f'),
 num('ws4-1g', stem=S1 + U1 + ' What is the excretion rate constant of the agent?', units='hr⁻¹', ans=0.002, calc=0.036 * 0.0556, **M4, sub='clcalc', skill='clearance', concept='ke-from-fe',
     steps=[('setup', 'ke = fe × k', 'fe = ke/k rearranged gives ke = fe × k: the excretion rate constant is the renal share of the overall rate constant.'),
            ('algebra', 'ke = (0.036)(0.0556 hr⁻¹) = 0.002 hr⁻¹', 'k is 0.0556 hr⁻¹, the rate constant from part e; fe has no units, so ke is also in reciprocal hours.')],
     teach=T_FE, cite=f'{CL1}, page 2, part g'),
 num('ws4-1h', stem=S1 + U1 + ' What is the renal clearance of the agent?', units='L/hr', ans=0.018, calc=0.036 * 0.5, **M4, sub='clcalc', skill='clearance', concept='clr-from-fe',
     steps=[('setup', 'ClR = fe × ClT', 'Renal clearance is the fraction excreted unchanged times total clearance; fe has no units, so ClR keeps L/hr.'),
            ('algebra', 'ClR = (0.036)(0.5 L/hr) = 0.018 L/hr', 'Renal clearance is fe times total clearance; fe has no units, so the renal clearance keeps the unit L/hr.')],
     teach=T_SPLIT, note='Her key prints the unit as "L/hr⁻¹"; the unit is L/hr.', cite=f'{CL1}, page 2, part h'),
 num('ws4-1i', stem=S1 + U1 + ' What is the metabolic (hepatic) clearance of the agent?', units='L/hr', ans=0.482, calc=0.5 - 0.018, **M4, sub='clcalc', skill='clearance', concept='clh-from-clt',
     steps=[('setup', 'ClH = ClT − ClR', 'Total clearance is renal plus hepatic, so subtracting the renal part from the total leaves the hepatic (metabolic) part.'),
            ('algebra', 'ClH = (0.5 − 0.018) L/hr = 0.482 L/hr', 'Renal clearance is only 0.018 of the 0.5 L/hr total, so almost all of this drug is cleared by metabolism.')],
     teach=T_SPLIT, cite=f'{CL1}, page 2, part i'),
 num('ws4-1j', stem=S1 + U1 + ' What AUC would you expect from the 700-mg dose?', units='(mg/L)·hr', ans=1400, calc=700 / 0.5, **M4, sub='clcalc', skill='clearance', concept='auc-from-cl',
     steps=[('setup', 'AUC = {{frac:D0|ClT}}', 'ClT = FD0/AUC rearranged gives AUC = FD0/ClT, and an IV dose has F = 1, so the whole 700 mg counts.'),
            ('algebra', 'AUC = {{frac:700 mg|0.5 L/hr}} = 1400 (mg/L)·hr', 'Milligrams divided by litres per hour gives (mg/L)·hr, the unit of an area under a concentration–time curve.')],
     teach=T_AUC, cite=f'{CL1}, page 2, part j')]
chain('ws4-p1', src='practice', module=4, name='Clearance & Elimination Practice 1', setup='A CrCl estimate, then an antiepileptic agent (Cl 0.5 L/hr, VD 9 L), parts a–j', parts=p1)

# ------------------------------------------------------- Clearance Practice 2
S2 = '1. A single 250-mg oral dose of an antibiotic is given to a young man (age 32 years, creatinine clearance 122 mL/min, 78 kg). From the literature, the drug is known to have an apparent VD equal to 21% of body weight and an elimination half-life of 2 hours. The dose is normally 90% bioavailable. Urinary excretion of the unchanged drug is equal to 70% of the absorbed dose.'
clt2 = 0.21 * 78 * 0.693 / 2
p2 = [
 num('ws4-2-1a', stem=S2 + ' What is the total body clearance for this drug? (Give it in L/hr.)', units='L/hr', ans=5.676, calc=clt2, **M4, sub='clcalc', skill='clearance', concept='clt-from-vd-k',
     steps=[('unit', 'VD = (0.21)(78 kg) = 16.38 L', 'A volume given as a percentage of body weight is read as litres per kilogram: 21% of 78 kg is 0.21 × 78 = 16.38 L.'),
            ('setup', 'ClT = VD × k, k = {{frac:0.693|2 hr}}', 'Total clearance is the elimination rate constant times the volume of distribution: reciprocal hours times litres gives L/hr.'),
            ('algebra', 'ClT = (16.38 L)(0.3465 hr⁻¹) = 5.676 L/hr', 'Clearance comes from VD and k alone, so the 250 mg dose and the 90% bioavailability are not needed here.')],
     teach=T_CLT_K, cite=f'{CL2}, page 1, part 1a'),
 num('ws4-2-1a2', stem=S2 + ' What is the total body clearance for this drug, in mL/min?', units='mL/min', ans=94.59, calc=clt2 * 1000 / 60, **M4, sub='clcalc', skill='clearance', concept='l-hr-to-ml-min',
     steps=[('unit', '(5.676 L/hr)({{frac:1000 mL|1 L}})({{frac:1 hr|60 min}}) = 94.59 mL/min', 'Litres become millilitres (× 1000) and hours become minutes (÷ 60), so total clearance is in the same unit as CrCl.')],
     teach=T_CLT_K, cite=f'{CL2}, page 1, part 1a'),
 num('ws4-2-1b', stem=S2 + ' What is the renal clearance for this drug?', units='mL/min', ans=66.22, calc=0.7 * clt2 * 1000 / 60, **M4, sub='clcalc', skill='clearance', concept='clr-from-fe',
     steps=[('setup', 'ClR = fe × ClT, fe = 0.7', 'Urinary excretion of unchanged drug is 70% of the absorbed dose, so fe = 0.7 and renal clearance is 0.7 of the total.'),
            ('algebra', 'ClR = (0.7)(94.59 mL/min) = 66.22 mL/min', 'Using the unrounded total clearance, 94.594 mL/min, gives 66.22; the rounded 94.59 gives 66.21. Both are the same answer.')],
     teach=T_SPLIT, note='0.7 × 94.59 gives 66.21; her key prints 66.22 because it carries the unrounded 94.594. Either is accepted.', cite=f'{CL2}, page 1, part 1b'),
 mc('ws4-2-1c', stem=S2 + ' What is the probable mechanism for renal clearance of this drug?', **M4, sub='renalmech', skill='apply', concept='mechanism-from-clr',
    options=[('Filtered at the glomerulus and partially reabsorbed', True, 'Renal clearance, 66.22 mL/min, is less than the creatinine clearance, 122 mL/min, the estimate of GFR. Less than filtration means some filtered drug returns to the blood.'),
             ('Filtered and actively secreted', False, 'Active secretion adds drug to the urine on top of filtration, so renal clearance would be above GFR. Here it is below.'),
             ('Filtered only, nothing else', False, 'Filtration alone gives a renal clearance equal to the GFR, about 122 mL/min for this patient, not the 66 mL/min found here.'),
             ('Cleared mainly by the liver', False, 'fe is 0.7, so most of the absorbed dose leaves through the kidney; the question is how the kidney handles it.')],
    teach=T_MECH, cite=f'{CL2}, page 1, part 1c')]
S22 = '2. Estimate the creatinine clearance of a 37-year-old female who weighs 143 lb, serum creatinine of 0.6 mg/dL, and stands 5’6” tall.'
ibw = 45.5 + 2.3 * 6
p2.append(num('ws4-2-2', stem=S22, units='mL/min', ans=120.2, calc=0.85 * (140 - 37) * ibw / (72 * 0.6), **M4, sub='crclcalc', skill='crcl', concept='cockcroft-gault',
    steps=[('unit', '5 ft 6 in: 6 inches over 5 ft', 'A height of 5 ft 6 in is already in feet and inches, so the inches over 5 ft, 6, are read straight off it.'),
           ('algebra', 'IBW = 45.5 + 2.3(6) = 59.3 kg', 'The female form starts at 45.5 kg. The 143 lb total body weight is not used, because her keys use ideal body weight.'),
           ('setup', 'CrCl = 0.85 × {{frac:(140 − 37)(59.3)|(72)(0.6)}}', 'This is the Cockcroft-Gault equation; the patient is female, so the result is multiplied by 0.85.'),
           ('round', 'CrCl = 120.2 mL/min', 'The result is reported to one decimal place in mL/min, the unit creatinine clearance is always given in.')],
    teach=T_CRCL, cite=f'{CL2}, page 1, problem 2'))
chain('ws4-p2', src='practice', module=4, name='Clearance & Elimination Practice 2', setup='An oral antibiotic in a 78-kg man (VD 21%, t½ 2 hr, fe 0.7), then a CrCl estimate', parts=p2)

# ------------------------------------------------------- Clearance Practice 3
S3 = 'Cefprozil, 500 mg oral every 12 hours for 10 days, has been prescribed for patient, KL. KL is a 42 year old male, who is 178 cm tall and weighs 73 kg and has a serum creatinine of 0.82 mg/dL. Cefprozil is well absorbed with a bioavailability of about 95%. The half-life of elimination in adults with normal hepatic and renal function is about 1.3 hours, 5.2 hours in adults with renal impairment (120 > CrCl > 30mL/min), and 5.9 hours in patients with renal failure (CrCl< 30mL/min),. The apparent volume of distribution is 0.23 L/kg. About 60% of the drug is excreted in the urine as unchanged drug. According to the manufacturer\'s labeling for adults, no dosage adjustment is necessary if the CrCl ≥30 mL/minute and the dose should be reduced by 50% if CrCl <30 mL/minute.'
clt3 = 0.23 * 73 * 0.693 / 1.3 * 1000 / 60
clt3f = 0.23 * 73 * 0.693 / 5.2 * 1000 / 60
p3 = [
 num('ws4-3a', stem=S3 + ' a. Estimate KL’s creatinine clearance.', units='mL/min', ans=121.17, calc=(140 - 42) * 73 / (72 * 0.82), **M4, sub='crclcalc', skill='crcl', concept='cockcroft-gault',
     steps=[('unit', '178 cm ÷ 2.54 = 70.08 in, taken as 10 in over 5 ft', 'The inches over 5 ft are rounded to a whole number before the IBW is computed, the way her keys do it.'),
            ('algebra', 'IBW = 50 + 2.3(10) = 73 kg', 'The male form of the ideal body weight equation starts at 50 kg and adds 2.3 kg for each inch over 5 ft.'),
            ('setup', 'CrCl = {{frac:(140 − 42)(73 kg)|(72)(0.82)}} = 121.17 mL/min', 'This is the Cockcroft-Gault equation; the patient is male, so the 0.85 factor for a female patient is not applied.')],
     teach=T_CRCL, note='With 10.08 inches instead of 10, IBW is 73.18 kg and CrCl 121.47 mL/min; both are accepted.', cite=f'{CL3}, page 1, part a'),
 num('ws4-3b', stem=S3 + ' b. Estimate the total body clearance (mL/min) of cefprozil in KL.', units='mL/min', ans=149, calc=clt3, **M4, sub='clcalc', skill='clearance', concept='clt-from-vd-k',
     steps=[('setup', 'ClT = (0.23 L/kg)(73 kg)({{frac:0.693|1.3 hr}}) = 8.95 L/hr', 'KL has normal renal function here, so the 1.3 hr half-life is used, and VD in L/kg is multiplied by 73 kg.'),
            ('unit', '(8.95 L/hr)({{frac:1000 mL|L}})({{frac:1 hr|60 min}}) = 149 mL/min', 'Converting to mL/min puts total clearance in the same unit as creatinine clearance, so the two can be compared.')],
     teach=T_CLT_K, cite=f'{CL3}, page 1, part b'),
 num('ws4-3c', stem=S3 + ' c. Estimate the renal clearance (mL/min) of cefprozil in KL.', units='mL/min', ans=89.5, calc=0.6 * clt3, **M4, sub='clcalc', skill='clearance', concept='clr-from-fe',
     steps=[('setup', 'ClR = fe × ClT = (0.6)(149 mL/min)', 'About 60% of the drug is excreted unchanged in urine, so fe = 0.6 and renal clearance is 0.6 of total clearance.'),
            ('round', 'ClR = 89.5 mL/min', 'The total clearance unrounded is 149.17 mL/min, and 0.6 of it is 89.50 mL/min, reported to one decimal.')],
     teach=T_SPLIT, note='(0.6)(149) gives 89.4; her key prints 89.5 from the unrounded 149.17. Either is accepted.', cite=f'{CL3}, page 1, part c'),
 num('ws4-3d', stem=S3 + ' d. Estimate the hepatic clearance (mL/min) of cefprozil in KL.', units='mL/min', ans=59.5, calc=clt3 - 0.6 * clt3, **M4, sub='clcalc', skill='clearance', concept='clh-from-clt',
     steps=[('setup', 'ClH = ClT − ClR = (149 − 89.5) mL/min = 59.5 mL/min', 'Total clearance is renal plus hepatic, so whatever is not cleared by the kidney is cleared by the liver.')],
     teach=T_SPLIT, cite=f'{CL3}, page 1, part d'),
 num('ws4-3e', stem=S3 + ' e. If KL developed some severe complications and his serum creatinine sky-rocketed to 2.8 mg/dL, revise your estimate of KL’s creatinine clearance.', units='mL/min', ans=35.49, calc=(140 - 42) * 73 / (72 * 2.8), **M4, sub='crclcalc', skill='crcl', concept='cockcroft-gault',
     steps=[('setup', 'CrCl = {{frac:(140 − 42)(73 kg)|(72)(2.8)}} = 35.49 mL/min', 'Only the serum creatinine changes; it sits in the denominator, so a higher SCr gives a lower creatinine clearance.')],
     teach=T_CRCL, cite=f'{CL3}, page 1, part e'),
 num('ws4-3f', stem=S3 + ' f. Provide a new estimate of the total body clearance (mL/min) of cefprozil in KL assuming his volume of distribution is unchanged.', units='mL/min', ans=37.29, calc=clt3f, **M4, sub='clcalc', skill='clearance', concept='clt-from-vd-k',
     steps=[('setup', '35.49 mL/min lies between 30 and 120, so t½ = 5.2 hr', 'The stem gives a half-life for each CrCl band; 35.49 mL/min lies between 30 and 120, so the 5.2 hr value applies.'),
            ('algebra', 'ClT = (0.23 L/kg)(73 kg)({{frac:0.693|5.2 hr}}) = 2.24 L/hr', 'The volume of distribution is unchanged and the half-life is now 5.2 hr, so k and the clearance are both smaller.'),
            ('unit', '(2.24 L/hr)({{frac:1000 mL|L}})({{frac:1 hr|60 min}}) = 37.29 mL/min', 'The unrounded 2.2376 L/hr converts to 37.29 mL/min; the rounded 2.24 L/hr would give 37.33.')],
     teach=T_CLT_K, note='The rounded 2.24 L/hr gives 37.33 mL/min; her key prints 37.29 from 2.2376. Either is accepted.', cite=f'{CL3}, page 2, part f'),
 num('ws4-3g', stem=S3 + ' g. Provide a new estimate of the renal clearance (mL/min) of cefprozil in KL.', units='mL/min', ans=22.38, calc=0.6 * clt3f, **M4, sub='clcalc', skill='clearance', concept='clr-from-fe',
     steps=[('setup', 'ClR = (0.6)(37.29 mL/min) = 22.38 mL/min', 'The fraction excreted unchanged is still 0.6, so renal clearance is 0.6 of the new, lower total clearance.')],
     teach=T_SPLIT, cite=f'{CL3}, page 2, part g'),
 num('ws4-3h', stem=S3 + ' h. Provide a new estimate of the hepatic clearance (mL/min) of cefprozil in KL.', units='mL/min', ans=14.91, calc=0.4 * clt3f, **M4, sub='clcalc', skill='clearance', concept='clh-from-clt',
     steps=[('setup', 'ClH = (37.29 − 22.38) mL/min = 14.91 mL/min', 'Total clearance minus renal clearance leaves hepatic clearance, because the two routes add up to the total.')],
     teach=T_SPLIT, cite=f'{CL3}, page 2, part h')]
chain('ws4-p3', src='practice', module=4, name='Clearance & Elimination Practice 3: cefprozil', setup='KL, 42-year-old male, 178 cm, SCr 0.82 then 2.8 mg/dL; VD 0.23 L/kg, fe 0.6; parts a–h', parts=p3)

# ------------------------------------------------------- Clearance Practice 4
S4 = '1. A new antibiotic is excreted by the kidney. The apparent volume of distribution is 25L in the normal adult. The clearance of this drug is 300 mL/min.'
p4 = [
 mc('ws4-4-1a', stem=S4 + ' a. What is the probable mechanism of renal excretion of this drug?', **M4, sub='renalmech', skill='apply', concept='mechanism-from-clr',
    options=[('Active secretion', True, 'Clearance, 300 mL/min, is well above GFR (about 120 mL/min). Only secretion can clear more plasma than is filtered.'),
             ('Filtration only', False, 'Filtration alone clears plasma at the GFR, about 120 mL/min; a renal clearance of 300 mL/min is more than filtration can do.'),
             ('Filtration with partial reabsorption', False, 'Reabsorption returns filtered drug to the blood, which puts renal clearance below the GFR; here it is above.'),
             ('Hepatic metabolism', False, 'The stem says the drug is excreted by the kidney, so the clearance given is renal and the question is which renal process.')],
    teach=T_MECH, cite=f'{CL4}, page 1, part 1a'),
 num('ws4-4-1b', stem=S4 + ' b. What is the usual t½ for this drug?', units='min', ans=58, calc=0.693 * 25000 / 300, **M4, sub='clcalc', skill='krate', concept='thalf-from-cl-vd',
     steps=[('unit', 'VD = 25 L = 25,000 mL', 'Clearance is given in mL/min, so the volume is converted to mL as well; then mL cancels and the half-life comes out in minutes.'),
            ('algebra', 't½ = {{frac:(0.693)(25,000 mL)|300 mL/min}} = 58 min', 'Millilitres cancel between the volume and the clearance, so the half-life comes out in minutes.')],
     teach=T_THALF_CL, cite=f'{CL4}, page 1, part 1b'),
 num('ws4-4-1c', stem=S4 + ' c. What would be the new t½ for this drug in an adult with partial renal failure whose clearance of the antibiotic was 125 mL/min?', units='min', ans=139, calc=0.693 * 25000 / 125, **M4, sub='clcalc', skill='krate', concept='thalf-from-cl-vd',
     steps=[('algebra', 't½ = {{frac:(0.693)(25,000 mL)|125 mL/min}} = 139 min', 'The volume is the same and the clearance is lower, so the half-life is longer: 125 mL/min gives 139 minutes.')],
     teach=T_THALF_CL, cite=f'{CL4}, page 1, part 1c')]
S42 = '2. Estimate the CrCl of a 42-year-old female who weighs 82kg, SCr =0.9 mg/dL, and 170 cm tall.'
ibw = 45.5 + 2.3 * 7
p4.append(num('ws4-4-2', stem=S42, units='mL/min', ans=79.19, calc=0.85 * (140 - 42) * ibw / (72 * 0.9), **M4, sub='crclcalc', skill='crcl', concept='cockcroft-gault',
    steps=[('unit', '170 cm ÷ 2.54 = 66.93 in, taken as 7 in over 5 ft', 'The inches over 5 ft are rounded to a whole number before the IBW is computed, the way her keys do it.'),
           ('algebra', 'IBW = 45.5 + 2.3(7) = 61.6 kg', 'The female form starts at 45.5 kg. The 82 kg total body weight is not used, because her keys use ideal body weight.'),
           ('setup', 'CrCl = 0.85 × {{frac:(140 − 42)(61.6)|(72)(0.9)}} = 79.19 mL/min', 'This is the Cockcroft-Gault equation; the patient is female, so the result is multiplied by 0.85.')],
    teach=T_CRCL, note='With 6.93 inches instead of 7, IBW is 61.44 kg and CrCl 78.98 mL/min; both are accepted.', cite=f'{CL4}, page 1, problem 2'))
chain('ws4-p4', src='practice', module=4, name='Clearance & Elimination Practice 4', setup='A secreted antibiotic (VD 25 L, Cl 300 then 125 mL/min), then a CrCl estimate', parts=p4)

# ------------------------------------------------------- Single Oral Practice 1
O1 = 'Daily-Practice-Singler-Oral-1---Solutions.pdf'
O2 = 'Daily-Practice-Single-Oral-2---Solutions.pdf'
O3 = 'Daily-Practice-Single-Oral-3-Solutions.pdf'
M5 = dict(module=5, lecture='L06', topic='oral')
SO1 = ('Procainamide is used for the treatment of ventricular tachyarrhythmia. It is administered intravenously, intramuscularly, and orally (Canada), and its therapeutic range is 4 to 8 mcg/mL. '
       'When a 750 mg dose is administered intravenously to a normal healthy subject: the elimination half-life is 3 hr; the apparent volume of distribution is 140 L or 2 L/kg; 65% is excreted in the urine; 35% is metabolized. '
       'When a 250 mg tablet is administered orally to a normal healthy subject: the absorption rate constant is 2.8 hr⁻¹; fraction of dose absorbed is 85.54%. Determine the following from the data provided: ')
k = 0.693 / 3; ka = 2.8; F = 0.8554; V = 140
tm = ln(ka / k) / (ka - k); cm = lambda D, t, kk: F * D * ka / (V * (ka - kk)) * (e(-kk * t) - e(-ka * t))
k14 = 0.693 / 14; tm14 = ln(ka / k14) / (ka - k14)
q = []
q.append(num('ws5-1-1t', stem=SO1 + '1. Total body clearance (and renal and metabolic clearance). What is the total body clearance?', units='L/hr', ans=32.34, calc=140 * k, **M5, sub='conc', skill='clearance', concept='clt-from-vd-k',
    steps=[('setup', 'ClT = VD × k = (140 L)({{frac:0.693|3 hr}}) = 32.34 L/hr', 'Clearance is k times the volume of distribution, with k from the 3 hr half-life measured after the IV dose.')], teach=T_CLT_K, cite=f'{O1}, page 1, part 1'))
q.append(num('ws5-1-1r', stem=SO1 + '1. Total body clearance, renal clearance and metabolic clearance. What is the renal clearance?', units='L/hr', ans=21.02, calc=140 * k * 0.65, **M5, sub='conc', skill='clearance', concept='clr-from-fe',
    steps=[('setup', 'ClR = fe × ClT = (32.34 L/hr)(0.65) = 21.02 L/hr', 'The stem says 65% is excreted in the urine unchanged, so fe = 0.65 and the renal clearance is 0.65 of the total.')], teach=T_SPLIT, cite=f'{O1}, page 1, part 1'))
q.append(num('ws5-1-1m', stem=SO1 + '1. Total body clearance, renal clearance and metabolic clearance. What is the metabolic clearance?', units='L/hr', ans=11.32, calc=140 * k * 0.35, **M5, sub='conc', skill='clearance', concept='clh-from-clt',
    steps=[('setup', 'ClH = (32.34 L/hr)(0.35) = 11.32 L/hr', 'The stem says 35% of the dose is metabolized, so the metabolic (hepatic) clearance is 0.35 of the total clearance.')], teach=T_SPLIT, cite=f'{O1}, page 1, part 1'))
q.append(num('ws5-1-2t', stem=SO1 + '2. Time to peak following the oral administration of a 250 mg dose.', units='hr', ans=0.97, calc=tm, **M5, sub='peak', skill='oral', concept='tmax-oral',
    steps=[('setup', 'k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹', 'The elimination rate constant is 0.693 divided by the 3 hr half-life; it is needed because tmax depends on k.'),
           ('algebra', 'tmax = {{frac:ln(2.8/0.231)|(2.8 − 0.231) hr⁻¹}} = 0.97 hr', 'ka/k is a ratio of two rate constants, a pure number, and dividing its log by (ka − k) in hr⁻¹ gives hours.')], teach=T_TMAX, cite=f'{O1}, page 1, part 2'))
q.append(num('ws5-1-2c', stem=SO1 + '2. Maximum plasma concentration following the oral administration of a 250 mg dose.', units='mg/L', ans=1.22, calc=cm(250, tm, k), **M5, sub='peak', skill='oral', concept='cmax-oral',
    steps=[('setup', 'Cmax = {{frac:F ka D0|VD(ka − k)}} (e^(−k tmax) − e^(−ka tmax))', 'Cmax is the single-dose oral equation evaluated at tmax; the dose, F and both rate constants are needed.'),
           ('algebra', 'Cmax = {{frac:(0.8554)(250 mg)(2.8 hr⁻¹)|140 L (2.8 − 0.231) hr⁻¹}} (e^(−(0.97)(0.231)) − e^(−(0.97)(2.8)))', 'Reciprocal hours cancel between ka and (ka − k), and mg ÷ L leaves mg/L, so the peak comes out as a concentration.'),
           ('round', 'Cmax = 1.22 mg/L', 'The peak is reported to two decimal places in mg/L, which is the same as mcg/mL for comparison with the range.')], teach=T_CMAX, cite=f'{O1}, page 1, part 2'))
q.append(num('ws5-1-2d', stem=SO1 + '2. Maximum plasma concentration following the oral administration of a 500 mg dose.', units='mg/L', ans=2.44, calc=cm(500, tm, k), **M5, sub='peak', skill='oral', concept='cmax-dose-proportional',
    steps=[('setup', 'Same equation, D0 = 500 mg; tmax is still 0.97 hr', 'tmax depends only on ka and k, so the 500 mg dose peaks at the same 0.97 hr as the 250 mg dose.'),
           ('algebra', 'Cmax = {{frac:(0.8554)(500 mg)(2.8 hr⁻¹)|140 L (2.8 − 0.231) hr⁻¹}} (e^(−(0.97)(0.231)) − e^(−(0.97)(2.8))) = 2.44 mg/L', 'With first-order kinetics the peak is proportional to the dose, so twice the dose gives twice the peak, 2.44 mg/L.')], teach=T_CMAX, cite=f'{O1}, page 1, part 2'))
q.append(mc('ws5-1-3', stem=SO1 + '3. Whether the 250 mg tablet will provide a maximum plasma concentration sufficient to control the arrhythmia.', **M5, sub='peak', skill='apply', concept='cmax-vs-range',
    options=[('No: its peak, 1.22 mg/L, is below the 4 mcg/mL lower limit', True, '1 mg/L and 1 mcg/mL are the same concentration, so the 1.22 mg/L peak is 1.22 mcg/mL, which never reaches the 4 to 8 mcg/mL range.'),
             ('Yes: 1.22 mg/L is above 1 mcg/mL', False, 'This compares the peak with the wrong number. The therapeutic range starts at 4 mcg/mL, and 1.22 is below it.'),
             ('Yes, after unit conversion 1.22 mg/L is 1220 mcg/mL', False, 'Converting 1 mg/L gives 1000 mcg in 1000 mL, which is 1 mcg/mL. Multiplying by 1000 forgets that the volume also changed.'),
             ('It cannot be judged without the AUC', False, 'The question asks about the peak, and Cmax is compared with the therapeutic range directly; no AUC is needed.')],
    teach=[{'h': 'Comparing a peak with a range', 'list': ['mg/L and mcg/mL are the same size: 1 mg/L = 1 mcg/mL.', 'A peak below the lower limit of the range never reaches an effective level.']}], cite=f'{O1}, page 2, part 3'))
q.append(mc('ws5-1-4', stem=SO1 + '4. If the 250 mg tablet is insufficient to control the arrhythmia, how many tablets (250 mg strength) will be required to control the arrhythmia?', **M5, sub='peak', skill='apply', concept='tablets-to-range',
    options=[('4 to 6 tablets', True, 'Each tablet adds 1.22 mg/L to the peak. 4/1.22 = 3.28, so 4 tablets reach the minimum; 8/1.22 = 6.56, so 6 tablets stay under the maximum.'),
             ('3 to 6 tablets', False, 'Each tablet adds 1.22 mg/L, so 3 tablets give 3.66 mg/L, still below 4 mcg/mL. The minimum needs one more tablet.'),
             ('4 to 7 tablets', False, 'Each tablet adds 1.22 mg/L, so 7 tablets give 8.54 mg/L, above the 8 mcg/mL upper limit of the therapeutic range.'),
             ('2 tablets', False, 'Each tablet adds 1.22 mg/L to the peak, so 2 tablets give 2.44 mg/L, still below the 4 mcg/mL lower limit.')],
    teach=[{'h': 'Scaling a peak to a range', 'list': ['Cmax is proportional to the dose, so each tablet adds the same peak.', 'Tablets for the minimum: round up. Tablets for the maximum: round down.']}],
    note='Her key writes 3.27 and 6.55 (4/1.22 and 8/1.22 cut off at two decimals); the tablet counts are the same.', cite=f'{O1}, page 2, part 4'))
S5 = SO1 + '5. In a 70 kg patient with renal impairment, the elimination half-life is reported to be 14 hours. Assuming no change in apparent volume of distribution, absorption rate constant, and fraction absorbed systemically, determine the total body, renal, and metabolic clearances following the administration of a 250 tablet to this subject. '
q.append(num('ws5-1-5t', stem=S5 + 'What is the total body clearance?', units='L/hr', ans=6.93, calc=140 * k14, **M5, sub='conc', skill='clearance', concept='clt-from-vd-k',
    steps=[('setup', 'ClT = (140 L)({{frac:0.693|14 hr}}) = 6.93 L/hr', 'The volume is unchanged and the half-life is longer, so k is smaller and the clearance (k × VD) is lower.')], teach=T_CLT_K, cite=f'{O1}, page 2, part 5'))
q.append(num('ws5-1-5r', stem=S5 + 'What is the renal clearance?', units='L/hr', ans=4.5, calc=140 * k14 * 0.65, **M5, sub='conc', skill='clearance', concept='clr-from-fe',
    steps=[('setup', 'ClR = (6.93 L/hr)(0.65) = 4.5 L/hr', 'The renal and metabolic shares are assumed unchanged at 65% and 35%, so ClR is 0.65 of the new, lower total clearance.')], teach=T_SPLIT, cite=f'{O1}, page 2, part 5'))
q.append(num('ws5-1-5m', stem=S5 + 'What is the metabolic clearance?', units='L/hr', ans=2.43, calc=140 * k14 * 0.35, **M5, sub='conc', skill='clearance', concept='clh-from-clt',
    steps=[('setup', 'ClH = (6.93 L/hr)(0.35) = 2.43 L/hr', 'The 35% metabolized share is unchanged by renal impairment in this problem, so ClH stays 0.35 of the new, lower total.')], teach=T_SPLIT, cite=f'{O1}, page 2, part 5'))
S6 = SO1 + '6. Determine tmax and Cmax for this patient with renal impairment (elimination half-life 14 hours) following a 250 mg oral dose. '
q.append(num('ws5-1-6t', stem=S6 + 'What is tmax?', units='hr', ans=1.467, calc=tm14, **M5, sub='peak', skill='oral', concept='tmax-oral',
    steps=[('setup', 'k = {{frac:0.693|14 hr}} = 0.0495 hr⁻¹', 'The 14 hr half-life gives a smaller elimination rate constant, 0.0495 hr⁻¹, in place of the 0.231 hr⁻¹ for a healthy subject.'),
           ('algebra', 'tmax = {{frac:ln(2.8/0.0495)|(2.8 − 0.0495) hr⁻¹}} = 1.467 hr', 'A smaller elimination rate constant moves the peak later, because absorption outpaces elimination for longer.')], teach=T_TMAX, cite=f'{O1}, page 2, part 6'))
q.append(num('ws5-1-6c', stem=S6 + 'What is Cmax?', units='mg/L', ans=1.42, calc=cm(250, tm14, k14), **M5, sub='peak', skill='oral', concept='cmax-oral',
    steps=[('algebra', 'Cmax = {{frac:(0.8554)(250 mg)(2.8 hr⁻¹)|140 L (2.8 − 0.0495) hr⁻¹}} (e^(−(1.5)(0.0495)) − e^(−(1.5)(2.8))) = 1.42 mg/L', 'With the smaller k the peak is higher than the 1.22 mg/L in a healthy subject, because less drug is eliminated while absorption goes on.')],
    teach=T_CMAX, note='Her key computes tmax = 1.467 hr and uses t = 1.5 hr here; Cmax is 1.42 mg/L either way.', cite=f'{O1}, page 2, part 6'))
chain('ws5-p1', src='practice', module=5, name='Single Oral Practice 1: procainamide', setup='VD 140 L, t½ 3 hr then 14 hr, ka 2.8 hr⁻¹, F 0.8554, range 4–8 mcg/mL', parts=q)

# ------------------------------------------------------- Single Oral Practice 2
SO2 = 'A 10-mg single dose of a drug is given orally to a patient. The drug is about 80% absorbed and the equation that fits the observed data is Cp = 70 ng/mL (e^(−0.1t) − e^(−0.3t)). [Rate constants are in hr⁻¹]. Determine the following: '
V2 = 0.8 * 10 * 0.3 / (0.07 * 0.2); tm2 = ln(3) / 0.2
q = []
q.append(num('ws5-2-1', stem=SO2 + '1. Volume of distribution', units='L', ans=171.43, calc=V2, **M5, sub='conc', skill='vddose', concept='vd-from-oral-coef',
    steps=[('unit', '70 ng/mL × {{frac:1000 mL|L}} × {{frac:1 mg|10⁶ ng}} = 0.07 mg/L', 'The coefficient is converted from ng/mL to mg/L so that mg ÷ (mg/L) leaves litres for the volume of distribution.'),
           ('setup', 'VD = {{frac:F ka D0|A(ka − k)}}, ka = 0.3, k = 0.1', 'In the fitted equation the larger exponent belongs to absorption and the smaller to elimination: ka = 0.3, k = 0.1 hr⁻¹.'),
           ('algebra', 'VD = {{frac:(0.8)(10 mg)(0.3 hr⁻¹)|(0.07 mg/L)(0.3 − 0.1) hr⁻¹}} = 171.43 L', 'Milligrams divided by milligrams per litre leaves litres, the unit of a volume of distribution.')], teach=T_COEF, cite=f'{O2}, page 1, part 1'))
q.append(num('ws5-2-2', stem=SO2 + '2. Total body clearance', units='L/hr', ans=17.143, calc=V2 * 0.1, **M5, sub='conc', skill='clearance', concept='clt-from-vd-k',
    steps=[('setup', 'ClT = VD × k = (171.43 L)(0.1 hr⁻¹) = 17.143 L/hr', 'The elimination rate constant is the smaller exponent, 0.1 hr⁻¹; litres times reciprocal hours gives L/hr.')], teach=T_CLT_K, cite=f'{O2}, page 1, part 2'))
q.append(num('ws5-2-3', stem=SO2 + '3. Half-life of elimination', units='hr', ans=6.93, calc=0.693 / 0.1, **M5, sub='conc', skill='krate', concept='thalf-from-k',
    steps=[('setup', 't½ = {{frac:0.693|0.1 hr⁻¹}} = 6.93 hr', 'The first-order half-life is 0.693 divided by the elimination rate constant; reciprocal hours in the denominator give hours.')], teach=T_KHALF, cite=f'{O2}, page 1, part 3'))
q.append(num('ws5-2-4', stem=SO2 + '4. Half-life of absorption', units='hr', ans=2.31, calc=0.693 / 0.3, **M5, sub='extravasc', skill='krate', concept='thalf-abs',
    steps=[('setup', 't½a = {{frac:0.693|0.3 hr⁻¹}} = 2.31 hr', 'The absorption half-life is 0.693 divided by the absorption rate constant, the same first-order relation applied to ka.')], teach=T_KHALF, cite=f'{O2}, page 1, part 4'))
c2 = 70 * (e(-0.1 * tm2) - e(-0.3 * tm2))
q.append(num('ws5-2-5', stem=SO2 + '5. Maximum plasma concentration', units='ng/mL', ans=26.94, calc=c2, **M5, sub='peak', skill='oral', concept='cmax-oral',
    steps=[('setup', 'tmax = {{frac:ln(0.3/0.1)|(0.3 − 0.1) hr⁻¹}} = 5.49 hr', 'The peak occurs at tmax, which depends only on ka and k, so it is found first and then put into the equation.'),
           ('algebra', 'Cmax = 70 ng/mL (e^(−(0.1)(5.49)) − e^(−(0.3)(5.49))) = 26.94 ng/mL', 'Putting tmax into the fitted equation gives the peak concentration, in the equation\'s own unit, ng/mL.')], teach=T_CMAX, cite=f'{O2}, page 1, part 5'))
q.append(num('ws5-2-6', stem=SO2 + '6. Maximum plasma concentration if the dose were increased to 20 mg', units='ng/mL', ans=53.88, calc=2 * c2, **M5, sub='changes', skill='oral', concept='cmax-dose-proportional',
    steps=[('setup', 'Cmax = {{frac:(0.8)(20 mg)(0.3 hr⁻¹)|(171.43 L)(0.3 − 0.1) hr⁻¹}} (e^(−(0.1)(5.49)) − e^(−(0.3)(5.49))) = 0.05388 mg/L', 'tmax depends only on ka and k, so doubling the dose leaves it at 5.49 hr while the coefficient doubles.'),
           ('unit', '0.05388 mg/L × {{frac:1 L|1000 mL}} × {{frac:10⁶ ng|1 mg}} = 53.88 ng/mL', 'The result equals 2 × 26.94 ng/mL: with first-order kinetics the peak is proportional to the dose, and tmax does not move.')],
    teach=T_CMAX, note='Her key prints 0.0588 mg/L on the first line and 0.05388 on the next; 0.05388 is the value.', cite=f'{O2}, page 2, part 6'))
q.append(num('ws5-2-7', stem=SO2 + '7. Half-life of elimination if the clearance were reduced to 8.57 L/hr, assuming no change in apparent volume of distribution', units='hr', ans=13.86, calc=0.693 * V2 / 8.57, **M5, sub='changes', skill='krate', concept='thalf-from-cl-vd',
    steps=[('setup', 't½ = {{frac:0.693(171.43 L)|8.57 L/hr}} = 13.86 hr', 'With the volume unchanged, half the clearance gives twice the half-life: 6.93 hr becomes 13.86 hr.')], teach=T_THALF_CL, cite=f'{O2}, page 2, part 7'))
k7 = 8.57 / V2; tm7 = ln(0.3 / k7) / (0.3 - k7)
q.append(num('ws5-2-8', stem=SO2 + '8. Maximum plasma concentration for a 10 mg dose if the clearance were reduced to 8.57 L/hr, assuming no change in apparent volume of distribution', units='ng/mL', ans=32.61, calc=0.8 * 10 * 0.3 / (V2 * (0.3 - k7)) * (e(-k7 * tm7) - e(-0.3 * tm7)) * 1000, **M5, sub='changes', skill='oral', concept='cmax-oral',
    steps=[('setup', 'k = {{frac:8.57 L/hr|171.43 L}} = 0.05 hr⁻¹', 'Clearance equals k times the volume of distribution, so dividing clearance by the volume gives the rate constant in reciprocal hours.'),
           ('algebra', 'tmax = {{frac:ln(0.3/0.05)|(0.3 − 0.05) hr⁻¹}} = 7.17 hr', 'A smaller elimination rate constant moves the peak later, because absorption outpaces elimination for longer.'),
           ('algebra', 'Cmax = {{frac:(0.8)(10 mg)(0.3 hr⁻¹)|(171.43 L)(0.3 − 0.05) hr⁻¹}} (e^(−(0.05)(7.17)) − e^(−(0.3)(7.17))) = 0.03261 mg/L', 'The coefficient contains (ka − k), so when k changes the whole oral equation is used rather than the old fitted coefficient.'),
           ('unit', '0.03261 mg/L = 32.61 ng/mL', 'The answer is higher than 26.94 ng/mL: with slower elimination, more drug builds up before the peak, so the peak is higher and later.')], teach=T_CMAX, cite=f'{O2}, page 2, part 8'))
chain('ws5-p2', src='practice', module=5, name='Single Oral Practice 2: a fitted equation', setup='10 mg, F 0.8, Cp = 70 ng/mL (e^(−0.1t) − e^(−0.3t)); parts 1–8', parts=q)

# ------------------------------------------------------- Single Oral Practice 3
SO3 = 'A 1000-mg single dose of a drug is given orally to a patient. Eighty percent of the dose is absorbed, the apparent volume of distribution is 24 L, and the half-lives of elimination and absorption are 10 and 0.25 hours, respectively. Determine the following: '
k3, ka3 = 0.0693, 2.772
A3 = 0.8 * ka3 * 1000 / (24 * (ka3 - k3)); tm3 = ln(ka3 / k3) / (ka3 - k3)
cp3 = lambda t: A3 * (e(-k3 * t) - e(-ka3 * t))
q = []
q.append(num('ws5-3-1', stem=SO3 + '1. Total body clearance', units='L/hr', ans=1.6632, calc=24 * 0.693 / 10, **M5, sub='conc', skill='clearance', concept='clt-from-vd-k',
    steps=[('setup', 'ClT = (24 L)({{frac:0.693|10 hr}}) = 1.6632 L/hr', 'Total clearance is the elimination rate constant times the volume of distribution: reciprocal hours times litres gives L/hr.')], teach=T_CLT_K, cite=f'{O3}, page 1, part 1'))
q.append(num('ws5-3-2', stem=SO3 + '2. AUC', units='(mg/L)·hr', ans=481, calc=800 / 1.6632, **M5, sub='conc', skill='clearance', concept='auc-from-cl',
    steps=[('setup', 'AUC = {{frac:FD0|ClT}} = {{frac:(0.8)(1000 mg)|1.6632 L/hr}} = 481 (mg/L)·hr', 'Only the absorbed fraction of an oral dose reaches the plasma, so the AUC uses F × D0, and mg ÷ (L/hr) gives (mg/L)·hr.')], teach=T_AUC, cite=f'{O3}, page 1, part 2'))
q.append(num('ws5-3-3', stem=SO3 + '3. Equation of the model for this drug given orally. What is the coefficient in front of the brackets?', units='mg/L', ans=34.19, calc=A3, **M5, sub='conc', skill='conctime', concept='oral-model-equation',
    steps=[('setup', 'k = 0.693/10 = 0.0693 hr⁻¹; ka = 0.693/0.25 = 2.772 hr⁻¹', 'Each rate constant is 0.693 divided by its own half-life: elimination from the 10 hr half-life, absorption from 0.25 hr.'),
           ('algebra', 'Cp = {{frac:(0.8)(2.772 hr⁻¹)(1000 mg)|(24 L)(2.772 − 0.0693) hr⁻¹}} (e^(−0.0693t) − e^(−2.772t))', 'This is the single-dose oral equation with every value except t filled in; the coefficient comes out in mg/L.'),
           ('round', 'Cp = 34.19 mg/L (e^(−0.0693t) − e^(−2.772t))', 'The coefficient, 34.19 mg/L, is the factor in front of the brackets; with the two exponents it is the whole model.')], teach=T_COEF, cite=f'{O3}, page 1, part 3'))
q.append(num('ws5-3-4', stem=SO3 + '4. Cmax', units='mg/L', ans=30.32, calc=cp3(tm3), **M5, sub='peak', skill='oral', concept='cmax-oral',
    steps=[('setup', 'tmax = {{frac:ln(2.772/0.0693)|(2.772 − 0.0693) hr⁻¹}} = 1.36 hr', 'Absorption here is 40 times faster than elimination, so the curve peaks early, at about an hour and a third after the dose.'),
           ('algebra', 'Cmax = 34.19 mg/L (e^(−(0.0693)(1.36)) − e^(−(2.772)(1.36))) = 30.32 mg/L', 'Putting tmax into the model equation gives the peak concentration in mg/L, the unit of the coefficient.')], teach=T_CMAX, cite=f'{O3}, page 1, part 4'))
q.append(num('ws5-3-5', stem=SO3 + '5. Initial plasma concentration if the dose were administered as an IV bolus dose', units='mg/L', ans=41.67, calc=1000 / 24, **M5, sub='extravasc', skill='vddose', concept='c0-iv-vs-oral',
    steps=[('setup', 'C0 = {{frac:D0|VD}} = {{frac:1000 mg|24 L}} = 41.67 mg/L', 'An IV dose enters the blood whole, so F = 1 and C0 is the dose divided by the volume: mg ÷ L = mg/L.')], teach=T_C0IV, cite=f'{O3}, page 1, part 5'))
q.append(num('ws5-3-6', stem=SO3 + '6. Plasma concentration 10 hours after administration of the oral dose', units='mg/L', ans=17.10, calc=cp3(10), **M5, sub='conc', skill='conctime', concept='oral-cp-at-t',
    steps=[('algebra', 'C10 = 34.19 mg/L (e^(−(0.0693)(10)) − e^(−(2.772)(10))) = 17.10 mg/L', 'By 10 hr the absorption term e^(−27.7) is close to 0, so the concentration is set by the elimination term alone.')], teach=T_CMAX, cite=f'{O3}, page 1, part 6'))
q.append(num('ws5-3-7', stem=SO3 + '7. Plasma concentration 2 hours after administration of the oral dose', units='mg/L', ans=29.63, calc=cp3(2), **M5, sub='conc', skill='conctime', concept='oral-cp-at-t',
    steps=[('algebra', 'C2 = 34.19 mg/L (e^(−(0.0693)(2)) − e^(−(2.772)(2))) = 29.63 mg/L', 'Two hours is just past the 1.36 hr peak, so the concentration is a little below the 30.32 mg/L maximum.')], teach=T_CMAX, cite=f'{O3}, page 1, part 7'))
chain('ws5-p3', src='practice', module=5, name='Single Oral Practice 3', setup='1000 mg, F 0.8, VD 24 L, t½ 10 hr, absorption t½ 0.25 hr; parts 1–7', parts=q)

# ================================================================ Exam 2 sheets
# Module 6 (repeated IV bolus, intermittent infusions, multiple oral doses) and
# Module 7a (bioavailability).
T_SS = [{'h': 'Peak, trough and average after repeated IV bolus doses', 'list': [
    'Cmax∞ = {{frac:D0|VD(1 − e^(−kτ))}}: the first-dose peak {{frac:D0|VD}} times the accumulation factor {{frac:1|1 − e^(−kτ)}}.',
    'Cmin∞ = Cmax∞ e^(−kτ): one interval of first-order decline from the steady-state peak.',
    'Cavg∞ = {{frac:FD0|VD k τ}} = {{frac:FD0|ClT τ}}, with F = 1 for an IV dose.',
    'k = 0.693/t½, or k = {{frac:ClT|VD}}; a volume given as a percentage of body weight is litres per kilogram times the weight.',
    'mg/L and mcg/mL are the same concentration: 1 mg/L = 1 mcg/mL.']}]
T_DOSE_CMAX = [{'h': 'Dose from a target steady-state peak', 'list': [
    'Cmax∞ = {{frac:D0|VD(1 − e^(−kτ))}} rearranged: D0 = Cmax∞ × VD × (1 − e^(−kτ)).',
    'mg/L × L = mg; (1 − e^(−kτ)) has no units, so the dose comes out in milligrams.',
    'A shorter interval leaves a smaller (1 − e^(−kτ)), so a smaller dose holds the same peak.']}]
T_DOSE_CAVG = [{'h': 'Dose from a target average steady-state concentration', 'list': [
    'Cavg∞ = {{frac:FD0|VD k τ}} rearranged: D0 = {{frac:Cavg∞ VD k τ|F}}; with clearance, D0 = {{frac:Cavg∞ ClT τ|F}}.',
    'mg/L × L × hr⁻¹ × hr = mg: the litres and the hours cancel, leaving milligrams.',
    'F = 1 for an IV dose. For an oral dose divide by F, so the oral dose is larger than the IV dose that gives the same average.',
    'Round to a dose that can be given: she asks for the nearest 10 mg.']}]
T_INF_END = [{'h': 'Concentration at the end of one infusion', 'list': [
    'Cp = {{frac:R|ClT}} (1 − e^(−kt)) = {{frac:R|VD k}} (1 − e^(−kt)), with t the length of the infusion.',
    'R is the dose divided by the infusion time, in mg/hr; mg/hr ÷ L/hr = mg/L.',
    '{{frac:R|ClT}} is the plateau a continuous infusion would reach; (1 − e^(−kt)) is the fraction of it reached when the infusion stops.',
    'The end-of-infusion concentration is the starting point of the first-order decline that follows.']}]
T_INF_ADD = [{'h': 'Adding two infusions on a time line', 'list': [
    'Mark the start and end of each infusion, then the time asked for, measured from the end of the second infusion.',
    'Each infusion contributes its end-of-infusion concentration declined for the time since its own end: C = C1 e^(−k t1) + C1 e^(−k t2).',
    'The two declines add because elimination is first order, so each dose is handled on its own.',
    'The error to avoid is using the same time for both infusions; the first infusion has been declining for longer.']}]
T_ORAL1 = [{'h': 'First oral dose: time to peak, peak, trough and AUC', 'list': [
    'k = 0.693/t½ and ka = 0.693/t½ absorption; an absorption half-life in minutes is converted to hours first.',
    'tmax = {{frac:ln(ka/k)|ka − k}}, which depends only on the two rate constants.',
    'Cp = {{frac:F ka D0|VD(ka − k)}} (e^(−kt) − e^(−ka t)); Cmax is this at t = tmax, and Cmin of the first dose is this at t = τ.',
    'AUC of one dose = {{frac:FD0|VD k}} = {{frac:FD0|ClT}}, in (mg/L)hr.']}]
T_ORALSS = [{'h': 'Multiple oral doses at steady state', 'list': [
    'tmax∞ = {{frac:1|ka − k}} ln[{{frac:ka(1 − e^(−kτ))|k(1 − e^(−ka τ))}}]; it is earlier than the first-dose tmax.',
    'Cmax∞ = {{frac:FD0|VD}} × {{frac:1|1 − e^(−kτ)}} × e^(−k tmax∞).',
    'Cmin∞ = {{frac:F ka D0|VD(ka − k)}} × {{frac:1|1 − e^(−kτ)}} × e^(−kτ).',
    'Cavg∞ = {{frac:FD0|VD k τ}} = {{frac:FD0|ClT τ}}; it needs no tmax and no accumulation factor.',
    'The steady-state values are the first-dose values raised by the accumulation factor {{frac:1|1 − e^(−kτ)}}.']}]
T_CAVG_CL = [{'h': 'Average steady-state concentration from clearance', 'list': [
    'Cavg∞ = {{frac:FD0|ClT τ}}: the amount absorbed per interval divided by the volume of plasma cleared per interval.',
    'mg ÷ (L/hr × hr) = mg/L.',
    'Doubling the dose doubles Cavg∞; shortening the interval raises it in the same ratio; clearance does not change with the dose.',
    'Rearranged for a target: D0 = {{frac:Cavg∞ ClT τ|F}}.']}]
T_FABS = [{'h': 'Absolute bioavailability', 'list': [
    'F = {{frac:AUC po|AUC IV}} × {{frac:D IV|D po}}: the oral AUC against the IV AUC, corrected for the two doses.',
    'With the IV curve as an equation Cp = C0 e^(−kt): AUC IV = {{frac:C0|k}} and VD = {{frac:D IV|C0}}.',
    'The same F comes from F D po = ClT × AUC po, so F = {{frac:ClT × AUC po|D po}} with ClT = k VD.',
    'mcg·hr/mL and (mg/L)hr are the same unit, because 1 mcg/mL = 1 mg/L.',
    'Report F as 0.667 or 66.7%, never .667.']}]
T_EQDOSE = [{'h': 'Equivalent oral dose', 'list': [
    'For the same extent of absorption the oral AUC must equal the IV AUC, so F × D po = D IV and D po = {{frac:D IV|F}}.',
    'An oral dose is larger than the IV dose it matches, because only the fraction F reaches the circulation.',
    'Round to a strength that can be given: the nearest 10 mg, or a marketed strength.']}]
T_FREL = [{'h': 'Relative bioavailability', 'list': [
    'F rel = {{frac:AUC test|AUC reference}} × {{frac:D reference|D test}}; the reference is the product named after "compared to".',
    'Equal doses make the dose ratio 1, so F rel is the AUC ratio alone.',
    'F rel can be greater than 1: the test product then delivers more drug than the reference.',
    'Two AUCs say nothing about the rate of absorption, so relative bioavailability alone does not settle bioequivalence.']}]
T_AUC_IV = [{'h': 'AUC after an IV dose from clearance', 'list': [
    'AUC IV = {{frac:D IV|ClT}}, with ClT = k VD and k = 0.693/t½.',
    'mg ÷ (L/hr) = (mg/L)hr.',
    'AUC is proportional to the dose when clearance is constant: half the dose, half the area.']}]

MB2 = 'Multiple-IV-Bolus-Practice-2---Solutions.pdf'
MB3 = 'Multiple-IV-Bolus-Practice-3---Solutions.pdf'
MB4 = 'Multiple-IV-Bolus-Practice-4---Solutions.pdf'
IO1 = 'Multiple-IV-Infusions--26-Multiple-Oral-Administrations-Practice-1---Solutions.pdf'
IO2 = 'Multiple-IV-Infusion--26-Multiple-Oral-Administrations-Practice-2---Solutions.pdf'
IO3 = 'Multiple-IV-Infusion-and-Multiple-Oral-Solution-3.pdf'
BA1 = 'BA-BE-Practice-1---Solutions.pdf'
BA2 = 'BA-BE-Practice-2----Solutions.pdf'
BA3 = 'BA-BE-Practice-3---Solutions.pdf'
M6B = dict(module=6, lecture='L07', topic='multi')
M6I = dict(module=6, lecture='L08', topic='intermit')
M6O = dict(module=6, lecture='L09', topic='multoral')
M7 = dict(module=7, lecture='L10', topic='bioavail')

# ------------------------------------------------- Multiple IV Bolus Practice 2
B2 = 'The elimination half-life of an antibiotic is 3 hours and the apparent volume of distribution is 20% of the body weight. The therapeutic window for this drug is from 2 to 10 mcg/mL. Adverse toxicity is often observed at drug concentrations above 15 mcg/mL. The drug will be given by multiple IV bolus injections.'
kb2 = 0.693 / 3; vb2 = 0.2 * 82; fb2 = 1 - e(-kb2 * 8); db2 = 10 * vb2 * fb2
q = [
 num('ws6-b2a', stem=B2 + ' a. Calculate the dose for an adult male patient (68 years old, 82 kg) with normal renal function to be given every 8 hours. (Hint, I started by assigning 10 mg/L as the maximum concentration at steady state).', units='mg', ans=138.16, calc=db2, **M6B, sub='ssbolus', skill='multidose', concept='dose-from-cmax-ss',
     steps=[('setup', 'k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹; VD = (0.2)(82 kg) = 16.4 L', 'The rate constant is 0.693 over the half-life, and a volume given as 20% of body weight is 0.2 L per kilogram, so 0.2 × 82 kg = 16.4 L.'),
            ('unit', 'Cmax∞ = 10 mcg/mL = 10 mg/L', 'The upper limit of the therapeutic window, 10 mcg/mL, is assigned as the steady-state peak; 1 mcg/mL is 1 mg/L, so it is 10 mg/L.'),
            ('setup', 'Cmax∞ = {{frac:D0|VD(1 − e^(−kτ))}}, so D0 = Cmax∞ VD (1 − e^(−kτ))', 'The steady-state peak equation is rearranged for the dose: multiplying the target peak by the volume and by (1 − e^(−kτ)) undoes the accumulation factor.'),
            ('algebra', 'D0 = (10 mg/L)(16.4 L)(1 − e^(−(0.231)(8))) = (164 mg)(0.8424) = 138.16 mg', 'mg/L times L leaves mg, and (1 − e^(−1.848)) = 0.8424 is the fraction of each dose eliminated during one 8-hour interval; the dose is 138.16 mg.')],
     teach=T_DOSE_CMAX, cite=f'{MB2}, part a'),
 num('ws6-b2b', stem=B2 + ' b. Calculate the maximum steady-state plasma concentration. (The regimen from part a: 138.16 mg every 8 hours to an 82-kg patient.)', units='mg/L', ans=10, calc=db2 / (vb2 * fb2), **M6B, sub='ssbolus', skill='multidose', concept='cmax-ss',
     steps=[('setup', 'Cmax∞ = {{frac:D0|VD(1 − e^(−kτ))}}', 'The steady-state peak is the first-dose peak, D0 over VD, raised by the accumulation factor, 1 over (1 − e^(−kτ)).'),
            ('algebra', 'Cmax∞ = {{frac:138.16 mg|(16.4 L)(1 − e^(−(0.231)(8)))}} = {{frac:138.16 mg|13.816 L}} = 10 mg/L', 'mg over L gives mg/L; the dose was chosen in part a to give this peak, so the equation returns the assigned 10 mg/L, the top of the therapeutic window.')],
     teach=T_SS, cite=f'{MB2}, part b'),
 num('ws6-b2c', stem=B2 + ' c. Calculate the minimum steady-state plasma concentration. (The regimen from part a gives a steady-state peak of 10 mg/L every 8 hours.)', units='mg/L', ans=1.576, calc=10 * e(-kb2 * 8), **M6B, sub='ssbolus', skill='multidose', concept='cmin-ss',
     steps=[('setup', 'Cmin∞ = Cmax∞ e^(−kτ)', 'From the steady-state peak to the steady-state trough is one dosing interval of first-order decline, so the peak is multiplied by e^(−kτ).'),
            ('algebra', 'Cmin∞ = (10 mg/L) e^(−(0.231)(8)) = (10 mg/L)(0.1576) = 1.576 mg/L', 'The exponent (0.231 hr⁻¹)(8 hr) = 1.848 is a pure number, so the trough keeps the unit of the peak; 8 hours is 2.67 half-lives and 15.8% of the peak remains.')],
     teach=T_SS, cite=f'{MB2}, part c'),
 num('ws6-b2d', stem=B2 + ' d. Calculate the average steady-state plasma concentration. (The regimen from part a: 138.16 mg every 8 hours to an 82-kg patient.)', units='mg/L', ans=4.56, calc=db2 / (vb2 * kb2 * 8), **M6B, sub='ssbolus', skill='multidose', concept='cavg-ss',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|VD k τ}}, with F = 1', 'The average over one interval at steady state is the dose absorbed per interval over the volume cleared per interval; an IV dose is wholly available, so F = 1.'),
            ('algebra', 'Cavg∞ = {{frac:138.16 mg|(16.4 L)(0.231 hr⁻¹)(8 hr)}} = {{frac:138.16 mg|30.31 L}} = 4.56 mg/L', 'L × hr⁻¹ × hr leaves litres, so mg over L is mg/L; the average, 4.56 mg/L, lies between the trough, 1.576, and the peak, 10 mg/L, and below their midpoint because the decline is exponential.')],
     teach=T_SS, cite=f'{MB2}, part d'),
 mc('ws6-b2e', stem=B2 + ' e. Does your regimen provide the desired peak and trough concentrations? If not, how would you adjust to achieve the desired concentrations? (The regimen from part a: 138.16 mg every 8 hours, giving a steady-state peak of 10 mg/L and a trough of 1.576 mg/L.)', **M6B, sub='ssbolus', skill='apply', concept='regimen-trough-adjust',
    options=[('No: the trough is below 2 mg/L; shorten the interval from 8 to 6 hours', True, 'The predicted steady-state peak and trough of this regimen are 10 mg/L and 1.6 mg/L. The peak sits at the top of the 2 to 10 mcg/mL window, but the trough falls below it, so for a portion of each interval the antibiotic is at a sub-therapeutic concentration. A regimen is altered by changing the dose or the dosing interval. With a half-life of 3 hours the concentration falls from 10 mg/L to 2 mg/L in about 7 hours, so an interval of 6 hours keeps the trough inside the window: (10 mg/L) e^(−(0.231)(6)) = 2.5 mg/L.'),
             ('Yes: both the peak and the trough stay below the 15 mcg/mL toxic level', False, 'This reads the 15 mcg/mL toxicity threshold as the test of the regimen. Staying below the toxic level is necessary, but the therapeutic window is 2 to 10 mcg/mL, and a trough of 1.6 mg/L is below its lower limit, so the regimen does not provide the desired trough.'),
             ('No: the peak is too high; lower the dose and keep the 8-hour interval', False, 'The peak, 10 mg/L, was assigned as the upper limit of the window, so it is not too high. Lowering the dose scales the peak and the trough down together, which moves the trough further below 2 mg/L; the problem is the trough, not the peak.'),
             ('No: the trough is too low; raise the dose and keep the 8-hour interval', False, 'This reads the low trough as a dose problem instead of an interval problem. With τ fixed at 8 hours the trough is always e^(−(0.231)(8)) = 0.158 of the peak, so a trough of 2 mg/L would need a peak of 12.7 mg/L, above the 10 mcg/mL upper limit. Raising the dose alone trades a low trough for a peak outside the window; the interval has to change.')],
    teach=[{'h': 'Checking a regimen against a therapeutic window', 'list': [
        'Compare the predicted steady-state peak with the upper limit and the predicted trough with the lower limit.',
        'The ratio of trough to peak, e^(−kτ), is fixed by the interval alone; the dose scales both together.',
        'A trough that is too low with a peak at the limit is corrected by shortening the interval, not by raising the dose.',
        'With t½ = 3 hr, 10 mg/L falls to 2 mg/L in {{frac:ln(10/2)|0.231 hr⁻¹}} = 7 hr, so an interval of 6 hours holds the trough above 2 mg/L.']}],
    cite=f'{MB2}, part e'),
 num('ws6-b2f', stem=B2 + ' With the dosing interval decreased from 8 to 6 hours, what dose every 6 hours gives a steady-state peak of 10 mg/L? (82-kg patient, VD 16.4 L.)', units='mg', ans=123, calc=10 * vb2 * (1 - e(-kb2 * 6)), **M6B, sub='ssbolus', skill='multidose', concept='dose-from-cmax-ss',
     steps=[('setup', 'D0 = Cmax∞ VD (1 − e^(−kτ)), with τ = 6 hr', 'The same rearranged peak equation as for the 8-hour regimen; only the interval changes, and a shorter interval leaves a smaller (1 − e^(−kτ)), so a smaller dose holds the same peak.'),
            ('algebra', 'D0 = (10 mg/L)(16.4 L)(1 − e^(−(0.231)(6))) = (164 mg)(0.75) = 123 mg', 'mg/L times L leaves mg; 6 hours is two half-lives, so three quarters of each dose is eliminated during an interval and the dose that holds a 10 mg/L peak is 123 mg.'),
            ('algebra', 'Check: Cmax∞ = {{frac:123 mg|(16.4 L)(1 − e^(−(0.231)(6)))}} = {{frac:123 mg|12.3 L}} = 10 mg/L', 'Putting the dose back into the peak equation returns the assigned 10 mg/L, so the new regimen keeps the peak at the top of the window.')],
     teach=T_DOSE_CMAX, cite=f'{MB2}, part e (the working after the decision)'),
 num('ws6-b2g', stem=B2 + ' On the new proposed regimen, 123 mg every 6 hours with an expected steady-state peak of 10 mg/L, what is the expected steady-state trough?', units='mg/L', ans=2.5, calc=10 * e(-kb2 * 6), **M6B, sub='ssbolus', skill='multidose', concept='cmin-ss',
     steps=[('setup', 'Cmin∞ = Cmax∞ e^(−kτ), with τ = 6 hr', 'From the steady-state peak to the steady-state trough is one 6-hour interval of first-order decline, so the peak is multiplied by e^(−kτ).'),
            ('algebra', 'Cmin∞ = (10 mg/L) e^(−(0.231)(6)) = (10 mg/L)(0.25) = 2.5 mg/L', 'Six hours is two half-lives, so a quarter of the peak remains; 2.5 mg/L is above the 2 mcg/mL lower limit, so the new regimen of 123 mg every 6 hours sits inside the window at both ends.')],
     teach=T_SS, cite=f'{MB2}, part e (the working after the decision)')]
chain('ws6-b2', src='practice', module=6, name='Multiple IV Bolus Practice 2', setup='An antibiotic, t½ 3 hr, VD 20% of body weight, window 2–10 mcg/mL; 82-kg man dosed every 8 hours, then the 6-hour regimen; parts a–e and the adjusted regimen', parts=q)

# ------------------------------------------------- Multiple IV Bolus Practice 3
B3 = 'A 80 kg patient is scheduled to receive a 20 mg/kg IV bolus injection of a medication every 6 hours. The drug has an apparent volume of distribution that is 25% of body weight and a total body clearance is 4.62 L/hr. Determine the following for this medication in this patient:'
kb3 = 4.62 / 20; cb3 = 80 / (1 - e(-kb3 * 6))
q = [
 num('ws6-b3a', stem=B3 + ' a. Elimination half-life.', units='hr', ans=3, calc=0.693 * 20 / 4.62, **M6B, sub='ssbolus', skill='krate', concept='thalf-from-cl-vd',
     steps=[('unit', 'VD = (0.25 L/kg)(80 kg) = 20 L', 'A volume given as 25% of body weight is read as 0.25 L per kilogram, so for an 80 kg patient it is 0.25 × 80 = 20 L; the clearance is already in L/hr, so the two units match.'),
            ('setup', 't½ = {{frac:0.693 VD|ClT}}', 'ClT = k VD and k = 0.693 over t½ combine to t½ = 0.693 VD over ClT, so the half-life comes straight from the volume and the clearance without finding k first.'),
            ('algebra', 't½ = {{frac:(0.693)(20 L)|4.62 L/hr}} = 3 hr', 'Litres cancel between the volume and L/hr, leaving hours; k = {{frac:4.62 L/hr|20 L}} = 0.231 hr⁻¹ is the rate constant the later parts use.')],
     teach=T_THALF_CL, cite=f'{MB3}, part a'),
 num('ws6-b3b', stem=B3 + ' b. Maximum plasma drug concentration of the first dose.', units='mg/L', ans=80, calc=20 / 0.25, **M6B, sub='ssbolus', skill='vddose', concept='first-dose-c0',
     steps=[('setup', 'C0 = {{frac:D0|VD}} = {{frac:20 mg/kg|0.25 L/kg}}', 'The first-dose peak is the dose over the volume of distribution; both are given per kilogram, so the weight cancels and the ratio can be taken directly.'),
            ('algebra', 'C0 = 80 mg/L', 'mg/kg over L/kg leaves mg/L. The same value comes from the whole dose, (20 mg/kg)(80 kg) = 1600 mg, over the 20 L volume.')],
     teach=T_SS, cite=f'{MB3}, part b'),
 num('ws6-b3c', stem=B3 + ' c. Minimum plasma drug concentration of the first dose.', units='mg/L', ans=20, calc=80 * e(-kb3 * 6), **M6B, sub='ssbolus', skill='conctime', concept='first-dose-cmin',
     steps=[('setup', 'Cmin = C0 e^(−kτ), k = {{frac:ClT|VD}} = {{frac:4.62 L/hr|20 L}} = 0.231 hr⁻¹', 'The trough of the first dose is the first-dose peak after one interval of first-order decline; the rate constant comes from clearance over volume, L/hr over L leaving hr⁻¹.'),
            ('algebra', 'Cmin = (80 mg/L) e^(−(0.231)(6)) = (80 mg/L)(0.25) = 20 mg/L', 'The exponent (0.231 hr⁻¹)(6 hr) = 1.386 is a pure number; 6 hours is two half-lives, so one quarter of the peak remains.')],
     teach=T_CT, cite=f'{MB3}, part c'),
 num('ws6-b3d', stem=B3 + ' d. Maximum steady-state plasma drug concentration.', units='mg/L', ans=106.68, calc=cb3, **M6B, sub='ssbolus', skill='multidose', concept='cmax-ss',
     steps=[('setup', 'Cmax∞ = {{frac:C0|1 − e^(−kτ)}}', 'The first-dose peak, 80 mg/L, divided by (1 − e^(−kτ)) adds the drug left over from the earlier doses, so the steady-state peak must come out above 80 mg/L.'),
            ('algebra', 'Cmax∞ = {{frac:80 mg/L|1 − e^(−(0.231)(6))}} = {{frac:80 mg/L|0.7499}} = 106.68 mg/L', 'e^(−1.386) = 0.2501 of each dose remains at the end of an interval, so 0.7499 is eliminated; dividing by it raises the peak by the accumulation factor 1.33.')],
     teach=T_SS, cite=f'{MB3}, part d'),
 num('ws6-b3e', stem=B3 + ' e. Minimum steady-state plasma drug concentration.', units='mg/L', ans=26.68, calc=cb3 * e(-kb3 * 6), **M6B, sub='ssbolus', skill='multidose', concept='cmin-ss',
     steps=[('setup', 'Cmin∞ = Cmax∞ e^(−kτ)', 'The steady-state trough is the steady-state peak after one interval of first-order decline, the same decline as after the first dose but from a higher start.'),
            ('algebra', 'Cmin∞ = (106.68 mg/L) e^(−(0.231)(6)) = (106.68 mg/L)(0.2501) = 26.68 mg/L', 'One quarter of the steady-state peak remains after two half-lives; 26.68 mg/L is above the first-dose trough of 20 mg/L by the same accumulation factor, 1.33.')],
     teach=T_SS, cite=f'{MB3}, part e'),
 num('ws6-b3f', stem=B3 + ' f. Average steady-state plasma drug concentration.', units='mg/L', ans=57.72, calc=80 / (kb3 * 6), **M6B, sub='ssbolus', skill='multidose', concept='cavg-ss',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|VD k τ}} = {{frac:C0|k τ}}, with F = 1', 'D0 over VD is the first-dose peak, 80 mg/L, so the average at steady state is that peak divided by kτ; an IV dose is wholly available, so F = 1.'),
            ('algebra', 'Cavg∞ = {{frac:80 mg/L|(0.231 hr⁻¹)(6 hr)}} = {{frac:80 mg/L|1.386}} = 57.72 mg/L', 'hr⁻¹ times hr is a pure number, 1.386, so the unit stays mg/L; the same value comes from {{frac:1600 mg|(4.62 L/hr)(6 hr)}}. The average lies between the trough, 26.68, and the peak, 106.68 mg/L.')],
     teach=T_SS, cite=f'{MB3}, part f'),
 num('ws6-b3g', stem=B3 + ' g. Average amount of drug in the body during steady state.', units='mg', ans=1154, calc=80 / (kb3 * 6) * 20, **M6B, sub='ssbolus', skill='multidose', concept='davg-ss',
     steps=[('setup', 'Davg∞ = Cavg∞ × VD', 'Amount and concentration are linked by the volume of distribution at every time, including on average at steady state; the average, 57.72 mg/L, is the one from part f.'),
            ('algebra', 'Davg∞ = (57.72 mg/L)(20 L) = 1154 mg', 'mg/L times L: the litres cancel and an amount is left. The same result comes from the amount form, {{frac:D0|kτ}} = {{frac:1600 mg|1.386}} = 1154 mg.')],
     teach=T_SS, cite=f'{MB3}, part g'),
 num('ws6-b3h', stem=B3 + ' h. Plasma level 12 hours after the last dose, assuming steady-state levels are achieved.', units='mg/L', ans=6.67, calc=cb3 * e(-kb3 * 12), **M6B, sub='ndose', skill='multidose', concept='cp-after-last',
     steps=[('setup', 'C = Cmax∞ e^(−kt), with t = 12 hr', 'After the last dose at steady state the level falls from the steady-state peak, 106.68 mg/L, by first-order elimination; the 12 hours is counted from the last dose, and the interval no longer enters.'),
            ('algebra', 'C12∞ = (106.68 mg/L) e^(−(0.231)(12)) = (106.68 mg/L)(0.0625) = 6.67 mg/L', 'The exponent (0.231 hr⁻¹)(12 hr) = 2.772 is a pure number; 12 hours is four half-lives, so one sixteenth of the peak remains, below the steady-state trough of 26.68 mg/L because 12 hours is longer than the 6-hour interval.')],
     teach=T_SS, note='Her key prints the exponent as e^(−0.231(6)) with the result 6.67 mg/L; 6.67 is the 12-hour value, e^(−0.231(12)). With 6 hours the value would be 26.68 mg/L, the steady-state trough.', cite=f'{MB3}, part h')]
chain('ws6-b3', src='practice', module=6, name='Multiple IV Bolus Practice 3', setup='80-kg patient, 20 mg/kg IV bolus every 6 hours, VD 25% of body weight, ClT 4.62 L/hr; parts a–h', parts=q)

# ------------------------------------------------- Multiple IV Bolus Practice 4
B4 = 'A 192 lb patient is to receive IV bolus injections of a medication every 4 hours. The elimination half-life of the medication is approximately 3.3 hours and the apparent volume of distribution is 30% of body weight.'
kb4 = 0.693 / 3.3; vb4 = 0.3 * 192 / 2.2; cb4 = (550 / 26.2) / (1 - e(-kb4 * 4))
q = [
 num('ws6-b4a', stem=B4 + ' a. Recommend a dose to achieve an average steady state concentration of 25 mg/L. (Round to the nearest 10 mg).', units='mg', ans=550, calc=25 * vb4 * kb4 * 4, **M6B, sub='ssbolus', skill='multidose', concept='dose-from-cavg-ss',
     steps=[('unit', '192 lb ÷ 2.2 lb/kg = 87.27 kg; VD = (0.3 L/kg)(87.27 kg) = 26.2 L', 'The weight is given in pounds and the volume as a percentage of body weight, so the weight is converted to kilograms and 0.3 L per kilogram is applied.'),
            ('setup', 'k = {{frac:0.693|3.3 hr}} = 0.21 hr⁻¹', 'The elimination rate constant is 0.693 over the half-life; reciprocal hours are the unit the exponent and the average need.'),
            ('setup', 'Cavg∞ = {{frac:FD0|VD k τ}}, so D0 = Cavg∞ VD k τ (F = 1)', 'The average steady-state equation is rearranged for the dose: multiplying the target average by the volume, the rate constant and the interval undoes the division. An IV dose is wholly available, so F = 1.'),
            ('algebra', 'D0 = (25 mg/L)(26.2 L)(0.21 hr⁻¹)(4 hr) = 550.2 mg', 'mg/L × L × hr⁻¹ × hr: the litres cancel between mg/L and L, the hours cancel between hr⁻¹ and hr, and milligrams are left, the unit of a dose.'),
            ('round', 'D0 = 550 mg', 'The stem asks for the nearest 10 mg, so 550.2 mg is reported as 550 mg; a dose is rounded to an amount that can be measured and given, not left at a tenth of a milligram.')],
     teach=T_DOSE_CAVG, note='With the unrounded volume, 26.18 L, the dose is 549.8 mg; her key uses 26.2 L and gets 550.2 mg. Both round to 550 mg.', cite=f'{MB4}, part a'),
 num('ws6-b4b', stem=B4 + ' b. What is the maximum plasma concentration of the first dose? (The dose is the 550 mg recommended in part a.)', units='mg/L', ans=21, calc=550 / 26.2, **M6B, sub='ssbolus', skill='vddose', concept='first-dose-c0',
     steps=[('setup', 'C0 = {{frac:D0|VD}}', 'The first-dose peak is the dose over the volume of distribution, the concentration the moment the bolus is in.'),
            ('algebra', 'C0 = {{frac:550 mg|26.2 L}} = 21 mg/L', 'mg over L is mg/L, the concentration the moment the whole 550 mg is in the 26.2 L volume; 550 over 26.2 is 20.99, reported as 21 mg/L.')],
     teach=T_SS, cite=f'{MB4}, part b'),
 num('ws6-b4c', stem=B4 + ' c. What is the maximum steady-state plasma concentration? (The dose is the 550 mg recommended in part a.)', units='mg/L', ans=36.95, calc=cb4, **M6B, sub='ssbolus', skill='multidose', concept='cmax-ss',
     steps=[('setup', 'Cmax∞ = {{frac:C0|1 − e^(−kτ)}}', 'The first-dose peak, 21 mg/L, divided by (1 − e^(−kτ)) adds the drug left over from the earlier doses, so the steady-state peak must come out above 21 mg/L.'),
            ('algebra', 'Cmax∞ = {{frac:21 mg/L|1 − e^(−(0.21)(4))}} = {{frac:21 mg/L|0.5683}} = 36.95 mg/L', 'The exponent (0.21 hr⁻¹)(4 hr) = 0.84 is a pure number; 4 hours is only 1.2 half-lives, so 43% of each dose remains and the accumulation factor is 1.76.')],
     teach=T_SS, cite=f'{MB4}, part c'),
 num('ws6-b4d', stem=B4 + ' d. What is the minimum steady-state plasma concentration? (The dose is the 550 mg recommended in part a.)', units='mg/L', ans=15.95, calc=cb4 * e(-kb4 * 4), **M6B, sub='ssbolus', skill='multidose', concept='cmin-ss',
     steps=[('setup', 'Cmin∞ = Cmax∞ e^(−kτ)', 'The steady-state trough is the steady-state peak after one 4-hour interval of first-order decline, the same decline as after the first dose but starting from the higher steady-state peak.'),
            ('algebra', 'Cmin∞ = (36.95 mg/L) e^(−(0.21)(4)) = (36.95 mg/L)(0.4317) = 15.95 mg/L', 'e^(−0.84) = 0.4317 of the peak remains after 4 hours; the trough is also Cmax∞ − C0 = 36.95 − 21 = 15.95 mg/L, since each dose adds C0 to the trough.')],
     teach=T_SS, cite=f'{MB4}, part d'),
 num('ws6-b4e', stem=B4 + ' e. What is the plasma concentration 10 hours after the last dose assuming steady state was attained? (The dose is the 550 mg recommended in part a.)', units='mg/L', ans=4.52, calc=cb4 * e(-kb4 * 10), **M6B, sub='ndose', skill='multidose', concept='cp-after-last',
     steps=[('setup', 'C = Cmax∞ e^(−kt), with t = 10 hr', 'After the last dose at steady state the level falls from the steady-state peak, 36.95 mg/L, by first-order elimination; the 10 hours is counted from the last dose, and the 4-hour interval no longer enters.'),
            ('algebra', 'C10∞ = (36.95 mg/L) e^(−(0.21)(10)) = (36.95 mg/L)(0.1225) = 4.52 mg/L', 'The exponent (0.21 hr⁻¹)(10 hr) = 2.1 is a pure number; 10 hours is three half-lives, so about one eighth of the peak remains, well below the steady-state trough of 15.95 mg/L.')],
     teach=T_SS, cite=f'{MB4}, part e')]
chain('ws6-b4', src='practice', module=6, name='Multiple IV Bolus Practice 4', setup='192-lb patient, IV bolus every 4 hours, t½ 3.3 hr, VD 30% of body weight; dose for Cavg∞ 25 mg/L, then its peaks, trough and the level after the last dose; parts a–e', parts=q)

# ------------------------------- Multiple IV Infusion & Multiple Oral Practice 1
I1 = '1. An 800-mg dose of a medication was administered as an IV infusion over a period of 3 hours to an 80-kg patient. Six hours after the start of the first infusion, a second of 800-mg dose was infused, again over 3 hours. The drug has an apparent volume of distribution that is 25% of body weight and a total body clearance is 4.62 L/hr.'
ki1 = 4.62 / 20; ci1 = (800 / 3) / 4.62 * (1 - e(-ki1 * 3))
q = [
 num('ws6-i1-1a', stem=I1 + ' a. What is the plasma drug concentration at the end of the first infusion?', units='mg/L', ans=28.86, calc=ci1, **M6I, sub='why', skill='infusion', concept='end-of-infusion-conc',
     steps=[('unit', 'R = {{frac:800 mg|3 hr}} = 266.67 mg/hr; VD = (0.25 L/kg)(80 kg) = 20 L; k = {{frac:4.62 L/hr|20 L}} = 0.231 hr⁻¹', 'The infusion rate is the dose over the infusion time; the volume is 25% of body weight; and k is clearance over volume, L/hr over L leaving hr⁻¹.'),
            ('setup', 'Cp = {{frac:R|ClT}} (1 − e^(−kt)), with t = 3 hr', 'During an infusion the concentration rises towards R over ClT; after t hours it has reached the fraction (1 − e^(−kt)) of that plateau. t is the infusion time, not the interval.'),
            ('algebra', 'Cp = {{frac:266.67 mg/hr|4.62 L/hr}} (1 − e^(−(0.231)(3))) = (57.72 mg/L)(0.5) = 28.86 mg/L', 'mg/hr over L/hr leaves mg/L; 3 hours is one half-life (t½ = 0.693 over 0.231 = 3 hr), so the infusion stops at half of the 57.72 mg/L plateau.')],
     teach=T_INF_END, cite=f'{IO1}, problem 1, part a'),
 num('ws6-i1-1b', stem=I1 + ' b. What is the plasma drug concentration 6 hours after the cessation of the second infusion?', units='mg/L', ans=9.02, calc=ci1 * e(-ki1 * 6) + ci1 * e(-ki1 * 12), **M6I, sub='add', skill='multidose', concept='sum-two-infusions',
     steps=[('setup', 'Time line: 0, 3, 6, 9, 15 hr', 'The first infusion runs from 0 to 3 hours; the second starts at 6 and ends at 9 hours; 6 hours after its end is 15 hours. The first infusion has then been declining for 12 hours and the second for 6.'),
            ('setup', 'Cp = (28.86 mg/L) e^(−k(6)) + (28.86 mg/L) e^(−k(12))', 'Each infusion contributes its end-of-infusion concentration, 28.86 mg/L, declined for the time since its own end; the two add because elimination is first order.'),
            ('algebra', 'Cp = (28.86)(0.25) + (28.86)(0.0625) = 7.215 + 1.804 = 9.02 mg/L', '6 hours is two half-lives, leaving one quarter of the second infusion; 12 hours is four half-lives, leaving one sixteenth of the first; the exponents are pure numbers, so the unit stays mg/L.')],
     teach=T_INF_ADD, cite=f'{IO1}, problem 1, part b')]
O1 = '2. An adult male (80 kg) was given 500 mg of an antibiotic orally every 12 hours for 2 weeks. The literature reports that the antibiotic is about 90% bioavailable and has a VD of 0.24 L/kg. The elimination half-life is about 7.3 hours and the absorption half-life is about 75 minutes. Calculate'
ko = 0.693 / 7.3; kao = 0.693 / 1.25; vo1 = 0.24 * 80; Fo1 = 0.9; Do1 = 500; to1 = 12
tmo1 = ln(kao / ko) / (kao - ko); Ao1 = Fo1 * Do1 * kao / (vo1 * (kao - ko))
tso1 = ln(kao * (1 - e(-ko * to1)) / (ko * (1 - e(-kao * to1)))) / (kao - ko)
q += [
 num('ws6-i1-2a', stem=O1 + ' a. Time required to reach the maximum concentration of the first dose.', units='hr', ans=3.84, calc=tmo1, **M6O, sub='ossc', skill='oral', concept='tmax-first-dose',
     steps=[('unit', 'ka = {{frac:0.693|1.25 hr}} = 0.5544 hr⁻¹; k = {{frac:0.693|7.3 hr}} = 0.0949 hr⁻¹', 'The absorption half-life, 75 minutes, is 1.25 hours; each rate constant is 0.693 over its own half-life, in reciprocal hours.'),
            ('setup', 'tmax = {{frac:ln(ka/k)|ka − k}}', 'The time to peak after one oral dose depends only on the two rate constants; the dose, F and the volume do not enter.'),
            ('algebra', 'tmax = {{frac:ln(0.5544/0.0949)|(0.5544 − 0.0949) hr⁻¹}} = {{frac:1.765|0.4595 hr⁻¹}} = 3.84 hr', 'The ratio inside the logarithm, 5.84, is a pure number, and dividing its logarithm, 1.765, by (ka − k) in hr⁻¹ leaves hours: the first-dose peak comes 3.84 hours after the dose.')],
     teach=T_ORAL1, cite=f'{IO1}, problem 2, part a'),
 num('ws6-i1-2b', stem=O1 + ' b. Maximum plasma drug concentration of the first dose.', units='mg/L', ans=16.28, calc=Ao1 * (e(-ko * tmo1) - e(-kao * tmo1)), **M6O, sub='ossc', skill='oral', concept='cmax-first-dose',
     steps=[('setup', 'Cmax = {{frac:F ka D0|VD(ka − k)}} (e^(−k tmax) − e^(−ka tmax)), VD = (0.24 L/kg)(80 kg) = 19.2 L', 'Cmax is the single-dose oral equation evaluated at tmax = 3.84 hr, with k = 0.0949 hr⁻¹ and ka = 0.5544 hr⁻¹; the volume per kilogram is multiplied by the 80 kg weight first.'),
            ('algebra', 'Cmax = {{frac:(0.9)(500 mg)(0.5544 hr⁻¹)|(19.2 L)(0.5544 − 0.0949) hr⁻¹}} (e^(−(0.0949)(3.84)) − e^(−(0.5544)(3.84)))', 'Reciprocal hours cancel between ka in the numerator and (ka − k) in the denominator, and mg over L leaves mg/L; the coefficient in front of the brackets is 28.28 mg/L.'),
            ('algebra', 'Cmax = (28.28 mg/L)(0.6945 − 0.1190) = 16.28 mg/L', 'At the peak the elimination term is 0.6945 and the absorption term 0.1190; their difference times the coefficient is the first-dose peak.')],
     teach=T_ORAL1, cite=f'{IO1}, problem 2, part b'),
 num('ws6-i1-2c', stem=O1 + ' c. Minimum plasma drug concentration of the first dose.', units='mg/L', ans=9.02, calc=Ao1 * (e(-ko * to1) - e(-kao * to1)), **M6O, sub='ossc', skill='oral', concept='cmin-first-dose',
     steps=[('setup', 'Cmin = {{frac:F ka D0|VD(ka − k)}} (e^(−kτ) − e^(−ka τ)), with τ = 12 hr', 'The trough of the first dose is the same oral equation at the end of the dosing interval, just before the second dose.'),
            ('algebra', 'Cmin = (28.28 mg/L)(e^(−(0.0949)(12)) − e^(−(0.5544)(12))) = (28.28 mg/L)(0.3202 − 0.0013) = 9.02 mg/L', 'By 12 hours absorption is essentially complete (e^(−6.65) = 0.0013), so the trough is set by the elimination term, 0.3202, times the coefficient.')],
     teach=T_ORAL1, cite=f'{IO1}, problem 2, part c'),
 num('ws6-i1-2d', stem=O1 + ' d. Area under the curve of the first dose.', units='(mg/L)hr', ans=246.97, calc=Fo1 * Do1 / (vo1 * ko), **M6O, sub='ossc', skill='clearance', concept='auc-first-dose-oral',
     steps=[('setup', 'AUC = {{frac:FD0|VD k}}', 'The area under one dose is the absorbed dose over the clearance, and clearance is VD × k; only the absorbed fraction, 0.9 of 500 mg, reaches the plasma.'),
            ('algebra', 'AUC = {{frac:(0.9)(500 mg)|(19.2 L)(0.0949 hr⁻¹)}} = {{frac:450 mg|1.822 L/hr}} = 246.97 (mg/L)hr', 'mg over L/hr gives (mg/L)hr, the unit of an area under a concentration–time curve; VD × k = 1.822 L/hr is the clearance, and 450 mg absorbed over it is the area of one dose.')],
     teach=T_ORAL1, note='Her key carries k as 0.0949 hr⁻¹; with the unrounded 0.693 over 7.3 the area is 246.89 (mg/L)hr. Either is accepted.', cite=f'{IO1}, problem 2, part d'),
 num('ws6-i1-2e', stem=O1 + ' e. Time required to reach the maximum concentration at steady state.', units='hr', ans=3, calc=tso1, **M6O, sub='ossc', skill='multidose', concept='tmax-ss',
     steps=[('setup', 'tmax∞ = {{frac:1|ka − k}} ln[{{frac:ka(1 − e^(−kτ))|k(1 − e^(−ka τ))}}]', 'At steady state the interval enters the time to peak through the two bracketed terms, which is what makes it differ from the single-dose tmax.'),
            ('algebra', '1 − e^(−(0.0949)(12)) = 0.6798; 1 − e^(−(0.5544)(12)) = 0.9987', 'Over one 12-hour interval 68% of the drug in the body is eliminated, and absorption of a dose is complete (0.9987); these two fractions carry the interval into the time to peak.'),
            ('algebra', 'tmax∞ = {{frac:1|0.4595 hr⁻¹}} ln[{{frac:(0.5544)(0.6798)|(0.0949)(0.9987)}}] = (2.176 hr)(ln 3.976) = 3 hr', 'The ratio inside the logarithm, 3.976, is smaller than the single-dose ratio ka over k, 5.84, so the steady-state peak comes earlier: 3 hours against 3.84.')],
     teach=T_ORALSS, cite=f'{IO1}, problem 2, part e'),
 num('ws6-i1-2f', stem=O1 + ' f. Maximum plasma drug concentration at steady state.', units='mg/L', ans=25.94, calc=Fo1 * Do1 / vo1 / (1 - e(-ko * to1)) * e(-ko * tso1), **M6O, sub='ossc', skill='multidose', concept='cmax-ss-oral',
     steps=[('setup', 'Cmax∞ = {{frac:FD0|VD}} × {{frac:1|1 − e^(−kτ)}} × e^(−k tmax∞), with tmax∞ = 3 hr', 'The steady-state peak is the absorbed dose over the volume, raised by the accumulation factor and declined for the time to the steady-state peak.'),
            ('algebra', 'Cmax∞ = {{frac:(0.9)(500 mg)|19.2 L}} × {{frac:1|1 − e^(−(0.0949)(12))}} × e^(−(0.0949)(3)) = (23.44 mg/L)(1.471)(0.7523) = 25.94 mg/L', 'mg over L is mg/L; the accumulation factor 1.471 and the decline 0.7523 are pure numbers. The peak at steady state is above the first-dose peak of 16.28 mg/L.')],
     teach=T_ORALSS, note='Her key uses k 0.0949 hr⁻¹ and tmax∞ 3 hr; the unrounded values give 25.92 mg/L. Either is accepted.', cite=f'{IO1}, problem 2, part f'),
 num('ws6-i1-2g', stem=O1 + ' g. Minimum plasma drug concentration at steady state.', units='mg/L', ans=13.32, calc=Ao1 / (1 - e(-ko * to1)) * e(-ko * to1), **M6O, sub='ossc', skill='multidose', concept='cmin-ss-oral',
     steps=[('setup', 'Cmin∞ = {{frac:F ka D0|VD(ka − k)}} × {{frac:1|1 − e^(−kτ)}} × e^(−kτ)', 'The steady-state trough is the first-dose coefficient raised by the accumulation factor and declined for one full interval.'),
            ('algebra', 'Cmin∞ = (28.28 mg/L)(1.471) e^(−(0.0949)(12)) = (28.28 mg/L)(1.471)(0.3202) = 13.32 mg/L', 'The coefficient 28.28 mg/L is the one from part b; times the accumulation factor and the 12-hour decline it gives the trough, above the first-dose trough of 9.02 mg/L.')],
     teach=T_ORALSS, note='With the unrounded rate constants the trough is 13.31 mg/L; her key prints 13.32. Either is accepted.', cite=f'{IO1}, problem 2, part g'),
 num('ws6-i1-2h', stem=O1 + ' h. Average plasma drug concentration at steady state.', units='mg/L', ans=20.58, calc=Fo1 * Do1 / (vo1 * ko * to1), **M6O, sub='ossc', skill='multidose', concept='cavg-ss-oral',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|VD k τ}}', 'The average over one interval at steady state is the absorbed dose per interval over the volume of plasma cleared per interval; it needs no tmax and no accumulation factor.'),
            ('algebra', 'Cavg∞ = {{frac:(0.9)(500 mg)|(19.2 L)(0.0949 hr⁻¹)(12 hr)}} = {{frac:450 mg|21.86 L}} = 20.58 mg/L', 'L × hr⁻¹ × hr leaves litres, so mg over L is mg/L; the average lies between the trough, 13.32, and the peak, 25.94 mg/L.')],
     teach=T_ORALSS, note='With the unrounded k the average is 20.57 mg/L; her key prints 20.58. Either is accepted.', cite=f'{IO1}, problem 2, part h'),
 num('ws6-i1-2i', stem=O1 + ' i. Dose required to reach an average steady state conc of 25 mg/L.', units='mg', ans=600, calc=25 * vo1 * ko * to1 / Fo1, **M6O, sub='ossc', skill='multidose', concept='dose-from-cavg-oral',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|VD k τ}}, so D0 = {{frac:Cavg∞ VD k τ|F}}', 'The average equation is rearranged for the dose; dividing by F = 0.9 makes the oral dose larger than the amount that has to be absorbed, because only 90% of a dose reaches the circulation.'),
            ('algebra', 'D0 = {{frac:(25 mg/L)(19.2 L)(0.0949 hr⁻¹)(12 hr)|0.9}} = {{frac:546.6 mg|0.9}} = 607.36 mg', 'mg/L × L × hr⁻¹ × hr leaves mg: 546.6 mg must be absorbed per interval, and 607.36 mg must be given for 546.6 mg to be absorbed.'),
            ('round', 'D0 = 600 mg', 'Her key rounds 607.36 mg to 600 mg, a dose that can be given; 600 mg every 12 hours gives an average close to the 25 mg/L target.')],
     teach=T_DOSE_CAVG, note='Her key gets 607.36 mg with k 0.0949 hr⁻¹ and reports 600 mg; the unrounded k gives 607.56 mg. 600 and 607 are both accepted.', cite=f'{IO1}, problem 2, part i'),
 num('ws6-i1-2j', stem=O1 + ' j. Average plasma drug concentration at steady state if the dose were increased to 750 mg.', units='mg/L', ans=30.87, calc=Fo1 * 750 / (vo1 * ko * to1), **M6O, sub='ossc', skill='multidose', concept='cavg-dose-proportional',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|VD k τ}}, with D0 = 750 mg', 'Only the dose changes; F, the volume, k and the interval are the same as in part h, so the average scales with the dose.'),
            ('algebra', 'Cavg∞ = {{frac:(0.9)(750 mg)|(19.2 L)(0.0949 hr⁻¹)(12 hr)}} = {{frac:675 mg|21.86 L}} = 30.87 mg/L', 'L × hr⁻¹ × hr leaves litres, so mg over L is mg/L; 750 is 1.5 times 500, and the average is 1.5 times the 20.58 mg/L of part h.')],
     teach=T_CAVG_CL, note='With the unrounded k the average is 30.86 mg/L; her key prints 30.87. Either is accepted.', cite=f'{IO1}, problem 2, part j'),
 num('ws6-i1-2k', stem=O1 + ' k. Average plasma drug concentration at steady state if the dosing interval was decreased to 8 hours (dose 500 mg).', units='mg/L', ans=30.87, calc=Fo1 * Do1 / (vo1 * ko * 8), **M6O, sub='ossc', skill='multidose', concept='cavg-interval',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|VD k τ}}, with τ = 8 hr', 'Only the interval changes; the same 450 mg is absorbed every 8 hours instead of every 12, so less plasma is cleared per dose and the average rises.'),
            ('algebra', 'Cavg∞ = {{frac:(0.9)(500 mg)|(19.2 L)(0.0949 hr⁻¹)(8 hr)}} = {{frac:450 mg|14.58 L}} = 30.87 mg/L', 'The average rises in the ratio 12 over 8, from 20.58 to 30.87 mg/L, the same value as giving 750 mg every 12 hours, because the daily absorbed dose is the same, 1350 mg, in both regimens.')],
     teach=T_CAVG_CL, note='With the unrounded k the average is 30.86 mg/L; her key prints 30.87. Either is accepted.', cite=f'{IO1}, problem 2, part k')]
chain('ws6-i1', src='practice', module=6, name='Multiple IV Infusion & Oral Practice 1', setup='Two 3-hour infusions of 800 mg (VD 25%, ClT 4.62 L/hr), then 500 mg orally every 12 hours (F 0.9, VD 0.24 L/kg, t½ 7.3 hr, t½a 75 min), parts a–k', parts=q)

# ------------------------------- Multiple IV Infusion & Multiple Oral Practice 2
I2 = '1. A 300-mg dose of an antibiotic was administered as an IV infusion to a 85 kg male over a period of 90 minutes. Eight hours after the start of the first infusion, a second 300-mg dose was infused, again over a period of 90 minutes. The drug has a half-life of 3.3 hours and apparent volume of distribution of 0.2 L/kg.'
ki2 = 0.693 / 3.3; ci2 = (300 / 1.5) / (17 * ki2) * (1 - e(-ki2 * 1.5))
q = [
 num('ws6-i2-1a', stem=I2 + ' a. What is the plasma drug concentration at the end of the first infusion?', units='mg/L', ans=15.14, calc=ci2, **M6I, sub='why', skill='infusion', concept='end-of-infusion-conc',
     steps=[('unit', '90 min = 1.5 hr; R = {{frac:300 mg|1.5 hr}} = 200 mg/hr; VD = (0.2 L/kg)(85 kg) = 17 L; k = {{frac:0.693|3.3 hr}} = 0.21 hr⁻¹', 'The infusion time is put in hours so that R is in mg/hr and matches k in hr⁻¹; the volume is 0.2 L per kilogram times the weight.'),
            ('setup', 'Cp = {{frac:R|VD k}} (1 − e^(−kt)), with t = 1.5 hr', 'VD × k is the clearance, so R over it is the plateau a continuous infusion would reach; (1 − e^(−kt)) is the fraction of it reached when this infusion stops.'),
            ('algebra', 'Cp = {{frac:200 mg/hr|(17 L)(0.21 hr⁻¹)}} (1 − e^(−(0.21)(1.5))) = (56.02 mg/L)(0.2702) = 15.14 mg/L', 'mg/hr over L/hr leaves mg/L; 1.5 hours is less than half a half-life, so only 27% of the 56.02 mg/L plateau is reached.')],
     teach=T_INF_END, cite=f'{IO2}, problem 1, part a'),
 num('ws6-i2-1b', stem=I2 + ' b. What is the plasma drug concentration 4 hours after the cessation of the second infusion?', units='mg/L', ans=7.75, calc=ci2 * e(-ki2 * 12) + ci2 * e(-ki2 * 4), **M6I, sub='add', skill='multidose', concept='sum-two-infusions',
     steps=[('setup', 'Time line: 0, 1.5, 8, 9.5, 13.5 hr', 'The first infusion runs from 0 to 1.5 hours; the second starts at 8 and ends at 9.5 hours; 4 hours after its end is 13.5 hours. The first infusion has then been declining for 12 hours and the second for 4.'),
            ('setup', 'Cp = (15.14 mg/L) e^(−(0.21)(12)) + (15.14 mg/L) e^(−(0.21)(4))', 'Each infusion contributes its end-of-infusion concentration declined for the time since its own end; the two add because elimination is first order.'),
            ('algebra', 'Cp = (15.14)(0.0805) + (15.14)(0.4317) = 1.22 + 6.54 = 7.75 mg/L', 'Twelve hours is 3.6 half-lives, so 8% of the first infusion is left; four hours is 1.2 half-lives, so 43% of the second is left and it supplies most of the sum.')],
     teach=T_INF_ADD, cite=f'{IO2}, problem 1, part b')]
O2 = '2. An adult male (72 kg) was given 300 mg of an antibiotic orally every 8 hours for 2 weeks. The literature reports that the antibiotic is about 85% bioavailable and has a VD of 3.2 L/kg. The elimination half-life is about 7.3 hours and the absorption half-life is about 75 minutes. Calculate'
vo2 = 3.2 * 72; Fo2 = 0.85; Do2 = 300; to2 = 8
Ao2 = Fo2 * Do2 * kao / (vo2 * (kao - ko))
tso2 = ln(kao * (1 - e(-ko * to2)) / (ko * (1 - e(-kao * to2)))) / (kao - ko)
q += [
 num('ws6-i2-2a', stem=O2 + ' a. Cmax after the first dose.', units='mg/L', ans=0.7687, calc=Ao2 * (e(-ko * tmo1) - e(-kao * tmo1)), **M6O, sub='ossc', skill='oral', concept='cmax-first-dose',
     steps=[('unit', 'ka = {{frac:0.693|1.25 hr}} = 0.5544 hr⁻¹; k = {{frac:0.693|7.3 hr}} = 0.0949 hr⁻¹; VD = (3.2 L/kg)(72 kg) = 230.4 L', 'The absorption half-life of 75 minutes is 1.25 hours; each rate constant is 0.693 over its half-life; the volume per kilogram is multiplied by the weight.'),
            ('algebra', 'tmax = {{frac:ln(0.5544/0.0949)|(0.5544 − 0.0949) hr⁻¹}} = 3.8413 hr', 'The peak has to be located before it can be evaluated; the time to peak depends only on ka and k, so it is the same 3.84 hr for any dose of this drug, whatever the dose or the volume.'),
            ('algebra', 'Cmax = {{frac:(0.85)(300 mg)(0.5544 hr⁻¹)|(230.4 L)(0.5544 − 0.0949) hr⁻¹}} (e^(−(3.84)(0.0949)) − e^(−(3.84)(0.5544))) = (1.3354 mg/L)(0.5755) = 0.7687 mg/L', 'Reciprocal hours cancel between ka and (ka − k), and mg over L leaves mg/L; the coefficient is 1.3354 mg/L, and the large volume, 230.4 L, keeps the first-dose peak below 1 mg/L.')],
     teach=T_ORAL1, cite=f'{IO2}, problem 2, part a'),
 num('ws6-i2-2b', stem=O2 + ' b. Cmin after the first dose.', units='mg/L', ans=0.6092, calc=Ao2 * (e(-ko * to2) - e(-kao * to2)), **M6O, sub='ossc', skill='oral', concept='cmin-first-dose',
     steps=[('setup', 'Cmin = {{frac:F ka D0|VD(ka − k)}} (e^(−kτ) − e^(−ka τ)), with τ = 8 hr', 'The trough of the first dose is the oral equation at the end of the 8-hour interval, just before the second dose.'),
            ('algebra', 'Cmin = (1.3354 mg/L)(e^(−(8)(0.0949)) − e^(−(8)(0.5544))) = (1.3354 mg/L)(0.4680 − 0.0119) = 0.6092 mg/L', 'The coefficient is the one from part a; after 8 hours the absorption term is almost gone and the elimination term, 0.4680, sets the trough.')],
     teach=T_ORAL1, cite=f'{IO2}, problem 2, part b'),
 num('ws6-i2-2c', stem=O2 + ' c. Maximum plasma drug concentration at steady state.', units='mg/L', ans=1.64, calc=Fo2 * Do2 / vo2 / (1 - e(-ko * to2)) * e(-ko * tso2), **M6O, sub='ossc', skill='multidose', concept='cmax-ss-oral',
     steps=[('setup', 'tmax∞ = {{frac:1|ka − k}} ln[{{frac:ka(1 − e^(−kτ))|k(1 − e^(−ka τ))}}]', 'The steady-state peak is evaluated at the steady-state time to peak, which the interval enters through the two bracketed terms.'),
            ('algebra', 'tmax∞ = {{frac:1|0.4595 hr⁻¹}} ln[{{frac:(0.5544)(1 − e^(−(0.0949)(8)))|(0.0949)(1 − e^(−(0.5544)(8)))}}] = (2.176 hr)(ln 3.145) = 2.49 hr', 'The ratio inside the logarithm, 3.145, is smaller than ka over k, 5.84, so the steady-state peak comes earlier than the first-dose peak at 3.84 hr.'),
            ('setup', 'Cmax∞ = {{frac:FD0|VD}} × {{frac:1|1 − e^(−kτ)}} × e^(−k tmax∞)', 'The absorbed dose over the volume, raised by the accumulation factor and declined for the time to the steady-state peak.'),
            ('algebra', 'Cmax∞ = {{frac:(0.85)(300 mg)|230.4 L}} × {{frac:1|1 − e^(−(0.0949)(8))}} × e^(−(0.0949)(2.49)) = (1.107 mg/L)(1.880)(0.7895) = 1.64 mg/L', 'mg over L is mg/L; the accumulation factor 1.880 and the decline 0.7895 are pure numbers. The steady-state peak is above the first-dose peak of 0.7687 mg/L.')],
     teach=T_ORALSS, cite=f'{IO2}, problem 2, part c'),
 num('ws6-i2-2d', stem=O2 + ' d. Minimum plasma drug concentration at steady state.', units='mg/L', ans=1.17, calc=Ao2 / (1 - e(-ko * to2)) * e(-ko * to2), **M6O, sub='ossc', skill='multidose', concept='cmin-ss-oral',
     steps=[('setup', 'Cmin∞ = {{frac:F ka D0|VD(ka − k)}} × {{frac:1|1 − e^(−kτ)}} × e^(−kτ)', 'The steady-state trough is the first-dose coefficient raised by the accumulation factor and declined for one full interval.'),
            ('algebra', 'Cmin∞ = {{frac:(0.85)(300 mg)(0.5544 hr⁻¹)|(230.4 L)(0.5544 − 0.0949) hr⁻¹}} × {{frac:1|1 − e^(−(0.0949)(8))}} × e^(−(0.0949)(8)) = (1.3354 mg/L)(1.880)(0.4680) = 1.17 mg/L', 'The coefficient, 1.3354 mg/L, is the one from part a; times the accumulation factor and the 8-hour decline it gives the trough, above the first-dose trough of 0.6092 mg/L.')],
     teach=T_ORALSS, cite=f'{IO2}, problem 2, part d'),
 num('ws6-i2-2e', stem=O2 + ' e. Average plasma drug concentration at steady state.', units='mg/L', ans=1.46, calc=Fo2 * Do2 / (vo2 * ko * to2), **M6O, sub='ossc', skill='multidose', concept='cavg-ss-oral',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|VD k τ}}', 'The average over one interval at steady state is the absorbed dose per interval over the volume of plasma cleared per interval; it needs no tmax and no accumulation factor.'),
            ('algebra', 'Cavg∞ = {{frac:(0.85)(300 mg)|(230.4 L)(0.0949 hr⁻¹)(8 hr)}} = {{frac:255 mg|174.9 L}} = 1.46 mg/L', 'L × hr⁻¹ × hr leaves litres, so mg over L is mg/L; the average lies between the trough, 1.17, and the peak, 1.64 mg/L.')],
     teach=T_ORALSS, cite=f'{IO2}, problem 2, part e')]
chain('ws6-i2', src='practice', module=6, name='Multiple IV Infusion & Oral Practice 2', setup='Two 90-minute infusions of 300 mg (t½ 3.3 hr, VD 0.2 L/kg), then 300 mg orally every 8 hours (F 0.85, VD 3.2 L/kg, t½ 7.3 hr, t½a 75 min)', parts=q)

# ------------------------------- Multiple IV Infusion & Multiple Oral Practice 3
I3 = '1. A 200-mg dose of an antibiotic was administered as an IV infusion over a period of 2 hours. Eight hours after the start of the first infusion, a second dose of 200 mg was infused, again over 2 hours. The antibiotic has a half-life of 4 hours and a total body clearance of 2.8 L/hr.'
ki3 = 0.693 / 4; ci3 = 100 / 2.8 * (1 - e(-ki3 * 2))
q = [
 num('ws6-i3-1a', stem=I3 + ' a. What is the plasma drug concentration at the end of the first infusion?', units='mg/L', ans=10.46, calc=ci3, **M6I, sub='why', skill='infusion', concept='end-of-infusion-conc',
     steps=[('unit', 'R = {{frac:200 mg|2 hr}} = 100 mg/hr; k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹', 'The infusion rate is the dose over the infusion time, 200 mg in 2 hours, and the rate constant is 0.693 over the 4-hour half-life; both are needed before the end-of-infusion equation can be used.'),
            ('setup', 'Cp = {{frac:R|ClT}} (1 − e^(−kt)), with t = 2 hr', 'Clearance is given directly, so R over ClT is the plateau a continuous infusion would reach, and (1 − e^(−kt)) is the fraction of it reached after 2 hours.'),
            ('algebra', 'Cp = {{frac:100 mg/hr|2.8 L/hr}} (1 − e^(−(2)(0.17325))) = (35.71 mg/L)(0.2929) = 10.46 mg/L', 'mg/hr over L/hr leaves mg/L, because the hours cancel; two hours is half a half-life, so only 29% of the 35.71 mg/L plateau a continuous infusion would reach is attained when this infusion stops.')],
     teach=T_INF_END, cite=f'{IO3}, problem 1, part a'),
 num('ws6-i3-1b', stem=I3 + ' b. What is the plasma drug concentration 4 hours after the cessation of the second infusion?', units='mg/L', ans=6.54, calc=ci3 * e(-ki3 * 12) + ci3 * e(-ki3 * 4), **M6I, sub='add', skill='multidose', concept='sum-two-infusions',
     steps=[('setup', 'Time line: 0, 2, 8, 10, 14 hr', 'The first infusion runs from 0 to 2 hours; the second starts at 8 and ends at 10 hours; 4 hours after its end is 14 hours. The first infusion has then been declining for 12 hours and the second for 4.'),
            ('setup', 'Cp = (10.46 mg/L) e^(−(0.17325)(12)) + (10.46 mg/L) e^(−(0.17325)(4))', 'Each infusion contributes its end-of-infusion concentration declined for the time since its own end; the two add because elimination is first order.'),
            ('algebra', 'Cp = (10.46)(0.125) + (10.46)(0.5) = 1.31 + 5.23 = 6.54 mg/L', 'Twelve hours is three half-lives, leaving one eighth of the first infusion; four hours is one half-life, leaving half of the second.')],
     teach=T_INF_ADD, cite=f'{IO3}, problem 1, part b')]
O3 = '2. A patient is receiving his antihypertensive medication as 500 mg every 8 hours in the form of an oral capsule. The bioavailability of the drug from this capsule is 80% and the total body clearance in this patient is 2.5 L/hr.'
q += [
 num('ws6-i3-2a', stem=O3 + ' a. What is the average steady-state plasma concentration of this drug in this patient?', units='mg/L', ans=20, calc=0.8 * 500 / (2.5 * 8), **M6O, sub='ossc', skill='multidose', concept='cavg-ss-oral-cl',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|ClT τ}}', 'Clearance is given directly, so the average at steady state is the absorbed dose per interval over the volume of plasma cleared per interval; F = 0.8 because only 80% of the capsule is absorbed.'),
            ('algebra', 'Cavg∞ = {{frac:(0.8)(500 mg)|(2.5 L/hr)(8 hr)}} = {{frac:400 mg|20 L}} = 20 mg/L', 'L/hr × hr leaves litres, so mg over L is mg/L: 400 mg absorbed in each interval, spread over the 20 L cleared in it.')],
     teach=T_CAVG_CL, cite=f'{IO3}, problem 2, part a'),
 num('ws6-i3-2b', stem=O3 + ' b. What will be the average steady-state plasma concentration if the patient were taking 1000 mg every 8 hours of the same oral capsule?', units='mg/L', ans=40, calc=0.8 * 1000 / (2.5 * 8), **M6O, sub='ossc', skill='multidose', concept='cavg-dose-proportional',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|ClT τ}}, with D0 = 1000 mg', 'Only the dose changes; F, the clearance and the interval are the same as in part a, so the average scales with the dose, and the same equation is used with 1000 mg in place of 500 mg.'),
            ('algebra', 'Cavg∞ = {{frac:(0.8)(1000 mg)|(2.5 L/hr)(8 hr)}} = {{frac:800 mg|20 L}} = 40 mg/L', 'Twice the dose gives twice the average, 40 mg/L against 20 mg/L, because the dose sits in the numerator and clearance does not change with the dose.')],
     teach=T_CAVG_CL, cite=f'{IO3}, problem 2, part b'),
 mc('ws6-i3-2c', stem=O3 + ' c. What is the ClT of the drug in this patient while taking the 1000 mg orally every 8 hours?', **M6O, sub='oparam', skill='apply', concept='clearance-constant-with-dose',
    options=[('2.5 L/hr, unchanged', True, 'Total body clearance is a property of the patient and the drug, the volume of plasma cleared of drug per hour, and it does not depend on the dose. Doubling the dose doubles the rate of elimination, ClT × Cp, because the concentration doubles, while ClT stays 2.5 L/hr. That constancy is what lets Cavg∞ scale with the dose, from 20 mg/L to 40 mg/L.'),
             ('5 L/hr, twice the clearance', False, 'This reads clearance as a quantity that scales with the dose, which it does not. What doubles is the rate of elimination, ClT × Cp, because the concentration doubles; the clearance itself, the volume cleared per hour, is unchanged at 2.5 L/hr.'),
             ('1.25 L/hr, half the clearance', False, 'This reads a higher concentration as a slower-clearing patient. Clearance is the ratio of the elimination rate to the concentration, and both double together, so the ratio stays 2.5 L/hr; elimination is first order, with no saturation in this problem.'),
             ('2.0 L/hr, the clearance times F', False, 'Multiplying clearance by the bioavailability mixes two different quantities. F says what fraction of the oral dose reaches the circulation; clearance says how fast the circulation is cleared of the drug that got in. F enters Cavg∞ = {{frac:FD0|ClT τ}} in the numerator, and the clearance stays 2.5 L/hr.')],
    teach=[{'h': 'Clearance does not change with the dose', 'list': [
        'ClT is the volume of plasma cleared of drug per unit time; it depends on the patient and the drug, not on the dose.',
        'Rate of elimination = ClT × Cp rises with the dose because Cp rises, not because ClT does.',
        'Cavg∞ = {{frac:FD0|ClT τ}} is therefore proportional to the dose: twice the dose, twice the average.']}],
    cite=f'{IO3}, problem 2, part c'),
 num('ws6-i3-2d', stem=O3 + ' d. What will be the average steady-state plasma concentration if the patient were taking 500 mg every 6 hours of the same oral capsule?', units='mg/L', ans=26.67, calc=0.8 * 500 / (2.5 * 6), **M6O, sub='ossc', skill='multidose', concept='cavg-interval',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|ClT τ}}, with τ = 6 hr', 'Only the interval changes; a shorter interval means the same 400 mg is absorbed over fewer hours, so less plasma is cleared per dose.'),
            ('algebra', 'Cavg∞ = {{frac:(0.8)(500 mg)|(2.5 L/hr)(6 hr)}} = {{frac:400 mg|15 L}} = 26.67 mg/L', 'The average rises in the ratio 8 over 6: 20 mg/L × 8 over 6 = 26.67 mg/L, because τ sits in the denominator; the same 400 mg is now absorbed every 6 hours instead of every 8.')],
     teach=T_CAVG_CL, cite=f'{IO3}, problem 2, part d'),
 num('ws6-i3-2e', stem=O3 + ' e. What oral dose is required to reach an average steady-state plasma concentration of 30 mg/L from this drug product in this patient taken every 8 hours?', units='mg', ans=750, calc=30 * 2.5 * 8 / 0.8, **M6O, sub='ossc', skill='multidose', concept='dose-from-cavg-oral',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|ClT τ}}, so D0 = {{frac:Cavg∞ ClT τ|F}}', 'The average equation is rearranged for the dose; dividing by F = 0.8 makes the oral dose larger than the amount that has to be absorbed, because only 80% of a capsule reaches the circulation.'),
            ('algebra', 'D0 = {{frac:(30 mg/L)(2.5 L/hr)(8 hr)|0.8}} = {{frac:600 mg|0.8}} = 750 mg', 'mg/L × L/hr × hr leaves mg: 600 mg must be absorbed per interval, and 750 mg must be swallowed for 600 mg to be absorbed.')],
     teach=T_CAVG_CL, cite=f'{IO3}, problem 2, part e'),
 num('ws6-i3-2f', stem=O3 + ' f. Because the patient had problems swallowing the oral capsules he was shifted to 500 mg IV every 8 hours. What will be the average steady-state concentration of this drug in this patient?', units='mg/L', ans=25, calc=500 / (2.5 * 8), **M6O, sub='ossc', skill='multidose', concept='cavg-iv-vs-oral',
     steps=[('setup', 'Cavg∞ = {{frac:FD0|ClT τ}}, with F = 1', 'An IV dose enters the circulation whole, so F = 1 and the whole 500 mg counts; the clearance and the interval are the same as for the capsule, so only F changes.'),
            ('algebra', 'Cavg∞ = {{frac:500 mg|(2.5 L/hr)(8 hr)}} = {{frac:500 mg|20 L}} = 25 mg/L', 'L/hr × hr leaves litres, so mg over L is mg/L; the IV regimen gives 25 mg/L against 20 mg/L for the same dose by capsule, because the capsule delivered only 400 mg of each 500 mg.')],
     teach=T_CAVG_CL, cite=f'{IO3}, problem 2, part f')]
chain('ws6-i3', src='practice', module=6, name='Multiple IV Infusion & Oral Practice 3', setup='Two 2-hour infusions of 200 mg (t½ 4 hr, ClT 2.8 L/hr), then an oral capsule 500 mg every 8 hours (F 0.8, ClT 2.5 L/hr): the average at steady state as dose, interval and route change; parts a–f', parts=q)

# ------------------------------------------------------------- BA-BE Practice 1
A1 = 'The equation for concentration of drug in the plasma as a function of time following a 250 mg IV bolus dose was found to be: Cp = 30e^(−0.092t).'
q = [
 num('ws7-1a', stem=A1 + ' a. If the AUC following a 500 mg oral tablet dose was found to be 435 mcg·hr/mL, what is the bioavailability of the drug in the tablet dosage form?', units='(as a decimal fraction)', ans=0.667, calc=435 * 0.092 * (250 / 30) / 500, **M7, sub='fabs', skill='bioavail', concept='fabs-from-clearance',
     steps=[('unit', '435 mcg·hr/mL = 435 (mg/L)hr; VD = {{frac:250 mg|30 mg/L}} = 8.33 L', '1 mcg/mL is 1 mg/L, so the oral area is 435 (mg/L)hr; the volume is the IV dose over the intercept of the IV curve.'),
            ('setup', 'F D po = ClT × AUC po, so F = {{frac:AUC po × k × VD|D po}}', 'Clearance times the area under the oral curve is the amount that reached the circulation, F × D po; with ClT = k VD, F follows from the IV parameters and the oral area.'),
            ('algebra', 'F = {{frac:(435 (mg/L)hr)(0.092 hr⁻¹)(8.33 L)|500 mg}} = {{frac:333.4 mg|500 mg}} = 0.667', '(mg/L)hr × hr⁻¹ × L leaves mg, and mg over mg is a pure fraction: two thirds of the tablet dose reached the circulation.'),
            ('algebra', 'Or F = {{frac:AUC po|AUC IV}} × {{frac:D IV|D po}} = {{frac:435 (mg/L)hr|326 (mg/L)hr}} × {{frac:250 mg|500 mg}} = 0.667', 'The two-AUC form gives the same value, with AUC IV = 30 over 0.092 = 326 (mg/L)hr and the dose ratio correcting for the different doses.')],
     teach=T_FABS, cite=f'{BA1}, part a'),
 num('ws7-1b', stem=A1 + ' b. What oral dose would provide comparable bioavailability to the 250 mg IV bolus dose? (Round to the nearest 5 mg) (The tablet is 0.667 bioavailable.)', units='mg', ans=375, calc=250 / 0.667, **M7, sub='fabs', skill='bioavail', concept='equiv-oral-dose',
     steps=[('setup', 'F × D po = D IV, so D po = {{frac:D IV|F}}', 'Comparable bioavailability means the oral AUC equals the IV AUC, so the fraction absorbed times the oral dose must equal the whole 250 mg IV dose.'),
            ('algebra', 'D po = {{frac:250 mg|0.667}} = 374.8 mg', 'F has no units, so the oral dose is in milligrams; it is larger than 250 mg because only two thirds of the tablet dose reaches the circulation.'),
            ('round', 'D po = 375 mg', 'The stem asks for the nearest 5 mg, so 374.8 mg is reported as 375 mg.')],
     teach=T_EQDOSE, cite=f'{BA1}, part b')]
chain('ws7-1', src='practice', module=7, name='BA-BE Practice 1', setup='250 mg IV bolus, Cp = 30e^(−0.092t); a 500 mg oral tablet with AUC 435 mcg·hr/mL; parts a–b', parts=q)

# ------------------------------------------------------------- BA-BE Practice 2
q = [
 num('ws7-2-1', stem='1. A physician would like an equivalent oral dose of an antibiotic that has been administered to achieve the same extent of absorption as a 500 mg IV bolus dose. The oral drug product has an absolute bioavailability of 67%. What dose would you recommend (Please round to the nearest 10 mg)?', units='mg', ans=750, calc=500 / 0.67, **M7, sub='fabs', skill='bioavail', concept='equiv-oral-dose',
     steps=[('setup', 'F × D po = D IV, so D po = {{frac:D IV|F}}', 'The same extent of absorption means the oral AUC equals the IV AUC, so the fraction absorbed times the oral dose must equal the whole IV dose.'),
            ('algebra', 'D po = {{frac:500 mg|0.67}} = 746.3 mg', 'F has no units, so the oral dose is in milligrams; it is larger than 500 mg because only 67% of what is swallowed reaches the circulation.'),
            ('round', 'D po = 750 mg', 'The stem asks for the nearest 10 mg, so 746.3 mg is reported as 750 mg.')],
     teach=T_EQDOSE, cite=f'{BA2}, problem 1'),
 num('ws7-2-2', stem='2. The relative bioavailability of a capsule formulation was studied in 24 volunteers. Each volunteer received either a single oral tablet containing 500 mg of the drug or a capsule containing 500 mg of the drug. The average AUC of the oral tablet was 200 (mcg/mL) hr and the average AUC of the capsule was 160 (mcg/mL) hr. What is the relative bioavailability of the drug from the tablet compared to the capsule?', units='(as a decimal fraction)', ans=1.25, calc=200 / 160, **M7, sub='frel', skill='bioavail', concept='frel-calc',
     steps=[('setup', 'F rel = {{frac:AUC tablet|AUC capsule}} × {{frac:D capsule|D tablet}}', 'The tablet is compared to the capsule, so the capsule is the reference and its AUC goes in the denominator; the doses are both 500 mg, so the dose ratio is 1.'),
            ('algebra', 'F rel = {{frac:200 (mcg/mL)hr|160 (mcg/mL)hr}} × {{frac:500 mg|500 mg}} = 1.25', 'The areas cancel their units and the doses cancel theirs, leaving a pure ratio; 1.25 means the tablet delivers 25% more drug than the capsule.')],
     teach=T_FREL, cite=f'{BA2}, problem 2')]
chain('ws7-2', src='practice', module=7, name='BA-BE Practice 2', setup='An oral dose equivalent to 500 mg IV at F 0.67, then a 500 mg tablet against a 500 mg capsule (AUC 200 and 160 (mcg/mL) hr)', parts=q)

# ------------------------------------------------------------- BA-BE Practice 3
A3 = '1. After oral administration of a single 1000 mg capsule of an investigational drug (half-life approximately 4.6 hours and apparent volume of distribution approximately 18 L) to a normal volunteer, the calculated AUC was 246 mg h/L.'
cl3 = 18 * 0.693 / 4.6
q = [
 num('ws7-3a', stem=A3 + ' a. What is the bioavailability of this oral capsule in this volunteer?', units='(as a decimal fraction)', ans=0.667, calc=cl3 * 246 / 1000, **M7, sub='fabs', skill='bioavail', concept='fabs-from-clearance',
     steps=[('setup', 'F D po = ClT × AUC po, so F = {{frac:ClT × AUC po|D po}}, with ClT = k VD', 'Clearance times the oral area is the amount that reached the circulation; no IV area is given, so the clearance comes from the half-life and the volume.'),
            ('algebra', 'ClT = (18 L)({{frac:0.693|4.6 hr}}) = (18 L)(0.1507 hr⁻¹) = 2.712 L/hr', 'Litres times reciprocal hours gives L/hr, the clearance that applies to the oral dose as well as to an IV dose.'),
            ('algebra', 'F = {{frac:(2.712 L/hr)(246 mg·hr/L)|1000 mg}} = {{frac:667 mg|1000 mg}} = 0.667', 'L/hr × mg·hr/L leaves mg, the 667 mg that reached the circulation, and mg over mg is a pure fraction: two thirds of the capsule dose.')],
     teach=T_FABS, cite=f'{BA3}, part a'),
 num('ws7-3b', stem=A3 + ' b. What is the expected AUC after administration of a single IV bolus dose of 500 mg to the same volunteer?', units='(mg/L)hr', ans=184.4, calc=500 / cl3, **M7, sub='fabs', skill='bioavail', concept='auc-from-dose-and-cl',
     steps=[('setup', 'D IV = ClT × AUC IV, so AUC IV = {{frac:D IV|ClT}}', 'An IV dose is wholly available, so the whole dose over the clearance is the area; the clearance is the same 2.712 L/hr as for the oral dose.'),
            ('algebra', 'AUC IV = {{frac:500 mg|(18 L)(0.1507 hr⁻¹)}} = {{frac:500 mg|2.712 L/hr}} = 184.4 (mg/L)hr', 'mg over L/hr gives (mg/L)hr; the 500 mg IV dose gives a smaller area than the 1000 mg capsule, 184.4 against 246, because 667 mg of the capsule was absorbed.')],
     teach=T_AUC_IV, cite=f'{BA3}, part b'),
 num('ws7-3c', stem=A3 + ' c. What oral dose would provide equivalent bioavailability to the 500-mg IV bolus dose? (Round to the nearest ten) (The capsule is 0.667 bioavailable.)', units='mg', ans=750, calc=500 / 0.667, **M7, sub='fabs', skill='bioavail', concept='equiv-oral-dose',
     steps=[('setup', 'F × D po = D IV, so D po = {{frac:D IV|F}}', 'Equivalent bioavailability means the oral AUC equals the IV AUC, so the fraction absorbed times the oral dose must equal the whole 500 mg IV dose.'),
            ('algebra', 'D po = {{frac:500 mg|0.667}} = 749.5 mg', 'F has no units, so the oral dose is in milligrams; it is larger than 500 mg because only two thirds of the capsule dose reaches the circulation.'),
            ('round', 'D po = 750 mg', 'The stem asks for the nearest ten, so 749.5 mg is reported as 750 mg.')],
     teach=T_EQDOSE, cite=f'{BA3}, part c')]
chain('ws7-3', src='practice', module=7, name='BA-BE Practice 3', setup='1000 mg oral capsule, AUC 246 mg h/L, t½ 4.6 hr, VD 18 L; then the area of a 500 mg IV dose and the equivalent oral dose; parts a–c', parts=q)

HEADER = '''/* ==========================================================================
   WORKSHEETS: HER DAILY PRACTICE SHEETS
   ==========================================================================
   Clearance & Elimination Practice 1–4, Single Oral Practice 1–3, Multiple
   IV Bolus Practice 2–4, Multiple IV Infusion & Oral Practice 1–3 and BA-BE
   Practice 1–3, each stem as she printed it and each line of working from
   her solution key, every part of every sheet.
   Written by src/gen/ws_practice.py (run it, not this file), which recomputes every answer from the
   stem and fails if the keyed value is outside the tolerance. Where her key's
   last digit comes from an unrounded intermediate, `note` says so and the
   tolerance accepts both.
   ========================================================================== */'''
write(__import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)), '..', 'q9_worksheets.js'), 'Q_WORKSHEETS', HEADER)
