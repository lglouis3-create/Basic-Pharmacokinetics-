/* Recomputes the arithmetic printed inside the worked solutions.
 *
 * test.js checks that a numeric question has a key, a tolerance, units and
 * steps. Nothing there reads the numbers written inside a step, so a line such
 * as "Cp = 40 mg/L × 1.25 × 0.595 = 29.7 mg/L" passed although the product is
 * 29.75, which rounds to 29.8. This check reads every `expression = value`
 * chain in the step text, the step `why`, each option `why`, the givens notes,
 * the setup `why` and the sanity-check text, evaluates the expression at full
 * precision and compares it with the value printed after it. It also checks
 * that the value the last step of a numeric question arrives at is graded
 * right by the question's own key and tolerance.
 *
 * What is read as arithmetic. The drill markup is turned into plain text first:
 * {{frac:a|b}} becomes ((a)/(b)), a fraction part that is only a unit
 * ({{frac:1000 mL|L}}) becomes 1, e^(x), exp, ln, log and √ are functions, ^,
 * ² and 10⁶ are powers, ×, ·, *, ÷, /, +, - and − are operators, "times",
 * "multiplied by", "divided by", "minus" and "plus" between two numbers are
 * operators, 2.76e−8 is a number, and a thousands comma is removed. The units
 * written after a number (mg/L, hr⁻¹, (mg/L)·hr, L per kg) are taken off and
 * kept with the number. Then each clause (text between ; : , and sentence
 * ends) is split at = and ≈ into sides, and each pair of neighbouring sides is
 * a link. A side is used when it is arithmetic as a whole, or when its end
 * (for the left of a link) or its start (for the right) is an arithmetic run
 * set off by English words: "the level is 15 × 0.6031 = 9.05 mg/L, so".
 * A run touching a symbol (k, VD, C0, e^(−kt), "1.25 C0") is algebra and is
 * not evaluated. A link is skipped, and counted, when a run has a percent sign
 * inside an expression, follows an operator written in words ("0.693 over
 * 0.231"), restates a value in another unit or precision, or does not
 * evaluate. Nothing is repaired or guessed.
 *
 * The rule a printed value has to meet, for each link `left = right` whose
 * left side is an expression:
 *
 *   right is one number   some value the left side can take rounds, half away
 *                         from zero, to the printed number at its printed
 *                         decimals. An integer printed with trailing zeros
 *                         (1200) may instead be the left side rounded to its
 *                         significant figures, two or more.
 *   right is expression   the author restarted from rounded values, so every
 *                         non-integer on the right, and every integer of three
 *                         or more figures (the 667 in 667/1000), stands for
 *                         all values that round to it, and the two sides'
 *                         ranges have to meet.
 *
 * The values the left side can take, which is the allowance for printed inputs
 * that were themselves rounded. A number printed with four or more significant
 * figures (0.1733, 12.04, 2.0796) is a carried intermediate and stands for
 * anything that rounds to it (±half its last digit). 0.693, 2.303 and 1.44 may
 * also stand for ln 2, ln 10 and 1/ln 2. Every other number, an integer or a
 * value of three figures or fewer (40, 1.25, 0.595), is read as exact, because
 * a reader recomputing the line has only those digits. The line above shows
 * why the cut is at four figures: if 0.595 or 1.25 could stand for any value
 * that rounds to them, 29.7 would pass, although 40 × 1.25 × 0.595 is exactly
 * 29.75 and rounds to 29.8. A tie rounds away from zero only.
 *
 * A number = number link (a value restated) is checked only when the left
 * number is a whole side, both carry the same unit, and the right prints no
 * more decimals than the left; it then has to be the left number rounded.
 *
 * Run with no argument it reads the built page every other check reads. A path
 * as the first argument reads that built page instead, which is how a scratch
 * copy is checked without rebuilding. VERBOSE=1 prints every link read and
 * every link skipped. Exits 1 when a hit is not in ALLOW.
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const OUT = process.argv[2] || (() => {
  const s = fs.readFileSync(path.join(__dirname, 'course.js'), 'utf8');
  const m = s.match(/\boutput\s*:\s*['"]([^'"]+)['"]/);
  if (!m) { console.error('FAIL: course.js declares no output'); process.exit(1); }
  return '/mnt/user-data/outputs/' + m[1];
})();
let c = [...fs.readFileSync(OUT, 'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
const b = c.lastIndexOf('   BOOT'); c = c.slice(0, c.lastIndexOf('/* ===', b));
c += '\nglobalThis.__Q=QUESTIONS;globalThis.__T=qType;globalThis.__TOL=tolOf;';
const sb = {console, localStorage:{getItem:()=>null,setItem(){},removeItem(){}},
  document:{querySelector:()=>({}),querySelectorAll:()=>[],getElementById:()=>({}),createElement:()=>({}),body:{}},
  window:{}, prompt:()=>'x', setTimeout:()=>0, clearTimeout(){},
  Date, Math, JSON, Object, Array, String, Number, Boolean, RegExp, Error, isNaN, parseInt, parseFloat};
sb.globalThis = sb; vm.createContext(sb); vm.runInContext(c, sb);
const Q = sb.__Q, qType = sb.__T, tolOf = sb.__TOL;

/* Hits that were read by hand and are not errors. Each entry names the
   question, the field as the report prints it, a piece of the printed text
   that identifies the link, and the reason in one line:
     {id:'m6-n06', field:'step 5 t', quote:'× 0.5945 =', why:'...'}
   A real arithmetic or rounding error is fixed in the bank, never listed
   here. An entry with no reason fails the check. */
