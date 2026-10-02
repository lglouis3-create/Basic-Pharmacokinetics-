/* ==========================================================================
   TELL APART
   ==========================================================================
   Pairs and sets that share wording, with the one feature that separates
   them and what choosing the wrong one says about the reasoning behind it.
   Same shape as reference.js: HTML in a template literal — no backtick and
   no dollar-brace inside. Each <h3> becomes a jump-list entry.
   {{fig:key|caption}} tokens resolve against images.json; none are used here.

   SOURCES. Every claim is one a source makes: a printed slide in one of the
   five lectured decks, Dr. Mosley's spoken words recorded in
   TRANSCRIPT_CUES.md, or her own printed worked solutions recorded in
   STYLE.md. Where two sources differ, both are stated.
   ========================================================================== */
const TELL_HTML = `
<h2>Tell apart</h2>
<p class="sub">Things that share wording, the one feature that separates them, and what picking the wrong one says about the reasoning behind it. Nothing here is scored.</p>

<h3>Orders, rates and half-lives</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Zero order</b> against <b>first order</b></td>
<td>Whether the rate depends on how much drug is present.<ul class="tlist">
<li>Zero order: the amount or concentration falls at a constant rate, and the rate does not depend on concentration.</li>
<li>First order: the amount or concentration falls at a rate proportional to what remains. The rate is highest when the concentration is highest, and slows as the concentration falls.</li>
<li>Everything else follows from that one difference.</li>
<li>The rate constant of a zero-order process carries amount or concentration per unit time, mg/mL per day. The rate constant of a first-order process carries reciprocal time, hr<sup>&minus;1</sup>.</li>
<li>Zero order is a straight line on linear axes and curves on semi-logarithmic axes.</li>
<li>First order curves on linear axes and is a straight line on semi-logarithmic axes.</li>
</ul></td>
<td>Reading the plot before reading the axis.<ul class="tlist">
<li>A straight line on an axis labelled 1, 10, 100, 1000 is a first-order process on a semi-logarithmic scale, not a zero-order process.</li>
<li>The axis will not say "log".</li>
<li>A second route to the error is confusing rate with half-life: the first-order <i>rate</i> is not constant, and the first-order <i>half-life</i> is.</li>
<li>So a student who has learned "first order is the constant one" attaches it to the wrong quantity.</li>
</ul></td>
<td>Introduction.pdf slides 17, 18, 21; transcript 08-19, 08-24, 09-09</td></tr>

<tr><td><b>Half-life of a zero-order process</b> against <b>half-life of a first-order process</b></td>
<td>Whether the starting concentration appears in the formula.<ul class="tlist">
<li>Zero order: t&frac12; = C<sub>0</sub>/2k. It contains C<sub>0</sub>, so the half-life changes when the starting concentration changes, and falls as the concentration falls.</li>
<li>First order: t&frac12; = 0.693/k. It contains no concentration term, so it is the same at every concentration.</li>
<li>Her reason for the second: 0.693 is a constant and k is a constant, and a constant divided by a constant is a constant.</li>
</ul></td>
<td>Carrying "half-life is a property of the drug" across from first order to zero order.<ul class="tlist">
<li>On a zero-order data set, answering 0.693/k uses a relation that does not apply to a process whose rate does not depend on concentration.</li>
<li>The reverse error is asking for C<sub>0</sub> on a first-order problem.</li>
<li>That suggests the order was classified from the equation reached for, not from the data.</li>
</ul></td>
<td>Introduction.pdf slide 19; transcript 08-19 worked examples (g) and (h), 09-09</td></tr>

<tr><td><b>Rate</b> against <b>rate constant</b></td>
<td>Whether the number changes as the concentration changes.<ul class="tlist">
<li>A rate is how much drug leaves per unit time. For a first-order process it changes throughout the curve.</li>
<li>A rate constant is the proportionality factor in the rate law. It does not change with concentration.</li>
<li>Their units differ, which is the quickest way to decide which one a number is.</li>
<li>A rate constant is never negative, whichever order it belongs to.</li>
</ul></td>
<td>Answering a select-all about first-order processes with "a constant rate of elimination".<ul class="tlist">
<li>The rate of a first-order process is constantly changing; what is constant is the half-life.</li>
<li>A negative rate constant means the minus sign of the rate law has been folded into the constant.</li>
</ul></td>
<td>Transcript 08-19 polls 4 and 5, 08-26 paper quiz question 2</td></tr>

<tr><td><b>A straight line on linear axes</b> against <b>a straight line on semi-logarithmic axes</b></td>
<td>Which axis is logarithmic.<ul class="tlist">
<li>A semi-logarithmic plot is logarithmic on the concentration axis only.</li>
<li>Its axis labels step by a factor of 10, not by equal increments.</li>
<li>The word "log" is usually not printed on it.</li>
</ul></td>
<td>Concluding zero order from any straight line.<ul class="tlist">
<li>She names this directly: read the scale before deciding.</li>
<li>A first-order curve replotted on a logarithmic concentration axis is also straight.</li>
</ul></td>
<td>Introduction.pdf slide 21; transcript 08-19, 08-26, 09-09 cue 13</td></tr>
</tbody></table>

<h3>The elimination vocabulary</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Excretion</b>, <b>biotransformation</b>, <b>elimination</b> and <b>disposition</b></td>
<td>How much of the pathway each word covers, and whether the drug is chemically changed.<ul class="tlist">
<li>Excretion: removal of the intact drug or metabolite, with no chemical change.</li>
<li>Biotransformation, also called metabolism: chemical conversion of one species to another.</li>
<li>Elimination: the irreversible loss of drug from the body by all routes. It contains both excretion and biotransformation.</li>
<li>Disposition is wider still: everything that happens to the drug after systemic absorption, which is distribution plus elimination.</li>
<li>Her own summary: <i>"Metabolism and excretion are both elimination terms &hellip; Elimination is kind of our catch-all."</i></li>
</ul></td>
<td>Treating the four as interchangeable words for "the drug leaving".<ul class="tlist">
<li>Choosing excretion where elimination is meant drops metabolism from the answer.</li>
<li>Choosing elimination where disposition is meant drops distribution.</li>
<li>Answering "disposition" to a question about irreversible loss includes a reversible process, since distribution is reversible by definition.</li>
</ul></td>
<td>Introduction.pdf slides 4 and 5; 4---Clearance-and-Elimination.pdf slide 3; transcript 08-17, 09-14</td></tr>

<tr><td><b>Clearance</b> against <b>rate of elimination</b></td>
<td>Whether the quantity is constant.<ul class="tlist">
<li>The rate of elimination is Cl &times; C<sub>p</sub>, and it changes as the concentration changes.</li>
<li>Clearance is the proportionality factor between them. It stays constant for a first-order process, which is why she prefers working with it.</li>
<li>Clearance is a volume per unit time; the rate of elimination is an amount per unit time.</li>
</ul></td>
<td>Answering true to "clearance increases as concentration increases".<ul class="tlist">
<li>Changing the concentration changes the elimination rate, not the clearance.</li>
<li>The same reasoning error produces a clearance quoted in mg/hr.</li>
</ul></td>
<td>2IVBolusAdministration.pdf slide "Clearance"; 4---Clearance-and-Elimination.pdf slide 5; transcript 08-24 poll 2</td></tr>
</tbody></table>

<h3>What is being measured</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Serum</b>, <b>plasma</b> and <b>whole blood</b></td>
<td>What was removed from the sample, and how.<ul class="tlist">
<li>Whole blood is drawn with an anticoagulant such as heparin or EDTA. It keeps all the cellular and protein elements.</li>
<li>Plasma is the liquid supernatant left after centrifuging non-clotted whole blood that contains an anticoagulant. It keeps all the proteins, including albumin.</li>
<li>Serum is obtained after the blood has been allowed to clot and the clot has been removed. It has neither the cellular elements nor fibrinogen nor the other clotting factors.</li>
<li>Serum and plasma are the usual measurement fluids, because they reduce the drug's interaction with other blood components.</li>
<li>The subscript states which fluid: C<sub>p</sub> is concentration in plasma, C<sub>s</sub> in serum, and a bare C leaves it unspecified.</li>
</ul></td>
<td>Ignoring the subscript.<ul class="tlist">
<li>A stem that says C<sub>p</sub> has told you the fluid.</li>
<li>A stem that says whole blood has told you the sample still contains the cells and the clotting proteins.</li>
<li>Answering "whole blood" to what is most commonly measured suggests the choice of fluid was read as a matter of convenience, not as a decision about what the drug can bind to.</li>
</ul></td>
<td>Introduction.pdf slide 10; transcript 08-17, 08-19 poll 3</td></tr>
</tbody></table>

<h3>Models</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Mammillary</b>, <b>catenary</b> and <b>physiologic</b> models</td>
<td>How the compartments are connected, and whether compartments are used at all.<ul class="tlist">
<li>Mammillary: every peripheral compartment connects directly to the same central compartment. The deck draws compartment 1 in the middle, with k<sub>12</sub>/k<sub>21</sub> to compartment 2 and k<sub>13</sub>/k<sub>31</sub> to compartment 3.</li>
<li>Catenary: the compartments sit in a single chain, 1 to 2 to 3, so drug cannot reach compartment 3 without passing through compartment 2.</li>
<li>Physiologic: not a compartment model at all. It is a blood flow or perfusion model built on known anatomic and physiologic data.</li>
<li>This course uses the mammillary model. Physiologic models are set aside because they require more input than the course takes on.</li>
</ul></td>
<td>Choosing by the number of compartments instead of by the connections.<ul class="tlist">
<li>Both compartment models can have three boxes. What differs is whether the outer boxes each connect to the centre or are connected in series.</li>
<li>Choosing physiologic for a question about how compartments connect means the word "model" was matched without noticing that a physiologic model replaces compartments with organs and blood flows.</li>
</ul></td>
<td>Introduction.pdf slides 12 and 13; transcript 08-19 poll 2, 09-09</td></tr>

<tr><td><b>One compartment</b> against <b>two compartments</b></td>
<td>Whether distribution takes time.<ul class="tlist">
<li>One compartment: the drug is uniformly distributed throughout the body as soon as it enters, and elimination begins immediately. A semi-logarithmic plot is a single straight line.</li>
<li>Two compartments: the drug reaches some organs preferentially before it is uniformly distributed.</li>
<li>So the semi-logarithmic plot has a steeper early distribution phase above a shallower terminal elimination phase.</li>
<li>On the exam the compartment count is either stated in the stem or readable from the graph; she says she must tell you which.</li>
</ul></td>
<td>Fitting one straight line through all the points of a two-compartment data set.<ul class="tlist">
<li>That produces one slope where there are two, and the resulting half-life belongs to neither phase.</li>
<li>Reading the early steep segment as noise, not as the distribution phase, is the same error.</li>
</ul></td>
<td>2IVBolusAdministration.pdf slides "Why Multicompartment Models?" and "Plasma Level-Time Curve for Two-Compartment Model"; transcript 08-26 cues 8 and 9</td></tr>
</tbody></table>

<h3>The rate constants</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>k</b>, <b>k<sub>e</sub></b>, <b>k<sub>m</sub></b> and <b>k<sub>a</sub></b></td>
<td>Which process each one counts, and which direction it points.<ul class="tlist">
<li>An unsubscripted k is the overall elimination rate constant, with every route of loss included: k = k<sub>m</sub> + k<sub>e</sub>.</li>
<li>k<sub>e</sub> is the rate constant for excretion alone, obtained as f<sub>e</sub>k.</li>
<li>k<sub>m</sub> is the rate constant for metabolism alone.</li>
<li>k<sub>a</sub> is the only one that points into the body. It is the first-order rate constant for absorption and appears only for extravascular dosing.</li>
<li>All four carry reciprocal time, so the units cannot separate them.</li>
</ul></td>
<td>Using k<sub>e</sub> where k belongs in a half-life.<ul class="tlist">
<li>k<sub>e</sub> is a component of k, so 0.693/k<sub>e</sub> is longer than the elimination half-life and is not a quantity the course asks for.</li>
<li>Using k<sub>a</sub> where k belongs swaps the two exponentials in the oral equation.</li>
<li>In the oral problems she supplies both half-lives. Converting only one of them and reusing it twice misses that two different rate constants are in play.</li>
</ul></td>
<td>2IVBolusAdministration.pdf slide "One-Compartment Open Model"; 4---Clearance-and-Elimination.pdf slide 10; 5---Pharmacokinetics-of-Oral-Absorption.pdf slide "First-Order Absorption Model"; transcript 08-24, 09-14, 09-21</td></tr>

<tr><td><b>alpha</b> against <b>beta</b>, and <b>A</b> against <b>B</b></td>
<td>Which are slopes and which are intercepts, and which phase each belongs to.<ul class="tlist">
<li>In C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup>, capital A and capital B are the two intercepts. They are obtained by extrapolation and carry concentration units.</li>
<li>Lower-case a (alpha) and b (beta) are the two slopes and carry reciprocal time.</li>
<li>Alpha is the larger slope, because distribution happens faster than elimination. The alpha term, with intercept A, describes the distribution phase.</li>
<li>Beta is the terminal slope and is the elimination rate constant.</li>
<li>So the elimination half-life is 0.693/b, and C<sub>0</sub> is A + B.</li>
</ul></td>
<td>Dividing 0.693 by the larger number.<ul class="tlist">
<li>That returns the distribution half-life, which she says is not what is wanted.</li>
<li>Adding a slope to an intercept, or reporting A + B in reciprocal time, means the four symbols were read as four interchangeable constants, not as two slope-intercept pairs.</li>
<li>She gives all four rather than asking for feathering, so the only work is deciding which is which.</li>
</ul></td>
<td>2IVBolusAdministration.pdf slides "Concentration of Drug in the Central Compartment" and "Beta Half-life"; transcript 08-26, 09-09 cue 12</td></tr>
</tbody></table>

<h3>The volumes</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>V<sub>D</sub></b>, <b>V<sub>p</sub></b> and <b>V<sub>t</sub></b>, and the two routes to <b>V<sub>p</sub></b></td>
<td>How many compartments the model has, and which compartment the volume belongs to.<ul class="tlist">
<li>V<sub>D</sub> is the apparent volume of distribution of a one-compartment model, V<sub>D</sub> = D<sub>B</sub>/C<sub>p</sub>.</li>
<li>V<sub>D</sub> is a hypothetical volume, not a real one: a proportionality constant relating the amount in the body to the measured concentration.</li>
<li>V<sub>p</sub> is the volume of the central compartment of a two-compartment model.</li>
<li>V<sub>t</sub> is the volume of the tissue compartment, with V<sub>t</sub> = V<sub>p</sub>k<sub>12</sub>/k<sub>21</sub>.</li>
<li>The two routes to V<sub>p</sub> answer different data: V<sub>p</sub> = D<sub>0</sub>/(A + B) when the intercepts are supplied, and V<sub>p</sub> = D<sub>0</sub>/(k &times; AUC) when a dose and an area are supplied.</li>
<li>All three are volumes and are reported in litres.</li>
</ul></td>
<td>Dividing the dose by a single measured concentration in a two-compartment problem.<ul class="tlist">
<li>That uses a concentration from part way down the curve instead of the extrapolated intercept sum A + B, and returns neither V<sub>p</sub> nor V<sub>D</sub>.</li>
<li>Reporting a volume in kilograms comes from the percent-of-body-weight framing: 1 L is taken as 1 kg for the arithmetic, but the answer is still a volume.</li>
<li>A large V<sub>D</sub> means the drug is more concentrated in extravascular tissue and less concentrated intravascularly.</li>
<li>A small V<sub>D</sub> means the drug is bound to plasma protein or otherwise held in the vascular region.</li>
<li>Reading the size the other way round inverts the conclusion about where the drug has gone.</li>
</ul></td>
<td>2IVBolusAdministration.pdf slides "Volume of Distribution" and "Apparent Volumes of Distribution"; transcript 08-24, 08-26, 09-09</td></tr>
</tbody></table>

<h3>Clearance and the kidney</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Total clearance</b>, <b>renal clearance</b>, <b>hepatic clearance</b> and <b>f<sub>e</sub></b></td>
<td>Which organ is clearing the drug, and whether the number is a clearance at all.<ul class="tlist">
<li>Cl with no subscript, or Cl<sub>T</sub>, is total body clearance and equals Cl<sub>R</sub> + Cl<sub>H</sub>.</li>
<li>Cl<sub>R</sub> = f<sub>e</sub>Cl<sub>T</sub> is the renal part.</li>
<li>Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub> is the hepatic part. It is obtained by subtraction, not by measurement, because the liver is not sampled.</li>
<li>f<sub>e</sub> is not a clearance. It is the fraction of the dose recovered unchanged in urine, D<sub>u</sub> divided by FD<sub>0</sub>.</li>
<li>f<sub>e</sub> also equals k<sub>e</sub>/k, and it has no units.</li>
</ul></td>
<td>Reporting f<sub>e</sub> with units, or reporting a renal clearance where the fraction was asked for.<ul class="tlist">
<li>Both come from reading f<sub>e</sub> as a rate of urinary loss instead of a dimensionless share of the dose.</li>
<li>Computing hepatic clearance from a liver measurement means the additivity route was not used. No such measurement is given in this course.</li>
</ul></td>
<td>4---Clearance-and-Elimination.pdf slides 8, 9, 10, 11; transcript 09-14</td></tr>

<tr><td><b>Renal clearance</b> against <b>creatinine clearance</b></td>
<td>Whose clearance is being estimated.<ul class="tlist">
<li>Renal clearance is the clearance of the drug by the kidney, obtained from f<sub>e</sub> and the total clearance.</li>
<li>Creatinine clearance is an estimate of the patient's glomerular filtration rate, and so of the patient's renal function. It is obtained from Cockcroft-Gault.</li>
<li>Creatinine clearance is about the patient, not about the drug.</li>
<li>She names this as the point where the two blur: <i>"things get a little blurry when we're talking about renal clearance, and then I'm gonna ask you to calculate creatinine clearance, and I want you to think about the, the what I'm asking you each time."</i></li>
</ul></td>
<td>Feeding a drug's f<sub>e</sub> into Cockcroft-Gault, or comparing a drug's renal clearance in L/hr against the 120 mL/min figure without converting.<ul class="tlist">
<li>The units separate them in practice: renal clearance of a drug is quoted in L/hr, creatinine clearance in mL/min.</li>
</ul></td>
<td>4---Clearance-and-Elimination.pdf slides 9 and 15; transcript 09-14 cues 6 and 8</td></tr>

<tr><td><b>Glomerular filtration</b>, <b>active tubular secretion</b> and <b>tubular reabsorption</b></td>
<td>Which direction the drug moves, and whether energy is required.<ul class="tlist">
<li>Filtration is passive diffusion across the glomerulus and averages 120 mL/min.</li>
<li>Active tubular secretion moves drug from the blood into the urine using a transporter. It requires energy and adds to what filtration removes.</li>
<li>Tubular reabsorption moves drug from the urine back into the blood, so it subtracts.</li>
<li>Filtration and secretion both add drug to the tubular fluid; reabsorption returns it to the bloodstream.</li>
<li>The inference rule: a renal clearance above about 120 mL/min means secretion is contributing on top of filtration.</li>
<li>A renal clearance below 120 mL/min means some drug is being reabsorbed.</li>
<li>Her tolerance on the number: 119 or 121 counts as filtration; 250 means secretion.</li>
</ul></td>
<td>Treating a renal clearance below 120 mL/min as evidence of reduced filtration.<ul class="tlist">
<li>Within this rule the comparison is against the filtration rate itself, so a value below it points to drug returning to the blood.</li>
<li>Concluding secretion from a value near 120 means the stated tolerance was not applied.</li>
<li>Calling reabsorption an active process adds a transporter the deck does not put there.</li>
</ul></td>
<td>4---Clearance-and-Elimination.pdf slides 12, 13, 18, 19; transcript 09-14 cue 9</td></tr>

<tr><td><b>Creatinine</b> against <b>inulin</b> for measuring glomerular filtration rate</td>
<td>Whether the marker is already in the body, and how cleanly it is filtered.<ul class="tlist">
<li>Glomerular filtration rate is measured with a drug eliminated primarily by filtration only, neither reabsorbed nor secreted.</li>
<li>Inulin is almost completely filtered, so it is the better marker. But it is not native to the body and has to be administered, which makes the procedure more involved.</li>
<li>Creatinine comes from the breakdown of muscle and is already present, which is why it is the common clinical choice.</li>
<li>Creatinine is also secreted, so it gives an estimate, not a direct measurement.</li>
<li>The deck slide states that both are used clinically.</li>
</ul></td>
<td>Calling creatinine clearance a measurement of glomerular filtration rate rather than an estimate of it.<ul class="tlist">
<li>The secretion of creatinine is the reason for the word "estimate".</li>
<li>It is also the reason Cockcroft-Gault carries assumptions she names: the 0.85 female factor, and that a serum creatinine may not represent renal function in a person with unusually low or unusually high muscle mass.</li>
</ul></td>
<td>4---Clearance-and-Elimination.pdf slide 14; transcript 09-14</td></tr>

<tr><td>Capital <b>F</b> against lower-case <b>f<sub>e</sub></b></td>
<td>What fraction of what.<ul class="tlist">
<li>Capital F is the bioavailability factor: the fraction of the dose that reaches systemic circulation. It is taken as 1 for an intravenous dose.</li>
<li>Lower-case f<sub>e</sub> is the fraction of the dose excreted unchanged in the urine.</li>
<li>Her own separation: <i>"lowercase fe is our fraction excreted, capital F is our bioavailability factor."</i></li>
<li>Both are dimensionless, so units do not distinguish them.</li>
</ul></td>
<td>Setting F to the urinary recovery fraction in a clearance calculation.<ul class="tlist">
<li>On an IV problem F is 1 whatever the urine shows, and f<sub>e</sub> then splits that clearance into renal and hepatic parts.</li>
<li>A capital F in a stem points to an oral dose.</li>
</ul></td>
<td>4---Clearance-and-Elimination.pdf slides 7 and 10; transcript 09-14, 09-21 cue 9</td></tr>
</tbody></table>

<h3>Concentrations and doses</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>C<sub>ss</sub></b>, <b>C<sub>max</sub></b> and <b>C<sub>0</sub></b></td>
<td>Which route produced the curve, and where on it the concentration sits.<ul class="tlist">
<li>C<sub>0</sub> is the concentration at time zero after an IV bolus, the highest point on that curve. It is obtained as D<sub>0</sub>/V<sub>D</sub> or by back-extrapolation; for a two-compartment bolus it is A + B.</li>
<li>C<sub>ss</sub> is the plateau of a continuous infusion, R/Cl. It is reached only asymptotically, after three to five half-lives, and it contains no time term.</li>
<li>C<sub>max</sub> is the peak of a single oral dose. It occurs at t<sub>max</sub>, not at time zero, because the drug has to be absorbed first.</li>
<li>Each belongs to one input type: instantaneous, constant rate, and first-order in.</li>
</ul></td>
<td>Using D<sub>0</sub>/V<sub>D</sub> for an oral peak.<ul class="tlist">
<li>That is the concentration the whole dose would produce if it arrived instantly and none were lost. It is neither C<sub>max</sub> nor a concentration on the oral curve at all.</li>
<li>Reading C<sub>ss</sub> off a curve that has run for less than three to five half-lives reports the current concentration as the plateau.</li>
<li>Her drawing instruction sorts the three: an IV bolus starts high and comes down, an infusion starts low and builds, and an oral dose rises to a peak and then falls.</li>
</ul></td>
<td>2IVBolusAdministration.pdf slide "Volume of Distribution"; 3IntravenousInfusions.pdf slide "Drug Concentration at Steady-State"; 5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Cp vs. Time for a Single Oral Dose"; transcript 09-02 cue 1, 09-21 cue 3</td></tr>

<tr><td><b>Loading dose</b> against <b>maintenance infusion rate</b></td>
<td>Which parameter sets each one.<ul class="tlist">
<li>The loading dose fills the volume of distribution: D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub>. It is set by the volume and is an amount, in mg.</li>
<li>The infusion rate replaces what is being cleared: R = C<sub>ss</sub> &times; Cl. It is set by the clearance and is an amount per time, in mg/hr.</li>
<li>The two are linked through D<sub>L</sub> = R/k, so that form gives a sensible loading dose only once an appropriate rate has been chosen.</li>
<li>A change in clearance alone therefore changes the rate required and leaves the loading dose unchanged.</li>
<li>In her IV Infusions Practice 4 solution, a patient whose clearance falls needs a smaller infusion rate and the same 1000 mg loading dose, because V<sub>D</sub> did not change.</li>
</ul></td>
<td>Adjusting the loading dose for renal impairment.<ul class="tlist">
<li>Renal impairment reduces clearance, which is in the rate and not in D<sub>L</sub> = C<sub>ss</sub>V<sub>D</sub>.</li>
<li>Adjusting the rate for a change in volume is the same error the other way round.</li>
<li>If the loading dose and the rate are both correct, the concentration stays flat at C<sub>ss</sub> from the start. She applies this check to her own answers.</li>
</ul></td>
<td>3IntravenousInfusions.pdf slide "IV Bolus Loading Dose and Continuous IV Infusion"; transcript 09-02, 09-09; STYLE.md IV Infusions Practice 4</td></tr>

<tr><td><b>C<sub>ss</sub></b> against <b>the concentration at the end of an infusion</b></td>
<td>Whether the infusion actually ran to steady state.<ul class="tlist">
<li>After the infusion stops, the concentration decays as C<sub>p</sub> = C<sub>peak</sub>e<sup>&minus;kt</sup>, where C<sub>peak</sub> is the concentration at the moment of cessation.</li>
<li>C<sub>peak</sub> is C<sub>ss</sub> only when the infusion ran long enough.</li>
<li>When the stem gives a stated shorter infusion, C<sub>peak</sub> has to be computed first from (R/Cl)(1 &minus; e<sup>&minus;kt</sup>).</li>
<li>Her post-cessation stems always state whether the infusion reached steady state and whether a loading dose was given.</li>
</ul></td>
<td>Starting the decay from R/Cl on a six-hour infusion of a drug with a three-hour half-life.<ul class="tlist">
<li>Six hours is two half-lives, so the concentration at cessation is 75% of C<sub>ss</sub>, not C<sub>ss</sub>.</li>
<li>Decaying from the wrong starting point makes the whole answer wrong by the same factor.</li>
</ul></td>
<td>3IntravenousInfusions.pdf slides "Drug Concentration after an IV Infusion has Ended" and Examples 5 and 6; transcript 09-02 worked examples (g) and (h)</td></tr>
</tbody></table>

<h3>Oral absorption</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Disposition rate limiting</b> against <b>absorption rate limiting</b></td>
<td>Which half-life is the longer one, and so which rate constant the terminal slope reflects.<ul class="tlist">
<li>Disposition rate limiting: the absorption half-life is much shorter than the elimination half-life. So k<sub>a</sub> is much larger than k, absorption finishes first, and the terminal slope of the curve reflects k.</li>
<li>Absorption rate limiting: the absorption half-life is much longer. Drug is still arriving while elimination proceeds, and the terminal slope reflects k<sub>a</sub> instead.</li>
<li>Disposition rate limiting is the usual case.</li>
</ul></td>
<td>Assuming the tail always gives the elimination rate constant.<ul class="tlist">
<li>It does so only when absorption is the faster process.</li>
<li>Comparing the two half-lives as if they were the two rate constants reverses the conclusion, since the larger rate constant is the shorter half-life.</li>
<li>In her worked example she reads it straight off the exponents: an exponential in 0.87 alongside one in 0.18 means absorption is much faster than elimination.</li>
</ul></td>
<td>5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Absorption Kinetics Terminology"; transcript 09-21. Note she uses two names for the first case in the same lecture, "disposition rate limiting" on the slide and "distribution limited" once while working example (e).</td></tr>

<tr><td><b>t<sub>max</sub></b> against <b>C<sub>max</sub></b></td>
<td>What each one contains.<ul class="tlist">
<li>t<sub>max</sub> = ln(k<sub>a</sub>/k)/(k<sub>a</sub> &minus; k) contains only the two rate constants. It does not depend on the dose, on F or on V<sub>D</sub>.</li>
<li>C<sub>max</sub> is the concentration at that time. It does contain the dose, F and V<sub>D</sub>, so it moves in proportion to the dose.</li>
<li>Raising k<sub>a</sub> gives a higher C<sub>max</sub> at an earlier t<sub>max</sub>.</li>
<li>Raising k gives a lower C<sub>max</sub>, also at an earlier t<sub>max</sub>, because t<sub>max</sub> depends on both constants either way.</li>
</ul></td>
<td>Answering that doubling the dose doubles t<sub>max</sub>, or that it moves it at all.<ul class="tlist">
<li>She sets this up as a question she will ask.</li>
<li>The second common error is reaching C<sub>max</sub> without t<sub>max</sub>. C<sub>max</sub> is the oral concentration equation evaluated at t<sub>max</sub>, so t<sub>max</sub> comes first even when the stem does not ask for it.</li>
<li>The third is dropping V<sub>D</sub> from the C<sub>max</sub> expression, which she names directly.</li>
</ul></td>
<td>5---Pharmacokinetics-of-Oral-Absorption.pdf slides "Cp vs. Time for a Single Oral Dose", "Changing Dose" and "Effect of ka and k on Cmax, tmax, and AUC"; transcript 09-21 cues 1, 2, 6, 7 and section 8.3</td></tr>

<tr><td><b>Absorption half-life</b> against <b>elimination half-life</b></td>
<td>Which rate constant the 0.693 is divided by.<ul class="tlist">
<li>The absorption half-life is 0.693/k<sub>a</sub>; the elimination half-life is 0.693/k.</li>
<li>Both are first-order half-lives, of processes running at the same time in opposite directions.</li>
<li>An unqualified "t&frac12;" in a stem means the elimination half-life.</li>
<li>Her oral stems usually supply both, in minutes for absorption and hours for elimination.</li>
</ul></td>
<td>Converting one half-life to a rate constant and reusing it for both exponentials.<ul class="tlist">
<li>That merges two processes into one and makes k<sub>a</sub> &minus; k zero.</li>
<li>Leaving the absorption half-life in minutes while the elimination half-life is in hours is the unit version of the same error. She names it: change the times to the same unit, usually hours, before calculating t<sub>max</sub>.</li>
<li>She also names using a half-life where a rate constant is needed, without first dividing 0.693 by it.</li>
</ul></td>
<td>5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Kinetics of Absorption"; transcript 09-21 cues 4, 5 and 8</td></tr>
</tbody></table>

<h3>Repeated dosing</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>3 to 5 half-lives</b> against <b>3 to 5 doses</b></td>
<td>What the time to plateau counts.<ul class="tlist">
<li>First-order elimination reaches the plateau in 3 to 5 half-lives, whatever the dose.</li>
<li>How many doses that is depends on the interval.</li>
<li>With a 4-hour half-life dosed every 8 hours, 3 to 5 half-lives is 12 to 20 hours, by which time 2 to 3 doses have been given.</li>
</ul></td>
<td>Counting doses, or making the time depend on the dose. Doubling the dose doubles the plateau level and leaves the time to reach it unchanged.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Drug accumulation with repeated administration"; transcript 09-23</td></tr>

<tr><td><b>Frequency</b> against <b>dosing interval, &tau;</b></td>
<td><ul class="tlist">
<li>Frequency is doses per day, as orders are written: BID, TID.</li>
<li>The interval is the time between doses in hours, and it is what the equations take.</li>
<li>TID is &tau; = 24/3 = 8 hr; BID is &tau; = 12 hr.</li>
</ul></td>
<td>Putting 3 for TID into an exponent that needs hours. That gives e<sup>&minus;3k</sup> instead of e<sup>&minus;8k</sup>, and too little decline over the interval.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Amount of Drug in the Body Following Repeated IV Bolus Injections"; transcript 09-23</td></tr>

<tr><td><b>First-dose C<sub>max</sub></b> against <b>C<sub>max</sub><sup>&infin;</sup></b></td>
<td>Whether drug was already in the body.<ul class="tlist">
<li>The first dose enters a body with no drug, so its peak is C<sub>0</sub> = D<sub>0</sub>/V<sub>D</sub>.</li>
<li>At steady state each dose is added to drug left from earlier doses, so the peak is C<sub>0</sub>/(1 &minus; e<sup>&minus;k&tau;</sup>), higher by the accumulation factor.</li>
<li>Same k, same dose, higher starting point.</li>
</ul></td>
<td>A steady-state peak below C<sub>0</sub>.<ul class="tlist">
<li>It means the accumulation factor was multiplied in instead of divided: 40 &times; 0.75 = 30 in place of 40/0.75 = 53.3 in her Example 1.</li>
<li>Her check is that the steady-state value must be greater.</li>
</ul></td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"; transcript 09-23</td></tr>

<tr><td><b>C<sub>avg</sub><sup>&infin;</sup></b> against <b>(C<sub>max</sub><sup>&infin;</sup> + C<sub>min</sub><sup>&infin;</sup>)/2</b></td>
<td>An average over time against the midpoint of two numbers.<ul class="tlist">
<li>The level falls exponentially between doses, fast and then slow, so it spends more of each interval near the trough.</li>
<li>So the time average FD<sub>0</sub>/(V<sub>D</sub>k&tau;) lies below the midpoint.</li>
<li>Her Example 1: 28.9 mg/L against a midpoint of 33.3.</li>
</ul></td>
<td>Averaging the peak and trough. That would be right only for a straight-line decline, which is zero order.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"; transcript 09-23</td></tr>

<tr><td><b>n</b> against <b>t</b> in the n-dose equation</td>
<td><ul class="tlist">
<li>n is the dose number just given; t is the time since that dose, not since the first.</li>
<li>3 hours after the 2nd dose is n = 2, t = 3 hr.</li>
<li>The time before the latest dose is already carried by n and &tau; inside the bracket.</li>
</ul></td>
<td>Using the time since the first dose as t. That counts the earlier intervals twice and gives a value far too low: t = 11 hr in place of 3 hr for her Example 2.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Plasma Drug Concentration at Any Time After n Doses"; transcript 09-23</td></tr>
<tr><td><b>Intermittent IV infusion</b> against <b>repeated IV bolus</b></td>
<td>How the dose enters, and where the peak sits.<ul class="tlist">
<li>A bolus is instantaneous, so its peak is C<sub>0</sub> = D<sub>0</sub>/V<sub>D</sub> at the moment of the dose.</li>
<li>An infusion is a zero-order input for its duration, so its peak is at the end of the infusion: {{frac:R|V<sub>D</sub>k}}(1 &minus; e<sup>&minus;kt</sup>), with t the infusion time.</li>
<li>Between doses, both decline as C<sub>0</sub>e<sup>&minus;kt</sup>.</li>
<li>The infusion is chosen because its peak is lower and the drug is better tolerated.</li>
</ul></td>
<td><ul class="tlist">
<li>Using D<sub>0</sub>/V<sub>D</sub> as the peak of an infused dose.</li>
<li>Using the accumulation factor 1/(1 &minus; e<sup>&minus;k&tau;</sup>) where the question gives two infusions to add.</li>
<li>Her method for infusions is a number line and a sum, not the steady-state equations.</li>
</ul></td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Rationale" and "Administering One or More Doses by IV Infusion"; transcript 09-28</td></tr>

<tr><td><b>t for the first infusion</b> against <b>t for the second</b></td>
<td>Each infusion declines from its own end.<ul class="tlist">
<li>At the time asked for, the first infusion has been declining since it stopped, and the second since it stopped, so the two exponents carry different times.</li>
<li>In her Example 4: 12 &minus; 2 = 10 hr and 12 &minus; 8 = 4 hr.</li>
</ul></td>
<td>Using the "4 hours after the second infusion" for both terms, or measuring the first infusion from its start rather than its end. She names this as the part to pay attention to.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "What is the plasma drug concentration 4 hours after the cessation of the second infusion?"; transcript 09-28</td></tr>

<tr><td><b>C<sub>max</sub><sup>&infin;</sup>, oral</b> against <b>C<sub>max</sub><sup>&infin;</sup>, bolus</b></td>
<td>The F and the t<sub>max</sub>.<ul class="tlist">
<li>The oral peak is (FD<sub>0</sub>/V<sub>D</sub>)[1/(1 &minus; e<sup>&minus;k&tau;</sup>)]e<sup>&minus;kt<sub>max</sub>&infin;</sup>.</li>
<li>Take away F and the exponential in t<sub>max</sub>, and the bolus peak, (D<sub>0</sub>/V<sub>D</sub>)/(1 &minus; e<sup>&minus;k&tau;</sup>), is left.</li>
<li>A bolus peaks at the moment of the dose, so only an oral peak needs a t<sub>max</sub> found first.</li>
</ul></td>
<td>Picking the bolus line off the equation sheet for an oral regimen, because both carry &tau; and the accumulation factor. &tau; does not separate them; F and t<sub>max</sub> do.</td>
<td>6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"; transcript 09-28</td></tr>

<tr><td><b>t<sub>max</sub></b> against <b>t<sub>max</sub><sup>&infin;</sup></b></td>
<td>What each depends on, and which is shorter.<ul class="tlist">
<li>The single-dose t<sub>max</sub> holds k and k<sub>a</sub>.</li>
<li>The steady-state t<sub>max</sub><sup>&infin;</sup> holds k, k<sub>a</sub> and &tau;. It is generally shorter, because drug already in the body brings the balance of absorption and elimination forward.</li>
<li>Tetracycline every 8 hours: 3.1 hr against 2.06 hr.</li>
</ul></td>
<td>Reusing the first-dose t<sub>max</sub> inside C<sub>max</sub><sup>&infin;</sup>, or expecting the steady-state peak later than the first.<ul class="tlist">
<li>Changing the interval changes t<sub>max</sub><sup>&infin;</sup> and C<sub>max</sub><sup>&infin;</sup>.</li>
<li>Changing the dose changes neither t<sub>max</sub>.</li>
</ul></td>
<td>6a---Multiple-Oral-Doses.pdf, slides "Time to Peak at Steady State" and "Example 1"; transcript 09-28</td></tr>

<tr><td><b>Increasing the dose</b> against <b>increasing the dosing interval</b></td>
<td>Which way the steady-state concentration and the fluctuation move.<ul class="tlist">
<li>A larger dose at the same interval raises the concentrations and widens the peak-to-trough swing; compliance is usually unchanged.</li>
<li>A longer interval at the same dose lowers the concentrations, widens the swing and improves compliance.</li>
<li>A shorter interval does the reverse of each.</li>
<li>Neither changes the time to steady state.</li>
</ul></td>
<td><ul class="tlist">
<li>Pairing a higher level with a smaller swing for a larger dose.</li>
<li>Expecting a longer interval to raise the level because each dose has longer to be absorbed.</li>
<li>Absorption is complete either way; what a longer interval gives each dose is more time to be eliminated.</li>
</ul></td>
<td>6a---Multiple-Oral-Doses.pdf, slides "Altering Dose, second slide" and "Altering Dosing Interval, second slide"; transcript 09-28</td></tr>
</tbody></table>

`;
