import { Socket } from "socket.io";

import { ISocketClient, SocketMessageCallback } from "./types";
import { logger } from "@websocket-chess/shared";

export class SocketClient implements ISocketClient {
  readonly clientId: string;

  constructor(private socket: Socket) {
    this.clientId = socket.id;
  }

  emit(data: Record<string, any>) {
    this.socket.nsp.emit("message", JSON.stringify(data));
  }

  emitToRoom(roomId: string, data: Record<string, any>) {
    this.socket.nsp.to(roomId).emit("message", JSON.stringify(data));
  }

  joinRoom(roomId: string) {
    this.socket.join(roomId);
  }

  send(data: Record<string, any>) {
    this.socket.send(JSON.stringify(data));
  }

  sendToClient(data: Record<string, any>) {
    this.socket.nsp.to(this.clientId).emit("message", JSON.stringify(data));
  }

  receive(event: string, callback: SocketMessageCallback) {
    this.socket.on(event, callback);
  }

  get id(): string {
    return this.clientId;
  }
}
