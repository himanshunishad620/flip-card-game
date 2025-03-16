import { useEffect, useMemo, useState } from "react";
import Box from "./components/Box";

const MemoryGame = () => {
  const generateEmojiArray = () => {
    const emojis = ["🔥", "🚀", "🎸", "🌟", "🎮", "🐱", "🎯", "⚡", "❤️", "🎭"];
    const doubledEmojis = [...emojis, ...emojis];
    return doubledEmojis.map((emoji) => ({emoji, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5); // Shuffle
  }
  const [cards, setCards] = useState(generateEmojiArray());
  const [flippedCards,setFlippedCards]=useState([])
  const handleFlip=(index)=>{
    if (flippedCards.length === 2 || cards[index].flipped) return;
    const newCards=cards.map((card,i)=>(
      i===index?{...card,flipped:true}:card
    ))
    setCards(newCards)
    setFlippedCards([...flippedCards,index])
  }
  console.log(cards)
  useEffect(()=>{
    
    if(flippedCards.length===2)
    {
      const [first,second]=flippedCards
      console.log(cards[first].emoji,cards[second].emoji)
      if(cards[first].emoji===cards[second].emoji){
        console.log("Macthed")
        const newCard=cards.map((card,index)=>(
          index===first || index===second?{...card,matched:true}:card
        ))
        console.log(newCard)
        setCards(newCard)
        
      }
      // setTimeout(()=>{
      //   const newCards=cards.map((card,index)=>(
      //     index===first || index===second?{...card,flipped:false}:card
      //   ))
      //   setCards(newCards)
      // },4000)
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) =>
            i === first || i === second
              ? { ...card, flipped: cards[first].emoji === cards[second].emoji }
              : card
          )
        );
        setFlippedCards([]);
      }, 1000);
    
      setFlippedCards([])
    }
  },[cards,flippedCards])
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center p-6">
      <h1 className="text-2xl font-bold mb-4">🃏 Emoji Memory Game</h1>
      <div className="grid grid-cols-5 gap-4">
        {cards.map((emoji, index) => (
          <Box key={index} handleFlip={handleFlip} index={index} item={emoji} />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
