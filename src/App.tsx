import React, { useReducer } from "react";
import "./App.css";
import { initialState, reducer } from "./reducer";
import Button from "./components/Button";
import PlayerImage from "./components/PlayerImage";
import HealthBar from "./components/HealthBar";
import Dice from "./components/Dice";
import Message from "./components/Message";
import "./tailwind.output.css";

type PlayerSideProps = {
  dices: number[];
  health: number;
  gameLost: () => void;
};

function PlayerSide({ dices, health, gameLost }: PlayerSideProps) {
  return (
    <section>
      <div>
        <PlayerImage />
        <HealthBar health={health} x={gameLost} />
        <Dice value={dices[0]} />
        <Dice value={dices[1]} />
      </div>
      <div>Player</div>
    </section>
  );
}

type MonsterSideProps = {
  dices: number[];
  health: number;
  gameWon: () => void;
};

function MonsterSide({ dices, health, gameWon }: MonsterSideProps) {
  return (
    <section>
      <div>
        <Dice value={dices[0]} />
        <Dice value={dices[1]} />
        <HealthBar health={health} x={gameWon} />
        <PlayerImage />
      </div>
      <div>Monster</div>
    </section>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function gameLost() {
    dispatch({ type: "lost" });
  }

  function gameWon() {
    dispatch({ type: "won" });
  }

  function attack() {
    const interval = setInterval(() => {
      dispatch({ type: "roll" });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      dispatch({ type: "attack" });
    }, 1000);
  }

  function resetGame() {
    dispatch({ type: "reset" });
  }

  return (
    <main>
      <h1>Battle Simulator</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PlayerSide
          dices={state.playerDices}
          health={state.playerHealth}
          gameLost={gameLost}
        />
        <Message text={state.message} />
        <MonsterSide
          dices={state.monsterDices}
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
    </main>
  );
}

export default App;
