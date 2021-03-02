const plusInputValue = document.querySelector('.plus-input-value')
const minusInputValue = document.querySelector('.minus-input-value')
const plusInputDescription = document.querySelector('.plus-input-description')
console.log(plusInputDescription)
const minusInputDescription = document.querySelector('.minus-input-description')
const addIncome = document.querySelector('.plus-button')
const addExpense = document.querySelector('.minus-button')
const historyList = document.querySelector('.history')
const ul = document.querySelector('.ul') // не акткуально
const addNewCategorie = document.querySelector('.new-categorie-btn')
const incomeDropdownList = document.querySelector(
  '.income-categories-dropdown-list'
)
const newCategorieInput = document.querySelector('.new-categorie-input')
const selectCategorie = document.getElementById('select-categorie-income')
const incomeCategoriesLabel = document.querySelector('.income-dropdown-label')

incomeCategoriesLabel.onclick = (target) => {
  if (target.target.id === 'select-categorie-income') {
    if (isDropdownListVisible) {
      incomeDropdownList.style.display = 'none'
      isDropdownListVisible = !isDropdownListVisible
    } else {
      incomeDropdownList.style.display = 'block'
      isDropdownListVisible = !isDropdownListVisible
    }
  } else {
    return
  }
}

addNewCategorie.onclick = () => {
  categoriesArr.push({
    id: idOfCategorie,
    name: newCategorieInput.value,
  })
  newCategorieInput.value = ''
  createCategoriesItem()
  idOfCategorie++
}

let isDropdownListVisible = false
let currentBudget = 0
let currentExpenses = 0
let currentBalance = 0
let historyArr = []
let categoriesArr = [
  /* { id: 0, name: 'New categorie' } */
]
let idOfActivities = 0
let idOfCategorie = 0

///////////////////////
let budget = 0
let expenses = 0
let balance = 0
///////////////////////

function createCategoriesItem() {
  let arr = Array.from(incomeDropdownList.children)
  let length = arr.length
  for (let y = 1; y < length; y++) {
    arr[y].remove()
  }
  for (let i = 0; i < categoriesArr.length; i++) {
    incomeDropdownList.insertAdjacentHTML(
      'beforeend',
      `<li class="categories-dropdown-item income-categorie-item" id="${categoriesArr[i].id}" onclick=onClickOnCategoriesItem(${categoriesArr[i].id})>${categoriesArr[i].name}</li>`
    )
  }
}

function onClickOnCategoriesItem(id) {
  /* console.log(typeof el)
  selectCategorie.innerHTML = el */

  incomeCategoriesLabel.innerHTML = categoriesArr[id].name
  document.querySelector('.income-categories-dropdown-list').style.display =
    'none'
  isDropdownListVisible = !isDropdownListVisible
}

function createHistoryItem(el) {
  ul.insertAdjacentHTML(
    'afterbegin',
    `<li class="${el.type} history-item" id="${el.id}">
      <div class="history-label ${el.color}">${el.description}</div>
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
function addOnclickOnDropdownItems(id) {
  console.log(id)
}

function renderHistoryItem() {
  let ul = document.querySelector('.dropdown-list')
  categoriesArr.forEach((el) => {
    ul.insertAdjacentHTML(
      'beforeend',
      `<li class="dropdown-item" id="${el.id}" onclick="addOnclickOnDropdownItems(${el.id})">${el.name}</li>`
    )
  })
}

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

  historyArr.push(historyItem)
  createHistoryItem(historyItem)
  idOfActivities++
  plusInputValue.value = ''
  plusInputDescription.value = ''
  addOnclickOnDeleteBtns()
  counting()
}

addExpense.onclick = () => {
  let historyItem = new CreateHistoryItem(
    idOfActivities,
    'expense',
    minusInputDescription.value,
    Number(minusInputValue.value),
    'red',
    minusInputDescription.value
  )

  historyArr.push(historyItem)
  createHistoryItem(historyItem, 'red', 'expense')
  idOfActivities++
  minusInputValue.value = ''
  minusInputDescription.value = ''
  addOnclickOnDeleteBtns()
  counting()
}
/////////test//////////////////////////////////////////////////////

const clear = document.querySelector('.clear-btn')
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
