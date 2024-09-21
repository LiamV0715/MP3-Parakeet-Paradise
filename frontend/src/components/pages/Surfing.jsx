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
  const [trickImageRotation, setTrickImageRotation] = useState(0); // NEW state for image rotation
  const [showTrickImage, setShowTrickImage] = useState(false); // NEW state to toggle trick image visibility


  // 1. Make the game shorter by increasing the progress increment
  useEffect(() => {
    let interval;
    if (gameStarted && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 0.8, 100)); // Increase by 0.5 instead of 0.1
      }, 300); // Keep the interval the same, but we are progressing faster
    }
    return () => clearInterval(interval);
  }, [gameStarted, progress]);

  useEffect(() => {
    if (progress >= 85 && !trickOpportunity) {
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
    setTrickImageRotation(0); // Reset rotation
    setShowTrickImage(false); // Hide the trick image
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
    const trickSequence = ["a", "w", "s", "d"]; // Define the correct sequence
  
    if (trickOpportunity) {
      // Check if the current key matches the expected key in the sequence
      if (trickSequence[trickAttempts] === key) {
        setTrickAttempts((prev) => prev + 1);
        setScore((prev) => prev + 20); // Award points with each correct key press
        setTrickImageRotation((prev) => prev + 90); // Rotate the image
  
        // If the full sequence is completed
        if (trickAttempts === 3) {
          // Trigger the trick completed message and reset for the next trick
          setTrickMessages((prev) => [
            ...prev,
            "Trick completed! Keep surfing!",
          ]);
          // Reset for the next round of trick input
          setTrickAttempts(0);
        }
      } else {
        // If a wrong key is pressed, reset the sequence
        setTrickAttempts(0);
        setTrickImageRotation(0); // Reset the image rotation
        setTrickMessages((prev) => [
          ...prev,
          "Wrong key! Start the trick again!",
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
            bottom: obstacle.bottom - 15, //CHANGE SPEED HERE
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
            bottom: coin.bottom - 9, //CHANGE SPEED HERE
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
      right: playerPosition * (window.innerWidth / 3) + 50, // Assuming the player is 50px wide
      top: 150, // The top of the player is 150px from the bottom of the screen
      bottom: 150 + 100 // The bottom of the player is 150px + 100px (player's height)
    };
  
    const elementPosition = {
      left: element.position * (window.innerWidth / 3),
      right: element.position * (window.innerWidth / 3) + element.size,
      bottom: element.bottom,
      top: element.bottom + element.size, // The top of the element is its bottom + size
    };
  
    return (
      playerElement.right > elementPosition.left &&
      playerElement.left < elementPosition.right &&
      playerElement.top < elementPosition.bottom && // Player top should be less than element bottom
      playerElement.bottom > elementPosition.top // Player bottom should be greater than element top
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
          
          {/* Trick Opportunity Visual */}
          {trickOpportunity && (
            <div className="trick-opportunity">
              <h2 className="trick-text">TRICK TIME!!</h2>
              <img
                src={trickBird} 
                alt="Trick Image"
                className="trick-image"
                style={{
                  transform: `rotate(${trickAttempts * 90}deg)`, // Rotate image based on attempts
                  transition: 'transform 0.5s',
                  width: '150px', // Adjust size as needed
                  height: '150px', // Adjust size as needed
                  position: 'absolute',
                  top: '20%', // Adjust position as needed
                  left: '50%',
                  transformOrigin: 'center',
                }}
              />
            </div>
          )}
  
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
                backgroundImage: `url(${obstacle.image}`,
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
                backgroundImage: `url(${coinPic})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
          
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
                backgroundImage: `url(${surfBird})`,
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
