const userForm = document.forms.userForm
const userView = document.getElementById('userView')

const users = []

render()

userForm.addEventListener('input', () => {
    if (userForm.checkValidity()) userForm.submit.removeAttribute('disabled')
    else userForm.submit.setAttribute('disabled', '')
})

userForm.addEventListener('submit', e => {
    e.preventDefault()

    if (userForm.dataset.action == 'addUser') addUser()
    else if (userForm.dataset.action == 'editUser') saveEditUser()

    userForm.reset()

    userForm.dataset.action = 'addUser'

    userForm.submit.innerText = 'Add user'
    userForm.submit.setAttribute('disabled', '')

    render()
})

function addUser() {
    if (users.find(user => user.login == userForm.login.value)) userForm.login.value += 'x'

    users.push({
        id: users.length + 1,
        login: userForm.login.value,
        password: userForm.password.value,
        email: userForm.email.value
    })
}

let userIndex = 0

function deleteUser(event) {
    userIndex = parseInt(event.target.closest('tr').firstElementChild.innerText) - 1

    users.splice(userIndex, 1)
    users.forEach((user, i) => user.id = i + 1)

    userIndex = 0

    userForm.reset()

    userForm.dataset.action = 'addUser'

    userForm.submit.innerText = 'Add user'
    userForm.submit.setAttribute('disabled', '')

    render()
}

function editUser(event) {
    userIndex = parseInt(event.target.closest('tr').firstElementChild.innerText) - 1
    const user = users[userIndex]

    userForm.login.value = user.login
    userForm.password.value = user.password
    userForm.email.value = user.email

    userForm.dataset.action = 'editUser'

    userForm.submit.innerText = 'Edit user'
    userForm.submit.removeAttribute('disabled')
}

function saveEditUser() {
    const user = users[userIndex]

    user.login = userForm.login.value
    user.password = userForm.password.value
    user.email = userForm.email.value

    userIndex = 0
}

function render() {
    userView.innerHTML = ''

    for (const user of users) {
        let tr = document.createElement('tr')

        tr.insertAdjacentHTML('beforeend', `<td>${user.id}</td>\n`)
        tr.insertAdjacentHTML('beforeend', `<td>${user.login}</td>\n`)
        tr.insertAdjacentHTML('beforeend', `<td>${user.password}</td>\n`)
        tr.insertAdjacentHTML('beforeend', `<td>${user.email}</td>\n`)

        tr.insertAdjacentHTML('beforeend', '<td><button class="button filled-y" onclick="editUser(event)">Edit</button></td>\n')
        tr.insertAdjacentHTML('beforeend', '<td><button class="button filled-r" onClick="deleteUser(event)">Delete</button></td>\n')

        userView.appendChild(tr)
    }
}