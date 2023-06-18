let fib = n => {
    let s = '1'

    if (n < 2) return s
    else {
        let a = 0,
            b = 1,
            c = 1
        
        s += ` ${c}`
        
        for (let i = 2; i < n; i++) {
            a = b
            b = c
            c = a + b
            s += ` ${c}`
        }

        return s
    }
}

let n = +prompt('Введіть кількість елементів послідовності Фібоначчі')
alert(fib(n))