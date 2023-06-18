class Worker {
    constructor(firstName, secondName, rate = 10, days = 20) {
        this._firstName = firstName.toString() ?? 'Guest'
        this._secondName = secondName.toString() ?? ''
        this._rate = rate
        this._days = days
    }
    get name() { return this._firstName }
    get surname() { return this._secondName }
    get rate() { return this._rate }
    get days() { return this._days }
    getSalary() { return this.rate * this.days }
}

console.log('Worker w1:')
let w1 = new Worker('Taras', 'Petrenko', 10, 31)
console.log(w1.name)
console.log(w1.surname)
console.log(w1.rate)
console.log(w1.days)
console.log(w1.getSalary())

console.log('\nWorker w2:')
let w2 = new Worker('Ivan', 'Ivanenko', 20, 25)
console.log(w2.name)
console.log(w2.surname)
console.log(w2.rate)
console.log(w2.days)
console.log(w2.getSalary())