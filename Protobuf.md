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

**Encoding**

Protobuf uses a tag-value encoding for messages sent across wire and persisted on disk. This means (optional) fields that are not set take no overhead in the message. So you can have many optional fields inside your message.

```
message    := (tag value)*

tag        := (field << 3) bit-or wire_type;
                encoded as uint32 varint
value      := varint      for wire_type == VARINT,
              i32         for wire_type == I32,
              i64         for wire_type == I64,
              len-prefix  for wire_type == LEN,
              <empty>     for wire_type == SGROUP or EGROUP

varint     := int32 | int64 | uint32 | uint64 | bool | enum | sint32 | sint64;
                encoded as varints (sintN are ZigZag-encoded first)
i32        := sfixed32 | fixed32 | float;
                encoded as 4-byte little-endian;
                memcpy of the equivalent C types (u?int32_t, float)
i64        := sfixed64 | fixed64 | double;
                encoded as 8-byte little-endian;
                memcpy of the equivalent C types (u?int64_t, double)

len-prefix := size (message | string | bytes | packed);
                size encoded as int32 varint
string     := valid UTF-8 string (e.g. ASCII);
                max 2GB of bytes
bytes      := any sequence of 8-bit bytes;
                max 2GB of bytes
packed     := varint* | i32* | i64*,
                consecutive values of the type specified in `.proto`
```


**Field types**

*optional*

As fields are optional implicitly in protobuf, the `optional` keyword provides the `has_<field>` method as it is now explicitly optional. E.g., `optional string` field you can check with `msg.has_string_field()` rather than `msg.string_field().empty()` in original case without `optional` keyword. Implicit optional fields are not serialised on the wire, so you have no way of knowing whether the fields isn't provided or was explicitly set to the default value ("" in the case of string fields).

*oneof*

If you have a message with many singular fields and where at most one field will be set at the same time, you can enforce this behavior and save memory by using the oneof feature. Oneof fields are like optional fields except all the fields in a oneof share memory, and at most one field can be set at the same time. If `oneof` is not set you can check it with `msg.field().empty()`


