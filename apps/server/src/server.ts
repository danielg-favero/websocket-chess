import { json } from "express";
import cors from "cors";
import socketIo from "socket.io";

import { logger } from "@websocket-chess/shared";

import { ExpressAppBuilder } from "@application/builders/express";
import { HttpServerBuilder } from "@application/builders/http";
import { WebsocketServerBuilder } from "@application/builders/websocket";

import gameRoutes from "@transport/http/routes/game.routes";
import { errorMiddleware } from "@transport/http/middlewares/error-middleware";
import { handleSocketMessage } from "@transport/websocket/handlers/messages.handler";

import dotenv from "dotenv";
import { SocketClient } from "@transport/websocket/client";

dotenv.config();

const expressApp = new ExpressAppBuilder()
  .withMiddleware(json())
  .withMiddleware(cors())
  .withMiddleware(gameRoutes)
  .withErrorMiddleware(errorMiddleware)
  .build();

const httpServer = new HttpServerBuilder(expressApp)
  .withPort(Number(process.env.PORT))
  .onListening(() => {
    logger.log(`Server running on port ${process.env.PORT}`);
  })
  .build();

new WebsocketServerBuilder(new socketIo.Server())
  .withHttpServer(httpServer)
  .withConfig({
    path: "/sockets",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })
  .withListener("message", (socket, data) => {
    const socketClient = new SocketClient(socket);
    handleSocketMessage(socketClient, data);
  })
  .withConnection()
  .build();
