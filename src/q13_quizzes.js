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
   why:'Picking this reads a definition of pharmacokinetics as the definition of one of its parameters. The time course of absorption, distribution, metabolism and elimination is what the whole discipline estimates. VD (apparent volume of distribution) has no time in it: its unit is litres, and it is the dose divided by the plasma concentration.'},
  {t:'proportionality constant relating the rate of drug absorption to the rate of drug elimination', correct:false,
   why:'Picking this reads the phrase proportionality constant from her slide as licence to pair it with any two rates. No single constant relates absorption rate to elimination rate; each has its own constant, ka for absorption and k for elimination. VD is a proportionality constant between the amount in the body and the plasma concentration.'},
  {t:'physiological measure of the volume occupied by the peripheral compartments', correct:false,
   why:'This answer confuses apparent with physiological and the whole body with its peripheral part. VD is apparent, a volume computed from dose and concentration rather than a measurable space, and it describes the whole body. A one-compartment drug has a VD and no peripheral compartment at all, so VD cannot measure peripheral compartments.'}],
 teach:[
  {h:'The idea', list:[
   'VD (apparent volume of distribution) = {{frac:D0|C0}}: the volume that would hold the whole dose at the concentration measured in plasma.',
   'The word hypothetical is in the definition because the number need not match any anatomical space.',
   'A large VD means the drug is more concentrated in the tissues and less in the blood; a drug highly bound to plasma proteins, or held in the vessels, has a higher Cp and a smaller VD (second slide "Volume of Distribution").',
   'VD given as a percentage of body weight is read as litres per kilogram, with 1 L taken as the weight of 1 kg: 25 per cent of body weight is 0.25 L/kg.',
   'VD is a volume, in litres; clearance is a volume per time, in L/hr. VD says how widely the drug spreads, clearance how fast it is removed, and k = {{frac:Cl|VD}} links them (slide "Clearance, Elimination Half-Life, and Volume of Distribution").',
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
   why:'Dividing the pure number 0.693 by β in reciprocal hours leaves hours, because hr⁻¹ in the denominator inverts to hr: {{frac:0.693|0.15}} = 4.62. The dose of 250 mg and the intercepts A and B are not used; they would enter only for a volume or an initial concentration.'},
  {k:'round', t:'4.62 hr',
   why:'The quotient 0.693 divided by 0.15 is exactly 4.62, so rounding to the nearest hundredth changes nothing. Her key is 4.62 hr with a margin of 2%, which is 0.09 hr either way, so any answer from 4.53 to 4.71 scores. Two decimal places were asked for.'}],
 setup:{eq:'thalf-beta', pre:[], why:'"IV bolus dose" with A, B, α and β names the two-compartment block of Module 2. β is given and the "elimination half-life" is asked, so t½β = {{frac:0.693|β}}. No hinge; the dose, A, B and α are not used.'},
 asks:'thalf',
 givens:[['D0', '250-mg IV bolus', 'not needed: half-life does not depend on the dose'], ['n', 'six healthy volunteers', 'not needed'], ['A', '10.16 mg/L', 'not needed: intercepts do not set the half-life'], ['B', '5.65 mg/L', 'not needed'], ['α', '3.59 hr⁻¹', 'not needed: the distribution phase is not the elimination half-life'], ['β', '0.15 hr⁻¹', 'the denominator of {{frac:0.693|β}}']],
 check:{t:'β = 0.15 hr⁻¹ removes about 15% an hour, so halving takes between 4 and 5 hours: {{frac:0.693|0.15}} = 4.62 hr. The elimination half-life uses the smaller exponent, β.', lo:0},
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
 asks:'Cp',
 givens:[['D0', '250-mg IV bolus', 'not needed: the equation already carries the dose'], ['A', '10.68 mg/L', 'the coefficient of e^(−αt)'], ['B', '3.13 mg/L', 'the coefficient of e^(−βt)'], ['α', '3.55 hr⁻¹', 'the exponent αt = 3.55 × 4 = 14.2'], ['β', '0.15 hr⁻¹', 'the exponent βt = 0.15 × 4 = 0.6'], ['t', '4 hours', 't in both exponentials']],
 check:{t:'By 4 hours the fast α term has vanished, so the level is the B term alone; 0.6 in the exponent leaves 0.5488 of the 3.13 mg/L B intercept: 1.72 mg/L, below 3.13 and above zero.', lo:0, hi:3.13},
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
   why:'An infusion alone takes three to five half-lives to reach steady state. A loading dose puts the steady-state amount, Css × VD (the steady-state concentration times the apparent volume of distribution), into the body at once, so the therapeutic level is there from the start and the infusion then holds it.'},
  {t:'To reduce the adverse effects associated with the drug', correct:false,
   why:'Picking this reads a dosing device as a safety device. A loading dose raises the concentration faster, which brings any concentration-related adverse effect forward rather than reducing it. Total exposure at steady state is unchanged, because the plateau Css = {{frac:R|Cl}} depends on the infusion rate R and clearance Cl, not on the loading dose.'},
  {t:'To improve patient adherence', correct:false,
   why:'This answer confuses a kinetic quantity with a behavioural one. Adherence concerns how reliably a patient takes a regimen over days or weeks. A loading dose is a one-time amount, Css × VD, chosen so the target level exists from the first minute; it says nothing about how reliably later doses are taken.'},
  {t:'To reduce the elimination half-life', correct:false,
   why:'Picking this reads the half-life as something a dose can shorten. The half-life is a property of the drug and the patient, set by k = {{frac:Cl|VD}}, where k is the elimination rate constant. No dose changes k, Cl or VD; a loading dose only changes how soon the target concentration is reached.'}],
 teach:[
  {h:'The idea', list:[
   'The time to steady state is set by the half-life alone: about five half-lives, whatever the rate.',
   'When that wait is too long, a loading dose DL = Css × VD supplies the steady-state amount at once.',
   'DL = Css × VD because Cp = {{frac:DB|VD}}: the amount in the body at the plateau is the target concentration times the volume it spreads through. The same dose comes from DL = {{frac:R|k}}, since Css = {{frac:R|kVD}}; her In-Class IV Infusions key shows both routes giving 320 mg (slide "IV Bolus Loading Dose and Continuous IV Infusion").',
   'With the right loading dose the level stays flat at Css: the bolus part falls as C0e^(−kt) while the infusion part rises as Css(1 − e^(−kt)), and the two add to Css at every time. Her In-Class IV Infusions question 2: 13.2 + 6.8 = 20 mg/L at 3 hours.',
   'The infusion rate is unchanged by the loading dose; it still sets the level that is held, Css = {{frac:R|Cl}}. A 500 mg or a 750 mg loading dose with the same 75 mg/hr infusion gives the same 36.1 mg/L at steady state (In-Class IV Infusions question 5).']}],
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
 asks:'Cp',
 givens:[['VD', '22 L', 'the denominator of k = {{frac:Cl|VD}}'], ['Cl', '3.2 L/hr', 'the numerator of k = {{frac:3.2|22}} = 0.1455 hr⁻¹'], ['C(stop)', '14 mg/L', 'the level the decay starts from'], ['t', '5 hours following cessation', 't in e^(−kt)']],
 check:{t:'k = 0.1455 hr⁻¹ is a half-life a little under 5 hours, so 5 hours is just over one half-life and a bit under half of 14 mg/L remains: 6.8 mg/L, below 14.', lo:0, hi:14},
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
   why:'Css = {{frac:R|Cl}}, where Css is the steady-state concentration, R the infusion rate and Cl clearance. At the plateau the rate in, R, equals the rate out, Cl × Css; clearance is a constant for the patient, so a larger R must be balanced by a larger Css. Doubling the rate doubles Css.'},
  {t:'The time to reach steady-state increases', correct:false,
   why:'Picking this reads a higher plateau as a longer climb. The approach to steady state follows 1 − e^(−kt), where k is the elimination rate constant, and has no rate term, so it is complete in three to five half-lives whatever the rate. A faster infusion climbs to a higher level in the same time.'},
  {t:'Steady-state concentration decreases', correct:false,
   why:'This answer runs the direction of Css = {{frac:R|Cl}} backwards. More drug in per hour against the same clearance means a higher level, not a lower one: the rate out, Cl × Css, can only match a larger R if Css rises.'},
  {t:'The time to reach steady-state decreases', correct:false,
   why:'Picking this reads a faster input as a shorter wait. The rate changes the height of the plateau, never how long the plateau takes: the fraction of steady state reached, 1 − e^(−kt), depends on k alone, so three to five half-lives are needed at any rate. A higher rate is simply a higher plateau.'}],
 teach:[
  {h:'The idea', list:[
   'The infusion rate sets the level: Css = {{frac:R|Cl}}.',
   'The half-life sets the time: about five half-lives to steady state, independent of the rate.',
   'The fraction of Css reached after a time t is 1 − e^(−kt), which holds k and t only: 50 per cent after one half-life, 75 after two, 87.5 after three, 90 at 3.3 half-lives and 95 at 4.32 (slide "Drug Concentration Prior to Reaching Steady-State"; Chapter 6, Table 6-1). R is not in it, so a faster infusion climbs to a higher plateau over the same time.',
   'Rate in equals rate out at the plateau: R = Cl × Css. Clearance belongs to the patient and the drug, so the only quantity free to balance a larger R is Css.',
   'The same question was her poll on 2 September and then a graded item.']}],
 cite:'Canvas Quiz 2 (Modules 2–3), question 6; 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State"'},

