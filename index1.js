const solve = (n1, operator, n2) => {
    const a = parseFloat(n1);
    const b = parseFloat(n2);
    if (operator === 'add') return a + b;
    if (operator === 'subtract') return a - b;
    if (operator === 'multiply') return a * b;
    if (operator === 'divide') return b==0?'Infinite':a / b;
}
// action type
const getKeyType = key => {
    const { action } = key.dataset
    if (!action) return 'number'
    // if action one of the main operators
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) return 'operator'
    // For everything else, return the action
    return action;
}
const readyResult = (key, numInDisplay, state) => {
    const keyContent = key.textContent;// take text content from key
    const keyType = getKeyType(key)// define type of action button, if not 
    const {
      firstVal,
      operator,
      modVal,
      previousKeyType
    } = state // object state 
  
    // return clicked button content 
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
  
    if (keyType === 'operator') {
      return firstVal &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'solve'
        ? solve(firstVal, operator, numInDisplay): numInDisplay;

    }
  
    if (keyType === 'clear') return 0
  
    if (keyType === 'solve') {
      return firstVal ? previousKeyType === 'solve'? 
                solve(numInDisplay, operator, modVal) : solve(firstVal, operator, numInDisplay): numInDisplay

    }
}

const calculator = document.querySelector('.container');
const display = calculator.querySelector('.display');
const keys = calculator.querySelector('.buttons');
  
keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return
    const key = e.target
    const numInDisplay= display.textContent;
    const resultString = readyResult(key, numInDisplay, calculator.dataset);
  
    display.textContent = resultString;
    updateCalculator(key, calculator, resultString, numInDisplay);
    updateVisualState(key, calculator);
})