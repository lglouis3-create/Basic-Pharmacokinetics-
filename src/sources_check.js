/* sources_check.js — checks the source registry (sources.js, written by gen/sources.py)
 * against the built bank.
 *
 *   node sources_check.js [sources.js]
 *
 * - every CHAINS part and every Canvas quiz item (cq*) maps to exactly one source,
 *   and SOURCE_OF agrees with the sources' item lists;
 * - every source has items (Quiz 5 may be empty only while `missing` says why);
 * - types, keys and modules are from the allowed sets; dates are ISO or blank;
 * - a Drive id has the shape of a Drive file id, and a source without one says why;
 * - nothing in the registry names the student. The name patterns are kept out of
 *   the repository, one regular expression per line, in decks/private_names.txt
 *   (gitignored like the decks); without that file the name scan prints SKIP. No
 *   owner, e-mail address or grade may appear either; those patterns are below.
 *
 * The output path comes from course.js, so nothing here names the course.
 */
const fs=require('fs'), path=require('path'), vm=require('vm');
const OUT=(()=>{const s=fs.readFileSync(path.join(__dirname,'course.js'),'utf8');
  const m=s.match(/\boutput\s*:\s*['"]([^'"]+)['"]/);
  if(!m){console.error('FAIL: course.js declares no output');process.exit(1);}
  const p='/mnt/user-data/outputs/'+m[1];
  return fs.existsSync(p)?p:path.join(__dirname,'..',m[1]);})();
