# Textbook readings

The required text is Shargel and Yu's Applied Biopharmaceutics & Pharmacokinetics, 8th edition
(syllabus, "Texts/Materials"). The bank is written from her decks and transcripts; a chapter is the
third tier when sources conflict (prescribing information, then her slides and lecture, then the text).
Chapter PDFs the student supplies go in `src/decks/readings/` (gitignored, like the decks).

## Chapter map from the syllabus (SyllabusF26---PHAR-4221---Basic-Pharmacokinetics.pdf, "Class meeting schedule/outline")

| Date | Topic | Reading |
|---|---|---|
| Mon 17 Aug | Introduction to Biopharmaceutics & Pharmacokinetics | Chapter 1 |
| Wed 19 Aug | Mathematical Fundamentals in Pharmacokinetics | Chapter 2 |
| Mon 24 Aug | One-Compartment Open Model: Intravenous Bolus Administration | Chapter 4 |
| Wed 26 Aug | Multicompartment Models: Intravenous Bolus Administration (Quiz 1) | Chapter 5 |
| Wed 2 Sep | Intravenous Infusion | Chapter 6 |
| Mon 14 Sep | Drug Elimination, Clearance, and Renal Clearance | Chapter 7 |
| Wed 16 Sep | Pharmacokinetics of Oral Absorption | Chapter 8 |
| Mon 21 Sep / Wed 23 Sep | Repetitive IV Injections; Intermittent IV Infusion (Quiz 3) | Chapter 9 |
| Mon 28 Sep | Multiple Oral Dosage Regimens | none listed |
| Wed 30 Sep | Bioavailability & Bioequivalence | Chapter 16 |
| Mon 12 Oct | PK-PD Relationship | Chapter 21 (see note) |
| Wed 14 Oct / Mon 19 Oct | Nonlinear Pharmacokinetics (Quiz 5 on 19 Oct) | Chapter 10 |

The syllabus column reads "Chapter 9" on the line between 21 and 23 September and "Chapter 10" on
the 19 October line; the table above assigns each to the topic it sits beside.

## Chapter 22 (8e): Relationship between Pharmacokinetics and Pharmacodynamics

File: `src/decks/readings/Shargel8e-Ch22-PK-PD-Relationship.pdf` (50 pages, AccessPharmacy export,
supplied 4 Oct 2026). Reading for the 12 October PK-PD lecture, the first lecture after Exam 2, so it
feeds the final (27 Oct), not Exam 2.

Numbering conflict: the syllabus lists "Chapter 21" for PK-PD; the 8e chapter is 22, and its own
text still cross-references "Equation 21.4", "21.8", "21.23" where it means 22.4, 22.8, 22.23, so the
syllabus number is the previous edition's. Treat them as the same chapter.

Section map (chapter pages): objectives p1; PK and PD, receptor theory p1-5; dose to response,
E = m log C + e, effect declines linearly with slope km/2.3 (Eq 22.1-22.4) p6-8; duration of
activity t_eff after an IV bolus (Eq 22.5-22.8, practice problem, Table 22-2) p9-11; substance
abuse, tolerance, hypersensitivity p12-14; biomarkers and surrogate endpoints p14-16; types of PD
response and PK-PD model components (k_e0, k_in, k_out) p16-18; MIC indices Cmax/MIC, AUC/MIC
(AUIC), %T>MIC, Table 22-4 p18-21; E_max model from receptor occupancy (Eq 22.12-22.22), sigmoid
E_max with Hill coefficient gamma (Eq 22.23), linear and log-linear models, additive and
proportional baseline p21-26; direct effect model p27-30; indirect response models (Eq 22.36-22.43)
p30-35; systems PD models, nesiritide and micafungin cases p36-39; summary p39-40; learning
questions p40-43; answers p44-46.

Equations read off the rendered pages (9, 10, 21, 22):
- Eq 22.5: t = 2.3(log C0 - log C)/k. Eq 22.6: t_eff = 2.3[log(D0/VD) - log C_eff]/k.
- Eq 22.7-22.8: from ln C_eff = ln C0 - k t_eff and C0 = D0/VD; with k = 0.693/t_half, t_eff rises
  in direct proportion to t_half but not in proportion to dose.
- Eq 22.22: E = E_max C/(EC50 + C), with K_D = EC50. Eq 22.23: E = E_max C^gamma/(EC50^gamma + C^gamma).
- Eq 22.24: E = S C (valid when C << EC50). Eq 22.25: E = S log C + E0 (linear between 20% and 80% of E_max).

Practice problem (p10), recomputed: MEC 0.1 mcg/mL, VD 10 L, k 1.0 h^-1. 100 mg: C0 = 100 mg/10 L =
10 mcg/mL; t_eff = ln(10/0.1)/1.0 = 4.605 h (text 4.61 h). 1000 mg: C0 = 100 mcg/mL; t_eff =
ln(100/0.1)/1.0 = 6.908 h (text 6.91 h). Increase = (6.908 - 4.605)/4.605 = 50.0% (text 50%).
Table 22-2 datum: t_half 0.75 h at 2 mg/kg gives t_eff 3.24 h; t_half 1.5 h gives 6.48 h
(3.24 x 2 = 6.48, a 100% increase, as the text states).

Learning-question answers the chapter keys (p45-46), for distractor writing once she lectures:
Q1 a True, b True, c True, d False (slope reduced in uremia means renal elimination), e True;
Q2 a effect, b response, c response, d effect, e response; Q3 partial agonist buspirone, inverse
agonist famotidine; Q7 CNS drugs lag between plasma and effect compartment; Q8 allergic response
does not follow dose-response; Q17 X: E_max about 5 units, EC50 about 25 mcg/mL, Y about 100,
Z about 250 mcg/mL; Q19 peak effect at the same time as peak concentration (about 2.5 h) means a
direct effect model; Q20 hysteresis when effect lags concentration; counterclockwise for delayed
effect, clockwise for tolerance (FAQ answer, p45).

Nothing from this chapter is in the bank yet. Her deck and transcript for 12 October decide the
module number and what is tested; the chapter supplies definitions and the keyed answers above.
