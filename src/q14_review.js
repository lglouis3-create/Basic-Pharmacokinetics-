/* ==========================================================================
   HER EXAM 2 IN-CLASS REVIEW — Modules 4–7a
   ==========================================================================
   Fourteen items handed out in class before Exam 2 and photographed by the
   student on 7 Oct 2026: four calculations (the third in eight chained parts,
   a–h) and ten concept items. Stems are hers word for word. The sheet prints
   no key; the circles on the photographs are the student's own. Every numeric
   answer below is computed from its stem, with each printed line checked, and
   the concept keys follow her slides. STYLE.md holds the sheet verbatim.

   Two rounding choices follow her own solved sheets: an equivalent oral dose
   is rounded to a strength that exists (BA-BE practice: 571.43 mg offered as
   575 or 600 mg), and a computed interval is taken to a practical one (Multiple
   IV Bolus Practice 2: "a decrease in the dosing interval from 8 to 6 hours").
   Later parts carry 1200 mg and 6 hours; each tolerance also covers the
   unrounded route.
   ========================================================================== */
const E2R_CITE = 'Exam 2 In-Class Review (handed out 7 Oct 2026)';
const E2R_3 = 'An antibiotic is to be administered as 12 mg/kg IV bolus doses every 8 hours to a 75-kg patient. The antibiotic has a total body clearance of approximately 1.86 L/hr and an apparent volume of distribution that is 15% of body weight.';

