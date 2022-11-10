function createDebounceFunction(func, delay) {
  if (
    typeof func !== 'function' ||
    typeof delay !== 'number' ||
    isNaN(delay) ||
    !isFinite(delay)
  ) {
    throw new Error();
  }
  let timeoutID;
  return function () {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(func, delay);
  };
}
