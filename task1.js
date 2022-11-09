Array.prototype.customFilter = function (func, obj) {
  const boundFunc = func.bind(obj);
  const filteredArray = [];
  for (let i = 0; i < this.length; i++) {
    if (boundFunc(this[i], i, this)) {
      filteredArray.push(this[i]);
    }
  }
  return filteredArray;
};
