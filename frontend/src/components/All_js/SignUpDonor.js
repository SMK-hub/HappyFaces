// components/SignInAdmin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignUpDonor.css'; // Import the CSS file for styles
import Header from "./Header";
import axios from 'axios';

const SignUpDonor = () => {
  const navigate = useNavigate();
  const [donordetails,setDonorDetails] = useState ({
    name:"",
    email:"",
    password:""
});

  const[loading,setLoading]=useState(false);

  const fetchData = async()=>{
    try{
      setLoading(true);
      console.log(donordetails);
      const response= await axios.post("http://localhost:8079/donor/register",donordetails);
      const status=response.status;
      if(status == 200){
        navigate("/signin/donor");
      }
    }
    catch(error){
      alert("Your are an Existing user ,please SignIn");
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
    <div className='sign-up-donor'><Header/>
    {loading ? (
      <div className="loading-screen">Loading...</div>
    ) : (
    <div>
      <h2 className="sign-up-donor-heading">DONOR SIGN UP</h2>
      <form onSubmit={handleSignUp} className="sign-up-donor-form">
        <label className="form-label">
          Username:
          <input
            type="text"
            value={donordetails.name}
            onChange={(e) => setDonorDetails({...donordetails,name:e.target.value})}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Email:
          <input
            type="email"
            value={donordetails.email}
            onChange={(e) => setDonorDetails({...donordetails,email:e.target.value})}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            value={donordetails.password}
            onChange={(e) => setDonorDetails({...donordetails,password:e.target.value})}
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

export default SignUpDonor;
