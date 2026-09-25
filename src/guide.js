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
   STYLE.md or printed in a deck. Bullets under "What she said about it" are
   transcript, rendered as <q>: her words with the auto-caption fillers
   removed, or, as <q class="para">, a passage the captions garbled,
   restated in plain words. Each says which it is and on what date.
   OCR'd handwriting on the annotated decks is not used as a source.
   Where slide and transcript differ, both are stated.

   Objective counts: Module 1 five, Module 2 six (three on each of the deck's
   two objectives slides), Module 3 seven, Module 4 five, Module 5 four,
   Module 6 two of three (the third is Part 2 of the deck, not yet lectured).
   Modules 7 to 9 are not yet lectured and carry no guides. Module 6 also
   draws on Chapter 9, Multiple-Dosage Regimens, and says so where it does.
   ========================================================================== */
const GUIDE_HTML = `
<h2>Objective guides</h2>
<p class="sub">One section per objective from Dr. Mosley's own objectives slides, in her wording and her order: what the slides carry, what she added out loud, her own question on it, and the form the question takes when she sets it. Nothing here is scored. Under <i>What she said about it</i>, a solid bar carries her own words with the auto-caption fillers removed, and a dashed bar carries a passage the captions garbled, restated in plain words; the line under each quote says which it is, and the lecture date.</p>

<h2>Module 1 - Introduction &amp; Math Review</h2>
<p class="prose">Five objectives, printed on Introduction.pdf slide 2 and reprinted unchanged on RecapExam1.pdf slide 2.</p>
<ul class="saidlist">
<li class="said"><span class="lead">On what those slides are for</span><q>the first slide there after the title slide is our objectives. I put this here because this is what I want you to know for the exam.</q><span class="when">her words, caption fillers removed</span></li>
</ul>

<section class="gobj" id="gobj-m1-1">
<h3 data-nav="Module 1, objective 1 &mdash; Define pharmacokinetics and discuss some related disciplines">Module 1 - Objective 1</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">The two-word contrast that separates the two disciplines, which the slide does not put side by side</span><q class="para">Pharmacodynamics is concentration and response; pharmacokinetics is concentration and time.</q><span class="when">08-17 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">On the slide 7 table</span><q>If you see a table, no, I do not expect you to memorize the table. This is to help clarify in your brain how the pieces fit.</q> and of that table specifically, <q>this is for your information</q><span class="when">08-17 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Which of these are examinable, from the Exam 1 review</span><q class="para">There are some definitions that I expect you to know, and some related disciplines. Remember, we talked about clinical pharmacokinetics, toxicology, pharmacodynamics, pharmacology.</q><span class="when">09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her own wording of biopharmaceutics, closer to the exam's likely phrasing than the slide's</span><q class="para">Biopharmaceutics is the relation tying the physicochemical drug properties, the drug itself, the dosage form and the route of administration to the rate and extent of systemic absorption.</q><span class="when">08-17 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">ADME is lettered differently by other faculty, which is why she fixes the four letters here</span><q class="para">Dr. Smith adds a T to ADME for toxicology; Dr. Yendaalli adds an L at the beginning for liberation.</q><span class="when">08-17 &middot; restated from a garbled caption</span></li>
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
<h3 data-nav="Module 1, objective 2 &mdash; Describe the types of pharmacokinetic modeling">Module 1 - Objective 2</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">Which kind this course actually uses, and what the box means</span><q class="para">We primarily do compartmental modeling: we treat the body as a little box, put all of the drug into the box, and how the drug behaves in the body decides which model to use.</q><span class="when">09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Why the physiologic model is on the slide but not used</span><q class="para">Physiological models we do not use quite as much; those require more input than we want to do.</q><span class="when">09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The catenary model described as a chain rather than as a diagram</span><q class="para">Compartments joined together like the compartments of a train: one car, next car, next car. You do not get to the third car without going through the second car. That is our catenary system.</q><span class="when">08-19 &middot; restated from a garbled caption</span></li>
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
<h3 data-nav="Module 1, objective 3 &mdash; Define some fundamental pharmacokinetics terms">Module 1 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Define some fundamental pharmacokinetics terms</b><i>Introduction.pdf slides 5, 9, 10</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Key terms. <b>Elimination</b> &mdash; irreversible loss of drug from the body by all routes. <b>Disposition</b> &mdash; all the kinetic processes that occur to a drug subsequent to its systemic absorption, that is distribution and elimination. <b>First-pass effect</b> &mdash; rapid metabolism of an orally administered drug before reaching the general circulation. <b>Bioavailability</b> &mdash; measure of the systemic availability of a drug &mdash; Introduction.pdf slide 5.</li>
<li>The concentration-versus-time curve: concentration rises from zero to a peak and then declines &mdash; Introduction.pdf slide 9.</li>
<li>Blood components, with how each is obtained and what it contains. <b>Whole blood</b> &mdash; generally obtained by venous puncture and contains an anticoagulant such as heparin or EDTA; contains all the cellular and protein elements of blood. <b>Serum</b> &mdash; obtained from whole blood after the blood is allowed to clot and the clot is removed; does not contain the cellular elements, fibrinogen, or the other clotting factors. <b>Plasma</b> &mdash; liquid supernatant obtained after centrifugation of non-clotted whole blood that contains an anticoagulant; the noncellular liquid fraction of whole blood, containing all the proteins including albumin &mdash; Introduction.pdf slide 10.</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">Elimination as the catch-all, which the slide's one-line definition does not say</span><q class="para">Elimination refers to the irreversible loss of drugs from the body by all routes. Metabolism and excretion are both elimination terms; elimination is our catch-all.</q><span class="when">08-17 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Disposition in her own compressed form</span><q>Disposition is the processes that occur to a drug after it's absorbed, so distribution and elimination</q><span class="when">08-17 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">First-pass effect tied to the number it changes</span><q>often when we take oral medications, they hit the liver first before they get to that systemic circulation… Liver eats them up, eats up half the drug, and then you have a lower what we call a bioavailability</q><span class="when">08-17 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The subscript convention, which no slide states</span><q>if you see CP, we're looking at concentration of drug in the plasma, CS we're looking at concentration of drug in the serum, or if you just see a C, you can assume whatever.</q><span class="when">08-17 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Two lines she draws on the slide 9 curve that are not printed on it &mdash; a minimum toxic concentration above and a minimum effective concentration below</span><q class="para">Our goal is to stay in between these two lines.</q> On the upper line: <q>Remember that's the top of that curve, right there is where we start to see problems, and toxic can be different things for different drugs.</q>. Slide and speech differ here: the printed slide carries a plain curve, and an exam written from these lectures would key the spoken thresholds, because that is the only place they are defined.<span class="when">08-17 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Why serum or plasma rather than whole blood</span><q>We mostly use serum and plasma because remember we try to minimize the interactions of drug with anything else that might be in that sample</q><span class="when">08-19 &middot; her words, caption fillers removed</span></li>
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
<h3 data-nav="Module 1, objective 4 &mdash; Differentiate between orders of reaction and calculate basic parameters given a data set">Module 1 - Objective 4</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">The single affirmative statement in any lecture about a specific exam item</span><q class="para">Here is the secret. On this exam, I am going to give you a data set, and I expect you to figure out if it is zero or first. The rest of the time, if I tell you that it is an IV bolus dose, your expectation is first order. But if I give you a data set, expect that I expect you to tell me if it is zero or first.</q><span class="when">09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The first-order half-life is not supplied</span><q class="para">First-order half-life will not be on your equation sheet. This is the one that you take to your grave with you: 0.693 over k.</q> and again at the review: <q>That one is not on your equation sheet.</q><span class="when">08-19, 09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Half-life is a time, and the units are scored</span><q>I expect you to give me half-life in units of time.</q> <q>It is a time, so it is not days to the minus one. It is just days.</q><span class="when">08-19, 09-09 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Why the first-order half-life does not move</span><q class="para">0.693 over k is the one you take with you: a constant divided by a constant is a constant.</q><span class="when">08-19 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Units decide the order of a rate constant: zero order is</span><q class="para">Either concentration per unit time or amount per unit time.</q>, first order is <q>Is it time? One over time. We call that reciprocal time.</q>. And, either way, <q>our rate constant is never going to be a negative</q><span class="when">08-19 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The axis trap, flagged three separate times</span><q class="para">Notice that it does not say log.</q> <q class="para">You will see graphs like this, and this word will not be over here most of the time. You have got to pay attention to the axis.</q> <q class="para">If you look at that scale and it is not changing by a regular step but by a factor of 10, that tells you it is a logarithmic scale. Do not just look at that straight line and assume it is zero order. Look at the scale.</q><span class="when">08-19, 09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">A rounding error she says will change your answer</span><q>don't truncate that to 0.2 early on because if you put that as 0.2, your number is gonna be very different than our numbers</q>, with the instruction to <q>keep, 3 to 4 decimal places for that K</q><span class="when">08-24 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">A sign error she makes on purpose and then names: solving backwards for C<sub>0</sub></span><q>if I punch C0E or CE to the minus KT because I always throw in that minus there, what's gonna happen to my number? If it's minus KT, then that number is going to be lower than where I started</q>. On the zero-order version she catches the same thing: <q>What is wrong with the way I've set that up?… It is going to be a lower concentration, so this should be plus</q><span class="when">08-19 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The half-life counting table she builds live, which no slide carries: one half-life leaves 50% and eliminates 50%; two half-lives</span><q class="para">You said 75%, so 25% remains.</q>; three, <q class="para">Three half-lives: 12.5% remains, 87.5% gone.</q>. And <q>First order processes, it's gonna take 10 half-lives for 99.9% of the drug to be eliminated from the body.</q><span class="when">08-19, 08-24 &middot; restated from a garbled caption</span></li>
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
<h3 data-nav="Module 1, objective 5 &mdash; Determine the area under the curve for a provided data set using the trapezoidal rule">Module 1 - Objective 5</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">What AUC is for, in her words</span><q>for us, that tells us about the extent of drug that is available for the body to use</q>, repeated at the review as <q>area under the curve is a concept that tells us something about the extent of drug that's available for the body to use</q><span class="when">08-19, 09-09 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The printed formula reduced to the geometry</span><q class="para">The trapezoidal rule says we take our curve, break it up into little segments, and determine the area of each segment. It looks like a complicated calculation, but it is fifth-grade geometry: one half base times height.</q><span class="when">08-19 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The units, which she flags as unfamiliar</span><q>Micrograms per mil times hour, kind of funky units.</q><span class="when">08-19 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The other reason AUC recurs, stated in two later modules</span><q class="para">Another reason that we like clearance is that it directly relates the dose to that area under the curve.</q> (08-24, repeated 09-09)<span class="when">restated from a garbled caption</span></li>
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

<h2>Module 2 - IV Bolus Administration</h2>
<p class="prose">Six objectives, printed on the two "Lecture Objectives" slides of 2IVBolusAdministration.pdf &mdash; three for the one-compartment lecture of 24 August and three for the multicompartment lecture of 26 August. Both sets are reprinted unchanged on RecapExam1.pdf.</p>

<section class="gobj" id="gobj-m2-1">
<h3 data-nav="Module 2, objective 1 &mdash; Describe a one-compartment model, IV bolus injection">Module 2 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Describe a one-compartment model, IV bolus injection</b><i>2IVBolusAdministration.pdf, slides "One-Compartment Open Model" and "Concentration of Drug in the Plasma, Cp"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>The one-compartment open model with IV bolus administration is the simplest way to describe drug distribution and elimination; it assumes that the drug can enter and leave the body; and the body acts like a single, uniform compartment. The diagram carries an IV arrow in and a k arrow out, with C<sub>p</sub> = D<sub>B</sub>/V<sub>D</sub>, dD<sub>B</sub>/dt = &minus;kD<sub>B</sub>, and k = k<sub>m</sub> + k<sub>e</sub>. D<sub>B</sub> is drug in body at time t; V<sub>D</sub> is volume of distribution &mdash; 2IVBolusAdministration.pdf, slide "One-Compartment Open Model: IV Bolus Administration".</li>
<li>The concentration of drug in the plasma follows dC<sub>p</sub>/dt = &minus;kC<sub>p</sub>, written out as log C<sub>p</sub> = &minus;kt/2.3 + log C<sub>p</sub><sup>0</sup>, ln C<sub>p</sub> = &minus;kt + ln C<sub>p</sub><sup>0</sup>, and C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup> &mdash; 2IVBolusAdministration.pdf, slide "Concentration of Drug in the Plasma, Cp".</li>
<li>Summary: the one-compartment open model represents the simplest way of describing the process of drug distribution and elimination in the body &mdash; 2IVBolusAdministration.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">The two assumptions together, and that they are assumptions</span><q>the drug goes into the body all at once, like instantly all the drug is into the body and all the drug is instantly uniformly distributed throughout the body. Assumptions, simplifications, this does not happen.</q><span class="when">08-24 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Elimination starts at once</span><q>all the drug goes in, all the drug goes out. As soon as that drug is in the body, it starts immediately being eliminated as well.</q>. The name for the input: <q>We call that instantaneous input of drug into the body.</q><span class="when">08-24 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">What the phrase "IV bolus" is meant to trigger</span><q class="para">If I tell you that we are administering a drug via IV bolus injection, then you should think: whichever form of this equation you like.</q> &mdash; and the order that goes with it, from the review: <q class="para">If I tell you that it is an IV bolus dose that is administered, your expectation is first order.</q><span class="when">08-24, 09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">What an unsubscripted k means</span><q>KM is a rate constant for metabolism, KE is the rate constant for excretion… If you see K with no subscript, that is our overall rate constant for elimination. all the process is wrapped up into there.</q><span class="when">08-24 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Which of the three printed forms she works in, which the slide does not settle</span><q>this is my preferred equations down here with natural log, but either one gets you there.</q><span class="when">08-19 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">A drawing step she recommends before calculating</span><q>when you see the question that says IV bolus administration, your brain, even on the side of your paper, draw your little curve that starts up high, comes down low.</q><span class="when">09-02 &middot; her words, verbatim</span></li>
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
<h3 data-nav="Module 2, objective 2 &mdash; Define key pharmacokinetic parameters &ndash; clearance and volume of distribution">Module 2 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Define key pharmacokinetic parameters &ndash; clearance and volume of distribution</b><i>2IVBolusAdministration.pdf, slides "Volume of Distribution" (two) and "Clearance"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>The volume of distribution is a hypothetical volume of body fluid that would be required to dissolve the total amount of drug at the same concentration as that found in the blood. It is a proportionality constant relating the amount of drug in the body to the measured concentration in the biological fluid. V<sub>D</sub> = D<sub>B</sub>/C<sub>p</sub> &mdash; 2IVBolusAdministration.pdf, first slide "Volume of Distribution".</li>
<li>A large V<sub>D</sub> means the drug is more concentrated in extravascular tissues and less concentrated intravascularly. A drug highly bound to plasma proteins or remaining in the vascular region gives a higher C<sub>p</sub> and a smaller V<sub>D</sub>. The apparent V<sub>D</sub> can be expressed as a simple volume or as a percent of body weight, and in the percent form a 1-L volume is assumed equal to the weight of 1 kg &mdash; 2IVBolusAdministration.pdf, second slide "Volume of Distribution".</li>
<li>Clearance is a measure of drug elimination from the body without identifying the mechanism or process; it is the volume of plasma that is cleared of drug per unit time; the same quantity is called drug clearance, systemic clearance and total body clearance. The slide carries Cl = kV<sub>D</sub> and Cl<sub>T</sub> = D<sub>0</sub>/AUC<sub>0</sub> &mdash; 2IVBolusAdministration.pdf, slide "Clearance".</li>
<li>A fish tank model of clearance is presented from a 2026 American Journal of Pharmaceutical Education article &mdash; 2IVBolusAdministration.pdf, slide "Fish Tank Model of Clearance".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">The word "apparent" and why it is there</span><q class="para">This volume of distribution is hypothetical. It is not an actual volume; it depends on the drug.</q> and <q class="para">You will often see "apparent volume of distribution", to remember that it is a proportionality, not a real number.</q><span class="when">08-24 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The kilogram-to-litre convention stated as a rule</span><q>in kinetics, our body weight is always in kilograms… So, 1 L volume is equal to 1 kg of body weight</q>. Her check on the answer's unit: <q class="para">I hear 14 apples: 14 L. Not 14 kg, 14 L.</q><span class="when">08-24 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The clearance equation is not supplied</span><q>this is another one that it will not be on your equation sheet cause I want you to take this one with you to your grave along with the half-life equation. Clearance is equal to k times vd.</q><span class="when">08-24 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Why she prefers clearance to the elimination rate</span><q class="para">What we like about clearance is that, for most drugs in most situations, it is going to be a constant: a constant times a constant is a constant.</q> and <q>our volume of distribution is going to be a constant… and our rate constant K is going to be a constant.</q><span class="when">08-24 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The second reason</span><q class="para">Another reason that we like clearance is that it directly relates the dose to that area under the curve.</q><span class="when">08-24 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Three volumes she narrates against the same dose, which the slide does not print</span><q class="para">If we inject 100 mg into a volume of distribution of 1 L, we expect 100 mg per liter as our concentration. 100 mg into 10 L gives 10 mg per liter. With the largest volume of distribution, the same 100 mg into 100 L, now we are at 1 mg per liter.</q> &mdash; with the caveat <q>same amount of drugs, but here, we would be looking at different drugs</q><span class="when">08-24 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">On the fish tank slide, she limits it</span><q>This little model, I like it, but it goes into a little bit more detail than what we're gonna cover.</q> The part she does use: <q>Only the free drugs, so only the free fish. are able to be swept up into this net. The ones that are tied up with the little algae down there, they're bound, so they can't be swept up</q><span class="when">08-24 &middot; her words, caption fillers removed</span></li>
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
<h3 data-nav="Module 2, objective 3 &mdash; Calculate pharmacokinetic parameters from concentration versus time data">Module 2 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Calculate pharmacokinetic parameters from concentration versus time data</b><i>2IVBolusAdministration.pdf, slide "Practice"</i></div>

<h4>What the slides carry</h4>
<ul>
<li>The practice slide, verbatim: <i>"A new drug was administered as a single IV dose of 200 mg to an 80-kg adult male. After 6 hours, the plasma drug concentration was 15 mg/L of plasma. Assuming that the apparent V<sub>D</sub> is 10% of body weight, estimate the amount of drug in the body after 12 hours. What is the half-life of this drug in this patient?"</i> &mdash; 2IVBolusAdministration.pdf, slide "Practice".</li>
<li>The relations the calculation runs on are the ones already printed two slides earlier: C<sub>p</sub> = D<sub>B</sub>/V<sub>D</sub> and C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup>, with clearance as kV<sub>D</sub> on the slide that follows.</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">Her worked answer, step by step: V<sub>D</sub> &mdash;</span><q>did we all get a volume of distribution of 8 L?</q>; amount at 6 hr &mdash; <q>8 L times 15 mg per liter</q>, giving 120 mg; the rate constant &mdash; <q class="para">Natural log of D0 over D, divided by t, gives us the rate constant k: we have 200 over 120, and our time is 6 hours.</q>, giving 0.085; amount at 12 hr &mdash; <q class="para">D0 is 200 mg, e to the minus 0.085 times 12: I am getting 72-ish milligrams.</q>; half-life &mdash; <q>what's the Half-Life? 8.15 hours.</q><span class="when">08-24 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The trap in this specific problem</span><q class="para">You have a dose of 200 mg and you are given a concentration of 15 mg per liter. You have to be apples to apples: either amount or concentration, but you cannot mix the 200 and the 15.</q><span class="when">08-24 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">She separates the printed question from her own addition</span><q>my question on the slide, estimate the amount of drug in the body after 12 hours. the amount of drug in the body after 12 hours should be about 72 mg. Then, impromptu, I added, what's the concentration? That's not on the slide.</q> The added answer: <q>you take that 72… divided by the volume of distribution, which we said was 8 L. you should get 9 mg per liter</q><span class="when">08-24 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">A check on C<sub>0</sub> when it comes from a data set</span><q>remember, C0 should be the highest point of the sample</q><span class="when">08-24 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The conversion she hands over to save time</span><q>Milligrams per liter equals micrograms per mL. I am telling you this because I don't want you to spend 10 minutes doing the conversion and then being off by a magnitude of 10</q> (08-24, repeated 08-26 and 09-09).<span class="when">her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Answers are scored for form as well as value</span><q>There should never be a leading decimal… If you give me that as your final answer, you will lose half the points for this answer.</q> and <q class="para">If there are units, then you should give me units.</q><span class="when">08-17 &middot; restated from a garbled caption</span></li>
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
<h3 data-nav="Module 2, objective 4 &mdash; Differentiate between single and multiple-compartment pharmacokinetic models">Module 2 - Objective 4</h3>
<div class="gbar"><span>Objective</span><b>Differentiate between single and multiple-compartment pharmacokinetic models</b><i>2IVBolusAdministration.pdf, slides "Why Multicompartment Models?" through "Plasma Level&ndash;Time Curve"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>A plot of log C<sub>p</sub> against time carrying a line that is not straight, under the heading asking why multicompartment models are needed &mdash; 2IVBolusAdministration.pdf, slide "Why Multicompartment Models?".</li>
<li>Multi-compartment models describe the observation of some drugs that distribute at various rates into different tissue groups &mdash; 2IVBolusAdministration.pdf, slide "One- versus Two-Compartment Models".</li>
<li>The method of residuals, also called feathering or peeling, is a procedure for fitting a curve to the experimental data of a drug when the drug does not clearly follow a one-compartment model. The residual plasma concentration, the rapidly distributed alpha phase, is obtained by subtracting the extrapolated line from the observed data &mdash; 2IVBolusAdministration.pdf, slide "Method of Residuals".</li>
<li>The plasma level&ndash;time curve for a two-compartment model is labelled with a distribution phase &mdash; 2IVBolusAdministration.pdf, slide "Plasma Level&ndash;Time Curve for Two-Compartment Model".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">The graph-reading rule, stated as an exam instruction</span><q>if I give you a graph that looks something like this without the red and blue and just a log scale and I'm telling you that it is an IV bolus dose, and I just give you a line that looks like this one, the black line. That should say to you that this is a two compartment model. If I gave you a graph on a log scale that looks just like the blue line all by itself, that tells you it's an IV bolus dose one compartment model.</q><span class="when">08-26 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Otherwise she has to say which it is</span><q>if I tell you that we're giving an IV bolus dose, now what do I have to tell you? I have to tell you that it follows a one compartment model or a two compartment</q><span class="when">08-26 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Names for the two segments</span><q>This handle piece up top is what we would call our distribution phase</q> and <q>once the drug is distributed uniformly throughout the body… Then we call this blue phase our elimination phase</q><span class="when">08-26 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The one-compartment contrast restated at the review</span><q>that two compartment model has got that distribution step, so it doesn't uniformly distribute… all at once.</q><span class="when">09-09 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Feathering is conceptual only, and she says so plainly</span><q>we talked about feathering. the methods of residual and all that good stuff, I want you to conceptually know what that is, but I'm not gonna ask you to do that. I am pretty much gonna give you A, B, alpha, beta I want you to know what they represent and why we use them.</q><span class="when">08-26 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The log axis again, on this deck's graphs</span><q>Even though it doesn't say log, you realize that it is on a log scale</q><span class="when">08-26 &middot; her words, caption fillers removed</span></li>
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
<h3 data-nav="Module 2, objective 5 &mdash; Explain why some drugs best fit a multi-compartment model">Module 2 - Objective 5</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">The reason in one sentence</span><q>the drug is going to go preferentially to some organs before it is widely distributed uniformly throughout the body</q><span class="when">08-26 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Which of the three printed wirings the course uses</span><q>if we've got a central compartment, it's going to and from that tissue compartment, so equilibrating within whatever peripheral compartment makes up the secondary compartment, and then that the drug is being eliminated from the central compartment only.</q><span class="when">08-26 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">What k<sub>12</sub> and k<sub>21</sub> are</span><q>Remember, those are our transfer constants, so how fast is the drug going from one compartment or the central compartment to the peripheral compartment and back and forth.</q><span class="when">08-26 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">An exception to the perfusion table that is not printed on it</span><q class="para">The brain works really hard to keep things out, so even though it is a highly perfused organ, it is not usually one of those seen in that distribution phase.</q>. The slide lists brain among the highly perfused tissues; she removes it from the distribution phase out loud. An exam written from these lectures would key the slide's grouping for a tissue-perfusion question and her caveat for a question about what appears in the distribution phase.<span class="when">08-26 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">On the tissue-versus-plasma figure, a limit the slide does not state</span><q>this is a theoretical graph… because remember, we sample the plasma We don't sample tissue to see how much drug is there.</q><span class="when">08-26 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">On the perfusion table</span><q>general grouping of tissues, table, don't panic</q>, consistent with her standing rule that tables are not memorised.<span class="when">08-26 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Why the distribution phase has to be faster than elimination</span><q>If the elimination phase is significantly fast relative to the distribution phase, then you're not going to build up appreciable levels. You're not gonna reach the concentration that you need for the drug to be effective</q><span class="when">08-26 &middot; her words, verbatim</span></li>
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
<h3 data-nav="Module 2, objective 6 &mdash; Predict drug concentration following IV bolus administration in a multi-compartment model">Module 2 - Objective 6</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">What the four parameters are</span><q>Our A and our B are our intercepts So we've done some extrapolation to get the intercepts, and then our lowercase A and B are the slopes. That tells us about the rates of both processes.</q><span class="when">09-09 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Which of alpha and beta is larger, and why</span><q>Alpha bigger because the distribution phase is gonna happen a lot faster than an elimination phase</q>. Her check on the theophylline equation: <q>your 5.8 is significantly bigger than your 0.16</q><span class="when">08-26 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Which half-life is wanted, and what it is called on the paper</span><q>we don't really care about the half-life of the distribution phase. We care about the half-life of the elimination phase… 0.693 over B or beta</q> and <q class="para">It will be written as beta half-life, because I am going to ask you for either the beta half-life or the elimination half-life, so that there is no confusion.</q><span class="when">08-26 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">How not to do it</span><q class="para">Do not get all complicated. Do not solve for k and then 0.693 over k; you have done too much work.</q>; at the review, <q>You take your 0.693 and you divide by lowercase b.</q><span class="when">08-26, 09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her worked theophylline answers: concentration at time zero</span><q>30, and since I didn't give you units, my bad</q>; at three hours <q>I'm hearing eleven-ish milligrams per liter</q>; beta half-life <q class="para">0.693 over 0.16: 4.33 hours.</q><span class="when">08-26 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her in-class sheet answers, read aloud</span><q>Did you get the half-life, beta Half-Life, six-ish hours?… initial concentration, 13.8 mg per liter?… Concentration, 4 hours after administration of the dose, 3.4 mg per liter.… Volume distribution, central compartment, 18-ish liters.… I got for the overall rate constant K 0.272 per hour.… then transfer from 1 to 2, 1.1 per hour.… then from 2 to 1, 0.9 per hour.</q><span class="when">08-26 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">How much of this she will set</span><q>We don't do a lot of this kind of manipulation, but we'll do a little practice today just so that you can get a feel for what it looks like and what the numbers look like</q><span class="when">08-26 &middot; her words, verbatim</span></li>
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

<h2>Module 3 - Intravenous Infusions</h2>
<p class="prose">Seven objectives, printed on the "Objectives" slide of 3IntravenousInfusions.pdf and reprinted unchanged on RecapExam1.pdf.</p>

<section class="gobj" id="gobj-m3-1">
<h3 data-nav="Module 3, objective 1 &mdash; Discuss and describe the pharmacokinetics of a medicinal agent following administration by IV infusion">Module 3 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Discuss and describe the pharmacokinetics of a medicinal agent following administration by IV infusion</b><i>3IntravenousInfusions.pdf, slide "Intravenous Infusion"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Intravenous infusion allows for precise control of plasma drug concentration, and the drug is administered at a constant rate of input. The plotted C<sub>p</sub> against time starts at zero and rises to a plateau &mdash; 3IntravenousInfusions.pdf, slide "Intravenous Infusion".</li>
<li>Summary: IV infusion, the administration of drug into the body at a constant rate, is useful to achieve precise control of plasma concentration; and given basic pharmacokinetic parameters, the plasma concentration can readily be predicted at any time during or after an intravenous infusion &mdash; 3IntravenousInfusions.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">What "constant rate" is meant to trigger, which the slide leaves unsaid</span><q class="para">Constant rate in pharmacokinetics: what does that say to us? We have talked about two types of processes. When we see constant rate, we are talking about zero order.</q><span class="when">09-02 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The two orders in one sentence</span><q>Our input is zero order, constant in, first order out. When we stop the in, then it's just out.</q><span class="when">09-02 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">What has and has not changed from the previous module</span><q>the only thing we've changed here, we haven't changed the drug, we've changed the manner that we put the drug in the body.</q><span class="when">09-02 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Why infuse at all</span><q>we do the infusion because it allows us to control, to really control the plasma concentration of drug</q><span class="when">09-02 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The shape to draw before calculating</span><q>IV infusion, we're starting low and we're building.</q><span class="when">09-02 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Units of the infusion rate, flagged as a thing to know</span><q class="para">What I want you to know about this one: the units of R are going to be amount per time, most often milligrams per hour.</q><span class="when">09-02 &middot; restated from a garbled caption</span></li>
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
<h3 data-nav="Module 3, objective 2 &mdash; Describe the concept of steady state and how it relates to continuous dosing">Module 3 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Describe the concept of steady state and how it relates to continuous dosing</b><i>3IntravenousInfusions.pdf, slides "Drug Concentration at Steady-State" and "Drug Concentration Prior to Reaching Steady-State"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Steady state is achieved when rate in equals rate out, and the steady-state concentration is C<sub>ss</sub> = R/Cl = R/kV<sub>D</sub> &mdash; 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State".</li>
<li>Before steady state, C<sub>p</sub> = (R/Cl)(1 &minus; e<sup>&minus;kt</sup>), and the term (1 &minus; e<sup>&minus;kt</sup>) gives the fraction of steady-state concentration achieved after infusing the drug for an amount of time t &mdash; 3IntravenousInfusions.pdf, first slide "Drug Concentration Prior to Reaching Steady-State".</li>
<li>At very early times after the infusion is started, (1 &minus; e<sup>&minus;kt</sup>) is a small fraction; at times approaching five half-lives after the infusion is started, it begins to approach 1 &mdash; 3IntravenousInfusions.pdf, second slide "Drug Concentration Prior to Reaching Steady-State".</li>
<li>A third slide of the same title plots the rising curve with C<sub>ss</sub> and the fraction of C<sub>ss</sub> achieved marked against it &mdash; 3IntravenousInfusions.pdf, third slide "Drug Concentration Prior to Reaching Steady-State".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">The answer she wants memorised word for word</span><q class="para">I want you to hear my voice in your head: if I ask you how long it takes to get to steady state following IV infusion, the simplest answer is 3 to 5 half-lives.</q> &mdash; with the boundary on when that answer is not enough: <q>3 to 5 half-lives is a short answer. If I ask you more specific, if I ask you how long does it take to get to 95% steady state, then that's a different calculation.</q><span class="when">09-02 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Steady state defined</span><q>steady state we say is achieved when the rate of drug in the body is equal to the rate of drug out of the body</q> and <q>the rate out will continue to increase until we reach this steady-state concentration or steady state kind of plateau</q><span class="when">09-02 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The plateau is never actually reached</span><q>remember, this is an asymptotic curve, so we're never actually going to reach steady state, we're gonna get close. So, 10 gets us 99.9, 11 gets us 99.99</q><span class="when">09-02 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The fraction table she builds live, which no slide carries: one half-life</span><q>I'm getting 0.5</q>; two, <q>we should be at 75%</q>; three, <q>87.5</q>; four, 93.25 (at the review she gives 93 for the same step); ten, <q>99.9% of the steady-state concentration</q>. Her link back to the previous module: <q class="para">Does this look familiar? We are seeing the same thing; this time we are going this way.</q>, restated at the review as <q>One half-life is the time for 50% of whatever you've got to be eliminated. If we're now going this way, then one half-life is 50, the time it'll take to get to 50% of our steady state concentration.</q><span class="when">09-02 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The point she repeats on purpose</span><q>changing the rate changes our steady state concentration with me. I feel like I've said it 5 times, and I've said it 5 times because this is one of those things that I want you to take with you. so I've said it 5 times. I'm gonna ask it of you 10 times.</q><span class="when">09-02 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The matching exam item shape</span><q>if you get a question that says, 'Increasing the rate of infusion will decrease or double or do whatever funkiness to the time that it takes to get to steady state,' we are clear that it has no impact Because it is three to five half-lives. Depends on the half-life, that rate constant K.</q><span class="when">09-09 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">A rule of thumb she gives and then withdraws</span><q>3.32. Times the half-life, 3.32 half-lives gets us at 90%. You don't have to remember that, it's in my head</q><span class="when">09-02 &middot; her words, verbatim</span></li>
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
<h3 data-nav="Module 3, objective 3 &mdash; Determine optimum dosing for an infused drug by calculating pharmacokinetic parameters">Module 3 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Determine optimum dosing for an infused drug by calculating pharmacokinetic parameters</b><i>3IntravenousInfusions.pdf, slides "Example 1" through "Example 4"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Example 1, verbatim: <i>"What is the expected steady-state concentration of theophylline in a patient?"</i> with t&frac12; = 6 hr, V<sub>D</sub> = 30 L, continuous IV infusion rate 50 mg/hr &mdash; 3IntravenousInfusions.pdf, slide "Example 1".</li>
<li>Example 3, verbatim: <i>"Calculate the C<sub>p</sub> 8 hrs after an infusion of 50 mg/hr has been started"</i>, with Cl<sub>T</sub> = 4.5 L/hr and k = 0.15 hr<sup>&minus;1</sup> &mdash; 3IntravenousInfusions.pdf, slide "Example 3".</li>
<li>Example 4, verbatim: <i>"What will the C<sub>ss</sub> be if the infusion is continued indefinitely?"</i> and <i>"How long will the infusion have to be continued to achieve 90% steady-state?"</i>, on the same parameters as Example 3 &mdash; 3IntravenousInfusions.pdf, slide "Example 4".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">Her Example 1 working</span><q>our seasteady state. Rate over clearance. 50 mg per hour. Our clearance is 30 L</q>, with the half-life converted to k, giving <q>I'm hearing 14.… it's still a concentration, so milligrams per liter</q>. She later draws the same curve as <q>our curve for 14.4</q>, so the value she works with is 14.4 mg/L.<span class="when">09-02 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Her Example 4 steady-state answer</span><q>if we continued infusing indefinitely. What's the steady-state concentration? 11.11… then our units, it's a concentration, milligrams per liter.</q>. The eight-hour concentration of Example 3 is never stated aloud.<span class="when">09-02 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Reading before calculating</span><q class="para">Step back and look at this question and think about it before you plug it into your calculator. Look at the question and understand what is being asked.</q> and <q>yes, I want you to be able to punch the numbers, but I want you to think through. What's going on Because they're gonna get bigger and uglier looking.</q><span class="when">09-02 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">On exam time for these</span><q>I heard somebody say you're gonna run out of time on the exam. No, you won't.</q> and <q class="para">This will not be one question on the exam. This is going to be broken up into little pieces, so do not panic.</q><span class="when">09-02 &middot; restated from a garbled caption</span></li>
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
<h3 data-nav="Module 3, objective 4 &mdash; Calculate loading doses to be used with an intravenous infusion">Module 3 - Objective 4</h3>
<div class="gbar"><span>Objective</span><b>Calculate loading doses to be used with an intravenous infusion</b><i>3IntravenousInfusions.pdf, slides "IV Bolus Loading Dose and Continuous IV Infusion" and "Example 7"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>With a loading dose given at the same time as an infusion, the bolus contributes C = C<sub>0</sub>e<sup>&minus;kt</sup> = (D<sub>L</sub>/V<sub>D</sub>)e<sup>&minus;kt</sup>, the infusion contributes C = (R/kV<sub>D</sub>)(1 &minus; e<sup>&minus;kt</sup>), and the loading dose itself is D<sub>L</sub> = R/k &mdash; 3IntravenousInfusions.pdf, first slide "IV Bolus Loading Dose and Continuous IV Infusion".</li>
<li>Example 7, verbatim: <i>"A physician wants to administer an agent at a rate of 20 mg/hr by IV infusion. The elimination rate constant is 0.16 hr&ndash;1, and the volume of distribution (one compartment) is 10 L. What loading dose should be recommended if the doctor wants the drug level to reach 12.5 mcg/mL immediately?"</i> &mdash; 3IntravenousInfusions.pdf, slide "Example 7".</li>
<li>Example 8, verbatim: <i>"An IV bolus loading dose of 288 mg was administered simultaneously with the continuous infusion of the drug at 50mg/hr (the drug has a t&frac12; of 4 hr and a volume of distribution of 12 L)? What is the concentration of drug in the plasma at 2 hours after the start of the therapy? At 4 hours? At 6 hours?"</i> &mdash; 3IntravenousInfusions.pdf, slide "Example 8".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">The second route to the loading dose, which the slide does not print</span><q class="para">Another way to think about this loading dose: concentration of drug in the body at steady state times the volume of distribution.</q>, restated at the review as <q>If we know we want a certain steady-state concentration, C steady-state times our volume of distribution… Another way to calculate it is rate over K.</q><span class="when">09-02, 09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The condition on the printed equation</span><q>this equation. Is one way to calculate a loading dose, and this works, but remember the one thing that we can change. We can change the rate. this works if you have chosen a rate, an appropriate rate of an infusion… If you just pick a number out of the air, then you're probably not gonna pick the best loading dose</q>. Slide and speech differ here: the slide carries D<sub>L</sub> = R/k alone, and an exam written from these lectures would accept either route, because she works both.<span class="when">09-02 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Her Example 7 answer and both routes</span><q>125 mg</q>, from <q>if you said 20 mg per hour divided by 0.16, or if you said 12.5 times 10, you should get 125 mg</q><span class="when">09-02 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Her Example 8 answer at two hours</span><q>I hear 24 mg per liter</q>, built as the bolus part plus the infusion part &mdash; <q>So 7 mg per liter for the infusion… then for the bolus, that 288 mg… divided by that volume distribution that gives us that C0 dose of volume distribution. Times E to the minus KT. then… 7 plus 18 gets us 25, or 7 + 17 gets us to 24.</q> At four hours: <q>4 hours, I'm getting 12 mg per liter for the bolus</q> and the infusion part also about 12.<span class="when">09-02 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The superposition rule that makes the two parts additive</span><q>at any point on the curve, then the concentration here plus the concentration here should equal the concentration there.</q><span class="when">09-02 &middot; her words, verbatim</span></li>
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
<h3 data-nav="Module 3, objective 5 &mdash; Describe the purpose of a loading dose">Module 3 - Objective 5</h3>
<div class="gbar"><span>Objective</span><b>Describe the purpose of a loading dose</b><i>3IntravenousInfusions.pdf, second slide "IV Bolus Loading Dose and Continuous IV Infusion"</i></div>

<h4>What the slides carry</h4>
<ul>
<li>The second loading-dose slide repeats the three relations and adds a figure of the combined curve, showing what the plasma concentration does when the loading dose chosen is too high and when it is too low &mdash; 3IntravenousInfusions.pdf, second slide "IV Bolus Loading Dose and Continuous IV Infusion".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">The purpose in one sentence</span><q>the loading dose helps us to reach that steady state concentration, like almost immediately. you got to choose wisely on the loading dose</q><span class="when">09-02 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">What a correctly chosen loading dose is</span><q>We want the loading dose to look like the amount of drug that's in the body at steady state.</q><span class="when">09-02 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">What follows if it is chosen correctly</span><q>if you choose an appropriate loading dose, you should be able to be at that concentration at any time throughout the therapy</q><span class="when">09-09 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The figure read out: the combined concentration is flat only when the bolus matches what the infusion will hold, and a bolus that is too large or too small produces a peak or a dip before the plateau &mdash; her version of the same point is the superposition rule</span><q>at any point on the curve, then the concentration here plus the concentration here should equal the concentration there.</q><span class="when">09-02 &middot; her words, verbatim</span></li>
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
<h3 data-nav="Module 3, objective 6 &mdash; Determine an appropriate infusion rate to achieve a desired steady-state plasma concentration">Module 3 - Objective 6</h3>
<div class="gbar"><span>Objective</span><b>Determine an appropriate infusion rate to achieve a desired steady-state plasma concentration</b><i>3IntravenousInfusions.pdf, slide "Example 2"</i></div>

<h4>What the slides carry</h4>
<ul>
<li>The steady-state relation rearranged is the whole method: C<sub>ss</sub> = R/Cl = R/kV<sub>D</sub>, so R = C<sub>ss</sub>kV<sub>D</sub> &mdash; 3IntravenousInfusions.pdf, slide "Drug Concentration at Steady-State".</li>
<li>Example 2, verbatim: <i>"How would we alter the infusion rate to achieve a steady-state concentration of 20 mg/L?"</i>, carried forward from Example 1's t&frac12; = 6 hr and V<sub>D</sub> = 30 L &mdash; 3IntravenousInfusions.pdf, slide "Example 2".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">Her Example 2 working and answer</span><q class="para">Our rate is going to be 20 mg per liter, the steady state we are trying to achieve, times our clearance, 30 L, which gives milligrams per hour. What are we increasing it to? I hear 69.3 mg per hour.</q><span class="when">09-02 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">What changing the rate does and does not do, said five times on purpose</span><q>changing the rate changes our steady state concentration</q>, while on the two-curve slide, <q>All we're doing is shifting that curve upward… If This is our plateau at steady state, then it occurs at the same time.</q><span class="when">09-02 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The unit of the answer</span><q class="para">The units of R are going to be amount per time, most often milligrams per hour.</q><span class="when">09-02 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her review working of the same shape</span><q class="para">Rate is equal to steady state, 24 milligrams per liter, our desired steady state, times our clearance, which is our volume of distribution times k: 22 liters, 0.693, five hours.</q>, giving 73 mg/hr.<span class="when">09-09 &middot; restated from a garbled caption</span></li>
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
<h3 data-nav="Module 3, objective 7 &mdash; Determine the plasma concentration given pharmacokinetic parameters at any time">Module 3 - Objective 7</h3>
<div class="gbar"><span>Objective</span><b>Determine the plasma concentration given pharmacokinetic parameters at any time</b><i>3IntravenousInfusions.pdf, slides "Drug Concentration after an IV Infusion has Ended", "Example 5", "Example 6"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>During the infusion, C<sub>p</sub> = (R/Cl)(1 &minus; e<sup>&minus;kt</sup>) &mdash; 3IntravenousInfusions.pdf, first slide "Drug Concentration Prior to Reaching Steady-State".</li>
<li>After the infusion has ended, C<sub>p</sub> = C<sub>pk</sub>e<sup>&minus;kt</sup>, plotted as ln C<sub>p</sub> against time falling in a straight line from the peak, and the slide notes that the peak may or may not be C<sub>ss</sub> &mdash; 3IntravenousInfusions.pdf, slide "Drug Concentration after an IV Infusion has Ended".</li>
<li>Example 5, verbatim: <i>"What is the expected plasma concentration 12 hours following the cessation of a continuous intravenous infusion of a medicinal agent (half-life = 5 hr) that yielded a steady-state concentration of 15 mg/L?"</i> &mdash; 3IntravenousInfusions.pdf, slide "Example 5".</li>
<li>Example 6, verbatim: <i>"A patient received an intravenous infusion of 150 mg over a period of 6 hours. The drug has an elimination rate constant of 0.231 hr&ndash;1 and an apparent volume of distribution of 15 L. What is the concentration of the drug in the body 3 hours after cessation of the infusion?"</i> &mdash; 3IntravenousInfusions.pdf, slide "Example 6".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">The step that comes first after an infusion stops</span><q>you have to know the concentration when you stop that infusion, cause when you stop the infusion, then it goes back to that C is equal to C0 E minus KT that we've already talked about</q> and <q>Think of that C peak as your C0 as your starting point.</q><span class="when">09-02 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">What cessation means</span><q>Cessation means stopping of a continuous IV infusion</q>; and after it, <q class="para">There is no more drug going in. It is just drug going out; it is just elimination now. No more in, just out.</q><span class="when">09-02, 09-09 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her Example 5 route, which replaces the exponential with half-life counting</span><q>To make our math a little easier, let's change our 12 to 10.… Why did I change from 12 to 10? Because 10 is two half-lives. What happens in two half-lives?… 75% Of drug is eliminated, so 25% of drug remains in the body… 0.25 times what? 15.</q>. She does not state the product aloud; the slide's own figure for the answer is 3.75 mg/L, which is 0.25 of 15 mg/L at ten hours.<span class="when">09-02 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Her Example 6 reasoning and answer: the rate is</span><q>150 mg divided by 6 hours</q>; the half-life is 3 hours so six hours of infusion is two half-lives and the concentration at the end is 75% of steady state; then <q>we expect the concentration 3 hours after a cessation of the 6 hour infusion. To be 2.7 mg per liter.</q> Her cross-check: <q>I put 0.5 times 5.41… I got the exactly the same thing as plugging it into the full equation. Because our half-life is 3 hours, and in one half-life, we should have 50% eliminated</q><span class="when">09-02 &middot; her words, caption fillers removed</span></li>
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

<h2>Module 4 - Drug Elimination and Clearance</h2>
<p class="prose">Five objectives, printed on 4---Clearance-and-Elimination.pdf slide 2.</p>

<section class="gobj" id="gobj-m4-1">
<h3 data-nav="Module 4, objective 1 &mdash; Describe the main routes of drug elimination from the body &ndash; renal and hepatic">Module 4 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Describe the main routes of drug elimination from the body &ndash; renal and hepatic</b><i>4---Clearance-and-Elimination.pdf slides 3, 8, 11, 24</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Drug elimination is the irreversible removal of drug from the body by all routes of elimination. Excretion is removal of intact drug. Biotransformation, or drug metabolism, is drug chemically converted in the body to a metabolite. The kidney and liver are the two major drug elimination organs in the body &mdash; 4---Clearance-and-Elimination.pdf slide 3.</li>
<li>Total body clearance is the sum of the two routes: Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub> &mdash; 4---Clearance-and-Elimination.pdf slide 8.</li>
<li>Rate and extent of metabolism can rarely be measured directly, but by taking advantage of the additivity of clearance, hepatic clearance is readily estimated as the difference between total and renal clearance: Cl<sub>H</sub> = Cl<sub>T</sub> &minus; Cl<sub>R</sub>, equivalently Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub> &mdash; 4---Clearance-and-Elimination.pdf slide 11.</li>
<li>Summary: the two major routes of elimination of drug from the body are excretion and biotransformation &mdash; 4---Clearance-and-Elimination.pdf slide 24.</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">Elimination as the whole set</span><q>elimination refers to all the processes, all the irreversible processes or irreversible removal of drugs by all routes of elimination</q><span class="when">09-14 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Excretion, with the chemistry explicitly absent</span><q>Excretion means we're talking about removal of intact drug or metabolite. Excretion just says that we're not changing this drug at this point, we're just removing it from the body.</q><span class="when">09-14 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Biotransformation, with its usual consequence</span><q>Biotransformation definitionally is we're chemically converting that drug in the body to some metabolite. Most often, it's gonna result in a drug that is going to be eliminated from the body more readily.</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The two organs</span><q>our main organs of elimination. Our kidneys and the liver</q><span class="when">09-14 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Why the hepatic route is always got by subtraction</span><q class="para">Hepatic clearance is a different story, because we do not have a direct way: we are not going to sample the liver. We calculate renal because that is straightforward, and then we subtract renal from total to give us hepatic clearance.</q><span class="when">09-14 &middot; restated from a garbled caption</span></li>
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
<h3 data-nav="Module 4, objective 2 &mdash; Define glomerular filtration, tubular secretion, and tubular reabsorption">Module 4 - Objective 2</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">Filtration as movement with no work done</span><q>glomerular filtration is just passive diffusion Drug is just easing on down that concentration gradient and sliding on out of the body. Passive diffusion, no big deal. 120 mL per minute if things are working like they should</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">What "active" adds</span><q>it means it requires energy… The drug is moving because we've got something that's pulling that drug out of the body, some transporter, some mechanism, other than just passive diffusion to get the drug out of the body.</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The inference worked in the direction she will ask it</span><q>if it's, let's say 350 mL per minute. That says that we've got the filtration, but we've also got some transporters, something else to help get this drug out of the body faster than 120 mL per minute.</q> And the other direction: <q class="para">If it is reabsorbed, it is going back in: 120 minus the drug that is going back up. Then we would expect our renal clearance to be less than 120 mL per minute.</q><span class="when">09-14 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The tolerance around 120, which no slide states</span><q>I'm saying 120. If it's 119, 121 let's call that filtration. If it's 250, then let's assume that we've got some active secretion going on.</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">She asks students to reason to the rule before showing the slide that states it</span><q>You can skip ahead if you want to, but let's think about this before we go to the next slide.</q><span class="when">09-14 &middot; her words, verbatim</span></li>
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
<h3 data-nav="Module 4, objective 3 &mdash; Calculate creatinine clearance and discuss significance">Module 4 - Objective 3</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">Both equations are outside the equation sheet</span><q>this is an equation that I want you to know, to memorize. I've given you the equation sheet, this one is not there. You need to know this one</q> and <q>the ideal body weight, again, you need to know this one.</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">What she will not ask</span><q>By simple, that means I'm not gonna ask you to think about whether we need to use the adjusted or the actual or ideal body weight, whether our patient is 4 ft 2, whether our patient is an amputee. All of our patients are going to be 5 ft tall. all, and we're just gonna use ideal body weight.</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The required units, named as an error</span><q>I also want you to recognize that the units of creatinine clearance should be in milliliters per minute So don't give me kilograms per milligram per deciliter. Milliliters per minute.</q>, with the admission that the algebra does not produce them: <q>if you're like me, I like for the units to cross off. The units don't cross off.</q> Slide and speech differ here: the printed formula yields kg divided by mg/dL, and an exam written from this lecture would key mL/min regardless.<span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The conversion she expects</span><q>You should also know how to convert inches to centimeters and back and forth.</q> and, in the worked example, <q>1 inch is equal to 2.54 centimeters… I am getting 64.96 inches. let's call that 65 inches.</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">How to read a decimal height</span><q class="para">64.5 is 64.5 inches tall. It is not 64 and then another 5 inches; people do different things with that.</q><span class="when">09-14 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">What the number is for</span><q>this is a GFR estimator. what are we estimating here? The patient's renal function</q> and <q>yes, clearance is a volume per unit time, but we are specifically going to compare to 120 mL per minute to see where that individual patient is.</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">The confusion she flags by name</span><q class="para">Things get a little blurry when we are talking about renal clearance and then I ask you to calculate creatinine clearance. I want you to think about what I am asking you each time.</q><span class="when">09-14 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Creatinine against inulin</span><q>creatinine comes from the breakdown of muscle</q> <q class="para">Inulin is not just hanging out in our bodies. Inulin is almost completely filtered, so it is a better marker than creatinine. But inulin you have to add to somebody&rsquo;s body, they sit down and take tests, and it is a whole more complicated process.</q><span class="when">09-14 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The 0.85 factor's assumption, and its limits</span><q>The assumption is that women are smaller than men, less muscular than men.</q> and <q>for little old ladies and guys that lift a lot of weight, that serum creatinine value might not truly be indicative of who and what they are</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Serum creatinine units, asked and answered twice in the same lecture</span><q>serum creatinine is gonna be presented as milligrams per deciliter.</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
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
<h3 data-nav="Module 4, objective 4 &mdash; Discuss the effect of degree of ionization on the renal excretion of drugs">Module 4 - Objective 4</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">The two questions she put to the room, which are the only spoken content on this objective</span><q>what impact does pH have on filtration of drugs?</q> and <q>What impact does pH have on our active secretion?</q>. Neither is answered before the recording ends.<span class="when">09-14 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The surrounding fact the slide's process depends on, from the same lecture: reabsorption is</span><q class="para">Going back in: then we would expect our renal clearance to be less than 120 mL per minute.</q><span class="when">09-14 &middot; restated from a garbled caption</span></li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">None exists in the collected sources, beyond the two unanswered questions quoted above.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>There is no evidence in the sources for how she sets this one. The two questions she posed are open prose questions about the effect of pH on a named renal process, which is the only form observed.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m4-5">
<h3 data-nav="Module 4, objective 5 &mdash; Calculate total, renal and hepatic clearance">Module 4 - Objective 5</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">What an unsubscripted Cl means</span><q class="para">If there is no subscript, you should assume we are talking about total body clearance: the result of all the different clearances, the ways that the drug is leaving the body.</q><span class="when">09-14 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The cumulative urinary amount</span><q>that DU infinity is the cumulative amount of drug that appears in the urine following dosing</q> and the fraction, <q>that FE says how much drug appeared in the urine divided by the dose of drug that was administered</q><span class="when">09-14 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The two F's, kept apart by hand</span><q>lowercase fe is our fraction excreted, capital F is our bioavailability factor</q> and <q>for our IV administered doses, that capital F is assumed to be 1</q><span class="when">09-14 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The units of the fraction, asked as a question</span><q>What are the units of FE? No units</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">Her penicillin working</span><q class="para">Our rate of elimination is our clearance times the concentration of drug in the plasma: 15 mL per minute times 5 mcg per mL, so 75 mcg per minute.</q><span class="when">09-14 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her slide 22 working, part by part: f<sub>e</sub> = 300 mg over the 500 mg dose; k</span><q>0.0866</q> from 0.693 divided by 8; k<sub>e</sub> <q class="para">We can take our fe, which we said was 0.6, times k: I am getting 0.052.</q>; total clearance <q class="para">15 L times k: you get 1.3 L per hour, something like that.</q>; renal clearance <q class="para">0.6, or fe, times 1.3 L per hour: I am getting 0.78 L per hour.</q>; hepatic clearance set up as <q class="para">Total, which was 1.3, minus 0.78.</q>, the difference not spoken aloud.<span class="when">09-14 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The third reason she likes clearance, added to the two from Module 2</span><q>It serves as a proportionality factor between our rate of elimination… as well as this concentration of drug in the plasma.</q><span class="when">09-14 &middot; her words, caption fillers removed</span></li>
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

<h2>Module 5 - Single Oral Administration</h2>
<p class="prose">Four objectives, printed on the "Objectives" slide of 5---Pharmacokinetics-of-Oral-Absorption.pdf. Her framing of the module: <i>"today we will move into our 1st order. So, up to this point, we have not had 1st order input, OK? It's all been either instantaneous or zero order"</i> (09-21).</p>

<section class="gobj" id="gobj-m5-1">
<h3 data-nav="Module 5, objective 1 &mdash; Describe the kinetics of a drug following extravascular administration">Module 5 - Objective 1</h3>
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
<ul class="saidlist">
<li class="said"><span class="lead">The three input types lined up</span><q class="para">IV bolus input means we put all of the drug into the body all at once. Then we talked about IV infusion, which meant we put the drug into the body at a constant rate of input, so that is our zero order. Today we move into our first order.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">What "extravascular" means here</span><q>extravascular, also known as oral</q>, against <q>Intravascular, we've got our IV bolus, our IV infusion that's into the vascular system</q><span class="when">09-21 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The curve-identification rule, stated as an exam instruction</span><q class="para">If I give you a curve on the exam and it looks like this, where there is a clear peak (we go up, we peak, we come back down), I want you to identify that as an oral input. First order in, first order out.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">What k<sub>a</sub> physically contains</span><q class="para">First it needs to disintegrate, it needs to dissolve, and it has to have enough polarity to cross membranes before it can get into the body. Then it gets into the body and hits the liver. All of those pieces give us ka, the first-order rate constant for absorption.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The three phases of the curve. She was missing this slide and taught it from the students' copies</span><q>I feel like I'm missing a slide. Oh, I'm missing a very important slide</q>. Her account is the only one there is: the absorption phase is where <q>we've got more drug going in to the body than there is drug going out… absorption rate is gonna be greater than the elimination rate on the left side</q>; the post-absorption phase is <q>where it says that the elimination rate is greater than the absorption rate, that means that we still have some drug that's available to be absorbed there</q>; and <q>once all the drug has been absorbed, Then we are fully into the complete elimination phase</q>. At the peak, <q class="para">Right at Cmax, the rate in is going to be equal to the rate out.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Why the summary slide says "usually"</span><q class="para">If we have a modified-release solid dosage form releasing drug at a zero-order rate, what does it look like? It looks like IV infusion. Zero-order release, or controlled release, looks like our IV infusion.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">A one-letter trigger</span><q>when you see a capital F, You should think oral.</q><span class="when">09-21 &middot; her words, verbatim</span></li>
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
<h3 data-nav="Module 5, objective 2 &mdash; Calculate plasma drug concentration following extravascular administration of a single dose">Module 5 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Calculate plasma drug concentration following extravascular administration of a single dose</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Concentration of Drug in Plasma Following a Single Oral Dose"</i></div>

<h4>What the slides carry</h4>
<ul>
<li>The single-oral-dose concentration equation: C<sub>p</sub> is the product of Fk<sub>a</sub>D<sub>0</sub> divided by V<sub>D</sub>(k<sub>a</sub> &minus; k), multiplied by the difference of two exponentials, e<sup>&minus;kt</sup> minus e<sup>&minus;k<sub>a</sub>t</sup> &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Concentration of Drug in Plasma Following a Single Oral Dose".</li>
<li>Summary: plasma drug concentration at any time after oral administration can be calculated provided basic pharmacokinetic parameters &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">How she reads the two exponentials</span><q class="para">We will break this down: this piece is drug out, and this piece is drug in minus drug out.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">What the lumped prefactor is not, said twice</span><q>this big portion right here does not represent C0</q> and <q>That is not our C0. That is all of that wrapped up into that one concentration.</q><span class="when">09-21 &middot; her words, caption fillers removed</span></li>
<li class="said"><span class="lead">What F is</span><q class="para">Oral bioavailability factor: what fraction of this oral dose do we expect to be absorbed by the body and available for the body to use? When we give a drug IV, that F is assumed to be one.</q> and the reason it is below one, <q>a portion of that dose is going to be eliminated by the body before it even becomes available for the body to use</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">How she enters it on the calculator, narrated so students can copy the keystroke order</span><q>0.85 times 500 times 0.924 divided by 22, divided by left parentheses 0.924 minus 0.231, right left parenthesis, I'm over here now. E to the minus 0.231 times 2, closing that parenthesis minus E to the 0.924 times 2, and closing this parenthesis and closing that parenthesis.</q><span class="when">09-21 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Which half-life is meant when no qualifier is given</span><q>If it's just T1/2, then your assumption is that I'm looking for the half-life of elimination</q><span class="when">09-21 &middot; her words, caption fillers removed</span></li>
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
<h3 data-nav="Module 5, objective 3 &mdash; Calculate peak plasma concentration and the time to peak following extravascular administration of a single dose">Module 5 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Calculate peak plasma concentration and the time to peak following extravascular administration of a single dose</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Cp vs. Time for a Single Oral Dose"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>The plasma-level curve for a single oral dose is drawn with C<sub>max</sub> marked on the concentration axis and t<sub>max</sub> on the time axis, beside the full C<sub>p</sub> equation, and with t<sub>max</sub> = ln(k<sub>a</sub>/k) / (k<sub>a</sub> &minus; k) &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Cp vs. Time for a Single Oral Dose".</li>
<li>Example 1, verbatim: <i>"The following pharmacokinetic parameters were found for an investigational new drug: V<sub>D</sub> = 22 L, half-life of absorption is 45 minutes, half-life of elimination is 3 hours. The drug is 85% bioavailable and follows a one-compartment model. What is the expected maximum concentration following a single 500-mg dose and when does the maximum occur?"</i> &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Example 1".</li>
<li>Summary: for a single oral dose, the time to peak is based on the rate constants of absorption and elimination &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Summary".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">The order of operations, stated three separate times</span><q class="para">If you are asked for Cmax, and I will ask you for Cmax, you must find tmax first. Even if I do not specifically ask you to find tmax, you must find tmax before you can find Cmax.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">What t<sub>max</sub> is and what it depends on</span><q>TMAX is the time that it takes to reach the maximum plasma concentration of that drug in that patient</q> and <q class="para">tmax depends solely on the relationship between k and ka: drug going in, drug going out.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Three errors she names in advance. Mixed time units</span><q class="para">When you are calculating tmax, do not forget to change your times to the same unit, usually hours.</q>. A half-life used as a rate constant: <q class="para">When you change your times, recognize that the 1.5 here is the half-life: you still need 0.693 divided by that.</q> &mdash; in her own arithmetic she divides 0.693 by 1.5, and the captions have the operands reversed. And a dropped volume: <q>Do not forget the volume of distribution.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her Example 1 working: 45 minutes is</span><q>3/4 of an hour or 0.75 hour</q>; k<sub>a</sub> = 0.693/0.75 = 0.924 hr<sup>&minus;1</sup>; <q>our K is 0.231</q> <q class="para">Our tmax is going to be equal to the natural log of ka divided by k, so I am getting 2 hours.</q>; and C<sub>max</sub> <q class="para">I am getting 12.17 milligrams per liter.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her Example 2 working</span><q class="para">It looks like the max is going to occur one hour after the dose was administered.</q>, then C<sub>max</sub> <q class="para">75 e to the minus 0.22 times 1, e to the minus 2.75 times 1: 55.4 milligrams per liter.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her in-class practice 1 working, with the printed volume of distribution changed live from 40 L to 20 L: k<sub>a</sub></span><q>0.693 divided by 1.5. 0.462</q>; k <q>0.693 divided by 5. 0.1386</q>; t<sub>max</sub> <q class="para">3.7 hours.</q>; C<sub>max</sub> <q>I'm getting 13-ish milligrams per liter.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Her in-class practice 2 working: t<sub>max</sub></span><q class="para">Natural log of 0.872 divided by 0.182, divided by the difference, 0.872 minus 0.182: 2.27 hours.</q>; C<sub>max</sub> <q class="para">We take that 2.27 and plug it in for the t values: 12.14 mg per liter, or micrograms per mL.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
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
<h3 data-nav="Module 5, objective 4 &mdash; Discuss the effects of changing various parameters on the pharmacokinetics following extravascular administration">Module 5 - Objective 4</h3>
<div class="gbar"><span>Objective</span><b>Discuss the effects of changing various parameters on the pharmacokinetics following extravascular administration</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slides "Changing Dose" through "Significance of Absorption Rate Constants"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>A pair of curves shows the effect of changing the dose &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Changing Dose".</li>
<li>Two figures sit side by side. The first is the effect of a change in the absorption rate constant, k<sub>a</sub>, on the plasma drug concentration-versus-time curve, with the dose 100 mg, V<sub>D</sub> 10 L and k 0.1 hr<sup>&minus;1</sup>. The second is the effect of a change in the elimination rate constant, k, with the dose 100 mg, V<sub>D</sub> 10 L and k<sub>a</sub> 0.1 hr<sup>&minus;1</sup> &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Effect of ka and k on Cmax, tmax, and AUC".</li>
<li>Absorption kinetics terminology. <b>Disposition rate limiting</b> &mdash; absorption half-life is much shorter than elimination half-life. <b>Absorption rate limiting</b> &mdash; absorption half-life is much longer than elimination half-life &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Absorption Kinetics Terminology".</li>
<li>The significance of the absorption rate constant, t<sub>max</sub> and C<sub>max</sub>: designing multiple-dosage regimens, that is prediction of peak and trough plasma drug concentrations; bioequivalence studies, comparing rates of absorption from chemically equivalent products, comparative bioavailability and bioequivalence; determining the preferred route of drug administration and the desired dosage form for the patient; assessing the onset of action; correlating with the pharmacological effect &mdash; 5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Significance of Absorption Rate Constants, tmax, and Cmax".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">Increasing the dose</span><q class="para">If we increase the dose, we expect a proportional increase in concentration and AUC. We do not expect a change in tmax. The rates of absorption and elimination increase because there is more drug, but the rate constants k and ka do not change; the rate depends on how much is there.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Increasing k<sub>a</sub> relative to k</span><q class="para">If we increase ka relative to k, we get the drug into the body faster: a higher Cmax, a tmax that occurs earlier, and the AUC is relatively unchanged.</q>, with her reason, <q class="para">If we are just changing ka, we are not changing the clearance at all, so our AUC is unchanged.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Increasing k</span><q class="para">We are getting that drug out of the body a lot faster. Notice that we are not able to build to as high, and we are getting an earlier tmax either way, because tmax is just a relationship of k and ka. If we change k, we are effectively changing the clearance, so we are getting this drug out of the body a whole lot faster.</q> The k values compared on that slide are 0.5, 0.3 and 0.2 per hour.<span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The AUC claim is not readable off the figure and she says where it comes from</span><q>looking at the curve, you might not be able to really ascertain, but this comes from your textbook, and this is tabulated, and the AUC is relatively unchanged.</q> Slide and speech differ here: the figure does not show it, and the spoken statement is the one to hold.<span class="when">09-21 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Which rate-limiting case is normal</span><q class="para">Most of the time we are going to be looking at disposition rate limiting, where our ka is significantly faster, or larger, than our k.</q>. In the same lecture she also calls this <q>distribution limited</q> once, while the slide's term is disposition rate limiting; the slide's term is the one to key.<span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">How she reads the rate-limiting case off an equation</span><q class="para">Notice that this is e to the minus 0.18 and this is e to the minus 0.87: absorption is going to happen a lot faster than elimination.</q><span class="when">09-21 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">Onset of action, from the significance slide</span><q>when does the drug reach a therapeutic concentration? That's our onset.</q><span class="when">09-21 &middot; her words, verbatim</span></li>
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

<h2>Module 6 - Multiple Dosings</h2>
<p class="prose">Three objectives, printed on the "Objectives" slide of 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf. The first two were lectured on 23 September and are below. The third, predicting the concentration after multiple IV infusions, is the second part of the same deck and has not been lectured yet. Her framing: <i>"up to uh till this point, we've been talking about single dose administration. So, today, we're gonna start talking about multiple dosing. We're gonna start with giving multiple IV bolus doses"</i> (09-23).</p>

<section class="gobj" id="gobj-m6-1">
<h3 data-nav="Module 6, objective 1 &mdash; Explain the principle of superposition and its assumptions in multiple-dose regimens">Module 6 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Explain the principle of superposition and its assumptions in multiple-dose regimens</b><i>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Drug accumulation with repeated administration" and "Superposition"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>A figure of grams in the body against days under repeated doses, rising to a plateau, captioned "Drug accumulation with repeated administration". Time to plateau will be reached by 3-5 half-lives; this is independent of the dose; if drug input is stopped, most drug will be eliminated in 3-5 half-lives &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Drug accumulation with repeated administration".</li>
<li>Superposition: drug is eliminated by first-order kinetics; the pharmacokinetics of the drug after a single dose are not altered after multiple doses. The figure marks AUC from 0 to &infin; under the first dose, AUC from t<sub>1</sub> to t<sub>2</sub> over one interval &tau; at steady state, and C<sub>av</sub><sup>&infin;</sup> = [AUC]<sub>t1</sub><sup>t2</sup>/&tau; &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Superposition".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">Peaks, troughs and the plateau</span><q>So with each subsequent dose, it goes to the exactly the same max and min. Right? As you're dosing. This plateau piece. Is also known as our steady state.</q><span class="when">09-23 &middot; her words; "min" where the captions print "men"</span></li>
<li class="said"><span class="lead">Half-lives, not doses</span><q>3 to 5 half-lives, right? Hear my voice in your head, 3 to 5 half-lives.</q> and <q>not 3 to 5 doses, 3 to 5 half-lives, OK? Cause the 2nd bullet, independent of dose</q><span class="when">09-23 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Linear means first order</span><q>I'm gonna put this word in your brain right now. First order kinetics equals linear pharmacokinetics.</q><span class="when">09-23 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The second assumption</span><q>that means that the half-life and the clearance don't change after multiple doses</q><span class="when">09-23 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">What superposition lets her do</span><q class="para">We can take this first curve and place it over the curve at steady state, and the same kinetics apply: C = C0e^-kt from one point to the next on the first curve is the same C = C0e^-kt at steady state. The difference is that at the first dose there is no drug in the body, and at steady state there is drug that has accumulated.</q><span class="when">09-23 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">The infinity sign, and the average</span><q>when you see this little infinity sign, right, see infinity, that says infinity equals steady state. So the average concentration of drug in the plasma at steady state is given by AUC divided by tau.</q><span class="when">09-23 &middot; her words, verbatim</span></li>
</ul>

<div class="gpoll"><b>Her own question on it</b>
<p class="prose">The 09-23 session opened with a quiz on Modules 4 and 5, and no written poll or practice item in the collected sources asks this objective on its own. Chapter 9 names what breaks superposition: changing pathophysiology in the patient, saturation of a drug carrier system, enzyme induction and enzyme inhibition, and nonlinear pharmacokinetics in general.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>As the two assumptions, first-order elimination and pharmacokinetics unchanged by later doses, where the second is the one with half-life and clearance in it.</li>
<li>As the time to plateau, where "3 to 5 doses" and "depends on the dose" are the two answers she argues against.</li>
</ul></div>
</section>

<section class="gobj" id="gobj-m6-2">
<h3 data-nav="Module 6, objective 2 &mdash; Predict the concentration of drug in the plasma at any time following multiple IV bolus injections of drug">Module 6 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Predict the concentration of drug in the plasma at any time following multiple IV bolus injections of drug</b><i>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Amount of Drug in the Body Following Repeated IV Bolus Injections" through "Example 3"</i></div>

<h4>What the slides carry, in slide order</h4>
<ul>
<li>Drug in the body following a single rapid IV injection is eliminated according to first-order kinetics: D<sub>B</sub> = D<sub>0</sub>e<sup>&minus;k&tau;</sup>, where &tau; is equal to the dosage interval &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Amount of Drug in the Body Following Repeated IV Bolus Injections".</li>
<li>D<sub>max</sub><sup>&infin;</sup> = D<sub>0</sub>/(1 &minus; e<sup>&minus;k&tau;</sup>), D<sub>min</sub><sup>&infin;</sup> = D<sub>0</sub>e<sup>&minus;k&tau;</sup>/(1 &minus; e<sup>&minus;k&tau;</sup>), D<sub>avg</sub><sup>&infin;</sup> = FD<sub>0</sub>/k&tau;: the maximum, minimum and average amounts of drug in the body at steady state &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Amount of Drug in the Body at Steady-State Following Repeated IV Bolus Injections".</li>
<li>C<sub>max</sub><sup>&infin;</sup> = D<sub>max</sub><sup>&infin;</sup>/V<sub>D</sub> = C<sub>0</sub>/(1 &minus; e<sup>&minus;k&tau;</sup>); C<sub>min</sub><sup>&infin;</sup> = D<sub>min</sub><sup>&infin;</sup>/V<sub>D</sub> = C<sub>0</sub>e<sup>&minus;k&tau;</sup>/(1 &minus; e<sup>&minus;k&tau;</sup>); C<sub>avg</sub><sup>&infin;</sup> = D<sub>avg</sub><sup>&infin;</sup>/V<sub>D</sub> = FD<sub>0</sub>/V<sub>D</sub>k&tau; = FD<sub>0</sub>/Cl<sub>T</sub>&tau; &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections".</li>
<li>Example 1: an antibiotic with an average t&frac12; of approximately 4 hours and an apparent V<sub>D</sub> that is 25% of body weight, 10 mg/kg every 8 hours by multiple IV bolus injections to a 65-kg female; (a) the maximum, (b) the minimum and (c) the average concentration at steady state &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Example 1".</li>
<li>C<sub>p</sub> = (D<sub>0</sub>/V<sub>D</sub>)[(1 &minus; e<sup>&minus;nk&tau;</sup>)/(1 &minus; e<sup>&minus;k&tau;</sup>)]e<sup>&minus;kt</sup> &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Plasma Drug Concentration at Any Time After n Doses".</li>
<li>Example 2: the same antibiotic, the concentration 3 hours after injection of the 2nd dose &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Example 2".</li>
<li>C<sub>p</sub> = (D<sub>0</sub>/V<sub>D</sub>)[1/(1 &minus; e<sup>&minus;k&tau;</sup>)]e<sup>&minus;kt</sup> &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Plasma Drug Concentration at Steady State".</li>
<li>Example 3: the same antibiotic, the concentration 3 hours after injection of the last dose, assuming steady state was attained &mdash; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Example 3".</li>
</ul>

<h4>What she said about it</h4>
<ul class="saidlist">
<li class="said"><span class="lead">Frequency against interval</span><q>What does TID mean? 3 times a day. That is the frequency that you would give the dose, right? So, the interval would be what?</q> The room answers 8 hours, and she adds <q>as pharmacists, we think TID and BID, right?</q><span class="when">09-23 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">The factor that keeps appearing</span><q>we've got this 1/1 minus E to the -K tau, which will, you will see over and over again, because that tells us how much drug is accumulated in the body at steady state</q><span class="when">09-23 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Where the minimum is</span><q>the min occurs at the end of the dosing interval</q><span class="when">09-23 &middot; her words; "min" where the captions print "men"</span></li>
<li class="said"><span class="lead">The average is not the midpoint</span><q>I want you to realize that the average is not the max plus the min divided by 2</q>, because the decline is logarithmic and <q>it is not an, um, algebraic mean</q><span class="when">09-23 &middot; her words; "min" where the captions print "men"</span></li>
<li class="said"><span class="lead">F in the average</span><q>Bolus dosing, IV dosing, this F is equal to 1. Right? For for IV dosing. For oral, you will have given, provided, or we will calculate a bioavailability factor.</q><span class="when">09-23 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">A check on the steady-state peak</span><q>Anybody get a value greater than 40 mg per liter? OK. What'd you get? Cause if you got a value less than 40 mg per liter, you've done something wrong.</q><span class="when">09-23 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">Work from the process, not the sheet</span><q class="para">You have the equation sheet and can find the equation and punch in every variable. But if you think about what is going on from max to min, it is first-order elimination, C = C0e^-kt, and that makes it much easier; you do not spend five minutes looking for the equation.</q><span class="when">09-23 &middot; restated from a garbled caption</span></li>
<li class="said"><span class="lead">n and t</span><q>the um N is 2, right? Because that's the dose number, the second dose, and the um lowercase t at the end of it is 3, because we're looking at the concentration 3 hours out.</q><span class="when">09-23 &middot; her words, verbatim</span></li>
<li class="said"><span class="lead">After the last dose</span><q>Last dose, we're gonna start at 53.3, and then it's just C0E minus KT.</q><span class="when">09-23 &middot; her words, verbatim</span></li>
</ul>

<div class="gpoll"><b>Her own questions, posed aloud on 09-23</b>
<p class="prose">Before Example 1 she added two first-dose parts that are not on the slide: the maximum concentration of the first dose (her answer 40 mg/L, since 10 mg/kg over 0.25 L/kg cancels the kilograms) and the minimum after the first dose (10 mg/L: <i>"I'm asking you concentration and 2 half-lives"</i>). Then: <i>"Relative to the first dose, what do you expect the maximum concentration at steady state to be?"</i> Higher, because drug has accumulated. Her answers to the slide parts: 53.3, 13.3 and 28.9 mg/L; to Example 2, 29.7 mg/L. The recording ends as she asks for the concentration 4 hours after the last dose, one half-life after the 53.3 mg/L peak.</p>
<p class="prose">Multiple-IV-Bolus-Practice-1 asks the same battery on one gram every 8 hours to a 65-kg patient, keyed as t&frac12; 4 hr, first-dose C<sub>max</sub> 58.72 and C<sub>min</sub> 14.69 mg/L, C<sub>max</sub><sup>&infin;</sup> 78.31, C<sub>min</sub><sup>&infin;</sup> 19.59, C<sub>avg</sub><sup>&infin;</sup> 42.37 mg/L, D<sub>avg</sub><sup>&infin;</sup> 721.61 mg, 9.799 mg/L 12 hours after the last dose, and a renal mechanism of glomerular filtration with tubular reabsorption.</p></div>

<div class="gask"><b>How she asks it</b>
<ul>
<li>One patient vignette asked in parts, in the order first-dose peak, first-dose trough, steady-state maximum, minimum and average, then a time before steady state and a time after the last dose.</li>
<li>Dose and volume are both given per kilogram, or scaled from a per-70-kg or per-100-kg value, so the first step is putting both on the same basis.</li>
<li>The steady-state trough, and every time after the last dose, are C = C<sub>0</sub>e<sup>&minus;kt</sup> with the steady-state peak as the starting value.</li>
</ul></div>
</section>
`;
