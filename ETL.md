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





**Change data capture**: see wiki page





