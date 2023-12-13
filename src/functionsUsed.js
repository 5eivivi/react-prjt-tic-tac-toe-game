import { winnerCombinations } from "./constants"

export const checkEndGame = (newBoard) => {
  // revisa si hay un empate
  // si no hay espacios vacios en el tablero
  // square ['x', 'o', 'o', 'x', 'o', 'x', 'o', 'x', 'o'] every = todas las celdas esten llenas y diferentes de null.
  return newBoard.every((square) => square !== null) 
}

export const checkWinner = (boardToCheck) => {
  // I review all winning combinations for I know if X or O won.
  for (const combination of winnerCombinations) {
    const [a, b, c] = combination
    if (
      boardToCheck[a] && // 0 -> x u o
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck [c]
    ) {
      return boardToCheck[a] // x u o won
    }
  }

  // If I don't have a winner.
  return null
}