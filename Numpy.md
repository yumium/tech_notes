# Numpy

A Python library for doing numerical computations.

https://numpy.org/doc/stable/user/quickstart.html#stacking-together-different-arrays

```python
import numpy as np
```



ndarrays:

- Fixed size at creation
- All elements of same size => homogeneous
- Much faster when doing calculations



**vectorisation** -> avoid explicit `for` loops which 1) keep elegant Python syntax and 2) allows faster almost-C speed under the hood

**broadcasting** -> almost everything is done element-wise





## Fundamentals

dimensions called *axes*

indexed by tuples of numbers



### **Attributes**:

- `ndarray.ndim` -> # axes of array
- `ndarray.shape` -> dimensions of array = tuple of integers indicating length of array in each axes
- `ndarray.size` -> total # elements in array = product of numbers in .shape
- `ndarray.dtype` -> type of elements in array
- `ndarray.itemsize` -> size in bytes of each element of the array
- `ndarray.data` -> the buffer containing actual elements of array, we usually use indexing to access elements



### **Creation**

```python
a = np.array([1,2,3])

a = np.array(1,2,3)  # WRONG, factory takes one element of sequence type

a = np.array([[1,2],[3,4]])  # Takes sequences of sequences to be 2D array, seq of seq of seq to be 3D etc.

a = np.array([[1,2],[3,4]], dtype=complex)  # type of array can be specified at creation time

np.zeros((3,4))  # Creates an array of 0s, takes a tuple as argument for the dimension

np.ones((2,3,4), dtype=np.int16)  # An array of 1s

np.ones_like(a)  # Replace an array with 1s, keeping original dimension

np.empty((2,3))  # Empty array, initial content is whatever is in memory cell

np.arange(10, 30, 5)  # Creates an array, [10..30) with increment 5

np.arange(0, 2, 0.3)  # Can also have decimal increments

np.linspace(0, 2, 9)  # Decimal increments are bad as it's hard to predict the # of elements because of floating point rounding. Instead we use linspace to create 9 evenly spaced elements in [0..2]
		np.linspace(a, b, 1) gives [a], np.linspace(a, b, 2) gives [a,b]
```

`np.array()`

`np.zeros()`

`np.ones()`

`np.ones_like()`

`np.empty()`

`np.arange()`

`np.linspace()`





### **Printing**

Use `print()`





### **Operators**

- Arithematic operators `+, -, *, /, **`

- Universal functions (ufunc)

  - np.exp(B), np.sqrt(B), np.sin/cos/tan, np.sign(B) (refills with -1/0/1 depending on sign of element)

- Logical operators `a < 35`

  - Shorthand
    for A==B, if B has less rows than A, it copies B multiple times row-wise until dimensions match then carries out element-wise logical comparison
    Note you can sum over booleans. True is 1 and False is 0

- Matrix operators

  - A.dot(B)  # dot product
    - https://numpy.org/doc/stable/reference/generated/numpy.dot.html#numpy.dot
    - Inner product if input is 1D
    - Matrix multiplication if input is 2D
    - A sequence of scalars if `data.dot(x)` where data is a sequence of arrays (2D array) and x is an array. Basically apply dot of x to every row
      - This performs matrix vector multiplication
  - A @ B  # matrix product
  - A.T  # tranpose

- Aggregates

  - .sum(), .min(), .max(), np.average(a, axis=None), .cumsum() -> cumulative sum, .argmax() -> index of max element, given after flatting the input

  - Aggregates treat all ndarrays the same shape, it just does it to all numbers! But you can also aggregate over a single axis

    ```python
    A = np.array([[[1,2],[3,4]],
                  [[1,2],[3,4]]])
    
    >>> A.sum(axis=1)  # Squishing the cube into a square. Axis are labeled from 0
    array([[4, 6],
           [4, 6]])
    # Algorithmically you can think of each element as having a tuple representing its coordinates, then elements with same coord for all axes apart from the chosen axis are aggregated, and that axis disappears in the end
    ```



<u>Note</u>: You can provide "currying" to functions that take multiple arguments. Consider the example

```python
add = lambda x,y : x+y
a = np.array([[1,2],[3,4]])

>>> add(a,1)
array([[2,3]
       [4,5]])

# This is roughly `map (add 1) a`
```







**Indexing, slicing, iterating**

Indexing per axis is done the same way as Python, each axis is separated using `,`

