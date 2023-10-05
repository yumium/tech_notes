# Python Essentials (for coding interviews)





## 1. String methods

**Slicing**

Slicing returns a new string, leaving the old string unchanged

string[a:b] gives string[a..b). Leaving a and/or b defaults start and ending index.

This is intended so that invariant `string[:a] + string[a:] = string` holds.

If your slicing is illegal, it'll just return the empty string!! Very flexible.

You can also get the last k element by dong `string[-k:]`.

You can get the reverse by doing `string[::-1]`

This is because `string[::k]` gives elements where their indices are divisible by `k`. Then the negative sign gives that but reversed.



**All functions below are not mutable!!**

| [join()](https://www.w3schools.com/python/ref_string_join.asp) | Joins the elements of an iterable **using the string as the separator**. The elements in the list must be all strings. |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [index()](https://www.w3schools.com/python/ref_string_index.asp) | Searches the string for a specified substring and returns the position of first occurrence where it was found, or error otherwise |
| **ord()**                                                    | Gives the ASCII number of the character. chr() does the reverse |
|                                                              |                                                              |
| [islower()](https://www.w3schools.com/python/ref_string_islower.asp) | Returns True if all characters in the string are lower case  |
| [isupper()](https://www.w3schools.com/python/ref_string_isupper.asp) | Returns True if all characters in the string are upper case  |
| [lower()](https://www.w3schools.com/python/ref_string_lower.asp) | Converts a string into lower case                            |
| [upper()](https://www.w3schools.com/python/ref_string_upper.asp) | Converts a string into upper case                            |
| [capitalize()](https://www.w3schools.com/python/ref_string_capitalize.asp) | Converts the first character to upper case                   |
|                                                              |                                                              |
| [startswith()](https://www.w3schools.com/python/ref_string_startswith.asp) | Returns true if the string starts with the specified value   |
| [endswith()](https://www.w3schools.com/python/ref_string_endswith.asp) | Returns true if the string ends with the specified value     |
|                                                              |                                                              |
| [lstrip()](https://www.w3schools.com/python/ref_string_lstrip.asp) | Returns a left trim version of the string (gets rid of `\n` or space etc.) |
| [rstrip()](https://www.w3schools.com/python/ref_string_rstrip.asp) | Returns a right trim version of the string                   |
| [strip()](https://www.w3schools.com/python/ref_string_strip.asp) | Returns a trimmed version of the stringimmed version of t    |
| **[split()](https://www.w3schools.com/python/ref_string_split.asp)** | Splits the string at the specified separator, and returns a list. Like an inverse of join |
| **[splitlines()](https://www.w3schools.com/python/ref_string_splitlines.asp)** | Splits the string at line breaks and returns a list          |
| **[replace()](https://www.w3schools.com/python/ref_string_replace.asp)** | Returns a string where a specified value is replaced with a specified value |
| [zfill()](https://www.w3schools.com/python/ref_string_zfill.asp) | Fills the string with a specified number of 0 values at the beginning |



#### Fancier output

- formatted string literals. Pretty nice (f strings)

```python
>>> x = 2
>>> y = 4
>>> sentence = f"{x} plus {x} equals {y}"
>>> sentence
'2 plus 2 equals 4'
```

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







## 2. Python built-in data structures

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
	Sort the items of the list in place (the arguments can be used for sort customization, see sorted() for their explanation). Sort doesn't work if there isn't a total order in all the items in the list.
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

You can also use `del` to remove variables

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

**.add(x)**	adds x to the set, basically U{x}

**.remove(x)** 	removes x from the set, gives error if x not in set, basically \ {x}



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
boolean = "a" in myDict		# true, returns whether key is in dictionary
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







## 3. Python libraries

### heapq

A suite of algorithms for minHeap

`heapq.heappush(heap, item)`: Added new item to list and maintain heap property

`heapq.heappop(heap)`: Pops the minimum element from heap

`heapq.heapify(heap)`: Heapyfies the list

```python
import heapq
q = [5,4,3,2,1]
heapq.heapify(q)
heapq.heappush(q, 0)
heapq.heappop(q) # 0
```





### deque

A datatype for double-ended queues

`.append(x)`: Add element to right

`.appendleft(x)`: Add element to left

`.extend(it)`: Extends right

`.extendleft(it)`: Extends left, note the elements in `it` are reversed

`.pop()`: Pop from right

`.popleft()`: Pop from left

`.clear()`: Clears the queue

```python
from collections import deque
q = deque()
q.append(0)  # [0]
q.extendleft([1,2,3,4])  # [4,3,2,1,0]
q.pop()  # 0
q.popleft()  # 4
q.clear()  # []
```



### bisect

Implements binary search

`.bisect_left(a, x, lo=0, hi=len(a), key=None)`: returns `i` s.t. a[0..i) < x and a[i..N) >= x

`.bisect_right(a, x, lo=0, hi=len(a), key=None)`: returns `i` s.t. a[0..i) <= x and a[i..N) > x

`key` is a function that takes in value of the array and returns a key value used for comparison (only added after Python 3.10)



```python
from bisect import bisect_left, bisect_right
l = bisect_left(arr, x)
r = bisect_right(arr, x)
```





## 4. I/O

```python
t = int(input())
for i in range(1, t+1):
    N = input()
    arr = [int(s) for s in input().split(" ")]
    print("Case #{0}: {1}".format(i, longestArithmaticSubarray(arr)))
```

