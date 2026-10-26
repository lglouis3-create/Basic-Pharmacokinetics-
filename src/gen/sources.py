#!/usr/bin/env python3
"""Source registry: one record per original document the bank's problem sets
and quiz items come from, with a link to the student's own access-controlled
copy in Google Drive and the printed problem number of every question.

Writes src/sources.js:

    const SOURCES   = [{id, title, type, module, modules, date, file, drive,
                        key, note, chains, items: [{q, label}], missing}];
    const SOURCE_OF = {questionId: {src, label}};

The bank is read straight from the data files build.py concatenates (DATA_FILES),
evaluated in Node, so no build is needed first and sources.js is never an input
to itself. Every CHAINS part and every Canvas quiz item (cq*) is matched to one
document by its `cite`: the part of the cite before the first ';' (with long
parentheticals removed) is tested against RULES in order, and the first match
wins. A cite that names no document ("09.21 lecture") takes the document the
rest of its chain maps to. A question that still matches nothing stops the run.

Labels are her numbering as printed, read from the cite ("problem 1c" -> "1c",
"question 4" -> "Question 4", slide "Example 2" -> "Example 2"). Where the cite
carries no number the label is built from position and listed under FLAGGED.

The public page is shared, so nothing here may name the student: titles are
written by hand below, never copied from Drive, and the Drive owner is never
recorded. sources_check.js enforces both.

Drive ids were found by title under the course folder "Basic Pharmacokinetics"
(Drive search, 21 Oct 2026). The Drive file is the student's own copy; anyone
without access to it sees Drive's no-access page.

    python3 gen/sources.py
"""
import json, os, re, subprocess, sys
from collections import Counter, OrderedDict

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # src/
OUT = os.path.join(HERE, 'sources.js')

# Course dates (course.js lectures, STYLE.md, TRANSCRIPT_CUES.md). A deck takes
# the first date its lecture ran; '' wherever no source states a date.
D = {'m1': '2026-08-17', 'm3': '2026-09-02', 'm4': '2026-09-14', 'm5': '2026-09-16',
     'm6': '2026-09-23', 'm6a': '2026-09-28', 'm7': '2026-09-30', 'm7b': '2026-10-12',
     'm8': '2026-10-14'}


def S(id, title, type, file, drive, key, match, date='', note='', missing='', module=None):
    return dict(id=id, title=title, type=type, file=file,
                drive=({'id': drive} if drive else None), key=key,
                match=[re.compile(m, re.I) for m in match],
                date=date, note=note, missing=missing, module=module)


NO_QUIZ = ('No Drive file found: the graded Canvas screenshots are not in the course '
           'folder (searched by title and by question text).')

