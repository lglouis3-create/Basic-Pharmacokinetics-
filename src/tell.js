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
   STYLE.md. Where two sources differ, both are stated.
   ========================================================================== */
const TELL_HTML = `
<h2>Tell apart</h2>
<p class="sub">Things students mix up, Modules 1 to 7a, each as a short table. Nothing here is scored.</p>
<details class="tabhelp" open><summary>What this tab is for</summary><ul>
<li><b>Start with the dosing-model table.</b> How the drug goes in decides the curve and the equation; the table gives the route, the shape, the defining equation and how to recognise the model in a question.</li>
<li><b>Why?</b> on any row, or <b>Explain one</b> under a table, opens the full explanation. For a dosing model it includes the curve, each equation on its own line, and how she tests it.</li>
<li><b>See the eight curves side by side</b> under the dosing table to compare the shapes on one set of axes.</li>
<li>The other tables are the pairs she tests against each other: orders, half-lives, concentrations, clearances, F values.</li>
</ul></details>

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
<tr><td><b>IV infusion, one compartment</b> (M3) <button type="button" class="chip xwhy" data-xpick="dosing:m3-infusion">Why?</button></td><td>Constant rate (zero order) in; first order out</td><td>Starts at zero, rises, levels off at C<sub>ss</sub>; falls once stopped</td><td>C<sub>p</sub> = {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>)</td><td>A rate in mg/hr; "Recommend an infusion rate"; "after cessation of the infusion"</td></tr>
<tr><td><b>Loading dose with an infusion</b> (M3) <button type="button" class="chip xwhy" data-xpick="dosing:m3-loading">Why?</button></td><td>An IV bolus at the moment the infusion starts</td><td>Flat at C<sub>ss</sub> from the start, if the loading dose is right</td><td>D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub></td><td>"loading dose"; "reach &hellip; immediately"; bolus given "simultaneously"</td></tr>
<tr><td><b>Single oral dose, first-order absorption</b> (M5) <button type="button" class="chip xwhy" data-xpick="dosing:m5-oral">Why?</button></td><td>First order in (k<sub>a</sub>); first order out (k)</td><td>Rises to a peak (C<sub>max</sub> at t<sub>max</sub>), then falls</td><td>C<sub>p</sub> = {{frac:Fk<sub>a</sub>D<sub>0</sub>|V<sub>D</sub>(k<sub>a</sub> &minus; k)}}(e<sup>&minus;kt</sup> &minus; e<sup>&minus;k<sub>a</sub>t</sup>)</td><td>A capital F; a k<sub>a</sub> or absorption half-life; a curve with a peak</td></tr>
<tr><td><b>Repeated IV bolus</b> (M6) <button type="button" class="chip xwhy" data-xpick="dosing:m6-bolus">Why?</button></td><td>The same bolus dose every &tau; hours</td><td>Saw-tooth; peaks and troughs climb to a plateau in 3 to 5 half-lives</td><td>C<sub>max</sub><sup>&infin;</sup> = {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}</td><td>An IV dose "every 8 hours"; steady-state peak, trough or average asked</td></tr>
<tr><td><b>Intermittent IV infusion</b> (M6) <button type="button" class="chip xwhy" data-xpick="dosing:m6-infusion">Why?</button></td><td>Each dose infused at a constant rate over a set time</td><td>Rises during each infusion, falls after it; the next rise starts higher</td><td>C = C<sub>end</sub>e<sup>&minus;kt</sup>, one term per infusion</td><td>A dose "over 2 hours", and a second infusion started hours later</td></tr>
<tr><td><b>Multiple oral doses</b> (M6a) <button type="button" class="chip xwhy" data-xpick="dosing:m6a-oral">Why?</button></td><td>The same oral dose every &tau;; first order in, first order out</td><td>Rounded peaks and troughs climbing to a plateau</td><td>C<sub>max</sub><sup>&infin;</sup> = {{frac:FD<sub>0</sub>|V<sub>D</sub>}}({{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}})e<sup>&minus;kt<sub>max</sub>&infin;</sup></td><td>F and k<sub>a</sub> with a dosing interval; first dose against steady state</td></tr>
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
<p class="xtrap"><b>How she tests it:</b> "Our input is zero order, constant in, first order out. When we stop the in, then it's just out." Her stems say whether the infusion reached steady state; if not, C<sub>peak</sub> is computed first.</p>
<p class="gsrc">Source: 3IntravenousInfusions.pdf slides "Intravenous Infusion", "Drug Concentration at Steady-State", "Drug Concentration Prior to Reaching Steady-State", "Drug Concentration after an IV Infusion has Ended"; transcript 09-02</p></div></template>

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
<tr><td>Rate vs rate constant <button type="button" class="chip xwhy" data-xpick="orders:rate-k">Why?</button></td><td>Amount per time, such as mg/hr; changes along a first-order curve</td><td>First order: hr<sup>&minus;1</sup>; does not change; never negative</td></tr>
<tr><td>Straight line on linear vs semi-log axes <button type="button" class="chip xwhy" data-xpick="orders:axes">Why?</button></td><td>Concentration axis in equal steps: zero order</td><td>Labels step by 10 (1, 10, 100, 1000): first order</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="orders"><option value="">Choose a pair</option>
<option value="zero-first">Zero order vs first order</option>
<option value="half-lives">Half-life, zero order vs first order</option>
<option value="rate-k">Rate vs rate constant</option>
<option value="axes">Straight line on linear vs semi-log axes</option>
</select></label><div class="xout" data-xout="orders"></div></div>
<template data-x="orders:zero-first"><div class="xexp"><h4>Zero order vs first order</h4>
<p><b>In one line:</b> They differ in whether the rate depends on how much drug is present. Everything else follows from that one difference.</p>
<dl><dt>Zero order</dt><dd>The amount or concentration falls at a constant rate, and the rate does not depend on concentration. Its rate constant carries amount or concentration per unit time, such as mg/mL per day.</dd>
<dd>A straight line on linear axes; a curve on semi-logarithmic axes (concentration axis labelled 1, 10, 100, 1000; time axis in equal steps).</dd>
<dt>First order</dt><dd>The amount or concentration falls at a rate proportional to what remains. The rate is highest when the concentration is highest, and slows as the concentration falls.</dd>
<dd>Its rate constant, k, carries reciprocal time, hr<sup>&minus;1</sup>. A curve on linear axes; a straight line on semi-logarithmic axes.</dd>
<dt>The quick test</dt><dd>Read the units of the rate constant, or check which axes make the line straight. Read the axis labels before the shape.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> A straight line on an axis labelled 1, 10, 100, 1000 is a first-order process on a semi-logarithmic scale, not a zero-order process. The axis will not say "log".</p>
<p class="xtrap">A second route to the error: the first-order <i>rate</i> is not constant, and the first-order <i>half-life</i> is. Learning "first order is the constant one" attaches it to the wrong quantity.</p>
<p class="gsrc">Source: Introduction.pdf slides 17, 18, 21; transcript 08-19, 08-24, 09-09</p></div></template>
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

<h3 data-exam="1">Models</h3>
<p class="sub">Model types, separated by how the compartments connect and by whether distribution takes time. A semi-log plot has log concentration against time.</p>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>Mammillary, catenary, physiologic <button type="button" class="chip xwhy" data-xpick="model-pairs:connections">Why?</button></td><td>Joined to one centre: mammillary; a chain: catenary; organs and blood flow: physiologic</td></tr>
<tr><td>One compartment vs two compartments <button type="button" class="chip xwhy" data-xpick="model-pairs:one-two">Why?</button></td><td>Semi-log plot: one straight line (one), or a steep early phase then a shallower line (two)</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="model-pairs"><option value="">Choose a pair</option>
<option value="connections">Mammillary, catenary, physiologic</option>
<option value="one-two">One compartment vs two compartments</option>
</select></label><div class="xout" data-xout="model-pairs"></div></div>
<template data-x="model-pairs:connections"><div class="xexp"><h4>Mammillary, catenary and physiologic models</h4>
<p><b>In one line:</b> They differ in how the compartments are connected, and in whether compartments are used at all.</p>
<dl><dt>Mammillary</dt><dd>Every peripheral compartment connects directly to the same central compartment.</dd>
<dd>The deck draws compartment 1 in the middle, joined to compartment 2 by the rate constants k<sub>12</sub> and k<sub>21</sub> (one for each direction of transfer) and to compartment 3 by k<sub>13</sub> and k<sub>31</sub>.</dd>
<dd>A handwritten note on Introduction slide 13 marks the mammillary model as the one used most often.</dd>
<dt>Catenary</dt><dd>The compartments sit in a single chain, 1 to 2 to 3, so drug cannot reach compartment 3 without passing through compartment 2.</dd>
<dt>Physiologic</dt><dd>Not a compartment model at all. It is a blood flow or perfusion model built on known anatomic and physiologic data. The course sets it aside because it requires more input than the course takes on.</dd>
<dt>The quick test</dt><dd>Look at the connections, not the number of boxes: both compartment models can have three boxes.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick chooses by the number of compartments instead of by the connections. What differs is whether the outer boxes each connect to the centre or are connected in series.</p>
<p class="xtrap">Choosing physiologic for a question about how compartments connect misses that a physiologic model replaces compartments with organs and blood flows.</p>
<p class="gsrc">Source: Introduction.pdf slides 12 and 13; transcript 08-19 poll 2, 09-09</p></div></template>
<template data-x="model-pairs:one-two"><div class="xexp"><h4>One compartment vs two compartments</h4>
<p><b>In one line:</b> They differ in whether distribution takes time.</p>
<dl><dt>One compartment</dt><dd>The drug is uniformly distributed throughout the body as soon as it enters, and elimination begins immediately. A semi-logarithmic plot (log concentration against time) is a single straight line.</dd>
<dt>Two compartments</dt><dd>The drug reaches some organs preferentially before it is uniformly distributed. So the semi-logarithmic plot has a steeper early distribution phase above a shallower terminal elimination phase.</dd>
<dt>The quick test</dt><dd>Count the straight segments on the semi-logarithmic plot. On the exam the compartment count is either stated in the stem or readable from the graph; she says she must tell you which.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick fits one straight line through all the points of a two-compartment data set.</p>
<p class="xtrap">That gives one slope where there are two, and a half-life (the time for the concentration to fall by half) that belongs to neither phase.</p>
<p class="xtrap">Reading the early steep segment as noise, not as the distribution phase, is the same error.</p>
<p class="gsrc">Source: 2IVBolusAdministration.pdf slides "Why Multicompartment Models?" and "Plasma Level-Time Curve for Two-Compartment Model"; transcript 08-26 cues 8 and 9</p></div></template>

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
<tr><td>V<sub>D</sub>, V<sub>p</sub>, V<sub>t</sub>, and the two routes to V<sub>p</sub> <button type="button" class="chip xwhy" data-xpick="volumes:vd-vp-vt">Why?</button></td><td>One compartment: V<sub>D</sub>. Two: V<sub>p</sub> (central) and V<sub>t</sub> (tissue). All in litres</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="volumes"><option value="">Choose a set</option>
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

<h3 data-exam="2">Clearance and the kidney</h3>
<p class="sub">Clearances, kidney processes and fractions, separated by whose clearance it is and which way the drug moves. A clearance is the volume of plasma cleared of drug per unit time. GFR, the glomerular filtration rate, is how fast the kidney filters plasma.</p>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>Total, renal, hepatic clearance, and f<sub>e</sub> <button type="button" class="chip xwhy" data-xpick="kidney:cl-split">Why?</button></td><td>Cl<sub>T</sub> = Cl<sub>R</sub> + Cl<sub>H</sub>; f<sub>e</sub> has no units, so it is not a clearance</td></tr>
<tr><td>Renal clearance vs creatinine clearance <button type="button" class="chip xwhy" data-xpick="kidney:renal-crcl">Why?</button></td><td>The drug's clearance (L/hr) vs the patient's kidney function (mL/min)</td></tr>
<tr><td>Filtration, active secretion, reabsorption <button type="button" class="chip xwhy" data-xpick="kidney:three-processes">Why?</button></td><td>Cl<sub>R</sub> near 120 mL/min: filtration; above: secretion too; below: reabsorption</td></tr>
<tr><td>Creatinine vs inulin for measuring GFR (glomerular filtration rate) <button type="button" class="chip xwhy" data-xpick="kidney:creat-inulin">Why?</button></td><td>Inulin: given, almost fully filtered. Creatinine: already present, also secreted</td></tr>
<tr><td>Capital F vs lower-case f<sub>e</sub> <button type="button" class="chip xwhy" data-xpick="kidney:f-fe">Why?</button></td><td>F: fraction reaching systemic circulation; f<sub>e</sub>: fraction unchanged in urine</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="kidney"><option value="">Choose a pair</option>
<option value="cl-split">Total, renal, hepatic clearance, and fe</option>
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
<p class="gsrc">Source: 4---Clearance-and-Elimination.pdf slides 8, 9, 10, 11; transcript 09-14</p></div></template>
<template data-x="kidney:renal-crcl"><div class="xexp"><h4>Renal clearance vs creatinine clearance</h4>
<p><b>In one line:</b> They differ in whose clearance is being estimated: the drug's, or the patient's kidney function.</p>
<dl><dt>Renal clearance</dt><dd>The clearance of the drug by the kidney (the volume of plasma the kidney clears of drug per unit time), obtained from f<sub>e</sub> (the fraction excreted unchanged) and the total clearance. Quoted in L/hr.</dd>
<dt>Creatinine clearance</dt><dd>An estimate of the patient's glomerular filtration rate (how fast the kidney filters plasma), and so of the patient's renal function, obtained from Cockcroft-Gault, the equation that uses age, ideal body weight, serum creatinine and sex.</dd>
<dd>It is about the patient, not about the drug, and is quoted in mL/min.</dd>
<dt>The quick test</dt><dd>Ask what is being cleared: the drug, or creatinine as a measure of the patient's kidneys. The units separate them in practice.</dd></dl>
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

<h3 data-exam="1">Concentrations and doses</h3>
<p class="sub">Named concentrations and doses, separated by the route that produced the curve and the parameter that sets each one. Symbols in the table:</p>
<ul class="tlist"><li>V<sub>D</sub>: the volume of distribution, linking the amount in the body to the concentration. Cl: the clearance, the volume of plasma cleared of drug per hour.</li>
<li>R: the infusion rate in mg/hr. k: the elimination rate constant.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>Quick test</th></tr></thead><tbody>
<tr><td>C<sub>ss</sub>, C<sub>max</sub>, C<sub>0</sub> <button type="button" class="chip xwhy" data-xpick="conc-doses:css-cmax-c0">Why?</button></td><td>C<sub>0</sub>: IV bolus at time zero; C<sub>ss</sub>: infusion plateau; C<sub>max</sub>: oral peak at t<sub>max</sub></td></tr>
<tr><td>Loading dose vs maintenance infusion rate <button type="button" class="chip xwhy" data-xpick="conc-doses:ld-rate">Why?</button></td><td>D<sub>L</sub> = C<sub>ss</sub> &times; V<sub>D</sub> (mg); R = C<sub>ss</sub> &times; Cl (mg/hr)</td></tr>
<tr><td>C<sub>ss</sub> vs the concentration at the end of an infusion <button type="button" class="chip xwhy" data-xpick="conc-doses:css-end">Why?</button></td><td>Did the infusion reach steady state? If not, start from {{frac:R|Cl}}(1 &minus; e<sup>&minus;kt</sup>)</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="conc-doses"><option value="">Choose a pair</option>
<option value="css-cmax-c0">Css, Cmax, C0</option>
<option value="ld-rate">Loading dose vs maintenance infusion rate</option>
<option value="css-end">Css vs the concentration at the end of an infusion</option>
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
<dt>The quick test</dt><dd>Read the stem: her post-cessation stems always state whether the infusion reached steady state and whether a loading dose was given.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick starts the decay from {{frac:R|Cl}} on a six-hour infusion of a drug with a three-hour half-life. Six hours is two half-lives.</p>
<p class="xtrap">Each half-life of infusion closes half of the remaining gap to C<sub>ss</sub> (half after one, 75% after two), so the concentration at cessation is 75% of C<sub>ss</sub>, not C<sub>ss</sub>.</p>
<p class="xtrap">Decaying from the wrong starting point makes the whole answer wrong by the same factor.</p>
<p class="gsrc">Source: 3IntravenousInfusions.pdf slides "Drug Concentration after an IV Infusion has Ended" and Examples 5 and 6; transcript 09-02 worked examples (g) and (h)</p></div></template>

<h3 data-exam="2">Oral absorption</h3>
<p class="sub">Pairs from a single oral dose, separated by which rate constant each one depends on: k<sub>a</sub>, the absorption rate constant, or k, the elimination rate constant. Symbols in the table:</p>
<ul class="tlist"><li>F: the bioavailability, the fraction of the dose that reaches the blood. V<sub>D</sub>: the volume of distribution.</li>
<li>A half-life is the time for the amount to fall by half, {{frac:0.693|rate constant}}.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>First one</th><th>Second one</th></tr></thead><tbody>
<tr><td>Disposition vs absorption rate limiting <button type="button" class="chip xwhy" data-xpick="oral:rate-limiting">Why?</button></td><td>Absorption half-life much shorter; terminal slope reflects k</td><td>Absorption half-life much longer; terminal slope reflects k<sub>a</sub></td></tr>
<tr><td>t<sub>max</sub> vs C<sub>max</sub> <button type="button" class="chip xwhy" data-xpick="oral:tmax-cmax">Why?</button></td><td>Only k<sub>a</sub> and k; the dose does not move it</td><td>Contains the dose, F and V<sub>D</sub>; moves in proportion to the dose</td></tr>
<tr><td>Absorption vs elimination half-life <button type="button" class="chip xwhy" data-xpick="oral:two-half-lives">Why?</button></td><td>{{frac:0.693|k<sub>a</sub>}}; usually given in minutes</td><td>{{frac:0.693|k}}; usually in hours; a bare t&frac12; means this one</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="oral"><option value="">Choose a pair</option>
<option value="rate-limiting">Disposition vs absorption rate limiting</option>
<option value="tmax-cmax">tmax vs Cmax</option>
<option value="two-half-lives">Absorption vs elimination half-life</option>
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
<p class="gsrc">Source: 5---Pharmacokinetics-of-Oral-Absorption.pdf slide "Absorption Kinetics Terminology"; transcript 09-21</p></div></template>
<template data-x="oral:tmax-cmax"><div class="xexp"><h4>t<sub>max</sub> vs C<sub>max</sub></h4>
<p><b>In one line:</b> They differ in what each one contains.</p>
<dl><dt>t<sub>max</sub></dt><dd>The time of the peak: t<sub>max</sub> = {{frac:ln(k<sub>a</sub> &divide; k)|k<sub>a</sub> &minus; k}}, with k<sub>a</sub> the absorption and k the elimination rate constant.</dd>
<dd>It contains only these two and does not depend on the dose, on F (the bioavailability factor, the fraction of the dose reaching the blood) or on V<sub>D</sub> (the volume of distribution).</dd>
<dt>C<sub>max</sub></dt><dd>The concentration at t<sub>max</sub>. It contains the dose, F (the bioavailability factor) and V<sub>D</sub> (the volume of distribution), so it moves in proportion to the dose.</dd>
<dt>The quick test</dt><dd>Change the dose and only C<sub>max</sub> moves. Raise k<sub>a</sub>: higher C<sub>max</sub>, earlier t<sub>max</sub>. Raise k: lower C<sub>max</sub>, also earlier t<sub>max</sub>, because t<sub>max</sub> depends on both constants.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick answers that doubling the dose doubles t<sub>max</sub>, or that it moves it at all. She sets this up as a question she will ask.</p>
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

<h3 data-exam="2">Repeated dosing</h3>
<p class="sub">Pairs from repeated IV and oral dosing, separated by what each quantity counts or depends on. Symbols and examples in the table:</p>
<ul class="tlist"><li>D<sub>0</sub>: the dose. V<sub>D</sub>: the volume of distribution, linking the amount in the body to the concentration. C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}: the first-dose peak.</li>
<li>k: the elimination rate constant. F: the bioavailability, the fraction of the dose reaching the blood (1 for IV). R: the infusion rate in mg/hr. &infin;: at steady state. A half-life is the time for the concentration to fall by half.</li>
<li>Her Example 1 (Module 6): 10 mg/kg IV every 8 hours, half-life 4 hr. Steady-state peak 53.3 mg/L; the trough one interval later is a quarter of that, since 8 hours is two half-lives; time average 28.9 mg/L; midpoint of peak and trough 33.3 mg/L.</li>
<li>Her Example 4: the first infusion ends at 2 hr, the second at 8 hr, and the level is asked at 12 hr.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>First one</th><th>Second one</th></tr></thead><tbody>
<tr><td>3 to 5 half-lives vs 3 to 5 doses <button type="button" class="chip xwhy" data-xpick="repeated:half-lives-doses">Why?</button></td><td>Time to plateau for first-order elimination, whatever the dose</td><td>Not a rule: the number of doses depends on the interval</td></tr>
<tr><td>Frequency vs dosing interval, &tau; <button type="button" class="chip xwhy" data-xpick="repeated:freq-tau">Why?</button></td><td>Doses per day, as orders are written: BID, TID</td><td>Hours between doses: TID is &tau; = 8 hr; BID is 12 hr</td></tr>
<tr><td>First-dose C<sub>max</sub> vs C<sub>max</sub><sup>&infin;</sup> <button type="button" class="chip xwhy" data-xpick="repeated:first-ss-peak">Why?</button></td><td>No drug in the body yet: C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}</td><td>Added to drug left over: {{frac:C<sub>0</sub>|1 &minus; e<sup>&minus;k&tau;</sup>}}, always higher</td></tr>
<tr><td>C<sub>avg</sub><sup>&infin;</sup> vs the peak-trough midpoint <button type="button" class="chip xwhy" data-xpick="repeated:cavg-mid">Why?</button></td><td>Time average {{frac:FD<sub>0</sub>|V<sub>D</sub>k&tau;}}: 28.9 mg/L in her Example 1</td><td>{{frac:C<sub>max</sub><sup>&infin;</sup> + C<sub>min</sub><sup>&infin;</sup>|2}}: 33.3 in Example 1, from the 53.3 peak and the trough</td></tr>
<tr><td>n vs t in the n-dose equation <button type="button" class="chip xwhy" data-xpick="repeated:n-t">Why?</button></td><td>n: the number of the dose just given</td><td>t: time since that dose, not since the first</td></tr>
<tr><td>Intermittent IV infusion vs repeated IV bolus <button type="button" class="chip xwhy" data-xpick="repeated:infusion-bolus">Why?</button></td><td>Peak at the end of the infusion: {{frac:R|V<sub>D</sub>k}}(1 &minus; e<sup>&minus;kt</sup>)</td><td>Peak at the moment of the dose: C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}</td></tr>
<tr><td>t for the first infusion vs t for the second <button type="button" class="chip xwhy" data-xpick="repeated:two-infusions">Why?</button></td><td>Time since the first one ended: 12 &minus; 2 = 10 hr in her Example 4</td><td>Time since the second one ended: 12 &minus; 8 = 4 hr in the same example</td></tr>
<tr><td>C<sub>max</sub><sup>&infin;</sup>, oral vs bolus <button type="button" class="chip xwhy" data-xpick="repeated:oral-bolus-peak">Why?</button></td><td>Oral: has F and a t<sub>max</sub><sup>&infin;</sup> term</td><td>Bolus: no F and no t<sub>max</sub>; peaks at the moment of the dose</td></tr>
<tr><td>t<sub>max</sub> vs t<sub>max</sub><sup>&infin;</sup> <button type="button" class="chip xwhy" data-xpick="repeated:tmax-ss">Why?</button></td><td>First dose: k and k<sub>a</sub>; tetracycline 3.1 hr</td><td>Steady state: k, k<sub>a</sub> and &tau;; generally shorter; 2.06 hr</td></tr>
<tr><td>Raising the dose vs lengthening the interval <button type="button" class="chip xwhy" data-xpick="repeated:dose-interval">Why?</button></td><td>Higher levels, wider swing; compliance usually unchanged</td><td>Lower levels, wider swing; better compliance</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="repeated"><option value="">Choose a pair</option>
<option value="half-lives-doses">3 to 5 half-lives vs 3 to 5 doses</option>
<option value="freq-tau">Frequency vs dosing interval</option>
<option value="first-ss-peak">First-dose Cmax vs steady-state Cmax</option>
<option value="cavg-mid">Steady-state Cavg vs the peak-trough midpoint</option>
<option value="n-t">n vs t in the n-dose equation</option>
<option value="infusion-bolus">Intermittent IV infusion vs repeated IV bolus</option>
<option value="two-infusions">t for the first infusion vs t for the second</option>
<option value="oral-bolus-peak">Steady-state Cmax, oral vs bolus</option>
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
<template data-x="repeated:infusion-bolus"><div class="xexp"><h4>Intermittent IV infusion vs repeated IV bolus</h4>
<p><b>In one line:</b> They differ in how the dose enters the body, and so in where the peak sits.</p>
<dl><dt>Intermittent intravenous (IV) infusion</dt><dd>A zero-order input (a constant rate in) for its duration, so its peak is at the end of the infusion: {{frac:R|V<sub>D</sub>k}}(1 &minus; e<sup>&minus;kt</sup>), with R the infusion rate, V<sub>D</sub> the volume of distribution, k the elimination rate constant and t the infusion time.</dd>
<dd>The infusion is chosen because its peak is lower and the drug is better tolerated.</dd>
<dt>Repeated IV bolus</dt><dd>Instantaneous, so its peak is C<sub>0</sub> = {{frac:D<sub>0</sub>|V<sub>D</sub>}}, the dose over the volume of distribution, at the moment of the dose.</dd>
<dt>The quick test</dt><dd>Did the dose run in over a stated time? Then the peak is at the end of the infusion. Between doses, both decline as C<sub>0</sub>e<sup>&minus;kt</sup>.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick uses {{frac:D<sub>0</sub>|V<sub>D</sub>}} as the peak of an infused dose, or the accumulation factor {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} (the repeated-bolus multiplier, with &tau; the dosing interval) where the question gives two infusions to add.</p>
<p class="xtrap">Her method for infusions is a number line and a sum, not the steady-state equations.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slides "Rationale" and "Administering One or More Doses by IV Infusion"; transcript 09-28</p></div></template>
<template data-x="repeated:two-infusions"><div class="xexp"><h4>t for the first infusion vs t for the second</h4>
<p><b>In one line:</b> Each infusion declines from its own end.</p>
<dl><dt>First infusion</dt><dd>At the time asked for, it has been declining since it stopped. In her Example 4 (the first infusion ends at 2 hr, the second at 8 hr, and the level is asked at 12 hr) that is 12 &minus; 2 = 10 hr.</dd>
<dt>Second infusion</dt><dd>It has been declining since it stopped, a shorter time: 12 &minus; 8 = 4 hr in Example 4.</dd>
<dt>The quick test</dt><dd>The two exponents carry different times. Measure each from the end of its own infusion.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick uses the "4 hours after the second infusion" for both terms, or measures the first infusion from its start rather than its end. She names this as the part to pay attention to.</p>
<p class="gsrc">Source: 6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf, slide "What is the plasma drug concentration 4 hours after the cessation of the second infusion?"; transcript 09-28</p></div></template>
<template data-x="repeated:oral-bolus-peak"><div class="xexp"><h4>C<sub>max</sub><sup>&infin;</sup>, oral vs bolus</h4>
<p><b>In one line:</b> F (the bioavailability, the fraction of the dose reaching the blood) and t<sub>max</sub> (the time of the peak) separate the two steady-state peaks; &tau;, the dosing interval, does not.</p>
<dl><dt>Oral</dt><dd>{{frac:FD<sub>0</sub>|V<sub>D</sub>}} &times; {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} &times; e<sup>&minus;kt<sub>max</sub>&infin;</sup>, with F the bioavailability factor, D<sub>0</sub> the dose, V<sub>D</sub> the volume of distribution and k the elimination rate constant.</dd>
<dt>Intravenous (IV) bolus</dt><dd>Take away F and the exponential in t<sub>max</sub>, and {{frac:D<sub>0</sub>|V<sub>D</sub>}} &times; {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}} is left. A bolus peaks at the moment of the dose, so only an oral peak needs a t<sub>max</sub> found first.</dd>
<dt>The quick test</dt><dd>Look for F and t<sub>max</sub>. Both lines carry &tau; and the accumulation factor {{frac:1|1 &minus; e<sup>&minus;k&tau;</sup>}}, so those do not separate them.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick takes the bolus line off the equation sheet for an oral regimen, because both carry &tau; and the accumulation factor.</p>
<p class="gsrc">Source: 6a---Multiple-Oral-Doses.pdf, slide "Peak, Trough and Average Plasma Concentrations at Steady State"; transcript 09-28</p></div></template>
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
<dt>The quick test</dt><dd>Both widen the swing; the level moves in opposite directions. Neither changes the time to steady state.</dd></dl>
<p class="xtrap"><b>How she tests it:</b> The wrong pick pairs a higher level with a smaller swing for a larger dose.</p>
<p class="xtrap">Another: expecting a longer interval to raise the level because each dose has longer to be absorbed. Absorption is complete either way; what a longer interval gives each dose is more time to be eliminated.</p>
<p class="gsrc">Source: 6a---Multiple-Oral-Doses.pdf, slides "Altering Dose, second slide" and "Altering Dosing Interval, second slide"; transcript 09-28</p></div></template>
<h3 data-exam="2">Bioavailability and bioequivalence (Module 7a)</h3>
<p class="sub">Pairs from the bioavailability lecture, separated by what is compared with what, and by which one goes in the denominator. Symbols in the table:</p>
<ul class="tlist"><li>AUC: the area under the concentration-time curve. F: the bioavailability, the fraction of the dose that reaches the blood. D: a dose.</li>
<li>The subscript po means by mouth and IV intravenous.</li></ul>
<table class="reftab"><thead><tr><th>Pair</th><th>First one</th><th>Second one</th></tr></thead><tbody>
<tr><td>Absolute vs relative bioavailability <button type="button" class="chip xwhy" data-xpick="bioequiv:abs-rel">Why?</button></td><td>Oral against IV; the IV AUC underneath; at most 1</td><td>Two formulations; the reference underneath; can exceed 1</td></tr>
<tr><td>Bioavailability vs bioequivalence <button type="button" class="chip xwhy" data-xpick="bioequiv:ba-be">Why?</button></td><td>Rate and extent of one product; F measures the extent</td><td>No significant difference in rate and extent between two products</td></tr>
<tr><td>Rate (t<sub>max</sub>) vs extent (AUC) <button type="button" class="chip xwhy" data-xpick="bioequiv:rate-extent">Why?</button></td><td>When the peak comes; read from the curve</td><td>How much is absorbed; the area, and what F is built from</td></tr>
<tr><td>Test vs reference product <button type="button" class="chip xwhy" data-xpick="bioequiv:test-ref">Why?</button></td><td>The product being judged; its AUC on top</td><td>The standard or comparator; its AUC in the denominator</td></tr>
<tr><td>F from AUCs vs F from doses <button type="button" class="chip xwhy" data-xpick="bioequiv:f-auc-dose">Why?</button></td><td>{{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}} &times; {{frac:D<sub>IV</sub>|D<sub>po</sub>}}, for any pair of doses</td><td>{{frac:D<sub>IV</sub>|D<sub>po</sub>}}, only when the AUCs are set equal</td></tr>
</tbody></table>
<div class="xpick"><label><b>Explain one:</b> <select data-xsel="bioequiv"><option value="">Choose a pair</option>
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
`;
