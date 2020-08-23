import React from "react";

type Props = {
  image: string;
};

function PlayerImage({ image }: Props) {
  return (
    <img
      className="flex flex-col"
      src={image}
      width={350}
      height={350}
      alt="avatar"
    />
  );
}

export default PlayerImage;
