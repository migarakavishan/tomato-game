import React, { useState, useEffect } from "react";
import { FaHeart, FaHome, FaRedo, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/index";
import { fetchUsernameFromDatabase, saveHighscoreToDatabase, saveProfileToDatabase, fetchHighscoreFromDatabase } from "../fireebase/firebaseUtils";
import { Howl, Howler } from 'howler'; // Import Howler
import clickSoundUrl from '../assets/click1.wav'; // Import click sound URL
import gameOverSoundUrl from '../assets/gameover.wav';

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
  const [rounds, setRounds] = useState(0);
  const navigate = useNavigate();

  const clickSound = new Howl({
    src: [clickSoundUrl],
    volume: 0.5, 
  });

  const gameOverSound = new Howl({
    src: [gameOverSoundUrl],
    volume: 0.5, 
  });

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

        if (currentUser && score > highestScore) {
          saveHighscoreToDatabase(currentUser, score)
            .then(() => {
              console.log("Highscore saved to the database:", score);
              saveProfileToDatabase({ username, highscore: score, }, currentUser);
            })
            .catch((error) => {
              console.error("Error saving highscore:", error);
            });
        }

        // Play game over sound
        gameOverSound.play();
      }
    }
  }, [remainingHearts, seconds]);

  useEffect(() => {
    if (seconds > 0 && !showGameOver) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showGameOver) {
      setSeconds(30);
    }


    if (showGameOver || showHighScore) {
      gameOverSound.play();
    }
  }, [seconds, showGameOver]);

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
      setSeconds(seconds => {
        if (2 > rounds) return 30;
        else if (4 > rounds) return 25;
        else return 15;
      });
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  const fetchUsername = () => {
    if (currentUser) {
      Promise.all([
        fetchUsernameFromDatabase(currentUser),
        fetchHighscoreFromDatabase(currentUser)
      ]).then(([username, highscore]) => {
        setUsername(username);
        setHighestScore(highscore);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  };

  const handleNumberClick = (number) => {
    clickSound.play(); 

    if (number === solution) {
      setIsCorrect(true);
      setScore(score + 1);
      fetchGame();
      setRounds(rounds + 1);
    } else {
      setIsCorrect(false);
      setRemainingHearts(remainingHearts - 1);
    }
  };

  const handleRestart = () => {
    clickSound.play(); 

    setShowGameOver(false);
    setShowHighScore(false);
    setSeconds(30);
    setRemainingHearts(3);
    setScore(0);
    setRounds(0);
    fetchGame();
  };


  return (
    <div className="h-screen flex justify-center items-center">
      <div className="box-content border-blue-200 h-5/6 w-4/6 p-4 border-8 flex justify-center bg-slate-700 relative">
        <FaArrowLeft className="absolute top-0 left-0 text-white mt-8 ml-8 cursor-pointer text-2xl" onClick={() => navigate("/home")} />
        <div className="flex flex-col justify-center items-center ">
          {!isLoading && !showGameOver && !showHighScore && (
            <>
              <div className="text-white mb-4 text-2xl">
                <p>Welcome, {username || "Guest"}</p>{" "}
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
                  className={`text-center text-2xl text-${
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
                  You got a new highest score: {highestScore}
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
