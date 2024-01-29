import './DashboardAdmin.css'
import React, { useState } from 'react';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import OrphDash from './components/OrphDash/OrphDash.jsx';
import Home from './components/AdminHome';

function DashboardAdmin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    console.log(option)
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return <Home/>;
      case 'Orphanages':
        return <OrphDash />;
      // case 'profile':
      //   return <Profile />;
      // case 'events':
      //   return <EventTable />;
      // case 'payments':
      //   return <PaymentDashboard />;
      case 'mainDash':
        return <MainDash />;
      default:
        return <MainDash />;     
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


export default DashboardAdmin;
