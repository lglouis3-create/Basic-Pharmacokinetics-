/* Module 7b equation lines, added to EQUATIONS.
   ==========================================================================
   Deck: 7b---Pharmacokinetics-and-Pharmacodynamics.pdf. Slide 5 prints
   E = E0 − kmt/2.3; slide 6 prints teff in base-10 and natural logs; slide 9
   prints teff = 1.44 t½ ln(D0/VDCeff). All four are also printed on her exam
   equation sheet, page 2, left column (sheet.js, the four c:3 lines after
   f-rel), which link to these four ids.
   The dose line, D0 = Ceff VD e^(k teff), is written on slide 8 and on the
   in-class activity (slide 13) and is not on the sheet: it is C = C0e^(−kt)
   solved for the dose.
   ========================================================================== */
EQUATIONS.push(

{id:'pd-effect-time', module:9, name:'Pharmacologic effect against time after an IV bolus', sheet:'yes',
 lhs:'E', tokens:['E<sub>0</sub>', '&minus;', 'kmt', '/', '2.3'], disp:'E<sub>0</sub> &minus; {{frac:kmt|2.3}}', typed:'E = E0 - kmt/2.3',
 also:['E = E0 - k*m*t/2.3', 'E = E0 - (km/2.3)t', 'E = E0 - (k*m/2.3)*t'],
 lures:['+', '0.693', 'ln C<sub>0</sub>', 'e<sup>&minus;kt</sup>'],
 symbols:[['E', 'pharmacologic effect at time t'], ['E<sub>0</sub>', 'the effect at time zero, when the concentration is C<sub>0</sub>'],
          ['k', 'first-order elimination rate constant, hr⁻¹'],
          ['m', 'slope of the straight line of pharmacologic effect against log drug concentration'], ['t', 'time after the dose, hr'],
          ['2.3', 'the conversion between natural and base-10 logarithms']],
 holds:'A single IV bolus, one-compartment model, in the range where effect is a straight line against log concentration (E = m log C + e, the straight middle portion of the log curve). The effect then falls in a straight line with time, at slope {{frac:km|2.3}}: faster for a larger k or a larger m.',
 derive:['Straight middle portion of the log dose&ndash;response curve: E = m log C + e, with m the slope and e the intercept.',
   'First-order decline after an IV bolus, base-10 form: log C = log C<sub>0</sub> &minus; {{frac:kt|2.3}}.',
   'Put that log C into the effect line: E = m log C<sub>0</sub> + e &minus; {{frac:kmt|2.3}}.',
   'm log C<sub>0</sub> + e is the effect at time zero, E<sub>0</sub>, so E = E<sub>0</sub> &minus; {{frac:kmt|2.3}}.'],
 use:'When a question asks how the effect, not the concentration, changes with time after a dose, or what changes the speed of that decline.',
 cite:'7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slide 5 "Typical Log Dose-versus-Pharmacologic Response Curves"; equation sheet page 2'},

{id:'pd-teff-log', module:9, name:'Duration of activity, base-10 log form', sheet:'yes',
 lhs:'t<sub>eff</sub>',
 tokens:['2.3', '[log(D<sub>0</sub>/V<sub>D</sub>)', '&minus;', 'log C<sub>eff</sub>]', '/', 'k'],
 disp:'{{frac:2.3[log(D<sub>0</sub>/V<sub>D</sub>) &minus; log C<sub>eff</sub>]|k}}',
 typed:'teff = 2.3(log(D0/VD) - log Ceff)/k',
 also:['teff = 2.3*(log(D0/VD) - log(Ceff))/k', 'teff = (2.3/k)(log(D0/VD) - log Ceff)'],
 lures:['ln C<sub>eff</sub>]', '0.693', '+', '(V<sub>D</sub>/D<sub>0</sub>)'],
 symbols:[['t<sub>eff</sub>', 'duration of activity: the time the plasma level stays at or above C<sub>eff</sub> after a single IV bolus, hr'],
          ['D<sub>0</sub>', 'the IV bolus dose, mg'], ['V<sub>D</sub>', 'apparent volume of distribution, L'],
          ['C<sub>eff</sub>', 'minimum effective concentration (MEC): the lowest plasma level that gives the effect'],
          ['k', 'first-order elimination rate constant, hr⁻¹'], ['2.3', 'the conversion from base-10 to natural logarithms']],
 holds:'A single IV bolus of a drug in a one-compartment open model with first-order elimination. {{frac:D<sub>0</sub>|V<sub>D</sub>}} is C<sub>0</sub>, the concentration just after the bolus. The same relation as the natural-log form, written with base-10 logarithms.',
 derive:['Printed first-order line in base-10 logs: log C = log C<sub>0</sub> &minus; {{frac:kt|2.3}}.',
   'The effect ends when C falls to C<sub>eff</sub>, at t = t<sub>eff</sub>: log C<sub>eff</sub> = log C<sub>0</sub> &minus; {{frac:kt<sub>eff</sub>|2.3}}.',
   'For an IV bolus C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}, so t<sub>eff</sub> = {{frac:2.3[log(D<sub>0</sub>/V<sub>D</sub>) &minus; log C<sub>eff</sub>]|k}}.'],
 use:'A duration-of-action question worked in base-10 logs. It gives the same number as the natural-log form.',
 cite:'7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slide 6 "Relationship Between Dose and Duration of Activity (teff)"; equation sheet page 2'},

{id:'pd-teff-ln', module:9, name:'Duration of activity, natural-log form', sheet:'yes',
 lhs:'t<sub>eff</sub>',
 tokens:['[ln(D<sub>0</sub>/V<sub>D</sub>)', '&minus;', 'ln C<sub>eff</sub>]', '/', 'k'],
 disp:'{{frac:[ln(D<sub>0</sub>/V<sub>D</sub>) &minus; ln C<sub>eff</sub>]|k}}',
 typed:'teff = (ln(D0/VD) - ln Ceff)/k',
 also:['teff = (ln(D0/VD) - ln(Ceff))/k', 'teff = ln(D0/(VD*Ceff))/k', 'teff = ln(C0/Ceff)/k'],
 lures:['log C<sub>eff</sub>]', '0.693', '+', '&times;'],
 symbols:[['t<sub>eff</sub>', 'duration of activity: the time the plasma level stays at or above C<sub>eff</sub> after a single IV bolus, hr'],
          ['D<sub>0</sub>', 'the IV bolus dose, mg'], ['V<sub>D</sub>', 'apparent volume of distribution, L'],
          ['C<sub>eff</sub>', 'minimum effective concentration (MEC): the lowest plasma level that gives the effect'],
          ['k', 'first-order elimination rate constant, hr⁻¹']],
 holds:'A single IV bolus of a drug in a one-compartment open model with first-order elimination. {{frac:D<sub>0</sub>|V<sub>D</sub>}} is C<sub>0</sub>, the concentration just after the bolus. The dose sits inside the logarithm, so doubling it adds {{frac:ln 2|k}}, one half-life, to t<sub>eff</sub>; it does not double t<sub>eff</sub>.',
 derive:['Printed first-order line: C = C<sub>0</sub>e<sup>&minus;kt</sup>.',
   'At the end of the effect C = C<sub>eff</sub> and t = t<sub>eff</sub>: e<sup>kt<sub>eff</sub></sup> = {{frac:C<sub>0</sub>|C<sub>eff</sub>}}.',
   'Take natural logs: kt<sub>eff</sub> = ln C<sub>0</sub> &minus; ln C<sub>eff</sub>.',
   'For an IV bolus C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}, so t<sub>eff</sub> = {{frac:[ln(D<sub>0</sub>/V<sub>D</sub>) &minus; ln C<sub>eff</sub>]|k}}.'],
 use:'A duration-of-action question that gives the rate constant k, or one where C<sub>0</sub> is read off an equation such as C<sub>p</sub> = 50e<sup>&minus;0.2t</sup>.',
 cite:'7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slides 6 and 8; equation sheet page 2'},

{id:'pd-teff-half', module:9, name:'Duration of activity from the half-life', sheet:'yes',
 lhs:'t<sub>eff</sub>',
 tokens:['1.44', 't<sub>1/2</sub>', 'ln(D<sub>0</sub>/(V<sub>D</sub>C<sub>eff</sub>))'],
 disp:'1.44t<sub>1/2</sub> ln({{frac:D<sub>0</sub>|V<sub>D</sub>C<sub>eff</sub>}})',
 typed:'teff = 1.44*t1/2*ln(D0/(VD*Ceff))',
 also:['teff = 1.44 t1/2 ln(D0/(VD Ceff))', 'teff = t1/2*ln(D0/(VD*Ceff))/0.693', 'teff = 1.44*thalf*ln(D0/(VD*Ceff))'],
 lures:['0.693', 'k', 'log(D<sub>0</sub>/(V<sub>D</sub>C<sub>eff</sub>))', 'ln(V<sub>D</sub>C<sub>eff</sub>/D<sub>0</sub>)'],
 symbols:[['t<sub>eff</sub>', 'duration of activity: the time the plasma level stays at or above C<sub>eff</sub> after a single IV bolus, hr'],
          ['1.44', '{{frac:1|0.693}}, from k = {{frac:0.693|t<sub>1/2</sub>}}'],
          ['t<sub>1/2</sub>', 'elimination half-life, hr'], ['D<sub>0</sub>', 'the IV bolus dose, mg'],
          ['V<sub>D</sub>', 'apparent volume of distribution, L'],
          ['C<sub>eff</sub>', 'minimum effective concentration (MEC): the lowest plasma level that gives the effect']],
 holds:'A single IV bolus, one-compartment open model, first-order elimination. t<sub>1/2</sub> multiplies the whole expression, so t<sub>eff</sub> rises in direct proportion to the half-life: a disease that prolongs t<sub>1/2</sub> prolongs the effect in proportion and increases the possibility of toxicity. The dose is inside the logarithm, so each doubling adds one t<sub>1/2</sub>.',
 derive:['Start from t<sub>eff</sub> = {{frac:ln(D<sub>0</sub>/V<sub>D</sub>) &minus; ln C<sub>eff</sub>|k}} = {{frac:1|k}} ln({{frac:D<sub>0</sub>|V<sub>D</sub>C<sub>eff</sub>}}).',
   'k = {{frac:0.693|t<sub>1/2</sub>}}, so {{frac:1|k}} = {{frac:t<sub>1/2</sub>|0.693}} = 1.44 t<sub>1/2</sub>.',
   'So t<sub>eff</sub> = 1.44 t<sub>1/2</sub> ln({{frac:D<sub>0</sub>|V<sub>D</sub>C<sub>eff</sub>}}).'],
 use:'A duration-of-action question that gives the half-life rather than k, or asks what a change in half-life does to the duration.',
 cite:'7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slide 9 "Effect of Dose and Elimination Half-life on Duration of Activity"; equation sheet page 2'},

{id:'pd-dose-teff', module:9, name:'Dose for a target duration of activity', sheet:'absent',
 lhs:'D<sub>0</sub>',
 tokens:['C<sub>eff</sub>', 'V<sub>D</sub>', 'e<sup>kt<sub>eff</sub></sup>'],
 typed:'D0 = Ceff*VD*e^(k*teff)',
 also:['D0 = Ceff VD e^(k teff)', 'D0 = VD*Ceff*e^(kteff)'],
 lures:['e<sup>&minus;kt<sub>eff</sub></sup>', '/', 'C<sub>0</sub>', 'ln'],
 symbols:[['D<sub>0</sub>', 'the IV bolus dose that gives the target duration, mg'],
          ['C<sub>eff</sub>', 'minimum effective concentration (MEC), mg/L'], ['V<sub>D</sub>', 'apparent volume of distribution, L'],
          ['k', 'first-order elimination rate constant, hr⁻¹'], ['t<sub>eff</sub>', 'the target duration of activity, hr']],
 holds:'A single IV bolus, one-compartment open model, first-order elimination. The target duration is in an exponent, so each added half-life of duration doubles the dose: doubling a long duration needs a very large dose.',
 derive:['Printed first-order line with C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}: C = {{frac:D<sub>0</sub>|V<sub>D</sub>}}e<sup>&minus;kt</sup>.',
   'The level must still be C<sub>eff</sub> at the target time: C<sub>eff</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}e<sup>&minus;kt<sub>eff</sub></sup>.',
   'Multiply both sides by V<sub>D</sub>e<sup>kt<sub>eff</sub></sup>: D<sub>0</sub> = C<sub>eff</sub>V<sub>D</sub>e<sup>kt<sub>eff</sub></sup>.'],
 use:'When a stem asks what dose gives, or doubles, a stated duration of action.',
 cite:'7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slide 8 and the In-Class Activity on slide 13'}

);
