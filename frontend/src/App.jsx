import React, { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import MainMenu from './components/pages/MainMenu';
import Surfing from './components/pages/Surfing';
import Fishing from './components/pages/Fishing';
import Scoreboard from './components/pages/Scoreboard';
import Login from './components/pages/Login';

const App = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  // Redirect user to login page if not logged in
  useEffect(() => {
    if (!authState.loading && !authState.isAuthenticated && window.location.pathname !== '/login') {
      navigate('/login');
      console.log("no authentication detected")
    }
  }, [authState.isAuthenticated, authState.loading, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainMenu />} />
      <Route path="/surfing" element={<Surfing />} />
      <Route path="/fishing" element={<Fishing />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
    
    </Routes>
  );
};

export default App;
