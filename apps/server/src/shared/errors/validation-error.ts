import { BaseError } from "./base-error";
import { ErrorCodes } from "./codes";

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, ErrorCodes.BAD_REQUEST);
  }
}
