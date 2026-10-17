# Port evaluation: PHAR 4344 share kit against the PHAR 4221 drill (2026-10-17)

Evaluation only. Sources read: `lglouis3-create/Intro-Pharmacology-` at `origin/main` 31740a2 (`share/README.md`, `share/FEATURES.md`, `share/PORTING.md`, `share/agents/*.md`, `exam1-drill/notes/ENGINE_UPGRADES.md`); this repository at HEAD b22cbbd. The local Intro Pharmacology clone was at 10ce1f1, which has no `share/` folder; the files were read from the fetched `origin/main`. No file in this repository was changed apart from this report, and `build.py` was not run; the rendering below uses the committed `PHAR4221_Drill.html`.

## 1. This drill as it is

**Engine and manifest.** There is no `app.js`; the engine is `src/views.js` plus the CSS and core functions in `src/shell.html`, assembled by `src/build.py` from `DATA_FILES` (course, question files, `qz_all.js`) and `CONTENT_FILES` (equations, sheet map, reference, tell apart, guides, diagrams, glossary). `src/course.js` holds 12 lectures (L01–L12; L11 and L12 added today for Modules 7b and 8), 3 exams (Exam 1, Exam 2, Final; `activeExam: 3`), 20 skills (4 concept, 16 calculation) and the quiz cards (`quizzes`, Quiz 5 on 19 Oct).

**Tabs** (from `#nav button[data-v]` in the built file): Topics, Quiz, Weak spots, Exam sim, Guides, Tell apart, Terms, Diagrams, Equations, Reference, Settings. Rendered with Playwright at 390×844 and 1100×900: all 11 tabs load with no page errors, no horizontal overflow and no "undefined" or "NaN" in the main text. Page heights at 390 px: Terms 51,510 px, Diagrams 13,038 px, Equations 9,942 px.

**Bank** (loaded from the committed build): 526 questions plus 81 extra-practice items. By type: 327 numeric, 190 single-answer, 4 select-all, 5 matching (328 calculation, 198 concept by `kindOf`). By exam: 174 Exam 1, 352 Exam 2; Modules 7b and 8 have none yet (ingest in progress, uncommitted). Sources: 275 `slide`, 205 `both`, 25 `transcript`, 21 unset. Every numeric question (327 of 327) carries `steps`, `givens`, `check` and `setup`. 19 are `lowYield`, 71 carry `dupOf`, 301 carry a `quote`, 183 carry a figure. 57 problem sets (`CHAINS`), 62 equation lines, 126 figures in `images.json`. Origins by id prefix: her daily practice sheets (ws, 111), homework (hw, 50), Canvas quizzes (cq, 26), her Exam 2 in-class review (e2r, 22), slide and lecture items (m1–m7, inf, 302), figure items (fig, 15).

**Explanations.** After an answer: each option's `why`; for calculations the givens table ("What the stem gives", distractors marked "not needed"), the worked steps with a `why` per line, and "Does the number make sense?"; the concept block (`teach`); "Explain more" chips into Guides, Reference, Tell apart, Diagrams and Equations with a way back. `test.js` limits a concept block to 160 words and 7 bullets and a `why` to 55 words. The equation drill (build it, type it, plan the problem, "How she asks it") covers equation selection.

**Checks** (14): `test.js`, `style_check.js`, `render_test.js`, `explain_check.js`, `cite_check.py`, `review_test.py` (Topics layout and that every question resolves to "Explain more" targets that exist), `browser_test.py`, `sweep_test.py` (every tab at phone and desktop, light and dark), `stepper_test.py`, `problemset_test.py`, `equation_test.py`, `guide_check.js`, `tell_check.js`, `rewrite_check.js`.

**How a lecture is ingested today.** The deck, transcript and her solved sheets are read from Drive; a brief is written to the session scratchpad; one agent per module writes the question file, its topic (`TOPICS.push`), its problem sets (`CHAINS.push`) and its equation lines, recomputing keys in Python; a STYLE.md section is drafted for merging; the caller runs the gates and commits. `BANK_SPEC.md` is the standing writer specification. The briefs and audit scripts (for example `check_givens.js`, `measure.js`) live in the session scratchpad and are not in the repository, and there are no `.claude/agents/` definitions.

