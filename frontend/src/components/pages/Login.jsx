import React, { useState } from 'react';
import { registerUser, loginUser } from '../../services/authService';
import '../styles/Login.scss';

const Login = ({ setUser }) => {
  // State for login form
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for register form
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [bird_color, setBirdColor] = useState('blue'); // Default blue parakeet for guests
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(registerUsername, registerPassword, bird_color);
      setUser({ username: registerUsername, bird_color });
      localStorage.setItem('token', data.token); // Save JWT token if available
    } catch (err) {
      setError(err.message); // Display the error message from authService
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginUsername, loginPassword);
      setUser({ username: data.username, bird_color: data.bird_color });
      localStorage.setItem('token', data.token);
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
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">Log In</button>
      </form>

      <h2>Don't have an account? Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
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
