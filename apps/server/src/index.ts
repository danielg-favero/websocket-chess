import { json } from "express";
import cors from "cors";
import socketIo from "socket.io";
import dotenv from "dotenv";

import { logger } from "@websocket-chess/shared";

import { WebsocketServerBuilder } from "@builders/websocket";
import { HttpServerBuilder } from "@builders/http";
import { ExpressAppBuilder } from "@builders/express";

import httpRoutes from "@routes/http";
import { routeMessage } from "@routes/websocket";

dotenv.config();

const expressApp = new ExpressAppBuilder()
  .withMiddleware(json())
  .withMiddleware(cors())
  .withMiddleware(httpRoutes)
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
  .withListener("message", routeMessage)
  .withConnection()
  .build();
