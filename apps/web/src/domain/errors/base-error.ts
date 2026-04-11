import { ErrorCodes } from "./codes";

export class BaseError extends Error {
  public readonly code: number;

  constructor(reason: string, code = ErrorCodes.INTERNAL_SERVER_ERROR) {
    super(reason);

    this.code = code;
  }
}
