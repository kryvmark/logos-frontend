// Logic
const words: string[] = []

function censorText(original: string): string {
    let modified: string = original

    for (let i = 0; i < words.length; i++) {
        let splitted = modified.split(words[i])
        modified = splitted.join('*'.repeat(words[i].length))
    }

    return modified
}

// Elements
const badWords: HTMLSpanElement = document.getElementById('badWords') as HTMLSpanElement
const badWord: HTMLInputElement = document.getElementById('badWord') as HTMLInputElement
const badWordAdd: HTMLButtonElement = document.getElementById('badWordAdd') as HTMLButtonElement
const badWordsReset: HTMLButtonElement = document.getElementById('badWordsReset') as HTMLButtonElement
const textArea: HTMLTextAreaElement = document.getElementById('textArea') as HTMLTextAreaElement
const censor: HTMLButtonElement = document.getElementById('censor') as HTMLButtonElement

badWord.addEventListener('input', () => {
    if (badWord.value) badWordAdd.removeAttribute('disabled')
    else badWordAdd.setAttribute('disabled', '')
})

badWordAdd.addEventListener('click', () => {
    if (!words.includes(badWord.value)) words.push(badWord.value)
    badWord.value = ''
    badWord.dispatchEvent(new KeyboardEvent('input'))
    badWords.innerText = words.join(',')
})

badWordsReset.addEventListener('click', () => {
    words.length = 0
    badWords.innerText = '<none>'
})

textArea.addEventListener('input', () => {
    if (textArea.value) censor.removeAttribute('disabled')
    else censor.setAttribute('disabled', '')
})

censor.addEventListener('click', () => {
    textArea.value = censorText(textArea.value)
})