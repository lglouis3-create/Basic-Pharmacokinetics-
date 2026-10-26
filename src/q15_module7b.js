/* ==========================================================================
   MODULE 7b — RELATIONSHIP BETWEEN PHARMACOKINETICS AND PHARMACODYNAMICS
   (Final exam, lecture L11, 12 October; drilled as module 9, shown as 7b)
   ==========================================================================
   Deck: 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, 13 pages: slide 2
   "Objectives", 3 "Pharmacodynamics", 4 "Relationship of Dose to
   Pharmacologic Effect", 5 "Typical Log Dose-versus-Pharmacologic Response
   Curves", 6 "Relationship Between Dose and Duration of Activity (teff)",
   7 "Practice Problem", 8 the worked solution to it, 9 "Effect of Dose and
   Elimination Half-life on Duration of Activity", 10 "Effect of Elimination
   Half-life on Duration of Activity", 11 "Summary", 12 her PollEv item, and
   13 her In-Class Activity "PK-PD" (two problems, photographed).
   Also: PK-PD-Practice-1---Solutions.pdf, PK-PD-Practice-2---Solutions.pdf,
   PK-PD-Practice-3---Solutions.pdf, and Homework-7.pdf problem 1 (graded
   homework: her wording, numbers changed, as in q10_homework.js).
   Shargel 8e Chapter 22 is used only where a slide makes the same point.

   Her values, each recomputed from her stem (scratchpad ingest/pkpd):
   slide 8: 26.35 hr, 30.97 hr (500 mg), 35.60 hr (1000 mg), 13 g to double
   teff (13.01 g from 52.7 hr); Practice 1: 8.69 hr, 18.69 hr, change 10 hr =
   2 t½; Practice 2: 7 hr, 777.5 mg = 10.4 mg/kg; Practice 3: 11.56 hr,
   15.16 hr; In-Class 1: 9.15 written (9.16 by the 1.44 t½ form, 9.18 by
   k = 0.231), 479.72 mg; In-Class 2 is unworked past its first line; its keys
   (11.51 hr, 5000 mg, 3.47 hr shorter) are worked from her stem. PollEv:
   False.

   Topic id 'pkpd', subs from her objectives slide. Numeric questions carry
   the skill 'pkpd' (the homework AUC part carries 'auc').
   ========================================================================== */

const PD_DECK = '7b---Pharmacokinetics-and-Pharmacodynamics.pdf';

TOPICS.push(
 {id:'pkpd', name:'PK-PD relationship', prof:'Mosley',
  cite:PD_DECK + ', slide 2 "Objectives"',
  subs:[
   {id:'pd', name:'Pharmacodynamics and the exposure–response relationship',
    cite:PD_DECK + ', slide 3 "Pharmacodynamics"'},
   {id:'doseresp', name:'Response rising with dose and concentration up to a maximum',
    cite:PD_DECK + ', slides 4 "Relationship of Dose to Pharmacologic Effect", 5 "Typical Log Dose-versus-Pharmacologic Response Curves" and 11 "Summary"'},
   {id:'teff', name:'Dose and the duration of activity, teff',
    cite:PD_DECK + ', slides 6 to 9 and 12'},
   {id:'dosefor', name:'The dose for a target duration of activity',
    cite:PD_DECK + ', slide 8 and the In-Class Activity on slide 13'},
   {id:'thalf', name:'Elimination half-life and the duration of activity',
    cite:PD_DECK + ', slides 9 "Effect of Dose and Elimination Half-life on Duration of Activity" and 10 "Effect of Elimination Half-life on Duration of Activity"'}]}
);

/* Concept blocks several questions share, written once. */
const PD_T_PD = {h:'Pharmacodynamics and exposure–response', list:[
  'Pharmacodynamics (PD): the relationship between drug concentration at the site of action, the receptor, and the observed pharmacologic response.',
  'Pharmacokinetics (PK) turns the dose into a concentration over time; PD turns that concentration into a response.',
  'The PK–PD relationship is also called the exposure–response, concentration–response or concentration–effect relationship.',
  'Exposure–response information is used to determine safety and efficacy in drug approval, to understand benefit–risk, and to derive dosing information.']};

const PD_T_DOSE = {h:'Dose, concentration and response', list:[
  'As the dose increases, the concentration at the receptor site increases, and the response increases up to a maximum effect.',
  'Response against dose on a linear scale rises steeply, then flattens: the same dose change gives a large increase at low doses and a small one near the maximum.',
  'Response against log dose is a sigmoid (S-shaped) curve; the maximum is reached when all receptors become saturated.',
  'Its middle portion is close to a straight line: effect against log concentration, with slope m.',
  'Onset, intensity and duration of the effect depend on the dose and on the pharmacokinetics of the drug.']};

const PD_T_CURVE = {h:'Reading the plasma level–time curve', list:[
  'MEC (minimum effective concentration, Ceff): the lowest plasma level that gives the effect. MTC (minimum toxic concentration): the level above which toxicity appears.',
  'Onset time: when the rising level first reaches the MEC.',
  'Duration (teff): the time the level stays at or above the MEC.',
  'Intensity: how far the peak rises above the MEC.']};

const PD_T_EFFECT = {h:'Effect against time after an IV bolus', list:[
  'E = E0 − {{frac:kmt|2.3}}: E is the effect at time t, E0 the effect at time zero, k the elimination rate constant, m the slope of effect against log concentration.',
  'It joins the straight middle of the curve, E = m log C + e, to the first-order decline, log C = log C0 − {{frac:kt|2.3}}.',
  'So the effect falls in a straight line with time, at slope {{frac:km|2.3}}; the 2.3 converts natural to base-10 logarithms.',
  'A larger k or a larger m makes the effect fall faster; a longer half-life keeps it longer.']};

const PD_T_TEFF = {h:'Duration of activity, teff', list:[
  'teff: the time one IV bolus keeps the plasma level at or above Ceff, the minimum effective concentration.',
  'From C = C0e^(−kt) with C = Ceff: teff = {{frac:ln C0 − ln Ceff|k}}, where C0 = {{frac:D0|VD}}, the level just after the bolus.',
  'With k = {{frac:0.693|t½}}: teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}); 1.44 is {{frac:1|0.693}}.',
  'The dose is inside the logarithm, so doubling it adds {{frac:ln 2|k}}, one half-life, to teff; it does not double teff.',
  'Built for a single IV bolus, a one-compartment open model and first-order elimination.']};

const PD_T_DOSEFOR = {h:'The dose for a target duration', list:[
  'Ceff = {{frac:D0|VD}} e^(−k teff), rearranged: D0 = Ceff × VD × e^(k teff).',
  'The target time is in the exponent, so each extra half-life of duration doubles the dose.',
  'Check: put the dose back into teff = {{frac:ln C0 − ln Ceff|k}} and the target time returns.']};

const PD_T_THALF = {h:'Elimination half-life and duration', list:[
  'Alteration of the elimination processes, excretion and metabolism, changes the t½ of the drug.',
  'In certain disease states, pathophysiologic changes in hepatic or renal function decrease elimination, seen as a prolonged t½.',
  'The prolonged t½ retains drug in the body, increasing the duration of activity and the possibility of toxicity.',
  'teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}): teff is directly proportional to t½, but not to the dose.']};

/* Stems shared by the parts of one problem. */
const PD_EX = 'The minimum effective concentration (MEC or Ceff) in plasma for a certain antibiotic is 0.2 mcg/mL. The drug follows a one-compartment open model and has an apparent volume of distribution of 24 L and a first-order elimination rate constant of 0.15 h–1.';
const PD_IC1 = 'A drug with an elimination half-life of 3 hours, apparent volume of distribution of 25 L, and minimum effective concentration of 1.2 mcg/mL is to be administered as a single 250 mg IV bolus dose.';
const PD_IC2 = 'The equation for concentration of drug in the plasma as a function of time following a 500 mg IV bolus dose was found to be: Cp = 50e^(−0.2t)';
const PD_P1 = 'A certain antibiotic that follows a one-compartment open model has an apparent volume of distribution of approximately 15 L and a first-order elimination half-life of approximately 5 hours and is characterized by a minimum effective concentration of 10 mcg/mL.';
const PD_P2 = 'What is the expected teff in a 165-pound male for a single IV dose of an antibiotic that is dosed at 5 mg/kg and has a minimum effective concentration of 12 mcg/mL? The drug follows a one-compartment open model and has an apparent volume of distribution that is 0.15L/kg and elimination half-life of 4.75 hours.';
const PD_P3 = 'A 75-kg patient is to receive a single 20-mg/kg IV bolus dose of an antibiotic. The antibiotic follows a one-compartment open model, has an apparent volume of distribution that is approximately 0.3 L/kg, a first-order elimination half-life of approximately 3.6 hours, and is characterized by a minimum effective concentration of 7.2 mcg/mL.';
const PD_HW = '1. A 70-kg volunteer received a single IV bolus dose of an investigational drug. The drug was administered at a dose of 12 mg/kg. The drug has an apparent volume of distribution that is 0.25 L/kg and an elimination half-life approximately 5 hours.';
const PD_HW_NOTE = 'Her homework wording with different numbers, so this is not the graded answer.';
const PD_HWO = '1. A 75-kg volunteer received a single IV bolus dose of an investigational drug. The drug was administered at a dose of 15 mg/kg. The drug has an apparent volume of distribution that is 0.3 L/kg and an elimination half-life approximately 4 hours .';
const PD_HWO_NOTE = 'Her homework with her own numbers. She gave no key for it, so this answer is computed from her stem.';

