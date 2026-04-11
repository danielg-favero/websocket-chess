export type StartGamePayload = {
  gameRoomId: string;
};

export interface IStartGameService {
  execute: (payload: StartGamePayload) => Promise<void>;
}
