import React, { useReducer } from "react";
import "./App.css";
import { initialState, reducer } from "./reducer";
import Button from "./components/Button";
import PlayerImage from "./components/PlayerImage";
import HealthBar from "./components/HealthBar";
import Dice from "./components/Dice";
import Message from "./components/Message";

type PlayerSideProps = {
  dice1: number;
  dice2: number;
  health: number;
  gameLost: () => void;
};

function PlayerSide({ dice1, dice2, health, gameLost }: PlayerSideProps) {
  return (
    <div>
      <div>
        <PlayerImage />
        <HealthBar health={health} x={gameLost} />
        <Dice value={dice1} />
        <Dice value={dice2} />
      </div>
      <div>Player</div>
    </div>
  );
}

type MonsterSideProps = {
  dice1: number;
  dice2: number;
  health: number;
  gameWon: () => void;
};

function MonsterSide({ dice1, dice2, health, gameWon }: MonsterSideProps) {
  return (
    <div>
      <div>
        <Dice value={dice1} />
        <Dice value={dice2} />
        <HealthBar health={health} x={gameWon} />
        <PlayerImage />
      </div>
      <div>Monster</div>
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function gameLost() {
    return dispatch({ type: "lost" });
  }

  function gameWon() {
    return dispatch({ type: "won" });
  }

  function attack() {
    return dispatch({ type: "attack" });
  }

  function resetGame() {
    return dispatch({ type: "reset" });
  }

  return (
    <div>
      <div>Battle Simulator</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PlayerSide
          dice1={state.playerDices[0]}
          dice2={state.playerDices[1]}
          health={state.playerHealth}
          gameLost={gameLost}
        />
        <Message text={state.message} />
        <MonsterSide
          dice1={state.monsterDices[0]}
          dice2={state.monsterDices[1]}
          health={state.monsterHealth}
          gameWon={gameWon}
        />
      </div>
      {state.gameState === "start" ? (
        <Button text="Start" onClick={attack} />
      ) : null}
      {state.gameState === "lost" || state.gameState === "won" ? (
        <Button text="Retry?" color="yellow" onClick={resetGame} />
      ) : null}
      {state.gameState === "running" ? (
        <Button text="Attack!" color="red" onClick={attack} />
      ) : null}
      {state.gameState === "rolling" ? (
        <Button text="Rolling..." color="grey" onClick={() => {}} />
      ) : null}
    </div>
  );
}

export default App;
