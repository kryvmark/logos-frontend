class MyString {
    reverse(str) {
        let nStr = ''
        for (let i = str.length - 1; i >= 0; i--) nStr += str[i]
        return nStr
    }

    ucFirst(str) {
        let first = str[0].toUpperCase()
        let rest = str.slice(1)
        return first + rest
    }

    ucWords(str) {
        let words = str.split(' ')

        for (let i = 0; i < words.length; i++) {
            let first = words[i][0].toUpperCase()
            let rest = words[i].slice(1)

            words[i] = first + rest
        }

        return words.join(' ')
    }
}

const str = new MyString()
console.log(str.reverse('IVAN'))
console.log(str.ucFirst('arsenal'))
console.log(str.ucWords('arsenal arsenal arsenal'))