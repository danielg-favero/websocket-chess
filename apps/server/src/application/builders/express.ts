import express, { ErrorRequestHandler, Express, RequestHandler } from "express";

export class ExpressAppBuilder {
  private expressApp: Express;

  constructor() {
    this.expressApp = express();
  }

  public withMiddleware(middleware: RequestHandler) {
    this.expressApp.use("/api", middleware);
    return this;
  }

  public withErrorMiddleware(middleware: ErrorRequestHandler) {
    this.expressApp.use(middleware);
    return this;
  }

  public build() {
    return this.expressApp;
  }
}
