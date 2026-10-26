/* ==========================================================================
   EXAM 3 ADDITIONS — Modules 7a (module 7), 7b (module 9) and 8
   ==========================================================================
   Each tests a trap or phrasing of hers that the bank did not yet ask her
   way. Stems follow her own items (Canvas Quiz 5, her PollEv items, the Exam 2
   In-Class Review select-all format, her slide Examples) with the numbers
   changed where `audit` says so. Every numeric key is recomputed at full
   precision.
   ========================================================================== */
const Q_NEW_C = [

/* ---------------- Module 8: KM against Cp, the Quiz 5 question 5 trap ---------------- */
{id:'x3-c-01', prof:'Mosley', tier:'new', exam:3, module:8, lecture:'L12',
 topic:'nonlin', sub:'kmcp', concept:'nl-high-conc', skill:'apply', source:'both', dupOf:'nl-c08',
 stem:'Which of the following is true for a medication that displays nonlinear pharmacokinetics?',
 options:[
  {t:'At high concentrations of drug in the plasma relative to Vmax, the elimination rate is independent of concentration.',
   why:'Picking this compares the plasma level with Vmax. Vmax is a rate, an amount per time such as mg/day, so a concentration cannot be high or low relative to it. The second half is right for a level far above KM, where the rate equals Vmax.'},
  {t:'At high concentrations of drug in the plasma relative to KM, the elimination rate depends on the concentration.',
   why:'Picking this carries the low-concentration behaviour to the high end. Far above KM, KM drops out of KM + Cp, the concentrations cancel and the rate equals Vmax, a constant. A rate that depends on concentration belongs to levels far below KM.'},
  {t:'At high concentrations of drug in the plasma relative to KM, the elimination rate is independent of concentration.', correct:true,
   why:'KM and Cp are both concentrations, so they are the pair compared. With Cp much greater than KM, {{frac:Vmax × Cp|KM + Cp}} reduces to Vmax, a constant: the rate no longer follows the level, which is zero-order behaviour.'},
  {t:'At high concentrations of drug in the plasma relative to Vmax, the elimination rate depends on concentration.',
   why:'Picking this pairs the wrong parameter with the wrong order. Cp is compared with KM, not with Vmax, which is a rate; and far above KM the rate is fixed at Vmax, so it does not depend on concentration.'}],
 teach:[
  {h:'KM against Cp', list:[
   'Rate of elimination = {{frac:Vmax × Cp|KM + Cp}} (Michaelis-Menten kinetics).',
   'KM and Cp are both concentrations (mg/L), so a level is low or high only relative to KM. Vmax is a rate (mg/day).',
   'Cp much less than KM: the rate is {{frac:Vmax|KM}} × Cp and depends on the concentration: first order.',
   'Cp much greater than KM: the rate is Vmax and is independent of concentration: zero order.']}],
 quote:'So, nutshell, low concentrations of drug in the plasma with respect to KM because remember both of these are gonna be in concentration terms, so we can compare these two, even though they\'re not the same thing',
 audit:'Written for this review. Options built as her Canvas Quiz 5 question 5 builds them (relative to KM or Vmax, depends on or independent of concentration), at the high-concentration end. Key: slide 8 and transcript 10-14 ("now our KM becomes negligible ... DCDT ... Is equal to V max"); 10-19 after Quiz 5: "KM and concentration."',
 cite:'8 - Nonlinear PK.pdf, slide 8 "Saturable-Enzymatic Elimination Processes"; Canvas Quiz 5 (Modules 7b and 8), question 5; transcript 10-14'},

{id:'x3-c-02', prof:'Mosley', tier:'new', exam:3, module:8, lecture:'L12',
 topic:'nonlin', sub:'kmcp', concept:'nl-order-by-conc', skill:'recall', source:'both',
 stem:'For a drug that displays Michaelis-Menten (saturation) kinetics, which comparison decides whether the elimination rate depends on the concentration (first order) or is independent of it (zero order)?',
 options:[
  {t:'Cp compared with KM', correct:true,
   why:'KM, the Michaelis constant, carries units of concentration, as Cp does, so the two can be set against each other. Far below KM the rate follows Cp, first order; far above KM the rate is Vmax whatever Cp is, zero order.'},
  {t:'Cp compared with Vmax',
   why:'Picking this sets a level against a rate. Vmax is the maximum elimination rate, in mg/day or concentration per time; a plasma level in mg/L cannot be larger or smaller than a rate. The "per time" in its units is what separates Vmax from KM.'},
  {t:'The daily dose compared with KM',
   why:'Picking this sets a dose rate, in mg/day, against a concentration, in mg/L. A dose counts as "low" only when the level it produces is far below KM; the order is read from that level, not from the dose itself.'},
  {t:'Vmax compared with KM',
   why:'Picking this compares the two constants of the enzyme system. Both are fixed for a given drug in a given patient, so their ratio cannot switch elimination from first order to zero order as the level changes; only Cp moves.'}],
 teach:[
  {h:'What decides the order', list:[
   'Rate of elimination = {{frac:Vmax × Cp|KM + Cp}}.',
   'KM (mg/L) and Cp (mg/L) share units, so Cp is compared with KM. Vmax (mg/day) is a rate and is not compared with a level.',
   'Low concentrations relative to KM look first order; high concentrations relative to KM look zero order.',
   'A "low dose" is low only because the Cp it gives is far below KM.']}],
 quote:'So for those of you that missed the question that we just talked about before the quiz, I know who you are. Right, we just talked about it, right? You know what I\'m talking about. KM and concentration.',
 audit:'Written for this review. Before Quiz 5 (10-19) the class rehearsed "low dose first order and high dose zero order"; after it she named the missed point "KM and concentration". Slide 2 objective: "Discuss the relationship between KM and Cp". Slide 8 prints Vmax in units of concentration/time and KM in units of concentration.',
 cite:'8 - Nonlinear PK.pdf, slides 2 "Objectives" and 8 "Saturable-Enzymatic Elimination Processes"; transcripts 10-14 and 10-19'},

/* ---------------- Module 8: a larger dose, in her select-all format ---------------- */
{id:'x3-c-03', prof:'Mosley', tier:'new', exam:3, module:8, lecture:'L12', multi:true,
 topic:'nonlin', sub:'kmcp', concept:'nl-thalf-cl-trend', skill:'apply', source:'both',
 stem:'Which of the following would you expect with an increase in the daily dose of a drug that displays nonlinear pharmacokinetics? (Select all that apply)',
 options:[
  {t:'Increased half-life', correct:true,
   why:'t½ = VD({{frac:0.693|Vmax}})(KM + Cp). A larger daily dose gives a higher steady-state level, so KM + Cp grows and the half-life lengthens; VD, Vmax and KM do not move.'},
  {t:'Decreased half-life',
   why:'Picking this runs the half-life line backward. Cp is added to KM in the numerator of the half-life line, so a higher level gives a longer half-life, not a shorter one.'},
  {t:'Increased clearance',
   why:'Picking this carries the dose into the clearance. ClT = {{frac:Vmax|KM + Cp}} has Cp in the denominator, so a higher level gives a lower clearance. In linear kinetics clearance does not change with dose at all.'},
  {t:'Decreased clearance', correct:true,
   why:'ClT = {{frac:Vmax|KM + Cp}}. A higher dose gives a higher Cp, a larger denominator and a lower clearance; this is why the level rises more than in proportion to the dose.'},
  {t:'Increased Vmax',
   why:'Picking this treats Vmax as a property of the dose. Vmax is the maximum elimination rate of the enzyme system, a constant for a given drug in a given patient; it does not change with the dose.'},
  {t:'Decreased Vmax',
   why:'Picking this reads saturation as a loss of capacity. The enzyme system still has the same Vmax; what changes with the dose is the level, and with it the half-life and the clearance.'}],
 teach:[
  {h:'A larger dose of a nonlinear drug', list:[
   'Vmax and KM are constants for a given drug in a given patient; the dose does not change them.',
   'A higher daily dose gives a higher Cp, and both lines below contain Cp.',
   't½ = VD({{frac:0.693|Vmax}})(KM + Cp): rises as Cp rises.',
   'ClT = {{frac:Vmax|KM + Cp}}: falls as Cp rises.',
   'In linear kinetics neither changes with the dose; in nonlinear kinetics both do.']}],
 quote:'So, concentration, as concentration increases, what\'s gonna happen to our clearance? It\'s gonna decrease.',
 audit:'Written for this review in the format of her Exam 2 In-Class Review question 6 (six paired increase/decrease options, select all). Keys from slides 17 and 18, Nonlinear-Solutions-2.pdf question 3 and Canvas Quiz 5 question 6 ("Half-life changes as dose is increased").',
 cite:'8 - Nonlinear PK.pdf, slides 6 "Saturation Kinetics", 17 "Dependence of Elimination Half-Life on Dose" and 18 "Dependence of Clearance on Dose"; Exam 2 In-Class Review, question 6 (format); transcript 10-14'},

/* ---------------- Module 8: solve the dose-rate line for KM ---------------- */
{id:'x3-c-04', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:8, lecture:'L12',
 topic:'nonlin', sub:'kmvmax', concept:'nl-km-direct', skill:'nonlin', source:'both',
 stem:'A 78-kg, 28 year old male is receiving phenytoin for the treatment of seizures. While taking a daily oral dose of 400 mg, his steady-state plasma concentration was 22 mg/L. His Vmax is 571 mg/day. Assume 100% bioavailability. What is his KM?',
 units:'mg/L', answer:9.4, tol:0.1,
 steps:[
  {k:'setup', t:'R = {{frac:Vmax × Css|KM + Css}}, so R × KM + R × Css = Vmax × Css and KM = {{frac:Css(Vmax − R)|R}}',
   why:'At steady state the daily dose rate equals the rate of elimination. Vmax is given, so the dose-rate line has one unknown, KM; multiplying out and moving R × Css across leaves R × KM = Css(Vmax − R).'},
  {k:'algebra', t:'KM = {{frac:(22 mg/L)(571 − 400) mg/day|400 mg/day}} = {{frac:22 × 171|400}} = 9.405 mg/L',
   why:'mg/day cancels top and bottom and leaves mg/L, a concentration, the unit KM must have. Vmax − R = 171 mg/day is how far the dose sits below the maximum elimination rate.'},
  {k:'round', t:'KM = 9.4 mg/L',
   why:'9.405 to one decimal place. The same patient on 300 mg/day at 10.4 mg/L gives 10.4 × 271 ÷ 300 = 9.39 mg/L, so both doses agree on 9.4 mg/L.'}],
 setup:{eq:'nl-rate', pre:[], why:'"steady-state plasma concentration", one daily dose and Vmax given, KM asked: the nonlinear dose-rate line R = Vmax × Css over (KM + Css), rearranged for KM.'},
 asks:'Km',
 givens:[['R', '400 mg', 'the daily dose rate, mg/day'], ['Css', '22 mg/L', 'the steady state that dose produced'], ['Vmax', '571 mg/day', 'the maximum elimination rate'], ['weight', '78-kg', 'not needed for KM']],
 check:{t:'Vmax − R is 171 mg/day, a little under half of the 400 mg/day dose, so KM is a little under half of 22 mg/L: 9.4 mg/L.', lo:0, hi:22},
 teach:[
  {h:'Solving the dose-rate line for any piece', list:[
   'R = {{frac:Vmax × Css|KM + Css}} at steady state.',
   'For KM: R × KM + R × Css = Vmax × Css, so KM = {{frac:Css(Vmax − R)|R}}.',
   'For Vmax: Vmax = {{frac:R(KM + Css)|Css}}. For Css: Css = {{frac:R × KM|Vmax − R}}.',
   'KM comes out in mg/L, the units of Css; Vmax and R share mg/day.']}],
 quote:'All right, so here\'s our equation, and brush up on your algebra skills because we\'re gonna take this equation and rearrange it and solve for every piece of this.',
 audit:'Written for this review from Nonlinear-Solutions-3.pdf: her Vmax 571 mg/day and the 400 mg/day dose at 22 mg/L. KM = 22 × 171/400 = 9.405; her direct-method KM is 9.377, written 9.4; the 300 mg/day pair gives 10.4 × 271/300 = 9.395.',
 cite:'Nonlinear-Solutions-3.pdf (patient, doses, levels and her Vmax of 571 mg/day); 8 - Nonlinear PK.pdf, slide 11 "In Vivo Determination of KM and Vmax"; transcript 10-14'},

/* ---------------- Module 8: Vmax per kilogram ---------------- */
{id:'x3-c-05', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:8, lecture:'L12',
 topic:'nonlin', sub:'dose', concept:'nl-dose-rate', skill:'nonlin', source:'both',
 stem:'Given that KM = 6 mg/L and Vmax = 9 mg/kg/day, calculate the required daily dose rate to achieve an average plasma concentration of 15 mg/L in a 70 kg patient.',
 units:'mg/day', answer:450, tol:4.5,
 steps:[
  {k:'setup', t:'R = {{frac:Vmax × Css|KM + Css}}',
   why:'At steady state the dose rate equals the rate of saturable elimination; the line needs only Vmax, KM and the target level. The 15 mg/L average plasma concentration is the Css.'},
  {k:'algebra', t:'R = {{frac:(9 mg/kg/day)(15 mg/L)|(6 + 15) mg/L}} = {{frac:135|21}} = 6.43 mg/kg/day',
   why:'mg/L cancels top and bottom, so R keeps the units of Vmax. Vmax is per kilogram, so 6.43 mg/kg/day is a rate per kilogram and not yet a dose for this patient.'},
  {k:'unit', t:'R = 6.4286 mg/kg/day × 70 kg = 450.0 mg/day',
   why:'The weight turns the per-kilogram rate into an amount per day that the patient can be told to take; the kilograms cancel.'},
  {k:'round', t:'R = 450 mg/day',
   why:'Stopping at 6.43 mg/kg/day gives a rate for no particular patient, and 450 mg without "per day" gives no interval; the answer is a dose rate, 450 mg/day.'}],
 setup:{eq:'nl-rate', pre:[], why:'"KM", "Vmax" in mg/kg/day and "daily dose rate to achieve an average plasma concentration": the nonlinear dose-rate line, then the per-kilogram rate times the 70 kg weight.'},
 asks:'R',
 givens:[['KM', '6 mg/L', 'added to Css below the line'], ['Vmax', '9 mg/kg/day', 'makes R per kilogram'], ['Css', '15 mg/L', 'the target average level'], ['weight', '70 kg', 'turns mg/kg/day into mg/day']],
 check:{t:'Css is 15 of the 21 mg/L in KM + Css, so R is that share of 9 mg/kg/day, 6.43, below Vmax; times 70 kg it is 450 mg/day.', lo:0, hi:630},
 teach:[
  {h:'The nonlinear dose-rate line', list:[
   'R = {{frac:Vmax × Css|KM + Css}}: at steady state the dose rate equals the rate of elimination.',
   'R carries the units of Vmax: a Vmax in mg/kg/day gives R in mg/kg/day, which is then multiplied by the weight.',
   'Report a dose rate with its interval, such as mg/day, not an amount alone.']}],
 quote:'And if I\'m your patient, please don\'t tell me 6.62 mg per kilogram per day. Tell me how many, tell me what I need.',
 audit:'Her slide 12 Example with the numbers changed: KM 5 → 6 mg/L, Vmax 8 → 9 mg/kg/day, 24 → 15 mg/L, 65 → 70 kg. 9 × 15/21 = 6.428571 mg/kg/day; × 70 = 450.00 mg/day.',
 cite:'8 - Nonlinear PK.pdf, slide 12 "Example" (her wording, numbers changed); transcript 10-14'},

/* ---------------- Module 8: Quiz 5 question 7, numbers changed ---------------- */
{id:'x3-c-06', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:8, lecture:'L12',
 topic:'nonlin', sub:'dose', concept:'nl-dose-rate', skill:'nonlin', source:'both',
 stem:'What daily dose rate of a non-linear drug would provide a steady-state concentration of 15 mg/L? In this patient, the KM is 7.2 mg/L and the Vmax is 600 mg/day. Round to the nearest five.',
 units:'mg/day', answer:405, tol:5,
 steps:[
  {k:'setup', t:'R = {{frac:Vmax × Css|KM + Css}}',
   why:'KM, Vmax and the target Css are given, so the nonlinear dose-rate line answers directly. Vmax is already in mg/day, so no weight is needed.'},
  {k:'algebra', t:'R = {{frac:(600 mg/day)(15 mg/L)|(7.2 + 15) mg/L}} = {{frac:9000|22.2}} = 405.4 mg/day',
   why:'mg/L cancels top and bottom and leaves mg/day, the units of Vmax. Css appears on top and again, added to KM, underneath, which keeps R below Vmax for any target.'},
  {k:'round', t:'R = 405 mg/day',
   why:'405.4 to the nearest five is 405; to the nearest ten it would be 410. Leaving KM out of the bottom gives Vmax itself, 600, far too high.'}],
 setup:{eq:'nl-rate', pre:[], why:'"daily dose rate" for "a steady-state concentration of 15 mg/L" with KM and Vmax given: the nonlinear dose-rate line.'},
 asks:'R',
 givens:[['Css', '15 mg/L', 'the target level, on top and below'], ['KM', '7.2 mg/L', 'added to Css below the line'], ['Vmax', '600 mg/day', 'sets the units of R'], ['rounding', 'nearest five', '405.4 becomes 405']],
 check:{t:'Css is 15 of the 22.2 mg/L in KM + Css, about two-thirds, so R is about two-thirds of 600 mg/day: 405 mg/day, below Vmax.', lo:0, hi:600},
 teach:[
  {h:'The nonlinear dose-rate line', list:[
   'R = {{frac:Vmax × Css|KM + Css}}: at steady state the dose rate equals the rate of elimination.',
   'R carries the units of Vmax, here mg/day.',
   'Round as the stem asks: to the nearest five, 405.4 is 405; to the nearest ten, 410.']}],
 quote:'Don\'t panic if I ask you to round to the nearest 10, right?',
 audit:'Canvas Quiz 5 question 7 (itself her In-Class Practice question 1 renumbered) with KM 7.9 → 7.2 mg/L and Vmax 625 → 600 mg/day; the nearest-five instruction kept. 600 × 15/22.2 = 405.405 mg/day.',
 cite:'Canvas Quiz 5 (Modules 7b and 8), question 7 (her wording, numbers changed); In-Class Practice, Nonlinear PK, question 1; 8 - Nonlinear PK.pdf, slide 11 "In Vivo Determination of KM and Vmax"'},

/* ---------------- Module 7b: her 19 Oct poll, dose doubled again ---------------- */
{id:'x3-c-07', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'both',
 stem:'What is the duration of action for a 2 g IV bolus dose with a VD = 12.5 L, t½ = 4 hr and MEC = 20 mg/L?',
 options:[
  {t:'8 hours',
   why:'Picking this keeps the duration of a 1 g dose. C0 = {{frac:2000 mg|12.5 L}} = 160 mg/L, twice the 80 mg/L of 1 g, so the level needs one more half-life, 4 hours, to fall to 20 mg/L.'},
  {t:'12 hours', correct:true,
   why:'C0 = {{frac:2000 mg|12.5 L}} = 160 mg/L, eight times the MEC. Eight is 2 × 2 × 2, so the level falls from 160 to 80 to 40 to 20 mg/L in three half-lives of 4 hours: 12 hours.'},
  {t:'16 hours',
   why:'Picking this doubles the 8-hour duration of a 1 g dose along with the dose. The dose sits inside a logarithm, so doubling it adds one half-life, 4 hours, to the 8 hours; it does not double the duration.'},
  {t:'None of the above',
   why:'Picking this usually follows leaving the dose in grams: 2 g has to be 2000 mg before it is divided by 12.5 L. Done in mg, the duration is 12 hours, which is listed.'}],
 steps:[
  {k:'unit', t:'2 g = 2000 mg; C0 = {{frac:2000 mg|12.5 L}} = 160 mg/L; k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹',
   why:'The concentration just after the bolus is the dose over the volume, in the same units as the MEC. k comes from the half-life.'},
  {k:'algebra', t:'teff = {{frac:ln C0 − ln MEC|k}} = {{frac:ln(160 ÷ 20)|0.17325}} = {{frac:2.0794|0.17325}} = 12.00 hr',
   why:'C = C0e^(−kt) solved for the time the level reaches the MEC. 160 ÷ 20 = 8, three doublings, so the duration is three half-lives.'},
  {k:'round', t:'teff = 12 hours',
   why:'Three half-lives of 4 hours. With 500 mg, 1 g and 2 g the durations are 4, 8 and 12 hours: each doubling of the dose adds 4 hours.'}],
 teach:[
  {h:'Doubling the dose', list:[
   'teff = {{frac:ln C0 − ln MEC|k}}, with C0 = {{frac:D0|VD}}.',
   'Doubling the dose doubles C0 and adds ln 2 to the top: one half-life more, whatever the starting duration.',
   'With VD 12.5 L, t½ 4 hr and MEC 20 mg/L: 500 mg lasts 4 hours, 1 g lasts 8 hours, 2 g lasts 12 hours.',
   'From 500 mg to 1 g the duration happens to double, because 4 hours is one half-life; from 1 g to 2 g it does not.']}],
 quote:'And if we were to give 500 mg instead of 1 g, what would the duration of action be? 4 hours, right?',
 audit:'Her final-review poll (slide 23: 1 g, 8 hours) and her spoken follow-up (500 mg, 4 hours), with the dose doubled once more to 2 g. ln(8)/0.17325 = 12.0025 hr; 1.44 × 4 × ln 8 = 11.98 hr.',
 cite:'Final-Exam-Review-10.19.pdf slide 23 (PollEv, dose changed); 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slide 9 "Effect of Dose and Elimination Half-life on Duration of Activity"'},

/* ---------------- Module 7b: doubling the IV bolus, her select-all format ---------------- */
{id:'x3-c-08', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', multi:true,
 topic:'pkpd', sub:'teff', concept:'dose-double-teff', skill:'apply', source:'both',
 stem:'Which of the following would you expect with a 2-fold increase in the IV bolus dose of a drug that displays linear, first-order pharmacokinetics? (Select all that apply)',
 options:[
  {t:'The AUC doubles', correct:true,
   why:'AUC = {{frac:D0|Cl}} for an IV bolus, and in linear kinetics clearance does not change with the dose, so twice the dose gives twice the area under the curve.'},
  {t:'The initial plasma concentration doubles', correct:true,
   why:'C0 = {{frac:D0|VD}}. The volume of distribution does not change with the dose, so twice the dose gives twice the concentration just after the bolus.'},
  {t:'The duration of action doubles',
   why:'Picking this treats the duration as proportional to the dose. In teff = 1.44 t½ ln({{frac:D0|VD × MEC}}) the dose sits inside the logarithm, so doubling it adds one half-life instead.'},
  {t:'The duration of action increases by one half-life', correct:true,
   why:'Doubling C0 adds ln 2 to ln C0, and ln 2 divided by k is one half-life: the level needs exactly one half-life to fall from 2C0 back to C0, then follows the old curve.'},
  {t:'The half-life doubles',
   why:'Picking this moves the half-life with the dose. In linear, first-order kinetics t½ = {{frac:0.693|k}} and k does not depend on the dose; a half-life that changes with dose marks a nonlinear drug.'},
  {t:'The clearance doubles',
   why:'Picking this moves clearance with the dose. Clearance belongs to the drug and the patient; doubling the dose doubles the AUC instead, so that Cl = {{frac:D0|AUC}} stays the same.'}],
 teach:[
  {h:'Doubling an IV bolus dose, linear kinetics', list:[
   'Doubles: C0 = {{frac:D0|VD}} and AUC = {{frac:D0|Cl}}, because VD and Cl do not change with the dose.',
   'Unchanged: k, t½, VD and Cl.',
   'Duration of action: one half-life longer, not doubled, because the dose sits inside the logarithm in teff = 1.44 t½ ln({{frac:D0|VD × MEC}}).']}],
 quote:'Because we expect for our linear pharmacokinetics, a proportional increase, decrease, or whatever, change. In the AUC as well as the concentration as we change the dose.',
 audit:'Written for this review in the format of her Exam 2 In-Class Review question 6 (select all, increase in dose). Keys: PollEv on slide 12 (doubling does not double duration: False), Quiz 5 question 2 (increased by one half-life), transcript 09-30 (AUC and concentration proportional to dose), IV-Bolus-Practice-4 (doubled dose: no change in half-life or clearance, initial concentration doubled).',
 cite:'7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slides 9 "Effect of Dose and Elimination Half-life on Duration of Activity" and 12 (PollEv); Exam 2 In-Class Review, question 6 (format); 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability" (Div = Cl × AUCiv); transcript 09-30'},

/* ---------------- Module 7b: why 500 mg to 1 g doubled the duration ---------------- */
{id:'x3-c-09', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'dose-double-teff', skill:'apply', source:'both',
 stem:'A drug has a VD of 12.5 L, a t½ of 4 hr and an MEC of 20 mg/L. A 500 mg IV bolus dose gives a duration of action of 4 hours, and a 1 g IV bolus dose gives 8 hours. Which of the following explains why doubling the dose doubled the duration of action here?',
 options:[
  {t:'The 4-hour duration equals one half-life', correct:true,
   why:'Doubling the dose always adds one half-life, here 4 hours. Starting from a duration of exactly one half-life, with C0 = 40 mg/L twice the MEC, adding one half-life doubles it; from any other starting duration it does not.'},
  {t:'Duration of action is proportional to the dose',
   why:'Picking this generalises from one pair of doses. With 2 g the duration is 12 hours, not 16: each doubling adds one half-life, because the dose sits inside a logarithm.'},
  {t:'The half-life doubles when the dose doubles',
   why:'Picking this moves the half-life with the dose. For linear, first-order kinetics t½ = {{frac:0.693|k}} stays 4 hours at every dose; it is the starting level, C0, that doubles.'},
  {t:'The MEC is halved when the dose doubles',
   why:'Picking this moves the threshold. The MEC is a property of the drug, 20 mg/L at any dose; a larger dose raises C0 further above it, and does not lower the MEC.'}],
 teach:[
  {h:'One half-life per doubling', list:[
   'teff = {{frac:ln C0 − ln MEC|k}}: doubling the dose adds {{frac:ln 2|k}}, one half-life.',
   'The duration doubles only when it started at one half-life, that is when C0 is twice the MEC.',
   'So doubling the IV bolus dose does not, in general, give a 2-fold increase in the duration of activity.']}],
 quote:'Everybody know what happens if we double the dose? You get one half-life.',
 audit:'Written for this review. Her 12 Oct PollEv keys "Doubling the IV bolus dose ... results in a 2-fold increase in the duration of activity" False; her 19 Oct poll and follow-up give 8 hours at 1 g and 4 hours at 500 mg, a doubling. This item separates the two. C0 at 500 mg = 40 mg/L; ln 2/0.17325 = 4.0008 hr.',
 cite:'Final-Exam-Review-10.19.pdf slide 23 (PollEv and follow-up); 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slide 12 (PollEv, keyed False); transcript 10-19'},

/* ---------------- Module 7b: four times the dose, from the duration alone ---------------- */
{id:'x3-c-10', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'slide',
 stem:'A single 1500 mg IV bolus dose of an antibiotic that follows a one-compartment open model and first-order elimination gives a duration of action of 11.56 hours. The elimination half-life is 3.6 hours. What is the expected duration of action if the dose were increased by a factor of four, to 6000 mg?',
 units:'hr', answer:18.76, tol:0.1,
 steps:[
  {k:'setup', t:'teff = 1.44 t½ ln({{frac:D0|VD × MEC}}); four times D0 adds 1.44 t½ ln 4 to teff',
   why:'VD, the MEC and t½ do not change with the dose, so only the logarithm changes, by ln 4. A factor of four is two doublings, and each doubling adds one half-life.'},
  {k:'algebra', t:'Added duration = 2 × 3.6 hr = 7.2 hr',
   why:'ln 4 is twice ln 2, and ln 2 divided by k is one half-life, so four times the dose adds two half-lives of 3.6 hours.'},
  {k:'algebra', t:'teff = 11.56 hr + 7.2 hr = 18.76 hr',
   why:'The new duration is the old one plus the two added half-lives; the volume and the MEC are not needed for the change.'},
  {k:'round', t:'teff = 18.76 hr',
   why:'Four times the dose gives 18.76 hours, far short of four times 11.56 hours.'}],
 setup:{eq:'pd-teff-half', pre:[], why:'"Duration of action" after a dose change, with the half-life and the first duration given: in the half-life form of the duration line only ln D0 changes, by ln 4 for four times the dose.'},
 asks:'t',
 givens:[['D0', '1500 mg', 'the starting dose'], ['teff', '11.56 hours', 'the starting duration'], ['t½', '3.6 hours', 'added once per doubling of the dose'], ['new D0', '6000 mg', 'four times 1500 mg: two doublings']],
 check:{t:'Two doublings add two half-lives, 7.2 hr, to 11.56 hr: 18.76 hr, far short of four times 11.56.', lo:11.56, hi:46.24},
 teach:[
  {h:'A dose change and the duration', list:[
   'teff = 1.44 t½ ln({{frac:D0|VD × MEC}}): the dose sits inside the logarithm.',
   'Each doubling of the dose adds one half-life; four times the dose adds two; half the dose removes one.',
   'VD and the MEC are not needed to find the change: the half-life is enough.']}],
 quote:'Increase of one half-life → 3.6 hr',
 audit:'Written for this review on PK-PD Practice 3 (20 mg/kg × 75 kg = 1500 mg, VD 22.5 L, MEC 7.2 mg/L, t½ 3.6 hr, teff 11.56 hr) with the factor-of-four part of PK-PD Practice 1 (change 10 hr = 2 t½). Full precision: ln(266.67/7.2) × 3.6/0.693 = 18.763 hr; 11.56 + 7.2 = 18.76.',
 cite:'PK-PD-Practice-3---Solutions.pdf (patient and duration) and PK-PD-Practice-1---Solutions.pdf, part b (dose increased by a factor of four); 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slide 9 "Effect of Dose and Elimination Half-life on Duration of Activity"'},

/* ---------------- Module 7b: a doubled half-life, as a calculation ---------------- */
{id:'x3-c-11', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'thalf-double-teff', skill:'pkpd', source:'slide',
 stem:'A drug with an elimination half-life of 3 hours, apparent volume of distribution of 25 L, and minimum effective concentration of 1.2 mcg/mL is administered as a single 250 mg IV bolus dose, giving a duration of action of 9.16 hours. In a patient with decreased renal function the elimination half-life of the drug is 6 hours, with the same apparent volume of distribution. What is the duration of action of the same dose in this patient?',
 units:'hr', answer:18.32, tol:0.05,
 steps:[
  {k:'setup', t:'teff = 1.44 t½ ln({{frac:D0|VD × Ceff}})',
   why:'One IV bolus, one compartment, first-order elimination, with the half-life given. The dose, VD and the MEC are unchanged, so only t½ changes, and it multiplies the whole line.'},
  {k:'unit', t:'Ceff = 1.2 mcg/mL = 1.2 mg/L; VD × Ceff = (25 L)(1.2 mg/L) = 30 mg',
   why:'1 mcg/mL equals 1 mg/L. VD × Ceff is the amount in the body when the level is at the MEC, so the ratio inside the logarithm has no units.'},
  {k:'algebra', t:'teff = 1.44 (6 hr) ln({{frac:250 mg|30 mg}}) = 8.64 hr × 2.1203 = 18.32 hr',
   why:'The same logarithm as at the normal half-life, ln 8.333, now multiplied by 1.44 × 6 hr instead of 1.44 × 3 hr.'},
  {k:'round', t:'teff = 18.32 hr, twice 9.16 hr',
   why:'Doubling the half-life doubles the duration, because t½ multiplies the whole line; doubling the dose would have added only one half-life. With k = 0.1155 hr⁻¹ the natural-log form gives 18.36 hr, the same answer.'}],
 setup:{eq:'pd-teff-half', pre:[], why:'"Duration of action" of a single IV bolus with the half-life, VD and MEC given: the half-life form of the duration line, with the longer half-life of decreased renal function.'},
 asks:'t',
 givens:[['t½', '6 hours', 'the prolonged half-life'], ['D0', '250 mg', 'unchanged'], ['VD', '25 L', 'unchanged'], ['MEC', '1.2 mcg/mL', 'equal to 1.2 mg/L, unchanged'], ['teff', '9.16 hours', 'the duration at the normal half-life']],
 check:{t:'Twice the half-life with the same dose, volume and MEC gives twice the duration: 2 × 9.16 = 18.32 hr.', lo:9.16},
 teach:[
  {h:'Half-life and duration', list:[
   'teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}): t½ multiplies the whole line, so teff is in direct proportion to t½.',
   'Decreased renal or hepatic function prolongs t½, retains drug in the body, lengthens the duration of activity and raises the possibility of toxicity.',
   'Doubling the dose adds one half-life; doubling the half-life doubles the duration.']}],
 quote:'This prolonged t1/2 will lead to retention of the drug in the body, also increasing the duration of activity of the drug as well as increasing the possibility of drug toxicity.',
 audit:'Her Quiz 5 question 1 asks only the direction; this sets it as a calculation on her In-Class Activity "PK-PD" problem 1 numbers (bank pd-ic1a, keyed 9.16 hr) with t½ 3 → 6 hr. 1.44 × 6 × ln(8.333) = 18.319; with k = 0.693/6, 18.357; tol 0.05 takes both.',
 cite:'In-Class Activity "PK-PD", problem 1 (7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slide 13), half-life changed; slide 10 "Effect of Elimination Half-life on Duration of Activity"; Canvas Quiz 5 (Modules 7b and 8), question 1'},

/* ---------------- Module 7b: Quiz 5 question 4 with pounds and mcg/mL ---------------- */
{id:'x3-c-12', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'dosefor', concept:'dose-for-teff', skill:'pkpd', source:'slide',
 stem:'What dose of a medication, that is to be administered as a single IV bolus injection, would provide a duration of action of 18 hours in a 154-lb patient? The drug displays linear, first-order pharmacokinetics, has an elimination half-life of 6 hours, apparent volume of distribution of 0.25 L/kg, and a minimum effective concentration of 4 mcg/mL.',
 units:'mg', answer:559.8, tol:5.6,
 steps:[
  {k:'unit', t:'154 lb ÷ 2.2 = 70 kg; VD = 0.25 L/kg × 70 kg = 17.5 L; Ceff = 4 mcg/mL = 4 mg/L',
   why:'The volume is per kilogram, so the weight in pounds is turned into kilograms first. 1 mcg/mL equals 1 mg/L, so the MEC goes in as 4 mg/L.'},
  {k:'setup', t:'Ceff = {{frac:D0|VD}} e^(−k teff), so D0 = Ceff × VD × e^(k teff), with k = {{frac:0.693|6 hr}} = 0.1155 hr⁻¹',
   why:'C = C0e^(−kt) with C0 = D0 over VD, written at the moment the level reaches the MEC, 18 hours after the dose, then solved for the dose. The exponent is positive.'},
  {k:'algebra', t:'D0 = (4 mg/L)(17.5 L) e^((0.1155)(18)) = 70 mg × e^2.079 = 70 mg × 7.996 = 559.8 mg',
   why:'mg/L × L leaves mg: 70 mg is the amount in the body when the level is at the MEC. k teff has no units, and the dose must be e^2.079 times that 70 mg.'},
  {k:'round', t:'D0 = 559.8 mg, about 560 mg',
   why:'18 hours is three half-lives of 6 hours, so the dose is 2 × 2 × 2 = 8 times the 70 mg at the MEC. Leaving the weight in pounds gives a volume of 38.5 L and more than twice this dose.'}],
 setup:{eq:'pd-dose-teff', pre:['thalf-first'], why:'"What dose ... would provide a duration of action of 18 hours": the dose line D0 = Ceff × VD × e^(k teff), with the volume scaled to 70 kg and k from the half-life.'},
 asks:'D0',
 givens:[['weight', '154-lb', 'divided by 2.2: 70 kg'], ['teff', '18 hours', 'the target duration'], ['t½', '6 hours', 'k = 0.1155 hr⁻¹'], ['VD', '0.25 L/kg', '17.5 L for 70 kg'], ['MEC', '4 mcg/mL', 'equal to 4 mg/L']],
 check:{t:'18 hours is three half-lives of 6 hours, so the dose is 8 times the 70 mg at the MEC: about 560 mg.', lo:70},
 teach:[
  {h:'The dose for a target duration', list:[
   'Ceff = {{frac:D0|VD}} e^(−k teff), rearranged: D0 = Ceff × VD × e^(k teff).',
   'The target time is in the exponent, so each extra half-life of duration doubles the dose.',
   'Weight in pounds is divided by 2.2 before a per-kilogram volume is used; 1 mcg/mL = 1 mg/L.']}],
 audit:'Her Quiz 5 question 4 wording with 75 kg → 154 lb and MEC 4 mg/L → 4 mcg/mL (her units in PK-PD Practice 2), t½ 5.8 → 6 hr, 20 → 18 hr; VD 0.25 L/kg kept. D0 = 4 × 17.5 × e^(0.1155 × 18) = 559.75 mg (560.00 with ln 2).',
 cite:'Canvas Quiz 5 (Modules 7b and 8), question 4 (her wording, numbers changed); PK-PD-Practice-2---Solutions.pdf (weight in pounds, MEC in mcg/mL); 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slide 8 (dose for a target duration)'},

/* ---------------- Module 7a: her factors slide, select all ---------------- */
{id:'x3-c-13', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10', multi:true,
 topic:'bioavail', sub:'factors', concept:'factors-list', skill:'recall', source:'both',
 stem:'Which of the following can influence the bioavailability of a drug? (Select all that apply)',
 options:[
  {t:'Food effects', correct:true,
   why:'Food effects are one of the factors influencing bioavailability, with the physicochemical properties of the drug and formulation, stability and pH effects, first-pass metabolism, prodrugs, drug–drug interactions, efflux transporters, age and disease state.'},
  {t:'Efflux transporters', correct:true,
   why:'Efflux transporters are on the same list of factors influencing bioavailability: the rate and extent to which the active ingredient is absorbed from the product and becomes available at the site of action.'},
  {t:'Drug–drug interactions', correct:true,
   why:'Drug–drug interactions are on the list of factors influencing bioavailability, with food effects and efflux transporters.'},
  {t:'The apparent volume of distribution',
   why:'Picking this takes a distribution parameter for a determinant of absorption. VD relates the amount in the body to the plasma level after the drug is in the circulation; it does not decide how much of a dose gets there.'},
  {t:'The dosing interval',
   why:'Picking this takes a regimen setting for a property of the product or the patient. The dosing interval changes steady-state levels, but the fraction of each dose that reaches the circulation stays the same.'}],
 teach:[
  {h:'Factors influencing bioavailability', list:[
   'Physicochemical properties of the drug and formulation; drug stability and pH effects; pre-systemic and first-pass metabolism; prodrugs.',
   'Food effects; drug–drug interactions; efflux transporters; age; disease state.',
   'Formulation factors and the first-pass effect are the reasons most often behind low bioavailability.',
   'The volume of distribution, the half-life and the dosing interval do not change F, the fraction of the dose that reaches the circulation.']}],
 quote:'we had a long list of factors that can affect bioavailability',
 audit:'Written for this review from her slide "Factors Influencing Bioavailability" (nine bullets); her 10-05 review of Exam 2 objectives named the list. m7-c09 tests one factor with a single answer.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slides "Factors Influencing Bioavailability" and "Summary"; transcript 10-05'}

];
