import { useState } from 'react';

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
    if (playerXName.trim() !== '' && playerOName.trim() !== '' && playerXColor.trim() !== '' && playerOColor.trim() !== '') {
      onStartGame(playerXName, playerOName, playerXColor, playerOColor);
    } else {
      alert('Please enter names and select colors for both players before starting the game.');
    }
  };

  const handleColorSelection = (color, player) => {
    if (player === 'X') {
      setPlayerXColor(color);
    } else if (player === 'O') {
      setPlayerOColor(color);
    }
  };

  return (
    <div className='welcome-page'>
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
      </div>
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
      </div>
      <button onClick={handleStartGame} disabled={!playerXName.trim() || !playerOName.trim()}>
        Start Game
      </button>
    </div>
  );
};

export default WelcomePage;