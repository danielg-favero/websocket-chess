import type { TGameStatus } from "@websocket-chess/shared";

export interface GameRoom {
  id: string;
  gameId: string;
  whitePlayerId: string | null;
  blackPlayerId: string | null;
  isFull: boolean;
  status: TGameStatus;
}
