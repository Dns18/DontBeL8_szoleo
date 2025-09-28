// normalize: ékezetek eltávolítása
export const normalize = (char) =>
  char
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// pontszám kiszámítása
export const getPoints = (row, maxGuesses) => maxGuesses - row;

// a találgatás értékelése
export function evaluateGuess(guess, solution) {
  const length = guess.length;
  const result = Array(length).fill("absent");
  const solArr = solution.split("");
  const guessArr = guess.split("");

  // 1. kör: pontos egyezések (correct + almostcorrect)
  for (let i = 0; i < length; i++) {
    if (guessArr[i] === solArr[i]) {
      result[i] = "correct";
      solArr[i] = null;
    } else if (normalize(guessArr[i]) === normalize(solArr[i])) {
      result[i] = "almostcorrect";
      solArr[i] = null;
    }
  }

  // 2. kör: máshol szereplő betűk (present + almostpresent)
  for (let i = 0; i < length; i++) {
    if (result[i] !== "absent") continue;

    const idxExact = solArr.indexOf(guessArr[i]);
    if (idxExact !== -1) {
      result[i] = "present";
      solArr[idxExact] = null;
      continue;
    }

    const idxNorm = solArr.findIndex(
      (c) => c !== null && normalize(c) === normalize(guessArr[i])
    );
    if (idxNorm !== -1) {
      result[i] = "almostpresent";
      solArr[idxNorm] = null;
    }
  }

  return result;
}
