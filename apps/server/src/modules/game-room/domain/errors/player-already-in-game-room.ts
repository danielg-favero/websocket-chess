import { ValidationError } from "@shared/errors/validation-error";

export class PlayerAlreadyInGameRoomError extends ValidationError {
  constructor() {
    super("Player has already joined the gameroom");
  }
}
