export const saveGameToStorage = ({ board, turn }) => {

  // JSON.stringify convierte a board en un objeto (array), para que se envie asi para el localStorage (setItem).
  window.localStorage.setItem('board', JSON.stringify(board)) 

  window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {

  // elimina en contenido del localStorage (board y turn especificamente). 
  // Con window.localStorage.clear eliminaria todo lo que hay en el localStorage.
  window.localStorage.removeItem('board') 
  window.localStorage.removeItem('turn') 
}


export const initializeBoardState = () => { 
  const boardFromStorage = window.localStorage.getItem('board') 
  
  // JSON.parse convierte el string que se lee del localStorage (getItem) en un objeto (array).
  return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null) 
}