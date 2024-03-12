import React from "react";

function LeaderboardPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="box-content border-blue-200 h-5/6 w-4/6 p-4 border-8 justify-center items-center bg-slate-700 ">
        <div className="text-white text-2xl flex flex-row items-center justify-center">
          <h1>Leaderboard</h1>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-900 rounded-lg shadow-xl p-8 mt-4 w-3/5 justify-center">
            <div className="flex flex-col space-y-4">
              {/* Sample leaderboard entries */}
              <div className="flex justify-between items-center">
                <span className="text-lg text-white">1. John Doe</span>
                <span className="text-lg text-yellow-400">1000 Points</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-white">2. Jane Smith</span>
                <span className="text-lg text-yellow-400">950 Points</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-white">3. Alex Johnson</span>
                <span className="text-lg text-yellow-400">900 Points</span>
              </div>
              {/* Add more leaderboard entries as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
