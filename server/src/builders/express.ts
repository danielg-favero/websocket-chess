import express, { Express, RequestHandler } from "express";

export class ExpressAppBuilder {
  private expressApp: Express;

  constructor() {
    this.expressApp = express();
  }

  public withMiddleware(middleware: RequestHandler) {
    this.expressApp.use(middleware);
    return this;
  }

  public build() {
    return this.expressApp;
  }
}
