let input = prompt('Введіть пароль');
let password = "Jesus";
let tryouts = 4;

if (input === null) tryouts = 0;

while (input !== password && tryouts > 0) {
    input = prompt(`Пароль неправильний. Залишилося спроб: ${tryouts}. Введіть пароль`);
    if (input === null) tryouts = 0;
    tryouts--;
}

if (tryouts === 0) alert('Вхід скасовано');
else if (!(tryouts > 0)) alert('Забагато невдалих спроб. Спробуйте будь ласка пізніше.');
else if (input === password) alert('Запрошуємо на сайт!');