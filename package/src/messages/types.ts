export const MESSAGES_TYPES = {
  CREATE_GAME: "CREATE_GAME",
  JOIN_GAME: "JOIN_GAME",
  MOVE: "MOVE",
  CAPTURE: "CAPTURE",
  ERROR: "ERROR",
  GAME_STATE: "GAME_STATE",
} as const;

export type TMessageTypes =
  (typeof MESSAGES_TYPES)[keyof typeof MESSAGES_TYPES];
