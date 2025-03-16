import React from "react";
import Board from "./components/Board";

export default function App() {
  return (
    <div className={`w-screen bg-[url(bg.jpeg)] bg-cover bg-content h-screen flex-col flex justify-center items-center`}>
      <Board />
    </div>
  );
}
