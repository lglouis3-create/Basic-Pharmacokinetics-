/* ==========================================================================
   HER GRADED CANVAS QUIZZES — Quiz 2 (Modules 2–3), Quiz 3 (Modules 4–5) and Quiz 4 (Modules 6–7a)
   ==========================================================================
   Sixteen items from Quizzes 2 and 3, plus ten from Quiz 4 (5 Oct 2026), each a screenshot of a graded Canvas question with the key
   marked, supplied by the student on 4 Oct 2026 (files Quiz2-Modules2-3-
   graded.pdf and Quiz3-Modules4-5-graded.pdf, kept with the decks). Each
   quiz was eight questions at 12.5 points: four word-only concept items and
   four numeric entries, each numeric entry carrying a rounding rule and a
   margin of error of 2% or 3%. Stems are hers, word for word, apart from a
   doubled "the" removed in Quiz 3, question 5. The keyed answer of every
   numeric item was recomputed from its own stem before it was written here,
   and the tolerance is her stated margin applied to her key.

   Concept items that restate a fact the bank already asks carry dupOf, so a
   paper never shows both wordings. STYLE.md holds the same sixteen items
   verbatim with the recomputations.
   ========================================================================== */
const Q_QUIZZES = [

/* ---------------------------- Quiz 2: Modules 2–3 ------------------------ */

{id:'cq2-1', prof:'Mosley', tier:'new', exam:1, module:2, lecture:'L02',
 topic:'bolus1', sub:'vd', concept:'vd-definition', skill:'recall', dupOf:'m2-vd-1',
 stem:'Which of the following best describes the volume of distribution?',
 options:[
  {t:'hypothetical volume of body fluid that would be required to dissolve the total amount of drug at the same concentration as that found in the blood', correct:true,
   why:'This is the definition on her slide, word for word. The volume is hypothetical because it is the dose divided by the plasma concentration, not a space that can be measured, which is why it can exceed total body water.'},
  {t:'estimate of the time course of drug absorption, distribution, metabolism, and elimination', correct:false,
   why:'That phrase describes pharmacokinetics as a whole, not one parameter. VD (apparent volume of distribution) has no time in it: its unit is litres.'},
  {t:'proportionality constant relating the rate of drug absorption to the rate of drug elimination', correct:false,
   why:'No single constant relates those two rates; each has its own rate constant, ka and k. The slide does call VD a proportionality constant, but between the amount of drug in the body and the plasma concentration.'},
  {t:'physiological measure of the volume occupied by the peripheral compartments', correct:false,
   why:'VD is apparent, not physiological, and it belongs to the whole body, not to the peripheral compartments alone. A one-compartment drug has a VD and no peripheral compartment at all.'}],
 teach:[
  {h:'The idea', list:[
   'VD (apparent volume of distribution) = {{frac:D0|C0}}: the volume that would hold the whole dose at the concentration measured in plasma.',
   'The word hypothetical is in the definition because the number need not match any anatomical space.',
   'Her graded item used the slide definition as the key and built two distractors from the slide\'s own phrase "proportionality constant".']}],
 cite:'Canvas Quiz 2 (Modules 2–3), question 1; 2IVBolusAdministration.pdf, slide "Volume of Distribution"'},

{id:'cq2-2', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:2, lecture:'L03',
 topic:'bolus2', sub:'calc', concept:'two-cpt-halflife-from-beta', skill:'multicpt',
 stem:'A 250-mg IV bolus dose of a drug was administered to six healthy volunteers. The parameters below best describe the pharmacokinetics of the drug. A = 10.16 mg/L, B = 5.65 mg/L, α = 3.59 hr⁻¹, β = 0.15 hr⁻¹. What is the elimination half-life of this agent? Round to the nearest hundredth (two decimal places).',
 units:'hr', answer:4.62, tol:0.09,
 steps:[
  {k:'setup', t:'t½ = {{frac:0.693|β}}',
   why:'The elimination half-life of a two-compartment drug belongs to the terminal phase, whose slope is β. The distribution constant α describes the early fall that ends once the tissues have filled, and A and B are intercepts, not rates, so none of them enters.'},
  {k:'algebra', t:'t½ = {{frac:0.693|0.15 hr⁻¹}} = 4.62 hr',
   why:'A pure number divided by a quantity in reciprocal hours leaves hours. The dose and the two intercepts are not used.'},
  {k:'round', t:'4.62 hr',
   why:'Her key is 4.62 with a margin of 2%, so anything from 4.53 to 4.71 scores. Two decimal places were asked for.'}],
 setup:{eq:'thalf-beta', pre:[], why:'"IV bolus dose" with A, B, α and β names the two-compartment block of Module 2. β is given and the "elimination half-life" is asked, so t½β = {{frac:0.693|β}}. No hinge; the dose, A, B and α are not used.'},
 teach:[
  {h:'The idea', list:[
   'A two-compartment item gives A, B, α and β and never names the model; the pairing of two intercepts with two rate constants is the signal.',
   'β is the slower constant and sets the terminal half-life. α only describes how fast the distribution phase is over.',
   'This is the same question shape as IV Bolus Practice 4 and Homework 2.']}],
 cite:'Canvas Quiz 2 (Modules 2–3), question 2; 2IVBolusAdministration.pdf, slide "Beta Half-life"'},

{id:'cq2-3', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:2, lecture:'L03',
 topic:'bolus2', sub:'calc', concept:'two-cpt-conc-at-time', skill:'multicpt',
 stem:'A 250-mg IV bolus dose of a drug was administered to six healthy volunteers. The parameters below best describe the pharmacokinetics of the drug. A = 10.68 mg/L, B = 3.13 mg/L, α = 3.55 hr⁻¹, β = 0.15 hr⁻¹. What is the concentration of the drug in the plasma 4 hours following administration of the dose? Round to the nearest hundredth (two decimal places).',
 units:'mg/L', answer:1.72, tol:0.05,
 steps:[
  {k:'setup', t:'Cp = Ae^(−αt) + Be^(−βt)',
   why:'A two-compartment concentration is the sum of two exponential terms, one for each phase. Each intercept pairs with its own rate constant: A with α, B with β.'},
  {k:'algebra', t:'10.68 × e^(−3.55 × 4) = 10.68 × e^(−14.2) = 0.0000',
   why:'The distribution term has decayed to nothing by 4 hours, because α is large. Dropping it changes nothing at two decimal places, but writing it shows that it was considered rather than forgotten.'},
  {k:'algebra', t:'3.13 × e^(−0.15 × 4) = 3.13 × e^(−0.6) = 3.13 × 0.5488 = 1.7178 mg/L',
   why:'The terminal term carries the whole answer at 4 hours. The exponent is dimensionless because hr⁻¹ × hr cancels.'},
  {k:'round', t:'1.72 mg/L',
   why:'Her key is 1.72 with a margin of 3%, so 1.67 to 1.77 scores. Rounding the exponent or e^(−0.6) early stays inside that margin; rounding B does not matter since it is given.'}],
 setup:{eq:'biexp', pre:[], why:'"IV bolus dose" with A, B, α and β names the two-compartment block. All four parameters and t are given and the "concentration of the drug in the plasma" at 4 hours is asked, so Cp = A·e^(−αt) + B·e^(−βt) is evaluated directly. No hinge.'},
 teach:[
  {h:'The idea', list:[
   'Put the time into both exponentials, multiply each by its intercept, and add.',
   'At a time several α-half-lives out, the first term is effectively zero and the curve is the terminal line alone.',
   'Each intercept belongs with its own rate constant; swapping them is the usual error.']}],
 cite:'Canvas Quiz 2 (Modules 2–3), question 3; 2IVBolusAdministration.pdf, slide "Two-Compartment Open Model (IV Bolus Injection)"'},

{id:'cq2-4', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'load', concept:'loading-purpose', skill:'recall', dupOf:'inf-c11',
 stem:'Why is a loading dose used?',
 options:[
  {t:'To immediately obtain a therapeutic plasma concentration', correct:true,
   why:'An infusion alone takes about five half-lives to reach steady state. A loading dose puts the steady-state amount, Css × VD, into the body at once, so the therapeutic level is there from the start and the infusion then holds it.'},
  {t:'To reduce the adverse effects associated with the drug', correct:false,
   why:'A loading dose raises the concentration faster, which if anything brings any concentration-related adverse effect forward. It does not lower exposure.'},
  {t:'To improve patient adherence', correct:false,
   why:'Adherence concerns how reliably a patient takes a regimen. A loading dose is a one-time quantity chosen for kinetic reasons and has nothing to do with it.'},
  {t:'To reduce the elimination half-life', correct:false,
   why:'The half-life is a property of the drug and the patient, set by k = Cl/VD. No dose changes it; a loading dose only changes how soon the target concentration is reached.'}],
 teach:[
  {h:'The idea', list:[
   'The time to steady state is set by the half-life alone: about five half-lives, whatever the rate.',
   'When that wait is too long, a loading dose DL = Css × VD supplies the steady-state amount at once.',
   'The infusion rate is unchanged by the loading dose; it still sets the level that is held.']}],
 cite:'Canvas Quiz 2 (Modules 2–3), question 4; 3IntravenousInfusions.pdf, slide "IV Bolus Loading Dose and Continuous IV Infusion"'},

{id:'cq2-5', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'stop', concept:'post-infusion-decay', skill:'infusion',
 stem:'An antibacterial agent with a volume of distribution of 22 L and a clearance of 3.2 L/hr was infused intravenously until a concentration of 14 mg/L was reached. What was the concentration of drug in the plasma 5 hours following cessation of the infusion? Round to the nearest tenth (one decimal place).',
 units:'mg/L', answer:6.8, tol:0.14,
 steps:[
  {k:'setup', t:'After the infusion stops, C = C(stop) × e^(−kt), with k = {{frac:Cl|VD}}',
   why:'Once input ends, the drug falls by first-order elimination from whatever concentration it had reached, exactly like an IV bolus starting at that concentration. The stem gives no k, so it has to be assembled from clearance and volume.'},
  {k:'algebra', t:'k = {{frac:3.2 L/hr|22 L}} = 0.1455 hr⁻¹',
   why:'Litres cancel, leaving reciprocal hours. The model is not named in the stem; one compartment is assumed as in every infusion problem of this module.'},
  {k:'algebra', t:'C = 14 mg/L × e^(−0.1455 × 5) = 14 × 0.4832 = 6.77 mg/L',
   why:'The exponent is dimensionless, and the 14 mg/L is the concentration at the moment the infusion was stopped, whether or not that was steady state.'},
  {k:'round', t:'6.8 mg/L',
   why:'Her key is 6.8 with a margin of 2%, so 6.66 to 6.94 scores. The unrounded 6.77 rounds to 6.8 at one decimal place.'}],
 setup:{eq:'cp-after-stop', pre:['cl-k-vd'], why:'"infused intravenously" and "cessation of the infusion" name the infusion block of Module 3. VD, Cl, the concentration at stopping and t are given and Cp after stopping is asked, so Cp = Cpeak·e^(−kt). k first, from Cl = k·VD rearranged to k = {{frac:Cl|VD}}, because the line wants k, not Cl.'},
 teach:[
  {h:'The idea', list:[
   'Stopping an infusion turns the problem into a bolus decay from the stopping concentration.',
   'When Cl and VD are given instead of k or t½, k = Cl/VD is the first line.',
   'The rate of the infusion is not needed once the stopping concentration is known.']}],
 cite:'Canvas Quiz 2 (Modules 2–3), question 5; 3IntravenousInfusions.pdf, slide "Drug Concentration after an IV Infusion has Ended"'},

{id:'cq2-6', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'css', concept:'rate-vs-time-to-css', skill:'apply', dupOf:'inf-c5',
 stem:'Which of the following results when the rate of infusion is increased?',
 options:[
  {t:'Steady-state concentration increases', correct:true,
   why:'Css = R/Cl, so the steady-state level is proportional to the rate. Doubling the rate doubles Css.'},
  {t:'The time to reach steady-state increases', correct:false,
   why:'The approach to steady state is set by k alone: about five half-lives, whatever the rate. A faster infusion climbs to a higher level in the same time.'},
  {t:'Steady-state concentration decreases', correct:false,
   why:'More drug in per hour against the same clearance means a higher level, not a lower one. The direction is the reverse of this option.'},
  {t:'The time to reach steady-state decreases', correct:false,
   why:'This is the common assumption the item is built to catch: the rate changes the height of the plateau, never how long the plateau takes.'}],
 teach:[
  {h:'The idea', list:[
   'The infusion rate sets the level: Css = {{frac:R|Cl}}.',
   'The half-life sets the time: about five half-lives to steady state, independent of the rate.',
   'The same question was her poll on 2 September and then a graded item.']}],
 cite:'Canvas Quiz 2 (Modules 2–3), question 6; 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State"'},

{id:'cq2-7', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'rate', concept:'rate-for-target-css', skill:'infusion',
 stem:'Recommend an infusion rate to achieve a steady-state concentration of 23 mcg/mL for an agent with an apparent volume of distribution of 15 L and half-life of 4 hr. Round to the nearest whole number.',
 units:'mg/hr', answer:60, tol:1.2,
 steps:[
  {k:'setup', t:'R = Css × Cl = Css × k × VD',
   why:'At steady state the rate in equals the rate out, and the rate out is clearance times concentration. Clearance is not given, so it is built from k and VD.'},
  {k:'unit', t:'23 mcg/mL = 23 mg/L',
   why:'Multiplying numerator and denominator by 1000 turns mcg/mL into mg/L, so the concentration multiplies a volume in litres to give milligrams, which is what mg/hr needs.'},
  {k:'algebra', t:'k = {{frac:0.693|4 hr}} = 0.1733 hr⁻¹; Cl = 0.1733 × 15 L = 2.599 L/hr',
   why:'The half-life is converted to a rate constant first, and clearance is that constant times the volume.'},
  {k:'algebra', t:'R = 23 mg/L × 2.599 L/hr = 59.8 mg/hr',
   why:'Litres cancel and mg/hr remains.'},
  {k:'round', t:'60 mg/hr',
   why:'Her key is 60 with a margin of 2%, so 58.8 to 61.2 scores. A whole number was asked for.'}],
 setup:{eq:'css', pre:['thalf-first', 'cl-k-vd'], why:'"infusion rate" to reach a "steady-state concentration" names the infusion block. Css, VD and t½ are given and R is asked, so Css = {{frac:R|Cl}} is rearranged to R = Css·Cl. k first, from the half-life, then Cl = k·VD, because the line wants Cl, not VD and t½.'},
 teach:[
  {h:'The idea', list:[
   'The rate that holds a target concentration is the target times the clearance.',
   'When clearance is not stated it is k × VD, with k from the half-life.',
   'mcg/mL and mg/L are the same number; the stem mixes them on purpose.']}],
 cite:'Canvas Quiz 2 (Modules 2–3), question 7; 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State"'},

{id:'cq2-8', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'css', concept:'css-from-rate', skill:'infusion',
 stem:'An analgesic drug is to be administered by continuous intravenous infusion at a rate of 38 mg/hr to a 60 year-old, 154 pound female patient. The drug has a half-life of 4 hours and an apparent volume of distribution of 0.21 L/kg. What is the expected steady-state concentration? Round to the nearest tenth (one decimal place).',
 units:'mg/L', answer:14.9, tol:0.3,
 steps:[
  {k:'setup', t:'Css = {{frac:R|Cl}} = {{frac:R|k × VD}}',
   why:'At steady state the infusion rate equals the elimination rate, Cl × Css. Clearance is built from k and the patient\'s own VD.'},
  {k:'unit', t:'154 {{frac:lb|2.2}} = 70 kg; VD = 0.21 L/kg × 70 kg = 14.7 L',
   why:'The volume is given per kilogram and the weight in pounds, so the weight is converted first and then scaled. Age and sex are stated and not used.'},
  {k:'algebra', t:'k = {{frac:0.693|4 hr}} = 0.1733 hr⁻¹; Cl = 0.1733 × 14.7 L = 2.547 L/hr',
   why:'Clearance is the rate constant times the volume, in L/hr.'},
  {k:'algebra', t:'Css = {{frac:38 mg/hr|2.547 L/hr}} = 14.92 mg/L',
   why:'Hours cancel, leaving mg/L.'},
  {k:'round', t:'14.9 mg/L',
   why:'Her key is 14.9 with a margin of 2%, so 14.6 to 15.2 scores. One decimal place was asked for.'}],
 setup:{eq:'css', pre:['thalf-first', 'cl-k-vd'], why:'"continuous intravenous infusion at a rate of" names the infusion block. R, t½ and a per-kilogram VD are given and the "steady-state concentration" is asked, so Css = {{frac:R|Cl}}. k first, from the half-life, then Cl = k·VD, because the line wants Cl; the weight-based VD is a unit step, not an equation.'},
 teach:[
  {h:'The idea', list:[
   'Css = R/Cl. The only work is assembling Cl from the half-life and a weight-based VD.',
   'Pounds to kilograms is divide by 2.2; a per-kilogram volume then multiplies the kilograms.',
   'Details that are not used (age, sex) appear in her stems and are meant to be left alone.']}],
 cite:'Canvas Quiz 2 (Modules 2–3), question 8; 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State"'},

/* ---------------------------- Quiz 3: Modules 4–5 ------------------------ */

{id:'cq3-1', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'routes', concept:'biotransformation-definition', skill:'recall', dupOf:'m4-rou-2',
 stem:'Which term describes the process by which drug is chemically converted in the body?',
 options:[
  {t:'biotransformation', correct:true,
   why:'Biotransformation, also called metabolism, is chemical change of the drug into a metabolite. It is one of the two elimination processes; the other, excretion, removes the drug unchanged.'},
  {t:'distribution', correct:false,
   why:'Distribution is reversible movement of unchanged drug between plasma and tissues. Nothing is chemically altered.'},
  {t:'excretion', correct:false,
   why:'Excretion removes the drug from the body intact, in urine or bile or breath. It is elimination without chemical change.'},
  {t:'absorption', correct:false,
   why:'Absorption is movement of unchanged drug from the site of administration into the systemic circulation.'}],
 teach:[
  {h:'The idea', list:[
   'Elimination = excretion + biotransformation. Both remove the parent drug irreversibly; only biotransformation changes the molecule.',
   'Distribution and absorption move unchanged drug and are not elimination.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 1; 4---Clearance-and-Elimination.pdf slide 3'},

{id:'cq3-2', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'clcalc', concept:'clearance-halflife-inverse', skill:'apply',
 stem:'If there is an increase in the total body clearance of an agent due to renal dysfunction, what is the expected change to the elimination half-life of that agent?',
 options:[
  {t:'The elimination half-life will decrease.', correct:true,
   why:'t½ = {{frac:0.693 × VD|Cl}}. With VD unchanged, a larger clearance means a shorter half-life. The item asks for the direction that follows from the stated change in clearance, whatever caused it.'},
  {t:'The elimination half-life will increase.', correct:false,
   why:'A longer half-life goes with a smaller clearance. Renal dysfunction usually lowers clearance, which is what makes this option tempting; the stem states that clearance increased, and the half-life follows the clearance.'},
  {t:'The elimination half-life will not change.', correct:false,
   why:'Half-life is not an independent property: it is set by VD and Cl together. A change in Cl with VD fixed must move it.'}],
 note:'The stem pairs renal dysfunction with an increase in clearance. Her keyed answer follows the stated increase in clearance; it is the Cl to t½ relation that is tested, not the usual direction of renal disease.',
 teach:[
  {h:'The idea', list:[
   'k = {{frac:Cl|VD}} and t½ = {{frac:0.693|k}}, so t½ = {{frac:0.693 × VD|Cl}}.',
   'Clearance up, half-life down; clearance down, half-life up, as long as VD holds.',
   'Read the direction the stem gives for clearance before deciding; do not substitute the direction renal disease usually takes.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 2; 4---Clearance-and-Elimination.pdf slide 21'},

{id:'cq3-3', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'peak', concept:'tmax-depends-on', skill:'recall', dupOf:'m5-c15',
 stem:'Which statement is true regarding the time needed to reach the maximum concentration following administration of an oral dose?',
 options:[
  {t:'the time needed to reach the maximum concentration depends on the rate constants for absorption and elimination', correct:true,
   why:'tmax = {{frac:ln(ka/k)|ka − k}}. Only the two rate constants appear; dose, F and VD scale the curve without moving its peak in time.'},
  {t:'the time needed to reach the maximum concentration is independent of the rate constants for absorption and elimination', correct:false,
   why:'This is the reverse of the relation: the rate constants are the only quantities tmax depends on.'},
  {t:'the time needed to reach the maximum concentration increases if the dose is increased', correct:false,
   why:'A larger dose raises Cmax in proportion and leaves tmax where it was, because the dose multiplies the whole curve.'},
  {t:'the time needed to reach the maximum concentration increases if the dose is decreased', correct:false,
   why:'A smaller dose lowers Cmax in proportion and leaves tmax where it was, for the same reason.'}],
 teach:[
  {h:'The idea', list:[
   'tmax is set by ka and k alone. Cmax is set by dose, F, VD and the two rate constants.',
   'Changing the dose moves Cmax and AUC in proportion and leaves tmax unchanged.',
   'She pairs this with the Cmax item below: at the peak, absorption rate equals elimination rate.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 3; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Cp vs. Time for a Single Oral Dose"'},

{id:'cq3-4', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'peak', concept:'rates-equal-at-cmax', skill:'recall', dupOf:'fig-oral-3',
 stem:'Which of the following is true regarding the Cmax following oral administration?',
 options:[
  {t:'the rate of drug absorption equals the rate of drug elimination', correct:true,
   why:'At the peak the concentration is momentarily not changing, so drug is entering the body exactly as fast as it is leaving. That balance is what defines the maximum.'},
  {t:'the rate of drug elimination is faster than the rate of drug absorption', correct:false,
   why:'That describes every moment after the peak, when the concentration is falling. At the peak itself the two rates are equal.'},
  {t:'the rate of drug absorption is faster than the rate of drug elimination', correct:false,
   why:'That describes every moment before the peak, when the concentration is rising.'},
  {t:'drug at the absorption site has become depleted', correct:false,
   why:'Absorption is still running at tmax; there is drug left at the site. The site empties later, after which the curve is elimination alone.'}],
 teach:[
  {h:'The idea', list:[
   'Before tmax, absorption outpaces elimination and the curve rises. After tmax, elimination outpaces absorption and the curve falls.',
   'At tmax the two rates are equal and the curve is flat for an instant.',
   'Depletion of the absorption site comes later and is not what defines the peak.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 4; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Plasma Level–Time Curve"'},

{id:'cq3-5', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'peak', concept:'tmax-from-rate-constants', skill:'oral',
 stem:'When does the maximum concentration of drug in the plasma occur following a single 1000-mg oral dose of an agent that has an oral bioavailability of 83%, apparent volume of distribution of 18 L, absorption half-life of 0.8 hours, and elimination half-life of 5.6 hours? Round to the nearest tenth (one decimal place).',
 units:'hr', answer:2.6, tol:0.08,
 steps:[
  {k:'setup', t:'tmax = {{frac:ln(ka / k)|ka − k}}',
   why:'The time to peak depends on the two rate constants only. The dose, the 83% bioavailability and the 18 L volume multiply the whole curve and cancel, so they are left alone.'},
  {k:'algebra', t:'ka = {{frac:0.693|0.8 hr}} = 0.8663 hr⁻¹; k = {{frac:0.693|5.6 hr}} = 0.1238 hr⁻¹',
   why:'Each half-life converts to its own rate constant. Both are in reciprocal hours, so they can be subtracted.'},
  {k:'algebra', t:'tmax = {{frac:ln(0.8663 / 0.1238)|0.8663 − 0.1238}} = {{frac:ln 7.0|0.7425 hr⁻¹}} = {{frac:1.9459|0.7425 hr⁻¹}} = 2.621 hr',
   why:'The ratio of the rate constants is the ratio of the half-lives the other way round, 5.6/0.8 = 7, so the logarithm is ln 7. Dividing by reciprocal hours leaves hours.'},
  {k:'round', t:'2.6 hr',
   why:'Her key is 2.6 with a margin of 3%, so 2.52 to 2.68 scores. One decimal place was asked for.'}],
 setup:{eq:'tmax', pre:['thalf-abs', 'thalf-first'], why:'"single 1000-mg oral dose" with an "absorption half-life" and an "elimination half-life" names the oral block of Module 5. The two half-lives are given and the time of the "maximum concentration" is asked, so tmax = {{frac:ln(ka ÷ k)|ka − k}}. ka and k first, from the half-lives; F, VD and the dose are not used.'},
 teach:[
  {h:'The idea', list:[
   'Convert both half-lives to rate constants, take the natural logarithm of their ratio, divide by their difference.',
   'Three of the five numbers in the stem (dose, F, VD) are not used; they would be needed for Cmax, not tmax.',
   'The ratio ka/k equals the elimination half-life divided by the absorption half-life.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 5; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Example 1"'},

{id:'cq3-6', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'clcalc', concept:'auc-from-dose-and-clearance', skill:'clearance',
 stem:'A 500-mg IV bolus dose of an antibiotic with an apparent volume of distribution of 23 L and half-life of 6.0 hr was administered to a 75 kg male volunteer. What is the expected AUC of this dose? Round to the nearest tenth (one decimal place).',
 units:'(mg/L)hr', answer:188.2, tol:5.6,
 steps:[
  {k:'setup', t:'AUC = {{frac:D0|Cl}} = {{frac:D0|k × VD}}',
   why:'For an IV dose the whole dose is eliminated, and clearance is dose over AUC, so AUC is dose over clearance. Clearance is not given and is built from k and VD. The 75 kg is not used because VD is given in litres already.'},
  {k:'algebra', t:'k = {{frac:0.693|6.0 hr}} = 0.1155 hr⁻¹; Cl = 0.1155 × 23 L = 2.657 L/hr',
   why:'The half-life becomes a rate constant and clearance is that constant times the volume.'},
  {k:'algebra', t:'AUC = {{frac:500 mg|2.657 L/hr}} = 188.2 (mg/L)hr',
   why:'mg divided by L/hr is mg·hr/L, which is a concentration times a time, the unit of an area under a concentration curve.'},
  {k:'round', t:'188.2 (mg/L)hr',
   why:'Her key is 188.2 with a margin of 3%, so 182.6 to 193.8 scores. The same answer comes from C0/k: C0 = 500/23 = 21.74 mg/L, and 21.74/0.1155 = 188.2.'}],
 setup:{eq:'cl-auc', pre:['thalf-first', 'cl-k-vd'], why:'"IV bolus dose" with a VD and a "half-life" names the clearance block of Module 4. D0, VD and t½ are given and the AUC is asked, so Cl = {{frac:D0|AUC}} is rearranged to AUC = {{frac:D0|Cl}}. k first, from the half-life, then Cl = k·VD, because the line wants Cl; the 75 kg is not used.'},
 teach:[
  {h:'The idea', list:[
   'AUC after an IV bolus is D0/Cl, or equally C0/k. Both give the same number.',
   'When clearance is not stated, Cl = k × VD with k from the half-life.',
   'Body weight is only needed when VD is given per kilogram; here it is in litres.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 6; 4---Clearance-and-Elimination.pdf slide 21'},

{id:'cq3-7', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'clcalc', concept:'renal-clearance-from-urine', skill:'clearance',
 stem:'1,000 mg of a drug was given by IV bolus injection. The VD is 19 L and the elimination half-life is 3 hours. Urine samples were collected for 48 hours and 713 mg of unchanged drug was recovered. What is the renal clearance of this drug? Round to the nearest hundredth (two decimal places).',
 units:'L/hr', answer:3.13, tol:0.09,
 steps:[
  {k:'setup', t:'ClR = {{frac:Du∞|AUC}}, with AUC = {{frac:D0|k × VD}}',
   why:'Renal clearance is the amount excreted unchanged over the whole time course divided by the total AUC. The 48-hour collection is sixteen half-lives, so 713 mg is the total excreted unchanged.'},
  {k:'algebra', t:'k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹; AUC = {{frac:1000 mg|0.231 hr⁻¹ × 19 L}} = {{frac:1000|4.389}} = 227.8 (mg/L)hr',
   why:'The total clearance is k × VD = 4.389 L/hr, and dose over clearance is the AUC.'},
  {k:'algebra', t:'ClR = {{frac:713 mg|227.8 (mg/L)hr}} = 3.13 L/hr',
   why:'mg divided by mg·hr/L leaves L/hr. The same answer comes from fe × ClT: 0.713 × 4.389 = 3.13 L/hr.'},
  {k:'round', t:'3.13 L/hr',
   why:'Her key is 3.13 with a margin of 3%, so 3.04 to 3.22 scores. Two decimal places were asked for.'}],
 setup:{eq:'none', pre:['thalf-first', 'cl-k-vd', 'cl-auc'], why:'"IV bolus injection" with "unchanged drug was recovered" names the renal clearance block of Module 4. D0, VD, t½ and Du∞ are given and "renal clearance" is asked. No catalog line is Du∞ over an area; the working uses ClR = {{frac:Du∞|AUC}} with AUC = {{frac:D0|Cl}}, Cl = k·VD and k from the half-life, which equals ClR = fe·ClT.'},
 teach:[
  {h:'The idea', list:[
   'Renal clearance = amount excreted unchanged ÷ AUC, or fe × total clearance. Both routes give 3.13 L/hr here.',
   'fe is the fraction of the dose recovered unchanged: 713/1000 = 0.713.',
   'A collection lasting many half-lives means the recovered amount is the total, so no correction for incomplete collection is needed.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 7; 4---Clearance-and-Elimination.pdf slide 22'},

{id:'cq3-8', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'conc', concept:'vd-from-oral-equation', skill:'oral',
 stem:'The kinetics following the oral administration of a single 500-mg dose of a medicinal agent best fits a one-compartment model described by the equation Cp = 30(e^(−0.133t) − e^(−0.934t)). What is the volume of distribution following the 500-mg dose if the oral bioavailability is 82%? Assume units of mcg/mL for Cp and hr for time. Round to the nearest tenth (one decimal place).',
 units:'L', answer:15.9, tol:0.5,
 steps:[
  {k:'setup', t:'The coefficient 30 = {{frac:F × D0 × ka|VD × (ka − k)}}, so VD = {{frac:F × D0 × ka|30 × (ka − k)}}',
   why:'The single oral dose equation is Cp = [F D0 ka / (VD (ka − k))] (e^(−kt) − e^(−ka t)). Matching it to the given equation identifies the coefficient and the two rate constants; the larger constant, 0.934, is ka and the smaller, 0.133, is k, because in ordinary absorption ka exceeds k.'},
  {k:'unit', t:'mcg/mL = mg/L, so a dose in mg and a coefficient in mcg/mL give VD in L',
   why:'The concentration unit decides the volume unit. With Cp in mg/L and the dose in mg, the volume comes out in litres without any further conversion.'},
  {k:'algebra', t:'VD = {{frac:0.82 × 500 mg × 0.934 hr⁻¹|30 mg/L × (0.934 − 0.133) hr⁻¹}} = {{frac:382.9|24.03}} = 15.94 L',
   why:'Reciprocal hours cancel between numerator and denominator, and mg over mg/L leaves litres.'},
  {k:'round', t:'15.9 L',
   why:'Her key is 15.9 with a margin of 3%, so 15.4 to 16.4 scores. Leaving out F gives 19.4 L; swapping ka and k gives a negative volume, which cannot be right.'}],
 setup:{eq:'oral-cp', pre:[], why:'"oral administration of a single 500-mg dose" fitting a "one-compartment model" with a printed equation names the oral block. The coefficient, both exponents, F and D0 are given and VD is asked, so the prefactor F·ka·{{frac:D0|VD(ka − k)}} of the oral Cp line is set equal to 30 and rearranged for VD. No hinge; ka is the larger exponent.'},
 teach:[
  {h:'The idea', list:[
   'A printed oral equation hands over three numbers: the coefficient, k (the smaller exponent) and ka (the larger).',
   'The coefficient is F D0 ka / (VD (ka − k)); solve it for whichever quantity is asked, here VD.',
   'F belongs in the numerator: only the absorbed fraction of the dose reaches the body.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 8; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Example 2"'},

/* ---- Quiz 4 (Modules 6–7a), sat 5 Oct 2026: ten items at 10 points, five concept and
   five numeric, alternating. Numeric instruction: "Give your answer in <unit> rounded to the
   nearest tenth / whole number / hundredth with no units", margin ±5% (±3% on the F item).
   Supplied as a graded screenshot PDF ("Module 6-7 Practice Questions"); stems word for word,
   a doubled "are" left as she wrote it in question 1. Every numeric key recomputed from its stem. */

{id:'cq4-1', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'multi', sub:'superpos', concept:'why-multiple-dosing', skill:'recall',
 source:'both',
 stem:'Why are multiple dosage regimens are used?',
 options:[
  {t:'to maintain plasma drug levels within the therapeutic window', correct:true,
   why:'One dose rises above the minimum effective concentration and then falls below it. Repeating the dose keeps the level between the minimum effective and the minimum toxic concentration, the therapeutic window.'},
  {t:'to decrease the MEC', correct:false,
   why:'The minimum effective concentration (MEC) is a property of the drug and the response. Dosing does not move it; dosing moves the plasma level toward it.'},
  {t:'to decrease the rate of elimination of drug from the body', correct:false,
   why:'Elimination is set by clearance, which the regimen cannot change. Repeating a dose replaces what elimination removes; it does not slow elimination.'},
  {t:'to increase the clearance of drugs', correct:false,
   why:'Clearance is a property of the patient and the drug, not of the schedule. A regimen that raised clearance would lower the levels it is meant to hold up.'}],
 teach:[
  {h:'The idea', list:[
   'Her drawing on the single-dose curve adds two lines, the minimum toxic concentration (MTC) above and the minimum effective concentration (MEC) below: "our goal is that we want to stay in between these two lines."',
   'A single dose stays between them only for a while. Multiple doses, or an infusion, hold the level there.',
   'The textbook states the same purpose: multiple-dosage or infusion regimens keep plasma levels within the therapeutic window.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 1; transcript, the MTC and MEC lines drawn on the single-dose curve (TRANSCRIPT_CUES.md); Shargel 7e Chapter 9, printout p. 1'},

{id:'cq4-2', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'multi', sub:'ssbolus', concept:'cmax-ss', skill:'multidose',
 stem:'What is the expected maximum steady-state concentration following IV bolus injections of 17 mg/kg to a 75 kg male every 8 hours? The drug has an elimination half-life of 4 hours, and the apparent volume of distribution is 15% of body weight. Give your answer in (mg/L), rounded to the nearest tenth (one decimal place) with no units.',
 units:'mg/L', answer:151.1, tol:7.6,
 steps:[
  {k:'setup', t:'Cmax∞ = {{frac:C0|1 − e^(−kτ)}}, with C0 = {{frac:D0|VD}}',
   why:'"IV bolus injections … every 8 hours" and "maximum steady-state concentration" name the repeated IV bolus block at steady state. The peak at the plateau is the single-dose peak divided by the fraction not yet eliminated at each dose.'},
  {k:'unit', t:'D0 = 17 mg/kg × 75 kg = 1275 mg; VD = 0.15 × 75 kg = 11.25 L; C0 = {{frac:1275 mg|11.25 L}} = 113.3 mg/L',
   why:'Both the dose and the volume are given per kilogram of body weight, so both are scaled to the 75 kg patient before anything else. mg over L is mg/L.'},
  {k:'algebra', t:'k = {{frac:0.693|4 hr}} = 0.1733 hr⁻¹; e^(−kτ) = e^(−0.1733 × 8) = e^(−1.386) = 0.250',
   why:'Eight hours is two half-lives, so one quarter of a dose remains when the next arrives. The exponent is dimensionless: reciprocal hours times hours.'},
  {k:'algebra', t:'Cmax∞ = {{frac:113.3 mg/L|1 − 0.250}} = {{frac:113.3|0.750}} = 151.1 mg/L',
   why:'Dividing by 0.75 is the accumulation factor 1.33: the steady-state peak is one third higher than the first-dose peak.'},
  {k:'round', t:'151.1',
   why:'Her key is 151.1 with a margin of 5%, so 143.5 to 158.7 scores. One decimal place was asked for, and Canvas took the number with no unit.'}],
 setup:{eq:'cmax-ss', pre:['thalf-first', 'cp-db-vd'], why:'"IV bolus injections" "every 8 hours" and "maximum steady-state concentration", so the repeated IV bolus block at steady state. Dose per kg, VD per kg, t½ and τ are given and Cmax∞ is asked, so Cmax∞ = {{frac:C0|1 − e^(−kτ)}}. k first from the half-life, and C0 from the scaled dose over the scaled volume.'},
 teach:[
  {h:'The idea', list:[
   'Scale per-kilogram values to the patient first; the mg/kg and L/kg cancel against the same body weight.',
   'τ equal to two half-lives leaves 25% at each dose, so the factor is 1 ÷ 0.75.',
   'The same line, with e^(−kτ) multiplied in on top, gives the trough.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 2; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"'},

{id:'cq4-3', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'raise-css-by-regimen', skill:'apply', dupOf:'m6b-c16',
 source:'both',
 stem:'Which is the best option to increase the steady-state concentration in a dosing regimen?',
 options:[
  {t:'increase the dosing interval', correct:false,
   why:'A longer interval gives elimination more time between doses, so the steady-state level falls and the swing between peak and trough grows. This is the direction many pick; it is the opposite of what is asked.'},
  {t:'decrease the dosing interval', correct:true,
   why:'Dosing more often puts the next dose in before as much of the last has left, so the plateau rises. Of the two things a regimen can change, the dose and the interval, this is the interval change that raises the level.'},
  {t:'increase the clearance', correct:false,
   why:'A regimen cannot change clearance, and a higher clearance would lower the steady-state concentration, since Cavg∞ = F D0 ÷ (Cl × τ).'},
  {t:'decrease the elimination half-life', correct:false,
   why:'Half-life is a property of the drug in the patient, not a dosing choice, and a shorter half-life means faster loss and lower levels.'}],
 teach:[
  {h:'The idea', list:[
   'Her rule: the only things a regimen can change are the size of the dose and the dosing interval; clearance and half-life are not choices.',
   'Slide "Altering Dosing Interval": decreasing the interval increases steady-state concentrations and decreases the peak-to-trough fluctuation, at the cost of compliance.',
   'Raising the dose also raises the level, but it is not among the options here.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 3; 6a---Multiple-Oral-Doses.pdf, slides "Altering Steady-State Concentrations" and "Altering Dosing Interval"; 09.28 lecture'},

{id:'cq4-4', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'sum-two-infusions', skill:'multidose',
 stem:'Four hundred milligrams of an antibiotic was infused intravenously over a period of 2 hours. Eight hours after the start of the first infusion, a second 400-mg dose was infused again over a period of 2 hours. The half-life of the antibiotic is approximately 4 hours and the apparent volume of distribution is approximately 20 L. What is the plasma drug concentration 4 hours after the cessation of the second infusion? Give your answer in mg/L rounded to the nearest tenth (one decimal place) with no units.',
 units:'mg/L', answer:10.6, tol:0.53,
 steps:[
  {k:'setup', t:'Each infusion ends at Cend = {{frac:R|k × VD}}(1 − e^(−k × 2 hr)); then Cp = Cend e^(−k t₁) + Cend e^(−k t₂), one term per infusion',
   why:'The two infusions are added (superposition). Each is a 2-hour infusion that ends at the same concentration because the dose, the time and the patient are the same; after it stops, each decays by first-order elimination from its own end time.'},
  {k:'unit', t:'R = {{frac:400 mg|2 hr}} = 200 mg/hr; k = {{frac:0.693|4 hr}} = 0.1733 hr⁻¹; Cl = k × VD = 0.1733 × 20 L = 3.465 L/hr',
   why:'The rate is the dose over the infusion time, in mg/hr. Clearance comes from k and VD because the infusion line wants Cl.'},
  {k:'algebra', t:'Cend = {{frac:200 mg/hr|3.465 L/hr}}(1 − e^(−0.1733 × 2)) = 57.72 × (1 − 0.7071) = 16.90 mg/L',
   why:'57.72 mg/L would be the plateau if the drip ran on; after two hours, half a half-life, it has reached 29.3% of that.'},
  {k:'algebra', t:'Times since each infusion ended: first ended at 2 hr, so 12 hr have passed at t = 14 hr; second ended at 10 hr, so 4 hr. Cp = 16.90 e^(−0.1733 × 12) + 16.90 e^(−0.1733 × 4) = 16.90 × 0.125 + 16.90 × 0.500 = 2.11 + 8.45 = 10.56 mg/L',
   why:'The second infusion started 8 hours after the first began, so it ran from 8 to 10 hours; 4 hours after its end is 14 hours. Twelve hours is three half-lives (one eighth left), four hours is one half-life (one half left).'},
  {k:'round', t:'10.6',
   why:'Her key is 10.6 with a margin of 5%, so 10.1 to 11.1 scores. A common wrong answer is 135.4, which comes from treating the two doses as a single bolus concentration; the drip ends far below its plateau.'}],
 setup:{eq:'cp-after-stop', pre:['thalf-first', 'cl-k-vd', 'cp-infusing'], why:'Two 2-hour infusions and a level "4 hours after the cessation of the second infusion": intermittent infusions, added. Dose, infusion time, t½ and VD are given and Cp is asked, so each end level decays from its own end time and the two are summed. k first, then Cl = k × VD, then the infusion line.'},
 teach:[
  {h:'The idea', list:[
   'Work one infusion to its end level with the infusion line, then let each copy decay from its own stopping time, then add.',
   'Count the clock from the start of the first infusion: starts at 0 and 8 hours, ends at 2 and 10 hours, the question asks about 14 hours.',
   'Half-life arithmetic checks the exponentials: 12 hours is three half-lives (0.125), 4 hours is one (0.5).']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 4; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Administering One or More Doses by IV Infusion" and "Example 4"'},

{id:'cq4-5', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'increase-dose-effects', skill:'apply', dupOf:'m6b-c14',
 source:'both',
 stem:'Which of the following results if the dose is increased on a medication that is to be administered orally at regularly repeating intervals?',
 options:[
  {t:'Increased steady-state tmax', correct:false,
   why:'The time of the peak within an interval depends on ka, k and τ only. The dose is not in that expression, so tmax does not move; this was her poll on the first slide of the deck.'},
  {t:'Decreased rate of absorption', correct:false,
   why:'The absorption rate constant is a property of the drug and the dosage form. A larger dose means more drug absorbed at the same rate constant.'},
  {t:'Increased steady-state Cmax', correct:true,
   why:'Every concentration in the regimen scales with the dose, so the steady-state peak rises in proportion. Slide "Altering Dose": increasing the dose increases steady-state concentrations and the peak-to-trough fluctuation.'},
  {t:'Decreased clearance', correct:false,
   why:'Clearance is a property of the patient and the drug. Changing the dose changes the amount cleared per hour, not the clearance.'}],
 teach:[
  {h:'The idea', list:[
   'Dose up: higher Cmax, Cmin and Cavg, a bigger swing between peak and trough, usually no change in compliance.',
   'Dose does not move tmax (her poll: "no change in the tmax"), ka or clearance.',
   'The parameters a regimen cannot change are the usual distractors: clearance, half-life, rate constants.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 5; 6a---Multiple-Oral-Doses.pdf, slides "Poll EV" (page 1) and "Altering Dose"; 09.28 lecture'},

{id:'cq4-6', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'tmax-ss', skill:'multidose',
 stem:'A 74-kg patient was administered a 750 mg oral dose of a new drug every 8 hours. The drug has an oral bioavailability of 92%, apparent volume of distribution of 0.29 L/kg, elimination half-life of 5 hours, and the absorption half-life of 1.5 hour. When does the expected maximum concentration of drug in the plasma at steady-state occur? Give your answer in hours rounded to the nearest tenth (one decimal place) with no units.',
 units:'hr', answer:2.6, tol:0.13,
 steps:[
  {k:'setup', t:'tmax∞ = {{frac:1|ka − k}} ln[{{frac:ka(1 − e^(−kτ))|k(1 − e^(−kaτ))}}]',
   why:'"Oral dose … every 8 hours" and "when does the … maximum concentration … at steady-state occur" ask for the time of the peak within an interval at the plateau. Only the two rate constants and τ enter; the dose, F, VD and the weight are not needed.'},
  {k:'algebra', t:'k = {{frac:0.693|5 hr}} = 0.1386 hr⁻¹; ka = {{frac:0.693|1.5 hr}} = 0.462 hr⁻¹',
   why:'Each half-life gives its own rate constant. The absorption half-life is the shorter one, so ka is the larger constant, as it must be for an immediate-release product.'},
  {k:'algebra', t:'e^(−kτ) = e^(−0.1386 × 8) = 0.330, so 1 − 0.330 = 0.670; e^(−kaτ) = e^(−0.462 × 8) = 0.0248, so 1 − 0.0248 = 0.975',
   why:'Both accumulation terms are evaluated at τ = 8 hours. Absorption is nearly complete within an interval (0.975), elimination is not (0.670).'},
  {k:'algebra', t:'tmax∞ = {{frac:1|0.462 − 0.1386}} ln[{{frac:0.462 × 0.670|0.1386 × 0.975}}] = {{frac:1|0.3234}} ln(2.291) = 3.092 × 0.829 = 2.56 hr',
   why:'The ratio inside the log is 2.291 and its natural log is 0.829; dividing by the difference of the constants gives hours. The single-dose tmax for the same constants would be 3.72 hr, so the steady-state peak comes earlier.'},
  {k:'round', t:'2.6',
   why:'Her key is 2.6 with a margin of 5%, so 2.5 to 2.7 scores. A common wrong answer is 17.1, a time to steady state or a decomposition time, not the time of the peak within an interval.'}],
 setup:{eq:'tmax-ss', pre:['thalf-first', 'thalf-abs'], why:'"oral dose … every 8 hours" and "when does the expected maximum concentration … at steady-state occur", so the multiple oral block, the time-of-peak line. Two half-lives and τ are given and tmax∞ is asked; F, VD, the dose and the weight are not in the line. k and ka first, each from its half-life.'},
 teach:[
  {h:'The idea', list:[
   'The steady-state peak time needs ka, k and τ only; extra data in the stem (F, VD, weight, dose) is for other parts of the same problem.',
   'At steady state the peak arrives earlier than after a single dose, because drug left from earlier doses is already being eliminated while the new dose is absorbed.',
   'Each half-life in the stem is converted to its own rate constant with 0.693.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 6; 6a---Multiple-Oral-Doses.pdf, slide "Example 1" (tmax at steady state)'},

{id:'cq4-7', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'intermittent-assumptions', skill:'recall',
 source:'both',
 stem:'Which of the following best describes the assumptions associated with intermittent IV infusions?',
 options:[
  {t:'all drugs are better tolerated as IV bolus doses compared to IV infusion', correct:false,
   why:'The rationale slide says the reverse: many drugs are better tolerated when infused slowly over time than as an IV bolus. The word "all" also overstates it.'},
  {t:'intermittent IV infusions decrease elimination half-life which leads to increased efficacy', correct:false,
   why:'No route of administration changes the elimination half-life, which belongs to the drug in the patient.'},
  {t:'concentrations of drug in the body following multiple infusions are additive', correct:true,
   why:'This is superposition applied to infusions: each infusion is worked as a single infusion, decays from its own end, and the concentrations are added. It is the assumption behind every two-infusion calculation.'},
  {t:'intermittent IV infusion is the best way to very rapidly achieve high drug concentrations', correct:false,
   why:'The rationale for infusing is to prevent high concentrations and their side effects. A loading bolus, not an infusion, is the way to reach a level quickly.'}],
 teach:[
  {h:'The idea', list:[
   'Rationale slide: prevent high drug concentrations and accompanying side effects; many drugs are better tolerated when infused slowly over time than by IV bolus.',
   'Assumption: concentrations from successive infusions add (superposition), and each infusion follows the single-infusion equation with the same R, k and VD.',
   'The three distractors each reverse a line of the rationale or move a drug property (half-life) that a route cannot move.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 7; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Rationale" and "Administering One or More Doses by IV Infusion"; 09.28 lecture'},

{id:'cq4-8', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'dose-for-cavg', skill:'multidose',
 stem:'A patient is to take a medication by mouth every 8 hours. The medication has an oral bioavailability of 83%, an absorption half-life of 90 minutes, total body clearance of 3.0 L/hr, and apparent volume of distribution of approximately 25 L. What is an appropriate dose to achieve an average plasma drug concentration of 25 mg/L in this patient? Give your answer in mg rounded to the nearest whole number with no units.',
 units:'mg', answer:723, tol:36,
 steps:[
  {k:'setup', t:'Cavg∞ = {{frac:F × D0|Cl × τ}}, so D0 = {{frac:Cavg∞ × Cl × τ|F}}',
   why:'"By mouth every 8 hours" and "average plasma drug concentration" name the average steady-state line of the multiple oral block, rearranged for the dose. Clearance is given directly, so k and VD are not needed; the absorption half-life and VD are extra data for this part.'},
  {k:'algebra', t:'D0 = {{frac:25 mg/L × 3.0 L/hr × 8 hr|0.83}} = {{frac:600 mg|0.83}} = 722.9 mg',
   why:'mg/L × L/hr × hr leaves mg: the amount cleared in one interval at the target average. Dividing by F scales it up to the dose that has to be swallowed for 83% of it to reach the blood.'},
  {k:'round', t:'723',
   why:'Her key is 723 with a margin of 5%, so 687 to 759 scores. A common wrong answer is 500, which is what the numbers give without dividing by F and with a different interval; the whole number was asked for.'}],
 setup:{eq:'cavg-ss', pre:[], why:'"by mouth every 8 hours" and "average plasma drug concentration", so the multiple oral block, the average line. Cl, τ, F and the target Cavg∞ are given and the dose is asked, so Cavg∞ = {{frac:F × D0|Cl × τ}} is rearranged for D0. No hinge: clearance is given, so k and VD stay unused.'},
 teach:[
  {h:'The idea', list:[
   'The average steady-state concentration depends on the dosing rate F × D0 ÷ τ and on clearance, and on nothing else: not on ka, not on VD.',
   'Cl × τ × Cavg∞ is the amount of drug cleared per interval; the dose has to replace it, scaled up by F.',
   'She rounds a dose to a usable strength on worksheets; here Canvas asked for the whole number.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 8; 6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"'},

{id:'cq4-9', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'fabs-from-clearance', skill:'bioavail',
 stem:'What is the absolute bioavailability of a drug for which a 500 mg dose resulted in an AUC of 139 (mg/L)hr? The elimination half-life of the drug is 4.5 hr and the apparent volume of distribution is 18 L. Give your answer as a decimal rounded to the nearest hundredth with no units.',
 units:'(as a decimal fraction)', answer:0.77, tol:0.023,
 steps:[
  {k:'setup', t:'Fabs = {{frac:AUCpo|AUCIV}} with the same dose, and AUCIV = {{frac:DIV|Cl}}, Cl = k × VD',
   why:'"Absolute bioavailability" with one AUC given and no IV AUC: the IV area has to come from the dose and the clearance, which the half-life and the volume supply. With equal doses the dose ratio is 1.'},
  {k:'algebra', t:'k = {{frac:0.693|4.5 hr}} = 0.154 hr⁻¹; Cl = 0.154 hr⁻¹ × 18 L = 2.772 L/hr; AUCIV = {{frac:500 mg|2.772 L/hr}} = 180.4 (mg/L)hr',
   why:'hr⁻¹ × L is L/hr, and mg over L/hr is mg·hr/L, the unit of an AUC. This is the area the same 500 mg would give intravenously.'},
  {k:'algebra', t:'Fabs = {{frac:139|180.4}} = 0.771',
   why:'The oral area is 77% of the IV area for the same dose, so 77% of the oral dose reached the circulation.'},
  {k:'round', t:'0.77',
   why:'Her key is 0.77 with a margin of 3%, so 0.75 to 0.79 scores. Two decimal places were asked for, as a decimal, not a percentage.'}],
 setup:{eq:'f-abs', pre:['thalf-first', 'cl-k-vd', 'div-cl-auc'], why:'"absolute bioavailability" with an oral AUC, t½ and VD and no IV AUC, so the bioavailability block. The IV AUC is not given, so it comes from DIV = Cl × AUCIV with Cl = k × VD; then Fabs is the ratio of the two areas, the doses being equal.'},
 teach:[
  {h:'The idea', list:[
   'When the IV curve is not given, dose over clearance is the IV AUC: the in-class sheet asked it this way too.',
   'Equal oral and IV doses make the dose ratio 1, so F is the ratio of the areas.',
   'Report F as a decimal with two places (0.77), or as 77%; never 0.771 when two places are asked.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 9; 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability" (equation) and the in-class activity of 09.30, question 3'},

{id:'cq4-10', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'absolute-vs-relative', skill:'recall', dupOf:'m7-c03',
 source:'slide',
 stem:'Which term describes the comparison of the bioavailability of the active drug in the systemic circulation following extravascular administration with the bioavailability of the same drug following intravenous administration?',
 options:[
  {t:'Absolute Bioavailability', correct:true,
   why:'The stem is the slide definition word for word. Absolute means measured against the intravenous dose, where all of the drug is in the circulation.'},
  {t:'Bioequivalence', correct:false,
   why:'Bioequivalence compares two drug products of the same drug in rate and extent; neither product is the IV dose.'},
  {t:'Relative Bioavailability', correct:false,
   why:'Relative bioavailability compares two formulations or routes against a reference that is not the IV dose.'},
  {t:'Drug Product Performance', correct:false,
   why:'Drug product performance is the release of the drug from the product and its absorption, the broader term the deck opens with; it is not the IV comparison.'}],
 teach:[
  {h:'The idea', list:[
   'Absolute: against IV. Relative: against another product or route. Bioequivalence: two products of the same drug compared in both rate and extent.',
   'She asks definitions by quoting the slide and asking for the term; the words "intravenous administration" settle this one.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 10; 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability" (page 5)'},

];
