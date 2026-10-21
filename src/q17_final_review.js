/* ==========================================================================
   HER FINAL EXAM REVIEW — 19 Oct 2026, all modules
   ==========================================================================
   "Top 10 Basic PK Things to Know": ten statements of what she expects on the
   final, each followed by a PollEv question or a slide she worked, and her
   spoken follow-ups. Poll stems and options are hers word for word. The deck
   (Final-Exam-Review-10.19.pdf) is images only; every poll key is the one she
   gave, and every numeric key is recomputed from the stem. STYLE.md holds the
   review verbatim, with the class response and a recompute line for each.

   Each item carries the module of the topic it tests, so the final's pools
   draw it from the right share: Module 7b and Module 8 items are exam 3, the
   rest keep the exam of their module. Two polls repeat items already in the
   bank word for word (m7-c15, nl-c01) and carry dupOf so a paper never draws
   both. Her follow-up questions are written to stand alone, each carrying the
   earlier value it needs in "(Part a: ...)" form.

   Where her key and the arithmetic part, the key follows her and the note says
   so: the oral dose of fr-8b (570 mg from F = 70%; 575 mg from F unrounded)
   and the cefoxitin half-life of fr-3 (about 1 hour by halving; 0.93 hr from
   the points). Both tolerances accept both.
   ========================================================================== */
const FR_DECK = 'Final-Exam-Review-10.19.pdf';
const FR_INF = 'A drug with a t½ of 3 hours and a VD of 18 L is infused at a rate of 50 mg/hr for 2 hours.';

const FR_T_ORDER = {h:'Zero order and first order', table:{head:['', 'Zero order', 'First order'],
  rows:[['Rate of the process', 'Constant: dC/dt = −k', 'Proportional to what is left: dC/dt = −kC'],
        ['Concentration against time', 'C = C0 − kt, a straight line on a linear axis', 'C = C0e^(−kt), a straight line only on a log axis'],
        ['Half-life', 't½ = {{frac:C0|2k}}, changes with C0', 't½ = {{frac:0.693|k}}, constant'],
        ['Units of k', 'Concentration or amount per time', 'Reciprocal time, such as hr⁻¹']]}};

const FR_T_INF = {h:'An infusion, start to finish', list:[
  'During the infusion: Cp = {{frac:R|Cl}}(1 − e^(−kt)), where {{frac:R|Cl}} is the steady-state concentration it climbs toward.',
  'After it stops there is only first-order elimination: Cp = Cend e^(−kt), with t counted from the end of the infusion.',
  'Two infusions add: the level at any time is the sum of what is left of each.',
  'Changing the rate changes the steady-state concentration in proportion; the time to reach it stays 3 to 5 half-lives.']};

