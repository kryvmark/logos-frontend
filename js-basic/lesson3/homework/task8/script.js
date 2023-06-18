let num = parseInt(prompt('Введіть число'));
let pow = parseInt(prompt('Введіть степінь'));
let iter = pow > 0 ? pow : -pow;
let result = 1;

if (isNaN(num) || isNaN(pow)) alert('Введіть дійсне число');
else {
    for (let i = 0; i < iter; i++) {
        pow > 0 ? result *= num : result *= 1 / num;
    }

    alert(`${num}^${pow} = ${result}`);
}