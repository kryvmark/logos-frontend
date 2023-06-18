let i = 0
let colors = [
    'red',
    'yellow',
    'green'
]

let div = document.querySelector('div')

div.onmouseover = (e) => {
    if (i >= 3) i = 0

    e.target.style.backgroundColor = colors[i]
    i++
}

div.onmouseout = (e) => {
    e.target.style.backgroundColor = 'purple'
}