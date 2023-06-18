function max(...num) {
    let m = num[0] || 0

    for (let i = 0; i < num.length; i++)
        if (num[i] > m)
            m = num[i]

    return m
}

let num = [],
    input = prompt('Введіть число'),
    x = +input

if (isNaN(x)) x = 0
num.push(x)

while (input !== null) {
    input = prompt('Введіть наступне число або завершіть, натиснувши Скасувати')
    x = +input
    if (isNaN(x)) x = 0
    num.push(x)
}

alert(`Найбільше число серед ${num}: ${max(...num)}`)