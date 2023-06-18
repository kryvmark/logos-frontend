// Функція для зручнішого запиту по селектору
const $ = q => document.querySelector(q)
// Функція для зручності запиту списку елементів
const _ = q => document.querySelectorAll(q)

// Синхронізуємо вміст редактора з контейнером показу елементів
$('#edit').value = $('#view').innerHTML

// Прорамуємо конпку редагування
$('#btnEdit').addEventListener('click', () => {
    // Для закривання редактора при повторному натисканні на кнопку
    if ($('#divEdit').classList.contains('d-none')) $('#divEdit').classList.replace('d-none', 'd-block')
    else $('#divEdit').classList.replace('d-block', 'd-none')

    // Приховуємо блок стилізування
    $('#divStyle').classList.replace('d-flex', 'd-none')
})

$('#btnStyle').addEventListener('click', () => {
    // Приховуємо блок редактора
    $('#divEdit').classList.replace('d-block', 'd-none')

    // Для закривання блоку стилізації при повторному натисканні на кнопку
    if ($('#divStyle').classList.contains('d-none')) $('#divStyle').classList.replace('d-none', 'd-flex')
    else $('#divStyle').classList.replace('d-flex', 'd-none')
})

$('#btnSave').addEventListener('click', () => {
    // Передаємо вміст редактора у блок перегляду
    $('#view').innerHTML = $('#edit').value
    // Ховаємо редактор
    $('#divEdit').classList.replace('d-block', 'd-none')
})

// Для легшого доступу присвоюємо константі посилання на форму стилізації
const style = document.forms.style

style.fontSize.forEach(el => el.addEventListener('change', e => {
    // Стилізуємо розмір шрифту відповідно до обраного значення
    $('#view').style.fontSize = `${e.target.value}px`
}))

style.fontFamily.addEventListener('change', () => {
    // Стилізуємо тип/сімейство шрифтів відповідно до вибору в select
    $('#view').style.fontFamily = style.fontFamily.value
});

[..._('[name="style"] button[data-setfor]')].forEach(el => el.addEventListener('click', e => {
    // Якщо блок палітри прихований, при натисканні на кнопку кольорів його показуємо
    if ($('#palette').classList.contains('d-none')) $('#palette').classList.replace('d-none', 'd-flex')
    // Якщо ж натиснули ту саму кнопку ще раз, просто приховуємо блок, а не залишаємо показаним
    else if ($('#palette').dataset.setfor == e.target.dataset.setfor) $('#palette').classList.replace('d-flex', 'd-none')

    // Передаємо елементу палітри набір даних про тип кольору, який вона має обирати: фон чи текст
    $('#palette').dataset.setfor = e.target.dataset.setfor
}))

style.textBold.addEventListener('change', e => {
    // Вибираємо жирність
    $('#view').style.fontWeight = e.target.checked ? 'bold' : 'normal'
})

style.textCursive.addEventListener('change', e => {
    // Вибираємо курсив
    $('#view').style.fontStyle = e.target.checked ? 'italic' : 'normal'
})

$('#palette').addEventListener('click', e => {
    // Запобігаємо помилки при натисненні на сам блок палітри, а не на блок одного з кольорів
    if (e.target.id != 'palette') {
        // Стилізуємо ту властивість, яка вказана у dataset блоку палітри. Important для того, щоб перебити стилізацію по класах з important
        $('#view').style.setProperty($('#palette').dataset.setfor, window.getComputedStyle(e.target).backgroundColor, 'important')
    }
})

$('#btnAdd').addEventListener('click', () => {
    // Ховаємо основний блок, відкриваючи блок додавання елементів
    $('#divMain').classList.replace('d-block', 'd-none')
    $('#divAdd').classList.replace('d-none', 'd-block')
});

[..._('[name="tagType"]')].forEach(el => el.addEventListener('change', e => {
    [..._('#divAdd form.d-block')].forEach(el => el.classList.replace('d-block', 'd-none'))
    document.forms[e.target.value].classList.replace('d-none', 'd-block')
}));


// Типова для обох форм створення поведінка, задамо у масиві
[..._('#divAdd form')].forEach(el => el.addEventListener('submit', e => {
    // Скасовуємо типову поведінку форми при надсиланні
    e.preventDefault()
    
    // Приховуємо блок Додати і показуємо головний блок
    $('#divMain').classList.replace('d-none', 'd-block')
    $('#divAdd').classList.replace('d-block', 'd-none')
}))

document.forms.table.addEventListener('submit', e => {
    // Створюємо таблицю
    let tableEl = document.createElement('table')

    for (let i = 0; i < document.forms.table.countTR.value; i++) {
        // Створюємо рядок таблиці
        let trEl = document.createElement('tr')

        // Додаємо рядок до таблиці
        tableEl.appendChild(trEl)

        for (let i = 0; i < document.forms.table.countTD.value; i++) {
            // Створюємо ячейку в рядку таблиці
            let tdEl = document.createElement('td')

            // Задаємо ширину і висоту для ячейок таблиці
            tdEl.style.width = `${document.forms.table.tdWidth.value}px`
            tdEl.style.height = `${document.forms.table.tdHeight.value}px`

            // Задаємо рамку кожній ячейці
            tdEl.style.border = `${document.forms.table.borderWidth.value}px ${document.forms.table.borderType.value} ${document.forms.table.borderColor.value}`

            // Текст в ячейках, який на відеомакеті
            tdEl.innerText = 'TD'

            // Додаємо ячейки в рядок таблиці
            trEl.appendChild(tdEl)
        }
    }

    // Переносимо згенеровану розмітку до редактора
    $('#edit').value += tableEl.outerHTML

    // Скидаємо форму
    e.target.reset()
})

document.forms.list.addEventListener('submit', e => {
    // Створюємо список
    let ulEl = document.createElement('ul')

    // Стилізуємо тип маркерів на той, який обрано через select
    ulEl.style.listStyleType = document.forms.list.markType.value

    for (let i = 0; i < document.forms.list.countLI.value; i++) {
        // Створємо елемент списку
        let liEl = document.createElement('li')

        // Задаємо порядковий номер елементу
        liEl.innerText = `item ${i + 1}`

        // Додаємо елемент до списку
        ulEl.appendChild(liEl)
    }

    // Переносимо згенеровану розмітку до редактора
    $('#edit').value += ulEl.outerHTML

    // Скидаємо форму
    e.target.reset()
})