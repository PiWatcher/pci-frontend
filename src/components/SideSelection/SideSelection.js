//styling
import "./SideSelection.css"

// page imports
import React, { useContext, useEffect, useState, useCallback } from 'react';

// contexts
import { EnvironmentContext } from '../../contexts/EnvironmentContext';
import { DataContext } from '../../contexts/DataContext';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

// components
import RoomList from './RoomList';
import BuildingInfo from './BuildingInfo';
import AlertNotification from '../Notification/AlertNotification';

// functions
import PullRooms from '../../utilities/Dashboard/PullRooms'


/** 
* Component: SideSelection
* 
* Home layout for SideSelection and its child components
*/
const SideSelection = () => {

   // {boolean} if current user has been authenticated
   const { authStatus } = useContext(AuthenticationContext);

   // {string} building selected by the user
   const { selectedBuilding } = useContext(DataContext);

   // {string} base url for endpoints
   const { baseURL } = useContext(EnvironmentContext);

   // {list} pulled rooms from the back end database
   const [pulledRooms, setPulledRooms] = useState([]);

   // {string} type of alert to be shown
   const [alertType, setAlertType] = useState('');

   // {boolean} if alert should be shown
   const [showAlert, setShowAlert] = useState(false);

   // {int} recursive timeout variable
   const [queryInterval, setQueryInterval] = useState(null);


   /** 
   * Function: handlePullRooms
   * 
   * Uses the PullRooms utility function to query the backend database and pull list of rooms
   */
   const handlePullRooms = useCallback(async () => {

      const result = await PullRooms(baseURL, selectedBuilding);

      // if error
      if (result instanceof Error) {

         setAlertType('room-pull-failure');

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
         let timeoutID = setTimeout(handlePullRooms, 5000);

         setQueryInterval(timeoutID);

      }
   }, [baseURL, selectedBuilding]);


   /** 
   * Function: useEffect
   * 
   * Calls handlePullRooms if the selectedBuilding is not empty
   */
   useEffect(() => {

      selectedBuilding !== '' && handlePullRooms();

   }, [selectedBuilding, handlePullRooms])


   /** 
   * Function: useEffect
   * 
   * On authStatus change(user sign out), clears recursive data pull
   */
   useEffect(() => {

      clearTimeout(queryInterval);

   }, [authStatus])


   /** 
   * Return: SideSelection JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div className="room-list-container">
         <BuildingInfo selectedBuilding={selectedBuilding} />
         <RoomList selectedBuilding={selectedBuilding} pulledRooms={pulledRooms} />

         {alertType === 'room-pull-failure' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
               description={`Failed to pull data from endpoint: List of rooms within ${selectedBuilding}`} />
            :
            null}
      </div>
   )
}

export default SideSelection;