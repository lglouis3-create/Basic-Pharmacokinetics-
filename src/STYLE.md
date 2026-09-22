# PHAR 4221 — Professor Corpus (Dr. Anita Mosley)

**What this file is.** A verbatim record of every problem Dr. Mosley has actually assigned to her PHAR 4221 Basic Pharmacokinetics class, together with her own printed worked solutions. **Every stem, every equation, every number and every final answer below is hers.** No question here was written by anyone else, and no pharmacokinetics content has been added from outside these files.

**Conventions used below**
- `[unclear: …]` marks a character the PDF text-extract garbled (several of these files are scans of handwritten or equation-typeset work). The extract's literal content is transcribed and the plausible reading is named. Nothing has been silently cleaned up.
- **Recompute check** after each answer states whether an independent recalculation reproduced her printed answer. Disagreements are flagged in bold.
- Source file names are given exactly as they appear in the course project.

---

# Module 1 — Kinetic Orders and Math Review

## Source: `IntroductionandMathReviewSolutions.pdf`
Header: *PHAR 4221 Daily Practice Introduction and Math Review 1*

### M1-1.1 — Data table, first-order decomposition

**Stem, verbatim.**
> In an experiment to study the chemical decomposition, a drug solution was prepared and a sample was obtained at different time points. The drug concentrations in the samples and the results were as follows:
>
> | Time (hr) | Concentration (mg/L) |
> |---|---|
> | 2 | 294.3 |
> | 6 | 208.1 |
> | 12 | 123.8 |
> | 24 | 43.8 |
> | 36 | 15.5 |
> | 48 | 5.5 |

**Format.** Free response, four parts, driven off a data table. She does not state the order — the student must infer first-order from the data.

**What is asked.**
- a. What is the rate constant for the decrease in concentration?
- b. What was the initial starting concentration of the solution?
- c. How much time is required for exactly half the solution to decompose (t½)?
- d. How much time is required for the original solution to decompose by 90%?

**Her worked solution.**

a. `k = −ln(43.8/208.1) / 18 hr = 0.0866 hr⁻¹`
 (she picks the t = 6 hr and t = 24 hr points, Δt = 18 hr)
 *Recompute:* −ln(43.8/208.1)/18 = 0.086577 hr⁻¹ → **matches** (0.0866 hr⁻¹).

b. `C₀ = (123.8 mg/L)e^(0.0866 × 12) = 350 mg/L`
 *Recompute:* 123.8 × e^(1.0392) = 349.88 → **matches** (350 mg/L).

c. `t½ = 0.693 / 0.0866 hr⁻¹ = 8 hr`
 *Recompute:* 8.002 hr → **matches** (8 hr).

d. `0.1C₀ = C₀e^(−0.0866t)`; `t = ln(1/0.1) / 0.0866 hr⁻¹ = 26.6 hr`
 *Recompute:* 2.302585/0.0866 = 26.589 → **matches** (26.6 hr).

**Rounding.** k to 4 decimal places (0.0866); C₀ to 3 significant figures (350); t½ to a whole hour (8); t to 1 decimal (26.6).

---

### M1-1.2 — Same table format, zero-order decomposition

**Stem, verbatim.**
> In an experiment to study the chemical decomposition, a drug solution was prepared and a sample was obtained at different time points. The drug concentrations in the samples and the results were as follows:
>
> | Time (hr) | Concentration (mg/mL) |
> |---|---|
> | 2 | 338 |
> | 6 | 314 |
> | 12 | 278 |
> | 24 | 206 |
> | 36 | 134 |
> | 48 | 62 |

**Format.** Free response, four parts off a data table. Note she recycles the *identical* stem wording from M1-1.1, changing only the units (mg/mL instead of mg/L) and the numbers, so the process is zero-order. The lettering in her key runs a, b, then **a, b again** (her own numbering slip, transcribed as printed).

**What is asked.**
- a. What is the rate constant for the decrease in concentration?
- b. What was the initial starting concentration of the solution?
- a. [*sic*] How much time is required for exactly half the solution to decompose (t½)?
- b. [*sic*] How much time is required for the original solution to decompose by 90%?

**Her worked solution.**

a. `k = −(206 − 338) mg/mL / (24 − 2) hr = 6 (mg/mL)/hr`
 *Recompute:* 132/22 = 6.0 → **matches**.

b. `C₀ = 338 mg/mL + (6 (mg/mL)/hr)(2 hr) = 350 mg/mL`
 *Recompute:* 350 → **matches**.

a. [*sic*] `t½ = 350 mg/mL / [2(6 mg/mL/hr)] = 29.2 hr`
 *Recompute:* 350/12 = 29.167 → **matches** (29.2 hr).

b. [*sic*] `t = (350 − 35) mg/L [unclear: mg/mL — the stem and every other step use mg/mL; the extract prints "mg/�" here] / (6 mg/mL/hr) = 52.5 hr`
 *Recompute:* 315/6 = 52.5 → **matches**.

**Rounding.** t½ to 1 decimal (29.2); t to 1 decimal (52.5).

---

### M1-1.3 — Half-life reasoning, no calculator

**Stem, verbatim.**
> If the half-life for decomposition of a drug is 8 hours, how long will it take for 750 mg of the drug to decompose by 87.5%? Assume first-order kinetics and constant temperature.

**Format.** Free response, single answer. Numbered "1." in her key even though it follows items 1 and 2 (her numbering restarts on the second page).

**What is asked.** Time for 87.5% decomposition.

**Her worked solution (verbatim reasoning, no equation used).**
> First-order process with a 8 hour half-life, 50% of drug should be decomposed in one half-life (8 hours), 75% should be decomposed in two half-lives (16 hours), and 87.5% decomposed in 3 half-lives (24 hours).

Final answer: **24 hours**.
*Recompute:* 87.5% decomposed = 12.5% remaining = (1/2)³, so 3 t½ = 24 hr → **matches**. Note the 750 mg is a red herring — she never uses it.

**Rounding.** None; exact half-life multiples.

---

## Source: `IntroductionandMathReview2Solutions.pdf`
Header: *PHAR 4221 Daily Practice Introduction and Math Review 2*

### M1-2.1 — Number of half-lives for 99.9%

**Stem, verbatim.**
> How many half-lives (t½) would it take for 99.9% of any initial concentration of a drug to decompose? Assume first-order kinetics.

**Format.** Free response. She gives **two** solutions — an algebraic one and an "OR" table — which is a recurring habit of hers.

**What is asked.** Number of half-lives for 99.9% decomposition.

**Her worked solution.** The equation block is heavily garbled by the extract. As printed:
> `C0 = 100   C = 1.0` `[unclear: C = 0.1 — 99.9% decomposed from C₀ = 100 leaves 0.1, and her own table below ends at 0.1% remaining; "1.0" as printed would be 99% decomposition]`
> `k = 0.693/t½`
> `t = ln(100/[0.1]) / (0.693/t½) = 9.97 t½` `[unclear: the extract prints the digits as "97.9"; read as 9.97 t½ ≈ 10 t½, consistent with her table]`

OR (her table, verbatim):

| t½ | % Remaining | % Decomposed |
|---|---|---|
| 1 | 50 | 50 |
| 2 | 25 | 75 |
| 3 | 12.5 | 87.5 |
| 4 | 6.25 | 93.75 |
| 5 | 3.13 | 96.88 |
| 6 | 1.56 | 98.44 |
| 7 | 0.78 | 99.22 |
| 8 | 0.39 | 99.61 |
| 9 | 0.2 | 99.8 |
| 10 | 0.1 | 99.9 |

Final answer: **10 half-lives**.
*Recompute:* ln(1000)/0.693 = 9.97 t½ ≈ 10 t½ → **matches** her table answer of 10.

**Rounding.** Table entries rounded to 2–3 significant figures (3.13, 1.56, 0.78, 0.39, 0.2, 0.1); the algebraic 9.97 is taken as 10.

---

### M1-2.2 — 30% decomposition from a stated half-life

**Stem, verbatim.**
> If the half-life for decomposition of a drug is 12 hours, how long will it take for 125 mg of the drug to decompose by 30%? Assume first-order kinetics and constant temperature.

**Format.** Free response, single answer. Same stem skeleton as M1-1.3, with 8 hr → 12 hr, 750 mg → 125 mg, 87.5% → 30%. Here the 125 mg *is* used (as the C₀ in the log ratio).

**What is asked.** Time for 30% decomposition.

**Her worked solution.**
> `k = 0.693/12 hr = 0.058 hr⁻¹`
> `C = C₀e^(−kt)`
> `t = ln(125/87.5) / 0.058 hr⁻¹ = 6.2 hr`

*Recompute:* 30% decomposed leaves 70% of 125 = 87.5 mg. ln(125/87.5)/0.058 = 6.15 hr → **matches** (6.2 hr). Using an unrounded k = 0.05775 gives 6.17 hr, still 6.2 hr.

**Rounding.** k to 3 decimals (0.058); t to 1 decimal (6.2 hr).

---

### M1-2.3 — Back out the dissolution volume, zero-order

**Stem, verbatim.**
> Exactly 300 mg of a drug are dissolved into an unknown volume of distilled water. After complete dissolution of the drug, 1.0-mL samples were removed and assayed for the drug. The following results were obtained:
>
> | Time (hr) | Concentration (mg/mL) |
> |---|---|
> | 0.5 | 0.45 |
> | 2.0 | 0.3 |
>
> Assuming zero-order decomposition of the drug, what was the original volume of water in which the drug was dissolved?

**Format.** Free response, one answer, two-row data table. Here she **states the order** in the stem ("Assuming zero-order decomposition").

