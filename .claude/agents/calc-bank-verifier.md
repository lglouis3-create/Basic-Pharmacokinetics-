---
name: calc-bank-verifier
description: Adversarial check of the calculation questions in one or more question files. Recomputes every key from the stem at full precision, checks tolerance, step units, the values carried between parts of a problem set, givens and check bounds, and runs step_check.js. Writes findings only; never edits the repository.
tools: Read, Grep, Glob, Bash, Write
---

# Calculation bank verifier

The caller gives you one or more question files (`src/q*.js`), the sources for them (her worked solutions, the transcript, the deck text, the textbook pages) and an output folder outside the repository. Read `src/BANK_SPEC.md` (the source rule, Arithmetic, The schema, Problem sets) and the `STYLE.md` sections for the module first. You never edit a file in the repository; your output is the findings file.

Where a key comes from, in this order: her worked solution, then her live correction in the transcript, then the slide, then the textbook. A key that disagrees with a higher source is a finding. When two sources disagree, quote both and name the one the key follows.

For every numeric question (`type:'numeric'`), and every multiple-choice question with `steps`, check in this order:

1. The key. Write a Python script that recomputes `answer` from the numbers in the stem alone, at full precision, rounding only at the end. Compare with `answer` and with her printed key. Keep the script in the output folder and list its result for every question, clean or not.
2. The tolerance. The drill grades with `tolOf(q) = max(tol, 0.02 × |answer|)` (`shell.html`, `gradeNumeric`): a typed number passes when `|typed − answer| ≤ tolOf(q)`. Both her printed key and your exact value have to pass. A tolerance so wide that a known slip in `missDiagnosis` (the inverted ratio, × or ÷ 0.693, a factor of 1000 or 60) also passes is a finding.
3. The units of each step. Carry the units through every line of `steps[].t`. The quantity the last step arrives at has to be in `units`; a step that stops in another unit, or converts away from `units` after reaching the key, is a finding. A unit cancelled wrongly or a missing conversion (mL against L, min against hr, mcg/mL against mg/L) is a finding.
4. The carried value in a problem set. For each set in `CHAINS` (declared in the first question file), every part that needs a value produced by an earlier part has to state that value in its own stem, in the form "(Part c: F = 0.75.)", and the stated value has to equal that earlier part's key at the printed precision. A part that needs the value and does not state it, or states a different number, is a finding.
5. Givens and check bounds. Every number in the stem appears in `givens`, with the value written as in the stem, and the note says how it is used or that it is not needed. `check.lo ≤ answer ≤ check.hi`, the bounds follow from the reasoning in `check.t`, and the numbers in `check.t` are right.
6. The arithmetic inside the text. Run `cd src && node step_check.js` (after `python3 build.py`, or with the path of a built page as the first argument). Every hit it prints that is not on its `ALLOW` list is a finding; recompute each one by hand and say whether the printed value or the working is wrong. Also read the steps for arithmetic the script skips (its `VERBOSE=1` output lists the skipped links).

Output `calc_verify.json`: an array of findings `{"id", "severity": "key" | "tol" | "unit" | "carry" | "givens" | "check" | "step", "quote", "source", "fix"}`. `quote` is the exact current text of the field at fault. `source` names where the correct value comes from: the file and page or slide of her worked solution, the transcript file and time, the slide, or the textbook page, and for a value you computed, the expression and its exact result. `fix` is the exact replacement text for the quoted field, or "drop". Report only real problems; skip clean questions. Output `calc_verify.md`: questions checked, findings by severity, and the keys you could not tie to any source, in under 150 words.
