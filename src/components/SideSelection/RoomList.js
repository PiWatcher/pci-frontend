
// styling
import './RoomList.css';

// page imports
import React, { useState, useEffect, useCallback } from 'react';

// components
import Room from './Room';


/** 
* Component: RoomList
* 
* Maps all pulled rooms to room components and displays them within the list
*
* @param {props} props
*/
const RoomList = (props) => {

   const {

      // {string} building selected by the user
      selectedBuilding,

      // {list} pulled rooms from the back end database
      pulledRooms

   } = props;

   // {string} text pulled from search
   const [search, setSearch] = useState('');

   // {list} filtered rooms based on filtered search text
   const [filteredRoomList, setFilteredRoomList] = useState([]);


   /** 
    * Function: handleRoomSearch
    * 
    * Takes user search input and sets to state
    * 
    * @param {event} event
    */
   const handleRoomSearch = (event) => {
      if (event.target.id === "roomSearch") {
         setSearch(event.target.value);
      }
   }


   /** 
   * Function: handleRoomFilter
   * 
   * Filters displayed rooms based on the state of the search bar
   * 
   * @param {string} filter
   */
   const handleRoomFilter = useCallback((filter) => {

      // filters room list
      let filteredRooms = pulledRooms.filter(function (item) {
         return item['_id'].toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      })

      // maps filtered rooms to room components
      let filtered =
         filteredRooms.map((item, index) =>
            <Room
               key={index}
               room={item._id}
               count={item.current_count}
               capacity={item.room_capacity[0]}
            />)

      // sets the state
      setFilteredRoomList(filtered);

   }, [pulledRooms]);


   /** 
   * Function: useEffect
   * 
   * Sets search back to empty on selectedBuilding change
   */
   useEffect(() => {

      setSearch('');

   }, [selectedBuilding])


   /** 
   * Function: useEffect
   * 
   * Refilters rooms based on changing user text search input
   */
   useEffect(() => {

      handleRoomFilter(search);

   }, [pulledRooms, search, handleRoomFilter])


   /** 
    * Return: RoomList JSX
    * 
    * Returns the layout for display in the browser
    */
   return (
      <div>
         <input type="text" id="roomSearch" onChange={handleRoomSearch} placeholder="Room search" value={search} />
         <div className="room-list-component">
            <ul>
               {filteredRoomList}
            </ul>
         </div>
      </div>
   )
}

export default RoomList;