# Order matters: the first rule that matches a cite wins, so the in-class sheets
# photographed on a deck come before the deck itself.
RULES = [
    # ---- quizzes (her graded Canvas sets; the screenshots show the student's answers)
    # Quiz 1 (26 Aug): a paper quiz; the printed text is pages 9-10 of the Questions 1-8 file, and her
    # answers are from her spoken review the same day (transcript 08-26). Items cq1-1, cq1-2, cq1-3a to 3c.
    S('quiz-1', 'Quiz 1, Modules 1–2 (paper)', 'quiz', 'Basic_Pharmacokinetics_Questions_1-8_plus_Quiz_1.pdf',
      None, 'instructor', [r'^Quiz 1\b'], date='2026-08-26',
      missing='No Drive file id recorded for this PDF; her key is from the 08-26 transcript.'),
    S('quiz-2', 'Canvas Quiz 2, Modules 2–3 (graded)', 'quiz', 'Quiz2-Modules2-3-graded.pdf',
      None, 'student-work', [r'^Canvas Quiz 2\b'], missing=NO_QUIZ),
    S('quiz-3', 'Canvas Quiz 3, Modules 4–5 (graded)', 'quiz', 'Quiz3-Modules4-5-graded.pdf',
      None, 'student-work', [r'^Canvas Quiz 3\b'], date='2026-09-23', missing=NO_QUIZ),
    S('quiz-4', 'Canvas Quiz 4, Modules 6–7a (graded)', 'quiz', 'Quiz4-Modules6-7a-graded.pdf',
      None, 'student-work', [r'^Canvas Quiz 4\b'], date='2026-10-05', missing=NO_QUIZ),
    # Quiz 5 (19 Oct): the student's transcription of her graded screenshots, with
    # her submitted answers beside the keys. The file sits in the transcripts folder,
    # outside the course folder. Its items are cq5-1, cq5-2, ... in Canvas order.
    S('quiz-5', 'Canvas Quiz 5, Modules 7b–8 (graded)', 'quiz', 'Quiz 5 - Module 7b/8.pdf',
      '1_dhniDOLGpXKHCfCxy1jHjMkn75B7B_z', 'student-work', [r'^Canvas Quiz 5\b'],
      date='2026-10-19', module=9),

    # ---- in-class activities
    S('ic-m3', 'In-Class Activity: IV Infusions', 'in-class',
      'In-Class IV Infusions - Solutions.pdf', '16X0Wpu7z5ipK6W0XXVLNX7oM4uBTw88o',
      'instructor', [r'In-Class IV Infusions']),
    S('ic-m5', 'In-Class Practice: Oral Absorption', 'in-class',
      '5---Pharmacokinetics-of-Oral-Absorption.pdf', '1HSCqWsB47T44FvDsA6pqJXzY-v9ABit9',
      'none', [r'slide "In-Class Practice"'], date='2026-09-21',
      note='The "In-Class Practice" slide at the end of the Module 5 deck; stems only.'),
    S('ic-m6', 'In-Class Activity: Multiple IV Infusions', 'in-class',
      '6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf',
      '1s51bCWUnYM8CoySTM2Wa5Wbhbbr2Af9l', 'instructor',
      [r'In-Class Activity, Multiple IV Infusions'], date=D['m6a'],
      note='Sheet not posted; the stems and the worked answers are on the last page of the annotated Module 6 deck.'),
    S('ic-m7', 'In-Class Activity: Bioavailability', 'in-class',
      '7a---Bioavailability-and-Bioequivalence.pdf', '1pcSPfnCoHMhzz81HNI8cK3XIW9wnYV1x',
      'instructor', [r'In-Class Activity page 1[78]', r'In-Class Activity, Bioavailability'],
      date=D['m7'],
      note='Sheet not posted; photographed with her answers on pages 17 and 18 of the annotated Module 7a deck.'),
    S('ic-m7b', 'In-Class Activity: PK-PD', 'in-class',
      '7b---Pharmacokinetics-and-Pharmacodynamics.pdf', '16Mj75lUlECrKrf_zg05CU7FppViGMJWT',
      'student-work', [r'In-Class Activity "PK-PD"'], date=D['m7b'],
      note='Sheet not posted; photographed on slide 13 of the annotated Module 7b deck, with the student\'s unfinished working.'),
    S('ic-m8', 'In-Class Practice: Nonlinear PK', 'in-class', '8 - Nonlinear PK.pdf',
      '1cpjY2HGWSe_s_C8ZI652Peh4lR-fl1Sc', 'student-work',
      [r'In-Class Practice, Nonlinear'], date=D['m8'],
      note='Sheet not posted; photographed on pages 20 and 21 of the annotated Module 8 deck. The working on the photographs is the student\'s; her keys are from the 14 Oct lecture.'),

    # ---- review sets
    S('rev-e1', 'Exam 1 Recap (review slides)', 'review', 'RecapExam1.pdf',
      '1G4X-J-ml_OeRfCKzP5kU4lb6av6_vzVK', 'none', [r'RecapExam1', r'Recap-Exam-1'],
      date='2026-09-09', note='Her revision slides for Modules 1–3; the practice slides print no answer.'),
    S('rev-e2', 'Exam 2 In-Class Review', 'review', 'Exam 2 In Class Review.pdf',
      '1BBU0iqGXoyc9iBIDfTv88D79xOUBzxYz', 'student-work', [r'Exam 2 In-Class Review'],
      date='2026-10-07',
      note='Paper handout photographed by the student; no key printed. The marks and working on the photographs are the student\'s.'),
    S('rev-final', 'Final Exam Review', 'review', 'Final-Exam-Review-10.19.pdf',
      '1KeqT3EJ0N9PRp76Dr6nvvrUhAz75sPAd', 'none', [r'Final-Exam-Review-10\.19'],
      date='2026-10-19', note='"Top 10 Basic PK Things to Know": PollEv slides, images only; her keys were spoken.'),

    # ---- homework (her question sheets; most Drive copies are the student's submission)
    S('hw-1', 'Homework 1', 'homework', 'Homework-1.pdf', '1xw3Buw2Bm_5PaoudWxHQNKe9ch-b1d_a',
      'student-work', [r'Homework-1\.pdf', r'PHAR_4221_Homework_1']),
    S('hw-2', 'Homework 2', 'homework', 'Homework-2.pdf', '1hNWJOhHpHMnvB8bTW5KfuzTjE4ag7iSA',
      'student-work', [r'Homework-?2\.pdf']),
    S('hw-3', 'Homework 3', 'homework', 'Homework-3.pdf', '1PqVMeirD5eQh23wzgfbeu2zPwFqSRw3X',
      'student-work', [r'Homework-3\.pdf']),
    S('hw-4', 'Homework 4', 'homework', 'Homework-4.pdf', '1i_0pRMLo23zlsEsnqVlbPh1eQhS4T-c2',
      'none', [r'Homework-4\.pdf'], note='The blank question sheet.'),
    S('hw-5', 'Homework 5', 'homework', 'Homework-5.pdf', '1p7hSrMRMzzeMO9kHqaqyeEnl8uwemBtE',
      'student-work', [r'Homework-5\.pdf']),
    S('hw-7', 'Homework 7', 'homework', 'Homework-7.pdf', '1VGJnihX1ewoWW_upaufBN-DoHv_tWGdd',
      'student-work', [r'Homework-7\.pdf']),

    # ---- daily practice sheets (her worked solutions)
    S('dp-m1-1', 'Introduction and Math Review Practice 1', 'daily-practice',
      'IntroductionandMathReviewSolutions.pdf', '1UrKpqkoHfjXYC3YDAGVotSN_sUaD970Z',
      'instructor', [r'IntroductionandMathReviewSolutions\.pdf']),
    S('dp-m1-2', 'Introduction and Math Review Practice 2', 'daily-practice',
      'IntroductionandMathReview2Solutions.pdf', '1VHeVbKAesccZnWTKcl5lAiojxINqNlTn',
      'instructor', [r'IntroductionandMathReview2Solutions\.pdf']),
    S('dp-m1-3', 'Introduction and Math Review Practice 3', 'daily-practice',
      'IntroductionandMathReview3Solutions.pdf', '1VaCRh7QJL99hZk-14N8uVsiXcJMEYLNy',
      'instructor', [r'IntroductionandMathReview3Solutions\.pdf']),
    S('dp-m2-1', 'IV Bolus Practice 1', 'daily-practice',
      'IV-Bolus-Practice-1---Solutions.pdf', '1WhFCZqeOh4FQ_Ut0WkQo6E99EIGAZLtZ', 'instructor',
      [r'(?<!Multiple-)IV-Bolus-Practice-1---Solutions']),
    S('dp-m2-2', 'IV Bolus Practice 2', 'daily-practice',
      'IV-Bolus-Practice-2---Solutions.pdf', '1fVEUDiG4j5pDXUXZbXG6yHSRlPhAIInG', 'instructor',
      [r'(?<!Multiple-)IV-Bolus-Practice-2---Solutions']),
    S('dp-m2-3', 'IV Bolus Practice 3', 'daily-practice',
      'IV-Bolus-Practice-3---Solutions.pdf', '1jYwTG-Zde3uguySNZHrCei8Y2ZJzcdXQ', 'instructor',
      [r'(?<!Multiple-)IV-Bolus-Practice-3---Solutions']),
    S('dp-m2-4', 'IV Bolus Practice 4', 'daily-practice',
      'IV-Bolus-Practice-4---Solutions.pdf', '1T6Pz7QWkkCkHIjgTxWleictgVCBdjXLv', 'instructor',
      [r'(?<!Multiple-)IV-Bolus-Practice-4---Solutions']),
    S('dp-m3-1', 'IV Infusions Practice 1', 'daily-practice',
      'IV-Infusions-Practice-1-Solutions.pdf', '1iL-4kQfyiRpM9XVKVj7-DY0wmnIdNE4K', 'instructor',
      [r'(?<!Multiple-)IV-Infusions-Practice-1-Solutions']),
    S('dp-m3-2', 'IV Infusions Practice 2', 'daily-practice',
      'IV-Infusions-Practice-2-Solutions.pdf', '1Cff1VlQ5DnbKzYK8k4NwlLXPG-8mjSgi', 'instructor',
      [r'(?<!Multiple-)IV-Infusions-Practice-2-Solutions']),
    S('dp-m3-3', 'IV Infusions Practice 3', 'daily-practice',
      'IV-Infusions-Practice-3---Solutions.pdf', '1tgze-m-ExI2nu9Ab8E6UzfbAsX5gBkZI', 'instructor',
      [r'IV-Infusions-Practice-3']),
    S('dp-m3-4', 'IV Infusions Practice 4', 'daily-practice',
      'IV-Infusions-Practice-4-Solutions.pdf', '1lZQDtVkxF3KSeZiyR5hyuvXMUOTwQ6-P', 'instructor',
      [r'(?<!Multiple-)IV-Infusions-Practice-4-Solutions']),
    S('dp-m4-1', 'Clearance & Elimination Practice 1', 'daily-practice',
      'Clearance--26-Elimination-Practice-1-Solutions.pdf', '1zu9iQLVuxM_u5AQiT5m5DERzTBGSETxZ',
      'instructor', [r'Elimination-Practice-1']),
    S('dp-m4-2', 'Clearance & Elimination Practice 2', 'daily-practice',
      'Clearance--26-Elimination-Practice-2-Solutions.pdf', '1vsBesCyt6GDdXapEbJ8rWDHrddG1ZRZK',
      'instructor', [r'Elimination-Practice-2']),
    S('dp-m4-3', 'Clearance & Elimination Practice 3', 'daily-practice',
      'Clearance--26-Elimination-Practice-3-Solutions-281-29.pdf',
      '1LI5x-DgeL8IYlHsjIliA9ZDmX5S5dag4', 'instructor', [r'Elimination-Practice-3']),
    S('dp-m4-4', 'Clearance & Elimination Practice 4', 'daily-practice',
      'Clearance--26-Elimination-Practice-4-Solutions.pdf', '1RizC7C9tf9Q-8BA6_2SNt_PI7-FCHTT8',
      'instructor', [r'Elimination-Practice-4']),
    S('dp-m5-1', 'Single Oral Practice 1', 'daily-practice',
      'Daily-Practice-Singler-Oral-1---Solutions.pdf', '15T2_6tATkaZfnyn8yCf7sNElZ9nY2Jav',
      'instructor', [r'Daily-Practice-Singl\w*-Oral-1']),
    S('dp-m5-2', 'Single Oral Practice 2', 'daily-practice',
      'Daily-Practice-Single-Oral-2---Solutions.pdf', '1SMXoly3jD5F-BE_C3yl1W94M8v5AWfDd',
      'instructor', [r'Daily-Practice-Single-Oral-2']),
    S('dp-m5-3', 'Single Oral Practice 3', 'daily-practice',
      'Daily-Practice-Single-Oral-3-Solutions.pdf', '1FWPCDdLYoov3V4qeDrJhPTmvlMFP4nxQ',
      'instructor', [r'Daily-Practice-Single-Oral-3']),
    S('dp-m6-b1', 'Multiple IV Bolus Practice 1', 'daily-practice',
      'Multiple-IV-Bolus-Practice-1---Solutions.pdf', '1-tm-FqYLY1VnrnRpQwi5n5-GYR73621b',
      'instructor', [r'Multiple-IV-Bolus-Practice-1']),
    S('dp-m6-b2', 'Multiple IV Bolus Practice 2', 'daily-practice',
      'Multiple-IV-Bolus-Practice-2---Solutions.pdf', '12JZpnonhMeJBE1wQGrKyDI8JQxvIv5MH',
      'instructor', [r'Multiple-IV-Bolus-Practice-2']),
    S('dp-m6-b3', 'Multiple IV Bolus Practice 3', 'daily-practice',
      'Multiple-IV-Bolus-Practice-3---Solutions.pdf', '1MriHvxovaVJkLNdJzBWM7Cfg-vR4UQbs',
      'instructor', [r'Multiple-IV-Bolus-Practice-3']),
    S('dp-m6-b4', 'Multiple IV Bolus Practice 4', 'daily-practice',
      'Multiple-IV-Bolus-Practice-4---Solutions.pdf', '1N5eQq8F1463ok9joSzjjXHMDvc1u8doz',
      'instructor', [r'Multiple-IV-Bolus-Practice-4']),
    S('dp-m6-i1', 'Multiple IV Infusions & Multiple Oral Practice 1', 'daily-practice',
      'Multiple-IV-Infusions--26-Multiple-Oral-Administrations-Practice-1---Solutions.pdf',
      '1cdkBjSVwrvO8svw5QY7EeEbfXNhdDy62', 'instructor', [r'Oral-Administrations-Practice-1']),
    S('dp-m6-i2', 'Multiple IV Infusions & Multiple Oral Practice 2', 'daily-practice',
      'Multiple-IV-Infusion--26-Multiple-Oral-Administrations-Practice-2---Solutions.pdf',
      '13u6cb7UndpUi96CybOCCKpBv7vKwEWWL', 'instructor', [r'Oral-Administrations-Practice-2']),
    S('dp-m6-i3', 'Multiple IV Infusions & Multiple Oral Practice 3', 'daily-practice',
      'Multiple-IV-Infusion-and-Multiple-Oral-Solution-3.pdf',
      '1VyCC1OCs7NnN-F-4wNq8GbxgX72er3el', 'instructor', [r'Multiple-Oral-Solution-3']),
    S('dp-m7-1', 'BA-BE Practice 1', 'daily-practice', 'BA-BE-Practice-1---Solutions.pdf',
      '1Ugp6NRkYwkJHvg9eYXGwnCnF-gDXayLx', 'instructor', [r'BA-BE-Practice-1']),
    S('dp-m7-2', 'BA-BE Practice 2', 'daily-practice', 'BA-BE-Practice-2----Solutions.pdf',
      '1ochZEozg1fSg2mF81_THx2RHb03qgrLK', 'instructor', [r'BA-BE-Practice-2']),
    S('dp-m7-3', 'BA-BE Practice 3', 'daily-practice', 'BA-BE-Practice-3---Solutions.pdf',
      '1l1RJwhnCKnT38Njg8uVV7OCfaxpb5PsV', 'instructor', [r'BA-BE-Practice-3']),
    S('dp-m7b-1', 'PK-PD Practice 1', 'daily-practice', 'PK-PD-Practice-1---Solutions.pdf',
      '1tmckVSAPja1J74O9N023Q-K3riDHwmek', 'instructor', [r'PK-PD-Practice-1']),
    S('dp-m7b-2', 'PK-PD Practice 2', 'daily-practice', 'PK-PD-Practice-2---Solutions.pdf',
      '1L0TPraYEeuZgDrir-OiG69Lg5VhYpSdZ', 'instructor', [r'PK-PD-Practice-2']),
    S('dp-m7b-3', 'PK-PD Practice 3', 'daily-practice', 'PK-PD-Practice-3---Solutions.pdf',
      '1BoA1zH8zzVrwgdL3I6BjZq_Y7Y0ow9A-', 'instructor', [r'PK-PD-Practice-3']),
    S('dp-m8-1', 'Nonlinear Practice 1', 'daily-practice', 'Nonlinear-Solutions-1.pdf',
      '13QYdVoRiI4OOXzMvM3JRoLFriRcdWJIN', 'instructor', [r'Nonlinear-Solutions-1']),
    S('dp-m8-2', 'Nonlinear Practice 2', 'daily-practice', 'Nonlinear-Solutions-2.pdf',
      '1C46HDJA0MUOGbw37OCL4Z9e8loUpy50d', 'instructor', [r'Nonlinear-Solutions-2']),
    S('dp-m8-3', 'Nonlinear Practice 3', 'daily-practice', 'Nonlinear-Solutions-3.pdf',
      '1tvEsuMMULztwfEnjhSgybEc0oqZidIpX', 'instructor', [r'Nonlinear-Solutions-3']),
    S('dp-m8-4', 'Nonlinear Practice 4', 'daily-practice', 'Nonlinear-Solutions-4.pdf',
      '1FXtcwZ-Him69372U7Yo43U_rTKTGiwK3', 'instructor', [r'Nonlinear-Solutions-4']),

    # ---- lecture decks: the worked examples (her working is on the annotated slides)
    S('ex-m1', 'Module 1 slides: Introduction (worked examples)', 'example', 'Introduction.pdf',
      '1HsgffHo0x3eAQHRyr2QBS4Osftme07sP', 'instructor', [r'(?<![\w-])Introduction\.pdf'],
      date=D['m1']),
    S('ex-m3', 'Module 3 slides: Intravenous Infusions (worked examples)', 'example',
      '3IntravenousInfusions.pdf', '1Z0U0pJ0fgbMaAjkdeYt0_kbUH-cDYp50', 'instructor',
      [r'3IntravenousInfusions\.pdf'], date=D['m3']),
    S('ex-m4', 'Module 4 slides: Clearance and Elimination (worked examples)', 'example',
      '4---Clearance-and-Elimination.pdf', '1Zl6x4xXiPsbrEgtTFBBWd4MgKHwUHkfB', 'instructor',
      [r'4---Clearance-and-Elimination\.pdf'], date=D['m4']),
    S('ex-m5', 'Module 5 slides: Oral Absorption (worked examples)', 'example',
      '5---Pharmacokinetics-of-Oral-Absorption.pdf', '1HSCqWsB47T44FvDsA6pqJXzY-v9ABit9',
      'instructor', [r'5---Pharmacokinetics-of-Oral-Absorption\.pdf'], date=D['m5']),
    S('ex-m6', 'Module 6 slides: Repetitive IV Bolus and Intermittent IV Infusions (worked examples)',
      'example', '6---Repetitive-IV-Bolus-and-Intermittent-IV-Infusions.pdf',
      '1s51bCWUnYM8CoySTM2Wa5Wbhbbr2Af9l', 'instructor', [r'6---Repetitive-IV-Bolus'],
      date=D['m6']),
    S('ex-m6a', 'Module 6a slides: Multiple Oral Doses (worked examples)', 'example',
      '6a---Multiple-Oral-Doses.pdf', '1dJkGxr-EhBXKcHp-nba1y-p-xqd7x6Aj', 'instructor',
      [r'6a---Multiple-Oral-Doses\.pdf'], date=D['m6a']),
    S('ex-m7', 'Module 7a slides: Bioavailability and Bioequivalence (worked examples)', 'example',
      '7a---Bioavailability-and-Bioequivalence.pdf', '1pcSPfnCoHMhzz81HNI8cK3XIW9wnYV1x',
      'instructor', [r'7a---Bioavailability'], date=D['m7']),
    S('ex-m7b', 'Module 7b slides: PK-PD (worked examples)', 'example',
      '7b---Pharmacokinetics-and-Pharmacodynamics.pdf', '16Mj75lUlECrKrf_zg05CU7FppViGMJWT',
      'instructor', [r'7b---Pharmacokinetics'], date=D['m7b']),
    S('ex-m8', 'Module 8 slides: Nonlinear PK (worked examples)', 'example', '8 - Nonlinear PK.pdf',
      '1cpjY2HGWSe_s_C8ZI652Peh4lR-fl1Sc', 'instructor', [r'8 - Nonlinear PK\.pdf'], date=D['m8']),
]

