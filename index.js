let currentNumber = '0';
let expression = '';
let lastEnteredSymbol = '';
const OPERANDS = '+-/*()';
const NUMBERS = '0123456789.';
const currentNumberElement = document.getElementById('current-number');
const expressionElement = document.getElementById('expression');
let isError = false;

function toReversePolishNotationExpression(string) {
  const arr = string.split(/\s/).filter((i) => i && i !== ' ');

  const priority = { '+': 1, '-': 1, '*': 2, '/': 2, '(': 0 };
  const stack = [];
  const expression = [];
  arr.reverse();
  let item;
  let itemStack;
  while (arr.length > 0) {
    item = arr.pop();
    if (parseFloat(item) || item === '0') {
      expression.push(item);
    } else {
      if (item === '(') {
        stack.push(item);
      } else if (item === ')') {
        itemStack = stack.pop();
        while (itemStack !== '(') {
          expression.push(itemStack);
          itemStack = stack.pop();
        }
      } else {
        while (priority[item] <= priority[stack[stack.length - 1]]) {
          expression.push(stack.pop());
        }
        stack.push(item);
      }
    }
  }
  while (stack.length != 0) {
    expression.push(stack.pop());
  }
  return expression.join(' ');
}

function reversePolishNotation(expression) {
  const stack = [];
  expression = expression.split(' ').reverse();
  let item;
  while (expression.length > 0) {
    item = expression.pop();
    const val = parseFloat(item);
    if (val || val === 0) {
      stack.push(val);
    } else {
      if (item === '+') {
        stack[stack.length - 2] = stack[stack.length - 2] + stack[stack.length - 1];
        stack.pop();
      } else if (item === '-') {
        stack[stack.length - 2] = stack[stack.length - 2] - stack[stack.length - 1];
        stack.pop();
      } else if (item === '*') {
        stack[stack.length - 2] = stack[stack.length - 2] * stack[stack.length - 1];
        stack.pop();
      } else if (item === '/') {
        if (stack[stack.length - 1] === 0) {
          reset();
          expressionElement.innerHTML = 'Error: division by zero';
          isError = true;
          return;
        }
        stack[stack.length - 2] = stack[stack.length - 2] / stack[stack.length - 1];
        stack.pop();
      }
    }
  }
  return +(Math.round(stack[0] + 'e+8') + 'e-8');
}

function enterNumber(number) {
  if (currentNumber.length > 20) {
    return;
  }
  if (lastEnteredSymbol === '=') {
    currentNumber = '0';
    expression = '';
  }
  if (currentNumber === '0') {
    if (number === '.') {
      currentNumber += number;
    } else if (number !== '0' && number !== '00') {
      currentNumber = number;
    }
  } else {
    if (number === '.' && currentNumber.includes('.')) {
      return;
    }
    currentNumber = currentNumber + number;
  }
  lastEnteredSymbol = number === '00' ? '0' : number;
  currentNumberElement.innerHTML = currentNumber;
}

function enterOperand(operand) {
  if (!lastEnteredSymbol) {
    expression = '0' + operand;
    expressionElement.innerHTML = expression;
  }
  if (OPERANDS.includes(lastEnteredSymbol.trim())) {
    expression = expression.slice(0, expression.length - 3) + operand;
  } else if (lastEnteredSymbol === '=') {
    expression += operand;
  } else {
    expression += currentNumber + operand;
    currentNumber = '0';
    currentNumberElement.innerHTML = currentNumber;
  }
  expressionElement.innerHTML = expression;
  lastEnteredSymbol = operand;
}

function calculate() {
  if (NUMBERS.includes(lastEnteredSymbol.trim())) {
    expression += currentNumber;
  }
  if (lastEnteredSymbol === '=') {
    return;
  }
  if (OPERANDS.includes(lastEnteredSymbol.trim())) {
    expression += '0';
  }

  expression =
    reversePolishNotation(
      toReversePolishNotationExpression(expression)
    )?.toString() ?? '';
  currentNumber = '0';
  currentNumberElement.innerHTML = currentNumber;
  if (isError) {
    isError = false;
  } else {
    expressionElement.innerHTML = expression;
  }
  lastEnteredSymbol = '=';
}

function reset() {
  lastEnteredSymbol = '';
  currentNumber = '0';
  currentNumberElement.innerHTML = currentNumber;
  expression = '';
  expressionElement.innerHTML = expression;
}

function deleteNumber() {
  if (!NUMBERS.includes(lastEnteredSymbol.trim()) || currentNumber === '0') {
    return;
  }
  currentNumber = currentNumber.slice(0, currentNumber.length - 1) || '0';
  currentNumberElement.innerHTML = currentNumber;
  lastEnteredSymbol =
    currentNumber !== '0'
      ? currentNumber.slice(currentNumber.length - 1)
      : expression.slice(expression.length - 3);
}

function toggleUnaryMinus() {
  if (currentNumber !== '0') {
    currentNumber = String(0 - Number(currentNumber));
    currentNumberElement.innerHTML = currentNumber;
  }
}

const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const zero = document.getElementById('zero');
const doubleZero = document.getElementById('double-zero');
const point = document.getElementById('point');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const openBracket = document.getElementById('open-bracket');
const closeBracket = document.getElementById('close-bracket');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const unaryMinus = document.getElementById('unary-minus');
const equals = document.getElementById('equals');

one.addEventListener('click', () => enterNumber('1'));
two.addEventListener('click', () => enterNumber('2'));
three.addEventListener('click', () => enterNumber('3'));
four.addEventListener('click', () => enterNumber('4'));
five.addEventListener('click', () => enterNumber('5'));
six.addEventListener('click', () => enterNumber('6'));
seven.addEventListener('click', () => enterNumber('7'));
eight.addEventListener('click', () => enterNumber('8'));
nine.addEventListener('click', () => enterNumber('9'));
zero.addEventListener('click', () => enterNumber('0'));
doubleZero.addEventListener('click', () => enterNumber('00'));
point.addEventListener('click', () => enterNumber('.'));
plus.addEventListener('click', () => enterOperand(' + '));
minus.addEventListener('click', () => enterOperand(' - '));
multiply.addEventListener('click', () => enterOperand(' * '));
divide.addEventListener('click', () => enterOperand(' / '));
equals.addEventListener('click', () => calculate());
clear.addEventListener('click', () => reset());
del.addEventListener('click', () => deleteNumber());
unaryMinus.addEventListener('click', () => toggleUnaryMinus());
