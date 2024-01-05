// components/SignInAdmin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpAdmin.css'; // Import the CSS file for styles

const SignUpAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, SetEmail] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add logic for admin sign-in, such as calling an authentication API
    console.log('Admin signing up  with:', { username, password, email});
    // Reset the form after submission
    setUsername('');
    setPassword('');
    SetEmail('');
    // Redirect to a dashboard or home page after successful sign-in
    navigate('/dashboard');
  };

  return (
    <div className="sign-up-admin-container">
      <h2 className="sign-up-admin-heading">Admin Sign Up</h2>
      <form onSubmit={handleSignUp} className="sign-up-admin-form">
        <label className="form-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <div className="form-buttons">
          <button type="submit" className="form-button">
            Sign Up
          </button>
        </div>
      </form>
      <Link to="/signup" className="back-link">
        Back to Sign Up Selector
      </Link>
    </div>
  );
};

export default SignUpAdmin;
