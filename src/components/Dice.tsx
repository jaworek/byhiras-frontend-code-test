import React from "react";
import { ReactComponent as Dice1 } from "../images/dice-1.svg";
import { ReactComponent as Dice2 } from "../images/dice-2.svg";
import { ReactComponent as Dice3 } from "../images/dice-3.svg";
import { ReactComponent as Dice4 } from "../images/dice-4.svg";
import { ReactComponent as Dice5 } from "../images/dice-5.svg";
import { ReactComponent as Dice6 } from "../images/dice-6.svg";

// Dice SVGs source:
// https://www.svgrepo.com/collection/casino-gambling-4/

type Props = {
  value: number;
};

function Dice({ value }: Props) {
  let dice;
  switch (value) {
    case 1:
      dice = <Dice1 />;
      break;
    case 2:
      dice = <Dice2 />;
      break;
    case 3:
      dice = <Dice3 />;
      break;
    case 4:
      dice = <Dice4 />;
      break;
    case 5:
      dice = <Dice5 />;
      break;
    case 6:
      dice = <Dice6 />;
      break;
  }

  return <div className="w-20 h-20">{dice}</div>;
}

export default Dice;
