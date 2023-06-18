// CoffeeMake

const typesCoffee = {
    nomilk: {
        'ri': 'Ristretto',
        'es': 'Espresso',
        'do': 'Doppio'
    },
    milk: {
        'am': 'Americano',
        'ie': 'Irish Coffee',
        'la': 'Latte',
        'ca': 'Capuccino'
    }
}

const typesWater = {
    'mo': 'Morshynska',
    'dz': 'Dzherelna',
    'my': 'Myrhorodska'
}

Object.freeze(typesCoffee)
Object.freeze(typesWater)

function CoffeeMake(typeCoffee = 'es', typeWater = 'mo') {
    this.processing = false

    this.coffeesAvail = Object.assign({}, typesCoffee.nomilk)

    if (this.typeMilk) this.coffeesAvail = Object.assign(this.coffeesAvail, typesCoffee.milk)

    if (!this.coffeesAvail[typeCoffee]) {
        console.warn(`Sorry, CoffeeMake is unable to do coffee type '${typeCoffee}'. We'll offer some other coffee type instead.`)
        typeCoffee = Object.keys(this.coffeesAvail)[Math.floor(Math.random() * Object.keys(this.coffeesAvail).length)]
    }

    if (!typesWater[typeWater]) {
        console.warn(`Sorry, CoffeeMake has no water with shortcut '${typeWater}'. We'll offer some other water type instead.`)
        typeWater = Object.keys(typesWater)[Math.floor(Math.random() * Object.keys(typesWater).length)]
    }

    this.typeCoffee = typeCoffee
    this.typeWater = typeWater

    console.info(`CoffeeMake is set to make ${this.coffeesAvail[this.typeCoffee]} with water ${typesWater[this.typeWater]}.`)
}

CoffeeMake.prototype.on = function () {
    this.processing = true
    this.ready = 0
    console.info('CoffeeMake is on.')

    let interval = setInterval(() => {
        if (this.ready < 100 && this.processing) {
            this.ready += 20
            console.log(`Making ${this.coffeesAvail[this.typeCoffee]}: ${this.ready}% done.`)
        }
        else {
            this.off()
            clearInterval(interval)
        }
    }, 1000)
}

CoffeeMake.prototype.off = function () {
    if (this.processing) {
        if (this.ready == 100) console.info(`Done! Please take your ${this.coffeesAvail[this.typeCoffee]}.`)
        else console.warn(`CoffeeMake was aborted at ${this.ready}%.`)
    }

    this.processing = false
}

// DripCoffeeMake

const typesFilter = {
    'pa': 'Paper',
    'cl': 'Cloth',
    'pe': 'Permanent'
}

Object.freeze(typesFilter)

function DripCoffeeMake(typeCoffee = 'es', typeWater = 'mo', typeFilter = 'pe') {
    if (!typesFilter[typeFilter]) {
        console.warn(`Sorry, CoffeeMake has no filter with shortcut '${typeFilter}'. We'll offer some other filter type instead.`)
        typeFilter = Object.keys(typesFilter)[Math.floor(Math.random() * Object.keys(typesFilter).length)]
    }

    this.typeFilter = typeFilter
    console.info(`CoffeeMake model: Drip. Filter: ${typesFilter[this.typeFilter]}.`)

    CoffeeMake.call(this, typeCoffee, typeWater)
}

DripCoffeeMake.prototype = Object.create(CoffeeMake.prototype)
DripCoffeeMake.constructor = DripCoffeeMake

function CarobCoffeeMake(typeCoffee = 'es', typeWater = 'mo', temp = 90) {
    if (Number.isNaN(this.temp) || this.temp < 60 || this.temp > 95) console.warn(`As the temperature of ${Number.isNaN(parseInt(temp)) ? 0 : parseInt(temp)} °C is not in between 60 and 95, CarobCoffeeMake will set it to the default of ${temp = 90}.`)

    this.temp = temp
    console.info(`CoffeeMake model: Carob. Temperature: ${this.temp} °C.`)
    
    CoffeeMake.call(this, typeCoffee, typeWater)
}

CarobCoffeeMake.prototype = Object.create(CoffeeMake.prototype)
CarobCoffeeMake.constructor = CarobCoffeeMake

// CoffeeMachine

const typesMilk = {
    'al': 'Almond',
    'co': 'Coconut',
    'wh': 'Whole-Fat',
    'lo': 'Low-Fat'
}

Object.freeze(typesMilk)

function CoffeeMachine(typeCoffee = 'la', typeWater = 'mo', typeMilk = 'al') {
    if (!typesMilk[typeMilk]) {
        console.warn(`Sorry, CoffeeMake has no filter with shortcut '${typeMilk}'. We'll offer some other filter type instead.`)
        typeMilk = Object.keys(typesMilk)[Math.floor(Math.random() * Object.keys(typesMilk).length)]
    }

    this.typeMilk = typeMilk
    console.info(`CoffeeMake model: CoffeeMachine. Milk: ${typesMilk[this.typeMilk]}.`)
    
    CoffeeMake.call(this, typeCoffee, typeWater)
}

CoffeeMachine.prototype = Object.create(CoffeeMake.prototype)
CoffeeMachine.constructor = CoffeeMachine

// Tests

let cmk = new CoffeeMake('es', 'dz')
cmk.on()

setTimeout(() => {
    let dcm = new DripCoffeeMake('ri', 'my')
    dcm.on()
}, 8000);

setTimeout(() => {
    let ccm = new CarobCoffeeMake('do', 'mo', 90)
    ccm.on()
}, 16000);

setTimeout(() => {
    let cmc = new CoffeeMachine('la', 'mo', 'co')
    cmc.on()
}, 24000);