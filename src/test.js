/* Validate the built app: parse the script, check the question bank, exercise the SRS.
 *
 * Nothing here names the course. The output path, the blueprint pools, the
 * professors and the skills all come from course.js by way of the built page.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

/* The built file is named in course.js and nowhere else. */
const OUT = (() => {
  const src = fs.readFileSync(path.join(__dirname, 'course.js'), 'utf8');
  const m = src.match(/\boutput\s*:\s*['"]([^'"]+)['"]/);
  if (!m) { console.error('FAIL: course.js declares no output'); process.exit(1); }
  return '/mnt/user-data/outputs/' + m[1];
})();

const html = fs.readFileSync(OUT, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (scripts.length !== 1) { console.error('FAIL: expected 1 script block, got ' + scripts.length); process.exit(1); }
let code = scripts[0];

// strip only the final boot block, which needs a real DOM
const bootAt = code.lastIndexOf('   BOOT');
if (bootAt === -1) { console.error('FAIL: BOOT marker not found'); process.exit(1); }
code = code.slice(0, code.lastIndexOf('/* ===', bootAt));

// minimal DOM + storage stubs
const store = {};
const el = () => ({ innerHTML:'', textContent:'', classList:{toggle(){},add(){},remove(){},contains(){return false}},
                    setAttribute(){}, querySelectorAll(){return []}, onclick:null, dataset:{}, style:{}, click(){} });
const sandbox = {
  console,
  localStorage:{ getItem:k=>(k in store?store[k]:null), setItem:(k,v)=>{store[k]=String(v)}, removeItem:k=>{delete store[k]} },
  document:{ querySelector:el, querySelectorAll:()=>[], getElementById:el, createElement:el, body:el() },
  window:{ scrollTo(){} },
  prompt:()=> 'TestUser',
  alert:()=>{}, confirm:()=>true,
  setTimeout:(f)=>{ f(); return 0; }, clearTimeout(){}, setInterval:()=>0, clearInterval(){},
  Blob:function(){}, URL:{createObjectURL:()=>'', revokeObjectURL(){}}, FileReader:function(){},
  Date, Math, JSON, Object, Array, String, Number, Boolean, RegExp, Error, isNaN, parseInt, parseFloat
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
code += "\nglobalThis.__X={TERMS:typeof TERMS==='undefined'?[]:TERMS,TERM_QS:typeof TERM_QS==='undefined'?[]:TERM_QS,byId,EXTRAS:typeof EXTRAS==='undefined'?[]:EXTRAS,COURSE,EXAM,POOLS,TOTAL_MARKS,matchesPoolFilter,sataShares,poolDrawable,QUESTIONS,TOPICS,IMAGES,record,pickNext,st,score,drawN,drawMixed,EXAM_SATA,askProfile,markGuessed,setMissKind,isMulti,isMC,qType,gradeMulti,gradeNumeric,missDiagnosis,tolOf,parseNum,originOf,gradeMatch,gradeAnswer,correctSet,poolOf,poolKey,poolQuestions,poolShares,markWeight,skillOf,SKILLS,MISS_KINDS,blueprintCoverage,setActiveExam,CHAINS,CHAIN_OF,kindOf,ofKind,startChain,EQUATIONS,EQ_MUST,normEq,eqPlain,eqAccepts,eqCorrect,eqTokens,eqEquiv,eqRhs,mathHTML,prettyMath,teachParts,FRAC_RE,SHEET_LINES,SHEET_MISSING,SHEET_COLS,suPoolAll,suOptions,getDB:()=>DB};\n";
try { vm.runInContext(code, sandbox); }
catch (e) { console.error('FAIL: script threw at load — ' + e.message + '\n' + e.stack); process.exit(1); }

const X = sandbox.__X;
const { QUESTIONS, TOPICS, IMAGES, COURSE, EXAM, POOLS } = X;
let fails = 0, warns = 0;
const bad = m => { console.log('  FAIL  ' + m); fails++; };
const warn = m => { console.log('  warn  ' + m); warns++; };

console.log('\n=== 0. Course manifest ===');
console.log(`  ${COURSE.id} — ${COURSE.title} (${COURSE.short}), ns "${COURSE.ns}", output ${COURSE.output}`);
for (const f of ['id','title','short','ns','output'])
  if (!COURSE[f]) bad(`COURSE is missing ${f}`);
if (!Array.isArray(COURSE.professors) || !COURSE.professors.length) bad('COURSE.professors is empty');
if (!Array.isArray(COURSE.skills) || !COURSE.skills.length) bad('COURSE.skills is empty');
for (const s of COURSE.skills || [])
  if (!s.id || !s.label || !s.short) bad(`skill ${JSON.stringify(s)} needs id, label and short`);
if (!EXAM) bad('COURSE.activeExam does not name an exam');
else {
  console.log(`  active exam: ${EXAM.name} — ${EXAM.questions} questions, ${EXAM.minutes} min, ${POOLS.length} pool(s), ${X.TOTAL_MARKS} marks`);
  if (!EXAM.questions) bad('the active exam sets no question count');
  if (!EXAM.minutes) bad('the active exam sets no clock');
  if (!POOLS.length) bad('the active exam has no pools');
  for (const p of POOLS) {
    if (!p.key || !p.name) bad(`pool ${JSON.stringify(p)} needs a key and a name`);
    if (!p.marks) bad(`pool "${p.key}" claims no marks`);
    if (!p.filter || !Object.keys(p.filter).length) bad(`pool "${p.key}" has an empty filter, so it claims the whole bank`);
  }
  const keys = POOLS.map(p => p.key);
  if (new Set(keys).size !== keys.length) bad('two pools share a key');
}
/* Every exam can be chosen as the paper, so every blueprint has to add up,
   not only the default one. */
for (const e of COURSE.exams) {
  const sum = (e.pools || []).reduce((s, p) => s + (p.marks || 0), 0);
  if (sum !== e.questions) bad(`${e.name}: pool marks add to ${sum}, not its ${e.questions} questions`);
  else console.log(`  ok    ${e.name}: ${e.pools.length} pools, ${sum} marks = ${e.questions} questions`);
}

console.log('\n=== 0b. Pool filter resolver ===');
{
  const m = X.matchesPoolFilter;
  const q = {exam:2, module:3, prof:'Mosley', tier:'new', lecture:'L04', topic:'orders'};
  const cases = [
    [{exam:2}, true, 'single field'],
    [{exam:1}, false, 'single field, no match'],
    [{module:3}, true, 'module'],
    [{prof:'Mosley'}, true, 'professor'],
    [{prof:'Someone'}, false, 'professor, no match'],
    [{tier:'new'}, true, 'tier'],
    [{tier:'old'}, false, 'tier, no match'],
    [{lecture:['L03','L04']}, true, 'array value means one of'],
    [{lecture:['L01','L02']}, false, 'array value, no match'],
    [{prof:'Mosley', tier:'new'}, true, 'two keys, both match'],
    [{prof:'Mosley', tier:'old'}, false, 'two keys, one fails'],
    [{exam:2, module:3, prof:'Mosley', lecture:['L04']}, true, 'four keys'],
    [{}, true, 'empty filter matches everything'],
  ];
  let bads = 0;
  for (const [f, want, label] of cases)
    if (m(q, f) !== want) { bad(`filter ${JSON.stringify(f)} should be ${want} (${label})`); bads++; }
  if (!bads) console.log(`  ok    all ${cases.length} filter forms resolve correctly (exam, module, prof, tier, lecture list, combinations)`);
}

console.log('\n=== 1. Question bank integrity ===');
console.log(`  ${QUESTIONS.length} questions, ${TOPICS.length} topics, ${Object.keys(IMAGES).length} images`);

const ids = new Set();
const topicIds = new Set(TOPICS.map(t=>t.id));
const subIds = new Set(TOPICS.flatMap(t=>(t.subs||[]).map(s=>t.id+'/'+s.id)));
const skillIds = new Set(COURSE.skills.map(s=>s.id));
for (const q of QUESTIONS.concat(X.EXTRAS)) {   // extra practice is held to the same rules
  const kind = X.qType(q);
  if (ids.has(q.id)) bad(`duplicate question id: ${q.id}`);
  ids.add(q.id);
  for (const f of ['prof','tier','topic','sub','concept','stem','cite'])
    if (!q[f]) bad(`${q.id}: missing ${f}`);
  if (!topicIds.has(q.topic)) bad(`${q.id}: unknown topic "${q.topic}"`);
  if (!subIds.has(q.topic+'/'+q.sub)) bad(`${q.id}: unknown sub "${q.topic}/${q.sub}"`);
  if (!COURSE.professors.includes(q.prof)) bad(`${q.id}: prof "${q.prof}" is not in COURSE.professors`);
  if (!['new','old'].includes(q.tier)) bad(`${q.id}: bad tier "${q.tier}"`);
  // A question with no skill still renders, under the first skill, but the
  // Weak spots split is then wrong, so it is an error rather than a warning.
  if (!q.skill) bad(`${q.id}: no skill field (falls back to "${COURSE.skills[0].id}")`);
  else if (!skillIds.has(q.skill)) bad(`${q.id}: skill "${q.skill}" is not in COURSE.skills`);
  if (!['mc','numeric','match'].includes(kind)) bad(`${q.id}: unknown type "${q.type}"`);
  // A slide_* image is rendered by slides.py from the decks, which are not in
  // the repository. Its absence means the build was made without them, not
  // that the bank is wrong; any other missing figure is a fault.
  for (const p of (Array.isArray(q.teach) ? q.teach : [])) {
    if (p && p.fig && !IMAGES[p.fig]) bad(`${q.id}: concept block names missing figure "${p.fig}"`);
  }
  if (q.teachImg && !IMAGES[q.teachImg]) {
    if (/^slide_/.test(q.teachImg)) warn(`${q.id}: slide image "${q.teachImg}" not in this build`);
    else bad(`${q.id}: references missing teachImg "${q.teachImg}"`);
  }
  if (q.img && !IMAGES[q.img]) bad(`${q.id}: references missing image "${q.img}"`);

  if (kind === 'mc') {
    if (!q.options) { bad(`${q.id}: missing options`); continue; }
    const correct = q.options.filter(o=>o.correct);
    if (q.multi) {
      if (correct.length < 2) bad(`${q.id}: select-all with ${correct.length} correct option(s) (needs 2 or more)`);
      if (correct.length === q.options.length) bad(`${q.id}: select-all with no distractor`);
      if (q.options.length < 4) bad(`${q.id}: select-all with only ${q.options.length} options`);
    } else if (correct.length !== 1) bad(`${q.id}: ${correct.length} correct options (must be exactly 1)`);
    if (q.options.length < 3) bad(`${q.id}: only ${q.options.length} options`);
    if (q.options.length > 10) bad(`${q.id}: ${q.options.length} options, more than the option letters can label`);
    for (const o of q.options) {
      if (!o.t) bad(`${q.id}: option with no text`);
      if (!o.why) bad(`${q.id}: option "${String(o.t).slice(0,30)}" has no explanation`);
      if (o.why && o.why.length < 25) warn(`${q.id}: very short explanation on "${String(o.t).slice(0,30)}"`);
    }
  } else if (kind === 'numeric') {
    // A numeric question with no worked steps teaches nothing when it is
    // missed; with no units it cannot be marked or displayed; with no
    // tolerance every answer but the exact keyed float is wrong.
    if (typeof q.answer !== 'number' || !isFinite(q.answer)) bad(`${q.id}: numeric answer is not a number`);
    if (!q.units) bad(`${q.id}: numeric question with no units`);
    if (!q.tol || !(q.tol > 0)) bad(`${q.id}: numeric question with a tolerance of ${q.tol} (must be greater than 0)`);
    if (!Array.isArray(q.steps) || !q.steps.length) bad(`${q.id}: numeric question with no steps`);
    for (const s of q.steps || []) {
      if (!['setup','unit','algebra','round'].includes(s.k)) bad(`${q.id}: step kind "${s.k}" is not setup/unit/algebra/round`);
      if (!s.t) bad(`${q.id}: a step has no line of work`);
      if (!s.why) bad(`${q.id}: step "${String(s.t).slice(0,30)}" has no why`);
    }
    if (q.options) warn(`${q.id}: numeric question also carries options, which are ignored`);
  }
  if (kind !== 'numeric' && q.steps !== undefined) {
    // a concept question may carry the working it rests on; the same shape as a numeric one's
    if (!Array.isArray(q.steps) || !q.steps.length) bad(`${q.id}: steps on a concept question must be a non-empty array`);
    for (const s of q.steps || []) {
      if (!['setup','unit','algebra','round'].includes(s.k)) bad(`${q.id}: step kind "${s.k}" is not setup/unit/algebra/round`);
      if (!s.t || !s.why) bad(`${q.id}: a step on a concept question lacks its line or its why`);
    }
  } else if (kind === 'match') {
    if (!Array.isArray(q.left) || q.left.length < 2) bad(`${q.id}: match question needs at least 2 left items`);
    if (!Array.isArray(q.right) || q.right.length < 2) bad(`${q.id}: match question needs at least 2 right items`);
    if (!Array.isArray(q.pairs) || !q.pairs.length) bad(`${q.id}: match question with no pairs`);
    if ((q.pairs||[]).length !== (q.left||[]).length) bad(`${q.id}: ${(q.pairs||[]).length} pairs for ${(q.left||[]).length} left items`);
    const seenL = new Set();
    for (const p of q.pairs || []) {
      if (!(q.left||[]).includes(p.l)) bad(`${q.id}: pair left "${p.l}" is not in left`);
      if (!(q.right||[]).includes(p.r)) bad(`${q.id}: pair right "${p.r}" is not in right`);
      if (seenL.has(p.l)) bad(`${q.id}: left item "${p.l}" is paired twice`);
      seenL.add(p.l);
      if (!p.why) bad(`${q.id}: pair "${p.l}" has no why`);
    }
  }
}

console.log('\n=== 1b. Question types render-ready ===');
{
  const byKind = {mc:0, numeric:0, match:0, multi:0};
  QUESTIONS.forEach(q => { byKind[X.qType(q)]++; if (X.isMulti(q)) byKind.multi++; });
  console.log(`  ${byKind.mc} multiple choice (${byKind.multi} select-all), ${byKind.numeric} numeric, ${byKind.match} match`);
  // every question names where it comes from
  for (const q of QUESTIONS.concat(X.EXTRAS)) if (X.originOf(q) === 'Other') bad(`${q.id}: no origin can be read from its id or citation (${q.cite})`);
  // a number typed with its unit reads as the number; anything else reads as none
  for (const [typed, want] of [['2.6 hr', 2.6], ['188.2 (mg/L)hr', 188.2], ['3.13 L/hr', 3.13], ['55%', 55], ['0.17325 hr⁻¹', 0.17325],
                               ['1,000 mg', 1000], ['2.6e3', 2600], ['-0.2', -0.2], ['0.17 hr-1', 0.17], ['0.17 h-1', 0.17], ['0.17 hr^-1', 0.17],
                               ['0.17 /hr', 0.17], ['0.17 1/hr', 0.17], ['12 mg/L*hr', 12], ['=3.13', NaN], ['3..13', NaN], ['2.6 hr 3', NaN], ['abc', NaN], ['', NaN]]) {
    const got = X.parseNum(typed);
    if (Number.isNaN(want) ? !Number.isNaN(got) : got !== want) bad(`parseNum(${JSON.stringify(typed)}) read ${got}, wanted ${want}`);
  }
  // grading, exercised directly rather than assumed
  for (const q of QUESTIONS.concat(X.EXTRAS).filter(q => X.qType(q) === 'numeric')) {
    // graded to the item's own tolerance or 2% of the key, whichever is wider (her Canvas margin)
    const t = X.tolOf(q);
    if (t < q.tol) bad(`${q.id}: the graded tolerance is tighter than the item's own`);
    if (!X.gradeNumeric(q, String(q.answer))) bad(`${q.id}: the keyed answer does not grade as correct`);
    if (!X.gradeNumeric(q, String(q.answer + t))) bad(`${q.id}: an answer exactly at the tolerance is graded wrong`);
    if (X.gradeNumeric(q, String(q.answer + t * 2 + 1))) bad(`${q.id}: an answer well outside the tolerance is graded right`);
    if (X.gradeNumeric(q, '')) bad(`${q.id}: a blank entry is graded right`);
    if (X.gradeNumeric(q, 'abc')) bad(`${q.id}: an unreadable entry is graded right`);
  }
  for (const q of QUESTIONS.filter(q => X.qType(q) === 'match')) {
    const full = {}; q.pairs.forEach(p => full[p.l] = p.r);
    if (!X.gradeMatch(q, full)) bad(`${q.id}: the keyed pairing does not grade as correct`);
    if (q.pairs.length > 1) {
      const partial = Object.assign({}, full); delete partial[q.pairs[0].l];
      if (X.gradeMatch(q, partial)) bad(`${q.id}: an incomplete pairing is graded right`);
    }
    if (X.gradeMatch(q, {})) bad(`${q.id}: an empty pairing is graded right`);
  }
  if (!byKind.mc) warn('the bank holds no multiple-choice questions');
}

console.log('\n=== 2. Exam blueprint coverage ===');
{
  const shares = X.poolShares();
  const cov = X.blueprintCoverage();

  /* The headline. A blueprint that names material the course has not lectured
     yet is the normal state of a drill built mid-semester, so this line, not a
     list of failures, is what that condition reads as. */
  console.log(`  blueprint coverage: ${cov.drawn} of ${X.TOTAL_MARKS} marks drawable, ${cov.missing} not yet coverable`);
  if (cov.drawn + cov.missing !== X.TOTAL_MARKS)
    warn(`coverage rounds to ${cov.drawn + cov.missing} rather than ${X.TOTAL_MARKS} marks`);

  for (const {pool, want} of shares) {
    const have = X.poolQuestions(pool).length;
    const w = have ? (pool.marks / have) : 0;
    console.log(`  ${String(pool.key).padEnd(10)} ${String(pool.marks).padStart(3)} marks · needs ${String(want).padStart(3)} q · bank holds ${String(have).padStart(4)} · ${w.toFixed(3)} marks per question`);
    // An empty pool is a blueprint entry the bank cannot cover yet, not a
    // fault: Exam 2 names Modules 6–9 and those lectures have not happened.
    // The exam simulator states the missing marks on screen and never pads
    // from another pool, so the drill does not overstate its coverage.
    if (!have) warn(`pool "${pool.key}" is not yet coverable — no questions in the bank answer to its ${pool.marks} marks`);
    else if (have < want) warn(`pool "${pool.key}" holds ${have} questions for ${want} places on the paper`);
  }

  /* Which questions the active blueprint does not claim.
     A question belonging to THIS exam that no pool claims is a real fault: it
     is examinable, it will be drilled, and it is weighted at zero marks. A
     question belonging to another exam matching no pool of this one is simply
     not on this paper, which is what the blueprint says. */
  const activeId = EXAM ? EXAM.id : null;
  const unclaimed = QUESTIONS.filter(q => !X.poolOf(q));
  const mine = unclaimed.filter(q => q.exam === activeId);
  const others = unclaimed.filter(q => q.exam !== activeId);
  if (mine.length)
    bad(`${mine.length} question(s) belong to ${EXAM.name} but match no pool on its blueprint, so they are weighted at 0 marks: ${
      mine.map(q => q.id).join(', ')}`);
  else console.log(`  ok    every ${EXAM ? EXAM.name : 'active exam'} question is claimed by a blueprint pool`);
  if (others.length) {
    const byExam = {};
    others.forEach(q => { byExam[q.exam === undefined ? 'no exam field' : 'exam ' + q.exam] = (byExam[q.exam === undefined ? 'no exam field' : 'exam ' + q.exam] || 0) + 1; });
    console.log(`  outside the active blueprint: ${others.length} question(s) not on the ${EXAM.name} paper (${
      Object.entries(byExam).map(([k, v]) => `${v} from ${k}`).join(', ')}) — still drillable, worth 0 marks on this paper`);
    const noExam = others.filter(q => q.exam === undefined);
    if (noExam.length) bad(`${noExam.length} question(s) carry no exam field at all: ${noExam.slice(0,8).map(q=>q.id).join(', ')}`);
  }
}

console.log('\n=== 3. Concept spread per topic ===');
for (const t of TOPICS) {
  const pool = QUESTIONS.filter(q=>q.topic===t.id);
  const cs = new Set(pool.map(q=>q.concept));
  console.log(`  ${t.id.padEnd(10)} ${String(pool.length).padStart(3)} q / ${String(cs.size).padStart(3)} concepts  (${t.prof||'—'})`);
  if (!pool.length) bad(`topic "${t.id}" has no questions`);
  for (const s of (t.subs||[])) {
    const sp = pool.filter(q=>q.sub===s.id);
    if (!sp.length) warn(`subtopic "${t.id}/${s.id}" (${s.name}) has no questions`);
  }
}

console.log('\n=== 4. Spaced repetition rules ===');
const { record, pickNext, st, score, markGuessed } = X;
X.askProfile(false);
const DB = X.getDB;

// The scheduling rules are stated in questions-answered terms, so this section
// runs in cram mode whatever the course's default pace is, and draws from the
// whole bank so a small topic cannot starve the pool.
X.getDB().settings.mode = 'cram';
const pool = QUESTIONS.slice();
const q0 = pool[0];
record(q0, 'wrong');
let immediate = pickNext(pool, q0.id);
if (immediate && immediate.concept === q0.concept)
  bad('missed concept returned immediately (rule 2 requires a gap)');
else console.log('  ok    missed concept is held back rather than repeated at once');

for (let i=0;i<6;i++){ const n = pickNext(pool.filter(q=>q.concept!==q0.concept), null); if(n) record(n,'correct'); }
let seen = false;
for (let i=0;i<40;i++){ const n = pickNext(pool, null); if(!n) break; if(n.concept===q0.concept){seen=true;break;} record(n,'correct'); }
if (!seen) bad('missed concept never resurfaced (rule 2 requires continued review)');
else console.log('  ok    missed concept resurfaces after other questions');

const c = st(q0.concept);
const before = c.box;
record(q0,'correct'); record(q0,'correct'); record(q0,'correct');
if (st(q0.concept).box <= before) bad('box did not advance after repeated correct answers (rules 1, 7)');
else console.log(`  ok    box advanced ${before} -> ${st(q0.concept).box} with repeated correct answers`);

record(q0,'wrong');
if (st(q0.concept).box !== 0) bad('a miss did not reset the concept to active review (rule 4)');
else console.log('  ok    a later miss resets the concept to active review');

const q1 = QUESTIONS.find(q=>q.concept!==q0.concept);
if (q1) {
  record(q1,'correct'); X.getDB().qn += 9; record(q1,'correct'); X.getDB().qn += 21;   // box 2 first
  record(q1,'guessed');
  const g = st(q1.concept);
  if (g.streak !== 0) bad('a guess advanced the streak (rule 3)');
  else if (g.box !== 0) bad(`a guess on a learned concept left box at ${g.box}, not 0 (rule 3)`);
  else {
    X.getDB().qn += 4;
    const sc = score(q1);
    if (!sc || sc.tier !== 4) bad(`a guessed concept scored tier ${sc ? sc.tier : 'null'}; it must be tier 4, above never-seen (rule 3/5)`);
    else console.log('  ok    a guess resets the concept to unresolved and outranks never-seen material');
  }
}
const q2 = QUESTIONS.find(q=>q.concept!==q0.concept && (!q1 || q.concept!==q1.concept));
if (q2) {
  record(q2,'correct', 0, 1200);
  const flipped = markGuessed(q2);
  const g2 = st(q2.concept), lastA = X.getDB().answers[X.getDB().answers.length-1];
  if (!flipped || lastA.result !== 'guessed' || g2.box !== 0 || g2.guessed !== 1)
    bad('marking a correct answer as a guess did not rewrite the log and reset the box');
  else if (lastA.picked !== 0 || lastA.ms !== 1200)
    bad('the answer log lost the picked option or the time taken');
  else console.log('  ok    "I guessed that one" rewrites the log, resets the box, keeps picked and ms');
}

console.log('\n=== 4b. Numeric miss kinds ===');
{
  const nq = QUESTIONS.find(q => X.qType(q) === 'numeric');
  if (!nq) warn('the bank holds no numeric question, so miss-kind logging is untested');
  else {
    X.getDB().concepts = {}; X.getDB().answers = []; X.getDB().qn = 0;
    record(nq, 'wrong', 'not the answer', 900);
    const kinds = X.MISS_KINDS.map(k => k.id);
    if (JSON.stringify(kinds) !== JSON.stringify(['setup','unit','algebra','round']))
      bad(`miss kinds are ${kinds.join(', ')}, expected setup, unit, algebra, round`);
    const ok = X.setMissKind(nq, 'unit');
    const last = X.getDB().answers[X.getDB().answers.length-1];
    if (!ok || last.missKind !== 'unit') bad('naming the kind of miss did not reach the answer log');
    else console.log('  ok    a missed calculation records which kind of miss it was');
    /* what the wrong number says: a synthetic question with two givens whose product is the key */
    const dq = {id:'diag-probe', stem:'A drug has an average steady-state concentration of 42.37 mg/L and an apparent VD of 17.03 L. Calculate the amount of drug in the body.', answer:721.6, tol:2, units:'mg',
                steps:[{k:'setup', t:'D = Cavg × VD'}, {k:'algebra', t:'an amount of 350 mg on the way (an intermediate for the probe)'}]};
    const dx = (e) => (X.missDiagnosis(dq, e)[0] || {}).kind || 'none';
    const want = [['2.49', 'algebra'], ['721600', 'unit'], ['0.7216', 'unit'], ['42.37', 'setup'], ['350', 'setup'], ['0.001386', 'algebra'], ['500', 'setup'], ['43300', 'unit'], ['700', 'round'], ['721.6', 'none'], ['nonsense', 'none']];
    const off = want.filter(([e, k]) => dx(e) !== k).map(([e, k]) => `${e}→${dx(e)} (expected ${k})`);
    if (off.length) bad('the wrong-number diagnosis misreads: ' + off.join('; '));
    else console.log('  ok    a wrong number is read for the slip behind it (givens swapped, unit factor, reciprocal, ln 2, stopped early, near miss)');
    const dtext = X.missDiagnosis(dq, '2.49')[0].text;
    if (!/42\.37 ÷ 17\.03/.test(dtext) || !/42\.37 × 17\.03/.test(dtext)) bad('the diagnosis does not quote the two givens and both operations: ' + dtext);
    let keyed = 0; for (const q of QUESTIONS.filter(q => X.qType(q) === 'numeric')) if (X.missDiagnosis(q, String(q.answer)).length) keyed++;
    if (keyed) bad(`${keyed} keyed answers are diagnosed as slips`);
    record(nq, 'wrong', '2.49', 900);
    X.setMissKind(nq, 'setup', 'algebra');
    const last2 = X.getDB().answers[X.getDB().answers.length-1];
    if (last2.missSuggest !== 'algebra' || last2.missKind !== 'setup') bad('the suggested kind is not kept beside the chosen kind');
    record(nq, 'correct', String(nq.answer), 900);
    if (X.setMissKind(nq, 'unit')) bad('a correct answer accepted a miss kind');
    else console.log('  ok    a correct answer takes no miss kind');
  }
}

console.log('\n=== 5. Exam simulation draw ===');
{
  const shares = X.poolShares();
  const totalWant = shares.reduce((s,o)=>s+o.want,0);
  if (totalWant !== EXAM.questions) bad(`pool shares add to ${totalWant}, not ${EXAM.questions}`);
  else console.log(`  ok    pool shares add to the paper size (${totalWant})`);

  const sataPlan = X.sataShares(shares);
  function drawTest(){
    return shares.map(({pool, want}, i) => {
      const src = X.poolDrawable(pool);
      return X.drawMixed(src, Math.min(want, src.length), sataPlan.per[i]);
    });
  }
  const parts = drawTest();
  const paper = [].concat(...parts);
  const avail = shares.reduce((s,o)=> s + Math.min(o.want, X.poolDrawable(o.pool).length), 0);
  console.log(`  drew ${parts.map(p=>p.length).join(' + ')} = ${paper.length} (of ${EXAM.questions} on the blueprint; ${avail} available in the bank)`);
  if (paper.length !== avail) bad(`the draw produced ${paper.length} questions, but ${avail} are available`);
  if (paper.length > EXAM.questions) bad('the draw produced more questions than the paper holds');
  const dupes = new Set(); let dupCount=0;
  paper.forEach(q=>{ if(dupes.has(q.id)) dupCount++; dupes.add(q.id); });
  if (dupCount) bad(`${dupCount} duplicate questions on one exam paper`);
  else console.log('  ok    no duplicate questions on a single paper');

  const allIds = new Set(QUESTIONS.map(q=>q.id));
  QUESTIONS.filter(q=>q.dupOf && !allIds.has(q.dupOf)).forEach(q=>bad(`${q.id} dupOf points at missing ${q.dupOf}`));
  { let clash=0;
    for(let k=0;k<20;k++){
      const p = [].concat(...drawTest());
      const on = new Set(p.map(q=>q.id));
      p.forEach(q=>{ if(q.dupOf && on.has(q.dupOf)) clash++; if(q.lowYield) bad(`${q.id} is lowYield and reached the paper`); });
      if (p.length !== avail) { bad('a repeated draw broke the paper shape'); break; }
    }
    if(clash) bad(`${clash} dupOf pairs drawn together across 20 papers`);
    else console.log('  ok    20 repeated draws keep the shape and never pair a dupOf partner');
  }

  /* Select-all items. The blueprint asks for EXAM.sata of them; the bank can
     only give what it holds, capped by each pool's places on the paper. The
     paper must carry min(target, available) — every one it can — and the run
     says so plainly when the target is out of reach. */
  const nSata = paper.filter(X.isMulti).length;
  const bankSata = shares.map(({pool}) => X.poolDrawable(pool).filter(X.isMulti).length);
  const possible = sataPlan.available;
  console.log(`  select-all on the paper: ${nSata} (target ${X.EXAM_SATA}, available ${possible}; bank holds ${bankSata.join(' / ')} per pool)`);
  if (nSata < Math.min(X.EXAM_SATA, possible))
    bad(`paper carries ${nSata} select-all items when ${Math.min(X.EXAM_SATA, possible)} were available`);
  else if (possible < X.EXAM_SATA)
    console.log(`  ok    the paper carries all ${nSata} select-all items the bank holds; the blueprint asks for ${X.EXAM_SATA}, so ${X.EXAM_SATA - possible} cannot be drawn until more are written`);
  else
    console.log('  ok    the paper carries every select-all item the blueprint asks for');
}

console.log('\n=== 5b. Choosing another paper ===');
{
  const was = EXAM.id;
  for (const e of COURSE.exams) {
    X.setActiveExam(e.id);
    const shares = X.poolShares();
    const want = shares.reduce((s, o) => s + o.want, 0);
    const drawn = shares.reduce((s, o) => s + Math.min(o.want, X.poolDrawable(o.pool).length), 0);
    if (want !== e.questions) bad(`${e.name}: shares add to ${want}, not ${e.questions}`);
    else console.log(`  ok    ${e.name}: ${shares.length} pools share ${want} places; the bank can fill ${drawn}`);
  }
  X.setActiveExam(was);
}

console.log('\n=== 5c. Problem sets ===');
{
  const byId = Object.fromEntries(X.QUESTIONS.map(q => [q.id, q]));
  const seen = new Map();
  for (const c of X.CHAINS) {
    const miss = c.parts.filter(id => !byId[id]);
    if (miss.length) bad(`problem set "${c.id}" names ${miss.length} question(s) that do not exist: ${miss.join(', ')}`);
    if (c.parts.length < 2) bad(`problem set "${c.id}" has ${c.parts.length} part(s); a set she asks in parts needs at least two`);
    for (const id of c.parts) {
      if (seen.has(id)) bad(`question ${id} is listed in both "${seen.get(id)}" and "${c.id}"`);
      seen.set(id, c.id);
      const q = byId[id];
      if (!q) continue;
      /* A set is one vignette worked through, so its parts must come from the
         one module, and each must be answered with a number: a set whose parts
         drift across modules is two problems filed as one. */
      if (q.module !== c.module) bad(`${id} is module ${q.module} but sits in problem set "${c.id}", declared module ${c.module}`);
      /* A worksheet is reproduced as she handed it out, so its conceptual parts
         (the renal mechanism, whether a tablet is enough) stay in it. A lecture
         example worked in parts is calculation only. */
      if (X.kindOf(q) !== 'calc' && (c.src || 'example') === 'example')
        bad(`${id} is a concept question and cannot be a part of problem set "${c.id}"`);
      if (c.src && !['example', 'practice', 'inclass', 'homework', 'review', 'extra'].includes(c.src))
        bad(`problem set "${c.id}" has an unknown src "${c.src}"`);
    }
    if (!c.name || !c.setup) bad(`problem set "${c.id}" is missing a name or its vignette line`);
  }
  const calcs = X.ofKind(X.QUESTIONS, 'calc').length;
  console.log(`  ok    ${X.CHAINS.length} problem sets, ${seen.size} of ${calcs} calculations in one`);
  const sizes = X.CHAINS.map(c => c.parts.length);
  console.log(`  ok    every part resolves, appears once, and shares its set's module (${Math.min(...sizes)} to ${Math.max(...sizes)} parts each)`);
  /* CHAIN_OF is what lets a part met on its own name the set it came from. */
  const wrong = X.CHAINS.filter(c => c.parts.some((id, i) =>
    !X.CHAIN_OF[id] || X.CHAIN_OF[id].chain.id !== c.id || X.CHAIN_OF[id].step !== i + 1));
  if (wrong.length) bad(`${wrong.length} problem set(s) disagree with the part index built from them`);
  else console.log('  ok    every part knows which set it belongs to and its place in it');
}

console.log('\n=== 5d. Equations ===');
{
  const E = X.EQUATIONS;
  const ids = new Set(E.map(e => e.id));
  if (ids.size !== E.length) bad('two equations share an id');
  for (const e of E) {
    for (const f of ['name', 'lhs', 'typed', 'cite', 'holds'])
      if (!e[f]) bad(`equation "${e.id}" has no ${f}`);
    if (!Array.isArray(e.tokens) || !e.tokens.length) bad(`equation "${e.id}" has no pieces to build from`);
    if (!Array.isArray(e.symbols) || !e.symbols.length) bad(`equation "${e.id}" names no symbols`);
    if (!['yes', 'no', 'absent'].includes(e.sheet)) bad(`equation "${e.id}" has sheet "${e.sheet}"`);
    /* The two exercises must key the same equation. If the pieces joined up do
       not read as the canonical typed answer, a student who builds it right is
       told they typed it wrong, or the reverse. */
    const built = X.eqPlain(e.lhs) + ' = ' + X.eqPlain(e.tokens.join(' '));
    if (!X.eqCorrect(e, built))
      bad(`equation "${e.id}": its pieces build ${X.normEq(built)}, which its typed form does not accept`);
    /* A lure that is one of the equation's own pieces is not a lure: placing it
       still gives the right answer. */
    const own = new Set(e.tokens.map(t => X.normEq(X.eqPlain(t))));
    for (const l of (e.lures || []))
      if (own.has(X.normEq(X.eqPlain(l))))
        bad(`equation "${e.id}": the lure ${X.eqPlain(l)} is one of its own pieces`);
    if ((e.lures || []).length < 2) bad(`equation "${e.id}" offers fewer than two wrong pieces`);
    /* The stacked display is only a picture of the equation, so it is held to
       the typed form symbol by symbol. Brackets are set aside, because a
       fraction bar does the grouping a bracket does on one line. */
    if (e.disp) {
      const blind = t => X.normEq(X.eqPlain(t)).replace(/[()]/g, '');
      const shown = blind(X.eqPlain(e.lhs) + '=' + e.disp);
      if (![e.typed, ...(e.also || [])].some(f => blind(f) === shown))
        bad(`equation "${e.id}": its stacked display reads ${shown}, which none of its keyed forms says`);
      if (!X.mathHTML(e.disp).includes('frac') && e.disp.includes('{{'))
        bad(`equation "${e.id}": a fraction token in its display did not render`);
    }
  }
  console.log(`  ok    ${E.length} equations, ${E.filter(e => e.must).length} of them ones she said to memorise`);
  console.log('  ok    every equation builds from its pieces to the form it keys when typed');
  console.log('  ok    no lure duplicates a piece of its own equation');

  /* A CONTROL ON THE CHECKER. The comparison folds away case, spacing, the
     several dashes and implicit multiplication, which is what makes it usable.
     Fold away one thing too many and it starts accepting an inverted ratio or a
     flipped sign, and the drill would then teach the wrong equation while every
     other check here still passed. These pairs must stay apart. */
  const mustDiffer = [
    ['t1/2 = 0.693/k',  't1/2 = k/0.693'],
    ['C = C0*e^(-kt)',  'C = C0*e^(kt)'],
    ['Css = R/Cl',      'Css = Cl/R'],
    ['tmax = ln(ka/k)/(ka-k)', 'tmax = ln(k/ka)/(ka-k)'],
    ['ClH = (1-fe)*ClT', 'ClH = fe*ClT'],
    ['DL = R/k',        'DL = R*k'],
    ['t1/2 = C0/2k',    't1/2 = 2*C0/k'],
    ['IBW = 45.5 + 2.3*(h-60)', 'IBW = 50 + 2.3*(h-60)'],
    /* Implicit multiplication makes this the easiest pair to lose: dividing by
       72 and then multiplying by SCr is not dividing by their product. */
    ['CrCl = (140-age)(IBW)/(72*SCr)', 'CrCl = (140-age)(IBW)/72*SCr'],
    ['Css = R/(k*VD)',  'Css = R/k*VD'],
    /* Module 6: the trough carries e^-kτ on top, and the n-dose term carries τ,
       not the t of the final exponential. */
    ['Cmin = C0*e^(-k*tau)/(1-e^(-k*tau))', 'Cmin = C0/(1-e^(-k*tau))'],
    ['Cp = D0/VD*(1-e^(-n*k*tau))/(1-e^(-k*tau))*e^(-kt)', 'Cp = D0/VD*(1-e^(-n*k*t))/(1-e^(-k*tau))*e^(-kt)'],
  ];
  for (const [a, b] of mustDiffer)
    if (X.normEq(a) === X.normEq(b)) bad(`the equation checker cannot tell "${a}" from "${b}"`);
  /* And the other way: these spellings of one equation must all agree, or a
     student loses a correct answer to a capital letter. */
  const mustAgree = [
    ['t1/2 = 0.693/k', 'T\u00bd = 0.693 \u00f7 K', 't 1/2=.693/k', 'thalf = 0.693/k'],
    ['Cl = k*VD', 'Cl = kVD', 'CL = K \u00d7 V_D', 'cl=k\u00b7vd'],
    ['C = C0*e^(-kt)', 'C = C0e^-kt', 'c = c0*e**(\u2212kt)'],
    ['Cmax = C0/(1-e^(-k*tau))', 'Cmax = C0/(1 - e^(-k\u03c4))', 'cmax=c0/(1-e^-k tau)'],
  ];
  for (const forms of mustAgree) {
    const n = new Set(forms.map(f => X.normEq(f)));
    if (n.size !== 1) bad(`the equation checker reads these as different: ${forms.join('  |  ')}`);
  }
  console.log(`  ok    the checker separates ${mustDiffer.length} pairs it must not confuse, `
    + `and joins ${mustAgree.reduce((s, f) => s + f.length, 0)} spellings it must not split`);

  /* The algebraic comparison. Each row is an equation id, spellings a student
     types that are the same equation, and spellings that are a different one.
     Both lists are held: loosen the reader until VD*k passes and it must still
     reject VD/k. */
  const algebra = [
    ['cl-k-vd',   ['Cl = VD*k', 'Cl = VDk', 'CL = k x VD', 'clearance = k*VD', 'ClT = VD k'],
                  ['Cl = k/VD', 'Cl = VD/k', 'Cl = k+VD']],
    ['thalf-first', ['t1/2 = ln2/k', 'half-life = 0.693/k', 't1/2 = ln(2)/k', 't1/2 = 0.69/k'],
                  ['t1/2 = k/0.693', 't1/2 = 0.693k', 't1/2 = 0.5/k']],
    ['crcl',      ['CrCl = (140-age)*IBW/(72*SCr)', 'CrCl = (140-age)(IBW)/72(SCr)', 'CrCl = [(140-age)(IBW)]/(72)(SCr)',
                   'CrCl = IBW(140-age)/(72 SCr)', 'CrCl = (140 - age) x IBW / (72 x SCr)'],
                  ['CrCl = (140-age)(IBW)/72*SCr', 'CrCl = (140+age)(IBW)/(72*SCr)', 'CrCl = (140-age)/(72*SCr*IBW)']],
    ['ibw-male',  ['IBW = 50 + 2.3(h-60)', 'IBW = 50 + 2.3*(inches over 60)', 'IBW = 50 + 2.3 x (height in inches - 60)', 'IBW = 2.3(in-60) + 50'],
                  ['IBW = 45.5 + 2.3(h-60)', 'IBW = 50 - 2.3(h-60)', 'IBW = 50 + 2.3h - 60']],
    ['cmax-ss',   ['Cmax = C0/(1-e^(-k*tau))', 'Cmax = (D0/VD)/(1-e^-ktau)', 'Cmax = C0/(1-e^-kT)', 'Cmax = C0 (1-e^-ktau)^-1'],
                  ['Cmax = C0(1-e^-ktau)', 'Cmax = C0/(1-e^ktau)', 'Cmax = C0/(1+e^-ktau)', 'Cmax = C0e^-ktau/(1-e^-ktau)', 'Cmax = C0/(1-e^-kt)']],
    ['cavg-ss',   ['Cavg = FD0/(VD k tau)', 'Cavg = F D0 / Cl tau', 'Cavg = FD0/(ClT*tau)', 'Cavg = D0F/(kVDtau)'],
                  ['Cavg = FD0/(VD tau)', 'Cavg = FD0 k/tau', 'Cavg = (Cmax+Cmin)/2', 'Cavg = D0/(Cl*tau)']],
    ['tmax',      ['tmax = ln(ka/k)/(ka-k)', 'tmax = 2.3 log(ka/k)/(ka-k)', 'tmax = (ln ka - ln k)/(ka-k)'],
                  ['tmax = ln(k/ka)/(ka-k)', 'tmax = ln(ka/k)/ka-k', 'tmax = ln(ka/k)/(k-ka)']],
    ['oral-cp',   ['Cp = FkaD0/(VD(ka-k)) (e^-kt - e^-kat)', 'Cp = (F ka D0)/(Vd(ka-k)) (e^(-kt) - e^(-kat))', 'Cp = F*ka*D0*(e^(-kt)-e^(-ka*t))/(VD*(ka-k))'],
                  ['Cp = FkaD0/(VD(ka-k)) (e^-kat - e^-kt)', 'Cp = FkaD0/(VD(k-ka)) (e^-kt - e^-kat)', 'Cp = FkaD0/(VD(ka-k)) (e^-kt + e^-kat)']],
    ['cp-n',      ['Cp = D0/VD * (1-e^-nktau)/(1-e^-ktau) * e^-kt', 'Cp = (D0/VD)[(1-e^(-nkτ))/(1-e^(-kτ))]e^(-kt)'],
                  ['Cp = D0/VD * (1-e^-ktau)/(1-e^-nktau) * e^-kt', 'Cp = D0/VD * (1-e^-nkt)/(1-e^-ktau) * e^-kt']],
    ['css',       ['Css = R/Cl', 'Css = R/(k*VD)', 'Css = R/kVD', 'Css = R/(VD k)'],
                  ['Css = R/k*VD', 'Css = Cl/R', 'Css = R k/VD']],
  ];
  let same = 0, diff = 0;
  for (const [id, yes, no] of algebra) {
    const e = E.find(x => x.id === id);
    if (!e) { bad(`algebra control names an unknown equation "${id}"`); continue; }
    for (const f of yes) { if (!X.eqCorrect(e, f)) bad(`"${id}" rejects the same equation spelled ${f}`); same++; }
    for (const f of no)  { if (X.eqCorrect(e, f))  bad(`"${id}" accepts a different equation spelled ${f}`); diff++; }
  }
  console.log(`  ok    read as algebra: ${same} other spellings accepted, ${diff} different equations refused`);
  /* Every keyed form must be readable as algebra, or the loosening above
     silently never applies to that equation. */
  const unreadable = E.filter(e => [e.typed, ...(e.also || [])].some(f => !X.eqTokens(f.split('=').slice(1).join('='))));
  if (unreadable.length) bad(`keyed forms the algebra reader cannot read: ${unreadable.map(e => e.id).join(', ')}`);
  else console.log('  ok    every keyed form reads as algebra');

  /* Every equation, answered in its own canonical form, must be accepted. */
  const rejected = E.filter(e => !X.eqCorrect(e, e.typed)
                              || !X.eqCorrect(e, e.typed.split('=').slice(1).join('=')));
  if (rejected.length) bad(`${rejected.length} equation(s) reject their own keyed answer: ${rejected.map(e => e.id).join(', ')}`);
  else console.log('  ok    every equation accepts its own answer, with the left side and without it');
}

console.log('\n=== 5e. What an explanation may say ===');
{
  /* Where a fact came from belongs in the citation under the explanation, or in
     `audit`, which is never shown. It does not belong in the explanation, where
     it reads as commentary and teaches nothing. "In class" is allowed in a note,
     because a note exists to say that the class and the printed sheet disagree. */
  const SOURCING = /transcript|caption|recording|this copy|that copy|handwrit|text extract|printed slide|lecture audio|\baloud\b|out loud|\bOCR\b|not used as the source|computed here|on (19|24|26) August/i;
  const shown = q => {
    const t = [];
    for (const p of X.teachParts(q.teach)) t.push(['concept block', p.t], ['concept block', p.after],
      ...p.list.map(x => ['concept block', x]), ...(p.table ? p.table.rows.flat().map(x => ['table', x]) : []));
    (q.options || []).forEach(o => t.push(['option', o.t], ['option explanation', o.why]));
    (q.steps || []).forEach(x => t.push(['working', x.t], ['working', x.why]));
    (q.pairs || []).forEach(x => t.push(['pair', x.why]));
    t.push(['stem', q.stem], ['note', q.note]);
    return t.filter(([, v]) => v);
  };
  let n = 0;
  for (const q of X.QUESTIONS.concat(X.EXTRAS)) for (const [where, v] of shown(q)) {
    if (SOURCING.test(v)) { bad(`${q.id}: sourcing commentary in its ${where}: "${String(v).match(SOURCING)[0]}"`); n++; }
    if (where !== 'note' && /\bin class\b/i.test(v)) { bad(`${q.id}: "in class" in its ${where}; only a note may say it`); n++; }
  }
  if (!n) console.log('  ok    no explanation, option, step or note says where its facts were heard');

  /* Tables and fractions are markup, so a malformed one shows as raw text. */
  let tb = 0, fr = 0;
  for (const q of X.QUESTIONS.concat(X.EXTRAS)) for (const p of X.teachParts(q.teach)) {
    if (p.table) {
      tb++;
      const w = p.table.head.length;
      p.table.rows.forEach((r, i) => { if (r.length !== w) bad(`${q.id}: table row ${i + 1} has ${r.length} cells for ${w} columns`); });
    }
    for (const t of [p.t, p.after, ...p.list, ...(p.table ? p.table.rows.flat() : [])]) {
      if (!t) continue;
      const open = (t.match(/\{\{frac:/g) || []).length, good = (t.match(X.FRAC_RE) || []).length;
      fr += open;
      if (open !== good) bad(`${q.id}: a {{frac:...}} in its concept block is malformed`);
    }
  }
  /* The worked lines of a calculation stack their ratios the same way. */
  for (const q of X.QUESTIONS.concat(X.EXTRAS)) for (const st of (q.steps || [])) {
    const open = (String(st.t).match(/\{\{frac:/g) || []).length, good = (String(st.t).match(X.FRAC_RE) || []).length;
    fr += open;
    if (open !== good) bad(`${q.id}: a {{frac:...}} in its working is malformed`);
  }
  console.log(`  ok    ${tb} comparison tables have a cell for every column; ${fr} stacked fractions are well formed`);

  /* A CONTROL ON THE FORMULA FORMATTER. It sets typed formulas as the slides
     print them. Too loose and it subscripts ordinary words; too tight and a
     formula stays as code. Both directions are held here. */
  const convert = [
    ['C = C0e^(-kt)', 'C = C<sub>0</sub>e<sup>−kt</sup>'],
    ['t1/2 = C0/2k0', 't½ = C<sub>0</sub>/2k<sub>0</sub>'],
    ['Cl = k x VD', 'Cl = k × V<sub>D</sub>'],
    ['tmax = ln(ka/k)/(ka - k)', 't<sub>max</sub> = ln(k<sub>a</sub>/k)/(k<sub>a</sub> − k)'],
    ['t1/2a = 0.693/ka', 't½<sub>a</sub> = 0.693/k<sub>a</sub>'],
    ['Cp0 = A + B', 'C<sub>p</sub><sup>0</sup> = A + B'],
  ];
  const leave = ['kappa, keep, fetch, taken, Access, VDs, first-order, zero-order, 2-compartment',
                 'the peak and the tail', 'Ke, Cps and CAUC are not symbols here'];
  for (const [a, want] of convert) if (X.prettyMath(a) !== want) bad(`formula formatter: "${a}" gives "${X.prettyMath(a)}", expected "${want}"`);
  for (const a of leave) if (X.prettyMath(a) !== a) bad(`formula formatter changed ordinary text: "${a}" -> "${X.prettyMath(a)}"`);
  console.log(`  ok    the formula formatter sets ${convert.length} formulas and leaves ${leave.length} runs of ordinary text alone`);
}

console.log('\n=== 6. Storage isolation ===');
{
  const keys = Object.keys(store);
  // No name is asked for: a first visit saves under the "default" profile.
  if (!keys.some(k=>k.endsWith(':data:default'))) bad('progress not written under the default profile');
  else console.log(`  ok    progress written under namespaced key: ${keys.find(k=>k.endsWith(':data:default'))}`);
  let asked = false; sandbox.prompt = () => { asked = true; return 'x'; };
  X.askProfile();
  if (asked) bad('starting the drill asked for a name');
  else console.log('  ok    starting the drill asks for no name');
  if (!keys.every(k => k.startsWith(COURSE.ns + ':'))) bad(`a key was written outside the "${COURSE.ns}" namespace`);
  else console.log(`  ok    every key sits under the course namespace "${COURSE.ns}"`);
}

console.log('\n=== 7. Different wording when a missed concept returns ===');
(function(){
  const byC = {};
  QUESTIONS.forEach(q => (byC[q.concept] ||= []).push(q));
  const pair = Object.values(byC).find(a => a.length > 1);
  if (!pair) { console.log('  skip  no concept currently has more than one wording'); return; }
  const topic = pair[0].topic;
  const pl  = QUESTIONS.filter(q => q.topic === topic);
  X.getDB().concepts = {}; X.getDB().answers = []; X.getDB().qn = 0;
  record(pair[0], 'wrong');
  for (let i=0;i<6;i++){ const n = pickNext(pl.filter(q=>q.concept!==pair[0].concept), null); if(n) record(n,'correct'); }
  let got = null;
  for (let i=0;i<60;i++){
    const n = pickNext(pl, null);
    if (!n) break;
    if (n.concept === pair[0].concept) { got = n; break; }
    record(n,'correct');
  }
  if (!got) { console.log('  FAIL  missed concept never returned'); process.exitCode = 1; fails++; }
  else if (got.id === pair[0].id) { console.log('  FAIL  returned the identical question, not a new wording'); process.exitCode = 1; fails++; }
  else console.log(`  ok    returned as a different question (${pair[0].id} -> ${got.id})`);
})();

console.log('\n=== 8. Small pools end instead of looping ===');
(function(){
  const t = TOPICS[0], s = (t.subs||[])[0];
  const pl = QUESTIONS.filter(q=>q.topic===t.id && (!s || q.sub===s.id));
  if (!pl.length) { console.log('  skip  no questions in the first subtopic'); return; }
  X.getDB().concepts={}; X.getDB().answers=[]; X.getDB().qn=0;
  X.getDB().settings.mode='cram';
  const served=[]; let last=null;
  for(let i=0;i<30;i++){
    const q=pickNext(pl,last);
    if(!q) break;
    served.push(q.id); record(q,'correct'); last=q.id;
  }
  const uniq=new Set(served).size;
  if(served.length > pl.length){
    console.log(`  FAIL  served ${served.length} from a pool of ${pl.length} — repeats occurred`); fails++;
  } else {
    console.log(`  ok    pool of ${pl.length} served ${served.length} (${uniq} distinct) then stopped`);
  }
  X.getDB().settings.mode='all';
  let more=0, l2=null;
  for(let i=0;i<10;i++){ const q=pickNext(pl,l2); if(!q) break; record(q,'correct'); l2=q.id; more++; }
  console.log(more>0 ? `  ok    "Ask everything" still serves (${more} more)` : '  FAIL  "Ask everything" stopped too');
  if(!more) fails++;
  X.getDB().settings.mode='cram';
})();


console.log('\n=== 9. Terms ===');
(() => {
  const T = X.TERMS, TQ = X.TERM_QS; let bad = 0;
  const ids = new Set();
  for (const t of T) {
    const miss = ['id','term','module','group','def','gist','scene','cite'].filter(k => !t[k]);
    if (miss.length) { console.log(`  FAIL  term ${t.id || t.term}: missing ${miss.join(', ')}`); bad++; }
    if (ids.has(t.id)) { console.log(`  FAIL  term id ${t.id} used twice`); bad++; }
    ids.add(t.id);
    if (!/\.pdf|deck|slide|transcript/i.test(t.cite || '')) { console.log(`  FAIL  term ${t.id}: cite names no deck or transcript`); bad++; }
  }
  for (const q of TQ) {
    const right = q.options.filter(o => o.correct).length;
    const texts = q.options.map(o => o.t.toLowerCase());
    if (right !== 1) { console.log(`  FAIL  ${q.id}: ${right} correct options`); bad++; }
    if (q.options.length !== 4) { console.log(`  FAIL  ${q.id}: ${q.options.length} options`); bad++; }
    if (new Set(texts).size !== texts.length) { console.log(`  FAIL  ${q.id}: two options read the same`); bad++; }
    if (q.options.some(o => !o.why)) { console.log(`  FAIL  ${q.id}: an option has no why`); bad++; }
    if (X.byId(q.id) !== q) { console.log(`  FAIL  ${q.id}: not found by id, so progress on it cannot be recorded`); bad++; }
    if (QUESTIONS.some(b => b.id === q.id)) { console.log(`  FAIL  ${q.id}: collides with a bank question`); bad++; }
    // the scene and definition stems must not print the term they ask for
    if (!/-gist$/.test(q.id)) {
      const t = T.find(x => x.id === q.termId), name = t.term.replace(/\s*\(.*\)\s*$/, '');
      if (q.stem.toLowerCase().includes(name.toLowerCase())) { console.log(`  FAIL  ${q.id}: the stem prints the term`); bad++; }
    }
  }
  if (TQ.some(q => QUESTIONS.includes(q))) { console.log('  FAIL  term questions leaked into the exam bank'); bad++; }
  console.log(bad ? `  FAIL  ${bad} term problems` : `  ok    ${T.length} terms, ${TQ.length} term questions: one keyed answer each, four distinct options, no stem prints its term, kept off the exam`);
  fails += bad;
})();


console.log('\n=== 10. Bank fields are plain text ===');
(() => {
  // stems, options, steps, teach blocks and notes are escaped before they render,
  // so an HTML tag written into one shows up on screen as text
  const TAG = /<\/?(sub|sup|b|i|br|span|p|ul|li)\b/i;
  const bad = [];
  const look = (id, where, v) => { if (typeof v === 'string' && TAG.test(v)) bad.push(`${id} ${where}`); };
  for (const q of QUESTIONS.concat(X.EXTRAS, X.TERM_QS)) {
    look(q.id, 'stem', q.stem); look(q.id, 'note', q.note);
    (q.options || []).forEach((o, i) => { look(q.id, 'option ' + i, o.t); look(q.id, 'option ' + i + ' why', o.why); });
    (q.steps || []).forEach((st, i) => { look(q.id, 'step ' + i, st.t); look(q.id, 'step ' + i + ' why', st.why); });
    (q.pairs || []).forEach((pr, i) => { look(q.id, 'pair ' + i, pr.why); });
    for (const part of X.teachParts(q.teach)) {
      look(q.id, 'teach heading', part.h); look(q.id, 'teach text', part.t); look(q.id, 'teach after', part.after);
      (part.list || []).forEach((li, i) => look(q.id, 'teach bullet ' + i, li));
    }
  }
  if (bad.length) { console.log(`  FAIL  HTML tags in escaped fields (write the symbol plainly; prettyMath subscripts it): ${bad.slice(0, 8).join('; ')}${bad.length > 8 ? ' …' : ''}`); fails += 1; }
  else console.log('  ok    no HTML tag in any stem, option, step, pair, note or teach text');
})();


/* ---- the set-up drill and the sheet map ---- */
(() => {
  const E = Object.fromEntries(X.EQUATIONS.map(e => [e.id, e]));
  const BAN = /\b(think of it as|trick|the key is|remember that|memorize|you should)\b/i;
  const nums = X.QUESTIONS.concat(X.EXTRAS).filter(q => X.qType(q) === 'numeric');
  const noSetup = nums.filter(q => !q.setup), badEq = [], longWhy = [], banned = [], html = [], offModule = [];
  for (const q of nums) {
    const s = q.setup; if (!s) continue;
    if (s.eq !== 'none' && !E[s.eq]) badEq.push(q.id + ':' + s.eq);
    for (const p of (s.pre || [])) if (!E[p]) badEq.push(q.id + ':pre:' + p);
    const w = String(s.why || '').split(/\s+/).filter(Boolean).length;
    if (!s.why || w > 60) longWhy.push(q.id);
    if (BAN.test(s.why || '')) banned.push(q.id);
    if (/<[a-z]/i.test(s.why || '')) html.push(q.id);
    /* the line that gives the final number belongs to this module or an earlier one; a later module's line cannot be the set-up */
    if (s.eq !== 'none' && E[s.eq] && E[s.eq].module > q.module && !E[s.eq].must) offModule.push(q.id + ':' + s.eq);   // the lines she said to know (Cp = DB/VD among them) serve every module
  }
  if (noSetup.length) bad(`numeric questions without a setup field: ${noSetup.slice(0, 6).map(q => q.id).join(', ')}${noSetup.length > 6 ? ' …' : ''} (${noSetup.length})`);
  else console.log(`  ok    every numeric question names its set-up line (${nums.length})`);
  if (badEq.length) bad('setup names an equation id that does not exist: ' + badEq.slice(0, 6).join(', ')); else console.log('  ok    every set-up equation id exists');
  if (longWhy.length) bad('setup.why missing or over 60 words: ' + longWhy.slice(0, 6).join(', ')); else console.log('  ok    every set-up reason is present and short');
  if (banned.length) bad('setup.why uses banned phrasing: ' + banned.slice(0, 6).join(', '));
  if (html.length) bad('setup.why carries an HTML tag: ' + html.slice(0, 6).join(', '));
  if (offModule.length) bad('setup line from a later module than the question: ' + offModule.slice(0, 6).join(', ')); else console.log('  ok    no set-up line comes from a later module than its question');
  /* the givens table and the sanity check: present on every numeric question, every value a number the stem states */
  const numsIn = txt => [...String(txt || '').replace(/,(?=\d{3}\b)/g, '').matchAll(/(^|[^A-Za-z\d.])(\d+(?:\.\d+)?)/g)].map(m => m[2]);
  const SMALL = new Set(['0.5', '0.25', '0.125', '0.693', '2.303', '1.44', '50', '75', '87.5', '90', '94', '95', '97', '99', '100', '1000', '60', '24']);
  const needWork = X.QUESTIONS.concat(X.EXTRAS).filter(q => X.qType(q) !== 'numeric' && q.options && q.sub === 'renalmech' && q.skill === 'apply' && /\d/.test(q.stem));   // a mechanism read from a number must show the comparison
  const noWork = needWork.filter(q => !Array.isArray(q.steps) || !q.steps.length).map(q => q.id);
  if (noWork.length) bad('renal-mechanism questions without the working that decides them: ' + noWork.join(', ')); else console.log(`  ok    every renal-mechanism decision carries its working (${needWork.length})`);
  const withWork = X.QUESTIONS.concat(X.EXTRAS).filter(q => X.qType(q) !== 'numeric' && (q.givens || q.check));
  const noGivens = [], noCheck = [], badGivens = [], badCheck = [];
  for (const q of nums.concat(withWork)) {
    const isNum = X.qType(q) === 'numeric';
    const stemNums = new Set(numsIn(q.stem));
    if (!Array.isArray(q.givens) || !q.givens.length){ if (isNum) noGivens.push(q.id); }
    else {
      if (q.givens.length > 10) badGivens.push(q.id + ': more than 10 givens');
      for (const g of q.givens) {
        if (!Array.isArray(g) || g.length !== 3 || g.some(x => typeof x !== 'string' || !x.trim())) { badGivens.push(q.id + ': a given is not [symbol, value, role]'); continue; }
        for (const n of numsIn(g[1])) if (!stemNums.has(n)) badGivens.push(`${q.id}: value "${g[1]}" has ${n}, which the stem does not state`);
        if (g[2].split(/\s+/).length > 16) badGivens.push(q.id + ': a role runs past 16 words');
        if (BAN.test(g.join(' ')) || /<[a-z]/i.test(g.join(' '))) badGivens.push(q.id + ': a given carries banned phrasing or HTML');
      }
    }
    const ck = q.check;
    if (!ck || typeof ck.t !== 'string' || !ck.t.trim()){ if (isNum) noCheck.push(q.id); }
    else {
      const allowed = new Set([...stemNums, ...numsIn((q.steps || []).map(s => s.t).join(' ')), ...numsIn(String(q.answer)), ...numsIn(String(+(+q.answer).toPrecision(3))), ...numsIn(String(+(+q.answer).toPrecision(2))), ...SMALL]);
      for (const n of numsIn(ck.t)) if (!allowed.has(n) && !(Number.isInteger(+n) && +n <= 24)) badCheck.push(`${q.id}: check says ${n}, which is in neither the stem nor the working`);
      if (ck.t.split(/\s+/).length > 50) badCheck.push(q.id + ': check runs past 50 words');
      if (BAN.test(ck.t) || /<[a-z]/i.test(ck.t)) badCheck.push(q.id + ': check carries banned phrasing or HTML');
      if (ck.lo !== undefined && !(isFinite(ck.lo) && ck.lo <= q.answer)) badCheck.push(q.id + ': lo is not a number at or below the answer');
      if (ck.hi !== undefined && !(isFinite(ck.hi) && ck.hi >= q.answer)) badCheck.push(q.id + ': hi is not a number at or above the answer');
    }
  }
  if (noGivens.length) bad(`numeric questions without a givens table: ${noGivens.slice(0, 8).join(', ')}${noGivens.length > 8 ? ' …' : ''} (${noGivens.length})`); else console.log(`  ok    every numeric question lists what the stem gives (${nums.length})`);
  if (noCheck.length) bad(`numeric questions without a sanity check: ${noCheck.slice(0, 8).join(', ')}${noCheck.length > 8 ? ' …' : ''} (${noCheck.length})`); else console.log('  ok    every numeric question carries a sanity check');
  if (badGivens.length) bad('givens: ' + badGivens.slice(0, 8).join(' | ')); else if (!noGivens.length) console.log('  ok    every given quotes a value the stem states');
  if (badCheck.length) bad('check: ' + badCheck.slice(0, 8).join(' | ')); else if (!noCheck.length) console.log('  ok    every sanity check uses only numbers from the stem, the working or the answer');
  const noDerive = X.EQUATIONS.filter(e => e.sheet !== 'yes' && !e.derive).map(e => e.id);
  if (noDerive.length) bad('equations the sheet does not print without a derivation: ' + noDerive.join(', ')); else console.log(`  ok    every equation the sheet does not print says how to reach it (${X.EQUATIONS.filter(e => e.derive).length})`);
  const none = nums.filter(q => q.setup && q.setup.eq === 'none').length;
  console.log(`  info  ${none} numeric question(s) have no catalog line for their final step and stay out of the set-up drill`);
  const pool = X.suPoolAll();
  const opt = pool.length ? X.suOptions(pool[0]) : [];
  if (pool.length && (opt.length !== 4 || new Set(opt.map(o => o.id)).size !== 4 || !opt.some(o => o.id === pool[0].setup.eq))) bad('the set-up drill does not offer four distinct lines including the right one');
  else console.log(`  ok    the set-up drill offers four distinct lines, the right one among them (${pool.length} stems)`);
  /* the sheet map: 52 lines, every eq id real, every module known */
  const L = X.SHEET_LINES;
  if (L.length !== 52) bad(`the sheet map has ${L.length} lines; the rendered sheet has 52`); else console.log('  ok    the sheet map carries all 52 lines of the sheet');
  const cols = X.SHEET_COLS.map(c => L.filter(l => l.c === c.pg).length);
  if (cols.join(',') !== '21,15,12,4') bad(`sheet columns hold ${cols.join(', ')} lines; the sheet prints 21, 15, 12 and 4`);
  const badSheet = L.concat(X.SHEET_MISSING).flatMap(l => [l.eq, ...(l.alsoEq || [])]).filter(id => id && !E[id]);
  if (badSheet.length) bad('sheet map names an equation id that does not exist: ' + badSheet.join(', ')); else console.log('  ok    every sheet-map drill link points at a real equation');
  const badMod = L.filter(l => ![0, 1, 2, 3, 4, 5, 6, 7].includes(l.module)).length;
  if (badMod) bad(`${badMod} sheet line(s) carry an unknown module`);
  const fracs = L.concat(X.SHEET_MISSING).map(l => l.html + l.when + (l.need || '')).join(' ');
  const open = (fracs.match(/\{\{frac:/g) || []).length, good = (fracs.match(/\{\{frac:[^|}]*\|[^}]*\}\}/g) || []).length;
  if (open !== good) bad(`${open - good} malformed {{frac}} in sheet.js`); else console.log('  ok    every sheet-map fraction is well formed');
  const sheetYes = X.EQUATIONS.filter(e => e.sheet === 'yes').map(e => e.id), mapped = new Set(L.flatMap(l => [l.eq, ...(l.alsoEq || [])]));
  const unmapped = sheetYes.filter(id => !mapped.has(id));
  if (unmapped.length) bad(`equations marked "on the sheet" that no sheet line carries: ${unmapped.join(', ')}`); else console.log(`  ok    every equation marked on the sheet appears on a sheet line (${sheetYes.length})`);
})();

console.log(`\n${fails ? 'FAILURES: '+fails : 'All checks passed'}${warns ? '  (warnings: '+warns+')' : ''}\n`);
process.exit(fails ? 1 : 0);
