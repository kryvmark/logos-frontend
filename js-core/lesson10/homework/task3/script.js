const getLength = arr => {
    let lengths = []

    for (const i in arr) {
        lengths.push(arr[i].length)
    }

    return lengths
}

const arr1 = getLength(['Ivan','Pavlo','Ira'])
const arr2 = getLength(['Oleksiy','Andriana'])

console.log(arr1)
console.log(arr2)