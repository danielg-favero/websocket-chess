import type { Board as TBoard, Game as TGame } from "@domain/models/game-model";
import type { Player as TPlayer } from "@domain/models/player.model";

import Cell from "./cell";
import Piece from "./piece";

interface IBoardProps {
  board: TBoard;
  game: TGame;
  player: TPlayer;
}

function Board({ board, game, player }: IBoardProps) {
  console.log({ board, game, player });
  return (
    <div
      className="
        bg-[linear-gradient(145deg,#2c2416_0%,#1a1410_100%)]
        p-10
        rounded-lg
        shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]
      "
    >
      <div className="bg-[#1a1410] p-5 rounded">
        <div
          className="
            grid
            grid-cols-[repeat(8,60px)]
            grid-rows-[repeat(8,60px)]
            border-[3px] border-[#8b6914]
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
          "
        >
          {board.grid.map((row, y) =>
            row.map((cell, x) => (
              <Cell
                key={`${y}-${x}`}
                className={`${(y + x) % 2 === 0 ? "bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]" : "bg-[linear-gradient(135deg,#b58863_0%,#a07150_100%)]"}`}
                disabled={
                  player.color ? game.turn.value !== player.color.value : false
                }
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
