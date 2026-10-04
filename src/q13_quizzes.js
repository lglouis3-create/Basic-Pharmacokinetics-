/* ==========================================================================
   HER GRADED CANVAS QUIZZES — Quiz 2 (Modules 2–3) and Quiz 3 (Modules 4–5)
   ==========================================================================
   Sixteen items, each a screenshot of a graded Canvas question with the key
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
  {k:'unit', t:'154 lb ÷ 2.2 = 70 kg; VD = 0.21 L/kg × 70 kg = 14.7 L',
   why:'The volume is given per kilogram and the weight in pounds, so the weight is converted first and then scaled. Age and sex are stated and not used.'},
  {k:'algebra', t:'k = {{frac:0.693|4 hr}} = 0.1733 hr⁻¹; Cl = 0.1733 × 14.7 L = 2.547 L/hr',
   why:'Clearance is the rate constant times the volume, in L/hr.'},
  {k:'algebra', t:'Css = {{frac:38 mg/hr|2.547 L/hr}} = 14.92 mg/L',
   why:'Hours cancel, leaving mg/L.'},
  {k:'round', t:'14.9 mg/L',
   why:'Her key is 14.9 with a margin of 2%, so 14.6 to 15.2 scores. One decimal place was asked for.'}],
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
 teach:[
  {h:'The idea', list:[
   'A printed oral equation hands over three numbers: the coefficient, k (the smaller exponent) and ka (the larger).',
   'The coefficient is F D0 ka / (VD (ka − k)); solve it for whichever quantity is asked, here VD.',
   'F belongs in the numerator: only the absorbed fraction of the dose reaches the body.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 8; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Example 2"'},

];
