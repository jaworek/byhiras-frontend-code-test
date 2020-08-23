import React from "react";

type Props = {
  text: string;
};

function Message({ text }: Props) {
  return <div className="text-3xl">{text}</div>;
}

export default Message;
