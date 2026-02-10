import { Socket } from "socket.io";

import { routeMessage } from "./routeMessage";

export function handleConnection(socket: Socket) {
  console.log(`Client connected: ${socket.id}`);

  socket.on("message", (data) => {
    routeMessage(socket, data);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  socket.on("error", (error) => {
    console.error(`Client error: ${socket.id}`, error);
  });
}
