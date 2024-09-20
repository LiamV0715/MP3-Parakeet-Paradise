import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss';

const Login = () => {
  const { login, signup } = useContext(AuthContext); // Change here
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birdColor, setBirdColor] = useState('blue');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signup(username, password, birdColor); // Change here
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container"> 
      {isRegistering ? (
        <>
          <h2>Don't have an account? Sign up!</h2>
          <button onClick={() => setIsRegistering(false)} className="toggle-register-button">
            Cancel
          </button>
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
        </>
      ) : (
        <>
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
          <button onClick={() => setIsRegistering(true)} className="toggle-register-button">
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
