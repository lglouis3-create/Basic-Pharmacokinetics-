# Exam drill engine

A course-agnostic build for a single-file HTML exam drill. `python3 build.py`
concatenates the sources into one self-contained `.html` file that runs from
disk with no server, no network and no dependencies, and stores each reader's
progress in their own browser.

Everything that names a course — its title, its localStorage namespace, its
built filename, its professors, its lectures, its exam blueprint and its skill
list — lives in **`course.js`** and nowhere else. To stand this engine up for a
different course, edit that one file.

---

## Build

From this directory:

```
python3 build.py
```

It syntax-checks every JavaScript source with `node --check`, assembles the
page, checks the assembled script as one unit, writes a `.tmp` and then
`os.replace`s it into place, so a failed build never leaves a truncated file
where the last good one was. The output path is
`/mnt/user-data/outputs/<COURSE.output>`, parsed out of `course.js`.

---

## The files

| File | What it is |
|---|---|
| `course.js` | **The manifest.** Course id, title, short name, namespace, output filename, professors, lectures, exams and their blueprint pools, the active exam, the skill list, the default pace. Concatenated **first**, so `COURSE` is in scope for everything else. |
| `shell.html` | The page: CSS, the markup skeleton, and the engine core — storage, the spaced-repetition scheduler, the pool resolver, the grading for all three question types. |
| `views.js` | Every rendered view: topics, quiz, weak spots, exam simulator, reference, tell apart, guides, settings. Appended last, ending in the BOOT block. |
| `q1_sample.js` | A six-question placeholder bank, and `TOPICS` at the top. Exercises every question type so the checks have something to run against. Replace or delete. |
| `equations.js` | The course's equations as structured data for the equation drill: the pieces each is built from, its typed form, the wrong pieces offered beside it, and a stacked display written `{{frac:numerator|denominator}}`. |
| `reference.js`, `tell.js`, `guide.js` | The three static documents, authored as HTML in a template literal. One stub entry each. |
| `images.json` | `{key: "data:image/jpeg;base64,..."}`. Currently `{}`. |
| `build.py` | The assembler. `DATA_FILES` at the top is the concatenation order. |
| `test.js` | Bank integrity, the manifest, the pool resolver, every question type's grading, the blueprint draw, the scheduler rules, storage namespacing. **Gate: exits 1 on failure.** |
| `style_check.js` | Flags rejected phrasing in every explanatory field, and reports citation coverage. **Gate.** |
| `render_test.js` | Renders every view and every question type against stub DOM sinks; fails on `undefined`, `NaN`, `[object Object]` or unbalanced markup. **Gate.** |
| `explain_check.js` | Scores how well each question explains itself, worst-first by severity × exam weight. **Report only, always exits 0.** |
| `cite_check.py` | Checks every cited slide number against the real deck. **Skips** when no PDFs are present. |
| `browser_test.py` | Drives the built file in Chromium: answers every question through the real controls, walks the sweep, runs a paper, denies localStorage. **Gate.** |
| `problemset_test.py` | Works one of her problem sets through in Chromium and checks the parts arrive in her order. **Gate.** |
| `equation_test.py` | Drives the equation drill in Chromium: what the typed-answer checker accepts and refuses, building an equation from pieces by tapping, and the chosen set surviving a reload. **Gate.** |
| `review_test.py` | Checks the four review modes on the Topics page: reviewing concepts shows no calculation anywhere, and every split drill can only draw its own kind. **Gate.** |
| `harvest.py` | Crops the figure out of each slide of a lecture PDF and encodes it for `images.json`. Standalone; not part of the build. |

---

## The checks, in order

```
python3 build.py && node test.js && node style_check.js && node render_test.js
node explain_check.js
python3 cite_check.py
python3 browser_test.py
python3 problemset_test.py
python3 equation_test.py
python3 review_test.py
```

The first line is the gate: it must be clean before the file goes anywhere. The
last three are run separately because two of them are reports rather than
pass/fail, and `cite_check.py` prints `SKIP` with its reason wherever the
lecture decks are not on hand.

`browser_test.py` needs Chromium and `PLAYWRIGHT_BROWSERS_PATH` pointing at it,
with a `playwright` Python package whose pinned Chromium build is the one
installed there: a newer package looks for a build it does not have and refuses
to launch, so pin it (`pip install playwright==<version>`) to match.
Every check reads the built filename out of `course.js`; none of them names the
course.

---

## Adding a lecture

