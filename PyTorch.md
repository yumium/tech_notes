# PyTorch

Key features of PyTorch:

- Tensor object, like numpy arrays with GPU acceleration
- Optimised autograd engine
- API for building and deploying DL models



Tutorial: https://pytorch.org/tutorials/

Docs: https://pytorch.org/docs/1.1.0/

Pytorch internals: http://blog.ezyang.com/2019/05/pytorch-internals/



Getting dataset with coutils

```python
coutils.data.cifar10()
```

https://www.cs.toronto.edu/~kriz/cifar.html



**Why use vectorisation?**

- Cleaner code = easier to debug
- Faster speed, as these constructs can be optimised by torch and ran with multiple threads on GPUs, say



```python
import torch
print(torch.__version__)
```





### Tensor basics

<u>All pretty much same as numpy</u>

```python
b = torch.tensor([[1,2,3],[4,5,6]])
print(b)
print(b.dim()) # Rank of b, i.e. # of axes
print(b.shape()) # Shape of b, tuple of length of each dim
print(b[0,1]) # Access elements
b[1,1] = 100 # Mutate elements
type(b[0,1].item()) # Converts PyTorch scalar to Python scalar
```

torch.zeros(2,3)

torch.ones(1,2)

torch.zeros_like(x0)

torch.eye(3) -> 3x3 identity matrix

torch.rand(4,5) -> 4x5 random tensor

torch.full((3,3), 7) -> 3x3 tensor of 7s

torch.linspace(20, 40, 10) -> (10,) tensor with values distributed evenly between [20,40]

torch.arange(n) -> tensor(list(range(n)))





### **Datatypes**

https://pytorch.org/docs/1.1.0/tensor_attributes.html#torch-dtype

`a.dtype` -> return datatype of the tensor (recall each tensor must be uniform in its datatype)



Initialise:

a = torch.ones(1, 2, dtype=torch.uint16)



Casting:

x1 = x0.to(torch.float64)



Same type:

x1 = x0.new_zeros(4,5) -> 4x5 tensor of 0s casted to same type as x0.dtype



Most common uses:

