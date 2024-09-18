import React, { useState } from 'react';
import { registerUser, loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';  // Add this
import '../styles/Login.scss';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bird_color, setBirdColor] = useState('blue'); // Default blue parakeet for guests
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(username, password, bird_color);
      setUser({ username, bird_color }); // Call setUser correctly
      localStorage.setItem('token', data.token); // Save JWT token if available
      navigate('/');  // Redirect to MainMenu after registration
    } catch (err) {
      setError(err.message); // Display the error message from authService
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      setUser({ username: data.username, bird_color: data.bird_color });
      localStorage.setItem('token', data.token);
      navigate('/');  // Redirect to MainMenu after login
    } catch (err) {
      setError(err.message); // Display the error message from authService
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">Log In</button>
      </form>

      <h2>Don't have an account? Sign up!</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <div className="bird-color-select">
          <label>Choose Your Bird Color:</label>
          <select value={bird_color} onChange={(e) => setBirdColor(e.target.value)}>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="pink">Pink</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>
        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
};

export default Login;
