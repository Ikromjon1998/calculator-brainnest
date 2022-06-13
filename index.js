
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
    switch (operator) {
        case '+':
            add(a, b);
            break;
        case '-':
            subtract(a, b);
            break;
        case '*':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
            break;
    }
}