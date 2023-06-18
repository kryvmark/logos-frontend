let $ = q => document.querySelector(q)

let signUp = document.forms.signUp
let signOut = $('#signOut')

signUp.addEventListener('change', () => {
    if (signUp.firstName.checkValidity() && signUp.secondName.checkValidity() && signUp.email.checkValidity() && signUp.position.value && signUp.agreement.checked) {
        signUp.signUpSubmit.disabled = false
    }
    else {
        signUp.signUpSubmit.disabled = true
    }
})

signUp.addEventListener('submit', e => {
    e.preventDefault()

    $('#containerSignUp').style.display = 'none'
    $('#containerProfile').style.display = 'block'

    $('#profilePic').style.background = `url('./svg/${signUp.sex.value}.svg')`

    $('#name').textContent = `${signUp.firstName.value} ${signUp.secondName.value}`
    $('#emailAddress').textContent = signUp.email.value
    $('#position').textContent = $(`select [value="${signUp.position.value}"`).textContent
})

signOut.addEventListener('click', () => {
    $('#containerSignUp').style.display = 'block'
    $('#containerProfile').style.display = 'none'

    $('#profilePic').style.background = 'gray'

    $('#name').textContent = 'User Profile'
    $('#emailAddress').textContent = 'email@example.com'
    $('#position').textContent = 'Position'

    signUp.firstName.value = ''
    signUp.secondName.value = ''
    signUp.email.value = ''
    signUp.position.value = ''
    signUp.agreement.checked = false

    $('#sexM').checked = true
    $('#sexF').checked = false

    $('.form-select option').removeAttribute('selected')
    $('.form-select option:first-child').setAttribute('selected', '')
})