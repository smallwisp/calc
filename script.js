'use strict'

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');

const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];

const checkBox = document.querySelector('#deposit-check');

const additionalincomeItems = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
const expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');


let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

startBtn.setAttribute('disabled', 'disabled');

class AppDataClass {
   constructor() {
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.expensesMonth = 0;
      this.addExpenses = [];
      this.deposit = false;
      this.pecrentDeposit = 0;
      this.moneyDeposit = 0;
   }

   checkSalaryAmount() {
      salaryAmount.addEventListener('input', () => {
         if (salaryAmount.value === '') {
            startBtn.setAttribute('disabled', 'disabled');
         } else {
            startBtn.removeAttribute('disabled');
         }
      });
   }

   start() {
      console.log('this.start:', this);
      this.budget = +salaryAmount.value;
      
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getTargetMonth();
      this.getBudget();
      this.getPeriodSelect();
      this.showResult();
      
      salaryAmount.setAttribute('disabled', 'disabled');
   
      incomeItems.forEach(item => {
         item.querySelector('.income-title').setAttribute('disabled', 'disabled');
         item.querySelector('.income-amount').setAttribute('disabled', 'disabled');
      });
      incomePlus.setAttribute('disabled', 'disabled');
      expensesPlus.setAttribute('disabled', 'disabled');
      additionalincomeItems.forEach(item => {
         item.setAttribute('disabled', 'disabled');
      });
      expensesItems.forEach(item => {
         item.querySelector('.expenses-title').setAttribute('disabled', 'disabled');
         item.querySelector('.expenses-amount').setAttribute('disabled', 'disabled');
      });
      additionalExpensesItem.setAttribute('disabled', 'disabled');
      targetAmount.setAttribute('disabled', 'disabled');
   
      startBtn.style.display = 'none';
      cancelBtn.style.display = 'block';
      checkBox.setAttribute('disabled', 'disabled');
   }

   reset() {
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.expensesMonth = 0;
      this.addExpenses = [];
      this.deposit = false;
      this.pecrentDeposit = 0;
      this.moneyDeposit = 0;

      budgetMonthValue.value = '';
      salaryAmount.value = '';

      this.deleteIncomeBlock();
      this.deleteExpensesBlock();

      additionalIncomeValue.value = '';
      additionalincomeItems.forEach(item => {
         item.value = '';
      });

      targetAmount.value = '';
      targetMonthValue.value = '';

      additionalExpensesItem.value = '';
      additionalExpensesValue.value = '';

      budgetDayValue.value = '';
      expensesMonthValue.value = '';
      incomePeriodValue.value = '';

      startBtn.style.display = 'block';
      startBtn.setAttribute('disabled', 'disabled');

      cancelBtn.style.display = 'none';

      salaryAmount.removeAttribute('disabled');
      incomeItems.forEach(item => {
         item.querySelector('.income-title').removeAttribute('disabled');
         item.querySelector('.income-amount').removeAttribute('disabled');
      });
      incomePlus.removeAttribute('disabled');
      expensesPlus.removeAttribute('disabled');
      additionalincomeItems.forEach(item => {
         item.removeAttribute('disabled');
      });
      expensesItems.forEach(item => {
         item.querySelector('.expenses-title').removeAttribute('disabled');
         item.querySelector('.expenses-amount').removeAttribute('disabled');
      });
      additionalExpensesItem.removeAttribute('disabled');
      targetAmount.removeAttribute('disabled');
      checkBox.removeAttribute('disabled');  

      periodSelect.value = 1;

      this.getPeriodSelect();
   }

   showResult() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      periodSelect.addEventListener('input', () => {
         incomePeriodValue.value = this.calcPeriod();
      });
   }

   addExpensesBlock() {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
         expensesPlus.style.display = 'none';
      }
   }

   deleteExpensesBlock() {
      console.log(expensesItems[0].parentNode);
      
      expensesItems.forEach((item) => {
         item.querySelector('.expenses-title').value = '';
         item.querySelector('.expenses-amount').value = '';

         console.log(item);
      });
      for (let i = expensesItems.length - 1; i > 0; i--) {
         expensesItems[0].parentNode.removeChild(expensesItems[i]);
      }
      expensesPlus.style.display = 'block';
   }

   addIncomeBlock() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
   }

   deleteIncomeBlock() {
      incomeItems = document.querySelectorAll('.income-items');

      console.log(incomeItems[0].parentNode);
      
      incomeItems.forEach((item) => {
         item.querySelector('.income-title').value = '';
         item.querySelector('.income-amount').value = '';

         console.log(item);
      });
      for (let i = incomeItems.length - 1; i > 0; i--) {
         incomeItems[0].parentNode.removeChild(incomeItems[i]);
      }
      incomePlus.style.display = 'block';
   }

   getExpenses() {
      expensesItems.forEach(item => {
         const itemExpenses = item.querySelector('.expenses-title').value;
         const cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
         }
      })
      console.log('getExpenses(this):', this);
   }

   getIncome() {
      incomeItems.forEach(item => {
         const itemIncome = item.querySelector('.income-title').value;
         const cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
         }  
      })
      
      for (let key in this.income) {
         this.incomeMonth += +this.income[key];
      }
      console.log('getIncome(this):', this); 
   }

   getAddExpenses() {
      this.addExpenses = additionalExpensesItem.value.split(',');
      this.addExpenses.forEach(item => {
         item = item.trim();
         if (item !== '') {
            this.addExpenses.push(item);
            console.log('getAddExpenses(this):', this);
         }
      })
   }

   getAddIncome() {
      additionalincomeItems.forEach(item => {
         let itemValue = item.value.trim();
         if (itemValue !== '') {
            this.addIncome.push(itemValue);
            console.log('getAddIncome(this):', this);

         }
      })
   }

   getExpensesMonth() {
      for (const key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
      console.log('getExpensesMonth(this):', this);
      console.log(`Расходы за месяц:${this.expensesMonth}`);
   }

   getBudget() {
      this.budgetDay = Math.round((+this.budget + this.incomeMonth - appData.expensesMonth) / 30);
      this.budgetMonth = +salaryAmount.value + this.incomeMonth - appData.expensesMonth;
      console.log('getBudget(this):', this);
   }

   getTargetMonth() {
      const res = Math.ceil(+targetAmount.value / this.budgetMonth);
      return res;
   }

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
   }

   getInfoDeposit() {
      if (this.deposit) {
         do {
            this.pecrentDeposit = prompt('Какой годовой процент?', '10');   
         } while (!isNumber(this.pecrentDeposit));

         do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000); 
         } while (!isNumber(this.moneyDeposit));
      }
   }

   calcPeriod() {
      return this.budgetMonth * periodSelect.value;
   }

   getPeriodSelect() {
      return periodAmount.textContent = periodSelect.value;
   }

   eventListeners() {
      console.log(this);
      startBtn.addEventListener('click', this.start.bind(appData));
      cancelBtn.addEventListener('click', this.reset.bind(appData));
      expensesPlus.addEventListener('click', this.addExpensesBlock);
      incomePlus.addEventListener('click', this.addIncomeBlock);
      periodSelect.addEventListener('input', this.getPeriodSelect);
   }
}

const appData = new AppDataClass();

console.log(appData);
console.log(AppDataClass);
appData.checkSalaryAmount();
appData.eventListeners();

function showObject(obj) {
   console.log('Наша программа включает в себя данные:');
   for (let key in obj) {
      console.log(`${key}: ${obj[key]}`);
   }
}







