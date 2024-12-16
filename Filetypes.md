# File types


## Protocol Buffers

Serialising structured data. Think XML but smaller, faster, and simpler. Used in Google for various purposes (e.g., inter-server communication).

Features:
- Language neutral
- Platform neutral
- Extensible

Workflow:

1. Define message structure in `.proto` file

```java
message Person {
  optional string name = 1;
  optional int32 id = 2;
  optional string email = 3;
}
```

2. Protocol buffer generates classes via its compiler to read from and write to serialised data

```java
Person john = Person.newBuilder()
    .setId(1234)
    .setName("John Doe")
    .setEmail("jdoe@example.com")
    .build();
output = new FileOutputStream(args[0]);
john.writeTo(output);
```

Deserialise perhaps in another microservice written in a different language

```C++
Person john;
fstream input(argv[1], ios::in | ios::binary);
john.ParseFromIstream(&input);
int id = john.id();
std::string name = john.name();
std::string email = john.email();
```

Properties of protocol buffers

- Protocol buffers tend to assume that entire messages can be loaded into memory at once and are not larger than an object graph. For data that exceeds a few megabytes, consider a different solution.
- When protocol buffers are serialized, the same data can have many different binary serializations. You cannot compare two messages for equality without fully parsing them.
- Messages are not compressed. While messages can be zipped or gzipped like any other file, special-purpose compression algorithms like the ones used by JPEG and PNG will produce much smaller files for data of the appropriate type.
- Protocol buffer messages are less than maximally efficient in both size and speed for many scientific and engineering uses that involve large, multi-dimensional arrays of floating point numbers. For these applications, FITS and similar formats have less overhead.
- Protocol buffers are not a formal standard of any organization. This makes them unsuitable for use in environments with legal or other requirements to build on top of standards.





## Parquet

A column-oriented data storage format, provides encoding and benefits similar to other column-oriented data storage systems.

- Column-wise compression and specialized encoding schemes coming out of the box
- Fast query on "wide" tables where only a few columns are selected

Implements the Dremel paper (https://github.com/julienledem/redelm/wiki/The-striping-and-assembly-algorithms-from-the-Dremel-paper) for nested data structure serialisation (essentially each "leaf" in the nested structure is a column, with some way to tracking levels).



## CSV

Text file format, uses commas to separate values, uses newlines to separate records
Stores tabular data in plaintext
There's no commonly followed standard for CSV files, so software taking CSV input must take variations into consideration
But widespread due to readability and simplicity

MS Excel row limit: a bit over 1M rows







