import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import type { IGameRoomState } from "@danielg.favero/websocket-chess-package";

import Board from "@components/board";
import Loader from "@components/loader";

import { useChessGame } from "@hooks/use-chess-game";

export default function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { isConnected, joinGame, message, connect } = useChessGame();

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

  console.log({ message });

  if (message.type === "GAME_STATE") {
    return <Board gameRoomState={message.payload as IGameRoomState} />;
  }

  return <Loader />;
}
