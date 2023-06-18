let num = parseInt(prompt('Введіть число'));
let res = num;

if (!num || num <= 0) alert('Введіть ціле додатне число');
else {
    for (let i = num - 1; i > 0; i--) {
        res = res * i;
    }
    
    alert(`Факторіал ${num}! = ${res}`);
}