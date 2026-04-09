import { ValidationError } from "@shared/errors/validation-error";

export class WhitePlayerNotFoundError extends ValidationError {
  constructor() {
    super("White player not found");
  }
}
