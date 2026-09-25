/* Renders every view against stub DOM sinks and fails on anything that reaches
 * the page as "undefined", "NaN", "[object Object]" or unbalanced markup.
 * The output path comes from course.js.
 */
const fs=require('fs'), path=require('path'), vm=require('vm');
const OUT=(()=>{const s=fs.readFileSync(path.join(__dirname,'course.js'),'utf8');
  const m=s.match(/\boutput\s*:\s*['"]([^'"]+)['"]/);
  if(!m){console.error('FAIL: course.js declares no output');process.exit(1);}
  return '/mnt/user-data/outputs/'+m[1];})();
const html=fs.readFileSync(OUT,'utf8');
/* The pushed copy at the repository root is what a reader actually opens, so a
 * build that refreshed only the outputs directory would leave GitHub serving an
 * older drill than the source beside it. Compare the two before anything else:
 * every other check in this file reads the outputs copy, and none of them would
 * notice the root copy going stale. */
{
  const root = path.join(__dirname, '..', path.basename(OUT));
  if(!fs.existsSync(root)){
    console.error(`FAIL: ${root} is missing. The repository serves that copy; run build.py.`);
    process.exit(1);
  }
  if(fs.readFileSync(root,'utf8') !== html){
    console.error(`FAIL: ${root} differs from ${OUT}.`);
    console.error('       The copy the repository serves is out of date. Run build.py and commit it.');
    process.exit(1);
  }
  console.log('  ok    the copy at the repository root matches this build');
}
/* The page tells its reader when it was built, so a stale copy can be spotted.
 * The stamp has to be present and has to be a real time. */
{
  const m = html.match(/const BUILD_AT = '([^']+)'/);
  if(!m || isNaN(new Date(m[1]))){ console.error('FAIL: the page carries no valid build time for "Last updated"'); process.exit(1); }
  console.log(`  ok    the page carries its build time, ${m[1]}`);
}
let code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
const b=code.lastIndexOf('   BOOT'); code=code.slice(0,code.lastIndexOf('/* ===',b));
code+="\nglobalThis.__X={COURSE,QUESTIONS,TOPICS,startQuiz,startSweep,renderTopics,renderQuiz,renderGaps,renderRef,renderTell,renderEq,eqStart,eqSetChosen,EQUATIONS,EQref:()=>EQ,renderGuide,renderSettings,renderExam,answer,submitNumeric,submitMatch,submitMulti,qType,isMulti,correctSet,Qref:()=>Q,askProfile,record,beginExam,renderExamQ,finishExam,EXref:()=>EX};\n";
const store={}, sinks={};
function mk(id){ return sinks[id] ||= {innerHTML:'',textContent:'',value:'',dataset:{},style:{},classList:{toggle(){},add(){},remove(){},contains(){return false}},setAttribute(){},querySelectorAll(){return []},onclick:null,click(){}}; }
const sb={console,localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}},
 document:{querySelector:s=>mk(s),querySelectorAll:()=>[],getElementById:i=>mk(i),createElement:()=>mk('tmp'),body:mk('body')},
 window:{scrollTo(){}},prompt:()=>'Tester',alert:m=>console.log('ALERT:',m),confirm:()=>true,
 setTimeout:f=>{f();return 0},clearTimeout(){},setInterval:()=>0,clearInterval(){},
 Blob:function(){},URL:{createObjectURL:()=>'',revokeObjectURL(){}},FileReader:function(){},
 Date,Math,JSON,Object,Array,String,Number,Boolean,RegExp,Error,isNaN,parseInt,parseFloat};
sb.globalThis=sb; vm.createContext(sb); vm.runInContext(code,sb);
const X=sb.__X; X.askProfile(false);

