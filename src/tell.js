/* ==========================================================================
   TELL APART
   ==========================================================================
   Pairs and sets that share wording. Each section is a short table (cells
   of a few words) with a Why? chip per row, then an "Explain one" picker:
   <select data-xsel="group"> shows <template data-x="group:key"> under the
   table (showExplain in views.js). tell_check.js checks every chip, option
   and template line up. HTML in a template literal: no backtick and no
   dollar-brace inside. Each <h3> becomes a jump-list entry.

   SOURCES. Every claim is one a source makes: a printed slide in one of the
   five lectured decks, Dr. Mosley's spoken words recorded in
   TRANSCRIPT_CUES.md, or her own printed worked solutions recorded in
   STYLE.md. Where two sources differ, both are stated. The Module 7b and
   Module 8 sections (data-exam="3", the final) also draw on her solved
   practice sheets for those decks, recorded in STYLE.md.
   ========================================================================== */
const TELL_HTML = `
<h2>Tell apart</h2>
<p class="sub">Things students mix up, Modules 1 to 7a, then 7b and 8, each as a short table. Nothing here is scored.</p>
<details class="tabhelp" open><summary>What this tab is for</summary><ul>
<li><b>Start with the dosing-model table.</b> How the drug goes in decides the curve and the equation; the table gives the route, the shape, the defining equation and how to recognise the model in a question.</li>
<li><b>Why?</b> on any row, or <b>Explain one</b> under a table, opens the full explanation. For a dosing model it includes the curve, each equation on its own line, and how she tests it.</li>
<li><b>See the eight curves side by side</b> under the dosing table to compare the shapes on one set of axes.</li>
<li>The other tables are the pairs she tests against each other: orders, half-lives, concentrations, clearances, F values.</li>
</ul></details>

<h3 data-exam="1">Related fields and target concentrations (Module 1)</h3>
<p class="sub">Two sets from the first lecture that her polls set against each other: the related fields, told apart by what each one relates, and the named concentration lines, told apart by what happens at each.</p>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>Pharmacokinetics, pharmacodynamics, biopharmaceutics <button type="button" class="chip xwhy" data-xpick="fields:pk-pd-bp">Why?</button></td><td>Concentration and time; concentration and response; dosage form and route on absorption</td></tr>
<tr><td>MEC, MTC, MIC <button type="button" class="chip xwhy" data-xpick="fields:mec-mtc">Why?</button></td><td>MEC: lower line, met for an effect; MTC: upper line, toxicity; MIC: kills bacteria</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="fields"><option value="">Choose a set</option>
<option value="pk-pd-bp">Pharmacokinetics, pharmacodynamics, biopharmaceutics</option>
<option value="mec-mtc">MEC, MTC, MIC</option>
</select></label><div class="xout" data-xout="fields"></div></div>
<template data-x="fields:pk-pd-bp"><div class="xexp"><h4>Pharmacokinetics, pharmacodynamics and biopharmaceutics</h4>
<p><b>In one line:</b> The three fields differ in which two things each one relates.</p>
<dl><dt>Pharmacokinetics</dt><dd>The study of absorption, distribution, metabolism and excretion (ADME). Her contrast: "pharmacokinetics, concentration and time."</dd>
<dt>Pharmacodynamics</dt><dd>The relationship between the drug concentration at the site of action and the pharmacological response. Her contrast: "pharmacodynamics, concentration. And Response."</dd>
<dt>Biopharmaceutics</dt><dd>The interrelationship of the physicochemical drug properties, the dosage form and the route of administration on the rate and extent of systemic drug absorption.</dd>
<dt>The quick test</dt><dd>Find the two things the stem relates. Concentration with time: pharmacokinetics. Concentration with response: pharmacodynamics. Dosage form or route with absorption: biopharmaceutics.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her Module 1 poll quotes the biopharmaceutics definition and offers biopharmaceutics, toxicology, pharmacodynamics and pharmacology.</p>
<p class="xtrap">Her debrief: "most of you guys thought biopharm, a few of you guys thought pharmacodynamics".</p>
<p class="xtrap">Pharmacodynamics is also a wrong option in her Exam 2 review item 8, which quotes the definition of bioavailability.</p>
<p class="gsrc">Source: Introduction.pdf slides 4, 6, 8 and 15 and the poll slide after slide 10; transcript 08-17, 08-19 poll 1; Exam 2 In-Class Review item 8 (STYLE.md)</p></div></template>
<template data-x="fields:mec-mtc"><div class="xexp"><h4>MEC, MTC and MIC</h4>
<p><b>In one line:</b> They are named concentrations on the plasma level against time curve, told apart by what happens when the level reaches each one.</p>
<dl><dt>MEC, the minimum effective concentration</dt><dd>The concentration that must be met or exceeded for the desired pharmacologic response. The lower line she draws on the curve; in Module 7b it is C<sub>eff</sub>.</dd>
<dt>MTC, the minimum toxic concentration</dt><dd>The upper line. Her words: "Top of that curve, right there is where we start to see problems, and toxic can be different things for different drugs."</dd>
<dt>MIC, the minimum inhibitory concentration</dt><dd>Used for antibiotics: "What is the minimum concentration that we need to, um, kill this bacteria".</dd>
<dt>The quick test</dt><dd>Effect begins: MEC. Adverse effects begin: MTC. Bacteria killed: MIC. Her goal for therapy: "we want to stay in between these two lines", the MEC and the MTC.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her first-lecture poll: "What concentration must be met or exceeded? In order for the desired pharmacologic response to result." Options: steady-state concentration, MTC, MEC, MIC. Her answer: minimum effective.</p>
<p class="gsrc">Source: Introduction.pdf slide 9 with her MTC and MEC notes; transcript 08-17 poll 2; 7b---Pharmacokinetics-and-Pharmacodynamics.pdf slide "Relationship of Dose to Pharmacologic Effect"</p></div></template>

<h3 data-exam="1">What is being measured</h3>
<p class="sub">Three blood fluids, separated by what was removed from the sample.</p>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>Serum, plasma, whole blood <button type="button" class="chip xwhy" data-xpick="measured:fluids">Why?</button></td><td>Removed: nothing (whole blood); cells (plasma); cells and clotting factors (serum)</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="measured"><option value="">Choose a set</option>
<option value="fluids">Serum, plasma, whole blood</option>
</select></label><div class="xout" data-xout="measured"></div></div>
<template data-x="measured:fluids"><div class="xexp"><h4>Serum, plasma and whole blood</h4>
<p><b>In one line:</b> The three differ in what was removed from the sample, and how.</p>
<dl><dt>Whole blood</dt><dd>Drawn with an anticoagulant such as heparin or EDTA. It keeps all the cellular and protein elements.</dd>
<dt>Plasma</dt><dd>The liquid supernatant left after centrifuging non-clotted whole blood that contains an anticoagulant. It keeps all the proteins, including albumin.</dd>
<dt>Serum</dt><dd>Obtained after the blood has been allowed to clot and the clot has been removed. It has neither the cellular elements nor fibrinogen nor the other clotting factors.</dd>
<dd>Serum and plasma are the usual measurement fluids, because they reduce the drug's interaction with other blood components.</dd>
<dt>The quick test</dt><dd>Read the subscript: C<sub>p</sub> is concentration in plasma, C<sub>s</sub> is concentration in serum, and a bare C leaves the fluid unspecified.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick ignores the subscript. A stem that says C<sub>p</sub> has told you the fluid; a stem that says whole blood has told you the sample still contains the cells and the clotting proteins.</p>
<p class="xtrap">Answering "whole blood" to what is most commonly measured suggests the fluid was read as a matter of convenience, not as a decision about what the drug can bind to.</p>
<p class="gsrc">Source: Introduction.pdf slide 10; transcript 08-17, 08-19 poll 3</p></div></template>

<h3 data-exam="1">Kinds of pharmacokinetic model (Module 1)</h3>
<p class="sub">What each kind of model is made of and how the slides draw it. Symbols in the table:</p>
<ul class="tlist"><li>k<sub>12</sub>: the rate constant from box 1 to box 2; k<sub>21</sub>: the one from box 2 back to box 1; a bare k: the elimination rate constant.</li>
<li>IV bolus: the whole dose put into a vein at once.</li></ul>
<table class="reftab"><thead><tr><th>Model</th><th>What it is built from</th><th>How it is drawn</th><th>When it is used</th></tr></thead><tbody>
<tr><td><b>Compartment model</b> <button type="button" class="chip xwhy" data-xpick="kinds:compartment">Why?</button></td><td>Boxes (compartments) joined by rate constants: how fast drug moves along each arrow</td><td>Boxes, with arrows labelled k (the rate constant for that arrow) between them</td><td>The kind this course uses in every module</td></tr>
<tr><td><b>One-compartment open model</b> <button type="button" class="chip xwhy" data-xpick="kinds:one-cpt">Why?</button></td><td>The whole body as one uniform box</td><td>One box: the dose arrow in, one k arrow out</td><td>Drug spreads evenly at once; the default from Module 2 on</td></tr>
<tr><td><b>Two-compartment (multi-compartment) open model</b> <button type="button" class="chip xwhy" data-xpick="kinds:multi-cpt">Why?</button></td><td>A central box plus a tissue box</td><td>Box 1 and box 2 joined by k<sub>12</sub> and k<sub>21</sub>; k (elimination) leaves box 1</td><td>Log concentration against time after an IV bolus: not one straight line</td></tr>
<tr><td><b>Mammillary model</b> <button type="button" class="chip xwhy" data-xpick="kinds:mammillary">Why?</button></td><td>One central compartment, each outer one joined to it</td><td>Box 1 in the middle; boxes 2 and 3 each joined only to box 1</td><td>Marked on the slide as the one used most often</td></tr>
<tr><td><b>Catenary model</b> <button type="button" class="chip xwhy" data-xpick="kinds:catenary">Why?</button></td><td>Compartments joined end to end in a chain</td><td>Boxes 1, 2, 3 in a row; drug reaches 3 only through 2</td><td>Examined by its wiring in a Module 1 poll</td></tr>
<tr><td><b>Physiologic (perfusion) model</b> <button type="button" class="chip xwhy" data-xpick="kinds:physiologic">Why?</button></td><td>Real organs and blood flows, from anatomic and physiologic data</td><td>An organ: arterial blood in, venous blood out, an elimination arrow</td><td>Shown, then set aside: it needs more input than the course takes</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="kinds"><option value="">Choose a model</option>
<option value="compartment">Compartment model</option>
<option value="one-cpt">One-compartment open model</option>
<option value="multi-cpt">Two-compartment (multi-compartment) open model</option>
<option value="mammillary">Mammillary model</option>
<option value="catenary">Catenary model</option>
<option value="physiologic">Physiologic (perfusion) model</option>
</select></label><div class="xout" data-xout="kinds"></div></div>

<template data-x="kinds:compartment"><div class="xexp"><h4>Compartment model</h4>
<p><b>In one line:</b> A compartment model treats the body as one or more boxes, called compartments, with a rate constant (k) for each movement of drug between boxes or out of the body.</p>
<dl>
<dt>What it is built from</dt><dd>Compartments joined by rate constants. Introduction.pdf slide 13 names two kinds, told apart by how the boxes are joined: mammillary and catenary.</dd>
<dt>How it is drawn</dt><dd>Each compartment is a box and each arrow carries a rate constant. k<sub>12</sub> is the rate constant from compartment 1 to compartment 2; k<sub>21</sub> is the one from 2 back to 1.</dd>
<dt>When it is used</dt><dd>In every module. At the exam review she said this course primarily does compartmental modeling, and that how the drug behaves in the body decides which compartment model to use.</dd>
<dt>Against a physiologic model</dt><dd>A compartment is a box, not a named organ. A physiologic model is built from real organs and their blood flows instead.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> By name, in the Module 1 poll whose options are catenary, mammillary and physiologic. In later modules the number of compartments is a stem condition: she states it or gives a graph.</p>
<p class="gsrc">Source: Introduction.pdf slides 13 and 14; transcript 09-09 exam review</p></div></template>

<template data-x="kinds:one-cpt"><div class="xexp"><h4>One-compartment open model</h4>
<p><b>In one line:</b> The body is treated as one uniform box. "Open" means the drug can enter the body and leave it.</p>
<dl>
<dt>What it is built from</dt><dd>One compartment with one apparent volume of distribution (V<sub>D</sub>, the volume that links the amount of drug in the body to the measured concentration) and one elimination rate constant (k).</dd>
<dd>The slide says the body acts like a single, uniform compartment.</dd>
<dt>How it is drawn</dt><dd>One box. An arrow brings the dose in and one arrow labelled k takes drug out. For an oral dose the arrow in is labelled k<sub>a</sub>, the absorption rate constant (slide 14, Model 2).</dd>
<dt>What it assumes</dt><dd>Her definition: "As soon as you put all of that drug into the body, it is uniformly distributed throughout that body box, and then it immediately starts to be eliminated."</dd>
<dt>When it is used</dt><dd>The intravenous (IV) bolus of Module 2 (the whole dose put into a vein at once), and the infusion, oral and repeated-dose equations of Modules 3 to 6, which each carry a single V<sub>D</sub> and a single k.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> She names it in the stem as a one-compartment open model, or gives a graph on a log concentration axis: one straight line after an IV bolus means one compartment.</p>
<p class="gsrc">Source: Introduction.pdf slide 14, Models 1 and 2; 2IVBolusAdministration.pdf slide "One-Compartment Open Model: IV Bolus Administration"; transcript 09-09</p></div></template>

<template data-x="kinds:multi-cpt"><div class="xexp"><h4>Two-compartment (multi-compartment) open model</h4>
<p><b>In one line:</b> The body is split into a central compartment and a tissue compartment, because some drugs reach different tissue groups at different rates.</p>
<dl>
<dt>What it is built from</dt><dd>A central compartment, where the dose enters, holding D<sub>p</sub>, C<sub>p</sub> and V<sub>p</sub> (amount, plasma concentration and volume), and a tissue compartment holding D<sub>t</sub>, C<sub>t</sub> and V<sub>t</sub>.</dd>
<dt>How it is drawn</dt><dd>The central box and the tissue box joined by k<sub>12</sub> (the rate constant for drug moving central to tissue) and k<sub>21</sub> (tissue back to central).</dd>
<dd>The deck draws elimination from the central box (Model A), the tissue box (Model B) or both (Model C).</dd>
<dt>When it is used</dt><dd>When the log plasma concentration after a single IV (intravenous) bolus, the whole dose put into a vein at once, does not fall in one straight line. A note on the slide marks Model A as the one looked at most of the time.</dd>
<dt>Against one compartment</dt><dd>One compartment spreads evenly at once. Two compartments have a distribution phase first, the early period while drug is still moving into tissue, so the log plot has a steep early part above a shallower straight line.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> "I have to tell you that it follows a one compartment model or a two compartment."</p>
<p class="xtrap">In practice her two-compartment stems give A, B, &alpha; and &beta; (the two intercepts and the two slopes of the two straight segments on the log plot), or a two-exponential equation, and never say "two-compartment".</p>
<p class="xtrap">The wrong pick fits one straight line through all the points of a two-compartment data set: one slope where there are two, and a half-life that belongs to neither phase.</p>
<p class="gsrc">Source: Introduction.pdf slide 14, Models 3 and 4; 2IVBolusAdministration.pdf slides "One- versus Two-Compartment Models", "Examples of Two-Compartment Models", "Summary"; transcript 08-26</p></div></template>

<template data-x="kinds:mammillary"><div class="xexp"><h4>Mammillary model</h4>
<p><b>In one line:</b> A compartment model in which every outer compartment is joined directly to one central compartment.</p>
<dl>
<dt>What it is built from</dt><dd>A central compartment, numbered 1, where the drug starts, and outer compartments that each exchange drug with compartment 1 only.</dd>
<dt>How it is drawn</dt><dd>Compartment 1 in the middle, compartment 2 to its left (joined by the rate constants k<sub>12</sub> and k<sub>21</sub>, one for each direction) and compartment 3 to its right (k<sub>13</sub> and k<sub>31</sub>). Compartments 2 and 3 are not joined to each other.</dd>
<dt>When it is used</dt><dd>A handwritten note on slide 13 marks it as the one used most often.</dd>
<dt>Against catenary</dt><dd>Both can have three boxes. The mammillary model joins each outer box to the centre; the catenary model joins the boxes in a row.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> As a wrong option in her catenary poll. Because it is the one used most often, it is the answer students reach for; read how the boxes are joined, not how many there are.</p>
<p class="gsrc">Source: Introduction.pdf slide 13; transcript 08-19 poll 2</p></div></template>

<template data-x="kinds:catenary"><div class="xexp"><h4>Catenary model</h4>
<p><b>In one line:</b> A compartment model with the compartments joined end to end in a single chain.</p>
<dl>
<dt>What it is built from</dt><dd>Compartments 1, 2 and 3 in a row. Each compartment exchanges drug only with the compartments next to it.</dd>
<dt>How it is drawn</dt><dd>Compartment 1 joined to 2 by the rate constants k<sub>12</sub> and k<sub>21</sub>, one for each direction; compartment 2 joined to 3 by k<sub>23</sub> and k<sub>32</sub>. There is no arrow between 1 and 3.</dd>
<dt>What follows from the wiring</dt><dd>Drug cannot reach compartment 3 without passing through compartment 2. In her poll debrief she describes this as the cars of a train, one after the next.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> Her poll stem: "Which pharmacokinetic model consists of compartments joined to one another like the compartments of a train?" Options: catenary, mammillary, physiologic. Answer: catenary.</p>
<p class="gsrc">Source: Introduction.pdf slide 13 and the poll slide; transcript 08-19 poll 2</p></div></template>

<template data-x="kinds:physiologic"><div class="xexp"><h4>Physiologic (perfusion) model</h4>
<p><b>In one line:</b> A blood flow or perfusion model, built from known anatomic and physiologic data rather than from boxes.</p>
<dl>
<dt>What it is built from</dt><dd>Real organs, their blood flows and their volumes.</dd>
<dt>How it is drawn</dt><dd>Slide 12 draws one organ, with arterial blood flowing in, venous blood flowing out, and an arrow for elimination.</dd>
<dt>When it is used</dt><dd>It is shown and set aside: "Those require a little bit more input than what we want to do." The note on the slide marks the need for anatomic and physiologic data as the reason.</dd>
<dt>Against a compartment model</dt><dd>It is not a compartment model. Slide 13 lists the compartment models separately: mammillary and catenary.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> Only as a wrong option, in the poll about how compartments are joined. Choosing it there means the word "model" was matched without reading the wiring.</p>
<p class="gsrc">Source: Introduction.pdf slide 12; transcript 09-09 exam review</p></div></template>

<h3 data-exam="both">The dosing models, Module 2 to Module 6</h3>
<p class="sub">How the drug goes in decides the curve and the equation, so read the route first. Symbols in the table:</p>
<ul class="tlist"><li>C<sub>p</sub>: the plasma concentration. C<sub>p</sub><sup>0</sup> or C<sub>0</sub>: the concentration at time zero. C<sub>end</sub>: the concentration at the end of an infusion. C<sub>max</sub> and t<sub>max</sub>: the peak and the time of the peak.</li>
<li>C<sub>ss</sub>: the steady-state concentration, the plateau where rate in equals rate out. &infin;: at steady state. A half-life is the time for the concentration to fall by half.</li>
<li>k: the elimination rate constant. First order: the same fraction of what remains leaves each hour. k<sub>a</sub>: the absorption rate constant.</li>
<li>V<sub>D</sub>: the volume of distribution, the volume that links the amount in the body to the concentration. Cl: the clearance, the volume of plasma cleared of drug per hour.</li>
<li>D<sub>0</sub>: the dose. D<sub>L</sub>: the loading dose. R: the infusion rate in mg/hr. F: the bioavailability, the fraction of the dose that reaches the blood. &tau;: the dosing interval in hours.</li>
<li>A, B, &alpha;, &beta;: the two intercepts and two slopes of the two-segment log plot. A log axis is one whose concentration labels step by a factor of 10.</li></ul>
<ul class="tlist"><li><b>Why Modules 4 and 7a add no row.</b> A dosing model is a way the drug goes in. Module 4 (clearance, renal clearance) describes the way the drug goes out, which every model here shares as k, Cl and V<sub>D</sub>.</li>
<li>Module 7a (bioavailability) measures how much of an oral dose gets in: it sets the F that already sits in the two oral rows (M5 and M6a) and adds no new curve.</li>
<li>Module 1 is the arithmetic every row uses: zero against first order, half-life, and the area under the curve.</li></ul>
<table class="reftab"><thead><tr><th>Model (module)</th><th>How drug goes in</th><th>Curve shape</th><th>Defining equation</th><th>How to recognise it in a question</th></tr></thead><tbody>
<tr><td><b>One-compartment IV bolus</b> (M2) <button type="button" class="chip xwhy" data-xpick="dosing:m2-one">Why?</button></td><td>All at once; first order out</td><td>Highest at time zero, then falls; one straight line on a log axis</td><td>C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup></td><td>"IV bolus" with one compartment stated, or one straight line on a log axis</td></tr>
<tr><td><b>Two-compartment IV bolus</b> (M2) <button type="button" class="chip xwhy" data-xpick="dosing:m2-two">Why?</button></td><td>All at once; moves to tissue and back; first order out</td><td>On a log axis: a steep early fall, then a shallower straight line</td><td>C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup></td><td>A, B, &alpha;, &beta; or a two-exponential equation; the model is not named</td></tr>
<tr><td><b>IV infusion, one compartment</b> (M3) <button type="button" class="chip xwhy" data-xpick="dosing:m3-infusion">Why?</button></td><td>Constant rate (zero order) in; first order out</td><td>Starts at zero, rises, levels off at C<sub>ss</sub>; falls once stopped</td><td>C<sub>p</sub> = {{frac:R|Cl}}<span class="nw">(1 &minus; e<sup>&minus;kt</sup>)</span></td><td>A rate in mg/hr; "Recommend an infusion rate"; "after cessation of the infusion"</td></tr>
<tr><td><b>Loading dose with an infusion</b> (M3) <button type="button" class="chip xwhy" data-xpick="dosing:m3-loading">Why?</button></td><td>An IV bolus at the moment the infusion starts</td><td>Flat at C<sub>ss</sub> from the start, if the loading dose is right</td><td>D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub></td><td>"loading dose"; "reach &hellip; immediately"; bolus given "simultaneously"</td></tr>
<tr><td><b>Single oral dose, first-order absorption</b> (M5) <button type="button" class="chip xwhy" data-xpick="dosing:m5-oral">Why?</button></td><td>First order in (k<sub>a</sub>); first order out (k)</td><td>Rises to a peak (C<sub>max</sub> at t<sub>max</sub>), then falls</td><td>C<sub>p</sub> = {{frac:Fk<sub>a</sub>D<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}}<span class="nw">(e<sup>&minus;kt</sup> &minus; e<sup>&minus;k<sub>a</sub>t</sup>)</span></td><td>A capital F; a k<sub>a</sub> or absorption half-life; a curve with a peak</td></tr>
<tr><td><b>Repeated IV bolus</b> (M6) <button type="button" class="chip xwhy" data-xpick="dosing:m6-bolus">Why?</button></td><td>The same bolus dose every &tau; hours</td><td>Saw-tooth; peaks and troughs climb to a plateau in 3 to 5 half-lives</td><td>C<sub>max</sub><sup>&infin;</sup> = {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}</td><td>An IV dose "every 8 hours"; steady-state peak, trough or average asked</td></tr>
<tr><td><b>Intermittent IV infusion</b> (M6) <button type="button" class="chip xwhy" data-xpick="dosing:m6-infusion">Why?</button></td><td>Each dose infused at a constant rate over a set time</td><td>Rises during each infusion, falls after it; the next rise starts higher</td><td>C = C<sub>end</sub>e<sup>&minus;kt</sup>, one term per infusion</td><td>A dose "over 2 hours", and a second infusion started hours later</td></tr>
<tr><td><b>Multiple oral doses</b> (M6a) <button type="button" class="chip xwhy" data-xpick="dosing:m6a-oral">Why?</button></td><td>The same oral dose every &tau;; first order in, first order out</td><td>Rounded peaks and troughs climbing to a plateau</td><td>C<sub>max</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|V<sub>D</sub>}}<span class="nw">({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}})</span>e<sup>&minus;kt<sub>max</sub>&infin;</sup></td><td>F and k<sub>a</sub> with a dosing interval; first dose against steady state</td></tr>
</tbody></table>
<details class="figfold"><summary>See the eight curves side by side</summary>
{{fig:models_all|The eight dosing models drawn on the same axes with the same elimination rate constant, so only the way the drug goes in differs.}}
</details>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="dosing"><option value="">Choose a dosing model</option>
<option value="m2-one">One-compartment IV bolus (Module 2)</option>
<option value="m2-two">Two-compartment IV bolus (Module 2)</option>
<option value="m3-infusion">IV infusion, one compartment (Module 3)</option>
<option value="m3-loading">Loading dose with an infusion (Module 3)</option>
<option value="m5-oral">Single oral dose, first-order absorption (Module 5)</option>
<option value="m6-bolus">Repeated IV bolus (Module 6)</option>
<option value="m6-infusion">Intermittent IV infusion (Module 6)</option>
<option value="m6a-oral">Multiple oral doses (Module 6a)</option>
</select></label><div class="xout" data-xout="dosing"></div></div>

<template data-x="dosing:m2-one"><div class="xexp"><h4>One-compartment IV bolus (Module 2)</h4>
<p><b>In one line:</b> The whole dose is injected into a vein at once, spreads evenly through one compartment at once, and is removed by first-order elimination.</p>
{{fig:model_bolus1|One-compartment IV bolus: highest at time zero, then a first-order fall.}}
<p><button type="button" class="chip" data-jump="diag:dg-bolus1_steps">Step through it with her numbers</button></p>
<dl>
<dt>What it assumes</dt>
<dd>All of the dose enters the body at once: an intravenous (IV) bolus. The body acts as one uniform compartment that drug can enter and leave.</dd>
<dd>Elimination is first order: the rate of loss is proportional to what remains, so the same fraction leaves each hour. k is the overall elimination rate constant, k = k<sub>m</sub> + k<sub>e</sub>: metabolism plus excretion.</dd>
<dt>The curve</dt>
<dd>Highest at time zero, then falls. On evenly spaced axes it curves down; on a log concentration axis it is one straight line from time zero.</dd>
<dt>The equations you use</dt>
<dd><span class="xeq">C<sub>p</sub> = {{frac:D<sub>B</sub>|V<sub>D</sub>}}</span><span class="xnote">Gives the plasma concentration (C<sub>p</sub>) from the amount in the body (D<sub>B</sub>) and the apparent volume of distribution (V<sub>D</sub>). </span></dd>
<dd><span class="xnote">At time zero D<sub>B</sub> is the dose, D<sub>0</sub>, and C<sub>p</sub> is C<sub>0</sub>, the concentration at time zero, so V<sub>D</sub> = {{frac:D<sub>0</sub>|C<sub>0</sub>}}.</span></dd>
<dd><span class="xeq">C<sub>p</sub> = C<sub>p</sub><sup>0</sup>e<sup>&minus;kt</sup>, or ln C<sub>p</sub> = ln C<sub>p</sub><sup>0</sup> &minus; kt</span><span class="xnote">Gives k from two points, C<sub>p</sub><sup>0</sup> by back-extrapolation (extending the straight line of the log plot back to time zero), and C<sub>p</sub> at any time.</span></dd>
<dd><span class="xeq">t&frac12; = {{frac:0.693|k}}</span><span class="xnote">Gives the elimination half-life, the time for the concentration to fall by half. It is not on the equation sheet.</span></dd>
<dd><span class="xeq">Cl<sub>T</sub> = k &times; V<sub>D</sub></span><span class="xnote">Gives total body clearance, the volume of plasma cleared of drug per unit time (not on the sheet). Cl = {{frac:D<sub>0</sub>|AUC<sub>0&rarr;&infin;</sub>}} gives it from the dose and the area under the curve (AUC).</span></dd>
<dt>What you are usually asked to calculate</dt>
<dd>Her eight-part battery, in order: k, t&frac12;, C<sub>0</sub>, C<sub>p</sub> at 15 minutes, V<sub>D</sub>, Cl<sub>T</sub>, the amount in the body at 3 hours, and the time for 99.9% to be eliminated (ten half-lives).</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> "If I gave you a graph on a log scale that looks just like the blue line all by itself, that tells you it’s an IV bolus dose one compartment model."</p>
<p class="xtrap">The blue line on her slide is a single straight line on the log axis. Otherwise the stem names the model.</p>
<p class="gsrc">Source: 2IVBolusAdministration.pdf slides "One-Compartment Open Model: IV Bolus Administration", "Concentration of Drug in the Plasma, Cp", "Clearance"; transcript 08-24, 08-26; STYLE.md IV Bolus Practice 1 and 2</p></div></template>

<template data-x="dosing:m2-two"><div class="xexp"><h4>Two-compartment IV bolus (Module 2)</h4>
<p><b>In one line:</b> The dose is injected at once into a central compartment, moves into a tissue compartment and back, and is eliminated from the central compartment.</p>
{{fig:model_bolus2|Two-compartment IV bolus on a log axis: a steep distribution phase, then the elimination line.}}
<p><button type="button" class="chip" data-jump="diag:dg-twocpt_steps">Step through it with her numbers</button></p>
<dl>
<dt>What it assumes</dt>
<dd>An intravenous (IV) bolus of a drug that reaches different tissue groups at different rates, so distribution takes time. In Model A, the one she uses most, drug leaves the body from the central compartment only.</dd>
<dt>The curve</dt>
<dd>On a log concentration axis: a steep early fall (the distribution phase) that turns into a shallower straight line (the elimination phase). Alpha, the early slope, is the larger of the two.</dd>
<dt>The equations you use</dt>
<dd><span class="xeq">C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup></span><span class="xnote">Gives the plasma concentration (C<sub>p</sub>) at any time. A and B are the intercepts, in concentration units; a (&alpha;) and b (&beta;) are the slopes, in reciprocal time.</span></dd>
<dd><span class="xeq">C<sub>p</sub><sup>0</sup> = A + B</span><span class="xnote">Gives the concentration at time zero.</span></dd>
<dd><span class="xeq">t&frac12;<sub>&beta;</sub> = {{frac:0.693|b}}</span><span class="xnote">Gives the elimination half-life, the time for the concentration to fall by half, from the smaller exponent.</span></dd>
<dd><span class="xeq">V<sub>p</sub> = {{frac:D<sub>0</sub>|A + B}}</span><span class="xnote">Gives the volume of the central compartment (V<sub>p</sub>) from the dose (D<sub>0</sub>).</span></dd>
<dd><span class="xeq">k = {{frac:(A + B)ab|Ab + Ba}}</span><span class="xnote">Gives the elimination rate constant from the central compartment.</span></dd>
<dd><span class="xeq">k<sub>12</sub> = {{frac:AB(b &minus; a)<sup>2</sup>|(A + B)(Ab + Ba)}} and k<sub>21</sub> = {{frac:Ab + Ba|A + B}}</span><span class="xnote">Give the transfer rate constants, central to tissue and tissue to central.</span></dd>
<dt>What you are usually asked to calculate</dt>
<dd>The elimination half-life, the initial concentration, the concentration at a stated hour and the central volume, in that order. When A, B, &alpha; and &beta; come as a list she adds k, k<sub>12</sub> and k<sub>21</sub>.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> The stem is the equation, and it never says "two-compartment": "I am pretty much gonna give you A, B, alpha, beta." Her theophylline example: 11.14 mg/L at 3 hours, t&frac12;<sub>&beta;</sub> 4.33 hr.</p>
<p class="gsrc">Source: 2IVBolusAdministration.pdf slides "Examples of Two-Compartment Models", "Concentration of Drug in the Central Compartment", "Practice", "Beta Half-life", "Apparent Volumes of Distribution"; transcript 08-26</p></div></template>

<template data-x="dosing:m3-infusion"><div class="xexp"><h4>IV infusion, one compartment (Module 3)</h4>
<p><b>In one line:</b> Drug runs into a vein at a constant rate, so it goes in by a zero-order process and leaves by a first-order process, and the concentration climbs to a plateau.</p>
{{fig:model_infusion|IV infusion: climbs to the steady-state plateau, falls once the infusion stops.}}
<p><button type="button" class="chip" data-jump="diag:dg-infusion_steps">Step through it with her numbers</button></p>
<dl>
<dt>What it assumes</dt>
<dd>An intravenous (IV) input at a constant rate R (mg/hr), which is zero order. Elimination is first order, rate constant k: the rate of loss is proportional to what remains.</dd>
<dd>As drug builds up the rate out rises, until rate in equals rate out: steady state.</dd>
<dt>The curve</dt>
<dd>Starts at zero, rises quickly, then levels off at the steady-state concentration (C<sub>ss</sub>). When the infusion stops, it falls by first-order elimination from wherever it had reached.</dd>
<dt>The equations you use</dt>
<dd><span class="xeq">C<sub>ss</sub> = {{frac:R|Cl}} = {{frac:R|kV<sub>D</sub>}}</span><span class="xnote">Gives the plateau, from R and the clearance (Cl), or k and the volume of distribution (V<sub>D</sub>). It has no t in it.</span></dd>
<dd><span class="xnote">Cl is the volume of plasma cleared of drug per unit time; V<sub>D</sub> is the volume that links the amount in the body to the concentration.</span></dd>
<dd><span class="xeq">C<sub>p</sub> = {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>)</span><span class="xnote">Gives the plasma concentration t hours into the infusion. The bracket is the fraction of C<sub>ss</sub> reached.</span></dd>
<dd><span class="xeq">C<sub>p</sub> = C<sub>peak</sub>e<sup>&minus;kt</sup></span><span class="xnote">Gives the concentration t hours after the infusion stops, from C<sub>peak</sub>, the concentration at the moment it stopped.</span></dd>
<dd><span class="xeq">R = C<sub>ss</sub> &times; Cl</span><span class="xnote">The first line rearranged: gives the rate needed for a target C<sub>ss</sub>.</span></dd>
<dt>What you are usually asked to calculate</dt>
<dd>A rate to recommend for a target C<sub>ss</sub>; C<sub>ss</sub> from a rate; C<sub>p</sub> at a stated time into the infusion; the time to a stated fraction of C<sub>ss</sub>; C<sub>p</sub> a stated time after cessation.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> "Our input is zero order, constant in, first order out. When we stop the in, then it's just out."</p>
<p class="xtrap">Her stems give the level at the stop, or say it was at steady state, or give only the infusion time; with only a time, C<sub>peak</sub> is computed first.</p>
<p class="xtrap">Her final-review poll shows a curve rising to a labelled steady-state level and asks the type of drug input: instantaneous, first-order or zero-order. Her key: zero-order input.</p>
<p class="gsrc">Source: 3IntravenousInfusions.pdf slides "Intravenous Infusion", "Drug Concentration at Steady-State", "Drug Concentration Prior to Reaching Steady-State", "Drug Concentration after an IV Infusion has Ended"; transcript 09-02</p>
<p class="gsrc">Also: Final-Exam-Review-10.19.pdf slide 15; transcript 10-19; Canvas graded set Q5; IV-Infusions-Practice-4-Solutions.pdf part f</p></div></template>

<template data-x="dosing:m3-loading"><div class="xexp"><h4>Loading dose with an infusion (Module 3)</h4>
<p><b>In one line:</b> An IV bolus loading dose is given at the moment a constant-rate infusion starts, so the concentration is at the steady-state level at once, not after 3 to 5 half-lives.</p>
<p>The steady-state level is the plateau where rate in equals rate out. A half-life is the time for the concentration to fall by half.</p>
{{fig:model_loading|Loading dose with an infusion: flat at the steady-state level from the start; the dashed line is the infusion alone.}}
<p><button type="button" class="chip" data-jump="diag:dg-loading_steps">Step through it with her numbers</button></p>
<dl>
<dt>What it assumes</dt>
<dd>One compartment and first-order elimination (the rate of loss is proportional to what remains).</dd>
<dd>The intravenous (IV) bolus part, the dose put into the vein at one instant, falls as a bolus does, the infusion part builds as an infusion does, and the two concentrations add.</dd>
<dt>The curve</dt>
<dd>With the right loading dose the curve is flat at the steady-state concentration (C<sub>ss</sub>) from the start. The slide also draws doses that are too high (start above and fall) and too low (start below and rise).</dd>
<dt>The equations you use</dt>
<dd><span class="xeq">D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub></span><span class="xnote">Gives the loading dose (D<sub>L</sub>) from the target C<sub>ss</sub> and the volume of distribution (V<sub>D</sub>, the volume that links the amount in the body to the concentration).</span></dd>
<dd><span class="xeq">D<sub>L</sub> = {{frac:R|k}}</span><span class="xnote">Gives the same dose from an infusion rate R already chosen and the elimination rate constant k.</span></dd>
<dd><span class="xeq">C<sub>p</sub> = {{frac:D<sub>L</sub>|V<sub>D</sub>}}e<sup>&minus;kt</sup> + {{frac:R|kV<sub>D</sub>}}(1 &minus; e<sup>&minus;kt</sup>)</span><span class="xnote">Gives the concentration t hours after both start. The deck prints this sum; the sheet carries the two terms separately.</span></dd>
<dt>What you are usually asked to calculate</dt>
<dd>The loading dose and the infusion rate together, as one recommendation; or the concentration at 2, 4 and 6 hours after both start (her Example 8). Her Example 7 answer is 125 mg by both routes.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> "We want the loading dose to look like the amount of drug that's in the body at steady state."</p>
<p class="xtrap">If clearance (the volume of plasma cleared of drug per unit time) changes and V<sub>D</sub> does not, the rate changes and the loading dose does not.</p>
<p class="gsrc">Source: 3IntravenousInfusions.pdf slides "IV Bolus Loading Dose and Continuous IV Infusion", Examples 7 and 8; transcript 09-02, 09-09</p></div></template>

<template data-x="dosing:m5-oral"><div class="xexp"><h4>Single oral dose, first-order absorption (Module 5)</h4>
<p><b>In one line:</b> Drug is absorbed from the gut by a first-order process and eliminated by a first-order process, so the concentration rises to a peak and then falls.</p>
{{fig:model_oral|Single oral dose: rises to the peak at the time of the peak, then falls.}}
<p><button type="button" class="chip" data-jump="diag:dg-oral_steps">Step through it with her numbers</button></p>
<dl>
<dt>What it assumes</dt>
<dd>One compartment. Only the fraction F (bioavailability) of the dose reaches the blood.</dd>
<dd>Absorption (rate constant k<sub>a</sub>) and elimination (rate constant k) are both first order, each running at a rate proportional to what remains, and usually k<sub>a</sub> is much larger than k.</dd>
<dt>The curve</dt>
<dd>Starts at zero, rises to a peak, then falls. The peak is C<sub>max</sub>, at the time t<sub>max</sub>, where the rate in equals the rate out. Later only elimination is left.</dd>
<dt>The equations you use</dt>
<dd><span class="xeq">C<sub>p</sub> = {{frac:Fk<sub>a</sub>D<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}}(e<sup>&minus;kt</sup> &minus; e<sup>&minus;k<sub>a</sub>t</sup>)</span><span class="xnote">Gives the plasma concentration at any time, from the dose D<sub>0</sub> and the volume V<sub>D</sub>. The front factor is not C<sub>0</sub>, the dose over the volume, which is the concentration at time zero only for an IV bolus.</span></dd>
<dd><span class="xeq">t<sub>max</sub> = {{frac:ln(k<sub>a</sub> &divide; k)|k<sub>a</sub> &minus; k}}</span><span class="xnote">Gives the time of the peak. It holds no dose and no volume, so a larger dose does not move it.</span></dd>
<dd><span class="xeq">C<sub>max</sub></span><span class="xnote">Put t<sub>max</sub> into the C<sub>p</sub> equation. There is no separate single-dose C<sub>max</sub> equation.</span></dd>
<dd><span class="xeq">t&frac12;<sub>a</sub> = {{frac:0.693|k<sub>a</sub>}}</span><span class="xnote">Gives the absorption half-life, the time for the amount still to be absorbed to fall by half. Stems usually give it in minutes, so convert to hours first.</span></dd>
<dt>What you are usually asked to calculate</dt>
<dd>t<sub>max</sub> and then C<sub>max</sub>, always in that order; V<sub>D</sub> back-solved from a given front factor; and which way C<sub>max</sub>, t<sub>max</sub> and AUC (the area under the concentration-time curve) move when the dose, k<sub>a</sub> or k changes.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> "when you see a capital F, You should think oral." On a graph, a clear peak means oral input. Her Example 1: t<sub>max</sub> 2 hr, C<sub>max</sub> 12.17 mg/L.</p>
<p class="gsrc">Source: 5---Pharmacokinetics-of-Oral-Absorption.pdf slides "First-Order Absorption Model", "Cp vs. Time for a Single Oral Dose", Examples 1 and 2, "Summary"; transcript 09-21</p></div></template>

<template data-x="dosing:m6-bolus"><div class="xexp"><h4>Repeated IV bolus (Module 6)</h4>
<p><b>In one line:</b> The same IV bolus dose (the whole dose put into a vein at once) is given at a fixed interval (&tau;); each dose adds to what is left of the earlier ones until the peaks and troughs stop climbing at steady state.</p>
{{fig:model_mdbolus|Repeated IV bolus: a saw-tooth climbing to a plateau; the dashed line is the first dose alone.}}
<p><button type="button" class="chip" data-jump="diag:dg-md_bolus_steps">Step through it with her numbers</button></p>
<dl>
<dt>What it assumes</dt>
<dd>Superposition, which means the concentrations from separate doses add: elimination is first order (the rate of loss is proportional to what remains), and later doses do not change the drug's pharmacokinetics.</dd>
<dd>So each intravenous (IV) dose follows the first-dose curve.</dd>
<dt>The curve</dt>
<dd>A saw-tooth: each dose jumps up by C<sub>0</sub>, the first-dose peak, and falls first order until the next.</dd>
<dd>Peaks and troughs climb to a plateau in 3 to 5 half-lives (a half-life is the time for the concentration to fall by half), whatever the dose.</dd>
<dt>The equations you use</dt>
<dd><span class="xnote">Symbols: C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}, the first-dose peak, with D<sub>0</sub> the dose and V<sub>D</sub> the volume of distribution; &tau; the interval in hours (three times a day is &tau; = 8 hr); &infin; means steady state.</span></dd>
<dd><span class="xeq">C<sub>max</sub><sup>&infin;</sup> = {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}</span><span class="xnote">Gives the steady-state peak. {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} is the accumulation factor, the number of times the steady-state peak exceeds the first-dose peak.</span></dd>
<dd><span class="xeq">C<sub>min</sub><sup>&infin;</sup> = C<sub>max</sub><sup>&infin;</sup>e<sup>&minus;k&tau;</sup></span><span class="xnote">Gives the steady-state trough, one interval after the peak.</span></dd>
<dd><span class="xeq">C<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|V<sub>D</sub>k&tau;}}</span><span class="xnote">Gives the steady-state average (F, the bioavailability or fraction of the dose reaching the blood, is 1 for IV). It is not the midpoint of peak and trough.</span></dd>
<dd><span class="xeq">C<sub>p</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}({{frac:1 &minus; e<sup>&minus;nk&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}})e<sup>&minus;kt</sup></span><span class="xnote">Gives the concentration t hours after the n-th dose, before steady state.</span></dd>
<dt>What you are usually asked to calculate</dt>
<dd>The first-dose peak and trough, then C<sub>max</sub><sup>&infin;</sup>, C<sub>min</sub><sup>&infin;</sup> and C<sub>avg</sub><sup>&infin;</sup>, then a level before steady state and one after the last dose. Her Example 1: 53.3, 13.3 and 28.9 mg/L.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> On the time to plateau: "not 3 to 5 doses, 3 to 5 half-lives." Her check on the arithmetic: the steady-state peak must be greater than the first-dose peak.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf slides "Drug accumulation with repeated administration", "Superposition", "Concentration of Drug in the Body at Steady-State &hellip;", Example 1; transcript 09-23</p></div></template>

<template data-x="dosing:m6-infusion"><div class="xexp"><h4>Intermittent IV infusion (Module 6)</h4>
<p><b>In one line:</b> A repeated-dose regimen in which each dose is infused at a constant rate over a set time instead of pushed at once; the level rises during each infusion and falls after it.</p>
{{fig:model_intermit|Intermittent IV infusion: a rise during each infusion and a fall after it, each rise starting higher.}}
<p><button type="button" class="chip" data-jump="diag:dg-two_infusions_steps">Step through it with her numbers</button></p>
<dl>
<dt>What it assumes</dt>
<dd>Each intravenous (IV) infusion is a zero-order input (a constant rate in) for its duration. Elimination is first order (the rate of loss is proportional to what remains), so the contributions of separate infusions add.</dd>
<dd>It is used because many drugs are better tolerated infused slowly.</dd>
<dt>The curve</dt>
<dd>A rise during each infusion and a first-order fall after it. The second rise starts from what is left of the first, so it ends higher.</dd>
<dt>The equations you use</dt>
<dd><span class="xeq">C<sub>p</sub> = {{frac:R|V<sub>D</sub>k}}(1 &minus; e<sup>&minus;kt</sup>)</span><span class="xnote">Gives the concentration at the end of one infusion: t is the infusion time, and R (mg/hr) is the dose divided by the infusion time.</span></dd>
<dd><span class="xeq">C = C<sub>end</sub>e<sup>&minus;kt</sup></span><span class="xnote">Gives each infusion's contribution later, from its end-of-infusion value C<sub>end</sub>, with t measured from the end of that infusion. Add one term per infusion.</span></dd>
<dd><span class="xeq">C<sub>ss</sub> = {{frac:R|Cl}}</span><span class="xnote">Gives the plateau, with Cl the clearance (the volume of plasma cleared of drug per unit time), only if the same rate R ran without stopping; the short infusions never reach it.</span></dd>
<dt>What you are usually asked to calculate</dt>
<dd>The concentration at the end of the first infusion, then a stated time after the end of the second. Her Example 4: 17.28 mg/L, then 13.33 mg/L, with t = 10 hr and 4 hr for the two terms.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> She calls the rise "the same equation that we had when we talked about our single IV infusion."</p>
<p class="xtrap">She draws a number line so each infusion gets its own time; no accumulation factor ({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}, the repeated-bolus multiplier) is used.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf slides "Rationale", "Administering One or More Doses by IV Infusion", Example 4; transcript 09-28</p></div></template>

<template data-x="dosing:m6a-oral"><div class="xexp"><h4>Multiple oral doses (Module 6a)</h4>
<p><b>In one line:</b> The single-oral-dose model given again at a fixed interval (&tau;), with the accumulation factor attached; the peaks and troughs climb to a plateau.</p>
<p>The accumulation factor is {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}, the number of times the steady-state level exceeds the first-dose level.</p>
{{fig:model_mdoral|Multiple oral doses: rounded peaks and troughs climbing to a plateau; the dashed line is the first dose alone.}}
<p><button type="button" class="chip" data-jump="diag:dg-md_oral_steps">Step through it with her numbers</button></p>
<dl>
<dt>What it assumes</dt>
<dd>First-order absorption (k<sub>a</sub>) and first-order elimination (k), each at a rate proportional to what remains; a fraction F absorbed.</dd>
<dd>Superposition, which means the concentrations from separate doses add because later doses do not change k, k<sub>a</sub>, clearance (the volume of plasma cleared of drug per unit time) or the volume of distribution (V<sub>D</sub>).</dd>
<dt>The curve</dt>
<dd>Rounded peaks and troughs climbing to a plateau. The deck's figure shows dosing every 6 hours levelling off higher than every 8 hours, with k<sub>a</sub> and k unchanged.</dd>
<dt>The equations you use</dt>
<dd><span class="xeq">t<sub>max</sub><sup>&infin;</sup> = {{frac:1|k<sub>a</sub> &minus; k}} ln[{{frac:k<sub>a</sub>(1 &minus; e<sup>&minus;k&tau;</sup>)|k(1 &minus; e<sup>&minus;k<sub>a</sub>&tau;</sup>)}}]</span><span class="xnote">Gives the time of the steady-state peak (&infin; means steady state, the plateau where the peaks and troughs have stopped climbing). It holds &tau;, so a new interval gives a new t<sub>max</sub>.</span></dd>
<dd><span class="xeq">C<sub>max</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|V<sub>D</sub>}}({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}})e<sup>&minus;kt<sub>max</sub>&infin;</sup></span><span class="xnote">Gives the steady-state peak, from the dose D<sub>0</sub>.</span></dd>
<dd><span class="xeq">C<sub>min</sub><sup>&infin;</sup> = {{frac:k<sub>a</sub>FD<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}}({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}})e<sup>&minus;k&tau;</sup></span><span class="xnote">Gives the steady-state trough, at the end of the interval.</span></dd>
<dd><span class="xeq">C<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|Cl<sub>T</sub>&tau;}}</span><span class="xnote">Gives the steady-state average, with Cl<sub>T</sub> the total body clearance.</span></dd>
<dt>What you are usually asked to calculate</dt>
<dd>First-dose t<sub>max</sub> and C<sub>max</sub>, then t<sub>max</sub><sup>&infin;</sup>, C<sub>max</sub><sup>&infin;</sup>, C<sub>min</sub><sup>&infin;</sup> and C<sub>avg</sub><sup>&infin;</sup>. Her tetracycline t<sub>max</sub>: 3.1 hr for the first dose, 2.06 hr at steady state.</dd>
<dd>Which way a change of dose or of interval moves the steady-state level, the swing from peak to trough, and compliance.</dd>
</dl>
<p class="xtrap"><b>How she tests it:</b> F and t<sub>max</sub> mark the oral lines on the equation sheet: "Only for oral do you need to find T Max." She expects t<sub>max</sub> found first, even when it is not asked for.</p>
<p class="gsrc">Source: 6a---Multiple-Oral-Doses.pdf slides "Peak, Trough and Average Plasma Concentrations at Steady State", "Time to Peak at Steady State", Example 1, figure "Amount of drug in the body as a function of time"; transcript 09-28</p></div></template>

<h3 data-exam="1">Orders, rates and half-lives</h3>
<p class="sub">Four pairs about how fast drug leaves the body, and how to read that from a graph. A half-life (t&frac12;) is the time for the amount or concentration to fall by half.</p>
<table class="reftab"><thead><tr><th>Pair</th><th>First one</th><th>Second one</th></tr></thead><tbody>
<tr><td>Zero order vs first order <button type="button" class="chip xwhy" data-xpick="orders:zero-first">Why?</button></td><td>Falls at a constant rate; rate constant in mg/mL per day</td><td>Falls in proportion to what remains; k in hr<sup>&minus;1</sup></td></tr>
<tr><td>Half-life, zero order vs first order <button type="button" class="chip xwhy" data-xpick="orders:half-lives">Why?</button></td><td>t&frac12; = {{frac:C<sub>0</sub>|2k}}; changes with the starting concentration</td><td>t&frac12; = {{frac:0.693|k}}; the same at every concentration</td></tr>
<tr><td>Rate constant vs half-life <button type="button" class="chip xwhy" data-xpick="orders:k-thalf">Why?</button></td><td>k: reciprocal time, hr<sup>&minus;1</sup>; the larger k, the faster the fall</td><td>t&frac12; = {{frac:0.693|k}}: a time, in hr; the larger k, the shorter t&frac12;</td></tr>
<tr><td>Rate vs rate constant <button type="button" class="chip xwhy" data-xpick="orders:rate-k">Why?</button></td><td>Amount per time, such as mg/hr; changes along a first-order curve</td><td>First order: hr<sup>&minus;1</sup>; does not change; never negative</td></tr>
<tr><td>Straight line on linear vs semi-log axes <button type="button" class="chip xwhy" data-xpick="orders:axes">Why?</button></td><td>Concentration axis in equal steps: zero order</td><td>Labels step by 10 (1, 10, 100, 1000): first order</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="orders"><option value="">Choose a pair</option>
<option value="zero-first">Zero order vs first order</option>
<option value="half-lives">Half-life, zero order vs first order</option>
<option value="k-thalf">Rate constant vs half-life</option>
<option value="rate-k">Rate vs rate constant</option>
<option value="axes">Straight line on linear vs semi-log axes</option>
</select></label><div class="xout" data-xout="orders"></div></div>
<template data-x="orders:zero-first"><div class="xexp"><h4>Zero order vs first order</h4>
<p><b>In one line:</b> They differ in whether the rate depends on how much drug is present. Everything else follows from that one difference.</p>
<dl><dt>Zero order</dt><dd>The amount or concentration falls at a constant rate, and the rate does not depend on concentration. Its rate constant carries amount or concentration per unit time, such as mg/mL per day.</dd>
<dd>A straight line on linear axes; a curve on semi-logarithmic axes (concentration axis labelled 1, 10, 100, 1000; time axis in equal steps).</dd>
<dt>First order</dt><dd>The amount or concentration falls at a rate proportional to what remains. The rate is highest when the concentration is highest, and slows as the concentration falls.</dd>
<dd>Its rate constant, k, carries reciprocal time, hr<sup>&minus;1</sup>. A curve on linear axes; a straight line on semi-logarithmic axes.</dd>
<dt>The rate laws</dt><dd>Zero order: {{frac:dC|dt}} = &minus;k, with no concentration on the right, so the rate is the same at every level. First order: {{frac:dC|dt}} = &minus;kC, so the rate falls as C falls.</dd>
<dt>The quick test</dt><dd>Read the units of the rate constant, or check which axes make the line straight. Read the axis labels before the shape.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> A straight line on an axis labelled 1, 10, 100, 1000 is a first-order process on a semi-logarithmic scale, not a zero-order process. The axis will not say "log".</p>
<p class="xtrap">A second route to the error: the first-order <i>rate</i> is not constant, and the first-order <i>half-life</i> is. Learning "first order is the constant one" attaches it to the wrong quantity.</p>
<p class="xtrap">Her Quiz 1 select-all offers both {{frac:dC|dt}} = &minus;kC and {{frac:dC|dt}} = &minus;k; her final-review poll lists {{frac:dC|dt}} = &minus;k among the first-order options. Her key: "DCDT is equal to minus KC."</p>
<p class="gsrc">Source: Introduction.pdf slides 17, 18, 21; transcript 08-19, 08-24, 09-09, 10-19; Quiz 1 Q1 (STYLE.md); Final-Exam-Review-10.19.pdf slide 3</p></div></template>
<template data-x="orders:half-lives"><div class="xexp"><h4>Half-life, zero order vs first order</h4>
<p><b>In one line:</b> They differ in whether the starting concentration appears in the half-life (t&frac12;) formula; a half-life is the time for the concentration to fall by half.</p>
<dl><dt>Zero-order half-life</dt><dd>t&frac12; = {{frac:C<sub>0</sub>|2k}}, with C<sub>0</sub> the starting concentration and k the rate constant. Because it contains C<sub>0</sub>, it changes when the starting concentration changes, and falls as the concentration falls.</dd>
<dt>First-order half-life</dt><dd>t&frac12; = {{frac:0.693|k}}. It has no concentration term, so it is the same at every concentration. Her reason: 0.693 is a constant and k is a constant, and a constant divided by a constant is a constant.</dd>
<dt>The quick test</dt><dd>Is there a C<sub>0</sub> in the formula? If there is, the half-life depends on where the curve starts, and the process is zero order.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> On a zero-order data set, answering {{frac:0.693|k}} uses a relation that does not apply to a process whose rate does not depend on concentration.</p>
<p class="xtrap">The reverse error is asking for C<sub>0</sub> on a first-order problem. Both suggest the order was classified from the equation reached for, not from the data.</p>
<p class="gsrc">Source: Introduction.pdf slide 19; transcript 08-19 worked examples (g) and (h), 09-09</p></div></template>
<template data-x="orders:rate-k"><div class="xexp"><h4>Rate vs rate constant</h4>
<p><b>In one line:</b> They differ in whether the number changes as the concentration changes.</p>
<dl><dt>Rate</dt><dd>How much drug leaves per unit time. For a first-order process (one whose rate is proportional to what remains) it changes throughout the curve.</dd>
<dt>Rate constant</dt><dd>The proportionality factor in the rate law, the equation that links the rate to the concentration. It does not change with concentration, and it is never negative, whichever order it belongs to.</dd>
<dt>The quick test</dt><dd>Their units differ, which is the quickest way to decide which one a number is. For a first-order process the rate is an amount per time and the rate constant, k, is in hr<sup>&minus;1</sup>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> A select-all about first-order processes offers "a constant rate of elimination". The rate of a first-order process is constantly changing; what is constant is the half-life.</p>
<p class="xtrap">A negative rate constant means the minus sign of the rate law has been folded into the constant.</p>
<p class="gsrc">Source: transcript 08-19 polls 4 and 5, 08-26 paper quiz question 2</p></div></template>
<template data-x="orders:axes"><div class="xexp"><h4>Straight line on linear vs semi-log axes</h4>
<p><b>In one line:</b> Which axis is logarithmic decides what a straight line means.</p>
<dl><dt>Straight on linear axes</dt><dd>The axes step by equal increments. A straight line here is a zero-order process, one that falls by a fixed amount per unit time.</dd>
<dt>Straight on semi-logarithmic axes</dt><dd>Only the concentration axis is logarithmic. Its labels step by a factor of 10, not by equal increments, and the word "log" is usually not printed.</dd>
<dd>A first-order curve (one that falls in proportion to what remains) replotted on it is straight.</dd>
<dt>The quick test</dt><dd>Read the concentration axis labels: equal steps, or steps by a factor of 10.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick is concluding zero order from any straight line. She names this directly: read the scale before deciding.</p>
<p class="gsrc">Source: Introduction.pdf slide 21; transcript 08-19, 08-26, 09-09 cue 13</p></div></template>

<template data-x="orders:k-thalf"><div class="xexp"><h4>Rate constant vs half-life</h4>
<p><b>In one line:</b> For a first-order process k is a fraction lost per unit time and the half-life is a time; each is found from the other with 0.693.</p>
<dl><dt>Rate constant, k</dt><dd>Carries reciprocal time: hr<sup>&minus;1</sup>, or day<sup>&minus;1</sup> when time is in days. A larger k means a faster fall.</dd>
<dt>Half-life, t&frac12;</dt><dd>The time for the concentration or amount to fall by half: t&frac12; = {{frac:0.693|k}}, in hours or days. A larger k gives a shorter half-life.</dd>
<dt>The quick test</dt><dd>A half-life answer carries a time unit with no minus one. A number in hr<sup>&minus;1</sup> is a k. A half-life given in a stem becomes k = {{frac:0.693|t&frac12;}} before it goes into an exponent.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> She names the unit error at the Exam 1 review: "It is a time, so it is not days to the minus one." From the first week: "I expect you to give me half-life in units of time."</p>
<p class="gsrc">Source: Introduction.pdf slide 19; transcript 08-19 cue 3, 09-09 cue 7</p></div></template>

<h3 data-exam="2">The elimination vocabulary</h3>
<p class="sub">Words for the drug leaving the body, and the one quantity that stays constant while the rate changes. Excretion is drug leaving unchanged; metabolism is drug chemically changed; distribution is drug moving to and from the tissues.</p>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>Excretion, biotransformation, elimination, disposition <button type="button" class="chip xwhy" data-xpick="elimination:four-words">Why?</button></td><td>Excretion + metabolism = elimination; elimination + distribution = disposition</td></tr>
<tr><td>Clearance vs rate of elimination <button type="button" class="chip xwhy" data-xpick="elimination:cl-rate">Why?</button></td><td>Clearance is a volume per time and constant; the rate is an amount per time and changes</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="elimination"><option value="">Choose a pair</option>
<option value="four-words">Excretion, biotransformation, elimination, disposition</option>
<option value="cl-rate">Clearance vs rate of elimination</option>
</select></label><div class="xout" data-xout="elimination"></div></div>
<template data-x="elimination:four-words"><div class="xexp"><h4>Excretion, biotransformation, elimination and disposition</h4>
<p><b>In one line:</b> The four words cover more and more of the drug's pathway, and only biotransformation changes the drug chemically.</p>
<dl><dt>Excretion</dt><dd>Removal of the intact drug or metabolite, with no chemical change.</dd>
<dt>Biotransformation</dt><dd>Also called metabolism: chemical conversion of one species to another.</dd>
<dt>Elimination</dt><dd>The irreversible loss of drug from the body by all routes. It contains both excretion and biotransformation. Her summary: <i>"Metabolism and excretion are both elimination terms &hellip; Elimination is kind of our catch-all."</i></dd>
<dt>Disposition</dt><dd>Everything that happens to the drug after systemic absorption, which is distribution plus elimination.</dd>
<dt>The quick test</dt><dd>Excretion plus metabolism is elimination; elimination plus distribution is disposition. Distribution is reversible, so it belongs to disposition and not to elimination.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick treats the four as interchangeable words for "the drug leaving". Choosing excretion where elimination is meant drops metabolism; choosing elimination where disposition is meant drops distribution.</p>
<p class="xtrap">Answering "disposition" to a question about irreversible loss includes a reversible process, since distribution is reversible by definition.</p>
<p class="gsrc">Source: Introduction.pdf slides 4 and 5; 4---Clearance-and-Elimination.pdf slide 3; transcript 08-17, 09-14</p></div></template>
<template data-x="elimination:cl-rate"><div class="xexp"><h4>Clearance vs rate of elimination</h4>
<p><b>In one line:</b> They differ in whether the quantity stays constant as the concentration changes.</p>
<dl><dt>Clearance (Cl)</dt><dd>The proportionality factor between the rate of elimination and the plasma concentration, C<sub>p</sub>. It stays constant for a first-order process (one whose rate is proportional to what remains), which is why she prefers working with it.</dd>
<dt>Rate of elimination</dt><dd>Cl &times; C<sub>p</sub>. It changes as the concentration changes.</dd>
<dt>The quick test</dt><dd>Clearance is a volume per unit time; the rate of elimination is an amount per unit time.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick is answering true to "clearance increases as concentration increases". Changing the concentration changes the elimination rate, not the clearance. The same error produces a clearance quoted in mg/hr.</p>
<p class="gsrc">Source: 2IVBolusAdministration.pdf slide "Clearance"; 4---Clearance-and-Elimination.pdf slide 5; transcript 08-24 poll 2</p></div></template>

<h3 data-exam="both">The rate constants</h3>
<p class="sub">Symbols that look alike, separated by the process each one describes and whether it is a slope or an intercept. Symbols in the table:</p>
<ul class="tlist"><li>k, k<sub>e</sub>, k<sub>m</sub> and k<sub>a</sub>: the rate constants for overall elimination, excretion, metabolism and absorption.</li>
<li>a, b and A, B: the slopes and the intercepts of the two straight segments of the log plot after a two-compartment IV bolus.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>k, k<sub>e</sub>, k<sub>m</sub>, k<sub>a</sub> <button type="button" class="chip xwhy" data-xpick="rate-constants:k-family">Why?</button></td><td>k = k<sub>m</sub> + k<sub>e</sub> (all elimination); only k<sub>a</sub> points into the body</td></tr>
<tr><td>alpha vs beta, and A vs B <button type="button" class="chip xwhy" data-xpick="rate-constants:alpha-beta">Why?</button></td><td>Lower-case a, b: slopes in hr<sup>&minus;1</sup>; capital A, B: intercepts in concentration units</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="rate-constants"><option value="">Choose a pair</option>
<option value="k-family">k, ke, km, ka</option>
<option value="alpha-beta">alpha vs beta, and A vs B</option>
</select></label><div class="xout" data-xout="rate-constants"></div></div>
<template data-x="rate-constants:k-family"><div class="xexp"><h4>k, k<sub>e</sub>, k<sub>m</sub> and k<sub>a</sub></h4>
<p><b>In one line:</b> They differ in which process each one counts and which direction it points. All four carry reciprocal time, so the units cannot separate them.</p>
<dl><dt>k</dt><dd>An unsubscripted k is the overall elimination rate constant, with every route of loss included: k = k<sub>m</sub> + k<sub>e</sub>.</dd>
<dt>k<sub>e</sub></dt><dd>The rate constant for excretion alone, obtained as f<sub>e</sub>k, where f<sub>e</sub> is the fraction of the dose excreted unchanged in urine.</dd>
<dt>k<sub>m</sub></dt><dd>The rate constant for metabolism alone.</dd>
<dt>k<sub>a</sub></dt><dd>The first-order rate constant for absorption, and the only one that points into the body. It appears only for extravascular dosing (a dose given outside the blood vessels, as by mouth).</dd>
<dt>The quick test</dt><dd>Ask which process the number belongs to: all loss (k), excretion only (k<sub>e</sub>), metabolism only (k<sub>m</sub>), or absorption (k<sub>a</sub>).</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick uses k<sub>e</sub> where k belongs in a half-life (the time for the concentration to fall by half, {{frac:0.693|k}}).</p>
<p class="xtrap">k<sub>e</sub> is a component of k, so {{frac:0.693|k<sub>e</sub>}} is longer than the elimination half-life and is not a quantity the course asks for.</p>
<p class="xtrap">Using k<sub>a</sub> where k belongs swaps the two exponentials in the oral equation. In oral problems she supplies both half-lives; converting one and reusing it twice misses that two rate constants are in play.</p>
<p class="gsrc">Source: 2IVBolusAdministration.pdf slide "One-Compartment Open Model"; 4---Clearance-and-Elimination.pdf slide 10; 5---Pharmacokinetics-of-Oral-Absorption.pdf slide "First-Order Absorption Model"; transcript 08-24, 09-14, 09-21</p></div></template>
<template data-x="rate-constants:alpha-beta"><div class="xexp"><h4>alpha vs beta, and A vs B</h4>
<p><b>In one line:</b> In C<sub>p</sub> = Ae<sup>&minus;at</sup> + Be<sup>&minus;bt</sup>, the two-compartment IV bolus equation, where C<sub>p</sub> is the plasma concentration, the lower-case letters are slopes and the capitals are intercepts.</p>
<p>The slopes belong to the two straight segments of the log plot; the intercepts are where those segments meet the concentration axis.</p>
<dl><dt>alpha (a) and A</dt><dd>Alpha is the larger slope, because distribution happens faster than elimination. The alpha term, with intercept A, describes the distribution phase.</dd>
<dt>beta (b) and B</dt><dd>Beta is the terminal slope and is the elimination rate constant, so the elimination half-life (the time for the concentration to fall by half) is {{frac:0.693|b}}.</dd>
<dd>A and B are obtained by extrapolation, and C<sub>0</sub>, the concentration at time zero, is A + B.</dd>
<dt>The quick test</dt><dd>Slopes carry reciprocal time; intercepts carry concentration units. Divide 0.693 by the smaller slope, b.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick divides 0.693 by the larger number. That returns the distribution half-life, which she says is not what is wanted.</p>
<p class="xtrap">She gives all four values rather than asking for feathering (the method of residuals: subtracting the back-extrapolated terminal line from the observed points to get the early line), so the only work is deciding which is which.</p>
<p class="xtrap">Adding a slope to an intercept, or reporting A + B in reciprocal time, means the four symbols were read as interchangeable constants, not as two slope-intercept pairs.</p>
<p class="gsrc">Source: 2IVBolusAdministration.pdf slides "Concentration of Drug in the Central Compartment" and "Beta Half-life"; transcript 08-26, 09-09 cue 12</p></div></template>

<h3 data-exam="1">The volumes</h3>
<p class="sub">Volumes, separated by how many compartments the model has and which compartment the volume belongs to. A volume of distribution is the volume that links the amount of drug in a compartment to the measured concentration.</p>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>Amount in the body (D<sub>B</sub>) vs concentration (C<sub>p</sub>) <button type="button" class="chip xwhy" data-xpick="volumes:amount-conc">Why?</button></td><td>D<sub>B</sub> in mg; C<sub>p</sub> in mg/L; D<sub>B</sub> = C<sub>p</sub> &times; V<sub>D</sub></td></tr>
<tr><td>V<sub>D</sub>, V<sub>p</sub>, V<sub>t</sub>, and the two routes to V<sub>p</sub> <button type="button" class="chip xwhy" data-xpick="volumes:vd-vp-vt">Why?</button></td><td>One compartment: V<sub>D</sub>. Two: V<sub>p</sub> (central) and V<sub>t</sub> (tissue). All in litres</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="volumes"><option value="">Choose a set</option>
<option value="amount-conc">Amount in the body vs concentration</option>
<option value="vd-vp-vt">VD, Vp, Vt, and the two routes to Vp</option>
</select></label><div class="xout" data-xout="volumes"></div></div>
<template data-x="volumes:vd-vp-vt"><div class="xexp"><h4>V<sub>D</sub>, V<sub>p</sub> and V<sub>t</sub>, and the two routes to V<sub>p</sub></h4>
<p><b>In one line:</b> They differ in how many compartments the model has and which compartment the volume belongs to. All three are volumes, reported in litres.</p>
<dl><dt>V<sub>D</sub></dt><dd>The apparent volume of distribution of a one-compartment model: V<sub>D</sub> = {{frac:D<sub>B</sub>|C<sub>p</sub>}}, with D<sub>B</sub> the amount of drug in the body and C<sub>p</sub> the plasma concentration.</dd>
<dd>A hypothetical volume, not a real one: a proportionality constant relating the amount in the body to the measured concentration.</dd>
<dt>V<sub>p</sub></dt><dd>The volume of the central compartment of a two-compartment model. With the intercepts A and B of the two-segment log plot supplied, V<sub>p</sub> = {{frac:D<sub>0</sub>|A + B}}, where D<sub>0</sub> is the dose.</dd>
<dd>With a dose and an area under the curve (AUC) supplied, V<sub>p</sub> = {{frac:D<sub>0</sub>|k &times; AUC}}, where k is the elimination rate constant.</dd>
<dt>V<sub>t</sub></dt><dd>The volume of the tissue compartment: V<sub>t</sub> = {{frac:V<sub>p</sub>k<sub>12</sub>|k<sub>21</sub>}}, with k<sub>12</sub> and k<sub>21</sub> the transfer rate constants, central to tissue and tissue to central.</dd>
<dt>The quick test</dt><dd>Count the compartments first: one gives V<sub>D</sub>; two give V<sub>p</sub> and V<sub>t</sub>. Then pick the V<sub>p</sub> route that matches the data supplied.</dd>
<dt>Reading the size</dt><dd>A large V<sub>D</sub> means the drug is more concentrated in extravascular tissue and less concentrated intravascularly. A small V<sub>D</sub> means it is bound to plasma protein or otherwise held in the vascular region.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick divides the dose by a single measured concentration in a two-compartment problem. That uses a concentration from part way down the curve, not the intercept sum A + B, and returns neither V<sub>p</sub> nor V<sub>D</sub>.</p>
<p class="xtrap">Reporting a volume in kilograms comes from the percent-of-body-weight framing: 1 L is taken as 1 kg for the arithmetic, but the answer is still a volume. Reading the size the other way round inverts where the drug has gone.</p>
<p class="gsrc">Source: 2IVBolusAdministration.pdf slides "Volume of Distribution" and "Apparent Volumes of Distribution"; transcript 08-24, 08-26, 09-09</p></div></template>

<template data-x="volumes:amount-conc"><div class="xexp"><h4>Amount in the body vs concentration</h4>
<p><b>In one line:</b> The amount is a mass and the concentration is a mass per volume; the volume of distribution (V<sub>D</sub>) converts one into the other.</p>
<dl><dt>Amount in the body, D<sub>B</sub></dt><dd>Milligrams of drug in the body at a time. Just after an IV bolus (the whole dose put into a vein at once) it is the dose, D<sub>0</sub>. The sheet's amount line is D = D<sub>0</sub>e<sup>&minus;kt</sup>.</dd>
<dt>Concentration, C<sub>p</sub></dt><dd>Milligrams per litre of plasma. Her definition: "a concentration in this class is going to be some amount divided by some volume". The sheet's line is C = C<sub>0</sub>e<sup>&minus;kt</sup>.</dd>
<dt>The quick test</dt><dd>Keep amounts with amounts and concentrations with concentrations; cross between them with C<sub>p</sub> = {{frac:D<sub>B</sub>|V<sub>D</sub>}}.</dd>
<dd>Her example: a 200 mg dose, 15 mg/L at 6 hours, V<sub>D</sub> 8 L. The amount at 6 hours is 8 L &times; 15 mg/L = 120 mg, so k = {{frac:ln(200 &divide; 120)|6 hr}} = 0.085 hr<sup>&minus;1</sup>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her warning on that example: "you gotta be apples to apples here, right? You can either go with amount. Or concentration, but you got, you can't do the 200 and the 15."</p>
<p class="xtrap">The same example asks the amount at 12 hours, about 72 mg, then the concentration, 72 mg &divide; 8 L = 9 mg/L: two answers in two units.</p>
<p class="gsrc">Source: 2IVBolusAdministration.pdf slide "Concentration of Drug in the Plasma, Cp"; equation sheet page 1; transcript 08-24 cues 6 and 7, worked example (b)</p></div></template>

<h3 data-exam="2">Clearance and the kidney</h3>
<p class="sub">Clearances, kidney processes and fractions, separated by whose clearance it is and which way the drug moves. A clearance is the volume of plasma cleared of drug per unit time. GFR, the glomerular filtration rate, is how fast the kidney filters plasma.</p>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>Total, renal, hepatic clearance, and f<sub>e</sub> <button type="button" class="chip xwhy" data-xpick="kidney:cl-split">Why?</button></td><td>Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub>; f<sub>e</sub> has no units, so it is not a clearance</td></tr>
<tr><td>A change in clearance vs the half-life <button type="button" class="chip xwhy" data-xpick="kidney:cl-thalf">Why?</button></td><td>t&frac12; = {{frac:0.693V<sub>D</sub>|Cl}}: clearance up, half-life down; clearance down, half-life up</td></tr>
<tr><td>Renal clearance vs creatinine clearance <button type="button" class="chip xwhy" data-xpick="kidney:renal-crcl">Why?</button></td><td>The drug's clearance by the kidney vs an estimate of the patient's kidney function</td></tr>
<tr><td>Filtration, active secretion, reabsorption <button type="button" class="chip xwhy" data-xpick="kidney:three-processes">Why?</button></td><td>Cl<sub>R</sub> near 120 mL/min: filtration; above: secretion too; below: reabsorption</td></tr>
<tr><td>Creatinine vs inulin for measuring GFR (glomerular filtration rate) <button type="button" class="chip xwhy" data-xpick="kidney:creat-inulin">Why?</button></td><td>Inulin: given, almost fully filtered. Creatinine: already present, also secreted</td></tr>
<tr><td>Capital F vs lower-case f<sub>e</sub> <button type="button" class="chip xwhy" data-xpick="kidney:f-fe">Why?</button></td><td>F: fraction reaching systemic circulation; f<sub>e</sub>: fraction unchanged in urine</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="kidney"><option value="">Choose a pair</option>
<option value="cl-split">Total, renal, hepatic clearance, and fe</option>
<option value="cl-thalf">A change in clearance vs the half-life</option>
<option value="renal-crcl">Renal clearance vs creatinine clearance</option>
<option value="three-processes">Filtration, active secretion, reabsorption</option>
<option value="creat-inulin">Creatinine vs inulin for measuring GFR</option>
<option value="f-fe">Capital F vs lower-case fe</option>
</select></label><div class="xout" data-xout="kidney"></div></div>
<template data-x="kidney:cl-split"><div class="xexp"><h4>Total, renal and hepatic clearance, and f<sub>e</sub></h4>
<p><b>In one line:</b> They differ in which organ is clearing the drug, and in whether the number is a clearance at all.</p>
<dl><dt>Total clearance</dt><dd>Cl with no subscript, or Cl<sub>T</sub>, is total body clearance, the volume of plasma cleared of drug per unit time by all routes, and equals Cl<sub>R</sub> + Cl<sub>H</sub>, the renal plus the hepatic clearance.</dd>
<dt>Renal clearance</dt><dd>Cl<sub>R</sub> = f<sub>e</sub>Cl<sub>T</sub>, the part cleared by the kidney.</dd>
<dt>Hepatic clearance</dt><dd>Cl<sub>H</sub> = (1 &minus; f<sub>e</sub>)Cl<sub>T</sub>, the part cleared by the liver. It is obtained by subtraction, not by measurement, because the liver is not sampled.</dd>
<dt>f<sub>e</sub></dt><dd>Not a clearance: the fraction of the dose recovered unchanged in urine, f<sub>e</sub> = {{frac:D<sub>u</sub>|FD<sub>0</sub>}}, with D<sub>u</sub> the amount recovered unchanged, F the bioavailability factor (the fraction of the dose that reaches the blood; 1 for an IV dose) and D<sub>0</sub> the dose.</dd>
<dd>f<sub>e</sub> also equals {{frac:k<sub>e</sub>|k}}, the excretion rate constant over the overall elimination rate constant, and it has no units.</dd>
<dt>The quick test</dt><dd>A clearance carries volume per time; f<sub>e</sub> has no units. Cl<sub>R</sub> and Cl<sub>H</sub> add up to Cl<sub>T</sub>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick reports f<sub>e</sub> with units, or a renal clearance where the fraction was asked for. Both read f<sub>e</sub> as a rate of urinary loss instead of a share of the dose with no units.</p>
<p class="xtrap">Computing hepatic clearance from a liver measurement means the additivity route was not used. No such measurement is given in this course.</p>
<p class="xtrap">Her final-review poll: "Hepatic clearance is most readily approximated with creatinine clearance." Her key is False: hepatic clearance is total minus renal, and creatinine clearance estimates the patient's renal function.</p>
<p class="gsrc">Source: 4---Clearance-and-Elimination.pdf slides 8, 9, 10, 11; transcript 09-14, 10-19; Final-Exam-Review-10.19.pdf slide 11</p></div></template>
<template data-x="kidney:renal-crcl"><div class="xexp"><h4>Renal clearance vs creatinine clearance</h4>
<p><b>In one line:</b> They differ in whose clearance is being estimated: the drug's, or the patient's kidney function.</p>
<dl><dt>Renal clearance</dt><dd>The clearance of the drug by the kidney (the volume of plasma the kidney clears of drug per unit time), obtained from f<sub>e</sub> (the fraction excreted unchanged) and the total clearance.</dd>
<dd>Worked in L/hr, then given in mL/min when it is set against 120 mL/min.</dd>
<dt>Creatinine clearance</dt><dd>An estimate of the patient's glomerular filtration rate (how fast the kidney filters plasma), and so of the patient's renal function, obtained from Cockcroft-Gault, the equation that uses age, ideal body weight, serum creatinine and sex.</dd>
<dd>It is about the patient, not about the drug, and is quoted in mL/min.</dd>
<dt>The quick test</dt><dd>Ask what is being cleared: the drug, or creatinine as a measure of the patient's kidneys. Both can be given in mL/min, so the units do not separate them.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick feeds a drug's f<sub>e</sub> into Cockcroft-Gault, or compares a renal clearance in L/hr with 120 mL/min, the average filtration rate, without converting.</p>
<p class="xtrap">She warns that <i>"things get a little blurry when we're talking about renal clearance"</i>.</p>
<p class="gsrc">Source: 4---Clearance-and-Elimination.pdf slides 9 and 15; transcript 09-14 cues 6 and 8</p></div></template>
<template data-x="kidney:three-processes"><div class="xexp"><h4>Glomerular filtration, active tubular secretion and tubular reabsorption</h4>
<p><b>In one line:</b> They differ in which direction the drug moves, and in whether energy is required.</p>
<dl><dt>Glomerular filtration</dt><dd>Passive diffusion across the glomerulus. It averages 120 mL/min and adds drug to the tubular fluid.</dd>
<dt>Active tubular secretion</dt><dd>Moves drug from the blood into the urine using a transporter. It requires energy, adds drug to the tubular fluid, and adds to what filtration removes.</dd>
<dt>Tubular reabsorption</dt><dd>Moves drug from the urine back into the bloodstream, so it subtracts.</dd>
<dt>The quick test</dt><dd>Compare the renal clearance, Cl<sub>R</sub>, with 120 mL/min. Above it, secretion is contributing on top of filtration; below it, some drug is being reabsorbed.</dd>
<dd>Her tolerance on the number: 119 or 121 counts as filtration; 250 means secretion.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick treats a renal clearance below 120 mL/min as reduced filtration. Within this rule the comparison is against the filtration rate itself, so a value below it points to drug returning to the blood.</p>
<p class="xtrap">Concluding secretion from a value near 120 means the stated tolerance was not applied. Calling reabsorption an active process adds a transporter the deck does not put there.</p>
<p class="gsrc">Source: 4---Clearance-and-Elimination.pdf slides 12, 13, 18, 19; transcript 09-14 cue 9</p></div></template>
<template data-x="kidney:creat-inulin"><div class="xexp"><h4>Creatinine vs inulin for measuring GFR</h4>
<p><b>In one line:</b> Glomerular filtration rate (GFR) is measured with a substance cleared by filtration only, neither reabsorbed nor secreted; the two markers differ in how closely they meet that.</p>
<dl><dt>Inulin</dt><dd>Almost completely filtered, so it is the better marker. But it is not native to the body and has to be administered, which makes the procedure more involved.</dd>
<dt>Creatinine</dt><dd>Comes from the breakdown of muscle and is already present, which is why it is the common clinical choice. It is also secreted, so it gives an estimate, not a direct measurement.</dd>
<dt>The quick test</dt><dd>Given to the patient and almost completely filtered: inulin. Already in the body and partly secreted: creatinine. The deck slide states that both are used clinically.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick calls creatinine clearance a measurement of GFR rather than an estimate of it. The secretion of creatinine is the reason for the word "estimate".</p>
<p class="xtrap">It is also why Cockcroft-Gault, the equation that estimates creatinine clearance from age, ideal body weight, serum creatinine and sex, carries assumptions she names.</p>
<p class="xtrap">The assumptions: the 0.85 female factor, and that a serum creatinine may not represent renal function in a person with unusually low or unusually high muscle mass.</p>
<p class="gsrc">Source: 4---Clearance-and-Elimination.pdf slide 14; transcript 09-14</p></div></template>
<template data-x="kidney:f-fe"><div class="xexp"><h4>Capital F vs lower-case f<sub>e</sub></h4>
<p><b>In one line:</b> They differ in what fraction of what. Both are dimensionless, so units do not distinguish them.</p>
<dl><dt>Capital F</dt><dd>The bioavailability factor: the fraction of the dose that reaches systemic circulation. It is taken as 1 for an intravenous (IV) dose.</dd>
<dt>Lower-case f<sub>e</sub></dt><dd>The fraction of the dose excreted unchanged in the urine. Her own separation: <i>"lowercase fe is our fraction excreted, capital F is our bioavailability factor."</i></dd>
<dt>The quick test</dt><dd>Ask whether the fraction is about getting into the circulation (F) or leaving unchanged in the urine (f<sub>e</sub>).</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick sets F to the urinary recovery fraction in a clearance calculation (clearance: the volume of plasma cleared of drug per unit time).</p>
<p class="xtrap">On an IV problem F is 1 whatever the urine shows, and f<sub>e</sub> then splits that clearance into renal and hepatic parts.</p>
<p class="xtrap">A capital F in a stem points to an oral dose.</p>
<p class="gsrc">Source: 4---Clearance-and-Elimination.pdf slides 7 and 10; transcript 09-14, 09-21 cue 9</p></div></template>

<template data-x="kidney:cl-thalf"><div class="xexp"><h4>A change in clearance vs the half-life</h4>
<p><b>In one line:</b> With the volume of distribution unchanged, the half-life moves opposite to the clearance, because clearance sits in the denominator of t&frac12; = {{frac:0.693V<sub>D</sub>|Cl}}.</p>
<dl><dt>The relation</dt><dd>Cl = kV<sub>D</sub>, which she expects known without the sheet, so k = {{frac:Cl|V<sub>D</sub>}} and t&frac12; = {{frac:0.693|k}} = {{frac:0.693V<sub>D</sub>|Cl}}.</dd>
<dt>Clearance falls</dt><dd>Renal impairment lowers the renal clearance and with it the total clearance; k falls and the half-life rises.</dd>
<dd>Her IV Infusions Practice 4(g): Cl<sub>T</sub> from 11.55 to 8.55 L/hr with V<sub>D</sub> 100 L takes k from 0.1155 to 0.0855 hr<sup>&minus;1</sup>, a half-life from 6 hr to 8.1 hr.</dd>
<dt>Clearance rises</dt><dd>k rises and the half-life falls.</dd>
<dt>The quick test</dt><dd>Read the direction word for the clearance in the stem and give the half-life the opposite direction. V<sub>D</sub> stays as it was unless the stem says it changed.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Quiz 3: "If there is an increase in the total body clearance of an agent due to renal dysfunction, what is the expected change to the elimination half-life of that agent?" Key: it will decrease.</p>
<p class="xtrap">Her Exam 2 review item 14 asks the same with a decrease in clearance; by the same relation the half-life increases. The direction word decides the answer, not the words "renal dysfunction".</p>
<p class="gsrc">Source: Quiz 3 Q3-2 and Exam 2 In-Class Review item 14 (STYLE.md); IV-Infusions-Practice-4-Solutions.pdf part g; transcript 08-24 cue 3</p></div></template>

<h3 data-exam="1">Concentrations and doses</h3>
<p class="sub">Named concentrations and doses, separated by the route that produced the curve and the parameter that sets each one. Symbols in the table:</p>
<ul class="tlist"><li>V<sub>D</sub>: the volume of distribution, linking the amount in the body to the concentration. Cl: the clearance, the volume of plasma cleared of drug per hour.</li>
<li>R: the infusion rate in mg/hr. k: the elimination rate constant.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>Doubling an IV bolus dose: C<sub>0</sub> vs t&frac12;, Cl, V<sub>D</sub> <button type="button" class="chip xwhy" data-xpick="conc-doses:dose-params">Why?</button></td><td>C<sub>0</sub>, every C<sub>p</sub> and the AUC double; t&frac12;, k, Cl and V<sub>D</sub> stay the same</td></tr>
<tr><td>C<sub>ss</sub>, C<sub>max</sub>, C<sub>0</sub> <button type="button" class="chip xwhy" data-xpick="conc-doses:css-cmax-c0">Why?</button></td><td>C<sub>0</sub>: IV bolus at time zero; C<sub>ss</sub>: infusion plateau; C<sub>max</sub>: oral peak at t<sub>max</sub></td></tr>
<tr><td>One half-life after a bolus vs one half-life into an infusion <button type="button" class="chip xwhy" data-xpick="conc-doses:half-in-out">Why?</button></td><td>After a bolus: down to 50% of C<sub>0</sub>. Into an infusion: up to 50% of C<sub>ss</sub></td></tr>
<tr><td>Raising the infusion rate: C<sub>ss</sub> vs the time to reach it <button type="button" class="chip xwhy" data-xpick="conc-doses:rate-time">Why?</button></td><td>C<sub>ss</sub> = {{frac:R|Cl}} rises in proportion to R; the time stays 3 to 5 half-lives</td></tr>
<tr><td>C<sub>ss</sub> vs the concentration at the end of an infusion <button type="button" class="chip xwhy" data-xpick="conc-doses:css-end">Why?</button></td><td>Did the infusion reach steady state? If not, start from {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>)</td></tr>
<tr><td>Loading dose vs maintenance infusion rate <button type="button" class="chip xwhy" data-xpick="conc-doses:ld-rate">Why?</button></td><td>D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub> (mg); R = C<sub>ss</sub> &times; Cl (mg/hr)</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="conc-doses"><option value="">Choose a pair</option>
<option value="dose-params">Doubling an IV bolus dose: C0 vs t½, Cl, VD</option>
<option value="css-cmax-c0">Css, Cmax, C0</option>
<option value="half-in-out">One half-life after a bolus vs one half-life into an infusion</option>
<option value="rate-time">Raising the infusion rate: Css vs the time to reach it</option>
<option value="css-end">Css vs the concentration at the end of an infusion</option>
<option value="ld-rate">Loading dose vs maintenance infusion rate</option>
</select></label><div class="xout" data-xout="conc-doses"></div></div>
<template data-x="conc-doses:css-cmax-c0"><div class="xexp"><h4>C<sub>ss</sub>, C<sub>max</sub> and C<sub>0</sub></h4>
<p><b>In one line:</b> They differ in which route produced the curve and where on it the concentration sits. Each belongs to one input type: instantaneous, constant rate, and first-order in.</p>
<dl><dt>C<sub>0</sub></dt><dd>The concentration at time zero after an intravenous (IV) bolus, the highest point on that curve.</dd>
<dd>It is {{frac:D<sub>0</sub>|V<sub>D</sub>}}, the dose over the volume of distribution, or is found by back-extrapolation, extending the straight line of the log plot back to time zero.</dd>
<dd>For a two-compartment bolus, C<sub>0</sub> is A + B, the sum of the intercepts of the two straight segments of the log plot.</dd>
<dt>C<sub>ss</sub></dt><dd>The steady-state plateau of a continuous infusion, {{frac:R|Cl}}, with R the infusion rate and Cl the clearance (the volume of plasma cleared of drug per unit time).</dd>
<dd>It contains no time term and is reached only asymptotically, after three to five half-lives (a half-life is the time for the concentration to fall by half).</dd>
<dt>C<sub>max</sub></dt><dd>The peak of a single oral dose. It occurs at t<sub>max</sub>, the time of the peak, not at time zero, because the drug has to be absorbed first.</dd>
<dt>The quick test</dt><dd>Her drawing instruction, one curve at a time:<ul class="tlist"><li>An IV bolus starts high and comes down.</li><li>An infusion starts low and builds.</li><li>An oral dose rises to a peak and then falls.</li></ul></dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick uses {{frac:D<sub>0</sub>|V<sub>D</sub>}} for an oral peak. That is the concentration the whole dose would give if it arrived instantly and none were lost. It is not a concentration on the oral curve at all.</p>
<p class="xtrap">Reading C<sub>ss</sub> off a curve that has run for less than three to five half-lives reports the current concentration as the plateau.</p>
<p class="gsrc">Source: 2IVBolusAdministration.pdf slide "Volume of Distribution"; 3IntravenousInfusions.pdf slide "Drug Concentration at Steady-State"</p>
<p class="gsrc">Also: 5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Cp vs. Time for a Single Oral Dose"; transcript 09-02 cue 1, 09-21 cue 3</p></div></template>
<template data-x="conc-doses:ld-rate"><div class="xexp"><h4>Loading dose vs maintenance infusion rate</h4>
<p><b>In one line:</b> The loading dose is set by the volume of distribution; the infusion rate is set by the clearance.</p>
<dl><dt>Loading dose (D<sub>L</sub>)</dt><dd>D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub>, with C<sub>ss</sub> the steady-state concentration (the plateau where rate in equals rate out) and V<sub>D</sub> the volume of distribution (the volume that links the amount in the body to the concentration).</dd>
<dd>It is an amount, in mg.</dd>
<dt>Maintenance infusion rate (R)</dt><dd>R = C<sub>ss</sub> &times; Cl, with Cl the clearance, the volume of plasma cleared of drug per unit time. It replaces what is being cleared and is an amount per time, in mg/hr.</dd>
<dt>The link</dt><dd>The two are linked through D<sub>L</sub> = {{frac:R|k}}, with k the elimination rate constant, so that form gives a sensible loading dose only once an appropriate rate has been chosen.</dd>
<dt>The quick test</dt><dd>Ask which parameter changed. A change in clearance alone changes the rate required and leaves the loading dose unchanged.</dd>
<dd>In her IV Infusions Practice 4 solution, a patient whose clearance falls needs a smaller infusion rate and the same 1000 mg loading dose, because V<sub>D</sub> did not change.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick adjusts the loading dose for renal impairment. Renal impairment reduces clearance, which is in the rate and not in D<sub>L</sub> = C<sub>ss</sub>V<sub>D</sub>. Adjusting the rate for a change in volume is the same error reversed.</p>
<p class="xtrap">Her check on her own answers: if the loading dose and the rate are both correct, the concentration stays flat at C<sub>ss</sub> from the start.</p>
<p class="gsrc">Source: 3IntravenousInfusions.pdf slide "IV Bolus Loading Dose and Continuous IV Infusion"; transcript 09-02, 09-09; STYLE.md IV Infusions Practice 4</p></div></template>
<template data-x="conc-doses:css-end"><div class="xexp"><h4>C<sub>ss</sub> vs the concentration at the end of an infusion</h4>
<p><b>In one line:</b> They differ in whether the infusion actually ran to steady state.</p>
<dl><dt>C<sub>ss</sub></dt><dd>The steady-state concentration (the plateau where rate in equals rate out), {{frac:R|Cl}}, with R the infusion rate and Cl the clearance, the volume of plasma cleared of drug per unit time.</dd>
<dd>It is the concentration at the moment of cessation only when the infusion ran long enough.</dd>
<dt>C<sub>peak</sub></dt><dd>The concentration at the moment the infusion stops. After a stated shorter infusion it has to be computed first: C<sub>peak</sub> = {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>), with k the elimination rate constant and t the infusion time.</dd>
<dd>After the infusion stops, the concentration decays as C<sub>p</sub> = C<sub>peak</sub>e<sup>&minus;kt</sup>, with C<sub>p</sub> the plasma concentration and t the time since the stop.</dd>
<dt>The quick test</dt><dd>Read what the stem gives for the moment the infusion stopped. A stated level, or "at the steady-state level", is C<sub>peak</sub> as given; an infusion time short of 3 to 5 half-lives means C<sub>peak</sub> is computed first.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick starts the decay from {{frac:R|Cl}} on a six-hour infusion of a drug with a three-hour half-life. Six hours is two half-lives.</p>
<p class="xtrap">Each half-life of infusion closes half of the remaining gap to C<sub>ss</sub> (half after one, 75% after two), so the concentration at cessation is 75% of C<sub>ss</sub>, not C<sub>ss</sub>.</p>
<p class="xtrap">Decaying from the wrong starting point makes the whole answer wrong by the same factor.</p>
<p class="gsrc">Source: 3IntravenousInfusions.pdf slides "Drug Concentration after an IV Infusion has Ended" and Examples 5 and 6; transcript 09-02 worked examples (g) and (h), 10-19; Canvas graded set Q5; IV-Infusions-Practice-4-Solutions.pdf part f</p></div></template>

<template data-x="conc-doses:dose-params"><div class="xexp"><h4>Doubling an IV bolus dose: the concentrations vs the parameters</h4>
<p><b>In one line:</b> For a first-order drug the dose sets how high the curve starts and the parameters set how it falls, so a larger dose moves only the concentrations and the area.</p>
<dl><dt>What doubles</dt><dd>C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}, so twice the dose gives twice C<sub>0</sub>, twice every later C<sub>p</sub>, and twice the area under the curve, AUC = {{frac:D<sub>0</sub>|Cl}}.</dd>
<dt>What stays the same</dt><dd>The half-life (t&frac12; = {{frac:0.693|k}}), k, the clearance (Cl = kV<sub>D</sub>) and V<sub>D</sub>. Her words: "our clearance, our half-life, and our volume of distribution. These things are going to be constant."</dd>
<dt>The quick test</dt><dd>Asked about a concentration or an AUC after a dose change: scale it by the dose. Asked about t&frac12;, k, Cl or V<sub>D</sub>: no change.</dd>
<dd>Her IV Bolus Practice 4: 600 mg into 24.8 L gives C<sub>0</sub> 24.19 mg/L and 1200 mg gives 48.387 mg/L; her key says no change in the half-life or the clearance.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her 2 Sep poll: "which of the following would you expect to increase with an increase in a bolus dose?" Her answer: the concentration of drug in the plasma, not clearance, half-life or volume of distribution.</p>
<p class="gsrc">Source: IV-Bolus-Practice-4---Solutions.pdf parts d to f (STYLE.md M2-4.1); transcript 09-02 poll 1</p></div></template>
<template data-x="conc-doses:half-in-out"><div class="xexp"><h4>One half-life after a bolus vs one half-life into an infusion</h4>
<p><b>In one line:</b> The same half-life counts a fall after an IV bolus and a climb during an infusion.</p>
<dl><dt>After an IV bolus</dt><dd>C<sub>p</sub> = C<sub>0</sub>e<sup>&minus;kt</sup>: 50% of C<sub>0</sub> remains after one half-life, 25% after two, 12.5% after three.</dd>
<dt>Into an infusion</dt><dd>C<sub>p</sub> = C<sub>ss</sub>(1 &minus; e<sup>&minus;kt</sup>): 50% of C<sub>ss</sub> is reached after one half-life, 75% after two, 87.5% after three.</dd>
<dd>Her words: "one half-life is 50, the time it'll take to get to 50% of our steady state concentration."</dd>
<dt>The quick test</dt><dd>Draw the curve first: a bolus starts high and comes down; an infusion starts low and builds. Then count half-lives down from C<sub>0</sub> or up towards C<sub>ss</sub>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her IV Infusions Practice 4(d) asks the time to reach 5 mg/L with a 10 mg/L target and no loading dose; her key notes "5 mg/L = 50% of Css" and gives 6 hr, one half-life.</p>
<p class="xtrap">At the final review she defined the half-life both ways: for an IV infusion "it is the time that it takes to get to half of the steady-state concentration".</p>
<p class="gsrc">Source: 3IntravenousInfusions.pdf slide "Drug Concentration Prior to Reaching Steady-State"; IV-Infusions-Practice-4-Solutions.pdf part d (STYLE.md M3-4); transcript 09-02 worked example (a), 09-09, 10-19</p></div></template>
<template data-x="conc-doses:rate-time"><div class="xexp"><h4>Raising the infusion rate: C<sub>ss</sub> vs the time to reach it</h4>
<p><b>In one line:</b> The infusion rate R sets the height of the plateau; the half-life alone sets how long the climb takes.</p>
<dl><dt>The plateau, C<sub>ss</sub></dt><dd>C<sub>ss</sub> = {{frac:R|Cl}}, with Cl the clearance, so twice the rate gives twice the plateau.</dd>
<dd>Her final-review numbers (t&frac12; 3 hr, V<sub>D</sub> 18 L): 50 mg/hr gives about 12 mg/L and 100 mg/hr about 24 mg/L.</dd>
<dt>The time to reach it</dt><dd>The fraction of C<sub>ss</sub> reached, 1 &minus; e<sup>&minus;kt</sup>, holds k and t but not R. So the climb takes 3 to 5 half-lives at either rate: 9 to 15 hours for that drug.</dd>
<dt>The quick test</dt><dd>A change in rate moves C<sub>ss</sub>; a change in k, or in the half-life, moves the time. Reaching C<sub>ss</sub> at once takes a loading dose, not a faster rate.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her graded Canvas item: "Which of the following results when the rate of infusion is increased?" Key: steady-state concentration increases. The two time options are the wrong picks.</p>
<p class="xtrap">At the Exam 1 review she named the trap: a question saying a faster infusion changes the time to steady state; "it has no impact, right? Because it is three to five half-lives."</p>
<p class="gsrc">Source: 3IntravenousInfusions.pdf slide "Drug Concentration Prior to Reaching Steady-State"; Canvas graded set Q6 (STYLE.md); transcript 09-02 cue 4, 09-09 cue 15, 10-19 (final review slide 25 follow-ups)</p></div></template>

<h3 data-exam="2">Oral absorption</h3>
<p class="sub">Pairs from a single oral dose, separated by which rate constant each one depends on: k<sub>a</sub>, the absorption rate constant, or k, the elimination rate constant. Symbols in the table:</p>
<ul class="tlist"><li>F: the bioavailability, the fraction of the dose that reaches the blood. V<sub>D</sub>: the volume of distribution.</li>
<li>A half-life is the time for the amount to fall by half, {{frac:0.693|rate constant}}.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>First one</th><th>Second one</th></tr></thead><tbody>
<tr><td>Absorption vs elimination half-life <button type="button" class="chip xwhy" data-xpick="oral:two-half-lives">Why?</button></td><td>{{frac:0.693|k<sub>a</sub>}}; usually given in minutes</td><td>{{frac:0.693|k}}; usually in hours; a bare t&frac12; means this one</td></tr>
<tr><td>Absorption phase vs C<sub>max</sub> vs after the peak <button type="button" class="chip xwhy" data-xpick="oral:phases">Why?</button></td><td>Rising: the absorption rate is greater than the elimination rate</td><td>At C<sub>max</sub> the two rates are equal; after it elimination is faster</td></tr>
<tr><td>t<sub>max</sub> vs C<sub>max</sub> <button type="button" class="chip xwhy" data-xpick="oral:tmax-cmax">Why?</button></td><td>Only k<sub>a</sub> and k; the dose does not move it</td><td>Contains the dose, F and V<sub>D</sub>; moves in proportion to the dose</td></tr>
<tr><td>Disposition vs absorption rate limiting <button type="button" class="chip xwhy" data-xpick="oral:rate-limiting">Why?</button></td><td>Absorption half-life much shorter; terminal slope reflects k</td><td>Absorption half-life much longer; terminal slope reflects k<sub>a</sub></td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="oral"><option value="">Choose a pair</option>
<option value="two-half-lives">Absorption vs elimination half-life</option>
<option value="phases">Absorption phase vs Cmax vs after the peak</option>
<option value="tmax-cmax">tmax vs Cmax</option>
<option value="rate-limiting">Disposition vs absorption rate limiting</option>
</select></label><div class="xout" data-xout="oral"></div></div>
<template data-x="oral:rate-limiting"><div class="xexp"><h4>Disposition rate limiting vs absorption rate limiting</h4>
<p><b>In one line:</b> Which half-life is the longer one decides which rate constant the terminal slope reflects.</p>
<dl><dt>Disposition rate limiting</dt><dd>The absorption half-life (the time for the amount still to be absorbed to fall by half) is much shorter than the elimination half-life (the time for the concentration to fall by half).</dd>
<dd>So k<sub>a</sub>, the absorption rate constant, is much larger than k, the elimination rate constant, and absorption finishes first.</dd>
<dd>The terminal slope of the curve then reflects k. This is the usual case.</dd>
<dt>Absorption rate limiting</dt><dd>The absorption half-life is much longer. Drug is still arriving while elimination proceeds, and the terminal slope reflects k<sub>a</sub> instead.</dd>
<dt>The quick test</dt><dd>The larger rate constant is the shorter half-life. In her worked example she reads it off the exponents of the given equation: k<sub>a</sub> = 0.87 hr<sup>&minus;1</sup> alongside k = 0.18 hr<sup>&minus;1</sup> means absorption is much faster than elimination.</dd>
<dt>Two names</dt><dd>She uses two names for the first case in the same lecture: "disposition rate limiting" on the slide and "distribution limited" once while working example (e).</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick assumes the tail always gives the elimination rate constant. It does so only when absorption is the faster process.</p>
<p class="xtrap">Comparing the two half-lives as if they were the two rate constants reverses the conclusion.</p>
<p class="gsrc">Source: 5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Absorption Kinetics Terminology"; transcript 09-21. Her slide states only the half-lives; the terminal slope reflecting k<sub>a</sub> is from Shargel Ch 16 p. 19 (flip-flop).</p></div></template>
<template data-x="oral:tmax-cmax"><div class="xexp"><h4>t<sub>max</sub> vs C<sub>max</sub></h4>
<p><b>In one line:</b> They differ in what each one contains.</p>
<dl><dt>t<sub>max</sub></dt><dd>The time of the peak: t<sub>max</sub> = {{frac:ln(k<sub>a</sub> &divide; k)|k<sub>a</sub> &minus; k}}, with k<sub>a</sub> the absorption and k the elimination rate constant.</dd>
<dd>It contains only these two and does not depend on the dose, on F (the bioavailability factor, the fraction of the dose reaching the blood) or on V<sub>D</sub> (the volume of distribution).</dd>
<dt>C<sub>max</sub></dt><dd>The concentration at t<sub>max</sub>. It contains the dose, F (the bioavailability factor) and V<sub>D</sub> (the volume of distribution), so it moves in proportion to the dose.</dd>
<dt>The quick test</dt><dd>Change the dose and only C<sub>max</sub> moves. Raise k<sub>a</sub>: higher C<sub>max</sub>, earlier t<sub>max</sub>. Raise k: lower C<sub>max</sub>, also earlier t<sub>max</sub>, because t<sub>max</sub> depends on both constants.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick answers that doubling the dose doubles t<sub>max</sub>, or that it moves it at all. She sets this up as a question she will ask.</p>
<p class="xtrap">Her 28 Sep poll: "Which of the following results when an oral dose is increased?" Her answer: no change in the t<sub>max</sub>. Her Exam 2 review item 6 (select all, a 2-fold oral dose): increased AUC and increased C<sub>max</sub>.</p>
<p class="xtrap">Also seen: reaching C<sub>max</sub> without t<sub>max</sub> (C<sub>max</sub> is the oral equation at t<sub>max</sub>, so t<sub>max</sub> comes first), and dropping V<sub>D</sub> from the C<sub>max</sub> expression, which she names directly.</p>
<p class="gsrc">Source: 5---Pharmacokinetics-of-Oral-Absorption.pdf slides "Cp vs. Time for a Single Oral Dose", "Changing Dose" and "Effect of ka and k on Cmax, tmax, and AUC"; transcript 09-21 cues 1, 2, 6, 7 and section 8.3</p></div></template>
<template data-x="oral:two-half-lives"><div class="xexp"><h4>Absorption half-life vs elimination half-life</h4>
<p><b>In one line:</b> They differ in which rate constant the 0.693 is divided by.</p>
<dl><dt>Absorption half-life</dt><dd>{{frac:0.693|k<sub>a</sub>}}, with k<sub>a</sub> the absorption rate constant: the time for the amount still to be absorbed to fall by half. Her oral stems usually give it in minutes.</dd>
<dt>Elimination half-life</dt><dd>{{frac:0.693|k}}, with k the elimination rate constant, usually given in hours. An unqualified "t&frac12;" in a stem means the elimination half-life.</dd>
<dt>The quick test</dt><dd>Both are first-order half-lives, of processes running at the same time in opposite directions. Convert each to its own rate constant, in the same time unit, usually hours.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick converts one half-life to a rate constant and reuses it for both exponentials. That merges two processes into one and makes k<sub>a</sub> &minus; k zero.</p>
<p class="xtrap">She also names leaving one half-life in minutes and the other in hours before calculating t<sub>max</sub> (the time of the peak), and using a half-life where a rate constant is needed without first dividing 0.693 by it.</p>
<p class="gsrc">Source: 5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Kinetics of Absorption"; transcript 09-21 cues 4, 5 and 8</p></div></template>

<template data-x="oral:phases"><div class="xexp"><h4>Absorption phase vs C<sub>max</sub> vs the phases after the peak</h4>
<p><b>In one line:</b> The parts of a single oral curve differ in which rate is larger, absorption or elimination.</p>
<dl><dt>Absorption phase (rising)</dt><dd>The rate of absorption is greater than the rate of elimination, so the level rises. Her words: "we've got more drug going in to the body than there is drug going out".</dd>
<dt>At C<sub>max</sub></dt><dd>The two rates are equal, so the level stops rising. Drug is still at the absorption site.</dd>
<dt>Post-absorption phase</dt><dd>The rate of elimination is greater than the rate of absorption, with some drug still to be absorbed. Once absorption is complete only elimination remains: the complete elimination phase.</dd>
<dt>The quick test</dt><dd>Rising: absorption faster. Peak: equal. Falling: elimination faster. "Drug at the absorption site has become depleted" is true only in the complete elimination phase.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The same four options under two stems. Quiz 3, "Which of the following is true regarding the C<sub>max</sub> following oral administration?": the rate of drug absorption equals the rate of drug elimination.</p>
<p class="xtrap">Her Exam 2 review item 12, "Which of the following is true regarding the absorption phase following oral administration?": the rate of drug absorption is faster than the rate of drug elimination.</p>
<p class="gsrc">Source: 5---Pharmacokinetics-of-Oral-Absorption.pdf, the concentration-time profile slide with her notes "absorption phase" and "post-absorption phase"; transcript 09-21; Quiz 3 Q3-4 and Exam 2 In-Class Review item 12 (STYLE.md)</p></div></template>

<h3 data-exam="2">Repeated dosing</h3>
<p class="sub"><b>Which of the three Module 6 regimens?</b> Her exam never names the module; the route words in the stem pick the line. One line serves IV bolus and oral alike: C<sub>avg</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|Cl<sub>T</sub>&tau;}}, with F = 1 for IV.</p>
<table class="reftab"><thead><tr><th></th><th>Repeated IV bolus (deck 6)</th><th>Intermittent IV infusions (deck 6)</th><th>Multiple oral doses (deck 6a)</th></tr></thead><tbody>
<tr><td>Words in the stem <button type="button" class="chip xwhy" data-xpick="regimens:words">Why?</button></td><td>"IV bolus injections … every 8 hours"</td><td>"infused … over a period of 2 hours", a second dose infused</td><td>"by mouth", "oral dose every 8 hours", F, absorption half-life</td></tr>
<tr><td>Peak <button type="button" class="chip xwhy" data-xpick="regimens:peak">Why?</button></td><td>C<sub>max</sub><sup>&infin;</sup> = {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}: no F, no t<sub>max</sub></td><td>End of each infusion: {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>), plus what earlier ones left</td><td>{{frac:FD<sub>0</sub>|V<sub>D</sub>}}({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}})e<sup>&minus;kt<sub>max</sub>&infin;</sup></td></tr>
<tr><td>Trough or later level <button type="button" class="chip xwhy" data-xpick="regimens:trough">Why?</button></td><td>C<sub>max</sub><sup>&infin;</sup>e<sup>&minus;k&tau;</sup>, at the end of the interval</td><td>Each infusion's end level &times; e<sup>&minus;kt</sup> since it stopped, then added</td><td>The oral C<sub>min</sub><sup>&infin;</sup> line, which carries k<sub>a</sub></td></tr>
<tr><td>Time of the peak <button type="button" class="chip xwhy" data-xpick="regimens:tmax">Why?</button></td><td>The moment of the dose</td><td>The moment the infusion stops</td><td>t<sub>max</sub><sup>&infin;</sup>, from k, k<sub>a</sub> and &tau;; not the single-dose t<sub>max</sub></td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="regimens"><option value="">Choose a row</option>
<option value="words">Words in the stem</option>
<option value="peak">Peak</option>
<option value="trough">Trough or later level</option>
<option value="tmax">Time of the peak</option>
</select></label><div class="xout" data-xout="regimens"></div></div>
<template data-x="regimens:words"><div class="xexp"><h4>Reading the route from the stem</h4>
<p><b>In one line:</b> The route words, not the module number, decide which block of the sheet to use.</p>
<dl><dt>IV bolus</dt><dd>"IV bolus doses" or "IV bolus injections" at a fixed interval: the whole dose enters at once, so the peak is at the dose.</dd>
<dt>Intermittent infusion</dt><dd>A dose "infused intravenously over a period of" hours: the dose is a rate, R = {{frac:D<sub>0</sub>|t<sub>inf</sub>}}, and each infusion rises before it falls.</dd>
<dt>Oral</dt><dd>"by mouth" or "oral dose", usually with F and an absorption half-life: first order in and first order out.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her review question 3 starts with IV bolus doses (parts a and b) and switches to oral doses in parts e to h, asking "What is Cmax" without the word oral.</p>
<p class="gsrc">Source: Exam 2 In-Class Review, questions 3 and 4; 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf; 6a---Multiple-Oral-Doses.pdf</p></div></template>
<template data-x="regimens:peak"><div class="xexp"><h4>The steady-state peak by route</h4>
<p><b>In one line:</b> The oral peak has two pieces the bolus peak lacks: F and e<sup>&minus;kt<sub>max</sub>&infin;</sup>.</p>
<dl><dt>IV bolus</dt><dd>C<sub>max</sub><sup>&infin;</sup> = {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}: the whole dose is in at the moment of injection, so the peak is the first-dose peak times the accumulation factor.</dd>
<dt>Oral</dt><dd>C<sub>max</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|V<sub>D</sub>}}({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}})e<sup>&minus;kt<sub>max</sub>&infin;</sup>: only F of the dose arrives, and elimination runs while it is absorbed, which the e<sup>&minus;kt<sub>max</sub>&infin;</sup> factor accounts for.</dd>
<dt>Infusion</dt><dd>Each infusion peaks when it stops: {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>) with t the infusion time, plus what is left of earlier infusions.</dd></dl>
<p class="xtrap"><b>The common error:</b> using the bolus line for an oral regimen, which drops F and the e<sup>&minus;kt<sub>max</sub>&infin;</sup> factor.</p>
<p class="xtrap">For infusions the matching error is taking {{frac:D<sub>0</sub>|V<sub>D</sub>}} as the peak, or using the accumulation factor {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}, where the question gives two infusions to add one by one.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, steady-state IV bolus slide; 6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"</p></div></template>
<template data-x="regimens:trough"><div class="xexp"><h4>The trough, or a later level, by route</h4>
<p><b>In one line:</b> Only the bolus trough is the peak times e<sup>&minus;k&tau;</sup>.</p>
<dl><dt>IV bolus</dt><dd>C<sub>min</sub><sup>&infin;</sup> = C<sub>max</sub><sup>&infin;</sup>e<sup>&minus;k&tau;</sup>: the level falls by first-order elimination for one whole interval after the dose.</dd>
<dt>Oral</dt><dd>The oral C<sub>min</sub><sup>&infin;</sup> line carries k<sub>a</sub>, because absorption is still adding drug after the dose is swallowed.</dd>
<dt>Infusion</dt><dd>Take each infusion's end level, multiply by e<sup>&minus;kt</sup> with t counted from when that infusion stopped, then add the infusions.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her Exam 2 review item 13: "When does the minimum concentration of drug in the plasma occur with multiple IV bolus dosings?" Key: at the end of the dosing interval; "in 3 to 5 half-lives" is a wrong option.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, Example 4; 6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"</p></div></template>
<template data-x="regimens:tmax"><div class="xexp"><h4>When the peak happens</h4>
<p><b>In one line:</b> Only the oral route needs a time-to-peak equation, and at steady state it is t<sub>max</sub><sup>&infin;</sup>.</p>
<dl><dt>IV bolus</dt><dd>At the moment of the dose; nothing has to be absorbed.</dd>
<dt>Infusion</dt><dd>At the moment the infusion stops; after that the level only falls.</dd>
<dt>Oral</dt><dd>t<sub>max</sub><sup>&infin;</sup> = {{frac:1|k<sub>a</sub> &minus; k}}ln[{{frac:k<sub>a</sub>(1 &minus; e<sup>&minus;k&tau;</sup>)|k(1 &minus; e<sup>&minus;k<sub>a</sub>&tau;</sup>)}}], with &tau; in it; the single-dose t<sub>max</sub> has no &tau;, and t<sub>max</sub><sup>&infin;</sup> is generally shorter.</dd></dl>
<p class="gsrc">Source: 6a---Multiple-Oral-Doses.pdf, slide "Time to Peak at Steady State"</p></div></template>
<p class="sub">Pairs from repeated IV and oral dosing, separated by what each quantity counts or depends on. Symbols and examples in the table:</p>
<ul class="tlist"><li>D<sub>0</sub>: the dose. V<sub>D</sub>: the volume of distribution, linking the amount in the body to the concentration. C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}: the first-dose peak.</li>
<li>k: the elimination rate constant. F: the bioavailability, the fraction of the dose reaching the blood (1 for IV). &infin;: at steady state. A half-life is the time for the concentration to fall by half.</li>
<li>Her Example 1 (Module 6): 10 mg/kg IV every 8 hours, half-life 4 hr. Steady-state peak 53.3 mg/L; the trough one interval later is a quarter of that, since 8 hours is two half-lives; time average 28.9 mg/L; midpoint of peak and trough 33.3 mg/L.</li>
<li>Her Example 4: the first infusion ends at 2 hr, the second at 8 hr, and the level is asked at 12 hr.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>First one</th><th>Second one</th></tr></thead><tbody>
<tr><td>3 to 5 half-lives vs 3 to 5 doses <button type="button" class="chip xwhy" data-xpick="repeated:half-lives-doses">Why?</button></td><td>Time to plateau for first-order elimination, whatever the dose</td><td>Not a rule: the number of doses depends on the interval</td></tr>
<tr><td>Frequency vs dosing interval, &tau; <button type="button" class="chip xwhy" data-xpick="repeated:freq-tau">Why?</button></td><td>Doses per day, as orders are written: BID, TID</td><td>Hours between doses: TID is &tau; = 8 hr; BID is 12 hr</td></tr>
<tr><td>First-dose C<sub>max</sub> vs C<sub>max</sub><sup>&infin;</sup> <button type="button" class="chip xwhy" data-xpick="repeated:first-ss-peak">Why?</button></td><td>No drug in the body yet: C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}</td><td>Added to drug left over: {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}, always higher</td></tr>
<tr><td>C<sub>avg</sub><sup>&infin;</sup> vs the peak-trough midpoint <button type="button" class="chip xwhy" data-xpick="repeated:cavg-mid">Why?</button></td><td>Time average {{frac:FD<sub>0</sub>|V<sub>D</sub>k&tau;}}: 28.9 mg/L in her Example 1</td><td>{{frac:C<sub>max</sub><sup>&infin;</sup> + C<sub>min</sub><sup>&infin;</sup>|2}}: 33.3 in Example 1, from the 53.3 peak and the trough</td></tr>
<tr><td>n vs t in the n-dose equation <button type="button" class="chip xwhy" data-xpick="repeated:n-t">Why?</button></td><td>n: the number of the dose just given</td><td>t: time since that dose, not since the first</td></tr>
<tr><td>t for the first infusion vs t for the second <button type="button" class="chip xwhy" data-xpick="repeated:two-infusions">Why?</button></td><td>Time since the first one ended: 12 &minus; 2 = 10 hr in her Example 4</td><td>Time since the second one ended: 12 &minus; 8 = 4 hr in the same example</td></tr>
<tr><td>t<sub>max</sub> vs t<sub>max</sub><sup>&infin;</sup> <button type="button" class="chip xwhy" data-xpick="repeated:tmax-ss">Why?</button></td><td>First dose: k and k<sub>a</sub>; tetracycline 3.1 hr</td><td>Steady state: k, k<sub>a</sub> and &tau;; generally shorter; 2.06 hr</td></tr>
<tr><td>Raising the dose vs lengthening the interval <button type="button" class="chip xwhy" data-xpick="repeated:dose-interval">Why?</button></td><td>Higher levels, wider swing; compliance usually unchanged</td><td>Lower levels, wider swing; better compliance</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="repeated"><option value="">Choose a pair</option>
<option value="half-lives-doses">3 to 5 half-lives vs 3 to 5 doses</option>
<option value="freq-tau">Frequency vs dosing interval</option>
<option value="first-ss-peak">First-dose Cmax vs steady-state Cmax</option>
<option value="cavg-mid">Steady-state Cavg vs the peak-trough midpoint</option>
<option value="n-t">n vs t in the n-dose equation</option>
<option value="two-infusions">t for the first infusion vs t for the second</option>
<option value="tmax-ss">tmax vs steady-state tmax</option>
<option value="dose-interval">Raising the dose vs lengthening the interval</option>
</select></label><div class="xout" data-xout="repeated"></div></div>
<template data-x="repeated:half-lives-doses"><div class="xexp"><h4>3 to 5 half-lives vs 3 to 5 doses</h4>
<p><b>In one line:</b> The time to plateau counts half-lives, not doses.</p>
<dl><dt>3 to 5 half-lives</dt><dd>First-order elimination (a fixed fraction of what remains leaves per hour) reaches the plateau in 3 to 5 half-lives (a half-life is the time for the concentration to fall by half), whatever the dose.</dd>
<dd>Doubling the dose doubles the plateau level and leaves the time to reach it unchanged.</dd>
<dt>3 to 5 doses</dt><dd>How many doses that time holds depends on the dosing interval. With a 4-hour half-life dosed every 8 hours, 3 to 5 half-lives is 12 to 20 hours, by which time 2 to 3 doses have been given.</dd>
<dt>The quick test</dt><dd>Work out the time in hours from the half-life first, then count how many doses fall inside it.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick counts doses, or makes the time to plateau depend on the dose.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Drug accumulation with repeated administration"; transcript 09-23</p></div></template>
<template data-x="repeated:freq-tau"><div class="xexp"><h4>Frequency vs dosing interval, &tau;</h4>
<p><b>In one line:</b> The equations take the interval in hours, not the number of doses per day.</p>
<dl><dt>Frequency</dt><dd>Doses per day, as orders are written: BID is twice a day, TID is three times a day.</dd>
<dt>Dosing interval (&tau;)</dt><dd>The time between doses, in hours. TID is &tau; = {{frac:24 hr|3}} = 8 hr; BID is &tau; = 12 hr.</dd>
<dt>The quick test</dt><dd>Anything in an exponent must carry hours: e<sup>&minus;k&tau;</sup> takes &tau;, with k the elimination rate constant, not the number of doses per day.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick puts 3 for TID into an exponent that needs hours. That gives e<sup>&minus;3k</sup> instead of e<sup>&minus;8k</sup>, and too little decline over the interval.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Amount of Drug in the Body Following Repeated IV Bolus Injections"; transcript 09-23</p></div></template>
<template data-x="repeated:first-ss-peak"><div class="xexp"><h4>First-dose C<sub>max</sub> vs C<sub>max</sub><sup>&infin;</sup></h4>
<p><b>In one line:</b> They differ in whether drug was already in the body when the dose went in.</p>
<dl><dt>First-dose peak</dt><dd>The first dose enters a body with no drug, so its peak is C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}, the dose over the volume of distribution.</dd>
<dt>Steady-state peak, C<sub>max</sub><sup>&infin;</sup></dt><dd>Each dose is added to drug left from earlier doses, so the peak is {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}, with k the elimination rate constant and &tau; the dosing interval: higher by the accumulation factor, {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}.</dd>
<dt>The quick test</dt><dd>Same k, same dose, higher starting point. Her check is that the steady-state value must be greater than C<sub>0</sub>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> A steady-state peak below C<sub>0</sub> means the accumulation factor was multiplied in instead of divided.</p>
<p class="xtrap">In her Example 1, C<sub>0</sub> = 40 mg/L and the interval is two half-lives, so e<sup>&minus;k&tau;</sup> is one quarter and 1 &minus; e<sup>&minus;k&tau;</sup> = 0.75: the error gives 40 &times; 0.75 = 30 in place of {{frac:40|0.75}} = 53.3.</p>
<p class="xtrap">Her final-review poll (300 mg every 12 hours, t&frac12; 4 hr, V<sub>D</sub> 16 L) offers 18.7 mg/L, the first-dose C<sub>0</sub> ({{frac:300 mg|16 L}} = 18.75 mg/L), beside her key, 21.4 mg/L.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"; transcript 09-23</p></div></template>
<template data-x="repeated:cavg-mid"><div class="xexp"><h4>C<sub>avg</sub><sup>&infin;</sup> vs the peak-trough midpoint</h4>
<p><b>In one line:</b> An average over time against the midpoint of two numbers.</p>
<dl><dt>C<sub>avg</sub><sup>&infin;</sup></dt><dd>The time-averaged steady-state concentration, {{frac:FD<sub>0</sub>|V<sub>D</sub>k&tau;}}, with F the bioavailability factor, D<sub>0</sub> the dose, V<sub>D</sub> the volume of distribution, k the elimination rate constant and &tau; the dosing interval.</dd>
<dd>F is the fraction of the dose reaching the blood, 1 for IV; V<sub>D</sub> is the volume that links the amount in the body to the concentration.</dd>
<dt>The midpoint</dt><dd>{{frac:C<sub>max</sub><sup>&infin;</sup> + C<sub>min</sub><sup>&infin;</sup>|2}}, halfway between the steady-state peak and trough. It equals the time average only for a straight-line decline, which is zero order.</dd>
<dt>The quick test</dt><dd>The level falls exponentially between doses, fast and then slow, so it spends more of each interval near the trough. The time average lies below the midpoint.</dd>
<dd>In her Example 1 the steady-state peak is 53.3 mg/L and the trough a quarter of it, so the midpoint is 33.3 mg/L against a time average of 28.9 mg/L.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick averages the peak and the trough to get C<sub>avg</sub><sup>&infin;</sup>.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Concentration of Drug in the Body at Steady-State Following Repeated IV Bolus Injections"; transcript 09-23</p></div></template>
<template data-x="repeated:n-t"><div class="xexp"><h4>n vs t in the n-dose equation</h4>
<p><b>In one line:</b> n counts the doses; t is the time since the latest one.</p>
<dl><dt>n</dt><dd>The number of the dose just given, in C<sub>p</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}({{frac:1 &minus; e<sup>&minus;nk&tau;</sup>|1 &minus; e<sup>&minus;k&tau;</sup>}})e<sup>&minus;kt</sup>, with D<sub>0</sub> the dose, V<sub>D</sub> the volume of distribution and k the elimination rate constant.</dd>
<dd>The time before that dose is already carried by n and &tau;, the dosing interval, inside the bracket.</dd>
<dt>t</dt><dd>The time since dose n, not since the first dose. 3 hours after the 2nd dose is n = 2, t = 3 hr.</dd>
<dt>The quick test</dt><dd>Measure t from the latest dose.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick uses the time since the first dose as t.</p>
<p class="xtrap">That counts the earlier intervals twice and gives a value far too low: t = 8 + 3 = 11 hr in place of 3 hr for her Example 2 (dosed every 8 hours, the level asked 3 hours after the 2nd dose).</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "Plasma Drug Concentration at Any Time After n Doses"; transcript 09-23</p></div></template>
<template data-x="repeated:two-infusions"><div class="xexp"><h4>t for the first infusion vs t for the second</h4>
<p><b>In one line:</b> Each infusion declines from its own end.</p>
<dl><dt>First infusion</dt><dd>At the time asked for, it has been declining since it stopped. In her Example 4 (the first infusion ends at 2 hr, the second at 8 hr, and the level is asked at 12 hr) that is 12 &minus; 2 = 10 hr.</dd>
<dt>Second infusion</dt><dd>It has been declining since it stopped, a shorter time: 12 &minus; 8 = 4 hr in Example 4.</dd>
<dt>The quick test</dt><dd>The two exponents carry different times. Measure each from the end of its own infusion.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick uses the "4 hours after the second infusion" for both terms, or measures the first infusion from its start rather than its end. She names this as the part to pay attention to.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "What is the plasma drug concentration 4 hours after the cessation of the second infusion?"; transcript 09-28</p></div></template>
<template data-x="repeated:tmax-ss"><div class="xexp"><h4>t<sub>max</sub> vs t<sub>max</sub><sup>&infin;</sup></h4>
<p><b>In one line:</b> They differ in what each depends on, and in which is shorter.</p>
<dl><dt>t<sub>max</sub></dt><dd>The time of the peak after a single dose. It holds k, the elimination rate constant, and k<sub>a</sub>, the absorption rate constant.</dd>
<dt>t<sub>max</sub><sup>&infin;</sup></dt><dd>The time of the peak at steady state. It holds k, k<sub>a</sub> and &tau;, the dosing interval. It is generally shorter, because drug already in the body brings the balance of absorption and elimination forward.</dd>
<dt>The quick test</dt><dd>Tetracycline every 8 hours: 3.1 hr against 2.06 hr. Changing the interval changes t<sub>max</sub><sup>&infin;</sup> and C<sub>max</sub><sup>&infin;</sup>, the steady-state peak concentration; changing the dose changes neither t<sub>max</sub>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick reuses the first-dose t<sub>max</sub> inside C<sub>max</sub><sup>&infin;</sup>, or expects the steady-state peak to come later than the first.</p>
<p class="gsrc">Source: 6a---Multiple-Oral-Doses.pdf, slides "Time to Peak at Steady State" and "Example 1"; transcript 09-28</p></div></template>
<template data-x="repeated:dose-interval"><div class="xexp"><h4>Raising the dose vs lengthening the interval</h4>
<p><b>In one line:</b> They differ in which way the steady-state concentration (the level once repeated dosing has levelled off) and the peak-to-trough swing move.</p>
<dl><dt>A larger dose, same interval</dt><dd>Raises the concentrations and widens the peak-to-trough swing. Compliance is usually unchanged.</dd>
<dt>A longer interval, same dose</dt><dd>Lowers the concentrations, widens the swing and improves compliance. A shorter interval does the reverse of each.</dd>
<dt>The quick test</dt><dd>Both widen the swing; the level moves in opposite directions. Neither changes the time to steady state.</dd>
<dt>Which swing</dt><dd>A larger dose widens the gap in mg/L while the trough stays the same fraction of the peak. A longer interval lets the trough fall to a smaller fraction of the peak.</dd>
<dd>A shorter interval raises peak and trough together and brings the trough closer to the peak; it does not lower either.</dd></dl>
{{fig:dose_interval|Her Example 1 every 8 hours, every 4 hours, and at double the dose, on one scale.}}
<p class="xtrap"><b>How she tests it:</b> Quiz 4: "Which is the best option to increase the steady-state concentration in a dosing regimen?" Key: decrease the dosing interval.</p>
<p class="xtrap">Her Exam 2 review item 9 asks what a shorter interval at the same dose gives: increased steady-state concentrations.</p>
<p class="xtrap">Another: expecting a longer interval to raise the level because each dose has longer to be absorbed. Absorption is complete either way; what a longer interval gives each dose is more time to be eliminated.</p>
<p class="gsrc">Source: 6a---Multiple-Oral-Doses.pdf, slides "Altering Dose, second slide" and "Altering Dosing Interval, second slide"; transcript 09-28; Quiz 4 Q4-3 and Exam 2 In-Class Review item 9 (STYLE.md)</p></div></template>
<h3 data-exam="2">Bioavailability and bioequivalence (Module 7a)</h3>
<p class="sub">Pairs from the bioavailability lecture, separated by what is compared with what, and by which one goes in the denominator. Symbols in the table:</p>
<ul class="tlist"><li>AUC: the area under the concentration-time curve. F: the bioavailability, the fraction of the dose that reaches the blood. D: a dose.</li>
<li>The subscript po means by mouth and IV intravenous.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>First one</th><th>Second one</th></tr></thead><tbody>
<tr><td>Drug product performance vs bioavailability <button type="button" class="chip xwhy" data-xpick="bioequiv:dpp-ba">Why?</button></td><td>Release of the drug from the product</td><td>Rate and extent of absorption to the site of action</td></tr>
<tr><td>Absolute vs relative bioavailability <button type="button" class="chip xwhy" data-xpick="bioequiv:abs-rel">Why?</button></td><td>Oral against IV; the IV AUC underneath; at most 1</td><td>Two formulations; the reference underneath; can exceed 1</td></tr>
<tr><td>Bioavailability vs bioequivalence <button type="button" class="chip xwhy" data-xpick="bioequiv:ba-be">Why?</button></td><td>Rate and extent of one product; F measures the extent</td><td>No significant difference in rate and extent between two products</td></tr>
<tr><td>Rate (t<sub>max</sub>) vs extent (AUC) <button type="button" class="chip xwhy" data-xpick="bioequiv:rate-extent">Why?</button></td><td>When the peak comes; read from the curve</td><td>How much is absorbed; the area, and what F is built from</td></tr>
<tr><td>Test vs reference product <button type="button" class="chip xwhy" data-xpick="bioequiv:test-ref">Why?</button></td><td>The product being judged; its AUC on top</td><td>The standard or comparator; its AUC in the denominator</td></tr>
<tr><td>F from AUCs vs F from doses <button type="button" class="chip xwhy" data-xpick="bioequiv:f-auc-dose">Why?</button></td><td>{{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}} &times; {{frac:D<sub>IV</sub>|D<sub>po</sub>}}, for any pair of doses</td><td>{{frac:D<sub>IV</sub>|D<sub>po</sub>}}, only when the AUCs are set equal</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="bioequiv"><option value="">Choose a pair</option>
<option value="dpp-ba">Drug product performance vs bioavailability</option>
<option value="abs-rel">Absolute vs relative bioavailability</option>
<option value="ba-be">Bioavailability vs bioequivalence</option>
<option value="rate-extent">Rate (tmax) vs extent (AUC)</option>
<option value="test-ref">Test vs reference product</option>
<option value="f-auc-dose">F from AUCs vs F from doses</option>
</select></label><div class="xout" data-xout="bioequiv"></div></div>
<template data-x="bioequiv:abs-rel"><div class="xexp"><h4>Absolute vs relative bioavailability</h4>
<p><b>In one line:</b> They differ in what the product is compared with: an IV dose, or another formulation.</p>
<dl><dt>Absolute bioavailability (F<sub>abs</sub>)</dt><dd>The drug by an extravascular route, oral here, against the same drug intravenously (IV). F<sub>abs</sub> = {{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}} &times; {{frac:D<sub>IV</sub>|D<sub>po</sub>}}, with AUC the area under the curve, D the dose and po meaning by mouth.</dd>
<dd>The IV dose is all in the blood, so its F is 1 and it is the standard. An absolute F cannot be above 1.</dd>
<dd>Her slide problem, a 250 mg oral dose with AUC 101.5 against a 100 mg IV dose with AUC 73.8: {{frac:101.5|73.8}} &times; {{frac:100|250}} = 0.55.</dd>
<dt>Relative bioavailability (F<sub>rel</sub>)</dt><dd>Two formulations of the same drug, neither IV: F<sub>rel</sub> = {{frac:AUC<sub>A</sub>|AUC<sub>B</sub>}} &times; {{frac:D<sub>B</sub>|D<sub>A</sub>}}, with B the reference or comparator.</dd>
<dd>Her slide problem, a 250 mg tablet with AUC 101.5 against 250 mg in oral solution with AUC 98.76 (equal doses, so the dose ratio is 1): {{frac:101.5|98.76}} = 1.03.</dd>
<dd>A relative F can be above 1, because an old standard can be beaten by a newer product; her example was Bayer aspirin.</dd>
<dt>The quick test</dt><dd>Is one of the two an IV dose? Then it is absolute. Both oral, or a new product against the originator? Relative.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick inverts the ratio and gets 1.82 for the slide problem, or calls an absolute F of 1.03 possible. She said the quiz would lean toward absolute bioavailability.</p>
<p class="gsrc">Source: 7a---Bioavailability-and-Bioequivalence.pdf, slides "Absolute Bioavailability", "Practice Problem" and "Relative Bioavailability"; transcript 09-30</p></div></template>
<template data-x="bioequiv:ba-be"><div class="xexp"><h4>Bioavailability vs bioequivalence</h4>
<p><b>In one line:</b> One describes a product; the other compares two products and needs rate as well as extent.</p>
<dl><dt>Bioavailability</dt><dd>The rate and extent to which the active ingredient is absorbed from a drug product and becomes available at the site of action. The course's F, the fraction absorbed, is the extent half, measured as the area under the curve (AUC).</dd>
<dt>Bioequivalence</dt><dd>No significant difference in the rate and extent to which the active ingredient becomes available, from two products at the same molar dose under similar conditions.</dd>
<dd>A bioequivalence study is a specialized relative bioavailability study (one that compares two formulations of the same drug by their AUCs).</dd>
<dt>The quick test</dt><dd>A relative F of 1.03, her result for a tablet against an oral solution of the same dose, says the two products have similar extent. It says nothing about when each peaks, so bioequivalence is not shown by F alone.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick calls two products bioequivalent because their AUCs match. On her figure, A and B share an AUC and peak at different times, and are not bioequivalent.</p>
<p class="xtrap">On the same slide she drew a fourth curve, D, beside A and wrote "this would be considered bioequivalence".</p>
<p class="xtrap">Her words after the relative problem: <q>these two have similar F's, but you don't know if they're bioequivalent because you don't know about the, the rate.</q></p>
<p class="gsrc">Source: 7a---Bioavailability-and-Bioequivalence.pdf, slides "Bioavailability", "Bioequivalence" and "Bioequivalence Example"; transcript 09-30</p></div></template>
<template data-x="bioequiv:rate-extent"><div class="xexp"><h4>Rate (t<sub>max</sub>) vs extent (AUC)</h4>
<p><b>In one line:</b> Rate is how fast the drug gets in; extent is how much gets in.</p>
<dl><dt>Rate</dt><dd>Read as the time of the peak, t<sub>max</sub>, in hours: when the maximum concentration occurs. It comes from the shape of the curve, not from F, the bioavailability fraction.</dd>
<dt>Extent</dt><dd>Read as the area under the plasma concentration against time curve (AUC), in (mg/L)hr. Both bioavailability equations (absolute, oral AUC over IV AUC; relative, test AUC over reference AUC) are ratios of AUC, so F measures extent only.</dd>
<dt>The quick test</dt><dd>On her figure, A and B have the same area but B peaks later: same extent, different rate. A and C peak together but C has half the area: same rate, different extent.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick treats a matching AUC as a matching rate, or expects F to carry information about the peak time.</p>
<p class="gsrc">Source: 7a---Bioavailability-and-Bioequivalence.pdf, slides "Bioavailability" (her note "AUC, Tmax") and "Bioequivalence Example"; transcript 09-30</p></div></template>
<template data-x="bioequiv:test-ref"><div class="xexp"><h4>Test vs reference product</h4>
<p><b>In one line:</b> The test product is the one being judged; the reference is the standard it is judged against, and the standard goes underneath.</p>
<dl><dt>Test product (A)</dt><dd>The product whose bioavailability is being asked about: the tablet in her problems, or a new product coming onto the market. Its area under the curve (AUC) is the numerator.</dd>
<dt>Reference product (B)</dt><dd>The standard or comparator: the oral solution in her relative problem, the originator product for a new generic, or the IV bolus in an absolute comparison. Its AUC is the denominator.</dd>
<dt>The quick test</dt><dd>"Compared to" names the reference. "The tablet compared to the oral solution" puts the solution's AUC underneath, and the dose ratio runs the other way: F<sub>rel</sub> = {{frac:AUC<sub>A</sub>|AUC<sub>B</sub>}} &times; {{frac:D<sub>B</sub>|D<sub>A</sub>}}, with D the dose.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick puts the product asked about in the denominator, which turns her 1.03 (tablet against oral solution) into 0.97 and her 0.55 (tablet against IV) into 1.82.</p>
<p class="gsrc">Source: 7a---Bioavailability-and-Bioequivalence.pdf, slides "Relative Bioavailability", "Practice Problem" (second) and "Bioequivalence"; transcript 09-30</p></div></template>
<template data-x="bioequiv:f-auc-dose"><div class="xexp"><h4>F from AUCs vs F from doses when the AUCs are equal</h4>
<p><b>In one line:</b> The full equation measures F from two areas; the short form uses a known F to find the oral dose that gives the same area.</p>
<dl><dt>F from AUCs</dt><dd>F<sub>abs</sub> = {{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}} &times; {{frac:D<sub>IV</sub>|D<sub>po</sub>}}: the areas under the curve (AUC) after the oral (po) and the IV dose, corrected for the two doses D. This is the measurement.</dd>
<dt>F from doses</dt><dd>When the oral AUC is to equal the IV AUC, the area ratio is 1 and F = {{frac:D<sub>IV</sub>|D<sub>po</sub>}}, so D<sub>po</sub> = {{frac:D<sub>IV</sub>|F}}. This is the use: an oral dose equivalent to an IV dose.</dd>
<dd>Her slide, an IV dose of 100 mg and F = 0.55: {{frac:100 mg|0.55}} = 182 mg, rounded to a strength that exists.</dd>
<dd>Ciprofloxacin, F = 70%, replacing a 400 mg IV dose: {{frac:400 mg|0.70}} = 571.43 mg, given as 575 or 600 mg.</dd>
<dt>The quick test</dt><dd>Asked for F? Use the AUCs. Asked for an oral dose to match an IV dose, or "the same extent of absorption"? Divide the IV dose by F, and expect a larger number.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick multiplies the IV dose by F and gets a smaller oral dose, or answers 571.43 mg as a tablet strength.</p>
<p class="gsrc">Source: 7a---Bioavailability-and-Bioequivalence.pdf, slide "Absolute Bioavailability" with her working, In-Class Activity page 18; transcript 09-30</p></div></template>

<template data-x="bioequiv:dpp-ba"><div class="xexp"><h4>Drug product performance vs bioavailability</h4>
<p><b>In one line:</b> Drug product performance is the release of the drug from the product; bioavailability is the rate and extent of absorption that the release leads to.</p>
<dl><dt>Drug product performance</dt><dd>The slide: "The release of the drug substance from the drug product leading to bioavailability of the drug substance." Her words: "If the drug does not release from dosage form, then the drug will not be available for the body to use."</dd>
<dt>Bioavailability</dt><dd>The slide: "The rate and extent to which the active ingredient or active moiety is absorbed from a drug product and becomes available at the site of action." F, the bioavailability factor, measures the extent.</dd>
<dt>The quick test</dt><dd>Release from the dosage form: product performance. Rate and extent absorbed and available at the site of action: bioavailability. Compared with the same drug given IV: absolute bioavailability.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> "Drug product performance" (or "product performance") is a wrong option in Quiz 4 Q10 and in her Exam 2 review items 8 and 11, which quote the slide definitions of bioavailability and of absolute bioavailability.</p>
<p class="gsrc">Source: 7a---Bioavailability-and-Bioequivalence.pdf slides "Drug Product Performance" and "Bioavailability"; transcript 09-30; Quiz 4 Q4-10 and Exam 2 In-Class Review items 8 and 11 (STYLE.md)</p></div></template>

<h3 data-exam="3">Dose, response and duration of activity (Module 7b)</h3>
<p class="sub">Pairs from the PK-PD lecture, separated by what changes and by which form of the equation the stem calls for. Symbols in the table:</p>
<ul class="tlist"><li>t<sub>eff</sub>: the duration of activity, the time one IV bolus keeps the level at or above C<sub>eff</sub>, the minimum effective concentration (MEC).</li>
<li>C<sub>0</sub>: the level just after the bolus, {{frac:D<sub>0</sub>|V<sub>D</sub>}}. k: the elimination rate constant. t<sub>&frac12;</sub>: the half-life.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>First one</th><th>Second one</th></tr></thead><tbody>
<tr><td>ln form vs log form vs 1.44 t<sub>&frac12;</sub> form <button type="button" class="chip xwhy" data-xpick="pkpd:teff-forms">Why?</button></td><td>ln form when k is given; log form needs the 2.3</td><td>1.44 t<sub>&frac12;</sub> form when the half-life is given</td></tr>
<tr><td>Doubling the dose: t<sub>eff</sub> vs C<sub>0</sub> <button type="button" class="chip xwhy" data-xpick="pkpd:double-dose">Why?</button></td><td>t<sub>eff</sub> gains one half-life</td><td>C<sub>0</sub> doubles</td></tr>
<tr><td>Doubling the dose vs doubling the half-life <button type="button" class="chip xwhy" data-xpick="pkpd:dose-thalf">Why?</button></td><td>Adds one half-life to t<sub>eff</sub></td><td>Doubles t<sub>eff</sub></td></tr>
<tr><td>t<sub>eff</sub> from a dose vs the dose for a t<sub>eff</sub> <button type="button" class="chip xwhy" data-xpick="pkpd:teff-dose">Why?</button></td><td>A log of the dose; on the sheet</td><td>D<sub>0</sub> = C<sub>eff</sub>V<sub>D</sub>e<sup>kt<sub>eff</sub></sup>; not on the sheet</td></tr>
<tr><td>Onset vs duration vs intensity <button type="button" class="chip xwhy" data-xpick="pkpd:curve-reads">Why?</button></td><td>Onset and duration are times read against the MEC</td><td>Intensity is a height above the MEC</td></tr>
<tr><td>Response vs dose, vs log dose, vs log concentration <button type="button" class="chip xwhy" data-xpick="pkpd:dose-plots">Why?</button></td><td>Steep rise, then flat; an S on log dose</td><td>A straight line, slope m, on log concentration</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="pkpd"><option value="">Choose a pair</option>
<option value="teff-forms">ln form vs log form vs 1.44 t½ form</option>
<option value="double-dose">Doubling the dose: teff vs C0</option>
<option value="dose-thalf">Doubling the dose vs doubling the half-life</option>
<option value="teff-dose">teff from a dose vs the dose for a teff</option>
<option value="curve-reads">Onset vs duration vs intensity</option>
<option value="dose-plots">Response vs dose, vs log dose, vs log concentration</option>
</select></label><div class="xout" data-xout="pkpd"></div></div>
<template data-x="pkpd:teff-forms"><div class="xexp"><h4>The three t<sub>eff</sub> forms, and when each is quickest</h4>
<p><b>In one line:</b> All three give the same duration of activity (t<sub>eff</sub>); pick the one that uses what the stem gives.</p>
<dl><dt>Natural-log form</dt><dd>t<sub>eff</sub> = {{frac:ln C<sub>0</sub> &minus; ln C<sub>eff</sub>|k}}, with C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}} the level after the bolus and C<sub>eff</sub> the minimum effective concentration. Quickest when k, the elimination rate constant, is given.</dd>
<dd>Her slide problem, 250 mg into 24 L, MEC 0.2 mg/L, k 0.15 hr<sup>&minus;1</sup>: ln of {{frac:10.42|0.2}}, divided by 0.15, is 26.35 hr.</dd>
<dt>Base-10 log form</dt><dd>t<sub>eff</sub> = {{frac:2.3(log C<sub>0</sub> &minus; log C<sub>eff</sub>)|k}}. The 2.3 converts base-10 to natural logs. It rounds 2.303, so it gives 26.32 hr for the same problem.</dd>
<dt>Half-life form</dt><dd>t<sub>eff</sub> = 1.44 t<sub>&frac12;</sub> ln({{frac:D<sub>0</sub>|V<sub>D</sub>C<sub>eff</sub>}}), with 1.44 = {{frac:1|0.693}}. Quickest when the half-life is given, and it shows that t<sub>eff</sub> is in direct proportion to t<sub>&frac12;</sub>.</dd>
<dt>The quick test</dt><dd>A k in the stem: ln form. A half-life: 1.44 t<sub>&frac12;</sub> form, or k = {{frac:0.693|t<sub>&frac12;</sub>}} first. Never mix a base-10 log into the ln form.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> She uses all three on her sheets: the ln form with k (her slide problem, Practice 1 and 2), the half-life over 0.693 (Practice 3) and 1.44 t<sub>&frac12;</sub> (In-Class Activity 1). All are on the equation sheet, page 2.</p>
<p class="gsrc">Source: 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slides "Relationship Between Dose and Duration of Activity (teff)", "Practice Problem" and the half-life slide; PK-PD Practice 1 to 3 Solutions; equation sheet page 2</p></div></template>
<template data-x="pkpd:double-dose"><div class="xexp"><h4>Doubling the dose: t<sub>eff</sub> against C<sub>0</sub></h4>
<p><b>In one line:</b> Doubling an IV bolus doubles the starting level, but adds only one half-life to the duration of activity.</p>
<dl><dt>C<sub>0</sub>, the level after the bolus</dt><dd>C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}, with D<sub>0</sub> the dose and V<sub>D</sub> the volume of distribution: twice the dose, twice the level, because the drug is linear and first order.</dd>
<dt>t<sub>eff</sub>, the duration of activity</dt><dd>The dose sits inside a logarithm, so twice the dose adds {{frac:ln 2|k}} = {{frac:0.693|k}}, one half-life. Four times the dose adds two half-lives.</dd>
<dd>Her slide problem: 26.35 hr at 250 mg, 30.97 hr at 500 mg (4.62 hr more, which is {{frac:0.693|0.15}}), 35.60 hr at 1000 mg.</dd>
<dd>Practice 1: 8.69 hr at 500 mg and 18.69 hr at 2000 mg, 10 hr more, two half-lives of 5 hr.</dd>
<dd>Halving the dose takes one half-life off. Her final-review poll: 1 g into 12.5 L, t&frac12; 4 hr, MEC 20 mg/L gives 8 hours; her follow-up at 500 mg gives 4 hours.</dd>
<dt>The quick test</dt><dd>Asked about the level: in proportion to the dose. Asked about the duration: count the doublings and add that many half-lives.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her poll: "Doubling the IV bolus dose of a drug that follows linear, first-order pharmacokinetics results in a 2-fold increase in the duration of activity." Her key is False.</p>
<p class="xtrap">Her Quiz 5: "Which of the following results when the IV bolus dose of a drug displaying linear, first-order pharmacokinetics is doubled?" Key: the duration of action is increased by one half-life.</p>
<p class="gsrc">Source: 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slides "Practice Problem" with her working, "Effect of Dose and Elimination Half-life on Duration of Activity" and the PollEv slide; PK-PD-Practice-1 Solutions</p>
<p class="gsrc">Also: Canvas Quiz 5 Q5-2; Final-Exam-Review-10.19.pdf slide 23; transcript 10-19</p></div></template>
<template data-x="pkpd:dose-thalf"><div class="xexp"><h4>Doubling the dose against doubling the half-life</h4>
<p><b>In one line:</b> The dose is inside the logarithm and the half-life multiplies it, so they move the duration of activity (t<sub>eff</sub>) very differently.</p>
<dl><dt>Doubling the dose</dt><dd>In t<sub>eff</sub> = 1.44 t<sub>&frac12;</sub> ln({{frac:D<sub>0</sub>|V<sub>D</sub>C<sub>eff</sub>}}), D<sub>0</sub> is the dose, V<sub>D</sub> the volume of distribution and C<sub>eff</sub> the minimum effective concentration. Twice D<sub>0</sub> adds one half-life.</dd>
<dd>Practice 3: 11.56 hr at 20 mg/kg and 15.16 hr at 40 mg/kg, 3.6 hr more, one half-life.</dd>
<dt>Doubling the half-life</dt><dd>t<sub>&frac12;</sub> multiplies the whole expression, so at the same dose t<sub>eff</sub> doubles. A disease that lowers hepatic or renal elimination prolongs t<sub>&frac12;</sub>, the duration, and the possibility of toxicity.</dd>
<dt>The quick test</dt><dd>Change in dose: add half-lives. Change in half-life: multiply t<sub>eff</sub> by the same factor.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her note beside the half-life form asks "what happens if t<sub>&frac12;</sub> increases, what happens to duration of action?" The wrong pick adds one half-life for a doubled t<sub>&frac12;</sub>, or doubles t<sub>eff</sub> for a doubled dose.</p>
<p class="xtrap">Her Quiz 5: "what is the impact on duration of activity if there is an increase in elimination half-life?" Key: duration of activity will increase.</p>
<p class="gsrc">Source: 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slides "Effect of Dose and Elimination Half-life on Duration of Activity" and "Effect of Elimination Half-life on Duration of Activity"; PK-PD-Practice-3 Solutions</p></div></template>
<template data-x="pkpd:teff-dose"><div class="xexp"><h4>t<sub>eff</sub> from a dose against the dose for a t<sub>eff</sub></h4>
<p><b>In one line:</b> The same IV bolus line solved two ways: for the time, which takes a logarithm, or for the dose, which takes an exponential.</p>
<dl><dt>t<sub>eff</sub> from a dose</dt><dd>t<sub>eff</sub> = {{frac:ln C<sub>0</sub> &minus; ln C<sub>eff</sub>|k}}, with C<sub>0</sub> the level after the bolus, C<sub>eff</sub> the minimum effective concentration and k the elimination rate constant. Printed on the sheet.</dd>
<dt>The dose for a t<sub>eff</sub></dt><dd>Set C<sub>eff</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}e<sup>&minus;kt<sub>eff</sub></sup> and solve: D<sub>0</sub> = C<sub>eff</sub>V<sub>D</sub>e<sup>kt<sub>eff</sub></sup>, with a plus sign in the exponent. Not on the sheet.</dd>
<dd>In-Class Activity 1: k 0.231 hr<sup>&minus;1</sup>, V<sub>D</sub> 25 L, MEC 1.2 mg/L, 12 hours: (1.2)(25)e<sup>(0.231)(12)</sup> = 479.72 mg.</dd>
<dd>Doubling her slide problem's 26.35 hr to 52.7 hr takes (0.2 mg/L)(24 L)e<sup>(0.15)(52.7)</sup> = 13,012 mg, about 13 g, against 250 mg.</dd>
<dt>The quick test</dt><dd>"What is the duration" takes the log form. "What dose would yield" or "what dose would double" takes the exponential, and the answer is larger than C<sub>eff</sub>V<sub>D</sub>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick uses e<sup>&minus;kt</sup> in the dose line, or doubles the dose to double the duration. Per-kg stems want the answer per kg (Practice 2: 777.5 mg, 10.4 mg/kg).</p>
<p class="gsrc">Source: 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, her working after the "Practice Problem" slide and the In-Class Activity "PK-PD"; PK-PD-Practice-2 Solutions</p></div></template>
<template data-x="pkpd:curve-reads"><div class="xexp"><h4>Onset, duration and intensity</h4>
<p><b>In one line:</b> All three are read on a plasma level against time curve against the minimum effective concentration (MEC); two are times and one is a height.</p>
<dl><dt>Onset time</dt><dd>When the rising level first reaches the MEC.</dd>
<dt>Duration</dt><dd>The time between the two crossings of the MEC: the time the drug is in its effective range. After an IV bolus it is t<sub>eff</sub>.</dd>
<dt>Intensity</dt><dd>How far the peak rises above the MEC.</dd>
<dt>MEC against MTC</dt><dd>The MEC (C<sub>eff</sub> in the t<sub>eff</sub> equations) is the lower dashed line; the minimum toxic concentration (MTC) is the upper one. The range between them is the therapeutic window.</dd>
<dt>The quick test</dt><dd>A time measured along the MEC line: onset or duration. A vertical distance above the MEC: intensity. C<sub>eff</sub> is never the MTC.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her PK-PD poll (slide 12) and Quiz 5 do not ask these three. They are labelled on her "Relationship of Dose to Pharmacologic Effect" figure, with her note on duration: "time the drug is in an effective therapeutic range".</p>
<p class="gsrc">Source: 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slides "Relationship of Dose to Pharmacologic Effect" and "Practice Problem" (MEC or Ceff)</p></div></template>
<template data-x="pkpd:dose-plots"><div class="xexp"><h4>Response against dose, log dose and log concentration</h4>
<p><b>In one line:</b> One relationship drawn on three axes: a rise that flattens, an S, and a straight line.</p>
<dl><dt>Response against dose</dt><dd>On an ordinary axis it rises steeply at low doses and flattens near the maximum response: a large increase early, then a plateau.</dd>
<dt>Response against log dose</dt><dd>A sigmoid (S-shaped) curve. The maximum is reached when all receptors are saturated.</dd>
<dt>Effect against log concentration</dt><dd>The straight middle of the S, with slope m. After an IV bolus the effect then falls in a straight line with time: E = E<sub>0</sub> &minus; {{frac:kmt|2.3}}, with E<sub>0</sub> the effect at time zero and k the elimination rate constant.</dd>
<dt>The quick test</dt><dd>Read the axis first. An ordinary dose axis: steep then flat. A log dose axis: an S. Log concentration in the straight range: a line of slope m.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her first objective for the module: the response increases with concentration or dose up to a maximum response. Quiz 5 did not ask it. On the ordinary dose plot a given dose change gives the smallest rise near the maximum.</p>
<p class="gsrc">Source: 7b---Pharmacokinetics-and-Pharmacodynamics.pdf, slides "Relationship of Dose to Pharmacologic Effect", "Typical Log Dose-versus-Pharmacologic Response Curves" and "Summary"</p></div></template>

<h3 data-exam="3">Linear and nonlinear pharmacokinetics (Module 8)</h3>
<p class="sub">Pairs from the nonlinear lecture, separated by what stays constant and what changes with the concentration. Symbols in the table:</p>
<ul class="tlist"><li>V<sub>max</sub>: the maximum elimination rate. K<sub>M</sub>: the Michaelis constant. C<sub>p</sub>: the plasma concentration; C<sub>ss</sub>: the steady-state concentration.</li>
<li>R: the dose rate. t<sub>&frac12;</sub>: the half-life. Cl<sub>T</sub>: the total body clearance.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>First one</th><th>Second one</th></tr></thead><tbody>
<tr><td>Linear vs nonlinear <button type="button" class="chip xwhy" data-xpick="nonlin:lin-nonlin">Why?</button></td><td>Parameters the same at every dose; AUC in proportion</td><td>Parameters change with dose; AUC out of proportion</td></tr>
<tr><td>K<sub>M</sub> vs V<sub>max</sub> <button type="button" class="chip xwhy" data-xpick="nonlin:km-vmax">Why?</button></td><td>A concentration, mg/L; enzyme capacity</td><td>A rate, mg/day; the fastest elimination</td></tr>
<tr><td>C<sub>p</sub> much greater vs much less than K<sub>M</sub> <button type="button" class="chip xwhy" data-xpick="nonlin:high-low">Why?</button></td><td>High: rate = V<sub>max</sub>, zero order</td><td>Low: rate in proportion to C<sub>p</sub>, first order</td></tr>
<tr><td>t<sub>&frac12;</sub> and Cl: first order vs saturable <button type="button" class="chip xwhy" data-xpick="nonlin:thalf-cl">Why?</button></td><td>Constant: {{frac:0.693|k}} and kV<sub>D</sub></td><td>t<sub>&frac12;</sub> rises and Cl<sub>T</sub> falls as C<sub>p</sub> rises</td></tr>
<tr><td>R vs V<sub>max</sub> <button type="button" class="chip xwhy" data-xpick="nonlin:r-vmax">Why?</button></td><td>R: the dose rate given</td><td>V<sub>max</sub>: the fastest rate removed</td></tr>
<tr><td>Steady state: linear vs nonlinear <button type="button" class="chip xwhy" data-xpick="nonlin:ss">Why?</button></td><td>3 to 5 half-lives; C<sub>ss</sub> in proportion to R</td><td>2 to 3 weeks; C<sub>ss</sub> climbs steeply near V<sub>max</sub></td></tr>
<tr><td>K<sub>M</sub> line vs V<sub>max</sub> line <button type="button" class="chip xwhy" data-xpick="nonlin:direct">Why?</button></td><td>K<sub>M</sub> first, from both pairs</td><td>V<sub>max</sub> second, from either pair</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="nonlin"><option value="">Choose a pair</option>
<option value="lin-nonlin">Linear vs nonlinear</option>
<option value="km-vmax">KM vs Vmax</option>
<option value="high-low">Cp much greater vs much less than KM</option>
<option value="thalf-cl">t½ and Cl: first order vs saturable</option>
<option value="r-vmax">R vs Vmax</option>
<option value="ss">Steady state: linear vs nonlinear</option>
<option value="direct">KM line vs Vmax line</option>
</select></label><div class="xout" data-xout="nonlin"></div></div>
<template data-x="nonlin:lin-nonlin"><div class="xexp"><h4>Linear vs nonlinear pharmacokinetics</h4>
<p><b>In one line:</b> In linear pharmacokinetics the parameters do not change with the dose; in nonlinear pharmacokinetics they do.</p>
<dl><dt>Linear</dt><dd>Parameters such as the half-life and the clearance do not change when different or multiple doses are given. The area under the curve (AUC) rises in proportion to the dose. Most drugs.</dd>
<dt>Nonlinear</dt><dd>Increased doses or chronic administration cause deviations from the single-dose profile. The half-life changes with dose, the AUC is out of proportion to the dose, and a small dose change can give a large change in concentration.</dd>
<dd>Other drugs needing the same enzyme or carrier system can affect the saturation, and the ratio of metabolites can change with the dose. Phenytoin is the course's example.</dd>
<dt>The quick test</dt><dd>Does doubling the dose double the AUC and leave the half-life alone? Linear. Does the half-life or clearance change with the dose? Nonlinear.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her written question, "What is the difference between linear and non-linear pharmacokinetics?" The wrong pick calls linear zero order and nonlinear first order.</p>
<p class="gsrc">Source: 8 - Nonlinear PK.pdf, slides "Linear vs. Nonlinear Pharmacokinetics", the AUC-versus-dose figure, "Saturation Kinetics" and "Summary"; Nonlinear-Solutions-2.pdf question 2; transcript 10-14</p></div></template>
<template data-x="nonlin:km-vmax"><div class="xexp"><h4>K<sub>M</sub> vs V<sub>max</sub></h4>
<p><b>In one line:</b> V<sub>max</sub> is a rate and K<sub>M</sub> is a concentration; both are constants for one drug in one patient.</p>
<dl><dt>V<sub>max</sub>, the maximum elimination rate</dt><dd>As fast as the body will eliminate the drug. Units of concentration or amount per time: mg/day, or mg/kg/day when dosing is per kilogram.</dd>
<dd>A higher V<sub>max</sub> with the same K<sub>M</sub> removes the drug faster: her capacity-limited figure compares 100 and 200 mg/hr.</dd>
<dt>K<sub>M</sub>, the Michaelis constant</dt><dd>Reflects the capacity of the enzyme system. Units of concentration, mg/L, so it can be set against the plasma concentration C<sub>p</sub>.</dd>
<dt>Both</dt><dd>Constant for a given drug in a given patient, and different from one patient to another.</dd>
<dt>The quick test</dt><dd>A unit per time: V<sub>max</sub>. A unit of concentration: K<sub>M</sub>. A K<sub>M</sub> answer in mg/day means the units did not cancel.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her Quiz 5 item compares the plasma concentration with K<sub>M</sub> in two options and with V<sub>max</sub> in two; only K<sub>M</sub> is a concentration. After the quiz she named what was missed: "KM and concentration."</p>
<p class="gsrc">Source: 8 - Nonlinear PK.pdf, slides "Parameters" and "Saturable-Enzymatic Elimination Processes", and the capacity-limited figure; transcript 10-14, 10-19; Canvas Quiz 5 Q5-5</p></div></template>
<template data-x="nonlin:high-low"><div class="xexp"><h4>C<sub>p</sub> much greater than K<sub>M</sub> vs much less than K<sub>M</sub></h4>
<p><b>In one line:</b> A saturable drug is zero order at high concentrations and first order at low ones.</p>
<dl><dt>The rate law</dt><dd>&minus;{{frac:dC<sub>p</sub>|dt}} = {{frac:V<sub>max</sub>C<sub>p</sub>|K<sub>M</sub> + C<sub>p</sub>}}, with C<sub>p</sub> the plasma concentration, V<sub>max</sub> the maximum elimination rate and K<sub>M</sub> the Michaelis constant.</dd>
<dt>C<sub>p</sub> much greater than K<sub>M</sub></dt><dd>K<sub>M</sub> is negligible, C<sub>p</sub> cancels, and the rate equals V<sub>max</sub>: independent of concentration, which is zero order. More dose cannot be removed faster, so the drug accumulates.</dd>
<dt>C<sub>p</sub> much less than K<sub>M</sub></dt><dd>C<sub>p</sub> is negligible beside K<sub>M</sub>, and the rate is {{frac:V<sub>max</sub>|K<sub>M</sub>}} &times; C<sub>p</sub> = k&prime;C<sub>p</sub>: in proportion to concentration, which looks first order.</dd>
<dt>The quick test</dt><dd>High concentration, high dose: zero order. Low concentration, early doses: first order.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her poll: "Drugs that display Michaelis-Menten saturation kinetics will often exhibit zero-order kinetics at low concentrations and first-order kinetics at high concentrations." Her key is False.</p>
<p class="xtrap">Her words on the result: <q>Low concentrations looks like 1st order, high concentrations looks like zero order, OK?</q></p>
<p class="xtrap">Her Quiz 5 key: "At low concentrations of drug in the plasma relative to KM, the elimination rate depends on the concentration." The wrong options compare the level with V<sub>max</sub>, a rate, or call the rate independent.</p>
<p class="gsrc">Source: 8 - Nonlinear PK.pdf, slide "Saturable-Enzymatic Elimination Processes" with her notes, and the PollEv; transcript 10-14; Canvas Quiz 5 Q5-5</p></div></template>
<template data-x="nonlin:thalf-cl"><div class="xexp"><h4>Half-life and clearance: first-order drug vs saturable drug</h4>
<p><b>In one line:</b> For a first-order drug both are constants; for a saturable drug both depend on the concentration they are taken at.</p>
<dl><dt>First-order drug</dt><dd>t<sub>&frac12;</sub> = {{frac:0.693|k}} and Cl = kV<sub>D</sub>, with k the elimination rate constant and V<sub>D</sub> the volume of distribution. Neither depends on concentration.</dd>
<dt>Saturable drug</dt><dd>t<sub>&frac12;</sub> = V<sub>D</sub>({{frac:0.693|V<sub>max</sub>}})(K<sub>M</sub> + C<sub>p</sub>) rises as C<sub>p</sub> rises. Cl<sub>T</sub> = {{frac:V<sub>max</sub>|K<sub>M</sub> + C<sub>p</sub>}} falls, because C<sub>p</sub> is in the denominator.</dd>
<dd>Her Solutions 2 (K<sub>M</sub> 9 mg/L, V<sub>max</sub> 500 mg/day, 56.25 L): 1.87 days and 20.8 L/day at 15 mg/L; 2.34 days and 16.7 L/day at 21 mg/L.</dd>
<dt>The quick test</dt><dd>A question that names a concentration for the half-life or clearance is a saturable drug: use the page 2 lines with that C<sub>p</sub>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Her written question, "What changes in t½ and ClT are usually observed with increased concentrations of drugs that exhibit nonlinear pharmacokinetics?" t<sub>&frac12;</sub> increases, Cl<sub>T</sub> decreases.</p>
<p class="gsrc">Source: 8 - Nonlinear PK.pdf, slides "Dependence of Elimination Half-Life on Dose", "Dependence of Clearance on Dose" and "Summary"; Nonlinear-Solutions-2.pdf; transcript 10-14</p></div></template>
<template data-x="nonlin:r-vmax"><div class="xexp"><h4>R vs V<sub>max</sub></h4>
<p><b>In one line:</b> Both are amounts per time; R is what is given, V<sub>max</sub> is the most the body can remove.</p>
<dl><dt>R, the dose rate</dt><dd>The amount of drug given per unit time, such as mg/day. In R = {{frac:V<sub>max</sub>C<sub>ss</sub>|K<sub>M</sub> + C<sub>ss</sub>}} it is the daily dose that holds the steady-state concentration C<sub>ss</sub>.</dd>
<dd>Her first Example: V<sub>max</sub> 8 mg/kg/day, K<sub>M</sub> 5 mg/L, 24 mg/L: R = 6.62 mg/kg/day, times 65 kg, 430 mg/day.</dd>
<dt>V<sub>max</sub>, the maximum elimination rate</dt><dd>A property of the patient's enzyme system, not a dose. R is always smaller than V<sub>max</sub>, because {{frac:C<sub>ss</sub>|K<sub>M</sub> + C<sub>ss</sub>}} is less than 1.</dd>
<dt>The quick test</dt><dd>"Daily dose rate", "recommend a daily dose": R. "As fast as this process can proceed": V<sub>max</sub>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The answer must be a rate, not a bare amount, and per patient, not per kilogram, when a weight is given. The R of Module 3 is an infusion rate in mg/hr; this R is a daily dose rate.</p>
<p class="gsrc">Source: 8 - Nonlinear PK.pdf, slides "In Vivo Determination of KM and Vmax" (her note "R represents our dose rate (amt per unit time)") and "Example"; transcript 10-14</p></div></template>
<template data-x="nonlin:ss"><div class="xexp"><h4>Steady state: linear vs nonlinear</h4>
<p><b>In one line:</b> A nonlinear drug takes longer to reach steady state, and its steady-state level does not rise in proportion to the dose.</p>
<dl><dt>Linear drug</dt><dd>Steady state after 3 to 5 half-lives. The steady-state concentration rises in proportion to the dose rate.</dd>
<dt>Nonlinear drug</dt><dd>Depending on the drug, 2 to 3 weeks to reach what is clinically taken as steady state. C<sub>ss</sub> = {{frac:RK<sub>M</sub>|V<sub>max</sub> &minus; R}}: as the dose rate R nears V<sub>max</sub>, the denominator shrinks and C<sub>ss</sub> climbs steeply.</dd>
<dd>Her slide Example 2: 6 mg/kg/day gave 10 mg/L and 8 mg/kg/day gave 20 mg/L, a one-third rise in dose for twice the level.</dd>
<dt>The quick test</dt><dd>"3 to 5 half-lives" belongs to linear kinetics. A disproportionately large rise in C<sub>ss</sub> for a small dose increase is nonlinear.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> In numbers: the C<sub>ss</sub> at a third dose by C<sub>ss</sub> = {{frac:RK<sub>M</sub>|V<sub>max</sub> &minus; R}}. In-Class Practice 4(e): 11.5 mg/L at 400 mg daily. Solutions 1(d): 13.5 mg/L at 450 mg daily.</p>
<p class="gsrc">Source: 8 - Nonlinear PK.pdf, slides "In Vivo Determination of KM and Vmax" (her note "it will take longer to reach steady state"), "Example" and her working on the closing pages; transcript 10-14</p></div></template>
<template data-x="nonlin:direct"><div class="xexp"><h4>The K<sub>M</sub> line vs the V<sub>max</sub> line (direct method)</h4>
<p><b>In one line:</b> K<sub>M</sub> needs both dose-and-level pairs; V<sub>max</sub> then needs only one.</p>
<dl><dt>K<sub>M</sub> first</dt><dd>K<sub>M</sub> = {{frac:R<sub>2</sub> &minus; R<sub>1</sub>|a<sub>1</sub> &minus; a<sub>2</sub>}}, with a<sub>1</sub> = {{frac:R<sub>1</sub>|C<sub>1</sub>}} and a<sub>2</sub> = {{frac:R<sub>2</sub>|C<sub>2</sub>}}: each dose rate R over its own steady-state level C. The rate units cancel, leaving mg/L.</dd>
<dt>V<sub>max</sub> second</dt><dd>V<sub>max</sub> = {{frac:R(K<sub>M</sub> + C<sub>ss</sub>)|C<sub>ss</sub>}} with one pair. The other pair must give the same value.</dd>
<dd>Her slide Example 2: K<sub>M</sub> = {{frac:8 &minus; 6|0.6 &minus; 0.4}} = 10 mg/L; V<sub>max</sub> = 12 mg/kg/day from either pair.</dd>
<dt>The quick test</dt><dd>Two doses and two levels, asked for K<sub>M</sub>: the direct method. Asked for V<sub>max</sub>: the K<sub>M</sub> first, then one pair.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> Every sheet asks K<sub>M</sub> before V<sub>max</sub>. The wrong pick mixes one pair's R with the other's C<sub>ss</sub>, or leaves K<sub>M</sub> in a rate unit. The K<sub>M</sub> line is on the sheet; the V<sub>max</sub> line is not.</p>
<p class="gsrc">Source: 8 - Nonlinear PK.pdf, slides "Determination of KM and Vmax by Direct Method", "Example" and her working on the next slide; Nonlinear-Solutions-1.pdf and 2.pdf; transcript 10-14</p></div></template>
`;
