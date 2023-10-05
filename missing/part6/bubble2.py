# The correct bubble sort (because I feel like pracitising DSA)
def bubblesort(arr):
    n = len(arr)
    # Invariant: arr[0..i) = sorted(arr0)[0..i)
    for i in range(0,n-1):
        for j in range(n-1,i,-1):
            if arr[j-1] > arr[j]:
                swap(arr,j-1,j)
    return arr

# Swaps indices of array
# Pre: 0 <= i,j < len(arr)
def swap(arr, i, j):
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp

print(bubblesort([]) == sorted([]))
print(bubblesort([1]) == sorted([1]))
print(bubblesort([1,-1]) == sorted([1,-1]))
print(bubblesort([1,-1,3,-1,-1]) == sorted([1,-1,3,-1,-1]))
