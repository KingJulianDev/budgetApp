const plusInputValue = document.querySelector('.plus-input-value')
const minusInputValue = document.querySelector('.minus-input-value')
const plusInputDescription = document.querySelector('.plus-input-description')
const minusInputDescription = document.querySelector('.minus-input-description')
const addIncome = document.querySelector('.plus-button')
const addExpense = document.querySelector('.minus-button')
const historyList = document.querySelector('.history')
const ul = document.querySelector('.history-list')
const addNewIncomeCategorie = document.querySelector(
  '.income-new-categorie-btn'
)
const addNewExpenseCategorie = document.querySelector(
  '.expense-new-categorie-btn'
)
const incomeDropdownList = document.querySelector(
  '.income-categories-dropdown-list'
)
const expenseDropdownList = document.querySelector(
  '.expense-categories-dropdown-list'
)
const newIncomeCategorieInput = document.querySelector(
  '.new-income-categorie-input'
)
const newExpenseCategorieInput = document.querySelector(
  '.new-expense-categorie-input'
)
const selectCategorie = document.getElementById('select-categorie-income')
const incomeCategoriesLabel = document.querySelector('.income-dropdown-label')
const expenseCategoriesLabel = document.querySelector('.expense-dropdown-label')

let isIncomeDropdownVisible = false
let isExpenseDropdownVisible = false
let historyArr = []
let incomeCategoriesArr = []
let expenseCategoriesArr = []
let idOfActivities = 0
let idOfIncomeCategorie = 0
let idOfExpenseCategorie = 0

/* ---------------ВЫПАДАЮЩИЕ СПИСКИ КАТЕГОРИЙ--------------- */
/* ПОКАЗАТЬ/СКРЫТЬ ВЫПАДАЮЩИЙ СПИСОК ДОХОДОВ */
incomeCategoriesLabel.onclick = (target) => {
  if (target.target.id === 'select-categorie-income') {
    if (isIncomeDropdownVisible) {
      incomeDropdownList.style.display = 'none'
      isIncomeDropdownVisible = !isIncomeDropdownVisible
    } else {
      incomeDropdownList.style.display = 'block'
      isIncomeDropdownVisible = !isIncomeDropdownVisible
    }
  } else {
    return
  }
}
/* ПОКАЗАТЬ/СКРЫТЬ ВЫПАДАЮЩИЙ СПИСОК РАСХОДОВ */
expenseCategoriesLabel.onclick = (target) => {
  if (target.target.id === 'select-categorie-expense') {
    if (isExpenseDropdownVisible) {
      expenseDropdownList.style.display = 'none'
      isExpenseDropdownVisible = !isExpenseDropdownVisible
    } else {
      expenseDropdownList.style.display = 'block'
      isExpenseDropdownVisible = !isExpenseDropdownVisible
    }
  } else {
    return
  }
}
/* КНОПКА СОЗДАНИЯ НОВОЙ КАТЕГОРИИ ДОХОДОВ*/
addNewIncomeCategorie.onclick = () => {
  incomeCategoriesArr.push({
    id: idOfIncomeCategorie,
    name: newIncomeCategorieInput.value,
  })
  newIncomeCategorieInput.value = ''
  let arr = Array.from(incomeDropdownList.children)
  createCategoriesItem(arr, incomeCategoriesArr, incomeDropdownList)
  idOfIncomeCategorie++
}
/* КНОПКА СОЗДАНИЯ НОВОЙ КАТЕГОРИИ РАСХОДОВ */
addNewExpenseCategorie.onclick = () => {
  expenseCategoriesArr.push({
    id: idOfExpenseCategorie,
    name: newExpenseCategorieInput.value,
  })
  newExpenseCategorieInput.value = ''
  let arr = Array.from(expenseDropdownList.children)
  createCategoriesItem(arr, expenseCategoriesArr, expenseDropdownList)
  idOfExpenseCategorie++
}
/* СОЗДАТЬ СПИСОК КАТЕГОРИЙ */
function createCategoriesItem(arr, catarr, target, label) {
  let length = arr.length
  for (let y = 1; y < length; y++) {
    arr[y].remove()
  }
  for (let i = 0; i < catarr.length; i++) {
    target.insertAdjacentHTML(
      'beforeend',
      `<li class="categories-dropdown-item income-categorie-item" id="${catarr[i].id}" onclick=onClickOnCategoriesItem(${catarr[i].id})>${catarr[i].name}</li>`
    )
  }
}
/* ПРОВЕСИТЬ ОНКЛИКИ НА ЕЛЕМЕНТЫ СПИСКА КАТЕГОРИЙ */
function onClickOnCategoriesItem(id, label) {
  //incomeCategoriesLabel
  incomeCategoriesLabel.innerHTML = incomeCategoriesArr[id].name
  document.querySelector('.income-categories-dropdown-list').style.display =
    'none'
  isIncomeDropdownVisible = !isIncomeDropdownVisible
}
/* ---------------ИСТОРИЯ АКТИВНОСТИ--------------- */
function createHistoryItem(el) {
  historyList.insertAdjacentHTML(
    'afterbegin',
    `<li class="${el.type} history-item" id="${el.id}">
      <div class="history-label ${el.color}">${el.categorie}</div>
      <div class="history-value">$${el.value}</div>
      <div class="li-item-options">
          <div class="item-option delete-history-item" id="${el.id}">X</div>
          <div class="item-option edit-history-item" id="${el.id}">?</div>
      </div>
    </li>`
  )
}
/* ---------------ОТОБРАЖЕНИЕ ИНФОРМАЦИОННОЙ ПАНЕЛИ--------------- */
function counting() {
  let budget = 0
  let expenses = 0

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
/* ---------------КНОПКИ УДАЛЕНИЯ В ИСТОРИИ--------------- */
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
/* ---------------ДОБАВЛЕНИЕ ДОХОДА/РАСХОДА--------------- */
class CreateHistoryItem {
  constructor(id, type, categorie, value, color, description) {
    this.id = id
    this.type = type
    this.categorie = categorie
    this.value = value
    this.color = color
    this.description = description
  }
}

addIncome.onclick = () => {
  let historyItem = new CreateHistoryItem(
    idOfActivities,
    'income',
    incomeCategoriesLabel.innerHTML,
    Number(plusInputValue.value),
    'green',
    plusInputDescription.value
  )
  addActivities(historyItem, plusInputValue, plusInputDescription)
}

addExpense.onclick = () => {
  let historyItem = new CreateHistoryItem(
    idOfActivities,
    'expense',
    minusCategoriesLabel.innerHTML,
    Number(minusInputValue.value),
    'red',
    minusInputDescription.value
  )
  addActivities(historyItem, minusInputValue, minusInputDescription)
}

function addActivities(item, target, target2) {
  target.value = ''
  target2.value = ''
  historyArr.push(item)
  createHistoryItem(item)
  idOfActivities++
  addOnclickOnDeleteBtns()
  counting()
}
/////////test////////////////////////////////////////////////////// 165-215

/* const clear = document.querySelector('.clear-btn')
clear.onclick = () => {
  renderHistoryItem()
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
  addOnclickOnDeleteBtns()
}

sortIncome.onclick = () => {
  sortHistoryItems('income')
  addOnclickOnDeleteBtns()
}

sortExpense.onclick = () => {
  sortHistoryItems('expense')
  addOnclickOnDeleteBtns()
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
} */

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
