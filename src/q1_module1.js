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
   the vignette in one line, and `module` places it in the Topics view.
   test.js checks that every id here exists and that no part is listed twice.
   ========================================================================== */
const CHAINS = [
 {id:'m1-first', module:1, name:'Decomposition of a drug solution, first order',
  setup:'One table of six samples over 48 hours, worked through to the time for 90 per cent',
  parts:['m1-ord-n01','m1-ord-n02','m1-ord-n03','m1-ord-n04']},

 {id:'m1-zero', module:1, name:'The same experiment, zero order',
  setup:'Her identical stem with numbers that make the decomposition zero order, in four parts',
  parts:['m1-ord-n05','m1-ord-n17','m1-ord-n06','m1-ord-n18']},

 {id:'m1-antibiotic', module:1, name:'An antibiotic dissolved in purified water',
  setup:'Aliquots assayed over 16 hours, ending in the volume the solution was made up to',
  parts:['m1-ord-n09','m1-ord-n10']},

 {id:'m1-30days', module:1, name:'A solution assayed after 30 days, read both ways',
  setup:'The same two concentrations taken first as first order and then as zero order',
  parts:['m1-ord-n14','m1-ord-n15']},

 {id:'m1-auc', module:1, name:'Area under the curve from one table of plasma levels',
  setup:'Six plasma levels, with the trapezoidal rule applied over two different intervals',
  parts:['m1-auc-n02','m1-auc-n01']},

 {id:'m2-table', module:2, name:'IV bolus from a concentration–time table (a–h)',
  setup:'50 mg to a 70-kg patient, six samples over 3 hours, her eight-part battery in her order',
  parts:['m2-n-k1','m2-n-t1','m2-n-c0a','m2-n-c15','m2-n-vd1','m2-n-cl1','m2-n-d3a','m2-n-999a']},

 {id:'m2-points', module:2, name:'IV bolus from two plasma points (a–h)',
  setup:'250 mg of an antibiotic, two concentrations in prose, the same eight parts',
  parts:['m2-n-k2','m2-n-t2','m2-n-c0b','m2-n-c15b','m2-n-vd2','m2-n-cl3','m2-n-d3b','m2-n-999b']},

 {id:'m3-theophylline', module:3, name:'Theophylline by continuous infusion',
  setup:'The plateau at 50 mg/hr, then the rate that would reach a different plateau',
  parts:['inf-n1','inf-n2']},

 {id:'m3-150mg', module:3, name:'150 mg infused over 6 hours',
  setup:'The concentration at the end of the infusion, then 3 hours after it stops',
  parts:['inf-n6','inf-n7']},

 {id:'m3-agent24', module:3, name:'An agent targeted at 24 mg/L',
  setup:'Rate, loading dose, the climb at 10 hours and the decay after an early stop',
  parts:['inf-n10','inf-n12','inf-n11','inf-n13']},

 {id:'m3-inclass', module:3, name:'Recommend a rate and a loading dose, then four scenarios',
  setup:'Css 20 mg/L, t½ 5 hr, VD 16 L — with the loading dose and without it, side by side',
  parts:['inf-n14','inf-n19','inf-n20','inf-n21','inf-n15']},

 {id:'m3-3days', module:3, name:'A loading dose with a 75 mg/hr infusion for 3 days',
  setup:'Where the 500 mg loading dose in her stem is not the appropriate one',
  parts:['inf-n22','inf-n23','inf-n24','inf-n25','inf-n26']},

 {id:'m3-female', module:3, name:'A 35-year-old, 65-kg patient on infusion',
  setup:'The rate from a volume stated as a percentage of body weight, then the time to 95 per cent',
  parts:['inf-n17','inf-n16']},

 {id:'m4-battery', module:4, name:'500 mg IV bolus with a 48-hour urine collection',
  setup:'Her six-part battery: fe, k, ke, then total, renal and hepatic clearance',
  parts:['m4-n-fe','m4-n-k','m4-n-ke','m4-n-clt','m4-n-clr','m4-n-clh']},

 {id:'m4-antibiotic', module:4, name:'An antibiotic secreted by the kidney, before and after renal failure',
  setup:'k and half-life at a clearance of 750 mL/min, then the half-life at 150 mL/min',
  parts:['m4-n-abk','m4-n-ab1','m4-n-ab2']},

 {id:'m4-crcl', module:4, name:'Creatinine clearance for a 45-year-old female',
  setup:'Height in centimetres to inches, then ideal body weight, then Cockcroft–Gault',
  parts:['m4-n-inches','m4-n-ibwf','m4-n-crcl']},

 {id:'m5-investigational', module:5, name:'An investigational drug given as a 500-mg oral dose',
  setup:'The two rate constants, then tmax and Cmax, then Cmax when the dose is doubled',
  parts:['m5-n01','m5-n02','m5-n03','m5-n04','m5-n19']},

 {id:'m5-antibiotic', module:5, name:'An oral antibiotic given by its two-exponential equation',
  setup:'Cp = 75(e^(−0.22t) − e^(−2.75t)), read for both half-lives, the peak, the volume and a later point',
  parts:['m5-n05','m5-n06','m5-n07','m5-n08','m5-n09','m5-n10']},

 {id:'m5-750', module:5, name:'A 750-mg oral dose given by its equation',
  setup:'Cp = 23.2(e^(−0.182t) − e^(−0.872t)), read for the half-life, the peak and the volume',
  parts:['m5-n16','m5-n17','m5-n18','m5-n15']},

 {id:'m5-500', module:5, name:'A 500-mg oral dose, 88 per cent bioavailable',
  setup:'The absorption rate constant, tmax and Cmax, then Cmax when the volume doubles',
  parts:['m5-n11','m5-n12','m5-n13','m5-n14']},
];

