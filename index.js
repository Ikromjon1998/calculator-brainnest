
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

// function to solve 
const solve = (n1, operator, n2) => {
    const a = parseFloat(n1);
    const b = parseFloat(n2);
    if (operator === 'add') return a + b;
    if (operator === 'subtract') return a - b;
    if (operator === 'multiply') return a * b;
    if (operator === 'divide') return b==0?'Infinite':(a / b).toFixed(2);
}


// define type of action
const getKeyType = key => {
    const { action } = key.dataset
    if (!action) return 'number'
    // if action one of the main operators
    return (action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide') ?'operator' : action;
    
    
}
// return result 
const readyResult = (key, numInDisplay, state) => {
    const keyContent = key.textContent;// take text content from key
    const keyType = getKeyType(key)// define type of key
    const {
      firstVal,
      operator,
      modVal,
      previousKeyType
    } = state // object state 
  
    // return clicked button content to show on display
    if (keyType === 'number') {
      return numInDisplay
       === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'solve' ? keyContent : numInDisplay
         + keyContent;
    }
    
    if (keyType === 'decimal') {
      if (!numInDisplay.includes('.')) return numInDisplay + '.';
      if (previousKeyType === 'operator' || previousKeyType === 'solve') return '0.';
      return numInDisplay;
    }
    // by operator shows results on display
    if (keyType === 'operator') {
      return firstVal &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'solve'
        ? solve(firstVal, operator, numInDisplay): numInDisplay;

    }
    // void
    if (keyType === 'clear') return 0;
  
    if (keyType === 'solve') {
      return firstVal ? previousKeyType === 'solve'? 
                solve(numInDisplay, operator, modVal) : solve(firstVal, operator, numInDisplay): numInDisplay;

    }
}
// 
const updateCalculator = (key, calculator, calculatedValue, numInDisplay) => {
    const keyType = getKeyType(key)
    const { firstVal, operator, modVal, previousKeyType} = calculator.dataset;
  
    calculator.dataset.previousKeyType = keyType;
  
    if (keyType === 'operator') {
      calculator.dataset.operator = key.dataset.action;
      calculator.dataset.firstVal = firstVal && operator && previousKeyType !== 'operator' && previousKeyType !== 'solve' ? calculatedValue : numInDisplay;

    }
  
    if (keyType === 'solve') {
      calculator.dataset.modVal = firstVal && previousKeyType === 'solve' ? modVal : numInDisplay;
    }
    // if button.text content is 'AC' then we can clear all values in dataset
    // reseting all values to initial values 
    if (keyType === 'clear' && key.textContent === 'AC') {
      calculator.dataset.firstVal = ''
      calculator.dataset.modVal = ''
      calculator.dataset.operator = ''
      calculator.dataset.previousKeyType = ''
    }
}
  
const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)
    Array.from(key.parentNode.children).forEach(n => n.classList.remove('is-depressed'));
    // operator is not dublikated with is-depressed
    if (keyType === 'operator') key.classList.add('is-depressed');
    if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC';
    if (keyType !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE';//<>
    }
}
  
const calculator = document.querySelector('.container');
const display = calculator.querySelector('.display');
const buttons = calculator.querySelector('.buttons');
  
buttons.addEventListener('click', e => {
    if (!e.target.matches('button')) return
    const key = e.target
    const numInDisplay= display.textContent;
    const resultString = readyResult(key, numInDisplay, calculator.dataset);
  
    display.textContent = resultString
    updateCalculator(key, calculator, resultString, numInDisplay)
    updateVisualState(key, calculator);
})
  