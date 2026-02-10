import type { HTMLAttributes } from "react";

import type { TColor } from "@interfaces/color";

import type { TPieceType } from "@interfaces/piece";

import "./piece.css";

interface PieceProps extends HTMLAttributes<HTMLSpanElement> {
  color: TColor;
  type: TPieceType;
}

const PIECE_SYMBOLS = {
  WHITE: {
    KING: "♔",
    QUEEN: "♕",
    ROOK: "♖",
    BISHOP: "♗",
    KNIGHT: "♘",
    PAWN: "♙",
  },
  BLACK: {
    KING: "♚",
    QUEEN: "♛",
    ROOK: "♜",
    BISHOP: "♝",
    KNIGHT: "♞",
    PAWN: "♟",
  },
};

function Piece(props: PieceProps) {
  const { color, type, ...rest } = props;

  return (
    <span {...rest} className={`piece ${props.className}`}>
      {PIECE_SYMBOLS[color][type]}
    </span>
  );
}

export default Piece;
