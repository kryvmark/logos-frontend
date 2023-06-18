// CoffeeMake

const TypesCoffee = {
    NOMILK: {
        'ri': 'Ristretto',
        'es': 'Espresso',
        'do': 'Doppio'
    },
    MILK: {
        'am': 'Americano',
        'ie': 'Irish Coffee',
        'la': 'Latte',
        'ca': 'Capuccino'
    }
}

const TypesWater = {
    'mo': 'Morshynska',
    'dz': 'Dzherelna',
    'my': 'Myrhorodska'
}

Object.freeze(TypesCoffee)
Object.freeze(TypesWater)

class CoffeeMake {
    constructor(typeCoffee = 'es', typeWater = 'mo') {
        this.processing = false

        this.coffeesAvail = Object.assign({}, TypesCoffee.NOMILK)

        if (this instanceof CoffeeMachine)
            this.coffeesAvail = Object.assign(this.coffeesAvail, TypesCoffee.MILK)

        if (!this.coffeesAvail[typeCoffee]) {
            console.warn(`Sorry, CoffeeMake is unable to do coffee type '${typeCoffee}'. We'll offer some other coffee type instead.`)
            typeCoffee = Object.keys(this.coffeesAvail)[Math.floor(Math.random() * Object.keys(this.coffeesAvail).length)]
        }

        if (!TypesWater[typeWater]) {
            console.warn(`Sorry, CoffeeMake has no water with shortcut '${typeWater}'. We'll offer some other water type instead.`)
            typeWater = Object.keys(TypesWater)[Math.floor(Math.random() * Object.keys(TypesWater).length)]
        }

        this.typeCoffee = typeCoffee
        this.typeWater = typeWater

        console.info(`CoffeeMake is set to make ${this.coffeesAvail[this.typeCoffee]} with water ${TypesWater[this.typeWater]}.`)
    }

    on() {
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

    off() {
        if (this.processing) {
            if (this.ready == 100)
                console.info(`Done! Please take your ${this.coffeesAvail[this.typeCoffee]}.`)
            else
                console.warn(`CoffeeMake was aborted at ${this.ready}%.`)
        }

        this.processing = false
    }
}

// DripCoffeeMake

const TypesFilter = {
    'pa': 'Paper',
    'cl': 'Cloth',
    'pe': 'Permanent'
}

Object.freeze(TypesFilter)

class DripCoffeeMake extends CoffeeMake {
    constructor(typeCoffee = 'es', typeWater = 'mo', typeFilter = 'pe') {
        super(typeCoffee, typeWater)

        if (!TypesFilter[typeFilter]) {
            console.warn(`Sorry, CoffeeMake has no filter with shortcut '${typeFilter}'. We'll offer some other filter type instead.`)
            typeFilter = Object.keys(TypesFilter)[Math.floor(Math.random() * Object.keys(TypesFilter).length)]
        }

        this.typeFilter = typeFilter
        console.info(`CoffeeMake model: Drip. Filter: ${TypesFilter[this.typeFilter]}.`)
    }
}

class CarobCoffeeMake extends CoffeeMake {
    constructor(typeCoffee = 'es', typeWater = 'mo', temp = 90) {
        super(typeCoffee, typeWater)

        if (Number.isNaN(this.temp) || this.temp < 60 || this.temp > 95) console.warn(`As the temperature of ${Number.isNaN(parseInt(temp)) ? 0 : parseInt(temp)} °C is not in between 60 and 95, CarobCoffeeMake will set it to the default of ${temp = 90}.`)

        this.temp = temp
        console.info(`CoffeeMake model: Carob. Temperature: ${this.temp} °C.`)
    }
}

// CoffeeMachine

const TypesMilk = {
    'al': 'Almond',
    'co': 'Coconut',
    'wh': 'Whole-Fat',
    'lo': 'Low-Fat'
}

Object.freeze(TypesMilk)

class CoffeeMachine extends CoffeeMake {
    constructor(typeCoffee = 'la', typeWater = 'mo', typeMilk = 'al') {
        super(typeCoffee, typeWater)
        
        if (!TypesMilk[typeMilk]) {
            console.warn(`Sorry, CoffeeMake has no filter with shortcut '${typeMilk}'. We'll offer some other filter type instead.`)
            typeMilk = Object.keys(TypesMilk)[Math.floor(Math.random() * Object.keys(TypesMilk).length)]
        }

        this.typeMilk = typeMilk
        console.info(`CoffeeMake model: CoffeeMachine. Milk: ${TypesMilk[this.typeMilk]}.`)
    }
}

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