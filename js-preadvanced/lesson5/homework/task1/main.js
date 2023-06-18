function sum(n) {
    let x = n

    return function (n) {
        return x += n
    }
}

let s = sum(3)

console.log(s(5))
console.log(s(228))