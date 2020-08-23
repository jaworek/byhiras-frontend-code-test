import { sumDices, throwDice } from "./utils/dice";

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

function roll(state: State): State {
  const playerDices = [throwDice(), throwDice()];
  const monsterDices = [throwDice(), throwDice()];

  return { ...state, gameState: "rolling", monsterDices, playerDices };
}

function attack(state: State): State {
  const playerDiceSum = sumDices(state.playerDices);
  const monsterDiceSum = sumDices(state.monsterDices);

  const newState: State = {
    ...state,
    gameState: "running",
  };

  if (playerDiceSum > monsterDiceSum) {
    const damage = playerDiceSum - monsterDiceSum;

    return {
      ...newState,
      message: "Yay!",
      monsterHealth: state.monsterHealth - damage,
    };
  }

  if (playerDiceSum < monsterDiceSum) {
    const damage = monsterDiceSum - playerDiceSum;

    return {
      ...newState,
      message: "Ouch!",
      playerHealth: state.playerHealth - damage,
    };
  }

  return {
    ...newState,
    message: "Draw",
  };
}

type Action =
  | { type: "roll" }
  | { type: "attack" }
  | { type: "won" }
  | { type: "lost" }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "roll":
      return roll(state);
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
