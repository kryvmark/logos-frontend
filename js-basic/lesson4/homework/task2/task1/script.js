let num = parseInt(prompt('Введіть число'));
let res = num;

if (!num || num <= 0) alert('Введіть ціле додатне число');
else {
    let i = num - 1;

    while (i > 0) {
        res = res * i;
        i--;
    }

    alert(`Факторіал ${num}! = ${res}`);
}