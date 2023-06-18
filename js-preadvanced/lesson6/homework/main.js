const signUp = document.forms.signUp
const signIn = document.forms.signIn

const divSignUp = document.getElementById('divSignUp')
const divSignIn = document.getElementById('divSignIn')
const divPortal = document.getElementById('divPortal')

const portalFullName = document.getElementById('portalFullName')
const portalEmail = document.getElementById('portalEmail')

const signInNow = document.getElementById('signInNow')
const signUpNow = document.getElementById('signUpNow')

const greeting = document.getElementById('greeting')
const start = document.getElementById('start')

const portalSignOut = document.getElementById('portalSignOut')

let emailMsg = document.querySelector('#email~.error-msg').innerHTML
let lastEmail = signUp.email.value
let lastEmailInUse = false

signUp.addEventListener('input', e => {
    if (e.target.tagName == "INPUT") {
        document.querySelector('#email~.error-msg').innerHTML = 'Please provide a valid Email address.'

        if (e.target.checkValidity()) e.target.classList.remove('error')
        else e.target.classList.add('error')

        let emailInUse = () => {
            if (lastEmail != signUp.email.value) {
                lastEmail = signUp.email.value
                return lastEmailInUse = JSON.parse(localStorage.getItem('users')).filter(user => user.email == signUp.email.value).length != 0
            }

            return lastEmailInUse
        }

        let valid = signUp.checkValidity()

        if (emailInUse()) {
            valid = false

            if (e.target == signUp.email) {
                e.target.classList.add('error')
                document.querySelector('#email~.error-msg').innerHTML = 'Email already in use. Please enter another email.'
            }
            else {
                e.target.classList.remove('error')
                document.querySelector('#email~.error-msg').innerHTML = 'Please provide a valid Email address.'
            }
        }

        if (valid) signUp.submit.removeAttribute('disabled')
        else signUp.submit.setAttribute('disabled', '')
    }
})

signUp.addEventListener('submit', e => {
    e.preventDefault()

    let users = JSON.parse(localStorage.getItem('users')) || []

    users.push({
        firstName: signUp.firstName.value,
        lastName: signUp.lastName.value,
        email: signUp.email.value,
        password: signUp.password.value
    })

    localStorage.setItem('users', JSON.stringify(users))

    greeting.classList.remove('hide')
    greeting.classList.add('show')
})

signIn.addEventListener('input', e => {
    if (e.target.tagName == "INPUT") {
        document.querySelector('#userPassword~.error-msg').innerHTML = 'Please provide a valid Password.'

        if (e.target.checkValidity()) e.target.classList.remove('error')
        else e.target.classList.add('error')

        if (signIn.checkValidity()) signIn.submit.removeAttribute('disabled')
        else signIn.submit.setAttribute('disabled', '')
    }
})

signIn.addEventListener('submit', e => {
    e.preventDefault()

    let user = JSON.parse(localStorage.getItem('users')).filter(user => user.email == signIn.email.value)

    if (user.length && user[0].password == signIn.password.value) {
        e.target.classList.remove('error')
        document.querySelector('#userPassword~.error-msg').innerHTML = 'Please provide a valid Password.'

        divSignIn.classList.remove('collapsed')
        divSignUp.classList.remove('collapsed')
        divSignIn.classList.add('collapsed')
        divSignUp.classList.add('collapsed')
        divPortal.classList.remove('collapsed')

        portalFullName.innerText = user[0].firstName + ' ' + user[0].lastName
        portalEmail.innerText = user[0].email

        document.title = portalFullName.innerText
    }
    else {
        signIn.password.classList.add('error')
        document.querySelector('#userPassword~.error-msg').innerHTML = 'Incorrect Email or Password.'
        signIn.submit.setAttribute('disabled', '')
    }
})

start.addEventListener('click', () => {
    signUp.reset()
    signUp.submit.setAttribute('disabled', '')

    greeting.classList.remove('show')
    setTimeout(() => greeting.classList.add('hide'), 1000)

    signInNow.dispatchEvent(new MouseEvent('click'))
})

signInNow.addEventListener('click', e => {
    e.preventDefault()
    divSignIn.classList.remove('collapsed')
    divSignUp.classList.remove('collapsed')
    divSignUp.classList.add('collapsed')

    document.title = 'Please sign in'
})

signUpNow.addEventListener('click', e => {
    e.preventDefault()
    divSignIn.classList.remove('collapsed')
    divSignUp.classList.remove('collapsed')
    divSignIn.classList.add('collapsed')

    document.title = 'Please sign up'
})

portalSignOut.addEventListener('click', () => {
    divPortal.classList.add('collapsed')
    divSignIn.classList.remove('collapsed')

    portalFullName.innerText = 'User Account'
    portalEmail.innerText = 'email@example.com'

    document.title = 'Please sign in'
})