const Q_MODULE1 = [

/* ══════════════════ INTRO — disciplines, terms, matrix, models, curve ═══ */

{id:'m1-int-01', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'intro', sub:'disc', concept:'biopharmaceutics-defn', skill:'recall',
 source:'both',
 stem:'Which term covers the interrelationship of the physicochemical properties of a drug, the dosage form in which it is given, and the route of administration on the rate and extent of systemic drug absorption?',
 options:[
  {t:'Biopharmaceutics', correct:true,
   why:'This is the definition Dr. Mosley gives for biopharmaceutics: three inputs, drug properties, dosage form and route, feeding one output, the rate and extent of systemic absorption. It is the discipline that stops at the point the drug enters the circulation, which is where pharmacokinetics starts. Everything on the drug-product design table, from particle size to excipients to method of manufacture, sits inside this one definition.'},
  {t:'Toxicology', correct:false,
   why:'Clinical toxicology is the study of adverse effects of drugs in the body, so it is about what a drug does once it is present, not about how much of it gets in. Nothing in the definition mentions harm or adverse effect. Students reach for this when they read "extent" as "extent of injury" rather than "extent of absorption".'},
  {t:'Pharmacodynamics', correct:false,
   why:'Pharmacodynamics is the relationship between drug concentration at the site of action and pharmacological response, so its two variables are concentration and effect. The definition in the question names dosage form and route, which are formulation variables, and never mentions a response. This was the second most popular answer when the class was polled.'},
  {t:'Pharmacology', correct:false,
   why:'Pharmacology is the broader study of drug action, and picking it means answering at the level of the whole field rather than the specific discipline named. The definition is narrow and formulation-centred, so a general term cannot be the best match. One student in the class poll chose this.'}],
 teach:[
 {t:'The related disciplines divide by which two quantities they relate. Biopharmaceutics relates the drug product to the rate and extent of absorption. Pharmacokinetics relates concentration to time. Pharmacodynamics relates concentration to response. Clinical toxicology deals with adverse effects, and toxicokinetics applies pharmacokinetic principles to drug safety evaluation studies. Identifying the pair of quantities in a stem settles which discipline is being described.'},
  {h:'How the variables relate', list:[
    'Pharmacokinetics relates concentration to time; pharmacodynamics relates concentration to response.',
    'Biopharmaceutics relates the drug, the dosage form and the route to the rate and extent of absorption.',
    'ADME is the sequence pharmacokinetics describes: absorption, distribution, metabolism, excretion.']},
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
   why:'Pharmacodynamics pairs concentration with response, which is the distinction Dr. Mosley draws in one line: pharmacodynamics is concentration and response, pharmacokinetics is concentration and time. Both disciplines have concentration on one side, so the second quantity is what separates them. A question naming an effect, a blood pressure drop or a bacterial kill is pairing concentration with response.'},
  {t:'Time after administration', correct:false,
   why:'Concentration against time is pharmacokinetics, not pharmacodynamics, and swapping the two is the single most common confusion between them. Every curve in this module has time on the horizontal axis, which makes time the familiar partner for concentration and therefore the tempting answer. The word to check is the one that is not concentration.'},
  {t:'Dosage form', correct:false,
   why:'Concentration against dosage form belongs to biopharmaceutics, which relates the drug product and its route to the rate and extent of absorption. Picking this attaches a formulation variable to a discipline that does not deal with formulation. Pharmacodynamics begins after the drug has reached its site of action, so how it was formulated is already behind it.'},
  {t:'Population group', correct:false,
   why:'Differences between population groups are the subject of population pharmacokinetics, which Dr. Mosley lists as a subdivision of clinical pharmacokinetics. That is still a concentration-and-time discipline; it simply asks how the time course differs from one group to another. Nothing about it concerns response.'}],
 teach:[
 {t:'Pharmacokinetics and pharmacodynamics both start from concentration and differ in what they pair it with. Pharmacokinetics asks what the concentration is at a given time, which is what every equation in this course computes. Pharmacodynamics asks what response that concentration produces. Clinical pharmacokinetics is the application of pharmacokinetic methods to drug therapy for specific drugs, and toxicokinetics is the same set of methods applied to drug safety evaluation studies.'},
  {h:'How the variables relate', list:[
    'Pharmacokinetics relates concentration to time; pharmacodynamics relates concentration to response.',
    'Biopharmaceutics relates the drug, the dosage form and the route to the rate and extent of absorption.',
    'ADME is the sequence pharmacokinetics describes: absorption, distribution, metabolism, excretion.']},
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
   why:'Absorption ends at the moment the drug reaches the systemic circulation, so it is the only one of the six terms that is about getting in rather than moving around or leaving. Dr. Mosley frames it as passing the drug through biological membranes, and the drug is not counted as being in the body until it is in solution and able to cross those membranes.'},
  {l:'Distribution', r:'Reversible transfer of a drug to and from the site of measurement',
   why:'The word that carries this definition is reversible: drug moves out to the tissues and back again, which is why the schematic draws arrows in both directions. The site of measurement and the site of action may or may not be the same place, so distribution is defined against where the sample is taken rather than where the effect occurs.'},
  {l:'Metabolism', r:'Conversion of one chemical species to another',
   why:'Metabolism, also called biotransformation, is defined by chemical change and says nothing about the drug leaving the body. It matters clinically because the new species may be inactive, or may be the active form of a prodrug, or may simply be easier for the body to excrete.'},
  {l:'Excretion', r:'Removal of intact drug or metabolite from the body',
   why:'Excretion is removal without chemical change, which is why the definition specifies intact drug or metabolite. Pairing it with the conversion definition is the usual slip, because metabolism and excretion sit next to each other in ADME and both end with the drug gone.'},
  {l:'Elimination', r:'Irreversible loss of drug from the body by all routes',
   why:'Elimination is the term that contains both metabolism and excretion, which is why Dr. Mosley calls it the catch-all. The word irreversible separates it from distribution, where drug that leaves the plasma can come back.'},
  {l:'Disposition', r:'All kinetic processes occurring after systemic absorption',
   why:'Disposition is distribution plus elimination, that is, everything that happens to the drug once it has been absorbed. It is the only term of the six that is a sum of other terms rather than a single process, and it excludes absorption by definition.'}],
 teach:[
 {t:'The four ADME processes describe single steps, and two further terms group them. Elimination groups metabolism and excretion, because both remove drug irreversibly. Disposition groups distribution and elimination, because both happen after absorption. Placing a new term correctly is a matter of asking whether it names one step or a set of steps, and where absorption falls relative to it.'},
  {h:'How the variables relate', list:[
    'Elimination = excretion + biotransformation. Both remove the parent drug irreversibly.',
    'Disposition = distribution + elimination, that is, everything after absorption.',
    'First-pass metabolism lowers F, the fraction of an oral dose reaching the circulation.',
    'Subscripts name the fluid: Cp is plasma, Cs is serum, a bare C is either.']},
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
   why:'Bioavailability is a measure of the systemic availability of a drug, so anything destroyed before the drug reaches the general circulation lowers it. Dr. Mosley describes the liver taking up roughly half the drug on the first pass and the result being a lower bioavailability. The dose swallowed and the dose available to the body are therefore different numbers for such a drug.'},
  {t:'Its volume of distribution is reduced', correct:false,
   why:'Volume of distribution is a proportionality constant between the amount of drug in the body and the measured concentration, and it describes where the drug goes after it arrives. First-pass metabolism happens before arrival, so it changes how much gets in rather than how widely that amount spreads. Selecting this attaches a loss of drug to the wrong parameter.'},
  {t:'Its elimination half-life is shortened', correct:false,
   why:'Half-life is set by the elimination rate constant, which describes the fraction of drug removed per unit time once the drug is in the body. A single metabolic loss at the point of entry removes a quantity of drug without changing that fraction, so the curve starts lower and falls at the same relative rate. This answer confuses how much arrives with how fast it leaves.'},
  {t:'Its route of administration becomes parenteral', correct:false,
   why:'The route is how the drug was given, which does not change because of what the liver does to it afterwards. The drug in this stem was administered orally and remains an oral administration. First-pass effect is a reason to consider a different route, not a description of one.'}],
 teach:[
 {t:'First-pass effect is the rapid metabolism of an orally administered drug before it reaches the general circulation. It is the main reason an oral dose and an intravenous dose of the same size do not produce the same systemic exposure. Bioavailability is the measure of how much of the administered dose becomes systemically available, and in this course it is quantified later as the ratio of the area under the curve after an oral dose to the area under the curve after an intravenous dose.'},
  {h:'How the variables relate', list:[
    'Elimination = excretion + biotransformation. Both remove the parent drug irreversibly.',
    'Disposition = distribution + elimination, that is, everything after absorption.',
    'First-pass metabolism lowers F, the fraction of an oral dose reaching the circulation.',
    'Subscripts name the fluid: Cp is plasma, Cs is serum, a bare C is either.']},
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
   why:'Serum is defined by the clotting step: the blood clots, the clot is taken away, and what remains contains neither the cellular elements nor fibrinogen nor the other clotting factors. That missing fraction is exactly what was consumed or trapped in forming the clot. A concentration measured in this fraction is written with a subscript s.'},
  {t:'Plasma', correct:false,
   why:'Plasma is the liquid supernatant obtained after centrifuging whole blood that was never allowed to clot, because an anticoagulant was present. It therefore still contains fibrinogen and the other clotting factors along with all the proteins including albumin. The difference between the two fractions is whether clotting was prevented or allowed to run.'},
  {t:'Whole blood', correct:false,
   why:'Whole blood is the sample as drawn by venous puncture with an anticoagulant such as heparin or EDTA, and it contains all the cellular and protein elements. Nothing has been removed from it. Choosing it means stopping at the sample rather than at the fraction the description asks for.'},
  {t:'Urine', correct:false,
   why:'Urine is not a blood component at all, and it appears as an option in this material only as a measurement site that is used less often than serum or plasma. Nothing about clotting applies to it.'}],
 teach:[
 {t:'The three blood fractions differ by what has been taken out. Whole blood keeps everything and is collected with an anticoagulant. Plasma is whole blood with the cells spun out and the anticoagulant still preventing clotting, so the clotting proteins remain. Serum is whole blood that has been allowed to clot, so both the cells and the clotting proteins are gone. Which fraction was assayed is recorded in the symbol, with Cp for plasma and Cs for serum, and a plain C when the fraction is not specified.'},
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
 {t:'A pharmacokinetic concentration is only defined once the fluid it was measured in is named. Serum and plasma are the routine fluids because stripping out the cells reduces interactions between the drug and other blood components, which makes the assay a cleaner report of what is circulating. That choice is carried through the notation for the rest of the course.'},
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
   why:'In a catenary model the compartments are linked in a chain, so drug reaches compartment three only by passing through compartment two. Dr. Mosley uses the train image directly: one car, next car, next car, and no way to the third without going through the second. The rate constants therefore run only between neighbouring compartments.'},
  {t:'Mammillary', correct:false,
   why:'A mammillary model has one central compartment with the other compartments attached directly to it, so every peripheral compartment exchanges with the centre rather than with its neighbours. This is the arrangement used most often in this course, which makes it the reflex answer. The train image fails for it because there is no order of travel.'},
  {t:'Physiologic', correct:false,
   why:'Physiologic models, also called blood flow or perfusion models, are built from known anatomic and physiologic data rather than from abstract boxes. They are not described by a chain of compartments at all. Dr. Mosley notes they require more input than this course wants to supply, which is why compartmental modelling is used instead.'},
  {t:'Catenary and mammillary are the same arrangement', correct:false,
   why:'They are the two distinct compartment arrangements presented side by side, distinguished by which compartments connect to which. Treating them as interchangeable removes the only thing the question turns on. The rate constant subscripts on the diagram show the difference: a chain in one case, a hub in the other.'}],
 teach:[
 {t:'Compartmental models treat the body as a set of boxes with rate constants between them. In a mammillary model every peripheral compartment connects to a single central compartment, which is where drug enters and is measured. In a catenary model the compartments are linked end to end, so drug must pass through each in turn. Physiologic or perfusion models are a different approach again, built on real blood flows and organ volumes.'},
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
 {t:'A model is a set of assumptions that turns a handful of measured concentrations into a continuous description. Everything listed as a use follows from that: predicting levels at unsampled times, choosing regimens, estimating accumulation, comparing formulations, correlating concentrations with pharmacologic or toxicologic activity, describing how physiology or disease alters the kinetics, and explaining drug interactions. What a model cannot supply is information of a different kind from the data it was built on.'},
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
 note:'Printed slide 9 carries only the title "Concentration versus Time Curve" and the curve itself; the minimum effective and minimum toxic concentration lines were drawn and named in the lecture, and the four options here are the options from her own poll. An exam written from these lectures would key the minimum effective concentration.',
 teach:[
 {t:'A single-dose concentration-versus-time curve rises to a peak and then falls. Two horizontal lines give that curve its clinical meaning. The minimum effective concentration is the level that must be met or exceeded for the desired response. The minimum toxic concentration is the level above which adverse effects appear. The interval between the two is where the concentration is meant to stay, and the shape of the curve decides for how long it does.'},
  {h:'How the variables relate', list:[
    'The therapeutic window lies between the minimum effective concentration and the minimum toxic concentration.',
    'Onset is when C first rises above the minimum effective concentration; duration is how long it stays above it.',
    'Intensity tracks how far C sits above the minimum effective concentration.']},
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
 note:'Printed slide 9 shows the curve with no labels; Cmax, tmax and the two threshold lines were supplied in the lecture. An exam written from these lectures would key the time of the peak.',
 teach:[
 {t:'Four landmarks describe a single-dose curve. Cmax is the highest concentration reached and tmax is the time at which it occurs. The minimum effective concentration and the minimum toxic concentration are horizontal lines that bracket the range the curve is meant to stay within. Cmax and tmax are properties of the drug and the dose; the two thresholds are properties of the drug and the patient, and what counts as toxic differs from drug to drug.'},
  {h:'How the variables relate', list:[
    'The therapeutic window lies between the minimum effective concentration and the minimum toxic concentration.',
    'Onset is when C first rises above the minimum effective concentration; duration is how long it stays above it.',
    'Intensity tracks how far C sits above the minimum effective concentration.']},
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
 {t:'ADME is the sequence used in this course: absorption, distribution, metabolism and excretion. Other courses extend it at either end, adding liberation at the front for release from the dosage form or toxicology at the end. The extensions do not change any of the four definitions; they only widen the span of the acronym.'},
  {h:'How the variables relate', list:[
    'Elimination = excretion + biotransformation. Both remove the parent drug irreversibly.',
    'Disposition = distribution + elimination, that is, everything after absorption.',
    'First-pass metabolism lowers F, the fraction of an oral dose reaching the circulation.',
    'Subscripts name the fluid: Cp is plasma, Cs is serum, a bare C is either.']},
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
   why:'The differential form is dC/dt = −k with no concentration term on the right, so the rate does not depend on how much drug is present. The same quantity leaves in each unit of time whether the concentration is high or low. Integrating that gives C = C0 − kt, which is the equation of a straight line.'},
  {t:'At a rate proportional to the amount remaining', correct:false,
   why:'That statement is the definition of a first-order reaction, where dC/dt = −kC and the concentration appears on the right-hand side. The two definitions differ by exactly that one term. Selecting this means matching on the word rate without checking what the rate is tied to.'},
  {t:'By a constant fraction of the amount remaining per unit time', correct:false,
   why:'A constant fraction per unit time is the first-order behaviour restated in words rather than symbols. For a zero-order process the fraction lost per hour grows as the concentration falls, because the quantity removed stays fixed while the amount present shrinks. Fraction and quantity are what separate the two orders.'},
  {t:'At a rate proportional to the square of the amount remaining', correct:false,
   why:'A rate proportional to concentration squared would be second order, which is two steps away from the definition asked for. The exponent on the concentration term is what names the order, and zero order means that exponent is zero, so the term disappears entirely.'}],
 teach:[
 {t:'The order of a reaction is the power to which the concentration is raised in the rate law. Zero order means the concentration appears to the power zero, so it drops out and the rate is a fixed quantity per unit time: dC/dt = −k, integrating to C = C0 − kt. The rate constant therefore carries units of concentration or amount per unit time, and a plot of concentration against time on linear axes is a straight line whose slope is the negative of the rate constant.'},
  {h:'How the variables relate', list:[
    'Rate: dC/dt = -k0, a rate that does not depend on how much drug is present.',
    'Integrated: C = C0 - k0t, a straight line on an evenly spaced concentration axis.',
    'k0 carries concentration per time, such as mg/L per hour.',
    'Half-life: t1/2 = C0/2k0, so it changes with the starting concentration.']},
  {h:'What the chapter adds', t:'Chapter 2 tabulates the units and they explain the confusion. A rate is mg/hr or mcg/mL/hr, and a zero-order rate constant k0 carries those same units. Zero order is the one order where the constant and the rate are numerically the same thing, because the rate does not depend on how much is present. That is also why a zero-order constant cannot be quoted as a plain reciprocal time.'}],
 teachImg:'slide_Introduction_p20',
 cite:'Introduction.pdf slide 17',
 quote:'Amount or concentration of drug decreases at a constant rate'},

