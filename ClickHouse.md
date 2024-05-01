# ClickHouse



## What is ClickHouse



ClickHouse

- High performance
- Column oriented
- For OLAP (online analytical processing)
- Open-source



OLAP meaning

- Processing: some data processed
- Analytical: to produce some analytical reports
- Online: in real-time

OLAP vs OLTP

- OLAP: building reports, based on large volume of data, doing it less freqeuently
- OLTP: handles streams of transactions, constantly modifying current state of data

Most business forces to create HTAP (Hybrid Transactional/Analytical Processing) to avoid maintaining multiple DBSMs for the same data.









OLAP scenario

- Datasets are massive (billions and trillions of rows)
- "Wide" tables: Many columns
- Column values are small
- Queries extract a large number of rows, but small subset of columns
- Query result is significantly smaller than source data
- Inserts happen in large batches
- No need for transaction
- Results must be returned in milliseconds or seconds



DBSM needs to be adapted to the type of data and query for a specific use case. When load is high, more customisation is needed to get high performance. If a system is adaptable to a wide range of scenarios, it will handle all scenarios poorly.

In a column based DB, the "rows" now become column fields, and the "columns" are rows of data for that field from N to N+M where M is the # of "columns".



**What makes ClickHouse so fast?**

Architecture choices => ClickHouse is initially built to do a single task well: filter and aggregate data as fast as possible

- Column-oriented storage: Only the needed columns are queried. So if data has 100 columns but only 5 is needed, expect at least a 20-fold performance boost
- Indexes: Using indexes to read only the necessary columns and their associated row range
- Data compression: Storing iteration of the same data type allows further compression. E.g., when the value doesn't change much, we can store them in a compressed delta format. This again means fewer disk I/Os
- Vectorized query execution: Storage and processing are both by column (vector = a part of a column)
- Scalability: Leverage all available CPU core and disks to execute even a single query. This can be scaled to a cluster.

Attention to Low-Level details => What makes the above point work even harder than other alternatives

- Even after picking the right data structure, there are low level details that can be altered. For Hash tables, it can be the hash function, collision resolution algorithm, memory layout ...
- Picking the right variation for each query is key to getting even more juice from the engine
- Out of the box specialized codecs for specific kinds of data, to get more performance on specific data
- Disk storage: keep data physically sorted by primary key allow fast indexing on normal hard drive, without needing to put everything on RAM
  - Extract specific value and range in less than a few dozen milliseconds
- Distributed processing on multiple servers. Data is stored in replicas on multiple servers and queries are processed on these replicas in parallel. This is new







Tips for building your own high-performance software from the ClickHouse team

- Keep in mind low-level details when designing your system.
- Design based on hardware capabilities.
- Choose data structures and abstractions based on the needs of the task.
- Provide specializations for special cases.
- Try new, "best" algorithms, that you read about yesterday.
- Choose an algorithm in runtime based on statistics.
- Benchmark on real datasets.
- Test for performance regressions in CI.
- Measure and observe everything.







## Quick Start



Real-time data feeds:

E.g. financial data: open price, price per tick (say 1 ms), close price, volumes.



```sql
CREATE TABLE ticks
{
	timestamp DateTime64 CODEC(Delta, Default),
	symbol	  LowCardinality(String),	/* dictionary encoding for performance */
	open 	  Nullable(Float64) CODEC(Delta, Default),
	volume	  Nullable(Float64) CODEC(Delta, Default),
	price	  Nullable(Float64) CODEC(Delta, Default)
}
ENGINE = MergeTree
ORDER BY (symbol, timestamp)
```

All 10000 stocks are updated at the same time, so for each second the `timestamp` value are the same. We can store them as deltas, so most will have value 0 and rest with small value. With the new encoding we can drop the # of bytes needed on disk (= faster read, disk I/O usually bottleneck).

​	e.g. 2.8GB => 1.8GB, less bytes on disk by smart encoding but I've lost nothing



