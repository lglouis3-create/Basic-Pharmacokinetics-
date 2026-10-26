/* ==========================================================================
   THE MOST LIKELY EXAM 3
   ==========================================================================
   A fixed 40-question paper for the final, chosen from the bank by the
   evidence of what she asks: her 19 Oct final review ("Top 10 Basic PK Things
   to Know"), the polls, quizzes, practice sheets and homework she repeated,
   and what she said in lecture about the exam. Her blueprint: 40 questions,
   20 multiple choice and 20 fill in the blank, 10 of them on Modules 7b and 8.
   `forecast` lists each topic with the evidence for it and the wording she is
   most likely to use; the Exam sim shows it under the paper's Start button.
   ========================================================================== */
const LIKELY = {
  exam: 3,
  id: 'likely3',
  title: 'Most likely Exam 3',
  note: "Chosen by the evidence of what she asks: her 19 Oct final review, her Canvas quizzes and polls, her Exam 2 review, and what she said in lecture about the exam. Her blueprint puts 10 of the 40 on Modules 7b and 8. Most items are hers word for word; the rest follow her wording.",
  ids: [
    "fr-1", "m1-ord-c07", "fr-2", "m2-n-k1", "m2-n-999a", "cq2-2", "x3-a-dose2", "fr-12a",
    "fr-12b", "fr-12d", "cq2-6", "inf-n16", "inf-n12", "fr-7", "fr-3", "e2r-1",
    "e2r-2", "e2r-2m", "cq3-2", "fr-5", "e2r-3e", "e2r-6", "e2r-12", "fr-6a",
    "fr-6b", "cq4-4", "cq4-8", "e2r-9", "fr-8a", "fr-8b", "cq5-3", "fr-11a",
    "cq5-2", "cq5-4", "cq5-1", "cq5-5", "cq5-6", "cq5-8", "cq5-7", "nl-ic4d-t"
  ],
  // {topic, wording: her own question, format, count: likely number on the paper, evidence}
  forecast: [
    {"topic": "Zero and first order: properties, units of k, a data table", "wording": "Which of the following is characteristic of first-order processes? / How would you classify the decrease in the amount of drug A?", "format": "MC", "count": "2", "evidence": "Final review statement 10 and its poll (19 Oct); 9 Sep: \"I am going to give you a data set\"; Quiz 1 Q1–Q2"},
    {"topic": "IV bolus: k, t½, VD, Cp; VD read from an equation", "wording": "The equation describing the drug in the body is given as Cp = (40 mg/L)e^(-0.9t). What is the apparent volume of distribution of this drug?", "format": "MC and fill-in", "count": "2–3", "evidence": "Final review statements 8 and 9 (19 Oct); 19 Aug: \"I will ask you for Half-Life over and over\"; Quiz 1 Q3; IV Bolus Practice 1–4"},
    {"topic": "Two compartments from A, B, α and β", "wording": "What is the elimination half-life of this agent?", "format": "fill-in", "count": "1", "evidence": "Quiz 2 Q2–Q3; IV Bolus Practice 3–4; Homework 2"},
    {"topic": "Concentration during and after an infusion", "wording": "What is the plasma concentration at the end of a 2 hour infusion ...? What is the concentration 3 hours after cessation?", "format": "fill-in and MC", "count": "2–3", "evidence": "Final review statement 1 and its poll (19 Oct); Quiz 2 Q5, Q7, Q8; IV Infusion Practice 1–4"},
    {"topic": "A higher infusion rate raises Css, not the time to reach it", "wording": "Which of the following results when the rate of infusion is increased?", "format": "MC", "count": "1", "evidence": "2 Sep: \"I'm gonna ask it of you 10 times\"; Quiz 2 Q6; 19 Oct: \"It does not change the time\""},
    {"topic": "Solving for time", "wording": "If there were no loading dose, how much time would be required to reach 80% of the steady-state plasma concentration?", "format": "fill-in", "count": "1–2", "evidence": "Final review statement 2: \"So know how to rearrange to solve for time\" (19 Oct)"},
    {"topic": "Loading dose", "wording": "Why is a loading dose used? / Recommend an IV loading dose to rapidly achieve the desired steady-state concentration.", "format": "MC or fill-in", "count": "1", "evidence": "Quiz 2 Q4; every infusion practice sheet"},
    {"topic": "Which input a curve shows", "wording": "Which type of drug input is depicted by this curve?", "format": "MC", "count": "1", "evidence": "Final review statement 6 and its poll (19 Oct)"},
    {"topic": "Creatinine clearance with ideal body weight (not on the sheet)", "wording": "Using the patient's ideal body weight, estimate the creatinine clearance of a 45-year-old female ...", "format": "fill-in (mL/min)", "count": "1", "evidence": "Named as not on the sheet on 14 Sep, 23 Sep, 5 Oct and 19 Oct; Exam 2 review item 1"},
    {"topic": "Renal clearance and its mechanism", "wording": "What is the renal clearance in mL/min and probable mechanism of renal elimination?", "format": "fill-in and MC", "count": "1–2", "evidence": "Final review statement 8 and its poll (19 Oct); Quiz 3 Q7; Exam 2 review items 2 and 7"},
    {"topic": "Clearance and half-life; hepatic clearance", "wording": "If there is a decrease in the total body clearance ..., what is the expected change to the elimination half-life? / Hepatic clearance is most readily approximated with creatinine clearance.", "format": "MC or True/False", "count": "1", "evidence": "Quiz 3 Q2; Exam 2 review items 5 and 14; 19 Oct poll"},
    {"topic": "One oral dose: tmax, then Cmax", "wording": "What Cmax would you expect following the administration of the first oral dose ...?", "format": "fill-in", "count": "1", "evidence": "5 Oct: \"I'm only gonna ask you for CMax\"; Quiz 3 Q5; Exam 2 review 3e"},
    {"topic": "A larger oral dose; the absorption phase", "wording": "Which of the following would you expect with a 2-fold increase in oral dose? (Select all that apply)", "format": "MC or select-all", "count": "1–2", "evidence": "Quiz 3 Q3–Q4; Exam 2 review items 6 and 12"},
    {"topic": "Repeated IV bolus: peak and trough at steady state", "wording": "What is the expected maximum steady state plasma concentration following multiple IV bolus dosing every 12 hours ...?", "format": "MC and fill-in", "count": "1–2", "evidence": "Final review statement 7 and its poll (19 Oct, also 30 Sep); Quiz 4 Q2; Exam 2 review 3a"},
    {"topic": "Two intermittent infusions", "wording": "What is the plasma drug concentration 4 hours after the end of the second infusion?", "format": "fill-in", "count": "1", "evidence": "Final review statement 1, her board work (19 Oct); Quiz 4 Q4; Exam 2 review item 4"},
    {"topic": "A dose or interval for a target average; changing dose or interval", "wording": "What is an appropriate dose to achieve an average plasma drug concentration of 25 mg/L in this patient? / ... following a decrease in the dosing interval with no change to the dose?", "format": "fill-in and MC", "count": "1–2", "evidence": "Quiz 4 Q3, Q5, Q8; Exam 2 review 3b, 3f and 9; 5 Oct: \"I will tell you on the exam what to round it to\""},
    {"topic": "Bioavailability and the equivalent oral dose", "wording": "What is the bioavailability of a 500 mg tablet ...? What oral dose would provide similar therapeutic activity as the 400 mg bolus dose?", "format": "MC and fill-in", "count": "1–2", "evidence": "Final review statement 5 and its poll (70%, 570 mg; 19 Oct); Quiz 4 Q9; Exam 2 review 3c–3d"},
    {"topic": "7b: duration of action of one IV bolus", "wording": "What is the duration of action following a 604 mg IV bolus dose of a drug that displays linear, first-order pharmacokinetics?", "format": "fill-in or MC", "count": "1–2", "evidence": "Final review statement 2 and its poll (8 hours; 19 Oct); Quiz 5 Q3; every PK-PD practice sheet"},
    {"topic": "7b: doubling the dose adds one half-life", "wording": "Which of the following results when the IV bolus dose of a drug displaying linear, first-order pharmacokinetics is doubled?", "format": "MC", "count": "1", "evidence": "PollEv on 7b slide 12; Quiz 5 Q2; 19 Oct: \"You get one half-life\""},
    {"topic": "7b: dose for a duration; a longer half-life", "wording": "What dose of a medication ... would provide a duration of action of 20 hours in a 75 kg patient? / What is the impact on duration of activity if there is an increase in elimination half-life?", "format": "fill-in and MC", "count": "1–2", "evidence": "Quiz 5 Q1 and Q4; In-Class Activity 1b; Homework 7 1d"},
    {"topic": "8: is a level low or high relative to KM", "wording": "Which of the following is true for a medication that displays nonlinear pharmacokinetics?", "format": "MC or True/False", "count": "1–2", "evidence": "PollEv 14 Oct and 19 Oct; Quiz 5 Q5; 19 Oct: \"cause you know I'm gonna ask you, right?\" and \"KM and concentration\""},
    {"topic": "8: linear against nonlinear", "wording": "Which of the following is true regarding drugs that display nonlinear pharmacokinetics?", "format": "MC", "count": "1", "evidence": "Final review statement 4 (19 Oct); Quiz 5 Q6"},
    {"topic": "8: KM and Vmax from two daily doses", "wording": "What is the KM of this drug in this patient?", "format": "fill-in", "count": "1–2", "evidence": "Slides 13–15; every Nonlinear practice sheet; Homework 7; Quiz 5 Q8"},
    {"topic": "8: daily dose rate for 15 mg/L, rounded as told", "wording": "What daily dose rate of a non-linear drug would provide a steady-state concentration of 15 mg/L?", "format": "fill-in", "count": "1", "evidence": "Slide 12; every Nonlinear sheet; Quiz 5 Q7; 14 Oct: \"Don't panic if I ask you to round to the nearest 10\""},
    {"topic": "8: half-life and clearance at a stated level", "wording": "Calculate the half-life and the total body clearance when the plasma concentration is 15 mg/L.", "format": "fill-in", "count": "0–1", "evidence": "In-Class Practice 4d–e; Nonlinear Solutions 1–4; 14 Oct: \"I could have asked you half-life and clearance at 7.2 or ... at 18\""}
  ]
};