If some are left out, they are assumed to take entire range. So for 2D, b[-1] means b[-1, : ]

`...` represent as many axes needed to complete the indexing. So for 5D, x[4, ..., 5, :] means x[4, :, :, 5, :]



<u>note</u>

Say A has shape (4,2), then A[:,1] has shape (4,) while A[:,1:2] has shape (4,1)



Iterating goes over first dimension

```python
for row in b:
    print(row)
```

`.flat` will collapse ndarray into an array of all elements

```python
for elem in b.flat:
    print(elem)
```





### **Changing shape of array**

`a.reshape(*shape*)` -> returns array with modified shape, taking a single tuple as argument that specifies its new shape

​	We can leave `-1` in one of the dimensions to indicate (whatever value is needed here)

```python
>>> a = np.arange(30)
>>> b = a.reshape((2,-1,3))
>>> b.shape
(2, 5, 3)
>>> b
array([[[ 0,  1,  2],
        [ 3,  4,  5],
        [ 6,  7,  8],
        [ 9, 10, 11],
        [12, 13, 14]],

       [[15, 16, 17],
        [18, 19, 20],
        [21, 22, 23],
        [24, 25, 26],
        [27, 28, 29]]])
```



`a.resize(*shape*)` -> actually change size of array

`a.ravel()` -> return array that's flattened, in lexicographic order of index. As that's usually how the underlying array is stored, this usually won't need copying





### **Stacking arrays**

`np.hstack((a,b))` -> stacks along second axis

`np.vstack((a,b))` -> stacks along first axis

^^ mnemonic is the 2D case

`np.concatenate((a1, a2, ...), axis=0)` -> allow for more arguments specifying how the axis are stacked

​	Arrays a1, a2, ... must have same dimensions apart from axis to be concatenated. If axis is `None`, arrays are flattened before concatenated $$

​	Easy to understand if you think of ndarrays as a mapping between D-dimensional coordinates to values

```python
a1 = np.array([[1,2],[3,4]])
a2 = np.array([[5,6]])

>>> print(np.concatenate((a1,a2.T), axis=1)
array([[1,2,3],
       [4,5,6]])
```

`np.column_stack((a,b,c))` -> stacks 1D arrays as columns into a 2D array

`np.row_stack((a,b))` -> alias for vstack





### **Splitting arrays**

np.hsplit(a, 3) -> split on horizontal axis for `a` into `3` equally spaced arrays

np.hsplit(a, (3,4)) -> split after 3rd and 4th column, indexed at 1

np.array_split(x, k, axis=0) -> split array into k parts, having array sizes of n//k + 1 for as many parts as necessary to cover the remainder if x not multiple of k





### Copying

Simple assignment does not copy at all

```python
>>> a = np.array([[ 0,  1,  2,  3],
              [ 4,  5,  6,  7],
              [ 8,  9, 10, 11]])
>>> b = a            # no new object is created
>>> b is a           # a and b are two names for the same ndarray object
True
```



`.view()` creates a view, so does slicing

```python
>>> c = a.view()
>>> c is a
False
>>> c.base is a
True
>>> c.flags.owndata
False
>>> c = c.reshape((2,6))
>>> a.shape
(3,4)
>>> c[0,4] = 1234
>>> a
array([[   0,    1,    2,    3],
       [1234,    5,    6,    7],
       [   8,    9,   10,   11]])

>>> s = a[:, 1:3]
>>> s[:] = 10
>>> a
array([[   0,   10,   10,    3],
       [1234,   10,   10,    7],
       [   8,   10,   10,   11]])
```

Views references the original ndarray. The data elements are sync-ed



Deep copies will copy out the new matrix

```python
>>> d = a.copy() $$
>>> d is a
False
>>> d.base is a
False
>>> d[0,0] = 9999
>>> a
array([[   0,   10,   10,    3],
       [1234,   10,   10,    7],
       [   8,   10,   10,   11]])
```



Sometimes when you only need a slice of the original matrix, you can create a deep copy and delete the original matrix, releasing space

```python
>>> a = np.arange(int(1E8))
>>> b = a[:100].copy()
>>> del a  # release memory
```







### Functions and Methods Overview

