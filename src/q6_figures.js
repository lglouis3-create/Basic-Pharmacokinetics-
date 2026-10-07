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
   why:'The concentration axis is marked 0, 25, 50, 75, 100, so equal distances up the axis are equal amounts of drug. A straight line on that axis therefore means the same amount is lost in every hour, which is zero order: a rate that does not depend on how much drug is present.'},
  {t:'It is first order', correct:false,
   why:'First order removes a fixed fraction rather than a fixed amount, so on an evenly spaced axis it draws a curve that flattens as concentration falls. Choosing this reads the straightness without checking the axis; a straight line indicates first order only on an axis that steps by a factor of ten.'},
  {t:'The order cannot be decided without the half-life', correct:false,
   why:'The half-life is a consequence of the order, not a precondition for finding it. Picking this reverses the order of work: the shape of the line on a known axis settles the order, and only then does the matching half-life relation apply, C0/2k0 for zero order or {{frac:0.693|k}} for first.'},
  {t:'The order cannot be decided without knowing the dose', correct:false,
   why:'The dose sets where the curve starts, not how it falls. Reaching for this confuses the intercept with the slope: C0 moves the whole line up or down the axis, while the order is carried entirely by the shape between the points.'}],
 teach:[
  {h:'The idea', list:[
   'The concentration axis is evenly spaced: the gap from 25 to 50 is the same distance as the gap from 75 to 100.',
   'On an evenly spaced axis, the steepness of the line is the amount of drug lost per hour; a straight line has one steepness, so the same amount leaves every hour.',
   'Losing the same amount every hour is the definition of zero order, written {{frac:dC|dt}} = −k0, where k0 is the zero-order rate constant.']},
  {h:'The relation', list:[
   'Integrating {{frac:dC|dt}} = −k0 gives C = C0 − k0t: a straight line with intercept C0 (the concentration at time zero) and slope −k0.',
   'A rate constant reported in mg/hr or mcg/mL/hr belongs to a zero-order process; one reported in hr⁻¹ belongs to a first-order process.']}],
 quote:'if you look at that scale and you see that it is not changing by regular one infinite, or it’s increasing by a a function of 10, then that tells you that it is a logarithmic scale',
 audit:'Redrawn on the evenly spaced axis of the zero-order slide.',
 teachImg:'slide_Introduction_p20',
 cite:'Introduction.pdf slide 17'},

{id:'fig-ord-2', skill:'order', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'decide', concept:'order-from-linear-curve', source:'both',
 stem:'Plasma concentration is plotted against time on the axis shown. What does the shape of this line indicate about the process removing the drug?',
 img:'ord_linear_curve',
 options:[
  {t:'It is first order', correct:true,
   why:'The axis is evenly spaced, so steepness is the amount lost per hour. The line is steep early and shallow late, meaning less drug leaves per hour as the concentration falls. A rate that shrinks in proportion to what remains is first order, {{frac:dC|dt}} = −kC.'},
  {t:'It is zero order', correct:false,
   why:'Zero order loses the same amount every hour, which draws a straight line on this axis rather than a bend. Picking this reads the general downward direction and stops one step short of asking whether the steepness is changing, and the changing steepness is the whole signal.'},
  {t:'The process changes from zero order to first order partway through', correct:false,
   why:'Nothing on the figure marks a switch; the bend is smooth and continuous from the first point to the last. This answer comes from treating a gradual curve as two straight segments joined, when a single first-order process produces exactly this smooth bend on its own.'},
  {t:'The drug is being absorbed as well as eliminated', correct:false,
   why:'Absorption adds drug, so a curve with absorption in it rises to a peak before falling. Choosing this misreads a monotonic decline as an input process; here the concentration starts at its highest value and only falls, so nothing is entering.'}],
 teach:[
  {h:'The idea', list:[
   'Between hour 0 and hour 2 the concentration drops by about 40 units; between hour 8 and hour 10 it drops by about 5.',
   'So the amount leaving per hour falls as the concentration falls. A rate proportional to what is present is first order: {{frac:dC|dt}} = −kC.']},
  {h:'The relation', list:[
   'k, the elimination rate constant, is the fraction removed per unit time; its units are reciprocal time, such as hr⁻¹.',
   'Plotting the natural logarithm of the same concentrations against time gives ln C = ln C0 − kt, a straight line of slope −k. C0 is the concentration at time zero.',
   'A fixed fraction goes in every interval, so a first-order half-life is quoted as a single value for a drug: t½ = {{frac:0.693|k}}.']}],
 audit:'Redrawn on the evenly spaced axis of the first-order slide.',
 teachImg:'slide_Introduction_p21',
 cite:'Introduction.pdf slide 18'},

