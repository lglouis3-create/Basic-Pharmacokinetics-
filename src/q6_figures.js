/* ==========================================================================
   FIGURE-READING QUESTIONS — every module
   ==========================================================================
   Dr. Mosley says three times, in three different lectures, that she will put
   a curve or a data set in front of the class and expect it to be classified:

     "here is the secret. On this exam, I am going to give you a data set, and
      I expect you to figure out if it's zero or first."          (09-09)
     "if I give you a graph ... and I'm telling you that it is an IV bolus
      dose ... That should say to you that this is a two compartment model."  (08-26)
     "if I give you a curve on the exam and it looks like this, where there is
      a clear peak ... I want you to identify that as an oral input."         (09-21)

   and, on the thing that decides every one of them:

     "you've got to pay attention to the axis."                   (09-09)

   So each question here shows one figure and asks what process it is evidence
   of. None of them asks for a number. The figures come from figures.py, which
   draws them rather than cropping a slide, because the axis is what is being
   tested and a drawn axis can carry a decade scale with no "log" written on
   it, which is the case she warns about. Each question's `note` says the
   figure is drawn and where its numbers come from.

   These carry their own exam, module and lecture fields, so the blueprint
   pools pick them up in the right paper without any of the per-module files
   changing.
   ========================================================================== */
