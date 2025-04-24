# Advanced Python

Resources:

- Fluent Python: this is a massive book, covers a ton of stuff. I've mostly skimmed it, for new stuff that's interesting I've marked with $$. Notes not following original book order
- Serious Python: weird book, think only first chapter is useful
- Python Distilled: 





TODO:

- [ ] Read on `inspect` module (used in schema.check_io, check related MR, also good to look at contextmanager used for aggregating schema errors)
- [ ] Have a read on Python API design



## Data Structures



### The Python Data Model

Special methods: "dunder str", "dunder iter" (dunder = "double underscore before and after")

These special methods allow your classes to interact with generic Python structures, making Python like a "framework". This has 2 benefits, 1) common methods have consistent API (e.g., `len()`, `str()`, `x[i]`, `hash()` etc.), 2) Python structures can work on these objects out of the box (similar to `iterators` being a bridge between C++ containers and C++ algorithms)



$$ Have a closer look at common types in this chapter

​	Use collection UML diagram as guide



Overview of special method names

Special method names and symbols for operators

Python language reference, data model: https://docs.python.org/3/reference/datamodel.html#

​	Very long, not recommended to study but useful to look up stuff





### An Array of Sequences



2 ways to organise built-in sequences:

Container sequences (hold different types): list, tuple, collections.deque

Flat sequences (hold same type): str, bytes, array.array



OR

Mutable sequences (with insert, append, reverse, extend): list, bytearray, array.array, collections.deque

Immutable sequences: tuple, str, bytes



**Tuple vs list**

Tuple used as records => each field is ID'ed on the position

```python
coords = (10.4, 30.35)
lat, long = coords
```

Tuple as immutable lists => brings clarity that length will never change, also tend to be more performant than list with same elements



**More about unpacking**

Using * to grab excess items

```python
>>> a, b, *rest = range(5)
>>> a, b, rest
(0, 1, [2, 3, 4])
```

Nested unpacking

```python
# We're familiar with the below pattern
for (k, v) in my_map.items():
    print(f"Key: {k}, value: {v}")
    
# this can actually be generalised
stuff = (1, 2, (3, 4))
a, b, (c, d) = stuff
print(a, b, c, d)  # 1, 2, 3, 4
```

$$ Structured pattern matching: pretty cool feature, though I've not used much





### Dictionaries and Sets



$$ `__hash__` and `hash()` function

$$ pattern matching with mappings



**collections.defaultdict**

```python
# defaultdict class signature
class collections.defaultdict(default_factory=None, /[, ...])

# function in `default_factory` is called without arguments to construct the default value
s = [('yellow', 1), ('blue', 2), ('yellow', 3), ('blue', 4), ('red', 1)]
d = defaultdict(list)
for k, v in s:
    d[k].append(v)

sorted(d.items()) # [('blue', [2, 4]), ('red', [1]), ('yellow', [1, 3])]

s = 'mississippi'
d = defaultdict(int)
for k in s:
    d[k] += 1

sorted(d.items()) # [('i', 4), ('m', 1), ('p', 2), ('s', 4)]
```

`__missing__()` When this is define this function is called when item is missing in dict rather than throwing exception



**collections.ChainMap**

Useful for modelling "scope"

```python
d1 = dict(a=1, b=3)
d2 = dict(a=2, b=4, c=6)
from collections import ChainMap
chain = ChainMap(d1, d2)
chain['a']  # 1
chain['c']  # 6
```



**collections.Counter**

Util that stores elements as map of elem => count

```python
# initialisation
c = Counter()                           # a new, empty counter
c = Counter('gallahad')                 # a new counter from an iterable
c = Counter({'red': 4, 'blue': 2})      # a new counter from a mapping
c = Counter(cats=4, dogs=8)             # a new counter from keyword args

# Access count like dictionary
c = Counter(['eggs', 'ham'])
c['bacon']                              # count of a missing element is zero
dict(c)									# { 'eggs': 1, 'bacon': 1}
```

Other methods

