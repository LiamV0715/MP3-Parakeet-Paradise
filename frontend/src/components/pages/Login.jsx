import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/Login.scss';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birdColor, setBirdColor] = useState('blue'); // Default bird color for guests
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        password,
        birdColor,
      });
      setUser({ username, birdColor });
      localStorage.setItem('token', response.data.token); // Save JWT token
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      setUser({ username: response.data.username, birdColor: response.data.birdColor });
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
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

      <h2>Don't have an account? Register</h2>
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
          <select value={birdColor} onChange={(e) => setBirdColor(e.target.value)}>
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
