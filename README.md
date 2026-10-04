# PHAR 4221 — Basic Pharmacokinetics drill

A single self-contained HTML file: the question bank, the spaced-repetition
scheduler, an exam simulator that follows the blueprint of whichever paper is
chosen (Exam 1, Exam 2 or the final), weak-spot analytics by topic and by kind
of calculation error, the equation reference, the tell-apart tables and a guide
per course objective. It runs offline and keeps progress in the browser it is
opened in.

Live at <https://lglouis3-create.github.io/Basic-Pharmacokinetics-/>

## What is in the bank

480 questions, 302 of them calculations, drawn from Dr. Mosley's decks, the
lecture recordings, her in-class activities and her practice sheets with their
answer keys.

| Module | Topic | Questions | Exam |
|---|---|---:|---|
| 1 | Introduction and math review | 53 | Exam 1 |
| 2 | IV bolus, one- and multi-compartment | 60 | Exam 1 |
| 3 | Intravenous infusions | 54 | Exam 1 |
| 4 | Drug elimination and clearance | 80 | Exam 2 |
| 5 | Single oral administration | 77 | Exam 2 |
| 6 | Multiple dosing: IV bolus, intermittent infusion, oral | 123 | Exam 2 |
| 7a | Bioavailability and bioequivalence | 33 | Exam 2 |

Modules not yet lectured are not in the bank. The exam simulator draws only
what exists and states on screen how much of the paper it cannot yet cover,
rather than padding from another module.

## Building

Everything lives in `src/`. `course.js` is the manifest — the exams, the
blueprints, the skills and the output filename all come from it, and nothing
else in the tree names the course.

```
cd src
python3 build.py        # writes the single HTML file
node test.js            # bank integrity, blueprint coverage, scheduler rules
node style_check.js     # stem wording, banned phrasing, citation coverage
node render_test.js     # every view renders
node explain_check.js   # report: ranks weak explanations by exam weight
python3 cite_check.py   # needs the decks under decks/; SKIPs without them
python3 browser_test.py # Chromium: answers every question, visits every view
python3 stepper_test.py # Chromium: step-through figures, figure labels
python3 sweep_test.py   # every tab at 375 and 1100 px, light and dark
```

`build.py` writes to `/mnt/user-data/outputs/`. Copy the result to the repo
root over the existing file to publish; `index.html` redirects to it and Pages
redeploys within a few minutes. Question ids do not change between builds, so
saved progress survives an update.

## Adding a lecture

1. Write `src/q<N>_module<N>.js` declaring `Q_MODULE<N>`, following
   `src/BANK_SPEC.md`.
2. Add the filename to `DATA_FILES` in `src/build.py`, before `qz_all.js`.
3. Add the array to the concat in `src/qz_all.js`.
4. Add the lecture to `lectures` in `src/course.js` if it is not there.
5. Build and run every check.

## The other files in src/

- `STYLE.md` — every problem Dr. Mosley has set, with her worked answers. This
  is what question stems are written against.
- `TRANSCRIPT_CUES.md` — what she said out loud: exam cues, her wording for
  each term, her poll questions, what is and is not on the equation sheet.
- `BANK_SPEC.md` — the rules a question file has to follow.
- `q1_sample.js` — a six-question fixture exercising all three question types.
  Not built; kept for testing the engine against a minimal bank.
