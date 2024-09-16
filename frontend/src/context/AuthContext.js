import React, { createContext, useState, useEffect } from 'react';

// Create a Context for authentication
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  // Check if user is logged in on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in header
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setAuthState({
              isAuthenticated: true,
              user: data.user,
            });
          }
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };
    fetchUser();
  }, []);

  // Log in method
  const login = async (username, password) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;

        // Store token in localStorage
        localStorage.setItem('token', token);

        setAuthState({
          isAuthenticated: true,
          user: user,
        });
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Log out method
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  // Register method
  const register = async (username, password, birdColor) => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, birdColor }),
      });

      if (response.ok) {
        // Optionally, log the user in after registration
        await login(username, password);
      } else {
        const data = await response.json();
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  // Provide auth state and methods to the rest of the app
  return (
    <AuthContext.Provider value={{ authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
