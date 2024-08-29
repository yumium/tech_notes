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


### Transactional (ACID) support

Atomic: Each statement is a transaction, it either all executed or none at all

Consistency: Transactions make changes in predefined ways. Errors in data does not create unintended consequences

Isolation: Concurrent transactions don't intefere each other

Durability: Changes in data made by successfully executed transactions are saved

ACID means changes are transactional. So if power cuts in middle of transaction, it either succeeds or fails. Either case the DB is in a consistent state.

In clickhouse:

- Insertion into 1 partition, 1 table, of MergeTree family is transactional
- Insertion into multiple partitions, 1 table, of MergeTree family is transactional, and every partition transactional on its own
- Insertion into distributed table is not transactional as a whole, but each shard is transactional


### Deduplication strategies



## Managing clickhouse


### Deploying


#### Scaling out

Distributed Table Engine: data split on servers into shards

Basic architecture;

client; node1 (keeper, shard1_replica1); node2 (keeper, shard2_replica2)










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

Syntax matters:

- Spaces between syntactical constructions don't matter
- Comments: --, #, /* ... */
- SQL keywords (SELECT ...) is case insensitive. All other keywords (e.g., function names) are case sensitive


### Data Types

**Integer**

Signed:

- Int8 — TINYINT, INT1, BYTE, TINYINT SIGNED, INT1 SIGNED.
-Int16 — SMALLINT, SMALLINT SIGNED.
- Int32 — INT, INTEGER, MEDIUMINT, MEDIUMINT SIGNED, INT SIGNED, INTEGER SIGNED.
- Int64 — BIGINT, SIGNED, BIGINT SIGNED, TIME.

Unsigned:

- UInt8 — TINYINT, INT1, BYTE, TINYINT SIGNED, INT1 SIGNED.
- UInt16 — SMALLINT, SMALLINT SIGNED.
- UInt32 — INT, INTEGER, MEDIUMINT, MEDIUMINT SIGNED, INT SIGNED, INTEGER SIGNED.
- UInt64 — BIGINT, SIGNED, BIGINT SIGNED, TIME.

**Float**

Same type as the C types.

- Float32 — FLOAT, REAL, SINGLE.
- Float64 — DOUBLE, DOUBLE PRECISION.

Supports: Inf, -Inf, NaN

**Decimal**

https://clickhouse.com/docs/en/sql-reference/data-types/decimal

Fixed decimal places for precision. Addition, subtraction and multiplication don't lose precision. Division will truncate. Represented as integers.

Example: `1 - 0.9` evaluates to 0.09999999999999998 for `double`, but `0.1` for decimal.

Value ranges:

- Decimal32(S) - ( -1 * 10^(9 - S), 1 * 10^(9 - S) )
- Decimal64(S) - ( -1 * 10^(18 - S), 1 * 10^(18 - S) )
- Decimal128(S) - ( -1 * 10^(38 - S), 1 * 10^(38 - S) )
- Decimal256(S) - ( -1 * 10^(76 - S), 1 * 10^(76 - S) )

As most machines can't do 128-bit and 256-bit integer calculations natively, they are emulated. So these operations are slow.


**String**

Arbitrary length


**FixedString(N)**

Up to N bytes. More efficient when values are exactly N bytes. Examples: IP addresses, language codes, currency codes ...


**Date**

Stored in 2 bytes as # of days since unix epoch time.

```SQL
CREATE TABLE dt
(
	`timestamp` Date,
	`event_id` UInt8
)
ENGINE = TinyLog;
```

```SQL
INSERT INTO dt VALUES ('2019-01-01', 1), (17897, 2), (1546300800, 3);

SELECT * FROM dt;
```


**Date32**

Date stored as 32-bit integer (+/- Unix Epoch time). 


**DateTime**

Stored as 32-bit integer in Unix Timestamp format (resolution: second).

Generally slower than `Date`. This is because time is less compressible.


**DateTime64**

Stored as 64-bit integer in Unix Timestamp format, variable resolution

```SQL
DateTime64(precision, [timezone])
```

Example:

```SQL
CREATE TABLE dt64
(
	`timestamp` DateTime64(3, 'Asia/Istanbul'),
	`event_id` UInt8
)
```

Precision range [0:9]. Typical use: 3 (milliseconds), 6 (microseconds), 9 (nanoseconds).



