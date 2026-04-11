export const GameRoomStatus = {
  CREATED: "CREATED",
  WAITING_OPPONENT: "WAITING_OPPONENT",
  WAITING_GAME_START: "WAITING_GAME_START",
  STARTED: "STARTED",
  FINISHED: "FINISHED",
} as const;

export type TGameRoomStatus =
  (typeof GameRoomStatus)[keyof typeof GameRoomStatus];
