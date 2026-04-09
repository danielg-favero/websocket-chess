import { ValidationError } from "@shared/errors/validation-error";

export class InvalidTurnError extends ValidationError {
  constructor() {
    super("Not your turn");
  }
}
