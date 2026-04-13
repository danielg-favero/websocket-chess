import type { Coordinates } from "@websocket-chess/shared";

import { cn } from "@lib/utils";
import type { Board as TBoard, Game as TGame } from "@domain/models/game-model";
import type { Player as TPlayer } from "@domain/models/player.model";

import { useChessBoard } from "@hooks/use-chess-board";

import Cell from "./cell";
import Piece from "./piece";

interface IBoardProps {
  board: TBoard;
  game: TGame;
  player: TPlayer;
  onMove: (from: Coordinates, to: Coordinates) => void;
  onCapture: (from: Coordinates, to: Coordinates) => void;
}

function Board({ board, game, player, onMove, onCapture }: IBoardProps) {
  const { cellIsSelected, onCellClick } = useChessBoard(board, {
    onMove,
    onCapture,
  });

  const isPlayerTurn = player.color
    ? game.turn.value === player.color.value
    : false;

  return (
    <div
      className="
        bg-[linear-gradient(145deg,#2c2416_0%,#1a1410_100%)]
        p-4 sm:p-10
        rounded-lg
        shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]
        w-fit
      "
    >
      <div className="bg-[#1a1410] p-2 sm:p-5 rounded">
        <div
          className="
            grid
            grid-cols-[repeat(8,var(--cell-size))]
            grid-rows-[repeat(8,var(--cell-size))]
            border-2 sm:border-[3px] border-[#8b6914]
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
          "
        >
          {board.grid.map((row, y) =>
            row.map((cell, x) => (
              <Cell
                key={`${y}-${x}`}
                className={cn(
                  `${(y + x) % 2 === 0 ? "bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]" : "bg-[linear-gradient(135deg,#b58863_0%,#a07150_100%)]"}`,
                  cellIsSelected({ x, y }) && "border-2 border-blue-500",
                )}
                onClick={() => onCellClick({ x, y })}
                disabled={!isPlayerTurn}
              >
                {cell && <Piece color={cell.color.value} type={cell.type} />}
              </Cell>
            )),
          )}
        </div>
      </div>
    </div>
  );
}

export default Board;
