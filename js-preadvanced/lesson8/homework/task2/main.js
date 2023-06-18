let input = prompt('Enter a number') || '';
let num = parseInt(input) || 0;
let message = num == 0
    ? 'Zero'
    : num % 2 == 0
        ? 'Even'
        : 'Odd';
console.log(message);
