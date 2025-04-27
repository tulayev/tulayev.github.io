function swap(arr, i, j) {
    const temp = arr[j]
    arr[j] = arr[i]
    arr[i] = temp
}

function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let lowest = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest])
                lowest = j
        }
        swap(arr, i, lowest)
    }

    return arr
}

console.log(selectionSort([1, -1, 10, 90, -4, 100]))
