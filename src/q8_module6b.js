/* ==========================================================================
   MODULE 6 — MULTIPLE DOSING, PART 2: INTERMITTENT IV INFUSIONS AND
   MULTIPLE ORAL DOSES
   (Exam 2, lectures L08 and L09, 28 September)
   ==========================================================================
   Decks: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides
   "Intermittent Intravenous Infusions" through "Summary" (Example 4), and
   6a---Multiple-Oral-Doses.pdf (Example 1, the tetracycline problem).
   Also sourced: Basic Pharmacokinetics - 09.28 Lecture.txt, and her In-Class
   Activity sheet "Multiple IV Infusions" (two problems), which is not posted
   in Drive: its stems are read from the photographs on the annotated deck,
   and its answers are the ones she confirmed aloud (22.2 and "eleven-ish")
   or are recomputed from its printed inputs, as each audit field states.

   Every number is hers or is computed from her inputs and says so. Her
   spoken values: 17.28 and 13.33 mg/L (Example 4); 6.26 and 39.37 mg/L
   (Activity 2); 3.1 hr, 1.35 mg/L, 2.06 hr, 3.3 mg/L and "2.4-ish" mg/L
   (tetracycline). Values she did not state are computed from the stated
   inputs and carry an audit note.

   TOPICS is declared in q1_module1.js. Topic ids here: 'intermit' with
   subs 'why' and 'add'; 'multoral' with subs 'oeq', 'ossc' and 'oparam'.
   ========================================================================== */

/* Sections several questions share, written once. */
const B_INF = {h:'What one infusion does (Module 3)', list:[
  'An infusion puts drug in at a constant rate R, in mg/hr. A constant-rate input is called zero order.',
  'The body removes drug by first-order elimination: the rate out is k (the elimination rate constant) times the amount in the body.',
  'So the concentration rises, and the rise slows as it goes, because the rate out grows as drug builds up.',
  'During the infusion: Cp = {{frac:R|VD k}} (1 - e^(-kt)), where VD is the apparent volume of distribution.',
  '{{frac:R|VD k}} equals {{frac:R|Cl}}, where Cl is clearance. It is Css, the steady-state concentration the infusion would reach if it ran forever.',
  '(1 - e^(-kt)) is the fraction of Css reached after infusing for a time t. Here t is the infusion time.',
  'R is the dose divided by the infusion duration.',
  'When the infusion stops, no more drug goes in, and only first-order elimination is left.',
  'After it stops: C = Cpeak e^(-kt). Cpeak is the concentration at the moment the infusion ended, and t is the time since it ended, not since it started.']};

const B_INF_SUM = [
  {h:'Why two infusions can be added', list:[
    'With first-order (linear) kinetics, each dose behaves as if the other were not there, so their concentrations add. This is superposition.',
    'Superposition rests on the same assumptions as for repeated IV (intravenous) bolus doses: first-order elimination, and a half-life and clearance that do not change with more doses.',
    'So the same drug at the same rate for the same duration reaches the same Cpeak (end-of-infusion concentration) every time.']},
  {h:'Reading the time line', list:[
    'Before any arithmetic, mark when each infusion starts, when it ends, and the time asked for.',
    'For example, four hours after the second infusion stops is 8 + 4 = 12 hours after the first started.',
    'Each dose then gets its own t, measured from the end of that dose.'], table:{head:['Time', 'What is happening', 'Equation in force'], rows:[
    ['0 to 2 hr', 'Dose 1 infusing', '{{frac:R|VD k}} (1 - e^(-kt)), t up to 2 hr'],
    ['2 to 6 hr', 'Dose 1 declining', 'Cpeak e^(-kt), t from 2 hr'],
    ['6 to 8 hr', 'Dose 2 infusing while dose 1 keeps declining', 'The infusion equation for dose 2, added to the leftover of dose 1'],
    ['8 to 12 hr', 'Both declining', 'Cpeak e^(-k(t - 2)) + Cpeak e^(-k(t - 8))']]}, after:'If the same rate ran without stopping, the plateau would be Css = {{frac:R|Cl}}.'}];

const B_INF_ERR = {h:'The common errors', list:[
  'Using 4 hours, or 12, as t for both doses. At the 12-hour mark t is 10 hours for dose 1 and 4 hours for dose 2, because each t runs from when that dose stopped.',
  'Using 6 hours in the infusion equation. The (1 - e^(-kt)) term applies only while drug is going in, so its t is the infusion time, 2 hours, for every infusion in the series.',
  'Dropping the leftover of dose 1. At 12 hours it still contributes 3.86 of the 13.34 mg/L, about 29 per cent of the total.']};

const B_INF_FIG = [
  {h:'Her Example 4 drawn out', fig:'two_infusions', list:[
    '300 mg is infused over 2 hours, so R = 150 mg/hr.',
    'k is 0.15 hr⁻¹ and VD is 15 L, so Cl = 2.25 L/hr and {{frac:R|Cl}} = 66.67 mg/L.',
    'The second infusion starts at 6 hours and runs to 8 hours.',
    'Each infusion on its own rises to 17.28 mg/L, 26 per cent of the 66.67 mg/L it was heading for.']},
  {h:'The concentration at 12 hours', list:[
    'The first infusion has been declining for 10 hours (12 − 2) and contributes 3.86 mg/L.',
    'The second has been declining for 4 hours (12 − 8) and contributes 9.48 mg/L.',
    'The plasma concentration is the sum, 13.34 mg/L.']},
  {h:'A check that follows the curve', list:[
    'At 6 hours, dose 1 is at 17.28 × e^(-0.6) = 9.48 mg/L.',
    'During the second infusion that leftover falls to 9.48 × e^(-0.3) = 7.03 mg/L, while the new dose adds 17.28 mg/L.',
    'So at 8 hours the curve is at 24.30 mg/L.',
    'Four hours of elimination then gives 24.30 × e^(-0.6) = 13.34 mg/L.'], after:'Both routes give the same answer, as superposition predicts.'}];

const B_ORAL_EQ = {h:'The multiple-oral-dose equations at steady state', list:[
  'Symbols: ka is the absorption rate constant, k the elimination rate constant, τ the dosing interval, F the bioavailability, D0 the dose and VD the apparent volume of distribution. ∞ marks steady state.',
  'Time to peak: tmax∞ = {{frac:1|ka - k}} ln[{{frac:ka(1 - e^(-kτ))|k(1 - e^(-ka τ))}}]. It holds k, ka and τ; the single-dose tmax holds only k and ka.',
  'Peak: Cmax∞ = {{frac:FD0|VD}} ({{frac:1|1 - e^(-kτ)}}) e^(-k tmax∞).',
  'The F and the tmax mark Cmax∞ as oral. A bolus peaks at the moment of the dose, so a bolus needs no tmax.',
  'Trough: Cmin∞ = {{frac:ka FD0|VD(ka - k)}} ({{frac:1|1 - e^(-kτ)}}) e^(-kτ).',
  'Average: Cavg∞ = {{frac:FD0|ClT τ}}, where ClT is total clearance. It is the same average as for repeated IV bolus doses, with F now less than 1 where the drug is not fully absorbed.',
  'Before steady state, the concentration at any time carries n, the dose number, in both brackets. As n grows, each numerator becomes 1 and the steady-state form is left.']};

const B_ORAL_CMP = {h:'First dose against steady state: her tetracycline example', list:['The regimen: 250 mg every 8 hours, F 0.75, VD 112.5 L.', 't½ (half-life) 10 hr, so k is 0.0693 hr⁻¹; ka is 0.9 hr⁻¹.'], table:{head:['', 'First dose', 'At steady state'], rows:[
  ['tmax', '{{frac:ln(ka/k)|ka - k}} = 3.1 hr', 'tmax∞, with τ in it: 2.06 hr'],
  ['Cmax', 'The single-dose equation at tmax: 1.35 mg/L', 'Cmax∞, with the accumulation factor: 3.4 mg/L computed (she says 3.3)'],
  [
    'Why they differ',
    'No drug in the body before the dose',
    'Drug from earlier doses is still present; the peak comes earlier and higher']]}, after:'From the first dose to steady state, tmax falls and Cmax rises. How much Cmax rises depends on τ (the dosing interval): a very long interval leaves little accumulation.'};

const B_PARAM = {h:'The two things a regimen can change', list:[
  'A dosage regimen adjusts the dose size and the dosing interval, τ.',
  'It does not change k, the half-life, clearance or VD (apparent volume of distribution); these belong to the drug and the patient.'], table:{head:['Change', 'Steady-state concentration', 'Fluctuation, peak to trough', 'Patient compliance'], rows:[
  ['Increase the dose, same τ', 'Higher', 'Larger', 'Usually no change'],
  ['Decrease the dose, same τ', 'Lower', 'Smaller', 'Usually no change'],
  ['Increase τ, same dose (less often)', 'Lower', 'Larger', 'Better'],
  ['Decrease τ, same dose (more often)', 'Higher', 'Smaller', 'Worse']]}, after:'Changing the dose or the interval moves the plateau. It does not change how long the plateau takes to reach, because the half-life alone sets that.'};