1. **Add the lecture to `COURSE.lectures`** in `course.js`:

   ```js
   {id:'L05', deck:'IVBolus.pdf', label:'Module 2: IV bolus (14 Sep)',
    prof:'Mosley', exam:2, module:2},
   ```

2. **Write the questions** into a new `q<N>_module<N>.js` that declares its
   own `const Q_MODULE<N> = [...]`. The first question file also declares
   `const TOPICS = [...]` at the top. Add the filename to `DATA_FILES` in
   `build.py` before `qz_all.js`, and add the array to the concat in
   `qz_all.js`, which is what builds the single `QUESTIONS` array.

   A question must carry `id`, `prof`, `tier`, `topic`, `sub`, `concept`,
   `skill`, `stem` and `cite`, plus whatever its type needs, plus the fields the
   pool filters match on (`exam`, `module`, `lecture`).

3. **Add the topic and its subtopics to `TOPICS`** if the lecture opens new
   ones, each with the slide range it covers.

4. **Point a pool at it.** If the new lecture belongs to an exam pool that
   already exists — say `{module:2}` — nothing more is needed: the pool picks up
   the new questions and the marks weighting re-divides itself. If it needs its
   own pool, add one to that exam's `pools`.

5. Rebuild and run the checks. `test.js` reports any question whose topic, sub,
   professor, tier or skill is not one the manifest knows about.

---

## Pools, filters and the marks weighting

`COURSE.exams[*].pools` **is** the exam blueprint. Each pool claims a number of
marks and selects its questions with a filter object:

```js
pools: [
  {key:'m1',  name:'Module 1 — Kinetic orders', marks:8,  filter:{module:1}},
  {key:'m23', name:'Modules 2–3 — IV bolus',    marks:24, filter:{module:[2,3]}},
  {key:'old', name:'Carried forward',           marks:8,  filter:{tier:'old'}},
]
```

**How a filter matches.** Every key in the object is compared against the
question field of the same name. All keys must match. An array value means "one
of". So `{prof:'Mosley', tier:'new'}` needs both; `{lecture:['L03','L04']}`
takes either. Any question field can be filtered on — `exam`, `module`, `prof`,
`tier`, `lecture`, `topic` — because nothing in the resolver knows what those
words mean.

**A question belongs to one pool.** `poolOf(q)` returns the *first* pool whose
filter claims it, so two overlapping pools never double-count. A question that
matches no pool is off the blueprint and is worth zero marks; `test.js` reports
those.

**The weighting.** One question in a pool is worth

```
pool.marks ÷ (number of questions currently in that pool)
```

computed from the bank at runtime, not written down. So a pool supplying 24
marks from 30 questions makes each question worth 0.8 marks, and adding 30 more
questions to it re-divides the same 24 marks automatically. This is what "marks
at risk" in Weak spots means: a miss weighted by what that one question actually
stands for on the paper, with a guess counting half. It is why a topic with few
questions in a heavy pool sorts above a topic with many questions in a light
one.

**Drawing a paper.** The simulator gives each pool a share of `exam.questions`
in proportion to its marks (largest-remainder, so the shares add up exactly),
then draws that many from the pool, one question per concept before any concept
repeats, and never draws a `lowYield` question or both halves of a `dupOf`
pair. **If a pool cannot fill its share, it contributes what it has and the
paper says so on screen in marks** — "14 of 40 marks drawn, 26 not yet
coverable". Nothing is ever padded from another pool.

**A pool with no questions is a normal state, not a fault.** A blueprint
written for the whole exam names modules that have not been lectured yet. Those
pools sit empty, their marks land in the "not yet coverable" figure, the exam
front page, the paper and the result page all name them, and Weak spots shows
their card as *not yet coverable* rather than as 0 of 0 mastered. `test.js`
reports an empty pool as a **warning**, with the coverage line as the headline.

