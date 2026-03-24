export const ERROR_MESSAGES = {
  GAME_NOT_FOUND: "Game not found",
  COULD_NOT_JOIN_GAME: "Could not join the game",

  INVALID_POSITION: "Invalid position objects",
  INVALID_MOVE: "Invalid move for this piece",
  POSITION_OUT_OF_BOARD: "Position out of board bounds",
  NO_PIECE_AT_SOURCE: "No piece at source position",

  CANNOT_CAPTURE_OWN_PIECE: "You cannot capture your own piece",

  INVALID_TURN: "Not your turn",

  UNKNOWN_MESSAGE: "Unknown message type",
  INVALID_PAYLOAD_DATA: "Invalid payload data",
} as const;
