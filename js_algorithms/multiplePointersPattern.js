// THIS PATTERN WORKS ONLY WITH SORTED LISTS!

/* 
Write a function called averagePair. Given a sorted array of integers and a target average, 
determine if there is a pair of values in the array where the average of the pair equals the target average. 
There may be more than one pair that matches the average target.
Samples:
averagePair([1,2,3],2.5) // true
averagePair([1,3,3,5,6,7,10,12,19],8) // true
averagePair([-1,0,3,4,5,6], 4.1) // false
averagePair([],4) // false
*/
function averagePair(arr, avg) {
    let start = 0
    let end = arr.length - 1

    while (start < end) {
        const pairAvg = (arr[start] + arr[end]) / 2

        if (pairAvg === avg)
            return true
        else if (pairAvg > avg)
            end--
        else
            start++
    }

    return false
}

/*
Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form 
a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string 
appear somewhere in the second string, without their order changing.
Samples:
isSubsequence('hello', 'hello world') // true
isSubsequence('sing', 'sting') // true
isSubsequence('abc', 'abracadabra') // true
isSubsequence('abc', 'acb') // false (order matters)
*/
function isSubsequence(substr, str) { // 'sing', 'sting'
    let i = 0

    for (let j = 0; j < str.length; j++) {
        const subStrLetter = substr[i]
        const strLetter = str[j]

        if (subStrLetter === strLetter) {
            i++
        }

        if (i === substr.length)
            return true
    }

    return false
}
