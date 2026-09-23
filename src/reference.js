/* ==========================================================================
   REFERENCE
   ==========================================================================
   Static HTML document: the equation tables the questions keep returning to.
   Authored as HTML in a template literal — no backtick and no dollar-brace
   inside. Each <h3> becomes a jump-list entry automatically.
   {{fig:key|caption}} tokens resolve against images.json; none are used here
   because no figures have been harvested yet.

   SOURCES. Every equation, symbol, unit, number and claim below comes from
   one of: BasicPharmacokineticsEquations.pdf (the exam equation sheet),
   the five lectured decks, Dr. Mosley's own worked solutions recorded in
   STYLE.md, or her spoken words recorded in TRANSCRIPT_CUES.md. Where the
   equation-sheet text extract is unreadable, the line is reported as
   unreadable rather than as absent.
   ========================================================================== */
const REFERENCE_HTML = `
<h2>Reference</h2>
<p class="sub">Every equation this course uses, what each symbol means, the condition it holds under, and whether the exam equation sheet carries it. Nothing here is scored.</p>

<h3>Not on the exam equation sheet</h3>
<p>Dr. Mosley supplies a paper equation sheet and the same equations inside ExamSoft: <i>"We will have equations for exams. I will put, give you a paper copy and equations will also be in ExamSoft for you, OK? So, the equations are there. You've got to think about which one do I want to apply in this application."</i> She named five things she does not put on it. These five are the ones she expects without the sheet.</p>

<table class="reftab"><thead><tr>
<th style="width:26%">Relation</th><th style="width:34%">What she said</th><th>Where it is needed, and the state of the equation sheet</th></tr></thead><tbody>

<tr><td><b>First-order half-life</b><br>t&frac12; = {{frac:0.693|k}}</td>
<td><i>"first order half-life &hellip; that will not be on your equation sheet. This is the one that you take to your grave with you, OK? 0.693 over K."</i> (08-19). Repeated 08-24, 08-26 and in the 09-09 exam review: <i>"That one is not on your equation sheet."</i></td>
<td>Needed in every module. It is also how the two-compartment beta half-life and the absorption half-life are obtained, since both are first-order half-lives of a different rate constant. No line of the readable equation-sheet extract carries 0.693 divided by a rate constant.</td></tr>

<tr><td><b>Clearance from k and V<sub>D</sub></b><br>Cl = k &times; V<sub>D</sub></td>
<td><i>"this is another one that it will not be on your equation sheet cause I want you to take this one with you to your grave along with the half-life equation. Clearance is equal to k times vd."</i> (08-24)</td>
<td>Needed for total body clearance, for the infusion rate R = C<sub>ss</sub>&middot;Cl and for every renal/hepatic split. The deck slide that states it, 2IVBolusAdministration.pdf slide "Clearance", carries the handwritten note that the equation will not be given on the exam. No line of the readable extract carries it.</td></tr>

<tr><td><b>Volume, dose and concentration</b><br>C<sub>p</sub> = {{frac:D<sub>B</sub>|V<sub>D</sub>}}, so V<sub>D</sub> = {{frac:D<sub>B</sub>|C<sub>p</sub>}}</td>
<td><i>"The other one, the relationship between volume of distribution, concentration, and dose, that one is in, in, in you as well"</i> (08-26)</td>
<td><b>Two sources differ here.</b> She names this as one to hold without the sheet, but the equation sheet extract does carry the line C<sub>p</sub> = D<sub>B</sub>/V<sub>D</sub>, readable and unambiguous, on page 1. Both readings are stated because neither cancels the other: the line is on the sheet, and she still expects it known.</td></tr>

<tr><td><b>Cockcroft-Gault</b><br>CrCl = {{frac:(140 &minus; age)(IBW)|72 &times; S<sub>Cr</sub>}}, &times; 0.85 if female</td>
<td><i>"this is an equation that I want you to know, to memorize. I've given you the equation sheet, this one is not there. You need to know this one, OK."</i> (09-14)</td>
<td>Module 4. Her answer must come out in mL/min: <i>"don't give me kilograms per milligram per deciliter. Milliliters per minute."</i> No line of the readable extract carries it.</td></tr>

<tr><td><b>Ideal body weight</b><br>male: 50 + 2.3 &times; (inches over 5 ft)<br>female: 45.5 + 2.3 &times; (inches over 5 ft)</td>
<td><i>"the ideal body weight, again, you need to know this one."</i> (09-14)</td>
<td>Module 4, as the IBW that feeds Cockcroft-Gault. She keeps the arithmetic simple on purpose: <i>"All of our patients are going to be 5 ft tall. And all, and we're just gonna use ideal body weight."</i> No line of the readable extract carries it.</td></tr>
</tbody></table>

<div class="note"><b>Lines of the equation-sheet extract that could not be read.</b> Four lines of BasicPharmacokineticsEquations.pdf come through as replacement characters, so what they say cannot be stated. They are, in the order they appear: (1) page 1, a short two-term line sitting between the trapezoidal rule and the first-order concentration block; (2) page 1, a five-symbol line immediately after D<sub>L</sub> = R/k; (3) page 1, the long multiple-oral-dose concentration line whose bracket structure survives but whose every symbol is replaced; (4) page 2, a seven-symbol line immediately after D<sub>IV</sub> = (Cl)(AUC<sub>IV</sub>). No equation is called absent from the sheet on the strength of these four lines alone &mdash; the five entries in the table above rest on Dr. Mosley saying so out loud, not on the extract.</div>

<p>Three further half-life relations sit apart from the five above, because she never said either way whether the sheet carries them. Neither appears in the readable extract, and unreadable line (1) is the only candidate position for a zero-order form.</p>

<table class="reftab"><thead><tr>
<th style="width:30%">Relation</th><th style="width:26%">Source that states it</th><th>Status on the sheet</th></tr></thead><tbody>
<tr><td><b>Zero-order half-life</b><br>t&frac12; = {{frac:C<sub>0</sub>|2k}}</td><td>Introduction.pdf slide 19, printed</td><td>Not in the readable extract. She never said whether it is supplied. Unreadable line (1) is in a plausible position for a zero-order relation, so absence cannot be asserted.</td></tr>
<tr><td><b>Beta half-life</b><br>t&frac12;<sub>&beta;</sub> = {{frac:0.693|b}}</td><td>2IVBolusAdministration.pdf slide "Beta Half-life", printed</td><td>Not in the readable extract. It is the first-order half-life relation applied to the slope b, so her carve-out for first-order half-life covers it: <i>"You take your 0.693 and you divide by lowercase b."</i></td></tr>
<tr><td><b>Absorption half-life</b><br>t&frac12;<sub>a</sub> = {{frac:0.693|k<sub>a</sub>}}</td><td>5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Kinetics of Absorption", printed</td><td>Not in the readable extract. Same first-order half-life relation, applied to k<sub>a</sub>.</td></tr>
</tbody></table>

<h3>Units, and the conversions this course keeps needing</h3>
<p>Two of her standing deductions are about units, not pharmacokinetics: <i>"If there are units. Then you should give me units. OK, don't just give me a number. Because a milligram is very different than a microgram."</i> and <i>"There should never be a leading decimal &hellip; If you give me that as your final answer, you will lose half the points for this answer."</i></p>

<table class="reftab"><thead><tr>
<th style="width:26%">Parameter</th><th style="width:26%">Units she quotes it in</th><th>Notes from her own solutions</th></tr></thead><tbody>
<tr><td>Concentration C, C<sub>p</sub>, C<sub>0</sub>, C<sub>ss</sub>, C<sub>max</sub></td><td>mg/L, or mcg/mL</td><td>mg/L is the default in her worked answers; stems are posed in mcg/mL about as often, and she swaps the label mid-solution without comment because the two are numerically equal. mg/mL is reserved for bulk-solution stability problems.</td></tr>
<tr><td>Amount D, D<sub>B</sub>, D<sub>0</sub>, D<sub>L</sub>, D<sub>u</sub></td><td>mg</td><td>Micrograms appear in stems; she warns that 500 micrograms and 500 milligrams are different answers.</td></tr>
<tr><td>First-order rate constant k, k<sub>e</sub>, k<sub>m</sub>, k<sub>a</sub>, k<sub>12</sub>, k<sub>21</sub>, a, b</td><td>reciprocal time, usually hr<sup>&minus;1</sup></td><td><i>"Is it time? One over time. We call that reciprocal time."</i> She writes k to four decimal places (0.0866, 0.1733, 0.1386, 0.2235) and warns against truncating early: <i>"don't truncate that to 0.2 early on."</i> A rate constant is never negative.</td></tr>
<tr><td>Zero-order rate constant k<sub>0</sub></td><td>amount/time or concentration/time, e.g. mg/mL per day</td><td><i>"our K for zero order processes is either going to be concentration per unit time. Or amount per unit time."</i></td></tr>
<tr><td>Half-life t&frac12;</td><td>time &mdash; hours, or days for the shelf-life problems</td><td>Flagged as a scored error: <i>"It is a time, so it is not days to the minus one. It is just days."</i> The most important word in the definition is <i>time</i>.</td></tr>
<tr><td>Volume of distribution V<sub>D</sub>, V<sub>p</sub>, V<sub>t</sub></td><td>L (mL for compounding volumes)</td><td>She states it four ways: absolute (16 L), per kilogram (0.5 L/kg, 400 mL/kg), as a percent of body weight (20%, 23.1%), or not at all, to be back-calculated from D<sub>0</sub>/C<sub>0</sub> or from Cl/k.</td></tr>
<tr><td>Clearance Cl<sub>T</sub>, Cl<sub>R</sub>, Cl<sub>H</sub></td><td>L/hr</td><td>Except creatinine clearance, which she requires in mL/min.</td></tr>
<tr><td>Infusion rate R</td><td>amount per time, usually mg/hr</td><td><i>"The units of r. Are going to be a mount. Per time. So most often milligrams per hour."</i> A parallel mL/hr or mL/min part appears whenever the stem supplies a solution concentration.</td></tr>
<tr><td>AUC</td><td>concentration &times; time, e.g. mcg&middot;hr/mL</td><td>Her own words on the units: <i>"Micrograms per mil times hour, kind of funky units."</i></td></tr>
<tr><td>Fraction excreted unchanged f<sub>e</sub>, bioavailability F</td><td>no units</td><td><i>"What are the units of FE? No units, right?"</i></td></tr>
<tr><td>Serum creatinine S<sub>Cr</sub></td><td>mg/dL</td><td>Asked and answered twice in one lecture: <i>"serum creatinine is gonna be um presented as milligrams per deciliter."</i></td></tr>
<tr><td>Creatinine clearance CrCl</td><td>mL/min</td><td>The Cockcroft-Gault expression does not produce these units algebraically and she says so: <i>"if you're like me, I like for the units to cross off. The units don't cross off."</i> The answer is still reported in mL/min.</td></tr>
</tbody></table>

<table class="reftab"><thead><tr>
<th style="width:34%">Conversion</th><th>Where it is used, and how she handles it</th></tr></thead><tbody>
<tr><td><b>mcg/mL = mg/L</b></td><td>Handed over so no exam time is spent on it: <i>"Milligrams per liter equals micrograms per mL &hellip; I don't want you to spend 10 minutes doing the conversion and then being off by a magnitude of 10."</i> Restated in the 09-09 review. Either label is accepted for a concentration answer.</td></tr>
<tr><td><b>minutes &rarr; hours</b> (divide by 60)</td><td>15 minutes becomes 0.25 hr silently in the standard eight-part IV bolus battery. 45 minutes becomes 0.75 hr and 90 minutes becomes 1.5 hr in the oral absorption examples. Named as a common error: <i>"when you are calculating um T max, do not forget to change your times to out to the same unit, usually hours."</i></td></tr>
<tr><td><b>pounds &rarr; kilograms</b> (divide by 2.2)</td><td>She gives weight in pounds whenever she wants the conversion tested &mdash; 110 lb, 154 lb, 162 lb, 165 lb, 187 lb &mdash; and always divides by 2.2 without showing the step. Pounds and mg/kg dosing tend to appear together, so the conversion gates the whole problem.</td></tr>
<tr><td><b>inches &rarr; centimetres</b> (1 inch = 2.54 cm)</td><td>Module 4 only, to reach ideal body weight from a height in centimetres: <i>"if you don't remember, 1 inch is equal to 2.54 centimetres &hellip; I am getting 64.96 inches. So, let's call that 65 inches."</i> She also expects the reverse: <i>"You should also know how to convert inches to centimetres and back and forth."</i></td></tr>
<tr><td><b>inches over 5 ft</b> (5 ft = 60 inches)</td><td>The input to both ideal body weight formulas is height in inches minus 60. For the 165 cm patient that is 65 &minus; 60 = 5 inches over 5 ft. She warns that students mishandle a fractional height: <i>"64.5 is like 64.5 inches tall. It's not 64 and then another 5 inches."</i></td></tr>
<tr><td><b>percent of body weight &rarr; litres</b> (1 L is taken as 1 kg)</td><td>Printed on 2IVBolusAdministration.pdf slide "Volume of Distribution": <i>"a 1-L volume is assumed to be equal to the weight of 1 kg."</i> So V<sub>D</sub> at 20% of an 80 kg body weight is 16 L, and she insists on the unit: <i>"14 apples, 14 L, OK? Not 14 kg 14 L."</i></td></tr>
</tbody></table>
<p class="sub">Grams to milligrams is not carried here. No stem, worked solution, slide or transcript line in these five modules states a dose or a concentration in grams, so there is no source for it.</p>

<h3>Module 1 &mdash; kinetic orders, half-life and AUC</h3>
<p>The two orders are the pair most often confused, so they are set out together. The 09-09 review names the one item guaranteed to appear: <i>"On this exam, I am going to give you a data set, and I expect you to figure out if it's zero or first."</i></p>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>dC/dt = &minus;k</b><br>C = C<sub>0</sub> &minus; kt</td>
<td>C, C<sub>0</sub> concentration (mg/mL, mg/L); k zero-order rate constant, amount or concentration per time (mg/mL per day); t time</td>
<td>Zero-order loss. The amount or concentration falls at a constant rate, independent of how much is present. A straight line on linear axes.</td>
<td>k<sub>0</sub> from two points, C<sub>0</sub> by back-extrapolation, time to a stated percent decomposed.</td>
<td>Not in the readable extract; unreadable line (1) is in a plausible position for this form.</td></tr>

<tr><td><b>dC/dt = &minus;kC</b><br>ln C = ln C<sub>0</sub> &minus; kt &rarr; C = C<sub>0</sub>e<sup>&minus;kt</sup><br>log C = log C<sub>0</sub> &minus; {{frac:kt|2.3}} &rarr; C = C<sub>0</sub>10<sup>&minus;kt/2.3</sup></td>
<td>Same symbols, but k is reciprocal time (hr<sup>&minus;1</sup>, day<sup>&minus;1</sup>). The 2.3 is the conversion between natural and base-10 logs: <i>"It's just a conversion factor to get you down to this natural log piece."</i></td>
<td>First-order loss. The rate is proportional to what remains, so the rate falls as concentration falls. A curve on linear axes and a straight line on semi-logarithmic axes.</td>
<td>k from two points as ln(C<sub>1</sub>/C<sub>2</sub>)/&Delta;t; C<sub>0</sub> as C<sub>t</sub>e<sup>+kt</sup>; C at a stated time; time to a stated percent.</td>
<td>Yes &mdash; all three forms, twice: once in C and once in D.</td></tr>

<tr><td><b>D = D<sub>0</sub>e<sup>&minus;kt</sup></b><br>ln D = ln D<sub>0</sub> &minus; kt<br>log D = log D<sub>0</sub> &minus; {{frac:kt|2.3}}</td>
<td>D amount of drug remaining (mg); D<sub>0</sub> the dose (mg); k reciprocal time</td>
<td>The same first-order relation written in amount rather than concentration. She insists the two are not mixed: <i>"you gotta be apples to apples here &hellip; you can't do the 200 and the 15."</i></td>
<td>Amount in the body at a stated time. She shows it both ways, as V<sub>D</sub>&middot;C<sub>t</sub> and as D<sub>0</sub>e<sup>&minus;kt</sup>.</td>
<td>Yes, all three forms.</td></tr>

<tr><td><b>t&frac12; = {{frac:C<sub>0</sub>|2k}}</b></td>
<td>C<sub>0</sub> starting concentration; k zero-order rate constant; result in time</td>
<td>Zero order only. It depends on C<sub>0</sub>, so it is not a fixed property of the drug: start lower and the half-life is shorter.</td>
<td>Asked beside the first-order half-life on the same data, in her paired stem <i>"Assuming first-order kinetics &hellip; Assuming zero-order kinetics &hellip;"</i></td>
<td>Not in the readable extract; she never said either way.</td></tr>

<tr><td><b>t&frac12; = {{frac:0.693|k}}</b></td>
<td>k first-order elimination rate constant (hr<sup>&minus;1</sup>); result in time, never reciprocal time</td>
<td>First order only. Constant at every concentration, because <i>"a constant divided by a constant is A constant."</i></td>
<td>Asked in essentially every problem, usually as part a or b. Also run backwards to get k from a stated half-life.</td>
<td>No &mdash; named by her, three times.</td></tr>

<tr><td><b>AUC over one segment</b><br>{{frac:C<sub>n&minus;1</sub> + C<sub>n</sub>|2}} &times; (t<sub>n</sub> &minus; t<sub>n&minus;1</sub>)</td>
<td>C<sub>n&minus;1</sub>, C<sub>n</sub> the two concentrations bounding the segment; t in hours; result in concentration &times; time</td>
<td>Any concentration-time data set, any route. The total AUC is the sum of the segments. She reduces the printed formula to <i>"one half base times height."</i></td>
<td>AUC between two stated hours, from a table.</td>
<td>Yes, page 1, first line.</td></tr>

<tr><td><b>F = {{frac:AUC<sub>oral</sub>|AUC<sub>IV</sub>}}</b></td>
<td>F fraction of the oral dose reaching plasma, no units</td>
<td>Comparing two routes. Printed on Introduction.pdf slide 23 in this bare form; the equation sheet carries the dose-corrected version, F = (AUC<sub>po</sub>/AUC<sub>IV</sub>)(D<sub>IV</sub>/D<sub>po</sub>).</td>
<td>Bioavailability. Module 9, not yet lectured.</td>
<td>Yes, in the dose-corrected form.</td></tr>
</tbody></table>

<p>What separates the two orders, in her own terms: for zero order <i>"rate is independent of the concentration &hellip; While half-life is dependent"</i>; for first order <i>"the rate depends on the rate constant K times the concentration &hellip; At higher concentrations, we have a faster rate."</i> The half-life behaves the opposite way round from the rate in each case. She also flags the axis as a trap: <i>"even if the scale does not say log C, if you look at that scale and you see that &hellip; it's increasing by a func- uh, a function of 10, then that tells you that it is a logarithmic scale. So, don't just look at that straight line and assume &hellip; that it is zero order."</i></p>

<h3>Module 2 &mdash; IV bolus, one and multi-compartment</h3>
<p>What the words "IV bolus" are meant to trigger: <i>"if I tell you that we are administering a drug via IV bolus injection. Then you should think. Whichever form of this equation you like."</i> Input is instantaneous, elimination is first order, and she must tell you the compartment count: <i>"I have to tell you that it follows a one compartment model or a two compartment."</i></p>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>C<sub>p</sub> = {{frac:D<sub>B</sub>|V<sub>D</sub>}}</b></td>
<td>C<sub>p</sub> plasma concentration (mg/L); D<sub>B</sub> amount of drug in the body at that time (mg); V<sub>D</sub> apparent volume of distribution (L)</td>
<td>One compartment, at any time. At time zero D<sub>B</sub> is the dose and C<sub>p</sub> is C<sub>0</sub>, which gives V<sub>D</sub> = D<sub>0</sub>/C<sub>0</sub>.</td>
<td>V<sub>D</sub>, or the amount in the body from a measured concentration.</td>
<td>Yes &mdash; and she also names it as one to hold without the sheet. Both readings stand.</td></tr>

<tr><td><b>k = k<sub>m</sub> + k<sub>e</sub></b></td>
<td>k overall elimination rate constant; k<sub>m</sub> rate constant for metabolism; k<sub>e</sub> rate constant for excretion. All reciprocal time.</td>
<td>Any first-order elimination. <i>"If you see K with no subscript, that is our overall rate constant for elimination. So, all the process is wrapped up into there."</i></td>
<td>Rarely the unknown directly; it fixes what an unsubscripted k means.</td>
<td>No line of the extract carries this sum.</td></tr>

<tr><td><b>dD<sub>B</sub>/dt = &minus;kD<sub>B</sub></b><br>C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup><br>ln C<sub>p</sub> = ln C<sub>p</sub><sup>0</sup> &minus; kt<br>log C<sub>p</sub> = log C<sub>p</sub><sup>0</sup> &minus; {{frac:kt|2.3}}</td>
<td>C<sub>p</sub><sup>0</sup> the concentration extrapolated back to time zero (mg/L); k hr<sup>&minus;1</sup></td>
<td>One compartment, IV bolus, first-order elimination. The deck marks the natural-log form as the one she prefers.</td>
<td>k from two plasma points; C<sub>0</sub> by back-extrapolation; C at a stated time; time to 99.9% eliminated. She warns that C<sub>0</sub> must exceed every sampled point and that the exponent sign flips when solving backwards.</td>
<td>Yes.</td></tr>

<tr><td><b>Cl<sub>T</sub> = k &times; V<sub>D</sub></b><br><b>Cl = {{frac:D<sub>0</sub>|AUC<sub>0&rarr;&infin;</sub>}}</b></td>
<td>Cl<sub>T</sub> total body clearance (L/hr); k hr<sup>&minus;1</sup>; V<sub>D</sub> L; D<sub>0</sub> dose (mg); AUC in mg&middot;hr/L</td>
<td>First-order elimination. Clearance is the volume of plasma cleared of drug per unit time, and it is a constant: <i>"a constant times a constant is a constant."</i> Changing the concentration does not change it.</td>
<td>Cl<sub>T</sub> as part f of her standard battery; and Cl as the bridge from dose to exposure.</td>
<td>Cl = kV<sub>D</sub>: no, named by her. Cl = FD<sub>0</sub>/AUC: yes, page 1.</td></tr>

<tr><td><b>t&frac12; = {{frac:0.693 V<sub>D</sub>|Cl<sub>T</sub>}}</b></td>
<td>Half-life in time, from V<sub>D</sub> in L and Cl<sub>T</sub> in L/hr</td>
<td>The two relations above combined, printed on 4---Clearance-and-Elimination.pdf slide 21. It says which way a half-life moves when clearance falls and volume does not.</td>
<td>The new half-life in renal failure, where clearance drops and V<sub>D</sub> is unchanged.</td>
<td>Not in the readable extract. It is Cl = kV<sub>D</sub> and t&frac12; = 0.693/k combined, and both of those are hers to supply.</td></tr>

<tr><td><b>C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup></b><br>C<sub>p</sub><sup>0</sup> = A + B</td>
<td>A, B intercepts in concentration units (mg/L or mcg/mL); a (alpha) and b (beta) slopes in reciprocal time. <i>"Our A and our B are our intercepts &hellip; our lowercase A and B are the slopes."</i></td>
<td>Two-compartment, IV bolus. Alpha is the larger because <i>"the distribution phase is gonna happen a lot faster than an elimination phase."</i> She hands A, B, alpha and beta over rather than asking for feathering: <i>"I am pretty much gonna give you A, B, alpha, beta."</i></td>
<td>Concentration at a stated time; C<sub>0</sub> as A + B.</td>
<td>Yes, page 1.</td></tr>

<tr><td><b>t&frac12;<sub>&beta;</sub> = {{frac:0.693|b}}</b></td>
<td>b the terminal slope, hr<sup>&minus;1</sup>; result in time</td>
<td>Two compartment. The distribution half-life is not asked: <i>"we don't really care about the half-life of the distribution phase. We care about the half-life of the elimination phase."</i> She names the quantity explicitly on the paper so there is no ambiguity.</td>
<td>The elimination half-life. She warns against the long route: <i>"Don't solve for K and then 0.693 over K. You've, you've done too much work."</i></td>
<td>Not in the readable extract; covered by her first-order half-life carve-out.</td></tr>

<tr><td><b>k = {{frac:(A + B)ab|Ab + Ba}}</b><br><b>k<sub>12</sub> = {{frac:AB(b &minus; a)<sup>2</sup>|(A + B)(Ab + Ba)}}</b><br><b>k<sub>21</sub> = {{frac:Ab + Ba|A + B}}</b></td>
<td>k overall elimination from the central compartment; k<sub>12</sub> transfer central to tissue; k<sub>21</sub> transfer tissue to central. All reciprocal time.</td>
<td>Two-compartment IV bolus, model A: drug moves to and from the tissue compartment and leaves the body from the central compartment only.</td>
<td>Read straight off the given A, B, alpha, beta. Her in-class sheet asked for all three: k 0.272 hr<sup>&minus;1</sup>, k<sub>12</sub> 1.1 hr<sup>&minus;1</sup>, k<sub>21</sub> 0.9 hr<sup>&minus;1</sup>.</td>
<td>Yes, all three.</td></tr>

<tr><td><b>V<sub>p</sub> = {{frac:D<sub>0</sub>|A + B}}</b><br><b>V<sub>p</sub> = {{frac:D<sub>0</sub>|k &times; AUC<sub>0&rarr;&infin;</sub>}}</b><br><b>V<sub>t</sub> = {{frac:V<sub>p</sub>k<sub>12</sub>|k<sub>21</sub>}}</b></td>
<td>V<sub>p</sub> volume of the central compartment (L); V<sub>t</sub> volume of the tissue compartment (L)</td>
<td>Two compartment. The two routes to V<sub>p</sub> answer different data: use the intercepts when A and B are supplied, the second when a dose and an AUC are supplied.</td>
<td>The volume of distribution of the central compartment, by dose divided by A + B.</td>
<td>Yes, all three. In the extract the subscript on k in the AUC form is not resolvable.</td></tr>
</tbody></table>

<p>Reading a semi-log graph, as she will ask it on the exam: a single straight line is one compartment, and a line with a steeper early segment above it is two compartments. <i>"if I give you a graph &hellip; just a log scale &hellip; and I just give you a, a line that looks like this one, the black line. That should say to you that this is a two compartment model. If I gave you a graph on a log scale that looks just like the blue line all by itself, that tells you it's an IV bolus dose one compartment model."</i></p>

<h3>Module 3 &mdash; IV infusion, steady state and loading dose</h3>
<p>The input changes and nothing else does: <i>"the only thing we've changed here, we haven't changed the drug, we've changed the manner that we put the drug in the body."</i> A constant rate in is zero order; elimination out stays first order. <i>"Our input is zero order, constant in, first order out. When we stop the in, then it's just out."</i></p>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>C<sub>ss</sub> = {{frac:R|Cl}} = {{frac:R|kV<sub>D</sub>}}</b></td>
<td>C<sub>ss</sub> steady-state concentration (mg/L); R infusion rate (mg/hr); Cl (L/hr)</td>
<td>At steady state only, where rate in equals rate out. It never contains t, so it says nothing about when steady state arrives.</td>
<td>C<sub>ss</sub> from a rate, or, rearranged, the rate R = C<sub>ss</sub>&middot;Cl needed to reach a target C<sub>ss</sub>. Her recommendation stems ask for the rate.</td>
<td>Yes, as C<sub>ss</sub> = R/Cl.</td></tr>

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
<td>An IV bolus given at the same moment an infusion starts. <i>"We want the loading dose to look like the amount of drug that's in the body at steady state."</i> The first form is only as good as the rate already chosen: <i>"If you just pick a number out of the air, then you're probably not gonna pick the the best loading dose."</i></td>
<td>The loading dose. She prints both routes side by side whenever both inputs are available.</td>
<td>D<sub>L</sub> = R/k: yes. D<sub>L</sub> = C<sub>ss</sub>V<sub>D</sub>: she added it aloud and wrote it on the slide; it is not identifiable in the readable extract, and unreadable line (2) sits directly after D<sub>L</sub> = R/k.</td></tr>

<tr><td><b>C<sub>p</sub> = {{frac:D<sub>L</sub>|V<sub>D</sub>}}e<sup>&minus;kt</sup> + <span class="nw">{{frac:R|kV<sub>D</sub>}}(1 &minus; e<sup>&minus;kt</sup>)</span></b></td>
<td>Both terms in mg/L; t measured from the start of therapy</td>
<td>Loading dose and infusion running together. The two contributions are added: <i>"at any point on the curve, then the concentration here plus the concentration here should equal the concentration there."</i></td>
<td>Concentration at 2, 4 or 6 hours after the start of combined therapy. If D<sub>L</sub> was chosen correctly the sum stays flat at C<sub>ss</sub>.</td>
<td>Yes, printed on the deck as the two-term sum.</td></tr>
</tbody></table>

<p><b>Percent of steady state reached, per half-life of infusion.</b> Built live in the 09-02 lecture from 1 &minus; e<sup>&minus;0.693n</sup>, and the same numbers run the other way for the percent eliminated after an IV bolus.</p>

<table class="reftab"><thead><tr>
<th>Half-lives elapsed</th><th>Percent of C<sub>ss</sub> reached (infusion)</th><th>Percent eliminated (bolus)</th><th>Source</th></tr></thead><tbody>
<tr><td>1</td><td>50%</td><td>50%</td><td>Slide annotation and transcript, both lectures</td></tr>
<tr><td>2</td><td>75%</td><td>75%</td><td>Slide annotation and transcript, both lectures</td></tr>
<tr><td>3</td><td>87.5%</td><td>87.5%</td><td>Slide annotation and transcript, both lectures</td></tr>
<tr><td>4</td><td>93.25%</td><td>&mdash;</td><td>Transcript only, and the two recordings differ: 93.25% on 09-02 and "93" in the 09-09 review. No slide carries a fourth row.</td></tr>
<tr><td>10</td><td>99.9%</td><td>99.9%</td><td>Transcript, both lectures: <i>"it's gonna take 10 half-lives for 99.9% of the drug to be eliminated"</i> and <i>"10 half-lives, we're at 99.9% of the steady-state concentration."</i></td></tr>
<tr><td>11</td><td>99.99%</td><td>&mdash;</td><td>Transcript 09-02: <i>"10 gets us 99.9, 11 gets us 99.99."</i></td></tr>
</tbody></table>

<p>Two non-integer multiples she uses in worked solutions: <b>3.32 half-lives reaches 90%</b> of C<sub>ss</sub> (09-02, offered as her own shortcut and not required), and <b>4.32 half-lives reaches 95%</b> of C<sub>ss</sub>, which is the route in her printed solution to the renal-failure part of IV Infusions Practice 3. Her short answer to "how long to steady state" is fixed: <i>"3 to 5 half-lives, OK?"</i> And the rate does not change it: <i>"if you get a question that says, 'Increasing the rate of infusion will decrease or ha- double or do whatever funkiness to the time that it takes to get to steady state,' we are clear that it has no impact, right? Because it is three to five half-lives. Depends on the half-life, that rate constant K."</i> Raising R raises C<sub>ss</sub> in proportion and shifts the whole curve upward; the plateau still arrives at the same time.</p>

<h3>Module 4 &mdash; elimination, clearance and renal clearance</h3>
<p>The elimination words nest inside one another, and she keeps them distinct: elimination is <i>"all the irreversible processes or irreversible removal of drugs by all routes"</i>; excretion is <i>"removal of intact drug or metabolite"</i>; biotransformation is <i>"chemically converting that um drug in the body to some metabolite."</i> The kidney and the liver are the two major elimination organs.</p>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>Rate of elimination = Cl &times; C<sub>p</sub></b></td>
<td>Rate in amount per time (mcg/min, mg/hr); Cl in volume per time; C<sub>p</sub> in amount per volume</td>
<td>First-order elimination, any route. Clearance is the proportionality factor between the elimination rate and the plasma concentration, which is why clearance stays constant while the rate does not.</td>
<td>The elimination rate at a stated plasma concentration. Her worked example: 15 mL/min &times; 5 mcg/mL = 75 mcg/min.</td>
<td>Yes.</td></tr>

<tr><td><b>Cl = {{frac:FD<sub>0</sub>|AUC<sub>0&rarr;&infin;</sub>}}</b></td>
<td>F bioavailability factor, no units, taken as 1 for an IV dose; D<sub>0</sub> dose (mg); AUC in mg&middot;hr/L</td>
<td>Any route, provided F is known. <i>"Another reason that we like clearance. Is that it directly relates the dose to that area under the curve."</i></td>
<td>Clearance from an AUC, or a dose from a clearance and an AUC.</td>
<td>Yes, and also as D<sub>IV</sub> = (Cl)(AUC<sub>IV</sub>) on page 2.</td></tr>

<tr><td><b>Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub></b></td>
<td>All in L/hr. An unsubscripted Cl means total body clearance.</td>
<td>Clearances add. Renal and hepatic are named as the two main routes on the deck slide.</td>
<td>Hepatic clearance, by subtraction. There is no direct measurement: <i>"we're not gonna sample the liver &hellip; we calculate renal &hellip; and then we subtract renal from total to give us hepatic clearance."</i></td>
<td>Yes, page 1, last line.</td></tr>

<tr><td><b>f<sub>e</sub> = {{frac:D<sub>u</sub><sup>&infin;</sup>|FD<sub>0</sub>}} = {{frac:k<sub>e</sub>|k}}</b><br>so k<sub>e</sub> = f<sub>e</sub>k</td>
<td>f<sub>e</sub> fraction excreted unchanged, no units; D<sub>u</sub><sup>&infin;</sup> cumulative amount of unchanged drug recovered in urine (mg); k<sub>e</sub> excretion rate constant (hr<sup>&minus;1</sup>)</td>
<td>A complete urine collection. Lower-case f<sub>e</sub> is the fraction excreted; capital F is bioavailability. They are different quantities that share a letter.</td>
<td>f<sub>e</sub> from a urine recovery, then k<sub>e</sub> from f<sub>e</sub> and k. Her worked example: 300 mg recovered from a 500 mg IV dose gives f<sub>e</sub> = 0.6, and k<sub>e</sub> = 0.6 &times; 0.0866 = 0.052 hr<sup>&minus;1</sup>.</td>
<td>Yes.</td></tr>

<tr><td><b>Cl<sub>R</sub> = f<sub>e</sub>Cl<sub>T</sub></b><br><b>Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub></b><br><b>Cl<sub>H</sub> = Cl<sub>T</sub> &minus; Cl<sub>R</sub></b></td>
<td>All clearances in L/hr; f<sub>e</sub> dimensionless</td>
<td>Splitting a total clearance into its renal and hepatic parts, once f<sub>e</sub> is known. The two hepatic forms are the same statement.</td>
<td>Cl<sub>R</sub> and Cl<sub>H</sub>, as the closing parts of her five-part clearance problem.</td>
<td>Yes, all three.</td></tr>

<tr><td><b>CrCl = {{frac:(140 &minus; age)(IBW)|72 &times; S<sub>Cr</sub>}}</b><br>&times; 0.85 if female</td>
<td>age in years; IBW ideal body weight in kg; S<sub>Cr</sub> serum creatinine in mg/dL; answer reported in mL/min</td>
<td>Estimating a patient's renal function. Normal on the deck slide is 120&ndash;130 mL/min. The 0.85 factor rests on an assumption she states: <i>"The assumption is that women are smaller than men, less muscular than men."</i></td>
<td>CrCl for a patient vignette, then whether the patient's renal function is reduced. Her worked example: a 45-year-old female, 165 cm, S<sub>Cr</sub> 1.1 mg/dL gives 58 mL/min. The stated actual weight of 61 kg is deliberately unused.</td>
<td>No &mdash; named by her.</td></tr>

<tr><td><b>IBW male = 50 + 2.3 &times; (inches over 5 ft)</b><br><b>IBW female = 45.5 + 2.3 &times; (inches over 5 ft)</b></td>
<td>Result in kg; the bracket is height in inches minus 60</td>
<td>All patients in this course are 5 ft or taller, and ideal body weight is always the weight used. No adjusted or actual body weight decision will be asked.</td>
<td>The IBW that feeds Cockcroft-Gault. Her worked example: a female 65 inches tall gives 45.5 + 2.3(5) = 57 kg.</td>
<td>No &mdash; named by her.</td></tr>

<tr><td><b>pH = pKa + log {{frac:ionized|nonionized}}</b><br><b>pH = pKa + log {{frac:nonionized|ionized}}</b></td>
<td>pKa of the drug; weak acids have pKa values 3&ndash;8 and weak bases 7.5&ndash;10.5, per the slide</td>
<td>Reabsorption of weak acids and weak bases from the renal tubule, which depends on urine pH and on the drug's pKa.</td>
<td>Nothing yet. She posed the two questions and the recording ends mid-answer.</td>
<td>Both forms are printed on 4---Clearance-and-Elimination.pdf slide 20, but the text extract of that slide interleaves the two numerators and denominators, so which form is labelled for acids and which for bases cannot be read off it.</td></tr>
</tbody></table>

<p><b>The three renal mechanisms, and the 120 mL/min rule.</b> Renal clearance is the net result of glomerular filtration, active tubular secretion and tubular reabsorption. Filtration is passive diffusion across the glomerulus and averages 120 mL/min. Filtration and secretion both add drug to the tubular lumen; reabsorption moves drug back into the blood. So a renal clearance above 120 mL/min means secretion is contributing on top of filtration, and one below 120 mL/min means some drug is being reabsorbed. Her tolerance around the number: <i>"And I'm saying 120. If it's 119, 121, OK, let's call that filtration. If it's 250, then let's assume that we've got some active secretion going on."</i></p>

<h3>Module 5 &mdash; oral absorption, single dose</h3>
<p>The third input type: <i>"we have not had 1st order input, OK? It's all been either instantaneous or zero order &hellip; today we will talk about The kinetics of following oral administration."</i> First order in and first order out, so the curve rises to a peak and then falls. <i>"if I give you a curve on the exam and it looks like this &hellip; where there is a clear peak &hellip; I want you to identify that as an oral input."</i> A capital F in a stem is the signal: <i>"when you see a capital F, You should think oral."</i></p>

<table class="reftab"><thead><tr>
<th style="width:30%">Equation, as she writes it</th><th style="width:20%">Symbols and units</th><th style="width:20%">Applies when</th><th style="width:18%">Usually asked for</th><th style="width:12%">On the sheet</th></tr></thead><tbody>

<tr><td><b>C<sub>p</sub> = {{frac:Fk<sub>a</sub>D<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}} &times; <span class="nw">(e<sup>&minus;kt</sup> &minus; e<sup>&minus;k<sub>a</sub>t</sup>)</span></b></td>
<td>F oral bioavailability fraction, no units; k<sub>a</sub> first-order absorption rate constant (hr<sup>&minus;1</sup>); k elimination rate constant (hr<sup>&minus;1</sup>); D<sub>0</sub> oral dose (mg); V<sub>D</sub> (L); C<sub>p</sub> (mg/L or mcg/mL)</td>
<td>Single oral dose, one compartment, first-order absorption and first-order elimination. The bracket is drug in minus drug out. The lumped prefactor is <b>not</b> C<sub>0</sub>: <i>"this big portion right here does not represent C0."</i></td>
<td>Concentration at any stated time; C<sub>max</sub> once t<sub>max</sub> is known; and, rearranged, V<sub>D</sub> back-solved from a given prefactor. Named error: <i>"Do not forget the volume of distribution."</i></td>
<td>Yes, page 1.</td></tr>

<tr><td><b>t<sub>max</sub> = {{frac:ln(k<sub>a</sub>/k)|k<sub>a</sub> &minus; k}}</b></td>
<td>Both rate constants in the same reciprocal time unit; result in time</td>
<td>Single oral dose. It contains no dose and no volume, so t<sub>max</sub> depends only on the two rate constants: <i>"T-Max depends solely on the relationship between K and KA."</i> Doubling the dose does not move it.</td>
<td>t<sub>max</sub>, always, and always before C<sub>max</sub>: <i>"if you are asked for C-Max, and I will ask you for CMax, you must find TMax first."</i> Named errors: mixing time units, and using a half-life where a rate constant belongs.</td>
<td>Yes, page 1.</td></tr>

<tr><td><b>t&frac12;<sub>a</sub> = {{frac:0.693|k<sub>a</sub>}}</b></td>
<td>k<sub>a</sub> hr<sup>&minus;1</sup>; result in time</td>
<td>The absorption half-life, and the usual way k<sub>a</sub> is handed over: stems give "half-life of absorption is 45 minutes" and the conversion to k<sub>a</sub> = 0.693/0.75 = 0.924 hr<sup>&minus;1</sup> is the first step.</td>
<td>k<sub>a</sub> from a stated absorption half-life, or the absorption half-life from a k<sub>a</sub> read off a given equation. An unqualified t&frac12; means elimination: <i>"If it's just T1/2, then your assumption is that I'm looking for the half-life of elimination."</i></td>
<td>Not in the readable extract; covered by her first-order half-life carve-out.</td></tr>

<tr><td><b>C<sub>max</sub></b>: substitute t<sub>max</sub> into the C<sub>p</sub> equation above</td>
<td>Result in mg/L or mcg/mL</td>
<td>Single oral dose. There is no separate single-dose C<sub>max</sub> expression on the deck or on the sheet for this module &mdash; the sheet's standalone C<sub>max</sub> forms all carry a dosing interval and belong to multiple dosing.</td>
<td>C<sub>max</sub>, in every worked example. Her values: 12.17 mg/L, 55.4 mg/L, about 13 mg/L, 12.14 mcg/mL.</td>
<td>By substitution only.</td></tr>
</tbody></table>

<p><b>What moves when a parameter changes</b>, in her own summary. Increasing the <b>dose</b>: C<sub>max</sub> and AUC rise in proportion, t<sub>max</sub> does not move, the absorption and elimination rates rise because more drug is present, and k and k<sub>a</sub> are unchanged. Increasing <b>k<sub>a</sub></b> relative to k: C<sub>max</sub> is higher, t<sub>max</sub> is earlier, AUC is relatively unchanged, because <i>"if we're just changing KA we're not changing the clearance at all."</i> Increasing <b>k</b>: C<sub>max</sub> is lower, t<sub>max</sub> is earlier, and AUC falls, because <i>"if we change the K, we are effectively changing the clearance."</i> She notes the AUC claim for varying k<sub>a</sub> comes from the textbook table rather than from the slide graph.</p>

<p><b>Which process sets the terminal slope.</b> Disposition rate limiting is the usual case, where the absorption half-life is much shorter than the elimination half-life, so k<sub>a</sub> is much larger than k and the tail of the curve falls with k. Absorption rate limiting is the other case, where the absorption half-life is longer. A modified-release oral product that releases at a constant rate is zero-order in and first-order out, which is the shape of an IV infusion rather than of an ordinary oral dose &mdash; her reason for the word "usually" on the summary slide.</p>

<h3>The equation sheet as a whole</h3>
<p>BasicPharmacokineticsEquations.pdf runs to two pages. It is not organised by module, so a line for a module not yet lectured sits beside one from Module 1. Her instruction about using it: <i>"before you grab your calculator, before, for any question, and before you start flipping to the equation sheet, think about what is being asked of you and what you need."</i></p>

<table class="reftab"><thead><tr>
<th style="width:26%">Group</th><th style="width:44%">Lines carried</th><th>Module</th></tr></thead><tbody>
<tr><td>Area under the curve</td><td>The trapezoidal rule for one segment</td><td>Module 1</td></tr>
<tr><td>First-order decline</td><td>C = C<sub>0</sub>e<sup>&minus;kt</sup>, ln C = ln C<sub>0</sub> &minus; kt, log C = log C<sub>0</sub> &minus; kt/2.3; and the same three in D</td><td>Modules 1 and 2</td></tr>
<tr><td>Volume and concentration</td><td>C<sub>p</sub> = D<sub>B</sub>/V<sub>D</sub></td><td>Module 2</td></tr>
<tr><td>Infusion</td><td>C<sub>p</sub> = (R/Cl)(1 &minus; e<sup>&minus;kt</sup>), C<sub>ss</sub> = R/Cl, D<sub>L</sub> = R/k</td><td>Module 3</td></tr>
<tr><td>Two compartment</td><td>C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup>; k, k<sub>12</sub>, k<sub>21</sub> from A, B, a, b; V<sub>p</sub> two ways; V<sub>t</sub></td><td>Module 2</td></tr>
<tr><td>Clearance and elimination</td><td>Cl<sub>T</sub> = FD<sub>0</sub>/AUC; f<sub>e</sub> = D<sub>u</sub><sup>&infin;</sup>/FD<sub>0</sub> = k<sub>e</sub>/k; Cl<sub>R</sub> = f<sub>e</sub>Cl<sub>T</sub>; Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub>; rate of elimination = (Cl)(C<sub>p</sub>); Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub></td><td>Module 4</td></tr>
<tr><td>Single oral dose</td><td>The full C<sub>p</sub> equation and t<sub>max</sub></td><td>Module 5</td></tr>
<tr><td>Multiple dosing</td><td>D<sub>max</sub>, D<sub>min</sub>, D<sub>avg</sub>, C<sub>max</sub>, C<sub>min</sub>, C<sub>avg</sub>, and C<sub>p</sub> after n doses, all carrying a dosing interval; plus multiple-oral-dose C<sub>max</sub>, C<sub>min</sub> and t<sub>max</sub> on page 2</td><td>Modules 6 to 8, not yet lectured</td></tr>
<tr><td>Bioavailability</td><td>F = (AUC<sub>po</sub>/AUC<sub>IV</sub>)(D<sub>IV</sub>/D<sub>po</sub>); F<sub>rel</sub> = (AUC<sub>A</sub>/AUC<sub>B</sub>)(D<sub>B</sub>/D<sub>A</sub>); D<sub>IV</sub> = (Cl)(AUC<sub>IV</sub>)</td><td>Module 9, not yet lectured</td></tr>
<tr><td>Shelf life and stability</td><td>An E and E<sub>0</sub> log-decline line, and three t<sub>eff</sub> forms including t<sub>eff</sub> = 1.44 t&frac12; ln[D<sub>0</sub>/(C<sub>eff</sub>V<sub>D</sub>)]</td><td>Chemical kinetics; not lectured in Modules 1 to 5</td></tr>
<tr><td>Nonlinear pharmacokinetics</td><td>R = V<sub>max</sub>C<sub>ss</sub>/(K<sub>M</sub> + C<sub>ss</sub>); K<sub>M</sub> from two rate and concentration pairs; t&frac12; = 0.693(K<sub>M</sub> + C<sub>p</sub>)V<sub>D</sub>/V<sub>max</sub>; Cl<sub>T</sub> = V<sub>max</sub>/(K<sub>M</sub> + C<sub>p</sub>)</td><td>Final exam material</td></tr>
<tr><td>Unreadable</td><td>Four lines come through as replacement characters and are described in the note above: one short line on page 1 before the first-order block, one five-symbol line after D<sub>L</sub> = R/k, the long multiple-oral-dose line on page 1, and one seven-symbol line on page 2 after D<sub>IV</sub> = (Cl)(AUC<sub>IV</sub>)</td><td>&mdash;</td></tr>
</tbody></table>

<p class="sub">Nothing on this page is a statement about what the paper will ask. The five entries in the first table are the ones Dr. Mosley said out loud she does not supply; everything else here reports what the equation sheet extract does and does not contain, and says so when it cannot be read.</p>
`;
