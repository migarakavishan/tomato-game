
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TomatoGame from "./components/game";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./components/Login";
import SignUp from "./components/Signup";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingScreen/>}>

        </Route>
        <Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="play" element={<TomatoGame />} />
        </Route>
      </Routes>
    </Router> 
  );
}

export default App;
