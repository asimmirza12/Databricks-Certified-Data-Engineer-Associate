# Course outline

Status: `[ ]` not built, `[x]` built and live. 89 lessons in 8 modules.

When a lesson is built: tick it here **and** flip its last number from `0` to `1` in the `COURSE` list at the top of `assets/course.js`.

Exam objectives below are restated in our own words. The official wording is in the exam guide on databricks.com.


## Module 00: Foundations (not an exam section)

Folder: `modules/00-foundations/`

Objectives:

- **F.** Not an exam section. Gives a complete beginner the background every later module assumes.

| Status | Lesson | File | Objective | Prerequisites |
|---|---|---|---|---|
| [x] | 00-01 What is data engineering? | `01-what-is-data-engineering.html` | F | none |
| [x] | 00-02 Files vs tables | `02-files-vs-tables.html` | F | 00-01 |
| [x] | 00-03 File formats: CSV, JSON, Parquet and friends | `03-file-formats.html` | F | 00-02 |
| [x] | 00-04 Batch vs streaming | `04-batch-vs-streaming.html` | F | 00-01 |
| [x] | 00-05 What is Apache Spark? | `05-what-is-spark.html` | F | 00-02, 00-04 |
| [x] | 00-06 Cloud object storage | `06-cloud-object-storage.html` | F | 00-02 |
| [x] | 00-07 What is Databricks? Workspace, compute, notebooks | `07-what-is-databricks.html` | F | 00-05, 00-06 |
| [x] | 00-08 Delta Lake basics | `08-delta-lake-basics.html` | F | 00-03, 00-07 |
| [x] | 00-09 Unity Catalog basics | `09-unity-catalog-basics.html` | F | 00-07, 00-08 |
| [x] | 00-10 Medallion architecture: bronze, silver, gold | `10-medallion-architecture.html` | F | 00-08, 00-09 |

## Module 01: Databricks Intelligence Platform (6% of the exam)

Folder: `modules/01-databricks-platform/`

Objectives:

- **1.1** Know the main building blocks of the platform: how it is laid out, what Delta Lake does and what Unity Catalog does.
- **1.2** Know each kind of compute, what it is good and bad at, how it is billed, and pick the right one for a given workload.

| Status | Lesson | File | Objective | Prerequisites |
|---|---|---|---|---|
| [x] | 01-01 Platform architecture: control plane and compute plane | `01-platform-architecture.html` | 1.1 | 00-07 |
| [x] | 01-02 Delta Lake in depth: transaction log, ACID, time travel | `02-delta-lake-in-depth.html` | 1.1 | 00-08 |
| [x] | 01-03 Unity Catalog object model: metastore, catalog, schema, objects | `03-unity-catalog-object-model.html` | 1.1 | 00-09 |
| [x] | 01-04 Compute types: all-purpose, jobs, SQL warehouses, serverless | `04-compute-types.html` | 1.2 | 01-01 |
| [x] | 01-05 Compute costs and limits: DBUs and what each option cannot do | `05-compute-costs-and-limits.html` | 1.2 | 01-04 |
| [x] | 01-06 Choosing compute for a workload | `06-choosing-compute.html` | 1.2 | 01-04, 01-05 |

## Module 02: Data Ingestion and Loading (21% of the exam)

Folder: `modules/02-data-ingestion/`

Objectives:

- **2.1** Explain the ways data can be brought in (all at once, continuously, or only what is new) and load it from local files and from both kinds of Lakeflow Connect connector.
- **2.2** Load new files from cloud storage into governed tables with COPY INTO, without loading the same file twice.
- **2.3** Use Auto Loader, including how it finds files and how it handles a schema that is enforced or allowed to change.
- **2.4** Set up Lakeflow Connect so data from business systems arrives reliably in governed tables.
- **2.5** Pull data in a notebook over JDBC/ODBC or a REST API, land it in storage or a table, and schedule it with Lakeflow Jobs.
- **2.6** Decide which ingestion tool fits, given data size, how often it arrives, its type and governance needs.
- **2.7** Bring semi-structured and unstructured data (such as nested JSON) into governed Delta tables.

