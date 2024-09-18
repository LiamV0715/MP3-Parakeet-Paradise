import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth'; // Your backend server URL

// Register a new user
export const registerUser = async (username, password, birdColor) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      password,
      birdColor,
    });
    return response.data;
  } catch (error) {
    // Log the full error response for debugging
    console.error('Register User Error:', error.response ? error.response.data : error.message);
    throw new Error('Error creating account. Please try again.');
  }
};

// Log in an existing user
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    // Log the full error response for debugging
    console.error('Login User Error:', error.response ? error.response.data : error.message);
    throw new Error('Invalid credentials. Please try again.');
  }
};
