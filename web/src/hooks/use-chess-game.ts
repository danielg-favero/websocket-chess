import { MESSAGES_TYPES } from "@config/messages";

import { useWebsocket } from "./use-websocket";

interface MovePiecePayload {
  gameId: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

export function useChessGame() {
  const { sendMessage, ...webSocket } = useWebsocket();

  const joinGame = (gameId: string) => {
    sendMessage({ type: MESSAGES_TYPES.JOIN_GAME, payload: { gameId } });
  };

  const movePiece = (payload: MovePiecePayload) => {
    sendMessage({ type: MESSAGES_TYPES.MOVE, payload });
  };

  return {
    joinGame,
    movePiece,
    ...webSocket,
  };
}
