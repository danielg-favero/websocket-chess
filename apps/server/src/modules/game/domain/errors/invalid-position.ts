import { ValidationError } from "@shared/errors/validation-error";

export class InvalidPositionError extends ValidationError {
  constructor() {
    super("Invalid position");
  }
}
