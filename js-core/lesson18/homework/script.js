'use strict'

// Завдання 1. forEach

let arr1 = [5, 6, 7, 8, 9]
let sum = 0

arr1.forEach(x => sum += x)

console.log('Task1:', sum)

// Завдання 2. Map

let arr2 = [5, 6, 7, 8, 9]
let pow2 = arr2.map(x => x ** 2)

console.log('Task2:', pow2)

// Завдання 3. Every

let arr3 = [
    { name: 'Ivan', country: 'Ukraine' },
    { name: 'Petro', country: 'Ukraine' },
    { name: 'Miguel', country: 'Cuba' }
]

console.log('Task3:', arr3.every(user => user.country == 'Ukraine'))

// Завдання 4. Some

let arr4 = [
    { name: 'Ivan', country: 'Ukraine' },
    { name: 'Petro', country: 'Ukraine' },
    { name: 'Miguel', country: 'Cuba' }
]

console.log('Task4:', arr4.some(user => user.country == 'Cuba'))

// Завдання 5. Filter

let arr5 = [1, 'string', [3, 4], 5, [6, 7]]
let filter = arr5.filter(elem => elem instanceof Array ? elem : undefined)

console.log('Task5:', filter)

// Завдання 6. Reduce

let arr6_1 = [1, 2, 5, 0, 4, 5, 6]
let arr6_2 = [1, 2, 3, 0, 4, 5, 6]

let sumToFirst0 = arr6_1.reduce((acc, curr, i, arr) => {
    if (curr == 0) arr.splice(i)

    return acc + curr
}, 0)

let countTo10 = arr6_2.reduce((acc, curr, i, arr) => {
    if (acc > 10) return i - 1

    return acc + curr
}, 0)

console.log('Task6.1:', sumToFirst0)
console.log('Task6.2:', countTo10)

// Завдання 7. Любим методом

let arr7 = [1, -2, 3, 0, 4, -5, 6, -11]
let task = arr7.filter(x => x > 0 ? x : undefined).map(x => Math.sqrt(x))

console.log('Task7', task)