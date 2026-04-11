import { ValidationError } from "@shared/errors/validation-error";

export class PlayerNotInGameRoomError extends ValidationError {
  constructor(playerId: string) {
    super(`Player ${playerId} has not joined the gameroom`);
  }
}
