import React, { useEffect } from "react";

type Props = {
  health: number;
  x: () => void;
};

function HealthBar({ health, x }: Props) {
  useEffect(() => {
    if (health <= 0) {
      x();
    }
  }, [health]);

  return <div>{health}</div>;
}

export default HealthBar;
