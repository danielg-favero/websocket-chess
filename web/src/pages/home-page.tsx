import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createGame } from "@api/services/create-game";

import Button from "@components/button";
import { useChessGame } from "@hooks/use-chess-game";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [gameId, setGameId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { connect, isConnected } = useChessGame();

  const handleCreateGame = async () => {
    setLoading(true);
    const [error, gameState] = await createGame();
    setLoading(false);

    if (error === null) {
      setGameId(gameState.id);
      connect();
    }
  };

  useEffect(() => {
    if (isConnected && gameId) {
      navigate(`/game/${gameId}`);
    }
  }, [isConnected, gameId, navigate]);

  return (
    <Button onClick={handleCreateGame} variant="secondary" isLoading={loading}>
      Create new game
    </Button>
  );
}
