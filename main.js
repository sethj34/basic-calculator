document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    const MAX_DIGITS = 10;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    display.textContent = formatResult(currentInput);
                    previousInput = '';
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    if (previousInput) {
                        previousInput = evaluate(previousInput, currentInput, operator);
                        display.textContent = formatResult(previousInput);
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                    operator = value;
                }
            } else {
                if (currentInput.length < MAX_DIGITS) {
                    currentInput += value;
                    display.textContent = currentInput;
                }
            }
        });
    });

    function evaluate(num1, num2, operator) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        let result;
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
            default:
                result = '';
        }
        return result.toString();
    }

    function formatResult(result) {
        const [integerPart, decimalPart] = result.split('.');
        if (decimalPart && decimalPart.length > MAX_DIGITS - integerPart.length) {
            return parseFloat(result).toFixed(MAX_DIGITS - integerPart.length);
        }
        return result;
    }
});