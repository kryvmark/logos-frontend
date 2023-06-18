import { User } from './user.js';

const userForm: HTMLFormElement = document.forms['userForm'] as HTMLFormElement
const userView: HTMLTableSectionElement = document.getElementById('userView') as HTMLTableSectionElement

const users: User[] = []

render()

userForm.addEventListener('input', () => {
    if (userForm.checkValidity()) userForm.buttonSubmit.removeAttribute('disabled')
    else userForm.buttonSubmit.setAttribute('disabled', '')
})

userForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault()

    if (userForm.dataset.action == 'addUser') addUser()
    else if (userForm.dataset.action == 'editUser') saveEditUser()

    userForm.reset()

    userForm.dataset.action = 'addUser'

    userForm.buttonSubmit.innerText = 'Add user'
    userForm.buttonSubmit.setAttribute('disabled', '')

    render()
})

function addUser() {
    users.push(new User(formLogin(userForm.login.value as string), userForm.password.value as string, userForm.email.value as string, users.length + 1))
}

let userIndex = 0

function deleteUser(event: MouseEvent) {
    userIndex = parseInt(((event.target as HTMLTableCellElement)?.closest('tr')?.firstElementChild as HTMLTableCellElement).innerText) - 1

    users.splice(userIndex, 1)
    users.forEach((user, i) => user.id = i + 1)

    userIndex = 0

    userForm.reset()

    userForm.dataset.action = 'addUser'

    userForm.buttonSubmit.innerText = 'Add user'
    userForm.buttonSubmit.setAttribute('disabled', '')

    render()
}

function editUser(event: MouseEvent) {
    userIndex = parseInt(((event.target as HTMLTableCellElement)?.closest('tr')?.firstElementChild as HTMLTableCellElement).innerText) - 1
    const user = users[userIndex]

    userForm.login.value = user.login
    userForm.password.value = user.password
    userForm.email.value = user.email

    userForm.dataset.action = 'editUser'

    userForm.buttonSubmit.innerText = 'Edit user'
    userForm.buttonSubmit.removeAttribute('disabled')
}

function saveEditUser() {
    const user = users[userIndex]

    user.login = formLogin(userForm.login.value as string)
    user.password = userForm.password.value as string
    user.email = userForm.email.value as string

    userIndex = 0
}

function render() {
    userView.innerHTML = ''

    for (const user of users) {
        let tr = document.createElement('tr')
        let td_id = document.createElement('td')
        let btnEditTd = document.createElement('td')
        let btnDeleteTd = document.createElement('td')
        let btnEdit = document.createElement('button')
        let btnDelete = document.createElement('button')

        td_id.dataset.id = user.id.toString()
        td_id.innerText = td_id.dataset.id

        tr.insertAdjacentElement('beforeend', td_id)
        tr.insertAdjacentHTML('beforeend', `<td>${user.login}</td>\n`)
        tr.insertAdjacentHTML('beforeend', `<td>${user.password}</td>\n`)
        tr.insertAdjacentHTML('beforeend', `<td>${user.email}</td>\n`)

        btnEdit.classList.add('button', 'filled-y')
        btnEdit.addEventListener('click', event => editUser(event))
        btnEdit.innerText = 'Edit'
        btnDelete.classList.add('button', 'filled-r')
        btnDelete.addEventListener('click', event => deleteUser(event))
        btnDelete.innerText = 'Delete'
        btnEditTd.appendChild(btnEdit)
        btnDeleteTd.appendChild(btnDelete)

        tr.insertAdjacentElement('beforeend', btnEditTd)
        tr.insertAdjacentElement('beforeend', btnDeleteTd)

        userView.appendChild(tr)
    }
}

function formLogin(login: string): string {
    if (users.find(user => user.login == login)) {
        let loginAvail = login, index: number = 1

        while (users.find(user => user.login == loginAvail)) {
            loginAvail = login
            loginAvail += ++index
        }

        return loginAvail
    }
    else return login
}