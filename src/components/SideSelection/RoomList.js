
// styling
import './RoomList.css';

// page imports
import React, { useState, useEffect, useCallback } from 'react';
import Room from './Room';

const RoomList = (props) => {

   // consume props
   const { building, rooms } = props;

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
      let filteredRooms = rooms.filter(function (item) {
         return item['_id'].toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      })

      // maps filtered rooms to room components
      let filtered =
         filteredRooms.map((item, index) =>
            <Room
               key={index}
               room={item._id}
               count={item.current_count}
               capacity={50}
            />)

      // sets the state
      setFilteredRoomList(filtered);
   }, [rooms]);


   // on building change, resets filter to empty
   useEffect(() => {

      setSearch('');

   }, [building])


   // filters rooms on room list change and query change
   useEffect(() => {

      roomFilter(search);

   }, [rooms, search, roomFilter])


   // returns filtered rooms in unordered list
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