```sql
INSERT INTO ticks _ FROM file( ... )
```

```sql
SELECT FormatReadableSize(total_bytes) FROM system.tables WHERE name = 'ticks'
```



```sql
SELECT
	symbol,
	argMax(open, timestamp) as open,
	argMax(volume, timestamp) as volume,
	argMax(price, timestamp) as price
FROM ticks
ORDER BY symbol
```



Optimising over nullables => nullables is stored in a different table, so longer query time. Instead, you can use a sentinel value like -1 (provided stock prices are non-negative)

```sql
CREATE TABLE ticks
{
	timestamp DateTime64 CODEC(Delta, Default),
	symbol	  LowCardinality(String),
	open 	  Float64 DEFAULT -1 CODEC(Delta, Default),
	volume	  Float64 DEFAULT -1 CODEC(Delta, Default),
	price	  Float64 DEFAULT -1 CODEC(Delta, Default)
}
ENGINE = MergeTree
ORDER BY (symbol, timestamp)
```

This reduces above query 0.9s => 0.7s



```sql
clickhouse benchmark --concurrency 10 --iterations 1- -q "SELECT ..."
```

We can benchmark our query against the table by simulating concurrent queries. In this case, it scales very badly, fulfilling 2 threads per second.



```sql
CREATE TABLE ticks_5min
{
	timestamp DateTime64 CODEC(Delta, Default),
	symbol	  LowCardinality(String),
	open 	  AggregateFunction(argMax, Float64, DateTime64),	/* Keep track of aggregate max */
	volume	  AggregateFunction(argMax, Float64, DateTime64),
	price	  AggregateFunction(argMax, Float64, DateTime64),
}
ENGINE = AggregatingMergeTree  /* Only aggregate every 5 minutes */
ORDER BY (symbol, timestamp)
```

```sql
CREATE MATERIALIZED VIEW ticks_mv TO ticks_5min
AS SELECT
	toStartOfFiveMinutes(timestamp) AS start,
	symbol,
	argMaxStateIf(open, timestamp, open >= 0) AS open,
	argMaxStateIf(volume, timestamp, volume >= 0) AS volume,
	argMaxStateIf(price, timestamp, price >= 0) AS price
FROM ticks
ORDER BY symbol, start
```

A materialized view is a pre-aggregation. You have a source table and destination table. The destination table stores statistics of the source table. The materialized view is triggered at every source insert and dumps the processed update to the destination table.

The core problem of aggregate queries is that it needs to scan the entire database. We can create a materialized view for the current max every 5 minutes. This way, the query will only need to go back maximum of 5 minutes to get the current max.

The materialized view is only 7.5MB instead of 1.8GB originally.

```sql
SELECT
	symbol,
	argMaxMerge(open) as open,
	argMaxMerge(volume) as volume,
	argMaxMerge(price) as price
FROM ticks_5min
ORDER BY symbol
```

Now the query takes 0.2s, a lot faster



To query the max at a specific point in time we need a combined query.

```sql
WITH '2022 04-05 21:57:30'::DateTime64 AS point_in_time
SELECT
	symbol,
    argMaxIf(open, timestamp, open >= 0) AS open,
    argMaxIf(volume, timestamp, volume >= 0) AS volume,
    argMaxIf(price, timestamp, price >= 0) AS price
FROM (
	SELECT
    	max(start) AS timestamp_outer,
    	symbol
    	argMaxMerge(open) as open
    	argMaxMerge(volume) as volume
    	argMaxMerge(price) as price
    FROM ticks_5min
    WHERE start <= toStartOfFiveMinute(point_in_time)
    GROUP BY symbol
) 
UNION ALL
(
	SELECT 
    	max(timestamp) AS timestamp_outer,
    	symbol,
		argMaxOrNullIf(open, timestamp, open >= 0) AS open,
		argMaxOrNullIf(volume, timestamp, volume >= 0) AS volume,
		argMaxOrNullIf(price, timestamp, price >= 0) AS price
	FROM ticks
    WHERE timestamp BETWEEN toStartOfFiveMinute(point_in_time) AND point_in_time
    GROUP BY symbol
)
GROUP BY symbol
```

