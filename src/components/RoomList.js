
// styling
import './RoomList.css';

// page imports
import React, { useContext, useState, useEffect } from 'react';
import Room from './Room';

// contexts
import { DataContext } from '../contexts/DataContext';



const RoomList = () => {

   // consumes data from DataContext
   const { building, roomList } = useContext(DataContext);

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

      let filteredRooms = roomList.filter(function (item) {
         return item['room'].indexOf(filter) !== -1;
      })

      // maps only rooms that match search query
      let filtered =
         filteredRooms.map((item, index) =>
            <Room
               key={index}
               room={item.room}
               count={item.count}
               capacity={item.capacity}
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

   }, [roomList, search])


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