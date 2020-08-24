function throwDice() {
  return Math.round(Math.random() * 5) + 1;
}

function sumDice(dice: number[]) {
  return dice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
}

export { throwDice, sumDice };
