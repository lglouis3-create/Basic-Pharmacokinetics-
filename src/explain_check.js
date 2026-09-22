/* Scores how well each question explains itself.
 *
 * style_check.js catches phrasing that was rejected. This checks something
 * else: whether an explanation does the teaching work. The measures, all read
 * off the text rather than judged:
 *
 *   narration      a sentence about the question or about learning it, where a
 *                  sentence about the subject belongs
 *   thin           an option, step or pair whose `why` is too short to say more
 *                  than that the option is wrong
 *   undiagnosed    a wrong option whose `why` says what is true instead, but
 *                  never names the misunderstanding that leads someone there
 *   vague          a phrase that points at something without naming it
 *   unglossed      a term carrying real conceptual weight used with no short
 *                  definition anywhere in the question
 *
 * Reported worst-first, weighted by the marks the question's blueprint pool
 * supplies, so the ranking follows the blueprint rather than the raw count.
 *
 * This is a report, not a gate: it always exits 0.
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const OUT = (() => {
  const s = fs.readFileSync(path.join(__dirname, 'course.js'), 'utf8');
  const m = s.match(/\boutput\s*:\s*['"]([^'"]+)['"]/);
  if (!m) { console.error('FAIL: course.js declares no output'); process.exit(1); }
  return '/mnt/user-data/outputs/' + m[1];
})();
let c = [...fs.readFileSync(OUT, 'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
const b = c.lastIndexOf('   BOOT'); c = c.slice(0, c.lastIndexOf('/* ===', b));
c += '\nglobalThis.__Q=QUESTIONS;globalThis.__T=qType;globalThis.__P=poolOf;globalThis.__POOLS=POOLS;'
   + 'globalThis.GLOSS=typeof GLOSS!=="undefined"?GLOSS:[];';
const sb = {console, localStorage:{getItem:()=>null,setItem(){},removeItem(){}},
  document:{querySelector:()=>({}),querySelectorAll:()=>[],getElementById:()=>({}),createElement:()=>({}),body:{}},
  window:{}, prompt:()=>'x', setTimeout:()=>0, clearTimeout(){},
  Date, Math, JSON, Object, Array, String, Number, Boolean, RegExp, Error, isNaN, parseInt, parseFloat};
sb.globalThis = sb; vm.createContext(sb); vm.runInContext(c, sb);
const Q = sb.__Q, qType = sb.__T, poolOf = sb.__P;

/* A sentence about the question, or about the act of learning, rather than
 * about the subject. These are the openers that crowd out the explanation. */
const NARRATION = [
  /\b(this|that) (distinction|pairing|question|example|one) is worth\b/i,
  /\bworth (understanding|separating|knowing|keeping|holding|noting)\b/i,
  /\brather than (recalling|memorising|memorizing)\b/i,
  /\bexplains the whole\b/i,
  /\bwhat (matters|counts) here\b/i,
  /\bthe key (thing|point|idea) (here |is)\b/i,
  /\b(makes|making) (it|this|the requirement|them) concrete\b/i,
  /\bonce you (see|know|have) (this|that)\b/i,
  /\bthe (whole )?reason (to|for) (learn|know)\w*\b/i,
  /\bis the connection to (hold|keep)\b/i,
];

