// components/SignInAdmin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignInDonor.css'; // Import the CSS file for styles

const SignInDonor = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Add logic for admin sign-in, such as calling an authentication API
    console.log('Admin signing in with:', { username, password });
    // Reset the form after submission
    setUsername('');
    setPassword('');
    // Redirect to a dashboard or home page after successful sign-in
    navigate('/dashboard');
  };

  return (
    <div className="sign-in-donor-container">
      <h2 className="sign-in-donor-heading">Donor Sign In</h2>
      <form onSubmit={handleSignIn} className="sign-in-donor-form">
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
        <div className="form-buttons">
          <button type="submit" className="form-button">
            Sign In
          </button>
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>
      </form>
      <Link to="/signin" className="back-link">
        Back to Sign In Selector
      </Link>
    </div>
  );
};

export default SignInDonor;
