const signUp = document.forms.signUp

const board = document.getElementById('board')
const start = document.getElementById('start')

signUp.addEventListener('input', e => {
    if (e.target.tagName == "INPUT") {
        if (e.target.checkValidity()) e.target.classList.remove('error')
        else e.target.classList.add('error')

        if (signUp.checkValidity()) signUp.submit.removeAttribute('disabled')
        else signUp.submit.setAttribute('disabled', '')
    }
})

signUp.addEventListener('submit', e => {
    e.preventDefault()

    board.classList.remove('hide')
    board.classList.add('show')
})

start.addEventListener('click', () => {
    signUp.reset()
    signUp.submit.setAttribute('disabled', '')

    board.classList.remove('show')
    setTimeout(() => board.classList.add('hide'), 1000)
})