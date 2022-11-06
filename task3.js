function createIterable(from, to) {
  if (
    typeof from !== 'number' ||
    isNaN(from) ||
    typeof to !== 'number' ||
    isNaN(to) ||
    to <= from
  ) {
    throw new Error();
  }
  const obj = {};
  obj[Symbol.iterator] = function* () {
    for (let i = from; i <= to; ++i) yield i;
  };
  return obj;
}
