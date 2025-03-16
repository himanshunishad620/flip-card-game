import React from "react";
import Board from "./components/Board";
// import bg from "./assets/bg.jpeg"
export default function App() {
  // console.log(bg)
  return (
    <div className={`w-screen bg-[url('/bg.jpeg')] bg-cover bg-content h-screen flex-col flex justify-center items-center`}>
      <Board />
    </div>
  );
}
