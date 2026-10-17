/* ==========================================================================
   MODULE 8 — NONLINEAR PHARMACOKINETICS: EQUATION LINES (lecture L12, 14 Oct)
   ==========================================================================
   Pushed onto EQUATIONS (declared in equations.js). Sources: the deck
   8 - Nonlinear PK.pdf (slides 8, 10, 11, 13, 17 and 18), her worked
   rearrangement for Css in the 10.14 transcript, and her solved sheets
   Nonlinear-Solutions-1.pdf and Nonlinear-Solutions-2.pdf.

   Four lines are printed on her equation sheet (page 2, right column):
   nl-rate, nl-km, nl-thalf and nl-cl, and sheet.js links them. nl-vmax and
   nl-css are the printed dose-rate line solved for Vmax and for Css, the two
   rearrangements she worked on the board; nl-mm is the Michaelis-Menten rate
   on slide 8, which the sheet does not print.
   ========================================================================== */
EQUATIONS.push(

{id:'nl-mm', module:8, name:'Michaelis-Menten elimination rate', sheet:'absent',
 lhs:'&minus;dC<sub>p</sub>/dt', tokens:['V<sub>max</sub>C<sub>p</sub>', '/', '(K<sub>M</sub> + C<sub>p</sub>)'],
 disp:'{{frac:V<sub>max</sub>C<sub>p</sub>|K<sub>M</sub> + C<sub>p</sub>}}', typed:'-dCp/dt = Vmax*Cp/(KM + Cp)',
 also:['-dCp/dt = VmaxCp/(KM + Cp)', 'rate = Vmax*Cp/(KM + Cp)'],
 lures:['K<sub>M</sub>C<sub>p</sub>', '(V<sub>max</sub> + C<sub>p</sub>)', '&times;'],
 symbols:[['&minus;dC<sub>p</sub>/dt', 'the rate of elimination: the fall in plasma concentration per unit time'],
          ['V<sub>max</sub>', 'the maximum elimination rate, in units of concentration per time'],
          ['K<sub>M</sub>', 'the Michaelis constant, reflecting the capacity of the enzyme system, in units of concentration'],
          ['C<sub>p</sub>', 'the plasma concentration, mg/L']],
 holds:'A saturable, enzyme-mediated elimination process. When C<sub>p</sub> is much greater than K<sub>M</sub>, K<sub>M</sub> drops out and the rate equals V<sub>max</sub>: zero order. When C<sub>p</sub> is much less than K<sub>M</sub>, the rate is {{frac:V<sub>max</sub>|K<sub>M</sub>}} &times; C<sub>p</sub> = k&prime;C<sub>p</sub>: first order.',
 derive:['Not printed on the sheet: it is the rate law the sheet&rsquo;s dose-rate line comes from.',
   'At steady state the rate of elimination equals the dose rate R, and C<sub>p</sub> is C<sub>ss</sub>.',
   'That gives the printed line R = {{frac:V<sub>max</sub>C<sub>ss</sub>|K<sub>M</sub> + C<sub>ss</sub>}}.'],
 use:'For reasoning about how the rate of elimination depends on concentration: first order well below K<sub>M</sub>, zero order well above it.',
 cite:'8 - Nonlinear PK.pdf, slide 8 "Saturable-Enzymatic Elimination Processes"'},

{id:'nl-rate', module:8, name:'Dose rate at steady state, nonlinear', sheet:'yes',
 lhs:'R', tokens:['V<sub>max</sub>C<sub>ss</sub>', '/', '(K<sub>M</sub> + C<sub>ss</sub>)'],
 disp:'{{frac:V<sub>max</sub>C<sub>ss</sub>|K<sub>M</sub> + C<sub>ss</sub>}}', typed:'R = Vmax*Css/(KM + Css)',
 also:['R = VmaxCss/(KM + Css)', 'R = (Vmax*Css)/(Km + Css)'],
 lures:['K<sub>M</sub>C<sub>ss</sub>', '(V<sub>max</sub> + C<sub>ss</sub>)', '(K<sub>M</sub> &minus; C<sub>ss</sub>)', '&times;'],
 symbols:[['R', 'the dose rate: amount given per unit time, mg/day (or mg/kg/day)'],
          ['V<sub>max</sub>', 'the maximum elimination rate, an amount per time, mg/day (or mg/kg/day)'],
          ['K<sub>M</sub>', 'the Michaelis constant, a concentration, mg/L'],
          ['C<sub>ss</sub>', 'the steady-state plasma concentration, mg/L']],
 holds:'A drug with saturable (Michaelis-Menten) elimination at steady state, where the dose rate equals the rate of elimination. R and V<sub>max</sub> carry the same units: a V<sub>max</sub> in mg/kg/day gives R in mg/kg/day, which is then multiplied by the weight.',
 use:'When the stem gives K<sub>M</sub> and V<sub>max</sub> and a target steady-state concentration and asks for a daily dose rate.',
 cite:'8 - Nonlinear PK.pdf, slide 11 "In Vivo Determination of KM and Vmax" and slide 12 "Example"; equation sheet page 2'},

{id:'nl-km', module:8, name:'KM from two dose rates (direct method)', sheet:'yes',
 lhs:'K<sub>M</sub>', tokens:['(R<sub>2</sub> &minus; R<sub>1</sub>)', '/', '((R<sub>1</sub>/C<sub>1</sub>)', '&minus;', '(R<sub>2</sub>/C<sub>2</sub>))'],
 disp:'{{frac:R<sub>2</sub> &minus; R<sub>1</sub>|(R<sub>1</sub>/C<sub>1</sub>) &minus; (R<sub>2</sub>/C<sub>2</sub>)}}', typed:'KM = (R2 - R1)/((R1/C1) - (R2/C2))',
 also:['KM = (R2 - R1)/(R1/C1 - R2/C2)', 'Km = (R2-R1)/((R1/C1)-(R2/C2))'],
 lures:['(R<sub>1</sub> &minus; R<sub>2</sub>)', '(C<sub>1</sub>/R<sub>1</sub>)', '+', '(C<sub>2</sub>/R<sub>2</sub>))'],
 symbols:[['K<sub>M</sub>', 'the Michaelis constant, mg/L'],
          ['R<sub>1</sub>, R<sub>2</sub>', 'the first and second dose rates, mg/day (or mg/kg/day)'],
          ['C<sub>1</sub>, C<sub>2</sub>', 'the steady-state concentrations each dose rate produced in the same patient, mg/L']],
 holds:'Two dose rates of the same drug in the same patient, each at steady state, so V<sub>max</sub> and K<sub>M</sub> are the same in both. The rate units cancel top and bottom and leave a concentration.',
 use:'When the stem gives two daily doses and the two steady-state concentrations they produced and asks for K<sub>M</sub>; V<sub>max</sub> follows from either pair.',
 cite:'8 - Nonlinear PK.pdf, slide 13 "Determination of KM and Vmax by Direct Method"; equation sheet page 2'},

{id:'nl-vmax', module:8, name:'Vmax from a dose rate and its steady state', sheet:'absent',
 lhs:'V<sub>max</sub>', tokens:['R', '(K<sub>M</sub> + C<sub>ss</sub>)', '/', 'C<sub>ss</sub>'],
 disp:'{{frac:R(K<sub>M</sub> + C<sub>ss</sub>)|C<sub>ss</sub>}}', typed:'Vmax = R*(KM + Css)/Css',
 also:['Vmax = R(KM + Css)/Css', 'Vmax = (R*KM + R*Css)/Css'],
 lures:['(K<sub>M</sub> &minus; C<sub>ss</sub>)', 'K<sub>M</sub>', '&times;'],
 symbols:[['V<sub>max</sub>', 'the maximum elimination rate, mg/day (or mg/kg/day)'],
          ['R', 'a dose rate the patient took, mg/day'],
          ['K<sub>M</sub>', 'the Michaelis constant, mg/L'],
          ['C<sub>ss</sub>', 'the steady-state concentration that dose rate produced, mg/L']],
 holds:'Any one dose rate paired with the steady-state concentration it produced; both pairs from the direct method give the same V<sub>max</sub>. V<sub>max</sub> carries the units of R.',
 derive:['Printed: R = {{frac:V<sub>max</sub>C<sub>ss</sub>|K<sub>M</sub> + C<sub>ss</sub>}}.',
   'Multiply both sides by (K<sub>M</sub> + C<sub>ss</sub>): R(K<sub>M</sub> + C<sub>ss</sub>) = V<sub>max</sub>C<sub>ss</sub>.',
   'Divide both sides by C<sub>ss</sub>: V<sub>max</sub> = {{frac:R(K<sub>M</sub> + C<sub>ss</sub>)|C<sub>ss</sub>}}.'],
 use:'After K<sub>M</sub> has been found from two dose rates, with either rate and its concentration.',
 cite:'8 - Nonlinear PK.pdf, slide 15 (worked Example); transcript 10-14: "VMAX is equal to RKM plus RC steady state divided by C steady state"'},

{id:'nl-css', module:8, name:'Steady-state concentration from a dose rate, nonlinear', sheet:'absent',
 lhs:'C<sub>ss</sub>', tokens:['R', 'K<sub>M</sub>', '/', '(V<sub>max</sub> &minus; R)'],
 disp:'{{frac:RK<sub>M</sub>|V<sub>max</sub> &minus; R}}', typed:'Css = R*KM/(Vmax - R)',
 also:['Css = RKM/(Vmax - R)', 'Css = (R*KM)/(Vmax-R)'],
 lures:['(R &minus; V<sub>max</sub>)', '(V<sub>max</sub> + R)', 'V<sub>max</sub>'],
 symbols:[['C<sub>ss</sub>', 'the steady-state plasma concentration a dose rate will produce, mg/L'],
          ['R', 'the dose rate, mg/day'],
          ['K<sub>M</sub>', 'the Michaelis constant, mg/L'],
          ['V<sub>max</sub>', 'the maximum elimination rate, mg/day']],
 holds:'Only while R is below V<sub>max</sub>. As R approaches V<sub>max</sub> the denominator shrinks toward zero and C<sub>ss</sub> rises steeply, so a small increase in dose gives a large increase in concentration.',
 derive:['Printed: R = {{frac:V<sub>max</sub>C<sub>ss</sub>|K<sub>M</sub> + C<sub>ss</sub>}}.',
   'Multiply out: RK<sub>M</sub> + RC<sub>ss</sub> = V<sub>max</sub>C<sub>ss</sub>.',
   'Subtract RC<sub>ss</sub>: RK<sub>M</sub> = V<sub>max</sub>C<sub>ss</sub> &minus; RC<sub>ss</sub> = C<sub>ss</sub>(V<sub>max</sub> &minus; R).',
   'Divide by (V<sub>max</sub> &minus; R): C<sub>ss</sub> = {{frac:RK<sub>M</sub>|V<sub>max</sub> &minus; R}}.'],
 use:'When the stem gives a new daily dose and asks what steady-state concentration it should achieve.',
 cite:'transcript 10-14, the rearrangement she worked on the board for In-Class Practice question 4e; Nonlinear-Solutions-1.pdf, part d'},

{id:'nl-thalf', module:8, name:'Half-life of a nonlinear drug at a concentration', sheet:'yes',
 lhs:'t&frac12;', tokens:['V<sub>D</sub>', '(0.693', '/', 'V<sub>max</sub>)', '(K<sub>M</sub> + C<sub>p</sub>)'],
 disp:'V<sub>D</sub>({{frac:0.693|V<sub>max</sub>}})(K<sub>M</sub> + C<sub>p</sub>)', typed:'t1/2 = VD*(0.693/Vmax)*(KM + Cp)',
 also:['t1/2 = 0.693*VD*(KM + Cp)/Vmax', 't1/2 = VD(0.693/Vmax)(KM + Cp)'],
 lures:['(V<sub>max</sub>', '0.693)', '(K<sub>M</sub> &minus; C<sub>p</sub>)', 'k'],
 symbols:[['t&frac12;', 'the elimination half-life at that plasma concentration, days when V<sub>max</sub> is per day'],
          ['V<sub>D</sub>', 'the apparent volume of distribution, L'],
          ['V<sub>max</sub>', 'the maximum elimination rate, mg/day'],
          ['K<sub>M</sub>', 'the Michaelis constant, mg/L'],
          ['C<sub>p</sub>', 'the plasma concentration at which the half-life is wanted, mg/L']],
 holds:'Saturable elimination. The half-life is not constant: it grows as C<sub>p</sub> rises, so a half-life is stated at a named concentration. V<sub>D</sub> often arrives in L/kg and is multiplied by the weight first.',
 use:'When the stem asks for the half-life "when the plasma concentration is" a stated value.',
 cite:'8 - Nonlinear PK.pdf, slide 17 "Dependence of Elimination Half-Life on Dose"; equation sheet page 2'},

{id:'nl-cl', module:8, name:'Total body clearance of a nonlinear drug at a concentration', sheet:'yes',
 lhs:'Cl<sub>T</sub>', tokens:['V<sub>max</sub>', '/', '(K<sub>M</sub> + C<sub>p</sub>)'],
 disp:'{{frac:V<sub>max</sub>|K<sub>M</sub> + C<sub>p</sub>}}', typed:'ClT = Vmax/(KM + Cp)',
 also:['Cl = Vmax/(KM + Cp)', 'ClT = Vmax/(Km+Cp)'],
 lures:['(K<sub>M</sub> &minus; C<sub>p</sub>)', 'C<sub>p</sub>', '&times;', 'V<sub>D</sub>'],
 symbols:[['Cl<sub>T</sub>', 'total body clearance at that concentration, L/day when V<sub>max</sub> is in mg/day'],
          ['V<sub>max</sub>', 'the maximum elimination rate, mg/day'],
          ['K<sub>M</sub>', 'the Michaelis constant, mg/L'],
          ['C<sub>p</sub>', 'the plasma concentration, mg/L']],
 holds:'Saturable elimination. C<sub>p</sub> is in the denominator, so clearance falls as concentration rises; mg/day divided by mg/L leaves L/day.',
 use:'When the stem asks for the total body clearance "when the plasma concentration is" a stated value.',
 cite:'8 - Nonlinear PK.pdf, slide 18 "Dependence of Clearance on Dose"; equation sheet page 2'}
);
