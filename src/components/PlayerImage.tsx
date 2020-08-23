import React from "react";

type Props = {
  image: string;
};

function PlayerImage({ image }: Props) {
  return (
    <img
      className="flex flex-col w-20 h-30"
      src={image}
      width={180}
      height={360}
      alt="avatar"
    />
  );
}

export default PlayerImage;
