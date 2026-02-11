import { Express } from "express";
import http from "http";
import logger from "@lib/logger";

export class HttpServerBuilder {
  private httpServer: http.Server;
  private port!: number;

  constructor(expressApp: Express) {
    this.httpServer = http.createServer(expressApp);
  }

  public withPort(port: number) {
    this.port = port;
    return this;
  }

  public onListening(callback: () => void) {
    if (!this.port) {
      logger.error("HTTP Server Port is not defined");
      throw new Error("HTTP Server Port is not defined");
    }

    this.httpServer.listen(this.port, callback);
    return this;
  }

  public build() {
    logger.log("HTTP Server built successfully");
    return this.httpServer;
  }
}
