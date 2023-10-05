# Apache Spark

Apache Spark is a unified analytics engine for large-scale data processing. It provides an interface for programming clusters (in Java, Scala, Python and R), with implicit *data parallelism* and *fault tolerance*.

The project spun out of UCBerkley's AMPLab and is later donated to the Apache Software Foundation.

The secret sauce of Spark is the resilient distributed dataset (RDD). Workflow is represented as a DAG, where nodes are RDDs and edges are operations on them. Spark is able to get 10x ~ 100x latency improvements over MapReduce equivalents.



Docs: https://spark.apache.org/docs/latest/



ASIDE => MapReduce paradigm

MapReduce is an early paradigm for concurrent data processing, used pervasively in Google back in early 2000s. The idea is to break data processing functions into the following steps:

1. **Map**: Each worker node applies `map` function to the local data, in parallel, writing output to temporary storage
2. **Shuffle**: Worker nodes redistribute data based on output keys, such that all data belonging to one key is located on the same worker node
3. **Reduce**: Worker nodes process each group of output data, per key, in parallel

Although breaking down funtions into `map` and `reduce` makes it slower to run on single-threaded machine, it can be significantly faster to run on a cluster/grid.

​	cluster => nodes in same local network & similar hardware; grid => nodes shared geographically & heterogeneous hardware



Canonical MapReduce example - counting appearance of words in documents

```scala
def map(document: List[String]) {
    // document: document contents
    document.foreach( word => emit(word, 1) )
}

def reduce(word: String, partialCounts: List[String]) {
    // word: the key of the map output, which is the word
    // partialCounts: list of map output of the key `word`
    var sum = 0
    partialCounts.foreach( _ => sum += 1 )
    emit(word, sum)
}
```



