let points = 0;
let position = 0;

let questions = [
    'Яка столиця України?',
    'Прізвище першого Президента України?',
    'Рік проголошення Незалежності України?',
    'Рік аварії на Чорнобильській АЕС?',
    'Як звати президента-втікача, який втік після завершення "Євромайдану"?',
    'Кого з поетів українці називають "пророком українського народу"? Введіть прізвище.',
    'Рік, у якому путінська Росія анексувала Крим та організувала т.зв. ЛНР/ДНР?',
    'У якому місяці путінська Росія почала повномасштабне вторгнення в Україну 2022 року?',
    'Назва російського ракетного крейсера, який потопили ЗС України у квітні 2022 року?',
    'Перший звільнений більший населений пункт під час Харківського контрнаступу ЗСУ 2022?'
];
let answers = [
    'київ',
    'кравчук',
    '1991',
    '1986',
    'віктор',
    'шевченко',
    '2014',
    'лютий',
    'москва',
    'балаклія'
];

alert('Ласкаво просимо до вікторини про Україну. Будь ласка, давайте відповіді виключно кирилицею та українською.');

/*
while (position < 10) {
    if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
    position++;
}
*/

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
position++;

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
position++;

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
position++;

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
position++;

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
position++;

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
position++;

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
position++;

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
position++;

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;
position++;

if (prompt(questions[position]) == answers[position].toLowerCase()) points++;

let conclusion = 'Відмінно!';

if (points <= 0 && points <= 3) conclusion = "Мало правильних відповідей. Спробуйте ще раз!";
else if (points >= 0 && points <= 3) conclusion = "Мало правильних відповідей. Спробуйте ще раз!";
else if (points >= 4 && points <= 6) conclusion = "Ви знаєте щось про Україну. Рекомендуємо дізнатися більше!";
else if (points >= 7 && points <= 9) conclusion = "Ви добре знаєте деякі з основних подій в історії України. Можливо, наступний раз пройдете на 10 з 10?";

alert(`Кількість вірних відповідей: ${points} з 10. ${conclusion}`);