**What is asked.** Original volume of water.

**Her worked solution.**
> `k = −(0.3 − 0.45) mg/mL / (2 − 0.5) hr = 0.1 mg/mL/hr`
> `A₀ = 0.3 mg/mL + (0.1 mg/mL/hr)(2 hr) = 0.5 mg/mL`
> `300 mg / X mL = 0.5 mg/mL ⇒ X = 600 mL`

*Recompute:* k₀ = 0.15/1.5 = 0.1 mg/mL/hr ✓; A₀ = 0.5 mg/mL ✓; V = 300/0.5 = 600 mL → **matches**.

**Rounding.** Exact values throughout; no rounding shown.

---

## Source: `IntroductionandMathReview3Solutions.pdf`
Header: *PHAR 4221 Daily Practice Introduction and Math Review 3*

### M1-3.1 — Classify the order, then rate constant and half-life

**Stem, verbatim.**
> The table below shows the decomposition of a drug as a function of time.
>
> | Time (minute) | Drug A (mg) |
> |---|---|
> | 10 | 97.0 |
> | 20 | 89.0 |
> | 40 | 73.0 |
> | 60 | 57.0 |
> | 90 | 34.0 |
> | 120 | 10.0 |
> | 130 | 2.5 |

**Format.** Part **a is multiple choice** (two options), parts b and c are free response. Time is in **minutes** here, and the dependent variable is an **amount (mg)**, not a concentration.

**What is asked.**
- a. How would you classify the decrease in the amount of drug A?
  - **a. Zero-order — the drug is decreasing at a constant amount per unit time** ← *keyed answer (her key prints the justification inline on this option)*
  - b. First-order
- b. What is the rate constant for the decrease in drug?
- c. What is the half-life of drug decomposition?

**Her worked solution.**

a. Keyed: **Zero-order**, "the drug is decreasing at a constant amount per unit time."

b. `k = − slope of the line`
 `k = −ΔY/ΔX = −(57 − 89) mg / (60 − 20) min = 0.8 mg/min`
 *Recompute:* 32/40 = 0.8 mg/min → **matches**.

c. `A₀ = A + kt = 73 mg + (0.8 mg/min)(40 min) = 105 mg`
 `t½ = A₀ / 2k = 105 mg / [2(0.8 mg/min)] = 65.6 min`
 *Recompute:* A₀ = 105 mg ✓; 105/1.6 = 65.625 min → **matches** (65.6 min).

**Rounding.** t½ to 1 decimal (65.6 min).

*Note on the extract:* this page's equations are printed out of order and interleaved by the PDF extractor (the `A₀ = A + kt` line appears both before and after the t½ line). The mathematics above is exactly what she wrote; only the line order has been restored.

---

### M1-3.2 — Same data, both orders

**Stem, verbatim.**
> A solution of a drug was freshly prepared at a concentration of 500 mg/mL. After 60 days at 25°C, the drug concentration in the solution was 150 mg/mL.

**Format.** Free response, two parts. Classic paired-order question: *the same two data points, worked twice*. Time in **days**, temperature stated.

**What is asked.**
- a. Assuming first-order kinetics, when will the drug decline to one-half of the original concentration?
- b. Assuming zero-order kinetics, when will the drug decline to one-half of the original concentration?

**Her worked solution.**

a. `k = −ΔY/ΔX = −[ln(150) − ln(500)] / 60 days = 0.02 day⁻¹`
 `t½ = 0.693 / 0.02 day⁻¹ = 34.5 days`
 *Recompute:* k = ln(500/150)/60 = 0.020066 day⁻¹ → **matches** (0.02). t½ = 0.693/0.02 = 34.65 days; she prints **34.5 days**. Using her unrounded k, 0.693/0.020066 = 34.54 days. **Flag: her printed 34.5 does not follow from 0.693/0.02 = 34.65.** It does follow from the unrounded k (34.54 → 34.5). Both numbers reported; this is either a transcription artefact of the rounded k, or she carried the unrounded k forward. Reported, not adjudicated.

b. `k = −ΔY/ΔX = −(500 − 150) mg/mL / 60 days = 5.83 mg/mL/day`
 `t½ = (500 mg/mL) / [2(5.83 mg/mL/day)] = 42.9 days`
 *Recompute:* 350/60 = 5.8333 ✓; 500/(2 × 5.83) = 42.88 days → **matches** (42.9 days).

**Rounding.** k to 2 decimals (0.02, 5.83); t½ to 1 decimal.

---

## Source: `PHAR_4221_Homework_1.md`
Header: *PHAR 4221: Pharmacokinetics — Homework 1: Reaction Kinetics & Fundamentals*

### M1-HW1.1 — ln(C) column supplied, volume back-calculation

**Stem, verbatim.**
> A pharmacist dissolved 200 mg of a new antibiotic drug into a volume of purified water and placed the solution in a refrigerator (4°C). At various time intervals, the pharmacist removed a small aliquot from the solution and measured the amount of drug contained in each aliquot. The following data were obtained:
>
> Dose = 200 mg × (1000 µg / 1 mg) = 200,000 µg
>
> | Time (t, hr) | Drug Concentration (C, µg/mL) | ln(C) |
> |---|---|---|
> | 0.5 | 233.3 | 5.4523 |
> | 1.0 | 217.6 | 5.3827 |
> | 2.0 | 189.5 | 5.2444 |
> | 4.0 | 143.6 | 4.9670 |
> | 8.0 | 82.5 | 4.4128 |
> | 12.0 | 47.4 | 3.8586 |
> | 16.0 | 27.2 | 3.3032 |

**Format.** Free response, five parts, data table **with the ln(C) column pre-computed for the student**. Order is asked for, not stated. The µg conversion is done for the student in the stem.

**What is asked.**
- a. Is the decomposition of this antibiotic a first-order or a zero-order process?
- b. What is the rate constant k for the decomposition of this antibiotic?
- c. What is the half-life (t½)?
- d. What was the initial volume of water used to prepare the original solution?
- e. How much time is required for the concentration of drug to decrease by 75%?

**Her worked solution.**

a. "Plotting concentration (C) vs. time (t) yields a curved exponential decline. Plotting the natural logarithm of concentration (ln C) vs. time (t) yields a straight line with a correlation coefficient of r = −1.0000. **Conclusion: the decomposition follows First-Order Kinetics.**"
 *Recompute:* ln C vs t is linear to 4 decimals → **matches**.

b. Using t₁ = 1 h, C₁ = 217.6 µg/mL and t₂ = 16 h, C₂ = 27.2 µg/mL:
 `k = [ln(C₁) − ln(C₂)] / (t₂ − t₁) = (5.3827 − 3.3032)/15 = 2.0795/15 = 0.1386 h⁻¹`
 *Recompute:* 2.0795/15 = 0.138633 → **matches** (0.1386 h⁻¹).

c. `t½ = ln(2)/k = 0.69315 / 0.13863 h⁻¹ = 5.00 hours`
 *Recompute:* 5.0000 hr → **matches**.

d. `ln(C₀) = ln(Cₜ) + kt = ln(217.6) + (0.13863 × 1) = 5.3827 + 0.1386 = 5.5213`
 `C₀ = e^5.5213 = 250.0 µg/mL`
 `V = Dose / C₀ = 200,000 µg / 250 µg/mL = 800 mL`
 *Recompute:* e^5.5213 = 249.99 µg/mL ✓; 200,000/250 = 800 mL → **matches**.

e. `t = ln(C₀/C)/k = ln(1/0.25)/0.13863 = ln(4)/0.13863 = 1.3863/0.13863 = 10.0 hours`
 with her note: "*(Note: A 75% decline represents exactly 2 half-lives: 2 × 5.00 h = 10.0 h).*"
 *Recompute:* 10.00 hr → **matches**.

**Rounding.** k to 4 decimals (0.1386); intermediate k carried at 5 decimals (0.13863); t½ and t to 2 decimals / 1 decimal (5.00, 10.0).

---

### M1-HW1.2 — Amount vs time, zero-order

**Stem, verbatim.**
> Below is the decrease in the amount of drug as a function of time:
>
> | Time (t, hr) | Drug A (A, mg) |
> |---|---|
> | 0.5 | 489 |
> | 1.0 | 478 |
> | 2.0 | 455 |
> | 3.0 | 433 |
> | 6.0 | 365 |
> | 9.0 | 298 |
> | 12.0 | 230 |
> | 16.0 | 140 |

**Format.** Free response, three parts, data table. Same "Drug A (mg)" framing as M1-3.1.

**What is asked.**
- a. Does the decrease in the amount of drug A appear to be a zero-order or a first-order process?
- b. What is the rate constant k?
- c. What is the half-life (t½)?

**Her worked solution.**

a. "Plotting amount remaining (A) vs. time (t) on linear Cartesian coordinates produces a straight line with r = −1.0000. **Conclusion: the decrease follows Zero-Order Kinetics.**"
 *Recompute:* A vs t is linear → **matches**.

b. Using t₁ = 1 h, A₁ = 478 mg and t₂ = 12 h, A₂ = 230 mg:
 `k₀ = −ΔA/Δt = −(230 − 478)/(12 − 1) = 248 mg / 11 h = 22.5 mg/h`
 *Recompute:* 248/11 = 22.545 mg/h → **matches** (22.5 mg/h).

c. `A₀ = A + k₀t = 478 mg + (22.545 mg/h × 1 h) = 500.5 ≈ 500 mg`
 `t½ = 0.5·A₀ / k₀ = (0.5 × 500 mg) / (22.5 mg/h) = 11.1 hours`
 *Recompute:* A₀ = 500.5 mg ✓; 250/22.5 = 11.11 h → **matches** (11.1 hours). (Using the unrounded A₀ = 500.5 and k₀ = 22.545 gives 11.10 h — same.)

