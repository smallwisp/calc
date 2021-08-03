'use strict'

let money = +prompt('Ваш месячный доход?');
let income = '200';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');
let deposit = confirm('Есть ли у вас депозит в банке');
let expenses1 = prompt('Введите обязательную статью расходов:');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов:');
let amount2 = +prompt('Во сколько это обойдется?');

let mission = 1e6;
let period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев.
Цель заработать ${mission} рублей`);

let arr = addExpenses.toLowerCase().split(',');

console.log(arr);


let budgetMonth = money - amount1 - amount2;

console.log(budgetMonth);

console.log(`Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяцев(-а)`);

let budgetDay = budgetMonth / 30;

console.log(`Дневной бюджет : ${Math.floor(budgetDay)}`);

if (budgetDay > 1200) {
   console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600) {
   console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay <= 600) {
   console.log('К сожалению, у вас уровень дохода ниже среднего(');
} else {
   console.log('Что-то пошло не так');
}