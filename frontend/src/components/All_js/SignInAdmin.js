import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignInAdmin.css'; // Import the CSS file for styles
import Header from "./Header";
import axios from 'axios';
import { useUser } from '../../UserContext';

 
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
      const response = await axios.post("http://localhost:8079/admin/login", adminDetails);
      const status = response.status;
      console.log(status);
      if (status === 200) {
        const userDetailResponse = await axios.get(`http://localhost:8079/admin/admin/${adminDetails.email}`)
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
      <div >
        <h2 className="sign-in-admin-heading">ADMIN SIGN IN</h2>
        <form onSubmit={handleSignIn} className="sign-in-admin-form">
          <label className="form-label">
            Email:
            <input
              type="email"
              value={adminDetails.email}
              onChange={(e) => setAdminDetails({...adminDetails,email:e.target.value})}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Password:
            <input
              type="password"
              value={adminDetails.password}
              onChange={(e) => setAdminDetails({...adminDetails,password:e.target.value})}
              required
              className="form-input"
            />
          </label>
          <div className="form-buttons">
            <button type="submit" className="in-button">
              Sign In
            </button>
            <a href="#" onClick={handleForgotPassword} className="forgot-link">
              Forgot Password?
            </a>
          </div>
        </form>
        <Link to="/signin" className="back-link">
          Back
        </Link>
      </div>
 
      {/* Forgot Password Popup */}
      {showForgotPasswordPopup && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={handleBack}>X</button>
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
              <div className="form-buttons" style={{ display: 'flex', flexDirection: 'row' }}>
                <button type="submit">Send OTP</button>
                <button onClick={handleBack}>Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
 
      {/* New Password Popup */}
      {showNewPasswordPopup && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={handleBack}>X</button>
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
                className="form-input"
                placeholder="Enter new password"
              />
              <label>Confirm Password:</label>
              <input
                type="password"
                value={newPasswordData.confirmPassword}
                onChange={(e) => setNewPasswordData({ ...newPasswordData, confirmPassword: e.target.value })}
                required
                className="form-input"
                placeholder="Confirm new password"
              />
              {passwordsMatchError && <p>Passwords do not match</p>}
              <div className="form-buttons" style={{ display: 'flex', flexDirection: 'row' }}>
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