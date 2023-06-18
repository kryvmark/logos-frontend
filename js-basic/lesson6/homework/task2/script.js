let geometricSequenceSum_loop = function(n, q) {
    let Sn = 1,
        b = 1

    for (let i = 1; i < n; i++) {
        b *= q
        Sn += b
    }

    return Sn
}

let geometricSequenceSum_formula = function(n, q) {
     return (1 - q ** n) / (1 - q)
}

let n = +prompt('Введіть кількість чисел прогресії')
let q = +prompt('Введіть знаменник')

alert(`Результат за допомогою geometricSequenceSum_loop(): ${geometricSequenceSum_loop(n, q)}\nРезультат за допомогою geometricSequenceSum_formula(): ${geometricSequenceSum_formula(n, q)}`)