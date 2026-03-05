"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckMateBoard = void 0;
const board_1 = require("@game/board");
const color_1 = require("@game/color");
const position_1 = require("@game/position");
const queen_1 = require("@game/pieces/queen");
const king_1 = require("@game/pieces/king");
class CheckMateBoard extends board_1.Board {
    constructor() {
        super();
        // White Queen
        this.place(new queen_1.Queen(new color_1.Color("WHITE")), new position_1.Position(3, 7));
        // Black King
        this.place(new king_1.King(new color_1.Color("BLACK")), new position_1.Position(3, 0));
    }
}
exports.CheckMateBoard = CheckMateBoard;
