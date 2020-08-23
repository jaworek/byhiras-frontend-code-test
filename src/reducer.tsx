import { sumDices, throwDice } from "./utils/dice";

type State = {
  gameState: "start" | "running" | "rolling" | "won" | "lost";
  message: string;
  playerState: any;
  monsterState: any;
  playerHealth: number;
  playerDices: number[] | null[];
  monsterHealth: number;
  monsterDices: number[] | null[];
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

function attack(state: State): State {
  const playerDices = [throwDice(), throwDice()];
  const monsterDices = [throwDice(), throwDice()];

  const playerDiceSum = sumDices(playerDices);
  const monsterDiceSum = sumDices(monsterDices);

  const newState: State = {
    ...state,
    playerDices,
    monsterDices,
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
  | { type: "rolling" }
  | { type: "attack" }
  | { type: "won" }
  | { type: "lost" }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "rolling":
      return {
        ...state,
        gameState: "rolling",
        playerDices: [null, null],
        monsterDices: [null, null],
      };
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
