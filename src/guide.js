/* ==========================================================================
   OBJECTIVE GUIDES
   ==========================================================================
   One section per objective printed on a deck's own objectives slide, in her
   order, grouped by module. Authored as HTML in a template literal — no
   backtick and no dollar-brace inside. Each <h3> becomes a jump-list entry.
   {{fig:key|caption}} tokens resolve against images.json; none are used here
   because no figures have been harvested.

   LAYOUT per objective (checked by guide_check.js): In plain words, Terms
   to know, Equations (each a rendered {{frac}} with its symbols and sheet
   status), Worked example, Picture it, How she tests it, and In her words
   (at most a few short quotes, kept only where her exact wording matters),
   then a source line.

   SOURCES. Every line is traceable to a printed slide in one of the
   lectured decks, to Dr. Mosley's spoken words recorded in
   TRANSCRIPT_CUES.md, to one of her own worked solutions recorded in
   STYLE.md or printed in a deck, or to a question file whose working it
   repeats. Quotes are rendered as <q>; <q class="para"> marks a passage the
   captions garbled, restated in plain words.
   Where slide and transcript differ, both are stated.

   Objective counts: Module 1 five, Module 2 six (three on each of the deck's
   two objectives slides), Module 3 seven, Module 4 five, Module 5 four,
   Module 6 three, plus two on the 6a multiple-oral deck, Module 7a
   (bioavailability and bioequivalence, lectured 30 September) four.
   Module 6 also draws on Chapter 9, Multiple-Dosage Regimens, and says so
   where it does.
   ========================================================================== */
