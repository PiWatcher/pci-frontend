
// styling
import './Dashboard.css';

// page imports
import React from 'react';

// contexts
import DataContextProvider from '../contexts/DataContext';

// components
import Navbar from './Navbar';
import RoomList from './RoomList';
import LineGraph from './LineGraph';
import TimeCard from './TimeCard';
import CountCard from './CountCard';


const Dashboard = () => {

   // returns the entire dashboard and its child components
   return (
      <div className="dashboard-container">
         <DataContextProvider>
            <Navbar />

            <div className="time-card-container">
               <TimeCard />
            </div>

            <div className="data-row">
               <div className="line-graph-container">
                  <LineGraph />
               </div>

               <div className="room-list-container">
                  <CountCard />
                  <RoomList />
               </div>
            </div>

         </DataContextProvider>
      </div >
   );
}

export default Dashboard;