{id:'fig-ord-3', skill:'read', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'plots', concept:'order-from-semilog-straight', source:'both',
 stem:'Plasma concentration is plotted against time on the axis shown, and the points fall on a straight line. What does this indicate about the process removing the drug?',
 img:'ord_semilog_straight',
 options:[
  {t:'It is first order', correct:true,
   why:'The concentration axis runs 1, 10, 100, 1000, so each equal step up the axis multiplies the concentration by ten. A straight line on a multiplying axis means a constant fraction is lost per hour, which is first order.'},
  {t:'It is zero order', correct:false,
   why:'This comes from reading the line as straight without reading the axis, and the axis is not evenly spaced: 1 to 10 covers the same distance as 100 to 1000. Her instruction is to look at the scale before judging the line.'},
  {t:'It is first order only if the axis is labelled as logarithmic', correct:false,
   why:'The word is usually absent, which she flags directly, so this answer means waiting for a label that never arrives and classifying nothing. The tick values are the evidence: 1, 10, 100, 1000 is a decade scale whether or not anything on the figure says so.'},
  {t:'The order cannot be decided from a graph alone', correct:false,
   why:'The shape on a stated axis is exactly what settles it, and she says a data set or a curve will be given for this purpose. Picking this treats the graph as decoration rather than as the evidence, when the axis and the line together carry the answer.'}],
 teach:[
  {h:'The idea', list:[
   'Read the tick values, not the line. The ticks are 1, 10, 100 and 1000, so each equal distance up the axis multiplies the concentration by ten.',
   'First order gives ln C = ln C0 − kt, where C0 is the concentration at time zero and k the elimination rate constant.',
   'So plotting the logarithm of concentration against time gives a straight line. An axis whose ticks step by tens plots that logarithm for you.']},
  {h:'The relation', list:[
   'On an axis of base-ten decades the relation is log C = log C0 − {{frac:kt|2.3}}, so the slope read off the figure is −{{frac:k|2.3}}, not −k.',
   'Multiplying that slope by 2.3 recovers the elimination rate constant.']}],
 quote:'I expect for you, because you will see graphs like this, and this word will not be over here most of the time. you’ve got to pay attention to the axis',
 audit:'Redrawn from the points on her semi-logarithmic slide: 200, 93, 44, 21, 10, 4.9 and 2.3 at hours 0 to 6.',
 teachImg:'slide_Introduction_p24',
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
   why:'A smooth, regular bend is a kinetic signal rather than noise; measurement error scatters points about a line instead of curving them consistently in one direction. Reaching for this dismisses the shape of the curve, which is the evidence.'}],
 teach:[
  {h:'The idea', list:[
   'A decade axis, with ticks that step by tens, plots the logarithm of concentration.',
   'First order becomes a straight line on it, because ln C falls by a constant amount each hour. Zero order does not, because C itself falls by a constant amount each hour.']},
  {h:'Why zero order plunges at the end', list:[
   'Under C = C0 − k0t the same amount leaves every hour, so the last of the drug disappears over the same time as the first of it.',
   'Near the bottom of the axis, that fixed amount is a huge fraction of what is left. On a multiplying axis, a huge fraction lost is a long way down, so the line steepens.']},
  {h:'The two-step test', list:[
   'Read the axis, then read the line. Evenly spaced axis plus straight line: zero order. Decade axis plus straight line: first order. Either axis with a bend: the other order.']}],
 audit:'A constant-rate decline on the same decade axis as the straight-line figure.',
 teachImg:'slide_Introduction_p20',
 cite:'Introduction.pdf slides 17–21'},

