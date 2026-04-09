export const ERROR_MESSAGES = {
  GAME_NOT_FOUND: "Game not found",
  COULD_NOT_JOIN_GAME: "Could not join the game",
  GAME_ROOM_FULL: "Game room is full",
  WHITE_PLAYER_NOT_FOUND: "White player not found",
  BLACK_PLAYER_NOT_FOUND: "Black player not found",

  INVALID_POSITION: "Invalid position objects",
  INVALID_MOVE: "Invalid move for this piece",
  INVALID_CAPTURE: "Invalid capture for this piece",
  POSITION_OUT_OF_BOARD: "Position out of board bounds",
  NO_PIECE_AT_SOURCE: "No piece at source position",

  CANNOT_CAPTURE_OWN_PIECE: "You cannot capture your own piece",

  INVALID_TURN: "Not your turn",

  UNKNOWN_MESSAGE: "Unknown message type",
  INVALID_PAYLOAD_DATA: "Invalid payload data",
} as const;
