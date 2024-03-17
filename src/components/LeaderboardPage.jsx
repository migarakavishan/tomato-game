import React, { useEffect, useState } from "react";
import { db } from "../fireebase/firebase";
import { get, ref } from "firebase/database";
import { FaAward, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function LeaderboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, "/users"));
        if (snapshot.exists()) {
          setData(snapshot.val());
          console.log("Database import successful");
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Clean up listener when component unmounts
    return () => {};
  }, []);

  
  const sortDataByHighscore = (data) => {
    if (!data) return [];
    return Object.entries(data)
      .map(([key, value]) => ({ id: key, ...value }))
      .sort((a, b) => b.highscore - a.highscore)
      .slice(0, 10);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="box-content border-blue-200 h-5/6 w-4/6 pt-20 border-8 justify-center items-center bg-slate-700 relative">
        <Link to="/home" className="absolute top-0 left-0 mt-8 ml-8 text-white text-2xl">
          <FaArrowLeft />
        </Link>
        <div className="text-white text-2xl flex flex-row items-center justify-center space-x-3">
          <FaAward className="mb-3"/>
          <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
          <FaAward className="mb-3"/>
        </div>
        <div className="overflow-x-auto flex justify-center items-center">
          <table className="table-auto border-b-slate-600 ">
            <tbody>
              {sortDataByHighscore(data).map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#83829C" : "#B9B7D8",
                  }}
                  className=""
                >
                  <td className="px-4 py-2">
                    <div className="rounded-2xl bg-white h-7 w-7 flex justify-center">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-no-wrap w-60 text-white font-semibold">
                    <div className="flex flex-row items-center">
                      {item.username}
                      {item.highscore ===
                        sortDataByHighscore(data)[0].highscore && (
                        <FaAward className="ml-2 text-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-white font-semibold">
                    {item.highscore} points
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
