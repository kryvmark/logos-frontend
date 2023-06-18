let colorize = (e) => {
    if (e.target.tagName.toLowerCase() == 'li') {
        e.target.style.color = e.target.innerText
    }
}