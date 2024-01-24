import './DashboardAdmin.css'
import React, { useState } from 'react';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import OrphDash from './components/OrphDash/OrphDash';
import Home from './components/AdminHome';

function DashboardAdmin() {
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
      case 'Dashboard':
        return <Home />;
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


export default DashboardAdmin;
