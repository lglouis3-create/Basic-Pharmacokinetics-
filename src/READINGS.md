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

## Edition note

The syllabus chapter numbers follow the 7th edition. The chapters the student has
supplied from AccessPharmacy are the 8th edition except one, and the numbering differs:

| Syllabus (7e) | Topic | Supplied file | Edition and title |
|---|---|---|---|
| Chapter 7 | Drug elimination, clearance, renal clearance | `Shargel8e-Ch15-Elimination-and-Clearance.pdf` (47 pp) | 8e Chapter 15, Pharmacokinetic Calculations for Drug Elimination and Clearance |
| Chapter 8 | Oral absorption | `Shargel8e-Ch16-Drug-Absorption.pdf` (30 pp) | 8e Chapter 16, Pharmacokinetics of Drug Absorption |
| Chapter 9 | Multiple dosing | `Shargel7e-Ch09-Multiple-Dosage-Regimens.pdf` (33 pp) | 7e Chapter 9, Multiple-Dosage Regimens (the file's own header says 7e) |
| Chapter 21 | PK-PD | `Shargel8e-Ch22-PK-PD-Relationship.pdf` (50 pp) | 8e Chapter 22 (its text still cross-references equations as 21.x) |

The 7e-to-8e match for Chapters 15 and 16 is by title and topic against the syllabus
line; the Chapter 22 match is confirmed by the chapter's own cross-references. The
bioavailability chapter (syllabus Chapter 16) has not been supplied.

### Chapter 15 (8e) objectives, as printed
Clinical role of clearance; clearance by noncompartmental, compartmental and
"physiological" approaches; clearance against half-life and volume; total, hepatic and
renal clearance; renal excretion processes and which predominates for a drug given its
renal clearance; the renal clearance model (blood flow, filtration, reabsorption); whether
a change in hepatic or renal clearance matters; the well-stirred hepatic model; drug
interactions on protein binding and intrinsic clearance for low- and high-extraction
drugs. Sections: drug elimination; clinical importance of clearance; principles of
clearance calculations; clearance models; compartmental approach; rate constants,
volumes and clearances; noncompartmental approach; organ clearance; clearance from the
fractions eliminated by kidney and liver; summary; learning questions.

### Chapter 16 (8e) objectives, as printed
Oral absorption and its relevance; zero- and first-order absorption; parameters of an
oral one-compartment drug; k_a for a two-compartment drug; current against historical
absorption methods; flip-flop kinetics for extended-release products; clinical
implication of absorption half-life; how k_a and k_el influence C_max, t_max and AUC;
safety implications. Sections: absorption against elimination after an oral dose;
zero-order and first-order absorption; clinical application; practice problem; methods
for the absorption parameters; summary; learning questions; appendices A and B.

### Chapter 9 (7e) objectives, as printed
Index of drug accumulation; accumulation and accumulation half-life; superposition and
its assumptions; steady-state C_max and C_min after multiple IV bolus doses; k and V_D of
aminoglycosides in multiple dosing; adjusting steady-state C_max and C_min when the last
dose is early, late or missed. Sections: drug accumulation; repetitive IV injections;
intermittent IV infusion; multiple-oral-dose regimen; loading dose; dosage regimen
schedules; practice problems; summary; learning questions.

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
