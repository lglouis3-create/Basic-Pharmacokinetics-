# Guide walkthroughs: state

Last updated 2026-10-26.

## What exists
- 42 walkthroughs, one per guide section (`src/walk/gobj-*.json`), 313 parts, 29,751 words, 159,586 characters.
  `src/gen_walk.py` validates them and writes `src/guide_walk.js` (GW_DECKS, GUIDE_WALK); build.py embeds it and
  lists `audio/gw-<section>-<part>.mp3` as GW_CLIPS.
- Slides: `slides/<deck>-NN.jpg`, 215 pages from nine decks (PyMuPDF, 1280 px wide, JPEG quality 70), deck names and
  counts in `src/walk/decks.json`. Decks: intro, ivb, inf, cl, oral, rep, mo, pd, nonlin. These are the annotated
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

## Open
- Module 7a deck (7a---Bioavailability-and-Bioequivalence.pdf, 17.7 MB) is over the Drive connector's 10 MB limit.
  The four gobj-m7-* scripts have "slide": null and a "slidetitle" on each part; fill the slides when the deck arrives.
- Recording: not done. Estimate 159,586 characters; at the Intro Pharmacology walkthrough rate (1,850.92 cents for
  101,801 credits) about 2,901.55 cents, assuming one credit per character. Planned voice: the one used there
  (jNB0TWZK9LKlBbU54wMW, eleven_v4), to be confirmed. Record only after approval; one clip per part,
  audio/gw-<section id>-<part index>.mp3; check each downloads and its length fits its word count.
- Equation sheet PDF not found in Drive; the sheet-location sentences come from the guide text.
- "Listen to the working" button on calculation questions: proposed, not built.
