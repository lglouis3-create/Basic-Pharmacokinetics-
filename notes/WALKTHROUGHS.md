# Guide walkthroughs: state

Last updated 2026-10-26.

## What exists
- 42 walkthroughs, one per guide section (`src/walk/gobj-*.json`), 313 parts, 29,751 words, 159,586 characters.
  `src/gen_walk.py` validates them and writes `src/guide_walk.js` (GW_DECKS, GUIDE_WALK); build.py embeds it and
  lists `audio/gw-<section>-<part>.mp3` as GW_CLIPS.
- Slides: `slides/<deck>-NN.jpg`, 234 pages from ten decks (PyMuPDF, 1280 px wide, JPEG quality 70), deck names and
  counts in `src/walk/decks.json`. Decks: intro, ivb, inf, cl, oral, rep, mo, ba (7a, uploaded 10/26), pd, nonlin. These are the annotated
  copies from the course Drive; every page was looked at and none carries a name. The student's own note pages
  (grid paper, photographed worksheets, blank) stay in the deck so page numbers match hers, and gen_walk.py refuses
  a part that points at one (NOTE_PAGES).
- Player: views.js, "Guide walkthroughs" block; styles `.gw*` in shell.html. Recorded clip per part when one exists,
  else the device voice sentence by sentence. Formula card lines appear with their sentence ("at" index).
- Test: `src/walk_test.py` (Chromium, 390 and 1200 px): every section opens, every slide named loads, stepping moves
  the slide, playing advances, pause holds and resume continues, the place survives closing, keys, phone layout,
  zoom, continue to the next section, tab change stops it, no sideways scroll, no console errors.

## How the scripts were made
- Writers worked only from each guide section's text (brief in the session scratchpad, mirrored in the rules
  gen_walk.py checks). Calculation sections run to 9 parts so every step of the worked example is said.
- Seven reviewers checked every sentence and card line for fact, arithmetic, distortion, slide and form, and every
  worked value was recomputed. No wrong number was found. Fixes applied: slide reassignments, claims the section
  does not carry, paraphrased quotes no longer presented as hers, steps or units that were not said, answer-format
  advice removed. Sentences saying whether a relation is on the equation sheet were kept (the student approved
  that kind of line in the preview).
- gobj-m6a-1: the script gives the midpoint of peak and trough as 2.92 mg/L, from the section's own 3.40 and 2.44;
  the guide and q8_module6b.js use 2.915, the midpoint of 3.39 and 2.44 (t max rounded to 2.1 hr). Both are in the
  section; the guide was not changed.

## Sample in the new style (2026-10-26)
- The student asked for concept-first narration with visuals: the formula and its working on the card, the
  speech on what the relation says, what each variable is, what happens as one rises or falls, and links to other
  objectives. gobj-m8-3 is rewritten that way (9 parts, 911 words) with two step figures from figures.py
  (nl_rate_steps, nl_css_steps; also on the Diagrams tab). A part can carry "fig": {"key", "at": [[sentence,
  step]]}; the figure spans the panel, builds with the narration, and her slide folds behind a button.
- New source rule for this style: a statement comes from any guide section of the module, or follows directly from
  the algebra of a relation the guide gives (recomputed by the reviewer); illustrative values are marked "e.g.".
- Two review rounds: v2 found 25 issues (one wrong statement, the rest clarity and sync), v3 confirmed 22 fixed and
  found 12 more; all applied. The other 41 sections are still in the first style until the student decides.

## Second revision of the sample (2026-10-26, later)
- The student found the formula-first part confusing and had missed the Quiz 5 item that compares a level with
  Vmax. gobj-m8-3 now has 10 parts: part 1 says why the rate is first order well below KM and zero order well
  above it, and what "depends on concentration" means (the amount removed per time, not the fraction); part 2
  then shows how the formula says it. The card states that a level is compared only with KM, never with Vmax.
- nl_rate_steps now builds the behaviour first and shows the formula in its own step 6 (7 steps).
- gen_walk.py GLOSS: the spoken letters ("C p") are shown on screen as the symbol, with what it stands for in
  brackets at its first use in a part (field d); the brackets are not read, so they add nothing to recording.
- Sources for the "why": guide 8.1 (saturation, "can only work so fast") and 8.2; Ch 2 PDF p. 19 ("the rate of
  the process is a function of the drug concentration, the t1/2 is not"); Ch 16 PDF p. 5 (transporters saturate).
  "Spare capacity" below KM rests on general enzyme kinetics and on rate/Vmax = Cp/(KM + Cp), about 5% at
  Cp 0.5 mg/L. Chapter 18 itself could not be read (the Drive PDFs return no text).
- Reviewer round v4: 12 findings, all applied.
- Reading and transcript notes for every module, for the rewrite of the other 41 sections, are in the session
  scratchpad (gw/readnotes/*.md); the writer brief is rewritten concept first (gw/BRIEF.md).

## All 42 rewritten concept first (2026-10-26, evening)
- Seven writer agents rewrote every section to the v2 brief (session scratchpad gw/BRIEF.md): what happens and why,
  then the formula spoken once, the arithmetic on the card; comparisons like with like (a level only against KM);
  abbreviations spoken as letters with on-screen glosses; textbook statements with page references from the
  reading notes; her slides and keys win conflicts. Seven reviewer agents checked every sentence, quote and number
  (gw/VERIFY_BRIEF2.md, findings in gw/verify2); no worked number was wrong; about 90 wording, quote, slide and
  figure-sync fixes were applied. 42 sections, 321 parts, 33,902 words.
- New step figures for the narration (figures.py, listed in diagrams.js): orders_steps, two_rates_steps,
  renal_steps, loading_miss_steps, teff_halvings_steps, nl_frac_steps.
- Guide corrections that came out of the review: Example 2 Cmax is 55.4 mg/L on the solved page (the 53.4 note
  was an OCR misread, removed); the 3.72 hr interval and the 17.29 mg dose are two separate examples of hers.
- Recording estimate on these scripts: 180,584 characters, about 180,566 credits (ElevenLabs priced a 609-character
  part at 608.94 credits, 11.07 cents), about 3,283 cents. Not recorded; waiting for approval.

## Open
- Recording: not done. Estimate 159,586 characters; at the Intro Pharmacology walkthrough rate (1,850.92 cents for
  101,801 credits) about 2,901.55 cents, assuming one credit per character. Planned voice: the one used there
  (jNB0TWZK9LKlBbU54wMW, eleven_v4), to be confirmed. Record only after approval; one clip per part,
  audio/gw-<section id>-<part index>.mp3; check each downloads and its length fits its word count.
- Equation sheet (BasicPharmacokineticsEquations.pdf, uploaded 10/26): every sentence in the scripts that says
  whether a relation is on the sheet was checked against its two pages and matches. The guide's "the only half-life
  line the sheet prints" (gobj-m8-2) is also correct: the nonlinear t1/2 on page 2 is the only one.
- "Listen to the working" button on calculation questions: proposed, not built.
