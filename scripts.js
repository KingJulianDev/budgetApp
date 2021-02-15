const plusInputValue = document.querySelector('.plus-input-value')
const minusInputValue = document.querySelector('.minus-input-value')
const plusInputName = document.querySelector('.plus-input-name')
const minusInputName = document.querySelector('.minus-input-name')
const addIncome = document.querySelector('.plus-button')
const addExpense = document.querySelector('.minus-button')

let currentBudget = 0
let currentExpenses = 0
let currentBalance = 0

addIncome.onclick = () => {
    (currentBudget === 0) ? currentBudget = Number(plusInputValue.value) : currentBudget += Number(plusInputValue.value);
    plusInputValue.value = ''
    document.querySelector('.budget').innerHTML = currentBudget
    currentBalance = currentBudget - currentExpenses
    document.querySelector('.balance').innerHTML = currentBalance
}

addExpense.onclick = () => {
    (currentExpenses === 0) ? currentExpenses = Number(minusInputValue.value) : currentExpenses += Number(minusInputValue.value);
    minusInputValue.value = ''
    document.querySelector('.expenses').innerHTML = currentExpenses
    currentBalance = currentBudget - currentExpenses
    document.querySelector('.balance').innerHTML = currentBalance
}
