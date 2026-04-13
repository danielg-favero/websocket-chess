import type { Coordinates } from "@websocket-chess/shared";

export type MovePiecePayload = {
  gameRoomId: string;
  playerId?: string;
  from: Coordinates;
  to: Coordinates;
};

export interface IMovePieceService {
  execute: (payload: MovePiecePayload) => Promise<void>;
}