**How this professor's exams relate to her material.** Her assessments are built from her own problem sets. STYLE.md ("How She Writes a Problem") records stems reused word for word across practice sheets and homework; her Exam 2 in-class review question 4 is her Quiz 4 question 4 with the half-life and volume changed, and review 3a follows Quiz 4 question 2 (STYLE.md, Exam 2 review section). The transcript matters for live corrections and for what she says about exams: m5-n13 keys the 20 L she substituted in lecture for the 40 L printed; the 14 Oct transcript gives the final's format and the 25% share of new material.

## 2. FEATURES.md, item by item

| # | Item | Verdict | Reason |
|---|---|---|---|
| 1 | Exams as collapsible groups, exam switch | Already here | Topics draws `details.examgrp` per exam (views.js); Exam sim has an Exam 1 / Exam 2 / Final chooser that also sets Weak spots |
| 2 | Per-exam page files (`guide<N>`, `reference<N>`, `tell<N>`, `PAGE_BY_EXAM`) | Would not fit | Kinetics is cumulative: Exam 2 problems use Exam 1 equations and the final covers everything. One Guides/Reference/Tell file with module chips (current) avoids duplicating equations across three files |
| 3 | Professor tag | Would not fit | One lecturer (Dr. Mosley); `profTag()` already exists for the case of a second |
| 4 | Exam blurb and What's new card | Already here | `newsCard()`, `CHANGELOG.md`, 120-character bullet rule in `style_check.js`. Small gap: `README.md` still says 504 questions and 316 calculations; the bank has 526 and 327 |
| 5 | Links from every question to its explanation, back to the question, anchor test | Already here | "Explain more" chips (`spotTerms`, `data-jump`), back button, and `review_test.py` lines 190–192 check that every question has a link and every target exists |
| 6 | Readings page (cards per reading) | Would help a little, only for 7b and 8 | Readings are Shargel chapters, third in her hierarchy, and her exams come from her problem sets. Cards for Ch 22 (PK-PD) and Ch 18 (nonlinear) could help where the decks are short. Hypothesis: needs your trial |
| 7 | Listen deck (two-to-three-minute talks) | Would not fit | The exam is mostly calculation; spoken equations lose the fraction, the exponent and the units. The agent's own rules (no symbols, no parentheses) remove what a kinetics talk needs |
| 8 | Narration of figures and "Hear the why" | Cannot judge without trial | The step-throughs and "Read this graph" walk-throughs already carry the steps in text; whether audio helps graph reading here is untested |
| 9 | Drug ↔ receptor drill | Already here in kinetics form | FEATURES.md says a kinetics course would replace it with an equation drill; the Equations tab has build, type, plan and "How she asks it" |
| 10 | Weak spots: concept statuses (struggling, improving, mastered, returning) and spaced review of mastered concepts | Would help; needs trial | Every question has a `concept`, but Weak spots reports by topic, skill, miss kind and time per calculation type; `struggling`/`returning` do not appear in views.js. Large change |
| 11 | Stable id aliases (`ID_ALIASES`, `CONCEPT_ALIASES`) | Would not fit now | Ids have not been renamed in this bank (BANK_SPEC and the audit briefs forbid it); add only if a rename is ever needed |
| 12 | Exam persistence (`saveExam`, `loadExam`, `onbeforeunload`) | Would help | A 120-minute final paper lives only in `EX` in memory (`startPaper`, views.js line 2844); `saveExam`, `loadExam` and `onbeforeunload` do not occur in views.js. A reload or a tab discarded on iPad loses the paper |
| 13 | Folded answer card, `content-visibility`, `foldLegend` | Cannot judge without trial | The length limits already shortened explanations (median 199 words after answering). Terms at 51,510 px on a phone could benefit from `content-visibility`; whether it is slow on your iPad is untested |
| 14 | Verbatim polls and quizzes with check exemptions | Partly here; a check would help | Quiz and review items are kept in her words (cq2–cq4, e2r), but nothing marks them as verbatim or tests them against STYLE.md, and this drill has no longest-option rule that would need an exemption |
| 15 | Transcript-first keying | Would not fit as written | Her calculation keys come from her solved sheets; the transcript decides live corrections and exam statements. A kinetics-specific order would fit better (item R4) |
| 16 | lowYield deferral rule (slide not reached → lowYield, cleared when covered) | Already here in substance | 19 lowYield items; m4-io-2 is the one deferral case (pKa slide, recording cut off). She normally finishes her decks, so the clearing step is rarely needed |
| 17 | Cite by slide title; `decks:[...]` for multi-file lectures | Already here | Cites name slide titles or numbers; `cite_check.py` checks numbers against the decks on disk. No lecture here spans two files |
| 18 | Quote is an exact transcript substring, checked by script | Would help, depends on transcripts on disk | 301 questions carry `quote`; no check confirms them. Transcripts are in Drive, not in `src/` |
| 19 | Conflicts in `note` and per-lecture notes | Already here | `note` (shown) and `audit` (hidden) in BANK_SPEC.md; conflicts recorded in STYLE.md |
| 20 | Professor corpus (STYLE.md per day, polls with verdicts) | Already here | STYLE.md (1,781 lines, by source document) and TRANSCRIPT_CUES.md (972 lines) |
| 21 | Two-pass agents (lecture-writer, bank-verifier, verify-fix-applier) | Would help, needs a calculation variant | Writer and audit agents are run ad hoc from scratchpad briefs; there is no standing verify pass after ingest. See R1 |
| 22 | reading-card-writer, listen-script-writer | Would not fit (follows 6 and 7) | Only if the Readings page is tried for Ch 22 and Ch 18 |
| 23 | learning-presentation-specialist review agent | Would help, adapted | See R5 |
| 24 | Daily material check routine | Would help until 27 Oct | See R7 |
| 25 | Check suite (build, test, style; browser before release; Playwright smoke) | Already here, broader | 14 checks including equation, problem-set and stepper browser tests. Gaps: step arithmetic (R1), verbatim text (R3), exam persistence (R2) |
| 26 | Delivery cycle (PR, squash merge, artifact, Pages) | Partly fits | You asked for no pull requests; commits go to `main` and the work branch. Confirming the Pages deployment of each pushed commit would fit (R6). The shared artifact is not used here |