const Q_FINALREVIEW = [

/* ------------------- 10. Zero-order and first-order processes ------------------- */
{id:'fr-1', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'first', concept:'first-order-properties', skill:'tell', source:'both',
 stem:'Which of the following is characteristic of first-order processes?',
 options:[
  {t:'a constant half-life', correct:true,
   why:'For a first-order process t½ = {{frac:0.693|k}}, and k is a constant, so the half-life does not depend on how much drug is present. The time to go from 100 to 50 is the same as from 10 to 5.'},
  {t:'a constant rate of elimination',
   why:'Picking this attaches the zero-order property to first order. In a first-order process the rate is proportional to the amount remaining, dC/dt = −kC, so the rate keeps changing as the concentration falls. A constant rate is zero order.'},
  {t:'dC/dt = -k',
   why:'Picking this takes the zero-order rate law for the first-order one. dC/dt = −k says the rate does not depend on concentration. The first-order law carries the concentration: dC/dt = −kC.'},
  {t:'units of k of (concentration or amount)/time',
   why:'Picking this gives k the zero-order units. A zero-order k is an amount or concentration lost per unit time; a first-order k is a fraction per unit time, so its units are reciprocal time, such as hr⁻¹.'}],
 teach:[FR_T_ORDER,
  {h:'Reading k', list:[
   'Any k is a rate constant. Written as kC, the process depends on the concentration present; k alone means it does not.',
   'A subscript names the process k describes: metabolism, excretion, absorption.',
   'On a graph, read the axis first: a straight line on an axis marked 1, 10, 100, 1000 is a log scale, so the process is first order.']}],
 quote:'So the correct answer here. Was a constant half-life 0.693 over K gives us our half-life, right? Rate of elimination is constantly changing. DCDT is equal to minus KC. And appropriate units of k are reciprocal time.',
 audit:'PollEv on page 3; no count on the capture. Class response as she read it: most chose a constant half-life and a constant rate of elimination; some chose dC/dt = -k. Keyed a constant half-life (transcript 10-19).',
 cite:FR_DECK + ' slide 3 (PollEv), with slides 4 "Zero-Order Reactions" and 5 "First-Order Reactions"'},

/* ----------------------- 9. k, t½, VD and Cp ----------------------- */
{id:'fr-2', prof:'Mosley', tier:'new', exam:1, module:2, lecture:'L02',
 topic:'bolus1', sub:'vd', concept:'vd-from-dose-c0', skill:'vddose', source:'both',
 stem:'400 mg of a drug was administered by IV bolus injection. The equation describing the drug in the body is given as Cp =(40 mg/L)e^(-0.9t). What is the apparent volume of distribution of this drug?',
 options:[
  {t:'10 L', correct:true,
   why:'For an IV bolus Cp = C0e^(−kt), so the number in front of the exponential is C0, 40 mg/L. VD = {{frac:D0|C0}} = {{frac:400 mg|40 mg/L}} = 10 L.'},
  {t:'20 L',
   why:'Picking this divides the dose by half the coefficient, as though C0 were 20 mg/L. The equation states C0 directly: the whole 40 mg/L in front of the exponential, which gives 10 L.'},
  {t:'40 L',
   why:'Picking this reads the 40 in the equation as a volume. Its units are mg/L, a concentration; the volume is the dose divided by it, 400 mg over 40 mg/L.'},
  {t:'50 L',
   why:'Picking this would need C0 of 8 mg/L, because 400 mg over 50 L is 8 mg/L, and no number in the equation is 8. The 0.9 is k, in hr⁻¹, and takes no part in the volume.'}],
 steps:[
  {k:'setup', t:'Cp = C0e^(−kt), so C0 = 40 mg/L and k = 0.9 hr⁻¹',
   why:'The one-compartment IV bolus equation. At t = 0 the exponential is 1, so the coefficient is the concentration just after the dose.'},
  {k:'algebra', t:'VD = {{frac:D0|C0}} = {{frac:400 mg|40 mg/L}} = 10 L',
   why:'The apparent volume relates the amount in the body to the plasma concentration, and just after a bolus the amount in the body is the whole 400 mg dose. mg divided by mg/L leaves L.'}],
 teach:[
  {h:'What each parameter tells you', list:[
   'k: a rate constant, the fraction of drug removed per unit time for a first-order process.',
   't½: a time, the time for half of what is present to be eliminated; during an IV infusion, the time to reach half of the steady-state concentration.',
   'VD: the apparent volume of distribution, {{frac:amount in the body|Cp}}.',
   'VD is apparent: it is the volume the drug would need at the plasma concentration everywhere, not a real body space.',
   'Cp: the concentration of drug in the plasma. Cb is blood and Cs is serum; most of the time the concentration is plasma.']}],
 quote:'And most of you guys thought 10 L. That is the correct answer. So we\'re taking this 400 mg and dividing it by the 40 mg per liter, OK?',
 audit:'PollEv on page 7, locked, no count on the capture. Printed e^-0.9t; written e^(-0.9t) so the exponent sets without the full stop. Class response and key from transcript 10-19: most chose 10 L, keyed 10 L. Recompute 400/40 = 10.',
 cite:FR_DECK + ' slide 7 (PollEv)'},

{id:'fr-3', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'half', concept:'first-order-halflife', skill:'krate', source:'both',
 stem:'Cefoxitin plasma concentrations were 200, 93, 44, 21, 10, 4.9, 2.3 and 1.1 micrograms/mL at 0, 1, 2, 3, 4, 5, 6 and 7 hours, as shown. Estimate the half-life of cefoxitin.',
 img:'slide_Introduction_p23',
 units:'hr', answer:1, tol:0.1,
 steps:[
  {k:'setup', t:'t½ is the time for the concentration to fall to half: from 93 at 1 hr to 44 at 2 hr, about half',
   why:'Half-life is read straight off the curve as the time between a level and half of it. Half of 100 is roughly 50, and the points near those levels are 93 and 44, one hour apart.'},
  {k:'algebra', t:'{{frac:93|44}} = 2.11 and {{frac:44|21}} = 2.10, so each hour the level falls to about half',
   why:'Every one-hour step divides the concentration by about 2, whatever the starting level. A constant fractional fall is first order, so the half-life is the same all along the curve.'},
  {k:'algebra', t:'k = ln({{frac:93|44}}) = 0.748 hr⁻¹ over the 1-hour step; t½ = {{frac:0.693|0.748}} = 0.93 hr',
   why:'The same reading from two points: ln of the ratio over the 1 hour between them is k, and t½ = {{frac:0.693|k}}. The curve on a linear axis is curved; on a log axis these points fall on a straight line.'},
  {k:'round', t:'t½ ≈ 1 hr',
   why:'Halving by eye gives about 1 hour, her estimate; the points give 0.93 hr. Both read the same half-life to one significant figure.'}],
 setup:{eq:'thalf-first', pre:['first-ln'], why:'"Estimate the half-life" from a set of points: find two levels one half apart and read the time between them, or k from two points, then t½ = 0.693 over k.'},
 asks:'thalf',
 givens:[['C at 1 hr', '93', 'the level near 100 on the curve'], ['C at 2 hr', '44', 'about half of 93, one hour later'], ['C0', '200', 'the first point; 93 one hour later is about half of it']],
 check:{t:'Each one-hour step roughly halves the level, 200 to 93 to 44 to 21, so the half-life is close to 1 hr; the points give 0.93 hr.', lo:0.5, hi:2},
 note:'Halving by eye gives about 1 hour; k from the points gives 0.93 hr. Either is accepted.',
 teach:[
  {h:'Estimating a half-life from a graph', list:[
   'Pick a level, find the time it halves, and read the time between them: 93 at 1 hr to 44 at 2 hr is one half-life of about 1 hour.',
   'On a linear axis a first-order curve is curved. Plotted on a log axis the same points fall on a straight line.',
   'k = {{frac:0.693|t½}}: a half-life of about 1 hour is a k of about 0.7 hr⁻¹.']}],
 quote:'Half-Life is the time that it takes to go to half, so half of 100 is roughly 50, so 93 down to 44. For this example, one hour.',
 audit:'Her worked reading on page 8 (the cefoxitin plot from Introduction.pdf), spoken in transcript 10-19: "93 down to 44 ... one hour". Recompute: ln(93/44) = 0.7484, t½ = 0.926 hr; all seven steps give 0.905 to 0.972 hr; ln(200/1.1)/7 gives 0.932 hr. Keyed her 1 hour, tol 0.1 covers 0.93.',
 cite:FR_DECK + ' slide 8 "Cefoxitin Plasma Conc."; Introduction.pdf slide 20'},

/* --------------- 8. Total, renal and hepatic clearance --------------- */
{id:'fr-4', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'renalmech', concept:'reabsorption-inference', skill:'apply', source:'both',
 stem:'The renal clearance of an antibiotic was estimated to be 45 mL/min. What can be inferred from this information?',
 options:[
  {t:'The drug is filtered and actively secreted.',
   why:'Picking this reads the comparison the wrong way round. Active secretion adds drug to the urine and lifts renal clearance above the glomerular filtration rate of about 120 mL/min; 45 mL/min is below it.'},
  {t:'The drug is filtered and reabsorbed.', correct:true,
   why:'45 mL/min is below the glomerular filtration rate of about 120 mL/min. The drug is filtered, and some of it returns from the tubule to the blood, so less plasma is cleared than is filtered.'},
  {t:'There is some evidence of renal impairment.',
   why:'Picking this reads the renal clearance of a drug as the patient\'s kidney function. Kidney function is estimated with creatinine clearance; a drug\'s renal clearance describes how the kidney handles that drug, and a value below 120 mL/min points to reabsorption.'}],
 steps:[
  {k:'setup', t:'ClR = 45 mL/min; GFR ≈ 120 mL/min',
   why:'Renal clearance is compared with the glomerular filtration rate, the plasma that filtration alone clears each minute.'},
  {k:'algebra', t:'{{frac:45 mL/min|120 mL/min}} = 0.375, so ClR is less than GFR: filtration with tubular reabsorption',
   why:'Below the filtration rate means drug that was filtered is not all leaving in the urine: some is reabsorbed back into the blood.'}],
 teach:[
  {h:'Reading the mechanism from renal clearance', list:[
   'ClR about equal to 120 mL/min: filtration only. Greater: filtration with active secretion. Less: filtration with tubular reabsorption.',
   'Creatinine clearance, from Cockcroft-Gault with the ideal body weight, estimates the patient\'s renal function.',
   'Hepatic clearance is approximated as total clearance minus renal clearance.']}],
 quote:'So the drug is filtered and reabsorbed, OK? The inference is that we\'ve got reabsorption going on.',
 audit:'PollEv on page 10, 63 responses on the capture, no distribution shown. Keyed B (transcript 10-19). 45 < 120.',
 cite:FR_DECK + ' slide 10 (PollEv); 4---Clearance-and-Elimination.pdf, slide "Tubular Reabsorption"'},

{id:'fr-5', prof:'Mosley', tier:'new', exam:2, module:4, lecture:'L05',
 topic:'clearance', sub:'clcalc', concept:'hepatic-by-difference', skill:'recall', source:'both',
 stem:'Hepatic clearance is most readily approximated with creatinine clearance.',
 options:[
  {t:'True',
   why:'Picking this mixes up the two clearances. Creatinine clearance estimates the patient\'s renal function, the glomerular filtration rate; it says nothing about the liver.'},
  {t:'False', correct:true,
   why:'Hepatic clearance is approximated by difference: ClH = ClT − ClR, total clearance minus renal clearance. Creatinine clearance, from Cockcroft-Gault, estimates the patient\'s renal function instead.'}],
 teach:[
  {h:'Which clearance comes from where', list:[
   'Total clearance: ClT = k × VD, or {{frac:D0|AUC}} for an IV dose.',
   'Renal clearance: ClR = fe × ClT, from the drug recovered unchanged in the urine.',
   'Hepatic clearance: ClH = ClT − ClR. No simpler measure of it is available.',
   'Creatinine clearance: Cockcroft-Gault with the ideal body weight; it estimates the individual\'s renal function.']}],
 quote:'how do we approximate hepatic clearance? Total minus renal. Why do we do it that way? Yeah, it\'s it, there\'s not an easier way to do it, right?',
 audit:'PollEv on page 11, 1 response on the capture. Keyed False (transcript 10-19): "That should be false." She then says creatinine clearance "calculates an individual\'s renal function".',
 cite:FR_DECK + ' slide 11 (PollEv); 4---Clearance-and-Elimination.pdf slide 11'},

/* ---------- 7. Steady-state concentrations, peaks and troughs ---------- */
{id:'fr-6a', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L07',
 topic:'multi', sub:'ssbolus', concept:'cmax-ss', skill:'multidose', source:'both',
 stem:'What is the expected maximum steady state plasma concentration following multiple IV bolus dosing every 12 hours of 300 mg of a drug with a t½ of 4 hours and VD of 16 L?',
 options:[
  {t:'18.7 mg/L',
   why:'Picking this stops at the first dose. {{frac:300 mg|16 L}} = 18.75 mg/L is the peak after one dose; at steady state each dose lands on what is left of the earlier ones, so the peak is higher by the accumulation factor.'},
  {t:'21.4 mg/L', correct:true,
   why:'C0 = 18.75 mg/L, k = 0.17325 hr⁻¹, and e^(−kτ) = 0.1251 for τ = 12 hr. Cmax∞ = {{frac:18.75|1 − 0.1251}} = 21.43 mg/L.'},
  {t:'32.6 mg/L',
   why:'Picking this overstates accumulation. 32.6 mg/L is 1.74 times the first-dose peak, which would need about 42% of each dose left at the next dose, as with dosing about every 5 hours. Every 12 hours is 3 half-lives, so only 12.5% is left and the factor is 1.14.'},
  {t:'None of the above',
   why:'Picking this usually follows a slip in the exponent, such as using t½ in place of k. With k = {{frac:0.693|4 hr}}, the steady-state peak works out to 21.4 mg/L, which is listed.'}],
 steps:[
  {k:'unit', t:'k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹; C0 = {{frac:300 mg|16 L}} = 18.75 mg/L',
   why:'The rate constant from the half-life, and the first-dose peak from dose over volume: for an IV bolus the whole dose is in the body at once.'},
  {k:'algebra', t:'kτ = 0.17325 × 12 = 2.079; e^(−2.079) = 0.1251 (12.5% of a dose left after 3 half-lives)',
   why:'τ is the dosing interval, 12 hr. kτ has no units, and e^(−kτ) is the fraction of each dose still in the body when the next is given.'},
  {k:'algebra', t:'Cmax∞ = {{frac:C0|1 − e^(−kτ)}} = {{frac:18.75|1 − 0.1251}} = {{frac:18.75|0.8749}} = 21.43 mg/L',
   why:'The principle of superposition: the first-dose peak is carried to steady state by the accumulation factor, {{frac:1|0.8749}} = 1.14, because each dose adds to what remains.'},
  {k:'round', t:'Cmax∞ = 21.4 mg/L',
   why:'21.43 mg/L to one decimal place, her value. It is the steady-state peak, reached just after each dose is given, and it is 1.14 times the first-dose peak of 18.75 mg/L.'}],
 teach:[
  {h:'Peaks, troughs and steady state with repeated IV bolus doses', list:[
   'Cmax of the first dose: C0 = {{frac:D0|VD}}.',
   'Cmax∞ = {{frac:C0|1 − e^(−kτ)}}: the first-dose peak times the accumulation factor. The maximum occurs when each dose is given.',
   'Cmin∞ = Cmax∞ e^(−kτ), at the end of the interval, just before the next dose.',
   'Steady state is reached in 3 to 5 half-lives. tmax is needed only for oral dosing.']}],
 quote:'You should have gotten 21.4 mg per liter. What is the minimum? At steady state. 2.7, OK.',
 audit:'PollEv on page 13, locked, no count on the capture. Keyed 21.4 mg/L (transcript 10-19). Recompute: 18.75/(1 − e^(−2.079)) = 21.430. 32.6 = 18.75/(1 − 0.4248), e^(−kτ) = 0.4248 at τ = 4.94 hr. The same poll ran on 30 Sep (TRANSCRIPT_CUES 9.3).',
 cite:FR_DECK + ' slide 13 (PollEv); 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"'},

{id:'fr-6b', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L07',
 topic:'multi', sub:'ssbolus', concept:'cmin-ss', skill:'multidose', source:'transcript',
 stem:'A drug with a t½ of 4 hours and VD of 16 L is given as multiple IV bolus doses of 300 mg every 12 hours. What is the minimum plasma concentration at steady state? (Part a: maximum steady-state concentration = 21.4 mg/L.)',
 units:'mg/L', answer:2.7, tol:0.05,
 steps:[
  {k:'setup', t:'Cmin∞ = Cmax∞ e^(−kτ)',
   why:'The trough at steady state is the peak after one dosing interval of first-order decline: it comes at the end of the interval, just before the next dose.'},
  {k:'unit', t:'k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹; kτ = 0.17325 × 12 = 2.079; e^(−2.079) = 0.1251',
   why:'τ = 12 hr, the dosing interval, which is 3 half-lives of 4 hours. hr⁻¹ × hr cancels, so the exponent is a pure number.'},
  {k:'algebra', t:'Cmin∞ = 21.4 mg/L × 0.1251 = 2.677 mg/L',
   why:'The peak from part a times the fraction left after 12 hours. Carrying the peak unrounded, 21.43 × 0.1251 = 2.681 mg/L.'},
  {k:'round', t:'Cmin∞ = 2.7 mg/L',
   why:'2.677 mg/L to one decimal place, her value. The 12-hour interval is three half-lives of 4 hours, and three half-lives leave one eighth of the 21.4 mg/L peak.'}],
 setup:{eq:'cmin-from-cmax', pre:['thalf-first'], why:'"Minimum plasma concentration at steady state" with the steady-state peak known: the peak times e^(−kτ). k comes from the half-life.'},
 asks:'Cminss',
 givens:[['Cmax∞', '21.4 mg/L', 'part a: the peak the trough falls from'], ['t½', '4 hours', 'k = 0.17325 hr⁻¹'], ['τ', 'every 12 hours', 'the time from peak to trough'], ['VD', '16 L', 'not needed once the peak is known'], ['D0', '300 mg', 'not needed once the peak is known']],
 check:{t:'The trough is the peak times the fraction left after 12 hours, 3 half-lives: one eighth of 21.4 mg/L is about 2.7 mg/L.', lo:0, hi:21.4},
 teach:[
  {h:'Trough at steady state', list:[
   'Cmin∞ = Cmax∞ e^(−kτ), or Cmin∞ = {{frac:C0 e^(−kτ)|1 − e^(−kτ)}}.',
   'When the interval is a whole number of half-lives the fraction left is a power of one half: 3 half-lives leave one eighth.']}],
 quote:'What is the minimum? At steady state. 2.7, OK. Anybody else get 2.7?',
 audit:'Spoken follow-up to the page 13 poll (transcript 10-19), key 2.7 mg/L. Recompute: 21.430 × 0.12506 = 2.680; 21.4 × 0.1251 = 2.677.',
 cite:FR_DECK + ' slide 13 (follow-up to the PollEv); 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"'},

/* ------------- 6. Cp against time for each type of administration ------------- */
{id:'fr-7', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04', dupOf:'fig-inf-1',
 topic:'infusion', sub:'basics', concept:'shape-of-infusion-curve', skill:'read', source:'both',
 stem:'Which type of drug input is depicted by this curve?',
 img:'inf_css',
 options:[
  {t:'instantaneous input',
   why:'Picking this reads the curve as a bolus. Instantaneous input puts the whole dose in at time zero, so the concentration starts at its highest and only falls; this curve starts at zero and rises.'},
  {t:'first-order input',
   why:'Picking this reads the rise as absorption from an oral dose. First-order input slows as the absorption site empties, so the curve peaks and then falls; this curve never turns down, because drug keeps arriving at the same rate.'},
  {t:'zero-order input', correct:true,
   why:'Zero order means a constant rate of input: an IV infusion. With first-order output, the level rises until the rate out equals the rate in and then holds at the steady-state level.'}],
 teach:[
  {h:'Input and output for each route', list:[
   'Instantaneous input, first-order output: IV bolus.',
   'First-order input, first-order output: a conventional oral dose.',
   'Zero-order input, first-order output: IV infusion.',
   'Most drugs are eliminated by first order, so the route changes only the input.']}],
 quote:'So, I was looking for zero order. What does zero order mean? Same Same rate. Non-changing. What, what\'s another word for non-changing? Constant, right? So a constant rate of input.',
 audit:'PollEv on page 15, 14 responses on the capture, no distribution shown. Her figure is a textbook plasma-level curve rising to a "Steady-state level"; the drill shows its own drawn infusion curve of the same shape (inf_css). Keyed zero-order input (transcript 10-19).',
 cite:FR_DECK + ' slide 15 (PollEv)'},

{id:'fr-7m', type:'match', prof:'Mosley', tier:'new', exam:2, module:5, lecture:'L06',
 topic:'oral', sub:'extravasc', concept:'input-output-by-route', skill:'tell', source:'transcript',
 stem:'Match each pattern of drug input and output to the type of administration that gives it.',
 left:['Instantaneous input, first-order output', 'First-order input, first-order output', 'Zero-order input, first-order output'],
 right:['IV bolus', 'Conventional oral dose', 'IV infusion'],
 pairs:[
  {l:'Instantaneous input, first-order output', r:'IV bolus',
   why:'The whole dose enters the blood at once, so there is no input phase on the curve: it starts at C0 and falls by first-order elimination.'},
  {l:'First-order input, first-order output', r:'Conventional oral dose',
   why:'Absorption from the gut is first order: fast while much drug is at the absorption site, slower as it empties. The curve rises to a peak and then falls by first-order elimination.'},
  {l:'Zero-order input, first-order output', r:'IV infusion',
   why:'The pump delivers a constant rate, which is zero order. Against first-order elimination the level rises until rate out equals rate in, the steady state.'}],
 teach:[
  {h:'Three routes, one output', list:[
   'All three routes share first-order elimination; they differ in how the drug is put into the body.',
   'Bolus: instantaneous. Conventional oral: first order. Infusion: zero order, a constant rate.']}],
 quote:'So, instantaneous in, 1st order out is our bolus, 1st order in, 1st order out is our oral, our conventional oral, and then 0 order in, 1st order out is our IV infusion.',
 audit:'Spoken after the page 15 poll (transcript 10-19); no slide prints the three pairs. Concept id new.',
 cite:FR_DECK + ' slide 15 (follow-up to the PollEv); 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "First-Order Absorption Model"'},

/* ------------------------ 5. Bioavailability ------------------------ */
{id:'fr-8a', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10', dupOf:'m7-c15',
 topic:'bioavail', sub:'fabs', concept:'fabs-two-aucs', skill:'bioavail', source:'both',
 stem:'What is the bioavailability of a 500 mg tablet which yielded an AUC of 115 (mg/L)hr compared to a 400 mg IV bolus dose that yielded an AUC of 132 (mg/L)hr?',
 options:[
  {t:'50%',
   why:'Picking this corrects for the doses more than once. The AUC ratio {{frac:115|132}} = 0.871 is scaled once by the dose ratio {{frac:400|500}} = 0.8, giving 0.697, about 70%.'},
  {t:'70%', correct:true,
   why:'F = ({{frac:AUCpo|AUCIV}})({{frac:DIV|Dpo}}) = ({{frac:115|132}})({{frac:400|500}}) = 0.871 × 0.8 = 0.697, which is 70%. The IV AUC is in the denominator; the IV dose is on top of the dose ratio.'},
  {t:'85%',
   why:'Picking this stops at the AUC ratio, {{frac:115|132}} = 0.871. The tablet area came from 500 mg against 400 mg IV, so it is scaled by {{frac:400|500}} = 0.8 to compare equal doses.'},
  {t:'92%',
   why:'Picking this inverts a ratio. With the doses upside down, ({{frac:115|132}})({{frac:500|400}}) = 1.089, more than all of the dose; a larger oral dose makes F smaller, not larger.'}],
 steps:[
  {k:'setup', t:'Fabs = ({{frac:AUCpo|AUCIV}})({{frac:DIV|Dpo}})',
   why:'Absolute bioavailability compares the tablet with the IV bolus, so the IV AUC is the denominator. The doses differ, so the dose ratio corrects for them with the IV dose on top.'},
  {k:'algebra', t:'{{frac:115|132}} = 0.871; {{frac:400|500}} = 0.8; F = 0.871 × 0.8 = 0.697',
   why:'Absolute bioavailability is the AUC ratio scaled by the dose ratio. The units cancel in both ratios, (mg/L)hr over (mg/L)hr and mg over mg, so F is dimensionless.'},
  {k:'round', t:'F = 0.697, which is 70%',
   why:'0.697 rounds to 0.70, written as 70% or 0.70, never .70. F is a fraction with no units; below 1 it means about 30% of the oral dose does not reach the systemic circulation.'}],
 teach:[
  {h:'Absolute bioavailability', list:[
   'F = ({{frac:AUCpo|AUCIV}})({{frac:DIV|Dpo}}): the IV AUC is in the denominator, the IV dose on top.',
   'AUC tells the extent of drug available for the body to use, the extent absorbed.',
   'The oral dose that gives the same AUC as an IV dose is Dpo = {{frac:DIV|F}}.']}],
 quote:'OK, most of you guys thought 70%.',
 audit:'PollEv on page 17, 0 votes on the capture (taken before voting). The same poll ran on 30 Sep (m7-c15). Keyed 70% (transcript 10-19). Recompute (115/132)(400/500) = 0.69697.',
 cite:FR_DECK + ' slide 17 (PollEv); 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability"'},

{id:'fr-8b', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:7, lecture:'L10',
 topic:'bioavail', sub:'fabs', concept:'equiv-oral-dose', skill:'bioavail', source:'transcript',
 stem:'A 500 mg tablet yielded an AUC of 115 (mg/L)hr and a 400 mg IV bolus dose yielded an AUC of 132 (mg/L)hr. What oral dose would provide similar therapeutic activity as the 400 mg bolus dose? Round to the nearest 5. (Part a: the bioavailability is 70%.)',
 units:'mg', answer:570, tol:5,
 steps:[
  {k:'setup', t:'Dpo = {{frac:DIV|F}}',
   why:'Similar activity means the same AUC, the same amount reaching the circulation. Setting the two AUCs equal in the bioavailability equation leaves F = {{frac:DIV|Dpo}}, rearranged for the oral dose.'},
  {k:'algebra', t:'Dpo = {{frac:400 mg|0.70}} = 571.43 mg',
   why:'F = 70% from part a, written 0.70. Only 70% of an oral dose reaches the circulation, so the oral dose must be larger than the 400 mg IV dose.'},
  {k:'round', t:'Dpo = 570 mg, to the nearest 5',
   why:'571.43 is nearer 570 than 575. With F unrounded, {{frac:400|0.697}} = 573.89 mg, which is 575 to the nearest 5; the tolerance accepts both.'}],
 setup:{eq:'dpo-equiv', pre:['f-abs'], why:'"What oral dose would provide similar therapeutic activity as the 400 mg bolus dose": the equivalent oral dose, IV dose over F, with F from part a.'},
 asks:'Dpo',
 givens:[['DIV', '400 mg bolus dose', 'the numerator of Dpo = DIV ÷ F'], ['F', '70%', 'part a: the denominator, 0.70'], ['Dpo', '500 mg tablet', 'not needed: the tablet strength gave F, not the new dose'], ['AUC', '115 (mg/L)hr', 'not needed once F is known']],
 check:{t:'F is below 1, so the oral dose must exceed the 400 mg IV dose: 400 ÷ 0.70 gives 571.43 mg, which is 570 to the nearest 5.', lo:400},
 note:'With F unrounded, 0.697, the dose is 573.9 mg, which is 575 to the nearest 5. Her answer uses F = 70% and gives 570 mg. Both are accepted.',
 teach:[
  {h:'Equivalent oral dose', list:[
   'Equal AUCs make F = {{frac:DIV|Dpo}}, so Dpo = {{frac:DIV|F}}. The oral dose is always larger than the IV dose when F is below 1.',
   'Round as the question says. "Round to the nearest 5": 571.43 becomes 570.']}],
 quote:'What oral dose would provide similar therapeutic activity as the 400 mg bolus dose? Round to the nearest 5. 500 what? 570? Everybody get 570?',
 audit:'Spoken follow-up to the page 17 poll (transcript 10-19), key 570 mg. Recompute 400/0.70 = 571.43 → 570; 400/0.69697 = 573.91 → 575. Keyed her 570 per BANK_SPEC rule 2; tol 5 accepts 575.',
 cite:FR_DECK + ' slide 17 (follow-up to the PollEv); 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability"'},

/* ---------------------- 4. Linear and nonlinear ---------------------- */
{id:'fr-9', prof:'Mosley', tier:'new', exam:3, module:8, lecture:'L12', dupOf:'nl-c01',
 topic:'nonlin', sub:'kmcp', concept:'nl-order-by-conc', skill:'recall', source:'both',
 stem:'Drugs that display Michaelis-Menten saturation kinetics will often exhibit zero-order kinetics at low concentrations and first-order kinetics at high concentrations.',
 options:[
  {t:'True',
   why:'Picking this reverses the two ends. Well below KM the rate is {{frac:Vmax|KM}} × Cp, proportional to the concentration, which is first order. Well above KM the rate is Vmax whatever the concentration, which is zero order.'},
  {t:'False', correct:true,
   why:'The orders are the wrong way round. At low concentrations elimination looks first order; at high concentrations the process proceeds at Vmax, a constant for a given drug in a given patient, which is zero order.'}],
 teach:[
  {h:'The order depends on Cp against KM', list:[
   '−{{frac:dCp|dt}} = {{frac:Vmax Cp|KM + Cp}}.',
   'Cp much less than KM: the rate is {{frac:Vmax|KM}} × Cp, first order. Low dose, first order.',
   'Cp much greater than KM: the rate is Vmax, zero order. High dose, zero order.',
   'Vmax and KM are constants for a given drug in a given patient; half-life and clearance change with the concentration.']}],
 quote:'At high concentrations, then the process proceeds according to VM max, right? VMAX is a constant for a given drug given patient.',
 audit:'PollEv on page 19, 0 votes on the capture. Same stem as her 14 Oct poll (nl-c01). Keyed False (transcript 10-19): "most of you guys thought that that was false. And that was indeed false".',
 cite:FR_DECK + ' slide 19 (PollEv); 8 - Nonlinear PK.pdf, slide 8 "Saturable-Enzymatic Elimination Processes"'},

/* ---------------------- 3. The significance of AUC ---------------------- */
{id:'fr-10', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'auc', sub:'concept', concept:'trapezoidal-auc', skill:'recall', source:'both',
 stem:'The trapezoidal rule provides a simple way to estimate the AUC.',
 options:[
  {t:'True', correct:true,
   why:'The trapezoidal rule breaks the curve into segments between the measured points, finds the area of each, one half base times height summed over the two sides, and adds them. It estimates the AUC from the data alone.'},
  {t:'False',
   why:'Picking this reads the existence of other routes as ruling the rule out. AUC can also be calculated from the dose and the clearance, AUC = {{frac:D0|Cl}}, but the trapezoidal rule remains a way to estimate it from measured points.'}],
 teach:[
  {h:'AUC', list:[
   'AUC tells the extent of drug available for the body to use: the extent of drug absorbed.',
   'Trapezoidal rule, one segment: AUC = ({{frac:Cn−1 + Cn|2}})(tn − tn−1); the segments are summed.',
   'Without data points, AUC = {{frac:D0|Cl}} for an IV dose, and {{frac:FD0|Cl}} for an oral one.']}],
 quote:'And way back when we did the trapezoidal rule, we haven\'t done it since because we have some other ways to calculate AUC.',
 audit:'PollEv on page 21, 34 responses on the capture, no distribution shown and no key spoken. Keyed True from her Module 1 objective 5 ("Determine the area under the curve for a provided data set using the trapezoidal rule") and her 17 Aug description (TRANSCRIPT_CUES 1.2). She asked the same as the 30 Sep attendance poll ("most of you guys thought, yes").',
 cite:FR_DECK + ' slide 21 (PollEv); Introduction.pdf, slide "The Concept of Area Under The Curve (AUC)"'},

/* ----------------- 2. Duration of action and the times ----------------- */
{id:'fr-11a', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-calc', skill:'pkpd', source:'both',
 stem:'What is the duration of action for a 1 g IV bolus dose with a VD = 12.5 L, t½ = 4hr and MEC= 20 mg/L ?',
 options:[
  {t:'4 hours',
   why:'Picking this counts one half-life, 80 to 40 mg/L, and stops above the MEC. The level falls from 80 to 20 mg/L, a factor of 4, which takes two half-lives. Four hours is the duration of a 500 mg dose.'},
  {t:'8 hours', correct:true,
   why:'C0 = {{frac:1000 mg|12.5 L}} = 80 mg/L, four times the MEC. The level halves every 4 hours, so 80 to 40 to 20 mg/L takes two half-lives: 8 hours.'},
  {t:'12 hours',
   why:'Picking this counts one half-life too many. Three half-lives take the level from 80 to 10 mg/L, half the MEC; the effect ends when the level reaches 20 mg/L, after two.'},
  {t:'None of the above',
   why:'Picking this usually follows leaving the dose in grams: 1 g has to be 1000 mg before it is divided by 12.5 L. Done in mg, the duration is 8 hours, which is listed.'}],
 steps:[
  {k:'unit', t:'1 g = 1000 mg; C0 = {{frac:1000 mg|12.5 L}} = 80 mg/L; k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹',
   why:'The concentration just after the bolus is the dose over the volume, in the same units as the MEC. k comes from the half-life.'},
  {k:'algebra', t:'teff = {{frac:ln C0 − ln MEC|k}} = {{frac:ln(80 ÷ 20)|0.17325}} = {{frac:1.3863|0.17325}} = 8.00 hr',
   why:'C = C0e^(−kt) solved for the time the level reaches the MEC. 80 ÷ 20 = 4, two doublings, so the duration is two half-lives.'},
  {k:'round', t:'teff = 8 hours',
   why:'8.00 hr is two half-lives of 4 hours, 80 to 40 to 20 mg/L. The effect lasts while the level is at or above the MEC of 20 mg/L, so the duration of action is 8 hours.'}],
 teach:[
  {h:'Duration of action', list:[
   'teff = {{frac:ln C0 − ln MEC|k}} = {{frac:2.3(log C0 − log MEC)|k}}, with C0 = {{frac:D0|VD}}.',
   'Each doubling of the dose adds one half-life to the duration; halving it takes one away.',
   'Rearrange the same first-order line to solve for any time: duration of action, time to reach steady state (3 to 5 half-lives), time to most of the drug eliminated.']}],
 quote:'And most of you guys thought that it was 8 hours, and that is the correct answer.',
 audit:'PollEv on page 23, locked, no count on the capture. Keyed 8 hours (transcript 10-19). Recompute ln(4)/0.17325 = 8.0017 hr.',
 cite:FR_DECK + ' slide 23 (PollEv); 7b---Pharmacokinetics-and-Pharmacodynamics.pdf slide 7 "Practice Problem"'},

{id:'fr-11b', type:'numeric', prof:'Mosley', tier:'new', exam:3, module:9, lecture:'L11',
 topic:'pkpd', sub:'teff', concept:'teff-dose-change', skill:'pkpd', source:'transcript',
 stem:'A drug has a VD = 12.5 L, t½ = 4hr and MEC= 20 mg/L. If 500 mg were given as an IV bolus dose instead of 1 g, what would the duration of action be? (Part a: duration of action = 8 hours for the 1 g dose.)',
 units:'hr', answer:4, tol:0.1,
 steps:[
  {k:'setup', t:'C0 = {{frac:500 mg|12.5 L}} = 40 mg/L; k = {{frac:0.693|4 hr}} = 0.17325 hr⁻¹',
   why:'For an IV bolus C0 is the dose over the volume, and mg over L leaves mg/L, the units of the MEC. Half the dose gives half the starting concentration, because the volume does not change with the dose.'},
  {k:'algebra', t:'teff = {{frac:ln(40 ÷ 20)|0.17325}} = {{frac:0.6931|0.17325}} = 4.00 hr',
   why:'The natural-log duration line with the new C0. 40 mg/L is twice the MEC, so the level reaches the MEC after one half-life.'},
  {k:'round', t:'teff = 4 hours',
   why:'Halving the dose takes one half-life, 4 hours, off the 8 hours of part a. The dose sits inside the logarithm, so half the dose does not give half the duration in general; here it does only because 8 hours is two half-lives.'}],
 setup:{eq:'pd-teff-ln', pre:['cp-db-vd', 'thalf-first'], why:'"Duration of action" for a single IV bolus with VD, t½ and the MEC given: the natural-log duration line with C0 = D0 over VD.'},
 asks:'t',
 givens:[['D0', '500 mg', 'C0 = 500 ÷ 12.5 = 40 mg/L'], ['VD', '12.5 L', 'divides the dose to give C0'], ['t½', '4hr', 'k = 0.17325 hr⁻¹'], ['MEC', '20 mg/L', 'the level where the effect ends']],
 check:{t:'C0 of 40 mg/L is twice the MEC of 20 mg/L, so the level falls to the MEC in one half-life, 4 hr.', lo:0, hi:8},
 teach:[
  {h:'A dose change and the duration', list:[
   'Doubling the dose adds one half-life to the duration; halving it removes one.',
   'teff = 1.44 × t½ × ln({{frac:D0|VD × MEC}}): the dose is inside the logarithm.']}],
 quote:'And if we were to give 500 mg instead of 1 g, what would the duration of action be? 4 hours, right?',
 audit:'Spoken follow-up to the page 23 poll (transcript 10-19), key 4 hours. Recompute ln(2)/0.17325 = 4.0008 hr.',
 cite:FR_DECK + ' slide 23 (follow-up to the PollEv); 7b---Pharmacokinetics-and-Pharmacodynamics.pdf slide 7 "Practice Problem"'},

/* ------------- 1. Cp after IV bolus, IV infusion, extravascular ------------- */
{id:'fr-12a', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'pre', concept:'cp-before-steady-state', skill:'infusion', source:'both',
 stem:'What is the plasma concentration at the end of a 2 hour infusion of a drug with a t½ of 3 hours and a VD of 18 L at a rate of 50 mg/hr?',
 options:[
  {t:'3.03 mg/L',
   why:'Picking this undercounts how far the level has climbed. 3.03 mg/L is 25% of the 12.025 mg/L steady state; 2 hours at k = 0.231 hr⁻¹ reaches 37.0% of it, 4.45 mg/L.'},
  {t:'4.45 mg/L', correct:true,
   why:'Css = {{frac:R|kVD}} = {{frac:50|0.231 × 18}} = 12.025 mg/L, and after 2 hours the level is 12.025 × (1 − e^(−0.462)) = 12.025 × 0.3700 = 4.449 mg/L.'},
  {t:'4.81 mg/L',
   why:'Picking this overcounts the climb. 4.81 mg/L is 40% of the steady state, more than the 37.0% that 1 − e^(−kt) gives for 2 hours with k = 0.231 hr⁻¹.'},
  {t:'31.5 mg/L',
   why:'Picking this puts the level above the steady state it climbs toward. An infusion approaches {{frac:R|Cl}} = 12.025 mg/L from below and never passes it.'}],
 steps:[
  {k:'unit', t:'k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹; Cl = kVD = 0.231 × 18 = 4.158 L/hr',
   why:'No clearance is given, so it is built from the half-life and the volume: k is 0.693 over t½ for a first-order process, and Cl = kVD. hr⁻¹ × L leaves L/hr.'},
  {k:'algebra', t:'{{frac:R|Cl}} = {{frac:50 mg/hr|4.158 L/hr}} = 12.025 mg/L',
   why:'At steady state the rate in, R, equals the rate out, Cl × Css, so Css is R over Cl, the level the infusion climbs toward. mg/hr over L/hr leaves mg/L; the hours cancel.'},
  {k:'algebra', t:'1 − e^(−0.231 × 2) = 1 − e^(−0.462) = 1 − 0.6300 = 0.3700',
   why:'During an infusion Cp = Css(1 − e^(−kt)), so 1 − e^(−kt) is the fraction of steady state reached after 2 hours. hr⁻¹ × hr cancels, so kt and the fraction have no units.'},
  {k:'algebra', t:'Cp = 12.025 × 0.3700 = 4.449 mg/L',
   why:'Cp = Css(1 − e^(−kt)): the steady-state level times the fraction reached. mg/L times a pure number stays mg/L. The answer must lie below 12.025 mg/L, and it does.'},
  {k:'round', t:'Cp = 4.45 mg/L',
   why:'4.449 mg/L to two decimal places, her value. Two hours is less than one half-life of 3 hours, so the level is still below half of the 12.025 mg/L steady state.'}],
 teach:[FR_T_INF],
 quote:'OK, still going? All right, still working, are we done? OK. 4.45 mg per liter.',
 audit:'PollEv on page 25, 1 response on the capture. Keyed 4.45 mg/L (transcript 10-19). Recompute 12.025 × 0.36998 = 4.4490.',
 cite:FR_DECK + ' slide 25 (PollEv); 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State"'},

{id:'fr-12b', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'stop', concept:'post-cessation-decay', skill:'conctime', source:'transcript',
 stem:FR_INF + ' What is the concentration 3 hours after cessation of the infusion? (Part a: 4.45 mg/L at the end of the infusion.)',
 units:'mg/L', answer:2.2, tol:0.05,
 steps:[
  {k:'setup', t:'Cp = Cend e^(−kt), t counted from the end of the infusion',
   why:'Once the infusion ends no drug goes in, so only first-order elimination remains, starting from the end-of-infusion level.'},
  {k:'algebra', t:'k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹; Cp = 4.45 × e^(−0.231 × 3) = 4.45 × e^(−0.693) = 4.45 × 0.500 = 2.225 mg/L',
   why:'Three hours is one half-life of 3 hours, so e^(−0.693) is one half: half of the 4.45 mg/L from part a is left.'},
  {k:'round', t:'Cp = 2.2 mg/L',
   why:'2.225 mg/L to one decimal place, her value. It is half of 4.45 mg/L because 3 hours after the infusion stops is exactly one half-life of 3 hours.'}],
 setup:{eq:'cp-after-stop', pre:['thalf-first'], why:'"3 hours after cessation": the after-stop line, starting from the end-of-infusion level of part a. k from the half-life.'},
 asks:'Cp',
 givens:[['Cend', '4.45 mg/L', 'part a: the level the decline starts from'], ['t½', '3 hours', 'k = 0.231 hr⁻¹'], ['t', '3 hours after cessation', 'one half-life'], ['R', '50 mg/hr', 'not needed once the end level is known']],
 check:{t:'Three hours is one half-life, so half of 4.45 mg/L is left: 2.2 mg/L.', lo:0, hi:4.45},
 teach:[FR_T_INF],
 quote:'What is the concentration 3 hours after cessation? Am I got an answer for me? 2.2? OK. Everybody get 2.2.',
 audit:'Spoken follow-up to the page 25 poll (transcript 10-19), key 2.2 mg/L. Recompute 4.4490 × 0.50007 = 2.2248.',
 cite:FR_DECK + ' slide 25 (follow-up to the PollEv); 3IntravenousInfusions.pdf, slide "Example 5"'},

{id:'fr-12c', type:'numeric', prof:'Mosley', tier:'new', exam:2, module:6, lecture:'L08',
 topic:'intermit', sub:'add', concept:'sum-two-infusions', skill:'multidose', source:'both',
 stem:FR_INF + ' Another 2 hour infusion was started 6 hours after the start of the first infusion. What is the concentration 4 hours after cessation of the second infusion? (Part a: 4.45 mg/L at the end of each 2-hour infusion.)',
 units:'mg/L', answer:2.2, tol:0.05,
 steps:[
  {k:'setup', t:'Infusion 1 runs 0 to 2 hr; infusion 2 runs 6 to 8 hr; the level is asked at 8 + 4 = 12 hr',
   why:'Draw the time line first. At 12 hr the first infusion has been declining for 12 − 2 = 10 hr and the second for 12 − 8 = 4 hr.'},
  {k:'algebra', t:'Infusion 1: 4.45 × e^(−0.231 × 10) = 4.45 × 0.0993 = 0.442 mg/L',
   why:'Each identical 2-hour infusion ends at 4.45 mg/L, from part a. After it stops, C = Cend e^(−kt), t counted from its own end.'},
  {k:'algebra', t:'Infusion 2: 4.45 × e^(−0.231 × 4) = 4.45 × 0.3969 = 1.766 mg/L',
   why:'Four hours after the second infusion stopped, a little over one half-life of 3 hours, so a little under half of 4.45 mg/L is left.'},
  {k:'algebra', t:'Cp = 0.442 + 1.766 = 2.208 mg/L',
   why:'Superposition: the concentrations from separate infusions add, because each is eliminated by first order whatever else is present.'},
  {k:'round', t:'Cp = 2.2 mg/L',
   why:'2.208 to one decimal place, her value. It comes out close to part b by coincidence of the times, not because the second infusion adds nothing.'}],
 setup:{eq:'cp-after-stop', pre:['thalf-first', 'cp-infusing'], why:'Two separate short infusions: the end level of each from part a, the decline of each since it stopped, then the sum.'},
 asks:'Cp',
 givens:[['Cend', '4.45 mg/L', 'part a: the end level of each infusion'], ['second start', '6 hours after the start', 'infusion 2 runs 6 to 8 hr'], ['t', '4 hours after cessation', 'the level at 12 hr'], ['t½', '3 hours', 'k = 0.231 hr⁻¹'], ['tinf', '2 hour infusion', 'each infusion runs 2 hr']],
 check:{t:'The second infusion alone leaves a little under half of 4.45 mg/L after 4 hours; the first adds 0.442 mg/L: 2.2 mg/L.', lo:1.766, hi:4.45},
 teach:[FR_T_INF],
 quote:'So remember, once the infusion ends, it\'s just first order elimination',
 audit:'Spoken follow-up (transcript 10-19), key 2.2 mg/L ("I got 2.2 again"). The spoken timing is garbled ("6 hours. After the first infusion", "another 16 hours after the start of the first"); her board on page 26 fixes it: time line 0, 2, 6, 8, 12 and 4.45e^-(0.231x4) + 4.45e^-(0.231x10) = 2.2 mg/L. Recompute 1.7659 + 0.4416 = 2.2075.',
 cite:FR_DECK + ' slides 25 and 26 (follow-up worked on the board); 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, Example 4'},

{id:'fr-12d', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'css', concept:'css-from-rate', skill:'infusion', source:'transcript',
 stem:'A drug with a t½ of 3 hours and a VD of 18 L is infused at a rate of 50 mg/hr. If the infusion were continued at this rate, what would the steady-state concentration be?',
 units:'mg/L', answer:12, tol:0.1,
 steps:[
  {k:'setup', t:'Css = {{frac:R|Cl}} = {{frac:R|kVD}}',
   why:'At steady state the rate in equals the rate out, so the level is the infusion rate over the clearance. The clearance is built from k and VD.'},
  {k:'algebra', t:'k = {{frac:0.693|3 hr}} = 0.231 hr⁻¹; Css = {{frac:50 mg/hr|0.231 × 18 L}} = {{frac:50|4.158}} = 12.025 mg/L',
   why:'k is 0.693 over t½ for first-order elimination, and Cl = kVD: hr⁻¹ × L gives a clearance in L/hr. Css is R over Cl, and mg/hr over L/hr leaves mg/L.'},
  {k:'round', t:'Css ≈ 12 mg/L',
   why:'12.025 mg/L to the nearest whole number, as she rounds it. Whatever the rate, an infusion reaches steady state in 3 to 5 half-lives of 3 hours, 9 to 15 hours.'}],
 setup:{eq:'css', pre:['thalf-first', 'cl-k-vd'], why:'"If the infusion were continued", "steady-state concentration": Css = R over Cl, with Cl = k × VD from the half-life and volume.'},
 asks:'Css',
 givens:[['R', '50 mg/hr', 'the numerator of Css'], ['t½', '3 hours', 'k = 0.231 hr⁻¹'], ['VD', '18 L', 'with k gives Cl = 4.158 L/hr']],
 check:{t:'Cl is 0.231 × 18, 4.158 L/hr, a little over 4 L/hr, so 50 mg/hr over it is a little under 50 ÷ 4: about 12 mg/L.', lo:4.45},
 teach:[FR_T_INF],
 quote:'What if we were to continue this infusion? At this rate, What would the steady state concentration be? I got an answer? What do you got? 12.02. OK. If I get twelve-ish?',
 audit:'Spoken follow-up (transcript 10-19): "12.02", then "let\'s say 12". Recompute 50/4.158 = 12.025. Keyed 12, tol 0.1 accepts 12.02 and 12.03.',
 cite:FR_DECK + ' slide 25 (follow-up to the PollEv); 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State"'},

{id:'fr-12e', type:'numeric', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04',
 topic:'infusion', sub:'css', concept:'css-from-rate', skill:'infusion', source:'transcript',
 stem:'A drug with a t½ of 3 hours and a VD of 18 L is infused. If it were infused at a rate of 100 mg/hr, what would the steady-state concentration be? (Part d: steady-state concentration = 12 mg/L at 50 mg/hr.)',
 units:'mg/L', answer:24, tol:0.2,
 steps:[
  {k:'setup', t:'Css = {{frac:R|Cl}}, with Cl = 0.231 × 18 = 4.158 L/hr unchanged',
   why:'Css is R over Cl. The clearance, k × VD from the 3-hour half-life and the 18 L volume, belongs to the drug and the patient, not to the infusion rate, so only R changes.'},
  {k:'algebra', t:'Css = {{frac:100 mg/hr|4.158 L/hr}} = 24.05 mg/L',
   why:'mg/hr over L/hr leaves mg/L. With the clearance fixed, Css is proportional to R, so twice the rate of part d gives twice the steady-state concentration of 12 mg/L.'},
  {k:'round', t:'Css ≈ 24 mg/L',
   why:'24.05 to the nearest whole number, her value. The time to reach it is the same 3 to 5 half-lives as at 50 mg/hr.'}],
 setup:{eq:'css', pre:['thalf-first', 'cl-k-vd'], why:'"At a rate of 100 mg/hr, what would the steady-state concentration be": Css = R over Cl again, with the same clearance and the new rate.'},
 asks:'Css',
 givens:[['R', '100 mg/hr', 'the new numerator'], ['t½', '3 hours', 'k = 0.231 hr⁻¹'], ['VD', '18 L', 'with k gives Cl = 4.158 L/hr'], ['Css at 50 mg/hr', '12 mg/L', 'part d: doubles with the rate']],
 check:{t:'Doubling the rate from 50 to 100 mg/hr doubles Css: twice 12 mg/L is 24 mg/L.', lo:12},
 teach:[FR_T_INF],
 quote:'If we. Infuse it at a rate of 100 mg per hour, what would the steady state concentration be? 24.',
 audit:'Spoken follow-up (transcript 10-19), key 24. Recompute 100/4.158 = 24.050.',
 cite:FR_DECK + ' slide 25 (follow-up to the PollEv); 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State"'},

{id:'fr-12f', prof:'Mosley', tier:'new', exam:1, module:3, lecture:'L04', dupOf:'inf-c5',
 topic:'infusion', sub:'css', concept:'rate-vs-time-to-css', skill:'apply', source:'transcript',
 stem:'A drug with a t½ of 3 hours infused at 50 mg/hr reaches a steady-state concentration of about 12 mg/L. Infused at 100 mg/hr, it reaches about 24 mg/L. How long does it take to reach 24 mg/L at 100 mg/hr, compared with reaching 12 mg/L at 50 mg/hr?',
 options:[
  {t:'Half the time',
   why:'Picking this reads a faster input as a faster arrival. The approach to steady state follows 1 − e^(−kt), which holds only k, so the time is 3 to 5 half-lives at any rate.'},
  {t:'The same time', correct:true,
   why:'Changing the rate changes only the concentration. The climb follows 1 − e^(−kt), so either rate reaches steady state in 3 to 5 half-lives of 3 hours, 9 to 15 hours.'},
  {t:'Twice the time',
   why:'Picking this reads a higher plateau as farther to travel. The plateau doubles with the rate, but so does the speed of the climb at every moment, so the fraction of steady state reached at each time is the same.'}],
 teach:[FR_T_INF],
 quote:'So changing the rate. Just changes the concentration. It does not change the time that it takes to get to that steady-state concentration, OK?',
 audit:'Spoken follow-up (transcript 10-19): "3 to 5 half-lifes" for both rates. Same point as inf-c5.',
 cite:FR_DECK + ' slide 25 (follow-up to the PollEv); 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State"'}
];

CHAINS.push(
 {id:'fr-sheet', src:'review', module:8, span:true, name:'Final Exam Review (19 Oct)',
  setup:'Her ten things to know for the final, in her order: orders, basic parameters, clearance, steady state, curves, bioavailability, nonlinear, AUC, duration of action, then an infusion worked in six parts',
  parts:['fr-1', 'fr-2', 'fr-3', 'fr-4', 'fr-5', 'fr-6a', 'fr-6b', 'fr-7', 'fr-7m', 'fr-8a', 'fr-8b',
         'fr-9', 'fr-10', 'fr-11a', 'fr-11b', 'fr-12a', 'fr-12b', 'fr-12c', 'fr-12d', 'fr-12e', 'fr-12f']}
);
