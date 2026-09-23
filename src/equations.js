/* ==========================================================================
   EQUATIONS
   ==========================================================================
   The equations this course uses, as structured data, so they can be drilled
   rather than only read. The Reference view is the prose account of the same
   material; this is the same equations in the form a check can be run against.

   SOURCES. Every equation, symbol, unit and condition below is already carried
   by reference.js, which sources each one to BasicPharmacokineticsEquations.pdf
   (the exam equation sheet), one of the five lectured decks, Dr. Mosley's own
   worked solutions in STYLE.md, or her spoken words in TRANSCRIPT_CUES.md.
   Nothing new is asserted here.

   `must` marks the five she said out loud she does not put on the equation
   sheet, plus the second ideal-body-weight form. `sheet` records what the
   readable extract of the sheet carries: 'yes', 'no' where she said so, and
   'unknown' where the extract cannot be read and she never said either way.

   THE SHAPE OF AN ENTRY

     lhs     the left side, as display HTML
     tokens  the right side in the pieces it is built from, in order. The
             right side IS tokens.join(' '), so the reading exercise and the
             building exercise cannot come apart.
     disp    optional: the right side as the slides print it, with a ratio
             written {{frac:numerator|denominator}} so it stacks. Shown in
             the list and after an answer. Where it is absent the right side
             is shown as the pieces joined up. test.js checks it carries the
             same symbols and operators, in the same order, as typed.
     typed   the canonical answer in plain ASCII, which is what a typed answer
             is compared against after both are normalised
     also    other answers that are equally right, not near misses
     lures   wrong pieces for the tray in the building exercise. Each is a
             mistake a student actually makes: an inverted ratio, the rate
             constant where the half-life belongs, the wrong sign.

   test.js checks that lhs and tokens agree with typed under the normaliser, so
   an entry cannot key one thing to a typist and another to a builder, and that
   no lure matches a token of its own equation.

   OMITTED ON PURPOSE. The two Henderson-Hasselbalch forms on
   4---Clearance-and-Elimination.pdf slide 20 are not here. The slide prints
   both, but its text extract interleaves the numerators and denominators, so
   which form is labelled for weak acids and which for weak bases cannot be
   read off it. Drilling one of them would be drilling a guess.
   ========================================================================== */
