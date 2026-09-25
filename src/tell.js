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
<td>Whether the rate depends on how much drug is present. Zero order: the amount or concentration falls at a constant rate, and the rate does not depend on concentration. First order: the amount or concentration falls at a rate proportional to what remains, so the rate is highest when the concentration is highest and slows as the concentration falls. Everything else follows from that one difference. The rate constant of a zero-order process carries amount or concentration per unit time, mg/mL per day; the rate constant of a first-order process carries reciprocal time, hr<sup>&minus;1</sup>. Zero order is a straight line on linear axes and curves on semi-logarithmic axes; first order curves on linear axes and is a straight line on semi-logarithmic axes.</td>
<td>Reading the plot before reading the axis. A straight line on an axis labelled 1, 10, 100, 1000 is a first-order process on a semi-logarithmic scale, not a zero-order process, and the axis will not say "log". The other route in is confusing rate with half-life: the first-order <i>rate</i> is not constant and the first-order <i>half-life</i> is, so a student who has learned "first order is the constant one" attaches it to the wrong quantity.</td>
<td>Introduction.pdf slides 17, 18, 21; transcript 08-19, 08-24, 09-09</td></tr>

<tr><td><b>Half-life of a zero-order process</b> against <b>half-life of a first-order process</b></td>
<td>Whether the starting concentration appears in the formula. Zero order: t&frac12; = C<sub>0</sub>/2k, which contains C<sub>0</sub>, so the half-life changes when the starting concentration changes and falls as the concentration falls. First order: t&frac12; = 0.693/k, which contains no concentration term, so it is the same at every concentration. Her reason for the second: 0.693 is a constant and k is a constant, and a constant divided by a constant is a constant.</td>
<td>Carrying "half-life is a property of the drug" across from first order to zero order. On a zero-order data set a student who answers 0.693/k is using a relation that does not apply to a process whose rate does not depend on concentration. The reverse error is asking for C<sub>0</sub> on a first-order problem, which suggests the order was classified from the equation reached for rather than from the data.</td>
<td>Introduction.pdf slide 19; transcript 08-19 worked examples (g) and (h), 09-09</td></tr>

<tr><td><b>Rate</b> against <b>rate constant</b></td>
<td>Whether the number changes as the concentration changes. A rate is how much drug leaves per unit time and, for a first-order process, changes throughout the curve. A rate constant is the proportionality factor in the rate law and does not change with concentration. Their units differ, which is the quickest way to decide which one a number is. A rate constant is never negative, whichever order it belongs to.</td>
<td>Answering a select-all about first-order processes with "a constant rate of elimination". The rate is constantly changing for a first-order process; what is constant is the half-life. A negative rate constant means the minus sign of the rate law has been folded into the constant.</td>
<td>Transcript 08-19 polls 4 and 5, 08-26 paper quiz question 2</td></tr>

<tr><td><b>A straight line on linear axes</b> against <b>a straight line on semi-logarithmic axes</b></td>
<td>Which axis is logarithmic. A semi-logarithmic plot is logarithmic on the concentration axis only, and the axis labels step by a factor of 10 rather than by equal increments. The word "log" is usually not printed on it.</td>
<td>Concluding zero order from any straight line. She names this directly: look at the scale before deciding, because a first-order curve replotted on a logarithmic concentration axis is also straight.</td>
<td>Introduction.pdf slide 21; transcript 08-19, 08-26, 09-09 cue 13</td></tr>
</tbody></table>

<h3>The elimination vocabulary</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Excretion</b>, <b>biotransformation</b>, <b>elimination</b> and <b>disposition</b></td>
<td>How much of the pathway each word covers, and whether the drug is chemically changed. Excretion is removal of the intact drug or metabolite, with no chemical change. Biotransformation, also called metabolism, is chemical conversion of one species to another. Elimination is the irreversible loss of drug from the body by all routes, so it contains both excretion and biotransformation. Disposition is wider still: everything that happens to the drug after systemic absorption, which is distribution plus elimination. Her own summary: <i>"Metabolism and excretion are both elimination terms &hellip; Elimination is kind of our catch-all."</i></td>
<td>Treating the four as interchangeable synonyms for "the drug leaving". Choosing excretion where elimination is meant drops metabolism from the answer; choosing elimination where disposition is meant drops distribution. A student who answers "disposition" for a question about irreversible loss has included a reversible process, since distribution is reversible by definition.</td>
<td>Introduction.pdf slides 4 and 5; 4---Clearance-and-Elimination.pdf slide 3; transcript 08-17, 09-14</td></tr>

