import React from "react";

function Scoreboard({ scoreList, score }) {
  return (
    <div id="scoreboard">
      {scoreList.length === 0 ? (
        <em>Még nincs pontod.</em>
      ) : (
        <>
          <b>Pontok:</b>
          <ul style={{ marginTop: "6px" }}>
            {scoreList.map((item, i) => (
              <li key={i}>
                Játék {i + 1}: <b>{item.word.toUpperCase()}</b> —{" "}
                <span style={{ color: item.points > 0 ? "green" : "red" }}>
                  {item.points} pont
                </span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "8px" }}>
            <b>Összesen: {score} pont</b>
          </div>
        </>
      )}
    </div>
  );
}

export default Scoreboard;
