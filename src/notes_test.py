#!/usr/bin/env python3
"""Notes on questions and flags on a paper, in Chromium at phone (390 px) and desktop (1200 px) widths.

A note written on a drill question is saved as it is typed and comes back after a reload. On a paper, a question is
flagged in each layout, the flag shows in the Go to list and survives a reload, Submit counts the flagged questions,
and the results mark them. A note written on a running paper leaves the key out of the export until the paper is
submitted, then the export carries the key. Weak spots lists the notes, Copy for AI copies them and Download saves a
Markdown file. Any page or console error fails the run.

    python3 notes_test.py
"""
import functools, http.server, os, re, sys, threading
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
NAME = re.search(r"""\boutput\s*:\s*['"]([^'"]+)['"]""", open(os.path.join(HERE, 'course.js')).read()).group(1)
fails = []


def check(ok, label, detail=''):
    print(('  ok   ' if ok else '  FAIL ') + label + ('' if ok else f'  ({detail})'))
    if not ok: fails.append(label)


def run(page, width):
    print(f'\n=== notes and flags at {width} px ===')
    # a note on a drill question
    page.evaluate("startPool(QUESTIONS.filter(q => q.id === 'cq5-5'), 'note test')"); page.wait_for_timeout(200)
    page.click('#v-quiz [data-noteq="cq5-5"]'); page.fill('#v-quiz textarea[data-notetext="cq5-5"]', 'Why is Vmax not compared with Cp?')
    page.wait_for_timeout(400)
    check(page.evaluate("DB.notes['cq5-5'] && DB.notes['cq5-5'].t") == 'Why is Vmax not compared with Cp?', 'a note on a drill question is saved as it is typed')
    check(page.evaluate("document.querySelector('#v-quiz [data-noteq=\"cq5-5\"]').textContent") == '✎ My note', 'the button then reads My note')
    page.reload(); page.wait_for_timeout(1200)
    check(page.evaluate("DB.notes && DB.notes['cq5-5'] && DB.notes['cq5-5'].t") == 'Why is Vmax not compared with Cp?', 'the note is still there after a reload')
    # flags on a paper, one at a time
    page.evaluate("Q = null; chooseExam(3); DB.settings.layout = 'one'; show('exam')"); page.wait_for_timeout(200)
    page.click('#startLikely'); page.wait_for_timeout(300)
    page.click('#v-exam [data-exflag="0"]'); page.wait_for_timeout(100)
    page.evaluate("EX.i = 2; renderExamQ()"); page.click('#v-exam [data-exflag="2"]'); page.wait_for_timeout(100)
    opts = page.evaluate("[...document.querySelectorAll('#exJump option')].slice(0, 3).map(o => o.textContent)")
    check(opts[0].startswith('⚑') and not opts[1].startswith('⚑') and opts[2].startswith('⚑'), 'flagged questions show ⚑ in the Go to list', str(opts))
    qid = page.evaluate("EX.qs[2].id")
    page.click(f'#v-exam [data-noteq="{qid}"]'); page.fill(f'#v-exam textarea[data-notetext="{qid}"]', 'Not sure which line to use here.'); page.wait_for_timeout(300)
    md = page.evaluate("notesMarkdown()")
    check('left out until the paper is submitted' in md, 'a note on a running paper leaves its key out of the export')
    page.evaluate("window.onbeforeunload = null"); page.reload(); page.wait_for_timeout(1200)
    check(page.evaluate("EX && EX.running && EX.flags[0] && !EX.flags[1] && EX.flags[2]"), 'flags survive a reload with the paper')
    # the one-page layout carries the flag too
    page.evaluate("DB.settings.layout = 'all'; renderExamQ()"); page.wait_for_timeout(200)
    page.click('#v-exam [data-exflag="5"]'); page.wait_for_timeout(100)
    check(page.evaluate("EX.flags[5]"), 'a question flags on the one-page layout')
    msg = page.evaluate("(() => { let m = ''; const c = window.confirm; window.confirm = t => { m = t; return true; }; examConfirmSubmit(); window.confirm = c; return m; })()")
    check('3 are flagged' in msg, 'Submit says how many are flagged', msg)
    page.evaluate("finishExam(); renderExam()"); page.wait_for_timeout(300)
    r = page.evaluate("[document.querySelectorAll('#v-exam .tag').length && [...document.querySelectorAll('#v-exam .tag')].filter(t => t.textContent === '⚑ flagged').length, document.querySelector('#v-exam').innerText.includes('You flagged Q1, Q3, Q6')]")
    check(r[0] == 3 and r[1], 'the results mark the 3 flagged questions and list them', str(r))
    md = page.evaluate("notesMarkdown()")
    check('left out until' not in md and md.count('**Her key:**') == 2 and 'Not sure which line' in md and 'Why is Vmax' in md, 'after Submit the export carries both notes with their keys')
    # Weak spots: the list, Copy and Download
    page.evaluate("DB.settings.layout = 'one'; show('gaps')"); page.wait_for_timeout(200)
    check(page.evaluate("document.querySelector('#v-gaps').innerText.includes('My questions (2)')"), 'Weak spots lists the 2 notes')
    page.click('#notesCopy'); page.wait_for_timeout(300)
    check(page.evaluate("document.querySelector('#notesCopy').textContent") == 'Copied ✓', 'Copy for AI copies them')
    with page.expect_download() as d:
        page.click('#notesDown')
    check(d.value.suggested_filename == 'PHAR4221-my-questions.md', 'Download saves a Markdown file', d.value.suggested_filename)
    page.click('#notesDrill'); page.wait_for_timeout(200)
    check(page.evaluate("VIEW === 'quiz' && Q.pool.length === 2"), 'Drill these drills the noted questions')


def main():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
        def do_GET(self):   # the browser asks for /favicon.ico on its own; the page declares no icon
            if self.path == '/favicon.ico': self.send_response(204); self.end_headers(); return
            super().do_GET()
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{srv.server_address[1]}/{NAME}'
    with sync_playwright() as p:
        exe = '/opt/pw-browsers/chromium'
        browser = p.chromium.launch(**({'executable_path': exe} if os.path.exists(exe) and not os.path.isdir(exe) else {}))
        for width in (390, 1200):
            ctx = browser.new_context(viewport={'width': width, 'height': 860}, accept_downloads=True)
            page = ctx.new_page(); errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            page.add_init_script(f"window.prompt = () => 'NotesTest{width}';")
            page.goto(url); page.wait_for_timeout(1200)
            run(page, width)
            check(not errs, f'no page or console errors at {width} px', '; '.join(errs[:3]))
            ctx.close()
        browser.close()
    srv.shutdown()
    print(f'\n{len(fails)} failure(s)' if fails else '\nall note and flag checks passed')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
