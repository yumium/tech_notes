# A gentle introduction to Python 3

Python3 language reference: https://docs.python.org/3/reference/index.html#reference-index

Python3 standard library: https://docs.python.org/3/library/index.html#library-index

Python3 official tutorial: https://docs.python.org/3/tutorial/index.html

Python3 glossary: https://docs.python.org/3/glossary.html#glossary

Python3 design FAQ: https://docs.python.org/3/faq/design.html#how-are-lists-implemented-in-cpython

Other useful resource:

- About Python API design, transferrable to other languages: https://benhoyt.com/writings/python-api-design/
- PEP8 style guide, it's short: https://peps.python.org/pep-0008/




Python is:

- Elegant syntax: shorter code
- Dynamic typing
- Interpreted nature: fast development cycle 
- Highly-efficient high level data structures
- Simple but effective approach to OOP
- Extensible: easy to add functions



Stuff to learn in the future:

- Type hints
- Logging module, how does it work
- Packages in detail and preventing circular imports
-  
- From elements of programming interviews
- Garbage collection from cpython internal docs
- Shallow vs deep copy
- List vs tuple, what ways are they similar/different



### Implementation details

Python implementations

- CPython: Standard implementation. First compiles Python code into bytecode, which can then be interpreted efficiently in C.
- PyPy: Implementation with JIT compiler for better performance
- Micropython: Python ported for microcontrollers



Learn about how cPython interpreter works: https://github.com/python/cpython/blob/main/InternalDocs/garbage_collector.md







pycache (.pyc)

- This is the cached Python bytecode that is compiled from the module
- It speeds up load time, but does not speed up runtime



threading / GIL lock

- The standard CPython implementation introduces the global interpreter lock (GIL), which means only one thread ($$) can execute Python bytecode at a time. This makes implementation simpler, as objects such as dictionaries are trivially thread safe.
- Of course, this is only for Python interpreter.
  If some code in Python then goes ahead to execute some other code in C, multithreading can happen in that C code.
  This is where `multithreading` can help (though sometimes marginally) to run programs with a lot of I/O. When multiple threads are running, only one thread can run Python bytecode at a time. But if one thread is blocked on I/O, another thread can be run, leading to performance improvements.
- To better use multicore machines, we can use the `multiprocessing` module to use processes instead of threads, side stepping the GIL



dynamically typed

- Python is dynamically typed (it uses duck types). So types are checked at runtime, instead of compile time (as in statically typed languages)



Memory management: Interpreter has garbage collector



Python vs. C++

- **Types**: Python is dynamically typed, C++ is static. So Python easier to write but C++ is type safe.
- **Compilation**: Python is an interpreted language while C++ is compiled, so C++ is almost always faster. With C++ you have a good understanding of how the assembly code will look like, not so with Python
- **Memory management**: C++ has no garbage collector, and the ability to do pointer operations make the program more prone to memory issues than Python. But it also gives you better control.
- Overall, Python is great for building prototypes, but C++ better for performance-critical systems







### Using the interpreter

Evoke the interpreter by typing `python`

Exit by typing `quit()` or Ctrl-Z

The interpreter operates somewhat like the Unix shell: when called with standard input connected to a tty device, it reads and executes commands interactively; when called with a file name argument or with a file as standard input, it reads and executes a script from that file  `python _filename_`

Do `python -i _filename_` to enter interactive mode right after executing the script. The is sort of like `:load` in Haskell.

Evoke continuation lines with `:`

```
>>> the_world_is_flat = True
>>> if the_world_is_flat:
... print("Be careful not to fall off!")
...
Be careful not to fall off!
```

The last number output is saved in variable `_`

```
>>> tax = 12.5 / 100
>>> price = 100.50
>>> price * tax
12.5625
>>> price + _
113.0625
>>> round(_, 2)
113.06
```





### Variable names

Variable names: **letters, numbers, _**; can't start with number; can tell capitalization





### Strings

Python has no character data type. A "character" is simply a string of length 1.

You can put a string across multiple lines using the triple quote, this adds \n automatically

```python
longSentence = '''\		# the \ gets rid of the first empty line
This is a 
very looooo
oooooog 
sentence'''
```

`+` to do string concatenation. Strings stored in variables can be concatenated this way.

`*` to save yourself writing a for loop

```
>>> 3 * 'un' + 'ium'
'unununium'
```



#### print

Print parses the `\n` to make the string prettier.

You can evoke raw string with `r` to ignore `\n` etc.

```
>>> print(r"user\name")
user\name
```

use `end` in print to avoid starting a new line

```
>>> print("Enter stuff here", end = ": ")
```



#### Indexing

```python
a = "abc"
print(a[2])	#'c'
```

There is also negative indices

```
"	p 	y 	t 	h 	o 	n"

 	0 	1 	2 	3 	4 	5
 	-6	-5	-4	-3	-2	-1
```



#### Slicing

Slicing returns a new string, leaving the old string unchanged

string[a:b] gives string[a..b). Leaving a and/or b defaults start and ending index.

This is intended so that invariant `string[:a] + string[a:] = string` holds.

If your slicing is illegal, it'll just return the empty string!! Very flexible.

You can also get the last k element by dong `string[-k:]`.

You can get the reverse by doing `string[::-1]`

This is because `string[::k]` gives every k-th element. Then the negative sign gives that but reversed.

`string[-4::2]` gives every second element starting from the fourth-last element

`string[1:5:2]` gives every second element in `string[1:5]`

$$ Note: `string[::k]` is just `string[x:y:k]` with x and y omitted (so takes entire string). Similarly, `string[-4::2]` omits the "y"



#### String methods

**Strings are immutable**

```
>>> str = "abc"
>>> str[0] = "d"	# NOT ALLOWED
```



**IMPORTANT**: Because strings are immutable, all of the string methods returns the modified shadow copy of the string, which is nice.

