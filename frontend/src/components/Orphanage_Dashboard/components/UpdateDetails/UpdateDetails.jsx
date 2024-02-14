import React, { useState } from 'react';
import './UpdateDetails.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    Name: '',
    DirectorName: '',
    Contact: '',
    Description: '',
    HouseNumber: '',
    StreetAddress: '',
    City: '',
    State: '',
    ZipCode: '',
    Country: '',
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
    console.log('Form submitted:', formData);
  };

  const handlePasswordChange = () => {
    console.log('Password change requested');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Orphanage Details</h1>
        <label>
          Name:
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
        </label>
        <label>
          Director Name:
          <input type="text" name="DirectorName" value={formData.DirectorName} onChange={handleChange} />
        </label>
        <label>
          Contact:
          <input type="text" name="Contact" value={formData.Contact} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="Description" value={formData.Description} onChange={handleChange}></textarea>
        </label>
        <div className="address-inputs">
          <h3>Address</h3>
          <form>
            <label>
            House Number:
            <input type="text" name="HouseNumber" value={formData.HouseNumber} onChange={handleChange} />
          </label>
          <label>
            Street Address:
            <input type="text" name="StreetAddress" value={formData.StreetAddress} onChange={handleChange} />
          </label>
          <label>
            City:
            <input type="text" name="City" value={formData.City} onChange={handleChange} />
          </label>
          <label>
            State:
            <input type="text" name="State" value={formData.State} onChange={handleChange} />
          </label>
          <label>
            Zip Code:
            <input type="text" name="ZipCode" value={formData.ZipCode} onChange={handleChange} />
          </label>
          <label>
            Country:
            <input type="text" name="Country" value={formData.Country} onChange={handleChange} />
          </label>
          </form>
          
        </div>
        <label>
          Website:
          <input type="text" name="Website" value={formData.Website} onChange={handleChange} />
        </label>
        <label>
          Requirements:
          <select name="Requirements" value={formData.Requirements} onChange={handleChange}>
            <option value="">Select Requirement</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="others">Others</option>
          </select>
        </label>
        <label>
          Priority Status:
          <select name="PriorityStatus" value={formData.PriorityStatus} onChange={handleChange}>
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
  );
};

export default FormComponent;
