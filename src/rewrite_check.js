/* Checks a rewrite of explanations against the committed version.
 *
 *   node rewrite_check.js q4_module4.js      (a question file)
 *   node rewrite_check.js reference.js       (an HTML document: reference, tell, guide)
 *
 * A rewrite may change only the wording of explanations: concept blocks
 * (teach), option and step explanations (why), and the prose of the
 * documents. It fails when it changes anything else, when a number is lost
 * or added (numbers are compared per question, or per <h3> section), when a
 * quotation changes, or when a bullet or a paragraph runs long.
 */
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const file = process.argv[2];
if (!file) { console.error('usage: node rewrite_check.js <file>'); process.exit(2); }
const here = __dirname, rel = 'src/' + file;
const now = fs.readFileSync(path.join(here, file), 'utf8');
const before = cp.execSync(`git -C ${JSON.stringify(path.join(here, '..'))} show HEAD:${rel}`, {encoding: 'utf8', maxBuffer: 1 << 26});
let bad = 0;
const fail = m => { console.log('  FAIL  ' + m); bad++; };
const nums = s => (String(s).match(/\d+(?:[.,]\d+)*/g) || []).map(x => x.replace(/,/g, ''));
const bag = arr => { const m = {}; arr.forEach(x => m[x] = (m[x] || 0) + 1); return m; };
const missing = (a, b) => { const A = bag(a), B = bag(b); return Object.keys(A).filter(k => !B[k]); };
const BANNED = [/easier to (hold|remember|recall)/i, /\bworth (doing|noticing|holding|the effort|learning)\b/i,
  /\b(memoriz\w+|by rote|recallable|learnable|under (exam )?pressure)\b/i, /\bthe (deck|slide|lecture) (states|says|gives|tells)\b/i,
  /\b(workhorse|backbone|cleaning up|clean up after|downstream of|sits at the (centre|center)|single point of failure)\b/i,
  /\b(quench\w*|mop up|soak up|hand off|catches people|the trap (here|is))\b/i, /\bis the (whole )?point\b/i,
  /\bthis (option|question) (tests|is testing|exists to|is designed to)\b/i,
  /transcript|caption|recording|this copy|that copy|handwrit|text extract|printed slide|lecture audio|\baloud\b|out loud|\bOCR\b/i];
