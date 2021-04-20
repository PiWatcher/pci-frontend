
// styling
import './Dashboard.css';

// page imports
import React, { useContext } from 'react';

// contexts
import { DataContext } from '../contexts/DataContext';

// components
import Navbar from './Navigation/Navbar';
import SideSelection from './SideSelection/SideSelection';
import ChartLayout from './Graph/ChartLayout';

// entire dashboard and all children components
const Dashboard = () => {

   // consume context
   const { selectedBuilding } = useContext(DataContext);

   return (
      <div className="dashboard-container">

         <Navbar />

         <div className="dashboard-row">
            <div className="chart-container">

               <ChartLayout />

            </div>

            {/* hidden until building is selected */}
            {selectedBuilding !== '' ?
               <SideSelection />
               : null
            }

         </div >
      </div >
   );
}

export default Dashboard;