{id:'m1-ord-c02', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'first-order-defn', skill:'recall',
 source:'slide',
 stem:'In a first-order reaction, the amount or concentration of drug decreases at a rate that is:',
 options:[
  {t:'Proportional to the amount of drug remaining', correct:true,
   why:'The differential form is dC/dt = −kC, so the rate is the rate constant multiplied by whatever concentration is present at that instant. At high concentrations the rate is fast and at low concentrations it slows, which is why the plot on linear axes is a curve rather than a line. Integrating gives ln C = ln C0 − kt, or equivalently C = C0 e^(−kt).'},
  {t:'Constant and independent of the amount of drug remaining', correct:false,
   why:'That is the zero-order definition, and it is the answer students give when they remember that something about the process is constant. What is constant in first order is the rate constant and the half-life, not the rate itself. The rate changes continuously throughout the time course.'},
  {t:'Proportional to the elapsed time', correct:false,
   why:'Nothing in either rate law makes the rate depend on how long the process has been running. Time enters only through the amount of drug that has already been lost. This answer reads the horizontal axis of the graph as a cause rather than as a coordinate.'},
  {t:'Equal to the half-life divided by the rate constant', correct:false,
   why:'That expression is not a rate at all; it has units of time squared and cannot describe how fast a concentration falls. The relationship between half-life and rate constant for a first-order process is t½ = 0.693 ÷ k, which is a division the other way round. This option assembles two familiar symbols into a quantity that has no meaning.'}],
 teach:[
 {t:'First order means the rate depends on the concentration present, so dC/dt = −kC. The rate constant is a proportion removed per unit time rather than a quantity, which makes its units reciprocal time. Because a fixed proportion is removed in each interval, the time taken to lose half of whatever is present is the same at every concentration, which is why a first-order half-life is a single number for a drug. The integrated form ln C = ln C0 − kt is what makes a plot of the natural logarithm of concentration against time a straight line.'},
  {h:'How the variables relate', list:[
    'Rate: dC/dt = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - kt/2.3.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = 0.693/k, one number for the drug. This one is not on the equation sheet.']},
  {h:'What the chapter adds', t:'Chapter 2 gives the first-order constant its own units, 1/hr, which no rate ever has. A rate is an amount per time; k is a fraction per time and only becomes a rate once it is multiplied by an amount. Comparing the two rows of that table is the quickest way to tell which quantity a number is: mg/hr is a rate, hr⁻¹ is a first-order constant, and mg/hr as a constant means the process is zero order.'}],
 teachImg:'slide_Introduction_p21',
 cite:'Introduction.pdf slide 18',
 quote:'Amount or concentration of drug decreases at a rate that is proportional to the amount of drug remaining'},

{id:'m1-ord-c03', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'first-order-properties', skill:'recall',
 source:'both',
 stem:'First-order processes are characterised by:',
 options:[
  {t:'A constant half-life', correct:true,
   why:'Half-life for a first-order process is 0.693 divided by the rate constant, and both of those are constants, so the half-life is a constant as well. It does not depend on the starting concentration. This is why a drug can be quoted as having one half-life rather than a different value for every dose.'},
  {t:'A constant rate of elimination', correct:false,
   why:'The rate of elimination is the rate constant multiplied by the concentration, so it changes continuously as the concentration falls. Only 8 per cent of the class picked this when polled, but it is the error that follows from holding the word constant and losing what it attaches to. A constant rate of elimination is the zero-order property.'},
  {t:'dC/dt = −k', correct:false,
   why:'This expression has no concentration term on the right-hand side, which is precisely what makes it the zero-order rate law. The first-order form is dC/dt = −kC. Recognising the order from the differential equation means checking whether a concentration appears beside the rate constant.'},
  {t:'Units of k of concentration or amount per unit time', correct:false,
   why:'Concentration or amount per unit time are the units of a zero-order rate constant, because a zero-order constant is itself a rate. A first-order rate constant multiplies a concentration to produce a rate, so its units are reciprocal time, written as hours to the minus one or days to the minus one. This was the most popular wrong answer in the class poll at 44 per cent.'}],
 teach:[
 {t:'Every property of a first-order process follows from the rate being proportional to the concentration. Because the proportion removed per unit time is fixed, the rate constant has units of reciprocal time and the half-life is fixed at 0.693 divided by that constant. Because the quantity removed per unit time is not fixed, the rate of elimination falls as the concentration falls. A statement that fixes a quantity rather than a proportion belongs to zero order, and that is true of both remaining options here.'},
  {h:'How the variables relate', list:[
    'Rate: dC/dt = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - kt/2.3.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = 0.693/k, one number for the drug. This one is not on the equation sheet.']},
  {h:'What the chapter adds', t:'Chapter 2 gives the first-order constant its own units, 1/hr, which no rate ever has. A rate is an amount per time; k is a fraction per time and only becomes a rate once it is multiplied by an amount. Comparing the two rows of that table is the quickest way to tell which quantity a number is: mg/hr is a rate, hr⁻¹ is a first-order constant, and mg/hr as a constant means the process is zero order.'}],
 teachImg:'slide_Introduction_p24',
 cite:'Introduction.pdf, poll slide following slide 21',
 quote:'first order processes, constant half-life, constant half-life, OK. The rate of elimination … the rate is constantly changing'},

