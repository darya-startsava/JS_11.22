function createDebounceFunction(func, delay) {
  let timeoutID;
  return function () {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(func, delay);
  };
}
