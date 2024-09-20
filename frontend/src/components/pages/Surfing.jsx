import React, { useState, useEffect } from 'react';
import '../styles/Surfing.scss';

const SurfingMiniGame = ({ birdImage }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [coins, setCoins] = useState([]);
  const [trickOpportunity, setTrickOpportunity] = useState(false);
  const [trickAttempts, setTrickAttempts] = useState(0);
  const [currentTrick, setCurrentTrick] = useState('');
  const [playerPosition, setPlayerPosition] = useState(1); // 0: left, 1: center, 2: right
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let interval;
    if (gameStarted && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 0.1, 100));
      }, 300); // Fills in 60 seconds
    }
    return () => clearInterval(interval);
  }, [gameStarted, progress]);

  useEffect(() => {
    if (progress >= 50 && progress < 100 && !trickOpportunity) {
      handleTrickOpportunity();
    }
    if (progress === 100) {
      endGame();
    }
  }, [progress]);

  useEffect(() => {
    if (gameStarted) {
      initializeGameElements();
      const obstacleInterval = setInterval(spawnObstacle, 2000);
      const coinInterval = setInterval(spawnCoin, 3000);
      return () => {
        clearInterval(obstacleInterval);
        clearInterval(coinInterval);
      };
    }
  }, [gameStarted]);

  const handleTrickOpportunity = () => {
    setTrickOpportunity(true);
    setObstacles([]);
    setCoins([]);
    setCurrentTrick('Press a, w, d, s in order!');
  };

  const endGame = () => {
    alert(`Nice shred! You scored ${score}`);
    resetGame();
  };

  const resetGame = () => {
    setGameStarted(false);
    setProgress(0);
    setScore(0);
    setObstacles([]);
    setCoins([]);
    setTrickOpportunity(false);
    setTrickAttempts(0);
    setCurrentTrick('');
    setPlayerPosition(1); // Reset player position to center
    setIsGameOver(false);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const initializeGameElements = () => {
    setObstacles([]); // Clear any existing obstacles
    setCoins([]);     // Clear any existing coins
  };

  const spawnObstacle = () => {
    if (progress < 100) {
      const newObstacle = {
        id: Date.now(),
        position: Math.floor(Math.random() * 3), // 0, 1, 2 for tracks
        size: 20, // Initial size
      };
      setObstacles((prev) => [...prev, newObstacle]);
    }
  };

  const spawnCoin = () => {
    if (progress < 100) {
      const newCoin = {
        id: Date.now() + Math.random(),
        position: Math.floor(Math.random() * 3), // 0, 1, 2 for tracks
        size: 15, // Initial size
      };
      setCoins((prev) => [...prev, newCoin]);
    }
  };

  const handleTrickInput = (event) => {
    const key = event.key;
    const trickSequence = ['a', 'w', 'd', 's'];
    
    // Check for trick opportunity input
    if (trickOpportunity) {
      if (trickSequence[trickAttempts] === key) {
        setTrickAttempts((prev) => prev + 1);
        setScore((prev) => prev + 20);
        showTrickMessage(trickAttempts);
      }
      if (trickAttempts === 3) {
        setTrickOpportunity(false); // Reset trick opportunity
        setTrickAttempts(0); // Reset attempts for the next trick opportunity
        alert("Trick opportunity finished! Keep surfing!");
      }
    }
  };

  const showTrickMessage = (attempt) => {
    const messages = ["Cool flip!", "Woah!!", "Kowabunga!", "RADICAL!!", "NO WAY!!! 0o0"];
    alert(messages[attempt % messages.length]);
  };

  const handlePlayerMovement = (event) => {
    if (event.key === 'a' && playerPosition > 0) {
      setPlayerPosition((prev) => prev - 1); // Move left
    } else if (event.key === 'd' && playerPosition < 2) {
      setPlayerPosition((prev) => prev + 1); // Move right
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleTrickInput);
    window.addEventListener('keydown', handlePlayerMovement);
    return () => {
      window.removeEventListener('keydown', handleTrickInput);
      window.removeEventListener('keydown', handlePlayerMovement);
    };
  }, [trickOpportunity, playerPosition]);

  return (
    <div className="surfing-game">
      {!gameStarted ? (
        <div className="start-menu">
          <h2>Instructions: Use a, w, d, s for tricks!</h2>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
            <img src={birdImage} alt="Surfboard" className="surfboard-icon" />
          </div>
          <h3>Score: {score}</h3>
          {trickOpportunity && <div className="trick-popup">{currentTrick}</div>}
          {/* Render obstacles */}
          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              className="obstacle"
              style={{
                left: `${obstacle.position * 33}%`, // 3 tracks, 33% each
                width: `${obstacle.size}px`,
                height: `${obstacle.size}px`,
                animation: 'moveDown 2s linear',
                transform: 'scale(' + (1 + (100 - progress) / 100) + ')', // Grow as it descends
              }}
            />
          ))}
          {/* Render coins */}
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="coin"
              style={{
                left: `${coin.position * 33}%`, // 3 tracks, 33% each
                width: `${coin.size}px`,
                height: `${coin.size}px`,
                animation: 'moveDown 2s linear',
                transform: 'scale(' + (1 + (100 - progress) / 100) + ')', // Grow as it descends
              }}
            />
          ))}
          {/* Player representation */}
          <div className={`player track-${playerPosition}`}></div>
        </div>
      )}
      {isGameOver && (
        <div className="game-over-popup">
          <h2>Game Over</h2>
          <p>Your score: {score}</p>
          <button onClick={resetGame}>Retry</button>
          <button onClick={() => window.location.href = '/'}>Menu</button>
        </div>
      )}
    </div>
  );
};

export default SurfingMiniGame;