This is slow, because `ticks` is ordered by (symbol, timestamp). As we have 10k symbols, we need to find the 3 minute window for each symbol chunk. That' slow.

The simplest fix is to order `ticks` by timestamp alone.

If you need to get per symbol data, it may be worth doing a projection of the table ordered by `symbol`. It may be worth to double your data size for faster queries.



Explaining

```sql
EXPLAIN indexes = 1 SELECT ...   /* Track the # of index queries */
```







## Basic Operations

**Creating tables**

```sql
CREATE DATABASE IF NOT EXISTS helloworld
```

```sql
CREATE TABLE helloworld.my_first_table
(
	user_id UInt32,
    message String,
    timestamp DateTime,
    metric Float32
)
ENGINE = MergeTree()
PRIMARY KEY (user_id, timestamp)
```

Table engine determines:

- How and where data is stored
- Which queries are supported
- Whether or not the data is replicated



Key concept: Primary keys in ClickHouse are not unique for each row in a table

Instead they specify how data is ordered. Every 8192 (2^13) rows or 10MB of data creates an entry in the primary key index file (sparce index).

If you don't specify `PRIMARY KEY` it is taken as the value of `ORDER BY`. 

If `PRIMARY KEY` and `ORDER BY` are both specified, then PRIMARY KEY must be a subset of or ORDER BY



**Inserting data**

```sql
INSERT INTO helloworld.my_first_table (user_id, message, timestamp, metric) VALUES
    (101, 'Hello, ClickHouse!',                                 now(),       -1.0    ),
    (102, 'Insert a lot of rows per batch',                     yesterday(), 1.41421 ),
    (102, 'Sort your data based on your commonly-used queries', today(),     2.718   ),
    (101, 'Granules are the smallest chunks of data read',      now() + 5,   3.14159 )
```

For large inserts, clickhouse can insert in batches to handle that level of volume.



**SELECT queries**

```sql
SELECT *
FROM helloworld.my_first_table
ORDER BY timestamp
FORMAT TabSeparated	  /* Specify the output format */
```



**Mutating data**

```sql
ALTER TABLE website.clicks
UPDATE url = substring(url, position(url, '://') + 3), visitor_id = new_visit_id
WHERE visit_date < '2022-01-01'
```

Mutating in one command in generally faster than separate commands



```sql
ALTER TABLE clicks ON CLUSTER main_cluster
DELETE WHERE visit_date < '2022-01-02 15:00:00' AND page_id = '573'
```

Deletion



```sql
DELETE FROM hits WHERE Title LIKE '%hello%'
```

Lightweight deletes => mark as deleted so they don't appear in subsequent queries, but actual data deletion happens afterwards asynchronously.



**Join Tables**

```sql
SELECT *
FROM imdb.roles 
  JOIN imdb.actors_dictionary
  ON imdb.roles.acotr_id = imdb.actors_dictionary.id
```

Supports the usual JOIN operations and niche ones (e.g., ASOF join)













## Advanced Guides







## Best Practices





## Data Formats

https://clickhouse.com/docs/en/integrations/data-formats/binary-native

Pretty straight forward, check for specifics.



## Clients and Drivers

### Python

https://clickhouse.com/docs/en/integrations/python

We use the SQLAlchemy dialect in the package `clickhouse_connect.cc_sqlalchemy`

**Connecting to clickhouse**

```python
import clickhouse_connect

client = clickhouse_connect.get_client(host='localhost', username='default', password='password')
```


**Sending commands**

```python
client.command('CREATE TABLE new_table (key UInt32, value String, metric Float64) ENGINE MergeTree ORDER BY key')
```

