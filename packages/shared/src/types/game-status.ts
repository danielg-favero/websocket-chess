export const GameStatus = {
  NOT_STARTED: "NOT_STARTED",
  WAITING: "WAITING",
  PLAYING: "PLAYING",
  CHECKMATE: "CHECKMATE",
  RESIGNED: "RESIGNED",
  DRAW: "DRAW",
} as const;

export type TGameStatus = (typeof GameStatus)[keyof typeof GameStatus];
