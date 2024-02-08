import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignInDonor.css'; // Import the CSS file for styles
import Header from './Header';
import axios from 'axios';
import {useUser} from '../../UserContext';

const SignInDonor = () => {

  const navigate = useNavigate();
  const [donorDetails,setDonorDetails]=useState({
    email:"",
    password:""
  });

  const  {setUserData} = useUser();
  const fetchData=async()=>{
    try{
    const response=await axios.post("http://localhost:8079/donor/login",donorDetails);
    const status=response.status;
    console.log(status);
    if(status == 200){
      const userDetailResponse = await axios.get(`http://localhost:8079/donor/donor/${donorDetails.email}`);
      setUserData(userDetailResponse.data);
      navigate('/donor-dashboard');
    }

    
    }catch(error){
      alert("Invalid Email/Password");
      console.log(error);
    }

  }
  
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(donorDetails);
    fetchData();
  };

  return (
    <div className="donorSignIn">
      <Header/>
    <div className="sign-in-donor-container">
      
      <h2 className="sign-in-donor-heading">Donor Sign In</h2>
      <form onSubmit={handleSignIn} className="sign-in-donor-form">
        <label className="form-label">
          Email:
          <input
            type="email"
            value={donorDetails.email}
            onChange={(e) => setDonorDetails({...donorDetails,email:e.target.value})}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            value={donorDetails.password}
            onChange={(e) => setDonorDetails({...donorDetails,password:e.target.value})}
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

export default SignInDonor;
