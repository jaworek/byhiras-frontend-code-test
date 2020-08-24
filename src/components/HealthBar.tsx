import React from "react";

type Props = {
  health: number;
  resolveGame: () => void;
};

function getBarColor(health: number) {
  if (health === 100) {
    return "bg-green-600";
  }
  if (health > 90) {
    return "bg-green-500";
  }
  if (health > 80) {
    return "bg-green-400";
  }
  if (health > 70) {
    return "bg-yellow-400";
  }
  if (health > 60) {
    return "bg-yellow-500";
  }
  if (health > 50) {
    return "bg-yellow-600";
  }
  if (health > 40) {
    return "bg-yellow-700";
  }
  if (health > 30) {
    return "bg-red-500";
  }
  if (health > 20) {
    return "bg-red-600";
  }
  if (health > 10) {
    return "bg-red-700";
  }
  if (health > 0) {
    return "bg-red-800";
  }

  return "bg-green-600";
}

function HealthBar({ health }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-6 h-40 bg-gray-400 flex flex-col justify-end">
        <div
          className={`transition-all duration-500 ease-in-out ${getBarColor(
            health
          )}`}
          style={{ height: `${health > 0 ? health : 0}%` }}
        />
      </div>
      <div className="w-20 text-center">{health}/100</div>
    </div>
  );
}

export default HealthBar;
