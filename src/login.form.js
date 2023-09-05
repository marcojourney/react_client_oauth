import React, { useState } from 'react';
import api from './api';
import { async } from 'q';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', {}, { headers: { username, password }});
      if (response?.data) {
        const { userId, accessToken, refreshToken } = response.data;
        localStorage.setItem('user', JSON.stringify({ id: userId, accessToken, refreshToken }));
      } else {
        console.log('Login failed. Please check your credentials.');
      }
    } catch (error) {
          console.log('An error occurred. Please try again later.', error);
    }
  };

  const handleGetCats = async () => {
    // const response = await api.get('/cats',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.accessToken}` }});
    // console.log('ddddd:', response?.data);
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
        <button type='button' onClick={handleGetCats}>Get Cats</button>
      </form>
    </div>
  );
}

export default LoginForm;