<tr><td><b>Clearance</b> against <b>rate of elimination</b></td>
<td>Whether the quantity is constant. The rate of elimination is Cl &times; C<sub>p</sub> and changes as the concentration changes. Clearance is the proportionality factor between them and stays constant for a first-order process, which is why she prefers working with it. Clearance is a volume per unit time; the rate of elimination is an amount per unit time.</td>
<td>Answering true to "clearance increases as concentration increases". Changing the concentration changes the elimination rate, not the clearance. The same reasoning error produces a clearance quoted in mg/hr.</td>
<td>2IVBolusAdministration.pdf slide "Clearance"; 4---Clearance-and-Elimination.pdf slide 5; transcript 08-24 poll 2</td></tr>
</tbody></table>

<h3>What is being measured</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Serum</b>, <b>plasma</b> and <b>whole blood</b></td>
<td>What was removed from the sample, and how. Whole blood is drawn with an anticoagulant such as heparin or EDTA and keeps all the cellular and protein elements. Plasma is the liquid supernatant left after centrifuging non-clotted whole blood containing an anticoagulant, and keeps all the proteins including albumin. Serum is obtained after the blood has been allowed to clot and the clot has been removed, so it has neither the cellular elements nor fibrinogen nor the other clotting factors. Serum and plasma are the usual measurement fluids, because they reduce the drug's interaction with other blood components. The subscript states which one: C<sub>p</sub> is concentration in plasma, C<sub>s</sub> in serum, and a bare C leaves it unspecified.</td>
<td>Reading the subscript as decoration. A stem that says C<sub>p</sub> has told you the fluid, and a stem that says whole blood has told you the sample still contains the cells and the clotting proteins. Answering "whole blood" to what is most commonly measured suggests the distinction was read as a matter of convenience rather than as a decision about what the drug can bind to.</td>
<td>Introduction.pdf slide 10; transcript 08-17, 08-19 poll 3</td></tr>
</tbody></table>

<h3>Models</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Mammillary</b>, <b>catenary</b> and <b>physiologic</b> models</td>
<td>How the compartments are wired, and whether compartments are used at all. In a mammillary model every peripheral compartment connects directly to the same central compartment, so the deck draws compartment 1 in the middle with k<sub>12</sub>/k<sub>21</sub> to compartment 2 and k<sub>13</sub>/k<sub>31</sub> to compartment 3. In a catenary model the compartments sit in a single chain, 1 to 2 to 3, so drug cannot reach compartment 3 without passing through compartment 2. A physiologic model is not a compartment model at all: it is a blood flow or perfusion model built on known anatomic and physiologic data. Mammillary is the one this course uses; physiologic models are set aside because they require more input than the course takes on.</td>
<td>Picking on the number of compartments rather than on the connections. Both compartment models can have three boxes; what differs is whether the outer boxes each touch the centre or are strung in series. Choosing physiologic for a question about compartment wiring means the word "model" was matched without noticing that a physiologic model replaces compartments with organs and blood flows.</td>
<td>Introduction.pdf slides 12 and 13; transcript 08-19 poll 2, 09-09</td></tr>

<tr><td><b>One compartment</b> against <b>two compartments</b></td>
<td>Whether distribution takes time. One compartment: the drug is uniformly distributed throughout the body as soon as it enters, and elimination begins immediately, so a semi-logarithmic plot is a single straight line. Two compartments: the drug reaches some organs preferentially before it is uniformly distributed, so the semi-logarithmic plot has a steeper early distribution phase above a shallower terminal elimination phase. On the exam the compartment count is either stated in the stem or readable from the graph, and she says she must tell you which.</td>
<td>Fitting a straight line through all the points of a two-compartment data set. That produces one slope where there are two, and the resulting half-life belongs to neither phase. Reading the early steep segment as noise rather than as the distribution phase is the same error stated differently.</td>
<td>2IVBolusAdministration.pdf slides "Why Multicompartment Models?" and "Plasma Level-Time Curve for Two-Compartment Model"; transcript 08-26 cues 8 and 9</td></tr>
</tbody></table>

