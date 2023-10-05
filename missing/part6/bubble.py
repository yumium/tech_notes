def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n-1):
            if arr[j] > arr[j+1]:
                arr[j] = arr[j+1]
                arr[j+1] = arr[j]
    return arr

myArr = [4,2,1,8,7,6]
print(bubble_sort(myArr))
