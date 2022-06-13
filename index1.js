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
    const keyType = getKeyType(key);
    let dispNum = numInDisplay; 

    if (numInDisplay === '' ){
        
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