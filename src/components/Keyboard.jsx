import React from "react";

const KEYS = [
  ["q","w","e","r","t","z","u","i","o","p","ő","ú"],
  ["a","s","d","f","g","h","j","k","l","í","é","á","ű"],
  ["Enter","y","x","c","v","b","n","m","ö","ü","Backspace"]
];

function Keyboard({ onKey, keyStates }) {
  return (
    <div className="keyboard">
      {KEYS.map((row, rIdx) => (
        <div className="keyrow" key={rIdx}>
          {row.map((k) => {
            const stateClass = k.length === 1 ? keyStates[k] || "" : "";
            const wideClass = k === "Enter" || k === "Backspace" ? "wide" : "";
            return (
              <div
                key={`${rIdx}-${k}`}
                className={`key${stateClass ? " " + stateClass : ""}${wideClass ? " " + wideClass : ""}`}
                onClick={() => onKey(k)}
                role="button"
                tabIndex={0}
                aria-label={k}
              >
                {k.length > 1 ? k : k.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
