/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Dash.css';
import Home from './components/OrphanageHome';
import { Container } from '@mui/material';
import MyContainer from './components/Container/Container';
import Profile from './components/Profile/Profile';
import EventTable from './components/Event/Events';
import Sidebar from './components/Sidebar';
import RightSide from './components/RigtSide/RightSide';
import PaymentDashboard from './components/Payments/Payment';
import MainDash from './components/MainDash/MainDash';

function DashboardOrphanage() {
  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    console.log(option)
    setSelectedOption(option);
  };
  // Function to render content based on the selected option
  const renderContent = () => {
    switch (selectedOption) {
      case 'home':
        return <Home />;
      case 'container':
        return <MyContainer />;
      case 'profile':
        return <Profile />;
      case 'events':
        return <EventTable />;
      case 'payments':
        return <PaymentDashboard />;
      case 'mainDash':
        return <MainDash />;
      default:
        return <MainDash/>; // Render nothing if no option is selected
    }
  };

  return (
    <div className='Apps'>
      <div className='AppGlass'>
        <Sidebar onOptionSelect={handleOptionSelect} />
        {renderContent()}
        <RightSide />
      </div>
    </div>
  );
}

export default DashboardOrphanage;
