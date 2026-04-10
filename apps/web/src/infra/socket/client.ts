import { io, type Socket } from "socket.io-client";

import type {
  TClientEvents,
  TServerEvents,
  GenericEventTransaction,
} from "@websocket-chess/shared";

import type { ISocketClient, SocketEventHandler } from "./types";

export class SocketClient implements ISocketClient {
  private client: Socket;
  public clientId: string | null;

  constructor(
    url: string = import.meta.env.VITE_HTTP_WS_URL,
    path: string = "/sockets",
  ) {
    this.client = io(url, {
      autoConnect: false,
      path,
    });
    this.clientId = null;
  }

  connect(): void {
    this.client.connect();
  }

  disconnect(): void {
    this.client.disconnect();
  }

  isConnected(): boolean {
    return this.client.connected;
  }

  send<T extends TClientEvents>(message: GenericEventTransaction<T>): void {
    this.client.emit("message", JSON.stringify(message));
  }

  on<T extends TServerEvents>(event: T, handler: SocketEventHandler<T>): void {
    this.client.on(event as string, (data: string) => {
      handler(JSON.parse(data));
    });
  }

  off<T extends TServerEvents>(event: T, handler: SocketEventHandler<T>): void {
    this.client.off(event as string, handler);
  }

  onConnect(handler: VoidFunction): void {
    this.client.on("connect", () => {
      this.clientId = this.client.id!;
      handler();
    });
  }

  onDisconnect(handler: VoidFunction): void {
    this.client.on("disconnect", () => {
      this.clientId = null;
      handler();
    });
  }

  offConnect(handler: VoidFunction): void {
    this.client.off("connect", handler);
  }

  offDisconnect(handler: VoidFunction): void {
    this.client.off("disconnect", handler);
  }
}
