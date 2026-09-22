#!/usr/bin/env python3
"""Assemble the single-file quiz app from shell + course + data + views.

Every JavaScript source is syntax-checked before anything is assembled, and the
assembled script is checked again before the output file is replaced. A source
with a stray comma or bracket therefore stops the build with the offending file
and line named, instead of producing an HTML file that loads to a blank screen.

The output filename is not written here: it is read out of course.js, which is
the only file that knows which course this is.
"""
import json, re, io, os, subprocess, sys, tempfile

# The data files, in the order they are concatenated into the page.
#
#   course.js is ALWAYS FIRST. Everything downstream — the shell, the views,
#   every check — reads the course's name, namespace, pools and skills off the
#   COURSE object it declares.
#
#   q1_module1.js declares TOPICS for the whole course, so it precedes the
#   other banks. Each bank declares its own Q_MODULE<N> array; qz_all.js is
#   LAST and joins them into the single QUESTIONS array the engine reads.
#
#   q1_sample.js is deliberately absent: it is the placeholder fixture kept for
#   exercising the engine's three question types, not part of the real bank.
DATA_FILES = ['course.js',
              'q1_module1.js',   # declares TOPICS + Q_MODULE1
              'q2_module2.js',
              'q3_module3.js',
              'q4_module4.js',
              'q5_module5.js',
              'q6_figures.js',   # figure-reading questions, every module
              'qz_all.js']       # must stay last: builds QUESTIONS

# Everything that has to parse before a build is allowed to proceed. Derived
# from DATA_FILES rather than listed again, so adding a question file cannot
# leave it syntax-checked in one place and unchecked in the other.
SOURCES = DATA_FILES + ['reference.js', 'tell.js', 'guide.js', 'views.js']

HERE = os.path.dirname(os.path.abspath(__file__))


def course_output(path=None):
    """The built filename, parsed out of course.js.

    Shared by every check in this directory, so the output path is written down
    exactly once, in the manifest.
    """
    src = open(path or os.path.join(HERE, 'course.js'), encoding='utf-8').read()
    m = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", src)
    if not m:
        sys.exit("ERROR: course.js declares no output: '<filename>'")
    return '/mnt/user-data/outputs/' + m.group(1)


def node_check(path, label):
    """Run node --check and stop the build on a syntax error."""
    r = subprocess.run(['node', '--check', path], capture_output=True, text=True)
    if r.returncode != 0:
        msg = (r.stderr or r.stdout).strip()
        sys.exit(f'ERROR: {label} has a JavaScript syntax error\n{msg}')


def main():
    os.chdir(HERE)

    print('checking sources...')
    for f in SOURCES:
        node_check(f, f)
    print(f'  {len(SOURCES)} sources parse cleanly')

    shell = open('shell.html', encoding='utf-8').read()
    images = json.load(open('images.json'))

    parts = []
    parts.append('const IMAGES = ' + json.dumps(images) + ';\n')
    for f in DATA_FILES:
        parts.append(open(f, encoding='utf-8').read() + '\n')
    parts.append(open('reference.js', encoding='utf-8').read() + '\n')
    parts.append(open('tell.js', encoding='utf-8').read() + '\n')
    parts.append(open('guide.js', encoding='utf-8').read() + '\n')
    DATA = ''.join(parts)

    # replace the three placeholder declarations in the shell with the real data
    old = """const IMAGES = /*__IMAGES__*/{};
const QUESTIONS = /*__QUESTIONS__*/[];
const TOPICS = /*__TOPICS__*/[];"""
    if old not in shell:
        sys.exit('ERROR: data placeholder block not found in shell.html')
    shell = shell.replace(old, DATA)

    # append the views/runtime just before the closing script tag
    views = open('views.js', encoding='utf-8').read()
    marker = '</script>\n</body>'
    if marker not in shell:
        sys.exit('ERROR: closing script marker not found')
    shell = shell.replace(marker, '\n' + views + '\n</script>\n</body>')

    # check the assembled script as one unit, so an assembly-level fault is caught too
    scripts = re.findall(r'<script>([\s\S]*?)</script>', shell)
    if len(scripts) != 1:
        sys.exit(f'ERROR: expected exactly 1 script block in the output, got {len(scripts)}')
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as t:
        t.write(scripts[0])
        tmp_js = t.name
    try:
        node_check(tmp_js, 'the assembled app script')
    finally:
        os.unlink(tmp_js)
    print('  assembled script parses cleanly')

    # write to a temporary file first, so a failed build never leaves a half-written
    # or truncated HTML in place of the last good one
    out = course_output()
    os.makedirs(os.path.dirname(out), exist_ok=True)
    tmp_out = out + '.tmp'
    with open(tmp_out, 'w', encoding='utf-8') as fh:
        fh.write(shell)
    os.replace(tmp_out, out)
    print(f'wrote {out}  ({len(shell)/1024/1024:.2f} MB)')


if __name__ == '__main__':
    main()
