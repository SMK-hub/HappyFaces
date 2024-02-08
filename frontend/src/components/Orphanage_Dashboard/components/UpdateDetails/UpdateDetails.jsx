import React, { useState } from 'react';
import './UpdateDetails.css';
import Sidebar from '../Sidebar';
import RightSide from '../RigtSide/RightSide';


const FormComponent = () => {
  const [formData, setFormData] = useState({
    Name: '',
    DirectorName: '',
    Contact: '',
    Description: '',
    Address: '',
    Website: '',
    Requirements: '',
    PriorityStatus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
    console.log('Form submitted:', formData);
  };

  const handlePasswordChange = () => {
    // Add your logic to handle password change
    console.log('Password change requested');
  };

  return (
    <div className='Dashb'>
      <div className='DashbGlass'>
        <Sidebar/>
        <div className="form-container" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <form onSubmit={handleSubmit}>
        <h1>Orphanage Details</h1>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Director Name:
          <input type="text" name="directorName" value={formData.directorName} onChange={handleChange} />
        </label>
        <label>
          Contact:
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        
        <label>
          Website:
          <input type="text" name="website" value={formData.website} onChange={handleChange} />
        </label>
        <label>
          Requirements:
          <select name="requirements" value={formData.requirements} onChange={handleChange}>
            <option value="">Select Requirement</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="books">Others</option>
          </select>
        </label>
        <label>
          Priority Status:
          <select name="priorityStatus" value={formData.priorityStatus} onChange={handleChange}>
            <option value="">Select Priority Status</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
        </label>

        <div className="button-container">
          <button type="submit">Update</button>
          <button type="button" onClick={handlePasswordChange}>Change Password</button>
        </div>
      </form>
    </div>
    <RightSide/>
      </div>
      
    </div>
           
    
    
  );
};

export default FormComponent;
