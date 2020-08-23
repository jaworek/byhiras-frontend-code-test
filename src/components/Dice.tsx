import React, { useEffect, useState } from "react";
import { throwDice } from "../utils/dice";

type Props = {
  value: number | null;
};

function Dice({ value }: Props) {
  const [randomValue, setValue] = useState(value);

  useEffect(() => {
    if (value === null) {
      const interval = setInterval(() => {
        const y = throwDice();
        setValue(y);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [randomValue, value]);

  return <div>{value === null ? randomValue : value}</div>;
}

export default Dice;
