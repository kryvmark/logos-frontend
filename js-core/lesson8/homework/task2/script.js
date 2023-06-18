let email = prompt('Введіть email')
let emailSplitted = email.split('@')

if (emailSplitted.length == 2 && emailSplitted[0] && emailSplitted[1]) alert(`${email} - дійсна email адреса`)
else alert(`${email} - недійсна email адреса. Переконайтеся, що адреса введена правильно.`)