An astute reader may notice the necessary requirement for validity that the output of the map operation must be a Monoid (here it's Monoid(Int, +, 0)). As reduce function is carried out on the map output in any order within elements of the same key, we need *associativity* on the operation. And to account for nodes with no data being reduced, we need the *unit*.

```scala
def reduce(key: A, pairs: List[Tuple(A, B <: Monoid)])
```





<u>Benefits of MapReduce</u>: data parallelism, easy to write, high fault tolerance (if one worker fails, its task can be picked up by other workers and will not jeapodize the entire function)

<u>Drawbacks of MapReduce</u>: balance communication cost, too simple to be flexible, linear structure



END ASIDE <=





<u>Spark integrates with popular platforms</u>

Data Science and ML: scikitlearn, pandas, TensorFlow, PyTorch, MLFlow, R, NumPy

SQL Analytics and BI: Apache Superset, PowerBI, Looker, Redash, tableau, dbt

Storage and Architecture: elasticsearch, mongoDB, Apache Kafka, delta lake, kubernetes, Apache Airflow, Parquet ...



<u>To use Spark, we need</u>

A cluster manager: Amazon EC2, Standalone Deployment Mode, Apache Mesos (deprecated), YARN, Kubernetes

A distributed storage system: Hadoop DFS, Cassandra, AWS S3 ...



<u>Spark Products</u>

Spark Core: core, generic capabilities

Spark SQL: Sits on top of Spark Core that provides a DSL to manipulate DataFrames. Used for structured and semi-structured data.

Spark Streaming: Uses Spark Core's fast scheduling capability to perform streaming analytics. It ingests data in mini-batches and performs RDD transformations on those mini-batches of data => hence uses the same interface. Build-in support to consume data from Kafka, Flume, Twitter, ZeroMQ, Kinesis, TCP/IP sockets

MLlib ML: Distributed ML framework that uses Spark Core, leveraging its distributed memory-based Spark architecture. This library comes with scalable ML and statistical algorithms

GraphX: Distributed graph processing framework





Below are some documentation that I've written down as I'm learning Spark

And yes I am using Python, which is a lot uglier than Scala but this is what Research Data Platform uses so oh well.





## Quick start

Loading a dataset (here we're using the README file from Spark's public repo)

```python
>>> textfile = spark.read.text("README.md")
```

This loads a Dataset and all Datasets in Python have type Dataset[Row] as Python isn't strongly typed. We call it DataFrame to be consistent with Pandas and R.



Operations on data are split into 2 categories, transformations and actions.

Actions are executed immediately upon call and produces a value

```python
>>> textFile.count()
126

>>> textFile.first()
Row(value=u"# Apache Spark")
```



Transformations record the operations that are to be done on DataFrames, yielding new DataFrames. Transformations can be chained for form a DAG. These operations are done in lazy fashion, so will not be executed unless necessary.

```python
linesWithSpark = textFile.filter(textFile.value.contains("Spark"))
```



We can chain transformations and actions together

```python
>>> textFile.filter(textFile.value.contains("Spark")).count()
15
```



When a transformation is reused multiple times, it may be a good idea to cache the result of that transformation.

```python
>>> linesWithSpark.cache()

>>> linesWithSpark.count()
15

>>> linesWithSpark.count()
15
```

It seems silly to use Spark to cache a 100-line text file. But the magic of Spark is that the same API and concepts can be used to scale to much larger data sets, striped across tens or hundreds of nodes.



Sometimes we can write self-contained applications instead of doing things interactive with the prompt

```python
"""SimpleApp.py"""
from pyspark.sql import SparkSession

logFile = "YOUR_SPARK_HOME/README.md"  # Should be some file on your system
spark = SparkSession.builder.appName("SimpleApp").getOrCreate()
logData = spark.read.text(logFile).cache()

numAs = logData.filter(logData.value.contains('a')).count()
numBs = logData.filter(logData.value.contains('b')).count()

print("Lines with a: %i, lines with b: %i" % (numAs, numBs))

spark.stop()
```

... and running the app

```python
# Use spark-submit to run your application
$ YOUR_SPARK_HOME/bin/spark-submit \
  --master local[4] \
  SimpleApp.py
...
Lines with a: 46, Lines with b: 23
```









## RDD Programming

Before Spark 2.0, the main programming interface of Spark was the Resilient Distributed Dataset (RDD). After Spark 2.0, RDDs are replaced by Dataset, which is strongly-typed like an RDD, but with richer optimizations under the hood. The RDD interface is still supported, and you can get a more detailed reference at the [RDD programming guide](https://spark.apache.org/docs/latest/rdd-programming-guide.html). However, we highly recommend you to switch to use Dataset, which has better performance than RDD.

But it's still useful to understand RDD programming as that's what the later technology is based upon.



#### An RDD program

A spark application consists of a *driver program* that runs the user's `main` function and executes *parallel operations* on a cluster. The main abstraction of Spark is the Resilient Distributed Dataset (RDD) = a collection of elements partitioned across nodes for parallel operation. RDDs are:

- created by starting with a file in HDFS (or other file systems) and transforming it
- persisted by calling the *persist* operation, to commit RDD in memory for reuse
- recovered from node failures by Spark

These functions provide high efficiency and fault tolerance to distributed data functions.



To run a Spark program we need to feed it with a `SparkContext` object, which tells Spark how to access a cluster. To create a SparkContext object, we need to first build a `SparkConf` object that contains information about your application

```python
conf = SparkConf().setAppName(appName).setMaster(master)
sc = SparkContext(conf=conf)

# setAppName sets the display name on the clusters
# setMaster sets the Spark, Mesos or YARN cluster URL
```

In practice,

- if we launch spark application with `spark-submit`, the `master` will not be hardcoded but rather received from there
- if we use PySpark shell, the SparkContext is accessible by variable `sc`



#### Creating RDDs

Again, RDDs are fault-tolerant collection of elements that can be operated in parallel. We can create RDDs by parallelizing existing collection in your drive program, or reference a dataset in an external storage system

<u>Parallelized collections</u>

```python
data = [1,2,3,4,5]
distData = sc.parallelize(data)
```

Here Spark will distribute the object `data` over clusters so they can be operated on in parallel later. This is data parallelism. E.g.:

```python
sum = distData.reduce(lambda a, b: a+b)
```

Spark sets the # of partitions for each cluster automatically, but you can set this manually as well

```python
distData = sc.parallelize(data, 5)
```

A partition is a logical chunk in the data. Operations are performed on each partition in parallel, so partition becomes the unit in parallel computations.



<u>External datasets</u>

RDDs can also be created from external datasets: HDFS, Cassandra, HBase, AWS S3 ...

Text file RDDs can be created using `textFile` method, on local file path, URI for external files (hdfs://, s3a:// ...)

```python
distFile = sc.textFile("/home/bob/output.text")
numLines = distFile.map(lambda s: len(s)).reduce(lambda a, b: a+b)
```

Some notes:

- If we're using a local file path, the file must be accessible to all worker nodes.
- `textFile` supports directories & wildcard patterns as well
- `textFile` also takes in an optional second argument on the # of partitions

PySpark also support other data formats: `SparkContext.wholeTextFiles`, `RDD.savedAsPickleFile`, `SparkContext.pickleFile`, `SequenceFile`, and `Hadoop I/O file`







#### RDD operations

As mentioned before, RDD operations can be split into *transformations* and *actions*. 

Transformations are lazy, so no computation will be done unless actions like `reduce` trigger it. This improves performance of Spark.



<u>Passing functions to spark</u>

Spark's API relies heavily on passing functions (after being serialized) to the driver program to run on the cluster. There are 3 recommended ways to do this:

- Lambda expressions
- Local `defs` inside the function calling Spark
- Top-level functions in module

Example:

```python
if __name__ == '__main__':
    def myFunc(s):
        words = s.split(' ')
        return len(words)
    
    sc = SparkContext(config)
    sc.textFile('file.txt').map(myFunc)
```



Note that when we pass a reference to a method in the class, the entire object instance will be passed to each node in the cluster, which can reduce efficiency

```python
class MyClass(object):
    def func(self, s):
        return s
    
    def doStuff(self, rdd):
        return rdd.map(self.func)
```

```python
class MyClass(object):
	def __init__(self):
		self.field = 'Hello'

	def doStuff(self, rdd):
        return rdd.map(lambda s: self.field + s)
```

In both cases the entire object instance will have to be passed to worker nodes.

The simplest way to avoid this is to copy `field` into a local variable.

```python
def doStuff(self, rdd):
    field = self.field
    return rdd.map(lambda s: field + s)
```







<u>Closures</u>

When code/functions are serialized and passed to worker nodes for execution, all the dependent variables and methods also sent along to the worker nodes.

```python
counter = 0
rdd = sc.parallelize(data)

# Wrong: Don't do this!!
def increment_counter(x):
    global counter
    counter += x
rdd.foreach(increment_counter)

print("Counter value: " + counter)
```

In this code, to parallelize the `foreach` function, the copy of `counter` will be sent to the worker nodes and each will update their local `counter` value. So the final print will return 0. Sometimes execution in the same JVM may give the right result. 

To guarantee a uniform result, please use the `Accumulator` shared variable type.



The same can be said about printing. `rdd.map(println)` will let each worker node print the results in their own local `stdout`. To print it in the driver node, we need to first move the data back using `collect()`, like so:

```python
rdd.collect().foreach(println)
```

To prevent flooding the driver node w/ too much data, it may be better to send over just some of it:

```python
rdd.take(100).foreach(println)
```





<u>Key-Value Pairs</u>

When working with key-value pairs, sometimes we want to use the `shuffle` operation that apply a function to pairs with the same key. In Python, the key-value pair is represented with the tuple

```python
myList = ['apple', 'orange', 'apple']
distList = sc.parallelize(myList)

pairs = distList.map(lambda s: (s,1))
counts = pairs.reduceByKey(lambda a, b: a+b).sortByKey().collect()
# [('apple', 2), ('orange', 1)]
```

The above code implements the classic MapReduce example.





<u>Transformations</u>

Common transformations

| Transformation                                               | Meaning                                                      |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| **map**(*func*)                                              | Return a new distributed dataset formed by passing each element of the source through a function *func*. |
| **filter**(*func*)                                           | Return a new dataset formed by selecting those elements of the source on which *func* returns true. |
| **flatMap**(*func*)                                          | Similar to map, but each input item can be mapped to 0 or more output items (so *func* should return a Seq rather than a single item). |
| **mapPartitions**(*func*)                                    | Similar to map, but runs separately on each partition (block) of the RDD, so *func* must be of type Iterator<T> => Iterator<U> when running on an RDD of type T. |
| **mapPartitionsWithIndex**(*func*)                           | Similar to mapPartitions, but also provides *func* with an integer value representing the index of the partition, so *func* must be of type (Int, Iterator<T>) => Iterator<U> when running on an RDD of type T. |
| **sample**(*withReplacement*, *fraction*, *seed*)            | Sample a fraction *fraction* of the data, with or without replacement, using a given random number generator seed. |
| **union**(*otherDataset*)                                    | Return a new dataset that contains the union of the elements in the source dataset and the argument. |
| **intersection**(*otherDataset*)                             | Return a new RDD that contains the intersection of elements in the source dataset and the argument. |
| **distinct**([*numPartitions*]))                             | Return a new dataset that contains the distinct elements of the source dataset. |
| **groupByKey**([*numPartitions*])                            | When called on a dataset of (K, V) pairs, returns a dataset of (K, Iterable<V>) pairs. **Note:** If you are grouping in order to perform an aggregation (such as a sum or average) over each key, using `reduceByKey` or `aggregateByKey` will yield much better performance. **Note:** By default, the level of parallelism in the output depends on the number of partitions of the parent RDD. You can pass an optional `numPartitions` argument to set a different number of tasks. |
| **reduceByKey**(*func*, [*numPartitions*])                   | When called on a dataset of (K, V) pairs, returns a dataset of (K, V) pairs where the values for each key are aggregated using the given reduce function *func*, which must be of type (V,V) => V. Like in `groupByKey`, the number of reduce tasks is configurable through an optional second argument. |
| **aggregateByKey**(*zeroValue*)(*seqOp*, *combOp*, [*numPartitions*]) | When called on a dataset of (K, V) pairs, returns a dataset of (K, U) pairs where the values for each key are aggregated using the given combine functions and a neutral "zero" value. Allows an aggregated value type that is different than the input value type, while avoiding unnecessary allocations. Like in `groupByKey`, the number of reduce tasks is configurable through an optional second argument. |
| **sortByKey**([*ascending*], [*numPartitions*])              | When called on a dataset of (K, V) pairs where K implements Ordered, returns a dataset of (K, V) pairs sorted by keys in ascending or descending order, as specified in the boolean `ascending` argument. |
| **join**(*otherDataset*, [*numPartitions*])                  | When called on datasets of type (K, V) and (K, W), returns a dataset of (K, (V, W)) pairs with all pairs of elements for each key. Outer joins are supported through `leftOuterJoin`, `rightOuterJoin`, and `fullOuterJoin`. |
| **cogroup**(*otherDataset*, [*numPartitions*])               | When called on datasets of type (K, V) and (K, W), returns a dataset of (K, (Iterable<V>, Iterable<W>)) tuples. This operation is also called `groupWith`. |
| **cartesian**(*otherDataset*)                                | When called on datasets of types T and U, returns a dataset of (T, U) pairs (all pairs of elements). |
| **pipe**(*command*, *[envVars]*)                             | Pipe each partition of the RDD through a shell command, e.g. a Perl or bash script. RDD elements are written to the process's stdin and lines output to its stdout are returned as an RDD of strings. |
| **coalesce**(*numPartitions*)                                | Decrease the number of partitions in the RDD to numPartitions. Useful for running operations more efficiently after filtering down a large dataset. |
| **repartition**(*numPartitions*)                             | Reshuffle the data in the RDD randomly to create either more or fewer partitions and balance it across them. This always shuffles all data over the network. |
| **repartitionAndSortWithinPartitions**(*partitioner*)        | Repartition the RDD according to the given partitioner and, within each resulting partition, sort records by their keys. This is more efficient than calling `repartition` and then sorting within each partition because it can push the sorting down into the shuffle machinery. |





<u>Actions</u>

Common actions. For most functions there are also asynchronous options that will return a future object right away instead of blocking.

| Action                                             | Meaning                                                      |
| :------------------------------------------------- | :----------------------------------------------------------- |
| **reduce**(*func*)                                 | Aggregate the elements of the dataset using a function *func* (which takes two arguments and returns one). The function should be commutative and associative so that it can be computed correctly in parallel. |
| **collect**()                                      | Return all the elements of the dataset as an array at the driver program. This is usually useful after a filter or other operation that returns a sufficiently small subset of the data. |
| **count**()                                        | Return the number of elements in the dataset.                |
| **first**()                                        | Return the first element of the dataset (similar to take(1)). |
| **take**(*n*)                                      | Return an array with the first *n* elements of the dataset.  |
| **takeSample**(*withReplacement*, *num*, [*seed*]) | Return an array with a random sample of *num* elements of the dataset, with or without replacement, optionally pre-specifying a random number generator seed. |
| **takeOrdered**(*n*, *[ordering]*)                 | Return the first *n* elements of the RDD using either their natural order or a custom comparator. |
| **saveAsTextFile**(*path*)                         | Write the elements of the dataset as a text file (or set of text files) in a given directory in the local filesystem, HDFS or any other Hadoop-supported file system. Spark will call toString on each element to convert it to a line of text in the file. |
| **saveAsSequenceFile**(*path*) (Java and Scala)    | Write the elements of the dataset as a Hadoop SequenceFile in a given path in the local filesystem, HDFS or any other Hadoop-supported file system. This is available on RDDs of key-value pairs that implement Hadoop's Writable interface. In Scala, it is also available on types that are implicitly convertible to Writable (Spark includes conversions for basic types like Int, Double, String, etc). |
| **saveAsObjectFile**(*path*) (Java and Scala)      | Write the elements of the dataset in a simple format using Java serialization, which can then be loaded using `SparkContext.objectFile()`. |
| **countByKey**()                                   | Only available on RDDs of type (K, V). Returns a hashmap of (K, Int) pairs with the count of each key. |
| **foreach**(*func*)                                | Run a function *func* on each element of the dataset. This is usually done for side effects such as updating an [Accumulator](https://spark.apache.org/docs/latest/rdd-programming-guide.html#accumulators) or interacting with external storage systems. **Note**: modifying variables other than Accumulators outside of the `foreach()` may result in undefined behavior. See [Understanding closures ](https://spark.apache.org/docs/latest/rdd-programming-guide.html#understanding-closures-a-nameclosureslinka)for more details. |





<u>Shuffle operations</u>

When doing operations like traditional MapReduce, we may need an all-to-all Shuffle operation to go through all data in all nodes and redistribute them, which is an expensive operation due to high disk I/O, data serialization, and network I/O.

Methods that will result in a shuffle include: repartition operations, 'ByKey operations, and join operations.

We may be able to improve overall performance by sorting the data in someway, such as `mapPartitions`, `repartitionAndSortWithinPartitions`, and `sortBy`.

Intermediate files result from Shuffle will be stored in memory until garbage collection (which can happen very infrequently), incase of re-computation later.





<u>RDD Persistence</u>

One concept to speed up compute is to cache intermediate results to avoid recomputation. The result will be saved the first time it's computed by an action. We can choose the storage level to decide how data will be stored.

We have function `persist` and `cache`, which is just a shorthand for persisting on default storage level.



| Storage Level                          | Meaning                                                      |
| :------------------------------------- | :----------------------------------------------------------- |
| MEMORY_ONLY                            | Store RDD as deserialized Java objects in the JVM. If the RDD does not fit in memory, some partitions will not be cached and will be recomputed on the fly each time they're needed. This is the default level. |
| MEMORY_AND_DISK                        | Store RDD as deserialized Java objects in the JVM. If the RDD does not fit in memory, store the partitions that don't fit on disk, and read them from there when they're needed. |
| MEMORY_ONLY_SER (Java and Scala)       | Store RDD as *serialized* Java objects (one byte array per partition). This is generally more space-efficient than deserialized objects, especially when using a [fast serializer](https://spark.apache.org/docs/latest/tuning.html), but more CPU-intensive to read. |
| MEMORY_AND_DISK_SER (Java and Scala)   | Similar to MEMORY_ONLY_SER, but spill partitions that don't fit in memory to disk instead of recomputing them on the fly each time they're needed. |
| DISK_ONLY                              | Store the RDD partitions only on disk.                       |
| MEMORY_ONLY_2, MEMORY_AND_DISK_2, etc. | Same as the levels above, but replicate each partition on two cluster nodes. |
| OFF_HEAP (experimental)                | Similar to MEMORY_ONLY_SER, but store the data in [off-heap memory](https://spark.apache.org/docs/latest/configuration.html#memory-management). This requires off-heap memory to be enabled. |



Recommendations on storage level:

- If your RDDs fit comfortably with the default storage level (`MEMORY_ONLY`), leave them that way. This is the most CPU-efficient option, allowing operations on the RDDs to run as fast as possible.
- If not, try using `MEMORY_ONLY_SER` and [selecting a fast serialization library](https://spark.apache.org/docs/latest/tuning.html) to make the objects much more space-efficient, but still reasonably fast to access. (Java and Scala)
- Don’t spill to disk unless the functions that computed your datasets are expensive, or they filter a large amount of the data. Otherwise, recomputing a partition may be as fast as reading it from disk.
- Use the replicated storage levels if you want fast fault recovery (e.g. if using Spark to serve requests from a web application). *All* the storage levels provide full fault tolerance by recomputing lost data, but the replicated ones let you continue running tasks on the RDD without waiting to recompute a lost partition.



Data is removed in least-recently-used fashion (like a stack). You can also use `RDD.unpersist()` method, note the method won't block by default.

If some data is lost, Spark will redo the transformations to recompute the data.



#### Shared variables

Another Spark abstraction is shared variables. When Spark funs a function in parallel, variables of the program is copied and sent to each worker. But sometimes these variables are shared. Spark support 2 types of shared variables:

- *broadcast variables*: used to cache a value in memory on all nodes
- *accumulators*: values that can only be "added"



<u>Broadcast variables</u>

Sometimes we want to ship a *read-only* variable to clusters to avoid packaging them as part of the closure for every execution.

```python
v = [1,2,3]
broadcastVar = sc.broadcast(v)
print(broadcastVar.value) # [1,2,3]
```

Note, don't use `v` in subsequent calculation (use `broadcastVar` instead) to avoid redistributing the variable. And do not modify `v` to ensure all cached broadcast variable is consistent.

Use `unpersist()` on the broadcast variable to release resources of the broadcast variable, and the variable will be re-broadcasted when it's used. Use `destroy()` to release all resources of the broadcast variable permanently, and the variable cannot be used after that. Note, both methods don't block by default.



<u>Accumulators</u>

- They are created by calling `sc.accumulator(v)`
- Worker nodes can add to it using `.add()` or `+=` operator
- Only driver node can read the value
- For accumulator updates performed inside actions only (example of this?), Spark guarantees it'll only be applied once, so restarted tasks won't update the value
- For accumulator updates performed inside transformations, updates may be applied more than once if tasks or jobs are restarted
- Accumulator updates are lazy, so updates aren't made if no actions have executed them

```python
accum = sc.accumulator(0)
sc.parallelize([1,2,3,4]).foreach(lambda x: accum.add(x))
print(accum.value)  # 10
```

You can use accumulators on values that are not Int, provided the class is a subclass to `AccmulatorParam`

```python
class VectorAccumulatorParam(AccumulatorParam):
    def zero(self, initialValue):
        return Vector.zeros(initialValue.size)  # Hypothetical vector class

    def addInPlace(self, v1, v2):
        return v1 + v2

# Then, create an Accumulator of this type:
vecAccum = sc.accumulator(Vector(...), VectorAccumulatorParam())
```







## Spark SQL, DataFrames, and Datasets

Spark SQL provides more structure to the data and its computations on top of RDD, making more optimizations possible.

We can use Spark SQL with SQL or the Datasets API. Both APIs call the same physical instructions, so programmers can switch between the two as see fit.

Dataset API is currently only available in Scala and Java.



### Getting started

<u>Creating a SparkSession</u>

```python
from pyspark.sql import SparkSession

spark = SparkSession \
	.builder \
	.appName("Python Spark SQL basic example") \
	.config("spark.some.config.option", "some-value") \
	.getOrCreate()
```

This is the entry point for all Spark functionalities.



<u>Creating dataframes</u>

```python
# spark is an existing SparkSession
df = spark.read.json("examples/src/main/resources/people.json")

# Displays the content of the DataFrame to stdout
df.show()
# +----+-------+
# | age|   name|
# +----+-------+
# |null|Michael|
# |  30|   Andy|
# |  19| Justin|
# +----+-------+
```



<u>Untyped Dataset Operations (aka DataFrame operations)</u>

As opposed to typed transformations come with strongly typed Scala/Java Datasets

```python
# spark, df are from the previous example
# Print the schema in a tree format
df.printSchema()
# root
# |-- age: long (nullable = true)
# |-- name: string (nullable = true)

# Select only the "name" column
df.select("name").show()
# +-------+
# |   name|
# +-------+
# |Michael|
# |   Andy|
# | Justin|
# +-------+

# Select everybody, but increment the age by 1
df.select(df['name'], df['age'] + 1).show()
# +-------+---------+
# |   name|(age + 1)|
# +-------+---------+
# |Michael|     null|
# |   Andy|       31|
# | Justin|       20|
# +-------+---------+

# Select people older than 21
df.filter(df['age'] > 21).show()
# +---+----+
# |age|name|
# +---+----+
# | 30|Andy|
# +---+----+

# Count people by age
df.groupBy("age").count().show()
# +----+-----+
# | age|count|
# +----+-----+
# |  19|    1|
# |null|    1|
# |  30|    1|
# +----+-----+
```





<u>Running SQL queries programmatically</u>

```python
# Register the DataFrame as a SQL temporary view
df.createOrReplaceTempView("people")

sqlDF = spark.sql("SELECT * FROM people")
sqlDF.show()
# +----+-------+
# | age|   name|
# +----+-------+
# |null|Michael|
# |  30|   Andy|
# |  19| Justin|
# +----+-------+
```



<u>Global Temporary View</u>

The temporary view is tied to the session and will terminate if the session terminates. To make the view persist amongst all sessions, use the global temporary view. Now the view will only terminate if the Spark application terminates

```python
# Register the DataFrame as a global temporary view
df.createGlobalTempView("people")

# Global temporary view is tied to a system preserved database `global_temp`
spark.sql("SELECT * FROM global_temp.people").show()
# +----+-------+
# | age|   name|
# +----+-------+
# |null|Michael|
# |  30|   Andy|
# |  19| Justin|
# +----+-------+

# Global temporary view is cross-session
spark.newSession().sql("SELECT * FROM global_temp.people").show()
# +----+-------+
# | age|   name|
# +----+-------+
# |null|Michael|
# |  30|   Andy|
# |  19| Justin|
# +----+-------+
```



<u>Creating Datasets</u>

```scala
case class Person(name: String, age: Long)

// Encoders are created for case classes
val caseClassDS = Seq(Person("Andy", 32)).toDS()
caseClassDS.show()
// +----+---+
// |name|age|
// +----+---+
// |Andy| 32|
// +----+---+

// Encoders for most common types are automatically provided by importing spark.implicits._
val primitiveDS = Seq(1, 2, 3).toDS()
primitiveDS.map(_ + 1).collect() // Returns: Array(2, 3, 4)

// DataFrames can be converted to a Dataset by providing a class. Mapping will be done by name
val path = "examples/src/main/resources/people.json"
val peopleDS = spark.read.json(path).as[Person]
peopleDS.show()
// +----+-------+
// | age|   name|
// +----+-------+
// |null|Michael|
// |  30|   Andy|
// |  19| Justin|
// +----+-------+
```



<u>Interoperating with RDDs</u>

We can infer the schema using Reflection directly from RDDs, or programmatically specify the schema. The latter can be useful when the schema isn't known until runtime.

To infer the datatypes, we can construct rows by passing a list of key/value pairs using kwargs to the Row class. The keys become the columns, and the types are inferred by sampling the whole dataset.

```python
from pyspark.sql import Row

sc = spark.sparkContext

# Load a text file and convert each line to a Row
lines = sc.textFile("examples/src/main/resources/people.txt")
"""
examples/src/main/resources/people.txt
___
Justin,13
Michael,24
...
"""

parts = lines.map(lambda l: l.split(','))
people = parts.map(lambda p: Row(name=p[0], age=p[1]))

# Infer the schema, register the DataFrame as a table
schemaPeople = spark.createDataFrame(people)
schemaPeople.createOrReplaceTempView("people")

# SQL can be run over DataFrames
teenagers = spark.sql("SELECT name FROM people WHERE age >= 13 AND age <= 19")

teenNams = teenagers.rdd.map(lambda p: "Name: " + p.name).collect()
for name in teenNames:
    print(name)
# Name: Justin
```

To programmatically specify the schema, we need to use the `StructType` that matches the RDD (of tuples or lists)

```python
# Import data types
from pyspark.sql.types import StringType, StructType, StructField

sc = spark.sparkContext

# Load a text file and convert each line to a Row
lines = sc.textFile("examples/src/main/resources/people.txt")
parts = line.map(lambda l: l.split(','))
# Each line is converted to a tuple. 
people = parts.map(lambda p: (p[0],p[1]).strip())

# Creating the schema
fields = [StructField(field_name, StringType(), True) for field_name in ['name', 'age']]
schema = StructType(fields)

# Apply the schema to the RDD
schemaPeople = spark.createDataFrame(people, schema)

# Creates a temporary view
schemaPeople.createOrReplaceTempView('people')

# Run SQL query
results = spark.sql('SELECT name FROM people')

results.show()
# +-------+
# |   name|
# +-------+
# | Justin| 
# |Michael|
# +-------+
```





<u>Scalar and Aggregate functions</u>

https://spark.apache.org/docs/latest/sql-ref-functions.html

Scalar function returns a single value per row (e.g., `map()`). Aggregate functions return a single value over multiple rows (e.g., `count()`)

You can also define your own functions







Scalar functions

`.columns`: Return the column names in the DataFrame as a list of strings

`.count()`: Return the # of rows in the DataFrame









## PySpark

















