"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const dotenv_1 = __importDefault(require("dotenv"));
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const websocket_1 = require("@builders/websocket");
const http_1 = require("@builders/http");
const express_2 = require("@builders/express");
const http_2 = __importDefault(require("@routes/http"));
const websocket_2 = require("@routes/websocket");
dotenv_1.default.config();
const expressApp = new express_2.ExpressAppBuilder()
    .withMiddleware((0, express_1.json)())
    .withMiddleware((0, cors_1.default)())
    .withMiddleware(http_2.default)
    .build();
const httpServer = new http_1.HttpServerBuilder(expressApp)
    .withPort(Number(process.env.PORT))
    .onListening(() => {
    websocket_chess_package_1.logger.log(`Server running on port ${process.env.PORT}`);
})
    .build();
new websocket_1.WebsocketServerBuilder(new socket_io_1.default.Server())
    .withHttpServer(httpServer)
    .withConfig({
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
})
    .withListener("message", websocket_2.routeMessage)
    .withConnection()
    .build();
