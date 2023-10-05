# YAML

https://yaml.org/

Documentation: https://yaml.org/spec/1.2.2/

Test matrix: https://matrix.yaml.info/



YAML™ (rhymes with “camel”) is a human-friendly, cross language, Unicode-based data serialization language designed around the common native data types of dynamic programming languages.

Use cases:

- Config files
- Internet messaging
- Object persistence
- Log files
- etc.

YAML use 3 basic primitives (mappings, sequences, and scalars) to represent a range of data structures. Together, YAML is a language for serializing any native data structure.

There are hundreds of programming languages, but only a handful of data storage / transfer languages. YAML is one of them.





## Language Overview

### Collections

Each entry is on its own line

Indentation for scope

Literals for type:

- "- " is for block sequences
- ": " is for mappings
- "#" is for comments
- characters are scalars



Examples:

Sequence of scalars

```yaml
- Scott Knowles  # Villain from Mr. Robot
- 3.14159		 # The first 6 digits of pi
```

Mapping Scalars to Sequences

```yaml
american:
- Boston Red Sox
- Detroit Tigers
- New York Yankees
national:
- New York Mets
- Chicago Cubs
- Atlanta Braves
```

Sequences of mappings

```yaml
-
  name: Mark McGwire
  hr:   65
  avg:  0.278
-
  name: Sammy Sosa
  hr:   63
  avg:  0.288
```

YAML also has flow styles, which use more explicit literals `[]` and `{}`. They are shorthand for the ones above.

Examples:

```yaml
# Sequence of Sequences
- [name        , hr, avg  ]
- [Mark McGwire, 65, 0.278]
- [Sammy Sosa  , 63, 0.288]

# Mapping of Mappings
Mark McGwire: {hr: 65, avg: 0.278}
Sammy Sosa: {
    hr: 63,
    avg: 0.288,
}
```





### Structures

`---` separates directives from document content -> SEE LATER

Example: Two Documents in a Stream (each with a leading comment)

```yaml
# Ranking of 1998 home runs
---
- Mark McGwire
- Sammy Sosa
- Ken Griffey

# Team ranking
---
- Chicago Cubs
- St Louis Cardinals
```



`...` indicates end of a document without starting a new one (like `---`)

Example: Play by Play Feed from a Game

```yaml]
---
time: 20:03:20
player: Sammy Sosa
action: strike (miss)
...
---
time: 20:03:47
player: Sammy Sosa
action: grand slam
...
```



`&` anchors a repeated node (object) and can then be alised/referenced with `*`. I think this is like reverse of C pointer syntax

```yaml
ice hockey:
- Adam
- &B Bob # node labeled with B
bowling:
- *B
- Charlie
```



`?` opens a complex key

```yaml
? - Detroit Tigers
  - Chicago cubs
: - 2001-07-23

? [ New York Yankees,
    Atlanta Braves ]
: [ 2001-07-02, 2001-08-12,
    2001-08-14 ]
```



Compact nested object

```yaml
- item 1: Alice
  item 2: Bob
```

The item above loads to the same object as

```yaml
-
	item 1: Alice
	item 2: Bob
```





### Scalars

Literal style `|`: all line breaks important (will be casted to "\n")

Flow style `>`: all line breaks fold into a space unless it ends an empty or a more indented line



Block chomping:

Adding `-`: (so `>-` or `|-`), trims all new line characters at the end of the block

Adding `+`: leaves all new line characters at the end of the block

Default behaviour (without `+` or `-`) is to leave 1 new line character





The default style is a little weird

```yaml
name: Mark McGwire
accomplishment: > # Will be a space in between
  Mark set a major league
  home run record in 1998.
stats: |		  # will be a line break in between
  65 Home Runs
  0.278 Batting Average
```



Flow scalars: double-quoted style for escape sequences, single-quoted style when escaping not needed. All flow scalars can span across multiple lines

```yaml
unicode: "Sosa did fine.\u263A"
control: "\b1998\t1999\t2000\n"
hex esc: "\x0d\x0a is \r\n"

single: '"Howdy!" he cried.'
quoted: ' # Not a ''comment''.'
tie-fighter: '|\-*-/|'

# Can span multiple lines
quoted: "So does this
  quoted scalar.\n"
```





### Tags

There are some literals that can be loaded to other data types, 











