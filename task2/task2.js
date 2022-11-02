const FIRST_ITEM = prompt('Enter no more than 3 symbols');

if (FIRST_ITEM.trim().length > 0 && FIRST_ITEM.trim().length < 4) {
  const SECOND_ITEM = prompt('Enter a number from 0 (not including) to 10');
  const NUMBER = Number(SECOND_ITEM);
  if (!isNaN(SECOND_ITEM) && SECOND_ITEM !== null && NUMBER > 0 && NUMBER <= 10
    && Math.round(NUMBER) === NUMBER) {
    const ARR = new Array(NUMBER).fill(FIRST_ITEM.trim());
    let result = '';
    for (let i = 1; i <= NUMBER; i++) {
      result += `${ARR.join(' ')} \n`;
    }
    console.log(result);
  }
  else {
    console.log("Incorrect input!");
  }
} else {
  console.log("Incorrect input!");
}