function swap(arr, i, j) {
    const temp = arr[j]
    arr[j] = arr[i]
    arr[i] = temp
}

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                swap(arr, i, j)
            }
        }
    }

    return arr
}

console.log(bubbleSort([1, -1, 10, 90, -4]))
