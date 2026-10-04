/* ==========================================================================
   MODULE 7a — BIOAVAILABILITY AND BIOEQUIVALENCE
   (Exam 2, lecture L10, 30 September)
   ==========================================================================
   Deck: 7a---Bioavailability-and-Bioequivalence.pdf, slides "Objectives"
   through "Summary", with her two Practice Problems (absolute, relative),
   the Bioequivalence Example graph, her In-Class Activity "Bioavailability"
   (three problems, photographed on pages 17 and 18 of the annotated deck)
   and her PollEv question on page 19. Also sourced: the 09.30 lecture
   transcript (cited as "transcript 09-30").

   Every number is hers or is computed from her inputs and says so. Her
   values: 0.55 and 182 mg (Practice Problem 1 and the equivalent oral dose);
   1.03 (Practice Problem 2); 86.58 (mg/L)hr, 0.8085 and 43.29 (mg/L)hr
   (Activity 1); 571.43 mg, rounded to 575 or 600 mg (Activity 2); 10 L,
   2 L/hr, 250 (mg/L)hr and 0.752 (Activity 3); 70 per cent (PollEv). The
   questions marked source:'slide' with an audit line are her wording with
   numbers that are not hers; their arithmetic is in the audit field.

   TOPICS is declared in q1_module1.js. Topic id here: 'bioavail' with subs
   'defs', 'factors', 'fabs', 'frel' and 'figure'. Numeric questions carry
   the skill 'bioavail'.
   ========================================================================== */

/* Sections several questions share, written once. */
const B_TERMS = {h:'The four definitions', list:[
  'Drug product performance: the release of the drug substance from the drug product, leading to bioavailability of the drug substance. If the drug does not release from the dosage form, the body cannot use it.',
  'Bioavailability: the rate and extent to which the active ingredient or active moiety is absorbed from a drug product and becomes available at the site of action.',
  'Extent is read from AUC (the area under the plasma concentration–time curve); rate is read from tmax (the time at which the peak concentration occurs).',
  'Absolute bioavailability, F<sub>abs</sub>: the bioavailability of the drug after extravascular administration (oral, PO) compared with the same drug given intravenously (IV).',
  'Relative bioavailability, F<sub>rel</sub>: the bioavailability of one drug product formulation compared with a second formulation of the same drug.',
  'Bioequivalence: the absence of a significant difference in the rate and extent to which the active ingredient or active moiety becomes available at the site of drug action, when two products are given at the same molar dose under similar conditions in an appropriately designed study.']};

const B_CMP = {h:'Absolute, relative and bioequivalent, side by side', table:{head:['', 'Absolute bioavailability', 'Relative bioavailability', 'Bioequivalence'], rows:[
  ['What is compared', 'An extravascular product against the IV dose of the same drug', 'Two formulations of the same drug', 'A test product against a reference product of the same active ingredient'],
  ['The reference, in the denominator', 'The IV AUC and the IV dose', 'Product B, the standard or comparator', 'The reference product'],
  ['What it measures', 'Extent: the fraction of the oral dose that reaches the systemic circulation', 'Extent of one product relative to the other', 'Rate and extent together'],
  ['Can the value exceed 1?', 'No: an IV dose is entirely in the circulation, so F is at most 1', 'Yes: the test product can have a larger AUC than the standard', 'Not one number: a judgement that the two products do not differ significantly']]},
  after:'A bioequivalence study is a specialized type of relative bioavailability study: it adds the rate to the extent.'};

const B_FABS = {h:'The absolute bioavailability equations', list:[
  'F<sub>abs</sub> = ({{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}})({{frac:D<sub>IV</sub>|D<sub>po</sub>}}): the ratio of the two AUCs (areas under the plasma concentration–time curve), corrected for the doses when they differ.',
  'AUC<sub>IV</sub> is the denominator because the IV (intravenous) dose is what the oral product is compared with. For an IV dose F is 1.',
  'The dose ratio is the other way up from the AUC ratio: the IV dose on top, the oral dose underneath. A larger oral dose would produce a larger AUC on its own, and the dose ratio removes that.',
  'When the oral and IV doses are the same the dose ratio is 1, and F is the AUC ratio alone.',
  'D<sub>IV</sub> = Cl × AUC<sub>IV</sub>, where Cl is clearance. Rearranged, AUC<sub>IV</sub> = {{frac:D<sub>IV</sub>|Cl}}: an IV AUC can be found from the dose and the clearance without any plasma data.',
  'F<sub>abs</sub> × D<sub>po</sub> = Cl × AUC<sub>po</sub>, so F = {{frac:Cl × AUC<sub>po</sub>|D<sub>po</sub>}} gives the same answer from the oral AUC and the clearance.',
  'All three are on the equation sheet. F is a ratio of two AUCs and two doses, so every unit cancels: F is dimensionless.']};

const B_IVAUC = {h:'Finding an IV AUC without plasma data', list:[
  'D<sub>IV</sub> = Cl × AUC<sub>IV</sub>, so AUC<sub>IV</sub> = {{frac:D<sub>IV</sub>|Cl}}.',
  'Clearance comes from Cl = k × VD, where k is the elimination rate constant and VD the apparent volume of distribution; k = {{frac:0.693|t½}} when a half-life is given.',
  'From an IV equation Cp = C0e^(-kt), the dose over C0 gives VD, and k is read from the exponent.',
  'With linear (first-order) kinetics the AUC is proportional to the dose: half the IV dose gives half the AUC.',
  'Either route works: find AUC<sub>IV</sub> and take the ratio, or put Cl × AUC<sub>po</sub> over D<sub>po</sub>. Both give the same F.']};

const B_DOSE = {h:'From F to an equivalent oral dose', list:[
  'An equivalent regimen means the same extent of exposure: the oral AUC equal to the IV AUC.',
  'With AUC<sub>po</sub> = AUC<sub>IV</sub>, the AUC ratio in F<sub>abs</sub> is 1 and the equation reduces to F = {{frac:D<sub>IV</sub>|D<sub>po</sub>}}.',
  'Rearranged: D<sub>po</sub> = {{frac:D<sub>IV</sub>|F}}. Dividing by a fraction smaller than 1 makes the oral dose larger than the IV dose, because only the fraction F of an oral dose reaches the circulation.',
  'The result is then rounded to a strength that is made. 181.8 mg becomes 182 mg, or 200 mg if 175 and 200 are the strengths available; 571.43 mg of ciprofloxacin becomes 575 or 600 mg, the marketed strengths being 250 and 500 mg.']};

const B_WHY = {h:'What the number means', list:[
  'An F of 0.55 means that of a 1000 mg tablet, 550 mg is available for the body to use; of a 1000 mg IV dose, all of it is.',
  'The oral F values met in the single-dose and multiple-dose problems have been around 0.7, 0.8 or 0.9. At 0.55 almost half the oral dose is lost, which bears on whether the oral route is the best way to give the drug.',
  'The same F converts an IV regimen to an oral one: D<sub>po</sub> = {{frac:D<sub>IV</sub>|F}}.',
  'F is written as 0.55 or as 55 per cent. It is never written .55: no leading decimals.']};

const B_FREL = {h:'Relative bioavailability', list:[
  'F<sub>rel</sub> = ({{frac:AUC<sub>A</sub>|AUC<sub>B</sub>}})({{frac:D<sub>B</sub>|D<sub>A</sub>}}), on the equation sheet.',
  'A is the product being tested; B is the reference standard or comparator, and B goes in the denominator. In the absolute case the reference standard is the IV bolus.',
  'The stem names the reference: "compared to the oral solution" puts the solution\'s AUC in the denominator.',
  'F<sub>rel</sub> can be greater than 1. The standard is whatever product set the standard, and an old product such as Bayer aspirin can have a lower bioavailability than a newer product compared against it.',
  'F<sub>rel</sub> compares extent only. Two products with the same F<sub>rel</sub> may still peak at different times, so F<sub>rel</sub> alone does not show bioequivalence.']};

