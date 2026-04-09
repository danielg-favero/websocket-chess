import { ValidationError } from "@shared/errors/validation-error";

export class InvalidMoveError extends ValidationError {
  constructor() {
    super("Invalid move");
  }
}
