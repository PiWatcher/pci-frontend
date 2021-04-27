
// styling
import './Room.css';

// page imports
import React, { useState, useEffect, useContext, useCallback } from 'react';

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';


/** 
* Component: Room
* 
* Holds information for each room for display in RoomList
*
* @param {props} props
*/
const Room = (props) => {

   const {

      // {string} name of room
      room,

      // {int} current count of room
      count,

      // {int} capacity of room
      capacity

   } = props;

   const {

      // {boolean} if user has admin privileges
      userAdminPermissions,

      // {boolean} if user has raw data viewing privileges
      userViewRawData

   } = useContext(AuthenticationContext);

   const {

      // {string} building selected by the user
      selectedBuilding,

      // {list} list of selected chart objects
      selectedCharts,

      // {function} set the list of selected chart objects
      setSelectedCharts

   } = useContext(DataContext);

   // {int} calculated room usage
   const [roomUsage, setRoomUsage] = useState(0);

   // {string} styling color for the calculated room usage
   const [usageColor, setUsageColor] = useState('low-usage');


   /** 
   * Function: findRoomUsage
   * 
   * Calculates the usage of the room
   * 
   * @param {int} count
   * @param {int} capacity
   */
   const findRoomUsage = (count, capacity) => {

      let usage = Math.trunc((count / capacity) * 100)

      return usage;
   }


   /** 
   * Function: setRoomUsageStyling
   * 
   * Designates the styling for the usage section of the room component
   */
   const setRoomUsageStyling = useCallback(() => {

      // calculates usage
      let localUsage = findRoomUsage(count, capacity);

      if (localUsage <= 75) {

         // set to green text
         setUsageColor('low-usage');
      }

      else if (localUsage > 75) {

         // set to red text
         setUsageColor('high-usage');
      }

      // sets usage
      setRoomUsage(localUsage);

   }, [capacity, count]);


   /** 
   * Function: handleRoomSelect
   * 
   * Checks user permissions before allowing new rooms to be selected, then sets the selected rooms information into context
   */
   const handleRoomSelect = () => {

      // public viewer limit
      let MAX_SELECTED_ROOMS = 1;

      // admin viewer limit
      if (userAdminPermissions) {
         MAX_SELECTED_ROOMS = 4;
      }

      // construct building/room object and add to list
      if (selectedCharts.length < MAX_SELECTED_ROOMS) {
         setSelectedCharts([...selectedCharts, { chartID: selectedCharts.length, building: selectedBuilding, room: room, capacity: capacity }]);
      }
   };


   /** 
   * Function: useEffect
   * 
   * Calls setRoomUsageStyling on new data being passed down (room, count, etc.)
   */
   useEffect(() => {

      setRoomUsageStyling();

   }, [count, setRoomUsageStyling]);


   /** 
   * Return: Room JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <li key={room} onClick={() => handleRoomSelect(room)}>
         <div className="list-option">
            <div className="room">
               <p>
                  {room}
               </p>
            </div>

            {/* check if user can view raw data */}
            {userViewRawData ?

               // if yes, display raw count
               <div className={`usage ${usageColor}`}>
                  {count} / {capacity}
               </div>
               :

               // if no, display percentage 
               <div className={`usage ${usageColor}`}>
                  {roomUsage}%
                    </div>
            }

         </div>
      </li>
   )
}

export default Room;
