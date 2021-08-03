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

function showTypeOf(data) {
   console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let arr = addExpenses.toLowerCase().split(',');

console.log(`Возможные расходы: ${arr}`);


function getExpensesMonth() {
   return amount1 + amount2;
}

console.log(`Расходы за месяц: ${getExpensesMonth()}`);

function getAccumulatedMonth() {
   return money - amount1 - amount2;
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
   return Math.ceil(mission / accumulatedMonth);
}

console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев(-а)`);

let budgetDay = accumulatedMonth / 30;

console.log(`Дневной бюджет : ${Math.floor(budgetDay)}`);

function getStatusIncome() {
   if (budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
   } else if (budgetDay >= 600) {
      return ('У вас средний уровень дохода');
   } else if (budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего(');
   } else {
      return ('Что-то пошло не так');
   }
   
}

console.log(getStatusIncome());