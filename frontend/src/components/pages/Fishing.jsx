import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import WelcomeMessage from '../WelcomeMessage';
import '../styles/Fishing.scss';

function Fishing({ setPage }) {
  const [gameStatus, setGameStatus] = useState("waiting");
  const [fishWeight, setFishWeight] = useState(0);
  const [showReelButton, setShowReelButton] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isCatching, setIsCatching] = useState(false); // New flag
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate('/');  // Navigates to the main menu page
  };

  const startGame = () => {
    if (timer) {
      clearTimeout(timer); // Clear the previous timer when restarting the game
    }
    setGameStatus("started");
    setShowReelButton(false); // Reset reel button visibility
    setIsCatching(false); // Reset catching status
    const delay = Math.floor(Math.random() * 10000);
    const newTimer = setTimeout(() => setShowReelButton(true), delay);
    setTimer(newTimer);
  };

  const generateFishWeight = () => {
    let sum = 0;
    const rolls = 6;  // Number of dice rolls for bell curve logic
    for (let i = 0; i < rolls; i++) {
      sum += Math.random();
    }
    return Math.floor((sum / rolls) * 50) + 1; // Normalize to 1-50
  };

  const handleReelClick = async () => {
    if (gameStatus === "started") {
      const weight = generateFishWeight();
      setFishWeight(weight);
      setIsCatching(true); // Set catching status to true
      setGameStatus("won");

      // Submit score
      await submitScore(weight);
    }
  };

  const submitScore = async (weight) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/fish-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fishWeight: weight,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  useEffect(() => {
    if (showReelButton) {
      const lostTimer = setTimeout(() => {
        if (gameStatus === "started" && !isCatching) {
          setGameStatus("lost");
        }
      }, 400); // 1/2 second to click
      return () => clearTimeout(lostTimer); // Cleanup timer on unmount
    }
  }, [showReelButton, gameStatus, isCatching]);

  return (
    <div className="fishing-game">
      <WelcomeMessage />
      {gameStatus === "waiting" && <button onClick={startGame}>Start Game</button>}
      {gameStatus === "started" && showReelButton && (
        <button onClick={handleReelClick} className="reel-button">REEL IT!</button>
      )}
      {gameStatus === "won" && (
        <div>
          <h1>You caught a {fishWeight} lb fish!</h1>
          <button onClick={() => setPage("menu")}>Main Menu</button>
        </div>
      )}
      {gameStatus === "lost" && (
        <div>
          <h1>Fish lost!</h1>
          <button onClick={startGame}>Retry</button>
          <button onClick={handleBackToMenu}>Main Menu</button>
        </div>
      )}
    </div>
  );
}

export default Fishing;
