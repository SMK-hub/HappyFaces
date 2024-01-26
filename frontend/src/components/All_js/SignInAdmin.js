/* eslint-disable eqeqeq */
// components/SignInAdmin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignInAdmin.css'; // Import the CSS file for styles
import Header from "./Header";
import axios from 'axios';


const SignInAdmin = () => {
  const navigate = useNavigate();
  const [adminDetails,setAdminDetails] = useState({
    email:"",
    password:""
  })

  const fetchData = async()=>{
    try{
    const response=await axios.post("http://localhost:8079/admin/login",adminDetails);
    const status=response.status;
    console.log(status);
      if(status == 200){
        navigate("/admin-dashboard");
      }
      }catch(error){
        alert("Invalid Email/Password");
        console.log(error);
      }
      
  }
  const handleSignIn = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className='sign-in-admin'><Header/>
    <div className="sign-in-admin-container">
      <h2 className="sign-in-admin-heading">Admin Sign In</h2>
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
          <button type="submit" className="form-button">
            Sign In
          </button>
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>
      </form>
      <Link to="/signin" className="back-link">
        Back 
      </Link>
    </div>
    </div>
  );
};

export default SignInAdmin;
