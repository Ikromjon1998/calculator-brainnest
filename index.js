
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

let calculator = document.querySelector('.container');
let buttons = calculator.querySelector('.buttons');
const display = calculator.querySelector('.display');


buttons.addEventListener('click', e => {
    if(e.target.matches('.button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
    
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
              display.textContent = keyContent;
            } else {
              display.textContent = displayedNum + keyContent;
            }
        }
      
        if (action === 'decimal') {
            display.textContent = displayedNum + '.'
        }
      
        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ){
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }
      
        if (action === 'clear') {
            console.log('clear key!')
        }
      
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            display.textContent = operate(operator, firstValue, secondValue)
        }


    }
})