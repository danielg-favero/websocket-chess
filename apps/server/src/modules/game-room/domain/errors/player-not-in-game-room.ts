import { ValidationError } from "@shared/errors/validation-error";

export class PlayerNotInGameRoomError extends ValidationError {
  constructor() {
    super("Player has not joined the gameroom");
  }
}
