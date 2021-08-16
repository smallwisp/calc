'use strict'

let startBtn = document.getElementById('start');
let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];
let checkBox = document.querySelector('#deposit-check');
let additionalincomeItems = document.querySelectorAll('.additional_income-item');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('input.income-title');
let expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');


let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

salaryAmount.addEventListener('input', (event) => {
   if (event.data === null) {
      startBtn.setAttribute('disabled', 'disabled');
   } else {
      startBtn.removeAttribute('disabled');
   }
   console.log(event.data);
});

let appData = {
   budget: 0,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   income: {},
   incomeMonth: 0,
   addIncome: [],
   expenses: {},
   expensesMonth: 0,
   addExpenses: [],
   deposit: false,
   pecrentDeposit: 0,
   moneyDeposit: 0,
   
   start: function () {
      appData.budget = +salaryAmount.value;

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getTargetMonth();
      appData.getBudget();
      appData.getPeriodSelect();
      appData.showResult();
   },
   showResult() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      periodSelect.addEventListener('input', appData.showResult);
      incomePeriodValue.value = appData.calcPeriod();

   },
   addExpensesBlock() {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
         expensesPlus.style.display = 'none';
      }
   },
   addIncomeBlock() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
   },
   getExpenses() {
      expensesItems.forEach(function (item) {
         let itemExpenses = item.querySelector('.expenses-title').value;
         let cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
         }
      })
   },
   getIncome() {
      incomeItems.forEach(item => {
         let itemIncome = item.querySelector('.income-title').value;
         let cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
         }  
      })
      
      for (let key in appData.income) {
         appData.incomeMonth += +appData.income[key];
      }
   },
   getAddExpenses() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function (item) {
         item = item.trim();
         if (item !== '') {
            appData.addExpenses.push(item);
         }
      })
   },
   getAddIncome() {
      additionalincomeItems.forEach(item => {
         let itemValue = item.value.trim();
         if (itemValue !== '') {
            appData.addIncome.push(itemValue);
         }
      })
   },

   getExpensesMonth() {
      for (const key in appData.expenses) {
         appData.expensesMonth += +appData.expenses[key];
      }
      console.log(`Расходы за месяц:${appData.expensesMonth}`);
   },

   getBudget() {
      appData.budgetDay = Math.round((+appData.budget + appData.incomeMonth - appData.expensesMonth) / 30);
      appData.budgetMonth = +salaryAmount.value + appData.incomeMonth - appData.expensesMonth;
   },

   getTargetMonth() {
      let res = Math.ceil(+targetAmount.value / this.budgetMonth);
      /* if (res > 0) {
         console.log(`Цель будет достигнута за ${res} месяцев(-а)`);
      } else {
         console.log('Цель не будет достигнута!');
      } */
      return res;
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
   getInfoDeposit() {
      if (appData.deposit) {
         do {
            appData.pecrentDeposit = prompt('Какой годовой процент?', '10');   
         } while (!isNumber(appData.pecrentDeposit));

         do {
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000); 
         } while (!isNumber(appData.moneyDeposit));
      }
   },
   calcPeriod() {
      return appData.budgetMonth * periodSelect.value;
   },
   getPeriodSelect() {
      return periodAmount.textContent = periodSelect.value;
   }
} 

startBtn.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriodSelect);

function showObject(obj) {
   console.log('Наша программа включает в себя данные:');
   for (let key in obj) {
      console.log(`${key}: ${obj[key]}`);
   }
}

// showObject(appData);





