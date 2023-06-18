let websites = [
    'google.com',
    'stackoverflow.com',
    'redhat.com'
]

for (let i = 0; i < websites.length; i++) {
    websites[i] = prompt(`Введіть веб-сайт №${i + 1} (${websites[i]})`) || websites[i]
}

let styling = {
    background: prompt('Задайте колір фону (#0c8)') || '#0c8',
    font: prompt('Задайте назву шрифту (system-ui)') || 'system-ui',
    h1TextAlign: prompt('Задайте варіант вирівнювання заголовка (left)') || 'left',
    backgroundParagraph: prompt('Задайте колір фону параграфа (#c42)') || '#с42',
    colorParagraph: prompt('Задайте колір тексту параграфа (#000)') || '#000',
    colorLinks: prompt('Задайте колір тексту посилань (#444)') || '#444',
    container: {
        color: prompt('Задайте колір контейнера (#3c3)') || '#3с3',
        fontSize: prompt('Задайте розмір тексту (20)') || '20',
        fontWeight: prompt('Задайте жирність тексту (bold)') || 'bold',
    },
    markerType: prompt('Задайте тип маркера (upper-roman)') || 'upper-roman'
}

document.querySelector('body').style.backgroundColor = styling.background
document.querySelector('body').style.fontFamily = styling.font

document.querySelector('h1').style.textAlign = styling.h1TextAlign

document.querySelector('p').style.backgroundColor = styling.backgroundParagraph
document.querySelector('p').style.color = styling.colorParagraph

let a = document.getElementsByTagName('a')

for (let i = 0; i < a.length; i++) {
    a[i].href = `https://${websites[i]}/`
    a[i].innerHTML = websites[i]

    a[i].style.color = styling.colorLinks
}

let div = document.querySelector('div')

div.style.backgroundColor = styling.container.color
div.style.fontSize = styling.container.fontSize
div.style.fontWeight = styling.container.fontWeight

document.querySelector('ul').style.listStyleType = styling.markerType

document.querySelector('#background').innerHTML = `Фон: ${styling.background}`
document.querySelector('#font').innerHTML = `Шрифт: ${styling.font}`
document.querySelector('#h1TextAlign').innerHTML = `Вирівнювання заголовка: ${styling.h1TextAlign}`
document.querySelector('#backgroundParagraph').innerHTML = `Фон параграфа посилань: ${styling.backgroundParagraph}`
document.querySelector('#colorParagraph').innerHTML = `Колір тексту параграфа: ${styling.colorParagraph}`
document.querySelector('#colorLinks').innerHTML = `Колір тексту посилань: ${styling.colorLinks}`

document.querySelector('#containerColor').innerHTML = `Колір: ${styling.container.color}`
document.querySelector('#containerFontSize').innerHTML = `Розмір тексту: ${styling.container.fontSize}`
document.querySelector('#containerFontWeight').innerHTML = `Жирність тексту: ${styling.container.fontWeight}`

document.querySelector('#markerType').innerHTML = `Тип маркера: ${styling.markerType}`