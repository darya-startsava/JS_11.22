const FIRST_ITEM = prompt('Enter a number');
if (!isNaN(FIRST_ITEM) && FIRST_ITEM !== null && FIRST_ITEM.trim() !== '') {
  const SECOND_ITEM = prompt('Enter a number');
  if (!isNaN(SECOND_ITEM) && SECOND_ITEM !== null && SECOND_ITEM.trim() !== '') {
    const FIRST_NUMBER = Number(FIRST_ITEM);
    const SECOND_NUMBER = Number(SECOND_ITEM);
    console.log(`First number: ${FIRST_NUMBER}.
Second number: ${SECOND_NUMBER}.
Sum: ${FIRST_NUMBER + SECOND_NUMBER}.
Product: ${FIRST_NUMBER * SECOND_NUMBER}.
Power: ${FIRST_NUMBER ** SECOND_NUMBER}.`);
  }
  else {
    console.log("Incorrect input!");
  }
} else {
  console.log("Incorrect input!");
}