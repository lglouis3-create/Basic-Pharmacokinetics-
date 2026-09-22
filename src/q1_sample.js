/* ==========================================================================
   SAMPLE QUESTION BANK  —  PLACEHOLDER CONTENT
   ==========================================================================
   Six questions whose only job is to exercise every path the engine has:
   two plain multiple choice, one select-all, two numeric (one of which needs a
   unit conversion) and one match. The pharmacokinetics in here is invented and
   the citations point at a deck that does not exist. Delete this file once a
   real bank exists, or keep it as a fixture and leave it out of DATA_FILES.

   TOPICS is declared at the top of the FIRST question file, exactly as in the
   reference implementation: topic -> subtopics, each with the slide range it
   is drawn from.
   ========================================================================== */
const TOPICS = [
 {id:'orders', name:'Kinetic orders', prof:'Mosley', open:true,
  cite:'Introduction.pdf (placeholder deck)',
  subs:[
   {id:'defn', name:'Defining zero and first order', cite:'slides 4–9'},
   {id:'calc', name:'Working the equations',          cite:'slides 10–18'}]},

 {id:'params', name:'Primary parameters', prof:'Mosley',
  cite:'Introduction.pdf (placeholder deck)',
  subs:[
   {id:'vd',  name:'Volume of distribution', cite:'slides 19–24'},
   {id:'half',name:'Half-life and k',        cite:'slides 25–31'}]},
];

