import React from "react";

type Props = {
  history: string[];
};

function History({ history }: Props) {
  return (
    <section className="flex flex-col items-center">
      <div className="text-2xl">History</div>
      <ul
        className="h-32 w-64 list-decimal overflow-y-scroll overflow-x-auto"
        style={{ listStylePosition: "inside" }}
      >
        {history.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </section>
  );
}

export default History;