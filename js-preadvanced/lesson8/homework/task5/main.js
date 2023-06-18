// Logic
const words = [];
function censorText(original) {
    let modified = original;
    for (let i = 0; i < words.length; i++) {
        let splitted = modified.split(words[i]);
        modified = splitted.join('*'.repeat(words[i].length));
    }
    return modified;
}
// Elements
const badWords = document.getElementById('badWords');
const badWord = document.getElementById('badWord');
const badWordAdd = document.getElementById('badWordAdd');
const badWordsReset = document.getElementById('badWordsReset');
const textArea = document.getElementById('textArea');
const censor = document.getElementById('censor');
badWord.addEventListener('input', () => {
    if (badWord.value)
        badWordAdd.removeAttribute('disabled');
    else
        badWordAdd.setAttribute('disabled', '');
});
badWordAdd.addEventListener('click', () => {
    if (!words.includes(badWord.value))
        words.push(badWord.value);
    badWord.value = '';
    badWord.dispatchEvent(new KeyboardEvent('input'));
    badWords.innerText = words.join(',');
});
badWordsReset.addEventListener('click', () => {
    words.length = 0;
    badWords.innerText = '<none>';
});
textArea.addEventListener('input', () => {
    if (textArea.value)
        censor.removeAttribute('disabled');
    else
        censor.setAttribute('disabled', '');
});
censor.addEventListener('click', () => {
    textArea.value = censorText(textArea.value);
});