const QUESTIONS = [

/* ───────────────── plain multiple choice ───────────────── */
{id:'ord-1', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'defn', concept:'zero-order-rate', skill:'recall',
 source:'slide',
 stem:'A drug eliminated by a zero-order process loses:',
 options:[
  {t:'A constant amount of drug per unit time', correct:true,
   why:'A zero-order rate does not depend on how much drug is present, so the same number of milligrams leaves each hour whether the concentration is high or low. The enzyme or transporter doing the work is already saturated, so adding more drug cannot make it go faster. Plotted against time on linear axes the concentration falls as a straight line.'},
  {t:'A constant fraction of the drug present per unit time', correct:false,
   why:'That is first order, and the two are easy to swap because both are described as constant. The constant in first order is a proportion, not a quantity, so the milligrams lost per hour fall as the concentration falls. Picking this means reading the word constant without checking what it attaches to.'},
  {t:'An amount proportional to the square of the concentration', correct:false,
   why:'A rate proportional to concentration squared is second order, which this course does not use for elimination. The exponent in the rate law is what names the order, so squaring the concentration moves it two steps away from zero order rather than one.'},
  {t:'Nothing until the concentration falls below the target range', correct:false,
   why:'No kinetic order switches itself off at a threshold. Elimination runs from the moment drug is in the body; what changes with concentration is the rate, not whether the process happens at all. This answer confuses a kinetic description with a therapeutic one.'}],
 teach:'Order names what the elimination rate depends on. Zero order means the rate is a fixed quantity per unit time, because the machinery removing the drug is saturated. First order means the rate is a fixed proportion per unit time, because the machinery has spare capacity and sees only a share of what is present. Every other statement about the shape of the curve follows from that one distinction.',
 cite:'Introduction.pdf slides 4–6',
 quote:'Zero order: a constant amount is eliminated per unit time'},

{id:'ord-2', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'defn', concept:'first-order-semilog', skill:'read',
 source:'slide',
 stem:'A first-order elimination curve plotted on semi-logarithmic axes appears as:',
 options:[
  {t:'A straight line whose slope is −k/2.303', correct:true,
   why:'Taking logarithms of an exponential decay turns it into a linear equation, so the curve straightens. The slope carries the elimination rate constant, divided by 2.303 when base-ten logarithms are used rather than natural ones. Reading the slope off that line is how the rate constant is obtained from measured concentrations.'},
  {t:'A straight line whose slope is −k', correct:false,
   why:'This is right in shape and wrong in scale, and the error comes from mixing natural logarithms with base-ten ones. The slope is −k only when the vertical axis is the natural logarithm of concentration; semi-logarithmic graph paper is base ten, which introduces the factor of 2.303.'},
  {t:'A curve that steepens as time passes', correct:false,
   why:'A first-order curve steepens on linear axes at early times and flattens later, not the reverse, and on semi-logarithmic axes it does neither. Reaching for this answer means picturing the linear plot while answering a question about the logarithmic one.'},
  {t:'A horizontal line at the initial concentration', correct:false,
   why:'A horizontal line would mean the concentration never changes, which describes no elimination at all. Nothing about changing the axis scale removes the decline; the axis only changes the shape the decline is drawn in.'}],
 teach:'Two plots of the same data answer different questions. Linear axes show what the concentration actually is at a given time. Semi-logarithmic axes show whether the process is first order at all, because only a first-order decline straightens. Once it is straight, the slope gives the rate constant and the intercept gives the extrapolated starting concentration.',
 cite:'Introduction.pdf slides 12–14'},

/* ───────────────── select-all ───────────────── */
{id:'ord-3', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01', multi:true,
 topic:'orders', sub:'defn', concept:'first-order-properties', skill:'recall',
 source:'slide',
 stem:'Select every statement that is true of a first-order elimination process.',
 options:[
  {t:'The half-life is independent of the starting concentration', correct:true,
   why:'Because a fixed proportion is removed per unit time, the time taken to lose half of whatever is present is the same at every concentration. That is why a single half-life can be quoted for a drug at all, rather than one value per dose.'},
  {t:'The elimination rate constant has units of reciprocal time', correct:true,
   why:'The rate constant multiplies a concentration to give a rate, so its units are whatever makes that arithmetic balance: concentration per time divided by concentration leaves reciprocal time. Quoting it in mg per hour means it has been swapped with a zero-order rate constant.'},
  {t:'The amount eliminated per hour is the same at every concentration', correct:false,
   why:'This is the zero-order property stated with a first-order label. The fraction removed per hour is what stays the same; the amount falls as the concentration falls. Selecting this means holding the word constant and losing what it applies to.'},
  {t:'Doubling the dose doubles the half-life', correct:false,
   why:'Doubling the dose doubles the starting concentration and leaves the half-life untouched, which is the first option restated in reverse. The dose sets where the curve begins, not how steeply it falls.'}],
 teach:'Every first-order property traces back to proportionality. The rate is a proportion of what is present, so the constant is a proportion per unit time, so its units are reciprocal time, so the time to halve is fixed. A statement that fixes an amount rather than a proportion belongs to zero order.',
 cite:'Introduction.pdf slides 7–9'},

/* ───────────────── numeric, with a unit conversion ───────────────── */
{id:'par-1', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'params', sub:'vd', concept:'c0-from-vd', skill:'calc',
 source:'slide',
 stem:'A 70 kg patient receives a 0.35 g intravenous bolus of a drug whose volume of distribution is 0.35 L/kg. Assuming a one-compartment model, what is the plasma concentration immediately after the dose?',
 units:'mg/L',
 answer:14.2857,
 tol:0.2,
 steps:[
  {k:'unit', t:'Dose = 0.35 g × 1000 mg/g = 350 mg',
   why:'The volume comes out in litres and the answer is asked for in milligrams per litre, so the dose has to be in milligrams before it is divided by anything. Grams multiplied by milligrams per gram leaves milligrams, and the gram unit cancels.'},
  {k:'setup', t:'Vd = 0.35 L/kg × 70 kg = 24.5 L',
   why:'A volume of distribution quoted per kilogram is not a volume yet; it becomes one only after it is multiplied by that patient\'s weight. Litres per kilogram multiplied by kilograms leaves litres, which is the unit the next step needs.'},
  {k:'algebra', t:'C0 = Dose ÷ Vd = 350 mg ÷ 24.5 L',
   why:'Volume of distribution is defined as the amount of drug in the body divided by the plasma concentration, so rearranging it for concentration puts the dose on top and the volume underneath. Immediately after a bolus the amount in the body is the whole dose.'},
  {k:'round', t:'C0 = 14.2857 mg/L, reported as 14.29 mg/L',
   why:'Milligrams divided by litres leaves milligrams per litre, which is what was asked for. Two decimal places is as far as the input data justifies, since the weight and the volume were each given to two significant figures.'}],
 teach:'Volume of distribution is the proportionality constant between the amount of drug in the body and the concentration measured in plasma. Every calculation built on it is the same rearrangement of one relationship, so the work is in getting the units to agree before dividing rather than in the division itself.',
 cite:'Introduction.pdf slides 19–21'},

/* ───────────────── numeric, no conversion ───────────────── */
{id:'par-2', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'params', sub:'half', concept:'halflife-from-k', skill:'calc',
 source:'slide',
 stem:'A drug is eliminated by a first-order process with an elimination rate constant of 0.1155 per hour. What is its elimination half-life?',
 units:'hours',
 answer:6.0,
 tol:0.1,
 steps:[
  {k:'setup', t:'t½ = 0.693 ÷ k',
   why:'Half-life is the time for the concentration to fall to half its value. Solving the first-order decay equation for that time leaves the natural logarithm of two, which is 0.693, divided by the rate constant.'},
  {k:'algebra', t:'t½ = 0.693 ÷ 0.1155 per hour',
   why:'The rate constant goes underneath because it sits in the denominator of the rearranged equation. Dividing by a quantity in reciprocal hours is the same as multiplying by hours, which is why the answer comes out as a time.'},
  {k:'round', t:'t½ = 6.0 hours',
   why:'The division gives exactly six to the precision the rate constant was quoted at. Reporting more decimal places would claim accuracy the four-figure rate constant does not support.'}],
 teach:'The rate constant and the half-life are two descriptions of the same first-order decline, linked by the logarithm of two. Either one can be quoted, and converting between them is a single division, so a question that gives one and asks for the other is testing whether that link is held.',
 cite:'Introduction.pdf slides 25–27'},

/* ───────────────── match ───────────────── */
{id:'ord-4', type:'match', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'calc', concept:'order-signatures', skill:'apply',
 source:'slide',
 stem:'Match each elimination process to the behaviour that identifies it.',
 left:['Zero order', 'First order', 'Capacity-limited'],
 right:['A constant amount leaves per unit time',
        'A constant fraction leaves per unit time',
        'The order changes as the concentration falls'],
 pairs:[
  {l:'Zero order', r:'A constant amount leaves per unit time',
   why:'Saturated machinery works at its maximum rate regardless of how much drug is waiting, so the quantity removed each hour is fixed and the concentration falls in a straight line on linear axes.'},
  {l:'First order', r:'A constant fraction leaves per unit time',
   why:'Unsaturated machinery sees a share of what is present, so the proportion removed each hour is fixed and the quantity removed falls as the concentration falls.'},
  {l:'Capacity-limited', r:'The order changes as the concentration falls',
   why:'A process that is saturated at high concentration and unsaturated at low concentration behaves as zero order at the top of the curve and first order at the bottom, which is why neither single label describes it across the whole range.'}],
 teach:'The three descriptions are one continuum rather than three separate rules. What decides the behaviour is whether the eliminating machinery has spare capacity at the concentration being asked about, so identifying the order starts with asking whether the system is saturated there.',
 cite:'Introduction.pdf slides 15–18'},

];
