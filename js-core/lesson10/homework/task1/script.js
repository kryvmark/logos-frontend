const arrCopy = arr => {
    let arrCopy = []

    for (const iter of arr) {
        arrCopy.push(iter)
    }

    return arrCopy
}

const arr1 = arrCopy([1, 2, 3])
const arr2 = arrCopy([1, 2, 3, [10, 20]])

console.log(arr1)
console.log(arr2)