**Select-all allocation.** `exam.sata` is a target, not a promise. Each pool's
share of it is proportional to its marks, but capped by how many select-all
questions that pool actually holds and by how many places it has on the paper;
whatever the cap leaves over is handed to the pools that still have room. The
paper therefore carries `min(target, available)` — every select-all item the
bank can give — and the front page says so plainly when the target is out of
reach ("The blueprint asks for 4 select-all items and the bank holds 3, so the
paper carries 3"). `test.js` fails only when the paper carries fewer than
`min(target, available)`.

---

## Question types

A question with no `type` field is multiple choice, so an existing bank keeps
working untouched.

### Multiple choice (default)

```js
{id:'ord-1', prof:'Mosley', tier:'new', exam:1, module:1, lecture:'L01',
 topic:'orders', sub:'defn', concept:'zero-order-rate', skill:'recall',
 stem:'...',
 options:[{t:'...', correct:true, why:'...'}, {t:'...', correct:false, why:'...'}, ...],
 teach:'...', cite:'Introduction.pdf slides 4–6'}
```

Exactly one keyed option, at least three options, a `why` on every one. Add
`multi:true` for select-all: two or more keyed options, at least one distractor,
at least four options, graded all-or-nothing.

### `type:'numeric'`

```js
{id:'par-1', type:'numeric', ..., skill:'calc',
 stem:'...',
 units:'mg/L', answer:14.2857, tol:0.2,
 steps:[{k:'unit',    t:'Dose = 0.35 g × 1000 mg/g = 350 mg', why:'...'},
        {k:'setup',   t:'Vd = 0.35 L/kg × 70 kg = 24.5 L',    why:'...'},
        {k:'algebra', t:'C0 = Dose ÷ Vd = 350 mg ÷ 24.5 L',   why:'...'},
        {k:'round',   t:'C0 = 14.2857 mg/L',                  why:'...'}],
 teach:'...', cite:'...'}
```

The quiz renders a number box and a units label instead of options. The entry is
graded exactly as typed — the student's number is never rounded — and is correct
when `|entered − answer| ≤ tol`. The keyed answer is displayed to four decimal
places.

The comparison carries a relative slack of one part in a billion. Binary
floating point cannot hold most decimal tolerances exactly, so a student typing
the number sitting exactly on the stated boundary can otherwise produce a
difference that reads as `0.20000000000000018` against a tolerance of `0.2` and
be marked wrong for a rounding error the machine made. The slack is far below
any tolerance a question would set, so it cannot admit a genuinely wrong answer.

When it is wrong, the app asks **which kind of miss it was** in one click —
set-up, unit conversion, algebra or rounding — records that on the answer, and
only then reveals the working: each step's `t` (the line of work) above its
`why` (why that move, what each quantity is, how the units cancel). Weak spots
carries a panel totalling misses by kind, so a student losing marks to unit
conversion rather than to the subject can see exactly that.

`step.k` must be one of `setup`, `unit`, `algebra`, `round`. A numeric question
with no `steps`, no `units`, or a `tol` of 0 or missing is a `test.js` **error**.

### `type:'match'`

```js
{id:'ord-4', type:'match', ..., skill:'apply',
 stem:'Match each elimination process to the behaviour that identifies it.',
 left:['Zero order', 'First order', 'Capacity-limited'],
 right:['A constant amount leaves per unit time', '...', '...'],
 pairs:[{l:'Zero order', r:'A constant amount leaves per unit time', why:'...'}, ...],
 teach:'...', cite:'...'}
```

One select per left item, each offering **every** right value. Correct only when
every pair matches. The reveal lists each pair with its `why`. `test.js` checks
that every `pairs.l` is in `left`, every `pairs.r` is in `right`, no left item is
paired twice, and there is one pair per left item.

---

## Skills

`COURSE.skills` is the list of what a question can ask a student to *do*. Each
question carries `skill:'<id>'`. There is no keyword guessing: `skillOf(q)`
returns `q.skill` directly, falling back to the first skill in the list only so
the page still renders — and `test.js` reports any question with no skill as an
**error**. Weak spots reports accuracy per skill, so "which kind of thinking is
failing" is answerable.

---

## Course-specific tables left empty

Four tables are part of the engine but hold course content. Each is present,
empty, and commented with what belongs in it:

- `GLOSS` at the top of `views.js` — terms glossed once per question at first use.
- `WEIGHTY` in `explain_check.js` — terms that should be glossed; anything here
  that `GLOSS` does not cover is reported.
- `ALIASES`, `LECTURES`, `BARE_DECK`/`BARE_MAP` in `cite_check.py` — how a
  citation's spelling of a deck maps to the file on disk.
- `FOOTER_TOKENS` in `harvest.py` — the strings this course's slide master
  prints in the footer band.

---

## What this build does not carry

The reference implementation this was ported from was a medicinal-chemistry
drill and shipped a structure atlas, drawn SVG functional groups, side-by-side
structure comparisons, and the generators behind them. None of that is here: the
atlas view, `atlas.js`, `diagrams.js`, `rings.*`, `gen_atlas_q.py`, `mkimg.py`,
the `obj*.html` objective sheets and the chemistry-only CSS were all dropped.
