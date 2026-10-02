/* guide_check.js — checks a rewritten module of guide.js before it is spliced in.

   node guide_check.js <fragment.html> <module heading text, e.g. "Module 2 - IV Bolus Administration">

   The fragment is the module's HTML from its <h2> up to the next module's <h2>.
   It is compared with the same span of guide.js at git HEAD:
   - the same <h3> headings, in the same order (jump links depend on them);
   - every objective has "In plain words" and "How she tests it";
   - only the agreed <h4> headings are used;
   - equations are written with {{frac:top|bottom}}, never as a/b inline;
   - bullets and paragraphs stay short, and quotes are few and short;
   - every number not already in that span of the old guide is listed, so its
     source can be named in the report (this list is a report, not a failure). */
const fs = require('fs');
const {execSync} = require('child_process');
const [file, modHead] = process.argv.slice(2);
if (!file || !modHead) { console.error('usage: node guide_check.js <fragment.html> "<module h2 text>"'); process.exit(2); }

const old = execSync('git show HEAD:src/guide.js', {cwd: __dirname, maxBuffer: 1 << 26}).toString();
const span = src => {
  const i = src.indexOf('<h2>' + modHead + '</h2>');
  if (i < 0) return null;
  const j = src.indexOf('<h2>', i + 4);
  return src.slice(i, j < 0 ? src.lastIndexOf('`') : j);
};
const before = span(old);
if (!before) { console.error('module heading not found in HEAD guide.js: ' + modHead); process.exit(2); }
const after = fs.readFileSync(file, 'utf8');
let fails = 0;
const fail = m => { console.log('  FAIL  ' + m); fails++; };
const text = h => h.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();

if (!after.startsWith('<h2>' + modHead + '</h2>')) fail('the fragment must start with <h2>' + modHead + '</h2>');
if (/`|\$\{/.test(after)) fail('a backtick or ${ appears; guide.js is one template string');

const h3 = s => [...s.matchAll(/<h3[^>]*>[\s\S]*?<\/h3>/g)].map(m => m[0]);
const hb = h3(before), ha = h3(after);
if (hb.join('\n') !== ha.join('\n')) fail(`the <h3> headings changed (before ${hb.length}, after ${ha.length}); keep each one byte for byte`);

const ALLOWED = ['In plain words', 'Terms to know', 'Equations', 'Worked example', 'Picture it', 'How she tests it', 'In her words'];
const sections = after.split(/(?=<h3[\s>])/).slice(1);
for (const sec of sections) {
  const name = text((sec.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || '?');
  const h4 = [...sec.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/g)].map(m => text(m[1]));
  for (const need of ['In plain words', 'How she tests it']) if (!h4.includes(need)) fail(`${name}: no "${need}" heading`);
  for (const h of h4) if (!ALLOWED.includes(h)) fail(`${name}: heading "${h}" is not one of ${ALLOWED.join(', ')}`);
  const order = h4.map(h => ALLOWED.indexOf(h));
  if (order.some((v, i) => i && v < order[i - 1])) fail(`${name}: headings out of the agreed order`);
  if (!/<p class="gsrc">/.test(sec)) fail(`${name}: no <p class="gsrc"> source line`);
  const quotes = [...sec.matchAll(/<q[^>]*>([\s\S]*?)<\/q>/g)].map(m => text(m[1]));
  if (quotes.length > 3) fail(`${name}: ${quotes.length} quotes (3 at most)`);
  for (const q of quotes) if (q.length > 220) fail(`${name}: a quote of ${q.length} characters (220 at most): "${q.slice(0, 60)}…"`);
  for (const m of sec.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)) {
    if (/<(ul|ol)/.test(m[1])) continue;
    const t = text(m[1].replace(/\{\{frac:([^|}]*)\|([^}]*)\}\}/g, '$1 $2'));
    if (t.length > 240) fail(`${name}: a bullet of ${t.length} characters (240 at most): "${t.slice(0, 70)}…"`);
  }
  for (const m of sec.matchAll(/<p(?! class="gsrc")[^>]*>([\s\S]*?)<\/p>/g)) {
    const t = text(m[1].replace(/\{\{frac:([^|}]*)\|([^}]*)\}\}/g, '$1 $2'));
    if (t.length > 300) fail(`${name}: a paragraph of ${t.length} characters (300 at most)`);
  }
}

const opens = (after.match(/\{\{frac:/g) || []).length, good = (after.match(/\{\{frac:[^|}]*\|[^}]*\}\}/g) || []).length;
if (opens !== good) fail(`${opens - good} malformed {{frac}} (the top and bottom are split by one |, and neither holds a } or |)`);

// inline division between pharmacokinetic symbols; units such as mg/L or L/hr are allowed
const bare = after.replace(/\{\{frac:[^}]*\}\}/g, ' FRAC ').replace(/<p class="gsrc">[\s\S]*?<\/p>/g, '')
  .replace(/<sub>([^<]*)<\/sub>/g, '$1').replace(/<sup>([^<]*)<\/sup>/g, '^$1');
const SYM = '(?:0\\.693|ln ?2|ln\\([^)]*\\)|[A-Z][A-Za-z0-9∞]{0,4}|d[A-Z][A-Za-z0-9]{0,3}|dt|k[a-z0-9]?|τ|tau|t|\\([^()]{1,40}\\))';
const DIV = new RegExp(`${SYM}\\s*/\\s*${SYM}(?![A-Za-z])`, 'g');
const UNIT = /^(mg|mcg|g|L|dL|mL|hr|h|min|kg|mol|mmol|day|m2)$/;
for (const m of bare.matchAll(DIV)) {
  const [l, r] = m[0].split('/').map(x => x.trim());
  if (UNIT.test(l) || UNIT.test(r)) continue;
  fail(`inline division "${m[0]}"; write it as {{frac:top|bottom}}`);
}

const nums = s => new Set((text(s.replace(/\{\{frac:([^|}]*)\|([^}]*)\}\}/g, '$1 $2')).match(/\d+(?:\.\d+)?/g) || []));
const nb = nums(before), added = [...nums(after)].filter(n => !nb.has(n));
if (added.length) console.log(`  note  numbers not in the old guide for this module (name a source for each in the report): ${added.join(', ')}`);

console.log(`${sections.length} objectives checked in ${file}`);
console.log(fails ? `\n${fails} problem(s)` : '\nguide check passed');
process.exit(fails ? 1 : 0);
