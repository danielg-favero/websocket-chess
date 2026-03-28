import { MESSAGES_TYPES, type Coordinates } from "@websocket-chess/shared";

import { useWebsocket } from "./use-websocket";

interface MovePiecePayload {
  gameId: string;
  from: Coordinates;
  to: Coordinates;
}

interface CapturePiecePayload {
  gameId: string;
  from: Coordinates;
  to: Coordinates;
}

export function useChessGame() {
  const { sendMessage, ...webSocket } = useWebsocket();

  const joinGame = (gameId: string) => {
    sendMessage({ type: MESSAGES_TYPES.JOIN_GAME, payload: { gameId } });
  };

  const movePiece = (payload: MovePiecePayload) => {
    sendMessage({ type: MESSAGES_TYPES.MOVE, payload });
  };

  const capturePiece = (payload: CapturePiecePayload) => {
    sendMessage({ type: MESSAGES_TYPES.CAPTURE, payload });
  };

  return {
    joinGame,
    movePiece,
    capturePiece,
    ...webSocket,
  };
}
