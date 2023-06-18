const _ = q => document.querySelector(q)
const $ = q => document.querySelectorAll(q)

let spans = $('.keyboard span')

let assignKeys = () => {

    for (let i = 0; i < spans.length - 1; i++) {
        spans[i].dataset.key = spans[i].innerText
    }

    _('.keyboard span:last-child').dataset.key = ' '
}

let shift = (capsLock, shift) => {
    let shifts = {
        off: ['`', '-', '=', '[', ']', '\\', ';', `'`, ',', '.', '/'],
        on: ['~', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?']
    }

    if (capsLock) {
        if (shift) {
            for (let i = 0; i < spans.length; i++) {
                if (spans[i].textContent.length == 1) {
                    if (shifts.off.includes(spans[i].textContent)) spans[i].textContent = shifts.on[shifts.off.indexOf(spans[i].textContent)]
                    else spans[i].textContent = spans[i].textContent.toLowerCase()
                }
            }
        }
        else {
            for (let i = 0; i < spans.length; i++) {
                if (spans[i].textContent.length == 1) {
                    if (shifts.on.includes(spans[i].textContent)) spans[i].textContent = shifts.off[shifts.on.indexOf(spans[i].textContent)]
                    else spans[i].textContent = spans[i].textContent.toUpperCase()
                }
            }
        }
    }
    else {
        if (shift) {
            for (let i = 0; i < spans.length; i++) {
                if (spans[i].textContent.length == 1) {
                    if (shifts.off.includes(spans[i].textContent)) spans[i].textContent = shifts.on[shifts.off.indexOf(spans[i].textContent)]
                    else spans[i].textContent = spans[i].textContent.toUpperCase()
                }
            }
        }
        else {
            for (let i = 0; i < spans.length; i++) {
                if (spans[i].textContent.length == 1) {
                    if (shifts.on.includes(spans[i].textContent)) spans[i].textContent = shifts.off[shifts.on.indexOf(spans[i].textContent)]
                    else spans[i].textContent = spans[i].textContent.toLowerCase()
                }
            }
        }
    }

    assignKeys()
}

assignKeys()

document.addEventListener('keydown', e => {
    let key = _(`span[data-key="${e.key}"]`)

    if (key) {
        key.classList.add('active')

        switch (e.key) {
            case 'Backspace':
                _('#textarea').textContent = _('#textarea').textContent.slice(0, -1)
                break;
            case 'Tab':
                e.preventDefault()
                _('#textarea').textContent += '   '
                break;
            case 'CapsLock':
                shift(e.getModifierState('CapsLock'), e.getModifierState('Shift'))
                break;
            case 'Enter':
                _('#textarea').textContent += '\n'
                break;
            case 'Shift':
                shift(e.getModifierState('CapsLock'), e.getModifierState('Shift'))
                break;

            default:
                _('#textarea').textContent += e.key
                break;
        }
    }
})

document.addEventListener('keyup', e => {
    let key = _(`span[data-key="${e.key}"]`)

    if (key) {
        switch (e.key) {
            case 'CapsLock':
                if (!e.getModifierState('CapsLock')) key.classList.remove('active')
                break;
            case 'Shift':
                shift(e.getModifierState('CapsLock'), e.getModifierState('Shift'))
                key.classList.remove('active')
                break;

            default:
                key.classList.remove('active')
                break;
        }
    }
})

_('.keyboard').addEventListener('mousedown', e => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: e.target.dataset.key }))
})

_('.keyboard').addEventListener('mouseup', e => {
    document.dispatchEvent(new KeyboardEvent('keyup', { key: e.target.dataset.key }))
})