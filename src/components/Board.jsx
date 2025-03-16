import React, { useEffect, useState } from "react";
import Card from "./Card";
import Result from "./Result";
import { RiCloseCircleFill } from "react-icons/ri";

export default function Board() {
  const flip = new Audio("flipcard.mp3");
  const error = new Audio("error.mp3");
  const success = new Audio("sucess.mp3");
  const click = new Audio("click.mp3");
  const emojis = ["🐦", "🦅", "🦆", "🦉", "🐧", "🦢", "🦜", "🦩"];
  const [cards, setCards] = useState(
    [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ card: card, flipped: false, matched: false }))
  );
  const [flippedCards, setFlippedCards] = useState([]);
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [time, setTime] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [start, setStart] = useState(false);
  const [ask, setAsk] = useState(false);
  const [ask2, setAsk2] = useState(false);
  const [bestmoves] = useState(() => {
    return localStorage.getItem("moves") || 0;
  });
  const [besttime] = useState(() => {
    return localStorage.getItem("time") || 0;
  });

  const handleFlip = (index) => {
    if (flippedCards.length === 2 || cards[index].flipped) return;
    setCount((pre) => pre + 1);
    if (flippedCards.length < 1) flip.play();
    const newCards = cards.map((card, i) =>
      index === i ? { ...card, flipped: true } : card
    );
    setCards([...newCards]);
    setFlippedCards([...flippedCards, index]);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const isMatch = cards[first].card === cards[second].card;
      !isMatch ? error.play() : success.play();
      isMatch ? setMatches(matches + 1) : null;
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card, i) => {
            if (i === first || i === second) {
              return isMatch
                ? { ...card, matched: true }
                : { ...card, flipped: false };
            }
            return card;
          })
        );
        setFlippedCards([]);
      }, 500);
    }

    if (matches >= emojis.length) {
      setIsRunning(false);
      if ((count < bestmoves && time < besttime) || bestmoves === 0) {
        localStorage.setItem("time", time);
        localStorage.setItem("moves", count);
      }
      setTimeout(() => setCompleted(true), [500]);
    }
  }, [flippedCards]);

  return (
    <div className="flex flex-col bg-[#523935] p-5 rounded-xl gap-4 grid grid-cols-4 grid-rows-5">
      <div className="flex-col rounded-md cursor-pointer w-20 h-20 flex justify-center items-center">
        <p className="font-inter font-bold text-xl text-white">Moves</p>
        <p className="font-inter font-bold text-3xl text-white">{count}</p>
      </div>
      <div className="flex-col rounded-md cursor-pointer w-20 h-20 flex justify-center items-center">
        <p className="font-inter font-bold text-xl text-white">Best</p>
        <p className="font-inter font-bold text-3xl text-white">{bestmoves}</p>
      </div>
      <div className="flex-col rounded-md cursor-pointer w-20 h-20 flex justify-center items-center">
        <p className="font-inter font-bold text-xl text-white">Time</p>
        <p className="font-inter font-bold text-3xl text-white">{time}s</p>
      </div>
      <div className="flex-col rounded-md cursor-pointer w-20 h-20 flex justify-center items-center">
        <p className="font-inter font-bold text-xl text-white">Best</p>
        <p className="font-inter font-bold text-3xl text-white">{besttime}s</p>
      </div>
      {cards.map((card, index) => (
        <Card handleFlip={handleFlip} key={index} index={index} card={card} />
      ))}
      <button
        onClick={() => {
          click.play();
          if (!isRunning) {
            window.location.reload();
            console.log("Completed:", completed);
            return;
          }
          setAsk(true);
          setIsRunning(false);
        }}
        className="transition duration-200 col-span-2 flex-col bg-[#E47F27] hover:bg-red-600 rounded-md cursor-pointer  h-20 flex justify-center items-center"
      >
        <p className="font-inter font-bold text-xl text-white">Retry</p>
      </button>
      <button
        onClick={() => {
          click.play();
          setIsRunning(false);
          setAsk2(true);
        }}
        className="transition duration-200 col-span-2 flex-col bg-[#E47F27] hover:bg-red-600 rounded-md cursor-pointer  h-20 flex justify-center items-center"
      >
        <p className="font-inter font-bold text-xl text-white">Reset Score</p>
      </button>
      {!start && (
        <div className="fixed bg-[rgb(0,0,0,.5)] inset-0  flex items-center justify-center">
          <div className="flex flex-col gap-5 bg-white p-6 rounded-lg shadow-lg w-56">
            <p className="text-center font-inter font-bold text-xl text-black">
              Are You Ready?
            </p>
            <button
              onClick={() => {
                click.play();
                setIsRunning(true);
                setStart(true);
              }}
              className="transition duration-200 bg-[#E47F27] w-full h-15 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              <p className="font-inter font-bold text-xl text-white">Start</p>
            </button>
          </div>
        </div>
      )}
      {ask && (
        <div className="fixed bg-[rgb(0,0,0,.5)]  inset-0  flex items-center justify-center">
          <div className="relative flex flex-col gap-5 bg-white p-6 rounded-lg shadow-lg w-56">
            <div className="absolute top-[-13px] bg-white rounded-full right-[-13px] w-9 h-9">
              <RiCloseCircleFill
                onClick={() => {
                  click.play();
                  setAsk(false);
                  setIsRunning(true);
                }}
                className="transition duration-200 cursor-pointer text-yellow-600 hover:text-red-600 h-full w-full"
              />
            </div>
            <p className="text-center font-inter font-bold text-xl text-black">
              Are You Sure?
            </p>
            <button
              onClick={() => {
                click.play();
                window.location.reload();
              }}
              className="transition duration-200 cursor-pointer bg-[#E47F27] w-full h-15 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              <p className="font-inter font-bold text-xl text-white">Retry</p>
            </button>
          </div>
        </div>
      )}
      {ask2 && (
        <div className="fixed bg-[rgb(0,0,0,.5)]  inset-0  flex items-center justify-center">
          <div className="relative flex flex-col gap-5 bg-white p-6 rounded-lg shadow-lg w-56">
            <div className="absolute top-[-13px] bg-white rounded-full right-[-13px] w-9 h-9">
              <RiCloseCircleFill
                onClick={() => {
                  click.play();
                  setAsk2(false);
                  matches >= emojis.length ? setIsRunning(false) : setIsRunning(true);
                }}
                className="transition duration-200 transition duration-200 cursor-pointer text-yellow-600 hover:text-red-600 h-full w-full"
              />
            </div>
            <p className="text-center font-inter font-bold text-xl text-black">
              Are You Sure?
            </p>
            <button
              onClick={() => {
                click.play();
                localStorage.clear();
                setAsk2(false);
                window.location.reload();
              }}
              className="transition duration-200 cursor-pointer bg-[#E47F27] w-full h-15 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              <p className="font-inter font-bold text-xl text-white">
                Reset Score
              </p>
            </button>
          </div>
        </div>
      )}
      {completed && (
        <Result
          setCompleted={setCompleted}
          result={(count < bestmoves && time < besttime) || bestmoves === 0}
        />
      )}
    </div>
  );
}
