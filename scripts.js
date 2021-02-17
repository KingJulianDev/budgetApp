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

function createHistoryItem(el, color){
    historyList.insertAdjacentHTML(
        'beforebegin',
        `
            <li>
                <div class="history-label ${color}">${el.name}</div>

                <div class="history-value">$${el.value}</div>

                <div class="li-item-options">
                    <div class="item-option edit-history-item">X</div>
                    <div class="item-option delete-history-item">?</div>
                </div>
            </li>
        `
    )
}

addIncome.onclick = () => {
    (currentBudget === 0) ? currentBudget = Number(plusInputValue.value) : currentBudget += Number(plusInputValue.value);
    document.querySelector('.budget').innerHTML = currentBudget
    currentBalance = currentBudget - currentExpenses
    document.querySelector('.balance').innerHTML = currentBalance
    let historyItem = {
        id: idOfActivities,
        type: 'income',
        name: plusInputName.value,
        value: Number(plusInputValue.value)
    }
    historyArr.push(historyItem)
    createHistoryItem(historyItem, 'green')
    idOfActivities ++
    plusInputValue.value = ''
    plusInputName.value = ''
    console.log(historyArr);
    
}

addExpense.onclick = () => {
    (currentExpenses === 0) ? currentExpenses = Number(minusInputValue.value) : currentExpenses += Number(minusInputValue.value);
    document.querySelector('.expenses').innerHTML = currentExpenses
    currentBalance = currentBudget - currentExpenses
    document.querySelector('.balance').innerHTML = currentBalance
    let historyItem = {
        id: idOfActivities,
        type: 'expense',
        name: minusInputName.value,
        value: Number(minusInputValue.value)
    }
    historyArr.push(historyItem)
    createHistoryItem(historyItem, 'red')
    idOfActivities ++
    minusInputValue.value = ''
    minusInputName.value = ''
    console.log(historyArr);  
}

let test = document.getElementById('btn')
test.onclick = () => {
    let kek = historyArr.filter(el => el.type === 'income')
    console.log(kek)
}