| Status | Lesson | File | Objective | Prerequisites |
|---|---|---|---|---|
| [x] | 02-01 Ingestion patterns: batch, streaming, incremental | `01-ingestion-patterns.html` | 2.1 | 00-04, 00-10 |
| [x] | 02-02 Uploading local files and Unity Catalog volumes | `02-volumes-and-local-files.html` | 2.1 | 00-09, 02-01 |
| [x] | 02-03 Lakeflow Connect: standard vs managed connectors | `03-lakeflow-connect-overview.html` | 2.1, 2.4 | 02-01 |
| [x] | 02-04 COPY INTO: simple incremental file loading | `04-copy-into.html` | 2.2 | 02-02 |
| [x] | 02-05 Auto Loader basics: cloudFiles, checkpoints, triggers | `05-auto-loader-basics.html` | 2.3 | 02-01, 02-04 |
| [x] | 02-06 Auto Loader file detection: directory listing vs file notification | `06-auto-loader-file-detection.html` | 2.3 | 02-05 |
| [x] | 02-07 Auto Loader schema inference, enforcement and evolution | `07-auto-loader-schema.html` | 2.3 | 02-05 |
| [x] | 02-08 Configuring Lakeflow Connect managed connectors | `08-managed-connectors.html` | 2.4 | 02-03 |
| [x] | 02-09 Reading databases with JDBC and ODBC in notebooks | `09-jdbc-odbc.html` | 2.5 | 02-01, 00-05 |
| [x] | 02-10 REST API ingestion, scheduled with Lakeflow Jobs | `10-rest-api-ingestion.html` | 2.5 | 02-02, 02-09 |
| [x] | 02-11 Semi-structured data: JSON, nested fields, VARIANT | `11-semi-structured-data.html` | 2.7 | 00-03, 02-07 |
| [x] | 02-12 Unstructured data: documents, images and other files | `12-unstructured-data.html` | 2.7 | 02-02 |
| [x] | 02-13 Choosing an ingestion method | `13-choosing-ingestion-method.html` | 2.6 | 02-03 to 02-12 |

## Module 03: Data Transformation and Modeling (22% of the exam)

Folder: `modules/03-transformation-and-modeling/`

Objectives:

- **3.1** Read raw (bronze) tables with PySpark or SQL, deal with missing values, fix data types and save the result as silver tables.
- **3.2** Combine datasets: inner, left, broadcast, multi-key and cross joins, plus union and union all.
- **3.3** Reshape data: add, drop, split and rename columns, filter rows, and turn arrays into rows.
- **3.4** Remove duplicates and calculate aggregates such as counts, approximate distinct counts, averages and summaries.
- **3.5** Know the basic Spark tuning settings (shuffle partitions, default parallelism, executor and driver memory, automatic broadcast threshold) and check whether a change helped.
- **3.6** Tell apart, and build, the gold-layer objects: views, materialized views, streaming tables and plain tables.
- **3.7** Add data quality checks so silver and gold data can be trusted.

| Status | Lesson | File | Objective | Prerequisites |
|---|---|---|---|---|
| [x] | 03-01 DataFrames and SQL: two ways to say the same thing | `01-dataframes-and-sql.html` | 3.1 | 00-05, 00-10 |
| [x] | 03-02 Cleaning nulls | `02-cleaning-nulls.html` | 3.1 | 03-01 |
| [x] | 03-03 Standardising data types and writing silver tables | `03-data-types-and-silver.html` | 3.1 | 03-02 |
| [x] | 03-04 Joins: inner and left | `04-joins-inner-left.html` | 3.2 | 03-01 |
| [x] | 03-05 Joins: multiple keys, cross join, broadcast join | `05-joins-multi-key-cross-broadcast.html` | 3.2 | 03-04 |
| [x] | 03-06 Union and union all | `06-union.html` | 3.2 | 03-01 |
| [x] | 03-07 Columns: add, drop, rename, split | `07-columns.html` | 3.3 | 03-01 |
| [x] | 03-08 Filtering rows | `08-filtering-rows.html` | 3.3 | 03-01 |
| [x] | 03-09 Arrays and explode | `09-arrays-and-explode.html` | 3.3 | 03-07 |
| [x] | 03-10 Deduplication | `10-deduplication.html` | 3.4 | 03-08 |
| [x] | 03-11 Aggregations: count, approx_count_distinct, mean, summary | `11-aggregations.html` | 3.4 | 03-08 |
| [x] | 03-12 Tuning: shuffle partitions and default parallelism | `12-tuning-partitions.html` | 3.5 | 03-04, 03-11 |
| [x] | 03-13 Tuning: memory and the auto-broadcast threshold, then measure again | `13-tuning-memory-broadcast.html` | 3.5 | 03-05, 03-12 |
| [x] | 03-14 Gold objects: tables, views, materialized views, streaming tables | `14-gold-objects.html` | 3.6 | 00-10, 03-11 |
| [x] | 03-15 Building gold objects for BI and analytics | `15-building-gold-objects.html` | 3.6 | 03-14 |
| [x] | 03-16 Data quality: constraints and expectations | `16-data-quality.html` | 3.7 | 03-03, 03-14 |

