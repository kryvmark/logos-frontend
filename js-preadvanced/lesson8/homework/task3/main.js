function max(num1, ...numRest) {
    for (let num of numRest)
        num > num1 && (num1 = num);
    return num1;
}
console.log(max(5, -2));
console.log(max(5, -2, 30, 6));
