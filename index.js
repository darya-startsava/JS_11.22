function checkIterability(iterable) {
  if (
    iterable === null ||
    iterable === undefined ||
    typeof iterable[Symbol.iterator] !== 'function'
  ) {
    throw new Error('Not iterable');
  }
}

function isValidStringWithLengthInterval(string, min = 0, max = Infinity) {
  if (typeof string === 'string' && string.length >= min && string.length <= max) {
    return true;
  }
  return false;
}

function isValidNumberFromInterwal(number, min = 0, max = Infinity) {
  if (
    typeof number !== 'number' ||
    !isFinite(number) ||
    isNaN(number) ||
    number < min ||
    number > max
  ) {
    return false;
  }
  return true;
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
  #head = null;

  append(elem) {
    const newNode = { value: elem, next: null };
    if (!this.#head) {
      this.#head = newNode;
      return;
    }
    let lastNode = this.#head;
    while (lastNode.next) {
      lastNode = lastNode.next;
    }
    lastNode.next = newNode;
  }

  prepend(elem) {
    const prevNode = { value: elem, next: this.#head };
    this.#head = prevNode;
  }

  find(elem) {
    let currentNode = this.#head;
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
    let currentNode = this.#head;
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

class Car {
  #brand = '';
  #model = '';
  #yearOfManufacturing = 1950;
  #maxSpeed = 100;
  #maxFuelVolume = 20;
  #fuelConsumption = 1;
  #damage = 1;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #health = 100;

  get brand() {
    return this.#brand;
  }

  set brand(value) {
    if (isValidStringWithLengthInterval(value, 0, 50)) {
      this.#brand = value;
    } else {
      throw new Error('Invalid brand name');
    }
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    if (isValidStringWithLengthInterval(value, 0, 50)) {
      this.#model = value;
    } else {
      throw new Error('Invalid model name');
    }
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(value) {
    if (isValidNumberFromInterwal(value, 1950, new Date().getFullYear())) {
      this.#yearOfManufacturing = value;
    } else {
      throw new Error('Invalid year of manufacturing');
    }
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(value) {
    if (isValidNumberFromInterwal(value, 100, 300)) {
      this.#maxSpeed = value;
    } else {
      throw new Error('Invalid max speed');
    }
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(value) {
    if (isValidNumberFromInterwal(value, 20, 100)) {
      this.#maxFuelVolume = value;
    } else {
      throw new Error('Invalid max fuel volume');
    }
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(value) {
    if (isValidNumberFromInterwal(value) && value > 0) {
      this.#fuelConsumption = value;
    } else {
      throw new Error('Invalid fuel consumption');
    }
  }

  get damage() {
    return this.#damage;
  }

  set damage(value) {
    if (isValidNumberFromInterwal(value, 1, 5)) {
      this.#damage = value;
    } else {
      throw new Error('Invalid damage');
    }
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  get health() {
    return this.#health;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Car has already started');
    }
    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("Car hasn't started yet");
    }
    this.#isStarted = false;
  }

  fillUpGasTank(fuel) {
    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }
    if (!isValidNumberFromInterwal(fuel) || fuel === 0) {
      throw new Error('Invalid fuel amount');
    }
    if (this.#maxFuelVolume < fuel + this.#currentFuelVolume) {
      throw new Error('Too much fuel');
    }
    this.#currentFuelVolume += fuel;
  }

  drive(speed, time) {
    if (!this.#isStarted) {
      throw new Error('You have to start your car first');
    }
    if (!isValidNumberFromInterwal(speed) || speed === 0) {
      throw new Error('Invalid speed');
    }
    if (!isValidNumberFromInterwal(time) || time === 0) {
      throw new Error('Invalid duration');
    }
    if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast");
    }
    if (this.#currentFuelVolume < (speed * time * this.#fuelConsumption) / 100) {
      throw new Error("You don't have enough fuel");
    }
    if (this.#health < (speed * time * this.#damage) / 100) {
      throw new Error("Your car won't make it");
    }
    this.#currentFuelVolume -= (speed * time * this.#fuelConsumption) / 100;
    this.#health -= (speed * time * this.#damage) / 100;
    this.#mileage += speed * time;
  }

  repair() {
    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }
    if (this.#currentFuelVolume !== this.#maxFuelVolume) {
      throw new Error('You have to fill up your gas tank first');
    }
    this.#health = 100;
  }

  getFullAmount() {
    return this.#maxFuelVolume - this.#currentFuelVolume;
  }
}
