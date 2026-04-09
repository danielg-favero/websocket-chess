import { Socket } from "socket.io";

export interface ISocketClient {
  emit(data: Record<string, any>): void;
  emitToRoom(roomId: string, data: Record<string, any>): void;
  joinRoom(roomId: string): void;
  sendToClient(data: Record<string, any>): void;
  send(data: Record<string, any>): void;
  receive(event: string, callback: SocketMessageCallback): void;

  readonly clientId: string;
}

export type SocketCallback = (socket: Socket) => void;
export type SocketMessageCallback = (socket: Socket, message: string) => void;
