const plusInputValue = document.querySelector('.plus-input-value')
const minusInputValue = document.querySelector('.minus-input-value')
const plusInputDescription = document.querySelector('.plus-input-description')
const minusInputDescription = document.querySelector('.minus-input-description')
const addIncome = document.querySelector('.plus-button')
const addExpense = document.querySelector('.minus-button')
const historyList = document.querySelector('.history-list')
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
const modal = document.querySelector('.modal')

let isIncomeDropdownVisible = false
let isExpenseDropdownVisible = false
let idOfIncomeCategorie = 0
let idOfExpenseCategorie = 0
let idOfActivities
let historyArr = []
let incomeCategoriesArr = []
let expenseCategoriesArr = []
/* ---------------LOCAL STORAGE --------------- */
if (!localStorage.budgetAppData) {
  idOfActivities = 0
  saveDataInLocalStorage()
}

if (localStorage.budgetAppData) {
  historyArr = JSON.parse(localStorage.getItem('budgetAppData')).historyArr
  historyArr.forEach((el) => {
    createHistoryItem(el)
    updateInfoScreen()
  })

  idOfActivities = JSON.parse(localStorage.getItem('budgetAppData'))
    .idOfActivities

  incomeCategoriesArr = JSON.parse(localStorage.getItem('budgetAppData'))
    .incomeCategoriesArr
  let incomeArr = Array.from(incomeDropdownList.children)
  createCategoriesItem(
    incomeArr,
    incomeCategoriesArr,
    incomeDropdownList,
    incomeCategoriesLabel,
    'income',
    'income-categorie-item'
  )

  expenseCategoriesArr = JSON.parse(localStorage.getItem('budgetAppData'))
    .expenseCategoriesArr
  let expenseArr = Array.from(expenseDropdownList.children)
  createCategoriesItem(
    expenseArr,
    expenseCategoriesArr,
    expenseDropdownList,
    expenseCategoriesLabel,
    'expense',
    'expense-categorie-item'
  )
}
function saveDataInLocalStorage() {
  let data = {
    idOfActivities: idOfActivities,
    historyArr: historyArr,
    incomeCategoriesArr: incomeCategoriesArr,
    expenseCategoriesArr: expenseCategoriesArr,
  }
  localStorage.setItem('budgetAppData', JSON.stringify(data))
}
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
    id: incomeCategoriesArr.length,
    name: newIncomeCategorieInput.value,
  })
  newIncomeCategorieInput.value = ''
  let arr = Array.from(incomeDropdownList.children)
  createCategoriesItem(
    arr,
    incomeCategoriesArr,
    incomeDropdownList,
    incomeCategoriesLabel,
    'income',
    'income-categorie-item'
  )
}
/* КНОПКА СОЗДАНИЯ НОВОЙ КАТЕГОРИИ РАСХОДОВ */
addNewExpenseCategorie.onclick = () => {
  expenseCategoriesArr.push({
    id: expenseCategoriesArr.length,
    name: newExpenseCategorieInput.value,
  })
  newExpenseCategorieInput.value = ''
  let arr = Array.from(expenseDropdownList.children)
  createCategoriesItem(
    arr,
    expenseCategoriesArr,
    expenseDropdownList,
    expenseCategoriesLabel,
    'expense',
    'expense-categorie-item'
  )
}
/* СОЗДАТЬ СПИСОК КАТЕГОРИЙ */
function createCategoriesItem(arr, catArr, target, label, state, type) {
  let length = arr.length
  for (let y = 1; y < length; y++) {
    arr[y].remove()
  }
  for (let i = 0; i < catArr.length; i++) {
    target.insertAdjacentHTML(
      'beforeend',
      `<li class="categories-dropdown-item ${type}" id="${catArr[i].id}">${catArr[i].name}</li>`
    )

    if (state === 'income') {
      let incomeCategoriesItems = document.querySelectorAll(
        '.income-categorie-item'
      )
      incomeCategoriesItems.forEach((el) => {
        el.onclick = () => {
          let id = Array.from(incomeCategoriesItems).indexOf(el)
          label.innerHTML = incomeCategoriesArr[id].name
          if (state === 'income') {
            incomeDropdownList.style.display = 'none'
            isIncomeDropdownVisible = !isIncomeDropdownVisible
          } else {
            expenseDropdownList.style.display = 'none'
            isExpenseDropdownVisible = !isExpenseDropdownVisible
          }
        }
      })
    } else {
      let expenseCategoriesItems = document.querySelectorAll(
        '.expense-categorie-item'
      )
      expenseCategoriesItems.forEach((el) => {
        el.onclick = () => {
          let id = Array.from(expenseCategoriesItems).indexOf(el)
          label.innerHTML = expenseCategoriesArr[id].name
          if (state === 'income') {
            incomeDropdownList.style.display = 'none'
            isIncomeDropdownVisible = !isIncomeDropdownVisible
          } else {
            expenseDropdownList.style.display = 'none'
            isExpenseDropdownVisible = !isExpenseDropdownVisible
          }
        }
      })
    }
  }
}
/* ПРОВЕСИТЬ ОНКЛИКИ НА ЕЛЕМЕНТЫ СПИСКА КАТЕГОРИЙ */
function addOnClickOnCategoriesItems(label, type, state) {
  //incomeCategoriesLabel
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
          <div class="item-option info-history-item" id="${el.id}">?</div>
      </div>
    </li>`
  )
}
/* Добавляем онклики на кнопки инофрмации */
function addOnclickOnInfoBtns() {
  let historyItemInfo = document.querySelectorAll('.info-history-item')
  historyItemInfo.forEach((el) => {
    el.onclick = (target) => {
      let id = +target.target.id
      modal.style.display = 'block'
      let modalText = document.querySelector('.modal-text')
      let modalDate = document.querySelector('.modal-date')
      modalText.innerHTML = historyArr.filter(
        (el) => el.id === id
      )[0].description
      let item = historyArr.filter((el) => el.id === id)[0]
      let fullDate = `${item.month}/${item.day}/${item.year}`
      modalDate.innerHTML = fullDate
    }
  })
}
/* Добавляем онклики на кнопки удаления */
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
      saveDataInLocalStorage()
    }
  })
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
function updateInfoScreen() {
  addOnclickOnDeleteBtns()
  addOnclickOnInfoBtns()
  counting()
}
/* ---------------ДОБАВЛЕНИЕ ДОХОДА/РАСХОДА--------------- */
class CreateHistoryItem {
  constructor(
    id,
    type,
    categorie,
    value,
    color,
    description,
    day,
    month,
    year
  ) {
    this.id = id
    this.type = type
    this.categorie = categorie
    this.value = value
    this.color = color
    this.description = description
    this.day = day
    this.month = month
    this.year = year
  }
}
function getDate() {
  let day = new Date().toLocaleString('en', {
    day: 'numeric',
  })
  let month = new Date().toLocaleString('en', {
    month: 'numeric',
  })
  let year = new Date().toLocaleString('en', {
    year: 'numeric',
  })
  return { day, month, year }
}

function checkFilter() {
  activeSortFilter === 'sort-less'
    ? sortLess()
    : activeSortFilter === 'sort-more'
    ? sortMore()
    : activeSortFilter === 'sort-new'
    ? sortNew()
    : activeSortFilter === 'sort-categorie'
    ? sortCategorie()
    : sortOld()
}

addIncome.onclick = () => {
  let { day, month, year } = getDate()
  let historyItem = new CreateHistoryItem(
    idOfActivities,
    'income',
    incomeCategoriesLabel.innerHTML,
    Number(plusInputValue.value),
    'green',
    plusInputDescription.value,
    day,
    month,
    year
  )
  addActivities(historyItem, plusInputValue, plusInputDescription)
  checkFilter()
  idOfActivities++
  saveDataInLocalStorage()
}

addExpense.onclick = () => {
  let { day, month, year } = getDate()
  let historyItem = new CreateHistoryItem(
    idOfActivities,
    'expense',
    expenseCategoriesLabel.innerHTML,
    Number(minusInputValue.value),
    'red',
    minusInputDescription.value,
    day,
    month,
    year
  )
  addActivities(historyItem, minusInputValue, minusInputDescription)
  checkFilter()
  idOfActivities++
  saveDataInLocalStorage()
}

function addActivities(item, target, target2) {
  target.value = ''
  target2.value = ''
  historyArr.push(item)
  historyList.innerHTML = ''
  historyArr.forEach((el) => {
    createHistoryItem(el)
  })
  updateInfoScreen()
}
let closeModal = document.querySelector('.modal-close')
closeModal.onclick = () => {
  modal.style.display = 'none'
}
/////////test//////////////////////////////////////////////////////
let sortNewButton = document.querySelector('.sort-new')
let sortOldButton = document.querySelector('.sort-old')
let sortMoreButton = document.querySelector('.sort-more')
let sortLessButton = document.querySelector('.sort-less')
let sortCategorieButton = document.querySelector('.sort-categorie')
let testarr = [
  {
    categorie: '08/24/2021',
    color: 'green',
    date: '08/24/2021',
    description: 'first wage',
    id: 0,
    type: 'income',
    value: 1000,
  },
  {
    categorie: '03/23/2021',
    color: 'green',
    date: '03/23/2021',
    description: 'first wage',
    id: 1,
    type: 'income',
    value: 800,
  },
  {
    categorie: '02/01/2021',
    color: 'green',
    date: '02/01/2021',
    description: 'first wage',
    id: 2,
    type: 'income',
    value: 50,
  },
  {
    categorie: '01/30/2021',
    color: 'green',
    date: '01/30/2021',
    description: 'first wage',
    id: 3,
    type: 'income',
    value: 200,
  },
  {
    categorie: '10/11/2021',
    color: 'green',
    date: '10/11/2021',
    description: 'first wage',
    id: 4,
    type: 'income',
    value: 700,
  },
]

/* --------------- */
let activeSortFilter = 'sort-new'

function whichFilterIsActive(el) {
  let filterLabels = document.querySelectorAll('.history-filter-label')
  filterLabels.forEach((el) => {
    if (Array.from(el.classList).includes('history-filter-label-active')) {
      el.classList.remove('history-filter-label-active')
    }
  })
  el.classList.add('history-filter-label-active')
}
/* --------------- */
function getTime(item) {
  return new Date(item.year, item.month, item.day).getTime()
}
function sortLess() {
  let sorted = historyArr.sort(function (a, b) {
    return b.value - a.value
  })
  historyList.innerHTML = ''
  sorted.forEach((el) => {
    createHistoryItem(el)
    updateInfoScreen()
  })
  whichFilterIsActive(sortLessButton)
}
function sortMore() {
  let sorted = historyArr.sort(function (a, b) {
    return a.value - b.value
  })
  historyList.innerHTML = ''
  sorted.forEach((el) => {
    createHistoryItem(el)
    updateInfoScreen()
  })
  whichFilterIsActive(sortMoreButton)
}
function sortOld() {
  let sorted = historyArr.sort((a, b) => getTime(b) - getTime(a))
  historyList.innerHTML = ''
  sorted.forEach((el) => {
    createHistoryItem(el)
    updateInfoScreen()
  })
  whichFilterIsActive(sortOldButton)
}
function sortNew() {
  let sorted = historyArr.sort((a, b) => getTime(a) - getTime(b))
  historyList.innerHTML = ''
  sorted.forEach((el) => {
    createHistoryItem(el)
    updateInfoScreen()
  })
  whichFilterIsActive(sortNewButton)
}
function sortCategorie() {
  let totalCategoriesValue = []
  function getSum(arr, color) {
    arr.forEach((item) => {
      let filtered = historyArr.filter((el) => el.categorie === item.name)
      let sum = 0
      for (let i = 0; i < filtered.length; i++) {
        sum += filtered[i].value
      }
      totalCategoriesValue.push({
        name: item.name,
        value: sum,
        color: color,
      })
    })
  }
  getSum(incomeCategoriesArr, 'green')
  getSum(expenseCategoriesArr, 'red')
  console.log(totalCategoriesValue)
  let sorted = totalCategoriesValue.sort((a, b) => a.value - b.value)
  historyList.innerHTML = ''
  function render(el) {
    historyList.insertAdjacentHTML(
      `afterbegin`,
      `<li class="history-item">
        <div class="history-label ${el.color}">${el.name}</div>
        <div class="history-value">$${el.value}</div>
      </li>`
    )
  }
  sorted.forEach((el) => {
    render(el)
  })
  updateInfoScreen()
  whichFilterIsActive(sortCategorieButton)
}
/* --------------- */
sortLessButton.onclick = (target) => {
  sortLess()
  activeSortFilter = target.target.id
}
sortMoreButton.onclick = (target) => {
  sortMore()
  activeSortFilter = target.target.id
}
sortOldButton.onclick = (target) => {
  sortOld()
  activeSortFilter = target.target.id
}
sortNewButton.onclick = (target) => {
  sortNew()
  activeSortFilter = target.target.id
}
sortCategorieButton.onclick = (target) => {
  sortCategorie()
  activeSortFilter = target.target.id
}
/* --------------- */
let somearr = [
  {
    id: 0,
    type: 'income',
    categorie: 'zero',
    value: 0,
    color: 'green',
    description: 'zero',
    date: '3/27/2021',
  },
  {
    id: 1,
    type: 'income',
    categorie: 'one',
    value: 1,
    color: 'green',
    description: 'one',
    date: '3/27/2021',
  },
  {
    id: 2,
    type: 'income',
    categorie: 'two',
    value: 2,
    color: 'green',
    description: 'two',
    date: '3/27/2021',
  },
  {
    id: 3,
    type: 'income',
    categorie: 'three',
    value: 3,
    color: 'green',
    description: 'three',
    date: '3/27/2021',
  },
  {
    id: 4,
    type: 'income',
    categorie: 'four',
    value: 4,
    color: 'green',
    description: 'four',
    date: '3/27/2021',
  },
  {
    id: 5,
    type: 'income',
    categorie: 'five',
    value: 5,
    color: 'green',
    description: 'five',
    date: '3/27/2021',
  },
  {
    id: 6,
    type: 'income',
    categorie: 'six',
    value: 6,
    color: 'green',
    description: 'six',
    date: '3/27/2021',
  },
  {
    id: 7,
    type: 'income',
    categorie: 'seven',
    value: 7,
    color: 'green',
    description: 'seven',
    date: '3/27/2021',
  },
  {
    id: 8,
    type: 'income',
    categorie: 'eight',
    value: 8,
    color: 'green',
    description: 'eight',
    date: '3/27/2021',
  },
]
let otladka = document.querySelector('.otladka')
otladka.onclick = () => {
  somearr.forEach((el) => {
    let historyItem = new CreateHistoryItem(
      el.id,
      el.type,
      el.categorie,
      el.value,
      el.color,
      el.description,
      el.date
    )
    historyArr.push(historyItem)
    createHistoryItem(el)
    updateInfoScreen()
  })
}
/* --------------- */
/* let testarr2 = [
  { day: 1, month: 1, year: 2020 },
  { day: 2, month: 1, year: 2021 },
  { day: 2, month: 1, year: 2019 },
  { day: 1, month: 2, year: 2020 },
  { day: 2, month: 2, year: 2021 },
  { day: 1, month: 2, year: 2019 },
  { day: 1, month: 3, year: 2020 },
  { day: 2, month: 3, year: 2021 },
  { day: 3, month: 3, year: 2019 },
] */
/* --------------- */

/* ФУНКЦИЯ СРАВНИВАНИЯ ВРЕМЕНИ
function getTime(item) {
  return new Date(item.year, item.month, item.day).getTime()
}

let test = testarr2.sort((a, b) => getTime(a) - getTime(b))
console.log(test) */
///////////////////////////
/* function sortDates() {
  let a = testarr2.sort(function (a, b) {
    return a.year - b.year
  })
  let b = a.sort(function (a, b) {
    return a.month - b.month
  })
  let c = b.sort(function (a, b) {
    return a.day - b.day
  })
  console.log(c)
}
sortDates() */
/////////////////////////////
/* let testing = testarr2.sort(function (a, b) {
  //самые новые вверху
  return a.year - b.year
})
let testingsecond = testing.sort(function (a, b) {
  //самые старые вверху
  return a.month - b.month
})
let testing2 = testarr2.sort(function (a, b) {
  return b.year - a.year
})
console.log(testing)
console.log(testingsecond)
console.log(testing2) */
/* 
let a = '03/23/2021'
let b = '10/23/2021'
let testarr = [
  '04/01/2021',
  '01/30/2021',
  '03/20/2021',
  '05/15/2021',
  '02/14/2021',
  '04/02/2021',
  '01/29/2021',
  '03/19/2021',
  '05/16/2021',
  '02/15/2021',
]
console.log(testarr.sort().reverse()) */
///////////////////////////////////////////////////////////////
/* const ru = new Date().toLocaleString('en', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})

const month = new Date().getMonth()
const year = new Date().getFullYear()
const day = new Date().getDay()
console.log(ru)

const testArr = []

function keksik() {
  a = '3/13/2021'
  b = '5/11/2021'
  c = '10/10/2021'
  d = '1/1/2021'
  testArr.push(b)
  testArr.push(d)
  testArr.push(a)
  testArr.push(c)

  for (let i = 0; i < 5; i++) {
    testArr.push(
      new Date().toLocaleString('en', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })
    )
  }
  console.log(testArr)
}
keksik()

testArr.sort(function (a, b) {
  return a - b
})

console.log(testArr) */
//////////////////////////////////////////////////////////////////////////////////////////////
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
