import React from "react";

type Props = {
  text: string;
};

function Message({ text }: Props) {
  return <div>{text}</div>;
}

export default Message;