/* Vocabulary that names the misunderstanding behind a wrong choice. */
const DIAGNOSIS = new RegExp([
  'revers\\w+', 'invert\\w+', 'opposite', 'the other way', 'crossed', 'mixes?', 'mixing',
  'confus\\w+', 'misread\\w*', 'mistak\\w+', 'slip', 'inverts?',
  'recall error', 'reasoning error', 'pairing error',
  'looks? plausible', 'tempting', 'familiar', 'closest wrong', 'partial',
  '(pick\\w+|choos\\w+|select\\w+|reaching for) (this|it|that)',
  'the (usual )?(route|way) to this answer', 'the error is', 'the problem is',
  'points? at', 'comes? from (reading|treating|holding)',
  'means (recalling|matching|treating|reading|holding|sorting|counting|assuming)',
  'treats?\\b.*\\binstead', 'reads?\\b.*\\bas\\b', 'without (checking|holding|asking)',
  'stops? one step short', 'direction',
  'swapp?\\w*', 'interchang\\w+', 'easy to (swap|confus|mix|read|take)',
  'what makes (it|this|them|the two|these) (tempting|easy|plausible|hard)',
  'the error (here|is)\\b', 'is the error\\b',
  'answering\\b.{0,60}?\\bwith\\b', 'substitut\\w+\\b.{0,50}?\\bfor\\b',
  'means (answering|reading|treating|taking|carrying|substituting|reaching|'
    + 'applying|stopping|assuming|matching|recalling|holding|sorting|counting|'
    + 'naming|picking|choosing|leaving|using)',
  'comes? from (reading|treating|holding|assuming|taking|matching|naming|stopping)',
  'reverses?\\b', 'backwards\\b', 'runs the other way', 'the wrong (end|way|entry|list)',
  'stops? (short|at)\\b', 'one letter (apart|separates)', 'restated in reverse',
].join('|'), 'i');

/* A phrase that points at something without naming it. */
const VAGUE = [
  [/\b(meets?|fits?|matches?|satisf\w+) (that|this) (description|definition|criterion|requirement|pattern)\b/i, 'meets "that description"'],
  [/\b(two|both) errors? cancel|\bcancels? into\b/i, 'errors cancelling, unnamed'],
  [/\bthe (same|identical) (logic|reasoning|argument|principle) (applies|holds)\b(?!\s*(to|for|in)\b)/i, '"the same logic applies", unnamed'],
  [/\bthe (reverse|opposite) (case|situation|problem|failure)\b(?![:,]|\s+(is|of|for|here|belong|where|when))/i, '"the opposite case", unnamed'],
  [/\b(does|do|runs?|works?) the (opposite|reverse)\b(?![:,.]|\s+(of|way|direction|thing))/i, '"does the opposite", unnamed'],
  [/\bas (noted|described|mentioned) (above|earlier|previously)\b/i, '"as above"'],
  [/\bthe (former|latter)\b/i, '"the former"/"the latter"'],
  [/\bthe decks? (label|describe|call|present|list) (them|it|this|these)\b/i, 'points at the deck instead of the subject'],
];

/* The renderer glosses every term in views.js's GLOSS table at first use, so a
 * term in that table is covered wherever it appears. What is worth flagging is
 * the opposite: a weighty term used in the bank that the table does not carry,
 * which therefore reaches the page with no definition anywhere. The table is
 * read from the built page so the two can never drift apart. */
const COVERED = new Set((sb.GLOSS || []).map(g => g.k));

/* COURSE-SPECIFIC TABLE. Left empty on purpose: fill it with the terms this
 * course's questions lean on, as [key, regex-source] pairs, where the key
 * matches the GLOSS entry that would define it. Example:
 *     ['vd', 'volume of distribution'], ['auc', 'area under the curve'],
 * Anything listed here that GLOSS does not cover is reported per question. */
const WEIGHTY = [
];

