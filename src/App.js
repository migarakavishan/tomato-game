import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TomatoGame from "./components/game";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { AuthProvider } from "./contexts/authContext/index";
import HomePage from "./components/HomePage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    // Clear timeout if the component unmounts or when loading is completed
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AuthProvider>
      <Router>
        {loading ? (
          <LoadingScreen />
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
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
