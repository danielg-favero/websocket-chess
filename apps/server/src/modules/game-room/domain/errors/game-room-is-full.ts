import { ValidationError } from "@shared/errors/validation-error";

export class GameRoomIsFullError extends ValidationError {
  constructor() {
    super("Game room is full");
  }
}
