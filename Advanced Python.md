# Advanced Python

Why Python in quant finance?
- Useful for research, ML is Python heavy
- Flexible and simple for automations (e.g., data ingestion, backtest, analytics, visualisation)

Resources:

- Fluent Python: this is a massive book, covers a ton of stuff. I've mostly skimmed it, for new stuff that's interesting I've marked with $$. Notes not following original book order
- Serious Python: weird book, think only first chapter is useful
- Python Distilled: 



TODO:

- [ ] Read on `inspect` module (used in schema.check_io, check related MR, also good to look at contextmanager used for aggregating schema errors)
- [ ] Have a read on Python API design
- [ ] More about imports, how they work, how to resolve circular imports, when importing the whole file is executed?
- [ ] How does `__name__` == "__main__" even work
- [ ] More about Python interpretor inner workings, e.g., what is `.pyc` file after imports
- [ ] https://blog.edward-li.com/tech/advanced-python-features/#6-context-managers
- [ ] Byte code: https://docs.python.org/3/library/dis.html
- [ ] Be good to have some concrete examples of inheritence and ways they can be avoided (e.g., abstract classes, mixins, composition etc.) with examples implemented in Python and C++)



Remain: $$

- A lot of pattern matching is skipped








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

```python
>>> l1 = [3, [55, 44], (7, 8, 9)]
>>> l2 = list(l1)
>>> l2
[3, [55, 44], (7, 8, 9)]
>>> l2 == l1
True
>>> l2 is l1
False
```

The easiest way to create a shallow copy is to use the container constructor. The outer container is new but inner elements are copied by reference. Here you can also do `l2 = l1[:]`

`copy` module has `copy.copy()` and `copy.deepcopy()` that does shallow and deep copy respectively. Deep copy copies the element in the container and does this recursively





**Function parameters as references**

Functions in Python have parameters passed by reference.

Default arguments are instantiated at function definition (usually when function is imported) and becomes attribute of the function. So mutable defaults will behave in strange ways (it persists across different calls to the function)





**del and garbage collection**

`del` is a statement

```python
del a  # don't do `del (a)`, this works but because (a) evaluates the same as a
```

`del` deletes references, not objects.

```python
>>> a = [1, 2]
>>> b = 1		# a and b both binds to [1, 2]
>>> del a		# deletes reference a
>>> b = 3		# b binds now to 3, [1, 2] is freed by GC
```

CPython's GC uses reference counting. When `refcount` reaches zero CPython calls the `__del__` method (if there's one) then frees memory of the object





**Tricks Python plays on immutables**

Python does "interning" on immutables where different instances of immutables with the same value can actually share the same underlying object.

```python
>>> t1 = (1, 2, 3)
>>> t2 = tuple(t1)
>>> t2 is t1
True
>>> t3 = t1[:]
>>> t3 is t1
True

>>> t1 = (1, 2, 3)
>>> t3 = (1, 2, 3)
>>> t3 is t1
False

>>> s1 = 'ABC'
>>> s2 = 'ABC'
>>> s2 is s1
True
```

There's not guaranteed behaviour with interning, so do not rely on `is` equality with immutables, stick to `==` equality















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




### Type Hints

Gradual typing
- Is optional: no type hints OK, type checker should assume `Any` type when type not provided
- Does not enforce type errors are runtime. Type hints used by static type checkers, linters and IDEs to raise warnings, do not prevent inconsistent values to be passed to functions at runtime
- Types generally not used to improve performance

Some types:
- `Any`: a magic type sits at both at the top and bottom of the type hierarchy. It is the most general type (so `n: Any` can accept anything) and the most specialised type (so `n: Any` supports any operation on it)
- `Optional[T]`: "using None as a default"
- `Union[T ...]`: any of the options, nested union type is semantically the same as flattened
- `Iterable`
- `Callable`

I haven't written code with strict typing, so don't know too much about types

Duck typing vs nominal typing

Duck typing: Objects have types but variables (incl function params) don't. By definition only enforced at runtime, ie. if I can invoke `birdie.quack()` then `birdie` is a duck. More flexible than nominal typing with the cost of possibly more runtime errors that could've been caught at compile time by type checker

Nominal typing: Objects and variables both have types. Type checker only runs at compile time (not runtime). If `birdie: Bird` then `birdie.quack()` is illegal even if the object at runtime supports this method.


$$ Read more about this: dynamic vs statically types, strict vs non-strict types

Typing trade offs

A type checker cannot prevent all issues, espeically they have
- False positives: tools report type errors on code that is correct
- False negatives: tools don't report type errors on code that is incorrect

Downsides of typing:
- Param unpacking like `config(**settings)` can't be statically checked
- Advanced features like properties, descriptors, metaclasses, and metaprogramming are poorly type checked
- Python releases can be faster without type checking
- ^^ Have definintely felt these limitations in C++

Generally speaking, Python's strength is flexibility so enforcing too much typing end up giving more downside, stick to basic linters and do proper testing



### Decorators and closures

Decorators are called right after the decorated function is defined, this is usually at import time.

Closures

```python
def make_averager():
    series = []

    def averager(v):
	series.append(v)
	return sum(series) / len(series)

    return averager


def fast_averager():
    count = total = 0

    def averager(v):
	nonlocal count, total
	count += 1
	total += v
	return total/count

    return averager
```

A closure is a function that retains the binding of free variables, which can be used after the defining scope is no longer available. Here, we need `nonlocal` for `count` and `total` because integers cannot be mutated, so `count` and `total` must be assigned to and so becomes local variables. The `nonlocal` keyword means the nonlocal variable is binded to the same new value as the local variable at each assignment.




