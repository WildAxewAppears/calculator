const monitor = document.querySelector("#screen");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let resultCalculated = false;

let lastOperation = "";
let lastNumber = ""

function updateMonitor() {
    let text = monitor.value;
    monitor.classList.remove('small-text', 'smaller-text', 'smallest-text');

    if (text.length > 10 && text.length <= 15) {
        monitor.classList.add('small-text');
    } else if (text.length > 15 && text.length <= 20) {
        monitor.classList.add('smaller-text');
    } else if (text.length > 20) {
        monitor.classList.add('smallest-text');
    }
}

const numbers = document.querySelectorAll("[data-number]");
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        const num = number.getAttribute('data-number');
        if (resultCalculated && operator == "") {
            reset();
        }
        if (!resultCalculated && firstNumber.length < 15) {
            if (operator === "") {
                if (firstNumber === "0") {
                    firstNumber = firstNumber.slice(1); 
                }
                firstNumber += num;
                monitor.value = firstNumber;
                updateMonitor();
            }
        }
        if (operator !== "" && secondNumber.length < 15) {
            if (secondNumber === "0") {
                secondNumber = secondNumber.slice(1); 
            }
            secondNumber += num;
            monitor.value = `${firstNumber} ${operator} ${secondNumber}`;
            updateMonitor();
        }
    });
});

const operators = document.querySelectorAll("[data-operator]");
operators.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        const op = operatorButton.getAttribute('data-operator');
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
            operate();
            lastOperation = "";
            lastNumber = "";
            operator = op;
            monitor.value = `${firstNumber} ${operator}`;
            updateMonitor();
        } else if (firstNumber !== "") {
            lastOperation = "";
            lastNumber = "";
            operator = op;
            monitor.value = `${firstNumber} ${operator}`;
            updateMonitor();
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
                updateMonitor();
            }
        } else {
            if (!secondNumber.includes('.') && secondNumber !== "") {
                secondNumber += '.';
                monitor.value = `${firstNumber} ${operator} ${secondNumber}`;
                updateMonitor();
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
    } else {
        operate();
    }
    updateMonitor();
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
    updateMonitor();

    lastOperation = operator;
    lastNumber = secondNumber;

    operator = "";
    secondNumber = "";
    resultCalculated = true;
}

function reset() {
    lastOperation = "";
    lastNumber = "";
    resultCalculated = false;
    firstNumber = "";
    operator = "";
    secondNumber = "";
    monitor.value = firstNumber;
    updateMonitor();
}

const ac = document.querySelector("#reset");
ac.addEventListener("click", reset);

const del = document.querySelector("#delete");
del.addEventListener("click", function() {
    if (!resultCalculated) { 
        if (operator === "" && firstNumber !== "") {
            firstNumber = firstNumber.slice(0, -1);
            monitor.value = firstNumber;
            updateMonitor();
        }
    }
    if (operator !== "" && secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
        monitor.value = `${firstNumber} ${operator} ${secondNumber}`;
        updateMonitor();
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
                updateMonitor();
            }
        }
        if (operator !== "" && secondNumber.length < 16) {
            if (secondNumber === "0") {
                secondNumber = secondNumber.slice(1); 
            }
            secondNumber += num;
            monitor.value = `${firstNumber} ${operator} ${secondNumber}`;
            updateMonitor();
        }
    } else if (['+', '-', '*', '/'].includes(key)) {
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
            operate();
            lastOperation = "";
            lastNumber = "";
            operator = key;
            monitor.value = `${firstNumber} ${operator}`;
            updateMonitor();
        } else if (firstNumber !== "") {
            operator = key;
            lastOperation = "";
            lastNumber = "";
            monitor.value = `${firstNumber} ${operator}`;
            updateMonitor();
        }
    } else if (key === '.') {
        if (operator === '') {
            if (!firstNumber.includes('.') && firstNumber !== "") {
                firstNumber += '.';
                monitor.value = firstNumber;
                updateMonitor();
            }
        } else {
            if (!secondNumber.includes('.') && secondNumber !== "") {
                secondNumber += '.';
                monitor.value = `${firstNumber} ${operator} ${secondNumber}`;
                updateMonitor();
            }
        }
    } else if (key === 'Enter') {
        if (lastOperation !== "") {
            secondNumber = lastNumber;
            firstNumber = monitor.value;
            operator = lastOperation;
            operate();
        } else {
            operate();
        }
        updateMonitor();
    } else if (key === 'Backspace') {
        if (!resultCalculated) {
            if (operator === "" && firstNumber !== "") {
                firstNumber = firstNumber.slice(0, -1);
                monitor.value = firstNumber;
                updateMonitor();
            }
        }
        if (operator !== "" && secondNumber !== "") {
            secondNumber = secondNumber.slice(0, -1);
            monitor.value = `${firstNumber} ${operator} ${secondNumber}`;
            updateMonitor();
        }
    }
});
