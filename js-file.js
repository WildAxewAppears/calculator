const monitor = document.querySelector("#screen");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let resultCalculated = false;

let lastOperation = "";
let lastNumber = ""

const numbers = document.querySelectorAll("[data-number]");
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        const num = number.getAttribute('data-number');
        if (resultCalculated && operator == "") {
            reset();
        }
        if (!resultCalculated && firstNumber.length < 16) {
            if (operator === "") {
                
                if (firstNumber === "0") {
                    firstNumber = firstNumber.slice(1); 
                }
                firstNumber += num;
                monitor.value = firstNumber;
            }
        }
        if (operator !== "" && secondNumber.length < 16) {
           
            if (secondNumber === "0") {
                secondNumber = secondNumber.slice(1); 
            }
            secondNumber += num;
            monitor.value = secondNumber;
        }
    });
});


const operators = document.querySelectorAll("[data-operator]");
operators.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        const op = operatorButton.getAttribute('data-operator');
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
            operate();
            lastOperation = ""
            lastNumber = ""
            operator = op;
        } else if (firstNumber !== "") {
            lastOperation = ""
            lastNumber = ""
            operator = op;
        }
    });
});

const decimal = document.querySelector("#decimal");
decimal.addEventListener('click', () => {
    if (!resultCalculated) {
        if (operator === '' && firstNumber !== "") {
            if (!firstNumber.includes('.')) {
                firstNumber += '.';
                monitor.value = firstNumber;
            }
        } else {
            if (!secondNumber.includes('.') && secondNumber !== "") {
                secondNumber += '.';
                monitor.value = secondNumber;
            }
        }
    }
});

const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    if (lastOperation !== "") {
        secondNumber = lastNumber;
        firstNumber = monitor.value;
        operator = lastOperation;
        operate();
    }
    else {
        operate()
    }
});

function operate() {
    let result = "";

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if (operator === "" || secondNumber === "") {
        return;
    }

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num1 === 0 && num2 === 0) { 
                reset();
                monitor.value = "Math Error";
                return;
            }
            if (num1 !== 0 && num2 === 0) {
                reset();
                monitor.value = "It Hurts.";
                return;
            }
            result = num1 / num2;
            break;
    }

    if (result.toString().length > 15) {
        result = parseFloat(result).toExponential(3);
    }
    firstNumber = (parseFloat(result)).toString();
    monitor.value = firstNumber;

    lastOperation = operator;
    lastNumber = secondNumber

    operator = "";
    secondNumber = "";
    resultCalculated = true;
}


function reset() {
    lastOperation = ""
    lastNumber = ""
    resultCalculated = false;
    firstNumber = "";
    operator = "";
    secondNumber = "";
    monitor.value = firstNumber;
}

const ac = document.querySelector("#reset");
ac.addEventListener("click", reset);

const del = document.querySelector("#delete");
del.addEventListener("click", function() {
    if (!resultCalculated) { 
        if (operator === "" && firstNumber !== "") {
            firstNumber = firstNumber.slice(0, -1);
            monitor.value = firstNumber;
        }
    }
    if (operator !== "" && secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
        monitor.value = secondNumber;
    }
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        const num = key;
        if (resultCalculated && operator == "") {
            reset();
        }
        if (!resultCalculated && firstNumber.length < 16) {
            if (operator === "") {
                if (firstNumber === "0") {
                    firstNumber = firstNumber.slice(1); 
                }
                firstNumber += num;
                monitor.value = firstNumber;
            }
        }
        if (operator !== "" && secondNumber.length < 16) {
            if (secondNumber === "0") {
                secondNumber = secondNumber.slice(1); 
            }
            secondNumber += num;
            monitor.value = secondNumber;
        }
    } else if (['+', '-', '*', '/'].includes(key)) {
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
            operate();
            lastOperation = ""
            lastNumber = ""
            operator = key;
        } else if (firstNumber !== "") {
            operator = key;
            lastOperation = ""
            lastNumber = ""
        }
    } else if (key === '.') {
        if (operator === '') {
            if (!firstNumber.includes('.') && firstNumber !== "") {
                firstNumber += '.';
                monitor.value = firstNumber;
            }
        } else {
            if (!secondNumber.includes('.') && secondNumber !== "") {
                secondNumber += '.';
                monitor.value = secondNumber;
            }
        }
    } else if (key === 'Enter') {
        if (lastOperation !== "") {
            secondNumber = lastNumber;
            firstNumber = monitor.value;
            operator = lastOperation;
            operate();
        }
        else {
            operate()
        }
    } else if (key === 'Backspace') {
        if (!resultCalculated) {
            if (operator === "" && firstNumber !== "") {
                firstNumber = firstNumber.slice(0, -1);
                monitor.value = firstNumber;
            }
        }
        if (operator !== "" && secondNumber !== "") {
            secondNumber = secondNumber.slice(0, -1);
            monitor.value = secondNumber;
        }
    }
});