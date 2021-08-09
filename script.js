'use strict'

let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
}
let money;
let start = function () {
   do {
      money = prompt('Ваш месячный доход?', 100000);
      
   } while (!isNumber(money));
  
}

start();

let appData = {
   income: {},
   addIncome: [],
   expenses: {},
   expensesMonth: 0,
   addExpenses: [],
   deposit: false,
   mission: 1e6,
   period: 3,
   asking() {
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке');
      let cost
      for (let i = 0; i < 2; i++) {
          let item = prompt('Введите обязательную статью расходов:');
         do {
            cost = +prompt('Во сколько это обойдется?');
            appData.expenses[item] = cost;
         
         } while (!isNumber(cost));
      }
      console.log(appData.expenses);
   },

   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,

   getExpensesMonth() {
      for (const key in appData.expenses) {
         appData.expensesMonth += appData.expenses[key];
      }
      console.log(`Расходы за месяц:${appData.expensesMonth}`);
   },

   getBudget() {
      appData.budgetDay = Math.round((money - appData.expensesMonth) / 30);
      appData.budgetMonth = money - appData.expensesMonth;
   },

   getTargetMonth() {
      let res = Math.ceil(this.mission / this.budgetMonth);
      if (res > 0) {
         console.log(`Цель будет достигнута за ${res} месяцев(-а)`);
      } else {
         console.log('Цель не будет достигнута!');
      }
   },

   getStatusIncome() {
      if (this.budgetDay >= 1200) {
         return (`У вас высокий уровень дохода:${this.budgetDay}`);
      } else if (this.budgetDay >= 600) {
         return (`У вас средний уровень дохода:${this.budgetDay}`);
      } else if (this.budgetDay >= 0) {
         return (`К сожалению, у вас уровень дохода ниже среднего(:${this.budgetDay}`);
      } else {
         return ('Что-то пошло не так');
      }
   },
} 

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

function showObject(obj) {
   console.log('Наша программа включает в себя данные:');
   for (let key in obj) {
      console.log(`${key}: ${obj[key]}`);
   }
}

showObject(appData);



