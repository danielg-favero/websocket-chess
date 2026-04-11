import type { GameRoom } from "@domain/models/game-room.model";

export type JoinGamePayload = {
  gameRoomId: string;
  playerNickname: string;
  playerId: string;
};

export interface IJoinGameService {
  execute: (payload: JoinGamePayload) => Promise<GameRoom>;
}