## 3. Recommended items, ranked

### R1. Calculation-aware verification pass (agent plus a step-arithmetic check) — priority high
- **Exists:** `test.js` checks structure (givens values appear in the stem, check bounds hold, tolerance > 0, set-up lines exist); writers recompute keys in Python; audits are run ad hoc from scratchpad briefs.
- **Gap, with an example:** nothing evaluates the arithmetic printed inside a step. The Example 2 step "Cp = 40 mg/L × 1.25 × 0.595 = 29.7 mg/L" (q7_module6.js, before commit 47a17ba) passed every check although 40 × 1.25 × 0.595 = 29.75. The 7a audit later found option explanations whose stated arithmetic does not reproduce (m7-c15: an inverted ratio described as giving 0.92 gives 1.09).
- **Change:** (a) `src/step_check.js`: parse each step `t` and `why` for `expression = value` chains, evaluate them with the printed rounding, and fail when a printed value differs by more than its last printed digit; also check that the final step's value is within `tol` of `answer`. (b) `.claude/agents/calc-bank-verifier.md`, adapted from `bank-verifier.md`: recompute every key from the stem at full precision, check that the tolerance covers both her key and the exact value, check units of each step against `units`, check that each part needing an earlier part carries it, and write findings only. (c) `.claude/agents/verify-fix-applier.md` as is, pointed at this repo's gates.
- **Files:** new `src/step_check.js`, new `.claude/agents/*.md`, `build.py` gate list is unchanged unless the check is added to the standard run.
- **Effort:** half a day for the script (the parser is the work); an hour for the agent files.
- **Dependencies:** none.
- **Verify:** reintroduce the 0.595 line in a scratch copy and confirm the script fails; run it on the current bank and review each hit by hand before treating it as a defect.

