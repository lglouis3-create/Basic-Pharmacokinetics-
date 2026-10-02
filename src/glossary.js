/* ==========================================================================
   TERMS: THE COURSE GLOSSARY
   ==========================================================================
   One object per term, from the lecture decks (printed slide wording) and her
   spoken words in TRANSCRIPT_CUES.md; `cite` names the deck and slide.
     def     the definition in the slide's wording
     gist    one line, at most 15 words
     scene   the term at work, without naming it (a quiz stem)
     hook    her example, or the mistake she warns about
     confuse ids of look-alike terms, used as wrong options
   The Terms tab draws three questions per term from these fields at load
   (views.js, termQuestions): scene to term, term to meaning, definition to
   term. They live outside QUESTIONS, like Extra practice.
   ========================================================================== */
const TERMS = [
 {
  "id": "pharmacokinetics",
  "term": "Pharmacokinetics",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Pharmacokinetics is the study of ADME: absorption, distribution, metabolism and excretion.",
  "gist": "Study of absorption, distribution, metabolism and excretion of a drug over time.",
  "scene": "A course follows how a drug level in the body changes with time as the drug is taken up, spread to tissues, chemically converted and removed, rather than the response the drug produces.",
  "hook": "She separates it from pharmacodynamics by the pair of variables: concentration and time here, concentration and response there.",
  "confuse": [
   "pharmacodynamics",
   "biopharmaceutics",
   "clinical-pharmacokinetics"
  ],
  "quote": "pharmacodynamics, concentration. And Response. OK, pharmacokinetics, concentration and time.",
  "cite": "Introduction.pdf, PDF page 4 (printed slide 4); PDF page 17 (printed slide 15); transcript 08-17",
  "src": "both"
 },
 {
  "id": "absorption",
  "term": "Absorption",
  "module": 1,
  "lecture": "L01",
  "group": "Absorption and oral dosing",
  "def": "Absorption - passage of drug molecules from the administration site into systemic circulation.",
  "gist": "Drug moving from the site where it was given into systemic circulation.",
  "scene": "Drug molecules pass from the site where the dose was placed into the systemic circulation.",
  "confuse": [
   "distribution",
   "bioavailability",
   "first-pass-effect"
  ],
  "quote": "Absorption, we just talked about, we're passing the drug through the biological membranes into the site of action.",
  "cite": "Introduction.pdf, PDF page 4 (printed slide 4); transcript 08-17",
  "src": "both"
 },
 {
  "id": "distribution",
  "term": "Distribution",
  "module": 1,
  "lecture": "L01",
  "group": "Distribution and volume",
  "def": "Distribution - process of reversible transfer of a drug to and from the site of measurement.",
  "gist": "Reversible movement of drug to and from the site of measurement.",
  "scene": "Once drug is in the systemic circulation it moves out into the tissues and back again, shown on the ADME schematic as arrows pointing both ways.",
  "hook": "She reads the backward arrows on the ADME schematic as drug moving to and from the tissues.",
  "confuse": [
   "absorption",
   "disposition",
   "elimination"
  ],
  "quote": "Distribution is that reversible process to and from the um site of measurement or site of action and the site of measurement, which might or might not be the the same thing.",
  "cite": "Introduction.pdf, PDF page 3 (printed slide 3); PDF page 4 (printed slide 4); transcript 08-17",
  "src": "both"
 },
 {
  "id": "metabolism",
  "term": "Metabolism (biotransformation)",
  "module": 1,
  "lecture": "L01",
  "group": "Elimination and clearance",
  "def": "Metabolism - conversion of one chemical species to another (biotransformation). Biotransformation or drug metabolism - drug is chemically converted in the body to a metabolite.",
  "gist": "Chemical conversion of the drug in the body into a different species.",
  "scene": "In the body a drug is chemically changed into a different species, most often one that the body can then remove more readily.",
  "confuse": [
   "excretion",
   "elimination",
   "first-pass-effect"
  ],
  "quote": "Biotransformation definitionally is we're chemically converting that um drug in the body to some metabolite. Most often, it's gonna result in a drug that is going to be eliminated from the body more readily.",
  "cite": "Introduction.pdf, PDF page 4 (printed slide 4); 4---Clearance-and-Elimination.pdf, PDF page 3 (printed slide 3); transcript 09-14",
  "src": "both"
 },
 {
  "id": "excretion",
  "term": "Excretion",
  "module": 1,
  "lecture": "L01",
  "group": "Elimination and clearance",
  "def": "Excretion - removal of intact drug or metabolite from the body.",
  "gist": "Removal of intact drug or metabolite from the body, with no chemical change.",
  "scene": "A drug leaves the body in the urine in its intact form, without being chemically changed on the way out.",
  "confuse": [
   "metabolism",
   "elimination",
   "disposition"
  ],
  "quote": "Excretion means we're talking about removal of intact drug or metabolite. Excretion just says that we're not changing this drug at this point, we're just removing it from the body.",
  "cite": "Introduction.pdf, PDF page 4 (printed slide 4); 4---Clearance-and-Elimination.pdf, PDF page 3 (printed slide 3); transcript 09-14",
  "src": "both"
 },
 {
  "id": "elimination",
  "term": "Elimination",
  "module": 1,
  "lecture": "L01",
  "group": "Elimination and clearance",
  "def": "Elimination - irreversible loss of drug from the body by all routes. Drug elimination: irreversible removal of drug from the body by all routes of elimination.",
  "gist": "Irreversible loss of drug by every route; covers metabolism and excretion.",
  "scene": "One word covers both the liver converting a drug to a metabolite and the kidney passing it out intact, because both remove the drug from the body for good.",
  "hook": "Her catch-all term: metabolism and excretion both fall under it.",
  "confuse": [
   "excretion",
   "metabolism",
   "disposition",
   "clearance"
  ],
  "quote": "Elimination refers to the irreversible loss of drugs from the body by all routes, right? So, Metabolism and excretion are both elimination terms, right? Elimination is kind of our catch-all.",
  "cite": "Introduction.pdf, PDF page 5 (printed slide 5); 4---Clearance-and-Elimination.pdf, PDF page 3 (printed slide 3); transcript 08-17",
  "src": "both"
 },
 {
  "id": "disposition",
  "term": "Disposition",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Disposition - all the kinetic processes that occur to a drug subsequent to its systemic absorption: distribution and elimination.",
  "gist": "Everything that happens after systemic absorption: distribution plus elimination.",
  "scene": "After a dose has reached the systemic circulation, everything that happens to it next, both its spread into the tissues and its irreversible removal, is grouped under one word.",
  "confuse": [
   "elimination",
   "distribution",
   "absorption"
  ],
  "quote": "Disposition is the processes that occur to a drug after it's absorbed, so distribution and elimination",
  "cite": "Introduction.pdf, PDF page 5 (printed slide 5); transcript 08-17",
  "src": "both"
 },
 {
  "id": "first-pass-effect",
  "term": "First-pass effect",
  "module": 1,
  "lecture": "L01",
  "group": "Absorption and oral dosing",
  "def": "First-Pass Effect - rapid metabolism of an orally administered drug before reaching the general circulation.",
  "gist": "Oral drug metabolized before it reaches the general circulation, lowering bioavailability.",
  "scene": "An oral medicine goes from the gut to the liver before it reaches the general circulation, and the liver converts a large share of the dose on the way.",
  "confuse": [
   "bioavailability",
   "absorption",
   "disposition"
  ],
  "quote": "often when we take oral medications, they hit the liver first before they get to that systemic circulation",
  "cite": "Introduction.pdf, PDF page 5 (printed slide 5); transcript 08-17",
  "src": "both"
 },
 {
  "id": "bioavailability",
  "term": "Bioavailability (F)",
  "module": 1,
  "lecture": "L01",
  "group": "Absorption and oral dosing",
  "def": "Bioavailability - measure of the systemic availability of a drug. AUCoral/AUCIV = F, where F represents the fraction of oral dose that enters the plasma or the bioavailability factor.",
  "gist": "Fraction of a dose that reaches systemic circulation; taken as 1 for IV doses.",
  "scene": "The exposure measured after an oral dose is divided by the exposure after the same IV dose, giving the share of the oral dose that enters the plasma; for the IV dose that share is taken as 1.",
  "hook": "For IV doses she takes capital F as 1, and a capital F in a stem should make you think oral.",
  "confuse": [
   "fraction-excreted",
   "first-pass-effect",
   "area-under-the-curve",
   "absorption"
  ],
  "quote": "when you see a capital F, You should think oral.",
  "cite": "Introduction.pdf, PDF page 5 (printed slide 5); PDF page 27 (printed slide 23); transcript 09-14, 09-21",
  "src": "both"
 },
 {
  "id": "biopharmaceutics",
  "term": "Biopharmaceutics",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "The interrelationship of the physicochemical drug properties, dosage form and route of administration on the rate and extent of systemic drug absorption.",
  "gist": "How drug properties, dosage form and route change rate and extent of absorption.",
  "scene": "A product team asks how the drug's solubility and particle size, the choice of tablet or transdermal product, and the route of administration change the rate and extent of systemic absorption.",
  "hook": "Her first poll: most of the class chose it correctly; pharmacodynamics and pharmacology were the wrong picks.",
  "confuse": [
   "pharmacodynamics",
   "clinical-pharmacokinetics",
   "pharmacokinetics"
  ],
  "quote": "BioPharm is what I was looking at.",
  "cite": "Introduction.pdf, PDF page 6 (printed slide 6); PDF page 7 (printed slide 7); PDF page 12 (no printed number); transcript 08-19",
  "src": "both"
 },
 {
  "id": "clinical-pharmacokinetics",
  "term": "Clinical pharmacokinetics",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Clinical Pharmacokinetics - the application of pharmacokinetic methods to drug therapy.",
  "gist": "Pharmacokinetic methods applied to drug therapy with specific drugs.",
  "scene": "Rate constants, volumes and half-lives worked out for one specific drug are used to guide the therapy of patients receiving that drug.",
  "confuse": [
   "pharmacokinetics",
   "pharmacodynamics",
   "biopharmaceutics"
  ],
  "quote": "Clinical pharmacokinetics is the application of, of, um, pharmaco pharmacokinetic methods to drug therapy, and here you're gonna be looking at specific drugs",
  "cite": "Introduction.pdf, PDF page 8 (printed slide 8); transcript 08-17",
  "src": "both"
 },
 {
  "id": "pharmacodynamics",
  "term": "Pharmacodynamics",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Pharmacodynamics - the relationship between drug concentration at the site of action and pharmacological response.",
  "gist": "Drug concentration at the site of action related to the response it produces.",
  "scene": "A study relates the drug concentration at the site of action to the size of the response the drug produces, rather than to time.",
  "confuse": [
   "pharmacokinetics",
   "clinical-pharmacokinetics",
   "biopharmaceutics"
  ],
  "quote": "pharmacodynamics is the relationship between drug concentration and pharmacological response. So pharmacokinetics, we are looking at the relationship between concentration and time.",
  "cite": "Introduction.pdf, PDF page 8 (printed slide 8); transcript 08-17",
  "src": "both"
 },
 {
  "id": "plasma",
  "term": "Plasma (Cp = concentration in plasma)",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Liquid supernatant obtained after centrifugation of non-clotted whole blood that contains an anticoagulant; the noncellular liquid fraction of whole blood, containing all the proteins including albumin.",
  "gist": "Liquid from spun, unclotted, anticoagulated blood; keeps all proteins including albumin.",
  "scene": "A sample drawn into a tube with heparin is spun in a centrifuge without being allowed to clot, and the liquid on top, which still holds albumin, is sent for the drug assay.",
  "hook": "Serum or plasma is what is mostly measured, to keep the drug from interacting with other parts of the sample; a subscript p on C names this fluid.",
  "confuse": [
   "serum",
   "whole-blood"
  ],
  "quote": "if you see CP, we're looking at concentration of drug in the plasma, CS we're looking at concentration of drug in the serum, or if you just see a C, you can assume whatever.",
  "cite": "Introduction.pdf, PDF page 11 (printed slide 10); PDF page 18 (no printed number); transcript 08-17, 08-19",
  "src": "both"
 },
 {
  "id": "serum",
  "term": "Serum (Cs = concentration in serum)",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Obtained from whole blood after the blood is allowed to clot and the clot is removed; does not contain the cellular elements, fibrinogen, or the other clotting factors from the blood.",
  "gist": "Fluid left after blood clots and the clot is removed; no fibrinogen.",
  "scene": "A sample is left to clot, the clot is removed, and the remaining fluid, which no longer holds fibrinogen or the other clotting factors, is assayed for drug.",
  "hook": "Her poll on what is most used for drug measurement: serum or plasma, chosen to minimise drug interaction with the rest of the sample.",
  "confuse": [
   "plasma",
   "whole-blood"
  ],
  "quote": "We mostly use serum and plasma because remember we try to minimize the interactions of drug with anything else that might be in that um sample",
  "cite": "Introduction.pdf, PDF page 11 (printed slide 10); PDF page 18 (no printed number); transcript 08-19",
  "src": "both"
 },
 {
  "id": "whole-blood",
  "term": "Whole blood",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Generally obtained by venous puncture and contains an anticoagulant such as heparin or EDTA; contains all the cellular and protein elements of blood.",
  "gist": "Venous sample with anticoagulant that keeps every cellular and protein element.",
  "scene": "A venous puncture sample is collected into EDTA and assayed as drawn, cells and proteins included, with nothing separated off.",
  "hook": "In her poll on the fluid most used for drug measurement it is a wrong option; serum or plasma is the answer.",
  "confuse": [
   "plasma",
   "serum"
  ],
  "cite": "Introduction.pdf, PDF page 11 (printed slide 10); PDF page 18 (no printed number); transcript 08-19",
  "src": "both"
 },
 {
  "id": "minimum-effective-concentration",
  "term": "Minimum effective concentration (MEC)",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "The concentration that must be met or exceeded in order for the desired pharmacologic response to result (her poll; correct answer \"minimum effective concentration\").",
  "gist": "Lowest drug level at which the desired pharmacologic response results.",
  "scene": "On a plot of drug level against time, a dashed line marks the level that must be met or exceeded before the desired pharmacologic response appears.",
  "hook": "In the poll the wrong options were steady-state, minimum toxic and minimum inhibitory concentration. She drew this line and a toxic line on the curve: the goal is to stay between them.",
  "confuse": [
   "cmax",
   "steady-state",
   "steady-state-trough"
  ],
  "quote": "our goal is. That we want to stay in between these two lines.",
  "cite": "Introduction.pdf, PDF page 9 (printed slide 9); PDF page 10 (no printed number); transcript 08-17",
  "src": "both"
 },
 {
  "id": "physiologic-model",
  "term": "Physiologic (perfusion) model",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Physiologic Pharmacokinetic Models: blood flow or perfusion models - based on known anatomic and physiologic data.",
  "gist": "Model built on organ blood flows and anatomy instead of abstract compartments.",
  "scene": "A scheme built from the known blood flow to each organ and from anatomic data, which she says the course uses less because it needs more input.",
  "confuse": [
   "mammillary-model",
   "catenary-model",
   "one-compartment-open-model"
  ],
  "quote": "our physiology, physiological models that we don't use quite as much. Those require a little bit more input than what we want to do.",
  "cite": "Introduction.pdf, PDF page 14 (printed slide 12); transcript 09-09",
  "src": "both"
 },
 {
  "id": "mammillary-model",
  "term": "Mammillary model",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Compartment pharmacokinetic model drawn with compartment 1 in the centre joined directly to compartment 2 (k12, k21) and to compartment 3 (k13, k31).",
  "gist": "Each outer compartment connects directly to one central compartment.",
  "scene": "A diagram puts compartment 1 in the middle, with k12 and k21 linking it to compartment 2 and k13 and k31 linking it to compartment 3; nothing links 2 and 3.",
  "hook": "This is the wiring the course uses; the chain arrangement is the poll's other compartment option.",
  "confuse": [
   "catenary-model",
   "physiologic-model",
   "two-compartment-open-model"
  ],
  "cite": "Introduction.pdf, PDF page 15 (printed slide 13); tell.js \"Models\"; drill Tell apart, Models",
  "src": "slide"
 },
 {
  "id": "catenary-model",
  "term": "Catenary model",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Compartment pharmacokinetic model in which the compartments are joined to one another in a row: 1 with 2 (k12, k21) and 2 with 3 (k23, k32).",
  "gist": "Compartments linked one after another in a single chain.",
  "scene": "In a three-box scheme, drug cannot reach compartment 3 without first passing through compartment 2, because each box links only to the next one.",
  "hook": "Her poll answer; most of the class chose it.",
  "confuse": [
   "mammillary-model",
   "physiologic-model",
   "two-compartment-open-model"
  ],
  "cite": "Introduction.pdf, PDF page 15 (printed slide 13); PDF page 18 (no printed number); transcript 08-19",
  "src": "both"
 },
 {
  "id": "zero-order",
  "term": "Zero-order reaction",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Amount or concentration of drug decreases at a constant rate: dC/dt = -k; C = C0 - kt.",
  "gist": "Drug falls by a fixed amount per unit time; rate independent of concentration.",
  "scene": "A data set loses 10 mg/mL every hour, the slope between every pair of points is -10, and the constant carries mg/mL per hour.",
  "hook": "Her trap: a straight line on a log axis is not this; look at the scale. Its half-life, C0/2k, depends on the starting concentration.",
  "confuse": [
   "first-order",
   "half-life",
   "elimination-rate-constant"
  ],
  "quote": "zero-order reactions or zero-order processes says that the amount or concentration decreases at a constant rate",
  "cite": "Introduction.pdf, PDF page 20 (printed slide 17); PDF page 22 (printed slide 19); transcript 08-19, 09-09",
  "src": "both"
 },
 {
  "id": "first-order",
  "term": "First-order reaction",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Amount or concentration of drug decreases at a rate that is proportional to the amount of drug remaining: dC/dt = -kC; ln C = ln C0 - kt.",
  "gist": "Rate proportional to drug remaining; half-life constant, k in reciprocal time.",
  "scene": "Hourly levels of 200, 93, 44 and 21 fall by roughly 50% each hour, and the points lie on a straight line against an axis marked 1, 10, 100, 1000.",
  "hook": "Poll: \"a constant rate of elimination\" is the wrong pick. The rate keeps changing; the half-life is what stays constant.",
  "confuse": [
   "zero-order",
   "half-life",
   "semi-log-scale"
  ],
  "quote": "we say that the amount or concentration of drug decreases at a rate that is proportional to the amount or concentration of drug remaining.",
  "cite": "Introduction.pdf, PDF page 21 (printed slide 18); PDF page 24 (printed slide 21); PDF page 25 (no printed number); transcript 08-19",
  "src": "both"
 },
 {
  "id": "elimination-rate-constant",
  "term": "Overall elimination rate constant (k)",
  "module": 1,
  "lecture": "L01",
  "group": "Elimination and clearance",
  "def": "k in dC/dt = -kC (Introduction.pdf); for the one-compartment open model k = km + ke, with dDB/dt = -kDB (2IVBolusAdministration.pdf slide 3).",
  "gist": "One constant for all routes of loss; first order units are reciprocal time.",
  "scene": "A value in reciprocal hours that adds km and ke together and, divided into 0.693, gives the half-life.",
  "hook": "Never negative, whichever order; with no subscript, every route of loss is wrapped into it.",
  "confuse": [
   "absorption-rate-constant",
   "beta",
   "half-life"
  ],
  "quote": "our rate constant K, whether we're talking 1st order or zero order, our rate constant is never going to be a negative. It's never gonna be a negative number",
  "cite": "Introduction.pdf, PDF page 21 (printed slide 18); 2IVBolusAdministration.pdf, slide 3 (PDF page numbering; deck prints no slide numbers); transcript 08-19, 08-24",
  "src": "both"
 },
 {
  "id": "half-life",
  "term": "Half-life (t1/2)",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "Half-life is the time required for the amount or concentration of a drug to decrease by one-half. First order: t1/2 = 0.693/k. Zero order: t1/2 = C0/2k.",
  "gist": "Time for amount or concentration of drug to fall by 50 percent.",
  "scene": "For one drug, 50% of the dose is gone after 4 hours, 75% after 8 hours and 87.5% after 12 hours; the 4-hour figure is 0.693 divided by k.",
  "hook": "Not on the equation sheet. Give it in units of time: days, not days to the minus one.",
  "confuse": [
   "elimination-rate-constant",
   "fraction-of-steady-state",
   "tmax"
  ],
  "quote": "So that will not be on your equation sheet. This is the one that you take to your grave with you, OK? 0.693 over K.",
  "cite": "Introduction.pdf, PDF page 22 (printed slide 19); transcript 08-19, 09-09",
  "src": "both"
 },
 {
  "id": "semi-log-scale",
  "term": "Semi-logarithmic scale (semi-log)",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "A plot that is logarithmic (base 10) on the concentration axis only; the deck's first-order graph has its concentration axis marked 1, 10, 100, 1000 and does not say \"log\".",
  "gist": "Base-10 concentration axis with ordinary time axis; first order plots straight.",
  "scene": "Concentration is marked 1, 10, 100, 1000 while time runs 0 to 7 hours in equal steps, and the first-order data fall on a straight line.",
  "hook": "Her trap: the axis will not say log, so a straight line on it must not be read as zero order. Look at the scale.",
  "confuse": [
   "zero-order",
   "first-order"
  ],
  "quote": "Notice that it doesn't say. Log, right? Because if it said log, then that would mean that you would need to take the log of the number after the fact",
  "cite": "Introduction.pdf, PDF page 24 (printed slide 21); transcript 08-19, 09-09",
  "src": "both"
 },
 {
  "id": "area-under-the-curve",
  "term": "Area under the curve (AUC)",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "AUCtotal = sum of each segment of AUC. Used to determine the extent of drug absorption or the effectiveness of a given drug after administration by a particular route.",
  "gist": "Total area under the concentration-time plot; extent of drug available.",
  "scene": "Plasma levels are summed over time, segment by segment, into one total in mcg/mL times hr, which shows how much of the dose was available to the body; dividing the dose by it gives clearance.",
  "hook": "Her units: micrograms per mL times hour, \"kind of funky units\".",
  "confuse": [
   "trapezoidal-rule",
   "bioavailability",
   "clearance"
  ],
  "quote": "area under the curve is a concept that tells us something about the extent of drug that's available for the body to use.",
  "cite": "Introduction.pdf, PDF page 26 (printed slide 22); PDF page 27 (printed slide 23); 4---Clearance-and-Elimination.pdf, PDF page 7 (printed slide 7); transcript 08-19, 09-09",
  "src": "both"
 },
 {
  "id": "trapezoidal-rule",
  "term": "Trapezoidal rule",
  "module": 1,
  "lecture": "L01",
  "group": "Basics and models",
  "def": "[AUC] from tn-1 to tn = (Cn-1 + Cn)/2 x (tn - tn-1); a simplistic way of estimating the area under the concentration versus time curve (AUC).",
  "gist": "Sum of segment areas, one-half base times height, to estimate AUC.",
  "scene": "Between hours 2 and 4, (18.4 + 11.1)/2 x 1 hr is added to (11.1 + 6.77)/2 x 1 hr, giving about 23.7 mcg/mL x hr.",
  "hook": "She reduces the long formula to one half base times height.",
  "confuse": [
   "area-under-the-curve",
   "method-of-residuals"
  ],
  "quote": "trapezoidal rule says we take our curve, we break it up into little segments, and then we determine the area of each of those little segments",
  "cite": "Introduction.pdf, PDF page 28 (printed slide 24); PDF page 29 (printed slide 25); PDF page 31 (printed slide 26); transcript 08-19",
  "src": "both"
 },
 {
  "id": "iv-bolus",
  "term": "Intravenous bolus (IV bolus)",
  "module": 2,
  "lecture": "L02",
  "group": "Basics and models",
  "def": "Instantaneous input: all of the dose put into the body at once; the input of the one-compartment open model, IV bolus administration.",
  "gist": "Whole dose given into a vein at one instant.",
  "scene": "The whole dose goes into a vein at one instant, so the plasma level starts at its highest point and only falls from there.",
  "hook": "Her drawing rule: this curve starts up high and comes down low; an infusion starts low and builds.",
  "confuse": [
   "iv-infusion",
   "intermittent-iv-infusion",
   "extravascular-administration"
  ],
  "quote": "We call that instantaneous input of drug into the body.",
  "cite": "2IVBolusAdministration.pdf, slides 3, 4 (PDF page numbering; deck prints no slide numbers); transcript 08-24, 09-02, 09-09",
  "src": "both"
 },
 {
  "id": "one-compartment-open-model",
  "term": "One-compartment open model",
  "module": 2,
  "lecture": "L02",
  "group": "Basics and models",
  "def": "Simplest way to describe drug distribution and elimination; assumes that the drug can enter and leave the body; the body acts like a single, uniform compartment.",
  "gist": "Body treated as one uniform box; drug spreads instantly, then is eliminated.",
  "scene": "After an IV dose the drug is taken to spread evenly through the whole body at once and to start leaving immediately, so log Cp against time is a single straight line.",
  "hook": "She must tell you the compartment count, or show it on a log plot: a single straight line means this one.",
  "confuse": [
   "two-compartment-open-model",
   "mammillary-model",
   "physiologic-model"
  ],
  "quote": "As soon as you put all of that drug into the body, it is uniformly distributed throughout that body box, and then it immediately starts to be eliminated.",
  "cite": "2IVBolusAdministration.pdf, slides 3, 10 (PDF page numbering; deck prints no slide numbers); transcript 08-26, 09-09",
  "src": "both"
 },
 {
  "id": "volume-of-distribution",
  "term": "Apparent volume of distribution (VD)",
  "module": 2,
  "lecture": "L02",
  "group": "Distribution and volume",
  "def": "A hypothetical volume of body fluid that would be required to dissolve the total amount of drug at the same concentration as that found in the blood; a proportionality constant relating the amount of drug in the body to the measured concentration: VD = DB/Cp.",
  "gist": "Hypothetical fluid volume linking amount of drug in body to measured concentration.",
  "scene": "A 200 mg IV dose is given to an 80-kg man, the figure is taken as 10% of body weight, 8 L, and 15 mg/L in plasma at 6 hours then means 120 mg in the body.",
  "hook": "Report it in litres, not kilograms. A large value means the drug is more concentrated in extravascular tissues; high plasma protein binding gives a higher Cp and a smaller value.",
  "confuse": [
   "clearance",
   "initial-concentration",
   "distribution"
  ],
  "quote": "volume of distribution is a hypothetical volume … I'm saying volume because the units should be units of volume. Liters, milliliters, what have you.",
  "cite": "2IVBolusAdministration.pdf, slides 5, 6, 7 (PDF page numbering; deck prints no slide numbers); transcript 08-24, 09-09",
  "src": "both"
 },
 {
  "id": "clearance",
  "term": "Clearance (Cl)",
  "module": 2,
  "lecture": "L02",
  "group": "Elimination and clearance",
  "def": "Clearance - measure of drug elimination from the body without identifying the mechanism or process; volume of plasma that is cleared of drug per unit time. ClT = kVD = D0/AUC.",
  "gist": "Volume of fluid cleared of drug per unit time; constant for most drugs.",
  "scene": "A drug's k is multiplied by its volume of distribution to give a figure in L/hr that stays the same whether the plasma level is high or low.",
  "hook": "Not on the equation sheet: Cl = k x VD is one to know by heart. Poll: it does not rise as concentration rises.",
  "confuse": [
   "elimination-rate-constant",
   "volume-of-distribution",
   "renal-clearance",
   "creatinine-clearance"
  ],
  "quote": "Clearance is equal to k times vd.",
  "cite": "2IVBolusAdministration.pdf, slides 8, 10 (PDF page numbering; deck prints no slide numbers); 4---Clearance-and-Elimination.pdf, PDF page 4 (printed slide 4); PDF page 5 (printed slide 5); transcript 08-24",
  "src": "both"
 },
 {
  "id": "initial-concentration",
  "term": "Initial plasma concentration (C0)",
  "module": 2,
  "lecture": "L02",
  "group": "Basics and models",
  "def": "Cp0 in Cp = Cp0 e^-kt: the plasma concentration at time zero after an IV bolus; with VD = DB/Cp it equals dose over VD. For a two-compartment drug Cp0 = A + B.",
  "gist": "Drug level at time zero after an IV bolus: dose divided by VD.",
  "scene": "A 350 mg IV dose into a 20 L volume gives 17.5 mg/L, the value back-extrapolated to time 0 and the highest point of the data set.",
  "hook": "Her check: it should be the highest point of the sample.",
  "confuse": [
   "cmax",
   "steady-state",
   "steady-state-peak"
  ],
  "quote": "remember, C0 should be the highest point of the sample",
  "cite": "2IVBolusAdministration.pdf, slides 4, 5, 21 (PDF page numbering; deck prints no slide numbers); transcript 08-24, 09-09",
  "src": "both"
 },
 {
  "id": "two-compartment-open-model",
  "term": "Two-compartment open model",
  "module": 2,
  "lecture": "L03",
  "group": "Distribution and volume",
  "def": "Multi-compartment models describe the observation of some drugs that distribute at various rates into different tissue groups; drawn as a central compartment (Dp, Cp, Vp) exchanging with a tissue compartment (Dt, Ct, Vt) by k12 and k21, with elimination k from the central compartment.",
  "gist": "Central plus tissue compartment; drug reaches organs at different rates, curve bends.",
  "scene": "After an IV dose, log Cp falls steeply at first and then settles into a shallower straight line, because the drug reaches some organs before it spreads evenly.",
  "hook": "Her graph rule: on a log scale, a line with a steep early segment means this; a single straight line means the simpler model.",
  "confuse": [
   "one-compartment-open-model",
   "mammillary-model",
   "catenary-model"
  ],
  "quote": "the drug is going to go preferentially to some organs before it is widely distributed uniformly throughout the body",
  "cite": "2IVBolusAdministration.pdf, slides 13, 14, 17, 26 (PDF page numbering; deck prints no slide numbers); transcript 08-26",
  "src": "both"
 },
 {
  "id": "transfer-rate-constants",
  "term": "Transfer rate constants (k12, k21)",
  "module": 2,
  "lecture": "L03",
  "group": "Distribution and volume",
  "def": "k12 and k21 link the central and tissue compartments: dCt/dt = k12Cp - k21Ct; each is calculated from A, B, a and b (slide \"Rate Constants\").",
  "gist": "Constants for drug moving central to tissue and tissue back to central.",
  "scene": "In a central-plus-peripheral scheme, one value (1.1 per hour on her practice sheet) governs drug moving from compartment 1 to 2 and another (0.9 per hour) governs the move from 2 back to 1.",
  "confuse": [
   "elimination-rate-constant",
   "beta",
   "absorption-rate-constant"
  ],
  "quote": "our K12 and our K21. Remember, those are our transfer constants, so how fast is the drug going from one compartment or the central compartment to the peripheral compartment and back and forth.",
  "cite": "2IVBolusAdministration.pdf, slides 17, 24 (PDF page numbering; deck prints no slide numbers); transcript 08-26",
  "src": "both"
 },
 {
  "id": "distribution-phase",
  "term": "Distribution phase (alpha phase)",
  "module": 2,
  "lecture": "L03",
  "group": "Distribution and volume",
  "def": "The rapidly distributed a (alpha) phase: the steep early part of the two-compartment curve, the Ae^-at term of Cp = Ae^-at + Be^-bt.",
  "gist": "Steep early segment of the two-compartment curve, before even spread.",
  "scene": "The steep early segment of a log Cp plot after an IV dose, lasting while drug is still moving into the tissues, with a slope much larger than the later straight line.",
  "hook": "She does not ask for this segment's half-life; the one asked for is the beta (elimination) half-life.",
  "confuse": [
   "elimination-phase",
   "absorption-phase",
   "method-of-residuals"
  ],
  "quote": "This handle piece up top is what we would call our distribution phase.",
  "cite": "2IVBolusAdministration.pdf, slides 19, 20, 21 (PDF page numbering; deck prints no slide numbers); transcript 08-26",
  "src": "both"
 },
 {
  "id": "elimination-phase",
  "term": "Elimination phase (beta phase)",
  "module": 2,
  "lecture": "L03",
  "group": "Elimination and clearance",
  "def": "The terminal straight segment of the two-compartment plasma level-time curve, labelled \"Elimination phase\" with slope b; the Be^-bt term of Cp = Ae^-at + Be^-bt.",
  "gist": "Terminal straight segment once distribution is complete; slope is beta.",
  "scene": "Once the drug has spread evenly through the body, log Cp declines along a shallower straight line whose slope gives the half-life she asks for.",
  "confuse": [
   "distribution-phase",
   "post-absorption-phase",
   "method-of-residuals"
  ],
  "quote": "once the drug is distributed uniformly throughout the body … Then we call this blue phase our elimination phase.",
  "cite": "2IVBolusAdministration.pdf, slides 20, 21 (PDF page numbering; deck prints no slide numbers); transcript 08-26",
  "src": "both"
 },
 {
  "id": "method-of-residuals",
  "term": "Method of residuals (feathering, peeling)",
  "module": 2,
  "lecture": "L03",
  "group": "Distribution and volume",
  "def": "A procedure for fitting a curve to the experimental data of a drug when the drug does not clearly follow a one-compartment model; residual plasma concentration (rapidly distributed a phase) is obtained by subtracting the extrapolated line from observed data.",
  "gist": "Curve fitting: subtract the back-extrapolated terminal line from observed data.",
  "scene": "The straight terminal line is extended back to time zero, its values are subtracted from the observed concentrations, and the differences give the steep early line.",
  "hook": "She will not ask you to do it; she will hand you A, B, alpha and beta.",
  "confuse": [
   "trapezoidal-rule",
   "superposition",
   "distribution-phase"
  ],
  "quote": "I want you to conceptually know what that is, but I'm not gonna ask you to do that. I am pretty much gonna give you A, B, alpha, beta, OK?",
  "cite": "2IVBolusAdministration.pdf, slide 19 (PDF page numbering; deck prints no slide numbers); transcript 08-26",
  "src": "both"
 },
 {
  "id": "beta",
  "term": "Beta (b) and beta half-life",
  "module": 2,
  "lecture": "L03",
  "group": "Elimination and clearance",
  "def": "b, the slope of the elimination phase in Cp = Ae^-at + Be^-bt; beta half-life t1/2 = 0.693/b.",
  "gist": "Terminal slope of the two-compartment curve; 0.693 over it is elimination half-life.",
  "scene": "In Cp = 12e^-5.8t + 18e^-0.16t, the smaller exponent, 0.16, is divided into 0.693 to give 4.33 hours.",
  "hook": "Do not solve for k and then 0.693 over k; divide 0.693 by lowercase b.",
  "confuse": [
   "transfer-rate-constants",
   "absorption-rate-constant",
   "distribution-phase"
  ],
  "quote": "Don't complicate it. You take your 0.693 and you divide by lowercase b.",
  "cite": "2IVBolusAdministration.pdf, slides 21, 22, 23 (PDF page numbering; deck prints no slide numbers); transcript 08-26, 09-09",
  "src": "both"
 },
 {
  "id": "iv-infusion",
  "term": "Intravenous infusion (IV infusion)",
  "module": 3,
  "lecture": "L04",
  "group": "Infusion and multiple dosing",
  "def": "Allows for precise control of plasma drug concentration; drug is administered at a constant rate of input. IV infusion, the administration of drug into the body at a constant rate.",
  "gist": "Drug run into a vein at a constant rate: zero order in, first order out.",
  "scene": "Drug runs into a vein at 50 mg/hr; the plasma level starts at zero and builds toward a plateau.",
  "hook": "Constant in, first order out; when it is stopped, only elimination remains.",
  "confuse": [
   "iv-bolus",
   "intermittent-iv-infusion",
   "extravascular-administration"
  ],
  "quote": "Our input is zero order, constant in, first order out. When we stop the in, then it's just out.",
  "cite": "3IntravenousInfusions.pdf, slides 3, 7, 19 (PDF page numbering; deck prints no slide numbers); transcript 09-02",
  "src": "both"
 },
 {
  "id": "steady-state",
  "term": "Steady state (Css)",
  "module": 3,
  "lecture": "L04",
  "group": "Infusion and multiple dosing",
  "def": "Steady-state is achieved when rate in = rate out; Css = R/Cl = R/(kVD).",
  "gist": "Plateau where rate of drug in equals rate of drug out.",
  "scene": "During a constant input the rate out keeps rising until it matches the rate in, and the level then holds at R divided by Cl, about 3 to 5 half-lives after the start.",
  "hook": "Changing the infusion rate changes the plateau level, not the time to reach it: that is 3 to 5 half-lives.",
  "confuse": [
   "fraction-of-steady-state",
   "cmax",
   "minimum-effective-concentration",
   "average-steady-state-concentration"
  ],
  "quote": "So if I ask you how long it takes to get steady state following IV infusion, the simplest answer. Is 3 to 5 half-lives, OK?",
  "cite": "3IntravenousInfusions.pdf, slides 4, 6 (PDF page numbering; deck prints no slide numbers); transcript 09-02, 09-09",
  "src": "both"
 },
 {
  "id": "infusion-rate",
  "term": "Infusion rate (R)",
  "module": 3,
  "lecture": "L04",
  "group": "Infusion and multiple dosing",
  "def": "R, the constant rate of drug input in Css = R/Cl and Cp = (R/Cl)(1 - e^-kt); amount per time.",
  "gist": "Constant amount of drug put in per unit time, usually mg/hr.",
  "scene": "To hold 20 mg/L in a patient with a 30 L volume and a 6-hour half-life, the input is raised to 69.3 mg/hr.",
  "hook": "Raising it raises the plateau level; it has no effect on the time to reach the plateau.",
  "confuse": [
   "loading-dose",
   "steady-state",
   "clearance"
  ],
  "quote": "Because it is three to five half-lives. Depends on the half-life, that rate constant K.",
  "cite": "3IntravenousInfusions.pdf, slides 3, 4, 8 (PDF page numbering; deck prints no slide numbers); transcript 09-02, 09-09",
  "src": "both"
 },
 {
  "id": "fraction-of-steady-state",
  "term": "Fraction of steady state (1 - e^-kt)",
  "module": 3,
  "lecture": "L04",
  "group": "Infusion and multiple dosing",
  "def": "The term (1-e-kt) gives the fraction of steady-state concentration achieved after infusing the drug for an amount of time t; it is small at early times and approaches 1 at times approaching 5 t1/2s.",
  "gist": "Share of the plateau reached after infusing for time t.",
  "scene": "After one half-life of constant input the level is 50% of its plateau, after two 75%, after three 87.5%; reaching 90% takes about 15 hours when k is 0.15 per hour.",
  "hook": "The curve is asymptotic: 10 half-lives gets 99.9%, so the plateau is approached, never reached.",
  "confuse": [
   "steady-state",
   "half-life",
   "drug-accumulation"
  ],
  "quote": "this 1 minus E to the minus KT tells us what fraction of steady state we've achieved",
  "cite": "3IntravenousInfusions.pdf, slides 5, 6, 9, 11 (PDF page numbering; deck prints no slide numbers); transcript 09-02",
  "src": "both"
 },
 {
  "id": "loading-dose",
  "term": "Loading dose (DL)",
  "module": 3,
  "lecture": "L04",
  "group": "Infusion and multiple dosing",
  "def": "IV bolus loading dose given with a continuous IV infusion: C1 = (DL/VD)e^-kt adds to C2 = (R/VDk)(1 - e^-kt); DL = R/k.",
  "gist": "Bolus given with an infusion so the plateau level is reached at once.",
  "scene": "A 20 mg/hr drip with k 0.16 per hour and a 10 L volume is started together with a 125 mg IV push so the level is 12.5 mcg/mL immediately.",
  "hook": "It should equal the amount in the body at steady state, Css x VD; R/k works only if the rate itself was chosen well.",
  "confuse": [
   "infusion-rate",
   "steady-state",
   "initial-concentration"
  ],
  "quote": "We want the loading dose to look like the amount of drug that's in the body at steady state.",
  "cite": "3IntravenousInfusions.pdf, slides 15, 16, 17, 18 (PDF page numbering; deck prints no slide numbers); transcript 09-02, 09-09",
  "src": "both"
 },
 {
  "id": "total-body-clearance",
  "term": "Total body clearance (ClT)",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "Total Body Clearance: ClT = ClR + ClH. Also called drug clearance or systemic clearance.",
  "gist": "Sum of renal and hepatic clearance; clearance by every route.",
  "scene": "A drug's 1.3 L/hr is split into 0.78 L/hr through the kidney and 0.52 L/hr through the liver.",
  "hook": "With no subscript on Cl, assume this one is meant.",
  "confuse": [
   "renal-clearance",
   "hepatic-clearance",
   "creatinine-clearance"
  ],
  "quote": "if there is no subscript, you should assume that we're talking about total body clearance",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 8 (printed slide 8); PDF page 12 (printed slide 22); 2IVBolusAdministration.pdf, slide 8 (PDF page numbering; deck prints no slide numbers); transcript 09-14",
  "src": "both"
 },
 {
  "id": "renal-clearance",
  "term": "Renal clearance (ClR)",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "The volume that is removed from the drug per unit of time through the kidney; determined from the fraction excreted unchanged and total clearance: ClR = feClT. The appearance of drug in the urine is the net result of filtration, secretion, and reabsorption.",
  "gist": "Clearance through the kidney: fe times total clearance.",
  "scene": "Sixty percent of a 500 mg IV dose is recovered intact in 48 hours of urine, so 0.6 is multiplied by 1.3 L/hr to give 0.78 L/hr.",
  "hook": "Do not mix it up with creatinine clearance: one describes the drug, the other the patient's kidney function.",
  "confuse": [
   "creatinine-clearance",
   "hepatic-clearance",
   "total-body-clearance",
   "glomerular-filtration-rate"
  ],
  "quote": "things get a little blurry when we're talking about renal clearance, and then I'm gonna ask you to calculate creatinine clearance, and I want you to think about the, the what I'm asking you each time.",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 9 (printed slide 9); PDF page 12 (printed slide 22); PDF page 14 (printed slide 12); transcript 09-14",
  "src": "both"
 },
 {
  "id": "hepatic-clearance",
  "term": "Hepatic (metabolic) clearance (ClH)",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "Rate and extent of metabolism can rarely be measured directly, but by taking advantage of the additivity of clearance, hepatic clearance is readily estimated as the difference between total and renal clearance: ClH = ClT - ClR = (1 - fe)ClT.",
  "gist": "Liver clearance found by subtracting renal from total clearance.",
  "scene": "Because the liver is not sampled, 0.78 L/hr through the kidney is subtracted from 1.3 L/hr for the whole body, leaving 0.52 L/hr.",
  "confuse": [
   "renal-clearance",
   "total-body-clearance",
   "metabolism"
  ],
  "quote": "We can calculate renal, and then we subtract renal from total to give us hepatic clearance.",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 11 (printed slide 11); PDF page 12 (printed slide 22); transcript 09-14",
  "src": "both"
 },
 {
  "id": "fraction-excreted",
  "term": "Fraction excreted unchanged (fe)",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "fe = Du(infinity)/(FD0) = ke/k: the cumulative amount of unchanged drug in the urine over the dose; used in ClR = feClT and ke = fe k.",
  "gist": "Share of the dose recovered intact in urine; has no units.",
  "scene": "After a 500 mg IV dose, 300 mg of intact drug is collected in 48 hours of urine, and 300 divided by 500 gives 0.6, a number with no units.",
  "hook": "Lowercase fe is not capital F, the bioavailability factor.",
  "confuse": [
   "bioavailability",
   "renal-clearance",
   "hepatic-clearance"
  ],
  "quote": "lowercase fe is our fraction excreted, capital F is our bioavailability factor",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 9 (printed slide 9); PDF page 10 (printed slide 10); PDF page 12 (printed slide 22); transcript 09-14",
  "src": "both"
 },
 {
  "id": "glomerular-filtration",
  "term": "Glomerular filtration",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "Glomerular filtration - passive diffusion of drug across the glomerulus (avg. 120 mL/min); with secretion, it adds drug to the lumen in the proximal part of the nephron.",
  "gist": "Passive diffusion of drug into the urine, about 120 mL/min.",
  "scene": "In the nephron, drug passes into the urine by passive diffusion down its concentration gradient, with no transporter and no energy needed.",
  "hook": "Her tolerance: a renal clearance of 119 or 121 mL/min counts as this process alone.",
  "confuse": [
   "active-tubular-secretion",
   "tubular-reabsorption",
   "glomerular-filtration-rate"
  ],
  "quote": "glomerular filtration is just passive diffusion, right?",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 14 (printed slide 12); PDF page 15 (printed slide 13); transcript 09-14",
  "src": "both"
 },
 {
  "id": "active-tubular-secretion",
  "term": "Active tubular secretion",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "Active tubular secretion - active secretion of some drugs from the blood into the urine. Secretion is inferred when rate of excretion exceeds the rate of filtration; secretion is apparent when renal clearance is greater than the GFR.",
  "gist": "Energy-requiring transport of drug from blood into urine; ClR above GFR.",
  "scene": "A drug's renal clearance is 350 mL/min, well above 120 mL/min, so a transporter must be moving it into the urine on top of passive filtration.",
  "hook": "Her tolerance: 119 or 121 counts as filtration; 250 means this is going on.",
  "confuse": [
   "glomerular-filtration",
   "tubular-reabsorption",
   "renal-clearance"
  ],
  "quote": "If it's 250, then let's assume that we've got some active secretion going on.",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 15 (printed slide 13); PDF page 20 (printed slide 18); transcript 09-14",
  "src": "both"
 },
 {
  "id": "tubular-reabsorption",
  "term": "Tubular reabsorption",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "Tubular reabsorption - reabsorption of some drugs from the urine back into the blood. Reabsorption occurs if the renal clearance is less than the calculated clearance by filtration.",
  "gist": "Drug moving from urine back into blood; ClR below filtration clearance.",
  "scene": "A drug that passes into the urine at 120 mL/min partly returns from the urine to the bloodstream, so its renal clearance comes out below 120 mL/min.",
  "hook": "For weak acids and weak bases, how much of this happens depends on urine pH and the drug's pKa.",
  "confuse": [
   "active-tubular-secretion",
   "glomerular-filtration",
   "absorption"
  ],
  "quote": "So then we would expect that our renal clearance is going to be less than 120 mL per minute.",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 15 (printed slide 13); PDF page 21 (printed slide 19); PDF page 22 (printed slide 20); transcript 09-14",
  "src": "both"
 },
 {
  "id": "glomerular-filtration-rate",
  "term": "Glomerular filtration rate (GFR)",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "GFR is measured by using a drug that is eliminated primarily by filtration only - the drug is neither reabsorbed nor secreted. Creatinine and inulin are used clinically to measure GFR, even though creatinine is also secreted.",
  "gist": "Kidney filtering rate, measured with a marker that is only filtered.",
  "scene": "Inulin, which is neither secreted nor reabsorbed but has to be given to the patient, is used as a marker to measure this kidney value; creatinine is the everyday estimate even though it is also secreted.",
  "hook": "Notice the word \"primarily\"; creatinine is used even though it is also secreted.",
  "confuse": [
   "creatinine-clearance",
   "glomerular-filtration",
   "renal-clearance"
  ],
  "quote": "GFR is measured using a drug that is eliminated primarily by filtration only. OK. Notice the word primarily in there.",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 16 (printed slide 14); transcript 09-14",
  "src": "both"
 },
 {
  "id": "creatinine-clearance",
  "term": "Creatinine clearance (CrCl)",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "The most common measure of renal clearance is creatinine clearance (CrCl), which can be calculated by the Cockcroft-Gault equation with 120-130 mL/min being considered normal; a very commonly used estimation of GFR.",
  "gist": "Estimate of GFR, and so of the patient's renal function, in mL/min.",
  "scene": "A 45-year-old woman's value comes out at about 58 mL/min against a normal of 120 to 130, so her renal function may need to be accounted for in her dosing.",
  "hook": "Units must be mL/min, even though the units in the formula do not cancel.",
  "confuse": [
   "renal-clearance",
   "glomerular-filtration-rate",
   "cockcroft-gault-equation",
   "total-body-clearance"
  ],
  "quote": "I also want you to recognize that the units of creatinine clearance should be in milliliters per minute, OK.",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 16 (printed slide 14); PDF page 17 (printed slide 15); PDF page 19 (printed slide 17); transcript 09-14",
  "src": "both"
 },
 {
  "id": "cockcroft-gault-equation",
  "term": "Cockcroft-Gault equation",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "CrCl = (140 - age)(IBW)/(72 x SCr), x 0.85 if female; age in years, IBW = ideal body weight in kg (male 50 + 2.3 per inch over 5 ft; female 45.5 + 2.3 per inch over 5 ft), SCr = serum creatinine in mg/dL.",
  "gist": "Formula estimating CrCl from age, ideal body weight, serum creatinine and sex.",
  "scene": "A formula with (140 - age) times ideal body weight on top, 72 times serum creatinine underneath, and a 0.85 factor for females.",
  "hook": "Not on the equation sheet: memorise it and the ideal body weight formulas. Her patients are all at least 5 ft tall and use ideal body weight.",
  "confuse": [
   "glomerular-filtration-rate",
   "renal-clearance"
  ],
  "quote": "I've given you the equation sheet, this one is not there. You need to know this one, OK.",
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 17 (printed slide 15); PDF page 18 (printed slide 16); PDF page 19 (printed slide 17); transcript 09-14",
  "src": "both"
 },
 {
  "id": "degree-of-ionization",
  "term": "Degree of ionization and pKa",
  "module": 4,
  "lecture": "L05",
  "group": "Elimination and clearance",
  "def": "Reabsorption of weak acids and weak bases is influenced by the pH of the fluid in the renal tubule and the pka of the drug: pH = pka + log(ionized/nonionized) (weak acids, pka 3-8); pH = pka + log(nonionized/ionized) (weak bases, pka 7.5-10.5).",
  "gist": "Urine pH against drug pKa sets the charged share, governing weak acid/base reabsorption.",
  "scene": "Urine pH is compared with a drug constant that lies between 3 and 8 for weak acids and between 7.5 and 10.5 for weak bases, and the comparison predicts how much of the drug the kidney tubule takes back.",
  "confuse": [
   "glomerular-filtration",
   "active-tubular-secretion"
  ],
  "cite": "4---Clearance-and-Elimination.pdf, PDF page 22 (printed slide 20); PDF page 26 (printed slide 25)",
  "src": "slide"
 },
 {
  "id": "extravascular-administration",
  "term": "Extravascular (oral) administration",
  "module": 5,
  "lecture": "L06",
  "group": "Absorption and oral dosing",
  "def": "Administration outside the vascular system; oral administration usually refers to first-order absorption and first-order elimination.",
  "gist": "Dose given outside the blood vessels, as by mouth; first order in.",
  "scene": "Aspirin taken by mouth gives a plasma curve that rises to a peak and then falls, unlike the curve from a dose put straight into a vein.",
  "hook": "A curve that goes up, peaks and comes down should be identified as oral input: first order in, first order out.",
  "confuse": [
   "iv-bolus",
   "iv-infusion",
   "first-order"
  ],
  "quote": "I want you to identify that as an oral input. Right? First order in, first order out.",
  "cite": "5---Pharmacokinetics-of-Oral-Absorption.pdf, slides 2, 3, 4, 22 (PDF page numbering; deck prints no slide numbers); transcript 09-21",
  "src": "both"
 },
 {
  "id": "absorption-rate-constant",
  "term": "Absorption rate constant (ka)",
  "module": 5,
  "lecture": "L06",
  "group": "Absorption and oral dosing",
  "def": "ka, the first-order rate constant for drug moving from the GI tract (DGI) into the body (DBVD) in the first-order absorption model; absorption half-life t1/2a = 0.693/ka.",
  "gist": "First-order constant for drug entering the body; 0.693/ka is absorption half-life.",
  "scene": "A stated 45-minute half-life for getting into the body is turned into 0.924 per hour by dividing 0.693 by 0.75 hr.",
  "hook": "Change both half-lives to the same unit, usually hours, and turn each half-life into its constant before calculating tmax.",
  "confuse": [
   "elimination-rate-constant",
   "beta",
   "transfer-rate-constants"
  ],
  "quote": "when you are calculating um T max, do not forget to change your times to out to the same unit, usually hours",
  "cite": "5---Pharmacokinetics-of-Oral-Absorption.pdf, slides 6, 7, 13, 14 (PDF page numbering; deck prints no slide numbers); transcript 09-21",
  "src": "both"
 },
 {
  "id": "tmax",
  "term": "Time to peak (tmax)",
  "module": 5,
  "lecture": "L06",
  "group": "Absorption and oral dosing",
  "def": "Time of maximum concentration on the concentration versus time curve; for a single oral dose tmax = ln(ka/k)/(ka - k).",
  "gist": "When plasma level peaks after an oral dose; depends only on ka and k.",
  "scene": "With ka 0.924 and k 0.231 per hour, ln(0.924/0.231) divided by (0.924 - 0.231) gives 2 hours, and doubling the dose still gives 2 hours.",
  "hook": "Find it before Cmax, even when not asked. Poll: increasing the oral dose does not change it.",
  "confuse": [
   "cmax",
   "tmax-steady-state",
   "half-life"
  ],
  "quote": "If I increase the dose, what happens to T-Max? Nothing, right?",
  "cite": "5---Pharmacokinetics-of-Oral-Absorption.pdf, slides 12, 13, 14, 18 (PDF page numbering; deck prints no slide numbers); Introduction.pdf, PDF page 9 (printed slide 9); 6a---Multiple-Oral-Doses.pdf, slide 1 (PDF page numbering; deck prints no slide numbers); transcript 09-21",
  "src": "both"
 },
 {
  "id": "cmax",
  "term": "Peak plasma concentration (Cmax)",
  "module": 5,
  "lecture": "L06",
  "group": "Absorption and oral dosing",
  "def": "Maximum concentration on the concentration versus time curve, reached at tmax; for a single oral dose found by putting tmax into Cp = FkaD0/[VD(ka - k)] x (e^-kt - e^-kat).",
  "gist": "Highest drug level after a single oral dose, reached at tmax.",
  "scene": "0.85 x 500 mg x 0.924 is divided by 22 L x (0.924 - 0.231), then multiplied by (e^-0.231x2 - e^-0.924x2), giving 12.17 mg/L.",
  "hook": "Do not forget VD. A larger ka gives a higher value at an earlier time; a larger dose raises it in proportion.",
  "confuse": [
   "tmax",
   "initial-concentration",
   "steady-state-peak",
   "steady-state"
  ],
  "quote": "Do not forget the volume of distribution.",
  "cite": "5---Pharmacokinetics-of-Oral-Absorption.pdf, slides 12, 13, 14, 19 (PDF page numbering; deck prints no slide numbers); Introduction.pdf, PDF page 9 (printed slide 9); transcript 09-21",
  "src": "both"
 },
 {
  "id": "absorption-phase",
  "term": "Absorption phase",
  "module": 5,
  "lecture": "L06",
  "group": "Absorption and oral dosing",
  "def": "The part of the concentration-time profile following extravascular administration, before Cmax, where absorption rate > elimination rate.",
  "gist": "Rising part of the oral curve: more drug going in than coming out.",
  "scene": "Shortly after a tablet is swallowed, more drug enters the body than leaves it, and the plasma level climbs toward its highest point.",
  "hook": "At Cmax itself the rate in equals the rate out.",
  "confuse": [
   "post-absorption-phase",
   "distribution-phase",
   "elimination-phase"
  ],
  "quote": "we've got more drug going in to the body than there is drug going out",
  "cite": "5---Pharmacokinetics-of-Oral-Absorption.pdf, slide 8 (PDF page numbering; deck prints no slide numbers); transcript 09-21",
  "src": "both"
 },
 {
  "id": "post-absorption-phase",
  "term": "Post-absorption phase",
  "module": 5,
  "lecture": "L06",
  "group": "Absorption and oral dosing",
  "def": "The part of the concentration-time profile following extravascular administration, after Cmax, where elimination rate > absorption rate while some drug is still being absorbed.",
  "gist": "After the peak: some drug still entering, but elimination now faster.",
  "scene": "After the highest point, some drug is still entering from the gut, but more is leaving than arriving, so the level falls.",
  "hook": "This was the slide missing from her own copy; she taught it from the students' slides.",
  "confuse": [
   "absorption-phase",
   "elimination-phase",
   "distribution-phase"
  ],
  "quote": "where it says that the elimination rate is greater than the absorption rate, that means that we still have some drug that's available to be absorbed there, right?",
  "cite": "5---Pharmacokinetics-of-Oral-Absorption.pdf, slide 8 (PDF page numbering; deck prints no slide numbers); transcript 09-21",
  "src": "both"
 },
 {
  "id": "disposition-rate-limiting",
  "term": "Disposition rate limiting",
  "module": 5,
  "lecture": "L06",
  "group": "Absorption and oral dosing",
  "def": "Disposition Rate Limiting: absorption half-life is much shorter than elimination half-life.",
  "gist": "Absorption much faster than elimination; the usual case for oral drugs.",
  "scene": "In Cp = 75(e^-0.22t - e^-2.75t), drug gets in far faster than it gets out: 0.693/2.75 is much shorter than 0.693/0.22.",
  "hook": "Most of the time ka is much larger than k. In one worked example she calls this \"distribution limited\".",
  "confuse": [
   "absorption-rate-limiting",
   "disposition",
   "absorption-phase"
  ],
  "quote": "Most of the time we're gonna be looking at disposition rate limiting, where our KA is gonna be significantly faster or larger than our K",
  "cite": "5---Pharmacokinetics-of-Oral-Absorption.pdf, slides 15, 20 (PDF page numbering; deck prints no slide numbers); transcript 09-21",
  "src": "both"
 },
 {
  "id": "absorption-rate-limiting",
  "term": "Absorption rate limiting",
  "module": 5,
  "lecture": "L06",
  "group": "Absorption and oral dosing",
  "def": "Absorption Rate Limiting: absorption half-life is much longer than elimination half-life.",
  "gist": "Absorption much slower than elimination, so absorption controls the decline.",
  "scene": "A product's half-life for getting into the body is much longer than its half-life for leaving it.",
  "confuse": [
   "disposition-rate-limiting",
   "absorption-phase",
   "absorption-rate-constant"
  ],
  "quote": "the other option is absorption rate limiting in which the absorption half-life is longer.",
  "cite": "5---Pharmacokinetics-of-Oral-Absorption.pdf, slide 20 (PDF page numbering; deck prints no slide numbers); transcript 09-21",
  "src": "both"
 },
 {
  "id": "superposition",
  "term": "Superposition",
  "module": 6,
  "lecture": "L07",
  "group": "Infusion and multiple dosing",
  "def": "Principle used for multiple-dose regimens, resting on two assumptions: drug is eliminated by first-order kinetics; the pharmacokinetics of the drug after a single dose are not altered after multiple doses.",
  "gist": "Concentrations from separate doses add, given first-order, unchanged kinetics.",
  "scene": "The level left from a loading bolus and the level built up by an infusion at the same moment are added together to give the patient's concentration.",
  "hook": "The second assumption means half-life and clearance do not change after multiple doses.",
  "confuse": [
   "drug-accumulation",
   "method-of-residuals",
   "trapezoidal-rule"
  ],
  "quote": "at any point on the curve, then the concentration here plus the concentration here should equal the concentration there.",
  "cite": "6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide 4 (PDF page numbering; deck prints no slide numbers); 3IntravenousInfusions.pdf, slide 18 (PDF page numbering; deck prints no slide numbers); transcript 09-02; guide.js Module 6 objective 1 (transcript 09-23); drill Guides, 09-23",
  "src": "both"
 },
 {
  "id": "drug-accumulation",
  "term": "Drug accumulation",
  "module": 6,
  "lecture": "L07",
  "group": "Infusion and multiple dosing",
  "def": "Drug accumulation with repeated administration: time to plateau will be reached by 3-5 half-lives; this is independent of the dose; if drug input is stopped, most drug will be eliminated in 3-5 half-lives.",
  "gist": "Build-up with repeated doses to a plateau within 3 to 5 half-lives.",
  "scene": "Grams in the body rise with each daily dose, the highs and lows climbing until every later day reaches the same high and the same low.",
  "hook": "3 to 5 half-lives, not 3 to 5 doses, and independent of the dose.",
  "confuse": [
   "superposition",
   "dosage-interval",
   "peak-to-trough-fluctuation"
  ],
  "cite": "6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide 3 (PDF page numbering; deck prints no slide numbers); guide.js Module 6 objective 1 (transcript 09-23); drill Guides, 09-23",
  "src": "both"
 },
 {
  "id": "dosage-interval",
  "term": "Dosage interval (tau)",
  "module": 6,
  "lecture": "L07",
  "group": "Infusion and multiple dosing",
  "def": "Tau is equal to the dosage interval, as in DB = D0e^-k(tau) for the drug left from one IV bolus at the time of the next.",
  "gist": "Time between doses, in hours, as entered in the equations.",
  "scene": "An antibiotic is given 10 mg/kg every 8 hours, and those 8 hours are what go into e to the minus k times the gap between injections.",
  "hook": "TID is a frequency; the value used in the equations is 8 hours. Lengthening it lowers steady-state levels, widens peak-to-trough swings and improves compliance.",
  "confuse": [
   "half-life",
   "tmax-steady-state",
   "peak-to-trough-fluctuation"
  ],
  "cite": "6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides 6, 9 (PDF page numbering; deck prints no slide numbers); 6a---Multiple-Oral-Doses.pdf, slides 11, 18 (PDF page numbering; deck prints no slide numbers); guide.js Module 6 objective 2 (transcript 09-23); drill Guides, 09-23",
  "src": "both"
 },
 {
  "id": "steady-state-peak",
  "term": "Maximum concentration at steady state (Cmax infinity)",
  "module": 6,
  "lecture": "L07",
  "group": "Infusion and multiple dosing",
  "def": "Maximum concentration of drug in the body at steady state: Cmax(infinity) = Dmax(infinity)/VD = C0/(1 - e^-k tau).",
  "gist": "Highest level in each dosing interval once repeated dosing has levelled off.",
  "scene": "An antibiotic at 10 mg/kg every 8 hours, half-life 4 hours, gives 40 mg/L right after the first injection; once dosing has levelled off the level right after each injection is 40/(1 - e^-0.1733x8) = 53.3 mg/L.",
  "hook": "A value below the first-dose value means the factor was multiplied instead of divided; it must be higher.",
  "confuse": [
   "cmax",
   "initial-concentration",
   "steady-state-trough",
   "average-steady-state-concentration"
  ],
  "cite": "6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides 7, 8, 9, 11 (PDF page numbering; deck prints no slide numbers); guide.js Module 6 objective 2 (transcript 09-23); drill Guides, 09-23",
  "src": "both"
 },
 {
  "id": "steady-state-trough",
  "term": "Minimum concentration at steady state (Cmin infinity)",
  "module": 6,
  "lecture": "L07",
  "group": "Infusion and multiple dosing",
  "def": "Minimum concentration of drug in the body at steady state: Cmin(infinity) = Dmin(infinity)/VD = C0e^-k tau/(1 - e^-k tau).",
  "gist": "Lowest level, at the end of each dosing interval, at steady state.",
  "scene": "On the same regimen, 53.3 mg/L decays for 8 hours, two half-lives, to 13.3 mg/L just before the next injection.",
  "hook": "It occurs at the end of the dosing interval: first-order decline from the steady-state peak.",
  "confuse": [
   "steady-state-peak",
   "average-steady-state-concentration",
   "minimum-effective-concentration"
  ],
  "cite": "6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides 7, 8, 12 (PDF page numbering; deck prints no slide numbers); 6a---Multiple-Oral-Doses.pdf, slide 14 (PDF page numbering; deck prints no slide numbers); guide.js Module 6 objective 2 (transcript 09-23); drill Guides, 09-23",
  "src": "both"
 },
 {
  "id": "average-steady-state-concentration",
  "term": "Average concentration at steady state (Cavg infinity)",
  "module": 6,
  "lecture": "L07",
  "group": "Infusion and multiple dosing",
  "def": "Average concentration of drug in the body at steady state: Cavg(infinity) = Davg(infinity)/VD = FD0/(VDk tau) = FD0/(ClT tau); also [AUC] over one interval divided by tau.",
  "gist": "Time-average level over one dosing interval at steady state: AUC over tau.",
  "scene": "On the same regimen, 40 mg/L divided by (0.693/4 x 8) gives 28.9 mg/L, below the midpoint of 53.3 and 13.3.",
  "hook": "It is not (max + min)/2, because the decline is logarithmic.",
  "confuse": [
   "steady-state-peak",
   "steady-state-trough",
   "steady-state",
   "area-under-the-curve"
  ],
  "cite": "6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides 4, 8, 13 (PDF page numbering; deck prints no slide numbers); 6a---Multiple-Oral-Doses.pdf, slide 6 (PDF page numbering; deck prints no slide numbers); guide.js Module 6 objective 2 (transcript 09-23); drill Guides, 09-23",
  "src": "both"
 },
 {
  "id": "intermittent-iv-infusion",
  "term": "Intermittent IV infusion",
  "module": 6,
  "lecture": "L08",
  "group": "Infusion and multiple dosing",
  "def": "One or more doses administered by IV infusion, each giving Cp = (R/VDk)(1 - e^-kt); used to prevent high drug concentrations and accompanying side effects, since many drugs are better tolerated when infused slowly over time compared to IV bolus dosing.",
  "gist": "Repeated short infusions; each declines from its own end, and contributions add.",
  "scene": "300 mg runs in over 2 hours, a second 300 mg starts 6 hours after the first began, and the level 4 hours after the second ends is 17.3e^-0.15(10) + 17.3e^-0.15(4).",
  "hook": "Draw a number line; time for each one is counted from its own end.",
  "confuse": [
   "iv-infusion",
   "iv-bolus",
   "dosage-interval"
  ],
  "cite": "6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides 20, 21, 22, 23, 24, 25 (PDF page numbering; deck prints no slide numbers); guide.js Module 6 objective 3 (transcript 09-28); drill Guides, 09-28",
  "src": "both"
 },
 {
  "id": "tmax-steady-state",
  "term": "Time to peak at steady state (tmax infinity)",
  "module": 6,
  "lecture": "L09",
  "group": "Infusion and multiple dosing",
  "def": "tmax(infinity) = [1/(ka - k)] ln[ka(1 - e^-k tau)/(k(1 - e^-ka tau))]; the time to peak at steady-state following multiple oral doses is based on the rate constants of absorption and elimination and the dosing interval.",
  "gist": "When each oral dose reaches its highest level once dosing has levelled off.",
  "scene": "Tetracycline 250 mg every 8 hours: the first dose reaches its highest level at about 3.1 hours, but after two weeks each dose does so at about 2.06 hours, a figure that needs ka, k and the 8 hours.",
  "hook": "Shorter than the first-dose tmax, because drug has accumulated.",
  "confuse": [
   "tmax",
   "dosage-interval",
   "steady-state-peak"
  ],
  "cite": "6a---Multiple-Oral-Doses.pdf, slides 7, 8, 9, 20 (PDF page numbering; deck prints no slide numbers); guide.js Module 6a objective 1 (transcript 09-28); drill Guides, 09-28",
  "src": "both"
 },
 {
  "id": "peak-to-trough-fluctuation",
  "term": "Peak-to-trough fluctuation",
  "module": 6,
  "lecture": "L09",
  "group": "Infusion and multiple dosing",
  "def": "Fluctuations between peak to trough (maximum and minimum) concentrations: increasing dose increases them, with usually no change in patient compliance; increasing the dosing interval also increases them, decreases steady-state concentrations and increases patient compliance.",
  "gist": "Swing between steady-state maximum and minimum; widened by larger doses or longer intervals.",
  "scene": "The dose is doubled while the gap between doses stays the same: the levels rise, and the difference between the highest and lowest level within each dosing period widens, with compliance usually unchanged.",
  "hook": "A shorter interval cuts into the 3 to 5 half-lives, so the level does not fall as far.",
  "confuse": [
   "steady-state-trough",
   "steady-state-peak",
   "drug-accumulation"
  ],
  "cite": "6a---Multiple-Oral-Doses.pdf, slides 12, 13, 14, 15, 16, 17, 18 (PDF page numbering; deck prints no slide numbers); guide.js Module 6a objective 2 (transcript 09-28); drill Guides, 09-28",
  "src": "both"
 }
];