**Enum**

Stored as 8-bit or 16-bit integers (range [-128, 127] and [-32768, 32767] respectively)

```SQL
CREATE TABLE t_enum
(
	x Enum('hello' = 1, 'world' = 2)
)
ENGINE = TinyLog
```

By default it assigns from 1, or you can specify starting enum.


**Bool**

Generally stored as UInt8. Possible values are `true` (1) and `false` (0).


**IPv4**

4 bytes as UInt32


**IPv6**

16 bytes as UInt128 big-endian


**Array(T)**

Example of creating an array

```SQL
SELECT array(1,2) AS x, toTypeName(x)
```

**Tuple(T1, T2 ...)**

Creating tuples on the fly using the `tuple` keyword

```SQL
SELECT tuple(1, 'a') as tup
```

Can also use just `()` literal like you do in Python

```SQL
SELECT ('a',) as tup
SELECT ('a', 1) as tup
SELECT ('a', 1, 'b') as tup
SELECT ('a') as not_a_tup
```

When creating tuples on the fly, type for each column is given as the smallest type to hold the elements.

Tuple comparison is done lexicographically

You can extract elements by index (1-based) or by name

```SQL
CREATE TABLE named_tuples (`a` Tuple(s String, i Int64)) ENGINE = Memory;
INSERT INTO named_tuples VALUES (('y', 10)), (('x',-10));

SELECT a.s FROM named_tuples; -- by name
SELECT a.2 FROM named_tuples; -- by index
```




**Map(K, V)**

**Variant(T1, T2 ...)**

Union of types


**LowCardinality(T)**

Convert datatype to dictionary encoding. Works especially well for data with less than 10,000 distinct values.

`LowCardinality` can provide same or higher efficiency than `Enums`. Prefer to use this for strings.

However, avoid using for small datatypes (`Int8`, `FixedString(8_bytes_or_less)`) because of overhead from encoding/decoding when querying). More details here: https://clickhouse.com/docs/en/operations/settings/settings#allow_suspicious_low_cardinality_types



**Nullable(T)**

Allow the type `T` to additionally take the value NULL.

Uses more storage as it creates a UInt8 column as mask on whether the value is NULL or not.

Up to 2x performance slow down.

