const plusInputValue = document.querySelector('.plus-input-value')
const minusInputValue = document.querySelector('.minus-input-value')
const plusInputName = document.querySelector('.plus-input-name')
const minusInputName = document.querySelector('.minus-input-name')
const addIncome = document.querySelector('.plus-button')
const addExpense = document.querySelector('.minus-button')
const historyList = document.querySelector('.history')
const ul = document.querySelector('.ul')

let currentBudget = 0
let currentExpenses = 0
let currentBalance = 0
let historyArr = []
let idOfActivities = 0

///////////////////////
let budget = 0
let expenses = 0
let balance = 0
///////////////////////

function createHistoryItem(el) {
  ul.insertAdjacentHTML(
    'afterbegin',
    `<li class="${el.type} history-item" id="${el.id}">
      <div class="history-label ${el.color}">${el.name}</div>

      <div class="history-value">$${el.value}</div>

      <div class="li-item-options">
          <div class="item-option delete-history-item" id="${el.id}">X</div>
          <div class="item-option edit-history-item" id="${el.id}">?</div>
      </div>
    </li>`
  )
}

function counting() {
  budget = 0
  expenses = 0

  historyArr.forEach((el) => {
    if (el.type === 'income') {
      budget += el.value
    } else {
      expenses += el.value
    }
  })
  document.querySelector('.budget').innerHTML = budget
  document.querySelector('.expenses').innerHTML = expenses
  document.querySelector('.balance').innerHTML = budget - expenses
}

/* function addOnclickOnDeleteBtns() {
  let deleteButtons = document.querySelectorAll('.delete-history-item')
  deleteButtons.forEach((el) => {
    el.onclick = () => {
      console.log(`delete from ${el.id}`)
      let items = Array.from(document.querySelectorAll('.history-item'))
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === el.id) {
          items[i].remove()
        }
      }
      counting()
    }
  })
} */

function addOnclickOnDeleteBtns() {
  let deleteButtons = document.querySelectorAll('.delete-history-item')
  let historyItems = document.querySelectorAll('.history-item')
  deleteButtons.forEach((el) => {
    el.onclick = (target) => {
      let elid = +target.target.id
      for (let i = 0; i < historyItems.length; i++) {
        if (historyItems[i].id == elid) {
          historyItems[i].remove()
          break
        }
      }
      /* historyItems[elid].remove() */
      for (let i = 0; i < historyArr.length; i++) {
        if (historyArr[i].id === elid) {
          historyArr.splice(i, 1)
          break
        }
      }
      counting()
    }
  })
}

class CreateHistoryItem {
  constructor(id, type, name, value, color) {
    this.id = id
    this.type = type
    this.name = name
    this.value = value
    this.color = color
  }
}

addIncome.onclick = () => {
  let historyItem = new CreateHistoryItem(
    idOfActivities,
    'income',
    plusInputName.value,
    Number(plusInputValue.value),
    'green'
  )

  historyArr.push(historyItem)
  createHistoryItem(historyItem)
  idOfActivities++
  plusInputValue.value = ''
  plusInputName.value = ''
  addOnclickOnDeleteBtns()
  counting()
  console.log(Array.from(document.querySelectorAll('.history-item')))
}

addExpense.onclick = () => {
  let historyItem = new CreateHistoryItem(
    idOfActivities,
    'expense',
    minusInputName.value,
    Number(minusInputValue.value),
    'red'
  )

  historyArr.push(historyItem)
  createHistoryItem(historyItem, 'red', 'expense')
  idOfActivities++
  minusInputValue.value = ''
  minusInputName.value = ''
  addOnclickOnDeleteBtns()
  counting()
  console.log(Array.from(document.querySelectorAll('.history-item')))
}
/////////test//////////////////////////////////////////////////////

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

let otladka = [
  { id: 0, type: 'income', name: 'test0', value: 4, color: 'green' },
  { id: 1, type: 'expense', name: 'test1', value: 2, color: 'red' },
  { id: 2, type: 'income', name: 'test2', value: 4, color: 'green' },
  { id: 3, type: 'income', name: 'test3', value: 8, color: 'green' },
  { id: 4, type: 'expense', name: 'test4', value: 4, color: 'red' },
]

testingBtn.onclick = () => {
  for (let i = 0; i < 5; i++) {
    createHistoryItem(otladka[i])
    historyArr.push(otladka[i])
  }
}

/* let budgetArr = [
  {
    id: 0,
    budget: 150,
  },
  {
    id: 1,
    budget: 75,
  },
  {
    id: 2,
    budget: 15,
  },
  {
    id: 3,
    budget: 200,
  },
  {
    id: 4,
    budget: 125,
  },
]

let sum = 0

function getSum() {
  for (let i = 0; i < budgetArr.length; i++) {
    sum += budgetArr[i].budget
  }
}

getSum()

console.log(sum) */
