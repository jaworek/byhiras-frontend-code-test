type State = {
  gameState: "start" | "running" | "rolling" | "won" | "lost";
  message: string;
  playerState: any;
  monsterState: any;
  playerHealth: number;
  playerDices: number[];
  monsterHealth: number;
  monsterDices: number[];
};

const initialState: State = {
  gameState: "start",
  message: "Welcome!",
  playerState: "",
  monsterState: "",
  playerHealth: 100,
  playerDices: [0, 0],
  monsterHealth: 100,
  monsterDices: [0, 0],
};

function throwDice() {
  return Math.round(Math.random() * 5) + 1;
}

function sumDices(dices: number[]) {
  return dices.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
}

function attack(state: State): State {
  const playerDices = [throwDice(), throwDice()];
  const monsterDices = [throwDice(), throwDice()];

  const playerDiceSum = sumDices(playerDices);
  const monsterDiceSum = sumDices(monsterDices);

  if (playerDiceSum > monsterDiceSum) {
    const damage = playerDiceSum - monsterDiceSum;

    return {
      ...state,
      playerDices,
      monsterDices,
      gameState: "running",
      message: "Yay!",
      monsterHealth: state.monsterHealth - damage,
    };
  }

  if (playerDiceSum < monsterDiceSum) {
    const damage = monsterDiceSum - playerDiceSum;

    return {
      ...state,
      playerDices,
      monsterDices,
      gameState: "running",
      message: "Ouch!",
      playerHealth: state.playerHealth - damage,
    };
  }

  return {
    ...state,
    playerDices,
    monsterDices,
    gameState: "running",
    message: "Draw",
  };
}

type Action =
  | { type: "rolling" }
  | { type: "attack" }
  | { type: "won" }
  | { type: "lost" }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "rolling":
      return { ...state, gameState: "rolling" };
    case "attack":
      return attack(state);
    case "won":
      return { ...state, message: "You Win", gameState: "won" };
    case "lost":
      return { ...state, message: "Game Over", gameState: "lost" };
    case "reset":
      return initialState;
    default:
      throw new Error(`This action does not exist`);
  }
}

export { initialState, reducer };
