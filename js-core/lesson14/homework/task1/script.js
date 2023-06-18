let formMove = document.forms.formMove
let formPlaceholder = document.forms.formPlaceholder

formMove.addEventListener('submit', e => {
    e.preventDefault()
    formMove.nameOld.value = formMove.nameNew.value || formMove.nameOld.value
})

formPlaceholder.addEventListener('submit', e => {
    e.preventDefault()

    formPlaceholder.namePlaceholder.dispatchEvent(new MouseEvent('blur'))
})

formPlaceholder.namePlaceholder.addEventListener('blur', e => {
    if (formPlaceholder.namePlaceholder.value !== '') formPlaceholder.namePlaceholder.placeholder = formPlaceholder.namePlaceholder.value
    formPlaceholder.namePlaceholder.value = ''
})