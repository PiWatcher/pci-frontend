
// styling
import './RoomList.css';

// page imports
import React, { useState, useEffect } from 'react';
import Room from './Room';

const RoomList = (props) => {

   // consume props
   const { building, rooms } = props;

   const [search, setSearch] = useState('');

   const [filteredRoomList, setFilteredRoomList] = useState([]);

   // pulls search text for processing
   const searchHandler = (e) => {
      if (e.target.id === "roomSearch") {
         setSearch(e.target.value);
      }
   }

   // filters out rooms based on search text
   const roomFilter = (filter) => {

      let filteredRooms = rooms.filter(function (item) {
         return item['_id'].toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      })

      // maps only rooms that match search query
      let filtered =
         filteredRooms.map((item, index) =>
            <Room
               key={index}
               room={item._id}
               count={item.current_count}
               capacity={0}
            />)

      setFilteredRoomList(filtered);
   }


   // filters rooms on room list change and query change
   useEffect(() => {

      setSearch('');

   }, [building])


   // filters rooms on room list change and query change
   useEffect(() => {

      roomFilter(search);

   }, [rooms, search])


   // returns parsed rooms in unordered list
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