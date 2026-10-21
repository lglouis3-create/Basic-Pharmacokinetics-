/* ==========================================================================
   COURSE MANIFEST — PHAR 4221 Basic Pharmacokinetics, Fall 2026
   ==========================================================================
   Every course-specific name, count, pool and label in the engine comes from
   this one object. build.py concatenates this file FIRST, so COURSE is in
   scope for the shell, the views and every question bank. The checks read the
   output filename straight out of this file.

   SOURCED FROM: SyllabusF26---PHAR-4221---Basic-Pharmacokinetics.pdf
   (instructor, exam dates, exam times, chapter map, class meeting schedule)
   and the module folder names the course uses in Drive.

   NOT SOURCED — marked ASSUMED wherever it appears below. Dr. Mosley has not
   published how the 40 marks divide across modules, nor how many select-all
   questions a paper carries. The splits here are proportional to lecture time,
   which is a build decision, not a statement about her paper. Correct them the
   moment she says otherwise; nothing else in the app has to change.
   ========================================================================== */
const COURSE = {
  id: 'PHAR4221',
  title: 'Basic Pharmacokinetics',
  short: 'PHAR 4221',

  /* Stable for the whole course: changing it orphans saved progress. */
  ns: 'phar4221',

  output: 'PHAR4221_Drill.html',

  professors: ['Mosley'],

  /* The Topics view lists the course the way the Canvas course page does
     (module names as Canvas prints them). A module entry gathers the topics
     whose questions carry its number; an exam entry drills that exam's
     material and opens its practice paper; a view entry opens another tab. */
  topicsMenu: [
    {module: 1, name: 'Module 1 - Introduction & Math Review'},
    {module: 2, name: 'Module 2 - IV Bolus Administration'},
    {module: 3, name: 'Module 3 - Intravenous Infusions'},
    {exam: 1,   name: 'Exam 1 Recap'},
    {module: 4, name: 'Module 4 - Drug Elimination and Clearance'},
    {module: 5, name: 'Module 5 - Single Oral Administration'},
    {module: 6, name: 'Module 6 - Multiple Dosings'},
    {module: 7, name: 'Module 7a - Bioavailability and Bioequivalence'},
    {module: 9, name: 'Module 7b - PK-PD Relationship'},
    {module: 8, name: 'Module 8 - Nonlinear Pharmacokinetics'},
    {view: 'eq',  name: 'Equations'},
  ],

  /* One entry per lecture. `deck` is the PDF as a citation spells it. */
  lectures: [
    {id: 'L01', deck: 'Introduction.pdf',
     label: 'Module 1: Introduction, kinetic orders and AUC (17 & 19 Aug)',
     prof: 'Mosley', exam: 1, module: 1},

    {id: 'L02', deck: '2IVBolusAdministration.pdf',
     label: 'Module 2: One-compartment IV bolus (24 Aug)',
     prof: 'Mosley', exam: 1, module: 2},

    {id: 'L03', deck: '2IVBolusAdministration.pdf',
     label: 'Module 2: Multicompartment IV bolus (26 Aug)',
     prof: 'Mosley', exam: 1, module: 2},

    {id: 'L04', deck: '3IntravenousInfusions.pdf',
     label: 'Module 3: Intravenous infusion (2 Sep)',
     prof: 'Mosley', exam: 1, module: 3},

    {id: 'L05', deck: '4---Clearance-and-Elimination.pdf',
     label: 'Module 4: Drug elimination, clearance and renal clearance (14 Sep)',
     prof: 'Mosley', exam: 2, module: 4},

    {id: 'L06', deck: '5---Pharmacokinetics-of-Oral-Absorption.pdf',
     label: 'Module 5: Pharmacokinetics of oral absorption (16 & 21 Sep)',
     prof: 'Mosley', exam: 2, module: 5},

    /* Part 1 of the Module 6 deck: repeated IV bolus injections. The same
       deck continues into intermittent IV infusions, which is Part 2. */
    {id: 'L07', deck: '6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf',
     label: 'Module 6: Repetitive IV bolus injections (23 Sep)',
     prof: 'Mosley', exam: 2, module: 6},

    /* The 28 September lecture finished the Module 6 deck (intermittent IV
       infusions) and went straight into the multiple-oral deck, which she
       files as 6a. Both sit under the one Canvas module. */
    {id: 'L08', deck: '6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf',
     label: 'Module 6: Intermittent IV infusions (28 Sep)',
     prof: 'Mosley', exam: 2, module: 6},
    {id: 'L09', deck: '6a---Multiple-Oral-Doses.pdf',
     label: 'Module 6a: Multiple oral doses (28 Sep)',
     prof: 'Mosley', exam: 2, module: 6},

    /* Her deck numbers this lecture 7a; the syllabus chapter map had called it
       module 9 before the deck was posted. */
    {id: 'L10', deck: '7a---Bioavailability-and-Bioequivalence.pdf',
     label: 'Module 7a: Bioavailability and bioequivalence (30 Sep)',
     prof: 'Mosley', exam: 2, module: 7},
    /* After Exam 2. Her Canvas files PK-PD as 7b, inside the Module 7 folder;
       the drill numbers it 9 so its quiz and exam scope stay apart from 7a,
       and the Topics menu shows it as 7b. Nonlinear is her Module 8. */
    {id: 'L11', deck: '7b---Pharmacokinetics-and-Pharmacodynamics.pdf',
     label: 'Module 7b: PK-PD relationship (12 Oct)',
     prof: 'Mosley', exam: 3, module: 9},
    {id: 'L12', deck: '8 - Nonlinear PK.pdf',
     label: 'Module 8: Nonlinear pharmacokinetics (14 Oct)',
     prof: 'Mosley', exam: 3, module: 8},
  ],

  exams: [
    {id: 1,
     name: 'Exam 1',
     date: '2026-09-11',
     when: '2026-09-11T10:00',   // syllabus: Friday 11 September, 10:00–12:00
     questions: 40,          // stated by Louis: 40 questions, 20 conceptual + 20 math
     minutes: 120,           // syllabus: Friday 11 September, 10:00–12:00
     sata: 4,                // ASSUMED. Select-all questions appear; the count is not published.
     blurb: 'Fri 11 September. Modules 1–3: kinetic orders and the maths, ' +
            'one- and multi-compartment IV bolus, IV infusion. Half the paper ' +
            'is calculation. The mark split across the three modules is not ' +
            'published — this drill weights it by lecture time (2 : 2 : 1).',
     facts: [
       ['When', 'Fri 11 September, 10:00–12:00'],
       ['Covers', 'Modules 1–3: kinetic orders and the maths; one- and multi-compartment IV bolus; IV infusion'],
       ['Shape', 'Half the paper is calculation'],
       ['Mark split', 'Not published; this drill weights the three modules by lecture time, 2 : 2 : 1'],
     ],
     pools: [
       {key: 'm1', name: 'Module 1 — Intro, kinetic orders, AUC', marks: 16, filter: {module: 1}},
       {key: 'm2', name: 'Module 2 — IV bolus, one and multi-compartment', marks: 16, filter: {module: 2}},
       {key: 'm3', name: 'Module 3 — IV infusion', marks: 8, filter: {module: 3}},
     ]},

    {id: 2,
     name: 'Exam 2',
     date: '2026-10-08',
     when: '2026-10-08T07:50',   // syllabus: Thursday 8 October, 7:50–9:50
     questions: 40,
     minutes: 120,           // syllabus: Thursday 8 October, 7:50–9:50
     sata: 4,                // ASSUMED, as above.
     blurb: 'Thu 8 October, 7:50–9:50. Modules 4–7a are lectured: elimination and ' +
            'clearance, single oral dosing, multiple dosing (repeated IV bolus, ' +
            'intermittent IV infusions, multiple oral doses), and bioavailability and ' +
            'bioequivalence. She said on 30 September that this exam is cumulative in ' +
            'the sense that multiple-dose problems need the single-dose skills. The ' +
            'per-module mark split is not published; this drill weights it by lecture time.',
     facts: [
       ['When', 'Thu 8 October, 7:50–9:50'],
       ['Covers', 'Modules 4–7a: elimination and clearance; single oral dosing; multiple dosing (repeated IV bolus, intermittent IV infusions, multiple oral doses); bioavailability and bioequivalence'],
       ['Cumulative', 'In the sense she gave on 30 September: a multiple-dose problem needs the single-dose skills'],
       ['Mark split', 'Not published; this drill weights the modules by lecture time'],
     ],
     pools: [
       {key: 'm4', name: 'Module 4 — Elimination, clearance, renal clearance', marks: 7,  filter: {module: 4}},
       {key: 'm5', name: 'Module 5 — Oral absorption, single dose',            marks: 7,  filter: {module: 5}},
       {key: 'm6', name: 'Module 6 — Multiple dosing: IV bolus, intermittent infusion, oral', marks: 20, filter: {module: 6}},
       {key: 'm7', name: 'Module 7a — Bioavailability and bioequivalence',     marks: 6,  filter: {module: 7}},
     ]},

    {id: 3,
     name: 'Final Exam',
     date: '2026-10-27',
     when: '2026-10-27T07:50',   // transcript 10-19: "right now, we are still scheduled for 7:50" unless she announces otherwise
     questions: 40,          // transcript 10-14: "same format, 40 questions"
     minutes: 120,           // syllabus and transcript 10-14: "the full 2 hours"
     sata: 4,                // ASSUMED, as for Exams 1 and 2.
     blurb: 'Tue 27 October, 7:50, unless she announces a change in person or on Canvas. ' +
            'Cumulative: 40 questions, 20 multiple choice and 20 fill in the blank, with 25% on ' +
            'the two lectures after Exam 2, PK-PD (12 Oct) and nonlinear pharmacokinetics (14 Oct). ' +
            'Know total clearance, ideal body weight and Cockcroft-Gault without the equation sheet. ' +
            'Wed 21 October, 8:30 to 9:30: an optional question session. How the other 30 questions ' +
            'divide between Exam 1 and Exam 2 material is not published; this drill splits them evenly.',
     facts: [
       ['When', 'Tue 27 October, 7:50 for the full 2 hours. It stays 7:50 unless she announces a change in person or on Canvas'],
       ['Before it', 'Wed 21 October, 8:30 to 9:30: an optional session with no slides; she answers questions and asks some'],
       ['Not on the sheet', 'Total clearance, ideal body weight and Cockcroft-Gault: "we\'re only gonna use the ideal body weight"'],
       ['What she expects', 'Zero and first order; k, t½, VD and Cp; total, renal and hepatic clearance; steady-state peaks, troughs, averages and tmax; Cp against time for each route; bioavailability; linear and nonlinear; AUC; duration of action and the times to steady state, to the peak and to elimination; Cp after IV bolus, IV infusion and extravascular doses'],
       ['Weight', '33% of the course grade'],
       ['Shape', '40 questions: 20 multiple choice and 20 fill in the blank, the same format as Exams 1 and 2'],
       ['New material', '25%, about 10 questions, on PK-PD (12 Oct) and nonlinear pharmacokinetics (14 Oct): "25% new stuff, but the new isn\'t even really new"'],
       ['The rest', 'Cumulative: Modules 1 to 7a. The split between Exam 1 and Exam 2 material is not published; this drill uses 15 and 15'],
     ],
     pools: [
       {key: 'f-e1',  name: 'Exam 1 material (Modules 1–3)',   marks: 15, filter: {exam: 1}},
       {key: 'f-e2',  name: 'Exam 2 material (Modules 4–7a)',  marks: 15, filter: {exam: 2}},
       {key: 'f-pkpd', name: 'Module 7b — PK-PD relationship', marks: 5,  filter: {module: 9}},
       {key: 'f-nl',  name: 'Module 8 — Nonlinear pharmacokinetics', marks: 5, filter: {module: 8}},
     ]},
  ],

  activeExam: 3,

  /* What a question asks you to DO. `kind` is 'concept' where the skill is a
     way of understanding and 'calc' where it is a way of computing; the drill
     reads it to offer concepts and calculations as separate drills, since
     which of the two a student needs to review is rarely the same on a given
     evening. The kind is not the whole story on its own: a question is a
     calculation when answering it means producing a number, so a numeric
     question is one whatever its skill, and a matching question is one only
     where a calculation skill is matched to computed values. Weak spots
     reports accuracy per skill, so a student who can state every definition
     but keeps losing marks on unit conversion sees exactly that. */
  skills: [
    {id: 'recall',    label: 'Recall a definition or fact',            short: 'Recall',    kind: 'concept'},
    {id: 'tell',      label: 'Tell two similar things apart',          short: 'Tell apart', kind: 'concept'},
    {id: 'read',      label: 'Read a graph, table or equation',        short: 'Read',      kind: 'concept'},
    {id: 'apply',     label: 'Reason about a patient or a change',     short: 'Apply',     kind: 'concept'},

    {id: 'order',     label: 'Decide the order from a data set',       short: 'Order',     kind: 'calc'},
    {id: 'krate',     label: 'Rate constant and half-life',            short: 'k and t½',  kind: 'calc'},
    {id: 'conctime',  label: 'Concentration or amount at a time',      short: 'C at t',    kind: 'calc'},
    {id: 'vddose',    label: 'Volume of distribution and dose',        short: 'Vd, dose',  kind: 'calc'},
    {id: 'auc',       label: 'AUC and the trapezoidal rule',           short: 'AUC',       kind: 'calc'},
    {id: 'multicpt',  label: 'Two-compartment parameters',             short: '2-cpt',     kind: 'calc'},
    {id: 'infusion',  label: 'Infusion rate and steady state',         short: 'Infusion',  kind: 'calc'},
    {id: 'loading',   label: 'Loading dose',                           short: 'Loading',   kind: 'calc'},
    {id: 'clearance', label: 'Clearance — total, renal and hepatic',   short: 'Clearance', kind: 'calc'},
    {id: 'crcl',      label: 'Creatinine clearance and ideal weight',  short: 'CrCl',      kind: 'calc'},
    {id: 'oral',      label: 'Oral absorption — Cmax, tmax, ka',       short: 'Oral',      kind: 'calc'},
    {id: 'multidose', label: 'Repeated dosing — peak, trough, average', short: 'Multi-dose', kind: 'calc'},
    {id: 'bioavail', label: 'Bioavailability — absolute, relative, equivalent dose', short: 'Bioavail', kind: 'calc'},
    {id: 'pkpd',     label: 'PK-PD — effect, Emax, EC50 and exposure targets', short: 'PK-PD', kind: 'calc'},
    {id: 'nonlin',   label: 'Nonlinear — Vmax, KM, dose rate and steady state', short: 'Nonlinear', kind: 'calc'},
    {id: 'term', label: 'Terms and definitions', short: 'Terms', kind: 'concept'},
  ],

  /* Quizzes she has announced. A card for each sits at the top of Topics until
     the quiz is over (`when` plus `minutes`), or until the student hides it.
     `modules` are the ones she said it covers; `said` is what she told the
     class to prepare, each line from the transcript named in `src`. */
  quizzes: [
    {id: 'q5', name: 'Quiz 5',
     // Mon 19 Oct, her last quiz, then an in-class review (transcript 10-14). Before it she
     // took questions on linear against nonlinear, KM, dose rates in mg/day, low dose first
     // order and high dose zero order, and doubling a PK-PD dose (transcript 10-19), so the
     // card's scope, the material since Exam 2, stands. The card hides itself after the quiz.
     // Class starts at 8:00 (transcript 09-23); Quiz 3 ran 24 minutes, Quiz 5's length is not stated.
     when: '2026-10-19T08:00', minutes: 24,
     modules: [9, 8],
     covers: 'Her last quiz, then an in-class review. Scope not stated; this card assumes the two lectures since Exam 2: PK-PD (12 Oct) and nonlinear pharmacokinetics (14 Oct).',
     quote: 'Next session, we have our last quiz, quiz number 5, and then we will do kind of an in-class review.',
     said: [
       'Nonlinear: with C<sub>p</sub> well below K<sub>M</sub> the drug behaves first order; well above K<sub>M</sub> it behaves zero order. Her poll put it the other way round and the answer was false.',
       'V<sub>max</sub> and K<sub>M</sub> are constants for a given drug and patient; V<sub>max</sub> is a rate (amount per time), K<sub>M</sub> a concentration.',
       'From two dose rates and their steady-state levels, find K<sub>M</sub>, then V<sub>max</sub>, then a dose rate for a target C<sub>ss</sub>: "brush up on your algebra skills because we\'re gonna take this equation and rearrange it and solve for every piece of this."',
       'Give a dose rate as amount per time, for the patient: 6.62 mg/kg/day for 65 kg is 430 mg/day; "I don\'t wanna just see 1000 mg."',
       'Half-life and clearance change with concentration: t<sub>½</sub> = V<sub>D</sub>({{frac:0.693|V<sub>max</sub>}})(K<sub>M</sub> + C<sub>p</sub>) and Cl = {{frac:V<sub>max</sub>|K<sub>M</sub> + C<sub>p</sub>}}, so clearance falls as concentration rises.',
       'A nonlinear steady state takes 2 to 3 weeks to reach, not 3 to 5 half-lives.',
       'Rounding: "Don\'t panic if I ask you to round to the nearest 10": 518.4 mg/day to the nearest 10 is 520.',
       'The final: 40 questions, 20 multiple choice and 20 fill in the blank, 25% on PK-PD and nonlinear.',
     ],
     src: 'transcript 10-14 (quiz, review, final format, nonlinear content and her worked examples); transcript 09-23 (8 am start, 24-minute Quiz 3)'},
    {id: 'q4', name: 'Quiz 4',
     // Sat 5 Oct 2026 (graded set in STYLE.md, bank ids cq4-1 to cq4-10: ten items at 10 points,
     // five concept and five numeric, ±5% margins, ±3% on F). The card hides once the quiz is past.
     // "the quiz bright and early Monday morning" (transcript 09-30); class
     // starts at 8:00 am (transcript 09-23). Quiz 3 ran 24 minutes (09-23);
     // she has not said how long Quiz 4 runs, so its card says so.
     when: '2026-10-05T08:00', minutes: 24,
     modules: [6, 7],
     covers: 'The 30 September lecture (bioavailability and bioequivalence) and multiple dosing: ' +
             'repeated IV bolus, intermittent IV infusions and multiple oral doses.',
     quote: 'this quiz will really only be today\'s stuff and the multiple oral dosing or multiple dosing, right? ' +
            'Cause we did multiple IV, multiple infusion, and multiple oral.',
     said: [
       'Definitions, and the why: why multiple doses are given, why intermittent infusions are used, why F matters.',
       'A few calculations, each meant to take 2 minutes or less: read the question for 30 seconds, decide the approach, then reach for the sheet.',
       'Absolute bioavailability more than relative: "We\'re gonna kind of focus more on the absolute bioavailability."',
       'F = {{frac:AUC<sub>po</sub>|AUC<sub>IV</sub>}} × {{frac:D<sub>IV</sub>|D<sub>po</sub>}}: the IV AUC goes in the denominator. When the AUCs are to match, F = {{frac:D<sub>IV</sub>|D<sub>po</sub>}}, so the oral dose is {{frac:D<sub>IV</sub>|F}}, rounded to a strength that exists.',
       'Write F as 0.55 or 55%, never .55: "there should be no leading decimals".',
       'Multiple IV bolus: the peak at steady state is C<sub>0</sub> times the accumulation factor {{frac:1|1 − e<sup>−kτ</sup>}}; the trough is that peak times e<sup>−kτ</sup>. After the last dose, use the time since that dose in place of τ.',
       'Intermittent infusions: the concentration from each infusion adds to what is left of the earlier ones.',
       'Oral multiple dosing: t<sub>max</sub> at steady state depends on k, k<sub>a</sub> and τ. Know what changing the dose or the interval does to the steady-state level and to the peak-to-trough swing.',
       'Exam 2 is Thursday 8 October. It is cumulative in the sense that a multiple-dose problem needs the single-dose skills; the exams weigh 27%, 27% and 33%.',
       'Her Quizzes 2 and 3 were each 8 questions at 12.5 points: 4 word-only concept items and 4 numeric entries, each with a rounding rule ("Round to the nearest tenth") and a margin of error of 2% or 3%. On the Canvas quizzes the units are not typed.',
       'On the exam, every calculated answer carries its units, and each question states how many decimal places it wants, in varying wording. Where the result is a dose, she wants a figure a patient can take: "we might round it to 200 if there\'s a 175 or something that makes sense as opposed to 181. blah blah blah".',
     ],
     src: 'transcript 09-30 (quiz scope, emphasis, rules, rounding a dose); transcript 09-23 (8 am start, 24-minute Quiz 3); her graded Canvas Quiz 2 and Quiz 3 (format); units and decimal places on the exam as reported from class, 4 Oct'},
  ],

  paceDefault: 'weekly',
};
