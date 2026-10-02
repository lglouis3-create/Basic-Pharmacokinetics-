/* ==========================================================================
   PHAR 4221 — Module 1 question bank
   Introduction, kinetic orders and AUC (17 & 19 August, lecture L01)
   ==========================================================================
   Sources used, and nothing else:
     Introduction.pdf                       — the deck, printed slide text only
     RecapExam1.pdf                         — her own Module 1 revision slides
     BasicPharmacokineticsEquations.pdf     — the exam equation sheet
     STYLE.md                               — her assigned problems and keys
     TRANSCRIPT_CUES.md                     — 08-17, 08-19 and 09-09 captions

   TOPICS is declared here because this is the first question file: it carries
   the whole course, not just Module 1, since the topics view is built from it.
   Topics for Modules 2 to 5 carry subtopics drawn from those decks' own
   objectives slides and no questions yet.
   ========================================================================== */

const TOPICS = [

 /* ───────── Module 1 ───────── */
 {id:'intro', name:'What pharmacokinetics is', prof:'Mosley', open:true,
  cite:'Introduction.pdf slides 2–15',
  subs:[
   {id:'disc',   name:'Pharmacokinetics and the related disciplines', cite:'Introduction.pdf slides 3–8'},
   {id:'terms',  name:'ADME and the fundamental terms',               cite:'Introduction.pdf slides 4–5'},
   {id:'matrix', name:'Whole blood, serum and plasma',                cite:'Introduction.pdf slide 10'},
   {id:'models', name:'Pharmacokinetic models',                       cite:'Introduction.pdf slides 11–14'},
   {id:'curve',  name:'The concentration versus time curve',          cite:'Introduction.pdf slide 9'}]},

 {id:'orders', name:'Kinetic orders and the maths', prof:'Mosley', open:true,
  cite:'Introduction.pdf slides 16–21',
  subs:[
   {id:'zero',   name:'Zero-order reactions',                 cite:'Introduction.pdf slide 17'},
   {id:'first',  name:'First-order reactions',                cite:'Introduction.pdf slide 18'},
   {id:'half',   name:'Half-life, both orders',               cite:'Introduction.pdf slide 19'},
   {id:'plots',  name:'Linear and semi-logarithmic plots',    cite:'Introduction.pdf slides 20–21'},
   {id:'decide', name:'Deciding the order from a data set',   cite:'Introduction.pdf slides 17–18'}]},

 {id:'auc', name:'Area under the curve', prof:'Mosley',
  cite:'Introduction.pdf slides 22–26',
  subs:[
   {id:'concept', name:'What the area under the curve tells you', cite:'Introduction.pdf slides 22–23'},
   {id:'trap',    name:'The trapezoidal rule',                    cite:'Introduction.pdf slides 24–25'}]},

 /* ───────── Module 2 — no questions in this file ───────── */
 {id:'bolus1', name:'One-compartment IV bolus', prof:'Mosley',
  cite:'2IVBolusAdministration.pdf, slide "Lecture Objectives"',
  subs:[
   {id:'model', name:'The one-compartment model after an IV bolus injection',
    cite:'2IVBolusAdministration.pdf, slide "Lecture Objectives", bullet 1'},
   {id:'vd', name:'Volume of distribution',
    cite:'2IVBolusAdministration.pdf, slides "Volume of Distribution"'},
   {id:'cl', name:'Clearance',
    cite:'2IVBolusAdministration.pdf, slide "Clearance"'},
   {id:'calc', name:'Parameters from concentration versus time data',
    cite:'2IVBolusAdministration.pdf, slide "Lecture Objectives", bullet 3'}]},

 {id:'bolus2', name:'Multicompartment IV bolus', prof:'Mosley',
  cite:'RecapExam1.pdf, slide "Lecture Objectives – Module 2 – Multi-Compartment IV Bolus"',
  subs:[
   {id:'why', name:'Why some drugs need more than one compartment',
    cite:'RecapExam1.pdf, slide "Lecture Objectives – Module 2 – Multi-Compartment IV Bolus", bullets 1–2'},
   {id:'params', name:'A, B, alpha, beta and the rate constants',
    cite:'2IVBolusAdministration.pdf, slides "Concentration of Drug in the Central Compartment" and "Rate Constants"'},
   {id:'calc', name:'Predicting concentration and the apparent volumes',
    cite:'2IVBolusAdministration.pdf, slides "Practice" and "Apparent Volumes of Distribution"'}]},

 /* ───────── Module 3 — no questions in this file ───────── */
 {id:'infusion', name:'Intravenous infusion', prof:'Mosley',
  cite:'3IntravenousInfusions.pdf, slide "Objectives"',
  subs:[
   {id:'basics', name:'What an infusion does, and why the input is zero order',
    cite:'3IntravenousInfusions.pdf, slide "Intravenous Infusion"'},
   {id:'css', name:'Steady state and continuous dosing',
    cite:'3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State"'},
   {id:'pre', name:'Concentration before steady state is reached',
    cite:'3IntravenousInfusions.pdf, slides "Drug Concentration Prior to Reaching Steady-State"'},
   {id:'rate', name:'Infusion rate for a target steady-state concentration',
    cite:'3IntravenousInfusions.pdf, slide "Objectives", bullet 6'},
   {id:'time', name:'Time to reach a stated fraction of steady state',
    cite:'3IntravenousInfusions.pdf, slide "Example 4"'},
   {id:'stop', name:'Concentration after the infusion is stopped',
    cite:'3IntravenousInfusions.pdf, slide "Drug Concentration after an IV Infusion has Ended"'},
   {id:'load', name:'Loading dose, alone and with a continuous infusion',
    cite:'3IntravenousInfusions.pdf, slides "IV Bolus Loading Dose and Continuous IV Infusion"'}]},

 /* ───────── Module 4 — no questions in this file ───────── */
 {id:'clearance', name:'Elimination, clearance and renal clearance', prof:'Mosley',
  cite:'4---Clearance-and-Elimination.pdf slide 2',
  subs:[
   {id:'routes', name:'The main routes of elimination, renal and hepatic',
    cite:'4---Clearance-and-Elimination.pdf slide 2, bullet 1'},
   {id:'renalmech', name:'Glomerular filtration, tubular secretion and reabsorption',
    cite:'4---Clearance-and-Elimination.pdf slide 2, bullet 2'},
   {id:'crclcalc', name:'Creatinine clearance and its significance',
    cite:'4---Clearance-and-Elimination.pdf slide 2, bullet 3'},
   {id:'ionization', name:'Degree of ionization and renal excretion',
    cite:'4---Clearance-and-Elimination.pdf slide 2, bullet 4'},
   {id:'clcalc', name:'Total, renal and hepatic clearance',
    cite:'4---Clearance-and-Elimination.pdf slide 2, bullet 5'}]},

 /* ───────── Module 5 — no questions in this file ───────── */
 {id:'oral', name:'Oral absorption, single dose', prof:'Mosley',
  cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf slide 2',
  subs:[
   {id:'extravasc', name:'Kinetics after extravascular administration',
    cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf slide 2, bullet 1'},
   {id:'conc', name:'Plasma concentration after a single oral dose',
    cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf slide 2, bullet 2'},
   {id:'peak', name:'Peak concentration and time to peak',
    cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf slide 2, bullet 3'},
   {id:'changes', name:'Effects of changing ka, k and dose',
    cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf slide 2, bullet 4'}]},

 /* ───────── Module 6 — no questions in this file ───────── */
 {id:'multi', name:'Multiple dosing: repeated IV bolus', prof:'Mosley',
  cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Objectives"',
  subs:[
   {id:'accum', name:'Drug accumulation and steady state',
    cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Drug accumulation with repeated administration"'},
   {id:'superpos', name:'The principle of superposition',
    cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Superposition"'},
   {id:'ssbolus', name:'Maximum, minimum and average at steady state',
    cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Amount of Drug in the Body Following Repeated IV Bolus Injections" to "Example 1"'},
   {id:'ndose', name:'Concentration after n doses and after the last dose',
    cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Plasma Drug Concentration at Any Time After n Doses" to "Example 3"'}]},

 {id:'intermit', name:'Multiple dosing: intermittent IV infusions', prof:'Mosley',
  cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Intermittent Intravenous Infusions"',
  subs:[
   {id:'why', name:'Why, and the equation for one infusion',
    cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Rationale" and "Administering One or More Doses by IV Infusion"'},
   {id:'add', name:'Adding the infusions on a time line',
    cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Example 4" to "Summary"'}]},

 {id:'multoral', name:'Multiple dosing: oral doses', prof:'Mosley',
  cite:'6a---Multiple-Oral-Doses.pdf, slide "Objectives"',
  subs:[
   {id:'oeq', name:'The multiple-oral-dose equations',
    cite:'6a---Multiple-Oral-Doses.pdf, slides "Concentration of Drug in the Plasma at Any Time" and "Peak, Trough and Average Plasma Concentrations at Steady State"'},
   {id:'ossc', name:'Peak, trough and time to peak at steady state',
    cite:'6a---Multiple-Oral-Doses.pdf, slides "Time to Peak at Steady State" and "Example 1"'},
   {id:'oparam', name:'Changing the dose and the dosing interval',
    cite:'6a---Multiple-Oral-Doses.pdf, slides "Multiple-Dosage Regimens" to "Consider Peak and Trough"'}]},
];


/* ==========================================================================
   PROBLEM SETS
   ==========================================================================
   Dr. Mosley sets most of her calculations as one vignette asked in parts,
   where a part uses what the part before it produced: the rate constant found
   in (a) becomes the half-life in (b), the half-life feeds the time for 99.9
   per cent in (h), and she flags the dependency in words — "at the rate you
   determined above", "the drug in question #1" (STYLE.md, habit 7). Working a
   set straight through is a different exercise from meeting one part cold,
   because a wrong answer early carries into every part after it.

   Each part is still written to stand on its own, restating the value it
   needs, so the scheduler can ask any one of them in isolation and a student
   who missed (a) is not blocked from (f). This table only records the order
   she asks them in and the vignette they share.

   `parts` is question ids in her order. `name` is what the set is, `setup` is
   the vignette in one line, written as HTML so an equation in it can carry real
   subscripts and superscripts, and `module` places it in the Topics view.
   test.js checks that every id here exists and that no part is listed twice.
   ========================================================================== */
const CHAINS = [
 {id:'m1-first', src:'practice', module:1, name:'Decomposition of a drug solution, first order',
  setup:'One table of six samples over 48 hours, worked through to the time for 90 per cent',
  parts:['m1-ord-n01','m1-ord-n02','m1-ord-n03','m1-ord-n04']},

 {id:'m1-zero', src:'practice', module:1, name:'The same experiment, zero order',
  setup:'Her identical stem with numbers that make the decomposition zero order, in four parts',
  parts:['m1-ord-n05','m1-ord-n17','m1-ord-n06','m1-ord-n18']},

 {id:'m1-antibiotic', src:'homework', module:1, name:'An antibiotic dissolved in purified water',
  setup:'Aliquots assayed over 16 hours, ending in the volume the solution was made up to',
  parts:['m1-ord-n09','m1-ord-n10']},

 {id:'m1-30days', src:'review', module:1, name:'A solution assayed after 30 days, read both ways',
  setup:'The same two concentrations taken first as first order and then as zero order',
  parts:['m1-ord-n14','m1-ord-n15']},

 {id:'m1-auc', src:'example', module:1, name:'Area under the curve from one table of plasma levels',
  setup:'Six plasma levels, with the trapezoidal rule applied over two different intervals',
  parts:['m1-auc-n02','m1-auc-n01']},

 {id:'m2-table', src:'practice', module:2, name:'IV bolus from a concentration–time table (a–h)',
  setup:'50 mg to a 70-kg patient, six samples over 3 hours, her eight-part battery in her order',
  parts:['m2-n-k1','m2-n-t1','m2-n-c0a','m2-n-c15','m2-n-vd1','m2-n-cl1','m2-n-d3a','m2-n-999a']},

 {id:'m2-points', src:'practice', module:2, name:'IV bolus from two plasma points (a–h)',
  setup:'250 mg of an antibiotic, two concentrations in prose, the same eight parts',
  parts:['m2-n-k2','m2-n-t2','m2-n-c0b','m2-n-c15b','m2-n-vd2','m2-n-cl3','m2-n-d3b','m2-n-999b']},

 {id:'m3-theophylline', src:'example', module:3, name:'Theophylline by continuous infusion',
  setup:'The plateau at 50 mg/hr, then the rate that would reach a different plateau',
  parts:['inf-n1','inf-n2']},

 {id:'m3-150mg', src:'example', module:3, name:'150 mg infused over 6 hours',
  setup:'The concentration at the end of the infusion, then 3 hours after it stops',
  parts:['inf-n6','inf-n7']},

 {id:'m3-agent24', src:'review', module:3, name:'An agent targeted at 24 mg/L',
  setup:'Rate, loading dose, the climb at 10 hours and the decay after an early stop',
  parts:['inf-n10','inf-n12','inf-n11','inf-n13']},

 {id:'m3-inclass', src:'inclass', module:3, name:'Recommend a rate and a loading dose, then four scenarios',
  setup:'C<sub>ss</sub> 20 mg/L, t&frac12; 5 hr, V<sub>D</sub> 16 L &mdash; with the loading dose and without it, side by side',
  parts:['inf-n14','inf-n19','inf-n20','inf-n21','inf-n15']},

 {id:'m3-3days', src:'inclass', module:3, name:'A loading dose with a 75 mg/hr infusion for 3 days',
  setup:'Where the 500 mg loading dose in her stem is not the appropriate one',
  parts:['inf-n22','inf-n23','inf-n24','inf-n25','inf-n26']},

 {id:'m3-female', src:'practice', module:3, name:'A 35-year-old, 65-kg patient on infusion',
  setup:'The rate from a volume stated as a percentage of body weight, then the time to 95 per cent',
  parts:['inf-n17','inf-n16']},

 {id:'m4-battery', src:'example', module:4, name:'500 mg IV bolus with a 48-hour urine collection',
  setup:'Her six-part battery: f<sub>e</sub>, k, k<sub>e</sub>, then total, renal and hepatic clearance',
  parts:['m4-n-fe','m4-n-k','m4-n-ke','m4-n-clt','m4-n-clr','m4-n-clh']},

 {id:'m4-antibiotic', src:'example', module:4, name:'An antibiotic secreted by the kidney, before and after renal failure',
  setup:'k and half-life at a clearance of 750 mL/min, then the half-life at 150 mL/min',
  parts:['m4-n-abk','m4-n-ab1','m4-n-ab2']},

 {id:'m4-crcl', src:'example', module:4, name:'Creatinine clearance for a 45-year-old female',
  setup:'Height in centimetres to inches, then ideal body weight, then Cockcroft–Gault',
  parts:['m4-n-inches','m4-n-ibwf','m4-n-crcl']},

 {id:'m5-investigational', src:'example', module:5, name:'An investigational drug given as a 500-mg oral dose',
  setup:'The two rate constants, then t<sub>max</sub> and C<sub>max</sub>, then C<sub>max</sub> when the dose is doubled',
  parts:['m5-n01','m5-n02','m5-n03','m5-n04','m5-n19']},

 {id:'m5-antibiotic', src:'example', module:5, name:'An oral antibiotic given by its two-exponential equation',
  setup:'C<sub>p</sub> = 75(e<sup>&minus;0.22t</sup> &minus; e<sup>&minus;2.75t</sup>), read for both half-lives, the peak, the volume and a later point',
  parts:['m5-n05','m5-n06','m5-n07','m5-n08','m5-n09','m5-n10']},

 {id:'m5-750', src:'inclass', module:5, name:'A 750-mg oral dose given by its equation',
  setup:'C<sub>p</sub> = 23.2(e<sup>&minus;0.182t</sup> &minus; e<sup>&minus;0.872t</sup>), read for the half-life, the peak and the volume',
  parts:['m5-n16','m5-n17','m5-n18','m5-n15']},

 {id:'m5-500', src:'example', module:5, name:'A 500-mg oral dose, 88 per cent bioavailable',
  setup:'The absorption rate constant, t<sub>max</sub> and C<sub>max</sub>, then C<sub>max</sub> when the volume doubles',
  parts:['m5-n11','m5-n12','m5-n13','m5-n14']},

 {id:'m6-ex1', src:'example', module:6, name:'An antibiotic, 10 mg/kg every 8 hours by IV bolus',
  setup:'t&frac12; 4 hr, V<sub>D</sub> 25% of body weight, a 65-kg female: the first dose, then C<sub>max</sub>, C<sub>min</sub> and C<sub>avg</sub> at steady state',
  parts:['m6-n01','m6-n02','m6-n03','m6-n04','m6-n05']},

 {id:'m6-ex23', src:'example', module:6, name:'The same antibiotic before steady state and after the last dose',
  setup:'3 hours after the 2nd dose, then 3 and 4 hours after the last dose at steady state',
  parts:['m6-n06','m6-n07','m6-n08']},

 {id:'m6-practice1', src:'practice', module:6, name:'One gram every 8 hours to a 65-kg patient (a–h)',
  setup:'V<sub>D</sub> 26.2 L/100 kg, Cl<sub>T</sub> 52.95 mL/min per 70 kg: her parts (a) to (h) in her order; part (i), the renal mechanism, is with the concepts',
  parts:['m6-p1a','m6-p1b','m6-p1c','m6-p1d','m6-p1e','m6-p1f','m6-p1g','m6-p1h']},

 {id:'m6-ex4', src:'example', module:6, name:'Two 2-hour infusions of 300 mg, 6 hours apart',
  setup:'k 0.15 hr<sup>&minus;1</sup>, V<sub>D</sub> 15 L: the rate, the end of the first infusion, then 4 hours after the second ends',
  parts:['m6b-n01','m6b-n02','m6b-n03']},

 {id:'m6-act1', src:'inclass', module:6, name:'In-class activity 1: 500 mg over 2 hours, twice',
  setup:'t&frac12; 3 hr, V<sub>D</sub> 18 L, the second infusion starting 6 hours after the first: the end of the first, then 4 hours after the second ends',
  parts:['m6b-n04','m6b-n05']},

 {id:'m6-act2', src:'inclass', module:6, name:'In-class activity 2: 150 mg over 1.5 hours, twice',
  setup:'Cl 2.54 L/hr, V<sub>D</sub> 22 L, 8 hours between starts: the end of the first, 6 hours after the second ends, then the plateau of a continuous infusion',
  parts:['m6b-n06','m6b-n07','m6b-n08']},

 {id:'m6-tetracycline', src:'example', module:6, name:'Tetracycline 250 mg orally every 8 hours',
  setup:'F 0.75, V<sub>D</sub> 1.5 L/kg in a 75-kg male, t&frac12; 10 hr, k<sub>a</sub> 0.9 hr<sup>&minus;1</sup>: the first-dose peak, then the peak, trough and average at steady state',
  parts:['m6b-n09','m6b-n10','m6b-n11','m6b-n12','m6b-n13','m6b-n14']},
];

/* Where each problem set comes from, in `src` above:
     example   a worked example on her lecture slides (listed under Calculations)
     practice  a posted practice sheet with her solutions          (Worksheets)
     inclass   an in-class activity or in-class practice            (Worksheets)
     homework  a homework problem, her wording                      (Worksheets)
     review    a practice item from her exam-review slides          (Worksheets) */
const WORKSHEET_KINDS = [
  ['practice', 'Practice sheets', 'Her posted practice problems, worked in her part order'],
  ['inclass',  'In-class activities', 'The problems worked in class'],
  ['homework', 'Homework', 'Her homework wording; numbers marked as changed are not the graded ones'],
  ['review',   'Exam review practice', 'Practice items from her exam-review slides'],
];

/* The objectives on each module's Objectives slide, in her wording (the same
   lines head the Guides). Each concept question belongs to the objective its
   subtopic serves; a subtopic may serve two objectives. Objectives with no
   concept question (calculation-only objectives) are left out of the list. */
const OBJECTIVES = [
  {module:1, n:'1', text:'Define pharmacokinetics and discuss some related disciplines', subs:['intro/disc']},
  {module:1, n:'2', text:'Describe the types of pharmacokinetic modeling', subs:['intro/models']},
  {module:1, n:'3', text:'Define some fundamental pharmacokinetics terms', subs:['intro/terms', 'intro/matrix', 'intro/curve']},
  {module:1, n:'4', text:'Differentiate between orders of reaction and calculate basic parameters given a data set', subs:['orders/zero', 'orders/first', 'orders/half', 'orders/plots', 'orders/decide']},
  {module:1, n:'5', text:'Determine the area under the curve for a provided data set using the trapezoidal rule', subs:['auc/concept', 'auc/trap']},
  {module:2, n:'1', text:'Describe a one-compartment model, IV bolus injection', subs:['bolus1/model']},
  {module:2, n:'2', text:'Define key pharmacokinetic parameters – clearance and volume of distribution', subs:['bolus1/vd', 'bolus1/cl']},
  {module:2, n:'4', text:'Differentiate between single and multiple-compartment pharmacokinetic models', subs:['bolus2/why']},
  {module:2, n:'5', text:'Explain why some drugs best fit a multi-compartment model', subs:['bolus2/why']},
  {module:2, n:'6', text:'Predict drug concentration following IV bolus administration in a multi-compartment model', subs:['bolus2/params']},
  {module:3, n:'1', text:'Discuss and describe the pharmacokinetics of a medicinal agent following administration by IV infusion', subs:['infusion/basics']},
  {module:3, n:'2', text:'Describe the concept of steady state and how it relates to continuous dosing', subs:['infusion/css']},
  {module:3, n:'5', text:'Describe the purpose of a loading dose', subs:['infusion/load']},
  {module:3, n:'7', text:'Determine the plasma concentration given pharmacokinetic parameters at any time', subs:['infusion/pre', 'infusion/stop']},
  {module:4, n:'1', text:'Describe the main routes of drug elimination from the body – renal and hepatic', subs:['clearance/routes']},
  {module:4, n:'2', text:'Define glomerular filtration, tubular secretion, and tubular reabsorption', subs:['clearance/renalmech']},
  {module:4, n:'3', text:'Calculate creatinine clearance and discuss significance', subs:['clearance/crclcalc']},
  {module:4, n:'4', text:'Discuss the effect of degree of ionization on the renal excretion of drugs', subs:['clearance/ionization']},
  {module:4, n:'5', text:'Calculate total, renal and hepatic clearance', subs:['clearance/clcalc']},
  {module:5, n:'1', text:'Describe the kinetics of a drug following extravascular administration', subs:['oral/extravasc']},
  {module:5, n:'2', text:'Calculate plasma drug concentration following extravascular administration of a single dose', subs:['oral/conc']},
  {module:5, n:'3', text:'Calculate peak plasma concentration and the time to peak following extravascular administration of a single dose', subs:['oral/peak']},
  {module:5, n:'4', text:'Discuss the effects of changing various parameters on the pharmacokinetics following extravascular administration', subs:['oral/changes']},
  {module:6, n:'1', text:'Explain the principle of superposition and its assumptions in multiple-dose regimens', subs:['multi/accum', 'multi/superpos']},
  {module:6, n:'2', text:'Predict the concentration of drug in the plasma at any time following multiple IV bolus injections of drug', subs:['multi/ssbolus', 'multi/ndose']},
  {module:6, n:'3', text:'Predict the concentration of drug in the plasma at any time following multiple IV infusions of drug', subs:['intermit/why', 'intermit/add']},
  {module:6, n:'6a.1', text:'Calculate plasma drug concentration following multiple extravascular administrations of drug', subs:['multoral/oeq', 'multoral/ossc']},
  {module:6, n:'6a.2', text:'Discuss the effects of changing various parameters on the pharmacokinetics', subs:['multoral/oparam']},
];

/* The kinds of calculation each module asks, in the order they are taught.
   A calculation question belongs to the first type it matches (topic/sub, and
   skill where given); test.js checks every calculation lands in exactly one.
   `example` is the question whose working is shown as the worked example. */
const CALC_TYPES = [
  {module:1, id:'m1-decide', name:'Deciding the order from a data set, then k', match:['orders/decide'], example:'m1-ord-n01'},
  {module:1, id:'m1-zero', name:'Zero order: rate, concentration and time', match:['orders/zero'], example:'m1-ord-n17'},
  {module:1, id:'m1-first', name:'First order: concentration and time', match:['orders/first'], example:'m1-ord-n02'},
  {module:1, id:'m1-half', name:'Half-life and the time to decompose', match:['orders/half'], example:'m1-ord-n12'},
  {module:1, id:'m1-auc', name:'Area under the curve by the trapezoidal rule', match:['auc/trap'], example:'m1-auc-n01'},
  {module:2, id:'m2-k', name:'Rate constant and half-life after an IV bolus', match:['bolus1/calc:krate'], example:'m2-n-k2'},
  {module:2, id:'m2-c', name:'Concentration or amount at a time', match:['bolus1/calc:conctime'], example:'m2-n-c0a'},
  {module:2, id:'m2-vdcl', name:'Volume of distribution and clearance', match:['bolus1/calc:vddose', 'bolus1/calc:clearance'], example:'m2-n-cl2'},
  {module:2, id:'m2-two', name:'Two compartments: A, B, alpha, beta and the rate constants', match:['bolus2/calc'], example:'m2-n-koverall'},
  {module:3, id:'m3-rate', name:'Infusion rate and the steady-state concentration', match:['infusion/css', 'infusion/rate'], example:'inf-n10'},
  {module:3, id:'m3-pre', name:'Concentration during an infusion, before steady state', match:['infusion/pre'], example:'inf-n3'},
  {module:3, id:'m3-time', name:'Time to reach a stated fraction of steady state', match:['infusion/time'], example:'inf-n4'},
  {module:3, id:'m3-stop', name:'Concentration after the infusion stops', match:['infusion/stop'], example:'inf-n5'},
  {module:3, id:'m3-load', name:'Loading dose, alone and with an infusion', match:['infusion/load'], example:'inf-n12'},
  {module:4, id:'m4-cl', name:'Total, renal and hepatic clearance, and the elimination rate', match:['clearance/clcalc:clearance'], example:'m4-n-clt'},
  {module:4, id:'m4-amt', name:'Amount in the body and concentration at a time', match:['clearance/clcalc:vddose', 'clearance/clcalc:conctime'], example:'ws4-1e'},
  {module:4, id:'m4-k', name:'Rate constant and half-life from clearance, and renal failure', match:['clearance/clcalc'], example:'m4-n-abk'},
  {module:4, id:'m4-crcl', name:'Creatinine clearance and ideal body weight', match:['clearance/crclcalc'], example:'m4-n-crcl'},
  {module:5, id:'m5-cl', name:'Clearance, AUC and the renal and metabolic split', match:['oral:clearance'], example:'ws5-1-1t'},
  {module:5, id:'m5-k', name:'Absorption and elimination rate constants and half-lives', match:['oral/extravasc:krate', 'oral/conc:krate', 'oral/changes:krate'], example:'m5-n01'},
  {module:5, id:'m5-conc', name:'Concentration, F and volume from the oral equation', match:['oral/conc', 'oral/extravasc'], example:'m5-n10'},
  {module:5, id:'m5-peak', name:'Peak concentration and time to peak', match:['oral/peak', 'oral/changes'], example:'m5-n03'},
  {module:6, id:'m6-ss', name:'Repeated IV bolus: peak, trough and average at steady state', match:['multi/ssbolus'], example:'m6-n03'},
  {module:6, id:'m6-n', name:'Repeated IV bolus: after n doses and after the last dose', match:['multi/ndose'], example:'m6-n06'},
  {module:6, id:'m6-inf1', name:'One intermittent infusion: rate and the end-of-infusion level', match:['intermit/why'], example:'m6b-n02'},
  {module:6, id:'m6-infadd', name:'Adding infusions on a time line', match:['intermit/add'], example:'m6b-n03'},
  {module:6, id:'m6-oral', name:'Multiple oral doses: peak, trough, time to peak and average', match:['multoral/ossc'], example:'m6b-n12'},
];


const Q_MODULE1 = [

/* ══════════════════ INTRO — disciplines, terms, matrix, models, curve ═══ */

{id:'m1-int-01', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'disc', concept:'biopharmaceutics-defn', skill:'recall',
 source:'both',
 stem:'Which term covers the interrelationship of the physicochemical properties of a drug, the dosage form in which it is given, and the route of administration on the rate and extent of systemic drug absorption?',
 options:[
  {t:'Biopharmaceutics', correct:true,
   why:'This is her definition of biopharmaceutics: drug properties, dosage form and route, acting on the rate and extent of systemic absorption. Biopharmaceutics stops where the drug enters the circulation, which is where pharmacokinetics starts.'},
  {t:'Toxicology', correct:false,
   why:'Clinical toxicology studies the adverse effects of drugs in the body: what a drug does once present, not how much gets in. Choosing it usually comes from reading "extent" as extent of injury rather than extent of absorption.'},
  {t:'Pharmacodynamics', correct:false,
   why:'Pharmacodynamics relates drug concentration at the site of action to pharmacological response, so its two variables are concentration and effect. The definition names dosage form and route, which are formulation variables, and never a response; this was the second most popular answer when the class was polled.'},
  {t:'Pharmacology', correct:false,
   why:'Pharmacology is the broader study of drug action, and picking it means answering at the level of the whole field rather than the specific discipline named. The definition is narrow and formulation-centred, so a general term cannot be the best match. One student in the class poll chose this.'}],
 teach:[
  {h:'The idea', list:[
    'Each related discipline is defined by the two quantities it links.',
    'Biopharmaceutics links the drug product to the rate and extent of absorption.',
    'Drug-product design factors, from particle size to excipients to method of manufacture, fall within biopharmaceutics.',
    'Pharmacokinetics links concentration to time.',
    'Pharmacodynamics links concentration to response.',
    'Clinical toxicology deals with the adverse effects of drugs. Toxicokinetics applies pharmacokinetic principles to drug safety evaluation studies.']},
  {h:'How the variables relate', list:[
    'Pharmacokinetics relates concentration to time; pharmacodynamics relates concentration to response.',
    'Biopharmaceutics relates the drug, the dosage form and the route to the rate and extent of absorption.',
    'ADME is the sequence pharmacokinetics describes: absorption, distribution, metabolism, excretion.']},
  {h:'The common error', t:'Matching on one familiar word, such as "extent". Find the pair of quantities a definition names; that pair settles which discipline it describes.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p6',
 cite:'Introduction.pdf slide 6, and the poll slide following slide 10',
 quote:'The interrelationship of the physicochemical drug properties, dosage form and route of administration on the rate and extent of systemic drug absorption'},

{id:'m1-int-02', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'disc', concept:'pd-vs-pk', skill:'tell',
 source:'both',
 stem:'Pharmacodynamics relates drug concentration at the site of action to which other quantity?',
 options:[
  {t:'Pharmacological response', correct:true,
   why:'Pharmacodynamics pairs concentration with response; pharmacokinetics pairs concentration with time. Both start from concentration, so the second quantity separates them, and a stem naming an effect (a blood pressure drop, a bacterial kill) is pairing concentration with response.'},
  {t:'Time after administration', correct:false,
   why:'Concentration against time is pharmacokinetics, and swapping the two disciplines is the most common confusion between them. Every curve in this module has time on the horizontal axis, which makes time the tempting partner for concentration.'},
  {t:'Dosage form', correct:false,
   why:'Picking this attaches a formulation variable to pharmacodynamics. Concentration against dosage form belongs to biopharmaceutics, which links the drug product and its route to the rate and extent of absorption. Pharmacodynamics begins after the drug reaches its site of action, so the formulation is already behind it.'},
  {t:'Population group', correct:false,
   why:'Differences between population groups are the subject of population pharmacokinetics, which Dr. Mosley lists as a subdivision of clinical pharmacokinetics. That is still a concentration-and-time discipline; it simply asks how the time course differs from one group to another. Nothing about it concerns response.'}],
 teach:[
  {h:'The idea', list:[
    'Pharmacokinetics and pharmacodynamics both start from drug concentration; they differ in what they pair it with.',
    'Pharmacokinetics asks what the concentration is at a given time. Every equation in this course computes that.',
    'Pharmacodynamics asks what response that concentration produces.']},
  {h:'How the variables relate', list:[
    'Pharmacokinetics relates concentration to time; pharmacodynamics relates concentration to response.',
    'Biopharmaceutics relates the drug, the dosage form and the route to the rate and extent of absorption.',
    'ADME is the sequence pharmacokinetics describes: absorption, distribution, metabolism, excretion.']},
  {h:'Related terms', list:[
    'Clinical pharmacokinetics applies pharmacokinetic methods to drug therapy for specific drugs.',
    'Population pharmacokinetics, a subdivision of clinical pharmacokinetics, asks how the time course differs from one population group to another.',
    'Toxicokinetics applies the same methods to drug safety evaluation studies.']},
  {h:'The common error', t:'Pairing pharmacodynamics with time. Time is on the horizontal axis of every curve in this module, so it feels like the natural partner; for pharmacodynamics the partner is response.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p8',
 cite:'Introduction.pdf slide 8',
 quote:'pharmacodynamics, concentration. And Response. OK, pharmacokinetics, concentration and time.'},

{id:'m1-int-03', type:'match', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'terms', concept:'adme-key-terms', skill:'recall',
 source:'slide',
 stem:'Match each pharmacokinetic term to the process it names.',
 left:['Absorption','Distribution','Metabolism','Excretion','Elimination','Disposition'],
 right:['Passage of drug molecules from the administration site into systemic circulation',
        'Reversible transfer of a drug to and from the site of measurement',
        'Conversion of one chemical species to another',
        'Removal of intact drug or metabolite from the body',
        'Irreversible loss of drug from the body by all routes',
        'All kinetic processes occurring after systemic absorption'],
 pairs:[
  {l:'Absorption', r:'Passage of drug molecules from the administration site into systemic circulation',
   why:'Absorption ends when the drug reaches the systemic circulation, so it is the only one of the six terms about getting in rather than moving around or leaving. Dr. Mosley frames it as passage through biological membranes, and the drug counts as in the body only once it is in solution and able to cross them.'},
  {l:'Distribution', r:'Reversible transfer of a drug to and from the site of measurement',
   why:'The key word is reversible: drug moves out to the tissues and back again, so the schematic draws arrows both ways. The site of measurement may or may not be the site of action, so distribution is defined by where the sample is taken, not where the effect occurs.'},
  {l:'Metabolism', r:'Conversion of one chemical species to another',
   why:'Metabolism, also called biotransformation, is defined by chemical change and says nothing about the drug leaving the body. It matters clinically because the new species may be inactive, or may be the active form of a prodrug, or may simply be easier for the body to excrete.'},
  {l:'Excretion', r:'Removal of intact drug or metabolite from the body',
   why:'Excretion is removal without chemical change, which is why the definition specifies intact drug or metabolite. Pairing it with the conversion definition is the usual slip, because metabolism and excretion sit next to each other in ADME and both end with the drug gone.'},
  {l:'Elimination', r:'Irreversible loss of drug from the body by all routes',
   why:'Elimination is the term that contains both metabolism and excretion, which is why Dr. Mosley calls it the catch-all. The word irreversible separates it from distribution, where drug that leaves the plasma can come back.'},
  {l:'Disposition', r:'All kinetic processes occurring after systemic absorption',
   why:'Disposition is distribution plus elimination, that is, everything that happens to the drug once it has been absorbed. It is the only term of the six that is a sum of other terms rather than a single process, and it excludes absorption by definition.'}],
 teach:[
  {h:'The idea', list:[
    'ADME (absorption, distribution, metabolism, excretion) names four single steps.',
    'Two further terms group those steps.',
    'Elimination groups metabolism and excretion, because both remove drug irreversibly.',
    'Disposition groups distribution and elimination, because both happen after absorption.']},
  {h:'How the variables relate', list:[
    'Elimination = excretion + biotransformation (metabolism). Both remove the parent drug irreversibly.',
    'Disposition = distribution + elimination, that is, everything after absorption.',
    'First-pass metabolism lowers F, the fraction of an oral dose reaching the circulation.',
    'Subscripts name the fluid: Cp is plasma, Cs is serum, a bare C is either.']},
  {h:'The common error', t:'Pairing excretion with chemical conversion, which is metabolism. For a new term, ask whether it names one step or a group of steps, and where absorption falls relative to it.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p4',
 cite:'Introduction.pdf slides 4–5',
 quote:'Elimination refers to the irreversible loss of drugs from the body by all routes'},

{id:'m1-int-04', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'terms', concept:'first-pass-bioavailability', skill:'apply',
 source:'both',
 stem:'An orally administered drug is extensively metabolised by the liver before it reaches the general circulation. What is the consequence for that drug?',
 options:[
  {t:'Its bioavailability is reduced', correct:true,
   why:'Bioavailability measures how much of a dose becomes systemically available, so drug destroyed before it reaches the general circulation lowers it. Dr. Mosley describes the liver taking up roughly half the drug on the first pass, so the dose swallowed and the dose available differ.'},
  {t:'Its volume of distribution is reduced', correct:false,
   why:'Volume of distribution relates the amount of drug in the body to the measured concentration and describes where drug goes after it arrives. First-pass metabolism happens before arrival, so it changes how much gets in, not how widely it spreads. Selecting this attaches a loss of drug to the wrong parameter.'},
  {t:'Its elimination half-life is shortened', correct:false,
   why:'Half-life is set by the elimination rate constant, the fraction of drug removed per unit time once it is in the body. A loss at the point of entry removes a quantity without changing that fraction, so the curve starts lower but falls at the same relative rate. This answer confuses how much arrives with how fast it leaves.'},
  {t:'Its route of administration becomes parenteral', correct:false,
   why:'The route is how the drug was given, which does not change because of what the liver does to it afterwards. The drug in this stem was administered orally and remains an oral administration. First-pass effect is a reason to consider a different route, not a description of one.'}],
 teach:[
  {h:'The idea', list:[
    'First-pass effect: rapid metabolism of an orally administered drug before it reaches the general circulation.',
    'It is the main reason an oral dose and an intravenous (IV) dose of the same size do not give the same systemic exposure.',
    'Bioavailability (F) measures how much of the given dose becomes systemically available.',
    'Later in the course, F is calculated as the AUC (area under the concentration-time curve) after an oral dose divided by the AUC after an IV dose.']},
  {h:'How the variables relate', list:[
    'Elimination = excretion + biotransformation (metabolism). Both remove the parent drug irreversibly.',
    'Disposition = distribution + elimination, that is, everything after absorption.',
    'First-pass metabolism lowers F, the fraction of an oral dose reaching the circulation.',
    'Subscripts name the fluid: Cp is plasma, Cs is serum, a bare C is either.']},
  {h:'The common error', t:'Attaching the first-pass loss to volume of distribution or half-life. The loss happens before the drug arrives, so it lowers F and leaves those parameters unchanged.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p5',
 cite:'Introduction.pdf slide 5',
 quote:'First-Pass Effect – rapid metabolism of an orally administered drug before reaching the general circulation'},

{id:'m1-int-05', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'matrix', concept:'blood-components', skill:'tell',
 source:'slide',
 stem:'Which blood component is obtained after whole blood is allowed to clot and the clot is removed?',
 options:[
  {t:'Serum', correct:true,
   why:'Serum is defined by the clotting step: the blood clots, the clot is removed, and what remains has neither the cells nor fibrinogen nor the other clotting factors. A concentration measured in this fraction is written with a subscript s.'},
  {t:'Plasma', correct:false,
   why:'Plasma is the liquid left after centrifuging whole blood that was kept from clotting by an anticoagulant, so it still holds fibrinogen, the other clotting factors and all the proteins, including albumin. The difference from serum is whether clotting was prevented or allowed to run.'},
  {t:'Whole blood', correct:false,
   why:'Whole blood is the sample as drawn by venous puncture with an anticoagulant such as heparin or EDTA, and it contains all the cellular and protein elements. Nothing has been removed from it. Choosing it means stopping at the sample rather than at the fraction the description asks for.'},
  {t:'Urine', correct:false,
   why:'Urine is not a blood component at all, and it appears as an option in this material only as a measurement site that is used less often than serum or plasma. Nothing about clotting applies to it.'}],
 teach:[
  {h:'The idea', list:[
    'The three blood fractions differ by what has been taken out.',
    'Whole blood keeps everything. It is collected with an anticoagulant, such as heparin or EDTA.',
    'Plasma: the cells are spun out while the anticoagulant still prevents clotting, so the clotting proteins remain.',
    'Serum: the blood is allowed to clot and the clot is removed, so both the cells and the clotting proteins are gone.']},
  {h:'The notation', t:'The symbol records which fraction was assayed: Cp for plasma, Cs for serum, and a plain C when the fraction is not specified.'},
  {h:'The common error', t:'Mixing up plasma and serum. Ask whether clotting was prevented (plasma) or allowed to run (serum).'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p11',
 cite:'Introduction.pdf slide 10',
 quote:'Obtained from whole blood after the blood is allowed to clot and the clot is removed'},

{id:'m1-int-06', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'matrix', concept:'measurement-matrix', skill:'recall',
 source:'both',
 stem:'Which is most commonly used for drug measurement in pharmacokinetic analysis?',
 options:[
  {t:'Serum or plasma', correct:true,
   why:'Serum and plasma are preferred because removing the cellular fraction minimises the interaction of drug with other things in the sample. Dr. Mosley notes that all four options are used somewhere, but that these two are the routine choice. This is why the standard symbols in the course are Cp and Cs rather than a whole-blood concentration.'},
  {t:'Whole blood collected with heparin or EDTA', correct:false,
   why:'Whole blood contains all the cellular and protein elements, and drug can bind to or interact with those components, which complicates the measurement. It is a usable matrix but not the routine one. Choosing it means taking the least processed sample as the default rather than the one that gives the cleanest assay.'},
  {t:'Urine', correct:false,
   why:'Urine is used, and it becomes important later for renal clearance, but it reports drug that has already left the body rather than the concentration circulating now. A concentration-versus-time curve in this course is a plasma or serum curve. Selecting urine confuses an excretion measurement with a systemic one.'},
  {t:'Saliva', correct:false,
   why:'Saliva appears in the same list of possible sampling sites and is the least used of the four. It is a genuine sampling site elsewhere rather than an absurd one, which is what makes it tempting here. Nothing in this course computes a parameter from a saliva concentration.'}],
 teach:[
  {h:'The idea', list:[
    'A concentration has meaning only once the fluid it was measured in is named.',
    'Serum and plasma are the routine fluids, because removing the cells reduces interactions between the drug and other blood components.',
    'The assay then gives a cleaner report of what is circulating.',
    'The choice carries through the notation for the rest of the course: Cp for plasma and Cs for serum.']},
  {h:'The common error', t:'Taking whole blood as the default because it is the least processed sample, or choosing urine, which reports drug that has already left the body.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p17',
 cite:'Introduction.pdf, poll slide following slide 15',
 quote:'We mostly use serum and plasma because remember we try to minimize the interactions of drug with anything else that might be in that um sample'},

{id:'m1-int-07', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'models', concept:'catenary-model', skill:'recall',
 source:'both',
 stem:'Which pharmacokinetic model consists of compartments joined to one another like the compartments of a train?',
 options:[
  {t:'Catenary', correct:true,
   why:'In a catenary model the compartments are linked in a chain, so drug reaches compartment three only by passing through compartment two, like the cars of a train in her description. The rate constants therefore run only between neighbouring compartments.'},
  {t:'Mammillary', correct:false,
   why:'A mammillary model has one central compartment with every other compartment attached directly to it, so there is no order of travel. It is the arrangement used most in this course, which makes it the reflex answer.'},
  {t:'Physiologic', correct:false,
   why:'Picking this confuses physiologic models with compartmental ones. Physiologic (blood flow or perfusion) models are built from known anatomic and physiologic data, not from a chain of compartments. Dr. Mosley notes they need more input than this course wants to supply, which is why compartmental models are used instead.'},
  {t:'Catenary and mammillary are the same arrangement', correct:false,
   why:'They are two distinct arrangements, told apart by which compartments connect to which: a chain in one, a hub in the other. The rate constant subscripts on the diagram show the difference. Treating them as interchangeable removes the only thing the question turns on.'}],
 teach:[
  {h:'The idea', list:[
    'A compartmental model treats the body as a set of compartments, with rate constants for drug movement between them.',
    'Mammillary model: every peripheral compartment connects to one central compartment, where drug enters and is measured.',
    'Catenary model: the compartments are linked end to end in a chain, so drug must pass through each in turn.',
    'Physiologic (perfusion) models are a different approach, built on real blood flows and organ volumes.']},
  {h:'The common error', t:'Choosing mammillary because it is the arrangement used most in this course. A chain of compartments is catenary; a central hub is mammillary.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p15',
 cite:'Introduction.pdf slide 13, and the poll slide following slide 15',
 quote:'compartments joined together like compartments, uh, of a, of a, a train'},

{id:'m1-int-08', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01', multi:true,
 topic:'intro', sub:'models', concept:'model-purposes', skill:'recall',
 source:'slide',
 stem:'Select every purpose a pharmacokinetic model serves. Select all that apply.',
 options:[
  {t:'Predict drug levels', correct:true,
   why:'Predicting the concentration at a time that was never sampled is the first use given for a model, and it is what every equation in this course does. Without a model there is only a set of measured points and no way to state what lies between or beyond them.'},
  {t:'Determine dosing regimens', correct:true,
   why:'Once concentrations can be predicted from a dose, the calculation can be run backwards to find the dose that produces a wanted concentration. This is how infusion rates and loading doses are derived later in the course.'},
  {t:'Estimate accumulation of drug or metabolites', correct:true,
   why:'Accumulation is a prediction about repeated dosing, which requires a model of how much remains when the next dose arrives. Failing to estimate it correctly is what leads to concentrations climbing past the intended range.'},
  {t:'Evaluate differences in rate or extent of availability between formulations', correct:true,
   why:'Comparing two formulations means comparing their concentration-time behaviour, which is a bioequivalence assessment and is listed among the uses of modelling. The comparison is made on model-derived quantities rather than on raw points.'},
  {t:'Establish the chemical structure of a metabolite', correct:false,
   why:'A pharmacokinetic model works with amounts, concentrations and rates, and carries no information about molecular structure. Identifying a metabolite chemically is an analytical chemistry task. Choosing this extends the model beyond the quantities it contains.'},
  {t:'Replace the need to measure plasma concentrations', correct:false,
   why:'A model is fitted to measured concentrations and its parameters come from them, so measurement is what makes the model possible rather than what the model removes. Clinical pharmacokinetics applies these methods to specific drugs in specific patients, which requires samples. This option inverts the relationship between data and model.'}],
 teach:[
  {h:'The idea', list:[
    'A pharmacokinetic model is a set of assumptions that turns a few measured concentrations into a continuous description.',
    'Every use of a model follows from that.']},
  {h:'What a model is used for', list:[
    'Predicting drug levels at times that were not sampled.',
    'Choosing dosing regimens.',
    'Estimating accumulation of drug or metabolites.',
    'Comparing the rate or extent of availability between formulations.',
    'Correlating concentrations with pharmacologic or toxicologic activity.',
    'Describing how physiology or disease alters the kinetics.',
    'Explaining drug interactions.']},
  {h:'The common error', t:'Expecting a model to supply information of a different kind from the data it was built on, such as a chemical structure, or to replace the measurements it is fitted to.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p13',
 cite:'Introduction.pdf slide 11'},

{id:'m1-int-09', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'curve', concept:'mec-defn', skill:'recall',
 source:'transcript',
 stem:'What concentration must be met or exceeded in order for the desired pharmacologic response to result?',
 options:[
  {t:'Minimum effective concentration', correct:true,
   why:'The minimum effective concentration is the lower of the two lines drawn across a concentration-versus-time curve, and the response appears only once the curve has risen above it. The time at which the curve first crosses it is the onset of action. Anything below it is drug present without the wanted effect.'},
  {t:'Minimum toxic concentration', correct:false,
   why:'The minimum toxic concentration is the upper line, where problems start to appear, and what counts as toxic differs from drug to drug. Picking it reads the word minimum and stops, without checking whether the sentence asks about the desired response or about harm. The two lines bracket the range from opposite sides.'},
  {t:'Steady-state concentration', correct:false,
   why:'A steady-state concentration is the level reached when the rate of drug entering equals the rate leaving, which is a property of continuous dosing rather than a threshold for effect. It belongs to the infusion material later in the course. A single dose produces a peak and a decline and reaches no steady state at all.'},
  {t:'Minimum inhibitory concentration', correct:false,
   why:'The minimum inhibitory concentration is the concentration needed to kill or inhibit an organism, which is a specific biochemical endpoint used with antibiotics. It is a particular case rather than the general term the question asks for. Some of the class selected it because the wording of the two definitions is close.'}],
 audit:'Printed slide 9 carries only the title "Concentration versus Time Curve" and the curve itself; the minimum effective and minimum toxic concentration lines were drawn and named in the lecture, and the four options here are the options from her own poll. An exam written from these lectures would key the minimum effective concentration.',
 teach:[
  {h:'The idea', list:[
    'After a single dose, the concentration-versus-time curve rises to a peak and then falls.',
    'Two horizontal lines give that curve its clinical meaning.',
    'Minimum effective concentration: the level that must be met or exceeded for the desired response.',
    'Minimum toxic concentration: the level above which adverse effects appear.',
    'The concentration is meant to stay between the two lines, and the shape of the curve decides for how long it does.']},
  {h:'How the variables relate', list:[
    'The therapeutic window lies between the minimum effective concentration and the minimum toxic concentration.',
    'Onset is when C first rises above the minimum effective concentration; duration is how long it stays above it.',
    'Intensity tracks how far C sits above the minimum effective concentration.']},
  {h:'The common error', t:'Reading "minimum" and stopping. The minimum toxic concentration is the upper line and concerns harm, not the desired response.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p9',
 cite:'Introduction.pdf slide 9',
 quote:'What concentration must be met or exceeded? In order for the desired pharmacologic response to result.'},

{id:'m1-int-10', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'curve', concept:'curve-landmarks', skill:'read',
 source:'transcript',
 stem:'On a plasma concentration-versus-time curve after a single oral dose, what does tmax denote?',
 options:[
  {t:'The time at which the peak concentration occurs', correct:true,
   why:'The peak of the curve is Cmax and the time at which the curve reaches it is tmax, so the two are read off the same point on different axes. Before that point the concentration is still climbing; after it the concentration falls. Reading a curve therefore starts with locating that single turning point.'},
  {t:'The time at which the concentration first exceeds the minimum effective concentration', correct:false,
   why:'That crossing is the onset of the desired response and it happens on the rising part of the curve, earlier than the peak. It is a landmark on the curve but it is not tmax. This answer attaches the time label to the wrong horizontal line.'},
  {t:'The highest concentration the drug reaches', correct:false,
   why:'The highest concentration is Cmax, which is a concentration and carries concentration units. The subscript is shared between the two quantities, and taking the subscript as the whole meaning swaps a time for a concentration. Dr. Mosley is explicit that a quantity is identified by its units before anything else.'},
  {t:'The time at which the concentration exceeds the minimum toxic concentration', correct:false,
   why:'A curve kept inside the intended range never crosses the minimum toxic concentration at all, so this would be undefined for most doses. Even where a curve does cross it, that crossing is not the peak. This confuses a safety threshold with the shape of the curve.'}],
 audit:'Printed slide 9 shows the curve with no labels; Cmax, tmax and the two threshold lines were supplied in the lecture. An exam written from these lectures would key the time of the peak.',
 teach:[
  {h:'The idea', list:[
    'Four landmarks describe a single-dose curve.',
    'Cmax is the highest concentration reached; tmax is the time at which it occurs.',
    'The minimum effective concentration and the minimum toxic concentration are horizontal lines that bracket the range the curve is meant to stay within.',
    'Cmax and tmax are set by how fast the drug is absorbed and eliminated; Cmax also rises with the dose, tmax does not.',
    'The two thresholds are properties of the drug and the patient, and what counts as toxic differs from drug to drug.']},
  {h:'How the variables relate', list:[
    'The therapeutic window lies between the minimum effective concentration and the minimum toxic concentration.',
    'Onset is when C first rises above the minimum effective concentration; duration is how long it stays above it.',
    'Intensity tracks how far C sits above the minimum effective concentration.']},
  {h:'The common error', t:'Swapping Cmax and tmax because they share a subscript. Check the units: tmax is a time, Cmax is a concentration.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p9',
 cite:'Introduction.pdf slide 9',
 quote:'our goal is. That we want to stay in between these two lines.'},

{id:'m1-int-11', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01', lowYield:true,
 topic:'intro', sub:'terms', concept:'adme-letter-variants', skill:'recall',
 source:'transcript',
 stem:'Beyond absorption, distribution, metabolism and excretion, which additional step is sometimes placed at the front of the sequence by other faculty?',
 options:[
  {t:'Liberation', correct:true,
   why:'Liberation is release of the drug from its dosage form, which happens before absorption can begin, so an L placed at the front gives LADME. Dr. Mosley notes that another instructor in the programme uses that ordering. In this course the sequence starts at absorption, with the dosage form handled under biopharmaceutics instead.'},
  {t:'Toxicology', correct:false,
   why:'A T for toxicology is the other addition mentioned, but it is added at the end rather than the front, giving ADMET. The question asks which step is placed before absorption, so the position is what decides the answer here. Both letters are genuine additions used elsewhere in the programme.'},
  {t:'Bioavailability', correct:false,
   why:'Bioavailability is a measure of how much of a dose becomes systemically available rather than a process in a sequence, so it is not a step that could be added to the letters. It is a result of absorption and first-pass metabolism taken together.'},
  {t:'Disposition', correct:false,
   why:'Disposition is a grouping term for distribution and elimination, so it names steps that come after absorption rather than before it. Adding it to the front would reverse the order of the sequence it summarises.'}],
 teach:[
  {h:'The idea', list:[
    'ADME is the sequence used in this course: absorption, distribution, metabolism and excretion.',
    'Some courses add liberation (L) at the front, for release of the drug from its dosage form, giving LADME.',
    'Others add toxicology (T) at the end, giving ADMET.',
    'The additions do not change the four definitions; they only widen the acronym.']},
  {h:'How the variables relate', list:[
    'Elimination = excretion + biotransformation (metabolism). Both remove the parent drug irreversibly.',
    'Disposition = distribution + elimination, that is, everything after absorption.',
    'First-pass metabolism lowers F, the fraction of an oral dose reaching the circulation.',
    'Subscripts name the fluid: Cp is plasma, Cs is serum, a bare C is either.']},
  {h:'The common error', t:'Mixing up the two additions. Position decides it: liberation goes before absorption, toxicology goes at the end.'},
  {h:'Where to read more', t:'Shargel & Yu, chapters 1 (Introduction to Biopharmaceutics and Pharmacokinetics), 2 (Mathematical Fundamentals in Pharmacokinetics) and 11 (Chemical Kinetics of Pharmaceuticals).'}],
 teachImg:'slide_Introduction_p4',
 cite:'Introduction.pdf slide 4',
 quote:'Doctor Smith … she will add um a T to our ADM, right? So A D M E and then she will add a T for toxicology. Doctor Yendaalli will add an L at the beginning for liberation.'},

/* ══════════════════ ORDERS — conceptual ═══════════════════════════════ */

{id:'m1-ord-c01', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'zero', concept:'zero-order-defn', skill:'recall',
 source:'slide',
 stem:'In a zero-order reaction, the amount or concentration of drug decreases:',
 options:[
  {t:'At a constant rate', correct:true,
   why:'The differential form is {{frac:dC|dt}} = −k with no concentration term on the right, so the rate does not depend on how much drug is present. The same quantity leaves in each unit of time whether the concentration is high or low. Integrating that gives C = C0 − kt, which is the equation of a straight line.'},
  {t:'At a rate proportional to the amount remaining', correct:false,
   why:'That statement is the definition of a first-order reaction, where {{frac:dC|dt}} = −kC and the concentration appears on the right-hand side. The two definitions differ by exactly that one term. Selecting this means matching on the word rate without checking what the rate is tied to.'},
  {t:'By a constant fraction of the amount remaining per unit time', correct:false,
   why:'A constant fraction per unit time is the first-order behaviour restated in words rather than symbols. For a zero-order process the fraction lost per hour grows as the concentration falls, because the quantity removed stays fixed while the amount present shrinks. Fraction and quantity are what separate the two orders.'},
  {t:'At a rate proportional to the square of the amount remaining', correct:false,
   why:'A rate proportional to concentration squared would be second order, which is two steps away from the definition asked for. The exponent on the concentration term is what names the order, and zero order means that exponent is zero, so the term disappears entirely.'}],
 teach:[
  {h:'The idea', list:[
    'The order of a reaction is the power to which the concentration is raised in the rate law.',
    'Zero order: the concentration is raised to the power zero, so it drops out of the rate law.',
    'The rate is then a fixed quantity per unit time: {{frac:dC|dt}} = −k, which integrates to C = C0 − kt.',
    'C0 is the concentration at time zero, and k is the zero-order rate constant.',
    'k carries units of concentration or amount per unit time.',
    'On linear axes, concentration against time is a straight line whose slope is −k.']},
  {h:'How the variables relate', list:[
    'Rate: {{frac:dC|dt}} = -k0, a rate that does not depend on how much drug is present.',
    'Integrated: C = C0 - k0t, a straight line on an evenly spaced concentration axis.',
    'k0 carries concentration per time, such as mg/L per hour.',
    'Half-life: t1/2 = C0/2k0, so it changes with the starting concentration.']},
  {h:'The common error', t:'Reading "constant" as a constant fraction. A constant fraction lost per unit time is first order; zero order loses a constant quantity.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 tabulates the units. A rate is mg/hr or mcg/mL/hr, and a zero-order rate constant k0 carries those same units.',
    'Zero order is the one order where the constant and the rate are numerically the same, because the rate does not depend on how much is present.',
    'So a zero-order constant cannot be quoted as a plain reciprocal time.']}],
 teachImg:'slide_Introduction_p20',
 cite:'Introduction.pdf slide 17',
 quote:'Amount or concentration of drug decreases at a constant rate'},

{id:'m1-ord-c02', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'first-order-defn', skill:'recall',
 source:'slide',
 stem:'In a first-order reaction, the amount or concentration of drug decreases at a rate that is:',
 options:[
  {t:'Proportional to the amount of drug remaining', correct:true,
   why:'The rate law {{frac:dC|dt}} = −kC makes the rate the rate constant times the concentration present, so it is fast at high concentrations and slows as they fall, which is why the linear plot curves. Integrating gives ln C = ln C0 − kt, or C = C0 e^(−kt).'},
  {t:'Constant and independent of the amount of drug remaining', correct:false,
   why:'That is the zero-order definition, and it is the answer students give when they remember that something about the process is constant. What is constant in first order is the rate constant and the half-life, not the rate itself. The rate changes continuously throughout the time course.'},
  {t:'Proportional to the elapsed time', correct:false,
   why:'Nothing in either rate law makes the rate depend on how long the process has been running. Time enters only through the amount of drug that has already been lost. This answer reads the horizontal axis of the graph as a cause rather than as a coordinate.'},
  {t:'Equal to the half-life divided by the rate constant', correct:false,
   why:'That expression is not a rate at all; it has units of time squared and cannot describe how fast a concentration falls. The relationship between half-life and rate constant for a first-order process is t½ = 0.693 ÷ k, which is a division the other way round. This option assembles two familiar symbols into a quantity that has no meaning.'}],
 teach:[
  {h:'The idea', list:[
    'First order: the rate depends on the concentration present, so {{frac:dC|dt}} = −kC.',
    'The rate constant k is a proportion removed per unit time, not a quantity, so its units are reciprocal time.',
    'A fixed proportion is removed in each interval, so losing half of whatever is present takes the same time at every concentration.',
    'That is why a first-order half-life is one number for a drug.',
    'The integrated form ln C = ln C0 − kt, where C0 is the concentration at time zero, makes ln C against time a straight line.']},
  {h:'How the variables relate', list:[
    'Rate: {{frac:dC|dt}} = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - {{frac:kt|2.3}}.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = {{frac:0.693|k}}, one number for the drug. This one is not on the equation sheet.']},
  {h:'The common error', t:'Remembering that something is constant and picking a constant rate. In first order the rate constant and the half-life are constant; the rate keeps changing.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 gives the first-order rate constant its own units, 1/hr. No rate ever has these units.',
    'A rate is an amount per time. k is a fraction per time, and it becomes a rate only once it is multiplied by an amount.',
    'The units tell the quantities apart: mg/hr is a rate, and hr⁻¹ is a first-order constant.',
    'A constant given in mg/hr means the process is zero order.']}],
 teachImg:'slide_Introduction_p21',
 cite:'Introduction.pdf slide 18',
 quote:'Amount or concentration of drug decreases at a rate that is proportional to the amount of drug remaining'},

{id:'m1-ord-c03', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'first-order-properties', skill:'recall',
 source:'both',
 stem:'First-order processes are characterised by:',
 options:[
  {t:'A constant half-life', correct:true,
   why:'First-order half-life is 0.693 divided by the rate constant, and both are constants, so the half-life is constant and does not depend on the starting concentration. That is why a drug can be quoted with one half-life rather than a value for every dose.'},
  {t:'A constant rate of elimination', correct:false,
   why:'The rate of elimination is the rate constant multiplied by the concentration, so it changes continuously as the concentration falls; a constant rate of elimination is the zero-order property. Only 8 per cent of the class picked this when polled, holding the word constant and losing what it attaches to.'},
  {t:'dC/dt = −k', correct:false,
   why:'This expression has no concentration term on the right-hand side, which is precisely what makes it the zero-order rate law. The first-order form is {{frac:dC|dt}} = −kC. Recognising the order from the differential equation means checking whether a concentration appears beside the rate constant.'},
  {t:'Units of k of concentration or amount per unit time', correct:false,
   why:'Concentration or amount per unit time are the units of a zero-order constant, which is itself a rate. A first-order constant multiplies a concentration to give a rate, so its units are reciprocal time; this was the most popular wrong answer in the class poll, at 44 per cent.'}],
 teach:[
  {h:'The idea', list:[
    'Every first-order property follows from one fact: the rate is proportional to the concentration.',
    'The proportion removed per unit time is fixed, so the rate constant k has units of reciprocal time.',
    'The half-life is fixed at 0.693 divided by k.',
    'The quantity removed per unit time is not fixed, so the rate of elimination falls as the concentration falls.']},
  {h:'How the variables relate', list:[
    'Rate: {{frac:dC|dt}} = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - {{frac:kt|2.3}}.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = {{frac:0.693|k}}, one number for the drug. This one is not on the equation sheet.']},
  {h:'The common error', t:'Holding on to the word "constant" and losing what it attaches to. A statement that fixes a quantity per unit time, rather than a proportion, describes zero order.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 gives the first-order rate constant its own units, 1/hr. No rate ever has these units.',
    'A rate is an amount per time. k is a fraction per time, and it becomes a rate only once it is multiplied by an amount.',
    'The units tell the quantities apart: mg/hr is a rate, and hr⁻¹ is a first-order constant.',
    'A constant given in mg/hr means the process is zero order.']}],
 teachImg:'slide_Introduction_p24',
 cite:'Introduction.pdf, poll slide following slide 21',
 quote:'first order processes, constant half-life, constant half-life, OK. The rate of elimination … the rate is constantly changing'},

{id:'m1-ord-c04', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'first-order-rate-depends', skill:'tell',
 source:'both',
 stem:'The rate of a first-order process is independent of the concentration of drug present. Is this true or false?',
 options:[
  {t:'False, because the rate is the rate constant multiplied by the concentration', correct:true,
   why:'The rate law {{frac:dC|dt}} = −kC puts the concentration on the right-hand side, so the rate cannot be independent of it: faster at high concentration, slower as it falls. What is independent of concentration is the rate constant, and so the half-life.'},
  {t:'True, because a first-order rate constant carries units of reciprocal time and no concentration term', correct:false,
   why:'This swaps the rate constant for the rate. The constant is a fixed number in reciprocal time, but the rate is that constant times the concentration, so it changes whenever the concentration changes; the class split fifty-fifty on this statement for this reason.'},
  {t:'True, because the half-life does not change', correct:false,
   why:'A constant half-life is a real first-order property, but it describes the time to lose a fixed proportion, not the quantity lost per unit time. Half of a large concentration is more than half of a small one over the same interval, so the rate has changed.'},
  {t:'False, because zero-order processes have no rate constant', correct:false,
   why:'Zero-order processes do have a rate constant, in units of concentration or amount per unit time, so the right conclusion here rests on a false reason. Dr. Mosley states that both orders have a rate constant and neither is negative.'}],
 teach:[
  {h:'The idea', list:[
    'In a first-order process, the rate and the rate constant behave differently as the concentration falls.',
    'The rate constant k is fixed: it is the proportion of what is present that is removed per unit time.',
    'The rate is k multiplied by the current concentration, so it is largest at the start and falls continuously.',
    'In a zero-order process this reverses: the rate is fixed, and the proportion removed per unit time grows.']},
  {h:'How the variables relate', list:[
    'Rate: {{frac:dC|dt}} = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - {{frac:kt|2.3}}.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = {{frac:0.693|k}}, one number for the drug. This one is not on the equation sheet.']},
  {h:'The common error', t:'Treating the rate and the rate constant as the same quantity.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 gives the first-order rate constant its own units, 1/hr. No rate ever has these units.',
    'A rate is an amount per time. k is a fraction per time, and it becomes a rate only once it is multiplied by an amount.',
    'The units tell the quantities apart: mg/hr is a rate, and hr⁻¹ is a first-order constant.',
    'A constant given in mg/hr means the process is zero order.']}],
 teachImg:'slide_Introduction_p24',
 cite:'Introduction.pdf, poll slide following slide 21',
 quote:'the rate depends on the concentration that’s there'},

{id:'m1-ord-c05', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'plots', concept:'semilog-reading', skill:'read',
 source:'both',
 stem:'A plot of plasma concentration against time gives a straight line. The concentration axis is marked 1, 10, 100, 1000. What does the straight line indicate?',
 options:[
  {t:'A first-order process', correct:true,
   why:'An axis whose gridlines increase by a factor of ten is a logarithmic axis, and a plot logarithmic on one axis only is a semi-logarithmic plot. Only a first-order decline straightens on such a plot, because ln C = ln C0 − kt is linear in time. The axis does not have to be labelled log for this to be so.'},
  {t:'A zero-order process', correct:false,
   why:'A zero-order process is straight on linear axes, where gridlines rise by equal additions rather than factors of ten; on these axes it would curve. Calling this zero order means naming the order from a straight line without checking the scale, the error Dr. Mosley warns against.'},
  {t:'A process whose rate constant changes with time', correct:false,
   why:'A straight line on either scale indicates a constant rate constant, because a changing constant would bend the line. Nothing in this course has a rate constant that varies with time. This answer treats the straightness as evidence of change rather than of constancy.'},
  {t:'Nothing, because the axis is not labelled as a logarithm', correct:false,
   why:'The absence of the word log on the axis is why the spacing has to be read instead. Dr. Mosley notes that the word will usually not be there, and that a scale increasing by a function of ten is logarithmic whatever it says. Treating an unlabelled axis as uninterpretable discards the information the spacing already gives.'}],
 teach:[
  {h:'The idea', list:[
    'The same concentrations can be plotted two ways, and each plot answers a different question.',
    'Linear axes show the actual concentration. A zero-order decline is straight on them, because C = C0 − kt.',
    'Semi-logarithmic axes compress the concentration scale so that equal factors take equal distances. A first-order decline is straight on them, because ln C = ln C0 − kt.',
    'C0 is the concentration at time zero, and k is the rate constant.']},
  {h:'How the variables relate', list:[
    'An evenly spaced concentration axis: a straight line means zero order.',
    'An axis stepping 1, 10, 100, 1000: a straight line means first order.',
    'On a base-ten decade axis the slope is -{{frac:k|2.3}}; on a natural-log axis it is -k.',
    'Read the tick values before the line. The word "log" is usually not printed.']},
  {h:'The common error', list:[
    'Naming the order from a straight line before identifying the plot.',
    'Identify the plot first: gridlines that rise by equal additions are linear, and gridlines that rise by equal multiples are logarithmic.']},
  {h:'What the chapter adds', list:[
    'Chapter 2: semi-logarithmic paper places the data at logarithmic intervals, so the numbers need not be converted to logarithms before plotting.',
    'The paper performs the transformation. The printed tick values step by tens while the plotted numbers stay as measured.',
    'So the axis has to be read, not assumed.']}],
 teachImg:'slide_Introduction_p24',
 cite:'Introduction.pdf slide 21',
 quote:'even if the scale does not say log C, if you look at that scale and you see that it is not changing by regular one infinite, or it’s increasing by a func- uh, a function of 10, then that tells you that it is a logarithmic scale'},

{id:'m1-ord-c06', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'halflife-is-a-time', skill:'recall',
 source:'both',
 stem:'A drug is eliminated by a first-order process with a rate constant of 0.231 per day. Which statement about its half-life is correct?',
 options:[
  {t:'It is 3.0 days', correct:true,
   why:'Half-life is 0.693 divided by the rate constant: 0.693 ÷ 0.231 per day gives 3.0. Dividing by reciprocal days leaves days, so the answer is a time; Dr. Mosley states that the reciprocal units belong to the rate constant, not to the half-life.'},
  {t:'It is 3.0 days to the minus one', correct:false,
   why:'Reciprocal days are the units of the rate constant, which is what was given, not of the half-life, which is what was asked for. Dr. Mosley names this specific error: a half-life is a time, so it is days, not days to the minus one. Carrying the reciprocal across the division is what produces it.'},
  {t:'It is 0.231 days, because the rate constant is the half-life', correct:false,
   why:'The rate constant and the half-life are two different descriptions of the same decline, linked by the factor 0.693, and they are not equal to one another. Copying the given number across skips the relation entirely. The two also have different units, which is enough on its own to rule this out.'},
  {t:'It cannot be found without the starting concentration', correct:false,
   why:'For a first-order process t½ = 0.693 ÷ k, with no starting concentration in it, which is why it is constant. The starting concentration is needed only for zero order, where t½ = C0 ÷ 2k, so picking this applies the zero-order relation to a first-order problem.'}],
 note:'The first-order half-life relation, t1/2 = {{frac:0.693|k}}, is not on the equation sheet.',
 audit:'The transcript of 19 August renders her definition of half-life as "decrease by 15"; the printed slide reads "decrease by one-half", and her worked examples immediately after are all at 50 per cent. An exam written from these lectures would key one-half. The first-order half-life relation is also not printed on BasicPharmacokineticsEquations.pdf, which is why she says it has to be held without the sheet.',
 teach:[
  {h:'The idea', list:[
    'Half-life (t½) is the time required for the amount or concentration of a drug to decrease by one-half.',
    'It is a time, so it is reported in units of time.',
    'First order: t½ = 0.693 ÷ k. Both are constants, so the half-life is constant and does not depend on where the concentration started.',
    'Zero order: t½ is the starting concentration divided by twice the rate constant, so it changes whenever the starting concentration changes.']},
  {h:'How the variables relate', list:[
    'First order: t1/2 = {{frac:0.693|k}}, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = {{frac:ln(1000)|k}}.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'The common error', t:'Carrying the reciprocal unit of the rate constant across the division. A half-life is in days, not days to the minus one.'},
  {h:'What the chapter adds', list:[
    'Chapter 12 tabulates the per cent eliminated after one to six half-lives: 50, 75, 87.5, 93.75, 96.88 and 98.44.',
    'After ten half-lives, 99.90 per cent has been eliminated.',
    'It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain.',
    'The same count of half-lives governs the time to reach steady state.']}],
 teachImg:'slide_Introduction_p22',
 cite:'Introduction.pdf slide 19',
 quote:'It is a time, so it is not days to the minus one. It is just days.'},

/* ══════════════════ ORDERS — deciding the order from a data set ════════ */

{id:'m1-ord-c07', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'decide', concept:'order-from-data', skill:'order',
 source:'slide',
 stem:'The table below shows the decomposition of a drug as a function of time.\n\nTime (minute) | Drug A (mg)\n10 | 97.0\n20 | 89.0\n40 | 73.0\n60 | 57.0\n90 | 34.0\n120 | 10.0\n130 | 2.5\n\nHow would you classify the decrease in the amount of drug A?',
 options:[
  {t:'Zero order, a constant amount per unit time', correct:true,
   why:'From 20 to 40 minutes the amount falls from 89.0 to 73.0 mg, and from 40 to 60 minutes from 73.0 to 57.0 mg: 16.0 mg lost in each 20 minutes. Equal quantities lost in equal intervals (constant differences, not ratios) is the zero-order signature.'},
  {t:'First order, because the amount falls continuously', correct:false,
   why:'Every decomposition falls continuously, so that separates nothing; first order needs a constant ratio over equal intervals. Here 89.0 ÷ 73.0 is 1.22, 73.0 ÷ 57.0 is 1.28 and 57.0 ÷ 34.0 is 1.68, so the ratios climb and the process is not first order.'},
  {t:'First order, because the amount is measured in milligrams', correct:false,
   why:'Whether the dependent variable is an amount or a concentration has no bearing on the order; both orders are defined for either. Dr. Mosley writes the definitions as amount or concentration precisely so that this choice of variable does not decide anything. Here the variable is an amount and the process is zero order.'},
  {t:'Neither, because the intervals between time points are unequal', correct:false,
   why:'Unequal spacing adds arithmetic but does not prevent classification: take the difference or ratio over whatever interval separates the chosen points. Two pairs of points 20 minutes apart, 20 to 40 and 40 to 60 minutes, settle it immediately.'}],
 teach:[
  {h:'The idea', list:[
    'To decide the order from a data set, find what stays constant between successive points.',
    'Take two points a known interval apart, and find the difference in amount and the ratio of amounts.',
    'Repeat over a second interval of the same length.',
    'If the differences match, the process is zero order, and amount against time on linear axes is a straight line.',
    'If the ratios match, the process is first order, and the natural logarithm of amount against time is a straight line.',
    'Dr. Mosley has stated that a data set will be supplied on the exam and the order will have to be decided from it.']},
  {h:'How the variables relate', list:[
    'Equal amount lost per equal time interval means zero order: C = C0 - k0t.',
    'Equal fraction lost per equal time interval means first order: C = C0e^(-kt).',
    'Test a data set by taking successive ratios and successive differences: whichever is constant names the order.',
    'From two points, first order gives k = {{frac:ln(C1/C2)|t2 - t1}}; zero order gives k0 = {{frac:C1 - C2|t2 - t1}}.']},
  {h:'The common error', t:'Judging the order from the fact that the amount falls continuously. Both orders do; only a constant difference or a constant ratio decides it.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 makes the units the first test.',
    'A constant reported in mg/hr or mcg/mL/hr belongs to a zero-order process.',
    'A constant reported in hr⁻¹ belongs to a first-order process.',
    'When a data set is given instead of a constant, the same split shows up: a constant difference between concentrations means zero order, and a constant ratio means first order.']}],
 teachImg:'slide_Introduction_p20',
 cite:'IntroductionandMathReview3Solutions.pdf, problem 1a; Introduction.pdf slide 17',
 quote:'Zero-order — the drug is decreasing at a constant amount per unit time'},

{id:'m1-ord-c08', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'decide', concept:'order-from-data', dupOf:'m1-ord-c07', skill:'order',
 source:'slide',
 stem:'A pharmacist dissolved an antibiotic in purified water and measured the drug concentration in aliquots removed over 16 hours.\n\nTime (hr) | C (mcg/mL) | ln C\n0.5 | 233.3 | 5.4523\n1.0 | 217.6 | 5.3827\n2.0 | 189.5 | 5.2444\n4.0 | 143.6 | 4.9670\n8.0 | 82.5 | 4.4128\n12.0 | 47.4 | 3.8586\n16.0 | 27.2 | 3.3032\n\nIs the decomposition of this antibiotic a zero-order or a first-order process?',
 options:[
  {t:'First order, because ln C against time is a straight line', correct:true,
   why:'Between 4 and 8 hours ln C falls from 4.9670 to 4.4128, and between 8 and 12 hours from 4.4128 to 3.8586: a drop of 0.5542 each 4 hours, a straight line on logarithmic axes. The concentrations themselves fall by 61.1 and then 35.1 mcg/mL, so they are not linear.'},
  {t:'Zero order, because the concentration falls throughout', correct:false,
   why:'Picking this reads any fall as zero order, but a falling concentration fits either order. Zero order needs equal losses over equal intervals, yet 61.1 mcg/mL is lost from 4 to 8 hours and only 35.1 mcg/mL from 8 to 12 hours; losses that shrink with the concentration are first-order behaviour.'},
  {t:'Zero order, because the time points are unevenly spaced', correct:false,
   why:'Spacing of the sampling times is a feature of the experiment rather than of the kinetics, and either order can be sampled at any times. Choosing pairs that are equally separated, such as 4 to 8 hours and 8 to 12 hours, removes the difficulty entirely. Nothing about uneven spacing points towards one order or the other.'},
  {t:'First order, because the drug was dissolved in water rather than given to a patient', correct:false,
   why:'The right conclusion for the wrong reason: the medium says nothing about the order, and this reasoning would fail on a zero-order data set in water. Dr. Mosley assumes first order only for a stated intravenous bolus dose; when a data set is supplied, the order must come from the data.'}],
 teach:[
  {h:'The idea', list:[
    'When a table gives a column of natural logarithms (ln C), that column is the test.',
    'If ln C falls by the same amount over equal intervals, the process is first order, because ln C = ln C0 − kt is linear in time.',
    'If C itself falls by the same amount over equal intervals, the process is zero order, because C = C0 − kt is linear in time.',
    'C0 is the concentration at time zero. Whichever column is linear gives the rate constant k directly from its slope.']},
  {h:'How the variables relate', list:[
    'Equal amount lost per equal time interval means zero order: C = C0 - k0t.',
    'Equal fraction lost per equal time interval means first order: C = C0e^(-kt).',
    'Test a data set by taking successive ratios and successive differences: whichever is constant names the order.',
    'From two points, first order gives k = {{frac:ln(C1/C2)|t2 - t1}}; zero order gives k0 = {{frac:C1 - C2|t2 - t1}}.']},
  {h:'The common error', t:'Judging the order from the medium or from the sampling times. Only the numbers decide it.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 makes the units the first test.',
    'A constant reported in mg/hr or mcg/mL/hr belongs to a zero-order process.',
    'A constant reported in hr⁻¹ belongs to a first-order process.',
    'When a data set is given instead of a constant, the same split shows up: a constant difference between concentrations means zero order, and a constant ratio means first order.']}],
 teachImg:'slide_Introduction_p21',
 cite:'PHAR_4221_Homework_1.md, problem 1a; Introduction.pdf slide 18',
 quote:'Plotting the natural logarithm of concentration (ln C) vs. time (t) yields a straight line with a correlation coefficient of r = −1.0000'},

/* ══════════════════ ORDERS — numeric ═══════════════════════════════════ */

{id:'m1-ord-n01', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'decide', concept:'first-order-k-from-table', skill:'krate',
 source:'slide',
 stem:'In an experiment to study the chemical decomposition, a drug solution was prepared and a sample was obtained at different time points. The drug concentrations in the samples were as follows.\n\nTime (hr) | Concentration (mg/L)\n2 | 294.3\n6 | 208.1\n12 | 123.8\n24 | 43.8\n36 | 15.5\n48 | 5.5\n\nWhat is the rate constant for the decrease in concentration?',
 units:'hr⁻¹',
 answer:0.0866,
 tol:0.0015,
 steps:[
  {k:'setup', t:'Ratios over equal intervals are constant: 123.8 ÷ 43.8 = 2.83 across the 12 hours from 12 to 24 hr, and 43.8 ÷ 15.5 = 2.83 across the 12 hours from 24 to 36 hr, so a fixed fraction is lost per unit time and the process is first order.',
   why:'The order must be settled first, because the two orders give rate constants with different units and equations. Ratios must be compared over equal spans (a 6-hour and a 12-hour ratio are not expected to match), and two consecutive 12-hour spans both giving 2.83 is the first-order condition.'},
  {k:'setup', t:'For a first-order process, ln C = ln C0 − kt, so k = ln(C₁ ÷ C₂) ÷ (t₂ − t₁).',
   why:'Writing the integrated first-order equation for two measured points and subtracting cancels ln C0, so the unknown starting concentration drops out and k depends only on values in the table. Dr. Mosley writes this difference of logarithms as the logarithm of the ratio.'},
  {k:'algebra', t:'Using t₁ = 6 hr with C₁ = 208.1 mg/L and t₂ = 24 hr with C₂ = 43.8 mg/L: Δt = 18 hr, and k = ln(208.1 ÷ 43.8) ÷ 18 hr = 1.55838 ÷ 18 hr.',
   why:'These are the two points Dr. Mosley selects in her own key, and the pair is a good choice because the 18-hour separation spans most of the decline and reduces the effect of measurement scatter. The concentration units cancel inside the logarithm, leaving a pure number divided by hours. That division is what produces reciprocal hours.'},
  {k:'round', t:'k = 0.08658 hr⁻¹, reported as 0.0866 hr⁻¹.',
   why:'Dividing a dimensionless logarithm by a time gives reciprocal time, the unit of a first-order rate constant. Dr. Mosley reports rate constants to four decimal places (her key prints 0.0866 per hour), and a leading decimal with no digit before it loses half the marks on her paper.'}],
 teach:[
  {h:'The idea', list:[
    'A first-order rate constant k from a table is the slope of ln C (the natural logarithm of concentration) against time, with the sign reversed.',
    'Two points give the same k as a full regression, because the relation is exactly linear.',
    'Subtracting the two integrated equations removes the starting concentration.',
    'Any pair of points from a clean data set gives the same k to the precision of the data, so choose a pair that spans a useful interval.']},
  {h:'How the variables relate', list:[
    'Equal amount lost per equal time interval means zero order: C = C0 - k0t.',
    'Equal fraction lost per equal time interval means first order: C = C0e^(-kt).',
    'Test a data set by taking successive ratios and successive differences: whichever is constant names the order.',
    'From two points, first order gives k = {{frac:ln(C1/C2)|t2 - t1}}; zero order gives k0 = {{frac:C1 - C2|t2 - t1}}.']},
  {h:'The common error', t:'Computing k before deciding the order, or comparing ratios taken across spans of different lengths.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 makes the units the first test.',
    'A constant reported in mg/hr or mcg/mL/hr belongs to a zero-order process.',
    'A constant reported in hr⁻¹ belongs to a first-order process.',
    'When a data set is given instead of a constant, the same split shows up: a constant difference between concentrations means zero order, and a constant ratio means first order.']}],
 teachImg:'slide_Introduction_p21',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 1a; Introduction.pdf slide 18'},

{id:'m1-ord-n02', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'c0-back-extrapolation', skill:'conctime',
 source:'slide',
 stem:'A drug solution decomposes by a first-order process with a rate constant of 0.0866 hr⁻¹. The concentration measured 12 hours after the solution was prepared was 123.8 mg/L. What was the initial concentration of the solution?',
 units:'mg/L',
 answer:350,
 tol:3,
 steps:[
  {k:'setup', t:'C = C0 e^(−kt), so C0 = C e^(+kt).',
   why:'The integrated equation runs forward from the start, but the unknown is at the start, so it is rearranged to move backwards: multiplying both sides by e^(+kt) isolates C0. Keeping the minus sign returns a number smaller than the measured concentration, which cannot be a starting value.'},
  {k:'algebra', t:'kt = 0.0866 hr⁻¹ × 12 hr = 1.0392, which is dimensionless.',
   why:'Reciprocal hours multiplied by hours cancel, which they must, because an exponent has to be a pure number. Checking that cancellation is the quickest guard against having mixed a rate constant in reciprocal hours with a time in days or minutes. The product itself has no units.'},
  {k:'algebra', t:'C0 = 123.8 mg/L × e^1.0392 = 349.98 mg/L.',
   why:'The exponential factor e^1.0392 is 2.8270, which is greater than one because the exponent is positive, so the answer is larger than the measured concentration, as it must be for a concentration that has been falling for 12 hours. Milligrams per litre multiplied by a pure number stay milligrams per litre.'},
  {k:'round', t:'C0 = 350 mg/L.',
   why:'Dr. Mosley reports this value as 350 mg/L, to three significant figures, which matches the precision of the tabulated concentrations. The computed 349.98 rounds to that value without any further adjustment.'}],
 teach:[
  {h:'The idea', list:[
    'Back-extrapolation recovers the concentration at time zero (C0) from a later measurement.',
    'It uses the same integrated equation with the sign of the exponent reversed: C0 = C e^(+kt).',
    'A positive exponent moves back towards the start, so it must give a larger number.',
    'A negative exponent moves forward, so it must give a smaller number.']},
  {h:'How the variables relate', list:[
    'Rate: {{frac:dC|dt}} = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - {{frac:kt|2.3}}.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = {{frac:0.693|k}}, one number for the drug. This one is not on the equation sheet.']},
  {h:'The common error', t:'Keeping the minus sign in the exponent. Check the direction first: in a falling process the starting concentration must be larger than any later one.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 gives the first-order rate constant its own units, 1/hr. No rate ever has these units.',
    'A rate is an amount per time. k is a fraction per time, and it becomes a rate only once it is multiplied by an amount.',
    'The units tell the quantities apart: mg/hr is a rate, and hr⁻¹ is a first-order constant.',
    'A constant given in mg/hr means the process is zero order.']}],
 teachImg:'slide_Introduction_p21',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 1b; Introduction.pdf slide 18',
 quote:'If you get a number that is lower than 475.6 SC0, you’ve done something wrong. Punch it again.'},

{id:'m1-ord-n03', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'first-order-halflife', skill:'krate',
 source:'slide',
 stem:'A drug solution decomposes by a first-order process with a rate constant of 0.0866 hr⁻¹. How much time is required for exactly half the solution to decompose?',
 units:'hr',
 answer:8.0,
 tol:0.2,
 steps:[
  {k:'setup', t:'t½ = 0.693 ÷ k for a first-order process.',
   why:'Setting the concentration to half its starting value in ln C = ln C0 − kt leaves the natural logarithm of two, which is 0.693, divided by the rate constant. The starting concentration cancels, which is why a first-order half-life does not depend on it. This relation is not printed on the equation sheet supplied in the exam.'},
  {k:'algebra', t:'t½ = 0.693 ÷ 0.0866 hr⁻¹ = 8.002 hr.',
   why:'Dividing a pure number by a quantity in reciprocal hours gives hours, which is the unit a half-life must have. The rate constant sits in the denominator because a faster process has a shorter half-life, so the two quantities move in opposite directions.'},
  {k:'round', t:'t½ = 8 hr.',
   why:'Dr. Mosley reports this as 8 hours, to the whole hour. The answer is a time and carries no reciprocal unit; hours to the minus one belongs to the rate constant that was given, not to the half-life that was asked for.'}],
 teach:[
  {h:'The idea', list:[
    'Half-life (t½) and the rate constant k are two ways of stating the same first-order decline, joined by the natural logarithm of two.',
    'Converting between them is one division: t½ = 0.693 ÷ k.',
    'The relation has no concentration term, so the half-life does not change as the solution decomposes.',
    'That is what lets a drug be described by one half-life across all its doses.']},
  {h:'How the variables relate', list:[
    'First order: t1/2 = {{frac:0.693|k}}, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = {{frac:ln(1000)|k}}.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'The common error', t:'Giving the half-life in reciprocal hours. That unit belongs to the rate constant; a half-life is a time.'},
  {h:'What the chapter adds', list:[
    'Chapter 12 tabulates the per cent eliminated after one to six half-lives: 50, 75, 87.5, 93.75, 96.88 and 98.44.',
    'After ten half-lives, 99.90 per cent has been eliminated.',
    'It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain.',
    'The same count of half-lives governs the time to reach steady state.']}],
 teachImg:'slide_Introduction_p22',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 1c; Introduction.pdf slide 19',
 quote:'this is one that I want you to know. So that will not be on your equation sheet. This is the one that you take to your grave with you, OK? 0.693 over K.'},

{id:'m1-ord-n04', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'time-to-percent-first-order', skill:'conctime',
 source:'slide',
 stem:'A drug solution decomposes by a first-order process with a rate constant of 0.0866 hr⁻¹. How much time is required for the original solution to decompose by 90 per cent?',
 units:'hr',
 answer:26.6,
 tol:0.5,
 steps:[
  {k:'setup', t:'Decomposing by 90 per cent leaves 10 per cent, so C = 0.1 C0.',
   why:'The stem states how much has gone and the equation is written in terms of how much remains, so the percentage has to be turned round before it is used. Reading 90 per cent straight into the equation as the remaining fraction gives ln(1 ÷ 0.9) ÷ 0.0866 hr⁻¹ = 1.2 hours instead of 26.6.'},
  {k:'setup', t:'0.1 C0 = C0 e^(−kt), so t = ln(1 ÷ 0.1) ÷ k.',
   why:'The starting concentration cancels from both sides, which is why no concentration value is needed to answer a percentage question for a first-order process. Rearranging for time puts the logarithm of the reciprocal fraction over the rate constant.'},
  {k:'algebra', t:'t = ln(10) ÷ 0.0866 hr⁻¹ = 2.302585 ÷ 0.0866 hr⁻¹.',
   why:'The logarithm of ten is a pure number, and dividing it by a quantity in reciprocal hours leaves hours. The fraction remaining is not a clean power of one half here, so half-life counting will not reach the answer exactly and the logarithmic route is needed.'},
  {k:'round', t:'t = 26.589 hr, reported as 26.6 hr.',
   why:'Dr. Mosley reports this to one decimal place, as 26.6 hours. As a check, 90 per cent decomposition is a little more than three half-lives, which for an 8-hour half-life would be 24 hours, and the answer sits just above that.'}],
 teach:[
  {h:'The idea', list:[
    'For a first-order process, a percentage question never needs a concentration, because the starting value cancels.',
    'Convert the stated percentage into the fraction remaining.',
    'Take the natural logarithm of its reciprocal and divide by the rate constant k.',
    'If the fraction remaining is a power of one half, counting half-lives gives the same answer faster; Dr. Mosley prints both routes when both are available.']},
  {h:'How the variables relate', list:[
    'Rate: {{frac:dC|dt}} = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - {{frac:kt|2.3}}.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = {{frac:0.693|k}}, one number for the drug. This one is not on the equation sheet.']},
  {h:'The common error', t:'Using the percentage decomposed as the fraction remaining. Decomposing by 90 per cent leaves one tenth.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 gives the first-order rate constant its own units, 1/hr. No rate ever has these units.',
    'A rate is an amount per time. k is a fraction per time, and it becomes a rate only once it is multiplied by an amount.',
    'The units tell the quantities apart: mg/hr is a rate, and hr⁻¹ is a first-order constant.',
    'A constant given in mg/hr means the process is zero order.']}],
 teachImg:'slide_Introduction_p21',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 1d; Introduction.pdf slide 18'},

{id:'m1-ord-n05', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'decide', concept:'zero-order-k-from-table', skill:'krate',
 source:'slide',
 stem:'In an experiment to study the chemical decomposition, a drug solution was prepared and a sample was obtained at different time points. The drug concentrations in the samples were as follows.\n\nTime (hr) | Concentration (mg/mL)\n2 | 338\n6 | 314\n12 | 278\n24 | 206\n36 | 134\n48 | 62\n\nWhat is the rate constant for the decrease in concentration?',
 units:'(mg/mL)/hr',
 answer:6.0,
 tol:0.2,
 steps:[
  {k:'setup', t:'Successive losses are constant: 338 − 314 = 24 mg/mL over 4 hr, and 314 − 278 = 36 mg/mL over 6 hr, both 6 mg/mL per hour, so the process is zero order.',
   why:'The differences between concentrations, taken over the intervals that separate them, are what identify a zero-order process. Here the same quantity is lost in every hour regardless of how much remains. Testing ratios instead would give 1.08 and then 1.13, which are not equal, confirming that the process is not first order.'},
  {k:'setup', t:'For a zero-order process, C = C0 − kt, so k = −(C₂ − C₁) ÷ (t₂ − t₁).',
   why:'The integrated zero-order equation is the equation of a straight line, so its rate constant is the slope with the sign reversed. The minus sign is there because the concentration falls while the rate constant is reported as a positive quantity. Dr. Mosley states that a rate constant is never a negative number, in either order.'},
  {k:'algebra', t:'Using t₁ = 2 hr with C₁ = 338 mg/mL and t₂ = 24 hr with C₂ = 206 mg/mL: k = −(206 − 338) mg/mL ÷ (24 − 2) hr = 132 mg/mL ÷ 22 hr.',
   why:'These are the two points Dr. Mosley takes in her key. Milligrams per millilitre divided by hours gives milligrams per millilitre per hour, which is concentration per unit time, the unit a zero-order rate constant must carry.'},
  {k:'round', t:'k = 6 (mg/mL)/hr.',
   why:'The division is exact at 6, and her key prints 6 mg/mL per hour with no further rounding. Because the process is zero order, this number is the quantity lost every hour, unchanged from the first hour to the last.'}],
 teach:[
  {h:'The idea', list:[
    'A zero-order rate constant (k0) is itself a rate, so it carries units of concentration or amount per unit time.',
    'It is the slope of concentration against time on linear axes, with the sign reversed.',
    'No logarithm is involved, so the arithmetic is simpler than for first order.',
    'The same stem can be set twice with different numbers, once zero order and once first order; only the arithmetic on the points tells them apart.']},
  {h:'How the variables relate', list:[
    'Equal amount lost per equal time interval means zero order: C = C0 - k0t.',
    'Equal fraction lost per equal time interval means first order: C = C0e^(-kt).',
    'Test a data set by taking successive ratios and successive differences: whichever is constant names the order.',
    'From two points, first order gives k = {{frac:ln(C1/C2)|t2 - t1}}; zero order gives k0 = {{frac:C1 - C2|t2 - t1}}.']},
  {h:'The common error', t:'Assuming the order instead of testing it. Check the differences and the ratios first.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 makes the units the first test.',
    'A constant reported in mg/hr or mcg/mL/hr belongs to a zero-order process.',
    'A constant reported in hr⁻¹ belongs to a first-order process.',
    'When a data set is given instead of a constant, the same split shows up: a constant difference between concentrations means zero order, and a constant ratio means first order.']}],
 teachImg:'slide_Introduction_p20',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 2a; Introduction.pdf slide 17'},

{id:'m1-ord-n06', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'zero-order-halflife', skill:'krate',
 source:'slide',
 stem:'A drug solution decomposes by a zero-order process at 6 (mg/mL)/hr from an initial concentration of 350 mg/mL. How much time is required for exactly half the solution to decompose?',
 units:'hr',
 answer:29.2,
 tol:0.4,
 steps:[
  {k:'setup', t:'t½ = C0 ÷ 2k for a zero-order process.',
   why:'Setting the concentration to half its starting value in C = C0 − kt gives C0 ÷ 2 = kt, and dividing by the rate constant isolates the time. The starting concentration does not cancel here, which is why a zero-order half-life depends on where the process started and is not a fixed property of the drug.'},
  {k:'algebra', t:'t½ = 350 mg/mL ÷ [2 × 6 (mg/mL)/hr] = 350 ÷ 12 hr.',
   why:'Milligrams per millilitre divided by milligrams per millilitre per hour leaves hours, since the concentration units cancel and the reciprocal hour inverts. The factor of two appears because only half of the starting concentration has to be removed.'},
  {k:'round', t:'t½ = 29.167 hr, reported as 29.2 hr.',
   why:'Dr. Mosley reports this to one decimal place, as 29.2 hours. As a check, the table for this solution reads 206 mg/mL at 24 hours and 134 mg/mL at 36 hours, so the concentration passes 175 mg/mL between those two times, which brackets the answer.'}],
 teach:[
  {h:'The idea', list:[
    'The two half-life relations look alike but behave differently.',
    'First order: t½ = 0.693 ÷ k. No concentration appears, so the half-life is constant.',
    'Zero order: t½ = C0 ÷ 2k, the starting concentration divided by twice the rate constant. Doubling C0 doubles the half-life.']},
  {h:'How the variables relate', list:[
    'First order: t1/2 = {{frac:0.693|k}}, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = {{frac:ln(1000)|k}}.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'The common error', t:'Using the wrong relation. That is not a small error but a different functional dependence, so the order has to be decided before either relation is used.'},
  {h:'What the chapter adds', list:[
    'Chapter 12 tabulates the per cent eliminated after one to six half-lives: 50, 75, 87.5, 93.75, 96.88 and 98.44.',
    'After ten half-lives, 99.90 per cent has been eliminated.',
    'It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain.',
    'The same count of half-lives governs the time to reach steady state.']}],
 teachImg:'slide_Introduction_p22',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 2, part c; Introduction.pdf slide 19'},

{id:'m1-ord-n08', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'zero-order-halflife', dupOf:'m1-ord-n06', skill:'krate',
 source:'slide',
 stem:'A drug decomposes by a zero-order process at 0.8 mg/min. The amount remaining 40 minutes after the start was 73.0 mg. What is the half-life of the decomposition?',
 units:'min',
 answer:65.6,
 tol:1.0,
 steps:[
  {k:'setup', t:'A0 = A + kt, because a zero-order process loses a fixed quantity in every unit of time.',
   why:'The integrated zero-order equation A = A0 − kt is rearranged to recover the starting amount from a later measurement. The quantity lost is simply the rate constant multiplied by the elapsed time, with no exponential involved. This step is needed first because the zero-order half-life depends on the starting amount.'},
  {k:'algebra', t:'A0 = 73.0 mg + (0.8 mg/min × 40 min) = 73.0 mg + 32.0 mg = 105 mg.',
   why:'Milligrams per minute multiplied by minutes gives milligrams, so the two terms are in the same unit and can be added. The starting amount is larger than the measured amount, as it must be for a quantity that has been decreasing.'},
  {k:'setup', t:'t½ = A0 ÷ 2k.',
   why:'Half of the starting amount has to be removed, and the rate constant states how much is removed per minute, so the time is the quantity to remove divided by the rate. Written as a formula, that is A0 over twice the rate constant.'},
  {k:'algebra', t:'t½ = 105 mg ÷ [2 × 0.8 mg/min] = 105 ÷ 1.6 = 65.625 min.',
   why:'Milligrams divided by milligrams per minute leaves minutes, so the result is a time in the same time unit the rate constant was quoted in. Half of the 105 mg starting amount is 52.5 mg, and at 0.8 mg per minute that removal takes 65.625 minutes, which is what dividing by twice the rate constant computes in a single move.'},
  {k:'round', t:'t½ = 65.6 min.',
   why:'Dr. Mosley reports this half-life to one decimal place, as 65.6 minutes, which is as far as a rate constant quoted to one decimal place will justify. The answer is a time and carries no reciprocal unit; per minute belongs to the rate constant that was given, not to the half-life that was asked for.'}],
 teach:[
  {h:'The idea', list:[
    'A zero-order half-life needs the starting amount (A0), which the data usually do not give.',
    'Stage 1: recover A0 by adding back what has already been lost, the rate constant multiplied by the elapsed time: A0 = A + kt.',
    'Stage 2: divide half of A0 by the rate constant: t½ = A0 ÷ 2k.',
    'Both stages use the same straight-line relation, and neither needs a logarithm.']},
  {h:'How the variables relate', list:[
    'First order: t1/2 = {{frac:0.693|k}}, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = {{frac:ln(1000)|k}}.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'The common error', t:'Skipping stage 1. The zero-order half-life depends on the starting amount, so that amount must be recovered first.'},
  {h:'What the chapter adds', list:[
    'Chapter 12 tabulates the per cent eliminated after one to six half-lives: 50, 75, 87.5, 93.75, 96.88 and 98.44.',
    'After ten half-lives, 99.90 per cent has been eliminated.',
    'It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain.',
    'The same count of half-lives governs the time to reach steady state.']}],
 teachImg:'slide_Introduction_p22',
 cite:'IntroductionandMathReview3Solutions.pdf, problem 1c; Introduction.pdf slide 19'},

{id:'m1-ord-n09', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'first-order-k-from-table', dupOf:'m1-ord-n01', skill:'krate',
 source:'slide',
 stem:'A pharmacist dissolved an antibiotic in purified water and measured the drug concentration in aliquots removed over 16 hours. The decomposition is first order.\n\nTime (hr) | C (mcg/mL) | ln C\n1.0 | 217.6 | 5.3827\n16.0 | 27.2 | 3.3032\n\nWhat is the rate constant for the decomposition?',
 units:'hr⁻¹',
 answer:0.1386,
 tol:0.002,
 steps:[
  {k:'setup', t:'For a first-order process, k = [ln(C₁) − ln(C₂)] ÷ (t₂ − t₁).',
   why:'Subtracting the integrated equation at the later time from the same equation at the earlier time cancels ln C0, leaving the rate constant in terms of two measured points. The natural logarithms are supplied in the table, so no logarithm has to be taken here. The earlier concentration goes first so that the result is positive.'},
  {k:'algebra', t:'k = (5.3827 − 3.3032) ÷ (16.0 − 1.0) hr = 2.0795 ÷ 15 hr.',
   why:'A difference of natural logarithms is a pure number, and dividing it by a span of hours gives reciprocal hours. The 15-hour separation is the widest the table allows, which uses the data most efficiently.'},
  {k:'round', t:'k = 0.13863 hr⁻¹, reported as 0.1386 hr⁻¹.',
   why:'Dr. Mosley reports first-order rate constants to four decimal places, and her key prints 0.1386 per hour while carrying 0.13863 into the next parts of the problem. Rounding at the end rather than at each step keeps the later answers consistent with hers.'}],
 teach:[
  {h:'The idea', list:[
    'When a table already gives natural logarithms (ln C), a first-order rate constant takes one subtraction and one division.',
    'The difference between two ln C values, divided by the time between them, is the slope of the straight line.',
    'The rate constant k is that slope with its sign reversed.',
    'Without a logarithm column, the same calculation is written as the logarithm of the ratio of the two concentrations, the form Dr. Mosley prefers.']},
  {h:'How the variables relate', list:[
    'Rate: {{frac:dC|dt}} = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - {{frac:kt|2.3}}.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = {{frac:0.693|k}}, one number for the drug. This one is not on the equation sheet.']},
  {h:'The common error', t:'Subtracting in the wrong order and getting a negative k. Put the earlier concentration first; a rate constant is never negative.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 gives the first-order rate constant its own units, 1/hr. No rate ever has these units.',
    'A rate is an amount per time. k is a fraction per time, and it becomes a rate only once it is multiplied by an amount.',
    'The units tell the quantities apart: mg/hr is a rate, and hr⁻¹ is a first-order constant.',
    'A constant given in mg/hr means the process is zero order.']}],
 teachImg:'slide_Introduction_p21',
 cite:'PHAR_4221_Homework_1.md, problem 1b; Introduction.pdf slide 18'},

{id:'m1-ord-n10', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'volume-from-c0', skill:'vddose',
 source:'slide',
 stem:'A pharmacist dissolved 200 mg of an antibiotic into a volume of purified water, equal to 200,000 mcg. The decomposition is first order with a rate constant of 0.13863 hr⁻¹, and the concentration 1.0 hour after preparation was 217.6 mcg/mL. What was the initial volume of water used to prepare the solution?',
 units:'mL',
 answer:800,
 tol:10,
 steps:[
  {k:'setup', t:'Recover the concentration at time zero: ln C0 = ln C + kt.',
   why:'The volume is the amount dissolved divided by the concentration at the moment of dissolution, before any decomposition. The measured value is one hour old, so it is extrapolated back; adding kt to the logarithm is the same as multiplying the concentration by e^(+kt).'},
  {k:'algebra', t:'ln C0 = 5.3827 + (0.13863 hr⁻¹ × 1.0 hr) = 5.3827 + 0.1386 = 5.5213, so C0 = e^5.5213 = 250.0 mcg/mL.',
   why:'Reciprocal hours multiplied by hours cancel, leaving a pure number that can be added to a logarithm. Taking the exponential returns the concentration in the units the table used. The result is larger than the one-hour value, which is the direction a back-extrapolation must move.'},
  {k:'setup', t:'Volume = amount dissolved ÷ initial concentration.',
   why:'A concentration is an amount per unit volume, so rearranging it for volume puts the amount on top. The whole 200 mg was dissolved and none had decomposed at time zero, so the amount to use is the full dose.'},
  {k:'round', t:'V = 200,000 mcg ÷ 250.0 mcg/mL = 800 mL.',
   why:'Micrograms divided by micrograms per millilitre leaves millilitres, and the microgram units cancel only because the dose was converted from 200 mg first. Her key prints 800 mL, which is exact at the precision of the data.'}],
 teach:[
  {h:'The idea', list:[
    'Finding a preparation volume joins two ideas.',
    'The kinetics supply the concentration at time zero (C0), which no sample measured directly.',
    'The definition of concentration, amount per volume, then turns C0 into a volume: V = amount dissolved ÷ C0.',
    'The same two stages appear throughout the course whenever a volume of distribution is found from a dose and an extrapolated concentration.']},
  {h:'How the variables relate', list:[
    'Rate: {{frac:dC|dt}} = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - {{frac:kt|2.3}}.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = {{frac:0.693|k}}, one number for the drug. This one is not on the equation sheet.']},
  {h:'The common error', t:'Dividing before the units agree. The dose is in milligrams and the concentration in micrograms per millilitre, so convert first.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 gives the first-order rate constant its own units, 1/hr. No rate ever has these units.',
    'A rate is an amount per time. k is a fraction per time, and it becomes a rate only once it is multiplied by an amount.',
    'The units tell the quantities apart: mg/hr is a rate, and hr⁻¹ is a first-order constant.',
    'A constant given in mg/hr means the process is zero order.']}],
 teachImg:'slide_Introduction_p21',
 cite:'PHAR_4221_Homework_1.md, problem 1d; Introduction.pdf slide 18'},

{id:'m1-ord-n11', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'zero', concept:'volume-from-c0', dupOf:'m1-ord-n10', skill:'vddose',
 source:'slide',
 stem:'Exactly 300 mg of a drug are dissolved into an unknown volume of distilled water. After complete dissolution, 1.0 mL samples were removed and assayed, giving 0.45 mg/mL at 0.5 hour and 0.30 mg/mL at 2.0 hours. Assuming zero-order decomposition, what was the original volume of water in which the drug was dissolved?',
 units:'mL',
 answer:600,
 tol:10,
 steps:[
  {k:'setup', t:'For a zero-order process C = C0 − kt, so the rate constant is the slope of concentration against time with the sign reversed, and the volume then follows from V = dose ÷ C0.',
   why:'The stem states zero order, so the linear relation applies and two points are all a straight line needs. The whole 300 mg was dissolved into the unknown volume, so the dose and the concentration at the moment of dissolution together fix it.'},
  {k:'algebra', t:'k = −(C₂ − C₁) ÷ (t₂ − t₁) = −(0.30 − 0.45) mg/mL ÷ (2.0 − 0.5) hr = 0.15 ÷ 1.5 = 0.1 (mg/mL)/hr.',
   why:'The order is stated in the stem, so the linear relation applies and the rate constant is the slope with the sign reversed. Milligrams per millilitre divided by hours gives milligrams per millilitre per hour. Only two points are supplied, which is all a straight line needs.'},
  {k:'algebra', t:'A0 = C + kt = 0.30 mg/mL + (0.1 (mg/mL)/hr × 2.0 hr) = 0.30 + 0.20 = 0.5 mg/mL.',
   why:'The concentration at the moment of dissolution is the two-hour value plus everything lost in those two hours, and for a zero-order process that loss is the rate constant multiplied by the time. Either measured point gives the same starting value; using the 0.5-hour point gives 0.45 plus 0.05, which is also 0.5 mg/mL.'},
  {k:'algebra', t:'V = 300 mg ÷ 0.5 mg/mL = 600 mL.',
   why:'Milligrams divided by milligrams per millilitre leaves millilitres, and no unit conversion was needed because the dose and the concentration were both quoted in milligrams. The volume is larger than 300 mL because the starting concentration is below 1 mg per millilitre.'},
  {k:'round', t:'V = 600 mL.',
   why:'Her key prints 600 mL with no rounding shown, because every number in the chain divides exactly and no logarithm or exponential was evaluated anywhere in it. Millilitres are the unit the 1.0 mL assay samples were quoted in, so the answer is reported in the same measure.'}],
 teach:[
  {h:'The idea', list:[
    'This is the first-order volume calculation with one change.',
    'Zero order recovers the starting concentration (C0) by adding back a fixed quantity, not by multiplying by an exponential factor.',
    'Choosing between the two recoveries is the only place the order enters, and here the stem states it.',
    'In both orders the final step is the definition of concentration rearranged for volume: V = dose ÷ C0.']},
  {h:'How the variables relate', list:[
    'Rate: {{frac:dC|dt}} = -k0, a rate that does not depend on how much drug is present.',
    'Integrated: C = C0 - k0t, a straight line on an evenly spaced concentration axis.',
    'k0 carries concentration per time, such as mg/L per hour.',
    'Half-life: t1/2 = C0/2k0, so it changes with the starting concentration.']},
  {h:'The common error', t:'Using the exponential recovery when the process is zero order.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 tabulates the units. A rate is mg/hr or mcg/mL/hr, and a zero-order rate constant k0 carries those same units.',
    'Zero order is the one order where the constant and the rate are numerically the same, because the rate does not depend on how much is present.',
    'So a zero-order constant cannot be quoted as a plain reciprocal time.']}],
 teachImg:'slide_Introduction_p20',
 cite:'IntroductionandMathReview2Solutions.pdf, problem 3; Introduction.pdf slide 17'},

{id:'m1-ord-n12', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'halflife-counting', skill:'krate',
 source:'slide',
 stem:'If the half-life for decomposition of a drug is 8 hours, how long will it take for 750 mg of the drug to decompose by 87.5 per cent? Assume first-order kinetics and constant temperature.',
 units:'hr',
 answer:24,
 tol:0.5,
 steps:[
  {k:'setup', t:'87.5 per cent decomposed leaves 12.5 per cent remaining, which is one eighth, or one half cubed.',
   why:'The percentage is given as what has gone and the half-life counts what remains, so it has to be turned round first. Recognising 12.5 per cent as a power of one half is what allows the problem to be finished without a calculator, which is how Dr. Mosley works it.'},
  {k:'algebra', t:'One eighth remains after 3 half-lives: 50 per cent decomposed at one, 75 per cent at two, 87.5 per cent at three.',
   why:'Each half-life removes half of what is still present, so the fraction remaining is halved at every step while the fraction decomposed climbs towards one hundred per cent. Building the short table is faster than the logarithmic route and produces the same answer exactly, because the target is a power of one half.'},
  {k:'algebra', t:'t = 3 × 8 hr = 24 hr.',
   why:'Multiplying a count of half-lives by the length of one half-life gives a time in hours. The 750 mg stated in the question is never used, because for a first-order process the time to reach a given percentage does not depend on the starting amount.'},
  {k:'round', t:'t = 24 hr.',
   why:'The answer is exact rather than rounded, because 87.5 per cent corresponds to a whole number of half-lives and no logarithm had to be evaluated. Dr. Mosley prints 24 hours and reaches it by this same three-step count rather than by an equation.'}],
 teach:[
  {h:'The idea', list:[
    'When the fraction remaining is a power of one half, counting half-lives answers the question without a logarithm.',
    '50 per cent decomposed is one half-life, 75 per cent is two and 87.5 per cent is three; the pattern reaches 99.9 per cent at ten.',
    'The count works for amounts, concentrations and percentages alike, because in a first-order process all three fall by the same factor in the same time.',
    'When the fraction is not a power of one half, the logarithmic route is needed.']},
  {h:'How the variables relate', list:[
    'First order: t1/2 = {{frac:0.693|k}}, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = {{frac:ln(1000)|k}}.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'The common error', t:'Counting with the percentage decomposed instead of the fraction remaining. Turn the percentage round first.'},
  {h:'What the chapter adds', list:[
    'Chapter 12 tabulates the per cent eliminated after one to six half-lives: 50, 75, 87.5, 93.75, 96.88 and 98.44.',
    'After ten half-lives, 99.90 per cent has been eliminated.',
    'It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain.',
    'The same count of half-lives governs the time to reach steady state.']}],
 teachImg:'slide_Introduction_p22',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 3; Introduction.pdf slide 19',
 quote:'First-order process with a 8 hour half-life, 50% of drug should be decomposed in one half-life (8 hours), 75% should be decomposed in two half-lives (16 hours), and 87.5% decomposed in 3 half-lives (24 hours).'},

{id:'m1-ord-n14', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'paired-order-halflife', skill:'krate',
 source:'both',
 stem:'A solution of a drug was freshly prepared at a concentration of 300 mg/mL. After 30 days, the drug concentration in the solution was 80 mg/mL. Assuming first-order kinetics, when will the drug decline to one-half of the original concentration?',
 units:'days',
 answer:15.7,
 tol:0.5,
 steps:[
  {k:'setup', t:'k = ln(C0 ÷ C) ÷ t = ln(300 ÷ 80) ÷ 30 days.',
   why:'Two concentrations and the time between them determine the first-order rate constant, and here the earlier concentration is the initial one, so no back-extrapolation is needed. The milligram per millilitre units cancel inside the logarithm. The elapsed time is in days, so the rate constant will be per day.'},
  {k:'algebra', t:'k = 1.32176 ÷ 30 days = 0.04406 day⁻¹, which Dr. Mosley reports as 0.044 day⁻¹.',
   why:'A pure number divided by days gives reciprocal days. The elapsed time is 30 days, so k is per day, not per hour.'},
  {k:'setup', t:'t½ = 0.693 ÷ k.',
   why:'The question asks when the concentration reaches one half of its original value, which is the definition of the half-life. Dr. Mosley notes that the wording, declines to one-half, is what identifies a half-life question.'},
  {k:'algebra', t:'t½ = 0.693 ÷ 0.04406 day⁻¹ = 15.73 days.',
   why:'Dividing a dimensionless logarithm by a quantity in reciprocal days leaves days, so the result is a time and carries no reciprocal unit. As a check on direction, the concentration has already fallen well past half of 300 by day 30, so a half-life shorter than 30 days is what the data demand.'},
  {k:'round', t:'t½ = 15.7 days.',
   why:'Her worked answer prints 15.7 days, to one decimal place, which matches the precision of a rate constant she reports as 0.044 per day. Carrying the unrounded rate constant instead gives 15.73 days, a difference far too small to change any conclusion drawn from it.'}],
 audit:'The transcript of the exam review renders the rate constant once as "0.044 per hour" and once as "0.0044"; the elapsed time of 30 days and her own printed half-life of 15.7 days are both consistent only with 0.044 per day. An exam written from these lectures would key 15.7 days.',
 teach:[
  {h:'The idea', list:[
    'Dr. Mosley reuses this stem in two parts: the same two concentrations, worked first as first order and then as zero order.',
    'The first-order half-life (t½) comes from the rate constant alone, t½ = 0.693 ÷ k, and does not depend on where the concentration started.',
    'The question asks when the concentration falls to one half of the original, time-zero value. That is the half-life, so t½ answers it directly.']},
  {h:'How the variables relate', list:[
    'First order: t1/2 = {{frac:0.693|k}}, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = {{frac:ln(1000)|k}}.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'The common error', t:'Giving k per hour when the elapsed time is in days. The time unit of k follows the time unit of the data.'},
  {h:'What the chapter adds', list:[
    'Chapter 12 tabulates the per cent eliminated after one to six half-lives: 50, 75, 87.5, 93.75, 96.88 and 98.44.',
    'After ten half-lives, 99.90 per cent has been eliminated.',
    'It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain.',
    'The same count of half-lives governs the time to reach steady state.']}],
 teachImg:'slide_Introduction_p22',
 cite:'RecapExam1.pdf, slide "Practice" (Module 1); Introduction.pdf slide 19',
 quote:'Assuming first-order kinetics, when will the drug decline to one-half of the original concentration?'},

{id:'m1-ord-n15', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'paired-order-halflife', dupOf:'m1-ord-n14', skill:'krate',
 source:'both',
 stem:'A solution of a drug was freshly prepared at a concentration of 300 mg/mL. After 30 days, the drug concentration in the solution was 80 mg/mL. Assuming zero-order kinetics, when will the drug decline to one-half of the original concentration?',
 units:'days',
 answer:20.45,
 tol:0.6,
 steps:[
  {k:'setup', t:'k = (C0 − C) ÷ t = (300 − 80) mg/mL ÷ 30 days.',
   why:'Under the zero-order assumption the concentration falls linearly, so the rate constant is the quantity lost divided by the time taken. The same two data points are used as in the first-order version; only the relation applied to them changes. Milligrams per millilitre divided by days gives milligrams per millilitre per day.'},
  {k:'algebra', t:'k = 220 ÷ 30 = 7.333 (mg/mL)/day, which Dr. Mosley reports as 7.33 (mg/mL)/day.',
   why:'The rate constant is a rate here rather than a proportion, so it carries concentration per unit time. Every day the solution loses the same 7.33 mg/mL whatever remains, which is the assumption being tested.'},
  {k:'setup', t:'t½ = C0 ÷ 2k.',
   why:'Half of 300 mg/mL has to be removed, and the rate constant states how much is removed per day, so the time is the quantity to remove divided by that rate. Unlike the first-order case, the starting concentration appears explicitly and the answer would change if it did.'},
  {k:'algebra', t:'t½ = 300 mg/mL ÷ [2 × 7.333 (mg/mL)/day] = 300 ÷ 14.666 = 20.45 days.',
   why:'The concentration units cancel and the reciprocal day inverts, leaving days. Using her rounded 7.33 per day in place of the unrounded 7.333 gives 20.46 days instead, a difference too small to change any conclusion, which is why either carries full marks.'},
  {k:'round', t:'t½ = 20.45 days.',
   why:'Dr. Mosley reports 20.45 days, to two decimal places, worked from the unrounded rate constant. The zero-order half-life is far longer than the first-order one for the same pair of points, because a zero-order process removes a fixed amount per day rather than a fixed fraction.'}],
 note:'Rounding k to 7.33 before dividing gives 20.46 days; carrying 7.3333 gives 20.45 days. Both are accepted.',
 audit:'Her handwriting on the RecapExam1 slide records 20.463 days, which follows from the rounded rate constant of 7.33; she says 20.45 days aloud in the exam review, which follows from the unrounded 7.3333. The printed slide gives no answer. Both readings are within the tolerance set here, and an exam written from these lectures would accept either.',
 teach:[
  {h:'The idea', list:[
    'The paired stem works the same two measurements under both assumptions, so the two half-life relations can be compared.',
    'Here the zero-order half-life is the larger of the two.',
    'It would change if the starting concentration changed; the first-order half-life would not.',
    'Two points lie on both a straight line and an exponential, so the data alone cannot select the order; the stem states which to assume.']},
  {h:'How the variables relate', list:[
    'First order: t1/2 = {{frac:0.693|k}}, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = {{frac:ln(1000)|k}}.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'The common error', t:'Using the first-order relation out of habit. Under zero order the half-life is C0/2k0.'},
  {h:'What the chapter adds', list:[
    'Chapter 12 tabulates the per cent eliminated after one to six half-lives: 50, 75, 87.5, 93.75, 96.88 and 98.44.',
    'After ten half-lives, 99.90 per cent has been eliminated.',
    'It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain.',
    'The same count of half-lives governs the time to reach steady state.']}],
 teachImg:'slide_Introduction_p22',
 cite:'RecapExam1.pdf, slide "Practice" (Module 1); Introduction.pdf slide 19'},

{id:'m1-ord-n16', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'halflife-counting', dupOf:'m1-ord-n12', skill:'krate',
 source:'slide',
 stem:'How many half-lives would it take for 99.9 per cent of any initial concentration of a drug to decompose? Assume first-order kinetics.',
 units:'half-lives',
 answer:10,
 tol:0.3,
 steps:[
  {k:'setup', t:'99.9 per cent decomposed leaves 0.1 per cent remaining, so C ÷ C0 = 0.001.',
   why:'The percentage is stated as what has decomposed and the equation works in what remains, so it has to be converted first. Taking 99.9 per cent straight into the equation as the remaining fraction gives an answer near zero, which is the usual error on this item.'},
  {k:'setup', t:'t = ln(C0 ÷ C) ÷ k, and k = 0.693 ÷ t½, so t = ln(1000) ÷ (0.693 ÷ t½) = [ln(1000) ÷ 0.693] × t½.',
   why:'Substituting the half-life relation for the rate constant expresses the time as a multiple of the half-life, which is what the question asks for. The starting concentration cancels, so the answer holds for any initial concentration, as the stem states.'},
  {k:'algebra', t:'ln(1000) ÷ 0.693 = 6.907755 ÷ 0.693 = 9.97 half-lives.',
   why:'Both quantities are pure numbers, so the result is a pure count of half-lives with no time unit attached. Her key prints 9.97 and takes it as 10.'},
  {k:'round', t:'t = 10 half-lives.',
   why:'Her table confirms the same answer without the logarithm: after 10 half-lives 0.1 per cent remains, which is 99.9 per cent decomposed. She uses this figure repeatedly, since a question asking for the time for 99.9 per cent of a drug to be eliminated always resolves to ten half-lives.'}],
 teach:[
  {h:'The idea', list:[
    'Ten half-lives is the standard count for practical completion of a first-order process.',
    'The logarithmic route gives 9.97 half-lives.',
    'The halving table reaches 99.9 per cent decomposed at the tenth step.',
    'Dr. Mosley prints both, as she does whenever two independent routes reach the same answer.',
    'The count does not depend on the starting concentration, so the same ten half-lives applies to any dose.']},
  {h:'How the variables relate', list:[
    'First order: t1/2 = {{frac:0.693|k}}, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = {{frac:ln(1000)|k}}.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'The common error', t:'Using 99.9 per cent as the fraction remaining. What remains is 0.1 per cent.'},
  {h:'What the chapter adds', list:[
    'Chapter 12 tabulates the per cent eliminated after one to six half-lives: 50, 75, 87.5, 93.75, 96.88 and 98.44.',
    'After ten half-lives, 99.90 per cent has been eliminated.',
    'It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain.',
    'The same count of half-lives governs the time to reach steady state.']}],
 teachImg:'slide_Introduction_p22',
 cite:'IntroductionandMathReview2Solutions.pdf, problem 1; Introduction.pdf slide 19'},

/* ══════════════════ AUC ═══════════════════════════════════════════════ */

{id:'m1-auc-c01', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'auc', sub:'concept', concept:'auc-meaning', skill:'recall',
 source:'both',
 stem:'What does the area under the plasma concentration-versus-time curve tell you about a drug?',
 options:[
  {t:'The extent of drug available for the body to use', correct:true,
   why:'Area under the curve combines how high the concentration went with how long it stayed there, so it measures total exposure rather than any single moment of it. It is used to determine the extent of drug absorption or the effectiveness of a given drug after administration by a particular route.'},
  {t:'The rate at which the drug is absorbed from the dosage form', correct:false,
   why:'Rate of absorption is read from how quickly the curve rises and from the time of the peak, not from the area beneath it. Two formulations can produce the same area while reaching their peaks at different times. Area is an extent measure; rate is a shape measure.'},
  {t:'The half-life of the drug', correct:false,
   why:'Half-life comes from the slope of the declining part of the curve on semi-logarithmic axes, a separate reading from the area. A long half-life usually goes with a large area, but they are different quantities and neither can be computed from the other alone. This answer substitutes a related property for the one asked about.'},
  {t:'The minimum toxic concentration of the drug', correct:false,
   why:'The minimum toxic concentration is a threshold level fixed by the drug and the patient, drawn as a horizontal line across the curve, and it does not come from the area. An area is a total, not a level. Nothing about integrating the curve produces a safety limit.'}],
 teach:[
  {h:'The idea', list:[
    'AUC (area under the concentration-versus-time curve) measures total exposure: the concentration integrated over time.',
    'It combines how high the concentration went with how long it stayed there.',
    'It is the quantity for comparing how much drug the body received by two different routes or from two different formulations.',
    'The AUC after an oral dose divided by the AUC after an intravenous dose gives the bioavailability factor F, the fraction of the oral dose that enters the plasma.',
    'The total area is the sum of the areas of the segments the curve is broken into.']},
  {h:'How the variables relate', list:[
    'AUC measures the extent of drug available to the body.',
    'Its units are concentration multiplied by time, such as mg/L x hr or mcg/mL x hr.',
    'Clearance (Cl) ties the dose (D0) to exposure: Cl = {{frac:D0|AUC}}.']},
  {h:'The common error', t:'Reading the rate of absorption from the area. Rate comes from how fast the curve rises and when it peaks; area measures extent.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 treats the area as a measure of the amount of drug the body has been exposed to.',
    'The trapezoidal estimate does not depend on the shape of the concentration-time curve.',
    'It makes no assumption about the order of the process, so the same arithmetic serves a zero-order and a first-order curve alike.']}],
 teachImg:'slide_Introduction_p26',
 cite:'Introduction.pdf slides 22–23',
 quote:'for us, that tells us about the extent of drug that is available for the body to use'},

{id:'m1-auc-n01', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'auc', sub:'trap', concept:'trapezoidal-auc', skill:'auc',
 source:'slide',
 stem:'Plasma drug levels after a dose were as follows.\n\nTime (hr) | Plasma drug level (mcg/mL)\n0.5 | 38.9\n1 | 30.3\n2 | 18.4\n3 | 11.1\n4 | 6.77\n5 | 4.10\n\nWhat is the area under the curve from hours 2 to 4?',
 units:'mcg·hr/mL',
 answer:23.7,
 tol:0.5,
 steps:[
  {k:'setup', t:'The trapezoidal rule takes each segment as [(Cₙ₋₁ + Cₙ) ÷ 2] × (tₙ − tₙ₋₁), which is one half the sum of the two parallel sides times the width.',
   why:'Each pair of neighbouring points is joined by a straight line, making a trapezium whose parallel sides are the two concentrations and whose width is the time between them. Dr. Mosley reduces the printed formula to one half base times height. Summing the segments over the interval asked for gives the area across that interval.'},
  {k:'setup', t:'Hours 2 to 4 contain two segments: 2 to 3 hr and 3 to 4 hr, each 1 hour wide.',
   why:'Only the points inside the requested interval are used, so the 0.5-hour and 1-hour readings play no part and the 5-hour reading is beyond the upper limit. Counting the segments before computing anything prevents both including a segment outside the range and dropping one inside it.'},
  {k:'algebra', t:'Segment 1: [(18.4 + 11.1) mcg/mL ÷ 2] × 1 hr = 14.75 × 1 = 14.75 mcg·hr/mL.',
   why:'Averaging the two concentrations gives the height of a rectangle of equal area to the trapezium, and multiplying by the one-hour width gives the area. Micrograms per millilitre multiplied by hours gives micrograms times hours per millilitre.'},
  {k:'algebra', t:'Segment 2: [(11.1 + 6.77) mcg/mL ÷ 2] × 1 hr = 8.935 × 1 = 8.935 mcg·hr/mL.',
   why:'The same construction applies to the second trapezium, with the 3-hour concentration now the taller of its two sides. This segment is smaller than the first because the concentration has fallen further.'},
  {k:'algebra', t:'AUC = 14.75 + 8.935 = 23.685 mcg·hr/mL.',
   why:'The two segment areas are in the same unit and add directly, because each was already reduced to a concentration multiplied by a time. Adding rather than averaging is what the trapezoidal rule requires, since the segments sit side by side under the curve rather than overlapping.'},
  {k:'round', t:'AUC = 23.7 mcg·hr/mL.',
   why:'Dr. Mosley reports 23.7 for this interval, to three significant figures, which matches the precision of the tabulated concentrations. The unit is a concentration multiplied by a time, which is why it reads as micrograms times hours per millilitre rather than as a concentration.'}],
 teach:[
  {h:'The idea', list:[
    'The trapezoidal rule estimates the area beneath a set of measured points.',
    'Join neighbouring points with straight lines, then add the areas of the trapezoids that result.',
    'Each segment is the average of its two concentrations multiplied by the time between them.',
    'The true curve between two points is not straight: a falling first-order segment bows below the straight line, so that trapezoid slightly overestimates the area.',
    'The estimate improves as sampling times get closer together.',
    'The unit of the result is always concentration multiplied by time.']},
  {h:'How the variables relate', list:[
    'One trapezoid = (1/2)(C1 + C2)(t2 - t1), which is one half base times height.',
    'Total AUC is the sum of the segments, so unequal time intervals are handled one segment at a time.',
    'The width of a segment is the time interval, not the number of samples.']},
  {h:'The common error', t:'Including a segment outside the requested interval, or averaging the segment areas instead of adding them.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 states the assumption behind the method: a straight line between consecutive points.',
    'Accuracy follows the spacing. Widely spaced points let the real curve depart from the straight line and increase the error.',
    'The estimate improves as points are added, which is why each segment runs between neighbouring samples rather than across a long gap.']}],
 teachImg:'slide_Introduction_p28',
 cite:'Introduction.pdf slides 24–25',
 quote:'it is basically the calculations from, I’m gonna say math 0.5, like fifth grade math when you had geometry, where it’s one half base times height'},

{id:'m1-auc-n02', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'auc', sub:'trap', concept:'trapezoidal-auc', dupOf:'m1-auc-n01', skill:'auc',
 source:'slide',
 stem:'Plasma drug levels after a dose were as follows.\n\nTime (hr) | Plasma drug level (mcg/mL)\n0.5 | 38.9\n1 | 30.3\n2 | 18.4\n3 | 11.1\n4 | 6.77\n5 | 4.10\n\nWhat is the area under the curve from hours 0.5 to 2?',
 units:'mcg·hr/mL',
 answer:41.65,
 tol:0.8,
 steps:[
  {k:'setup', t:'Hours 0.5 to 2 contain two segments of unequal width: 0.5 to 1 hr, which is 0.5 hr wide, and 1 to 2 hr, which is 1 hr wide.',
   why:'The sampling times in this table are not evenly spaced, so each segment carries its own width and a single width cannot be factored out of the sum. Reading the widths off the time column before starting is what prevents the first segment being given a full hour.'},
  {k:'algebra', t:'Segment 1: [(38.9 + 30.3) mcg/mL ÷ 2] × 0.5 hr = 34.6 × 0.5 = 17.30 mcg·hr/mL.',
   why:'The two concentrations average to 34.6 mcg/mL and the interval is half an hour, so the area is half of that average. Micrograms per millilitre multiplied by hours gives micrograms times hours per millilitre.'},
  {k:'algebra', t:'Segment 2: [(30.3 + 18.4) mcg/mL ÷ 2] × 1 hr = 24.35 × 1 = 24.35 mcg·hr/mL.',
   why:'This segment is wider and its concentrations are lower, and the two effects work against each other, which is why it is the larger of the two areas despite sitting later on the curve. The width has to be taken from the time column rather than assumed.'},
  {k:'algebra', t:'AUC = 17.30 + 24.35 = 41.65 mcg·hr/mL.',
   why:'The segment areas share a unit and add directly. The result is larger than the area from hours 2 to 4 because the concentrations over this earlier interval are higher, which is the expected direction for a curve that is declining throughout.'},
  {k:'round', t:'AUC = 41.65 mcg·hr/mL.',
   why:'The value is reported to two decimal places, which is what the half-hour and one-hour segment widths support without inventing precision. The unit is again a concentration multiplied by a time, unchanged by the unequal segment widths used over this earlier stretch of the curve.'}],
 teach:[
  {h:'The idea', list:[
    'The trapezoidal rule does not need evenly spaced samples; each segment uses the interval between its own two points.',
    'So the rule works on any sampling schedule. Pharmacokinetic sampling is usually dense early and sparse late.']},
  {h:'How the variables relate', list:[
    'One trapezoid = (1/2)(C1 + C2)(t2 - t1), which is one half base times height.',
    'Total AUC is the sum of the segments, so unequal time intervals are handled one segment at a time.',
    'The width of a segment is the time interval, not the number of samples.']},
  {h:'The common error', t:'Assuming one uniform width. Read each width from the time column; a wrong width changes the answer by whatever the mismatched intervals amount to.'},
  {h:'What the chapter adds', list:[
    'Chapter 2 states the assumption behind the method: a straight line between consecutive points.',
    'Accuracy follows the spacing. Widely spaced points let the real curve depart from the straight line and increase the error.',
    'The estimate improves as points are added, which is why each segment runs between neighbouring samples rather than across a long gap.']}],
 teachImg:'slide_Introduction_p28',
 cite:'Introduction.pdf slides 24–25'},


/* ---------- L01 numeric: the two parts of her zero-order table problem that
   sit between the rate constant and the half-life, so the set can be worked
   through the way she sets it (a: k, b: C0, then t½ and 90%). ---------- */
{id:'m1-ord-n17', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'zero', concept:'zero-order-c0-back-extrapolation', skill:'krate',
 source:'slide',
 stem:'A drug solution decomposes by a zero-order process at 6 (mg/mL)/hr, and the sample taken at 2 hours measured 338 mg/mL. What was the initial starting concentration of the solution?',
 units:'mg/mL',
 answer:350,
 tol:2,
 steps:[
  {k:'setup', t:'C = C0 − kt, so C0 = C + kt',
   why:'The zero-order integrated equation is a straight line, and the initial concentration is its intercept. Rearranging to put C0 on its own adds back what was lost, so the sign in front of the rate constant flips from minus to plus.'},
  {k:'algebra', t:'C0 = 338 mg/mL + (6 (mg/mL)/hr)(2 hr) = 338 + 12 = 350 mg/mL',
   why:'Milligrams per millilitre per hour multiplied by hours leaves milligrams per millilitre, so the two terms can be added. Six milligrams per millilitre disappear in each of the first two hours, which is the 12 added back.'},
  {k:'round', t:'C0 = 350 mg/mL',
   why:'Her key prints 350 mg/mL. The value is exact, so no rounding is involved, and it is the number the half-life part of this problem then uses.'}],
 teach:[
  {h:'The idea', list:[
    'Recovering the starting concentration (C0, the intercept) from a later sample is the same move in both orders; only the arithmetic differs.',
    'A zero-order process loses a fixed amount per hour, so the correction is added back.',
    'A first-order process keeps a fixed fraction per hour, so its correction multiplies.']},
  {h:'How the variables relate', list:[
    'Zero order: C = C0 - k0t, so C0 = C + k0t, with the correction added.',
    'First order: C = C0e^(-kt), so C0 = Ce^(+kt), with the correction multiplied.',
    'A zero-order rate constant carries concentration per time; a first-order one carries reciprocal time.',
    'C0 matters here because the zero-order half-life, C0/2k0, depends on it.',
    'Any point on a zero-order line recovers the same intercept when its own t is used.']},
  {h:'The common error', t:'Using the first-order correction. Here it would give 338 multiplied by e^(6 × 2), which is not a concentration any solution could hold.'}],
 teachImg:'slide_Introduction_p20',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 2, part b; Introduction.pdf slide 17',
 quote:'C₀ = 338 mg/mL + (6 (mg/mL)/hr)(2 hr) = 350 mg/mL'},

{id:'m1-ord-n18', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'zero', concept:'zero-order-time-for-percent', skill:'krate',
 source:'slide',
 stem:'A drug solution with an initial concentration of 350 mg/mL decomposes by a zero-order process at 6 (mg/mL)/hr. How much time is required for the original solution to decompose by 90%?',
 units:'hr',
 answer:52.5,
 tol:0.8,
 steps:[
  {k:'setup', t:'90 per cent decomposed leaves 10 per cent, so C = 0.10 × 350 mg/mL = 35 mg/mL',
   why:'The question names what has gone and the equation is written in terms of what is left, so the percentage has to be turned round before anything is substituted. A tenth of 350 is 35, and that is the concentration the solution has to fall to.'},
  {k:'setup', t:'C = C0 − kt, so t = {{frac:C0 − C|k}}',
   why:'Rearranging the zero-order line puts the time on its own. The numerator is the amount of concentration that has to disappear and the denominator is how much disappears each hour, so the quotient is a number of hours.'},
  {k:'algebra', t:'t = (350 − 35) mg/mL ÷ (6 (mg/mL)/hr) = 315 ÷ 6 = 52.5 hr',
   why:'Milligrams per millilitre divided by milligrams per millilitre per hour leaves hours. The 315 is what must be lost, and at 6 per hour that takes 52.5 hours.'},
  {k:'round', t:'t = 52.5 hr',
   why:'Her key prints 52.5 hr, to one decimal place. As a check, the table for this solution reads 62 mg/mL at 48 hours, so 35 mg/mL is reached a few hours after the last sample, which brackets the answer.'}],
 teach:[
  {h:'The idea', list:[
    'A zero-order time is not a multiple of the half-life in the way a first-order time is.',
    'Here the half-life is 29.2 hours, and 90 per cent decomposed takes 52.5 hours: 1.8 half-lives.',
    'A first-order process would need 3.32 half-lives to reach 90 per cent.',
    'The reason: the second half of the solution takes exactly as long to decompose as the first, so a zero-order process runs out of drug at a predictable time instead of approaching zero.']},
  {h:'How the variables relate', list:[
    'Zero order: t = {{frac:C0 - C|k0}}, linear in the amount to be removed.',
    'First order: t = {{frac:ln(C0/C)|k}}, so 90 per cent is always {{frac:ln(10)|k}}, or 3.32 half-lives.',
    'A zero-order half-life is C0/2k0, and the second half takes the same time as the first.',
    'The solution reaches zero concentration at t = {{frac:C0|k0}}, which is 58.3 hours here.',
    'Deciding the order has to come before either relation is used.']},
  {h:'The common error', t:'Counting half-lives as if the process were first order.'}],
 teachImg:'slide_Introduction_p20',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 2, final part; Introduction.pdf slide 17',
 quote:'t = (350 − 35) mg/mL / (6 mg/mL/hr) = 52.5 hr'},

];
