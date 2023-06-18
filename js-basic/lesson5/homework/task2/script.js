// Алгоритм: https://www.programiz.com/c-programming/examples/prime-number

function isPrime(n) {
    if (n == 0 || n == 1) return false

    for (let i = 2; i <= n / 2; ++i) {
        if (n % i == 0) return false
    }

    return true
}

let n = parseInt(prompt('Введіть ціле число'))
if (!n || isNaN(n)) n = 0
if (n < 0) n = -n
console.log(isPrime(n) ? `Число ${n} належить до простих чисел` : `Число ${n} не належить до простих чисел`)