{id:'cq2-7', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'rate', concept:'rate-for-target-css', skill:'infusion',
 stem:'Recommend an infusion rate to achieve a steady-state concentration of 23 mcg/mL for an agent with an apparent volume of distribution of 15 L and half-life of 4 hr. Round to the nearest whole number.',
 units:'mg/hr', answer:60, tol:1.2,
 steps:[
  {k:'setup', t:'R = Css × Cl = Css × k × VD',
   why:'At steady state the rate in, R, equals the rate out, clearance Cl times the steady-state concentration Css, so R = Css × Cl. Clearance is not given, so it is built as Cl = k × VD, where k is the elimination rate constant and VD the apparent volume of distribution.'},
  {k:'unit', t:'23 mcg/mL = 23 mg/L',
   why:'Multiplying numerator and denominator by 1000 turns mcg/mL into mg/L, so the concentration multiplies a volume in litres to give milligrams, which is what mg/hr needs.'},
  {k:'algebra', t:'k = {{frac:0.693|4 hr}} = 0.1733 hr⁻¹; Cl = 0.1733 × 15 L = 2.599 L/hr',
   why:'The first-order relation t½ = {{frac:0.693|k}} is rearranged to k = {{frac:0.693|t½}}, so 0.693 divided by 4 hr gives 0.1733 hr⁻¹, the fraction of the drug removed each hour. Clearance is then Cl = k × VD: 0.1733 hr⁻¹ times 15 L, and hr⁻¹ times L gives L/hr, so 2.599 L/hr.'},
  {k:'algebra', t:'R = 23 mg/L × 2.599 L/hr = 59.8 mg/hr',
   why:'The target concentration in mg/L multiplies the clearance in L/hr: 23 × 2.599 = 59.8. The litres in the denominator of mg/L cancel the litres in the numerator of L/hr, leaving mg/hr, an amount of drug per hour, which is what an infusion rate is.'},
  {k:'round', t:'60 mg/hr',
   why:'Rounding 59.8 mg/hr to the nearest whole number gives 60 mg/hr, because 0.8 rounds up. Her key is 60 with a margin of 2%, which is 1.2 mg/hr either way, so any answer from 58.8 to 61.2 scores. A whole number was asked for.'}],
 setup:{eq:'css', pre:['thalf-first', 'cl-k-vd'], why:'"infusion rate" to reach a "steady-state concentration" names the infusion block. Css, VD and t½ are given and R is asked, so Css = {{frac:R|Cl}} is rearranged to R = Css·Cl. k first, from the half-life, then Cl = k·VD, because the line wants Cl, not VD and t½.'},
 asks:'R',
 givens:[['Css', '23 mcg/mL', 'written 23 mg/L, multiplied by clearance'], ['VD', '15 L', 'in Cl = kVD = 0.1733 × 15 = 2.599 L/hr'], ['t½', '4 hr', 'gives k = {{frac:0.693|4}} = 0.1733 hr⁻¹']],
 check:{t:'Clearance is 2.599 L/hr, and holding 23 mg in each litre cleared needs 23 × 2.599 = 59.8 mg/hr, so about 60 mg/hr. The rate is above zero.', lo:0},
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
   why:'At steady state the infusion rate R equals the elimination rate, which is clearance Cl times the steady-state concentration Css, so Css = {{frac:R|Cl}}. Clearance is not given, so it is built as Cl = k × VD, where k is the elimination rate constant and VD the apparent volume of distribution for this patient.'},
  {k:'unit', t:'154 {{frac:lb|2.2}} = 70 kg; VD = 0.21 L/kg × 70 kg = 14.7 L',
   why:'The volume is given per kilogram and the weight in pounds, so the weight is converted first and then scaled. Age and sex are stated and not used.'},
  {k:'algebra', t:'k = {{frac:0.693|4 hr}} = 0.1733 hr⁻¹; Cl = 0.1733 × 14.7 L = 2.547 L/hr',
   why:'The first-order relation t½ = {{frac:0.693|k}} rearranges to k = {{frac:0.693|t½}}: 0.693 divided by 4 hr gives 0.1733 hr⁻¹, the fraction removed each hour. Clearance is then k × VD with the 14.7 L from the unit step: 0.1733 hr⁻¹ × 14.7 L = 2.547 L/hr, since hr⁻¹ times L is L/hr.'},
  {k:'algebra', t:'Css = {{frac:38 mg/hr|2.547 L/hr}} = 14.92 mg/L',
   why:'The infusion rate in mg/hr is divided by the clearance in L/hr: 38 divided by 2.547 gives 14.92. The per-hour in the numerator cancels the per-hour in the denominator, leaving milligrams per litre, a concentration, which is what Css must be.'},
  {k:'round', t:'14.9 mg/L',
   why:'Rounding 14.92 mg/L to one decimal place gives 14.9 mg/L, because the second decimal, 2, rounds down. Her key is 14.9 with a margin of 2%, which is 0.3 mg/L either way, so any answer from 14.6 to 15.2 scores. One decimal place was asked for.'}],
 setup:{eq:'css', pre:['thalf-first', 'cl-k-vd'], why:'"continuous intravenous infusion at a rate of" names the infusion block. R, t½ and a per-kilogram VD are given and the "steady-state concentration" is asked, so Css = {{frac:R|Cl}}. k first, from the half-life, then Cl = k·VD, because the line wants Cl; the weight-based VD is a unit step, not an equation.'},
 asks:'Css',
 givens:[['R', '38 mg/hr', 'the numerator'], ['age', '60 year-old', 'not needed: age does not enter Css'], ['weight', '154 pound', 'converted: {{frac:154|2.2}} = 70 kg, scales VD'], ['t½', '4 hours', 'gives k = {{frac:0.693|4}} = 0.1733 hr⁻¹'], ['VD', '0.21 L/kg', 'scaled to 70 kg: 14.7 L; Cl = kVD = 2.547 L/hr']],
 check:{t:'Each hour 38 mg enters and 2.547 L is cleared, so the plateau is {{frac:38|2.547}}, about 15 mg/L: 14.9 mg/L, above zero.', lo:0},
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
   why:'Picking this takes movement of drug for a change in the drug. Distribution is the reversible movement of unchanged drug between plasma and tissues; the molecule is the same on both sides. Biotransformation changes the molecule itself, converting the drug into a metabolite, and is irreversible.'},
  {t:'excretion', correct:false,
   why:'Picking this takes one elimination process for the other. Excretion removes the drug from the body intact, in urine, bile or breath; it is elimination without chemical change. Biotransformation is the other half of elimination, the chemical conversion of the drug into a metabolite, which is what the stem describes.'},
  {t:'absorption', correct:false,
   why:'Picking this reads entry into the body as conversion within it. Absorption is the movement of unchanged drug from the site of administration into the systemic circulation; nothing is chemically altered on the way. Biotransformation is a chemical change, the drug converted to a metabolite, and it belongs to elimination, not to input.'}],
 teach:[
  {h:'The idea', list:[
   'Elimination = excretion + biotransformation. Both remove the parent drug irreversibly; only biotransformation changes the molecule.',
   'Distribution and absorption move unchanged drug and are not elimination.',
   'The kidney and the liver are the two major elimination organs, the kidney by excretion and the liver by metabolism (slides "Drug Elimination" and "Hepatic (Metabolic) Clearance"). Biotransformation of an oral dose before it reaches the general circulation is the first-pass effect, which lowers bioavailability (Introduction slide "Key Terms").',
   'The definitions on her slide are the ones she quotes in a stem and asks the term for; here the words "chemically converted" settle it.']}],
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
   why:'Picking this treats the half-life as an independent property of the drug. It is set by two quantities: t½ = {{frac:0.693 × VD|Cl}}, with VD the volume of distribution and Cl the total body clearance. With VD held fixed, a change in Cl must move t½, and an increase in Cl shortens it.'}],
 note:'The stem pairs renal dysfunction with an increase in clearance. Her keyed answer follows the stated increase in clearance; it is the Cl to t½ relation that is tested, not the usual direction of renal disease.',
 teach:[
  {h:'The idea', list:[
   'k = {{frac:Cl|VD}} and t½ = {{frac:0.693|k}}, so t½ = {{frac:0.693 × VD|Cl}}.',
   'Clearance up, half-life down; clearance down, half-life up, as long as VD holds. The half-life is the time to remove half of the drug and clearance is how fast drug is removed, so faster removal takes less time.',
   'Cl = kVD is the line she expects without the sheet (slide "Clearance, Elimination Half-Life, and Volume of Distribution"), and 0.693 is ln 2, because the half-life is the time for the level to fall to half.',
   'Her Module 4 example of the direction: an antibiotic with VD 25 L has a clearance of 750 mL/min in a normal adult and 150 mL/min in partial renal failure, so its half-life is five times longer in the renal-failure patient; renal disease usually lowers clearance and lengthens the half-life.',
   'Read the direction the stem gives for clearance before deciding; do not substitute the direction renal disease usually takes.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 2; 4---Clearance-and-Elimination.pdf slide 21'},

{id:'cq3-3', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'peak', concept:'tmax-depends-on', skill:'recall', dupOf:'m5-c15',
 stem:'Which statement is true regarding the time needed to reach the maximum concentration following administration of an oral dose?',
 options:[
  {t:'the time needed to reach the maximum concentration depends on the rate constants for absorption and elimination', correct:true,
   why:'tmax = {{frac:ln(ka/k)|ka − k}}. Only the two rate constants appear; dose, F and VD scale the curve without moving its peak in time.'},
  {t:'the time needed to reach the maximum concentration is independent of the rate constants for absorption and elimination', correct:false,
   why:'Picking this reverses the relation. tmax (the time to peak) = {{frac:ln(ka/k)|ka − k}}, with ka the absorption rate constant and k the elimination rate constant, so the two rate constants are the only quantities tmax depends on. Dose, F and VD multiply the whole curve and do not appear.'},
  {t:'the time needed to reach the maximum concentration increases if the dose is increased', correct:false,
   why:'Picking this reads the peak as a level the dose must fill, so a bigger dose should take longer to reach it. The dose multiplies the whole curve: a larger dose raises Cmax (the peak concentration) in proportion and leaves tmax where it was, because both rates scale together and cross at the same moment.'},
  {t:'the time needed to reach the maximum concentration increases if the dose is decreased', correct:false,
   why:'Picking this treats the dose as a quantity that sets the time of the peak. A smaller dose lowers Cmax (the peak concentration) in proportion and leaves tmax unchanged: tmax = {{frac:ln(ka/k)|ka − k}} contains ka, k and nothing else, so no change in dose, up or down, can move it.'}],
 teach:[
  {h:'The idea', list:[
   'tmax is set by ka and k alone. Cmax is set by dose, F, VD and the two rate constants.',
   'Changing the dose moves Cmax and AUC in proportion and leaves tmax unchanged, because the dose multiplies both the absorption rate and the elimination rate by the same amount, so the two rates still cross at the same moment.',
   'Her Module 5 slide "Changing Dose" draws several doses on one plot: tmax does not move and the AUC rises in direct proportion to the dose. The same point was her opening poll for multiple oral doses: increasing an oral dose gives no change in tmax.',
   'She pairs this with the Cmax item below: at the peak, absorption rate equals elimination rate.']}],
 cite:'Canvas Quiz 3 (Modules 4–5), question 3; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Cp vs. Time for a Single Oral Dose"'},

{id:'cq3-4', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'peak', concept:'rates-equal-at-cmax', skill:'recall', dupOf:'fig-oral-3',
 stem:'Which of the following is true regarding the Cmax following oral administration?',
 options:[
  {t:'the rate of drug absorption equals the rate of drug elimination', correct:true,
   why:'At the peak the concentration is momentarily not changing, so drug is entering the body exactly as fast as it is leaving. That balance is what defines the maximum.'},
  {t:'the rate of drug elimination is faster than the rate of drug absorption', correct:false,
   why:'Picking this takes the whole falling limb for the peak itself. Elimination faster than absorption describes every moment after the peak, when the concentration is falling. At the peak, tmax, the two rates are exactly equal; that is why the concentration stops rising there and starts to fall only afterwards.'},
  {t:'the rate of drug absorption is faster than the rate of drug elimination', correct:false,
   why:'Picking this takes the rising limb for the peak. Absorption faster than elimination describes every moment before the peak, when more drug enters each hour than leaves and the concentration rises. At Cmax (the peak concentration) the two rates have just become equal, so the concentration is neither rising nor falling.'},
  {t:'drug at the absorption site has become depleted', correct:false,
   why:'Picking this places the end of absorption at the peak. Absorption is still running at tmax: drug remains at the absorption site and keeps entering, which is why the fall after the peak is slower than pure elimination would be. The site empties later, and only then is the curve elimination alone.'}],
 teach:[
  {h:'The idea', list:[
   'Before tmax, absorption outpaces elimination and the curve rises. After tmax, elimination outpaces absorption and the curve falls.',
   'At tmax the two rates are equal and the curve is flat for an instant.',
   'Why they are equal there: the amount in the body changes at the rate in minus the rate out, dDB/dt = rate of absorption − rate of elimination (slide "First-Order Absorption Model"). At the peak the concentration is momentarily not changing, so that difference is zero and the two rates match.',
   'Both rates are first order: absorption at ka times the amount still at the absorption site, elimination at k times the amount in the body. The first falls as the site empties and the second rises as the body fills, which is why they cross once, at tmax.',
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
   why:'The tmax equation takes rate constants, not half-lives, so each half-life is converted with k = {{frac:0.693|t½}}: ka (the absorption rate constant) from the 0.8-hour absorption half-life and k (the elimination rate constant) from the 5.6-hour elimination half-life. 0.693 over hours gives hr⁻¹ for both, so they can be subtracted.'},
  {k:'algebra', t:'tmax = {{frac:ln(0.8663 / 0.1238)|0.8663 − 0.1238}} = {{frac:ln 7.0|0.7425 hr⁻¹}} = {{frac:1.9459|0.7425 hr⁻¹}} = 2.621 hr',
   why:'The ratio of the rate constants is the ratio of the half-lives the other way round, 5.6/0.8 = 7, so the logarithm is ln 7. Dividing by reciprocal hours leaves hours.'},
  {k:'round', t:'2.6 hr',
   why:'tmax = 2.621 hr rounds to 2.6 hr at one decimal place, as the stem asks. Her key is 2.6 with a margin of 3%, so 2.52 to 2.68 scores. The peak comes early relative to the 5.6-hour elimination half-life because absorption, with a 0.8-hour half-life, is the faster of the two processes.'}],
 setup:{eq:'tmax', pre:['thalf-abs', 'thalf-first'], why:'"single 1000-mg oral dose" with an "absorption half-life" and an "elimination half-life" names the oral block of Module 5. The two half-lives are given and the time of the "maximum concentration" is asked, so tmax = {{frac:ln(ka ÷ k)|ka − k}}. ka and k first, from the half-lives; F, VD and the dose are not used.'},
 asks:'tmax',
 givens:[['D0', '1000-mg oral dose', 'not needed: tmax does not depend on the dose'], ['F', '83%', 'not needed: F scales the height of the curve, not its timing'], ['VD', '18 L', 'not needed: tmax has no volume in it'], ['absorption t½', '0.8 hours', 'gives ka = {{frac:0.693|0.8}} = 0.8663 hr⁻¹'], ['t½', '5.6 hours', 'gives k = {{frac:0.693|5.6}} = 0.1238 hr⁻¹']],
 check:{t:'Absorption half-life 0.8 hr against elimination 5.6 hr, 7 times slower: the peak comes a few absorption half-lives in and well before one elimination half-life of 5.6 hr: 2.6 hr.', lo:0},
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
   why:'Cl (clearance) is not given, so it is built as k × VD: k (the elimination rate constant) = {{frac:0.693|6.0 hr}} = 0.1155 hr⁻¹ from the half-life, and VD (the volume of distribution) is 23 L. hr⁻¹ × L gives L/hr, the volume of plasma cleared of drug each hour: 0.1155 × 23 = 2.657 L/hr.'},
  {k:'algebra', t:'AUC = {{frac:500 mg|2.657 L/hr}} = 188.2 (mg/L)hr',
   why:'mg divided by L/hr is mg·hr/L, which is a concentration times a time, the unit of an area under a concentration curve.'},
  {k:'round', t:'188.2 (mg/L)hr',
   why:'Her key is 188.2 with a margin of 3%, so 182.6 to 193.8 scores. The same answer comes from C0/k: C0 = 500/23 = 21.74 mg/L, and 21.74/0.1155 = 188.2.'}],
 setup:{eq:'cl-auc', pre:['thalf-first', 'cl-k-vd'], why:'"IV bolus dose" with a VD and a "half-life" names the clearance block of Module 4. D0, VD and t½ are given and the AUC is asked, so Cl = {{frac:D0|AUC}} is rearranged to AUC = {{frac:D0|Cl}}. k first, from the half-life, then Cl = k·VD, because the line wants Cl; the 75 kg is not used.'},
 asks:'AUC',
 givens:[['D0', '500-mg IV bolus', 'the numerator'], ['VD', '23 L', 'in Cl = kVD = 0.1155 × 23 = 2.657 L/hr'], ['t½', '6.0 hr', 'gives k = {{frac:0.693|6.0}} = 0.1155 hr⁻¹'], ['weight', '75 kg', 'not needed: dose and volume are already whole-patient values']],
 check:{t:'C0 = {{frac:500|23}} is about 22 mg/L and AUC = {{frac:C0|k}} = {{frac:22|0.1155}}, which also comes to about 188 (mg/L)hr, agreeing with the clearance route.', lo:0},
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
   why:'Renal clearance (ClR) is the amount excreted unchanged over the whole time course, Du∞, divided by the total AUC (area under the curve). The 48-hour collection is {{frac:48 hr|3 hr}} = 16 half-lives, so essentially all the drug has been eliminated and 713 mg is the total excreted unchanged.'},
  {k:'algebra', t:'k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹; AUC = {{frac:1000 mg|0.231 hr⁻¹ × 19 L}} = {{frac:1000|4.389}} = 227.8 (mg/L)hr',
   why:'The total AUC (area under the curve) is {{frac:D0|Cl}}, with Cl = k × VD. k (the elimination rate constant) = {{frac:0.693|3 hr}} = 0.231 hr⁻¹ from the half-life, and VD (the volume of distribution) is 19 L, so Cl = 0.231 × 19 = 4.389 L/hr. mg over L/hr leaves (mg/L)hr: {{frac:1000|4.389}} = 227.8.'},
  {k:'algebra', t:'ClR = {{frac:713 mg|227.8 (mg/L)hr}} = 3.13 L/hr',
   why:'ClR (renal clearance) = {{frac:Du∞|AUC}}, where Du∞ is the 713 mg recovered unchanged: mg divided by (mg/L)hr leaves L/hr, the volume of plasma cleared by the kidney each hour. The same answer comes from fe × ClT, with fe = {{frac:713|1000}} = 0.713 the fraction excreted unchanged: 0.713 × 4.389 = 3.13 L/hr.'},
  {k:'round', t:'3.13 L/hr',
   why:'ClR = 3.13 L/hr at two decimal places, as the stem asks. Her key is 3.13 with a margin of 3%, so 3.04 to 3.22 scores. Renal clearance is 3.13 of the 4.389 L/hr total, which matches fe = 0.713: the kidney accounts for about 71 per cent of elimination and the remainder is non-renal.'}],
 setup:{eq:'none', pre:['thalf-first', 'cl-k-vd', 'cl-auc'], why:'"IV bolus injection" with "unchanged drug was recovered" names the renal clearance block of Module 4. D0, VD, t½ and Du∞ are given and "renal clearance" is asked. No catalog line is Du∞ over an area; the working uses ClR = {{frac:Du∞|AUC}} with AUC = {{frac:D0|Cl}}, Cl = k·VD and k from the half-life, which equals ClR = fe·ClT.'},
 asks:'ClR',
 givens:[['D0', '1,000 mg', 'the numerator of AUC = {{frac:D0|kVD}}'], ['VD', '19 L', 'in Cl = kVD = 0.231 × 19 = 4.389 L/hr'], ['t½', '3 hours', 'gives k = {{frac:0.693|3}} = 0.231 hr⁻¹'], ['collection', '48 hours', 'not needed for the number: 16 half-lives, so the urine holds all unchanged drug'], ['Du∞', '713 mg', 'the numerator of ClR = {{frac:Du∞|AUC}}']],
 check:{t:'The kidney removed {{frac:713|1000}} of the dose, so renal clearance is that fraction of the total 4.389 L/hr, a little over 3 L/hr: 3.13 L/hr, below the total.', lo:0, hi:4.389},
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
   why:'VD = {{frac:F × D0 × ka|30 × (ka − k)}}: the numerator 0.82 × 500 mg × 0.934 hr⁻¹ = 382.9 mg hr⁻¹, the denominator 30 mg/L × (0.934 − 0.133) hr⁻¹ = 30 × 0.801 = 24.03 (mg/L) hr⁻¹. The hr⁻¹ cancels top and bottom, and mg over mg/L leaves litres: {{frac:382.9|24.03}} = 15.94 L.'},
  {k:'round', t:'15.9 L',
   why:'VD = 15.94 L rounds to 15.9 L at one decimal place. Her key is 15.9 with a margin of 3%, so 15.4 to 16.4 scores. Leaving F out of the numerator gives {{frac:15.94|0.82}} = 19.4 L, too large; swapping ka and k makes (ka − k) negative and gives a negative volume, which cannot be right.'}],
 setup:{eq:'oral-cp', pre:[], why:'"oral administration of a single 500-mg dose" fitting a "one-compartment model" with a printed equation names the oral block. The coefficient, both exponents, F and D0 are given and VD is asked, so the prefactor F·ka·{{frac:D0|VD(ka − k)}} of the oral Cp line is set equal to 30 and rearranged for VD. No hinge; ka is the larger exponent.'},
 asks:'VD',
 givens:[['D0', '500-mg dose', 'in the numerator F D0 ka'], ['coefficient', '30', 'in the denominator 30 × (ka − k)'], ['k', '0.133', 'the smaller exponent, elimination; in ka − k'], ['ka', '0.934', 'the larger exponent, absorption; in the numerator and in ka − k'], ['F', '82%', 'written 0.82, in the numerator'], ['units', 'mcg/mL for Cp and hr for time', 'mcg/mL = mg/L, so mg over mg/L gives litres']],
 check:{t:'The prefactor {{frac:F D0 ka|VD(ka − k)}} is 30 mg/L and ka over (ka − k) is a little above 1, so VD is a little above {{frac:0.82 × 500|30}}, roughly 14 L: 15.9 L, above zero.', lo:0},
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
   why:'Picking this treats the MEC as something a regimen can move. The minimum effective concentration (MEC) is a property of the drug and the response it produces, fixed for a given patient. Dosing does not lower it; dosing raises the plasma level so that it reaches the MEC and stays above it between doses.'},
  {t:'to decrease the rate of elimination of drug from the body', correct:false,
   why:'Picking this reads repeated dosing as a brake on elimination. Elimination is set by clearance, a property of the patient and the drug, which the schedule cannot change. A repeated dose replaces the drug that elimination has removed since the last dose; the fraction removed each hour is the same as after a single dose.'},
  {t:'to increase the clearance of drugs', correct:false,
   why:'Picking this takes a parameter of the patient for an aim of the regimen. Clearance belongs to the patient and the drug, not to the schedule, so no regimen can raise it; and a higher clearance would lower the plasma levels, the opposite of what the regimen is for.'}],
 teach:[
  {h:'The idea', list:[
   'Her drawing on the single-dose curve adds two lines, the minimum toxic concentration (MTC) above and the minimum effective concentration (MEC) below: "our goal is that we want to stay in between these two lines."',
   'A single dose stays between them only for a while, because first-order elimination carries the level back below the MEC. Multiple doses, or an infusion, replace what is eliminated and hold the level there.',
   'Dose and interval are then chosen so that the steady-state peak stays below the MTC and the trough above the MEC (6a slide "Consider Peak and Trough").',
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
 asks:'Cmaxss',
 givens:[['D0', '17 mg/kg', 'scaled to 75 kg: 1275 mg, the numerator of C0'], ['weight', '75 kg', 'scales both the dose and the volume'], ['τ', 'every 8 hours', 'the exponent kτ = 0.1733 × 8 = 1.386'], ['t½', '4 hours', 'gives k = {{frac:0.693|4}} = 0.1733 hr⁻¹'], ['VD', '15% of body weight', 'scaled to 75 kg: 11.25 L, the denominator of C0']],
 check:{t:'C0 is {{frac:17|0.15}} = 113.3 mg/L per dose and 8 hours is two half-lives, so a quarter is left at each new dose; the peak is C0 over 0.750, a third more than 113.3: 151.1, between 113.3 and 2 × 113.3.', lo:113.3, hi:226.6},
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
   why:'Picking this treats clearance as a dosing choice. Clearance (Cl) belongs to the patient and the drug; a regimen can change only the dose and the interval. A higher clearance would also lower the level, since Cavg∞ (the average steady-state concentration) = {{frac:F D0|Cl × τ}}, with F the bioavailable fraction, D0 the dose and τ the interval.'},
  {t:'decrease the elimination half-life', correct:false,
   why:'Picking this treats the half-life as something the prescriber sets. The half-life is a property of the drug in the patient, {{frac:0.693|k}} with k the elimination rate constant, not a dosing choice. A shorter half-life would also mean faster loss between doses and a lower steady-state level, the opposite of what is asked.'}],
 teach:[
  {h:'The idea', list:[
   'Her rule: the only things a regimen can change are the size of the dose and the dosing interval; clearance and half-life are not choices.',
   'Slide "Altering Dosing Interval": decreasing the interval increases steady-state concentrations and decreases the peak-to-trough fluctuation, at the cost of compliance.',
   'Why the interval does it: Cavg∞ = {{frac:F D0|Cl × τ}} has τ in the denominator, so a shorter interval raises the average; and a shorter interval leaves more of each dose in the body when the next arrives, e^(−kτ) larger, so the accumulation factor {{frac:1|1 − e^(−kτ)}} and the peak rise as well.',
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
 asks:'Cp',
 givens:[['D0', 'Four hundred milligrams', 'with the infusion time gives R = {{frac:400|2}} = 200 mg/hr'], ['infusion time', 'over a period of 2 hours', 'R = 200 mg/hr; t = 2 hr in 1 − e^(−kt)'], ['second start', 'Eight hours after the start of the first infusion', 'the second infusion runs 8 to 10 hr'], ['t½', 'approximately 4 hours', 'gives k = {{frac:0.693|4}} = 0.1733 hr⁻¹'], ['VD', 'approximately 20 L', 'in Cl = kVD = 3.465 L/hr'], ['t', '4 hours after the cessation of the second infusion', 'the second term decays 4 hr, the first 12 hr']],
 check:{t:'Each infusion ends at 16.90 mg/L. Four hours is one half-life, so the second leaves 8.45; the first, 12 hours or three half-lives on, leaves an eighth, 2.11. The sum is between 8.45 and 2 × 16.90.', lo:8.45, hi:33.8},
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
   why:'Picking this reads a larger dose as a slower climb to the peak. tmax∞ (the time of the peak within an interval at steady state) depends on ka (the absorption rate constant), k (the elimination rate constant) and τ (the dosing interval) only. The dose multiplies the whole curve and does not move the peak time.'},
  {t:'Decreased rate of absorption', correct:false,
   why:'Picking this treats the absorption rate constant as adjustable by the dose. ka (the absorption rate constant) is a property of the drug and the dosage form. A larger dose means more drug absorbed per hour at the same ka, since the rate is ka × the amount at the absorption site.'},
  {t:'Increased steady-state Cmax', correct:true,
   why:'Every concentration in the regimen scales with the dose, so the steady-state peak rises in proportion. Slide "Altering Dose": increasing the dose increases steady-state concentrations and the peak-to-trough fluctuation.'},
  {t:'Decreased clearance', correct:false,
   why:'Picking this takes the amount cleared per hour for the clearance. Clearance (Cl) is the volume of plasma cleared of drug per hour, a property of the patient and the drug. A larger dose raises the concentration and so the amount removed per hour, Cl × concentration, but Cl itself does not change.'}],
 teach:[
  {h:'The idea', list:[
   'Dose up: higher Cmax, Cmin and Cavg, a bigger swing between peak and trough, usually no change in compliance.',
   'Dose does not move tmax (her poll: "no change in the tmax"), ka or clearance.',
   'Why the swing grows with the dose: Dmax∞ − Dmin∞ equals the dose (Chapter 9, section "Repetitive Intravenous Injections"), so the gap between peak and trough scales with the dose, as every concentration in the regimen does.',
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
 asks:'tmaxss',
 givens:[['weight', '74-kg', 'not needed: tmax∞ has no volume in it'], ['D0', '750 mg', 'not needed: tmax∞ does not depend on the dose'], ['τ', 'every 8 hours', 'in 1 − e^(−kτ) and 1 − e^(−kaτ)'], ['F', '92%', 'not needed: F scales the height of the curve, not its timing'], ['VD', '0.29 L/kg', 'not needed'], ['t½', '5 hours', 'gives k = {{frac:0.693|5}} = 0.1386 hr⁻¹'], ['absorption t½', '1.5 hour', 'gives ka = {{frac:0.693|1.5}} = 0.462 hr⁻¹']],
 check:{t:'The steady-state peak must fall inside the 8-hour interval and comes earlier than a first-dose peak, since drug from earlier doses is being eliminated while the new dose absorbs: 2.6 hours, between 0 and 8.', lo:0, hi:8},
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
   why:'Picking this treats a route of administration as a change to a drug property. The elimination half-life is {{frac:0.693|k}}, with k (the elimination rate constant) set by clearance and volume of distribution, both properties of the drug in the patient. Infusing rather than injecting changes how fast drug enters, not how fast it leaves.'},
  {t:'concentrations of drug in the body following multiple infusions are additive', correct:true,
   why:'This is superposition applied to infusions: each infusion is worked as a single infusion, decays from its own end, and the concentrations are added. It is the assumption behind every two-infusion calculation.'},
  {t:'intermittent IV infusion is the best way to very rapidly achieve high drug concentrations', correct:false,
   why:'Picking this reverses the rationale for infusing. Spreading a dose over time is done to prevent high concentrations and their side effects; the concentration at the end of an infusion is lower than the peak the same dose would give as a bolus. A loading bolus, not an infusion, reaches a high level quickly.'}],
 teach:[
  {h:'The idea', list:[
   'Rationale slide: prevent high drug concentrations and accompanying side effects; many drugs are better tolerated when infused slowly over time than by IV bolus.',
   'Assumption: concentrations from successive infusions add (superposition), and each infusion follows the single-infusion equation with the same R, k and VD.',
   'Why they add: elimination is first order, so the drug from each infusion is removed at the same fraction per hour whether or not the other is present, and each declines on its own clock from its own end. It is the same assumption as for repeated IV bolus doses (slide "Superposition").',
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
 asks:'D0',
 givens:[['τ', 'every 8 hours', 'multiplies clearance: Cl × τ = 3.0 × 8 = 24 L'], ['F', '83%', 'written 0.83, the denominator'], ['absorption t½', '90 minutes', 'not needed: the average concentration does not depend on ka'], ['Cl', '3.0 L/hr', 'in the numerator with τ'], ['VD', 'approximately 25 L', 'not needed: clearance is given'], ['Cavg∞', '25 mg/L', 'the target, in the numerator']],
 check:{t:'Holding 25 mg/L while 24 L is cleared per interval needs 600 mg absorbed; with only 0.83 of the dose absorbed, the dose must be larger than 600 mg: {{frac:600|0.83}} = 723 mg.', lo:600},
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
   why:'With equal doses the dose ratio is {{frac:500|500}} = 1 and drops out, leaving Fabs = {{frac:AUCpo|AUCIV}}. Both areas are in (mg/L)hr, so the unit cancels and F is a dimensionless fraction: {{frac:139|180.4}} = 0.771. The oral area is 77 per cent of the IV area, so 77 per cent of the oral dose reached the circulation.'},
  {k:'round', t:'0.77',
   why:'Her key is 0.77 with a margin of 3%, so 0.75 to 0.79 scores. Two decimal places were asked for, as a decimal, not a percentage.'}],
 setup:{eq:'f-abs', pre:['thalf-first', 'cl-k-vd', 'div-cl-auc'], why:'"absolute bioavailability" with an oral AUC, t½ and VD and no IV AUC, so the bioavailability block. The IV AUC is not given, so it comes from DIV = Cl × AUCIV with Cl = k × VD; then Fabs is the ratio of the two areas, the doses being equal.'},
 asks:'F',
 givens:[['D0', '500 mg', 'the numerator of AUCIV = {{frac:DIV|Cl}}; the dose ratio is 1'], ['AUCpo', '139 (mg/L)hr', 'the numerator of the area ratio'], ['t½', '4.5 hr', 'gives k = {{frac:0.693|4.5}} = 0.154 hr⁻¹'], ['VD', '18 L', 'in Cl = kVD = 0.154 × 18 = 2.772 L/hr']],
 check:{t:'Clearance 2.772 L/hr means the 500 mg would give 180.4 (mg/L)hr if all of it reached the blood; the oral 139 is about three-quarters of that, so F is about 0.77, between 0 and 1.', lo:0, hi:1},
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
   why:'Picking this takes a two-product comparison for the comparison against IV. Bioequivalence compares a test product with a reference product of the same drug in both rate and extent, and neither product is the IV dose. The stem names intravenous administration as the comparator, which is the mark of absolute bioavailability.'},
  {t:'Relative Bioavailability', correct:false,
   why:'Picking this reads the IV comparison as a comparison between two ordinary products. Relative bioavailability compares two formulations or routes against a reference that is not the IV dose, such as a tablet against an oral solution. The stem sets the extravascular dose against the same drug given intravenously, which makes the comparison absolute.'},
  {t:'Drug Product Performance', correct:false,
   why:'Picking this takes the broad opening term for the specific comparison. Drug product performance is the release of the drug from the product and its subsequent absorption, and it describes one product on its own. The stem describes a ratio between an extravascular route and the IV route, which is absolute bioavailability.'}],
 teach:[
  {h:'The idea', list:[
   'Absolute: against IV. Relative: against another product or route. Bioequivalence: two products of the same drug compared in both rate and extent.',
   'The IV dose is the reference because the whole IV dose enters the circulation, so its F is 1 and its AUC is the area the full dose produces; the extravascular AUC is measured against it, Fabs = {{frac:AUCpo|AUCIV}} × {{frac:DIV|Dpo}}, and cannot come out above 1.',
   'She asks definitions by quoting the slide and asking for the term; the words "intravenous administration" settle this one.']}],
 cite:'Canvas Quiz 4 (Modules 6–7a), question 10; 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability" (page 5)'},

];