# Labels the cite cannot give. Each is checked against the printed sheet or slide
# named in STYLE.md; every one is also reported as FLAGGED.
LABEL_OVERRIDE = {
    'm5-n06': 'Example 2',          # cite names only the 09.21 lecture; same example as its chain
    'm5-n11': 'Problem 1',          # cite names only the 09.21 lecture; same sheet item as its chain
    'm7-n02': 'Practice Problem (follow-up)',  # worked after the absolute Practice Problem slide
    'm6b-n02': 'Example 4(a)',      # the slide is the (a) part of Example 4
    'm6b-n03': 'Example 4(b)',
}

ORD = {'first': '1st', 'second': '2nd', 'third': '3rd', 'final': 'final'}


def load_bank():
    """QUESTIONS and CHAINS, evaluated from the data files build.py lists."""
    js = r"""
const fs=require('fs'),path=require('path'),vm=require('vm');
const SRC=process.argv[1];
const b=fs.readFileSync(path.join(SRC,'build.py'),'utf8');
const m=b.match(/DATA_FILES\s*=\s*\[([\s\S]*?)\]/);
const files=[...m[1].matchAll(/'([^']+\.js)'/g)].map(x=>x[1]);
let code=files.map(f=>fs.readFileSync(path.join(SRC,f),'utf8')).join('\n;\n');
code+='\nglobalThis.__X={Q:QUESTIONS.map(q=>({id:q.id,module:q.module,cite:q.cite||""})),'+
      'C:CHAINS.map(c=>({id:c.id,src:c.src,module:c.module,parts:c.parts}))};';
const sb={console};sb.globalThis=sb;vm.createContext(sb);vm.runInContext(code,sb);
process.stdout.write(JSON.stringify(sb.__X));
"""
    r = subprocess.run(['node', '-e', js, HERE], capture_output=True, text=True)
    if r.returncode:
        sys.exit('ERROR: could not evaluate the data files:\n' + r.stderr)
    x = json.loads(r.stdout)
    return {q['id']: q for q in x['Q']}, x['C']


