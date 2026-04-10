import type { GameRoom } from "@domain/models/game-room.model";

export interface ICreateGameRoomService {
  execute: () => Promise<GameRoom>;
}
