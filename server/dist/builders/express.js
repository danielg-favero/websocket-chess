"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAppBuilder = void 0;
const express_1 = __importDefault(require("express"));
class ExpressAppBuilder {
    constructor() {
        this.expressApp = (0, express_1.default)();
    }
    withMiddleware(middleware) {
        this.expressApp.use(middleware);
        return this;
    }
    build() {
        return this.expressApp;
    }
}
exports.ExpressAppBuilder = ExpressAppBuilder;
