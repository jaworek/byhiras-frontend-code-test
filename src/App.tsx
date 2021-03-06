import React, { useEffect, useReducer } from "react";
import { GameState, initialState, gameReducer } from "./reducers/game-reducer";
import Button from "./components/Button";
import "./tailwind.output.css";
import warriorApu from "./images/warrior-apu.png";
import cheems from "./images/cheems.jpg";
import PlayerSide from "./components/PlayerSide";
import History from "./components/History";

function messageColor(status: GameState) {
  if (status === "won") {
    return "text-green-600";
  }

  if (status === "lost") {
    return "text-red-600";
  }

  return "";
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

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
      <section className="flex flex-1 justify-around items-center">
        <PlayerSide
          dice={state.playerDice}
          health={state.playerHealth}
          image={warriorApu}
          resolveGame={gameLost}
          playerName="Player"
        />
        <div
          className={`text-3xl text-center w-64 ${messageColor(
            state.gameState
          )}`}
        >
          {state.message}
        </div>
        <PlayerSide
          className="flex-row-reverse"
          dice={state.monsterDice}
          health={state.monsterHealth}
          image={cheems}
          resolveGame={gameWon}
          playerName="Monster"
        />
      </section>
      <History history={state.history} />
      <div className="flex justify-center">
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
      </div>
    </main>
  );
}

export default App;
