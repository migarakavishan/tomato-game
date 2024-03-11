import React, { useState, useEffect } from "react";
import { FaHeart, FaHome, FaRedo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/index";
import { fetchUsernameFromDatabase } from "../fireebase/firebaseUtils";

function TomatoGame() {
  const { currentUser } = useAuth();
  const [gameImage, setGameImage] = useState("");
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [remainingHearts, setRemainingHearts] = useState(3);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showHighScore, setShowHighScore] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGame();
    fetchUsername();
  }, []);

  useEffect(() => {
    if (remainingHearts === 0 || seconds === 0) {
      setShowGameOver(true);
      if (score > highestScore) {
        setHighestScore(score);
        setShowHighScore(true);
      }
    }
  }, [remainingHearts, seconds]);

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
      setSeconds(30); // Reset timer
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  const fetchUsername = () => {
    if (currentUser) {
      fetchUsernameFromDatabase(currentUser)
        .then((username) => {
          setUsername(username);
        })
        .catch((error) => {
          console.error("Error fetching username:", error);
        });
    }
  };

  const handleNumberClick = (number) => {
    if (number === solution) {
      setIsCorrect(true);
      setScore(score + 1);
      fetchGame();
    } else {
      setIsCorrect(false);
      setRemainingHearts(remainingHearts - 1);
    }
  };

  useEffect(() => {
    if (seconds > 0 && !showGameOver) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds, showGameOver]);

  const handleRestart = () => {
    setShowGameOver(false);
    setShowHighScore(false);
    setSeconds(30);
    setRemainingHearts(3);
    setScore(0);
    fetchGame();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="box-content border-blue-200 h-5/6 w-4/6 p-4 border-8 flex justify-center bg-slate-700">
        <div className="flex flex-col justify-center items-center ">
          {!isLoading && !showGameOver && !showHighScore && (
            <>
              <div className="text-white mb-4 text-2xl">
                <p>Welcome, {username || "Guest"}</p>{" "}
                {/* Display current user's username */}
              </div>
              <div className="flex flex-row space-x-52">
                <div className="text-white mb-4 ">
                  <p>Score: {score}</p>
                  <p>Highest Score: {highestScore}</p>
                </div>
                <div className="flex flex-row space-x-2 text-red-600">
                  {[...Array(remainingHearts)].map((_, index) => (
                    <FaHeart key={index} />
                  ))}
                </div>
                <div className="text-4xl font-semibold text-white">
                  {seconds}
                </div>
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
          {isLoading && !showGameOver && !showHighScore && (
            <p className="text-4xl text-white">Loading...</p>
          )}
          {showGameOver && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg text-center">
                <p className="text-4xl text-black">Game Over</p>
                <p className="text-2xl text-black">Your Score: {score}</p>
                <div className="flex justify-center items-center">
                  <button
                    className="mt-4 mr-4 py-2 px-4 rounded-full bg-white text-slate-700 border-4 border-teal-950 font-bold text-2xl cursor-pointer hover:bg-teal-950 hover:text-white hover:border-teal-600"
                    onClick={handleRestart}
                  >
                    <FaRedo className="mr-2" />
                  </button>
                  <button
                    className="mt-4 py-2 px-4 rounded-full bg-white text-slate-700 border-4 border-teal-950 font-bold text-2xl cursor-pointer hover:bg-teal-950 hover:text-white hover:border-teal-600"
                    onClick={() => navigate("/home")}
                  >
                    <FaHome className="mr-2" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {showHighScore && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg text-center">
                <p className="text-4xl text-black">Congratulations!</p>
                <p className="text-2xl text-black">
                  You got a new highest score: {score}
                </p>
                <div className="flex justify-center space-x-5">
                  <button
                    className="mt-4 py-2 px-4 rounded-full bg-white text-slate-700 border-4 border-teal-950 font-bold text-2xl cursor-pointer hover:bg-teal-950 hover:text-white hover:border-teal-600"
                    onClick={handleRestart}
                  >
                    <FaRedo className="mr-2" />
                  </button>
                  <button
                    className="mt-4 py-2 px-4 rounded-full bg-white text-slate-700 border-4 border-teal-950 font-bold text-2xl cursor-pointer hover:bg-teal-950 hover:text-white hover:border-teal-600"
                    onClick={() => navigate("/home")}
                  >
                    <FaHome className="mr-2" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TomatoGame;