const Q_MODULE7B = [

/* ═══════════════ PHARMACODYNAMICS AND EXPOSURE–RESPONSE ═══════════════ */

{id:'pd-c01', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'pd', concept:'pd-definition', skill:'recall', source:'slide',
 stem:'Which term describes the relationship between drug concentration at the site of action (receptor) and the observed pharmacologic response?',
 options:[
  {t:'Pharmacodynamics', correct:true,
   why:'Pharmacodynamics starts where pharmacokinetics stops: it takes the concentration at the receptor and links it to the response that concentration produces, which is what the drug does to the body once it arrives.'},
  {t:'Pharmacokinetics',
   why:'Choosing this takes the half of the relationship that comes first. Pharmacokinetics describes how the dose becomes a concentration over time; the response that concentration produces at the receptor is pharmacodynamics.'},
  {t:'Bioavailability',
   why:'Choosing this takes the arrival of the drug for its effect. Bioavailability is the rate and extent to which the active ingredient is absorbed and becomes available at the site of action; it ends where the receptor response begins.'},
  {t:'Duration of activity',
   why:'Choosing this takes one measure of the response for the whole relationship. Duration of activity, teff, is the time the plasma level stays at or above the minimum effective concentration; pharmacodynamics is the concentration–response link itself.'}],
 teach:[PD_T_PD],
 cite:PD_DECK + ', slide 3 "Pharmacodynamics"'},

{id:'pd-c02', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', multi:true,
 topic:'pkpd', sub:'pd', concept:'exposure-response-names', skill:'recall', source:'slide',
 stem:'The relationship between pharmacokinetics (PK) and pharmacodynamics (PD) is also referred to as which of the following? (Select all that apply)',
 options:[
  {t:'exposure–response relationship', correct:true,
   why:'Exposure is the pharmacokinetic side and response the pharmacologic observation. Joining them is the PK–PD relationship under its most common name.'},
  {t:'concentration–response relationship', correct:true,
   why:'This names the same link with the plasma concentration as the measure of exposure: as the concentration at the receptor rises, the response rises toward its maximum.'},
  {t:'concentration–effect relationship', correct:true,
   why:'Effect is the change in response that the concentration produces, so this third name again joins a PK quantity, the concentration, to a PD one, the effect.'},
  {t:'concentration–time relationship',
   why:'Choosing this takes the pharmacokinetic curve alone for the PK–PD link. Concentration against time, C = C0e^(−kt) after an IV bolus, has no response in it; PK–PD joins that concentration to an effect.'},
  {t:'rate–extent relationship',
   why:'Choosing this carries over the two parts of bioavailability, rate (read from tmax) and extent (read from AUC). Both describe how drug reaches the circulation, not the response it then produces.'}],
 teach:[PD_T_PD],
 cite:PD_DECK + ', slide 3 "Pharmacodynamics"'},

{id:'pd-c03', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', multi:true,
 topic:'pkpd', sub:'pd', concept:'exposure-response-uses', skill:'recall', source:'slide',
 stem:'Exposure–response information is used for which of the following? (Select all that apply)',
 options:[
  {t:'to determine the safety and efficacy of drugs in the process of drug approval', correct:true,
   why:'Exposure–response data show which exposures give the wanted effect and which give toxicity, which is the safety and efficacy evidence a drug needs for approval.'},
  {t:'to understand the benefit–risk of drugs during the drug approval process', correct:true,
   why:'Benefit–risk weighs the effect gained at an exposure against the toxicity risked at it; both sides come from relating exposure to response, so the same data serve it.'},
  {t:'to derive dosing information', correct:true,
   why:'A dose gives an exposure through the pharmacokinetics, and the exposure gives a response, so the dose for a target response can be worked back from the exposure–response relationship.'},
  {t:'to measure the absolute bioavailability of a tablet',
   why:'Choosing this takes a pharmacokinetic comparison for an exposure–response use. Absolute bioavailability, F = ({{frac:AUCpo|AUCIV}})({{frac:DIV|Dpo}}), compares two exposures with each other and never involves a response.'},
  {t:'to determine the elimination half-life of a drug',
   why:'Choosing this takes a pharmacokinetic parameter for a PD use. The half-life, t½ = {{frac:0.693|k}}, comes from concentrations over time alone; exposure–response information adds the response to those concentrations.'}],
 teach:[PD_T_PD],
 cite:PD_DECK + ', slide 3 "Pharmacodynamics"'},

/* ═══════════════ DOSE, CONCENTRATION AND RESPONSE ════════════════════ */

{id:'pd-c04', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'doseresp', concept:'response-up-to-max', skill:'recall', source:'slide',
 stem:'Which of the following is true regarding the relationship of dose to pharmacologic effect?',
 options:[
  {t:'Response rises with dose up to a maximum effect', correct:true,
   why:'More dose puts more drug at the receptor, so more receptors are occupied and the response grows; once all are occupied the response cannot rise further, which sets the maximum effect.'},
  {t:'The response increases in direct proportion to the dose at every dose.',
   why:'Choosing this extends the steep low-dose part of the curve to every dose. Near the top a further dose change gives only a small increase, and the response levels off at its maximum.'},
  {t:'The onset, intensity, and duration of the effect depend on the dose alone, not on the pharmacokinetics.',
   why:'Choosing this drops half of the statement: onset, intensity and duration depend on the dose and the pharmacokinetics. The same dose acts longer when elimination is slower, because the level stays above the MEC longer.'},
  {t:'The response falls once the dose passes the dose that gives the maximum response.',
   why:'Choosing this reads the plateau as a peak. The curve rises to the maximum response and stays there; added dose finds no free receptors, so it adds no response, but it does not take response away.'}],
 teach:[PD_T_DOSE],
 cite:PD_DECK + ', slide 4 "Relationship of Dose to Pharmacologic Effect"'},

{id:'pd-c05', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'doseresp', concept:'dose-response-linear-plot', skill:'read', source:'slide',
 stem:'On a plot of pharmacologic response against drug dose on a linear scale, where does a given change in dose produce the smallest increase in response?',
 options:[
  {t:'Near the maximum response', correct:true,
   why:'Near the top most receptors are already saturated, so extra drug finds few receptors left to act on and the curve flattens; the dose change that gave a large rise early gives a small one here.'},
  {t:'At the lowest doses',
   why:'Choosing this reverses the two regions of the curve. At low doses the curve is steep, so a given dose change gives a large increase in response; the small increase comes near the top, where the curve flattens.'},
  {t:'Equally at every dose',
   why:'Choosing this treats the curve as a straight line. A straight line gives the same rise for the same dose step everywhere; this curve is steep early and then plateaus, so the same step does less and less.'},
  {t:'At the dose giving half of the maximum response',
   why:'Choosing this picks the middle of the curve, where it is still rising. The smallest gain per dose step is where the curve is flattest, at the top near the maximum response.'}],
 teach:[PD_T_DOSE],
 cite:PD_DECK + ', slide 4 "Relationship of Dose to Pharmacologic Effect" (left figure)'},

{id:'pd-c06', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'duration-term', skill:'recall', source:'slide',
 stem:'Which term describes the time that the plasma drug level stays at or above the minimum effective concentration (MEC) after a single dose?',
 options:[
  {t:'Duration of action', correct:true,
   why:'Duration is read along the time axis between the two crossings of the MEC: from the onset, where the rising level first reaches the MEC, to the time it falls back below it. This is teff, the duration of activity.'},
  {t:'Onset time',
   why:'Choosing this takes the start of the effect for its length. Onset time is the single moment the rising curve first reaches the MEC; duration is the whole span from there until the level falls back below the MEC.'},
  {t:'Intensity',
   why:'Choosing this reads the vertical measure for the horizontal one. Intensity is how far the peak rises above the MEC, a concentration difference; duration is a time, read along the time axis.'},
  {t:'Elimination half-life',
   why:'Choosing this takes a pharmacokinetic constant for a pharmacodynamic span. The half-life is the time for the level to fall by one-half; duration also depends on the MEC and the dose: teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}).'}],
 teach:[PD_T_CURVE],
 cite:PD_DECK + ', slide 4 "Relationship of Dose to Pharmacologic Effect" (right figure)'},

{id:'pd-c07', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'doseresp', concept:'intensity-term', skill:'read', source:'slide',
 stem:'On a plasma level–time curve after a single dose, which term describes how far the peak plasma level rises above the minimum effective concentration (MEC)?',
 options:[
  {t:'Intensity', correct:true,
   why:'Intensity is read vertically, from the MEC up to the peak: the higher the peak above the threshold for effect, the stronger the effect. A larger dose raises the peak and so the intensity.'},
  {t:'Duration',
   why:'Choosing this reads the horizontal measure for the vertical one. Duration is the time the level stays at or above the MEC, read along the time axis; the height of the peak above the MEC is intensity.'},
  {t:'Onset time',
   why:'Choosing this takes a time for a height. Onset time is when the rising curve first reaches the MEC, a point on the time axis; how far the peak climbs above the MEC is intensity.'},
  {t:'Minimum toxic concentration (MTC)',
   why:'Choosing this takes a fixed threshold for a measured distance. The MTC is the line above which toxicity appears; intensity is the distance from the MEC to the peak, which is kept below the MTC.'}],
 teach:[PD_T_CURVE],
 cite:PD_DECK + ', slide 4 "Relationship of Dose to Pharmacologic Effect" (right figure)'},

{id:'pd-c08', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'doseresp', concept:'log-dose-sigmoid', skill:'read', source:'slide',
 stem:'Which of the following describes a plot of pharmacologic response against log dose?',
 options:[
  {t:'A sigmoid (S-shaped) curve', correct:true,
   why:'A log axis spreads out the low doses and compresses the high ones, so the response curve becomes an S: flat at the bottom, near straight in the middle, flat at the top where all receptors are saturated.'},
  {t:'A curve that rises steeply from zero and flattens to a plateau',
   why:'Choosing this describes the same data on a linear dose axis. Against dose itself the response rises steeply and flattens; taking the logarithm of the dose turns that curve into an S shape.'},
  {t:'A straight line at every dose',
   why:'Choosing this extends the middle of the curve to its ends. Only the middle portion is close to a straight line; the curve flattens at the bottom and at the top.'},
  {t:'A curve that rises to a peak and falls back to zero',
   why:'Choosing this takes the plasma level–time curve for the dose–response curve. Concentration against time rises and falls after a dose; response against log dose rises and stays at its maximum.'}],
 teach:[PD_T_DOSE],
 cite:PD_DECK + ', slides 5 "Typical Log Dose-versus-Pharmacologic Response Curves" and 11 "Summary"'},

{id:'pd-c09', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'doseresp', concept:'receptor-saturation', skill:'apply', source:'slide',
 stem:'What is the probable reason the pharmacologic response stops increasing at high doses?',
 options:[
  {t:'All receptors at the site of action are saturated', correct:true,
   why:'The response comes from drug acting on receptors. Once every receptor is occupied, added drug has nothing left to act on, so the response stays at its maximum however high the dose goes.'},
  {t:'The drug is eliminated faster at high doses',
   why:'Choosing this moves the plateau into the pharmacokinetics. With first-order elimination k is the same at every dose, so a larger dose still gives a proportionally higher concentration; the ceiling is at the receptor.'},
  {t:'The concentration at the receptor site stops rising with dose',
   why:'Choosing this places the limit on the concentration. As the dose increases the concentration at the receptor site keeps increasing; it is the response to that concentration that cannot rise once every receptor is occupied.'},
  {t:'The minimum effective concentration rises with the dose',
   why:'Choosing this treats the MEC as moving with the dose. The MEC is the threshold for effect and does not change with dose; a larger dose clears it by more but cannot push the response past the maximum.'}],
 teach:[PD_T_DOSE],
 cite:PD_DECK + ', slide 11 "Summary"'},

{id:'pd-c10', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'doseresp', concept:'effect-slope-m', skill:'read', source:'slide',
 stem:'In the equation E = E0 − {{frac:kmt|2.3}}, what does m represent?',
 options:[
  {t:'The slope of effect against log concentration', correct:true,
   why:'In the straight middle portion of the log curve, E = m log C + e, with m the slope. Putting in log C = log C0 − {{frac:kt|2.3}} carries m into the time equation, so the effect falls at slope {{frac:km|2.3}}.'},
  {t:'The mass of drug in the body at time t',
   why:'Choosing this reads m as an amount. The amount in the body is DB; m is a slope, the change in effect per unit change in log concentration, carried over from E = m log C + e.'},
  {t:'The minimum effective concentration',
   why:'Choosing this takes a threshold for a slope. The minimum effective concentration, Ceff, appears in the duration equation; m measures how steeply the effect changes with log concentration.'},
  {t:'The elimination rate constant in base-10 logarithms',
   why:'Choosing this folds the 2.3 into m. k is already the elimination rate constant and 2.3 converts it to base-10 logarithms; m is a separate, pharmacodynamic slope belonging to the response.'}],
 teach:[PD_T_EFFECT],
 cite:PD_DECK + ', slide 5 "Typical Log Dose-versus-Pharmacologic Response Curves"'},

{id:'pd-c11', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'doseresp', concept:'effect-declines-linearly', skill:'apply', source:'slide',
 stem:'Which of the following is true regarding the decline of pharmacologic effect with time after a single IV bolus dose, as described by E = E0 − {{frac:kmt|2.3}}?',
 options:[
  {t:'It falls in a straight line, faster with a larger k', correct:true,
   why:'E = E0 − ({{frac:km|2.3}})t is a straight line in t with slope {{frac:km|2.3}}. A larger k (faster elimination) or a larger m (a steeper response) makes it fall faster; a longer half-life keeps the effect longer.'},
  {t:'The effect declines exponentially, by the same fraction each hour',
   why:'Choosing this carries the concentration curve over to the effect. Concentration falls by the same fraction each hour; the effect follows log concentration, which falls in a straight line, so the effect does too.'},
  {t:'The rate of decline of the effect depends on m only, not on k',
   why:'Choosing this drops the pharmacokinetics from the slope. The slope is {{frac:km|2.3}}: k, the elimination rate constant, multiplies m, so faster elimination makes the effect fall faster.'},
  {t:'The effect stays at E0 until the concentration falls below Ceff',
   why:'Choosing this reads the minimum effective concentration as a switch on the effect. In this equation E falls steadily from E0 as t rises; Ceff instead marks the end of the duration of activity, teff.'}],
 teach:[PD_T_EFFECT],
 cite:PD_DECK + ', slide 5 "Typical Log Dose-versus-Pharmacologic Response Curves"'},

/* ═══════════════ DOSE AND DURATION OF ACTIVITY ═════════════════════════ */

{id:'pd-c12', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'ceff-meaning', skill:'read', source:'slide',
 stem:'In the duration-of-activity equation teff = {{frac:ln C0 − ln Ceff|k}}, with C0 = {{frac:D0|VD}}, what does Ceff represent?',
 options:[
  {t:'The minimum effective concentration', correct:true,
   why:'Ceff is the lowest plasma level that gives the effect. teff is the time C = C0e^(−kt) takes to fall from C0 to Ceff, because below Ceff the drug no longer acts.'},
  {t:'The minimum toxic concentration (MTC)',
   why:'Choosing this takes the upper threshold for the lower one. The MTC is the level above which toxicity appears; the effect lasts while the level is at or above the MEC, so the MEC is where the duration ends.'},
  {t:'The initial plasma concentration after the bolus',
   why:'Choosing this takes the start of the decline for its end. The concentration at time zero is C0 = {{frac:D0|VD}}, in the first logarithm; Ceff is the level the decline ends at.'},
  {t:'The steady-state concentration',
   why:'Choosing this carries an infusion or multiple-dose quantity into a single-dose equation. Css belongs to repeated dosing; teff is written for one IV bolus whose level falls from C0 to Ceff.'}],
 teach:[PD_T_TEFF],
 cite:PD_DECK + ', slides 6 "Relationship Between Dose and Duration of Activity (teff)" and 7 "Practice Problem"'},

{id:'pd-c13', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'dose-double-teff', skill:'apply', source:'slide',
 stem:'Doubling the IV bolus dose of a drug that follows linear, first-order pharmacokinetics results in a 2-fold increase in the duration of activity.',
 options:[
  {t:'True',
   why:'Choosing this treats duration as proportional to dose. The dose sits inside a logarithm, teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}), so doubling it adds ln 2 over k, one half-life, to teff instead of doubling it.'},
  {t:'False', correct:true,
   why:'Doubling D0 doubles C0, and the level needs exactly one half-life to fall from 2C0 back to C0; after that it follows the old curve. teff grows by one t½: 26.35 hr becomes 30.97 hr when 250 mg is doubled to 500 mg (VD 24 L, k 0.15 hr⁻¹).'}],
 teach:[PD_T_TEFF],
 cite:PD_DECK + ', slide 12, PollEv (keyed False)'},

{id:'pd-c14', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', dupOf:'pd-c13',
 topic:'pkpd', sub:'teff', concept:'dose-double-teff', skill:'apply', source:'slide',
 stem:'What is the expected change in the duration of activity (teff) when the single IV bolus dose of a drug with first-order elimination is doubled?',
 options:[
  {t:'teff rises by one half-life', correct:true,
   why:'teff = {{frac:ln C0 − ln Ceff|k}}. Doubling D0 doubles C0 and adds ln 2 to the top, so teff rises by {{frac:0.693|k}}, exactly one t½. Each further doubling of the dose adds one more half-life.'},
  {t:'teff doubles',
   why:'Choosing this treats teff as proportional to D0. D0 is inside the logarithm, so 2D0 adds {{frac:ln 2|k}} = {{frac:0.693|k}} = t½ to teff rather than doubling it.'},
  {t:'teff does not change',
   why:'Choosing this treats duration as a fixed property of the drug, like the half-life. The half-life does not change with dose, but teff does: a higher C0 takes longer to fall to Ceff.'},
  {t:'teff increases by two half-lives',
   why:'Choosing this takes a factor of four for a factor of two. Doubling adds one half-life; quadrupling, two doublings, adds two: for a drug with a 5-hr half-life, 500 to 2000 mg adds 10 hr, two half-lives.'}],
 teach:[PD_T_TEFF],
 cite:PD_DECK + ', slide 9 "Effect of Dose and Elimination Half-life on Duration of Activity"; PK-PD-Practice-1---Solutions.pdf'},

{id:'pd-c15', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-curve', skill:'read', source:'slide',
 stem:'On a plot of duration of activity (teff) against IV bolus dose, which of the following describes the curve?',
 options:[
  {t:'It rises steeply, then flattens', correct:true,
   why:'teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}) is a logarithm of the dose: steep while doses are small, then flatter. For one such drug, teff passes 4 hours by about 4 mg/kg but is still under 6 hours at 16 mg/kg.'},
  {t:'A straight line through the origin',
   why:'Choosing this treats teff as proportional to dose. teff follows ln D0, so equal increases in dose add less and less duration.'},
  {t:'A sigmoid curve that levels off at a maximum duration',
   why:'Choosing this carries the log dose–response S-curve over to duration. Duration has no ceiling set by receptors: ln D0 keeps rising slowly, so teff keeps growing by one half-life per doubling of the dose.'},
  {t:'A curve that falls as the dose increases',
   why:'Choosing this reverses the direction. A larger dose gives a higher C0, which takes longer to fall to Ceff, so teff rises with dose; only the size of each gain shrinks.'}],
 teach:[PD_T_TEFF],
 cite:PD_DECK + ', slide 9 "Effect of Dose and Elimination Half-life on Duration of Activity" (figure)'},

{id:'pd-c16', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-derivation', skill:'read', source:'slide',
 stem:'The duration-of-activity equation is C = C0e^(−kt) solved for t. Which substitutions turn it into teff = {{frac:ln C0 − ln Ceff|k}}?',
 options:[
  {t:'C is set to Ceff, and C0 to {{frac:D0|VD}}', correct:true,
   why:'Ceff = C0e^(−k teff), so e^(k teff) = {{frac:C0|Ceff}} and k teff = ln C0 − ln Ceff. C0 = {{frac:D0|VD}} because the whole bolus is in VD at time zero.'},
  {t:'C is set to the MTC, and C0 to {{frac:D0|VD}}',
   why:'Choosing this ends the duration at the toxic threshold. The effect lasts until the level falls to the minimum effective concentration; the MTC is the ceiling the peak is kept under.'},
  {t:'C is set to Ceff, and C0 to D0 × VD',
   why:'Choosing this inverts the volume relation. Concentration is amount over volume, C0 = {{frac:D0|VD}}; multiplying gives mg × L, which is not a concentration.'},
  {t:'C is set to half of C0, and t to t½',
   why:'Choosing this derives the half-life, t½ = {{frac:0.693|k}}, instead of the duration. Setting C to half of C0 gives the half-life; setting C to Ceff gives the time the drug stays effective.'}],
 teach:[PD_T_TEFF],
 cite:PD_DECK + ', slides 6 "Relationship Between Dose and Duration of Activity (teff)" and 8'},

{id:'pd-c17', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', multi:true,
 topic:'pkpd', sub:'teff', concept:'teff-three-forms', skill:'read', source:'slide',
 stem:'Which of the following are true regarding the three duration-of-activity equations, teff = {{frac:2.3(log C0 − log Ceff)|k}}, teff = {{frac:ln C0 − ln Ceff|k}} and teff = 1.44 t½ ln({{frac:C0|Ceff}}), with C0 = {{frac:D0|VD}}? (Select all that apply)',
 options:[
  {t:'All three give the same teff for the same drug and dose', correct:true,
   why:'They are one relation written three ways: ln x = 2.3 log x, and {{frac:1|k}} = {{frac:t½|0.693}} = 1.44 t½. Any of them gives the same number; the choice follows whether k or t½ is given.'},
  {t:'The 2.3 converts base-10 logarithms to natural logarithms', correct:true,
   why:'ln x = 2.303 log x, so 2.3 times a difference of base-10 logarithms is the difference of natural logarithms; the base-10 form is the natural-log form rewritten, not a different model.'},
  {t:'1.44 t½ equals {{frac:1|k}}', correct:true,
   why:'k = {{frac:0.693|t½}}, so dividing by k is multiplying by {{frac:t½|0.693}} = 1.44 t½; that is why the third form takes the half-life directly.'},
  {t:'teff is directly proportional to the dose',
   why:'Choosing this takes the dose out of the logarithm. D0 sits inside ln, so doubling it adds one half-life to teff; doubling the dose does not double the duration.'},
  {t:'They apply to any route, including a single oral dose',
   why:'Choosing this drops the conditions they are built on. They solve C = C0e^(−kt) with C0 = {{frac:D0|VD}}, which holds for a single IV bolus in a one-compartment model, not for a dose with an absorption phase.'}],
 teach:[{h:'Three forms, one relation', list:[
  'teff = {{frac:ln C0 − ln Ceff|k}}, with C0 = {{frac:D0|VD}}: the time for the level to fall from C0 to Ceff, the minimum effective concentration.',
  'Base-10 form: multiply by 2.3, because ln x = 2.3 log x.',
  'Half-life form: {{frac:1|k}} = 1.44 t½, so teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}).']}],
 cite:PD_DECK + ', slides 6 "Relationship Between Dose and Duration of Activity (teff)" and 9 "Effect of Dose and Elimination Half-life on Duration of Activity"'},

{id:'pd-c18', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-conditions', skill:'recall', source:'slide',
 stem:'Which of the following is true regarding the conditions under which teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}) gives the duration of activity?',
 options:[
  {t:'One IV bolus, one compartment, first order', correct:true,
   why:'teff is solved from C = C0e^(−kt), with C0 = {{frac:D0|VD}}. That curve holds when a single IV bolus puts the whole dose in at time zero, the drug follows a one-compartment open model, and elimination is first order with one constant k.'},
  {t:'A single oral dose, with F included in the dose',
   why:'Choosing this assumes the oral curve can be read the same way. An oral dose has an absorption phase, so the level does not start at {{frac:D0|VD}} and fall from time zero; the equation is built on the IV bolus decline.'},
  {t:'A constant IV infusion at steady state',
   why:'Choosing this carries an infusion level into a single-dose equation. At steady state the level holds at Css while the infusion runs; teff measures how long one bolus stays above Ceff as it falls.'},
  {t:'Any drug, whatever the order of its elimination',
   why:'Choosing this drops first-order elimination. The equation needs one constant k so that C = C0e^(−kt) holds; the rule that each doubling of the dose adds one half-life also rests on linear, first-order pharmacokinetics.'}],
 teach:[PD_T_TEFF],
 cite:PD_DECK + ', slides 7 "Practice Problem", 9 and 12'},

{id:'pd-c19', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', multi:true,
 topic:'pkpd', sub:'teff', concept:'what-moves-teff', skill:'apply', source:'slide',
 stem:'Which of the following would be expected to lengthen the duration of activity (teff) of a single IV bolus dose? Each option changes only the quantity it names; the half-life is unchanged unless the option says otherwise. (Select all that apply)',
 options:[
  {t:'Increasing the dose', correct:true,
   why:'A larger dose raises C0 = {{frac:D0|VD}}, so the level starts further above Ceff and takes longer to fall to it: one more half-life of duration for every doubling of the dose.'},
  {t:'A decrease in renal function that prolongs the elimination half-life', correct:true,
   why:'Decreased renal elimination prolongs t½, and teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}) rises in direct proportion to t½; the possibility of toxicity rises with it.'},
  {t:'A decrease in hepatic function that prolongs the elimination half-life', correct:true,
   why:'Metabolism in the liver is the other elimination process; less of it prolongs t½ just as decreased renal function does, so the drug is retained and teff increases in proportion.'},
  {t:'A higher minimum effective concentration',
   why:'Choosing this reverses the effect of the threshold. A higher Ceff is reached sooner on the falling curve, because ln({{frac:D0|VD × Ceff}}) gets smaller, so teff shortens.'},
  {t:'A larger apparent volume of distribution',
   why:'Choosing this reads VD as a store that holds the effect. A larger VD spreads the same dose more thinly: C0 = {{frac:D0|VD}} falls, so the level reaches Ceff sooner and teff shortens.'}],
 teach:[{h:'What moves teff', list:[
  'teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}).',
  'Longer: a larger dose (one t½ per doubling) or a longer t½ (in direct proportion), as when hepatic or renal function is decreased.',
  'Shorter: a larger VD or a higher Ceff, each of which makes the ratio inside the logarithm smaller.']}],
 cite:PD_DECK + ', slides 9 "Effect of Dose and Elimination Half-life on Duration of Activity" and 10 "Effect of Elimination Half-life on Duration of Activity"'},

/* ═══════════════ HALF-LIFE AND DURATION ════════════════════════════════ */

{id:'pd-c20', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'thalf', concept:'thalf-double-teff', skill:'apply', source:'slide',
 stem:'What is the expected change in the duration of activity of a single IV bolus dose if decreased elimination doubles the elimination half-life, with the dose and the volume of distribution unchanged?',
 options:[
  {t:'teff doubles', correct:true,
   why:'In teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}), t½ multiplies the whole expression and nothing else changes, so teff is directly proportional to t½: twice the half-life, twice the duration.'},
  {t:'teff increases by one half-life',
   why:'Choosing this carries the dose rule over to the half-life. Doubling the dose adds one t½ because the dose is inside the logarithm; t½ multiplies the whole expression, so doubling it doubles teff.'},
  {t:'teff is halved',
   why:'Choosing this reverses the direction. A longer half-life means slower elimination, so the level takes longer to fall to Ceff and the drug acts longer, not shorter.'},
  {t:'teff does not change, because the dose is the same',
   why:'Choosing this ties duration to the dose alone. Onset, intensity and duration depend on the dose and on the pharmacokinetics; from the same C0, a slower decline keeps the level above Ceff longer.'}],
 teach:[PD_T_THALF],
 cite:PD_DECK + ', slide 9 "Effect of Dose and Elimination Half-life on Duration of Activity"'},

{id:'pd-c21', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', multi:true, dupOf:'pd-c19',
 topic:'pkpd', sub:'thalf', concept:'disease-prolongs-thalf', skill:'apply', source:'slide',
 stem:'In certain disease states, pathophysiologic changes in hepatic or renal function decrease the elimination of a drug. Which of the following would be expected? (Select all that apply)',
 options:[
  {t:'A prolonged elimination half-life', correct:true,
   why:'Less elimination means a smaller k, and t½ = {{frac:0.693|k}}, so the half-life is prolonged; this is how the decreased elimination shows in the pharmacokinetics.'},
  {t:'Retention of the drug in the body', correct:true,
   why:'With elimination slowed, drug leaves more slowly than before, so more of each dose remains in the body at every time after it is given.'},
  {t:'An increased duration of activity', correct:true,
   why:'Retained drug keeps the plasma level above Ceff for longer, and teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}) rises in proportion to the prolonged t½.'},
  {t:'An increased possibility of drug toxicity', correct:true,
   why:'The same retention that lengthens the effect raises the levels that follow each dose, so the possibility of toxicity increases along with the duration of activity.'},
  {t:'A shorter duration of activity',
   why:'Choosing this reverses the direction. Decreased elimination prolongs t½, and a longer t½ lengthens teff; a shorter duration would need faster elimination, the opposite of this change.'},
  {t:'An increased elimination rate constant',
   why:'Choosing this reverses the link between elimination and k. k is the fraction eliminated per unit time; decreased elimination lowers k, which is what prolongs t½ = {{frac:0.693|k}}.'}],
 teach:[PD_T_THALF],
 cite:PD_DECK + ', slide 10 "Effect of Elimination Half-life on Duration of Activity"'},

/* ═══════════════ THE DOSE FOR A TARGET DURATION ════════════════════════ */

{id:'pd-c22', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'dosefor', concept:'dose-to-double-teff', skill:'apply', source:'slide',
 stem:'Which of the following is true regarding the IV bolus dose needed to double the duration of activity (teff) of a drug?',
 options:[
  {t:'The dose doubles per added half-life of teff', correct:true,
   why:'D0 = Ceff × VD × e^(k teff), so each added half-life of duration doubles the dose. For an antibiotic with VD 24 L, k 0.15 hr⁻¹ and Ceff 0.2 mcg/mL, 250 mg gives 26.35 hr, about 5.7 half-lives of 4.62 hr; doubling it to 52.7 hr needs about 52 times the dose, 13 g.'},
  {t:'Twice the dose doubles teff',
   why:'Choosing this treats teff as proportional to dose. Twice the dose adds only one half-life to teff: for that antibiotic, 4.62 hr on top of a 26.35-hr duration.'},
  {t:'It is found from D0 = {{frac:Ceff × VD|e^(k teff)}}',
   why:'Choosing this inverts the exponential. From Ceff = {{frac:D0|VD}}e^(−k teff), multiplying both sides by VD e^(k teff) gives D0 = Ceff × VD × e^(k teff); dividing would make a longer teff need a smaller dose.'},
  {t:'The dose needed does not depend on the half-life',
   why:'Choosing this leaves k out of the dose line. In D0 = Ceff × VD × e^(k teff), a small k (a long half-life) keeps the exponent small, so a drug with a long half-life needs a far smaller dose for the same teff.'}],
 teach:[PD_T_DOSEFOR],
 cite:PD_DECK + ', slide 8 (dose to double teff)'},

{id:'pd-c23', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-form-choice', skill:'apply', source:'slide',
 stem:'A single IV bolus dose, the apparent volume of distribution, the minimum effective concentration and the elimination half-life are given, but not k. Which form of the duration-of-activity equation takes these quantities as they are given?',
 options:[
  {t:'The 1.44 t½ form', correct:true,
   why:'teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}) takes the half-life directly, because 1.44 = {{frac:1|0.693}} stands in for {{frac:1|k}}. No k has to be worked out first.'},
  {t:'The natural-log form, divided by k',
   why:'Choosing this skips a step the stem leaves open. teff = {{frac:ln C0 − ln Ceff|k}} needs k, so k = {{frac:0.693|t½}} would have to come first; it gives the same teff, by one more line.'},
  {t:'The base-10 log form, divided by k',
   why:'Choosing this adds two conversions. The 2.3 turns base-10 logarithms into natural ones and the division still needs k, which the stem does not give.'},
  {t:'D0 = Ceff × VD × e^(k teff)',
   why:'Choosing this solves for the wrong quantity. That line gives the dose for a chosen duration; here the dose is given and the duration is asked.'}],
 teach:[{h:'Picking the teff form', list:[
  'A k in the stem: teff = {{frac:ln C0 − ln Ceff|k}}, with C0 = {{frac:D0|VD}}.',
  'A half-life in the stem: teff = 1.44 t½ ln({{frac:D0|VD × Ceff}}), or k = {{frac:0.693|t½}} first.',
  'All forms give the same duration; the base-10 form needs the 2.3.']}],
 cite:PD_DECK + ', slides 6 "Relationship Between Dose and Duration of Activity (teff)" and 9 "Effect of Dose and Elimination Half-life on Duration of Activity"'},

{id:'pd-c24', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'double-dose-c0', skill:'apply', source:'slide',
 stem:'The IV bolus dose of a drug that follows linear, first-order, one-compartment pharmacokinetics is doubled, from 250 mg to 500 mg, with VD = 24 L. What happens to C0, the plasma concentration just after the dose?',
 options:[
  {t:'It doubles, from 10.42 to 20.83 mg/L', correct:true,
   why:'C0 = {{frac:D0|VD}}: {{frac:250 mg|24 L}} = 10.42 mg/L and {{frac:500 mg|24 L}} = 20.83 mg/L. The level is in proportion to the dose; it is the duration that gains only one half-life.'},
  {t:'It rises by one half-life\'s worth',
   why:'Choosing this moves the duration rule onto the level. teff gains one half-life when the dose doubles because the dose sits inside a logarithm; C0 has no logarithm, so it doubles.'},
  {t:'It stays the same; only the duration changes',
   why:'Choosing this keeps VD in mind and drops the dose. VD is unchanged, but C0 = {{frac:D0|VD}} has the dose on top, so twice the dose gives twice the level.'},
  {t:'It rises by a factor of ln 2',
   why:'Choosing this takes the ln 2 from the duration. Doubling adds {{frac:ln 2|k}} to teff; the level itself rises by a factor of 2.'}],
 teach:[{h:'Doubling an IV bolus', list:[
  'C0 = {{frac:D0|VD}}: twice the dose, twice the level just after the dose.',
  'teff = {{frac:ln C0 − ln Ceff|k}}: twice C0 adds {{frac:ln 2|k}}, one half-life, to the duration.',
  'Her slide problem: 26.35 hr at 250 mg, 30.97 hr at 500 mg.']}],
 cite:PD_DECK + ', slides 6 and 8 (her working of the slide 7 "Practice Problem", 250 mg and 500 mg into 24 L)'},

/* ═══════════════ SLIDE 7 PRACTICE PROBLEM, WORKED ON SLIDE 8 ═══════════ */

{id:'pd-ex-a', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-calc', skill:'pkpd', source:'slide',
 stem:PD_EX + ' What is the teff for a single 250-mg IV dose of this antibiotic?',
 units:'hr', answer:26.35, tol:0.26,
 steps:[
  {k:'unit', t:'Ceff = 0.2 mcg/mL = 0.2 mg/L',
   why:'1 mcg/mL equals 1 mg/L, because multiplying top and bottom by 1000 turns mcg into mg and mL into L. The dose is in mg and the volume in L, so C0 comes out in mg/L.'},
  {k:'setup', t:'C0 = {{frac:D0|VD}} = {{frac:250 mg|24 L}} = 10.42 mg/L',
   why:'C0, the concentration just after an IV bolus, is the whole dose spread through the apparent volume of distribution VD. The effect lasts while the level falls from here to Ceff.'},
  {k:'algebra', t:'teff = {{frac:ln C0 − ln Ceff|k}} = {{frac:ln(10.42 ÷ 0.2)|0.15 hr⁻¹}} = {{frac:ln 52.08|0.15}} = {{frac:3.953|0.15 hr⁻¹}}',
   why:'This is C = C0e^(−kt) solved for the time at which C reaches Ceff. The stem gives k directly, so the natural-log form needs no half-life; ln C0 − ln Ceff is the log of their ratio.'},
  {k:'round', t:'t½ = {{frac:0.693|0.15}} = 4.62 hr; teff = 26.35 hr',
   why:'3.953 ÷ 0.15 hr⁻¹ = 26.35 hr, her value. The ratio 52.08 lies between 2 to the 5th and 2 to the 6th, so the duration is between 5 and 6 half-lives of 4.62 hr.'}],
 setup:{eq:'pd-teff-ln', pre:['cp-db-vd'], why:'"teff", "a single 250-mg IV dose", an MEC and a first-order elimination rate constant: the natural-log duration line, which takes k as given. C0 = D0 over VD first.'},
 asks:'t',
 givens:[['Ceff', '0.2 mcg/mL', 'equals 0.2 mg/L, the level where the effect ends'], ['VD', '24 L', 'divides the dose to give C0'], ['k', '0.15 h–1', 'the denominator of teff'], ['D0', '250-mg', 'the numerator of C0']],
 check:{t:'C0 ÷ Ceff = 52.08 lies between 2 to the 5th and 2 to the 6th, so teff is between 5 and 6 half-lives of 4.62 hr: 26.35 hr.', lo:23.1, hi:27.72},
 teach:[PD_T_TEFF],
 cite:PD_DECK + ', slide 7 "Practice Problem", worked on slide 8'},

{id:'pd-ex-b', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'slide',
 stem:PD_EX + ' What is the new teff or for this drug if the dose were increased by a factor of four to 1000 mg?',
 units:'hr', answer:35.60, tol:0.36,
 steps:[
  {k:'setup', t:'C0 = {{frac:1000 mg|24 L}} = 41.67 mg/L; Ceff = 0.2 mcg/mL = 0.2 mg/L',
   why:'Four times the dose gives four times C0, because VD does not change with the dose. 1 mcg/mL equals 1 mg/L, so Ceff goes in as 0.2 mg/L.'},
  {k:'algebra', t:'teff = {{frac:ln(41.67 ÷ 0.2)|0.15 hr⁻¹}} = {{frac:ln 208.33|0.15}} = {{frac:5.3391|0.15 hr⁻¹}} = 35.594 hr',
   why:'The same natural-log duration line with the new C0. The ratio C0 ÷ Ceff is four times larger, so its logarithm is larger by ln 4 = 1.386, not four times larger.'},
  {k:'round', t:'35.594 − 26.352 = 9.242 hr = 2 × 4.621 hr; teff = 35.6 hr',
   why:'A factor of four is two doublings, and each doubling of the dose adds one half-life, 4.621 hr, to the 26.352 hr of the 250-mg dose. 35.594 hr is 35.6 hr to one decimal place. Four times the dose gives far less than four times the duration.'}],
 setup:{eq:'pd-teff-ln', pre:['cp-db-vd'], why:'"The new teff" at 1000 mg, with k given: the natural-log duration line again with the new C0 = D0 over VD.'},
 asks:'t',
 givens:[['D0', '1000 mg', 'four times 250 mg, so C0 is four times larger'], ['Ceff', '0.2 mcg/mL', 'equals 0.2 mg/L'], ['VD', '24 L', 'unchanged by the dose'], ['k', '0.15 h–1', 'unchanged by the dose']],
 check:{t:'Four times the dose adds two half-lives, 2 × 4.621 hr, to the 26.352 hr of part a: 35.6 hr, far short of four times the duration.', lo:26.35, hi:105.4},
 teach:[PD_T_TEFF],
 cite:PD_DECK + ', slide 7 "Practice Problem", worked on slide 8'},

{id:'pd-ex-c', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'slide',
 stem:PD_EX + ' What is the new teff for this drug if the dose were increased by a factor of two to 500 mg? (Part a: teff = 26.35 hr for a single 250-mg IV dose.)',
 units:'hr', answer:30.97, tol:0.31,
 steps:[
  {k:'setup', t:'C0 = {{frac:500 mg|24 L}} = 20.83 mg/L; Ceff = 0.2 mcg/mL = 0.2 mg/L',
   why:'Twice the dose gives twice C0, because VD, the apparent volume of distribution, does not change with the dose. 1 mcg/mL equals 1 mg/L, so Ceff is 0.2 mg/L.'},
  {k:'algebra', t:'teff = {{frac:ln(20.83 ÷ 0.2)|0.15 hr⁻¹}} = {{frac:ln 104.2|0.15}} = {{frac:4.646|0.15 hr⁻¹}} = 30.97 hr',
   why:'The natural-log duration line with the doubled C0. Its logarithm grows by ln 2 = 0.693, and 0.693 ÷ 0.15 hr⁻¹ is the half-life, 4.62 hr.'},
  {k:'round', t:'30.97 − 26.35 = 4.62 hr, one half-life; teff = 30.97 hr',
   why:'Each time the dose is doubled the duration gains one more half-life, 4.62 hr: 26.35 hr becomes 30.97 hr, not 52.7 hr, because the dose sits inside the logarithm.'}],
 setup:{eq:'pd-teff-ln', pre:['cp-db-vd'], why:'"The new teff" at 500 mg, with k given: the natural-log duration line with the doubled C0 = D0 over VD.'},
 asks:'t',
 givens:[['D0', '500 mg', 'twice 250 mg, so C0 doubles'], ['Ceff', '0.2 mcg/mL', 'equals 0.2 mg/L'], ['VD', '24 L', 'unchanged by the dose'], ['k', '0.15 h–1', 'unchanged by the dose']],
 check:{t:'Doubling the dose adds one half-life, 4.62 hr, to 26.35 hr: 30.97 hr, well short of twice 26.35.', lo:26.35, hi:52.7},
 teach:[PD_T_TEFF],
 note:'The printed problem asks for a factor of four, 1000 mg; her worked answer changes it to a factor of two, 500 mg, and works both doses.',
 cite:PD_DECK + ', slide 7 "Practice Problem", amended and worked on slide 8'},

{id:'pd-ex-d', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'dosefor', concept:'dose-for-teff', skill:'pkpd', source:'slide',
 stem:PD_EX + ' What dose is required to double teff? (Part a: teff = 26.35 hr for a single 250-mg IV dose.)',
 units:'g', answer:13.0, tol:0.13,
 steps:[
  {k:'setup', t:'Target teff = 2 × 26.35 hr = 52.7 hr',
   why:'Doubling the duration means the level must still be at Ceff 52.7 hours after the dose, so the time goes into the dose line as 52.7 hr.'},
  {k:'algebra', t:'Ceff = {{frac:D0|VD}} e^(−k teff), so D0 = Ceff × VD × e^(k teff)',
   why:'C = C0e^(−kt) with C0 = D0 over VD, written at the moment the level reaches Ceff, then multiplied through by VD e^(k teff) to leave the dose on its own.'},
  {k:'algebra', t:'D0 = (0.2 mg/L)(24 L) e^((0.15)(52.7)) = 4.8 mg × e^7.905 = 4.8 mg × 2710.8 = 13,012 mg',
   why:'0.2 mcg/mL is 0.2 mg/L; mg/L × L leaves mg. The exponent kt = 0.15 hr⁻¹ × 52.7 hr = 7.905 has no units, and e^7.905 is the factor the level must fall by over 52.7 hours.'},
  {k:'round', t:'D0 = 13,012 mg, rounded to 13 g',
   why:'Her answer is 13 g, about 52 times the 250-mg dose: the extra 26.35 hours is 5.7 more half-lives of 4.62 hr, and each half-life of duration needs the dose doubled once.'}],
 setup:{eq:'pd-dose-teff', pre:['pd-teff-ln'], why:'"What dose is required to double teff": the target duration is 52.7 hr, so the dose line D0 = Ceff × VD × e^(k teff), which is C = C0e^(−kt) solved for the dose.'},
 asks:'D0',
 givens:[['teff', '26.35 hr', 'doubled to 52.7 hr, the target duration'], ['Ceff', '0.2 mcg/mL', 'equals 0.2 mg/L, the level at the target time'], ['VD', '24 L', 'multiplies Ceff to give 4.8 mg'], ['k', '0.15 h–1', 'in the exponent k teff']],
 check:{t:'Doubling the dose adds only one half-life, so doubling a 26.35-hr duration needs far more than twice 250 mg: 13 g is more than 50 times it.', lo:0.5},
 teach:[PD_T_DOSEFOR],
 note:'Worked with teff = 52.7 hr, as she rounds it; carrying teff unrounded, 52.705 hr, gives 13.02 g. Both are 13 g.',
 cite:PD_DECK + ', slide 8 (what dose is required to double teff, 26.35 hr)'},

/* ═══════════════ IN-CLASS ACTIVITY, SLIDE 13 ═══════════════════════════ */

{id:'pd-ic1a', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-calc', skill:'pkpd', source:'slide',
 stem:'1. ' + PD_IC1 + ' a. What is the duration of action of this dose?',
 units:'hr', answer:9.16, tol:0.03,
 steps:[
  {k:'unit', t:'Ceff = 1.2 mcg/mL = 1.2 mg/L',
   why:'1 mcg/mL equals 1 mg/L, because multiplying top and bottom by 1000 turns mcg into mg and mL into L. With the dose in mg and the volume in L, the ratio inside the logarithm has no units.'},
  {k:'setup', t:'teff = 1.44 t½ ln({{frac:D0|VD × Ceff}})',
   why:'The stem gives the half-life, not k, so the half-life form of the duration line applies directly; 1.44 is 1 ÷ 0.693, the step from k to t½.'},
  {k:'algebra', t:'teff = 1.44 (3 hr) ln({{frac:250 mg|(25 L)(1.2 mg/L)}}) = 4.32 hr × ln({{frac:250|30}}) = 4.32 hr × ln 8.333 = 4.32 hr × 2.120',
   why:'VD × Ceff = 30 mg is the amount in the body when the level is at the MEC. The dose is 8.33 times that, and ln 8.333 = 2.120.'},
  {k:'round', t:'teff = 9.16 hr',
   why:'4.32 × 2.120 = 9.16 hr. With k = 0.231 hr⁻¹ in place of 1.44 t½ the result is 9.18 hr; the 1.44 is rounded, so the two forms differ only in the second decimal.'}],
 setup:{eq:'pd-teff-half', pre:[], why:'"Duration of action" of a "single 250 mg IV bolus", with the half-life, VD and MEC given: the half-life form of the duration line, used without first finding k.'},
 asks:'t',
 givens:[['t½', '3 hours', 'multiplied by 1.44 outside the logarithm'], ['VD', '25 L', 'times Ceff gives 30 mg'], ['Ceff', '1.2 mcg/mL', 'equals 1.2 mg/L, the MEC'], ['D0', '250 mg', 'the numerator inside the logarithm']],
 check:{t:'250 mg is 8.333 times the 30 mg at the MEC, between 2 to the 3rd and 2 to the 4th, so teff is 3 to 4 half-lives of 3 hr: 9.16 hr.', lo:9, hi:12},
 teach:[PD_T_TEFF],
 note:'Her working gives 9.15; the 1.44 t½ form gives 9.16 hr and k = 0.231 hr⁻¹ gives 9.18 hr. All three are within the margin.',
 cite:'In-Class Activity "PK-PD", problem 1a (' + PD_DECK + ', slide 13)'},

{id:'pd-ic1b', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'dosefor', concept:'dose-for-teff', skill:'pkpd', source:'slide',
 stem:'1. ' + PD_IC1 + ' b. What dose would yield a duration of action of 12 hours?',
 units:'mg', answer:479.7, tol:4.8,
 steps:[
  {k:'setup', t:'k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹; Ceff = 1.2 mcg/mL = 1.2 mg/L',
   why:'The dose line has k in its exponent, so the 3-hour half-life is turned into k first. 1 mcg/mL equals 1 mg/L, so the MEC is 1.2 mg/L.'},
  {k:'algebra', t:'Ceff = {{frac:D0|VD}} e^(−k teff), so D0 = Ceff × VD × e^(k teff)',
   why:'C = C0e^(−kt) with C0 = D0 over VD, written at the moment the level reaches the MEC, 12 hours after the dose, then solved for the dose.'},
  {k:'algebra', t:'D0 = (1.2 mg/L)(25 L) e^((0.231)(12)) = 30 mg × e^2.772 = 30 mg × 15.99 = 479.7 mg',
   why:'mg/L × L leaves mg: 30 mg is the amount in the body at the MEC. kt = 0.231 hr⁻¹ × 12 hr = 2.772 has no units, and the dose must be e^2.772 = 15.99 times that 30 mg.'},
  {k:'round', t:'D0 = 479.7 mg',
   why:'Her value is 479.72 mg. 12 hours is 4 half-lives of 3 hr, and 2 to the 4th is 16, so the dose is about 16 times the 30 mg at the MEC.'}],
 setup:{eq:'pd-dose-teff', pre:['thalf-first'], why:'"What dose would yield a duration of action of 12 hours": the dose line D0 = Ceff × VD × e^(k teff), with k from the half-life first.'},
 asks:'D0',
 givens:[['teff', '12 hours', 'the target duration, in the exponent'], ['t½', '3 hours', 'gives k = 0.231 hr⁻¹'], ['VD', '25 L', 'times Ceff gives 30 mg'], ['Ceff', '1.2 mcg/mL', 'equals 1.2 mg/L, the MEC']],
 check:{t:'12 hours is 4 half-lives of 3 hr, so the dose is about 2 to the 4th, 16, times the 30 mg at the MEC: 479.7 mg, above the 250 mg of part a.', lo:250},
 teach:[PD_T_DOSEFOR],
 cite:'In-Class Activity "PK-PD", problem 1b (' + PD_DECK + ', slide 13)'},

{id:'pd-ic2a', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-from-equation', skill:'pkpd', source:'slide',
 stem:'2. ' + PD_IC2 + ' a. What is the duration of action of a single 500 mg IV bolus dose if the minimum effective concentration is 5 mcg/mL?',
 units:'hr', answer:11.51, tol:0.05,
 steps:[
  {k:'setup', t:'From Cp = 50e^(−0.2t): C0 = 50 mg/L and k = 0.2 hr⁻¹; VD = {{frac:500 mg|50 mg/L}} = 10 L',
   why:'An IV bolus equation reads as C = C0e^(−kt): the number in front is C0 and the exponent carries k. VD is the dose over C0.'},
  {k:'unit', t:'Ceff = 5 mcg/mL = 5 mg/L',
   why:'1 mcg/mL equals 1 mg/L, because multiplying top and bottom by 1000 turns mcg into mg and mL into L; the MEC can then be set against C0 = 50 mg/L directly.'},
  {k:'algebra', t:'teff = {{frac:ln C0 − ln Ceff|k}} = {{frac:ln(50 ÷ 5)|0.2 hr⁻¹}} = {{frac:ln 10|0.2}} = {{frac:2.303|0.2 hr⁻¹}} = 11.51 hr',
   why:'The level has to fall tenfold, from 50 to 5 mg/L. With k read off the equation the natural-log form needs no half-life.'},
  {k:'round', t:'t½ = {{frac:0.693|0.2}} = 3.465 hr; teff = 11.51 hr',
   why:'The half-life form gives 1.44 (3.465 hr) ln 10 = 11.49 hr, because 1.44 is rounded from 1 ÷ 0.693; both are the same answer within the margin.'}],
 setup:{eq:'pd-teff-ln', pre:['cp-db-vd'], why:'"Duration of action" of the 500 mg bolus whose equation gives C0 = 50 and k = 0.2: the natural-log duration line, with C0 read off the equation.'},
 asks:'t',
 givens:[['C0', '50', 'mg/L, the coefficient of the equation'], ['k', '0.2t', 'k = 0.2 hr⁻¹, the exponent'], ['D0', '500 mg', 'over C0 gives VD = 10 L'], ['Ceff', '5 mcg/mL', 'equals 5 mg/L, the MEC']],
 check:{t:'The level must fall tenfold, between 2 to the 3rd and 2 to the 4th, so teff is 3 to 4 half-lives of 3.465 hr: 11.51 hr.', lo:10.4, hi:13.86},
 teach:[PD_T_TEFF],
 note:'Her working stops at t½ = 3.465 hr, VD = 10 L and the 1.44 t½ set-up; this answer is worked from her stem by that set-up.',
 cite:'In-Class Activity "PK-PD", problem 2a (' + PD_DECK + ', slide 13)'},

{id:'pd-ic2b', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'dosefor', concept:'dose-to-double-teff', skill:'pkpd', source:'slide',
 stem:'2. ' + PD_IC2 + ' b. What dose would double the duration of action found in part a? (Part a: minimum effective concentration 5 mcg/mL; duration of action 11.51 hr.)',
 units:'mg', answer:5000, tol:50,
 steps:[
  {k:'setup', t:'Target teff = 2 × 11.513 hr = 23.03 hr; VD = {{frac:500 mg|50 mg/L}} = 10 L; k = 0.2 hr⁻¹',
   why:'Doubling the duration means the level must still be at the MEC 23.03 hours after the dose; part a unrounded is 11.513 hr. VD and k come from the equation and do not change with the dose.'},
  {k:'algebra', t:'D0 = Ceff × VD × e^(k teff) = (5 mg/L)(10 L) e^((0.2)(23.026)) = 50 mg × e^4.605',
   why:'C = C0e^(−kt) solved for the dose at the moment the level reaches Ceff. 5 mcg/mL is 5 mg/L, and mg/L × L leaves 50 mg, the amount in the body at the MEC.'},
  {k:'algebra', t:'e^4.605 = 100, so D0 = 50 mg × 100 = 5000 mg',
   why:'At 500 mg the level falls tenfold over 11.51 hr; over twice the time it must fall tenfold twice, a hundredfold, so C0 must be 100 × 5 = 500 mg/L.'},
  {k:'round', t:'D0 = 5000 mg (5 g), ten times the 500 mg dose',
   why:'Doubling the duration took ten times the dose, not twice it, because the duration grows with the logarithm of the dose.'}],
 setup:{eq:'pd-dose-teff', pre:['pd-teff-ln', 'cp-db-vd'], why:'"What dose would double the duration": the target is twice 11.51 hr, so the dose line D0 = Ceff × VD × e^(k teff), with VD and k read off the equation.'},
 asks:'D0',
 givens:[['teff', '11.51 hr', 'doubled to 23.03 hr, the target'], ['Ceff', '5 mcg/mL', 'equals 5 mg/L'], ['C0', '50', 'mg/L; 500 mg over 50 mg/L gives VD = 10 L'], ['k', '0.2t', 'k = 0.2 hr⁻¹, in the exponent']],
 check:{t:'Twice the duration needs the tenfold fall twice over, a hundredfold, so the dose is 100 times the 50 mg at the MEC: 5000 mg, ten times 500 mg.', lo:1000},
 teach:[PD_T_DOSEFOR],
 note:'Left unworked on the activity sheet; this answer is worked from her stem by the dose line she uses in problem 1b.',
 cite:'In-Class Activity "PK-PD", problem 2b (' + PD_DECK + ', slide 13)'},

{id:'pd-ic2c', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'slide',
 stem:'2. ' + PD_IC2 + ' c. What is the expected change in the duration of action following a single 250 mg IV bolus dose instead of the 500 mg IV bolus dose? (Part a: minimum effective concentration 5 mcg/mL; duration of action 11.51 hr. Give the size of the change.)',
 units:'hr shorter', answer:3.47, tol:0.03,
 steps:[
  {k:'setup', t:'C0 at 250 mg = {{frac:250 mg|10 L}} = 25 mg/L; teff = {{frac:ln(25 ÷ 5)|0.2 hr⁻¹}} = {{frac:1.6094|0.2}} = 8.047 hr',
   why:'VD = 10 L from part a does not change with the dose, so half the dose gives half of C0, 25 mg/L. The level then has to fall only fivefold to reach the MEC of 5 mg/L.'},
  {k:'algebra', t:'Change = 8.047 hr − 11.513 hr = −3.466 hr',
   why:'Halving the dose takes away one doubling, and each doubling adds one half-life of duration: t½ = {{frac:0.693|0.2 hr⁻¹}} = 3.47 hr.'},
  {k:'round', t:'The duration is 3.47 hr shorter, one half-life',
   why:'−3.466 hr is 3.47 hr shorter to two decimal places: a decrease of one half-life, whatever the starting duration; it is not half of 11.51 hr.'}],
 setup:{eq:'pd-teff-half', pre:['thalf-first'], why:'"Expected change in the duration" when the dose is halved: in teff = 1.44 t½ ln of the dose ratio, halving D0 removes ln 2, one half-life, from teff.'},
 asks:'t',
 givens:[['D0', '250 mg', 'half of 500 mg, so one doubling less'], ['k', '0.2t', 'k = 0.2 hr⁻¹, so t½ = 3.47 hr'], ['Ceff', '5 mcg/mL', 'equals 5 mg/L'], ['teff', '11.51 hr', 'the 500 mg duration, compared against']],
 check:{t:'Half the dose removes one half-life, 3.466 hr, from 11.513 hr, leaving 8.047 hr: shorter, but not halved.', lo:0, hi:11.51},
 teach:[PD_T_TEFF],
 note:'Keyed as the size of the change; the duration falls, from 11.51 hr to 8.05 hr. Left unworked on the activity sheet; worked from her stem.',
 cite:'In-Class Activity "PK-PD", problem 2c (' + PD_DECK + ', slide 13)'},

/* ═══════════════ HER DAILY PRACTICE SHEETS ═════════════════════════════ */

{id:'pd-p1a', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-calc', skill:'pkpd', source:'slide',
 stem:PD_P1 + ' a. What is the teff for a single 500-mg IV bolus dose of this antibiotic?',
 units:'hr', answer:8.69, tol:0.09,
 steps:[
  {k:'setup', t:'k = {{frac:0.693|5 hr}} = 0.1386 hr⁻¹; Ceff = 10 mcg/mL = 10 mg/L',
   why:'Her key uses the k form of the duration line, so the 5-hour half-life is turned into k first. 1 mcg/mL equals 1 mg/L, so the MEC is 10 mg/L.'},
  {k:'algebra', t:'C0 = {{frac:500 mg|15 L}} = 33.33 mg/L; teff = {{frac:ln(33.33 ÷ 10)|0.1386 hr⁻¹}} = {{frac:ln 3.333|0.1386}} = {{frac:1.204|0.1386 hr⁻¹}}',
   why:'C0 is the dose spread through VD. The level only has to fall from 33.33 to 10 mg/L, a 3.33-fold fall, before the effect ends.'},
  {k:'round', t:'teff = 8.69 hr',
   why:'1.204 ÷ 0.1386 hr⁻¹ = 8.69 hr, her boxed value: between one and two half-lives of 5 hr, because 3.33 lies between 2 and 4.'}],
 setup:{eq:'pd-teff-ln', pre:['thalf-first', 'cp-db-vd'], why:'"teff" for a single 500-mg IV bolus, half-life, VD and MEC given: the natural-log duration line, with k from the half-life and C0 = D0 over VD.'},
 asks:'t',
 givens:[['VD', 'approximately 15 L', 'divides the dose: C0 = 33.33 mg/L'], ['t½', 'approximately 5 hours', 'k = 0.1386 hr⁻¹'], ['Ceff', '10 mcg/mL', 'equals 10 mg/L, the MEC'], ['D0', '500-mg', 'the numerator of C0']],
 check:{t:'C0 ÷ Ceff = 3.333 is between 2 and 4, so teff is between one and two half-lives of 5 hr: 8.69 hr.', lo:5, hi:10},
 teach:[PD_T_TEFF],
 cite:'PK-PD-Practice-1---Solutions.pdf, part a'},

{id:'pd-p1b', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'slide',
 stem:PD_P1 + ' b. What is the new teff or for this drug if the dose were increased by a factor of four to 2000 mg? (Part a: teff = 8.69 hr for a single 500-mg IV bolus dose.)',
 units:'hr', answer:18.69, tol:0.19,
 steps:[
  {k:'setup', t:'C0 = {{frac:2000 mg|15 L}} = 133.3 mg/L; k = {{frac:0.693|5 hr}} = 0.1386 hr⁻¹; Ceff = 10 mg/L',
   why:'Four times the dose gives four times C0, because VD does not change with the dose; k comes from the 5-hour half-life and 10 mcg/mL equals 10 mg/L.'},
  {k:'algebra', t:'teff = {{frac:ln(133.3 ÷ 10)|0.1386 hr⁻¹}} = {{frac:ln 13.33|0.1386}} = {{frac:2.590|0.1386 hr⁻¹}} = 18.69 hr',
   why:'The same duration line with the new C0. Four times the ratio adds ln 4 = 1.386 to the logarithm, which is two half-lives once divided by k.'},
  {k:'round', t:'teff = 18.69 hr; change = 18.69 − 8.69 = 10 hr = 2 t½',
   why:'Her key: the change is 10 hr, two half-lives of 5 hr. A factor of four is two doublings of the dose, and each doubling adds one half-life.'}],
 setup:{eq:'pd-teff-ln', pre:['thalf-first', 'cp-db-vd'], why:'"The new teff" at 2000 mg: the same natural-log duration line with the new C0 = D0 over VD; k and Ceff do not change.'},
 asks:'t',
 givens:[['D0', '2000 mg', 'four times 500 mg, so C0 is four times larger'], ['VD', 'approximately 15 L', 'unchanged by the dose'], ['t½', 'approximately 5 hours', 'k = 0.1386 hr⁻¹'], ['Ceff', '10 mcg/mL', 'equals 10 mg/L']],
 check:{t:'Four times the dose adds two half-lives, 10 hr, to the 8.69 hr of part a: 18.69 hr, not four times 8.69.', lo:8.69, hi:34.76},
 teach:[PD_T_TEFF],
 cite:'PK-PD-Practice-1---Solutions.pdf, part b'},

{id:'pd-p2a', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-calc', skill:'pkpd', source:'slide',
 stem:PD_P2,
 units:'hr', answer:7.0, tol:0.07,
 steps:[
  {k:'unit', t:'165 lb ÷ 2.2 = 75 kg; D0 = 5 mg/kg × 75 kg = 375 mg; VD = 0.15 L/kg × 75 kg = 11.25 L',
   why:'Both the dose and the volume are per kilogram, so the weight in pounds is turned into kilograms first and each is multiplied by 75 kg.'},
  {k:'setup', t:'k = {{frac:0.693|4.75 hr}} = 0.1459 hr⁻¹; Ceff = 12 mcg/mL = 12 mg/L',
   why:'Her key uses the k form of the duration line, so the 4.75-hour half-life is turned into k first. 1 mcg/mL equals 1 mg/L, so the MEC is 12 mg/L.'},
  {k:'algebra', t:'teff = {{frac:ln(375 ÷ 11.25 ÷ 12)|0.1459 hr⁻¹}} = {{frac:ln(33.33 ÷ 12)|0.1459}} = {{frac:ln 2.778|0.1459}} = {{frac:1.022|0.1459 hr⁻¹}}',
   why:'C0 = 375 mg ÷ 11.25 L = 33.33 mg/L, the level just after the bolus, and it has to fall 2.78-fold to reach the MEC of 12 mg/L before the effect ends.'},
  {k:'round', t:'teff = 7.0 hr',
   why:'1.022 ÷ 0.1459 = 7.00 hr; her key boxes 7 hr. It is between one and two half-lives of 4.75 hr, because 2.78 lies between 2 and 4.'}],
 setup:{eq:'pd-teff-ln', pre:['thalf-first', 'cp-db-vd'], why:'"Expected teff" for a single IV dose, with mg/kg dosing, L/kg volume, half-life and MEC: the natural-log duration line after scaling both to the 75-kg weight.'},
 asks:'t',
 givens:[['weight', '165-pound', '÷ 2.2 = 75 kg'], ['D0', '5 mg/kg', '× 75 kg = 375 mg'], ['Ceff', '12 mcg/mL', 'equals 12 mg/L, the MEC'], ['VD', '0.15L/kg', '× 75 kg = 11.25 L'], ['t½', '4.75 hours', 'k = 0.1459 hr⁻¹']],
 check:{t:'C0 ÷ Ceff = 2.778 is between 2 and 4, so teff is between one and two half-lives of 4.75 hr: 7.0 hr.', lo:4.75, hi:9.5},
 teach:[PD_T_TEFF],
 cite:'PK-PD-Practice-2---Solutions.pdf, first question'},

{id:'pd-p2b', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'dosefor', concept:'dose-for-teff', skill:'pkpd', source:'slide',
 stem:PD_P2 + ' What dose would you recommend to attain a teff of 12 hours? (Give the dose per kilogram.)',
 units:'mg/kg', answer:10.4, tol:0.1,
 steps:[
  {k:'unit', t:'165 lb ÷ 2.2 = 75 kg; VD = 0.15 L/kg × 75 kg = 11.25 L; k = {{frac:0.693|4.75 hr}} = 0.1459 hr⁻¹',
   why:'The dose line needs the patient\'s volume in L and k in hr⁻¹: the weight scales the per-kilogram volume, and the half-life gives k.'},
  {k:'algebra', t:'C0 = Ceff e^(k teff) = (12 mg/L) e^((0.1459)(12)) = 12 mg/L × 5.759 = 69.11 mg/L',
   why:'For the level to be at the MEC of 12 mg/L at 12 hours, the level at time zero must be e^(k teff) times higher. 12 mcg/mL is 12 mg/L.'},
  {k:'algebra', t:'D0 = C0 × VD = 69.11 mg/L × 11.25 L = 777.5 mg',
   why:'The bolus that gives that C0 is C0 times VD, because C0 = D0 over VD for an IV bolus; mg/L × L leaves mg, the dose for this 75-kg patient.'},
  {k:'round', t:'{{frac:777.5 mg|75 kg}} = 10.4 mg/kg',
   why:'Her key gives 777.5 mg and boxes 10.4 mg/kg, the same per-kilogram form the stem doses in: about twice the 5 mg/kg that lasts 7 hr.'}],
 setup:{eq:'pd-dose-teff', pre:['thalf-first'], why:'"What dose would you recommend to attain a teff of 12 hours": the dose line D0 = Ceff × VD × e^(k teff), with VD scaled to 75 kg and k from the half-life.'},
 asks:'D0',
 givens:[['teff', '12 hours', 'the target duration, in the exponent'], ['weight', '165-pound', '÷ 2.2 = 75 kg'], ['Ceff', '12 mcg/mL', 'equals 12 mg/L'], ['VD', '0.15L/kg', '× 75 kg = 11.25 L'], ['t½', '4.75 hours', 'k = 0.1459 hr⁻¹']],
 check:{t:'12 hr is 5 hr longer than the 7 hr of 5 mg/kg, about one more half-life of 4.75 hr, so the dose roughly doubles: 10.4 mg/kg.', lo:5},
 teach:[PD_T_DOSEFOR],
 cite:'PK-PD-Practice-2---Solutions.pdf, second question'},

{id:'pd-p3a', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-calc', skill:'pkpd', source:'slide',
 stem:PD_P3 + ' a. What is the expected duration of action of this antibiotic in this patient?',
 units:'hr', answer:11.56, tol:0.12,
 steps:[
  {k:'setup', t:'C0 = {{frac:20 mg/kg|0.3 L/kg}} = 66.67 mg/L; Ceff = 7.2 mcg/mL = 7.2 mg/L',
   why:'Dose and volume are both per kilogram, so the kilograms cancel in C0 and the 75-kg weight is not needed. 1 mcg/mL equals 1 mg/L.'},
  {k:'algebra', t:'teff = {{frac:t½ ln(C0 ÷ Ceff)|0.693}} = {{frac:(3.6 hr) ln(66.67 ÷ 7.2)|0.693}} = {{frac:(3.6 hr) ln 9.259|0.693}} = {{frac:(3.6 hr)(2.226)|0.693}}',
   why:'Her key uses the half-life form written as t½ over 0.693, which is 1.44 t½ unrounded. The level must fall 9.26-fold to reach the MEC.'},
  {k:'round', t:'teff = 11.56 hr',
   why:'8.013 ÷ 0.693 = 11.56 hr, her boxed value: between 3 and 4 half-lives of 3.6 hr, because 9.26 lies between 8 and 16.'}],
 setup:{eq:'pd-teff-half', pre:['cp-db-vd'], why:'"Expected duration of action" of a single IV bolus with the half-life given: the half-life form of the duration line, with C0 = D0 over VD from the per-kilogram values.'},
 asks:'t',
 givens:[['weight', '75-kg', 'cancels: dose and volume are both per kilogram'], ['D0', '20-mg/kg', 'over 0.3 L/kg gives C0 = 66.67 mg/L'], ['VD', 'approximately 0.3 L/kg', 'the denominator of C0'], ['t½', 'approximately 3.6 hours', 'multiplies the logarithm'], ['Ceff', '7.2 mcg/mL', 'equals 7.2 mg/L, the MEC']],
 check:{t:'C0 ÷ Ceff = 9.259 is between 8 and 16, so teff is between 3 and 4 half-lives of 3.6 hr: 11.56 hr.', lo:10.8, hi:14.4},
 teach:[PD_T_TEFF],
 cite:'PK-PD-Practice-3---Solutions.pdf, part a'},

{id:'pd-p3b', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'slide',
 stem:PD_P3 + ' b. What is the expected duration of action of this antibiotic in this patient if the dose were doubled? (Part a: teff = 11.56 hr at 20 mg/kg.)',
 units:'hr', answer:15.16, tol:0.15,
 steps:[
  {k:'setup', t:'Doubled dose: 40 mg/kg; C0 = {{frac:40 mg/kg|0.3 L/kg}} = 133.3 mg/L; Ceff = 7.2 mg/L',
   why:'Twice the dose gives twice C0, because the volume of distribution does not change with the dose. 7.2 mcg/mL equals 7.2 mg/L, the MEC.'},
  {k:'algebra', t:'teff = {{frac:(3.6 hr) ln(133.3 ÷ 7.2)|0.693}} = {{frac:(3.6 hr) ln 18.52|0.693}} = {{frac:(3.6 hr)(2.919)|0.693}} = 15.16 hr',
   why:'The same half-life form with the doubled C0. The logarithm grows by ln 2 = 0.693, and 3.6 hr × 0.693 ÷ 0.693 is exactly one half-life, 3.6 hr.'},
  {k:'round', t:'15.16 − 11.56 = 3.6 hr, one half-life; teff = 15.16 hr',
   why:'Her key: "Increase of one half-life", 3.6 hr. Doubling the dose adds one half-life to the duration; it does not double it.'}],
 setup:{eq:'pd-teff-half', pre:['cp-db-vd'], why:'"If the dose were doubled": the half-life form of the duration line again, with C0 doubled; t½ and the MEC do not change.'},
 asks:'t',
 givens:[['D0', '20-mg/kg', 'doubled to 40 mg/kg, so C0 doubles'], ['VD', 'approximately 0.3 L/kg', 'unchanged by the dose'], ['t½', 'approximately 3.6 hours', 'the increase in teff'], ['Ceff', '7.2 mcg/mL', 'equals 7.2 mg/L']],
 check:{t:'Doubling the dose adds one half-life, 3.6 hr, to 11.56 hr: 15.16 hr, not twice 11.56.', lo:11.56, hi:23.12},
 teach:[PD_T_TEFF],
 cite:'PK-PD-Practice-3---Solutions.pdf, part b'},

/* ═══════════════ HOMEWORK 7, PROBLEM 1 (NUMBERS CHANGED) ═══════════════ */

{id:'hw7-1a', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'pd', concept:'auc-iv-exposure', skill:'auc', source:'slide',
 stem:PD_HW + ' a. What is the AUC (area under the curve) following the IV bolus dose?',
 units:'(mg/L)·hr', answer:346.3, tol:3.5,
 steps:[
  {k:'unit', t:'D0 = 12 mg/kg × 70 kg = 840 mg; VD = 0.25 L/kg × 70 kg = 17.5 L',
   why:'Dose and volume are both per kilogram, so each is multiplied by the 70-kg weight; the kilograms cancel and leave mg and L.'},
  {k:'setup', t:'k = {{frac:0.693|5 hr}} = 0.1386 hr⁻¹; ClT = k × VD = 0.1386 × 17.5 L = 2.426 L/hr',
   why:'Clearance is not given, so it is built from the half-life and the volume: Cl = kVD, total body clearance. hr⁻¹ × L leaves L/hr.'},
  {k:'algebra', t:'AUC = {{frac:F D0|ClT}} = {{frac:840 mg|2.426 L/hr}} = 346.3 (mg/L)·hr',
   why:'Cl = {{frac:F D0|AUC}} rearranged. F = 1 for an IV bolus, because the whole dose goes directly into the blood. mg over L/hr leaves (mg/L)·hr.'},
  {k:'round', t:'AUC = 346.3 (mg/L)·hr = {{frac:C0|k}} = {{frac:48 mg/L|0.1386 hr⁻¹}}',
   why:'The AUC is the total exposure from this one dose, the quantity an exposure–response relationship sets against the effect.'}],
 setup:{eq:'cl-auc', pre:['thalf-first', 'cl-k-vd'], why:'"AUC following the IV bolus dose" with dose, volume and half-life given: AUC = F D0 over Cl, with Cl = kVD first and F = 1.'},
 asks:'AUC',
 givens:[['weight', '70-kg', 'scales the dose and the volume'], ['D0', '12 mg/kg', '× 70 kg = 840 mg'], ['VD', '0.25 L/kg', '× 70 kg = 17.5 L'], ['t½', 'approximately 5 hours', 'k = 0.1386 hr⁻¹ for Cl = kVD']],
 check:{t:'AUC = C0 ÷ k, with C0 = 840 ÷ 17.5 = 48 mg/L and k = 0.1386 hr⁻¹: 346.3 (mg/L)·hr.', lo:0},
 teach:[{h:'AUC after an IV bolus', list:[
  'AUC = {{frac:F D0|Cl}}, with F = 1 for an IV bolus and Cl = k × VD.',
  'The same AUC is {{frac:C0|k}}, because C0 = {{frac:D0|VD}}.',
  'AUC is a measure of exposure: the dose or concentration side of the exposure–response relationship.']}],
 note:PD_HW_NOTE,
 cite:'Homework-7.pdf, problem 1a (her wording; numbers changed)'},

{id:'hw7-1b', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-calc', skill:'pkpd', source:'slide',
 stem:PD_HW + ' b. If the minimum effective concentration (MEC) is 4 mg/L, what is the duration of activity of this drug in this volunteer?',
 units:'hr', answer:17.93, tol:0.18,
 steps:[
  {k:'setup', t:'C0 = {{frac:D0|VD}} = {{frac:12 mg/kg|0.25 L/kg}} = 48 mg/L; k = {{frac:0.693|5 hr}} = 0.1386 hr⁻¹',
   why:'Dose and volume are both per kilogram, so the kilograms cancel in C0: 840 mg over 17.5 L is the same 48 mg/L. k comes from the half-life.'},
  {k:'algebra', t:'teff = {{frac:ln C0 − ln Ceff|k}} = {{frac:ln(48 ÷ 4)|0.1386 hr⁻¹}} = {{frac:ln 12|0.1386}} = {{frac:2.485|0.1386 hr⁻¹}}',
   why:'The duration is the time the level takes to fall from C0 to the MEC; the logarithm of their ratio over k gives that time.'},
  {k:'round', t:'teff = 17.93 hr',
   why:'2.485 ÷ 0.1386 = 17.93 hr: between 3 and 4 half-lives of 5 hr, because the 12-fold fall lies between 8 and 16.'}],
 setup:{eq:'pd-teff-ln', pre:['thalf-first', 'cp-db-vd'], why:'"Duration of activity" with an MEC: the natural-log duration line, with C0 = D0 over VD and k from the half-life.'},
 asks:'t',
 givens:[['Ceff', '4 mg/L', 'the MEC, where the duration ends'], ['D0', '12 mg/kg', 'over 0.25 L/kg gives C0 = 48 mg/L'], ['VD', '0.25 L/kg', 'the denominator of C0'], ['t½', 'approximately 5 hours', 'k = 0.1386 hr⁻¹'], ['weight', '70-kg', 'cancels in C0']],
 check:{t:'C0 ÷ Ceff = 12 lies between 8 and 16, so teff is between 3 and 4 half-lives of 5 hr: 17.93 hr.', lo:15, hi:20},
 teach:[PD_T_TEFF],
 note:PD_HW_NOTE,
 cite:'Homework-7.pdf, problem 1b (her wording; numbers changed)'},

{id:'hw7-1c', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'slide',
 stem:PD_HW + ' c. What is the duration of activity if the dose were 6 mg/kg? (Part b: minimum effective concentration (MEC) = 4 mg/L; duration of activity 17.93 hr at 12 mg/kg.)',
 units:'hr', answer:12.93, tol:0.13,
 steps:[
  {k:'setup', t:'C0 = {{frac:6 mg/kg|0.25 L/kg}} = 24 mg/L; k = 0.1386 hr⁻¹; Ceff = 4 mg/L',
   why:'Half the dose gives half of C0, because the volume does not change with the dose; k and the MEC are the same as in part b.'},
  {k:'algebra', t:'teff = {{frac:ln(24 ÷ 4)|0.1386 hr⁻¹}} = {{frac:ln 6|0.1386}} = {{frac:1.792|0.1386 hr⁻¹}} = 12.93 hr',
   why:'The level now has to fall only sixfold, from 24 to 4 mg/L, to reach the MEC, instead of twelvefold, so the duration is shorter than in part b.'},
  {k:'round', t:'17.93 − 12.93 = 5 hr, one half-life; teff = 12.93 hr',
   why:'Halving the dose removes one doubling, and each doubling adds one half-life, so 5 hr comes off the duration; the 17.93 hr is not halved.'}],
 setup:{eq:'pd-teff-ln', pre:['thalf-first', 'cp-db-vd'], why:'"Duration of activity if the dose were 6 mg/kg": the same natural-log duration line with the new C0; k and the MEC do not change.'},
 asks:'t',
 givens:[['D0', '6 mg/kg', 'half of 12 mg/kg, so C0 halves to 24 mg/L'], ['Ceff', '4 mg/L', 'the MEC from part b'], ['VD', '0.25 L/kg', 'unchanged by the dose'], ['t½', 'approximately 5 hours', 'the amount teff falls by']],
 check:{t:'Half the dose removes one half-life, 5 hr, from 17.93 hr: 12.93 hr, not half of 17.93.', lo:8.965, hi:17.93},
 teach:[PD_T_TEFF],
 note:PD_HW_NOTE,
 cite:'Homework-7.pdf, problem 1c (her wording; numbers changed)'},

{id:'hw7-1d', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'dosefor', concept:'dose-for-teff', skill:'pkpd', source:'slide',
 stem:PD_HW + ' d. What dose would provide a duration of action of 10 hours? (Part b: minimum effective concentration (MEC) = 4 mg/L.)',
 units:'mg', answer:279.9, tol:2.8,
 steps:[
  {k:'unit', t:'VD = 0.25 L/kg × 70 kg = 17.5 L; k = {{frac:0.693|5 hr}} = 0.1386 hr⁻¹',
   why:'The dose line wants the patient\'s volume in L, so the per-kilogram volume is multiplied by 70 kg; the half-life gives k for the exponent.'},
  {k:'algebra', t:'D0 = Ceff × VD × e^(k teff) = (4 mg/L)(17.5 L) e^((0.1386)(10)) = 70 mg × e^1.386',
   why:'C = C0e^(−kt) with C0 = D0 over VD, solved for the dose at the moment the level reaches the MEC. mg/L × L leaves 70 mg, the amount in the body at the MEC.'},
  {k:'algebra', t:'e^1.386 = 3.999, so D0 = 70 mg × 3.999 = 279.9 mg',
   why:'10 hours is two half-lives of 5 hr, so the level falls fourfold over that time and the dose must be four times the 70 mg at the MEC.'},
  {k:'round', t:'D0 = 279.9 mg (4.0 mg/kg for 70 kg)',
   why:'279.9 mg, or 4.0 mg/kg in the per-kilogram form the stem doses in; a lower dose than the 12 mg/kg, because 10 hours is shorter than 17.93.'}],
 setup:{eq:'pd-dose-teff', pre:['thalf-first'], why:'"What dose would provide a duration of action of 10 hours": the dose line D0 = Ceff × VD × e^(k teff), with VD scaled to 70 kg and k from the half-life.'},
 asks:'D0',
 givens:[['teff', '10 hours', 'the target duration, in the exponent'], ['Ceff', '4 mg/L', 'the MEC from part b'], ['VD', '0.25 L/kg', '× 70 kg = 17.5 L'], ['t½', 'approximately 5 hours', 'k = 0.1386 hr⁻¹'], ['weight', '70-kg', 'scales the volume']],
 check:{t:'10 hours is two half-lives of 5 hr, so the dose is 4 times the 70 mg at the MEC: 279.9 mg.', lo:70, hi:840},
 teach:[PD_T_DOSEFOR],
 note:PD_HW_NOTE,
 cite:'Homework-7.pdf, problem 1d (her wording; numbers changed)'},

/* ═══════════════ HOMEWORK 7, PROBLEM 1 (HER NUMBERS) ═══════════════
   Her stem as printed. No key of hers; every answer is computed from the
   stem by the method of the changed-number parts above, k = 0.693/4 carried
   in full: AUC 288.60 (mg/L)·hr, teff 14.95 hr, 10.95 hr, 337.4 mg. Each part
   carries dupOf its changed-number twin, so a paper never holds both. */

{id:'hw7o-1a', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', dupOf:'hw7-1a',
 topic:'pkpd', sub:'pd', concept:'auc-iv-exposure', skill:'auc', source:'slide',
 stem:PD_HWO + ' a. What is the AUC following the IV bolus dose?',
 units:'(mg/L)·hr', answer:288.6, tol:2.9,
 steps:[
  {k:'unit', t:'D0 = 15 mg/kg × 75 kg = 1125 mg; VD = 0.3 L/kg × 75 kg = 22.5 L',
   why:'Dose and volume are both per kilogram, so each is multiplied by the 75-kg weight; the kilograms cancel and leave mg and L.'},
  {k:'setup', t:'k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹; ClT = k × VD = 0.17325 × 22.5 L = 3.898 L/hr',
   why:'Clearance is not given, so it is built from the half-life and the volume: Cl = kVD, total body clearance. hr⁻¹ × L leaves L/hr.'},
  {k:'algebra', t:'AUC = {{frac:F D0|ClT}} = {{frac:1125 mg|3.898 L/hr}} = 288.6 (mg/L)·hr',
   why:'AUC, the area under the concentration–time curve, from Cl = {{frac:F D0|AUC}} rearranged. F = 1 for an IV bolus, because the whole dose goes directly into the blood. mg over L/hr leaves (mg/L)·hr.'},
  {k:'round', t:'AUC = 288.6 (mg/L)·hr = {{frac:C0|k}} = {{frac:50 mg/L|0.17325 hr⁻¹}}',
   why:'The AUC is the total exposure from this one dose, the quantity an exposure–response relationship sets against the effect.'}],
 setup:{eq:'cl-auc', pre:['thalf-first', 'cl-k-vd'], why:'"AUC following the IV bolus dose" with dose, volume and half-life given: AUC = F D0 over Cl, with Cl = kVD first and F = 1.'},
 asks:'AUC',
 givens:[['weight', '75-kg', 'scales the dose and the volume'], ['D0', '15 mg/kg', '× 75 kg = 1125 mg'], ['VD', '0.3 L/kg', '× 75 kg = 22.5 L'], ['t½', 'approximately 4 hours', 'k = 0.17325 hr⁻¹ for Cl = kVD']],
 check:{t:'AUC = C0 ÷ k, with C0 = 1125 ÷ 22.5 = 50 mg/L and k = 0.17325 hr⁻¹: 288.6 (mg/L)·hr.', lo:0},
 teach:[{h:'AUC after an IV bolus', list:[
  'AUC = {{frac:F D0|Cl}}, with F = 1 for an IV bolus and Cl = k × VD.',
  'The same AUC is {{frac:C0|k}}, because C0 = {{frac:D0|VD}}.',
  'AUC is a measure of exposure: the dose or concentration side of the exposure–response relationship.']}],
 note:PD_HWO_NOTE,
 cite:'Homework-7.pdf, problem 1a (her wording and numbers)'},

{id:'hw7o-1b', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', dupOf:'hw7-1b',
 topic:'pkpd', sub:'teff', concept:'teff-calc', skill:'pkpd', source:'slide',
 stem:PD_HWO + ' b. If the MEC is 3.75 mg/L, what is the duration of activity of this drug in this volunteer?',
 units:'hr', answer:14.95, tol:0.15,
 steps:[
  {k:'setup', t:'C0 = {{frac:D0|VD}} = {{frac:15 mg/kg|0.3 L/kg}} = 50 mg/L; k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹',
   why:'Dose and volume are both per kilogram, so the kilograms cancel in C0: 1125 mg over 22.5 L is the same 50 mg/L. k comes from the half-life.'},
  {k:'algebra', t:'teff = {{frac:ln C0 − ln Ceff|k}} = {{frac:ln(50 ÷ 3.75)|0.17325 hr⁻¹}} = {{frac:ln 13.33|0.17325}} = {{frac:2.590|0.17325 hr⁻¹}}',
   why:'The duration is the time the level takes to fall from C0 to the MEC, the minimum effective concentration; the logarithm of their ratio over k gives that time.'},
  {k:'round', t:'teff = 14.95 hr',
   why:'2.590 ÷ 0.17325 = 14.95 hr: between 3 and 4 half-lives of 4 hr, because the 13.33-fold fall lies between 8 and 16.'}],
 setup:{eq:'pd-teff-ln', pre:['thalf-first', 'cp-db-vd'], why:'"Duration of activity" with an MEC, the minimum effective concentration: the natural-log duration line, with C0 = D0 over VD and k from the half-life.'},
 asks:'t',
 givens:[['Ceff', '3.75 mg/L', 'the MEC, where the duration ends'], ['D0', '15 mg/kg', 'over 0.3 L/kg gives C0 = 50 mg/L'], ['VD', '0.3 L/kg', 'the denominator of C0'], ['t½', 'approximately 4 hours', 'k = 0.17325 hr⁻¹'], ['weight', '75-kg', 'cancels in C0']],
 check:{t:'C0 ÷ Ceff = 13.33 lies between 8 and 16, so teff is between 3 and 4 half-lives of 4 hr: 14.95 hr.', lo:12, hi:16},
 teach:[PD_T_TEFF],
 note:PD_HWO_NOTE,
 cite:'Homework-7.pdf, problem 1b (her wording and numbers)'},

{id:'hw7o-1c', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', dupOf:'hw7-1c',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'slide',
 stem:PD_HWO + ' c. What is the duration of activity if the dose were 7.5 mg/kg? (Part b: MEC = 3.75 mg/L; duration of activity 14.95 hr at 15 mg/kg.)',
 units:'hr', answer:10.95, tol:0.11,
 steps:[
  {k:'setup', t:'C0 = {{frac:7.5 mg/kg|0.3 L/kg}} = 25 mg/L; k = 0.17325 hr⁻¹; Ceff = 3.75 mg/L',
   why:'Half the dose gives half of C0, because the volume does not change with the dose; k and the MEC are the same as in part b.'},
  {k:'algebra', t:'teff = {{frac:ln(25 ÷ 3.75)|0.17325 hr⁻¹}} = {{frac:ln 6.667|0.17325}} = {{frac:1.897|0.17325 hr⁻¹}} = 10.95 hr',
   why:'The level now has to fall only 6.667-fold, from 25 to 3.75 mg/L, to reach the MEC, instead of 13.33-fold, so the duration is shorter than in part b.'},
  {k:'round', t:'14.95 − 10.95 = 4 hr, one half-life; teff = 10.95 hr',
   why:'Halving the dose removes one doubling, and each doubling adds one half-life, so 4 hr comes off the duration; the 14.95 hr is not halved.'}],
 setup:{eq:'pd-teff-ln', pre:['thalf-first', 'cp-db-vd'], why:'"Duration of activity if the dose were 7.5 mg/kg": the same natural-log duration line with the new C0; k and the MEC do not change.'},
 asks:'t',
 givens:[['D0', '7.5 mg/kg', 'half of 15 mg/kg, so C0 halves to 25 mg/L'], ['Ceff', '3.75 mg/L', 'the MEC from part b'], ['VD', '0.3 L/kg', 'unchanged by the dose'], ['t½', 'approximately 4 hours', 'the amount teff falls by']],
 check:{t:'Half the dose removes one half-life, 4 hr, from 14.95 hr: 10.95 hr, not half of 14.95.', lo:7.475, hi:14.95},
 teach:[PD_T_TEFF],
 note:PD_HWO_NOTE,
 cite:'Homework-7.pdf, problem 1c (her wording and numbers)'},

{id:'hw7o-1d', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11', dupOf:'hw7-1d',
 topic:'pkpd', sub:'dosefor', concept:'dose-for-teff', skill:'pkpd', source:'slide',
 stem:PD_HWO + ' d. What dose would provide a duration of action of 8 hours? (Part b: MEC = 3.75 mg/L.)',
 units:'mg', answer:337.4, tol:3.4,
 steps:[
  {k:'unit', t:'VD = 0.3 L/kg × 75 kg = 22.5 L; k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹',
   why:'The dose line wants the patient\'s volume in L, so the per-kilogram volume is multiplied by 75 kg; the half-life gives k for the exponent.'},
  {k:'algebra', t:'D0 = Ceff × VD × e^(k teff) = (3.75 mg/L)(22.5 L) e^((0.17325)(8)) = 84.38 mg × e^1.386',
   why:'C = C0e^(−kt) with C0 = D0 over VD, solved for the dose at the moment the level reaches the MEC. mg/L × L leaves 84.38 mg, the amount in the body at the MEC.'},
  {k:'algebra', t:'e^1.386 = 3.999, so D0 = 84.38 mg × 3.999 = 337.4 mg',
   why:'8 hours is two half-lives of 4 hr, so the level falls fourfold over that time and the dose must be four times the 84.38 mg at the MEC.'},
  {k:'round', t:'D0 = 337.4 mg (4.50 mg/kg for 75 kg)',
   why:'337.4 mg, or 4.50 mg/kg in the per-kilogram form the stem doses in; a lower dose than the 15 mg/kg, because 8 hours is shorter than the duration at 15 mg/kg.'}],
 setup:{eq:'pd-dose-teff', pre:['thalf-first'], why:'"What dose would provide a duration of action of 8 hours": the dose line D0 = Ceff × VD × e^(k teff), with VD scaled to 75 kg and k from the half-life.'},
 asks:'D0',
 givens:[['teff', '8 hours', 'the target duration, in the exponent'], ['Ceff', '3.75 mg/L', 'the MEC from part b'], ['VD', '0.3 L/kg', '× 75 kg = 22.5 L'], ['t½', 'approximately 4 hours', 'k = 0.17325 hr⁻¹'], ['weight', '75-kg', 'scales the volume']],
 check:{t:'8 hours is two half-lives of 4 hr, so the dose is 4 times the 84.38 mg at the MEC: 337.4 mg.', lo:84.375, hi:1125},
 teach:[PD_T_DOSEFOR],
 note:PD_HWO_NOTE,
 cite:'Homework-7.pdf, problem 1d (her wording and numbers)'}
];

