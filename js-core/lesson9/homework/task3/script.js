let MyMath = {
    PI: 3.1415925653,
    pow(x, p) {
        if (typeof x != 'number' || isNaN(Number(x))) return 'Ви не передали число'
        if (typeof p != 'number' || isNaN(Number(p))) return 'Ви не передали степінь'

        return x ** p
    },
    abs(x) {
        if (typeof x != 'number' || isNaN(Number(x))) return 'Ви не передали не число'

        return x >= 0 ? x : -x
    },
    max(...x) {
        let m = x[0]

        for (let i = 0; i < x.length; i++) {
            if (typeof x[i] != 'number' || isNaN(Number(x[i]))) return 'Один чи більше з параметрів не є числом'
            else if (x[i] > m) m = x[i]
        }

        return m
    },
    min(...x) {
        let m = x[0]

        for (let i = 0; i < x.length; i++) {
            if (typeof x[i] != 'number' || isNaN(Number(x[i]))) return 'Один чи більше з параметрів не є числом'
            else if (x[i] < m) m = x[i]
        }

        return m
    }
}

alert(`
MyMath.pow(2, 4): ${MyMath.pow(2, 4)}
MyMath.pow(): ${MyMath.pow()}
MyMath.pow('fff', {}): ${MyMath.pow('fff', {})}
MyMath.pow(5, ['menu']): ${MyMath.pow(5, ['menu'])}

MyMath.abs(10): ${MyMath.abs(10)}
MyMath.abs(-10): ${MyMath.abs(-10)}

MyMath.max(4, 15, 130, -10, 0): ${MyMath.max(4, 15, 130, -10, 0)}
MyMath.max(4, 15, 130, -10, null): ${MyMath.max(4, 15, 130, -10, null)}

MyMath.min(28, 45, 33, -110, 5): ${MyMath.min(28, 45, 33, -110, 5)}
MyMath.min(36, 75, 'ababa', undefined): ${MyMath.min(36, 75, 'ababa', undefined)}
`)