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
- # of models in production is high
- Model updates and deploying updates is fast (minute iteration)


Distributed training: https://docs.google.com/presentation/d/1RqbEbMDmxq53jhjVi9V30-DYMv0PiUqlNlTZsw9Vm9Y/edit#slide=id.p


### Model deployment

Real-Time streaming -> inference engine and data source connected via broker service (e.g., Kafka), event-driven and scalable

Batch processing vs. stream processing

| Historical data                                                          | Streaming data                                                                    |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Databases, data warehouses                                               | Kafka, Kinesis, Pulsar, etc.                                                      |
| Batch features: age, gender, job, city, income, when account was created | Dynamic features: locations in the last 10 minutes, recent activities             |
| Bounded: know when a job finishes                                        | Unbounded: never finish                                                           |
| Processing kicked of periodically, in batch: e.g. MapReduce, Spark       | Processing can be kicked off as events arrive: e.g. Flink, Samza, Spark Streaming |




