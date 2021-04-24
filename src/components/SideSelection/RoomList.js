
// styling
import './RoomList.css';

// page imports
import React, { useState, useEffect, useCallback } from 'react';
import Room from './Room';

const RoomList = (props) => {

   // consume props
   const { selectedBuilding, pulledRooms } = props;

   // state for search value
   const [search, setSearch] = useState('');

   // state for filtered room list
   const [filteredRoomList, setFilteredRoomList] = useState([]);

   // pulls search text for processing
   const searchHandler = (e) => {
      if (e.target.id === "roomSearch") {
         setSearch(e.target.value);
      }
   }

   // filters out rooms based on search text
   const roomFilter = useCallback((filter) => {

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


   // on building change, resets filter to empty
   useEffect(() => {

      setSearch('');

   }, [selectedBuilding])


   // filters rooms on room list or search query change
   useEffect(() => {

      roomFilter(search);

   }, [pulledRooms, search, roomFilter])


   // returns filtered rooms
   return (
      <div>
         <input type="text" id="roomSearch" onChange={searchHandler} placeholder="Search for a room" value={search} />
         <div className="room-list-component">
            <ul>
               {filteredRoomList}
            </ul>
         </div>
      </div>
   )
}

export default RoomList;