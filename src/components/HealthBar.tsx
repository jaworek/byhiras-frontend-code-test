import React, { useEffect } from "react";

type Props = {
  health: number;
  resolveGame: () => void;
};

function HealthBar({ health, resolveGame }: Props) {
  useEffect(() => {
    if (health <= 0) {
      resolveGame();
    }
  }, [health]);

  let barColor = "bg-green-600";
  if (health === 100) {
    barColor = "bg-green-600";
  } else if (health > 90) {
    barColor = "bg-green-500";
  } else if (health > 80) {
    barColor = "bg-green-400";
  } else if (health > 70) {
    barColor = "bg-yellow-400";
  } else if (health > 60) {
    barColor = "bg-yellow-500";
  } else if (health > 50) {
    barColor = "bg-yellow-600";
  } else if (health > 40) {
    barColor = "bg-yellow-700";
  } else if (health > 30) {
    barColor = "bg-red-500";
  } else if (health > 20) {
    barColor = "bg-red-600";
  } else if (health > 10) {
    barColor = "bg-red-700";
  } else if (health > 0) {
    barColor = "bg-red-800";
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-6 h-40 bg-gray-400 flex flex-col justify-end">
        <div
          className={`transition-all duration-500 ease-in-out ${barColor}`}
          style={{ height: `${health > 0 ? health : 0}%` }}
        />
      </div>
      <div className="w-20 text-center">{health}/100</div>
    </div>
  );
}

export default HealthBar;
