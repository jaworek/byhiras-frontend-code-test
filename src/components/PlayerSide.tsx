import PlayerImage from "./PlayerImage";
import HealthBar from "./HealthBar";
import Dice from "./Dice";
import React from "react";

type PlayerSideProps = {
  className?: string;
  image: string;
  dice: number[];
  health: number;
  playerName: string;
  resolveGame: () => void;
};

function PlayerSide({
  className,
  playerName,
  image,
  dice,
  health,
  resolveGame,
}: PlayerSideProps) {
  return (
    <div className={`flex space-x-4 items-center ${className}`}>
      <div className="flex flex-col">
        <div className="flex-1">
          <PlayerImage image={image} />
        </div>
        <div className="text-center text-lg">{playerName}</div>
      </div>
      <HealthBar health={health} resolveGame={resolveGame} />
      <div className="space-y-4">
        <Dice value={dice[0]} />
        <Dice value={dice[1]} />
      </div>
    </div>
  );
}

export default PlayerSide;
