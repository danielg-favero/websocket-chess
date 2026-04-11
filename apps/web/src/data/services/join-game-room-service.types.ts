export type JoinGameRoomPayload = {
  gameRoomId: string;
  playerId?: string;
};

export interface IJoinGameRoomService {
  execute: (payload: JoinGameRoomPayload) => Promise<void>;
}
