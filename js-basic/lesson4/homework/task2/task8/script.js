let num = parseInt(prompt('Введіть число'));
let pow = parseInt(prompt('Введіть степінь'));
let iter = pow > 0 ? pow : -pow;
let result = 1;

if (isNaN(num) || isNaN(pow)) alert('Введіть дійсне число');
else {
    let i = 0;

    while (i < iter) {
        pow > 0 ? result *= num : result *= 1 / num;
        i++;
    }

    alert(`${num}^${pow} = ${result}`);
}