Parameterised decorators: decorators are just functions so they can be even higher order too

```python
def inputs(**schema_kwargs: ty.Type[DataFrameSchema]):
    """
    This exists because our exiting type annotations don't cooperate nicely with static
    typecheckers like pyright.

    Example:

        @inputs(a=Schema)
        def hello(a: pd.DataFrame):
            return pd.DataFrame(...)
    """

    def decorator(f):
        @functools.wraps(f)
        def wrapper(*args, **kwargs):
            _, _, execution_traceback = sys.exc_info()

            params = inspect.signature(f).bind(*args, **kwargs)

            with aggregated_validation_exception(execution_traceback):
                for name, frame in params.arguments.items():
                    if name not in schema_kwargs:
                        continue
                    schema_type = schema_kwargs[name]
                    schema_type().validate(frame, name)

            return f(*args, **kwargs)

        return wrapper

    return decorator
```

$$ Have a look at the 3 example decorators from the book



### Design Patterns

$$ Read more on the Strategy and Command pattern, use sources to learn about more patterns



## Classes and Protocols



### A Pythonic object

### + Special Methods for Sequences



**Special methods**

Object representations:

- `__str__`: return string representation of object as user wants to see it, called with `str()`
- `__repr__`: return string representation of object as developers want to see it, called with `repr()`
- `__bytes__`: return byte representation, called with `bytes()`
- `__format__`: return representation by some format spec, called with `format()` and `str.format()`, which invokes `obj.__format__(format_spec)`

```python
>>> '1 BRL = {rate:0.2f} USD'.format(rate=brl)
'1 BRL = 0.21 USD'	# can be expressed as syntactic sugar of f"1 BRL = {rate:0.2f} USD", str.format() useful when arguments live elsewhere
>>> format(datetime.now(), '%H:%M:%S')
'18:49:05'
```

Iterables

- `__iter__`: return an iterator
  - $$ read page 397

Equality

- `__eq__`: value equality, invoked by `==`

Conversion

- `__abs__`: absolute value, invoked by `abs()`
- `__bool__`: convert to bool, invoked by `bool()`

Hashing

- `__hash__`: invoked by `hash()`



Don't go overboard with implementing dunder methods for every class. implement the ones that is needed in your program. If you're making a library you may want to implement more if the usecase can be wide.







**Alternative constructors**

Because Python doesn't support overloading, alternative constructors are usually implemented as classmethods

```python
@classmethod
def frombytes(cls, octets):	
	# some processing
    typecode = chr(octets[0])
	memv = memoryview(octets[1:]).cast(typecode)
	
    # and finally call the constructor
    return cls(*memv)

# client code
obj = MyClass.frombytes(bytes)
```



**Class decorators**

```python
class Demo:
    @classmethod
    def foo(cls, *args):	# have access to cls but not instance
        pass
    
    @staticmethod
    def bar(*args):			# no cls access, acts as a bounded helper function, rarely useful
        pass
    
    @property
    def x(self):			# creates a readonly attribute obj.x with this getter method
        return self._x
```





**Example Pythonic object**

```python
class Vector:
    
    
    def __format__(self, fmt_spec=''):
        if fmt_spec.endswith('p'):
        	fmt_spec = fmt_spec[:-1]
        	coords = (abs(self), self.angle())
        	outer_fmt = '<{}, {}>'
        else:
        	coords = self
        	outer_fmt = '({}, {})'
        	
		components = (format(c, fmt_spec) for c in coords)
        return outer_fmt.format(*components)
    
    
>>> format(Vector2d(1, 1), '0.5fp')
'<1.41421, 0.78540>
```



**Slots - memory saving**

Normally, attributes of an instance is held inside a dictionary under `.__dict__`. $$ how is dict stored?

```python
class Pixel:
    __slots__ = ('x', 'y')
    
>>> p = Pixel()
>>> p.__dict__		# __dict__ no longer defined after using __slots__
Traceback (most recent call last):
    
>>> p.x = 10
>>> p.y = 20
>>> p.color = 'red'	# can no longer dynamically set attributes
Traceback (most recent call last):
```

Slots have the following benefits:

- Memory efficiency: attributes are fixed so values are stored in a list, attributes act as index to that list
- "Safety": attributes are fixed and cannot be dynamically added (which supports above)
- Performance improvements

Interaction with inheritence

```python
>>> class OpenPixel(Pixel):
... pass
...
>>> op = OpenPixel()
>>> op.__dict__		# Derived class has __dict__
{}
>>> op.x = 8
>>> op.__dict__
{}
>>> op.x
8
>>> op.color = 'green'	# Derived class can access Base class __slots__ as well as add new attributes to __dict__
>>> op.__dict__
{'color': 'green'}

>>> class ColorPixel(Pixel):
... __slots__ = ('color',)
>>> cp = ColorPixel()
>>> cp.__dict__
Traceback (most recent call last):
...
AttributeError: 'ColorPixel' object has no attribute '__dict__'
>>> cp.x = 2
>>> cp.color = 'blue'
>>> cp.flavor = 'banana'
Traceback (most recent call last):
...
AttributeError: 'ColorPixel' object has no attribute 'flavor'	# If Derived class also uses __slots__ then __dict__ is removed
```















### More about type hints

$$ skipped stuff on overloading and type casting

$$ Have a look at Generics and Variance (would be good to reimplement the covariant & contravariant examples in Python (behavioural subtyping))



### Operator overloading

$$ Skipped this one as haven't yet used any





















