import React from "react";

export default function Box({ index, item, handleFlip }) {
  return (
    <div
      onClick={() => handleFlip(index)}
      className={`w-16 h-16 flex items-center justify-center text-2xl border rounded-lg 
        shadow-md cursor-pointer transition-all
        ${item.matched ? "bg-green-300" : "bg-gray-400"} 
        ${item.flipped ? "bg-white" : "hover:bg-gray-500"}`}
    >
      {item.matched||item.flipped ? item.emoji : "❓"}
    </div>
  );
}
