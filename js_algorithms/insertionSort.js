function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const currentValue = arr[i]
        let j = i - 1;

        while (j >= 0 && arr[j] > currentValue) {
            arr[j + 1] = arr[j]
            j--
        }

        arr[j + 1] = currentValue;
    }

    return arr
}

console.log(insertionSort([1, -1, 10, 90, -4]))
