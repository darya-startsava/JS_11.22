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
          throw new Error('TypeError: Division by zero.');
        }
        stack[stack.length - 2] = stack[stack.length - 2] / stack[stack.length - 1];
        stack.pop();
      }
    }
  }
  return stack[0];
}

let currentNumber = '0';
let expression = '';
const currentNumberElement = document.getElementById('current-number');
const expressionElement = document.getElementById('expression');

function enterNumber(number) {
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
  currentNumberElement.innerHTML = currentNumber;
}

function enterOperand(operand) {
  expression += currentNumber + operand;
  expressionElement.innerHTML = expression;
  currentNumber = '0';
  currentNumberElement.innerHTML = currentNumber;
}

function calculate() {
  expression += currentNumber;
  expressionElement.innerHTML = expression;
  currentNumber = '0';
  currentNumberElement.innerHTML = reversePolishNotation(
    toReversePolishNotationExpression(expression)
  );
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
