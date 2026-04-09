import { ValidationError } from "@shared/errors/validation-error";

export class BlackPlayerNotFoundError extends ValidationError {
  constructor() {
    super("Black player not found");
  }
}