const unquote = t => String(t).replace(/<(q|i)\b[^>]*>[\s\S]*?<\/\1>/g, ' ').replace(/[“"][^”"]*[”"]/g, ' ');   // her own words are not judged
const style = (t, where) => { t = unquote(t); for (const re of BANNED) if (re.test(t)) fail(`${where}: rejected phrasing "${t.match(re)[0]}"`); };
const fracOK = t => (t.match(/\{\{frac:/g) || []).length === (String(t).match(/\{\{frac:[^|}]*\|[^}]*\}\}/g) || []).length;

if (/^q.*\.js$/.test(file)) {
  const load = src => {
    const sb = {console}; sb.globalThis = sb; vm.createContext(sb);
    const pre = ['course.js', 'q1_module1.js'].filter(f => f !== file).map(f => fs.readFileSync(path.join(here, f), 'utf8')).join('\n');
    vm.runInContext(pre + '\n' + src + '\n;globalThis.__A = [' + [...src.matchAll(/^const (Q_[A-Z0-9_]+|EXTRAS)\s*=/gm)].map(m => m[1]).join(',') + '].flat();', sb);
    return sb.__A;
  };
  let A, B;
  try { B = load(before); } catch (e) { console.error('could not load the committed version: ' + e.message); process.exit(2); }
  try { A = load(now); } catch (e) { fail('the file does not load: ' + e.message); process.exit(1); }
  const byB = Object.fromEntries(B.map(q => [q.id, q]));
  if (A.length !== B.length) fail(`question count changed: ${B.length} -> ${A.length}`);
  const parts = t => Array.isArray(t) ? t : (t ? [{t: String(t)}] : []);
  const teachTexts = q => parts(q.teach).flatMap(p => [p.h, p.t, ...(p.list || []), p.after, ...(p.table ? [...p.table.head, ...p.table.rows.flat()] : [])]).filter(Boolean);
  const explain = q => [...teachTexts(q), ...(q.options || []).map(o => o.why), ...(q.steps || []).map(s => s.why), ...(q.pairs || []).map(p => p.why), q.note].filter(Boolean);
  let n = 0;
  for (const q of A) {
    const o = byB[q.id]; if (!o) { fail(`${q.id}: not in the committed version`); continue; }
    for (const f of ['stem', 'cite', 'quote', 'answer', 'tol', 'units', 'concept', 'skill', 'topic', 'sub', 'module', 'exam', 'img', 'teachImg', 'type', 'multi'])
      if (JSON.stringify(q[f]) !== JSON.stringify(o[f])) fail(`${q.id}: ${f} changed`);
    if (JSON.stringify((q.options || []).map(x => [x.t, !!x.correct])) !== JSON.stringify((o.options || []).map(x => [x.t, !!x.correct]))) fail(`${q.id}: options changed`);
    if (JSON.stringify((q.steps || []).map(x => [x.k, x.t])) !== JSON.stringify((o.steps || []).map(x => [x.k, x.t]))) fail(`${q.id}: working lines changed (only their why may change)`);
    if (JSON.stringify((q.pairs || []).map(x => [x.l, x.r])) !== JSON.stringify((o.pairs || []).map(x => [x.l, x.r]))) fail(`${q.id}: pairs changed`);
    const figs = q => parts(q.teach).map(p => p.fig).filter(Boolean).join();
    if (figs(q) !== figs(o)) fail(`${q.id}: concept-block figures changed`);
    const lost = missing(explain(o).flatMap(nums), explain(q).flatMap(nums)), added = missing(explain(q).flatMap(nums), explain(o).flatMap(nums));
    if (lost.length) fail(`${q.id}: numbers dropped from the explanations: ${lost.join(', ')}`);
    if (added.length) fail(`${q.id}: numbers added to the explanations: ${added.join(', ')}`);
    for (const p of parts(q.teach)) {
      if (p.t && p.t.length > 260) fail(`${q.id}: a concept-block paragraph is ${p.t.length} characters (260 at most; use bullets)`);
      if (p.after && p.after.length > 260) fail(`${q.id}: a closing paragraph is ${p.after.length} characters (260 at most)`);
      (p.list || []).forEach(li => { if (li.length > 240) fail(`${q.id}: a bullet is ${li.length} characters (240 at most)`); });
    }
    for (const x of [...(q.options || []), ...(q.steps || []), ...(q.pairs || [])]) if (x.why && x.why.length > 340) fail(`${q.id}: an explanation is ${x.why.length} characters (340 at most)`);
    for (const t of explain(q)) { style(t, q.id); if (!fracOK(t)) fail(`${q.id}: a {{frac:a|b}} is malformed`); }
    n++;
  }
  console.log(`${n} questions checked in ${file}`);
} else {
  // HTML document: compare section by section
  const body = s => s.slice(s.indexOf('`') + 1, s.lastIndexOf('`'));
  const secs = h => h.split(/(?=<h3[\s>])/).map(x => ({head: (x.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [, '(top)'])[1], html: x}));
  const quotes = h => [...h.matchAll(/<(q|i)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(m => m[2].replace(/\s+/g, ' ').trim()).filter(t => /["“”]/.test(t) || true);
  const text = h => h.replace(/<[^>]+>/g, ' ');
  const A = secs(body(now)), B = secs(body(before));
  if (A.length !== B.length) fail(`section count changed: ${B.length} -> ${A.length}`);
  A.forEach((s, i) => {
    const o = B[i]; if (!o) return;
    if (s.head !== o.head) fail(`section ${i}: heading changed`);
    const lost = missing(nums(text(o.html)), nums(text(s.html))), added = missing(nums(text(s.html)), nums(text(o.html)));
    if (lost.length) fail(`"${text(o.head).trim().slice(0, 50)}": numbers dropped: ${lost.join(', ')}`);
    if (added.length) fail(`"${text(o.head).trim().slice(0, 50)}": numbers added: ${added.join(', ')}`);
    const qo = quotes(o.html).filter(t => /^["“]/.test(t) || /^[^<]*$/.test(t)), qn = new Set(quotes(s.html));
    for (const t of quotes(o.html)) if (/^["“]/.test(t) && !qn.has(t)) fail(`"${text(o.head).trim().slice(0, 40)}": a quotation changed or was dropped: ${t.slice(0, 60)}`);
    for (const m of s.html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) { const t = text(m[1]).replace(/\s+/g, ' ').trim(); if (t.length > 320) fail(`"${text(s.head).trim().slice(0, 40)}": a paragraph is ${t.length} characters (320 at most; use bullets)`); }
    for (const m of s.html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)) { const t = text(m[1]).replace(/\s+/g, ' ').trim(); if (t.length > 360 && !/<q/.test(m[1])) fail(`"${text(s.head).trim().slice(0, 40)}": a bullet is ${t.length} characters`); }
    const rows = h => (h.match(/<tr\b/g) || []).length;
    if (rows(s.html) !== rows(o.html)) fail(`"${text(o.head).trim().slice(0, 40)}": table rows changed (${rows(o.html)} -> ${rows(s.html)})`);
    { const t = text(unquote(s.html)); for (const re of BANNED.slice(0, -1)) if (re.test(t)) fail(`"${text(s.head).trim().slice(0, 40)}": rejected phrasing "${t.match(re)[0]}"`); }   // documents may name their sources
  });
  if (now.includes('${') || (body(now).match(/`/g) || []).length) fail('a backtick or ${ inside the template');
  console.log(`${A.length} sections checked in ${file}`);
}
console.log(bad ? `\n${bad} problem(s)\n` : '\nrewrite check passed\n');
process.exit(bad ? 1 : 0);