- `torch.float32`: Standard floating-point type; used to store learnable parameters, network activations, etc. Nearly all arithmetic is done using this type.
- `torch.int64`: Typically used to store indices
- `torch.uint8`: Typically used to store boolean values, where 0 is false and 1 is true.
- `torch.float16`: Used for mixed-precision arithmetic, usually on NVIDIA GPUs with [tensor cores](https://www.nvidia.com/en-us/data-center/tensorcore/). You won't need to worry about this datatype in this course.
- `torch.bool`





### **Indexing and slicing**

Same as Numpy.

As with Numpy, slicing creates a **view** on the data do modification will change the original tensor. Use `.clone()` to create a deep copy.

We can use `...` to fill `:` in all the dimensions in between

```python
>>> a = t.tensor([[1,2,3], [4,5,6]])
>>> a[..., 2]
tensor([3,6])
```





### **Integer tensor indexing**

Pretty odd stuff here.

Allow you to create copies of new subtensors easily.

```python
a = torch.tensor([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])

idx = [0, 0, 2, 1, 1]  # index arrays can be Python lists of integers
print('\nReordered rows:')
print(a[idx])

'''
Reordered rows:
tensor([[ 1,  2,  3,  4],
        [ 1,  2,  3,  4],
        [ 9, 10, 11, 12],
        [ 5,  6,  7,  8],
        [ 5,  6,  7,  8]])
'''

idx = torch.tensor([3, 2, 1, 0])  # Index arrays can be int64 torch tensors
print('\nReordered columns:')
print(a[:, idx])

'''
Reordered columns:
tensor([[ 4,  3,  2,  1],
        [ 8,  7,  6,  5],
        [12, 11, 10,  9]])
'''

# If we use index list for more than 1 dimension, we zip the lists and apply them

a = torch.tensor([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
idx = [0,1,2]
# Setting the diagonal
a[idx, idx] = torch.tensor([11, 22, 33])
print(a)

'''
tensor([[11,  2,  3],
        [ 4, 22,  6],
        [ 7,  8, 33]])
'''
```





### **Boolean tensor indexing**

Similar to numpy.

Remember boolean operations are pair-wise and returns a boolean matrix with the same shape:

```python
a = torch.tensor([[1,2],[3,4],[5,6]])
mask = (a > 3)
print(mask)

'''
tensor([[False, False],
        [False,  True],
        [ True,  True]])
'''
```

Then we can index based on this mask, which will return an array of elements where the mask is 1

```python
print(a[mask])

'''
tensor([4, 5, 6])
'''
```

We can of course merge these into one step. Below we demonstrate assignment using boolean masks:

```python
a[a <= 3] = 0
print(a)

'''
tensor([[0, 0],
        [0, 4],
        [5, 6]])
'''
```





### **Reshaping**

`a.view(*shape*)` is the reshape function in PyTorch

​		You can put `-1` as the number for one dimension, which completes to whatever makes the shape complete.

```python
def cv(x):
    # Assume x is a 1D tensor
    return x.view(-1,1)
```



<u>Transpose</u>

One cannot transpose with `.view()`. This is because `.view()` operates by flattening the tensor (enumerating in lexicographic order of index) and constructing the new tensor row by row, giving the right # of elements each row (and if a row also has rows, we distribute row by row recursively).

`a.t()` will do the transpose for 2D case.

`a.transpose(1,2)` -> swaps second and third index of tensor. Example:

```python
# Shape (2,3,4)
x0 = torch.tensor([
     [[1,  2,  3,  4],
      [5,  6,  7,  8],
      [9, 10, 11, 12]],
     [[13, 14, 15, 16],
      [17, 18, 19, 20],
      [21, 22, 23, 24]]])

# Shape (2,4,3)
x1 = x0.tranpose(1,2)
print(x1)

'''
tensor([[[ 1,  5,  9],
         [ 2,  6, 10],
         [ 3,  7, 11],
         [ 4,  8, 12]],

        [[13, 17, 21],
         [14, 18, 22],
         [15, 19, 23],
         [16, 20, 24]]])
'''
```

To understand the semantics of `.transpose()`, let's imagine a tensor as a mapping between indices (i,j,k) and values x. Tranpose(1,2) then acts as a remapping where x is now mapped to (i,k,j) where (i,j,k) is its original index. Naturally, the shape of the new tensor is (2,4,3). In this example, we are transposing each level while keeping the levels the same.

The function `permute()` generalises this remapping to more than 2 dimensions:

```python
x2 = x0.permute(1,2,0)
print(xs)

'''
tensor([[[ 1, 13],
         [ 2, 14],
         [ 3, 15],
         [ 4, 16]],

        [[ 5, 17],
         [ 6, 18],
         [ 7, 19],
         [ 8, 20]],

        [[ 9, 21],
         [10, 22],
         [11, 23],
         [12, 24]]])
'''
```

Note: values only exist "in the last dimension" if that makes sense, there are no "intermediate values" in the intermediate dimensions.



Cryptic reshaping errors, fix:

```python
# Put contiguous before view
x1 = x0.transpose(1, 2).contiguous().view(8, 3)

# Use reshape instead of view
x2 = x0.transpose(1, 2).reshape(8, 3)
```



`torch.squeeze(input, dim=None)`: returns original tensor reshaped so that all dimensions with magnitude 1 are removed. Optional `dim` parameter specifies the exact dimension to squeeze.

`torch.unsqueeze(input, dim)`: return original tensor reshaped so that an dimension is added at position `dim` (zero-based)









### **Tensor operations**

Binary arithmetic operators are element-wise: +,-,*,/,**

Torch has many other math operations, which mostly exist also as method of tensor objects:

```python
print(torch.sqrt(x))
print(x.sqrt())
```



Reduction/Aggregate operators

sum, mean, max, min ... Again can be torch functions or method of tensor objects

```python
print(x.sum(dim=1, keepdim=True))  # keepdim keeps the dimension, having size 1 for the dimension being aggregated over
```

`torch.argmin(*input*, *dim=None*, *keepdim=False*)`: Returns the indices of the minimum value(s) of the flattened tensor or along a dimension

Note, `dim` can also take a list of dimensions.



`torch.topk(input, k, dim=None, ...)`: Returns the `k` largest elements (and their indices) of the given `input` tensor along a given dimension. The return values have dimension that's the same as original tensor but the `dim` dimension only has k values. The returned index has the same dimension as values, but each element represent the index along `dim`. Example:

```python
a = torch.arange(9).reshape((3,3))
print(a)

'''
tensor([[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]])
'''

torch.topk(a,2,dim=0)

'''
torch.return_types.topk(
values=tensor([[6, 7, 8],
        [3, 4, 5]]),
indices=tensor([[2, 2, 2],
        [1, 1, 1]]))
'''
```



`torch.mode(input, dim=-1)`: Returns the mode and index along that dimension, will shrink output in that dimension. If there are ties, the smallest element in returned. Example:

```python
a = torch.arange(6).reshape((2,3))
a[1,0] = -1
print(a)

'''
tensor([[ 0,  1,  2],
        [-1,  4,  5]])
'''

torch.mode(a, dim=0)

'''
torch.return_types.mode(
values=tensor([-1,  1,  2]),
indices=tensor([1, 0, 0]))
'''
```



`torch.chunk(*input*, *chunks*, *dim=0*)`: Attempts to split a tensor into the specified number of chunks. Each chunk is a view of the input tensor.



`torch.cat(tensors, dim=0, ...)`: Concatenates the given sequence of `seq` tensors in the given dimension. All tensors must either have the same shape (except in the concatenating dimension) or be empty.





Matrix operations

- [`torch.dot`](https://pytorch.org/docs/1.1.0/torch.html#blas-and-lapack-operations): Computes inner product of vectors
- [`torch.mm`](https://pytorch.org/docs/1.1.0/torch.html#torch.mm): Computes matrix-matrix products
- [`torch.mv`](https://pytorch.org/docs/1.1.0/torch.html#torch.mv): Computes matrix-vector products
- [`torch.addmm`](https://pytorch.org/docs/1.1.0/torch.html#torch.addmm) / [`torch.addmv`](https://pytorch.org/docs/1.1.0/torch.html#torch.addmv): Computes matrix-matrix and matrix-vector multiplications plus a bias
- [`torch.bmm`](https://pytorch.org/docs/1.1.0/torch.html#torch.addmv) / [`torch.baddmm`](https://pytorch.org/docs/1.1.0/torch.html#torch.baddbmm): Batched versions of `torch.mm` and `torch.addmm`, respectively. Input tensor has 1st dimension as the batch dimension.
  Example: we have a batch of size B of matrices of size (n,m) and (m,k), then we want X.shape = (B,n,m) and Y.shape = (B,m,k), and we do torch.bmm(X,Y) to get output of shape (B,n,k)
- [`torch.matmul`](https://pytorch.org/docs/1.1.0/torch.html#torch.matmul): General matrix product that performs different operations depending on the rank of the inputs; this is similar to `np.dot` in numpy.

Main difference to numpy is that `.dot` only works for vectors in torch.

All of these operations are also methods of tensor objects:

```python
print(x.dot(y) == torch.dot(x,y))
print(x.mm(y) == torch.mm(x,y))
```





### **Broadcasting**

Broadcasting two tensors together follows these rules:

1. If the tensors do not have the same rank, **prepend** the shape of the lower rank array with 1s until both shapes have the same length.
2. The two tensors are said to be *compatible* in a dimension if they have the same size in the dimension, or if one of the tensors has size 1 in that dimension.
3. The tensors can be broadcast together if they are compatible in all dimensions.
4. After broadcasting, each tensor behaves as if it had shape equal to the elementwise maximum of shapes of the two input tensors.
5. In any dimension where one tensor had size 1 and the other tensor had size greater than 1, the first tensor behaves as if it were copied along that dimension

Note, not all functions support broadcasting. `torch.mm` does not



One cool thing to help understand broadcasting is that the following will compute the outer product!

```python
v = torch.tensor([1,2,3])
w = torch.tensor([4,5])

op1 = v.view(3,1) * w
print(op1)
```

Why does this work? v and w are compatible in all dimensions, v is copied along the 2nd dimension (columns copied to right) and w is copied along the 1st dimension (rows copied downwards). This matches their shape and we do element-wise product, which exactly calculates the outer product. We can verify by:

```python
op2 = v.view(3,1).mm(w.view(1,2))
print(op1 == op2)
```







### **Running on GPU**

Check if GPU is available:

```python
import torch

if torch.cuda.is_available:
	print('PyTorch can use GPUs!')
else:
    print('PyTorch cannot use GPUs.')
```

CUDA: API for using Nvidia GPUs



Methods to put tensors on CPU or GPU

```python
# Construct a tensor on the CPU
x0 = torch.tensor([[1, 2], [3, 4]], dtype=torch.float32)
print('x0 device:', x0.device)

# Move it to the GPU using .to()
x1 = x0.to('cuda')
print('x1 device:', x1.device)

# Move it to the GPU using .cuda()
x2 = x0.cuda()
print('x2 device:', x2.device)

# Move it back to the CPU using .to()
x3 = x1.to('cpu')
print('x3 device:', x3.device)

# Move it back to the CPU using .cpu()
x4 = x2.cpu()
print('x4 device:', x4.device)

# We can construct tensors directly on the GPU as well
y = torch.tensor([[1, 2, 3], [4, 5, 6]], dtype=torch.float64, device='cuda')
print('y device / dtype:', y.device, y.dtype)

# Calling x.to(y) where y is a tensor will return a copy of x with the same
# device and dtype as y
x5 = x0.to(y)
print('x5 device / dtype:', x5.device, x5.dtype)
```

Once tensor is in GPU, computation will happen with the GPU





Test for GPU speedup (matrix addition for 10000x10000 matrix)

```python
import time

a_cpu = torch.randn(10000, 10000, dtype=torch.float32)
b_cpu = torch.randn(10000, 10000, dtype=torch.float32)

a_gpu = a_cpu.cuda()
b_gpu = b_cpu.cuda()
torch.cuda.synchronize()  # Stop GPU from running asynchronously with CPU code for better test results

t0 = time.time()
c_cpu = a_cpu + b_cpu
t1 = time.time()
c_gpu = a_gpu + b_gpu
torch.cuda.synchronize()
t2 = time.time()

# Check that they computed the same thing
diff = (c_gpu.cpu() - c_cpu).abs().max().item()
print('Max difference between c_gpu and c_cpu:', diff)

cpu_time = 1000.0 * (t1 - t0)
gpu_time = 1000.0 * (t2 - t1)
print('CPU time: %.2f ms' % cpu_time)
print('GPU time: %.2f ms' % gpu_time)
print('GPU speedup: %.2f x' % (cpu_time / gpu_time))
```

On Colab I got ~30x boost with GPU





## Learnings

For `torch.max`, the function is overloaded (different behaviour depends on different argument to function). 

```python
a = torch.tensor([[1,2,3,4]])
assert(a.shape = (1,4))

print(torch.max(a))  # 4

print(torch.max(a, dim=1).indices)  # tensor([3])
```







## Park

`torch.stack(tensors, dim)`: combine tensors along a new dimension

​	Compared to `concat` that stacks against an existing direction

`torch.linalg.solve(A, B, out=None)`: computes X where AX=B





jaxtyping

```python
from jaxtyping import Float, Int, Bool, Shaped, jaxtyped
import typeguard
from torch import Tensor

@jaxtyped
@typeguard.typechecked
def my_concat(x: Float[Tensor, "a1 b"], y: Float[Tensor, "a2 b"]) -> Float[Tensor, "a1+a2 b"]:
    return t.concat([x, y], dim=0)

x = t.ones(3, 2)
y = t.randn(4, 2)
z = my_concat(x, y)
```





`einops`

```python
x = t.randn(2, 3)
x_repeated = einops.repeat(x, 'a b -> a b c', c=4)

assert x_repeated.shape == (2, 3, 4)
for c in range(4):
    t.testing.assert_close(x, x_repeated[:, :, c])
```



`torch.testing.assert_close(x,y)`: assert x and y have same shape and are numerically close to each other

`torch.all(tensor)`

`torch.any(tensor)`

​		^^ Most functions with signature `torch.func(tensor, ...)` will have equivalent result with `tensor.func(...)`



Use lots of variables to store intermediate results. As PyTorch just passes the index, there is barely any performance overhead.



User assertions for the shape of intermediate variables. This also provides natural documentation.



`torch.expand`: ?



