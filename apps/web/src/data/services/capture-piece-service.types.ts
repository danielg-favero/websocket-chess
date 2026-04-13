import type { Coordinates } from "@websocket-chess/shared";

export type CapturePiecePayload = {
  gameRoomId: string;
  playerId?: string;
  from: Coordinates;
  to: Coordinates;
};

export interface ICapturePieceService {
  execute: (payload: CapturePiecePayload) => Promise<void>;
}