/* Marks each pool supplies, read off the blueprint rather than written here. */
const rows = [];
for (const q of Q) {
  const kind = qType(q);
  const pl = poolOf(q);
  const pool = pl ? pl.key : '(off blueprint)';
  const weight = pl ? (pl.marks || 1) : 1;
  const issues = [];
  const teach = Array.isArray(q.teach)
    ? q.teach.map(p => [p.h, p.t].filter(Boolean).join('. ')).join(' ')
    : (q.teach || '');
  const whys = [
    ...(q.options || []).map((o, i) => ['option ' + 'ABCDEFGHIJ'[i], o.why || '', !!o.correct]),
    ...(q.steps   || []).map((s, i) => ['step ' + (i + 1) + ' (' + s.k + ')', s.why || '', true]),
    ...(q.pairs   || []).map(p        => ['pair ' + p.l, p.why || '', true]),
  ];
  const whole = [teach, ...whys.map(w => w[1])].join(' ');

  if (!teach) issues.push(['no concept block', 3]);

  for (const re of NARRATION) {
    const m = teach.match(re);
    if (m) { issues.push([`narration: "${m[0]}"`, 2]); break; }
  }

  const thin = [], undiagnosed = [];
  for (const [label, why, correct] of whys) {
    if (why.length < 110) thin.push(label + (why ? ` (${why.length})` : ' (none)'));
    else if (!correct && !DIAGNOSIS.test(why)) undiagnosed.push(label);
  }
  if (thin.length) issues.push([`thin explanation: ${thin.join(', ')}`, thin.length]);
  if (undiagnosed.length && teach) issues.push([`no diagnosis of the error: ${undiagnosed.join(', ')}`, undiagnosed.length * 0.5]);

  const vague = [];
  for (const [re, label] of VAGUE) {
    const fields = [['concept block', teach], ...whys.map(w => [w[0], w[1]])];
    for (const [where, txt] of fields) {
      if (txt && re.test(txt)) { vague.push(`${where}: ${label}`); break; }
    }
  }
  if (vague.length) issues.push([`vague reference: ${vague.join('; ')}`, vague.length * 1.5]);

  const unglossed = [];
  for (const [key, term] of WEIGHTY) {
    if (COVERED.has(key)) continue;                       // the renderer defines it
    if (new RegExp(term, 'i').test(whole)) unglossed.push(term.split('|')[0]);
  }
  if (unglossed.length && teach) issues.push([`no gloss available: ${unglossed.join(', ')}`, unglossed.length * 0.5]);

  // A numeric question whose working never says why a move is made is the same
  // fault as an option with no explanation, so it is scored the same way.
  if (kind === 'numeric' && !(q.steps || []).length) issues.push(['numeric question with no worked steps', 3]);

  if (issues.length) {
    const severity = issues.reduce((s, [, w]) => s + w, 0);
    rows.push({q, pool, issues, severity, rank: severity * weight});
  }
}

rows.sort((a, b) => b.rank - a.rank);

const ONLY = process.argv[2];
const shown = ONLY ? rows.filter(r => r.q.topic === ONLY || r.pool === ONLY) : rows;

console.log('\n=== Explanation quality ===');
console.log(`  ${rows.length} of ${Q.length} questions carry at least one issue\n`);
if (!WEIGHTY.length)
  console.log('  note  the weighty-terms table at the top of this file is empty, so no gloss coverage is reported\n');

const byKind = {};
for (const r of rows) for (const [label] of r.issues) {
  const k = label.split(':')[0]; byKind[k] = (byKind[k] || 0) + 1;
}
for (const k of Object.keys(byKind).sort((a, b) => byKind[b] - byKind[a]))
  console.log(`  ${String(byKind[k]).padStart(4)}  ${k}`);

const byPool = {};
for (const r of rows) byPool[r.pool] = (byPool[r.pool] || 0) + 1;
console.log('\n  by pool:');
for (const k of Object.keys(byPool).sort((a, b) => byPool[b] - byPool[a])) {
  const pl = (sb.__POOLS || []).find(p => p.key === k);
  console.log(`  ${String(byPool[k]).padStart(4)}  ${k}${pl ? ` (supplies ${pl.marks} marks)` : ''}`);
}

const LIMIT = Number(process.env.LIMIT || 30);
console.log(`\n  worst ${Math.min(LIMIT, shown.length)}, ranked by severity x exam weight:\n`);
for (const r of shown.slice(0, LIMIT)) {
  console.log(`  ${r.q.id.padEnd(11)} ${String(r.q.topic).padEnd(9)} ${r.pool.padEnd(15)} rank ${r.rank.toFixed(1)}`);
  for (const [label] of r.issues) console.log(`      - ${label}`);
}
console.log();
