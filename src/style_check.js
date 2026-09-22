/* Flags phrasing the course owner rejected: study meta-commentary, metaphor,
 * and appeals to the deck rather than to the subject.
 *
 * The output path comes from course.js, so nothing here names the course.
 */
const fs=require('fs'), path=require('path'), vm=require('vm');
const OUT=(()=>{const s=fs.readFileSync(path.join(__dirname,'course.js'),'utf8');
  const m=s.match(/\boutput\s*:\s*['"]([^'"]+)['"]/);
  if(!m){console.error('FAIL: course.js declares no output');process.exit(1);}
  return '/mnt/user-data/outputs/'+m[1];})();
let c=[...fs.readFileSync(OUT,'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
const b=c.lastIndexOf('   BOOT'); c=c.slice(0,c.lastIndexOf('/* ===',b)); c+='\nglobalThis.__Q=QUESTIONS;globalThis.__T=qType;';
const sb={console,localStorage:{getItem:()=>null,setItem(){},removeItem(){}},document:{querySelector:()=>({}),querySelectorAll:()=>[],getElementById:()=>({}),createElement:()=>({}),body:{}},window:{},prompt:()=>'x',setTimeout:()=>0,clearTimeout(){},Date,Math,JSON,Object,Array,String,Number,Boolean,RegExp,Error,isNaN,parseInt,parseFloat};
sb.globalThis=sb;vm.createContext(sb);vm.runInContext(c,sb);
const Q=sb.__Q, qType=sb.__T;

const BANNED=[
 [/easier to (hold|remember|recall)/i,'study meta-commentary'],
 [/\b(worth (doing|noticing|holding|the effort|learning))\b/i,'study meta-commentary'],
 [/\b(memoriz\w+|by rote|recallable|learnable|under (exam )?pressure)\b/i,'study meta-commentary'],
 [/\bthe (deck|slide|lecture) (states|says|gives|tells)\b/i,'appeals to the deck instead of giving the reason'],
 [/\b(workhorse|backbone|cleaning up|clean up after|downstream of|sits at the (centre|center)|single point of failure)\b/i,'metaphor'],
 [/\b(quench\w*|mop up|soak up|hand off|catches people|the trap (here|is))\b/i,'metaphor or loose jargon'],
 [/\bis the (whole )?point\b/i,'commentary about the question'],
 [/\bthis (option|question) (tests|is testing|exists to|is designed to)\b/i,'commentary about the question'],
];
// vague cross-references: naming a lecture without a file or slide number
const VAGUE=/\b(?:Dr\.\s*\w+'s\s+\w+\s+lecture|the \w+ lecture)\b/i;

let hits=0;
function scan(txt, where){
  if(!txt) return;
  for(const [re,label] of BANNED){
    const m = txt.match(re);
    if(m){ console.log(`  ${where}\n      [${label}] "...${txt.slice(Math.max(0,m.index-45), m.index+m[0].length+45).trim()}..."`); hits++; }
  }
  const v = txt.match(VAGUE);
  if(v && !/\.pdf|slide/i.test(txt.slice(Math.max(0,v.index-90), v.index+140))){
    console.log(`  ${where}\n      [vague cross-reference, no file or slide] "...${txt.slice(Math.max(0,v.index-40), v.index+v[0].length+40).trim()}..."`); hits++; }
}
/* A stem that asks what the course material SAYS rather than what is true.
   Every branch is anchored to course material on purpose. Bare "described as",
   "given as" and "listed" were flagged before and caught ordinary subject
   English — "a drug described by Cp = 75(e^-0.22t − e^-2.75t)", "a drug
   described as disposition rate limiting" — which is the opposite of what this
   check is for. The verb now has to point at a deck, a slide, a lecture or the
   professor before it counts. */
const STEM_RE=new RegExp(
  '\\b(' +
  'the deck|the slide|the lecture|' +
  'lecture (gives|asks|notes|states)|deck note|' +
  'as (presented|covered|taught|given|shown) in (lecture|class|the deck|the slides?)|' +
  'according to (the )?(deck|slides?|lecture|notes|syllabus|professor|instructor|her|his)|' +
  '(listed|named|described|given|shown|presented|defined) (in|on) (the |her |his )?' +
    '(deck|slides?|lecture|notes|class|syllabus|handout)' +
  ')\\b', 'i');
console.log('\n=== Stem check (every question asks the subject, not "what does the deck say") ===');
let stemHits=0;
for(const q of Q){ const m=q.stem.match(STEM_RE);
  if(m){ console.log(`  ${q.id}: "${q.stem}"`); stemHits++; } }
console.log(stemHits ? `  ${stemHits} stems refer to the course material\n` : `  all ${Q.length} stems clean\n`);
hits += stemHits;

console.log('=== Style check (questions carrying a concept block) ===');
const teachText = t => Array.isArray(t) ? t.map(p=>[p.h,p.t].filter(Boolean).join('. ')).join(' ') : (t||'');
const rebuilt = Q.filter(q=>q.teach);
for(const q of rebuilt){
  scan(teachText(q.teach), q.id+' · concept block');
  // every explanatory field, whichever question type carries it
  (q.options||[]).forEach((o,i)=>scan(o.why, q.id+' · option '+'ABCDEFGH'[i]));
  (q.steps||[]).forEach((s,i)=>scan(s.why, q.id+' · step '+(i+1)+' ('+s.k+')'));
  (q.pairs||[]).forEach((p)=>scan(p.why, q.id+' · pair '+p.l));
}
console.log(`\n  scanned ${rebuilt.length} questions`);
console.log(hits ? `  ${hits} phrasing issues found\n` : '  no flagged phrasing found\n');

/* Citation coverage. The rule is that a citation names the file and the slide.
   A slide can be named two ways: by number, where the deck was paged through
   and the number checked, or by its own title in quotes, which is what is
   available for a deck that was only ever read as extracted text with no page
   boundaries. Both point at one slide, so both count. */
const byNumber = q => /slides?\s*\d/i.test(q.cite);
const byTitle  = q => /["“][^"”]{4,}["”]/.test(q.cite);
const located  = rebuilt.filter(q => byNumber(q) || byTitle(q));
const vague    = rebuilt.filter(q => !byNumber(q) && !byTitle(q));
console.log(`  questions whose citation names a slide: ${located.length} of ${rebuilt.length}`);
console.log(`     by slide number: ${rebuilt.filter(byNumber).length}`);
console.log(`     by slide title:  ${rebuilt.filter(q => !byNumber(q) && byTitle(q)).length}`);
if(vague.length)
  console.log(`  citations naming neither a slide number nor a slide title: ${
    vague.slice(0,6).map(q=>q.id).join(', ')}${vague.length>6?' …':''}`);
console.log(`  numeric questions: ${Q.filter(q=>qType(q)==='numeric').length} · match questions: ${Q.filter(q=>qType(q)==='match').length}`);
process.exit(hits?1:0);
