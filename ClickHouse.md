# ClickHouse



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

All 10000 stocks are updated at the same time, so for each second the `timestamp` value are the same. We can store them as deltas, so most will have value 0 and rest with small value. With the new encoding we can drop the # of bytes needed on disk (= faster read).