const B_BE_FIG = {h:'Reading the bioequivalence example', fig:'slide_7a---Bioavailabili_p13', list:[
  'Three formulations, A, B and C, of one drug on one plot of plasma level against time, with AUC<sub>A</sub> = AUC<sub>B</sub> and AUC<sub>C</sub> = 0.5 AUC<sub>A</sub>.',
  'A and B: the same AUC, so the same extent, but B peaks later, so a different rate. Not bioequivalent.',
  'A and C: the same time of peak, so the same rate, but C has half the AUC, so a different extent. Not bioequivalent.',
  'A product whose curve sits close to A in both its peak time and its area, neither differing significantly, would be considered bioequivalent to A. The two curves do not have to be identical.']};

const B_FACT = {h:'Factors influencing bioavailability', list:[
  'Physicochemical properties of the drug and formulation.',
  'Drug stability and pH effects.',
  'Pre-systemic and first-pass metabolism.',
  'Prodrugs.',
  'Food effects.',
  'Effects of drug–drug interactions.',
  'Efflux transporters.',
  'Age: the body changes with age and its processes slow down.',
  'Disease state.'],
  after:'The first three are the ones that come to mind most often. Drugs and drug products can show low bioavailability for a variety of reasons, including formulation factors and the first-pass effect.'};

