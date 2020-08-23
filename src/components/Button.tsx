import React from "react";

type Props = {
  text: string;
  color?: string;
  onClick: () => void;
};

function Button({
  text,
  color = "bg-blue-600 hover:bg-blue-800",
  onClick,
}: Props) {
  return (
    <div
      className={`${color} w-40 self-center py-2 rounded cursor-pointer select-none text-white text-center text-lg`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default Button;
