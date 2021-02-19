const plusInputValue = document.querySelector('.plus-input-value')
const minusInputValue = document.querySelector('.minus-input-value')
const plusInputName = document.querySelector('.plus-input-name')
const minusInputName = document.querySelector('.minus-input-name')
const addIncome = document.querySelector('.plus-button')
const addExpense = document.querySelector('.minus-button')
const historyList = document.querySelector('.history')

let currentBudget = 0
let currentExpenses = 0
let currentBalance = 0
let historyArr = []
let idOfActivities = 0

function createHistoryItem(el) {
  ul.insertAdjacentHTML(
    'afterbegin',
    `<li class="${el.type} history-item" id="${el.id}">
      <div class="history-label ${el.color}">${el.name}</div>

      <div class="history-value">$${el.value}</div>

      <div class="li-item-options">
          <div class="item-option edit-history-item" id="${el.id}" onclick="testF()">X</div>
          <div class="item-option delete-history-item" id="${el.id}">?</div>
      </div>
    </li>`
  )
}

addIncome.onclick = () => {
  currentBudget === 0
    ? (currentBudget = Number(plusInputValue.value))
    : (currentBudget += Number(plusInputValue.value))
  document.querySelector('.budget').innerHTML = currentBudget
  currentBalance = currentBudget - currentExpenses
  document.querySelector('.balance').innerHTML = currentBalance
  let historyItem = {
    id: idOfActivities,
    type: 'income',
    name: plusInputName.value,
    value: Number(plusInputValue.value),
    color: 'green',
  }
  historyArr.push(historyItem)
  createHistoryItem(historyItem, 'green', 'income')
  idOfActivities++
  plusInputValue.value = ''
  plusInputName.value = ''
}

addExpense.onclick = () => {
  currentExpenses === 0
    ? (currentExpenses = Number(minusInputValue.value))
    : (currentExpenses += Number(minusInputValue.value))
  document.querySelector('.expenses').innerHTML = currentExpenses
  currentBalance = currentBudget - currentExpenses
  document.querySelector('.balance').innerHTML = currentBalance
  let historyItem = {
    id: idOfActivities,
    type: 'expense',
    name: minusInputName.value,
    value: Number(minusInputValue.value),
    color: 'red',
  }
  historyArr.push(historyItem)
  createHistoryItem(historyItem, 'red', 'expense')
  idOfActivities++
  minusInputValue.value = ''
  minusInputName.value = ''
}
/////////test//////////////////////////////////////////////////////
const ul = document.querySelector('.ul')
const clear = document.querySelector('.clear-btn')
clear.onclick = () => {
  ul.innerHTML = ''
}

function sortHistoryItems(param) {
  let sortedItems = historyArr.filter((el) => el.type === param)
  ul.innerHTML = ''
  sortedItems.forEach((el) => {
    createHistoryItem(el)
  })
}

const sortIncome = document.querySelector('.sortIncome')
const sortExpense = document.querySelector('.sortExpense')
const sortAll = document.querySelector('.sortAll')
const testingBtn = document.querySelector('.test')

sortAll.onclick = () => {
  ul.innerHTML = ''
  historyArr.forEach((el) => {
    createHistoryItem(el)
  })
}

sortIncome.onclick = () => {
  sortHistoryItems('income')
}

sortExpense.onclick = () => {
  sortHistoryItems('expense')
}

let testingObj = {
  id: 5,
  type: 'income',
  name: 'test',
  value: 19,
  color: 'green',
}

testingBtn.onclick = () => {
  for (let i = 0; i < 5; i++) {
    createHistoryItem(testingObj)
  }
}

function testF() {
  console.log('from delete button')
}
