function getPositiveNumber(numberToCompare = 0) {
  const ITEM = prompt('Enter a positive number');
  const NUMBER = Number(ITEM);
  if (!isNaN(ITEM) && ITEM !== null && NUMBER > numberToCompare) {
    return NUMBER;
  } else {
    numberToCompare ? alert(`Please enter a number greater than ${numberToCompare}`) : alert('Please enter only positive numbers');
    return getPositiveNumber(numberToCompare);
  }
}

function getRandomIntInclusive(min, max) {
  const MIN = Math.ceil(min);
  const MAX = Math.floor(max);
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
}

function guessNumber(numberToGuess) {
  let counter = 0;
  let previousdifference;
  function tryToGuess() {
    counter++;
    const GUESS = getPositiveNumber();
    if (GUESS === numberToGuess && counter === 1) {
      alert('Great! It’s like you knew the number');
    } else if (GUESS === numberToGuess && counter !== 1) {
      alert(`You did it in ${counter} attempts. Congratulations!`);
    } else if (GUESS === numberToGuess + 1 || GUESS === numberToGuess - 1) {
      alert('You’re almost there');
      previousDifference = Math.abs(numberToGuess - GUESS);
      return tryToGuess();
    } else if (GUESS !== numberToGuess && counter === 1) {
      alert('Cold');
      previousDifference = Math.abs(numberToGuess - GUESS);
      return tryToGuess();
    } else if (GUESS !== numberToGuess && counter !== 1) {
      previousDifference < Math.abs(numberToGuess - GUESS) ? alert('Colder') : alert('Warmer');
      previousDifference = Math.abs(numberToGuess - GUESS);
      return tryToGuess();
    }
  }
  tryToGuess();
}

const FIRST_NUMBER = getPositiveNumber();
const NUMBER_TO_COMPARE = FIRST_NUMBER + 100;
const SECOND_NUMBER = getPositiveNumber(NUMBER_TO_COMPARE);
const RANDOM_NUMBER = getRandomIntInclusive(FIRST_NUMBER, SECOND_NUMBER);

guessNumber(RANDOM_NUMBER);
