import './index.css'
import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
import Header from './Header';
import Footer from './Footer';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [playerXColor, setPlayerXColor] = useState('red');
  const [playerOColor, setPlayerOColor] = useState('green');
  const [scoreX, setScoreX] = useState(0); // Score for player X
  const [scoreO, setScoreO] = useState(0); // Score for player O
  const [roundNumber, setRoundNumber] = useState();

  const handleCellClick = (index) => {
    if (calculateWinner(board) || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      if (winner === 'X') {
        setScoreX((prevScoreX) => prevScoreX + 1);
      } else if (winner === 'O') {
        setScoreO((prevScoreO) => prevScoreO + 1);
      }
    }

    setIsXNext(!isXNext);
  };

  const handleRestartClick = () => {
    setBoard(initialBoard);
    setIsXNext(roundNumber % 2 === 1); // Set the next player based on round number
    setRoundNumber(roundNumber + 1); // Increment the round number
  };

  const renderCell = (index) => {
    const cellValue = board[index];
    const cellClass = cellValue === 'X' ? `cell x-cell` : cellValue === 'O' ? `cell o-cell` : 'cell';

    return (
      <div
        className={cellClass}
        onClick={() => handleCellClick(index)}
        style={{
          backgroundColor: cellValue === 'X' ? playerXColor : cellValue === 'O' ? playerOColor : 'transparent',
          color: cellValue === 'X' ? 'white' : cellValue === 'O' ? 'white' : 'black',
        }}
      >
        {cellValue}
      </div>
    );
  };

  const isBoardFull = board.every((cell) => cell !== null);

  const handleStartGame = (xName, oName, xColor, oColor) => {
    setPlayerXName(xName);
    setPlayerOName(oName);
    setPlayerXColor(xColor);
    setPlayerOColor(oColor);
    setIsGameStarted(true);
    setRoundNumber(0); // Reset the round number to 0 when starting the game
  };

  const calculateWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  return (
    <div className="app">
      {!isGameStarted ? (
        <>
          <Header/>
          <WelcomePage
            onStartGame={handleStartGame}
            defaultPlayerXColor={playerXColor}
            defaultPlayerOColor={playerOColor}
          />
          <Footer/>
        </>
      ) : (
        <>
          <div className='score'>
            <span style={{ color: playerXColor }}> {playerXName}: {scoreX} </span>
            <span style={{ color: 'white', fontWeight: 'bold' }}> {' - '} </span>
            <span style={{ color: playerOColor }}> {playerOName}: {scoreO} </span>
          </div>

          <div className='board'>
            {board.map((cell, index) => (
              <React.Fragment key={index}>{renderCell(index)}</React.Fragment>
            ))}
          </div>

          <div className='status'>          
            {calculateWinner(board) ? ( 
                <span style={{color: 'white'}}> Winner:{' '}
                  <span style={{ color: calculateWinner(board) === 'X' ? playerXColor : playerOColor }}>
                    {calculateWinner(board) === 'X' ? playerXName : playerOName}
                  </span>
                </span>
            ) : isBoardFull ? (
              <span  style={{color: 'white'}}>"It's a draw!"</span>
            ) : (
            <span style={{color: 'white'}}>
              <span style={{ color: isXNext ? playerXColor : playerOColor }}>
                {isXNext ? playerXName : playerOName}'s
              </span>
              {' turn'}
            </span>
            )}
          </div>

          {(calculateWinner(board) || isBoardFull) && (
            <button className='restart-btn' onClick={handleRestartClick}>
              Next Round
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;