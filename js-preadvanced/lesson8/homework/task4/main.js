function getSqrt(num) {
    if (typeof num != 'undefined') {
        if (typeof num == 'number') {
            if (num >= 0)
                return `Квадратний корінь з ${num} дорівнює ${Math.sqrt(num)}.`;
            else
                return `Введіть додатнє число.`;
        }
        else
            return `Повинне бути числове значення.`;
    }
    else
        return `Будь ласка, введіть число!`;
}
console.log('25 => ' + getSqrt(25));
console.log('0 => ' + getSqrt(0));
console.log('-9 => ' + getSqrt(-9));
console.log('Hola => ' + getSqrt('Hola'));
console.log('"" => ' + getSqrt());