Here is a list of some useful NumPy functions and methods names ordered in categories. See [Routines](https://numpy.org/devdocs/reference/routines.html#routines) for the full list.

- Array Creation

  [`arange`](https://numpy.org/devdocs/reference/generated/numpy.arange.html#numpy.arange), [`array`](https://numpy.org/devdocs/reference/generated/numpy.array.html#numpy.array), [`copy`](https://numpy.org/devdocs/reference/generated/numpy.copy.html#numpy.copy), [`empty`](https://numpy.org/devdocs/reference/generated/numpy.empty.html#numpy.empty), [`empty_like`](https://numpy.org/devdocs/reference/generated/numpy.empty_like.html#numpy.empty_like), [`eye`](https://numpy.org/devdocs/reference/generated/numpy.eye.html#numpy.eye), [`fromfile`](https://numpy.org/devdocs/reference/generated/numpy.fromfile.html#numpy.fromfile), [`fromfunction`](https://numpy.org/devdocs/reference/generated/numpy.fromfunction.html#numpy.fromfunction), [`identity`](https://numpy.org/devdocs/reference/generated/numpy.identity.html#numpy.identity), [`linspace`](https://numpy.org/devdocs/reference/generated/numpy.linspace.html#numpy.linspace), [`logspace`](https://numpy.org/devdocs/reference/generated/numpy.logspace.html#numpy.logspace), [`mgrid`](https://numpy.org/devdocs/reference/generated/numpy.mgrid.html#numpy.mgrid), [`ogrid`](https://numpy.org/devdocs/reference/generated/numpy.ogrid.html#numpy.ogrid), [`ones`](https://numpy.org/devdocs/reference/generated/numpy.ones.html#numpy.ones), [`ones_like`](https://numpy.org/devdocs/reference/generated/numpy.ones_like.html#numpy.ones_like), [`r_`](https://numpy.org/devdocs/reference/generated/numpy.r_.html#numpy.r_), [`zeros`](https://numpy.org/devdocs/reference/generated/numpy.zeros.html#numpy.zeros), [`zeros_like`](https://numpy.org/devdocs/reference/generated/numpy.zeros_like.html#numpy.zeros_like)

- Conversions

  [`ndarray.astype`](https://numpy.org/devdocs/reference/generated/numpy.ndarray.astype.html#numpy.ndarray.astype), [`atleast_1d`](https://numpy.org/devdocs/reference/generated/numpy.atleast_1d.html#numpy.atleast_1d), [`atleast_2d`](https://numpy.org/devdocs/reference/generated/numpy.atleast_2d.html#numpy.atleast_2d), [`atleast_3d`](https://numpy.org/devdocs/reference/generated/numpy.atleast_3d.html#numpy.atleast_3d), [`mat`](https://numpy.org/devdocs/reference/generated/numpy.mat.html#numpy.mat)

- Manipulations

  [`array_split`](https://numpy.org/devdocs/reference/generated/numpy.array_split.html#numpy.array_split), [`column_stack`](https://numpy.org/devdocs/reference/generated/numpy.column_stack.html#numpy.column_stack), [`concatenate`](https://numpy.org/devdocs/reference/generated/numpy.concatenate.html#numpy.concatenate), [`diagonal`](https://numpy.org/devdocs/reference/generated/numpy.diagonal.html#numpy.diagonal), [`dsplit`](https://numpy.org/devdocs/reference/generated/numpy.dsplit.html#numpy.dsplit), [`dstack`](https://numpy.org/devdocs/reference/generated/numpy.dstack.html#numpy.dstack), [`hsplit`](https://numpy.org/devdocs/reference/generated/numpy.hsplit.html#numpy.hsplit), [`hstack`](https://numpy.org/devdocs/reference/generated/numpy.hstack.html#numpy.hstack), [`ndarray.item`](https://numpy.org/devdocs/reference/generated/numpy.ndarray.item.html#numpy.ndarray.item), [`newaxis`](https://numpy.org/devdocs/reference/constants.html#numpy.newaxis), [`ravel`](https://numpy.org/devdocs/reference/generated/numpy.ravel.html#numpy.ravel), [`repeat`](https://numpy.org/devdocs/reference/generated/numpy.repeat.html#numpy.repeat), [`reshape`](https://numpy.org/devdocs/reference/generated/numpy.reshape.html#numpy.reshape), [`resize`](https://numpy.org/devdocs/reference/generated/numpy.resize.html#numpy.resize), [`squeeze`](https://numpy.org/devdocs/reference/generated/numpy.squeeze.html#numpy.squeeze), [`swapaxes`](https://numpy.org/devdocs/reference/generated/numpy.swapaxes.html#numpy.swapaxes), [`take`](https://numpy.org/devdocs/reference/generated/numpy.take.html#numpy.take), [`transpose`](https://numpy.org/devdocs/reference/generated/numpy.transpose.html#numpy.transpose), [`vsplit`](https://numpy.org/devdocs/reference/generated/numpy.vsplit.html#numpy.vsplit), [`vstack`](https://numpy.org/devdocs/reference/generated/numpy.vstack.html#numpy.vstack)

- Questions

  [`all`](https://numpy.org/devdocs/reference/generated/numpy.all.html#numpy.all), [`any`](https://numpy.org/devdocs/reference/generated/numpy.any.html#numpy.any), [`nonzero`](https://numpy.org/devdocs/reference/generated/numpy.nonzero.html#numpy.nonzero), [`where`](https://numpy.org/devdocs/reference/generated/numpy.where.html#numpy.where)

- Ordering

  [`argmax`](https://numpy.org/devdocs/reference/generated/numpy.argmax.html#numpy.argmax), [`argmin`](https://numpy.org/devdocs/reference/generated/numpy.argmin.html#numpy.argmin), [`argsort`](https://numpy.org/devdocs/reference/generated/numpy.argsort.html#numpy.argsort), [`max`](https://numpy.org/devdocs/reference/generated/numpy.max.html#numpy.max), [`min`](https://numpy.org/devdocs/reference/generated/numpy.min.html#numpy.min), [`ptp`](https://numpy.org/devdocs/reference/generated/numpy.ptp.html#numpy.ptp), [`searchsorted`](https://numpy.org/devdocs/reference/generated/numpy.searchsorted.html#numpy.searchsorted), [`sort`](https://numpy.org/devdocs/reference/generated/numpy.sort.html#numpy.sort)

- Operations

  [`choose`](https://numpy.org/devdocs/reference/generated/numpy.choose.html#numpy.choose), [`compress`](https://numpy.org/devdocs/reference/generated/numpy.compress.html#numpy.compress), [`cumprod`](https://numpy.org/devdocs/reference/generated/numpy.cumprod.html#numpy.cumprod), [`cumsum`](https://numpy.org/devdocs/reference/generated/numpy.cumsum.html#numpy.cumsum), [`inner`](https://numpy.org/devdocs/reference/generated/numpy.inner.html#numpy.inner), [`ndarray.fill`](https://numpy.org/devdocs/reference/generated/numpy.ndarray.fill.html#numpy.ndarray.fill), [`imag`](https://numpy.org/devdocs/reference/generated/numpy.imag.html#numpy.imag), [`prod`](https://numpy.org/devdocs/reference/generated/numpy.prod.html#numpy.prod), [`put`](https://numpy.org/devdocs/reference/generated/numpy.put.html#numpy.put), [`putmask`](https://numpy.org/devdocs/reference/generated/numpy.putmask.html#numpy.putmask), [`real`](https://numpy.org/devdocs/reference/generated/numpy.real.html#numpy.real), [`sum`](https://numpy.org/devdocs/reference/generated/numpy.sum.html#numpy.sum)

- Basic Statistics

  [`cov`](https://numpy.org/devdocs/reference/generated/numpy.cov.html#numpy.cov), [`mean`](https://numpy.org/devdocs/reference/generated/numpy.mean.html#numpy.mean), [`std`](https://numpy.org/devdocs/reference/generated/numpy.std.html#numpy.std), [`var`](https://numpy.org/devdocs/reference/generated/numpy.var.html#numpy.var)

- Basic Linear Algebra

  [`cross`](https://numpy.org/devdocs/reference/generated/numpy.cross.html#numpy.cross), [`dot`](https://numpy.org/devdocs/reference/generated/numpy.dot.html#numpy.dot), [`outer`](https://numpy.org/devdocs/reference/generated/numpy.outer.html#numpy.outer), [`linalg.svd`](https://numpy.org/devdocs/reference/generated/numpy.linalg.svd.html#numpy.linalg.svd), [`vdot`](https://numpy.org/devdocs/reference/generated/numpy.vdot.html#numpy.vdot)



### Broadcasting

https://numpy.org/doc/stable/user/basics.broadcasting.html

Why broadcasting?

A lot of operations in `numpy` are done elementwise, with efficient, parallelisable C++ code under the hood. But element-wise operations require the operands to have the same shape. Broadcasting is introduced to relax this constraint while keeping good performance (without needing to actually copy data to have the operands in same shape)



Generally, broadcasting works by extending the smaller matrix to the same size as the larger matrix by copying the values across axes.



<u>Broadcastable</u>

- Dimension of the 2 matrices are compared from inner to outer (right to left). Two dimensions are compatible when

  - They're equal
  - One of them is 1
  -  
  - If they're not compatible the entire matrix pair is not broadcastable

- If one of the matrix runs out of dimensions, we assume it takes length 1 on the extra dimensions

  - Example

  - ```
    A	(3d array): 256 x 256 x 3
    b 	(1d array): 		    3
    
    Then b is assumed to be of shape 1 x 1 x 3
    ```

- Then for each dimension, the one with length 1 is stretched to match the other length, copying the value across this dimension. In the above example, the "line" b is copied across to get a "plane", then finally copied across to get a "cube"

More dimension examples:

```
A      (4d array):  8 x 1 x 6 x 1
B      (3d array):      7 x 1 x 5
Result (4d array):  8 x 7 x 6 x 5
```



Examples:

```python
>>> a = np.array([[ 0.0,  0.0,  0.0],
              [10.0, 10.0, 10.0],
              [20.0, 20.0, 20.0],
              [30.0, 30.0, 30.0]])
>>> b = np.array([1.0, 2.0, 3.0])
>>> a + b
array([[  1.,   2.,   3.],
        [11.,  12.,  13.],
        [21.,  22.,  23.],
        [31.,  32.,  33.]])
>>> b = np.array([1.0, 2.0, 3.0, 4.0])
>>> a + b
ValueError: operands could not be broadcast together with shape (4,3) (4,)
```

```python
>>> a = np.array([1,2,3])
>>> b = np.array([4,5,6])
>>> a.reshape((3,1)) * b
array([[ 4,  5,  6],
       [ 8, 10, 12],
       [12, 15, 18]])
# ^^ This calculates the outer product (a is vertical, b is horizontal)

>>> a.reshape((3,1)) @ b.reshape((1,3))  # explicit outer product gives same result
array([[ 4,  5,  6],
       [ 8, 10, 12],
       [12, 15, 18]])
```





### Boolean selection

```python
>>> a = np.arange(12).reshape(3,4)
>>> b = a > 4
>>> b
array([[False, False, False, False],
       [False,  True,  True,  True],
       [ True,  True,  True,  True]])
>>> a[b]  # Selection
array([ 5,  6,  7,  8,  9, 10, 11])
>>> a[b] = 0  # Modification
>>> a
array([[0, 1, 2, 3],
       [4, 0, 0, 0],
       [0, 0, 0, 0]])
>>> b1 = np.array([False, True, True])
>>> b2 = np.array([True, False, True, False])
>>> a[b1, :]  # Selection per axis
array([[ 4,  5,  6,  7],
       [ 8,  9, 10, 11]])
>>> a[b1]
array([[ 4,  5,  6,  7],
       [ 8,  9, 10, 11]])
>>> a[:, b2]
array([[ 0,  2],
       [ 4,  6],
       [ 8, 10]])
>>> a[b1, b2]
array([ 4, 10])
```



`ix_` function will add 1s to the dimensions that are "missing", similar to broadcasting

```python
>>> a = np.array([2, 3, 4, 5])
>>> b = np.array([8, 5, 4])
>>> c = np.array([5, 4, 6, 8, 3])
>>> ax, bx, cx = np.ix_(a, b, c)
>>> ax
array([[[2]],

       [[3]],

       [[4]],

       [[5]]])
>>> bx
array([[[8],
        [5],
        [4]]])
>>> cx
array([[[5, 4, 6, 8, 3]]])
>>> ax.shape, bx.shape, cx.shape
((4, 1, 1), (1, 3, 1), (1, 1, 5))
```









**Other**

np.where(condition, [x,y]) -> return x if condition is True, y otherwise  $$







## Miscellaneous

`np.unique(ar)`: Prune the array leaving only unique elements. Also return counts, indices etc. if you specify

`np.sort(a, [axis, kind, order])`: Sorts the array `a`. Axis can be an integer or None (None = flatten the array before sorting). If `axis` not provided, will sort the array along last axis `-1`

`np.ndarray.astype(dtype)`: Type casting



- When adding dimensions with fixed integers to an array, instead of stacking, make the extra integers first then add the original array using `out` parameter (say in `linspace`)



















