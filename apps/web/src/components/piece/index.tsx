import type { HTMLAttributes } from "react";

import type { TPieceType, TColorValue } from "@websocket-chess/shared";

import "./piece.css";

interface PieceProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  color: TColorValue;
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