CHAINS.push(
 {id:'pd-example', src:'example', module:9, name:'An antibiotic with an MEC of 0.2 mcg/mL',
  setup:'V<sub>D</sub> 24 L, k 0.15 h<sup>&minus;1</sup>: t<sub>eff</sub> for 250 mg, 1000 mg and 500 mg, then the dose that doubles t<sub>eff</sub>',
  parts:['pd-ex-a', 'pd-ex-b', 'pd-ex-c', 'pd-ex-d']},
 {id:'pd-inclass-1', src:'inclass', module:9, name:'In-Class Activity PK-PD, problem 1: a 250 mg IV bolus',
  setup:'t&frac12; 3 hr, V<sub>D</sub> 25 L, MEC 1.2 mcg/mL: the duration of action, then the dose for 12 hours',
  parts:['pd-ic1a', 'pd-ic1b']},
 {id:'pd-inclass-2', src:'inclass', module:9, name:'In-Class Activity PK-PD, problem 2: Cp = 50e^(\u22120.2t)',
  setup:'500 mg IV bolus, MEC 5 mcg/mL: the duration of action, the dose that doubles it, and the change at 250 mg',
  parts:['pd-ic2a', 'pd-ic2b', 'pd-ic2c']},
 {id:'pd-practice-1', src:'practice', module:9, name:'PK-PD Practice 1: an antibiotic at 500 mg and 2000 mg',
  setup:'V<sub>D</sub> 15 L, t&frac12; 5 hr, MEC 10 mcg/mL: t<sub>eff</sub> at 500 mg, then four times the dose',
  parts:['pd-p1a', 'pd-p1b']},
 {id:'pd-practice-2', src:'practice', module:9, name:'PK-PD Practice 2: a 165-pound male at 5 mg/kg',
  setup:'MEC 12 mcg/mL, V<sub>D</sub> 0.15 L/kg, t&frac12; 4.75 hr: t<sub>eff</sub>, then the dose for a t<sub>eff</sub> of 12 hours',
  parts:['pd-p2a', 'pd-p2b']},
 {id:'pd-practice-3', src:'practice', module:9, name:'PK-PD Practice 3: a 75-kg patient at 20 mg/kg',
  setup:'V<sub>D</sub> 0.3 L/kg, t&frac12; 3.6 hr, MEC 7.2 mcg/mL: the duration of action, then with the dose doubled',
  parts:['pd-p3a', 'pd-p3b']},
 {id:'hw7-p1', src:'homework', module:9, name:'Homework 7, problem 1: an investigational drug by IV bolus (changed numbers)',
  setup:'70 kg, 12 mg/kg, V<sub>D</sub> 0.25 L/kg, t&frac12; 5 hr: AUC, the duration at an MEC of 4 mg/L, at half the dose, and the dose for 10 hours',
  parts:['hw7-1a', 'hw7-1b', 'hw7-1c', 'hw7-1d']},
 {id:'hw7o-p1', src:'homework', module:9, name:'Homework 7, problem 1: an investigational drug by IV bolus (original numbers)',
  setup:'75 kg, 15 mg/kg, V<sub>D</sub> 0.3 L/kg, t&frac12; 4 hr: AUC, the duration at an MEC of 3.75 mg/L, at half the dose, and the dose for 8 hours',
  parts:['hw7o-1a', 'hw7o-1b', 'hw7o-1c', 'hw7o-1d']}
);