const EQUATIONS = [

/* ───────── The ones she said to memorise ───────── */
{id:'thalf-first', module:1, name:'First-order half-life', must:true, sheet:'no',
 lhs:'t&frac12;', tokens:['0.693', '/', 'k'], disp:'{{frac:0.693|k}}', typed:'t1/2 = 0.693/k',
 lures:['&times;', '2.303', '2k'],
 symbols:[['k', 'first-order elimination rate constant, hr&minus;1'],
          ['t&frac12;', 'half-life, a time and never a reciprocal time']],
 holds:'First order only. Constant at every concentration, so it does not depend on the dose or on where the concentration started.',
 cite:'Introduction.pdf slide 19; she names it three times as not on the sheet'},

{id:'cl-k-vd', module:2, name:'Clearance from k and volume of distribution', must:true, sheet:'no',
 lhs:'Cl', tokens:['k', '&times;', 'V<sub>D</sub>'], typed:'Cl = k*VD',
 also:['ClT = k*VD'],
 lures:['/', '0.693', 'C<sub>p</sub>', 'AUC', 'D<sub>0</sub>'],
 symbols:[['Cl', 'clearance, L/hr'], ['k', 'hr&minus;1'], ['V<sub>D</sub>', 'apparent volume of distribution, L']],
 holds:'First-order elimination. Clearance is the volume of plasma cleared of drug per unit time, and it stays constant while the elimination rate does not.',
 cite:'2IVBolusAdministration.pdf, slide "Clearance"; she names it as not on the sheet'},

{id:'cp-db-vd', module:2, name:'Concentration, amount and volume', must:true, sheet:'yes',
 lhs:'C<sub>p</sub>', tokens:['D<sub>B</sub>', '/', 'V<sub>D</sub>'], disp:'{{frac:D<sub>B</sub>|V<sub>D</sub>}}', typed:'Cp = DB/VD',
 also:['Cp = D/VD'],
 lures:['&times;', 'k', 'AUC'],
 symbols:[['C<sub>p</sub>', 'plasma concentration, mg/L'],
          ['D<sub>B</sub>', 'amount of drug in the body at that time, mg'],
          ['V<sub>D</sub>', 'L']],
 holds:'One compartment, at any time. At time zero the amount is the dose and the concentration is C0, which is what gives VD = D0/C0.',
 cite:'2IVBolusAdministration.pdf, slide "Volume of Distribution". She names it as one to know; the sheet carries it too, and both readings stand.'},

{id:'crcl', module:4, name:'Cockcroft-Gault creatinine clearance', must:true, sheet:'no',
 lhs:'CrCl', tokens:['(140 &minus; age)', '(IBW)', '/', '(72', '&times;', 'S<sub>Cr</sub>)'],
 disp:'{{frac:(140 &minus; age)(IBW)|72 &times; S<sub>Cr</sub>}}', typed:'CrCl = (140-age)(IBW)/(72*SCr)',
 also:['CrCl = (140-age)(IBW)/(72*SCr)*0.85', 'CrCl = ((140-age)(IBW)/(72*SCr))*0.85'],
 lures:['(140 + age)', 'age)', '(S<sub>Cr</sub>)', '0.85'],
 symbols:[['age', 'years'], ['IBW', 'ideal body weight, kg'],
          ['S<sub>Cr</sub>', 'serum creatinine, mg/dL'], ['CrCl', 'reported in mL/min']],
 holds:'Multiply by 0.85 for a female patient. The answer is reported in mL/min even though the units do not cancel algebraically.',
 cite:'4---Clearance-and-Elimination.pdf slide 2; "this one is not there. You need to know this one."'},

{id:'ibw-male', module:4, name:'Ideal body weight, male', must:true, sheet:'no',
 lhs:'IBW<sub>male</sub>', tokens:['50', '+', '2.3', '&times;', '(inches over 5 ft)'],
 typed:'IBWmale = 50 + 2.3*(inches over 5 ft)',
 also:['IBW = 50 + 2.3*(height in inches - 60)', 'IBWmale = 50 + 2.3(inches over 5 ft)'],
 lures:['45.5', '&minus;', '2.54', '60', '/'],
 symbols:[['IBW', 'kg'], ['inches over 5 ft', 'height in inches minus 60']],
 holds:'Every patient in this course is 5 ft or taller, and ideal body weight is always the weight used.',
 cite:'4---Clearance-and-Elimination.pdf slide 2; "again, you need to know this one."'},

{id:'ibw-female', module:4, name:'Ideal body weight, female', must:true, sheet:'no',
 lhs:'IBW<sub>female</sub>', tokens:['45.5', '+', '2.3', '&times;', '(inches over 5 ft)'],
 typed:'IBWfemale = 45.5 + 2.3*(inches over 5 ft)',
 also:['IBW = 45.5 + 2.3*(height in inches - 60)', 'IBWfemale = 45.5 + 2.3(inches over 5 ft)'],
 lures:['50', '&minus;', '2.54', '60', '0.85'],
 symbols:[['IBW', 'kg'], ['inches over 5 ft', 'height in inches minus 60']],
 holds:'The male form with a different constant. 45.5 is the only difference.',
 cite:'4---Clearance-and-Elimination.pdf slide 2'},

/* ───────── Module 1 ───────── */
{id:'zero-line', module:1, name:'Zero-order decline', sheet:'unknown',
 lhs:'C', tokens:['C<sub>0</sub>', '&minus;', 'kt'], typed:'C = C0 - kt',
 also:['C = C0 - k0t'],
 lures:['+', 'e<sup>&minus;kt</sup>', '&times;', 'ln', '/'],
 symbols:[['k', 'zero-order rate constant, amount or concentration per time'],
          ['C<sub>0</sub>', 'starting concentration']],
 holds:'The amount lost per unit time is constant and does not depend on how much is present. A straight line on linear axes.',
 cite:'Introduction.pdf slide 17'},

{id:'first-exp', module:1, name:'First-order decline, exponential form', sheet:'yes',
 lhs:'C', tokens:['C<sub>0</sub>', 'e<sup>&minus;kt</sup>'], typed:'C = C0*e^(-kt)',
 also:['Cp = Cp0*e^(-kt)', 'C = C0e^-kt'],
 lures:['&minus;', 'e<sup>+kt</sup>', 'kt', '/', 'ln'],
 symbols:[['k', 'first-order rate constant, hr&minus;1'], ['t', 'elapsed time, hr']],
 holds:'First-order loss. The rate is proportional to what remains. A curve on linear axes and a straight line on semi-logarithmic axes.',
 cite:'Introduction.pdf slide 18; equation sheet page 1'},

{id:'first-ln', module:1, name:'First-order decline, natural-log form', sheet:'yes',
 lhs:'ln C', tokens:['ln C<sub>0</sub>', '&minus;', 'kt'], typed:'ln C = ln C0 - kt',
 also:['lnC = lnC0 - kt'],
 lures:['+', 'log C<sub>0</sub>', 'kt/2.3', 'e<sup>&minus;kt</sup>'],
 symbols:[['ln', 'natural logarithm'], ['k', 'hr&minus;1']],
 holds:'The exponential form with logarithms taken of both sides. This is the line whose slope is minus k, which is what the two-point calculation reads.',
 cite:'Introduction.pdf slide 18; equation sheet page 1'},

{id:'first-log', module:1, name:'First-order decline, base-10 log form', sheet:'yes',
 lhs:'log C', tokens:['log C<sub>0</sub>', '&minus;', 'kt', '/', '2.3'], disp:'log C<sub>0</sub> &minus; {{frac:kt|2.3}}', typed:'log C = log C0 - kt/2.3',
 also:['logC = logC0 - kt/2.3', 'log C = log C0 - (k/2.3)t'],
 lures:['ln C<sub>0</sub>', '+', '0.693', '2.303t'],
 symbols:[['2.3', 'the conversion between natural and base-10 logarithms']],
 holds:'The same line plotted on base-10 axes, which is what semi-log graph paper uses. The 2.3 is only a conversion factor.',
 cite:'Introduction.pdf slide 18; equation sheet page 1'},

{id:'amount-exp', module:1, name:'First-order decline in amount', sheet:'yes',
 lhs:'D', tokens:['D<sub>0</sub>', 'e<sup>&minus;kt</sup>'], typed:'D = D0*e^(-kt)',
 also:['DB = D0*e^(-kt)', 'D = D0e^-kt'],
 lures:['C<sub>0</sub>', 'V<sub>D</sub>', '/', 'e<sup>+kt</sup>'],
 symbols:[['D', 'amount remaining, mg'], ['D<sub>0</sub>', 'the dose, mg']],
 holds:'The same relation written in amount rather than concentration. The two are not mixed in one calculation.',
 cite:'Introduction.pdf slide 18; equation sheet page 1'},

{id:'thalf-zero', module:1, name:'Zero-order half-life', sheet:'unknown',
 lhs:'t&frac12;', tokens:['C<sub>0</sub>', '/', '2k'], disp:'{{frac:C<sub>0</sub>|2k}}', typed:'t1/2 = C0/2k',
 also:['t1/2 = C0/(2*k)'],
 lures:['0.693', '&times;', '2C<sub>0</sub>', 'k'],
 symbols:[['C<sub>0</sub>', 'starting concentration'], ['k', 'zero-order rate constant']],
 holds:'Zero order only. It depends on C0, so it is not a fixed property of the drug: start lower and the half-life is shorter.',
 cite:'Introduction.pdf slide 19'},

{id:'auc-trap', module:1, name:'Trapezoidal rule, one segment', sheet:'yes',
 lhs:'AUC',
 tokens:['[(C<sub>n&minus;1</sub> + C<sub>n</sub>)', '/', '2]', '&times;', '(t<sub>n</sub> &minus; t<sub>n&minus;1</sub>)'],
 disp:'{{frac:C<sub>n&minus;1</sub> + C<sub>n</sub>|2}} &times; (t<sub>n</sub> &minus; t<sub>n&minus;1</sub>)', typed:'AUC = [(Cn-1 + Cn)/2]*(tn - tn-1)',
 also:['AUC = ((Cn-1+Cn)/2)*(tn-tn-1)'],
 lures:['(C<sub>n</sub> &minus; C<sub>n&minus;1</sub>)', '(t<sub>n</sub> + t<sub>n&minus;1</sub>)', '2'],
 symbols:[['C<sub>n&minus;1</sub>, C<sub>n</sub>', 'the two concentrations bounding the segment'],
          ['AUC', 'concentration &times; time, e.g. mcg&middot;hr/mL']],
 holds:'Any concentration-time data set, any route. The total area is the sum of the segments. Her shorter statement of it is one half base times height.',
 cite:'Introduction.pdf slides 24-25; equation sheet page 1, first line'},

{id:'f-auc', module:1, name:'Bioavailability from two areas', sheet:'yes',
 lhs:'F', tokens:['AUC<sub>oral</sub>', '/', 'AUC<sub>IV</sub>'], disp:'{{frac:AUC<sub>oral</sub>|AUC<sub>IV</sub>}}', typed:'F = AUCoral/AUCiv',
 also:['F = AUCpo/AUCiv'],
 lures:['&times;', 'D<sub>IV</sub>', 'D<sub>po</sub>'],
 symbols:[['F', 'fraction of the oral dose reaching plasma, no units']],
 holds:'Comparing two routes at the same dose. Where the doses differ the sheet carries the dose-corrected form, F = (AUCpo/AUCiv)(Div/Dpo).',
 cite:'Introduction.pdf slide 23'},

/* ───────── Module 2 ───────── */
{id:'k-sum', module:2, name:'Elimination as metabolism plus excretion', sheet:'no',
 lhs:'k', tokens:['k<sub>m</sub>', '+', 'k<sub>e</sub>'], typed:'k = km + ke',
 lures:['&minus;', '&times;', 'f<sub>e</sub>', 'k<sub>a</sub>'],
 symbols:[['k<sub>m</sub>', 'rate constant for metabolism'], ['k<sub>e</sub>', 'rate constant for excretion']],
 holds:'Any first-order elimination. An unsubscripted k is the overall constant with every route wrapped into it.',
 cite:'2IVBolusAdministration.pdf; her words on what an unsubscripted k means'},

{id:'cl-auc', module:2, name:'Clearance from dose and area', sheet:'yes',
 lhs:'Cl', tokens:['D<sub>0</sub>', '/', 'AUC'], disp:'{{frac:D<sub>0</sub>|AUC}}', typed:'Cl = D0/AUC',
 also:['Cl = FD0/AUC', 'Cl = F*D0/AUC'],
 lures:['&times;', 'k', 'V<sub>D</sub>'],
 symbols:[['D<sub>0</sub>', 'dose, mg'], ['AUC', 'area from zero to infinity, mg&middot;hr/L']],
 holds:'Any route, provided F is known; F is 1 for an intravenous dose. This is what relates the dose directly to the exposure.',
 cite:'4---Clearance-and-Elimination.pdf; equation sheet page 1'},

{id:'thalf-cl-vd', module:2, name:'Half-life from volume and clearance', sheet:'unknown',
 lhs:'t&frac12;', tokens:['0.693', 'V<sub>D</sub>', '/', 'Cl<sub>T</sub>'], disp:'{{frac:0.693 V<sub>D</sub>|Cl<sub>T</sub>}}', typed:'t1/2 = 0.693*VD/ClT',
 also:['t1/2 = 0.693VD/Cl'],
 lures:['&times;', 'k', '2.3', 'Cl<sub>R</sub>'],
 symbols:[['V<sub>D</sub>', 'L'], ['Cl<sub>T</sub>', 'L/hr']],
 holds:'Clearance from k and VD combined with the first-order half-life. It says which way the half-life moves when clearance falls and the volume does not, which is the renal-failure question.',
 cite:'4---Clearance-and-Elimination.pdf slide 21'},

{id:'biexp', module:2, name:'Two-compartment concentration', sheet:'yes',
 lhs:'C<sub>p</sub>', tokens:['Ae<sup>&minus;at</sup>', '+', 'Be<sup>&minus;bt</sup>'], typed:'Cp = A*e^(-at) + B*e^(-bt)',
 also:['Cp = Ae^-at + Be^-bt'],
 lures:['&minus;', 'Ae<sup>&minus;bt</sup>', 'Be<sup>&minus;at</sup>', '&times;'],
 symbols:[['A, B', 'intercepts, in concentration units'],
          ['a, b', 'the two slopes, hr&minus;1, with a the larger']],
 holds:'Two compartment, IV bolus. Alpha is larger because distribution happens faster than elimination.',
 cite:'2IVBolusAdministration.pdf; equation sheet page 1'},

{id:'c0-ab', module:2, name:'Two-compartment initial concentration', sheet:'yes',
 lhs:'C<sub>p</sub><sup>0</sup>', tokens:['A', '+', 'B'], typed:'Cp0 = A + B',
 also:['C0 = A + B', 'Cp^0 = A + B'],
 lures:['&minus;', '&times;', '/'],
 symbols:[['A, B', 'the two intercepts']],
 holds:'Two compartment, at time zero. Both exponentials are 1 at t = 0, so the concentration is the sum of the intercepts.',
 cite:'2IVBolusAdministration.pdf'},

{id:'thalf-beta', module:2, name:'Beta half-life', sheet:'unknown',
 lhs:'t&frac12;<sub>&beta;</sub>', tokens:['0.693', '/', 'b'], disp:'{{frac:0.693|b}}', typed:'t1/2beta = 0.693/b',
 also:['t1/2 = 0.693/b'],
 lures:['a', '&times;', 'k', 'A'],
 symbols:[['b', 'the terminal slope, hr&minus;1']],
 holds:'Two compartment. It is the first-order half-life applied to the terminal slope, so solving for k first is more work than the question needs.',
 cite:'2IVBolusAdministration.pdf, slide "Beta Half-life"'},

{id:'k-overall', module:2, name:'Overall elimination constant from the intercepts and slopes', sheet:'yes',
 lhs:'k', tokens:['(A + B)ab', '/', '(Ab + Ba)'], disp:'{{frac:(A + B)ab|Ab + Ba}}', typed:'k = (A+B)ab/(Ab+Ba)',
 lures:['(Ab &minus; Ba)', '(A &minus; B)', '&times;', '(A + B)'],
 symbols:[['A, B', 'intercepts'], ['a, b', 'slopes']],
 holds:'Two-compartment IV bolus, model A: drug moves to and from the tissue compartment and leaves the body from the central compartment only.',
 cite:'2IVBolusAdministration.pdf, slide "Rate Constants"; equation sheet'},

{id:'k12', module:2, name:'Transfer constant, central to tissue', sheet:'yes',
 lhs:'k<sub>12</sub>', tokens:['AB(b &minus; a)<sup>2</sup>', '/', '[(A + B)(Ab + Ba)]'],
 disp:'{{frac:AB(b &minus; a)<sup>2</sup>|(A + B)(Ab + Ba)}}', typed:'k12 = AB(b-a)^2/[(A+B)(Ab+Ba)]',
 also:['k12 = AB(b-a)^2/((A+B)(Ab+Ba))'],
 lures:['(Ab + Ba)', '(A + B)', 'AB(b + a)<sup>2</sup>', '&times;'],
 symbols:[['k<sub>12</sub>', 'central to tissue, hr&minus;1']],
 holds:'Two-compartment IV bolus. Read straight off the A, B, alpha and beta she supplies.',
 cite:'2IVBolusAdministration.pdf, slide "Rate Constants"; equation sheet'},

{id:'k21', module:2, name:'Transfer constant, tissue to central', sheet:'yes',
 lhs:'k<sub>21</sub>', tokens:['(Ab + Ba)', '/', '(A + B)'], disp:'{{frac:Ab + Ba|A + B}}', typed:'k21 = (Ab+Ba)/(A+B)',
 lures:['(Ab &minus; Ba)', 'ab', '&times;'],
 symbols:[['k<sub>21</sub>', 'tissue to central, hr&minus;1']],
 holds:'Two-compartment IV bolus. It is the reciprocal arrangement of the k equation, which is the pair most often swapped.',
 cite:'2IVBolusAdministration.pdf, slide "Rate Constants"; equation sheet'},

{id:'vp-ab', module:2, name:'Central compartment volume from the intercepts', sheet:'yes',
 lhs:'V<sub>p</sub>', tokens:['D<sub>0</sub>', '/', '(A + B)'], disp:'{{frac:D<sub>0</sub>|A + B}}', typed:'Vp = D0/(A+B)',
 lures:['&times;', '(A &minus; B)', 'k', 'AUC'],
 symbols:[['V<sub>p</sub>', 'volume of the central compartment, L']],
 holds:'Two compartment, when A and B are supplied. It is the one-compartment dose-over-C0 relation with A + B standing in for C0.',
 cite:'2IVBolusAdministration.pdf, slide "Apparent Volumes of Distribution"'},

{id:'vp-auc', module:2, name:'Central compartment volume from the area', sheet:'yes',
 lhs:'V<sub>p</sub>', tokens:['D<sub>0</sub>', '/', '(k', '&times;', 'AUC)'], disp:'{{frac:D<sub>0</sub>|k &times; AUC}}', typed:'Vp = D0/(k*AUC)',
 lures:['(A + B)', 'b', 'Cl'],
 symbols:[['AUC', 'area from zero to infinity']],
 holds:'Two compartment, when a dose and an area are supplied rather than the intercepts.',
 cite:'2IVBolusAdministration.pdf, slide "Apparent Volumes of Distribution"'},

{id:'vt', module:2, name:'Tissue compartment volume', sheet:'yes',
 lhs:'V<sub>t</sub>', tokens:['V<sub>p</sub>', 'k<sub>12</sub>', '/', 'k<sub>21</sub>'], disp:'{{frac:V<sub>p</sub>k<sub>12</sub>|k<sub>21</sub>}}', typed:'Vt = Vp*k12/k21',
 lures:['&times;', 'D<sub>0</sub>', '+', 'k'],
 symbols:[['V<sub>t</sub>', 'volume of the tissue compartment, L']],
 holds:'Two compartment. The central volume scaled by the ratio of the two transfer constants.',
 cite:'2IVBolusAdministration.pdf, slide "Apparent Volumes of Distribution"'},

/* ───────── Module 3 ───────── */
{id:'css', module:3, name:'Steady-state concentration', sheet:'yes',
 lhs:'C<sub>ss</sub>', tokens:['R', '/', 'Cl'], disp:'{{frac:R|Cl}}', typed:'Css = R/Cl',
 also:['Css = R/(k*VD)', 'Css = R/kVD'],
 lures:['&times;', 'k', '(1 &minus; e<sup>&minus;kt</sup>)'],
 symbols:[['C<sub>ss</sub>', 'steady-state concentration, mg/L'], ['R', 'infusion rate, mg/hr'],
          ['Cl', 'L/hr']],
 holds:'At steady state only, where rate in equals rate out. It carries no t, so it says nothing about when steady state arrives.',
 cite:'3IntravenousInfusions.pdf; equation sheet page 1'},

{id:'cp-infusing', module:3, name:'Concentration during an infusion', sheet:'yes',
 lhs:'C<sub>p</sub>', tokens:['(R/Cl)', '(1 &minus; e<sup>&minus;kt</sup>)'], disp:'{{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>)', typed:'Cp = (R/Cl)(1 - e^(-kt))',
 also:['Cp = (R/(k*VD))(1 - e^(-kt))', 'Cp = (R/Cl)*(1-e^-kt)'],
 lures:['(1 + e<sup>&minus;kt</sup>)', 'e<sup>&minus;kt</sup>', '(Cl/R)', '&times;'],
 symbols:[['t', 'time since the infusion started, hr'],
          ['(1 &minus; e<sup>&minus;kt</sup>)', 'the fraction of steady state reached']],
 holds:'During an infusion, before steady state. The first factor is the plateau and the bracket is how much of it has been reached.',
 cite:'3IntravenousInfusions.pdf; equation sheet page 1'},

{id:'cp-after-stop', module:3, name:'Concentration after an infusion stops', sheet:'yes',
 lhs:'C<sub>p</sub>', tokens:['C<sub>peak</sub>', 'e<sup>&minus;kt</sup>'], typed:'Cp = Cpeak*e^(-kt)',
 also:['Cp = Css*e^(-kt)', 'Cp = Cpeak e^-kt'],
 lures:['(1 &minus; e<sup>&minus;kt</sup>)', 'R/Cl', '+', 'e<sup>+kt</sup>'],
 symbols:[['C<sub>peak</sub>', 'the concentration at the moment the infusion stopped'],
          ['t', 'time since cessation, hr']],
 holds:'After cessation. Ordinary first-order decay from a new starting point. Cpeak is Css only if the infusion actually ran to steady state.',
 cite:'3IntravenousInfusions.pdf, slide "Drug Concentration after an IV Infusion has Ended"'},

{id:'dl-rk', module:3, name:'Loading dose from the rate', sheet:'yes',
 lhs:'D<sub>L</sub>', tokens:['R', '/', 'k'], disp:'{{frac:R|k}}', typed:'DL = R/k',
 lures:['&times;', 'Cl', 'V<sub>D</sub>'],
 symbols:[['D<sub>L</sub>', 'loading dose, mg'], ['R', 'mg/hr'], ['k', 'hr&minus;1']],
 holds:'An IV bolus given at the moment an infusion starts. It is only as good as the rate already chosen.',
 cite:'3IntravenousInfusions.pdf; equation sheet page 1'},

{id:'dl-css-vd', module:3, name:'Loading dose from the target', sheet:'unknown',
 lhs:'D<sub>L</sub>', tokens:['C<sub>ss</sub>', '&times;', 'V<sub>D</sub>'], typed:'DL = Css*VD',
 also:['DL = Css VD'],
 lures:['/', 'k', 'Cl', 'R'],
 symbols:[['C<sub>ss</sub>', 'the target concentration, mg/L'], ['V<sub>D</sub>', 'L']],
 holds:'The amount that fills the volume of distribution to the target in one go. It depends on the volume, not on the half-life.',
 cite:'3IntravenousInfusions.pdf, slide "IV Bolus Loading Dose and Continuous IV Infusion"'},

{id:'load-plus-infusion', module:3, name:'Loading dose and infusion together', sheet:'yes',
 lhs:'C<sub>p</sub>',
 tokens:['(D<sub>L</sub>/V<sub>D</sub>)', 'e<sup>&minus;kt</sup>', '+', '(R/kV<sub>D</sub>)', '(1 &minus; e<sup>&minus;kt</sup>)'],
 disp:'{{frac:D<sub>L</sub>|V<sub>D</sub>}}e<sup>&minus;kt</sup> + {{frac:R|kV<sub>D</sub>}}(1 &minus; e<sup>&minus;kt</sup>)', typed:'Cp = (DL/VD)*e^(-kt) + (R/(k*VD))*(1 - e^(-kt))',
 also:['Cp = (DL/VD)e^-kt + (R/kVD)(1-e^-kt)'],
 lures:['&minus;', '(V<sub>D</sub>/D<sub>L</sub>)', '(1 + e<sup>&minus;kt</sup>)', 'C<sub>ss</sub>'],
 symbols:[['t', 'measured from the start of therapy']],
 holds:'Both running at once, so the two contributions add: a decaying bolus term and a climbing infusion term. With the right loading dose the sum stays flat at Css.',
 cite:'3IntravenousInfusions.pdf, slide "IV Bolus Loading Dose and Continuous IV Infusion"'},

/* ───────── Module 4 ───────── */
{id:'rate-elim', module:4, name:'Rate of elimination', sheet:'yes',
 lhs:'Rate of elimination', tokens:['Cl', '&times;', 'C<sub>p</sub>'], typed:'rate of elimination = Cl*Cp',
 also:['rate = Cl*Cp'],
 lures:['/', 'k', 'V<sub>D</sub>', 'AUC'],
 symbols:[['Rate', 'amount per time, mcg/min or mg/hr'], ['Cl', 'volume per time'],
          ['C<sub>p</sub>', 'amount per volume']],
 holds:'First-order elimination, any route. Clearance is the factor between the rate and the concentration, which is why clearance stays constant while the rate does not.',
 cite:'4---Clearance-and-Elimination.pdf; equation sheet'},

{id:'clt-sum', module:4, name:'Total clearance as its parts', sheet:'yes',
 lhs:'Cl<sub>T</sub>', tokens:['Cl<sub>R</sub>', '+', 'Cl<sub>H</sub>'], typed:'ClT = ClR + ClH',
 lures:['&minus;', '&times;', 'f<sub>e</sub>', '(1 &minus; f<sub>e</sub>)'],
 symbols:[['Cl<sub>R</sub>', 'renal clearance, L/hr'], ['Cl<sub>H</sub>', 'hepatic clearance, L/hr']],
 holds:'Clearances add. Hepatic clearance is obtained by subtraction, because the liver is not sampled directly.',
 cite:'4---Clearance-and-Elimination.pdf; equation sheet page 1, last line'},

{id:'fe', module:4, name:'Fraction excreted unchanged', sheet:'yes',
 lhs:'f<sub>e</sub>', tokens:['D<sub>u</sub>', '/', 'FD<sub>0</sub>'], disp:'{{frac:D<sub>u</sub>|FD<sub>0</sub>}}', typed:'fe = Du/(F*D0)',
 also:['fe = Du/FD0', 'fe = Du/D0'],
 lures:['&times;', 'k', 'k<sub>e</sub>', 'Cl<sub>T</sub>'],
 symbols:[['f<sub>e</sub>', 'fraction excreted unchanged, no units'],
          ['D<sub>u</sub>', 'cumulative unchanged drug recovered in urine over the whole collection, mg']],
 holds:'A complete urine collection. Lower-case fe is the fraction excreted; capital F is bioavailability. They are different quantities sharing a letter.',
 cite:'4---Clearance-and-Elimination.pdf; equation sheet'},

{id:'fe-k', module:4, name:'Excretion rate constant from the fraction', sheet:'yes',
 lhs:'k<sub>e</sub>', tokens:['f<sub>e</sub>', '&times;', 'k'], typed:'ke = fe*k',
 also:['ke = fek'],
 lures:['/', 'k<sub>m</sub>', 'Cl<sub>T</sub>', 'D<sub>u</sub>'],
 symbols:[['k<sub>e</sub>', 'excretion rate constant, hr&minus;1'], ['k', 'overall, hr&minus;1']],
 holds:'The same fraction that splits the dose splits the rate constant, since fe is also ke over k.',
 cite:'4---Clearance-and-Elimination.pdf; equation sheet'},

{id:'clr', module:4, name:'Renal clearance from the fraction', sheet:'yes',
 lhs:'Cl<sub>R</sub>', tokens:['f<sub>e</sub>', '&times;', 'Cl<sub>T</sub>'], typed:'ClR = fe*ClT',
 also:['ClR = feClT'],
 lures:['(1 &minus; f<sub>e</sub>)', '/', 'Cl<sub>H</sub>', 'k'],
 symbols:[['Cl<sub>R</sub>', 'L/hr'], ['f<sub>e</sub>', 'dimensionless']],
 holds:'Splitting a total clearance once fe is known. The renal share is the excreted fraction of the whole.',
 cite:'4---Clearance-and-Elimination.pdf; equation sheet'},

{id:'clh', module:4, name:'Hepatic clearance from the fraction', sheet:'yes',
 lhs:'Cl<sub>H</sub>', tokens:['(1 &minus; f<sub>e</sub>)', '&times;', 'Cl<sub>T</sub>'], typed:'ClH = (1-fe)*ClT',
 also:['ClH = ClT - ClR', 'ClH = (1-fe)ClT'],
 lures:['f<sub>e</sub>', '+', 'Cl<sub>R</sub>', '/'],
 symbols:[['Cl<sub>H</sub>', 'L/hr']],
 holds:'The remainder after the renal share. Equivalently total clearance minus renal clearance; the two forms are one statement.',
 cite:'4---Clearance-and-Elimination.pdf; equation sheet'},

/* ───────── Module 5 ───────── */
{id:'oral-cp', module:5, name:'Concentration after a single oral dose', sheet:'yes',
 lhs:'C<sub>p</sub>',
 tokens:['[Fk<sub>a</sub>D<sub>0</sub>', '/', 'V<sub>D</sub>(k<sub>a</sub> &minus; k)]',
         '&times;', '(e<sup>&minus;kt</sup> &minus; e<sup>&minus;k<sub>a</sub>t</sup>)'],
 disp:'{{frac:Fk<sub>a</sub>D<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}} (e<sup>&minus;kt</sup> &minus; e<sup>&minus;k<sub>a</sub>t</sup>)', typed:'Cp = [F*ka*D0/(VD(ka-k))]*(e^(-kt) - e^(-ka*t))',
 also:['Cp = (F*ka*D0/(VD*(ka-k)))*(e^(-kt)-e^(-ka*t))',
       'Cp = [F*ka*D0/VD(ka-k)]*(e^(-kt) - e^(-ka*t))'],
 lures:['(e<sup>&minus;k<sub>a</sub>t</sup> &minus; e<sup>&minus;kt</sup>)', '(k &minus; k<sub>a</sub>)',
        '+', 'V<sub>D</sub>'],
 symbols:[['F', 'oral bioavailability fraction, no units'],
          ['k<sub>a</sub>', 'absorption rate constant, hr&minus;1'],
          ['k', 'elimination rate constant, hr&minus;1'], ['D<sub>0</sub>', 'oral dose, mg']],
 holds:'Single oral dose, one compartment, first order in and first order out. The bracket is drug in minus drug out, and the lumped prefactor is not C0.',
 cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf; equation sheet page 1'},

{id:'tmax', module:5, name:'Time to peak concentration', sheet:'yes',
 lhs:'t<sub>max</sub>', tokens:['ln(k<sub>a</sub>/k)', '/', '(k<sub>a</sub> &minus; k)'], disp:'{{frac:ln(k<sub>a</sub>/k)|k<sub>a</sub> &minus; k}}', typed:'tmax = ln(ka/k)/(ka-k)',
 also:['tmax = (ln(ka/k))/(ka-k)'],
 lures:['ln(k/k<sub>a</sub>)', '(k &minus; k<sub>a</sub>)', '&times;', '0.693', 'D<sub>0</sub>'],
 symbols:[['k<sub>a</sub>, k', 'both in the same reciprocal time unit'], ['t<sub>max</sub>', 'a time']],
 holds:'Single oral dose. It carries no dose and no volume, so tmax depends only on the two rate constants and doubling the dose does not move it. It is always found before Cmax.',
 cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf; equation sheet page 1'},

{id:'thalf-abs', module:5, name:'Absorption half-life', sheet:'unknown',
 lhs:'t&frac12;<sub>a</sub>', tokens:['0.693', '/', 'k<sub>a</sub>'], disp:'{{frac:0.693|k<sub>a</sub>}}', typed:'t1/2a = 0.693/ka',
 also:['t1/2 = 0.693/ka'],
 lures:['k', '&times;', '2.3'],
 symbols:[['k<sub>a</sub>', 'absorption rate constant, hr&minus;1']],
 holds:'The first-order half-life applied to absorption. Stems usually give the absorption half-life in minutes, so converting it to ka is the first step. An unqualified half-life means elimination.',
 cite:'5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Kinetics of Absorption"'},
];
