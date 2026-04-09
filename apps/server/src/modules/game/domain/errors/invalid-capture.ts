import { ValidationError } from "@shared/errors/validation-error";

export class InvalidCaptureError extends ValidationError {
  constructor() {
    super("Invalid capture");
  }
}
