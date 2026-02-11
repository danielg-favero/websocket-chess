import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import Board from "@components/board";
import Loader from "@components/loader";

import { useChessGame } from "@hooks/use-chess-game";
import type { IGameRoomState } from "@interfaces/game-room-state";

export default function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { isConnected, joinGame, message, connect } = useChessGame();

  console.log(message);

  useEffect(() => {
    if (!gameId) {
      navigate("/");
      return;
    }

    if (!isConnected) connect();
  }, [gameId]);

  useEffect(() => {
    if (!isConnected) return;
    if (!gameId) return;

    joinGame(gameId);
  }, [isConnected, gameId]);

  if (!isConnected || !message) return <Loader />;

  if (message.type === "GAME_STATE") {
    return <Board gameRoomState={message.payload as IGameRoomState} />;
  }

  return <Loader />;
}
