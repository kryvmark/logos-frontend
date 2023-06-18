let imagePrompt = (e) => {
    if (e.target.className == 'image') {
        let img = e.target.children[0]

        img.src = prompt(`Вкажіть URL-адресу ${img.alt}`)
    }
}