function check(name, html){
  const problems=[];
  if(!html || html.length<50) problems.push('empty or near-empty output');
  // base64 image data contains every short letter sequence by chance, so strip
  // the data URLs before looking for a value that came from the app's own code
  const prose = html.replace(/data:image\/[a-z+]+;base64,[A-Za-z0-9+/=]+/g, 'DATAURL');
  /* "undefined" reaching the page means a field was missing and its value was
     interpolated raw. But it is also ordinary English in the written
     explanations: an oral equation whose two rate constants are equal is
     undefined, because their difference is its denominator. So look for it
     only where a field lands — inside a short structural element — and never
     inside the prose of an explanation. The same reasoning applies to "null".
     NaN and [object Object] are never English and stay checked everywhere. */
  const STRUCTURAL = /<(?:span|td|th|b|i|code|option|h[1-6])\b[^>]*>([^<]{0,120})<\//g;
  for(const m of prose.matchAll(STRUCTURAL)){
    if(/\b(?:undefined|null)\b/.test(m[1])){
      problems.push(`"${m[1].trim().slice(0,60)}" — a missing field reached the page`);
      break;
    }
  }
  if(/NaN/.test(prose)) problems.push('contains NaN');
  if(/\[object Object\]/.test(prose)) problems.push('contains [object Object]');
  if(/\{\{fig:/.test(prose)) problems.push('an unexpanded {{fig:...}} token reached the page');
  const open=(html.match(/<div/g)||[]).length, close=(html.match(/<\/div>/g)||[]).length;
  if(open!==close) problems.push(`div tags unbalanced: ${open} open vs ${close} close`);
  console.log(`  ${problems.length?'FAIL':'ok  '}  ${name.padEnd(26)} ${html.length} chars` + (problems.length?'\n         '+problems.join('\n         '):''));
  return problems.length===0;
}
let ok=true;
console.log('\n=== Render smoke test ===');
console.log(`  course: ${X.COURSE.short} — ${X.COURSE.title}`);
X.renderTopics();        ok &= check('topics list', sinks['#v-topics'].innerHTML);

/* Drive one question of each type the bank actually holds, so the numeric and
   match renderers are exercised rather than assumed. */
function drive(q, submit, value){
  X.startQuiz(q.topic, q.sub);
  const Q = X.Qref();
  Q.current = q; Q.picked = value !== undefined ? value : null; Q.revealed = false; Q.missKind = null;
  Q.order = X.qType(q)==='mc' ? q.options.map((o,i)=>i) : [];
  Q.startedAt = Date.now();
  X.renderQuiz();
  // the real number box is read back on submit; the stub needs the same value
  if(X.qType(q)==='numeric') sinks['numIn'].value = value === undefined ? '' : String(value);
  const before = sinks['#v-quiz'].innerHTML;
  submit();
  return {before, after: sinks['#v-quiz'].innerHTML};
}
const mcQ = X.QUESTIONS.find(q=>X.qType(q)==='mc' && !q.multi);
if(mcQ){
  const r = drive(mcQ, () => X.answer(mcQ.options.findIndex(o=>o.correct)));
  ok &= check('quiz, multiple choice', r.before);
  ok &= check('quiz, mc answered', r.after);
  console.log('         explanation rows: '+((r.after.match(/class="wrow"/g)||[]).length));
  console.log('         citation present: '+/class="cite"/.test(r.after));
}
const multiQ = X.QUESTIONS.find(q=>X.isMulti(q));
if(multiQ){
  const r = drive(multiQ, () => X.submitMulti(), X.correctSet(multiQ));
  ok &= check('quiz, select-all answered', r.after);
}
const numQ = X.QUESTIONS.find(q=>X.qType(q)==='numeric');
if(numQ){
  const right = drive(numQ, () => X.submitNumeric(), String(numQ.answer));
  ok &= check('quiz, numeric (correct)', right.after);
  console.log('         steps shown when right: '+/class="steps"/.test(right.after));
  const wrong = drive(numQ, () => X.submitNumeric(), String(numQ.answer + numQ.tol*10 + 7));
  ok &= check('quiz, numeric (missed)', wrong.after);
  console.log('         miss-kind chooser offered: '+/class="misskind"/.test(wrong.after));
  if(!/class="misskind"/.test(wrong.after)){ console.log('  FAIL  a missed calculation did not ask which kind of miss it was'); ok = false; }
  // choosing a kind reveals the working
  const Q = X.Qref(); Q.missKind='unit'; X.renderQuiz();
  const after = sinks['#v-quiz'].innerHTML;
  ok &= check('quiz, numeric working shown', after);
  if(!/class="steps"/.test(after)){ console.log('  FAIL  naming the miss did not reveal the worked steps'); ok = false; }
}else{ console.log('  skip  bank holds no numeric question'); }
const matchQ = X.QUESTIONS.find(q=>X.qType(q)==='match');
if(matchQ){
  const full = {}; matchQ.pairs.forEach(p=>full[p.l]=p.r);
  const r = drive(matchQ, () => X.submitMatch(), full);
  ok &= check('quiz, match answered', r.after);
  console.log('         pair explanations shown: '+/class="pairrow"/.test(r.after));
}else{ console.log('  skip  bank holds no match question'); }

X.renderGaps();          ok &= check('weak spots', sinks['#v-gaps'].innerHTML);
console.log('         miss-kind panel present: '+/Where the calculations go wrong/.test(sinks['#v-gaps'].innerHTML));
X.renderRef();           ok &= check('reference', sinks['#v-ref'].innerHTML);
X.renderTell();          ok &= check('tell apart', sinks['#v-tell'].innerHTML);
X.renderEq();            ok &= check('equations, the picker', sinks['#v-eq'].innerHTML);
/* Both exercises render, since each builds different markup from the same entry
   and a missing field shows up in one and not the other. */
X.eqSetChosen(X.EQUATIONS.map(e => e.id));
X.eqStart('build');      ok &= check('equations, building one', sinks['#v-eq'].innerHTML);
X.eqStart('type');       ok &= check('equations, typing one', sinks['#v-eq'].innerHTML);
X.renderGuide();         ok &= check('guides', sinks['#v-guide'].innerHTML);
X.renderSettings();      ok &= check('settings', sinks['#v-settings'].innerHTML);
X.renderExam();          ok &= check('exam front page', sinks['#v-exam'].innerHTML);
X.beginExam();           ok &= check('exam paper', sinks['#v-exam'].innerHTML);
console.log('         exam question count: '+X.EXref().qs.length);
X.finishExam();          ok &= check('exam result', sinks['#v-exam'].innerHTML);
console.log(ok?'\nRender smoke test passed\n':'\nRENDER PROBLEMS FOUND\n');
process.exit(ok?0:1);
