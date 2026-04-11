import { io, type Socket } from "socket.io-client";

import type {
  TClientEvents,
  TServerEvents,
  GenericEventTransaction,
} from "@websocket-chess/shared";

import type { ISocketClient } from "./types";

import { SocketError } from "@domain/errors/socket/socket-error";
import { ConnectionError } from "@domain/errors/socket/connection-error";

export class SocketClient implements ISocketClient {
  private client: Socket;
  public clientId: string | null;

  constructor(
    url: string = import.meta.env.VITE_HTTP_WS_URL,
    path: string = "/sockets",
  ) {
    this.client = io(url, {
      autoConnect: false,
      reconnectionAttempts: 1,
      path,
    });
    this.clientId = null;
  }

  getInstance(): ISocketClient {
    return this;
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

  on(
    event: string,
    handler: (data: GenericEventTransaction<TServerEvents>) => void,
  ): void {
    this.client.on(event, (data: string) => {
      handler(JSON.parse(data));
    });
  }

  off(
    event: string,
    handler: (data: GenericEventTransaction<TServerEvents>) => void,
  ): void {
    this.client.off(event, handler);
  }

  onConnect(handler: VoidFunction): void {
    this.client.on("connect", () => {
      this.clientId = this.client.id!;
      handler();
    });
  }

  onConnectError(handler: (error: SocketError) => void): void {
    this.client.on("connect_error", () => {
      handler(new ConnectionError());
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

  offConnectError(handler: (error: Error) => void): void {
    this.client.off("connect_error", handler);
  }
}

export const socketClient = new SocketClient();
