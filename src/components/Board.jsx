import React from "react";

function Board({ board, cellStates }) {
  return (
    <div className="board">
      {board.map((row, rIdx) => (
        <div className="row" key={rIdx}>
          {row.map((cell, cIdx) => (
            <div className={`tile ${cellStates[rIdx][cIdx]}`} key={cIdx}>
              {cell.toUpperCase()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
