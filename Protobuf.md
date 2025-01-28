# Protocol Buffers

Serialisation framework for typed, structured data (into bytes) up to a few MB in size. Suitable for ephemeral network traffic and archival storage on disk.

What is included:
- .proto file to defined typed, structured data format
- Generate utility methods automatically from .proto files for extracting, checking, modifying, serialising back protobuf binary data
- Compile your program code with generated util methods to create binaries for working with protobuf data
- Cross-language compatibility -> protobuf can be written in Python and read in C++ etc.
```C++
Person john = Person.newBuilder()
    .setId(1234)
    .setName("John Doe")
    .setEmail("jdoe@example.com")
    .build();
output = new FileOutputStream(args[0]);
john.writeTo(output);
```
- Forward and backwards compatibility
  - We want the serialised protobuf data to work with both old and new code. When we change the .proto definition, we want both old and new code to read the serialised data
  - Adding a field: new code can read old messages, just take default values of added field that didn't exist. Old code and read new messages, just ignore the new field
  - Removing a field: (exact opposite happens as above)
  - Many types can be interchanged between each other without causing issues via casting logic (e.g., `int32` <-> `bool`)
  - *Note*: fields are keyed by the field number associated. Changing the number is equivalent to deleting the field and adding one with same type. To avoid conflict never reused number, and keep counting up. Prepend deleted fields with `OBSELETE_` or use the reserved keyword.
```
message Foo {
  reserved 2, 15, 9 to 11;
  reserved "foo", "bar";
}
```

What it's not good for
- Large message (more than a few MB). Protobuf assumes messages can be stored in memory
- Optimal compression. For image data, large floating point arrays etc. use other specialised serialisation formats

Example proto file
```
message Person {
  optional string name = 1;
  optional int32 id = 2;
  optional string email = 3;
}
```




