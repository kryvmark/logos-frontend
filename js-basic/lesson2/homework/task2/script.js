let username = prompt("Введіть Ваше ім'я");

if (username == null) alert('Вхід скасовано');
else if (username == '' || +username) alert('Я вас не знаю');
else {
    let password = prompt("Введіть Ваш пароль");

    if (password == "ЛОГОС") alert("Ласкаво просимо!");
    else if (password == "") alert("Ви не ввели пароль. Перезавантажте сторінку й увійдіть заново.");
    else if (password == null) alert("Вхід скасовано");
    else alert("Пароль невірний");
}