let c=[...fs.readFileSync(OUT,'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)].sort((a,b)=>b[1].length-a[1].length)[0][1];
const b=c.lastIndexOf('   BOOT'); c=c.slice(0,c.lastIndexOf('/* ===',b));
c+='\nglobalThis.__B={QUESTIONS,CHAINS,COURSE};';
const sb={console,localStorage:{getItem:()=>null,setItem(){},removeItem(){}},document:{querySelector:()=>({}),querySelectorAll:()=>[],getElementById:()=>({}),createElement:()=>({}),body:{}},window:{},prompt:()=>'x',setTimeout:()=>0,clearTimeout(){},Date,Math,JSON,Object,Array,String,Number,Boolean,RegExp,Error,isNaN,parseInt,parseFloat};
sb.globalThis=sb;vm.createContext(sb);vm.runInContext(c,sb);
const {QUESTIONS,CHAINS,COURSE}=sb.__B;

// the registry itself, always from the file, so a stale build cannot hide a bad edit
const SRC_FILE=process.argv[2]||path.join(__dirname,'sources.js');   // a path argument checks another copy
const srcText=fs.readFileSync(SRC_FILE,'utf8');
const rb={};vm.createContext(rb);vm.runInContext(srcText+'\nglobalThis.__S={SOURCES,SOURCE_OF};',rb);
const {SOURCES,SOURCE_OF}=rb.__S;

let fails=0;
const fail=m=>{console.log('  FAIL  '+m);fails++;};

const TYPES=['daily-practice','in-class','homework','quiz','review','example','lecture-slides'];
const KEYS=['instructor','student-work','none'];
const MODULES=new Set((COURSE.topicsMenu||[]).filter(m=>m.module!=null).map(m=>m.module));
const DRIVE_ID=/^[A-Za-z0-9_-]{25,64}$/;
// Name patterns live outside the repository (see the header); the rest are generic.
const NAMES_FILE=path.join(__dirname,'decks','private_names.txt');
const NAMES=fs.existsSync(NAMES_FILE)
  ? fs.readFileSync(NAMES_FILE,'utf8').split('\n').map(l=>l.trim()).filter(Boolean).map(l=>new RegExp(l,'i'))
  : null;
if(!NAMES) console.log('  SKIP  personal-name scan: decks/private_names.txt is not on this machine');
const DENY=[...(NAMES||[]),
            /[\w.+-]+@[\w-]+\.[\w.]+/,/\bowner\b/i,/\b(grade[ds]?|score[ds]?)\s*[:=]?\s*\d/i,/\b\d{1,3}\s*\/\s*100\b/];

console.log('\n=== Source registry ===');
// 1. allowed values, dates, drive ids, names
const ids=new Set();
for(const s of SOURCES){
  const at=`source ${s.id}`;
  if(ids.has(s.id)) fail(`${at}: duplicate id`); ids.add(s.id);
  if(!TYPES.includes(s.type)) fail(`${at}: type "${s.type}" not one of ${TYPES.join(', ')}`);
  if(!KEYS.includes(s.key)) fail(`${at}: key "${s.key}" not one of ${KEYS.join(', ')}`);
  if(MODULES.size && !MODULES.has(s.module)) fail(`${at}: module ${s.module} is not a course module`);
  if(s.date!=='' && !(/^\d{4}-\d{2}-\d{2}$/.test(s.date) && !isNaN(Date.parse(s.date+'T00:00:00Z'))
       && new Date(s.date+'T00:00:00Z').toISOString().slice(0,10)===s.date))
    fail(`${at}: date "${s.date}" is not an ISO date (YYYY-MM-DD) or blank`);
  if(s.drive!==null){
    if(typeof s.drive!=='object' || !DRIVE_ID.test(s.drive.id||'')) fail(`${at}: malformed drive id ${JSON.stringify(s.drive)}`);
    const extra=Object.keys(s.drive).filter(k=>k!=='id');
    if(extra.length) fail(`${at}: drive carries ${extra.join(', ')}; only the id may be recorded`);
  } else if(!s.missing) fail(`${at}: no Drive file and no reason in missing`);
  if(!s.title || !s.file) fail(`${at}: title and file are required`);
  if(!Array.isArray(s.items) || !s.items.length){
    if(!(s.id==='quiz-5' && s.missing)) fail(`${at}: has no items`);
  }
}
for(const [re] of DENY.map(r=>[r])){
  const m=srcText.match(re);
  if(m) fail(`sources.js contains a personal-information pattern ${re}: "${srcText.slice(Math.max(0,m.index-40),m.index+m[0].length+40).replace(/\s+/g,' ')}"`);
}

// the built page, which is public, carries none of the name patterns either
if(NAMES){ const page=fs.readFileSync(OUT,'utf8');
  for(const re of NAMES){ const m=page.match(re);
    if(m) fail(`the built page contains a name pattern: "${page.slice(Math.max(0,m.index-40),m.index+m[0].length+20).replace(/\s+/g,' ')}"`); } }

// 2. coverage: every CHAINS part and cq item maps to exactly one source
const Q=new Set(QUESTIONS.map(q=>q.id));
const need=new Set();
for(const ch of CHAINS) for(const p of ch.parts) need.add(p);
for(const q of QUESTIONS) if(/^cq/.test(q.id)) need.add(q.id);
const holders={};
for(const s of SOURCES) for(const it of s.items||[]){
  if(!it.label) fail(`source ${s.id}: item ${it.q} has no label`);
  (holders[it.q]=holders[it.q]||[]).push(s.id);
  if(!Q.has(it.q)) fail(`source ${s.id}: item ${it.q} is not a question in the bank`);
  const so=SOURCE_OF[it.q];
  if(!so || so.src!==s.id || so.label!==it.label) fail(`SOURCE_OF[${it.q}] disagrees with source ${s.id}`);
}
for(const q of need){
  const h=holders[q]||[];
  if(!h.length) fail(`${q} has no source`);
  else if(h.length>1) fail(`${q} maps to ${h.length} sources: ${h.join(', ')}`);
}
for(const q of Object.keys(SOURCE_OF)) if(!holders[q]) fail(`SOURCE_OF[${q}] names a source that does not list it`);
for(const s of SOURCES) for(const ch of s.chains||[])
  if(!CHAINS.some(c=>c.id===ch)) fail(`source ${s.id}: chain ${ch} is not in CHAINS`);

const n=SOURCES.reduce((a,s)=>a+(s.items||[]).length,0);
console.log(`  ${SOURCES.length} sources, ${n} items, ${need.size} chain parts and quiz items to cover`);
console.log(fails?`\n${fails} failure(s)`:'  all checks pass');
process.exit(fails?1:0);
