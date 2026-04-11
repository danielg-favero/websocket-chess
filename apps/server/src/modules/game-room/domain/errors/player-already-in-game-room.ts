import { ValidationError } from "@shared/errors/validation-error";

export class PlayerAlreadyInGameRoomError extends ValidationError {
  constructor(playerId: string) {
    super(`Player ${playerId} has already joined the gameroom`);
  }
}
