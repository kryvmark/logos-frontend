let primeNum = (min, max) => {
    let s = ''

    for (let n = min; n <= max; n++) {
        if (isPrime(n)) s += `${n},`
    }

    return s.slice(0, -1)
}

let isPrime = n => {
    if (n < 2) return false

    for (let i = 2; i <= n / 2; ++i) {
        if (n % i == 0) return false
    }

    return true
}

let min = +prompt('Введіть менше число')
let max = +prompt('Введіть більше число')

alert(`Прості числа в діапазоні ${min}..${max}: ${primeNum(min, max)}`)