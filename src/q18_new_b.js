/* ==========================================================================
   EXAM 3 ADDITIONS — Modules 4, 5 and 6
   ==========================================================================
   Each tests a trap or phrasing of hers that the bank did not yet ask her
   way. Numbers are hers wherever a vignette of hers exists; `audit` names the
   item of hers each one is built on. Every numeric key is recomputed at full
   precision.
   ========================================================================== */
const Q_NEW_B = [

/* ---------------- Module 4: renal mechanism at the filtration rate ---------------- */
{id:'x3-b-mech120', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'renalmech', concept:'mechanism-from-clr', skill:'apply', source:'both',
 stem:'A new antibiotic is excreted by the kidney and has a renal clearance that is approximately 120 mL/min. What is the probable mechanism of renal excretion of this drug?',
 options:[
  {t:'Filtration only', correct:true,
   why:'A renal clearance at the glomerular filtration rate, about 120 mL/min, is what filtration alone produces. Nothing is added beyond what is filtered and nothing filtered is missing, so no second process is inferred. A value a few mL/min either side, such as 119 or 121 mL/min, is read the same way.'},
  {t:'Filtration with active secretion',
   why:'Picking this reads secretion into a value that does not exceed the filtration rate. Secretion is inferred only when renal clearance is greater than the GFR, as at 300 or 350 mL/min, because a transporter then adds drug to the lumen. At about 120 mL/min there is no excess for secretion to explain.'},
  {t:'Filtration with tubular reabsorption',
   why:'Picking this reads reabsorption into a value that is not below the filtration rate. Reabsorption is inferred only when renal clearance is less than the GFR, as at 45 mL/min, because filtered drug then returns to the blood. At about 120 mL/min none of the filtered drug is missing from the urine.'}],
 steps:[
  {k:'setup', t:'GFR ≈ 120 mL/min; ClR ≈ 120 mL/min',
   why:'Renal clearance is read against the glomerular filtration rate (GFR), the plasma that filtration alone clears each minute, about 120 mL/min.'},
  {k:'algebra', t:'{{frac:120 mL/min|120 mL/min}} = 1, so ClR equals the GFR: filtration only',
   why:'Equal to the filtration rate means filtration accounts for all of the renal clearance; above it would mean secretion, below it reabsorption.'}],
 teach:[
  {h:'Reading the mechanism from renal clearance', list:[
   'Renal clearance about equal to 120 mL/min, the glomerular filtration rate: filtration only.',
   'Greater than 120 mL/min: filtration with active secretion.',
   'Less than 120 mL/min: filtration with tubular reabsorption.',
   'The comparison is made in mL/min: a renal clearance in L/hr is converted first, and 7.2 L/hr is 120 mL/min.']}],
 quote:'And I\'m saying 120. If it\'s 119, 121, OK, let\'s call that filtration. If it\'s 250, then let\'s assume that we\'ve got some active secretion going on.',
 audit:'Stem frame and the three options are her Exam 2 In-Class Review item 7 (300 mL/min, keyed filtration with active secretion, 5 Oct) with the clearance set at 120 mL/min, which her 14 Sep rule reads as filtration. No item of hers keys "Filtration only". 120 x 60 / 1000 = 7.2 L/hr.',
 cite:'Exam 2 In-Class Review (handed out 7 Oct 2026), question 7 format; 4---Clearance-and-Elimination.pdf, slide 13 "Renal Excretion" (glomerular filtration avg. 120 mL/min); 09.14 lecture'},

/* ---------------- Module 4: renal clearance in L/hr against 120 mL/min ---------------- */
{id:'x3-b-mechlhr', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'renalmech', concept:'mechanism-from-clr', skill:'apply', source:'both',
 stem:'The renal clearance of procainamide in a normal healthy subject is 21.02 L/hr. What is the probable mechanism of renal excretion of this drug?',
 options:[
  {t:'Filtration only',
   why:'Picking this treats 21.02 L/hr as a value close to the filtration rate without converting it. In mL/min it is 350.3 mL/min, nearly three times 120 mL/min, so filtration cannot account for all of it. Filtration only fits a renal clearance of about 120 mL/min, which is 7.2 L/hr.'},
  {t:'Filtration with active secretion', correct:true,
   why:'Renal clearance is compared with the glomerular filtration rate in the same units. 21.02 L/hr is 21.02 × 1000 ÷ 60 = 350.3 mL/min, well above 120 mL/min. A renal clearance above the filtration rate means drug is being added to the lumen by active tubular secretion as well as by filtration.'},
  {t:'Filtration with tubular reabsorption',
   why:'Picking this compares the number 21.02 with 120 although the two are in different units. 120 mL/min is 7.2 L/hr, and 21.02 L/hr is almost three times that. Reabsorption would put the renal clearance below 7.2 L/hr, not above it.'}],
 steps:[
  {k:'unit', t:'ClR = {{frac:21.02 × 1000|60}} = 350.3 mL/min',
   why:'Litres per hour become millilitres per minute by multiplying by 1000 mL per litre and dividing by 60 minutes per hour, so the value can be set against the filtration rate in its own unit.'},
  {k:'setup', t:'GFR ≈ 120 mL/min; ClR = 350.3 mL/min is greater, so filtration with active secretion',
   why:'Above the filtration rate means a process is adding drug to the tubular fluid beyond what filtration delivers: active secretion.'}],
 teach:[
  {h:'Same units before the comparison', list:[
   'The filtration rate is about 120 mL/min, which is 7.2 L/hr.',
   'Renal clearance from fe × ClT usually comes out in L/hr, because ClT = k × VD uses k in hr⁻¹ and VD in L.',
   'Convert renal clearance to mL/min, multiplying by 1000 and dividing by 60, before reading the mechanism.',
   'Above 120 mL/min: filtration with active secretion. Below: filtration with tubular reabsorption. About equal: filtration only.']}],
 quote:'So, here we are comparing this to just GFR, right? So we\'re comparing the renal clearance to 120 mL per minute. So if it\'s more than 120, we assume active secretion, less than 120, we assume um reabsorption.',
 audit:'21.02 L/hr is her key to Single Oral Practice 1, part 1 (procainamide, ClT 32.34 L/hr x 0.65). The unit step is the one her Exam 2 In-Class Review item 2 asks for ("renal clearance in mL/min"). Shargel Ch 15, learning question 9 answer: "GFR ~ 120 mL/min or 7.2 L/h". 21.02 x 1000 / 60 = 350.33 mL/min.',
 cite:'Single Oral Practice 1 (procainamide), part 1; Exam 2 In-Class Review (handed out 7 Oct 2026), question 2; 4---Clearance-and-Elimination.pdf, slide 18 "Active Secretion"'},

/* ---------------- Module 4: urine pH and reabsorption ---------------- */
{id:'x3-b-urineph', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'ionization', concept:'urine-ph-reabsorption', skill:'apply', source:'both',
 stem:'A weakly acidic drug is filtered at the glomerulus and partly reabsorbed from the renal tubule. Which of the following would be expected if the urine is made more alkaline?',
 options:[
  {t:'Increased renal excretion of the drug', correct:true,
   why:'A weak acid loses a proton as the pH rises, so in alkaline urine a larger share of it is ionized. The ionized form is not lipid soluble and does not cross the tubule wall back into the blood, so less drug is reabsorbed and more leaves in the urine.'},
  {t:'Decreased renal excretion of the drug',
   why:'Picking this reverses the effect of pH on a weak acid. Raising the pH ionizes a weak acid, and it is the nonionized form that is reabsorbed, so reabsorption falls and excretion rises. A weak base behaves the other way: alkaline urine leaves more of it nonionized and reabsorbed.'},
  {t:'No change in renal excretion of the drug',
   why:'Picking this treats renal excretion as filtration alone. The reabsorption of weak acids and weak bases depends on the pH of the fluid in the renal tubule and on the pKa of the drug. A drug that is partly reabsorbed therefore responds to a change in urine pH.'},
  {t:'Increased glomerular filtration of the drug',
   why:'Picking this places the pH effect at the glomerulus. Glomerular filtration is passive diffusion across the glomerulus at about 120 mL/min and does not depend on how much of the drug is ionized in the urine. Urine pH acts on reabsorption, the step after filtration.'}],
 teach:[
  {h:'Urine pH and tubular reabsorption', list:[
   'Only the nonionized form of a weak acid or weak base is lipid soluble enough to cross from the tubule back into the blood.',
   'Weak acid (pKa 3 to 8): alkaline urine ionizes more of it, so less is reabsorbed and more is excreted.',
   'Weak base (pKa 7.5 to 10.5): acidic urine ionizes more of it, with the same result.',
   'Weak acid: pH = pKa + log{{frac:ionized|nonionized}}. Weak base: pH = pKa + log{{frac:nonionized|ionized}}.']}],
 quote:'We talked about that that matters when we\'re looking at tubular reabsorption and what happens if we adjust the, the pH of the urine, what happens to the rate at which we expect the drug to be excreted from the body.',
 audit:'Her slide 20 gives the two factors (tubular pH and pKa) and the pKa ranges; her 5 Oct Exam 2 objectives name the question; the 14 Sep lecture ends on this slide before the direction is stated. Direction (weak acid, alkaline urine, more ionized, not lipid soluble, less reabsorbed, more excreted) from Shargel Ch 15, learning question 9 answer (ciprofloxacin). No item of hers on this objective exists.',
 cite:'4---Clearance-and-Elimination.pdf, slide 20 "Effect of Urine pH on the Reabsorption of Weakly Acidic and Basic Drugs"; Exam 2 objectives (10.05 lecture); Shargel Ch 15, learning question 9'},

/* ---------------- Module 4: urine pH, the weak base and the other direction ---------------- */
{id:'x3-b-urphbase', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05', dupOf:'x3-b-urineph',
 topic:'clearance', sub:'ionization', concept:'urine-ph-reabsorption', skill:'apply', source:'both',
 stem:'A weakly basic drug is filtered at the glomerulus and partly reabsorbed from the renal tubule. Which of the following would be expected if the urine is made more acidic?',
 options:[
  {t:'Increased renal excretion of the drug', correct:true,
   why:'For a weak base, pH = pKa + log{{frac:nonionized|ionized}}, so a lower urine pH leaves a larger share of the drug ionized. The ionized form does not cross the tubule wall back into the blood, so less is reabsorbed and more leaves in the urine.'},
  {t:'Decreased renal excretion of the drug',
   why:'Picking this applies the weak-acid direction to a weak base. Acidic urine leaves more of a weak acid nonionized and reabsorbed, but it ionizes a weak base, so for a base reabsorption falls and excretion rises.'},
  {t:'No change in renal excretion of the drug',
   why:'Picking this treats renal excretion as filtration alone. The reabsorption of weak acids and weak bases depends on the pH of the fluid in the renal tubule and on the pKa of the drug, so a drug that is partly reabsorbed responds to a change in urine pH.'},
  {t:'Increased glomerular filtration of the drug',
   why:'Picking this places the pH effect at the glomerulus. Filtration is passive diffusion across the glomerulus and does not depend on how much of the drug is ionized in the urine. Urine pH acts on reabsorption, the step after filtration.'}],
 teach:[
  {h:'Urine pH and tubular reabsorption', list:[
   'Only the nonionized form of a weak acid or weak base crosses from the tubule back into the blood.',
   'Weak base (pKa 7.5 to 10.5): acidic urine ionizes more of it, so less is reabsorbed and more is excreted; alkaline urine does the opposite.',
   'Weak acid (pKa 3 to 8): alkaline urine ionizes more of it, so less is reabsorbed and more is excreted; acidic urine does the opposite.',
   'Weak acid: pH = pKa + log{{frac:ionized|nonionized}}. Weak base: pH = pKa + log{{frac:nonionized|ionized}}.']}],
 quote:'We talked about that that matters when we\'re looking at tubular reabsorption and what happens if we adjust the, the pH of the urine, what happens to the rate at which we expect the drug to be excreted from the body.',
 audit:'Built on x3-b-urineph with the drug made a weak base. Her slide 20 prints the weak-base form, pH = pKa + log(nonionized/ionized); a lower pH therefore means a larger ionized share. That the nonionized form is the one reabsorbed is the premise x3-b-urineph takes from Shargel Ch 15, learning question 9. No item of hers on this objective exists.',
 cite:'4---Clearance-and-Elimination.pdf, slide 20 "Effect of Urine pH on the Reabsorption of Weakly Acidic and Basic Drugs"; Exam 2 objectives (10.05 lecture); Shargel Ch 15, learning question 9'},

{id:'x3-b-urphacid', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05', dupOf:'x3-b-urineph',
 topic:'clearance', sub:'ionization', concept:'urine-ph-reabsorption', skill:'apply', source:'both',
 stem:'A weakly acidic drug is filtered at the glomerulus and partly reabsorbed from the renal tubule. Which of the following would be expected if the urine is made more acidic?',
 options:[
  {t:'Decreased renal excretion of the drug', correct:true,
   why:'For a weak acid, pH = pKa + log{{frac:ionized|nonionized}}, so a lower urine pH leaves a larger share of the drug nonionized. The nonionized form crosses back into the blood, so more is reabsorbed and less leaves in the urine.'},
  {t:'Increased renal excretion of the drug',
   why:'Picking this applies the weak-base direction to a weak acid. Acidic urine ionizes a weak base and raises its excretion, but it keeps a weak acid nonionized, so for an acid reabsorption rises and excretion falls.'},
  {t:'No change in renal excretion of the drug',
   why:'Picking this treats renal excretion as filtration alone. The reabsorption of weak acids and weak bases depends on the pH of the fluid in the renal tubule and on the pKa of the drug, so a drug that is partly reabsorbed responds to a change in urine pH.'},
  {t:'Decreased glomerular filtration of the drug',
   why:'Picking this places the pH effect at the glomerulus. Filtration is passive diffusion across the glomerulus and does not depend on how much of the drug is ionized in the urine. Urine pH acts on reabsorption, the step after filtration.'}],
 teach:[
  {h:'Urine pH and tubular reabsorption', list:[
   'Only the nonionized form of a weak acid or weak base crosses from the tubule back into the blood.',
   'A drug in urine of its own kind (an acid in acidic urine, a base in alkaline urine) is mostly nonionized and reabsorbed; in urine of the opposite kind it is ionized and excreted.',
   'Weak acid: pH = pKa + log{{frac:ionized|nonionized}}. Weak base: pH = pKa + log{{frac:nonionized|ionized}}.']}],
 quote:'We talked about that that matters when we\'re looking at tubular reabsorption and what happens if we adjust the, the pH of the urine, what happens to the rate at which we expect the drug to be excreted from the body.',
 audit:'Built on x3-b-urineph with the urine made acidic instead of alkaline. Her slide 20 prints the weak-acid form, pH = pKa + log(ionized/nonionized); a lower pH therefore means a larger nonionized share. That the nonionized form is the one reabsorbed is the premise x3-b-urineph takes from Shargel Ch 15, learning question 9. No item of hers on this objective exists.',
 cite:'4---Clearance-and-Elimination.pdf, slide 20 "Effect of Urine pH on the Reabsorption of Weakly Acidic and Basic Drugs"; Exam 2 objectives (10.05 lecture); Shargel Ch 15, learning question 9'},

/* ---------------- Module 4: the 0.85 in Cockcroft-Gault ---------------- */
{id:'x3-b-cg085', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'crclcalc', concept:'female-factor', skill:'recall', source:'both',
 stem:'Why does the Cockcroft-Gault equation multiply the estimate by 0.85 for a female patient?',
 options:[
  {t:'Women are assumed to have less muscle mass', correct:true,
   why:'Creatinine comes from the breakdown of muscle. The equation assumes that women are smaller and less muscular than men, so the same serum creatinine is read as a creatinine clearance 15% lower in a woman.'},
  {t:'Women are assumed to have a higher serum creatinine',
   why:'Picking this moves the sex difference into the laboratory value. Serum creatinine is measured in each patient and entered as it is; the equation assumes no value for it. The 0.85 is a separate factor applied after the division.'},
  {t:'Women are assumed to secrete more creatinine',
   why:'Picking this confuses the female factor with the known flaw of creatinine as a filtration marker. Creatinine is partly secreted in every patient, which is why inulin, almost completely filtered, is the better marker. The 0.85 rests on body size and muscle, not on secretion.'},
  {t:'Women have a higher glomerular filtration rate',
   why:'Picking this reverses the direction of the factor. Multiplying by 0.85 lowers the estimate, so the equation assigns a woman a lower creatinine clearance than a man of the same age, weight and serum creatinine, not a higher one.'}],
 teach:[
  {h:'What the Cockcroft-Gault estimate assumes', list:[
   'CrCl = {{frac:(140 − age)(IBW)|72 × SCr}}, × 0.85 if female; age in years, IBW (ideal body weight) in kg, SCr (serum creatinine) in mg/dL, result in mL/min.',
   'Creatinine comes from muscle breakdown, so serum creatinine depends on muscle mass as well as on kidney function.',
   'The 0.85 rests on the assumption that women are smaller and less muscular than men.',
   'In patients whose muscle mass is far from average, frail elderly women or people who lift heavy weights, the serum creatinine may not reflect kidney function well.']}],
 quote:'So, assumptions, the 0.85 if female. What do you think about that? The assumption is that women are smaller than men, less muscular than men.',
 audit:'Her 14 Sep discussion of the Cockcroft-Gault assumptions; on 5 Oct she lists "why do we use Cockcroft galt and why do we use creatinine clearance?" among the Exam 2 objectives. Written for this review.',
 cite:'4---Clearance-and-Elimination.pdf, slides 15 and 16 "Creatinine Clearance/GFR" and "Creatinine Clearance"; 09.14 lecture'},

/* ---------------- Module 4: her Exam 2 review CrCl with the sex changed ---------------- */
{id:'x3-b-crclm', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'crclcalc', concept:'cockcroft-gault', skill:'crcl', source:'both', dupOf:'e2r-1',
 stem:'Using the patient\'s ideal body weight, estimate the creatinine clearance of a 45-year-old male who weighs 154 lb, serum creatinine of 0.78 mg/dL, and stands 5\'8" tall.',
 units:'mL/min', answer:115.7, tol:1.2,
 steps:[
  {k:'unit', t:'5 ft 8 in is 8 inches over 5 ft',
   why:'The ideal body weight equation counts only the inches above five feet, so the 5 feet are dropped and the 8 inches are kept.'},
  {k:'algebra', t:'IBW (male) = 50 + (2.3)(8) = 50 + 18.4 = 68.4 kg',
   why:'The male form starts from 50 kg and adds 2.3 kg for each inch over 5 feet. The 154 lb actual weight is not used, because the stem asks for the ideal body weight.'},
  {k:'setup', t:'CrCl = {{frac:(140 − age)(IBW)|72 × SCr}}, with no 0.85 factor for a male',
   why:'This is the Cockcroft-Gault equation, which is not on the equation sheet. Age is in years, IBW in kg and SCr (serum creatinine) in mg/dL; the 0.85 applies only to a female patient.'},
  {k:'algebra', t:'{{frac:(140 − 45)(68.4)|72 × 0.78}} = {{frac:6498|56.16}} = 115.71 mL/min',
   why:'The numerator is 95 years times 68.4 kg and the denominator is 72 times 0.78 mg/dL. The units do not cancel to mL/min, but creatinine clearance is reported in mL/min, the unit of the 120 to 130 mL/min normal range.'},
  {k:'round', t:'CrCl = 115.7 mL/min',
   why:'115.71 to one decimal place. A female patient with the same numbers gives 91.9 mL/min, because both the IBW constant and the 0.85 factor change.'}],
 setup:{eq:'crcl', pre:['ibw-male'], why:'"Using the patient\'s ideal body weight, estimate the creatinine clearance" of a "male": Cockcroft-Gault with the male IBW, 50 + 2.3 per inch over 5 ft, and no 0.85 factor. Height gives IBW first; the pounds are not used.'},
 asks:'CrCl',
 givens:[['age', '45-year-old', '140 − 45 = 95 in the numerator'], ['sex', 'male', 'IBW constant 50 and no 0.85 factor'], ['weight', '154 lb', 'not needed: the stem asks for ideal body weight'], ['SCr', '0.78 mg/dL', '72 × 0.78 = 56.16 in the denominator'], ['height', '5\'8"', '8 inches over 5 ft, so IBW = 68.4 kg']],
 check:{t:'With SCr below 1, 72 × 0.78 = 56.16 is below 72, so CrCl comes out above IBW × (140 − 45) ÷ 72; the male value must also exceed the female value, which carries the 0.85.', lo:90, hi:130},
 teach:[
  {h:'How she sets the CrCl item', list:[
   'Actual weight arrives in pounds and height in feet and inches, with the words "using the patient\'s ideal body weight": the pounds are not used.',
   'IBW male = 50 + 2.3 × (inches over 5 ft); IBW female = 45.5 + 2.3 × (inches over 5 ft).',
   'CrCl = {{frac:(140 − age)(IBW)|72 × SCr}}, times 0.85 for a female, reported in mL/min.',
   'Neither the IBW equations nor Cockcroft-Gault is printed on her equation sheet.']}],
 quote:'So, a for males, the ideal body weight is 50 + 2.3 times the inches over 5 ft.',
 audit:'Her Exam 2 In-Class Review item 1 (female, keyed "92-ish" on 5 Oct, 91.88 computed) with the sex changed to male; every other number is hers. Recomputed: IBW 68.4 kg; 95 x 68.4 / (72 x 0.78) = 115.705 mL/min.',
 cite:'Exam 2 In-Class Review (handed out 7 Oct 2026), question 1, sex changed; 4---Clearance-and-Elimination.pdf, slide 16 "Creatinine Clearance"'},

/* ---------------- Module 5: her tmax poll, word for word ---------------- */
{id:'x3-b-polltmax', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'peak', concept:'tmax-dose-independent', skill:'apply', source:'both', dupOf:'m5-c16',
 stem:'Which of the following results when an oral dose is increased?',
 options:[
  {t:'An increase in tmax (more time to reach Cmax)',
   why:'Picking this treats the peak as a fixed target that a larger dose takes longer to reach. tmax = {{frac:ln(ka/k)|ka − k}} contains only the two rate constants, and the dose changes neither. Cmax rises with the dose; the time it occurs does not.'},
  {t:'A decrease in tmax (less time to reach Cmax)',
   why:'Picking this reads the faster rate of absorption from a larger dose as an earlier peak. The rate of absorption does rise, but so does the rate of elimination, by the same proportion, because both are first order. They become equal at the same time as before, so the peak occurs at the same tmax.'},
  {t:'No change in the tmax', correct:true,
   why:'For a single oral dose tmax depends solely on ka and k, the rates of drug going in and drug going out. A larger dose raises Cmax and AUC in proportion, and leaves tmax where it was.'}],
 teach:[
  {h:'What a larger oral dose changes', list:[
   'Cmax and AUC rise in proportion to the dose.',
   'tmax does not change: tmax = {{frac:ln(ka/k)|ka − k}} depends solely on ka and k.',
   'The rates of absorption and elimination rise, because each is a rate constant times a larger amount; ka and k themselves do not change.',
   'At steady state tmax∞ depends on ka, k and τ, and still not on the dose.']}],
 quote:'If I increase the dose, what happens to T-Max? Nothing, right? ... T-Max is independent or dependent of dose. Independent, right?',
 audit:'PollEv printed on 6a---Multiple-Oral-Doses.pdf slide 1, options verbatim. Run as the attendance question on 23 Sep ("most of you guys thought that there should be no change in T Max") and again on 28 Sep ("That is what I was looking for"); the 21 Sep lecture sets it up as a question she will ask. Not in the bank in her wording before this item.',
 cite:'6a---Multiple-Oral-Doses.pdf slide 1 (PollEv); 5---Pharmacokinetics-of-Oral-Absorption.pdf slide 18 "Changing Dose"'},

/* ---------------- Module 5: her Quiz 3 question 5, Cmax asked ---------------- */
{id:'x3-b-cmaxq3', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'peak', concept:'cmax-oral', skill:'oral', source:'both',
 stem:'What is the maximum concentration of drug in the plasma following a single 1000-mg oral dose of an agent that has an oral bioavailability of 83%, apparent volume of distribution of 18 L, absorption half-life of 0.8 hours, and elimination half-life of 5.6 hours?',
 units:'mg/L', answer:33.3, tol:0.5,
 steps:[
  {k:'setup', t:'ka = {{frac:0.693|0.8 hr}} = 0.86625 hr⁻¹; k = {{frac:0.693|5.6 hr}} = 0.12375 hr⁻¹',
   why:'Both half-lives are converted to first-order rate constants with 0.693 over the half-life, because the oral equation is written in ka and k, not in half-lives.'},
  {k:'setup', t:'tmax = {{frac:ln(0.86625/0.12375)|0.86625 − 0.12375}} = {{frac:ln(7)|0.7425}} = 2.621 hr',
   why:'Cmax is the concentration at tmax, so tmax is found first even though only Cmax is asked. The ratio of the two rate constants is 7, and the difference is 0.7425 hr⁻¹.'},
  {k:'algebra', t:'{{frac:(0.83)(1000)(0.86625)|(18)(0.7425)}} = {{frac:718.99|13.365}} = 53.80 mg/L',
   why:'This is the constant in front of the brackets, F·ka·D0 over VD(ka − k). Milligrams over litres give mg/L, and the hr⁻¹ in ka and in (ka − k) cancel. F enters as 0.83.'},
  {k:'algebra', t:'e^(−0.12375 × 2.621) − e^(−0.86625 × 2.621) = 0.7230 − 0.1033 = 0.6197',
   why:'The bracket is drug out minus drug in at the peak time: the elimination term minus the absorption term, a pure number.'},
  {k:'algebra', t:'Cmax = (53.80 mg/L)(0.6197) = 33.34 mg/L',
   why:'The constant times the bracket gives the plasma concentration at tmax, which is the maximum.'},
  {k:'round', t:'Cmax = 33.3 mg/L',
   why:'33.34 to one decimal place. Using tmax rounded to 2.6 hr gives the same 33.3 mg/L.'}],
 setup:{eq:'oral-cp', pre:['thalf-abs', 'thalf-first', 'tmax'], why:'"single 1000-mg oral dose", "oral bioavailability" and the two half-lives name the oral block. The "maximum concentration" is asked, so Cp = [F·ka·{{frac:D0|VD(ka − k)}}](e^(−kt) − e^(−ka·t)) at t = tmax, after ka, k and tmax.'},
 asks:'Cmax',
 givens:[['D0', '1000-mg', 'in the numerator of the constant'], ['F', '83%', 'as 0.83 in the numerator of the constant'], ['VD', '18 L', 'in the denominator of the constant'], ['t½a', '0.8 hours', 'gives ka = {{frac:0.693|0.8}} = 0.86625 hr⁻¹'], ['t½', '5.6 hours', 'gives k = {{frac:0.693|5.6}} = 0.12375 hr⁻¹']],
 check:{t:'The absorbed dose spread in 18 L, 0.83 × 1000 ÷ 18 mg/L, is the level if it all arrived at once with no elimination; the peak must be below it.', lo:0, hi:46.1},
 teach:[
  {h:'Cmax after a single oral dose', list:[
   'Find ka and k from the half-lives, with the times in hours.',
   'Find tmax = {{frac:ln(ka/k)|ka − k}} first, even when only Cmax is asked.',
   'Cmax = {{frac:F·ka·D0|VD(ka − k)}} × (e^(−k·tmax) − e^(−ka·tmax)).',
   'F, the dose and VD set the height of the peak; they do not change tmax.']}],
 quote:'if you are asked for C-Max, and I will ask you for CMax, you must find TMax first. Find T-Max before you find CMax, OK?',
 audit:'Her Canvas Quiz 3, question 5 (keyed tmax 2.6 hr) with the unknown changed to Cmax; every number is hers. Recomputed in python: ka 0.86625, k 0.12375, tmax 2.62075 hr, Cmax 33.3393 mg/L (33.3385 at t = 2.6 hr). Leaving out F gives 40.17 mg/L, outside the tolerance.',
 cite:'Canvas Quiz 3 (Modules 4-5), question 5, Cmax asked; 5---Pharmacokinetics-of-Oral-Absorption.pdf slide 12 "Cp vs. Time for a Single Oral Dose"'},

/* ---------------- Module 6: when the maximum occurs with repeated IV bolus ---------------- */
{id:'x3-b-maxbolus', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L07',
 topic:'multi', sub:'ssbolus', concept:'when-cmin', skill:'recall', source:'both',
 stem:'When does the maximum concentration of drug in the plasma occur with multiple IV bolus dosings?',
 options:[
  {t:'when the dose is given', correct:true,
   why:'An IV bolus puts the whole dose into the body at once, so the concentration is highest at the moment of injection and falls by first-order elimination until the next dose. At steady state each dose returns the level to the same peak, Cmax∞. No tmax is calculated for a bolus.'},
  {t:'at the end of the dosing interval',
   why:'Picking this names the trough. The concentration falls through the whole interval after a bolus, so the minimum, not the maximum, occurs at the end of the dosing interval, just before the next dose.'},
  {t:'in 3 to 5 half-lives',
   why:'Picking this answers when steady state is reached, not when the peak of each interval occurs. The plateau of equal peaks and troughs is reached in 3 to 5 half-lives; within each interval the peak still comes at the injection.'},
  {t:'when the rate of absorption equals the rate of elimination',
   why:'Picking this carries over the oral result. After an oral dose Cmax occurs at tmax, where the rate of absorption equals the rate of elimination. A bolus has no absorption phase, so there is no tmax to find; the peak is the injection itself.'}],
 teach:[
  {h:'Where the peak and the trough fall', list:[
   'Multiple IV bolus: peak when each dose is given (C0 for the first dose, Cmax∞ at steady state); trough at the end of the dosing interval.',
   'Intermittent IV infusion: peak at the end of each infusion.',
   'Multiple oral doses: peak at tmax, from ka, k and, at steady state, τ. tmax is needed only for oral doses.',
   'Steady state, the plateau of equal peaks and troughs, is reached in 3 to 5 half-lives.']}],
 quote:'When does the max occur? ... Yeah, when you give the dose, right? What happens in 3 to 5 half-lives? OK, that\'s when we reach our steady state, OK?',
 audit:'Her Exam 2 In-Class Review item 13 asks when the minimum occurs (keyed at the end of the dosing interval, 5 Oct); the maximum is her spoken follow-up to the 19 Oct Cmax-at-steady-state poll and her 28 Sep remark ("when does the max occur? Initially ... right when you give the drug. So only for oral ... T Max"). She has reversed the direction of her own items before (Quiz 3 Q2 and Exam 2 review 14). Options reuse item 13.',
 cite:'Final-Exam-Review-10.19.pdf slide 13 (PollEv follow-up); Exam 2 In-Class Review (handed out 7 Oct 2026), question 13 format; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf slide 8'},

/* ---------------- Module 6: the average is not the midpoint ---------------- */
{id:'x3-b-cavgmean', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L07',
 topic:'multi', sub:'ssbolus', concept:'cavg-not-midpoint', skill:'multidose', source:'both', dupOf:'m6-c14',
 stem:'An antibiotic with an elimination half-life of 4 hours is given by multiple IV bolus injections every 8 hours. At steady state the maximum concentration is 53.3 mg/L and the minimum concentration is 13.3 mg/L. What is the expected average concentration at steady state?',
 units:'mg/L', answer:28.9, tol:0.3,
 steps:[
  {k:'setup', t:'C0 = Cmax∞ − Cmin∞ = 53.3 − 13.3 = 40 mg/L',
   why:'Each bolus raises the concentration by {{frac:D0|VD}}, the first-dose C0, so at steady state the peak minus the trough just before it is C0.'},
  {k:'setup', t:'k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹; kτ = (0.17325)(8) = 1.386',
   why:'The half-life is converted to the elimination rate constant, and the product with the 8-hour interval is the exponent and the divisor that the average needs.'},
  {k:'setup', t:'Cavg∞ = {{frac:F·D0|VD·k·τ}} = {{frac:C0|kτ}}, with F = 1 for an IV bolus',
   why:'The average at steady state is the area under one interval divided by τ. D0 over VD is C0, so the dose and the volume are not needed separately.'},
  {k:'algebra', t:'Cavg∞ = {{frac:40 mg/L|1.386}} = 28.86 mg/L',
   why:'kτ is a pure number, so the average keeps the unit of C0.'},
  {k:'round', t:'Cavg∞ = 28.9 mg/L',
   why:'28.86 to one decimal place, below the midpoint (53.3 + 13.3)/2 = 33.3 mg/L. The decline between doses is exponential, fast at first and slower later, so the concentration spends more of the interval near the trough than near the peak.'}],
 setup:{eq:'cavg-ss', pre:['thalf-first', 'cmin-from-cmax'], why:'"multiple IV bolus injections", "at steady state" and "average concentration" name Cavg∞ = {{frac:F·D0|VD·k·τ}}. Dose and VD are not given, but the peak minus the trough is C0 = {{frac:D0|VD}}, and k comes from the half-life.'},
 asks:'Cavgss',
 givens:[['t½', '4 hours', 'gives k = 0.17325 hr⁻¹'], ['τ', 'every 8 hours', 'kτ = 1.386'], ['Cmax∞', '53.3 mg/L', 'peak minus trough gives C0'], ['Cmin∞', '13.3 mg/L', 'peak minus trough gives C0']],
 check:{t:'The average lies between the trough 13.3 and the peak 53.3, and below their midpoint, (53.3 + 13.3)/2, because the decline is exponential.', lo:13.3, hi:33.3},
 teach:[
  {h:'Cavg∞ is not the midpoint of peak and trough', list:[
   'Cavg∞ = {{frac:F·D0|VD·k·τ}} = {{frac:F·D0|ClT·τ}}, the area under one interval divided by τ.',
   'The decline between doses is exponential, so Cavg∞ is lower than (Cmax∞ + Cmin∞)/2.',
   'For a bolus, Cmax∞ − Cmin∞ = C0 = {{frac:D0|VD}}, so the average can be found from the peak, the trough, k and τ.']}],
 quote:'And I want you to realize that the average is not the max plus the [min] divided by 2. Right? ... because we\'re looking at logarithmic decline, it is not an, um, algebraic mean, OK?',
 audit:'Values are her Example 1 answers (53.3, 13.3 and 28.9 mg/L, 23 Sep). Peak minus trough equals C0: her Multiple IV Bolus Practice 4 key (36.95 - 15.95 = 21 mg/L). Recomputed: 40 / (0.17325 x 8) = 28.860 mg/L; the midpoint 33.3 mg/L is outside the tolerance.',
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf slides 9 to 13, Example 1; 09.23 lecture'},

/* ---------------- Module 6: three hours after the third dose ---------------- */
{id:'x3-b-n3dose', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L07',
 topic:'multi', sub:'ndose', concept:'cp-after-n', skill:'multidose', source:'both', dupOf:'m6-n06',
 stem:'An antibiotic has an average t½ of approximately 4 hours and an apparent VD that is 25% of body weight. The drug is to be administered 10 mg/kg every 8 hours by multiple IV bolus injections to a 65-kg female. What is the expected concentration 3 hours after injection of the 3rd dose?',
 units:'mg/L', answer:31.2, tol:0.2,
 steps:[
  {k:'setup', t:'C0 = {{frac:10 mg/kg|0.25 L/kg}} = 40 mg/L',
   why:'Dose and volume are both per kilogram, so the kilograms cancel and the 65 kg is not needed: each dose raises the concentration by 40 mg/L.'},
  {k:'setup', t:'k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹; kτ = (0.17325)(8) = 1.386',
   why:'The half-life gives k, and kτ is the exponent for one dosing interval.'},
  {k:'setup', t:'Cp = C0 × {{frac:1 − e^(−nkτ)|1 − e^(−kτ)}} × e^(−kt), with n = 3 and t = 3 hr',
   why:'Before steady state the n-dose equation is used: n is the dose number, 3, and t is the time since that dose, 3 hours, not the time since the first dose.'},
  {k:'algebra', t:'{{frac:1 − e^(−4.158)|1 − e^(−1.386)}} = 1.3126',
   why:'With n = 3 the exponent is 3 × 1.386 = 4.158. The factor is the drug carried over from the first two doses plus the third dose, as a multiple of one dose.'},
  {k:'algebra', t:'e^(−(0.17325)(3)) = e^(−0.51975) = 0.5947',
   why:'The fraction of the level just after the third dose that remains 3 hours later.'},
  {k:'algebra', t:'Cp = (40 mg/L)(1.3126)(0.5947) = 31.22 mg/L',
   why:'C0 times the accumulation over three doses times the decline since the third dose.'},
  {k:'round', t:'Cp = 31.2 mg/L',
   why:'31.22 to one decimal place: above the 29.7 mg/L found 3 hours after the 2nd dose, and below the 31.7 mg/L 3 hours after a dose at steady state.'}],
 setup:{eq:'cp-n', pre:['thalf-first'], why:'"every 8 hours by multiple IV bolus injections" and "3 hours after injection of the 3rd dose": before steady state, so the n-dose line with n = 3. k first, from the half-life, because both exponents want k.'},
 asks:'Cpn',
 givens:[['t½', 'approximately 4 hours', 'gives k = 0.17325 hr⁻¹ for both exponents'], ['VD', '25% of body weight', 'with the dose gives C0 = 40 mg/L'], ['D0', '10 mg/kg', 'the numerator of C0'], ['τ', 'every 8 hours', 'kτ = 1.386 in the accumulation factor'], ['weight', '65-kg', 'not needed: the kilograms cancel'], ['n', '3rd dose', 'n = 3 in e^(−nkτ)'], ['t', '3 hours after injection', 't = 3 hr in e^(−kt)']],
 check:{t:'The third dose alone gives 40 × 0.5947 mg/L at 3 hours, and the drug carried over from the first two doses adds less than another 40 × 0.5947, so the level lies between those two bounds.', lo:23.7, hi:47.6},
 teach:[
  {h:'Concentration after the nth bolus', list:[
   'Cp = {{frac:D0|VD}} × {{frac:1 − e^(−nkτ)|1 − e^(−kτ)}} × e^(−kt): n is the dose number, t the time since that dose.',
   'The same value is the sum of the single-dose curves: 40e^(−k·19) + 40e^(−k·11) + 40e^(−k·3) mg/L, each dose timed from its own injection.',
   'As n grows, 1 − e^(−nkτ) approaches 1 and the equation becomes the steady-state one, Cmax∞e^(−kt).']}],
 quote:'So, in this one, the um N is 2, right? Because that\'s the dose number, the second dose',
 audit:'Her Example 2 (3 hours after the 2nd dose, 29.7 mg/L, 23 Sep) with n = 3; every other number is hers. Recomputed: 31.2228 mg/L, equal to the superposition sum 40(e^(-19k) + e^(-11k) + e^(-3k)). n = 2 gives 29.735 and steady state 31.70, both outside the tolerance.',
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf slides 14 to 16, Example 2, third dose asked'},

/* ---------------- Module 6: end of the second infusion ---------------- */
{id:'x3-b-end2nd', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'sum-two-infusions', skill:'multidose', source:'both', dupOf:'m6b-n03',
 stem:'A 300-mg dose of an antibiotic was administered as an IV infusion over a period of 2 hours. Six hours after the start of the first infusion, a second dose of 300 mg was infused, again over 2 hours (k = 0.15 hr⁻¹, VD = 15 L). What is the plasma drug concentration at the end of the second infusion?',
 units:'mg/L', answer:24.3, tol:0.2,
 steps:[
  {k:'setup', t:'R = {{frac:300 mg|2 hr}} = 150 mg/hr; Cl = (0.15 hr⁻¹)(15 L) = 2.25 L/hr',
   why:'The infusion rate is the dose over its duration, and clearance is k times VD.'},
  {k:'algebra', t:'Each infusion at its end: {{frac:150|2.25}} × (1 − e^(−0.3)) = (66.67)(0.2592) = 17.28 mg/L',
   why:'During each 2-hour infusion Cp = {{frac:R|Cl}}(1 − e^(−kt)) with t = 2 hr, so kt = 0.3. The second infusion adds the same 17.28 mg/L of its own.'},
  {k:'setup', t:'Time line: first infusion 0 to 2 hr, second 6 to 8 hr; at 8 hr the first has declined for 8 − 2 = 6 hr',
   why:'Each infusion is timed from its own end. The first stopped at 2 hours, so by the end of the second, at 8 hours, it has been declining for 6 hours.'},
  {k:'algebra', t:'First infusion at 8 hr: (17.28)e^(−(0.15)(6)) = (17.28)(0.4066) = 7.03 mg/L',
   why:'After the first infusion stops only first-order elimination acts on its drug, starting from 17.28 mg/L.'},
  {k:'algebra', t:'Cp = 17.28 + 7.03 = 24.31 mg/L',
   why:'Concentrations from each infusion are additive, so the level at the end of the second infusion is its own 17.28 mg/L plus what remains of the first.'},
  {k:'round', t:'Cp = 24.3 mg/L',
   why:'24.31 to one decimal place, higher than the 17.28 mg/L at the end of the first infusion because drug from the first is still present.'}],
 setup:{eq:'cp-infusing', pre:['cp-after-stop', 'cl-k-vd'], why:'"IV infusion over a period of 2 hours", a second infusion, and "at the end of the second infusion": the infusion line for the second infusion\'s own rise, plus the decay line for what is left of the first, added by superposition.'},
 asks:'Cp',
 givens:[['D0', '300-mg dose', 'R = 300 ÷ 2 = 150 mg/hr'], ['infusion time', 'over a period of 2 hours', 't = 2 hr in (1 − e^(−kt))'], ['second start', 'Six hours after the start of the first infusion', 'the second runs 6 to 8 hr'], ['k', '0.15 hr⁻¹', 'in each exponent'], ['VD', '15 L', 'Cl = 0.15 × 15 = 2.25 L/hr']],
 check:{t:'The second infusion alone gives 17.28 mg/L at its end, and the first can add at most another 17.28, so the level lies between 17.28 and 2 × 17.28 mg/L.', lo:17.28, hi:34.56},
 teach:[
  {h:'Two infusions, added', list:[
   'Draw the time line: start and end of each infusion and the time asked for.',
   'Each infusion rises to {{frac:R|Cl}}(1 − e^(−kt)) at its own end and then declines as C·e^(−kt), with t measured from that end.',
   'At any time, the concentration is the sum of what each infusion contributes.']}],
 quote:'the concentrations from each administration of the dose will be additive over time, OK?',
 audit:'Her Example 4 (k 0.15 hr-1, VD 15 L; keyed 17.28 mg/L at the end of the first infusion and 13.33 mg/L 4 hours after the second, 28 Sep) asked at the end of the second infusion; every number is hers. Recomputed: 17.2788 x (1 + e^(-0.9)) = 24.304 mg/L.',
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf slides 23 to 25, Example 4, end of the second infusion asked'},

/* ---------------- Module 6: altering the dose, select all ---------------- */
{id:'x3-b-dosesata', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09', multi:true,
 topic:'multoral', sub:'oparam', concept:'increase-dose-effects', skill:'apply', source:'both', dupOf:'m6b-c14',
 stem:'Which of the following would be expected following an increase in the dose with no change to the dosing interval? (Select all that apply)',
 options:[
  {t:'decreased MTC',
   why:'Picking this treats the minimum toxic concentration as part of the regimen. The MTC belongs to the drug and the patient; a change in dose moves the concentrations, not the MTC.'},
  {t:'increased fluctuations between peak to trough concentrations', correct:true,
   why:'A larger dose raises the peak and the trough in the same proportion, so the gap between them, which is C0 for a bolus, grows with the dose.'},
  {t:'increased patient compliance',
   why:'Picking this ties compliance to the dose. The patient takes the same number of doses a day, so compliance usually does not change; it is a longer interval, fewer doses, that increases compliance.'},
  {t:'increased steady-state concentrations', correct:true,
   why:'With the interval fixed, a larger dose puts more drug in per interval, so Cmax∞, Cmin∞ and Cavg∞ all rise in proportion to the dose.'},
  {t:'decreased steady-state concentrations',
   why:'Picking this reverses the direction. Steady-state concentrations fall when the dose is decreased or the interval lengthened, not when the dose is increased.'}],
 teach:[
  {h:'Changing one part of the regimen at a time', table:{head:['', 'Dose increased', 'Interval increased', 'Interval decreased'], rows:[
   ['Steady-state concentrations', 'increase', 'decrease', 'increase'],
   ['Peak-to-trough fluctuation', 'increase', 'increase', 'decrease'],
   ['Patient compliance', 'usually no change', 'increase', 'decrease']]}},
  {t:'Dose and dosing interval are the two parameters a regimen can change; clearance, half-life and volume of distribution belong to the drug and the patient.'}],
 quote:'Increasing dose • increase steady-state concentrations • increase fluctuations between peak to trough (maximum & minimum) concentrations • usually no change in patient compliance',
 audit:'Options from her slide 14 "Altering Dose", built the way her Exam 2 In-Class Review item 9 is built from slide 18 "Altering Dosing Interval" (with MTC as a distractor); select-all as in her item 6. Written for this review.',
 cite:'6a---Multiple-Oral-Doses.pdf slide 14 "Altering Dose"; Exam 2 In-Class Review (handed out 7 Oct 2026), questions 6 and 9 format'},

/* ---------------- Module 6: altering the interval, select all ---------------- */
{id:'x3-b-intsata', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09', multi:true,
 topic:'multoral', sub:'oparam', concept:'increase-interval-effects', skill:'apply', source:'both', dupOf:'m6b-c15',
 stem:'Which of the following would be expected following an increase in the dosing interval with no change to the dose? (Select all that apply)',
 options:[
  {t:'decreased MTC',
   why:'Picking this treats the minimum toxic concentration as part of the regimen. The MTC belongs to the drug and the patient; the interval moves the concentrations, not the MTC.'},
  {t:'increased fluctuations between peak to trough concentrations', correct:true,
   why:'A longer interval gives the level more time to fall before the next dose, so the trough sits further below the peak and the fluctuation increases.'},
  {t:'increased patient compliance', correct:true,
   why:'Fewer doses a day are easier for a patient to take as prescribed, so a longer interval increases compliance.'},
  {t:'decreased steady-state concentrations', correct:true,
   why:'The same dose given less often puts less drug in per hour, so Cmax∞, Cmin∞ and Cavg∞ all decrease.'},
  {t:'increased steady-state concentrations',
   why:'Picking this reverses the direction. Steady-state concentrations increase when the interval is shortened, the best option in a regimen for raising them, not when it is lengthened.'}],
 teach:[
  {h:'Changing one part of the regimen at a time', table:{head:['', 'Dose increased', 'Interval increased', 'Interval decreased'], rows:[
   ['Steady-state concentrations', 'increase', 'decrease', 'increase'],
   ['Peak-to-trough fluctuation', 'increase', 'increase', 'decrease'],
   ['Patient compliance', 'usually no change', 'increase', 'decrease']]}}],
 quote:'Increasing dosing interval • decrease steady-state concentrations • increase fluctuations between peak to trough concentrations • increase patient compliance',
 audit:'Her Exam 2 In-Class Review item 9 (decrease in the dosing interval, single answer) reversed in direction and set as select-all, options from her slide 18 "Altering Dosing Interval". Written for this review.',
 cite:'6a---Multiple-Oral-Doses.pdf slide 18 "Altering Dosing Interval"; Exam 2 In-Class Review (handed out 7 Oct 2026), question 9 format'},

/* ---------------- Module 6: what a regimen can change, select all ---------------- */
{id:'x3-b-adjsata', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09', multi:true,
 topic:'multoral', sub:'oparam', concept:'regimen-parameters', skill:'recall', source:'both', dupOf:'m6b-c13',
 stem:'Which of the following can be adjusted in developing a dosage regimen? (Select all that apply)',
 options:[
  {t:'dose size', correct:true,
   why:'The size of each dose is one of the two parameters a regimen sets; changing it with the interval fixed raises or lowers the steady-state concentrations.'},
  {t:'clearance',
   why:'Picking this treats a property of the drug in the patient as part of the regimen. Clearance is constant for a first-order drug; a regimen is designed around it, not by changing it.'},
  {t:'dosing interval', correct:true,
   why:'How often the dose is given is the second parameter a regimen sets; a shorter interval raises the steady-state concentrations and narrows the fluctuation.'},
  {t:'elimination half-life',
   why:'Picking this treats the half-life as a dial. The half-life is set by clearance and volume of distribution, t½ = {{frac:0.693 × VD|ClT}}, neither of which the regimen changes.'},
  {t:'volume of distribution',
   why:'Picking this treats the volume of distribution as part of the regimen. VD belongs to the drug in the patient and is the same whatever dose or interval is chosen.'}],
 teach:[
  {h:'What a regimen can change', list:[
   'Two parameters: the dose size and the dosing interval.',
   'Clearance, half-life and volume of distribution belong to the drug in the patient; the regimen is designed around them.',
   'Dose up, interval fixed: concentrations and fluctuation increase. Interval down, dose fixed: concentrations increase and fluctuation decreases.']}],
 quote:'So the only things that we can change. Are the dose, so the, the size of the dose, how much drug we give, and the dosing intervals. OK. We don\'t change clearance, we don\'t change half-life, we don\'t change volume and distribution.',
 audit:'Her slide 11 "Multiple-Dosage Regimens" (two parameters) and her 28 Sep and 5 Oct statements; select-all as in her Exam 2 review item 6. Written for this review.',
 cite:'6a---Multiple-Oral-Doses.pdf slide 11 "Multiple-Dosage Regimens"; 09.28 lecture'}

];
