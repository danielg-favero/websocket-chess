import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createGameRoom } from "@api/services/create-game-room";

import Button from "@components/button";
import { useChessGame } from "@hooks/use-chess-game";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [gameRoomId, setGameRoomId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { connect, isConnected } = useChessGame();

  const handleCreateGame = async () => {
    setLoading(true);
    const [error, gameRoom] = await createGameRoom();
    setLoading(false);

    if (error === null) {
      setGameRoomId(gameRoom.id);
      connect();
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isConnected && gameRoomId) {
      navigate(`/game/${gameRoomId}`);
    }
  }, [isConnected, gameRoomId, navigate]);

  return (
    <Button onClick={handleCreateGame} variant="secondary" isLoading={loading}>
      Create new game
    </Button>
  );
}
