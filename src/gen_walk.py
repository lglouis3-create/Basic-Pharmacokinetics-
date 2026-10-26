"""Guide walkthroughs: walk/<section id>.json (narrated scripts, part by part) and walk/decks.json (deck names
and slide counts) -> guide_walk.js. Slide images live in ../slides/<deck>-NN.jpg beside the built page.

A part is {"text", "slide": "deck:page" | null, "card": [{"at": sentence index, "m": markup}]}. The checks here
are the ones a recording depends on: the text is speech-safe, the slide exists and is one of her slides (not a
page of the student's own notes), and every card line appears during a sentence the part has."""
import html, json, os, glob, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
WALK = os.path.join(HERE, 'walk')
# pages of the student's own notes in the annotated decks (grid paper, photographed worksheets, blank pages):
# kept in the deck so page numbers match her slide numbers, never the slide a part discusses
NOTE_PAGES = set('''intro:12 intro:18 intro:25 intro:30 ivb:27 ivb:28 ivb:29 ivb:30 ivb:31 inf:20 cl:13 oral:14
  oral:16 oral:24 rep:10 rep:27 mo:9 pd:8 pd:13 nonlin:16 nonlin:20 nonlin:21 nonlin:22
  ba:8 ba:11 ba:17 ba:18 ba:19'''.split())
SENTS = re.compile(r'(?<=[.?!])\s+')
BAD = re.compile(r'[()\[\]/\\%=<>+*^≥≤→±μ"“”&#{}|]')
# a symbol is spoken as its letters ("C p"); the transcript on screen shows the symbol, and the first time it
# comes in a part, what it stands for in brackets. The brackets are not read, so they cost nothing to record.
GLOSS = [('A U C', 'AUC', 'area under the curve'), ('C s s', 'C<sub>ss</sub>', 'steady-state concentration'),
         ('C max', 'C<sub>max</sub>', 'peak concentration'), ('t max', 't<sub>max</sub>', 'time of the peak'),
         ('V max', 'V<sub>max</sub>', 'maximum elimination rate'), ('K M', 'K<sub>M</sub>', 'Michaelis constant'),
         ('C p', 'C<sub>p</sub>', 'plasma concentration'), ('C zero', 'C<sub>0</sub>', 'concentration at time zero'),
         ('D zero', 'D<sub>0</sub>', 'dose'), ('V D', 'V<sub>D</sub>', 'volume of distribution'),
         ('Cl T', 'Cl<sub>T</sub>', 'total body clearance'), ('Cl R', 'Cl<sub>R</sub>', 'renal clearance'),
         ('k a', 'k<sub>a</sub>', 'absorption rate constant'), ('f e', 'f<sub>e</sub>', 'fraction excreted unchanged'),
         ('C r C l', 'CrCl', 'creatinine clearance'), ('G F R', 'GFR', 'glomerular filtration rate'),
         ('I B W', 'IBW', 'ideal body weight'), ('I V', 'IV', 'intravenous')]
GLOSS_RE = re.compile(r'(?<![A-Za-z])(' + '|'.join(re.escape(g[0]) for g in GLOSS) + r')(?![A-Za-z])')


def display(t):
    """The transcript line shown on screen: symbols for the spoken letters, glossed at their first use in the part
    unless that sentence already says what the symbol stands for."""
    seen, sym, out = set(), {g[0]: g[1:] for g in GLOSS}, []
    for sent in SENTS.split(t):
        def sub(m):
            d, name = sym[m.group(1)]
            if m.group(1) in seen: return d
            seen.add(m.group(1))
            return d if name.lower() in sent.lower() else f'{d} <small class="gwgl">({name})</small>'
        out.append(GLOSS_RE.sub(sub, html.escape(sent, quote=False)))
    return ' '.join(out)