Use this when you want to execute commands that don't return any data, returns a single value, or a single row.

```python
result = client.command('SELECT count() FROM system.tables')
result
Out[7]: 110
```


**Insertions**

For more optional arguments: 

https://clickhouse.com/docs/en/integrations/python#client-insert-method

```python
row1 = [100, 'String Value 1000', 5.233]
row2 = [200, 'String Value 2000', -107.04]
data = [row1, row2]
client.insert('new_table', data, column_names=['key', 'value', 'metric'])
```

There are two specialized versions of the main insert method:

- insert_df -- Instead of Python Sequence of Sequences data argument, the second parameter of this method requires a dfargument that must be a Pandas Dataframe instance. ClickHouse Connect automatically processes the Dataframe as a column oriented datasource, so the column_oriented parameter is not required or available.
- insert_arrow -- Instead of a Python Sequence of Sequences data argument, this method requires an arrow_table. ClickHouse Connect passes the Arrow table unmodified to the ClickHouse server for processing, so only the database and settings arguments are available in addition to table and arrow_table.






**Querying**

```python
result = client.query('SELECT max(key), avg(metric) FROM new_table')
result.result_rows
Out[13]: [(2000, -50.9035)]
```

Pass in `SELECT` or `DESCRIBE` query.



The base `query` method returns a QueryResult object with the following public properties:

- result_rows -- A matrix of the data returned in the form of a Sequence of rows, with each row element being a sequence of column values.
- result_columns -- A matrix of the data returned in the form of a Sequence of columns, with each column element being a sequence of the row values for that column
- column_names -- A tuple of strings representing the column names in the result_set
- column_types -- A tuple of ClickHouseType instances representing the ClickHouse data type for each column in the result_columns
- query_id -- The ClickHouse query_id (useful for examining the query in the system.query_log table)
- summary -- Any data returned by the X-ClickHouse-Summary HTTP response header
- first_item -- A convenience property for retrieving the first row of the response as a dictionary (keys are column names)
- first_row -- A convenience property to return the first row of the result
- column_block_stream -- A generator of query results in column oriented format. This property should not be referenced directly (see below).
- row_block_stream -- A generator of query results in row oriented format. This property should not be referenced directly (see below).
- rows_stream -- A generator of query results that yields a single row per invocation. This property should not be referenced directly (see below).
- summary -- As described under the command method, a dictionary of summary information returned by ClickHouse
- The *_stream properties return a Python Context that can be used as an iterator for the returned data. They should only be accessed indirectly using the Client *_stream methods.


Query variants:

Consuming query results with Numpy, Pandas or Arrow. There are three specialized versions of the main query method:

- query_np -- This version returns a Numpy Array instead a ClickHouse Connect QueryResult.
- query_df -- This version returns a Pandas Dataframe instead of a ClickHouse Connect QueryResult.
- query_arrow -- This version returns a PyArrow Table. It utilizes the ClickHouse Arrow format directly, so it only accepts three arguments in common with the main query method: query, parameters, and settings. In addition, there is additional argument use_strings which determines whether the Arrow Table will render ClickHouse String types as strings (if True) or bytes (if False).


Client Streaming Query Methods. The ClickHouse Connect Client provides multiple methods for retrieving data as a stream (implemented as a Python generator):

- query_column_block_stream -- Returns query data in blocks as a sequence of columns using native Python object
- query_row_block_stream -- Returns query data as a block of rows using native Python object
- query_rows_stream -- Returns query data as a sequence of rows using native Python object
- query_np_stream -- Returns each ClickHouse block of query data as a Numpy array
- query_df_stream -- Returns each ClickHouse Block of query data as a Pandas Dataframe
- query_arrow_stream -- Returns query data in PyArrow RecordBlocks




## SQL Reference

Clickhouse have similar statements and functionalities to most other DB vendors (e.g., Postgresql)






















