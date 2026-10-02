/* tell_check.js — checks a Tell apart fragment before it goes into tell.js.

   node tell_check.js <fragment.html>

   - table cells stay short (90 characters of text), so a row reads at a glance;
   - every Why? chip and every select option has its <template data-x>, and
     every template is reachable from a chip or an option;
   - each table is followed by its Explain-one picker;
   - equations use {{frac:top|bottom}}, never a/b inline (units such as mg/L are fine);
   - explanation bullets and definitions stay short (240 characters). */
const fs = require('fs');
const file = process.argv[2];
if (!file) { console.error('usage: node tell_check.js <fragment.html>'); process.exit(2); }
const h = fs.readFileSync(file, 'utf8');
let fails = 0;
const fail = m => { console.log('  FAIL  ' + m); fails++; };
const text = s => s.replace(/\{\{frac:([^|}]*)\|([^}]*)\}\}/g, '$1 $2').replace(/<button[\s\S]*?<\/button>/g, '')
  .replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();

if (/`|\$\{/.test(h)) fail('a backtick or ${ appears; tell.js is one template string');

const body = h.replace(/<template[\s\S]*?<\/template>/g, '');
for (const m of body.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)) {
  const t = text(m[1]);
  if (t.length > 90) fail(`a table cell of ${t.length} characters (90 at most): "${t.slice(0, 60)}…"`);
}

const templates = new Set([...h.matchAll(/<template data-x="([^"]+)">/g)].map(m => m[1]));
const chips = [...h.matchAll(/data-xpick="([^"]+)"/g)].map(m => m[1]);
const groups = [...h.matchAll(/<select data-xsel="([^"]+)">([\s\S]*?)<\/select>/g)];
const options = groups.flatMap(([, g, opts]) => [...opts.matchAll(/<option value="([^"]+)"/g)].map(o => g + ':' + o[1]));
for (const c of chips) if (!templates.has(c)) fail(`Why? chip ${c} has no template`);
for (const o of options) if (!templates.has(o)) fail(`option ${o} has no template`);
for (const t of templates) if (!options.includes(t)) fail(`template ${t} is not in its group's select`);
for (const [, g] of groups) if (!h.includes(`data-xout="${g}"`)) fail(`group ${g} has no <div class="xout" data-xout="${g}">`);
const tables = (body.match(/<table/g) || []).length;
if (tables > groups.length) fail(`${tables} tables but ${groups.length} Explain-one pickers`);

for (const m of h.matchAll(/<template data-x="([^"]+)">([\s\S]*?)<\/template>/g)) {
  for (const d of m[2].matchAll(/<(dd|li|p)[^>]*>([\s\S]*?)<\/\1>/g)) {
    const t = text(d[2]);
    if (t.length > 240) fail(`${m[1]}: a <${d[1]}> of ${t.length} characters (240 at most): "${t.slice(0, 60)}…"`);
  }
}

const opens = (h.match(/\{\{frac:/g) || []).length, good = (h.match(/\{\{frac:[^|}]*\|[^}]*\}\}/g) || []).length;
if (opens !== good) fail(`${opens - good} malformed {{frac}}`);
const bare = h.replace(/\{\{frac:[^}]*\}\}/g, ' FRAC ').replace(/<p class="gsrc">[\s\S]*?<\/p>/g, '')
  .replace(/<sub>([^<]*)<\/sub>/g, '$1').replace(/<sup>([^<]*)<\/sup>/g, '^$1');
const SYM = '(?:0\\.693|ln ?2|ln\\([^)]*\\)|[A-Z][A-Za-z0-9∞]{0,4}|d[A-Z][A-Za-z0-9]{0,3}|dt|k[a-z0-9]?|τ|tau|t|\\([^()]{1,40}\\))';
const UNIT = /^(mg|mcg|g|L|dL|mL|hr|h|min|kg|mol|mmol|day|m2)$/;
for (const m of bare.matchAll(new RegExp(`${SYM}\\s*/\\s*${SYM}(?![A-Za-z])`, 'g'))) {
  const [l, r] = m[0].split('/').map(x => x.trim());
  if (UNIT.test(l) || UNIT.test(r)) continue;
  fail(`inline division "${m[0]}"; write it as {{frac:top|bottom}}`);
}
console.log(`${templates.size} explanations, ${chips.length} Why? chips, ${groups.length} pickers in ${file}`);
console.log(fails ? `\n${fails} problem(s)` : '\ntell check passed');
process.exit(fails ? 1 : 0);