const ALLOW = [
];
const noReason = ALLOW.filter(a => !a.id || !a.field || !a.quote || !String(a.why || '').trim());

/* ---- plain text ----------------------------------------------------------
   Units are dropped only where they follow a number or a closing bracket, or
   stand alone in brackets, so a symbol such as "L" in prose is not touched. */
const ATOM = '(?:mcg|µg|μg|ug|ng|mg|kg|g|mL|dL|L|hrs?|hours?|h|mins?|minutes?|sec|days?|weeks?|yr|years?|' +
             'mmol|µmol|mol|mEq|cm|ft|inch(?:es)?|lbs?|m²|tablets?|capsules?)';
const EXP = '(?:⁻¹|⁻²|\\^\\(?[-−]1\\)?|[-−]1(?![\\d.]))?';
const CHAIN = `${ATOM}${EXP}(?:(?:\\s*[/·⋅]\\s*|\\s+per\\s+)${ATOM}${EXP})*`;
const UNIT_RE = new RegExp(`([\\d)\\]}])(\\s*)(?:\\(\\s*${CHAIN}\\s*\\)(?:\\s*[·⋅/]?\\s*${CHAIN})?|${CHAIN})(?![A-Za-z0-9µ_₀-₉])`, 'g');
const BARE_UNIT = new RegExp(`^\\s*${CHAIN}\\s*$`);
const FRAC_RE = /\{\{frac:([^|}]*)\|([^}]*)\}\}/g;
const SUP = {'⁰':'0', '¹':'1', '²':'2', '³':'3', '⁴':'4', '⁵':'5', '⁶':'6', '⁷':'7', '⁸':'8', '⁹':'9', '⁻':'-'};

