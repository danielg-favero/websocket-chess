import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import GamePage from "@pages/game-page";
import HomePage from "@pages/home-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
