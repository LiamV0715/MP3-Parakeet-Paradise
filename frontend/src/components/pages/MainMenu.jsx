import React, { useState, useEffect } from 'react';
import '../styles/Menu.scss';
import WelcomeMessage from '../WelcomeMessage';
import BirdImage from '../BirdImage'; 


const MainMenu = ({ user, setUser }) => {
  const [showModal, setShowModal] = useState(!user); // Show modal if user is not logged in

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleGuestPlay = () => {
    setUser({ username: 'Guest', birdColor: 'blue' }); // Guest user with default bird color
    setShowModal(false);
  };

  const handleAccountCreation = () => {
    window.location.href = '/login'; // Redirect to login/register page
  };

  return (
    <div className="main-menu-container">
      <WelcomeMessage />

      {showModal && (
        <div className="account-modal">
          <h2>Want to make an account?</h2>
          <button onClick={handleAccountCreation}>Yes</button>
          <button onClick={handleGuestPlay}>Play as Guest</button>
        </div>
      )}

      <h1>Main Menu</h1>
      <button className="menu-button" onClick={() => window.location.href = '/surfing'}>Go Surfing!</button>
      <button className="menu-button" onClick={() => window.location.href = '/fishing'}>Go Fishing!</button>
      <button className="menu-button" onClick={() => window.location.href = '/scoreboards'}>Scoreboards</button>

      <button className="menu-button" onClick={user ? handleLogout : () => window.location.href = '/login'}>
        {user ? 'Log Out' : 'Log In'}
      </button>
      <BirdImage /> 
    </div>
  );
};

export default MainMenu;
