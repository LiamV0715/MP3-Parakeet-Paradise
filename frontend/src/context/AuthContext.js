// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Using axios for consistent API calls

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,  // Keep track of loading state
    user: null, 
  });

  // Fetch user data from the server using the JWT token
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:5001/api/auth/me', {
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
            user: { ...response.data, token },  // Response from Passport should include the user data
          });
        } else {
          // If token is invalid, clear auth state and token
          setAuthState({ isAuthenticated: false, loading: false, user: null });
          localStorage.removeItem('token');
        }
      } else {
        // No token in localStorage
        setAuthState({ isAuthenticated: false, loading: false, user: null });
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setAuthState({ isAuthenticated: false, loading: false, user: null });
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data when the component mounts
  }, []);

  const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/login', {
      username,
      password,
    });

    if (response.status === 200) {
      const { token, user } = response.data;  // Assuming your backend returns token & user
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
      const response = await axios.post('http://localhost:5001/api/auth/signup', {
        username,
        password,
        birdColor,
      });

      if (response.status === 200) {
        // Automatically log the user in after a successful registration
        await login(username, password);
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
        "http://localhost:5001/api/fish-score",
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
  

  return (
    <AuthContext.Provider value={{ authState, submitFishingScore, setAuthState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };