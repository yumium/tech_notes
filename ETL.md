Sources:

- DataBricks: Understanding ETL

Recent data trends: data-hungry gen AI, more streaming data, data lake-house architecture (data lake is cost-effective mostly for AI workloads, data warehouse has more efficient transaction processing for analytics workloads)



# Data Ingestion

These days with cheap storage most data pipelines take shape ELT, first loading *all* data into the cloud, say.

Upstream data sources can change, so can downstream requirements.

What tools can we use to keep up with changing demand?

Data ingestion = getting data from source to a target staging area where transformation can take place

**Sources**

Questions to ask about your data sources:

- Who are we working with? Who are the stakeholders and what are their OKRs?
- How will data be used? Recommends technical yes/no questions to avoid ambiguity
- What's the frequency? Is it bounded or not? What is the minimum frequency of data source (upper-bound on how frequency we can pull data)
- Exepcted data volume?
- Data source format? (JSON, API, relational DB etc.)
- Data source quality?

**Destinations**

Have a look at different data storage technologies.

**Ingestion process**

Frequency: batch (process a group by data points together), micro-batch (batch at higher frequency), streaming (process (nearly) as each data point comes)

Message services: Kafka, Redpanda, Google Pub/Sub, Kinesis

Payload: cost, latency, throughput/scalability (can ingestion system handle large spike of increased data volume?), retention (should we delete old data?)

Structure: unstructured (text, video, audio, images), semi-structured (XML, JSON), structured (defined columns, keys etc.)

