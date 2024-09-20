import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import WelcomeMessage from '../WelcomeMessage';
import '../styles/Fishing.scss';
import fish1 from '../../assets/images/smallestFish.png';
import fish2 from '../../assets/images/smallerFish.png';
import fish3 from '../../assets/images/smallFish.png';
import fish4 from '../../assets/images/mediumFish.png';
import fish5 from '../../assets/images/bigFish.png';
import fish6 from '../../assets/images/biggerFish.png';
import fish7 from '../../assets/images/biggestFish.png';
import fishLost from '../../assets/images/lostFish.png';
import { AuthContext } from '../../context/AuthContext';

function Fishing({ setPage }) {
  const [gameStatus, setGameStatus] = useState("waiting");
  const [fishWeight, setFishWeight] = useState(0);
  const [showReelButton, setShowReelButton] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isCatching, setIsCatching] = useState(false);
  const navigate = useNavigate();
  const { submitFishingScore, authState } = useContext(AuthContext);

  const handleBackToMenu = () => {
    navigate('/');  // Navigates to the main menu page
  };

  const startGame = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setGameStatus("started");
    setShowReelButton(false);
    setIsCatching(false);
    const delay = Math.floor(Math.random() * 10000);
    const newTimer = setTimeout(() => setShowReelButton(true), delay);
    setTimer(newTimer);
  };

  const generateFishWeight = () => {
    let sum = 0;
    const rolls = 6; 
    for (let i = 0; i < rolls; i++) {
      sum += Math.random();
    }
    return Math.floor((sum / rolls) * 50) + 1;
  };

  const getFishImage = (weight) => {
    const intervals = 50 / 7;
    if (weight <= intervals) return fish1;
    if (weight <= intervals * 2) return fish2;
    if (weight <= intervals * 3) return fish3;
    if (weight <= intervals * 4) return fish4;
    if (weight <= intervals * 5) return fish5;
    if (weight <= intervals * 6) return fish6;
    return fish7;
  };

  const handleReelClick = async () => {
    if (gameStatus === "started") {
      const weight = generateFishWeight();
      setFishWeight(weight);
      setIsCatching(true);
      setGameStatus("won");

      const token = authState.user ? authState.user.token : null; // Retrieve token from authState
      if (!token) {
        console.error("No token found, unable to submit fishing score.");
        return;
      }

      await submitFishingScore(Number(weight)); // Convert to number if necessary, token is already in the function
    }
  };

  useEffect(() => {
    if (showReelButton) {
      const lostTimer = setTimeout(() => {
        if (gameStatus === "started" && !isCatching) {
          setGameStatus("lost");
        }
      }, 400);
      return () => clearTimeout(lostTimer);
    }
  }, [showReelButton, gameStatus, isCatching]);

  return (
    <div className="fishing-game">
      <WelcomeMessage />
      {gameStatus === "waiting" && <button onClick={startGame}>Start Game</button>}
      {gameStatus === "started" && showReelButton && (
        <button id="fish-button" onClick={handleReelClick} className="reel-button">REEL IT!</button>
      )}
      {gameStatus === "won" && (
        <div>
          <h1>You caught a {fishWeight} lb fish!</h1>
          <img src={getFishImage(fishWeight)} alt="Caught fish" className="fish-image" />
          <button onClick={handleBackToMenu}>Main Menu</button>
        </div>
      )}
      {gameStatus === "lost" && (
        <div>
          <h1>Fish lost!</h1>
          <img src={fishLost} alt="Fish lost" className="fish-image" />
          <button onClick={startGame}>Retry</button>
          <button onClick={handleBackToMenu}>Main Menu</button>
        </div>
      )}
    </div>
  );
}

export default Fishing;
