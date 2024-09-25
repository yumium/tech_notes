# MLOps

Resources:

https://stanford-cs329s.github.io/syllabus.html

https://github.com/the-full-stack/fsdl-text-recognizer-2022-labs

https://madewithml.com/courses/mlops/data-engineering/


### Understanding ML production

ML research => scaling training, train fast, doing better on key benchmarks

|                        | Research                       | Production                                       |
| ---------------------- | ------------------------------ | ------------------------------------------------ |
| Objectives             | Model performance              | Different stakeholders have different objectives |
| Computational priority | Fast training, high throughput | Fast inference, low latency                      |
| Data                   | Static                         | Constantly shifting                              |
| Fairness               | Good to have (sadly)           | Important                                        |
| Interpretability       | Good to have                   | Important                                        |

Data versioning challenge

- Models and data more closely coupled
- How do we version data?
  - Line by line diffs don't work well
  - We want to avoid useless copying
  - How to merge changes?
  - How to validate correctness?
  - Detect feature changes?
  - Malicious data?
 
Model deployment challenge

- How do we deploy large models?
  - Too big to fit on device
  - Inference too slow
  - Consume too much energy

MLOps myths

- Deploying is easy. Deploying reliably is hard
- Number of models in production is high
- Model updates and deploying updates is fast (minute iteration)


Distributed training: https://docs.google.com/presentation/d/1RqbEbMDmxq53jhjVi9V30-DYMv0PiUqlNlTZsw9Vm9Y/edit#slide=id.p


### ETL / Data engineering

**Extract**: Extract data from sources, streaming or incremental (e.g., end of each month). Some data sources don't update you on what's changed, so you must extract entire copy and compare with current version to add the new / altered data. Usually stored in a staging area (in memory) before transforming

**Transform**: Data cleaning, quality audit, deduplication, normalisation, derivation, joining, splitting, summarisation, encrypting/decrypting etc.

**Load**: Usualy incremental load to persistent storage

ELT also works => in big data sometimes better to load raw to storage, the decide on how to process later. Also takes less time to load upfront. Downside is transformation is on analysis time which can be problematic if latency is needed. ETL takes longer to transform up front but you can analyse data immediately.



### Model deployment

Real-Time streaming -> inference engine and data source connected via broker service (e.g., Kafka), event-driven and scalable

Batch processing vs. stream processing

| Historical data                                                          | Streaming data                                                                    |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Databases, data warehouses                                               | Kafka, Kinesis, Pulsar, etc.                                                      |
| Batch features: age, gender, job, city, income, when account was created | Dynamic features: locations in the last 10 minutes, recent activities             |
| Bounded: know when a job finishes                                        | Unbounded: never finish                                                           |
| Processing kicked of periodically, in batch: e.g. MapReduce, Spark       | Processing can be kicked off as events arrive: e.g. Flink, Samza, Spark Streaming |

One model, two pipeline (batch and streaming) is a huge cause of errors

- Development environment vs. production environment
- Batch pipeline vs. streaming pipeline
- Development vs. monitoring

Instead, you can do one model one pipeline using e.g., Flink API

Stream/MCQ/HDFS => Batch/Stream processing (rabbit MQ/Spark) => Stream/MCQ/HDFS => Batch/Stream training (Spark streaming/Spark) => Model serving => Recommendation system

Batch prediction
- Generate predictions periodically before requests arrive
- Predictions are stored (e.g. SQL tables) and retrieved when requests arrive
- Async

Online prediction
- Generate predictions after requests arrive
- Predictions are returned as responses
- Sync when using requests like REST / RPC
  - HTTP prediction
- Async [with low latency) with real-time transports like Kafka / Kinesis
  - Streaming prediction

All apart from stream prediction is offered by most cloud providers

**Example batch prediction architecture**

App <---Requests/Precomputed predictions---> DB Warehouse <---Predictions/Batch features---> Prediction service

**Example online prediction architecture (HTTP)**

App <---Requests/Predictions---> Prediction Service <---Batch features--- DB Warehouse

**Example online prediction architecture (streaming)**

App <---Requests/Predictions---> Prediction Service <---Batch/streaming features--- DB Warehouse/Real-time transport

**Of course batch/stream is not black and white, but a spectrum**

Benefits of edge computing (vs. say Cloud computing)

- Can work without internet connection
- Don't need to worry about network latency
- Fewer concerns on privacy
- Cheaper

Challenges of ML on edge

- Hardware => plenty of startups to make hardware more powerful
- Model compression => make models smaller (quantization, knowledge distillation, pruning, low-ranked factorisation) => active field of research
- Model optimisation => make models faster


### Evaluating ML tools

Things that are useful:

- Friction in critical parts of the workflow
- Rapid prototyping / iteration (on both model and data!!)
- As few DSLs as possible
- Ergonomic
- Interopability w/other tools
- Quality of documentation
- Progressive complexity: easy to get started

Don’t Become A Tool Zealot

- It will narrow the way you think about problems.
- Introduces bias towards working on certain tasks over others (i.e. data cleaning vs crafting model architectures).
- Will prevent you from hiring diverse talent.
- Can lead to blindspots (ex: data drift, fairness ,etc).
- **Try new tools often**, especially ones that use a different approach.
- These are the same reasons you should **learn other programming languages**




