"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultBoard = void 0;
const board_1 = require("@game/board");
const pawn_1 = require("../pieces/pawn");
const position_1 = require("../position");
const color_1 = require("../color");
const rook_1 = require("../pieces/rook");
const bishop_1 = require("../pieces/bishop");
const knight_1 = require("../pieces/knight");
const king_1 = require("../pieces/king");
const queen_1 = require("../pieces/queen");
class DefaultBoard extends board_1.Board {
    constructor() {
        super();
        // PAWNS
        this.place(new pawn_1.Pawn(new color_1.Color("BLACK")), new position_1.Position(0, 1));
        this.place(new pawn_1.Pawn(new color_1.Color("BLACK")), new position_1.Position(1, 1));
        this.place(new pawn_1.Pawn(new color_1.Color("BLACK")), new position_1.Position(2, 1));
        this.place(new pawn_1.Pawn(new color_1.Color("BLACK")), new position_1.Position(3, 1));
        this.place(new pawn_1.Pawn(new color_1.Color("BLACK")), new position_1.Position(4, 1));
        this.place(new pawn_1.Pawn(new color_1.Color("BLACK")), new position_1.Position(5, 1));
        this.place(new pawn_1.Pawn(new color_1.Color("BLACK")), new position_1.Position(6, 1));
        this.place(new pawn_1.Pawn(new color_1.Color("BLACK")), new position_1.Position(7, 1));
        this.place(new pawn_1.Pawn(new color_1.Color("WHITE")), new position_1.Position(0, 6));
        this.place(new pawn_1.Pawn(new color_1.Color("WHITE")), new position_1.Position(1, 6));
        this.place(new pawn_1.Pawn(new color_1.Color("WHITE")), new position_1.Position(2, 6));
        this.place(new pawn_1.Pawn(new color_1.Color("WHITE")), new position_1.Position(3, 6));
        this.place(new pawn_1.Pawn(new color_1.Color("WHITE")), new position_1.Position(4, 6));
        this.place(new pawn_1.Pawn(new color_1.Color("WHITE")), new position_1.Position(5, 6));
        this.place(new pawn_1.Pawn(new color_1.Color("WHITE")), new position_1.Position(6, 6));
        this.place(new pawn_1.Pawn(new color_1.Color("WHITE")), new position_1.Position(7, 6));
        // ROOKS
        this.place(new rook_1.Rook(new color_1.Color("BLACK")), new position_1.Position(7, 0));
        this.place(new rook_1.Rook(new color_1.Color("BLACK")), new position_1.Position(0, 0));
        this.place(new rook_1.Rook(new color_1.Color("WHITE")), new position_1.Position(7, 7));
        this.place(new rook_1.Rook(new color_1.Color("WHITE")), new position_1.Position(0, 7));
        // BISHOPS
        this.place(new bishop_1.Bishop(new color_1.Color("BLACK")), new position_1.Position(6, 0));
        this.place(new bishop_1.Bishop(new color_1.Color("BLACK")), new position_1.Position(1, 0));
        this.place(new bishop_1.Bishop(new color_1.Color("WHITE")), new position_1.Position(6, 7));
        this.place(new bishop_1.Bishop(new color_1.Color("WHITE")), new position_1.Position(1, 7));
        // KNIGHTS
        this.place(new knight_1.Knight(new color_1.Color("BLACK")), new position_1.Position(5, 0));
        this.place(new knight_1.Knight(new color_1.Color("BLACK")), new position_1.Position(2, 0));
        this.place(new knight_1.Knight(new color_1.Color("WHITE")), new position_1.Position(5, 7));
        this.place(new knight_1.Knight(new color_1.Color("WHITE")), new position_1.Position(2, 7));
        // KINGS
        this.place(new king_1.King(new color_1.Color("BLACK")), new position_1.Position(3, 0));
        this.place(new king_1.King(new color_1.Color("WHITE")), new position_1.Position(3, 7));
        // QUEEN
        this.place(new queen_1.Queen(new color_1.Color("BLACK")), new position_1.Position(4, 0));
        this.place(new queen_1.Queen(new color_1.Color("WHITE")), new position_1.Position(4, 7));
    }
}
exports.DefaultBoard = DefaultBoard;
