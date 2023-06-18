const modal = document.createElement('div')
const modalWarning = document.createElement('p')
const modalMessage = document.createElement('p')

const modalClose = document.createElement('span')

initModal();

[...document.querySelectorAll('.task input[type="checkbox"]')].forEach(el => {
    el.addEventListener('click', removeTask)
})

document.forms.control.submit.addEventListener('click', e => {
    e.preventDefault()

    if (document.forms.control.newTask.value === '') {
        openModal('Пусте поле не можна добавити.')

        return
    }

    addTask(document.forms.control.newTask.value)

    document.forms.control.reset()
})

function initModal() {
    modalWarning.classList.add('modal-bold')
    modalWarning.innerHTML = 'Попередження!'

    modalMessage.classList.add('modal-message')

    modalClose.classList.add('modal-close')
    modalClose.onclick = closeModal

    modal.appendChild(modalWarning)
    modal.appendChild(modalMessage)

    modal.appendChild(modalClose)

    modal.classList.add('modal');
}

function openModal(message) {
    modalMessage.innerHTML = message;

    [...document.querySelectorAll('input[type="checkbox"]')].forEach(el => el.disabled = true)
    document.querySelector('button[type="submit"]').disabled = true;

    [...document.querySelectorAll('body>*:not(.modal)')].forEach(el => el.style.filter += ' blur(2px)');
    [...document.querySelectorAll('body *:not(.modal)')].forEach(el => el.style.userSelect = 'none');
    [...document.querySelectorAll('body *:not(.modal)')].forEach(el => el.style.cursor = 'default')

    document.body.querySelector('script').before(modal)
}

function closeModal() {
    [...document.querySelectorAll('input[type="checkbox"]')].forEach(el => el.disabled = false);
    document.querySelector('button[type="submit"]').disabled = false;

    [...document.querySelectorAll('.modal')].forEach(el => el.remove());
    [...document.querySelectorAll('body>*:not(.modal)')].forEach(el => el.style.filter = `${el.style.filter}`.replace('blur(2px)', ''));
    [...document.querySelectorAll('body *:not(.modal)')].forEach(el => el.style.userSelect = '');
    [...document.querySelectorAll('body *:not(.modal)')].forEach(el => el.style.cursor = '')
}

function addTask(taskName) {
    const task = document.createElement('div')
    const checkbox = document.createElement('input')
    const label = document.createElement('label')

    checkbox.type = 'checkbox'
    checkbox.onclick = removeTask
    checkbox.name = `task${document.querySelectorAll('form[name="tasks"] .task').length + 1}`
    checkbox.id = checkbox.name

    label.htmlFor = checkbox.id
    label.innerText = taskName

    task.classList.add('task')
    task.appendChild(checkbox)
    task.append("\n")
    task.appendChild(label)

    document.forms.tasks.appendChild(task)
}

function removeTask(e) {
    e.target.checked = false

    if (document.querySelectorAll('form[name="tasks"] .task').length > 1) e.target.parentElement.remove()
    else openModal('Останнє завдання зі списку Ви не можете видалити.')
}