/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type {
  IGameRoomState,
  IPlayerState,
} from "@danielg.favero/websocket-chess-package";

import Board from "@components/board";
import Loader from "@components/loader";

import { useChessGame } from "@hooks/use-chess-game";

export default function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { isConnected, joinGame, message, connect } = useChessGame();

  const [gameRoomState, setGameRoomState] = useState<IGameRoomState | null>(
    null,
  );
  const [playerState, setPlayerState] = useState<IPlayerState | null>(null);

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

  useEffect(() => {
    if (!message) return;

    if (message.type === "GAME_STATE") {
      setGameRoomState(message.payload as IGameRoomState);
    }
  }, [message]);

  useEffect(() => {
    if (!message) return;

    if (message.type === "PLAYER_STATE") {
      setPlayerState(message.payload as IPlayerState);
    }
  }, [message]);

  if (!isConnected || !message) return <Loader />;

  if (gameRoomState && playerState) {
    return <Board gameRoomState={gameRoomState} playerState={playerState} />;
  }

  return <Loader />;
}
