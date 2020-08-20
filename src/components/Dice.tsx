import React from "react";

type Props = {
  value: number;
};

function Dice({ value }: Props) {
  return <div>{value}</div>;
}

export default Dice;
