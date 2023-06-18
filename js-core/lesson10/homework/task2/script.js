const arrToString = arr => {
    let strArr = []

    arr.forEach(x => strArr.push(x.toString()));

    return strArr
}

const arr1 = arrToString([1, 2, 3])
const arr2 = arrToString([10, 200, 3333])

console.log(arr1)
console.log(arr2)