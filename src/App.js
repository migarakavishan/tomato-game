import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TomatoGame from "./components/game";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { AuthProvider } from "./contexts/authContext/index";
import HomePage from "./components/HomePage";
import MenuPage from "./components/MenuPage";


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
            
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
