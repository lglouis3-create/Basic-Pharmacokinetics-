# How to write a question file for this drill

Read this whole file before writing anything. Then read, in this order:

1. `course.js` — the manifest. It fixes the lecture ids, module numbers, exam
   numbers and the list of `skills`. Every question must carry a `skill` whose
   id appears there.
2. `q1_sample.js` — the format, and the *depth* expected of `why` and `teach`.
   It is placeholder content but the shape and the quality bar are real.
3. `STYLE.md` — every problem Dr. Mosley has actually set, with her worked
   answers. This decides how stems are worded and which quantities she makes
   the unknown. Match her, not a textbook.
4. `TRANSCRIPT_CUES.md` — what she said out loud: what is on the exam, what is
   not on the equation sheet, her exact words for each term, her poll
   questions. Anything she flagged for the exam gets a question.
5. Your assigned deck, read with the `Projects` tool (`project_read`).

## The source rule, which overrides everything else

Every number, name, definition and claim in a question, an option, a `why`, a
`teach`, a `quote` or a step must be on the cited slide, in the transcript, or
in Dr. Mosley's own worked solution. If you cannot point at where it came
from, it does not go in the file. Do not supply a value from your own
pharmacokinetics knowledge, do not round a number she left unrounded, and do
not infer a figure the source did not state.

Where the slide, the transcript and her worked solution disagree, write the
question from the slide, and record both readings and the one keyed in an
`audit` field. Do not adjudicate silently.

`note` and `audit` are different fields. `audit` is for whoever checks the
bank: where a figure came from, which reading of a garbled caption was used,
what was computed rather than printed. It is never shown. `note` is shown to
the student under the explanation, so it carries only what changes what the
student should do: her printed sheet says 40 L but she worked the problem with
20 L; her lecture said 93.25 per cent where the arithmetic gives 93.75. Nothing
shown to the student says where a fact was heard. test.js fails on words such
as transcript, caption, aloud or handwritten in any displayed field.

The decks are Louis's own annotated copies, so the text extract contains his
handwriting OCR'd into nonsense alongside the printed slide. **Printed slide
text is a source. OCR'd handwriting is not** — it is unreliable enough that a
number read out of it can be wrong by an order of magnitude. Where a
handwritten note plainly records something the professor said, treat it as a
lead to confirm against the transcript, never as a citation on its own.

## Arithmetic

Every numeric answer and every step must be computed, not estimated. Write a
small Python script, run it, and check that your keyed `answer` matches. Carry
full precision through the working and round only at the end. Where the source
shows the professor's own rounding, follow hers and say so in the final step.

## The schema

```
{id, skill, prof:'Mosley', tier:'new', exam, module, lecture,
 topic, sub, concept, source:'slide'|'transcript'|'both',
 multi, lowYield, dupOf, note, quote, cite,
 type:'numeric'|'match',          // omit for plain multiple choice
 stem, options:[{t, correct, why}], teach}
numeric adds: units, answer, tol, steps:[{k:'setup'|'unit'|'algebra'|'round', t, why}]
match   adds: left, right, pairs:[{l, r, why}]
```

- `exam`, `module`, `lecture` must match a lecture entry in `course.js`. These
  drive the exam pools, so a wrong module number silently puts a question on
  the wrong paper.
- `concept` groups different wordings of one idea. When a concept is missed the
  scheduler brings it back as a *different* question, so give at least a few
  concepts two wordings.
- `tier` is `'new'` throughout for this course.
- `cite` names the deck file and the slide: `'4---Clearance-and-Elimination.pdf
  slide 15'`. Where the extract gives no slide number, cite the slide title:
  `'2IVBolusAdministration.pdf, slide "Volume of Distribution"'`. Every
  question needs one.
- `quote` is Dr. Mosley's exact wording, from the slide or the transcript, when
  one exists. Use it heavily — her phrasing is what the exam will echo.
