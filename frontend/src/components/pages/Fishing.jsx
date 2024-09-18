import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Fishing({ setPage }) {
  const [gameStatus, setGameStatus] = useState("waiting");
  const [fishWeight, setFishWeight] = useState(0);
  const [showReelButton, setShowReelButton] = useState(false);
  const [timer, setTimer] = useState(null);
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
    const delay = Math.floor(Math.random() * 10000);
    const newTimer = setTimeout(() => setShowReelButton(true), delay);
    setTimer(newTimer);
  };

  const handleReelClick = async () => {
    if (gameStatus === "started") {
      const weight = Math.floor(Math.random() * 20) + 1;
      setFishWeight(weight);
      setGameStatus("won");

      // Submit score
      submitScore(weight);
    }
  };

  const submitScore = async (weight) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
      const response = await fetch("/api/fish-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach the JWT token
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
      setTimeout(() => {
        if (gameStatus === "started") {
          setGameStatus("lost");
        }
      }, 250); // 1/4 second to click
    }
  }, [showReelButton, gameStatus]);

  return (
    <div className="fishing-game">
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
