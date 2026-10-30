# PHAR 4221 drill: notes for the exam-drill-builder skill review

Written 2026-10-30 at commit 33789e3 (`main`). The built page in that commit is dated 2026-10-27 04:11 UTC
(`version.json`).

## Sources and conventions

- **SKILL.md** is the exam-drill-builder skill file as synced to this session (245 lines, md5
  `33a1d0a93a2eb3d2f989e3a5517069ed`). "SKILL.md line N" refers to that copy.
- **The template was not read.** The template lives in `lglouis3-create/Medicinal-chemistry`
  (SKILL.md line 15), and attaching that repository was refused by the session's permission classifier
  (session transcript, 2026-10-30 20:42 UTC). Every comparison below is against SKILL.md and against what
  this repository says about its own origin: `src/README.md` line 310 says the engine was ported from the
  medicinal-chemistry reference implementation, and `src/q1_sample.js` is the template's placeholder
  sample bank, kept as a fixture and left out of the build (`src/build.py` line 25).
- **Repository history starts at c97a6b4 (2026-10-04)**, which already holds the engine, the question
  files for Modules 1 to 7a and the first two cheer clips. Work before that commit is not in this
  repository. The history has 105 commits.
- **"Session transcript"** is this cloud session's log, which runs from 2026-10-17 22:05 UTC to
  2026-10-30; times are UTC. Facts cited to it were read from it on 2026-10-30.
- **"From session memory, unverified"** marks a fact that comes only from the session's summaries of
  earlier context, with no file, commit or transcript line found to point to.
- Bank counts are read from the built page at 33789e3: 829 questions (534 numeric), 197 starred, 301
  variables-quiz items, 282 term questions, 74 equations, 52 equation-sheet lines, 64 sources, 321
  walkthrough clips and 166 Hear-why clips.

## 1. What this drill does that the template or SKILL.md did not provide

SKILL.md (lines 8 to 12) describes the drill as questions with explanations, slide figures, spaced
repetition with confidence buttons, a blueprint exam simulator, weak-spot analytics by topic and skill,
reference and tell-apart tables, objective guides and exports. Its schema already has numeric items with
worked steps and a logged kind of miss (SKILL.md line 120). Everything below goes beyond that.

### Calculation work

