import React, { useState, useEffect } from "react";
import "../styles/Surfing.scss";
import surfBird from "../../assets/images/surfBird.png";
import coinPic from "../../assets/images/seratonin-coin.png";
import obstaclePic from "../../assets/images/rock.png";


const SurfingMiniGame = ({ birdImage }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [coins, setCoins] = useState([]);
  const [trickOpportunity, setTrickOpportunity] = useState(false);
  const [trickAttempts, setTrickAttempts] = useState(0);
  const [currentTrick, setCurrentTrick] = useState("");
  const [playerPosition, setPlayerPosition] = useState(1); 
  const [isGameOver, setIsGameOver] = useState(false);
  const [trickMessages, setTrickMessages] = useState([]);
  const [targetPosition, setTargetPosition] = useState(1);

  // 1. Make the game shorter by increasing the progress increment
  useEffect(() => {
    let interval;
    if (gameStarted && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 0.5, 100)); // Increase by 0.5 instead of 0.1
      }, 300); // Keep the interval the same, but we are progressing faster
    }
    return () => clearInterval(interval);
  }, [gameStarted, progress]);

  useEffect(() => {
    if (progress >= 95 && !trickOpportunity) {
      handleTrickOpportunity();
    }
    if (progress === 100) {
      endGame();
    }
  }, [progress]);

  useEffect(() => {
    if (gameStarted) {
      initializeGameElements();
      // 2. Reduce obstacle frequency by increasing interval to 4000ms (4 seconds)
      const obstacleInterval = setInterval(spawnObstacle, 4000);
      const coinInterval = setInterval(spawnCoin, 3000); 
      return () => {
        clearInterval(obstacleInterval);
        clearInterval(coinInterval);
      };
    }
  }, [gameStarted]);

  const handleTrickOpportunity = () => {
    setObstacles([]); 
    setCoins([]); 
    setTrickOpportunity(true);
    setCurrentTrick("Press a, w, d, s in order!");
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
    setCurrentTrick("");
    setTargetPosition(1); 
    setIsGameOver(false);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const initializeGameElements = () => {
    setObstacles([]);
    setCoins([]);
  };

  // Keeps the same logic for obstacle and coin spawning
  const spawnObstacle = () => {
    if (progress < 100) {
      const position = Math.floor(Math.random() * 3);
      const newObstacle = {
        id: Date.now() + Math.random(),
        position: position,
        size: 90,
        bottom: window.innerHeight,
        image: obstaclePic,
      };
      setObstacles((prev) => [...prev, newObstacle]);
    }
  };

  const spawnCoin = () => {
    if (progress < 100) {
      const position = Math.floor(Math.random() * 3);
      const newCoin = {
        id: Date.now() + Math.random(),
        position: position,
        size: 60,
        bottom: window.innerHeight,
      };
      setCoins((prev) => [...prev, newCoin]);
    }
  };

  const handleTrickInput = (event) => {
    const key = event.key;
    const trickSequence = ["a", "w", "d", "s"];

    if (trickOpportunity) {
      if (trickSequence[trickAttempts] === key) {
        setTrickAttempts((prev) => prev + 1);
        setScore((prev) => prev + 20);
        showTrickMessage(trickAttempts);
      }
      if (trickAttempts === 3) {
        setTrickOpportunity(false);
        setTrickAttempts(0);
        setTrickMessages((prev) => [
          ...prev,
          "Trick opportunity finished! Keep surfing!",
        ]);
      }
    }
  };

  const handlePlayerMovement = (event) => {
    if (event.key === "a" && targetPosition > 0) {
      setTargetPosition((prev) => prev - 1); // Move left
    } else if (event.key === "d" && targetPosition < 2) {
      setTargetPosition((prev) => prev + 1); // Move right
    }
  };

  useEffect(() => {
    const moveElements = () => {
      setObstacles((prev) =>
        prev
          .map((obstacle) => ({
            ...obstacle,
            bottom: obstacle.bottom - 2,
          }))
          .filter((obstacle) => {
            if (obstacle.bottom < -50) return false;
            if (isCollision(obstacle)) {
              setScore((prev) => prev - 5);
              return false;
            }
            return true;
          })
      );

      setCoins((prev) =>
        prev
          .map((coin) => ({
            ...coin,
            bottom: coin.bottom - 2,
          }))
          .filter((coin) => {
            if (coin.bottom < -50) return false;
            if (isCollision(coin)) {
              setScore((prev) => prev + 5);
              return false;
            }
            return true;
          })
      );
    };

    const moveInterval = setInterval(moveElements, 100);
    return () => clearInterval(moveInterval);
  }, [obstacles, coins]);

  useEffect(() => {
    const animateMovement = () => {
      if (playerPosition !== targetPosition) {
        setPlayerPosition((prev) => {
          const step = prev < targetPosition ? 0.1 : -0.1;
          const newPos = prev + step;
          return Math.abs(newPos - targetPosition) < 0.1
            ? targetPosition
            : newPos;
        });
      }
    };

    const movementInterval = setInterval(animateMovement, 20);
    return () => clearInterval(movementInterval);
  }, [targetPosition, playerPosition]);

  const isCollision = (element) => {
    const playerElement = {
      left: playerPosition * (window.innerWidth / 3),
      right: playerPosition * (window.innerWidth / 3) + 50,
      bottom: 50,
    };

    const elementPosition = {
      left: element.position * (window.innerWidth / 3),
      right: element.position * (window.innerWidth / 3) + element.size,
      bottom: element.bottom,
    };

    return (
      playerElement.right > elementPosition.left &&
      playerElement.left < elementPosition.right &&
      playerElement.bottom > elementPosition.bottom
    );
  };

  useEffect(() => {
    window.addEventListener("keydown", handleTrickInput);
    window.addEventListener("keydown", handlePlayerMovement);
    return () => {
      window.removeEventListener("keydown", handleTrickInput);
      window.removeEventListener("keydown", handlePlayerMovement);
    };
  }, [trickOpportunity]);

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
          {trickMessages.map((message, index) => (
            <div
              key={index}
              className="trick-popup"
              style={{
                top: `${Math.random() * 80 + 10}px`,
                left: `${Math.random() * 90}%`,
              }}
            >
              {message}
            </div>
          ))}
          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              className={`obstacle track-${obstacle.position}`}
              style={{
                width: `${obstacle.size}px`,
                height: `${obstacle.size}px`,
                bottom: `${obstacle.bottom}px`,
                left: `${
                  obstacle.position * (window.innerWidth / 3) +
                  window.innerWidth / 6 -
                  obstacle.size / 2
                }px`,
                backgroundImage: `url(${obstacle.image})`, // Use the obstacle image
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
              }}
            />
          ))}
          {coins.map((coin) => (
            <div
              key={coin.id}
              className={`coin track-${coin.position}`}
              style={{
                width: `${coin.size}px`,
                height: `${coin.size}px`,
                bottom: `${coin.bottom}px`,
                left: `${
                  coin.position * (window.innerWidth / 3) +
                  window.innerWidth / 6 -
                  coin.size / 2
                }px`,
                backgroundImage: `url(${coinPic})`, // Add background image for the coin
                backgroundSize: "contain", // Adjust size to fit the coin
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
          {/* Render player with background image */}
          <div
            className="player-container"
            style={{
              position: "absolute",
              bottom: "50px",
              left: `${
                playerPosition * (window.innerWidth / 3) +
                window.innerWidth / 6 -
                25
              }px`,
              width: "100px",
              height: "100px",
            }}
          >
            <div
              className="player"
              style={{
                position: "absolute",
                width: "150px",
                height: "150px",

                backgroundImage: `url(${surfBird})`, // Use the imported image variable
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SurfingMiniGame;
