/* Shared behaviour for every page: theme, disclaimer, top bar, progress, quizzes, lesson nav, glossary search.
   Load it in <head> with a plain <script src> (no defer), so the theme is set before the page paints. */
(function () {
  'use strict';

  /* Every lesson in order: [number, file slug, title, built (1) or not yet (0)].
     Keep in step with OUTLINE.md. Flip the last number to 1 when a lesson goes live. */
  var COURSE = /*COURSE*/[
  {n:"00", slug:"foundations", title:"Foundations", weight:null, lessons:[
    ["01", "what-is-data-engineering", "What is data engineering?", 1],
    ["02", "files-vs-tables", "Files vs tables", 1],
    ["03", "file-formats", "File formats: CSV, JSON, Parquet and friends", 1],
    ["04", "batch-vs-streaming", "Batch vs streaming", 1],
    ["05", "what-is-spark", "What is Apache Spark?", 1],
    ["06", "cloud-object-storage", "Cloud object storage", 1],
    ["07", "what-is-databricks", "What is Databricks? Workspace, compute, notebooks", 1],
    ["08", "delta-lake-basics", "Delta Lake basics", 1],
    ["09", "unity-catalog-basics", "Unity Catalog basics", 1],
    ["10", "medallion-architecture", "Medallion architecture: bronze, silver, gold", 1]
  ]},
  {n:"01", slug:"databricks-platform", title:"Databricks Intelligence Platform", weight:6, lessons:[
    ["01", "platform-architecture", "Platform architecture: control plane and compute plane", 1],
    ["02", "delta-lake-in-depth", "Delta Lake in depth: transaction log, ACID, time travel", 1],
    ["03", "unity-catalog-object-model", "Unity Catalog object model: metastore, catalog, schema, objects", 1],
    ["04", "compute-types", "Compute types: all-purpose, jobs, SQL warehouses, serverless", 1],
    ["05", "compute-costs-and-limits", "Compute costs and limits: DBUs and what each option cannot do", 1],
    ["06", "choosing-compute", "Choosing compute for a workload", 1]
  ]},
  {n:"02", slug:"data-ingestion", title:"Data Ingestion and Loading", weight:21, lessons:[
    ["01", "ingestion-patterns", "Ingestion patterns: batch, streaming, incremental", 1],
    ["02", "volumes-and-local-files", "Uploading local files and Unity Catalog volumes", 1],
    ["03", "lakeflow-connect-overview", "Lakeflow Connect: standard vs managed connectors", 1],
    ["04", "copy-into", "COPY INTO: simple incremental file loading", 1],
    ["05", "auto-loader-basics", "Auto Loader basics: cloudFiles, checkpoints, triggers", 1],
    ["06", "auto-loader-file-detection", "Auto Loader file detection: directory listing vs file notification", 1],
    ["07", "auto-loader-schema", "Auto Loader schema inference, enforcement and evolution", 1],
    ["08", "managed-connectors", "Configuring Lakeflow Connect managed connectors", 1],
    ["09", "jdbc-odbc", "Reading databases with JDBC and ODBC in notebooks", 1],
    ["10", "rest-api-ingestion", "REST API ingestion, scheduled with Lakeflow Jobs", 1],
    ["11", "semi-structured-data", "Semi-structured data: JSON, nested fields, VARIANT", 1],
    ["12", "unstructured-data", "Unstructured data: documents, images and other files", 1],
    ["13", "choosing-ingestion-method", "Choosing an ingestion method", 1]
  ]},
  {n:"03", slug:"transformation-and-modeling", title:"Data Transformation and Modeling", weight:22, lessons:[
    ["01", "dataframes-and-sql", "DataFrames and SQL: two ways to say the same thing", 1],
    ["02", "cleaning-nulls", "Cleaning nulls", 1],
    ["03", "data-types-and-silver", "Standardising data types and writing silver tables", 1],
    ["04", "joins-inner-left", "Joins: inner and left", 1],
    ["05", "joins-multi-key-cross-broadcast", "Joins: multiple keys, cross join, broadcast join", 1],
    ["06", "union", "Union and union all", 1],
    ["07", "columns", "Columns: add, drop, rename, split", 1],
    ["08", "filtering-rows", "Filtering rows", 1],
    ["09", "arrays-and-explode", "Arrays and explode", 1],
    ["10", "deduplication", "Deduplication", 1],
    ["11", "aggregations", "Aggregations: count, approx_count_distinct, mean, summary", 1],
    ["12", "tuning-partitions", "Tuning: shuffle partitions and default parallelism", 1],
    ["13", "tuning-memory-broadcast", "Tuning: memory and the auto-broadcast threshold, then measure again", 1],
    ["14", "gold-objects", "Gold objects: tables, views, materialized views, streaming tables", 1],
    ["15", "building-gold-objects", "Building gold objects for BI and analytics", 1],
    ["16", "data-quality", "Data quality: constraints and expectations", 1],
    ["17", "declarative-pipelines", "Lakeflow Spark Declarative Pipelines", 1]
  ]},
  {n:"04", slug:"lakeflow-jobs", title:"Working with Lakeflow Jobs", weight:16, lessons:[
    ["01", "jobs-tasks-runs", "Lakeflow Jobs: jobs, tasks and runs", 1],
    ["02", "task-types", "Task types: notebook, SQL query, dashboard, pipeline", 1],
    ["03", "dependencies-and-dag", "Dependencies and the task graph (DAG)", 1],
    ["04", "retries", "Retries", 1],
    ["05", "parameters-and-task-values", "Parameters and task values", 1],
    ["06", "branching", "Branching: if/else and run-if conditions", 1],
    ["07", "looping", "Looping: for each", 1],
    ["08", "scheduled-triggers", "Scheduled triggers", 1],
    ["09", "file-arrival-triggers", "File arrival triggers", 1],
    ["10", "table-update-triggers", "Table update triggers", 1],
    ["11", "choosing-triggers", "Time-based or data-driven? Choosing a trigger", 1]
  ]},
  {n:"05", slug:"ci-cd", title:"Implementing CI/CD", weight:10, lessons:[
    ["01", "git-basics", "Git basics for beginners: repo, branch, commit, pull request", 1],
    ["02", "git-folders", "Databricks Git folders: clone, create and switch branches", 1],
    ["03", "commit-push-pull-request", "Commit, push, pull requests and merge conflicts", 1],
    ["04", "what-are-bundles", "What are Declarative Automation Bundles?", 1],
    ["05", "bundle-targets", "Targets: dev, test and prod", 1],
    ["06", "bundle-variables-overrides", "Variables and overrides", 1],
    ["07", "bundle-resources", "Bundle resources: jobs, pipelines and more", 1],
    ["08", "databricks-cli", "The Databricks CLI: install, log in, basic commands", 1],
    ["09", "bundle-commands", "Bundle commands: validate, deploy, run, destroy", 1],
    ["10", "automated-ci-cd", "Automated CI/CD: deploying from a pipeline", 1]
  ]},
  {n:"06", slug:"troubleshooting-monitoring-optimization", title:"Troubleshooting, Monitoring and Optimization", weight:10, lessons:[
    ["01", "run-history-and-baselines", "Run history: comparing a run with its normal", 1],
    ["02", "job-statuses-and-task-graph", "Job statuses and finding upstream blockers", 1],
    ["03", "run-times-and-failure-rates", "Tracking run times and failure rates", 1],
    ["04", "spark-ui-tour", "A tour of the Spark UI: jobs, stages, tasks", 1],
    ["05", "shuffle", "Shuffle: why moving data is slow", 1],
    ["06", "data-skew", "Data skew", 1],
    ["07", "disk-spill", "Disk spill", 1],
    ["08", "liquid-clustering", "Liquid clustering", 1],
    ["09", "predictive-optimization", "Predictive optimization", 1],
    ["10", "cluster-startup-failures", "Cluster startup failures", 1],
    ["11", "library-conflicts", "Library conflicts", 1],
    ["12", "out-of-memory", "Out-of-memory errors", 1]
  ]},
  {n:"07", slug:"governance-and-security", title:"Governance and Security", weight:15, lessons:[
    ["01", "managed-vs-external-tables", "Managed vs external tables", 1],
    ["02", "table-operations", "Creating, changing and dropping tables", 1],
    ["03", "converting-tables", "Converting between managed and external", 1],
    ["04", "principals", "Principals: users, groups, service principals", 1],
    ["05", "securable-hierarchy", "The security hierarchy and privilege inheritance", 1],
    ["06", "grant-and-revoke", "GRANT and REVOKE in SQL and the UI", 1],
    ["07", "deny", "DENY: what it does and where it applies", 1],
    ["08", "column-masks", "Column masks", 1],
    ["09", "row-filters", "Row filters", 1],
    ["10", "abac-tags-and-policies", "ABAC: governed tags and policies", 1],
    ["11", "abac-in-practice", "ABAC in practice: central row filters and column masks", 1],
    ["12", "lineage", "Lineage: table and column level", 1]
  ]}
]/*END*/;

  var DISCLAIMER = '<strong>Learning resource only.</strong> This is an independent, unofficial study guide made for learning purposes. ' +
    'It is not affiliated with, endorsed by or sponsored by Databricks. Databricks features change often, so always check the details in the ' +
    '<a href="https://docs.databricks.com">official Databricks documentation</a> and the official exam guide on databricks.com before relying on ' +
    'anything here. Databricks and related names are trademarks of their respective owners.';

  var ROOT = document.currentScript.src.replace(/assets\/course\.js.*$/, '');
  var root = document.documentElement;

  /* localStorage can throw (private mode, blocked storage): never let that break a page. */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* progress just won't persist */ } }
  };

  var saved = store.get('dea-theme');
  if (saved) root.setAttribute('data-theme', saved);

  var lessons = [];
  COURSE.forEach(function (m) {
    m.lessons.forEach(function (l) {
      lessons.push({ id: m.n + '-' + l[0], title: l[2], built: !!l[3], mod: m,
        url: ROOT + 'modules/' + m.n + '-' + m.slug + '/' + l[0] + '-' + l[1] + '.html' });
    });
  });

  function doneSet() { try { return JSON.parse(store.get('dea-done')) || []; } catch (e) { return []; } }
  function setDone(id, on) {
    var d = doneSet().filter(function (x) { return x !== id; });
    if (on) d.push(id);
    store.set('dea-done', JSON.stringify(d));
  }

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function log(box, cls, msg) { var s = el('span', cls); s.textContent = msg; box.appendChild(s); box.scrollTop = box.scrollHeight; }
  function bump(n) { n.classList.remove('flash'); void n.offsetWidth; n.classList.add('flash'); }
  var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  function esc(v) { return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  /* Small table from a list of same-shaped objects. null shows as a NULL chip. */
  function table(rows) {
    if (!rows || !rows.length) return '<p class="cap">empty</p>';
    var keys = Object.keys(rows[0]);
    return '<table class="mini"><tr>' + keys.map(function (k) { return '<th>' + esc(k) + '</th>'; }).join('') + '</tr>' +
      rows.map(function (r) { return '<tr>' + keys.map(function (k) { return '<td>' + (r[k] == null ? '<span class="chip bad">NULL</span>' : esc(r[k])) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
  }

  /* Helpers for lesson demos. */
  window.Course = { el: el, log: log, bump: bump, table: table, esc: esc, reduce: reduce, lessons: lessons };

  function chrome() {
    var body = document.body;
    /* 1. Disclaimer: always the first thing on the page, even if a page forgot it. */
    var disc = document.querySelector('.disclaimer');
    if (!disc) { disc = el('aside', 'disclaimer', DISCLAIMER); disc.setAttribute('aria-label', 'Disclaimer'); }
    body.insertBefore(disc, body.firstChild);

    /* 2. Top bar. */
    var bar = el('nav', 'topbar');
    bar.setAttribute('aria-label', 'Course');
    bar.innerHTML = '<a class="brand" href="' + ROOT + 'index.html">DE Associate</a>' +
      '<a href="' + ROOT + 'index.html#modules">Modules</a><a href="' + ROOT + 'glossary.html">Glossary</a>';
    var tb = el('button');
    tb.type = 'button';
    function isDark() { var t = root.getAttribute('data-theme'); return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; }
    function label() { tb.textContent = isDark() ? 'Light' : 'Dark'; tb.setAttribute('aria-label', 'Switch to ' + (isDark() ? 'light' : 'dark') + ' theme'); }
    tb.onclick = function () { var t = isDark() ? 'light' : 'dark'; root.setAttribute('data-theme', t); store.set('dea-theme', t); label(); };
    label();
    bar.appendChild(tb);
    disc.after(bar);

    /* 3. Footer. */
    if (!document.querySelector('footer')) {
      body.appendChild(el('footer', null, 'Independent, unofficial study guide. Not affiliated with Databricks. ' +
        'Check everything against the <a href="https://docs.databricks.com">official documentation</a>.'));
    }
  }

  function motion() {
    /* SMIL animation ignores the CSS media query, so remove moving dots by hand. */
    if (reduce) document.querySelectorAll('svg .mover, animateMotion, animate').forEach(function (a) { a.remove(); });
  }

  function quizzes() {
    document.querySelectorAll('.quiz').forEach(function (quiz, qi) {
      var qs = quiz.querySelectorAll('fieldset'), right = 0, answered = 0;
      var score = el('p', 'note'); score.setAttribute('aria-live', 'polite'); score.textContent = 'Pick an answer for each question.';
      quiz.appendChild(score);
      qs.forEach(function (q, i) {
        var inputs = q.querySelectorAll('input[type=radio]');
        inputs.forEach(function (inp) {
          inp.name = 'quiz' + qi + '-' + i;
          inp.onchange = function () {
            inputs.forEach(function (x) { x.disabled = true; if (x.hasAttribute('data-correct')) x.parentNode.classList.add('right'); });
            if (inp.hasAttribute('data-correct')) right++; else inp.parentNode.classList.add('wrong');
            var ex = q.querySelector('.explain'); if (ex) ex.hidden = false;
            answered++;
            score.textContent = answered < qs.length ? answered + ' of ' + qs.length + ' answered.' : 'Score: ' + right + ' of ' + qs.length + '.';
          };
        });
      });
    });
  }

  function lessonNav() {
    var id = document.body.getAttribute('data-lesson');
    if (!id) return;
    var i = lessons.findIndex(function (l) { return l.id === id; });
    if (i < 0) return;
    function link(l, text) {
      if (!l) return el('span');
      if (!l.built) { var s = el('span', 'cap'); s.textContent = text + l.title + ' (coming soon)'; return s; }
      var a = el('a', 'btn'); a.href = l.url; a.textContent = text + l.title; return a;
    }
    var nav = el('nav', 'lesson-nav'); nav.setAttribute('aria-label', 'Lesson');
    var btn = el('button'); btn.type = 'button';
    function paint() {
      var on = doneSet().indexOf(id) >= 0;
      btn.textContent = on ? '✓ Completed (click to undo)' : 'Mark as complete';
      btn.className = on ? 'done' : 'primary';
      btn.setAttribute('aria-pressed', on);
    }
    btn.onclick = function () { setDone(id, doneSet().indexOf(id) < 0); paint(); };
    paint();
    nav.appendChild(link(lessons[i - 1], '← '));
    nav.appendChild(btn);
    nav.appendChild(link(lessons[i + 1], 'Next: '));
    var sec = el('section'); sec.appendChild(nav);
    (document.querySelector('main') || document.body).appendChild(sec);
  }

  function home() {
    var box = document.getElementById('modules');
    if (!box) return;
    var done = doneSet(), built = lessons.filter(function (l) { return l.built; });
    var n = built.filter(function (l) { return done.indexOf(l.id) >= 0; }).length;
    var prog = document.getElementById('progress');
    if (prog) {
      prog.innerHTML = '<p><strong>' + n + ' of ' + built.length + '</strong> published lessons completed. ' +
        lessons.length + ' lessons are planned in total.</p><div class="meter"><i style="width:' + (built.length ? 100 * n / built.length : 0) + '%"></i></div>';
      var next = built.filter(function (l) { return done.indexOf(l.id) < 0; })[0];
      if (next) { var a = el('a', 'btn primary'); a.href = next.url; a.textContent = (n ? 'Continue: ' : 'Start: ') + next.id + ' ' + next.title; prog.appendChild(el('p')).appendChild(a); }
    }
    box.innerHTML = '';
    COURSE.forEach(function (m) {
      var mine = lessons.filter(function (l) { return l.mod === m; });
      var live = mine.filter(function (l) { return l.built; }).length;
      var card = el('div', 'card');
      card.appendChild(el('span', 'tag')).textContent = 'Module ' + m.n + (m.weight ? ' · ' + m.weight + '% of the exam' : ' · start here');
      card.appendChild(el('h3')).textContent = m.title;
      card.appendChild(el('p', 'cap')).textContent = mine.length + ' lessons · ' + live + ' published';
      var det = el('details'); if (live) det.open = true;
      det.appendChild(el('summary')).textContent = 'Lessons';
      var ol = det.appendChild(el('ol'));
      mine.forEach(function (l) {
        var li = ol.appendChild(el('li', l.built ? (done.indexOf(l.id) >= 0 ? 'done' : '') : 'soon'));
        if (l.built) { var a = li.appendChild(el('a')); a.href = l.url; a.textContent = l.id + ' ' + l.title; }
        else li.textContent = l.id + ' ' + l.title + ' (coming soon)';
      });
      card.appendChild(det);
      box.appendChild(card);
    });
  }

  function glossary() {
    var input = document.getElementById('gsearch');
    if (!input) return;
    var items = document.querySelectorAll('.gloss > div'), none = document.getElementById('gnone');
    input.oninput = function () {
      var q = input.value.trim().toLowerCase(), shown = 0;
      items.forEach(function (d) { var hit = d.textContent.toLowerCase().indexOf(q) >= 0; d.hidden = !hit; if (hit) shown++; });
      if (none) none.hidden = shown > 0;
    };
  }

  document.addEventListener('DOMContentLoaded', function () {
    chrome(); motion(); quizzes(); lessonNav(); home(); glossary();
  });
})();
