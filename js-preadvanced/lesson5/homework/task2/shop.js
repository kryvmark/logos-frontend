let balance = 1000

const stock = {
    beer: 100,
    wine: 50,
    pepsi: 80
}

const price = {
    beer: 50,
    pepsi: 40,
    wine: 70
}

export function buy(order) {
    for (const key in order) {
        if (Object.hasOwnProperty.call(order, key)) {
            if (stock[key] >= order[key]) {
                stock[key] -= order[key]
                balance += price[key] * order[key]
            }
        }
    }
}

export const getBalance = () => balance

export const getStock = () => stock
export const getPrice = item => price[item]