- `elements()`: Return an iterator over elements repeating each as many times as its count.
- `most_common([n])`: list of n most common elements
- `subtract([iterable-or-mapping])`: Subtract from current count, count can go negative
- `total()`: sum of all counts
- `update([iterable-or-mapping])`: update mapping



**example of own dictionary**

```python
class StrKeyDict(collections.UserDict):
	def __missing__(self, key):
		if isinstance(key, str):
			raise KeyError(key)
		return self[str(key)]

    def __contains__(self, key):
		return str(key) in self.data

    def __setitem__(self, key, item):
		self.data[str(key)] = item
```



**dictionary views**

`dict.key()`, `dict.values()`, and `dict.items()` return views => so immutable







### Data Class Builders

Helpers to create classes that hold data with little extra functionality

Plain old class

```python
class Coordinates:
    def __init__(self, lat, lon):
        self.lat = lat
        self.lon = lon

>>> from coordinates import Coordinate
>>> moscow = Coordinate(55.76, 37.62)
>>> moscow															# __repr__ inherited from `object` not very useful
<coordinates.Coordinate object at 0x107142f10>
>>> location = Coordinate(55.76, 37.62)
>>> location == moscow												# __eq__ inherited from `object` does object ID comparison
False
>>> (location.lat, location.lon) == (moscow.lat, moscow.lon)
True
```

$$ what is object ID?



`collections.namedtuple` and `typing.NamedTuple` and `dataclasses.dataclass`

```python
Coordinate = namedtuple('Coordinate', 'lat lon')

Coordinate = NamedTuple('Coordinate', lat=float, lon=float)

class Coordinate(NamedTuple):
    lat: float
    lon: float
    
    def __str__(self):
        ns = 'N' if self.lat >= 0 else 'S'
		we = 'E' if self.lon >= 0 else 'W'
		return f'{abs(self.lat):.1f}°{ns}, {abs(self.lon):.1f}°{we}'

@dataclass(frozen=True)
class Coordinate:
    lat: float
    lon: float
    
    def __str__(self):
        ns = 'N' if self.lat >= 0 else 'S'
		we = 'E' if self.lon >= 0 else 'W'
		return f'{abs(self.lat):.1f}°{ns}, {abs(self.lon):.1f}°{we}'

>>> moscow = Coordinate(55.756, 37.617)
>>> moscow
Coordinate(lat=55.756, lon=37.617)
>>> moscow == Coordinate(lat=55.756, lon=37.617)
True
```

All 3 variants have the `__repr__` and `__eq__` behave as you intend.

`namedtuple`: A factory method that actually creates a subclass of `tuple`

`NamedTuple`: Not a superclass, but actually a metaclass ($$), returns a subclass of `tuple` (`issubclass(Coordinate, NamedTuple)` is False). Adds default value when type given ()

​	$$ is this true?? ^^ or is the type default value thing for dataclass?

`dataclass`: Decorator that reads attributes of the class and constructs corresponding `__init__` methods etc. Note the body of the `Coodinate` class here is same as using `NamedTuple`. Because of this we can mix `dataclass` with inheritence still without them interfering



| Feature           | namedtuple        | NamedTuple          | dataclass                                |
| ----------------- | ----------------- | ------------------- | ---------------------------------------- |
| mutable instances | NO                | NO                  | YES                                      |
| construct dict    | x._asdict()       | x._asdict()         | dataclass.asdict(x)                      |
| get field names   | x._fields         | x._fields           | [f.name for f in dataclass.fields(x)]    |
| get defaults      | x._field_defaults | x._field_defaults   | [f.default for f in dataclass.fields(x)] |
| get field types   | N/A               | `x.__annotations__` | `x.__annotations__`                      |





**Typing 101**

No runtime effect, used for documentation and IDE checks

```
var_name: some_type
```

Basic types: `str`, `int`, `MyClass` ...

Polymorphic types: `list[int]`, `tuple[str, int]`, `typing.Optional[int]` ...

```python
class PlainClass:
    a: int				# Added to __annotations__ then discarded
    b: float = 3.14 	# Added to __annotations__ and added as class attribute
    c = 'spam'			# Not added to __annotations__ and added as class attribute
    
>>> PlainClass.__annotations__
{'a': <class 'int'>, 'b': <class 'float'>}
```

