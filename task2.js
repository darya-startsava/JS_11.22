class Calculator {
  constructor(x, y) {
    if (
      typeof x !== 'number' ||
      isNaN(x) ||
      !isFinite(x) ||
      typeof y !== 'number' ||
      isNaN(y) ||
      !isFinite(y)
    ) {
      throw new Error();
    }
    this.x = x;
    this.y = y;
    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
    this.getSum = this.getSum.bind(this);
    this.getMul = this.getMul.bind(this);
    this.getSub = this.getSub.bind(this);
    this.getDiv = this.getDiv.bind(this);
  }
  setX(value) {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      throw new Error();
    }
    this.x = value;
  }

  setY(value) {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      throw new Error();
    }
    this.y = value;
  }

  getSum() {
    return this.x + this.y;
  }

  getMul() {
    return this.x * this.y;
  }

  getSub() {
    return this.x - this.y;
  }

  getDiv() {
    if (this.y === 0) {
      throw new Error();
    }
    return this.x / this.y;
  }
}
