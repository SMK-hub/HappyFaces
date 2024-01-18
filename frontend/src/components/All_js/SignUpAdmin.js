// components/SignInAdmin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignUpAdmin.css'; // Import the CSS file for styles
import Header from "./Header";
import axios from 'axios';

const SignUpAdmin = () => {
  const navigate = useNavigate();
  const [admindetails,setAdminDetails] = useState ({
      name:"",
      email:"",
      password:"",
      passcode:""
  });

  const[loading,setLoading]=useState(false);

  const fetchData = async()=>{
    try{
      setLoading(true);
      console.log(admindetails);
    const response=await axios.post("http://localhost:8079/admin/register",admindetails);
    const status=response.status;
    console.log(status);
      if(status == 200){
        navigate("/signin/admin");
      }
      }catch(error){
        if (error.response && error.response.status === 409) {
          alert("You are an Existing User / Enter Correct Passcode");
        } 
      }
      finally{
        setLoading(false);
      }
      
  }
  const handleSignUp = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div><Header/>
    {loading ? (
      <div className="loading-screen">Loading...</div>
    ) : (
<div className="sign-up-admin-container">
      <h2 className="sign-up-admin-heading">Admin Sign Up</h2>
      <form onSubmit={handleSignUp} className="sign-up-admin-form">
        <label className="form-label">
          Username:
          <input
            type="text"
            value={admindetails.name}
            onChange={(e) => setAdminDetails({...admindetails,name:e.target.value})}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Email:
          <input
            type="email"
            value={admindetails.email}
            onChange={(e) => setAdminDetails({...admindetails,email:e.target.value})}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            value={admindetails.password}
            onChange={(e) => setAdminDetails({...admindetails,password:e.target.value})}
            required
            className="form-input"
          />
        </label>
        
        <label className="form-label">
          Passcode:
          <input
            type="password"
            value={admindetails.passcode}
            onChange={(e) => setAdminDetails({...admindetails,passcode:e.target.value})}
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
        Back
      </Link>
    </div>
    )}
    </div>
  );
};

export default SignUpAdmin;
