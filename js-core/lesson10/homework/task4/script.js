const removeDuplicates = arr => {
    const newArr = []

    for (const i in arr) {
        if (!newArr.includes(arr[i].toLowerCase())) {
            newArr.push(arr[i].toLowerCase())
        }
    }

    return newArr
}

const arr1 = removeDuplicates(['HTML', 'css', 'Html', 'js'])
const arr2 = removeDuplicates(['html', 'css', 'js', 'html', 'js', 'python', 'js', 'scss'])

console.log(arr1)
console.log(arr2)