def primary(cite):
    """The cite's first source: long parentheticals removed, cut at the first ';'."""
    c = re.sub(r'\([^()]{4,}\)', '', cite)
    return c.split(';')[0].strip()


def label_of(cite, src_id):
    """Her number as printed, from the cite. Returns (label, from_number)."""
    p = primary(cite)
    tests = [
        (r'question (\d+)\s*\(([a-z])\)', lambda m: m[1] + m[2]),
        (r'(?:problem|question) (\d+), part ([a-z])\b', lambda m: m[1] + m[2]),
        (r'(?:problem|question|part) (\d+[a-z])\b', lambda m: m[1]),
        (r'\bpart ([a-z])\b', lambda m: m[1]),
        (r'\bquestion (\d+)\b(?!,? (?:final|part))', lambda m: 'Question ' + m[1]),
        (r'\bproblem (\d+)\b(?!,? (?:final|part))', lambda m: 'Problem ' + m[1]),
        (r'\bpart (\d+)\b', lambda m: 'Part ' + m[1]),
        (r'(\d+) "((?:Example|Practice Problem)[^"]*)"', lambda m: 'Slide %s (%s)' % (m[1], m[2])),
        (r'"(Example \d+)"', lambda m: m[1]),
        (r'slide "(Practice Problem)"', lambda m: m[1]),
        (r'\bslides? (\d+(?:\s*(?:–|-|and)\s*\d+)?)', lambda m: ('Slides ' if re.search(r'\D', m[1]) else 'Slide ') + m[1]),
    ]
    for rx, f in tests:
        m = re.search(rx, p, re.I)
        if m:
            return f(m), True
    # a deck example named in a later segment of the cite
    m = re.search(r'slide "(Example \d+)"', cite)
    if m and src_id.startswith('ex-'):
        return m[1], True
    # a part slide of a deck example: slide "(a) What is ..." (Example 1)
    m, e = re.search(r'slide "\(([a-z])\)', p), re.search(r'Example (\d+)', cite)
    if m and e:
        return 'Example %s(%s)' % (e[1], m[1]), True
    m = re.search(r'\b(Module \d+) practice slide', p, re.I) or re.search(r'slide "Practice" \((Module \d+)\)', cite)
    if m:
        return m[1] + ' practice, item {k}', False
    m = re.search(r'\b(first|second|third|final) (question|problem|part)', p, re.I)
    if m:
        n = re.search(r'problem (\d+)', p)
        return ((n[1] + ' ' if n else '') + '(%s %s, unnumbered)' % (ORD[m[1].lower()], m[2].lower())), False
    m = re.search(r'slide "([^"]+)"', p)
    if m:
        return 'Slide "%s"' % m[1], False
    return None, False