**Rounding.** k₀ to 1 decimal (22.5); A₀ rounded from 500.5 to 500; t½ to 1 decimal (11.1).

---

### M1-HW1.3 — Two points, both orders

**Stem, verbatim.**
> A solution of a drug was freshly prepared at a concentration of 315 mg/mL. After 30 days at 25°C, the drug concentration in the solution was 75 mg/mL.

**Format.** Free response, two parts. This is the *same stem template* as M1-3.2 with 500 → 315 mg/mL, 60 → 30 days, 150 → 75 mg/mL.

**What is asked.**
- a. Assuming first-order kinetics, when will the drug decline to one-half of the original concentration?
- b. Assuming zero-order kinetics, when will the drug decline to one-half of the original concentration?

**Her worked solution.**

a. `k₁ = ln(C₀/C)/t = ln(315/75)/30 days = ln(4.2)/30 = 1.43508/30 = 0.04784 day⁻¹`
 `t½ = 0.69315 / 0.04784 day⁻¹ = 14.5 days`
 *Recompute:* ln(4.2) = 1.435085 ✓; k = 0.047836 ✓; 0.69315/0.047836 = 14.49 days → **matches** (14.5 days).

b. `k₀ = (C₀ − C)/t = (315 − 75) mg/mL / 30 days = 240/30 = 8.0 mg/(mL·day)`
 `t½ = 0.5·C₀ / k₀ = (0.5 × 315) / 8.0 = 157.5/8.0 = 19.7 days`
 *Recompute:* 157.5/8 = 19.6875 → **matches** (19.7 days).

**Rounding.** k to 5 decimals (0.04784); t½ to 1 decimal (14.5, 19.7).

---

# Module 2 — IV Bolus, One- and Multi-Compartment

## Source: `IVBolusPractice1.pdf`

This is the **unsolved handout** for the same problem that appears solved in `IV-Bolus-Practice-1---Solutions.pdf`, with a student's (or her own) **handwritten work scanned on top**. The handwriting extract is extremely garbled and is transcribed below only for completeness; the authoritative worked solution is under M2-1 from the Solutions file.

**Stem, verbatim (clean part of the extract).**
> The data presented in the table below are plasma concentrations of a new drug at different time points after and intravenous bolus injection of 50 mg to a 70-kg patient. Calculate the following:
>
> a. Elimination rate constant
> b. Half-life of elimination
> c. Initial plasma concentration
> d. Concentration of drug in the plasma 15 minutes after the dose was given
> e. Apparent volume of distribution
> f. Total body clearance of this drug in this patient
> g. The amount of drug in the body 3 hours after the drug was administered
> h. Time required for 99.9% of the drug to be eliminated from the body
>
> | Time (hr) | Plasma concentration (mg/L) |
> |---|---|
> | 0.5 | 2.52 |
> | 1.0 | 1.59 |
> | 1.5 | 1.00 |
> | 2.0 | 0.64 |
> | 2.5 | 0.40 |
> | 3.0 | 0.25 |

