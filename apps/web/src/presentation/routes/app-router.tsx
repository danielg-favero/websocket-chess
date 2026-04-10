import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LobbyPage from "@presentation/pages/lobby-page/lobby-page.page";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
      </Routes>
    </Router>
  );
}
