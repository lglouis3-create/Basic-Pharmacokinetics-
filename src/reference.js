/* ==========================================================================
   REFERENCE
   ==========================================================================
   Static HTML document: the equation tables the questions keep returning to.
   Authored as HTML in a template literal — no backtick and no dollar-brace
   inside. Each <h3> becomes a jump-list entry automatically.
   {{fig:key|caption}} tokens resolve against images.json, and {{steps:key}}
   tokens against steps.json (step-through figures); figures.py draws both.

   SOURCES. Every equation, symbol, unit, number and claim below comes from
   one of: BasicPharmacokineticsEquations.pdf (the exam equation sheet),
   the five lectured decks, Dr. Mosley's own worked solutions recorded in
   STYLE.md, or her spoken words recorded in TRANSCRIPT_CUES.md. What the
   equation sheet carries is read from the rendered pages of
   Basic-Pharmacokinetics-Equations.pdf (two pages, 52 lines), not from its
   text extract, which drops four of those lines.
   ========================================================================== */
const REFERENCE_HTML = `
<h2>Reference</h2>
<p class="sub">Every equation this course uses, Modules 1 to 7a. Nothing here is scored.</p>
<details class="tabhelp" open><summary>What this tab is for</summary><ul>
<li><b>Look an equation up while working a problem:</b> each one with its symbols, units, the condition it holds under, and whether the exam equation sheet carries it.</li>
<li><b>First comes the map of her equation sheet:</b> every line in print order, coloured by module, with the words in a stem that call for it; it prints on its own.</li>
<li><b>Then the ones she said are not on the sheet,</b> then the unit conversions this course keeps needing, then one section per module.</li>
<li><b>The last section walks the equation sheet itself</b> line by line, so a line on the sheet can be matched to the module it belongs to.</li>
<li>Use <b>Jump to a section</b> to go straight to a module.</li>
</ul></details>
{{sheetmap}}

<h3>Not on the exam equation sheet</h3>
<ul class="tlist">
<li>Dr. Mosley supplies a paper equation sheet and the same equations inside ExamSoft: <i>"We will have equations for exams. I will put, give you a paper copy and equations will also be in ExamSoft for you, OK? So, the equations are there. You've got to think about which one do I want to apply in this application."</i></li>
<li>She named five things she does not put on the sheet.</li>
<li>She expects you to know these five without the sheet.</li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:26%">Relation</th><th style="width:34%">What she said</th><th>Where it is needed, and the state of the equation sheet</th></tr></thead><tbody>

<tr><td><b>First-order half-life</b>, the time for the amount or concentration of a drug to decrease by one-half when loss is first order (rate proportional to the amount remaining)<br>t&frac12; = {{frac:0.693|k}}, k the first-order elimination rate constant, in reciprocal time</td>
<td><i>"first order half-life &hellip; that will not be on your equation sheet. This is the one that you take to your grave with you, OK? 0.693 over K."</i> (08-19). Repeated 08-24, 08-26 and in the 09-09 exam review: <i>"That one is not on your equation sheet."</i></td>
<td><ul class="tlist">
<li>Needed in every module.</li>
<li>It also gives the beta half-life of a two-compartment drug and the absorption half-life of an oral dose, because both are first-order half-lives, each of a different rate constant.</li>
<li>A two-compartment drug is one whose plasma curve has a steep early distribution segment before the terminal elimination segment; b, beta, is the slope of that terminal segment.</li>
<li>The absorption half-life comes from k<sub>a</sub>, the first-order absorption rate constant.</li>
<li>Not on the sheet. The only sheet line that solves for a half-life is the nonlinear one on page 2, t&frac12; = V<sub>D</sub>{{frac:0.693|V<sub>max</sub>}}(K<sub>M</sub> + C<sub>p</sub>).</li>
<li>In that line V<sub>D</sub> is the apparent volume of distribution (the volume that relates the amount of drug in the body to the measured concentration) and C<sub>p</sub> the plasma concentration.</li>
<li>V<sub>max</sub> and K<sub>M</sub> are the two constants of nonlinear elimination, which is final exam material and not part of Modules 1 to 7a.</li>
</ul></td></tr>

<tr><td><b>Clearance from k and V<sub>D</sub></b>, clearance (Cl) being the volume of plasma cleared of drug per unit time<br>Cl = k &times; V<sub>D</sub></td>
<td><i>"this is another one that it will not be on your equation sheet cause I want you to take this one with you to your grave along with the half-life equation. Clearance is equal to k times vd."</i> (08-24)</td>
<td><ul class="tlist">
<li>Needed for total body clearance, for the infusion rate R = C<sub>ss</sub>&middot;Cl, and for every split of a total clearance into its renal (kidney) and hepatic (liver) parts.</li>
<li>R is the constant rate of drug input, in amount per time; C<sub>ss</sub> the steady-state concentration, the plateau where rate in equals rate out.</li>
<li>2IVBolusAdministration.pdf slide "Clearance" states it, with a handwritten note that the equation will not be given on the exam.</li>
<li>Not on the sheet. The sheet's clearance lines are Cl<sub>T</sub> = {{frac:FD<sub>0</sub>|AUC}}, the renal and hepatic split, and the nonlinear Cl<sub>T</sub> = {{frac:V<sub>max</sub>|K<sub>M</sub> + C<sub>p</sub>}}.</li>
<li>Cl<sub>T</sub> is total body clearance; F the bioavailability, the fraction of the dose that reaches the plasma, 1 for an IV dose; D<sub>0</sub> the dose; AUC the area under the concentration-time curve.</li>
</ul></td></tr>

<tr><td><b>Volume, dose and concentration</b><br>C<sub>p</sub> = {{frac:D<sub>B</sub>|V<sub>D</sub>}}, so V<sub>D</sub> = {{frac:D<sub>B</sub>|C<sub>p</sub>}}; D<sub>B</sub> the amount of drug in the body, C<sub>p</sub> the plasma concentration, V<sub>D</sub> the apparent volume of distribution</td>
<td><i>"The other one, the relationship between volume of distribution, concentration, and dose, that one is in, in, in you as well"</i> (08-26)</td>
<td><b>Two sources differ here.</b><ul class="tlist">
<li>She names it as one to know without the sheet.</li>
<li>The sheet does carry the line C<sub>p</sub> = {{frac:D<sub>B</sub>|V<sub>D</sub>}}, on page 1, left column.</li>
<li>Both hold: the line is on the sheet, and she still expects it known.</li>
</ul></td></tr>

<tr><td><b>Cockcroft-Gault</b>, the estimate of creatinine clearance CrCl, the measure of a patient's renal function<br>CrCl = {{frac:(140 &minus; age)(IBW)|72 &times; S<sub>Cr</sub>}}, &times; 0.85 if female; age in years, IBW the ideal body weight in kg, S<sub>Cr</sub> the serum creatinine in mg/dL</td>
<td><i>"this is an equation that I want you to know, to memorize. I've given you the equation sheet, this one is not there. You need to know this one, OK."</i> (09-14)</td>
<td>Module 4. Her answer must come out in mL/min: <i>"don't give me kilograms per milligram per deciliter. Milliliters per minute."</i> The equation sheet does not carry it.</td></tr>

<tr><td><b>Ideal body weight</b><br>male: 50 + 2.3 &times; (inches over 5 ft)<br>female: 45.5 + 2.3 &times; (inches over 5 ft)</td>
<td><i>"the ideal body weight, again, you need to know this one."</i> (09-14)</td>
<td>Module 4, as the IBW that feeds Cockcroft-Gault. She keeps the arithmetic simple on purpose: <i>"All of our patients are going to be 5 ft tall. And all, and we're just gonna use ideal body weight."</i> The equation sheet does not carry it.</td></tr>
</tbody></table>

<div class="note"><b>Four more lines on the equation sheet (Basic-Pharmacokinetics-Equations.pdf).</b>
<ul class="tlist">
<li>(1) Page 1, second line: C = C<sub>0</sub> &minus; k<sub>0</sub>t, the zero-order line (C<sub>0</sub> the starting concentration, k<sub>0</sub> the zero-order rate constant; zero order means the concentration falls by a constant amount per unit time, whatever amount is present).</li>
<li>(2) Page 1, directly under D<sub>L</sub> = {{frac:R|k}} (D<sub>L</sub> the loading dose, the bolus given with an infusion so the plateau level is reached at once): D<sub>L</sub> = C<sub>ss</sub>V<sub>D</sub>.</li>
<li>(3) Page 1, last line of the right column: C<sub>p</sub> after n oral doses, {{frac:Fk<sub>a</sub>D<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}}[({{frac:1 &minus; e<sup>&minus;nk&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}})e<sup>&minus;kt</sup> &minus; ({{frac:1 &minus; e<sup>&minus;nk<sub>a</sub>&tau;</sup>|1 &minus; e<sup>&minus;k<sub>a</sub>&tau;</sup>}})e<sup>&minus;k<sub>a</sub>t</sup>].</li>
<li>In (3), n is the number of the dose just given, k<sub>a</sub> the first-order absorption rate constant, &tau; the dosing interval, and t the time since the n-th dose.</li>
<li>(4) Page 2, directly under D<sub>IV</sub> = (Cl)(AUC<sub>IV</sub>): F<sub>abs</sub>D<sub>po</sub> = (Cl)(AUC<sub>po</sub>).</li>
<li>In (4), D<sub>IV</sub> and D<sub>po</sub> are the IV and the oral doses, and AUC<sub>IV</sub> and AUC<sub>po</sub> the areas under the concentration-time curve after each.</li>
<li>F<sub>abs</sub> is the absolute bioavailability: the fraction of the oral dose that reaches the circulation, measured against the IV dose.</li>
<li>None of the four is one of the five relations above.</li>
</ul></div>

<ul class="tlist">
<li>Three further half-life relations are kept apart from the five above, because she never said either way whether the sheet carries them.</li>
<li>None of the three is on the sheet.</li>
<li>The sheet's zero-order line is the concentration line C = C<sub>0</sub> &minus; k<sub>0</sub>t.</li>
<li>The only sheet line that solves for a half-life is the nonlinear one on page 2.</li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Relation</th><th style="width:26%">Source that states it</th><th>Status on the sheet</th></tr></thead><tbody>
<tr><td><b>Zero-order half-life</b><br>t&frac12; = {{frac:C<sub>0</sub>|2k}}</td><td>Introduction.pdf slide 19, printed</td><td>Not on the sheet. She never said whether it is supplied. It follows from the sheet's C = C<sub>0</sub> &minus; k<sub>0</sub>t by setting C to {{frac:C<sub>0</sub>|2}}.</td></tr>
<tr><td><b>Beta half-life</b><br>t&frac12;<sub>&beta;</sub> = {{frac:0.693|b}}</td><td>2IVBolusAdministration.pdf slide "Beta Half-life", printed</td><td>Not on the sheet. It is the first-order half-life relation applied to the slope b, so her carve-out for first-order half-life covers it: <i>"You take your 0.693 and you divide by lowercase b."</i></td></tr>
<tr><td><b>Absorption half-life</b><br>t&frac12;<sub>a</sub> = {{frac:0.693|k<sub>a</sub>}}</td><td>5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Kinetics of Absorption", printed</td><td>Not on the sheet. Same first-order half-life relation, applied to k<sub>a</sub>.</td></tr>
</tbody></table>

<h3>Units, and the conversions this course keeps needing</h3>
<p>Two of her standing deductions are about units, not pharmacokinetics:</p>
<ul class="tlist">
<li>Units: <i>"If there are units. Then you should give me units. OK, don't just give me a number. Because a milligram is very different than a microgram."</i></li>
<li>Leading decimals: <i>"There should never be a leading decimal &hellip; If you give me that as your final answer, you will lose half the points for this answer."</i></li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:26%">Parameter</th><th style="width:26%">Units she quotes it in</th><th>Notes from her own solutions</th></tr></thead><tbody>
<tr><td>Concentration: C or C<sub>p</sub> (in plasma), C<sub>0</sub> (at time zero), C<sub>ss</sub> (at steady state, the plateau where rate in equals rate out), C<sub>max</sub> (the peak)</td><td>mg/L, or mcg/mL</td><td><ul class="tlist">
<li>mg/L is the default in her worked answers.</li>
<li>Stems use mcg/mL about as often. She swaps the label mid-solution without comment, because the two are numerically equal.</li>
<li>mg/mL is kept for bulk-solution stability problems.</li>
</ul></td></tr>
<tr><td>Amount: D, D<sub>B</sub> (in the body), D<sub>0</sub> (the dose), D<sub>L</sub> (the loading dose), D<sub>u</sub> (excreted unchanged in urine)</td><td>mg</td><td>Micrograms appear in stems; she warns that 500 micrograms and 500 milligrams are different answers.</td></tr>
<tr><td>First-order rate constant (first order: rate of loss proportional to the amount remaining)<ul class="tlist">
<li>k overall elimination; k<sub>e</sub> excretion; k<sub>m</sub> metabolism; k<sub>a</sub> absorption</li>
<li>k<sub>12</sub> and k<sub>21</sub>: transfer from the central to the tissue compartment and back</li>
<li>a and b: the two slopes of a two-compartment curve</li>
</ul></td><td>reciprocal time, usually hr<sup>&minus;1</sup></td><td><ul class="tlist">
<li><i>"Is it time? One over time. We call that reciprocal time."</i></li>
<li>She writes k to four decimal places (0.0866, 0.1733, 0.1386, 0.2235).</li>
<li>She warns against rounding early: <i>"don't truncate that to 0.2 early on."</i></li>
<li>A rate constant is never negative.</li>
</ul></td></tr>
<tr><td>Zero-order rate constant k<sub>0</sub> (zero order: a constant amount or concentration lost per unit time, whatever is present)</td><td>amount/time or concentration/time, e.g. mg/mL per day</td><td><i>"our K for zero order processes is either going to be concentration per unit time. Or amount per unit time."</i></td></tr>
<tr><td>Half-life t&frac12;</td><td>time &mdash; hours, or days for the shelf-life problems</td><td><ul class="tlist">
<li>Flagged as a scored error: <i>"It is a time, so it is not days to the minus one. It is just days."</i></li>
<li>Half-life is the time required for the amount or concentration of a drug to decrease by one-half.</li>
<li>The most important word in the definition is <i>time</i>.</li>
</ul></td></tr>
<tr><td>Volume of distribution V<sub>D</sub>, the volume that relates the amount of drug in the body to the measured concentration; V<sub>p</sub> and V<sub>t</sub> the volumes of the central and the tissue compartment of a two-compartment drug</td><td>L (mL for compounding volumes)</td><td>She states it four ways:<ul class="tlist">
<li>absolute (16 L);</li>
<li>per kilogram (0.5 L/kg, 400 mL/kg);</li>
<li>as a percent of body weight (20%, 23.1%);</li>
<li>not at all, to be back-calculated from {{frac:D<sub>0</sub>|C<sub>0</sub>}} or from {{frac:Cl|k}}.</li>
</ul></td></tr>
<tr><td>Clearance, the volume of plasma cleared of drug per unit time: Cl<sub>T</sub> total, Cl<sub>R</sub> renal (kidney), Cl<sub>H</sub> hepatic (liver)</td><td>L/hr</td><td>Except creatinine clearance, which she requires in mL/min.</td></tr>
<tr><td>Infusion rate R</td><td>amount per time, usually mg/hr</td><td><i>"The units of r. Are going to be a mount. Per time. So most often milligrams per hour."</i> A parallel mL/hr or mL/min part appears whenever the stem supplies a solution concentration.</td></tr>
<tr><td>AUC, the area under the concentration-time curve</td><td>concentration &times; time, e.g. mcg&middot;hr/mL</td><td>Her own words on the units: <i>"Micrograms per mil times hour, kind of funky units."</i></td></tr>
<tr><td>Fraction of the dose excreted unchanged in urine f<sub>e</sub>; bioavailability F, the fraction of the dose that reaches the plasma</td><td>no units</td><td><i>"What are the units of FE? No units, right?"</i></td></tr>
<tr><td>Serum creatinine S<sub>Cr</sub></td><td>mg/dL</td><td>Asked and answered twice in one lecture: <i>"serum creatinine is gonna be um presented as milligrams per deciliter."</i></td></tr>
<tr><td>Creatinine clearance CrCl</td><td>mL/min</td><td><ul class="tlist">
<li>The Cockcroft-Gault expression is the formula that estimates CrCl from age, ideal body weight and serum creatinine.</li>
<li>It does not produce these units algebraically and she says so: <i>"if you're like me, I like for the units to cross off. The units don't cross off."</i></li>
<li>The answer is still reported in mL/min.</li>
</ul></td></tr>
</tbody></table>

<table class="reftab"><thead><tr>
<th style="width:34%">Conversion</th><th>Where it is used, and how she handles it</th></tr></thead><tbody>
<tr><td><b>mcg/mL = mg/L</b></td><td><ul class="tlist">
<li>She gives it to you so no exam time is spent on it: <i>"Milligrams per liter equals micrograms per mL &hellip; I don't want you to spend 10 minutes doing the conversion and then being off by a magnitude of 10."</i></li>
<li>Restated in the 09-09 review.</li>
<li>Either label is accepted for a concentration answer.</li>
</ul></td></tr>
<tr><td><b>minutes &rarr; hours</b> (divide by 60)</td><td><ul class="tlist">
<li>In the standard eight-part IV bolus battery (IV bolus: the whole dose put into a vein at one instant), 15 minutes becomes 0.25 hr without a shown step.</li>
<li>In the oral absorption examples, 45 minutes becomes 0.75 hr and 90 minutes becomes 1.5 hr.</li>
<li>Named as a common error (t<sub>max</sub> is the time of the peak concentration after an oral dose): <i>"when you are calculating um T max, do not forget to change your times to out to the same unit, usually hours."</i></li>
</ul></td></tr>
<tr><td><b>pounds &rarr; kilograms</b> (divide by 2.2)</td><td><ul class="tlist">
<li>She gives weight in pounds whenever she wants the conversion tested: 110 lb, 154 lb, 162 lb, 165 lb, 187 lb.</li>
<li>She always divides by 2.2 without showing the step.</li>
<li>Pounds and mg/kg dosing tend to appear together, so a wrong conversion makes the whole problem wrong.</li>
</ul></td></tr>
<tr><td><b>inches &rarr; centimetres</b> (1 inch = 2.54 cm)</td><td><ul class="tlist">
<li>Module 4 only, to reach ideal body weight from a height in centimetres: <i>"if you don't remember, 1 inch is equal to 2.54 centimetres &hellip; I am getting 64.96 inches. So, let's call that 65 inches."</i></li>
<li>She also expects the reverse: <i>"You should also know how to convert inches to centimetres and back and forth."</i></li>
</ul></td></tr>
<tr><td><b>inches over 5 ft</b> (5 ft = 60 inches)</td><td><ul class="tlist">
<li>The input to both ideal body weight formulas is height in inches minus 60.</li>
<li>For the 165 cm patient: 65 &minus; 60 = 5 inches over 5 ft.</li>
<li>She warns that students mishandle a fractional height: <i>"64.5 is like 64.5 inches tall. It's not 64 and then another 5 inches."</i></li>
</ul></td></tr>
<tr><td><b>percent of body weight &rarr; litres</b> (1 L is taken as 1 kg)</td><td><ul class="tlist">
<li>Printed on 2IVBolusAdministration.pdf slide "Volume of Distribution": <i>"a 1-L volume is assumed to be equal to the weight of 1 kg."</i></li>
<li>So V<sub>D</sub> at 20% of an 80 kg body weight is 16 L.</li>
<li>She insists on the unit: <i>"14 apples, 14 L, OK? Not 14 kg 14 L."</i></li>
</ul></td></tr>
</tbody></table>
<p class="sub">Grams to milligrams is not carried here. No stem, worked solution, slide or transcript line in these five modules states a dose or a concentration in grams, so there is no source for it.</p>

<h3>Module 1 &mdash; kinetic orders, half-life and AUC</h3>
<ul class="tlist">
<li>Zero order and first order are the pair most often confused, so they are set out together.</li>
<li>The 09-09 review names the one item guaranteed to appear: <i>"On this exam, I am going to give you a data set, and I expect you to figure out if it's zero or first."</i></li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>{{frac:dC|dt}} = &minus;k</b><br>C = C<sub>0</sub> &minus; kt</td>
<td>C, C<sub>0</sub> concentration (mg/mL, mg/L); k zero-order rate constant, amount or concentration per time (mg/mL per day); t time</td>
<td>Zero-order loss. The amount or concentration falls at a constant rate, independent of how much is present. A straight line on linear axes.</td>
<td>k<sub>0</sub> from two points, C<sub>0</sub> by back-extrapolation (extending the fitted straight line back to time zero and reading the intercept), time to a stated percent decomposed.</td>
<td>Yes, page 1, second line, written C = C<sub>0</sub> &minus; k<sub>0</sub>t.</td></tr>

<tr><td><b>{{frac:dC|dt}} = &minus;kC</b><br>ln C = ln C<sub>0</sub> &minus; kt &rarr; C = C<sub>0</sub>e<sup>&minus;kt</sup><br>log C = log C<sub>0</sub> &minus; {{frac:kt|2.3}} &rarr; C = C<sub>0</sub>10<sup>&minus;{{frac:kt|2.3}}</sup></td>
<td>Same symbols, but k is reciprocal time (hr<sup>&minus;1</sup>, day<sup>&minus;1</sup>). The 2.3 is the conversion between natural and base-10 logs: <i>"It's just a conversion factor to get you down to this natural log piece."</i></td>
<td>First-order loss. The rate is proportional to what remains, so the rate falls as concentration falls. A curve on linear axes and a straight line on semi-logarithmic axes (concentration on a base-10 log axis, time on an ordinary axis).</td>
<td>k from two points as {{frac:ln(C<sub>1</sub> &divide; C<sub>2</sub>)|&Delta;t}}; C<sub>0</sub> as C<sub>t</sub>e<sup>+kt</sup>; C at a stated time; time to a stated percent.</td>
<td>Yes &mdash; all three forms, twice: once in C and once in D.</td></tr>

<tr><td><b>D = D<sub>0</sub>e<sup>&minus;kt</sup></b><br>ln D = ln D<sub>0</sub> &minus; kt<br>log D = log D<sub>0</sub> &minus; {{frac:kt|2.3}}</td>
<td>D amount of drug remaining (mg); D<sub>0</sub> the dose (mg); k reciprocal time</td>
<td>The same first-order relation written in amount rather than concentration. She insists the two are not mixed: <i>"you gotta be apples to apples here &hellip; you can't do the 200 and the 15."</i></td>
<td><ul class="tlist">
<li>Amount in the body at a stated time.</li>
<li>She shows it both ways, as V<sub>D</sub>&middot;C<sub>t</sub> and as D<sub>0</sub>e<sup>&minus;kt</sup>.</li>
<li>V<sub>D</sub> is the apparent volume of distribution, the volume that relates the amount of drug in the body to the measured concentration; C<sub>t</sub> the concentration at time t.</li>
</ul></td>
<td>Yes, all three forms.</td></tr>

<tr><td><b>t&frac12; = {{frac:C<sub>0</sub>|2k}}</b></td>
<td>C<sub>0</sub> starting concentration; k zero-order rate constant; result in time, the half-life being the time required for the amount or concentration to decrease by one-half</td>
<td>Zero order only. It depends on C<sub>0</sub>, so it is not a fixed property of the drug: start lower and the half-life is shorter.</td>
<td>Asked beside the first-order half-life on the same data, in her paired stem <i>"Assuming first-order kinetics &hellip; Assuming zero-order kinetics &hellip;"</i></td>
<td>No; she never said either way. It follows from C = C<sub>0</sub> &minus; k<sub>0</sub>t with C = {{frac:C<sub>0</sub>|2}}.</td></tr>

<tr><td><b>t&frac12; = {{frac:0.693|k}}</b></td>
<td>k first-order elimination rate constant (hr<sup>&minus;1</sup>); result in time, never reciprocal time</td>
<td>First order only. Constant at every concentration, because <i>"a constant divided by a constant is A constant."</i></td>
<td>Asked in essentially every problem, usually as part a or b. Also run backwards to get k from a stated half-life.</td>
<td>No &mdash; named by her four times (08-19, 08-24, 08-26, 09-09).</td></tr>

<tr><td><b>AUC (area under the concentration-time curve) over one segment</b><br>{{frac:C<sub>n&minus;1</sub> + C<sub>n</sub>|2}} &times; (t<sub>n</sub> &minus; t<sub>n&minus;1</sub>)</td>
<td>C<sub>n&minus;1</sub>, C<sub>n</sub> the two concentrations bounding the segment; t in hours; result in concentration &times; time</td>
<td>Any concentration-time data set, any route. The total AUC is the sum of the segments. She reduces the printed formula to <i>"one half base times height."</i></td>
<td>AUC between two stated hours, from a table.</td>
<td>Yes, page 1, first line.</td></tr>

<tr><td><b>F = {{frac:AUC<sub>oral</sub>|AUC<sub>IV</sub>}}</b></td>
<td>F fraction of the oral dose reaching plasma, no units</td>
<td>Comparing two routes. Printed on Introduction.pdf slide 23 in this bare form; the equation sheet carries the dose-corrected version, F = {{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}}{{frac:D<sub>IV</sub>|D<sub>po</sub>}}, with D<sub>IV</sub> and D<sub>po</sub> the IV and the oral (po) doses.</td>
<td>Bioavailability, Module 7a. She asks the dose-corrected form; with equal doses it reduces to this bare ratio.</td>
<td>Yes, in the dose-corrected form.</td></tr>
</tbody></table>

<p><b>What separates the two orders</b>, in her own terms:</p>
<ul class="tlist">
<li>Zero order: <i>"rate is independent of the concentration &hellip; While half-life is dependent"</i>.</li>
<li>First order: <i>"the rate depends on the rate constant K times the concentration &hellip; At higher concentrations, we have a faster rate."</i></li>
<li>In each order, the half-life behaves the opposite way round from the rate.</li>
<li>She names the axis as a common error: <i>"even if the scale does not say log C, if you look at that scale and you see that &hellip; it's increasing by a func- uh, a function of 10, then that tells you that it is a logarithmic scale. So, don't just look at that straight line and assume &hellip; that it is zero order."</i></li>
</ul>

<h3>Module 2 &mdash; IV bolus, one and multi-compartment</h3>
<ul class="tlist">
<li>When a stem says "IV bolus", she expects this equation: <i>"if I tell you that we are administering a drug via IV bolus injection. Then you should think. Whichever form of this equation you like."</i></li>
<li>Input is instantaneous and elimination is first order (the rate of loss is proportional to the amount of drug remaining).</li>
<li>She must tell you the compartment count: <i>"I have to tell you that it follows a one compartment model or a two compartment."</i></li>
<li>One compartment: the body acts like a single, uniform compartment. Two compartments: a central compartment exchanging drug with a tissue compartment, so the semi-log curve bends.</li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>C<sub>p</sub> = {{frac:D<sub>B</sub>|V<sub>D</sub>}}</b></td>
<td>C<sub>p</sub> plasma concentration (mg/L); D<sub>B</sub> amount of drug in the body at that time (mg); V<sub>D</sub> apparent volume of distribution (L)</td>
<td>One compartment, at any time. At time zero D<sub>B</sub> is the dose and C<sub>p</sub> is C<sub>0</sub>, which gives V<sub>D</sub> = {{frac:D<sub>0</sub>|C<sub>0</sub>}}.</td>
<td>V<sub>D</sub>, or the amount in the body from a measured concentration.</td>
<td>Yes &mdash; and she also names it as one to hold without the sheet. Both readings stand.</td></tr>

<tr><td><b>k = k<sub>m</sub> + k<sub>e</sub></b></td>
<td>k overall elimination rate constant; k<sub>m</sub> rate constant for metabolism; k<sub>e</sub> rate constant for excretion. All reciprocal time.</td>
<td>Any first-order elimination. <i>"If you see K with no subscript, that is our overall rate constant for elimination. So, all the process is wrapped up into there."</i></td>
<td>Rarely the unknown directly; it fixes what an unsubscripted k means.</td>
<td>No.</td></tr>

<tr><td><b>{{frac:dD<sub>B</sub>|dt}} = &minus;kD<sub>B</sub></b><br>C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup><br>ln C<sub>p</sub> = ln C<sub>p</sub><sup>0</sup> &minus; kt<br>log C<sub>p</sub> = log C<sub>p</sub><sup>0</sup> &minus; {{frac:kt|2.3}}</td>
<td>C<sub>p</sub><sup>0</sup> the concentration extrapolated back to time zero (mg/L); k hr<sup>&minus;1</sup></td>
<td>One compartment, IV bolus, first-order elimination. The deck marks the natural-log form as the one she prefers.</td>
<td><ul class="tlist">
<li>k from two plasma points; C<sub>0</sub> by back-extrapolation; C at a stated time; time to 99.9% eliminated.</li>
<li>She warns that C<sub>0</sub> must exceed every sampled point.</li>
<li>She warns that the exponent sign flips when solving backwards.</li>
</ul></td>
<td>Yes.</td></tr>

<tr><td><b>Cl<sub>T</sub> = k &times; V<sub>D</sub></b><br><b>Cl = {{frac:D<sub>0</sub>|AUC<sub>0&rarr;&infin;</sub>}}</b></td>
<td>Cl<sub>T</sub> total body clearance (L/hr); k hr<sup>&minus;1</sup>; V<sub>D</sub> L; D<sub>0</sub> dose (mg); AUC the area under the concentration-time curve from zero to infinity, in mg&middot;hr/L</td>
<td>First-order elimination. Clearance is the volume of plasma cleared of drug per unit time, and it is a constant: <i>"a constant times a constant is a constant."</i> Changing the concentration does not change it.</td>
<td>Cl<sub>T</sub> as part f of her standard battery; and Cl as the bridge from dose to exposure.</td>
<td>Cl = kV<sub>D</sub>: no, named by her. Cl = {{frac:FD<sub>0</sub>|AUC}} (F the bioavailability, the fraction of the dose reaching the plasma, 1 for IV): yes, page 1.</td></tr>

<tr><td><b>t&frac12; = {{frac:0.693 V<sub>D</sub>|Cl<sub>T</sub>}}</b></td>
<td>Half-life in time, from V<sub>D</sub> in L and Cl<sub>T</sub> in L/hr</td>
<td>The two relations above combined, printed on 4---Clearance-and-Elimination.pdf slide 21. It says which way a half-life moves when clearance falls and volume does not.</td>
<td>The new half-life in renal failure, where clearance drops and V<sub>D</sub> is unchanged.</td>
<td>No. It is Cl = kV<sub>D</sub> and t&frac12; = {{frac:0.693|k}} combined, and both of those are hers to supply.</td></tr>

<tr><td><b>C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup></b><br>C<sub>p</sub><sup>0</sup> = A + B</td>
<td>A, B intercepts in concentration units (mg/L or mcg/mL); a (alpha) and b (beta) slopes in reciprocal time. <i>"Our A and our B are our intercepts &hellip; our lowercase A and B are the slopes."</i></td>
<td><ul class="tlist">
<li>Two-compartment, IV bolus.</li>
<li>Alpha is the larger, because <i>"the distribution phase is gonna happen a lot faster than an elimination phase."</i></li>
<li>She gives A, B, alpha and beta rather than asking for feathering (the method of residuals: subtracting the back-extrapolated terminal line from the observed data to obtain the early slope): <i>"I am pretty much gonna give you A, B, alpha, beta."</i></li>
</ul></td>
<td>Concentration at a stated time; C<sub>0</sub> as A + B.</td>
<td>C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup>: yes, page 1. C<sub>p</sub><sup>0</sup> = A + B is not printed; it is the same line at t = 0.</td></tr>

<tr><td><b>t&frac12;<sub>&beta;</sub> = {{frac:0.693|b}}</b></td>
<td>b the terminal slope, hr<sup>&minus;1</sup>; result in time</td>
<td><ul class="tlist">
<li>Two compartment.</li>
<li>The distribution half-life is not asked: <i>"we don't really care about the half-life of the distribution phase. We care about the half-life of the elimination phase."</i></li>
<li>She names the quantity explicitly on the paper, so there is no ambiguity.</li>
</ul></td>
<td>The elimination half-life. She warns against the long route: <i>"Don't solve for K and then 0.693 over K. You've, you've done too much work."</i></td>
<td>No; covered by her first-order half-life carve-out.</td></tr>

<tr><td><b>k = {{frac:(A + B)ab|Ab + Ba}}</b><br><b>k<sub>12</sub> = {{frac:AB(b &minus; a)<sup>2</sup>|(A + B)(Ab + Ba)}}</b><br><b>k<sub>21</sub> = {{frac:Ab + Ba|A + B}}</b></td>
<td>k overall elimination from the central compartment; k<sub>12</sub> transfer central to tissue; k<sub>21</sub> transfer tissue to central. All reciprocal time.</td>
<td>Two-compartment IV bolus, model A: drug moves to and from the tissue compartment and leaves the body from the central compartment only.</td>
<td>Read straight off the given A, B, alpha, beta. Her in-class sheet asked for all three: k 0.272 hr<sup>&minus;1</sup>, k<sub>12</sub> 1.1 hr<sup>&minus;1</sup>, k<sub>21</sub> 0.9 hr<sup>&minus;1</sup>.</td>
<td>Yes, all three.</td></tr>

<tr><td><b>V<sub>p</sub> = {{frac:D<sub>0</sub>|A + B}}</b><br><b>V<sub>p</sub> = {{frac:D<sub>0</sub>|k &times; AUC<sub>0&rarr;&infin;</sub>}}</b><br><b>V<sub>t</sub> = {{frac:V<sub>p</sub>k<sub>12</sub>|k<sub>21</sub>}}</b></td>
<td>V<sub>p</sub> volume of the central compartment (L); V<sub>t</sub> volume of the tissue compartment (L)</td>
<td>Two compartment. The two routes to V<sub>p</sub> answer different data: use the intercepts when A and B are supplied, the second when a dose and an AUC are supplied.</td>
<td>The volume of distribution of the central compartment, by dose divided by A + B.</td>
<td>Yes, all three. The AUC form prints a plain k: V<sub>p</sub> = {{frac:D<sub>0</sub>|k[AUC]<sub>0</sub><sup>&infin;</sup>}}.</td></tr>
</tbody></table>

<p><b>Reading a semi-log graph</b> (concentration on a base-10 log axis, time on an ordinary axis), as she will ask it on the exam:</p>
<ul class="tlist">
<li>A single straight line is one compartment.</li>
<li>A line with a steeper early segment above it is two compartments.</li>
<li><i>"if I give you a graph &hellip; just a log scale &hellip; and I just give you a, a line that looks like this one, the black line. That should say to you that this is a two compartment model. If I gave you a graph on a log scale that looks just like the blue line all by itself, that tells you it's an IV bolus dose one compartment model."</i></li>
</ul>

<h3>Module 3 &mdash; IV infusion, steady state and loading dose</h3>
<ul class="tlist">
<li>The input changes and nothing else does: <i>"the only thing we've changed here, we haven't changed the drug, we've changed the manner that we put the drug in the body."</i></li>
<li>A constant rate in is zero order; elimination out stays first order (a rate proportional to the amount of drug remaining).</li>
<li><i>"Our input is zero order, constant in, first order out. When we stop the in, then it's just out."</i></li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>C<sub>ss</sub> = {{frac:R|Cl}} = {{frac:R|kV<sub>D</sub>}}</b></td>
<td>C<sub>ss</sub> steady-state concentration (mg/L); R infusion rate (mg/hr); Cl clearance, the volume of plasma cleared of drug per unit time (L/hr); k the first-order elimination rate constant (hr<sup>&minus;1</sup>); V<sub>D</sub> the apparent volume of distribution (L)</td>
<td>At steady state only, where rate in equals rate out. It never contains t, so it says nothing about when steady state arrives.</td>
<td>C<sub>ss</sub> from a rate, or, rearranged, the rate R = C<sub>ss</sub>&middot;Cl needed to reach a target C<sub>ss</sub>. Her recommendation stems ask for the rate.</td>
<td>Yes, as C<sub>ss</sub> = {{frac:R|Cl}}.</td></tr>

<tr><td><b>C<sub>p</sub> = {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>)</b></td>
<td>Same symbols plus t, the time since the infusion started (hr)</td>
<td>During an infusion, before steady state. She splits it in two out loud: the first factor is C<sub>ss</sub>, and <i>"this 1 minus E to the minus KT tells us what fraction of steady state we've achieved."</i></td>
<td>Concentration at a stated time into the infusion; concentration at the end of a stated infusion; and, rearranged, the time to a stated percentage of C<sub>ss</sub>.</td>
<td>Yes.</td></tr>

<tr><td><b>C<sub>p</sub> = C<sub>peak</sub>e<sup>&minus;kt</sup></b></td>
<td>C<sub>peak</sub> the concentration at the moment the infusion stopped (mg/L); t time since cessation (hr)</td>
<td>After cessation. No more input, so this is the ordinary first-order bolus decay with a new starting point: <i>"Think of that C peak as your C0 as your starting point."</i></td>
<td>Concentration a stated number of hours after cessation. C<sub>peak</sub> is C<sub>ss</sub> only if the infusion actually ran to steady state; otherwise it must be computed from the line above.</td>
<td>Yes, as the first-order C block.</td></tr>

<tr><td><b>D<sub>L</sub> = {{frac:R|k}}</b><br><b>D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub></b></td>
<td>D<sub>L</sub> loading dose (mg); R mg/hr; k hr<sup>&minus;1</sup>; V<sub>D</sub> L</td>
<td><ul class="tlist">
<li>An IV bolus (the whole dose put into a vein at one instant) given at the same moment an infusion starts.</li>
<li><i>"We want the loading dose to look like the amount of drug that's in the body at steady state."</i></li>
<li>The first form is only as good as the rate already chosen: <i>"If you just pick a number out of the air, then you're probably not gonna pick the the best loading dose."</i></li>
</ul></td>
<td>The loading dose. She prints both routes side by side whenever both inputs are available.</td>
<td>D<sub>L</sub> = {{frac:R|k}}: yes. D<sub>L</sub> = C<sub>ss</sub>V<sub>D</sub>: yes, page 1, directly under it.</td></tr>

<tr><td><b>C<sub>p</sub> = {{frac:D<sub>L</sub>|V<sub>D</sub>}}e<sup>&minus;kt</sup> + <span class="nw">{{frac:R|kV<sub>D</sub>}}(1 &minus; e<sup>&minus;kt</sup>)</span></b></td>
<td>Both terms in mg/L; t measured from the start of therapy</td>
<td>Loading dose and infusion running together. The two contributions are added: <i>"at any point on the curve, then the concentration here plus the concentration here should equal the concentration there."</i></td>
<td>Concentration at 2, 4 or 6 hours after the start of combined therapy. If D<sub>L</sub> was chosen correctly the sum stays flat at C<sub>ss</sub>.</td>
<td>No, not as one line. The deck prints the two-term sum; the sheet carries the terms separately, C = C<sub>0</sub>e<sup>&minus;kt</sup> and C<sub>p</sub> = {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>).</td></tr>
</tbody></table>

<p><b>Percent of steady state reached, per half-life of infusion.</b></p>
<ul class="tlist">
<li>The half-life t&frac12; = {{frac:0.693|k}} is the time for the concentration to fall by one-half.</li>
<li>Built live in the 09-02 lecture from 1 &minus; e<sup>&minus;0.693n</sup>, n the number of half-lives elapsed.</li>
<li>The same numbers run the other way for the percent eliminated after an IV bolus.</li>
</ul>

<table class="reftab"><thead><tr>
<th>Half-lives elapsed</th><th>Percent of C<sub>ss</sub> reached (infusion)</th><th>Percent eliminated (bolus)</th><th>Source</th></tr></thead><tbody>
<tr><td>1</td><td>50%</td><td>50%</td><td>Slide annotation and transcript, both lectures</td></tr>
<tr><td>2</td><td>75%</td><td>75%</td><td>Slide annotation and transcript, both lectures</td></tr>
<tr><td>3</td><td>87.5%</td><td>87.5%</td><td>Slide annotation and transcript, both lectures</td></tr>
<tr><td>4</td><td>93.75%</td><td>&mdash;</td><td>Computed: 1 &minus; 0.5<sup>4</sup> = 93.75%. Her spoken values differ: 93.25% on 09-02 and "93" in the 09-09 review. No slide carries a fourth row.</td></tr>
<tr><td>10</td><td>99.9%</td><td>99.9%</td><td>Transcript, both lectures: <i>"it's gonna take 10 half-lives for 99.9% of the drug to be eliminated"</i> and <i>"10 half-lives, we're at 99.9% of the steady-state concentration."</i></td></tr>
<tr><td>11</td><td>99.95%</td><td>&mdash;</td><td>Computed: 1 &minus; 0.5<sup>11</sup> = 99.95%. Transcript 09-02 says 99.99: <i>"10 gets us 99.9, 11 gets us 99.99."</i></td></tr>
</tbody></table>

<p><b>Time to steady state.</b> Two non-integer multiples appear in her worked solutions:</p>
<ul class="tlist">
<li><b>3.32 half-lives reaches 90%</b> of C<sub>ss</sub> (09-02). She offered it as her own shortcut; it is not required.</li>
<li><b>4.32 half-lives reaches 95%</b> of C<sub>ss</sub>. This is the route in her printed solution to the renal-failure part of IV Infusions Practice 3.</li>
<li>Her short answer to "how long to steady state" is fixed: <i>"3 to 5 half-lives, OK?"</i></li>
<li>The infusion rate does not change that time: <i>"if you get a question that says, 'Increasing the rate of infusion will decrease or ha- double or do whatever funkiness to the time that it takes to get to steady state,' we are clear that it has no impact, right? Because it is three to five half-lives. Depends on the half-life, that rate constant K."</i></li>
<li>Raising R raises C<sub>ss</sub> in proportion and shifts the whole curve upward; the plateau still arrives at the same time.</li>
</ul>

<h3>Module 4 &mdash; elimination, clearance and renal clearance</h3>
<p>Elimination includes excretion and biotransformation, and she keeps the three words distinct:</p>
<ul class="tlist">
<li>Elimination is <i>"all the irreversible processes or irreversible removal of drugs by all routes"</i>.</li>
<li>Excretion is <i>"removal of intact drug or metabolite"</i>.</li>
<li>Biotransformation is <i>"chemically converting that um drug in the body to some metabolite."</i></li>
<li>The kidney and the liver are the two major elimination organs.</li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>Rate of elimination = Cl &times; C<sub>p</sub></b></td>
<td>Rate in amount per time (mcg/min, mg/hr); Cl in volume per time; C<sub>p</sub> in amount per volume</td>
<td>First-order elimination, any route. Clearance is the proportionality factor between the elimination rate and the plasma concentration, which is why clearance stays constant while the rate does not.</td>
<td>The elimination rate at a stated plasma concentration. Her worked example: 15 mL/min &times; 5 mcg/mL = 75 mcg/min.</td>
<td>Yes.</td></tr>

<tr><td><b>Cl = {{frac:FD<sub>0</sub>|AUC<sub>0&rarr;&infin;</sub>}}</b></td>
<td>F bioavailability factor, no units, taken as 1 for an IV dose; D<sub>0</sub> dose (mg); AUC the area under the concentration-time curve from zero to infinity, in mg&middot;hr/L</td>
<td>Any route, provided F is known. <i>"Another reason that we like clearance. Is that it directly relates the dose to that area under the curve."</i></td>
<td>Clearance from an AUC, or a dose from a clearance and an AUC.</td>
<td>Yes, and also as D<sub>IV</sub> = (Cl)(AUC<sub>IV</sub>) on page 2.</td></tr>

<tr><td><b>Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub></b></td>
<td>All in L/hr. An unsubscripted Cl means total body clearance.</td>
<td>Clearances add. Renal and hepatic are named as the two main routes on the deck slide.</td>
<td>Hepatic clearance, by subtraction. There is no direct measurement: <i>"we're not gonna sample the liver &hellip; we calculate renal &hellip; and then we subtract renal from total to give us hepatic clearance."</i></td>
<td>Yes, page 1, right column.</td></tr>

<tr><td><b>f<sub>e</sub> = {{frac:D<sub>u</sub><sup>&infin;</sup>|FD<sub>0</sub>}} = {{frac:k<sub>e</sub>|k}}</b><br>so k<sub>e</sub> = f<sub>e</sub>k</td>
<td>f<sub>e</sub> fraction excreted unchanged, no units; D<sub>u</sub><sup>&infin;</sup> cumulative amount of unchanged drug recovered in urine (mg); k<sub>e</sub> excretion rate constant (hr<sup>&minus;1</sup>); k the overall elimination rate constant, all routes together (hr<sup>&minus;1</sup>)</td>
<td>A complete urine collection. Lower-case f<sub>e</sub> is the fraction excreted; capital F is bioavailability. They are different quantities that share a letter.</td>
<td><ul class="tlist">
<li>f<sub>e</sub> from a urine recovery, then k<sub>e</sub> from f<sub>e</sub> and k.</li>
<li>Her worked example: 300 mg recovered from a 500 mg IV dose gives f<sub>e</sub> = {{frac:300|500}} = 0.6.</li>
<li>The stated half-life of 8 hr gives k = {{frac:0.693|8 hr}} = 0.0866 hr<sup>&minus;1</sup>, and k<sub>e</sub> = 0.6 &times; 0.0866 = 0.052 hr<sup>&minus;1</sup>.</li>
</ul></td>
<td>Yes.</td></tr>

<tr><td><b>Cl<sub>R</sub> = f<sub>e</sub>Cl<sub>T</sub></b><br><b>Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub></b><br><b>Cl<sub>H</sub> = Cl<sub>T</sub> &minus; Cl<sub>R</sub></b></td>
<td>All clearances in L/hr; f<sub>e</sub> dimensionless</td>
<td>Splitting a total clearance into its renal and hepatic parts, once f<sub>e</sub> is known. The two hepatic forms are the same statement.</td>
<td>Cl<sub>R</sub> and Cl<sub>H</sub>, as the closing parts of her five-part clearance problem.</td>
<td>Yes, all three.</td></tr>

<tr><td><b>CrCl = {{frac:(140 &minus; age)(IBW)|72 &times; S<sub>Cr</sub>}}</b><br>&times; 0.85 if female</td>
<td>age in years; IBW ideal body weight in kg; S<sub>Cr</sub> serum creatinine in mg/dL; answer reported in mL/min</td>
<td><ul class="tlist">
<li>Estimating a patient's renal function.</li>
<li>Normal on the deck slide is 120&ndash;130 mL/min.</li>
<li>The 0.85 factor rests on an assumption she states: <i>"The assumption is that women are smaller than men, less muscular than men."</i></li>
</ul></td>
<td><ul class="tlist">
<li>CrCl for a patient vignette, then whether the patient's renal function is reduced.</li>
<li>Her worked example: a 45-year-old female, 165 cm (65 inches, so IBW = 45.5 + 2.3 &times; 5 = 57 kg), S<sub>Cr</sub> 1.1 mg/dL gives {{frac:(140 &minus; 45)(57)|72 &times; 1.1}} &times; 0.85 = 58 mL/min.</li>
<li>The stated actual weight of 61 kg is deliberately unused.</li>
</ul></td>
<td>No &mdash; named by her.</td></tr>

<tr><td><b>IBW male = 50 + 2.3 &times; (inches over 5 ft)</b><br><b>IBW female = 45.5 + 2.3 &times; (inches over 5 ft)</b></td>
<td>Result in kg; the bracket is height in inches minus 60</td>
<td>All patients in this course are 5 ft or taller, and ideal body weight is always the weight used. No adjusted or actual body weight decision will be asked.</td>
<td>The IBW that feeds Cockcroft-Gault. Her worked example: a female 65 inches tall gives 45.5 + 2.3(5) = 57 kg.</td>
<td>No &mdash; named by her.</td></tr>

<tr><td><b>pH = pKa + log {{frac:ionized|nonionized}}</b><br><b>pH = pKa + log {{frac:nonionized|ionized}}</b></td>
<td>pKa of the drug, the pH at which its ionized (charged) and nonionized (uncharged) forms are present in equal amounts; weak acids have pKa values 3&ndash;8 and weak bases 7.5&ndash;10.5, per the slide</td>
<td>Reabsorption (drug moving from the urine in the renal tubule back into the blood) of weak acids and weak bases, which depends on urine pH and on the drug's pKa.</td>
<td>Nothing yet. She posed the two questions and the recording ends mid-answer.</td>
<td><ul class="tlist">
<li>Both forms are printed on 4---Clearance-and-Elimination.pdf slide 20.</li>
<li>Weak acids (pK<sub>a</sub> 3 to 8): pH = pK<sub>a</sub> + log({{frac:ionized|nonionized}}).</li>
<li>Weak bases (pK<sub>a</sub> 7.5 to 10.5): pH = pK<sub>a</sub> + log({{frac:nonionized|ionized}}).</li>
</ul></td></tr>
</tbody></table>

<p><b>The three renal mechanisms, and the 120 mL/min rule.</b></p>
<ul class="tlist">
<li>Renal clearance is the net result of glomerular filtration, active tubular secretion and tubular reabsorption.</li>
<li>Filtration is passive diffusion across the glomerulus and averages 120 mL/min.</li>
<li>Filtration and secretion both add drug to the tubular lumen; reabsorption moves drug back into the blood.</li>
<li>So a renal clearance above 120 mL/min means secretion is contributing on top of filtration.</li>
<li>A renal clearance below 120 mL/min means some drug is being reabsorbed.</li>
<li>Her tolerance around the number: <i>"And I'm saying 120. If it's 119, 121, OK, let's call that filtration. If it's 250, then let's assume that we've got some active secretion going on."</i></li>
</ul>

<h3>Module 5 &mdash; oral absorption, single dose</h3>
<ul class="tlist">
<li>The third input type: <i>"we have not had 1st order input, OK? It's all been either instantaneous or zero order &hellip; today we will talk about The kinetics of following oral administration."</i></li>
<li>First order in and first order out (each rate proportional to the amount of drug remaining at its source), so the curve rises to a peak and then falls.</li>
<li>A curve with a peak means oral input: <i>"if I give you a curve on the exam and it looks like this &hellip; where there is a clear peak &hellip; I want you to identify that as an oral input."</i></li>
<li>A capital F in a stem is the signal: <i>"when you see a capital F, You should think oral."</i></li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>C<sub>p</sub> = {{frac:Fk<sub>a</sub>D<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}} &times; <span class="nw">(e<sup>&minus;kt</sup> &minus; e<sup>&minus;k<sub>a</sub>t</sup>)</span></b></td>
<td>F oral bioavailability fraction, no units; k<sub>a</sub> first-order absorption rate constant (hr<sup>&minus;1</sup>); k elimination rate constant (hr<sup>&minus;1</sup>); D<sub>0</sub> oral dose (mg); V<sub>D</sub> (L); C<sub>p</sub> (mg/L or mcg/mL)</td>
<td><ul class="tlist">
<li>Single oral dose, one compartment (the body treated as a single, uniform compartment), first-order absorption and first-order elimination.</li>
<li>The bracket is drug in minus drug out.</li>
<li>The lumped prefactor is <b>not</b> C<sub>0</sub>, the concentration at time zero that an IV bolus would give: <i>"this big portion right here does not represent C0."</i></li>
</ul></td>
<td><ul class="tlist">
<li>Concentration at any stated time; C<sub>max</sub>, the peak concentration, once t<sub>max</sub>, the time of that peak, is known; and, rearranged, V<sub>D</sub> back-solved from a given prefactor.</li>
<li>Named error: <i>"Do not forget the volume of distribution."</i></li>
</ul></td>
<td>Yes, page 1.</td></tr>

<tr><td><b>t<sub>max</sub> = {{frac:ln(k<sub>a</sub> &divide; k)|k<sub>a</sub> &minus; k}}</b></td>
<td>Both rate constants in the same reciprocal time unit; result in time</td>
<td><ul class="tlist">
<li>Single oral dose.</li>
<li>It contains no dose and no volume, so t<sub>max</sub> depends only on the two rate constants: <i>"T-Max depends solely on the relationship between K and KA."</i></li>
<li>Doubling the dose does not move it.</li>
</ul></td>
<td><ul class="tlist">
<li>t<sub>max</sub>, always, and always before C<sub>max</sub>: <i>"if you are asked for C-Max, and I will ask you for CMax, you must find TMax first."</i></li>
<li>Named errors: mixing time units, and using a half-life where a rate constant belongs.</li>
</ul></td>
<td>Yes, page 1.</td></tr>

<tr><td><b>t&frac12;<sub>a</sub> = {{frac:0.693|k<sub>a</sub>}}</b></td>
<td>k<sub>a</sub> hr<sup>&minus;1</sup>; result in time</td>
<td><ul class="tlist">
<li>The absorption half-life (a half-life is the time for an amount or concentration to decrease by one-half; this one belongs to the absorption rate constant k<sub>a</sub>). It is the usual way k<sub>a</sub> is given.</li>
<li>Stems say "half-life of absorption is 45 minutes"; the first step is the conversion, 45 minutes = 0.75 hr, then k<sub>a</sub> = {{frac:0.693|0.75}} = 0.924 hr<sup>&minus;1</sup>.</li>
</ul></td>
<td><ul class="tlist">
<li>k<sub>a</sub> from a stated absorption half-life, or the absorption half-life from a k<sub>a</sub> read off a given equation.</li>
<li>An unqualified t&frac12; means elimination: <i>"If it's just T1/2, then your assumption is that I'm looking for the half-life of elimination."</i></li>
</ul></td>
<td>No; covered by her first-order half-life carve-out.</td></tr>

<tr><td><b>C<sub>max</sub></b>: substitute t<sub>max</sub> into the C<sub>p</sub> equation above</td>
<td>Result in mg/L or mcg/mL</td>
<td><ul class="tlist">
<li>Single oral dose.</li>
<li>Neither the deck nor the sheet has a separate single-dose C<sub>max</sub> expression for this module.</li>
<li>The sheet's standalone C<sub>max</sub> forms all carry a dosing interval and belong to multiple dosing.</li>
</ul></td>
<td>C<sub>max</sub>, in every worked example. Her values: 12.17 mg/L, 55.4 mg/L, about 13 mg/L, 12.14 mcg/mL.</td>
<td>By substitution only.</td></tr>
</tbody></table>

<p><b>What moves when a parameter changes</b>, in her own summary:</p>
<ul class="tlist">
<li>Increasing the <b>dose</b>: C<sub>max</sub> and AUC (the area under the concentration-time curve) rise in proportion, and t<sub>max</sub> does not move.</li>
<li>With a larger dose, the absorption and elimination rates rise because more drug is present; k and k<sub>a</sub> are unchanged.</li>
<li>Increasing <b>k<sub>a</sub></b> relative to k: C<sub>max</sub> is higher, t<sub>max</sub> is earlier, and AUC is relatively unchanged, because <i>"if we're just changing KA we're not changing the clearance at all."</i></li>
<li>Increasing <b>k</b>: C<sub>max</sub> is lower, t<sub>max</sub> is earlier, and AUC falls, because <i>"if we change the K, we are effectively changing the clearance."</i></li>
<li>She notes that the AUC claim for varying k<sub>a</sub> comes from the textbook table, not from the slide graph.</li>
</ul>

<p><b>Which process sets the terminal slope.</b></p>
<ul class="tlist">
<li>Disposition rate limiting is the usual case.</li>
<li>In it, the absorption half-life is much shorter than the elimination half-life, so k<sub>a</sub> is much larger than k and the tail of the curve falls with k.</li>
<li>Absorption rate limiting is the other case: the absorption half-life is the longer one.</li>
<li>A modified-release oral product that releases at a constant rate is zero-order in (a constant amount per unit time) and first-order out.</li>
<li>That is the shape of an IV infusion, not of an ordinary oral dose. It is her reason for the word "usually" on the summary slide.</li>
</ul>

<h3>Module 6 &mdash; multiple dosing: repeated IV bolus</h3>
<ul class="tlist">
<li>The same dose is given as an IV bolus (the whole dose put into a vein at one instant) at the same interval &tau;.</li>
<li>Each dose is added to what is left of the doses before it, so the peaks and troughs climb to a plateau: steady state.</li>
<li>The plateau arrives in 3 to 5 half-lives (a half-life is the time for the concentration to fall by one-half), whatever the dose: <i>"not 3 to 5 doses, 3 to 5 half-lives."</i></li>
<li>Superposition, the principle that the concentrations from separate doses add, assumes first-order (linear) elimination, a rate of loss proportional to the amount remaining, and pharmacokinetics that later doses do not change.</li>
<li>So each dose follows the first-dose curve, and the only difference at steady state is the accumulated drug.</li>
<li>The &infin; sign means steady state.</li>
<li>&tau; is the interval, not the frequency: TID, three times a day, is &tau; = 8 hr.</li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>D<sub>B</sub> = D<sub>0</sub>e<sup>&minus;k&tau;</sup></b></td>
<td>D<sub>B</sub> the amount of drug in the body (mg); D<sub>0</sub> the dose (mg); k the first-order elimination rate constant (hr<sup>&minus;1</sup>); &tau; the dosing interval (hr)</td>
<td>One IV bolus. {{frac:D<sub>B</sub>|D<sub>0</sub>}} = e<sup>&minus;k&tau;</sup> is the fraction of the dose still in the body when the next dose is due.</td>
<td>The fraction left, which is what accumulates.</td>
<td>Not with &tau; written in. The sheet's D = D<sub>0</sub>e<sup>&minus;kt</sup> (page 1) is the same relation with t = &tau;.</td></tr>

<tr><td><b>C<sub>max</sub><sup>&infin;</sup> = {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}</b> &nbsp; and &nbsp; <b>D<sub>max</sub><sup>&infin;</sup> = {{frac:D<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}</b></td>
<td>C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}, the first-dose peak (mg/L); V<sub>D</sub> the apparent volume of distribution (L)</td>
<td>Repeated IV bolus at steady state. {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} is the accumulation factor: <i>"that tells us how much drug is accumulated in the body at steady state."</i></td>
<td>The steady-state peak. Her check: it must be greater than C<sub>0</sub>.</td>
<td>Yes, in the sheet's multiple-dosing group.</td></tr>

<tr><td><b>C<sub>min</sub><sup>&infin;</sup> = {{frac:C<sub>0</sub>e<sup>&minus;k&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}}</b> = C<sub>max</sub><sup>&infin;</sup>e<sup>&minus;k&tau;</sup></td>
<td>As above</td>
<td>Steady state. The minimum is at the end of the dosing interval, one interval of first-order decline after the peak.</td>
<td>The steady-state trough. Her route: take the peak and apply C = C<sub>0</sub>e<sup>&minus;kt</sup> with t = &tau;.</td>
<td>Yes, in the sheet's multiple-dosing group.</td></tr>

<tr><td><b>C<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|V<sub>D</sub>k&tau;}} = {{frac:FD<sub>0</sub>|Cl<sub>T</sub>&tau;}}</b>; also C<sub>av</sub><sup>&infin;</sup> = {{frac:[AUC]<sub>t1</sub><sup>t2</sup>|&tau;}}; amount form D<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|k&tau;}}</td>
<td>F the bioavailability, the fraction of the dose reaching the plasma, 1 for IV; Cl<sub>T</sub> the total body clearance, kV<sub>D</sub>, in L/hr; [AUC] the area under the concentration-time curve over one dosing interval</td>
<td>Steady state, IV or oral. Not the midpoint of peak and trough: <i>"the average is not the max plus the men divided by 2."</i></td>
<td>The average concentration or amount at steady state.</td>
<td>{{frac:FD<sub>0</sub>|V<sub>D</sub>k&tau;}} and D<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|k&tau;}}: yes, page 1. The Cl<sub>T</sub>&tau; form and the {{frac:AUC|&tau;}} form are not printed; Cl<sub>T</sub> = kV<sub>D</sub> turns the printed form into the first.</td></tr>

<tr><td><b>C<sub>p</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}} ({{frac:1 &minus; e<sup>&minus;nk&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}}) e<sup>&minus;kt</sup></b></td>
<td>n the dose number just given; t the time since that dose (hr)</td>
<td>Before steady state. As n grows the top of the bracket becomes 1 and this becomes the steady-state equation.</td>
<td>A concentration a stated time after the n-th dose. Her Example 2: 29.7 mg/L 3 hours after the 2nd dose.</td>
<td>Yes, in the sheet's multiple-dosing group.</td></tr>

<tr><td><b>C<sub>p</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}} ({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}) e<sup>&minus;kt</sup></b> = C<sub>max</sub><sup>&infin;</sup>e<sup>&minus;kt</sup></td>
<td>t the time since the most recent dose (hr)</td>
<td>At steady state, and after the last dose: <i>"Last dose, we're gonna start at 53.3, and then it's just C0E minus KT."</i></td>
<td>The level a stated time after the last dose.</td>
<td>No. The sheet prints the n-dose line (page 1), which becomes this one as n grows and e<sup>&minus;nk&tau;</sup> falls to zero.</td></tr>
</tbody></table>

<p><b>Her Example 1</b>: t&frac12; 4 hr, V<sub>D</sub> 25% of body weight, 10 mg/kg every 8 hours.</p>
<ul class="tlist">
<li>k = {{frac:0.693|4 hr}} = 0.1733 hr<sup>&minus;1</sup>. The interval is two half-lives, so e<sup>&minus;k&tau;</sup> = 0.25 and the accumulation factor {{frac:1|1 &minus; 0.25}} = 1.33.</li>
<li>First dose: C<sub>0</sub> = {{frac:10 mg/kg|0.25 L/kg}} = 40 mg/L (1 L taken as 1 kg), falling to 40 &times; 0.25 = 10 mg/L at 8 hr.</li>
<li>At steady state: 40 &times; 1.33 = 53.3, 53.3 &times; 0.25 = 13.3, and an average of {{frac:40 mg/L|0.1733 hr<sup>&minus;1</sup> &times; 8 hr}} = 28.9 mg/L.</li>
</ul>
{{fig:md_bolus|Her Example 1 regimen: six doses, then none. The dashed curve is the first dose on its own.}}
{{steps:md_bolus_steps}}

<p><b>What the chapter adds.</b></p>
<ul class="tlist">
<li>The accumulation index R = {{frac:C<sub>max</sub><sup>&infin;</sup>|C<sub>max</sub> after the first dose}} = {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}.</li>
<li>It depends on k and &tau;, not on the dose.</li>
<li>Time to steady state depends on the elimination half-life only, not on the dose, the interval or the number of doses: 90% at 3.3 half-lives, 95% at 4.32, 99% at 6.6.</li>
<li>Superposition fails when repeated dosing changes the pharmacokinetics: changing pathophysiology, saturation of a carrier system, enzyme induction or inhibition, and nonlinear pharmacokinetics (elimination that is no longer first order).</li>
</ul>

<h3>Module 6 &mdash; intermittent IV infusions</h3>
<ul class="tlist">
<li>The repeated-bolus regimen, with each dose put in slowly: <i>"instead of putting all the drug into the body all at once, we are going to put the drug into the body via a zero order ... constant process."</i></li>
<li>The reason is tolerance: many drugs are better tolerated infused over time than pushed at once.</li>
<li>No new equation is needed.</li>
<li>The rise during each infusion is the Module 3 infusion equation, stopped at the infusion time.</li>
<li>The fall after it is C<sub>0</sub>e<sup>&minus;kt</sup>, starting from the end-of-infusion value as C<sub>0</sub>; k is the first-order elimination rate constant.</li>
<li>With first-order kinetics (a rate of loss proportional to the amount remaining), the infusions add.</li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>C<sub>p</sub> = {{frac:R|V<sub>D</sub>k}} (1 &minus; e<sup>&minus;kt</sup>)</b></td>
<td>R = {{frac:dose|infusion time}} (mg/hr); V<sub>D</sub> the apparent volume of distribution (L) times k the elimination rate constant (hr<sup>&minus;1</sup>) is Cl, the clearance (L/hr); t the infusion time (hr)</td>
<td>During any one infusion of the series. <i>"the same equation that we had when we talked about our single IV infusion."</i></td>
<td><ul class="tlist">
<li>The concentration at the end of the first infusion, always first: it is the C<sub>0</sub> for what follows.</li>
<li>Example 4: 300 mg over 2 hr, so R = 150 mg/hr; k 0.15 hr<sup>&minus;1</sup>; V<sub>D</sub> 15 L; a second 300 mg infusion over 2 hr starting 6 hr after the first. Her value: 17.28 mg/L.</li>
<li>Activity sheet problem 1: 500 mg over 2 hr, half-life 3 hr, V<sub>D</sub> 18 L. Her value: 22.24 mg/L.</li>
<li>Activity sheet problem 2: 150 mg over 1.5 hr, so R = 100 mg/hr; Cl 2.54 L/hr; V<sub>D</sub> 22 L. Her value: 6.26 mg/L.</li>
</ul></td>
<td>Yes, as the infusion line.</td></tr>

<tr><td><b>C = C<sub>end</sub>e<sup>&minus;kt</sup></b>, summed over the infusions</td>
<td>t for each infusion = the time from the end of that infusion to the time asked for</td>
<td>After an infusion stops: first-order elimination only. Same drug, same rate, same duration gives the same C<sub>end</sub> each time, and the contributions add.</td>
<td><ul class="tlist">
<li>The concentration a stated time after the second infusion ends.</li>
<li>Her number line for Example 4: infusions end at 2 and 8 hr, the question is at 12 hr, so t = 10 and 4 hr.</li>
<li>17.28 e<sup>&minus;0.15 &times; 10</sup> + 17.28 e<sup>&minus;0.15 &times; 4</sup> = 3.86 + 9.48 = 13.34 mg/L. Her stated value is 13.33; starting from 17.3 instead of 17.28 gives 13.35.</li>
</ul></td>
<td>C = C<sub>0</sub>e<sup>&minus;kt</sup>, page 1.</td></tr>

<tr><td><b>C<sub>ss</sub> = {{frac:R|Cl}}</b></td>
<td>R mg/hr, Cl L/hr</td>
<td>Only if the same rate were run continuously; the short infusions never reach it.</td>
<td>The activity sheet's last part, problem 2 run continuously: R = {{frac:150 mg|1.5 hr}} = 100 mg/hr and Cl = 2.54 L/hr, so {{frac:100 mg/hr|2.54 L/hr}} = 39.37 mg/L.</td>
<td>Yes, page 1.</td></tr>
</tbody></table>
{{fig:two_infusions|Her Example 4: each infusion on its own, and their sum, read at 12 hours.}}
{{steps:two_infusions_steps}}

<h3>Module 6 &mdash; multiple oral doses</h3>
<ul class="tlist">
<li>The single-oral-dose equation, with the accumulation brackets attached: each term is multiplied by {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}, the factor by which repeated dosing raises the level (k the elimination rate constant, &tau; the dosing interval).</li>
<li>Steady state is the plateau reached once rate in equals rate out; F is the bioavailability, the fraction of the dose absorbed.</li>
<li>How she tells the oral steady-state peak from the bolus one on the equation sheet: <i>"what tells you that this is for an oral dose? F is one thing. ... What else tells us? Team Max, right? ... Only for oral do you need to find T Max."</i></li>
<li>A regimen can change two things, the dose and the dosing interval: <i>"We don't change clearance, we don't change half-life, we don't change volume and distribution."</i></li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>t<sub>max</sub><sup>&infin;</sup> = {{frac:1|k<sub>a</sub> &minus; k}} ln[{{frac:k<sub>a</sub>(1 &minus; e<sup>&minus;k&tau;</sup>)|k(1 &minus; e<sup>&minus;k<sub>a</sub>&tau;</sup>)}}]</b></td>
<td>k<sub>a</sub> the first-order absorption rate constant and k the elimination rate constant, both hr<sup>&minus;1</sup>; &tau; the dosing interval, hr; result in hr</td>
<td>Steady state after multiple oral doses. It holds k, k<sub>a</sub> and &tau;, where the single-dose t<sub>max</sub> holds only k and k<sub>a</sub>; a new interval means a new t<sub>max</sub>.</td>
<td><ul class="tlist">
<li>t<sub>max</sub> at steady state, before C<sub>max</sub> at steady state.</li>
<li>Her tetracycline regimen: 250 mg orally every 8 hours; F 0.75; V<sub>D</sub> 1.5 L/kg &times; 75 kg = 112.5 L; half-life 10 hr, so k = {{frac:0.693|10 hr}} = 0.0693 hr<sup>&minus;1</sup>; k<sub>a</sub> 0.9 hr<sup>&minus;1</sup>.</li>
<li>Her tetracycline values: 3.1 hr for the first dose, 2.06 hr at steady state.</li>
<li><i>"generally going to be smaller than the T-Max of the first dose."</i></li>
</ul></td>
<td><ul class="tlist">
<li>Yes, page 2, left column, fourth line.</li>
<li>In lecture she placed the oral steady-state lines <i>"on the backside or at the bottom very bottom of the right hand column"</i> (09-28).</li>
<li>On this copy they are on the back page; the bottom of page 1's right column holds the n-dose oral line.</li>
</ul></td></tr>

<tr><td><b>C<sub>max</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|V<sub>D</sub>}} ({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}) e<sup>&minus;kt<sub>max</sub>&infin;</sup></b></td>
<td>F fraction absorbed; D<sub>0</sub> the dose (mg); V<sub>D</sub> the apparent volume of distribution (L); t<sub>max</sub><sup>&infin;</sup> from the line above</td>
<td>Steady state, oral. Without the F and the t<sub>max</sub> it is the repeated-bolus C<sub>max</sub><sup>&infin;</sup>.</td>
<td>The steady-state peak: 3.4 mg/L for tetracycline against 1.35 mg/L after the first dose, higher because drug has accumulated.</td>
<td>Yes.</td></tr>

<tr><td><b>C<sub>min</sub><sup>&infin;</sup> = {{frac:k<sub>a</sub>FD<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}} ({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}) e<sup>&minus;k&tau;</sup></b></td>
<td>The single-dose prefactor, the accumulation factor, one interval of decline</td>
<td>Steady state, oral, at the end of the interval.</td>
<td>The steady-state trough: 2.4 mg/L for tetracycline.</td>
<td>Yes.</td></tr>

<tr><td><b>C<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|Cl<sub>T</sub>&tau;}}</b></td>
<td>Cl<sub>T</sub> the total body clearance, kV<sub>D</sub> (L/hr); F the fraction absorbed; D<sub>0</sub> the dose (mg); &tau; the dosing interval (hr)</td>
<td>Steady state, any route; F is now less than 1.</td>
<td><ul class="tlist">
<li>The average for tetracycline, with F 0.75, D<sub>0</sub> 250 mg, V<sub>D</sub> 112.5 L, k 0.0693 hr<sup>&minus;1</sup> and &tau; 8 hr.</li>
<li>FD<sub>0</sub> = 0.75 &times; 250 mg = 187.5 mg, so {{frac:187.5 mg|112.5 L &times; 0.0693 hr<sup>&minus;1</sup> &times; 8 hr}} = 3.0 mg/L.</li>
</ul></td>
<td>Yes, as C<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|V<sub>D</sub>k&tau;}} on page 1; Cl<sub>T</sub> = kV<sub>D</sub> makes the two the same.</td></tr>

<tr><td><b>C<sub>p</sub></b> after n oral doses: the single-dose equation with {{frac:1 &minus; e<sup>&minus;nk&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}} on the e<sup>&minus;kt</sup> term and {{frac:1 &minus; e<sup>&minus;nk<sub>a</sub>&tau;</sup>|1 &minus; e<sup>&minus;k<sub>a</sub>&tau;</sup>}} on the e<sup>&minus;k<sub>a</sub>t</sup> term</td>
<td>n the dose number; at steady state each numerator is 1</td>
<td>Any time after the n-th dose. <i>"the only difference here ... what number of dose are we on? And now we have the tau."</i></td>
<td>Not worked in the lecture; she goes from the first dose to steady state.</td>
<td>Yes, page 1, last line of the right column.</td></tr>
</tbody></table>

<p><b>Changing the regimen.</b></p>
<ul class="tlist">
<li>Increase the dose, same interval: higher steady-state concentrations, a larger swing from peak to trough, usually no change in compliance.</li>
<li>Increase the interval, same dose: lower concentrations, a larger swing, better compliance.</li>
<li>Decrease the interval: higher concentrations and worse compliance.</li>
<li>The swing is smaller because the next dose arrives earlier in the decline: <i>"we're cutting into that 3 to 5 half-lives a little bit more, so we're not going all the way to the bottom of that curve,"</i> (a half-life being the time for the concentration to fall by one-half).</li>
<li>Neither change moves the time to reach steady state.</li>
<li>When stating a regimen, give an interval the patient can keep and an oral dose rounded to a strength that exists: <i>"Don't tell me 17.29 mg for an oral dose."</i></li>
</ul>

<h3>Module 7a &mdash; bioavailability and bioequivalence</h3>
<ul class="tlist">
<li>The area under the curve (AUC) from Module 1 and the relationship between clearance (the volume of plasma cleared of drug per unit time), dose and AUC from Module 4, used to compare one dosage form with another.</li>
<li>Bioavailability is rate and extent: <i>"extent. We think about that in terms of our AUC, right? ... What do you think about the rate? So we think about rate in terms of T max."</i></li>
<li>Absolute compares with IV; relative compares two formulations: <i>"Absolute says that we are comparing it to the IV. Relative bioavailability says that we are just comparing two drug formulations."</i></li>
<li>What goes underneath: <i>"I want you to remember that the IVAUC is going to be in the denominator, right? That is what you are comparing it to."</i></li>
<li>How to write F: 0.55 or 55%, never a bare decimal point. <i>"just a little reminder, there should be no leading decimals, OK?"</i></li>
<li>For Quiz 4: <i>"I'm not gonna ask you too many of those. We're gonna kind of focus more on the absolute bioavailability."</i></li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>F<sub>abs</sub> = {{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}} &times; {{frac:D<sub>IV</sub>|D<sub>po</sub>}}</b></td>
<td>AUC<sub>po</sub>, AUC<sub>IV</sub> the areas after the oral and the IV dose, in the same units ((mcg/mL)hr or mg&middot;hr/L); D<sub>IV</sub>, D<sub>po</sub> the doses (mg); F<sub>abs</sub> no units, written 0.55 or 55%</td>
<td><ul class="tlist">
<li>An extravascular dose (one given outside the blood vessels, as by mouth) compared with an IV dose of the same drug. The IV AUC is in the denominator and the IV dose on top.</li>
<li>Equal doses leave only the AUC ratio. Cannot exceed 1.</li>
</ul></td>
<td><ul class="tlist">
<li>Her slide problem, a 250 mg oral dose with AUC 101.5 against a 100 mg IV dose with AUC 73.8: {{frac:101.5|73.8}} &times; {{frac:100 mg|250 mg}} = 0.55; her note beside it: <i>"means 55% bioavailability"</i>.</li>
<li>Her poll: a 500 mg tablet, AUC 115 (mg/L)hr, against a 400 mg IV bolus, AUC 132 (mg/L)hr: {{frac:115|132}} &times; {{frac:400|500}} = 0.70, which the room answered 70%.</li>
</ul></td>
<td>Yes, page 2, left column.</td></tr>

<tr><td><b>D<sub>IV</sub> = (Cl)(AUC<sub>IV</sub>)</b>, so AUC<sub>IV</sub> = {{frac:D<sub>IV</sub>|Cl}} = {{frac:D<sub>IV</sub>|kV<sub>D</sub>}}</td>
<td>Cl clearance (L/hr), kV<sub>D</sub> for one compartment; k (hr<sup>&minus;1</sup>) from the half-life; V<sub>D</sub> (L); AUC in mg&middot;hr/L</td>
<td>An IV dose, where F = 1. The stem gives a half-life and a volume instead of an IV AUC. The Module 4 line Cl<sub>T</sub> = {{frac:FD<sub>0</sub>|AUC}} is the same relationship.</td>
<td><ul class="tlist">
<li>In-Class Activity 1(a): a 500 mg IV dose with half-life 3 hr (k = {{frac:0.693|3 hr}} = 0.231 hr<sup>&minus;1</sup>) and V<sub>D</sub> 25 L, against a 500 mg oral dose with AUC 70 mg&middot;hr/L.</li>
<li>AUC<sub>IV</sub> = {{frac:500 mg|25 L &times; 0.231 hr<sup>&minus;1</sup>}} = 86.58 mg&middot;hr/L, then F = {{frac:70|86.58}} = 0.81.</li>
<li>1(b): half the dose, 43.29 mg&middot;hr/L.</li>
<li>Activity 3: Cl = 0.2 hr<sup>&minus;1</sup> &times; 10 L = 2 L/hr, AUC = {{frac:500 mg|2 L/hr}} = 250 mg&middot;hr/L.</li>
</ul></td>
<td>Yes, page 2. Cl = kV<sub>D</sub> itself is not printed.</td></tr>

<tr><td><b>F<sub>abs</sub>D<sub>po</sub> = (Cl)(AUC<sub>po</sub>)</b>, so F<sub>abs</sub> = {{frac:(Cl)(AUC<sub>po</sub>)|D<sub>po</sub>}}</td>
<td>The same symbols; F<sub>abs</sub>D<sub>po</sub> is the amount of the oral dose that entered the circulation (mg)</td>
<td>The second route to the same F, from the oral AUC, the clearance and the oral dose. <i>"it doesn't matter which approach you use, right?"</i></td>
<td>Activity 1(a) again: {{frac:(70 mg&middot;hr/L)(25 L)(0.231 hr<sup>&minus;1</sup>)|500 mg}} = 0.8085; <i>"recognize that F is a dimensionless number, right? Cause all of our units are are canceling."</i></td>
<td>Yes, page 2.</td></tr>

<tr><td><b>F = {{frac:D<sub>IV</sub>|D<sub>po</sub>}}</b>, so D<sub>po</sub> = {{frac:D<sub>IV</sub>|F}} (when the AUCs are to match)</td>
<td>D<sub>IV</sub> the IV dose being replaced (mg); F the absolute bioavailability of the oral product; D<sub>po</sub> the oral dose with the same AUC (mg)</td>
<td>An equivalent therapeutic regimen, the same extent of absorption, or sending a patient home on oral. Set AUC<sub>po</sub> = AUC<sub>IV</sub> in F<sub>abs</sub> and the AUC ratio drops out.</td>
<td><ul class="tlist">
<li>Her slide: {{frac:100 mg|0.55}} = 181.8, so about 182 mg; <i>"We might round it to 200 if there's a 175 or something that makes sense"</i>.</li>
<li>Activity 2, ciprofloxacin at 70%: {{frac:400 mg|0.70}} = 571.43 mg, given as 575 or 600 mg; the strengths she looked up were 250 and 500 mg.</li>
<li>Expect a larger number than the IV dose.</li>
</ul></td>
<td>No. Derived on the slide from F<sub>abs</sub>.</td></tr>

<tr><td><b>F<sub>rel</sub> = {{frac:AUC<sub>A</sub>|AUC<sub>B</sub>}} &times; {{frac:D<sub>B</sub>|D<sub>A</sub>}}</b></td>
<td>A the product being compared (test); B the reference standard or comparator; AUC in matching units; D in mg; no units</td>
<td>Two formulations of the same drug, neither IV. <i>"compared to the oral solution ... that tells you that the oral solution, the AUC, the oral solution is going to be in the denominator."</i> Can exceed 1.</td>
<td><ul class="tlist">
<li>Her slide problem: a 250 mg tablet, AUC 101.5, against 250 mg in oral solution, AUC 98.76: {{frac:101.5|98.76}} = 1.03.</li>
<li>It says nothing about bioequivalence (no significant difference in the rate and extent to which the active ingredient becomes available at the same molar dose), because the rate is unknown.</li>
</ul></td>
<td>Yes, page 2, under the absolute lines.</td></tr>
</tbody></table>

<p><b>Definitions, in the slides' wording.</b></p>
<table class="reftab"><thead><tr>
<th style="width:22%">Term</th><th style="width:48%">Definition</th><th>How she puts it</th></tr></thead><tbody>
<tr><td>Drug product performance</td><td>The release of the drug substance from the drug product leading to bioavailability of the drug substance.</td><td><i>"If the drug does not release from dosage form, then the drug will not be available for the body to use."</i></td></tr>
<tr><td>Bioavailability</td><td>The rate and extent to which the active ingredient or active moiety is absorbed from a drug product and becomes available at the site of action.</td><td>Extent is the AUC; rate is t<sub>max</sub>. The course's F is the extent half.</td></tr>
<tr><td>Absolute bioavailability</td><td>Comparison of the bioavailability of the active drug in the systemic circulation following extravascular administration with the bioavailability of the same drug following intravenous administration.</td><td>Her note on the slide: comparing AUCs to IV, think oral. The IV AUC is the denominator.</td></tr>
<tr><td>Relative bioavailability</td><td>Comparison of two drug product formulations.</td><td>The reference B is underneath; <i>"something new that comes onto the market could have a slightly higher bioavailability"</i>, so F<sub>rel</sub> can pass 1.</td></tr>
<tr><td>Bioequivalence</td><td><ul class="tlist">
<li>The absence of a significant difference in the rate and extent to which the active ingredient or active moiety becomes available at the site of drug action when administered at the same molar dose under similar conditions in an appropriately designed study.</li>
<li>A bioequivalence study is a specialized type of relative bioavailability study.</li>
</ul></td><td><i>"these two have similar F's, but you don't know if they're bioequivalent because you don't know about the, the rate."</i></td></tr>
<tr><td>Test and reference product</td><td>Comparison of the bioavailability of the same active pharmaceutical ingredient from one drug product (test) to a second drug product (reference).</td><td><i>"B is the reference standard or the comparator, right? So, in our um absolute example, our reference standard would be our IV bolus."</i></td></tr>
</tbody></table>

<h3>The equation sheet as a whole</h3>
<ul class="tlist">
<li>BasicPharmacokineticsEquations.pdf runs to two pages.</li>
<li>It is not organised by module, so a line for a module not yet lectured sits beside one from Module 1.</li>
<li>Her instruction on using it: <i>"before you grab your calculator, before, for any question, and before you start flipping to the equation sheet, think about what is being asked of you and what you need."</i></li>
</ul>
<p><b>Symbols, as the sheet uses them.</b></p>
<ul class="tlist">
<li>C and C<sub>p</sub>: concentration in plasma. C<sub>0</sub>: the concentration at time zero. C<sub>ss</sub>: the steady-state concentration, the plateau where rate in equals rate out.</li>
<li>C<sub>max</sub>, C<sub>min</sub>, C<sub>avg</sub>: the peak, trough and average over one dosing interval at steady state. D<sub>max</sub>, D<sub>min</sub>, D<sub>avg</sub>: the same as amounts.</li>
<li>D: the amount of drug. D<sub>B</sub> in the body; D<sub>0</sub> the dose; D<sub>L</sub> the loading dose; D<sub>u</sub><sup>&infin;</sup> the total recovered unchanged in urine; D<sub>IV</sub> and D<sub>po</sub> the IV and the oral doses.</li>
<li>k: the first-order elimination rate constant (rate of loss proportional to the amount remaining). k<sub>0</sub>: the zero-order constant (a constant amount lost per unit time).</li>
<li>k<sub>e</sub> excretion; k<sub>a</sub> absorption; k<sub>12</sub> and k<sub>21</sub> transfer between the central and the tissue compartment.</li>
<li>A, B: the intercepts, and a, b the slopes, of a two-compartment curve.</li>
<li>V<sub>D</sub>: the apparent volume of distribution, the volume relating the amount in the body to the measured concentration. V<sub>p</sub> and V<sub>t</sub>: the central and tissue volumes.</li>
<li>Cl: clearance, the volume of plasma cleared of drug per unit time. Cl<sub>T</sub> total; Cl<sub>R</sub> renal; Cl<sub>H</sub> hepatic.</li>
<li>R: the constant infusion rate, amount per time.</li>
<li>F: the bioavailability, the fraction of the dose reaching the plasma. F<sub>abs</sub> measured against an IV dose; F<sub>rel</sub> against a reference product B. f<sub>e</sub>: the fraction of the dose excreted unchanged.</li>
<li>AUC: the area under the concentration-time curve, estimated by the trapezoidal rule (half the sum of two neighbouring concentrations times the time between them).</li>
<li>t<sub>max</sub>: the time of the peak. &tau;: the dosing interval. n: the number of doses given.</li>
</ul>

<table class="reftab"><thead><tr>
<th style="width:26%">Group</th><th style="width:44%">Lines carried</th><th>Module</th></tr></thead><tbody>
<tr><td>Area under the curve</td><td>The trapezoidal rule for one segment</td><td>Module 1</td></tr>
<tr><td>Zero-order decline</td><td>C = C<sub>0</sub> &minus; k<sub>0</sub>t</td><td>Module 1</td></tr>
<tr><td>First-order decline</td><td>C = C<sub>0</sub>e<sup>&minus;kt</sup>, ln C = ln C<sub>0</sub> &minus; kt, log C = log C<sub>0</sub> &minus; {{frac:kt|2.3}}; and the same three in D</td><td>Modules 1 and 2</td></tr>
<tr><td>Volume and concentration</td><td>C<sub>p</sub> = {{frac:D<sub>B</sub>|V<sub>D</sub>}}</td><td>Module 2</td></tr>
<tr><td>Infusion</td><td>C<sub>p</sub> = {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>), C<sub>ss</sub> = {{frac:R|Cl}}, D<sub>L</sub> = {{frac:R|k}}, D<sub>L</sub> = C<sub>ss</sub>V<sub>D</sub></td><td>Module 3</td></tr>
<tr><td>Two compartment</td><td>C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup>; k, k<sub>12</sub>, k<sub>21</sub> from A, B, a, b; V<sub>p</sub> two ways; V<sub>t</sub></td><td>Module 2</td></tr>
<tr><td>Clearance and elimination</td><td><ul class="tlist">
<li>Cl<sub>T</sub> = {{frac:FD<sub>0</sub>|AUC}}</li>
<li>f<sub>e</sub> = {{frac:D<sub>u</sub><sup>&infin;</sup>|FD<sub>0</sub>}} = {{frac:k<sub>e</sub>|k}}</li>
<li>Cl<sub>R</sub> = f<sub>e</sub>Cl<sub>T</sub>; Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub></li>
<li>rate of elimination = (Cl)(C<sub>p</sub>)</li>
<li>Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub></li>
</ul></td><td>Module 4</td></tr>
<tr><td>Single oral dose</td><td>The full C<sub>p</sub> equation and t<sub>max</sub></td><td>Module 5</td></tr>
<tr><td>Multiple dosing</td><td><ul class="tlist">
<li>D<sub>max</sub>, D<sub>min</sub>, D<sub>avg</sub>, C<sub>max</sub>, C<sub>min</sub>, C<sub>avg</sub>, and C<sub>p</sub> after n doses, IV and oral, all carrying a dosing interval.</li>
<li>Also the multiple-oral-dose C<sub>p</sub>, C<sub>max</sub>, C<sub>min</sub> and t<sub>max</sub> at steady state, on page 2.</li>
</ul></td><td>Module 6, all three parts: repeated IV bolus, intermittent infusions, multiple oral doses</td></tr>
<tr><td>Bioavailability</td><td>F = {{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}}{{frac:D<sub>IV</sub>|D<sub>po</sub>}}; F<sub>rel</sub> = {{frac:AUC<sub>A</sub>|AUC<sub>B</sub>}}{{frac:D<sub>B</sub>|D<sub>A</sub>}}; D<sub>IV</sub> = (Cl)(AUC<sub>IV</sub>); F<sub>abs</sub>D<sub>po</sub> = (Cl)(AUC<sub>po</sub>)</td><td>Module 7a</td></tr>
<tr><td>Shelf life and stability</td><td>An E and E<sub>0</sub> log-decline line, and three t<sub>eff</sub> forms including t<sub>eff</sub> = 1.44 t&frac12; ln[{{frac:D<sub>0</sub>|C<sub>eff</sub>V<sub>D</sub>}}]</td><td>Chemical kinetics; not lectured in Modules 1 to 5</td></tr>
<tr><td>Nonlinear pharmacokinetics</td><td>R = {{frac:V<sub>max</sub>C<sub>ss</sub>|K<sub>M</sub> + C<sub>ss</sub>}}; K<sub>M</sub> from two rate and concentration pairs; t&frac12; = {{frac:0.693(K<sub>M</sub> + C<sub>p</sub>)V<sub>D</sub>|V<sub>max</sub>}}; Cl<sub>T</sub> = {{frac:V<sub>max</sub>|K<sub>M</sub> + C<sub>p</sub>}}</td><td>Final exam material; the symbols in these two rows are not defined in Modules 1 to 7a</td></tr>
</tbody></table>

<ul class="tlist">
<li>Nothing on this page is a statement about what the paper will ask.</li>
<li>The five entries in the first table are the ones Dr. Mosley said out loud she does not supply.</li>
<li>Everything else here reports what the two rendered pages of the equation sheet do and do not carry.</li>
</ul>
`;