<h3>The rate constants</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>k</b>, <b>k<sub>e</sub></b>, <b>k<sub>m</sub></b> and <b>k<sub>a</sub></b></td>
<td>Which process each one counts, and which direction it points. An unsubscripted k is the overall elimination rate constant, with every route of loss wrapped into it, and k = k<sub>m</sub> + k<sub>e</sub>. k<sub>e</sub> is the rate constant for excretion alone and is obtained as f<sub>e</sub>k. k<sub>m</sub> is the rate constant for metabolism alone. k<sub>a</sub> is the only one that points into the body: it is the first-order rate constant for absorption and appears only for extravascular dosing. All four carry reciprocal time, so the units cannot separate them.</td>
<td>Using k<sub>e</sub> where k belongs in a half-life. Since k<sub>e</sub> is a component of k, 0.693/k<sub>e</sub> is longer than the elimination half-life and is not a quantity the course asks for. Using k<sub>a</sub> where k belongs inverts the two exponentials in the oral equation. In the oral problems she supplies both half-lives, so a student who converts only one of them and reuses it twice has not noticed that two different rate constants are in play.</td>
<td>2IVBolusAdministration.pdf slide "One-Compartment Open Model"; 4---Clearance-and-Elimination.pdf slide 10; 5---Pharmacokinetics-of-Oral-Absorption.pdf slide "First-Order Absorption Model"; transcript 08-24, 09-14, 09-21</td></tr>

<tr><td><b>alpha</b> against <b>beta</b>, and <b>A</b> against <b>B</b></td>
<td>Which are slopes and which are intercepts, and which phase each belongs to. In C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup>, capital A and capital B are the two intercepts obtained by extrapolation and carry concentration units; lower-case a (alpha) and b (beta) are the two slopes and carry reciprocal time. Alpha is the larger of the two slopes, because distribution happens faster than elimination, and the alpha term with intercept A describes the distribution phase. Beta is the terminal slope and is the elimination rate constant, so the elimination half-life is 0.693/b and C<sub>0</sub> is A + B.</td>
<td>Dividing 0.693 by the larger number. That returns the distribution half-life, which she says is not what is wanted. Adding a slope to an intercept, or reporting A + B in reciprocal time, means the four symbols were read as four interchangeable constants rather than as two slope-intercept pairs. She hands all four over rather than asking for feathering, so the only work is deciding which is which.</td>
<td>2IVBolusAdministration.pdf slides "Concentration of Drug in the Central Compartment" and "Beta Half-life"; transcript 08-26, 09-09 cue 12</td></tr>
</tbody></table>

<h3>The volumes</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>V<sub>D</sub></b>, <b>V<sub>p</sub></b> and <b>V<sub>t</sub></b>, and the two routes to <b>V<sub>p</sub></b></td>
<td>How many compartments the model has, and which compartment the volume belongs to. V<sub>D</sub> is the apparent volume of distribution of a one-compartment model, V<sub>D</sub> = D<sub>B</sub>/C<sub>p</sub>: a hypothetical volume, not a real one, and a proportionality constant relating the amount in the body to the measured concentration. V<sub>p</sub> is the volume of the central compartment of a two-compartment model and V<sub>t</sub> the volume of the tissue compartment, with V<sub>t</sub> = V<sub>p</sub>k<sub>12</sub>/k<sub>21</sub>. The two routes to V<sub>p</sub> answer different data: V<sub>p</sub> = D<sub>0</sub>/(A + B) when the intercepts are supplied, and V<sub>p</sub> = D<sub>0</sub>/(k &times; AUC) when a dose and an area are supplied. All three are volumes and are reported in litres.</td>
<td>Dividing the dose by a single measured concentration in a two-compartment problem. That uses a concentration from part way down the curve rather than the extrapolated intercept sum A + B, and returns neither V<sub>p</sub> nor V<sub>D</sub>. Reporting a volume in kilograms comes from the percent-of-body-weight framing, where 1 L is taken as 1 kg for the arithmetic but the answer is still a volume. A large V<sub>D</sub> means the drug is more concentrated in extravascular tissue and less concentrated intravascularly; a small V<sub>D</sub> means the drug is bound to plasma protein or otherwise held in the vascular region, so reading the size the other way round inverts the conclusion about where the drug has gone.</td>
<td>2IVBolusAdministration.pdf slides "Volume of Distribution" and "Apparent Volumes of Distribution"; transcript 08-24, 08-26, 09-09</td></tr>
</tbody></table>

