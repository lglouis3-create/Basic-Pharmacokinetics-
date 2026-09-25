/* ==========================================================================
   FORMULAS IN TEXT
   ==========================================================================
   The bank types its formulas in plain text: C0e^(-kt), t1/2 = 0.693/k,
   Cl = k x VD. Shown as typed they read as code. This sets them the way the
   slides print them at the moment they are shown, so no stored text changes
   and nothing typed differently from before goes wrong: subscripts on the
   course's symbols (C0, VD, ka, Css, ClT, ...), a superscript for whatever
   follows a caret, t-half for t1/2, a times sign for a spaced x between
   factors, and a minus sign for a spaced hyphen. A ratio worth reading as a
   ratio is written {{frac:numerator|denominator}} and stacks.

   It runs on text already escaped, so the only markup it can produce is the
   <sub> and <sup> it writes itself.
   ========================================================================== */
const SUBSYM = [
  // longest first, so Cpeak is not read as Cp followed by eak
  ['kVD','kV<sub>D</sub>'],['FD0','FD<sub>0</sub>'],
  ['AUCoral','AUC<sub>oral</sub>'],['AUCiv','AUC<sub>IV</sub>'],['AUCpo','AUC<sub>po</sub>'],['AUCIV','AUC<sub>IV</sub>'],
  ['Cpeak','C<sub>peak</sub>'],['Cmax','C<sub>max</sub>'],['Cmin','C<sub>min</sub>'],['tmax','t<sub>max</sub>'],
  ['Css','C<sub>ss</sub>'],['ClT','Cl<sub>T</sub>'],['ClR','Cl<sub>R</sub>'],['ClH','Cl<sub>H</sub>'],['SCr','S<sub>Cr</sub>'],
  ['k12','k<sub>12</sub>'],['k21','k<sub>21</sub>'],['Cp0','C<sub>p</sub><sup>0</sup>'],['Cp','C<sub>p</sub>'],['Cs','C<sub>s</sub>'],
  ['C0','C<sub>0</sub>'],['D0','D<sub>0</sub>'],['k0','k<sub>0</sub>'],['DB','D<sub>B</sub>'],['DL','D<sub>L</sub>'],['Du','D<sub>u</sub>'],
  ['VD','V<sub>D</sub>'],['Vp','V<sub>p</sub>'],['Vt','V<sub>t</sub>'],['Vc','V<sub>c</sub>'],
  ['ka','k<sub>a</sub>'],['ke','k<sub>e</sub>'],['km','k<sub>m</sub>'],['fe','f<sub>e</sub>'],
  ['C1','C<sub>1</sub>'],['C2','C<sub>2</sub>'],['t1','t<sub>1</sub>'],['t2','t<sub>2</sub>'],['Ct','C<sub>t</sub>'],
  ['Cn','C<sub>n</sub>'],['tn','t<sub>n</sub>'],
];
const SUB_MAP = Object.fromEntries(SUBSYM);
/* A symbol stands alone: no letter before it (a digit is allowed, as in 2k0),
   and no letter or digit after it, except the e of a following exponential
   (C0e^-kt) or, for a rate constant, the t it multiplies (k0t). */
const RATE = new Set(['k0', 'ka', 'ke', 'km']);
const SUB_RE = new RegExp('(^|[^A-Za-z])(' + SUBSYM.map(s => s[0]).join('|')
  + ')(?=(e<sup>|t(?![A-Za-z0-9])|[^A-Za-z0-9]|$))', 'g');

/* the balanced group after a caret: ^(...) with nesting, or ^ and a signed run */
function sups(s){
  let out = '', i = 0;
  while(i < s.length){
    const j = s.indexOf('^', i);
    if(j < 0){ out += s.slice(i); break; }
    out += s.slice(i, j);
    if(s[j+1] === '('){
      let d = 0, k = j + 1;
      for(; k < s.length; k++){ if(s[k] === '(') d++; else if(s[k] === ')'){ d--; if(d === 0) break; } }
      if(k >= s.length){ out += s.slice(j); break; }
      out += '<sup>' + s.slice(j + 2, k) + '</sup>'; i = k + 1;
    }else{
      const m = s.slice(j + 1).match(/^[-−+]?[A-Za-z0-9.]+/);
      if(!m){ out += '^'; i = j + 1; continue; }
      out += '<sup>' + m[0] + '</sup>'; i = j + 1 + m[0].length;
    }
  }
  return out;
}

