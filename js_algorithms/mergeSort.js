/*
First, divide the list into the smallest unit (1 element), 
then compare each element with the adjacent list to sort and merge the two adjacent lists. Finally, all the elements are sorted and merged.
*/

function merge(arr1, arr2) {
    const resultArr = []
    let i = 0, j = 0

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            resultArr.push(arr1[i])
            i++
        } else {
            resultArr.push(arr2[j])
            j++
        }
    }

    while (i < arr1.length) {
        resultArr.push(arr1[i])
        i++
    }
    
    while (j < arr2.length) {
        resultArr.push(arr2[j])
        j++
    }

    return resultArr
}

function mergeSort(arr) {
    if (arr.length <= 1)
        return arr

    const mid = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))

    return merge(left, right)
}

console.log(mergeSort([100, -2, 8, 90, -3, 0, 1, 2, 3]))