{id:'fig-ord-5', skill:'read', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'plots', concept:'semilog-axis-recognition', source:'transcript',
 stem:'A concentration axis is marked 1, 10, 100, 1000 at equal spacing, with no other label. Which statement about that axis is correct?',

 img:'ord_semilog_straight',
 options:[
  {t:'a straight line on this axis indicates a first-order process', correct:true,
   why:'Moving one tick multiplies the value by ten every time, from 1 to 10 and again from 100 to 1000. That is what a logarithmic axis does: it turns multiplication into equal distance, which is why a fixed-fraction process draws a straight line on it.'},
  {t:'the axis is evenly spaced in concentration',
   why:'Selecting this reads the evenly spaced tick marks as evenly spaced values. The marks are equally far apart, but the values at them multiply by ten at each step: 1 to 10 adds nine units and 100 to 1000 adds nine hundred, so equal distances are equal multiples, not equal amounts.'},
  {t:'the axis cannot be treated as logarithmic unless it is labelled as such',
   why:'Picking this waits for a label that is usually missing. The tick values are the evidence: 1, 10, 100, 1000 step by a factor of ten, which only a logarithmic axis does, so the axis is treated as logarithmic whether or not the word log is printed beside it.'},
  {t:'a straight line on this axis indicates a zero-order process',
   why:'This answer reads the straightness without reading the axis. Zero order loses the same amount per hour and is straight only where equal distances are equal amounts; on this axis equal distances are equal multiples, so a straight line means a fixed fraction lost per hour, which is first order.'}],
 teach:[
  {h:'The idea', list:[
   'Read two neighbouring tick values and divide. If the answer is the same multiple each time, such as ten, the axis is logarithmic.',
   'If the difference is the same each time, such as twenty-five, the axis is evenly spaced.',
   'The word will not be printed on most figures; the tick values are always there, so they are the reliable evidence.']},
  {h:'What follows once it is recognised', list:[
   'On a decade axis, a straight line means first order. The slope is −{{frac:k|2.3}} for base-ten decades, where k is the elimination rate constant.',
   'On an evenly spaced axis, a straight line means zero order. The slope is −k0 directly, where k0 is the zero-order rate constant.']}],
 quote:'Notice that it doesn’t say. Log',
 audit:'Drawn with no axis label, the case she describes.',
 teachImg:'slide_Introduction_p23',
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
  {h:'The idea', list:[
   'The one-compartment model treats the body as a single well-mixed space. Distribution is assumed to finish instantly, so only elimination changes the concentration.',
   'A single first-order process gives C = C0e−kt, so on a decade axis the points fall on one line of slope −{{frac:k|2.3}}.',
   'Given a semi-logarithmic plot after an intravenous (IV) bolus, one straight line points to one compartment and a bend to two.']}],
 quote:'If I gave you a graph on a log scale that looks just like the blue line all by itself, that tells you it’s an IV bolus dose one compartment model.',
 audit:'Drawn as the single-phase decline she describes.',
 teachImg:'slide_2IVBolusAdministra_p13',
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
  {h:'The idea', list:[
   'The steep early stretch is the distribution phase. Drug leaves the plasma both into the tissues and out of the body, so the plasma concentration falls fast.',
   'The shallower tail is the elimination phase. Plasma and tissue have equilibrated, and only elimination is left.',
   'Two slopes mean two processes, so the figure supports two compartments.']},
  {h:'What the letters stand for', list:[
   'The curve is C = Ae−αt + Be−βt. A and B are intercepts, found by extending (extrapolating) each straight portion back to time zero.',
   'α (alpha) describes the fast distribution and β (beta) the slower elimination. α is always larger than β.']}],
 quote:'if I give you a graph that looks something like this without the red and blue and just a log scale and I’m telling you that it is an IV bolus dose, and I just give you a line that looks like this one, the black line. That should say to you that this is a two compartment model.',
 audit:'Redrawn from the equation on her recap slide, C = 15e−3.4t + 7e−0.12t, with the terminal line extrapolated back.',
 teachImg:'slide_2IVBolusAdministra_p13',
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
  {h:'The idea', list:[
   'Early on, drug leaves the plasma by two routes at once: into the tissues and out of the body.',
   'Once the tissues have equilibrated, the movement between compartments nets out, and only elimination still lowers the concentration.',
   'So the slope of the terminal portion, the tail, gives β, the elimination rate constant.']},
  {h:'What each symbol is', list:[
   'In C = Ae−αt + Be−βt, A and B are intercepts in concentration units; α and β are slopes in reciprocal time.',
   'Elimination half-life is {{frac:0.693|β}}.']}],
 quote:'I am pretty much gonna give you A, B, alpha, beta I want you to know what they represent and why we use them.',
 audit:'Redrawn from the equation on her recap slide, C = 15e−3.4t + 7e−0.12t.',
 teachImg:'slide_2IVBolusAdministra_p13',
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
  {h:'The idea', list:[
   'Drug goes in at a fixed rate R, an amount per unit time that does not depend on how much is already there. So the input is zero order.',
   'Drug comes out by a first-order process, so the rate out is proportional to the concentration present.']},
  {h:'Why it plateaus', list:[
   'At first the concentration is low, so little is leaving and the level climbs quickly.',
   'As it rises, the rate out rises with it, the gap between in and out narrows, and the climb slows.',
   'Steady state is where rate in equals rate out: Css = {{frac:R|Cl}}, where Css is the steady-state concentration and Cl the clearance.',
   'The approach depends only on the half-life: three to five half-lives.']}],
 quote:'Our input is zero order, constant in, first order out. When we stop the in, then it’s just out.',
 audit:'Drawn for a drug with a five-hour half-life reaching a plateau of 20 mg/L.',
 teachImg:'slide_3IntravenousInfusi_p3',
 cite:'3IntravenousInfusions.pdf, slide "Intravenous Infusion"'},

