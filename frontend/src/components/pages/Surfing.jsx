import React, { useState, useEffect } from 'react';
import '../styles/Surfing.scss';
import BirdImage from "../BirdImage";

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
  const [trickMessages, setTrickMessages] = useState([]);

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
      const position = Math.floor(Math.random() * 3); // Random track
      const newObstacle = {
        id: Date.now() + Math.random(),
        position: position,
        size: 20,
        bottom: window.innerHeight, // Start from the top
      };
      setObstacles((prev) => [...prev, newObstacle]);
    }
  };

  const spawnCoin = () => {
    if (progress < 100) {
      const position = Math.floor(Math.random() * 3); // Random track
      const newCoin = {
        id: Date.now() + Math.random(),
        position: position,
        size: 15,
        bottom: window.innerHeight, // Start from the top
      };
      setCoins((prev) => [...prev, newCoin]);
    }
  };

  const handleTrickInput = (event) => {
    const key = event.key;
    const trickSequence = ['a', 'w', 'd', 's'];

    if (trickOpportunity) {
      if (trickSequence[trickAttempts] === key) {
        setTrickAttempts((prev) => prev + 1);
        setScore((prev) => prev + 20);
        showTrickMessage(trickAttempts);
      }
      if (trickAttempts === 3) {
        setTrickOpportunity(false); // Reset trick opportunity
        setTrickAttempts(0); // Reset attempts for the next trick opportunity
        setTrickMessages((prev) => [...prev, "Trick opportunity finished! Keep surfing!"]);
      }
    }
  };

  const showTrickMessage = (attempt) => {
    const messages = ["Cool flip!", "Woah!!", "Kowabunga!", "RADICAL!!", "NO WAY!!! 0o0"];
    setTrickMessages((prev) => [...prev, messages[attempt % messages.length]]);
  };

  const handlePlayerMovement = (event) => {
    if (event.key === 'a' && playerPosition > 0) {
      setPlayerPosition((prev) => prev - 1); // Move left
    } else if (event.key === 'd' && playerPosition < 2) {
      setPlayerPosition((prev) => prev + 1); // Move right
    }
  };

  useEffect(() => {
    const moveElements = () => {
      setObstacles((prev) =>
        prev.map((obstacle) => ({
          ...obstacle,
          bottom: obstacle.bottom - 2 // Move down
        }))
        .filter(obstacle => {
          if (obstacle.bottom < -50) return false; // Remove off-screen obstacles
          if (isCollision(obstacle)) {
            setScore((prev) => prev - 5); // Penalty for hitting obstacle
            return false; // Remove obstacle on collision
          }
          return true;
        })
      );

      setCoins((prev) =>
        prev.map((coin) => ({
          ...coin,
          bottom: coin.bottom - 2 // Move down
        }))
        .filter(coin => {
          if (coin.bottom < -50) return false; // Remove off-screen coins
          if (isCollision(coin)) {
            setScore((prev) => prev + 5); // Reward for collecting coin
            return false; // Remove coin on collection
          }
          return true;
        })
      );
    };

    const moveInterval = setInterval(moveElements, 100);
    return () => clearInterval(moveInterval);
  }, [obstacles, coins, playerPosition]);

  const isCollision = (element) => {
    const playerElement = {
      left: playerPosition * (window.innerWidth / 3), // Centered position
      right: playerPosition * (window.innerWidth / 3) + 50, // Fixed width of player
      bottom: 50, // Fixed bottom position of player
    };
    
    const elementPosition = {
      left: element.position * (window.innerWidth / 3), // Centered position of element
      right: element.position * (window.innerWidth / 3) + element.size, // Width of element
      bottom: element.bottom,
    };

    return (
      playerElement.right > elementPosition.left &&
      playerElement.left < elementPosition.right &&
      playerElement.bottom > elementPosition.bottom
    );
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
        <div className="game-area">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
          <h3>Score: {score}</h3>
          {/* Render trick messages */}
          {trickMessages.map((message, index) => (
            <div key={index} className="trick-popup" style={{ top: `${Math.random() * 80 + 10}px`, left: `${Math.random() * 90}%` }}>
              {message}
            </div>
          ))}
          {/* Render obstacles */}
          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              className={`obstacle track-${obstacle.position}`}
              style={{
                width: `${obstacle.size}px`,
                height: `${obstacle.size}px`,
                bottom: `${obstacle.bottom}px`,
                left: `${obstacle.position * (window.innerWidth / 3) + (window.innerWidth / 6) - (obstacle.size / 2)}px`, // Centered position
              }}
            />
          ))}
          {/* Render coins */}
          {coins.map((coin) => (
            <div
              key={coin.id}
              className={`coin track-${coin.position}`}
              style={{
                width: `${coin.size}px`,
                height: `${coin.size}px`,
                bottom: `${coin.bottom}px`,
                left: `${coin.position * (window.innerWidth / 3) + (window.innerWidth / 6) - (coin.size / 2)}px`, // Centered position
              }}
            />
          ))}
          {/* Render player */}
          <div
            className="player"
            style={{
              position: 'absolute',
              bottom: '50px', // Adjust for your desired height
              left: `${playerPosition * (window.innerWidth / 3) + (window.innerWidth / 6) - 25}px`, // Centered position
              width: '50px',
              height: '50px',
            }}
          >
            <BirdImage
              style={{
                maxWidth: '50px',
                maxHeight: '50px',
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 1,
              }}
              birdImage={birdImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SurfingMiniGame;