| Feature | Commits | Why this course needed it |
|---|---|---|
| Plan the problem: what is asked and its unit, the givens, a sanity check | fb07443, ac06726, 50a803b | The exam gives the equation sheet, so the skill tested is choosing the line. The professor: "You've got to think about which one do I want to apply in this application." (`src/reference.js` line 32, transcript 08-17) |
| Equation drill: type a line, build it from pieces, find it on the whole sheet, "How she asks it" | 50a803b, 455ae17, bafd541, ef8310b, 164ac5a, 4fcf901 | The same reason. The user also asked that reordered factors count as right while order still matters in some equations (164ac5a; the user's wording is from session memory, unverified) |
| Sheet map: which lines her sheet prints and which it leaves out, printed in module colours | 50a803b, db37384, 33789e3 | Her paper sheet is given at the exam (`src/reference.js` line 32), so a student has to know which relations are missing from it |
| A wrong number read back to the error that produces it | ae9dcb1 | The commit body: the entered number is matched against givens combined the wrong way, a unit factor, the reciprocal, a missing 0.693, a value from mid-working, a copied given and a near miss before the kind of miss is named. The course reason is from session memory, unverified |
| Problem sets whose parts carry values from earlier parts | 3d9fb75, 095fdae | Her calculations are one vignette asked in parts ("at the rate you determined above"; `src/BANK_SPEC.md` "Problem sets", line 166). A test found 45 parts that used an earlier result without stating it (`notes/PORT_EVALUATION_2026-10-17.md` §5, R5) |
| `step_check.js`: recompute every printed `expression = value` | f4b60c3, 1c35a71, 7a9f325 | It found 29 slips in the bank and 8 printed results on the teaching pages that did not follow from the numbers shown (PORT_EVALUATION §5, R1) |
| Stopwatch on every calculation, time per kind on Weak spots | 5326a60, d3758bc | The professor sets "A few calculations, each meant to take 2 minutes or less" (`src/course.js` line 264) |
| Drawn graphs (SVG) and a Diagrams tab that reads each graph axis by axis | 067799f, b31f652, 1d76acd, 125cdb6 | `src/figures.py` header: her questions turn on the axis ("you've got to pay attention to the axis"), and a cropped slide carries her handwriting and a caption that often names the answer |
| Variables quiz: which symbol a worded question asks for, what a symbol means | f013ced | The user: "Do we have a quiz that test us on what the variablea mean bc sometime i forgot in worded concept what variable its asking for" (session transcript, 2026-10-27 02:15) |

### Source material

| Feature | Commits | Why this course needed it |
|---|---|---|
| Source registry: each problem-set part and quiz item linked to its original document | 4ce505d | The user's answer of 2026-10-21 00:43 (session transcript): "Connect each drill question to its matching source document and problem number" |
| Worksheets tab by module folder, with original links, printable blank PDFs and separate solutions | e839844, 59f1fa6, ca436c1, e6ea184, 2759b31 | The user's answer of 2026-10-21 00:43 (both the original PDFs and printable worksheets) and the folder layout the user set out on 2026-10-26 20:18 (section 4) |
| Homework, quizzes and reviews in her original numbers and wording | 503d99a, c7b2439, 94184ee, 95a74f8, d64ae60, 4b9624d | `src/BANK_SPEC.md` line 32: her exams are built from her own problem sets. The user's answer of 2026-10-21: "Preserve the original wording and numbers" |
| Textbook reading cards (Chapters 22 and 18) | 2673dd0, f994ff5 | PORT_EVALUATION R9, approved by the user on 2026-10-17 (section 4) |
| Module 9 shown as "7b" | `src/course.js` lines 96 to 98 | Her Canvas files PK-PD as 7b inside Module 7, while the drill numbers it 9 so its quiz and exam scope stay apart from 7a |

### Study tools

| Feature | Commits | Why this course needed it |
|---|---|---|
| Narrated guide walkthroughs with slides beside the transcript | bc8321d, ea96e71, 1ba6b4b, 71ce449, 9be12af, e7a3276 | The user asked for them on 2026-10-26 03:13, to be built the way the Intro-Pharmacology drill built its walkthroughs (session transcript) |
| Hear why: a spoken reason under each starred question's explanation | f013ced, d923d9d | The user: "On all the most likely questions can we have the narrator explain the why please?" (2026-10-27 02:06) |
| Writing layer for Apple Pencil or finger on worksheets and as scratch paper, then GoodNotes-style snapping | c981545, f1950ab, 041274d | The user asked on 2026-10-26 10:14 whether a worksheet can be written on with an iPad, and on 2026-10-27 01:39 asked for writing that "can follow how it writes on Goodnotes" |
| Exam sim: the paper survives a reload; flags; notes per question with an export; a Notes tab | 30ab70b, c1c847e, 87559c1 | PORT_EVALUATION R2; the user's messages of 2026-10-27 00:18 and 00:35 |
| Concept statuses and spaced review in Weak spots | 593c704 | PORT_EVALUATION R8 |
| Weak spots marked on the study tabs, with a switch to turn them off | 3797474 | The user's message of 2026-10-26 22:44 |
| A fixed most-likely Exam 3 paper, 197 starred questions with reasons, the starred drill split into 67 concepts and 130 calculations | f4710c3, e057ca6, a2bd378, 22bfe50 | The user's messages of 2026-10-27 00:03 and 03:30 |
| Reload returns to the same place; the page checks `version.json` and offers Reload | fb39200, 71ce449 | The user saw a stale page in Chrome (2026-10-26 20:28) and asked for a reload that "takes me to the exact spot i was at" (2026-10-26 22:44) |
| Module colours on module titles and sections, never on a question | d71d237 | The user's message of 2026-10-27 02:12 (section 4) |
| A clip after a submitted paper, three in rotation | c97a6b4 (clips 1 and 2), 802252d (clip 3) | Clip 3 came from the user's message of 2026-10-27 02:30. Why clips 1 and 2 were added is from before c97a6b4 and not recorded |

### Build and delivery

| Feature | Location | Why this course needed it |
|---|---|---|
| 25 check scripts in `src/` against the 7 commands in SKILL.md lines 151 to 157 | `src/*_test.py` (15), `src/*_check.js` (7), `src/cite_check.py`, `src/test.js`, `src/render_test.js` | `step_check.js` came from R1 (PORT_EVALUATION §5). Others came with the feature they test, for example `why_test.py` and `var_test.py` in f013ced and `ink_test.py` in 041274d (commit bodies) |
| Standing agents: calculation verifier, fix applier, student-journey reviewer | `.claude/agents/`, f4b60c3, c856c50 | PORT_EVALUATION R1 and R5: writer and audit agents had run only from ad hoc briefs, with no standing verify pass |
| Pages deploy confirmed from the workflow run for the pushed commit | `src/README.md` "Delivery" (line 98), c856c50 | PORT_EVALUATION R6; the Pages REST endpoint and the site cannot be reached from a cloud session |
| Engine features carried over from the Intro-Pharmacology drill | `notes/PORT_EVALUATION_2026-10-17.md`, 30154d4, 52156ed | The user approved R1, R2 and R4 to R9 and set R3 aside (section 4) |

## 2. Problems hit during the build and how each was fixed

### Calculation and grading

- **Greyed tiles after Next in Build it.** Placed pieces and the chosen box stayed on the next equation.
  A blind review trial reported it first. Fixed in 4fcf901 (PORT_EVALUATION §5, R5).
- **Reordered factors marked wrong, and bracket-only lures in Build it.** Fixed in 164ac5a.
- **A part needed an earlier part's answer that it did not state.** Earlier results were carried into
  dependent stems in 3d9fb75. Then 45 parts were found still using an earlier result without stating it,
  fixed with a test that reads the working in 095fdae.
- **Printed working did not follow from the numbers shown.** `step_check.js` was added in f4b60c3, and
  27 calculation questions were corrected in 1c35a71. Teaching-page lines were corrected in 7a9f325
  (tetracycline peak 3.40, 0.4724, 0.5945, 1.333, 13,012 mg). No keyed answer changed (PORT_EVALUATION §5, R1).
- **Printed trough line where the stem gives no peak.** Fixed in 81ecf8f.
- **Accumulation-factor stem fraction.** Fixed in 19c32bd, with a test for unclosed tokens in every
  question string.
- **KM read on the wrong axis.** A step figure put KM 10 and half of Vmax, 6, in one label without
  units. KM now sits on the Cp axis (fb39200).
- **A set-up drill could show two right lines.** A line in no "same relation" group could be offered
  again as a distractor. Fixed in fb39200 (`suOptions`).

### Text and display

- **"Why this line" reasons torn at decimals.** The split at every full stop broke 164 reasons at
  numbers such as 0.693. Fixed in 0f266e5.
- **Reference links landed one section early** after the sheet map added a heading. Anchors are now
  counted on the rendered page (edbbcee).
- **Raw markup on screen** in weak-spot answers, a symbol list, a set-up line, a problem-set name and a
  figure caption. Fixed in bcc5b54.
- **Regex lookbehind, which older Safari rejects, was removed in db37384 and later reintroduced.**
  0f266e5, bc8321d and f013ced each added one lookbehind (`src/views.js` lines 1087, 4937 and 5796).
  Not fixed; see section 5.

### Exam sim and page state

- **An Exam sim paper was lost on reload.** Fixed in 30ab70b.
- **Exam submit and the picked-option colour.** The last question submitted on a Review button, and a
  picked option showed in the correct-answer green. Fixed in 676c1d0.
- **Chrome kept the Exam 2 paper choice and showed a stale published page.** A saved choice now gives
  way once its exam is over, and the page offers Reload when `version.json` is newer (71ce449; the
  user's report in the session transcript, 2026-10-26 20:28).
- **Reload went to the top of Topics.** fb39200 (committed 2026-10-26 23:17) brings a reload back to the
  same tab, section, question and walkthrough part, checked by `place_test.py` (its body). The user
  reported at 23:18 that a walkthrough reload still returned to Topics (session transcript). Whether that
  report came before the fix was deployed is from session memory, unverified.

### Walkthroughs and audio

- **A paused and resumed recorded clip did not move to the next part.** The resume path re-wired the
  clip without a next-part handler. Fixed in 9be12af.
- **Guide and walkthrough errors found in student-view reviews.** 46 corrections in Modules 1 to 3
  (0980771), 68 in Modules 4 to 8 (f5685bc), and 92 walkthrough parts and 50 guide lines in a clarity
  pass (82896b9). Figures were made to read axis by axis (b31f652), and Example 2 Cmax was corrected
  to 55.4 mg/L from a misread 53.4 (71ce449). The 143 rewritten parts were re-recorded (e7a3276).
- **The voice account ran out of credits during Hear why.** 166 of 197 scripts were recorded. 18
  generations failed uncharged and 13 were not started ("exceeds your quota of 1231000"). The 31 left
  play in the device voice (d923d9d; `notes/WALKTHROUGHS.md` lines 95 to 99).

### Worksheets and writing

- **The Worksheets tab was laid out twice in a way the user did not want.** 59f1fa6 followed the request
  of 2026-10-26 18:50, and ca436c1 followed "Try again in reorganize" (19:45). The user then set out the
  folder layout at 20:18 (section 4), built in e6ea184 and 2759b31.
- **Worksheet PDFs went stale after every style change**, because `sheets_test.py` hashes the page's
  styles. They were reprinted in 1ba6b4b, c981545, 125cdb6, 676c1d0, 59f1fa6, ca436c1 and 87559c1.
  f013ced made the hash cover only the page's own stylesheet (`style:not([id])`), so styles added at run
  time no longer mark the PDFs stale; no PDF changed. The failure that prompted f013ced followed the
  run-time module-colour style in d71d237, and `sheets_test.py` was not run before d71d237 was pushed
  (from session memory, unverified).
- **Writing selected text, the eraser missed snapped lines, and a lifting hand ended the Pencil's
  stroke.** Fixed in 041274d. Its body notes that each gesture check was shown to fail on the old code.
  Before commit, a highlighter test could not fail because pen and highlighter used the same colour; it
  was changed to red over black with a negative control (from session memory, unverified).
- **The colour-coded sheet did not print in the layout of her equation sheet.** The user asked on
  2026-10-27 03:45 for a PDF that "matches the layout to the original". It now prints in that layout
  (33789e3), and `src/review_test.py` line 292 requires two Letter pages. A first attempt printed to 3
  pages with a grey trailing area (from session memory, unverified).

### Sources, privacy and tooling

- **A student's name in four source comments.** Removed in 4ce505d. `src/sources_check.js` now scans
  the registry and the built page for name patterns kept in a gitignored file.
- **`cite_check` could not read a deck whose cited name has spaces.** Fixed in 31f019f.
- **Chapter 18 (43 MB) was over the Drive connector's 10 MB limit.** It was read from four split PDFs
  the student supplied (PORT_EVALUATION §5, R9; card in f994ff5).
- **The daily material check task was created without the Google Drive connector**, so it could not
  list files until the connector was added in the scheduled-task settings (PORT_EVALUATION §5, R7).
- **The Pages REST endpoint and the site cannot be reached from a cloud session.** The workflow run for
  the pushed commit is used as the deploy record (`src/README.md` "Delivery"; c856c50).
- **The 10.12 PK-PD lecture had no audio** and was left out at the user's instruction (from session
  memory, unverified).

## 3. SKILL.md steps that were wrong, missing, or skipped here

- **State doc, read first and updated every session (SKILL.md lines 60, 171, 176, 190): skipped.** No
  state doc exists for this course (section 6), and this session never read or wrote one. No tool in
  this session reads or writes Claude Project files. The repository's own notes took that role:
  `notes/WALKTHROUGHS.md` ("Guide walkthroughs: state"), `notes/WRITE_ON_WORKSHEETS.md` ("Write on a
  worksheet: state"), `notes/PORT_EVALUATION_2026-10-17.md`, `CHANGELOG.md`, `src/README.md`. The
  walkthrough request of 2026-10-26 03:13 also asked, in its step 7, to "update the state doc"; that
  step was not done.
- **Check the course's Project files before asking (SKILL.md line 38): not possible here**, for the same
  reason. On 17 Oct, homework and practice files that had been in Drive since 16 Oct were found only
  when the user asked (PORT_EVALUATION R7, line 101).
- **`ingest.py` (SKILL.md line 178): not used.** The file is absent from `src/`. Lectures were written
  by agents from scratchpad briefs (PORT_EVALUATION table row 21, line 45).
- **`images.json` from `harvest.py` crops (SKILL.md line 104): this course did otherwise.**
  `src/harvest.py` is present. Graph figures are drawn as SVG by `src/figures.py`, for the axis reason
  in section 1. Cited slides are rendered whole by `src/slides.py` and attached only as `teachImg`,
  shown after an answer, because a slide often carries the answer. Walkthrough slides are 234 JPEG
  files under `slides/` (`notes/WALKTHROUGHS.md` line 9). Whether `harvest.py` was used for any
  current figure is from session memory, unverified.
- **`atlas.js` and `diagrams.js` as stubs (SKILL.md line 111): wrong for this course.** `atlas.js` is
  absent. `src/diagrams.js` (60,281 bytes) is the Diagrams tab, with a five-step walk-through for each
  graph. `src/README.md` line 313 still lists `diagrams.js` among the files dropped in the port, which
  is out of date.
- **Question labels from the cited deck (SKILL.md line 85): extended.** Each question here also carries
  `exam`, `module` and `lecture` (`src/BANK_SPEC.md` "The schema", line 68).
- **Source rule (SKILL.md line 139): extended.** `src/BANK_SPEC.md` line 18 adds her worked solution as a
  source and sets an order for conflicts: her worked solution, her correction in lecture, the
  slide, then the textbook (30ab70b; PORT_EVALUATION R4).
- **Checks (SKILL.md lines 151 to 157): seven named, 25 check scripts here** (section 1).
- **Delivery by HTML plus zip when a push is refused (SKILL.md lines 234 to 235), and by uploading the
  same-named HTML (SKILL.md line 209): not used.** Every push worked. Commits go to `main` and the work
  branch with no pull request (`src/README.md` line 100; PORT_EVALUATION line 50, "You asked for no pull
  requests"). Before this note, no pull request had ever been opened on the repository (GitHub pull
  request list, all states, read 2026-10-30). The walkthrough request's step 7 ("open and merge the pull
  request as this repo does") was carried out as a push, since that is how this repo delivers.
- **Mode 5 nightly ingest (SKILL.md lines 220 to 229): not set up.** It was replaced by a daily material
  check, 06:52 America/Chicago from 18 to 27 October, that lists new Drive files and never ingests
  (PORT_EVALUATION R7 and §5).
- **Mode 1 step 1, copy the template (SKILL.md line 167): not visible in this repository.** The copy, if
  made, predates c97a6b4. The engine is described as ported from the reference implementation
  (`src/README.md` line 310), and the template's sample bank is kept as a fixture (`src/q1_sample.js`).

## 4. Design and content decisions the user made, in the user's words

Quoted from the session transcript unless marked. Spelling is as typed, a line break is shown as " / ",
and the time is when the message was sent.

- **Port scope** (2026-10-17 22:09): "Initiate R1 & R2 and R3 isn’t a priority for this course so don’t
  include it. And do R4 to R9"
- **Original sheets** (2026-10-21 00:43, answer to a question): "I want both options: access to the
  original PDFs and printable worksheets generated from the drill." In the same answer: "Preserve the
  original wording and numbers; offer changed-number practice as an additional option", "Distinguish
  instructor-provided solutions from explanations generated for the drill", and "Keep any student names,
  grades, or personal information out of public files."
- **Worksheets tab** (2026-10-21 00:57): "I think this would be best under a new tab labeled printable
  worksheet or something concise and similar, with the designated worksheet under the specific module."
- **Worksheet folders** (2026-10-26 20:18): "Module 1 (folder) / Module 2 (folder) / HW 1 (folder) - when
  you open it and look at the questions they’re are tagged what module that question pertains to same
  with quiz / Quiz 1 (folder) / The exam 1 review folder would be after module 3 (since it consist of
  module 1-3)"
- **Slides in walkthroughs** (2026-10-26 03:20): "Yes show her slides, as it’s okay to do."
- **Walkthrough scope** (2026-10-26 03:20): "Yes everything as the final is cumulative"
- **Walkthrough style** (2026-10-26 11:31): "I was leaning more towards having the math shown (we can
  briefly talk about it). But mainly focusing on it from a concept perspective, so like what this is
  saying and how it relates to the formulas and the variable if one increase and decrease etc"
- **Visuals with narration** (2026-10-26 11:41): "i think as this is being spoken a good visual should be
  paired with it"
- **Symbols in the spoken scripts** (2026-10-26 13:13): "Or have it to where you say Cp & KM but have what
  the stand for in parenthesis to save what is spoken by the narrator and save credit usage."
- **Concept before formula** (2026-10-26 13:29): "I think it should talk about the concept itself on why
  though and then say this is why it is at the bottom of the fraction"
- **Writing space** (2026-10-26 11:12): "Build it please and make sure there’s enough space when writing
  the math"
- **Keys for unkeyed items** (2026-10-26 14:02): "arent you able to solve the questions yourself please";
  and (14:04) "yes but no need to state that they’re no key"
- **Walkthrough count** (2026-10-26 21:12): "All 42 new walkthroughs"
- **Re-recording** (2026-10-27 00:02): "Yes rerecord please"
- **Weak-spot marks** (2026-10-26 22:44): "this feature can be turned off in weak spots and highlighted
  portions will go away once concept is understood"
- **Stars** (2026-10-27 00:03): "can you star the all the questiobs you think will most likely come up
  based on her transcript and all the material i have based on hw, quizzes, concepts etc"
- **Star split** (2026-10-27 03:30): "if the star questions can be split are able to be split between
  concepts and calculations so user can choose what to practice"
- **Notes on questions** (2026-10-27 00:18 and 00:35): "Would the GitHub pages be able to do this or is it
  better have export all the questions that you write questions on and have the person export it to
  their ai to review themselves ?" and "Can there be a section that has the notes that you wrote for
  questions to then export ?"
- **Writing like GoodNotes** (2026-10-27 01:39): "if it can follow how it writes on Goodnotes ? Like
  drawing a straight line automatically and the such"
- **Hear why** (2026-10-27 02:06): "On all the most likely questions can we have the narrator explain the
  why please?"; and (03:30), after being told it used the device voice: "i want the narrator’s voice
  please"
- **Module colours** (2026-10-27 02:12): "Can we color coded the module titles every just not the questions
  because that would give it away"
- **The third clip** (2026-10-27 02:30), after a plan not to host it: "no host it as i made the video
  place it with the other videos that rotate"
- **Printed sheet** (2026-10-27 03:45): "Can you improve the pdf of the printed color coded sheet with the
  formulas not printed on there so it matches the layout to the original"
- From session memory, unverified (in the session's summaries, not in its log):
  - "No PR unless asked". PORT_EVALUATION line 50 records it as "You asked for no pull requests".
  - "We dont have 10.12 PK-PD, its had no audio so its invalid. Omit it, just focus on that lecture topic
    being well explained and understood."
  - On Modules 6 and 6a: "Yes on what makes the distinction clear".
  - On Build it: "keep in mind that some equations the order of the equation matters".

## 5. Planned or offered but not done

- **31 Hear-why scripts** (30,864 characters) are not recorded and play in the device voice. They are
  waiting for voice credits. Each still has its one retry (`notes/WALKTHROUGHS.md` lines 98 to 99; d923d9d).
- **"Listen to the working" on calculation questions**: proposed, not built (`notes/WALKTHROUGHS.md`
  line 108).
- **R3, marking verbatim items and testing them against STYLE.md**: set aside by the user
  (PORT_EVALUATION §5, line 125).
- **Regex lookbehind on three lines** (`src/views.js` lines 1087, 4937, 5796): db37384 removed lookbehind
  for older Safari, and it came back. The page was not tested on an older Safari.
- **Not tested on a physical iPad.** Pencil pressure is not used, and Pencil and finger handling was
  checked with synthetic pointer events (`notes/WRITE_ON_WORKSHEETS.md` line 23).
- **Out-of-date counts and lists.** `README.md` line 14 says 620 questions; the built page has 829.
  `src/README.md` line 313 lists `diagrams.js` as dropped (section 3).
- **Full wording of the PK Calculation Review problems** was asked for so its two-compartment problems
  could be added (session transcript, 2026-10-26 23:53). No reply is in the transcript.
- **The Module 1 "Biopharmaceutic considerations" table** was left out on purpose. On 17 Aug the
  professor said tables are not to be memorized unless she says so. Adding it to Reference was offered
  (session transcript, 2026-10-27 03:22), with no reply in the transcript.
- **The daily material check's Drive connector.** The task needed the connector added before it could
  list files (PORT_EVALUATION §5, R7). Whether it was added is not recorded.
- **An equation-interpretation test** was answered with ideas only, not built (from session memory,
  unverified). The variables quiz (f013ced) covers what each symbol means.

## 6. Where this course's state doc is

None was found.

- **This repository:** no `claude/drill-app-state.md` and no other file of that name. This note is the
  first file under `claude/`.
- **This machine:** the only `drill-app-state.md` is
  `/home/user/intro-pharmacology-/claude/drill-app-state.md`. It is the PHAR 4344 drill's state doc
  ("# PHAR 4344 drill — state", "Updated 2026-09-28") in the `lglouis3-create/Intro-Pharmacology-`
  repository. It was read on 2026-10-26 03:42 for the narrator voice and the credit rate (session
  transcript).
- **Google Drive:** a search for files titled or containing "drill-app-state" returned none (2026-10-30).
- **The course's Claude Project:** not checked. No tool in this session reads Project files, so whether
  the Project holds one is unknown.
- **Closest state notes in this repository:** `notes/WALKTHROUGHS.md`, `notes/WRITE_ON_WORKSHEETS.md`,
  `notes/PORT_EVALUATION_2026-10-17.md`, `CHANGELOG.md`, `src/README.md`, `src/BANK_SPEC.md` and
  `src/STYLE.md`.
