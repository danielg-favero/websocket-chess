import type { Coordinates } from "@danielg.favero/websocket-chess-package";
import type { IGameRoomState } from "@danielg.favero/websocket-chess-package";

import { useCallback, useState } from "react";

import Cell from "@components/cell";
import Piece from "@components/piece";

import { useChessGame } from "@hooks/use-chess-game";

import "./board.css";

interface BoardProps {
  gameRoomState: IGameRoomState;
}

function Board({ gameRoomState }: BoardProps) {
  const { movePiece } = useChessGame();
  const [selectedCell, setSelectedCell] = useState<Coordinates | null>(null);
  const { gameState } = gameRoomState;
  const { board } = gameState;

  const handleCellClick = (coordinates: Coordinates) => {
    if (selectedCell) {
      handleMovePiece(coordinates);
    } else {
      handleCellSelect(coordinates);
    }
  };

  const handleCellSelect = (coordinates: Coordinates) => {
    setSelectedCell(coordinates);
  };

  const isCellSelected = useCallback(
    (coordinates: Coordinates) => {
      if (!selectedCell) return false;

      return (
        selectedCell.x === coordinates.x && selectedCell.y === coordinates.y
      );
    },
    [selectedCell],
  );

  const handleMovePiece = (to: Coordinates) => {
    if (!selectedCell) return;

    movePiece({
      gameId: gameRoomState.id,
      from: selectedCell,
      to,
    });
    setSelectedCell(null);
  };

  return (
    <div className="chess-board-container">
      <div className="chess-board-wrapper">
        <div className="chess-board" id="board">
          {board.map((row, y) =>
            row.map((cell, x) => (
              <Cell
                key={`${y}-${x}`}
                className={`${(y + x) % 2 === 0 ? "light" : "dark"} ${isCellSelected({ x, y }) ? "selected" : ""}`}
                onClick={() => handleCellClick({ x, y })}
              >
                {cell && <Piece color={cell.color} type={cell.type} />}
              </Cell>
            )),
          )}
        </div>
      </div>
    </div>
  );
}

export default Board;
