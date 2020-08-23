import React, { useEffect, useReducer } from "react";
import "./App.css";
import { initialState, reducer } from "./reducer";
import Button from "./components/Button";
import PlayerImage from "./components/PlayerImage";
import HealthBar from "./components/HealthBar";
import Dice from "./components/Dice";
import Message from "./components/Message";
import "./tailwind.output.css";
import warriorApu from "./images/warrior-apu.png";

type PlayerSideProps = {
  className?: string;
  image: string;
  dices: number[];
  health: number;
  playerName: string;
  resolveGame: () => void;
};

function PlayerSide({
  className,
  playerName,
  image,
  dices,
  health,
  resolveGame,
}: PlayerSideProps) {
  return (
    <section className={`flex space-x-4 ${className}`}>
      <div>
        <PlayerImage image={image} />
        <div>{playerName}</div>
      </div>
      <HealthBar health={health} resolveGame={resolveGame} />
      <div className="space-y-4">
        <Dice value={dices[0]} />
        <Dice value={dices[1]} />
      </div>
    </section>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.playerHealth <= 0) {
      return gameLost();
    }

    if (state.monsterHealth <= 0) {
      return gameWon();
    }
  }, [state.playerHealth, state.monsterHealth]);

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
    <main className="flex flex-1 flex-col space-y-8 p-4">
      <h1 className="text-5xl text-center">
        <span role="img" aria-label="swords-emoji">
          ⚔️
        </span>
        <span> Battle Simulator </span>
        <span role="img" aria-label="swords-emoji">
          ⚔️
        </span>
      </h1>
      <div className="flex flex-1 justify-between items-center">
        <PlayerSide
          dices={state.playerDices}
          health={state.playerHealth}
          image={warriorApu}
          resolveGame={gameLost}
          playerName="Player"
        />
        <Message text={state.message} />
        <PlayerSide
          className="flex-row-reverse"
          dices={state.monsterDices}
          health={state.monsterHealth}
          image={warriorApu}
          resolveGame={gameWon}
          playerName="Monster"
        />
      </div>
      {state.gameState === "start" ? (
        <Button text="Start" onClick={attack} />
      ) : null}
      {state.gameState === "lost" || state.gameState === "won" ? (
        <Button
          text="Retry?"
          color="bg-yellow-600 hover:bg-yellow-800"
          onClick={resetGame}
        />
      ) : null}
      {state.gameState === "running" ? (
        <Button
          text="Attack!"
          color="bg-red-600 hover:bg-red-800"
          onClick={attack}
        />
      ) : null}
      {state.gameState === "rolling" ? (
        <Button text="Rolling..." color="bg-gray-600" />
      ) : null}
    </main>
  );
}

export default App;
