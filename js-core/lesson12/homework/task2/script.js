let div = document.querySelector('div')

let mouseOn = (e) => {
    e.target.style.backgroundColor = 'yellow'
    e.target.style.borderColor = 'green'
    e.target.style.color = 'darkblue'
    e.target.innerText = 'Хочеш знати який?'
}

div.onmouseover = mouseOn
div.onmouseup = mouseOn

div.onmousedown = (e) => {
    e.target.style.backgroundColor = 'black'
    e.target.style.borderColor = 'yellow'
    e.target.style.color = '#fff'
    e.target.innerText = 'А я тобі не скажу!'
}

div.onmouseout = (e) => {
    e.target.style.backgroundColor = 'purple'
    e.target.style.borderColor = 'orange'
    e.target.style.color = 'blue'
    e.target.innerText = 'У мене є секрет!'
}