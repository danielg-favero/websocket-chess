"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketServerBuilder = void 0;
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
class WebsocketServerBuilder {
    constructor(io) {
        this.listeners = [];
        this.io = io;
        this.listeners = [];
    }
    withHttpServer(httpServer) {
        this.httpServer = httpServer;
        return this;
    }
    withConfig(options) {
        this.config = options;
        return this;
    }
    withListener(event, callback) {
        this.listeners.push({ event, callback });
        return this;
    }
    withConnection() {
        if (!this.listeners.length) {
            websocket_chess_package_1.logger.error("No listeners were implemented");
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
    build() {
        if (!this.httpServer) {
            websocket_chess_package_1.logger.error("HTTP Server was not implemented");
            throw new Error("HTTP Server was not implemented");
        }
        if (!this.config) {
            websocket_chess_package_1.logger.error("Socket Config was not implemented");
            throw new Error("Socket Config was not implemented");
        }
        this.io.attach(this.httpServer, this.config);
        websocket_chess_package_1.logger.log("Websocket Server built successfully");
        return this.io;
    }
}
exports.WebsocketServerBuilder = WebsocketServerBuilder;
