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
code += "\nglobalThis.__X={COURSE,EXAM,POOLS,TOTAL_MARKS,matchesPoolFilter,sataShares,poolDrawable,QUESTIONS,TOPICS,IMAGES,record,pickNext,st,score,drawN,drawMixed,EXAM_SATA,askProfile,markGuessed,setMissKind,isMulti,isMC,qType,gradeMulti,gradeNumeric,gradeMatch,gradeAnswer,correctSet,poolOf,poolKey,poolQuestions,poolShares,markWeight,skillOf,SKILLS,MISS_KINDS,blueprintCoverage,setActiveExam,getDB:()=>DB};\n";
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
for (const q of QUESTIONS) {
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
  // grading, exercised directly rather than assumed
  for (const q of QUESTIONS.filter(q => X.qType(q) === 'numeric')) {
    if (!X.gradeNumeric(q, String(q.answer))) bad(`${q.id}: the keyed answer does not grade as correct`);
    if (!X.gradeNumeric(q, String(q.answer + q.tol))) bad(`${q.id}: an answer exactly at the tolerance is graded wrong`);
    if (X.gradeNumeric(q, String(q.answer + q.tol * 2 + 1))) bad(`${q.id}: an answer well outside the tolerance is graded right`);
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

console.log('\n=== 6. Storage isolation ===');
{
  const keys = Object.keys(store);
  if (!keys.some(k=>k.includes('TestUser'))) bad('profile-namespaced key not written');
  else console.log(`  ok    progress written under namespaced key: ${keys.find(k=>k.includes('TestUser'))}`);
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

console.log(`\n${fails ? 'FAILURES: '+fails : 'All checks passed'}${warns ? '  (warnings: '+warns+')' : ''}\n`);
process.exit(fails ? 1 : 0);
