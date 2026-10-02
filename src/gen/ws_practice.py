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

HEADER = '''/* ==========================================================================
   WORKSHEETS: HER DAILY PRACTICE SHEETS
   ==========================================================================
   Clearance & Elimination Practice 1–4 and Single Oral Practice 1–3, each
   stem as she printed it and each line of working from her solution key.
   Written by src/gen/ws_practice.py (run it, not this file), which recomputes every answer from the
   stem and fails if the keyed value is outside the tolerance. Where her key's
   last digit comes from an unrounded intermediate, `note` says so and the
   tolerance accepts both.
   ========================================================================== */'''
write(__import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)), '..', 'q9_worksheets.js'), 'Q_WORKSHEETS', HEADER)
