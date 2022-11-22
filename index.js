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

