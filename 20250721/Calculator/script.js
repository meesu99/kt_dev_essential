let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    if (operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = operator;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('0으로 나눌 수 없습니다!');
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    shouldResetScreen = false;
    updateDisplay();
}

function deleteLast() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

// 키보드 지원
document.addEventListener('keydown', (event) => {
    // 기본 동작 방지 (페이지 스크롤 등)
    if (['Enter', '=', 'Escape', 'Backspace', '+', '-', '*', '/', '%', '.'].includes(event.key) || 
        (event.key >= '0' && event.key <= '9')) {
        event.preventDefault();
    }
    
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        appendNumber(event.key);
    } else if (event.key === '+' || event.key === '-') {
        appendOperator(event.key);
    } else if (event.key === '*') {
        appendOperator('×');
    } else if (event.key === '/') {
        appendOperator('÷');
    } else if (event.key === '%') {
        appendOperator('%');
    } else if (event.key === 'Enter' || event.key === '=') {
        // 연산이 설정되어 있고 현재 피연산자가 있을 때만 계산
        if (operation && currentOperand !== '' && previousOperand !== '') {
            calculate();
        }
    } else if (event.key === 'Escape') {
        clearAll();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
});

// 초기 디스플레이 업데이트
updateDisplay(); 