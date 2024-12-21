import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login API
      const res = await axios.post('http://localhost:5000/auth/login', { username, password });

      // Save the token in localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect the user to the dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      // Handle any errors
      console.error('Login error:', err);

      // Show a user-friendly alert
      if (err.response && err.response.status === 404) {
        alert('User not found. Please check your username.');
      } else if (err.response && err.response.status === 400) {
        alert('Invalid password. Please try again.');
      } else {
        alert('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
