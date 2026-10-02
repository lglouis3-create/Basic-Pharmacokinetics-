"""Helpers that write question entries as JavaScript object literals."""
import json, math

QS, CHAINS, PROBLEMS = [], [], []

def js(v):
    return json.dumps(v, ensure_ascii=False)

def tol_for(ans, recomputed):
    t = max(abs(ans) * 0.01, abs(ans - recomputed) * 1.2, 1e-9)
    # two significant figures
    p = -int(math.floor(math.log10(t))) + 1
    t = round(t, p)
    return t if t > 0 else 10 ** (-p)

def check(id_, ans, recomputed, tol):
    if abs(ans - recomputed) > tol:
        PROBLEMS.append(f'{id_}: keyed {ans} vs recomputed {recomputed:.5g} outside tol {tol}')

def num(id, *, stem, units, ans, calc, steps, teach, concept, skill, topic, sub, module, lecture, cite,
        note=None, exam=2, source='slide', audit=None, **more):
    tol = tol_for(ans, calc)
    check(id, ans, calc, tol)
    q = dict(id=id, type='numeric', prof='Mosley', tier='new', exam=exam, module=module, lecture=lecture,
             topic=topic, sub=sub, concept=concept, skill=skill, source=source, stem=stem, units=units,
             answer=ans, tol=tol, steps=[dict(k=k, t=t, why=w) for k, t, w in steps], teach=teach, cite=cite)
    if note: q['note'] = note
    if audit: q['audit'] = audit
    q.update(more)
    QS.append(q)
    return id

def mc(id, *, stem, options, teach, concept, skill, topic, sub, module, lecture, cite, note=None, exam=2, source='slide', **more):
    assert sum(1 for o in options if o[1]) == 1, id
    q = dict(id=id, prof='Mosley', tier='new', exam=exam, module=module, lecture=lecture, topic=topic, sub=sub,
             concept=concept, skill=skill, source=source, stem=stem,
             options=[dict(t=t, correct=True, why=w) if c else dict(t=t, why=w) for t, c, w in options],
             teach=teach, cite=cite)
    if note: q['note'] = note
    q.update(more)
    QS.append(q)
    return id

def chain(id, *, src, module, name, setup, parts):
    CHAINS.append(dict(id=id, src=src, module=module, name=name, setup=setup, parts=parts))


# Inline a/b in the explanation fields becomes {{frac:a|b}}, which the drill
# draws as a stacked fraction. Stems and option texts are left as written.
import re
_UNIT = re.compile(r'^(mg|mcg|µg|g|L|dL|mL|hr|h|min|kg|mol|mmol|day|days|m2|m²|cm|in|year|yr|wk|week|s|sec)[²³]?$')
_ATOM = r'(?:0\.693|ln ?2|ln\([^()]*\)|log\([^()]*\)|[A-Za-zτβαΔ][A-Za-z0-9₀-₉∞½τ]*(?:\^?[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)?|\d+(?:\.\d+)?)'
_GROUP = r'\((?:[^()]|\([^()]*\)){1,60}\)'
_TERM = f'(?:{_ATOM}|{_GROUP})'
_DIV = re.compile(rf'(?<![\w./^])({_TERM})\s*/\s*({_TERM})(?![\w(])')

def _strip(x):
    return x[1:-1] if re.fullmatch(r'\((?:[^()]|\([^()]*\))*\)', x) else x

def fracify(s):
    if not isinstance(s, str) or '/' not in s:
        return s
    masks = []
    def mask(m):
        masks.append(m.group(0)); return f'\x00{len(masks) - 1}\x00'
    t = re.sub(r'\{\{frac:[^}]*\}\}', mask, s)
    t = re.sub(r'\^\((?:[^()]|\([^()]*\))*\)', mask, t)
    t = re.sub(r'"[^"]*"|“[^”]*”', mask, t)
    def rep(m):
        a, b = m.group(1).strip(), m.group(2).strip()
        if _UNIT.match(a) or _UNIT.match(b) or _UNIT.match(a.split()[-1]):
            return m.group(0)
        if a == 't1' and b == '2':
            return m.group(0)
        if a.isdigit() and b.isdigit():
            return m.group(0)
        if re.search(r'[|}]', a + b):
            return m.group(0)
        if any(masks[int(i)].startswith('{{') for i in re.findall(r'\x00(\d+)\x00', a + b)):
            return m.group(0)
        top, bot = _strip(a).replace('/', ' ÷ '), _strip(b).replace('/', ' ÷ ')
        return '{{frac:%s|%s}}' % (top, bot)
    t = _DIV.sub(rep, t)
    for _ in range(2):
        t = re.sub(r'\x00(\d+)\x00', lambda m: masks[int(m.group(1))], t)
    return t

def _teach(v):
    if isinstance(v, str):
        return fracify(v)
    if isinstance(v, list):
        return [_teach(x) for x in v]
    if isinstance(v, dict):
        return {k: (_teach(x) if k in ('t', 'list', 'after') else x) for k, x in v.items()}
    return v

def _render(q):
    q = dict(q)
    if 'steps' in q:
        q['steps'] = [dict(st, t=fracify(st['t']), why=fracify(st.get('why'))) for st in q['steps']]
    if 'options' in q:
        q['options'] = [dict(o, why=fracify(o['why'])) if 'why' in o else o for o in q['options']]
    for k in ('note',):
        if k in q: q[k] = fracify(q[k])
    if 'teach' in q:
        q['teach'] = _teach(q['teach'])
    return q

def write(path, arr_name, header):
    out = [header, f'const {arr_name} = [']
    for q in QS:
        out.append(js(_render(q)) + ',')
    out.append('];\n')
    out.append('/* Her worksheets as problem sets, appended to the course list of sets. */')
    out.append('CHAINS.push(')
    out.append(',\n'.join(js(c) for c in CHAINS))
    out.append(');\n')
    open(path, 'w', encoding='utf-8').write('\n'.join(out))
    if PROBLEMS:
        print('ARITHMETIC PROBLEMS:'); [print('  ', p) for p in PROBLEMS]
    print(f'{len(QS)} questions, {len(CHAINS)} sets -> {path}')


def write_plain(path, arr_name, header):
    out = [header, f'const {arr_name} = [']
    for q in QS:
        out.append(js(_render(q)) + ',')
    out.append('];\n')
    open(path, 'w', encoding='utf-8').write('\n'.join(out))
    if PROBLEMS:
        print('ARITHMETIC PROBLEMS:'); [print('  ', p) for p in PROBLEMS]
    print(f'{len(QS)} questions -> {path}')
