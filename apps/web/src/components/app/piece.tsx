import type { HTMLAttributes } from "react";

import type { TPieceType, TColorValue } from "@websocket-chess/shared";
import { cn } from "@lib/utils";

interface PieceProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  color: TColorValue;
  type: TPieceType;
}

const PIECE_SYMBOLS: Record<TColorValue, Record<TPieceType, string>> = {
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
    <span {...rest} className={cn("select-none", props.className)}>
      {PIECE_SYMBOLS[color][type]}
    </span>
  );
}

export default Piece;
