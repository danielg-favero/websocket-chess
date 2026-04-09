import { BaseError } from "./base-error";
import { ErrorCodes } from "./codes";

export class NotFoundError extends BaseError {
  constructor(resource: string) {
    super(`${resource} not found`, ErrorCodes.NOT_FOUND);
  }
}
