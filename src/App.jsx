// src/App.jsx
import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Controls from "./components/Controls";
import Scoreboard from "./components/Scoreboard";
import Message from "./components/Message";
import { getPoints, evaluateGuess } from "./utils/GameLogic";
import "./styles.css";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

function App() {
  // játékállapotok
  const [words, setWords] = useState([]);
  const [solution, setSolution] = useState("");
  const [board, setBoard] = useState(
    Array.from({ length: MAX_GUESSES }, () => Array(WORD_LENGTH).fill(""))
  );
  const [cellStates, setCellStates] = useState(
    Array.from({ length: MAX_GUESSES }, () => Array(WORD_LENGTH).fill(""))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [scoreList, setScoreList] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  // virtuális billentyűzet színállapotai
  const [keyStates, setKeyStates] = useState({});
  // prioritás a billentyű színek felülírásához
  const priority = {
    absent: 0,
    almostpresent: 1,
    present: 2,
    almostcorrect: 3,
    correct: 4,
  };

  // light/dark mód body osztály
  useEffect(() => {
    document.body.classList.toggle("light", !darkMode);
  }, [darkMode]);

  // szavak betöltése a public/szolista.json-ból
  useEffect(() => {
    fetch("https://dns18.github.io/DontBeL8_szoleo/szolista.json")
      .then((res) => res.json())
      .then((data) => {
        setWords(data.szavak.map((w) => w.toLowerCase()));
      })
      .catch(() => console.error("Nem találom a /szolista.json fájlt!"));
  }, []);

  // új játék indítása, ha betöltődött a lista
  useEffect(() => {
    if (words.length) startGame();
  }, [words]);

  // játék indítása / reset
  const startGame = () => {
    const rand = words[Math.floor(Math.random() * words.length)];
    setSolution(rand);
    setBoard(
      Array.from({ length: MAX_GUESSES }, () => Array(WORD_LENGTH).fill(""))
    );
    setCellStates(
      Array.from({ length: MAX_GUESSES }, () => Array(WORD_LENGTH).fill(""))
    );
    setCurrentRow(0);
    setCurrentCol(0);
    setMessage("");
    setKeyStates({});
  };

  // feladás
  const giveUp = () => {
    setScoreList((prev) => [...prev, { word: solution, points: 0 }]);
    setMessage(`Feladtad! A szó: ${solution.toUpperCase()} | Pont: 0`);
  };

  // gombnyomás kezelése
  const handleKey = (key) => {
    // Backspace
    if (key === "Backspace") {
      if (currentCol > 0) {
        const b = board.map((r) => [...r]);
        b[currentRow][currentCol - 1] = "";
        setBoard(b);
        setCurrentCol((c) => c - 1);
      }
      return;
    }

    // Enter
    if (key === "Enter") {
      if (currentCol < WORD_LENGTH) {
        setMessage("Túl rövid!");
        return;
      }
      const guess = board[currentRow].join("");
      const result = evaluateGuess(guess, solution);

      // kirajzoljuk a cellákra a színeket
      const newCellStates = cellStates.map((r) => [...r]);
      newCellStates[currentRow] = result;
      setCellStates(newCellStates);

      // frissítjük a virtuális billentyűzet státuszát
      setKeyStates((old) => {
        const updated = { ...old };
        guess.split("").forEach((ch, i) => {
          const st = result[i];
          const prev = updated[ch] || "absent";
          if (priority[st] > priority[prev]) {
            updated[ch] = st;
          }
        });
        return updated;
      });

      // nyerés
      if (guess === solution) {
        const pts = getPoints(currentRow, MAX_GUESSES);
        setScore((s) => s + pts);
        setScoreList((list) => [...list, { word: solution, points: pts }]);
        setMessage(`Nyertél! A szó: ${solution.toUpperCase()} +${pts} pont`);
        return;
      }

      // vesztés
      if (currentRow + 1 === MAX_GUESSES) {
        setScoreList((list) => [...list, { word: solution, points: 0 }]);
        setMessage(
          `Vesztettél. A szó: ${solution.toUpperCase()} | Pont: 0`
        );
        return;
      }

      // következő sor
      setCurrentRow((r) => r + 1);
      setCurrentCol(0);
      setMessage("");
      return;
    }

    // betűk
    if (/^[a-zA-Záéíóöőúüű]$/.test(key)) {
      if (currentCol < WORD_LENGTH) {
        const b = board.map((r) => [...r]);
        b[currentRow][currentCol] = key.toLowerCase();
        setBoard(b);
        setCurrentCol((c) => c + 1);
      }
    }
  };

  // fizikai billentyűzet esemény
  useEffect(() => {
    const listener = (e) => {
      if (
        e.key === "Enter" ||
        e.key === "Backspace" ||
        /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]$/.test(e.key)
      ) {
        e.preventDefault();
        handleKey(e.key);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [board, currentRow, currentCol, solution]);

  return (
    <div className="wrap">
      <h1>Szóleó</h1>
      <div id="game">
        <Board board={board} cellStates={cellStates} />
        <Keyboard onKey={handleKey} keyStates={keyStates} />
        <Controls
          onNewGame={startGame}
          onGiveUp={giveUp}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((m) => !m)}
        />
        <Scoreboard scoreList={scoreList} score={score} />
        <Message text={message} />
      </div>
    </div>
  );
}

export default App;
