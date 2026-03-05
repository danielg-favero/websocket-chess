"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketClient = void 0;
class SocketClient {
    constructor(socket) {
        this.socket = socket;
        this.clientId = socket.id;
    }
    emit(data) {
        this.socket.nsp.emit("message", JSON.stringify(data));
    }
    emitToRoom(roomId, data) {
        this.socket.nsp.to(roomId).emit("message", JSON.stringify(data));
    }
    joinRoom(roomId) {
        this.socket.join(roomId);
    }
    send(data) {
        this.socket.send(JSON.stringify(data));
    }
    sendToClient(clientId, data) {
        this.socket.to(clientId).emit("message", JSON.stringify(data));
    }
    receive(event, callback) {
        this.socket.on(event, callback);
    }
    get id() {
        return this.clientId;
    }
}
exports.SocketClient = SocketClient;
