'use strict'

let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
let income = '200';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');
let deposit = confirm('Есть ли у вас депозит в банке');
let mission = 1e6;
let period = 10;

let start = function () {
   do {
      money = prompt('Ваш месячный доход?');
      
   } while (!isNumber(money));
  
}

start();

function showTypeOf(data) {
   console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let arr = addExpenses.toLowerCase().split(',');

console.log(`Возможные расходы: ${arr}`);

let expenses = [];

function getExpensesMonth() {
   let sum = 0;
   let cost;
   for (let i = 0; i < 2; i++) {
      expenses[i] = prompt('Введите обязательную статью расходов:');
      do {
         cost = prompt('Во сколько это обойдется?');
         
      } while (!isNumber(cost));
      sum += +cost;
   }
   console.log(expenses);
   return sum;
}

let expensesAmount = getExpensesMonth();

console.log(`Расходы за месяц: ${expensesAmount}`);

function getAccumulatedMonth(income, expensesAmount) {
   return income - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

function getTargetMonth(target, accumulatedMonth) {
   let res = Math.ceil(target / accumulatedMonth);
   if (res > 0) {
      console.log(`Цель будет достигнута за ${res} месяцев(-а)`);
   } else {
      console.log('Цель не будет достигнута!');
   }
  
}

getTargetMonth(mission, accumulatedMonth);

let budgetDay = accumulatedMonth / 30;

console.log(`Дневной бюджет : ${Math.floor(budgetDay)}`);

function getStatusIncome(income) {
   if (income >= 1200) {
      return ('У вас высокий уровень дохода');
   } else if (income >= 600) {
      return ('У вас средний уровень дохода');
   } else if (income >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего(');
   } else {
      return ('Что-то пошло не так');
   }
   
}

console.log(getStatusIncome(budgetDay));
