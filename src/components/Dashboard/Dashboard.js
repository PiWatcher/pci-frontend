
// styling
import './Dashboard.css';

// page imports
import React, { useContext, useEffect, useState, useCallback } from 'react';

// contexts
import { DataContext } from '../../contexts/DataContext';
import { EnvironmentContext } from '../../contexts/EnvironmentContext'

// components
import Navbar from '../Navigation/Navbar';
import SideSelection from '../SideSelection/SideSelection';
import ChartLayout from '../ChartLayout/ChartLayout';
import AlertNotification from '../Notification/AlertNotification';

// functions
import PullBuildings from '../../utilities/Dashboard/PullBuildings'


/** 
* Component: Dashboard
* 
* Home layout for dashboard and its child components
*/
const Dashboard = () => {

   const {

      // {string} current building selected by the user
      selectedBuilding

   } = useContext(DataContext);

   const {

      // {string} base URL for the endpoints
      baseURL

   } = useContext(EnvironmentContext);

   // {list} buildings pulled from endpoint
   const [pulledBuildings, setPulledBuildings] = useState([]);

   // {string} type alert to be shown
   const [alertType, setAlertType] = useState('');

   // {boolean} if alert should be shown
   const [showAlert, setShowAlert] = useState(false);

   // {string} message to be shown in the alert
   const [alertMessage, setAlertMessage] = useState('');


   /** 
    * Function: handlePullBuildings
    * 
    * Uses the PullBuildings utility function to query the backend database and pull list of buildings
    */
   const handlePullBuildings = useCallback(async () => {

      const result = await PullBuildings(baseURL);

      // is error is returned
      if (result instanceof Error) {

         setAlertType('building-pull-failure')

         setAlertMessage(result.message);

         setShowAlert(true);

      } else {

         let resultData = result.data.data;

         // sorts buildings in natural order
         let localBuildingList = resultData.sort(function (a, b) {
            return a.localeCompare(b, undefined, {
               numeric: false,
               sensitivity: 'base'
            });
         });

         setPulledBuildings(localBuildingList);
      }
   }, [baseURL]);


   /** 
    * Function: useEffect
    * 
    * On component creation, calls handlePullBuildings
    */
   useEffect(() => {

      handlePullBuildings();

   }, [handlePullBuildings])


   /** 
    * Return: Dashboard JSX
    * 
    * Returns the layout for display in the browser
    */
   return (
      <div className="dashboard-container">

         <Navbar pulledBuildings={pulledBuildings} />

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

         {alertType === 'building-pull-failure' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Building Pull Failure'}
               description={alertMessage} />
            :
            null}
      </div >
   );
}

export default Dashboard;