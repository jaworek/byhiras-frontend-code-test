import React, { useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import Button from "./components/Button";
import Message from "./components/Message";
import "./tailwind.output.css";
import warriorApu from "./images/warrior-apu.png";
import PlayerSide from "./components/PlayerSide";

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
      <div className="flex flex-1 justify-around items-center">
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