<h3>Clearance and the kidney</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Total clearance</b>, <b>renal clearance</b>, <b>hepatic clearance</b> and <b>f<sub>e</sub></b></td>
<td>Which organ the volume is being cleared by, and whether the number is a clearance at all. Cl<sub>T</sub> with no subscript is total body clearance and equals Cl<sub>R</sub> + Cl<sub>H</sub>. Cl<sub>R</sub> = f<sub>e</sub>Cl<sub>T</sub> is the renal part. Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub> is the hepatic part, obtained by subtraction rather than by measurement, because the liver is not sampled. f<sub>e</sub> is not a clearance: it is the fraction of the dose recovered unchanged in urine, D<sub>u</sub> divided by FD<sub>0</sub>, it also equals k<sub>e</sub>/k, and it has no units.</td>
<td>Reporting f<sub>e</sub> with units, or reporting a renal clearance where the fraction was asked for. Both come from reading f<sub>e</sub> as a rate of urinary loss rather than as a dimensionless share of the dose. Computing hepatic clearance from a liver measurement means the additivity route was not used, and no such measurement is given in this course.</td>
<td>4---Clearance-and-Elimination.pdf slides 8, 9, 10, 11; transcript 09-14</td></tr>

<tr><td><b>Renal clearance</b> against <b>creatinine clearance</b></td>
<td>Whose clearance is being estimated. Renal clearance is the clearance of the drug by the kidney, obtained from f<sub>e</sub> and the total clearance. Creatinine clearance is an estimate of the patient's glomerular filtration rate and therefore of the patient's renal function, obtained from Cockcroft-Gault, and it is about the patient rather than about the drug. She names this as the point where the two blur: <i>"things get a little blurry when we're talking about renal clearance, and then I'm gonna ask you to calculate creatinine clearance, and I want you to think about the, the what I'm asking you each time."</i></td>
<td>Feeding a drug's f<sub>e</sub> into Cockcroft-Gault, or comparing a drug's renal clearance in L/hr against the 120 mL/min figure without converting. The unit habit separates them in practice: renal clearance of a drug is quoted in L/hr, creatinine clearance in mL/min.</td>
<td>4---Clearance-and-Elimination.pdf slides 9 and 15; transcript 09-14 cues 6 and 8</td></tr>

<tr><td><b>Glomerular filtration</b>, <b>active tubular secretion</b> and <b>tubular reabsorption</b></td>
<td>Which direction the drug moves, and whether energy is required. Filtration is passive diffusion across the glomerulus and averages 120 mL/min. Active tubular secretion moves drug from the blood into the urine using a transporter, so it requires energy and adds to what filtration removes. Tubular reabsorption moves drug from the urine back into the blood, so it subtracts. Filtration and secretion both add drug to the lumen in the proximal part of the nephron; reabsorption returns it to the bloodstream. Hence the inference rule: a renal clearance above about 120 mL/min means secretion is contributing on top of filtration, and one below 120 mL/min means some drug is being reabsorbed. Her tolerance on the number: 119 or 121 counts as filtration, 250 or 350 means secretion.</td>
<td>Treating a renal clearance below 120 mL/min as evidence of reduced filtration. Within this rule the comparison is against the filtration rate itself, so a value below it points to drug returning to the blood. Concluding secretion from a value near 120 means the stated tolerance was not applied. Calling reabsorption an active process adds a transporter the deck does not put there.</td>
<td>4---Clearance-and-Elimination.pdf slides 12, 13, 18, 19; transcript 09-14 cue 9</td></tr>