{id:'m1-ord-c04', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'first-order-rate-depends', skill:'tell',
 source:'both',
 stem:'The rate of a first-order process is independent of the concentration of drug present. Is this true or false?',
 options:[
  {t:'False, because the rate is the rate constant multiplied by the concentration', correct:true,
   why:'The rate law dC/dt = −kC puts the concentration on the right-hand side, so the rate cannot be independent of it. At higher concentrations the rate is faster, and as the concentration falls the rate slows. What is independent of concentration is the rate constant and therefore the half-life, not the rate.'},
  {t:'True, because a first-order rate constant carries units of reciprocal time and no concentration term', correct:false,
   why:'The rate constant and the rate are two different quantities, and this answer substitutes one for the other. It is true that a first-order rate constant is a fixed number in reciprocal time with no concentration in it, but the rate is that constant multiplied by the concentration, so the rate changes with every change in concentration. The class split fifty-fifty on this statement for exactly this reason.'},
  {t:'True, because the half-life does not change', correct:false,
   why:'A constant half-life is a genuine first-order property, but it describes the time to lose a fixed proportion, not the quantity lost per unit time. Half of a large concentration is a larger quantity than half of a small one, taken over the same interval, so the rate has clearly changed. This reasons from a true statement to the wrong conclusion.'},
  {t:'False, because zero-order processes have no rate constant', correct:false,
   why:'Zero-order processes do have a rate constant; it simply carries units of concentration or amount per unit time rather than reciprocal time. The conclusion is right but the reason given for it is not, and a reason that is not true cannot support it. Dr. Mosley states plainly that neither order has a negative rate constant and both have one.'}],
 teach:[
 {t:'For a first-order process the rate and the rate constant behave differently as the concentration falls. The rate constant is fixed: it is the proportion of what is present that is removed per unit time. The rate is that constant multiplied by the current concentration, so it is largest at the start and falls continuously. For a zero-order process the situation reverses: the rate is fixed and the proportion removed per unit time grows.'},
  {h:'How the variables relate', list:[
    'Rate: dC/dt = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - kt/2.3.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = 0.693/k, one number for the drug. This one is not on the equation sheet.']},
  {h:'What the chapter adds', t:'Chapter 2 gives the first-order constant its own units, 1/hr, which no rate ever has. A rate is an amount per time; k is a fraction per time and only becomes a rate once it is multiplied by an amount. Comparing the two rows of that table is the quickest way to tell which quantity a number is: mg/hr is a rate, hr⁻¹ is a first-order constant, and mg/hr as a constant means the process is zero order.'}],
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
   why:'A zero-order process gives a straight line on linear axes, where the gridlines increase by equal additions rather than by factors of ten. Reading this plot as zero order means seeing a straight line and concluding the order without checking the scale, which is the specific error Dr. Mosley warns against. On these axes a zero-order decline would appear as a curve.'},
  {t:'A process whose rate constant changes with time', correct:false,
   why:'A straight line on either scale indicates a constant rate constant, because a changing constant would bend the line. Nothing in this course has a rate constant that varies with time. This answer treats the straightness as evidence of change rather than of constancy.'},
  {t:'Nothing, because the axis is not labelled as a logarithm', correct:false,
   why:'The absence of the word log on the axis is why the spacing has to be read instead. Dr. Mosley notes that the word will usually not be there, and that a scale increasing by a function of ten is logarithmic whatever it says. Treating an unlabelled axis as uninterpretable discards the information the spacing already gives.'}],
 teach:[
 {t:'Two plots of the same concentrations answer different questions. Linear axes show what the concentration actually is, and a zero-order decline is straight on them because C = C0 − kt. Semi-logarithmic axes compress the concentration scale so that equal factors occupy equal distances, and a first-order decline is straight on them because ln C = ln C0 − kt. Deciding which plot is in front of you comes before deciding the order, and it is settled by whether the concentration gridlines go up by equal additions or by equal multiples.'},
  {h:'How the variables relate', list:[
    'An evenly spaced concentration axis: a straight line means zero order.',
    'An axis stepping 1, 10, 100, 1000: a straight line means first order.',
    'On a base-ten decade axis the slope is -k/2.3; on a natural-log axis it is -k.',
    'Read the tick values before the line. The word "log" is usually not printed.']},
  {h:'What the chapter adds', t:'Chapter 2 says what semi-logarithmic paper is for: it places the data at logarithmic intervals so the numbers need not be converted to their logarithms before plotting. The paper performs the transformation, which is why the printed tick values step by tens while the plotted numbers stay as measured, and why the axis has to be read rather than assumed.'}],
 teachImg:'slide_Introduction_p24',
 cite:'Introduction.pdf slide 21',
 quote:'even if the scale does not say log C, if you look at that scale and you see that it is not changing by regular one infinite, or it’s increasing by a func- uh, a function of 10, then that tells you that it is a logarithmic scale'},

