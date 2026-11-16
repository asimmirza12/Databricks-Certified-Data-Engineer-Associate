# Rules for every session in this repo

A free, public, interactive course for **complete beginners** (new to data engineering AND new to Databricks),
mapped to the Databricks Certified Data Engineer Associate exam guide. Static site on GitHub Pages, no build step.

Live: https://asimmirza12.github.io/Databricks-Certified-Data-Engineer-Associate/

## How to build a module (the whole workflow)

1. Read `OUTLINE.md`. Build only lessons marked `[ ]` in the module you were asked for, in order.
2. For each lesson: web-search the CURRENT Databricks docs for every fact first (see Accuracy).
3. Copy `templates/lesson.html` to `modules/<NN-module-slug>/<NN-lesson-slug>.html` (file names are in OUTLINE.md) and fill in all 14 parts.
   The worked example is `modules/00-foundations/01-what-is-data-engineering.html`.
4. Add every new term to `glossary.html` (A to Z order, `id` = lowercase-with-hyphens) and link it from the lesson the first time it appears.
5. Tick the lesson `[x]` in `OUTLINE.md` and flip its last number `0` to `1` in the `COURSE` list at the top of `assets/course.js`.
   That one flag publishes it on the home page and wires up previous/next.
6. Do the copyright re-check (below) on every paragraph.
7. Test: `python3 -m http.server 8765`, open each new page, check light and dark theme, 375px phone width, every demo button, the quiz, and the browser console for errors.
8. Commit and push to `main` (one commit per lesson or per module). Confirm the live page loads.

## Repo layout

    index.html              home: intro, learning path, module cards, progress (cards are rendered from COURSE in course.js)
    assets/course.css       shared design system. ALL styling lives here
    assets/course.js        shared behaviour: theme, disclaimer, top bar, progress, quizzes, lesson nav, glossary search, COURSE list
    modules/<NN-module-slug>/<NN-lesson-slug>.html   one lesson per page
    glossary.html           searchable glossary of every term
    templates/lesson.html   the lesson template
    OUTLINE.md              every module and lesson, with [ ] / [x] status

Lesson pages link the shared files and contain only content.
- No `<style>` blocks and no `style=""` attributes in pages. If a lesson needs a new look, add a reusable class to `assets/course.css`.
- The only script allowed in a lesson is its own demo logic, at the bottom of the page, using the `Course.*` helpers.
- Never hand-write the top bar, footer, previous/next buttons or "mark as complete": `course.js` adds them.
- No frameworks, no build tools, no dependencies. Vanilla HTML, CSS and JS.
- No external assets except Google Fonts (already imported in `course.css`).

## Design

Colour tokens, fonts (Archivo, IBM Plex Sans, JetBrains Mono), light/dark themes and components come from the author's notes site
and live in `assets/course.css`. Always use the CSS variables (`var(--accent)`, `var(--ink)` ...) and existing classes, never hard-coded colours,
so both themes keep working. SVG diagrams use the classes `box`, `box-soft`, `box-acc`, `wire`, `dot`, `dot-ok`, `t-b`, `t-m`.

## Disclaimer (every page, first element in body, plus README.md)

Exact text, never reworded or removed:

> Learning resource only. This is an independent, unofficial study guide made for learning purposes. It is not affiliated with, endorsed by or sponsored by Databricks. Databricks features change often, so always check the details in the official Databricks documentation (https://docs.databricks.com) and the official exam guide on databricks.com before relying on anything here. Databricks and related names are trademarks of their respective owners.

It is in `templates/lesson.html`, and `course.js` injects it if a page ever lacks it. Keep both.

## Copyright (apply automatically to everything written)

- Never copy sentences from the exam guide, Databricks docs, blogs, courses or any other source. Read the source, then write the explanation fresh in your own words.
- Exam objectives: restate each one in your own plain words. Never paste the guide's text.
- Before committing any page, re-check every paragraph you wrote while looking at sources: if any sentence follows a source's wording or structure closely, rewrite it completely. Short technical names (option names, function names, commands) are fine.
- Code samples: write your own examples; don't copy doc examples.
- No images, logos or screenshots from Databricks; draw everything as our own SVG.
- Link to the official doc page for each concept instead of reproducing it.

## Accuracy

- Verify every feature name, option, default value and limit against the CURRENT Databricks docs (web search) before writing it.
  Do not trust memory: Databricks renames things often.
- Use current names and mention the old name once, as "formerly ...". Known renames (re-verify each session):
  - Lakeflow Spark Declarative Pipelines (formerly Lakeflow Declarative Pipelines, and before that Delta Live Tables / DLT)
  - Lakeflow Jobs (formerly Databricks Workflows / Jobs)
  - Declarative Automation Bundles (formerly Databricks Asset Bundles)
  - Databricks Git folders (formerly Repos)
- Each lesson ends with "Official docs" links and "Last verified: <date>". Check each link returns a page.
- If something can't be verified, write "verify in the docs" next to it rather than guessing.
- Do not state exam logistics (question count, time, fee, pass mark) as fact; point to the official exam guide.

## Audience and lesson shape

The reader knows nothing about data engineering or Databricks. Every lesson has these 14 parts, in this order:

1. Disclaimer banner
2. "Where you are": module, lesson, exam objective (own words), time to read
3. "Before this": prerequisite lessons, linked
4. The idea in plain English, with an everyday analogy
5. Animated diagram of how it works (SVG animateMotion / CSS keyframes, theme tokens)
6. Live demo in vanilla JS where something has state (buttons, sliders, dropdowns, a log panel showing what happened)
7. Code (Python and/or SQL) with comments, realistic names
8. "What if I change this?" table (Change | Effect) for every important option
9. Comparison tables where options compete; categories as card grids
10. Real-life scenarios table (Scenario | What happens | Fix)
11. Exam traps and "don't confuse these" cards
12. 3-5 question quiz with explanations
13. Key takeaways (3-5 lines), glossary terms used (linked), official docs, last verified
14. Previous / next lesson buttons; "mark as complete" (saved in localStorage) - added by course.js

Writing rules:
- Short sentences. Define every term the first time it appears. No unexplained jargon.
- One concept per lesson. Cover the lesson's exam objective in full detail; the module as a whole must cover EVERY objective listed in OUTLINE.md.
- Respect `prefers-reduced-motion` (wrap moving SVG parts in `<g class="mover">`; course.js removes them, and CSS animations are switched off globally).
- Must work at phone width (375px): keep SVG viewBox about 360 wide, wrap tables in `<div class="tbl">`.
- Nothing from any real employer or client. Use made-up generic examples (the course's running example is a small bakery chain with catalog `bakery`).
- No em dashes; plain punctuation.
- Demos must compute their results from state (not canned text) and write what happened to a `.log` panel.

## Changing the plan

If the exam guide changes or a lesson needs splitting, update `OUTLINE.md` and the `COURSE` list in `assets/course.js` together.
Lesson ids (`MM-LL`) are used as localStorage keys for progress, so avoid renumbering published lessons.