<tr><td><b>Creatinine</b> against <b>inulin</b> for measuring glomerular filtration rate</td>
<td>Whether the marker is already in the body, and how cleanly it is filtered. Glomerular filtration rate is measured with a drug eliminated primarily by filtration only, neither reabsorbed nor secreted. Inulin is almost completely filtered and so is the better marker, but it is not native to the body and has to be administered, which makes the procedure more involved. Creatinine comes from the breakdown of muscle and is already present, which is why it is the common clinical choice, but it is also secreted, so it is an estimate rather than a direct measurement. Both are stated on the deck slide as used clinically.</td>
<td>Calling creatinine clearance a measurement of glomerular filtration rate rather than an estimate of it. The secretion of creatinine is the reason for the word "estimate", and it is the same reason Cockcroft-Gault carries assumptions she names: the 0.85 female factor, and the fact that a serum creatinine may not represent renal function in a person with unusually low or unusually high muscle mass.</td>
<td>4---Clearance-and-Elimination.pdf slide 14; transcript 09-14</td></tr>

<tr><td>Capital <b>F</b> against lower-case <b>f<sub>e</sub></b></td>
<td>What fraction of what. Capital F is the bioavailability factor, the fraction of the dose that reaches systemic circulation, and it is taken as 1 for an intravenous dose. Lower-case f<sub>e</sub> is the fraction of the dose excreted unchanged in the urine. Her own separation: <i>"lowercase fe is our fraction excreted, capital F is our bioavailability factor."</i> Both are dimensionless, so units do not distinguish them.</td>
<td>Setting F to the urinary recovery fraction in a clearance calculation. On an IV problem F is 1 whatever the urine shows, and f<sub>e</sub> then splits that clearance into renal and hepatic parts. Seeing a capital F in a stem should point to an oral dose.</td>
<td>4---Clearance-and-Elimination.pdf slides 7 and 10; transcript 09-14, 09-21 cue 9</td></tr>
</tbody></table>

<h3>Concentrations and doses</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>C<sub>ss</sub></b>, <b>C<sub>max</sub></b> and <b>C<sub>0</sub></b></td>
<td>Which route produced the curve, and where on it the concentration sits. C<sub>0</sub> is the concentration at time zero after an IV bolus, which is the highest point on that curve and is obtained as D<sub>0</sub>/V<sub>D</sub> or by back-extrapolation; for a two-compartment bolus it is A + B. C<sub>ss</sub> is the plateau of a continuous infusion, R/Cl, reached only asymptotically after three to five half-lives, and it contains no time term. C<sub>max</sub> is the peak of a single oral dose, which occurs at t<sub>max</sub> rather than at time zero because the drug has to be absorbed first. Each belongs to one input type: instantaneous, constant rate, and first-order in.</td>
<td>Using D<sub>0</sub>/V<sub>D</sub> for an oral peak. That is the concentration the whole dose would produce if it arrived instantly and none were lost, which is neither C<sub>max</sub> nor a concentration on the oral curve at all. Reading C<sub>ss</sub> off a curve that has run for less than three to five half-lives reports the current concentration as the plateau. Her drawing instruction sorts these three quickly: an IV bolus starts high and comes down, an infusion starts low and builds, and an oral dose rises to a peak and then falls.</td>
<td>2IVBolusAdministration.pdf slide "Volume of Distribution"; 3IntravenousInfusions.pdf slide "Drug Concentration at Steady-State"; 5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Cp vs. Time for a Single Oral Dose"; transcript 09-02 cue 1, 09-21 cue 3</td></tr>

<tr><td><b>Loading dose</b> against <b>maintenance infusion rate</b></td>
<td>Which parameter each one is set by. The loading dose fills the volume of distribution, D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub>, so it is set by the volume and is an amount in mg. The infusion rate replaces what is being cleared, R = C<sub>ss</sub> &times; Cl, so it is set by the clearance and is an amount per time in mg/hr. The two are linked through D<sub>L</sub> = R/k, which is why that form only gives a sensible loading dose once an appropriate rate has been chosen. A change in clearance alone therefore changes the rate required and leaves the loading dose unchanged: in her IV Infusions Practice 4 solution, a patient whose clearance falls needs a smaller infusion rate and the same 1000 mg loading dose, because V<sub>D</sub> did not move.</td>
<td>Adjusting the loading dose for renal impairment. Renal impairment reduces clearance, which is in the rate and not in D<sub>L</sub> = C<sub>ss</sub>V<sub>D</sub>. Adjusting the rate for a change in volume is the same error mirrored. If the loading dose and the rate are both correct, the concentration sits flat at C<sub>ss</sub> from the start, which is the check she applies to her own answers.</td>
<td>3IntravenousInfusions.pdf slide "IV Bolus Loading Dose and Continuous IV Infusion"; transcript 09-02, 09-09; STYLE.md IV Infusions Practice 4</td></tr>

