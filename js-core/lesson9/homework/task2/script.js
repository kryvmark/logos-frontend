let getSqrt = x => {
    if (Number.isNaN(x)) return 'Ви ввели не число! Введіть число'
    else if (x < 0) return 'Число має бути більшим за 0'
    else return `Квадратний корінь з ${x} дорівнює ${Math.sqrt(x)}`
}

let x = +prompt('Введіть число для вирахування квадратного кореня')
alert(getSqrt(x))