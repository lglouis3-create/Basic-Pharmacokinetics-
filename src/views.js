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
  // the steady-state symbols: the infinity sign is part of the symbol
  ['Cmax∞','C<sub>max</sub><sup>∞</sup>'],['Cmin∞','C<sub>min</sub><sup>∞</sup>'],['Cavg∞','C<sub>avg</sub><sup>∞</sup>'],
  ['Cav∞','C<sub>av</sub><sup>∞</sup>'],['Dmax∞','D<sub>max</sub><sup>∞</sup>'],['Dmin∞','D<sub>min</sub><sup>∞</sup>'],
  ['Davg∞','D<sub>avg</sub><sup>∞</sup>'],
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
/* A stem is plain text. Blank lines separate paragraphs, and a block whose
   every line holds "a | b" is a data table, its first line the heading. */
function stemHTML(stem){
  return String(stem || '').split(/\n\s*\n/).map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if(lines.length >= 2 && lines.every(l => l.includes('|'))){
      const cells = l => l.split('|').map(c => c.trim());
      return `<div class="cmpwrap"><table class="stemtab"><thead><tr>${cells(lines[0]).map(c => `<th>${rich(c)}</th>`).join('')}</tr></thead>
        <tbody>${lines.slice(1).map(l => `<tr>${cells(l).map(c => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    return `<p>${rich(lines.join(' '))}</p>`;
  }).join('');
}
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

const VIEWS = ['topics','quiz','gaps','exam','guide','tell','terms','diag','eq','ref','settings'];
function show(v){
  VIEW = v;
  document.querySelectorAll('#nav button').forEach(b=>b.setAttribute('aria-selected', b.dataset.v===v));
  VIEWS.forEach(k => document.getElementById('v-'+k).classList.toggle('hide', k!==v));
  window.scrollTo(0,0);
  ({topics:renderTopics, quiz:renderQuiz, gaps:renderGaps, exam:renderExam,
    guide:renderGuide, tell:renderTell, terms:renderTerms, diag:renderDiagrams, eq:renderEq, ref:renderRef, settings:renderSettings}[v])();
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
      ${progressHTML(m, pool)}
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
      ${progressHTML(sm, sp)}
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

/* Which exam cards start open: the one being prepared for, unless this
   browser was told otherwise; earlier and later exams start closed. */
const EXAMGRP_KEY = NS + ':examgrp:';
const examGroupOpen = id => { const v = LS.get(EXAMGRP_KEY + id); return v ? v === 'open' : id === EXAM.id; };
function renderTopics(){
  if(MODPAGE) return renderModulePage();
  FILTER.kind = 'all';
  const shares = poolShares();
  const covered = shares.reduce((s,o)=> s + Math.min(o.want, poolQuestions(o.pool).length), 0);

  const cd = examCountdown(EXAM);
  let h = `<h2>Study by module</h2>${updatedText() ? `<p class="updated">${esc(updatedText())}${
      CHANGELOG.length ? ' · <a href="#" id="allChanges">All changes</a>' : ''}</p>` : ''}
  ${newsCard()}
  <p class="laywrap">${layoutToggle()}</p>
  <p class="sub">${esc(EXAM.name)} is ${EXAM.questions} questions in ${EXAM.minutes} minutes${
      EXAM.date ? ` on ${esc(EXAM.date)}` : ''}.${cd ? ` <b class="countdown">${esc(cd)}</b>` : ''}
    ${EXAM.blurb ? esc(EXAM.blurb) + ' ' : ''}
    Question bank: ${QUESTIONS.length} across ${conceptsIn(QUESTIONS).length} concepts.${
    COURSE.exams.length > 1 ? ' The paper being prepared for can be changed under Exam or Settings.' : ''}</p>`;

  const stepwiseOnly = false;

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

  /* Modules and their recap sit inside one card per exam, so the page reads
     Exam 1 (Modules 1-3, then a review of all three), Exam 2, and so on.
     The exam a module belongs to comes from the lecture list. */
  const examOfModule = mod => (COURSE.lectures.find(l => l.module === mod) || {}).exam;
  const groups = new Map(), rest = [];
  for(const m of outline()){
    const e = m.module != null ? examOfModule(m.module) : m.exam;
    if(e == null){ rest.push(m); continue; }
    if(!groups.has(e)) groups.set(e, {mods: [], recap: null});
    if(m.module != null) groups.get(e).mods.push(m); else groups.get(e).recap = m;
  }
  for(const [id, g] of groups){
    const ex = COURSE.exams.find(e => e.id === id);
    const pool = examQuestions(id);
    if(!pool.length && !g.mods.some(m => modulePool(m.module).length)) continue;
    const nums = g.mods.map(m => m.module);
    const span = nums.length > 1 ? `Modules ${nums[0]}–${nums[nums.length - 1]}` : nums.length ? `Module ${nums[0]}` : '';
    const day = ex && (ex.when || ex.date) ? new Date(ex.when || ex.date + 'T12:00').toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'}) : '';
    const when = ex ? [day, examCountdown(ex)].filter(Boolean).join(' · ') : '';
    h += `<details class="examgrp" data-examgrp="${id}"${examGroupOpen(id) ? ' open' : ''}><summary>
        <span class="mname">${esc(ex ? ex.name : 'Exam ' + id)}<small>${[span, when, pool.length ? pool.length + ' questions' : ''].filter(Boolean).map(esc).join(' · ')}</small></span>
        ${pool.length ? progressHTML(masteryOf(pool), pool) : ''}
      </summary><div class="egbody">`;
    for(const m of g.mods) h += moduleCard(m);
    if(pool.length && !stepwiseOnly){
      h += `<div class="module recapcard"><div class="mrow"><span class="mname">Review all of ${esc(ex ? ex.name : 'this exam')}<small>${splitNote(pool)}${span ? ' · ' + esc(span) + ' together' : ''}</small></span></div>
        <div class="mfoot">${examRows(pool, id)}
        <div class="subrow"><span class="sname"><b>Straight pass</b>
          <small>Every question once, shuffled, nothing held back by scheduling</small></span>
          <button data-exam="${id}" data-how="sweep" data-k="" class="ghost">Start</button></div>
        ${ex ? `<div class="subrow"><span class="sname"><b>Sit a practice paper</b>
          <small>${ex.questions} questions in ${ex.minutes} minutes at the blueprint, no feedback until you submit</small></span>
          <button data-exam="${id}" data-how="paper">Open</button></div>` : ''}
        </div></div>`;
    }
    h += `</div></details>`;
  }

  for(const m of rest){
    if(m.topic){ h += topicCard(m.topic); continue; }

    if(m.view){
      const nl = m.view === 'eq' ? EQUATIONS.filter(e => eqLearned(e.id)).length : 0;
      h += `<div class="module"><div class="mrow">
        <span class="mname">${esc(m.name)}<small>${
          m.view === 'eq'  ? 'Type them out or build them from pieces; the full table with symbols and units is under Reference'
        : m.view === 'ref' ? 'Every equation with its symbols, units and when it applies' : ''}</small></span>
        ${m.view === 'eq' ? `<span class="meter"><i style="width:${Math.round(100 * nl / Math.max(1, EQUATIONS.length))}%"></i></span>
        <span class="counts" title="Learned means three correct answers in a row in the equation drill">${nl}/${EQUATIONS.length} learned</span>` : ''}
        <button data-view="${esc(m.view)}">Open</button></div></div>`;
      continue;
    }

    h += moduleCard(m);
  }

  const fb = filterBar();
  if(fb) h += `<details class="morefilters"><summary>Filter by what a question asks</summary>${fb}</details>`;
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
  el.querySelectorAll('details.examgrp').forEach(d => d.addEventListener('toggle', () => {
    LS.set(EXAMGRP_KEY + d.dataset.examgrp, d.open ? 'open' : 'closed');
  }));

  el.querySelectorAll('.chip').forEach(b => b.onclick = () => {
    FILTER[b.dataset.f] = b.dataset.v; renderTopics();
  });
  el.querySelectorAll('.modbtn').forEach(b => b.onclick = () => {
    MODPAGE = {module: +b.dataset.mod, sec: b.dataset.sec}; renderModulePage();
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
  const nok = document.getElementById('newsok');
  if(nok) nok.onclick = () => { LS.set(NEWS_KEY, newsId(CHANGELOG[0])); const c = document.getElementById('news'); if(c) c.remove(); };
  ['newsall', 'allChanges'].forEach(id => { const b = document.getElementById(id);
    if(b) b.onclick = e => { e.preventDefault(); showChangelog(); }; });
}

/* ==========================================================================
   MODULES: CONCEPTS, CALCULATIONS, WORKSHEETS
   ==========================================================================
   Each module on Topics is one card with three ways in. Concepts lists her
   objectives; Calculations lists the kinds of problem, each with a worked
   example, single problems and problems in parts; Worksheets holds her
   practice sheets, in-class activities, homework and exam-review items. Each
   opens as its own page under Topics, with a way back. */
let MODPAGE = null;   // {module, sec:'concepts'|'calcs'|'worksheets'}
const subKey = q => q.topic + '/' + q.sub;
function modulePool(module){
  const m = outline().find(o => o.module === module);
  return m ? (m.topics || []).flatMap(t => poolFor(t.id, null)) : [];
}
const objectivesOf = module => (typeof OBJECTIVES === 'undefined' ? [] : OBJECTIVES).filter(o => o.module === module);
const objectivePool = o => QUESTIONS.filter(q => kindOf(q) === 'concept' && o.subs.includes(subKey(q)) && matchesFilter(q));
const objLabel = o => /^6a\./.test(o.n) ? `Oral doses, objective ${o.n.slice(3)}` : `Objective ${o.n}`;
/* the calculation type a question belongs to: the first whose match it meets */
function calcTypeOf(q){
  if(kindOf(q) !== 'calc' || typeof CALC_TYPES === 'undefined') return null;
  return CALC_TYPES.find(t => t.module === q.module && t.match.some(m => {
    const [ts, sk] = m.split(':');
    return (ts === subKey(q) || ts === q.topic) && (!sk || skillOf(q) === sk);
  })) || null;
}
const typesOf = module => (typeof CALC_TYPES === 'undefined' ? [] : CALC_TYPES).filter(t => t.module === module);
const typePool = t => QUESTIONS.filter(q => calcTypeOf(q) === t && matchesFilter(q));
const chainsOfKind = (module, kinds) => chainsInModule(module).filter(c => kinds.includes(c.src || 'example'));
const chainsForType = t => chainsInModule(t.module).filter(c => c.parts.some(id => { const q = byId(id); return q && calcTypeOf(q) === t; }));

function modBtn(module, sec, title, sub, pool){
  const an = pool ? answeredOf(pool) : null;
  return `<button class="modbtn" data-mod="${module}" data-sec="${sec}"><b>${title}</b><small>${sub}</small>${
    an && an.total ? `<span class="meter cov"><i style="width:${Math.round(100 * an.n / an.total)}%"></i></span>` : ''}</button>`;
}
function moduleCard(m){
  const pool = modulePool(m.module);
  if(!pool.length) return '';
  const cpool = ofKind(pool, 'concept'), kpool = ofKind(pool, 'calc');
  const objs = objectivesOf(m.module).filter(o => objectivePool(o).length);
  const types = typesOf(m.module).filter(t => typePool(t).length);
  const sheets = chainsOfKind(m.module, ['practice', 'inclass', 'homework', 'review']);
  const sheetQs = sheets.flatMap(c => c.parts.map(byId).filter(Boolean));
  return `<div class="module modcard"><div class="mrow">
      <span class="mname">${esc(m.name)}<small>${pool.length} questions</small></span>
      ${progressHTML(masteryOf(pool), pool)}</div>
    <div class="modbtns">
      ${modBtn(m.module, 'concepts', 'Concepts', `${cpool.length} questions · ${objs.length} objective${objs.length === 1 ? '' : 's'}`, cpool)}
      ${modBtn(m.module, 'calcs', 'Calculations', `${kpool.length} problems · ${types.length} type${types.length === 1 ? '' : 's'}`, kpool)}
      ${sheets.length ? modBtn(m.module, 'worksheets', 'Worksheets', `${sheets.length} set${sheets.length === 1 ? '' : 's'} from her handouts`, sheetQs) : ''}
    </div></div>`;
}

function rowHTML(title, sub, pool, btns){
  return `<div class="subrow"><span class="sname"><b>${title}</b><small>${sub}</small></span>
    ${pool && pool.length ? progressHTML(masteryOf(pool), pool) : ''}<span class="btns">${btns}</span></div>`;
}
function chainRow(c){
  const parts = c.parts.map(byId).filter(Boolean);
  return rowHTML(esc(c.name), `${parts.length} parts · ${c.setup}`, parts, `<button data-chain="${esc(c.id)}">Start</button>`);
}
function conceptsPage(module){
  const all = objectivePool({subs: objectivesOf(module).flatMap(o => o.subs)});
  let h = `<p class="sub">Pick one objective, or study all of them. Questions on a concept you missed come back first.</p>`;
  h += `<div class="topic plain"><div class="subs">` +
    rowHTML('All objectives', `${all.length} questions, no arithmetic`, all, `<button data-objall="${module}">Start</button>`) +
    objectivesOf(module).map((o, i) => { const pool = objectivePool(o); if(!pool.length) return '';
      return rowHTML(`<span class="objn">${esc(objLabel(o))}</span>${esc(o.text)}`, `${pool.length} question${pool.length === 1 ? '' : 's'}`, pool,
        `<button data-obj="${i}">Start</button>`); }).join('') + `</div></div>`;
  return h;
}
function calcsPage(module){
  const all = ofKind(modulePool(module), 'calc');
  let h = `<p class="sub">Each kind of problem has a worked example. <b>Single problems</b> asks the problems of that kind one at a time; <b>In parts</b> works one of her problems where each part uses the answer before it.</p>`;
  h += `<div class="topic plain"><div class="subs">` +
    rowHTML(`All calculations in this module`, `${all.length} problems, one at a time, shuffled`, all, `<button data-calcall="${module}">Start</button>`) + `</div></div>`;
  typesOf(module).forEach((t, i) => {
    const pool = typePool(t); if(!pool.length) return;
    const ex = byId(t.example), chains = chainsForType(t);
    h += `<div class="ctype"><div class="ctop"><span class="sname"><b>${esc(t.name)}</b><small>${pool.length} problem${pool.length === 1 ? '' : 's'}${
        chains.length ? ` · ${chains.length} in parts` : ''}</small></span>${progressHTML(masteryOf(pool), pool)}</div>
      <div class="cbtns"><button class="btn small" data-ctype="${esc(t.id)}">Single problems</button>${
        chains.length === 1 ? `<button class="btn small ghost" data-chain="${esc(chains[0].id)}">In parts</button>` : ''}</div>
      ${ex ? `<details class="worked"><summary>Worked example</summary><div class="wbody">
        <div class="wstem">${stemHTML(ex.stem)}</div>${stepsBlock(ex)}
        <p class="wans"><b>Answer:</b> ${esc(String(ex.answer))} ${esc(ex.units || '')}</p>
        <p class="wcite">${esc(ex.cite || '')}</p></div></details>` : ''}
      ${chains.length > 1 ? `<details class="worked"><summary>In parts: ${chains.length} of her problems</summary>
        <div class="subs">${chains.map(chainRow).join('')}</div></details>` : ''}
    </div>`;
  });
  const ex = chainsOfKind(module, ['example']);
  if(ex.length) h += `<h3>Her lecture examples, in parts</h3><div class="topic plain"><div class="subs">${ex.map(chainRow).join('')}</div></div>`;
  const extra = typesOf(module).map(t => [t, extrasOf(t)]).filter(([, p]) => p.length);
  if(extra.length) h += `<h3>Extra practice</h3><p class="sub">Problems written for this drill in her formats, with numbers that are not hers. They are kept out of the exam simulator and the module counts.</p>
    <div class="topic plain"><div class="subs">${extra.map(([t, p]) =>
      rowHTML(esc(t.name), `${p.length} problem${p.length === 1 ? '' : 's'}`, p, `<button data-xtype="${esc(t.id)}">Start</button>`)).join('')}</div></div>`;
  return h;
}
const extrasOf = t => (typeof EXTRAS === 'undefined' ? [] : EXTRAS).filter(q => q.xtype === t.id);
function worksheetsPage(module){
  let h = `<p class="sub">Problems from her handouts, kept apart from the calculation drills. Each is worked in her part order.</p>`, any = false;
  for(const [k, name, note] of WORKSHEET_KINDS){
    const cs = chainsOfKind(module, [k]); if(!cs.length) continue; any = true;
    h += `<h3>${esc(name)}</h3><p class="sub">${esc(note)}</p><div class="topic plain"><div class="subs">${cs.map(chainRow).join('')}</div></div>`;
  }
  return any ? h : h + `<div class="empty">No worksheets for this module yet.</div>`;
}
function renderModulePage(){
  const {module, sec} = MODPAGE, m = outline().find(o => o.module === module);
  if(!m){ MODPAGE = null; return renderTopics(); }
  const tab = (s, label) => `<button class="mtab" data-sec="${s}" aria-pressed="${sec === s}">${label}</button>`;
  const hasSheets = chainsOfKind(module, ['practice', 'inclass', 'homework', 'review']).length > 0;
  let h = `<p class="crumb"><button class="linkbtn" id="modBack">← All modules</button></p>
    <h2>${esc(m.name)}</h2>
    <div class="mtabs" role="group" aria-label="Section">${tab('concepts', 'Concepts')}${tab('calcs', 'Calculations')}${hasSheets ? tab('worksheets', 'Worksheets') : ''}</div>`;
  h += sec === 'calcs' ? calcsPage(module) : sec === 'worksheets' ? worksheetsPage(module) : conceptsPage(module);
  const el = $('#v-topics');
  el.innerHTML = h;
  window.scrollTo(0, 0);
  el.querySelector('#modBack').onclick = () => { MODPAGE = null; renderTopics(); };
  el.querySelectorAll('.mtab').forEach(b => b.onclick = () => { MODPAGE.sec = b.dataset.sec; renderModulePage(); });
  el.querySelectorAll('[data-objall]').forEach(b => b.onclick = () =>
    startPool(objectivePool({subs: objectivesOf(module).flatMap(o => o.subs)}), `${m.name} — all objectives`));
  el.querySelectorAll('[data-obj]').forEach(b => b.onclick = () => {
    const o = objectivesOf(module)[+b.dataset.obj]; startPool(objectivePool(o), `${m.name} — ${objLabel(o)}`); });
  el.querySelectorAll('[data-calcall]').forEach(b => b.onclick = () => startSweepOf(ofKind(modulePool(module), 'calc'), `${m.name} — calculations`));
  el.querySelectorAll('[data-ctype]').forEach(b => b.onclick = () => {
    const t = CALC_TYPES.find(x => x.id === b.dataset.ctype); startSweepOf(typePool(t), t.name); });
  el.querySelectorAll('button[data-chain]').forEach(b => b.onclick = () => startChain(b.dataset.chain));
  el.querySelectorAll('[data-xtype]').forEach(b => b.onclick = () => {
    const t = CALC_TYPES.find(x => x.id === b.dataset.xtype); startSweepOf(extrasOf(t), `${t.name} — extra practice`); });
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
  Q = {pool, label, since:Date.now(), current:null, answered:0, lastId:null, examMode:false, picked:null, revealed:false};
  nextQuestion();
  show('quiz');
}
/* A fixed queue over any set of questions: each asked once, shuffled, with
   no scheduling gate. `scope` names a startSweep scope that can be repeated. */
function startSweepOf(pool, label, scope){
  if(!pool.length){ alert('No questions match those filters.'); return; }
  Q = {pool, label, scope, since:Date.now(), sweep: shuffle(pool.map(q => q.id)), i: 0,
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
  Q = {pool: parts, label: c.name, chain: c, since:Date.now(), sweep: parts.map(q => q.id), i: 0,
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
    while(Q.i < Q.sweep.length && !q){ const id = Q.sweep[Q.i++]; if(!(Q.doneIds && Q.doneIds.has(id))) q = byId(id); }
  }else{
    q = pickNext(Q.doneIds ? Q.pool.filter(x => !Q.doneIds.has(x.id)) : Q.pool, Q.lastId);
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

/* ==========================================================================
   TERMS
   ==========================================================================
   Three modes over TERMS (glossary.js): Glossary (cards), Flashcards (the
   scene first, the term hidden), Quiz me (three questions per term). A group
   filter applies to all three; the Glossary has a search box, an A–Z bar and
   a By group / A–Z toggle. Term questions are kept outside QUESTIONS, so the
   exam draw and the module counts are unchanged, but their answers are
   logged and counted in Weak spots under the skill "Terms". */
const TERM_BY = Object.fromEntries(TERMS.map(t => [t.id, t]));
const termName = t => t.term.replace(/\s*\(.*\)\s*$/, '');
const termAbbr = t => (t.term.match(/\(([^)]*)\)/) || [, ''])[1];
const termMask = (t, s) => {
  let out = String(s);
  const words = [termName(t), termAbbr(t)].filter(w => w && w.length > 1);
  for(const w of words) out = out.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '____');
  return out;
};
function termDistractors(t, n){
  const pick = [...(t.confuse || []).map(id => TERM_BY[id]).filter(Boolean)];
  for(const o of TERMS) if(pick.length < n && o !== t && o.group === t.group && !pick.includes(o)) pick.push(o);
  for(const o of TERMS) if(pick.length < n && o !== t && !pick.includes(o)) pick.push(o);
  return pick.slice(0, n);
}
function termQuestions(){
  const out = [];
  for(const t of TERMS){
    const ds = termDistractors(t, 3);
    const base = {prof: 'Mosley', tier: 'new', exam: t.module <= 3 ? 1 : 2, module: t.module, lecture: t.lecture,
      topic: 'terms', sub: t.group, concept: 'term:' + t.id, skill: 'term', source: t.src || 'slide', cite: t.cite, termId: t.id,
      teach: [{h: termName(t), list: [t.def, ...(t.hook ? [t.hook] : [])]}]};
    const named = (o, right) => ({t: o.term, correct: right, why: right ? `${termName(o)}: ${o.gist}` : `${termName(o)} means something else: ${o.gist}`});
    out.push(Object.assign({}, base, {id: `term-${t.id}-scene`, stem: `Which term describes this? ${termMask(t, t.scene)}`,
      options: shuffle([named(t, true), ...ds.map(o => named(o, false))])}));
    out.push(Object.assign({}, base, {id: `term-${t.id}-gist`, dupOf: `term-${t.id}-scene`, stem: `What does "${t.term}" mean?`,
      options: shuffle([{t: t.gist, correct: true, why: `${termName(t)}: ${t.gist}`},
        ...ds.map(o => ({t: o.gist, why: `That describes ${termName(o)}, not ${termName(t)}.`}))])}));
    out.push(Object.assign({}, base, {id: `term-${t.id}-def`, dupOf: `term-${t.id}-scene`, stem: `Which term has this definition? ${termMask(t, t.def)}`,
      options: shuffle([named(t, true), ...ds.map(o => named(o, false))])}));
  }
  return out;
}
const TERM_QS = termQuestions();
const TERM_GROUPS = [...new Set(TERMS.map(t => t.group))];
const LETTERS_AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const termLetter = t => (termName(t).match(/[A-Za-z]/) || ['#'])[0].toUpperCase();
let TV = {mode: 'gloss', group: 'all', order: 'group', q: '', fc: null};
let TIO = null;

function termCardHTML(t){
  const fig = t.fig && (IMAGES[t.fig] ? `<figure class="reffig"><img src="${IMAGES[t.fig]}" alt="${esc(t.term)}"></figure>` : '');
  return `<div class="termcard" id="term-${esc(t.id)}" data-letter="${termLetter(t)}">
    <div class="dghead"><b>${esc(t.term)}</b><span>Module ${t.module} · ${esc(t.group)}</span></div>
    <p class="tgist">${rich(t.gist)}</p>
    <ul class="tlist"><li><b>Definition.</b> ${rich(t.def)}</li><li><b>In action.</b> ${rich(t.scene)}</li>${
      t.hook ? `<li><b>Her point.</b> ${rich(t.hook)}</li>` : ''}</ul>${fig || ''}
    ${t.quote ? `<p class="dquote">“${esc(t.quote)}”</p>` : ''}<p class="wcite">${esc(t.cite)}</p></div>`;
}
const termsInGroup = () => TERMS.filter(t => TV.group === 'all' || t.group === TV.group);
function termMatches(t, q){
  if(!q) return 2;
  const s = q.toLowerCase();
  if(t.term.toLowerCase().includes(s)) return 2;
  return [t.gist, t.def, t.scene, t.hook || ''].join(' ').toLowerCase().includes(s) ? 1 : 0;
}
function renderTerms(){
  const el = $('#v-terms');
  const groupChips = `<div class="frow">${['all', ...TERM_GROUPS].map(g => `<button class="chip" data-tgroup="${esc(g)}" aria-pressed="${TV.group === g}">${g === 'all' ? 'All groups' : esc(g)}</button>`).join('')}</div>`;
  const modeTabs = `<div class="mtabs">${[['gloss', 'Glossary'], ['flash', 'Flashcards'], ['quiz', 'Quiz me']].map(([m, l]) =>
    `<button class="mtab" data-tmode="${m}" aria-pressed="${TV.mode === m}">${l}</button>`).join('')}</div>`;
  let h = `<h2>Terms</h2><p class="sub">${TERMS.length} terms from her slides, each with its definition, what it looks like in practice, and where it is on the slides.</p>${modeTabs}<div class="filters">${groupChips}</div>`;
  if(TV.mode === 'gloss'){
    const pool = termsInGroup().map(t => [t, termMatches(t, TV.q)]).filter(([, m]) => m)
      .sort((a, b) => TV.q ? b[1] - a[1] || termName(a[0]).localeCompare(termName(b[0])) : 0).map(([t]) => t);
    const has = new Set(termsInGroup().map(termLetter));
    h += `<div class="tsearch" id="tsearch"><input type="search" id="tq" placeholder="Search terms, meanings and definitions" value="${esc(TV.q)}" aria-label="Search terms">
      <div class="frow"><button class="chip" data-torder="group" aria-pressed="${TV.order === 'group'}">By group</button><button class="chip" data-torder="az" aria-pressed="${TV.order === 'az'}">A–Z</button></div>
      <div class="azbar">${LETTERS_AZ.map(L => `<button class="az" data-az="${L}"${has.has(L) ? '' : ' disabled'}>${L}</button>`).join('')}</div></div>`;
    if(!pool.length) h += `<div class="empty">No term matches "${esc(TV.q)}".</div>`;
    else if(TV.q || TV.order === 'az'){
      const list = TV.q ? pool : pool.slice().sort((a, b) => termName(a).localeCompare(termName(b)));
      h += `<div id="tlist">${list.map(termCardHTML).join('')}</div>`;
    }else{
      h += `<div id="tlist">${TERM_GROUPS.filter(g => pool.some(t => t.group === g)).map(g =>
        `<h3>${esc(g)}</h3>${pool.filter(t => t.group === g).map(termCardHTML).join('')}`).join('')}</div>`;
    }
  }else if(TV.mode === 'flash'){
    const pool = termsInGroup();
    if(!TV.fc || TV.fc.group !== TV.group) TV.fc = {group: TV.group, order: shuffle(pool.map(t => t.id)), i: 0, shown: false};
    const fc = TV.fc;
    if(fc.i >= fc.order.length){
      h += `<div class="empty">That is every card in this group. <button class="btn small" id="fcAgain">Shuffle and start again</button></div>`;
    }else{
      const t = TERM_BY[fc.order[fc.i]];
      h += `<div class="qcard flash"><div class="qhead"><span>Card ${fc.i + 1} of ${fc.order.length}</span><span class="spacer"></span><span>${esc(t.group)}</span></div>
        <div class="qbody"><p class="fcscene"><b>In action:</b> ${rich(termMask(t, t.scene))}</p>${
        fc.shown ? `<p class="fcterm">${esc(t.term)}</p><p>${rich(t.gist)}</p><p class="wcite">${rich(t.def)}</p>` : ''}</div>
        <div class="qfoot">${fc.shown ? `<button class="btn" data-fc="correct">Knew it</button><button class="btn amber" data-fc="guessed">Not sure</button><button class="btn ghost" data-fc="wrong">Did not know</button>`
          : `<button class="btn" id="fcShow">Show the term</button>`}</div></div>`;
    }
  }else{
    h += `<p class="sub">Three questions per term: which term a situation describes, what a term means, and which term a definition belongs to.</p>
      <div class="topic plain"><div class="subs">${['all', ...TERM_GROUPS].map(g => {
        const pool = TERM_QS.filter(q => g === 'all' || q.sub === g);
        return rowHTML(g === 'all' ? 'All terms' : esc(g), `${pool.length} questions`, null, `<button data-tquiz="${esc(g)}">Start</button>`); }).join('')}</div></div>`;
  }
  el.innerHTML = h;
  el.querySelectorAll('[data-tmode]').forEach(b => b.onclick = () => { TV.mode = b.dataset.tmode; renderTerms(); });
  el.querySelectorAll('[data-tgroup]').forEach(b => b.onclick = () => { TV.group = b.dataset.tgroup; TV.fc = null; renderTerms(); });
  el.querySelectorAll('[data-torder]').forEach(b => b.onclick = () => { TV.order = b.dataset.torder; renderTerms(); });
  el.querySelectorAll('[data-az]').forEach(b => b.onclick = () => {
    if(TV.order !== 'az' || TV.q){ TV.order = 'az'; TV.q = ''; renderTerms(); }
    const c = document.querySelector(`#v-terms .termcard[data-letter="${b.dataset.az}"]`); if(c) scrollToEl(c); });
  const tq = $('#tq');
  if(tq){ tq.oninput = () => { TV.q = tq.value; const pos = tq.selectionStart; renderTerms(); const n = $('#tq'); n.focus(); n.setSelectionRange(pos, pos); }; }
  const fs = $('#fcShow'); if(fs) fs.onclick = () => { TV.fc.shown = true; renderTerms(); };
  const fa = $('#fcAgain'); if(fa) fa.onclick = () => { TV.fc = null; renderTerms(); };
  el.querySelectorAll('[data-fc]').forEach(b => b.onclick = () => {
    const t = TERM_BY[TV.fc.order[TV.fc.i]];
    record(byId(`term-${t.id}-gist`), b.dataset.fc, null, 0);
    TV.fc.i++; TV.fc.shown = false; renderTerms();
  });
  el.querySelectorAll('[data-tquiz]').forEach(b => b.onclick = () => {
    const g = b.dataset.tquiz; startPool(TERM_QS.filter(q => g === 'all' || q.sub === g), g === 'all' ? 'Terms' : `Terms — ${g}`); });
  // one observer at a time: the back-to-search button shows while the search bar is off screen
  if(TIO){ TIO.disconnect(); TIO = null; }
  const tb = document.getElementById('tback'); if(tb) tb.remove();
  const bar = $('#tsearch');
  if(bar && 'IntersectionObserver' in window){
    TIO = new IntersectionObserver(([e]) => {
      let b = document.getElementById('tback');
      if(e.isIntersecting || VIEW !== 'terms'){ if(b) b.remove(); return; }
      if(!b){ b = document.createElement('button'); b.id = 'tback'; b.className = 'btn'; b.textContent = '↑ Search or pick a letter';
        b.onclick = () => scrollToEl($('#tsearch')); document.body.appendChild(b); }
    });
    TIO.observe(bar);
  }
}

/* ==========================================================================
   EXPLAIN MORE
   ==========================================================================
   After every answer, up to four buttons open the page section that teaches
   that question: the Guide section for its objective, the Reference section
   for its module, its figure on the Diagrams tab, and its module's equations.
   A floating button returns to the question with the place kept (the quiz
   and exam state are global, so the question is exactly as it was).
   Anchors: guide-N and ref-N are the headings renderDoc numbers in page
   order; dg-<figure key> on Diagrams; eq-m<module> on Equations. */
const headsOf = html => [...html.matchAll(/<h3([^>]*)>([\s\S]*?)<\/h3>/g)].map((m, i) => {
  const nav = /data-nav="([^"]*)"/.exec(m[1]);
  return {i, t: deEnt((nav ? nav[1] : m[2]).replace(/<[^>]+>/g, '')).trim()};
});
let GUIDE_HEADS = null;
const REF_TOPIC_WORD = {multi: 'repeated', intermit: 'intermittent', multoral: 'oral'};
function linksFor(q){
  const out = [];
  GUIDE_HEADS ||= headsOf(GUIDE_HTML);
  const objs = OBJECTIVES.filter(o => o.module === q.module && o.subs.includes(subKey(q)));
  for(const o of objs.slice(0, 1)){
    const mod = /^6a\./.test(o.n) ? '6a' : String(o.module), n = /^6a\./.test(o.n) ? o.n.slice(3) : o.n;
    const g = GUIDE_HEADS.find(h => h.t.startsWith(`Module ${mod}, objective ${n} `));
    if(g) out.push(['guide', `guide-${g.i}`, `Guide: ${objLabel(o)}`]);
  }
  let refs = refLinksFor(q);
  if(refs.length > 1 && REF_TOPIC_WORD[q.topic]) refs = refs.filter(r => r.t.includes(REF_TOPIC_WORD[q.topic])).concat(refs).slice(0, 1);
  if(refs.length) out.push(['ref', `ref-${refs[0].i}`, `Reference: Module ${q.module}`]);
  const figKeys = [q.img, ...(Array.isArray(q.teach) ? q.teach.map(p => p && p.fig) : [])].filter(Boolean);
  for(const k of figKeys){
    const d = DIAGRAMS.flatMap(g => g.figs).find(f => f.key === k);
    if(d){ out.push(['diag', `dg-${k}`, `Diagram: ${d.name}`]); break; }
  }
  if(kindOf(q) === 'calc' && EQUATIONS.some(e => e.module === q.module)) out.push(['eq', `eq-m${q.module}`, `Equations: Module ${q.module}`]);
  return out;
}
function explainHTML(q){
  const ls = linksFor(q);
  return ls.length ? `<div class="explainmore"><span>Explain more:</span>${ls.map(([v, a, t]) =>
    `<button type="button" class="chip" data-jump="${v}:${a}">${esc(t)}</button>`).join('')}</div>` : '';
}
let RET = [];
function jump(view, anchor){
  RET.push({view: VIEW, y: window.scrollY, label: VIEW === 'exam' ? 'the exam' : 'the question'});
  show(view);
  const t = document.getElementById(anchor);
  if(t){
    for(let d = t.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true;
    if(t.tagName === 'DETAILS') t.open = true;
    /* Figures above the target take their height only once decoded, so the
       position is taken after they are, and checked again a moment later. */
    const land = () => { const hd = ['header', '#nav'].reduce((s, sel) => { const n = document.querySelector(sel); return s + (n ? n.getBoundingClientRect().height : 0); }, 0);
      window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY - hd - 8); };
    land();
    const imgs = [...document.querySelectorAll(`#v-${view} img`)].filter(i => !i.complete);
    Promise.all(imgs.map(i => i.decode ? i.decode().catch(() => {}) : null)).then(() => { land(); setTimeout(land, 150); });
  }
  backBtn();
}
function backBtn(){
  let b = document.getElementById('backbtn');
  if(!RET.length){ if(b) b.remove(); return; }
  if(!b){ b = document.createElement('button'); b.id = 'backbtn'; b.className = 'btn'; document.body.appendChild(b); }
  b.textContent = `← Back to ${RET[RET.length - 1].label}`;
  b.onclick = () => {
    const r = RET.pop(); show(r.view); window.scrollTo(0, r.y); backBtn();
  };
}
/* "Explain one" on Tell apart: a select, or a Why? chip in a table row, shows
   the matching <template data-x="group:key"> card under that table. */
function showExplain(group, key){
  const out = document.querySelector(`[data-xout="${group}"]`), sel = document.querySelector(`[data-xsel="${group}"]`);
  if(!out) return null;
  const t = key && document.querySelector(`template[data-x="${group}:${key}"]`);
  out.innerHTML = t ? t.innerHTML : '';
  if(sel) sel.value = key || '';
  return out;
}
function xselChange(e){ const s = e.target.closest && e.target.closest('select[data-xsel]'); if(s) showExplain(s.dataset.xsel, s.value); }
function xpickClick(e){
  const w = e.target.closest && e.target.closest('[data-xpick]');
  if(!w) return;
  const [g, k] = w.dataset.xpick.split(':');
  const out = showExplain(g, k);
  if(out) scrollToEl(out.closest('.xpick'));
}
function jumpClick(e){
  const b = e.target.closest && e.target.closest('[data-jump]'); if(!b) return;
  const [v, a] = b.dataset.jump.split(':'); jump(v, a);
}

/* ==========================================================================
   ANSWER LAYOUT: ONE AT A TIME, OR ALL ON ONE PAGE
   ==========================================================================
   DB.settings.layout is 'one' or 'all', saved with the learner's progress.
   The quiz and the exam read it. Both quiz layouts share Q.doneIds, the
   questions already answered in this drill, so switching layout part-way
   never asks a question twice. On one page, each card is answered in place
   and only that card is redrawn. */
const layoutOf = () => (DB.settings && DB.settings.layout === 'all') ? 'all' : 'one';
function layoutToggle(){
  const L = layoutOf();
  return `<span class="laytog"><span>Answer:</span><button class="chip" data-layout="one" aria-pressed="${L === 'one'}">One at a time</button><button class="chip" data-layout="all" aria-pressed="${L === 'all'}">All on one page</button></span>`;
}
function layoutClick(e){
  const b = e.target.closest && e.target.closest('[data-layout]'); if(!b) return;
  DB.settings.layout = b.dataset.layout; save();
  if(VIEW === 'quiz') renderQuiz(); else if(VIEW === 'exam') renderExam(); else if(VIEW === 'topics') renderTopics();
}
const markDone = id => (Q.doneIds ||= new Set()).add(id);
const noIds = h => h.replace(/ id="(numIn|mSel\d+|btnCheck)"/g, '');

/* The quiz on one page: the drill's questions in its own order, first 40,
   with "Show more" for the rest. */
function quizAllList(){
  if(!Q.allIds) Q.allIds = Q.sweep ? Q.sweep.slice() : shuffle(Q.pool.map(q => q.id));
  Q.allState ||= {};
  // questions answered one at a time before switching are not asked again here
  return Q.allIds.filter(id => !(Q.doneIds && Q.doneIds.has(id) && !Q.allState[id]) && byId(id));
}
function allCardState(q){
  return Q.allState[q.id] ||= {picked: qType(q) === 'match' ? {} : null, revealed: false, missKind: null,
    order: isMC(q) ? shuffle(q.options.map((o, i) => i)) : [], startedAt: Date.now()};
}
function allCardHTML(q, n, total){
  const st = allCardState(q), kind = qType(q), multi = isMulti(q);
  const ok = st.revealed ? gradeAnswer(q, st.picked) : false;
  const cst = {picked: st.picked, order: st.order, revealed: st.revealed, missKind: st.missKind, ok, inChain: !!Q.chain};
  let h = `<div class="qcard allcard" data-qid="${esc(q.id)}"><div class="qhead">${profTag(q.prof)}<span>${n} of ${total}</span><span class="spacer"></span>${
      st.revealed ? `<span style="color:var(${ok ? '--ok' : '--bad'})">${ok ? 'right' : 'missed'}</span>` : ''}</div>
    <div class="qbody"><div class="stem">${stemHTML(q.stem)}</div>`;
  if(q.img && IMAGES[q.img]) h += `<img class="qimg" src="${IMAGES[q.img]}" alt="Figure for this question">`;
  h += answerInputsHTML(q, cst);
  if(st.revealed) h += feedbackHTML(q, cst);
  h += `</div>`;
  const needCheck = kind === 'numeric' || kind === 'match' || multi;
  if(!st.revealed && needCheck) h += `<div class="qfoot"><button class="btn small" data-check="1">Check answer</button></div>`;
  if(st.revealed && ok && !st.guessed) h += `<div class="qfoot"><button class="btn small amber" data-guess="1">I guessed that one</button></div>`;
  return noIds(h + `</div>`);
}
function wireAllCard(card){
  const q = byId(card.dataset.qid), st = allCardState(q), kind = qType(q), multi = isMulti(q);
  const done = result => {
    st.revealed = true; markDone(q.id);
    record(q, result, kind === 'match' ? Object.assign({}, st.picked) : kind === 'numeric' ? String(st.picked == null ? '' : st.picked) : st.picked,
           Date.now() - st.startedAt);
    refreshAllCard(q.id);
  };
  if(!st.revealed){
    card.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const oi = +b.dataset.o;
      if(multi){ const p = st.picked || []; st.picked = p.includes(oi) ? p.filter(x => x !== oi) : [...p, oi]; refreshAllCard(q.id); }
      else { st.picked = oi; done(q.options[oi].correct ? 'correct' : 'wrong'); }
    });
    const ni = card.querySelector('input.numin');
    if(ni){ ni.oninput = e => { st.picked = e.target.value; };
            ni.onkeydown = e => { if(e.key === 'Enter'){ e.preventDefault(); card.querySelector('[data-check]').click(); } }; }
    card.querySelectorAll('.matchgrid select').forEach(sel => sel.onchange = () => {
      st.picked = Object.assign({}, st.picked); if(sel.value) st.picked[sel.dataset.l] = sel.value; else delete st.picked[sel.dataset.l]; });
    const bc = card.querySelector('[data-check]');
    if(bc) bc.onclick = () => {
      if(multi && !(st.picked || []).length) return;
      if(multi) st.picked = st.picked.slice().sort((a, b) => a - b);
      const right = kind === 'numeric' ? gradeNumeric(q, st.picked) : kind === 'match' ? gradeMatch(q, st.picked) : gradeMulti(q, st.picked);
      done(right ? 'correct' : 'wrong');
    };
  }
  card.querySelectorAll('[data-mk]').forEach(b => b.onclick = () => { st.missKind = b.dataset.mk; setMissKind(q, st.missKind); refreshAllCard(q.id); });
  const bg = card.querySelector('[data-guess]');
  if(bg) bg.onclick = () => { markGuessed(q); st.guessed = true; refreshAllCard(q.id); };
  card.querySelectorAll('[data-chainlink]').forEach(b => b.onclick = () => startChain(b.dataset.chainlink));
}
function refreshAllCard(id){
  const card = document.querySelector(`#v-quiz .allcard[data-qid="${CSS.escape(id)}"]`); if(!card) return;
  const list = quizAllList(), n = list.indexOf(id) + 1;
  card.outerHTML = allCardHTML(byId(id), n, list.length);
  wireAllCard(document.querySelector(`#v-quiz .allcard[data-qid="${CSS.escape(id)}"]`));
  const c = document.getElementById('allCount'); if(c) c.textContent = allCountText(list);
  const ss = document.getElementById('sess'); if(ss) ss.outerHTML = sessStrip();
}
const allCountText = list => `${list.filter(id => Q.allState[id] && Q.allState[id].revealed).length} of ${list.length} answered`;
function renderQuizAll(){
  const el = $('#v-quiz'), list = quizAllList();
  Q.allShow ||= 40;
  const shown = list.slice(0, Q.allShow);
  let h = `<div class="sessline">${sessStrip()}</div><div class="allhead"><b>${esc(Q.label)}</b><span id="allCount">${allCountText(list)}</span></div>
    <div class="laywrap">${layoutToggle()}</div>
    ${Q.chain ? `<p class="cset">${Q.chain.setup}</p>` : ''}`;
  h += shown.map((id, i) => allCardHTML(byId(id), i + 1, list.length)).join('');
  if(list.length > shown.length) h += `<p style="text-align:center"><button class="btn ghost" id="allMore">Show ${Math.min(40, list.length - shown.length)} more</button></p>`;
  if(!list.length) h += `<div class="empty">Every question in this drill has been answered.</div>`;
  h += `<p style="display:flex;gap:9px;flex-wrap:wrap;justify-content:center;margin-top:14px">
    <button class="btn ghost" onclick="show('gaps')">See weak spots</button><button class="btn ghost" onclick="show('topics')">Back to topics</button></p>`;
  el.innerHTML = h;
  el.querySelectorAll('.allcard').forEach(wireAllCard);
  const m = $('#allMore'); if(m) m.onclick = () => { Q.allShow += 40; renderQuizAll(); };
}

/* The exam on one page: every question, the clock in the bar at the top, one
   Submit at the end. Nothing is marked until the paper is submitted. */
function renderExamAll(){
  const el = $('#v-exam');
  const answered = EX.picks.filter((p, i) => !isBlank(EX.qs[i], p)).length;
  let h = `<div class="examhead sticky"><span class="clock" id="exClock">${fmt(EX.ends - Date.now())}</span>
    <span class="prog" id="exProg">${answered} of ${EX.qs.length} answered</span></div>
    <div class="laywrap">${layoutToggle()}</div>${shortfallNote(EX.coverage)}`;
  EX.qs.forEach((q, i) => {
    const kind = qType(q), multi = isMulti(q);
    h += `<div class="qcard allcard" data-ei="${i}"><div class="qhead">${profTag(q.prof)}<span>Question ${i + 1} of ${EX.qs.length}</span>${
      multi ? '<span class="tag sata">select all that apply</span>' : ''}</div><div class="qbody"><div class="stem">${stemHTML(q.stem)}</div>`;
    if(q.img && IMAGES[q.img]) h += `<img class="qimg" src="${IMAGES[q.img]}" alt="Figure for this question">`;
    if(kind === 'numeric') h += numericInput(q, EX.picks[i], false, '');
    else if(kind === 'match') h += matchSelects(q, EX.picks[i], false, false);
    else EX.orders[i].forEach((oi, n) => {
      const sel = multi ? EX.picks[i].includes(oi) : EX.picks[i] === oi;
      h += `<button class="opt${multi ? ' multi' : ''}${sel ? (multi ? ' on' : ' pick-ok') : ''}" data-o="${oi}" aria-pressed="${sel}">
        <span class="k">${multi ? (sel ? '☑' : '☐') : LETTERS[n]}</span><span>${rich(q.options[oi].t)}</span></button>`;
    });
    h += `</div></div>`;
  });
  h += `<p style="text-align:center"><button class="btn" id="exEnd">Submit paper</button></p>`;
  el.innerHTML = noIds(h);
  const prog = () => { const p = document.getElementById('exProg');
    if(p) p.textContent = `${EX.picks.filter((x, i) => !isBlank(EX.qs[i], x)).length} of ${EX.qs.length} answered`; };
  el.querySelectorAll('.allcard[data-ei]').forEach(card => {
    const i = +card.dataset.ei, q = EX.qs[i], multi = isMulti(q);
    card.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const oi = +b.dataset.o;
      if(multi){ const p = EX.picks[i]; EX.picks[i] = p.includes(oi) ? p.filter(x => x !== oi) : [...p, oi]; }
      else EX.picks[i] = oi;
      card.querySelectorAll('.opt').forEach(o => { const v = +o.dataset.o, sel = multi ? EX.picks[i].includes(v) : EX.picks[i] === v;
        o.className = 'opt' + (multi ? ' multi' : '') + (sel ? (multi ? ' on' : ' pick-ok') : ''); o.setAttribute('aria-pressed', sel);
        if(multi) o.querySelector('.k').textContent = sel ? '☑' : '☐'; });
      prog();
    });
    const ni = card.querySelector('input.numin'); if(ni) ni.oninput = e => { EX.picks[i] = e.target.value; prog(); };
    card.querySelectorAll('.matchgrid select').forEach(sel => sel.onchange = () => {
      const p = Object.assign({}, EX.picks[i]); if(sel.value) p[sel.dataset.l] = sel.value; else delete p[sel.dataset.l]; EX.picks[i] = p; prog(); });
  });
  $('#exEnd').onclick = () => { if(confirm('Submit the paper and see your score?')) finishExam(); };
}

