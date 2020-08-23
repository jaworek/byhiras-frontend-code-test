function throwDice() {
  return Math.round(Math.random() * 5) + 1;
}

function sumDices(dices: number[]) {
  return dices.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
}

export { throwDice, sumDices };