const GUIDE_HTML = `
<h2>Objective guides</h2>
<p class="sub">One section per objective on her objectives slides, in her order, Modules 1 to 7a. Nothing here is scored.</p>
<details class="tabhelp" open><summary>What this tab is for</summary><ul>
<li><b>Learn an objective before drilling it.</b> Each section teaches one objective from nothing: <b>In plain words</b>, <b>Terms to know</b>, <b>Equations</b> with their symbols and whether each is on the exam sheet.</li>
<li><b>Worked example</b> runs one of her own problems line by line; <b>How she tests it</b> lists her question formats and the traps in them.</li>
<li><b>In her words</b> keeps a quote only where her exact wording matters.</li>
<li>The <b>Explain more</b> buttons under a quiz question jump to the matching section here; <b>Jump to a section</b> below goes straight to an objective.</li>
</ul></details>

<h2>Module 1 - Introduction &amp; Math Review</h2>
<ul class="tlist">
<li>Five objectives, listed by Dr. Mosley at the start of the Introduction deck.</li>
<li>Listed again, unchanged, in the Exam 1 recap.</li>
<li>She gives them as the things she wants you to know for the exam.</li>
</ul>

<section class="gobj" id="gobj-m1-1">
<h3 data-nav="Module 1, objective 1 &mdash; Define pharmacokinetics and discuss some related disciplines">Module 1 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Define pharmacokinetics and discuss some related disciplines</b><i>Introduction.pdf slides 3&ndash;8</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>A drug's journey has two halves. Pharmaceutics covers the dosage form up to the point where the drug is dissolved, and pharmacokinetics covers everything after that.</li>
<li>Pharmacokinetics (PK) follows the dissolved drug into the blood, out to the tissues, through metabolism and excretion, and on to its effect. In short, PK is the study of ADME: absorption, distribution, metabolism and excretion.</li>
<li>Several neighbouring disciplines borrow PK methods for a particular purpose, such as treating patients, comparing population groups or judging safety. Each has a one-line definition you are expected to know.</li>
<li>The quickest way to separate PK from pharmacodynamics (PD) is what each one relates: PK links concentration to time, and PD links concentration to response.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Pharmaceutics</dt><dd>The part of the path from the dosage form to drug in solution.</dd>
<dt>Pharmacokinetics (PK)</dt><dd>The part from drug in solution, through the systemic circulation, distribution, metabolism and excretion, to the pharmacologic effect; the study of ADME.</dd>
<dt>ADME</dt><dd>Absorption, distribution, metabolism, excretion. Other faculty add a letter (an L for liberation, or a T for toxicology); in this course it is these four.</dd>
<dt>Absorption</dt><dd>Passage of drug molecules from the administration site into the systemic circulation.</dd>
<dt>Distribution</dt><dd>Reversible transfer of a drug to and from the site of measurement.</dd>
<dt>Metabolism</dt><dd>Conversion of one chemical species to another (biotransformation).</dd>
<dt>Excretion</dt><dd>Removal of intact drug or metabolite from the body.</dd>
<dt>Biopharmaceutics</dt><dd>How the drug's physicochemical properties, the dosage form and the route of administration together affect the rate and extent of systemic absorption.</dd>
<dt>Clinical pharmacokinetics</dt><dd>Applying pharmacokinetic methods to drug therapy.</dd>
<dt>Population pharmacokinetics</dt><dd>The study of pharmacokinetic differences between population groups.</dd>
<dt>Pharmacodynamics (PD)</dt><dd>The relationship between drug concentration at the site of action and the pharmacological response.</dd>
<dt>Clinical toxicology</dt><dd>The study of adverse effects of drugs in the body.</dd>
<dt>Toxicokinetics</dt><dd>Applying pharmacokinetic principles to drug safety evaluation studies.</dd>
</dl>

<h4>How she tests it</h4>
<ul class="tlist">
<li>Single-answer multiple choice. The stem reads out a definition almost word for word, and the options are bare discipline names, so you go from definition to name.</li>
<li>Her own poll item gave the biopharmaceutics definition (physicochemical properties, dosage form and route affecting rate and extent of absorption). The options were biopharmaceutics, toxicology, pharmacodynamics and pharmacology.</li>
<li>The answer was biopharmaceutics. A few students picked pharmacodynamics, so watch for that pull: PD is about response, not absorption.</li>
<li>Distractors come from the other related disciplines, plus pharmacology, which the deck never defines.</li>
<li>At the Exam 1 review she named these definitions and the related disciplines as examinable. The biopharmaceutic considerations table (seven inputs to product design) is for understanding only; she does not expect it memorised.</li>
<li>To recognise the answer, look for the key words: absorption from dosage form and route means biopharmaceutics; response means PD; drug therapy means clinical PK; safety studies means toxicokinetics.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q class="para">Pharmacodynamics is concentration and response; pharmacokinetics is concentration and time.</q> (08-17, restated from a garbled caption)</li>
</ul>
<p class="gsrc">Sources: Introduction.pdf slides 2&ndash;8 and 15 (summary), biopharmaceutics poll slide; RecapExam1.pdf slide 2; transcripts 08-17, 08-19, 09-09.</p>
</section>

<section class="gobj" id="gobj-m1-2">
<h3 data-nav="Module 1, objective 2 &mdash; Describe the types of pharmacokinetic modeling">Module 1 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Describe the types of pharmacokinetic modeling</b><i>Introduction.pdf slides 11&ndash;15</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>A pharmacokinetic model is a simplified description of the body that lets you predict drug levels and choose a dosing regimen.</li>
<li>Models are also used to estimate accumulation, link concentration to effect or toxicity, compare formulations (bioequivalence), and explain how disease or drug interactions change PK.</li>
<li>There are two broad types. Physiologic models are built from real anatomy and blood flow; compartment models treat the body as one or more boxes the drug moves between.</li>
<li>This course uses compartment models almost entirely. The way a drug behaves in the body decides how many boxes are needed and how they are joined.</li>
<li>Physiologic models need more input data than the course uses, so they appear mainly as a wrong answer choice.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Physiologic (perfusion) model</dt><dd>A blood flow model based on known anatomic and physiologic data.</dd>
<dt>Compartment model</dt><dd>The body represented as one or more boxes (compartments), with the drug moving between them at set rate constants.</dd>
<dt>Mammillary model</dt><dd>A central compartment 1 with other compartments each joined directly to it, e.g. 2 on one side and 3 on the other. They exchange by the transfer rate constants k<sub>12</sub> and k<sub>21</sub> (compartment 1 to 2 and back) and k<sub>13</sub> and k<sub>31</sub> (1 to 3 and back).</dd>
<dt>Catenary model</dt><dd>Compartments joined in a chain, 1 to 2 to 3, so drug reaches compartment 3 only by passing through 2 (k<sub>12</sub> and k<sub>21</sub>, then k<sub>23</sub> and k<sub>32</sub>).</dd>
<dt>Rate constant between compartments (k<sub>12</sub>)</dt><dd>The rate constant for transfer from compartment 1 to compartment 2, in reciprocal time (hr<sup>&minus;1</sup>).</dd>
<dt>Bioequivalence</dt><dd>Comparison of the rate or extent of availability between two formulations of a drug.</dd>
</dl>

<h4>How she tests it</h4>
<ul class="tlist">
<li>She asks by how the compartments are joined, not by how many there are.</li>
<li>Her poll stem: which model has compartments joined to one another like the compartments of a train? Options: catenary, mammillary, physiologic. The answer is catenary.</li>
<li>Trap: mammillary, which also has three compartments. Ask yourself whether every outer box connects to the centre (mammillary) or whether they form a chain (catenary).</li>
<li>Physiologic appears only as a distractor in these wiring questions.</li>
</ul>
<p class="gsrc">Sources: Introduction.pdf slides 11&ndash;15 and the catenary poll slide; transcripts 08-19 (poll debrief), 09-09 (exam review).</p>
</section>

<section class="gobj" id="gobj-m1-3">
<h3 data-nav="Module 1, objective 3 &mdash; Define some fundamental pharmacokinetics terms">Module 1 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Define some fundamental pharmacokinetics terms</b><i>Introduction.pdf slides 5, 9, 10</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>These are the working words of the whole course. Later modules use them without redefining them, so learn the exact meaning now.</li>
<li>After a dose, the plasma concentration (C<sub>p</sub>) rises from zero to a peak and then falls. The aim of dosing is to keep it above the level that works and below the level that harms.</li>
<li>Drug levels are measured in a fluid sample. Serum or plasma is used most, because they contain fewer components for the drug to interact with than whole blood does.</li>
<li>Elimination covers both metabolism and excretion; disposition covers distribution plus elimination.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Elimination</dt><dd>Irreversible loss of drug from the body by all routes. Metabolism and excretion are both forms of elimination.</dd>
<dt>Disposition</dt><dd>Everything that happens to a drug after it is absorbed into the systemic circulation, that is, distribution and elimination.</dd>
<dt>First-pass effect</dt><dd>Rapid metabolism of an oral drug, mainly by the liver, before it reaches the general circulation. It lowers the bioavailability.</dd>
<dt>Bioavailability (F)</dt><dd>A measure of the systemic availability of a drug; F is the fraction of the dose that reaches the plasma, with no units.</dd>
<dt>Minimum effective concentration (MEC)</dt><dd>The concentration that must be met or exceeded for the desired pharmacologic response. Drawn as the lower line on the concentration-time curve.</dd>
<dt>Minimum toxic concentration (MTC)</dt><dd>The concentration above which adverse effects start; what counts as toxic differs between drugs. Drawn as the upper line.</dd>
<dt>Minimum inhibitory concentration (MIC)</dt><dd>Used for antibiotics: the lowest concentration needed to kill or inhibit the bacteria. A distractor in her MEC question.</dd>
<dt>Whole blood</dt><dd>Venous blood with an anticoagulant such as heparin or EDTA; contains all the cellular and protein elements.</dd>
<dt>Serum</dt><dd>The liquid left after blood is allowed to clot and the clot is removed; no cells, no fibrinogen, no other clotting factors.</dd>
<dt>Plasma</dt><dd>The liquid supernatant after centrifuging non-clotted, anticoagulated blood; no cells, but all the proteins including albumin.</dd>
<dt>C<sub>p</sub>, C<sub>s</sub>, C</dt><dd>Drug concentration in plasma, in serum, or unspecified (take it as whichever fluid applies), in units such as mg/L or mcg/mL.</dd>
</dl>

<h4>How she tests it</h4>
<ul class="tlist">
<li>Definition-style multiple choice where every option is a real term from the same family, so you have to know the definition; no option can be ruled out as nonsense.</li>
<li>She words the stem as the property and asks for the name, e.g. which concentration must be met or exceeded for the desired response.</li>
<li>That poll offered steady-state (the plateau concentration reached when the rate of drug going in equals the rate going out), minimum toxic, minimum effective and minimum inhibitory concentration. The answer is minimum effective (MEC).</li>
<li>Another poll asked which sample is most commonly used for drug measurement: saliva, urine, whole blood, or serum or plasma. The answer is serum or plasma; all four are possible samples.</li>
<li>For elimination versus disposition, check whether distribution is included. If it is, the term is disposition.</li>
</ul>
<p class="gsrc">Sources: Introduction.pdf slides 5, 9, 10 and the sample-fluid poll slide; transcripts 08-17 (MEC poll, MEC and MTC lines, C<sub>p</sub> convention), 08-19 (serum or plasma).</p>
</section>

<section class="gobj" id="gobj-m1-4">
<h3 data-nav="Module 1, objective 4 &mdash; Differentiate between orders of reaction and calculate basic parameters given a data set">Module 1 - Objective 4</h3>
<div class="gbar"><span>Objective</span><b>Differentiate between orders of reaction and calculate basic parameters given a data set</b><i>Introduction.pdf slides 17&ndash;21, 26</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>In a zero-order process the same amount (or concentration) of drug is lost every hour, however much is left. In a first-order process the same fraction is lost every hour, so more is lost per hour when more drug is present.</li>
<li>Every prediction later in the course depends on knowing which order applies. When a stem says IV bolus (a single dose injected into a vein all at once), assume first order; when it gives you a data table, you must decide the order yourself.</li>
<li>Half-life (t&frac12;) is the time for the amount or concentration to fall by half. For first order it is constant at any concentration; for zero order it depends on the starting concentration.</li>
<li>From a data table you are expected to find four things: the rate constant (k), the starting concentration (C<sub>0</sub>), the half-life, and the time for a stated percentage to be lost.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Zero-order rate constant (k or k<sub>0</sub>)</dt><dd>Concentration or amount lost per unit time, e.g. (mg/mL)/hr or mg/hr. Never negative.</dd>
<dt>First-order rate constant (k)</dt><dd>Fraction lost per unit time, in reciprocal time (hr<sup>&minus;1</sup>, day<sup>&minus;1</sup>). Never negative.</dd>
<dt>Initial concentration (C<sub>0</sub>)</dt><dd>The concentration at time zero, e.g. mg/L or mg/mL. Often found by working backwards from a later point.</dd>
<dt>Half-life (t&frac12;)</dt><dd>Time for the amount or concentration to fall by one half. A time (hr, days), never reciprocal time.</dd>
<dt>Semi-logarithmic (semilog) plot</dt><dd>A graph whose concentration axis rises by factors of 10 (1, 10, 100, 1000). A first-order decline is a straight line on it.</dd>
<dt>Natural log (ln) and log</dt><dd>ln is log to base e; log is base 10. The 2.3 in the log form converts between them.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">Zero order: {{frac:dC|dt}} = &minus;k &nbsp;&nbsp; and &nbsp;&nbsp; C = C<sub>0</sub> &minus; kt</div>
<ul class="tlist">
<li>{{frac:dC|dt}} the rate of change of concentration with time, the amount lost per hour; C concentration at time t (mg/mL); C<sub>0</sub> starting concentration (mg/mL); k zero-order rate constant ((mg/mL)/hr); t time (hr).</li>
<li>When to use it: the loss per unit time is constant. Concentration against time is a straight line on ordinary (linear) axes.</li>
<li>On the equation sheet: yes, page 1, written C = C<sub>0</sub> &minus; k<sub>0</sub>t.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">First order: {{frac:dC|dt}} = &minus;kC &nbsp;&nbsp; and &nbsp;&nbsp; C = C<sub>0</sub>e<sup>&minus;kt</sup></div>
<div class="geqline">ln C = ln C<sub>0</sub> &minus; kt &nbsp;&nbsp; or &nbsp;&nbsp; log C = log C<sub>0</sub> &minus; {{frac:kt|2.3}}</div>
<ul class="tlist">
<li>Same symbols, but k is in reciprocal time (hr<sup>&minus;1</sup>), so kt has no units. The rate depends on the concentration C that is present.</li>
<li>When to use it: the fraction lost per unit time is constant. A curve on linear axes, a straight line on a semilog plot.</li>
<li>On the equation sheet: yes, all three forms, once in concentration (C) and once in amount (D).</li>
</ul>
</div>
<div class="geq">
<div class="geqline">First-order k from two points: k = {{frac:ln C<sub>1</sub> &minus; ln C<sub>2</sub>|t<sub>2</sub> &minus; t<sub>1</sub>}}</div>
<div class="geqline">Zero-order k from two points: k = {{frac:C<sub>1</sub> &minus; C<sub>2</sub>|t<sub>2</sub> &minus; t<sub>1</sub>}}</div>
<ul class="tlist">
<li>C<sub>1</sub> at the earlier time t<sub>1</sub>, C<sub>2</sub> at the later time t<sub>2</sub>. Earlier minus later keeps k positive.</li>
<li>When to use it: a table or two measured points, once you have decided the order. C<sub>0</sub> cancels, so you do not need it.</li>
<li>On the equation sheet: not as separate lines; each is the sheet's C or ln C line written for two points.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Working back to time zero: first order C<sub>0</sub> = C e<sup>+kt</sup> &nbsp;&nbsp; zero order C<sub>0</sub> = C + kt</div>
<ul class="tlist">
<li>C a measured concentration at time t after the start.</li>
<li>When to use it: asked for the initial concentration. The sign is plus because C<sub>0</sub> must be larger than any later concentration.</li>
<li>On the equation sheet: not written this way; it is the sheet's line rearranged.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">First-order half-life: t<sub>&frac12;</sub> = {{frac:0.693|k}}</div>
<ul class="tlist">
<li>k first-order rate constant (hr<sup>&minus;1</sup>); the answer is a time (hr).</li>
<li>When to use it: any first-order process. Run it backwards (k = {{frac:0.693|t<sub>&frac12;</sub>}}) when a half-life is given.</li>
<li>On the equation sheet: no. She says this one must be memorised.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Zero-order half-life: t<sub>&frac12;</sub> = {{frac:C<sub>0</sub>|2k}}</div>
<ul class="tlist">
<li>C<sub>0</sub> starting concentration (mg/mL); k zero-order rate constant ((mg/mL)/hr); the answer is a time (hr).</li>
<li>When to use it: zero order only. Because C<sub>0</sub> is in it, a lower starting concentration gives a shorter half-life.</li>
<li>On the equation sheet: no; she has not said either way. It follows from C = C<sub>0</sub> &minus; kt with C set to half of C<sub>0</sub>.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Time to fall to concentration C, first order: t = {{frac:ln C<sub>0</sub> &minus; ln C|k}}</div>
<div class="geqline">For 90% decomposed (10% left): t = {{frac:ln 10|k}}</div>
<ul class="tlist">
<li>Turn "decomposed by 90%" into "10% remains" first, so C = 0.1 C<sub>0</sub>, and C<sub>0</sub> cancels.</li>
<li>When to use it: a percentage that is not a power of one half. For 50%, 75% or 87.5% lost, count half-lives instead (1, 2 or 3).</li>
<li>On the equation sheet: not as its own line; it is the sheet's ln C line rearranged for t.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Her practice set: a drug solution sampled at 2, 6, 12, 24, 36 and 48 hr gave 294.3, 208.1, 123.8, 43.8, 15.5 and 5.5 mg/L. Find k, C<sub>0</sub>, t&frac12; and the time to 90% decomposed.</p>
<ol class="gsteps">
<li>Decide the order by comparing ratios over equal time spans. From 12 to 24 hr: {{frac:123.8|43.8}} = 2.83. From 24 to 36 hr: {{frac:43.8|15.5}} = 2.83. Equal ratios, so first order.</li>
<li>Find k from the 6 hr and 24 hr points: k = {{frac:ln 208.1 &minus; ln 43.8|24 &minus; 6}} = {{frac:5.3380 &minus; 3.7796|18 hr}} = {{frac:1.5584|18 hr}} = 0.08658, so <b>k = 0.0866 hr<sup>&minus;1</sup></b>.</li>
<li>Work back to time zero from the 12 hr point: kt = 0.0866 &times; 12 = 1.0392, and C<sub>0</sub> = 123.8 &times; e<sup>1.0392</sup> = 123.8 &times; 2.827 = 349.98, so <b>C<sub>0</sub> = 350 mg/L</b>.</li>
<li>Half-life: t&frac12; = {{frac:0.693|0.0866 hr<sup>&minus;1</sup>}} = 8.002, so <b>t&frac12; = 8 hr</b>.</li>
<li>Time to 90% decomposed: 10% remains, so t = {{frac:ln 10|0.0866 hr<sup>&minus;1</sup>}} = {{frac:2.3026|0.0866}} = 26.589, so <b>t = 26.6 hr</b>.</li>
</ol>
<p class="prose">The same stem with a zero-order table: 338, 314, 278, 206, 134 and 62 mg/mL at the same six times.</p>
<ol class="gsteps">
<li>Decide the order: 338 &minus; 314 = 24 mg/mL in 4 hr and 314 &minus; 278 = 36 mg/mL in 6 hr, both 6 mg/mL per hour. Equal losses per hour, so zero order.</li>
<li>Rate constant from the 2 hr and 24 hr points: k = {{frac:338 &minus; 206|24 &minus; 2}} = {{frac:132 mg/mL|22 hr}} = 6, so <b>k = 6 (mg/mL)/hr</b>.</li>
<li>Work back to time zero: C<sub>0</sub> = 338 + 6 &times; 2 = 338 + 12, so <b>C<sub>0</sub> = 350 mg/mL</b>.</li>
<li>Half-life: t&frac12; = {{frac:350|2 &times; 6}} = {{frac:350|12}} = 29.17, so <b>t&frac12; = 29.2 hr</b>.</li>
<li>Time to 90% decomposed: 10% of 350 is 35 mg/mL, and t = {{frac:350 &minus; 35|6}} = {{frac:315|6}}, so <b>t = 52.5 hr</b>.</li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>Guaranteed on Exam 1: a data table with the order withheld. You decide zero or first, then answer k, C<sub>0</sub>, t&frac12; and time to 90% decomposed, in that order.</li>
<li>How to decide: equal differences per hour mean zero order; equal ratios over equal time spans mean first order. On a graph, a straight line on linear axes is zero order, and on a semilog axis it is first order.</li>
<li>The axis trap: the concentration axis often is not labelled "log". If its marks go 1, 10, 100, 1000, it is a log scale, and a straight line there means first order.</li>
<li>A paired stem gives one starting concentration and one later value (e.g. 300 mg/mL, then 80 mg/mL after 30 days) and asks for the half-life assuming first order, then assuming zero order. The stated temperature is never used.</li>
<li>Where the percentage lost is a power of one half, she expects half-life counting: 1 half-life leaves 50%, 2 leave 25%, 3 leave 12.5%. About 10 half-lives remove 99.9%.</li>
<li>Her example: t&frac12; is 8 hr; how long for 750 mg to decompose by 87.5%? That is 3 half-lives, so 24 hr; the 750 mg is not needed.</li>
<li>True/false and select-all items pair "rate" with "half-life". First order: the rate changes with concentration, the half-life is constant. Zero order: the rate is constant, the half-life depends on C<sub>0</sub>.</li>
<li>Her select-all on first-order processes had one correct option, a constant half-life. A constant rate of elimination, {{frac:dC|dt}} = &minus;k, and k in concentration per time all describe zero order.</li>
<li>Marked errors: half-life given in reciprocal time (it is a time, e.g. days, not days<sup>&minus;1</sup>); a negative k; rounding k early (keep 3 to 4 decimal places); a minus sign when working back to C<sub>0</sub>.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li>On t&frac12; = {{frac:0.693|k}}: <q>That one is not on your equation sheet.</q> (09-09)</li>
<li><q>I expect you to give me half-life in units of time.</q> (08-19, 09-09)</li>
</ul>
<p class="gsrc">Sources: Introduction.pdf slides 17&ndash;21, 26 and the three order polls (the third opens 2IVBolusAdministration.pdf); Daily practice, Introduction and Math Review (question ids m1-ord-n01 to n04, m1-ord-n05, n17, n06, n18); exam review stem m1-ord-n14 and n15; transcripts 08-19, 08-24, 09-09.</p>
</section>

<section class="gobj" id="gobj-m1-5">
<h3 data-nav="Module 1, objective 5 &mdash; Determine the area under the curve for a provided data set using the trapezoidal rule">Module 1 - Objective 5</h3>
<div class="gbar"><span>Objective</span><b>Determine the area under the curve for a provided data set using the trapezoidal rule</b><i>Introduction.pdf slides 22&ndash;26</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Plot concentration against time and the area under that curve (AUC) tells you the extent of drug that is available for the body to use.</li>
<li>You rarely have an equation for the curve, only a table of measured points. The trapezoidal rule estimates the area from those points.</li>
<li>Join each pair of neighbouring points with a straight line. Each strip underneath is a trapezoid: its area is the average of the two concentrations times the time between them.</li>
<li>Add the strips inside the interval you are asked about. The units are concentration times time, e.g. mcg&middot;hr/mL.</li>
<li>AUC comes back later in the course: comparing oral and IV AUC gives bioavailability (F, the fraction of an oral dose that enters the plasma), and clearance (the volume of plasma cleared of drug per unit time) links the dose to the AUC.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Area under the curve (AUC)</dt><dd>Area under the concentration-time curve; a measure of the extent of drug available. Units concentration &times; time (mcg&middot;hr/mL).</dd>
<dt>AUC<sub>total</sub></dt><dd>The sum of the AUC of every segment.</dd>
<dt>Trapezoidal rule</dt><dd>A simple way to estimate AUC by splitting it into trapezoids between measured points and adding their areas.</dd>
<dt>Bioavailability factor (F)</dt><dd>The fraction of an oral dose that enters the plasma; no units.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">AUC of one segment = {{frac:C<sub>n&minus;1</sub> + C<sub>n</sub>|2}} &times; (t<sub>n</sub> &minus; t<sub>n&minus;1</sub>)</div>
<ul class="tlist">
<li>C<sub>n&minus;1</sub> and C<sub>n</sub> the two concentrations bounding the segment (mcg/mL); t<sub>n</sub> &minus; t<sub>n&minus;1</sub> the width of the segment (hr). AUC<sub>total</sub> is the sum over segments.</li>
<li>When to use it: any concentration-time table, any route, when asked for the AUC between two times.</li>
<li>On the equation sheet: yes, page 1, first line.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">F = {{frac:AUC<sub>oral</sub>|AUC<sub>IV</sub>}}</div>
<ul class="tlist">
<li>F bioavailability factor (no units); AUC<sub>oral</sub> and AUC<sub>IV</sub> the areas after oral and IV doses.</li>
<li>When to use it: comparing how much of an oral dose reaches the plasma, relative to IV. Taught in full in the bioavailability module.</li>
<li>On the equation sheet: yes, but in the dose-corrected form F = {{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}} &times; {{frac:D<sub>IV</sub>|D<sub>po</sub>}}, where po means by mouth (oral) and D<sub>IV</sub> and D<sub>po</sub> are the IV and oral doses in mg.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Her slide example: plasma levels of 38.9, 30.3, 18.4, 11.1, 6.77 and 4.10 mcg/mL at 0.5, 1, 2, 3, 4 and 5 hr. What is the AUC from hours 2 to 4?</p>
<ol class="gsteps">
<li>Pick the rows inside 2 to 4 hr: 2 hr (18.4), 3 hr (11.1) and 4 hr (6.77). That makes two segments, each 1 hr wide.</li>
<li>Segment 2 to 3 hr: {{frac:18.4 + 11.1|2}} &times; 1 hr = 14.75 mcg&middot;hr/mL.</li>
<li>Segment 3 to 4 hr: {{frac:11.1 + 6.77|2}} &times; 1 hr = 8.935 mcg&middot;hr/mL.</li>
<li>Add them: 14.75 + 8.935 = 23.685, so <b>AUC = 23.7 mcg&middot;hr/mL</b>.</li>
</ol>

<h4>Picture it</h4>
<ul class="tlist"><li>Under Diagrams, Her examples step by step, "The trapezoidal rule on her data" shades each strip of this problem in turn and adds them.</li></ul>

<h4>How she tests it</h4>
<ul class="tlist">
<li>A table of concentrations and an interval named in hours. Use only the trapezoids between rows inside that interval, not the whole table and not an extrapolated tail.</li>
<li>The first step is choosing the rows. Her table starts at 0.5 hr, outside the interval she asked about, and the 5 hr row is beyond it.</li>
<li>Check each width from the time column. Where sampling times are uneven (0.5 to 1 hr is half an hour), a segment's width is not 1 hr.</li>
<li>Give the units as concentration times time (mcg&middot;hr/mL); she says the unit combination aloud rather than printing it.</li>
<li>Conceptually she asks what AUC tells you: the extent of drug available for the body to use.</li>
<li>Her slide example is the only AUC problem in the collected course material; no practice set, homework or in-class sheet sets one.</li>
</ul>
<p class="gsrc">Sources: Introduction.pdf slides 22&ndash;26 (worked example slide 25; question id m1-auc-n01); transcripts 08-19, 08-24, 09-09.</p>
</section>

<h2>Module 2 - IV Bolus Administration</h2>
<ul class="tlist">
<li>Six objectives, from the lectures of 24 August and 26 August.</li>
<li>The first three come from the one-compartment lecture of 24 August.</li>
<li>The last three come from the multicompartment lecture of 26 August.</li>
<li>Both sets are reprinted unchanged on the Exam 1 recap deck.</li>
</ul>

<section class="gobj" id="gobj-m2-1">
<h3 data-nav="Module 2, objective 1 &mdash; Describe a one-compartment model, IV bolus injection">Module 2 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Describe a one-compartment model, IV bolus injection</b><i>2IVBolusAdministration.pdf, slides "One-Compartment Open Model" and "Concentration of Drug in the Plasma, Cp"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>An IV bolus is a whole dose injected into a vein at once, so all of the drug is in the body at time zero.</li>
<li>The one-compartment model treats the body as one uniform space: the drug spreads through it instantly and evenly, and the plasma concentration stands for the whole body.</li>
<li>Elimination starts the moment the drug is in, and it is first order, so a fixed fraction of the drug leaves per unit time.</li>
<li>These are simplifying assumptions that real bodies do not meet exactly, but they make the simplest model of distribution and elimination, and the rest of the course builds on it.</li>
<li>On paper the result is a concentration that starts high and falls along an exponential curve, which becomes a straight line on a log scale.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>IV bolus</dt><dd>A single dose injected intravenously all at once; she also calls it instantaneous input.</dd>
<dt>One-compartment open model</dt><dd>The body as one uniform compartment that drug can enter and leave ("open").</dd>
<dt>Amount of drug in the body (D<sub>B</sub>)</dt><dd>Drug in the body at time t, in mg. At time zero after a bolus it equals the dose, D<sub>0</sub>.</dd>
<dt>Volume of distribution (V<sub>D</sub>)</dt><dd>The volume, in L, that links the amount in the body to the plasma concentration.</dd>
<dt>Plasma concentration (C<sub>p</sub>)</dt><dd>Drug concentration in plasma at time t, in mg/L. C<sub>p</sub><sup>0</sup> (or C<sub>0</sub>) is the value at time zero.</dd>
<dt>Elimination rate constant (k)</dt><dd>The overall first-order rate constant for elimination, in hr<sup>&minus;1</sup>. A k with no subscript always means this overall constant.</dd>
<dt>k<sub>m</sub> and k<sub>e</sub></dt><dd>The rate constants for metabolism and for excretion, in hr<sup>&minus;1</sup>; together they make up k.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">C<sub>p</sub> = {{frac:D<sub>B</sub>|V<sub>D</sub>}}</div>
<ul class="tlist">
<li>C<sub>p</sub> plasma concentration (mg/L); D<sub>B</sub> amount in the body (mg); V<sub>D</sub> volume of distribution (L).</li>
<li>When to use it: to convert between an amount and a concentration at any one time.</li>
<li>On the equation sheet: yes, and she also expects you to know it without the sheet.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">k = k<sub>m</sub> + k<sub>e</sub></div>
<ul class="tlist">
<li>k overall elimination rate constant; k<sub>m</sub> metabolism; k<sub>e</sub> excretion; all in hr<sup>&minus;1</sup>.</li>
<li>When to use it: to read the model diagram; the overall k is what the calculations use.</li>
<li>On the equation sheet: no.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">{{frac:dD<sub>B</sub>|dt}} = &minus;kD<sub>B</sub> &nbsp;&nbsp; and &nbsp;&nbsp; {{frac:dC<sub>p</sub>|dt}} = &minus;kC<sub>p</sub></div>
<ul class="tlist">
<li>The rate of loss is proportional to what is present, which is what first order means; the minus sign says the amount is falling.</li>
<li>When to use it: to recognise the model. You will not integrate it; the three forms below are the integrated result.</li>
<li>On the equation sheet: yes, grouped with the integrated forms below.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup></div>
<div class="geqline">ln C<sub>p</sub> = &minus;kt + ln C<sub>p</sub><sup>0</sup></div>
<div class="geqline">log C<sub>p</sub> = &minus;{{frac:kt|2.3}} + log C<sub>p</sub><sup>0</sup></div>
<ul class="tlist">
<li>C<sub>p</sub><sup>0</sup> concentration at time zero (mg/L); k in hr<sup>&minus;1</sup>; t time since the dose (hr); the 2.3 in the log line converts between the natural log (ln, base e) and log to base 10.</li>
<li>The three lines are the same relation; she prefers the natural-log form, but any of them gets the same answer.</li>
<li>When to use it: whenever a stem says IV bolus and one compartment.</li>
<li>On the equation sheet: yes.</li>
</ul>
</div>

<h4>How she tests it</h4>
<ul class="tlist">
<li>The model is usually a condition in the stem rather than a question of its own; it is examined inside the calculations of objective 3.</li>
<li>About half the time she states it outright, as "one-compartment, first-order elimination", "one-compartment open model" or "linear, first-order, one compartment pharmacokinetics".</li>
<li>In the data-table problems she leaves it out, because working out the order from the data is the task.</li>
<li>If she gives a graph with a log concentration axis, a single straight line after an IV bolus means one compartment.</li>
<li>Before calculating, she recommends sketching a curve that starts high and falls, so you can check that a later concentration comes out lower.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q class="para">If I tell you that it is an IV bolus dose that is administered, your expectation is first order.</q> (09-09)</li>
</ul>
<p class="gsrc">Sources: 2IVBolusAdministration.pdf, slides "One-Compartment Open Model: IV Bolus Administration", "Concentration of Drug in the Plasma, Cp" and "Summary"; RecapExam1.pdf; reference.js (equation sheet status); lectures 08-19, 08-24, 09-02, 09-09.</p>
</section>

<section class="gobj" id="gobj-m2-2">
<h3 data-nav="Module 2, objective 2 &mdash; Define key pharmacokinetic parameters &ndash; clearance and volume of distribution">Module 2 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Define key pharmacokinetic parameters &ndash; clearance and volume of distribution</b><i>2IVBolusAdministration.pdf, slides "Volume of Distribution" (two) and "Clearance"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>The volume of distribution (V<sub>D</sub>) is the volume the dose would have to dissolve in to give the concentration measured in plasma. It is not a real body space, which is why it is called "apparent".</li>
<li>A drug that leaves the blood for the tissues has a low plasma concentration and so a large V<sub>D</sub>; a drug held in the blood, for example by binding to plasma proteins, has a small V<sub>D</sub>.</li>
<li>Clearance (Cl) is the volume of plasma cleared of drug per unit time. It measures elimination without saying how the drug is removed.</li>
<li>Both are constants for a given drug in a given patient, so changing the dose or the concentration does not change them.</li>
<li>Clearance is useful for two reasons: it stays constant, and it links the dose directly to the area under the curve.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Apparent volume of distribution (V<sub>D</sub>)</dt><dd>A proportionality constant between amount in the body and plasma concentration, in L (or L/kg, or % of body weight).</dd>
<dt>Clearance (Cl, Cl<sub>T</sub>)</dt><dd>Volume of plasma cleared of drug per unit time, in L/hr; also called drug, systemic or total body clearance.</dd>
<dt>Elimination rate constant (k)</dt><dd>Overall first-order rate constant, in hr<sup>&minus;1</sup>.</dd>
<dt>Area under the curve (AUC<sub>0</sub><sup>&infin;</sup>)</dt><dd>Area under the plasma concentration&ndash;time curve from time zero to infinity, in mg&middot;hr/L.</dd>
<dt>Dose (D<sub>0</sub>)</dt><dd>The amount given, in mg; for a bolus it is the amount in the body at time zero.</dd>
<dt>Percent of body weight</dt><dd>A way of giving V<sub>D</sub>: 1 L is taken as equal to 1 kg, so 10% of an 80-kg patient is 8 L.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">V<sub>D</sub> = {{frac:D<sub>B</sub>|C<sub>p</sub>}} &nbsp;&nbsp; so at time zero &nbsp;&nbsp; V<sub>D</sub> = {{frac:D<sub>0</sub>|C<sub>0</sub>}}</div>
<ul class="tlist">
<li>D<sub>B</sub> amount in the body (mg); C<sub>p</sub> plasma concentration at the same time (mg/L); D<sub>0</sub> dose (mg); C<sub>0</sub> concentration at time zero (mg/L).</li>
<li>When to use it: to find V<sub>D</sub> from a dose and an initial concentration, or to turn a measured concentration into an amount.</li>
<li>On the equation sheet: yes, as C<sub>p</sub> = D<sub>B</sub> over V<sub>D</sub>; she also expects it known.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Cl = k &times; V<sub>D</sub></div>
<ul class="tlist">
<li>Cl in L/hr; k in hr<sup>&minus;1</sup>; V<sub>D</sub> in L.</li>
<li>When to use it: for total body clearance once k and V<sub>D</sub> are known.</li>
<li>On the equation sheet: no. She named it as one to memorise, together with the half-life equation.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Cl<sub>T</sub> = {{frac:D<sub>0</sub>|AUC<sub>0</sub><sup>&infin;</sup>}}</div>
<ul class="tlist">
<li>D<sub>0</sub> dose (mg); AUC<sub>0</sub><sup>&infin;</sup> in mg&middot;hr/L; Cl<sub>T</sub> in L/hr.</li>
<li>When to use it: when a dose and an AUC are given instead of k and V<sub>D</sub>.</li>
<li>On the equation sheet: yes, written as Cl<sub>T</sub> = FD<sub>0</sub> over AUC (F, the fraction absorbed, is 1 for IV).</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Her lecture example: the same 100 mg dose given into three different volumes of distribution.</p>
<ol class="gsteps">
<li>Use C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}} with V<sub>D</sub> = 1 L: {{frac:100 mg|1 L}} = <b>100 mg/L</b>.</li>
<li>With V<sub>D</sub> = 10 L: {{frac:100 mg|10 L}} = <b>10 mg/L</b>.</li>
<li>With V<sub>D</sub> = 100 L: {{frac:100 mg|100 L}} = <b>1 mg/L</b>.</li>
<li>Same amount of drug, but these would be three different drugs; the larger the V<sub>D</sub>, the lower the plasma concentration.</li>
</ol>

<h4>Picture it</h4>
{{fig:unit_cancel|Five of her equations with the units written in. The struck unit cancels; the blue unit is the unit of the answer.}}
<ul class="tlist"><li>Carry the units with the numbers. k in hr<sup>&minus;1</sup> times V<sub>D</sub> in L leaves L/hr, the unit a clearance must have.</li><li>Step through it under Diagrams, See the idea behind the arithmetic.</li></ul>

<h4>How she tests it</h4>
<ul class="tlist">
<li>Definitions as single-best-answer polls: which parameter describes elimination as volume of fluid cleared of drug per unit time? Answer: clearance (not biotransformation, elimination rate or excretion).</li>
<li>True/false: "Clearance increases as concentration increases." False, because clearance is a constant.</li>
<li>Which increases when the IV bolus dose increases? Only the plasma concentration; clearance, half-life and V<sub>D</sub> stay the same.</li>
<li>At the end of calculation problems: if the dose were doubled, what happens to the half-life, the clearance and the initial concentration? No change, no change, doubled.</li>
<li>V<sub>D</sub> arrives per kilogram (3 L/kg, 0.5 L/kg, 400 mL/kg), as a percent of body weight (20%, 23.1%), as litres (16 L, 12 L), or not at all, to be found as dose divided by C<sub>0</sub>.</li>
<li>The usual trap is the unit: a percent or per-kilogram V<sub>D</sub> must be multiplied by the weight in kg, and the answer is in litres, not kilograms.</li>
<li>The fish tank model of clearance on her slide goes beyond the course; the part she uses is that only free (unbound) drug can be cleared, and protein-bound drug cannot.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>this is another one that it will not be on your equation sheet cause I want you to take this one with you to your grave along with the half-life equation. Clearance is equal to k times vd.</q> (08-24)</li>
<li><q>in kinetics, our body weight is always in kilograms… So, 1 L volume is equal to 1 kg of body weight</q> (08-24)</li>
</ul>
<p class="gsrc">Sources: 2IVBolusAdministration.pdf, slides "Volume of Distribution" (two), "Clearance", "Fish Tank Model of Clearance" and the poll after "Summary"; 3IntravenousInfusions.pdf, opening poll; reference.js (equation sheet status); lectures 08-24, 08-26, 09-02, 09-14.</p>
</section>

<section class="gobj" id="gobj-m2-3">
<h3 data-nav="Module 2, objective 3 &mdash; Calculate pharmacokinetic parameters from concentration versus time data">Module 2 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Calculate pharmacokinetic parameters from concentration versus time data</b><i>2IVBolusAdministration.pdf, slide "Practice"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Given a dose and one or two measured plasma concentrations, you work out the patient's elimination rate constant, half-life, starting concentration, volume of distribution and clearance.</li>
<li>Each value feeds the next, so the order matters: k first, then half-life, then C<sub>0</sub>, then V<sub>D</sub>, then clearance and amounts.</li>
<li>Compare like with like: a rate constant comes from two amounts or from two concentrations, never from an amount and a concentration together.</li>
<li>V<sub>D</sub> is the converter between the two, because an amount equals V<sub>D</sub> times a concentration.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Elimination rate constant (k)</dt><dd>First-order rate constant, in hr<sup>&minus;1</sup>; the slope of ln C<sub>p</sub> against time, with the sign changed.</dd>
<dt>Half-life (t&frac12;)</dt><dd>Time for the concentration or amount to fall by half, in hr; the same at any concentration for a first-order drug.</dd>
<dt>Initial concentration (C<sub>0</sub>)</dt><dd>Plasma concentration at time zero, in mg/L, found by running a measured point back along the line.</dd>
<dt>Volume of distribution (V<sub>D</sub>)</dt><dd>Links amount and concentration, in L.</dd>
<dt>Total body clearance (Cl<sub>T</sub>)</dt><dd>Volume of plasma cleared of drug per unit time, in L/hr.</dd>
<dt>Amount in the body (D<sub>B</sub>) and dose (D<sub>0</sub>)</dt><dd>Both in mg; D<sub>0</sub> is the amount at time zero.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">k = {{frac:ln C<sub>1</sub> &minus; ln C<sub>2</sub>|t<sub>2</sub> &minus; t<sub>1</sub>}} &nbsp;&nbsp; or, with amounts, &nbsp;&nbsp; k = {{frac:ln D<sub>0</sub> &minus; ln D<sub>B</sub>|t}}</div>
<ul class="tlist">
<li>C<sub>1</sub>, C<sub>2</sub> concentrations at times t<sub>1</sub>, t<sub>2</sub> (mg/L, hr); D<sub>0</sub> dose and D<sub>B</sub> amount at time t (mg); k in hr<sup>&minus;1</sup>.</li>
<li>When to use it: whenever two points of the same kind are known.</li>
<li>On the equation sheet: yes, as a rearrangement of the ln C<sub>p</sub> line.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">t&frac12; = {{frac:0.693|k}}</div>
<ul class="tlist">
<li>t&frac12; in hr; k in hr<sup>&minus;1</sup>.</li>
<li>When to use it: every time a half-life is asked, and to check answers by counting half-lives.</li>
<li>On the equation sheet: no. She named it as one to memorise.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>0</sub> = C<sub>t</sub>e<sup>kt</sup></div>
<ul class="tlist">
<li>C<sub>t</sub> a measured concentration at time t (mg/L). The exponent is positive because you are going back in time.</li>
<li>When to use it: to find C<sub>0</sub> when no sample was taken at time zero. C<sub>0</sub> must be higher than every sampled point.</li>
<li>On the equation sheet: yes, as C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup> rearranged.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">D<sub>B</sub> = D<sub>0</sub>e<sup>&minus;kt</sup> &nbsp;&nbsp; or &nbsp;&nbsp; D<sub>B</sub> = V<sub>D</sub> &times; C<sub>t</sub></div>
<ul class="tlist">
<li>D<sub>B</sub> amount in the body at time t (mg). Both routes give the same answer, and she accepts either.</li>
<li>When to use it: when the question asks for an amount rather than a concentration.</li>
<li>On the equation sheet: the C<sub>p</sub> forms are; these are the same lines multiplied by V<sub>D</sub>.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">V<sub>D</sub> = {{frac:D<sub>0</sub>|C<sub>0</sub>}} &nbsp;&nbsp; and &nbsp;&nbsp; Cl<sub>T</sub> = k &times; V<sub>D</sub></div>
<ul class="tlist">
<li>V<sub>D</sub> in L; Cl<sub>T</sub> in L/hr. See objective 2 for the sheet status of each.</li>
<li>When to use it: parts e and f of her standard battery.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Her deck practice: 200 mg IV dose to an 80-kg man; 15 mg/L in plasma at 6 hours; V<sub>D</sub> is 10% of body weight. Find the amount in the body at 12 hours and the half-life.</p>
<ol class="gsteps">
<li>Convert V<sub>D</sub> to litres, using 1 L per kg: V<sub>D</sub> = 0.10 &times; 80 kg = 8 L.</li>
<li>Turn the 6-hour concentration into an amount so it can be compared with the 200 mg dose: D<sub>B</sub> = 8 L &times; 15 mg/L = 120 mg.</li>
<li>Find k from the two amounts: k = {{frac:ln 200 &minus; ln 120|6 hr}} = 0.085 hr<sup>&minus;1</sup>.</li>
<li>Amount at 12 hours: D<sub>B</sub> = 200 mg &times; e<sup>&minus;(0.085)(12)</sup> = 200 &times; 0.36 = <b>72 mg</b>.</li>
<li>Half-life: t&frac12; = {{frac:0.693|0.085 hr<sup>&minus;1</sup>}} = <b>8.15 hr</b>. Carrying k unrounded (0.08514 hr<sup>&minus;1</sup>) gives 8.14 hr; the 72 mg is the same either way.</li>
<li>Her added question, not on the slide, the concentration at 12 hours: C = {{frac:72 mg|8 L}} = <b>9 mg/L</b>.</li>
</ol>
<p class="prose">Her Exam 1 review problem: 154-lb woman, 15 mg/kg IV bolus; 32.85 mcg/mL at 2 hours and 9.32 mcg/mL at 8 hours.</p>
<ol class="gsteps">
<li>Rate constant from the two concentrations, 6 hours apart: k = {{frac:ln 32.85 &minus; ln 9.32|8 &minus; 2 hr}} = {{frac:1.2598|6 hr}} = 0.21 hr<sup>&minus;1</sup>.</li>
<li>Half-life: t&frac12; = {{frac:0.693|0.21 hr<sup>&minus;1</sup>}} = <b>3.3 hr</b>.</li>
<li>Dose: 1 kg is 2.2 lb, so {{frac:154 lb|2.2 lb/kg}} = 70 kg, and D<sub>0</sub> = 15 mg/kg &times; 70 kg = 1050 mg.</li>
<li>Back-extrapolate to time zero: C<sub>0</sub> = 32.85 &times; e<sup>(0.21)(2)</sup> = <b>50 mcg/mL</b>, which is 50 mg/L (mcg/mL and mg/L are the same number).</li>
<li>Volume: V<sub>D</sub> = {{frac:1050 mg|50 mg/L}} = <b>21 L</b>.</li>
<li>Clearance: Cl<sub>T</sub> = 0.21 hr<sup>&minus;1</sup> &times; 21 L = <b>4.41 L/hr</b>.</li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>One patient, then a chain of small parts, each meant to take a minute or two; if a part takes five minutes, you are working too hard.</li>
<li>Her standard eight parts, in order: k; half-life; C<sub>0</sub>; concentration 15 minutes after the dose; V<sub>D</sub>; total body clearance; amount in the body at 3 hours; time for 99.9% to be eliminated.</li>
<li>The data come either as a six-row table or as two plasma points in prose. On the exam the parts are split up and you cannot go back to an earlier part.</li>
<li>Weight in pounds with a mg/kg dose means the 2.2 conversion is being tested, and every later part depends on it. Weight in kg is sometimes given and never used.</li>
<li>"15 minutes" must be converted to 0.25 hr. "99.9% eliminated" always means ten half-lives.</li>
<li>Usual trap: dividing the dose by a concentration to get k. Convert one of them first so both are amounts or both are concentrations.</li>
<li>mg/L and mcg/mL are the same number, so no conversion is needed between them.</li>
<li>Marking: no leading decimal point (write 0.21, not .21), and give units whenever the answer has them.</li>
<li>For the review problem the captions also carry "51 liters" and "4.14"; 21 L and 4.41 L/hr are what her own numbers give.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>Milligrams per liter equals micrograms per mL. I am telling you this because I don't want you to spend 10 minutes doing the conversion and then being off by a magnitude of 10</q> (08-24)</li>
<li><q>There should never be a leading decimal… If you give me that as your final answer, you will lose half the points for this answer.</q> (08-17)</li>
</ul>
<p class="gsrc">Sources: 2IVBolusAdministration.pdf, slides "Practice" (one-compartment section), "Concentration of Drug in the Plasma, Cp" and "Clearance"; RecapExam1.pdf, Exam 1 review practice; IV Bolus Practice 1 and 2; q2_module2.js m2-n-deck12; lectures 08-17, 08-24, 08-26, 09-09.</p>
</section>

<section class="gobj" id="gobj-m2-4">
<h3 data-nav="Module 2, objective 4 &mdash; Differentiate between single and multiple-compartment pharmacokinetic models">Module 2 - Objective 4</h3>
<div class="gbar"><span>Objective</span><b>Differentiate between single and multiple-compartment pharmacokinetic models</b><i>2IVBolusAdministration.pdf, slides "Why Multicompartment Models?" through "Plasma Level&ndash;Time Curve"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Both models start with an IV bolus. The difference is whether the drug spreads evenly through the body at once (one compartment) or reaches some tissues before others (two or more compartments).</li>
<li>You tell them apart on a plot of concentration on a log scale against time: one compartment gives a single straight line.</li>
<li>Two compartments give a steep early segment, the distribution phase, followed by a straight, shallower segment, the elimination phase.</li>
<li>Graphs in this deck use a log scale even when the axis is not labelled "log".</li>
<li>Unless she shows a graph, she has to tell you which model the drug follows.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Log C<sub>p</sub> plot</dt><dd>Plasma concentration (C<sub>p</sub>) on a logarithmic axis against time; a first-order decline is a straight line on it.</dd>
<dt>Distribution phase</dt><dd>The steep early fall in a two-compartment curve, while drug is still moving into the tissues.</dd>
<dt>Elimination phase</dt><dd>The later straight segment, once the drug is evenly distributed and its fall reflects elimination.</dd>
<dt>Method of residuals (feathering, peeling)</dt><dd>A way to fit a curve to data that do not follow one compartment: the extrapolated straight line is subtracted from the observed data to get the fast (alpha) phase.</dd>
<dt>A, B, alpha (a), beta (b)</dt><dd>The two intercepts (mg/L) and two slopes (hr<sup>&minus;1</sup>) of a two-compartment curve; see objective 6.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">One compartment: C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup></div>
<div class="geqline">Two compartments: C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup></div>
<ul class="tlist">
<li>One exponential term means one straight line on a log plot; two terms mean two phases. k, a and b are rate constants in hr<sup>&minus;1</sup>; C<sub>p</sub><sup>0</sup>, A and B are concentrations in mg/L.</li>
<li>When to use it: to identify the model from the equation a stem gives you.</li>
<li>On the equation sheet: yes, both.</li>
</ul>
</div>

<h4>How she tests it</h4>
<ul class="tlist">
<li>A log-scale graph after an IV bolus with the model withheld: a single straight line is one compartment; a line with a steeper early segment is two compartments.</li>
<li>A stem that never says "two-compartment" but gives a biexponential equation, or A, B, alpha and beta. Recognising the model is the first step of the calculation.</li>
<li>Feathering is conceptual only. She will not ask you to do the method of residuals; she will give you A, B, alpha and beta and ask what they represent and why they are used.</li>
<li>No poll or practice item in the sources asks the one-versus-two choice on its own.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>if I tell you that we're giving an IV bolus dose, now what do I have to tell you? I have to tell you that it follows a one compartment model or a two compartment</q> (08-26)</li>
<li><q>I want you to conceptually know what that is, but I'm not gonna ask you to do that.</q> (08-26, on feathering)</li>
</ul>
<p class="gsrc">Sources: 2IVBolusAdministration.pdf, slides "Why Multicompartment Models?", "One- versus Two-Compartment Models", "Method of Residuals", "Plasma Level&ndash;Time Curve for Two-Compartment Model" and "Concentration of Drug in the Central Compartment"; reference.js (equation sheet status); lectures 08-26, 09-09.</p>
</section>

<section class="gobj" id="gobj-m2-5">
<h3 data-nav="Module 2, objective 5 &mdash; Explain why some drugs best fit a multi-compartment model">Module 2 - Objective 5</h3>
<div class="gbar"><span>Objective</span><b>Explain why some drugs best fit a multi-compartment model</b><i>2IVBolusAdministration.pdf, slides "General Grouping of Tissues" through "Relationship between Tissue and Plasma Concentrations"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Tissues receive different amounts of blood, so a drug reaches well-perfused organs first and slowly perfused tissues later, before it is evenly spread through the body.</li>
<li>When that happens the plasma level after a single IV bolus does not fall as one straight line on a log plot, and one compartment no longer describes it.</li>
<li>The two-compartment model splits the body into a central compartment (plasma and fast tissues) and a tissue compartment, with drug moving back and forth between them.</li>
<li>The course uses the version in which drug enters and leaves the body only through the central compartment.</li>
<li>Distribution has to be faster than elimination; otherwise the drug would be eliminated before it reached concentrations high enough to work.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Perfusion</dt><dd>Blood supply to a tissue. Highly perfused: heart, brain, hepatic-portal system, kidney, endocrine glands (9% of body weight).</dd>
<dt>Other tissue groups</dt><dd>Skin and muscle 50%; adipose tissue and marrow 19%; slowly perfused bone, ligaments, tendons, cartilage, teeth and hair 22%.</dd>
<dt>Central compartment (D<sub>p</sub>, C<sub>p</sub>, V<sub>p</sub>)</dt><dd>Plasma and quickly reached tissues: amount (mg), concentration (mg/L) and volume (L). Drug goes in and is eliminated here.</dd>
<dt>Tissue compartment (D<sub>t</sub>, C<sub>t</sub>, V<sub>t</sub>)</dt><dd>The more slowly reached tissues, with their own amount, concentration and volume.</dd>
<dt>Transfer constants (k<sub>12</sub>, k<sub>21</sub>)</dt><dd>How fast drug moves from central to tissue (k<sub>12</sub>) and from tissue back to central (k<sub>21</sub>), in hr<sup>&minus;1</sup>.</dd>
<dt>Elimination rate constant (k)</dt><dd>Elimination from the central compartment, in hr<sup>&minus;1</sup>.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">{{frac:dC<sub>t</sub>|dt}} = k<sub>12</sub>C<sub>p</sub> &minus; k<sub>21</sub>C<sub>t</sub></div>
<div class="geqline">{{frac:dC<sub>p</sub>|dt}} = k<sub>21</sub>C<sub>t</sub> &minus; k<sub>12</sub>C<sub>p</sub> &minus; kC<sub>p</sub></div>
<ul class="tlist">
<li>The tissue gains drug from plasma and loses it back. Plasma gains drug from tissue, loses it to tissue, and also loses it by elimination (the extra &minus;kC<sub>p</sub>).</li>
<li>When to use it: to read the model diagram. She does not ask you to solve these; objective 6 has the equations you calculate with.</li>
<li>On the equation sheet: not stated in the sources for this module.</li>
</ul>
</div>

<h4>How she tests it</h4>
<ul class="tlist">
<li>As a reason in words, not a calculation: what A, B, alpha and beta represent, and why the model is used.</li>
<li>A and B are the intercepts, in mg/L, and alpha and beta the slopes, in hr<sup>&minus;1</sup>, of the distribution and elimination phases of a two-compartment curve.</li>
<li>No poll or practice question in the sources asks this objective directly.</li>
<li>The perfusion table is not for memorising; she told the class not to panic over it.</li>
<li>The brain is listed as highly perfused, but she says it keeps drugs out and is usually not part of the distribution phase. Use the table for a perfusion question and her caveat for a distribution-phase question.</li>
<li>The figure of tissue against plasma concentrations is theoretical, because only plasma is sampled in practice.</li>
<li>Of the three two-compartment wirings shown (elimination from the central compartment, from the tissue, or from both), the course uses elimination from the central compartment only.</li>
</ul>
<p class="gsrc">Sources: 2IVBolusAdministration.pdf, slides "General Grouping of Tissues According to Blood Supply", "Examples of Two-Compartment Models", "Two-Compartment Open Model (IV Bolus Injection)", "Relationship between Tissue and Plasma Concentrations for a Two-Compartment Open Model" and "Summary"; lecture 08-26.</p>
</section>

<section class="gobj" id="gobj-m2-6">
<h3 data-nav="Module 2, objective 6 &mdash; Predict drug concentration following IV bolus administration in a multi-compartment model">Module 2 - Objective 6</h3>
<div class="gbar"><span>Objective</span><b>Predict drug concentration following IV bolus administration in a multi-compartment model</b><i>2IVBolusAdministration.pdf, slides "Concentration of Drug in the Central Compartment" through "Apparent Volumes of Distribution"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>For a two-compartment drug, the plasma concentration is the sum of two falling exponential terms: a fast one for distribution and a slow one for elimination.</li>
<li>She gives you the four parameters A, B, alpha and beta (or the equation that contains them), and you substitute them; you do not have to derive them.</li>
<li>Alpha is always the larger exponent, because distribution is faster than elimination. The intercepts A and B can be either way round.</li>
<li>The elimination (beta) half-life comes from beta alone, and the concentration at time zero is A + B.</li>
<li>The same four numbers also give the overall elimination constant, the two transfer constants and the volumes of the compartments.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>A and B</dt><dd>Intercepts of the distribution and elimination phases on the log C<sub>p</sub> axis, in mg/L (or mcg/mL).</dd>
<dt>Alpha (a) and beta (b)</dt><dd>Slopes of the distribution and elimination phases, in hr<sup>&minus;1</sup>; a is larger than b.</dd>
<dt>Beta half-life (t&frac12;<sub>&beta;</sub>)</dt><dd>The elimination half-life of a two-compartment drug, in hr. An exam will say "beta half-life" or "elimination half-life".</dd>
<dt>Overall elimination constant (k)</dt><dd>Elimination from the central compartment, in hr<sup>&minus;1</sup>; it is a different number from beta.</dd>
<dt>Transfer constants (k<sub>12</sub>, k<sub>21</sub>)</dt><dd>Central to tissue, and tissue to central, in hr<sup>&minus;1</sup>.</dd>
<dt>Central and tissue volumes (V<sub>p</sub>, V<sub>t</sub>)</dt><dd>Apparent volumes of the two compartments, in L.</dd>
<dt>Dose (D<sub>0</sub>) and AUC<sub>0</sub><sup>&infin;</sup></dt><dd>The bolus dose (mg) and the area under the plasma curve to infinity (mg&middot;hr/L).</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup></div>
<div class="geqline">C<sub>p</sub><sup>0</sup> = A + B</div>
<ul class="tlist">
<li>C<sub>p</sub> concentration at time t (mg/L); t in hr. At t = 0 both exponentials equal 1, which gives the second line.</li>
<li>When to use it: a concentration at a stated hour, and the initial concentration.</li>
<li>On the equation sheet: the first line yes; A + B is not printed but is the same line at t = 0.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">t&frac12;<sub>&beta;</sub> = {{frac:0.693|b}}</div>
<ul class="tlist">
<li>b the beta slope (hr<sup>&minus;1</sup>); result in hr.</li>
<li>When to use it: whenever the elimination or beta half-life is asked. Do not calculate k first; divide 0.693 by beta directly.</li>
<li>On the equation sheet: no; it is the first-order half-life she expects memorised.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">k = {{frac:ab(A + B)|Ab + Ba}}</div>
<div class="geqline">k<sub>21</sub> = {{frac:Ab + Ba|A + B}}</div>
<div class="geqline">k<sub>12</sub> = {{frac:AB(b &minus; a)<sup>2</sup>|(A + B)(Ab + Ba)}}</div>
<ul class="tlist">
<li>All three results are in hr<sup>&minus;1</sup>. Each uses the cross term Ab + Ba, in which each intercept is multiplied by the other phase's slope, so work it out once.</li>
<li>When to use it: when A, B, alpha and beta are listed and the rate constants of the model are asked.</li>
<li>On the equation sheet: yes, all three.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">V<sub>p</sub> = {{frac:D<sub>0</sub>|A + B}} &nbsp;&nbsp; or &nbsp;&nbsp; V<sub>p</sub> = {{frac:D<sub>0</sub>|k &times; AUC<sub>0</sub><sup>&infin;</sup>}}</div>
<div class="geqline">V<sub>t</sub> = {{frac:V<sub>p</sub>k<sub>12</sub>|k<sub>21</sub>}}</div>
<ul class="tlist">
<li>V<sub>p</sub> and V<sub>t</sub> in L; D<sub>0</sub> in mg. Use the first V<sub>p</sub> form when A and B are given, the second when a dose and an AUC are given.</li>
<li>When to use it: the "volume of distribution of the central compartment" part, nearly always by dose over A + B.</li>
<li>On the equation sheet: yes, all three.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Her deck practice, theophylline: C<sub>p</sub> = 12e<sup>&minus;5.8t</sup> + 18e<sup>&minus;0.16t</sup>. What is the plasma level 3 hours after an IV bolus dose?</p>
<ol class="gsteps">
<li>Read the parameters: A = 12 mg/L, a = 5.8 hr<sup>&minus;1</sup>, B = 18 mg/L, b = 0.16 hr<sup>&minus;1</sup>. Check that alpha (5.8) is much larger than beta (0.16).</li>
<li>Concentration at time zero: C<sub>p</sub><sup>0</sup> = 12 + 18 = <b>30 mg/L</b>.</li>
<li>Distribution term at 3 hr: 12 &times; e<sup>&minus;(5.8)(3)</sup> = 12 &times; e<sup>&minus;17.4</sup>, which is effectively 0 mg/L.</li>
<li>Elimination term at 3 hr: 18 &times; e<sup>&minus;(0.16)(3)</sup> = 18 &times; e<sup>&minus;0.48</sup> = 18 &times; 0.6188 = 11.14 mg/L.</li>
<li>Add the two terms: C<sub>p</sub> = 0 + 11.14 = <b>11.14 mg/L</b> (she said "eleven-ish" aloud).</li>
<li>Beta half-life: t&frac12;<sub>&beta;</sub> = {{frac:0.693|0.16 hr<sup>&minus;1</sup>}} = <b>4.33 hr</b>.</li>
</ol>
<p class="prose">Her in-class sheet: 250 mg IV bolus, A = 8.45 mg/L, B = 5.32 mg/L, a = 2.18 hr<sup>&minus;1</sup>, b = 0.114 hr<sup>&minus;1</sup>.</p>
<ol class="gsteps">
<li>Beta half-life: {{frac:0.693|0.114 hr<sup>&minus;1</sup>}} = <b>6.08 hr</b> ("six-ish hours").</li>
<li>Initial concentration: 8.45 + 5.32 = <b>13.77 mg/L</b>. At 4 hr: 8.45e<sup>&minus;(2.18)(4)</sup> + 5.32e<sup>&minus;(0.114)(4)</sup> = 0.001 + 3.372 = <b>3.37 mg/L</b>.</li>
<li>Central volume: V<sub>p</sub> = {{frac:250 mg|13.77 mg/L}} = <b>18.16 L</b>.</li>
<li>Cross term: Ab + Ba = (8.45)(0.114) + (5.32)(2.18) = 0.9633 + 11.5976 = 12.5609.</li>
<li>k = {{frac:(2.18)(0.114)(13.77)|12.5609}} = {{frac:3.4221|12.5609}} = <b>0.272 hr<sup>&minus;1</sup></b>.</li>
<li>k<sub>21</sub> = {{frac:12.5609|13.77}} = <b>0.912 hr<sup>&minus;1</sup></b>; k<sub>12</sub> = {{frac:(8.45)(5.32)(0.114 &minus; 2.18)<sup>2</sup>|(13.77)(12.5609)}} = {{frac:191.88|172.96}} = <b>1.109 hr<sup>&minus;1</sup></b>.</li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>She gives the equation, or A, B, alpha and beta, and does not say "two-compartment"; the parameters are the whole stem.</li>
<li>The same four parts recur in the same order across two practice sets, a homework and the review deck: elimination half-life, initial concentration, concentration at a stated hour, central volume.</li>
<li>The first part is almost always the elimination half-life, from the smaller exponent. Using alpha, or calculating k first, is the usual mistake.</li>
<li>Units are set in a parenthetical such as "(Concentration is given in mcg/mL and time in hours)", so take the answer's units from there.</li>
<li>When she lists A, B, alpha and beta instead of an equation, she adds k, k<sub>12</sub>, k<sub>21</sub> and the central volume to the battery.</li>
<li>Exam 1 review: 500 mg dose, C = 15e<sup>&minus;3.4t</sup> + 7e<sup>&minus;0.12t</sup>. She gave the half-life as 5.8 hr and the central volume as 500 divided by 22, and left the 6-hour concentration for you.</li>
<li>She does little of this manipulation in the course; the practice is to show what the numbers look like.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q class="para">It will be written as beta half-life, because I am going to ask you for either the beta half-life or the elimination half-life, so that there is no confusion.</q> (08-26)</li>
<li><q class="para">Do not get all complicated. Do not solve for k and then 0.693 over k; you have done too much work.</q> (08-26)</li>
</ul>
<p class="gsrc">Sources: 2IVBolusAdministration.pdf, slides "Concentration of Drug in the Central Compartment", "Practice" (theophylline), "Beta Half-life", "Rate Constants", "Apparent Volumes of Distribution" and the in-class two-compartment practice sheet.</p>
<p class="gsrc">RecapExam1.pdf; IV Bolus Practice 4; Homework 2; q2_module2.js m2-n-theo, m2-n-koverall, m2-n-k21, m2-n-k12; reference.js (equation sheet status); lectures 08-26, 09-09.</p>
</section>

<h2>Module 3 - Intravenous Infusions</h2>
<ul class="tlist">
<li>Seven objectives, printed on the "Objectives" slide of 3IntravenousInfusions.pdf and reprinted unchanged on RecapExam1.pdf.</li>
<li>The module keeps the drug from Module 2.</li>
<li>It changes only how the drug enters the body: a steady drip instead of a single injection.</li>
</ul>

<section class="gobj" id="gobj-m3-1">
<h3 data-nav="Module 3, objective 1 &mdash; Discuss and describe the pharmacokinetics of a medicinal agent following administration by IV infusion">Module 3 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Discuss and describe the pharmacokinetics of a medicinal agent following administration by IV infusion</b><i>3IntravenousInfusions.pdf, slide "Intravenous Infusion"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>An intravenous (IV) infusion runs drug into a vein at a constant rate for a set time, instead of giving it all at once as an IV bolus.</li>
<li>A constant rate of input is a zero-order process.</li>
<li>Elimination stays first order (a fixed fraction of the drug present leaves per unit time), exactly as after a bolus: the drug has not changed, only the way it enters the body has.</li>
<li>The plasma concentration (C<sub>p</sub>) starts at zero and rises toward a plateau, called steady state, where the rate of drug going in equals the rate going out.</li>
<li>When the infusion stops there is no more input, so C<sub>p</sub> falls by ordinary first-order elimination.</li>
<li>The point of infusing is precise control of C<sub>p</sub>: with the basic parameters you can predict C<sub>p</sub> at any time during or after the infusion.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Infusion rate (R)</dt><dd>Amount of drug put in per unit time; amount per time, most often mg/hr.</dd>
<dt>Zero order</dt><dd>A process that runs at a constant rate, whatever the concentration (for an infusion, mg/hr).</dd>
<dt>First order</dt><dd>A process whose rate is proportional to the drug present, set by the elimination rate constant k (hr<sup>&minus;1</sup>).</dd>
<dt>Plasma concentration (C<sub>p</sub>)</dt><dd>Drug concentration in plasma at a given time, in mg/L.</dd>
<dt>Steady-state concentration (C<sub>ss</sub>)</dt><dd>The plateau C<sub>p</sub> reached when rate in equals rate out, in mg/L.</dd>
<dt>Cessation</dt><dd>Stopping the continuous IV infusion; after it, drug only leaves the body.</dd>
</dl>

<h4>Worked example</h4>
<p class="prose">IV Infusions Practice 1, parts a and e: 200 mg of an analgesic dissolved in 500 mL of 5% dextrose, infused over 24 hours. Find the rate in mg/hr and in mL/min.</p>
<ol class="gsteps">
<li>The rate is the amount infused divided by the time it runs: R = {{frac:200 mg|24 hr}} = 8.33 mg/hr.</li>
<li>For the pump, use the volume instead of the drug amount: {{frac:500 mL|24 hr}} = 20.83 mL/hr.</li>
<li>Convert hours to minutes: {{frac:500 mL|24 hr}} &times; {{frac:1 hr|60 min}} = 0.347 mL/min, which she reports as 0.35 mL/min.</li>
</ol>
<p class="prose">Answer: <b>R = 8.33 mg/hr</b>, run at <b>0.35 mL/min</b>.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>No poll or practice question asks this objective on its own. It is the frame for every calculation in the module, so expect it inside multi-part problems.</li>
<li>Her stems read as clinical requests in the second person, such as "You are asked to recommend&hellip;", with a patient vignette, an indication and a body weight.</li>
<li>A compounding detail (200 mg in 500 mL of 5% dextrose) is there for a later part that asks the same rate in mL/min.</li>
<li>Weight may come in pounds and V<sub>D</sub> in L/kg: 110 lb became 50 kg (1 kg is 2.2 lb) and 3 L/kg became 150 L (3 L/kg &times; 50 kg) in her solution, so convert before using them.</li>
<li>V<sub>D</sub> is the apparent volume of distribution, the volume that relates the amount of drug in the body to the plasma concentration.</li>
<li>The words "constant rate" or "continuous infusion" signal zero-order input with first-order elimination.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>Our input is zero order, constant in, first order out. When we stop the in, then it's just out.</q> (09-02)</li>
</ul>

<p class="gsrc">Sources: 3IntravenousInfusions.pdf, slides "Intravenous Infusion" and "Summary"; IV-Infusions-Practice-1-Solutions.pdf, parts a and e; transcript 09-02.</p>
</section>

<section class="gobj" id="gobj-m3-2">
<h3 data-nav="Module 3, objective 2 &mdash; Describe the concept of steady state and how it relates to continuous dosing">Module 3 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Describe the concept of steady state and how it relates to continuous dosing</b><i>3IntravenousInfusions.pdf, slides "Drug Concentration at Steady-State" and "Drug Concentration Prior to Reaching Steady-State"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Steady state is reached when the rate of drug going in equals the rate going out, so the plasma concentration (C<sub>p</sub>) stops rising and holds at a plateau, C<sub>ss</sub>.</li>
<li>Early in an infusion little drug is in the body, so little is eliminated. As C<sub>p</sub> rises, the amount eliminated per hour rises until it matches the infusion rate (R).</li>
<li>The curve is asymptotic: it gets closer and closer to C<sub>ss</sub> but in theory never reaches it exactly.</li>
<li>The time to approach steady state depends only on the half-life (t<sub>&frac12;</sub>, the time for the concentration to change by half), so on the elimination rate constant k. Her short answer is 3 to 5 half-lives.</li>
<li>k is the fraction of drug removed per hour, and it fixes the half-life.</li>
<li>The rate R sets how high the plateau is, not how soon it arrives. A faster infusion gives a higher C<sub>ss</sub> at the same time.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Steady-state concentration (C<sub>ss</sub>)</dt><dd>The plateau plasma concentration, where rate in equals rate out; mg/L.</dd>
<dt>Infusion rate (R)</dt><dd>Drug put in per unit time; mg/hr.</dd>
<dt>Total body clearance (Cl)</dt><dd>Volume of plasma cleared of drug per unit time; L/hr. Cl = k &times; V<sub>D</sub>.</dd>
<dt>Elimination rate constant (k)</dt><dd>First-order rate constant for removal of drug; hr<sup>&minus;1</sup>.</dd>
<dt>Apparent volume of distribution (V<sub>D</sub>)</dt><dd>Volume that relates the amount in the body to C<sub>p</sub>; L.</dd>
<dt>Half-life (t<sub>&frac12;</sub>)</dt><dd>Time for the concentration to change by half; hr.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">C<sub>ss</sub> = {{frac:R|Cl}} = {{frac:R|kV<sub>D</sub>}}</div>
<ul class="tlist">
<li>C<sub>ss</sub> in mg/L; R in mg/hr; Cl in L/hr; k in hr<sup>&minus;1</sup>; V<sub>D</sub> in L.</li>
<li>When to use it: at steady state only. It contains no time, so it says nothing about when steady state arrives.</li>
<li>On the equation sheet: yes, as C<sub>ss</sub> = {{frac:R|Cl}}.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>p</sub> = {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>)</div>
<ul class="tlist">
<li>The first factor is C<sub>ss</sub>. The bracket (1 &minus; e<sup>&minus;kt</sup>) is the fraction of C<sub>ss</sub> reached after infusing for time t (hr, from the start).</li>
<li>Early on the bracket is a small fraction; by about five half-lives it approaches 1.</li>
<li>When to use it: during an infusion, before steady state; rearranged with a natural log, it gives the time to a stated percentage of C<sub>ss</sub>.</li>
<li>On the equation sheet: yes.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">k = {{frac:0.693|t<sub>&frac12;</sub>}}</div>
<ul class="tlist">
<li>Converts a given half-life (hr) into k (hr<sup>&minus;1</sup>), which every infusion equation uses.</li>
<li>On the equation sheet: no. She expects the first-order half-life relation to be memorised.</li>
</ul>
</div>
<p class="prose">Fraction of C<sub>ss</sub> reached, counted in half-lives (1 &minus; 0.5<sup>n</sup> after n half-lives):</p>
<ul class="tlist">
<li>1 half-life: 50%. 2: 75%. 3: 87.5%. 10: 99.9%.</li>
<li>4 half-lives: 93.75% (1 &minus; 0.5<sup>4</sup>). She said 93.25 aloud on 09-02 and "93" at the 09-09 review; the computed value is 93.75%.</li>
<li>About 3.32 half-lives reaches 90% (her own shortcut, not required), and 4.32 half-lives reaches 95%.</li>
</ul>

<h4>Worked example</h4>
<p class="prose">Slide "Example 4": k = 0.15 hr<sup>&minus;1</sup>. How long must the infusion run to reach 90% of steady state?</p>
<ol class="gsteps">
<li>Set the bracket equal to the fraction wanted: 0.9 = 1 &minus; e<sup>&minus;0.15t</sup>.</li>
<li>Isolate the exponential: e<sup>&minus;0.15t</sup> = 1 &minus; 0.9 = 0.1.</li>
<li>Take the natural log of both sides: &minus;0.15t = ln(0.1) = &minus;2.3026.</li>
<li>Solve for t: t = {{frac:&minus;2.3026|&minus;0.15 hr<sup>&minus;1</sup>}} = 15.35 hr.</li>
<li>Check: t<sub>&frac12;</sub> = {{frac:0.693|0.15 hr<sup>&minus;1</sup>}} = 4.62 hr, and 15.35 hr is 3.32 half-lives, matching her 90% shortcut.</li>
</ol>
<p class="prose">Answer: <b>15.35 hr</b>, which she states as <b>about 15 hours</b>.</p>

<h4>Picture it</h4>
{{fig:halflife_ladder|The half-life ladder. Top: percent of a dose left after each half-life. Bottom: percent of steady state reached, with the textbook marks at 3.3, 4.32 and 6.6 half-lives.}}
<ul class="tlist"><li>The bottom panel is her 1 &minus; 0.5<sup>n</sup> table drawn out: 50, 75, 87.5 and 93.75 percent after one to four half-lives.</li><li>Her "about 15 hours" for 90% at k = 0.15 hr<sup>&minus;1</sup> sits at 3.3 half-lives on this curve.</li></ul>

<h4>How she tests it</h4>
<ul class="tlist">
<li>"How long to reach steady state after an IV infusion?" The answer she wants is 3 to 5 half-lives.</li>
<li>A statement that raising the infusion rate shortens or otherwise changes the time to steady state. It is false, because that time depends on the half-life alone.</li>
<li>A specific percentage (90%, 95%) needs a calculation, not "3 to 5 half-lives". If it is 50, 75 or 87.5%, count half-lives; otherwise solve 1 &minus; e<sup>&minus;kt</sup> with a natural log.</li>
<li>A concentration in the stem may be a percentage in disguise: in Practice 4 (half-life 6 hr, so k = {{frac:0.693|6 hr}} = 0.1155 hr<sup>&minus;1</sup>), 5 mg/L against a C<sub>ss</sub> of 10 mg/L is 50%, so one half-life, 6 hr.</li>
<li>The next part of Practice 4 asks for 80% of C<sub>ss</sub>, which is not a power of one half, so it needs the log route: e<sup>&minus;kt</sup> = 0.2, t = {{frac:ln 5|0.1155 hr<sup>&minus;1</sup>}} = 13.93 hr.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q class="para">I want you to hear my voice in your head: if I ask you how long it takes to get to steady state following IV infusion, the simplest answer is 3 to 5 half-lives.</q> (09-02)</li>
</ul>

<p class="gsrc">Sources: 3IntravenousInfusions.pdf, slides "Drug Concentration at Steady-State", "Drug Concentration Prior to Reaching Steady-State" (three slides) and "Example 4"; IV-Infusions-Practice-4-Solutions.pdf, parts d and e; transcripts 09-02 and 09-09.</p>
</section>

<section class="gobj" id="gobj-m3-3">
<h3 data-nav="Module 3, objective 3 &mdash; Determine optimum dosing for an infused drug by calculating pharmacokinetic parameters">Module 3 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Determine optimum dosing for an infused drug by calculating pharmacokinetic parameters</b><i>3IntravenousInfusions.pdf, slides "Example 1" through "Example 4"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Most infusion problems start by turning the stem's data into the parameters the equations need: the elimination rate constant (k), the apparent volume of distribution (V<sub>D</sub>) and the total body clearance (Cl).</li>
<li>With those and the infusion rate (R), every later part follows: steady-state concentration (C<sub>ss</sub>), plasma concentration (C<sub>p</sub>) at a time, time to a percentage, loading dose, pump rate.</li>
<li>A loading dose is an IV bolus given as the infusion starts, sized to reach the target concentration at once.</li>
<li>She builds one patient and chains six or seven parts from it, so an error in k early on carries into every later answer.</li>
<li>Read what the question asks before reaching for the calculator; the parts are small once the parameters are set.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Elimination rate constant (k)</dt><dd>First-order rate constant for removal of drug; hr<sup>&minus;1</sup>.</dd>
<dt>Half-life (t<sub>&frac12;</sub>)</dt><dd>Time for the concentration to fall by half; during an infusion, also the time to reach 50% of C<sub>ss</sub>; hr.</dd>
<dt>Apparent volume of distribution (V<sub>D</sub>)</dt><dd>L; sometimes given per kilogram (L/kg), so multiply by body weight.</dd>
<dt>Total body clearance (Cl or Cl<sub>T</sub>)</dt><dd>L/hr; the sum of renal and metabolic clearance when both are given.</dd>
<dt>Infusion rate (R)</dt><dd>mg/hr.</dd>
<dt>Steady-state concentration (C<sub>ss</sub>)</dt><dd>Plateau concentration; mg/L.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">Cl = k &times; V<sub>D</sub></div>
<ul class="tlist">
<li>Cl in L/hr; k in hr<sup>&minus;1</sup>; V<sub>D</sub> in L.</li>
<li>When to use it: whenever the stem gives a half-life or k and a volume, but the equation needs clearance.</li>
<li>On the equation sheet: no. She names it as one to know without the sheet.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Cl<sub>T</sub> = Cl<sub>renal</sub> + Cl<sub>metabolic</sub></div>
<ul class="tlist">
<li>All in L/hr. Practice 4 prints this sum in its stem: 5 + 6.55 = 11.55 L/hr.</li>
<li>When to use it: when the stem gives the routes separately, and again in a renal-failure part where only the renal value changes.</li>
<li>On the equation sheet: the sheet carries a renal and hepatic split of clearance.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>ss</sub> = {{frac:R|Cl}} &nbsp;and&nbsp; C<sub>p</sub> = C<sub>ss</sub>(1 &minus; e<sup>&minus;kt</sup>)</div>
<ul class="tlist">
<li>The two infusion lines from objective 2, with t the time since the infusion started (hr); the bracket (1 &minus; e<sup>&minus;kt</sup>) is the fraction of C<sub>ss</sub> reached after infusing for time t, so C<sub>p</sub> climbs from 0 toward C<sub>ss</sub>.</li>
<li>On the equation sheet: yes, both.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Slide "Example 1": theophylline, t<sub>&frac12;</sub> = 6 hr, V<sub>D</sub> = 30 L, infused at 50 mg/hr. What is the expected C<sub>ss</sub>?</p>
<ol class="gsteps">
<li>Convert the half-life to k: k = {{frac:0.693|6 hr}} = 0.1155 hr<sup>&minus;1</sup>.</li>
<li>Get clearance from k and the volume: Cl = 0.1155 hr<sup>&minus;1</sup> &times; 30 L = 3.465 L/hr.</li>
<li>Divide the rate by clearance: C<sub>ss</sub> = {{frac:50 mg/hr|3.465 L/hr}} = 14.43 mg/L.</li>
</ol>
<p class="prose">Answer: <b>14.43 mg/L</b> (she works with 14.4 mg/L).</p>
<p class="prose">Slides "Example 3" and "Example 4": Cl<sub>T</sub> = 4.5 L/hr, k = 0.15 hr<sup>&minus;1</sup>, 50 mg/hr. Find C<sub>ss</sub>, then C<sub>p</sub> 8 hours after the start.</p>
<ol class="gsteps">
<li>C<sub>ss</sub> = {{frac:50 mg/hr|4.5 L/hr}} = 11.11 mg/L (her Example 4 answer).</li>
<li>Fraction of C<sub>ss</sub> reached at 8 hr: 1 &minus; e<sup>&minus;(0.15)(8)</sup> = 1 &minus; e<sup>&minus;1.2</sup> = 0.6988.</li>
<li>C<sub>p</sub> = 11.11 mg/L &times; 0.6988 = 7.76 mg/L.</li>
</ol>
<p class="prose">Answer: <b>7.76 mg/L</b> at 8 hours. She did not say this value aloud; it is computed from her R, Cl<sub>T</sub> and k.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>One infusion in the stem, then six or seven parts. Later parts say "at the rate you determined above", so carry your earlier answers forward.</li>
<li>Contrasting scenarios are set in capitals, WITH THE LOADING DOSE against WITHOUT THE LOADING DOSE; check which one each part means.</li>
<li>Expect unit work first: 110 lb to 50 kg (1 kg is 2.2 lb), 3 L/kg to 150 L (times the 50 kg), and a half-life of 4 hr to k = {{frac:0.693|4 hr}} = 0.1733 hr<sup>&minus;1</sup> (Practice 1).</li>
<li>A renal-failure part changes only clearance: in Practice 4 Cl<sub>T</sub> falls from 11.55 to 8.55 L/hr.</li>
<li>So k falls to 0.0855 hr<sup>&minus;1</sup> (the new clearance divided by the unchanged V<sub>D</sub>), and the rate for the same target C<sub>ss</sub> falls to R = C<sub>ss</sub> &times; Cl = 85.5 mg/hr.</li>
<li>Some stem data are never used, such as the 65 kg body weight in Practice 4.</li>
<li>She computes to more precision than she reports and rounds to a practical value, for example 14.86 mg/hr to 15 mg/hr and 454.5 mg to 455 mg.</li>
<li>While working Example 1 aloud she called the 30 L the clearance. 30 L is V<sub>D</sub>; k &times; 30 L gives the clearance, 3.465 L/hr.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q class="para">This will not be one question on the exam. This is going to be broken up into little pieces, so do not panic.</q> (09-02)</li>
</ul>

<p class="gsrc">Sources: 3IntravenousInfusions.pdf, slides "Example 1", "Example 3" and "Example 4"; IV-Infusions-Practice-1-Solutions.pdf; IV-Infusions-Practice-4-Solutions.pdf; transcript 09-02.</p>
</section>

<section class="gobj" id="gobj-m3-4">
<h3 data-nav="Module 3, objective 4 &mdash; Calculate loading doses to be used with an intravenous infusion">Module 3 - Objective 4</h3>
<div class="gbar"><span>Objective</span><b>Calculate loading doses to be used with an intravenous infusion</b><i>3IntravenousInfusions.pdf, slides "IV Bolus Loading Dose and Continuous IV Infusion" and "Example 7"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>A loading dose (D<sub>L</sub>) is an IV bolus given at the same moment the infusion starts.</li>
<li>Its size should equal the amount of drug the body holds at steady state: the target steady-state concentration (C<sub>ss</sub>) times the apparent volume of distribution (V<sub>D</sub>).</li>
<li>A second route divides the infusion rate (R) by the elimination rate constant (k). It gives the right dose only if R was itself chosen to give the target C<sub>ss</sub>.</li>
<li>After it is given, the bolus part of the concentration falls by first-order elimination while the infusion part rises, and the two are added.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Loading dose (D<sub>L</sub>)</dt><dd>IV bolus given with the start of an infusion to reach C<sub>ss</sub> at once; mg.</dd>
<dt>Initial concentration (C<sub>0</sub>)</dt><dd>Concentration the bolus produces at time zero, D<sub>L</sub> divided by V<sub>D</sub>; mg/L.</dd>
<dt>Steady-state concentration (C<sub>ss</sub>)</dt><dd>mg/L. Note that 1 mcg/mL equals 1 mg/L.</dd>
<dt>Apparent volume of distribution (V<sub>D</sub>)</dt><dd>L.</dd>
<dt>Infusion rate (R) and rate constant (k)</dt><dd>mg/hr and hr<sup>&minus;1</sup>.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub></div>
<ul class="tlist">
<li>D<sub>L</sub> in mg; C<sub>ss</sub> in mg/L; V<sub>D</sub> in L.</li>
<li>When to use it: whenever a target C<sub>ss</sub> and a volume are given. It does not depend on any rate.</li>
<li>On the equation sheet: yes, page 1, directly under the R and k form.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">D<sub>L</sub> = {{frac:R|k}}</div>
<ul class="tlist">
<li>R in mg/hr; k in hr<sup>&minus;1</sup>; result in mg.</li>
<li>When to use it: when an appropriate infusion rate has already been chosen for the target. A rate picked without that check gives a poor loading dose.</li>
<li>On the equation sheet: yes.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>p</sub> = (bolus part) + (infusion part)</div>
<div class="geqline">bolus part = {{frac:D<sub>L</sub>|V<sub>D</sub>}} e<sup>&minus;kt</sup> &nbsp;&nbsp; infusion part = {{frac:R|kV<sub>D</sub>}}(1 &minus; e<sup>&minus;kt</sup>)</div>
<ul class="tlist">
<li>Both parts in mg/L; t is the time since the start of therapy (hr).</li>
<li>When to use it: loading dose and infusion running together, for C<sub>p</sub> at a stated time.</li>
<li>On the equation sheet: not as one line. The sheet carries the two parts separately, as the first-order C line and the infusion line.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Slide "Example 7": R = 20 mg/hr, k = 0.16 hr<sup>&minus;1</sup>, V<sub>D</sub> = 10 L. What loading dose reaches 12.5 mcg/mL immediately?</p>
<ol class="gsteps">
<li>First route, rate over k: D<sub>L</sub> = {{frac:20 mg/hr|0.16 hr<sup>&minus;1</sup>}} = 125 mg.</li>
<li>Second route: 12.5 mcg/mL is 12.5 mg/L, so D<sub>L</sub> = 12.5 mg/L &times; 10 L = 125 mg.</li>
<li>The routes agree because this rate is the one that gives 12.5 mg/L: C<sub>ss</sub> = {{frac:20 mg/hr|0.16 hr<sup>&minus;1</sup> &times; 10 L}} = 12.5 mg/L.</li>
</ol>
<p class="prose">Answer: <b>125 mg</b>, by either route.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>She asks for the loading dose and the infusion rate together, as one recommendation for one patient, in either order.</li>
<li>Either route earns the answer; she shows both and joins them with "or".</li>
<li>Exam 1 review: a C<sub>ss</sub> of 24 mg/L and V<sub>D</sub> of about 22 L give D<sub>L</sub> = 24 &times; 22 = 528 mg. The answer is a dose, so it is in milligrams.</li>
<li>A renal-failure part changes clearance and leaves V<sub>D</sub> alone, so R moves and D<sub>L</sub> does not: Practice 4 gives R 115.5 then 85.5 mg/hr, and D<sub>L</sub> 1000 mg both times.</li>
<li>Trap: using D<sub>L</sub> = {{frac:R|k}} with a rate that was never matched to the target concentration.</li>
</ul>

<p class="gsrc">Sources: 3IntravenousInfusions.pdf, first slide "IV Bolus Loading Dose and Continuous IV Infusion" and slide "Example 7"; RecapExam1.pdf; IV-Infusions-Practice-4-Solutions.pdf, parts a and g; transcripts 09-02 and 09-09.</p>
</section>

<section class="gobj" id="gobj-m3-5">
<h3 data-nav="Module 3, objective 5 &mdash; Describe the purpose of a loading dose">Module 3 - Objective 5</h3>
<div class="gbar"><span>Objective</span><b>Describe the purpose of a loading dose</b><i>3IntravenousInfusions.pdf, second slide "IV Bolus Loading Dose and Continuous IV Infusion"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>An infusion alone takes 3 to 5 half-lives to approach its steady-state concentration (C<sub>ss</sub>), so the patient sits below the target for that time.</li>
<li>A loading dose (D<sub>L</sub>) puts in, at once, the amount of drug that would otherwise take 3 to 5 half-lives to build up, so C<sub>ss</sub> is reached almost immediately.</li>
<li>When D<sub>L</sub> is chosen correctly, the falling bolus curve and the rising infusion curve add to a flat line at C<sub>ss</sub> throughout therapy.</li>
<li>Too large a loading dose gives a peak above the plateau that falls back to it; too small gives a dip below it that climbs up. The plateau itself is set by the infusion.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Loading dose (D<sub>L</sub>)</dt><dd>IV bolus given with the start of an infusion; mg.</dd>
<dt>Steady-state concentration (C<sub>ss</sub>)</dt><dd>Plateau plasma concentration; mg/L.</dd>
<dt>Superposition</dt><dd>Adding the concentrations from the bolus and the infusion at the same time to get the total.</dd>
</dl>

<h4>Worked example</h4>
<p class="prose">Slide "Example 8": D<sub>L</sub> = 288 mg given with an infusion of 50 mg/hr; t<sub>&frac12;</sub> (half-life) = 4 hr, V<sub>D</sub> (apparent volume of distribution) = 12 L. Find C<sub>p</sub> (plasma concentration) at 2 and 4 hours.</p>
<ol class="gsteps">
<li>Elimination rate constant, from the first-order half-life relation k = {{frac:0.693|t<sub>&frac12;</sub>}}: k = {{frac:0.693|4 hr}} = 0.17325 hr<sup>&minus;1</sup>.</li>
<li>Bolus part at 2 hr, the loading dose spread through V<sub>D</sub> and then declining by first order (C<sub>0</sub>e<sup>&minus;kt</sup>): {{frac:288 mg|12 L}} e<sup>&minus;(0.17325)(2)</sup> = 24 mg/L &times; 0.7072 = 16.97 mg/L.</li>
<li>Plateau of the infusion, C<sub>ss</sub>, the infusion rate divided by the clearance k &times; V<sub>D</sub>: {{frac:50 mg/hr|0.17325 hr<sup>&minus;1</sup> &times; 12 L}} = 24.05 mg/L.</li>
<li>Infusion part at 2 hr, the plateau times the fraction of it reached after 2 hr, (1 &minus; e<sup>&minus;kt</sup>): 24.05 mg/L &times; (1 &minus; 0.7072) = 24.05 &times; 0.2928 = 7.04 mg/L.</li>
<li>Add the parts: 16.97 + 7.04 = 24.01 mg/L, which she gives as 24 mg/L.</li>
<li>At 4 hr, exactly one half-life: bolus 24 &times; 0.5 = 12.00 mg/L, infusion 24.05 &times; 0.5 = 12.02 mg/L, sum 24 mg/L.</li>
<li>Why it stays flat: the amount of drug in the body at steady state is the infusion rate R divided by k, {{frac:R|k}} = {{frac:50 mg/hr|0.17325 hr<sup>&minus;1</sup>}} = 288.6 mg, so 288 mg matches the amount held at steady state.</li>
</ol>
<p class="prose">Answer: <b>24 mg/L at 2 hours and 24 mg/L at 4 hours</b>, the same as the plateau.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>No poll or practice question asks the purpose as a separate item; it is the reasoning attached to the loading-dose calculations of objective 4.</li>
<li>As a one-sentence free response: the loading dose puts in at once the amount that would otherwise take 3 to 5 half-lives to accumulate.</li>
<li>In class she reworked Example 8 with 388 mg: about 30 mg/L at two hours against a plateau of 24 mg/L, the "too high" case.</li>
<li>A perturbation part asks how long a new steady state takes after renal failure; answer in half-lives of the new, longer half-life (4.32 half-lives for 95% in Practice 3).</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>We want the loading dose to look like the amount of drug that's in the body at steady state.</q> (09-02)</li>
<li><q>the loading dose helps us to reach that steady state concentration, like almost immediately. you got to choose wisely on the loading dose</q> (09-02)</li>
</ul>

<p class="gsrc">Sources: 3IntravenousInfusions.pdf, second slide "IV Bolus Loading Dose and Continuous IV Infusion" and slide "Example 8"; IV-Infusions-Practice-3---Solutions.pdf, part h; transcripts 09-02 and 09-09.</p>
</section>

<section class="gobj" id="gobj-m3-6">
<h3 data-nav="Module 3, objective 6 &mdash; Determine an appropriate infusion rate to achieve a desired steady-state plasma concentration">Module 3 - Objective 6</h3>
<div class="gbar"><span>Objective</span><b>Determine an appropriate infusion rate to achieve a desired steady-state plasma concentration</b><i>3IntravenousInfusions.pdf, slide "Example 2"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>To hit a target steady-state concentration (C<sub>ss</sub>), rearrange the steady-state equation for the infusion rate (R): R equals C<sub>ss</sub> times clearance (Cl).</li>
<li>If only the half-life and volume are given, build clearance first from the elimination rate constant (k) and the apparent volume of distribution (V<sub>D</sub>).</li>
<li>R is an amount per time, most often mg/hr. If the stem gives a solution concentration, convert R into mL/hr or mL/min for the pump.</li>
<li>Raising R raises C<sub>ss</sub> in proportion and shifts the whole curve upward, but the plateau still arrives at the same time.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Infusion rate (R)</dt><dd>mg/hr, or mL/hr and mL/min as a pump setting.</dd>
<dt>Steady-state concentration (C<sub>ss</sub>)</dt><dd>The target plateau; mg/L.</dd>
<dt>Clearance (Cl)</dt><dd>L/hr; equals k &times; V<sub>D</sub>.</dd>
<dt>Elimination rate constant (k) and volume (V<sub>D</sub>)</dt><dd>hr<sup>&minus;1</sup> and L.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">R = C<sub>ss</sub> &times; Cl = C<sub>ss</sub> &times; k &times; V<sub>D</sub></div>
<ul class="tlist">
<li>R in mg/hr; C<sub>ss</sub> in mg/L; Cl in L/hr; k in hr<sup>&minus;1</sup>; V<sub>D</sub> in L.</li>
<li>When to use it: a target concentration is given and the question asks what rate to run.</li>
<li>On the equation sheet: yes, in the form C<sub>ss</sub> = {{frac:R|Cl}}; rearrange it.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Slide "Example 2": the drug from Example 1 (t<sub>&frac12;</sub> = 6 hr, V<sub>D</sub> = 30 L). What rate gives a C<sub>ss</sub> of 20 mg/L?</p>
<ol class="gsteps">
<li>Rate constant: k = {{frac:0.693|6 hr}} = 0.1155 hr<sup>&minus;1</sup>.</li>
<li>Clearance: Cl = 0.1155 hr<sup>&minus;1</sup> &times; 30 L = 3.465 L/hr.</li>
<li>Rate: R = 20 mg/L &times; 3.465 L/hr = 69.3 mg/hr.</li>
<li>Check: {{frac:69.3 mg/hr|3.465 L/hr}} = 20 mg/L, up from the 14.43 mg/L that 50 mg/hr gives by the same division ({{frac:50 mg/hr|3.465 L/hr}} = 14.43 mg/L).</li>
</ol>
<p class="prose">Answer: <b>69.3 mg/hr</b>.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>She gives a target C<sub>ss</sub> and two of the parameters (half-life or k, and V<sub>D</sub> or clearance) and asks what rate to recommend.</li>
<li>Exam 1 review: 24 mg/L, half-life 5 hours, V<sub>D</sub> about 22 L, so R = 24 &times; 0.1386 &times; 22 = 73.18 mg/hr, which she gives as about 73 mg/hr.</li>
<li>The word "recommend" means round to a number a pump could take.</li>
<li>With a solution concentration in the stem, a parallel part asks the rate in volume: 0.35 mL/min in Practice 1, and 1.32 mL/hr from 125 mg/mL vials in Practice 2.</li>
<li>The distractor she flags is that a different rate reaches steady state sooner. It does not, because that time depends only on the half-life.</li>
<li>While working Example 2 aloud she called the 30 L the clearance. 30 L is V<sub>D</sub>; k &times; 30 L gives the clearance, 3.465 L/hr.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>changing the rate changes our steady state concentration</q> (09-02; she said she repeated it five times on purpose)</li>
</ul>

<p class="gsrc">Sources: 3IntravenousInfusions.pdf, slides "Drug Concentration at Steady-State" and "Example 2"; RecapExam1.pdf; IV-Infusions-Practice-1-Solutions.pdf, part e; IV-Infusions-Practice-2-Solutions.pdf, part a; transcripts 09-02 and 09-09.</p>
</section>

<section class="gobj" id="gobj-m3-7">
<h3 data-nav="Module 3, objective 7 &mdash; Determine the plasma concentration given pharmacokinetic parameters at any time">Module 3 - Objective 7</h3>
<div class="gbar"><span>Objective</span><b>Determine the plasma concentration given pharmacokinetic parameters at any time</b><i>3IntravenousInfusions.pdf, slides "Drug Concentration after an IV Infusion has Ended", "Example 5", "Example 6"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>The plasma concentration (C<sub>p</sub>) follows a different equation in each phase: while the infusion runs it rises, and after it stops it falls.</li>
<li>After cessation no more drug goes in; it is only elimination, so C<sub>p</sub> decays by first order from the concentration at the moment the infusion stopped (C<sub>peak</sub>).</li>
<li>C<sub>peak</sub> equals the steady-state concentration (C<sub>ss</sub>) only if the infusion ran long enough to reach steady state. Otherwise, compute C<sub>peak</sub> first from the during-infusion equation.</li>
<li>When a time is a whole number of half-lives, count halves instead of evaluating the exponential; she shows both routes.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Cessation</dt><dd>Stopping the continuous IV infusion.</dd>
<dt>Peak concentration (C<sub>peak</sub>, C<sub>pk</sub>)</dt><dd>C<sub>p</sub> at the moment the infusion stops; it may or may not be C<sub>ss</sub>; mg/L.</dd>
<dt>Steady-state concentration (C<sub>ss</sub>)</dt><dd>mg/L.</dd>
<dt>Elimination rate constant (k), clearance (Cl), infusion rate (R)</dt><dd>hr<sup>&minus;1</sup>, L/hr and mg/hr.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">During the infusion: C<sub>p</sub> = {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>)</div>
<ul class="tlist">
<li>t is the time since the infusion started (hr). Put t = infusion length to get C<sub>peak</sub>.</li>
<li>On the equation sheet: yes.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">After the infusion: C<sub>p</sub> = C<sub>peak</sub> e<sup>&minus;kt</sup></div>
<ul class="tlist">
<li>t is the time since cessation (hr). C<sub>peak</sub> plays the part of C<sub>0</sub>, the starting concentration, in the IV bolus equation.</li>
<li>Plotted as ln C<sub>p</sub> against time, it is a straight falling line from the peak.</li>
<li>On the equation sheet: yes, as the first-order line C = C<sub>0</sub>e<sup>&minus;kt</sup>.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Slide "Example 6": 150 mg infused over 6 hours; k = 0.231 hr<sup>&minus;1</sup>, V<sub>D</sub> (apparent volume of distribution) = 15 L. Find C<sub>p</sub> 3 hours after cessation.</p>
<ol class="gsteps">
<li>Rate: R = {{frac:150 mg|6 hr}} = 25 mg/hr.</li>
<li>Clearance and plateau: Cl = 0.231 &times; 15 L = 3.465 L/hr, so C<sub>ss</sub> = {{frac:25 mg/hr|3.465 L/hr}} = 7.215 mg/L.</li>
<li>Half-life: {{frac:0.693|0.231 hr<sup>&minus;1</sup>}} = 3 hr, so 6 hours of infusion is two half-lives and steady state was not reached.</li>
<li>C<sub>peak</sub> = 7.215 &times; (1 &minus; e<sup>&minus;(0.231)(6)</sup>) = 7.215 &times; 0.7499 = 5.41 mg/L, which is 75% of C<sub>ss</sub>.</li>
<li>Decay for 3 hours, one half-life: C<sub>p</sub> = 5.41 &times; e<sup>&minus;(0.231)(3)</sup> = 5.41 &times; 0.5 = 2.71 mg/L.</li>
</ol>
<p class="prose">Answer: <b>2.7 mg/L</b>, her stated value.</p>
<p class="prose">Slide "Example 5": C<sub>ss</sub> = 15 mg/L, half-life 5 hr. C<sub>p</sub> 12 hours after cessation?</p>
<ol class="gsteps">
<li>The infusion reached steady state, so C<sub>peak</sub> = 15 mg/L, and k = {{frac:0.693|5 hr}} = 0.1386 hr<sup>&minus;1</sup>.</li>
<li>C<sub>p</sub> = 15 mg/L &times; e<sup>&minus;(0.1386)(12)</sup> = 15 &times; 0.1895 = 2.84 mg/L.</li>
<li>In class she changed 12 hours to 10, exactly two half-lives, and took 0.25 &times; 15 mg/L = 3.75 mg/L.</li>
</ol>
<p class="prose">Answer: <b>2.84 mg/L</b> at 12 hours. The slide's 3.75 mg/L is the answer for 10 hours, while the question asks for 12 hours.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>Her stems ask for the concentration "X hours after the cessation of the infusion" and state in brackets whether a loading dose was given.</li>
<li>The key decision is the starting point: decay from C<sub>ss</sub> if the infusion ran to steady state, or from a computed end-of-infusion value if it ran for a stated shorter time.</li>
<li>Two adjacent parts of one practice set often differ only in that respect, so read the infusion length in each.</li>
<li>Exam 1 review: an infusion aimed at a C<sub>ss</sub> of 24 mg/L, stopped after 5 hours with a 5-hour half-life (k = {{frac:0.693|5 hr}} = 0.1386 hr<sup>&minus;1</sup>).</li>
<li>So C<sub>peak</sub> is half of 24 mg/L, 12 mg/L; 3 hours later it is 12 &times; e<sup>&minus;(0.1386)(3)</sup> = 7.9 mg/L.</li>
<li>In that review a student started from 18 mg/L and she corrected it to 12 mg/L; one half-life of infusion reaches 50% of C<sub>ss</sub>, not 75%.</li>
<li>Practice 4 part f (half-life 6 hr, k = 0.1155 hr<sup>&minus;1</sup>) decays from a C<sub>ss</sub> of 10 mg/L: 8.91 mg/L at 1 hour (10 &times; e<sup>&minus;0.1155</sup>).</li>
<li>Then 5 and 2.5 mg/L at 6 and 12 hours after cessation, one and two half-lives.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>Think of that C peak as your C0 as your starting point.</q> (09-02)</li>
</ul>

<p class="gsrc">Sources: 3IntravenousInfusions.pdf, slides "Drug Concentration Prior to Reaching Steady-State", "Drug Concentration after an IV Infusion has Ended", "Example 5" and "Example 6"; RecapExam1.pdf; IV-Infusions-Practice-4-Solutions.pdf, part f; transcripts 09-02 and 09-09.</p>
</section>

<h2>Module 4 - Drug Elimination and Clearance</h2>
<ul class="tlist">
<li>Five objectives, printed on slide 2 of 4---Clearance-and-Elimination.pdf and lectured on 14 September.</li>
<li>How drug leaves the body.</li>
<li>How the kidney handles it.</li>
<li>How to estimate a patient's renal function.</li>
<li>How to split clearance between kidney and liver.</li>
</ul>

<section class="gobj" id="gobj-m4-1">
<h3 data-nav="Module 4, objective 1 &mdash; Describe the main routes of drug elimination from the body &ndash; renal and hepatic">Module 4 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Describe the main routes of drug elimination from the body &ndash; renal and hepatic</b><i>4---Clearance-and-Elimination.pdf slides 3, 8, 11, 24</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Elimination is the irreversible removal of drug from the body, by every route at once. Drug that moves into tissue and later comes back has only been distributed, not eliminated.</li>
<li>There are two ways out. Excretion removes the drug intact, without changing it chemically. Biotransformation (drug metabolism) first converts the drug chemically into a metabolite.</li>
<li>Biotransformation most often produces a compound that the body can eliminate more readily than the parent drug.</li>
<li>The kidney and the liver are the two major elimination organs. The kidney excretes drug into the urine, and the liver biotransforms it.</li>
<li>Each route has its own clearance (the volume of plasma cleared of drug per unit time), and the two add up to the total body clearance. That sum is how the two routes appear in every calculation in this module.</li>
<li class="tbk"><b>From the textbook.</b> Clearance is the fixed volume of body fluid cleared of drug per unit time. With a clearance of 15 mL/min and a V<sub>D</sub> of 12 L, 15 mL of the 12 L is cleared of drug each minute.</li>
<li class="tbk"><b>From the textbook.</b> Clearances add: total body clearance is renal clearance plus non-renal clearance, whatever the non-renal part consists of (liver or other).</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Elimination</dt><dd>Irreversible removal of drug from the body by all routes; it covers both excretion and biotransformation.</dd>
<dt>Excretion</dt><dd>Removal of intact drug (or metabolite) from the body with no chemical change at that step; mainly by the kidney.</dd>
<dt>Biotransformation (metabolism)</dt><dd>Chemical conversion of the drug in the body to a metabolite; mainly in the liver.</dd>
<dt>Total body clearance (Cl<sub>T</sub>)</dt><dd>Clearance by all routes together, in L/hr. A Cl written with no subscript means total body clearance.</dd>
<dt>Renal clearance (Cl<sub>R</sub>)</dt><dd>The part of total clearance done by the kidney, in L/hr.</dd>
<dt>Hepatic clearance (Cl<sub>H</sub>)</dt><dd>The part done by the liver, also called metabolic clearance, in L/hr.</dd>
<dt>Fraction excreted unchanged (f<sub>e</sub>)</dt><dd>The fraction of the dose recovered unchanged in the urine; it has no units.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub></div>
<ul class="tlist">
<li>Cl<sub>T</sub> is total body clearance, Cl<sub>R</sub> renal clearance and Cl<sub>H</sub> hepatic clearance, all in the same units (L/hr).</li>
<li>When to use it: whenever two of the three clearances are known and the third is asked, or when separate renal and metabolic clearances are given and the total is needed.</li>
<li>On the equation sheet: yes, page 1, right column.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Cl<sub>H</sub> = Cl<sub>T</sub> &minus; Cl<sub>R</sub> &nbsp; or &nbsp; Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>) &times; Cl<sub>T</sub></div>
<ul class="tlist">
<li>f<sub>e</sub> is the fraction excreted unchanged (no units), so 1 &minus; f<sub>e</sub> is the share of clearance that is not renal. The two forms give the same answer.</li>
<li>When to use it: to get hepatic clearance. The rate and extent of metabolism can rarely be measured directly, and the liver is not sampled, so hepatic clearance is found by difference.</li>
<li>On the equation sheet: yes, both forms.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">A drug has a total body clearance of 1.3 L/hr, and 0.6 of the dose is excreted unchanged in the urine. Find its hepatic clearance using the fraction excreted.</p>
<ol class="gsteps">
<li>Find the share of clearance that is not renal: 1 &minus; f<sub>e</sub> = 1 &minus; 0.6 = 0.4</li>
<li>Apply that share to total clearance: Cl<sub>H</sub> = (0.4)(1.3 L/hr) = 0.52 L/hr</li>
<li>Check by subtraction: Cl<sub>R</sub> = (0.6)(1.3 L/hr) = 0.78 L/hr, and 1.3 L/hr &minus; 0.78 L/hr = 0.52 L/hr</li>
</ol>
<p class="prose">Hepatic clearance = <b>0.52 L/hr</b>.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>As vocabulary, the way Module 1 terms are asked: a definition in the stem and four related words as options, such as elimination, excretion, biotransformation and distribution.</li>
<li>The deciding features are whether removal is irreversible (distribution is not) and whether the drug is chemically changed (biotransformation) or removed intact (excretion).</li>
<li>A usual trap swaps the organs, putting excretion in the liver and biotransformation in the kidney.</li>
<li>Numerically, the two routes return as the two terms of the additive clearance question in objective 5, where hepatic clearance is whatever is left after renal clearance is subtracted.</li>
<li>Her 09-14 attendance poll was a definition question on clearance, the volume of fluid removed of drug per unit time; only its debrief was recorded.</li>
</ul>

<p class="gsrc">Sources: 4---Clearance-and-Elimination.pdf slides 3, 8, 11, 24; transcript 09-14; drill items m4-rou-1, m4-rou-2, m4-rou-3, m4-n-clh2.</p>
<p class="gsrc">Textbook: Shargel 8e Chapter 15, printout pp. 3 and 13.</p>
</section>

<section class="gobj" id="gobj-m4-2">
<h3 data-nav="Module 4, objective 2 &mdash; Define glomerular filtration, tubular secretion, and tubular reabsorption">Module 4 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Define glomerular filtration, tubular secretion, and tubular reabsorption</b><i>4---Clearance-and-Elimination.pdf slides 12, 13, 18, 19, 24</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>The amount of drug that ends up in the urine is the net result of three processes in the kidney's nephron: filtration, secretion and reabsorption.</li>
<li>Glomerular filtration: drug passes from the blood across the glomerulus into the tubule by passive diffusion, which needs no energy. In normal kidneys it averages 120 mL/min.</li>
<li>Active tubular secretion: a transporter uses energy to move drug from the blood into the urine, so it removes drug on top of what filtration removes.</li>
<li>Tubular reabsorption: some drug moves from the urine in the tubule back into the blood, so it takes away from what was removed.</li>
<li>Because of this, a drug's renal clearance (Cl<sub>R</sub>) compared with 120 mL/min tells you which processes are at work.</li>
<li class="tbk"><b>From the textbook.</b> Only unbound drug is filtered. The amount filtered each minute is the unbound plasma concentration times GFR; drug bound to plasma protein stays in the blood.</li>
<li class="tbk"><b>From the textbook.</b> The reference is inulin, which is filtered only. A clearance ratio below 1 points to partial reabsorption, 1 to filtration only, and above 1 to active secretion.</li>
<li class="tbk"><b>From the textbook.</b> Secretion uses a transporter, so at high concentrations it saturates and renal clearance falls toward the filtration rate.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Glomerular filtration rate (GFR)</dt><dd>The rate at which the glomerulus filters fluid from the blood; average 120 mL/min.</dd>
<dt>Tubular lumen</dt><dd>The fluid space inside the kidney tubule. Filtration and secretion add drug to it; reabsorption moves drug from it back to the bloodstream.</dd>
<dt>Passive diffusion</dt><dd>Movement of drug down its concentration gradient with no energy used; this is how filtration works.</dd>
<dt>Active (process)</dt><dd>One that requires energy and a transporter; secretion is active.</dd>
<dt>Renal clearance (Cl<sub>R</sub>)</dt><dd>The volume removed of drug per unit time through the kidney; in mL/min when compared with GFR.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">Cl<sub>R</sub> = filtration + secretion &minus; reabsorption</div>
<ul class="tlist">
<li>Each term is that process's contribution to renal clearance, in mL/min. Filtration and secretion add drug to the urine; reabsorption subtracts it.</li>
<li>Above 120 mL/min: secretion is adding to filtration. Below 120 mL/min: some drug is being reabsorbed. About 120 mL/min: filtration alone.</li>
<li>When to use it: whenever a stem gives a renal clearance and asks for the mechanism. Convert the clearance to mL/min first if it is given in L/hr.</li>
<li>On the equation sheet: no. It is a reasoning rule, and the sheet carries no line for the three processes.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">A drug has a total body clearance of 52.95 mL/min per 70 kg and a renal clearance of 34.72 mL/min per 70 kg. What is the probable mechanism of its renal clearance?</p>
<ol class="gsteps">
<li>Pick the number the question is about. The mechanism is read from renal clearance only, so set total clearance aside: Cl<sub>R</sub> = 34.72 mL/min</li>
<li>Check the units match the reference: both are in mL/min, so no conversion is needed.</li>
<li>Compare with filtration alone: 34.72 mL/min &lt; 120 mL/min</li>
<li>The kidney removes less drug than filtration alone would, so some filtered drug must be returning to the blood.</li>
</ol>
<p class="prose">Mechanism: <b>glomerular filtration with tubular reabsorption</b>. Her own example in the other direction: a renal clearance of 350 mL/min means filtration plus active secretion.</p>

<h4>Picture it</h4>
{{fig:renal_handling|How the kidney handles a drug: filtration and secretion carry drug into the tubule, reabsorption carries it back, and the net rate is what reaches the urine.}}
<ul class="tlist"><li>Read the three arrows, then the sum at the bottom. A renal clearance above 120 mL/min needs the secretion arrow; one below it needs the reabsorption arrow.</li></ul>

<h4>How she tests it</h4>
<ul class="tlist">
<li>The stem gives a renal clearance and the answer is the process, with 120 mL/min as the reference on both sides. The item tests direction, not arithmetic.</li>
<li>She allows a margin: a value within a unit or two of 120 (119 or 121) counts as filtration, while 250 or her 350 mL/min counts as secretion.</li>
<li>Usual trap: reading a value below 120 as reduced filtration. Within this rule, a value below the filtration rate points to drug returning to the blood.</li>
<li>Second trap: comparing a renal clearance in L/hr with 120 mL/min without converting.</li>
<li>It also turns up as the last part of a longer problem: her Module 6 practice set ends by asking the probable mechanism of renal clearance from a renal clearance of 34.72 mL/min per 70 kg.</li>
<li>In class she has students reason out the above-120 and below-120 conclusions before she shows the slides that state them.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li>The margin she allows around 120 mL/min, stated as a rule: <q>I'm saying 120. If it's 119, 121 let's call that filtration. If it's 250, then let's assume that we've got some active secretion going on.</q> (09-14)</li>
</ul>

<p class="gsrc">Sources: 4---Clearance-and-Elimination.pdf slides 12, 13, 18, 19, 24; transcript 09-14; drill items m4-rm-5, m4-rm-6, m6-p1i (Multiple-IV-Bolus-Practice-1 question 1i).</p>
<p class="gsrc">Textbook: Shargel 8e Chapter 15, printout p. 15 (Table 15-2).</p>
</section>

<section class="gobj" id="gobj-m4-3">
<h3 data-nav="Module 4, objective 3 &mdash; Calculate creatinine clearance and discuss significance">Module 4 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Calculate creatinine clearance and discuss significance</b><i>4---Clearance-and-Elimination.pdf slides 14&ndash;17, 25</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>The glomerular filtration rate (GFR) tells you how well a patient's kidneys are working.</li>
<li>It is measured with a substance eliminated primarily by filtration only (passing from the blood across the glomerulus into the kidney tubule).</li>
<li>That substance is neither reabsorbed (moved from the tubule back into the blood) nor secreted (actively moved from the blood into the urine).</li>
<li>Inulin is almost completely filtered, so it is the better marker. It is not native to the body, though: it has to be given, and the testing is a more involved process.</li>
<li>Creatinine comes from the breakdown of muscle and is already in the blood, so creatinine clearance (CrCl) is the common clinical estimate of GFR. Creatinine is also secreted, which is why CrCl estimates GFR rather than measuring it.</li>
<li>CrCl is calculated with the Cockcroft-Gault equation, and 120&ndash;130 mL/min is considered normal.</li>
<li>A low CrCl means reduced renal function, so a drug eliminated by the kidney is excreted more slowly and may accumulate. Depending on the drug, its dose may need adjusting.</li>
<li>CrCl describes the patient's kidneys, not a particular drug. A drug's renal clearance, worked out in objective 5 from f<sub>e</sub> (the fraction of the dose excreted unchanged in the urine), is a different number.</li>
<li class="tbk"><b>From the textbook.</b> Creatinine clearance estimated by the Cockcroft and Gault method stands in for GFR, and clinicians adjust doses to it.</li>
<li class="tbk"><b>From the textbook.</b> Renal clearance combines the three kidney processes: filtration and secretion put drug into the urine, reabsorption takes it back.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Glomerular filtration rate (GFR)</dt><dd>The rate of filtration by the kidneys; average 120 mL/min.</dd>
<dt>Creatinine clearance (CrCl)</dt><dd>An estimate of GFR, and so of the patient's renal function; reported in mL/min.</dd>
<dt>Serum creatinine (S<sub>Cr</sub>)</dt><dd>The creatinine concentration in the blood, given in mg/dL.</dd>
<dt>Ideal body weight (IBW)</dt><dd>A weight in kg calculated from sex and height; the weight used in Cockcroft-Gault in this course.</dd>
<dt>Inulin</dt><dd>A GFR marker that is almost completely filtered but must be administered.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">CrCl = {{frac:(140 &minus; age) &times; IBW|72 &times; S<sub>Cr</sub>}} &nbsp; (&times; 0.85 if female)</div>
<ul class="tlist">
<li>age in years; IBW is ideal body weight in kg; S<sub>Cr</sub> is serum creatinine in mg/dL; the result is reported in mL/min.</li>
<li>A higher age makes (140 &minus; age) smaller, so an older patient gets a lower estimate. A higher S<sub>Cr</sub> sits in the bottom of the fraction, so it also lowers the estimate.</li>
<li>The 0.85 factor rests on the assumption that women are smaller and less muscular than men.</li>
<li>Serum creatinine may not reflect renal function well in people with unusually low or unusually high muscle mass.</li>
<li>Units: the algebra gives kg divided by mg/dL, and the units do not cancel. She still requires the answer in mL/min.</li>
<li>When to use it: to estimate a patient's renal function from age, sex, height and serum creatinine.</li>
<li>On the equation sheet: no. She said to know it from memory.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">IBW (male) = 50 + 2.3 &times; (inches over 5 ft)</div>
<div class="geqline">IBW (female) = 45.5 + 2.3 &times; (inches over 5 ft)</div>
<ul class="tlist">
<li>IBW is in kg. "Inches over 5 ft" is the height in inches minus 60.</li>
<li>When to use it: every time you need the IBW for Cockcroft-Gault. In this course every patient is 5 ft or taller and IBW is always the weight used, so there is no actual-or-adjusted weight decision.</li>
<li>On the equation sheet: no. She said to know it from memory.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">height in inches = {{frac:height in cm|2.54}}</div>
<ul class="tlist">
<li>1 inch = 2.54 cm. A decimal height is read as written: 64.5 inches is 64.5 inches, not 64 inches plus another 5.</li>
<li>When to use it: when the height is given in centimetres. She expects you to convert in both directions.</li>
<li>On the equation sheet: no.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Estimate (using the ideal body weight) the CrCl of a 45-year-old female who weighs 61 kg, S<sub>Cr</sub> = 1.1 mg/dL, and is 165 cm tall.</p>
<ol class="gsteps">
<li>Convert the height to inches: {{frac:165 cm|2.54}} = 64.96 inches, which she rounds to 65 inches</li>
<li>Find the inches over 5 ft (60 inches): 65 &minus; 60 = 5 inches</li>
<li>Use the female IBW: IBW = 45.5 + 2.3 &times; 5 = 45.5 + 11.5 = 57 kg. The 61 kg actual weight is not used.</li>
<li>Work the top of the fraction: (140 &minus; 45) &times; 57 = 95 &times; 57 = 5415</li>
<li>Work the bottom: 72 &times; 1.1 = 79.2</li>
<li>Divide: {{frac:5415|79.2}} = 68.37</li>
<li>Apply the female factor: 68.37 &times; 0.85 = 58.1 mL/min</li>
</ol>
<p class="prose">CrCl = <b>58.1 mL/min</b> (she called it "58-ish"). That is below the normal 120&ndash;130 mL/min, so her renal function is reduced, and depending on the drug the dose may need adjusting.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>A one-patient vignette giving age, sex, height, actual body weight and serum creatinine, with the answer in mL/min.</li>
<li>The height usually arrives in centimetres, so the conversion is part of the question. The actual weight is there to be left alone.</li>
<li>Sex decides two things: which IBW constant is used (50 or 45.5) and whether the 0.85 factor applies.</li>
<li>When she worked this example in class, students reported 104 and 54 mL/min; she said 54 meant something had been done wrong.</li>
<li>A second part asks what the number means, read against 120&ndash;130 mL/min. For example, a CrCl of 30 mL/min means a renally eliminated drug will be excreted more slowly and may accumulate.</li>
<li>Trap she names herself: confusing a drug's renal clearance with the patient's creatinine clearance. Read what each question is asking.</li>
<li>She also asks which relationships must come from memory: Cockcroft-Gault and the IBW formulas. She said the same calculation appears on the benchmark.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li>Why it has to be known without the sheet: <q>this is an equation that I want you to know, to memorize. I've given you the equation sheet, this one is not there. You need to know this one</q> (09-14)</li>
<li>The units she will mark: <q>I also want you to recognize that the units of creatinine clearance should be in milliliters per minute So don't give me kilograms per milligram per deciliter. Milliliters per minute.</q> (09-14)</li>
</ul>

<p class="gsrc">Sources: 4---Clearance-and-Elimination.pdf slides 14, 15, 16, 17, 25; transcript 09-14; drill items m4-cr-1, m4-cr-2, m4-cr-4, m4-cr-6, m4-n-inches, m4-n-ibwf, m4-n-crcl; reference.js (equations not on the sheet); tell.js (renal against creatinine clearance).</p>
<p class="gsrc">Textbook: Shargel 8e Chapter 15, printout p. 11.</p>
</section>

<section class="gobj" id="gobj-m4-4">
<h3 data-nav="Module 4, objective 4 &mdash; Discuss the effect of degree of ionization on the renal excretion of drugs">Module 4 - Objective 4</h3>
<div class="gbar"><span>Objective</span><b>Discuss the effect of degree of ionization on the renal excretion of drugs</b><i>4---Clearance-and-Elimination.pdf slides 20, 25</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>After drug is filtered into the tubule, some of it can cross back into the blood (tubular reabsorption).</li>
<li>For weak acids and weak bases, how much crosses back depends on the pH of the urine and on the drug's pK<sub>a</sub>.</li>
<li>pK<sub>a</sub> is a property of the drug that, together with the pH, fixes how much of it is ionized.</li>
<li>A weak acid or weak base exists in two forms at once: ionized and nonionized. Only the nonionized form crosses membranes, so only that form is reabsorbed.</li>
<li>The urine pH, compared with the drug's pK<sub>a</sub>, sets how the drug splits between the two forms. This split is the degree of ionization.</li>
<li>A weak acid is more ionized in alkaline urine; a weak base is more ionized in acidic urine.</li>
<li>More ionized drug stays in the tubule, so less is reabsorbed and renal clearance rises. Filtration itself is passive and does not depend on urine pH.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Ionized form</dt><dd>The form that does not cross membranes, so it stays in the urine.</dd>
<dt>Nonionized form</dt><dd>The form that crosses membranes and can be reabsorbed.</dd>
<dt>Degree of ionization</dt><dd>How the drug is split between the ionized and nonionized forms at a given pH.</dd>
<dt>pK<sub>a</sub></dt><dd>A property of the drug that, together with the pH, fixes its degree of ionization. Weak acids have pK<sub>a</sub> values of 3 to 8; weak bases, 7.5 to 10.5.</dd>
<dt>Urine pH</dt><dd>The pH of the fluid in the renal tubule.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">Weak acid: &nbsp; pH = pK<sub>a</sub> + log {{frac:ionized|nonionized}}</div>
<div class="geqline">Weak base: &nbsp; pH = pK<sub>a</sub> + log {{frac:nonionized|ionized}}</div>
<ul class="tlist">
<li>pH is the pH of the tubular fluid; pK<sub>a</sub> is the drug's; "ionized" and "nonionized" are the amounts of drug in each form, so their ratio has no units.</li>
<li>The two forms differ only in which way up the ratio is written: ionized on top for a weak acid, nonionized on top for a weak base.</li>
<li>When to use it: to work out the degree of ionization at the tubular pH, and from it whether reabsorption will be high or low.</li>
<li>The pK<sub>a</sub> ranges overlap between 7.5 and 8, so a pK<sub>a</sub> alone does not always settle whether the drug is treated as an acid or a base.</li>
<li>On the equation sheet: no. Neither form is among the lines the sheet carries.</li>
</ul>
</div>

<h4>How she tests it</h4>
<ul class="tlist">
<li>The 09-14 recording ends while she is introducing this slide, so there is no spoken answer, worked example, poll or practice problem on it in any source.</li>
<li>She posed two open questions to the room: what effect pH has on filtration, and what effect it has on active secretion. Neither was answered before the recording ended.</li>
<li>The objective is printed on both the objectives slide and the summary slide, so it can still be examined; the format is unknown.</li>
<li>The drill asks it as recall: the two factors that govern reabsorption (urine pH and the drug's pK<sub>a</sub>). Trap options swap in plasma pH or the filtration rate.</li>
<li>The drill also asks the pK<sub>a</sub> ranges. The usual trap swaps them, putting weak bases at 3 to 8.</li>
</ul>

<p class="gsrc">Sources: 4---Clearance-and-Elimination.pdf slide 20 (PDF page 22) and slide 25; transcript 09-14 (recording ends on this slide); drill items m4-io-1, m4-io-2.</p>
</section>

<section class="gobj" id="gobj-m4-5">
<h3 data-nav="Module 4, objective 5 &mdash; Calculate total, renal and hepatic clearance">Module 4 - Objective 5</h3>
<div class="gbar"><span>Objective</span><b>Calculate total, renal and hepatic clearance</b><i>4---Clearance-and-Elimination.pdf slides 4&ndash;11, 21&ndash;23, 25</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Clearance (Cl) is the volume of fluid cleared of drug per unit time, so its units are a volume per time, such as L/hr or mL/min. It can describe the whole body or one organ without naming the individual processes.</li>
<li>For a first-order drug, clearance is a constant. The rate of elimination, an amount per time, equals clearance times the plasma concentration, so the rate falls as the concentration falls while clearance stays the same.</li>
<li>Total clearance comes from the elimination rate constant and the volume of distribution, or from the dose and the area under the curve.</li>
<li>Collecting urine gives the fraction of the dose excreted unchanged (f<sub>e</sub>). Renal clearance is that fraction of total clearance, and hepatic clearance is the rest.</li>
<li>Clearance, half-life and volume are linked: if the volume stays the same and clearance falls, as in renal failure, the half-life gets longer.</li>
<li class="tbk"><b>From the textbook.</b> As the concentration falls, the rate of elimination in mg/hr falls with it, but clearance stays constant as long as elimination is first order.</li>
<li class="tbk"><b>From the textbook.</b> Renal clearance is the urinary excretion rate divided by the plasma concentration, and Cl<sub>R</sub> = f<sub>e</sub> &times; Cl<sub>T</sub>.</li>
<li class="tbk"><b>From the textbook.</b> Two drugs filtered at the same GFR of 125 mL/min have the same clearance, but the one with half the volume (10 L against 20 L) has half the half-life: 55.44 against 110.88 minutes.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Total body clearance (Cl<sub>T</sub>, or Cl with no subscript)</dt><dd>Clearance by all routes, in L/hr.</dd>
<dt>Rate of elimination</dt><dd>The amount of drug removed per unit time, such as mcg/min or mg/hr.</dd>
<dt>Plasma concentration (C<sub>p</sub>)</dt><dd>Drug concentration in plasma, in mg/L or mcg/mL; 1 mg/L equals 1 mcg/mL.</dd>
<dt>Elimination rate constant (k)</dt><dd>The overall first-order rate constant for all routes, in hr<sup>&minus;1</sup>.</dd>
<dt>Excretion rate constant (k<sub>e</sub>)</dt><dd>The part of k due to urinary excretion of unchanged drug, in hr<sup>&minus;1</sup>.</dd>
<dt>Volume of distribution (V<sub>D</sub>)</dt><dd>The apparent volume the drug distributes into, in L.</dd>
<dt>Half-life (t&frac12;)</dt><dd>The time for the concentration to fall by half, in hr or min.</dd>
<dt>Dose (D<sub>0</sub>) and bioavailability factor (F)</dt><dd>D<sub>0</sub> in mg; F has no units and is taken as 1 for an IV dose.</dd>
<dt>Area under the curve (AUC)</dt><dd>Area under the plasma concentration&ndash;time curve, in mg&middot;hr/L.</dd>
<dt>Cumulative urinary amount (D<sub>u</sub><sup>&infin;</sup>)</dt><dd>Total unchanged drug that appears in the urine after dosing, in mg.</dd>
<dt>Fraction excreted unchanged (f<sub>e</sub>)</dt><dd>D<sub>u</sub><sup>&infin;</sup> as a fraction of the dose; no units.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">Rate of elimination = Cl &times; C<sub>p</sub></div>
<ul class="tlist">
<li>Cl in volume per time; C<sub>p</sub> in amount per volume; the volumes cancel and the rate comes out as amount per time.</li>
<li>When to use it: the elimination rate at a stated concentration. Her example: (15 mL/min)(5 mcg/mL) = 75 mcg/min.</li>
<li>On the equation sheet: yes.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Cl<sub>T</sub> = {{frac:F &times; D<sub>0</sub>|AUC}}</div>
<ul class="tlist">
<li>F has no units (1 for IV); D<sub>0</sub> in mg; AUC in mg&middot;hr/L; Cl<sub>T</sub> comes out in L/hr.</li>
<li>When to use it: total clearance from a dose and an AUC, or a dose from a clearance and an AUC.</li>
<li>On the equation sheet: yes.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Cl<sub>T</sub> = k &times; V<sub>D</sub></div>
<ul class="tlist">
<li>k in hr<sup>&minus;1</sup>, V<sub>D</sub> in L, so Cl<sub>T</sub> is in L/hr.</li>
<li>When to use it: total clearance when the half-life (or k) and the volume are given.</li>
<li>On the equation sheet: no. She said to know it from memory.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">f<sub>e</sub> = {{frac:D<sub>u</sub><sup>&infin;</sup>|F &times; D<sub>0</sub>}} = {{frac:k<sub>e</sub>|k}}, &nbsp; so &nbsp; k<sub>e</sub> = f<sub>e</sub> &times; k</div>
<ul class="tlist">
<li>D<sub>u</sub><sup>&infin;</sup> and D<sub>0</sub> in mg, so f<sub>e</sub> has no units; k<sub>e</sub> and k in hr<sup>&minus;1</sup>.</li>
<li>When to use it: f<sub>e</sub> from a urine recovery, then k<sub>e</sub> from f<sub>e</sub> and k. Lower-case f<sub>e</sub> is not capital F.</li>
<li>On the equation sheet: yes.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Cl<sub>R</sub> = f<sub>e</sub> &times; Cl<sub>T</sub></div>
<div class="geqline">Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>) &times; Cl<sub>T</sub> = Cl<sub>T</sub> &minus; Cl<sub>R</sub></div>
<ul class="tlist">
<li>All clearances in L/hr; f<sub>e</sub> has no units.</li>
<li>When to use it: splitting a total clearance into its renal and hepatic parts once f<sub>e</sub> is known.</li>
<li>On the equation sheet: yes, all three forms.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">t&frac12; = {{frac:0.693|k}} &nbsp; and &nbsp; t&frac12; = {{frac:0.693 &times; V<sub>D</sub>|Cl<sub>T</sub>}}</div>
<ul class="tlist">
<li>The second form comes from putting Cl<sub>T</sub> = k &times; V<sub>D</sub> into the first. V<sub>D</sub> and Cl<sub>T</sub> must share a volume unit; t&frac12; then takes the time unit of Cl<sub>T</sub>.</li>
<li>When to use it: k from a half-life, or a half-life from a clearance and a volume, including the new half-life when clearance falls and V<sub>D</sub> does not.</li>
<li>On the equation sheet: no. The only half-life line on the sheet is the nonlinear one, so build these from Cl<sub>T</sub> = k &times; V<sub>D</sub> and t&frac12; = {{frac:0.693|k}}.</li>
</ul>
</div>

<h4>Worked example</h4>
<ul class="tlist">
<li>Five hundred mg of a drug was administered by rapid IV injection.</li>
<li>The V<sub>D</sub> is 15 L and the elimination half-life is 8 hours.</li>
<li>Urine samples were collected for 48 hours and 300 mg of unchanged drug was recovered.</li>
<li>Find f<sub>e</sub>, k, k<sub>e</sub>, Cl<sub>T</sub>, Cl<sub>R</sub> and Cl<sub>H</sub>.</li>
</ul>
<ol class="gsteps">
<li>Fraction excreted unchanged, with F = 1 for an IV dose: f<sub>e</sub> = {{frac:300 mg|500 mg}} = 0.6, with no units</li>
<li>Elimination rate constant from the half-life: k = {{frac:0.693|8 hr}} = 0.0866 hr<sup>&minus;1</sup></li>
<li>Excretion rate constant: k<sub>e</sub> = f<sub>e</sub> &times; k = (0.6)(0.0866 hr<sup>&minus;1</sup>) = 0.052 hr<sup>&minus;1</sup></li>
<li>Total clearance: Cl<sub>T</sub> = k &times; V<sub>D</sub> = (0.0866 hr<sup>&minus;1</sup>)(15 L) = 1.3 L/hr</li>
<li>Renal clearance: Cl<sub>R</sub> = f<sub>e</sub> &times; Cl<sub>T</sub> = (0.6)(1.3 L/hr) = 0.78 L/hr</li>
<li>Hepatic clearance by difference: Cl<sub>H</sub> = 1.3 L/hr &minus; 0.78 L/hr = 0.52 L/hr</li>
</ol>
<p class="prose">Answers: <b>f<sub>e</sub> = 0.6; k = 0.0866 hr<sup>&minus;1</sup>; k<sub>e</sub> = 0.052 hr<sup>&minus;1</sup>; Cl<sub>T</sub> = 1.3 L/hr; Cl<sub>R</sub> = 0.78 L/hr; Cl<sub>H</sub> = 0.52 L/hr</b>. The 48-hour collection time is not used.</p>
<ul class="tlist">
<li>A second example sets the half-life against clearance.</li>
<li>A new antibiotic is actively secreted by the kidney; V<sub>D</sub> is 25 L.</li>
<li>Its clearance is 750 mL/min, falling to 150 mL/min in partial renal failure.</li>
<li>She gave no answer in class; the working is below.</li>
</ul>
<ol class="gsteps">
<li>Put clearance in litres so it matches V<sub>D</sub>: 750 mL/min = 0.75 L/min</li>
<li>Usual half-life: t&frac12; = {{frac:0.693 &times; 25 L|0.75 L/min}} = 23.1 min</li>
<li>In renal failure, V<sub>D</sub> stays 25 L and clearance is 0.15 L/min: t&frac12; = {{frac:0.693 &times; 25 L|0.15 L/min}} = 115.5 min</li>
</ol>
<p class="prose">Half-life: <b>23.1 min normally, 115.5 min in partial renal failure</b>. Clearance fell to one fifth, so the half-life became five times longer.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>One stem with a dose, a V<sub>D</sub>, a half-life and a urine recovery, followed by a list of terms to calculate: f<sub>e</sub>, k, k<sub>e</sub>, Cl<sub>T</sub>, Cl<sub>R</sub> and Cl<sub>H</sub>.</li>
<li>f<sub>e</sub> is asked first because every later term uses it. The urine collection time is given but only the cumulative amount and the dose are used.</li>
<li>Traps: giving f<sub>e</sub> units, or putting the urinary fraction in place of capital F. On an IV problem F is 1 whatever the urine shows.</li>
<li>Another trap is a true/false item claiming clearance rises as concentration rises. A change in concentration changes the elimination rate, not the clearance.</li>
<li>Unit changes are part of the question: 15 mL/min is 0.9 L/hr, and with 5 mcg/mL (5 mg/L) the rate is 4.5 mg/hr.</li>
<li>Separate clearances may be given to be added, as in her Module 3 practice: renal and metabolic clearances of 5 and 6.55 L/hr.</li>
<li>The half-life form is asked as a before-and-after, a normal clearance and then a reduced one, with V<sub>D</sub> held constant so only the half-life changes.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li>The two F's, which she separates as a rule: <q>lowercase fe is our fraction excreted, capital F is our bioavailability factor</q> (09-14)</li>
<li>Her question on the fraction's units: <q>What are the units of FE? No units</q> (09-14)</li>
</ul>

<p class="gsrc">Sources: 4---Clearance-and-Elimination.pdf slides 4&ndash;11, 21, 22 (taught after slide 11), 23, 25; transcript 09-14; drill items m4-n-pen1, m4-n-pen3, m4-n-fe, m4-n-k, m4-n-ke, m4-n-clt, m4-n-clr, m4-n-clh, m4-n-ab1, m4-n-ab2.</p>
<p class="gsrc">Also reference.js (equation sheet); tell.js (clearance against rate); STYLE.md (Module 3 practice).</p>
<p class="gsrc">Textbook: Shargel 8e Chapter 15, printout pp. 3, 13 and 17.</p>
</section>

<h2>Module 5 - Single Oral Administration</h2>
<ul class="tlist">
<li>Four objectives, from the "Objectives" slide of the oral absorption deck.</li>
<li>Until this module every input was either instantaneous (IV bolus) or zero order (IV infusion).</li>
<li>Here the input becomes first order.</li>
</ul>

<section class="gobj" id="gobj-m5-1">
<h3 data-nav="Module 5, objective 1 &mdash; Describe the kinetics of a drug following extravascular administration">Module 5 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Describe the kinetics of a drug following extravascular administration</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slides "IV Bolus vs. Oral Administration" through "Example of a concentration-time profile"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Extravascular means the dose is given outside the blood vessels. In this course that means by mouth (oral), so the drug has to be absorbed before it reaches the blood.</li>
<li>An IV bolus puts all the drug in at once, and an IV infusion puts it in at a constant (zero-order) rate.</li>
<li>An oral dose goes in by a first-order process instead: first order in, first order out.</li>
<li>In first-order absorption the rate of absorption is proportional to the amount of drug still in the gut, so a fixed fraction is absorbed per unit time.</li>
<li>Because the drug enters gradually while it is also being eliminated, the plasma curve starts at zero, rises to a clear peak and then falls. That peaked shape is how you recognise oral input.</li>
<li>Before it reaches the body the tablet has to disintegrate, dissolve, cross membranes and pass through the liver. All of those steps are rolled into one absorption rate constant, k<sub>a</sub>.</li>
<li>Usually only part of the dose arrives, because some of it is eliminated before it becomes available. The fraction that arrives is F; for an IV dose F is taken as 1.</li>
<li class="tbk"><b>From the textbook.</b> At the peak the rate of absorption equals the rate of elimination. After t<sub>max</sub> elimination outpaces absorption even though drug remains at the site; once the site is empty only elimination is left.</li>
<li class="tbk"><b>From the textbook.</b> Absorption often does not start at once, because of dissolution, stomach emptying and gut motility. The delay before it begins is the lag time.</li>
<li class="tbk"><b>From the textbook.</b> Absorption turns zero order when a transporter saturates, so a drug can be first order at low doses and zero order at high ones.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Extravascular administration</dt><dd>Given outside the vascular system; here, oral. Intravascular means IV bolus or IV infusion.</dd>
<dt>D<sub>GI</sub></dt><dd>Amount of drug still in the gastrointestinal tract waiting to be absorbed (mg).</dd>
<dt>D<sub>B</sub></dt><dd>Amount of drug in the body (mg), spread through the volume of distribution V<sub>D</sub>, the volume that relates the amount in the body to the plasma concentration (L).</dd>
<dt>D<sub>E</sub></dt><dd>Amount of drug already eliminated (mg).</dd>
<dt>Absorption rate constant (k<sub>a</sub>)</dt><dd>First-order rate constant for drug moving from the gut into the body (hr<sup>&minus;1</sup>).</dd>
<dt>Elimination rate constant (k)</dt><dd>First-order rate constant for drug leaving the body (hr<sup>&minus;1</sup>).</dd>
<dt>Bioavailability (F)</dt><dd>Fraction of the oral dose that reaches the body and is available to act; between 0 and 1, no units.</dd>
<dt>Absorption half-life (t&frac12;<sub>a</sub>)</dt><dd>Time for half of the drug still to be absorbed to be absorbed (hr).</dd>
<dt>Absorption phase</dt><dd>The rising part of the curve: more drug is going in than coming out.</dd>
<dt>Peak (C<sub>max</sub> at t<sub>max</sub>)</dt><dd>The top of the curve, where the rate in equals the rate out.</dd>
<dt>Post-absorption phase</dt><dd>Just after the peak: elimination is now faster than absorption, although some drug is still being absorbed.</dd>
<dt>Elimination phase</dt><dd>All the drug has been absorbed, so only elimination is left.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">{{frac:dD<sub>B</sub>|dt}} = {{frac:dD<sub>GI</sub>|dt}} &minus; {{frac:dD<sub>E</sub>|dt}}</div>
<ul class="tlist">
<li>The change in the amount in the body (mg/hr) is the rate of absorption from the gut (rate in) minus the rate of elimination (rate out).</li>
<li>When to use it: to explain the curve in words. Rate in is larger while the curve rises, the two are equal at the peak, and rate out is larger after it.</li>
<li>On the equation sheet: no.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">t&frac12;<sub>a</sub> = {{frac:0.693|k<sub>a</sub>}}</div>
<ul class="tlist">
<li>t&frac12;<sub>a</sub> is the absorption half-life (hr) and k<sub>a</sub> the absorption rate constant (hr<sup>&minus;1</sup>).</li>
<li>When to use it: stems usually give the absorption half-life, and you turn it into k<sub>a</sub> before using any oral equation.</li>
<li>On the equation sheet: no. It is the first-order half-life relation, which she expects you to know without the sheet.</li>
</ul>
</div>

<h4>How she tests it</h4>
<ul class="tlist">
<li>She shows a curve and asks for the route. A clear peak (up, peak, back down) means oral input, first order in and first order out.</li>
<li>Compare the other two shapes: an IV bolus profile starts at its highest point and falls, and an IV infusion profile starts at zero and levels off to a plateau.</li>
<li>A capital F among the given parameters is the cue that the route is oral and that this first-order absorption model applies.</li>
<li>Know why the summary slide says oral input is "usually" first order: a modified-release product that releases drug at a zero-order rate gives a curve shaped like an IV infusion.</li>
<li>She taught the three phases aloud from the students' copies of a slide missing from her deck, so her spoken description (rate in versus rate out) is the one to learn.</li>
<li>Her 09-21 attendance poll repeated an earlier question whose stem is not in the captions; 36% chose first-order input, and she did not state the correct option. No written practice question tests this objective alone.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>when you see a capital F, You should think oral.</q></li>
</ul>

<p class="gsrc">Sources: 5---Pharmacokinetics-of-Oral-Absorption.pdf, slides "IV Bolus vs. Oral Administration", "Drug in the Body", "Kinetics of Absorption", "First-Order Absorption Model", "Example of a concentration-time profile following extravascular administration", "Summary"; equation sheet; lecture transcript 09-21.</p>
<p class="gsrc">Textbook: Shargel 8e Chapter 16, printout pp. 3, 5 and 6.</p>
</section>

<section class="gobj" id="gobj-m5-2">
<h3 data-nav="Module 5, objective 2 &mdash; Calculate plasma drug concentration following extravascular administration of a single dose">Module 5 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Calculate plasma drug concentration following extravascular administration of a single dose</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Concentration of Drug in Plasma Following a Single Oral Dose"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>One equation gives the plasma concentration (C<sub>p</sub>) at any time after a single oral dose, as long as you know F, the dose, V<sub>D</sub>, k<sub>a</sub> and k.</li>
<li>F is the fraction of the dose absorbed, V<sub>D</sub> the volume of distribution, k<sub>a</sub> the absorption rate constant and k the elimination rate constant.</li>
<li>Inside the bracket, e<sup>&minus;kt</sup> is drug going out, and the bracket as a whole is drug in minus drug out.</li>
<li>At time zero the bracket is e<sup>0</sup> &minus; e<sup>0</sup> = 0, so the oral curve starts at zero concentration and has to rise.</li>
<li>The fraction in front is not C<sub>0</sub> (a starting concentration). It lumps F, the dose, k<sub>a</sub>, V<sub>D</sub> and the difference of the rate constants into one number.</li>
<li>In her problems the equation often arrives with that fraction already worked out, for example C<sub>p</sub> = 75e<sup>&minus;0.22t</sup> &minus; 75e<sup>&minus;2.75t</sup>, and you work backwards to a parameter hidden inside it.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Plasma concentration (C<sub>p</sub>)</dt><dd>Drug concentration in plasma at time t (mg/L, which is numerically the same as mcg/mL).</dd>
<dt>Dose (D<sub>0</sub>)</dt><dd>The single oral dose given (mg).</dd>
<dt>Bioavailability (F)</dt><dd>Fraction of the oral dose that reaches the body; a stem's percent (84%) is used as a decimal (0.84).</dd>
<dt>Volume of distribution (V<sub>D</sub>)</dt><dd>Apparent volume the drug in the body is spread through (L).</dd>
<dt>Absorption rate constant (k<sub>a</sub>)</dt><dd>First-order rate constant for absorption (hr<sup>&minus;1</sup>); in this module it is the larger exponent.</dd>
<dt>Elimination rate constant (k)</dt><dd>First-order rate constant for elimination (hr<sup>&minus;1</sup>); the smaller exponent.</dd>
<dt>Leading number (P)</dt><dd>The single number in front of the exponentials in a given equation, such as 75 or 23.2 (mg/L). It equals the whole fraction in front.</dd>
<dt>Half-life (t&frac12;)</dt><dd>With no qualifier, the elimination half-life (hr).</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">C<sub>p</sub> = {{frac:F k<sub>a</sub> D<sub>0</sub>|V<sub>D</sub> (k<sub>a</sub> &minus; k)}} &times; (e<sup>&minus;kt</sup> &minus; e<sup>&minus;k<sub>a</sub>t</sup>)</div>
<ul class="tlist">
<li>C<sub>p</sub> in mg/L; F no units; k<sub>a</sub> and k in hr<sup>&minus;1</sup>; D<sub>0</sub> in mg; V<sub>D</sub> in L; t in hr after the dose.</li>
<li>When to use it: a single oral dose, one compartment, first-order absorption and first-order elimination. Use it for C<sub>p</sub> at a stated time, and for C<sub>max</sub> once t<sub>max</sub> is known.</li>
<li>On the equation sheet: yes, page 1.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">V<sub>D</sub> = {{frac:F k<sub>a</sub> D<sub>0</sub>|P (k<sub>a</sub> &minus; k)}}</div>
<ul class="tlist">
<li>P is the leading number of the given equation (mg/L); the other symbols are as above, and V<sub>D</sub> comes out in L.</li>
<li>When to use it: the equation is given already evaluated, together with F and the dose, and the question asks for V<sub>D</sub>.</li>
<li>On the equation sheet: not as its own line. It is the page 1 C<sub>p</sub> equation with its fraction set equal to P and rearranged.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">t&frac12; = {{frac:0.693|k}}</div>
<ul class="tlist">
<li>t&frac12; is the elimination half-life (hr) and k the elimination rate constant (hr<sup>&minus;1</sup>), read from the smaller exponent.</li>
<li>When to use it: whenever a question asks for "the half-life" with no qualifier.</li>
<li>On the equation sheet: no. She says this one is never on the sheet and must be memorised.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">In-class practice 2: a 750-mg oral dose, 84% bioavailable, gives C<sub>p</sub> = 23.2(e<sup>&minus;0.182t</sup> &minus; e<sup>&minus;0.872t</sup>) in mg/L, with t in hours. Find V<sub>D</sub> and the half-life of elimination.</p>
<ol class="gsteps">
<li>Read the rate constants off the exponents. The larger is k<sub>a</sub> = 0.872 hr<sup>&minus;1</sup>, and the smaller is k = 0.182 hr<sup>&minus;1</sup>.</li>
<li>Set the leading number equal to the fraction: 23.2 mg/L = {{frac:(0.84)(750 mg)(0.872 hr<sup>&minus;1</sup>)|V<sub>D</sub> (0.872 &minus; 0.182) hr<sup>&minus;1</sup>}}</li>
<li>Rearrange so V<sub>D</sub> stands alone: V<sub>D</sub> = {{frac:(0.84)(750 mg)(0.872 hr<sup>&minus;1</sup>)|(23.2 mg/L)(0.690 hr<sup>&minus;1</sup>)}} = {{frac:549.36|16.008}} L</li>
<li>Divide: V<sub>D</sub> = 34.32 L, which she reports as <b>34.3 L</b>.</li>
<li>"Half-life" with no qualifier means elimination, so use k: t&frac12; = {{frac:0.693|0.182 hr<sup>&minus;1</sup>}} = <b>3.8 hr</b>.</li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>She gives the full two-exponential equation with the fraction already worked out, then asks for something inside it, most often V<sub>D</sub>, with F and the dose supplied.</li>
<li>Slide "Example 2" works the same way: C<sub>p</sub> = 75e<sup>&minus;0.22t</sup> &minus; 75e<sup>&minus;2.75t</sup>, a 500-mg dose at 87% bioavailability, and her answer is a V<sub>D</sub> of 6.3 (she spoke no unit; the arithmetic gives litres).</li>
<li>She expects you to pick the larger exponent as k<sub>a</sub> without being told which is which.</li>
<li>Units are fixed in a sentence of the stem, such as "Assume units of mcg/mL for C<sub>p</sub> and hr for time", rather than on the numbers.</li>
<li>Usual traps: reading the leading number as C<sub>0</sub>, leaving out V<sub>D</sub>, and losing the (k<sub>a</sub> &minus; k) term when rearranging.</li>
<li>On the calculator she enters the whole expression in one pass: numerator, divided by V<sub>D</sub>, divided by (k<sub>a</sub> &minus; k) in parentheses, times the bracket of two exponentials.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>this big portion right here does not represent C0</q></li>
<li><q>If it's just T1/2, then your assumption is that I'm looking for the half-life of elimination</q></li>
</ul>

<p class="gsrc">Sources: 5---Pharmacokinetics-of-Oral-Absorption.pdf, slides "Concentration of Drug in Plasma Following a Single Oral Dose", "Example 2", "In-Class Practice", "Summary"; equation sheet page 1; lecture transcript 09-21; question bank m5-n09, m5-n15, m5-n16.</p>
</section>

<section class="gobj" id="gobj-m5-3">
<h3 data-nav="Module 5, objective 3 &mdash; Calculate peak plasma concentration and the time to peak following extravascular administration of a single dose">Module 5 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Calculate peak plasma concentration and the time to peak following extravascular administration of a single dose</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slide "Cp vs. Time for a Single Oral Dose"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>t<sub>max</sub> is the time after the dose at which the plasma concentration is highest, and C<sub>max</sub> is that highest concentration. At the peak the rate in equals the rate out.</li>
<li>t<sub>max</sub> depends only on the two rate constants, k<sub>a</sub> and k. The dose, F and V<sub>D</sub> do not appear, so changing the dose does not move t<sub>max</sub>.</li>
<li>There is no separate C<sub>max</sub> equation for a single oral dose. You find t<sub>max</sub>, then put it in for t in the C<sub>p</sub> equation, which is why t<sub>max</sub> always comes first.</li>
<li>Both equations need rate constants, not half-lives, and both constants in the same time unit, usually hours.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Time to peak (t<sub>max</sub>)</dt><dd>Time from the dose to the maximum plasma concentration (hr).</dd>
<dt>Peak concentration (C<sub>max</sub>)</dt><dd>The maximum plasma concentration after the dose (mg/L).</dd>
<dt>Absorption rate constant (k<sub>a</sub>)</dt><dd>First-order rate constant for absorption (hr<sup>&minus;1</sup>).</dd>
<dt>Elimination rate constant (k)</dt><dd>First-order rate constant for elimination (hr<sup>&minus;1</sup>).</dd>
<dt>Absorption half-life (t&frac12;<sub>a</sub>)</dt><dd>Half-life of the absorption process (hr); often given in minutes.</dd>
<dt>Elimination half-life (t&frac12;)</dt><dd>Half-life of the elimination process (hr).</dd>
<dt>F, D<sub>0</sub>, V<sub>D</sub></dt><dd>Bioavailable fraction (no units), oral dose (mg) and volume of distribution (L).</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">k<sub>a</sub> = {{frac:0.693|t&frac12;<sub>a</sub>}} &nbsp;and&nbsp; k = {{frac:0.693|t&frac12;}}</div>
<ul class="tlist">
<li>Each rate constant (hr<sup>&minus;1</sup>) is 0.693 divided by the half-life of its own process (hr).</li>
<li>When to use it: the stem gives half-lives; convert both before using either equation below.</li>
<li>On the equation sheet: no; first-order half-life relations are hers to know by heart.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">t<sub>max</sub> = {{frac:ln(k<sub>a</sub> &divide; k)|k<sub>a</sub> &minus; k}}</div>
<ul class="tlist">
<li>k<sub>a</sub> and k in hr<sup>&minus;1</sup>; t<sub>max</sub> comes out in hr. The top is the natural log of k<sub>a</sub> divided by k.</li>
<li>When to use it: always, and always before C<sub>max</sub>, even when the question asks only for C<sub>max</sub>.</li>
<li>On the equation sheet: yes, page 1.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>max</sub> = {{frac:F k<sub>a</sub> D<sub>0</sub>|V<sub>D</sub> (k<sub>a</sub> &minus; k)}} &times; (e<sup>&minus;k t<sub>max</sub></sup> &minus; e<sup>&minus;k<sub>a</sub> t<sub>max</sub></sup>)</div>
<ul class="tlist">
<li>This is the C<sub>p</sub> equation with t replaced by t<sub>max</sub>; C<sub>max</sub> comes out in mg/L.</li>
<li>When to use it: after t<sub>max</sub> is found. If the equation is given already evaluated, put t<sub>max</sub> into that instead.</li>
<li>On the equation sheet: only by substitution into the page 1 C<sub>p</sub> equation. The sheet's other C<sub>max</sub> lines contain &tau; (the dosing interval, the time between repeated doses) and belong to multiple dosing.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Slide "Example 1": V<sub>D</sub> = 22 L, absorption half-life 45 minutes, elimination half-life 3 hours, 85% bioavailable, one compartment. What is the peak after a single 500-mg dose, and when does it occur?</p>
<ol class="gsteps">
<li>Put both half-lives in hours: 45 min = 0.75 hr; the elimination half-life is already 3 hr.</li>
<li>Absorption rate constant: k<sub>a</sub> = {{frac:0.693|0.75 hr}} = 0.924 hr<sup>&minus;1</sup></li>
<li>Elimination rate constant: k = {{frac:0.693|3 hr}} = 0.231 hr<sup>&minus;1</sup></li>
<li>Time to peak: t<sub>max</sub> = {{frac:ln(0.924 &divide; 0.231)|(0.924 &minus; 0.231) hr<sup>&minus;1</sup>}} = {{frac:ln 4|0.693 hr<sup>&minus;1</sup>}} = {{frac:1.386|0.693}} hr = <b>2 hr</b></li>
<li>The fraction in front: {{frac:(0.85)(500 mg)(0.924 hr<sup>&minus;1</sup>)|(22 L)(0.693 hr<sup>&minus;1</sup>)}} = {{frac:392.7|15.246}} = 25.76 mg/L</li>
<li>The bracket at t = 2 hr: e<sup>&minus;(0.231)(2)</sup> &minus; e<sup>&minus;(0.924)(2)</sup> = 0.630 &minus; 0.157 = 0.472</li>
<li>Peak: C<sub>max</sub> = (25.76 mg/L)(0.472) = <b>12.17 mg/L</b></li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>Two answers, always in the same order: t<sub>max</sub> first, then C<sub>max</sub> at that time. She often asks only for C<sub>max</sub> and still expects t<sub>max</sub> to be worked out.</li>
<li>The parameters come either as a list (V<sub>D</sub>, two half-lives, a percent F, a dose) or as a finished equation; she wants the same two answers either way.</li>
<li>The absorption half-life is given in minutes (45 min, 90 min) and the elimination half-life in hours, so the first step is converting to hours.</li>
<li>Trap: using a half-life where a rate constant belongs. In practice 1 the 1.5 hr is a half-life, so k<sub>a</sub> = {{frac:0.693|1.5 hr}} = 0.462 hr<sup>&minus;1</sup>.</li>
<li>Trap: leaving V<sub>D</sub> out of the fraction in front.</li>
<li>Her answers: practice 1 (500 mg, F 88%, t&frac12;<sub>a</sub> 90 min, t&frac12; 5 hr, V<sub>D</sub> changed live from 40 L to 20 L) gives t<sub>max</sub> 3.7 hr and C<sub>max</sub> about 13 mg/L.</li>
<li>Practice 2 (C<sub>p</sub> = 23.2(e<sup>&minus;0.182t</sup> &minus; e<sup>&minus;0.872t</sup>) mg/L, so k<sub>a</sub> = 0.872 and k = 0.182 hr<sup>&minus;1</sup>) gives t<sub>max</sub> 2.27 hr and C<sub>max</sub> 12.14 mg/L.</li>
<li>Example 2 (C<sub>p</sub> = 75e<sup>&minus;0.22t</sup> &minus; 75e<sup>&minus;2.75t</sup>, so k<sub>a</sub> = 2.75 and k = 0.22 hr<sup>&minus;1</sup>) gives t<sub>max</sub> 1 hr and C<sub>max</sub> 55.4 mg/L.</li>
<li>Source conflict: for Example 2 she says 55.4 mg/L, which is what 75(e<sup>&minus;0.22</sup> &minus; e<sup>&minus;2.75</sup>) gives at t = 1 hr. The 53.4 mg/L written on the annotated slide does not follow from the equation.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q class="para">If you are asked for Cmax, and I will ask you for Cmax, you must find tmax first. Even if I do not specifically ask you to find tmax, you must find tmax before you can find Cmax.</q></li>
<li><q>Do not forget the volume of distribution.</q></li>
</ul>

<p class="gsrc">Sources: 5---Pharmacokinetics-of-Oral-Absorption.pdf, slides "Cp vs. Time for a Single Oral Dose", "Example 1", "Example 2", "In-Class Practice", "Summary"; equation sheet pages 1 and 2; lecture transcript 09-21; question bank m5-n01 to m5-n04, m5-n07, m5-n08, m5-n11 to m5-n13, m5-n17, m5-n18.</p>
</section>

<section class="gobj" id="gobj-m5-4">
<h3 data-nav="Module 5, objective 4 &mdash; Discuss the effects of changing various parameters on the pharmacokinetics following extravascular administration">Module 5 - Objective 4</h3>
<div class="gbar"><span>Objective</span><b>Discuss the effects of changing various parameters on the pharmacokinetics following extravascular administration</b><i>5---Pharmacokinetics-of-Oral-Absorption.pdf, slides "Changing Dose" through "Significance of Absorption Rate Constants"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>This objective asks what happens to C<sub>max</sub> (the peak concentration), t<sub>max</sub> (the time of the peak) and AUC (area under the curve) when one parameter changes. The answers are directions (up, down, unchanged), not numbers.</li>
<li>Raise the dose: C<sub>max</sub> and AUC rise in proportion, and t<sub>max</sub> stays put. The rates rise because there is more drug, but the rate constants k and k<sub>a</sub> do not change.</li>
<li>Raise k<sub>a</sub> with k unchanged: the drug gets in faster, so C<sub>max</sub> is higher and t<sub>max</sub> earlier. AUC is relatively unchanged because clearance has not changed.</li>
<li>Raise k with k<sub>a</sub> unchanged: the drug leaves faster, so C<sub>max</sub> is lower and t<sub>max</sub> earlier. AUC falls, because changing k changes the clearance.</li>
<li>Two terms say which process is slower. Disposition rate limiting (the usual case) has the shorter absorption half-life; absorption rate limiting has the longer one.</li>
<li class="tbk"><b>From the textbook.</b> Her "textbook table" (dose 100 mg, V 10 L, F 1): with k held at 0.1 hr<sup>&minus;1</sup>, raising k<sub>a</sub> from 0.2 to 0.6 hr<sup>&minus;1</sup> moves t<sub>max</sub> from 6.93 to 3.58 hr and C<sub>max</sub> from 5.00 to 6.99 mcg/mL; AUC stays 100 mcg&middot;hr/mL.</li>
<li class="tbk"><b>From the textbook.</b> With k<sub>a</sub> held at 0.3 hr<sup>&minus;1</sup>, raising k from 0.1 to 0.5 hr<sup>&minus;1</sup> moves t<sub>max</sub> from 5.49 to 2.55 hr, lowers C<sub>max</sub> from 5.77 to 2.79 mcg/mL and cuts AUC from 100 to 20 mcg&middot;hr/mL.</li>
<li class="tbk"><b>From the textbook.</b> In an extended-release product absorption is slower than elimination, so the tail of the curve shows absorption, not elimination (flip-flop). The true k then needs IV data.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Area under the curve (AUC)</dt><dd>Area under the plasma concentration-time curve; it depends on how much drug gets in and how long it stays.</dd>
<dt>Clearance (Cl)</dt><dd>Volume of plasma cleared of drug per unit time (L/hr); Cl = k &times; V<sub>D</sub>.</dd>
<dt>Disposition rate limiting</dt><dd>Absorption half-life much shorter than elimination half-life, so k<sub>a</sub> is much larger than k. The usual case.</dd>
<dt>Absorption rate limiting</dt><dd>Absorption half-life much longer than elimination half-life.</dd>
<dt>Onset of action</dt><dd>The time at which the drug reaches a therapeutic concentration.</dd>
<dt>C<sub>max</sub>, t<sub>max</sub>, k<sub>a</sub>, k</dt><dd>Peak concentration (mg/L), time to peak (hr), absorption and elimination rate constants (hr<sup>&minus;1</sup>).</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">AUC = {{frac:F D<sub>0</sub>|Cl}} &nbsp;with&nbsp; Cl = k &times; V<sub>D</sub></div>
<ul class="tlist">
<li>F no units, D<sub>0</sub> in mg, Cl in L/hr, k in hr<sup>&minus;1</sup>, V<sub>D</sub> in L. k<sub>a</sub> appears in neither line, which is why changing k<sub>a</sub> leaves AUC about the same.</li>
<li>When to use it: to reason out the AUC direction for a change in dose, F or k.</li>
<li>On the equation sheet: yes in the form Cl<sub>T</sub> = {{frac:FD<sub>0</sub>|AUC}} on page 1. Cl = k &times; V<sub>D</sub> is not on the sheet; she expects it known.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">t<sub>max</sub> = {{frac:ln(k<sub>a</sub> &divide; k)|k<sub>a</sub> &minus; k}}</div>
<ul class="tlist">
<li>Only k<sub>a</sub> and k (hr<sup>&minus;1</sup>) appear. There is no dose, F or V<sub>D</sub>, so a dose change cannot move t<sub>max</sub>.</li>
<li>When to use it: to justify any t<sub>max</sub> direction.</li>
<li>On the equation sheet: yes, page 1.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Which rate-limiting case is the antibiotic of slide "Example 2", C<sub>p</sub> = 75e<sup>&minus;0.22t</sup> &minus; 75e<sup>&minus;2.75t</sup>?</p>
<ol class="gsteps">
<li>Read the exponents: k<sub>a</sub> = 2.75 hr<sup>&minus;1</sup> (the larger) and k = 0.22 hr<sup>&minus;1</sup>.</li>
<li>Absorption half-life: t&frac12;<sub>a</sub> = {{frac:0.693|2.75 hr<sup>&minus;1</sup>}} = 0.252 hr</li>
<li>Elimination half-life: t&frac12; = {{frac:0.693|0.22 hr<sup>&minus;1</sup>}} = 3.15 hr</li>
<li>Compare them: {{frac:3.15 hr|0.252 hr}} = 12.5, so absorption is 12.5 times faster.</li>
<li>The absorption half-life is much the shorter, so the drug is <b>disposition rate limiting</b>, the usual case.</li>
</ol>
<ul class="tlist">
<li>A dose change in slide "Example 1": doubling the dose from 500 mg to 1000 mg.</li>
<li>Example 1 gives V<sub>D</sub> 22 L, absorption half-life 45 minutes, elimination half-life 3 hours, 85% bioavailable.</li>
<li>For a single 500-mg dose her t<sub>max</sub> is 2 hr and C<sub>max</sub> 12.17 mg/L, worked in objective 3.</li>
</ul>
<ol class="gsteps">
<li>t<sub>max</sub> uses only k<sub>a</sub> and k, so it stays at <b>2 hr</b>.</li>
<li>The dose sits only in the fraction in front, so C<sub>max</sub> doubles: (12.17 mg/L)({{frac:1000 mg|500 mg}}) = <b>24.34 mg/L</b>. AUC doubles as well.</li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>She posed this aloud on 09-21 and named it as a question she will set: if the dose is increased, what happens to t<sub>max</sub>? Her answer: nothing, because t<sub>max</sub> is independent of dose.</li>
<li>One parameter changes, and she asks about C<sub>max</sub>, t<sub>max</sub> and AUC in that order. In earlier modules the same shape was free response, such as the change in half-life if the dose were doubled.</li>
<li>The rate-limiting question gives two exponents to compare rather than two half-lives. With e<sup>&minus;0.18</sup> against e<sup>&minus;0.87</sup>, absorption is much faster than elimination.</li>
<li>Trap: the AUC result for a change in k<sub>a</sub> cannot be read off the slide figure; it comes from the textbook table. Hold the spoken statement that AUC is relatively unchanged.</li>
<li>She once said "distribution limited" for the usual case; the slide's term, disposition rate limiting, is the one to use.</li>
<li>The figures on the k<sub>a</sub> and k slide hold the dose at 100 mg and V<sub>D</sub> at 10 L, with the unchanged constant at 0.1 hr<sup>&minus;1</sup>; the k values compared are 0.5, 0.3 and 0.2 hr<sup>&minus;1</sup>.</li>
<li>The significance slide lists why k<sub>a</sub>, t<sub>max</sub> and C<sub>max</sub> matter: multiple-dose design (peaks and troughs), bioequivalence, choice of route and dosage form, onset of action, and correlation with effect.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>looking at the curve, you might not be able to really ascertain, but this comes from your textbook, and this is tabulated, and the AUC is relatively unchanged.</q></li>
</ul>

<p class="gsrc">Sources: 5---Pharmacokinetics-of-Oral-Absorption.pdf, slides "Changing Dose", "Effect of ka and k on Cmax, tmax, and AUC", "Absorption Kinetics Terminology", "Significance of Absorption Rate Constants, tmax, and Cmax", "Example 1", "Example 2".</p>
<p class="gsrc">Equation sheet page 1; lecture transcript 09-21; question bank m5-n05, m5-n06, m5-n19, m5-n20, m5-c26.</p>
<p class="gsrc">Textbook: Shargel 8e Chapter 16, printout pp. 17 and 19 (Table 16-2).</p>
</section>

<h2>Module 6 - Multiple Dosings</h2>
<ul class="tlist">
<li>Three objectives, from the "Objectives" slide of the repetitive IV bolus and intermittent IV infusion deck.</li>
<li>Objectives 1 and 2 were lectured on 23 September; objective 3 on 28 September, in the same lecture that began multiple oral doses.</li>
<li>Until now every module gave one dose. This module gives the same dose again and again, as a pharmacist does with TID (three times a day) or BID (twice a day) orders.</li>
<li>It asks what the plasma concentration does as the doses add up.</li>
</ul>

<section class="gobj" id="gobj-m6-1">
<h3 data-nav="Module 6, objective 1 &mdash; Explain the principle of superposition and its assumptions in multiple-dose regimens">Module 6 - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Explain the principle of superposition and its assumptions in multiple-dose regimens</b><i>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Drug accumulation with repeated administration" and "Superposition"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>When the same dose is given at a fixed interval, each new dose is added to what is left of the earlier doses, so the peaks and troughs climb.</li>
<li>The climb stops at a plateau called steady state: every dose then rises to the same peak and falls to the same trough, because the drug eliminated over one interval equals one dose.</li>
<li>Steady state is reached in 3 to 5 half-lives. That time depends on the half-life only, not on the dose, and after the last dose most of the drug is gone in another 3 to 5 half-lives.</li>
<li>Superposition says the concentration at any time is the sum of what is left of every dose given so far, each dose following its own single-dose curve.</li>
<li>It holds under two assumptions: elimination is first order, and the pharmacokinetics after one dose are not altered by later doses, so the half-life and clearance (the volume of plasma cleared of drug per unit time) stay the same.</li>
<li class="tbk"><b>From the textbook.</b> Accumulation happens when the next dose arrives before the last one is completely eliminated. An interval longer than that gives no accumulation.</li>
<li class="tbk"><b>From the textbook.</b> R = {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} depends only on k and &tau;, not on the dose. The time to steady state depends on the half-life alone; the dose sets how high the plateau is.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Dosing interval (&tau;, tau)</dt><dd>The time between doses, in hours. TID (three times a day) is &tau; = 8 hr.</dd>
<dt>Steady state (&infin;)</dt><dd>The plateau where peaks and troughs repeat. A &infin; sign on a symbol means "at steady state".</dd>
<dt>Peak and trough</dt><dd>The highest concentration in an interval (the maximum) and the lowest, just before the next dose (the minimum), in mg/L.</dd>
<dt>First-order kinetics</dt><dd>Elimination at a rate proportional to the amount present, with a constant rate constant k (hr<sup>&minus;1</sup>). Also called linear pharmacokinetics.</dd>
<dt>Half-life (t&frac12;)</dt><dd>The time for the concentration to fall by half, in hours.</dd>
<dt>Area under the curve (AUC)</dt><dd>The area under the concentration&ndash;time curve, in mg&middot;hr/L.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">C = C<sub>0</sub>e<sup>&minus;kt</sup></div>
<ul class="tlist">
<li>C<sub>0</sub> is the concentration just after a dose (mg/L), k the elimination rate constant (hr<sup>&minus;1</sup>), t the time since that dose (hr).</li>
<li>When to use it: superposition means this single-dose decline applies after every dose, at steady state as well as after the first; only the starting value is higher.</li>
<li>On the equation sheet: yes, page 1.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>av</sub><sup>&infin;</sup> = {{frac:[AUC]<sub>t1</sub><sup>t2</sup>|&tau;}}</div>
<ul class="tlist">
<li>[AUC]<sub>t1</sub><sup>t2</sup> is the area under the curve over one dosing interval at steady state (mg&middot;hr/L); &tau; is that interval (hr).</li>
<li>When to use it: to define the average concentration at steady state. The figure marks this one-interval area at steady state beside the AUC from 0 to &infin; of the first dose.</li>
<li>On the equation sheet: no, this AUC form is not printed.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Her Example 1 regimen (questions m6-n01, m6-n02, m6-n06): t&frac12; 4 hr, volume of distribution (V<sub>D</sub>) 0.25 L/kg, 10 mg/kg by IV bolus every 8 hours. What is the peak just after the second dose, and when is steady state reached?</p>
<ol class="gsteps">
<li>Find the peak after the first dose; the kilograms cancel: C<sub>0</sub> = {{frac:10 mg/kg|0.25 L/kg}} = 40 mg/L.</li>
<li>Let the first dose fall for one interval. 8 hours is two half-lives, so it halves twice: 40 &rarr; 20 &rarr; 10 mg/L.</li>
<li>Add the second dose on top of what is left of the first, which is superposition: 40 + 10 = 50 mg/L.</li>
<li>Time to steady state is 3 to 5 half-lives: 3 &times; 4 hr = 12 hr to 5 &times; 4 hr = 20 hr.</li>
</ol>
<p class="prose">Answer: <b>50 mg/L just after the second dose; steady state within 12 to 20 hours</b>.</p>
<ul class="tlist">
<li>At steady state the peak P is the new dose's 40 mg/L plus the trough left from earlier doses.</li>
<li>That trough is one quarter of the previous peak (two half-lives of decline).</li>
<li>So P = 40 + 0.25P, and P = {{frac:40 mg/L|0.75}} = 53.3 mg/L.</li>
<li>The trough is 53.3 &times; 0.25 = 13.3 mg/L.</li>
</ul>

<h4>Picture it</h4>
{{fig:accum_factor|The accumulation factor R against the dosing interval in half-lives: R = 2 when τ equals one half-life, and little accumulation when τ is three half-lives or more.}}
<ul class="tlist"><li>The dose is not on either axis: R depends on k and &tau; only. Doubling the dose doubles every level on the curve but leaves R unchanged.</li></ul>

<h4>How she tests it</h4>
<ul class="tlist">
<li>She asks for the two assumptions: first-order elimination, and pharmacokinetics unchanged by later doses. The second is the one that names half-life and clearance.</li>
<li>She asks how long steady state takes. The answer is 3 to 5 half-lives; "3 to 5 doses" and "it depends on the dose" are the two wrong answers she argues against.</li>
<li>Know that the &infin; sign means steady state, and that "first order" and "linear" mean the same thing in her questions.</li>
<li>No written poll or practice item in the collected sources asks this objective on its own; it underlies every multiple-dose calculation in objectives 2 and 3.</li>
<li>Chapter 9 lists what breaks superposition: changing pathophysiology in the patient, saturation of a drug carrier system, enzyme induction or inhibition, and nonlinear pharmacokinetics in general.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>not 3 to 5 doses, 3 to 5 half-lives, OK? Cause the 2nd bullet, independent of dose</q> (09-23)</li>
<li><q>I'm gonna put this word in your brain right now. First order kinetics equals linear pharmacokinetics.</q> (09-23)</li>
</ul>
<p class="gsrc">Sources: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Drug accumulation with repeated administration" and "Superposition"; 09-23 lecture; Chapter 9, Multiple-Dosage Regimens; questions m6-n01, m6-n02, m6-n06.</p>
<p class="gsrc">Textbook: Shargel 7e Chapter 9, printout pp. 5 and 6.</p>
</section>

<section class="gobj" id="gobj-m6-2">
<h3 data-nav="Module 6, objective 2 &mdash; Predict the concentration of drug in the plasma at any time following multiple IV bolus injections of drug">Module 6 - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Predict the concentration of drug in the plasma at any time following multiple IV bolus injections of drug</b><i>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Amount of Drug in the Body Following Repeated IV Bolus Injections" through "Example 3"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>After one IV bolus, the drug falls by first-order elimination; the fraction still in the body when the next dose is due is e<sup>&minus;k&tau;</sup>.</li>
<li>Here k is the elimination rate constant (hr<sup>&minus;1</sup>) and &tau; the dosing interval, the time between doses (hr).</li>
<li>That leftover is why drug accumulates. At steady state every peak equals the first-dose peak multiplied by an accumulation factor that holds only k and &tau;.</li>
<li>The steady-state trough is one interval of decline after the steady-state peak, so it is at the end of the dosing interval.</li>
<li>The average at steady state is not the midpoint of peak and trough, because the decline is exponential; it comes from the dose, the clearance and the interval.</li>
<li>Before steady state, a dose-number term n tracks how far the climb has gone. After the last dose, the level simply falls from the last peak.</li>
<li class="tbk"><b>From the textbook.</b> 90% of steady state is reached in 3.3 half-lives and 99% in 6.6. The number of doses to 99% is {{frac:6.6 t&frac12;|&tau;}}, which is 6.6 doses when &tau; equals one half-life.</li>
<li class="tbk"><b>From the textbook.</b> For a 4-hour half-life that is about 13 hours to 90% and 26 hours to 99% of steady state.</li>
<li class="tbk"><b>From the textbook.</b> With a narrow therapeutic index, keep &tau; no longer than the half-life. A dose missed more than five half-lives ago can be left out of the sum.</li>
<li class="tbk"><b>From the textbook.</b> The loading dose should equal the amount in the body at steady state. The dose ratio {{frac:D<sub>L</sub>|D<sub>M</sub>}} = {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}, which is 2.0 when &tau; equals the half-life.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Dose (D<sub>0</sub>)</dt><dd>The amount given each time, in mg.</dd>
<dt>Apparent volume of distribution (V<sub>D</sub>)</dt><dd>The volume that relates amount in the body to plasma concentration, in L (or L/kg).</dd>
<dt>First-dose peak (C<sub>0</sub>)</dt><dd>The concentration just after the first IV bolus, D<sub>0</sub> divided by V<sub>D</sub>, in mg/L.</dd>
<dt>Elimination rate constant (k)</dt><dd>The first-order rate constant, in hr<sup>&minus;1</sup>; k = 0.693 divided by the half-life (t&frac12;).</dd>
<dt>Dosing interval (&tau;)</dt><dd>The time between doses, in hr. TID (three times a day) is 8 hr; it is the interval, not the frequency.</dd>
<dt>Steady state (&infin;)</dt><dd>The plateau; C<sub>max</sub><sup>&infin;</sup>, C<sub>min</sub><sup>&infin;</sup> and C<sub>avg</sub><sup>&infin;</sup> are its peak, trough and average, in mg/L.</dd>
<dt>Bioavailability (F)</dt><dd>The fraction of the dose that reaches the circulation; F = 1 for IV dosing.</dd>
<dt>Total clearance (Cl<sub>T</sub>)</dt><dd>The volume of plasma cleared of drug per unit time, in L/hr; it equals V<sub>D</sub> times k.</dd>
<dt>Dose number (n)</dt><dd>The number of the dose just given, before steady state.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">D<sub>B</sub> = D<sub>0</sub>e<sup>&minus;k&tau;</sup></div>
<ul class="tlist">
<li>D<sub>B</sub> is the amount still in the body (mg) one interval &tau; after a dose D<sub>0</sub> (mg).</li>
<li>When to use it: to see what fraction of a dose is left when the next one is given; that fraction is what accumulates.</li>
<li>On the equation sheet: not with &tau; written in; D = D<sub>0</sub>e<sup>&minus;kt</sup> on page 1 is the same line with t = &tau;.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Accumulation factor: r = {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}</div>
<ul class="tlist">
<li>k in hr<sup>&minus;1</sup> and &tau; in hr, so k&tau; has no units. r is the steady-state peak divided by the first-dose peak.</li>
<li>When to use it: inside every steady-state peak and trough below. It does not depend on the dose, and a shorter interval makes it larger.</li>
<li>On the equation sheet: it appears inside the C<sub>max</sub><sup>&infin;</sup>, C<sub>min</sub><sup>&infin;</sup> and n-dose lines of the multiple-dosing group.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>max</sub><sup>&infin;</sup> = C<sub>0</sub> &times; r = {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}, &nbsp; with C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}</div>
<ul class="tlist">
<li>C<sub>0</sub> is the first-dose peak (mg/L); the result is the steady-state peak (mg/L).</li>
<li>When to use it: the maximum concentration at steady state. It must come out higher than C<sub>0</sub>.</li>
<li>On the equation sheet: yes, in the multiple-dosing group.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>min</sub><sup>&infin;</sup> = C<sub>max</sub><sup>&infin;</sup>e<sup>&minus;k&tau;</sup> = {{frac:C<sub>0</sub>e<sup>&minus;k&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}}</div>
<ul class="tlist">
<li>Same symbols; the result is the steady-state trough (mg/L), at the end of the interval.</li>
<li>When to use it: the minimum at steady state. Her route is the left form: start at C<sub>max</sub><sup>&infin;</sup> and apply C = C<sub>0</sub>e<sup>&minus;kt</sup> with t = &tau;.</li>
<li>On the equation sheet: yes, in the multiple-dosing group.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|V<sub>D</sub>k&tau;}} = {{frac:FD<sub>0</sub>|Cl<sub>T</sub>&tau;}}</div>
<ul class="tlist">
<li>F is bioavailability (1 for IV), D<sub>0</sub> the dose (mg), V<sub>D</sub> in L, k in hr<sup>&minus;1</sup>, Cl<sub>T</sub> in L/hr, &tau; in hr; the result is in mg/L.</li>
<li>When to use it: the average concentration at steady state. No exponential and no accumulation factor are needed.</li>
<li>On the equation sheet: the V<sub>D</sub>k&tau; form, yes, page 1; the Cl<sub>T</sub>&tau; form is not printed.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">D<sub>max</sub><sup>&infin;</sup> = {{frac:D<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}} &nbsp; D<sub>min</sub><sup>&infin;</sup> = {{frac:D<sub>0</sub>e<sup>&minus;k&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}} &nbsp; D<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|k&tau;}}</div>
<ul class="tlist">
<li>The same three results as amounts in the body (mg). Dividing any of them by V<sub>D</sub> gives the matching concentration.</li>
<li>When to use it: when the question asks for an amount, such as the average amount of drug in the body at steady state.</li>
<li>On the equation sheet: D<sub>max</sub><sup>&infin;</sup> and D<sub>avg</sub><sup>&infin;</sup>, yes.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">After n doses: C<sub>p</sub> = (first-dose part) &times; (build-up after n doses) &times; (decay since dose n)</div>
<div class="geqline">first-dose part = {{frac:D<sub>0</sub>|V<sub>D</sub>}}</div>
<div class="geqline">build-up after n doses = {{frac:1 &minus; e<sup>&minus;nk&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}}</div>
<div class="geqline">decay since dose n = e<sup>&minus;kt</sup></div>
<ul class="tlist">
<li>n is the dose number just given; t is the time since that dose (hr), not since the first dose.</li>
<li>When to use it: a concentration a stated time after the n-th dose, before steady state.</li>
<li>As n grows, e<sup>&minus;nk&tau;</sup> falls towards 0, the build-up term becomes the accumulation factor r, and this becomes the steady-state line below.</li>
<li>On the equation sheet: yes, in the multiple-dosing group.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">At steady state: C<sub>p</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}} &times; r &times; e<sup>&minus;kt</sup> = C<sub>max</sub><sup>&infin;</sup>e<sup>&minus;kt</sup></div>
<ul class="tlist">
<li>r is the accumulation factor above; t is the time since the most recent dose (hr).</li>
<li>When to use it: any time within a steady-state interval, and any time after the last dose, when the level just falls from C<sub>max</sub><sup>&infin;</sup>.</li>
<li>On the equation sheet: no; the n-dose line becomes it as n grows.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Her Example 1 (questions m6-n03 to m6-n05): an antibiotic with t&frac12; about 4 hr and V<sub>D</sub> 25% of body weight, 10 mg/kg every 8 hours by IV bolus to a 65-kg female. Find the maximum, minimum and average at steady state.</p>
<ol class="gsteps">
<li>Put dose and volume on the same basis; with 1 L taken as 1 kg of body weight, 25% of body weight is 0.25 L/kg. C<sub>0</sub> = {{frac:10 mg/kg|0.25 L/kg}} = 40 mg/L. For 65 kg, 10 &times; 65 = 650 mg and 0.25 &times; 65 = 16.25 L, and {{frac:650 mg|16.25 L}} gives the same.</li>
<li>Get k from the half-life: k = {{frac:0.693|4 hr}} = 0.1733 hr<sup>&minus;1</sup>.</li>
<li>Work out the exponent and the fraction left after one interval: k&tau; = 0.1733 &times; 8 = 1.386, so e<sup>&minus;1.386</sup> = 0.25.</li>
<li>Steady-state peak: C<sub>max</sub><sup>&infin;</sup> = {{frac:40 mg/L|1 &minus; 0.25}} = {{frac:40 mg/L|0.75}} = 53.3 mg/L.</li>
<li>Steady-state trough, one interval later: C<sub>min</sub><sup>&infin;</sup> = 53.3 mg/L &times; 0.25 = 13.3 mg/L.</li>
<li>Average, with F = 1 for IV: C<sub>avg</sub><sup>&infin;</sup> = {{frac:40 mg/L|1.386}} = 28.9 mg/L.</li>
</ol>
<p class="prose">Answer: <b>C<sub>max</sub><sup>&infin;</sup> = 53.3 mg/L, C<sub>min</sub><sup>&infin;</sup> = 13.3 mg/L, C<sub>avg</sub><sup>&infin;</sup> = 28.9 mg/L</b>. The average sits below the midpoint of peak and trough, 33.3 mg/L.</p>
<p class="prose">Her Example 2 (question m6-n06), same regimen: the concentration 3 hours after the 2nd dose.</p>
<ol class="gsteps">
<li>Two doses is not steady state, so use the n-dose line with n = 2 and t = 3 hr; the first-dose part is 40 mg/L.</li>
<li>Build-up after 2 doses: {{frac:1 &minus; e<sup>&minus;2(1.386)</sup>|1 &minus; e<sup>&minus;1.386</sup>}} = {{frac:1 &minus; 0.0625|1 &minus; 0.25}} = 1.25, so the peak after dose 2 is 40 &times; 1.25 = 50 mg/L.</li>
<li>Decay for 3 hours: e<sup>&minus;(0.1733)(3)</sup> = e<sup>&minus;0.520</sup> = 0.595.</li>
<li>Multiply the parts: C<sub>p</sub> = 40 mg/L &times; 1.25 &times; 0.595 = 29.7 mg/L.</li>
</ol>
<p class="prose">Answer: <b>29.7 mg/L</b>.</p>

<h4>Picture it</h4>
{{fig:halflife_ladder|The half-life ladder: the bottom panel shows how close to steady state a regimen is after each half-life, with 90% at 3.3 and 99% at 6.6 half-lives.}}
<ul class="tlist"><li>Count half-lives, not doses: with &tau; = t&frac12; the regimen is at 90% of steady state after the fourth dose and at 99% after about the seventh.</li></ul>

<h4>How she tests it</h4>
<ul class="tlist">
<li>One patient vignette asked in parts: first-dose peak, first-dose trough, steady-state maximum, minimum and average, then a time before steady state and a time after the last dose.</li>
<li>Dose and volume come per kilogram, or scaled from a per-70-kg or per-100-kg value, so the first step is putting both on the same basis.</li>
<li>Frequency is given as TID (three times a day) or BID (twice a day); convert it to the interval &tau; (TID is 8 hr) before using any equation.</li>
<li>Her check on the steady-state peak: it must be above the first-dose peak (40 mg/L in Example 1). A smaller value means the accumulation factor was multiplied in the wrong direction.</li>
<li>The trough, and any time after the last dose, are C = C<sub>0</sub>e<sup>&minus;kt</sup> started from the steady-state peak. She prefers this route to searching the sheet for the matching line.</li>
<li>In the n-dose line, n is the dose number and t the hours since that dose; in Example 2, n = 2 and t = 3.</li>
<li>Multiple-IV-Bolus-Practice-1 runs the same battery on 1 g every 8 hours to a 65-kg patient. Keyed: t&frac12; 4 hr, first-dose C<sub>max</sub> 58.72 and C<sub>min</sub> 14.69 mg/L.</li>
<li>Its keyed steady-state values: C<sub>max</sub><sup>&infin;</sup> 78.31, C<sub>min</sub><sup>&infin;</sup> 19.59, C<sub>avg</sub><sup>&infin;</sup> 42.37 mg/L and D<sub>avg</sub><sup>&infin;</sup> 721.61 mg; also 9.799 mg/L 12 hours after the last dose.</li>
<li>That practice set also asks the renal mechanism (Module 4, objective 2); its key gives glomerular filtration (drug passing from the blood into the kidney tubule) with tubular reabsorption (some of it returning from the tubule to the blood).</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>I want you to realize that the average is not the max plus the min divided by 2</q> (09-23)</li>
<li><q>Bolus dosing, IV dosing, this F is equal to 1. Right? For for IV dosing. For oral, you will have given, provided, or we will calculate a bioavailability factor.</q> (09-23)</li>
</ul>
<p class="gsrc">Sources: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Amount of Drug in the Body Following Repeated IV Bolus Injections", "Amount of Drug in the Body at Steady-State Following Repeated IV Bolus Injections".</p>
<p class="gsrc">Also the slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections".</p>
<p class="gsrc">Same deck, slides "Example 1", "Plasma Drug Concentration at Any Time After n Doses", "Example 2", "Plasma Drug Concentration at Steady State" and "Example 3". Also the 09-23 lecture; Multiple-IV-Bolus-Practice-1 and its key; questions m6-n03 to m6-n06.</p>
<p class="gsrc">Textbook: Shargel 7e Chapter 9, printout pp. 7, 8, 14, 20 and 22.</p>
</section>

<section class="gobj" id="gobj-m6-3">
<h3 data-nav="Module 6, objective 3 &mdash; Predict the concentration of drug in the plasma at any time following multiple IV infusions of drug">Module 6 - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Predict the concentration of drug in the plasma at any time following multiple IV infusions of drug</b><i>6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Intermittent Intravenous Infusions" through "Summary"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>An intermittent IV infusion gives each dose slowly over a set time instead of all at once, which prevents high concentrations and the side effects that go with them.</li>
<li>No new equation is needed. During each infusion the level rises by the single-infusion equation from Module 3; when it stops, the level falls by first-order elimination (a fixed fraction of the drug present is removed per unit time).</li>
<li>The same drug at the same rate for the same duration reaches the same end-of-infusion concentration every time, and that value is the starting point for the fall.</li>
<li>Because elimination is first order, the contributions of separate infusions add (superposition), so the concentration at a later time is the sum of what is left of each one.</li>
<li class="tbk"><b>From the textbook.</b> The same accumulation factor {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} multiplies the single-infusion peak to give the steady-state peak after repeated infusions.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Infusion rate (R)</dt><dd>The dose divided by the infusion time, in mg/hr. A constant-rate input is zero order.</dd>
<dt>Elimination rate constant (k)</dt><dd>The first-order rate constant, in hr<sup>&minus;1</sup>; k = 0.693 divided by the half-life (t&frac12;).</dd>
<dt>Apparent volume of distribution (V<sub>D</sub>)</dt><dd>In L; V<sub>D</sub> times k is the clearance.</dd>
<dt>Clearance (Cl)</dt><dd>The volume of plasma cleared of drug per unit time, in L/hr.</dd>
<dt>End-of-infusion concentration (C<sub>end</sub>)</dt><dd>The plasma concentration at the moment an infusion stops, in mg/L; it is the C<sub>0</sub> for the decline that follows.</dd>
<dt>Steady-state concentration (C<sub>ss</sub>)</dt><dd>The plateau a continuous infusion at rate R would reach, in mg/L. Short infusions stop well below it.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">R = {{frac:dose|infusion time}}</div>
<ul class="tlist">
<li>Dose in mg, infusion time in hr, R in mg/hr.</li>
<li>When to use it: always first, because the stem gives a dose and a duration while the infusion equation needs a rate.</li>
<li>On the equation sheet: the sources do not list it; it is the definition of a rate.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">During an infusion: C<sub>p</sub> = {{frac:R|V<sub>D</sub>k}} (1 &minus; e<sup>&minus;kt</sup>)</div>
<ul class="tlist">
<li>R in mg/hr, V<sub>D</sub>k is the clearance in L/hr, so {{frac:R|V<sub>D</sub>k}} is in mg/L; t is the time the pump has run (hr).</li>
<li>When to use it: the concentration at the end of an infusion, with t = the infusion time (2 hr in Example 4), never the 6-hour spacing.</li>
<li>On the equation sheet: yes, as the infusion line.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">After an infusion stops: C = C<sub>end</sub>e<sup>&minus;kt</sup></div>
<ul class="tlist">
<li>C<sub>end</sub> is the end-of-infusion concentration (mg/L); t is the time since that infusion ended (hr), not since it started.</li>
<li>When to use it: once per infusion, each with its own t; then add the results.</li>
<li>On the equation sheet: yes, as C = C<sub>0</sub>e<sup>&minus;kt</sup>, page 1.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Two infusions: C = C<sub>end</sub>e<sup>&minus;kt<sub>1</sub></sup> + C<sub>end</sub>e<sup>&minus;kt<sub>2</sub></sup></div>
<ul class="tlist">
<li>t<sub>1</sub> is the time since the first infusion ended and t<sub>2</sub> the time since the second ended (hr).</li>
<li>When to use it: a concentration after both infusions have stopped. Draw a number line of start and stop times first.</li>
<li>On the equation sheet: not as one line; it is the page-1 decay line used once for each infusion.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">C<sub>ss</sub> = {{frac:R|Cl}}</div>
<ul class="tlist">
<li>R in mg/hr, Cl in L/hr, C<sub>ss</sub> in mg/L.</li>
<li>When to use it: only for the concentration a continuous infusion at the same rate would reach.</li>
<li>On the equation sheet: yes, page 1.</li>
</ul>
</div>

<h4>Worked example</h4>
<ul class="tlist">
<li>Her Example 4 (questions m6b-n02 and m6b-n03): 300 mg infused over 2 hours.</li>
<li>A second 300 mg starts 6 hours after the first started, again over 2 hours.</li>
<li>k = 0.15 hr<sup>&minus;1</sup>, V<sub>D</sub> = 15 L.</li>
<li>Find (a) the concentration at the end of the first infusion and (b) 4 hours after the second infusion stops.</li>
</ul>
<ol class="gsteps">
<li>Turn the dose into a rate: R = {{frac:300 mg|2 hr}} = 150 mg/hr.</li>
<li>Find the clearance and the plateau: V<sub>D</sub>k = (15 L)(0.15 hr<sup>&minus;1</sup>) = 2.25 L/hr, and {{frac:150 mg/hr|2.25 L/hr}} = 66.67 mg/L.</li>
<li>Fraction reached in 2 hours: 1 &minus; e<sup>&minus;(0.15)(2)</sup> = 1 &minus; 0.7408 = 0.2592.</li>
<li>(a) End of the first infusion: C<sub>p</sub> = 66.67 &times; 0.2592 = 17.28 mg/L. The second infusion is identical, so it also ends at 17.28 mg/L.</li>
<li>Draw the number line: infusion 1 runs 0 to 2 hr, infusion 2 runs 6 to 8 hr, and the time asked for is 8 + 4 = 12 hr.</li>
<li>Give each infusion its own t: 12 &minus; 2 = 10 hr for the first, 12 &minus; 8 = 4 hr for the second.</li>
<li>First infusion's leftover: 17.28 &times; e<sup>&minus;(0.15)(10)</sup> = 17.28 &times; 0.2231 = 3.86 mg/L.</li>
<li>Second infusion's leftover: 17.28 &times; e<sup>&minus;(0.15)(4)</sup> = 17.28 &times; 0.5488 = 9.48 mg/L.</li>
<li>(b) Add them: C = 3.86 + 9.48 = 13.34 mg/L.</li>
</ol>
<p class="prose">Answer: <b>(a) 17.28 mg/L; (b) 13.34 mg/L</b>. Her stated answer to (b) is 13.33 mg/L; the difference is rounding.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>Two infusions of the same dose and duration, the second starting a stated number of hours after the first starts. She asks the end of the first infusion, then a stated time after the second ends.</li>
<li>The elimination parameter arrives as k, as a half-life, or as a clearance with a volume, so the first step changes: convert to k (and to R) before anything else.</li>
<li>Usual trap: using the same t for both infusions. Each t runs from the end of its own infusion, which the number line makes clear.</li>
<li>Second trap: putting the 6-hour spacing into the infusion equation. Its t is the infusion time only.</li>
<li>In-Class Activity problem 1: 500 mg over 2 hr, second infusion 6 hr after the first starts, t&frac12; 3 hr, V<sub>D</sub> 18 L. Her confirmed answers: 22.2 mg/L, and "eleven-ish" 4 hr after the second ends.</li>
<li>Problem 2: 150 mg over 1.5 hr (Cl 2.54 L/hr, V<sub>D</sub> 22 L), second starting 8 hr after the first. End of first infusion 6.26 mg/L; 6 hr after the second, 6.26e<sup>&minus;0.115(6)</sup> + 6.26e<sup>&minus;0.115(14)</sup>.</li>
<li>A closing part asks what a continuous infusion at the same rate would reach: {{frac:R|Cl}}, 39.37 mg/L in problem 2.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>the concentrations from each administration of the dose will be additive over time</q> (09-28)</li>
<li><q>So that C0 is gonna be the concentration at the end of the infusion, right?</q> (09-28)</li>
</ul>
<p class="gsrc">Sources: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Rationale", "Administering One or More Doses by IV Infusion" and "Example 4".</p>
<p class="gsrc">Same deck, slides "What is the plasma drug concentration at the end of the first infusion?", "What is the plasma drug concentration 4 hours after the cessation of the second infusion?" and "Summary". Also the 09-28 lecture; In-Class Activity, Multiple IV Infusions; questions m6b-n01 to m6b-n03.</p>
<p class="gsrc">Textbook: Shargel 7e Chapter 9, printout p. 18.</p>
</section>

<h2>Module 6 - Multiple Oral Doses</h2>
<ul class="tlist">
<li>Two objectives.</li>
<li>Calculating the plasma concentration when a drug is taken by mouth again and again.</li>
<li>Predicting what happens when the dose or the dosing interval is changed.</li>
</ul>

<section class="gobj" id="gobj-m6a-1">
<h3 data-nav="Module 6a, objective 1 &mdash; Calculate plasma drug concentration following multiple extravascular administrations of drug">Module 6a - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Calculate plasma drug concentration following multiple extravascular administrations of drug</b><i>6a---Multiple-Oral-Doses.pdf, slides "Cp vs. Time for a Single Oral Dose" through "Example 1"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Extravascular means given outside a blood vessel; here it means by mouth. Each oral dose has to be absorbed before it reaches the plasma, so the concentration rises to a peak and then falls.</li>
<li>When the next dose arrives before the last one is gone, drug builds up (accumulates) until each interval looks the same. That repeating pattern is steady state.</li>
<li>The multiple-oral-dose equations are the single-oral-dose equation from Module 5 with extra factors attached, one for each thing that repeating the dose adds.</li>
<li>For an oral dose the peak is not at the moment of dosing, so the time to peak (t<sub>max</sub>) has to be found before the peak concentration (C<sub>max</sub>), both for the first dose and at steady state.</li>
<li>At steady state the peak comes earlier and is higher than after the first dose, because drug from earlier doses is still in the body.</li>
<li class="tbk"><b>From the textbook.</b> For repeated oral doses the time to reach steady state depends on the half-life alone, not on the dose, the interval or the number of doses. Changing the dose changes the plateau in proportion.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Dosing interval (&tau;, tau)</dt><dd>Time from one dose to the next, in hr; 8 hr in her tetracycline example.</dd>
<dt>Dose number (n)</dt><dd>Which dose the patient is on: 1 for the first dose, 2 for the second, and so on. No units.</dd>
<dt>Steady state (&infin;)</dt><dd>The point after many doses where every interval repeats the same peak, trough and average; a superscript &infin; marks a steady-state value.</dd>
<dt>Bioavailability (F)</dt><dd>Fraction of the oral dose that reaches the systemic circulation, no units; 75% is written F = 0.75.</dd>
<dt>Dose (D<sub>0</sub>)</dt><dd>Amount given each time, in mg.</dd>
<dt>Absorption rate constant (k<sub>a</sub>)</dt><dd>First-order rate constant for absorption from the gut, in hr<sup>&minus;1</sup>.</dd>
<dt>Elimination rate constant (k)</dt><dd>First-order rate constant for elimination, in hr<sup>&minus;1</sup>; k = {{frac:0.693|t<sub>&frac12;</sub>}}, where t<sub>&frac12;</sub> is the half-life in hr.</dd>
<dt>Apparent volume of distribution (V<sub>D</sub>)</dt><dd>Volume that relates the amount in the body to the plasma concentration, in L; often given in L/kg and multiplied by body weight.</dd>
<dt>Total clearance (Cl<sub>T</sub>)</dt><dd>Volume of plasma cleared of drug per unit time, in L/hr; Cl<sub>T</sub> = V<sub>D</sub>k.</dd>
<dt>Plasma concentration (C<sub>p</sub>)</dt><dd>Drug concentration in plasma at a stated time, in mg/L.</dd>
<dt>t<sub>max</sub> and C<sub>max</sub></dt><dd>Time to the peak (hr) and the peak concentration (mg/L) after a single dose.</dd>
<dt>t<sub>max</sub><sup>&infin;</sup>, C<sub>max</sub><sup>&infin;</sup>, C<sub>min</sub><sup>&infin;</sup>, C<sub>avg</sub><sup>&infin;</sup></dt><dd>At steady state: time to peak (hr), peak, trough (the lowest value, just before the next dose) and average over one interval (all mg/L).</dd>
</dl>

<h4>Equations</h4>
<p class="prose">The long steady-state equations are built from three named parts. Learn the parts first; each full equation below is then a product of parts.</p>
<ul class="tlist">
<li>The numbers quoted beside the parts come from her Example 1, worked in full under Worked example.</li>
<li>Regimen: 250 mg tetracycline by mouth every 8 hours (&tau; = 8 hr).</li>
<li>F = 0.75, V<sub>D</sub> = 112.5 L, k<sub>a</sub> = 0.9 hr<sup>&minus;1</sup>.</li>
<li>t<sub>&frac12;</sub> = 10 hr, so k = 0.0693 hr<sup>&minus;1</sup>.</li>
</ul>

<div class="geq">
<div class="geqline">Part 1, the first-dose prefactor: &nbsp; P = {{frac:F k<sub>a</sub> D<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}}</div>
<ul class="tlist">
<li>F no units; k<sub>a</sub> and k in hr<sup>&minus;1</sup>; D<sub>0</sub> in mg; V<sub>D</sub> in L. P comes out in mg/L.</li>
<li>What it does: it sets the scale of one oral dose. It is the same number for every dose, because F, k<sub>a</sub>, k, V<sub>D</sub> and D<sub>0</sub> do not change with repeated dosing.</li>
<li>It is not C<sub>0</sub> (the concentration just after an IV bolus, dose over V<sub>D</sub>) and not the peak. It multiplies a bracket that is always less than 1. For tetracycline P = 1.806 mg/L, while the first-dose peak is 1.35 mg/L.</li>
<li>When to use it: inside the single-dose equation, the n-dose equation and C<sub>min</sub><sup>&infin;</sup>.</li>
</ul>
</div>

<div class="geq">
<div class="geqline">Part 2, the two accumulation factors: &nbsp; r<sub>k</sub> = {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} &nbsp;&nbsp; and &nbsp;&nbsp; r<sub>a</sub> = {{frac:1|1 &minus; e<sup>&minus;k<sub>a</sub>&tau;</sup>}}</div>
<ul class="tlist">
<li>&tau; in hr; both factors have no units and are always at least 1. The equation sheet has no letters for them; it writes the fractions out in full.</li>
<li>e<sup>&minus;k&tau;</sup> is the fraction of drug still in the body one interval after a dose: 0.574 for tetracycline (k 0.0693 hr<sup>&minus;1</sup>, &tau; 8 hr).</li>
<li>r<sub>k</sub> raises the elimination term by the drug left over from all earlier doses. For tetracycline it is 2.35: more than double, because less than one half-life (10 hr) passes between doses.</li>
<li>r<sub>a</sub> does the same for the absorption term. For tetracycline e<sup>&minus;k<sub>a</sub>&tau;</sup> = 0.0007, so r<sub>a</sub> = 1.00: each dose is fully absorbed before the next, and nothing builds up on the absorption side.</li>
<li>When to use them: in every steady-state oral equation. A longer &tau; makes r<sub>k</sub> smaller, so less accumulates.</li>
</ul>
</div>

<div class="geq">
<div class="geqline">Part 3, the two decay terms: &nbsp; e<sup>&minus;kt</sup> &nbsp;&nbsp; and &nbsp;&nbsp; e<sup>&minus;k<sub>a</sub>t</sup></div>
<ul class="tlist">
<li>t is the time in hr after the most recent dose.</li>
<li>e<sup>&minus;kt</sup> follows elimination. It falls slowly, because k is small: 0.807 at 3.09 hr for tetracycline.</li>
<li>e<sup>&minus;k<sub>a</sub>t</sup> follows the drug not yet absorbed. It falls quickly, because k<sub>a</sub> is large: 0.062 at 3.09 hr, so most of the dose has been absorbed by the peak.</li>
<li>The concentration is P times the elimination term minus the absorption term, each with its accumulation factor once doses repeat.</li>
</ul>
</div>

<div class="geq">
<div class="geqline">Single dose (Module 5): &nbsp; C<sub>p</sub> = P (e<sup>&minus;kt</sup> &minus; e<sup>&minus;k<sub>a</sub>t</sup>) &nbsp;&nbsp; with &nbsp;&nbsp; t<sub>max</sub> = {{frac:1|k<sub>a</sub> &minus; k}} ln({{frac:k<sub>a</sub>|k}})</div>
<ul class="tlist">
<li>C<sub>max</sub> of the first dose is C<sub>p</sub> with t set to t<sub>max</sub>.</li>
<li>t<sub>max</sub> holds only k and k<sub>a</sub>: no dose, no volume, no &tau;. Changing the dose does not move it.</li>
<li>When to use it: the first dose, when the body starts with no drug.</li>
<li>On the equation sheet: yes, both lines, page 1.</li>
</ul>
</div>

<div class="geq">
<div class="geqline">After n doses: &nbsp; C<sub>p</sub> = P [ {{frac:1 &minus; e<sup>&minus;nk&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}} e<sup>&minus;kt</sup> &minus; {{frac:1 &minus; e<sup>&minus;nk<sub>a</sub>&tau;</sup>|1 &minus; e<sup>&minus;k<sub>a</sub>&tau;</sup>}} e<sup>&minus;k<sub>a</sub>t</sup> ]</div>
<ul class="tlist">
<li>What is new compared with the single dose: n, the dose number, and &tau;, the dosing interval. With n = 1 both fractions equal 1 and the single-dose equation is left.</li>
<li>As n grows, e<sup>&minus;nk&tau;</sup> and e<sup>&minus;nk<sub>a</sub>&tau;</sup> shrink towards 0, so each numerator becomes 1 and the fractions become r<sub>k</sub> and r<sub>a</sub>.</li>
<li>When to use it: the concentration at a time t after the n-th dose, before steady state. She did not work this one in lecture.</li>
<li>On the equation sheet: yes, page 1, last line of the right column.</li>
</ul>
</div>

<div class="geq">
<div class="geqline">At steady state: &nbsp; C<sub>p</sub><sup>&infin;</sup> = P (r<sub>k</sub> e<sup>&minus;kt</sup> &minus; r<sub>a</sub> e<sup>&minus;k<sub>a</sub>t</sup>)</div>
<ul class="tlist">
<li>The n-dose equation with each numerator set to 1. It is the full steady-state curve; the peak, trough and time-to-peak lines below are read from it.</li>
<li>When to use it: as the source of the shorter lines; the exam questions use the shorter lines.</li>
</ul>
</div>

<div class="geq">
<div class="geqline">Time to peak at steady state: &nbsp; t<sub>max</sub><sup>&infin;</sup> = {{frac:1|k<sub>a</sub> &minus; k}} ln[ {{frac:k<sub>a</sub>|k}} &times; {{frac:1 &minus; e<sup>&minus;k&tau;</sup>|1 &minus; e<sup>&minus;k<sub>a</sub>&tau;</sup>}} ]</div>
<ul class="tlist">
<li>The first two pieces are the single-dose t<sub>max</sub>. The last fraction is the steady-state correction; it holds &tau;.</li>
<li>The correction is less than 1 (0.426 for tetracycline), so the number inside ln is smaller and t<sub>max</sub><sup>&infin;</sup> is shorter than the first-dose t<sub>max</sub>.</li>
<li>It depends on k, k<sub>a</sub> and &tau;, so a new dosing interval means a new t<sub>max</sub><sup>&infin;</sup>.</li>
<li>When to use it: before C<sub>max</sub><sup>&infin;</sup>, every time. On the equation sheet: yes, page 2, written with one fraction inside ln.</li>
</ul>
</div>

<div class="geq">
<div class="geqline">Peak at steady state: &nbsp; C<sub>max</sub><sup>&infin;</sup> = {{frac:F D<sub>0</sub>|V<sub>D</sub>}} &times; r<sub>k</sub> &times; e<sup>&minus;kt<sub>max</sub>&infin;</sup></div>
<ul class="tlist">
<li>{{frac:F D<sub>0</sub>|V<sub>D</sub>}} is the absorbed dose spread through V<sub>D</sub>: 1.667 mg/L for tetracycline.</li>
<li>r<sub>k</sub> raises it for the drug left from earlier doses: &times; 2.35.</li>
<li>e<sup>&minus;kt<sub>max</sub>&infin;</sup> is the decline from the time of the dose to the peak at t<sub>max</sub><sup>&infin;</sup>: &times; 0.867.</li>
<li>Putting t = 2.06 hr into the full steady-state curve (P, r<sub>k</sub>, r<sub>a</sub>) gives the same 3.39 mg/L.</li>
<li>F and t<sub>max</sub><sup>&infin;</sup> mark this line as oral. Take them away and the repeated-bolus peak, {{frac:D<sub>0</sub>|V<sub>D</sub>}} &times; r<sub>k</sub>, is left. &tau; alone does not tell the two apart.</li>
<li>On the equation sheet: yes.</li>
</ul>
</div>

<div class="geq">
<div class="geqline">Trough at steady state: &nbsp; C<sub>min</sub><sup>&infin;</sup> = P &times; r<sub>k</sub> &times; e<sup>&minus;k&tau;</sup> &nbsp;=&nbsp; {{frac:k<sub>a</sub> F D<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}} &times; {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} &times; e<sup>&minus;k&tau;</sup></div>
<ul class="tlist">
<li>It starts from P, the first-dose prefactor, not from {{frac:F D<sub>0</sub>|V<sub>D</sub>}}; mixing the two up is the usual slip.</li>
<li>e<sup>&minus;k&tau;</sup> is one full interval of decline, because the trough is at the end of the interval, just before the next dose.</li>
<li>Compared with the steady-state curve at t = &tau;, the k<sub>a</sub> term is missing. For tetracycline that term is about 0.001 mg/L, because e<sup>&minus;k<sub>a</sub>&tau;</sup> is 0.0007.</li>
<li>On the equation sheet: yes.</li>
</ul>
</div>

<div class="geq">
<div class="geqline">Average at steady state: &nbsp; C<sub>avg</sub><sup>&infin;</sup> = {{frac:F D<sub>0</sub>|Cl<sub>T</sub>&tau;}} &nbsp;=&nbsp; {{frac:F D<sub>0</sub>|V<sub>D</sub>k&tau;}}</div>
<ul class="tlist">
<li>The absorbed dose per interval divided by the volume cleared per interval (Cl<sub>T</sub> in L/hr times &tau; in hr gives L).</li>
<li>No t<sub>max</sub> and no accumulation factor. It is the same average as for repeated IV bolus doses, with F now less than 1.</li>
<li>It is a time average, not the midpoint of peak and trough. For this oral regimen it sits above the midpoint (3.01 against 2.915 mg/L); for an IV bolus regimen it sits below.</li>
<li>On the equation sheet: yes, on page 1 as the V<sub>D</sub>k&tau; form; Cl<sub>T</sub> = V<sub>D</sub>k makes the two the same.</li>
</ul>
</div>

<h4>Worked example</h4>
<ul class="tlist">
<li>Example 1: a 75-kg man takes 250 mg tetracycline hydrochloride by mouth every 8 hours for 2 weeks.</li>
<li>F is about 75%, V<sub>D</sub> 1.5 L/kg, t<sub>&frac12;</sub> about 10 hr, k<sub>a</sub> 0.9 hr<sup>&minus;1</sup>.</li>
<li>Find C<sub>max</sub> of the first dose, then C<sub>max</sub>, C<sub>min</sub> and C<sub>avg</sub> at steady state.</li>
</ul>
<ol class="gsteps">
<li>Convert the inputs: k = {{frac:0.693|10 hr}} = 0.0693 hr<sup>&minus;1</sup>; V<sub>D</sub> = 1.5 L/kg &times; 75 kg = 112.5 L; F = 0.75; &tau; = 8 hr.</li>
<li>First-dose t<sub>max</sub>: {{frac:1|0.9 &minus; 0.0693}} ln({{frac:0.9|0.0693}}) = {{frac:ln(12.99)|0.8307}} = {{frac:2.564|0.8307}} = <b>3.09 hr</b> (she writes 3.1 hr).</li>
<li>Prefactor: P = {{frac:(0.75)(0.9)(250 mg)|(112.5 L)(0.8307)}} = {{frac:168.75|93.45}} = 1.806 mg/L.</li>
<li>First-dose C<sub>max</sub>: 1.806 &times; (e<sup>&minus;0.0693 &times; 3.09</sup> &minus; e<sup>&minus;0.9 &times; 3.09</sup>) = 1.806 &times; (0.807 &minus; 0.062) = 1.806 &times; 0.745 = <b>1.35 mg/L</b>.</li>
<li>Steady-state pieces: e<sup>&minus;0.0693 &times; 8</sup> = 0.574, so 1 &minus; e<sup>&minus;k&tau;</sup> = 0.426 and r<sub>k</sub> = 2.35; e<sup>&minus;0.9 &times; 8</sup> = 0.0007, so 1 &minus; e<sup>&minus;k<sub>a</sub>&tau;</sup> = 0.999.</li>
<li>t<sub>max</sub><sup>&infin;</sup> = {{frac:1|0.8307}} ln[12.99 &times; {{frac:0.426|0.999}}] = {{frac:ln(5.53)|0.8307}} = {{frac:1.710|0.8307}} = <b>2.06 hr</b>, about an hour earlier than the first dose.</li>
<li>C<sub>max</sub><sup>&infin;</sup> = {{frac:(0.75)(250 mg)|112.5 L}} &times; 2.35 &times; e<sup>&minus;0.0693 &times; 2.06</sup> = 1.667 &times; 2.35 &times; 0.867 = <b>3.39 mg/L</b>.</li>
<li>C<sub>min</sub><sup>&infin;</sup> = P &times; r<sub>k</sub> &times; e<sup>&minus;k&tau;</sup> = 1.806 &times; 2.35 &times; 0.574 = <b>2.44 mg/L</b>.</li>
<li>C<sub>avg</sub><sup>&infin;</sup> = {{frac:(0.75)(250 mg)|(112.5 L)(0.0693 hr<sup>&minus;1</sup>)(8 hr)}} = {{frac:187.5 mg|62.37 L}} = <b>3.01 mg/L</b>.</li>
<li>Check the pattern: the steady-state peak (3.39) is higher than the first-dose peak (1.35) and comes earlier (2.06 against 3.09 hr); even the trough (2.44) is above the first-dose peak.</li>
<li>Check the average: it lies between trough and peak, and above their midpoint of 2.915 mg/L.</li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>One regimen, asked as the first-dose peak and then the steady-state peak, trough and average, so the first-dose and steady-state values can be compared. The doses in between are not worked.</li>
<li>The stem gives V<sub>D</sub> per kilogram with a body weight, a half-life instead of k, and F as a percent, so the first step is converting all three.</li>
<li>She expects t<sub>max</sub> to be found first for any oral peak, first dose or steady state, even when the question does not ask for it. A bolus peak is C<sub>0</sub> and needs no t<sub>max</sub>.</li>
<li>Usual trap on the equation sheet: taking the repeated-bolus C<sub>max</sub><sup>&infin;</sup> line for an oral regimen. Both carry &tau; and r<sub>k</sub>; the F and the t<sub>max</sub> mark the oral line.</li>
<li>Second trap: putting the first-dose t<sub>max</sub> (3.1 hr) into C<sub>max</sub><sup>&infin;</sup>. The steady-state peak needs t<sub>max</sub><sup>&infin;</sup>, which depends on k, k<sub>a</sub> and &tau;.</li>
<li>Direction questions: t<sub>max</sub><sup>&infin;</sup> is shorter than the first-dose t<sub>max</sub>; C<sub>max</sub><sup>&infin;</sup> is expected to be higher, because drug has accumulated.</li>
<li>Her opening poll: increasing an oral dose gives no change in t<sub>max</sub>, because t<sub>max</sub> holds only k and k<sub>a</sub>.</li>
<li>Her spoken steady-state peak was 3.3 mg/L; the inputs give 3.39 mg/L (3.4 rounded), with t<sub>max</sub><sup>&infin;</sup> taken as either 2.06 or 2.1 hr.</li>
<li>On where to find the lines, she pointed to the bottom of the right-hand column or the back of the sheet; on the current copy the oral steady-state lines are on page 2.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>Only for oral do you need to find T Max. OK. Now, I might ask you what is the max for a bolus dose, and you know that that is C0, right? OK. But max for an oral dose, you have to find T-Max before you can find C-Max.</q></li>
</ul>
<p class="gsrc">Sources: 6a---Multiple-Oral-Doses.pdf, slides "Cp vs. Time for a Single Oral Dose", "Concentration of Drug in the Plasma at Any Time", "Peak, Trough and Average Plasma Concentrations at Steady State", "Time to Peak at Steady State" and "Example 1" (slides 3&ndash;9).</p>
<p class="gsrc">Also BasicPharmacokineticsEquations.pdf pages 1&ndash;2; transcript 09-28; questions m6b-n09 to m6b-n14.</p>
<p class="gsrc">Textbook: Shargel 7e Chapter 9, printout p. 6.</p>
</section>

<section class="gobj" id="gobj-m6a-2">
<h3 data-nav="Module 6a, objective 2 &mdash; Discuss the effects of changing various parameters on the pharmacokinetics">Module 6a - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Discuss the effects of changing various parameters on the pharmacokinetics</b><i>6a---Multiple-Oral-Doses.pdf, slides "Multiple-Dosage Regimens" through "Consider Peak and Trough"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>A dosage regimen is the dose size (D<sub>0</sub>) plus the dosing interval (&tau;, the time between doses). These are the only two things a prescriber adjusts.</li>
<li>Clearance (Cl<sub>T</sub>), half-life (t<sub>&frac12;</sub>), the elimination rate constant (k) and the volume of distribution (V<sub>D</sub>) belong to the drug and the patient, so a regimen does not change them.</li>
<li>Changing the dose or the interval moves the steady-state concentrations and the size of the swing between peak and trough. The interval also changes how easy the regimen is to follow.</li>
<li>Neither change alters how long steady state takes to reach, because the half-life alone sets that.</li>
<li>The aim is a regimen whose peak and trough both sit inside the therapeutic range, at an interval and a tablet strength the patient can actually use.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Dosage regimen</dt><dd>The dose (mg) and the dosing interval (hr) together, for example 500 mg every 8 hours.</dd>
<dt>Steady-state concentration</dt><dd>The level the plasma concentration settles around after repeated doses, in mg/L.</dd>
<dt>Fluctuation</dt><dd>The difference between the peak (C<sub>max</sub><sup>&infin;</sup>) and the trough (C<sub>min</sub><sup>&infin;</sup>) within one interval at steady state.</dd>
<dt>Patient compliance</dt><dd>How reliably the patient takes each dose as prescribed; fewer doses a day usually means better compliance.</dd>
<dt>Therapeutic range</dt><dd>The concentrations between the lowest effective level and the level where toxicity starts, in mg/L.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">C<sub>avg</sub><sup>&infin;</sup> = {{frac:F D<sub>0</sub>|Cl<sub>T</sub>&tau;}}</div>
<ul class="tlist">
<li>F bioavailability (no units), D<sub>0</sub> dose (mg), Cl<sub>T</sub> total clearance (L/hr), &tau; dosing interval (hr); C<sub>avg</sub><sup>&infin;</sup> in mg/L.</li>
<li>D<sub>0</sub> is on top, so a larger dose at the same &tau; raises the steady-state level. &tau; is underneath, so a longer interval at the same dose lowers it.</li>
<li>When to use it: to predict which way the average moves when one of the two is changed. On the equation sheet: yes.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Accumulation factor: &nbsp; r<sub>k</sub> = {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} &nbsp;&nbsp; and one interval of decline: &nbsp; e<sup>&minus;k&tau;</sup></div>
<ul class="tlist">
<li>r<sub>k</sub> is the accumulation factor, the number of times the steady-state level exceeds the first-dose level; e<sup>&minus;k&tau;</sup> is the fraction of a dose still in the body one interval later.</li>
<li>A longer &tau; makes e<sup>&minus;k&tau;</sup> smaller: more of each dose is eliminated before the next, so r<sub>k</sub> is smaller and less accumulates.</li>
<li>The trough is the peak level carried down through the rest of the interval, so a longer &tau; lets it fall further and the swing gets larger.</li>
<li>&tau; is also inside t<sub>max</sub><sup>&infin;</sup> (the time from a dose to the peak at steady state), so a new interval means recalculating t<sub>max</sub><sup>&infin;</sup> and C<sub>max</sub><sup>&infin;</sup> (the steady-state peak). A new dose changes neither t<sub>max</sub>.</li>
<li>On the equation sheet: yes, inside the steady-state lines.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Her question to the room: 500 mg every 4 hours is changed to 500 mg every 8 hours. What is the expectation at steady state?</p>
<ol class="gsteps">
<li>Find what changed: the dose stays at 500 mg; the interval doubles from 4 to 8 hr.</li>
<li>Steady-state level: &tau; is in the denominator of {{frac:F D<sub>0</sub>|Cl<sub>T</sub>&tau;}}, so doubling &tau; halves the average. The level goes down.</li>
<li>Fluctuation: each dose now has 8 hr instead of 4 hr to be eliminated, so the trough falls further below the peak. The swing gets larger.</li>
<li>Compliance: every 8 hours is 3 doses a day instead of 6, which is easier to keep to.</li>
<li>Answer: <b>lower steady-state concentration, larger peak-to-trough fluctuation, better patient compliance</b>. The part she confirmed in class was the lower steady-state concentration.</li>
<li>Second case, stating a regimen: a calculation gives 17.29 mg every 3.72 hours. Write it as a strength and interval the patient can use, such as <b>20 mg every 4 hours</b>.</li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>One parameter is changed and the other held, then three things are asked in her order: the steady-state concentration, the fluctuation between peak and trough, and patient compliance. The answers are directions, not numbers.</li>
<li>Larger dose, same interval: higher concentrations, larger fluctuation, usually no change in compliance. Smaller dose: the reverse, compliance again unchanged.</li>
<li>Longer interval, same dose: lower concentrations, larger fluctuation, better compliance. Shorter interval: higher concentrations, smaller fluctuation, worse compliance.</li>
<li>A shorter interval shrinks the swing because the next dose arrives before the 3 to 5 half-lives the level would need to reach the bottom of the curve.</li>
<li>Trap: pairing a higher level with a smaller swing for a larger dose. A larger dose raises both the level and the swing.</li>
<li>Trap: expecting a longer interval to raise the level because each dose has more time to be absorbed. Absorption is complete either way; the extra time goes to elimination.</li>
<li>Figure question: equal doses every 6 hours and every 8 hours, same k<sub>a</sub> and k. The 6-hour curve has the higher plateau, and both reach steady state in the same time.</li>
<li>Peak and trough, not the average, are the values that must sit inside the therapeutic range.</li>
<li>She will ask for dosing intervals and oral doses on the exam, and expects them rounded to an interval and a tablet strength a patient can use.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>Don't tell me 17.29 mg for an oral dose.</q></li>
<li><q>if you calculate a dosing interval, that is, let's say, 3.72 hours. As your patient. Does that dosing interval make sense to me?</q></li>
</ul>
<p class="gsrc">Sources: 6a---Multiple-Oral-Doses.pdf, slides "Multiple-Dosage Regimens", "Altering Steady-State Concentrations" (Methods 1 and 2), "Altering Dose", "Altering Dosing Interval" (three slides, including the 6-hour and 8-hour figure) and "Consider Peak and Trough" (slides 11&ndash;19).</p>
<p class="gsrc">Transcript 09-28; questions in q8_module6b.js, sub "oparam".</p>
</section>

<h2>Module 7a - Bioavailability and Bioequivalence</h2>
<ul class="tlist">
<li>Four objectives, from the "Objectives" slide of the 7a deck; one lecture, 30 September.</li>
<li>It brings back the area under the curve (AUC) from Module 1.</li>
<li>It brings back the clearance, dose and AUC relationship from Module 4.</li>
<li>It uses them to compare one dosage form with another: an oral tablet against an IV dose, or a new product against the standard.</li>
<li>Quiz 4 on Monday 5 October covers this lecture and multiple dosing. She said the bioavailability items would lean toward absolute bioavailability (an oral product compared with the same drug given IV), with definitions, the why, and short calculations.</li>
</ul>

<section class="gobj" id="gobj-m7-1">
<h3 data-nav="Module 7a, objective 1 &mdash; Define drug product performance, bioavailability, and bioequivalence">Module 7a - Objective 1</h3>
<div class="gbar"><span>Objective</span><b>Define drug product performance, bioavailability, and bioequivalence</b><i>7a---Bioavailability-and-Bioequivalence.pdf, slides "Drug Product Performance", "Bioavailability", "Bioequivalence" and "Bioequivalence Example"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>A tablet or capsule only works if the drug leaves the dosage form. Drug product performance is that release step: the drug substance coming out of the product so that it can be absorbed.</li>
<li>Bioavailability is the rate and extent to which the active ingredient is absorbed from the product and reaches the site of action. Extent is measured by the area under the curve (AUC), rate by the time of the peak (t<sub>max</sub>).</li>
<li>Most of this course uses bioavailability as a fraction, F: the share of a dose that reaches the systemic circulation. That fraction is the extent half of the definition.</li>
<li>Bioequivalence compares the same active ingredient from two products, a test product and a reference product. They are bioequivalent when there is no significant difference in rate and extent at the same molar dose under similar conditions.</li>
<li>Because bioequivalence needs rate as well as extent, two products with the same AUC are not shown to be bioequivalent until their peak times are also shown to be similar.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Drug product performance</dt><dd>The release of the drug substance from the drug product, which leads to the bioavailability of the drug substance.</dd>
<dt>Bioavailability</dt><dd>The rate and extent to which the active ingredient or active moiety is absorbed from a drug product and becomes available at the site of action.</dd>
<dt>Bioavailability factor (F)</dt><dd>The fraction of a dose absorbed, with no units; written 0.55 or 55%. F is 1 for an intravenous (IV) dose.</dd>
<dt>Area under the curve (AUC)</dt><dd>The area under the plasma concentration against time curve, in (mg/L)hr or (mcg/mL)hr. It measures extent.</dd>
<dt>Time of peak (t<sub>max</sub>)</dt><dd>The time at which an oral curve reaches its highest concentration, in hours. It measures rate.</dd>
<dt>Bioequivalence</dt><dd>The absence of a significant difference in the rate and extent to which the active ingredient becomes available at the site of action, at the same molar dose under similar conditions, in an appropriately designed study.</dd>
<dt>Test and reference product</dt><dd>The product under study (test) and the product it is compared with (reference), which is the standard or originator product.</dd>
</dl>

<h4>Worked example</h4>
<p class="prose">Her "Bioequivalence Example": three formulations A, B and C of one drug on a single plasma level against time plot, with AUC<sub>A</sub> = AUC<sub>B</sub> and AUC<sub>C</sub> = 0.5 AUC<sub>A</sub>. Which pairs are bioequivalent?</p>
<ol class="gsteps">
<li>Compare extent first: A and B enclose the same area; C encloses half the area of A.</li>
<li>Compare rate next: A and C peak at the same time; B peaks later than A.</li>
<li>A against B: same extent, different rate, so not bioequivalent.</li>
<li>A against C: same rate, different extent, so not bioequivalent.</li>
<li>A fourth curve drawn close to A, peaking at about the same time with about the same area, is the one she called bioequivalent: similar in both, not identical in either.</li>
</ol>
<p class="prose">Answer: <b>none of A, B and C is bioequivalent to another; only a curve that matches A in both rate and extent would be</b>.</p>

<h4>Picture it</h4>
{{fig:slide_7a---Bioavailabili_p13|Three formulations of one drug. A and B share an AUC but peak at different times; A and C peak together but C has half the area. Her drawn curve D, close to A in both, is the one she called bioequivalent.}}
<p class="prose">Read the area and the peak time separately: the area answers extent, the peak time answers rate, and bioequivalence needs both to match.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>Definitions were the first thing she named for the quiz, together with the why: what each term is for, and what bioavailability data tell a pharmacist about a product.</li>
<li>Rate and extent: a stem that gives only AUC values gives extent. Whether two products are bioequivalent cannot be answered yes from AUC alone, because the rate (the peak time) is not known.</li>
<li>On a figure like the one above, she asks which curves share an AUC, which share a peak time, and which pair could be called bioequivalent.</li>
<li>Bioavailability against bioequivalence: a relative bioavailability study (two formulations of the same drug compared by their AUCs) compares extent.</li>
<li>A bioequivalence study is a specialized relative bioavailability study that compares rate as well.</li>
<li>The words in the definition that carry the meaning: "absence of a significant difference", so the two products need not be identical; "same molar dose"; and "rate and extent".</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>these two have similar F's, but you don't know if they're bioequivalent because you don't know about the, the rate.</q></li>
<li><q>It's the absence of a significant difference. So they don't have to be exactly the same, but they just can't be too different.</q></li>
</ul>
<p class="gsrc">Sources: 7a---Bioavailability-and-Bioequivalence.pdf, slides "Drug Product Performance", "Bioavailability", "Bioequivalence", "Bioequivalence Example" and "Summary"; transcript 09-30.</p>
</section>

<section class="gobj" id="gobj-m7-2">
<h3 data-nav="Module 7a, objective 2 &mdash; Distinguish between relative bioavailability and absolute bioavailability">Module 7a - Objective 2</h3>
<div class="gbar"><span>Objective</span><b>Distinguish between relative bioavailability and absolute bioavailability</b><i>7a---Bioavailability-and-Bioequivalence.pdf, slides "Absolute Bioavailability" (two slides), "Practice Problem" (two slides) and "Relative Bioavailability"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Absolute bioavailability compares the drug given by an extravascular route, oral in this lecture, with the same drug given intravenously (IV).</li>
<li>The IV dose is all in the blood, so its F is 1 and it is the standard. F is the bioavailability factor, the fraction of the dose that reaches the systemic circulation.</li>
<li>Relative bioavailability compares two formulations of the same drug, such as a tablet against an oral solution, or a new product against the originator. Neither is IV; the reference product is the standard.</li>
<li>Both are a ratio of areas under the curve (AUC) corrected for dose, so both have no units. The product being asked about goes on top; the standard goes in the denominator.</li>
<li>An absolute F cannot be above 1, because an oral dose cannot deliver more than the same dose given IV. A relative F can be above 1 when the test product does better than the reference.</li>
<li>Absolute F is also what converts an IV dose into an oral dose with the same AUC, which is the use she said the quiz would lean toward.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Absolute bioavailability (F<sub>abs</sub>)</dt><dd>Comparison of the bioavailability of the active drug in the systemic circulation after extravascular administration with that after IV administration. No units.</dd>
<dt>Relative bioavailability (F<sub>rel</sub>)</dt><dd>Comparison of two drug product formulations of the same drug. No units.</dd>
<dt>Extravascular</dt><dd>Any route other than directly into the blood; here, oral (po).</dd>
<dt>Area under the curve (AUC)</dt><dd>The area under the plasma concentration against time curve, in (mcg/mL)hr in the slide problems; the measure of extent.</dd>
<dt>Dose (D<sub>IV</sub>, D<sub>po</sub>, D<sub>A</sub>, D<sub>B</sub>)</dt><dd>The amount given by each route or in each product, in mg.</dd>
<dt>Reference product (B)</dt><dd>The standard or comparator in a relative comparison; its AUC goes in the denominator. In an absolute comparison the IV bolus plays this part.</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">F<sub>abs</sub> = {{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}} &times; {{frac:D<sub>IV</sub>|D<sub>po</sub>}}</div>
<ul class="tlist">
<li>AUC<sub>po</sub> and AUC<sub>IV</sub> are the areas after the oral and the IV dose, in the same units, so they cancel; D<sub>IV</sub> and D<sub>po</sub> are the two doses in mg, which also cancel. F<sub>abs</sub> has no units.</li>
<li>When to use it: the stem gives an oral AUC and an IV AUC, or an oral AUC with enough to calculate the IV one. The IV AUC goes in the denominator and the IV dose goes on top.</li>
<li>On the equation sheet: yes, page 2, left column, written as the product of the two ratios.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">F<sub>rel</sub> = {{frac:AUC<sub>A</sub>|AUC<sub>B</sub>}} &times; {{frac:D<sub>B</sub>|D<sub>A</sub>}}</div>
<ul class="tlist">
<li>A is the product being compared (the test); B is the reference or comparator. AUC in matching units, D in mg; F<sub>rel</sub> has no units.</li>
<li>When to use it: two formulations of the same drug, neither of them IV. "Compared to the oral solution" puts the oral solution in the denominator as B.</li>
<li>On the equation sheet: yes, page 2, directly under the absolute bioavailability lines.</li>
</ul>
</div>

<h4>Worked example</h4>
<p class="prose">Her two slide practice problems, six volunteers each. Problem 1: a 250 mg oral tablet with an average AUC of 101.5 (mcg/mL)hr, against a 100 mg IV bolus with an average AUC of 73.8 (mcg/mL)hr. What is the absolute bioavailability of the tablet?</p>
<p class="prose">Problem 2: the same 250 mg tablet against 5 mL of an oral solution holding 250 mg, average AUC 98.76 (mcg/mL)hr. What is the relative bioavailability of the tablet compared to the oral solution?</p>
<ol class="gsteps">
<li>Problem 1 is absolute because the comparator is IV. Put the IV AUC underneath and the IV dose on top: F<sub>abs</sub> = {{frac:101.5|73.8}} &times; {{frac:100 mg|250 mg}}.</li>
<li>Multiply out: 1.375 &times; 0.4 = 0.5501, which she rounds to <b>0.55, or 55%</b>. The units cancel.</li>
<li>Problem 2 is relative because both products are oral. The solution is the comparator, so it is B: F<sub>rel</sub> = {{frac:101.5|98.76}} &times; {{frac:250 mg|250 mg}}.</li>
<li>The doses are equal, so the dose ratio is 1: F<sub>rel</sub> = 1.0277, rounded to <b>1.03</b>.</li>
<li>Read the two answers: the tablet delivers 55% of what the IV dose delivers, and about 3% more than the solution. A relative F above 1 is allowed; an absolute F above 1 is not.</li>
<li>What the 1.03 does not say: the tablet and the solution have similar extent, but nothing here gives their peak times, so bioequivalence is not established.</li>
</ol>
<p class="prose">Answer: <b>F<sub>abs</sub> = 0.55 (55%); F<sub>rel</sub> = 1.03</b>.</p>

<h4>How she tests it</h4>
<ul class="tlist">
<li>The stem names the comparison: "absolute", or an IV dose, means absolute; "compared to the oral solution", or two oral products, means relative.</li>
<li>Which goes where: the product asked about on top, the comparator's AUC in the denominator, and the dose ratio the other way round. Inverting Problem 1 gives 1.82 instead of 0.55.</li>
<li>She has few relative bioavailability problems and said she would not ask many; the practice set and the quiz lean toward absolute bioavailability.</li>
<li>A conceptual pair: can F be greater than 1? Relative, yes, as with an old standard such as Bayer aspirin that a newer product can beat; absolute, no.</li>
<li>A relative F on its own does not show bioequivalence, because the rate is unknown. She asked the room this straight after Problem 2.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>I want you to remember that the IVAUC is going to be in the denominator, right? That is what you are comparing it to.</q></li>
<li><q>Can we have an F greater than 1? Yes, For absolute or for relative or either, both? Relative, but what about for absolute?</q></li>
</ul>
<p class="gsrc">Sources: 7a---Bioavailability-and-Bioequivalence.pdf, slides "Absolute Bioavailability" (two slides), "Practice Problem" (two slides, with her working) and "Relative Bioavailability"; BasicPharmacokineticsEquations.pdf page 2; transcript 09-30.</p>
</section>

<section class="gobj" id="gobj-m7-3">
<h3 data-nav="Module 7a, objective 3 &mdash; Discuss factors that can influence bioavailability">Module 7a - Objective 3</h3>
<div class="gbar"><span>Objective</span><b>Discuss factors that can influence bioavailability</b><i>7a---Bioavailability-and-Bioequivalence.pdf, slides "Factors Influencing Bioavailability" and "Summary"</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>Bioavailability can be low for reasons in the product, reasons on the way into the circulation, and reasons in the patient. The list on the slide has nine entries.</li>
<li>The product: physicochemical properties of the drug and the formulation, drug stability and pH effects, and prodrugs (a drug given in an inactive form that the body must convert to the active drug).</li>
<li>On the way in: pre-systemic and first-pass metabolism, which is the liver acting on an oral dose before it reaches the systemic circulation.</li>
<li>Also on the way in: food effects, drug-drug interactions and efflux transporters (membrane proteins that pump absorbed drug back out of the cell).</li>
<li>The patient: age and disease state. Her comment on age was that the body changes and everything slows down.</li>
<li>She named the first three entries as the ones that come to mind most often: the physical and chemical properties of the drug itself, what pH does to it once it is in the body, first-pass metabolism, and stability.</li>
<li>The summary slide ties it together: low bioavailability has a variety of causes, including formulation factors and the first-pass effect, and it bears on the drug's safety and efficacy.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>First-pass metabolism (first-pass effect)</dt><dd>Metabolism of an oral dose, mainly by the liver, before the drug reaches the systemic circulation; it lowers F.</dd>
<dt>Pre-systemic metabolism</dt><dd>Any metabolism that happens before the drug reaches the systemic circulation; listed together with first-pass metabolism.</dd>
<dt>Bioavailability factor (F)</dt><dd>The fraction of a dose that reaches the systemic circulation, no units; F = 1 for an IV dose. A low F is the sign that one of these factors is at work.</dd>
</dl>

<h4>Worked example</h4>
<ul class="tlist">
<li>Her reading of the first practice problem (objective 2).</li>
<li>A 250 mg oral tablet with an AUC of 101.5 (mcg/mL)hr, against a 100 mg IV bolus with an AUC of 73.8 (mcg/mL)hr.</li>
<li>So the tablet's F = {{frac:101.5|73.8}} &times; {{frac:100 mg|250 mg}} = 0.55.</li>
<li>What does that number mean for a 1000 mg tablet, and is oral the right route?</li>
</ul>
<ol class="gsteps">
<li>Amount available from the tablet: 0.55 &times; 1000 mg = <b>550 mg</b>.</li>
<li>The same 1000 mg given IV: F = 1, so all 1000 mg is available for the body to use.</li>
<li>Compare with the oral problems so far in the course, where F was about 0.7, 0.8 or 0.9. At 0.55 almost half the dose is lost, so whether oral is the best way to give this drug is open to question.</li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>No poll or practice item in the lecture asked the factors; she went through the list briefly and described the quiz as definitions, the why, and calculations.</li>
<li>If a factor is asked, the ones she singled out are the first three on the list, and the first-pass effect is the one the summary slide names beside formulation factors.</li>
<li>The link to the numbers: a low F from an absolute bioavailability calculation is read as drug lost to one of these factors, and it raises the oral dose needed to match an IV dose.</li>
<li>While on this slide she gave the format rule for F: write 0.55 or 55%, never a bare decimal point with nothing in front of it.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>just a little reminder, there should be no leading decimals, OK?</q></li>
<li><q>Yeah, because our bodies change as we age, and yes, everything slows down.</q></li>
</ul>
<p class="gsrc">Sources: 7a---Bioavailability-and-Bioequivalence.pdf, slides "Factors Influencing Bioavailability" (with her note "0.55, don't forget leading decimals") and "Summary"; transcript 09-30.</p>
</section>

<section class="gobj" id="gobj-m7-4">
<h3 data-nav="Module 7a, objective 4 &mdash; Estimate bioavailability of a dose given route of administration, dosage form, etc.">Module 7a - Objective 4</h3>
<div class="gbar"><span>Objective</span><b>Estimate bioavailability of a dose given route of administration, dosage form, etc.</b><i>7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability" (equations), "Practice Problem" with her working, and the In-Class Activity pages 17 to 19</i></div>

<h4>In plain words</h4>
<ul class="tlist">
<li>The calculation is a ratio of areas corrected for dose. When the stem gives both areas under the curve (AUC), it is one line.</li>
<li>When it gives only the oral AUC, the IV AUC is built from clearance: an IV dose equals clearance times its AUC.</li>
<li>Clearance (Cl) is the volume of plasma cleared of drug per hour. For a one-compartment drug it is k &times; V<sub>D</sub>, with k from the half-life, so a half-life and a volume of distribution are enough to get the IV AUC.</li>
<li>The same relationship written for the oral dose, F &times; D<sub>po</sub> = Cl &times; AUC<sub>po</sub>, gives F from the oral AUC, the clearance and the oral dose. Both routes give the same number.</li>
<li>Turned round: if an oral dose is to match an IV dose in AUC, the AUCs are set equal and F becomes the IV dose divided by the oral dose.</li>
<li>The oral dose is then the IV dose divided by F, rounded to a strength that exists.</li>
<li>Linear kinetics: AUC is proportional to dose, so half the IV dose gives half the AUC.</li>
</ul>

<h4>Terms to know</h4>
<dl class="gterms">
<dt>Bioavailability factor (F, F<sub>abs</sub>)</dt><dd>The fraction of the oral dose absorbed, no units; F = 1 for an IV dose.</dd>
<dt>Area under the curve (AUC<sub>po</sub>, AUC<sub>IV</sub>)</dt><dd>The area under the plasma concentration against time curve after the oral or the IV dose, in mg&middot;hr/L (written (mg/L)hr or mg h/L on her sheets).</dd>
<dt>Dose (D<sub>po</sub>, D<sub>IV</sub>)</dt><dd>The oral and the intravenous dose, in mg.</dd>
<dt>Clearance (Cl)</dt><dd>The volume of plasma cleared of drug per unit time, in L/hr; Cl = k &times; V<sub>D</sub> for one compartment.</dd>
<dt>Elimination rate constant (k)</dt><dd>The first-order rate constant, in hr<sup>&minus;1</sup>; k = {{frac:0.693|t<sub>&frac12;</sub>}}, with t<sub>&frac12;</sub> the half-life in hours.</dd>
<dt>Volume of distribution (V<sub>D</sub>)</dt><dd>The volume that relates the amount of drug in the body to its plasma concentration, in L. After an IV bolus, V<sub>D</sub> = {{frac:D<sub>0</sub>|C<sub>0</sub>}}, where D<sub>0</sub> is the dose (mg) and C<sub>0</sub> the plasma concentration at time zero (mg/L).</dd>
</dl>

<h4>Equations</h4>
<div class="geq">
<div class="geqline">F<sub>abs</sub> = {{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}} &times; {{frac:D<sub>IV</sub>|D<sub>po</sub>}}</div>
<ul class="tlist">
<li>AUC in matching units, D in mg, F with no units. With equal doses the dose ratio is 1 and only the AUC ratio is left.</li>
<li>When to use it: whenever an oral AUC and an IV AUC are available, given or calculated.</li>
<li>On the equation sheet: yes, page 2.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">D<sub>IV</sub> = Cl &times; AUC<sub>IV</sub>, &nbsp; so &nbsp; AUC<sub>IV</sub> = {{frac:D<sub>IV</sub>|Cl}} = {{frac:D<sub>IV</sub>|k &times; V<sub>D</sub>}}</div>
<ul class="tlist">
<li>D<sub>IV</sub> in mg, Cl in L/hr, k in hr<sup>&minus;1</sup>, V<sub>D</sub> in L; the AUC comes out in mg&middot;hr/L.</li>
<li>When to use it: the stem gives a half-life and a volume of distribution instead of an IV AUC. It is the Module 4 line Cl<sub>T</sub> = {{frac:FD<sub>0</sub>|AUC}} with F = 1.</li>
<li>On the equation sheet: the product form D<sub>IV</sub> = (Cl)(AUC<sub>IV</sub>), yes, page 2; Cl = kV<sub>D</sub> is not printed and is one she expects from memory.</li>
</ul>
</div>
<div class="geq">
<div class="geqline">F<sub>abs</sub> &times; D<sub>po</sub> = Cl &times; AUC<sub>po</sub>, &nbsp; so &nbsp; F<sub>abs</sub> = {{frac:Cl &times; AUC<sub>po</sub>|D<sub>po</sub>}}</div>
<ul class="tlist">
<li>The same symbols; the oral dose times F is the amount that actually entered the circulation.</li>
<li>When to use it: the second route to the same F when the oral AUC, the clearance and the oral dose are known. Every unit cancels.</li>
<li>On the equation sheet: yes, page 2, as F<sub>abs</sub>D<sub>po</sub> = (Cl)(AUC<sub>po</sub>).</li>
</ul>
</div>
<div class="geq">
<div class="geqline">Equivalent oral dose, when AUC<sub>po</sub> is to equal AUC<sub>IV</sub>: &nbsp; F = {{frac:D<sub>IV</sub>|D<sub>po</sub>}}, &nbsp; so &nbsp; D<sub>po</sub> = {{frac:D<sub>IV</sub>|F}}</div>
<ul class="tlist">
<li>D<sub>IV</sub> is the IV dose being replaced (mg); F the absolute bioavailability of the oral product; D<sub>po</sub> the oral dose that gives the same AUC (mg).</li>
<li>When to use it: "an equivalent therapeutic regimen", "the same extent of absorption", or sending a patient home on oral. The answer is larger than the IV dose, and is then rounded to a strength that exists.</li>
<li>On the equation sheet: no. She derived it from F<sub>abs</sub> on the slide by setting the two AUCs equal.</li>
</ul>
</div>

<h4>Worked example</h4>
<ul class="tlist">
<li>In-Class Activity, question 1: a single 500 mg oral tablet of an antihypertensive drug gave an AUC of 70 mg&middot;hr/L.</li>
<li>A 500 mg IV bolus of the same drug in the same volunteer: half-life 3 hours, V<sub>D</sub> 25 L.</li>
<li>(a) The absolute bioavailability of the tablet? (b) The expected AUC after a 250 mg IV bolus?</li>
</ul>
<ol class="gsteps">
<li>Get k from the half-life: k = {{frac:0.693|3 hr}} = 0.231 hr<sup>&minus;1</sup>.</li>
<li>Build the IV area from the IV dose and the clearance: AUC<sub>IV</sub> = {{frac:D<sub>IV</sub>|k &times; V<sub>D</sub>}} = {{frac:500 mg|25 L &times; 0.231 hr<sup>&minus;1</sup>}} = 86.58 mg&middot;hr/L.</li>
<li>The doses are equal, so the dose ratio is 1: F = {{frac:70|86.58}} = 0.8085, <b>about 81%</b>. The units cancel, so F has none.</li>
<li>Same answer by the other route: F = {{frac:Cl &times; AUC<sub>po</sub>|D<sub>po</sub>}} = {{frac:(25 L)(0.231 hr<sup>&minus;1</sup>)(70 mg&middot;hr/L)|500 mg}} = 0.8085.</li>
<li>(b) Half the IV dose with linear kinetics: AUC = {{frac:250 mg|25 L &times; 0.231 hr<sup>&minus;1</sup>}} = <b>43.29 mg&middot;hr/L</b>, half of 86.58.</li>
</ol>
<p class="prose">Question 2: ciprofloxacin, oral immediate-release bioavailability 70%. What oral dose gives the same extent of absorption as a 400 mg IV bolus?</p>
<ol class="gsteps">
<li>Same extent means equal AUCs, so F = {{frac:D<sub>IV</sub>|D<sub>po</sub>}} and D<sub>po</sub> = {{frac:D<sub>IV</sub>|F}}.</li>
<li>D<sub>po</sub> = {{frac:400 mg|0.70}} = 571.43 mg.</li>
<li>Round to a strength a tablet could have: she accepted <b>575 mg or 600 mg</b>. The marketed strengths she looked up were 250 and 500 mg, so 571.43 mg is not a real tablet.</li>
</ol>
<p class="prose">Question 3: after a 500 mg IV bolus, C<sub>p</sub> = 50e<sup>&minus;0.2t</sup>. (a) The clearance? (b) The AUC of this dose? (c) The oral bioavailability of a 500 mg tablet whose AUC is 188 mg&middot;hr/L?</p>
<ol class="gsteps">
<li>The equation has the IV bolus form C<sub>p</sub> = C<sub>0</sub>e<sup>&minus;kt</sup>. Read C<sub>0</sub> = 50 mg/L and k = 0.2 hr<sup>&minus;1</sup> straight off it. V<sub>D</sub> = {{frac:D<sub>0</sub>|C<sub>0</sub>}} = {{frac:500 mg|50 mg/L}} = 10 L.</li>
<li>Cl = k &times; V<sub>D</sub> = 0.2 hr<sup>&minus;1</sup> &times; 10 L = <b>2 L/hr</b>.</li>
<li>AUC<sub>IV</sub> = {{frac:D<sub>IV</sub>|Cl}} = {{frac:500 mg|2 L/hr}} = <b>250 mg&middot;hr/L</b>.</li>
<li>Same dose by both routes: F = {{frac:188|250}} = 0.752, <b>75%</b>.</li>
</ol>

<h4>How she tests it</h4>
<ul class="tlist">
<li>Her poll, the model quiz item: a 500 mg tablet with AUC 115 (mg/L)hr against a 400 mg IV bolus with AUC 132 (mg/L)hr; options 50%, 70%, 85%, 92%. F = {{frac:115|132}} &times; {{frac:400|500}} = 0.697, so <b>70%</b>.</li>
<li>She said the wording of that item cannot change much, only the numbers; most of the room got it.</li>
<li>Two stem shapes: both AUCs given, which is one line; or the oral AUC with a half-life and a V<sub>D</sub>, where the IV AUC must be built from clearance first. Either route gives the same F.</li>
<li>The IV AUC goes in the denominator and the IV dose in the numerator. The inverted ratio is the usual wrong answer.</li>
<li>Write F as 0.55 or 55%. A bare decimal point with nothing in front of it is not accepted.</li>
<li>Equivalent dose: "same extent", "equivalent therapeutic regimen" or sending a patient home on oral means set the AUCs equal, divide the IV dose by F, then round to a strength that exists. Expect a number larger than the IV dose.</li>
<li>A smaller IV dose scales the AUC in proportion: half the dose, half the area.</li>
<li>Calculations are meant to take 2 minutes or less. Read the stem for 30 seconds and decide the route before reaching for the sheet.</li>
</ul>

<h4>In her words</h4>
<ul class="tlist">
<li><q>Then this reduces down to where F is equal to DIV over DPO. Right? If the AUCs are equivalent.</q></li>
<li><q>We might round it to 200 if there's a 175 or something that makes sense as opposed to 181.</q></li>
</ul>
<p class="gsrc">Sources: 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability" (equations), "Practice Problem" with her working, In-Class Activity pages 17 and 18, PollEv page 19; BasicPharmacokineticsEquations.pdf page 2; transcript 09-30.</p>
</section>
`;