function prettyMath(s){
  let t = String(s);
  t = t.replace(/\bt1\/2(a|beta|β)?(?![A-Za-z0-9])/g,
                (m, q) => 't½' + (q ? '<sub>' + (q === 'beta' ? 'β' : q) + '</sub>' : ''));
  t = t.replace(/(\d|\)|[A-Za-z]|,) x (?=[\dA-Za-z(\[])/g, '$1 × ');    // times, between factors only
  t = t.replace(/ - (?=[\dA-Za-z(\[])/g, ' − ');                          // a spaced hyphen is a minus
  t = t.replace(/\(-/g, '(−').replace(/\^-/g, '^−');
  t = sups(t);
  t = t.replace(SUB_RE, (m, pre, sym, after) => {
    if(/^t/.test(after || '') && !RATE.has(sym)) return m;                     // only a rate constant multiplies t
    return pre + SUB_MAP[sym];
  });
  return t;
}
const rich = s => mathHTML(prettyMath(esc(s)));
const richHTML = h => mathHTML(prettyMath(h));

/* ==========================================================================
   TERM GLOSSES
   ==========================================================================
   Terms that carry conceptual weight in a course get a short definition the
   first time they appear in a question's explanation. `p` is what to match,
   `d` is the definition, and `skip` recognises a question that already defines
   the term in its own prose, so a hand-written gloss is never doubled.

   COURSE-SPECIFIC TABLE. Left empty on purpose: fill it with the terms this
   course's questions lean on. Example of the shape:

     {k:'vd', p:'volume of distribution',
      d:'the volume that would hold the whole dose at the measured plasma level',
      skip:/amount in the body divided by/i},

   explain_check.js reads this table out of the built page and reports weighty
   terms used in the bank that it does not cover, so the two cannot drift.
   ========================================================================== */
const GLOSS = [
];

/* ==========================================================================
   CONCEPT BLOCKS
   ==========================================================================
   `teach` is either a plain string or a list of {h, t} sections. A long block
   of unbroken prose is hard to scan and hard to re-read selectively, so a
   question whose concept splits into distinct parts carries them as named
   sections instead. Both forms render, so no question has to be rewritten.
   ========================================================================== */
/* A section is {h, t} for prose, {h, list:[...]} for bullets, or both. Bullets
   are how a set of relations between the same few quantities is read: as a
   list of separate statements rather than one sentence carrying all of them. */
/* A section may also carry a comparison table, {head:[...], rows:[[...]]}:
   two things students run together, set side by side against the same rows,
   so what differs is read across a row rather than hunted for in prose. */
const teachParts = t => Array.isArray(t)
  ? t.filter(p => p && (p.t || p.fig || (p.list && p.list.length) || p.table))
      .map(p => ({h: p.h, t: p.t ? String(p.t) : '', list: (p.list || []).map(String), fig: p.fig || '',
                  table: p.table || null, after: p.after ? String(p.after) : ''}))
  : (t ? [{t: String(t), list: [], fig: '', table: null, after: ''}] : []);
/* Everything a concept block says, as one string: each section's prose, its
   bullets and its table cells, so the term glosser and every check see all of it. */
const teachText  = t => teachParts(t).map(p => [p.t, ...p.list, p.after,
  ...(p.table ? [...p.table.head, ...p.table.rows.flat()] : [])].filter(Boolean).join(' ')).join(' ');
/* A column heading as plain words, for the label a narrow screen shows above
   each cell once the table has become one card per row. */
const eqPlainText = h => String(h).replace(/\{\{frac:([^|}]*)\|([^}]*)\}\}/g, '$1/$2')
  .replace(/\bka\b/g, 'k\u2090').replace(/\btmax\b/g, 't\u2098\u2090\u2093').replace(/\bCmax\b/g, 'C\u2098\u2090\u2093');
function compareTable(tb){
  const cell = c => richHTML(esc(String(c)));
  return `<div class="cmpwrap"><table class="cmp"><thead><tr>${tb.head.map(c => `<th>${cell(c)}</th>`).join('')}</tr></thead>
    <tbody>${tb.rows.map(r => `<tr><th scope="row">${cell(r[0])}</th>${r.slice(1).map((c, i) =>
      `<td data-label="${esc(eqPlainText(tb.head[i + 1]))}">${cell(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function renderTeach(t, seen, self){
  const gl = s => seen ? glossify(esc(s), seen, self) : esc(s);
  return teachParts(t).map(p =>
    (p.h ? `<h5 class="tsec">${esc(p.h)}</h5>` : '') +
    (p.t ? `<p class="prose">${richHTML(gl(p.t))}</p>` : '') +
    (p.list.length ? `<ul class="tlist">${p.list.map(li => `<li>${richHTML(gl(li))}</li>`).join('')}</ul>` : '') +
    (p.table ? compareTable(p.table) : '') +
    (p.fig && IMAGES[p.fig] ? `<img class="qimg tdimg" src="${IMAGES[p.fig]}" alt="Figure for this explanation">` : '') +
    (p.after ? `<p class="prose">${richHTML(gl(p.after))}</p>` : '')
  ).join('');
}

/* Adds each term's definition once per question, at its first appearance.
   `seen` is shared across the option explanations and the concept block, so a
   term is defined once and not at every mention. The text arrives escaped;
   insertions run right-to-left so earlier offsets stay valid. */
function glossify(txt, seen, self){
  const ins = [];
  for(const g of GLOSS){
    if(seen.has(g.k)) continue;
    if(g.skip && g.skip.test(self)) { seen.add(g.k); continue; }
    const m = txt.match(new RegExp('\\b(' + g.p + ')', 'i'));
    if(!m) continue;
    seen.add(g.k);
    ins.push([m.index + m[0].length, g.d]);
  }
  ins.sort((a,b) => b[0] - a[0]);
  let out = txt;
  for(const [at, d] of ins)
    out = out.slice(0, at) + ' <span class="gloss">(' + d + ')</span>' + out.slice(at);
  return out;
}

/* ==========================================================================
   SKILLS
   ==========================================================================
   What a question asks the student to DO, taken straight from COURSE.skills.
   A question carries its own `skill` field; there is no keyword guessing. A
   question with no skill falls back to the first one so the app still renders,
   and test.js reports it as an error so it gets fixed rather than hidden.
   ========================================================================== */
const SKILLS = COURSE.skills.map(s => [s.id, s.label]);
const SKILL_SHORT = Object.fromEntries(COURSE.skills.map(s => [s.id, s.short]));
const SKILL_IDS = new Set(COURSE.skills.map(s => s.id));
const DEFAULT_SKILL = COURSE.skills[0].id;
function skillOf(q){ return SKILL_IDS.has(q.skill) ? q.skill : DEFAULT_SKILL; }

/* ==========================================================================
   CONCEPTS AND CALCULATIONS
   ==========================================================================
   Which of the two a question is, derived rather than written on it, so a
   label can never disagree with what the question actually asks.

   A question is a calculation when answering it means producing a number.
   Every numeric question is one. A matching question is one only where a
   calculation skill is matched to computed values, which is what separates
   a battery of clearances worked out from a vignette (a calculation) from a
   table of body-compartment percentages that is simply recalled (a concept).
   Everything else, including reading an order off a plot and reasoning about
   what a doubled dose does, is a concept.
   ========================================================================== */
const SKILL_KIND = Object.fromEntries(
  COURSE.skills.map(s => [s.id, s.kind === 'calc' ? 'calc' : 'concept']));
const QUANTITY = /^[<>\u2248~]?\s*-?[\d.]/;
function kindOf(q){
  if(qType(q) === 'numeric') return 'calc';
  if(qType(q) === 'match' && SKILL_KIND[skillOf(q)] === 'calc'
     && (q.pairs || []).length && q.pairs.every(p => QUANTITY.test(String(p.r).trim())))
    return 'calc';
  return 'concept';
}
const KINDS = [
  {id: 'concept', label: 'Concepts',
   blurb: 'Definitions, what a plot shows, and what happens when something changes'},
  {id: 'calc', label: 'Calculations',
   blurb: 'Questions answered with a number, worked step by step'},
];
const KIND_LABEL = Object.assign(Object.fromEntries(KINDS.map(k => [k.id, k.label])),
                                 {chain: 'Stepwise calculations'});

/* What the Topics page is showing. Four answers to one question, so they sit
   together as one switch at the top of the page rather than as a filter chip
   among others:

     Everything             every question, each topic split three ways
     Concepts               no arithmetic anywhere on the page
     Calculations           single calculations, and the stepwise sets below
                            them, each under its own heading
     Stepwise calculations  only her problems asked in parts, where each part
                            uses the answer to the one before it

   Two kinds of calculation exist and they are drilled differently: a single
   calculation can be asked in any order, and a stepwise one only in hers. */
function reviewSwitch(){
  const base = QUESTIONS.filter(q => matchesFilter(q, true));
  const k = kindCounts(base);
  const sets = (typeof CHAINS === 'undefined' ? [] : CHAINS)
    .filter(c => c.parts.some(id => base.some(q => q.id === id)));
  const tab = (v, label, sub) =>
    `<button class="rtab" data-review="${v}" aria-pressed="${FILTER.kind === v}">${label}<small>${sub}</small></button>`;
  return `<div class="review" role="group" aria-label="What to review">
    ${tab('all', 'Everything', base.length + ' questions')}
    ${tab('concept', 'Concepts', k.concept + ' questions')}
    ${tab('calc', 'Calculations', k.calc + ' questions')}
    ${tab('chain', 'Stepwise calculations', sets.length + ' problems in parts')}
  </div>`;
}
/* How a set of questions divides, as {concept, calc}. */
function kindCounts(pool){
  const n = {concept: 0, calc: 0};
  pool.forEach(q => n[kindOf(q)]++);
  return n;
}

/* ==========================================================================
   FILTERS + VIEW ROUTING
   ========================================================================== */
const FILTER = {prof:'all', tier:'all', skill:'all', kind:'all'};
let VIEW = 'topics';

/* Tiers actually present in the bank, so the weighting chips describe this
   course rather than a remembered one. */
const ALL_TIERS = [...new Set(QUESTIONS.map(q => q.tier).filter(Boolean))].sort();

function matchesFilter(q, ignoreKind){
  if(FILTER.prof  !== 'all' && q.prof !== FILTER.prof) return false;
  if(FILTER.tier  !== 'all' && q.tier !== FILTER.tier) return false;
  if(FILTER.skill !== 'all' && skillOf(q) !== FILTER.skill) return false;
  if(!ignoreKind){
    if(FILTER.kind === 'chain'){ if(!CHAIN_OF[q.id]) return false; }
    else if(FILTER.kind !== 'all' && kindOf(q) !== FILTER.kind) return false;
  }
  return true;
}
function poolFor(topicId, subId){
  return QUESTIONS.filter(q =>
    (!topicId || q.topic === topicId) &&
    (!subId   || q.sub   === subId)   &&
    matchesFilter(q));
}

const VIEWS = ['topics','quiz','gaps','exam','guide','tell','eq','ref','settings'];
function show(v){
  VIEW = v;
  document.querySelectorAll('#nav button').forEach(b=>b.setAttribute('aria-selected', b.dataset.v===v));
  VIEWS.forEach(k => document.getElementById('v-'+k).classList.toggle('hide', k!==v));
  window.scrollTo(0,0);
  ({topics:renderTopics, quiz:renderQuiz, gaps:renderGaps, exam:renderExam,
    guide:renderGuide, tell:renderTell, eq:renderEq, ref:renderRef, settings:renderSettings}[v])();
}

/* ==========================================================================
   TOPICS
   ========================================================================== */
function filterBar(){
  const chip=(g,v,l)=>`<button class="chip" data-f="${g}" data-v="${v}" aria-pressed="${FILTER[g]===v}">${l}</button>`;
  let h = `<div class="filters">`;
  // one professor means the chips would only ever say "both" and one name
  if(COURSE.professors.length > 1){
    h += `<div class="frow"><label>Professor</label>
      ${chip('prof','all','All')}${COURSE.professors.map(p=>chip('prof',p,esc(p))).join('')}</div>`;
  }
  if(ALL_TIERS.length > 1){
    h += `<div class="frow"><label>Weighting</label>
      ${chip('tier','all','All')}${ALL_TIERS.map(t=>chip('tier',t,esc(t))).join('')}</div>`;
  }
  /* Only the skills present under the review mode chosen above, so reviewing
     concepts does not offer a row of calculation types to pick from. A skill
     chosen earlier that the new mode does not hold is let go. */
  const inMode = QUESTIONS.filter(q => {
    if(FILTER.kind === 'chain') return !!CHAIN_OF[q.id];
    return FILTER.kind === 'all' || kindOf(q) === FILTER.kind;
  });
  const skills = COURSE.skills.filter(s => inMode.some(q => skillOf(q) === s.id));
  if(FILTER.skill !== 'all' && !skills.some(s => s.id === FILTER.skill)) FILTER.skill = 'all';
  if(skills.length > 1 && FILTER.kind !== 'chain')
    h += `<div class="frow"><label>What it asks</label>
      ${chip('skill','all','Any')}${skills.map(s=>chip('skill',s.id,esc(s.label))).join('')}</div>`;
  if(h === `<div class="filters">`) return '';
  return h + `</div>`;
}

/* One topic's card: its subtopics, each with a Start button, then the whole
   topic. Used on its own when the course has no outline, and inside a module
   group when it has. */
function topicCard(t){
  const pool = poolFor(t.id, null);
  if(!pool.length) return '';
  const m = masteryOf(pool);
  const pct = m.total ? Math.round(100*m.mastered/m.total) : 0;
  let h = `<details class="topic"${t.open?' open':''}>
    <summary>
      <span class="tname">${esc(t.name)}<small>${esc(t.cite||'')}</small></span>
      ${profTag(t.prof)}
      <span class="meter"><i style="width:${pct}%"></i></span>
      <span class="counts">${m.mastered}/${m.total}</span>
    </summary>
    <div class="subs">`;
  for(const s of (t.subs||[])){
    const sp = poolFor(t.id, s.id);
    if(!sp.length) continue;
    const sm = masteryOf(sp);
    const spct = sm.total ? Math.round(100*sm.mastered/sm.total) : 0;
    const done = sm.total && sm.mastered === sm.total;
    h += `<div class="subrow">
      <span class="sname">${esc(s.name)}<small>${splitNote(sp)} · ${esc(s.cite||'')}</small></span>
      <span class="meter"><i style="width:${spct}%"></i></span>
      <button data-t="${t.id}" data-s="${s.id}" data-k="" class="${done?'done':''}">${done?'Review':'Start'}</button>
    </div>`;
  }
  h += `<div class="ksplit">${startRows(pool, t.name, `data-t="${t.id}" data-s=""`)}</div>`;
  return h + `</div></details>`;
}

/* Which module a topic belongs to: the module most of its questions carry.
   Read off the bank rather than written on the topic, so a topic cannot say
   one module while its questions say another. */
function moduleOfTopic(t){
  const n = {};
  QUESTIONS.forEach(q => { if(q.topic === t.id && q.module != null) n[q.module] = (n[q.module] || 0) + 1; });
  const best = Object.keys(n).sort((a, b) => n[b] - n[a])[0];
  return best === undefined ? null : +best;
}

/* The course outline the Topics view follows, from COURSE.topicsMenu. A module
   entry gathers the topics whose questions carry its number; an exam entry and
   a view entry pass through as they are. A course with no outline lists its
   topics one after another. */
function outline(){
  if(!Array.isArray(COURSE.topicsMenu) || !COURSE.topicsMenu.length)
    return TOPICS.map(t => ({topic: t}));
  const mod = new Map(TOPICS.map(t => [t, moduleOfTopic(t)]));
  return COURSE.topicsMenu.map(m => m.module != null
    ? Object.assign({topics: TOPICS.filter(t => mod.get(t) === m.module)}, m) : m);
}
const examQuestions = id => poolFor(null, null).filter(q => q.exam === id);
const ofKind = (pool, kind) => pool.filter(q => kindOf(q) === kind);
/* How many questions a set holds, and how they divide, for a row's caption.
   With a kind already chosen in the filter bar the division is not stated,
   because everything on the page is then of that one kind. */
function splitNote(pool){
  const n = `${pool.length} question${pool.length === 1 ? '' : 's'}`;
  if(FILTER.kind !== 'all') return n;
  const k = kindCounts(pool);
  if(!k.concept || !k.calc) return n + (k.calc ? ', all calculations' : ', all concepts');
  return `${n} — ${k.concept} concept${k.concept === 1 ? '' : 's'}, ${k.calc} calculation${k.calc === 1 ? '' : 's'}`;
}

/* The start rows for one set of questions. With no kind chosen in the filter
   bar, concepts and calculations are offered separately and together, so the
   choice can be made per topic without changing what the rest of the page
   shows. With a kind already chosen, that choice has been made and one row is
   offered. `attr` is what the button carries so the caller can route it. */
/* The problem sets a module holds, each worked straight through in her part
   order. Listed under the topics rather than inside one, because a set draws
   on several of them: her eight-part battery moves from the rate constant to
   the volume of distribution to clearance. */
function chainRows(module){
  const cs = chainsInModule(module);
  if(!cs.length) return '';
  return `<div class="mfoot stepwise"><h4 class="sethead">Stepwise calculations</h4>
    <p class="setnote">Her problems asked in parts, where each part uses the answer to the
    part before it. Worked straight through in her order.</p>` + cs.map(c => {
      const parts = c.parts.map(byId).filter(Boolean);
      const m = masteryOf(parts), pct = m.total ? Math.round(100*m.mastered/m.total) : 0;
      return `<div class="subrow"><span class="sname"><b>${esc(c.name)}</b>
        <small>${parts.length} parts \u00b7 ${c.setup}</small></span>
        <span class="meter"><i style="width:${pct}%"></i></span>
        <button data-chain="${esc(c.id)}">Start</button></div>`;
    }).join('') + `</div>`;
}

/* The adaptive rows for an exam recap, split the same way a topic's are. */
function examRows(pool, id){
  const row = (title, sub, k) =>
    `<div class="subrow"><span class="sname"><b>${title}</b><small>${sub}</small></span>
      <button data-exam="${id}" data-how="adaptive" data-k="${k}">Start</button></div>`;
  const due = 'missed concepts first; stops when nothing is due';
  if(FILTER.kind !== 'all')
    return row('Everything on this exam, adaptive',
               `${pool.length} questions, ${esc(KIND_LABEL[FILTER.kind].toLowerCase())} only — ${due}`, '');
  const c = ofKind(pool, 'concept').length, m = ofKind(pool, 'calc').length;
  if(!c || !m) return row('Everything on this exam, adaptive', `${pool.length} questions — ${due}`, '');
  return row('Concepts on this exam, adaptive', `${c} questions, no arithmetic — ${due}`, 'concept')
       + row('Calculations on this exam, adaptive', `${m} questions, each worked to a number — ${due}`, 'calc')
       + row('Everything on this exam, adaptive', `${pool.length} questions — ${due}`, '');
}

function startRows(pool, name, attr){
  const label = n => `${n} question${n === 1 ? '' : 's'}`;
  const row = (title, sub, k, ghost) =>
    `<div class="subrow"><span class="sname"><b>${title}</b><small>${sub}</small></span>
      <button ${attr} data-k="${k}"${ghost ? ' class="ghost"' : ''}>Start</button></div>`;
  if(FILTER.kind !== 'all')
    return row(`Everything in ${esc(name)}`,
               `${label(pool.length)}, ${esc(KIND_LABEL[FILTER.kind].toLowerCase())} only`, '');
  const c = ofKind(pool, 'concept').length, m = ofKind(pool, 'calc').length;
  if(!c || !m) return row(`Everything in ${esc(name)}`, `${label(pool.length)}, mixed order`, '');
  return row(`Concepts in ${esc(name)}`, `${label(c)}, no arithmetic`, 'concept')
       + row(`Calculations in ${esc(name)}`, `${label(m)}, each one on its own, in any order`, 'calc')
       + row(`Everything in ${esc(name)}`, `${label(pool.length)}, concepts and calculations mixed`, '', true);
}

/* When the page was last built, in the reader's own time zone. */
function updatedText(){
  if(typeof BUILD_AT === 'undefined') return '';
  const d = new Date(BUILD_AT);
  if(isNaN(d)) return '';
  return 'Last updated ' + d.toLocaleString(undefined, {weekday: 'short', day: 'numeric', month: 'long',
    year: 'numeric', hour: 'numeric', minute: '2-digit'});
}

function renderTopics(){
  const shares = poolShares();
  const covered = shares.reduce((s,o)=> s + Math.min(o.want, poolQuestions(o.pool).length), 0);

  let h = `<h2>Pick a topic</h2>${updatedText() ? `<p class="updated">${esc(updatedText())}</p>` : ''}
  <p class="sub">${esc(EXAM.name)} is ${EXAM.questions} questions in ${EXAM.minutes} minutes${
      EXAM.date ? ` on ${esc(EXAM.date)}` : ''}.
    ${EXAM.blurb ? esc(EXAM.blurb) + ' ' : ''}
    Question bank: ${QUESTIONS.length} across ${conceptsIn(QUESTIONS).length} concepts.${
    COURSE.exams.length > 1 ? ' The paper being prepared for can be changed under Exam or Settings.' : ''}</p>`;

  h += reviewSwitch();
  h += filterBar();
  const stepwiseOnly = FILTER.kind === 'chain';

  // The featured pass follows the paper rather than the bank: a straight pass
  // through everything spends most of its time wherever the most questions
  // happen to have been written, which is not where the marks are.
  const nAll = QUESTIONS.length, nFiltered = poolFor(null, null).length;
  const byKind = FILTER.kind === 'concept' || FILTER.kind === 'calc';
  const noun = byKind ? KIND_LABEL[FILTER.kind].toLowerCase() : 'questions';
  const wp = weightedPool().filter(q => !byKind || kindOf(q) === FILTER.kind);
  if(!stepwiseOnly) h += `<div class="topic sweepcard"><div class="subs">
    <div class="subrow"><span class="sname"><b>Exam-weighted pass — ${wp.length} ${noun}</b>
      <small>The pools sampled in the blueprint's own proportion. Shuffled, each once.</small></span>
      <button id="sweepWeighted">Start</button></div>
    ${byKind ? '' : `<div class="subrow"><span class="sname"><b>All ${nAll} questions, one pass</b>
      <small>Everything in the bank, shuffled, each asked once, nothing held back by scheduling</small></span>
      <button id="sweepAll" class="ghost">Start</button></div>`}
    ${nFiltered < nAll ? `<div class="subrow"><span class="sname"><b>All ${nFiltered} ${
        byKind && FILTER.skill === 'all' && FILTER.prof === 'all' && FILTER.tier === 'all'
          ? noun + ', one pass' : 'under the current filters'}</b>
      <small>Shuffled, each asked once, nothing held back by scheduling</small></span>
      <button id="sweepFiltered" class="ghost">Start</button></div>` : ''}
  </div></div>`;

  for(const m of outline()){
    if(m.topic){ h += topicCard(m.topic); continue; }

    if(m.view){
      h += `<div class="module"><div class="mrow">
        <span class="mname">${esc(m.name)}<small>${
          m.view === 'eq'  ? 'Type them out or build them from pieces; the full table with symbols and units is under Reference'
        : m.view === 'ref' ? 'Every equation with its symbols, units and when it applies' : ''}</small></span>
        <button data-view="${esc(m.view)}">Open</button></div></div>`;
      continue;
    }

    if(m.exam != null){
      if(stepwiseOnly) continue;          // a recap is a mixed drill, not a problem set
      const ex = COURSE.exams.find(e => e.id === m.exam);
      const pool = examQuestions(m.exam);
      if(!pool.length) continue;
      const em = masteryOf(pool), epct = em.total ? Math.round(100*em.mastered/em.total) : 0;
      h += `<details class="module"><summary>
          <span class="mname">${esc(m.name)}<small>${splitNote(pool)}${ex ? ' · ' + esc(ex.name) + ' material' : ''}</small></span>
          <span class="meter"><i style="width:${epct}%"></i></span><span class="counts">${em.mastered}/${em.total}</span>
        </summary><div class="mfoot">
        ${examRows(pool, m.exam)}
        <div class="subrow"><span class="sname"><b>Straight pass</b>
          <small>Every question once, shuffled, nothing held back by scheduling</small></span>
          <button data-exam="${m.exam}" data-how="sweep" data-k="" class="ghost">Start</button></div>
        ${ex ? `<div class="subrow"><span class="sname"><b>Sit a practice paper</b>
          <small>${ex.questions} questions in ${ex.minutes} minutes at the blueprint, no feedback until you submit</small></span>
          <button data-exam="${m.exam}" data-how="paper">Open</button></div>` : ''}
        </div></details>`;
      continue;
    }

    const ts = m.topics || [];
    const mpool = ts.flatMap(t => poolFor(t.id, null));
    if(!mpool.length) continue;
    const mm = masteryOf(mpool), mpct = mm.total ? Math.round(100*mm.mastered/mm.total) : 0;
    /* Stepwise mode shows the module's problem sets and nothing else. Concept
       mode leaves them out, since every one of them is arithmetic. The other two
       modes show them after the topics, under their own heading. */
    if(stepwiseOnly){
      const sets = chainRows(m.module);
      if(!sets) continue;
      const n = chainsInModule(m.module).length;
      h += `<details class="module" open><summary>
          <span class="mname">${esc(m.name)}<small>${n} problem${n === 1 ? '' : 's'} in parts</small></span>
        </summary>${sets}</details>`;
      continue;
    }
    h += `<details class="module"${ts.some(t => t.open) ? ' open' : ''}><summary>
        <span class="mname">${esc(m.name)}<small>${splitNote(mpool)} · ${ts.length} topic${ts.length===1?'':'s'}</small></span>
        <span class="meter"><i style="width:${mpct}%"></i></span><span class="counts">${mm.mastered}/${mm.total}</span>
      </summary>
      ${ts.map(topicCard).join('')}
      ${ts.length > 1 ? `<div class="mfoot">${startRows(mpool, m.name, `data-module="${m.module}"`)}</div>` : ''}
      ${FILTER.kind === 'concept' ? '' : chainRows(m.module)}
      </details>`;
  }

  if(!stepwiseOnly) h += `<h3>Mixed drills</h3>
  <div class="topic"><div class="subs">
    <div class="subrow"><span class="sname"><b>Everything, adaptive</b>
      <small>Whole bank under the current filters — missed concepts first, and it stops when nothing is due</small></span>
      <button data-t="" data-s="">Start</button></div>
  </div></div>`;

  if(covered < EXAM.questions){
    h += `<p class="sub" style="margin-top:14px">The bank currently covers ${covered} of
      ${EXAM.questions} questions on the blueprint. The exam simulator says which pools are short.</p>`;
  }

  const el = $('#v-topics');
  el.innerHTML = h;

  el.querySelectorAll('.chip').forEach(b => b.onclick = () => {
    FILTER[b.dataset.f] = b.dataset.v; renderTopics();
  });
  el.querySelectorAll('.rtab').forEach(b => b.onclick = () => {
    FILTER.kind = b.dataset.review; renderTopics();
  });
  el.querySelectorAll('.subrow button[data-t]').forEach(b => b.onclick = () => {
    startQuiz(b.dataset.t || null, b.dataset.s || null, b.dataset.k || null);
  });
  el.querySelectorAll('button[data-chain]').forEach(b => b.onclick = () => startChain(b.dataset.chain));
  el.querySelectorAll('button[data-view]').forEach(b => b.onclick = () => show(b.dataset.view));
  el.querySelectorAll('button[data-module]').forEach(b => b.onclick = () => {
    const m = outline().find(o => o.module === +b.dataset.module);
    if(!m) return;
    const k = b.dataset.k || null;
    startPool(narrow((m.topics || []).flatMap(t => poolFor(t.id, null)), k), kindLabel(m.name, k));
  });
  el.querySelectorAll('button[data-exam]').forEach(b => b.onclick = () => {
    const id = +b.dataset.exam, ex = COURSE.exams.find(e => e.id === id);
    const k = b.dataset.k || null;
    const label = kindLabel((ex ? ex.name : 'Exam') + ' recap', k);
    if(b.dataset.how === 'paper'){ chooseExam(id); show('exam'); return; }
    if(b.dataset.how === 'sweep') startSweepOf(narrow(examQuestions(id), k), label);
    else startPool(narrow(examQuestions(id), k), label);
  });
  const sa = document.getElementById('sweepAll');
  const sw = document.getElementById('sweepWeighted'); if(sw) sw.onclick = () => startSweep('weighted');
  if(sa) sa.onclick = () => startSweep('all');
  const sf = document.getElementById('sweepFiltered');
  if(sf) sf.onclick = () => startSweep('filtered');
}

/* ==========================================================================
   QUIZ RUNNER
   ========================================================================== */
let Q = null;     // {pool, label, current, order, answered, lastId, examMode}

function startQuiz(topicId, subId, kind){
  const t = TOPICS.find(x=>x.id===topicId);
  const s = t && (t.subs||[]).find(x=>x.id===subId);
  const name = s ? `${t.name} — ${s.name}` : (t ? t.name : 'Everything');
  startPool(narrow(poolFor(topicId, subId), kind), kindLabel(name, kind));
}
/* A drill started from a split row carries its kind in the pool and in the
   label, so what is being drilled is stated on the quiz screen as well. */
const narrow = (pool, kind) => kind ? ofKind(pool, kind) : pool;
const kindLabel = (name, kind) => kind ? `${name} — ${KIND_LABEL[kind].toLowerCase()}` : name;
/* An adaptive drill over any set of questions: the scheduler picks, missed
   concepts return first, and it stops when nothing is due. */
function startPool(pool, label){
  if(!pool.length){ alert('No questions match those filters.'); return; }
  Q = {pool, label, current:null, answered:0, lastId:null, examMode:false, picked:null, revealed:false};
  nextQuestion();
  show('quiz');
}
/* A fixed queue over any set of questions: each asked once, shuffled, with
   no scheduling gate. `scope` names a startSweep scope that can be repeated. */
function startSweepOf(pool, label, scope){
  if(!pool.length){ alert('No questions match those filters.'); return; }
  Q = {pool, label, scope, sweep: shuffle(pool.map(q => q.id)), i: 0,
       current:null, answered:0, lastId:null, examMode:false, picked:null, revealed:false};
  nextQuestion();
  show('quiz');
}

/* One of her problem sets, worked straight through in the order she asks it.
   Shaped like a sweep, but the queue is her part order rather than a shuffle,
   because the point of the set is that each part is fed by the one before it.
   A part that has been answered before is still asked: the set is a single
   piece of work and dropping (c) out of it leaves (d) unexplained. */
function startChain(id){
  const c = CHAINS.find(x => x.id === id);
  if(!c) return;
  const parts = c.parts.map(byId).filter(Boolean);
  if(!parts.length){ alert('That problem set has no questions yet.'); return; }
  Q = {pool: parts, label: c.name, chain: c, sweep: parts.map(q => q.id), i: 0,
       current:null, answered:0, lastId:null, examMode:false, picked:null, revealed:false};
  nextQuestion();
  show('quiz');
}
/* Every problem set a module holds, and the set a question belongs to. */
const chainsInModule = m => (typeof CHAINS === 'undefined' ? [] : CHAINS)
  .filter(c => c.module === m && c.parts.some(id => byId(id)));
const CHAIN_OF = (() => {
  const m = {};
  (typeof CHAINS === 'undefined' ? [] : CHAINS).forEach(c =>
    c.parts.forEach((id, i) => { m[id] = {chain: c, step: i + 1}; }));
  return m;
})();

/* The pool for the exam-weighted pass: the heaviest pool whole, and every
   other pool sampled so the set sits in the blueprint's own proportion.
   Sampling takes one question per concept before any concept repeats, so the
   smaller pools are covered broadly rather than deeply. */
function weightedPool(){
  if(!POOLS.length) return QUESTIONS.slice();
  const sized = POOLS.map(p => ({p, qs: poolQuestions(p)})).filter(s => s.qs.length);
  if(!sized.length) return QUESTIONS.slice();
  const anchor = sized.reduce((a, b) => (b.p.marks > a.p.marks ? b : a), sized[0]);
  const out = anchor.qs.slice();
  for(const s of sized){
    if(s === anchor) continue;
    const want = Math.round(anchor.qs.length * (s.p.marks || 0) / (anchor.p.marks || 1));
    out.push(...drawN(s.qs, Math.min(want, s.qs.length), new Set()));
  }
  return out;
}
/* A straight sweep: every question asked once, in shuffled order, with no
   scheduling gate. The spaced-repetition runner is the better way to study,
   but it deliberately stops when nothing is due, and when the whole set is
   examinable, seeing all of it once is its own requirement. Answers still
   record, so Weak spots stays accurate. */
function startSweep(scope){
  const pool = scope === 'filtered' ? poolFor(null, null)
             : scope === 'weighted' ? weightedPool().filter(q =>
                 !(FILTER.kind === 'concept' || FILTER.kind === 'calc') || kindOf(q) === FILTER.kind)
             : QUESTIONS.slice();
  startSweepOf(pool, scope === 'filtered' ? 'Every question under these filters'
                   : scope === 'weighted' ? 'Exam-weighted pass' : 'Every question', scope);
}

function nextQuestion(){
  let q;
  if(Q.sweep){
    // walk the fixed queue rather than asking the scheduler what is due
    q = null;
    while(Q.i < Q.sweep.length && !q) q = byId(Q.sweep[Q.i++]);
  }else{
    q = pickNext(Q.pool, Q.lastId);
  }
  Q.current = q;
  Q.picked = q && qType(q) === 'match' ? {} : null;
  Q.revealed = false; Q.missKind = null; Q.startedAt = Date.now();
  if(q && isMC(q)) Q.order = shuffle(q.options.map((o,i)=>i));
  else Q.order = [];
  renderQuiz();
}

/* Material that came from the lecture audio rather than a slide is marked
   wherever a citation is shown, in the quiz and in the exam review alike. */
const srcFlag = q => q.source==='transcript' ? '<span class="srcflag">from lecture audio</span>'
                   : q.source==='both'       ? '<span class="srcflag">slides and lecture audio</span>' : '';

/* ---- shared input rendering, used by the quiz and the exam alike ---------- */
function numericInput(q, value, disabled, state){
  return `<div class="numrow${state ? ' ' + state : ''}">
    <input class="numin" type="text" inputmode="decimal" id="numIn"
      value="${esc(value == null ? '' : value)}"${disabled ? ' disabled' : ''}
      aria-label="Your answer in ${esc(q.units)}" placeholder="number">
    <span class="units">${esc(q.units)}</span>
  </div>`;
}
function matchSelects(q, picks, disabled, showMarks){
  const p = picks || {};
  return `<div class="matchgrid">` + (q.left||[]).map((l, i) => {
    let cls = '';
    if(showMarks){
      const want = (q.pairs||[]).find(x => x.l === l);
      cls = want && p[l] === want.r ? ' class="ok"' : ' class="bad"';
    }
    return `<div class="mleft">${esc(l)}</div>
      <select data-l="${esc(l)}" id="mSel${i}"${disabled ? ' disabled' : ''}${cls}
        aria-label="Match for ${esc(l)}">
        <option value=""${p[l] ? '' : ' selected'}>— choose —</option>
        ${(q.right||[]).map(r => `<option value="${esc(r)}"${p[l] === r ? ' selected' : ''}>${esc(r)}</option>`).join('')}
      </select>`;
  }).join('') + `</div>`;
}
function stepsBlock(q){
  return `<div class="steps"><h4>The working, one line at a time</h4>` +
    (q.steps||[]).map(s => `<div class="step">
      <span class="stepk">${esc(s.k)}</span>
      <span class="stept">${rich(s.t)}<span class="stepwhy">${rich(s.why)}</span></span>
    </div>`).join('') + `</div>`;
}
function pairsBlock(q){
  return `<div class="steps"><h4>Each pair, and why</h4>` +
    (q.pairs||[]).map(p => `<div class="pairrow">
      <span class="pl">${esc(p.l)}</span>
      <span class="pr">${rich(p.r)}<span>${rich(p.why)}</span></span>
    </div>`).join('') + `</div>`;
}

function renderQuiz(){
  const el = $('#v-quiz');
  if(!Q){ el.innerHTML = `<div class="empty">Choose a topic to begin.</div>`; return; }
  if(!Q.current && Q.sweep){
    el.innerHTML = `<div class="empty">
      <p><b>${Q.chain ? `That is every part of ${esc(Q.chain.name)} — all ${Q.sweep.length}.`
                      : `That is every question in this set — all ${Q.sweep.length} of them.`}</b></p>
      <p style="margin:10px 0 16px">Everything you answered is recorded, so Weak spots now
        reflects the whole bank and the adaptive runner will bring the missed concepts back first.</p>
      <p style="display:flex;gap:9px;flex-wrap:wrap;justify-content:center">
        <button class="btn" id="goGaps">See weak spots</button>
        ${Q.scope ? '<button class="btn ghost" id="goAgain">Sweep again, reshuffled</button>' : ''}
        <button class="btn ghost" onclick="show('topics')">Back to topics</button>
      </p></div>`;
    document.getElementById('goGaps').onclick = () => show('gaps');
    const ga = document.getElementById('goAgain');
    if(ga) ga.onclick = () => startSweep(Q.scope);
    return;
  }
  if(!Q.current){
    const t = TOPICS.find(x=>x.name===String(Q.label).split(' — ')[0]);
    const wider = t ? poolFor(t.id, null).length : 0;
    el.innerHTML = `<div class="empty">
      <p><b>You have worked through everything available in this set.</b></p>
      <p style="margin:10px 0 16px">${Q.pool.length === 1
        ? 'This subtopic currently holds one question, so there is nothing further to draw from here.'
        : 'Every concept here has been answered and is scheduled to return later.'}</p>
      <p style="display:flex;gap:9px;flex-wrap:wrap;justify-content:center">
        ${t && wider > Q.pool.length
          ? `<button class="btn" id="goWide">Continue with all of ${esc(t.name)} (${wider})</button>` : ''}
        <button class="btn${t && wider > Q.pool.length ? ' ghost' : ''}" id="goAll">Continue with everything</button>
        <button class="btn ghost" onclick="show('topics')">Back to topics</button>
      </p></div>`;
    const gw = document.getElementById('goWide');
    if (gw) gw.onclick = () => startQuiz(t.id, null);
    document.getElementById('goAll').onclick = () => startQuiz(null, null);
    return;
  }
  const q = Q.current, s = DB.concepts[q.concept];
  const kind = qType(q);
  const totalC = conceptsIn(Q.pool).length;
  const left   = remainingIn(Q.pool);
  const pctDone = totalC ? Math.round(100*(totalC-left)/totalC) : 0;
  const seenBefore = s && s.seen > 0;
  const missedBefore = s && s.wrong > 0 && s.box === 0;
  const ok = Q.revealed ? gradeAnswer(q, Q.picked) : false;

  let h = `<div class="qcard"><div class="qhead">
    ${profTag(q.prof)}
    <span>${esc(Q.label)}</span>
    <span class="spacer"></span>
    ${missedBefore ? '<span style="color:var(--bad)">missed before</span>' :
      seenBefore   ? '<span>review</span>' : '<span>new</span>'}
  </div>
  <div class="qprog">
    <span>${Q.chain ? `part ${Q.i} of ${Q.sweep.length}`
           : Q.sweep ? `question ${Q.i} of ${Q.sweep.length}` : `${Q.answered} answered`}</span>
    <span class="pbar"><i style="width:${Q.sweep ? Math.round(100*Q.i/Q.sweep.length) : pctDone}%"></i></span>
    <span>${Q.sweep ? `${Q.sweep.length - Q.i} to go` : `${left} concept${left===1?'':'s'} to go`}</span>
  </div>
  <div class="qbody">
    ${Q.chain ? `<p class="cset">${Q.chain.setup}</p>` : ''}
    <p class="stem">${rich(q.stem)}</p>`;

  if(q.img && IMAGES[q.img]) h += `<img class="qimg" src="${IMAGES[q.img]}" alt="Figure for this question">`;

  const multi = isMulti(q);
  const picks = multi ? (Q.picked || []) : null;

  if(kind === 'numeric'){
    h += `<p class="sata">Type the number and check it. Anything within ${q.tol} ${esc(q.units)} of the keyed value counts.</p>`;
    h += numericInput(q, Q.picked, Q.revealed, Q.revealed ? (ok ? 'ok' : 'bad') : '');
  }else if(kind === 'match'){
    h += `<p class="sata">Choose the matching item for each row, then check. Marked right only when every row matches.</p>`;
    h += matchSelects(q, Q.picked, Q.revealed, Q.revealed);
  }else{
    if(multi) h += `<p class="sata">Select all that apply, then check. Marked right only when the whole set matches.</p>`;
    Q.order.forEach((oi,n)=>{
      const o = q.options[oi];
      let cls = 'opt' + (multi ? ' multi' : '');
      const chosen = multi ? picks.includes(oi) : (oi === Q.picked);
      if(Q.revealed){
        if(chosen) cls += o.correct ? ' pick-ok' : ' pick-bad';
        else if(o.correct)  cls += ' reveal-ok';
      }else if(multi && chosen){
        cls += ' on';
      }
      h += `<button class="${cls}" data-o="${oi}"${Q.revealed?' disabled':''} aria-pressed="${chosen}">
        <span class="k">${multi ? (chosen ? '☑' : '☐') : LETTERS[n]}</span><span>${rich(o.t)}</span></button>`;
    });
  }

  if(Q.revealed){
    // one gloss per term per question, shared between the options and the concept block
    const seen = new Set();
    const self = [teachText(q.teach), ...(q.options||[]).map(o=>o.why||''),
                  ...(q.steps||[]).map(x=>x.why||''), ...(q.pairs||[]).map(x=>x.why||'')].join(' ');
    let verdictLine;
    if(kind === 'numeric'){
      verdictLine = ok ? `✓ Correct — keyed answer ${q.answer.toFixed(4)} ${esc(q.units)}`
        : `✗ Not correct — the answer is ${q.answer.toFixed(4)} ${esc(q.units)}, and you entered ${esc(String(Q.picked||'nothing'))}`;
    }else if(kind === 'match'){
      const got = (q.pairs||[]).filter(p => (Q.picked||{})[p.l] === p.r).length;
      verdictLine = ok ? `✓ Correct — all ${q.pairs.length} rows matched`
        : `✗ Not correct — ${got} of ${q.pairs.length} rows matched`;
    }else if(multi){
      const want = correctSet(q);
      const missedOnes = want.filter(i => !picks.includes(i)).length;
      const extraOnes  = picks.filter(i => !want.includes(i)).length;
      verdictLine = ok ? `✓ Correct — all ${want.length} identified`
        : `✗ Not correct — ${missedOnes ? missedOnes + ' correct option' + (missedOnes>1?'s':'') + ' left out' : ''}${
            missedOnes && extraOnes ? ', ' : ''}${extraOnes ? extraOnes + ' wrong option' + (extraOnes>1?'s':'') + ' included' : ''}`;
    }else{
      verdictLine = ok ? '✓ Correct'
        : `✗ Not correct — the answer is ${LETTERS[Q.order.indexOf(q.options.findIndex(o=>o.correct))]}`;
    }
    h += `<div class="why">
      <p class="verdict ${ok?'ok':'bad'}">${verdictLine}</p>`;

    if(kind === 'numeric'){
      /* A missed calculation is asked about before it is explained. Naming the
         kind of slip takes one click, and it is the only way the app can tell
         a student who cannot set the problem up from one who sets it up
         correctly and loses the marks converting units. */
      if(!ok && !Q.missKind){
        h += `<div class="misskind"><p><b>Which kind of miss was this?</b> One click, then the working.</p>
          <div class="frow">${MISS_KINDS.map(m =>
            `<button data-mk="${m.id}" aria-pressed="false" title="${esc(m.hint)}">${esc(m.label)}</button>`).join('')}</div></div>`;
      }else{
        if(!ok) h += `<p class="sub" style="margin:0 0 8px">Logged as a ${esc((MISS_LABEL[Q.missKind]||'').toLowerCase())} miss.</p>`;
        h += stepsBlock(q);
      }
    }else if(kind === 'match'){
      h += pairsBlock(q);
    }else{
      Q.order.forEach((oi,n)=>{
        const o = q.options[oi];
        const chosen = multi ? picks.includes(oi) : (oi === Q.picked);
        h += `<div class="wrow">
          <span class="mark ${o.correct?'y':'n'}">${o.correct?'✓':'✗'}</span>
          <span class="wtxt"><b>${LETTERS[n]}. ${rich(o.t)}</b>${multi && chosen ? ' <i class="youpicked">you selected this</i>' : ''} — ${richHTML(glossify(esc(o.why), seen, self))}</span>
          </div>`;
      });
    }

    if(q.teach) h += `<div class="teach"><h4>The concept behind this</h4>${
        q.teachImg && IMAGES[q.teachImg] ? `<img class="qimg tdimg" src="${IMAGES[q.teachImg]}" alt="Figure from the lecture slide">` : ''}${
        renderTeach(q.teach, seen, self)}</div>`;
    if(q.note) h += `<p class="prose qnote">${rich(q.note)}</p>`;
    const inSet = CHAIN_OF[q.id];
    if(inSet && !Q.chain)
      h += `<p class="prose" style="margin:13px 0 0;font-size:14.5px">She sets this as part
        ${inSet.step} of ${inSet.chain.parts.length} of one problem: ${esc(inSet.chain.name)}.
        <button class="linkish" id="btnChain" data-c="${esc(inSet.chain.id)}">Work the whole set
        from the start</button></p>`;
    h += `<div class="cite">${q.quote ? `<span class="quote">“${esc(q.quote)}”</span>` : ''}${
        srcFlag(q)}${esc(q.cite)}</div>`;
    h += `</div>`;
  }
  h += `</div><div class="qfoot">`;
  if(!Q.revealed){
    if(kind === 'numeric' || kind === 'match' || multi){
      const waiting = kind === 'numeric' ? false : multi ? !picks.length : false;
      h += `<button class="btn" id="btnCheck"${waiting ? ' disabled' : ''}>Check answer</button>`;
      if(multi) h += `<span style="font-size:13px;color:var(--text-dim)">${picks.length} selected</span>`;
    }
    else h += `<span style="font-size:13px;color:var(--text-dim)">Pick an answer.</span>`;
  }else{
    h += `<button class="btn" id="btnNext">Next question</button>`;
    if(ok && !Q.guessedLogged)
      h += `<button class="btn amber" id="btnGuess">I guessed that one</button>`;
    h += `<button class="btn ghost" onclick="show('topics')">Change topic</button>`;
  }
  h += `</div></div>`;
  el.innerHTML = h;

  const setBtn = document.getElementById('btnChain');
  if(setBtn) setBtn.onclick = () => startChain(setBtn.dataset.c);
  el.querySelectorAll('.opt').forEach(b => b.onclick = () => multi ? toggleOption(+b.dataset.o) : answer(+b.dataset.o));
  const ni = document.getElementById('numIn');
  if(ni && !Q.revealed){
    ni.oninput = e => { Q.picked = e.target.value; };
    ni.onkeydown = e => { if(e.key === 'Enter'){ e.preventDefault(); submitNumeric(); } };
  }
  el.querySelectorAll('.matchgrid select').forEach(sel => { if(!Q.revealed) sel.onchange = () => {
    Q.picked = Object.assign({}, Q.picked); Q.picked[sel.dataset.l] = sel.value;
    if(!sel.value) delete Q.picked[sel.dataset.l];
  }; });
  el.querySelectorAll('[data-mk]').forEach(b => b.onclick = () => {
    Q.missKind = b.dataset.mk; setMissKind(Q.current, Q.missKind); renderQuiz();
  });
  const bc = $('#btnCheck');
  if(bc) bc.onclick = kind === 'numeric' ? submitNumeric : kind === 'match' ? submitMatch : submitMulti;
  const bn = $('#btnNext'); if(bn) bn.onclick = () => { Q.answered++; Q.lastId = Q.current.id; nextQuestion(); };
  const bg = $('#btnGuess'); if(bg) bg.onclick = () => {
    markGuessed(Q.current);
    Q.guessedLogged = true;
    bg.textContent = 'Marked as a guess';
    bg.disabled = true;
  };
}

function answer(oi){
  if(Q.revealed) return;
  Q.picked = oi; Q.revealed = true; Q.guessedLogged = false;
  record(Q.current, Q.current.options[oi].correct ? 'correct' : 'wrong', oi, Date.now() - (Q.startedAt||Date.now()));
  renderQuiz();
}
function toggleOption(oi){
  if(Q.revealed) return;
  const p = Q.picked || [];
  Q.picked = p.includes(oi) ? p.filter(x => x !== oi) : [...p, oi];
  renderQuiz();
}
function submitMulti(){
  if(Q.revealed || !Q.picked || !Q.picked.length) return;
  Q.revealed = true; Q.guessedLogged = false;
  const picks = Q.picked.slice().sort((a,b)=>a-b);
  record(Q.current, gradeMulti(Q.current, picks) ? 'correct' : 'wrong', picks, Date.now() - (Q.startedAt||Date.now()));
  renderQuiz();
}
function submitNumeric(){
  if(Q.revealed) return;
  const ni = document.getElementById('numIn');
  if(ni) Q.picked = ni.value;
  Q.revealed = true; Q.guessedLogged = false;
  record(Q.current, gradeNumeric(Q.current, Q.picked) ? 'correct' : 'wrong',
         String(Q.picked == null ? '' : Q.picked), Date.now() - (Q.startedAt||Date.now()));
  renderQuiz();
}
function submitMatch(){
  if(Q.revealed) return;
  Q.revealed = true; Q.guessedLogged = false;
  record(Q.current, gradeMatch(Q.current, Q.picked) ? 'correct' : 'wrong',
         Object.assign({}, Q.picked), Date.now() - (Q.startedAt||Date.now()));
  renderQuiz();
}

/* ==========================================================================
   WEAK SPOTS
   ========================================================================== */
function renderGaps(){
  const el = $('#v-gaps');
  const tot = DB.answers.length;
  if(!tot){
    el.innerHTML = `<h2>Weak spots</h2>
      <div class="empty">Answer some questions and this fills in with what to study next,
      your accuracy by topic weighted by what each topic is worth on the paper, and every
      question you have missed.</div>`;
    return;
  }
  const right = DB.answers.filter(a=>a.result==='correct').length;
  const guess = DB.answers.filter(a=>a.result==='guessed').length;
  const wrong = DB.answers.filter(a=>a.result==='wrong').length;
  const m = masteryOf(QUESTIONS);

  let h = `<h2>Weak spots</h2>
  <p class="sub">Every answer you have logged, weighted by what it is worth on the paper.</p>
  <div class="stat">
    <div><b>${tot}</b><span>answered</span></div>
    <div><b style="color:var(--ok)">${Math.round(100*right/tot)}%</b><span>correct</span></div>
    <div><b style="color:var(--bad)">${wrong}</b><span>missed</span></div>
    <div><b style="color:var(--warn)">${guess}</b><span>guessed</span></div>
    <div><b>${m.mastered}</b><span>of ${m.total} concepts mastered</span></div>
  </div>`;

  /* ---- What to do next ------------------------------------------------
     One card per blueprint pool, ranked by marks: concepts never seen, and
     concepts missed or guessed and not yet recovered. An unseen concept in a
     heavy pool costs more than one in a light pool, so the heavy pools lead. */
  const pools = POOLS.slice().sort((a,b) => (b.marks||0) - (a.marks||0));
  h += `<h3>What to do next</h3><div class="nextgrid">`;
  for(const pl of pools){
    const pool = poolQuestions(pl);
    const cs = conceptsIn(pool);
    const unseen = cs.filter(c => !DB.concepts[c] || !DB.concepts[c].seen);
    const open   = cs.filter(c => { const s2 = DB.concepts[c]; return s2 && s2.seen && s2.box === 0; });
    const done   = cs.filter(c => { const s2 = DB.concepts[c]; return s2 && s2.box >= MASTER_BOX; });
    // A pool the bank cannot cover yet has no concepts to count, so showing it
    // as 0 of 0 mastered would read as progress. It says what it is instead.
    if(!pool.length){
      h += `<div class="nextcard">
        <div class="nexthead"><b>${esc(pl.name)}</b><span>${pl.marks} of ${TOTAL_MARKS} marks · no questions yet</span></div>
        <div class="nextrow"><span>Not yet coverable — these ${pl.marks} marks are on the blueprint
          and nothing in the bank answers to them.</span><i>—</i></div>
      </div>`;
      continue;
    }
    h += `<div class="nextcard">
      <div class="nexthead"><b>${esc(pl.name)}</b><span>${pl.marks} of ${TOTAL_MARKS} marks · ${cs.length} concepts</span></div>
      <div class="nextrow"><span>${unseen.length} not yet seen</span>${unseen.length
        ? `<button class="btn small" data-next="unseen" data-pool="${esc(pl.key)}">Start these</button>` : '<i>none</i>'}</div>
      <div class="nextrow"><span>${open.length} missed or guessed, still open</span>${open.length
        ? `<button class="btn small amber" data-next="open" data-pool="${esc(pl.key)}">Redrill</button>` : '<i>none</i>'}</div>
      <div class="nextrow"><span>${done.length} mastered</span><i>${cs.length ? Math.round(100*done.length/cs.length) : 0}%</i></div>
    </div>`;
  }
  h += `</div>`;

  /* ---- Where the calculations go wrong ----------------------------------
     Every missed numeric question is logged with the kind of slip the student
     named. Four columns, so someone losing marks to unit conversion rather
     than to the pharmacokinetics itself can see exactly that. */
  const numAnswers = DB.answers.filter(a => { const q = byId(a.qid); return q && qType(q) === 'numeric'; });
  if(numAnswers.length){
    const byKind = {};
    MISS_KINDS.forEach(k => byKind[k.id] = {n:0, marks:0});
    let unnamed = 0;
    const numWrong = numAnswers.filter(a => a.result !== 'correct');
    for(const a of numWrong){
      if(!a.missKind || !byKind[a.missKind]){ unnamed++; continue; }
      byKind[a.missKind].n++;
      byKind[a.missKind].marks += markWeight(byId(a.qid));
    }
    const numRight = numAnswers.length - numWrong.length;
    h += `<h3>Where the calculations go wrong</h3>
    <p class="sub">Every numeric question you missed, by the kind of slip you named at the time.
      ${numRight} of ${numAnswers.length} calculations correct.</p>
    <table class="gap"><thead><tr><th>Kind of miss</th><th>Times</th><th>Marks at risk</th><th style="width:40%">Share of misses</th></tr></thead><tbody>`;
    const worst = Math.max(1, ...MISS_KINDS.map(k => byKind[k.id].n));
    for(const k of MISS_KINDS){
      const b = byKind[k.id];
      h += `<tr><td>${esc(k.label)}<br><span style="font-size:11.5px;color:var(--text-dim)">${esc(k.hint)}</span></td>
        <td${b.n?' style="font-weight:600"':''}>${b.n}</td><td>${b.marks.toFixed(1)}</td>
        <td><div class="bar"><i style="width:${Math.round(100*b.n/worst)}%;background:${b.n?'var(--bad)':'var(--line)'}"></i></div></td></tr>`;
    }
    h += `</tbody></table>`;
    if(unnamed) h += `<p class="sub">${unnamed} missed calculation${unnamed>1?'s':''} not yet named.</p>`;
  }

  /* ---- Which kind of question is failing ---------------------------------
     Every question declares what it asks the student to do. A miss on a recall
     item and a miss on a calculation call for different repairs, so the split
     is shown before the topic table, and each topic row carries its own. */
  const bySkill = {};
  SKILLS.forEach(([k]) => bySkill[k] = {n:0, r:0, w:0, g:0, atRisk:0});
  for(const a of DB.answers){
    const q = byId(a.qid); if(!q) continue;
    const b = bySkill[skillOf(q)];
    b.n++; if(a.result==='correct') b.r++; else if(a.result==='wrong') b.w++; else b.g++;
    b.atRisk += a.result==='correct' ? 0 : (a.result==='wrong' ? 1 : 0.5) * markWeight(q);
  }
  h += `<h3>Which kind of question is failing</h3>
  <p class="sub">What each question asked you to do, and how often that kind came out right.</p>
  <table class="gap"><thead><tr><th>Kind</th><th>Seen</th><th>Missed</th><th>Guessed</th><th>Marks at risk</th><th style="width:30%">Accuracy</th></tr></thead><tbody>`;
  for(const [k, label] of SKILLS){
    const b = bySkill[k]; if(!b.n) continue;
    const pct = Math.round(100*b.r/b.n);
    const col = pct>=80 ? 'var(--ok)' : pct>=60 ? 'var(--warn)' : 'var(--bad)';
    h += `<tr><td>${esc(label)}</td><td>${b.n}</td><td${b.w?' style="color:var(--bad);font-weight:600"':''}>${b.w}</td>
      <td${b.g?' style="color:var(--warn)"':''}>${b.g}</td><td${b.atRisk>=0.5?' style="font-weight:600"':''}>${b.atRisk.toFixed(1)}</td>
      <td><div class="bar"><i style="width:${pct}%;background:${col}"></i></div><span style="font-size:12px;color:var(--text-dim)">${pct}%</span></td></tr>`;
  }
  h += `</tbody></table>`;

  /* ---- Accuracy by topic, ordered by marks at risk -------------------
     A miss in a small pool that supplies many marks costs more than a miss in
     a large pool that supplies few. Sorting by that, rather than by the raw
     count, puts the topic actually costing marks at the top. */
  const rows = [];
  for(const t of TOPICS){
    const qs = QUESTIONS.filter(q=>q.topic===t.id);
    const ids = new Map(qs.map(q=>[q.id,q]));
    const as  = DB.answers.filter(a=>ids.has(a.qid));
    if(!as.length) continue;
    const r = as.filter(a=>a.result==='correct').length;
    const w = as.filter(a=>a.result==='wrong').length;
    const g = as.filter(a=>a.result==='guessed').length;
    const atRisk = as.reduce((acc,a)=> acc + (a.result==='correct' ? 0 : (a.result==='wrong' ? 1 : 0.5) * markWeight(ids.get(a.qid))), 0);
    const sk = {};
    for(const a of as){ const k = skillOf(ids.get(a.qid)); (sk[k] ||= {n:0,r:0}).n++; if(a.result==='correct') sk[k].r++; }
    rows.push({t, n:as.length, r, w, g, pct: Math.round(100*r/as.length), atRisk, sk});
  }
  rows.sort((a,b)=> b.atRisk - a.atRisk || a.pct - b.pct);

  /* ---- Weakest topics on a comparable footing ------------------------------
     Raw accuracy favours the topic answered least. Each topic with three or
     more answers is compared with the accuracy of its own blueprint pool, and
     the gap in percentage points is what ranks it. */
  const poolAcc = {};
  for(const a of DB.answers){ const q = byId(a.qid); if(!q) continue;
    const k = poolKey(q); (poolAcc[k] ||= {n:0,r:0}).n++; if(a.result==='correct') poolAcc[k].r++; }
  const weakest = rows.filter(r => r.n >= 3).map(r => {
    const first = QUESTIONS.find(q=>q.topic===r.t.id);
    const pk = first ? poolKey(first) : '';
    const pa = poolAcc[pk] ? Math.round(100*poolAcc[pk].r/poolAcc[pk].n) : r.pct;
    let worst = null;
    for(const [sk, label] of SKILLS){ const s2 = r.sk[sk]; if(!s2 || s2.n < 2) continue;
      const p = Math.round(100*s2.r/s2.n); if(!worst || p < worst.p) worst = {label, p, n:s2.n}; }
    return {r, gap: pa - r.pct, pa, worst};
  }).filter(x => x.gap > 0).sort((a,b) => b.gap - a.gap).slice(0, 5);
  if(weakest.length){
    h += `<h3>Weakest topics, on a comparable footing</h3>
    <p class="sub">Topics with three or more answers, ranked by how far they sit below the accuracy of their own pool.</p>
    <table class="gap"><thead><tr><th>Topic</th><th>Yours</th><th>Pool</th><th>Gap</th><th>Weakest kind</th></tr></thead><tbody>`;
    for(const x of weakest){
      h += `<tr><td>${esc(x.r.t.name)}</td><td>${x.r.pct}%</td><td>${x.pa}%</td><td style="color:var(--bad);font-weight:600">&minus;${x.gap}</td>
        <td>${x.worst ? `${esc(x.worst.label)} (${x.worst.p}% of ${x.worst.n})` : '<i>too few of any one kind</i>'}</td></tr>`;
    }
    h += `</tbody></table>`;
  }

  h += `<h3>Where you are losing marks</h3>
  <p class="sub">Marks at risk = each miss weighted by what one question in that pool is worth on the paper (a guess counts half).</p>
  <table class="gap"><thead><tr>
    <th>Topic</th><th>Seen</th><th>Missed</th><th>Guessed</th><th>Marks at risk</th><th style="width:30%">Accuracy</th>
  </tr></thead><tbody>`;
  for(const r of rows){
    const col = r.pct>=80 ? 'var(--ok)' : r.pct>=60 ? 'var(--warn)' : 'var(--bad)';
    h += `<tr>
      <td>${esc(r.t.name)}<br>${r.t.prof ? `<span style="font-size:11.5px;color:var(--text-dim)">${esc(r.t.prof)}</span><br>` : ''}
          <span style="font-size:11.5px;color:var(--text-dim)">${SKILLS.filter(([k]) => r.sk[k]).map(([k]) => `${SKILL_SHORT[k]} ${r.sk[k].r}/${r.sk[k].n}`).join(' &middot; ')}</span></td>
      <td>${r.n}</td>
      <td${r.w?' style="color:var(--bad);font-weight:600"':''}>${r.w}</td>
      <td${r.g?' style="color:var(--warn)"':''}>${r.g}</td>
      <td${r.atRisk>=0.5?' style="font-weight:600"':''}>${r.atRisk.toFixed(1)}</td>
      <td><div class="bar"><i style="width:${r.pct}%;background:${col}"></i></div>
          <span style="font-size:12px;color:var(--text-dim)">${r.pct}%</span></td>
    </tr>`;
  }
  h += `</tbody></table>`;

  /* ---- Confusions -------------------------------------------------------
     Which wrong option was picked, grouped. A pair that recurs is a specific
     misunderstanding with a name. Multiple choice only: a numeric miss is
     described by its miss-kind table above, not by an option pair. */
  const pairs = {};
  for(const a of DB.answers){
    if(a.result !== 'wrong' || a.picked === undefined || a.picked === null) continue;
    const q = byId(a.qid); if(!q || !isMC(q)) continue;
    const rightTxt = q.options.filter(o=>o.correct).map(o=>o.t).join(' + ');
    const pickedIdx = Array.isArray(a.picked) ? a.picked : [a.picked];
    const wrongPicked = pickedIdx.filter(i => q.options[i] && !q.options[i].correct).map(i => q.options[i].t);
    for(const wp of wrongPicked){
      const k = rightTxt + '\u0000' + wp;
      (pairs[k] ||= {right:rightTxt, wrong:wp, n:0, qids:new Set(), topic:q.topic}).n++;
      pairs[k].qids.add(q.id);
    }
  }
  const plist = Object.values(pairs).sort((a,b)=>b.n-a.n).slice(0,12);
  if(plist.length){
    h += `<h3>What you keep choosing instead</h3>
    <p class="sub">The wrong option you picked, against the right one. A pair that appears more than once is a confusion worth naming and reading up on.</p>
    <table class="gap"><thead><tr><th>You picked</th><th>The answer was</th><th>Times</th><th>Topic</th></tr></thead><tbody>`;
    for(const pr of plist){
      const t = TOPICS.find(x=>x.id===pr.topic);
      h += `<tr><td style="color:var(--bad)">${esc(pr.wrong)}</td><td style="color:var(--ok)">${esc(pr.right)}</td>
        <td${pr.n>1?' style="font-weight:600"':''}>${pr.n}</td><td>${t?esc(t.name):''}</td></tr>`;
    }
    h += `</tbody></table>`;
  }

  /* ---- Every missed question -------------------------------------------- */
  const missedIds = [...new Set(DB.answers.filter(a=>a.result==='wrong').map(a=>a.qid))];
  h += `<h3>Every question you have missed (${missedIds.length})</h3>`;
  if(!missedIds.length){
    h += `<div class="empty">Nothing missed yet.</div>`;
  }else{
    h += `<p class="sub"><button class="btn" id="drillMissed">Drill these ${missedIds.length} now</button></p>`;
    for(const id of missedIds.slice().reverse()){
      const q = byId(id); if(!q) continue;
      const s2 = DB.concepts[q.concept] || {};
      const correctTxt = qType(q)==='numeric' ? q.answer.toFixed(4) + ' ' + q.units
                       : qType(q)==='match'   ? (q.pairs||[]).map(p=>`${p.l} → ${p.r}`).join(' · ')
                       : q.options.filter(o=>o.correct).map(o=>o.t).join(' · ');
      const last = DB.answers.slice().reverse().find(a=>a.qid===id && a.result==='wrong');
      let pickedTxt = '';
      if(last && last.picked !== undefined && last.picked !== null){
        if(qType(q)==='numeric') pickedTxt = String(last.picked);
        else if(qType(q)==='match') pickedTxt = Object.keys(last.picked).map(k=>`${k} → ${last.picked[k]}`).join(' · ');
        else pickedTxt = (Array.isArray(last.picked) ? last.picked : [last.picked])
              .map(i=>q.options[i] ? q.options[i].t : '').filter(Boolean).join(' · ');
      }
      h += `<div class="missq">
        <div class="mstem">${rich(q.stem)}</div>
        <div class="mmeta" style="color:var(--ok);margin-bottom:4px">Answer: ${esc(correctTxt)}</div>
        ${pickedTxt ? `<div class="mmeta" style="color:var(--bad);margin-bottom:4px">You entered: ${esc(pickedTxt)}</div>` : ''}
        ${last && last.missKind ? `<div class="mmeta" style="color:var(--warn);margin-bottom:4px">Named as a ${esc((MISS_LABEL[last.missKind]||'').toLowerCase())} miss</div>` : ''}
        <div class="mmeta">${esc(q.cite)} · missed ${s2.wrong||1}× · ${s2.box>=MASTER_BOX?'now mastered':'still in review'}</div>
      </div>`;
    }
  }
  el.innerHTML = h;

  el.querySelectorAll('[data-next]').forEach(b => b.onclick = () => {
    const pl = pools.find(x=>x.key===b.dataset.pool);
    const pool = poolQuestions(pl);
    const want = b.dataset.next === 'unseen'
      ? pool.filter(q => !DB.concepts[q.concept] || !DB.concepts[q.concept].seen)
      : pool.filter(q => { const s2 = DB.concepts[q.concept]; return s2 && s2.seen && s2.box === 0; });
    if(!want.length) return;
    Q = {pool:want, label:(b.dataset.next==='unseen' ? 'Not yet seen — ' : 'Redrill — ') + pl.name,
         sweep: shuffle(want.map(q=>q.id)), i:0,
         current:null, answered:0, lastId:null, examMode:false, picked:null, revealed:false};
    nextQuestion(); show('quiz');
  });
  /* A fixed queue rather than the scheduler: these concepts were missed
     moments ago, so the GAP rule would hold every one of them back and the
     drill would open on its "nothing left" panel. */
  const d = $('#drillMissed');
  if(d) d.onclick = () => {
    const pool = QUESTIONS.filter(q => missedIds.includes(q.id) ||
      missedIds.some(id => byId(id) && byId(id).concept === q.concept));
    Q = {pool, label:'Missed concepts', sweep: shuffle(pool.map(q => q.id)), i:0,
         current:null, answered:0, lastId:null, examMode:false, picked:null, revealed:false};
    nextQuestion(); show('quiz');
  };
}

/* ==========================================================================
   EXAM SIMULATION
   ==========================================================================
   A paper of EXAM.questions items on EXAM.minutes, each blueprint pool
   sampled in proportion to its marks. A pool that cannot fill its share
   contributes what it has and the shortfall is stated on screen in marks.
   Nothing is ever padded from another pool: a paper short of the blueprint
   says so rather than pretending to be complete.
   ========================================================================== */
let EX = null;

/* How many marks of the blueprint the bank can and cannot currently cover. A
   pool holding nothing at all is reported here like any other short pool: its
   marks land in `missing` and its name appears in the notice. */
function blueprintCoverage(){
  const shares = poolShares();
  const short = [];
  let drawn = 0, missing = 0;
  for(const {pool, want} of shares){
    const have = poolDrawable(pool).length;
    const got = Math.min(want, have);
    const perQ = want ? (pool.marks || 0) / want : 0;
    drawn += got * perQ;
    if(got < want){ missing += (want - got) * perQ; short.push({pool, want, got, marks:(want-got)*perQ}); }
  }
  return {drawn:Math.round(drawn), missing:Math.round(missing), short, shares};
}
function shortfallNote(cov){
  if(!cov.short.length) return '';
  // a pool with nothing in it is named differently from one that is merely thin
  const empty = cov.short.filter(s => s.got === 0).map(s => esc(s.pool.name));
  const thin  = cov.short.filter(s => s.got > 0)
                  .map(s => `${esc(s.pool.name)} (${s.got} of ${s.want} questions)`);
  const lines = [];
  if(empty.length) lines.push(`No questions yet: ${empty.join('; ')}.`);
  if(thin.length)  lines.push(`Short: ${thin.join('; ')}.`);
  return `<div class="shortfall"><b>The bank cannot yet cover the whole blueprint.</b>
    ${lines.join(' ')} ${cov.drawn} of ${TOTAL_MARKS} marks drawn, ${cov.missing} not yet coverable.
    The missing marks are left off the paper rather than filled from another pool.</div>`;
}

/* Which paper to prepare for. Kept with the student's progress, so it survives
   a reload; everything weighted by the blueprint follows it at once. */
function chooseExam(id){
  if(!COURSE.exams.some(e => e.id === id) || (EX && EX.running)) return;
  DB.settings.exam = id; save();
  setActiveExam(id);
}
function examPicker(note){
  if(COURSE.exams.length < 2) return '';
  return `<div class="filters"><div class="frow"><label>Paper</label>${COURSE.exams.map(e =>
    `<button class="chip" data-exam="${e.id}" aria-pressed="${e.id === EXAM.id}">${esc(e.name)}</button>`).join('')}</div>
    <p style="font-size:13.5px;color:var(--text-dim);margin:4px 0 0">${note}</p></div>`;
}
function renderExam(){
  const el = $('#v-exam');
  if(EX && EX.running){ renderExamQ(); return; }
  if(EX && EX.done){ renderExamResult(); return; }
  const cov = blueprintCoverage();
  const nPaper = cov.shares.reduce((s,o)=> s + Math.min(o.want, poolDrawable(o.pool).length), 0);
  const sata = sataShares(cov.shares);
  // never promise more select-all items than the bank can put on the paper
  const sataLine = !EXAM_SATA ? ''
    : sata.drawn >= EXAM_SATA
      ? `${EXAM_SATA} are select-all, marked all-or-nothing. `
      : `The blueprint asks for ${EXAM_SATA} select-all items and the bank holds ${sata.drawn}, so the paper carries ${sata.drawn}. `;
  el.innerHTML = `<h2>Exam simulation</h2>
  ${examPicker('A paper from an earlier exam is drawn the same way, so Exam 1 can be sat again for the final. Weak spots and the exam-weighted pass follow this choice too.')}
  <p class="sub">${esc(EXAM.name)}: ${EXAM.questions} questions in ${EXAM.minutes} minutes, drawn at the
  blueprint — ${POOLS.map(p=>`${esc(p.name)} ${p.marks}`).join(' · ')} marks.
  ${sataLine}No explanations until you finish, same as the real thing.</p>
  ${shortfallNote(cov)}
  <div class="note"><b>This does not feed your spaced-repetition history until you submit.</b>
  Finish the paper, then every answer is logged at once so your weak spots stay accurate.</div>
  <p><button class="btn" id="startExam">Start the ${EXAM.minutes}-minute paper${
    nPaper < EXAM.questions ? ` (${nPaper} questions available)` : ''}</button></p>`;
  $('#startExam').onclick = beginExam;
  el.querySelectorAll('.chip[data-exam]').forEach(b => b.onclick = () => { chooseExam(+b.dataset.exam); renderExam(); });
}
/* A question marked dupOf:'x' tests the same fact as question x, so a paper
   never carries both: taking either one blocks the other. */
function drawN(pool, n, blocked){
  const picked = [], used = blocked || new Set(), byConcept = {};
  const take = q => { picked.push(q); used.add(q.id); if(q.dupOf) used.add(q.dupOf); };
  const free = q => !used.has(q.id) && !(q.dupOf && used.has(q.dupOf));
  shuffle(pool.slice()).forEach(q => { (byConcept[q.concept] ||= []).push(q); });
  const concepts = shuffle(Object.keys(byConcept));
  for(const c of concepts){                       // one per concept first, for spread
    if(picked.length >= n) break;
    const q = byConcept[c].find(free);
    if(q) take(q);
  }
  for(const q of shuffle(pool.slice())){          // top up if the bank is short on concepts
    if(picked.length >= n) break;
    if(free(q)) take(q);
  }
  return picked.slice(0,n);
}
/* Draw n from a pool with a target number of select-all items in it. Select-all
   questions are drawn first so they are never crowded out, then the rest fill
   in, one concept each before any concept repeats. If the single-answer side
   of the pool runs out, the remainder comes from the same pool's select-all
   items rather than from any other pool. */
function drawMixed(pool, n, nSata){
  const used = new Set();
  const sata = drawN(pool.filter(isMulti), Math.min(nSata, n), used);
  const rest = drawN(pool.filter(q => !isMulti(q)), n - sata.length, used);
  let out = [...sata, ...rest];
  if(out.length < n) out = out.concat(drawN(pool, n - out.length, used));
  return out;
}
function beginExam(){
  const shares = poolShares();
  const sata = sataShares(shares);
  const paper = [];
  shares.forEach(({pool, want}, i) => {
    const src = poolDrawable(pool);
    paper.push(...drawMixed(src, Math.min(want, src.length), sata.per[i]));
  });
  const qs = shuffle(paper);
  if(!qs.length){ alert('The bank holds no question on this blueprint yet.'); return; }
  EX = {qs, i:0, sata,
        picks: qs.map(q => isMulti(q) ? [] : qType(q)==='match' ? {} : qType(q)==='numeric' ? '' : null),
        running:true, done:false, coverage: blueprintCoverage(),
        ends: Date.now() + EXAM.minutes*60000,
        orders: qs.map(q => isMC(q) ? shuffle(q.options.map((o,k)=>k)) : [])};
  clearInterval(EX.timer);
  EX.timer = setInterval(()=>{
    if(!EX || !EX.running) return clearInterval(EX.timer);
    if(Date.now() >= EX.ends){ finishExam(); return; }
    const c = document.getElementById('exClock');
    if(c){ const l = EX.ends - Date.now();
      c.textContent = fmt(l); c.classList.toggle('low', l < 5*60000); }
  }, 1000);
  renderExamQ();
}
const fmt = ms => { const s = Math.max(0, Math.round(ms/1000));
  return String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0'); };

function renderExamQ(){
  const el = $('#v-exam'), q = EX.qs[EX.i], order = EX.orders[EX.i];
  const answered = EX.picks.filter((p, i) => !isBlank(EX.qs[i], p)).length;
  const kind = qType(q), multi = isMulti(q);
  let h = `<div class="examhead">
    <span class="clock" id="exClock">${fmt(EX.ends-Date.now())}</span>
    <span class="prog">Question ${EX.i+1} of ${EX.qs.length} · ${answered} answered</span>
  </div>
  ${EX.i === 0 ? shortfallNote(EX.coverage) : ''}
  <div class="qcard"><div class="qhead">${profTag(q.prof)}${multi ? '<span class="tag sata">select all that apply</span>' : ''}${
    kind==='numeric' ? '<span class="tag">calculation</span>' : ''}${
    kind==='match' ? '<span class="tag">matching</span>' : ''}<span class="spacer"></span>
    <span>no feedback until you submit</span></div>
  <div class="qbody"><p class="stem">${rich(q.stem)}</p>`;
  if(q.img && IMAGES[q.img]) h += `<img class="qimg" src="${IMAGES[q.img]}" alt="Figure for this question">`;
  if(kind === 'numeric'){
    h += numericInput(q, EX.picks[EX.i], false, '');
  }else if(kind === 'match'){
    h += matchSelects(q, EX.picks[EX.i], false, false);
  }else{
    order.forEach((oi,n)=>{
      const sel = multi ? EX.picks[EX.i].includes(oi) : EX.picks[EX.i] === oi;
      h += `<button class="opt${multi?' multi':''}${sel?(multi?' on':' pick-ok'):''}" data-o="${oi}" aria-pressed="${sel}">
        <span class="k">${multi ? (sel ? '☑' : '☐') : LETTERS[n]}</span><span>${rich(q.options[oi].t)}</span></button>`;
    });
  }
  h += `</div><div class="qfoot">
    <button class="btn ghost" id="exPrev"${EX.i===0?' disabled':''}>Back</button>
    <button class="btn" id="exNext">${EX.i===EX.qs.length-1?'Review':'Next'}</button>
    <span class="spacer" style="flex:1"></span>
    <button class="btn ghost" id="exEnd">Submit paper</button>
  </div></div>`;
  el.innerHTML = h;
  el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
    const oi = +b.dataset.o;
    if(multi){ const p = EX.picks[EX.i]; EX.picks[EX.i] = p.includes(oi) ? p.filter(x=>x!==oi) : [...p, oi]; }
    else EX.picks[EX.i] = oi;
    renderExamQ(); });
  const ni = document.getElementById('numIn');
  if(ni) ni.oninput = e => { EX.picks[EX.i] = e.target.value; };
  el.querySelectorAll('.matchgrid select').forEach(sel => sel.onchange = () => {
    const p = Object.assign({}, EX.picks[EX.i]);
    if(sel.value) p[sel.dataset.l] = sel.value; else delete p[sel.dataset.l];
    EX.picks[EX.i] = p;
  });
  $('#exPrev').onclick = ()=>{ if(EX.i>0){EX.i--; renderExamQ();} };
  $('#exNext').onclick = ()=>{ if(EX.i<EX.qs.length-1){EX.i++; renderExamQ();} else finishExam(); };
  $('#exEnd').onclick  = ()=>{ if(confirm('Submit the paper and see your score?')) finishExam(); };
}
/* One place decides whether an exam answer was right, for both grading and the
   review page. */
function examRight(q, p){ return !isBlank(q, p) && gradeAnswer(q, p); }
const examBlank = (q, p) => isBlank(q, p);
function finishExam(){
  clearInterval(EX.timer);
  EX.running = false; EX.done = true;
  EX.qs.forEach((q,i)=>{
    const p = EX.picks[i];
    const picked = isMulti(q) ? (p || []).slice().sort((a,b)=>a-b)
                 : qType(q)==='match' ? Object.assign({}, p)
                 : qType(q)==='numeric' ? String(p == null ? '' : p) : p;
    record(q, examRight(q, p) ? 'correct' : 'wrong', picked);
  });
  renderExamResult();
}
function renderExamResult(){
  const right = EX.qs.filter((q,i)=> examRight(q, EX.picks[i])).length;
  const blank = EX.qs.filter((q,i)=> examBlank(q, EX.picks[i])).length;
  const pct = EX.qs.length ? Math.round(100*right/EX.qs.length) : 0;
  let h = `<h2>Exam simulation — ${right} / ${EX.qs.length} (${pct}%)</h2>
  <p class="sub">${blank ? blank+' left blank, scored as incorrect. ' : ''}All ${EX.qs.length} are now in your history,
  so anything you missed is back in active review.</p>
  ${shortfallNote(EX.coverage)}
  <p><button class="btn" id="exAgain">New paper</button>
     <button class="btn ghost" onclick="show('gaps')">See weak spots</button></p>
  <h3>Every question, with the reasoning</h3>`;
  EX.qs.forEach((q,i)=>{
    const p = EX.picks[i], ok = examRight(q, p), blankQ = examBlank(q, p);
    const kind = qType(q), multi = isMulti(q);
    const chosen = oi => multi ? (p || []).includes(oi) : oi === p;
    h += `<div class="qcard" style="margin-bottom:12px"><div class="qhead">
      ${profTag(q.prof)}<span>Q${i+1}</span>${multi ? '<span class="tag sata">select all</span>' : ''}<span class="spacer"></span>
      <span style="color:${ok?'var(--ok)':'var(--bad)'}">${ok?'correct':(blankQ?'blank':'missed')}</span>
      </div><div class="qbody"><p class="stem" style="font-size:15.5px">${rich(q.stem)}</p>`;
    if(q.img && IMAGES[q.img]) h += `<img class="qimg" src="${IMAGES[q.img]}" alt="Figure for this question">`;
    if(kind === 'numeric'){
      h += `<p class="verdict ${ok?'ok':'bad'}">Keyed answer ${q.answer.toFixed(4)} ${esc(q.units)}${
        blankQ ? ' — left blank' : ` — you entered ${esc(String(p))}`}</p>` + stepsBlock(q);
    }else if(kind === 'match'){
      h += pairsBlock(q);
    }else{
      EX.orders[i].forEach((oi,n)=>{
        const o = q.options[oi];
        h += `<div class="wrow"><span class="mark ${o.correct?'y':'n'}">${o.correct?'✓':'✗'}</span>
          <span class="wtxt"><b>${LETTERS[n]}. ${rich(o.t)}</b>${chosen(oi)?' &nbsp;<i>(you picked this)</i>':''} — ${rich(o.why)}</span>
          </div>`;
      });
    }
    if(q.teach) h += `<div class="teach"><h4>The concept behind this</h4>${
        q.teachImg && IMAGES[q.teachImg] ? `<img class="qimg tdimg" src="${IMAGES[q.teachImg]}" alt="Figure from the lecture slide">` : ''}${
        renderTeach(q.teach)}</div>`;
    h += `<div class="cite">${q.quote ? `<span class="quote">“${esc(q.quote)}”</span>` : ''}${srcFlag(q)}${esc(q.cite)}</div></div></div>`;
  });
  $('#v-exam').innerHTML = h;
  $('#exAgain').onclick = ()=>{ EX=null; renderExam(); };
}

/* ==========================================================================
   REFERENCE, TELL APART, GUIDES
   ==========================================================================
   Three static HTML documents. They carry {{fig:key|caption}} tokens rather
   than the base64 itself, so the source stays readable and a figure is stored
   once in IMAGES. A token naming a key that is not in the bank is dropped
   rather than rendered as a broken image.
   ========================================================================== */
const ENT = {'&mdash;':'—','&ndash;':'–','&nbsp;':' ','&rarr;':'→',
             '&amp;':'&','&lt;':'<','&gt;':'>','&deg;':'°','&pi;':'π',
             '&minus;':'−','&le;':'≤','&ge;':'≥','&plusmn;':'±',
             '&beta;':'β','&alpha;':'α','&gamma;':'γ','&equiv;':'≡',
             '&ldquo;':'“','&rdquo;':'”','&rsquo;':'’',
             '&lsquo;':'‘','&hellip;':'…','&times;':'×'};
/* Reference text is authored as HTML, so an entity has to be decoded before it
   is re-escaped for an attribute or a caption, or it reads out literally. */
const deEnt = t => String(t)
  .replace(/&[a-z]+;/gi, e => ENT[e] !== undefined ? ENT[e] : e)
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

/* Stacked fractions. Written {{frac:numerator|denominator}} in the source,
   in the same token style as {{fig:...}}, so a long ratio reads the way the
   slides print it rather than as a slash buried in a line. Neither part may
   contain a | or a closing brace pair; none of the course's equations need one.
   eqPlain reads the same token back as (numerator)/(denominator), which is how
   the checks confirm a displayed equation says what its typed form says. */
const FRAC_RE = /\{\{frac:([^|}]*)\|([^}]*)\}\}/g;
const mathHTML = h => String(h).replace(FRAC_RE,
  '<span class="frac"><span class="fn">$1</span><span class="fd">$2</span></span>');

function refFigures(html){
  html = mathHTML(html);
  return html.replace(/\{\{fig:([a-z0-9_]+)\|([^}]*)\}\}/gi, (_, key, cap) => {
    if(!IMAGES[key]) return '';
    const c = esc(deEnt(cap));
    return `<figure class="reffig"><img src="${IMAGES[key]}" alt="${c}">` +
           `<figcaption>${c}</figcaption></figure>`;
  });
}

function renderDoc(el, html, prefix){
  // a jump list, built from the section headings that are actually present
  // a heading may carry data-nav with a fuller label for the jump list, so a
  // short heading such as "Module 1 - Objective 1" still navigates by name
  const heads = [...html.matchAll(/<h3([^>]*)>([\s\S]*?)<\/h3>/g)]
    .map(m => { const nav = /data-nav="([^"]*)"/.exec(m[1]);
                return deEnt((nav ? nav[1] : m[2]).replace(/<[^>]+>/g, '')).trim(); });
  let i = 0;
  const body = html.replace(/<h3([^>]*)>/g, (m, attrs) => `<h3 id="${prefix}-${i++}"${attrs}>`);
  const nav = heads.length
    ? `<details class="refnav-wrap"><summary>Jump to a section</summary><nav class="refnav">${heads.map((h, n) =>
        `<a href="#${prefix}-${n}">${esc(h)}</a>`).join('')}</nav></details>`
    : '';
  el.innerHTML = body.replace('</p>', '</p>' + nav);
  el.querySelectorAll('.refnav a').forEach(a => a.onclick = e => {
    e.preventDefault();
    const t = el.querySelector(a.getAttribute('href'));
    const d = el.querySelector('.refnav-wrap'); if (d) d.open = false;
    if (t) t.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
}
function renderRef(){ renderDoc($('#v-ref'), refFigures(REFERENCE_HTML), 'ref'); }
function renderTell(){ renderDoc($('#v-tell'), refFigures(TELL_HTML), 'tell'); }
function renderGuide(){ renderDoc($('#v-guide'), refFigures(GUIDE_HTML), 'guide'); }

/* ==========================================================================
   SETTINGS
   ========================================================================== */
function renderSettings(){
  const mode = DB.settings.mode || DEFAULT_MODE;
  $('#v-settings').innerHTML = `<h2>Settings</h2>
  <p class="sub">Progress is stored in this browser only, under the name “${esc(PROFILE)}”.</p>
  ${updatedText() ? `<p class="sub">${esc(updatedText())}. Reload the page to pick up a newer version.</p>` : ''}

  ${COURSE.exams.length > 1 ? `<h3>Exam you are preparing for</h3>
  ${examPicker('The exam simulator, Weak spots and the exam-weighted pass all follow this choice.')}` : ''}

  <h3>Review schedule</h3>
  <div class="filters">
    <div class="frow">
      <button class="chip" data-m="cram"  aria-pressed="${mode==='cram'}">Exam cram</button>
      <button class="chip" data-m="long"  aria-pressed="${mode==='long'}">Long term</button>
      <button class="chip" data-m="all"   aria-pressed="${mode==='all'}">Ask everything</button>
    </div>
    <p style="font-size:13.5px;color:var(--text-dim);margin:4px 0 0">
      <b>Exam cram</b> spaces a correct concept by how many questions you answer after it
      (8, 20, 45, 90…), so everything can still come back before the paper.
      <b>Long term</b> uses real days (1, 3, 7, 14, 30, 60).
      <b>Ask everything</b> ignores scheduling and keeps serving questions, still worst-first.
    </p>
  </div>

  <h3>Move your progress between devices</h3>
  <div class="filters">
    <div class="frow">
      <button class="btn" id="btnExport">Download my progress</button>
      <button class="btn ghost" id="btnImport">Load a progress file</button>
      <input type="file" id="fileIn" accept="application/json" class="hide">
    </div>
    <p style="font-size:13.5px;color:var(--text-dim);margin:4px 0 0">
      Storage does not sync between your phone and your laptop. Export on one, import on the other.
    </p>
  </div>

  <h3>Start over</h3>
  <div class="filters">
    <div class="frow"><button class="btn ghost" id="btnReset"
      style="color:var(--bad);border-color:#E9B8B4">Erase my history</button></div>
    <p style="font-size:13.5px;color:var(--text-dim);margin:4px 0 0">
      Clears every answer and schedule for “${esc(PROFILE)}”. Other people's profiles are untouched.
    </p>
  </div>

  <div class="note" style="margin-top:20px">
    <b>Sharing this with classmates.</b> Each person's history lives in their own browser on their own
    device, so nobody can see anyone else's. On a shared computer, use the Switch button at the top
    right to keep profiles apart. Private/incognito windows and “clear site data” erase progress.
  </div>`;

  $('#v-settings').querySelectorAll('.chip[data-m]').forEach(b=>b.onclick=()=>{
    DB.settings.mode = b.dataset.m; save(); renderSettings();
  });
  $('#v-settings').querySelectorAll('.chip[data-exam]').forEach(b=>b.onclick=()=>{
    chooseExam(+b.dataset.exam); renderSettings();
  });
  $('#btnExport').onclick = ()=>{
    const blob = new Blob([JSON.stringify({profile:PROFILE, db:DB}, null, 1)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${COURSE.ns}-progress-${PROFILE.replace(/\W+/g,'_')}.json`;
    a.click(); URL.revokeObjectURL(a.href);
  };
  $('#btnImport').onclick = ()=> $('#fileIn').click();
  $('#fileIn').onchange = e=>{
    const f = e.target.files[0]; if(!f) return;
    const r = new FileReader();
    r.onload = ()=>{
      try{
        const j = JSON.parse(r.result);
        if(!j.db || !j.db.concepts) throw new Error('not a progress file');
        DB = Object.assign(BLANK(), j.db); save();
        alert('Progress loaded.'); renderSettings();
      }catch(err){ alert('That file could not be read as a progress export.'); }
    };
    r.readAsText(f);
  };
  $('#btnReset').onclick = ()=>{
    if(confirm(`Erase all quiz history for "${PROFILE}"? This cannot be undone.`)){
      DB = BLANK(); save(); alert('History erased.'); renderSettings();
    }
  };
}

/* "Ask everything" mode short-circuits the due check */
const _isDue = isDue;
isDue = function(s){ return (DB.settings.mode === 'all') ? true : _isDue(s); };

/* ==========================================================================
   EQUATIONS — memorising them
   ==========================================================================
   Two exercises over the same data. Typing one out is what an exam asks for,
   since the equation sheet does not carry the six she told the class to know.
   Building one from pieces is the easier direction, and it is what to fall
   back on when typing keeps failing, because it separates remembering which
   quantities appear from remembering how they are arranged.

   A typed answer is compared after both sides are folded to a canonical form:
   case, spacing, the several dashes, implicit against explicit multiplication,
   and Unicode subscripts and superscripts all stop mattering. What does not
   stop mattering is which quantity sits above the line, the sign in an
   exponent, and where a bracket closes.
   ========================================================================== */
const EQ_ENT = {'&minus;':'-', '&times;':'*', '&frac12;':'½', '&infin;':'∞',
                '&beta;':'beta', '&middot;':'*', '&amp;':'&', '&nbsp;':' ', '&rarr;':'\u2192'};
/* Display HTML to plain text. Subscripts resolve before superscripts, because
   a superscript can contain one: e^(-ka*t) is written with ka inside the sup. */
const eqPlain = h => String(h)
  .replace(FRAC_RE, '(($1)/($2))')
  .replace(/<sub>([^<]*)<\/sub>/g, '$1')
  .replace(/<sup>([^<]*)<\/sup>/g, '^($1)')
  .replace(/<[^>]+>/g, '')
  .replace(/&[a-z0-9]+;/gi, m => EQ_ENT[m] !== undefined ? EQ_ENT[m] : m);

const EQ_SUBS = {'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5',
  '₆':'6','₇':'7','₈':'8','₉':'9','ₐ':'a','ₑ':'e','ₕ':'h',
  'ᵢ':'i','ₖ':'k','ₗ':'l','ₘ':'m','ₙ':'n','ₒ':'o','ₚ':'p',
  'ᵣ':'r','ₛ':'s','ₜ':'t','ᵤ':'u','ᵥ':'v','ₓ':'x'};
const EQ_SUPS = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5',
  '⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+','ⁿ':'n',
  'ᵃ':'a','ᵇ':'b','ᵗ':'t','ᵏ':'k','ᵉ':'e','ᵖ':'p'};
const EQ_SUP_RE = new RegExp('[' + Object.keys(EQ_SUPS).join('') + ']+', 'g');
const EQ_SUB_RE = new RegExp('[' + Object.keys(EQ_SUBS).join('') + ']', 'g');

function normEq(s){
  let t = String(s == null ? '' : s);
  t = t.replace(EQ_SUP_RE, m => '^' + [...m].map(c => EQ_SUPS[c]).join(''));
  t = t.replace(EQ_SUB_RE, c => EQ_SUBS[c]);
  t = t.replace(/½/g, '1/2').toLowerCase();
  t = t.replace(/[−–—‐‑]/g, '-');  // every dash is a minus
  t = t.replace(/÷/g, '/');
  t = t.replace(/\*\*/g, '^');                              // before the star is dropped
  t = t.replace(/[×·⋅*]/g, '');              // multiplication is implicit
  t = t.replace(/∞/g, 'inf').replace(/→/g, 'to');
  t = t.replace(/[‘’“”]/g, '');
  t = t.replace(/[\s_,]/g, '');                             // V_D and VD are one thing
  t = t.replace(/thalf|t-half/g, 't1/2');
  t = t.replace(/[\[\{]/g, '(').replace(/[\]\}]/g, ')');
  t = t.replace(/(^|[^0-9])\.(\d)/g, '$10.$2');             // .693 -> 0.693
  t = t.replace(/log10/g, 'log');
  for(let i = 0; i < 8; i++) t = t.replace(/\^\(([^()]*)\)/g, '^$1');
  return t.replace(/\.$/, '');
}
/* Every spelling that counts as right, with and without the left side, since
   an answer typed as just the right-hand side answers the question asked. */
function eqAccepts(e){
  const out = new Set();
  for(const form of [e.typed, ...(e.also || []), eqPlain(e.lhs) + '=' + eqPlain(e.tokens.join(' '))]){
    const n = normEq(form);
    out.add(n);
    const i = n.indexOf('=');
    if(i > 0) out.add(n.slice(i + 1));
  }
  return out;
}
const eqRhs = e => e.tokens.join(' ');
/* How an equation is shown to be read: stacked as the slides print it where a
   display form exists, and as its pieces joined up where it does not. */
const eqShow = e => `<span class="eqshow">${e.lhs} = ${mathHTML(e.disp || eqRhs(e))}</span>`;
const eqCorrect = (e, typed) => eqAccepts(e).has(normEq(typed));

/* ---------- which equations are being worked on ---------- */
const EQ_BY_ID = Object.fromEntries(EQUATIONS.map(e => [e.id, e]));
const EQ_MUST = EQUATIONS.filter(e => e.must).map(e => e.id);
function eqChosen(){
  const s = DB.settings.eqPick;
  const valid = Array.isArray(s) ? s.filter(id => EQ_BY_ID[id]) : null;
  return valid && valid.length ? valid : EQ_MUST.slice();
}
function eqSetChosen(ids){
  DB.settings.eqPick = ids.filter(id => EQ_BY_ID[id]);
  save();
}
/* How many correct answers in a row an equation is held to before it counts as
   learned. Typing one out once is recall with the question still on screen;
   the point of the drill is to be able to do it again cold. */
const EQ_STREAK = 3;
function eqStat(id){
  const s = (DB.eq || {})[id];
  return s || {seen:0, right:0, wrong:0, streak:0, mode:{}};
}
function eqRecord(id, mode, ok){
  if(!DB.eq) DB.eq = {};
  const s = DB.eq[id] || (DB.eq[id] = {seen:0, right:0, wrong:0, streak:0, mode:{}});
  s.seen++;
  if(ok){ s.right++; s.streak++; } else { s.wrong++; s.streak = 0; }
  s.mode[mode] = (s.mode[mode] || 0) + (ok ? 1 : 0);
  s.at = Date.now();
  save();
}
const eqLearned = id => eqStat(id).streak >= EQ_STREAK;

/* ---------- the view ---------- */
let EQ = null;   /* {queue:[id], i, mode:'type'|'build', slots:[], tray:[], revealed, ok} */

const SHEET_TAG = {
  no:      ['not on the sheet', 'She said out loud she does not supply this one'],
  yes:     ['on the sheet', 'The equation sheet carries it'],
  unknown: ['sheet unclear',  'That part of the equation-sheet extract cannot be read, and she never said either way'],
};

function renderEq(){
  const el = $('#v-eq');
  if(EQ){ el.innerHTML = eqDrillHTML(); eqDrillWire(el); return; }
  el.innerHTML = eqPickerHTML();
  eqPickerWire(el);
}

function eqPickerHTML(){
  const chosen = new Set(eqChosen());
  const learned = [...chosen].filter(eqLearned).length;
  let h = `<h2>Equations</h2>
  <p class="sub">Type an equation out, or build it from its pieces. Tick the ones to work on;
    the drill asks only those. An equation counts as learned after ${EQ_STREAK} correct answers in a row,
    and one wrong answer puts it back to nothing. Nothing here is scored against the question bank.</p>`;

  h += `<div class="topic sweepcard"><div class="subs">
    <div class="subrow"><span class="sname"><b>Type them out</b>
      <small>The equation is named and you write it. This is what the exam asks for.</small></span>
      <button data-start="type"${chosen.size ? '' : ' disabled'}>Start</button></div>
    <div class="subrow"><span class="sname"><b>Build them from pieces</b>
      <small>The pieces are given, some of them wrong, and you place them in order</small></span>
      <button data-start="build"${chosen.size ? '' : ' disabled'} class="ghost">Start</button></div>
    <div class="subrow"><span class="sname"><b>Both, alternating</b>
      <small>Builds first, then types the same equation, which is the order that makes typing possible</small></span>
      <button data-start="mix"${chosen.size ? '' : ' disabled'} class="ghost">Start</button></div>
  </div></div>`;

  h += `<div class="filters"><div class="frow"><label>Choose</label>
    <button class="chip" data-pick="must">The ${EQ_MUST.length} she said to memorise</button>
    <button class="chip" data-pick="all">All ${EQUATIONS.length}</button>
    <button class="chip" data-pick="none">None</button>
    <button class="chip" data-pick="unlearned">Only the ones not yet learned</button>
    </div><div class="frow"><label>Selected</label>
    <span class="sub" style="margin:0">${chosen.size} equation${chosen.size===1?'':'s'}${
      chosen.size ? `, ${learned} learned` : ''}</span></div></div>`;

  const mods = [...new Set(EQUATIONS.map(e => e.module))].sort((a,b) => a-b);
  const modName = m => (COURSE.topicsMenu.find(t => t.module === m) || {}).name || ('Module ' + m);
  for(const m of mods){
    const es = EQUATIONS.filter(e => e.module === m);
    h += `<details class="module" open><summary>
      <span class="mname">${esc(modName(m))}<small>${es.length} equations ·
        ${es.filter(e => chosen.has(e.id)).length} selected</small></span>
      <button class="chip" data-modpick="${m}">Select all</button></summary><div class="mfoot">`;
    for(const e of es){
      const st = eqStat(e.id), done = eqLearned(e.id);
      const tag = SHEET_TAG[e.sheet] || SHEET_TAG.unknown;
      h += `<div class="subrow eqrow">
        <label class="eqpick"><input type="checkbox" data-eq="${esc(e.id)}"${chosen.has(e.id)?' checked':''}>
          <span class="sname"><b>${esc(e.name)}</b>
            <span class="eqline">${eqShow(e)}</span>
            <small>${e.must ? '<b class="must">she said to memorise this one</b> · ' : ''}<span title="${esc(tag[1])}">${tag[0]}</span>${
              st.seen ? ` · ${st.right} right of ${st.seen}` : ''}</small></span></label>
        ${done ? '<span class="eqdone">learned</span>'
               : st.streak ? `<span class="counts">${st.streak}/${EQ_STREAK}</span>` : ''}
      </div>`;
    }
    h += `</div></details>`;
  }
  h += `<p class="sub">Every equation here, with its symbols, its units and the condition it holds
    under, is set out under Reference.</p>`;
  return h;
}

function eqPickerWire(el){
  el.querySelectorAll('input[data-eq]').forEach(b => b.onchange = () => {
    const set = new Set(eqChosen());
    b.checked ? set.add(b.dataset.eq) : set.delete(b.dataset.eq);
    eqSetChosen([...set]);
    renderEq();
  });
  el.querySelectorAll('button[data-pick]').forEach(b => b.onclick = () => {
    const p = b.dataset.pick;
    eqSetChosen(p === 'must' ? EQ_MUST
              : p === 'all'  ? EQUATIONS.map(e => e.id)
              : p === 'none' ? []
              : EQUATIONS.filter(e => !eqLearned(e.id)).map(e => e.id));
    renderEq();
  });
  el.querySelectorAll('button[data-modpick]').forEach(b => b.onclick = ev => {
    ev.preventDefault();
    const set = new Set(eqChosen());
    EQUATIONS.filter(e => e.module === +b.dataset.modpick).forEach(e => set.add(e.id));
    eqSetChosen([...set]);
    renderEq();
  });
  el.querySelectorAll('button[data-start]').forEach(b => b.onclick = () => eqStart(b.dataset.start));
}

/* A pass over the chosen equations. The queue is shuffled so the order they
   were ticked in is not the order they are asked in, which is the whole point
   of drilling a list rather than reading it. */
function eqStart(mode){
  const ids = shuffle(eqChosen().slice());
  if(!ids.length) return;
  EQ = {queue: ids, i: 0, mode, step: mode === 'mix' ? 'build' : mode,
        slots: [], tray: [], revealed: false, ok: false, typed: '', right: 0, asked: 0};
  eqLoad();
}
function eqLoad(){
  const e = EQ_BY_ID[EQ.queue[EQ.i]];
  EQ.revealed = false; EQ.ok = false; EQ.typed = '';
  if(e && EQ.step === 'build'){
    EQ.slots = e.tokens.map(() => null);
    EQ.tray  = shuffle([...e.tokens, ...(e.lures || [])].map((t, i) => ({t, i})));
  }
  renderEq();
}

function eqDrillHTML(){
  const e = EQ_BY_ID[EQ.queue[EQ.i]];
  if(!e) return eqDoneHTML();
  const st = eqStat(e.id);
  const building = EQ.step === 'build';
  let h = `<div class="qcard"><div class="qhead">
    <span>${esc(building ? 'Build it' : 'Type it out')}</span>
    <span class="spacer"></span>
    <span>${eqLearned(e.id) ? 'learned' : st.streak ? st.streak + ' of ' + EQ_STREAK + ' in a row' : 'not yet'}</span>
  </div>
  <div class="qprog">
    <span>equation ${EQ.i + 1} of ${EQ.queue.length}</span>
    <span class="pbar"><i style="width:${Math.round(100 * EQ.i / EQ.queue.length)}%"></i></span>
    <span>${EQ.asked ? EQ.right + ' right of ' + EQ.asked : 'nothing asked yet'}</span>
  </div>
  <div class="qbody">
    <p class="stem">${esc(e.name)}</p>
    <p class="eqask">${building
      ? 'Place the pieces to the right of the equals sign. Some of them do not belong.'
      : 'Write it out. Capitals, spaces and how you write the multiplication do not matter.'}</p>`;

  if(building){
    h += `<div class="eqbuild"><span class="eqlhs">${e.lhs} =</span>`;
    EQ.slots.forEach((s, i) => {
      const cls = EQ.revealed ? (normEq(eqPlain(s || '')) === normEq(eqPlain(e.tokens[i])) ? ' ok' : ' bad') : '';
      h += `<button class="eqslot${cls}${s ? ' full' : ''}" data-slot="${i}"${EQ.revealed ? ' disabled' : ''}
        aria-label="Position ${i + 1} of ${EQ.slots.length}">${s || '&nbsp;'}</button>`;
    });
    h += `</div>`;
    if(!EQ.revealed){
      const placed = new Set(EQ.slots.map((_, i) => EQ.trayOf && EQ.trayOf[i]).filter(x => x != null));
      h += `<div class="eqtray">${EQ.tray.map(t =>
        `<button class="eqtile${placed.has(t.i) ? ' used' : ''}" data-tile="${t.i}"${
          placed.has(t.i) ? ' disabled' : ''}>${t.t}</button>`).join('')}</div>`;
    }
  }else{
    h += `<div class="eqtype"><span class="eqlhs">${e.lhs} =</span>
      <input id="eqIn" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"
        value="${esc(EQ.typed)}"${EQ.revealed ? ' disabled' : ''}
        class="${EQ.revealed ? (EQ.ok ? 'ok' : 'bad') : ''}"
        aria-label="The right-hand side of ${esc(e.name)}" placeholder="the right-hand side"></div>
    <p class="sub eqhint">Type <code>*</code> or nothing at all for multiplication, <code>/</code> for a division,
      <code>^</code> for a power, and plain letters for subscripts: <code>VD</code>, <code>ka</code>, <code>Cp</code>.</p>`;
  }

  if(EQ.revealed){
    h += `<div class="why"><p class="verdict ${EQ.ok ? 'ok' : 'bad'}">${
      EQ.ok ? '✓ Correct' : '✗ Not correct'}</p>
      <p class="eqanswer"><b>${eqShow(e)}</b></p>`;
    if(!EQ.ok && !building && EQ.typed.trim())
      h += `<p class="prose">You wrote <code>${esc(EQ.typed.trim())}</code>, which reads as
        <code>${esc(normEq(EQ.typed))}</code> once capitals and spacing are set aside.</p>`;
    if(e.symbols && e.symbols.length)
      h += `<h5 class="tsec">What each symbol is</h5><ul class="tlist">${
        e.symbols.map(s => `<li><b>${s[0]}</b> — ${s[1]}</li>`).join('')}</ul>`;
    if(e.holds) h += `<h5 class="tsec">When it holds</h5><p class="prose">${esc(e.holds)}</p>`;
    if(e.must) h += `<p class="prose"><b>She said to memorise this one.</b> It is not on the equation sheet.</p>`;
    h += `<div class="cite">${esc(e.cite)}</div></div>`;
  }
  h += `</div><div class="qfoot">`;
  if(!EQ.revealed){
    const ready = building ? EQ.slots.every(s => s !== null) : true;
    h += `<button class="btn" id="eqCheck"${ready ? '' : ' disabled'}>Check</button>`;
    if(building) h += `<button class="btn ghost" id="eqClear">Clear</button>`;
    h += `<button class="btn ghost" id="eqShow">Show me</button>`;
  }else{
    h += `<button class="btn" id="eqNext">Next</button>`;
  }
  h += `<button class="btn ghost" id="eqStop">Choose equations</button></div></div>`;
  return h;
}

function eqDoneHTML(){
  const learned = eqChosen().filter(eqLearned).length;
  return `<div class="empty">
    <p><b>That is every equation in this set — ${EQ.right} right of ${EQ.asked}.</b></p>
    <p style="margin:10px 0 16px">${learned} of ${eqChosen().length} selected
      ${learned === 1 ? 'equation is' : 'equations are'} learned, meaning ${EQ_STREAK} correct
      answers in a row. Going round again is what turns the rest over.</p>
    <p style="display:flex;gap:9px;flex-wrap:wrap;justify-content:center">
      <button class="btn" id="eqAgain">Go round again</button>
      <button class="btn ghost" id="eqStop">Choose equations</button>
    </p></div>`;
}

function eqDrillWire(el){
  const e = EQ_BY_ID[EQ.queue[EQ.i]];
  const stop = () => { EQ = null; renderEq(); };
  const byId = i => document.getElementById(i);
  if(byId('eqStop')) byId('eqStop').onclick = stop;
  if(byId('eqAgain')) byId('eqAgain').onclick = () => eqStart(EQ.mode);
  if(!e) return;

  /* Tap a slot to select it, then tap a piece; or tap a piece to drop it into
     the first empty slot. Dragging works too where a mouse is present, but
     tapping is what has to work, since this is read on a phone. */
  el.querySelectorAll('.eqslot').forEach(b => b.onclick = () => {
    const i = +b.dataset.slot;
    if(EQ.slots[i] !== null){                     // tapping a filled slot empties it
      EQ.slots[i] = null;
      if(EQ.trayOf) delete EQ.trayOf[i];
    }else{
      EQ.sel = EQ.sel === i ? null : i;
    }
    renderEq();
  });
  el.querySelectorAll('.eqtile').forEach(b => {
    b.onclick = () => eqPlace(+b.dataset.tile);
    b.draggable = true;
    b.ondragstart = ev => { ev.dataTransfer.setData('text/plain', b.dataset.tile); };
  });
  el.querySelectorAll('.eqslot').forEach(b => {
    b.ondragover = ev => ev.preventDefault();
    b.ondrop = ev => {
      ev.preventDefault();
      const t = +ev.dataTransfer.getData('text/plain');
      if(!isNaN(t)) eqPlace(t, +b.dataset.slot);
    };
  });

  const inp = byId('eqIn');
  if(inp && !EQ.revealed){
    inp.oninput = ev => { EQ.typed = ev.target.value; };
    inp.onkeydown = ev => { if(ev.key === 'Enter'){ ev.preventDefault(); eqCheck(); } };
    if(typeof inp.focus === 'function') inp.focus();
  }
  if(byId('eqCheck')) byId('eqCheck').onclick = eqCheck;
  if(byId('eqClear')) byId('eqClear').onclick = () => {
    EQ.slots = EQ.slots.map(() => null); EQ.trayOf = {}; EQ.sel = null; renderEq();
  };
  if(byId('eqShow')) byId('eqShow').onclick = () => {
    EQ.revealed = true; EQ.ok = false;
    eqRecord(e.id, EQ.step, false);
    renderEq();
  };
  if(byId('eqNext')) byId('eqNext').onclick = () => {
    /* In the alternating mode the same equation is typed straight after it has
       been built, so the piece order is still in mind when the typing is asked
       for. Only then does the queue move on. */
    if(EQ.mode === 'mix' && EQ.step === 'build'){ EQ.step = 'type'; eqLoad(); return; }
    if(EQ.mode === 'mix') EQ.step = 'build';
    EQ.i++; eqLoad();
  };
}

function eqPlace(tileIndex, slot){
  const tile = EQ.tray.find(t => t.i === tileIndex);
  if(!tile) return;
  if(!EQ.trayOf) EQ.trayOf = {};
  if(Object.values(EQ.trayOf).includes(tileIndex)) return;   // already placed
  let i = slot != null ? slot : (EQ.sel != null ? EQ.sel : EQ.slots.indexOf(null));
  if(i == null || i < 0 || i >= EQ.slots.length) return;
  if(EQ.slots[i] !== null) delete EQ.trayOf[i];              // replacing what was there
  EQ.slots[i] = tile.t;
  EQ.trayOf[i] = tileIndex;
  EQ.sel = null;
  renderEq();
}

function eqCheck(){
  const e = EQ_BY_ID[EQ.queue[EQ.i]];
  if(!e) return;
  if(EQ.step === 'build'){
    if(EQ.slots.some(s => s === null)) return;
    EQ.ok = eqCorrect(e, eqPlain(e.lhs) + '=' + eqPlain(EQ.slots.join(' ')));
  }else{
    if(!EQ.typed.trim()) return;
    EQ.ok = eqCorrect(e, EQ.typed) || eqCorrect(e, eqPlain(e.lhs) + '=' + EQ.typed);
  }
  EQ.revealed = true;
  EQ.asked++; if(EQ.ok) EQ.right++;
  eqRecord(e.id, EQ.step, EQ.ok);
  renderEq();
}

/* ==========================================================================
   BOOT
   ========================================================================== */
document.querySelectorAll('#nav button').forEach(b => b.onclick = () => show(b.dataset.v));
document.getElementById('btnWho').onclick = () => {
  if(EX && EX.running && !confirm('A paper is in progress and will be discarded. Switch profile anyway?')) return;
  const was = PROFILE;
  askProfile(true);
  // a new name means a new history, so nothing from the last person's session carries over
  if(PROFILE !== was){ Q = null; if(EX){ clearInterval(EX.timer); EX = null; } show('topics'); }
  else show(VIEW);
};
askProfile(false);
show('topics');