Declarative vs. imperative solutions: declarative (declarative pipelines, simple on frontend but hard to extend), imperative (usually more work but very easy to extend as we're working with code directly, pays off with higher data flexibility)

**Change data capture**: see wiki page



# Data transformation

Transformation = altering raw data into more usable format by end users

Environments:

- Data warehouses: transformation done using SQL
- Data lakes: cheaper to store than data warehouses, usually no compute
- Data lakehouses: data lakes + compute (e.g., Spark)

Data staging: during transformation, data usually first loaded into a staging environment where transformation takes place. This staged data is usually temporary and deleted once transformation is done.


Frameworks and tools:

- Python => Pandas, Polars, Dusk, Ray
- SQL
- Rust/C++, though less used
- Hadoop (though used less now, Map/Reduce not suitable for transforming stream data)
- Spark
- Datawarehouse transformation tools

Data transformation patterns:

- Enrichment (appending additional data)
- Joining
- Filtering
- Structuring => transform data into required format
- Conversion, e.g., time formats
- Aggregation => summing, combining
- Anonymisation
- Splitting => single complex column into multiple columns
- Deduplication

Data update patterns

- Overwrite: drop previous table to build again. Simplest but gets infeasible as data size grows
- Insert: add new rows, useful when new data independent of old data (e.g., data for new day)
- Upsert: update or insert
- Delete (soft or hard)

Best practices:

- Staging: helps prevent data loss
- Idempotency: running pipeline twice with same input give same output ("stateless", "functional")
- Normalisation vs. denormalisation
- Incrementality: try to make your pipeline incremental (reduce data changed each time)

Real-time data transformation: usually more complicated than batch transformation, Apache Spark has APIs that can do this

These days new tools come often, generally more powerful and simpler to use. Fundamental understanding and process stays the same.


# Data Orchestration

Data transformation happens in steps. An orchestrator help facilitate these steps, achieving:

- timely execution
- accurate and repeatable results
- resource efficiency and scalability
- automation (e.g., error handling & recovery, say with retry logic and patch code,

An orchestrator does this with:

- Scheduling management (like cron)
- Task triggers
- Monitoring tool and alerting
- Resource allocation (e.g., scaling)
- Compliance and auditing, say by creating an audit trail

Dependencies are usually represented by DAGs.

## Data orchestration tools

Options:

- Build a solution: only Uber/Airbnb scale need this, when tools in market can't handle the scale
- Buy an off-the-shelf tool: easy to get started, may have vendor lock in
- Self host
- Use tool associated with your data engineering platform


## Design Patterns and Best Practices

- Backfills: Make sure your pipeline is backwards compatible, so if you wake up with no data, you can run your pipeline all the way back to get data (implement conditional branching similar to data pipelines)
- Idempotence: Running the same pipelines many times yield same results. This required deduplication techniques:
  - Use UID check on insertion code
  - Use Upsert logic on insertion code (update existing records instead of duplicating)
  - Checkpointing (checkpoints throughout task so continue where it left off)
  - Transactional/Atomic operations with rollbacks
- Event-driven architecture: Keep data most up to date and avoids issues of scheduling overlap
- Conditional logic: 
- Concurrency: Independent tasks should be able to run in parallel
- Fast feedback loops: Set timeouts (can be adaptive to data size), parallelize tasks, validate data early, use heartbeats ...
- Retry and fallback logic: 
- Parameterized execution: Reusability
- Pipeline decomposition: Make pipelines small



# Pipeline Issues and Troubleshooting

Some desire properties of good pipelines

- Are easy to maintain and extend—that is, allow for quick error triage and new feature development
- Provide automated ways to handle errors in real time and recover from failure
- Incorporate a framework for improvement based on learning and experience



## Maintainability

Maintainability is important to consider as time spent maintaining a pipeline is a cost to your company.

Similar to basic SaaS offering pitch: pay for "small" fees up front (direct cost) so your developer don't have to build it from scratch and maintain it (indirect cost)



## Monitoring and Benchmarking


### Metrics

- Freshness: The timeliness and relevance of data in a system. It’s the measure of how up to date and current the data is compared with the real-world events it represents. Better freshness = more up-to-date analytics is done
  - The length between the most recent timestamp (in your
data) and the current timestamp
  - The lag between source data and your dataset
  - The refresh rate, e.g., by minute, hourly, daily
  - Latency (the total time between when data is acquired and
when it’s made available)
- Volume: Large data = more difficulty in dealing with (e.g., efficient storage, quick retrieval, processing speed)
- Quality: Quality involves ensuring that data is accurate, consistent, and reliable throughout its lifecycle. Think data quality checks at start of your data science projects
  - Uniqueness: are there duplicate rows in your dataset?
  - Completeness: how many nulls exist? Are they expected?
  - Validity: is data consistently formatted? Does it exist in the
proper range, e.g., greater than zero?


### Methods of monitoring

- Logging & Monitoring: write to logs that can be pulled up later
- Lineage: have some way to track the entire pipeline where the current data come from, all the way to "source" ($$ check what lineage tools are out there)
  - Which column -> From which table(s) -> From which version -> Of which pipeline -> From which source
- Anomaly detection: a good way to detect issues that not easily obvious to a human (also good for detecting vendor issues)
- Data diffs: diffs on data like software -> not used these tools much, sounds like a bad idea because we have many more magnitudes of data than code
- Assertions: assertions on data output, you can be sure 100% data conforms to your spec, these are simpler to check than more generic "anomaly detections". Check out the `great expectations` library



## Errors

### Error Handling

- Conditional logic: useful to handle errors you can handle
- Retry mechanisms: useful for automatically handling parts that you expect will fail sometime (e.g., HTTP request timeouts)
- Pipeline decomposition: decomposiing keep errors more contained in smaller components
- Alerting: reactive solving, be aware of alert fatigue

### Recovery









# Misc

**What happens when data changes and you need to modify code?**

You would need to reflect this change in code, if just changing the processing code for new data then the same code won't work for old data.

A few approaches. You can version data (v1, v2 ...) and have switch code to apply pipelines based on version

```python
def transform(data, version):
  if version == 'v1':
    v1_pipeline(data)
  else:
    v2_pipeline(data)
```

Or you can version with timestamp if time is a natural cutoff point:

```python
def transform(data, timestamp):
  CUTOFF = pd.Timestamp('2024-10-01')

  if timestamp <= CUTOFF:
    old_pipeline(data)
  else:
    new_pipeline(data)
```







