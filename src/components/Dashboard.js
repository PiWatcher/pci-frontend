
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
      <div className="Dashboard">
         <DataContextProvider>
            <Navbar />

            <div className="column">
               <TimeCard />
            </div>

            <div className="column">
               <CountCard />
            </div>

            <div className="column">
               <LineGraph />
            </div>

            <div className="column">
               <RoomList />
            </div>

         </DataContextProvider>
      </div>
   );
}

export default Dashboard;