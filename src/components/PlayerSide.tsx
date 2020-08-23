import PlayerImage from "./PlayerImage";
import HealthBar from "./HealthBar";
import Dice from "./Dice";
import React from "react";

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

export default PlayerSide;
