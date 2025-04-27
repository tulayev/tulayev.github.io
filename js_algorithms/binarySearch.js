/*
Write a function called binarySearch which accepts a sorted array and a value and returns the index at which the value exists. 
Otherwise, return -1.
Samples:
binarySearch([1, 2, 3, 4, 5], 2) // 1
binarySearch([1, 2, 3, 4, 5], 3) // 2
binarySearch([1, 2, 3, 4, 5], 5) // 4
binarySearch([1, 2, 3, 4, 5], 6) // -1
*/
function binarySearch(arr, value) {
    let start = 0
    let end = arr.length - 1

    while (start <= end) {
        const mid = Math.floor((start + end) / 2)

        if (arr[mid] === value)
            return mid
        else if (arr[mid] > value)
            end = mid - 1
        else 
            start = mid + 1
    }

    return -1
}

console.log(binarySearch([1, 2, 3, 4, 5], 6))
