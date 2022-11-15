function checkIterability(iterable) {
  if (
    iterable === null ||
    iterable === undefined ||
    typeof iterable[Symbol.iterator] !== 'function'
  ) {
    throw new Error('Not iterable');
  }
}

class Stack {
  constructor(maxSize = 10) {
    if (
      typeof maxSize !== 'number' ||
      !isFinite(maxSize) ||
      isNaN(maxSize) ||
      maxSize <= 0
    ) {
      throw new Error('Invalid limit value');
    }
    this.maxSize = maxSize;
    this.size = 0;
    this.value;
    this.prevElement;
  }

  push(elem) {
    if (this.size === this.maxSize) {
      throw new Error('Limit exceeded');
    }

    if (this.size > 0) {
      this.prevElement = { value: this.value, prevElement: this.prevElement };
    }
    this.value = elem;
    this.size++;
  }

  pop() {
    if (this.size === 0) {
      throw new Error('Empty stack');
    }
    const elem = this.value;
    this.size--;
    this.value = this.prevElement?.value;
    this.prevElement = this.prevElement?.prevElement;
    return elem;
  }

  peek() {
    if (this.size === 0) {
      return null;
    }
    return this.value;
  }

  isEmpty() {
    if (this.size === 0) {
      return true;
    }
    return false;
  }

  toArray() {
    const array = [];
    let elem = this;
    for (let i = this.size; i !== 0; i--) {
      array.push(elem.value);
      elem = elem.prevElement;
    }
    return array;
  }

  static fromIterable(iterable) {
    checkIterability(iterable);
    const stack = new Stack();
    for (const item of iterable) {
      stack.maxSize++;
      stack.push(item);
    }
    stack.maxSize = stack.size;
    return stack;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  append(elem) {
    const newNode = { value: elem, next: null };
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let lastNode = this.head;
    while (lastNode.next) {
      lastNode = lastNode.next;
    }
    lastNode.next = newNode;
  }

  prepend(elem) {
    const prevNode = { value: elem, next: this.head };
    this.head = prevNode;
  }

  find(elem) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === elem) {
        return elem;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  toArray() {
    const array = [];
    let currentNode = this.head;
    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }

  static fromIterable(iterable) {
    checkIterability(iterable);
    const linkedList = new LinkedList();
    for (const item of iterable) {
      linkedList.append(item);
    }
    return linkedList;
  }
}

