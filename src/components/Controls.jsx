import React from "react";

function Controls({ onNewGame, onGiveUp, darkMode, toggleDarkMode }) {
  return (
    <div className="controls">
      <button className="btn" onClick={onNewGame}>Új játék</button>
      <button className="btn" onClick={onGiveUp}>Feladom</button>
      <button className="btn" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>
      <button className="info-icon" tabIndex={0} aria-label="Játékinfó">ℹ️
        <span className="info-tooltip">
          Színek jelentése:<br />
          <span style={{ color:"#538d4e" }}>🟩 jó helyen jó betű</span><br />
          <span style={{ color:"#4ea3ff" }}>🟦 jó helyen lévő betű, de más ékezettel</span><br />
          <span style={{ color:"#b59f3b" }}>🟨 rossz helyen lévő jó betű</span><br />
          <span style={{ color:"#a36aff" }}>🟪 rossz helyen lévő betű, de más ékezettel</span><br />
          <span style={{ color:"#888888" }}>⬜️ nem szerepel a szóban</span>
        </span>
      </button>
    </div>
  );
}

export default Controls;