function plain(s){
  let t = String(s || '');
  t = t.replace(/<sup>([^<]*)<\/sup>/g, '^($1)').replace(/<sub>([^<]*)<\/sub>/g, '_$1').replace(/<[^>]+>/g, ' ');
  t = t.replace(/&minus;/g, '−').replace(/&times;/g, '×').replace(/&nbsp;/g, ' ').replace(/&[a-z]+;/g, ' ');
  // a fraction part that is a unit and nothing else ({{frac:1000 mL|L}}, {{frac:lb|2.2}}) is the number 1
  t = t.replace(FRAC_RE, (m, n, d) => ' ((' + (BARE_UNIT.test(n) ? '1' : n) + ')/(' + (BARE_UNIT.test(d) ? '1' : d) + ')) ');
  t = t.replace(/(?<![\d.,])(\d{1,3}(?:,\d{3})+)(?![\d,])/g, m => m.replace(/,/g, ''));
  // a power in superscript digits after a number, 10⁶ or 0.25²; a unit's ⁻¹ follows a letter and is left to the unit
  t = t.replace(/(\d|\))([⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (m, d, e) => d + '^(' + [...e].map(ch => SUP[ch]).join('') + ')');
  // each unit becomes a tag the tokenizer attaches to the number before it
  t = t.replace(UNIT_RE, (m, pre, sp) => pre + sp + '\u0001' + m.slice(pre.length + sp.length).replace(/\s+/g, '') + '\u0002');
  // English operators, only between a number or bracket and a number or bracket
  t = t.replace(/([\d)])\s+(?:times|multiplied by)\s+(?=[\d(])/g, '$1 * ')
       .replace(/([\d)])\s+divided by\s+(?=[\d(])/g, '$1 / ')
       .replace(/([\d)])\s+minus\s+(?=[\d(])/g, '$1 - ')
       .replace(/([\d)])\s+plus\s+(?=[\d(])/g, '$1 + ')
       .replace(/([\d)]) x (?=[\d(])/g, '$1 * ');
  // a hyphen joining a number to a word ("12-hr", "3-compartment") is part of a word, not a minus
  t = t.replace(/(\d)-(?=[A-Za-z])(?!e\^|ln|log|exp)/g, '$1‐');
  return t;
}

/* ---- tokens -------------------------------------------------------------- */
const FUNCS = new Set(['ln', 'log', 'exp', 'sqrt']);
function tokens(t){
  const out = [];
  let i = 0;
  while (i < t.length){
    const ch = t[i], rest = t.slice(i);
    let m;
    if (/\s/.test(ch)){ i++; continue; }
    if (ch === '\u0001'){
      const j = t.indexOf('\u0002', i), last = out[out.length - 1];
      if (last) last.unit = t.slice(i + 1, j);
      i = j + 1; continue;
    }
    if ((m = rest.match(/^(?:\d+(?:\.\d+)?|\.\d+)(?:e[-−+]?\d+(?![\d.]))?/))){
      // 2.76e−8: the decimals are the mantissa's, moved by the exponent
      const raw = m[0].replace('−', '-'), [mant, ex] = raw.split('e');
      const dec = Math.max(0, (mant.includes('.') ? mant.split('.')[1].length : 0) - (ex ? +ex : 0));
      out.push({ty:'num', v: parseFloat(raw), raw, dec}); i += m[0].length; continue;
    }
    if ((m = rest.match(/^[A-Za-zµμα-ωΑ-ΩΔ∞½_₀-₉ʹ'‐][A-Za-z0-9µμα-ωΑ-ΩΔ∞½_₀-₉ʹ'‐]*/))){
      const w = m[0];
      if (w === 'e' && /^\s*\^/.test(t.slice(i + 1))) out.push({ty:'fn', f:'e'});
      else if (FUNCS.has(w)) out.push({ty:'fn', f:w});
      else out.push({ty:'word', w});
      i += w.length; continue;
    }
    if (ch === '√'){ out.push({ty:'fn', f:'sqrt'}); i++; continue; }
    if ('+-−'.includes(ch)){ out.push({ty:'op', o: ch === '+' ? '+' : '-'}); i++; continue; }
    if ('*×·⋅'.includes(ch)){ out.push({ty:'op', o:'*'}); i++; continue; }
    if ('/÷'.includes(ch)){ out.push({ty:'op', o:'/'}); i++; continue; }
    if (ch === '^'){ out.push({ty:'op', o:'^'}); i++; continue; }
    if ('([{'.includes(ch)){ out.push({ty:'lp'}); i++; continue; }
    if (')]}'.includes(ch)){ out.push({ty:'rp'}); i++; continue; }
    if (ch === '='){ out.push({ty:'eq'}); i++; continue; }
    if (ch === '≈'){ out.push({ty:'eq', approx:true}); i++; continue; }
    if (ch === '%'){ out.push({ty:'pct'}); i++; continue; }
    out.push({ty:'delim', c:ch}); i++;
  }
  return out;
}
const ARITH = new Set(['num', 'op', 'lp', 'rp', 'fn', 'pct']);
/* A word that ends a value ("50 mg/L is the peak") rather than multiplying it
   ("1.25 C0"). Symbols are capitalised, carry a digit or a Greek letter, are a
   single letter, or are one of the lower-case names below. */
const SYMS = new Set(['kt', 'ka', 'ke', 'km', 'kτ', 'tmax', 'tlag', 'kel', 'auc', 'cl', 'vd', 'dt', 'dc']);
const OPWORDS = new Set(['over', 'times', 'minus', 'plus', 'per', 'into']);
const isEnglish = w => (/^[a-z‐']{2,}$/.test(w) || w === 'a') && !SYMS.has(w);

/* The arithmetic run at the start of a side (for the right side of a link) or
   at its end (for the left side). Returns {toks} or {skip: reason} or null
   when the side holds no number at all. */
function leadRun(side){
  let depth = 0, k = 0;
  for (; k < side.length; k++){
    const tk = side[k];
    if (!ARITH.has(tk.ty)) break;
    if (tk.ty === 'lp') depth++;
    if (tk.ty === 'rp'){ if (depth === 0) break; depth--; }
  }
  let run = side.slice(0, k), next = side[k];
  if (!run.some(t => t.ty === 'num')) return null;
  /* "61.1 mcg/mL (4 to 8 hr)", "0.84 (fraction excreted unchanged)": a
     bracket opened right after a complete value and holding English words is
     a note, so the value ends before the bracket. */
  if (next && next.ty === 'word' && depth > 0 && isEnglish(next.w)){
    let d = 0, open = -1;
    for (let j = run.length - 1; j >= 0; j--){
      if (run[j].ty === 'rp') d++;
      else if (run[j].ty === 'lp'){ if (d === 0){ open = j; break; } d--; }
    }
    if (open > 0 && ['num', 'rp'].includes(run[open - 1].ty)){
      run = run.slice(0, open); next = undefined;
      depth = run.reduce((a, t) => a + (t.ty === 'lp') - (t.ty === 'rp'), 0);
    }
  }
  if (next && next.ty === 'word' && (depth > 0 || !isEnglish(next.w))) return {skip:'symbolic'};
  if (depth > 0) return {skip:'unbalanced'};
  return {toks: run};
}
function tailRun(side){
  let depth = 0, k = side.length - 1;
  for (; k >= 0; k--){
    const tk = side[k];
    if (!ARITH.has(tk.ty)) break;
    if (tk.ty === 'rp') depth++;
    if (tk.ty === 'lp'){ if (depth === 0) break; depth--; }
  }
  const run = side.slice(k + 1), prev = side[k];
  if (!run.some(t => t.ty === 'num')) return null;
  if (prev && prev.ty === 'word' && !isEnglish(prev.w)) return {skip:'symbolic'};
  // "2.75 over 0.22 = 12.5": the run is the second operand of an operation written in words
  if (prev && prev.ty === 'word' && OPWORDS.has(prev.w)) return {skip:'operator in words'};
  // a bracket after a function, a number or a symbol belongs to the expression; after an English word it opens a note
  if (prev && prev.ty === 'lp' && side[k - 1] && (['fn', 'num', 'rp'].includes(side[k - 1].ty) ||
      (side[k - 1].ty === 'word' && !isEnglish(side[k - 1].w)))) return {skip:'symbolic'};
  if (prev && prev.ty === 'lp' && side[k - 1] && side[k - 1].ty === 'op' && side[k - 1].o === '^') return {skip:'symbolic'};
  if (depth > 0) return {skip:'unbalanced'};
  if (run[0].ty === 'op' && run[0].o !== '-') return {skip:'symbolic'};
  if (run[0].ty === 'op' && prev && prev.ty === 'word') return {skip:'symbolic'};
  return {toks: run};
}

/* ---- evaluation, on intervals ---------------------------------------------
   Every value is [lo, hi]. `widen` names the printed numbers that stand for
   everything that rounds to them (±half the last digit): 'all' (non-integers
   and integers of three or more figures, such as the 667 in 667/1000),
   'carried' (non-integers of four or more significant figures), or none.
   `consts` reads 0.693, 2.303 and 1.44 as ln 2, ln 10 and 1/ln 2. */
const CONSTS = {'0.693': Math.LN2, '2.303': Math.LN10, '1.44': 1 / Math.LN2};
const I = {
  add:(a, b) => [a[0] + b[0], a[1] + b[1]],
  sub:(a, b) => [a[0] - b[1], a[1] - b[0]],
  mul:(a, b) => { const p = [a[0]*b[0], a[0]*b[1], a[1]*b[0], a[1]*b[1]]; return [Math.min(...p), Math.max(...p)]; },
  div:(a, b) => { if (b[0] <= 0 && b[1] >= 0) throw 'divide by zero'; return I.mul(a, [1 / b[1], 1 / b[0]]); },
  pow:(a, b) => {
    if (a[0] === a[1] && b[0] === b[1]) return [Math.pow(a[0], b[0]), Math.pow(a[0], b[0])];
    if (b[0] === b[1] && Number.isInteger(b[0]) && b[0] > 0){          // (−2.066)²: a whole power of any range
      const p = [Math.pow(a[0], b[0]), Math.pow(a[1], b[0])];
      return [a[0] < 0 && a[1] > 0 && b[0] % 2 === 0 ? 0 : Math.min(...p), Math.max(...p)];
    }
    if (a[0] <= 0) throw 'power of a negative range';
    const p = [Math.pow(a[0], b[0]), Math.pow(a[0], b[1]), Math.pow(a[1], b[0]), Math.pow(a[1], b[1])];
    return [Math.min(...p), Math.max(...p)];
  },
  fn:(f, a) => {
    if (f === 'e' || f === 'exp') return [Math.exp(a[0]), Math.exp(a[1])];
    if (a[0] <= 0) throw 'log of a non-positive value';
    if (f === 'ln') return [Math.log(a[0]), Math.log(a[1])];
    if (f === 'log') return [Math.log10(a[0]), Math.log10(a[1])];
    if (f === 'sqrt') return [Math.sqrt(a[0]), Math.sqrt(a[1])];
    throw 'unknown function';
  },
};
const sigFigs = raw => raw.replace(/^[-−]/, '').replace('.', '').replace(/^0+/, '').length;
function evaluate(toks, {widen = '', consts = false} = {}){
  let p = 0;
  const peek = () => toks[p], take = () => toks[p++];
  const num = tk => {
    let v = consts && CONSTS[tk.raw] !== undefined ? CONSTS[tk.raw] : tk.v;
    const wide = widen === 'all' ? (tk.dec > 0 || tk.raw.replace(/0+$/, '').length >= 3)
               : widen === 'carried' && tk.dec > 0 && sigFigs(tk.raw) >= 4;
    const h = wide ? 0.5 * Math.pow(10, -tk.dec) : 0;
    return [v - h, v + h];
  };
  function primary(){
    const tk = take();
    if (!tk) throw 'end of expression';
    if (tk.ty === 'num') return num(tk);
    if (tk.ty === 'lp'){ const v = expr(); if (!peek() || peek().ty !== 'rp') throw 'open bracket'; take(); return v; }
    if (tk.ty === 'fn'){
      if (tk.f === 'e'){ const c = take(); if (!c || c.o !== '^') throw 'e without a power'; return I.fn('e', unary()); }
      const a = peek();
      if (a && a.ty === 'num'){ take(); return I.fn(tk.f, num(a)); }
      if (a && a.ty === 'lp') return I.fn(tk.f, primary());
      throw 'function without an argument';
    }
    throw 'unexpected ' + tk.ty;
  }
  function power(){
    const base = primary();
    if (peek() && peek().ty === 'op' && peek().o === '^'){ take(); return I.pow(base, unary()); }
    return base;
  }
  function unary(){
    const tk = peek();
    if (tk && tk.ty === 'op' && tk.o === '-'){ take(); const v = unary(); return [-v[1], -v[0]]; }
    if (tk && tk.ty === 'op' && tk.o === '+'){ take(); return unary(); }
    return power();
  }
  function term(){
    let v = unary();
    for (;;){
      const tk = peek(), last = toks[p - 1];
      if (tk && tk.ty === 'op' && (tk.o === '*' || tk.o === '/')){ take(); const r = unary(); v = tk.o === '*' ? I.mul(v, r) : I.div(v, r); }
      // two factors written side by side: "2.3(10)", "(50)(0.3151)", "{{frac:1|0.3234}} ln(2.291)"; never two bare numbers
      else if (tk && (tk.ty === 'lp' || tk.ty === 'fn') && last && (last.ty === 'num' || last.ty === 'rp')) v = I.mul(v, unary());
      else if (tk && tk.ty === 'num' && last && last.ty === 'rp') v = I.mul(v, unary());
      else return v;
    }
  }
  function expr(){
    let v = term();
    while (peek() && peek().ty === 'op' && (peek().o === '+' || peek().o === '-')){
      const o = take().o, r = term(); v = o === '+' ? I.add(v, r) : I.sub(v, r);
    }
    return v;
  }
  const v = expr();
  if (p !== toks.length) throw 'trailing tokens';
  if (!isFinite(v[0]) || !isFinite(v[1])) throw 'not finite';
  return v;
}
const isNumber = toks => (toks.length === 1 && toks[0].ty === 'num') ||
  (toks.length === 2 && toks[0].ty === 'op' && toks[0].o === '-' && toks[1].ty === 'num');
const numOf = toks => toks.length === 1 ? toks[0] : Object.assign({}, toks[1], {v: -toks[1].v, raw: '-' + toks[1].raw});

/* x rounded half away from zero to `dec` decimals equals the printed value.
   The tie test allows for binary floating point: 40 × 1.25 × 0.595 is held
   as 29.749999999999996, which is still the tie 29.75. */
function roundsTo(x, R){
  const f = Math.pow(10, R.dec), s = Math.abs(x) * f;
  let r = Math.floor(s);
  if (s - r >= 0.5 - 1e-9 * Math.max(1, s)) r += 1;
  return Math.sign(x || 1) * r === Math.round(R.v * f);
}
function roundsToSig(x, R){
  if (R.dec > 0 || !/0$/.test(R.raw)) return false;
  const sf = R.raw.replace(/^-/, '').replace(/0+$/, '').length;
  if (sf < 2) return false;
  return +Number(x).toPrecision(sf) === R.v;
}
const fmt = v => String(+(+v).toPrecision(7));

/* One link: does the right side say what the left side computes? The left
   side is evaluated with its carried numbers widened; with none widened it is
   the exact value the report prints. A right side that is one number passes
   when some value in the left side's range rounds to it; a right side that is
   an expression passes when the two ranges meet. */
function judge(L, R){
  const exact = evaluate(L)[0];
  const hasConst = L.some(t => t.ty === 'num' && CONSTS[t.raw] !== undefined);
  let ok = false;
  for (const consts of hasConst ? [false, true] : [false]){
    const [lo, hi] = evaluate(L, {widen:'carried', consts});
    const e = 1e-9 * Math.max(1, Math.abs(lo), Math.abs(hi));
    if (isNumber(R)){
      const n = numOf(R), h = 0.5 * Math.pow(10, -n.dec);
      if (lo === hi) ok = roundsTo(lo, n) || roundsToSig(lo, n);
      // ties round away from zero, so the band's far edge is open
      else ok = n.v >= 0 ? (lo < n.v + h - e && hi >= n.v - h - e) : (hi > n.v - h + e && lo <= n.v + h + e);
      if (!ok && lo !== hi) ok = roundsToSig((lo + hi) / 2, n);
    } else {
      const r = evaluate(R, {widen:'all'});
      ok = lo <= r[1] + e && hi >= r[0] - e;
    }
    if (ok) break;
  }
  const printed = isNumber(R) ? numOf(R).raw : fmt(evaluate(R)[0]) + ' (from ' + text(R) + ')';
  return {ok, exact, printed};
}
const text = toks => toks.map(t => t.ty === 'num' ? t.raw : t.ty === 'op' ? t.o : t.ty === 'fn' ? t.f : t.ty === 'lp' ? '(' : t.ty === 'rp' ? ')' : t.ty === 'pct' ? '%' : '').join(' ');

/* ---- reading one field ---------------------------------------------------- */
const stats = {fields:0, links:0, parsed:0, skipped:0, why:{}};
const hits = [];
/* VERBOSE=1 prints every link read and every link skipped, for reading the
   parser's decisions by hand. */
const VERBOSE = !!process.env.VERBOSE;
let here = '';
const skip = r => { stats.skipped++; stats.why[r] = (stats.why[r] || 0) + 1; if (VERBOSE) console.log(`  skip [${r}] ${here}`); };
function scanField(q, field, raw){
  if (!raw || !/=|≈/.test(raw)) return;
  stats.fields++;
  const t = plain(raw);
  // clauses: a chain never runs across ; : , or the end of a sentence
  for (const clause of t.split(/;|:\s|,\s|\.(?=\s|$)|\?|!/)){
    const toks = tokens(clause);
    const sides = [[]];
    for (const tk of toks){ if (tk.ty === 'eq') sides.push([]); else sides[sides.length - 1].push(tk); }
    if (sides.length < 2) continue;
    for (let i = 0; i + 1 < sides.length; i++){
      // a whole side is arithmetic only if its brackets also balance; "4.6 hr)" closing a note is read by leadRun
      const whole = s => { let d = 0; return s.length > 0 && s.every(t => ARITH.has(t.ty) && (d += (t.ty === 'lp') - (t.ty === 'rp')) >= 0) && d === 0; };
      const Lr = whole(sides[i]) ? {toks: sides[i]} : tailRun(sides[i]);
      const Rr = whole(sides[i + 1]) ? {toks: sides[i + 1]} : leadRun(sides[i + 1]);
      if (!Lr || !Rr) continue;                                   // a symbol on one side: algebra, not arithmetic
      stats.links++;
      here = `${q.id} · ${field} · ${clause.replace(/[\u0001\u0002]/g, '|').trim().slice(0, 160)}`;
      if (Lr.skip || Rr.skip){ skip(Lr.skip || Rr.skip); continue; }
      const L = Lr.toks, R = Rr.toks;
      // a percent sign is a unit after a lone printed value ("= 87%") and is not read inside an expression
      const Rn = R.filter(t => t.ty !== 'pct');
      if (L.some(t => t.ty === 'pct') || (Rn.length !== R.length && !isNumber(Rn))){ skip('percent'); continue; }
      if (isNumber(L) && L.length !== sides[i].length){ skip('a number after a word'); continue; }
      if (isNumber(L)){
        /* a value restated: checked only when it is the same quantity rounded;
           "1 hr = 60 min" restates it in another unit and is not compared */
        if (!isNumber(Rn)){ skip('number = expression'); continue; }
        const a = numOf(L), r = numOf(Rn);
        const uL = L[L.length - 1].unit || '', uR = (R.find(t => t.ty === 'num') || {}).unit || '';
        if (uL !== uR || R.length !== Rn.length || r.dec > a.dec){ skip('restated in another unit or precision'); continue; }
        stats.parsed++;
        if (!roundsTo(a.v, r)) hits.push({q, field, raw, exact: a.v, printed: r.raw, link: text(L) + ' = ' + text(R)});
        continue;
      }
      /* "60 × 750 mL/hr = 45 L/hr": the right side is in another unit and the
         two differ by a conversion factor, so the unit change is the step. */
      const uL = ([...L].reverse().find(t => t.ty === 'num') || {}).unit, uR = (Rn.find(t => t.ty === 'num') || {}).unit;
      if (uL && uR && uL !== uR && isNumber(Rn)){
        let x; try { x = evaluate(L)[0]; } catch (e){ x = NaN; }
        const ratio = x / numOf(Rn).v;
        if ([1000, 1e6, 60, 24, 1440].some(f => Math.abs(ratio / f - 1) < 0.01 || Math.abs(ratio * f - 1) < 0.01)){ skip('unit change'); continue; }
      }
      let res;
      try { res = judge(L, Rn); } catch (e){ skip('does not evaluate: ' + e); continue; }
      stats.parsed++;
      if (VERBOSE) console.log(`  ${res.ok ? 'ok  ' : 'HIT '} ${text(L)} = ${text(R)}  →  ${fmt(res.exact)} | ${q.id} · ${field}`);
      if (!res.ok) hits.push({q, field, raw, exact: res.exact, printed: res.printed, link: text(L) + ' = ' + text(R)});
    }
  }
}
/* ---- the bank ------------------------------------------------------------- */
const FIELDS = q => [
  ...(q.steps || []).flatMap((s, i) => [[`step ${i + 1} t`, s.t], [`step ${i + 1} why`, s.why]]),
  ...(q.options || []).map((o, i) => [`option ${'ABCDEFGH'[i]} why`, o.why]),
  ...(q.givens || []).map((g, i) => [`given ${i + 1}`, g[2]]),
  ['setup why', (q.setup || {}).why],
  ['check', (q.check || {}).t],
];
const finals = {checked:0, skipped:0};
for (const q of Q){
  const numeric = qType(q) === 'numeric';
  if (!numeric && !(q.steps || []).length && !(q.options || []).some(o => o.why && /=/.test(o.why))) continue;
  for (const [field, raw] of FIELDS(q)) scanField(q, field, raw);
  /* The value the last step arrives at: the number opening the side after
     its last "=", or the one number in a step that has no "=". It has to be
     graded right by the question's own key and tolerance. */
  if (!numeric || !(q.steps || []).length) continue;
  // a closing "Check:" step puts the answer back in; the value is the step before it
  let li = q.steps.length - 1;
  while (li > 0 && /^\s*check\b/i.test(q.steps[li].t)) li--;
  const last = q.steps[li];
  const p = plain(last.t);
  let v = null;
  const rep = p.match(/(?:reported as|rounded to)\s+([-−]?\d+(?:\.\d+)?)/);
  if (rep) v = parseFloat(rep[1].replace('−', '-'));
  else if (/=/.test(p)){
    const after = tokens(p.slice(p.lastIndexOf('=') + 1));
    const r = leadRun(after);
    if (r && r.toks && isNumber(r.toks.filter(t => t.ty !== 'pct'))) v = numOf(r.toks.filter(t => t.ty !== 'pct')).v;
  } else {
    const ns = tokens(p).filter(t => t.ty === 'num');
    if (ns.length === 1) v = ns[0].v;
  }
  if (v === null){ finals.skipped++; continue; }
  finals.checked++;
  const tol = tolOf(q);
  if (Math.abs(v - q.answer) > tol * (1 + 1e-9))
    hits.push({q, field:`step ${li + 1} t (final value against the key)`, raw:last.t, exact:q.answer,
               printed:String(v), link:`key ${q.answer} ± ${fmt(tol)}`});
}

/* ---- report --------------------------------------------------------------- */
const allowed = h => ALLOW.find(a => a.id === h.q.id && a.field === h.field && h.raw.includes(a.quote));
const open = hits.filter(h => !allowed(h)), known = hits.filter(allowed);
console.log('\n=== Step arithmetic (every printed "expression = value" recomputed) ===');
for (const h of open){
  console.log(`  ${h.q.id} · ${h.field}\n      "${h.raw.length > 220 ? h.raw.slice(0, 217) + '…' : h.raw}"` +
              `\n      ${h.link}: computed ${fmt(h.exact)}, printed ${h.printed}`);
}
for (const a of noReason) console.log(`  allow-list entry without an id, field, quote and reason: ${JSON.stringify(a)}`);
if (known.length) console.log(`  ${known.length} hit(s) on the allow-list: ${known.map(h => h.q.id).join(', ')}`);
console.log(`\n  fields read: ${stats.fields} · links with a number on both sides: ${stats.links}` +
            ` · parsed: ${stats.parsed} · skipped: ${stats.skipped}`);
for (const [r, n] of Object.entries(stats.why).sort((a, b) => b[1] - a[1])) console.log(`     skipped, ${r}: ${n}`);
console.log(`  final values against the key: ${finals.checked} checked, ${finals.skipped} skipped (no value the last step arrives at)`);
console.log(open.length ? `  ${open.length} hit(s) not on the allow-list\n` : '  no arithmetic hits\n');
process.exit(open.length || noReason.length ? 1 : 0);
