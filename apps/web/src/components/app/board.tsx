import Cell from "./cell";
import Piece from "./piece";

function Board() {
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
            grid-cols-[repeat(8,70px)]
            grid-rows-[repeat(8,70px)]
            border-[3px] border-[#8b6914]
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
          "
        >
          {/* Row 0 - Black major pieces */}
          <Cell className="bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]">
            <Piece color="BLACK" type="ROOK" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]">
            <Piece color="BLACK" type="KNIGHT" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]">
            <Piece color="BLACK" type="BISHOP" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]">
            <Piece color="BLACK" type="QUEEN" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]">
            <Piece color="BLACK" type="KING" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]">
            <Piece color="BLACK" type="BISHOP" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]">
            <Piece color="BLACK" type="KNIGHT" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]">
            <Piece color="BLACK" type="ROOK" />
          </Cell>

          {/* Row 1 - Black pawns */}
          {Array.from({ length: 8 }).map((_, i) => (
            <Cell
              key={`bp-${i}`}
              className={
                i % 2 === 0
                  ? "bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]"
                  : "bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]"
              }
            >
              <Piece color="BLACK" type="PAWN" />
            </Cell>
          ))}

          {/* Rows 2–5 empty */}
          {Array.from({ length: 32 }).map((_, i) => {
            const isLight = Math.floor(i / 8) % 2 === i % 2;
            return (
              <Cell
                key={`empty-${i}`}
                className={
                  isLight
                    ? "bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]"
                    : "bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]"
                }
              />
            );
          })}

          {/* Row 6 - White pawns */}
          {Array.from({ length: 8 }).map((_, i) => (
            <Cell
              key={`wp-${i}`}
              className={
                i % 2 === 0
                  ? "bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]"
                  : "bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]"
              }
            >
              <Piece color="WHITE" type="PAWN" />
            </Cell>
          ))}

          {/* Row 7 - White major pieces */}
          <Cell className="bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]">
            <Piece color="WHITE" type="ROOK" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]">
            <Piece color="WHITE" type="KNIGHT" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]">
            <Piece color="WHITE" type="BISHOP" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]">
            <Piece color="WHITE" type="QUEEN" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]">
            <Piece color="WHITE" type="KING" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]">
            <Piece color="WHITE" type="BISHOP" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#b58863_0%,#a47a5a_100%)]">
            <Piece color="WHITE" type="KNIGHT" />
          </Cell>
          <Cell className="bg-[linear-gradient(135deg,#f0d9b5_0%,#e8d4a8_100%)]">
            <Piece color="WHITE" type="ROOK" />
          </Cell>
        </div>
      </div>
    </div>
  );
}

export default Board;
