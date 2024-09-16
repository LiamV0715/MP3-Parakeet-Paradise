import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainMenu from './components/pages/MainMenu';
import Surfing from './components/pages/Surfing';
import Fishing from './components/pages/Fishing';
import Scoreboard from './components/pages/Scoreboard';
import Login from './components/pages/Login';
// import NotFound from './components/pages/NotFound';
// 404 page stub


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/surfing" element={<Surfing />} />
      <Route path="/fishing" element={<Fishing />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
