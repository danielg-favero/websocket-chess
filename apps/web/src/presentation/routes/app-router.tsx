import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LobbyPage from "@presentation/pages/lobby-page/lobby-page.page";
import GamePage from "@presentation/pages/game-page/game-page.page";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
    </Router>
  );
}
