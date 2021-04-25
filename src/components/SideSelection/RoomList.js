
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
*/
const RoomList = (props) => {

   const { selectedBuilding, pulledRooms } = props;

   // state for search value
   const [search, setSearch] = useState('');

   // state for filtered room list
   const [filteredRoomList, setFilteredRoomList] = useState([]);


   /** 
    * Function: handleRoomSearch
    * 
    * Takes user search input and sets to state
    */
   const handleRoomSearch = (e) => {
      if (e.target.id === "roomSearch") {
         setSearch(e.target.value);
      }
   }


   /** 
   * Function: handleRoomFilter
   * 
   * Filters displayed rooms based on the state of the search bar
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
         <input type="text" id="roomSearch" onChange={handleRoomSearch} placeholder="Search for a room" value={search} />
         <div className="room-list-component">
            <ul>
               {filteredRoomList}
            </ul>
         </div>
      </div>
   )
}

export default RoomList;