# PHAR 4221 — Basic Pharmacokinetics drill

A single self-contained HTML file: the question bank, the spaced-repetition
scheduler, an exam simulator that follows the blueprint, weak-spot analytics by
topic and by kind of calculation error, the equation reference, the tell-apart
tables and a guide per course objective. It runs offline and keeps progress in
the browser it is opened in.

Live at <https://lglouis3-create.github.io/Basic-Pharmacokinetics-/>

## What is in the bank

190 questions, 92 of them calculations, drawn from Dr. Mosley's decks, the
lecture recordings and her own practice sets.

| Module | Topic | Questions | Exam |
|---|---|---:|---|
| 1 | Introduction, kinetic orders, AUC | 36 | Exam 1 |
| 2 | IV bolus, one- and multi-compartment | 40 | Exam 1 |
| 3 | Intravenous infusion | 34 | Exam 1 |
| 4 | Elimination, clearance, renal clearance | 40 | Exam 2 |
| 5 | Oral absorption, single dose | 40 | Exam 2 |

Modules 6 to 9 are on the Exam 2 blueprint and are not yet lectured. The exam
simulator draws only what exists and states on screen how much of the paper it
cannot yet cover, rather than padding from another module.

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
