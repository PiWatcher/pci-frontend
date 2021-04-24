
// styling
import './Dashboard.css';

// page imports
import React, { useContext, useEffect, useState, useCallback } from 'react';

// contexts
import { DataContext } from '../contexts/DataContext';

// components
import Navbar from './Navigation/Navbar';
import SideSelection from './SideSelection/SideSelection';
import ChartLayout from './Graph/ChartLayout';
import AlertNotification from '../components/Notification/AlertNotification';

import PullBuildings from '../components/Utilities/Dashboard/PullBuildings'
import PullRooms from '../components/Utilities/Dashboard/PullRooms'

// entire dashboard and all children components
const Dashboard = () => {

   // consume context
   const { selectedBuilding, baseURL } = useContext(DataContext);

   // creates state: list of buildings pulled from endpoint
   const [pulledBuildings, setPulledBuildings] = useState([]);

   // creates state: list of buildings pulled from endpoint
   const [pulledRooms, setPulledRooms] = useState([]);

   // creates state: list of buildings pulled from endpoint
   const [alertType, setAlertType] = useState('');

   // creates state: list of buildings pulled from endpoint
   const [showAlert, setShowAlert] = useState('');

   const handlePullBuildings = useCallback(async () => {

      const result = await PullBuildings(baseURL);

      if (result instanceof Error) {

         setAlertType('building-pull-failure')

         // display alert
         setShowAlert(true);

      } else {
         let resultData = result.data.data;

         // sorts buildings
         let localBuildingList = resultData.sort(function (a, b) {
            return a.localeCompare(b, undefined, {
               numeric: false,
               sensitivity: 'base'
            });
         });

         // sets state list of buildings
         setPulledBuildings(localBuildingList);
      }
   }, [baseURL]);

   const handlePullRooms = useCallback(async () => {

      const result = await PullRooms(baseURL, selectedBuilding);

      if (result instanceof Error) {

         setAlertType('room-pull-failure');

         // display alert
         setShowAlert(true);
      } else {

         let resultData = result.data.data;

         // sorts rooms in order
         let localRoomList = resultData.sort(function (a, b) {
            return a._id.localeCompare(b._id, undefined, {
               numeric: true,
               sensitivity: 'base'
            });
         });

         // sets state to list of rooms
         setPulledRooms(localRoomList);

         // five second refresh on successful data pull
         setTimeout(handlePullRooms, 5000);

      }
   }, [baseURL, selectedBuilding]);

   // updates room list on selected building change
   useEffect(() => {

      // pull rooms from API
      handlePullBuildings();

   }, [handlePullBuildings])

   useEffect(() => {

      selectedBuilding !== '' && handlePullRooms();

   }, [selectedBuilding, handlePullRooms])

   return (
      <div className="dashboard-container">

         <Navbar pulledBuildings={pulledBuildings} />

         <div className="dashboard-row">
            <div className="chart-container">

               <ChartLayout />

            </div>

            {/* hidden until building is selected */}
            {selectedBuilding !== '' ?
               <SideSelection pulledRooms={pulledRooms} />
               : null
            }

         </div >

         {showAlert && alertType === 'building-pull-failure' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
               description={`Failed to pull data from endpoint: building list`} />
            :
            null}

         {showAlert && alertType === 'room-pull-failure' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
               description={`Failed to pull data from endpoint: List of rooms within ${selectedBuilding}`} />
            :
            null}

      </div >
   );
}

export default Dashboard;