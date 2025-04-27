function factorial(n) {
    if (n === 0)
        return 1

    return n * factorial(n - 1)
}

function fib(n) {
    if (n <= 1)
        return n

    return fib(n - 1) + fib(n - 2)
}

function power(base, exponent) {
    if (exponent === 0)
        return 1

    return base * power(base, exponent - 1)
}

function productOfArray(arr) {
    if (arr.length === 0)
        return 1

    return arr[0] * productOfArray(arr.slice(1))
}

function recursiveRange(n) {
    if (n === 0)
        return 0

    return n + recursiveRange(n - 1)
}

/*
Write a recursive function called flatten which accepts an array of arrays and returns a new array with all values flattened.
*/
function flatten(inputArr) {
    let outputArr = []
        
    for(let i = 0; i < inputArr.length; i++) {
        if(Array.isArray(inputArr[i])){
            outputArr = outputArr.concat(flatten(inputArr[i]))
        } else {
            outputArr.push(inputArr[i])
        }
    } 

    return outputArr
}

/*
Write a recursive function called isPalindrome which returns true if the string passed to it is a palindrome 
(reads the same forward and backward). Otherwise it returns false.
*/
function isPalindrome(str) {
    if(str.length === 1) 
        return true
    
    if(str.length === 2) 
        return str[0] === str[1]
    
    if(str[0] === str.slice(-1)) 
        return isPalindrome(str.slice(1, -1))
    
    return false
}

/*
Write a recursive function called reverse which accepts a string and returns a new string in reverse.
*/
function reverse(str) {
    if (str.length <= 1)
        return str

    return reverse(str.slice(1)) + str[0]
}

/*
Write a recursive function called someRecursive which accepts an array and a callback. 
The function returns true if a single value in the array returns true when passed to the callback. Otherwise it returns false.
*/
function someRecursive(array, callback) {
    if (array.length === 0) 
        return false
    
    if (callback(array[0])) 
        return true
    
    return someRecursive(array.slice(1), callback)
}

/*
Write a recursive function called capitalizeFirst. Given an array of strings, capitalize the first letter of each string in the array.
*/
function capitalizeFirst(arr) {
    if (arr.length === 1) 
        return [arr[0][0].toUpperCase() + arr[0].substr(1)]
      
    const res = capitalizeFirst(arr.slice(0, -1))
    const string = arr.slice(arr.length - 1)[0][0].toUpperCase() + arr.slice(arr.length-1)[0].substr(1)
    res.push(string)
    return res
}

/*
Write a recursive function called capitalizeWords. Given an array of words, return a new array containing each word capitalized.
*/
function capitalizeWords (array) {
    if (array.length === 1) 
        return [array[0].toUpperCase()]
    
    const res = capitalizeWords(array.slice(0, -1))
    res.push(array.slice(array.length-1)[0].toUpperCase())
    return res
}

/*
Write a function called collectStrings which accepts an object and returns an array of all the values in the object that have a typeof string.
*/
// function collectStrings(obj) {
//     const stringsArr = []
    
//     function gatherStrings(o) {
//         for(let key in o) {
//             if (typeof o[key] === 'string') 
//                 stringsArr.push(o[key])
//             else if (typeof o[key] === 'object') 
//                 return gatherStrings(o[key])
//         }
//     }

//     gatherStrings(obj)
//     return stringsArr
// }

function collectStrings(obj) {
    const stringsArr = []
    
    for(let key in obj) {
        if(typeof obj[key] === 'string') 
            stringsArr.push(obj[key])
        else if(typeof obj[key] === 'object') 
            stringsArr = stringsArr.concat(collectStrings(obj[key]))
    }
    
    return stringsArr
}

/*
Write a recursive function called nestedEvenSum. Return the sum of all even numbers in an object which may contain nested objects.
*/
function nestedEvenSum (obj, sum = 0) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') 
            sum += nestedEvenSum(obj[key])
        else if (typeof obj[key] === 'number' && obj[key] % 2 === 0) 
            sum += obj[key]
    }

    return sum
}

/*
Write a function called stringifyNumbers which takes in an object and finds all of the values which are numbers and converts them to strings.
*/
function stringifyNumbers(obj) {
    const newObj = {}

    for (let key in obj) {
        if (typeof obj[key] === 'number') 
            newObj[key] = obj[key].toString()
        else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) 
            newObj[key] = stringifyNumbers(obj[key])
        else 
            newObj[key] = obj[key]
    }

    return newObj
}
