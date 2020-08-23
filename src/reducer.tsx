import { sumDices, throwDice } from "./utils/dice";

type State = {
  gameState: "start" | "running" | "rolling" | "won" | "lost";
  message: string;
  playerHealth: number;
  playerDice: number[];
  monsterHealth: number;
  monsterDice: number[];
  history: string[];
};

const initialState: State = {
  gameState: "start",
  message: "Welcome!",
  playerHealth: 100,
  playerDice: [0, 0],
  monsterHealth: 100,
  monsterDice: [0, 0],
  history: [],
};

function roll(state: State): State {
  const playerDice = [throwDice(), throwDice()];
  const monsterDice = [throwDice(), throwDice()];

  return { ...state, gameState: "rolling", monsterDice, playerDice };
}

function attack(state: State): State {
  const playerDiceSum = sumDices(state.playerDice);
  const monsterDiceSum = sumDices(state.monsterDice);

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
      history: [...state.history, `Player hit for ${damage} damage`],
    };
  }

  if (playerDiceSum < monsterDiceSum) {
    const damage = monsterDiceSum - playerDiceSum;

    return {
      ...newState,
      message: "Ouch!",
      playerHealth: state.playerHealth - damage,
      history: [...state.history, `Monster hit for ${damage} damage`],
    };
  }

  return {
    ...newState,
    message: "Draw",
    history: [...state.history, `Draw`],
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
      return { ...state, message: "You Win! 🎉", gameState: "won" };
    case "lost":
      return { ...state, message: "Game Over 😭", gameState: "lost" };
    case "reset":
      return initialState;
    default:
      throw new Error(`This action does not exist: ${action}`);
  }
}

export { initialState, reducer };