(Note her stem's typo, transcribed as printed: "after and intravenous bolus injection".)

**Handwritten annotations on the scan, transcribed as the extract shows them, unreliable throughout:**
- `Do = 50m` `[unclear: Do = 50 mg]`
- `a) k: ... ☆ = 0.9250S hr-' (3 - 1)` `[unclear: k = 0.92501 hr⁻¹ derived over the interval (3 − 1) hr]`
- `0.b93 = 0.74918hr x60 = 44.95087min` `[unclear: 0.693/k = 0.74918 hr × 60 = 44.95 min]`
- `b) t 1/2 = 0.92501 hr⁻¹` `[unclear: label appears attached to k, not t½]`
- `ln(Cp) = ln(Cp0) - kt`; `Cp0 = Cp·e^kt`
- `0.92501 hr⁻¹ (0.5)`; `Cp = 2.52 mg/L`; `Cpo = 4.001879 mg/L`
- `d) Cp = Cp·e^kt`; `Cp = 4.001879 mg/L e^(0.92501 hr t)`
- `h) (100 - 99.9)/100 = 0.001`; `0.001 = ...`; `ln(0.001) = -k·t`; `-6.908 = -k t`; `t = -6.908 / ...`

**Recompute note on the handwriting.** The handwritten k of 0.92501 hr⁻¹ was apparently derived from the 1.0 hr and 3.0 hr points: −ln(0.25/1.59)/2 = 0.92501 hr⁻¹ — that reproduces exactly. Her own printed key (below) instead uses the 1.0 hr and 2.0 hr points and gets 0.9100 hr⁻¹. The handwritten C₀ of 4.001879 mg/L follows from 2.52·e^(0.92501×0.5) = 4.0019 — also reproduces. So the handwriting is internally consistent but uses a different point pair than her key. **Both numbers reported; neither is "wrong", they are different two-point estimates of the same slope.**

---

## Source: `IV-Bolus-Practice-1---Solutions.pdf`
Header: *PHAR 4221 Daily Practice IV Bolus Practice 1*

### M2-1 — IV bolus from a concentration–time table (a–h)

**Stem, verbatim.**
> The data presented in the table below are plasma concentrations of a new drug at different time points after and intravenous bolus injection of 50 mg to a 70-kg patient. Calculate the following:
>
> | Time (hr) | Plasma concentration (mg/L) |
> |---|---|
> | 0.5 | 2.52 |
> | 1.0 | 1.59 |
> | 1.5 | 1.00 |
> | 2.0 | 0.64 |
> | 2.5 | 0.40 |
> | 3.0 | 0.25 |

**Format.** Free response, eight parts (a–h), data table. Weight given in **kg**. Model not stated — one-compartment first-order is to be inferred.

**What is asked.**
- a. Elimination rate constant
- b. Half-life of elimination
- c. Initial plasma concentration
- d. Concentration of drug in the plasma 15 minutes after the dose was given
- e. Apparent volume of distribution
- f. Total body clearance of this drug in this patient
- g. The amount of drug in the body 3 hours after the drug was administered
- h. Time required for 99.9% of the drug to be eliminated from the body

**Her worked solution.**

a. `k = −slope = −[ln 0.64 − ln 1.59] / (2 − 1) hr = 0.9100 hr⁻¹`
 *Recompute:* ln(1.59/0.64)/1 = 0.91002 → **matches** (0.9100 hr⁻¹).

b. `t½ = 0.693 / 0.91 hr = 0.76 hr`
 *Recompute:* 0.693/0.91 = 0.7615 hr → **matches** (0.76 hr).

c. `C₀ = (0.4 mg/L)e^(0.91)(2.5) = 3.89 mg/L`
 (she extrapolates from the t = 2.5 hr point)
 *Recompute:* 0.4 × e^2.275 = 3.8912 → **matches** (3.89 mg/L).

d. `C₀.₂₅ = (3.89 mg/L)e^−(0.91)(0.25) = 3.1 mg/L`
 (15 minutes is converted to 0.25 hr by her, silently)
 *Recompute:* 3.89 × e^−0.2275 = 3.0985 → **matches** (3.1 mg/L).

e. `V_D = 50 mg / 3.89 mg/L = 12.85 L`
 *Recompute:* 12.853 L → **matches** (12.85 L).

f. `Cl_T = (12.85 L)(0.91 hr⁻¹) = 11.7 L/hr`
 *Recompute:* 11.694 L/hr → **matches** (11.7 L/hr).

g. `D₃ = (12.85 L)(0.25 mg/L) = 3.2 mg` **or** `D₃ = 50 mg · e^−(0.91)(3) = 3.2 mg`
 *Recompute:* 12.85 × 0.25 = 3.213 mg; 50·e^−2.73 = 3.261 mg → both round to 3.2 mg → **matches**. (Note she deliberately shows two routes to the same answer.)

h. `10 t½ = 10(0.76 hr) = 7.6 hr`
 *Recompute:* 7.6 hr; the exact ln(1000)/0.91 = 7.59 hr → **matches**.

**Rounding.** k to 4 decimals (0.9100); t½ to 2 decimals (0.76); concentrations to 2–3 sig figs (3.89, 3.1); V_D to 2 decimals (12.85); clearance to 3 sig figs (11.7).

---

## Source: `IV-Bolus-Practice-2---Solutions.pdf`
Header: *PHAR 4221 Daily Practice IV Bolus Practice 2*

### M2-2 — IV bolus from two plasma points (a–h)

**Stem, verbatim.**
> 250 mg of an antibiotic was administered as an IV bolus injection to a 70-kg patient. The concentration at 4 and 8 hours after administration of the dose was 6.6 mcg/mL and 2.18 mcg/mL, respectively. Calculate the following:

**Format.** Free response, eight parts (a–h) — **identical part list to M2-1**, but fed by two prose-stated points instead of a table. Concentrations in **mcg/mL**, weight in **kg**. The 70-kg weight is never used in the solution.

**What is asked.** (a–h exactly as in M2-1)
- a. Elimination rate constant
- b. Half-life of elimination
- c. Initial plasma concentration
- d. Concentration of drug in the plasma 15 minutes after the dose was given
- e. Apparent volume of distribution
- f. Total body clearance of this drug in this patient
- g. The amount of drug in the body 3 hours after the drug was administered
- h. Time required for 99.9% of the drug to be eliminated from the body

**Her worked solution.**

a. `k = −ln(6.6/2.18) / (4 − 8) hr = 0.2769 hr⁻¹`
 *Recompute:* ln(6.6/2.18) = 1.10774; /4 = 0.27694 → **matches** (0.2769 hr⁻¹).

b. `t½ = 0.693 / 0.2769 hr⁻¹ = 2.5 hr`
 *Recompute:* 2.5027 hr → **matches** (2.5 hr).

c. `C₀ = (2.18 mg/L)e^(0.2769)(8) = 20 mg/L`
 (note she silently switches the unit label from mcg/mL to mg/L — numerically identical)
 *Recompute:* 2.18 × e^2.2152 = 19.976 → **matches** (20 mg/L).

d. `C₀.₂₅ = (20 mg/L)e^−(0.2769)(0.25) = 18.66 mg/L`
 *Recompute:* 18.662 → **matches** (18.66 mg/L).

e. `V_D = 250 mg / (20 mg/L) = 12.5 L`
 *Recompute:* 12.5 L → **matches**.

f. `Cl = (12.5 L)(0.2769 hr⁻¹) = 3.46 L/hr`
 *Recompute:* 3.4613 → **matches** (3.46 L/hr).

g. `D₃ = (250 mg)e^−(0.2769)(3) = 108.9 mg`
 *Recompute:* 108.936 → **matches** (108.9 mg).

h. `t = ln(100/0.1) / 0.2769 hr⁻¹ = 25 hr` **or** `10 t½ = 10(2.5 hr) = 25 hr`
 *Recompute:* ln(1000)/0.2769 = 24.947 hr → **matches** (25 hr).

**Rounding.** k to 4 decimals; t½ to 1 decimal; concentrations to 2 decimals (18.66); amounts to 1 decimal (108.9).

---

## Source: `IV-Bolus-Practice-3---Solutions.pdf`
Header: *PHAR 4221 Daily Practice IV Bolus Practice 3*

### M2-3.1 — Weight in pounds, V_D as % of body weight, mg/kg dose

**Stem, verbatim.**
> A 187-pound male patient received a 15 mg/kg dose of a drug by rapid IV injection. The drug is characterized by half-life of 4 hours and an apparent volume of distribution that is 20% of body weight. Determine the:

**Format.** Free response, five parts (a–e). **Weight in pounds** (so the student must convert), dose as **mg/kg**, V_D as a **percentage of body weight**. Model not stated.

**What is asked.**
- a. Initial concentration of drug in the plasma
- b. Elimination rate constant
- c. Total body clearance
- d. Concentration of drug in the plasma 8 hours after administration of the dose
- e. Amount of drug in the body 12 hours after administration of the dose

**Her worked solution.**

a. `C₀ = (15 mg/kg) / (0.2 L/kg) = 75 mg/L`
 (she uses the dose-per-kg over V_D-per-kg shortcut, so the pound conversion cancels)
 *Recompute:* 75 mg/L → **matches**.

b. `k = 0.693 / 4 hr = 0.1733 hr⁻¹`
 *Recompute:* 0.17325 → **matches** (0.1733 hr⁻¹).

c. `Cl_T = (17 L)(0.1733 hr⁻¹) = 2.95 L/hr`
 (the 17 L comes from 187 lb ÷ 2.2 = 85 kg × 0.2 L/kg = 17 L — she does not show this step)
 *Recompute:* 187/2.2 = 85.0 kg; 0.2 × 85 = 17.0 L ✓; 17 × 0.1733 = 2.946 → **matches** (2.95 L/hr).

d. `8 hr = 2 t½ → 25% remaining → 0.25(75 mg/L) = 18.75 mg/L`
 `C₈ = (75 mg/L)e^−(0.1733)(8) = 18.75 mg/L`
 *Recompute:* 75 × e^−1.3864 = 18.748 → **matches** (18.75 mg/L). Note she again gives the half-life-reasoning route *and* the exponential route.

e. `12 hr = 3 t½ → 12.5% remaining → 0.125(1275 mg) = 159.375 mg`
 `D₁₂₈ [unclear: D₁₂ — the subscript is printed "128"] = (1275 mg)e^−(0.1733)(12) = 159.35 mg`
 (the 1275 mg dose is 15 mg/kg × 85 kg — again not shown)
 *Recompute:* 15 × 85 = 1275 mg ✓; 0.125 × 1275 = 159.375 mg ✓; 1275 × e^−2.0796 = 159.35 mg → **matches** both figures.

**Rounding.** k to 4 decimals; clearance to 2 decimals (2.95); concentration to 2 decimals (18.75); amount to 2–3 decimals (159.375 / 159.35).

---

### M2-3.2 — Two-compartment, parameters given (A, B, α, β)

**Stem, verbatim.**
> A 300-mg IV bolus dose of a drug was administered to six healthy volunteers. The parameters below best describe the pharmacokinetics of the drug.
>
> A = 10.21 mg/L  B = 8.53 mg/L  α = 3.14 hr⁻¹  β = 0.198 hr⁻¹

**Format.** Free response, four parts (a–d). Parameters handed to the student as a labelled line. The **two-compartment model is implied** by the presence of A, B, α, β but never named in the stem.

**What is asked.**
- a. What is the elimination half-life in these volunteers?
- b. What is the initial concentration of drug in the plasma in these volunteers?
- c. What is the concentration of drug in the plasma 4 hours after administration of the dose?
- d. What is the volume of distribution of the central compartment?

**Her worked solution.**

a. `t½β = 0.693 / 0.198 hr⁻¹ = 3.5 hr`
 *Recompute:* 3.5 hr → **matches**.

b. `C₀ = (10.21 + 8.53) mg/L = 18.74 mg/L`
 *Recompute:* 18.74 mg/L → **matches**.

c. `C₄ = (10.21 mg/L)e^−3.14(4) + (8.53 mg/L)e^−0.198(4) = 3.86 mg/L`
 `[unclear: the extract prints the first exponent without its minus sign — "�3.14(4)" — but the arithmetic only works with e^−3.14(4), so the minus is taken as present]`
 *Recompute:* 10.21·e^−12.56 = 0.0000035; 8.53·e^−0.792 = 3.8636; total 3.8636 → **matches** (3.86 mg/L).

d. `V_c = 300 mg / (18.74 mg/L) = 16 L`
 *Recompute:* 16.009 L → **matches** (16 L).

**Rounding.** t½ to 1 decimal (3.5); C₀ to 2 decimals (18.74); C₄ to 2 decimals (3.86); V_c to a whole litre (16).

---

## Source: `IV-Bolus-Practice-4---Solutions.pdf`
Header: *PHAR 4221 Daily Practice IV Bolus Practice 4*

### M2-4.1 — Model stated, V_D in mL/kg, plus dose-doubling conceptual parts

**Stem, verbatim.**
> A drug that follows one-compartment, first-order elimination has an elimination half-life of 6 hours and apparent volume of distribution V_D of 400 mL/kg has been administered as a single 600-mg dose is given to an adult female patient (62 kg) by rapid IV injection.

**Format.** Free response, six parts (a–f). Here she **does state the model** ("one-compartment, first-order elimination"). Weight in **kg**, V_D in **mL/kg**. Parts d–f are **conceptual, no calculation required** (except f, where she calculates anyway).

**What is asked.**
- a. What is the expected initial concentration of the drug in the plasma?
- b. What percent of the dose is eliminated in 24 hours?
- c. What is the expected plasma drug concentration (Cp) at 12 hours after administration of the dose?
- d. If the dose were doubled, what is the expected change in the half-life of elimination?
- e. If the dose were doubled, what is the expected change in the clearance?
- f. If the dose were doubled, what is the expected change in the initial plasma concentration?

**Her worked solution.**

a. `C₀ = 600 mg / [(0.4 L/kg)(62 kg)] = 24.19 mg/L`
 *Recompute:* 600/24.8 = 24.194 → **matches** (24.19 mg/L).

b. `24 hr = 4 t½ → 93.75% eliminated`
 `C = 100e^−24(0.1155) = 6.25% remaining`
 `100% − 9.25% = 93.75% eliminated` `[unclear: "9.25%" — this must be 6.25%; her own line immediately above prints 6.25% remaining, and 100 − 6.25 = 93.75, so "9.25" is a typo in her key]`
 *Recompute:* 100·e^−2.772 = 6.254% remaining ✓; 100 − 6.25 = 93.75% eliminated → **final answer matches**; the "9.25%" intermediate is internally inconsistent with her own 6.25% and her own 93.75%. **Flagged as an apparent typo in her key** (reported, not adjudicated).

c. `12 hr = 2 t½ → 25% remaining → 0.25(24.19 mg/L) = 6.05 mg/L`
 `C₁₂ = (24.19 mg/L)e^−0.1155(12) = 6.05 mg/L`
 *Recompute:* 24.19 × e^−1.386 = 6.049 → **matches** (6.05 mg/L).

d. "No change in half-life; half-life is constant for first-order processes"
 *Recompute:* conceptually correct for linear first-order kinetics → **matches**.

e. "No change in clearance; clearance is constant for first-order processes"
 *Recompute:* conceptually correct → **matches**.

f. "Expect the initial concentration to increase by a factor of 2"
 `C₀ = 1200 mg / [(0.4 L/kg)(62 kg)] = 48.387 mg/L`
 *Recompute:* 1200/24.8 = 48.387 → **matches**.

**Rounding.** C₀ to 2 decimals in (a) but 3 decimals in (f) (24.19 vs 48.387); percentages to 2 decimals (93.75, 6.25).

---

### M2-4.2 — Biexponential equation handed over directly

**Stem, verbatim.**
> The pharmacokinetics of an antibiotic administered by IV bolus injection is best described by the equation below. (Concentration is given in mcg/mL and time in hours)
>
> Cp = 18.35e^−4.8t + 12.63e^−0.09 `[unclear: the second exponent is printed "e^−0.09" with no t; the stem's parallel in Homework 2 problem 2 prints "e^−0.173t", and her own part (c) evaluates e^−0.09(4), so read as 12.63e^−0.09t]`

**Format.** Free response, three parts (a–c). The whole model arrives as one equation; units and time base are parenthesised in the stem — a phrasing she reuses verbatim in Homework 2.

**What is asked.**
- a. What is the elimination half-life of this drug?
- b. What is the initial plasma concentration of this drug?
- c. What is the concentration of drug in the plasma 4 hours after administration of the dose?

**Her worked solution.**

a. `t½β = 0.693 / 0.09 hr⁻¹ = 7.7 hr`
 *Recompute:* 7.70 hr → **matches**.

b. `C₀ = (18.35 + 12.63) mcg/mL = 30.98 mg/L`
 (she again swaps the label mcg/mL ↔ mg/L mid-line; numerically identical)
 *Recompute:* 30.98 → **matches**.

c. `C₀₄ [unclear: C₄ — subscript printed "04"] = [18.35e^−4.8(4) + 12.63e^−0.09(4)] mcg/mL = 8.812 mg/L`
 *Recompute:* 18.35·e^−19.2 = 8.4e−8; 12.63·e^−0.36 = 8.8117; total 8.8117 → **matches** (8.812).

**Rounding.** t½ to 1 decimal (7.7); C₀ to 2 decimals (30.98); C₄ to 3 decimals (8.812).

---

## Source: `Homework2.pdf`
Header: *PHAR 4221 Homework 2*

**IMPORTANT — no answer key.** This file contains the **question sheet only**. The PDF extract returns the two problems in full and legibly, but **no worked solutions are present anywhere in the file**. Her stems are therefore transcribed verbatim below with no solution section, and nothing has been computed on her behalf.

### M2-HW2.1 — Pounds, mg/kg, two plasma points, model stated

**Stem, verbatim.**
> A 165-lb male received a single IV bolus dose of an antibacterial agent at a dose level of 20 mg/kg. The concentration of drug in the plasma was 113.7 mcg/mL and 49.5 mcg/mL at 2 and 8 hours, respectively, following administration of the dose. The antibacterial agent displays, linear, first-order, one compartment pharmacokinetics.

(Her comma placement after "displays" is transcribed as printed.)

**Format.** Free response, six parts (a–f). Weight in **pounds**, dose in **mg/kg**, concentrations in **mcg/mL**, and the **model explicitly stated** ("linear, first-order, one compartment").

**What is asked.**
- a. What is the half-life of this agent in this patient?
- b. What is the expected initial plasma drug concentration of this dose of drug in this patient?
- c. What is the volume of distribution of this agent in this patient?
- d. How many hours following administration of the dose are required for 87.5% of the agent to be eliminated from the body?
- e. If the dose were administered at a level of 10 mg/kg, how many hours following administration of the dose are required for 87.5% of the drug to be eliminated from the body?
- f. What is the clearance of this agent in this patient?

**Her worked solution.** *None printed in this file.* Nothing supplied.

---

### M2-HW2.2 — Biexponential equation, 400 mg bolus

**Stem, verbatim.**
> The equation below represents the concentration of drug in the plasma following IV bolus administration of a 400 mg bolus dose. (Concentration is given in mcg/mL and time in hours)
>
> Cp = 9.46e^−4,231t + 6.25e^−0.173t `[unclear: "4,231" — the comma is almost certainly a decimal point, i.e. α = 4.231 hr⁻¹; transcribed as printed]`

**Format.** Free response, four parts (a–d). Same stem template as M2-4.2, with the parenthetical units note word-for-word identical.

**What is asked.**
- a. What is the elimination half-life of this agent?
- b. What is the initial concentration of drug in the plasma upon administration of the dose?
- c. What is the concentration of drug in the plasma 4 hours after administration of the dose?
- d. What is the apparent volume of distribution of the central compartment?

**Her worked solution.** *None printed in this file.* Nothing supplied.

---

# Module 3 — IV Infusion

## Source: `IV-Infusions-Practice-1-Solutions.pdf`
Header: *PHAR 4221 Daily Practice IV Infusions Practice 1 Solutions*

### M3-1 — Analgesic infusion, pounds, V_D in L/kg (a–g)

**Stem, verbatim.**
> Continuous intravenous infusion of a potent analgesic is recommended for a patient with inoperable colon cancer and a body weight of 110 pounds. The dose is prepared by dissolving 200 mg of the drug in 500 mL of 5% dextrose. The drug is to be infused over 24 hours. The drug has a half-life of 4 hours and an apparent volume of distribution of 3 L/kg. Calculate the following:

**Format.** Free response, seven parts (a–g). Patient **vignette with a clinical indication** (inoperable colon cancer), weight in **pounds**, V_D in **L/kg**, and a compounding detail (200 mg in 500 mL D5W) used for the mL/min part.

**What is asked.**
- a. Rate of drug infusion in mg/hr
- b. Plasma concentration 6 hours after the start of the infusion
- c. Total amount of drug in the body 12 hours after the start of the infusion
- d. Steady-state plasma concentration
- e. Rate of drug infusion in mL/min
- f. An IV bolus loading dose
- g. Plasma concentration 12 hours after the cessation of the infusion

**Her worked solution.** (The extract interleaves her equation lines badly; the mathematics below is exactly hers, with the line order restored.)

a. `R = 200 mg / 24 hr = 8.33 mg/hr`
 *Recompute:* 8.3333 → **matches** (8.33 mg/hr).

b. `k = 0.693 / 4 hr = 0.1733 hr⁻¹`; `V_D = (3 L/kg)(50 kg) = 150 L`
 `C₆ = [8.33 mg/hr / ((150 L)(0.1733 hr⁻¹))](1 − e^−(0.1733)(6)) = 0.207 mg/L`
 (110 lb ÷ 2.2 = 50 kg, done silently)
 *Recompute:* 110/2.2 = 50 kg ✓; V_D = 150 L ✓; C_ss term = 8.33/25.995 = 0.32045; (1 − e^−1.0398) = 0.6465; product = 0.2072 → **matches** (0.207 mg/L).

c. `C₁₂ = [8.33 mg/hr / ((150 L)(0.1733 hr⁻¹))](1 − e^−(0.1733)(12)) = 0.28 mg/L`
 `D₁₂ = (0.28 mg/L)(150 L) = 42 mg`
 *Recompute:* 0.32045 × (1 − e^−2.0796) = 0.32045 × 0.87497 = 0.2804 → **matches** (0.28 mg/L); 0.28 × 150 = 42 mg → **matches**.

d. `Css = 8.33 mg/hr / [(0.1733 hr⁻¹)(150 L)] = 0.32 mg/L`
 *Recompute:* 0.32045 → **matches** (0.32 mg/L).

e. `Rate = (500 mL / 24 hr) × (1 hr / 60 min) = 0.35 mL/min`
 *Recompute:* 500/1440 = 0.3472 → **matches** (0.35 mL/min).

f. `D_L = 8.33 mg/hr / 0.1733 hr⁻¹ = 48 mg`
 *Recompute:* 48.07 mg → **matches** (48 mg).

g. `C₁₂ = (0.32 mg/L)e^−(0.1733)(12) = 0.04 mg/L`
 **or** her alternative reasoning, verbatim: *"At 12 hr = 3 t½, 12.5% of the initial concentration in the body will remain."*
 `(0.125)(0.32 mg/L) = 0.04 mg/L`
 *Recompute:* 0.32 × e^−2.0796 = 0.03999 → **matches** (0.04 mg/L); 0.125 × 0.32 = 0.04 → **matches**.

**Rounding.** R to 2 decimals (8.33); k to 4 decimals (0.1733); concentrations to 2–3 decimals (0.207, 0.28, 0.32, 0.04); loading dose to a whole mg (48).

---

## Source: `IV-Infusions-Practice-2-Solutions.pdf`
Header: *PHAR 4221 Daily Practice IV Infusions Practice 2 Solutions*

### M3-2 — Antibiotic infusion, vial concentration, target Css (a–f)

**Stem, verbatim.**
> An antibiotic drug is to be given to an adult male patient (162 lb, 58 years old) by IV infusion. The drug is supplied in sterile vials containing 30 mL of the antibiotic solution at a concentration of 125 mg/mL. Assume the drug follows the pharmacokinetics of a one-compartment open model. The apparent volume of distribution of this drug is 0.5 L/kg, and the elimination half-life is 3.1 hours.

**Format.** Free response, six parts (a–f). Patient vignette with **weight in pounds and age**, a **product-supply detail** (30 mL vials at 125 mg/mL) used for parts a and c, and the **model explicitly stated** ("one-compartment open model").

**What is asked.**
- a. What rate in milliliters per hour would you infuse this this drug to obtain a steady-state concentration of 20 mcg/mL in this patient? *(her doubled "this this" transcribed as printed)*
- b. What loading dose would you suggest?
- c. How many milliters of the antibiotic solution are required for the loading dose? *("milliters" as printed)*
- d. What is the expected concentration of drug in the plasma at the end of a 6 hour infusion without a loading dose?
- e. What is the concentration of drug in the plasma 12 hours after the cessation of the 6-hour infusion (no loading dose)?
- f. If an appropriate loading dose were administered with the simultaneous IV infusion, how much time after the cessation of the infusion would be required for the concentration to reach 5 mcg/mL?

**Her worked solution.**

a. `R = Css · Cl_T = (20 mg/L)(0.5 L/kg)(73.64 kg)(0.693/3.1 hr)(1 mL/125 mg) = 1.317 mL/hr → 1.32 mL/hr`
 (162 lb ÷ 2.2 = 73.64 kg, done silently inside the expression)
 *Recompute:* 162/2.2 = 73.636 kg ✓; Cl = 0.5 × 73.64 × 0.22355 = 8.231 L/hr; R = 20 × 8.231 = 164.6 mg/hr; ÷125 mg/mL = 1.317 mL/hr → **matches** (1.32 mL/hr).

b. `D_L = R/k = 165 mg/hr / 0.2235 hr⁻¹ = 738 mg`
 (she rounds the 164.6 mg/hr from part a up to 165 mg/hr before dividing)
 *Recompute:* 165/0.2235 = 738.3 mg → **matches** (738 mg). Independently, Css·V_D = 20 × 36.82 L = 736.4 mg — 738 vs 736 is entirely explained by her rounding of R to 165; **not** a disagreement.

c. `738 mg × (1 mL / 125 mg) = 5.9 mL`
 *Recompute:* 5.904 mL → **matches** (5.9 mL).

d. `C₆ = (20 mg/L)(1 − e^−(0.2235)(6)) = 14.77 mg/L`
 *Recompute:* 20 × (1 − e^−1.341) = 14.768 → **matches** (14.77 mg/L).

e. `C₁₂ = (14.77 mg/L)e^−(0.2235)(12) = 1.01 mg/L`
 *Recompute:* 14.77 × e^−2.682 = 1.0107 → **matches** (1.01 mg/L).

f. `t = ln(20/5) / 0.2235 hr⁻¹ = 6.2 hr` **or** `2 t½ = 2 × 3.1 hr = 6.2 hr`
 *Recompute:* ln(4)/0.2235 = 6.203 hr → **matches** (6.2 hr); 2 × 3.1 = 6.2 hr → **matches**.

**Rounding.** Rate to 2 decimals (1.32 mL/hr); loading dose to a whole mg (738); volume to 1 decimal (5.9 mL); concentrations to 2 decimals (14.77, 1.01); time to 1 decimal (6.2).

---

## Source: `IV-Infusions-Practice-3---Solutions.pdf`
Header: *PHAR 4221 Daily Practice IV Infusions Practice 3 Solutions*

### M3-3 — V_D as % of body weight, target Css, nine parts (a–i)

**Stem, verbatim.**
> A female patient (35 years old, 65 kg) with normal renal function is to be given a drug by IV infusion. According to the literature, the elimination half-life of this drug is 7 hours and the apparent V_D is 23.1% of body weight. The pharmacokinetics of this drug assumes a first-order process. The desired steady-state plasma level for this antibiotic is 10 mcg/mL.

**Format.** Free response, nine parts (a–i) — her longest problem. Weight in **kg**, age given, renal function stated, **V_D as a percentage of body weight**, target Css in **mcg/mL**, order stated but compartment model not named. Later parts chain off answers she asked the student to derive earlier ("at the rate you determined above").

**What is asked.**
- a. Assuming no loading dose, how long after the start of the IV infusion would it take to reach 95% of the Css?
- b. What is an appropriate infusion rate for this drug?
- c. What is an appropriate loading dose for this antibiotic?
- d. What is the total body clearance of this drug?
- e. If the drug were infused for 4 hours at the rate you determined above, what would be the concentration of drug in the plasma at the end of the infusion?
- f. If the drug were infused for 4 hours at the rate you determined above, what would be the concentration of drug in the plasma 6 hours after the cessation of the infusion?
- g. If the drug were infused long enough to reach steady-state at the rate you determined above, what would be the concentration of drug in the plasma 8 hours after the cessation of the infusion?
- h. If the patient suddenly develops partial renal failure, how long would it take for a new steady-state plasma level to be established (assume that 95% of the Css is a reasonable approximation)?
- i. What rate of infusion and loading dose would you recommend to achieve a steady-state concentration of 30 mg/L?

**Her worked solution.**

a. `0.95 = 1 − e^−kt` → `e^−kt = 0.05` → `kt = 3` → `t = 3/k = 3 t½/0.693 = 4.32 t½ = 4.32(7 hr) = 30.3 hr`
 *Recompute:* ln(20) = 2.9957 ≈ 3 ✓; 3/0.099 = 30.30 hr; 4.32 × 7 = 30.24 hr → **matches** (30.3 hr, the two routes differ only by her rounding of 4.32).

b. `R = Css·V_D·k = (10 mg/L)(0.231)(65 L)(0.693/7 hr) = 14.86 mg/hr → 15 mg/hr`
 *Recompute:* 0.231 × 65 = 15.015 L; × 0.099 = 1.4865 L/hr; × 10 = 14.865 mg/hr → **matches** (14.86 → 15 mg/hr). Note she treats 23.1% of 65 kg as 15.015 L directly (1 kg → 1 L).

c. `D_L = 15 mg/hr / (0.693/7 hr) = 151.52 mg → 150 mg`
 *Recompute:* 15/0.099 = 151.52 mg → **matches**; she rounds down to 150 mg as the practical recommendation.

d. `Cl_T = V_D·k = (0.231)(65 L)(0.693/7 hr) = 1.486 L/hr`
 *Recompute:* 1.4865 L/hr → **matches** (1.486 L/hr).

e. `Cp = [15 mg/hr / 1.486 L/hr](1 − e^−(0.099)(4)) = 3.3 mg/L`
 *Recompute:* 10.094 × (1 − e^−0.396) = 10.094 × 0.32695 = 3.3003 → **matches** (3.3 mg/L).

f. `Cp = (3.3 mg/L)e^−(0.099)(6) = 1.82 mg/L`
 *Recompute:* 3.3 × e^−0.594 = 1.822 → **matches** (1.82 mg/L).

g. `Cp = (10 mg/L)e^−(0.099)(8) = 4.53 mg/L`
 *Recompute:* 10 × e^−0.792 = 4.5294 → **matches** (4.53 mg/L).

h. Her answer, verbatim, conceptual only:
 > "One would have to establish the new t½ for the patient, but the time to reach Css would be 4.32 t½ (see part a)"
 *Recompute:* consistent with her part (a) → **matches**.

i. `R = Css·V_D·k = (30 mg/L)(0.231)(65 L)(0.693/7 hr) = 44.6 mg/hr → 45 mg/hr`
 `D_L = 45 mg/hr / (0.693/7 hr) = 454.5 mg → 455 mg`
 *Recompute:* 30 × 1.4865 = 44.595 mg/hr → **matches** (44.6 → 45); 45/0.099 = 454.55 mg → **matches** (454.5 → 455).

**Rounding.** She routinely computes an exact value then **rounds to a clinically usable dose** and prints both, with an arrow: 14.86 → 15 mg/hr, 151.52 → 150 mg, 44.6 → 45 mg/hr, 454.5 → 455 mg. Concentrations to 1–2 decimals.

---

## Source: `IV-Infusions-Practice-4-Solutions.pdf`
Header: *PHAR 4221 Daily Practice IV Infusions Practice 4 Solutions*

### M3-4 — Therapeutic range, additive clearances, renal failure scenario (a–g)

**Stem, verbatim.**
> The therapeutic plasma level of a drug is 4 to 15 mg/L. You would like to immediately attain a steady-state concentration level of 10 mg/L and maintain this concentration over 12 hours. The drug has a half-life of 6 hours and renal and metabolic clearances of 5 and 6.55 L/hr, respectively (total body clearance = renal clearance + metabolic clearance). The patient's body weight is 65 kg.

**Format.** Free response, seven parts (a–g). Gives a **therapeutic range**, **separate renal and metabolic clearances** with the additive relationship spelled out in parentheses, and weight in **kg** (never actually used). Part g is a **renal-failure "what if"** scenario.

**What is asked.**
- a. Determine an IV bolus loading dose and infusion rate to achieve the desired steady-state plasma level of 10 mg/L.
- b. Calculate the volume and concentration of the infusion solution if the rate of input of the solution is 1 mL/min.
- c. What is the apparent volume of distribution?
- d. If there were no loading dose, how much time would be required to reach the 5 mg/L level?
- e. If there were no loading dose, how much time would be required to reach 80% of the steady-state plasma concentration?
- f. Calculate the concentration of drug in the plasma at 1, 6 and 12 hours following the cessation of the infusion at the steady-state level of 10 mg/L.
- g. If the patient develops acute renal failure and the renal clearance is reduced to 2 L/hr, what IV bolus loading dose and infusion rate would you recommend to achieve the steady-state level of 10 mg/L? Assume metabolic clearance and the apparent volume of distribution remain constant.

**Her worked solution.**

a. `R = (10 mg/L)(11.55 L/hr) = 115.5 mg/hr`
 `D_L = 115.5 mg/hr / (0.693/6 hr) = 1000 mg`
 (Cl_T = 5 + 6.55 = 11.55 L/hr)
 *Recompute:* Cl_T = 11.55 ✓; R = 115.5 mg/hr ✓; 115.5/0.1155 = 1000.0 mg → **matches**.

b. `12 hr × (60 min/1 hr) × (1 mL/min) = 720 mL`
 `(115.5 mg/hr × 12 hr) / 720 mL = 1.925 mg/mL`
 *Recompute:* 720 mL ✓; 1386/720 = 1.925 mg/mL → **matches**.

c. `V_D = 11.55 L/hr / 0.1155 hr⁻¹ = 100 L`
 *Recompute:* 100 L → **matches**.

d. `5 mg/L = (10 mg/L)(1 − e^−(0.1155)t)` → `0.5 = 1 − e^−(0.1155)t` → `t = 6 hr = t½`
 with her note, verbatim: *"5 mg/L = 50% of Css"*
 *Recompute:* ln(2)/0.1155 = 6.001 hr → **matches** (6 hr = 1 t½).

e. `0.8 = 1 − e^−(0.1155)t` → `e^−(0.1155)t = 0.2` → `t = 13.93 hr`
 *Recompute:* −ln(0.2)/0.1155 = 13.935 hr → **matches** (13.93 hr).

f. `C₁ = (10 mg/L)e^−(0.1155)(1) = 8.91 mg/L`
 `C₆ = (10 mg/L)e^−(0.1155)(6) = 5 mg/L`
 `C₁₂ = (10 mg/L)e^−(0.1155)(12) = 2.5 mg/L`
 *Recompute:* 8.9092, 5.0007, 2.5007 → **all match** (8.91, 5, 2.5 mg/L).

g. `Cl_T = (2 + 6.55) L/hr = 8.55 L/hr`
 `k = (8.55 L/hr) / 100 L = 0.0855 hr⁻¹`
 `R = (10 mg/L)(8.55 L/hr) = 85.5 mg/hr`
 `D_L = 85.5 mg/hr / 0.0855 hr⁻¹ = 1000 mg`
 *Recompute:* 8.55 ✓; 0.0855 hr⁻¹ ✓; 85.5 mg/hr ✓; 1000 mg → **matches**. (She makes the teaching point implicitly: the loading dose is unchanged at 1000 mg because V_D is unchanged.)

**Rounding.** Rate and dose to whole or 1-decimal values (115.5 mg/hr, 1000 mg); concentration of solution to 3 decimals (1.925 mg/mL); times to 2 decimals (13.93).

---

## Source: `In-Class IV Infusions - Solutions.pdf`
Header: *PHAR 4221 IV Infusions*

This set differs in format from the "Daily Practice" sheets: **each part prints the final answer on its own line first (as a boxed/indented answer), and then the working underneath.** Questions 2–4 are explicitly chained to question 1.

### M3-5.1 — Recommend a rate and a loading dose

**Stem, verbatim.**
> You are asked to recommend an IV infusion rate to achieve a steady-state concentration of 20 mg/L. You are also asked to recommend an IV loading dose to rapidly achieve the desired steady-state concentration. The half-life of the drug is 5 hours and the volume of distribution is 16 L. What are your recommendations?

**Format.** Free response with the answers pre-printed above the work. No patient vignette at all — pure parameter statement. V_D given directly in **L** (no weight, no per-kg).

**What is asked.** An infusion rate and a loading dose.

**Her printed answers, verbatim layout.**
> ` 44 mg/hr   320 mg`
> ` Infusion Rate  Loading Dose`

**Her worked solution.**
> `R = (20 mg/L)(0.693/5 hr)(16 L) = 44.35 mg/hr`
> `D_L = 44.35 mg/hr / (0.1386/hr) = 320 mg` **or** `D_L = (20 mg/L)(16 L) = 320 mg`

*Recompute:* k = 0.1386 hr⁻¹ ✓; R = 20 × 0.1386 × 16 = 44.352 mg/hr → **matches** (44.35, reported as 44). D_L = 44.35/0.1386 = 319.99 mg and 20 × 16 = 320 mg → **matches** (320 mg).

**Rounding.** R computed to 2 decimals (44.35) but **reported as a whole number (44 mg/hr)** in the answer line; D_L to a whole mg (320).

---

### M3-5.2 — With the loading dose, concentration at 3 hr

**Stem, verbatim.**
> If the drug in question #1 were administered at the rate you recommended WITH THE LOADING DOSE, what is the expected concentration of drug 3 hours after the start of the infusion?

(Her capitalised "WITH THE LOADING DOSE" is transcribed as printed — she uses capitals to contrast this with #3 and #4.)

**Format.** Free response, answer printed first. Chained to #1.

**What is asked.** Cp at 3 hours after the start of the infusion.

**Her printed answer.** ` 20 mg/L`

**Her worked solution.**
> `C_bolus = (320 mg / 16 L)e^−(0.1386 × 3) = 13.2 mg/L`
> `C_inf = [44.35 mg/hr / ((16 L)(0.1386/hr))](1 − e^−(0.1386 × 3)) = 6.8 mg/L`
> `C₃ = (13.2 + 6.8) mg/L = 20 mg/L → Css`

*Recompute:* 20 × e^−0.4158 = 13.196 mg/L ✓; 44.35/2.2176 = 20.0 × 0.34018 = 6.803 mg/L ✓; sum = 20.0 mg/L → **matches**. (Her arrow "→ Css" is the teaching point: a correct loading dose holds the level flat at Css.)

**Rounding.** Components to 1 decimal (13.2, 6.8); total to a whole number (20).

---

### M3-5.3 — Without the loading dose, concentration at end of infusion

**Stem, verbatim.**
> If the drug in question #1 were administered at the rate you recommended WITHOUT THE LOADING DOSE for 3 hours, what is the expected concentration of drug at the end of the infusion?

**Format.** Free response, answer printed first. Chained to #1.

**What is asked.** Cp at the end of the 3-hour infusion.

**Her printed answer.** ` 6.8 mg/L`

**Her worked solution.**
> `C_inf = [44.35 mg/hr / ((16 L)(0.1386/hr))](1 − e^−(0.1386 × 3)) = 6.8 mg/L`

*Recompute:* 6.803 mg/L → **matches** (6.8 mg/L).

**Rounding.** 1 decimal.

---

### M3-5.4 — Post-infusion decay

**Stem, verbatim.**
> If the drug in question #1 were administered at the rate you recommended WITHOUT THE LOADING DOSE for 3 hours, what is the expected concentration of drug 4 hours after cessation of the infusion?

**Format.** Free response, answer printed first. Chained to #1 and #3.

**What is asked.** Cp 4 hours after cessation of the infusion.

**Her printed answer.** ` 3.9 mg/L`

**Her worked solution.**
> `Cp = (6.8 mg/L)e^−(0.1386 × 4) = 3.9 mg/L`

*Recompute:* 6.8 × e^−0.5544 = 3.906 → **matches** (3.9 mg/L).

**Rounding.** 1 decimal.

---

### M3-5.5 — Loading dose plus infusion, five parts

**Stem, verbatim.**
> A patient received a medication as a 500 mg IV loading dose and a simultaneous IV infusion of 75 mg/hr for 3 days. The half-life of the medication was 4 hours and the volume of distribution was 12 L.

**Format.** Free response, five parts (a–e), each with the answer printed above its working. Duration given in **days** (3 days) though every rate is per hour. V_D in **L**. The 500 mg loading dose is deliberately *not* the appropriate one — part c makes the student find the right one.

**What is asked.**
- a. What is the expected steady-state concentration of the infusion?
- b. What is the steady-state concentration if a loading dose of 750 mg were administered simultaneously with the 75 mg/hr infusion?
- c. What is an appropriate loading dose to achieve the desired steady-state concentration?
- d. What is the time to reach 90% of the desired steady-state concentration if no loading dose were administered?
- e. What is the expected steady-state concentration if the drug were infused at a rate of 150 mg/hr?

**Her worked solution.**

a. Printed answer ` 36.1 mg/L`
 `Css = 75 mg/hr / [(12 L)(0.1733/hr)] = 36.08 mg/L`
 *Recompute:* k = 0.693/4 = 0.17325 ✓; 75/2.0796 = 36.06 mg/L → **matches** (36.08 / 36.1 mg/L; the 0.02 difference is her use of k = 0.1733 rounded).

b. Printed answer ` 36.1 mg/L`
 No working shown — the point is that the **loading dose does not change Css**.
 *Recompute:* correct; Css depends only on R and Cl → **matches**.

c. Printed answer ` 433 mg`
 `D_L = 75 mg/hr / (0.1733/hr) = 433 mg` **or** `D_L = (36.1 mg/L)(12 L) = 433 mg`
 *Recompute:* 75/0.1733 = 432.8 mg ✓; 36.1 × 12 = 433.2 mg → **matches** (433 mg).

d. Printed answer ` 13.3 hr`
 `0.9 = (1 − e^−0.1733t)`
 `t = −ln 0.1 / (0.1733/hr) = 13.29 hr`
 *Recompute:* 2.302585/0.1733 = 13.287 hr → **matches** (13.29 → 13.3 hr).

e. Printed answer ` 72.2 mg/L`
 `Css = 150 mg/hr / [(12 L)(0.1733/hr)] = 72.15 mg/L`
 *Recompute:* 150/2.0796 = 72.13 → **matches** (72.15 / 72.2 mg/L).

**Rounding.** Working carried to 2 decimals (36.08, 72.15, 13.29), answer line rounded to 1 decimal or a whole number (36.1, 72.2, 13.3, 433).

---

# How She Writes a Problem

Everything in this section is an observation drawn only from the files above.

## Recurring stem skeletons

**1. The "chemical decomposition data table" stem (Module 1).** Word for word:
> *"In an experiment to study the chemical decomposition, a drug solution was prepared and a sample was obtained at different time points. The drug concentrations in the samples and the results were as follows:"*

She reuses this **verbatim** for both a first-order and a zero-order version (M1-1.1 and M1-1.2), changing only the units and the numbers, and then asks the **same four questions in the same order**: rate constant → initial concentration → t½ → time to 90% decomposition. Recognising which order applies is the whole exercise.

**2. The "freshly prepared solution" stem (Module 1).** Word for word:
> *"A solution of a drug was freshly prepared at a concentration of X mg/mL. After N days at 25°C, the drug concentration in the solution was Y mg/mL."*

Appears twice (M1-3.2: 500 → 150 over 60 days; M1-HW1.3: 315 → 75 over 30 days), each time followed by the identical paired parts: *"a. Assuming first-order kinetics, when will the drug decline to one-half of the original concentration? b. Assuming zero-order kinetics, ..."* The 25°C is always stated and never used.

**3. The "half-life given, % decomposed asked" stem (Module 1).** Word for word:
> *"If the half-life for decomposition of a drug is N hours, how long will it take for M mg of the drug to decompose by P%? Assume first-order kinetics and constant temperature."*

Appears twice (8 hr / 750 mg / 87.5%, and 12 hr / 125 mg / 30%). Where P% is a clean power of ½ she expects half-life counting; otherwise the log equation. The mass is sometimes a red herring.

**4. The IV bolus "calculate the following (a–h)" stem (Module 2).** Her standard eight-part battery, in this fixed order:
> a. Elimination rate constant → b. Half-life of elimination → c. Initial plasma concentration → d. Concentration of drug in the plasma 15 minutes after the dose was given → e. Apparent volume of distribution → f. Total body clearance of this drug in this patient → g. The amount of drug in the body 3 hours after the drug was administered → h. Time required for 99.9% of the drug to be eliminated from the body

Identical in IV Bolus Practice 1 and 2, once fed by a six-row table and once by two plasma points in prose. "15 minutes" is always given in minutes and always converted silently to 0.25 hr; "99.9%" always resolves to 10 t½.

**5. The biexponential-equation stem (Module 2).** Word for word:
> *"(Concentration is given in mcg/mL and time in hours)"*

This parenthetical appears identically in IV Bolus Practice 4 problem 2 and Homework 2 problem 2, both times right after handing the student a `Cp = Ae^−αt + Be^−βt` equation. The questions that follow are always: elimination half-life (from β) → initial concentration (A + B) → concentration at 4 hours → volume of the central compartment (dose ÷ (A+B)).

**6. The infusion "what would you recommend" stem (Module 3).** She frames infusion problems as clinical recommendations, in the second person: *"You are asked to recommend...", "What rate ... would you infuse this drug...", "What loading dose would you suggest?", "What rate of infusion and loading dose would you recommend...?"* The answer is expected as a practical number, which is why she rounds 14.86 → 15 mg/hr and 454.5 → 455 mg with an explicit arrow.

**7. The chained "at the rate you determined above" stem (Module 3).** In IV Infusions Practice 3 and the In-Class set, later parts depend on numbers the student derived earlier. She flags this with *"at the rate you determined above"* or *"the drug in question #1"*, and she contrasts scenarios with capitals: **WITH THE LOADING DOSE** / **WITHOUT THE LOADING DOSE**.

**8. The "concentration at t hours after cessation" phrasing.** This is her signature post-infusion question, and she words it in three interchangeable ways:
- *"Plasma concentration 12 hours after the cessation of the infusion"* (Practice 1g)
- *"What is the concentration of drug in the plasma 12 hours after the cessation of the 6-hour infusion (no loading dose)?"* (Practice 2e)
- *"what would be the concentration of drug in the plasma 6 hours after the cessation of the infusion?"* (Practice 3f)
- *"what is the expected concentration of drug 4 hours after cessation of the infusion?"* (In-Class #4)

She always parenthesises whether a loading dose was given, and she always distinguishes decay **from Css** (if infused to steady state) from decay **from the end-of-infusion concentration** (if infused for a stated shorter time) — see Practice 3 parts f vs g, which differ only in that respect.

**9. The "what if the dose were doubled / renal function changed" conceptual part.** She closes several problems with parameter-perturbation questions that need reasoning, not arithmetic: *"If the dose were doubled, what is the expected change in the half-life of elimination?"* (answer: none), *"...in the clearance?"* (none), *"...in the initial plasma concentration?"* (×2); and *"If the patient suddenly develops partial renal failure, how long would it take for a new steady-state plasma level to be established?"* (4.32 t½, with the new t½). These are always free-response prose answers.

## How she states weight

- **Pounds** when she wants the conversion tested: "110 pounds", "162 lb", "165-lb male", "187-pound male patient". She always divides by 2.2 and never shows the step.
- **Kilograms** when the weight is incidental or already convenient: "70-kg patient", "62 kg", "65 kg", "adult female patient (62 kg)", "(35 years old, 65 kg)".
- Pounds and mg/kg dosing tend to appear together (187 lb + 15 mg/kg; 165 lb + 20 mg/kg), so the conversion gates the whole problem.
- Weight is sometimes stated and **never used** — the 70-kg patient in IV Bolus Practice 1 and 2, and the 65 kg in IV Infusions Practice 4.

## How she states volume of distribution

Four different framings, rotated deliberately:
- **Per kilogram:** "3 L/kg", "0.5 L/kg", "400 mL/kg"
- **As a percent of body weight:** "20% of body weight", "23.1% of body weight" (she then treats kg → L one-to-one)
- **Absolute:** "16 L", "12 L"
- **Derived:** not given at all, to be back-calculated from dose ÷ C₀ (IV Bolus Practice 1, 2) or from Cl/k (IV Infusions Practice 4c)

## Whether she states the model

Split roughly evenly, and it is worth noticing which:
- **Stated:** "one-compartment, first-order elimination" (IVB4), "one-compartment open model" (INF2), "linear, first-order, one compartment pharmacokinetics" (HW2), "assumes a first-order process" (INF3), "Assuming zero-order decomposition" (MR2-3), "Assuming first-order kinetics" (MR1-3, MR2-1, MR2-2, HW1-3).
- **Left to be inferred:** every problem where inferring the order *is* the question — the data-table problems (MR1-1, MR1-2, MR3-1, HW1-1, HW1-2) and the IV bolus tables (IVB1, IVB2).
- **Implied by the parameters:** two-compartment problems are never called two-compartment; she simply supplies A, B, α, β or a biexponential equation and asks for "the elimination half-life" (meaning t½β) and "the volume of distribution of the central compartment".

## Units she favours

- **Concentration:** mg/L is her default in the worked answers; she poses stems in **mcg/mL** roughly as often and treats the two as interchangeable mid-solution without comment (visible in IVB2c, IVB4-2b, INF2). µg/mL appears in Homework 1. mg/mL is reserved for the bulk-solution stability problems.
- **Time:** hours nearly everywhere; **minutes** for the M1-3.1 amount-vs-time table; **days** for the 25°C shelf-life problems and for "infused ... for 3 days".
- **Rate constants:** hr⁻¹ to **four decimal places** (0.0866, 0.9100, 0.2769, 0.1733, 0.1386, 0.1155, 0.2235, 0.0855). She almost always writes k as `0.693/t½` rather than ln2/t½.
- **Clearance:** L/hr. **Volume:** L (or mL for compounding volumes). **Infusion rate:** mg/hr, with a parallel mL/hr or mL/min part whenever the stem supplies a solution concentration.
- **Amount:** mg.

## What she most often makes the unknown

Ranked by how often it is the thing asked for across these files:
1. **Elimination rate constant k** and **half-life t½** — asked in essentially every problem, usually as parts a and b.
2. **Initial plasma concentration C₀** — by back-extrapolation from a late point (`C₀ = Cₜe^kt`), by dose ÷ V_D, or as A + B.
3. **Concentration at a stated time** — during infusion, at the end of infusion, or after cessation; and at 15 minutes / 3 hours / 4 hours / 8 hours / 12 hours post-bolus.
4. **Apparent volume of distribution V_D** and **total body clearance Cl_T = V_D·k**.
5. **Infusion rate R = Css·V_D·k** and **loading dose D_L = R/k = Css·V_D** — she always shows both routes to D_L when both are available.
6. **Time to a percentage** — 90%, 95% of Css, 99.9% eliminated, 87.5%, 75%, 80%, 30%. She very often accepts (and prefers) the half-life-counting route where the percentage is a power of ½, and prints it beside the logarithmic route.
7. **Amount of drug in the body at time t** — either V_D·Cₜ or D₀e^−kt, again shown both ways.
8. **Order of the reaction** — the only recurring multiple-choice item.

## Presentational habits

- She very frequently gives **two independent routes to the same answer**, joined by "or": half-life counting vs the exponential equation; D_L = R/k vs Css·V_D; V_D·Cₜ vs D₀e^−kt; 10 t½ vs ln(1000)/k. Expect the key to show both.
- She computes to more precision than she reports, then prints an arrow to the practical value: `14.86 mg/hr → 15 mg/hr`, `151.52 mg → 150 mg`, `454.5 mg → 455 mg`.
- The In-Class set prints the **answer above the working**; the Daily Practice sets print working only.
- Her stems carry occasional typos she does not correct ("after and intravenous bolus injection", "infuse this this drug", "milliters", "displays, linear, first-order"), and her part-lettering occasionally restarts mid-problem.

---

## Files that could not be fully used

- **`Homework2.pdf`** — readable, and both problems transcribed above in full, but the file contains **questions only**. No worked solutions, no answer key, no final answers are present anywhere in it. Nothing has been supplied in their place.
- **`IVBolusPractice1.pdf`** — the printed stem and part list extract cleanly, but the handwritten working scanned onto the page extracts as near-unusable characters. Everything legible is transcribed above with `[unclear: …]` markers; the reliable worked solution for that problem is the one in `IV-Bolus-Practice-1---Solutions.pdf`.

All other listed source files were read successfully and are fully transcribed above.