`__annotations__` are built dynamically at runtime by the interpreter



$$ what's the point of `__post_init__` in dataclass if we can just define this as private function and call at end of `__init__` ourselves?



209: table of dataclass options, understand them, and read footnote on frozen





**Uses of data classes**

- To hold data just before being exported to say JSON or hold data that was just imported. In these cases the data class should be frozen
- Also useful as first step in writing a class, with methods added later
- Otherwise is a code smell => in OOP we want data and methods on that data to be placed together. When data classes are used, it may be code consuming that data class is scatter around, perhaps containing duplications



**Mutable defaults**

```python
@dataclass
class MyClass:
    name: str
    guests: list = []	# Interpreter errors as attempting to use mutable field `[]` as default

@dataclass
class MyClass:
    name: str
    guests: list = field(default_factory=list)	# Do this instead, supply `default_factory` param with a function or class, which will be evoked with zero arguments during initialisation to build the default argument

# Note: This mutable default check is only implemented for `list`, `dict` and `set` as safety measure, will not check other custom types
```



**Pattern matching with classes**

$$ 







### Object references, mutability, and recycling



**Variables are references**

In Python variables are references

```python
a = [1, 2, 3]
b = a
a.append(4)
print(b)		# [1,2,3,4]
```

Compare with C++

```c++
std::vector<int> a = {1, 2, 3};
std::vector<int> b = a;				// deep copy
a.push_back(4);
std::cout << b.size() << std::endl;	// 3
```

For this reason we say `binds <variable> name to <value>`, instead of usually `<value> assigned to <variable>`



**object ID**

```python
a = 1
b = a
print(id(a))	# 240914134
print(id(b))	# 240914134
```

What is returned by `id` is implementation dependent. In CPython `id` returns the (virtual) memory address of the object.

In Python semantics `id` returns a unique integer label, and will not change during lifetime of object



**== vs is**

`==` tests for value equality, `is` tests for identity equality

`a == b` is syntactic sugar for `a.__eq__(b)`

`is ` is faster than `==` as it cannot be overwritten (so Python does not need to look up correct `__eq__` to call) and just consist of comparing object IDs

`is` is useful for comparing with Singletons

```python
a is None

END_OF_DATA = object()		# Sentinel Singleton
# ...
def traverse():
	# ...
    if node is END_OF_DATA:
        return
```

`is` comparison with `None` is really the only use case for `is` in most programs



**Relative immutability of tuples**

The immutability of tuples really refers to the physical contents of the tuple data structure (i.e., the references it holds), and does not extend to the referenced objects.  

```python
>>> t1 = (1, 2, [30, 40])
>>> t2 = (1, 2, [30, 40])
>>> t1 == t2
True
>>> id(t1[-1])
4302515784
>>> t1[-1].append(99)
>>> t1
(1, 2, [30, 40, 99])
>>> id(t1[-1])
4302515784
>>> t1 == t2
False
```



**Copies are shallow by default**



## Functions as Objects



### Functions as First-Class objects

`map` and `filter` less used with comprehensions. `reduce` is now demoted to be inside `functools` as for most cases we're happy with `sum`, `max`, `all` etc.

`functools.partial` -> make Python function worked like curried functions

```python
>>> from operator import mul
>>> from functools import partial
>>> triple = partial(mul, 3) 
>>> triple(7) 
21
>>> list(map(triple, range(1, 10))) 
[3, 6, 9, 12, 15, 18, 21, 24, 27]
```

9 different callable objects:

1. User-defined functions (`def`, `lambda`)
2. Built-in functions (`len`, `time.strftime`)
3. Built-in methods (`dict.get`)
4. Methods (functions inside class)
5. Classes (when invoked runs its `__new__` method to create an instance then `__init__` to initialise it)
6. Class instances (if `__call__` is defined)
7. Generator functions (`yield` in body) => returns iterators
8. Native coroutine functions (`async def`)
9. Asynchronoous generator functions (`async def` with `yield`) => requires an async framework to work (e.g., `asyncio` module)

































