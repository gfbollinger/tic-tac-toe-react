import { useState } from 'react'
import './App.css'
import '@fontsource-variable/nunito-sans';

const grid = Array.from(Array(9).keys())
const winningCombinations = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState<string[]>([])
  const [isNextX, setIsNextX] = useState<boolean>(true)
  const [winner, setWinner] = useState<'X' | 'O' | undefined>()
  const [winningLine, setWinningLine] = useState<number[]>([])

  function handleClick(cell:number){
    if (board[cell] || winner){
      return
    }

    const updatedBoard = [...board]
    updatedBoard[cell] = isNextX ? 'X' : 'O'
    setBoard(updatedBoard)
    setIsNextX(!isNextX)

    calculateWinner(updatedBoard)
  }

  function calculateWinner(board:string[]){
    for(let i=0; i<= winningCombinations.length-1; i++){
      const[a, b, c] = winningCombinations[i]
      if (board[a] && board[b] && board[c] && board[a] === board[b] && board[a] === board[c]){
        const winner = isNextX ? 'X' : 'O'
        setWinner(winner)
        setWinningLine([a, b, c])
      }
    }
    return
  }

  function restart(){
    setBoard([])
    setWinner(undefined)
    setWinningLine([])
    setIsNextX(true)
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="game-grid">
        {
          grid.map((i) =>
            <button
              className={`cell ${winningLine && winningLine.includes(i) ? 'highlighted' : '' }`}
              key={i}
              onClick={() => handleClick(i)}
            >
              <div className={`gradient-text gradient-text-${board[i]}`}>{board[i]}</div>
            </button>
          )
        }
      </div>
      <p>
        { winner && 
          <>Winner is: <strong>{winner}</strong></>
        }
        { !winner && 
          <>Next turn: <strong>{ isNextX ? 'X' : 'O' }</strong></> 
        }
      </p>
      <button className='restart' onClick={restart}>Start Again</button>
    </>
  )
}

export default App
