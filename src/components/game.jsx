import React, { useState, useEffect } from "react";

function TomatoGame() {
  const [gameImage, setGameImage] = useState("");
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://marcconrad.com/uob/tomato/api.php?out=csv&base64=yes"
      );
      const data = await response.text();
      const [base64Image, solution] = data.split(",");
      setGameImage(base64Image);
      setSolution(parseInt(solution));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  const handleNumberClick = (number) => {
    if (number === solution) {
      setIsCorrect(true);
      setScore(score + 1);
      setHighestScore(Math.max(score + 1, highestScore));
      fetchGame();
    } else {
      setIsCorrect(false);
      setScore(0); // Reset score
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="box-content border-blue-200 h-5/6 w-4/6 p-4 border-8 flex justify-center bg-slate-700">
        <div className="flex flex-col justify-center items-center ">
          {!isLoading && (
            <>
              <div className="text-white mb-4 ">
                <p>Score: {score}</p>
                <p>Highest Score: {highestScore}</p>
              </div>
              <div className="mb-4">
                <img
                  src={`data:image/jpeg;base64,${gameImage}`}
                  alt="Game"
                  className="max-w-full"
                />
              </div>
              <div className="mb-4 flex flex-wrap justify-center">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <button
                    key={number}
                    className="m-2 py-2 px-4 rounded-full bg-white text-slate-700 border-4 border-teal-950 font-bold text-2xl cursor-pointer hover:bg-teal-950 hover:text-white hover:border-teal-600"
                    onClick={() => handleNumberClick(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
              {isCorrect !== null && (
                <p
                  className={`text-center text-${
                    isCorrect ? "green" : "red"
                  }-500`}
                >
                  {isCorrect ? "Correct!" : "Incorrect!"}
                </p>
              )}
            </>
          )}
          {isLoading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default TomatoGame;
