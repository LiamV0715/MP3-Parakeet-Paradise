import React, { useState, useContext } from "react";
import "../styles/Menu.scss";
import WelcomeMessage from "../WelcomeMessage";
import BirdImage from "../BirdImage";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import VHSintro from "../../assets/videos/VHSbig.gif";
import backVid from "../../assets/videos/beach.gif"

const MainMenu = () => {
  const { authState, setAuthState } = useContext(AuthContext); // Access authState from AuthContext
  const [showModal, setShowModal] = useState(!authState.user); // Show modal if user is not logged in

  const handleLogout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem("token");
  };

  const handleGuestPlay = () => {
    setAuthState({
      isAuthenticated: true,
      user: { username: "Guest", birdColor: "blue" },
    });
    setShowModal(false);
  };

  const handleAccountCreation = () => {
    window.location.href = "/login"; // Redirect to login/register page
  };

  return (
    <div className="main-menu-container">
      <div className="video-container">
      
        <img src={VHSintro} alt="Filter Animation" className="transparent-video" />
      
        </div>
        <img src={backVid} alt="Beach Animation" className="background-vid" />
      <div className='behind-video'>

      <WelcomeMessage />

      {showModal && (
        <div className="account-modal">
          <h2>Want to make an account?</h2>
          <button onClick={handleAccountCreation}>Yes</button>
          <button onClick={handleGuestPlay}>Play as Guest</button>
        </div>
      )}

      <h1>Main Menu</h1>
      <button
        className="menu-button"
        onClick={() => (window.location.href = "/surfing")}
      >
        Go Surfing!
      </button>
      <button
        className="menu-button"
        onClick={() => (window.location.href = "/fishing")}
      >
        Go Fishing!
      </button>
      <button
        className="menu-button"
        onClick={() => (window.location.href = "/scoreboards")}
      >
        Scoreboards
      </button>

      <button
        className="menu-button"
        onClick={
          authState.user
            ? handleLogout
            : () => (window.location.href = "/login")
        }
      >
        {authState.user ? "Log Out" : "Log In"}
      </button>

      
      </div>
      <BirdImage className='bird-image'/>
    </div>
  );
};

export default MainMenu;
