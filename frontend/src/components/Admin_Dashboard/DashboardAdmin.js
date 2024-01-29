import './DashboardAdmin.css'
import React, { useState } from 'react';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import OrphDash from './components/OrphDash/OrphDash.jsx';
import Home from './components/AdminHome';
import Settings from './components/Settings/Settings.jsx';

function DashboardAdmin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    console.log(option)
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Dashboard':
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
      case 'Settings':
        return <Settings />;  
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
