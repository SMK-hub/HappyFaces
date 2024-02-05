import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignInOrphanage.css'; // Import the CSS file for styles
import Header from "./Header"
import axios from 'axios';
import {useUser} from '../../UserContext';

const SignInOrphanage = () => {

  const navigate = useNavigate();
  const [orphanageDetails,setOrphanageDetails]=useState({
    email:"",
    password:""
  });
  
  const  {setUserData} = useUser();
  const fetchData = async() =>{
    try{
      const response=await axios.post("http://localhost:8079/orphanage/login",orphanageDetails);
      const status=response.status;
      console.log(status);
      if(status == 200){
        const userDetailResponse=await axios.get(`http://localhost:8079/orphanage/orphanage/${orphanageDetails.email}`);
        setUserData(userDetailResponse.data)
        navigate("/orphanage-dashboard");
      }
      }catch(error){
        alert("Invalid Email/Password");
        console.log(error);
      }
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(orphanageDetails);
    fetchData();
  };

  return (
    <div className='sign-in-orphanage'>
      <Header/>
    <div className="sign-in-orphanage-container">
      <h2 className="sign-in-orphanage-heading">Orphanage Sign In</h2>
      <form onSubmit={handleSignIn} className="sign-in-orphanage-form">
        <label className="form-label">
          Email:
          <input
            type="email"
            value={orphanageDetails.email}
            onChange={(e) => setOrphanageDetails({...orphanageDetails,email:e.target.value})}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            value={orphanageDetails.password}
            onChange={(e) => setOrphanageDetails({...orphanageDetails,password:e.target.value})}
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

export default SignInOrphanage;