const Q_MODULE6B = [

/* ═══════════════ INTERMITTENT IV INFUSIONS ═════════════════════════════ */

{id:'m6b-c01', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'intermittent-rationale', skill:'recall',
 source:'both',
 stem:'Why is a drug given as repeated short intravenous (IV) infusions rather than as repeated IV bolus injections?',
 options:[
  {t:'To avoid high concentrations and the side effects that go with them', correct:true,
   why:'A bolus puts the whole dose into the plasma at once, so the concentration peaks at that moment. Spreading the same dose over an infusion keeps the peak lower, and many drugs are better tolerated infused slowly than pushed all at once.'},
  {t:'To reach steady state sooner',
   why:'This confuses the route with the time to plateau. Steady state takes 3 to 5 half-lives however the drug is given, because first-order elimination sets that time, not the input.'},
  {t:'To shorten the half-life',
   why:'This attaches a property of the drug to the way it is given. The half-life belongs to the drug and the patient; an infusion changes how drug enters, not how fast the body removes it. Choosing this attaches a property of the drug to the way it is given.'},
  {t:'Because infusions are eliminated by zero-order kinetics',
   why:'This confuses the input with the output. The infusion is a zero-order input, but elimination stays first order, which is why the concentration falls as C0e^(-kt) once the infusion stops.'}],
 teach:[
  {h:'The idea', list:[
    'Intermittent IV (intravenous) infusions are the repeated IV bolus regimen with each dose put in slowly.',
    'The dose, the interval and the kinetics stay the same; only the shape of the input changes.',
    'The slower input is what limits the peak.']},
  B_INF,
  ...B_INF_SUM],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Rationale"; 09.28 lecture',
 quote:'some drugs aren\'t are better tolerated when they are infused slowly versus all at once'},

{id:'m6b-c02', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'intermittent-equation', skill:'read',
 source:'both',
 stem:'A drug is given as a series of 2-hour intravenous (IV) infusions. Which equation gives the plasma concentration at the end of one infusion?',
 options:[
  {t:'Cp = R/(VD k) × (1 − e^(−kt)), with t the infusion time', correct:true,
   why:'Each infusion is a constant-rate input, so during it the concentration follows the single-infusion equation. R is the dose divided by the duration, and t runs only to the end of the infusion.'},
  {t:'Cp = C0e^(−kt)',
   why:'This is the decline after the infusion stops, not the rise during it. The concentration at the end of the infusion, C0, has to be found first; this equation is then applied to it. Choosing this skips the step that produces C0: the concentration at the end of the infusion has to be found first, and this equation is then applied to it.'},
  {t:'Cmax∞ = C0/(1 − e^(−kτ))',
   why:'This carries the bolus steady-state peak into an infusion regimen. That equation needs C0 = {{frac:D0|VD}}, a bolus quantity; an infusion has no concentration at time zero, because the drug enters over time. Choosing this carries the bolus steady-state peak into an infusion regimen.'},
  {t:'Css = R/Cl',
   why:'This treats a short infusion as if it had run to steady state. {{frac:R|Cl}} is the plateau a continuous infusion reaches after 3 to 5 half-lives; a 2-hour infusion stops short of it whenever 2 hours is less than 3 to 5 half-lives, and the (1 − e^(−kt)) factor measures how far short.'}],
 teach:[
  {h:'The idea', list:[
    'The rise during each infusion needs nothing new: it is the Module 3 infusion equation.',
    'Set t to the infusion time, and write R (the infusion rate) as the dose divided by the duration.']},
  B_INF,
  B_INF_ERR],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Administering One or More Doses by IV Infusion"; 09.28 lecture',
 quote:'this is the same equation that we had when we talked about our single IV infusion'},

{id:'m6b-c03', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'after-infusion-stops', skill:'apply',
 source:'both',
 stem:'The first of a series of intravenous (IV) infusions ends. What governs the plasma concentration from that moment until the next infusion begins?',
 options:[
  {t:'First-order elimination from the end-of-infusion concentration', correct:true,
   why:'With the input stopped, only elimination is left, and it is first order. The concentration falls as C = C0e^(-kt) with the end-of-infusion value as C0, which is why that value has to be found first.'},
  {t:'Zero-order decline at the infusion rate',
   why:'This reverses input and output. Once the infusion stops the input plays no further part, and the body removes a constant fraction per hour, not a constant amount.'},
  {t:'A continued rise towards R/Cl',
   why:'This treats the input as still running. The rise towards {{frac:R|Cl}} happens only while drug is going in; when the pump stops, the concentration is at its highest for that infusion and can only fall.'},
  {t:'A steady level until the next infusion',
   why:'This confuses the plateau of a continuous infusion with the gap between two short ones. A level holds steady only while rate in equals rate out, and between infusions the rate in is zero.'}],
 teach:[
  {h:'The idea', list:[
    'Every intermittent-infusion problem is two Module 3 pieces in turn.',
    'First, the rise during the infusion.',
    'Then, after it stops, the decline C0e^(-kt), where C0 is the end-of-infusion concentration.']},
  B_INF,
  ...B_INF_SUM,
  ...B_INF_FIG],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "What is the plasma drug concentration at the end of the first infusion?"; 09.28 lecture',
 quote:'What happens when we stop the infusion? It\'s only elimination. ... So that C0 is gonna be the concentration at the end of the infusion, right?'},

{id:'m6b-c04', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'time-since-that-infusion', skill:'apply',
 source:'both',
 stem:'A 2-hour infusion runs from 0 to 2 hours; a second identical infusion runs from 6 to 8 hours. To find the first infusion\'s contribution at 12 hours, what value of t goes into e^(−kt)?',
 options:[
  {t:'10 hours', correct:true,
   why:'The first infusion stopped at 2 hours and has been declining since, so at 12 hours it has declined for 12 − 2 = 10 hours. Its contribution is its end-of-infusion concentration multiplied by e^(-10k).'},
  {t:'4 hours',
   why:'This measures the first infusion from the end of the second. Four hours is the decline time of the second infusion (12 − 8); the first stopped 6 hours earlier and has fallen further. Choosing this measures the first infusion from the end of the second.'},
  {t:'12 hours',
   why:'This measures from the start of the first infusion, not its end. For the 2 hours it ran, the concentration was rising; the decline begins when it stops. This answer measures from the start of the first infusion rather than its end.'},
  {t:'6 hours',
   why:'This reads the gap between the two starts as the decline time. Six hours is when the second infusion began, which says nothing about how long the first has been declining at 12 hours.'}],
 teach:[
  {h:'The idea', list:[
    'Draw her number line: mark each start, each end, and the time asked for.',
    'The t of each infusion is measured from its own end.',
    'So the two infusions get different values of t at the same clock time.']},
  ...B_INF_SUM,
  B_INF_ERR,
  ...B_INF_FIG],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "What is the plasma drug concentration 4 hours after the cessation of the second infusion?"; 09.28 lecture',
 quote:'here is the part that you need to pay attention to. We are interested in the concentration from this red infusion where we stop at time 2. All the way out here on our number line at 12 hours later. So, the time that we\'re interested in is going to be the time that we\'re interested 12 minus 2, OK? So, 10 hours.'},

{id:'m6b-c05', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'infusions-add', skill:'tell',
 source:'both',
 stem:'Two identical intravenous (IV) infusions of the same drug are given 6 hours apart. Why can the plasma concentration at a later time be found by adding what is left of each?',
 options:[
  {t:'Elimination is first order, so each infusion\'s drug is handled independently', correct:true,
   why:'With first-order, linear kinetics a constant fraction is removed per hour whatever else is present, so the first infusion declines the same way whether or not a second is given. Each infusion is its own curve, and the curves add: superposition.'},
  {t:'Both infusions are zero-order inputs',
   why:'This attaches the additivity to the input. A zero-order input sets how drug goes in; the curves can be added because the output is first order and unchanged by the amount present. Choosing this attaches the additivity to the input.'},
  {t:'The second infusion restarts the clock for both',
   why:'This collapses two declines into one. The second infusion does not change what the first left behind; the first keeps declining on its own timetable, so its t is measured from its own end. This answer collapses two declines into one.'},
  {t:'The concentrations are the same at every time',
   why:'This reads "identical infusions" as identical curves at the same clock time. Each reaches the same end-of-infusion concentration, 17.3 mg/L in her example, but at different times, so at any one moment they have declined by different amounts.'}],
 teach:[
  {h:'The idea', list:[
    'This is superposition, from repeated IV (intravenous) bolus dosing, applied to infusions.',
    'Same drug and same kinetics after every dose, so the concentrations from each dose add.']},
  ...B_INF_SUM,
  B_INF],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Administering One or More Doses by IV Infusion"; 09.28 lecture',
 quote:'the concentrations from each administration of the dose will be additive over time'},

{id:'m6b-c06', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'intermittent-vs-bolus', skill:'tell',
 source:'both',
 stem:'A drug is given either as repeated intravenous (IV) bolus injections or as repeated 2-hour IV infusions, same dose and same interval. Where does each interval\'s peak occur?',
 options:[
  {t:'Bolus: at the moment of the dose; infusion: at the end of the infusion', correct:true,
   why:'A bolus goes in all at once, so its peak is the instant it is given. An infusion keeps adding drug until the pump stops, so its highest point is the end of the infusion, where the decline starts.'},
  {t:'Both at the moment the dose starts',
   why:'This treats the infusion as a bolus. When an infusion starts nothing has gone in yet; the concentration rises during the infusion and peaks only at its end.'},
  {t:'Both at the end of the dosing interval',
   why:'This reverses peak and trough. The end of the interval, just before the next dose, is where the concentration is lowest for either route.'},
  {t:'Bolus: at the end of the infusion; infusion: at the moment of the dose',
   why:'This swaps the two routes. A bolus has no infusion time, and an infusion has no single moment at which the dose is in.'}],
 teach:[
  {h:'The idea', list:[
    'Repeated IV (intravenous) bolus and intermittent infusion share the equations for what happens between doses.',
    'They differ in where the peak sits and in how it is found.',
    'Bolus: C0 = {{frac:D0|VD}}, the dose over the apparent volume of distribution.',
    'Infusion: the infusion equation with t equal to the infusion time.']},
  {h:'Repeated bolus against intermittent infusion', table:{head:['', 'Repeated IV bolus', 'Intermittent IV infusion'], rows:[
    ['Input', 'Instantaneous', 'Zero order, for the infusion time'],
    ['Peak', 'At the dose, C0 = D0/VD', 'At the end of the infusion, {{frac:R|VD k}}(1 - e^(-kt))'],
    ['Between doses', 'First-order decline', 'First-order decline'],
    ['Why chosen', 'Simple', 'A lower peak, better tolerated']]}},
  B_INF],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Rationale" and "Administering One or More Doses by IV Infusion"; 09.28 lecture',
 quote:'instead of putting all the drug into the body all at once, we are going to put the drug into the body via a zero order, like we just first, just talked about a zero-order constant process'},

{id:'m6b-c20', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'infusion-time-in-rise', skill:'apply',
 source:'both',
 stem:'A second 2-hour intravenous (IV) infusion of the same dose starts 6 hours after the first began. What value of t goes into (1 − e^(−kt)) to find the concentration at the end of the second infusion?',
 options:[
  {t:'2 hours, the duration of the infusion', correct:true,
   why:'The (1 − e^(−kt)) term describes the rise while drug is going in, so its t is how long the pump ran. Every infusion in the series runs 2 hours, so each reaches the same end-of-infusion concentration, 17.28 mg/L in her Example 4.'},
  {t:'6 hours, the time since the first infusion started',
   why:'This puts the clock time into an equation that only uses how long drug has been going in. The 6 hours places the second infusion on the time line; its rise depends only on its own 2-hour duration. Choosing this puts the clock time into an equation that only knows how long the drug has been going in.'},
  {t:'8 hours, the time the second infusion ends',
   why:'This confuses when the infusion ends with how long it ran. Eight hours is where the second peak sits on the number line; the rise to that peak took 2 hours.'},
  {t:'4 hours, the gap between the first infusion ending and the second starting',
   why:'This attaches the gap between the infusions to the rise. During the gap the first dose declines; the second dose rises over the same 2-hour climb from zero as the first. Choosing this attaches the gap between the infusions to the rise.'}],
 teach:[
  {h:'The idea', list:[
    'Two different times are used in these problems.',
    'The rise of each infusion uses its own duration.',
    'The decline of each infusion uses the time since its own end.',
    'The clock time serves only to work out those two.']},
  B_INF,
  B_INF_ERR],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Administering One or More Doses by IV Infusion"; 09.28 lecture',
 quote:'1 minus E to the minus KT where this T. Is the infusion time.'},

/* ---- Example 4, in parts ---- */

{id:'m6b-n01', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'infusion-rate-from-dose', skill:'infusion',
 source:'both',
 stem:'A 300-mg dose of an antibiotic is administered as an intravenous (IV) infusion over a period of 2 hours. What is the infusion rate?',
 units:'mg/hr',
 answer:150,
 tol:0.5,
 steps:[
  {k:'setup', t:'R = {{frac:dose|infusion time}}',
   why:'A constant-rate infusion spreads the whole dose evenly over its duration, so the rate is the amount divided by the time. This R goes into the infusion equation.'},
  {k:'algebra', t:'R = {{frac:300 mg|2 hr}} = 150 mg/hr',
   why:'Milligrams per hour is an amount per unit time, which is what a zero-order rate is. The equation needs the rate, not the dose.'},
  {k:'round', t:'R = 150 mg/hr',
   why:'Her value, 150 mg/hr. Every later part of this example uses this rate with k = 0.15 hr⁻¹ and VD = 15 L, so an error here carries into every later concentration.'}],
 setup:{eq:'none', pre:[], why:'"administered as an intravenous (IV) infusion over a period of 2 hours". The dose and the infusion time are given and R is asked. No catalog line gives R; the working uses the definition of a constant rate, R = dose divided by infusion time.'},
 teach:[
  {h:'The idea', list:[
    'An intermittent-infusion stem gives a dose and a duration.',
    'The infusion equation needs a rate, R, so the first step is always dose divided by time.']},
  B_INF],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Example 4"; 09.28 lecture',
 quote:'So that says that our rate is gonna be 300 mg divided by 2 hours, so 150 mg per hour.'},

{id:'m6b-n02', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'end-of-infusion-conc', skill:'infusion',
 source:'both',
 stem:'A 300-mg dose of an antibiotic was administered as an intravenous (IV) infusion over a period of 2 hours (k = 0.15 hr⁻¹, VD = 15 L). What is the plasma drug concentration at the end of the first infusion?',
 units:'mg/L',
 answer:17.28,
 tol:0.1,
 steps:[
  {k:'setup', t:'Cp = {{frac:R|VD k}} (1 - e^(-kt)), with t = 2 hr',
   why:'During the infusion the concentration rises towards {{frac:R|VD k}}. When the infusion stops it has reached the fraction (1 − e^(−kt)) of it. t is the infusion time, not the interval.'},
  {k:'unit', t:'R = {{frac:300 mg|2 hr}} = 150 mg/hr; VD k = (15 L)(0.15 hr⁻¹) = 2.25 L/hr',
   why:'VD times k is the clearance in L/hr, so R over it is mg/hr over L/hr, which leaves mg/L. When clearance is given directly, {{frac:R|Cl}} is the same quantity.'},
  {k:'algebra', t:'kt = (0.15 hr⁻¹)(2 hr) = 0.30; 1 - e^(-0.30) = 1 - 0.7408 = 0.2592',
   why:'Two hours is less than one half-life ({{frac:0.693|0.15}} = 4.6 hr), so only about a quarter of the plateau is reached.'},
  {k:'algebra', t:'Cp = {{frac:150 mg/hr|(15 L)(0.15 hr⁻¹)}} (1 - e^(-(0.15)(2))) = 66.67 × 0.2592 = 17.28 mg/L',
   why:'66.67 mg/L is the plateau a continuous infusion would reach; this 2-hour infusion stops at 26 per cent of it.'},
  {k:'round', t:'Cp = 17.28 mg/L',
   why:'Her value, 17.28 mg/L, which she carries as 17.3 into part (b). It is the starting value for the decline after the infusion.'}],
 setup:{eq:'cp-infusing', pre:['cl-k-vd'], why:'"administered as an intravenous (IV) infusion over a period of 2 hours", "at the end of the first infusion": during an infusion. The dose, infusion time, k and VD are given and Cp is asked, so Cp = {{frac:R|Cl}}(1 - e^(-kt)) with t the infusion time and R the dose over it. Cl first, from Cl = kVD.'},
 teach:[
  {h:'The idea', list:[
    'The end-of-infusion concentration is the number every later part depends on.',
    'It is the C0 (starting concentration) of the first-order decline that follows.',
    'In 2 hours this infusion reached 26 per cent of the 66.67 mg/L it was heading for.']},
  B_INF,
  ...B_INF_FIG],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "What is the plasma drug concentration at the end of the first infusion?"; 09.28 lecture',
 quote:'And I\'m getting 17.28 mg per liter.'},

{id:'m6b-n03', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'sum-two-infusions', skill:'multidose',
 source:'both',
 stem:'A 300-mg dose of an antibiotic was administered as an intravenous (IV) infusion over a period of 2 hours. Six hours after the start of the first infusion, a second dose of 300 mg was infused, again over 2 hours (k = 0.15 hr⁻¹, VD = 15 L). Each infusion reaches 17.28 mg/L at its end. What is the plasma drug concentration 4 hours after the cessation of the second infusion?',
 units:'mg/L',
 answer:13.34,
 tol:0.1,
 steps:[
  {k:'setup', t:'Time line: first infusion 0 to 2 hr; second infusion 6 to 8 hr; time asked for 8 + 4 = 12 hr',
   why:'The second infusion starts 6 hours after the first started and runs 2 hours, so it ends at 8 hours; 4 hours later is 12 hours. Writing the times down first keeps the two exponents straight.'},
  {k:'setup', t:'C = 17.28 e^(-k(12 - 2)) + 17.28 e^(-k(12 - 8))',
   why:'Each infusion contributes its end-of-infusion concentration, declined for the time since its own end: 10 hours for the first, 4 hours for the second. The two add because the kinetics are first order.'},
  {k:'algebra', t:'First: 17.28 × e^(-1.5) = 17.28 × 0.2231 = 3.86 mg/L',
   why:'kt = 0.15 × 10 = 1.5, a pure number. Ten hours is more than two half-lives, so under a quarter of the first infusion is left.'},
  {k:'algebra', t:'Second: 17.28 × e^(-0.6) = 17.28 × 0.5488 = 9.48 mg/L',
   why:'kt = 0.15 × 4 = 0.6, a pure number. Four hours is less than one half-life (4.6 hr), so over half of the second infusion is left, which is why it dominates the sum.'},
  {k:'algebra', t:'C = 3.86 + 9.48 = 13.34 mg/L',
   why:'The sum of the two contributions is the plasma concentration at 12 hours. Adding is allowed because elimination is first order, so each infusion declines independently of the other.'},
  {k:'round', t:'C = 13.34 mg/L',
   why:'Her stated value is 13.33 mg/L. Carrying 17.28 through gives 13.34, and starting from 17.3 gives 13.35; all three are within the tolerance.'}],
 setup:{eq:'cp-after-stop', pre:[], why:'"infusion over a period of 2 hours", "a second dose ... was infused", "4 hours after the cessation of the second infusion": after each infusion stops. Each end-of-infusion concentration, k and the time since each infusion ended are given and Cp is asked, so Cp = Cpeak e^(-kt) once per infusion, the two terms added by superposition.'},
 teach:[
  {h:'The idea', list:[
    'One decline per infusion, each with its own t measured from its own end.',
    'Then add the declines.',
    'The error she warns about is using 4 hours for both.']},
  ...B_INF_SUM,
  B_INF_ERR,
  ...B_INF_FIG],
 cite:'6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "What is the plasma drug concentration 4 hours after the cessation of the second infusion?"; 09.28 lecture',
 quote:'The answer that I\'m looking for for this one will be 13.33 mg per liter.'},

/* ---- In-Class Activity, Multiple IV Infusions, problem 1 ---- */

{id:'m6b-n04', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'end-of-infusion-conc', skill:'infusion',
 source:'both',
 stem:'A patient is to receive multiple intravenous (IV) infusions of 500 mg of a drug administered over a period of two hours. The second 2-hour infusion starts six hours after the start of the previous infusion. The reported elimination half-life of the drug is 3 hours, and the apparent volume of distribution is 18 L. What is the expected plasma drug concentration at the end of the first infusion?',
 units:'mg/L',
 answer:22.24,
 tol:0.1,
 steps:[
  {k:'unit', t:'R = {{frac:500 mg|2 hr}} = 250 mg/hr; k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹',
   why:'The equation takes a rate and a rate constant. The dose over its duration gives the rate in mg/hr, and the half-life gives k in reciprocal hours.'},
  {k:'setup', t:'Cp = {{frac:R|VD k}} (1 - e^(-kt)), with t = 2 hr',
   why:'This is the rise during one infusion, stopped at the infusion time. The 6-hour spacing of the infusions plays no part in this first value.'},
  {k:'algebra', t:'VD k = (18 L)(0.231 hr⁻¹) = 4.158 L/hr; {{frac:R|VD k}} = {{frac:250 mg/hr|4.158 L/hr}} = 60.13 mg/L',
   why:'60.13 mg/L is the plateau a continuous infusion at 250 mg/hr would reach after 3 to 5 half-lives. mg/hr over L/hr leaves mg/L; the 2-hour infusion reaches only a fraction of it.'},
  {k:'algebra', t:'1 - e^(-(0.231)(2)) = 1 - e^(-0.462) = 1 - 0.630 = 0.370; Cp = 60.13 × 0.370 = 22.24 mg/L',
   why:'Two hours is two thirds of the 3-hour half-life, so 37 per cent of the plateau is reached when the infusion stops. The exponent, 0.231 × 2, is a pure number.'},
  {k:'round', t:'Cp = 22.24 mg/L',
   why:'Her confirmed value: "something like 22.2 mg per liter for the first part for A". Because the second infusion is identical, it is the C0 for both declines in part (b).'}],
 setup:{eq:'cp-infusing', pre:['thalf-first','cl-k-vd'], why:'"multiple intravenous (IV) infusions", "administered over a period of two hours", "at the end of the first infusion": during one infusion. The dose, infusion time, t½ and VD are given and Cp is asked, so Cp = {{frac:R|Cl}}(1 - e^(-kt)) with R the dose over the infusion time. k first, from the half-life, then Cl = kVD.'},
 teach:[
  {h:'The idea', list:[
    'The same first step as her Example 4, but the stem gives the half-life instead of k (the elimination rate constant).',
    'Convert the half-life to k before anything else.']},
  B_INF,
  ...B_INF_SUM,
  B_INF_ERR],
 audit:'The activity sheet is not posted in Drive. The stem is transcribed from the photograph of the sheet on page 8 of the annotated Part 2 deck, and 22.24 is her confirmed answer in the 09.28 recording ("22.2 mg per liter"); the working here reproduces it from the printed inputs.',
 cite:'In-Class Activity, Multiple IV Infusions (09.28), question 1(a); 09.28 lecture',
 quote:'Did we get something like 22.2 mg per liter for the first part for A?'},

{id:'m6b-n05', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'sum-two-infusions', skill:'multidose',
 source:'both',
 stem:'A patient receives 500 mg of a drug by intravenous (IV) infusion over two hours, and a second 2-hour infusion of 500 mg starting six hours after the start of the first (t½ 3 hours, VD 18 L). Each infusion reaches 22.24 mg/L at its end. What is the concentration of drug in the plasma four hours after the end of the second infusion?',
 units:'mg/L',
 answer:11.04,
 tol:0.12,
 steps:[
  {k:'setup', t:'Time line: first infusion 0 to 2 hr; second 6 to 8 hr; time asked for 8 + 4 = 12 hr',
   why:'The times match her Example 4: the infusions end at 2 and 8 hours, and the question asks about 12 hours. Each infusion then declines from its own end.'},
  {k:'setup', t:'C = 22.24 e^(-0.231(12 - 8)) + 22.24 e^(-0.231(12 - 2))',
   why:'The second infusion has declined for 4 hours and the first for 10. Both start from 22.24 mg/L, because both infusions were the same dose over the same time.'},
  {k:'algebra', t:'Second: 22.24 × e^(-0.924) = 22.24 × 0.397 = 8.83 mg/L',
   why:'kt = 0.231 × 4 = 0.924, a pure number. Four hours is 1.33 half-lives of 3 hours, so about 40 per cent of the second infusion remains at the time asked for.'},
  {k:'algebra', t:'First: 22.24 × e^(-2.31) = 22.24 × 0.0993 = 2.21 mg/L',
   why:'kt = 0.231 × 10 = 2.31. Ten hours is 3.33 half-lives, so about a tenth of the first infusion remains; it ended 6 hours before the second did.'},
  {k:'algebra', t:'C = 8.83 + 2.21 = 11.04 mg/L',
   why:'The sum of the two contributions. Most of it comes from the second infusion, because the first has had 6 more hours to be eliminated.'},
  {k:'round', t:'C = 11.04 mg/L',
   why:'Her confirmed value was "eleven-ish", with rounding differences between students. Carried from 22.24, the sum is 11.04 mg/L.'}],
 setup:{eq:'cp-after-stop', pre:['thalf-first'], why:'"intravenous (IV) infusion over two hours", "second 2-hour infusion", "four hours after the end of the second infusion": after each infusion stops. Each end-of-infusion concentration, t½ and the time since each infusion ended are given and Cp is asked, so Cp = Cpeak e^(-kt) once per infusion, the two terms added. k first, from the half-life.'},
 teach:[
  {h:'The idea', list:[
    'Same number line as Example 4, so the two values of t are again 10 and 4 hours.',
    'The 12 comes from the second infusion ending at 8 hours, plus the 4 hours asked for.']},
  B_INF,
  ...B_INF_SUM,
  B_INF_ERR],
 audit:'Stem transcribed from the photograph of the sheet on the annotated Part 2 deck. In the recording she confirms "eleven-ish" and walks the class through the 12 − 2 = 10 and the given 4; 11.04 is the sum from her inputs with 22.24 carried.',
 cite:'In-Class Activity, Multiple IV Infusions (09.28), question 1(b); 09.28 lecture',
 quote:'So the 12 comes from part B says the concentration 4 hours after the end of the second infusion. Second infusion ends right here at time 8, so that\'s where the 12 comes from.'},

/* ---- In-Class Activity, Multiple IV Infusions, problem 2 ---- */

{id:'m6b-n06', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'end-of-infusion-conc', skill:'infusion',
 source:'both',
 stem:'150 mg of a drug (Cl = 2.54 L/hr, VD = 22 L) was infused intravenously over 1.5 hours. Exactly eight hours after the start of the first infusion, a second 150-mg dose was again infused over 1.5 hours. What is the plasma drug concentration at the end of the first infusion?',
 units:'mg/L',
 answer:6.26,
 tol:0.05,
 steps:[
  {k:'unit', t:'R = {{frac:150 mg|1.5 hr}} = 100 mg/hr; k = {{frac:Cl|VD}} = {{frac:2.54 L/hr|22 L}} = 0.1155 hr⁻¹',
   why:'This stem gives the clearance (Cl), not k or a half-life, so k comes from Cl = kVD. Litres cancel, leaving reciprocal hours.'},
  {k:'setup', t:'Cp = {{frac:R|Cl}} (1 - e^(-kt)), with t = 1.5 hr',
   why:'With the clearance given, {{frac:R|Cl}} is the direct form of the plateau; it equals {{frac:R|VD k}}. t is the infusion time.'},
  {k:'algebra', t:'{{frac:R|Cl}} = {{frac:100 mg/hr|2.54 L/hr}} = 39.37 mg/L; 1 - e^(-(0.1155)(1.5)) = 1 - e^(-0.173) = 1 - 0.841 = 0.159',
   why:'kt = 0.1155 × 1.5 = 0.173, a pure number. An hour and a half is a quarter of the 6-hour half-life ({{frac:0.693|0.1155}}), so only 16 per cent of the plateau is reached.'},
  {k:'algebra', t:'Cp = 39.37 × 0.159 = 6.26 mg/L',
   why:'This is 16 per cent of 39.37 mg/L. The plateau is high because the clearance is small, and the infusion is short against the half-life, so the product is modest.'},
  {k:'round', t:'Cp = 6.26 mg/L',
   why:'Her value, 6.26 mg/L. It is the C0 for the decline after this infusion and, because the second infusion is identical, for the second decline as well.'}],
 setup:{eq:'cp-infusing', pre:['cl-k-vd'], why:'"infused intravenously over 1.5 hours", "at the end of the first infusion": during one infusion, before steady state. The dose, infusion time, Cl and VD are given and Cp is asked, so Cp = {{frac:R|Cl}}(1 - e^(-kt)) with R the dose over the infusion time. k first, from Cl = kVD rearranged, because the exponent wants k.'},
 teach:[
  {h:'The idea', list:[
    'When the stem gives clearance (Cl), use {{frac:R|Cl}} for the plateau and {{frac:Cl|VD}} for k.',
    'The slip she named: dividing by 24 instead of the 22-litre volume.']},
  B_INF],
 audit:'Stem transcribed from the photograph of the sheet on the annotated Part 2 deck. She works this part aloud in the 09.28 recording: "I\'m getting a K of 0.115 per hour ... 6.26".',
 cite:'In-Class Activity, Multiple IV Infusions (09.28), question 2(a); 09.28 lecture',
 quote:'So I\'m getting a K of 0.115 per hour. And then our concentration at the end of the infusion should be 100 divided by 2.54. 1 minus. Each of the minus.'},

{id:'m6b-n07', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'sum-two-infusions', skill:'multidose',
 source:'both',
 stem:'150 mg of a drug (Cl = 2.54 L/hr, VD = 22 L) was infused intravenously over 1.5 hours, and a second 150-mg dose was infused over 1.5 hours starting exactly eight hours after the start of the first. Each infusion reaches 6.26 mg/L at its end. What is the concentration of drug in the plasma six hours after the end of the second infusion?',
 units:'mg/L',
 answer:4.37,
 tol:0.06,
 steps:[
  {k:'setup', t:'Time line: first infusion 0 to 1.5 hr; second 8 to 9.5 hr; time asked for 9.5 + 6 = 15.5 hr',
   why:'The second infusion starts at 8 hours and runs 1.5 hours, so it ends at 9.5; six hours later is 15.5 hours. She noted the temptation to call it 16.'},
  {k:'setup', t:'C = 6.26 e^(-k(15.5 - 9.5)) + 6.26 e^(-k(15.5 - 1.5)), with k = 0.1155 hr⁻¹',
   why:'The second infusion has declined for the 6 hours given; the first for 15.5 − 1.5 = 14 hours, back to when it ended.'},
  {k:'algebra', t:'Second: 6.26 × e^(-0.693) = 6.26 × 0.500 = 3.13 mg/L',
   why:'kt = 0.1155 × 6 = 0.693, exactly one half-life, so half of the second infusion remains six hours after it ends. e^(-0.693) is 0.500.'},
  {k:'algebra', t:'First: 6.26 × e^(-1.617) = 6.26 × 0.199 = 1.24 mg/L',
   why:'kt = 0.1155 × 14 = 1.617, which is 2.33 half-lives, so about a fifth of the first infusion remains. The 14 is 15.5 − 1.5, measured from the end of the first infusion.'},
  {k:'algebra', t:'C = 3.13 + 1.24 = 4.37 mg/L',
   why:'The sum of the two contributions. The second infusion supplies 3.13 of the 4.37 mg/L, because it ended 8 hours later than the first.'},
  {k:'round', t:'C = 4.37 mg/L',
   why:'Computed from her inputs. With k rounded to 0.115, the pieces are 3.14 and 1.25 and the sum is 4.39; both sums lie inside the tolerance.'}],
 setup:{eq:'cp-after-stop', pre:['cl-k-vd'], why:'"infused intravenously over 1.5 hours", "a second 150-mg dose was infused", "six hours after the end of the second infusion": after each infusion stops. Each end-of-infusion concentration, Cl, VD and the time since each infusion ended are given and Cp is asked, so Cp = Cpeak e^(-kt) per infusion, the two terms added. k first, from Cl = kVD.'},
 teach:[
  {h:'The idea', list:[
    'Her number line for this one: 0, 1.5, 8, 9.5, 15.5.',
    'The decline time of the first infusion is 14 hours, which she confirmed against the room\'s 13.']},
  B_INF,
  ...B_INF_SUM,
  B_INF_ERR],
 audit:'She set up both terms aloud (6.26, the 6 hours, and "15.5 minus 1.5 ... 14") but stated no final value in the recording. 4.37 = 6.26 e^(-0.1155 × 6) + 6.26 e^(-0.1155 × 14) from her inputs.',
 cite:'In-Class Activity, Multiple IV Infusions (09.28), question 2(b); 09.28 lecture',
 quote:'So, 15.5 minus 1.5, the time that we\'re interested in, all the way back to when that first infusion ends. OK, so this is gonna be 14.'},

{id:'m6b-n08', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'why', concept:'css-if-continuous', skill:'infusion',
 source:'both',
 stem:'A drug with a clearance of 2.54 L/hr is being given as 150-mg intravenous (IV) infusions over 1.5 hours. If the drug were continuously infused at the rate above, what would the steady-state concentration be?',
 units:'mg/L',
 answer:39.37,
 tol:0.1,
 steps:[
  {k:'setup', t:'Css = {{frac:R|Cl}}',
   why:'A continuous infusion reaches a plateau where the rate in equals the rate out, and the rate out is clearance times concentration. The interval does not enter, because the infusion never stops.'},
  {k:'unit', t:'R = {{frac:150 mg|1.5 hr}} = 100 mg/hr',
   why:'The same rate the short infusions run at, 150 mg over 1.5 hours, now imagined running without a break. mg per hr is the zero-order input the plateau depends on.'},
  {k:'algebra', t:'Css = {{frac:100 mg/hr|2.54 L/hr}} = 39.37 mg/L',
   why:'mg/hr over L/hr leaves mg/L. The 1.5-hour infusions reach only 16 per cent of this {{frac:R|Cl}}, because they stop long before 3 to 5 half-lives have passed.'},
  {k:'round', t:'Css = 39.37 mg/L',
   why:'Her method, the rate divided by the clearance, gives 39.37 mg/L. It has no time term, so it says nothing about when the plateau would be reached.'}],
 setup:{eq:'css', pre:[], why:'"continuously infused at the rate above", "steady-state concentration": the plateau of a continuous infusion. The dose, the infusion time and Cl are given and Css is asked, so Css = {{frac:R|Cl}} with R the dose over the infusion time. No hinge: no k and no t appear in the line.'},
 teach:[
  {h:'The idea', list:[
    'The plateau of a continuous infusion is the Module 3 result Css = {{frac:R|Cl}}, the rate over the clearance.',
    'The 1.5-hour infusions in this problem stop at 6.26 mg/L, 16 per cent of it, because they stop long before 3 to 5 half-lives.']},
  B_INF],
 audit:'Stem from the photograph of the sheet on the annotated Part 2 deck; she states the method ("rate divided by your clearance") and 100/2.54 = 39.37.',
 cite:'In-Class Activity, Multiple IV Infusions (09.28), question 2(c); 09.28 lecture',
 quote:'So remember the C steady state is going to be the rate divided by your clearance.'},

/* ═══════════════ MULTIPLE ORAL DOSES ═══════════════════════════════════ */

{id:'m6b-c07', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oeq', concept:'oral-vs-bolus-ss-equation', skill:'tell',
 source:'both',
 stem:'Cmax∞ = (FD0/VD) × [1/(1 − e^(−kτ))] × e^(−k·tmax∞). What marks this as the steady-state peak for an oral dose rather than for a repeated intravenous (IV) bolus?',
 options:[
  {t:'The F and the tmax', correct:true,
   why:'F is bioavailability, which an IV dose does not need, and tmax is the time to peak, which a bolus lacks because it peaks at the moment of the dose. Remove those two and what is left, {{frac:D0|VD}} × {{frac:1|1 − e^(−kτ)}}, is the bolus Cmax∞.'},
  {t:'The τ',
   why:'This reads the dosing interval as an oral feature. Every multiple-dose regimen has a τ, bolus or oral, so τ cannot tell the two apart.'},
  {t:'The accumulation factor 1/(1 − e^(−kτ))',
   why:'This attaches accumulation to the oral route. The same factor appears in the repeated-bolus equations, because accumulation depends on k and τ, not on how the dose enters. Choosing this attaches accumulation to the oral route.'},
  {t:'The VD',
   why:'The volume of distribution turns an amount into a concentration for every route, so VD is in the bolus equation too.'}],
 teach:[
  {h:'The idea', list:[
    'On the equation sheet the oral and bolus steady-state peaks sit near each other and look alike.',
    'Her test: an oral equation carries F (bioavailability), and an oral peak needs tmax (the time to peak) found first.']},
  B_ORAL_EQ],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"; 09.28 lecture',
 quote:'what tells you that this is for an oral dose? F is one thing. ... What else tells us? Team Max, right? Because when we\'re giving a bolus dose, when does the max occur? Initially'},

{id:'m6b-c08', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'tmax-ss-depends', skill:'tell',
 source:'both',
 stem:'The time to peak after a single oral dose depends on k and ka. What does the time to peak at steady state, tmax∞, depend on?',
 options:[
  {t:'k, ka and the dosing interval τ', correct:true,
   why:'The steady-state expression has τ inside the logarithm, because drug left from earlier doses changes when the rising and falling rates balance. Change how often the drug is given, and tmax∞ must be recalculated.'},
  {t:'k and ka only',
   why:'This carries the single-dose result over unchanged. The τ terms in tmax∞ are the whole difference between the two equations. Choosing this carries the single-dose result over unchanged.'},
  {t:'The dose and VD',
   why:'This brings in the quantities that set the height of the peak. Neither appears in tmax∞; a larger dose raises Cmax∞ and leaves the timing where it was. This answer imports the quantities that set the height of the peak.'},
  {t:'F and the dose',
   why:'This confuses when the peak occurs with how high it is. F and the dose scale the concentration; the time to peak is set by the two rate constants and, at steady state, the interval.'}],
 teach:[
  {h:'The idea', list:[
    'The single-dose tmax and the steady-state tmax∞ share k (the elimination rate constant) and ka (the absorption rate constant).',
    'tmax∞ adds τ, the dosing interval.',
    'A regimen does not change k or ka, so the interval is the only thing a regimen can change that moves tmax∞.']},
  B_ORAL_EQ,
  B_ORAL_CMP],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Time to Peak at Steady State"; 09.28 lecture',
 quote:'for at steady state following multiple oral dosing. Depends on K, KA and tau. OK. Single oral dose, K and KA.'},

{id:'m6b-c09', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'interval-changes-tmax-cmax', skill:'apply',
 source:'both',
 stem:'A drug given orally every 6 hours is changed to every 12 hours, same dose. Which steady-state quantities must be recalculated?',
 options:[
  {t:'tmax∞ and Cmax∞', correct:true,
   why:'Both carry τ: tmax∞ inside its logarithm, and Cmax∞ through the accumulation factor and through tmax∞ itself. A new interval means a new time to peak and a new peak.'},
  {t:'k and ka',
   why:'This treats the rate constants as adjustable. They belong to the drug and the formulation; a regimen changes only the dose and the interval.'},
  {t:'Only Cavg∞',
   why:'The average does change, since τ is in {{frac:FD0|ClT τ}}, but this stops one step short: the peak and its timing change too, because τ appears in both.'},
  {t:'Nothing at steady state',
   why:'This reads steady state as a fixed property of the drug. Steady state is a balance between what is given and what is cleared, and giving the same dose half as often halves the input.'}],
 teach:[
  {h:'The idea', list:[
    'Dose and interval are the two things a regimen can change.',
    'The interval reaches into tmax∞, Cmax∞, Cmin∞ and Cavg∞: the time to peak, peak, trough and average at steady state.',
    'The dose scales the concentrations without moving tmax∞.']},
  B_ORAL_EQ,
  B_PARAM],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Time to Peak at Steady State"; 09.28 lecture',
 quote:'So if we change the dosing interval, we need to recalculate TMax. Right? And it will also change our CMax.'},

{id:'m6b-c10', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'tmax-ss-shorter', skill:'apply',
 source:'both',
 stem:'A drug is given orally at a fixed dose and interval. How does the time to peak at steady state compare with the time to peak after the first dose?',
 options:[
  {t:'It is generally shorter', correct:true,
   why:'At steady state drug from earlier doses is already in the body, so elimination runs at a higher rate from the moment the new dose is taken, and the rising and falling rates balance sooner. In her tetracycline example tmax falls from 3.1 hours to 2.06 hours.'},
  {t:'It is generally longer',
   why:'This runs the wrong way. Accumulated drug does not delay the peak; it brings it forward, because the elimination rate is already high when absorption begins.'},
  {t:'It is the same, because k and ka are unchanged',
   why:'This uses single-dose reasoning, where only k and ka matter. The steady-state tmax has τ in it as well, and her worked values differ: 3.1 against 2.06 hours. Choosing this uses the single-dose reasoning, where only k and ka matter.'},
  {t:'It is twice as long',
   why:'This attaches a fixed multiple to a relation that has none. The direction is shorter, and the size of the change depends on k, ka and τ together.'}],
 teach:[
  {h:'The idea', list:[
    'From the first dose to steady state, the peak comes earlier and higher.',
    'Earlier because of tmax∞, the time to peak at steady state; higher because of the accumulation factor.']},
  B_ORAL_CMP],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Example 1"; 09.28 lecture',
 quote:'That steady state TMAX is going to be lower than the T-Max of the first dose, OK?'},

{id:'m6b-c11', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'cmax-ss-higher-oral', skill:'apply',
 source:'both',
 stem:'A drug is given orally at a fixed dose and interval. How is the peak at steady state expected to compare with the peak after the first dose, and why?',
 options:[
  {t:'Higher, because drug from earlier doses has accumulated', correct:true,
   why:'Each dose adds to what is left of the ones before it, so at steady state the peak sits on top of accumulated drug. In her tetracycline example the peak is 1.35 mg/L after the first dose and 3.4 mg/L at steady state (3.39 computed from her inputs; her stated value is 3.3).'},
  {t:'Higher, because ka increases with repeated dosing',
   why:'This changes a rate constant that a regimen does not change. ka belongs to the drug and its formulation and is the same for every dose; the higher peak comes from accumulation. Choosing this changes a rate constant that a regimen does not change.'},
  {t:'The same, because the dose is the same',
   why:'This treats each dose as if it entered an empty body. The first dose does; the doses at steady state do not, which is what the factor {{frac:1|1 − e^(−kτ)}} counts. This answer treats each dose as if it entered an empty body.'},
  {t:'Lower, because absorption is slower at steady state',
   why:'This invents a change in absorption. Absorption is first order with the same ka every time; the steady-state peak is earlier and higher, not lower. Choosing this invents a change in absorption.'}],
 teach:[
  {h:'The idea', list:[
    'The steady-state peak is expected to be higher than the first-dose peak.',
    'She says "expectation" because it depends on τ, the dosing interval.',
    'With a very long interval nearly all of each dose is gone before the next, so little accumulates.']},
  B_ORAL_CMP],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Example 1"; 09.28 lecture',
 quote:'The expectation is that the steady-state concentration is gonna be higher than the first dose because there is drug that is accumulated in the body.'},

{id:'m6b-c12', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oeq', concept:'n-and-tau-in-oral', skill:'read',
 source:'both',
 stem:'The equation for the plasma concentration after n oral doses has the same prefactor FkaD0/(VD(ka − k)) as the single-dose equation. What is new in it?',
 options:[
  {t:'The dose number n and the dosing interval τ', correct:true,
   why:'Each exponential is now multiplied by a bracket: {{frac:1 − e^(−nkτ)|1 − e^(−kτ)}} on the elimination term, and the matching bracket in ka on the absorption term. n says which dose has just been given, and τ how far apart the doses are.'},
  {t:'F and VD',
   why:'This reads the prefactor as new. F and VD are already in the single-dose equation; what changes is the multiplier on each exponential.'},
  {t:'A new rate constant for accumulation',
   why:'This invents a constant. Accumulation is expressed with the same k and ka through the brackets in τ; no new rate constant is defined. This answer invents a constant.'},
  {t:'tmax in place of t',
   why:'This confuses the general equation with the peak. The equation gives the concentration at any time t after the n-th dose; tmax is one particular t.'}],
 teach:[
  {h:'The idea', list:[
    'The multiple-oral equation is the single-dose equation with accumulation brackets attached.',
    'One bracket is in k, for the elimination term; the other is in ka, for the absorption term.',
    'As n (the dose number) grows, both numerators go to 1.']},
  B_ORAL_EQ],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Concentration of Drug in the Plasma at Any Time"; 09.28 lecture',
 quote:'But the only difference here, well, one of the differences is this in. Again, what number of dose are we on? And now we have the tau. What is our dosing interval?'},

{id:'m6b-c13', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'regimen-parameters', skill:'recall',
 source:'both',
 stem:'Which two parameters can be adjusted in developing a dosage regimen?',
 options:[
  {t:'Dose size and dosing interval', correct:true,
   why:'How much drug is given and how often are the two things a prescriber decides. Everything else in the equations, such as k, the half-life, clearance and VD, belongs to the drug and the patient.'},
  {t:'Clearance and volume of distribution',
   why:'This treats patient parameters as adjustable. Clearance and VD are what the patient brings; the regimen is designed around them, not by changing them. Choosing this treats patient parameters as adjustable.'},
  {t:'Half-life and dose',
   why:'The dose is right and the half-life is not. The half-life follows from k, which the drug and the patient set, so a regimen cannot lengthen or shorten it.'},
  {t:'Bioavailability and dosing interval',
   why:'The interval is right and F (bioavailability) is not. F is a property of the drug and its formulation; changing the product might change it, but the regimen does not set it.'}],
 teach:[
  {h:'The idea', list:['A regimen sets two things: the dose and the interval.', 'The rest of the equation is fixed by the drug and the patient.']},
  B_PARAM],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Multiple-Dosage Regimens"; 09.28 lecture',
 quote:'So the only things that we can change. Are the dose, so the, the size of the dose, how much drug we give, and the dosing intervals. OK. We don\'t change clearance, we don\'t change half-life, we don\'t change volume and distribution.'},

{id:'m6b-c14', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'increase-dose-effects', skill:'apply',
 source:'both',
 stem:'The oral dose of a drug is doubled and the dosing interval is kept the same. What happens at steady state?',
 options:[
  {t:'Higher concentrations and a larger swing between peak and trough', correct:true,
   why:'A larger dose raises every concentration in proportion, so the peak, trough and average all rise, and the peak-to-trough gap, a fixed fraction of the peak, grows with them. Compliance usually does not change, because the patient takes the same number of doses.'},
  {t:'Higher concentrations and a smaller swing between peak and trough',
   why:'This pairs the right direction for the level with the wrong one for the swing. Doubling the dose doubles the peak and the trough, so the difference between them doubles too.'},
  {t:'The same average concentration, reached sooner',
   why:'This confuses the dose with the half-life. The dose sets how high the plateau is, not how fast it is reached; steady state still takes 3 to 5 half-lives.'},
  {t:'A longer time to peak',
   why:'This attaches the dose to tmax. Neither the single-dose tmax nor tmax∞ contains the dose, so doubling it leaves the timing alone. Choosing this attaches the dose to tmax.'}],
 teach:[
  {h:'The idea', list:[
    'Method 1 for altering steady state: change the dose, keep the interval.',
    'The whole curve scales up, so everything about it, including the fluctuation, gets bigger.']},
  B_PARAM],
 cite:'6a---Multiple-Oral-Doses.pdf, slides "Altering Dose" and "Altering Dose, second slide"; 09.28 lecture',
 quote:'if we increase the dose, we expect increased concentration and increased fluctuation between peaks and troughs'},

{id:'m6b-c15', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'increase-interval-effects', skill:'apply',
 source:'both',
 stem:'A 500-mg oral dose given every 4 hours is changed to 500 mg every 8 hours. What is expected at steady state?',
 options:[
  {t:'Lower concentrations, a larger swing between peak and trough, and better compliance', correct:true,
   why:'The same dose half as often halves the input, so the average falls. Each dose also has longer to be eliminated before the next, so the level drops further between doses and the swing grows. Fewer doses a day are easier to keep to.'},
  {t:'Lower concentrations and a smaller swing',
   why:'This pairs the right level with the wrong swing. A longer gap between doses lets the concentration fall further before the next dose, which widens the peak-to-trough difference. Choosing this pairs the right level with the wrong swing.'},
  {t:'Higher concentrations, because each dose has more time to be absorbed',
   why:'This confuses absorption with accumulation. A longer interval changes how much of each dose is eliminated before the next arrives, which is more.'},
  {t:'The same concentrations, because the dose is unchanged',
   why:'This leaves the interval out of the average. Cavg∞ = {{frac:FD0|ClT τ}}, so doubling τ halves the average even though D0 is the same. Choosing this leaves the interval out of the average.'}],
 teach:[
  {h:'The idea', list:[
    'Method 2 for altering steady state: change the interval, keep the dose.',
    'Her comparison: eating one Skittle every 3 minutes against one an hour gives very different concentrations from the same unit dose.']},
  B_PARAM],
 cite:'6a---Multiple-Oral-Doses.pdf, slides "Altering Dosing Interval" and "Altering Dosing Interval, second slide"; 09.28 lecture',
 quote:'increasing the dosing interval. Right? Increasing the dosing interval means that we\'re giving more time in between doses, decreased steady-state concentration, increased fluctuation between peak to trough. Increase patient compliance, generally.'},

{id:'m6b-c16', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'decrease-interval-fluctuation', skill:'apply',
 source:'both',
 stem:'The dosing interval of an oral regimen is shortened from 8 hours to 4 hours, same dose. Why does the fluctuation between peak and trough decrease?',
 options:[
  {t:'Less time passes between doses, so the level falls less before the next dose', correct:true,
   why:'The trough is where the next dose interrupts the decline. With 4 hours instead of 8, the decline stops earlier, closer to the peak, so the peak-to-trough gap is smaller even though both are higher.'},
  {t:'Less drug accumulates, so the peaks are lower',
   why:'This has accumulation backwards. A shorter interval leaves more of each dose behind when the next arrives, so more accumulates and the peaks are higher; the swing shrinks because the troughs rise even more.'},
  {t:'The elimination rate constant falls',
   why:'This changes k. The regimen changes only how often the drug is given; k, the half-life and clearance are unchanged. Choosing this changes k.'},
  {t:'Absorption becomes slower',
   why:'This changes ka. Each dose is absorbed with the same ka whatever the interval; the smaller swing comes from the shorter decline between doses. Choosing this changes ka.'}],
 teach:[
  {h:'The idea', list:[
    'Her reasoning: 3 to 5 half-lives clear most of a dose.',
    'A shorter interval cuts into that time, so the level does not get near the bottom of the curve before the next dose arrives.']},
  B_PARAM],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Altering Dosing Interval, second slide"; 09.28 lecture',
 quote:'if we decrease that, um, dosing interval, then maybe we\'re cutting into that 3 to 5 half-lives a little bit more, so we\'re not going all the way to the bottom of that curve'},

{id:'m6b-c17', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'interval-time-to-ss', skill:'read',
 source:'both',
 stem:'Equal oral doses of a drug are given every 6 hours in one regimen and every 8 hours in another; ka and k are the same. What differs between the two curves of amount in the body against time?',
 options:[
  {t:'The plateau is higher with the 6-hour interval; the time to reach it is the same', correct:true,
   why:'Dosing more often puts more drug in per day, so the plateau is higher. The time to plateau is set by the half-life, which is the same for one drug in both regimens, so both curves level off over the same time.'},
  {t:'The 6-hour regimen reaches its plateau sooner',
   why:'This ties the time to plateau to the interval. It depends on the elimination half-life alone: more frequent doses raise the plateau but do not bring it earlier. Choosing this ties the time to plateau to the interval.'},
  {t:'The plateaus are the same height',
   why:'This leaves τ out of the steady-state level. Cavg∞ has τ in its denominator, so the regimen with the shorter interval plateaus higher. This answer leaves τ out of the steady-state level.'},
  {t:'The 8-hour regimen has a smaller swing between maximum and minimum',
   why:'This runs the wrong way. The longer interval gives each dose more time to be eliminated before the next, so its swing between maximum and minimum is larger.'}],
 teach:[
  {h:'The idea', list:[
    'The figure is from the chapter: two regimens of equal doses, one every 6 hours and one every 8 hours.',
    'The upper curve is the 6-hour regimen.',
    'Both curves level off over the same time.']},
  B_PARAM],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Altering Dosing Interval, third slide"; Chapter 9, Multiple-Dosage Regimens, section Drug Accumulation',
 quote:'Equal doses of drug were given every 6 hours (upper curve) and every 8 hours (lower curve). ka and k remain constant.'},

{id:'m6b-c18', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'clinical-rounding', skill:'apply',
 source:'transcript',
 stem:'A calculation gives a dosing interval of 3.72 hours and an oral dose of 17.29 mg. How should the regimen be written for the patient?',
 options:[
  {t:'An interval and a dose the patient can actually use, such as every 4 hours and a 20-mg strength', correct:true,
   why:'A patient cannot take a tablet every 3.72 hours, and no 17.29-mg oral dosage form exists, so both are rounded: to an interval a person can keep and a strength that is made. An IV dose can be given to the calculated milligram, because the nurse draws it up.'},
  {t:'Exactly as calculated, to keep the concentrations on target',
   why:'This treats the arithmetic as the regimen. The numbers give the target concentrations only if the patient takes the drug as prescribed, and every 3.72 hours will not be followed.'},
  {t:'Every 3.72 hours, but round the dose to 17 mg',
   why:'This rounds the wrong item and leaves the unusable one. The interval is the harder thing for a patient to keep, and an oral dose is limited to the strengths that exist, of which 17 mg is not one. This answer rounds the wrong item and leaves the unusable one.'},
  {t:'Every 4 hours, but keep 17.29 mg because oral doses are exact',
   why:'This reverses the two routes. It is the IV dose that can be given to the calculated milligram; a solid oral dose comes only in the strengths manufactured.'}],
 teach:[
  {h:'The idea', list:[
    'Exam answers for dosing intervals and oral doses are to be stated as a clinician would write them.',
    'The interval should make sense to the patient.',
    'The oral dose should be rounded to a strength that exists.']},
  B_PARAM],
 cite:'09.28 lecture',
 quote:'Don\'t tell me 17.29 mg for an oral dose. ... So, I\'m gonna ask you to round to something that makes more sense, right? 20 mg.'},

{id:'m6b-c19', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'oparam', concept:'peak-trough-range', skill:'read',
 source:'both',
 stem:'A dosage regimen is judged against the therapeutic range. Which two steady-state values have to lie inside it?',
 options:[
  {t:'The peak and the trough', correct:true,
   why:'The concentration swings between peak and trough every interval, so the regimen is safe only if the peak stays below the top of the range, and effective only if the trough stays above the bottom. The average can sit inside the range while the peak or trough falls outside it.'},
  {t:'The average and the first-dose peak',
   why:'This uses the wrong pair. The first-dose peak no longer applies once the patient is at steady state, and the average says nothing about how far the concentration swings around it.'},
  {t:'The concentration at time zero and at infinity',
   why:'This reads the ∞ sign as a time. At steady state the concentration repeats every interval; the values to check are the highest and lowest points of that repeat.'},
  {t:'Only the average',
   why:'This leaves out the fluctuation. Two regimens can share an average while one swings above the toxic level and below the effective level within every interval. Choosing this leaves out the fluctuation.'}],
 teach:[
  {h:'The idea', list:[
    'At steady state the curve swings between a peak and a trough every interval.',
    'Both must stay between the two dashed lines of the therapeutic range.',
    'Dose and interval are the two things a regimen can change to keep them there.']},
  B_PARAM],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Consider Peak and Trough"; 09.28 lecture',
 quote:'We wanna design a regimen that is going to be feasible for our patient to maintain.'},

/* ---- Example 1, tetracycline, in parts ---- */

{id:'m6b-n09', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'tmax-first-dose', skill:'oral',
 source:'both',
 stem:'An adult male (75 kg) received 250 mg tetracycline hydrochloride orally every 8 hours for 2 weeks. Tetracycline hydrochloride is about 75% bioavailable and has a VD of 1.5 L/kg. The t½ is about 10 hours and the ka is 0.9 hr⁻¹. When does the peak of the first dose occur?',
 units:'hr',
 answer:3.09,
 tol:0.05,
 steps:[
  {k:'unit', t:'k = {{frac:0.693|10 hr}} = 0.0693 hr⁻¹; VD = (1.5 L/kg)(75 kg) = 112.5 L',
   why:'The half-life becomes k, and the per-kilogram volume is scaled to the patient. tmax needs only k and ka; VD is needed for the next part.'},
  {k:'setup', t:'tmax = {{frac:ln(ka/k)|ka - k}}',
   why:'For the first dose the body starts empty, so the single-dose time to peak applies, with no τ in it. The dosing interval enters only at steady state.'},
  {k:'algebra', t:'tmax = {{frac:ln(0.9/0.0693)|0.9 - 0.0693}} = {{frac:ln(12.99)|0.8307}} = {{frac:2.564|0.8307}} = 3.09 hr',
   why:'Reciprocal hours in the denominator leave hours. The logarithm has no units, because {{frac:ka|k}} is a ratio of two rate constants in the same unit.'},
  {k:'round', t:'tmax = 3.1 hr',
   why:'Her value: "something like 3-ish hours for T-Max", written as 3.1 hr in the working. The first-dose Cmax is evaluated at this time in the next part.'}],
 setup:{eq:'tmax', pre:['thalf-first'], why:'"orally every 8 hours", "peak of the first dose": a single oral dose, because the body held no drug before it. t½ and ka are given and tmax is asked, so tmax = {{frac:ln(ka/k)|ka - k}}, with no τ in it. k first, from the half-life, because the line wants k, not t½.'},
 teach:[
  {h:'The idea', list:[
    'The first-dose Cmax (peak concentration) is the single-dose equation evaluated at tmax (the time to peak).',
    'So tmax must be found first, the same order as in Module 5.']},
  B_ORAL_CMP],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Example 1"; 09.28 lecture',
 quote:'So C-Max of first dose, how do we find that? You gotta find T Max first, right?'},

{id:'m6b-n10', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'cmax-first-dose', skill:'oral',
 source:'both',
 stem:'For the tetracycline regimen (250 mg orally, F 0.75, VD 112.5 L, k 0.0693 hr⁻¹, ka 0.9 hr⁻¹), the first dose peaks at 3.09 hours. What is Cmax of the first dose?',
 units:'mg/L',
 answer:1.35,
 tol:0.03,
 steps:[
  {k:'setup', t:'Cmax = {{frac:F ka D0|VD(ka - k)}} (e^(-k tmax) - e^(-ka tmax))',
   why:'This is the single-oral-dose equation with t set to tmax. The interval does not enter, because this is the first dose.'},
  {k:'algebra', t:'{{frac:F ka D0|VD(ka - k)}} = {{frac:(0.75)(0.9 hr⁻¹)(250 mg)|(112.5 L)(0.9 - 0.0693 hr⁻¹)}} = {{frac:168.75|93.45}} = 1.806 mg/L',
   why:'mg times hr⁻¹ over L times hr⁻¹ leaves mg/L. This prefactor is not the peak: it multiplies a bracket that is always less than 1, so the peak is smaller than 1.806 mg/L.'},
  {k:'algebra', t:'e^(-0.0693 × 3.09) - e^(-0.9 × 3.09) = 0.807 - 0.062 = 0.745',
   why:'At the peak most of the dose has been absorbed (the ka term, 0.062, is nearly gone) and little has been eliminated (the k term is still 0.807), so the bracket is close to 0.75.'},
  {k:'algebra', t:'Cmax = 1.806 × 0.745 = 1.35 mg/L',
   why:'The prefactor times the bracket: 1.806 × 0.745 = 1.35. Both factors are known only once tmax has been found, which is why tmax came first.'},
  {k:'round', t:'Cmax = 1.35 mg/L',
   why:'Her value: "1.35 mg per liter for C-Max". The steady-state peak of 3.4 mg/L is compared with this first-dose peak.'}],
 setup:{eq:'oral-cp', pre:[], why:'"orally", "Cmax of the first dose": a single oral dose at its peak. F, D0, VD, k, ka and tmax are given and Cmax is asked, so the single oral dose line Cp = {{frac:FkaD0|VD(ka - k)}}(e^(-kt) - e^(-kat)) with t = tmax. No hinge: k and tmax are given.'},
 teach:[
  {h:'The idea', list:[
    'This is the Module 5 single-dose calculation.',
    'Its result is the value the steady-state peak is compared with in the next parts.']},
  B_ORAL_CMP],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Example 1"; 09.28 lecture',
 quote:'do we get something like 3-ish hours for T-Max? And 1.35 mg per liter for C-Max.'},

{id:'m6b-n11', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'tmax-ss', skill:'multidose',
 source:'both',
 stem:'For the tetracycline regimen (250 mg orally every 8 hours, k 0.0693 hr⁻¹, ka 0.9 hr⁻¹), when does the peak occur at steady state?',
 units:'hr',
 answer:2.06,
 tol:0.04,
 steps:[
  {k:'setup', t:'tmax∞ = {{frac:1|ka - k}} ln[{{frac:ka(1 - e^(-kτ))|k(1 - e^(-ka τ))}}]',
   why:'At steady state the interval enters the time to peak. The two bracketed terms carry τ with k and with ka; they are what make this equation differ from the single-dose tmax.'},
  {k:'algebra', t:'1 - e^(-0.0693 × 8) = 1 - 0.574 = 0.426; 1 - e^(-0.9 × 8) = 1 - 0.0007 = 0.999',
   why:'Over one 8-hour interval 43 per cent of the drug is eliminated, and absorption is complete (0.999) because ka is large.'},
  {k:'algebra', t:'ln[{{frac:0.9 × 0.426|0.0693 × 0.999}}] = ln({{frac:0.383|0.0692}}) = ln(5.53) = 1.710',
   why:'The ratio inside the logarithm is smaller than the single-dose {{frac:ka|k}} of 12.99, which is why the steady-state peak comes earlier.'},
  {k:'algebra', t:'tmax∞ = {{frac:1.710|0.8307 hr⁻¹}} = 2.06 hr',
   why:'Dividing by ka − k = 0.8307 hr⁻¹ leaves hours, because the logarithm has no units. {{frac:1.710|0.8307}} = 2.06 hr, about an hour earlier than the first-dose peak.'},
  {k:'round', t:'tmax∞ = 2.06 hr',
   why:'Her value: "T-Max at steady state. I got 2.06 hours." It is shorter than the first-dose 3.1 hours, and it is the time at which Cmax at steady state is evaluated.'}],
 setup:{eq:'tmax-ss', pre:[], why:'"orally every 8 hours", "peak occur at steady state": multiple oral doses at the plateau, so the line with τ in it. k, ka and τ are given and tmax∞ is asked, so tmax∞ = {{frac:1|ka - k}} ln[{{frac:ka(1 - e^(-kτ))|k(1 - e^(-kaτ))}}]. No hinge: k and ka are given.'},
 teach:[
  {h:'The idea', list:[
    'The steady-state peak comes earlier than the first-dose peak.',
    'Find tmax∞ (the time to peak at steady state) before Cmax∞ (the peak at steady state), as with the first dose.']},
  B_ORAL_EQ,
  B_ORAL_CMP],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Time to Peak at Steady State"; slide "Example 1"; 09.28 lecture',
 quote:'T-Max at steady state. I got 2.06 hours. T-Max of the single dose. Come on back. I got 3.1 hour.'},

{id:'m6b-n12', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'cmax-ss-oral', skill:'multidose',
 source:'both',
 stem:'For the tetracycline regimen (250 mg orally every 8 hours, F 0.75, VD 112.5 L, k 0.0693 hr⁻¹), the steady-state peak occurs at 2.06 hours. What is Cmax at steady state?',
 units:'mg/L',
 answer:3.39,
 tol:0.12,
 steps:[
  {k:'setup', t:'Cmax∞ = {{frac:FD0|VD}} ({{frac:1|1 - e^(-kτ)}}) e^(-k tmax∞)',
   why:'The steady-state peak for an oral dose: the absorbed dose per litre, raised by the accumulation factor, then declined for the time to peak.'},
  {k:'algebra', t:'{{frac:FD0|VD}} = {{frac:(0.75)(250 mg)|112.5 L}} = 1.667 mg/L',
   why:'The concentration the absorbed dose would give if it were all in the body at once: 75 per cent of 250 mg, spread through 112.5 L.'},
  {k:'algebra', t:'{{frac:1|1 - e^(-(0.0693)(8))}} = {{frac:1|1 - 0.574}} = {{frac:1|0.426}} = 2.35',
   why:'The accumulation factor for an 8-hour interval and a 10-hour half-life. It is more than double, because less than one half-life passes between doses.'},
  {k:'algebra', t:'e^(-0.0693 × 2.06) = e^(-0.143) = 0.867; Cmax∞ = 1.667 × 2.35 × 0.867 = 3.39 mg/L',
   why:'The decline over the 2.06 hours to the peak, from her tmax at steady state. The product of the three factors, 1.667 × 2.35 × 0.867, is the peak at steady state.'},
  {k:'round', t:'Cmax∞ = 3.4 mg/L',
   why:'Her spoken value is "Steady state, 3.3". Carried with tmax∞ = 2.06 the product is 3.39 mg/L, and with 2.1, as written in the working, also 3.39. It is higher than the first-dose 1.35 mg/L, as accumulation predicts.'}],
 setup:{eq:'cmax-ss-oral', pre:[], why:'"orally every 8 hours", "Cmax at steady state": multiple oral doses at the plateau. F, D0, VD, k, τ and tmax∞ are given and Cmax∞ is asked, so Cmax∞ = {{frac:FD0|VD}}({{frac:1|1 - e^(-kτ)}})e^(-k tmax∞), the oral line with F and tmax∞ in it. No hinge: k and tmax∞ are given.'},
 teach:[
  {h:'The idea', list:[
    'Here Cmax∞ is about two and a half times the first-dose Cmax.',
    'The reason: an 8-hour interval on a 10-hour half-life leaves most of each dose behind when the next is taken.']},
  B_ORAL_EQ,
  B_ORAL_CMP],
 audit:'Her spoken values in the recording are "3.3" for Cmax at steady state after "1.5, 1.35" for the first dose. From her inputs, Cmax∞ = 1.6667 × 2.3497 × e^(-0.0693 × 2.059) = 3.395 mg/L; with tmax∞ rounded to 2.1 hr, 3.386. The tolerance of 0.12 accepts 3.27 to 3.51, which covers her 3.3 and the computed values.',
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"; slide "Example 1"; 09.28 lecture',
 quote:'So C Max, so the first dose, I got 1.5, 1.35. Steady state, 3.3.'},

{id:'m6b-n13', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'cmin-ss-oral', skill:'multidose',
 source:'both',
 stem:'For the tetracycline regimen (250 mg orally every 8 hours, F 0.75, VD 112.5 L, k 0.0693 hr⁻¹, ka 0.9 hr⁻¹), what is Cmin at steady state?',
 units:'mg/L',
 answer:2.44,
 tol:0.05,
 steps:[
  {k:'setup', t:'Cmin∞ = {{frac:ka F D0|VD(ka - k)}} ({{frac:1|1 - e^(-kτ)}}) e^(-kτ)',
   why:'The steady-state trough for an oral dose: the single-dose prefactor, raised by the accumulation factor, declined for one full interval.'},
  {k:'algebra', t:'{{frac:ka F D0|VD(ka - k)}} = {{frac:(0.9 hr⁻¹)(0.75)(250 mg)|(112.5 L)(0.8307 hr⁻¹)}} = 1.806 mg/L',
   why:'The same prefactor as in the first-dose Cmax calculation, since nothing in it changes with repeated dosing: F, ka, VD and k are set by the drug, the product and the patient, and D0 is the same dose each time.'},
  {k:'algebra', t:'{{frac:1|1 - e^(-(0.0693)(8))}} = 2.35; e^(-(0.0693)(8)) = 0.574',
   why:'The accumulation factor for τ = 8 hr and k = 0.0693 hr⁻¹, and the fraction of a dose remaining after one full interval, e^(-0.554) = 0.574.'},
  {k:'algebra', t:'Cmin∞ = 1.806 × 2.35 × 0.574 = 2.44 mg/L',
   why:'The product of the three factors: 1.806 × 2.35 × 0.574 = 2.44 mg/L. The trough is lower than the peak by the decline over the rest of the interval after the peak.'},
  {k:'round', t:'Cmin∞ = 2.44 mg/L',
   why:'Her value: "I\'m getting 2.4-ish." The steady-state trough, 2.44 mg/L, is higher than the first-dose peak of 1.35 mg/L.'}],
 setup:{eq:'cmin-ss-oral', pre:[], why:'"orally every 8 hours", "Cmin at steady state": multiple oral doses at the plateau, at the end of the interval. F, D0, VD, k, ka and τ are given and Cmin∞ is asked, so Cmin∞ = {{frac:kaFD0|VD(ka - k)}}({{frac:1|1 - e^(-kτ)}})e^(-kτ). No hinge: k and ka are given.'},
 teach:[
  {h:'The idea', list:[
    'The oral trough carries the single-dose prefactor, not {{frac:FD0|VD}}, and e^(-kτ) for the full interval.',
    'For a bolus the trough is Cmax∞ e^(-kτ), which has no absorption term to carry.']},
  B_ORAL_EQ],
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"; slide "Example 1"; 09.28 lecture',
 quote:'And then what\'s accumulated. I\'m getting 2.4-ish. Anybody get something like that?'},

{id:'m6b-n14', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L09',
 topic:'multoral', sub:'ossc', concept:'cavg-ss-oral', skill:'multidose',
 source:'both',
 stem:'For the tetracycline regimen (250 mg orally every 8 hours, F 0.75, VD 112.5 L, k 0.0693 hr⁻¹), what is Cavg at steady state?',
 units:'mg/L',
 answer:3.01,
 tol:0.05,
 steps:[
  {k:'setup', t:'Cavg∞ = {{frac:FD0|VD k τ}}',
   why:'The same average as for repeated bolus doses, with F less than 1 because only 75 per cent of each oral dose is absorbed. ClT (total clearance) = VD k.'},
  {k:'algebra', t:'FD0 = (0.75)(250 mg) = 187.5 mg; VD k τ = (112.5 L)(0.0693 hr⁻¹)(8 hr) = 62.37 L',
   why:'L times hr⁻¹ times hr leaves litres, so the result is mg over L. VD k is the clearance, 7.80 L/hr, and clearance times τ is 62.37 L.'},
  {k:'algebra', t:'Cavg∞ = {{frac:(0.75)(250 mg)|(112.5 L)(0.0693 hr⁻¹)(8 hr)}} = {{frac:187.5 mg|62.37 L}} = 3.01 mg/L',
   why:'The average over one interval at steady state: 187.5 mg absorbed per interval, divided by the 62.37 L of plasma cleared per interval.'},
  {k:'round', t:'Cavg∞ = 3.01 mg/L',
   why:'Computed from her inputs. The average, 3.01 mg/L, lies between the trough, 2.44, and the peak, 3.39 mg/L, and above their midpoint, 2.915.'}],
 setup:{eq:'cavg-ss', pre:['cl-k-vd'], why:'"orally every 8 hours", "Cavg at steady state". F, D0, VD, k and τ are given and Cavg∞ is asked, so Cavg∞ = {{frac:FD0|ClT τ}}, the same as {{frac:FD0|VDkτ}}; F is less than one because the dose is oral. ClT first, from ClT = kVD, because the line wants clearance.'},
 teach:[
  {h:'The idea', list:[
    'The average needs no tmax and no accumulation factor.',
    'For this oral regimen it sits above the midpoint of peak and trough (3.01 against 2.915 mg/L).',
    'For an IV bolus regimen the curve only falls, exponentially, so the average sits below the midpoint.']},
  B_ORAL_EQ],
 audit:'She set the calculation up aloud ("It\'s our F 0.75 times our dose. Divided by a volume and distribution, 112.5 L. Divided by ... our tau") and did not state the value in the recording. 3.01 = 187.5/(112.5 × 0.0693 × 8) from her inputs. The midpoint of 3.39 and 2.44 is 2.915.',
 cite:'6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"; slide "Example 1"; 09.28 lecture',
 quote:'And then our C average at steady state. It\'s our F 0.75 times our dose. Divided by a volume and distribution, 112.5 L.'},

];
