import { BaseError } from "../base-error";
import type { ErrorCodes } from "../codes";

export class ApiError extends BaseError {
  constructor(reason: string, code?: ErrorCodes) {
    super(reason, code);
  }
}
