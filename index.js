
// a)  functions for all of the basic math operators you typically find on simple calculators

function add (a, b){
    return a+b;
}
function subtract (a, b){
    return a-b;
}
function multiply (a, b){
    return a*b;
}
function divide (a, b){
    return a/b;
}

// b) new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate (operator, a, b){
    let result = ''
    switch (operator) {
        case 'add' || '+':
            result = add(a, b);
            break;
        case 'subtract' || '-':
            result = subtract(a, b);
            break;
        case 'multiply' || '*':
            result = multiply(a, b);
            break;
        case 'divide' || '/':
            result = divide(a, b);
            break;
    }
}

// function to calculate 
const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
}


// define type of action
const getKeyType = key => {
    const { action } = key.dataset
    if (!action) return 'number'
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) return 'operator'
    // For everything else, return the action
    return action
}
  
const createResultString = (key, displayedNum, state) => {
    const keyContent = key.textContent
    const keyType = getKeyType(key)
    const {
      firstValue,
      operator,
      modValue,
      previousKeyType
    } = state
  
    if (keyType === 'number') {
      return displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
        ? keyContent
        : displayedNum + keyContent
    }
  
    if (keyType === 'decimal') {
      if (!displayedNum.includes('.')) return displayedNum + '.'
      if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
      return displayedNum
    }
  
    if (keyType === 'operator') {
      return firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        ? calculate(firstValue, operator, displayedNum)
        : displayedNum
    }
  
    if (keyType === 'clear') return 0
  
    if (keyType === 'calculate') {
      return firstValue
        ? previousKeyType === 'calculate'
          ? calculate(displayedNum, operator, modValue)
          : calculate(firstValue, operator, displayedNum)
        : displayedNum
    }
}
  
const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
    const keyType = getKeyType(key)
    const {
      firstValue,
      operator,
      modValue,
      previousKeyType
    } = calculator.dataset
  
    calculator.dataset.previousKeyType = keyType
  
    if (keyType === 'operator') {
      calculator.dataset.operator = key.dataset.action
      calculator.dataset.firstValue = firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        ? calculatedValue
        : displayedNum
    }
  
    if (keyType === 'calculate') {
      calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
        ? modValue
        : displayedNum
    }
  
    if (keyType === 'clear' && key.textContent === 'AC') {
      calculator.dataset.firstValue = ''
      calculator.dataset.modValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.previousKeyType = ''
    }
}
  
const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
  
    if (keyType === 'operator') key.classList.add('is-depressed')
    if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
    if (keyType !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }
}
  
const calculator = document.querySelector('.container');
const display = calculator.querySelector('.display');
const keys = calculator.querySelector('.buttons');
  
keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return
    const key = e.target
    const displayedNum = display.textContent
    const resultString = createResultString(key, displayedNum, calculator.dataset)
  
    display.textContent = resultString
    updateCalculatorState(key, calculator, resultString, displayedNum)
    updateVisualState(key, calculator)
})
  