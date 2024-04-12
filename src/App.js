import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TomatoGame from "./components/game";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { AuthProvider } from "./contexts/authContext/index";
import HomePage from "./components/HomePage";
import MenuPage from "./components/MenuPage";
import LeaderboardPage from "./components/LeaderboardPage";
import TomatoGameGuest from "./components/gameGuest";
import Instruction from "./components/instruction";



function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AuthProvider>
      <Router>
        {loading ? (
          <LoadingScreen />
        ) : (
          <Routes>
          <Route path="/" element={<MenuPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp />} />
            <Route path="play" element={<TomatoGame />} />
            <Route path="home" element={<HomePage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="guestgame" element={<TomatoGameGuest/>}/>
            <Route path="instruction" element={<Instruction/>} />
            
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
