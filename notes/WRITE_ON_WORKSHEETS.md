# Write on a worksheet: state

Added 2026-10-26, at the student's request ("write on them ... on an iPad", "enough space when writing the math").

- Worksheets tab: every worksheet (and changed-numbers worksheet) has a Write on it button; it reads Continue
  writing when ink is saved for that worksheet.
- It opens the worksheet's print markup (sheetHTML) over the app. On screen a calculation has a 480 px work area and
  a short answer 200 px, both on a 24 px grid; More room adds 240 px under a problem, Less room takes it back
  (the PDFs keep their 72 mm and 25 mm).
- Ink: one canvas per problem part and one on the name line. A stroke is stored in that part's coordinates as
  fractions of its width, so it stays on its problem when room is added above it or the iPad turns. Pen in black,
  blue or red, three widths, highlighter, stroke eraser, undo and redo (also Cmd or Ctrl Z), Clear page (undoable).
- Pencil: a finger writes until an Apple Pencil touches the page; then Pencil only turns on, the Pencil writes and a
  finger scrolls (the choice is remembered). With it off, a
  finger writes and two fingers scroll.
- Storage: localStorage key `<ns>:ink:<source id>:<main|changed>`, this browser on this device only. A warning
  shows if the browser is not saving (private window, blocked site data).
- Save as PDF: each canvas is copied to a picture shown only in print, and the worksheet prints alone at its
  on-screen width scaled to the page, so the ink keeps its place. On an iPad the print sheet saves to Files or
  shares to Goodnotes.
- Code: views.js "Write on a worksheet" block (after the walkthrough player); styles `#ink`, `.ink*` in shell.html.
- Test: `src/ink_test.py` (Chromium, 820 and 390 px).
- Not tested on a physical iPad from this environment: Pencil pressure is not used (strokes have one width), and
  the Pencil and finger handling was checked with synthetic pen and touch pointer events.
- Scratch paper (added 2026-10-26): a Scratch paper button beside the answer box of every calculation question in
  Quiz and Exam sim opens the same writing layer over the question's stem, with one 720 px work area and no
  solutions. Practice scratch is kept per question (`<ns>:ink:q:<id>:scratch`); an exam paper's scratch is keyed to
  the paper (`:exam:<end time>`) and cleared when the next paper starts; the time left shows in its toolbar.
