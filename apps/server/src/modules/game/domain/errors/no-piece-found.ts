import { NotFoundError } from "@shared/errors/not-found-error";

export class NoPieceFoundError extends NotFoundError {
  constructor() {
    super("No piece found");
  }
}
