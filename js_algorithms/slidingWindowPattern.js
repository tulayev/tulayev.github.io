/*
Given an array of integers and a number, write a function called maxSubarraySum, 
which finds the maximum sum of a subarray with the length of the number passed to the function.
Note that a subarray must consist of consecutive elements from the original array. 
In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.
Samples:
maxSubarraySum([100, 200, 300, 400], 2) // 700
maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)  // 39 
maxSubarraySum([-3, 4, 0, -2, 6, -1], 2) // 5
maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1],2) // 5
maxSubarraySum([2, 3], 3) // null
*/
function maxSubArraySum(array, chunkLength) {
    if (chunkLength > array.length)
        return 0

    let tempSum = 0, maxSum = 0

    for (let i = 0; i < chunkLength; i++) 
        maxSum += array[i]

    tempSum = maxSum

    for (let i = chunkLength; i < array.length; i++) {
        tempSum = tempSum - array[i - chunkLength] + array[i]
        maxSum = Math.max(maxSum, tempSum)
    }

    return maxSum
}

/*
Write a function called findLongestSubstring, which accepts a string and returns the length of the 
longest substring with all distinct characters.
Samples:
findLongestSubstring('') // 0
findLongestSubstring('rithmschool') // 7
findLongestSubstring('thisisawesome') // 6
findLongestSubstring('thecatinthehat') // 7
findLongestSubstring('bbbbbb') // 1
findLongestSubstring('longestsubstring') // 8
findLongestSubstring('thisishowwedoit') // 6
*/
function findLongestSubstring(str) {
    let longest = 0
    let seen = {}
    let start = 0
    
    for (let i = 0; i < str.length; i++) {
        let char = str[i]

        if (seen[char]) 
            start = Math.max(start, seen[char])

        longest = Math.max(longest, i - start + 1)

        seen[char] = i + 1
    }

    return longest
}
