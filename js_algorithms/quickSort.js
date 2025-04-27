function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function pivot(arr, start, end) {
    const pivot = arr[start]
    let swapIndex = start

    for (let i = start + 1; i < end; i++) {
        if (pivot > arr[i]) {
            swapIndex++
            swap(arr, swapIndex, i)
        }
    }

    swap(arr, start, swapIndex)
    return swapIndex
}

function quickSort(arr, start, end) {
    if (start < end) {
        const pivotIndex = pivot(arr, start, end)
        quickSort(arr, start, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, end)
    }

    return arr
}

const arr = [8, 4, 5, 1, 3, 6, 2]

console.log(quickSort(arr, 0, arr.length))