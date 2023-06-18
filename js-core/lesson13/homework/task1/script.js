const _ = q => document.querySelector(q)

let flex = _('.flex')

let openSetting = e => {
    let flexStyle = getComputedStyle(flex)

    if (flex.dataset.setting == e.target.dataset.setting) {
        flex.style.display = flexStyle.display == 'none' ? 'flex' : 'none'
    }
    else {
        flex.dataset.setting = e.target.dataset.setting
        flex.style.display = 'flex'
    }
}

let applySetting = e => {
    if (e.target.parentElement.classList.contains('flex')) {
        switch (flex.dataset.setting) {
            case 'color':
                _('body').style.backgroundImage = null
                _('body').style.backgroundColor = getComputedStyle(e.target).backgroundColor
                break;
            case 'image':
                _('body').style.backgroundImage = getComputedStyle(e.target).backgroundImage
                break;
        }
    }
}