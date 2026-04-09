export const CLIENT_EVENTS = {
  JOIN_ROOM: "CLIENT_EVENT:JOIN_ROOM",
  LEAVE_ROOM: "CLIENT_EVENT:LEAVE_ROOM",
  MOVE: "CLIENT_EVENT:MOVE",
  CAPTURE: "CLIENT_EVENT:CAPTURE",
} as const;

export type TClientEvents = (typeof CLIENT_EVENTS)[keyof typeof CLIENT_EVENTS];

export const SERVER_EVENTS = {
  GAME_STATE: "SERVER_EVENT:GAME_STATE",
  GAME_ROOM_STATE: "SERVER_EVENT:GAME_ROOM_STATE",
  PLAYER_STATE: "SERVER_EVENT:PLAYER_STATE",
  ERROR: "SERVER_EVENT:ERROR",
} as const;

export type TServerEvents = (typeof SERVER_EVENTS)[keyof typeof SERVER_EVENTS];

export type GenericEventTransaction<T extends TClientEvents | TServerEvents> = {
  type: T;
  payload: any;
};
