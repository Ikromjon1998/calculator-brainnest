
var stringResult = '';
const readyResult = (key) => {
    switch(key.textContent){
        case '=':
            stringResult = display.textContent + key.textContent;
            let p = eval(stringResult);
            display.textContent = p;
            break;
        case 'AC':
            stringResult = '';
            display.textContent = stringResult;
            break;
        default: 
            stringResult = display.textContent + key.textContent;
            display.textContent += key.textContent;
            break;
    }
    

}

const calculator = document.querySelector('.container');
const display = calculator.querySelector('.display');
const keys = calculator.querySelector('.buttons');
  
keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return
    const key = e.target
    

    readyResult(key);
    
})