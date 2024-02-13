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
  const [enteredOtp,setEnteredOtp] = useState();
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showOtpVerificationPopup, setShowOtpVerificationPopup] = useState(false);
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

<<<<<<< HEAD
=======
  const fetchOtp = async()=>{
    try{
      const response = await axios.post(`http://localhost:8079/donor/sendOtp`,forgotPasswordData); 
      const status=response.status;
      if(status === 200){
        const data=response.data;
        console.log(data);
        setForgotPasswordData(prevData => ({
          ...prevData,
          otp: data // Update with the actual response key for OTP
        }));
      }

    }catch(error){
      console.log(error);
    }
  }

  const changePassword = async()=>{
    try{
        const response = await axios.post(`http://localhost:8079/donor/ForgetPassword/${forgotPasswordData.email}/${enteredOtp}/${newPasswordData.password}/${newPasswordData.confirmPassword}`);
        const status = response.status;
        if(status === 200){
          alert(response.data);
          setShowOtpVerificationPopup(false);
          setShowForgotPasswordPopup(false);
        }
      }
     
    catch(error){
      console.log(error);
    }
  }
 
>>>>>>> 67b9fcc51ad9bf623d8d47caf83ed2617df89702
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
    setShowOtpVerificationPopup(true);
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
    setShowOtpVerificationPopup(false);
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
            <div className="form-buttons">
<<<<<<< HEAD
              <input type="submit" value="Send OTP" className="form-button" />
              <Link to="#" className="forgot-password-link" onClick={handleBack}>
                Back
              </Link>
=======
            <button type="submit" onClick={()=>fetchOtp()}>Send OTP</button>
              <button onClick={handleBack}>Back</button>
>>>>>>> 67b9fcc51ad9bf623d8d47caf83ed2617df89702
            </div>
          </form>
        </div>
      )}
<<<<<<< HEAD

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
=======
 
     

      {/* OTP Verification Popup */}
      {showOtpVerificationPopup && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={handleBack}>X</button>
            <h2>OTP Verification</h2>
            <form onSubmit={handleNewPasswordSubmit}>
              <label>Enter OTP:</label>
              <input
                type="text"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp( e.target.value )}
                required
                placeholder="Enter OTP"
              />
              <label>New Password:</label>
              <input
                type="password"
                value={newPasswordData.password}
                onChange={(e) => setNewPasswordData({ ...newPasswordData, password: e.target.value })}
                required
                placeholder="Enter new password"
              />
              <label>Confirm Password:</label>
              <input
                type="password"
                value={newPasswordData.confirmPassword}
                onChange={(e) => setNewPasswordData({ ...newPasswordData, confirmPassword: e.target.value })}
                required
                placeholder="Confirm new password"
              />
              {passwordsMatchError && <p>Passwords do not match</p>}
              <div className="form-buttons">
                <button type="submit" onClick={()=>changePassword()}>Submit</button>
                <button onClick={handleBack}>Back</button>
              </div>
            </form>
          </div>
>>>>>>> 67b9fcc51ad9bf623d8d47caf83ed2617df89702
        </div>
      )}
    </div>
  );
};

export default SignInDonor;
