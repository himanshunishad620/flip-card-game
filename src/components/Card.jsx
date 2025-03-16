
export default function Card({ handleFlip, index, card }) {
  return (
    <div
      onClick={() => handleFlip(index)}
      className={`${
        card.matched ? "bg-[#F7D409] " : "bg-white"
      } hover:${!card.matched?"bg-gray-300":null}  transition duration-200 rounded-md cursor-pointer w-20 h-20 flex justify-center items-center `}
    >
      <p className="text-4xl">
        {card.matched || card.flipped ? card.card : "❓"}
      </p>
    </div>
  );
}
