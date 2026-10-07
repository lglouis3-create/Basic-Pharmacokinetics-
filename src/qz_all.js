/* ==========================================================================
   BANK ASSEMBLY
   ==========================================================================
   Each module's questions live in their own file and declare their own array,
   so two people can write two modules without touching the same file. This is
   the last data file build.py concatenates, and it joins them into the single
   QUESTIONS array the engine reads.

   Adding a module means three edits and no more: write q<N>_module<N>.js
   declaring Q_MODULE<N>, add the filename to DATA_FILES in build.py before
   this file, and add the array to the concat below.

   Order matters only for readability: the scheduler and the exam draw both
   shuffle, and every question carries its own exam, module and lecture, so
   nothing downstream depends on the order they arrive in.
   ========================================================================== */
const QUESTIONS = [].concat(
  Q_MODULE1,   // Module 1 — Introduction, kinetic orders, AUC          (Exam 1)
  Q_MODULE2,   // Module 2 — IV bolus, one- and multi-compartment       (Exam 1)
  Q_MODULE3,   // Module 3 — Intravenous infusion                       (Exam 1)
  Q_MODULE4,   // Module 4 — Elimination, clearance, renal clearance    (Exam 2)
  Q_MODULE5,   // Module 5 — Oral absorption, single dose               (Exam 2)
  Q_MODULE6,   // Module 6 — Multiple dosing, repeated IV bolus          (Exam 2)
  Q_MODULE6B,  // Module 6 — Intermittent IV infusions, multiple oral    (Exam 2)
  Q_MODULE7,   // Module 7a — Bioavailability and bioequivalence       (Exam 2)
  Q_QUIZZES,   // Her graded Canvas quizzes 2 and 3, word for word    (Exams 1, 2)
  Q_FIGURES,   // Figure reading, every module, drawn by figures.py    (Exams 1, 2)
  Q_WORKSHEETS,// Her daily practice sheets, Modules 4 and 5             (Exam 2)
  Q_HOMEWORK,  // Her homework wording, numbers changed, Modules 1–6     (Exams 1, 2)
  Q_REVIEW     // Her Exam 2 in-class review, word for word            (Exam 2)
);
