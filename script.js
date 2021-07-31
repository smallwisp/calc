let money = 2000;
let income = '200';
let addExpenses = 'связь, транспорт, развлечения, жилье';
let deposit = true;
let mission = 1e6;
let period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев.
Цель заработать ${mission} долларов`);

let arr = addExpenses.toLowerCase().split(',');

console.log(arr);

let budgetDay = money / 30;

console.log(`Дневной доход : ${budgetDay}`);