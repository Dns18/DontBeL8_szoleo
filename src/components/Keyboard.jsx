import React from "react";

const KEYS = [
  ["q","w","e","r","t","z","u","i","o","p","ő","ú"],
  ["a","s","d","f","g","h","j","k","l","í","é","á","ű"],
  ["Enter","y","x","c","v","b","n","m","ö","ü","Backspace"]
];

function Keyboard({ onKey }) {
  return (
    <div className="keyboard">
      {KEYS.map((row, rIdx) => (
        <div className="keyrow" key={rIdx}>
          {row.map((k) => (
            <div
              key={k}
              className={`key ${k === "Enter" || k === "Backspace" ? "wide" : ""}`}
              onClick={() => onKey(k)}
            >
              {k.length > 1 ? k : k.toUpperCase()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
