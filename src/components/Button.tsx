import React from "react";

type Props = {
  text: string;
  color?: string;
  onClick: () => void;
};

function Button({ text, color = "blue", onClick }: Props) {
  return (
    <div style={{ backgroundColor: color }} onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;
