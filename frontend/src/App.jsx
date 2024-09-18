import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainMenu from './components/pages/MainMenu';
import Surfing from './components/pages/Surfing';
import Fishing from './components/pages/Fishing';
import Scoreboard from './components/pages/Scoreboard';
import Login from './components/pages/Login';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for JWT token on app load and set user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username, bird_color: decoded.bird_color });
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token'); // Remove invalid token if present
      }
    }
  }, []);

  // Redirect user to login page if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      {user && (
        <>
          <Route path="/" element={<MainMenu />} />
          <Route path="/surfing" element={<Surfing />} />
          <Route path="/fishing" element={<Fishing />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </>
      )}
    </Routes>
  );
};

export default App;