const Q_FIGURES = [

/* ───────────────── Module 1 — deciding the order ───────────────── */
{id:'fig-ord-1', skill:'order', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'decide', concept:'order-from-linear-straight', source:'both',
 stem:'Plasma concentration is plotted against time on the axis shown, and the points fall on a straight line. What does this indicate about the process removing the drug?',
 img:'ord_linear_straight',
 options:[
  {t:'It is zero order', correct:true,
   why:'The concentration axis is marked 0, 25, 50, 75, 100, so equal distances up the axis are equal amounts of drug. A straight line on that axis therefore means the same amount is lost in every hour, which is what zero order means: dC/dt = −k0, a rate that does not depend on how much drug is present.'},
  {t:'It is first order', correct:false,
   why:'First order removes a fixed fraction rather than a fixed amount, so on an evenly spaced axis it draws a curve that flattens as concentration falls. Choosing this means reading the straightness without checking the axis first; a straight line only indicates first order once the axis has been shown to step by a factor of ten.'},
  {t:'The order cannot be decided without the half-life', correct:false,
   why:'The half-life is a consequence of the order, not a precondition for finding it. Picking this reverses the order of work: the shape of the line on a known axis settles the order, and only then does the matching half-life relation apply, C0/2k0 for zero order or 0.693/k for first.'},
  {t:'The order cannot be decided without knowing the dose', correct:false,
   why:'The dose sets where the curve starts, not how it falls. Reaching for this confuses the intercept with the slope: C0 moves the whole line up or down the axis, while the order is carried entirely by the shape between the points.'}],
 teach:[
  {h:'What the axis is doing', t:'The concentration axis is evenly spaced: the gap from 25 to 50 is the same distance as the gap from 75 to 100. On an axis like that, the steepness of the line is the amount of drug lost per hour.'},
  {h:'What a straight line means here', t:'A straight line has one steepness everywhere, so the same amount of drug leaves in every hour whether the concentration is high or low. That is the definition of zero order, written dC/dt = −k0.'},
  {h:'How the variables relate', t:'Integrating dC/dt = −k0 gives C = C0 − k0t, a straight line whose intercept is C0 and whose slope is −k0. Because k0 is an amount per unit time, its units are concentration per time, such as mg/L per hour, and the half-life C0/2k0 depends on where you start.'},
  {h:'The one thing to check first', t:'This shape means zero order only because the axis is evenly spaced. The same straight line on an axis marked 1, 10, 100, 1000 would mean first order instead, which is why the axis is read before the line.'}],
 quote:'if you look at that scale and you see that it is not changing by regular one infinite, or it’s increasing by a a function of 10, then that tells you that it is a logarithmic scale',
 note:'The figure is drawn for this drill, on the evenly spaced axis the zero-order slide uses.',
 cite:'Introduction.pdf slide 17'},

{id:'fig-ord-2', skill:'order', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'decide', concept:'order-from-linear-curve', source:'both',
 stem:'Plasma concentration is plotted against time on the axis shown. What does the shape of this line indicate about the process removing the drug?',
 img:'ord_linear_curve',
 options:[
  {t:'It is first order', correct:true,
   why:'The axis is evenly spaced, so steepness is the amount lost per hour. The line is steep early and shallow late, meaning less drug leaves per hour as the concentration falls. A rate that shrinks in proportion to what remains is first order, dC/dt = −kC.'},
  {t:'It is zero order', correct:false,
   why:'Zero order loses the same amount every hour, which draws a straight line on this axis rather than a bend. Picking this reads the general downward direction and stops one step short of asking whether the steepness is changing, and the changing steepness is the whole signal.'},
  {t:'The process changes from zero order to first order partway through', correct:false,
   why:'Nothing on the figure marks a switch; the bend is smooth and continuous from the first point to the last. This answer comes from treating a gradual curve as two straight segments joined, when a single first-order process produces exactly this smooth bend on its own.'},
  {t:'The drug is being absorbed as well as eliminated', correct:false,
   why:'Absorption adds drug, so a curve with absorption in it rises to a peak before falling. Choosing this misreads a monotonic decline as an input process; here the concentration starts at its highest value and only falls, so nothing is entering.'}],
 teach:[
  {h:'What the curve is saying', t:'Between hour 0 and hour 2 the concentration drops by about 40 units; between hour 8 and hour 10 it drops by about 5. The amount leaving per hour is falling as the concentration falls.'},
  {h:'How the variables relate', t:'First order sets the rate proportional to what is present, dC/dt = −kC. The constant k is a fraction removed per unit time, so its units are reciprocal time, such as hr⁻¹, and it never carries a concentration unit.'},
  {h:'Why the half-life is one number', t:'Because a fixed fraction goes in every interval, the time to lose half is the same at every starting concentration. That is why a first-order half-life is quoted as a single value for a drug, t½ = 0.693/k, while a zero-order half-life, C0/2k0, changes with the starting concentration.'},
  {h:'Straightening it out', t:'Plotting the natural logarithm of the same concentrations against time gives ln C = ln C0 − kt, a straight line of slope −k. That is the reason concentration data are so often shown on a decade axis.'}],
 note:'The figure is drawn for this drill, on the evenly spaced axis the first-order slide uses.',
 cite:'Introduction.pdf slide 18'},

{id:'fig-ord-3', skill:'read', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'plots', concept:'order-from-semilog-straight', source:'both',
 stem:'Plasma concentration is plotted against time on the axis shown, and the points fall on a straight line. What does this indicate about the process removing the drug?',
 img:'ord_semilog_straight',
 options:[
  {t:'It is first order', correct:true,
   why:'The concentration axis runs 1, 10, 100, 1000, so each equal step up the axis multiplies the concentration by ten. A straight line on a multiplying axis means a constant fraction is lost per hour, which is first order.'},
  {t:'It is zero order', correct:false,
   why:'This is the answer the figure is built to catch. It comes from reading the line as straight without reading the axis, and the axis is not evenly spaced: 1 to 10 covers the same distance as 100 to 1000. Her instruction is to look at the scale before judging the line.'},
  {t:'It is first order only if the axis is labelled as logarithmic', correct:false,
   why:'The word is usually absent, which she flags directly, so this answer means waiting for a label that never arrives and classifying nothing. The tick values are the evidence: 1, 10, 100, 1000 is a decade scale whether or not anything on the figure says so.'},
  {t:'The order cannot be decided from a graph alone', correct:false,
   why:'The shape on a stated axis is exactly what settles it, and she says a data set or a curve will be given for this purpose. Picking this treats the graph as decoration rather than as the evidence, when the axis and the line together carry the answer.'}],
 teach:[
  {h:'Read the tick values, not the line', t:'The ticks are 1, 10, 100 and 1000. Each equal distance up the axis multiplies the concentration by ten, so the axis compresses large values and stretches small ones.'},
  {h:'Why first order straightens on it', t:'First order gives ln C = ln C0 − kt. Plotting the logarithm of concentration against time therefore plots a straight line of slope −k. An axis whose ticks step by tens is plotting that logarithm for you.'},
  {h:'How the slope relates to k', t:'On an axis of base-ten decades the relation is log C = log C0 − kt/2.3, so the slope read off the figure is −k/2.3 rather than −k. Multiplying that slope by 2.3 recovers the elimination rate constant.'},
  {h:'The instruction she repeats', t:'A straight line means first order on a decade axis and zero order on an evenly spaced axis. The line alone settles nothing, which is why the axis is read first every time.'}],
 quote:'I expect for you, because you will see graphs like this, and this word will not be over here most of the time. you’ve got to pay attention to the axis',
 note:'The figure is drawn for this drill from the points on her semi-logarithmic slide: 200, 93, 44, 21, 10, 4.9 and 2.3 at hours 0 to 6.',
 cite:'Introduction.pdf slide 21'},

{id:'fig-ord-4', skill:'order', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'plots', concept:'order-from-semilog-curve', source:'both',
 stem:'Plasma concentration is plotted against time on the axis shown. What does the shape of this line indicate about the process removing the drug?',
 img:'ord_semilog_curve',
 options:[
  {t:'It is zero order', correct:true,
   why:'The axis steps by factors of ten, which is the axis that straightens a first-order decline. This line bends away downward instead, so the process is not first order; a constant amount lost per hour drops through the lower decades faster and faster, giving exactly this plunge.'},
  {t:'It is first order', correct:false,
   why:'First order is what this axis straightens, so a first-order decline would be a straight line here. Choosing this reads the axis correctly and then ignores what the line does on it, which reverses the test: on a decade axis, straight means first order and bent means it is not.'},
  {t:'The drug follows a two-compartment model', correct:false,
   why:'A two-compartment decline bends the other way, steep first and then shallower, because the fast distribution phase finishes and the slower elimination phase takes over. This line does the opposite, starting shallow and steepening, so reading it as two compartments has the direction backwards.'},
  {t:'The concentrations were measured incorrectly', correct:false,
   why:'A smooth, regular bend is a kinetic signal rather than noise; measurement error scatters points about a line instead of curving them consistently in one direction. Reaching for this dismisses the evidence the question is asking to be read.'}],
 teach:[
  {h:'What this axis does to each order', t:'A decade axis plots the logarithm of concentration. First order becomes a straight line on it, because ln C falls by a constant amount each hour. Zero order does not, because C falls by a constant amount instead.'},
  {h:'Why zero order plunges at the end', t:'Under C = C0 − k0t the same amount leaves every hour, so the last of the drug disappears over the same time as the first of it. Near the bottom of the axis that fixed amount is a huge fraction of what is left, and on a multiplying axis a huge fraction is a long way down.'},
  {h:'How the variables relate', t:'Zero order: C = C0 − k0t, with k0 in concentration per time, and a half-life C0/2k0 that depends on the starting concentration. First order: C = C0e−kt, with k in reciprocal time, and a half-life 0.693/k that does not.'},
  {h:'The two-step test', t:'Read the axis, then read the line. Evenly spaced axis plus straight line means zero order. Decade axis plus straight line means first order. Either axis with a bend means the other order.'}],
 note:'The figure is drawn for this drill: a constant-rate decline placed on the same decade axis as the previous figure, so the two can be compared directly.',
 cite:'Introduction.pdf slides 17–21'},

{id:'fig-ord-5', skill:'read', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'plots', concept:'semilog-axis-recognition', source:'transcript',
 stem:'A concentration axis on an examination figure is marked 1, 10, 100, 1000 at equal spacing, with no other label. Which statements about that axis are correct? Select all that apply.',
 multi:true,
 img:'ord_semilog_straight',
 options:[
  {t:'Equal distances up the axis represent equal multiples of concentration', correct:true,
   why:'Moving one tick multiplies the value by ten every time, from 1 to 10 and again from 100 to 1000. That is what a logarithmic axis does: it turns multiplication into equal distance, which is why a fixed-fraction process draws a straight line on it.'},
  {t:'A straight line on this axis indicates a first-order process', correct:true,
   why:'First order gives ln C = ln C0 − kt, so the logarithm of concentration falls by equal amounts in equal times. An axis that plots that logarithm turns the decline into a straight line.'},
  {t:'The axis is evenly spaced in concentration', correct:false,
   why:'The distance from 1 to 10 covers nine units and the distance from 100 to 1000 covers nine hundred, yet the two are drawn the same length. Selecting this reads the evenly spaced tick marks as evenly spaced values, which is the confusion the figure is built around.'},
  {t:'The axis cannot be treated as logarithmic unless it is labelled as such', correct:false,
   why:'She warns that the word is usually missing from the figure, so the tick values have to carry the decision. Holding out for a label means treating an unlabelled decade axis as linear and classifying every such graph the wrong way round.'}],
 teach:[
  {h:'How to recognise it in one look', t:'Read two neighbouring tick values and divide. If the answer is the same multiple each time, such as ten, the axis is logarithmic. If the difference is the same each time, such as twenty-five, it is evenly spaced.'},
  {h:'Why the label is usually missing', t:'She states plainly that the word will not be printed on most figures and that the axis has to be read instead. The tick values are always there, so they are the reliable evidence.'},
  {h:'What follows once it is recognised', t:'On a decade axis a straight line means first order, and the slope is −k/2.3 for base-ten decades. On an evenly spaced axis a straight line means zero order, and the slope is −k0 directly.'}],
 quote:'Notice that it doesn’t say. Log',
 note:'The figure is drawn for this drill and carries no axis label, which is the case described.',
 cite:'Introduction.pdf slides 20–21'},

/* ───────────────── Module 2 — one compartment or two ───────────────── */
{id:'fig-cpt-1', skill:'read', prof:'Mosley', tier:'new', exam:1, module:2, lecture:'L03',
 topic:'bolus2', sub:'why', concept:'compartments-from-one-line', source:'both',
 stem:'A drug is given as an intravenous bolus injection and the plasma concentrations are plotted on the axis shown. Which model does this figure support?',
 img:'cpt_one',
 options:[
  {t:'A one-compartment model', correct:true,
   why:'The axis steps by factors of ten and the data make a single straight line on it, so one first-order process describes the whole decline. That is the one-compartment picture: the drug spreads through the body fast enough that only elimination is left to watch.'},
  {t:'A two-compartment model', correct:false,
   why:'Two compartments give two straight segments of different steepness, a fast distribution phase and then a slower elimination phase. Choosing this reads a single line as though it had a bend in it; the figure has one slope from the first point to the last.'},
  {t:'A zero-order elimination process', correct:false,
   why:'A constant amount lost per hour would bend away downward on this decade axis rather than stay straight. This answer comes from reading straightness without reading the axis, which inverts the test on an axis whose ticks multiply by ten.'},
  {t:'An extravascular input', correct:false,
   why:'Anything absorbed has to rise before it falls, giving a clear peak. Picking this misreads a decline that starts at its highest value; an intravenous bolus puts the whole dose in at once, so the highest concentration is at time zero.'}],
 teach:[
  {h:'What counts as one compartment', t:'The model treats the body as a single well-mixed space. Distribution is assumed to finish instantly, so from the first sample onward the only thing changing the concentration is elimination.'},
  {h:'Why that gives one straight line', t:'A single first-order process gives C = C0e−kt, so on a decade axis the points fall on one line of slope −k/2.3. One process produces one slope, and one slope is what the figure shows.'},
  {h:'How the variables relate', t:'From this one line everything else follows: C0 is the intercept at time zero, k is read from the slope, t½ = 0.693/k, the apparent volume of distribution is VD = dose/C0, and total body clearance is Cl = k × VD.'},
  {h:'What to look for instead', t:'Her instruction is that the model has to be stated or shown. Given a semi-logarithmic plot after a bolus, one straight line points to one compartment and a bend to two.'}],
 quote:'If I gave you a graph on a log scale that looks just like the blue line all by itself, that tells you it’s an IV bolus dose one compartment model.',
 note:'The figure is drawn for this drill as the single-phase decline she describes.',
 cite:'2IVBolusAdministration.pdf, slide "Why Multicompartment Models?"'},

{id:'fig-cpt-2', skill:'read', prof:'Mosley', tier:'new', exam:1, module:2, lecture:'L03',
 topic:'bolus2', sub:'why', concept:'compartments-from-two-phases', source:'both',
 stem:'A drug is given as an intravenous bolus injection and the plasma concentrations are plotted on the axis shown. Which model does this figure support?',
 img:'cpt_two',
 options:[
  {t:'A two-compartment model', correct:true,
   why:'On an axis that straightens a single first-order process, this line has two steepnesses: a steep early stretch and a shallower straight tail. Two slopes mean two processes, a fast distribution into the tissues followed by slower elimination.'},
  {t:'A one-compartment model', correct:false,
   why:'One compartment gives one slope for the whole decline. Choosing this reads only the long straight tail and treats the steep early portion as the start of the same line, when the change of steepness is the feature that separates the two models.'},
  {t:'A zero-order input followed by first-order elimination', correct:false,
   why:'That combination describes an infusion, which rises to a plateau before any decline. This answer reads a falling curve as though drug were still going in; a bolus puts the whole dose in at once and the concentration only falls.'},
  {t:'A first-order absorption phase followed by elimination', correct:false,
   why:'Absorption would raise the concentration to a peak first, so the curve would rise before it fell. Reaching for this confuses the steep early fall of distribution, which moves drug out of the plasma into tissue, with an input, which moves drug in.'}],
 teach:[
  {h:'The two phases on the figure', t:'The steep early stretch is the distribution phase: drug is leaving the plasma both into the tissues and out of the body, so the plasma concentration falls fast. The shallower tail is the elimination phase, once plasma and tissue have equilibrated and only elimination is left.'},
  {h:'What the letters stand for', t:'The curve is C = Ae−αt + Be−βt. A and B are intercepts obtained by extrapolating each straight portion back to time zero, and α and β are the slopes, so α describes the fast distribution and β the slower elimination. α is always larger than β.'},
  {h:'Which half-life is wanted', t:'The half-life asked for is the elimination half-life, t½ = 0.693/β, taken straight from the terminal slope. She says she will name it as the beta half-life or the elimination half-life so there is no ambiguity, and that solving for an overall k first is unnecessary work.'},
  {h:'The volume this figure gives', t:'The volume of the central compartment is the dose divided by the concentration at time zero, and that concentration is A + B, the two intercepts added together.'}],
 quote:'if I give you a graph that looks something like this without the red and blue and just a log scale and I’m telling you that it is an IV bolus dose, and I just give you a line that looks like this one, the black line. That should say to you that this is a two compartment model.',
 note:'The figure is drawn for this drill from the equation on her recap slide, C = 15e−3.4t + 7e−0.12t, with the terminal line extrapolated back so both phases are visible.',
 cite:'2IVBolusAdministration.pdf, slide "Why Multicompartment Models?"'},

{id:'fig-cpt-3', skill:'read', prof:'Mosley', tier:'new', exam:1, module:2, lecture:'L03',
 topic:'bolus2', sub:'params', concept:'which-phase-is-beta', source:'both',
 stem:'On the plot shown, the dashed line is the terminal portion extrapolated back to time zero. Which quantity is obtained from the slope of that dashed line?',
 img:'cpt_two',
 options:[
  {t:'β, the elimination rate constant', correct:true,
   why:'The terminal portion is the part of the curve left once distribution has finished, so its slope describes elimination alone. Extrapolating it back to time zero also gives the intercept B without disturbing that slope.'},
  {t:'α, the distribution rate constant', correct:false,
   why:'α is the slope of the steep early stretch, not the shallow tail. Selecting this swaps the two phases; the steepness order is the check, since distribution is the faster process and α is therefore always the larger constant.'},
  {t:'The overall elimination rate constant k', correct:false,
   why:'k is a one-compartment quantity describing a single combined process, and a two-compartment curve is not described by one rate constant. Choosing this means carrying a one-compartment habit into a two-compartment figure, and she says explicitly not to solve for k here.'},
  {t:'The transfer rate constant from the central to the peripheral compartment', correct:false,
   why:'That constant, written k12, is obtained from the model equations rather than read off either slope. Reaching for it reads a transfer between compartments as though it were the terminal decline, which is the net result of elimination.'}],
 teach:[
  {h:'Why the tail is the elimination phase', t:'Early on, drug leaves the plasma by two routes at once, into the tissues and out of the body. Once the tissues have equilibrated, the movement between compartments nets out and only elimination continues to lower the concentration.'},
  {h:'What each symbol is', t:'In C = Ae−αt + Be−βt, A and B are intercepts in concentration units and α and β are slopes in reciprocal time. α belongs to the steep distribution phase and β to the shallow elimination phase, so α > β always.'},
  {h:'The relations that follow', t:'Elimination half-life is 0.693/β. The concentration at time zero is A + B, and the volume of the central compartment is the dose divided by A + B.'},
  {h:'What she does and does not ask', t:'She states that feathering and the method of residuals are to be understood but not performed, and that A, B, α and β will be supplied. What is asked is what they represent and what follows from them.'}],
 quote:'I am pretty much gonna give you A, B, alpha, beta I want you to know what they represent and why we use them.',
 note:'The figure is drawn for this drill from the equation on her recap slide, C = 15e−3.4t + 7e−0.12t.',
 cite:'2IVBolusAdministration.pdf, slide "Why Multicompartment Models?"'},

/* ───────────────── Module 3 — infusion ───────────────── */
{id:'fig-inf-1', skill:'read', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'basics', concept:'shape-of-infusion-curve', source:'both',
 stem:'Plasma concentration is plotted against time from the start of dosing, as shown. What kind of input produces this shape?',
 img:'inf_css',
 options:[
  {t:'A constant-rate intravenous infusion', correct:true,
   why:'The concentration starts at zero, climbs steadily and then levels off at a plateau it never quite passes. A constant input against a first-order output gives exactly that: as concentration rises the rate out rises with it, until the two match and the level stops changing.'},
  {t:'An intravenous bolus injection', correct:false,
   why:'A bolus puts the whole dose in at once, so the concentration is highest at time zero and only falls. Choosing this reads the plateau as the flat tail of a decline and ignores the rise, when the curve starts from zero and goes up.'},
  {t:'A single oral dose', correct:false,
   why:'A single oral dose rises to a peak and then falls away once absorption is finished. This answer stops at the rising portion; the figure never turns over, because drug keeps arriving at the same rate for the whole period shown.'},
  {t:'Repeated oral doses given at fixed intervals', correct:false,
   why:'Repeated doses give a sawtooth, climbing with each dose and falling between them. Reaching for this reads a smooth approach to a plateau as an average through those peaks and troughs, but nothing here fluctuates.'}],
 teach:[
  {h:'The two processes on the figure', t:'Drug goes in at a fixed rate R, an amount per unit time that does not depend on how much is already there, so the input is zero order. Drug comes out by a first-order process, so the rate out is proportional to the concentration present.'},
  {h:'Why it plateaus', t:'At first the concentration is low, so little is leaving and the level climbs quickly. As it rises the rate out rises with it, the gap between in and out narrows, and the climb slows. Steady state is where rate in equals rate out and the concentration stops changing.'},
  {h:'How the variables relate', t:'The plateau is Css = R/Cl, and since Cl = k × VD it can also be written R/(k × VD). Raising R raises the plateau in proportion; it does not change how long the plateau takes to arrive.'},
  {h:'How long it takes', t:'The approach depends only on the half-life, so the short answer is three to five half-lives. Each half-life closes half the remaining gap: one gets to 50% of Css, two to 75%, three to 87.5%.'}],
 quote:'Our input is zero order, constant in, first order out. When we stop the in, then it’s just out.',
 note:'The figure is drawn for this drill for a drug with a five-hour half-life reaching a plateau of 20 mg/L.',
 cite:'3IntravenousInfusions.pdf, slide "Intravenous Infusion"'},

{id:'fig-inf-2', skill:'infusion', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'css', concept:'rate-change-css-not-time', source:'both',
 stem:'The same drug is infused into the same patient at two different rates, as shown. Which statements about the difference between the two curves are correct? Select all that apply.',
 multi:true,
 img:'inf_two_rates',
 options:[
  {t:'Doubling the rate doubles the steady-state concentration', correct:true,
   why:'The plateau is Css = R/Cl, and clearance is a property of the drug and the patient rather than of the rate. With Cl fixed, the plateau is directly proportional to R, so twice the rate gives twice the plateau.'},
  {t:'Both curves reach their plateau at the same time', correct:true,
   why:'The time to steady state is set by the half-life alone, so the same drug in the same patient takes the same three to five half-lives either way. Raising the rate lifts the whole curve without moving the time axis.'},
  {t:'The higher rate reaches steady state sooner', correct:false,
   why:'This is the error she says she will ask about repeatedly. It comes from reading the steeper early climb of the upper curve as a faster approach, but both curves have closed the same fraction of their own gap at every moment; the higher one simply has further to go.'},
  {t:'The higher rate shortens the half-life of the drug', correct:false,
   why:'The half-life follows from k, which follows from clearance and volume of distribution, and an infusion rate changes none of them. Selecting this treats a dosing decision as though it altered the drug’s disposition, when the rate sets only where the plateau sits.'}],
 teach:[
  {h:'What the rate controls', t:'The infusion rate sets the height of the plateau and nothing else. Css = R/Cl, so doubling R doubles Css exactly, and the whole curve shifts upward while keeping its shape.'},
  {h:'What sets the time instead', t:'How fast the plateau is approached depends on the elimination rate constant, through the half-life. Each half-life closes half of whatever gap remains: 50% after one, 75% after two, 87.5% after three, which is why three to five half-lives is the answer she wants.'},
  {h:'How the variables relate', t:'Css = R/Cl fixes the height; t½ = 0.693/k fixes the timing. R appears in the first relation and not in the second, which is the entire reason changing the rate cannot change the time.'},
  {h:'When the wait is unacceptable', t:'If the plateau is needed sooner than three to five half-lives, raising the rate does not help. A loading dose does, because it puts the steady-state amount into the body immediately: DL = Css × VD.'}],
 quote:'changing the rate changes our steady state concentration with me. I feel like I’ve said it 5 times, and I’ve said it 5 times because this is one of those things that I want you to take with you. so I’ve said it 5 times. I’m gonna ask it of you 10 times.',
 note:'The figure is drawn for this drill for one drug with a five-hour half-life at two rates, the second twice the first.',
 cite:'3IntravenousInfusions.pdf, slide "Intravenous Infusion"'},

/* ───────────────── Module 4 — order from the elimination rate ───────────────── */
{id:'fig-elim-1', skill:'read', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'clcalc', concept:'order-from-rate-vs-conc-linear', source:'both',
 stem:'For one drug in one patient, the measured rate of elimination is plotted against the plasma concentration at which it was measured. What does this figure indicate?',
 img:'elim_rate_linear',
 options:[
  {t:'Elimination is first order, and the slope is the clearance', correct:true,
   why:'The points lie on a straight line through the origin, so the rate of elimination is proportional to the concentration present. That proportionality is what first order means, and the constant of proportionality in rate = Cl × Cp is the clearance itself.'},
  {t:'Elimination is zero order, and the slope is the clearance', correct:false,
   why:'Zero order means the rate does not change with concentration, which would draw a horizontal line rather than a rising one. Selecting it means reading the clearance relation correctly and then attaching it to the wrong order; a rising line is the signature of the rate depending on concentration.'},
  {t:'Elimination is first order, and the slope is the elimination rate constant', correct:false,
   why:'The axes decide which constant the slope is. Rate as an amount per time against concentration gives a slope in volume per time, which is clearance; k would come from plotting the rate against the amount in the body instead. Choosing this confuses two constants that differ by the volume of distribution.'},
  {t:'The drug is eliminated by more than one route', correct:false,
   why:'A single straight line is consistent with any number of routes, because total clearance is the sum of the individual clearances and still behaves as one constant. Reaching for this reads a simple proportionality as evidence of structure the figure does not show.'}],
 teach:[
  {h:'What the axes are', t:'The horizontal axis is the plasma concentration at the moment of measurement and the vertical axis is how fast drug is leaving the body at that moment. Each point is one pairing of the two.'},
  {h:'Why a straight line through the origin means first order', t:'First order is defined by the rate being proportional to what is present. Proportionality drawn on these axes is a straight line whose intercept is zero: no drug present, nothing leaving.'},
  {h:'How the variables relate', t:'The relation is rate of elimination = Cl × Cp. Rearranged, Cl = rate/Cp, so the slope is the clearance. Its units work out as amount per time divided by amount per volume, which leaves volume per time, such as L/hr.'},
  {h:'Why clearance is treated as a constant', t:'Clearance is k × VD, and both are properties of the drug in that patient rather than of the dose. A constant times a constant is a constant, which is why one slope serves every concentration on the figure.'}],
 quote:'our rate of elimination. Is our clearance times the concentration of drug in the plasma… 15 mL. Per minute. Times. 5 mcg per mL… So 75 mcg per minute.',
 note:'The figure is drawn for this drill for a drug of clearance 2 L/hr, plotted over the concentration range she works with.',
 cite:'4---Clearance-and-Elimination.pdf, slide "Clearance"'},

{id:'fig-elim-2', skill:'order', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'clcalc', concept:'order-from-rate-vs-conc-flat', source:'both',
 stem:'For a second drug, the measured rate of elimination is plotted against the plasma concentration at which it was measured, as shown. What does this figure indicate about its elimination?',
 img:'elim_rate_flat',
 options:[
  {t:'It is zero order', correct:true,
   why:'The rate is the same at every concentration on the axis, so how much drug is present makes no difference to how fast it leaves. A rate that does not depend on the amount present is the definition of zero order, dC/dt = −k0.'},
  {t:'It is first order', correct:false,
   why:'First order requires the rate to rise with concentration, giving a line that climbs from the origin. Selecting this reads a straight line as first order without checking its direction; a horizontal line is straight and still shows no dependence on concentration at all.'},
  {t:'The clearance is unusually high', correct:false,
   why:'Clearance is the slope of rate against concentration, and the slope here is zero, so clearance is not high but undefined as a single constant. This answer comes from treating the height of the line as the clearance, when it is the steepness that carries it.'},
  {t:'The measurements were taken before steady state', correct:false,
   why:'These axes carry no time, so nothing about them depends on whether steady state was reached. Reaching for this imports a timing concern into a plot whose two variables are a rate and a concentration.'}],
 teach:[
  {h:'What a flat line means', t:'Reading across the figure, the concentration changes fourfold while the rate of elimination does not move. The process removing the drug is working at a fixed capacity, so the same amount leaves per hour regardless of how much is there.'},
  {h:'How the variables relate', t:'Zero order gives C = C0 − k0t, with k0 an amount per unit time. Because the rate is fixed, the half-life C0/2k0 depends on the starting concentration, so a zero-order drug has no single half-life.'},
  {h:'What this does to clearance', t:'Clearance is defined as rate divided by concentration. With the rate fixed, that ratio falls as concentration rises, so clearance is no longer one number for the drug and the relation Cl = k × VD stops being usable.'},
  {h:'The contrast to hold', t:'On these axes, a line rising from the origin means first order and its slope is the clearance. A horizontal line means zero order and there is no single clearance to read.'}],
 note:'The figure is drawn for this drill on the same axes as the previous one, so the two shapes can be compared directly.',
 cite:'4---Clearance-and-Elimination.pdf, slide "Clearance"'},

/* ───────────────── Module 5 — a single oral dose ───────────────── */
{id:'fig-oral-1', skill:'read', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'extravasc', concept:'oral-curve-recognition', source:'both',
 stem:'Plasma concentration is plotted against time after a single dose, as shown. What route and kinetics does this curve indicate?',
 img:'oral_peak',
 options:[
  {t:'An extravascular dose, first order in and first order out', correct:true,
   why:'The concentration starts at zero, rises to a clear peak and then falls away. A rise means drug is still entering, so the dose was not placed directly into the blood, and the smooth curved rise and fall are both first-order processes.'},
  {t:'An intravenous bolus dose', correct:false,
   why:'A bolus places the whole dose in the blood at once, so the highest concentration occurs at time zero and the curve only falls. Choosing this ignores the rising portion, which can only happen while drug is still arriving.'},
  {t:'A constant-rate intravenous infusion', correct:false,
   why:'An infusion climbs to a plateau and stays there while the infusion runs. This answer stops one step short, reading the rise and not the turn; the curve peaks and declines, which an infusion does not do until it is switched off.'},
  {t:'An extravascular dose with zero-order absorption', correct:false,
   why:'Zero-order input delivers drug at a fixed rate, which gives the straight climb and plateau of an infusion rather than a rounded peak. Reaching for this confuses a modified-release product, which she describes as looking like an infusion, with an ordinary oral dose.'}],
 teach:[
  {h:'What the peak is', t:'Before the peak the absorption rate is greater than the elimination rate, so the concentration climbs. After the peak elimination is the larger of the two and it falls. At the peak itself the two rates are equal, which is what makes it the maximum.'},
  {h:'How the variables relate', t:'The curve is C = (F·D·ka)/(VD(ka − k)) × (e−kt − e−ka·t). F is the fraction of the dose reaching the circulation, ka is the first-order absorption rate constant and k the elimination rate constant.'},
  {h:'What sets the time of the peak', t:'tmax = ln(ka/k)/(ka − k). Only the two rate constants appear, so the time of the peak does not move when the dose changes. She requires tmax to be found before Cmax every time, whether or not it is asked for.'},
  {h:'The one letter that flags this route', t:'A capital F in a problem means an extravascular dose, because a fraction less than one has reached the circulation. For an intravenous dose F is taken as one, since all of it is already there.'}],
 quote:'if I give you a curve on the exam and it looks like this. where there is a clear peak. we go up, we peak, we come back down, then you, I want you to identify that as an oral input. First order in, first order out.',
 note:'The figure is drawn for this drill from the parameters she works through in class: F = 0.85, dose 500 mg, VD 22 L, ka 0.924 hr⁻¹, k 0.231 hr⁻¹, which put the peak at 2.0 hours and 12.17 mg/L.',
 cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Plasma Level–Time Curve"'},

{id:'fig-oral-2', skill:'read', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'conc', concept:'oral-terminal-slope', source:'both',
 stem:'The concentrations after a single oral dose are plotted on the axis shown. What can be obtained from the straight portion at the right-hand end of the curve?',
 img:'oral_semilog',
 options:[
  {t:'The elimination rate constant', correct:true,
   why:'By the right-hand end absorption is essentially complete, so the only process still changing the concentration is elimination. On an axis whose ticks step by ten, that single first-order process draws a straight line whose slope carries k.'},
  {t:'The absorption rate constant', correct:false,
   why:'Absorption governs the rising portion and has finished by the time the tail is straight. Selecting this swaps the two constants; ka is obtained from the early part of the curve, usually by subtracting the extrapolated terminal line from the measured points.'},
  {t:'The bioavailable fraction', correct:false,
   why:'F scales the whole curve up or down and cannot be recovered from a slope, which is unchanged by scaling. This answer comes from reading a height question off a steepness, and F is normally obtained by comparing areas under the curve.'},
  {t:'The time of the peak', correct:false,
   why:'tmax is read on the horizontal axis where the curve turns over, well to the left of the straight tail. Reaching for this takes a feature of the rising part of the curve from the part where the rise is long finished.'}],
 teach:[
  {h:'Why the tail straightens', t:'The curve is the difference of two exponentials. The absorption term dies away faster than the elimination term, so once it has gone only the elimination term is left, and a single exponential is a straight line on a decade axis.'},
  {h:'How the variables relate', t:'In the tail the concentration behaves as C = (intercept) × e−kt, so ln C falls linearly with time at slope −k. Reading that slope and applying t½ = 0.693/k gives the elimination half-life.'},
  {h:'Which half-life is meant', t:'She states that an unqualified t½ means the half-life of elimination. The absorption half-life exists but is asked for by name.'},
  {h:'What the rising part needs', t:'The absorption rate constant cannot be read directly from the figure, because the early points contain both processes at once. Separating them is the method of residuals, which she asks to be understood rather than performed.'}],
 quote:'If it’s just T1/2, then your assumption is that I’m looking for the half-life of elimination',
 note:'The figure is drawn for this drill from the same parameters as the previous one, replotted on a decade axis.',
 cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Plasma Level–Time Curve"'},

{id:'fig-oral-3', skill:'apply', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'peak', concept:'rates-equal-at-cmax', source:'both',
 stem:'At the marked peak of the curve shown, what is true of the rates of absorption and elimination?',
 img:'oral_peak',
 options:[
  {t:'They are equal', correct:true,
   why:'The concentration stops rising and starts falling at the peak, so at that instant the amount entering per unit time matches the amount leaving. A maximum is exactly the point where the net change is zero.'},
  {t:'Absorption is faster than elimination', correct:false,
   why:'That describes the rising portion to the left of the peak, where more drug is arriving than leaving. Choosing this reads the condition that produced the climb as though it still held at the top of it, but the climb has stopped there.'},
  {t:'Elimination is faster than absorption', correct:false,
   why:'That describes the falling portion to the right of the peak. Selecting this reads the condition ahead of the peak rather than at it, so the direction is right but the instant is wrong.'},
  {t:'Absorption has finished', correct:false,
   why:'Absorption is still running at the peak and continues for some time afterwards; what has happened is that elimination has caught up with it. This confuses the rates being equal with the input having stopped, which are different events at different times.'}],
 teach:[
  {h:'Reading the peak as a balance', t:'The curve is the net of two opposing processes. To the left, absorption outpaces elimination and the concentration climbs. To the right, elimination outpaces absorption and it falls. The peak is the single moment when neither is ahead.'},
  {h:'How the variables relate', t:'Setting the rate of change to zero gives tmax = ln(ka/k)/(ka − k), which contains only the two rate constants. Because the dose does not appear, giving twice the dose doubles Cmax and leaves tmax where it was.'},
  {h:'The order she requires', t:'Cmax is found by substituting tmax back into the concentration equation, so tmax must be calculated first. She states that this holds even when tmax is not itself asked for.'},
  {h:'What moves the peak', t:'Only a change in ka or k moves tmax. Speeding absorption relative to elimination brings the peak earlier and higher; speeding elimination brings it earlier and lower.'}],
 quote:'Right at CMax, the rate N is going to be equal to the rate out.',
 note:'The figure is drawn for this drill from her worked parameters, with the peak at 2.0 hours and 12.17 mg/L.',
 cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Plasma Level–Time Curve"'},

];