{id:'fig-inf-2', skill:'infusion', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'css', concept:'rate-change-css-not-time', source:'both',
 stem:'The same drug is infused into the same patient at two different rates, as shown. Which statement about the two curves is correct?',

 img:'inf_two_rates',
 options:[
  {t:'Both curves reach their plateau at the same time', correct:true,
   why:'The time to steady state is set by the half-life alone, so the same drug in the same patient takes the same three to five half-lives either way. Raising the rate lifts the whole curve without moving the time axis.'},
  {t:'The higher rate reaches steady state sooner', correct:false,
   why:'This is the error she says she will ask about repeatedly. It comes from reading the steeper early climb of the upper curve as a faster approach, but both curves have closed the same fraction of their own gap at every moment; the higher one simply has further to go.'},
  {t:'The higher rate reaches steady state later',
   why:'Picking this reads the higher plateau as a longer climb. Both curves close the same fraction of their own gap in each half-life, because the fraction reached, 1 − e^(−kt), has no rate term in it, so both arrive at steady state after the same three to five half-lives.'},
  {t:'The higher rate shortens the half-life of the drug', correct:false,
   why:'The half-life follows from k, which follows from clearance and volume of distribution, and an infusion rate changes none of them. Selecting this treats a dosing decision as though it altered the drug’s disposition, when the rate sets only where the plateau sits.'}],
 teach:[
  {h:'The idea', list:[
   'The infusion rate, R, sets the height of the plateau and nothing else: Css (steady-state concentration) = {{frac:R|Cl}}, where Cl is clearance.',
   'Doubling R doubles Css exactly, and the whole curve shifts upward while keeping its shape.',
   'How fast the plateau is approached depends on k, the elimination rate constant, through t½ = {{frac:0.693|k}}; R is not in it.',
   'Each half-life closes half of whatever gap remains: 50% after one, 75% after two, 87.5% after three.']},
  {h:'When the wait is unacceptable', t:'Raising the rate does not bring the plateau sooner. A loading dose does, because it puts the steady-state amount into the body immediately: DL = Css × VD.'}],
 quote:'changing the rate changes our steady state concentration with me. I feel like I’ve said it 5 times, and I’ve said it 5 times because this is one of those things that I want you to take with you. so I’ve said it 5 times. I’m gonna ask it of you 10 times.',
 audit:'Drawn for one drug with a five-hour half-life at two rates, the second twice the first.',
 teachImg:'slide_3IntravenousInfusi_p3',
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
  {h:'The idea', list:[
   'The horizontal axis is the plasma concentration, Cp, at the moment of measurement. The vertical axis is how fast drug is leaving the body at that moment.',
   'First order means the rate is proportional to what is present. On these axes that is a straight line through the origin.']},
  {h:'The relation', list:[
   'Rate of elimination = Cl × Cp, where Cl is clearance. Rearranged, Cl = {{frac:rate|Cp}}, so the slope is the clearance.',
   'Units: amount per time divided by amount per volume leaves volume per time, such as L/hr.',
   'Clearance is k × VD, the elimination rate constant times the apparent volume of distribution. Both belong to the drug in that patient, not to the dose, so one slope serves every concentration.',
   'Clearance stays a single number only while elimination is first order.']}],
 quote:'our rate of elimination. Is our clearance times the concentration of drug in the plasma… 15 mL. Per minute. Times. 5 mcg per mL… So 75 mcg per minute.',
 audit:'Drawn for a drug of clearance 2 L/hr, over the concentration range she works with.',
 teachImg:'slide_4ClearanceandElimi_p4',
 cite:'4---Clearance-and-Elimination.pdf, slide "Clearance"'},

