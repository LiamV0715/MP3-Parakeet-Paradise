import React, { useState, useContext } from "react";
import "../styles/Menu.scss";
import WelcomeMessage from "../WelcomeMessage";
import BirdImage from "../BirdImage";
import { AuthContext } from "../../context/AuthContext";
import VHSintro from "../../assets/videos/VHSbig.gif";
import backVid from "../../assets/videos/beach.gif";
import Logo from "../../assets/images/Logo.png"

const MainMenu = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem("token");
  };

  const handleGuestPlay = () => {
    setAuthState({
      isAuthenticated: true,
      user: { username: "Guest", birdColor: "blue" },
    });
  };

  const handleAccountCreation = () => {
    window.location.href = "/login"; // Redirect to login/register page
  };

  return (
    <div className="main-menu-container">
      <div className="video-container">
        <img
          src={VHSintro}
          alt="Filter Animation"
          className="transparent-video"
        />
      </div>
      <img src={backVid} alt="Beach Animation" className="background-vid" />
      <div className="behind-video">
        <WelcomeMessage />

        {!authState.user && ( // Only show modal if user is not logged in
          <div className="account-modal">
            <h2>Want to make an account?</h2>
            <button onClick={handleAccountCreation}>Yes</button>
            <button onClick={handleGuestPlay}>Play as Guest</button>
          </div>
        )}

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
          onClick={() => (window.location.href = "/scoreboard")}
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
      <div className="birdShrink">
      <BirdImage className="bird-image-menu" />
      <img src={Logo} className="logo"/>
      </div>
    </div>
  );
};

export default MainMenu;
