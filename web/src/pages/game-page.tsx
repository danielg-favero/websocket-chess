import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import Board from "@components/board";
import Loader from "@components/loader";

import { useChessGame } from "@hooks/use-chess-game";
import type { IGameState } from "@interfaces/game-state";

export default function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { isConnected, joinGame, message } = useChessGame();

  useEffect(() => {
    if (!gameId) {
      navigate("/");
      return;
    }

    if (!isConnected) return;

    joinGame(gameId);
  }, [gameId]);

  if (!isConnected) return <Loader />;

  if (message?.type === "GAME_STATE") {
    return <Board gameState={message.payload as IGameState} />;
  }

  return <Loader />;
}
