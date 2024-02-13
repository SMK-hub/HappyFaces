// SignInDonor.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignInDonor.css'; // Import the CSS file for styles
import Header from './Header';
import axios from 'axios';
import { useUser } from '../../UserContext';

const SignInDonor = () => {
  const navigate = useNavigate();
  const [donorDetails, setDonorDetails] = useState({
    email: '',
    password: '',
  });
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showNewPasswordPopup, setShowNewPasswordPopup] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    otp: '',
  });
  const [newPasswordData, setNewPasswordData] = useState({
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const { setUserData } = useUser();

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:8079/donor/login', donorDetails);
      const status = response.status;
      console.log(status);
      if (status === 200) {
        const userDetailResponse = await axios.get(`http://localhost:8079/donor/donor/${donorDetails.email}`);
        setUserData(userDetailResponse.data);
        navigate('/donor-dashboard');
      }
    } catch (error) {
      alert('Invalid Email/Password');
      console.log(error);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(donorDetails);
    fetchData();
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPasswordPopup(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit email and OTP
    setShowNewPasswordPopup(true);
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if (newPasswordData.password === newPasswordData.confirmPassword) {
      // Add logic to submit new password
      setShowForgotPasswordPopup(false);
      setShowNewPasswordPopup(false);
      setPasswordsMatchError(false);
    } else {
      setPasswordsMatchError(true);
    }
  };

  const handleBack = () => {
    setShowForgotPasswordPopup(false);
    setShowNewPasswordPopup(false);
    setPasswordsMatchError(false);
  };

  return (
    <div className="donorSignIn">
      <Header />
      <div className="sign-in-donor-container">
        <h2 className="sign-in-donor-heading">Donor Sign In</h2>
        <form onSubmit={handleSignIn} className="sign-in-donor-form">
          <label className="form-label">
            Email:
            <input
              type="email"
              value={donorDetails.email}
              onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </label>
          <label className="form-label">
            Password:
            <input
              type="password"
              value={donorDetails.password}
              onChange={(e) => setDonorDetails({ ...donorDetails, password: e.target.value })}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </label>
          <div className="form-buttons">
            <button type="submit" className="form-button">
              Sign In
            </button>
            <Link to="#" className="forgot-password-link" onClick={handleForgotPassword}>
              Forgot Password?
            </Link>
          </div>
        </form>
        <Link to="/signin" className="back-link">
          Back
        </Link>
      </div>

      {/* Forgot Password Popup */}
      {showForgotPasswordPopup && (
        <div className="forgot-password-popup">
          <h2>Forgot Password</h2>
          <form onSubmit={handleOtpSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={forgotPasswordData.email}
              onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })}
              required
              placeholder="Enter your email"
            />
            <div className="form-buttons">
              <input type="submit" value="Send OTP" className="form-button" />
              <Link to="#" className="forgot-password-link" onClick={handleBack}>
                Back
              </Link>
            </div>
          </form>
        </div>
      )}

      {/* New Password Popup */}
      {showNewPasswordPopup && (
        <div className="new-password-popup">
          <h2>Reset Password</h2>
          <form onSubmit={handleNewPasswordSubmit}>
            <label>OTP:</label>
            <input
              type="text"
              value={newPasswordData.otp}
              onChange={(e) => setNewPasswordData({ ...newPasswordData, otp: e.target.value })}
              required
              placeholder="Enter the OTP"
            />
            <label>New Password:</label>
            <input
              type="password"
              value={newPasswordData.password}
              onChange={(e) => setNewPasswordData({ ...newPasswordData, password: e.target.value })}
              required
              placeholder="Enter your new password"
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              value={newPasswordData.confirmPassword}
              onChange={(e) => setNewPasswordData({ ...newPasswordData, confirmPassword: e.target.value })}
              required
              placeholder="Confirm your new password"
            />
            {passwordsMatchError && <p>Passwords do not match</p>}
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button onClick={handleBack}>Back</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignInDonor;
