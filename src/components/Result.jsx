export default function Result({ result, setCompleted }) {
  const won = new Audio("won.mp3");
  const loss = new Audio("loss.mp3");
  const click = new Audio("click.mp3");
  result ? won.play() : loss.play();
  return result ? (
    <div className="fixed bg-[rgb(0,0,0,.5)] inset-0  flex items-center justify-center">
      <div className="flex flex-col gap-5 bg-white p-6 rounded-lg shadow-lg w-56">
        <p className="text-center font-inter font-bold text-xl text-black">
          High Score
        </p>
        <button
          onClick={() => {
            click.play();
            setCompleted(false);
          }}
          className="bg-[#E47F27] w-full h-15 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <p className="font-inter font-bold text-xl text-white">Next</p>
        </button>
      </div>
    </div>
  ) : (
    <div className="fixed bg-[rgb(0,0,0,.5)] inset-0  flex items-center justify-center">
      <div className="flex flex-col gap-5 bg-white p-6 rounded-lg shadow-lg w-56">
        <p className="text-center font-inter font-bold text-xl text-black">
          Try Again!
        </p>
        <button
          onClick={() => {
            click.play();
            setCompleted(false);
          }}
          className="transition duration-200 bg-[#E47F27] w-full h-15 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <p className="font-inter font-bold text-xl text-white">Next</p>
        </button>
      </div>
    </div>
  );
}