## Module 04: Working with Lakeflow Jobs (16% of the exam)

Folder: `modules/04-lakeflow-jobs/`

Objectives:

- **4.1** Control how a job runs: retry failed tasks, branch on a condition and loop over a list.
- **4.2** Set up the common task types (notebook, SQL query, dashboard, pipeline) and wire them together as a task graph.
- **4.3** Schedule jobs and know the trigger types: on a timetable, when a file arrives, when a table changes.
- **4.4** Pick a clock-based or a data-driven trigger depending on when data really arrives and what depends on it.

| Status | Lesson | File | Objective | Prerequisites |
|---|---|---|---|---|
| [x] | 04-01 Lakeflow Jobs: jobs, tasks and runs | `01-jobs-tasks-runs.html` | 4.2 | 00-01, 01-04 |
| [x] | 04-02 Task types: notebook, SQL query, dashboard, pipeline | `02-task-types.html` | 4.2 | 04-01 |
| [x] | 04-03 Dependencies and the task graph (DAG) | `03-dependencies-and-dag.html` | 4.2 | 04-02 |
| [x] | 04-04 Retries | `04-retries.html` | 4.1 | 04-03 |
| [x] | 04-05 Parameters and task values | `05-parameters-and-task-values.html` | 4.1 | 04-03 |
| [x] | 04-06 Branching: if/else and run-if conditions | `06-branching.html` | 4.1 | 04-05 |
| [x] | 04-07 Looping: for each | `07-looping.html` | 4.1 | 04-05 |
| [x] | 04-08 Scheduled triggers | `08-scheduled-triggers.html` | 4.3 | 04-01 |
| [x] | 04-09 File arrival triggers | `09-file-arrival-triggers.html` | 4.3 | 04-08, 02-02 |
| [x] | 04-10 Table update triggers | `10-table-update-triggers.html` | 4.3 | 04-08 |
| [x] | 04-11 Time-based or data-driven? Choosing a trigger | `11-choosing-triggers.html` | 4.4 | 04-08 to 04-10 |

## Module 05: Implementing CI/CD (10% of the exam)

Folder: `modules/05-ci-cd/`

Objectives:

- **5.1** Work with code in Databricks Git folders: make and switch branches, commit, push and open pull requests.
- **5.2** Use bundle variables and overrides so one codebase behaves correctly in dev, test and prod.
- **5.3** Package and deploy jobs, pipelines and other assets with Declarative Automation Bundles across environments.
- **5.4** Use the Databricks CLI to validate, deploy and manage bundles and other assets inside automated CI/CD.

| Status | Lesson | File | Objective | Prerequisites |
|---|---|---|---|---|
| [x] | 05-01 Git basics for beginners: repo, branch, commit, pull request | `01-git-basics.html` | 5.1 | none |
| [x] | 05-02 Databricks Git folders: clone, create and switch branches | `02-git-folders.html` | 5.1 | 05-01, 00-07 |
| [x] | 05-03 Commit, push, pull requests and merge conflicts | `03-commit-push-pull-request.html` | 5.1 | 05-02 |
| [x] | 05-04 What are Declarative Automation Bundles? | `04-what-are-bundles.html` | 5.3 | 05-01, 04-01 |
| [x] | 05-05 Targets: dev, test and prod | `05-bundle-targets.html` | 5.2, 5.3 | 05-04 |
| [x] | 05-06 Variables and overrides | `06-bundle-variables-overrides.html` | 5.2 | 05-05 |
| [x] | 05-07 Bundle resources: jobs, pipelines and more | `07-bundle-resources.html` | 5.3 | 05-04 |
| [x] | 05-08 The Databricks CLI: install, log in, basic commands | `08-databricks-cli.html` | 5.4 | 00-07 |
| [x] | 05-09 Bundle commands: validate, deploy, run, destroy | `09-bundle-commands.html` | 5.4 | 05-04, 05-08 |
| [x] | 05-10 Automated CI/CD: deploying from a pipeline | `10-automated-ci-cd.html` | 5.4 | 05-03, 05-09 |

