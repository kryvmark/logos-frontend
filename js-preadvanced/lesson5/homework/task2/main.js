import * as shop from './shop.js'

const quantity = document.getElementById('quantity')

quantity.addEventListener('keypress', e => {
    if (Number.isNaN(parseInt(e.key)) || (e.target.value.length == 0 && parseInt(e.key) == 0)) {
        e.preventDefault()
        e.target.value = '1'
    }

    if (parseInt(e.target.value) > 100) e.target.value = '100'
})

quantity.addEventListener('input', e => {
    if (e.target.value.length == 0) e.target.value = '1'
    if (parseInt(e.target.value) > 100) e.target.value = '100'
})

const balances = document.forms.balances
const order = document.forms.order
const cart = document.forms.cart
const summary = document.getElementById('summary')


const dictionary = {
    'beer': 'Пиво',
    'wine': 'Вино',
    'pepsi': 'Пепсі'
}

const checkout = {
    beer: 0,
    wine: 0,
    pepsi: 0
}

const updateBalances = () => {
    balances.qMoney.value = `${shop.getBalance()} грн`
    balances.qBeer.value = `${shop.getStock().beer} шт.`
    balances.qWine.value = `${shop.getStock().wine} шт.`
    balances.qPepsi.value = `${shop.getStock().pepsi} шт.`
}

const resetOrder = () => {
    for (const key in checkout) {
        if (Object.hasOwnProperty.call(checkout, key)) {
            checkout[key] = 0
            cart.checkout.value = ''
        }
    }
}

const openModal = msg => {
    const shadow = document.getElementById('shadow')
    const shadowModal = document.getElementById('shadowModal')
    const modalMessage = document.getElementById('modalMessage')
    const closeIcon = document.getElementById('closeIcon')

    shadow.style.display = 'block'
    shadowModal.classList.add('modal-active')
    modalMessage.innerText = msg

    closeIcon.onclick = () => {
        setTimeout(() => shadow.style.display = 'none', 300)
        shadowModal.classList.remove('modal-active')
    }
}

order.addEventListener('submit', e => {
    e.preventDefault()

    if (!checkout[order.article.value]) {
        if (order.quantity.value <= shop.getStock()[order.article.value]) {
            cart.checkout.value += `${dictionary[order.article.value]}: ${checkout[order.article.value] = order.quantity.value} шт.\n`
        }
        else {
            if (shop.getStock()[order.article.value]) openModal(`Вибачте, ми маємо лише ${shop.getStock()[order.article.value]} шт. товару "${dictionary[order.article.value]}".`)
            else openModal(`Вибачте, в нас не залишилося товару "${dictionary[order.article.value]}".`)
        }
    }
})

cart.addEventListener('submit', e => {
    e.preventDefault()

    let balanceOld = shop.getBalance()
    shop.buy(checkout)
    updateBalances()
    summary.innerHTML = ''

    for (const key in checkout) {
        if (Object.hasOwnProperty.call(checkout, key)) {
            if (checkout[key]) {
                let p = document.createElement('p')
                p.innerText = `${dictionary[key]}: ${checkout[key]} шт.`
                summary.appendChild(p)
            }
        }
    }

    let p = document.createElement('p')
    p.innerText = `Всього: ${shop.getBalance() - balanceOld} грн`
    summary.appendChild(p)

    resetOrder()
})

updateBalances()