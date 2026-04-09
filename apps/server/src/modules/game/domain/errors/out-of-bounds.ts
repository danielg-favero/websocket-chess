import { ValidationError } from "@shared/errors/validation-error";

export class OutOfBoundsError extends ValidationError {
  constructor() {
    super("Out of bounds");
  }
}
