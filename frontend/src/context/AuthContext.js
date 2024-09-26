// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Using axios for consistent API calls
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,  
    user: null, 
  });
  const [fishScores, setFishScores] = useState([]); // state for scores
  const [surfScores, setSurfScores] = useState([]);
  const navigate = useNavigate(); 

  // Fetch user data from the server using the JWT token
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('https://mp3-parakeet-paradise-api.onrender.com/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          // Set user data, authentication status, and stop loading
          setAuthState({
            isAuthenticated: true,
            loading: false,
            user: { ...response.data, token },  
          });
        } else {
          // If token is invalid, clear auth state and token
          setAuthState({ isAuthenticated: false, loading: false, user: null });
          localStorage.removeItem('token');
        }
      } else {
        // No token in localStorage setting
        setAuthState({ isAuthenticated: false, loading: false, user: null });
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setAuthState({ isAuthenticated: false, loading: false, user: null });
    }
  };

  

  const fetchFishScores = async () => {
    try {
      const response = await axios.get('https://mp3-parakeet-paradise-api.onrender.com/api/fish-score'); 
      setFishScores(response.data);
    } catch (error) {
      console.error('Error fetching fish scores:', error);
    }
  };

  const fetchSurfScores = async () => {
    try {
      const response = await axios.get('https://mp3-parakeet-paradise-api.onrender.com/api/surf-score'); 
      setSurfScores(response.data);
    } catch (error) {
      console.error('Error fetching surf scores:', error);
    }
  };

  useEffect(() => {
    fetchFishScores(); // Fetches data on page load
    fetchSurfScores();
    fetchUser(); 
  }, []);
  const login = async (username, password) => {
  try {
    const response = await axios.post('https://mp3-parakeet-paradise-api.onrender.com/api/auth/login', {
      username,
      password,
    });

    if (response.status === 200) {
      const { token, user } = response.data;  
      localStorage.setItem('token', token);   // Store token in localStorage

      // Update authState and immediately fetch user data
      setAuthState({ isAuthenticated: true, loading: true, user: { ...user, token } }); // Mark loading true
      await fetchUser(); // Fetch fresh user data
    } else {
      console.error('Login failed:', response.data.message);
    }
  } catch (error) {
    console.error('Login failed', error);
  }
};


  const logout = () => {
    localStorage.removeItem('token');  // Remove token on logout
    setAuthState({ isAuthenticated: false, user: null });
  };

  const signup = async (username, password, birdColor) => {
    try {
      const response = await axios.post('https://mp3-parakeet-paradise-api.onrender.com/api/auth/signup', {
        username, 
        password,
        birdColor,
      });

      if (response.status === 201) {
        // Automatically log the user in after a successful registration
        await login(username, password);
        navigate('/');
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  // Function to submit fish score
  const submitFishingScore = async (weight) => {
    const token = authState.user ? authState.user.token : null; // Get the token from authState
    if (!token) {
      console.error("No token found, unable to submit fishing score.");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://mp3-parakeet-paradise-api.onrender.com/api/fish-score",
        { fishWeight: Number(weight) },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Fishing score submitted:", response.data);
    } catch (error) {
      console.error("Error submitting fishing score:", error);
    }
  };
  const submitSurfingScore = async (score) => {
    const token = authState.user ? authState.user.token : null; 
    if (!token) {
      console.error("No token found, unable to submit surfing score.");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://mp3-parakeet-paradise-api.onrender.com/api/surf-score",
        { stylePoints: Number(score) },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Surfing score submitted:", response.data);
    } catch (error) {
      console.error("Error submitting surfing score:", error);
    }
    
  };
  

  return (
    <AuthContext.Provider
    value={{
      authState,
      fishScores, 
      surfScores, 
      submitFishingScore,
      submitSurfingScore,
      setAuthState,
      login,
      logout,
      signup,
    }}
  >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
