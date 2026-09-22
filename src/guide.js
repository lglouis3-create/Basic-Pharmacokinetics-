/* ==========================================================================
   OBJECTIVE GUIDES
   ==========================================================================
   One section per objective printed on a deck's own objectives slide, in her
   order, grouped by module. Authored as HTML in a template literal — no
   backtick and no dollar-brace inside. Each <h3> becomes a jump-list entry.
   {{fig:key|caption}} tokens resolve against images.json; none are used here
   because no figures have been harvested.

   SOURCES. Every line is traceable to a printed slide in one of the five
   lectured decks, to Dr. Mosley's spoken words recorded in
   TRANSCRIPT_CUES.md, or to one of her own worked solutions recorded in
   STYLE.md or printed in a deck. Bullets marked (T) are transcript, quoted
   verbatim. OCR'd handwriting on the annotated decks is not used as a source.
   Where slide and transcript differ, both are stated.

   Objective counts: Module 1 five, Module 2 six (three on each of the deck's
   two objectives slides), Module 3 seven, Module 4 five, Module 5 four.
   Modules 6 to 9 are not yet lectured and carry no guides.
   ========================================================================== */
const GUIDE_HTML = `
<h2>Objective guides</h2>
<p class="sub">One section per objective from Dr. Mosley's own objectives slides, in her wording and her order: what the slides carry, what she added out loud, her own question on it, and the form the question takes when she sets it. Nothing here is scored.</p>

<h2>Module 1 &mdash; Introduction, kinetic orders and AUC</h2>
<p class="prose">Five objectives, printed on Introduction.pdf slide 2 and reprinted unchanged on RecapExam1.pdf slide 2. (T) On what those slides are for: <i>"the first slide there after the title slide is, um, our objectives. I put this here because this is what I want you to know for the exam."</i></p>

<section class="gobj" id="gobj-m1-1">
<h3>Module 1, objective 1 &mdash; Define pharmacokinetics and discuss some related disciplines</h3>
<div class="gbar"><span>Objective</span><b>Define pharmacokinetics and discuss some related disciplines</b><i>Introduction.pdf slides 3&ndash;8</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>The schematic splits the path into two labelled territories: <b>pharmaceutics</b> runs from the dosage form to drug in solution, and <b>pharmacokinetics</b> runs from drug in solution through drug in systemic circulation, distribution to tissues, metabolism and excretion, to pharmacologic effect &mdash; Introduction.pdf slide 3.</li>
<li><b>Absorption</b> &mdash; passage of drug molecules from the administration site into systemic circulation. <b>Distribution</b> &mdash; process of reversible transfer of a drug to and from the site of measurement. <b>Metabolism</b> &mdash; conversion of one chemical species to another (biotransformation). <b>Excretion</b> &mdash; removal of intact drug or metabolite from the body &mdash; Introduction.pdf slide 4.</li>
<li><b>Biopharmaceutics</b> &mdash; the interrelationship of the physicochemical drug properties, dosage form and route of administration on the rate and extent of systemic drug absorption &mdash; Introduction.pdf slide 6.</li>
<li>The biopharmaceutic considerations table lists seven inputs to drug product design: therapeutic objective, the drug (active pharmaceutical ingredient, API), route of administration, drug dosage and dosage regimen, type of drug product, excipients, method of manufacture &mdash; Introduction.pdf slide 7.</li>
<li><b>Clinical pharmacokinetics</b> &mdash; the application of pharmacokinetic methods to drug therapy; <b>population pharmacokinetics</b> &mdash; the study of pharmacokinetic differences in various population groups; <b>pharmacodynamics</b> &mdash; the relationship between drug concentration at the site of action and pharmacological response; <b>clinical toxicology</b> &mdash; study of adverse effects of drugs in the body; <b>toxicokinetics</b> &mdash; the application of pharmacokinetic principles to drug safety evaluation studies &mdash; Introduction.pdf slide 8.</li>
<li>Summary: pharmacokinetics is the study of ADME (absorption, distribution, metabolism, excretion), and the related disciplines are biopharmaceutics, clinical pharmacokinetics, pharmacodynamics, clinical toxicology and toxicokinetics &mdash; Introduction.pdf slide 15.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The two-word contrast that separates the two disciplines, which the slide does not put side by side: <i>"pharmacodynamics, concentration. And Response. OK, pharmacokinetics, concentration and time."</i> (08-17)</li>
<li>(T) On the slide 7 table: <i>"If you see a table, no, I do not expect you to to memorize the table. Right? This is to help clarify in your brain how the pieces fit."</i> (08-17), and of that table specifically, <i>"this is for your information"</i>.</li>
<li>(T) Which of these are examinable, from the Exam 1 review: <i>"there are some definitions that I expect you to know, um, and some related disciplines. Remember, we talked about, um, clinical pharmacokinetics. We talked about toxicology. We talked about pharmacodynamics, um, pharmacology."</i> (09-09)</li>
<li>(T) Her own wording of biopharmaceutics, closer to the exam's likely phrasing than the slide's: <i>"biopharmaceutics basically is the kind of the relation tying the physical chemical drug properties, so, um, thinking about the drug itself, um, the dosage form, and the route of administration, how those pieces tie into the rate and effect or extent of systemic absorption"</i> (08-17).</li>
<li>(T) ADME is lettered differently by other faculty, which is why she fixes the four letters here: <i>"Doctor Smith &hellip; she will add um a T to our ADM, right? So A D M E and then she will add a T for toxicology. Doctor Yendaalli will add an L at the beginning for liberation."</i> (08-17)</li>
</ul>

<div class="gpoll"><b>Her own question &mdash; poll slide, Introduction.pdf</b>
<p class="prose">Stem: <i>"Which term best describes the examination of the interrelationship of the physicochemical properties of the drug, the dosage form in which the drug is given, and the route of administration on the rate and extent of systemic drug absorption?"</i> Options: biopharmaceutics; toxicology; pharmacodynamics; pharmacology.</p>
<p class="prose">Her answer, debriefing the same item on 08-19: <i>"most of you guys thought biopharm, a few of you guys thought pharmacodynamics, and somebody thought pharmacology. BioPharm is what I was looking at."</i> Correct: biopharmaceutics.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>The stem is the slide's definition, read out almost word for word, and the options are bare discipline names. The definition arrives first and the name is the answer, not the other way round.</li>
<li>The distractors are drawn from the neighbouring slide &mdash; the other related disciplines &mdash; plus pharmacology, which is not defined anywhere in the deck.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m1-2">
<h3>Module 1, objective 2 &mdash; Describe the types of pharmacokinetic modeling</h3>
<div class="gbar"><span>Objective</span><b>Describe the types of pharmacokinetic modeling</b><i>Introduction.pdf slides 11&ndash;15</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Pharmacokinetic models are used to predict drug levels; determine dosing regimens; estimate possible accumulation of drugs and/or metabolites; correlate drug concentrations with pharmacologic or toxicologic activity; evaluate differences in the rate or extent of availability between formulations (bioequivalence); describe how changes in physiology or disease affect the pharmacokinetics of the drug; explain drug interactions &mdash; Introduction.pdf slide 11.</li>
<li><b>Physiologic pharmacokinetic models</b> are blood flow or perfusion models, based on known anatomic and physiologic data &mdash; Introduction.pdf slide 12.</li>
<li><b>Compartment pharmacokinetic models</b> are of two kinds. The mammillary model is drawn with compartment 1 in the centre, compartment 2 to its left and compartment 3 to its right, carrying k<sub>12</sub>/k<sub>21</sub> and k<sub>13</sub>/k<sub>31</sub>. The catenary model is drawn as a chain 1&ndash;2&ndash;3, carrying k<sub>12</sub>/k<sub>21</sub> and k<sub>23</sub>/k<sub>32</sub> &mdash; Introduction.pdf slide 13.</li>
<li>A figure of worked examples of compartment models follows &mdash; Introduction.pdf slide 14.</li>
<li>Summary: modeling helps to make pharmacokinetic predictions &mdash; Introduction.pdf slide 15.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) Which kind this course actually uses, and what the box means: <i>"we primarily do compartmental modeling. That means that we treat our bodies as just a little box. We put all of the drug into the box and then determine, uh, depending on how the &hellip; depending on how the drug behaves in the body is kind of, uh, what it helps us, helps us decide which model to use."</i> (09-09)</li>
<li>(T) Why the physiologic model is on the slide but not used: <i>"our physiology, physiological models that we don't use quite as much. Those require a little bit more input than what we want to do."</i> (09-09)</li>
<li>(T) The catenary model described as a chain rather than as a diagram: <i>"compartments joined together like compartments, uh, of a, of a, a train. Remember that's one car, next car, next car. You don't get to the third car without going through the second car. So that's our catenary system."</i> (08-19)</li>
</ul>

<div class="gpoll"><b>Her own question &mdash; poll slide, Introduction.pdf</b>
<p class="prose">Stem: <i>"Which pharmacokinetic model consists of compartments joined to one another like the compartments of a train?"</i> Options: catenary; mammillary; physiologic.</p>
<p class="prose">Correct: catenary, confirmed in her 08-19 debrief quoted above (<i>"Most of you guys were there."</i>).</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>She asks by wiring, not by count. The stem gives the arrangement &mdash; joined like the compartments of a train &mdash; and the options are the three model names from slides 12 and 13.</li>
<li>The physiologic model appears as a distractor in a question about compartment wiring, which is the only place it is examined.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m1-3">
<h3>Module 1, objective 3 &mdash; Define some fundamental pharmacokinetics terms</h3>
<div class="gbar"><span>Objective</span><b>Define some fundamental pharmacokinetics terms</b><i>Introduction.pdf slides 5, 9, 10</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Key terms. <b>Elimination</b> &mdash; irreversible loss of drug from the body by all routes. <b>Disposition</b> &mdash; all the kinetic processes that occur to a drug subsequent to its systemic absorption, that is distribution and elimination. <b>First-pass effect</b> &mdash; rapid metabolism of an orally administered drug before reaching the general circulation. <b>Bioavailability</b> &mdash; measure of the systemic availability of a drug &mdash; Introduction.pdf slide 5.</li>
<li>The concentration-versus-time curve: concentration rises from zero to a peak and then declines &mdash; Introduction.pdf slide 9.</li>
<li>Blood components, with how each is obtained and what it contains. <b>Whole blood</b> &mdash; generally obtained by venous puncture and contains an anticoagulant such as heparin or EDTA; contains all the cellular and protein elements of blood. <b>Serum</b> &mdash; obtained from whole blood after the blood is allowed to clot and the clot is removed; does not contain the cellular elements, fibrinogen, or the other clotting factors. <b>Plasma</b> &mdash; liquid supernatant obtained after centrifugation of non-clotted whole blood that contains an anticoagulant; the noncellular liquid fraction of whole blood, containing all the proteins including albumin &mdash; Introduction.pdf slide 10.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) Elimination as the catch-all, which the slide's one-line definition does not say: <i>"Elimination refers to the irreversible loss of drugs from the body by all routes, right? So, Metabolism and excretion are both elimination terms, right? Elimination is kind of our catch-all."</i> (08-17)</li>
<li>(T) Disposition in her own compressed form: <i>"Disposition is the processes that occur to a drug after it's absorbed, so distribution and elimination"</i> (08-17).</li>
<li>(T) First-pass effect tied to the number it changes: <i>"often when we take oral medications, they hit the liver first before they get to that systemic circulation &hellip; Liver eats them up, eats up half the drug, and then you have a lower what we call a bioavailability"</i> (08-17).</li>
<li>(T) The subscript convention, which no slide states: <i>"if you see CP, we're looking at concentration of drug in the plasma, CS we're looking at concentration of drug in the serum, or if you just see a C, you can assume whatever."</i> (08-17)</li>
<li>(T) Two lines she draws on the slide 9 curve that are not printed on it &mdash; a minimum toxic concentration above and a minimum effective concentration below: <i>"our goal is. That we want to stay in between these two lines."</i> On the upper line: <i>"Remember that's the top, right? Top of that curve, right there is where we start to see problems, and toxic can be different things for different drugs."</i> (08-17). Slide and speech differ here: the printed slide carries a plain curve, and an exam written from these lectures would key the spoken thresholds, because that is the only place they are defined.</li>
<li>(T) Why serum or plasma rather than whole blood: <i>"We mostly use serum and plasma because remember we try to minimize the interactions of drug with anything else that might be in that um sample"</i> (08-19).</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; two polls</b>
<p class="prose"><b>Poll, 08-17.</b> Stem: <i>"What concentration must be met or exceeded? In order for the desired pharmacologic response to result."</i> Options as she named them in the debrief: steady-state concentration; minimum toxic concentration; minimum effective; minimum inhibitory concentration. Her answer: <i>"looks like most of you guys picked C, which was minimum effective, I think. &hellip; OK, um, that is the correct answer."</i> On the minimum inhibitory distractor: <i>"a lot of times we're looking at, um, biochemical um processes like um antibiotics &hellip; What is the minimum concentration that we need to, um, kill this bacteria"</i>.</p>
<p class="prose"><b>Poll slide, Introduction.pdf.</b> Stem: <i>"Which is most commonly used for drug measurement in pharmacokinetic analysis?"</i> Options: saliva; urine; whole blood; serum or plasma. Her answer (08-19): <i>"most of you guys thought serum or plasma, and all of these are options"</i> &mdash; correct is serum or plasma.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>Definitional multiple choice in which every option is a real term from the same family &mdash; four concentration thresholds, or four sample fluids &mdash; so the discrimination is the definition, not plausibility.</li>
<li>She words the stem as the property rather than the name: "what concentration must be met or exceeded", "which is most commonly used". The term is the answer.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m1-4">
<h3>Module 1, objective 4 &mdash; Differentiate between orders of reaction and calculate basic parameters given a data set</h3>
<div class="gbar"><span>Objective</span><b>Differentiate between orders of reaction and calculate basic parameters given a data set</b><i>Introduction.pdf slides 17&ndash;21, 26</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li><b>Zero-order reactions.</b> Amount or concentration of drug decreases at a constant rate. dC/dt = &minus;k, and C = C<sub>0</sub> &minus; kt. The plotted curve is plasma drug concentration against time &mdash; Introduction.pdf slide 17.</li>
<li><b>First-order reactions.</b> Amount or concentration of drug decreases at a rate that is proportional to the amount of drug remaining. dC/dt = &minus;kC; log C = log C<sub>0</sub> &minus; kt/2.3, so C = C<sub>0</sub>10<sup>&minus;kt/2.3</sup>; ln C = ln C<sub>0</sub> &minus; kt, so C = C<sub>0</sub>e<sup>&minus;kt</sup> &mdash; Introduction.pdf slide 18.</li>
<li><b>Half-life</b> is the time required for the amount or concentration of a drug to decrease by one-half. Zero-order half-life t&frac12; = C<sub>0</sub>/2k. First-order half-life t&frac12; = 0.693/k &mdash; Introduction.pdf slide 19.</li>
<li>A semi-logarithmic plot whose concentration axis is labelled 1, 10, 100, 1000 and whose points are C<sub>p</sub><sup>0</sup> = 200 mcg/mL at time zero, then 93, 44, 21, 10, 4.9 and 2.3 mcg/mL at hours 1 to 6 &mdash; Introduction.pdf slide 21.</li>
<li>Summary: knowing the order of the reaction is critical to making pharmacokinetic predictions &mdash; Introduction.pdf slide 26.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The single affirmative statement in any lecture about a specific exam item: <i>"here is the secret. I'm going to&hellip; On this exam, I am going to give you a data set, and I expect you to figure out if it's zero or first. The rest of the time, if I tell you that it is an IV bolus dose that is ad- administered, your expectation is what? First. First one. &hellip; But if I give you a data set, expect that I expect you to tell me if it's zero or first."</i> (09-09)</li>
<li>(T) The first-order half-life is not supplied: <i>"first order half-life &hellip; that will not be on your equation sheet. This is the one that you take to your grave with you, OK? 0.693 over K."</i> (08-19), and again at the review: <i>"That one is not on your equation sheet."</i> (09-09)</li>
<li>(T) Half-life is a time, and the units are scored: <i>"I expect you to give me half-life in units of time."</i> (08-19); <i>"It is a time, so it is not days to the minus one. It is just days."</i> (09-09)</li>
<li>(T) Why the first-order half-life does not move: <i>"0.693 that you're gonna take with you is 0.693. It is a constant. So, a constant divided by a constant is A constant"</i> (08-19).</li>
<li>(T) Units decide the order of a rate constant: zero order is <i>"either going to be concentration per unit time. Or amount per unit time"</i>, first order is <i>"Is it time? One over time. We call that reciprocal time."</i> (08-19). And, either way, <i>"our rate constant is never going to be a negative"</i>.</li>
<li>(T) The axis trap, flagged three separate times: <i>"Notice that it doesn't say. Log, right?"</i> (08-19); <i>"I expect for you, because you will see graphs like this, and this word will not be over here most of the time. But you've got to pay attention to the axis."</i> (08-19); <i>"if you look at that scale and you see that it is not changing by regular one infinite, or it's increasing by a func- uh, a function of 10, then that tells you that it is a logarithmic scale. So, don't just look at that straight line and assume &hellip; that it is zero order. Look at the scale."</i> (09-09)</li>
<li>(T) A rounding error she says will change your answer: <i>"don't truncate that to 0.2 early on because if you put that as 0.2, your number is gonna be very different than our numbers"</i>, with the instruction to <i>"keep, you know, 3 to 4 decimal places for that K"</i> (08-24).</li>
<li>(T) A sign error she makes on purpose and then names: solving backwards for C<sub>0</sub>, <i>"if I punch C0E or CE to the minus KT because I always throw in that minus there, what's gonna happen to my number? If it's minus KT, then that number is going to be lower than where I started"</i> (08-19). On the zero-order version she catches the same thing: <i>"What is wrong with the way I've set that up? &hellip; It is going to be a lower concentration, so this should be plus, right?"</i></li>
<li>(T) The half-life counting table she builds live, which no slide carries: one half-life leaves 50% and eliminates 50%; two half-lives, <i>"you said 75%. Right, so 25% remains."</i>; three, <i>"Three Half-Lives 12.5 87.5."</i> (08-19). And <i>"First order processes, it's gonna take 10 half-lives for 99.9% of the drug to be eliminated from the body."</i> (08-24)</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; three polls and a practice set</b>
<p class="prose"><b>Poll slide, Introduction.pdf.</b> Stem: <i>"The rate of a first-order process is independent of the concentration of drug present."</i> True / False. The class split fifty-fifty; the answer is false, on her reason: <i>"the rate depends on the concentration that's there"</i> (08-19).</p>
<p class="prose"><b>Poll slide, Introduction.pdf, select-all.</b> Stem: <i>"First-order processes are characterized by"</i>. Options: a constant half-life; a constant rate of elimination; dC/dt = &minus;k; units of k of (concentration or amount)/time. Correct: a constant half-life. Her debrief on each distractor: <i>"The rate of elimination &hellip; the rate is constantly changing &hellip; DCDT, you don't see a concentration term there &hellip; And then units of K being concentration or amount per time. Remember K is going to be reciprocal time."</i> (08-19)</p>
<p class="prose"><b>Poll slide opening 2IVBolusAdministration.pdf.</b> Stem: <i>"The half-life of a first-order process is independent of the concentration of drug present."</i> True / False. Correct: true. <i>"no matter how much drug you have for a first-order process, the half-life will be the half-life, 0.693 over the rate constant K"</i> (08-24). Note that this poll and the first one above are the same sentence with <i>rate</i> swapped for <i>half-life</i>, and the answers are opposite.</p>
<p class="prose"><b>Daily practice, Introduction and Math Review.</b> Stem, verbatim: <i>"In an experiment to study the chemical decomposition, a drug solution was prepared and a sample was obtained at different time points. The drug concentrations in the samples and the results were as follows:"</i> followed by a six-row time/concentration table and four parts &mdash; a. the rate constant for the decrease in concentration; b. the initial starting concentration of the solution; c. the time required for exactly half the solution to decompose; d. the time required for the original solution to decompose by 90%. In her first-order version (294.3 mg/L at 2 hr down to 5.5 mg/L at 48 hr) her answers are k = 0.0866 hr<sup>&minus;1</sup> from the 6 hr and 24 hr points, C<sub>0</sub> = 350 mg/L, t&frac12; = 8 hr, t = 26.6 hr. She reuses the identical stem for a zero-order table (338 mg/mL at 2 hr down to 62 mg/mL at 48 hr), where her answers are k = 6 (mg/mL)/hr, C<sub>0</sub> = 350 mg/mL, t&frac12; = 29.2 hr, t = 52.5 hr.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>A data table with the order withheld, then the same four parts in the same order: rate constant, initial concentration, half-life, time to 90% decomposed. Deciding the order is the whole exercise, and the identical stem is served once as first order and once as zero order.</li>
<li>The paired stem: <i>"A solution of a drug was freshly prepared at a concentration of X mg/mL. After N days at 25&deg;C, the drug concentration in the solution was Y mg/mL"</i>, followed by <i>"a. Assuming first-order kinetics, when will the drug decline to one-half of the original concentration? b. Assuming zero-order kinetics, &hellip;"</i> &mdash; the same two numbers worked both ways. The 25&deg;C is always stated and never used.</li>
<li>Where the percentage is a power of one half she expects half-life counting rather than the logarithmic route: <i>"If the half-life for decomposition of a drug is 8 hours, how long will it take for 750 mg of the drug to decompose by 87.5%?"</i>, answered as three half-lives, 24 hours, with the 750 mg never used.</li>
<li>Conceptually she sets true/false and select-all items whose two halves are <i>rate</i> and <i>half-life</i>, and the correct answer turns on which of the two is the constant one.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m1-5">
<h3>Module 1, objective 5 &mdash; Determine the area under the curve for a provided data set using the trapezoidal rule</h3>
<div class="gbar"><span>Objective</span><b>Determine the area under the curve for a provided data set using the trapezoidal rule</b><i>Introduction.pdf slides 22&ndash;26</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>The concept of area under the curve (AUC) is introduced on its own slide &mdash; Introduction.pdf slide 22.</li>
<li>AUC<sub>total</sub> is the sum of each segment of AUC. It is used to determine the extent of drug absorption or the effectiveness of a given drug after administration by a particular route. AUC<sub>oral</sub>/AUC<sub>IV</sub> = F, where F represents the fraction of oral dose that enters the plasma, the bioavailability factor &mdash; Introduction.pdf slide 23.</li>
<li>The trapezoidal rule, printed as the area of one segment: the mean of the two bounding concentrations multiplied by the time interval between them, summed over segments &mdash; Introduction.pdf slide 24.</li>
<li>The worked example supplies six rows &mdash; 0.5 hr / 38.9 mcg/mL, 1 hr / 30.3, 2 hr / 18.4, 3 hr / 11.1, 4 hr / 6.77, 5 hr / 4.10 &mdash; and asks: <i>"What is the AUC from hours 2 &ndash; 4?"</i> &mdash; Introduction.pdf slide 25.</li>
<li>Summary: the trapezoidal rule is a simplistic way of estimating the area under the concentration-versus-time curve &mdash; Introduction.pdf slide 26.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) What AUC is for, in her words: <i>"for us, that tells us about the extent of drug that is available for the body to use"</i> (08-19), repeated at the review as <i>"area under the curve is a concept that tells us something about the extent of drug that's available for the body to use"</i> (09-09).</li>
<li>(T) The printed formula reduced to the geometry: <i>"trapezoidal rule says we take our curve, we break it up into little segments, and then we determine the area of each of those little segments, and then we just use this long what looks like a complicated calculation, but it is basically the calculations from, I'm gonna say math 0.5, like fifth grade math when you had geometry, where it's one half base times height"</i> (08-19).</li>
<li>(T) The units, which she flags as unfamiliar: <i>"Micrograms per mil times hour, kind of funky units."</i> (08-19)</li>
<li>(T) The other reason AUC recurs, stated in two later modules: <i>"Another reason that we like clearance. Is that it directly relates the dose to that area under the curve."</i> (08-24, repeated 09-09)</li>
</ul>

<div class="gpoll"><b>Her own question &mdash; worked example slide, Introduction.pdf slide 25</b>
<p class="prose">The AUC from hours 2 to 4 off the six-row table. Her working aloud: <i>"18.4. Plus 11.1 divided by 2 plus. 11.1 + 6.77. Divide by 2 You guys getting something like this, 23.7?"</i> (08-19). Answer: 23.7 mcg&middot;hr/mL, as the sum of two trapezoids each of width one hour.</p>
<p class="prose">This is the only AUC problem in the corpus. No daily practice set, homework or in-class sheet in the collected files sets an AUC or trapezoidal-rule question.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>She names the interval in hours and expects the trapezoids between the tabulated rows that fall inside it &mdash; two segments here, not the whole table and not an extrapolated tail.</li>
<li>The table is supplied with an awkward first interval (0.5 hr) that is outside the asked interval, so the first step is choosing rows, not calculating.</li>
<li>The answer carries concentration multiplied by time, and she says the unit combination aloud rather than printing it.</li>
</ul></div>
</section>

<h2>Module 2 &mdash; IV bolus, one and multi-compartment</h2>
<p class="prose">Six objectives, printed on the two "Lecture Objectives" slides of 2IVBolusAdministration.pdf &mdash; three for the one-compartment lecture of 24 August and three for the multicompartment lecture of 26 August. Both sets are reprinted unchanged on RecapExam1.pdf.</p>

<section class="gobj" id="gobj-m2-1">
<h3>Module 2, objective 1 &mdash; Describe a one-compartment model, IV bolus injection</h3>
<div class="gbar"><span>Objective</span><b>Describe a one-compartment model, IV bolus injection</b><i>2IVBolusAdministration.pdf, slides "One-Compartment Open Model" and "Concentration of Drug in the Plasma, Cp"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>The one-compartment open model with IV bolus administration is the simplest way to describe drug distribution and elimination; it assumes that the drug can enter and leave the body; and the body acts like a single, uniform compartment. The diagram carries an IV arrow in and a k arrow out, with C<sub>p</sub> = D<sub>B</sub>/V<sub>D</sub>, dD<sub>B</sub>/dt = &minus;kD<sub>B</sub>, and k = k<sub>m</sub> + k<sub>e</sub>. D<sub>B</sub> is drug in body at time t; V<sub>D</sub> is volume of distribution &mdash; 2IVBolusAdministration.pdf, slide "One-Compartment Open Model: IV Bolus Administration".</li>
<li>The concentration of drug in the plasma follows dC<sub>p</sub>/dt = &minus;kC<sub>p</sub>, written out as log C<sub>p</sub> = &minus;kt/2.3 + log C<sub>p</sub><sup>0</sup>, ln C<sub>p</sub> = &minus;kt + ln C<sub>p</sub><sup>0</sup>, and C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup> &mdash; 2IVBolusAdministration.pdf, slide "Concentration of Drug in the Plasma, Cp".</li>
<li>Summary: the one-compartment open model represents the simplest way of describing the process of drug distribution and elimination in the body &mdash; 2IVBolusAdministration.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The two assumptions together, and that they are assumptions: <i>"the drug goes into the body all at once, like instantly all the drug is into the body and all the drug is instantly uniformly distributed throughout the body. Assumptions, simplifications, this does not happen."</i> (08-24)</li>
<li>(T) Elimination starts at once: <i>"all the drug goes in, all the drug goes out. As soon as that drug is in the body, it starts immediately being eliminated as well."</i> (08-24). The name for the input: <i>"We call that instantaneous input of drug into the body."</i></li>
<li>(T) What the phrase "IV bolus" is meant to trigger: <i>"if I tell you that we are administering a drug via IV bolus injection. Then you should think. Whichever form of this equation you like."</i> (08-24) &mdash; and the order that goes with it, from the review: <i>"if I tell you that it is an IV bolus dose that is ad- administered, your expectation is what? First."</i> (09-09)</li>
<li>(T) What an unsubscripted k means: <i>"KM is a rate constant for metabolism, KE is the rate constant for excretion &hellip; If you see K with no subscript, that is our overall rate constant for elimination. So, all the process is wrapped up into there."</i> (08-24)</li>
<li>(T) Which of the three printed forms she works in, which the slide does not settle: <i>"this is my preferred equations down here with natural log, but either one gets you there."</i> (08-19)</li>
<li>(T) A drawing step she recommends before calculating: <i>"when you see the question that says IV bolus administration, your brain, even on the side of your paper, draw your little curve that starts up high, comes down low."</i> (09-02)</li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">No poll or practice question in the collected sources asks this objective on its own. It is examined inside the calculation questions of objective 3, where the model is either stated in the stem or left to be inferred.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>The model is a stem condition, not a question. She states it outright about half the time &mdash; "one-compartment, first-order elimination", "one-compartment open model", "linear, first-order, one compartment pharmacokinetics" &mdash; and omits it in the data-table problems, where inferring the order is the point.</li>
<li>When she gives a graph instead, the reading rule is fixed: on a logarithmic concentration axis, a single straight line following an IV bolus dose is the one-compartment model.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m2-2">
<h3>Module 2, objective 2 &mdash; Define key pharmacokinetic parameters &ndash; clearance and volume of distribution</h3>
<div class="gbar"><span>Objective</span><b>Define key pharmacokinetic parameters &ndash; clearance and volume of distribution</b><i>2IVBolusAdministration.pdf, slides "Volume of Distribution" (two) and "Clearance"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>The volume of distribution is a hypothetical volume of body fluid that would be required to dissolve the total amount of drug at the same concentration as that found in the blood. It is a proportionality constant relating the amount of drug in the body to the measured concentration in the biological fluid. V<sub>D</sub> = D<sub>B</sub>/C<sub>p</sub> &mdash; 2IVBolusAdministration.pdf, first slide "Volume of Distribution".</li>
<li>A large V<sub>D</sub> means the drug is more concentrated in extravascular tissues and less concentrated intravascularly. A drug highly bound to plasma proteins or remaining in the vascular region gives a higher C<sub>p</sub> and a smaller V<sub>D</sub>. The apparent V<sub>D</sub> can be expressed as a simple volume or as a percent of body weight, and in the percent form a 1-L volume is assumed equal to the weight of 1 kg &mdash; 2IVBolusAdministration.pdf, second slide "Volume of Distribution".</li>
<li>Clearance is a measure of drug elimination from the body without identifying the mechanism or process; it is the volume of plasma that is cleared of drug per unit time; the same quantity is called drug clearance, systemic clearance and total body clearance. The slide carries Cl = kV<sub>D</sub> and Cl<sub>T</sub> = D<sub>0</sub>/AUC<sub>0</sub> &mdash; 2IVBolusAdministration.pdf, slide "Clearance".</li>
<li>A fish tank model of clearance is presented from a 2026 American Journal of Pharmaceutical Education article &mdash; 2IVBolusAdministration.pdf, slide "Fish Tank Model of Clearance".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The word "apparent" and why it is there: <i>"this volume of distribution. Is hypothetical, right? It's not an actual volume, it depends on the drug."</i> and <i>"you will often see apparent volume of distribution just kind of to remember that, you know what, it is a proportionality, it's not a real number"</i> (08-24).</li>
<li>(T) The kilogram-to-litre convention stated as a rule: <i>"in kinetics, our body weight is always in kilograms &hellip; So, 1 L volume is equal to 1 kg of, of body weight"</i> (08-24). Her check on the answer's unit: <i>"I hear 14. 14 apples, 14 L, OK? Not 14 kg 14 L"</i>.</li>
<li>(T) The clearance equation is not supplied: <i>"this is another one that it will not be on your equation sheet cause I want you to take this one with you to your grave along with the half-life equation. Clearance is equal to k times vd."</i> (08-24)</li>
<li>(T) Why she prefers clearance to the elimination rate: <i>"what we like about clearance is that clearance. For most drugs in most situations, it's going to be a constant &hellip; a constant times a constant is a constant."</i> (08-24), and <i>"our volume of distribution is going to be a constant &hellip; and our rate constant K is going to be a constant."</i></li>
<li>(T) The second reason: <i>"Another reason that we like clearance. Is that it directly relates the dose to that area under the curve."</i> (08-24)</li>
<li>(T) Three volumes she narrates against the same dose, which the slide does not print: <i>"if we inject 100 mg into a volume of distribution that is 1 L, then we expect 100 mg per liter as our concentration. Next 1 100 mg 10 L, we inject. OK. Then we are getting a concentration of 10 mg per liter. And then this one, when we have the largest volume distribution, same 100 mg into 100 L, now we're at 1 mg per liter"</i> &mdash; with the caveat <i>"same amount of drugs, but here, we would be looking at different drugs"</i> (08-24).</li>
<li>(T) On the fish tank slide, she limits it: <i>"This little model, I like it, but it goes into a little bit more detail than what we're gonna cover."</i> The part she does use: <i>"Only the free drugs, so only the free fish. are able to be swept swept up into this net. The ones that are tied up with the little um algae down there, they're bound, so they can't be swept up"</i> (08-24).</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; three polls</b>
<p class="prose"><b>Poll slide, 2IVBolusAdministration.pdf.</b> Stem: <i>"Which parameter describes the elimination of drug in terms of volume of fluid removed from the drug per unit time?"</i> Options: biotransformation; clearance; elimination rate; excretion. Correct: clearance, which she debriefed on 08-26 as <i>"a definitional one. Basically, what does clearance mean? So remember, um, it is basically the volume of fluid that cleared of drug per unit time"</i> and set again on 09-14.</p>
<p class="prose"><b>Poll, 08-24.</b> Stem: <i>"Clearance increases as concentration increases. True or false."</i> Correct: false. <i>"We like clearance because it is a constant &hellip; changing the concentration does not change the clearance."</i></p>
<p class="prose"><b>Poll slide opening 3IntravenousInfusions.pdf.</b> Stem: <i>"Which of the following would you expect to increase with an increase in IV bolus dose?"</i> Options: concentration of drug in the plasma; clearance; elimination half-life; apparent volume of distribution. Correct: concentration of drug in the plasma. <i>"our clearance, our half-life, and our volume of distribution. These things are going to be constant."</i> (09-02)</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>Conceptually, as a true/false or single-best-answer on what stays constant when something else changes. Doubling the dose, raising the concentration: the item is which parameters move and which do not.</li>
<li>She closes several calculation problems with the same idea in prose: <i>"If the dose were doubled, what is the expected change in the half-life of elimination?"</i>, <i>"&hellip;in the clearance?"</i>, <i>"&hellip;in the initial plasma concentration?"</i> &mdash; answered none, none, and doubled.</li>
<li>Numerically, V<sub>D</sub> arrives in four rotated framings: per kilogram (3 L/kg, 0.5 L/kg, 400 mL/kg), as a percent of body weight (20%, 23.1%), as an absolute volume (16 L, 12 L), or not at all, to be back-calculated from dose divided by C<sub>0</sub>.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m2-3">
<h3>Module 2, objective 3 &mdash; Calculate pharmacokinetic parameters from concentration versus time data</h3>
<div class="gbar"><span>Objective</span><b>Calculate pharmacokinetic parameters from concentration versus time data</b><i>2IVBolusAdministration.pdf, slide "Practice"</i></div>

<h4>What the slides carry</h4>
<ul>
<li>The practice slide, verbatim: <i>"A new drug was administered as a single IV dose of 200 mg to an 80-kg adult male. After 6 hours, the plasma drug concentration was 15 mg/L of plasma. Assuming that the apparent V<sub>D</sub> is 10% of body weight, estimate the amount of drug in the body after 12 hours. What is the half-life of this drug in this patient?"</i> &mdash; 2IVBolusAdministration.pdf, slide "Practice".</li>
<li>The relations the calculation runs on are the ones already printed two slides earlier: C<sub>p</sub> = D<sub>B</sub>/V<sub>D</sub> and C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup>, with clearance as kV<sub>D</sub> on the slide that follows.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) Her worked answer, step by step (08-24): V<sub>D</sub> &mdash; <i>"did we all get a volume of distribution of 8 L?"</i>; amount at 6 hr &mdash; <i>"8 L times 15 mg per liter"</i>, giving 120 mg; the rate constant &mdash; <i>"natural log D0 over D. Divided by T is going to give us a rate constant K &hellip; So we've got 200/120. And our time is 6 hours"</i>, giving 0.085; amount at 12 hr &mdash; <i>"D 0 is 200. I'm gonna write my milligrams. E minus 0.085 times 12. And I'm getting 72-ish milligrams"</i>; half-life &mdash; <i>"what's the Half-Life? 8. 8.15 hours."</i></li>
<li>(T) The trap in this specific problem: <i>"You have a dose. Of 200 mg and then you are given a concentration. Of 15 mg per liter, right? So you gotta be apples to apples here, right? You can either go with amount. Or concentration, but you got, you can't do the 200 and the 15."</i> (08-24)</li>
<li>(T) She separates the printed question from her own addition: <i>"my question on the slide, estimate the amount of drug in the body after 12 hours. So the amount of drug in the body after 12 hours should be about 72 mg. Then, impromptu, I added, what's the concentration? That's not on the slide."</i> The added answer: <i>"you take that 72 &hellip; divided by the volume of distribution, which we said was 8 L. And you should get 9 mg per liter"</i> (08-24).</li>
<li>(T) A check on C<sub>0</sub> when it comes from a data set: <i>"remember, C0 should be the highest point of the sample"</i> (08-24).</li>
<li>(T) The conversion she hands over to save time: <i>"Milligrams per liter equals micrograms per mL. OK. I am telling you this because I don't want you to spend 10 minutes doing the conversion and then being off by a magnitude of 10"</i> (08-24, repeated 08-26 and 09-09).</li>
<li>(T) Answers are scored for form as well as value: <i>"There should never be a leading decimal &hellip; If you give me that as your final answer, you will lose half the points for this answer."</i> and <i>"If there are units. Then you should give me units."</i> (08-17)</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; the deck example and the standard battery</b>
<p class="prose"><b>Slide "Practice", 2IVBolusAdministration.pdf.</b> Quoted in full above; her answers are V<sub>D</sub> 8 L, D at 6 hr 120 mg, k 0.085 hr<sup>&minus;1</sup>, D at 12 hr about 72 mg, t&frac12; 8.15 hr, and off-slide C at 12 hr 9 mg/L.</p>
<p class="prose"><b>Daily practice, IV Bolus Practice 1 and 2.</b> Her eight-part battery, in this fixed order: a. elimination rate constant; b. half-life of elimination; c. initial plasma concentration; d. concentration of drug in the plasma 15 minutes after the dose was given; e. apparent volume of distribution; f. total body clearance of this drug in this patient; g. the amount of drug in the body 3 hours after the drug was administered; h. time required for 99.9% of the drug to be eliminated from the body. One version feeds it with a six-row table, the other with two plasma points in prose.</p>
<p class="prose"><b>Exam 1 review practice, RecapExam1.pdf.</b> <i>"A 154-lb female patient received a single IV bolus dose of an antibacterial drug at a level of 15 mg/kg. The concentration of the drug determined at 2 hours and 8 hours was 32.85 mcg/mL and 9.32 mcg/mL, respectively."</i> Four parts: half-life, initial concentration, apparent volume of distribution, clearance. Her spoken answers (09-09): k 0.21 hr<sup>&minus;1</sup> over a delta-t of six hours, t&frac12; 3.3 hr, dose 1050 mg, C<sub>0</sub> 50 mcg/mL, V<sub>D</sub> 1050/50 = 21 L, clearance 0.21 &times; 21. The captions also carry "51 liters" and "4.14"; 21 L and 4.41 L/hr are the values her own numbers produce, and an exam written from this lecture would key those.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>One patient, then a chain of small parts off that one patient, each answerable in a minute or two: <i>"I am going to ask you a little piece of information that you should be able to, to figure out in a minute or two. So, if you're taking 5 minutes trying to answer a question, you're working too hard on it."</i> On the exam the chain is broken up and there is no backwards navigation.</li>
<li>Weight in pounds whenever she wants the 2.2 conversion tested, and paired with mg/kg dosing so the conversion gates everything downstream. Weight in kilograms when it is incidental, and sometimes stated and never used at all.</li>
<li>"15 minutes" is given in minutes and converted silently to 0.25 hr; "99.9% eliminated" always resolves to ten half-lives.</li>
<li>Two routes to the same answer are shown side by side and either is accepted: half-life counting against the exponential equation, V<sub>D</sub>C<sub>t</sub> against D<sub>0</sub>e<sup>&minus;kt</sup>.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m2-4">
<h3>Module 2, objective 4 &mdash; Differentiate between single and multiple-compartment pharmacokinetic models</h3>
<div class="gbar"><span>Objective</span><b>Differentiate between single and multiple-compartment pharmacokinetic models</b><i>2IVBolusAdministration.pdf, slides "Why Multicompartment Models?" through "Plasma Level&ndash;Time Curve"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>A plot of log C<sub>p</sub> against time carrying a line that is not straight, under the heading asking why multicompartment models are needed &mdash; 2IVBolusAdministration.pdf, slide "Why Multicompartment Models?".</li>
<li>Multi-compartment models describe the observation of some drugs that distribute at various rates into different tissue groups &mdash; 2IVBolusAdministration.pdf, slide "One- versus Two-Compartment Models".</li>
<li>The method of residuals, also called feathering or peeling, is a procedure for fitting a curve to the experimental data of a drug when the drug does not clearly follow a one-compartment model. The residual plasma concentration, the rapidly distributed alpha phase, is obtained by subtracting the extrapolated line from the observed data &mdash; 2IVBolusAdministration.pdf, slide "Method of Residuals".</li>
<li>The plasma level&ndash;time curve for a two-compartment model is labelled with a distribution phase &mdash; 2IVBolusAdministration.pdf, slide "Plasma Level&ndash;Time Curve for Two-Compartment Model".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The graph-reading rule, stated as an exam instruction: <i>"if I give you a graph that looks something like this without the red and blue and just a log scale and I'm telling you that it is an IV bolus dose, and I just give you a, a line that looks like this one, the black line. That should say to you that this is a two compartment model. If I gave you a graph on a log scale that looks just like the blue line all by itself, that tells you it's an IV bolus dose one compartment model."</i> (08-26)</li>
<li>(T) Otherwise she has to say which it is: <i>"if I tell you that we're giving an IV bolus dose, now what do I have to tell you? I, I, I have to tell you that it follows a one compartment model or a two compartment"</i> (08-26).</li>
<li>(T) Names for the two segments: <i>"This handle piece up top is what we would call our distribution phase"</i> and <i>"once the drug is distributed uniformly throughout the body &hellip; Then we call this blue phase our elimination phase"</i> (08-26).</li>
<li>(T) The one-compartment contrast restated at the review: <i>"that two compartment model has got that distribution step, so it doesn't uniformly distribute &hellip; all at once."</i> (09-09)</li>
<li>(T) Feathering is conceptual only, and she says so plainly: <i>"we talked about um feathering. Um, the methods of residual and all that good stuff, I want you to conceptually know what that is, but I'm not gonna ask you to do that. I am pretty much gonna give you A, B, alpha, beta, OK? I want you to know what they represent and why we use them."</i> (08-26)</li>
<li>(T) The log axis again, on this deck's graphs: <i>"Even though it doesn't say log, you realize that it is on a log scale, right?"</i> (08-26)</li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">No poll or practice item in the collected sources asks the one-against-two discrimination directly. The discrimination is built into the stems of the two-compartment problems, which she never labels two-compartment: she supplies A, B, alpha and beta, or a biexponential equation, and asks for parameters only a two-compartment model has.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>As a graph on a logarithmic concentration axis with the compartment count withheld, where a single straight line and a line with a steeper early segment are the two answers.</li>
<li>As a stem that never says "two-compartment" but hands over a biexponential equation, so recognising the model is the first step of a calculation question rather than a question of its own.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m2-5">
<h3>Module 2, objective 5 &mdash; Explain why some drugs best fit a multi-compartment model</h3>
<div class="gbar"><span>Objective</span><b>Explain why some drugs best fit a multi-compartment model</b><i>2IVBolusAdministration.pdf, slides "General Grouping of Tissues" through "Relationship between Tissue and Plasma Concentrations"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Tissues grouped by blood supply. Highly perfused: heart, brain, hepatic-portal system, kidney and endocrine glands, 9% of body weight; skin and muscle, 50%; adipose (fat) tissue and marrow, 19%. Slowly perfused: bone, ligaments, tendons, cartilage, teeth and hair, 22% &mdash; 2IVBolusAdministration.pdf, slide "General Grouping of Tissues According to Blood Supply".</li>
<li>Examples of two-compartment models are shown as three wirings: elimination from the central compartment, elimination from the tissue compartment, and elimination from both &mdash; 2IVBolusAdministration.pdf, slide "Examples of Two-Compartment Models".</li>
<li>The two-compartment open model for IV bolus injection is drawn as a central compartment D<sub>p</sub>, C<sub>p</sub>, V<sub>p</sub> exchanging with a tissue compartment D<sub>t</sub>, C<sub>t</sub>, V<sub>t</sub> by k<sub>12</sub> and k<sub>21</sub>, with input into the central compartment and elimination k out of the central compartment. The differential equations printed are dC<sub>t</sub>/dt = k<sub>12</sub>C<sub>p</sub> &minus; k<sub>21</sub>C<sub>t</sub> and dC<sub>p</sub>/dt = k<sub>21</sub>C<sub>t</sub> &minus; k<sub>12</sub>C<sub>p</sub> &minus; kC<sub>p</sub> &mdash; 2IVBolusAdministration.pdf, slide "Two-Compartment Open Model (IV Bolus Injection)".</li>
<li>A figure relates tissue and plasma concentrations for a two-compartment open model &mdash; 2IVBolusAdministration.pdf, slide "Relationship between Tissue and Plasma Concentrations for a Two-Compartment Open Model".</li>
<li>Summary: multi-compartment models are useful to help explain the pharmacokinetics when the plasma level&ndash;time curve does not decrease linearly following a single IV bolus injection of a drug &mdash; 2IVBolusAdministration.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The reason in one sentence: <i>"the drug is going to go preferentially to some organs before it is widely distributed uniformly throughout the body"</i> (08-26).</li>
<li>(T) Which of the three printed wirings the course uses: <i>"if we've got a central compartment, it's going to and from that tissue compartment, so equilibrating within whatever peripheral compartment makes up the secondary compartment, and then that the drug is being eliminated from the central compartment only."</i> (08-26)</li>
<li>(T) What k<sub>12</sub> and k<sub>21</sub> are: <i>"Remember, those are our transfer constants, so how fast is the drug going from one compartment or the central compartment to the peripheral compartment and back and forth."</i> (08-26)</li>
<li>(T) An exception to the perfusion table that is not printed on it: <i>"we've also got the brain, and what you know about the brain is that the brain works really hard to keep things out &hellip; So, even though it is a highly profuse organ &hellip; not necessarily one of those that is going to be, um, Usually seen in that distribution phase."</i> (08-26). The slide lists brain among the highly perfused tissues; she removes it from the distribution phase out loud. An exam written from these lectures would key the slide's grouping for a tissue-perfusion question and her caveat for a question about what appears in the distribution phase.</li>
<li>(T) On the tissue-versus-plasma figure, a limit the slide does not state: <i>"this is a theoretical graph &hellip; because remember, we sample the plasma, right? We don't sample tissue to see how much drug is there."</i> (08-26)</li>
<li>(T) On the perfusion table: <i>"general grouping of tissues, um, table, don't panic"</i> (08-26), consistent with her standing rule that tables are not memorised.</li>
<li>(T) Why the distribution phase has to be faster than elimination: <i>"If the elimination phase is significantly fast relative to the distribution phase, then you're not going to build up appreciable levels. You're not gonna reach the concentration that you need for the drug to be effective"</i> (08-26).</li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">No poll or practice question in the collected sources asks this objective. It is treated in the lecture as explanation rather than as an item, and the only thing she says will be asked from these slides is what A, B, alpha and beta represent and why they are used.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>As a reason, in prose, not a calculation. She names the two things she wants back: what the parameters represent, and why the model is used.</li>
<li>She rules out the arithmetic that these slides would otherwise support: no feathering, no method-of-residuals working, and the alpha and beta values handed over instead.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m2-6">
<h3>Module 2, objective 6 &mdash; Predict drug concentration following IV bolus administration in a multi-compartment model</h3>
<div class="gbar"><span>Objective</span><b>Predict drug concentration following IV bolus administration in a multi-compartment model</b><i>2IVBolusAdministration.pdf, slides "Concentration of Drug in the Central Compartment" through "Apparent Volumes of Distribution"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>The concentration in the central compartment is C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup>, with C<sub>p</sub><sup>0</sup> = A + B, shown against a log C<sub>p</sub> plot on which A is the distribution intercept and B the elimination intercept &mdash; 2IVBolusAdministration.pdf, slide "Concentration of Drug in the Central Compartment".</li>
<li>The practice slide, verbatim: <i>"The equation below describes theophylline kinetics in nine human volunteers. What is the plasma level of theophylline 3 hours after an IV bolus dose?"</i> with C<sub>p</sub> = 18e<sup>&minus;5.8t</sup> + 12e<sup>&minus;0.16t</sup> &mdash; 2IVBolusAdministration.pdf, slide "Practice".</li>
<li>The beta half-life is t&frac12;<sub>b</sub> = 0.693/b &mdash; 2IVBolusAdministration.pdf, slide "Beta Half-life".</li>
<li>Three rate constants are given in terms of A, B, a and b: the overall elimination rate constant k, the transfer constant k<sub>12</sub> from compartment 1 to 2, and the transfer constant k<sub>21</sub> from compartment 2 to 1 &mdash; 2IVBolusAdministration.pdf, slide "Rate Constants".</li>
<li>Several different volumes of distribution can be calculated for multi-compartment models: V<sub>p</sub> from the dose and A + B, V<sub>p</sub> from the dose and the area under the curve, and V<sub>t</sub> from V<sub>p</sub> with k<sub>12</sub> and k<sub>21</sub> &mdash; 2IVBolusAdministration.pdf, slide "Apparent Volumes of Distribution".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) What the four parameters are: <i>"Our A and our B are our intercepts, right? So we've done some extrapolation to get the intercepts, and then our lowercase A and B are the slopes. That tells us about the rates of both processes."</i> (09-09)</li>
<li>(T) Which of alpha and beta is larger, and why: <i>"Alpha bigger because the, the distribution phase is gonna happen a lot faster than an elimination phase"</i> (08-26). Her check on the theophylline equation: <i>"your, your 5.8 is significantly bigger than your 0.16"</i>.</li>
<li>(T) Which half-life is wanted, and what it is called on the paper: <i>"we don't really care about the half-life of the distribution phase. We care about the half-life of the elimination phase &hellip; 0.693 over B or beta"</i>, and <i>"it will be written as beta Half-Life, OK? Cause that's what I'm, I'm gonna ask you for either the beta Half-Life or the elimination half-life so that there's no confusion"</i> (08-26).</li>
<li>(T) How not to do it: <i>"Don't get all complicated. Don't solve for K and then 0.693 over K. You've, you've done too much work"</i> (08-26); at the review, <i>"You take your 0.693 and you divide by lowercase b."</i> (09-09)</li>
<li>(T) Her worked theophylline answers (08-26): concentration at time zero <i>"30, 30, and since I didn't give you units, my bad"</i>; at three hours <i>"I'm hearing eleven-ish milligrams per liter"</i>; beta half-life <i>"0.693. Of a 0.16. 4.33. 4.33 hours."</i></li>
<li>(T) Her in-class sheet answers, read aloud (08-26): <i>"Did you get the half-life, beta Half-Life, six-ish hours? &hellip; And initial concentration, 13.8 mg per liter? &hellip; Concentration, 4 hours after administration of the dose, 3.4 mg per liter. &hellip; Volume distribution, central compartment, 18-ish liters. &hellip; I got for the overall rate constant K 0.272 per hour. &hellip; And then transfer from 1 to 2, 1.1 per hour. &hellip; And then from 2 to 1, 0.9 per hour."</i></li>
<li>(T) How much of this she will set: <i>"We don't do a lot of this kind of manipulation, but we'll do a little practice today just so that you can get a feel for what it looks like and what the numbers look like"</i> (08-26).</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; the deck example and the review practice</b>
<p class="prose"><b>Slide "Practice", 2IVBolusAdministration.pdf.</b> Theophylline, C<sub>p</sub> = 18e<sup>&minus;5.8t</sup> + 12e<sup>&minus;0.16t</sup>, plasma level three hours after an IV bolus dose. Her answers: C at time zero 30 (units not given), C at 3 hr about 11 mg/L, t&frac12;<sub>beta</sub> 4.33 hr.</p>
<p class="prose"><b>Exam 1 review practice, RecapExam1.pdf.</b> <i>"The equation below describes the kinetics of a medicinal agent following IV bonus injection of a 500 mg dose. (Units of C and t are mcg/mL and hr, respectively)"</i> with C = 15e<sup>&minus;3.4t</sup> + 7e<sup>&minus;0.12t</sup>, then three parts: the elimination half-life; the concentration 6 hours after administration of the dose; the apparent volume of distribution of the central compartment. Her spoken answers (09-09): elimination half-life 0.693/0.12 = <i>"5.8. &hellip; Did everybody get something like 5.8 hours?"</i>; the central volume as <i>"500 divided by 22"</i>, the quotient not stated aloud; the 6-hour concentration not worked, <i>"I'm gonna trust that you guys can do that."</i></p>
<p class="prose"><b>Daily practice, IV Bolus Practice 4 and Homework 2.</b> The biexponential stem, with the parenthetical <i>"(Concentration is given in mcg/mL and time in hours)"</i> printed identically in both, followed by the same four parts each time: elimination half-life from beta; initial concentration as A + B; concentration at 4 hours; volume of the central compartment as dose divided by A + B.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>She hands over the equation and never says "two-compartment". The parameters in it are the whole stem, and the first question is almost always the elimination half-life off the smaller exponent.</li>
<li>The four parts recur in the same order and the same wording across two practice sets, a homework and the review deck: half-life, initial concentration, a concentration at a stated hour, central volume of distribution.</li>
<li>Units are fixed in a parenthetical rather than on the numbers, so the answer's units come from the stem's parenthetical, not from the equation.</li>
<li>Where she gives A, B, alpha and beta as a list instead of an equation, she adds the three rate constants and the central volume to the same battery.</li>
</ul></div>
</section>

<h2>Module 3 &mdash; Intravenous infusion</h2>
<p class="prose">Seven objectives, printed on the "Objectives" slide of 3IntravenousInfusions.pdf and reprinted unchanged on RecapExam1.pdf.</p>

<section class="gobj" id="gobj-m3-1">
<h3>Module 3, objective 1 &mdash; Discuss and describe the pharmacokinetics of a medicinal agent following administration by IV infusion</h3>
<div class="gbar"><span>Objective</span><b>Discuss and describe the pharmacokinetics of a medicinal agent following administration by IV infusion</b><i>3IntravenousInfusions.pdf, slide "Intravenous Infusion"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Intravenous infusion allows for precise control of plasma drug concentration, and the drug is administered at a constant rate of input. The plotted C<sub>p</sub> against time starts at zero and rises to a plateau &mdash; 3IntravenousInfusions.pdf, slide "Intravenous Infusion".</li>
<li>Summary: IV infusion, the administration of drug into the body at a constant rate, is useful to achieve precise control of plasma concentration; and given basic pharmacokinetic parameters, the plasma concentration can readily be predicted at any time during or after an intravenous infusion &mdash; 3IntravenousInfusions.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) What "constant rate" is meant to trigger, which the slide leaves unsaid: <i>"Constant rate in pharmacokinetics. What does that say to us? So we've talked about two types of processes, right? Zero order, right? So when we see constant rate, we're talking about a zero order."</i> (09-02)</li>
<li>(T) The two orders in one sentence: <i>"Our input is zero order, constant in, first order out. When we stop the in, then it's just out."</i> (09-02)</li>
<li>(T) What has and has not changed from the previous module: <i>"the only thing we've changed here, we haven't changed the drug, we've changed the manner that we put the drug in the body."</i> (09-02)</li>
<li>(T) Why infuse at all: <i>"we do the infusion because it allows us to control, to to really control the plasma concentration of drug"</i> (09-02).</li>
<li>(T) The shape to draw before calculating: <i>"IV infusion, we're starting low and we're building."</i> (09-02)</li>
<li>(T) Units of the infusion rate, flagged as a thing to know: <i>"what I want you to know about this one, this are. The units of r. Are going to be a mount. Per time. So most often milligrams per hour."</i> (09-02)</li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">The poll printed on this deck's title slide is an IV bolus recall item, not an infusion item, and is recorded under Module 2 objective 2. No poll or practice question in the collected sources asks this objective on its own; it is the frame for every calculation in the module.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>Infusion problems arrive as clinical recommendations in the second person: <i>"You are asked to recommend&hellip;"</i>, <i>"What rate &hellip; would you infuse this drug&hellip;"</i>, <i>"What rate of infusion and loading dose would you recommend&hellip;?"</i></li>
<li>The stem carries a patient vignette with an indication and a weight, and often a compounding detail such as 200 mg dissolved in 500 mL of 5% dextrose, which is there for a later millilitres-per-minute part.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m3-2">
<h3>Module 3, objective 2 &mdash; Describe the concept of steady state and how it relates to continuous dosing</h3>
<div class="gbar"><span>Objective</span><b>Describe the concept of steady state and how it relates to continuous dosing</b><i>3IntravenousInfusions.pdf, slides "Drug Concentration at Steady-State" and "Drug Concentration Prior to Reaching Steady-State"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Steady state is achieved when rate in equals rate out, and the steady-state concentration is C<sub>ss</sub> = R/Cl = R/kV<sub>D</sub> &mdash; 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State".</li>
<li>Before steady state, C<sub>p</sub> = (R/Cl)(1 &minus; e<sup>&minus;kt</sup>), and the term (1 &minus; e<sup>&minus;kt</sup>) gives the fraction of steady-state concentration achieved after infusing the drug for an amount of time t &mdash; 3IntravenousInfusions.pdf, first slide "Drug Concentration Prior to Reaching Steady-State".</li>
<li>At very early times after the infusion is started, (1 &minus; e<sup>&minus;kt</sup>) is a small fraction; at times approaching five half-lives after the infusion is started, it begins to approach 1 &mdash; 3IntravenousInfusions.pdf, second slide "Drug Concentration Prior to Reaching Steady-State".</li>
<li>A third slide of the same title plots the rising curve with C<sub>ss</sub> and the fraction of C<sub>ss</sub> achieved marked against it &mdash; 3IntravenousInfusions.pdf, third slide "Drug Concentration Prior to Reaching Steady-State".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The answer she wants memorised word for word: <i>"I want you to hear me, hear my voice in your head. So if I ask you how long it takes to get steady state following IV infusion, the simplest answer. Is 3 to 5 half-lives, OK?"</i> (09-02) &mdash; with the boundary on when that answer is not enough: <i>"3 to 5 half-lives is a short answer. If I ask you more specific, if I ask you how long does it take to get to 95% steady state, then that's a different calculation."</i></li>
<li>(T) Steady state defined: <i>"steady state we say is achieved when the rate of drug in the body is equal to the rate of drug out of the body"</i>, and <i>"the rate out will continue to increase until we reach this steady-state concentration or steady state kind of plateau"</i> (09-02).</li>
<li>(T) The plateau is never actually reached: <i>"remember, this is an asymptotic curve, so we're never actually going to reach steady state, we're gonna get close. So, 10 gets us 99.9, 11 gets us 99.99"</i> (09-02).</li>
<li>(T) The fraction table she builds live, which no slide carries: one half-life <i>"So I'm getting 0.5"</i>; two, <i>"we should be at 75%"</i>; three, <i>"87.5"</i>; four, 93.25 (at the review she gives 93 for the same step); ten, <i>"99.9% of the steady-state concentration"</i> (09-02). Her link back to the previous module: <i>"Does this look familiar? &hellip; Now we're seeing the same thing. But this time we're going this way"</i>, restated at the review as <i>"One half-life is the time for 50% of whatever you've got to be eliminated. If we're now going this way, then one half-life is 50, the time it'll take to get to 50% of our steady state concentration."</i></li>
<li>(T) The point she repeats on purpose: <i>"changing the rate changes our steady state concentration with me. OK, I feel like I've said it 5 times, and I've said it 5 times because this is one of those things that I want you to take with you. OK, so I've said it 5 times. I'm gonna ask it of you 10 times."</i> (09-02)</li>
<li>(T) The matching exam item shape: <i>"if you get a question that says, 'Increasing the rate of infusion will decrease or ha- double or do whatever funkiness to the time that it takes to get to steady state,' we are clear that it has no impact, right? Because it is three to five half-lives. Depends on the half-life, that rate constant K."</i> (09-09)</li>
<li>(T) A rule of thumb she gives and then withdraws: <i>"3.32. Times the half-life, 3.32 half-lives gets us at 90%. You don't have to remember that, it's in my head"</i> (09-02).</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; worked examples</b>
<p class="prose"><b>Slide "Example 4", 3IntravenousInfusions.pdf.</b> <i>"How long will the infusion have to be continued to achieve 90% steady-state?"</i>, with k = 0.15 hr<sup>&minus;1</sup>. Her working (09-02): <i>"1 minus 0.9, that's gonna give us 0.1 is equal to &hellip; E to the minus 0.15 T. I'm gonna take the natural log of both sides &hellip; And natural log of 0.1. Divided by -0.15."</i> Answer, as she states it: <i>"I'm hearing 15. 15 hours."</i></p>
<p class="prose"><b>Daily practice, IV Infusions Practice 4.</b> Two adjacent parts on the same infusion: <i>"If there were no loading dose, how much time would be required to reach the 5 mg/L level?"</i> with her note <i>"5 mg/L = 50% of Css"</i>, giving one half-life, 6 hr; and <i>"If there were no loading dose, how much time would be required to reach 80% of the steady-state plasma concentration?"</i>, giving 13.93 hr.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>Two shapes sit side by side in her own practice: a percentage that is a power of one half, answered by counting half-lives, and a percentage that is not, answered from (1 &minus; e<sup>&minus;kt</sup>) with a natural logarithm. She prints both routes.</li>
<li>A concentration given in the stem is often a percentage of C<sub>ss</sub> in disguise &mdash; 5 mg/L against a C<sub>ss</sub> of 10 mg/L &mdash; and she expects that to be seen before the calculator is picked up.</li>
<li>The conceptual item is a statement that changing the infusion rate changes the time to steady state, which is false; the time depends on the half-life alone.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m3-3">
<h3>Module 3, objective 3 &mdash; Determine optimum dosing for an infused drug by calculating pharmacokinetic parameters</h3>
<div class="gbar"><span>Objective</span><b>Determine optimum dosing for an infused drug by calculating pharmacokinetic parameters</b><i>3IntravenousInfusions.pdf, slides "Example 1" through "Example 4"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Example 1, verbatim: <i>"What is the expected steady-state concentration of theophylline in a patient?"</i> with t&frac12; = 6 hr, V<sub>D</sub> = 30 L, continuous IV infusion rate 50 mg/hr &mdash; 3IntravenousInfusions.pdf, slide "Example 1".</li>
<li>Example 3, verbatim: <i>"Calculate the C<sub>p</sub> 8 hrs after an infusion of 50 mg/hr has been started"</i>, with Cl<sub>T</sub> = 4.5 L/hr and k = 0.15 hr<sup>&minus;1</sup> &mdash; 3IntravenousInfusions.pdf, slide "Example 3".</li>
<li>Example 4, verbatim: <i>"What will the C<sub>ss</sub> be if the infusion is continued indefinitely?"</i> and <i>"How long will the infusion have to be continued to achieve 90% steady-state?"</i>, on the same parameters as Example 3 &mdash; 3IntravenousInfusions.pdf, slide "Example 4".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) Her Example 1 working: <i>"So our seasteady state. Rate over clearance. 50 mg per hour. Our clearance is 30 L"</i>, with the half-life converted to k, giving <i>"So I'm hearing 14. &hellip; it's still a concentration, so milligrams per liter"</i> (09-02). She later draws the same curve as <i>"our curve for 14.4"</i>, so the value she works with is 14.4 mg/L.</li>
<li>(T) Her Example 4 steady-state answer: <i>"if we continued infusing indefinitely. What's the steady-state concentration? 11.11 &hellip; And then our units, it's a concentration, milligrams per liter."</i> (09-02). The eight-hour concentration of Example 3 is never stated aloud.</li>
<li>(T) Reading before calculating: <i>"I want you to. Step back and look at this question and think about it before you plug it into your calculator. Look at the question and understand what's being, what's being asked."</i> (09-02), and <i>"yes, I want you to be able to punch the numbers, but I want you to think through. What's going on, right? Because they're gonna get bigger and uglier looking."</i></li>
<li>(T) On exam time for these: <i>"I heard somebody say you're gonna run out of time on the exam. No, you won't."</i> and <i>"this won't be like one question on the exam. This is gonna be broken up into little bitty pieces, OK? So don't panic."</i> (09-02)</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; the practice batteries</b>
<p class="prose"><b>Daily practice, IV Infusions Practice 1.</b> <i>"Continuous intravenous infusion of a potent analgesic is recommended for a patient with inoperable colon cancer and a body weight of 110 pounds. The dose is prepared by dissolving 200 mg of the drug in 500 mL of 5% dextrose. The drug is to be infused over 24 hours. The drug has a half-life of 4 hours and an apparent volume of distribution of 3 L/kg. Calculate the following:"</i> Seven parts: a. rate of drug infusion in mg/hr; b. plasma concentration 6 hours after the start of the infusion; c. total amount of drug in the body 12 hours after the start; d. steady-state plasma concentration; e. rate of drug infusion in mL/min; f. an IV bolus loading dose; g. plasma concentration 12 hours after the cessation of the infusion. Her answers: 8.33 mg/hr; 0.207 mg/L; 0.28 mg/L and 42 mg; 0.32 mg/L; 0.35 mL/min; 48 mg; 0.04 mg/L, with k = 0.1733 hr<sup>&minus;1</sup> and V<sub>D</sub> = 150 L from 110 lb converted silently to 50 kg.</p>
<p class="prose"><b>Daily practice, IV Infusions Practice 4.</b> <i>"The therapeutic plasma level of a drug is 4 to 15 mg/L. You would like to immediately attain a steady-state concentration level of 10 mg/L and maintain this concentration over 12 hours. The drug has a half-life of 6 hours and renal and metabolic clearances of 5 and 6.55 L/hr, respectively (total body clearance = renal clearance + metabolic clearance). The patient's body weight is 65 kg."</i> Her answers include Cl<sub>T</sub> = 11.55 L/hr, R = 115.5 mg/hr, D<sub>L</sub> = 1000 mg, V<sub>D</sub> = 100 L, and for the renal-failure part Cl<sub>T</sub> = 8.55 L/hr, k = 0.0855 hr<sup>&minus;1</sup>, R = 85.5 mg/hr, and the loading dose unchanged at 1000 mg. The 65 kg is never used.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>One infusion, then six or seven parts chained off it, with later parts flagged <i>"at the rate you determined above"</i> or <i>"the drug in question #1"</i>, and contrasting scenarios set in capitals: <b>WITH THE LOADING DOSE</b> against <b>WITHOUT THE LOADING DOSE</b>.</li>
<li>Where the stem supplies a solution concentration, one part asks the same infusion rate again in mL/min or mL/hr, so the answer is a pump setting rather than a drug rate.</li>
<li>She computes to more precision than she reports and prints an arrow to the practical value: 14.86 mg/hr to 15 mg/hr, 454.5 mg to 455 mg.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m3-4">
<h3>Module 3, objective 4 &mdash; Calculate loading doses to be used with an intravenous infusion</h3>
<div class="gbar"><span>Objective</span><b>Calculate loading doses to be used with an intravenous infusion</b><i>3IntravenousInfusions.pdf, slides "IV Bolus Loading Dose and Continuous IV Infusion" and "Example 7"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>With a loading dose given at the same time as an infusion, the bolus contributes C = C<sub>0</sub>e<sup>&minus;kt</sup> = (D<sub>L</sub>/V<sub>D</sub>)e<sup>&minus;kt</sup>, the infusion contributes C = (R/kV<sub>D</sub>)(1 &minus; e<sup>&minus;kt</sup>), and the loading dose itself is D<sub>L</sub> = R/k &mdash; 3IntravenousInfusions.pdf, first slide "IV Bolus Loading Dose and Continuous IV Infusion".</li>
<li>Example 7, verbatim: <i>"A physician wants to administer an agent at a rate of 20 mg/hr by IV infusion. The elimination rate constant is 0.16 hr&ndash;1, and the volume of distribution (one compartment) is 10 L. What loading dose should be recommended if the doctor wants the drug level to reach 12.5 mcg/mL immediately?"</i> &mdash; 3IntravenousInfusions.pdf, slide "Example 7".</li>
<li>Example 8, verbatim: <i>"An IV bolus loading dose of 288 mg was administered simultaneously with the continuous infusion of the drug at 50mg/hr (the drug has a t&frac12; of 4 hr and a volume of distribution of 12 L)? What is the concentration of drug in the plasma at 2 hours after the start of the therapy? At 4 hours? At 6 hours?"</i> &mdash; 3IntravenousInfusions.pdf, slide "Example 8".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The second route to the loading dose, which the slide does not print: <i>"another way to think about this loading dose. Concentration of drug in the body at steady-state times the volume and distribution"</i> (09-02), restated at the review as <i>"If we know we want a certain steady-state concentration, C steady-state times our volume of distribution &hellip; Another way to calculate it is rate over K."</i> (09-09)</li>
<li>(T) The condition on the printed equation: <i>"this equation. Is one way to calculate a loading dose, and this works, but remember the one thing that we can change. We can change the rate. So this works if you have chosen a rate, an appropriate rate of an infusion &hellip; If you just pick a number out of the air, then you're probably not gonna pick the the best loading dose"</i> (09-02). Slide and speech differ here: the slide carries D<sub>L</sub> = R/k alone, and an exam written from these lectures would accept either route, because she works both.</li>
<li>(T) Her Example 7 answer and both routes: <i>"125 mg"</i>, from <i>"if you said 20 mg per hour divided by 0.16, or if you said 12.5 times 10, you should get 125 mg"</i> (09-02).</li>
<li>(T) Her Example 8 answer at two hours: <i>"I hear 24 mg per liter"</i>, built as the bolus part plus the infusion part &mdash; <i>"So 7 mg per liter for the infusion &hellip; And then for the bolus, that 288 mg &hellip; divided by that volume distribution that gives us that C0 dose of volume distribution. Times E to the minus KT. And then &hellip; 7 plus 18 gets us 25, or 7 + 17 gets us to 24."</i> At four hours: <i>"4 hours, I'm getting 12 mg per liter for the bolus"</i> and the infusion part also about 12 (09-02).</li>
<li>(T) The superposition rule that makes the two parts additive: <i>"at any point on the curve, then the concentration here plus the concentration here should equal the concentration there."</i> (09-02)</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; the deck examples and the review practice</b>
<p class="prose"><b>Slide "Example 7", 3IntravenousInfusions.pdf.</b> Quoted in full above; her answer 125 mg by both routes.</p>
<p class="prose"><b>Exam 1 review practice, RecapExam1.pdf.</b> <i>"Recommend a loading dose to achieve the desired steady-state concentration"</i>, on an agent with C<sub>ss</sub> 24 mg/L, elimination half-life 5 hours and volume of distribution about 22 L. Her answer (09-09): <i>"528 milligrams. &hellip; Remember, we want our loading dose to look like the amount of drug that should be in the body at steady state. So our 24 milligrams per liter times our 22 liter volume of distribution should come up as 528. Right? And it's a dose, so we're looking for milligrams."</i></p>
<p class="prose"><b>Daily practice, IV Infusions Practice 4.</b> <i>"Determine an IV bolus loading dose and infusion rate to achieve the desired steady-state plasma level of 10 mg/L"</i> &mdash; R = 115.5 mg/hr and D<sub>L</sub> = 1000 mg &mdash; and then the same pair again after renal clearance falls, where R drops to 85.5 mg/hr and D<sub>L</sub> stays 1000 mg.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>She asks for the loading dose and the infusion rate together, in that order or the reverse, as a single recommendation for one patient.</li>
<li>Where both routes are available she shows both and joins them with "or", so either D<sub>L</sub> = R/k or D<sub>L</sub> = C<sub>ss</sub>V<sub>D</sub> earns the answer.</li>
<li>The answer is a dose in milligrams and she rounds it to a practical number.</li>
<li>The perturbation part changes clearance and leaves V<sub>D</sub> alone, so the rate moves and the loading dose does not.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m3-5">
<h3>Module 3, objective 5 &mdash; Describe the purpose of a loading dose</h3>
<div class="gbar"><span>Objective</span><b>Describe the purpose of a loading dose</b><i>3IntravenousInfusions.pdf, second slide "IV Bolus Loading Dose and Continuous IV Infusion"</i></div>

<h4>What the slides carry</h4>
<ul>
<li>The second loading-dose slide repeats the three relations and adds a figure of the combined curve, showing what the plasma concentration does when the loading dose chosen is too high and when it is too low &mdash; 3IntravenousInfusions.pdf, second slide "IV Bolus Loading Dose and Continuous IV Infusion".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The purpose in one sentence: <i>"the loading dose helps us to reach that steady state concentration, like almost immediately. But you got to choose wisely on the loading dose"</i> (09-02).</li>
<li>(T) What a correctly chosen loading dose is: <i>"We want the loading dose to look like the amount of drug that's in the body at steady state."</i> (09-02)</li>
<li>(T) What follows if it is chosen correctly: <i>"if you choose an appropriate loading dose, you should be able to be at that concentration at any time throughout the therapy"</i> (09-09).</li>
<li>(T) The figure read out: the combined concentration is flat only when the bolus matches what the infusion will hold, and a bolus that is too large or too small produces a peak or a dip before the plateau &mdash; her version of the same point is the superposition rule, <i>"at any point on the curve, then the concentration here plus the concentration here should equal the concentration there."</i> (09-02)</li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">No poll or practice question in the collected sources asks the purpose as a separate item. It appears as the reasoning attached to the calculation questions of objective 4, and as her closing prose parts of the perturbation type.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>As a free-response prose answer rather than a number. Her perturbation parts take this form, for example <i>"If the patient suddenly develops partial renal failure, how long would it take for a new steady-state plasma level to be established?"</i>, answered in half-lives of the new half-life.</li>
<li>The reasoning she wants back is the one sentence: the loading dose puts into the body, at once, the amount that would otherwise take three to five half-lives to accumulate.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m3-6">
<h3>Module 3, objective 6 &mdash; Determine an appropriate infusion rate to achieve a desired steady-state plasma concentration</h3>
<div class="gbar"><span>Objective</span><b>Determine an appropriate infusion rate to achieve a desired steady-state plasma concentration</b><i>3IntravenousInfusions.pdf, slide "Example 2"</i></div>

<h4>What the slides carry</h4>
<ul>
<li>The steady-state relation rearranged is the whole method: C<sub>ss</sub> = R/Cl = R/kV<sub>D</sub>, so R = C<sub>ss</sub>kV<sub>D</sub> &mdash; 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State".</li>
<li>Example 2, verbatim: <i>"How would we alter the infusion rate to achieve a steady-state concentration of 20 mg/L?"</i>, carried forward from Example 1's t&frac12; = 6 hr and V<sub>D</sub> = 30 L &mdash; 3IntravenousInfusions.pdf, slide "Example 2".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) Her Example 2 working and answer: <i>"our rate. It's gonna be a 20. Milligrams per liter, which is the sea steady state that we are trying to achieve times our clearance. 30 L &hellip; So we have milligrams per hour. And then what are we increasing it to? I hear 69.3 mg per hour."</i> (09-02)</li>
<li>(T) What changing the rate does and does not do, said five times on purpose: <i>"changing the rate changes our steady state concentration"</i>, while on the two-curve slide, <i>"All we're doing is shifting that curve upward &hellip; If This is our plateau at steady state, then it occurs at the same time."</i> (09-02)</li>
<li>(T) The unit of the answer: <i>"The units of r. Are going to be a mount. Per time. So most often milligrams per hour."</i> (09-02)</li>
<li>(T) Her review working of the same shape: <i>"rate is equal to steady-state. I think I said 24 milligrams per liter. That's our desired steady-state. And our clearance is our BDK, 22 liters. 0.693. Five hours."</i> (09-09), giving 73 mg/hr.</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; the deck example and the review practice</b>
<p class="prose"><b>Slide "Example 2", 3IntravenousInfusions.pdf.</b> Alter the infusion rate to reach a steady-state concentration of 20 mg/L, with t&frac12; 6 hr and V<sub>D</sub> 30 L. Her answer: 69.3 mg/hr.</p>
<p class="prose"><b>Exam 1 review practice, RecapExam1.pdf.</b> <i>"Recommend an infusion rate to achieve a steady state concentration of 24 mg/L of an agent that has an elimination half-life of 5 hours and volume of distribution of approximately 22L."</i> Her answer (09-09): about 73 mg/hr.</p>
<p class="prose"><b>Daily practice, IV Infusions Practice 1 part e.</b> The same rate asked again in mL/min, from 500 mL infused over 24 hours: 0.35 mL/min.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>She gives a target concentration and two of the three parameters &mdash; half-life or k, and V<sub>D</sub> or clearance &mdash; and asks what rate to run. The answer is in mg/hr unless the stem has supplied a solution concentration, in which case a parallel part asks for mL/hr or mL/min.</li>
<li>The word is <i>recommend</i>, so the answer is rounded to a number a pump could take.</li>
<li>The distractor she flags is the claim that a different rate reaches steady state sooner; it does not, because the time depends only on the half-life.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m3-7">
<h3>Module 3, objective 7 &mdash; Determine the plasma concentration given pharmacokinetic parameters at any time</h3>
<div class="gbar"><span>Objective</span><b>Determine the plasma concentration given pharmacokinetic parameters at any time</b><i>3IntravenousInfusions.pdf, slides "Drug Concentration after an IV Infusion has Ended", "Example 5", "Example 6"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>During the infusion, C<sub>p</sub> = (R/Cl)(1 &minus; e<sup>&minus;kt</sup>) &mdash; 3IntravenousInfusions.pdf, first slide "Drug Concentration Prior to Reaching Steady-State".</li>
<li>After the infusion has ended, C<sub>p</sub> = C<sub>pk</sub>e<sup>&minus;kt</sup>, plotted as ln C<sub>p</sub> against time falling in a straight line from the peak, and the slide notes that the peak may or may not be C<sub>ss</sub> &mdash; 3IntravenousInfusions.pdf, slide "Drug Concentration after an IV Infusion has Ended".</li>
<li>Example 5, verbatim: <i>"What is the expected plasma concentration 12 hours following the cessation of a continuous intravenous infusion of a medicinal agent (half-life = 5 hr) that yielded a steady-state concentration of 15 mg/L?"</i> &mdash; 3IntravenousInfusions.pdf, slide "Example 5".</li>
<li>Example 6, verbatim: <i>"A patient received an intravenous infusion of 150 mg over a period of 6 hours. The drug has an elimination rate constant of 0.231 hr&ndash;1 and an apparent volume of distribution of 15 L. What is the concentration of the drug in the body 3 hours after cessation of the infusion?"</i> &mdash; 3IntravenousInfusions.pdf, slide "Example 6".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The step that comes first after an infusion stops: <i>"you have to know the concentration when you stop that infusion, cause when you stop the infusion, then it goes back to that C is equal to C0 E minus KT that we've already talked about"</i>, and <i>"Think of that C peak as your C0 as your starting point."</i> (09-02)</li>
<li>(T) What cessation means: <i>"Cessation means stopping of a continuous IV infusion"</i> (09-02); and after it, <i>"there is no more drug going in. It is just drug going out. It is just elimination now. No more in, just out."</i> (09-09)</li>
<li>(T) Her Example 5 route, which replaces the exponential with half-life counting: <i>"To make our math a little easier, let's change our 12 to 10. &hellip; Why did I change from 12 to 10? Because 10 is two half-lives. What happens in two half-lives? &hellip; 75% Of drug is eliminated, so 25% of drug remains in the body &hellip; 0.25 times what? 15."</i> (09-02). She does not state the product aloud; the slide's own figure for the answer is 3.75 mg/L, which is 0.25 of 15 mg/L at ten hours.</li>
<li>(T) Her Example 6 reasoning and answer: the rate is <i>"150 mg divided by 6 hours"</i>; the half-life is 3 hours so six hours of infusion is two half-lives and the concentration at the end is 75% of steady state; then <i>"we expect the concentration 3 hours after a cessation of the 6 hour infusion. To be 2.7 mg per liter."</i> Her cross-check: <i>"I put 0.5 times 5.41 &hellip; And I got the exactly the same thing as plugging it into the full equation. Because our half-life is 3 hours, and in one half-life, we should have 50% eliminated"</i> (09-02).</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; the deck examples and the review practice</b>
<p class="prose"><b>Slides "Example 5" and "Example 6", 3IntravenousInfusions.pdf.</b> Both quoted in full above. Example 5 decays from a stated C<sub>ss</sub>; Example 6 decays from an end-of-infusion concentration that has to be computed first, because six hours is not long enough to reach steady state.</p>
<p class="prose"><b>Exam 1 review practice, RecapExam1.pdf.</b> <i>"If the infusion were stopped 5 hours after it was started, what is the concentration of drug in the plasma 3 hours after cessation of the infusion?"</i> Her working (09-09): five hours is one half-life, so the concentration at the end of the infusion is half of the 24 mg/L steady state, namely 12 mg/L; then decaying that for three hours, <i>"I got 7.9 over here. 7.9 milligrams per liter."</i> A student first answered 18 mg/L and she corrected it to 12.</p>
<p class="prose"><b>Daily practice, IV Infusions Practice 4 part f.</b> <i>"Calculate the concentration of drug in the plasma at 1, 6 and 12 hours following the cessation of the infusion at the steady-state level of 10 mg/L"</i> &mdash; 8.91, 5 and 2.5 mg/L.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>Her signature post-infusion wording, in four interchangeable forms: <i>"plasma concentration 12 hours after the cessation of the infusion"</i>, <i>"what is the concentration of drug in the plasma 12 hours after the cessation of the 6-hour infusion (no loading dose)?"</i>, <i>"what would be the concentration of drug in the plasma 6 hours after the cessation of the infusion?"</i>, <i>"what is the expected concentration of drug 4 hours after cessation of the infusion?"</i></li>
<li>She always parenthesises whether a loading dose was given, and she always distinguishes decay from C<sub>ss</sub>, when the infusion ran to steady state, from decay from an end-of-infusion concentration, when the infusion ran for a stated shorter time. Two adjacent parts of one practice set differ only in that respect.</li>
<li>The stated duration is usually a whole number of half-lives, so the starting concentration can be got by counting rather than by exponentiating, and she shows both.</li>
</ul></div>
</section>

<h2>Module 4 &mdash; Drug elimination and clearance</h2>
<p class="prose">Five objectives, printed on 4---Clearance-and-Elimination.pdf slide 2.</p>

<section class="gobj" id="gobj-m4-1">
<h3>Module 4, objective 1 &mdash; Describe the main routes of drug elimination from the body &ndash; renal and hepatic</h3>
<div class="gbar"><span>Objective</span><b>Describe the main routes of drug elimination from the body &ndash; renal and hepatic</b><i>4---Clearance-and-Elimination.pdf slides 3, 8, 11, 24</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Drug elimination is the irreversible removal of drug from the body by all routes of elimination. Excretion is removal of intact drug. Biotransformation, or drug metabolism, is drug chemically converted in the body to a metabolite. The kidney and liver are the two major drug elimination organs in the body &mdash; 4---Clearance-and-Elimination.pdf slide 3.</li>
<li>Total body clearance is the sum of the two routes: Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub> &mdash; 4---Clearance-and-Elimination.pdf slide 8.</li>
<li>Rate and extent of metabolism can rarely be measured directly, but by taking advantage of the additivity of clearance, hepatic clearance is readily estimated as the difference between total and renal clearance: Cl<sub>H</sub> = Cl<sub>T</sub> &minus; Cl<sub>R</sub>, equivalently Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub> &mdash; 4---Clearance-and-Elimination.pdf slide 11.</li>
<li>Summary: the two major routes of elimination of drug from the body are excretion and biotransformation &mdash; 4---Clearance-and-Elimination.pdf slide 24.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) Elimination as the whole set: <i>"elimination refers to all the processes, all the irreversible processes or irreversible removal of drugs by all routes of elimination"</i> (09-14).</li>
<li>(T) Excretion, with the chemistry explicitly absent: <i>"Excretion means we're talking about removal of intact drug or metabolite. Excretion just says that we're not changing this drug at this point, we're just removing it from the body."</i> (09-14)</li>
<li>(T) Biotransformation, with its usual consequence: <i>"Biotransformation definitionally is we're chemically converting that um drug in the body to some metabolite. Most often, it's gonna result in a drug that is going to be eliminated from the body more readily."</i> (09-14)</li>
<li>(T) The two organs: <i>"our main organs of elimination. Our kidneys and the liver"</i> (09-14).</li>
<li>(T) Why the hepatic route is always got by subtraction: <i>"hepatic clearance is a different story. Because we don't have a direct way, like we can't just collect &hellip; we're not gonna sample the liver &hellip; we calculate renal because that's the, we can, pretty straightforward, right? We can calculate renal, and then we subtract renal from total to give us hepatic clearance."</i> (09-14)</li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">The attendance poll of 09-14 was definitional and on clearance; only the debrief survives in the captions, so its stem and options cannot be given. No other poll or practice question in the collected sources asks the routes as a separate item.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>The routes are asked as the vocabulary questions of Module 1 are asked: a definition as the stem and four related words as options, where the discrimination is how much of the pathway each word covers and whether the drug is chemically changed.</li>
<li>Numerically, the two routes are asked as the two terms of the additive clearance question of objective 5, where the hepatic term is whatever is left after the renal term is subtracted.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m4-2">
<h3>Module 4, objective 2 &mdash; Define glomerular filtration, tubular secretion, and tubular reabsorption</h3>
<div class="gbar"><span>Objective</span><b>Define glomerular filtration, tubular secretion, and tubular reabsorption</b><i>4---Clearance-and-Elimination.pdf slides 12, 13, 18, 19, 24</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Appearance of drug in the urine is the net result of filtration, secretion, and reabsorption. The first two processes add drug to the lumen in the proximal part of the nephron; the last involves the movement of drug from the lumen back into the bloodstream &mdash; 4---Clearance-and-Elimination.pdf slide 12.</li>
<li>The three mechanisms of renal excretion. <b>Glomerular filtration</b> &mdash; passive diffusion of drug across the glomerulus, average 120 mL/min. <b>Active tubular secretion</b> &mdash; active secretion of some drugs from the blood into the urine. <b>Tubular reabsorption</b> &mdash; reabsorption of some drugs from the urine back into the blood &mdash; 4---Clearance-and-Elimination.pdf slide 13.</li>
<li>Secretion is inferred when the rate of excretion exceeds the rate of filtration. Stated differently, secretion is apparent when renal clearance is greater than the glomerular filtration rate &mdash; 4---Clearance-and-Elimination.pdf slide 18.</li>
<li>Reabsorption occurs if the renal clearance is less than the calculated clearance by filtration &mdash; 4---Clearance-and-Elimination.pdf slide 19.</li>
<li>Summary: the processes by which a drug is excreted via the kidneys include glomerular filtration, tubular secretion, and tubular reabsorption &mdash; 4---Clearance-and-Elimination.pdf slide 24.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) Filtration as movement with no work done: <i>"glomerular filtration is just passive diffusion, right? Drug is just easing on down that concentration gradient and sliding on out of the body. Passive diffusion, no big deal. 120 mL per minute if things are working like they should"</i> (09-14).</li>
<li>(T) What "active" adds: <i>"it it means it requires energy &hellip; The drug is moving because we've got something that's pulling that drug out of the body, some transporter, some mechanism, other than just passive diffusion to get the drug out of the body."</i> (09-14)</li>
<li>(T) The inference worked in the direction she will ask it: <i>"if it's, let's say 350 mL per minute. That says that we've got the filtration, but we've also got some transporters, something else to help get this drug out of the body faster than 120 mL per minute."</i> And the other direction: <i>"If it's reabsorbed It's going back in &hellip; So, we got 120 minus this drug that's going back up. So then we would expect that our renal clearance is going to be less than 120 mL per minute."</i> (09-14)</li>
<li>(T) The tolerance around 120, which no slide states: <i>"And I'm saying 120. If it's 119, 121, OK, let's call that filtration. If it's 250, then let's assume that we've got some active secretion going on."</i> (09-14)</li>
<li>(T) She asks students to reason to the rule before showing the slide that states it: <i>"You can skip ahead if you want to, but let's think about this before we go to the next slide."</i> (09-14)</li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">No poll or written practice question in the collected sources asks this objective. Her own question on it is the one she puts to the room before slides 18 and 19: given a renal clearance number, which of the three processes is going on. The numbers she uses are 350 mL/min for secretion, a value below 120 mL/min for reabsorption, and 119 or 121 mL/min for filtration alone.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>A renal clearance is supplied and the mechanism is the answer, with 120 mL/min as the reference point on both sides.</li>
<li>She keeps the inference loose on purpose: a value within a unit or two of 120 counts as filtration, and a value like 250 or 350 counts as secretion. The item is the direction, not the arithmetic.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m4-3">
<h3>Module 4, objective 3 &mdash; Calculate creatinine clearance and discuss significance</h3>
<div class="gbar"><span>Objective</span><b>Calculate creatinine clearance and discuss significance</b><i>4---Clearance-and-Elimination.pdf slides 14&ndash;17, 25</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Glomerular filtration rate (GFR) is measured by using a drug that is eliminated primarily by filtration only, neither reabsorbed nor secreted. Creatinine and inulin are used clinically to measure GFR, even though creatinine is also secreted. Creatinine clearance is very commonly used as an estimation of GFR &mdash; 4---Clearance-and-Elimination.pdf slide 14.</li>
<li>The most common measure of renal clearance is creatinine clearance, calculated by the Cockcroft-Gault equation, with 120&ndash;130 mL/min considered normal. CrCl = (140 &minus; age)(IBW) / (72 &times; S<sub>Cr</sub>), multiplied by 0.85 if female &mdash; 4---Clearance-and-Elimination.pdf slide 15.</li>
<li>The inputs: age in years; IBW is ideal body weight in kg, with male IBW = 50 + 2.3 (inches over 5 ft) and female IBW = 45.5 + 2.3 (inches over 5 ft); S<sub>Cr</sub> is serum creatinine in mg/dL &mdash; 4---Clearance-and-Elimination.pdf slide 16.</li>
<li>The worked example, verbatim: <i>"Estimate (using the ideal body weight) the CrCl of a 45-year-old female who weighs 61 kg, S<sub>Cr</sub> =1.1 mg/dL, and is 165 cm tall."</i> &mdash; 4---Clearance-and-Elimination.pdf slide 17.</li>
<li>Summary: creatinine clearance is one of the most common methods of estimating GFR &mdash; 4---Clearance-and-Elimination.pdf slide 25.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) Both equations are outside the equation sheet: <i>"this is an equation that I want you to know, to memorize. I've given you the equation sheet, this one is not there. You need to know this one, OK."</i> and <i>"the ideal body weight, again, you need to know this one."</i> (09-14)</li>
<li>(T) What she will not ask: <i>"By simple, that means I'm not gonna ask you to think about whether we need to use the adjusted or the actual or ideal body weight, whether our patient is 4 ft 2, whether our patient is an amputee. All of our patients are going to be 5 ft tall. And all, and we're just gonna use ideal body weight."</i> (09-14)</li>
<li>(T) The required units, named as an error: <i>"I also want you to recognize that the units of creatinine clearance should be in milliliters per minute, OK. So don't give me kilograms per milligram per deciliter. Milliliters per minute."</i> (09-14), with the admission that the algebra does not produce them: <i>"if you're like me, I like for the units to cross off. The units don't cross off."</i> Slide and speech differ here: the printed formula yields kg divided by mg/dL, and an exam written from this lecture would key mL/min regardless.</li>
<li>(T) The conversion she expects: <i>"You should also know how to convert inches to centimeters and back and forth."</i> and, in the worked example, <i>"1 inch is equal to 2.54 centimeters &hellip; I am getting 64.96 inches. So, let's call that 65 inches."</i> (09-14)</li>
<li>(T) How to read a decimal height: <i>"64.5 is like 64.5 inches tall. It's not 64 and then another 5 inches or people do different things with that."</i> (09-14)</li>
<li>(T) What the number is for: <i>"this is a a a GFR estimator. So what are we estimating here? The patient's renal function"</i>, and <i>"yes, clearance is a volume per unit time, but we are specifically going to compare to 120 mL per minute to see where that individual patient is."</i> (09-14)</li>
<li>(T) The confusion she flags by name: <i>"things get a little blurry when we're talking about renal clearance, and then I'm gonna ask you to calculate creatinine clearance, and I want you to think about the, the what I'm asking you each time."</i> (09-14)</li>
<li>(T) Creatinine against inulin: <i>"creatinine comes from the breakdown of muscle"</i>; <i>"Inulin is not just hanging out in our bodies &hellip; inulin is almost completely filtered, right? So, a, a better marker than creatinine. But inulin, you have to add to somebody's body, and they sit down and they take tests, and it's a whole more complicated process."</i> (09-14)</li>
<li>(T) The 0.85 factor's assumption, and its limits: <i>"The assumption is that women are smaller than men, less muscular than men."</i> and <i>"for little old ladies and guys that lift a lot of weight, that um serum creatinine value might not truly be indicative of who and what they are"</i> (09-14).</li>
<li>(T) Serum creatinine units, asked and answered twice in the same lecture: <i>"serum creatinine is gonna be um presented as milligrams per deciliter."</i> (09-14)</li>
</ul>

<div class="gpoll"><b>Her own question &mdash; worked example slide, 4---Clearance-and-Elimination.pdf slide 17</b>
<p class="prose">Quoted in full above. Her working (09-14): 165 cm converts to 64.96 inches, called 65 inches, which is 5 inches over 5 ft; female IBW = 45.5 + 2.3 &times; 5 = 57 kg; then <i>"The patient is 45. 5 by 72. by 1.1, and don't forget to multiply this whole thing by 0.85 because she's female. OK. So I'm getting 58-ish milliliters per minute"</i>. The 61 kg actual weight is given in the stem and deliberately unused. Her interpretation: <i>"that says that she's got maybe something going on. So we, depending on her situation, she might, or and depending on the drug, it might or might not need to be adjusted to accommodate for her renal function."</i> Her correction to two wrong answers in the room: <i>"You got 104. You got 54. If you got 54, you did something wrong."</i></p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>A one-patient vignette with age, sex, height, an actual body weight and a serum creatinine. The height arrives in centimetres so the conversion is part of the question, and the actual weight is there to be left alone.</li>
<li>Every patient is 5 ft tall or taller, so the ideal body weight formula always applies without adjustment, and the sex decides both which ideal body weight constant is used and whether the 0.85 factor is applied.</li>
<li>The answer is in mL/min and is then interpreted against 120&ndash;130 mL/min, so a second part asks what the number says about the patient's renal function.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m4-4">
<h3>Module 4, objective 4 &mdash; Discuss the effect of degree of ionization on the renal excretion of drugs</h3>
<div class="gbar"><span>Objective</span><b>Discuss the effect of degree of ionization on the renal excretion of drugs</b><i>4---Clearance-and-Elimination.pdf slides 20, 25</i></div>

<div class="note"><b>The lecture did not finish this objective.</b> The 09-14 recording reaches slide 20, she poses two questions on it &mdash; <i>"what impact does pH have on filtration of drugs?"</i> and <i>"What impact does pH have on our active secretion?"</i> &mdash; and the recording ends mid-discussion at <i>"Oh, it's just passing."</i> No answer to either question is captured, and no worked example, poll or practice problem on urine pH or degree of ionization exists in any of the collected sources. What follows is what the slides carry and nothing more.</div>

<h4>What the slides carry</h4>
<ul>
<li>Reabsorption of weak acids and weak bases is influenced by the pH of the fluid in the renal tubule and the pK<sub>a</sub> of the drug &mdash; 4---Clearance-and-Elimination.pdf slide 20.</li>
<li>The slide prints two forms of the same relation, one for each drug class: for weak acids, pH = pK<sub>a</sub> + log(ionized / nonionized); for weak bases, pH = pK<sub>a</sub> + log(nonionized / ionized) &mdash; 4---Clearance-and-Elimination.pdf slide 20.</li>
<li>The pK<sub>a</sub> ranges given: weak acids, pK<sub>a</sub> values 3 to 8; weak bases, pK<sub>a</sub> values 7.5 to 10.5 &mdash; 4---Clearance-and-Elimination.pdf slide 20.</li>
<li>Summary: the extent of drug reabsorption of weak acids and weak bases is influenced by the pH of the urine and the degree of ionization of the drug &mdash; 4---Clearance-and-Elimination.pdf slide 25.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The two questions she put to the room, which are the only spoken content on this objective: <i>"what impact does pH have on filtration of drugs?"</i> and <i>"What impact does pH have on our active secretion?"</i> (09-14). Neither is answered before the recording ends.</li>
<li>(T) The surrounding fact the slide's process depends on, from the same lecture: reabsorption is <i>"going back in, right? &hellip; So then we would expect that our renal clearance is going to be less than 120 mL per minute."</i> (09-14)</li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">None exists in the collected sources, beyond the two unanswered questions quoted above.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>There is no evidence in the sources for how she sets this one. The two questions she posed are open prose questions about the effect of pH on a named renal process, which is the only form observed.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m4-5">
<h3>Module 4, objective 5 &mdash; Calculate total, renal and hepatic clearance</h3>
<div class="gbar"><span>Objective</span><b>Calculate total, renal and hepatic clearance</b><i>4---Clearance-and-Elimination.pdf slides 4&ndash;11, 21&ndash;23, 25</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Clearance is the process of drug elimination from the body or from a single organ without identifying the individual processes involved; it is the volume of fluid removed of drug from the body per unit time &mdash; 4---Clearance-and-Elimination.pdf slide 4.</li>
<li>Clearance can be defined as the proportionality factor that relates rate of drug elimination to the plasma drug concentration, and may also be described as the loss of drug across an organ of elimination: rate of elimination = Cl &times; C<sub>p</sub> &mdash; 4---Clearance-and-Elimination.pdf slide 5.</li>
<li>The worked example, verbatim: <i>"Penicillin has a Cl<sub>T</sub> of 15 mL/min. What is the elimination rate of penicillin when the plasma drug concentration is 5 mcg/mL?"</i> &mdash; 4---Clearance-and-Elimination.pdf slide 6.</li>
<li>Clearance is directly related to the dose administered and to the overall systemic exposure achieved, through the dose and the AUC, with the bioavailability factor in the numerator &mdash; 4---Clearance-and-Elimination.pdf slide 7.</li>
<li>Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub> &mdash; 4---Clearance-and-Elimination.pdf slide 8.</li>
<li>Renal clearance is the volume that is removed of drug per unit of time through the kidney, and can be determined from the fraction excreted unchanged and total clearance: Cl<sub>R</sub> = f<sub>e</sub>Cl<sub>T</sub> &mdash; 4---Clearance-and-Elimination.pdf slide 9.</li>
<li>The fraction excreted and renal clearance, written out with the cumulative urinary amount: f<sub>e</sub> from D<sub>u</sub> over the dose, k<sub>e</sub> = f<sub>e</sub>k, and renal clearance from the same fraction applied to total clearance &mdash; 4---Clearance-and-Elimination.pdf slide 10.</li>
<li>Hepatic clearance is estimated by difference: Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub> and Cl<sub>H</sub> = Cl<sub>T</sub> &minus; Cl<sub>R</sub> &mdash; 4---Clearance-and-Elimination.pdf slide 11.</li>
<li>Clearance, elimination half-life and volume of distribution combined: Cl<sub>T</sub> = kV<sub>D</sub> and t&frac12; = 0.693/k give t&frac12; = 0.693V<sub>D</sub>/Cl<sub>T</sub> &mdash; 4---Clearance-and-Elimination.pdf slide 21.</li>
<li>The worked example she moved forward in the deck, verbatim: <i>"Five hundred mg of a drug was administered by rapid IV injection. The V<sub>D</sub> is 15 L and the elimination half-life is 8 hours. Urine samples were collected for 48 hours and 300 mg of unchanged drug was recovered. What fraction of the dose is excreted unchanged in the urine? Calculate k, k<sub>e</sub>, Cl<sub>T</sub>, Cl<sub>R</sub> and Cl<sub>H</sub>."</i> &mdash; 4---Clearance-and-Elimination.pdf slide 22.</li>
<li>A second worked example, verbatim: <i>"A new antibiotic is actively secreted by the kidney; V<sub>D</sub> is 25 L in the normal adult. The clearance of this drug is 750 mL/min. What is the usual t&frac12; for this drug? What would be the new t&frac12; for this drug in an adult with partial renal failure whose clearance of the antibiotic was 150 mL/min?"</i> &mdash; 4---Clearance-and-Elimination.pdf slide 23.</li>
<li>Summary: clearance is a constant for first-order processes and is directly related to dose and overall exposure; and provided with relevant pharmacokinetic parameters, one can readily calculate total, renal and hepatic clearance &mdash; 4---Clearance-and-Elimination.pdf slides 24 and 25.</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) What an unsubscripted Cl means: <i>"if there is no subscript, you should assume that we're talking about total body clearance is the result of all the method or different clearances or the ways that the drug is leaving the body."</i> (09-14)</li>
<li>(T) The cumulative urinary amount: <i>"that DU infinity is the cumulative amount of drug that appears in the urine following dosing"</i>, and the fraction, <i>"that FE says how much drug appeared in the urine divided by the dose of drug that was administered"</i> (09-14).</li>
<li>(T) The two F's, kept apart by hand: <i>"lowercase fe is our fraction excreted, capital F is our bioavailability factor"</i>, and <i>"for our IV administered doses, that capital F is assumed to be 1"</i> (09-14).</li>
<li>(T) The units of the fraction, asked as a question: <i>"What are the units of FE? No units, right?"</i> (09-14)</li>
<li>(T) Her penicillin working: <i>"our rate of elimination. Is our clearance times the concentration of drug in the plasma &hellip; 15 mL. Per minute. Times. 5 mcg per mL &hellip; So 75 mcg per minute."</i> (09-14)</li>
<li>(T) Her slide 22 working, part by part: f<sub>e</sub> = 300 mg over the 500 mg dose; k <i>"0.0866"</i> from 0.693 divided by 8; k<sub>e</sub> <i>"we can take our FE which we said was 0.6 times R K. And I'm getting 0.052"</i>; total clearance <i>"15 L. N R K You get 1.3 L, something like that"</i>; renal clearance <i>"0.6 or FE times 1 L per hour, 1.3 L per hour. OK. So I'm getting 0.78 L per hour"</i>; hepatic clearance set up as <i>"total, which was 1.3. Minus 0.78"</i>, the difference not spoken aloud (09-14).</li>
<li>(T) The third reason she likes clearance, added to the two from Module 2: <i>"It serves as a proportionality factor between our rate of elimination &hellip; as well as this concentration of drug in the plasma."</i> (09-14)</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; three worked example slides</b>
<p class="prose"><b>Slide 6.</b> Penicillin, Cl<sub>T</sub> 15 mL/min, C<sub>p</sub> 5 mcg/mL; her answer 75 mcg/min.</p>
<p class="prose"><b>Slide 22.</b> The 500 mg IV injection with 300 mg recovered in urine over 48 hours; her answers f<sub>e</sub> = 0.6 with no units, k = 0.0866 hr<sup>&minus;1</sup>, k<sub>e</sub> = 0.052 hr<sup>&minus;1</sup>, Cl<sub>T</sub> = 1.3 L/hr, Cl<sub>R</sub> = 0.78 L/hr, Cl<sub>H</sub> = the difference, set up but not stated aloud.</p>
<p class="prose"><b>Slide 23.</b> The actively secreted antibiotic, V<sub>D</sub> 25 L, clearance 750 mL/min then 150 mL/min, asking the usual half-life and the half-life in partial renal failure. No answer to either part is recorded anywhere in the collected sources; the relation it is set on is slide 21's t&frac12; = 0.693V<sub>D</sub>/Cl<sub>T</sub>.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>One dose, one volume of distribution, one half-life and one urine collection, then a named list of every clearance term in one line: <i>"Calculate k, k<sub>e</sub>, Cl<sub>T</sub>, Cl<sub>R</sub> and Cl<sub>H</sub>"</i>. The fraction excreted unchanged is asked first, because every term after it uses it.</li>
<li>The urine collection is stated as an amount recovered over a stated number of hours, and the hours are not used &mdash; only the cumulative amount and the dose.</li>
<li>Clearances are separately supplied and summed in Module 3's practice as well: <i>"renal and metabolic clearances of 5 and 6.55 L/hr, respectively (total body clearance = renal clearance + metabolic clearance)"</i>, with the additivity spelled out in the stem.</li>
<li>The half-life form of the relation is asked as a before-and-after: a normal clearance and a reduced one, with V<sub>D</sub> held constant, so the half-life is the only thing that moves.</li>
</ul></div>
</section>

<h2>Module 5 &mdash; Pharmacokinetics of oral absorption</h2>
<p class="prose">Four objectives, printed on the "Objectives" slide of 5---Pharmacokinetics-of-Oral-Absorption.pdf. Her framing of the module: <i>"today we will move into our 1st order. So, up to this point, we have not had 1st order input, OK? It's all been either instantaneous or zero order"</i> (09-21).</p>

<section class="gobj" id="gobj-m5-1">
<h3>Module 5, objective 1 &mdash; Describe the kinetics of a drug following extravascular administration</h3>
<div class="gbar"><span>Objective</span><b>Describe the kinetics of a drug following extravascular administration</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slides "IV Bolus vs. Oral Administration" through "Example of a concentration-time profile"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>IV bolus administration and oral administration are set side by side as two curves &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "IV Bolus vs. Oral Administration".</li>
<li>Drug in the body is fed by the gastrointestinal compartment and drained by elimination: D<sub>GI</sub> absorbs into D<sub>B</sub> in V<sub>D</sub>, which eliminates to D<sub>E</sub>, so dD<sub>B</sub>/dt = dD<sub>GI</sub>/dt &minus; dD<sub>E</sub>/dt &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Drug in the Body".</li>
<li>The absorption half-life is t&frac12;<sub>a</sub> = 0.693/k<sub>a</sub> &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Kinetics of Absorption".</li>
<li>In the first-order absorption model, D<sub>GI</sub> enters D<sub>B</sub> in V<sub>D</sub> by k<sub>a</sub> and leaves by k, and dD<sub>B</sub>/dt is rate in minus rate out &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "First-Order Absorption Model".</li>
<li>An example concentration-time profile following extravascular administration is shown with an absorption phase and a post-absorption phase marked &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Example of a concentration-time profile following extravascular administration".</li>
<li>Summary: oral administration usually refers to first-order absorption and first-order elimination &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The three input types lined up: <i>"IV bolus input, which means that we put all of the drug into the body all at once. And then we talked about IV infusion, which meant that we put the drug into the body at a constant rate of input, right? So that's our zero order. And today &hellip; we will move into our 1st order."</i> (09-21)</li>
<li>(T) What "extravascular" means here: <i>"extravascular, also known as oral"</i>, against <i>"Intravascular, we've got our IV bolus, our IV infusion that's into the vascular system"</i> (09-21).</li>
<li>(T) The curve-identification rule, stated as an exam instruction: <i>"if I give you a curve on the exam and it looks like this. Right, where there is a clear peak. Right, we go up, we peak, we come back down, then you, I want you to identify that as an oral input. Right? First order in, first order out."</i> (09-21)</li>
<li>(T) What k<sub>a</sub> physically contains: <i>"the first thing is it needs to disintegrate, right? It needs to break up, needs to dissolve &hellip; but it has to have enough polarity that it can cross into membranes before it can get into the body. And then it's gonna get into the body, and then it's gonna hit the liver &hellip; So, all of those pieces give us our case of A, first order rate constant for absorption."</i> (09-21)</li>
<li>(T) The three phases of the curve. She was missing this slide and taught it from the students' copies: <i>"I feel like I'm missing a slide. Oh, I'm missing a very important slide"</i>. Her account is the only one there is: the absorption phase is where <i>"we've got more drug going in to the body than there is drug going out &hellip; absorption rate is gonna be greater than the elimination rate on the left side"</i>; the post-absorption phase is <i>"where it says that the elimination rate is greater than the absorption rate, that means that we still have some drug that's available to be absorbed there"</i>; and <i>"once all the drug has been absorbed, Then we are fully into the complete elimination phase"</i>. At the peak, <i>"Right at CMax, the rate N is going to be equal to the rate out."</i> (09-21)</li>
<li>(T) Why the summary slide says "usually": <i>"if we have a truly modified zero solid dosage form that is releasing drug at a zero order rate &hellip; what does it look like? &hellip; Looks like IV infusion, right? So, zero-order release or controlled release. And that looks like our IV infusion."</i> (09-21)</li>
<li>(T) A one-letter trigger: <i>"when you see a capital F, You should think oral."</i> (09-21)</li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">The 09-21 attendance poll repeated an earlier question and its stem is not in the captions. Her debrief: <i>"does this question look vaguely familiar? OK. All right. So, that means that we all got it right. Oh, OK. So, 36% of you guys picked first order absorption. Or first order input, sorry, I'm, I'm ahead of myself."</i> She does not state which option was correct. No written practice question in the collected sources asks this objective on its own.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>As a curve to identify: a profile with a clear peak is oral input, first order in and first order out, against the bolus profile that starts high and the infusion profile that starts at zero and plateaus.</li>
<li>As a stem condition, where a capital F in the given parameters is the signal that the route is oral and the model is the one on these slides.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m5-2">
<h3>Module 5, objective 2 &mdash; Calculate plasma drug concentration following extravascular administration of a single dose</h3>
<div class="gbar"><span>Objective</span><b>Calculate plasma drug concentration following extravascular administration of a single dose</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Concentration of Drug in Plasma Following a Single Oral Dose"</i></div>

<h4>What the slides carry</h4>
<ul>
<li>The single-oral-dose concentration equation: C<sub>p</sub> is the product of Fk<sub>a</sub>D<sub>0</sub> divided by V<sub>D</sub>(k<sub>a</sub> &minus; k), multiplied by the difference of two exponentials, e<sup>&minus;kt</sup> minus e<sup>&minus;k<sub>a</sub>t</sup> &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Concentration of Drug in Plasma Following a Single Oral Dose".</li>
<li>Summary: plasma drug concentration at any time after oral administration can be calculated provided basic pharmacokinetic parameters &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) How she reads the two exponentials: <i>"we've got, we'll break this down a little bit. All of this stuff. Times This is drug out, and then this is drug in, right? Drug in minus drug out."</i> (09-21)</li>
<li>(T) What the lumped prefactor is not, said twice: <i>"this big portion right here does not represent C0"</i> and <i>"That is not our C0. That is all of that wrapped up into that one. One concentration."</i> (09-21)</li>
<li>(T) What F is: <i>"Oral bioavailabilityability factor. So, what fraction of this oral dose do we expect to be absorbed by the body and available for the body to use, right? When we give a drug IV, then that F is assumed to be one."</i> and the reason it is below one, <i>"a portion of that dose is going to be um eliminated by the body before it even becomes available for the body to use"</i> (09-21).</li>
<li>(T) How she enters it on the calculator, narrated so students can copy the keystroke order: <i>"0.85 times 500 times 0.924 divided by 22, divided by left parentheses 0.924 minus 0.231, right left parenthesis, I'm over here now. E to the minus 0.231 times 2, closing that parenthesis minus E to the 0.924 times 2, and closing this parenthesis and closing that parenthesis."</i> (09-21)</li>
<li>(T) Which half-life is meant when no qualifier is given: <i>"If it's just T1/2, then your assumption is that I'm looking for the half-life of elimination, right?"</i> (09-21)</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; back-solving the equation</b>
<p class="prose"><b>Slide "Example 2", 5---Pharmacokinetics-of-Oral-Absorption.pdf.</b> <i>"A single oral dose of an antibiotic was given to an adult 70 kg male patient. The literature reports that this drug fits a one compartment open model with the equation below. Calculate t<sub>max</sub>, C<sub>max</sub> and t&frac12; for this drug in this patient. Assume units of mcg/mL for C<sub>p</sub> and hr for time."</i> with C<sub>p</sub> = 75e<sup>&minus;0.22t</sup> &minus; 75e<sup>&minus;2.75t</sup>. She then adds a part the slide does not print: given a 500 mg dose at 87% bioavailability, what is the volume of distribution? Her answer (09-21): <i>"I'm telling you that this 75. Equals F times dose times KA divided by volume distribution KA minus K"</i>, rearranged to give 6.3, with no unit spoken.</p>
<p class="prose"><b>In-class practice 2, 5---Pharmacokinetics-of-Oral-Absorption.pdf.</b> 750 mg orally, equation with prefactor 23.2 mg/L, F = 0.84, k<sub>a</sub> = 0.872 hr<sup>&minus;1</sup>, k = 0.182 hr<sup>&minus;1</sup>. Her answer for the volume of distribution: <i>"our Weime of distribution is going to be our F, which is 0.84 times our dose, which is 750 mg. Times RKA which is 0.872 per hour. Divided by 23.2 mg per liter &hellip; and then 0.872 minus 0.182 per hour &hellip; 34.3. Thank you. 34.3 L."</i> Elimination half-life from the same equation: <i>"0.693 over R K 0.182 per hour &hellip; 3.8 hours?"</i></p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>She hands over the full biexponential equation with the prefactor already evaluated as a single number, and then asks for a parameter buried inside that number &mdash; most often V<sub>D</sub>, given F and the dose.</li>
<li>Units are fixed in a sentence of the stem rather than on the numbers: <i>"Assume units of mcg/mL for C<sub>p</sub> and hr for time."</i></li>
<li>The two rate constants are read straight off the exponents, and she expects the larger of the two to be identified as k<sub>a</sub> without being told.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m5-3">
<h3>Module 5, objective 3 &mdash; Calculate peak plasma concentration and the time to peak following extravascular administration of a single dose</h3>
<div class="gbar"><span>Objective</span><b>Calculate peak plasma concentration and the time to peak following extravascular administration of a single dose</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Cp vs. Time for a Single Oral Dose"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>The plasma-level curve for a single oral dose is drawn with C<sub>max</sub> marked on the concentration axis and t<sub>max</sub> on the time axis, beside the full C<sub>p</sub> equation, and with t<sub>max</sub> = ln(k<sub>a</sub>/k) / (k<sub>a</sub> &minus; k) &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Cp vs. Time for a Single Oral Dose".</li>
<li>Example 1, verbatim: <i>"The following pharmacokinetic parameters were found for an investigational new drug: V<sub>D</sub> = 22 L, half-life of absorption is 45 minutes, half-life of elimination is 3 hours. The drug is 85% bioavailable and follows a one-compartment model. What is the expected maximum concentration following a single 500-mg dose and when does the maximum occur?"</i> &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Example 1".</li>
<li>Summary: for a single oral dose, the time to peak is based on the rate constants of absorption and elimination &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) The order of operations, stated three separate times: <i>"if you are asked for C-Max, and I will ask you for CMax, you must find TMax first. Find T-Max before you find CMax, OK? Even if I don't ask you to specifically find uh uh T-Max, you must find T-Max before you can find CMax"</i> (09-21).</li>
<li>(T) What t<sub>max</sub> is and what it depends on: <i>"TMAX is the time that it takes to reach the maximum plasma concentration of that drug in that patient"</i> and <i>"T-Max depends solely on the relationship between K and KA Drug going in, drug going out."</i> (09-21)</li>
<li>(T) Three errors she names in advance. Mixed time units: <i>"when you are calculating um T max, do not forget to change your times to out to the same unit, usually hours"</i>. A half-life used as a rate constant: <i>"when you change your times, recognize. That 1.5 here, that is the half-life. So you still need to divide that by 0.693"</i> &mdash; in her own arithmetic she divides 0.693 by 1.5, and the captions have the operands reversed. And a dropped volume: <i>"Do not forget the volume of distribution."</i> (09-21)</li>
<li>(T) Her Example 1 working: 45 minutes is <i>"3/4 of an hour or 0.75 hour"</i>; k<sub>a</sub> = 0.693/0.75 = 0.924 hr<sup>&minus;1</sup>; <i>"our K is 0.231"</i>; <i>"our team Max. It's gonna be equal to the natural log of KA divided by K &hellip; OK, so I'm getting 2 hours"</i>; and C<sub>max</sub> <i>"I am getting 12.17. Milligrams per liter."</i> (09-21)</li>
<li>(T) Her Example 2 working: <i>"it looks like the max is going to occur. One hour after the dose was administered"</i>, then C<sub>max</sub> <i>"75. E -0.22 times 1. E to -2.75 times 1 &hellip; 55.4. Milligrams per liter."</i> (09-21)</li>
<li>(T) Her in-class practice 1 working, with the printed volume of distribution changed live from 40 L to 20 L: k<sub>a</sub> <i>"0.693 divided by 1.5. 0.462"</i>; k <i>"0.693 divided by 5. 0.1386"</i>; t<sub>max</sub> <i>"3.7, 3.7. OK. So 3.7 hours"</i>; C<sub>max</sub> <i>"I'm getting 13-ish milligrams per liter."</i> (09-21)</li>
<li>(T) Her in-class practice 2 working: t<sub>max</sub> <i>"natural log of 0.872 divided by 0.182. Divided by the differences, 0.872 minus 0.182 &hellip; 2.27 hours"</i>; C<sub>max</sub> <i>"we're gonna take that 2.27 and plug it in up here for the T's &hellip; 12.14 mg per liter or micrograms per mL."</i> (09-21)</li>
</ul>

<div class="gpoll"><b>Her own questions &mdash; the deck examples and the in-class sheet</b>
<p class="prose"><b>Slide "Example 1".</b> Quoted in full above; her answers t<sub>max</sub> 2 hr and C<sub>max</sub> 12.17 mg/L.</p>
<p class="prose"><b>Slide "Example 2".</b> C<sub>p</sub> = 75e<sup>&minus;0.22t</sup> &minus; 75e<sup>&minus;2.75t</sup>, asking t<sub>max</sub>, C<sub>max</sub> and t&frac12;; her answers t<sub>max</sub> 1 hr, C<sub>max</sub> 55.4 mg/L, elimination half-life 0.693/0.22. Note that the two available records of C<sub>max</sub> differ: she says 55.4 aloud, and the value her own numbers produce is 55.4, so that is the reading an exam written from this lecture would key.</p>
<p class="prose"><b>In-class practice, two problems.</b> Problem 1: 500 mg oral, F = 88%, absorption half-life 90 minutes, elimination half-life 5 hours, apparent V<sub>D</sub> changed live from 40 L to 20 L; her answers k<sub>a</sub> 0.462 hr<sup>&minus;1</sup>, k 0.1386 hr<sup>&minus;1</sup>, t<sub>max</sub> 3.7 hr, C<sub>max</sub> about 13 mg/L. Problem 2: 750 mg oral, equation supplied; her answers V<sub>D</sub> 34.3 L, t&frac12; 3.8 hr, t<sub>max</sub> 2.27 hr, C<sub>max</sub> 12.14 mg/L.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>Two parameters in, two answers out, always in the same order: the time to peak first, then the peak concentration computed at that time. She asks for C<sub>max</sub> without asking for t<sub>max</sub> and still expects t<sub>max</sub> to be found.</li>
<li>Absorption half-life is given in minutes (45 min, 90 min) while elimination half-life is given in hours, so the first step is a unit conversion, and each half-life must then be turned into a rate constant before either goes into the formula.</li>
<li>The parameters arrive either as a list &mdash; V<sub>D</sub>, two half-lives, a percent bioavailability, a dose &mdash; or as a finished equation, and the same two answers are wanted either way.</li>
<li>Bioavailability is stated as a percent in the stem (85%, 88%, 87%) and used as a decimal.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m5-4">
<h3>Module 5, objective 4 &mdash; Discuss the effects of changing various parameters on the pharmacokinetics following extravascular administration</h3>
<div class="gbar"><span>Objective</span><b>Discuss the effects of changing various parameters on the pharmacokinetics following extravascular administration</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slides "Changing Dose" through "Significance of Absorption Rate Constants"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>A pair of curves shows the effect of changing the dose &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Changing Dose".</li>
<li>Two figures sit side by side. The first is the effect of a change in the absorption rate constant, k<sub>a</sub>, on the plasma drug concentration-versus-time curve, with the dose 100 mg, V<sub>D</sub> 10 L and k 0.1 hr<sup>&minus;1</sup>. The second is the effect of a change in the elimination rate constant, k, with the dose 100 mg, V<sub>D</sub> 10 L and k<sub>a</sub> 0.1 hr<sup>&minus;1</sup> &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Effect of ka and k on Cmax, tmax, and AUC".</li>
<li>Absorption kinetics terminology. <b>Disposition rate limiting</b> &mdash; absorption half-life is much shorter than elimination half-life. <b>Absorption rate limiting</b> &mdash; absorption half-life is much longer than elimination half-life &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Absorption Kinetics Terminology".</li>
<li>The significance of the absorption rate constant, t<sub>max</sub> and C<sub>max</sub>: designing multiple-dosage regimens, that is prediction of peak and trough plasma drug concentrations; bioequivalence studies, comparing rates of absorption from chemically equivalent products, comparative bioavailability and bioequivalence; determining the preferred route of drug administration and the desired dosage form for the patient; assessing the onset of action; correlating with the pharmacological effect &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Significance of Absorption Rate Constants, tmax, and Cmax".</li>
</ul>

<h4>What she said about it</h4>
<ul>
<li>(T) Increasing the dose: <i>"we increase the dose, we expect a proportional increase in concentration and AUC. We do not expect a change in TMAX, and the rates of absorption and elimination increase because we've got more drug, but there are rate constants K and KA do not change, but because the rate depends on how much is there. It would make sense that those two would increase"</i> (09-21).</li>
<li>(T) Increasing k<sub>a</sub> relative to k: <i>"if we increase KA relative to K, we're getting the drug into the body a little bit faster &hellip; we get a higher. C-Max &hellip; We also get a TMAx that occurs earlier &hellip; And then the AUC is relatively unchanged"</i>, with her reason, <i>"if we're just changing KA we're not changing the clearance at all, right? So then our AUC is unchanged here."</i> (09-21)</li>
<li>(T) Increasing k: <i>"we're getting that drug out of the body a lot faster &hellip; Notice that we're not able to build to as high &hellip; So, we're getting an earlier T-Max. Either way, cause remember, T-Max is just a relationship of K and KA &hellip; if we change the K, we are effectively changing the clearance, so we are getting this drug out of the body a whole lot faster."</i> The k values compared on that slide are 0.5, 0.3 and 0.2 per hour (09-21).</li>
<li>(T) The AUC claim is not readable off the figure and she says where it comes from: <i>"looking at the curve, you might not be able to really ascertain, but this comes from your textbook, and this is tabulated, and the AUC is relatively unchanged."</i> (09-21) Slide and speech differ here: the figure does not show it, and the spoken statement is the one to hold.</li>
<li>(T) Which rate-limiting case is normal: <i>"Most of the time we're gonna be looking at disposition rate limiting, where our KA is gonna be significantly faster or larger than our K"</i> (09-21). In the same lecture she also calls this <i>"distribution limited"</i> once, while the slide's term is disposition rate limiting; the slide's term is the one to key.</li>
<li>(T) How she reads the rate-limiting case off an equation: <i>"notice that this is E -0.18, and then this is, this is E -0.87. So, that absorption is gonna happen a lot faster than elimination &hellip; We've got &hellip; absorption is gonna happen a lot faster than elimination."</i> (09-21)</li>
<li>(T) Onset of action, from the significance slide: <i>"when does the drug reach a therapeutic concentration? That's our onset."</i> (09-21)</li>
</ul>

<div class="gpoll"><b>Her own question &mdash; posed aloud, 09-21</b>
<p class="prose">Stem, as she put it to the room: <i>"If I increase the dose. What happens to Team Max? Here's our equation. If I increase the dose, what happens to T-Max?"</i> Her answer: <i>"Nothing, right? &hellip; T-Max is independent or dependent of dose. Independent, right? So when I ask you this question. Right? We all see it."</i> She names it as a question she will set.</p>
<p class="prose">No written practice question in the collected sources asks a parameter change directly; the in-class sheet's rate-limiting identification is the nearest, where the two exponents of the supplied equation decide whether the case is disposition or absorption rate limiting.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>One parameter is changed and the three outputs are asked about in the same order: C<sub>max</sub>, t<sub>max</sub>, AUC. The answers are directions, not numbers.</li>
<li>Her closing parts of this kind in earlier modules are free-response prose &mdash; <i>"If the dose were doubled, what is the expected change in the half-life of elimination?"</i>, <i>"&hellip;in the clearance?"</i>, <i>"&hellip;in the initial plasma concentration?"</i> &mdash; and this objective is the oral version of the same shape.</li>
<li>The rate-limiting question comes as two exponents to compare rather than as two half-lives to look up.</li>
</ul></div>
</section>
`;