{id:'m1-ord-c06', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'halflife-is-a-time', skill:'recall',
 source:'both',
 stem:'A drug is eliminated by a first-order process with a rate constant of 0.231 per day. Which statement about its half-life is correct?',
 options:[
  {t:'It is 3.0 days', correct:true,
   why:'Half-life is 0.693 divided by the rate constant, so 0.693 divided by 0.231 per day gives 3.0. Dividing by a quantity in reciprocal days leaves days, so the answer is a time. Dr. Mosley states that half-life must be answered in units of time and that the reciprocal units belong to the rate constant, not to the half-life.'},
  {t:'It is 3.0 days to the minus one', correct:false,
   why:'Reciprocal days are the units of the rate constant, which is what was given, not of the half-life, which is what was asked for. Dr. Mosley names this specific error: a half-life is a time, so it is days, not days to the minus one. Carrying the reciprocal across the division is what produces it.'},
  {t:'It is 0.231 days, because the rate constant is the half-life', correct:false,
   why:'The rate constant and the half-life are two different descriptions of the same decline, linked by the factor 0.693, and they are not equal to one another. Copying the given number across skips the relation entirely. The two also have different units, which is enough on its own to rule this out.'},
  {t:'It cannot be found without the starting concentration', correct:false,
   why:'For a first-order process the half-life is 0.693 divided by the rate constant and the starting concentration does not appear, which is why the half-life is constant. It is for a zero-order process that the starting concentration is needed, since there t½ = C0 ÷ 2k. Asking for the starting concentration means applying the zero-order relation to a first-order problem.'}],
 note:'The transcript of 19 August renders her definition of half-life as "decrease by 15"; the printed slide reads "decrease by one-half", and her worked examples immediately after are all at 50 per cent. An exam written from these lectures would key one-half. The first-order half-life relation is also not printed on BasicPharmacokineticsEquations.pdf, which is why she says it has to be held without the sheet.',
 teach:[
 {t:'Half-life is the time required for the amount or concentration of a drug to decrease by one-half. The word that decides its units is time. For a first-order process it is 0.693 divided by the rate constant, and because both of those are constants the half-life is constant and does not depend on where the concentration started. For a zero-order process it is the starting concentration divided by twice the rate constant, so it changes whenever the starting concentration changes.'},
  {h:'How the variables relate', list:[
    'First order: t1/2 = 0.693/k, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = ln(1000)/k.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'What the chapter adds', t:'Chapter 12 tabulates the percentages rather than leaving them to be derived: 50, 75, 87.5, 93.75, 96.88 and 98.44 per cent eliminated after one to six half-lives, reaching 99.90 per cent at ten. It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain, and notes that the same count governs the time to reach steady state.'}],
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
   why:'From 20 to 40 minutes the amount falls from 89.0 to 73.0 mg, a loss of 16.0 mg in 20 minutes, and from 40 to 60 minutes it falls from 73.0 to 57.0 mg, again 16.0 mg in 20 minutes. Equal quantities lost in equal intervals is the zero-order signature. The differences between successive amounts, not their ratios, are what stay constant.'},
  {t:'First order, because the amount falls continuously', correct:false,
   why:'Every decomposition falls continuously whatever its order, so continuity separates nothing. The first-order test is whether the ratio of successive amounts is constant over equal intervals, and here 89.0 divided by 73.0 is 1.22 while 73.0 divided by 57.0 is 1.28 and 57.0 divided by 34.0 is 1.68. Those ratios climb, so the process is not first order.'},
  {t:'First order, because the amount is measured in milligrams', correct:false,
   why:'Whether the dependent variable is an amount or a concentration has no bearing on the order; both orders are defined for either. Dr. Mosley writes the definitions as amount or concentration precisely so that this choice of variable does not decide anything. Here the variable is an amount and the process is zero order.'},
  {t:'Neither, because the intervals between time points are unequal', correct:false,
   why:'Unequal spacing makes the arithmetic slightly more work but does not prevent classification; the difference or the ratio is taken over whatever interval separates the two points chosen. Picking two points 20 minutes apart twice, as above, settles the question immediately. Discarding a data set for uneven spacing throws away a solvable problem.'}],
 teach:[
 {t:'Deciding the order from a data set is a test of what stays constant between successive points. Take two points separated by a known interval and find the difference in amount and the ratio of amounts. Repeat over a second interval of the same length. If the differences match, the process is zero order and a plot on linear axes is a straight line. If the ratios match, the process is first order and a plot of the natural logarithm of amount against time is a straight line. Dr. Mosley has stated that a data set will be supplied on the exam and the order will have to be decided from it.'},
  {h:'How the variables relate', list:[
    'Equal amount lost per equal time interval means zero order: C = C0 - k0t.',
    'Equal fraction lost per equal time interval means first order: C = C0e^(-kt).',
    'Test a data set by taking successive ratios and successive differences: whichever is constant names the order.',
    'From two points, first order gives k = ln(C1/C2)/(t2 - t1); zero order gives k0 = (C1 - C2)/(t2 - t1).']},
  {h:'What the chapter adds', t:'Chapter 2 makes the units the first test. A constant reported in mg/hr or mcg/mL/hr belongs to a zero-order process, and one reported in hr⁻¹ to a first-order process. Where a data set is given instead of a constant, the same split shows up as a constant difference between concentrations for zero order and a constant ratio for first order.'}],
 teachImg:'slide_Introduction_p20',
 cite:'IntroductionandMathReview3Solutions.pdf, problem 1a; Introduction.pdf slide 17',
 quote:'Zero-order — the drug is decreasing at a constant amount per unit time'},

{id:'m1-ord-c08', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'decide', concept:'order-from-data', dupOf:'m1-ord-c07', skill:'order',
 source:'slide',
 stem:'A pharmacist dissolved an antibiotic in purified water and measured the drug concentration in aliquots removed over 16 hours.\n\nTime (hr) | C (mcg/mL) | ln C\n0.5 | 233.3 | 5.4523\n1.0 | 217.6 | 5.3827\n2.0 | 189.5 | 5.2444\n4.0 | 143.6 | 4.9670\n8.0 | 82.5 | 4.4128\n12.0 | 47.4 | 3.8586\n16.0 | 27.2 | 3.3032\n\nIs the decomposition of this antibiotic a zero-order or a first-order process?',
 options:[
  {t:'First order, because ln C against time is a straight line', correct:true,
   why:'Between 4 and 8 hours the natural logarithm falls from 4.9670 to 4.4128, a drop of 0.5542 over 4 hours, and between 8 and 12 hours it falls from 4.4128 to 3.8586, a drop of 0.5542 over 4 hours again. A constant drop in the logarithm over equal intervals is a straight line on logarithmic axes, which is the first-order signature. The concentrations themselves fall by 61.1 and then by 35.1 mcg/mL over the same two intervals, so they are not linear.'},
  {t:'Zero order, because the concentration falls throughout', correct:false,
   why:'A concentration that falls throughout is consistent with either order, so the direction of travel decides nothing. The zero-order test is whether the concentration itself falls by equal quantities over equal intervals, and here it does not: 61.1 mcg/mL is lost between 4 and 8 hours but only 35.1 mcg/mL between 8 and 12 hours. The losses shrink as the concentration shrinks, which is first-order behaviour.'},
  {t:'Zero order, because the time points are unevenly spaced', correct:false,
   why:'Spacing of the sampling times is a feature of the experiment rather than of the kinetics, and either order can be sampled at any times. Choosing pairs that are equally separated, such as 4 to 8 hours and 8 to 12 hours, removes the difficulty entirely. Nothing about uneven spacing points towards one order or the other.'},
  {t:'First order, because the drug was dissolved in water rather than given to a patient', correct:false,
   why:'The medium tells you nothing about the order; these decomposition problems are set in solution precisely so that the order has to come from the numbers. Dr. Mosley reserves the assumption of first order for a stated intravenous bolus dose, and states that where a data set is supplied the order must be determined from the data. The conclusion is right but the reasoning would fail on a zero-order data set in the same medium.'}],
 teach:[
 {t:'When a table supplies a column of natural logarithms, that column is the test. If the logarithm falls by the same amount over equal time intervals, the process is first order, because ln C = ln C0 − kt makes the logarithm linear in time. If instead the concentrations themselves fall by the same amount over equal intervals, the process is zero order, because C = C0 − kt makes the concentration linear in time. Working with whichever column is linear then gives the rate constant directly from its slope.'},
  {h:'How the variables relate', list:[
    'Equal amount lost per equal time interval means zero order: C = C0 - k0t.',
    'Equal fraction lost per equal time interval means first order: C = C0e^(-kt).',
    'Test a data set by taking successive ratios and successive differences: whichever is constant names the order.',
    'From two points, first order gives k = ln(C1/C2)/(t2 - t1); zero order gives k0 = (C1 - C2)/(t2 - t1).']},
  {h:'What the chapter adds', t:'Chapter 2 makes the units the first test. A constant reported in mg/hr or mcg/mL/hr belongs to a zero-order process, and one reported in hr⁻¹ to a first-order process. Where a data set is given instead of a constant, the same split shows up as a constant difference between concentrations for zero order and a constant ratio for first order.'}],
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
   why:'The order has to be settled before a rate constant can be defined, because the two orders give rate constants with different units and different equations. The test is a constant ratio per unit time, which means the spans compared must be equal: a ratio measured across 6 hours and a ratio measured across 12 hours are not expected to match, and setting them side by side would show nothing either way. Two consecutive 12-hour spans that both give 2.83 are the first-order condition.'},
  {k:'setup', t:'For a first-order process, ln C = ln C0 − kt, so k = ln(C₁ ÷ C₂) ÷ (t₂ − t₁).',
   why:'Rearranging the integrated first-order equation for two measured points removes the unknown starting concentration, because ln C0 cancels when the two equations are subtracted. That leaves the rate constant expressed entirely in terms of quantities on the table. Dr. Mosley writes this difference of logarithms as the logarithm of the ratio.'},
  {k:'algebra', t:'Using t₁ = 6 hr with C₁ = 208.1 mg/L and t₂ = 24 hr with C₂ = 43.8 mg/L: Δt = 18 hr, and k = ln(208.1 ÷ 43.8) ÷ 18 hr = 1.55838 ÷ 18 hr.',
   why:'These are the two points Dr. Mosley selects in her own key, and the pair is a good choice because the 18-hour separation spans most of the decline and reduces the effect of measurement scatter. The concentration units cancel inside the logarithm, leaving a pure number divided by hours. That division is what produces reciprocal hours.'},
  {k:'round', t:'k = 0.08658 hr⁻¹, reported as 0.0866 hr⁻¹.',
   why:'Dividing a dimensionless logarithm by a time gives reciprocal time, which is the unit a first-order rate constant must carry. Dr. Mosley reports rate constants to four decimal places throughout this course, and her key for this problem prints 0.0866 per hour. A leading decimal with no digit before it loses half the marks on her paper.'}],
 teach:[
 {t:'A first-order rate constant taken from a table is the slope of the natural logarithm of concentration against time, with the sign reversed. Working from two points rather than a full regression gives the same quantity because the relation is exactly linear, and subtracting the two integrated equations eliminates the starting concentration. Different pairs of points from the same clean data set give the same constant to the precision the data support, so the choice of pair is a matter of spanning a useful interval rather than of getting a different answer.'},
  {h:'How the variables relate', list:[
    'Equal amount lost per equal time interval means zero order: C = C0 - k0t.',
    'Equal fraction lost per equal time interval means first order: C = C0e^(-kt).',
    'Test a data set by taking successive ratios and successive differences: whichever is constant names the order.',
    'From two points, first order gives k = ln(C1/C2)/(t2 - t1); zero order gives k0 = (C1 - C2)/(t2 - t1).']},
  {h:'What the chapter adds', t:'Chapter 2 makes the units the first test. A constant reported in mg/hr or mcg/mL/hr belongs to a zero-order process, and one reported in hr⁻¹ to a first-order process. Where a data set is given instead of a constant, the same split shows up as a constant difference between concentrations for zero order and a constant ratio for first order.'}],
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
   why:'The integrated first-order equation runs forward from the start of the process, and the unknown here is at the start rather than at the end, so it is rearranged to move backwards. Multiplying both sides by e^(+kt) isolates C0. Dr. Mosley warns that keeping the minus sign in the exponent at this step returns a number smaller than the measured concentration, which cannot be a starting value.'},
  {k:'algebra', t:'kt = 0.0866 hr⁻¹ × 12 hr = 1.0392, which is dimensionless.',
   why:'Reciprocal hours multiplied by hours cancel, which they must, because an exponent has to be a pure number. Checking that cancellation is the quickest guard against having mixed a rate constant in reciprocal hours with a time in days or minutes. The product itself has no units.'},
  {k:'algebra', t:'C0 = 123.8 mg/L × e^1.0392 = 349.98 mg/L.',
   why:'The exponential factor e^1.0392 is 2.8270, which is greater than one because the exponent is positive, so the answer is larger than the measured concentration, as it must be for a concentration that has been falling for 12 hours. Milligrams per litre multiplied by a pure number stay milligrams per litre.'},
  {k:'round', t:'C0 = 350 mg/L.',
   why:'Dr. Mosley reports this value as 350 mg/L, to three significant figures, which matches the precision of the tabulated concentrations. The computed 349.98 rounds to that value without any further adjustment.'}],
 teach:[
 {t:'Back-extrapolation recovers the concentration at time zero from a measurement made later, and it is the same integrated equation used with the sign of the exponent reversed. The sign is the whole of the difficulty: a positive exponent moves back towards the start and must give a larger number, a negative exponent moves forward and must give a smaller one. Checking the direction of the answer against the direction of the question catches the error before the arithmetic is trusted.'},
  {h:'How the variables relate', list:[
    'Rate: dC/dt = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - kt/2.3.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = 0.693/k, one number for the drug. This one is not on the equation sheet.']},
  {h:'What the chapter adds', t:'Chapter 2 gives the first-order constant its own units, 1/hr, which no rate ever has. A rate is an amount per time; k is a fraction per time and only becomes a rate once it is multiplied by an amount. Comparing the two rows of that table is the quickest way to tell which quantity a number is: mg/hr is a rate, hr⁻¹ is a first-order constant, and mg/hr as a constant means the process is zero order.'}],
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
   why:'Dr. Mosley reports this as 8 hours, to the whole hour, which is as far as a four-figure rate constant justifies. The answer is a time and carries no reciprocal unit; hours to the minus one belongs to the rate constant that was given, not to the half-life that was asked for.'}],
 teach:[
 {t:'Half-life and rate constant are two ways of stating the same first-order decline, joined by the natural logarithm of two. Either can be quoted and converting between them is one division. Because the relation contains no concentration term, the half-life is a single number for the process and does not change as the solution decomposes, which is what allows a drug to be described by one half-life across all its doses.'},
  {h:'How the variables relate', list:[
    'First order: t1/2 = 0.693/k, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = ln(1000)/k.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'What the chapter adds', t:'Chapter 12 tabulates the percentages rather than leaving them to be derived: 50, 75, 87.5, 93.75, 96.88 and 98.44 per cent eliminated after one to six half-lives, reaching 99.90 per cent at ten. It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain, and notes that the same count governs the time to reach steady state.'}],
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
   why:'The stem states how much has gone and the equation is written in terms of how much remains, so the percentage has to be turned round before it is used. Reading 90 per cent straight into the equation as the remaining fraction is the commonest error on this style of question and gives an answer roughly a quarter as large.'},
  {k:'setup', t:'0.1 C0 = C0 e^(−kt), so t = ln(1 ÷ 0.1) ÷ k.',
   why:'The starting concentration cancels from both sides, which is why no concentration value is needed to answer a percentage question for a first-order process. Rearranging for time puts the logarithm of the reciprocal fraction over the rate constant.'},
  {k:'algebra', t:'t = ln(10) ÷ 0.0866 hr⁻¹ = 2.302585 ÷ 0.0866 hr⁻¹.',
   why:'The logarithm of ten is a pure number, and dividing it by a quantity in reciprocal hours leaves hours. The fraction remaining is not a clean power of one half here, so half-life counting will not reach the answer exactly and the logarithmic route is needed.'},
  {k:'round', t:'t = 26.589 hr, reported as 26.6 hr.',
   why:'Dr. Mosley reports this to one decimal place, as 26.6 hours. As a check, 90 per cent decomposition is a little more than three half-lives, which for an 8-hour half-life would be 24 hours, and the answer sits just above that.'}],
 teach:[
 {t:'Percentage questions for a first-order process never need a concentration, because the starting value cancels. Convert the stated percentage into the fraction remaining, take the natural logarithm of its reciprocal, and divide by the rate constant. Where the fraction remaining is a power of one half, counting half-lives gives the same answer more quickly, and Dr. Mosley prints both routes when both are available.'},
  {h:'How the variables relate', list:[
    'Rate: dC/dt = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - kt/2.3.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = 0.693/k, one number for the drug. This one is not on the equation sheet.']},
  {h:'What the chapter adds', t:'Chapter 2 gives the first-order constant its own units, 1/hr, which no rate ever has. A rate is an amount per time; k is a fraction per time and only becomes a rate once it is multiplied by an amount. Comparing the two rows of that table is the quickest way to tell which quantity a number is: mg/hr is a rate, hr⁻¹ is a first-order constant, and mg/hr as a constant means the process is zero order.'}],
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
 {t:'A zero-order rate constant is a rate, so it carries units of concentration or amount per unit time and it is found from the slope of a plot of concentration against time on linear axes. That makes it arithmetically simpler than its first-order counterpart, since no logarithm is involved. It also means the same stem can be set twice with different numbers, once giving a zero-order data set and once a first-order one, and only the arithmetic on the points tells them apart.'},
  {h:'How the variables relate', list:[
    'Equal amount lost per equal time interval means zero order: C = C0 - k0t.',
    'Equal fraction lost per equal time interval means first order: C = C0e^(-kt).',
    'Test a data set by taking successive ratios and successive differences: whichever is constant names the order.',
    'From two points, first order gives k = ln(C1/C2)/(t2 - t1); zero order gives k0 = (C1 - C2)/(t2 - t1).']},
  {h:'What the chapter adds', t:'Chapter 2 makes the units the first test. A constant reported in mg/hr or mcg/mL/hr belongs to a zero-order process, and one reported in hr⁻¹ to a first-order process. Where a data set is given instead of a constant, the same split shows up as a constant difference between concentrations for zero order and a constant ratio for first order.'}],
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
 {t:'The two half-life relations look similar and behave differently. The first-order half-life, 0.693 divided by the rate constant, contains no concentration, so it is constant. The zero-order half-life, the starting concentration divided by twice the rate constant, is proportional to the starting concentration, so doubling the initial concentration doubles it. Deciding the order therefore has to come before either relation is used, and using the wrong one is not a small error but a different functional dependence.'},
  {h:'How the variables relate', list:[
    'First order: t1/2 = 0.693/k, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = ln(1000)/k.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'What the chapter adds', t:'Chapter 12 tabulates the percentages rather than leaving them to be derived: 50, 75, 87.5, 93.75, 96.88 and 98.44 per cent eliminated after one to six half-lives, reaching 99.90 per cent at ten. It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain, and notes that the same count governs the time to reach steady state.'}],
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
   why:'Half of the starting amount has to be removed, and the rate constant states how much is removed per minute, so the time is the quantity to remove divided by the rate. Writing it as A0 over twice the rate constant is the form printed on the slide.'},
  {k:'algebra', t:'t½ = 105 mg ÷ [2 × 0.8 mg/min] = 105 ÷ 1.6 = 65.625 min.',
   why:'Milligrams divided by milligrams per minute leaves minutes, so the result is a time in the same time unit the rate constant was quoted in. Half of the 105 mg starting amount is 52.5 mg, and at 0.8 mg per minute that removal takes 65.625 minutes, which is what dividing by twice the rate constant computes in a single move.'},
  {k:'round', t:'t½ = 65.6 min.',
   why:'Dr. Mosley reports this half-life to one decimal place, as 65.6 minutes, which is as far as a rate constant quoted to one decimal place will justify. The answer is a time and carries no reciprocal unit; per minute belongs to the rate constant that was given, not to the half-life that was asked for.'}],
 teach:[
 {t:'A zero-order half-life is computed in two stages because it needs a starting value that the table usually does not contain. First recover the starting amount or concentration by adding back what has already been lost, which is the rate constant multiplied by the elapsed time. Then divide half of that starting value by the rate constant. Both stages use the same linear relation, and neither involves a logarithm.'},
  {h:'How the variables relate', list:[
    'First order: t1/2 = 0.693/k, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = ln(1000)/k.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'What the chapter adds', t:'Chapter 12 tabulates the percentages rather than leaving them to be derived: 50, 75, 87.5, 93.75, 96.88 and 98.44 per cent eliminated after one to six half-lives, reaching 99.90 per cent at ten. It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain, and notes that the same count governs the time to reach steady state.'}],
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
 {t:'When a table already carries a column of natural logarithms, a first-order rate constant is a subtraction and a division with no exponentials at all. The difference between two logarithms over the time that separates them is the slope of the straight line, and the rate constant is that slope with its sign reversed. Where the logarithms are not supplied, the same calculation is written as the logarithm of the ratio of the two concentrations, which is the form Dr. Mosley prefers.'},
  {h:'How the variables relate', list:[
    'Rate: dC/dt = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - kt/2.3.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = 0.693/k, one number for the drug. This one is not on the equation sheet.']},
  {h:'What the chapter adds', t:'Chapter 2 gives the first-order constant its own units, 1/hr, which no rate ever has. A rate is an amount per time; k is a fraction per time and only becomes a rate once it is multiplied by an amount. Comparing the two rows of that table is the quickest way to tell which quantity a number is: mg/hr is a rate, hr⁻¹ is a first-order constant, and mg/hr as a constant means the process is zero order.'}],
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
   why:'The volume follows from the amount dissolved divided by the concentration that amount produced, and that concentration is the one at the moment of dissolution, before any decomposition. The measured value is one hour old, so it has to be extrapolated back. Adding kt to the logarithm is the same operation as multiplying the concentration by e^(+kt).'},
  {k:'algebra', t:'ln C0 = 5.3827 + (0.13863 hr⁻¹ × 1.0 hr) = 5.3827 + 0.1386 = 5.5213, so C0 = e^5.5213 = 250.0 mcg/mL.',
   why:'Reciprocal hours multiplied by hours cancel, leaving a pure number that can be added to a logarithm. Taking the exponential returns the concentration in the units the table used. The result is larger than the one-hour value, which is the direction a back-extrapolation must move.'},
  {k:'setup', t:'Volume = amount dissolved ÷ initial concentration.',
   why:'A concentration is an amount per unit volume, so rearranging it for volume puts the amount on top. The whole 200 mg was dissolved and none had decomposed at time zero, so the amount to use is the full dose.'},
  {k:'round', t:'V = 200,000 mcg ÷ 250.0 mcg/mL = 800 mL.',
   why:'Micrograms divided by micrograms per millilitre leaves millilitres, and the microgram units cancel only because the dose was converted from 200 mg first. Her key prints 800 mL, which is exact at the precision of the data.'}],
 teach:[
 {t:'Backing out a preparation volume joins two separate ideas. The kinetics supply the concentration at time zero, which no sample measured directly, and the definition of concentration turns that into a volume. The same two-stage structure appears throughout the course whenever a volume of distribution is found from a dose and an extrapolated concentration. Getting the units to agree before dividing is where the work is, since the dose is quoted in milligrams and the concentration in micrograms per millilitre.'},
  {h:'How the variables relate', list:[
    'Rate: dC/dt = -kC, proportional to what remains.',
    'Integrated: C = C0e^(-kt); ln C = ln C0 - kt; log C = log C0 - kt/2.3.',
    'k carries reciprocal time, such as hr^-1, and is never negative.',
    'Half-life: t1/2 = 0.693/k, one number for the drug. This one is not on the equation sheet.']},
  {h:'What the chapter adds', t:'Chapter 2 gives the first-order constant its own units, 1/hr, which no rate ever has. A rate is an amount per time; k is a fraction per time and only becomes a rate once it is multiplied by an amount. Comparing the two rows of that table is the quickest way to tell which quantity a number is: mg/hr is a rate, hr⁻¹ is a first-order constant, and mg/hr as a constant means the process is zero order.'}],
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
   why:'The order is stated in the stem, so the linear relation applies rather than the exponential one, and the two supplied points are all a straight line needs. The volume is what the question wants, and it is recoverable because the whole 300 mg was dissolved into it, so the dose and the concentration at the moment of dissolution together fix it.'},
  {k:'algebra', t:'k = −(C₂ − C₁) ÷ (t₂ − t₁) = −(0.30 − 0.45) mg/mL ÷ (2.0 − 0.5) hr = 0.15 ÷ 1.5 = 0.1 (mg/mL)/hr.',
   why:'The order is stated in the stem, so the linear relation applies and the rate constant is the slope with the sign reversed. Milligrams per millilitre divided by hours gives milligrams per millilitre per hour. Only two points are supplied, which is all a straight line needs.'},
  {k:'algebra', t:'A0 = C + kt = 0.30 mg/mL + (0.1 (mg/mL)/hr × 2.0 hr) = 0.30 + 0.20 = 0.5 mg/mL.',
   why:'The concentration at the moment of dissolution is the two-hour value plus everything lost in those two hours, and for a zero-order process that loss is the rate constant multiplied by the time. Either measured point gives the same starting value; using the 0.5-hour point gives 0.45 plus 0.05, which is also 0.5 mg/mL.'},
  {k:'algebra', t:'V = 300 mg ÷ 0.5 mg/mL = 600 mL.',
   why:'Milligrams divided by milligrams per millilitre leaves millilitres, and no unit conversion was needed because the dose and the concentration were both quoted in milligrams. The volume is larger than 300 mL because the starting concentration is below 1 mg per millilitre.'},
  {k:'round', t:'V = 600 mL.',
   why:'Her key prints 600 mL with no rounding shown, because every number in the chain divides exactly and no logarithm or exponential was evaluated anywhere in it. Millilitres are the unit the 1.0 mL assay samples were quoted in, so the answer is reported in the same measure.'}],
 teach:[
 {t:'This is the same two-stage calculation as the first-order version with one substitution: the starting concentration is recovered by adding back a fixed quantity rather than by multiplying by an exponential factor. Deciding which of the two recoveries applies is the only place the order enters, and the stem states it here rather than leaving it to be inferred. The final division is the definition of concentration rearranged for volume in both cases.'},
  {h:'How the variables relate', list:[
    'Rate: dC/dt = -k0, a rate that does not depend on how much drug is present.',
    'Integrated: C = C0 - k0t, a straight line on an evenly spaced concentration axis.',
    'k0 carries concentration per time, such as mg/L per hour.',
    'Half-life: t1/2 = C0/2k0, so it changes with the starting concentration.']},
  {h:'What the chapter adds', t:'Chapter 2 tabulates the units and they explain the confusion. A rate is mg/hr or mcg/mL/hr, and a zero-order rate constant k0 carries those same units. Zero order is the one order where the constant and the rate are numerically the same thing, because the rate does not depend on how much is present. That is also why a zero-order constant cannot be quoted as a plain reciprocal time.'}],
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
 {t:'Where the fraction remaining is a power of one half, counting half-lives answers the question without any logarithm. Fifty per cent decomposed is one half-life, 75 per cent is two, 87.5 per cent is three, and the pattern continues to 99.9 per cent at ten. The same count works for amounts, concentrations and percentages alike, because for a first-order process all three fall by the same factor in the same time. Where the fraction is not a power of one half, the logarithmic route is needed instead.'},
  {h:'How the variables relate', list:[
    'First order: t1/2 = 0.693/k, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = ln(1000)/k.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'What the chapter adds', t:'Chapter 12 tabulates the percentages rather than leaving them to be derived: 50, 75, 87.5, 93.75, 96.88 and 98.44 per cent eliminated after one to six half-lives, reaching 99.90 per cent at ten. It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain, and notes that the same count governs the time to reach steady state.'}],
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
   why:'A pure number divided by days gives reciprocal days. She corrects herself aloud on the time unit while working this problem, having first said per hour, and the elapsed time of 30 days fixes it as per day.'},
  {k:'setup', t:'t½ = 0.693 ÷ k.',
   why:'The question asks when the concentration reaches one half of its original value, which is the definition of the half-life. Dr. Mosley notes that the wording, declines to one-half, is what identifies a half-life question.'},
  {k:'algebra', t:'t½ = 0.693 ÷ 0.04406 day⁻¹ = 15.73 days.',
   why:'Dividing a dimensionless logarithm by a quantity in reciprocal days leaves days, so the result is a time and carries no reciprocal unit. As a check on direction, the concentration has already fallen well past half of 300 by day 30, so a half-life shorter than 30 days is what the data demand.'},
  {k:'round', t:'t½ = 15.7 days.',
   why:'Her worked answer prints 15.7 days, to one decimal place, which matches the precision of a rate constant she reports as 0.044 per day. Carrying the unrounded rate constant instead gives 15.73 days, a difference far too small to change any conclusion drawn from it.'}],
 note:'The transcript of the exam review renders the rate constant once as "0.044 per hour" and once as "0.0044"; the elapsed time of 30 days and her own printed half-life of 15.7 days are both consistent only with 0.044 per day. An exam written from these lectures would key 15.7 days.',
 teach:[
 {t:'This stem is one Dr. Mosley reuses, always with two parts that work the same two concentrations first as a first-order process and then as a zero-order one. The first-order half-life comes from the rate constant alone and is independent of where the concentration started. Because the question asks when the concentration declines to one half of the original, and the original concentration is the one at time zero, the half-life answers it directly with no further step.'},
  {h:'How the variables relate', list:[
    'First order: t1/2 = 0.693/k, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = ln(1000)/k.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'What the chapter adds', t:'Chapter 12 tabulates the percentages rather than leaving them to be derived: 50, 75, 87.5, 93.75, 96.88 and 98.44 per cent eliminated after one to six half-lives, reaching 99.90 per cent at ten. It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain, and notes that the same count governs the time to reach steady state.'}],
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
 note:'Her handwriting on the RecapExam1 slide records 20.463 days, which follows from the rounded rate constant of 7.33; she says 20.45 days aloud in the exam review, which follows from the unrounded 7.3333. The printed slide gives no answer. Both readings are within the tolerance set here, and an exam written from these lectures would accept either.',
 teach:[
 {t:'The paired stem works the same two measurements under both assumptions so that the two half-life relations can be compared side by side. The zero-order answer is the larger of the two here, and it would change if the starting concentration changed, whereas the first-order answer would not. Nothing in the data itself selects an order in this problem, because two points lie on both a straight line and an exponential; the stem states which assumption to make.'},
  {h:'How the variables relate', list:[
    'First order: t1/2 = 0.693/k, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = ln(1000)/k.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'What the chapter adds', t:'Chapter 12 tabulates the percentages rather than leaving them to be derived: 50, 75, 87.5, 93.75, 96.88 and 98.44 per cent eliminated after one to six half-lives, reaching 99.90 per cent at ten. It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain, and notes that the same count governs the time to reach steady state.'}],
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
 {t:'Ten half-lives is the standard count for practical completion of a first-order process, and it can be reached two ways. The logarithmic route gives 9.97 half-lives, and the halving table reaches 99.9 per cent decomposed at the tenth step. Dr. Mosley prints both, which is her habit whenever two independent routes to the same answer exist. The count is independent of the starting concentration, so the same ten half-lives applies to any dose.'},
  {h:'How the variables relate', list:[
    'First order: t1/2 = 0.693/k, where 0.693 is ln 2. Not on the equation sheet.',
    'Zero order: t1/2 = C0/2k0, which depends on where the concentration started.',
    'Fraction remaining after n half-lives = (1/2)^n: 50%, 25%, 12.5%, 6.25%.',
    '99.9% is gone after 10 half-lives; the long route is t = ln(1000)/k.',
    'A half-life is reported in units of time, never in reciprocal time.']},
  {h:'What the chapter adds', t:'Chapter 12 tabulates the percentages rather than leaving them to be derived: 50, 75, 87.5, 93.75, 96.88 and 98.44 per cent eliminated after one to six half-lives, reaching 99.90 per cent at ten. It draws the practical line at five to seven half-lives, where less than 5 and less than 1 per cent remain, and notes that the same count governs the time to reach steady state.'}],
 teachImg:'slide_Introduction_p22',
 cite:'IntroductionandMathReview2Solutions.pdf, problem 1; Introduction.pdf slide 19'},

/* ══════════════════ AUC ═══════════════════════════════════════════════ */

{id:'m1-auc-c01', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'auc', sub:'concept', concept:'auc-meaning', skill:'recall',
 source:'both',
 stem:'What does the area under the plasma concentration-versus-time curve tell you about a drug?',
 options:[
  {t:'The extent of drug available for the body to use', correct:true,
   why:'Area under the curve combines how high the concentration went with how long it stayed there, so it measures total exposure rather than any single moment of it. Dr. Mosley states it in exactly these terms on 19 August and again in the Exam 1 review. It is used to determine the extent of drug absorption or the effectiveness of a given drug after administration by a particular route.'},
  {t:'The rate at which the drug is absorbed from the dosage form', correct:false,
   why:'Rate of absorption is read from how quickly the curve rises and from the time of the peak, not from the area beneath it. Two formulations can produce the same area while reaching their peaks at different times. Area is an extent measure; rate is a shape measure.'},
  {t:'The half-life of the drug', correct:false,
   why:'Half-life comes from the slope of the declining portion of the curve on semi-logarithmic axes, which is a separate reading from the area. A drug with a long half-life will usually have a large area, but the two are not the same quantity and neither can be computed from the other alone. This answer substitutes a related property for the one asked about.'},
  {t:'The minimum toxic concentration of the drug', correct:false,
   why:'The minimum toxic concentration is a threshold level fixed by the drug and the patient, drawn as a horizontal line across the curve, and it does not come from the area. An area is a total, not a level. Nothing about integrating the curve produces a safety limit.'}],
 teach:[
 {t:'Area under the curve measures total exposure: the concentration integrated over time. That makes it the quantity for comparing how much drug the body actually received by two different routes or from two different formulations. Dividing the area after an oral dose by the area after an intravenous dose gives the bioavailability factor F, the fraction of the oral dose that enters the plasma. The total area is the sum of the areas of the individual segments the curve is broken into.'},
  {h:'How the variables relate', list:[
    'AUC measures the extent of drug available to the body.',
    'Its units are concentration multiplied by time, such as mg/L x hr or mcg/mL x hr.',
    'Clearance ties dose to exposure: Cl = D0/AUC.']},
  {h:'What the chapter adds', t:'Chapter 2 treats the area as a measure of the amount of drug the body has been exposed to, and notes that the trapezoidal estimate does not depend on the shape of the concentration-time curve. The method makes no assumption about the order of the process, which is why the same arithmetic serves a zero-order and a first-order curve alike.'}],
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
 {t:'The trapezoidal rule estimates the area beneath a set of measured points by joining neighbouring points with straight lines and adding the areas of the resulting trapezia. Each segment is the average of its two concentrations multiplied by the time between them. Because the true curve between two points is usually concave rather than straight, the estimate is approximate, and it improves as the sampling times get closer together. The unit of the result is always concentration multiplied by time.'},
  {h:'How the variables relate', list:[
    'One trapezoid = (1/2)(C1 + C2)(t2 - t1), which is one half base times height.',
    'Total AUC is the sum of the segments, so unequal time intervals are handled one segment at a time.',
    'The width of a segment is the time interval, not the number of samples.']},
  {h:'What the chapter adds', t:'Chapter 2 states the assumption the method rests on: a straight line between consecutive points. Accuracy therefore follows the spacing, since widely spaced points let the real curvature depart from the chord and inflate the error, and the estimate improves as points are added. That is the reason a segment is taken between neighbouring samples rather than across a long gap.'}],
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
 {t:'Nothing in the trapezoidal rule requires evenly spaced samples; each segment simply uses the interval between its own two points. That makes the rule usable on any sampling schedule, which matters because pharmacokinetic sampling is usually dense early and sparse late. Assuming a uniform width is the error that unevenly spaced tables are set to catch, and it changes the answer by whatever the mismatched intervals amount to.'},
  {h:'How the variables relate', list:[
    'One trapezoid = (1/2)(C1 + C2)(t2 - t1), which is one half base times height.',
    'Total AUC is the sum of the segments, so unequal time intervals are handled one segment at a time.',
    'The width of a segment is the time interval, not the number of samples.']},
  {h:'What the chapter adds', t:'Chapter 2 states the assumption the method rests on: a straight line between consecutive points. Accuracy therefore follows the spacing, since widely spaced points let the real curvature depart from the chord and inflate the error, and the estimate improves as points are added. That is the reason a segment is taken between neighbouring samples rather than across a long gap.'}],
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
 {t:'Recovering the intercept from a later sample is the same move in both orders, and only the arithmetic differs. A zero-order process adds back a fixed amount per hour, so the correction is additive; a first-order process kept a fixed fraction per hour, so its correction multiplies. Getting the order wrong here would give 338 multiplied by e^(6 × 2), which is not a concentration any solution could hold.'},
  {h:'How the variables relate', list:[
    'Zero order: C = C0 - k0t, so C0 = C + k0t, with the correction added.',
    'First order: C = C0e^(-kt), so C0 = Ce^(+kt), with the correction multiplied.',
    'A zero-order rate constant carries concentration per time; a first-order one carries reciprocal time.',
    'C0 matters here because the zero-order half-life, C0/2k0, depends on it.',
    'Any point on a zero-order line recovers the same intercept when its own t is used.']}],
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
  {k:'setup', t:'C = C0 − kt, so t = (C0 − C) / k',
   why:'Rearranging the zero-order line puts the time on its own. The numerator is the amount of concentration that has to disappear and the denominator is how much disappears each hour, so the quotient is a number of hours.'},
  {k:'algebra', t:'t = (350 − 35) mg/mL ÷ (6 (mg/mL)/hr) = 315 ÷ 6 = 52.5 hr',
   why:'Milligrams per millilitre divided by milligrams per millilitre per hour leaves hours. The 315 is what must be lost, and at 6 per hour that takes 52.5 hours.'},
  {k:'round', t:'t = 52.5 hr',
   why:'Her key prints 52.5 hr, to one decimal place. As a check, the table for this solution reads 62 mg/mL at 48 hours, so 35 mg/mL is reached a few hours after the last sample, which brackets the answer.'}],
 teach:[
 {t:'The zero-order answer is not a multiple of the half-life. Here the half-life is 29.2 hours and 90 per cent decomposed takes 52.5 hours, which is 1.8 half-lives rather than the 3.32 that a first-order process would need. The reason is that the second half of the solution takes exactly as long to decompose as the first, so a zero-order process runs out of drug at a predictable time instead of approaching zero.'},
  {h:'How the variables relate', list:[
    'Zero order: t = (C0 - C)/k0, linear in the amount to be removed.',
    'First order: t = ln(C0/C)/k, so 90 per cent is always ln(10)/k, or 3.32 half-lives.',
    'A zero-order half-life is C0/2k0, and the second half takes the same time as the first.',
    'The solution reaches zero concentration at t = C0/k0, which is 58.3 hours here.',
    'Deciding the order has to come before either relation is used.']}],
 teachImg:'slide_Introduction_p20',
 cite:'IntroductionandMathReviewSolutions.pdf, problem 2, final part; Introduction.pdf slide 17',
 quote:'t = (350 − 35) mg/mL / (6 mg/mL/hr) = 52.5 hr'},

];