## Module 06: Troubleshooting, Monitoring and Optimization (10% of the exam)

Folder: `modules/06-troubleshooting-monitoring-optimization/`

Objectives:

- **6.1** Use the job run history to see whether runs are getting slower than they normally are.
- **6.2** Use the Jobs UI to judge pipeline health: read statuses, follow the task graph to the task that blocked others, and watch durations and failure rates.
- **6.3** Spot skew, shuffle and disk spill from the stage numbers in the Spark UI.
- **6.4** Know what liquid clustering and predictive optimization do.
- **6.5** Work out why a cluster will not start, why libraries clash and why memory runs out.

| Status | Lesson | File | Objective | Prerequisites |
|---|---|---|---|---|
| [ ] | 06-01 Run history: comparing a run with its normal | `01-run-history-and-baselines.html` | 6.1 | 04-01 |
| [ ] | 06-02 Job statuses and finding upstream blockers | `02-job-statuses-and-task-graph.html` | 6.2 | 04-03, 06-01 |
| [ ] | 06-03 Tracking run times and failure rates | `03-run-times-and-failure-rates.html` | 6.2 | 06-02 |
| [ ] | 06-04 A tour of the Spark UI: jobs, stages, tasks | `04-spark-ui-tour.html` | 6.3 | 00-05, 03-12 |
| [ ] | 06-05 Shuffle: why moving data is slow | `05-shuffle.html` | 6.3 | 06-04 |
| [ ] | 06-06 Data skew | `06-data-skew.html` | 6.3 | 06-05 |
| [ ] | 06-07 Disk spill | `07-disk-spill.html` | 6.3 | 06-05 |
| [ ] | 06-08 Liquid clustering | `08-liquid-clustering.html` | 6.4 | 01-02 |
| [ ] | 06-09 Predictive optimization | `09-predictive-optimization.html` | 6.4 | 06-08 |
| [ ] | 06-10 Cluster startup failures | `10-cluster-startup-failures.html` | 6.5 | 01-04 |
| [ ] | 06-11 Library conflicts | `11-library-conflicts.html` | 6.5 | 01-04 |
| [ ] | 06-12 Out-of-memory errors | `12-out-of-memory.html` | 6.5 | 06-07, 03-13 |

## Module 07: Governance and Security (15% of the exam)

Folder: `modules/07-governance-and-security/`

Objectives:

- **7.1** Tell managed tables from external tables and create, change, drop and convert them.
- **7.2** Give and take away access with GRANT, REVOKE and DENY, in the UI and in SQL, for users, groups and service principals, at the right level.
- **7.3** Understand column masks and row filters that show different data to different groups.
- **7.4** Understand attribute-based access control (ABAC) policies that apply row filters and column masks centrally.

| Status | Lesson | File | Objective | Prerequisites |
|---|---|---|---|---|
| [ ] | 07-01 Managed vs external tables | `01-managed-vs-external-tables.html` | 7.1 | 00-09, 01-03 |
| [ ] | 07-02 Creating, changing and dropping tables | `02-table-operations.html` | 7.1 | 07-01 |
| [ ] | 07-03 Converting between managed and external | `03-converting-tables.html` | 7.1 | 07-02 |
| [ ] | 07-04 Principals: users, groups, service principals | `04-principals.html` | 7.2 | 00-09 |
| [ ] | 07-05 The security hierarchy and privilege inheritance | `05-securable-hierarchy.html` | 7.2 | 01-03, 07-04 |
| [ ] | 07-06 GRANT and REVOKE in SQL and the UI | `06-grant-and-revoke.html` | 7.2 | 07-05 |
| [ ] | 07-07 DENY: what it does and where it applies | `07-deny.html` | 7.2 | 07-06 |
| [ ] | 07-08 Column masks | `08-column-masks.html` | 7.3 | 07-06 |
| [ ] | 07-09 Row filters | `09-row-filters.html` | 7.3 | 07-08 |
| [ ] | 07-10 ABAC: governed tags and policies | `10-abac-tags-and-policies.html` | 7.4 | 07-08, 07-09 |
| [ ] | 07-11 ABAC in practice: central row filters and column masks | `11-abac-in-practice.html` | 7.4 | 07-10 |
