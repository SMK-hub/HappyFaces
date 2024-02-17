import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignInAdmin.css'; // Import the CSS file for styles
import Header from "./Header";
import axios from 'axios';
import { useUser } from '../../UserContext';
import { API_BASE_URL } from '../../config';

 
const SignInAdmin = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [adminDetails, setAdminDetails] = useState({
    email: "",
    password: ""
  });
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showNewPasswordPopup, setShowNewPasswordPopup] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: ""
  });
  const [newPasswordData, setNewPasswordData] = useState({
    email:"",
    otp: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
 
  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, adminDetails);
      const status = response.status;
      console.log(status);
      if (status === 200) {
        const userDetailResponse = await axios.get(`${API_BASE_URL}/admin/admin/${adminDetails.email}`)
        setUserData(userDetailResponse.data);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      alert("Invalid Email/Password");
      console.log(error);
    }
  };
 
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(adminDetails);
    fetchData();
  };
 
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPasswordPopup(true);
  };
 
  const handleSendOtp = (e) => {
    e.preventDefault();
    setShowForgotPasswordPopup(true);
    setShowOtpField(true);
  };
 
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setShowNewPasswordPopup(true);
  };
 
  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if (newPasswordData.password === newPasswordData.confirmPassword) {
      // Add logic to submit new password
      setShowNewPasswordPopup(false);
      setPasswordsMatchError(false);
      // Navigate back to the previous page
      navigate(-1);
    } else {
      setPasswordsMatchError(true);
    }
  };
 
  const handleBack = () => {
    setShowForgotPasswordPopup(false);
    setShowNewPasswordPopup(false);
    setPasswordsMatchError(false);
    setShowOtpField(false);
  };
 
  return (
    
    <div className='sign-in-admin'>
      <Header/>
      <div>
        <h2 className="sign-in-admin-heading">ADMIN SIGN IN</h2>
        <form onSubmit={handleSignIn} className="sign-in-admin-form">
          <label className="admin-form-label">
            Email:
            <input
              type="email"
              value={adminDetails.email}
              onChange={(e) => setAdminDetails({...adminDetails,email:e.target.value})}
              required
              className="admin-form-input"
              placeholder="Enter your email"
            />
          </label>
          <label className="admin-form-label">
            Password:
            <input
              type="password"
              value={adminDetails.password}
              onChange={(e) => setAdminDetails({...adminDetails,password:e.target.value})}
              required
              className="admin-form-input"
              placeholder="Enter your password"
            />
          </label>
          <div className="admin-form-buttons">
            <button type="submit" className="in-button">
              Sign In
            </button>
            <a href="#" onClick={handleForgotPassword} className="admin-forgot-link">
              Forgot Password?
            </a>
            <Link to="/signin" className="admin-back-link">
          Back
        </Link>
          </div>
          
        </form>
        
      </div>
 
      {/* Forgot Password Popup */}
      {showForgotPasswordPopup && (
        <div className="admin-popup">
          <div className="admin-popup-inner">
            <button className="admin-close-btn" onClick={handleBack}>X</button>
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
              {showOtpField && (
                <>
                  <label>Enter OTP:</label>
                  <input
                    type="text"
                    value={forgotPasswordData.otp}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, otp: e.target.value })}
                    required
                    placeholder="Enter OTP"
                  />
                </>
              )}
              <div className="admin-form-buttons" style={{ display: 'flex', flexDirection: 'row' }}>
                <button type="submit">Send OTP</button>
                <button onClick={handleBack}>Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
 
      {/* New Password Popup */}
      {showNewPasswordPopup && (
        <div className="admin-popup">
          <div className="admin-popup-inner">
            <button className="admin-close-btn" onClick={handleBack}>X</button>
            <h2>Set New Password</h2>
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
                className="admin-form-input"
                placeholder="Enter new password"
              />
              <label>Confirm Password:</label>
              <input
                type="password"
                value={newPasswordData.confirmPassword}
                onChange={(e) => setNewPasswordData({ ...newPasswordData, confirmPassword: e.target.value })}
                required
                className="admin-form-input"
                placeholder="Confirm new password"
              />
              {passwordsMatchError && <p>Passwords do not match</p>}
              <div className="admin-form-buttons" style={{ display: 'flex', flexDirection: 'row' }}>
                <button type="submit">Submit</button>
                <button onClick={handleBack}>Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default SignInAdmin;