{id:'fig-elim-2', skill:'order', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'clcalc', concept:'order-from-rate-vs-conc-flat', source:'both',
 stem:'For a second drug, the measured rate of elimination is plotted against the plasma concentration at which it was measured, as shown. What does this figure indicate about its elimination?',
 img:'elim_rate_flat',
 options:[
  {t:'It is zero order', correct:true,
   why:'The rate is the same at every concentration on the axis, so how much drug is present makes no difference to how fast it leaves. A rate that does not depend on the amount present is the definition of zero order, {{frac:dC|dt}} = −k0.'},
  {t:'It is first order', correct:false,
   why:'First order requires the rate to rise with concentration, giving a line that climbs from the origin. Selecting this reads a straight line as first order without checking its direction; a horizontal line is straight and still shows no dependence on concentration at all.'},
  {t:'The clearance is unusually high', correct:false,
   why:'Clearance is the slope of rate against concentration, and the slope here is zero, so clearance is not high but undefined as a single constant. This answer comes from treating the height of the line as the clearance, when it is the steepness that carries it.'},
  {t:'The measurements were taken before steady state', correct:false,
   why:'These axes carry no time, so nothing about them depends on whether steady state was reached. Reaching for this imports a timing concern into a plot whose two variables are a rate and a concentration.'}],
 teach:[
  {h:'The idea', list:[
   'Across the figure the concentration rises ninefold, from 2 to 18 mg/L, while the rate of elimination does not move.',
   'The process removing the drug is working at a fixed capacity, so the same amount leaves per hour regardless of how much is there: zero order.']},
  {h:'The relation', list:[
   'Zero order gives C = C0 − k0t, where k0 is an amount per unit time. The half-life C0/2k0 depends on the starting concentration.',
   'Clearance is the rate of elimination divided by the plasma concentration. With the rate fixed, that ratio falls as concentration rises, so clearance is no longer one number.',
   'On these axes, a line rising from the origin means first order, and its slope is the clearance.']}],
 audit:'Drawn on the same axes as the rising-line figure.',
 teachImg:'slide_4ClearanceandElimi_p4',
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
  {h:'The idea', list:[
   'Before the peak, the absorption rate is greater than the elimination rate, so the concentration climbs. After the peak, elimination is the larger, so it falls.',
   'At the peak itself the two rates are equal, which is what makes it the maximum.',
   'A peak needs an input that fades while elimination continues.']},
  {h:'The relations', list:[
   'The curve is Cp = {{frac:F ka D0|VD(ka - k)}} (e^(-kt) - e^(-ka t)), where ka is the first-order absorption rate constant and k the elimination rate constant.',
   'A capital F in a problem signals an extravascular dose: F is the fraction of the dose that reaches the circulation. For an intravenous dose F is taken as one.']}],
 quote:'if I give you a curve on the exam and it looks like this. where there is a clear peak. we go up, we peak, we come back down, then you, I want you to identify that as an oral input. First order in, first order out.',
 audit:'Drawn from the parameters she works through in class: F = 0.85, dose 500 mg, VD 22 L, ka 0.924 hr⁻¹, k 0.231 hr⁻¹, which put the peak at 2.0 hours and 12.17 mg/L.',
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
  {h:'The idea', list:[
   'The curve is the difference of two exponentials. The absorption term dies away faster than the elimination term.',
   'Once the absorption term has gone, only the elimination term is left, and a single exponential is a straight line on a decade axis.']},
  {h:'The relation', list:[
   'In the tail, ln C falls in a straight line with time, at slope −k. Applying t1/2 = {{frac:0.693|k}} gives the elimination half-life.',
   'A half-life written with no subscript means the elimination half-life; the absorption half-life is always labelled.']}],
 quote:'If it’s just T1/2, then your assumption is that I’m looking for the half-life of elimination',
 audit:'The same parameters as the peak figure, replotted on a decade axis.',
 cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Plasma Level–Time Curve"'},

{id:'fig-oral-3', skill:'apply', dupOf:'cq3-4', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
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
  {h:'The idea', list:[
   'The curve is the net of two opposing processes. To the left of the peak, absorption outpaces elimination; to the right, elimination outpaces absorption.',
   'At Cmax, the peak concentration, the rate of absorption equals the rate of elimination.']},
  {h:'The relation', list:[
   'Setting the rate of change to zero gives tmax = {{frac:ln(ka/k)|ka - k}}, where tmax is the time of the peak, ka the absorption rate constant and k the elimination rate constant.',
   'Just after tmax there is still drug at the absorption site. The tail becomes elimination alone later, once the site is depleted.']}],
 quote:'Right at CMax, the rate N is going to be equal to the rate out.',
 audit:'Drawn from her worked parameters, with the peak at 2.0 hours and 12.17 mg/L.',
 cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Plasma Level–Time Curve"'},

];
