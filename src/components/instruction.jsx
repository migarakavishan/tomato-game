import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Instruction() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="box-content border-blue-200 h-5/6 w-4/6 p-8 border-8 flex flex-col justify-center bg-slate-700 relative">
        <FaArrowLeft
          className="absolute top-6 left-6 text-white mt-4 ml-4 cursor-pointer text-xl"
          onClick={() => navigate('/home')}
        />
        <div className='mb-48 ml-20 mr-20'>
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Welcome to Tomato Game!</h1>
        <p className="text-lg text-white mb-6">
          Here are the instructions to play the game:
        </p>
        <ol className="list-decimal pl-6 mb-6 text-white">
          <li className="mb-4">
            <strong>Game Overview:</strong> In Tomato Game, you'll encounter
            mathematical equations arranged both horizontally and vertically.
            Within these equations, some numbers are hidden within tomatoes.
            Your challenge is to find these hidden numbers.
          </li>
          <li className="mb-4">
            <strong>Lifelines: </strong> You have 3 lifelines represented by
            heart symbols. Each wrong answer will cost you one heart. If you
            run out of hearts, the game is over.
          </li>
          <li className="mb-4">
            <strong>Timer:</strong> The timer starts at 30 seconds for the
            first level. As you progress through rounds, the timer decreases
            to 20 seconds and finally 15 seconds for the final level.
          </li>
          <li className="mb-4">
            <strong>Game Over:</strong> The game ends when you've used up all
            your hearts or when time runs out.
          </li>
          <li className="mb-4">
            <strong>Leaderboard:</strong> Keep an eye on the leaderboard to
            see the top 10 high-score players.
          </li>
        </ol>
        <p className="text-lg text-white mb-6">
          Hit the play button below to start playing!
        </p>
        <div className="flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded w-32" onClick={() => navigate('/play')}>
            Play the Game
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Instruction;
