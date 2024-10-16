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

---

Source: https://madewithml.com/courses/mlops/


### Versioning

To properly version our models so we can have reproducibility, we need to version code, config, data, and model.

Data and model doesn't work well with git, as filse are large and tracing changes can lead to large git files (we care less about line-by-line diffs)

Instead, it's better to have VC on references to data and model files.

Potential tools:

- https://git-lfs.com/
- https://github.com/iterative/dvc


### Monitoring

Unlike traditional software, ML models don't have "exact" behaviours. As data changes, model performance can change, usually degrades.

Stuff to monitor

- System health (can use grafana similar to any piece of software)
- Performance (accuracy, F1 etc. or business metrics like click-through rate), may want multiple window sizes to catch degration as early as possible
  - https://madewithml.com/courses/mlops/monitoring/#importance-weighting
- Drift
  - Data drift (aka. feature drift, covariate drift): difference in data distribution for training and production (measure and compare stats). Data drift can cause model performance degration
  - Target drift: drift in output distribution, performance degration can be mitigated via retraining
  - Concept drift: P(y|X) distribution changes, ie. the mapping between input and output in production changed from training
  - We can locate drift with a sliding window, comparing production stats with reference stats.
  - 1D tests: KS test (https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test), Pearson's chi squared (https://en.wikipedia.org/wiki/Pearson%27s_chi-squared_test)
  - nD tests: https://arxiv.org/pdf/1810.11953, https://arxiv.org/abs/1802.03916, https://jmlr.csail.mit.edu/papers/v13/gretton12a.html
  - `alibi_detect`
  - Create alerts so we get notified



### Experiment tracking

Useful features

- Organise all necessary components of an experiment
- Reproduce past results easily
- Log iterative improvements

Tools:

- MLFlow (100% free, open source)
- CometML, Weights and Biases (these are hosted solutions)
- MLFlow helps you log your results and visualise them in the built-in dashboard tool
- Past experiment configs are stored as JSON files and loaded to reproduce (can use `ray` as well: https://www.ray.io/)


### Testing (code, data, model)

Example test codebase

```
tests/
├── code/
│   ├── conftest.py
│   ├── test_data.py
│   ├── test_predict.py
│   ├── test_train.py
│   ├── test_tune.py
│   ├── test_utils.py
│   └── utils.py
├── data/
│   ├── conftest.py
│   └── test_dataset.py
└── models/
│   ├── conftest.py
│   └── test_behavioral.py
```

Data tests:

- Expetation-based testing => test on expectation of what data should look like (e.g., these fields should be non-null, non-zero etc.)
  - https://github.com/great-expectations/great_expectations
- ^^ And create quality gates


Model tests:

- Sanity checks during training (shape of model output, decrease in loss, training to completion etc.)
- Behavioural testing => simple sanity input -> output maps

