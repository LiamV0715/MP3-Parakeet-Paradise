// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    user: null, 
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5001/api/auth/me', {  
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setAuthState({ isAuthenticated: true, loading: false, user: data.user });
          } else {
            setAuthState({ isAuthenticated: false, loading: false, user: null });
            localStorage.removeItem('token');
          }
        } else {
          setAuthState({ isAuthenticated: false, loading: false, user: null });
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setAuthState({ isAuthenticated: false, loading: false, user: null });
      }
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setAuthState({ isAuthenticated: true, loading: false, user: data });
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ isAuthenticated: false, user: null });
  };

  const signup = async (username, password, birdColor) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, birdColor }),
      });

      if (response.ok) {
        await login(username, password); // Automatically log in after registration
      } else {
        const data = await response.json();
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