<tr><td><b>C<sub>ss</sub></b> against <b>the concentration at the end of an infusion</b></td>
<td>Whether the infusion actually ran to steady state. After the infusion stops, the concentration decays as C<sub>p</sub> = C<sub>peak</sub>e<sup>&minus;kt</sup>, and C<sub>peak</sub> is the concentration at the moment of cessation. That is C<sub>ss</sub> only when the infusion ran long enough; when the stem gives a stated shorter infusion, C<sub>peak</sub> has to be computed first from (R/Cl)(1 &minus; e<sup>&minus;kt</sup>). Her post-cessation stems always state whether the infusion reached steady state and whether a loading dose was given.</td>
<td>Starting the decay from R/Cl on a six-hour infusion of a drug with a three-hour half-life. Six hours is two half-lives, so the concentration at cessation is 75% of C<sub>ss</sub>, not C<sub>ss</sub>. Decaying from the wrong starting point scales the whole answer.</td>
<td>3IntravenousInfusions.pdf slides "Drug Concentration after an IV Infusion has Ended" and Examples 5 and 6; transcript 09-02 worked examples (g) and (h)</td></tr>
</tbody></table>

<h3>Oral absorption</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>Disposition rate limiting</b> against <b>absorption rate limiting</b></td>
<td>Which half-life is the longer one, and therefore which rate constant the terminal slope reflects. Disposition rate limiting: the absorption half-life is much shorter than the elimination half-life, so k<sub>a</sub> is much larger than k, absorption finishes first, and the terminal slope of the curve reflects k. Absorption rate limiting: the absorption half-life is much longer, so drug is still arriving while elimination proceeds, and the terminal slope reflects k<sub>a</sub> instead. Disposition rate limiting is the usual case.</td>
<td>Assuming the tail always gives the elimination rate constant. It does so only when absorption is the faster process. Comparing the two half-lives rather than the two rate constants without inverting one of them reverses the conclusion, since the larger rate constant is the shorter half-life. In her worked example she reads it straight off the exponents: an exponential in 0.87 alongside one in 0.18 means absorption is much faster than elimination.</td>
<td>5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Absorption Kinetics Terminology"; transcript 09-21. Note she uses two names for the first case in the same lecture, "disposition rate limiting" on the slide and "distribution limited" once while working example (e).</td></tr>

<tr><td><b>t<sub>max</sub></b> against <b>C<sub>max</sub></b></td>
<td>What each one contains. t<sub>max</sub> = ln(k<sub>a</sub>/k)/(k<sub>a</sub> &minus; k) contains only the two rate constants, so it depends on nothing else: not on the dose, not on F, not on V<sub>D</sub>. C<sub>max</sub> is the concentration at that time and does contain the dose, F and V<sub>D</sub>, so it moves in proportion to the dose. Raising k<sub>a</sub> gives a higher C<sub>max</sub> at an earlier t<sub>max</sub>; raising k gives a lower C<sub>max</sub>, also at an earlier t<sub>max</sub>, because t<sub>max</sub> depends on both constants either way.</td>
<td>Answering that doubling the dose doubles t<sub>max</sub>, or that it moves it at all. She sets this up as a question she will ask. The second common error is arriving at C<sub>max</sub> without t<sub>max</sub>: C<sub>max</sub> is the oral concentration equation evaluated at t<sub>max</sub>, so t<sub>max</sub> comes first even when the stem does not ask for it. The third is dropping V<sub>D</sub> out of the C<sub>max</sub> expression, which she names directly.</td>
<td>5---Pharmacokinetics-of-Oral-Absorption.pdf slides "Cp vs. Time for a Single Oral Dose", "Changing Dose" and "Effect of ka and k on Cmax, tmax, and AUC"; transcript 09-21 cues 1, 2, 6, 7 and section 8.3</td></tr>

