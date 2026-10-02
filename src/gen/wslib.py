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

def write(path, arr_name, header):
    out = [header, f'const {arr_name} = [']
    for q in QS:
        out.append(js(q) + ',')
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
        out.append(js(q) + ',')
    out.append('];\n')
    open(path, 'w', encoding='utf-8').write('\n'.join(out))
    if PROBLEMS:
        print('ARITHMETIC PROBLEMS:'); [print('  ', p) for p in PROBLEMS]
    print(f'{len(QS)} questions -> {path}')