### R2. Keep an Exam sim paper across a reload — priority high
- **Exists:** `startPaper()` builds `EX` in memory; answers are logged only on submit.
- **Gap, with an example:** a 120-minute Final paper started on the iPad is lost if the tab reloads or the browser discards it; nothing writes it to storage (no `saveExam`/`loadExam`/`onbeforeunload` in views.js).
- **Change:** port `saveExam()`/`loadExam()` from ENGINE_UPGRADES "Engine fixes from the independent audit": store `{qs ids, i, picks, flags, orders, ends, done}` under `<ns>:exam`, restore on start-up, submit if `ends` has passed, warn before unload while a paper is open.
- **Files:** `src/views.js` (startPaper, the pick and flag handlers, finishExam), `src/browser_test.py` (a reload test).
- **Effort:** 2–3 hours. **Dependencies:** none.
- **Verify:** a browser test that starts a paper, answers three questions, reloads, and finds the same three answers and the same clock end.

### R3. Mark verbatim items and test them against STYLE.md — priority medium
- **Exists:** her quiz and review items are kept in her words and recorded verbatim in STYLE.md.
- **Gap, with an example:** cq3-5's stem ends "Round to the nearest tenth (one decimal place)", while STYLE.md records her instruction as "Calculate your answer in hours to the nearest tenth (one decimal place). You cannot enter units; number only." (found by the 7a audit on 7 Oct). Audits that reword stems toward her forms can also alter a verbatim stem by accident.
- **Change:** add `verbatim:'<STYLE.md anchor>'` to items copied from her quizzes, review sheets and polls; a `test.js` rule that the stem matches the quoted block in STYLE.md after whitespace normalisation, and that audit agents treat such stems as read-only.
- **Files:** `src/q13_quizzes.js`, `src/q14_review.js`, poll items in module files, `src/test.js`, `src/STYLE.md` (anchors).
- **Effort:** 2–4 hours. **Dependencies:** none.
- **Verify:** the rule fails on cq3-5 as it stands, and passes once the stem or the record is corrected.

### R4. Write the source order this course actually uses into BANK_SPEC.md — priority medium
- **Exists:** BANK_SPEC.md says to write from the slide when slide, transcript and her worked solution disagree, and to record both in `audit`.
- **Gap, with an example:** the bank already departs from that for calculations: m5-n13 keys the 20 L she substituted in lecture over the 40 L printed, and her solved sheets are the keys for 161 worksheet and homework items.
- **Change:** state the order as: her worked solution for a calculation; a correction she made aloud (transcript); the printed slide; the textbook chapter. Keep the `audit` record for every disagreement.
- **Files:** `src/BANK_SPEC.md`. **Effort:** under an hour. **Dependencies:** none.
- **Verify:** reread the 25 transcript-sourced and the cq/e2r items against the stated order; no key changes are expected.

### R5. A review agent adapted to a calculation drill — priority medium
- **Exists:** `sweep_test.py` and `browser_test.py` catch errors and overflow; screenshots are taken ad hoc.
- **Gap, with an example:** three interaction defects this month were found by you, not by a check or review: tiles greyed after Next in Build it (fixed in 4fcf901), a part that needed an earlier part's answer when drawn alone in Exam sim (3d9fb75), and a CrCl lure that looked like a correct piece (164ac5a).
- **Change:** `.claude/agents/learning-presentation-specialist.md` adapted to this repo, with journeys that move through several items in a row (Build it with Next, an Exam sim paper, a problem set) and kinetics criteria: fractions and exponents rendered on a phone, units shown beside every input, equation pieces distinguishable. It writes a report only.
- **Files:** new `.claude/agents/learning-presentation-specialist.md`. **Effort:** an hour, plus one review run.
- **Dependencies:** none. **Verify (hypothesis):** run it against the build before 4fcf901 and see whether it reports the greyed-tile defect.

### R6. Confirm the Pages deployment after each push — priority low
- **Exists:** pushes to `main`; Pages serves `main`; the HTML is also sent as a file.
- **Gap:** no step confirms that Pages has deployed the pushed commit before you are told to reload.
- **Change:** after pushing, poll `gh api repos/lglouis3-create/Basic-Pharmacokinetics-/pages/builds/latest` until its commit matches HEAD, then report.
- **Files:** none in the repo (a step in the delivery routine). **Effort:** under an hour. **Verify:** the report names the deployed commit.