Alternative would be to use a default value (which isn't always neat)

https://gist.github.com/den-crane/e43f8d0ad6f67ab9ffd09ea3e63d98aa





### Statements


#### SELECT

```SQL
[WITH expr_list|(subquery)]
-- DISTINCT = unique rows, DISTINCT ON (col1, col2 ...) = rows with unique values in cols specified
SELECT [DISTINCT [ON (column1, column2, ...)]] expr_list
-- Read data
[FROM [db.]table | (subquery) | table_function] [FINAL]  -- subquery = (SELECT ...); table1, table2 is like cross-join; FINAL merges the data before querying
-- Sampling subset of data (used for low latency, low data quality, or privacy reasons)
[SAMPLE sample_coeff]  -- SAMPLE 0.1 (fraction of data); SAMPLE 10000 (min # of rows); SAMPLE 1/10 OFFSET 1/2 (10% from 2nd half of data)
[ARRAY JOIN ...]
-- Joining tables (see later)
[GLOBAL] [ANY|ALL|ASOF] [INNER|LEFT|RIGHT|FULL|CROSS] [OUTER|SEMI|ANTI] JOIN (subquery)|table (ON <expr_list>)|(USING <column_list>)
-- Filter optimisation
[PREWHERE expr]  -- Only blocks with rows where `expr` is true is read. By default `WHERE` goes to `PREWHERE`
-- Filter
[WHERE expr]  -- E.g. WHERE (number > 10) AND (number % 3 == 0);
-- NULL is a value for group keys and NULL=NULL
-- SELECT, HAVING, and ORDER BY must follow with group cols or agg(non group cols)
[GROUP BY expr_list] [WITH ROLLUP|WITH CUBE] [WITH TOTALS]
-- Like WHERE but performed after aggregation
[HAVING expr]
-- See later
[WINDOW window_expr_list]
-- See later
[QUALIFY expr]
-- ORDER BY col1, col2; ORDER BY 2, 1 (idx of col); ORDER BY ALL (all cols); return order for rows with same selected col values is arbitrary
[ORDER BY expr_list] [ASC (default) / DESC] [WITH FILL] [FROM expr] [TO expr] [STEP expr] [INTERPOLATE [(expr_list)]]
-- First n rows for each distinct value of `expression`
[LIMIT [offset_value, ]n BY expression]
-- LIMIT n = first n rows of result; LIMIT n m / LIMIT m OFFSET n = first m rows after skipping first n rows of result
[LIMIT [n, ]m] [WITH TIES]
[SETTINGS ...]
-- INTERSECT (rows in both subqueries, result can contain duplicated rows); EXCEPT (rows in first subquery not second)
[UNION, INTERSECT, EXCEPT] [DISTINCT]
-- Redirect output to file
[INTO OUTFILE filename [COMPRESSION type [LEVEL level]] ]
-- Convert output to specific format
[FORMAT format]
```

Examples (roughly in order of statements)

```SQL
SELECT
    Title,
    count() * 10 AS PageViews
FROM hits_distributed
SAMPLE 0.1
WHERE
    CounterID = 34
GROUP BY Title
ORDER BY PageViews DESC LIMIT 1000
```

```SQL
SELECT sum(PageViews * _sample_factor)
FROM visits
SAMPLE 10000000
```

```SQL
SELECT * FROM limit_by ORDER BY id, val LIMIT 2 OFFSET 1 by id
```

On

```
┌─id─┬─val─┐
│  1 │  10 │
│  1 │  11 │
│  1 │  12 │
│  2 │  20 │
│  2 │  21 │
└────┴─────┘
```

Gives

```
┌─id─┬─val─┐
│  1 │  11 │
│  1 │  12 │
│  2 │  21 │
└────┴─────┘
```


#### JOIN

https://clickhouse.com/blog/clickhouse-fully-supports-joins-part1#left--right-semi-join

```SQL
SELECT <expr_list>
FROM <left_table>
[GLOBAL] [INNER|LEFT|RIGHT|FULL|CROSS] [OUTER|SEMI|ANTI|ANY|ALL|ASOF] JOIN <right_table>
(ON <expr_list>)|(USING <column_list>) ...
```

- [INNER|LEFT|RIGHT|FULL|CROSS]: As you expect. Default is [INNER]
- [OUTER]: Can be omitted

Other fancy join types in ClickHouse:

(explanation is given for LEFT variant. RIGHT variant is symmetrically defined)

- `LEFT SEMI JOIN`, `RIGHT SEMI JOIN`: For each row in LEFT, return column values if there is join key match on RIGHT, but only for first match. 
- `LEFT ANTI JOIN`, `RIGHT ANTI JOIN`: Return only rows in LEFT with no matching join key.
- `LEFT ANY JOIN`, `RIGHT ANY JOIN`: LEFT SEMI JOIN, and adding rows from LEFT with no join key with default values (e.g., NULL). So like SEMI + OUTER. (so return row count is same as LEFT).
- `INNER ANY JOIN`: 
- `ASOF JOIN`, `LEFT ASOF JOIN`: Join on closest join key matches instead of exact match.
- `PASTE JOIN`: Horizontal concat of the two tables

`ASOF JOIN` example:
```SQL
-- query
ASOF LEFT JOIN quotes q ON t.symbol = q.symbol AND t.time >= q.time
```

`ON` part is for exact match. `AND` part is for closest match (here match first row in `q` with time <= that in `t`)

ClickHouse currently doesn't support joins with no strict matching. And join columns must be one of the following types: Int, UInt, Float, Date, DateTime, Decimal.


#### CREATE

**DATABASE**

```SQL
CREATE DATABASE [IF NOT EXISTS] db_name [ON CLUSTER cluster] [ENGINE = engine(...)] [COMMENT 'Comment']
```

**TABLE**

```SQL
CREATE TABLE [IF NOT EXISTS] [db.]table_name [ON CLUSTER cluster]
(
    name1 [type1] [NULL|NOT NULL] [DEFAULT|MATERIALIZED|EPHEMERAL|ALIAS expr1] [compression_codec] [TTL expr1] [COMMENT 'comment for column'],
    name2 [type2] [NULL|NOT NULL] [DEFAULT|MATERIALIZED|EPHEMERAL|ALIAS expr2] [compression_codec] [TTL expr2] [COMMENT 'comment for column'],
    ...
) ENGINE = engine
  COMMENT 'comment for table, write description here'
```

- MATERIALIZED: Value of such columns always calculated at table init. They cannot be inserted.
- EPHEMERAL: Cannot be selected as they're not stored in table. They are only used in cases of generating a different column.
- ALIAS: Columns calculated from other columns. Not possible to insert into them

```SQL
CREATE OR REPLACE TABLE test
(
    id UInt64,
    unhexed String EPHEMERAL,
    hexed FixedString(4) DEFAULT unhex(unhexed)
)
ENGINE = MergeTree
ORDER BY id;

INSERT INTO test (id, unhexed) Values (1, '5a90b714');

SELECT
    id,
    hexed,
    hex(hexed)
FROM test
FORMAT Vertical;

Row 1:
──────
id:         1
hexed:      Z��
hex(hexed): 5A90B714
```

```SQL
CREATE OR REPLACE TABLE test
(
    id UInt64,
    size_bytes Int64,
    size String Alias formatReadableSize(size_bytes)
)
ENGINE = MergeTree
ORDER BY id;

INSERT INTO test Values (1, 4678899);

SELECT id, size_bytes, size FROM test;
┌─id─┬─size_bytes─┬─size─────┐
│  1 │    4678899 │ 4.46 MiB │
└────┴────────────┴──────────┘

SELECT * FROM test SETTINGS asterisk_include_alias_columns=1;
┌─id─┬─size_bytes─┬─size─────┐
│  1 │    4678899 │ 4.46 MiB │
└────┴────────────┴──────────┘
```

PRIMARY KEYS:

```SQL
CREATE TABLE db.table_name
(
    name1 type1, name2 type2, ...,
    PRIMARY KEY(expr1[, expr2,...])
)
ENGINE = engine;
```

OR

```SQL
CREATE TABLE db.table_name
(
    name1 type1, name2 type2, ...
)
ENGINE = engine
PRIMARY KEY(expr1[, expr2,...]);
```


CONSTRAINTS:

```SQL
CREATE TABLE [IF NOT EXISTS] [db.]table_name [ON CLUSTER cluster]
(
    name1 [type1] [DEFAULT|MATERIALIZED|ALIAS expr1] [compression_codec] [TTL expr1],
    ...
    CONSTRAINT constraint_name_1 CHECK boolean_expr_1,
    ...
) ENGINE = engine
```

Lots of constraints can degrade insertion performance.


ASSUME:

Like a constraint but assumed to be true. Used by optimisation engine to optimise queries

```SQL
CREATE TABLE users_a (
    uid Int16, 
    name String, 
    age Int16, 
    name_len UInt8 MATERIALIZED length(name), 
    CONSTRAINT c1 ASSUME length(name) = name_len   -- When length(name) is queries, optimiser can just return value of `name_len`, instead of calling `length()` function
) 
ENGINE=MergeTree 
ORDER BY (name_len, name);
```

**VIEW**

*Normal View*

No data is stored, basically acts as a stored query

```SQL
CREATE VIEW view AS SELECT ...
```

Using normal view

```SQL
SELECT a, b, c FROM view
```

which is equivalent to

```SQL
SELECT a, b, c FROM (SELECT ...)
```


*Parameterized View*

Like normal view but contains parameters

```SQL
CREATE VIEW raw_data_parametrized AS SELECT * FROM raw_data WHERE id BETWEEN {id_from:UInt32} AND {id_to:UInt32}
```

Using this parameterized view

```SQL
SELECT count() FROM raw_data_parametrized(id_from=0, id_to=50000)
```


*Materialized View*

```SQL
CREATE MATERIALIZED VIEW ...
```

View but result of query is stored


#### USE

Set current database for the session.

```SQL
USE db
```


#### SHOW

Show the creation code

```SQL
SHOW CREATE TABLE|DICTIONARY|VIEW name
```

Show databases

```SQL
SHOW DATABASES
SHOW DATABASES LIKE '%de%'
SHOW DATABASES NOT LIKE '%de%'
```

Show tables

```SQL
SHOW TABLES FROM system LIKE '%user%'
```

If `FROM` is not specified, use current database


Show columns

```SQL
SHOW COLUMNS FROM [<db>.]<table>
```

Show index

```SQL
SHOW INDEX FROM [<db>.]<table>
```


#### CHECK TABLE

Check data in table for data integrity (using checksums and size comparisons)

```SQL
CHECK TABLE test_table;
```




#### DESCRIBE TABLE

Describe table columns

```SQL
DESCRIBE TABLE table_name
```


#### EXPLAIN

https://www.youtube.com/watch?v=hP6G2Nlz_cA

Execution steps for executing a query

TCPHandler => executeQuery ==parse==> ASTPtr ==normalise&optimise==> TreeRewriterResult ==create_plan==> QueryPlan ==concrete==> QueryPipeline => BlockIO => PipelineExecutor

EXPLAIN AST for ASTPtr

EXPLAIN SYNTAX for TreeRewriterResult

EXPLAIN PLAN for QueryPlan

EXPLAIN PIPELINE for QueryPipeline (how plan is executed in parallel by multiple CPU cores)

`graph = 1`: visualise with graph
`graph = 1, compact = 0`: don't make graphs compact

Check server logs to see how it's actually executed




### Database Engines







### Table Engines


MergeTree Family: For fast inserion of data. Data is added in chunks, then merged to be written in the background. 

- `SummingMergeTree` and `AggregatingMergeTree` are where rows with same index are aggregated up before storing. Apply same aggregation function in query if data isn't merged yet
- `ReplicatingMergeTree`: Allow data replication (using Clickhouse Keeper or ZooKeeper)
- `CollapsingMergeTree`: In background asynchronously remove rows with same matching values apart from one "SIGN" column where one is 1 and another is -1.
- `ReplacingMergeTree`: Background remove duplicated rows. This task is in background and currently can't be controlled, so your queries can't rely on now having duplicated rows. More that it's a convenient background task that can clear up space. Use `FINAL` in query to force a merge and hence deduplication.


Log Family

Integrations: Integrates with external vendors

Special



### Functions

#### Regular Functions

Applied to each row separately. (in contrast to aggregate functions)

`Strong Typing`: No implicit type conversions => type conversion functions may be used

`Common Subexpression Elimination`: Done at AST optimisation

`NULL processing`: If at least one argument is `NULL`, the result is `NULL`

`Constancy`: Functions are pure = no change to arguments

`Higher-order functions, -> operator and lambda(params, expr) function`: Higher-order functions can only be called on lambda expressions, which are written by `->`

```SQL
x -> 2 * x
str -> str != Referer
```

**Arithmetic**

plus, minus, multiply, divide, modulo, negate, abs, gcd, lcm, max, min

**Bit**

bitAnd, bitOr, bitXor, bitNot, bitShiftLeft, bitShiftRight, bitRotateLeft, bitRotateRight

**Comparison**

equals/`=`/`==`, notEquals/`!=`/`<>`, `<`, `>`, `<=`, `>=`

**Conditional**

`if`

```SQL
SELECT if(1, plus(2, 2), plus(2, 6))
```

`multiIf` => a chain of if else statements

```SQL
    multiIf(left < right, 'left is smaller', left > right, 'left is greater', left = right, 'Both equal', 'Null value')
```

`greatest`

```SQL
SELECT greatest(1, 2, toUInt8(3), 3.) result,  toTypeName(result) type;
```

`least`

```SQL
SELECT least(1, 2, toUInt8(3), 3.) result,  toTypeName(result) type;
```



**Dates and Times**

https://clickhouse.com/docs/en/sql-reference/functions/date-time-functions

Similar to stuff you can do in `Pandas`

**Distance**

L1Norm, L2Norm, L1Distance, L2Distance, ...

**Encoding**



**Encryption**

Supports common encrypton/decryption schemes.

```SQL
INSERT INTO encryption_test VALUES('aes-256-ofb no IV', encrypt('aes-256-ofb', 'Secret', '12345678910121314151617181920212'))
```

```SQL
SELECT comment, decrypt('aes-256-cfb128', secret, '12345678910121314151617181920212') as plaintext FROM encryption_test
```

**Hash**

Support common hash functions

```SQL
SELECT halfMD5(array('e','x','a'), 'mple', 10, toDateTime('2019-06-15 23:00:00')) AS halfMD5hash, toTypeName(halfMD5hash) AS type;
```

**Logical**

and, or, not, xor

**Math**

Constants: e(), pi()

Functions: exp, log, log2, sqrt, sin, cos, tan, sign, sigmoid, factorial ...

**Random**

Simplest function: 

```SQL
SELECT rand();  -- Returns random UInt32
```

**Replacing in Strings**

```SQL
replaceOne(haystack, pattern, replacement)  -- Replaces first occurence
```

```SQL
replaceAll(haystack, pattern, replacement)
```

**Rounding**

floor, ceil, trunc, round, roundDown

**Searching/Splitting in Strings**

**Type Conversion**

toInt32, toUInt32, toFloat64, toDate, parseDateTime ...

**URLs**

domain(url), queryString(url) ...





**UDFs**





#### Aggregate Functions

All rows where the arguments in the function is `NULL` will be skipped.

Note, this gives flexibility on whether you want to discount `NULLs`. `count()` (called without arguments) will just count the # of rows, while `count(*)` or `count(expr)` will ignore NULLs.

Common functions: count, min, max, sum, avg, any, first_value, last_value, stddevPop(col1, col2), varPop(col1, col2), topK, deltaSum, boundingRatio (slope of min and max in group)






### CODECS

https://clickhouse.com/docs/en/sql-reference/statements/create/table#column-compression-codecs

`lz4` compression by default

General purpose codecs

- `NONE`: No compression
- `LZ4`: Lossless data compression algo
- `LZ4HC[level]`: Higher compression
- `ZSTD[level]`: ZSTD compression algo
- `ZSTD_QAT[level]`: Variant of ZSTD
- `DEFLATE_QPL`: Deflate compression algo

Specialized Codecs

- `Delta(delta_bytes)`: Raw values replaced by difference in neighbors, useful when values don't change much across rows. delta_bytes = 1, 2, 4, or 8
- `DoubleDelta(delta_bytes)`: Stores delta of delta, useful when first order derivative across rows is doesn't change much (e.g., storing consecutive timestamps)
- `GCD()`: Calculates GCD of all values in column, then divide all values by GCD
- `Gorilla(bytes_size)`: Takes the XOR of neighbors. Small if changes small
- `FPC(level, float_size)`: Use prediction function to predict next float, then XOR the prediction with actual and stores that. Again, compression strong if value changes are small. 
- `T64`: Crop unused high bits of values in integer data types for each whoe data part

Encryption Codecs

- ^^ These don't compress data, but encrypts data on disk





#### WINDOW

https://clickhouse.com/docs/en/sql-reference/window-functions

Syntax

```sql
aggregate_function (column_name)
  OVER ([[PARTITION BY grouping_column] [ORDER BY sorting_column] 
        [ROWS or RANGE expression_to_bound_rows_withing_the_group]] | [window_name])
FROM table_name
WINDOW window_name as ([[PARTITION BY grouping_column] [ORDER BY sorting_column])
```

Definitions

-   `PARTITION BY` - defines how to break a resultset into groups. (like group by)
-   `ORDER BY` - defines how to order rows inside the group during calculation aggregate_function.
-   `ROWS or RANGE` - defines bounds of a frame, aggregate_function is calculated within a frame.
-   `WINDOW` - allows multiple expressions to use the same window definition.

Note, window functions currently don't support `DateTime` intervals, but you can use `DateTime` functions like `toStartOfFiveMinutes` then do a `PARTITION` or `GROUP BY`.


```
      PARTITION
┌─────────────────┐  <-- UNBOUNDED PRECEDING (BEGINNING of the PARTITION)
│                 │
│                 │
│=================│  <-- N PRECEDING  <─┐
│      N ROWS     │                     │  F
│  Before CURRENT │                     │  R
│~~~~~~~~~~~~~~~~~│  <-- CURRENT ROW    │  A
│     M ROWS      │                     │  M
│   After CURRENT │                     │  E
│=================│  <-- M FOLLOWING  <─┘
│                 │
│                 │
└─────────────────┘  <--- UNBOUNDED FOLLOWING (END of the PARTITION)
```

Aggregation functions only allowed in window queries

-   `row_number()` - Number the current row within its partition starting from 1.
-   `first_value(x)` - Return the first non-NULL value evaluated within its ordered frame.
-   `last_value(x)` - Return the last non-NULL value evaluated within its ordered frame.
-   `nth_value(x, offset)` - Return the first non-NULL value evaluated against the nth row (offset) in its ordered frame.
-   `rank()` - Rank the current row within its partition with gaps.
-   `dense_rank()` - Rank the current row within its partition without gaps.
-   `lagInFrame(x)` - Return a value evaluated at the row that is at a specified physical offset row before the current row within the ordered frame.
-   `leadInFrame(x)` - Return a value evaluated at the row that is offset rows after the current row within the ordered frame.

Examples

```sql
-- sliding frame - 1 PRECEDING ROW AND CURRENT ROW
SELECT
    part_key,
    value,
    order,
    groupArray(value) OVER (
        PARTITION BY part_key 
        ORDER BY order ASC
        Rows BETWEEN 1 PRECEDING AND CURRENT ROW
    ) AS frame_values
FROM wf_frame
ORDER BY
    part_key ASC,
    value ASC;

┌─part_key─┬─value─┬─order─┬─frame_values─┐
│        1 │     1 │     1 │ [1]          │
│        1 │     2 │     2 │ [1,2]        │
│        1 │     3 │     3 │ [2,3]        │
│        1 │     4 │     4 │ [3,4]        │
│        1 │     5 │     5 │ [4,5]        │
└──────────┴───────┴───────┴──────────────┘
```

```sql
-- row_number does not respect the frame, so rn_1 = rn_2 = rn_3 != rn_4
SELECT
    part_key,
    value,
    order,
    groupArray(value) OVER w1 AS frame_values,
    row_number() OVER w1 AS rn_1,
    sum(1) OVER w1 AS rn_2,
    row_number() OVER w2 AS rn_3,
    sum(1) OVER w2 AS rn_4
FROM wf_frame
WINDOW
    w1 AS (PARTITION BY part_key ORDER BY order DESC),
    w2 AS (
        PARTITION BY part_key 
        ORDER BY order DESC 
        Rows BETWEEN 1 PRECEDING AND CURRENT ROW
    )
ORDER BY
    part_key ASC,
    value ASC;
┌─part_key─┬─value─┬─order─┬─frame_values─┬─rn_1─┬─rn_2─┬─rn_3─┬─rn_4─┐
│        1 │     1 │     1 │ [5,4,3,2,1]  │    5 │    5 │    5 │    2 │
│        1 │     2 │     2 │ [5,4,3,2]    │    4 │    4 │    4 │    2 │
│        1 │     3 │     3 │ [5,4,3]      │    3 │    3 │    3 │    2 │
│        1 │     4 │     4 │ [5,4]        │    2 │    2 │    2 │    2 │
│        1 │     5 │     5 │ [5]          │    1 │    1 │    1 │    1 │
└──────────┴───────┴───────┴──────────────┴──────┴──────┴──────┴──────┘
```


## Guides

### Observability

https://clickhouse.com/docs/en/observability

Pretty detailed guide on how to build your observability infra with clickhouse. 


### Advanced guides

#### Projections

```sql
ALTER TABLE uk_price_paid
ADD PROJECTION prj_aggregates
(
    SELECT
	town,
	max(price),
	avg(price),
    GROUP BY town
);
```

Projections acts as a convenient way to add materialised views. The view is added internally, and now all queries can be sent to source table, if the query can be faster on materialised view the view is used instead.













## Miscellaneous


### Partitions

When specifying table schema, you can optionally specify partition key. Rows with the same partition key are physicall stored together.

Queries that can specify which partition(s) is needed generally reduces partition reads, and hence improves performance.

Queries that have results in many partitions will increase partition reads, and hence degrade performance.

More partitions mean slower ingestion time (as need to map where data goes) but potentially faster deletion time if whole partition can be dropped.

Rule of thumb is use partitions if a majority of queries use a small # of partitions, and keep cardinality of partition key low.






### Materialised Views

Materialised view is essentially a query with a trigger. When the source table is inserted, it triggers the view to update/append new rows to the target table.

```sql
CREATE MATERIALIZED VIEW up_down_votes_per_day_mv TO up_down_votes_per_day AS
SELECT toStartOfDay(CreationDate)::Date AS Day,
       countIf(VoteTypeId = 2) AS UpVotes,
       countIf(VoteTypeId = 3) AS DownVotes
FROM votes
GROUP BY Day
```

In this example, new rows added to the same day will update the aggregation value. So MVs in clickhouse is more performant than other DBs as it doesn't do a full refresh.

MVs can be chained where each subsequent table provide a higher level of aggregation
https://clickhouse.com/blog/chaining-materialized-views

Note, MVs don't support MVs from joins, as it's unclear when the query will be triggered. However, you can have multiple MVs inserting to the same target table

```sql
CREATE TABLE analytics.daily_overview
(
    `on_date` Date,
    `domain_name` String,
    `impressions` SimpleAggregateFunction(sum, UInt64),
    `clicks` SimpleAggregateFunction(sum, UInt64)
) ENGINE = AggregatingMergeTree ORDER BY (on_date, domain_name)

CREATE MATERIALIZED VIEW analytics.daily_impressions_mv
TO analytics.daily_overview
AS                                                
SELECT
    toDate(event_time) AS on_date,
    domain_name,
    count() AS impressions,
    0 clicks         ---<<<--- if you omit this, it will be the same 0
FROM                                              
    analytics.impressions
GROUP BY
    toDate(event_time) AS on_date,
    domain_name
;

CREATE MATERIALIZED VIEW analytics.daily_clicks_mv
TO analytics.daily_overview
AS
SELECT
    toDate(event_time) AS on_date,
    domain_name,
    count() AS clicks,
    0 impressions    ---<<<--- if you omit this, it will be the same 0
FROM
    analytics.clicks
GROUP BY
    toDate(event_time) AS on_date,
    domain_name
;
```

There's also refreshable materialised view, which has an interavl-based trigger (say evey hour). This is useful for complex queries that can't be done in an incremental way (e.g., joins). Downside is it doesn't scale as well as incremental, as query needs to be rerun on whole dataset each trigger, rather than incrementally on new data.








### system.parts, system.columns
- View storage size with `system.parts` and `system.columns`, usually paired with function `formatReadableSize`
  - A `part` is simply a file in the system. A `partition` is a logical grouping of data, where rows with the same partition are grouped together.
  - Partition works well when operations tend to operate on 1 partition at a time (e.g., queries on one partition only (less reads if partitions are used), remove by partition (e.g., partition by date then retain only last 7 days of data))
  - Recommend no more than 100 partitions. 1000 can be okay but may see performance degrade (reading across many partitions will be slower)

### clickhouse-benchmark

Benchmarking critical queries

```
$ clickhouse-benchmark --query ["single query"] [keys]
```

### Query caching

If a query is expensive, you can enable query caching on the query level. Further execution of the same query will reuse the computed result.

If the underlying table changes or anything that may invalidate the cache, clickhouse will do a fresh execution.

```sql
SELECT some_expensive_calculation(column_1, column_2)
FROM table
SETTINGS use_query_cache = true;
```

You can use in addition `enable_writes_to_query_cache` and `enable_reads_from_query_cache` to add more fine-grain control. The below query can only use query cache passively

```sql
SELECT some_expensive_calculation(column_1, column_2)
FROM table
SETTINGS use_query_cache = true, enable_writes_to_query_cache = false;
```

Enable it in clickhouse config, how many bytes you want for query cache.

You can check your query cache at `system.query_cache` table.

Drop your query cache with `SYSTEM DROP QUERY CACHE`

### Query profiling

You can read more details on performance in `system.processors_profile_log` table

More details here: https://clickhouse.com/docs/en/operations/optimizing-performance/sampling-query-profiler

Open MR to add `EXPLAIN ANALYZE` command to parse this table: https://github.com/ClickHouse/ClickHouse/issues/40051


### Group by implementations

Sorting implementation => sort the rows by group by columns, then calculate the aggregation
Good if data already sorted on group by columns, but slow to sort otherwise

Hash implementation => scan through the rows to get all distinct column tuples, hash them and store in memory (these are your output rows). Then load data into memory in blocks, increment on the aggregates by matching on the group by column using the hash.
Efficient for a large table grouping on unsorted columns, but memory intensive

Index implementation => scan through needed parts of group by columns by index, and group rows are already consecutive as they're sorted by index
Low memory footprint











