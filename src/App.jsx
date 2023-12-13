import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti' // Lanzar confetti para el ganador.
import { Square } from './components/Square.jsx'
import { turns } from './constants.js'
import { checkEndGame, checkWinner } from './functionsUsed.js'
import { saveGameToStorage, resetGameStorage, initializeBoardState } from './logic/storage/index.js'

function App() {
  
  // Inicializo el estado con el contenido del localStorage, si existe, o, en caso contrario, 
  // con un arreglo de 9 posiciones, todas en null. Ver definicion de la funcion initializeBoardState().
  const [board, setBoard] = useState(initializeBoardState())
  
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn') 
    return turnFromStorage ?? turns.x // ?? mira si turnFromStorage es null o undefined. Pero || mira si turnFromStorage es falso.
  })

  // null es que no hay un ganador, false es empate.
  const [winner, setWinner] = useState(null) 

  const updateBoard = (index) => {
    // No poner un valor, al clickear, donde ya existe alguno o si hay un ganador.
    if (board[index] || winner) return

    // Actualizar el tablero.
    const newBoard = [...board]
    newBoard[index] = turn // x u o
    setBoard(newBoard)

    // Cambiar el turno.
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)

    // save game in localStorage
    saveGameToStorage({ board: newBoard, turn: newTurn })

    // You review if there's a winner.
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti() // lanzo confetti para el ganador.
      setWinner(newWinner) // x u o
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)

    // remove board and turn of the localStorage
    resetGameStorage()
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className='game'>

        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
              
            )
          })
        }
        
      </section>

      <section className='turn'>

        <Square isSelected={turn === turns.x}>
          {turns.x}
        </Square>

        <Square isSelected={turn === turns.o}>
          {turns.o}
        </Square>

      </section>

      {/* Renderizado condicional. */}
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner == false ? 'Tie' : 'Won:'
                }
              </h2>
    
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
    
              <footer>
                <button onClick={resetGame}>Start again</button>
              </footer>
            </div>
          </section>
        )
      }

    </main>
  )
}

export default App