### R7. Daily material check until the final — priority low (time-limited)
- **Exists:** nothing scheduled.
- **Gap, with an example:** Homework 7, PK-PD Practice 1–3, Nonlinear Solutions 1–2 and the 10.14 transcript were in Drive from 16 Oct and were found on 17 Oct only when you asked.
- **Change:** one routine on class mornings through 27 Oct that lists new files in the course's Drive folders and names what an ingest would need; it never ingests.
- **Files:** none (a scheduled routine). **Effort:** under an hour. **Dependencies:** your approval of the schedule.
- **Verify:** the first run lists the files added since the previous day.

### R8. Concept statuses and spaced review in Weak spots — priority low before the final
- **Exists:** `concept` on every question; Weak spots by topic, skill, miss kind and time per calculation type; the scheduler retests a missed concept with another wording.
- **Gap:** no per-concept status line ("struggling: 3 misses, last 5 under 60%").
- **Change:** port `conceptRecord()` and the status rules from ENGINE_UPGRADES item 2.
- **Files:** `src/views.js`, `src/shell.html`. **Effort:** one to two days. **Dependencies:** none.
- **Verify (hypothesis):** your own use over several sessions; the benefit over the current miss-kind view is untested.

### R9. Reading cards for Ch 22 and Ch 18 only — priority low (hypothesis)
- **Exists:** READINGS.md maps chapters to lectures; no page shows them.
- **Change:** two cards on a small Readings section, following `reading-card-writer.md`, without the listen deck.
- **Files:** new `src/readings/*.json`, a generator, a view. **Effort:** half a day. **Verify:** your trial.

## 4. Proposed first batch (at most three)
1. **R1** step-arithmetic check and calculation verifier: it targets the error type that reached the bank and the final will be mostly calculation.
2. **R2** Exam sim persistence: the final paper is 120 minutes on a phone or iPad.
3. **R3** verbatim marker and check: her own items are the closest model of her exam wording.

## 5. Applied (2026-10-17)

R3 was set aside as not a priority for this course. The rest:

- **R1:** `src/step_check.js` (a gate) recomputes every printed `expression = value` in the bank and, since the merge, in the Guides, Reference, Tell apart and Terms pages; `.claude/agents/calc-bank-verifier.md` and `verify-fix-applier.md`. It found 29 slips in the bank, all fixed, and on the teaching pages 8 printed results that did not follow and 3 lines whose units or chain read ambiguously, all rewritten; no keyed answer changed.
- **R2:** Exam sim saves a paper on every pick and move under `<ns>:exam:<profile>`, restores it at start-up, and submits a paper whose time ran out; `browser_test.py` checks reload, expiry and New paper.
- **R4:** `src/BANK_SPEC.md`, "The source rule": her worked solution, her correction in lecture, the slide, then the textbook.
- **R5:** `.claude/agents/learning-presentation-specialist.md`. A blind trial on the build before 4fcf901 reported the greyed-tile defect first; its other findings are fixed (`notes/UX_TRIAL_2026-10-17.md`), and its cefprozil finding led to a test that found 45 problem parts using an earlier result without stating it.
- **R6:** `src/README.md`, "Delivery": the "pages build and deployment" workflow run for the pushed commit is the confirmation; the Pages REST endpoint and the site are not reachable from a cloud session.
- **R7:** a scheduled task, "PHAR 4221 daily material check", 06:52 America/Chicago, 18 to 27 October. It was created without the Google Drive connector, which has to be added to it in the claude.ai scheduled-task settings before it can list files.
- **R8:** Weak spots, Concepts: statuses, a card per weak concept, Practice this concept and spaced-review checks; the box-3 count is labelled "on long review".
- **R9:** a Textbook chapters card for Chapter 22 at the top of Guides. Chapter 18 has no card: the Drive connector refuses files over 10 MB and the chapter PDF is 43 MB, so none of its pages was read.
