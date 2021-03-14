
// styling
import './Dashboard.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// page imports
import React, { useContext } from 'react';


// contexts

import { DataContext } from '../contexts/DataContext';

// components
import Navbar from './Navigation/Navbar';
import SideSelection from './SideSelection/SideSelection';
import ChartLayout from './Graph/ChartLayout';


const Dashboard = () => {

   // consume data from DataContext
   const { selectedBuilding } = useContext(DataContext);


   // returns the entire dashboard and its child components
   return (
      <div className="dashboard-container">

         <Navbar />

         <div className="data-row">
            <div className="line-graph-container">

               <ChartLayout />

            </div>

            {selectedBuilding !== '' ?
               <SideSelection />
               : null
            }

         </div >
      </div >
   );
}

export default Dashboard;