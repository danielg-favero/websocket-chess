import { ValidationError } from "@shared/errors/validation-error";

export class CannotCaptureOwnPieceError extends ValidationError {
  constructor() {
    super("Cannot capture own piece");
  }
}