- `source:'transcript'` or `'both'` whenever a fact came from the audio, and
  mark any term or figure that came from a transcript rather than a slide,
  because the auto-captions garble drug names and numbers.

## Writing the questions

**Stems** ask the subject, the way she asks it. Never "what does the slide
say", never a reference to the deck or the lecture. Patient vignettes follow
her habits: weight in pounds when she gives pounds, the model stated when she
states it and left to be inferred when she leaves it. A select-all stem ends
`Select all that apply.` and needs `multi:true`, two or more correct options
and at least one distractor.

**Options** are short and parallel, and the correct one is never the longest.
No reasoning in the option text — that belongs in `why`.

**`why`** is written for every option, right and wrong alike. For a wrong
option it names the specific misunderstanding that leads a student there — not
"this is incorrect" but what they did instead, which quantity they used, which
word they attached the wrong idea to. Three to five sentences. This is where
the drill teaches, so it is where the effort goes.

**Formulas** are typed in plain text, `C0e^(-kt)`, `t1/2 = 0.693/k`,
`Cl = k x VD`, and the app sets them with subscripts and superscripts when it
shows them. A ratio worth reading as a ratio is written
`{{frac:numerator|denominator}}` and stacks, as the slides print it.

**Comparison tables.** Where students run two or three cases together (raising
k against raising ka; immediate against extended release), give the concept
block a section with `table:{head:[...], rows:[[...]]}`: the cases as columns,
the quantities that differ as rows, each cell short with its reason. On a phone
it becomes one card per row.

**`teach`** explains the concept the question turns on, so that someone who
missed it can now answer a differently-worded version. Not a restatement of
the correct option.

**Numeric `steps`** show every line with units on every line. Each step's `why`
says why that equation fits this problem, why the algebra move is made, what
each number means in the body, and how the units cancel. Name the relation
being used. The four `k` values classify the step, and the drill uses them to
tell a student which kind of miss they keep making: `setup` (choosing the
relation), `unit` (converting), `algebra` (rearranging or evaluating), `round`.

**Tolerance** is set so that a student who carried full precision and one who
rounded sensibly at an intermediate step both pass, and one who used the wrong
relation does not.

## Language

No metaphors, no similes, no personification. No sentence about the drill, the
deck, the slide or the writing. No study advice. Expand each abbreviation the
first time it appears in a question. Memory hooks only where one is a real aid;
drop weak ones. Plain declarative prose that explains the mechanism and the
result.

## Coverage

Work slide by slide through the deck. Every testable point gets a question, and
anything Dr. Mosley flagged in the transcript gets one whether or not the slide
emphasises it. Mark a genuine aside `lowYield:true` so it stays off the exam
simulator without being lost. Use `dupOf` to keep two wordings of one fact off
the same paper.

Aim for 25 to 40 questions for a full module, roughly half of them numeric,
since half of Dr. Mosley's paper is calculation.

## Before you finish

`node --check <yourfile>.js` must pass. The file declares one `const` array and
nothing else, except that the first question file also declares `TOPICS` and
`CHAINS`.

## Problem sets

Dr. Mosley sets most of her calculations as one vignette asked in parts, where
a part uses what the part before it produced, and she says so in words: *"at
the rate you determined above"*, *"the drug in question #1"*. Write each part
so that it stands on its own, restating the value it needs — *"a drug with an
elimination rate constant of 0.91 hr⁻¹, what is its half-life?"* — so the
scheduler can ask any one of them cold and a student who missed (a) is not
locked out of (f).

`CHAINS`, in the first question file, is what puts the parts back in her order:

```
{id, module, name, setup, parts:['<question id>', ...]}
```

`parts` is her part order, `name` is what the set is and `setup` is the shared
vignette in one line, shown above the stem of every part. `test.js` checks that
every id exists, appears in no other set, carries the set's module number and
is answered with a number, so a set cannot drift across two problems.