const Q_REVIEW = [

/* ------------------------------- 1. CrCl -------------------------------- */
{id:'e2r-1', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'crclcalc', concept:'cockcroft-gault', skill:'crcl', source:'slide',
 stem:'Using the patient\'s ideal body weight, estimate the creatinine clearance of a 45-year-old female who weighs 154 lb, serum creatinine of 0.78 mg/dL, and stands 5\'8" tall.',
 units:'mL/min', answer:91.9, tol:0.9,
 steps:[
  {k:'setup', t:'IBW (female) = 45.5 + 2.3 × (inches over 5 ft) = 45.5 + 2.3 × 8 = 45.5 + 18.4 = 63.9 kg',
   why:'IBW, ideal body weight, is what the stem asks to use. 5\'8" is 8 inches over 5 feet, and 45.5 is the female constant (50 for a male). The 154 lb actual weight is never used.'},
  {k:'setup', t:'CrCl = {{frac:(140 − age)(IBW)|72 × SCr}} × 0.85 (female)',
   why:'Cockcroft-Gault, the line she says is not on the sheet and has to be known. Age in years, IBW in kg, SCr (serum creatinine) in mg/dL, and the 0.85 because the patient is female.'},
  {k:'algebra', t:'{{frac:(140 − 45)(63.9)|72 × 0.78}} = {{frac:6070.5|56.16}} = 108.09',
   why:'Top: 95 years × 63.9 kg = 6070.5. Bottom: 72 × 0.78 mg/dL = 56.16. The serum creatinine is used as given, 0.78; her slides state no rule that raises a value below 1.'},
  {k:'algebra', t:'CrCl = 108.09 × 0.85 = 91.88 mL/min',
   why:'The female correction comes last. The result is reported in mL/min, the unit of the 120 to 130 mL/min normal range, although the units of the inputs do not cancel to it.'},
  {k:'round', t:'CrCl = 91.9 mL/min',
   why:'91.88 to one decimal place. It is below the 120 to 130 mL/min she calls normal, so this patient has some loss of renal function.'}],
 setup:{eq:'crcl', pre:['ibw-female'], why:'"Using the patient\'s ideal body weight, estimate the creatinine clearance": Cockcroft-Gault with IBW, female form. Height gives IBW first; the 154 lb is a distractor.'},
 asks:'CrCl',
 givens:[['age', '45-year-old', '140 − 45 = 95 in the numerator'], ['sex', 'female', 'IBW constant 45.5 and the 0.85 factor'], ['weight', '154 lb', 'not needed: the stem asks for ideal body weight'], ['SCr', '0.78 mg/dL', '72 × 0.78 = 56.16 in the denominator'], ['height', '5\'8"', '8 inches over 5 ft, so IBW = 63.9 kg']],
 check:{t:'With SCr below 1, the 72 × SCr denominator is below 72, so the male-form value exceeds IBW × 95 ÷ 72; 0.85 of 108.09 is 91.88.', lo:0},
 teach:[
  {h:'How she sets the CrCl item', list:[
   'She gives actual weight in pounds and height in feet and inches, then says "using the patient\'s ideal body weight": the pounds are there to be ignored.',
   'IBW male = 50 + 2.3 × (inches over 5 ft); IBW female = 45.5 + 2.3 × (inches over 5 ft).',
   'CrCl = {{frac:(140 − age)(IBW)|72 × SCr}}, times 0.85 for a female. Neither IBW nor Cockcroft-Gault is printed on her equation sheet.',
   'Her slide "Creatinine Clearance/GFR": creatinine clearance is the most common measure of renal clearance, calculated by Cockcroft-Gault, with 120 to 130 mL/min considered normal.']}],
 cite:E2R_CITE + ', question 1; 4---Clearance-and-Elimination.pdf, slides "Creatinine Clearance/GFR"'},

/* --------------------------- 2. ClR and mechanism ----------------------- */
{id:'e2r-2', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'clcalc', concept:'renal-clearance-from-urine', skill:'clearance', source:'slide',
 stem:'A drug was administered as a single IV bolus dose of 10 mg/kg to a 75-kg male volunteer. The drug has an elimination half-life of approximately 5 hours and volume of distribution of 2.3 L/kg. Urine samples were collected for 48 hours and upon analysis, 630 mg was recovered. What is the renal clearance in mL/min and probable mechanism of renal elimination?',
 units:'mL/min', answer:334.7, tol:3.4,
 steps:[
  {k:'setup', t:'D0 = 10 mg/kg × 75 kg = 750 mg (the dose); VD = 2.3 L/kg × 75 kg = 172.5 L (the volume)',
   why:'Both are per kilogram, so each is multiplied by the 75-kg weight first. The kilograms cancel and leave mg and L.'},
  {k:'unit', t:'k = {{frac:0.693|5 hr}} = 0.1386 hr⁻¹ (elimination rate constant); ClT = k × VD = 0.1386 × 172.5 = 23.91 L/hr (total body clearance)',
   why:'Clearance is not given, so it is built from the half-life and the volume: Cl = kVD, the line she expects without the sheet. hr⁻¹ × L leaves L/hr.'},
  {k:'algebra', t:'fe = {{frac:Du|D0}} = {{frac:630 mg|750 mg}} = 0.84 (fraction excreted unchanged)',
   why:'Du is the drug recovered unchanged in urine. 48 hours is 9.6 half-lives of 5 hours, so the collection is complete and 630 mg is all that will be excreted unchanged. F = 1 for an IV bolus.'},
  {k:'algebra', t:'ClR = fe × ClT = 0.84 × 23.91 L/hr = 20.08 L/hr',
   why:'Renal clearance is the excreted fraction of the total clearance: 84% of the drug leaves unchanged in urine, so 84% of the plasma cleared each hour is cleared by the kidney.'},
  {k:'unit', t:'20.08 L/hr × {{frac:1000 mL|1 L}} × {{frac:1 hr|60 min}} = 334.7 mL/min',
   why:'The stem asks for mL/min, and the comparison with the 120 mL/min filtration rate needs mL/min: multiply by 1000 for mL, divide by 60 for minutes.'},
  {k:'round', t:'ClR = 334.7 mL/min, above the GFR of about 120 mL/min: filtration with active secretion',
   why:'Filtration alone clears at most about 120 mL/min, so 334.7 mL/min needs a second process carrying drug into the tubule. The second half of her question is this comparison.'}],
 setup:{eq:'clr', pre:['fe', 'thalf-first', 'cl-k-vd'], why:'"Urine samples … 630 mg was recovered" gives fe; "half-life" and "volume of distribution" give ClT = kVD; then ClR = fe × ClT, converted to mL/min.'},
 asks:'ClR',
 givens:[['D0', '10 mg/kg', '× 75 kg = 750 mg, the denominator of fe'], ['weight', '75-kg', 'turns both per-kg values into mg and L'], ['t½', 'approximately 5 hours', 'k = {{frac:0.693|5}} = 0.1386 hr⁻¹'], ['VD', '2.3 L/kg', '× 75 kg = 172.5 L, for ClT = kVD'], ['collection', '48 hours', '9.6 half-lives, so the urine collection is complete'], ['Du', '630 mg', 'numerator of fe = {{frac:630|750}} = 0.84']],
 check:{t:'ClR cannot exceed ClT, 23.91 L/hr; 0.84 of it is 20.08 L/hr, which is 334.7 mL/min.', lo:0},
 teach:[
  {h:'The route she builds', list:[
   'Dose and volume from mg/kg and L/kg; k from t½; ClT = kVD; fe = {{frac:Du|FD0}}; ClR = fe × ClT; then L/hr to mL/min.',
   'Her slides compare renal clearance with the glomerular filtration rate, about 120 mL/min: equal means filtration only, above means filtration with active secretion, below means filtration with tubular reabsorption.',
   'A urine collection long enough to cover about seven or more half-lives counts as complete, so the amount recovered is the total excreted unchanged.']}],
 cite:E2R_CITE + ', question 2; 4---Clearance-and-Elimination.pdf, slides "Renal Excretion", "Active Secretion" and "Tubular Reabsorption"'},

{id:'e2r-2m', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'renalmech', concept:'mechanism-from-clr', skill:'apply', source:'slide',
 stem:'A drug was administered as a single IV bolus dose of 10 mg/kg to a 75-kg male volunteer. The drug has an elimination half-life of approximately 5 hours and volume of distribution of 2.3 L/kg. Urine samples were collected for 48 hours and upon analysis, 630 mg was recovered. What is the probable mechanism of renal elimination?',
 options:[
  {t:'Filtration with active secretion', correct:true,
   why:'The renal clearance works out to 334.7 mL/min, well above the glomerular filtration rate of about 120 mL/min. Filtration cannot clear more plasma than it filters, so a transporter must be carrying extra drug from the blood into the tubule.'},
  {t:'Filtration only',
   why:'Picking this reads any drug found in urine as filtered. Filtration only would give a renal clearance close to 120 mL/min; 334.7 mL/min is almost three times that, so filtration alone cannot account for it.'},
  {t:'Filtration with tubular reabsorption',
   why:'Picking this compares in the wrong direction, often after leaving ClR in L/hr (20.08) instead of converting to mL/min. Reabsorption returns filtered drug to the blood and pulls renal clearance below 120 mL/min; 334.7 mL/min is above it.'}],
 steps:[
  {k:'setup', t:'ClR = fe × ClT = 0.84 × 23.91 L/hr = 20.08 L/hr = 334.7 mL/min',
   why:'fe = {{frac:630|750}} = 0.84 and ClT = kVD = 0.1386 × 172.5 = 23.91 L/hr, as in the calculation for this stem. The mechanism is read in mL/min.'},
  {k:'algebra', t:'334.7 mL/min against GFR ≈ 120 mL/min: greater',
   why:'Above the filtration rate means a second process adds drug to the urine: active secretion. Filtration alone cannot clear more plasma than the glomeruli filter, about 120 mL/min.'}],
 teach:[
  {h:'Reading the mechanism', list:[
   'Renal clearance equal to about 120 mL/min: filtration only. Above it: filtration with active secretion. Below it: filtration with tubular reabsorption.',
   'Convert to mL/min before comparing; 20.08 L/hr read as 20.08 points to the wrong answer.']}],
 cite:E2R_CITE + ', question 2; 4---Clearance-and-Elimination.pdf, slides "Renal Excretion", "Active Secretion" and "Tubular Reabsorption"'},

/* ------------------------ 3. The chained regimen ------------------------ */
{id:'e2r-3a', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L07',
 topic:'multi', sub:'ssbolus', concept:'cmax-ss', skill:'multidose', source:'slide',
 stem:E2R_3 + ' a. What is the expected maximum steady-state concentration of this antibiotic in this patient?',
 units:'mg/L', answer:109.1, tol:1.1,
 steps:[
  {k:'setup', t:'D0 = 12 mg/kg × 75 kg = 900 mg (each dose); VD = 0.15 L/kg × 75 kg = 11.25 L (volume)',
   why:'15% of body weight is read as 0.15 L/kg, 1 L taken as the weight of 1 kg. Both the dose and the volume are per kilogram, so each is multiplied by 75 kg and the kilograms cancel.'},
  {k:'unit', t:'k = {{frac:ClT|VD}} = {{frac:1.86 L/hr|11.25 L}} = 0.16533 hr⁻¹ (elimination rate constant)',
   why:'She gives clearance instead of a half-life here, so k comes from Cl = kVD rearranged. L cancels and leaves hr⁻¹.'},
  {k:'algebra', t:'C0 = {{frac:D0|VD}} = {{frac:900 mg|11.25 L}} = 80 mg/L (what one dose adds)',
   why:'The first-dose peak of an IV bolus: the whole dose is in the body at time zero, spread through VD. It is also what each later dose adds on top of what remains.'},
  {k:'algebra', t:'kτ = 0.16533 × 8 = 1.3226; e^(−1.3226) = 0.2664 (fraction left after one interval)',
   why:'τ = 8 hr, the dosing interval. kτ has no units, because hr⁻¹ × hr cancels, and e^(−kτ) is the fraction of each dose still in the body when the next one is given.'},
  {k:'algebra', t:'Cmax∞ = {{frac:C0|1 − e^(−kτ)}} = {{frac:80|1 − 0.2664}} = {{frac:80|0.7336}} = 109.05 mg/L',
   why:'The accumulation factor {{frac:1|0.7336}} = 1.36 raises the first-dose peak to the steady-state peak, because each new dose lands on drug left from the earlier doses: the trough is 109.05 × 0.2664 = 29.05 mg/L.'},
  {k:'round', t:'Cmax∞ = 109.1 mg/L',
   why:'109.05 to one decimal place; carrying every digit of k gives 109.055, which rounds to 109.1. The exam wants the answer with its units, here mg/L.'}],
 setup:{eq:'cmax-ss', pre:['cl-k-vd', 'cp-db-vd'], why:'"IV bolus doses every 8 hours", "maximum steady-state concentration": the repeated-bolus Cmax∞ line. Clearance and VD give k; dose over VD gives C0.'},
 asks:'Cmaxss',
 givens:[['D0', '12 mg/kg', '× 75 kg = 900 mg'], ['τ', 'every 8 hours', 'kτ in the accumulation factor'], ['weight', '75-kg', 'turns mg/kg and % of body weight into mg and L'], ['ClT', 'approximately 1.86 L/hr', 'k = {{frac:1.86|11.25}} = 0.16533 hr⁻¹'], ['VD', '15% of body weight', '0.15 L/kg × 75 kg = 11.25 L']],
 check:{t:'The steady-state peak must exceed the first-dose peak of 80 mg/L and stay below twice it, because e^(−kτ) = 0.2664 is under 0.5: 109.1 mg/L.', lo:80, hi:160},
 teach:[
  {h:'The pieces of Cmax∞', list:[
   'C0 = {{frac:D0|VD}} is the peak after the first dose; e^(−kτ) is the fraction of a dose left one interval later; {{frac:1|1 − e^(−kτ)}} is the accumulation factor.',
   'When she gives clearance and not a half-life, k = {{frac:ClT|VD}}. Her Quiz 4, question 2, asked the same peak with a half-life instead.']}],
 cite:E2R_CITE + ', question 3a; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"'},

{id:'e2r-3b', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L07',
 topic:'multi', sub:'ssbolus', concept:'dose-for-cavg', skill:'multidose', source:'slide',
 stem:E2R_3 + ' b. What dose would yield an average steady-state concentration of approximately 80 mcg/mL?',
 units:'mg', answer:1190.4, tol:12,
 steps:[
  {k:'setup', t:'Cavg∞ = {{frac:FD0|ClT τ}}, solved for the dose: D0 = {{frac:Cavg∞ × ClT × τ|F}}',
   why:'The average needs only clearance and the interval, not VD or k, because over one interval at steady state the drug given, F × D0, equals the drug cleared, Cavg∞ × ClT × τ. F = 1 for an IV bolus.'},
  {k:'unit', t:'80 mcg/mL = 80 mg/L (target average)',
   why:'1 mcg/mL equals 1 mg/L, because multiplying top and bottom by 1000 turns mcg into mg and mL into L. Her targets arrive in mcg/mL and her clearances in L/hr, so this conversion comes first.'},
  {k:'algebra', t:'D0 = 80 mg/L × 1.86 L/hr × 8 hr = 148.8 mg/hr × 8 hr = 1190.4 mg',
   why:'mg/L × L/hr leaves mg/hr, the drug cleared each hour at the target; × 8 hr leaves mg, the drug to replace each interval. The same interval, every 8 hours, is kept.'},
  {k:'round', t:'D0 = 1190.4 mg every 8 hours (15.9 mg/kg for 75 kg)',
   why:'In mg because the stem asks for a dose; {{frac:1190.4|75}} = 15.87 mg/kg if the answer is wanted per kilogram.'}],
 setup:{eq:'cavg-ss', pre:[], why:'"Average steady-state concentration": Cavg∞ = {{frac:FD0|ClT τ}}, F = 1 for IV, solved for D0.'},
 asks:'D0',
 givens:[['τ', 'every 8 hours', 'τ in Cavg∞ = {{frac:FD0|ClT τ}}'], ['ClT', 'approximately 1.86 L/hr', 'ClT in the denominator'], ['Cavg∞', 'approximately 80 mcg/mL', '80 mg/L, the target'], ['VD', '15% of body weight', 'not needed: the average uses clearance only'], ['D0', '12 mg/kg', 'not needed: this part finds a new dose']],
 check:{t:'Clearance removes 80 mg/L × 1.86 L/hr = 148.8 mg each hour at the target, so each 8-hour dose must replace 1190.4 mg.', lo:0},
 teach:[
  {h:'The average at steady state', list:[
   'Cavg∞ = {{frac:FD0|ClT τ}} = {{frac:FD0|VD k τ}}: the dose that enters per interval divided by what clearance removes per interval.',
   'Her Quiz 4, question 8, asked the same for an oral regimen, where F stays in: {{frac:25 × 3.0 × 8|0.83}} = 722.9 mg.']}],
 cite:E2R_CITE + ', question 3b; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"'},

{id:'e2r-3c', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'fabs-from-clearance', skill:'bioavail', source:'slide',
 stem:E2R_3 + ' c. If the AUC following a 500 mg oral dose of the antibiotic was 202 (mg/L)hr, what is the oral bioavailability of this antibiotic?',
 units:'(as a decimal fraction)', answer:0.75, tol:0.01,
 steps:[
  {k:'setup', t:'AUCIV for the same 500 mg = {{frac:D0|ClT}} = {{frac:500 mg|1.86 L/hr}} = 268.8 (mg/L)hr',
   why:'No IV area is given, so it is built from the clearance: Cl = {{frac:D0|AUC}} rearranged. mg divided by L/hr leaves (mg/L)hr.'},
  {k:'algebra', t:'Fabs = {{frac:AUCpo|AUCIV}} × {{frac:DIV|Dpo}} = {{frac:202|268.8}} × {{frac:500|500}} = 0.7515',
   why:'Equal doses make the dose ratio 1, so F is the ratio of the areas. The same number comes from F = {{frac:ClT × AUCpo|Dpo}} = {{frac:1.86 × 202|500}} = 0.7514.'},
  {k:'round', t:'F = 0.75 (75%)',
   why:'To the nearest hundredth, written 0.75 or 75%, never .75 (her rule: no leading decimals). F cannot exceed 1, and 0.75 means three quarters of the oral dose reached the circulation.'}],
 setup:{eq:'fabs-dpo', pre:['f-abs'], why:'"Oral bioavailability" with an oral AUC and the IV clearance: the IV area is dose over clearance, then F is the area ratio, or directly F = {{frac:Cl × AUCpo|Dpo}}.'},
 asks:'F',
 givens:[['ClT', 'approximately 1.86 L/hr', 'gives AUCIV = {{frac:500|1.86}} = 268.8'], ['Dpo', '500 mg oral dose', 'the dose in F = {{frac:Cl × AUC|D}}'], ['AUCpo', '202 (mg/L)hr', 'the oral area'], ['D0', '12 mg/kg', 'not needed for F'], ['VD', '15% of body weight', 'not needed for F']],
 check:{t:'The oral area, 202, is below the IV area for the same dose, 268.8, so F is below 1: about three quarters.', lo:0, hi:1},
 teach:[
  {h:'Absolute bioavailability without an IV area', list:[
   'Fabs = {{frac:AUCpo|AUCIV}} × {{frac:DIV|Dpo}}. When the IV area is missing, AUCIV = {{frac:D|Cl}} from the clearance she gives.',
   'Her Quiz 4, question 9, used the same route with a half-life and VD: Cl = kVD first, then AUCIV, then F.']}],
 cite:E2R_CITE + ', question 3c; 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability"'},

{id:'e2r-3d', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'equiv-oral-dose', skill:'bioavail', source:'slide',
 stem:E2R_3 + ' d. What oral dose would provide the same extent of absorption as the 12 mg/kg IV dose? (Part c: F = 0.75.)',
 units:'mg', answer:1200, tol:4,
 steps:[
  {k:'setup', t:'Dpo = {{frac:DIV|F}} (same extent means the same amount reaching the blood: F × Dpo = DIV)',
   why:'Extent of absorption is the AUC. The oral dose has to put as much drug into the circulation as the IV dose, and only the fraction F of an oral dose gets there.'},
  {k:'algebra', t:'DIV = 12 mg/kg × 75 kg = 900 mg; Dpo = {{frac:900 mg|0.75}} = 1200 mg',
   why:'DIV is the 12 mg/kg dose for 75 kg. F = 0.75 from part c; with F unrounded, 0.7514, the dose is 1197.7 mg. Either way the oral dose exceeds the IV dose.'},
  {k:'round', t:'Dpo = 1200 mg',
   why:'Her solved sheets round an equivalent oral dose to a strength that exists; 1197.7 mg becomes 1200 mg. The oral dose is always larger than the IV dose because F is below 1.'}],
 setup:{eq:'dpo-equiv', pre:[], why:'"Same extent of absorption as the … IV dose": Dpo = {{frac:DIV|F}}, with F from part c.'},
 asks:'Dpo',
 givens:[['DIV', '12 mg/kg', '× 75 kg = 900 mg, the numerator'], ['weight', '75-kg', 'turns 12 mg/kg into 900 mg'], ['F', 'part c', '0.75, the denominator'], ['τ', 'every 8 hours', 'not needed: extent per dose only']],
 check:{t:'F is below 1, so the oral dose must exceed the 900-mg IV dose: {{frac:900|0.75}} = 1200 mg.', lo:900},
 teach:[
  {h:'Her wording', list:[
   '"An appropriate oral dose to achieve the same extent of absorption as a 400 mg IV bolus dose" was her BA-BE practice item: {{frac:400|0.70}} = 571.43 mg, given as 575 or 600 mg.']}],
 cite:E2R_CITE + ', question 3d; 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability"'},

{id:'e2r-3e', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'peak', concept:'cmax-oral', skill:'oral', source:'slide',
 stem:E2R_3 + ' e. What Cmax would you expect following the administration of the first oral dose in the amount you determined in part d if the absorption half-life is 75 minutes? (Parts c and d: F = 0.75 and an oral dose of 1200 mg.)',
 units:'mg/L', answer:47.8, tol:0.5,
 steps:[
  {k:'unit', t:'ka = {{frac:0.693|1.25 hr}} = 0.5544 hr⁻¹ (absorption rate constant); k = 0.1653 hr⁻¹ (from part a)',
   why:'75 minutes is 1.25 hours; both rate constants must be per hour before they are combined. k = {{frac:1.86|11.25}} = 0.1653 hr⁻¹ comes from the clearance and volume in the stem.'},
  {k:'algebra', t:'tmax = {{frac:ln(ka ÷ k)|ka − k}} = {{frac:ln(3.354)|0.3891}} = {{frac:1.210|0.3891}} = 3.110 hr (time of the peak)',
   why:'ka ÷ k = 0.5544 ÷ 0.1653 = 3.354 and ka − k = 0.3891 hr⁻¹. Cmax is the concentration at tmax, so tmax comes first.'},
  {k:'algebra', t:'{{frac:F ka D0|VD(ka − k)}} = {{frac:0.75 × 0.5544 × 1200|11.25 × 0.3891}} = {{frac:498.96|4.3774}} = 113.99 mg/L',
   why:'F × D0 = 0.75 × 1200 = 900 mg reaches the blood. This front factor is not C0, a time-zero concentration: at t = 0 the bracket is 1 − 1 = 0, so the oral curve starts at zero.'},
  {k:'algebra', t:'e^(−0.1653 × 3.110) − e^(−0.5544 × 3.110) = e^(−0.5141) − e^(−1.7242) = 0.5980 − 0.1783 = 0.4197',
   why:'The bracket is evaluated at tmax = 3.110 hr: e^(−kt) carries elimination and e^(−ka t) carries absorption. Both exponents are pure numbers, because hr⁻¹ × hr cancels.'},
  {k:'algebra', t:'Cmax = 113.99 × 0.4197 = 47.84 mg/L',
   why:'Front factor times bracket: 113.99 mg/L × 0.4197. The bracket has no units, so the answer keeps mg/L from the front factor.'},
  {k:'round', t:'Cmax = 47.8 mg/L',
   why:'With F unrounded, 0.7514 × 1200 = 901.7 mg absorbed, and the peak is 47.93 mg/L; the tolerance accepts both. This is the first dose, so no accumulation factor enters.'}],
 setup:{eq:'oral-cp', pre:['thalf-abs', 'tmax'], why:'"First oral dose", "absorption half-life": the single-dose oral equation evaluated at tmax. ka from the absorption half-life, k from part a, F × D0 = 900 mg from parts c and d.'},
 asks:'Cmax',
 givens:[['t½a', '75 minutes', '1.25 hr, so ka = 0.5544 hr⁻¹'], ['D0', 'part d', '1200 mg; with F = 0.75, 900 mg absorbed'], ['ClT', 'approximately 1.86 L/hr', 'with VD gives k = 0.1653 hr⁻¹'], ['VD', '15% of body weight', '11.25 L in the front factor'], ['τ', 'every 8 hours', 'not needed: first dose only']],
 check:{t:'The bracket at tmax is below 1, so the peak lies below the front factor of 113.99 mg/L: 47.8 mg/L.', lo:0, hi:113.99},
 teach:[
  {h:'Cmax after one oral dose', list:[
   'Find tmax = {{frac:ln(ka ÷ k)|ka − k}} first, then put it into Cp = {{frac:F ka D0|VD(ka − k)}}(e^(−kt) − e^(−ka t)).',
   'An absorption half-life in minutes is converted to hours before ka is calculated.']}],
 cite:E2R_CITE + ', question 3e; 5---Pharmacokinetics-of-Oral-Absorption.pdf; equation sheet page 1'},

{id:'e2r-3f', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'tau-for-cavg', skill:'multidose', source:'slide',
 stem:E2R_3 + ' f. What dosing interval would be appropriate to achieve an average steady-state concentration of 80 mcg/mL using the oral dose determined in part d? (Parts c and d: F = 0.75 and an oral dose of 1200 mg.)',
 units:'hr', answer:6, tol:0.06,
 steps:[
  {k:'setup', t:'Cavg∞ = {{frac:FD0|ClT τ}}, solved for the interval: τ = {{frac:FD0|ClT × Cavg∞}}',
   why:'The same average line as part b, with the dose fixed this time and the interval unknown. Multiplying both sides by τ and dividing by Cavg∞ isolates τ.'},
  {k:'algebra', t:'τ = {{frac:0.75 × 1200 mg|1.86 L/hr × 80 mg/L}} = {{frac:900|148.8}} = 6.05 hr',
   why:'80 mcg/mL = 80 mg/L. The top, 900 mg, is the drug absorbed per dose; the bottom, 148.8 mg/hr, is the drug cleared per hour at the target. mg divided by mg/hr leaves hr.'},
  {k:'round', t:'τ = 6 hours',
   why:'A dosing interval is given as a practical clock interval; her Practice 2 answer moved a regimen "from 8 to 6 hours". 6.05 hr becomes every 6 hours.'}],
 setup:{eq:'cavg-ss', pre:[], why:'"Dosing interval … to achieve an average steady-state concentration": Cavg∞ = {{frac:FD0|ClT τ}} solved for τ, with F and the dose from parts c and d.'},
 asks:'tau',
 givens:[['Cavg∞', '80 mcg/mL', '80 mg/L in the denominator'], ['D0', 'part d', '1200 mg; F × D0 = 900 mg'], ['ClT', 'approximately 1.86 L/hr', 'ClT in the denominator'], ['VD', '15% of body weight', 'not needed: the average uses clearance only']],
 check:{t:'At the target, clearance removes 148.8 mg each hour, so 900 mg absorbed per dose lasts about 6 hours; a positive interval near 6 hours.', lo:0, hi:24},
 teach:[
  {h:'Solving the average for τ', list:[
   'τ = {{frac:FD0|ClT × Cavg∞}}. The dose that reaches the blood each time is F × D0.',
   'Shortening the interval with the same dose raises the steady-state levels (her slide "Altering Dosing Interval").']}],
 cite:E2R_CITE + ', question 3f; 6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"'},

{id:'e2r-3g', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'tmax-ss', skill:'multidose', source:'slide',
 stem:E2R_3 + ' g. What is tmax at steady state if the dose determined in part d were administered per the dosing interval determined in part f? (Parts d and f: 1200 mg every 6 hours. The absorption half-life is 75 minutes.)',
 units:'hr', answer:2.0, tol:0.05,
 steps:[
  {k:'setup', t:'tmax∞ = {{frac:1|ka − k}} ln[{{frac:ka(1 − e^(−kτ))|k(1 − e^(−ka τ))}}]',
   why:'The steady-state time to peak, printed at the bottom of the right-hand column of her sheet. It needs ka, k and τ; no dose, F or VD.'},
  {k:'algebra', t:'kτ = 0.1653 × 6 = 0.9918, e^(−0.9918) = 0.3709; ka τ = 0.5544 × 6 = 3.3264, e^(−3.3264) = 0.0359',
   why:'τ = 6 hr from part f; k = 0.1653 hr⁻¹ from part a and ka = 0.5544 hr⁻¹ from part e. Each exponent is a pure number, because hr⁻¹ × hr cancels.'},
  {k:'algebra', t:'{{frac:0.5544 × 0.6291|0.1653 × 0.9641}} = {{frac:0.34877|0.15937}} = 2.1885; ln 2.1885 = 0.7832',
   why:'1 − 0.3709 = 0.6291 and 1 − 0.0359 = 0.9641. The ratio inside the logarithm has no units, because ka and k are both in hr⁻¹ and cancel top and bottom.'},
  {k:'algebra', t:'tmax∞ = {{frac:0.7832|0.3891}} = 2.013 hr',
   why:'ka − k = 0.5544 − 0.1653 = 0.3891 hr⁻¹, and a pure number divided by hr⁻¹ leaves hours. The steady-state peak comes earlier than the first-dose peak, 3.110 hr.'},
  {k:'round', t:'tmax∞ = 2.0 hr',
   why:'With τ = 6.05 hr unrounded it is 2.02 hr; both round to 2.0 hr. No dose, F or VD entered, which is why the dose and volume in the stem are not needed here.'}],
 setup:{eq:'tmax-ss', pre:['thalf-abs'], why:'"tmax at steady state": the steady-state time-to-peak line with ka, k and the interval from part f.'},
 asks:'tmaxss',
 givens:[['τ', 'part f', '6 hr in both exponents'], ['t½a', '75 minutes', 'ka = 0.5544 hr⁻¹'], ['ClT', 'approximately 1.86 L/hr', 'with VD gives k = 0.1653 hr⁻¹'], ['D0', 'part d', 'not needed: tmax carries no dose']],
 check:{t:'The steady-state peak comes after the dose and before the end of the 6-hour interval, and earlier than a single-dose peak: 2.0 hr.', lo:0, hi:6},
 teach:[
  {h:'tmax at steady state', list:[
   'tmax∞ holds ka, k and τ; the single-dose tmax holds only ka and k, so a new interval means a new tmax∞.',
   'Her Quiz 4, question 6, asked "When does the expected maximum concentration … at steady-state occur?" with F, VD, dose and weight all unused.']}],
 cite:E2R_CITE + ', question 3g; 6a---Multiple-Oral-Doses.pdf, slide "Time to Peak at Steady State"'},

{id:'e2r-3h', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'cmax-ss-oral', skill:'multidose', source:'slide',
 stem:E2R_3 + ' h. What is Cmax if the dose determined in part d were administered per the dosing interval determined in part f? (Parts c, d and f: F = 0.75 and 1200 mg every 6 hours. The absorption half-life is 75 minutes.)',
 units:'mg/L', answer:91.2, tol:0.7,
 steps:[
  {k:'setup', t:'Cmax∞ = {{frac:FD0|VD}} ({{frac:1|1 − e^(−kτ)}}) e^(−k tmax∞)',
   why:'Repeated oral doses at steady state: the amount absorbed per dose over VD, times the accumulation factor, times the decline to the steady-state peak time.'},
  {k:'algebra', t:'{{frac:FD0|VD}} = {{frac:0.75 × 1200|11.25}} = {{frac:900|11.25}} = 80 mg/L',
   why:'F = 0.75 from part c and D0 = 1200 mg from part d, so 900 mg reaches the blood with each dose; divided by VD = 11.25 L it is the concentration one absorbed dose would give.'},
  {k:'algebra', t:'{{frac:1|1 − 0.3709}} = {{frac:1|0.6291}} = 1.5896 (accumulation factor at τ = 6 hr)',
   why:'e^(−kτ) = 0.3709 from part g. With a dose every 6 hours, 37% of each dose is still present when the next arrives, so the peak builds to 1.59 times the single-dose value.'},
  {k:'algebra', t:'e^(−0.1653 × 2.013) = e^(−0.3327) = 0.7170',
   why:'tmax∞ = 2.013 hr from part g. e^(−k tmax∞) is the fraction left after elimination has run from the dose to the time of the peak, so the oral peak sits below 80 × 1.5896.'},
  {k:'algebra', t:'Cmax∞ = 80 × 1.5896 × 0.7170 = 91.18 mg/L',
   why:'Product of the three factors: 80 mg/L × 1.5896 = 127.17 mg/L, then × 0.7170 = 91.18 mg/L. The units come from the first factor; the other two are pure numbers.'},
  {k:'round', t:'Cmax∞ = 91.2 mg/L',
   why:'With τ = 6.05 hr unrounded the peak is 90.6 mg/L; her key may use either interval, and the tolerance here accepts both. Report it with units, mg/L.'}],
 setup:{eq:'cmax-ss-oral', pre:['tmax-ss'], why:'"Cmax if the dose … were administered per the dosing interval": the steady-state oral peak, after tmax∞ from part g.'},
 asks:'Cmaxss',
 givens:[['D0', 'part d', '1200 mg, F × D0 = 900 mg'], ['τ', 'part f', '6 hr in the accumulation factor'], ['VD', '15% of body weight', '11.25 L'], ['t½a', '75 minutes', 'enters through tmax∞ from part g']],
 check:{t:'A steady-state peak lies above the 80 mg/L average the regimen was designed for: 91.2 mg/L.', lo:80},
 teach:[
  {h:'Cmax at steady state, oral', list:[
   'Cmax∞ = {{frac:FD0|VD}} {{frac:1|1 − e^(−kτ)}} e^(−k tmax∞): find tmax∞ first.',
   'The peak sits above the average, 80 mg/L, which is what the regimen was built to give.']}],
 cite:E2R_CITE + ', question 3h; 6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"'},

/* ------------------------- 4. Two infusions ---------------------------- */
{id:'e2r-4', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'sum-two-infusions', skill:'multidose', source:'slide',
 stem:'Four hundred milligrams of an antibiotic was infused intravenously over a period of 2 hours. Eight hours after the start of the first infusion, a second 400-mg dose was infused again over a period of 2 hours. The half-life of the antibiotic is approximately 3.75 hours and the apparent volume of distribution is approximately 22 L. What is the plasma drug concentration 4 hours after the cessation of the second infusion?',
 units:'mg/L', answer:8.9, tol:0.2,
 steps:[
  {k:'setup', t:'Infusion 1 runs 0 to 2 hr; infusion 2 runs 8 to 10 hr; the level is asked at 10 + 4 = 14 hr',
   why:'Draw the timeline first. At 14 hr, infusion 1 has been declining for 14 − 2 = 12 hr and infusion 2 for 14 − 10 = 4 hr.'},
  {k:'unit', t:'k = {{frac:0.693|3.75 hr}} = 0.1848 hr⁻¹; ClT = k × VD = 0.1848 × 22 L = 4.066 L/hr; R = {{frac:400 mg|2 hr}} = 200 mg/hr',
   why:'R is the infusion rate, the dose divided by the hours it runs: 400 mg over 2 hr. k comes from the half-life and ClT from k × VD, because the stem gives neither directly.'},
  {k:'algebra', t:'Cend = {{frac:R|Cl}}(1 − e^(−kt)) = {{frac:200|4.066}}(1 − e^(−0.1848 × 2)) = 49.19 × (1 − 0.6910) = 49.19 × 0.3090 = 15.20 mg/L',
   why:'The level at the end of one 2-hour infusion. Both infusions are the same dose, rate and length, so each reaches 15.20 mg/L when it stops.'},
  {k:'algebra', t:'Infusion 1: 15.20 × e^(−0.1848 × 12) = 15.20 × 0.1089 = 1.655 mg/L',
   why:'After an infusion stops, only first-order elimination: C = Cend e^(−kt), t counted from the end of that infusion.'},
  {k:'algebra', t:'Infusion 2: 15.20 × e^(−0.1848 × 4) = 15.20 × 0.4775 = 7.258 mg/L',
   why:'4 hours after the second infusion stopped, at 14 hr. Four hours is just over one half-life of 3.75 hours, so a little under half of the 15.20 mg/L is left.'},
  {k:'algebra', t:'Cp = 1.655 + 7.258 = 8.913 mg/L',
   why:'Superposition: concentrations from separate infusions add, because elimination is first order and each dose is removed at the same fractional rate whatever else is present.'},
  {k:'round', t:'Cp = 8.9 mg/L',
   why:'Her Quiz 4, question 4, was this stem with t½ 4 hours and VD 20 L, key 10.6 mg/L. Report the answer with units, mg/L, to the decimal places the item asks.'}],
 setup:{eq:'cp-after-stop', pre:['thalf-first', 'cl-k-vd', 'r-dose-time', 'cp-infusing'], why:'Two separate short infusions: the end-of-infusion level of each, its decline since it stopped, then the sum.'},
 asks:'Cp',
 givens:[['D0', 'Four hundred milligrams', 'R = {{frac:400|2}} = 200 mg/hr'], ['tinf', '2 hours', 'infusion time in 1 − e^(−kt)'], ['second dose', 'Eight hours after the start', 'infusion 2 runs 8 to 10 hr'], ['t½', 'approximately 3.75 hours', 'k = 0.1848 hr⁻¹'], ['VD', 'approximately 22 L', 'ClT = kVD = 4.066 L/hr'], ['t', '4 hours after the cessation', 'the level at 14 hr']],
 check:{t:'Infusion 2 alone leaves under its 15.20 mg/L end level after 4 hours, about half of it since 4 hours is near one half-life; infusion 1 adds a little: 8.9 mg/L.', lo:7.258, hi:15.20},
 teach:[
  {h:'Two infusions, added', list:[
   'Timeline first: when each infusion starts and stops, and how long each has been declining at the time asked.',
   'Each infusion: Cend = {{frac:R|Cl}}(1 − e^(−k tinf)), then C = Cend e^(−kt) after it stops.',
   'Concentrations from separate doses add, because elimination is first order (her slide "Superposition"; Quiz 4, question 7: "concentrations of drug in the body following multiple infusions are additive").']}],
 cite:E2R_CITE + ', question 4; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, Example 4'},

/* --------------------------- 5–14. Concepts ---------------------------- */
{id:'e2r-5', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'crclcalc', concept:'crcl-estimates-renal-function', skill:'recall', source:'slide',
 stem:'What is creatinine clearance used to estimate?',
 options:[
  {t:'apparent volume of distribution',
   why:'Picking this confuses a clearance with a volume. VD is litres and describes how widely a drug spreads; creatinine clearance is mL/min and describes how much plasma the kidneys clear of creatinine each minute.'},
  {t:'metabolic function',
   why:'Picking this takes creatinine, a product of muscle metabolism, for a test of metabolism. Its clearance measures how well the kidneys remove it, and hepatic metabolism is not part of that number.'},
  {t:'renal function', correct:true,
   why:'Creatinine is filtered by the glomerulus, so its clearance estimates the glomerular filtration rate, the usual measure of how well the kidneys work. Her slide gives 120 to 130 mL/min as normal.'},
  {t:'tubular reabsorption',
   why:'Picking this names one renal process instead of the overall function. Creatinine is filtered and also partly secreted, and its clearance estimates filtration, not the reabsorption of a particular drug.'}],
 teach:[
  {h:'Creatinine clearance', list:[
   'Her slide "Creatinine Clearance/GFR": creatinine clearance is commonly used as an estimate of GFR, the glomerular filtration rate, and is calculated by the Cockcroft-Gault equation, with 120 to 130 mL/min considered normal.',
   'Creatinine clearance describes the patient\'s kidneys; a drug\'s renal clearance describes the drug.']}],
 cite:E2R_CITE + ', question 5; 4---Clearance-and-Elimination.pdf, slides "Creatinine Clearance/GFR"'},

{id:'e2r-6', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06', multi:true,
 topic:'oral', sub:'peak', concept:'oral-dose-doubling', skill:'apply', source:'slide',
 stem:'Which of the following would you expect with a 2-fold increase in oral dose? (Select all that apply)',
 options:[
  {t:'Decreased AUC',
   why:'Picking this reverses the direction. With first-order kinetics AUC = {{frac:F D0|Cl}}, so doubling D0 doubles the area.'},
  {t:'Increased AUC', correct:true,
   why:'AUC = {{frac:F D0|Cl}}: the dose is in the numerator and nothing else changes, so the area doubles. Her slide "Changing Dose" shows AUC rising in proportion to the dose.'},
  {t:'Decreased Cmax',
   why:'Picking this reverses the direction. The dose multiplies the whole oral curve, Cp = {{frac:F ka D0|VD(ka − k)}}(e^(−kt) − e^(−ka t)), so the peak rises.'},
  {t:'Increased Cmax', correct:true,
   why:'D0 multiplies the whole curve, Cp = {{frac:F ka D0|VD(ka − k)}}(e^(−kt) − e^(−ka t)), so the peak doubles along with every other point while its time stays the same.'},
  {t:'Decreased tmax',
   why:'Picking this lets the dose move the time of the peak. tmax = {{frac:ln(ka ÷ k)|ka − k}} holds only the two rate constants, so a larger dose leaves it where it was.'},
  {t:'Increased tmax',
   why:'Picking this reads a bigger dose as taking longer to reach its peak. tmax holds only ka and k; the dose scales the curve up without shifting it in time.'}],
 teach:[
  {h:'Changing the oral dose', list:[
   'Cmax and AUC rise in proportion to the dose; tmax does not change, because tmax = {{frac:ln(ka ÷ k)|ka − k}} has no dose in it (her slide "Changing Dose").',
   'Her Quiz 3, question 3, asked the same point as "the time needed to reach the maximum concentration depends on the rate constants for absorption and elimination".']}],
 cite:E2R_CITE + ', question 6; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Changing Dose"'},

{id:'e2r-7', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'renalmech', concept:'mechanism-from-clr', skill:'apply', source:'slide', dupOf:'ws4-4-1a',
 stem:'A new antibiotic is excreted by the kidney and has a renal clearance that is approximately 300 mL/min. What is the probable mechanism of renal excretion of this drug?',
 options:[
  {t:'Filtration only',
   why:'Picking this reads any renally excreted drug as filtered. Filtration only gives a renal clearance near the glomerular filtration rate, about 120 mL/min; 300 mL/min is 2.5 times that.'},
  {t:'Filtration with active secretion', correct:true,
   why:'300 mL/min is above the glomerular filtration rate of about 120 mL/min. Filtration cannot clear more plasma than it filters, so a transporter must be carrying extra drug from the blood into the tubule.'},
  {t:'Filtration with tubular reabsorption',
   why:'Picking this reads the comparison backwards. Reabsorption returns filtered drug to the blood and lowers renal clearance below 120 mL/min; 300 mL/min is above it.'}],
 steps:[
  {k:'setup', t:'ClR ≈ 300 mL/min; GFR ≈ 120 mL/min',
   why:'Renal clearance is compared with the glomerular filtration rate, the most plasma filtration alone can clear each minute.'},
  {k:'algebra', t:'{{frac:300 mL/min|120 mL/min}} = 2.5, so ClR is greater than GFR: filtration with active secretion',
   why:'Greater than GFR needs a second process adding drug to the urine, because filtration alone clears at most the volume the glomeruli filter each minute, about 120 mL/min.'}],
 teach:[
  {h:'The three cases', list:[
   'ClR about equal to 120 mL/min: filtration only. Greater: filtration with active secretion. Less: filtration with tubular reabsorption.',
   'Her Clearance Practice 4 opens with this drug: "A new antibiotic is excreted by the kidney … The clearance of this drug is 300 mL/min."']}],
 cite:E2R_CITE + ', question 7; 4---Clearance-and-Elimination.pdf, slides "Renal Excretion" and "Active Secretion"'},

{id:'e2r-8', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'bioavail-rate-extent', skill:'recall', source:'slide',
 stem:'Which term describes the rate and extent to which the active ingredient or active moiety is absorbed from a drug product and becomes available at the site of action?',
 options:[
  {t:'bioavailability', correct:true,
   why:'This is her slide definition of bioavailability word for word: rate and extent of absorption from a drug product to the site of action.'},
  {t:'bioequivalence',
   why:'Picking this takes the comparison for the property. Bioequivalence is the absence of a significant difference in that rate and extent between two products; it needs two products, and this definition describes one.'},
  {t:'pharmacodynamics',
   why:'Picking this moves from what the body does to the drug to what the drug does to the body. Pharmacodynamics is the effect at the site of action, not how much drug arrives there.'},
  {t:'product performance',
   why:'Picking this takes the step before for the whole. Drug product performance is the release of the drug substance from the product, which leads to bioavailability; it is not the absorption itself.'}],
 teach:[
  {h:'Her four definitions', list:[
   'Drug product performance: the release of the drug substance from the drug product leading to bioavailability.',
   'Bioavailability: the rate and extent to which the active ingredient or active moiety is absorbed from a drug product and becomes available at the site of action. Extent is read from AUC, rate from tmax.',
   'Absolute bioavailability compares extravascular with IV; relative bioavailability compares two extravascular products.',
   'Bioequivalence: no significant difference in rate and extent between two products.']}],
 cite:E2R_CITE + ', question 8; 7a---Bioavailability-and-Bioequivalence.pdf, slide "Bioavailability"'},

{id:'e2r-9', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'raise-css-by-regimen', skill:'apply', source:'slide',
 stem:'Which of the following would be expected following a decrease in the dosing interval with no change to the dose?',
 options:[
  {t:'decreased MTC',
   why:'Picking this treats the toxic threshold as something the regimen moves. MTC, the minimum toxic concentration, belongs to the drug; a regimen changes where the levels sit relative to it, not the threshold itself.'},
  {t:'increased fluctuations between peak to trough concentrations',
   why:'Picking this takes the bullet for increasing the interval. A shorter interval leaves less time for the level to fall, so the trough sits closer to the peak and fluctuation decreases.'},
  {t:'increased patient compliance',
   why:'Picking this reverses her slide: more frequent doses decrease patient compliance. A longer interval is the change that increases compliance.'},
  {t:'increased steady-state concentrations', correct:true,
   why:'Her slide "Altering Dosing Interval": decreasing the dosing interval increases steady-state concentrations. Each dose arrives before as much of the last has left, so Cmax∞, Cmin∞ and Cavg∞ all rise.'}],
 teach:[
  {h:'Her slide "Altering Dosing Interval"', list:[
   'Increasing the interval: decreased steady-state concentrations, increased fluctuations between peak and trough, increased patient compliance.',
   'Decreasing the interval: increased steady-state concentrations, decreased fluctuations between peak and trough, decreased patient compliance.',
   'She builds the distractors from the opposite list, so each wrong option here is a bullet from the other half of the slide or a property of the drug.']}],
 cite:E2R_CITE + ', question 9; 6a---Multiple-Oral-Doses.pdf, slide "Altering Dosing Interval"'},

{id:'e2r-10', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L07',
 topic:'multi', sub:'superpos', concept:'superposition-assumptions', skill:'recall', source:'slide',
 stem:'The principle of superposition assumes that early doses of drug have no effect on the pharmacokinetics of subsequent doses.',
 options:[
  {t:'True', correct:true,
   why:'Her slide "Superposition" lists two assumptions: the drug is eliminated by first-order kinetics, and the pharmacokinetics of the drug after a single dose are not altered after multiple doses. The statement is the second one.'},
  {t:'False',
   why:'Picking this treats accumulation as a change in the kinetics. Drug does build up, but each dose is still eliminated with the same k, VD and clearance; that unchanged behaviour is exactly what superposition assumes.'}],
 teach:[
  {h:'Superposition', list:[
   'Assumption 1: first-order elimination. Assumption 2: the pharmacokinetics after a single dose are not altered after multiple doses.',
   'Under both, the concentration at any time is the sum of what is left of every dose given so far.']}],
 cite:E2R_CITE + ', question 10; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Superposition"'},

{id:'e2r-11', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'absolute-vs-relative', skill:'recall', source:'slide', dupOf:'cq4-10',
 stem:'Which term below describes a comparison of the bioavailability of the active drug in the systemic circulation following extravascular administration with the bioavailability of the same drug following intravenous administration?',
 options:[
  {t:'absolute bioavailability', correct:true,
   why:'Her slide "Absolute Bioavailability" word for word: extravascular compared with intravenous. The IV dose is the reference because all of it reaches the systemic circulation.'},
  {t:'bioequivalence',
   why:'Picking this takes a test between two products for a comparison with IV. Bioequivalence asks whether two products differ significantly in rate and extent of absorption.'},
  {t:'drug product performance',
   why:'Picking this names the release of drug from the product, the step that leads to bioavailability, not a comparison of two routes.'},
  {t:'relative bioavailability',
   why:'Picking this keeps the comparison but changes the reference. Relative bioavailability compares two extravascular products, such as a tablet against an oral solution, with no IV dose.'}],
 teach:[
  {h:'Absolute or relative', list:[
   'Absolute: extravascular against IV, Fabs = {{frac:AUCpo|AUCIV}} × {{frac:DIV|Dpo}}.',
   'Relative: one extravascular product against another, Frel = {{frac:AUCA|AUCB}} × {{frac:DB|DA}}.',
   'This stem is her Quiz 4, question 10, repeated on the review.']}],
 cite:E2R_CITE + ', question 11; 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability"'},

{id:'e2r-12', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'conc', concept:'oral-curve-phases', skill:'recall', source:'slide',
 stem:'Which of the following is true regarding the absorption phase following oral administration?',
 options:[
  {t:'drug at the absorption site has become depleted',
   why:'Picking this names the elimination phase, after absorption is complete. During the absorption phase drug is still arriving from the gut faster than it leaves.'},
  {t:'the rate of drug elimination is faster than the rate of drug absorption',
   why:'Picking this describes the post-absorption phase after the peak, when the concentration falls although some drug is still being absorbed.'},
  {t:'the rate of drug absorption is faster than the rate of drug elimination', correct:true,
   why:'Before the peak more drug enters from the absorption site each hour than is eliminated, so the concentration rises. That rising limb is the absorption phase.'},
  {t:'the rate of drug absorption equals the rate of drug elimination',
   why:'Picking this takes one instant for a phase. The two rates are equal only at tmax, the peak; the absorption phase is the whole stretch before it.'}],
 teach:[
  {h:'The three phases of the oral curve', list:[
   'Absorption phase, before the peak: absorption faster than elimination, so the level rises.',
   'At the peak, tmax: the two rates are equal.',
   'Post-absorption phase, after the peak: elimination faster, with some drug still being absorbed. Elimination phase: absorption site depleted, elimination only.',
   'Her Quiz 3, question 4, asked the peak: at Cmax the rate of absorption equals the rate of elimination.']}],
 cite:E2R_CITE + ', question 12; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Example of a concentration-time profile following extravascular administration"'},

{id:'e2r-13', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L07',
 topic:'multi', sub:'ssbolus', concept:'when-cmin', skill:'recall', source:'slide', dupOf:'m6-c13',
 stem:'When does the minimum concentration of drug in the plasma occur with multiple IV bolus dosings?',
 options:[
  {t:'at the end of the dosing interval', correct:true,
   why:'A bolus puts the whole dose in at once, so the level is highest just after each dose and falls until the next one. The lowest point is just before the next dose, the end of the interval.'},
  {t:'in 3 to 5 half-lives',
   why:'Picking this answers a different question: 3 to 5 half-lives is how long it takes to reach steady state, not when each interval\'s minimum occurs.'},
  {t:'when the rate of absorption equals the rate of elimination',
   why:'Picking this brings in oral dosing. An IV bolus has no absorption step, and equal absorption and elimination rates mark the oral peak, not a minimum.'},
  {t:'when the rate of absorption exceeds the rate of elimination',
   why:'Picking this describes the rising part of an oral curve. An IV bolus has no absorption, and a rising level is not a minimum.'}],
 teach:[
  {h:'Peak and trough with a bolus', list:[
   'Cmax∞ just after each dose; Cmin∞ = Cmax∞ e^(−kτ) at the end of the interval, just before the next dose.',
   'The distractors borrow oral-dosing phrases (absorption against elimination) and the time-to-steady-state rule.']}],
 cite:E2R_CITE + ', question 13; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"'},

{id:'e2r-14', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'clcalc', concept:'clearance-halflife-inverse', skill:'apply', source:'slide',
 stem:'If there is an decrease in the total body clearance of an agent due to renal dysfunction, what is the expected change to the elimination half-life of that agent?',
 options:[
  {t:'the elimination half-life will decrease',
   why:'Picking this moves the half-life with clearance instead of against it. t½ = {{frac:0.693 × VD|Cl}}: clearance is in the denominator, so a smaller clearance gives a longer half-life.'},
  {t:'the elimination half-life will increase', correct:true,
   why:'t½ = {{frac:0.693 × VD|Cl}}. With VD unchanged, lower clearance means slower removal, so it takes longer for half of the drug to leave.'},
  {t:'the elimination half-life will not change',
   why:'Picking this treats the half-life as fixed for a drug. It depends on clearance and VD, so a fall in clearance must lengthen it.'}],
 teach:[
  {h:'Clearance and half-life', list:[
   'k = {{frac:Cl|VD}} and t½ = {{frac:0.693|k}}, so t½ = {{frac:0.693 × VD|Cl}}: clearance down, half-life up.',
   'Her Quiz 3, question 2, asked the reverse wording, an increase in clearance due to renal dysfunction, keyed "decrease". She varies the direction, so read the stem.']}],
 cite:E2R_CITE + ', question 14; 4---Clearance-and-Elimination.pdf slide 21'}
];

CHAINS.push(
 {id:'e2r-sheet', src:'review', module:6, span:true, name:'Exam 2 In-Class Review',
  setup:'Her review sheet in her order: CrCl, renal clearance and mechanism, an IV-to-oral regimen in eight parts, two infusions, then ten concept items',
  parts:['e2r-1', 'e2r-2', 'e2r-2m', 'e2r-3a', 'e2r-3b', 'e2r-3c', 'e2r-3d', 'e2r-3e', 'e2r-3f', 'e2r-3g', 'e2r-3h', 'e2r-4',
         'e2r-5', 'e2r-6', 'e2r-7', 'e2r-8', 'e2r-9', 'e2r-10', 'e2r-11', 'e2r-12', 'e2r-13', 'e2r-14']}
);
