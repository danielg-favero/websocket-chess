import { SERVER_EVENTS } from "@websocket-chess/shared";
import { BaseError } from "@shared/errors/base-error";
import { ErrorCodes } from "@shared/errors/codes";

import { SocketClient } from "../client";

export function handleSocketError(socket: SocketClient, err: unknown) {
  if (err instanceof BaseError) {
    socket.send({
      type: SERVER_EVENTS.ERROR,
      payload: {
        message: err.message,
        code: err.code,
      },
    });

    return;
  }

  socket.send({
    type: SERVER_EVENTS.ERROR,
    payload: {
      message: "Internal server error",
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
    },
  });
}
