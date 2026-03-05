import { Server, ServerOptions } from "socket.io";
import http from "http";

import {
  logger,
  SocketMessageCallback,
} from "@danielg.favero/websocket-chess-package";

export class WebsocketServerBuilder {
  private io: Server;
  private httpServer!: http.Server;
  private config!: Partial<ServerOptions>;
  private listeners: Array<{ event: string; callback: SocketMessageCallback }> =
    [];

  constructor(io: Server) {
    this.io = io;
    this.listeners = [];
  }

  public withHttpServer(httpServer: http.Server) {
    this.httpServer = httpServer;
    return this;
  }

  public withConfig(options: Partial<ServerOptions>) {
    this.config = options;
    return this;
  }

  public withListener(event: string, callback: (...args: any[]) => void) {
    this.listeners.push({ event, callback });
    return this;
  }

  public withConnection() {
    if (!this.listeners.length) {
      logger.error("No listeners were implemented");
      throw new Error("No listeners were implemented");
    }

    this.io.on("connection", (socket) => {
      this.listeners.forEach((listener) => {
        socket.on(listener.event, (data) => {
          listener.callback(socket, data);
        });
      });
    });
    return this;
  }

  public build() {
    if (!this.httpServer) {
      logger.error("HTTP Server was not implemented");
      throw new Error("HTTP Server was not implemented");
    }

    if (!this.config) {
      logger.error("Socket Config was not implemented");
      throw new Error("Socket Config was not implemented");
    }

    this.io.attach(this.httpServer, this.config);
    logger.log("Websocket Server built successfully");
    return this.io;
  }
}