/* The answer controls for one question: number box, matching selects, or
   option buttons, drawn the same way in either answer layout. */
function answerInputsHTML(q, st){
  const kind = qType(q), multi = isMulti(q), ok = st.ok;
  const picks = multi ? (st.picked || []) : null;
  let h = '';
  if(kind === 'numeric'){
    h += `<p class="sata">Type the number and check it. Anything within ${q.tol} ${esc(q.units)} of the keyed value counts.</p>`;
    h += numericInput(q, st.picked, st.revealed, st.revealed ? (ok ? 'ok' : 'bad') : '');
  }else if(kind === 'match'){
    h += `<p class="sata">Choose the matching item for each row, then check. Marked right only when every row matches.</p>`;
    h += matchSelects(q, st.picked, st.revealed, st.revealed);
  }else{
    if(multi) h += `<p class="sata">Select all that apply, then check. Marked right only when the whole set matches.</p>`;
    st.order.forEach((oi,n)=>{
      const o = q.options[oi];
      let cls = 'opt' + (multi ? ' multi' : '');
      const chosen = multi ? picks.includes(oi) : (oi === st.picked);
      if(st.revealed){
        if(chosen) cls += o.correct ? ' pick-ok' : ' pick-bad';
        else if(o.correct)  cls += ' reveal-ok';
      }else if(multi && chosen){
        cls += ' on';
      }
      h += `<button class="${cls}" data-o="${oi}"${st.revealed?' disabled':''} aria-pressed="${chosen}">
        <span class="k">${multi ? (chosen ? '☑' : '☐') : LETTERS[n]}</span><span>${rich(o.t)}</span></button>`;
    });
  }

  return h;
}
/* What follows an answer: the verdict, the working or each option's reason,
   the concept block, the note and the citation. */
