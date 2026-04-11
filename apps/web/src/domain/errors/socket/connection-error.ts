import { SocketError } from "./socket-error";

import { ErrorCodes } from "../codes";

export class ConnectionError extends SocketError {
  constructor() {
    super(
      "Error while connecting to the server",
      ErrorCodes.INTERNAL_SERVER_ERROR,
    );
  }
}
