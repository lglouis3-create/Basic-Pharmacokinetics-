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

    /* Not yet lectured. Listed so the Exam 2 blueprint can name what it cannot
       yet cover; they carry no questions until the lecture happens.
       Chapter map from the syllabus; deck filenames unknown until posted. */
    {id: 'L08', deck: '', label: 'Module 7: Intermittent IV infusion (28 Sep)',
     prof: 'Mosley', exam: 2, module: 7},
    {id: 'L09', deck: '', label: 'Module 8: Multiple oral dosage regimens (28 Sep)',
     prof: 'Mosley', exam: 2, module: 8},
    {id: 'L10', deck: '', label: 'Module 9: Bioavailability and bioequivalence (30 Sep)',
     prof: 'Mosley', exam: 2, module: 9},
  ],

  exams: [
    {id: 1,
     name: 'Exam 1',
     date: '2026-09-11',
     questions: 40,          // stated by Louis: 40 questions, 20 conceptual + 20 math
     minutes: 120,           // syllabus: Friday 11 September, 10:00–12:00
     sata: 4,                // ASSUMED. Select-all questions appear; the count is not published.
     blurb: 'Fri 11 September. Modules 1–3: kinetic orders and the maths, ' +
            'one- and multi-compartment IV bolus, IV infusion. Half the paper ' +
            'is calculation. The mark split across the three modules is not ' +
            'published — this drill weights it by lecture time (2 : 2 : 1).',
     pools: [
       {key: 'm1', name: 'Module 1 — Intro, kinetic orders, AUC', marks: 16, filter: {module: 1}},
       {key: 'm2', name: 'Module 2 — IV bolus, one and multi-compartment', marks: 16, filter: {module: 2}},
       {key: 'm3', name: 'Module 3 — IV infusion', marks: 8, filter: {module: 3}},
     ]},

    {id: 2,
     name: 'Exam 2',
     date: '2026-10-08',
     questions: 40,
     minutes: 120,           // syllabus: Thursday 8 October, 7:50–9:50
     sata: 4,                // ASSUMED, as above.
     blurb: 'Thu 8 October, 7:50–9:50. Modules 4–9 per the syllabus. ' +
            'Modules 4 and 5 and the first part of 6 are lectured; the rest are not yet, so the paper ' +
            'draws only what exists and says how much of the blueprint it ' +
            'cannot cover. The per-module mark split is not published — this ' +
            'drill spreads it evenly across the six modules.',
     pools: [
       {key: 'm4', name: 'Module 4 — Elimination, clearance, renal clearance', marks: 7, filter: {module: 4}},
       {key: 'm5', name: 'Module 5 — Oral absorption, single dose',            marks: 7, filter: {module: 5}},
       {key: 'm6', name: 'Module 6 — Repetitive IV injections',                marks: 7, filter: {module: 6}},
       {key: 'm7', name: 'Module 7 — Intermittent IV infusion',                marks: 6, filter: {module: 7}},
       {key: 'm8', name: 'Module 8 — Multiple oral dosage regimens',           marks: 7, filter: {module: 8}},
       {key: 'm9', name: 'Module 9 — Bioavailability and bioequivalence',      marks: 6, filter: {module: 9}},
     ]},

    {id: 3,
     name: 'Final Exam',
     date: '2026-10-27',
     questions: 40,          // ASSUMED same shape as exams 1 and 2; not published.
     minutes: 120,           // syllabus: Tuesday 27 October, 7:50–9:50
     sata: 4,                // ASSUMED.
     blurb: 'Tue 27 October, 7:50–9:50, worth 33%. Cumulative, plus PK–PD and ' +
            'nonlinear pharmacokinetics. Question count and mark split are ' +
            'not published; this drill assumes the same 40-question shape and ' +
            'weights the earlier material at half the paper.',
     pools: [
       {key: 'f-e1',  name: 'Exam 1 material (Modules 1–3)',  marks: 10, filter: {exam: 1}},
       {key: 'f-e2',  name: 'Exam 2 material (Modules 4–9)',  marks: 10, filter: {exam: 2}},
       {key: 'f-pkpd', name: 'PK–PD relationship',            marks: 8,  filter: {module: 10}},
       {key: 'f-nl',  name: 'Nonlinear pharmacokinetics',     marks: 12, filter: {module: 11}},
     ]},
  ],

  activeExam: 2,

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
  ],

  paceDefault: 'weekly',
};
