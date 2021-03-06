// eslint-disable-next-line strict
'use strict';

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');

const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];

const depositCheck = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

const additionalincomeItems = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
// eslint-disable-next-line no-unused-vars
const incomeTitle = document.querySelector('input.income-title');
// eslint-disable-next-line no-unused-vars
const expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');


const isNumber = function(n) {
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
		this.percentDeposit = 0;
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
		// console.log('this.start:', this);
		this.budget = +salaryAmount.value;

		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getTargetMonth();
		this.getInfoDeposit();
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

		depositBank.setAttribute('disabled', 'disabled');
		depositAmount.setAttribute('disabled', 'disabled');
		depositPercent.setAttribute('disabled', 'disabled');

		startBtn.style.display = 'none';
		cancelBtn.style.display = 'block';
		depositCheck.setAttribute('disabled', 'disabled');
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
		this.percentDeposit = 0;
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

		depositBank.style.display = 'none';
		depositAmount.style.display = 'none';
		depositPercent.style.display = 'none';
		depositCheck.checked = '';

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

		depositBank.removeAttribute('disabled');
		depositAmount.removeAttribute('disabled');
		depositPercent.removeAttribute('disabled');

		targetAmount.removeAttribute('disabled');
		depositCheck.removeAttribute('disabled');

		periodSelect.value = 1;

		this.getPeriodSelect();
	}

	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		periodSelect.addEventListener('input', () => {
			incomePeriodValue.value = this.calcPeriod();
		});
	}

	addExpensesBlock() {
		const cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');

		if (expensesItems.length === 3) {
			expensesPlus.style.display = 'none';
		}
	}

	deleteExpensesBlock() {
		console.log(expensesItems[0].parentNode);

		expensesItems.forEach(item => {
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
		const cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
		incomeItems = document.querySelectorAll('.income-items');

		if (incomeItems.length === 3) {
			incomePlus.style.display = 'none';
		}
	}

	deleteIncomeBlock() {
		incomeItems = document.querySelectorAll('.income-items');

		console.log(incomeItems[0].parentNode);

		incomeItems.forEach(item => {
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
		});
		// console.log('getExpenses(this):', this);
	}

	getIncome() {
		incomeItems.forEach(item => {
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = cashIncome;
			}
		});

		for (const key in this.income) {
			this.incomeMonth += +this.income[key];
		}
		// console.log('getIncome(this):', this);
	}

	getAddExpenses() {
		this.addExpenses = additionalExpensesItem.value.split(',');
		this.addExpenses.forEach(item => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
				// console.log('getAddExpenses(this):', this);
			}
		});
	}

	getAddIncome() {
		additionalincomeItems.forEach(item => {
			const itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
				// console.log('getAddIncome(this):', this);

			}
		});
	}

	getExpensesMonth() {
		for (const key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
		/* console.log('getExpensesMonth(this):', this);
      console.log(`?????????????? ???? ??????????:${this.expensesMonth}`); */
	}

	getBudget() {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetDay = Math.round((+this.budget + this.incomeMonth - this.expensesMonth) / 30);
		this.budgetMonth = +salaryAmount.value + this.incomeMonth - this.expensesMonth + monthDeposit;
		// console.log('getBudget(this):', this);
	}

	getTargetMonth() {
		const res = Math.ceil(+targetAmount.value / this.budgetMonth);
		return res;
	}

	getStatusIncome() {
		if (this.budgetDay >= 1200) {
			return (`?? ?????? ?????????????? ?????????????? ????????????:${this.budgetDay}`);
		} else if (this.budgetDay >= 600) {
			return (`?? ?????? ?????????????? ?????????????? ????????????:${this.budgetDay}`);
		} else if (this.budgetDay >= 0) {
			return (`?? ??????????????????, ?? ?????? ?????????????? ???????????? ???????? ????????????????(:${this.budgetDay}`);
		} else {
			return ('??????-???? ?????????? ???? ??????');
		}
	}

	getInfoDeposit() {
		if (this.deposit) {
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
		}
	}

	calcPeriod() {
		return this.budgetMonth * periodSelect.value;
	}

	getPeriodSelect() {
		return periodAmount.textContent = periodSelect.value;
	}

	changePercent() {
		const valueSelect = this.value;
		if (valueSelect === 'other') {
			depositPercent.style.display = 'inline-block';
			depositPercent.value = '';
			depositPercent.addEventListener('input', () => {
				if (!isNumber(depositPercent.value) || (+depositPercent.value > 100) || (+depositPercent.value < 0)) {
					alert('?????????????? ???????????????????? ???????????????? ?? ???????? ????????????????!');
					startBtn.setAttribute('disabled', 'disabled');
					depositPercent.value = '';
				} else {
					startBtn.removeAttribute('disabled');
				}
				return +depositPercent.value;
			});
		} else {
			depositPercent.value = valueSelect;
		}
	}

	depositHandler() {
		if (depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBank.addEventListener('change', this.changePercent);
		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			this.deposit = false;
			depositBank.removeEventListener('change', this.changePercent);
		}
	}

	eventListeners() {
		// console.log(this);
		startBtn.addEventListener('click', this.start.bind(this));
		cancelBtn.addEventListener('click', this.reset.bind(this));
		expensesPlus.addEventListener('click', this.addExpensesBlock);
		incomePlus.addEventListener('click', this.addIncomeBlock);
		periodSelect.addEventListener('input', this.getPeriodSelect);
		depositCheck.addEventListener('change', this.depositHandler.bind(this));
	}
}

const appData = new AppDataClass();

console.log(appData);
console.log(AppDataClass);
appData.checkSalaryAmount();
appData.eventListeners();








