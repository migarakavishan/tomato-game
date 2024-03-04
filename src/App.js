
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TomatoGame from "./components/game";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingScreen/>}>

        </Route>
        <Route>
        <Route path="play" element={<TomatoGame />} />
        </Route>
      </Routes>
    </Router> 
  );
}

export default App;