def main():
    decks = json.load(open(os.path.join(WALK, 'decks.json')))
    stepfigs = json.load(open(os.path.join(HERE, 'steps.json')))
    guide = open(os.path.join(HERE, 'guide.js'), encoding='utf-8').read()
    order = re.findall(r'<section class="gobj" id="(gobj-[^"]+)">', guide)
    errs, walk = [], {}
    files = {os.path.basename(f)[:-5]: f for f in glob.glob(os.path.join(WALK, 'gobj-*.json'))}
    for sid in [s for s in order if s in files] + sorted(set(files) - set(order)):
        if sid not in order:
            errs.append(f'{sid}: no guide section with this id'); continue
        w = json.load(open(files[sid], encoding='utf-8'))
        if w.get('id') != sid: errs.append(f'{sid}: id field is {w.get("id")!r}')
        segs = []
        for n, s in enumerate(w['segs']):
            t = re.sub(r'\s+', ' ', s['text']).strip(); where = f'{sid} part {n}'
            nw = len(t.split())
            if not 40 <= nw <= 130: errs.append(f'{where}: {nw} words (40 to 130)')
            if BAD.search(t): errs.append(f'{where}: symbol {BAD.search(t).group()!r} in spoken text')
            if re.search(r'\d', t): errs.append(f'{where}: a digit in spoken text (numbers are written in words)')
            sl = s.get('slide') or None
            if sl:
                d, _, p = sl.partition(':')
                if d not in decks or not p.isdigit() or not 1 <= int(p) <= decks[d]['n']: errs.append(f'{where}: no slide {sl}')
                elif sl in NOTE_PAGES: errs.append(f'{where}: {sl} is a page of the student\'s notes')
                elif not os.path.exists(os.path.join(HERE, '..', 'slides', '%s-%02d.jpg' % (d, int(p)))): errs.append(f'{where}: missing image for {sl}')
            ns, last, card = len(SENTS.split(t)), -1, []
            for c in s.get('card') or []:
                at, m = c['at'], c['m']
                if not isinstance(at, int) or not 0 <= at < ns: errs.append(f'{where}: card at {at} outside 0..{ns - 1}')
                elif at < last: errs.append(f'{where}: card at {at} after {last}')
                last = at if isinstance(at, int) else last
                if m.count('{{') != m.count('}}') or re.search(r'\{\{frac:[^}]*\{\{', m): errs.append(f'{where}: card markup {m!r}')
                card.append([at, m])
            seg = {'t': t, 's': sl}
            d = display(t)
            if d != t:
                if len(SENTS.split(d)) != ns: errs.append(f'{where}: the shown transcript splits into a different number of sentences')
                seg['d'] = d
            if card: seg['c'] = card
            fg = s.get('fig')
            if fg:
                # a step figure built as the part is read: [[sentence index, step number from 1], ...]
                key, at = fg.get('key'), fg.get('at') or []
                if key not in stepfigs: errs.append(f'{where}: no step figure {key!r} in steps.json')
                else:
                    nst, prev = len(stepfigs[key]['steps']), (-1, 0)
                    for a, st in at:
                        if not (0 <= a < ns and 1 <= st <= nst) or (a, st) < prev: errs.append(f'{where}: figure step {[a, st]} out of range or order')
                        prev = (a, st)
                    if not at: errs.append(f'{where}: figure {key} has no steps')
                seg['f'] = {'k': key, 'at': at}
            segs.append(seg)
        if not 3 <= len(segs) <= 10: errs.append(f'{sid}: {len(segs)} parts (3 to 10)')
        words = sum(len(x['t'].split()) for x in segs)
        walk[sid] = {'title': w['title'], 'segs': segs, 'mins': max(1, round(words / 150))}
    if errs:
        sys.exit('gen_walk.py:\n  ' + '\n  '.join(errs))
    out = os.path.join(HERE, 'guide_walk.js')
    with open(out, 'w', encoding='utf-8') as fh:
        fh.write('// generated by gen_walk.py from walk/*.json\nconst GW_DECKS = ' + json.dumps(decks) +
                 ';\nconst GUIDE_WALK = ' + json.dumps(walk, ensure_ascii=False) + ';\n')
    print(f'guide_walk.js: {len(walk)} walkthroughs, {sum(len(w["segs"]) for w in walk.values())} parts, '
          f'{sum(len(s["t"].split()) for w in walk.values() for s in w["segs"])} words')


if __name__ == '__main__':
    main()
