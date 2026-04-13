import { useCallback, useState } from "react";

import type { Board } from "@domain/models/game-model";

import type { Coordinates } from "@websocket-chess/shared";

interface UseChessBoardOptions {
  onMove: (from: Coordinates, to: Coordinates) => void;
  onCapture: (from: Coordinates, to: Coordinates) => void;
}

export const useChessBoard = (
  board: Board,
  { onMove, onCapture }: UseChessBoardOptions,
) => {
  const [selectedCell, setSelectedCell] = useState<Coordinates | null>(null);

  const onCellClick = (coordinates: Coordinates) => {
    if (selectedCell) {
      if (cellHasPiece(coordinates)) {
        handleCapture(coordinates);
      } else {
        handleMove(coordinates);
      }
    } else {
      setSelectedCell(coordinates);
    }
  };

  const handleMove = (coordinates: Coordinates) => {
    if (!selectedCell) return;

    onMove(selectedCell, coordinates);
    setSelectedCell(null);
  };

  const handleCapture = (coordinates: Coordinates) => {
    if (!selectedCell) return;

    onCapture(selectedCell, coordinates);
    setSelectedCell(null);
  };

  const cellHasPiece = useCallback(
    (coordinates: Coordinates) => {
      return board.grid[coordinates.y][coordinates.x] !== null;
    },
    [board],
  );

  const cellIsSelected = useCallback(
    (coordinates: Coordinates) => {
      if (!selectedCell) return false;

      return (
        selectedCell.x === coordinates.x && selectedCell.y === coordinates.y
      );
    },
    [selectedCell],
  );

  return {
    onCellClick,
    cellIsSelected,
  };
};
