import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";
import VHSquick from "../../assets/videos/VHSquick.mp4";
import backVid from "../../assets/videos/beach.gif";
import blueBird from "../../assets/images/blueBird.png";
import pinkBird from "../../assets/images/pinkBird.png";
import greenBird from "../../assets/images/greenBird.png";
import yellowBird from "../../assets/images/yellowBird.png";

const Login = () => {
  const { login, signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birdColor, setBirdColor] = useState("blue");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signup(username, password, birdColor);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="video-container">
        <img
          src={VHSquick}
          alt="Filter Animation"
          className="transparent-video"
        />
      </div>
      <img src={backVid} alt="Beach Animation" className="background-vid" />
      <div className="login-form">
        {isRegistering ? (
          <>
            <h2>Don't have an account? Sign up!</h2>
            <button
              onClick={() => setIsRegistering(false)}
              className="toggle-register-button"
            >
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
                <select
                  value={birdColor}
                  onChange={(e) => setBirdColor(e.target.value)}
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                  <option value="yellow">Yellow</option>
                </select>
              </div>
              <button type="submit" className="login-button">
                Register
              </button>
            </form>
            <div className="bird-image-container">
              <img src={blueBird} alt="Blue Bird" className="blue-bird" />
              <img src={greenBird} alt="Green Bird" className="green-bird" />
              <img src={pinkBird} alt="Pink Bird" className="pink-bird" />
              <img src={yellowBird} alt="Yellow Bird" className="yellow-bird" />
            </div>
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
              <button type="submit" className="login-button">
                Log In
              </button>
            </form>
            <hr className="black-line"></hr>
            <h2>Don't have an account? Sign up!</h2>
            <button
              onClick={() => setIsRegistering(true)}
              className="toggle-register-button"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
