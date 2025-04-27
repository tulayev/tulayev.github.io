/*
Implement a function called, areThereDuplicates which accepts a variable number of arguments, 
and checks whether there are any duplicates among the arguments passed in.  
You can solve this using the frequency counter pattern OR the multiple pointers pattern.
Samples:
areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true 
areThereDuplicates('a', 'b', 'c', 'a') // true 
*/

function areThereDuplicates() {
    const obj = {}

    for (let item of arguments)
        obj[item] = (obj[item] || 0) + 1 

    for (const [_, value] of Object.entries(obj)) {
        if (value > 1)
            return false
    }

    return true
}
