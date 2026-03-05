"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServerBuilder = void 0;
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const http_1 = __importDefault(require("http"));
class HttpServerBuilder {
    constructor(expressApp) {
        this.httpServer = http_1.default.createServer(expressApp);
    }
    withPort(port) {
        this.port = port;
        return this;
    }
    onListening(callback) {
        if (!this.port) {
            websocket_chess_package_1.logger.error("HTTP Server Port is not defined");
            throw new Error("HTTP Server Port is not defined");
        }
        this.httpServer.listen(this.port, callback);
        return this;
    }
    build() {
        websocket_chess_package_1.logger.log("HTTP Server built successfully");
        return this.httpServer;
    }
}
exports.HttpServerBuilder = HttpServerBuilder;
