function selectFromInterval(array, firstNumber, secondNumber) {
  if (!Array.isArray(array) || array.some((item) => typeof item !== 'number' || isNaN(item))) {
    throw new Error();
  }
  if (
    typeof firstNumber !== 'number' ||
    isNaN(firstNumber) ||
    typeof secondNumber !== 'number' ||
    isNaN(secondNumber)
  ) {
    throw new Error();
  }
  const START = Math.min(firstNumber, secondNumber);
  const END = Math.max(firstNumber, secondNumber);
  return array.filter((item) => item >= START && item <= END);
}