<tr><td><b>Absorption half-life</b> against <b>elimination half-life</b></td>
<td>Which rate constant the 0.693 is divided by. The absorption half-life is 0.693/k<sub>a</sub> and the elimination half-life is 0.693/k, and both are first-order half-lives of processes running at the same time in opposite directions. An unqualified "t&frac12;" in a stem means the elimination half-life. Her oral stems usually supply both, in minutes for absorption and hours for elimination.</td>
<td>Converting one half-life to a rate constant and reusing it for both exponentials. That collapses two processes into one and makes k<sub>a</sub> &minus; k zero. Leaving the absorption half-life in minutes while the elimination half-life is in hours is the unit version of the same miss, which she names: change the times to the same unit, usually hours, before calculating t<sub>max</sub>. She also names the error of using a half-life where a rate constant is needed, without dividing 0.693 by it first.</td>
<td>5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Kinetics of Absorption"; transcript 09-21 cues 4, 5 and 8</td></tr>
</tbody></table>

<h3>Repeated dosing</h3>
<table class="reftab"><thead><tr>
<th style="width:17%">Confused with</th><th style="width:36%">The feature that separates them</th><th style="width:31%">What the wrong pick usually means</th><th style="width:16%">Source</th></tr></thead><tbody>

<tr><td><b>3 to 5 half-lives</b> against <b>3 to 5 doses</b></td>
<td>What the time to plateau counts. First-order elimination reaches the plateau in 3 to 5 half-lives, whatever the dose. How many doses that is depends on the interval: with a 4-hour half-life dosed every 8 hours, 3 to 5 half-lives is 12 to 20 hours, by which time 2 to 3 doses have been given.</td>
<td>Counting doses, or making the time depend on the dose. Doubling the dose doubles the plateau level and leaves the time to reach it unchanged.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Drug accumulation with repeated administration"; transcript 09-23</td></tr>

<tr><td><b>Frequency</b> against <b>dosing interval, &tau;</b></td>
<td>Frequency is doses per day, as orders are written: BID, TID. The interval is the time between doses in hours, and it is what the equations take. TID is &tau; = 24/3 = 8 hr; BID is &tau; = 12 hr.</td>
<td>Putting 3 for TID into an exponent that needs hours, which gives e<sup>&minus;3k</sup> instead of e<sup>&minus;8k</sup> and too little decline over the interval.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Amount of Drug in the Body Following Repeated IV Bolus Injections"; transcript 09-23</td></tr>

<tr><td><b>First-dose C<sub>max</sub></b> against <b>C<sub>max</sub><sup>&infin;</sup></b></td>
<td>Whether drug was already in the body. The first dose enters a body with no drug, so its peak is C<sub>0</sub> = D<sub>0</sub>/V<sub>D</sub>. At steady state each dose is added to drug left from earlier doses, so the peak is C<sub>0</sub>/(1 &minus; e<sup>&minus;k&tau;</sup>), higher by the accumulation factor. Same k, same dose, higher starting point.</td>
<td>A steady-state peak below C<sub>0</sub>, which means the accumulation factor was multiplied in instead of divided: 40 &times; 0.75 = 30 in place of 40/0.75 = 53.3 in her Example 1. Her check is that the steady-state value must be greater.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"; transcript 09-23</td></tr>

<tr><td><b>C<sub>avg</sub><sup>&infin;</sup></b> against <b>(C<sub>max</sub><sup>&infin;</sup> + C<sub>min</sub><sup>&infin;</sup>)/2</b></td>
<td>An average over time against the midpoint of two numbers. The level falls exponentially between doses, fast and then slow, so it spends more of each interval near the trough, and the time average FD<sub>0</sub>/(V<sub>D</sub>k&tau;) lies below the midpoint. Her Example 1: 28.9 mg/L against a midpoint of 33.3.</td>
<td>Averaging the peak and trough. That would be right only for a straight-line decline, which is zero order.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"; transcript 09-23</td></tr>

<tr><td><b>n</b> against <b>t</b> in the n-dose equation</td>
<td>n is the dose number just given; t is the time since that dose, not since the first. 3 hours after the 2nd dose is n = 2, t = 3 hr. The time before the latest dose is already carried by n and &tau; inside the bracket.</td>
<td>Using the time since the first dose as t, which counts the earlier intervals twice and gives a value far too low: t = 11 hr in place of 3 hr for her Example 2.</td>
<td>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Plasma Drug Concentration at Any Time After n Doses"; transcript 09-23</td></tr>
</tbody></table>
`;
