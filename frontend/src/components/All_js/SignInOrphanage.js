// components/SignInAdmin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignInOrphanage.css'; // Import the CSS file for styles
import Header from "./Header"

const SignInOrphanage = () => {
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
    <div>
      <Header/>
    <div className="sign-in-orphanage-container">
      <h2 className="sign-in-orphanage-heading">Orphanage Sign In</h2>
      <form onSubmit={handleSignIn} className="sign-in-orphanage-form">
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
    </div>
  );
};

export default SignInOrphanage;