| [capitalize()](https://www.w3schools.com/python/ref_string_capitalize.asp) | Converts the first character to upper case                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [casefold()](https://www.w3schools.com/python/ref_string_casefold.asp) | Converts string into lower case                              |
| [center()](https://www.w3schools.com/python/ref_string_center.asp) | Returns a centered string                                    |
| [count()](https://www.w3schools.com/python/ref_string_count.asp) | Returns the number of times a specified value occurs in a string |
| [encode()](https://www.w3schools.com/python/ref_string_encode.asp) | Returns an encoded version of the string                     |
| **[endswith()](https://www.w3schools.com/python/ref_string_endswith.asp)** | Returns true if the string ends with the specified value     |
| [expandtabs()](https://www.w3schools.com/python/ref_string_expandtabs.asp) | Sets the tab size of the string                              |
| [find()](https://www.w3schools.com/python/ref_string_find.asp) | Searches the string for a specified value and returns the position of where it was found |
| [format()](https://www.w3schools.com/python/ref_string_format.asp) | Formats specified values in a string                         |
| format_map()                                                 | Formats specified values in a string                         |
| **[index()](https://www.w3schools.com/python/ref_string_index.asp)** | Searches the string for a specified value and returns the position of **first occurrence** where it was found |
| [isalnum()](https://www.w3schools.com/python/ref_string_isalnum.asp) | Returns True if all characters in the string are alphanumeric |
| [isalpha()](https://www.w3schools.com/python/ref_string_isalpha.asp) | Returns True if all characters in the string are in the alphabet |
| [isdecimal()](https://www.w3schools.com/python/ref_string_isdecimal.asp) | Returns True if all characters in the string are decimals    |
| [isdigit()](https://www.w3schools.com/python/ref_string_isdigit.asp) | Returns True if all characters in the string are digits      |
| [isidentifier()](https://www.w3schools.com/python/ref_string_isidentifier.asp) | Returns True if the string is an identifier                  |
| **[islower()](https://www.w3schools.com/python/ref_string_islower.asp)** | Returns True if all characters in the string are lower case  |
| [isnumeric()](https://www.w3schools.com/python/ref_string_isnumeric.asp) | Returns True if all characters in the string are numeric     |
| [isprintable()](https://www.w3schools.com/python/ref_string_isprintable.asp) | Returns True if all characters in the string are printable   |
| [isspace()](https://www.w3schools.com/python/ref_string_isspace.asp) | Returns True if all characters in the string are whitespaces |
| [istitle()](https://www.w3schools.com/python/ref_string_istitle.asp) | Returns True if the string follows the rules of a title      |
| **[isupper()](https://www.w3schools.com/python/ref_string_isupper.asp)** | Returns True if all characters in the string are upper case  |
| **[join()](https://www.w3schools.com/python/ref_string_join.asp)** | Joins the elements of an iterable **using the string as the separator**. The elements in the list must be all strings. |
| [ljust()](https://www.w3schools.com/python/ref_string_ljust.asp) | Returns a left justified version of the string               |
| **[lower()](https://www.w3schools.com/python/ref_string_lower.asp)** | Converts a string into lower case                            |
| **[lstrip()](https://www.w3schools.com/python/ref_string_lstrip.asp)** | Returns a left trim version of the string                    |
| [maketrans()](https://www.w3schools.com/python/ref_string_maketrans.asp) | Returns a translation table to be used in translations       |
| [partition()](https://www.w3schools.com/python/ref_string_partition.asp) | Returns a tuple where the string is parted into three parts  |
| **[replace()](https://www.w3schools.com/python/ref_string_replace.asp)** | Returns a string where a specified value is replaced with a specified value |
| [rfind()](https://www.w3schools.com/python/ref_string_rfind.asp) | Searches the string for a specified value and returns the last position of where it was found |
| [rindex()](https://www.w3schools.com/python/ref_string_rindex.asp) | Searches the string for a specified value and returns the last position of where it was found |
| [rjust()](https://www.w3schools.com/python/ref_string_rjust.asp) | Returns a right justified version of the string              |
| [rpartition()](https://www.w3schools.com/python/ref_string_rpartition.asp) | Returns a tuple where the string is parted into three parts  |
| [rsplit()](https://www.w3schools.com/python/ref_string_rsplit.asp) | Splits the string at the specified separator, and returns a list |
| [rstrip()](https://www.w3schools.com/python/ref_string_rstrip.asp) | Returns a right trim version of the string                   |
| **[split()](https://www.w3schools.com/python/ref_string_split.asp)** | Splits the string at the specified separator, and returns a list |
| **[splitlines()](https://www.w3schools.com/python/ref_string_splitlines.asp)** | Splits the string at line breaks and returns a list          |
| **[startswith()](https://www.w3schools.com/python/ref_string_startswith.asp)** | Returns true if the string starts with the specified value   |
| **[strip()](https://www.w3schools.com/python/ref_string_strip.asp)** | Returns a trimmed version of the string                      |
| [swapcase()](https://www.w3schools.com/python/ref_string_swapcase.asp) | Swaps cases, lower case becomes upper case and vice versa    |
| [title()](https://www.w3schools.com/python/ref_string_title.asp) | Converts the first character of each word to upper case      |
| [translate()](https://www.w3schools.com/python/ref_string_translate.asp) | Returns a translated string                                  |
| **[upper()](https://www.w3schools.com/python/ref_string_upper.asp)** | Converts a string into upper case                            |
| **[zfill()](https://www.w3schools.com/python/ref_string_zfill.asp)** | Fills the string with a specified number of 0 values at the beginning |
| **ord()**                                                    | Gives the ASCII number of the character. **chr()** does the reverse |
|                                                              |                                                              |



### Operators

#### Arithmetic operators:

+,-,*,/ (float division, returns float),// (floor division), ** (exponentiation), % (mod), += (increment), -= (decrement)



#### Logical operator:

==, !=, <, >, <=, >=; and, or, not

These can be chained, you can do: `if 8 < age <= 12: `

Python uses `True` and `False`, capitalized!





`A and not B or C` means `(A and (not B)) or C`.

`and` and `or` shortcuits

`in` and `not in` to detect if a value occurs in a sequence type.



#### E-notation

AeB (= A*10^B), returns float









### Types and type conversions

#### Types

Python uses duck typing during runtime, with no static type checker.

Built-in types: https://docs.python.org/3/library/stdtypes.html



**Numerics**: int, float, complex

**Iterator types**: needs `.__iter__()` and `.__next__()`. Required for for loops, `zip()`, `map()` etc.

**Sequence types**: list, tuple, range

**Text sequence**: str

**Binary sequence types**: bytes, bytearray, memoryview

**Set types**: set, frozenset

**Mappings**: dict

**Type annotation types**

**Other**: modules, classes, instances, function, method, type object, null object, boolean values



Type conversion functions: 

float() :: String/Int -> Float

int() :: String/Float -> Int

str() :: Num a => a -> String



when applying int() to a float, it does the same as the floor function



type() function, that tells you the type of the thing







### I/O

#### Prompt the interactive mode

```python
print ("Enter your name: ", end=" ")
name = input()
print ("Hi", name, "how are you today?")
```



#### Fancier output

- formatted string literals. Pretty nice
- str.format(), don't use it, complicated

But useful because many code interviews have older version of Python and doesn't support f strings

```python
>>> sentence = "{} plus {} is {}".format(2,2,4)
```

You can also specify order / use local variables to make it nicer

```python
>>> sentence = "{1} sent {0} a message: {msg}".format("Alice", "Bob", msg="Happy birthday!")
```

- manually slicing and concatenating strings. Strings have many built-in methods including justification. This gives more control.
- `str()` and `repr()`. Good for debugging.



**Formatted string literals**

```python
num = 8
print(f"{num} is a great number!")
```

We can add `:` after the variable to further format it:

eg. An integer causes the field to be a minimum number of characters wide. It does so by padding with spaces.

In addition. '!a' applies ascii(), '!s' applies str(), and '!r' applies repr()  

```python
answer = False
print(f"My answer is {answer!s}")
```



**Manually formatting strings**

Some examples of string methods:

```python
>>> print(str(3).rjust(3), str(10).rjust(3))
  3  10
```

.rjust(num) makes the string `num` characters long by adding spaces on to the left of the string. If string is too big it does nothing.

.ljust and .center does similar things.

.zfill(num) fills a number of preceeding `0` till it's `num` characters wide.



**str() and repr()**

`str()` return the string of the argument, similar to `show` in Haskell.

`repr()` return a more interpreter friendly format if different. No idea what that means.



#### Reading and writing files

In Python, we can deal with files with the Python `file object`.

A file object can be instantiated by:

```python
f = open("text", "w")	# open(filename, mode)
```

Different modes:

- `r` read only
- `w` writing (an existing file with the same name will be erased)  
- `a` appending. Data added will be appended to the end
- `r+` reading and writing

If `mode` is omitted, file is opened for read only.

Text mode and binary mode: 

> The default reading mode is text mode. File is read interpreted as ASCII. In text mode, the default when reading is to convert platform-specific line endings (\n on Unix, \r\n on Windows) to
> just \n.  You can toggle binary mode that reads bits using `b` in the `mode` field.



**Methods on file objects**

`f.read()`: Returns a string containing all the text in the file

`f.read(size)`: Optional arg `size` returns a string containing at most `size` number of characters or bytes (in binary mode)

`f.readline()` return the next line. Think of this as an iterator. It outputs the next string that ends in `\n`. a newline character (\n) is left at the end of the string, and is only omitted on the last line of the file if the file doesn’t end in a newline.  This means `""` is returned if and only if the file has ended (iterator exhausted).

```python
with open('READMD.md', 'r') as f:
    while line := f.readline():
		print(line)
```

There is a better way to iterate through the lines in a file, which is memory efficient:

```python
for line in f:
    print(line)
```

`f.write(str)` takes a string and writes it into the file, returning the # of characters written.

`f.readlines()` return a list of string (lines)

For other methods see reference.









**Closing a file**

Do `f.close()` to close a opened file. This frees up memory.

We can do this to automatically close file after use:

```python
with open("text") as f:
    '''All manipulations to file here'''
# file closed after codeblock
```

Here is a one liner. The python garbage collector will eventually destroy the resource, but the `with` clause makes it more explicit.

```python
content = open('text', 'r').read()
```






##### ASIDE: file path

Windows file path documentation: https://docs.microsoft.com/en-us/dotnet/standard/io/file-path-formats

Best practice is to use the `os.path` module which gives the correct string for your OS

https://docs.python.org/3/library/os.path.html



os.path.join(path, path*): given names of entries, it combines them into a full path

os.path.abspath(path_string): append `path_string` to the current working directory

Example:

You're in directory `/work` and your file is in `/work/data/wine.tsv`. Then to import the tsv file you use

```python
file_path = os.path.abspath(os.path.join('data', 'wine.tsv'))

with open(file_path) as f_data:
    pass
```







### Control flow components

#### If, elif, else

```python
answer = input("Are you a human?(y/n) ")
if answer == "y": 
    print ("Greetings Earthling!")                                         
    answer2 = input("Do you know how to speak our language?(y/n) ")
    if answer2 == "y":
        print ("Bii bup biba bubidi pap!!")
    elif answer2 == "n": 
        print ("Oh... Well, forget it.") 
    else:
        print ("What are you saying?")
elif answer == "n":
    print ("Bii bup babidii bup!")
else:
    print ("What are you saying?")
```

Elif is a handy and succinct alternative to `switch` statements.



#### For loop:

```python
for num in range(11,1001,2):
    for prev_num in range(3,int(num**0.5)+2,2):
        if num%prev_num == 0:
            break
        elif prev_num - int(num**0.5)>= 0:
            print (num)
```

Python's for loop iterates over the items of a sequence (a list, a string). This is different to the way it is done in C.

Modifying the sequence when iterating through it with a `for` loop is prone to errors, better to copy or create a new sequence.



#### Range() function

Range() function returns an object of class `range`, which is a subclass of iterable.

You can use range to iterate through a sequence of numbers.

`range(5)` is syntactic sugar to `range(0,5)`, which gives 0,1,2,3,4

`range(-1, 3)` gives -1,0,1,2

`range(-10, -100, -30)` gives -10, -40, -70

Iterating through the indices can be done in combination with `len`

```
>>> a = ['Mary', 'had', 'a', 'little', 'lamb']
>>> for i in range(len(a)):
... print(i, a[i])
...
0 Mary
1 had
2 a
3 litte
4 lamb
```

**IMPORTANT**: The range function will not iterate if the range is illegal in any way, and will not give an error. This is a very GOOD design as it makes corner cases easy to deal with. The same logic is used with the indices of slicing.



#### While loop

```python
print ("Type 3 to keep me alive")
user = input ("Your response: ")
while user == "3":
    print ("Thank you")
    user = input ("Your response: ")
print ("You didn't type 3, I'm going to die...")
```



Primes, using while loop this time:

```python
print ("2")
for num in range(3, 101, 2):
    limit = int(num**0.5)
    i = 3
    while i <= limit and num%i != 0:  # Invariant: odd integers in range [3..i) cannot divide num
        i += 2
    if i > limit: 
        print(num)
```

"continue" goes to next iteration, "break" quits to loops and goes to next block of code. But avoid using these.



#### Continue, break, else, pass

`continue` skips to the next iteration of the loop.

`break` exits the innermost loop it is in



`else` after `for` or `while` loop will be executed iff the loop is not terminated by `break` (using `continue` in loop doesn't matter)



Another example of `prime` but using `else`

```python
def primes(n):
	'''
		Returns a list of prime numbers from 2 up to and including n
	'''
	if n < 2:
		return []

	primes = [2]
	for n in range(3, n+1, 2):
		# A number is prime if it is divisible only by 1 and itself. We only need to check upto sqrt of number
		for i in range(2, int(n**0.5) + 1):
			if n%i == 0:
				break
		else:
			primes.append(n)

	return primes
```



$$ You also can add a `else` statement after a `while` loop, which will be executed after the `while` loop is escaped. Again, if the `while` loop terminates because of `break` and not the guard being false, the `else` clause will not be executed

```python
>>> while x < 3:
...     print(x)
...     x += 1
... else:
...     print("done")
... 
1
2
done
```

`pass` does nothing. It's there when the syntax of the code requires some code there. It's useful as "code stalks"





### Documentation

Use `#` for inline commenting. Use the triple quotation marks for paragraph commenting







## Python built-in data structures

### Python List

Python list is an array like structure that can take elements of different types.

**list.append(x)**
	Add an item to the end of the list.
**list.extend(iterable)**
	Extend the list by appending all the items from the iterable. Equivalent to **a[len(a):] = iterable.**
**list.insert(i, x)**
	Insert an item at a given position. The first argument is the index of the element before which to insert, so a.insert(0, x) inserts at the front of the list, and a.insert(len(a), x) is equivalent to a.append(x).
**list.remove(x)**
	Remove the first item from the list whose value is equal to x. It raises a ValueError if there is no such item.
**list.pop(*i*)**
	Remove the item at the given position in the list, and return it. If no index is specified, a.pop() removes and returns the last item in the list.
**list.clear()**
	Remove all items from the list. Equivalent to del a[:].
**list.index(x, *start*, *end*)**
	Return zero-based index in the list of the first item whose value is equal to x. If start and end parameters are entered, searches a[start..end). Raises a ValueError if there is
no such item.
**list.count(x)**
	Return the number of times x appears in the list.
**list.sort(key=None, reverse=False)**
	Sort the items of the list in place
	Sort doesn't work if there isn't a total order in all the items in the list
	The argument to `key` is a function to be applied to all elements before performing the sort (the resulting list will still contain the original elements). eg. when we want to sort student by their grades:

```python
students = [('Alice', 77), ('Bob', 88), ('Charlie', 35)]
students.sort(key=lambda xs: xs[1], reverse=True)
```

**list.reverse()**
	Reverse the elements of the list in place. 
**list.copy()**
	Return a shallow copy of the list. Equivalent to a[:].  

(**sorted()** give shadow copies, **reversed()** gives a reverse iterator thing, don't use it)



**Creating a list:**

Lists can be created easily using the list literal, with comma separated values.

```python
myList = [1,2,3]
```



**length**

Use `len()` to get length

```
len(newList)	# 5
```



**concatenation**

You can also use the `+` operator



**Nesting**

Lists can be nested

```
>>> list = [[1,2],[3,4]]
>>> list[0][1]
2
```



**sorted(list) and reversed(list)**

Return a shadow copy of the sorted or reversed of the list. This is a *sequence* method.



**Shallow copying list**

Slicing a list creates a shallow copy (? not ture?)



#### Stack (FILO) as Python List

`list.append()`, `list.pop()`



#### Queue (FIFO) as Python List

`list.insert(0,x)`, `list.pop()`. However, this is not efficient, as operations at the start of the list is O(n). Use the intuition from Haskell



#### List comprehension

>  List comprehensions provide a concise way to create lists. Common applications are to make new lists where each element is the result of some operations applied to each member of another sequence or iterable, or to create a subsequence of those elements that satisfy a certain condition  

YES!

A list comprehension consists of brackets containing an expression followed by a for clause, then zero or more for or if clauses. The result will be a new list resulting from evaluating the expression in the context of the for and if clauses which follow it. 

You can flatten a list of list to a list:

```python
xss = [[1,2],[3,4]]
xs = [item for lis in xss for item in lis]
	# xs = [1,2,3,4]
```

Notice that this is syntactical sugar for

```python
res = []
for lis in xss:
    for item in lis
    	res.append(item)
```

Knowing this, list comprehensions with `for` and `if` mixed around are easier to understand:

```python
res = [x for xs in xss if len(xs) > 2 for x in xs]		# res = [1,2,3,6,7,8], add all elements in lists with length > 2 to res
```



This is cool:

```python
>>> from math import pi
>>> [str(round(pi, i)) for i in range(1, 6)]
['3.1', '3.14', '3.142', '3.1416', '3.14159']
```

List comprehensions can be nested, which should be easy to get right after learning Haskell

```python
mat = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

transposedMat = [[row[i] for row in mat] for i in range(len(mat[0]))]
# transposedMat = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
```



### The all-mighty `del` statement

In lists, `del` is used to remove elements by index, not value.

del a[1], del a[2:4], del a[:]

You can also use `del` to remove variables from the environment

del a



### Python Tuple

Tuple is another *sequence* type that is **immutable**. Though a tuple can contain a list, which is mutable.

**Creating a tuple**

```python
tup = 12345, "a", 3
```

the parenthesis is usually omitted. But you can instantiate with brackets like the standard way. It makes your code clearer.

To create a empty tuple, do `tup = ()`. For a singleton tuple, use this rather ugly notation `tup = "alone",`



**Getting stuff out of the tuple**

**Indexing**:

```python
tup[0]		# 12345
```

Or this (tuple unpacking):

```python
fst, snd, trd = tup
```

this requires there to be as many variables on the LHS as `len(tup)`

Note that multiple variable assignment is just tuple creation and unpacking:

```python
a, b = b, a+b
```

Here a tuple is created with value (b, a+b), then the individual elements are unpacked into `a` and `b`.



### Python Set

A set is an **unordered** collection with no duplicate elements. Has fast membership testing.

Creating a set:

```python
niceCities = {"Helsinki", "Shanghai", "London"}
```

To create an empty set, do `emptySet = set()`, not `{}` as that would create a dictionary. 



Membership testing: use the `in` keyword

```python
print("Helsinki" in niceCities)		# True
```



common methods

**add(x)**	adds x to the set, basically U{x}

**remove(x)** 	removes x from the set, gives error if x not in set, basically \ {x}



Other set operations:

Union: `|`, Intersection: `&`, Relative complement: `-`, Symmetric difference: `^`



Other cool stuff

```python
letters = set("banana")
print(letters)			# {n, b, a}
```

```python
a = {x for x in "korvapusti" if x not in "koira"}		# set comprehension
print(a)				# {'s', 'p', 'u', 'v', 't'}
```


**frozenset()**

Same operations as `set()` removing all that mutates the set. So it's the immutable version of `set()`






### Python Dictionary

In Python, a dictionary is an unordered set of key-value pairs. They behave like maps. Dictionary has the advantage of the fast look-up time.

You can create a dictionary using the dictionary literal:

```python
myDict = {"a": "apple", (1,2): ["banana", "blackcurrent"]}
```

To create an empty dictionary, do `myDict = {}`.

You can look up the dictionary by placing the key inside []:

```python
myDict["a"]				# "apple"
myDict[(1,2)]			# ["banana", "blackcurrent"]
```

All keys of a dictionary must be **immutable**, as if they are mutable and we change it, all the hash table that contains that variable are now at the wrong place.



`.keys()` returns all keys in a list. `.values()` returns all values in a list.

Note that the keys are not ordered. If you want to print an ordered entry you need to sort them with sorted() function. For example:

```python
for key in sorted(myDict.keys()):
    print (key, myDict[key])			# Prints the dictionary in order of keys
```



checking existence

```python
boolean = "a" in myDict		# True, returns whether key is in dictionary
```



deletion

```python
del myDict["a"]				# deletes entry with key "a" in myDict
```



Every key can only map to one value. Take a look at the following error:

```python
dicc = {'a' : 'apple', 'a' : 'ass'}
```

Python will register "a" with the latest definition, ie. "ass" in this case



Use `list()` constructor to create a shadow copy of the list of keys of the dictionary

```python
list({1:2, 3:4})		# [1,3]
```



Use `dict()` constructor to create a dictionary from a list of key:value tuples

```python
myDict = dict([(1,2),(3,4)])
print(myDict)			# 
```

*doesn't seem to work???*



Dictionary comprehension

```python
days = ["Monday", "Tuesday", "Sunday"]
enums = {days[i]:i for i in range(len(days))}
enums["Monday"]			# 0
```

Update a dict

```python
>>> d = {'a': 1, 'b': 2}
>>> e = {'a': 3, 'd': 4}
>>> d | e
{'a': 3, 'b': 2, 'd': 4}
```
`|=` does this in-place (for the left operand)



### Looping techniques

```python
for k, v in dict.items():
```

to get keys and values

```python
for i, v in enumerate(sequence)
```

to get index and value

```python
for fst, snd in zip(list1, list2)
```

to loop over two sequences at the same time

In general, python encourages the traditional, imperative looping style. There is no built-in `filter`, `forEach`, `fold` methods. 







## Namespace and scope

**Namespace**: mapping from names to values. Also known as the environment

There can be many namespaces at any point in time of a program. Some include

- The set of keywords, which cannot be changed
- The set of built-in names: abs(), print etc.
- The global names of the module
- The local names within the function

All of these namespaces are independent from each other. It's 100% OK to have the name `val` appear in different namespaces. However, `val` can only point to one value within a single namespace.

In Python, the currently implementation is the Python dictionary, to track the namespace.



Namespaces are created at different moments and have different lifetimes. 

The namespace containing the built-in names is created when the Python interpreter starts up, and is never deleted. 

The global namespace for a module is created when the module definition is read in; normally, module namespaces also last until the interpreter quits. 

The statements executed by the top-level invocation of the interpreter, either read from a script file or interactively, are considered part of a module called [`__main__`](https://docs.python.org/3/library/__main__.html#module-__main__), so they have their own global namespace. (The built-in names actually also live in a module; this is called [`builtins`](https://docs.python.org/3/library/builtins.html#module-builtins).)

The local namespace for a function is created when the function is called, and deleted when the function returns or raises an exception that is not handled within the function. (Actually, forgetting would be a better way to describe what actually happens.) Of course, recursive invocations each have their own local namespace.





**Scope**: a **textual region** of a Python program where a namespace is directly accessible.

If the variable with name `val` is in a namespace accessible at the textual area of the program which calls it, then the variable is "in scope". Otherwise, the variable is "out of scope".

So the namespaces accessible at a specific point of the program depends on the scopes that include that textual area. Python have a few simple rules that specify which namespaces are accessible, and which names are mutable.

**Accessibility:**

1. The local scope: The local namespace enclosed within the current function or class
2. The non-local scope: The scopes of any enclosing functions, which are searched starting with the nearest enclosing scope, contains non-local, but also non-global names
3. The global scope: This is the global namespace of the loaded module
4. The built-in scope: This is the namespace of the built-in Python.

Notice first that the scope is defined relatively to the point in the textual area we are talking about. If we are looking at a piece of code that is written at the global level (ie. not enclosed within functions or classes), then the "local scope" of that piece of code is the same as the "global scope" of that code. Though the "built-in scope" is clearly defined at any position, because it encloses *everything*.

Notice also that scope is defined to be "outward looking". A part of a program only have access to namespaces that are less specific.

It's important to iterate that namespaces are mutually exclusive, while scopes are overlapping!

When a variable is called, Python would search the variable in the accessible scopes in the order given above, 1 to 4. It will return the first instance of the variable that is found, effectively giving precedence to more local scopes. If not found, Python would return an error.



**Mutability:**

Programs can change the value of variables inside the local scope. However, variables in other accessible scopes are "read-only". $$

If the programmer were to try and mutate those variables, Python would create a variable with the same name inside the local namespace, and map it to the new value.

There are keywords `nonlocal` and `global` which specify that the following piece of code can mutate the values of the variables in the non-local and module scope.

Note that Python have mutability disabled by default. This should encourage the programmers to reduce side-effects, which is a good practice.



**Example**:

```python
value = 1

def outer():
    value = 2

    def middle():
        value = 3

        def inner():
            value = 4
            print("Local:", value)

        inner()
        print("Non-local:", value)

    middle()
    print("Outer:", value)

outer()
print("Module/Global:", value)
```

This code will produce:

```python
Local: 4
Non-local: 3
Outer: 2
Module/Global: 1
```

If we change the inner function to be:

```python
def inner():
    nonlocal value
    value = 4
    ...
```

Then the result is:

```python
Local: 4
Non-local: 4
Outer: 2
Module/Global: 1
```

If we change the inner function to be:

```python
def inner():
    global value
    value = 4
    ...
```

Then the result is:

```python
Local: 4
Non-local: 3
Outer: 2
Module/Global: 4
```

Notice that the `value` in the namespace belong to the `Outer()` function cannot be easily accessed by the `Inner()` function.







## Python Functions (abstraction 1)

Syntax:

```python
def addTwo(arg1, arg2):
    '''A function that comes in handy when you cannot find the + key'''
    return arg1+arg2
```

Use `def` to declare a function.

You must include the `()`, even when there's no arguments.

The argument names are added to the function's local namespace when executed. Values are passed by reference. See "scope" for more.

The string at the start of function code block is the `docstring` that supports online documentation generation.

The `return` keyword is mandatory. Otherwise, the function returns `None`.



Python functions are first-class objects. They can be passed in, and be stored in variables





#### Default values

You can assign arguments defaults values, so if the argument is missing at the call, the default values are passed in.

```python
def greet(message="Hello human"):
    print(message)
```

The default values are only evaluated once when the function is evaluated, and used in every subsequent function call. This is usually the undesired behaviour.

```python
def fList(val, l=[]):
    l.append(val)
    return l

print(fList(1))		# [1]
print(fList(2))		# [1,2]
print(fList(3))		# [1,2,3]
```

One common pattern is this:

```python
def foo(bar=None):
    if bar is None:
	bar = []

    # do stuff
```



#### Keyword values

You can specify exactly which optional values to put in using the `keyword = value` syntax when passing into the function.

In a function call, keyword arguments must follow positional arguments. All the keyword arguments passed must match one of the arguments accepted by the function, and their order is not important. This also includes non-optional arguments. No argument may receive a value more than once.

```python
def tripInfo(destination, time="8am", flight="Finnair"):
    print("Flying to", destination, "at time", time, "with airline", flight)
    
tripInfo("Canary Islands", flight="Jet Blue")
# Flying to Canary Islands at time 8am with airline Jet Blue
tripInfo(destination="Paris")
# Flying to Paris at time 8am with airline Finnair
```

This is useful for flexible input.



We can use `*` and `\` characters to increase specify which arguments are positional and which are keywords.

```python
>>> def standard_arg(arg):		# The pos + keyword input stated above
... print(arg)
...
>>> def pos_only_arg(arg, /):
... print(arg)
...
>>> def kwd_only_arg(*, arg):
... print(arg)
...
>>> def combined_example(pos_only, /, standard, *, kwd_only):
... print(pos_only, standard, kwd_only)
```



As guidance:

- Use positional-only if you want the name of the parameters to not be available to the user. This is useful when parameter names have no real meaning, if you want to enforce the order of the arguments when the function is called or if you need to take some positional parameters and arbitrary keywords.
- Use keyword-only when names have meaning and the function definition is more understandable by being explicit with names or you want to prevent users relying on the position of the argument being passed.
- For an API, use positional-only to prevent breaking API changes if the parameter’s name is modified in the future  



**Syntax restrictions**

There are syntax restrictions in place to make sure no ambiguities can occur. In particular, **all positional arguments must precede keyword/default arguments in both function call and definition**. For example, the following is illegal syntax:

```python
def test(a,b=0,c):  # positional arg on right side of default arg
    return a*b*c

test(2,c=2,4)  # positional arg on right side of keyword arg
```

 

```python
def join(sep=', ', *args):
	
```







#### Arbitrary argument lists

Take all remaining arguments given, these arguments will be wrapped up in a tuple.  $$

Before the variable number of arguments, zero or more normal arguments may occur. After the variable, only keyword arguments can occur.

```python
def write_multiple_items(file, separator, *args):
    file.write(separator.join(args))
```

```python
>>> def concat(*args, sep="/"):
... return sep.join(args)
...
>>> concat("earth", "mars", "venus")
'earth/mars/venus'
>>> concat("earth", "mars", "venus", sep=".")
'earth.mars.venus'
```



A curious case

```python
def join(sep=', ', *args):
    return sep.join(args)
```

In this function, we cannot call it with keyword argument. If we do `join('1', '2', '3', sep='.')`, this is illegal as we are declaring `sep` twice, once as '1' and another as '.' But if we do `join(sep='.', '1', '2', '3')`, that is also illegal, as we are declaring keyword arguments before position ones. The only way is to not use keyword arguments at all `join('.', '1', '2', '3')` (or use keyword argument as only argument to function so there are no positional elements `join(sep='.')`)



#### Unpacking argument lists $$

We might want to do the reverse, when the arguments are packed inside a list while the function wants them one by one. This is conceptually similar to `uncurry` in Haskell.

`*args` simply uncurries a list of arguments

`**args` does the same for an argument dictionary, passing in the mapping of keyword args

```python
def greet(name1='Bob', name2='James'):
    print(f"Hello {name1}, {name2}")

args = ['John', 'Bosh']
args2 = {'name2': 'Bosh', 'name1': 'John'}
greet(*args)	# Hello John, Bosh
greet(**args2) 	# Hello John, Bosh
```





#### Lambda expressions

Anonymous function in Python, restricted to only a single expression. **No need to write "return"**

```python
>>> add5 = lambda x: 5 + x
>>> add5(10)			
15

>>> def make_incrementor(n):
... return lambda x: x + n
...
>>> f = make_incrementor(42)
>>> f(0)
42
>>> f(1)
43
```

Lambda function is helpful when defining sorting order of tuples

```python
>>> pairs = [(1, 'one'), (2, 'two'), (3, 'three'), (4, 'four')]
>>> pairs.sort(key=lambda pair: pair[1])
>>> pairs
[(4, 'four'), (1, 'one'), (3, 'three'), (2, 'two')]
```

Lambdas with 0 or >= 2 arguments:

```python
shout = lambda : print("Whoooo")

sum2 = lambda x, y: x+y
```





## Python Classes and Objects (abstraction 2)

**Intro**

Object = Attributes/Properties + Methods

Methods describe how it changes the attributes of the object. Attributes are the only meaningful thing about the object.

Creating a new class creates a new *type* of object, allowing new *instances* of that type to be made. Each class instance can have attributes attached to it for maintaining its state. Class instances can also have methods (defined by its class) for modifying its state. => attributes: specific to objects, methods: specific to classes

Classes partake of the dynamic nature of Python: they are created at runtime, and can be modified further after creation. => like in JavaScript





**Creating a class**

When a class definition is entered, a new namespace is created, and used as the local scope — thus, all assignments to local variables go into this new namespace. In particular, function definitions bind the name of the new function here.

A sample class can be created as follows:

```python
class MyClass:
    val = 3
    
    def foo():
        print("Hello World")
```

**The first purpose of a class is to provide attribute references.** Here, `MyClass.val` returns an integer object, and `MyClass.foo` returns a function object.



**Instantiation**

**The second purpose of a class is to instantiate objects. To do this, put () behind the class**

In Python, objects are instantiated from classes **without** the `new` keyword found in other languages.

```python
myObject = MyClass()
```

You might want to pass in values at the time of instantiation. This can be done by adding a `__init__()` function, which is evoked with the arguments upon instantiation. This works the same way as `constructor()` in JavaScript.

```python
class Fruit:
    def __init__(self, name):
        self.name = name
        
    def rename(self, newName):
        self.name = newName
        
myFruit = Fruit("apple")
myFruit.name			//"apple"
```





**Instance attribute reference**

The attributes of objects are called instance attribute references.

**The first type of instance attribute reference is data attributes.** These need not to be declared first, and can exist once called. The following code:

```python
myFruit.counter = 1
while myFruit.counter < 10:
    myFruit.counter = myFruit.counter * 2
print(myFruit.counter)
del myFruit.counter
```

will print `16`.

This is similar to the way objects work in JavaScript.



**Method objects**

**The second type of instance attribute reference is methods.** When an attribute called from an object, which is found to be defined in the object's class to be a function type, then the evocation of that function on the object will create a method object.

This is to do with how Python deal with functions in classes. When a function is evoked, the code for the function in the class is referenced, with the object being passed in. So

```python
object.method(...args)
```

is implicitly converted to 

```python
Class.method(object, ...args)
```

The bundle of the reference to the object, and the function in the class, is called a method object. This is why in Python, all the functions of a class require at least one argument, the one that holds the object. There is no restriction what its name is, but the convention is to call it `self`.

From this perspective, class function is a unified way to manipulate the instantiated objects.

Method objects are objects, so can be stored in variables and evoked later

```python
renameFruit = myFruit.rename
print(myFruit.name)				# apple
renameFruit("Bob")
print(myFruit.name)				# Bob
```



**Class attributes vs. Instance attributes**

```python
class Dog:
    kind: "canine"				# Class attribute, belongs to the class, shared to all objects
        
    def __init__(self, name):
        self.name = name		# Instance attribute, belongs to instantiated objects
```



**Priority:**

If the same attribute name occurs in both an instance and in a class, then attribute lookup prioritises the instance:  

```python
class Container:
    item = "shoe"
    
myContainer = Container()
myContainer.item = "lightsaber"
```

=> apparently you can instantiate classes without the `__init__` function.

Here `item` is an attribute name for the object (pointing to "lightsaber") and an attribute name for the class (pointing to "shoe")

Because of the priority rule, `print(myContainer.item)` returns `lightsaber`.



**CARE, mutable fields**

Changes to mutable fields in the class (lists, dictionaries) might give unexpected behaviour

```python
class Basket:
    stuff = []
    
    def addStuff(self, newStuff):
        self.stuff.append(newStuff)

myBasket = Basket()
myBasket.addStuff("apple")

yourBasket = Basket()
yourBasket.addStuff("pineapple")

print(myBasket.stuff)      			# ["apple", "pineapple"]
```

The stuff in `yourBasket` has appeared in `myBasket`.

This is because all the instances of `Basket` is accessing the same list. If `stuff` points to an integer, then reassignment like `self.stuff = 20` would create an instance attribute of the same name, avoiding the conflict. But mutable fields like lists don't have this effect. (though if you try to reassign self.stuff to another list, it would declare a new instance attribute for that)

What we can do is to have `stuff` as an instance attribute, not a class attribute

```python
class Basket:    
    def __init__(self):
        self.stuff = []
        
    def addStuff(self, newStuff):
        self.stuff.append(newStuff)
        
myBasket = Basket()
myBasket.addStuff("apple")

yourBasket = Basket()
yourBasket.addStuff("pineapple")

print(myBasket.stuff)      			# ["apple"]
```



**Methods calling other methods:**

For a method to call a method in the same class, we use the same referencing mechanism discussed earlier. 

```python
class Speaker:
    def speak(self, monologue):
        print(monologue)
        
    def speakTwice(self, monologue):
        self.speak(monologue)
        self.speak(monologue)
```

Here the `self.speak` should call the class function `speak`, provided that the user hasn't redefined `speak` attribute of the object.

Calling the class attribute or instance attribute inside the class function is done the same way.



**Small conclusion**

A good way to think about Python is that Classes and objects are just namespaces. The attributes are just references. They can reference anything.

The only special thing is functions. The functions defined in a class must take at least one argument --- the first argument being the holder for the object.

The way objects work in Python has a very high degree of freedom. They can redefine anything in the class, following the priority rule. SO IT'S IMPORTANT NOT TO DEFINE THINGS IN OBJECTS THAT WOULD INTRODUCE NAME CONFLICTS.



**Inheritance**

Inheritance has a simple definition in Python, as it just extends the namespaces. When we inherit a DerivedClass from a BaseClass, any attribute or method call to objects of the DerivedClass will try to find that name in the DerivedClass's namespace, and if not found, look for it in the BaseClass. This keeps going if the BaseClass is derived from some further classes.

```python
class BaseClass:
    def __init__(self):
        print("Yay")

class DerivedClass(BaseClass):
    pass
```

```python
>>> myC = DerivedClass()
yay
```

One overrides a definition by simply defining it again in the DerivedClass. This way, any object that calls that name will be bounded by the new definition in the derived class.

Because we always search from the bottom, a BaseClass calling a function thinking it will go to the one defined in the BaseClass might go to the DerivedClass. A way to work around it is to let the BaseClass call `BaseClass.method(self,args)` instead of `self.method(args)`.



`isinstance(obj, class)`  check if the object `obj.__class__` is `class` or any class derived from `class`.

`issubclass(class1, class2)` check if `class1` is a subclass of `class2`.





**Mutiple Inheritance**

For most purposes, in the simplest cases, you can think of the search for attributes inherited from a parent class as depthfirst, left-to-right, not searching twice in the same class where there is an overlap in the hierarchy.

```python
class DerivedClass(Base1, Base2, Base3):
    pass
```



**Privacy**

Like JavaScript, privacy is not built-in in Python. A convention is to use `_` before all private attributes and methods.



**Aliasing**

Objects have individuality, and multiple names (in multiple scopes) can be bound to the same object.

This means that passing in objects are cheap as only the reference is passed in.



**Hacking**

A piece of Python code that expects a particular abstract data type can often be passed a class that emulates the methods of that data type instead.

For example, a function might take in a file as an argument and call `read()` and `readline()` on it. It might be easier to test if you create your own class that has internally a string instead of a file, and have functions `read` and `readline` defined. This way, the function using the "file" has no idea that it is actually a string class it is manipulating.





### Additional OOP constructs $$

Abstract methods

```python
import abc import ABC, abstractmethod		# Abstract Base Class

class Producer(ABC):
    @abstractmethod
	def publish(self, message):
        pass
```

All classes inheriting `Producer` here must override methods with decorator `@abstractmethod`. Here it's `publish`



Class methods

```python
class AltString:
    def __init__(self, astring):
        self.s = astring
    
    @classmethod
	def fromlist(cls, alist):
        s = ''.join(alist)
        return cls(s)
```

Class methods pass in the class as the first argument, instead of the object. It can used for example as an alternative constructor (taking use of the class)



Static methods

```python
class AltString:
    def __init__(self, astring):
        self.s = astring
    
    @staticmethod
    def greet(s):
        print(f"Hello, {s}")
```

Static methods are normal functions under the class's namespace. It is used when the method has some connection to the class.









## Python Modules (abstraction 3)

It's tiring to enter stuff into the interpreter one-by-one. That's why we create a text file that saves the script to be executed as once, called a *script*.

*Modules* are different scripts that can work together to allow decomposition. Modules contain statements and definitions.

**Importing modules**

```python
>>> import fibo
>>> fibo.fib(3)
0, 1, 1
```

This imports a module. You could have `fibo.py` saved in the same directory as the script importing the module, under the name `fibo.py`. All names inside the module are only accessible using `module.item`. So calling a module's function with a variable inside the module, we need `module.func(module.arg)`. This is nice as a module doesn't need to worry about name clashes with the global names.

All statements of a module are executed *once* when module is imported. This should initialise the module.

We can save a module's definition to a global variable like this `fibonacci = fibo.fib`

```python
>>> from fibo import fib, fib2
>>> fib(3)
0, 1, 1
```

This adds these names to`__main__`

```python
>>> from fibo import *
```

This imports all names in `fibo` to the global namespace (except those beginning with `_`), which should be avoided

$$ If there are clashes, Python stores the newest value

```python
a = 1
print(a)	# 1
from lib import * 		# lib has a defined as 
print(a)	# 2
```



```python
>>> import fibo as fib
>>> fib.fib(3)
0, 1, 1
```

This just changes the module name.

```python
>>> from fibo import fib as fibonacci
>>> fibonacci(3)
0, 1, 1
```

This just changes the definition name



**The module search path**

The module is searched first in the built-in modules. Then in sys.path which consist of:

- The directory containing the input script (or the current directory when no file is specified).  
- PYTHONPATH (whatever that is)



**Compiled??!!**

When a module is imported, python saves the "compile" version of that module in the folder `__pycache__` to speed up use later on. The whole thing is automatic and you don't need to worry about it.



**Python Standard Modules**

This is the python standard library, which will be introduced later.

This is fun:

```python
>>> import sys
>>> sys.ps1
'>>> '
>>> sys.ps2
'... '
>>> sys.ps1 = 'C> '
C> print('Yuck!')
Yuck!
C>
```



**The dir() function**

dir(module) returns a list of names in the module. dir() returns the list of names in `__main__`.

dir(builtins) for fun



**Packages**

Packages allow you to subdivide python modules into hierarchies using the dotted syntax.

Example package file structure

```
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

The `__init__.py` file is mandatory for stating the current directory is a package. The file is executed when the packages is imported. The file can be empty, which it usually is. Another use is defining the `__all__` variable that defines the packages imported when using the * import, like `from package import *`

```python
__all__ = [
    "echo",      # refers to the 'echo.py' file
    "surround",  # refers to the 'surround.py' file
    "reverse",   # !!! refers to the 'reverse' function now !!!
]

def reverse(msg: str):  # <-- this name shadows the 'reverse.py' submodule
    return msg[::-1]    #     in the case of a 'from sound.effects import *'
```

Another use of `__init__.py` is to forward import common modules to bring them to upper levels, example:

```python
# mypackage/__init__.py
from .module1 import func1
from .module2 import func2

# client code
from mypackage import func1, func2
```

Summary of what modules are good for

- Modularity
- Namespace management. You may have many files named `util.py` but with packages and the dotted notation, we can separate them
- Ease of maintenance (maintain each file separately)
- Clear dependencies
- etc.







## Error handling

```
BaseException
 ├── BaseExceptionGroup
 ├── GeneratorExit
 ├── KeyboardInterrupt
 ├── SystemExit
 └── Exception
      ├── ArithmeticError
      │    ├── FloatingPointError
      │    ├── OverflowError
      │    └── ZeroDivisionError
      ├── AssertionError
      ├── AttributeError
      ├── BufferError
      ├── EOFError
      ├── ExceptionGroup [BaseExceptionGroup]
      ├── ImportError
      │    └── ModuleNotFoundError
      ├── LookupError
      │    ├── IndexError
      │    └── KeyError
      ├── MemoryError
      ├── NameError
      │    └── UnboundLocalError
      ├── OSError
      │    ├── BlockingIOError
      │    ├── ChildProcessError
      │    ├── ConnectionError
      │    │    ├── BrokenPipeError
      │    │    ├── ConnectionAbortedError
      │    │    ├── ConnectionRefusedError
      │    │    └── ConnectionResetError
      │    ├── FileExistsError
      │    ├── FileNotFoundError
      │    ├── InterruptedError
      │    ├── IsADirectoryError
      │    ├── NotADirectoryError
      │    ├── PermissionError
      │    ├── ProcessLookupError
      │    └── TimeoutError
      ├── ReferenceError
      ├── RuntimeError
      │    ├── NotImplementedError
      │    └── RecursionError
      ├── StopAsyncIteration
      ├── StopIteration
      ├── SyntaxError
      │    └── IndentationError
      │         └── TabError
      ├── SystemError
      ├── TypeError
      ├── ValueError
      │    └── UnicodeError
      │         ├── UnicodeDecodeError
      │         ├── UnicodeEncodeError
      │         └── UnicodeTranslateError
      └── Warning
           ├── BytesWarning
           ├── DeprecationWarning
           ├── EncodingWarning
           ├── FutureWarning
           ├── ImportWarning
           ├── PendingDeprecationWarning
           ├── ResourceWarning
           ├── RuntimeWarning
           ├── SyntaxWarning
           ├── UnicodeWarning
           └── UserWarning
```



Generally speaking, Python errors have 2 types, "syntax error" and "exceptions".

Syntax error is built-in and straight-forward.

Exceptions are built-in and can also be user-defined



**Handling exception**

When an exception is raised, we can handle it with `try...except ` clause.

The try statement works as follows.

- First, the try clause (the statement(s) between the try and except keywords) is executed.
- If no exception occurs, the except clause is skipped and execution of the try statement is finished.
- If an exception occurs during execution of the try clause, the rest of the clause is skipped. Then if its type matches the exception named after the except keyword, the except clause is executed, and then execution continues after the try statement.
- If an exception occurs which does not match the exception named in the except clause, it is passed on to outer try statements; if no handler is found, it is an unhandled exception and execution stops with a message as shown above.  

```python
x = 0
while True:
    try:
        x = int(input("Please gimme a number: "))
        break	# To break the while loop
    except ValueError:
        print("Please give number")
	except:	# catch all $$
        print("Unknown error occured")
print(x)
```

- Each `try` clause can be followed by multiple `except` clauses

- The first `except` clause that can accept the error raised will be executed. So there will be at most one except clause being executed.

- An error is compatible with an `except` clause if the class of the clause is the same as the error, or a base class of it. This makes sense in terms of behavioural subtyping.

- We can have a tuple after the `except` to have a same codeblock for multiple types of errors: $$

  ```python
  except(ValueError, RuntimeError, TypeError):
      pass
  ```

- We can extract more info from exceptions, probably using the `as` keyword to tag the exception to a variable:

  ```python
  >>> try:
  ... 	raise Exception(&#39;spam&#39;, &#39;eggs&#39;)
  ... except Exception as inst:
  ... 	print(type(inst)) # the exception instance
  ... 	print(inst.args) # arguments stored in .args
  ... 	print(inst) # __str__ allows args to be printed directly,
  ... 	# but may be overridden in exception subclasses
  ... 	x, y = inst.args # unpack args
  ... 	print(&#39;x =&#39;, x)
  ... 	print(&#39;y =&#39;, y)
  ...
  <class 'Exception'>
  ('spam', 'eggs')
  ('spam', 'eggs')
  x = spam
  y = eggs
  ```

- Exceptions that is raised inside a `except` clause will not be handled by other `except` clauses

- `except` clause will also handle errors raised in functions called in the `try` clause

  ```python
  >>> def this_fails():
  ... 	x = 1/0
  ...
  >>> try:
  ... 	this_fails()
  ... except ZeroDivisionError as err:
  ... 	print('Handling run-time error:', err)
  ...
  Handling run-time error: division by zero
  ```

  





**Optional clauses**

1. The last `except`may omit exception name to catch all other errors. This is good to have:

   ```python
   import sys
   
   try:
       raise ValueError
   except:
       print("Unexpected error:", sys.exc_info()[0])
       raise	# Re-raise the error $$
   ```

2. `else` clause is executed if all of `try` codeblock executes without errors: $$

   ```python
   for arg in sys.argv[1:]:
   	try:
   		f = open(arg, 'r')
   	except OSError:
   		print('cannot open', arg)
   	else:
   		print(arg, 'has', len(f.readlines()), 'lines')
   		f.close()
   ```

   This is better than just adding that code into the `try` codeblock as it provides more structure.

3. `finally` clause is used to have a codeblock that always executes whether or not a `try` block succeeds. This is used for "clean-up" tasks, such as closing a file. You would want to close the file whether the operation on the file is successful or not. $$

   The time where `finally` codeblock is executed in relation to other blocks is rather complicated though:

   - If an exception isn't handled, it's reraised after the `finally` clause

   - If try clause reaches a break, continue, or return statement, `finally` is executed just before break
     And if finally returns a value as well, that is the value returned (instead of from try statement)
   
     ```python
     def bool_return():
         try:
             return True
         finally:
             return False
         
     print(bool_return())		# False
     ```
   
   From this perspective, the closing of the file after `with` statement finishes is an automatic clean-up process.





**Raising error**

We can use the `raise` keyword to forcibly raise an error

The `raise` keyword should follow the error object, or an instantiation of the error class

```python
myErr = ValueError()
raise myErr
```

```python
raise NameError("Hello")
```

```python
raise ValueError	# This is a shorthand for ValueError()
```



We can choose to re-raise the error inside the `except` clause if we just want to print a message, but not actually handle it. We just write `raise`. See ealier.



**User-defined exceptions**

- Exceptions should typically be derived from the Exception class, either directly or indirectly.
- Exception classes can be made to do anything. But they should be kept simple, and allow easy extraction of information by the handler
- When creating
  a module that can raise several distinct errors, a common practice is to create a base class for exceptions defined by that module, and subclass that to create specific exception classes for different error conditions

```python
class Error(Exception):
	"""Base class for exceptions in this module."""
	pass

class InputError(Error):
	"""Exception raised for errors in the input.
		Attributes:
			expression -- input expression in which the error occurred
			message -- explanation of the error
	"""
    def __init__(self, expression, message):
        self.expression = expression
        self.message = message
        
class TransitionError(Error):
    """Raised when an operation attempts a state transition that's not
    allowed.
    Attributes:
    	previous -- state at beginning of transition
    	next -- attempted new state
    	message -- explanation of why the specific transition is not allowed
    """
    def __init__(self, previous, next, message):
    	self.previous = previous
    	self.next = next
    	self.message = message
```

Here's a way to define the `require` function in Scala we know and love:

```python
class Error(Exception):
    pass

class PreconditionError(Error):
    pass

def require(bol):
    if not bol:
        raise PreconditionError
        
def primeFactors(num):
    '''Return a set containing the prime factors of the argument'''
    require(num >= 2)
    
    currentPrime = 2
    factors = set()

    remainder = num
    while remainder > 1:
        while remainder%currentPrime != 0:
            currentPrime = nextPrime(currentPrime)
        remainder /= currentPrime
        factors = factors | {currentPrime}

    return factors
```







## Standard Library

### Multiprocessing

Communication with Queue or Pipe (duplex), thread and process safe.

Inter-process sharing state (though bad practice) can be done with concurrent Value and Array.

Process Pools to simplify multiprocess tasks, can specify max # of tasks to complete per process to kill and start fresh process, this helps freeing memory.



### Text processing

#### re

The Python Regular Expressions Library

Re syntax: https://docs.python.org/3/library/re.html#regular-expression-syntax



re module contents

- `re.compile(patterns,flags=0)`: Computer a regex into a regex object, which can then be used for matching
  The sequence

  ```python
  prog = re.compile(pattern)
  result = prog.match(string)
  ```

  is equivalent to

  ```python
  result = re.match(pattern,string)
  ```

  But creating the regex object is more efficient when the expression will be matched several times

- The above operation returns a Match object, which is truthy when matched and None if not matched, so you can always test for match in an `if` statement

```python
import re
match = re.match(pattern, string)
if match:
    process(match)
```







Common RE expression syntax

| Character        | Notes                                                        |
| ---------------- | ------------------------------------------------------------ |
| `.`              | Match any character **except newline**                       |
| `^`              | Match start of the string (before newline)                   |
| `$`              | Match from end of the string or after newline at end of string (until the next newline) |
| `*`              | Match preceding RE, greedily                                 |
| `+`              | Match preceding RE, at least 1 time, greedily                |
| `?`              | Match preceding RE, 0 or 1 time, greedily                    |
| `*?`, `+?`, `??` | Match minimally for `*`, `+`, or `? ` (match as few as possible) |
| `*+`, `++`, `?+` | Does not algorithmically backtrack when expression fails to match.<br />e.g. `a*+a` will fail to match `aaaa`, as once the `*` portion eats the end 3 `a`s, it will not backtrack to fit the last `a` in the pattern, but instead fail as there are no more characters in the string left to match the last `a` |
| `{m}`            | Match exactly m copies of previous RE                        |
| `{m,n}`          | Match from m to n copies of previous RE<br />Omitting n gives infinite upperbound<br />e.g. `a{4,}b` matches `aaaaaaab` but not `aaab` |
| `{m,n}?`         | ... match minimally                                          |
| `{m,n}+`         | ... match without algorithmic backtracking                   |
| `\`              | Escape for `*`, `?` ...<br />NB please use raw string for REGEX patterns, as otherwise Python treats it as escape |
| `[]`             | Match a set of characters<br />e.g. [amk] matches 'a', 'm', or 'k'<br />Range: [a-z], [0-5], [0-9A-Fa-f] matches hex character<br />All special characters become literals in sets<br />`[^5]` matches anything but a 5<br />`[()[\]{}]` matches all brackets, the `\` escapes bracket close |
| `|`              | A \| B matches either RE A or B<br />Once A matches, B will not be tested |
| `(...)`          | Creates a group, where text can then be extracted after match<br />e.g. `re.match('+([0-9]*) [0-9]*', '+44 7415015823').group(1)` returns `44` |



#### difflib

`difflib.SequenceMatcher`: Uses a more advanced version of "gestalt pattern matching", effectively looks for largest consecutive matching substring (after removing junk characters), and recursively apply left and right portion. Worstcase quadratic runtime

`difflib.Differ`

`difflib.HtmlDiff`: For HTML

#### textwrap

- `textwrap.wrap`: Wrap string to upto to certain width characters long, returning a list of strings
- `textwrap.fill`: Like above but do join with `\n`
- `textwrap.shorten`: Truncating
- `textwrap.dedent`: remove any common leading whitespace from every line in input text
- `textwrap.indent(text, prefix, predicate=None)`: Add prefix to the beginning of selected lines in text, using optional predicate


### Runtime libraries

#### contextlib

Like generators for creating iterators, creates context managers without explicitly defining `__enter__` and `__exit__`.

```python
@contextlib.contextmanager
def _open(file_path):
    f = open(file_path)
    try:
	yield f
	# control returns to caller, code inside caller's `with` block is executed
	# if exception happens inside caller's `with` block, control returns here
    except Exception as e:
	print(f"Error occured in caller's with clause: {e}")
	raise e  # reraise error to cause exception in caller, otherwise caller code immediately after `with` block is executed after clean up, and this exception is suppressed
    finally:
	# called at `__exit__` or when exception happens
	f.close()
```

Possible definitional implementation

```python
class ContextManager(ContextDecorator):
    def __init__(self, generator_function):
        self.generator_function = generator_function

    def __enter__(self):
        # Start the generator and store the generator object
        self.generator = self.generator_function()
        try:
            return next(self.generator)  # Run the setup code and yield control
        except StopIteration:
            raise RuntimeError("The generator didn't yield")

    def __exit__(self, exc_type, exc_value, traceback):
        try:
            # Run the cleanup part of the generator
            next(self.generator)
        except StopIteration:
            return  # Normal behavior as generator is supposed to stop after cleanup
        except Exception as e:
            # If the cleanup raises an exception, it should propagate further
            if exc_type is None:
                raise e
    	else:
	    # If the generator yields more than once, raise an error
	    raise RuntimeError("Generator function has more than one yield statement")
```

So this decorator acts as a adaptor class that takes in a generator and converts it into a class that product context-like objects. Generator works here because `yield` allows us to transfer control before calling clean-up after main block execution.



### time





### datetime





### sys





### os





### requests

Quick start: https://requests.readthedocs.io/en/latest/user/quickstart/

```python
import requests

r = requests.get('https://api.github.com/events')  # Returns a Response object

# Adding payloads
payload = {'key1': 'value1', 'key2': 'value2'}
r = requests.get('https://httpbin.org/get', params=payload)  # This will automatically append the URL with the relevant key value pairs, ignoring keys where the value is None
print(r.url)  # https://httpbin.org/get?key1=value1&key2=value2

# The library makes an educated guess on the encoding scheme and decodes the content
print(r.text)  # 'blahblah'

# You can modify the manually encoding here, and then call `r.text`, which will then decode with the correct encoding
print(r.encoding)  # 'utf-8'
r.encoding = 'ISO-8859-1'

# You can also acess the binary response format
# This can be useful, say, in the situation of processing an image
from PIL import Image
from io import BytesIO
i = Image.open(BytesIO(r.content))

```







### multiprocessing



**Process(target=None, args=(), kwargs={}, name=None)**

target = function the process starts at

args is the argument to pass to function (list of tuple of arguments)



`.start()`: Start the process's activity

`.join([timeout])`: Waits for process to terminate and hence "joins" the parent process

- If `timeout` is None (the default), method will block until the subprocess terminates
- If `timeout` > 0, blocks at most `timeout` seconds before continuing with rest of code (a process can be joined multiple times)

`.name`: Name of process, used for ID-ing only

`.pid`: Returns process ID

`.exitcode`: Exit code of process, returns `None` if not yet terminated

`.terminate()`: Terminate the process. `SIGTERM` on POSIX and `TerminateProcess()` on Windows

`.kill()`: Same as `.terminate()` but uses `SIGKILL` on POSIX

`.close()`: Close Process object, releases all resources associated with it. `ValueError` is raised if the underlying process is still running.



Ways to start a process

`multiprocessing.set_start_method(method, force=False)`

- spawn
- fork
- forkserver



```python
from multiprocessing import Process

def f(name):
    print('hello', name)

if __name__ == '__main__':
    p = Process(target=f, args=('bob',))
    p.start()
    p.join()
    # hello bob
```









**Message passing**

**Queues**

`multiprocessing.Queue([maxsize])`: Implemented using a pipe and a few locks/semaphores

`.qsize()`: Approximate size of queue, not reliable because of concurrency

`.empty()`: Whether queue is empty, not reliable because of concurrency

`.full()`: Whether queue is full, not reliable because of concurrency

`.put(obj, block=True, timeout=None)`: Put `obj` into queue

- `block` is True, `timeout` is None, blocks until a free slot is available
- `block` is True, `timeout` is positive number, blocks at most `timeout` seconds and raise `queue.Full` exception if no free slot is available within that time
- `block` is False, puts an item on the queue if a free slot is immediately available, else raise the `queue.Full` exception

`.put_nowait(obj)`: Same as `.put(obj, False)`

`.get([block[, timeout]])`: Symmetric to `.put()`, raises `queue.Empty` error in this case

`.get_nowait()`: Same as `.get(False)`

`.close()`: Indicates no more data will be put on this queue by current process



```python 
# Simple program communicating using a queue
from multiprocessing import Process, Queue

def f(q):
    q.put([42, None, 'hello'])

if __name__ == '__main__':
    q = Queue()
    p = Process(target=f, args=(q,))
    p.start()
    print(q.get())    # prints "[42, None, 'hello']"
    p.join()
```





**Pipes**

`multiprocessing.Pipe(duplex=True)`: Returns a pair `(conn1, conn2)` of Connection objects representing both ends of pipe

- Default it's bidirectional, each side (`conn_`) has `.send()` and `.recv()` methods. Pipe may become corrupted if more than 1 process try to read from or write to the *same* end of the pipe. But if each process only gets handle to one end of pipe, there is no risk of this.



```python
# Simple program communicating using a pipe
from multiprocessing import Process, Pipe

def f(conn):
    conn.send([42, None, 'hello'])
    conn.close()

if __name__ == '__main__':
    parent_conn, child_conn = Pipe()
    p = Process(target=f, args=(child_conn,))
    p.start()
    print(parent_conn.recv())   # prints "[42, None, 'hello']"
    p.join()
```





> The two connection objects returned by [`Pipe()`](https://docs.python.org/3/library/multiprocessing.html#multiprocessing.Pipe) represent the two ends of the pipe. Each connection object has `send()` and `recv()` methods (among others). Note that data in a pipe may become corrupted if two processes (or threads) try to read from or write to the *same* end of the pipe at the same time. Of course there is no risk of corruption from processes using different ends of the pipe at the same time.



Keep in mind the message to be sent to processes:

- Messages that are too large are inconvenient (try to send pointers, filenames instead)
- All messages must be pickle-able (ie. lambdas won't work)





**Pool()**

Have a pool of processes that runs on an array of data with the same task (data parallel)

`map()`: blocks until entire task is finished

`imap()`: "iterative map", returns results as they materialize

`imap_unorderd()`: Get tasks back in order of which returned first

Modify chunksize to optimise IO / compute trade off

```python
# A trivial process
from multiprocessing import Pool

def f(x):
    return x*x

if __name__ == '__main__':
    with Pool(5) as p:
        print(p.map(f, [1, 2, 3]))
        # [1, 4, 9]
```







**Synchronisation primitives**

Generally not used in multiprocess program as they are in multithreaded program.

Primitives: Barrier, BoundedSemaphore, Condition, Event, Lock, RLock, Semaphore ...

<u>Lock</u>: only 1 process can acquire it at a time

`.acquire(block=True, timeout=None)`: Acquire a lock

- Block is `True`, timeout is `None`: Blocks until lock is free, acquires it, and returns `True`
- Block is `True`, timeout is a positive integer: Block for at most `timeout` seconds, return `True` if able to acquire lock before then, or `False` otherwise
- Block is `False`: Does not block, return `True` if able to acquire lock immediately, and `False` otherwise

`.release()`: Release a lock. This can be called from any process or thread, though I'm a little unclear on the behaviour in that case



```python
from multiprocessing import Process, Lock

def f(l, i):
    l.acquire()
    try:
        print('hello world', i)
    finally:
        l.release()

if __name__ == '__main__':
    lock = Lock()

    for num in range(10):
        Process(target=f, args=(lock, num)).start()
```







**shared state**

You can access `sharedctypes` which are objects in c, which have some thread-safe mechanism built in

```python
from multiprocessing import Process, Value, Array

def f(n, a):
    n.value = 3.1415927
    for i in range(len(a)):
        a[i] = -a[i]

if __name__ == '__main__':
    num = Value('d', 0.0)		# 'd' = double precision float
    arr = Array('i', range(10))	# 'i' = signed integer

    p = Process(target=f, args=(num, arr))
    p.start()
    p.join()

    print(num.value)
    print(arr[:])
```







### textwrap

`textwrap.wrap(text, width=70)`: Maps a string into a list of strings, where each item is no longer than `width` characters long



### difflib

Library for checking text differences, like `gitdiff` and `vimdiff`




### glob

Used to match pathnames to globs via UNIX rules

- `glob.glob(pathname)`: Returns a list of pathnames matched
- `glob.iglob(pathname)`: Returns as iterator
- `glob.translate(pathname)`: Translates and returns UNIX pathname to a regex, which you can match










## Useful libraries

### pyinstaller

Compiles python programs into binary executables on Windows `.exe` file

```shell
python -m pyinstaller "app.py" --add-data "FreeSans.ttf;." --onefile --exclude numpy --exclude mkl
```





### colorama

ANSI escape character sequences for colours


### DiskCache

Library for creating caches on disk

```python
from diskcache import Cache
cache = Cache()
```

Cache is a key-value store and all keys live in the same namespace per directory.

Each cache object is thread safe and can be shared across threads. You can also create multiple cache objects (e.g., across multiple processes) on same directory, which operate on the underlying disk storage atomically.

If no directory is given on creation (like above), uses temporary directory.

Use `.close()` after using cache

```python
cache.close()
with Cache(cache.directory) as reference:
    reference.set('key', 'value')  # True
```

Otherwise it automatically opens cache but slower

```python
cache.close()
cache.get('key')  # Automatically opens, but slower, returns 'value'
```

More arguments for `set`.

```python
cache.set('key', BytesIO(b'value'), expire=5, read=True, tag='data')
```

- `expire`: Expire time in seconds
- `read`: Whether to return a file-like object


You can interact with a cache like how you would with dictionaries

```python
cache['key'] = 'value'
cache['key']  #'value'
'key' in cache  # True
del cache['key']
```

You can add tags to your cache, these are used like comments.

Other flavour of cache objects:

- `FanoutCache`: Cache with automatic sharding (to reduce thread blocking)
- `DjangoCache`: Django compatible
- `Deque`: `collections.deque` compatible
- `Index`: Like an ordered dictionary?
- `Transactions`: Make a group of operations atomic

```python
with cache.transact():
    total = cache.incr('total', 123.45)
    count = cache.incr('count')
```

Settings

- `size_limit`: Max size of cache on disk. `cache.size_limit`
- `cull_limit`:
- `statistics`: Enable to store cache statistics
- `disk_min_file_size`: Min size to store a value in a file
- `disk_pickle_protocol`: Pickle protocol to use for data types not natively supported
- `eviction policy`:
  - `least-recently-stored`: Default. Evict item that was stored earliest
  - `least-recently-used`: 
  - `least-frequently-used`: 
  - `none`: Cache grows without bound, items with expiration are lazily removed

All clients accessing the cache are expected to use the same eviction policy. Eviction happens when cache is full


`diskcache.Disk`

Used for serialising and deserialising data.

```python
class JSONDisk(diskcache.Disk):
    def __init__(self, directory, compress_level=1, **kwargs):
        self.compress_level = compress_level
        super().__init__(directory, **kwargs)

    def put(self, key):
        json_bytes = json.dumps(key).encode('utf-8')
        data = zlib.compress(json_bytes, self.compress_level)
        return super().put(data)

    def get(self, key, raw):
        data = super().get(key, raw)
        return json.loads(zlib.decompress(data).decode('utf-8'))

    def store(self, value, read, key=UNKNOWN):
        if not read:
            json_bytes = json.dumps(value).encode('utf-8')
            value = zlib.compress(json_bytes, self.compress_level)
        return super().store(value, read, key=key)

    def fetch(self, mode, filename, value, read):
        data = super().fetch(mode, filename, value, read)
        if not read:
            data = json.loads(zlib.decompress(data).decode('utf-8'))
        return data

with Cache(disk=JSONDisk, disk_compress_level=6) as cache:
    pass
```

Keys don't go through Python's hash protocol (`__hash__`, `__eq__` ...). Instead, equality determined by bytes after serialisation method defined by `Disk` objects. 
Default disk behaviour:

- Four data types can be stored natively in the cache metadata database: integers, floats, strings, and bytes. Equality works like Python here.
- Other datatypes are converted to bytes via the Pickle protocol. So there may be inconsistencies (e.g., for tuple keys)

`@cache.memoize()`

Cache result of function call. Call to the function with same arguments will return the cached value. (so make sure function is stateless)

Parameters:

-   **cache** -- cache to store callable arguments and return values
-   **name** (*str*) -- name given for callable (default None, automatic)
-   **typed** (*bool*) -- cache different types separately (default False)
-   **expire** (*float*) -- seconds until arguments expire (default None, no expiry)
-   **tag** (*str*) -- text to associate with arguments (default None)
-   **ignore** (*set*) -- positional or keyword args to ignore (default ())

The `__cache_key__` function for the method computes the cache key given arguments

```python
@cache.memoize(expire=1, tag='fib')
def fibonacci(number):
    if number == 0:
        return 0
    elif number == 1:
        return 1
    else:
        return fibonacci(number - 1) + fibonacci(number - 2)

key = fibonacci.__cache_key__(100)  # 354224848179261915075, the cache key when we pass 100 to `fibonacci`
```



## Advanced topics

### **Iterators**

In Python, we can iterate through a sequence type using the syntax `for ident in seq`. Under the hood, python calls `iter(seq)` to generate the iterator, and calls `next(it)` where `it = iter(seq)` to get the elements one by one.

```python
>>> lis = [1,2,3]
>>> iter(lis)
<list_iterator object at 0x7fb4265eb5f8>
>>> it = iter(lis)
>>> next(it)
1
>>> next(it)
2
>>> next(it)
3
>>> next(it)
>>> next(it)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

When the iterator runs out, it gives the `StopIteration` error.

You can build your own iterator in your class by defining an `__iter__()` method which returns an object with a `__next__()` method. If the class defines `__next__(),` then `__iter__()` can just return self:

```python
class Reverse:
	"""Iterator for looping over a sequence backwards."""
	def __init__(self, data):
		self.data = data
		self.index = len(data)
    def __iter__(self):
        return self

    def __next__(self):
        if self.index == 0:
            raise StopIteration
        self.index = self.index - 1
            return self.data[self.index]
```

The Reverse class create objects that are iterators immediately (you can call next(...) without calling iter(..) to get the iterator first). I don't know how to not create the iterator right away though. I might need Generators, which are things in Python that allow easy creation of iterators.



### **Generators**

Generators are written like regular functions but use the `yield` statement whenever they want to return data. Each time next() is called on it, the generator resumes where it left off (it remembers all the data values and which statement was last executed).

The previous Reverse class can be written succinctly as

```python
def reverse(data):
    for i in range(len(data)-1, -1, -1):
        yield(data[i])
```

```
>>> lis
[1, 2, 3]
>>> it = reverse(lis)
>>> next(it)
3
>>> next(it)
2
>>> next(it)
1
>>> next(it)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

`reverse` is now a function that returns an iterator

Generators provides convenience, specifically:

- No need to define a class for it
- No need to define iter() and next()
- No need to keep intermediate variables manually to track state, such as `self.index` and `self.data`
- StopIteration error automatically created, no need to raise manually



### Decorators

https://realpython.com/primer-on-python-decorators/#decorating-classes

https://www.programiz.com/python-programming/decorator

In Python, everything are objects. Functions are essentially objects with a `__call__` method defined.

Sometime, we want to create **a higher-order function that returns a function** (= decorator) with some additional functionality than the function argument, thereby "decorating" it. For example:

```python
def ordinary():
    print('ordinary')
    
def extra(func):
    def res():
        print('I\'m extra',end='')
        func()
    return res
```

Then perhaps you want to reassign the decorated function back to its original variable:

```python
ordinary = extra(ordinary)
```

Well, decorator is simply a shorthand for this. It's all syntactical sugar

```python
def extra(func):
    def res():
        print('I\'m extra',end='')
        func()
    return res

@extra
def ordinary():
    print('ordinary')
    
ordinary()  # extraordinary
```



```python
def safe(f):
    def res(*args):
		try:
            f(*args)
		except ZeroDivisionError:
            print('An error occured.')
	
    return res
```





**Decorator for function with parameters**

Sometime you might want to do this (the decorated function need to take parameters)

```python
def divide(a,b):
    '''
    	Divides `a` to `b` using floating point division
    '''
    return a/b

def safe(func):
    def res(a,b):
        try:
            func(a,b)
        except:
            print("Sorry, an error occured")
	return res

safe(divide)(2,0) # Sorry, an error occured
```

This can be written as:

```python
@safe
def divide(a,b):
    return a/b
```

Notice how the arguments of the returned function of the decorator must match the function it is decorating.

Actually, using expandable arguments syntax, we can make more generic decorators

(`args` will be the [tuple](https://www.programiz.com/python-programming/tuple) of positional arguments and `kwargs` will be the [dictionary](https://www.programiz.com/python-programming/dictionary) of keyword arguments.)

```python
def safe(func):
    def res(**args, **kwargs):
        try:
            func(**args, **kwargs)
        except:
            print('Sorry, an error occured')
	return res

@safe
def divide(a,b):
    return a/b
```

Now the decorator will pass whatever arguments down to the decorated function







**Chaining decorators**

When you stack decorators, they are applied from bottom to top. For example:

```python
def a(func):
    def res():
        print('a',end='')
        func()
    return res

def b(func):
    def res():
        print('b',end='')
        func()
    return res
    
@a
@b
def c():
    print('c')

# This is the same as `c = a(b(c))`

c()  # abc
```



When you decorate a function, the name remains the same. In the above example, the function `c` is still named `c` after being decorated by `b` and `a`





### Virtualisation

**venv**

https://docs.python.org/3/library/venv.html

Sometimes for projects you want to create virtual environments, so the packages and configurations won't pollute other projects. It's in general difficult to have a version of Python that works for all projects.

This means having a separate `bin` folder for python etc.

To create a virtual environment for your project directory, cd into the directory and run

```python
python -m venv .venv
```

This will create a folder called `.venv` that contains a local installation of python.

To activate the virtual environment, run `source .venv/bin/activate`

Then you can show and install packages with `pip` as per usual



Sometimes you want to install many versions of Python on your machine. Here's a good way to do it:

https://stackoverflow.com/questions/38592329/how-to-install-another-version-of-python-on-linux



Note, when you are in the venv, the python used is the one inside the /bin folder of the venv.



Use `deactivate` to deactivate the venv



## Data Model

All data in Python represented by objects.

Object has:

- Identity => equality by `is` operator, `id(obj)` returns the identity, in CPython this is memory address of object. Unchangeable per object
- Type => what operations it supporst, `type(obj)` returns the type. Unchangeable per object
- Value => what the object holds. Immutable objects where underlying objects are mutable can take different values, but are still immutable, as the objects it contains cannot change identity. So immutability in Python means immutable identity, not necessarily value

CPython garbage collector has not guarantee on when objects are freed. It usually free them as soon as they're out of reach. Cyclic reference detection is not guaranteed.

If object uses file handler etc. use `.close()` clause to close immediately, rather than relying on automatic freeing when object is recycled

Variables pointing to immutable types of same value may share same identity, but never for mutable values. `a = []; b = []` always allocate individually, (note `a = b = []` syntax or `a = []; b = a` have both variables point to same reference)


Python type hierarchy

- None
- Numbers
  - float
  - int
  - bool
  - complex
- Sequences
  - str
  - tuple
  - bytes
  - list
  - bytearray
- Set
  - set
  - frozenset
- Mappings
  - dict
- Callable
  - functions
  - methods
  - classes


### Special method names

Operators in Python envoke special methods on the object. Example

```python
print(x[i])
# is equivalent to
print(type(x).__getitem__(x, i))
# is equivalent to
print(x.__getitem__(i))
```

This means overloading these methods will give custom behaviour on operators for your class. If your object doesn't have the method or the function is defined as `None`, will raise error if trying to use these operators.

Examples:

- `obj.__new__`: Allow instantiating a class
- `obj.__init__`: Called after instance creation
- `obj.__del__`: Called right before object destroyed
- `obj.__repr__`: Called with `repr()`
- `obj.__str__`: Called with `print()`
- `obj.__lt__(self, other)`: Called with `<`
- `obj.__hash__`: Called with `hash()`
- `obj.__bool__`: Called with `bool()`
- `obj.__instancecheck__(self, instance)`: Called with `isinstance()`
- `obj.__subclasscheck__(self, subclass)`: Called with `issubclass()`
- `obj.__call__(self[, args...])`: Emulating callable types
- `obj.__len__`: Emulating container types
- `obj.__getitem__`:
- `obj.__setitem__`:
- `obj.__contains__`:
- `obj.__add__(self, other)`: Emulating numeric types
- `obj.__enter__`: Emulating context managers (called with `with`)
- `obj.__exit__`: 



## Miscellaneous

### **id**

`id` function return an id that corresponds to the location of the variable



### **Python ternary statements**

```
value_if_true if condition else value_if_false
```
Example:
```python
print("Left" if True else "Right")		   # Left
print("Left" if not True else "Right")	  # Right
```

As a ternary statement is actually an expression, they can be chained

```python
val = 40
print("small" if val < 20 else "medium" if val < 40 else "large")  # large
```

From the syntax point of view, there could be ambiguity for the 2 different evaluation orders:

1. ("small" if val < 20 else "medium") if val < 40 else "large"
2. "small" if val < 20 else ("medium" if val < 40 else "large")

But after experimentation, we can conclude that the expressions associate to the right



### **eval and exec**

One evaluates an expression to give a value and the other executes a statement. Don't use them in production code

Note, if you want to execute `exec(loc_var = 1)`, do instead `loc_var = eval('1')`



### **with**

https://www.geeksforgeeks.org/with-statement-in-python/

The Python `with` keyword provides abstraction that automatically handles resource management and error handling.

For example, you can interact with a file this way:

```python
# file handling

# 1) without using with statement
file = open('file_path', 'w')
file.write('hello world !')
file.close()

# 2) without using with statement
file = open('file_path', 'w')
try:
	file.write('hello world')
finally:
	file.close()
```

... or you can use a simple `with` keyword to add both functionalities

```python
# using with statement
with open('file_path', 'w') as file:
	file.write('hello world !')
```



`with` keyword can be used for any class with `__enter__` and `__exit__` method defined. For example:

```python
# a simple file writer object

class MessageWriter(object):
	def __init__(self, file_name):
		self.file_name = file_name
	
	def __enter__(self):
		self.file = open(self.file_name, 'w')
		return self.file

	# last 3 arguments are filled if exception is raised inside the `with` block
	# otherwise, `None` is passed to them
	# to prevent the exception from propagating, return `True` in this method
	def __exit__(self, exc_type, exc_value, traceback):
		self.file.close()

# using with statement with MessageWriter

with MessageWriter('my_file.txt') as xfile:
	xfile.write('hello world')
```

When `with` statement is executed, an object is created and immediately after, the `__enter__` method is called, which returns a resource descriptor (handles provided by the OS to use the resource) that is captured by word `xfile`. You can then interact with the resource using `xfile`. After all the code in the block is executed, the `__exit__` method is called. If exception happens within the `with` block, the `__exit__` method is called after the exception, ensuring resoures are reclaimed.



### **python wheels**

https://realpython.com/python-wheels/

`.whl` file is a python wheel. You might see it when you install packages with `pip`

> A Python `.whl` file is essentially a ZIP (`.zip`) archive with a specially crafted filename that tells installers what Python versions and platforms the wheel will support.

It is better because:

- It's compressed so smaller in size than source code
- It is already built, so no need to build before installation (Python packages usually either come in source code (meaning build then install) or wheels (meaning install straight away))

Wheel naming convensions:

> ```
> {dist}-{version}(-{build})?-{python}-{abi}-{platform}.whl
> ```

Example

> ```
> cryptography-2.9.2-cp35-abi3-macosx_10_9_x86_64.whl
> ```

Universal wheel: install with Python 2 or 3 on any platform with any ABI

Pure-Python: install with Python 3 on any platform with any ABI

Developers can use the package `wheel` to build wheels for their packages



### **data model**

https://docs.python.org/3/reference/datamodel.html#object.__str__

`__str__(self): string` to specify what the printed string for the object will be

`__eq__(self,other): bool` to specify object equality. This is used in `==` and `in` keyword when doing comparison in collections





### **walrus operator**

The walrus operator assigns value to variables in-situ, saving result of expensive operations without adding an extra line of code. For example:

```python
if (mem := expensive()):
   	...
...
func(mem)
```





### **int to float**

You can write `255.` to create a floating point integer





### **pip vs conda**

Pip is the recommended package manager and installer for Python. It install packages from Python Package Index (PyPI)

Conda is a cross platform package and environment manager. Packages are from the Anaconda repository and Anaconda Cloud. Conda packages are binaries so no compiler needed.

Key differences:

- Pip install Python packages whereas conda can install packages for multiple languages (incl. Python)
- Conda can create isolated environments with multiple versions of Python in them -> useful for data science when packages have conflicts
  Pip relies on other tools like `venv` and is less powerful
- Pip install packages in a recursive, serial loop. This can break under subtle conflicts, such as when earlier packages conflict with later packages.
  Conda makes dependencies safe by, wait for it, a SAT solver! So installation will take a longer time but it avoids these subtle issues.


### circular imports

```
ImportError: cannot import name 'MyClass' from partially initialized module 'related_module' (most likely due to a circular import)  (/path/to/your/related_module.py)
```

This means there is circular dependency in the imports meaning no module can be defined fully.

Solutions:
1. Put common functionality into a 3rd module
2. Deferred import
```python
def my_function_the_internet_doesnt_like(self, value):
    from another_module import AnotherClass
    value = AnotherClass(whatever=value)
    return value.to_that_return_type()
```