function feedbackHTML(q, st){
  const kind = qType(q), multi = isMulti(q), ok = st.ok;
  const picks = multi ? (st.picked || []) : null;
  let h = '';
    // one gloss per term per question, shared between the options and the concept block
    const seen = new Set();
    const self = [teachText(q.teach), ...(q.options||[]).map(o=>o.why||''),
                  ...(q.steps||[]).map(x=>x.why||''), ...(q.pairs||[]).map(x=>x.why||'')].join(' ');
    let verdictLine;
    if(kind === 'numeric'){
      verdictLine = ok ? `✓ Correct — keyed answer ${q.answer.toFixed(4)} ${esc(q.units)}`
        : `✗ Not correct — the answer is ${q.answer.toFixed(4)} ${esc(q.units)}, and you entered ${esc(String(st.picked||'nothing'))}`;
    }else if(kind === 'match'){
      const got = (q.pairs||[]).filter(p => (st.picked||{})[p.l] === p.r).length;
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
        : `✗ Not correct — the answer is ${LETTERS[st.order.indexOf(q.options.findIndex(o=>o.correct))]}`;
    }
    h += `<div class="why">
      <p class="verdict ${ok?'ok':'bad'}">${verdictLine}</p>`;

    if(kind === 'numeric'){
      /* A missed calculation is asked about before it is explained. Naming the
         kind of slip takes one click, and it is the only way the app can tell
         a student who cannot set the problem up from one who sets it up
         correctly and loses the marks converting units. */
      if(!ok && !st.missKind){
        h += `<div class="misskind"><p><b>Which kind of miss was this?</b> One click, then the working.</p>
          <div class="frow">${MISS_KINDS.map(m =>
            `<button data-mk="${m.id}" aria-pressed="false" title="${esc(m.hint)}">${esc(m.label)}</button>`).join('')}</div></div>`;
      }else{
        if(!ok) h += `<p class="sub" style="margin:0 0 8px">Logged as ${esc(an((MISS_LABEL[st.missKind]||'').toLowerCase()))} miss.</p>`;
        h += stepsBlock(q);
      }
    }else if(kind === 'match'){
      h += pairsBlock(q);
    }else{
      st.order.forEach((oi,n)=>{
        const o = q.options[oi];
        const chosen = multi ? picks.includes(oi) : (oi === st.picked);
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
    if(inSet && !st.inChain)
      h += `<p class="prose" style="margin:13px 0 0;font-size:14.5px">She sets this as part
        ${inSet.step} of ${inSet.chain.parts.length} of one problem: ${esc(inSet.chain.name)}.
        <button class="linkish" data-chainlink="${esc(inSet.chain.id)}">Work the whole set
        from the start</button></p>`;
    h += `<div class="cite">${q.quote ? `<span class="quote">“${esc(q.quote)}”</span>` : ''}${
        srcFlag(q)}${esc(q.cite)}</div>`;
    h += explainHTML(q);
    h += `</div>`;
  return h;
}
function renderQuiz(){
  const el = $('#v-quiz');
  if(Q && layoutOf() === 'all') return renderQuizAll();
  // the question waiting here may have been answered on the one-page layout meanwhile
  if(Q && Q.current && !Q.revealed && Q.doneIds && Q.doneIds.has(Q.current.id)) return nextQuestion();
  if(!Q){ el.innerHTML = `<div class="empty">Choose a topic to begin.</div>`; return; }
  if(!Q.current && Q.sweep){
    el.innerHTML = `<div class="empty">
      <p><b>${Q.chain ? `That is every part of ${esc(Q.chain.name)} — all ${Q.sweep.length}.`
                      : `That is every question in this set — all ${Q.sweep.length} of them.`}</b></p>
      ${sessionSummary()}
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
      ${sessionSummary()}
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

  let h = `<div class="sessline">${sessStrip()}${layoutToggle()}</div><div class="qcard"><div class="qhead">
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
    <div class="stem">${stemHTML(q.stem)}</div>`;

  if(q.img && IMAGES[q.img]) h += `<img class="qimg" src="${IMAGES[q.img]}" alt="Figure for this question">`;

  const multi = isMulti(q);
  const picks = multi ? (Q.picked || []) : null;
  const cst = {picked:Q.picked, order:Q.order, revealed:Q.revealed, missKind:Q.missKind, ok, inChain:!!Q.chain};
  h += answerInputsHTML(q, cst);
  if(Q.revealed) h += feedbackHTML(q, cst);
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

  el.querySelectorAll('[data-chainlink]').forEach(b => b.onclick = () => startChain(b.dataset.chainlink));
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
  markDone(Q.current.id);
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
  markDone(Q.current.id);
  Q.revealed = true; Q.guessedLogged = false;
  const picks = Q.picked.slice().sort((a,b)=>a-b);
  record(Q.current, gradeMulti(Q.current, picks) ? 'correct' : 'wrong', picks, Date.now() - (Q.startedAt||Date.now()));
  renderQuiz();
}
function submitNumeric(){
  if(Q.revealed) return;
  markDone(Q.current.id);
  const ni = document.getElementById('numIn');
  if(ni) Q.picked = ni.value;
  Q.revealed = true; Q.guessedLogged = false;
  record(Q.current, gradeNumeric(Q.current, Q.picked) ? 'correct' : 'wrong',
         String(Q.picked == null ? '' : Q.picked), Date.now() - (Q.startedAt||Date.now()));
  renderQuiz();
}
function submitMatch(){
  if(Q.revealed) return;
  markDone(Q.current.id);
  Q.revealed = true; Q.guessedLogged = false;
  record(Q.current, gradeMatch(Q.current, Q.picked) ? 'correct' : 'wrong',
         Object.assign({}, Q.picked), Date.now() - (Q.startedAt||Date.now()));
  renderQuiz();
}

/* ==========================================================================
   WEAK SPOTS
   ========================================================================== */
/* ==========================================================================
   PROGRESS OVER TIME
   ==========================================================================
   Every logged answer carries the time it was given. These read the log back
   by day and by week, so a learner can see whether this week is better than
   the one before it. A lifetime total cannot show that: it moves less with
   every answer, and a bad first day sits inside it for the rest of the course.
   ========================================================================== */
const DAY_MS = 86400000;
const dayKey = t => { const d = new Date(t); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); };
const acc = as => { const n = as.length, r = as.filter(a => a.result === 'correct').length; return {n, r, pct: n ? Math.round(100 * r / n) : null}; };
const answersSince = (t0, t1) => DB.answers.filter(a => a.at >= t0 && (t1 == null || a.at < t1));
const fmtDay = t => new Date(t).toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'});
const fmtWhen = t => new Date(t).toLocaleDateString(undefined, {month: 'short', day: 'numeric'});
const pctTxt = a => a.pct == null ? '—' : a.pct + '%';
const pctCol = p => p == null ? 'inherit' : p >= 80 ? 'var(--ok)' : p >= 60 ? 'var(--warn)' : 'var(--bad)';
const an = w => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;
/* Answers on the questions of one pool: how many, and how many right. */
function seenOf(pool){ const ids = new Set(pool.map(q => q.id)); return acc(DB.answers.filter(a => ids.has(a.qid))); }
/* Two bars beside every topic. The first is coverage: how many of the
   topic's questions have been answered at all, which fills from the first
   answer and reads "all N answered" when the topic is done. The second is
   mastery: concepts answered right on three separate review days in full
   colour, with the concepts answered right and waiting for their next review
   day behind them in a lighter shade. The two move on different clocks, so
   they are shown apart. */
function answeredOf(pool){
  const ids = new Set(pool.map(q => q.id)), seen = new Set();
  for(const a of DB.answers) if(ids.has(a.qid)) seen.add(a.qid);
  return {n: seen.size, total: ids.size};
}
function progressHTML(m, pool){
  const an = answeredOf(pool), sn = seenOf(pool);
  const pa = an.total ? Math.round(100 * an.n / an.total) : 0;
  const pm = m.total ? Math.round(100 * m.mastered / m.total) : 0;
  const pw = m.total ? Math.round(100 * (m.mastered + (m.onway || 0)) / m.total) : 0;
  const done = an.total && an.n === an.total;
  return `<span class="meters">
    <span class="mrow2" title="Questions in this set answered at least once${sn.n ? `; ${sn.pct}% of those answers were right` : ''}">
      <span class="meter cov"><i style="width:${pa}%"></i></span>
      <span class="counts">${done ? `<em class="done">✓ all ${an.total} answered</em>` : `${an.n}/${an.total} answered`}${
        sn.n ? ` · <em style="color:${pctCol(sn.pct)}">${sn.pct}%</em> right` : ''}</span></span>
    <span class="mrow2" title="Mastered means three correct answers on separate review days; the light part is concepts answered right and waiting for their next review">
      <span class="meter"><b style="width:${pw}%"></b><i style="width:${pm}%"></i></span>
      <span class="counts">${m.mastered}/${m.total} mastered${m.onway ? ` · ${m.onway} on the way` : ''}</span></span>
  </span>`;
}
/* What this drill session produced, against everything before it. */
function sessionSummary(){
  if(!Q || !Q.since) return '';
  const mine = DB.answers.filter(a => a.at >= Q.since);
  if(!mine.length) return '';
  const now = acc(mine), prior = acc(DB.answers.filter(a => a.at < Q.since));
  let cmp = '';
  if(prior.pct != null)
    cmp = ` Before this session you were at ${prior.pct}% over ${prior.n} answer${prior.n === 1 ? '' : 's'}; this session is ${
      now.pct > prior.pct ? 'higher' : now.pct < prior.pct ? 'lower' : 'the same'}.`;
  return `<p class="session"><b>This session: ${now.r} of ${now.n} correct (${now.pct}%).</b>${cmp}</p>`;
}
function progressSection(){
  const now = Date.now(), today0 = dayKey(now);
  const t = acc(answersSince(today0)), w = acc(answersSince(now - 7 * DAY_MS)),
        p = acc(answersSince(now - 14 * DAY_MS, now - 7 * DAY_MS));
  const delta = w.pct != null && p.pct != null ? w.pct - p.pct : null;
  let h = `<h3>Your progress over time</h3>
  <p class="sub">The same answers, read by when you gave them. A week that scores above the week before it is improvement, which a lifetime total cannot show.</p>
  <div class="stat">
    <div><b style="color:${pctCol(t.pct)}">${pctTxt(t)}</b><span>today · ${t.n} answered</span></div>
    <div><b style="color:${pctCol(w.pct)}">${pctTxt(w)}</b><span>last 7 days · ${w.n} answered</span></div>
    <div><b style="color:${pctCol(p.pct)}">${pctTxt(p)}</b><span>the 7 days before · ${p.n} answered</span></div>
    <div><b style="color:${delta == null ? 'inherit' : delta > 0 ? 'var(--ok)' : delta < 0 ? 'var(--bad)' : 'inherit'}">${
      delta == null ? '—' : (delta > 0 ? '+' : '') + delta + ' pts'}</b><span>${delta == null ? 'change, once two weeks are logged' : 'change, week on week'}</span></div>
  </div>`;

  /* day by day, most recent first */
  const days = {};
  for(const a of DB.answers){ const k = dayKey(a.at); (days[k] ||= []).push(a); }
  const keys = Object.keys(days).map(Number).sort((a, b) => b - a).slice(0, 14);
  if(keys.length){
    h += `<table class="gap"><thead><tr><th>Day</th><th>Answered</th><th>Correct</th><th style="width:40%">Accuracy</th></tr></thead><tbody>`;
    for(const k of keys){
      const d = acc(days[k]);
      h += `<tr><td>${k === today0 ? 'Today' : esc(fmtDay(k))}</td><td>${d.n}</td><td>${d.r}</td>
        <td><div class="bar"><i style="width:${d.pct}%;background:${pctCol(d.pct)}"></i></div><span style="font-size:12px;color:var(--text-dim)">${d.pct}%</span></td></tr>`;
    }
    h += `</tbody></table>`;
  }

  /* each module, this week against everything before it */
  const rows = [];
  for(const m of outline()){
    if(m.module == null || !m.topics) continue;
    const pool = m.topics.flatMap(x => poolFor(x.id, null));
    const ids = new Set(pool.map(q => q.id));
    const mine = DB.answers.filter(a => ids.has(a.qid));
    if(!mine.length) continue;
    const before = acc(mine.filter(a => a.at < now - 7 * DAY_MS)), week = acc(mine.filter(a => a.at >= now - 7 * DAY_MS));
    rows.push({name: m.name, before, week});
  }
  if(rows.length){
    const anyBefore = rows.some(r => r.before.n);
    h += `<table class="gap"><thead><tr><th>Module</th><th>Before this week</th><th>This week</th><th>Change</th></tr></thead><tbody>`;
    for(const r of rows){
      const d = r.before.pct != null && r.week.pct != null ? r.week.pct - r.before.pct : null;
      h += `<tr><td>${esc(r.name)}</td>
        <td>${pctTxt(r.before)}${r.before.n ? ` <span style="font-size:12px;color:var(--text-dim)">of ${r.before.n}</span>` : ''}</td>
        <td style="color:${pctCol(r.week.pct)}">${pctTxt(r.week)}${r.week.n ? ` <span style="font-size:12px;color:var(--text-dim)">of ${r.week.n}</span>` : ''}</td>
        <td style="color:${d == null ? 'inherit' : d > 0 ? 'var(--ok)' : d < 0 ? 'var(--bad)' : 'inherit'};font-weight:600">${d == null ? '—' : (d > 0 ? '+' : '') + d}</td></tr>`;
    }
    h += `</tbody></table>`;
    if(!anyBefore) h += `<p class="sub">Every answer so far is from this week, so there is nothing yet to compare it with. The Change column fills in from the second week.</p>`;
  }

  /* practice papers */
  const papers = (DB.exams || []).slice().reverse().slice(0, 8);
  if(papers.length){
    h += `<table class="gap"><thead><tr><th>Practice paper</th><th>When</th><th>Score</th><th style="width:40%">Result</th></tr></thead><tbody>`;
    for(const x of papers){
      const ex = COURSE.exams.find(e => e.id === x.exam);
      const pc = x.total ? Math.round(100 * x.right / x.total) : 0;
      h += `<tr><td>${esc(ex ? ex.name : 'Paper')}</td><td>${esc(fmtWhen(x.at))}</td><td>${x.right} / ${x.total}</td>
        <td><div class="bar"><i style="width:${pc}%;background:${pctCol(pc)}"></i></div><span style="font-size:12px;color:var(--text-dim)">${pc}%</span></td></tr>`;
    }
    h += `</tbody></table>`;
  }
  return h;
}

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
  </div>
  <p class="sub">A concept counts as mastered after three correct answers on separate review days, so that number stays low in the first week however well you score. The accuracy figures move at once.</p>`;

  const plan = reviewPlan();
  h += sessionCard() + plan.html;
  h += progressSection();

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
        <div class="mstem">${stemHTML(q.stem)}</div>
        <div class="mmeta" style="color:var(--ok);margin-bottom:4px">Answer: ${esc(correctTxt)}</div>
        ${pickedTxt ? `<div class="mmeta" style="color:var(--bad);margin-bottom:4px">You entered: ${esc(pickedTxt)}</div>` : ''}
        ${last && last.missKind ? `<div class="mmeta" style="color:var(--warn);margin-bottom:4px">Named as ${esc(an((MISS_LABEL[last.missKind]||'').toLowerCase()))} miss</div>` : ''}
        <div class="mmeta">${esc(q.cite)} · missed ${s2.wrong||1}× · ${s2.box>=MASTER_BOX?'now mastered':'still in review'}</div>
      </div>`;
    }
  }
  h = h.replace(/<table class="gap">([\s\S]*?)<\/table>/g, '<div class="tw"><table class="gap">$1</table></div>');
  el.innerHTML = h;
  wireReviewPlan(el, plan);

  el.querySelectorAll('[data-next]').forEach(b => b.onclick = () => {
    const pl = pools.find(x=>x.key===b.dataset.pool);
    const pool = poolQuestions(pl);
    const want = b.dataset.next === 'unseen'
      ? pool.filter(q => !DB.concepts[q.concept] || !DB.concepts[q.concept].seen)
      : pool.filter(q => { const s2 = DB.concepts[q.concept]; return s2 && s2.seen && s2.box === 0; });
    if(!want.length) return;
    Q = {pool:want, label:(b.dataset.next==='unseen' ? 'Not yet seen — ' : 'Redrill — ') + pl.name, since:Date.now(),
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
    Q = {pool, label:'Missed concepts', since:Date.now(), sweep: shuffle(pool.map(q => q.id)), i:0,
         current:null, answered:0, lastId:null, examMode:false, picked:null, revealed:false};
    nextQuestion(); show('quiz');
  };
}

/* ==========================================================================
   EXAM COUNTDOWN
   ==========================================================================
   Calendar days between today and the exam's date in local time, not hours
   rounded up, so the evening before reads "1 day" and exam morning reads
   "today". `when` is the start time from the syllabus; the end is that plus
   the paper's minutes. */
function daysToExam(ex){
  if(!ex || !ex.when) return null;
  const day = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  return Math.round((day(ex.when) - day(Date.now())) / DAY_MS);
}
function examCountdown(ex){
  const d = daysToExam(ex);
  if(d == null) return '';
  const start = new Date(ex.when).getTime(), end = start + (ex.minutes || 0) * 60000, now = Date.now();
  if(now >= end) return 'This exam is over.';
  if(now >= start) return 'The exam is in progress.';
  if(d <= 0) return 'Exam day is today.';
  return `${d} day${d === 1 ? '' : 's'} until the exam.`;
}

/* ==========================================================================
   WHAT'S NEW
   ==========================================================================
   CHANGELOG.md, embedded by build.py, newest first. Topics shows the entries
   newer than the last one this browser marked as seen ("Got it"); Settings
   shows all of them. The seen marker is per browser, shared by every profile,
   since it is about the page and not about anyone's answers. */
const NEWS_KEY = NS + ':newsSeen';
const newsId = c => c ? c.date + '|' + c.items.join('').length : '';   // changes if bullets are added under the same heading
function newsCard(){
  if(!CHANGELOG.length) return '';
  const seen = LS.get(NEWS_KEY), i = seen ? CHANGELOG.findIndex(c => newsId(c) === seen) : 1;
  const fresh = CHANGELOG.slice(0, i < 0 ? 1 : i); if(!fresh.length) return '';
  const items = fresh.flatMap(c => c.items), shown = items.slice(0, 8);
  return `<div class="news" id="news"><div class="newshead"><b>What’s new</b><span>${esc(fresh[0].date.replace(/ \(.*\)$/, ''))}</span></div>
    <ul>${shown.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${items.length > shown.length ? `<p class="newsmore">+ ${items.length - shown.length} more</p>` : ''}
    <div class="newsbtns"><button class="btn small" id="newsok">Got it</button><button class="btn small ghost" id="newsall">All changes</button></div></div>`;
}
function changelogHTML(){
  if(!CHANGELOG.length) return '';
  return `<h3 id="changelog">Change log</h3><div class="filters changelog">${CHANGELOG.map(c =>
    `<p><b>${esc(c.date)}</b></p><ul>${c.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`).join('')}</div>`;
}
function showChangelog(){
  show('settings');
  const t = document.getElementById('changelog'); if(t) scrollToEl(t);
}

/* ==========================================================================
   THIS SESSION
   ==========================================================================
   A session is the run of answers with no gap longer than 30 minutes, ending
   with the latest answer, so it survives a page reload. It is over once 30
   minutes pass with no answer. "Solid" is a correct answer that was not marked
   as a guess. sessStrip() is the one line above the quiz card; the quiz card
   is redrawn after every answer, so the line is current after every answer. */
const SESSION_GAP = 30 * 60000;
function sessionLog(){
  const L = DB.answers; if(!L.length) return [];
  let k = L.length - 1;
  while(k > 0 && L[k].at - L[k - 1].at < SESSION_GAP) k--;
  return Date.now() - L[L.length - 1].at < SESSION_GAP ? L.slice(k) : [];
}
const solid = a => a.result === 'correct';
const dotsHTML = (as, cls) => `<span class="sdots10${cls ? ' ' + cls : ''}">${as.map(a =>
  `<i class="${solid(a) ? 'y' : 'n'}" title="${esc(a.qid)}${a.result === 'guessed' ? ' (guessed)' : ''}"></i>`).join('')}</span>`;
function sessStrip(){
  const ses = sessionLog();
  if(!ses.length) return `<span id="sess">This session: no answers yet</span>`;
  const ok = ses.filter(solid).length, last = ses.slice(-10);
  return `<span id="sess">This session: ${ok}/${ses.length} (${Math.round(100 * ok / ses.length)}%) · last ${last.length}: ${dotsHTML(last)}</span>`;
}

/* The score of a question on its last three answers, 0 to 1; null if never
   answered. A question below 1 is not yet solid. */
function recentById(){
  const r = {};
  for(const a of DB.answers) (r[a.qid] ||= []).push(a);
  return r;
}
function lastThree(recent, q){
  const r = (recent[q.id] || []).slice(-3);
  return r.length ? r.filter(solid).length / r.length : null;
}

function sessionCard(){
  const ses = sessionLog();
  if(!ses.length) return '';
  const recent = recentById();
  const ok = ses.filter(solid).length, pct = Math.round(100 * ok / ses.length);
  const half = Math.floor(ses.length / 2), a = ses.slice(0, half), b = ses.slice(half);
  const pa = a.length ? Math.round(100 * a.filter(solid).length / a.length) : null,
        pb = b.length ? Math.round(100 * b.filter(solid).length / b.length) : null;
  const missed = [...new Set(ses.filter(x => !solid(x)).map(x => x.qid))]
    .map(byId).filter(q => q && lastThree(recent, q) < 1);
  const mins = Math.max(1, Math.round((ses[ses.length - 1].at - ses[0].at) / 60000));
  SESSION_RETRY = missed;
  return `<h3>This session</h3><div class="sesscard">
    <div class="sesstop"><span><b class="big">${pct}%</b> ${ok} of ${ses.length} solid in ${mins} min</span>
      ${pa != null && ses.length >= 6 ? `<span>first half ${pa}% → second half ${pb}%</span>` : ''}</div>
    ${dotsHTML(ses.slice(-20), 'big')}
    <p class="sesshint">The last ${Math.min(20, ses.length)} answers, oldest on the left; filled is a correct answer, outlined is a miss or a guess. A session ends after 30 minutes with no answer.</p>
    ${missed.length ? `<button class="btn small" id="retrySess">Retry the ${missed.length} missed this session</button>` : ''}</div>`;
}
let SESSION_RETRY = [];

/* ==========================================================================
   WHAT TO REVIEW NEXT
   ==========================================================================
   Every question not solid on its last three answers, grouped by the subtopic
   that teaches it and ranked by how much is missing. Each concept shows its
   stem, what was chosen and why that is not the answer, the answer, the first
   sentences of its concept block, links to the Reference sections for its
   module, and a button that drills the group. `picked` is an option index, an
   array of indices (select-all), the string typed (numeric) or a left-to-right
   map (matching), so each is read back in its own way. */
let REF_HEADS = null;
function refLinksFor(q){
  REF_HEADS ||= [...REFERENCE_HTML.matchAll(/<h3([^>]*)>([\s\S]*?)<\/h3>/g)]
    .map((m, i) => ({i, t: deEnt(m[2].replace(/<[^>]+>/g, '')).trim()}));
  return q.module == null ? [] : REF_HEADS.filter(h => h.t.startsWith(`Module ${q.module} `));
}
const plainMath = s => String(s || '').replace(/\{\{frac:([^|}]*)\|([^}]*)\}\}/g, '($1)/($2)');
const clip = (s, n) => s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s;
function firstSentences(t){
  const txt = plainMath(teachText(t)).replace(/<[^>]+>/g, '');
  const m = txt.match(/^(.*?[.!?](\s|$)){1,2}/);
  return clip((m ? m[0] : txt).trim(), 320);
}
function pickedRead(q, a){
  const p = a.picked; if(p === undefined || p === null) return null;
  const kind = qType(q);
  if(kind === 'numeric') return {txt: String(p) + (q.units ? ' ' + q.units : ''), why: ''};
  if(kind === 'match'){
    const wrong = (q.pairs || []).filter(pr => p[pr.l] !== pr.r);
    if(!wrong.length) return null;
    return {txt: wrong.map(pr => `${pr.l} → ${p[pr.l] || 'blank'}`).join(' · '),
            why: wrong.map(pr => `${pr.l} goes with ${pr.r}.${pr.why ? ' ' + pr.why : ''}`).join(' ')};
  }
  const os = [].concat(p).map(i => q.options && q.options[i]).filter(o => o && !o.correct);
  if(!os.length) return null;
  return {txt: os.map(o => o.t).join(' · '), why: os.map(o => o.why || '').join(' ')};
}
function answerRead(q){
  const kind = qType(q);
  if(kind === 'numeric') return `${q.answer} ${q.units || ''}`.trim();
  if(kind === 'match') return (q.pairs || []).map(p => `${p.l} → ${p.r}`).join(' · ');
  return (q.options || []).filter(o => o.correct).map(o => o.t).join(' · ');
}
function reviewPlan(){
  const recent = recentById();
  const notSolid = QUESTIONS.filter(q => { const s = lastThree(recent, q); return s != null && s < 1; });
  const areas = {};
  for(const q of notSolid){
    const t = TOPICS.find(x => x.id === q.topic), sb = t && (t.subs || []).find(x => x.id === q.sub);
    const key = q.topic + '|' + (q.sub || '');
    const A = areas[key] ||= {name: t ? (sb ? `${t.name} — ${sb.name}` : t.name) : 'Other', links: refLinksFor(q), qs: [], gap: 0, concepts: {}};
    A.qs.push(q); A.gap += 1 - lastThree(recent, q);
    const c = A.concepts[q.concept] ||= {qs: [], last: null};
    c.qs.push(q);
    const miss = (recent[q.id] || []).filter(a => !solid(a)).pop();
    if(miss && (!c.last || miss.at > c.last.a.at)) c.last = {a: miss, q};
  }
  const ranked = Object.values(areas).sort((x, y) => y.gap - x.gap);
  let h = `<h3>What to review next</h3>`;
  if(!ranked.length){
    h += `<div class="empty">Every question you have answered is solid on its last three answers.</div>`;
    return {html: h, ranked, notSolid};
  }
  h += `<p class="sub">${notSolid.length} question${notSolid.length === 1 ? '' : 's'} not yet solid on their last three answers, grouped by subtopic, the most missing first. A correct answer marked as a guess counts as a miss here.</p>`;
  ranked.slice(0, 6).forEach((A, ai) => {
    const cs = Object.values(A.concepts).sort((x, y) => y.qs.length - x.qs.length);
    h += `<div class="plan"><div class="planhead"><b>${ai + 1}. ${esc(A.name)}</b><span>${A.qs.length} question${A.qs.length === 1 ? '' : 's'} · ${cs.length} concept${cs.length === 1 ? '' : 's'}</span></div>`;
    cs.slice(0, 4).forEach(c => {
      const q = (c.last && c.last.q) || c.qs[0], pr = c.last ? pickedRead(c.last.q, c.last.a) : null;
      h += `<div class="pconcept"><div class="pq">${rich(clip(plainMath(q.stem), 200))}</div>`;
      if(pr) h += `<div class="pw"><b>You ${qType(q) === 'numeric' ? 'entered' : 'chose'}:</b> ${rich(pr.txt)}${
        pr.why ? `<span class="pwhy">${qType(q) === 'match' ? 'What each one goes with' : 'Why it is not the answer'}: ${rich(clip(plainMath(pr.why), 400))}</span>` : ''}</div>`;
      else if(c.last && c.last.a.result === 'guessed') h += `<div class="pw"><b>You got it right but marked it a guess.</b></div>`;
      h += `<div class="pr"><b>Answer:</b> ${rich(answerRead(q))}</div>`;
      if(q.teach) h += `<div class="pi"><b>The idea:</b> ${rich(firstSentences(q.teach))}</div>`;
      if(c.qs.length > 1) h += `<div class="pmore">${c.qs.length} questions on this concept are not solid.</div>`;
      h += `</div>`;
    });
    if(cs.length > 4) h += `<p class="pmore">+ ${cs.length - 4} more concept${cs.length - 4 === 1 ? '' : 's'} in this subtopic.</p>`;
    h += `<div class="planbtns">${A.links.map(l => `<button type="button" class="chip" data-refjump="${l.i}">Read: ${esc(l.t)}</button>`).join('')}
      <button class="btn small" data-area="${ai}">Drill these ${A.qs.length}</button></div></div>`;
  });
  if(ranked.length > 6) h += `<p class="sub">${ranked.length - 6} more subtopic${ranked.length - 6 === 1 ? ' has' : 's have'} questions to review; they appear here as these are solved.</p>`;
  h += `<p class="sub"><button class="btn ghost" id="planAll">Drill all ${notSolid.length} not-solid questions</button></p>`;
  return {html: h, ranked, notSolid};
}
/* The plan's questions were mostly missed moments ago, so the scheduler's GAP
   rule would hold them back; a fixed queue asks each one. */
function wireReviewPlan(el, plan){
  el.querySelectorAll('[data-area]').forEach(b => b.onclick = () => {
    const A = plan.ranked[+b.dataset.area]; if(A) startSweepOf(A.qs.slice(), A.name);
  });
  el.querySelectorAll('#planAll').forEach(b => b.onclick = () => startSweepOf(plan.notSolid.slice(), 'Not yet solid'));
  el.querySelectorAll('#retrySess').forEach(b => b.onclick = () => startSweepOf(SESSION_RETRY.slice(), 'Missed this session'));
  el.querySelectorAll('[data-refjump]').forEach(b => b.onclick = () => {
    show('ref'); const t = document.getElementById('ref-' + b.dataset.refjump); if(t) scrollToEl(t);
  });
}

/* Scroll so the target sits just below the sticky header and tab bar, which
   scrollIntoView would leave it underneath. */
const RM = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
function scrollToEl(el){
  const off = ['header', '#nav'].reduce((s, sel) => { const n = document.querySelector(sel);
    return s + (n ? n.getBoundingClientRect().height : 0); }, 0) + 8;
  window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - off, behavior: RM() ? 'auto' : 'smooth'});
}

/* ==========================================================================
   STEP-THROUGH FIGURES
   ==========================================================================
   figures.py draws each one as a single inline SVG with one <g class="st"> per
   step and the caption of each step as data. Back and Next wrap around,
   Replay re-runs the move into the current step, Play all runs from step 1
   and stops at the last, and a dot per step jumps to it.

   stepTo() does the motion. A shape present in both steps is matched by its
   data-k (else by tag, class and text or fill; the signature leaves out the
   fadein/glide classes stepTo adds) and glides from where it was; a new shape
   fades in; a shape that is gone fades out from a copy left behind for half a
   second. A shape with an SVG transform attribute does not glide, since a CSS
   transform would replace it. CSS does the timing, and none of it runs under
   prefers-reduced-motion. */
function stepFigHTML(key){
  const f = STEPFIGS[key]; if(!f) return '';
  const n = f.steps.length;
  const dots = f.steps.map((s, i) => `<button class="sdot${i ? '' : ' on'}" data-go="dot" data-i="${i}" aria-label="Go to step ${i + 1}"${i ? '' : ' aria-current="step"'}></button>`).join('');
  return `<figure class="reffig stepfig" data-stepfig="${esc(key)}"><div class="stsvg">${f.svg}</div>
    <div class="anim" data-anim="${esc(key)}"><button class="btn small ghost" data-go="-1">◀ Back</button><button class="btn small ghost" data-go="1">Next ▶</button><button class="btn small ghost" data-go="replay">↻ Replay step</button><button class="btn small ghost" data-go="play">▶ Play all</button><span class="sdots">${dots}</span></div>
    ${f.steps.map((s, i) => `<p class="stcap${i ? '' : ' on'}" data-i="${i}"><b>Step ${i + 1} of ${n} · ${esc(s.tag)}.</b> ${esc(s.cap)}</p>`).join('')}
    <figcaption>${esc(f.title)}</figcaption></figure>`;
}
const LEAF_SEL = 'text,circle,rect,ellipse,line,polyline,polygon,path';
const sigOf = el => el.getAttribute('data-k') || [el.tagName, (el.getAttribute('class') || '').replace(/\b(fadein|glide)\b/g, '').trim(),
  el.tagName === 'text' ? el.textContent : (el.getAttribute('fill') || '')].join('|');
const centreOf = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2, r.width + r.height]; };
let ANIM = null;
function stepTo(fig, from, to){
  const steps = [...fig.querySelectorAll('.st')], svg = fig.querySelector('svg');
  fig.querySelectorAll('.st-out').forEach(n => n.remove());
  const old = from != null && from !== to ? steps[from] : null;
  const before = new Map();   // signature -> queue of old screen positions
  if(old && !RM()) old.querySelectorAll(LEAF_SEL).forEach(el => { const k = sigOf(el), c = centreOf(el);
    if(c[2]) (before.get(k) || before.set(k, []).get(k)).push({el, c}); });
  steps.forEach((s, j) => s.classList.toggle('on', j === to));
  fig.querySelectorAll('.stcap').forEach((p, j) => p.classList.toggle('on', j === to));
  fig.querySelectorAll('.sdot').forEach((d, j) => { d.classList.toggle('on', j === to); d.setAttribute('aria-current', j === to ? 'step' : 'false'); });
  if(RM()) return;
  const now = steps[to], scale = svg.viewBox.baseVal.width / (svg.getBoundingClientRect().width || 1), used = new Set();
  const leaves = [...now.querySelectorAll(LEAF_SEL)];
  leaves.forEach(el => { el.classList.remove('fadein', 'glide'); el.style.transform = ''; });
  svg.getBoundingClientRect();                        // restart the fade-in animations
  leaves.forEach(el => {
    const q = before.get(sigOf(el)), m = q && q.shift();
    if(!m){ el.classList.add('fadein'); return; }
    used.add(m.el);
    if(el.hasAttribute('transform')) return;
    const c = centreOf(el), dx = (m.c[0] - c[0]) * scale, dy = (m.c[1] - c[1]) * scale;
    if(Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
    el.style.transform = `translate(${dx}px,${dy}px)`;
    el.getBoundingClientRect();                       // commit the start position
    el.classList.add('glide'); el.style.transform = '';
  });
  if(!old) return;
  const ghost = old.cloneNode(true); ghost.classList.remove('on', 'st'); ghost.classList.add('st-out'); ghost.removeAttribute('data-step');
  const oldLeaves = [...old.querySelectorAll(LEAF_SEL)], ghostLeaves = [...ghost.querySelectorAll(LEAF_SEL)];
  oldLeaves.forEach((el, k) => { if(used.has(el)) ghostLeaves[k].remove(); });
  svg.appendChild(ghost); setTimeout(() => ghost.remove(), 600);
}
/* Tap a figure to see it at full drawing width: on a phone the page shrinks a
   720-unit figure to fit, which makes its axis numbers small. The enlarged
   copy scrolls sideways; the close button or Escape returns to the page. */
function openZoom(img){
  closeZoom();
  const z = document.createElement('div');
  z.id = 'zoom'; z.setAttribute('role', 'dialog'); z.setAttribute('aria-label', 'Enlarged figure');
  z.innerHTML = `<button class="btn" id="zoomx">✕ Close</button><img src="${img.src}" alt="${esc(img.alt || 'figure')}">`;
  document.body.appendChild(z);
  z.querySelector('#zoomx').onclick = closeZoom;
  z.onclick = e => { if(e.target === z) closeZoom(); };
}
function closeZoom(){ const z = document.getElementById('zoom'); if(z) z.remove(); }
function zoomClick(e){
  const img = e.target.closest && e.target.closest('.reffig img, img.qimg');
  if(img && !e.target.closest('#zoom')) openZoom(img);
}
function stepClick(e){
  const b = e.target.closest('[data-anim] button'); if(!b) return;
  const fig = b.closest('figure'), steps = [...fig.querySelectorAll('.st')]; if(!steps.length) return;
  const cur = steps.findIndex(s => s.classList.contains('on')), n = steps.length;
  const playBtn = fig.querySelector('[data-go="play"]');
  const stop = () => { if(ANIM){ clearInterval(ANIM.t); ANIM.b.textContent = '▶ Play all'; ANIM = null; } };
  const go = b.dataset.go;
  if(go === 'play'){
    const same = ANIM && ANIM.b === b; stop(); if(same) return;
    b.textContent = '❚❚ Pause'; stepTo(fig, cur, 0);
    ANIM = {b, t: setInterval(() => {
      if(!document.body.contains(fig)) return stop();
      const i = steps.findIndex(s => s.classList.contains('on'));
      if(i >= n - 1) return stop();
      stepTo(fig, i, i + 1); if(i + 1 === n - 1) stop();
    }, 3600)};
    return;
  }
  if(ANIM && ANIM.b === playBtn) stop();
  if(go === 'replay') return stepTo(fig, cur > 0 ? cur - 1 : null, cur);
  if(go === 'dot') return stepTo(fig, cur, +b.dataset.i);
  stepTo(fig, cur, (cur + (+go) + n) % n);
}

/* ==========================================================================
   DIAGRAMS
   ==========================================================================
   Every drawn figure in one place, grouped by module, with a contents card of
   chips that jump to each one. ▶ marks a step-through figure. The groups are
   this course's; the titles are the ones figures.py gives each figure. */
/* The groups, walk-throughs and figure keys are course content, in
   diagrams.js. Each figure gets a card: its name and module, the figure (or
   step-through), and the five-step "Read this graph" list. */
function readGraphHTML(d){
  const row = (k, label) => d[k] ? `<li><b>${label}</b> ${richHTML(esc(d[k]))}</li>` : '';
  return `<div class="readgraph"><h4>Read this graph</h4><ol>
    ${row('axes', 'Axes.')}${row('shape', 'Shape.')}${row('eq', 'Equation.')}${row('how', 'How the equation makes the shape.')}${row('asks', 'What she asks.')}</ol>
    ${d.quote ? `<p class="dquote">“${esc(d.quote)}”</p>` : ''}</div>`;
}
function renderDiagrams(){
  let toc = '', body = '';
  DIAGRAMS.forEach((g, gi) => {
    const figs = g.figs.filter(d => STEPFIGS[d.key] || IMAGES[d.key]); if(!figs.length) return;
    toc += `<div class="dgtoc"><b>${esc(g.group)}</b><div class="dgchips">${figs.map(d =>
      `<a class="chip" href="#dg-${d.key}" data-dg="${d.key}">${esc(d.name)}${STEPFIGS[d.key] ? ' ▶' : ''}</a>`).join('')}</div></div>`;
    body += `<h3 id="dgg-${gi}">${esc(g.group)}</h3><p class="sub">${esc(g.note)}</p>` + figs.map(d => `<div id="dg-${d.key}" class="dgfig">
      <div class="dghead"><b>${esc(d.name)}</b><span>Module ${d.module}</span></div>
      ${STEPFIGS[d.key] ? stepFigHTML(d.key)
        : `<figure class="reffig"><img src="${IMAGES[d.key]}" alt="${esc(FIG_TITLES[d.key] || d.name)}"></figure>`}
      ${readGraphHTML(d)}</div>`).join('');
  });
  const el = $('#v-diag');
  el.innerHTML = `<h2>Diagrams</h2>
    <div class="dgintro"><p><b>Three steps for any graph</b></p><ol>${DIAGRAM_INTRO.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
    <p class="dquote">“${esc(DIAGRAM_QUOTE)}”</p></div>
    <p class="sub">Tap any figure to enlarge it. ▶ marks a step-through figure: use Next, Play all or the step dots under it.</p>${toc}${body}`;
  el.querySelectorAll('[data-dg]').forEach(a => a.onclick = e => { e.preventDefault();
    const t = document.getElementById('dg-' + a.dataset.dg); if(t) scrollToEl(t); });
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
/* Every paper sat, newest first, so a second paper can be read against the first. */
function examHistory(){
  const papers = (DB.exams || []).slice().reverse();
  if(!papers.length) return '';
  let h = `<h3>Your papers so far</h3><div class="tw"><table class="gap"><thead><tr><th>Paper</th><th>When</th><th>Score</th><th>Blank</th><th style="width:36%">Result</th></tr></thead><tbody>`;
  for(const x of papers.slice(0, 12)){
    const ex = COURSE.exams.find(e => e.id === x.exam);
    const pc = x.total ? Math.round(100 * x.right / x.total) : 0;
    h += `<tr><td>${esc(ex ? ex.name : 'Paper')}</td><td>${esc(fmtWhen(x.at))}</td><td>${x.right} / ${x.total}</td><td>${x.blank || 0}</td>
      <td><div class="bar"><i style="width:${pc}%;background:${pctCol(pc)}"></i></div><span style="font-size:12px;color:var(--text-dim)">${pc}%</span></td></tr>`;
  }
  return h + `</tbody></table></div>`;
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
  <p class="laywrap">${layoutToggle()}</p>
  <p><button class="btn" id="startExam">Start the ${EXAM.minutes}-minute paper${
    nPaper < EXAM.questions ? ` (${nPaper} questions available)` : ''}</button></p>
  ${examHistory()}`;
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
  if(layoutOf() === 'all') return renderExamAll();
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
  <div class="qbody"><div class="stem">${stemHTML(q.stem)}</div>`;
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
  const right = EX.qs.filter((q, i) => examRight(q, EX.picks[i])).length;
  (DB.exams ||= []).push({at: Date.now(), exam: EXAM.id, right, total: EX.qs.length,
                          blank: EX.qs.filter((q, i) => examBlank(q, EX.picks[i])).length});
  if(DB.exams.length > 100) DB.exams.splice(0, DB.exams.length - 100);
  save();
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
      </div><div class="qbody"><div class="stem" style="font-size:15.5px">${stemHTML(q.stem)}</div>`;
    if(q.img && IMAGES[q.img]) h += `<img class="qimg" src="${IMAGES[q.img]}" alt="Figure for this question">`;
    if(kind === 'numeric'){
      h += `<p class="verdict ${ok?'ok':'bad'}">Keyed answer ${q.answer.toFixed(4)} ${esc(q.units)}${
        blankQ ? ' — left blank' : ` — you entered ${esc(String(p))}`}</p>`;
      /* the kind of slip is asked here as it is in the quiz, so a paper's
         misses count in the miss-kind table like any other */
      if(!ok && !blankQ){
        const last = DB.answers.slice().reverse().find(a => a.qid === q.id);
        if(last && !last.missKind)
          h += `<div class="misskind"><p><b>Which kind of miss was this?</b></p><div class="frow">${MISS_KINDS.map(m =>
            `<button data-mk="${m.id}" data-qi="${i}" title="${esc(m.hint)}">${esc(m.label)}</button>`).join('')}</div></div>`;
        else if(last && last.missKind)
          h += `<p class="sub" style="margin:0 0 8px">Logged as ${esc(an((MISS_LABEL[last.missKind]||'').toLowerCase()))} miss.</p>`;
      }
      h += stepsBlock(q);
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
    h += `<div class="cite">${q.quote ? `<span class="quote">“${esc(q.quote)}”</span>` : ''}${srcFlag(q)}${esc(q.cite)}</div>${explainHTML(q)}</div></div>`;
  });
  $('#v-exam').innerHTML = h;
  $('#exAgain').onclick = ()=>{ EX=null; renderExam(); };
  $('#v-exam').querySelectorAll('button[data-mk]').forEach(b => b.onclick = () => {
    const q = EX.qs[+b.dataset.qi];
    if(q && setMissKind(q, b.dataset.mk)) renderExamResult();
  });
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
  html = html.replace(/\{\{steps:([a-z0-9_]+)\}\}/gi, (_, key) => stepFigHTML(key));
  return html.replace(/\{\{fig:([a-z0-9_]+)\|([^}]*)\}\}/gi, (_, key, cap) => {
    if(!IMAGES[key]) return '';
    const c = esc(deEnt(cap));
    return `<figure class="reffig"><img src="${IMAGES[key]}" alt="${c}">` +
           `<figcaption>${c}</figcaption></figure>`;
  });
}

/* On a phone a reference table becomes one card per row: each cell carries
   its column heading as a label, which the CSS shows under 640px. */
function stackTables(root){
  root.querySelectorAll('table.reftab').forEach(t => {
    const heads = [...t.querySelectorAll('thead th')].map(th => th.textContent.trim());
    if(!heads.length) return;
    t.classList.add('stack');
    t.querySelectorAll('tbody tr').forEach(tr => [...tr.children].forEach((td, i) => {
      if(heads[i]) td.setAttribute('data-label', heads[i]); }));
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
  stackTables(el);
  el.querySelectorAll('.refnav a').forEach(a => a.onclick = e => {
    e.preventDefault();
    const t = el.querySelector(a.getAttribute('href'));
    const d = el.querySelector('.refnav-wrap'); if (d) d.open = false;
    if (t) scrollToEl(t);
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

  <h3 id="profile">Profile</h3>
  <div class="filters">
    <div class="frow"><input type="text" id="profIn" value="${esc(PROFILE)}" aria-label="Profile name" maxlength="40"
      style="font:inherit;font-size:15px;padding:7px 10px;border:1px solid var(--line);border-radius:7px;min-width:0;flex:1 1 160px;background:var(--paper);color:var(--text)">
      <button class="btn ghost" id="btnProf">Switch profile</button></div>
    <p style="font-size:13.5px;color:var(--text-dim);margin:4px 0 0">
      Progress is saved in this browser under the profile named here. Only needed if several people share one browser:
      type another name and switch, and each name keeps its own answers. Switch back to see your own again.
    </p>
  </div>

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
      Clears every answer and schedule for the profile “${esc(PROFILE)}”. Other profiles are untouched.
    </p>
  </div>

  ${changelogHTML()}

  <div class="note" style="margin-top:20px">
    <b>Sharing this with classmates.</b> Each person's history lives in their own browser on their own
    device, so nobody can see anyone else's. On a shared computer, use a different profile name
    above to keep progress apart. Private/incognito windows and “clear site data” erase progress.
  </div>`;

  $('#v-settings').querySelectorAll('.chip[data-m]').forEach(b=>b.onclick=()=>{
    DB.settings.mode = b.dataset.m; save(); renderSettings();
  });
  $('#v-settings').querySelectorAll('.chip[data-exam]').forEach(b=>b.onclick=()=>{
    chooseExam(+b.dataset.exam); renderSettings();
  });
  $('#btnProf').onclick = () => {
    const n = $('#profIn').value.trim() || 'default';
    if(n === PROFILE) return;
    if(EX && EX.running && !confirm('A paper is in progress and will be discarded. Switch profile anyway?')) return;
    setProfile(n);
    // a new name means a new history, so nothing from the last person's session carries over
    Q = null; if(EX){ clearInterval(EX.timer); EX = null; }
    renderSettings();
  };
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
const EQ_ENT = {'&minus;':'-', '&times;':'*', '&frac12;':'½', '&infin;':'∞', '&tau;':'τ',
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

function normEq(s, keepCaretGroups){
  let t = String(s == null ? '' : s);
  t = t.replace(EQ_SUP_RE, m => '^' + [...m].map(c => EQ_SUPS[c]).join(''));
  t = t.replace(EQ_SUB_RE, c => EQ_SUBS[c]);
  t = t.replace(/(\s|\))[x×](\s|\()/g, '$1*$2');            // "k x VD": a spaced x is a times sign
  t = t.replace(/½/g, '1/2').toLowerCase();
  t = t.replace(/[−–—‐‑]/g, '-');  // every dash is a minus
  t = t.replace(/÷/g, '/');
  t = t.replace(/\*\*/g, '^');                              // before the star is dropped
  t = t.replace(/[×·⋅*]/g, keepCaretGroups ? '*' : '');   // multiplication is implicit
  t = t.replace(/∞/g, 'inf').replace(/→/g, 'to');
  t = t.replace(/[‘’“”]/g, '');
  t = t.replace(/[\s_,]/g, '');                             // V_D and VD are one thing
  t = t.replace(/half-?life/g, 't1/2').replace(/thalf|t-half/g, 't1/2');
  t = t.replace(/clearance/g, 'cl');
  t = t.replace(/tau/g, 'τ');                                // the dosing interval, typed as a word
  t = t.replace(/[\[\{]/g, '(').replace(/[\]\}]/g, ')');
  /* the height term of ideal body weight, however it is written:
     (inches over 5 ft), (in over 60), (h - 60), (height in inches - 60) */
  t = t.replace(/\((?:inches|inch|in|h|ht|height|heightininches|heightinin)(?:over|above|>|-)(?:60|5ft|5feet|five(?:ft|feet))\)/g, '(hx)');
  t = t.replace(/(?:inches|inch|in|height|heightininches)(?:over|above)(?:60|5ft|5feet|five(?:ft|feet))/g, '(hx)');
  t = t.replace(/(^|[^0-9])\.(\d)/g, '$10.$2');             // .693 -> 0.693
  t = t.replace(/log10/g, 'log');
  if(!keepCaretGroups) for(let i = 0; i < 8; i++) t = t.replace(/\^\(([^()]*)\)/g, '^$1');
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
/* ---------- the same equation, spelled another way ----------
   A student who types VD*k for k*VD, or ln2/k for 0.693/k, or Cmax for
   Cmax,ss, has the equation. Spelling is compared first; where it differs,
   both right-hand sides are read as algebra and evaluated at the same random
   values of every symbol. Two expressions that agree at every point are the
   same expression. What still counts as different: which quantity is above
   the line, the sign of an exponent, and where a bracket closes, because
   those change the value. */
const EQ_FUNS = {ln: Math.log, log: Math.log10, exp: Math.exp, sqrt: Math.sqrt};
/* Every symbol the course's equations declare, in the normalised spelling, so
   a run of letters like kvd or fkad0 can be cut at the right places. */
const EQ_SYMS = (() => {
  const out = new Set(['e', 't', 'n', 'τ', 'hx', 'thalf', 'thalfa', 'thalfb', 'thalfbeta',
                       'age', 'ibw', 'scr', 'auc', 'aucpo', 'auciv', 'aucoral', 'auca', 'aucb',
                       'div', 'dpo', 'da', 'db', 'cn', 'tn', 'cl', 'clt', 'clr', 'clh',
                       'a', 'b', 'k', 'ka', 'ke', 'km', 'k0', 'k12', 'k21', 'vd', 'vp', 'vt',
                       'v', 'd0', 'dl', 'du', 'd', 'c0', 'cp', 'cp0', 'cs', 'c', 'css', 'cpeak',
                       'cmax', 'cmin', 'cavg', 'cav', 'tmax', 'f', 'fe', 'frel', 'r', 'kel']);
  const add = x => { const n = normEq(eqPlain(x), true).replace(/t1\/2/g, 'thalf').replace(/(ss|inf)$/, '');
                     if(/^[a-zτ][a-z0-9τ]*$/.test(n) && !/^(ln|log|exp)/.test(n)) out.add(n); };
  for(const e of (typeof EQUATIONS === 'undefined' ? [] : EQUATIONS)){
    add(e.lhs);
    for(const s of (e.symbols || [])) String(s[0]).split(/,|\band\b/).forEach(add);
  }
  return out;
})();
const EQ_SYM_LIST = [...EQ_SYMS].sort((a, b) => b.length - a.length);

/* Tokens: numbers, symbols (a letter run cut at known symbols, longest
   first), functions, operators and brackets. Adjacent atoms multiply, and
   that written-together product binds tighter than a division sign: a/bc is
   a/(bc), the way a one-line fraction is meant, while a/b*c with an explicit
   sign is (a/b)c. */
function eqTokens(src){
  const s = normEq(src, true).replace(/t1\/2/g, 'thalf');
  const out = [];
  let i = 0;
  while(i < s.length){
    const ch = s[i];
    if(/[0-9.]/.test(ch)){
      const m = s.slice(i).match(/^\d*\.?\d+|^\d+\.?/);
      if(!m) return null;
      out.push({t: 'num', v: parseFloat(m[0])}); i += m[0].length; continue;
    }
    if(/[a-zτ]/.test(ch)){
      const run = s.slice(i).match(/^[a-zτ][a-z0-9τ]*/)[0];
      let j = 0;
      while(j < run.length){
        const rest = run.slice(j);
        const dm = rest.match(/^\d+\.?\d*/);
        if(dm){ out.push({t: 'num', v: parseFloat(dm[0])}); j += dm[0].length; continue; }   // ln2, e2
        const fn = Object.keys(EQ_FUNS).find(f => rest.startsWith(f) && rest.length > f.length);
        const fnAtEnd = Object.keys(EQ_FUNS).find(f => rest === f) && s[i + run.length] === '(';
        if(fn || fnAtEnd){ const f = fn || rest; out.push({t: 'fn', v: f}); j += f.length; continue; }
        const sym = EQ_SYM_LIST.find(y => rest.startsWith(y));
        if(sym){ out.push({t: 'sym', v: sym === 'clt' ? 'cl' : sym}); j += sym.length; continue; }   // Cl and ClT are one quantity
        out.push({t: 'sym', v: rest[0]}); j += 1;               // an unknown letter is its own symbol
      }
      i += run.length; continue;
    }
    if('+-*/^()'.includes(ch)){ out.push({t: ch}); i++; continue; }
    return null;                                                 // a character algebra cannot read
  }
  return out;
}

/* A recursive-descent evaluator. `env` maps each symbol to a number.
   Levels, loosest first: sums; division and an explicit times sign, left to
   right; a written-together product; a power; an atom. An exponent written
   without brackets, as in e^-kt, runs to the end of the written-together
   product, which is how the slides and the string comparison both read it. */
function eqEval(tokens, env, loose){
  let p = 0;
  const peek = () => tokens[p], next = () => tokens[p++];
  const startsAtom = k => k && (k.t === 'num' || k.t === 'sym' || k.t === 'fn' || k.t === '(');
  function atom(){
    const k = peek();
    if(!k) throw 0;
    if(k.t === 'num'){ next(); return k.v; }
    if(k.t === 'sym'){ next(); return k.v === 'e' ? Math.E : env(k.v); }
    if(k.t === 'fn'){ next(); return EQ_FUNS[k.v](peek() && peek().t === '(' ? atom() : power()); }
    if(k.t === '('){ next(); const v = expr(); if(!peek() || peek().t !== ')') throw 0; next(); return v; }
    if(k.t === '-'){ next(); return -power(); }
    if(k.t === '+'){ next(); return power(); }
    throw 0;
  }
  function exponent(){
    let sign = 1;
    while(peek() && (peek().t === '-' || peek().t === '+')){ if(next().t === '-') sign = -sign; }
    if(peek() && peek().t === '(') return sign * atom();
    let v = atom();
    while(peek() && (peek().t === 'num' || peek().t === 'sym' || peek().t === 'fn')) v *= atom();
    return sign * v;
  }
  function power(){
    const base = atom();
    if(peek() && peek().t === '^'){ next(); return Math.pow(base, exponent()); }
    return base;
  }
  function juxta(){
    let v = power();
    while(!loose && startsAtom(peek())) v *= power();
    return v;
  }
  function term(){
    let v = juxta();
    for(;;){
      const k = peek();
      if(k && k.t === '/'){ next(); v /= juxta(); continue; }
      if(k && k.t === '*'){ next(); v *= juxta(); continue; }
      if(loose && startsAtom(k)){ v *= juxta(); continue; }
      return v;
    }
  }
  function expr(){
    let v = term();
    for(;;){
      const k = peek();
      if(k && k.t === '+'){ next(); v += term(); continue; }
      if(k && k.t === '-'){ next(); v -= term(); continue; }
      return v;
    }
  }
  const v = expr();
  if(p !== tokens.length) throw 0;
  return v;
}

/* Does a typed right-hand side agree with the keyed one at every point?
   Symbols take the same random values in both, drawn from a fixed sequence so
   the answer never changes between runs. Half a per cent of tolerance keeps
   0.693 and ln 2 together. The keyed form is read as written; the typed one
   is read both ways a one-line fraction can be meant, because "/(72)(SCr)"
   puts the second bracket under the line and "/(VD(ka - k))(e^-kt - e^-kat)"
   does not, and nothing in the string says which. */
function eqEquiv(key, typed){
  const tk = eqTokens(key), tt = eqTokens(typed);
  if(!tk || !tt || !tk.length || !tt.length) return false;
  let seed = 7;
  const rnd = () => { seed = (seed * 48271) % 2147483647; return 0.3 + 1.4 * (seed / 2147483647); };
  const same = (x, y) => Math.abs(x - y) <= 0.005 * Math.max(Math.abs(x), Math.abs(y), 1e-9);
  let tight = true, loose = true, good = 0;
  for(let trial = 0; trial < 7 && (tight || loose); trial++){
    const vals = {};
    const env = name => (name in vals ? vals[name] : (vals[name] = rnd()));
    let vk, v1, v2;
    try{ vk = eqEval(tk, env); }catch(_){ return false; }
    try{ v1 = eqEval(tt, env); }catch(_){ v1 = NaN; }
    try{ v2 = eqEval(tt, env, true); }catch(_){ v2 = NaN; }
    if(!isFinite(vk)) continue;
    if(!isFinite(v1) || !same(vk, v1)) tight = false;
    if(!isFinite(v2) || !same(vk, v2)) loose = false;
    good++;
  }
  return good >= 3 && (tight || loose);
}
/* The left side is the quantity the exercise names, so it is read loosely:
   Cmax for Cmax,ss, C for Cp, IBW for IBWmale, ClT for Cl. */
function eqLhsKey(x){
  return normEq(x, true).replace(/(ss|inf|male|female)$/, '').replace(/^cp$/, 'c');
}
const eqLhsMatch = (a, b) => { const x = eqLhsKey(a), y = eqLhsKey(b); return !x || !y || x === y || x.startsWith(y) || y.startsWith(x); };
function eqSplit(form){
  const n = String(form == null ? '' : form);
  const i = n.indexOf('=');
  return i < 0 ? ['', n] : [n.slice(0, i), n.slice(i + 1)];
}
function eqSame(e, typed){
  const [lt, rt] = eqSplit(typed);
  if(!rt.trim()) return false;
  const forms = [e.typed, ...(e.also || []), eqPlain(e.lhs) + '=' + eqPlain(e.tokens.join(' '))];
  for(const form of forms){
    const [lk, rk] = eqSplit(form);
    if(!eqLhsMatch(lk, lt)) continue;
    if(eqEquiv(rk, rt)) return true;
  }
  return false;
}
/* A spelling match that the algebra contradicts is not a match: R/k*VD folds
   to the same string as R/kVD once the star is dropped, but reads as (R/k)VD. */
function eqRefuted(e, typed){
  const rt = eqSplit(typed)[1];
  const forms = [e.typed, ...(e.also || [])];
  if(!eqTokens(rt) || !eqTokens(eqSplit(e.typed)[1])) return false;
  return !forms.some(f => eqEquiv(eqSplit(f)[1], rt));
}
function eqCorrect(e, typed){
  if(eqAccepts(e).has(normEq(typed))) return !eqRefuted(e, typed);
  if(eqSame(e, typed)) return true;
  /* a capital T on its own is the dosing interval, typed without a Greek keyboard */
  const asTau = String(typed == null ? '' : typed).replace(/T(?![A-Za-z0-9½\/])/g, 'τ');
  return asTau !== typed && (eqAccepts(e).has(normEq(asTau)) || eqSame(e, asTau));
}

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
  absent:  ['not on the sheet', 'No line of the equation sheet prints it; she never said either way'],
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
    h += `<details class="module" id="eq-m${m}" open><summary>
      <span class="mname">${esc(modName(m))}<small>${es.length} equations ·
        ${es.filter(e => chosen.has(e.id)).length} selected</small></span>
      <button class="chip" data-modpick="${m}">Select all</button></summary><div class="mfoot">`;
    for(const e of es){
      const st = eqStat(e.id), done = eqLearned(e.id);
      const tag = SHEET_TAG[e.sheet] || SHEET_TAG.absent;
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
      : 'Write it out. Capitals, spaces, the order of the factors and how you write the multiplication do not matter.'}</p>`;

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
        <code>${esc(normEq(EQ.typed))}</code> once capitals and spacing are set aside. Spelling and
        order do not matter; what is above the line, the sign in an exponent and where a bracket
        closes do.</p>`;
    if(EQ.ok && !building && EQ.typed.trim() && !eqAccepts(e).has(normEq(EQ.typed))
       && !eqAccepts(e).has(normEq(eqPlain(e.lhs) + '=' + EQ.typed)))
      h += `<p class="prose">You wrote <code>${esc(EQ.typed.trim())}</code>: a different spelling of the
        same equation.</p>`;
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
document.querySelectorAll('#nav button').forEach(b => b.onclick = () => {
  if(b.dataset.v === 'topics' && VIEW === 'topics') MODPAGE = null;   // a second tap on Topics returns to the module list
  RET = []; backBtn();
  if(b.dataset.v !== 'terms'){ if(TIO){ TIO.disconnect(); TIO = null; } const tb = document.getElementById('tback'); if(tb) tb.remove(); }
  show(b.dataset.v);
});
document.addEventListener('click', stepClick);   // step-through figure controls, wherever a figure is drawn
document.addEventListener('click', zoomClick);   // tap any figure to enlarge it
document.addEventListener('click', layoutClick); // the One at a time / All on one page chips
document.addEventListener('click', jumpClick);
document.addEventListener('click', xpickClick);   // Tell apart: Why? chips
document.addEventListener('change', xselChange);  // Tell apart: Explain one   // Explain more: open the teaching section, keep the way back
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeZoom(); });
/* Theme: System (no attribute), Light or Dark, kept per browser. */
const THEME_KEY = NS + ':theme';
function applyTheme(t){
  if(t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  else document.documentElement.removeAttribute('data-theme');
}
{
  const ts = document.getElementById('themeSel'), saved = LS.get(THEME_KEY) || 'system';
  applyTheme(saved);
  if(ts){ ts.value = saved; ts.onchange = () => { LS.set(THEME_KEY, ts.value); applyTheme(ts.value); }; }
}
askProfile();
show('topics');
