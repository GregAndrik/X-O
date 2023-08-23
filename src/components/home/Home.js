import { useState } from 'react';
import './home.css';

function ColorButton ({ color, isSelected, onClick }) {
  return (
    <button
      className={`color-button ${isSelected ? 'selected' : ''}`}
      style={{ backgroundColor: color }}
      onClick={() => onClick(color)}
    ></button>
  );
};

const WelcomePage = ({ onStartGame }) => {
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [playerXColor, setPlayerXColor] = useState(''); // Default color for X
  const [playerOColor, setPlayerOColor] = useState(''); // Default color for O
  const [isPlayerXReady, setIsPlayerXReady] = useState(false);
  const [isPlayerOReady, setIsPlayerOReady] = useState(false);

  const availableColors = [
    'yellow',
    'orange',
    'red',
    'pink',
    'orchid',
    'purple',
    'blue',
    'cyan',
    'green',
    'brown',
    'grey',
    'black'
  ];

  const handleStartGame = () => {
    if (isPlayerXReady && isPlayerOReady) {
      onStartGame(playerXName, playerOName, playerXColor, playerOColor);
    } else {
      alert("Both players need to be ready before starting the game.");
    }
  };

  const handleColorSelection = (color, player) => {
    if (player === 'X') {
      setPlayerXColor(color);
    } else if (player === 'O') {
      setPlayerOColor(color);
    }
  };

  const handlePlayerXReady = () => {
    setIsPlayerXReady(true);
  };

  const handlePlayerOReady = () => {
    setIsPlayerOReady(true);
  };

  return (
    <div className='main-container'>
      <div className='home-container'>
        {!isPlayerXReady && !isPlayerOReady && (
          <div className='player-input'>
            <label>
              Player X Name & color
              <input type='text' maxLength={20} value={playerXName} onChange={(e) => setPlayerXName(e.target.value)} />
            </label>
            <div className='color-selection'>
              {availableColors.map((color) => (
                <ColorButton
                  key={color}
                  color={color}
                  isSelected={playerXColor === color}
                  onClick={(color) => handleColorSelection(color, 'X')}
                />
              ))}
            </div>
            <button className='home-button' onClick={handlePlayerXReady} disabled={!playerXName.trim() || !playerXColor.trim() || isPlayerXReady}>
              Player X Ready
            </button>
          </div>
        )}

        {!isPlayerOReady && isPlayerXReady && (
          <div className='player-input'>
          <label>
            Player O Name & color
            <input type='text' maxLength={20} value={playerOName} onChange={(e) => setPlayerOName(e.target.value)} />
          </label>
          <div className='color-selection'>
            {availableColors.map((color) => (
              <ColorButton
                key={color}
                color={color}
                isSelected={playerOColor === color}
                onClick={(color) => handleColorSelection(color, 'O')}
              />
            ))}
          </div>
          <button className='home-button' onClick={handlePlayerOReady} disabled={!playerOName.trim() || !playerOColor.trim() || isPlayerOReady}>
            Player O Ready
          </button>
        </div>
        )}

        {isPlayerXReady && isPlayerOReady && (
          <button className='start-button' onClick={handleStartGame} disabled={!isPlayerXReady || !isPlayerOReady}>
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;