def rule_for(cite):
    p = primary(cite)
    for s in RULES:
        if any(rx.search(p) for rx in s['match']):
            return s
    return None


def main():
    Q, chains = load_bank()
    need = OrderedDict()            # question id -> chain id (or None for quiz items)
    for c in chains:
        for p in c['parts']:
            need.setdefault(p, c['id'])
    for qid in Q:
        if qid.startswith('cq'):
            need.setdefault(qid, None)

    missing_q = [q for q in need if q not in Q]
    if missing_q:
        sys.exit('ERROR: CHAINS name questions that do not exist: ' + ', '.join(missing_q))

    assign = {}
    for qid in need:
        m = re.match(r'cq(\d+)-\d+[a-z]?$', qid)       # a quiz item: its quiz, by id
        if m and ('quiz-' + m[1]) in {r['id'] for r in RULES}:
            assign[qid] = 'quiz-' + m[1]
            continue
        s = rule_for(Q[qid]['cite'])
        if s:
            assign[qid] = s['id']
    # a cite that names no document takes its chain's document
    for c in chains:
        got = Counter(assign[p] for p in c['parts'] if p in assign)
        for p in c['parts']:
            if p not in assign and got:
                assign[p] = got.most_common(1)[0][0]
    unmatched = [q for q in need if q not in assign]
    if unmatched:
        sys.exit('ERROR: no source for ' + ', '.join('%s (%s)' % (q, Q[q]['cite']) for q in unmatched))

    by_id = {s['id']: s for s in RULES}
    items, flagged = {s['id']: [] for s in RULES}, []
    chains_of = {s['id']: [] for s in RULES}
    seen, ctx = set(), {}
    for qid, ch in need.items():
        sid = assign[qid]
        if qid in seen:
            continue
        seen.add(qid)
        lab, numbered = label_of(Q[qid]['cite'], sid)
        m = re.match(r'cq\d+-(\d+)$', qid)
        if m and not (lab or '').startswith('Question'):
            lab, numbered = 'Question ' + m[1], True     # Canvas order is the printed order
        if qid in LABEL_OVERRIDE:
            lab, numbered = LABEL_OVERRIDE[qid], False
        if lab and '{k}' in lab:                     # no number printed: count by part order
            ctx[(sid, lab)] = ctx.get((sid, lab), 0) + 1
            lab = lab.format(k=ctx[(sid, lab)])
        if lab is None:
            k = sum(1 for it in items[sid]) + 1
            lab, numbered = 'Item %d' % k, False
        if not numbered:
            flagged.append((qid, sid, lab, Q[qid]['cite']))
        items[sid].append({'q': qid, 'label': lab})
        if ch and ch not in chains_of[sid]:
            chains_of[sid].append(ch)

    chain_mod = {c['id']: c['module'] for c in chains}
    out, source_of = [], OrderedDict()
    for s in RULES:
        its = items[s['id']]
        if not its and s['id'] != 'quiz-5':
            print('  skipped (no bank items): ' + s['id'])
            continue
        if not its:      # Quiz 5 is being added to q13_quizzes.js; keep its record, say why it is empty
            s = dict(s, missing='Bank items not added yet (cq5-1, cq5-2, ...); rerun gen/sources.py after they land.')
        mods = sorted({Q[i['q']]['module'] for i in its}) or [s['module']]
        first_mod = (chain_mod[chains_of[s['id']][0]] if chains_of[s['id']]
                     else Q[its[0]['q']]['module'] if its else s['module'])
        rec = OrderedDict([
            ('id', s['id']), ('title', s['title']), ('type', s['type']),
            ('module', s['module'] or first_mod), ('modules', mods),
            ('date', s['date']), ('file', s['file']), ('drive', s['drive']), ('key', s['key']),
            ('note', s['note']), ('chains', chains_of[s['id']]), ('items', its),
            ('missing', s['missing']),
        ])
        out.append(rec)
        for it in its:
            source_of[it['q']] = {'src': s['id'], 'label': it['label']}

    js = ('/* Generated by gen/sources.py from the bank\'s cites. Do not edit.\n'
          '   One record per original document; drive.id is the student\'s own access-controlled\n'
          '   copy (https://drive.google.com/file/d/<id>/view). */\n'
          'const SOURCES = ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n'
          'const SOURCE_OF = ' + json.dumps(source_of, ensure_ascii=False, indent=1) + ';\n')
    open(OUT, 'w', encoding='utf-8').write(js)

    print('wrote %s: %d sources, %d questions mapped' % (OUT, len(out), len(source_of)))
    print('by type: ' + ', '.join('%s %d' % kv for kv in Counter(r['type'] for r in out).items()))
    print('no Drive file: ' + (', '.join(r['id'] for r in out if not r['drive']) or 'none'))
    print('FLAGGED labels (no printed number in the cite): %d' % len(flagged))
    for qid, sid, lab, cite in flagged:
        print('  %-12s %-10s %-40s %s' % (qid, sid, lab, cite[:90]))


if __name__ == '__main__':
    main()