const Q_MODULE7 = [

/* ═══════════════ DEFINITIONS ═══════════════════════════════════════════ */

{id:'m7-c01', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'product-performance', skill:'recall',
 source:'both',
 stem:'What is meant by drug product performance?',
 options:[
  {t:'The release of the drug substance from the drug product, leading to bioavailability of the drug substance', correct:true,
   why:'Product performance is the first step: the drug has to leave the dosage form before anything else can happen. A tablet that does not release its drug gives no absorption and no plasma concentration–time curve, so the body cannot use the drug.'},
  {t:'The fraction of the dose that reaches the systemic circulation',
   why:'This reads product performance as bioavailability. The fraction absorbed is what bioavailability data estimate; product performance is the release from the dosage form that has to happen before absorption can start. Choosing this merges the two definitions.'},
  {t:'The time at which the peak plasma concentration occurs',
   why:'This confuses product performance with the rate of bioavailability. tmax (the time to peak) is how rate is read from the curve; product performance is whether and how the drug leaves the product at all.'},
  {t:'The absence of a significant difference between two products',
   why:'This is the definition of bioequivalence, a comparison between a test and a reference product. Product performance describes one product on its own: whether its drug substance is released.'}],
 teach:[
  {h:'The idea', list:[
    'Release from the dosage form comes before absorption, and absorption before the curve.',
    'Capsules, tablets and sustained- or modified-release forms differ in how they release drug, which is what product performance describes.']},
  B_TERMS],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Drug Product Performance"; transcript 09-30',
 quote:'Product performance is basically making sure that the drug releases from the dosage form. If the drug does not release from dosage form, then the drug will not be available for the body to use.'},

{id:'m7-c02', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'bioavail-rate-extent', skill:'recall',
 source:'both',
 stem:'Bioavailability is defined as the rate and extent to which the active ingredient is absorbed from a drug product and becomes available at the site of action. From a plasma concentration–time curve, which quantity gives the extent and which gives the rate?',
 options:[
  {t:'Extent: AUC; rate: tmax', correct:true,
   why:'The AUC (area under the plasma concentration–time curve) measures how much drug reached the circulation, which is the extent. tmax (the time of the peak) measures how fast it got there, which is the rate. Bioavailability is both, although the calculations use AUC.'},
  {t:'Extent: tmax; rate: AUC',
   why:'This swaps the two. The area under the curve counts the amount of drug that reached the circulation, which is extent; the time at which the curve peaks reports how quickly it was absorbed, which is rate.'},
  {t:'Extent: AUC; rate: the elimination half-life',
   why:'The extent is right, but the half-life belongs to elimination, not to absorption. The rate in the definition is the rate of absorption, read as the time to the peak. Choosing this attaches the rate to the wrong phase of the curve.'},
  {t:'Extent: Cmax; rate: Cmax',
   why:'Cmax (the peak concentration) rises with both a larger extent and a faster rate, so it cannot separate the two. The definition is read as AUC for extent and tmax for rate.'}],
 teach:[
  {h:'The idea', list:[
    'The textbook definition is rate and extent, although bioavailability is usually thought of as the extent.',
    'Extent: AUC. Rate: tmax.',
    'Absolute and relative bioavailability are calculated from AUCs, so they compare extent; bioequivalence asks about the rate as well.']},
  B_TERMS,
  B_CMP],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Bioavailability"; transcript 09-30',
 quote:'We think about that in terms of our AUC, right? What\'s the AUC of one dose, one dosage forms relative to another? What is the AUC? What do you think about the rate? So we think about rate in terms of T max.'},

{id:'m7-c03', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'absolute-vs-relative', skill:'tell',
 source:'both',
 stem:'What does absolute bioavailability compare?',
 options:[
  {t:'The bioavailability of a drug after extravascular administration with that of the same drug given intravenously', correct:true,
   why:'Absolute means compared with the IV (intravenous) dose, where F is 1 because the whole dose is in the circulation. The oral (extravascular) AUC is set against the IV AUC, with the doses corrected for if they differ.'},
  {t:'Two different formulations of the same drug',
   why:'This is relative bioavailability, where neither product is the IV dose and one of the two is chosen as the reference. Absolute bioavailability always has the IV dose as its reference.'},
  {t:'A test product with a reference product at the same molar dose',
   why:'This is the comparison in a bioequivalence study, which asks about rate and extent together. Absolute bioavailability is a single ratio with the IV dose as its denominator.'},
  {t:'The dose given with the amount excreted unchanged in the urine',
   why:'This reads the fraction excreted unchanged, fe, as bioavailability. fe splits elimination between the kidney and the liver; bioavailability asks how much of a dose reached the circulation at all.'}],
 teach:[
  {h:'The idea', list:[
    'Absolute: compared with the IV dose.',
    'Relative: compared with another formulation of the same drug.',
    'In both, the thing compared with sits in the denominator.']},
  B_TERMS,
  B_CMP],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability"; transcript 09-30',
 quote:'So, absolute says we are comparing basically to the IV.'},

{id:'m7-c04', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'absolute-vs-relative', skill:'tell',
 source:'both', dupOf:'m7-c03',
 stem:'A study compares the AUC of a new tablet of a drug with the AUC of the innovator\'s tablet of the same drug, both at 250 mg. Which quantity does it measure?',
 options:[
  {t:'Relative bioavailability', correct:true,
   why:'Two formulations of the same drug are compared and neither is IV (intravenous), so the ratio is relative: F<sub>rel</sub>, with the innovator product as the reference B in the denominator.'},
  {t:'Absolute bioavailability',
   why:'Absolute bioavailability needs the IV dose as the reference, because only an IV dose has F equal to 1. Comparing two oral products gives a value relative to whichever was chosen as the standard, which may itself be incompletely absorbed. Choosing this treats the innovator tablet as if it were the IV dose.'},
  {t:'Bioequivalence',
   why:'An AUC ratio alone reports the extent. Bioequivalence needs the rate as well, which this study has not looked at: the two tablets could have the same AUC and peak at different times.'},
  {t:'Drug product performance',
   why:'Product performance is the release of the drug from each dosage form, a property of one product. The study here compares two products\' AUCs, which is a relative bioavailability study.'}],
 teach:[
  {h:'The idea', list:[
    'Relative bioavailability compares two drug formulations: a new product against the innovator, a tablet against a solution.',
    'The reference is whatever product set the standard for the drug.']},
  B_CMP,
  B_FREL],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Relative Bioavailability"; transcript 09-30',
 quote:'Relative bioavailability says that we are just comparing two drug formulations. Um, we could be comparing, um, a new product on the market to the innovator part, um, product, etc. but we are comparing two different formulations of the same drug.'},

{id:'m7-c05', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'bioequivalence-def', skill:'recall',
 source:'both',
 stem:'Two drug products are bioequivalent when there is no significant difference in which two things, under what conditions?',
 options:[
  {t:'The rate and extent of availability of the active ingredient at the site of action, at the same molar dose under similar conditions', correct:true,
   why:'The definition carries both halves of bioavailability, rate and extent, and fixes the conditions: the same molar dose, similar conditions, an appropriately designed study. Absence of a significant difference is the standard, so the two products need not be identical.'},
  {t:'The AUC and the dose',
   why:'This stops at extent. Two products with the same AUC at the same dose can still differ in how fast the drug appears, and a difference in rate is enough to make them not bioequivalent.'},
  {t:'The clearance and the half-life, in the same patient',
   why:'Clearance and half-life describe elimination, which belongs to the drug and the patient and is the same whichever product is given. Bioequivalence compares what the products do to the input: how much and how fast.'},
  {t:'The excipients and the manufacturing process',
   why:'Bioequivalence is judged from what reaches the site of action, not from how the product is made. Two products with different excipients are bioequivalent if their rate and extent do not differ significantly.'}],
 teach:[
  {h:'The idea', list:[
    'Bioequivalence compares a test product with a reference product of the same active ingredient.',
    'It is a specialized type of relative bioavailability study.',
    'The two do not have to be exactly the same; they cannot be too different, in rate or in extent.']},
  B_TERMS,
  B_CMP],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Bioequivalence"; transcript 09-30',
 quote:'It\'s the absence of a significant difference. So they don\'t have to be exactly the same, but they just can\'t be too different.'},

{id:'m7-c06', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'reference-denominator', skill:'read',
 source:'both',
 stem:'In a bioavailability calculation, which product\'s AUC goes in the denominator?',
 options:[
  {t:'The reference: the IV dose for absolute bioavailability, the standard or comparator product for relative bioavailability', correct:true,
   why:'F is a ratio of the product being assessed to the one it is compared with, so the reference is always underneath. For an absolute F that is the IV (intravenous) bolus; for a relative F it is product B, the reference standard named in the stem, such as "compared to the oral solution".'},
  {t:'The product with the larger AUC',
   why:'This picks the denominator from the numbers rather than from the roles. The reference goes underneath whatever its AUC, which is why a relative F can come out above 1 when the test product has the larger area.'},
  {t:'The oral tablet, in every case',
   why:'In an absolute study the tablet is the product being assessed, so it is the numerator. The tablet is the denominator only if it is the reference in a relative study.'},
  {t:'The product given at the larger dose',
   why:'This confuses the dose correction with the AUC ratio. Doses enter through the second bracket, IV dose over oral dose; which AUC is underneath is set by which product is the reference.'}],
 teach:[
  {h:'The idea', list:[
    'The IV AUC is the denominator of F<sub>abs</sub>.',
    'Product B, the reference, is the denominator of F<sub>rel</sub>, and the question names it.',
    'The dose ratio runs the other way: the reference dose is on top.']},
  B_FABS,
  B_FREL],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slides "Absolute Bioavailability" and "Relative Bioavailability"; transcript 09-30',
 quote:'I want you to remember that the IVAUC is going to be in the denominator, right? That is what you are comparing it to.'},

{id:'m7-c07', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'f-greater-than-1', skill:'tell',
 source:'both',
 stem:'Can a bioavailability, F, be greater than 1?',
 options:[
  {t:'A relative F can; an absolute F cannot', correct:true,
   why:'An IV (intravenous) dose is entirely in the circulation, so an oral product cannot deliver more than the IV reference and F<sub>abs</sub> is at most 1. A relative F compares two formulations, and the test product can have a larger AUC than the standard, as a new product may against an old one such as Bayer aspirin.'},
  {t:'Neither can, because F is a fraction',
   why:'This carries the absolute rule over to the relative case. The relative reference is another formulation, not the IV dose, and nothing stops a new formulation being absorbed better than the one that set the standard.'},
  {t:'Both can, when the oral dose is larger than the IV dose',
   why:'This leaves the dose correction out. The dose ratio D<sub>IV</sub> over D<sub>po</sub> removes the effect of a larger oral dose, so a bigger tablet does not push an absolute F above 1.'},
  {t:'An absolute F can; a relative F cannot',
   why:'This reverses the two. The absolute F is capped at 1 by the IV reference; the relative F has no such cap because its reference is an ordinary product.'}],
 teach:[
  {h:'The idea', list:[
    'In Practice Problem 2 the tablet came out at 1.03 against the solution: a slightly higher bioavailability than the standard.',
    'Such a value is possible because the standard is whatever product set the standard, not a perfect product.',
    'Against the IV dose, F cannot exceed 1.']},
  B_CMP,
  B_FREL],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Practice Problem" (relative); transcript 09-30',
 quote:'Can we have an F greater than 1? Yes, For absolute or for relative or either, both? Relative, but what about for absolute?'},

{id:'m7-c08', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'defs', concept:'rel-f-not-bioequivalence', skill:'tell',
 source:'both',
 stem:'A tablet and an oral solution of the same drug, both 250 mg, give a relative bioavailability of 1.03. Why does this alone not show that the two products are bioequivalent?',
 options:[
  {t:'The ratio compares extent only; bioequivalence also needs the rate, which the AUCs do not give', correct:true,
   why:'A relative F is a ratio of AUCs (areas under the curve), so it says the two products deliver about the same amount of drug. Bioequivalence is the absence of a significant difference in rate and extent, and the time of the peak of each product is not known from the AUCs.'},
  {t:'Because 1.03 is greater than 1',
   why:'This reads a value above 1 as a disqualification. A relative F can be greater than 1 and still lie within an acceptable difference, because the reference is another formulation and not the IV dose. What is missing is the rate, not a number below 1.'},
  {t:'Because the doses were the same',
   why:'This treats a condition of the study as a defect in it. The same molar dose is a requirement of a bioequivalence study, not an obstacle to it. Equal doses simplify the calculation; they say nothing about whether the rates were compared.'},
  {t:'Because a solution cannot be a reference product',
   why:'This confuses which product may serve as the reference with what the study measured. The reference can be any product chosen as the standard, and an oral solution is a common one. The reason is that the study compared areas and not peak times.'}],
 teach:[
  {h:'The idea', list:[
    'Similar F values mean similar extent.',
    'Whether the two products peak at the same time is a separate question, and bioequivalence needs both.']},
  B_FREL,
  B_BE_FIG],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slides "Practice Problem" (relative) and "Bioequivalence"; transcript 09-30',
 quote:'here, these two have similar F\'s, but you don\'t know if they\'re bioequivalent because you don\'t know about the, the rate. When do, when does it peak, right?'},

/* ═══════════════ FACTORS ═══════════════════════════════════════════════ */

{id:'m7-c09', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'factors', concept:'factors-list', skill:'recall',
 source:'both', multi:true,
 stem:'Which of the following can influence the bioavailability of a drug? Select all that apply.',
 options:[
  {t:'Pre-systemic and first-pass metabolism', correct:true,
   why:'Drug metabolised in the gut wall or the liver before it reaches the systemic circulation never becomes available, so first-pass metabolism lowers F. It is one of the three factors that come to mind first.'},
  {t:'Food effects', correct:true,
   why:'Food changes what the drug meets in the gut and how fast it moves through it, so the extent and rate of absorption can change with a meal.'},
  {t:'Age and disease state', correct:true,
   why:'The body changes with age and its processes slow down, and disease can alter absorption and first-pass metabolism, so both appear on the list of factors.'},
  {t:'Efflux transporters', correct:true,
   why:'A transporter that pumps drug back out of the gut wall reduces how much is absorbed, so efflux transporters lower bioavailability.'},
  {t:'The elimination half-life',
   why:'The half-life describes how fast the body removes drug that has already reached the circulation. Bioavailability is about how much reaches it and how fast; the half-life is a property of elimination, not of the product or the absorption. Choosing this mixes the two phases of the curve.'},
  {t:'The size of the IV dose used as the reference',
   why:'The dose ratio in the equation corrects for the reference dose, so the size of the IV dose does not change the F found. The factors on the list act on the drug and its absorption, not on the arithmetic.'}],
 teach:[
  {h:'The idea', list:[
    'The physicochemical properties of the drug and formulation, pH effects and stability, and first-pass metabolism are the three that come to mind most often.',
    'The rest of the list: prodrugs, food, drug–drug interactions, efflux transporters, age and disease state.']},
  B_FACT],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Factors Influencing Bioavailability"; transcript 09-30',
 quote:'Probably the one that comes to our minds most often are kind of these first couple of things here. 1st 3 actually.'},

{id:'m7-c10', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'factors', concept:'low-f-reasons', skill:'recall',
 source:'both',
 stem:'A drug has an oral bioavailability of 0.55. Which two kinds of reason does the summary of this material give for a drug or drug product showing low bioavailability?',
 options:[
  {t:'Formulation factors and the first-pass effect', correct:true,
   why:'The summary names formulation factors, which belong to the product (release, physicochemical properties, stability), and the first-pass effect, which belongs to the body (metabolism before the drug reaches the circulation). Between them they cover why only 55 per cent of this dose becomes available.'},
  {t:'A large volume of distribution and a long half-life',
   why:'These describe where the drug goes and how long it stays once it is in the circulation. They do not alter how much of an oral dose gets there, so they do not lower F. Choosing this attaches distribution and elimination to absorption.'},
  {t:'A low clearance and a high AUC',
   why:'A low clearance raises the AUC of any dose, oral or IV, and the ratio of the two is unchanged. F is lowered by what happens before the drug reaches the circulation, not by how slowly it leaves.'},
  {t:'Too small an IV reference dose',
   why:'The dose ratio in F<sub>abs</sub> removes the effect of the reference dose, so the size of the IV dose does not lower the F found. The reasons on the summary are about the product and the first pass through the liver.'}],
 teach:[
  {h:'The idea', list:[
    'Drug product performance, bioavailability and bioequivalence are all related to a drug\'s safety and efficacy.',
    'Low bioavailability comes from formulation factors, from the first-pass effect, and from the other items on the factors list.',
    'The bioavailability of a drug can be estimated given the dose, the route of administration, the dosage form and other pharmacokinetic parameters.']},
  B_FACT,
  B_WHY],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Summary"; transcript 09-30',
 quote:'Drugs and drug products can exhibit low bioavailability for a variety of reasons including formulation factors and first-pass effect.'},

/* ═══════════════ THE BIOEQUIVALENCE FIGURE ════════════════════════════ */

{id:'m7-c11', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'figure', concept:'figure-same-auc-different-rate', skill:'read',
 source:'both', img:'slide_7a---Bioavailabili_p13',
 stem:'Three formulations, A, B and C, of one drug are plotted as plasma level against time, with AUC<sub>A</sub> = AUC<sub>B</sub> and AUC<sub>C</sub> = 0.5 AUC<sub>A</sub>. Why are formulations A and B not bioequivalent?',
 options:[
  {t:'They have the same extent of absorption but different rates: B peaks later', correct:true,
   why:'Equal AUCs mean the same amount of drug reached the circulation, so the extent matches. B\'s peak sits well to the right of A\'s, so the drug from B arrives more slowly, and bioequivalence needs the rate to match as well as the extent.'},
  {t:'They have different extents of absorption',
   why:'The areas are stated to be equal, so the extents are the same. The difference between A and B is in when they peak, which is the rate. Choosing this reads the height of the two peaks as the area under them.'},
  {t:'B was given at a larger dose',
   why:'The curves are of the same drug compared under the same conditions, and a larger dose would give B a larger AUC, not an equal one. The later, lower peak of B comes from slower absorption at the same dose.'},
  {t:'They are bioequivalent, because the AUCs are equal',
   why:'This stops at extent. The definition asks for no significant difference in rate and extent, and a product that peaks much later differs in rate however equal its area.'}],
 teach:[
  {h:'The idea', list:[
    'Same AUC, different peak time: same extent, different rate.',
    'Same peak time, different AUC: same rate, different extent.',
    'Bioequivalence needs both to match within an acceptable difference.']},
  B_BE_FIG,
  B_CMP],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Bioequivalence Example"; transcript 09-30',
 quote:'Formulation A and Formulation B have similar AUCs. OK, but they clearly peak at different times.'},

{id:'m7-c12', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'figure', concept:'figure-bioequivalent-curve', skill:'read',
 source:'both', img:'slide_7a---Bioavailabili_p13',
 stem:'On the same plot (AUC<sub>A</sub> = AUC<sub>B</sub>, AUC<sub>C</sub> = 0.5 AUC<sub>A</sub>), a fourth formulation D peaks at nearly the same time as A, slightly higher, and has nearly the same area. Which formulations are bioequivalent to A?',
 options:[
  {t:'D only', correct:true,
   why:'D matches A in both rate (its peak is at about the same time) and extent (about the same area), and neither difference is large. B matches A in extent but not rate; C matches A in rate but not extent. Only D satisfies both halves of the definition.'},
  {t:'B only',
   why:'B has the same AUC as A, which is the extent, but it peaks much later, which is a difference in rate. Choosing this reads bioequivalence as equal area alone.'},
  {t:'C only',
   why:'C peaks at the same time as A, so the rate matches, but its AUC is half of A\'s, so the extent is very different. Choosing this reads bioequivalence as the same peak time alone.'},
  {t:'B, C and D',
   why:'This treats any resemblance as bioequivalence. B fails on rate and C fails on extent; only D is close to A in both, and bioequivalence requires both.'}],
 teach:[
  {h:'The idea', list:[
    'A bioequivalent product does not have to trace A exactly.',
    'It has to be similar in rate and extent: the absence of a significant difference in both.']},
  B_BE_FIG,
  B_TERMS],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Bioequivalence Example"; transcript 09-30',
 quote:'Maybe something like that might be considered bio bioequivalent, right? Similar, not it doesn\'t have to be exactly the same, but it can\'t be very different in terms of rate and extent.'},

/* ═══════════════ ABSOLUTE BIOAVAILABILITY: CONCEPTS ═══════════════════ */

{id:'m7-c13', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'f-reporting', skill:'recall',
 source:'both', multi:true,
 stem:'A calculation gives an absolute bioavailability of 0.55013. Which of the following are acceptable ways to report it? Select all that apply.',
 options:[
  {t:'0.55', correct:true,
   why:'A decimal fraction with its leading zero is one of the two accepted forms. The leading zero is what makes it acceptable.'},
  {t:'55%', correct:true,
   why:'A percentage is the other accepted form and means the same thing: 55 per cent of the oral dose becomes available for the body to use.'},
  {t:'.55',
   why:'A number smaller than 1 written without its leading zero is a leading decimal, which is not accepted and costs half the marks for an answer. Writing this treats the leading zero as optional.'},
  {t:'0.55 mg/L',
   why:'F is a ratio of two AUCs and two doses, so every unit cancels and F is dimensionless. Attaching mg/L treats it as a concentration.'}],
 teach:[
  {h:'The idea', list:[
    'F is dimensionless; its units cancel in the ratio.',
    'Write it as 0.55 or as 55 per cent, never as .55.']},
  B_WHY,
  B_FABS],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Factors Influencing Bioavailability"; transcript 09-30',
 quote:'You can give that to me as 55%. You can give that to me as 0.55, but you cannot give that to me. Like so, OK, just a little reminder, there should be no leading decimals, OK?',
 audit:'The captions render her rule as "55% is fine, 0.55% is fine ... but 0.55 is not fine"; her written example on the slide is 0.55 and the rule she states is "no leading decimals", so the rejected form is .55 and 0.55 is accepted. The 0.55% in the captions is read as a garble of 0.55 and is not offered as an option.'},

{id:'m7-c14', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'equiv-dose-relation', skill:'read',
 source:'both',
 stem:'A patient on an IV dose is to be sent home on an oral dose of the same drug that gives an equivalent therapeutic effect. What does the absolute bioavailability equation reduce to, and why?',
 options:[
  {t:'F = D<sub>IV</sub>/D<sub>po</sub>, because an equivalent effect means equal AUCs, so the AUC ratio is 1', correct:true,
   why:'An equivalent regimen means the same extent of exposure, which is the same AUC (area under the curve) by either route. With AUC<sub>po</sub> = AUC<sub>IV</sub> the first bracket of F<sub>abs</sub> is 1 and only the dose ratio is left, which rearranges to D<sub>po</sub> = D<sub>IV</sub> over F.'},
  {t:'F = D<sub>po</sub>/D<sub>IV</sub>, because the oral dose is larger',
   why:'This inverts the dose ratio. The oral dose is larger, so D<sub>po</sub> over D<sub>IV</sub> would be greater than 1, which an absolute F cannot be. The IV dose stays on top, and dividing it by F is what makes the oral dose larger.'},
  {t:'F = AUC<sub>po</sub>/AUC<sub>IV</sub>, because the doses are equal',
   why:'This has the equality on the wrong bracket. The doses are what is being solved for, so they are not equal; it is the AUCs that are set equal to make the two regimens equivalent.'},
  {t:'F = Cl × AUC<sub>IV</sub>, because clearance links dose to AUC',
   why:'Cl × AUC<sub>IV</sub> is the IV dose, not F. Clearance does link each dose to its AUC, but when the two AUCs are equal the clearance cancels and the dose ratio alone remains.'}],
 teach:[
  {h:'The idea', list:[
    'Same therapy means the same extent, so the AUCs are set equal.',
    'F then equals the IV dose over the oral dose, and the oral dose is the IV dose divided by F.',
    'The oral dose is expected to be larger than the IV dose.']},
  B_DOSE,
  B_FABS],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability" (equations); transcript 09-30',
 quote:'Here, if we want our AUCs to be similar. Then this reduces down to where F is equal to DIV over DPO.'},

{id:'m7-c15', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'fabs-two-aucs', skill:'bioavail',
 source:'both',
 stem:'What is the bioavailability of a 500 mg tablet which yielded an AUC of 115 (mg/L)hr compared to a 400 mg IV bolus dose that yielded an AUC of 132 (mg/L)hr?',
 options:[
  {t:'50%',
   why:'This comes from the dose ratio the wrong way up, or from reading the two AUCs as 115 of 132 and then taking off more for the larger tablet. (115 ÷ 132)(400 ÷ 500) is 0.697, not 0.50.'},
  {t:'70%', correct:true,
   why:'F = ({{frac:115|132}})({{frac:400|500}}) = 0.871 × 0.8 = 0.697, which is 70 per cent. The IV AUC is the denominator, and the IV dose is on top of the dose ratio because the tablet was the larger dose.'},
  {t:'85%',
   why:'115 over 132 alone is 0.871. Stopping there leaves out the dose correction: the tablet was 500 mg against 400 mg IV, so its AUC has to be scaled down by 400 over 500 before the two can be compared.'},
  {t:'92%',
   why:'This has the dose ratio inverted: (115 ÷ 132)(500 ÷ 400) = 1.09, which would be rounded down to look plausible. The IV dose goes on top; a larger oral dose makes F smaller, not larger.'}],
 teach:[
  {h:'The idea', list:[
    'Compare the AUCs with the IV AUC underneath, then correct for the doses with the IV dose on top.',
    '(115 ÷ 132)(400 ÷ 500) = 0.697: about 70 per cent.',
    'The wording does not change much from one version of this question to the next; the numbers do.']},
  B_FABS],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, PollEv question page 19; transcript 09-30',
 quote:'Most of you guys thought 70%. OK. OK. Straightforward. OK. So, If I change up the numbers, we\'re all gonna get this, right? Cause there\'s not a whole lot I can do with the wording here.',
 audit:'Her PollEv question with its four options; the class answer she confirmed was 70%. (115/132)(400/500) = 0.69697.'},

/* ═══════════════ PRACTICE PROBLEMS ON THE SLIDES ══════════════════════ */

{id:'m7-n01', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'fabs-two-aucs', skill:'bioavail',
 source:'both',
 stem:'The bioavailability of an investigational drug was studied in 6 volunteers. Each volunteer received either a single oral tablet containing 250 mg of the drug or a single IV bolus injection containing 100 mg of the drug. The average AUC of the oral tablet was 101.5 (mcg/mL)hr and the average AUC of the IV bolus injection was 73.8 (mcg/mL)hr. What is the absolute bioavailability of the drug from the tablet?',
 units:'(as a decimal fraction)',
 answer:0.55,
 tol:0.006,
 steps:[
  {k:'setup', t:'F<sub>abs</sub> = ({{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}})({{frac:D<sub>IV</sub>|D<sub>po</sub>}})',
   why:'Absolute bioavailability compares the tablet with the IV (intravenous) bolus, so the IV AUC (area under the curve) is the denominator. The doses differ, 250 mg against 100 mg, so the dose ratio is needed, with the IV dose on top.'},
  {k:'unit', t:'Both AUCs are in (mcg/mL)hr and both doses in mg, so the units cancel',
   why:'The AUC ratio is (mcg/mL)hr over (mcg/mL)hr and the dose ratio is mg over mg. Nothing is left, so F is dimensionless and the units can be dropped from the working.'},
  {k:'algebra', t:'F = ({{frac:101.5|73.8}})({{frac:100 mg|250 mg}}) = 1.3753 × 0.4 = 0.5501',
   why:'The tablet\'s AUC is larger than the IV AUC only because its dose was two and a half times larger. Multiplying by 100 over 250 scales the tablet\'s area to what a 100-mg tablet would have given, and that is 55 per cent of the IV area.'},
  {k:'round', t:'F = 0.55',
   why:'Her value, 0.55: 55 per cent of the oral dose is available for the body to use, against all of an IV dose. Written as 0.55 or as 55 per cent, both are accepted; the F carries into the next part, the equivalent oral dose.'}],
 teach:[
  {h:'The idea', list:[
    'The IV AUC underneath, the IV dose on top.',
    'Without the dose ratio the answer would be 1.38, an absolute F above 1, which is impossible.']},
  B_FABS,
  B_WHY],
 note:'Write F as 0.55 or as 55%, never as .55: there should be no leading decimals.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Practice Problem" (absolute); transcript 09-30',
 quote:'So the AUC of the oral was 101.5 mcg per mL times hour and for the bolus was 73.8, same units. And then our doses here, our dose of the IV is going to be in the numerator so our IV dose was 100 mg. And our oral dose was 250 mg. Right. And I\'m hearing 0.55.'},

{id:'m7-n02', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'equiv-oral-dose', skill:'bioavail',
 source:'both',
 stem:'The absolute bioavailability of a drug from an oral tablet was found to be 0.55. A patient is receiving 100 mg of the drug by IV bolus. What oral dose of the tablet would be equivalent to the 100 mg IV dose?',
 units:'mg',
 answer:181.8,
 tol:1.2,
 steps:[
  {k:'setup', t:'Equivalent therapy: AUC<sub>po</sub> = AUC<sub>IV</sub>, so F = {{frac:D<sub>IV</sub>|D<sub>po</sub>}}',
   why:'The same therapeutic effect means the same extent of exposure, which is the same AUC (area under the curve). With the AUC ratio equal to 1, the absolute bioavailability equation leaves only the dose ratio.'},
  {k:'algebra', t:'D<sub>po</sub> = {{frac:D<sub>IV</sub>|F}}',
   why:'Multiply both sides by D<sub>po</sub> and divide by F. Dividing the IV dose by a fraction smaller than 1 gives a larger oral dose, as expected: only 55 per cent of what is swallowed reaches the circulation, so more has to be swallowed.'},
  {k:'algebra', t:'D<sub>po</sub> = {{frac:100 mg|0.55}} = 181.8 mg',
   why:'F is dimensionless, so milligrams divided by it stay milligrams. The oral dose is 1.82 times the IV dose, the reciprocal of 0.55.'},
  {k:'round', t:'D<sub>po</sub> = 182 mg, to be rounded to a strength that exists',
   why:'Her value, 182 mg from 181.818. A tablet of 181.8 mg is not made, so the prescribed dose is rounded to a strength that is: 200 mg if 175 and 200 are the strengths available. The calculated figure is the one keyed here.'}],
 teach:[
  {h:'The idea', list:[
    'This is what the F is for: converting an IV regimen to an oral one.',
    'Oral dose = IV dose divided by F, and it is larger than the IV dose.',
    'Then round to a strength that is made.']},
  B_DOSE,
  B_WHY],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability" (equations), worked after the Practice Problem; transcript 09-30',
 quote:'182 mg, right? And if we\'re talking a PO dose because you probably got like 182.137, right, we\'re gonna come up with something that makes sense. We might round it to 200 if there\'s a 175 or something that makes sense as opposed to 181.',
 audit:'The stem is her follow-up to Practice Problem 1, asked in words and worked on the equation slide: D_po = D_IV/F = 100/0.55 = 181.818 mg, which she calls 182 mg. In the talk she first says the patient is on 250 mg IV and then asks for the equivalent of "the 100 mg IV"; the written working uses 100 mg, and so does this question. Her "182.137" is a figure a student would get carrying 0.5501 wrongly; 100/0.55013 = 181.77.'},

{id:'m7-n03', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'frel', concept:'frel-calc', skill:'bioavail',
 source:'both',
 stem:'The relative bioavailability of an investigational drug was studied in 6 volunteers. Each volunteer received either a single oral tablet containing 250 mg of the drug or 5 mL of a pure aqueous solution containing 250 mg of the drug. The average AUC of the oral tablet was 101.5 (mcg/mL)hr and the average AUC of the oral solution was 98.76 (mcg/mL)hr. What is the relative bioavailability of the drug from the tablet compared to the oral solution?',
 units:'(as a decimal fraction)',
 answer:1.03,
 tol:0.006,
 steps:[
  {k:'setup', t:'F<sub>rel</sub> = ({{frac:AUC<sub>A</sub>|AUC<sub>B</sub>}})({{frac:D<sub>B</sub>|D<sub>A</sub>}}), with A the tablet and B the solution',
   why:'"Compared to the oral solution" makes the solution the reference, B, so its AUC (area under the curve) goes in the denominator. Neither product is IV, so this is a relative, not an absolute, bioavailability.'},
  {k:'unit', t:'Both doses are 250 mg, so {{frac:D<sub>B</sub>|D<sub>A</sub>}} = 1; both AUCs are in (mcg/mL)hr',
   why:'With equal doses the dose correction is 1 and drops out. The AUC units cancel in the ratio, so F<sub>rel</sub> is dimensionless.'},
  {k:'algebra', t:'F<sub>rel</sub> = {{frac:101.5|98.76}} = 1.0277',
   why:'The tablet\'s area is slightly larger than the solution\'s, so the ratio is slightly above 1: the tablet has a slightly greater bioavailability than the standard it is compared with.'},
  {k:'round', t:'F<sub>rel</sub> = 1.03',
   why:'Her value, 1.03. A relative F may exceed 1, because the reference is another formulation rather than the IV dose. The two products have similar extents; whether they are bioequivalent is not known, because their peak times are not.'}],
 teach:[
  {h:'The idea', list:[
    'The stem names the reference, and the reference goes underneath.',
    'Equal doses mean the dose ratio is 1.',
    'An answer above 1 is allowed for a relative F.']},
  B_FREL,
  B_CMP],
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Practice Problem" (relative); transcript 09-30',
 quote:'So that tells you that the oral solution, the AUC, the oral solution is going to be in the denominator. And notice that the doses are the same.'},

/* ═══════════════ IN-CLASS ACTIVITY, BIOAVAILABILITY ═══════════════════ */

{id:'m7-n04', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'fabs-from-clearance', skill:'bioavail',
 source:'both',
 stem:'After oral administration of a single 500 mg tablet of an antihypertensive drug to a normal volunteer, the calculated AUC was 70 mg h/L. Following a 500 mg IV bolus dose of the same drug to the same volunteer, the elimination half-life was 3 hours and the apparent volume of distribution was 25 L. What is the absolute bioavailability of this oral tablet in this volunteer?',
 units:'(as a decimal fraction)',
 answer:0.81,
 tol:0.01,
 steps:[
  {k:'unit', t:'k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹; Cl = k × VD = (0.231 hr⁻¹)(25 L) = 5.775 L/hr',
   why:'No IV AUC is given, so it has to be built from the IV data. The half-life gives k, the elimination rate constant, and k times VD (the apparent volume of distribution) is the clearance, in litres per hour.'},
  {k:'setup', t:'AUC<sub>IV</sub> = {{frac:D<sub>IV</sub>|Cl}}',
   why:'D<sub>IV</sub> = Cl × AUC<sub>IV</sub> is on the equation sheet: clearance is the constant that relates a dose to its area. Rearranged, the IV dose over the clearance is the IV AUC.'},
  {k:'algebra', t:'AUC<sub>IV</sub> = {{frac:500 mg|(25 L)(0.231 hr⁻¹)}} = {{frac:500 mg|5.775 L/hr}} = 86.58 (mg/L)hr',
   why:'mg over L/hr is mg·hr/L, the unit of an AUC. This is the area the same 500 mg would give if all of it were in the circulation.'},
  {k:'algebra', t:'F = ({{frac:70|86.58}})({{frac:500 mg|500 mg}}) = 0.8085',
   why:'The doses are equal, so the dose ratio is 1 and F is the AUC ratio alone. The same answer comes from F = {{frac:Cl × AUC<sub>po</sub>|D<sub>po</sub>}} = {{frac:(70)(25)(0.231)|500}} = 0.8085; either route works.'},
  {k:'round', t:'F = 0.81',
   why:'Her value, about 81 per cent. F is dimensionless because every unit cancelled. Written as 0.81 or 81 per cent.'}],
 teach:[
  {h:'The idea', list:[
    'When the IV AUC is not given, clearance supplies it: AUC<sub>IV</sub> = D<sub>IV</sub> over Cl.',
    'Then the ordinary ratio, with the dose correction equal to 1 because both doses were 500 mg.']},
  B_IVAUC,
  B_FABS],
 audit:'Activity sheet not posted in Drive; the stem is transcribed from the photograph on page 17 of the annotated deck. Her written working: AUC_IV = 500 mg/(25 L × 0.231 hr⁻¹) = 86.58 (written "mg/L", spoken "mg per liter times hour"); F = 70/86.58 = 0.8085; and by the second route F = (70)(25 L)(0.231 hr⁻¹)/500 mg = 0.8085. Recomputed: k = 0.231, AUC_IV = 86.580, F = 0.80851.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, In-Class Activity page 17, question 1(a); transcript 09-30',
 quote:'So I\'m getting about 81%. And recognize that F is a dimensionless number, right? Cause all of our units are are canceling.'},

{id:'m7-n05', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'auc-proportional-to-dose', skill:'bioavail',
 source:'both',
 stem:'A drug has an elimination half-life of 3 hours and an apparent volume of distribution of 25 L; a 500 mg IV bolus dose gives an AUC of 86.58 (mg/L)hr. What is the expected AUC after administration of a single IV bolus dose of 250 mg to the same volunteer?',
 units:'(mg/L)hr',
 answer:43.29,
 tol:0.3,
 steps:[
  {k:'setup', t:'AUC<sub>IV</sub> = {{frac:D<sub>IV</sub>|Cl}}, with Cl = k × VD unchanged',
   why:'Clearance belongs to the drug and the patient, not to the dose, so the same relation holds with the new dose. The area is proportional to the dose when kinetics are linear (first order).'},
  {k:'algebra', t:'AUC<sub>IV</sub> = {{frac:250 mg|(25 L)(0.231 hr⁻¹)}} = {{frac:250 mg|5.775 L/hr}} = 43.29 (mg/L)hr',
   why:'Half the dose over the same clearance gives half the area. mg over L/hr leaves (mg/L)hr.'},
  {k:'round', t:'AUC<sub>IV</sub> = 43.29 (mg/L)hr',
   why:'Her value, 43.29: half of the 86.58 found for 500 mg, as expected. With linear pharmacokinetics a proportional change in the dose gives a proportional change in the AUC and in the concentrations.'}],
 teach:[
  {h:'The idea', list:[
    'Half the dose, half the AUC: the expected answer before any arithmetic.',
    'The arithmetic confirms it because Cl is the same for both doses.']},
  B_IVAUC],
 audit:'Stem transcribed from the photograph on page 17 of the annotated deck; her written working is AUC = 250 mg/((25 L)(0.231 hr⁻¹)) = 43.29 (mg/L)hr. Recomputed: 43.290.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, In-Class Activity page 17, question 1(b); transcript 09-30',
 quote:'What do you expect it to be? Half, right? ... Because we expect for our linear pharmacokinetics, a proportional increase, decrease, or whatever, change. In the AUC as well as the concentration as we change the dose.'},

{id:'m7-n06', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'equiv-oral-dose', skill:'bioavail',
 source:'both',
 stem:'Ciprofloxacin is a fluoroquinolone with several FDA-labeled indications. It is available for oral as well as IV administration. The bioavailability of the immediate release oral dosage form is reported to be 70%. What would be an appropriate oral dose to achieve the same extent of absorption as a 400 mg IV bolus dose?',
 units:'mg',
 answer:571.43,
 tol:4,
 steps:[
  {k:'setup', t:'Same extent of absorption: AUC<sub>po</sub> = AUC<sub>IV</sub>, so F = {{frac:D<sub>IV</sub>|D<sub>po</sub>}}',
   why:'The same extent means the same AUC (area under the curve) by both routes. With equal AUCs the absolute bioavailability equation reduces to the dose ratio.'},
  {k:'unit', t:'F = 70% = 0.70',
   why:'The percentage is converted to a decimal fraction before it is used in the equation: 70 per cent of each oral dose reaches the circulation.'},
  {k:'algebra', t:'D<sub>po</sub> = {{frac:D<sub>IV</sub>|F}} = {{frac:400 mg|0.70}} = 571.43 mg',
   why:'Dividing the IV dose by 0.70 gives an oral dose about 1.43 times larger, so that 70 per cent of it equals the 400 mg delivered intravenously.'},
  {k:'round', t:'D<sub>po</sub> = 571.43 mg, prescribed as a strength that exists, 575 or 600 mg',
   why:'Her value, 571.43 mg, is the number to get, and it is not a strength of ciprofloxacin: the marketed strengths are 250 and 500 mg. The dose is rounded to something that can be given, 600 mg or 575 mg; the calculated figure is the one keyed here.'}],
 teach:[
  {h:'The idea', list:[
    'IV to oral: divide the IV dose by F.',
    'Then round to a strength that is made.']},
  B_DOSE,
  B_FABS],
 note:'A dose written for the patient is rounded to a strength that exists; 575 mg and 600 mg were both accepted for this problem.',
 audit:'Stem transcribed from the photograph on page 18 of the annotated deck. Her written working: D_po = D_IV/F = 400 mg/0.70 = 571.43 mg, then "575 mg or 600 mg or 570 mg" written beside it; in the talk she names 600 and 575 and says 571.43 "won\'t be judged real hard". Recomputed: 571.429. The tolerance of 4 accepts 567.4 to 575.4, so 575 passes and 600 does not.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, In-Class Activity page 18, question 2; transcript 09-30',
 quote:'So 400 mg divided by 0.7. And you probably came up with something like 571.43 mg, which, you know, is not gonna be um a strength of Cipro.'},

{id:'m7-n07', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'cl-from-iv-equation', skill:'bioavail',
 source:'both',
 stem:'The equation for concentration of drug in the plasma as a function of time following a 500 mg IV bolus dose was found to be Cp = 50e^(−0.2t). What is the clearance of the drug?',
 units:'L/hr',
 answer:2,
 tol:0.05,
 steps:[
  {k:'setup', t:'Cp = C0e^(-kt): C0 = 50 mg/L and k = 0.2 hr⁻¹',
   why:'The IV bolus equation is read directly: the number in front is C0, the concentration at time zero, and the number in the exponent is k, the elimination rate constant.'},
  {k:'algebra', t:'VD = {{frac:D<sub>IV</sub>|C0}} = {{frac:500 mg|50 mg/L}} = 10 L',
   why:'The apparent volume of distribution comes from the dose over C0: mg over mg/L leaves litres. The whole dose is in the body at time zero after a bolus, so it is the only moment the amount is known exactly.'},
  {k:'algebra', t:'Cl = k × VD = (0.2 hr⁻¹)(10 L) = 2 L/hr',
   why:'Clearance is the rate constant times the volume: hr⁻¹ times L gives L/hr. This clearance is what relates the dose to its AUC in the next part.'},
  {k:'round', t:'Cl = 2 L/hr',
   why:'Her value, 2 L per hour, with the 10 L volume from 500 mg over 50 mg/L.'}],
 teach:[
  {h:'The idea', list:[
    'An IV equation hands over C0 and k.',
    'VD from the dose and C0; Cl from k and VD.']},
  B_IVAUC],
 audit:'Stem transcribed from the photograph on page 18 of the annotated deck. Her written working: Cl = k·VD, VD = D/C0 = 500 mg/50 mg/L = 10 L, Cl = 0.2 × 10 L = 2 L/hr. Recomputed: 2.0.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, In-Class Activity page 18, question 3(a); transcript 09-30',
 quote:'Part A asks what\'s the clearance, and you should have gotten something like 2 L per hour. Right. The 10 L volume of distribution comes from the dose, that 500 mg divided by RC0.'},

{id:'m7-n08', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'auc-from-dose-and-cl', skill:'bioavail',
 source:'both',
 stem:'A 500 mg IV bolus dose of a drug gives Cp = 50e^(−0.2t), and the clearance of the drug is 2 L/hr. What is the AUC of the drug following this 500 mg IV bolus dose?',
 units:'(mg/L)hr',
 answer:250,
 tol:2,
 steps:[
  {k:'setup', t:'D<sub>IV</sub> = Cl × AUC<sub>IV</sub>, so AUC<sub>IV</sub> = {{frac:D<sub>IV</sub>|Cl}}',
   why:'Clearance is the link between a dose and the area it produces: the dose is the clearance times the AUC (area under the curve). Rearranging gives the area from the dose and the clearance, with no plasma data and no trapezoids.'},
  {k:'algebra', t:'AUC<sub>IV</sub> = {{frac:500 mg|2 L/hr}} = 250 (mg/L)hr',
   why:'mg over L/hr leaves mg·hr/L, which is the unit of an AUC. The same figure follows from C0 over k, 50 over 0.2, for a one-compartment bolus.'},
  {k:'round', t:'AUC<sub>IV</sub> = 250 (mg/L)hr',
   why:'Her value, 250 mg per litre times hour. It is the denominator for the oral bioavailability in the next part.'}],
 teach:[
  {h:'The idea', list:[
    'The dose divided by the clearance just found gives the IV AUC.',
    'There is more than one route to it; this is the shortest.']},
  B_IVAUC,
  B_FABS],
 audit:'Stem transcribed from the photograph on page 18 of the annotated deck. Her written working: AUC_IV = 500 mg/(2 L/hr) = 250 (mg/L)hr. Recomputed: 250.0.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, In-Class Activity page 18, question 3(b); transcript 09-30',
 quote:'the AUC of the drug following this 500 mg dose, you could take that dose and divide by the clearance that you just found. And you should get 250 mg per liter times an hour.'},

{id:'m7-n09', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'fabs-two-aucs', skill:'bioavail',
 source:'both',
 stem:'A 500 mg IV bolus dose of a drug gives an AUC of 250 (mg/L)hr. If the AUC following a 500-mg oral tablet dose was found to be 188 mcg hr/mL, what is the oral bioavailability of the drug from the tablet?',
 units:'(as a decimal fraction)',
 answer:0.752,
 tol:0.01,
 steps:[
  {k:'setup', t:'F<sub>abs</sub> = ({{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}})({{frac:D<sub>IV</sub>|D<sub>po</sub>}})',
   why:'The tablet is compared with the IV bolus of the same drug, so this is an absolute bioavailability with the IV AUC (area under the curve) underneath.'},
  {k:'unit', t:'188 mcg hr/mL = 188 (mg/L)hr, because mcg/mL and mg/L are the same concentration',
   why:'One microgram per millilitre is one milligram per litre, so the two AUCs are already in the same unit and cancel. The doses are both 500 mg, so the dose ratio is 1.'},
  {k:'algebra', t:'F = {{frac:188|250}} = 0.752',
   why:'With equal doses F is the AUC ratio alone. The same answer comes from F = {{frac:Cl × AUC<sub>po</sub>|D<sub>po</sub>}} = {{frac:(2 L/hr)(188 (mg/L)hr)|500 mg}} = 0.752.'},
  {k:'round', t:'F = 0.75',
   why:'Her value, 75 per cent. Written as 0.75 or as 75 per cent; three quarters of the tablet dose becomes available for the body to use.'}],
 teach:[
  {h:'The idea', list:[
    'Equal doses, so F is simply the oral AUC over the IV AUC.',
    'Either the AUC ratio or Cl × AUC<sub>po</sub> over D<sub>po</sub>; both give 0.752.']},
  B_FABS,
  B_WHY],
 audit:'Stem transcribed from the photograph on page 18 of the annotated deck; the sheet prints the oral AUC as "188 mcg hr/mL" while part (b) is in (mg/L)hr, and the two units are equal. Her written working: F = (188 mg·hr/L)(2 L/hr)/500 mg = 0.752. Recomputed: 0.752.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, In-Class Activity page 18, question 3(c); transcript 09-30',
 quote:'so then the F would be, since the doses are the same, 188 divided by 250, you should get 75%.'},

/* ═══════════════ VARIANTS IN HER WORDING, NUMBERS CHANGED ═════════════ */

{id:'m7-n10', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'fabs-two-aucs', skill:'bioavail',
 source:'slide', dupOf:'m7-n01',
 stem:'The bioavailability of an investigational drug was studied in 6 volunteers. Each volunteer received either a single oral tablet containing 300 mg of the drug or a single IV bolus injection containing 100 mg of the drug. The average AUC of the oral tablet was 90.6 (mcg/mL)hr and the average AUC of the IV bolus injection was 45.3 (mcg/mL)hr. What is the absolute bioavailability of the drug from the tablet?',
 units:'(as a decimal fraction)',
 answer:0.67,
 tol:0.006,
 steps:[
  {k:'setup', t:'F<sub>abs</sub> = ({{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}})({{frac:D<sub>IV</sub>|D<sub>po</sub>}})',
   why:'The tablet is compared with the IV bolus, so the IV AUC (area under the curve) is the denominator, and because the doses differ the dose ratio is needed with the IV dose on top.'},
  {k:'unit', t:'Both AUCs in (mcg/mL)hr, both doses in mg: the units cancel',
   why:'The AUC ratio is (mcg/mL)hr over (mcg/mL)hr and the dose ratio is mg over mg, so nothing is left. F is a ratio of like quantities and carries no unit, which is why the units can be left out of the working.'},
  {k:'algebra', t:'F = ({{frac:90.6|45.3}})({{frac:100 mg|300 mg}}) = 2 × 0.3333 = 0.6667',
   why:'The tablet\'s AUC is twice the IV AUC only because its dose was three times larger. Scaling by 100 over 300 gives two thirds of the IV area for the same dose.'},
  {k:'round', t:'F = 0.67',
   why:'Two thirds of the oral dose is available for the body to use, against all of an IV dose. Written as 0.67 or 67 per cent, never .67; the unrounded 0.667 is also accepted.'}],
 teach:[
  {h:'The idea', list:[
    'IV AUC underneath, IV dose on top.',
    'Leaving the dose ratio out would give 2, an absolute F above 1, which is impossible.']},
  B_FABS,
  B_WHY],
 audit:'Her Practice Problem 1 wording with numbers that are not hers (300 mg, 90.6 and 45.3). Arithmetic: (90.6/45.3)(100/300) = 2 × 0.33333 = 0.66667, keyed 0.67 with tolerance 0.006 so 0.667 also passes.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Practice Problem" (absolute); transcript 09-30',
 quote:'If I change up the numbers, we\'re all gonna get this, right? Cause there\'s not a whole lot I can do with the wording here.'},

{id:'m7-n12', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'frel', concept:'frel-calc', skill:'bioavail',
 source:'slide', dupOf:'m7-n03',
 stem:'The relative bioavailability of an investigational drug was studied in 6 volunteers. Each volunteer received either a single oral tablet containing 500 mg of the drug or 10 mL of a pure aqueous solution containing 500 mg of the drug. The average AUC of the oral tablet was 61.2 (mcg/mL)hr and the average AUC of the oral solution was 68.0 (mcg/mL)hr. What is the relative bioavailability of the drug from the tablet compared to the oral solution?',
 units:'(as a decimal fraction)',
 answer:0.9,
 tol:0.006,
 steps:[
  {k:'setup', t:'F<sub>rel</sub> = ({{frac:AUC<sub>A</sub>|AUC<sub>B</sub>}})({{frac:D<sub>B</sub>|D<sub>A</sub>}}), with A the tablet and B the solution',
   why:'"Compared to the oral solution" makes the solution the reference B, so its AUC (area under the curve) is the denominator.'},
  {k:'unit', t:'Both doses are 500 mg, so the dose ratio is 1; both AUCs are in (mcg/mL)hr',
   why:'Equal doses remove the dose correction, and the AUC units cancel.'},
  {k:'algebra', t:'F<sub>rel</sub> = {{frac:61.2|68.0}} = 0.90',
   why:'The tablet\'s area is smaller than the solution\'s, so the ratio is below 1: the tablet delivers 90 per cent of the extent the solution does.'},
  {k:'round', t:'F<sub>rel</sub> = 0.90',
   why:'Written as 0.90 or 90 per cent. The extents are similar; whether the two products are bioequivalent would also need their peak times.'}],
 teach:[
  {h:'The idea', list:[
    'The reference named in the question goes underneath.',
    'A relative F below 1 means the test product delivers less than the standard; above 1, more.']},
  B_FREL],
 audit:'Her Practice Problem 2 wording with numbers that are not hers (500 mg, 10 mL, 61.2 and 68.0). Arithmetic: (61.2/68.0)(500/500) = 0.90000.',
 cite:'7a---Bioavailability-and-Bioequivalence.pdf, slide "Practice Problem" (relative); transcript 09-30',
 quote:'What is the relative bioavailability of the drug from the tablet compared to the oral solution. So that tells you that the oral solution, the AUC, the oral solution is going to be in the denominator.'},

];
