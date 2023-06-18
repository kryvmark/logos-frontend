let MyMath = {}

MyMath.a = 5
MyMath.b = 2

Object.assign(MyMath, {
    sum() {
        console.log(this.a + this.b)
    }, 
    subtraction() {
        console.log(this.a - this.b)
    },
    multiplication() {
        console.log(this.a * this.b)
    },
    division() {
        console.log(this.a / this.b)
    }
})

MyMath.sum()
MyMath.subtraction()
MyMath.multiplication()
MyMath.division()