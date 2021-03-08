
// styling
import './RoomList.css';

// page imports
import React, { useContext, useState, useEffect } from 'react';
import Room from './Room';

// contexts
import { DataContext } from '../contexts/DataContext';



const RoomList = () => {

   // consumes data from DataContext
   const { roomList } = useContext(DataContext);

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

      setFilteredRoomList(filteredRooms);
   }

   // maps all rooms in data set
   let nonFiltered =
      roomList.map((item, index) =>
         <Room
            key={index}
            room={item.room}
            count={item.count}
            capacity={item.capacity}
         />)

   // maps only rooms that match search query
   let filtered =
      filteredRoomList.map((item, index) =>
         <Room
            key={index}
            room={item.room}
            count={item.count}
            capacity={item.capacity}
         />)

   // filters rooms on room list change and query change
   useEffect(() => {

      roomFilter(search);

   }, [roomList, search])


   // returns parsed rooms in unordered list
   return (
      <div>
         <input type="text" id="roomSearch" onChange={searchHandler} placeholder="Search for a room" />
         <div className="room-list-component">

            <ul>
               {search === '' ? nonFiltered : filtered}
            </ul>
         </div>
      </div>
   )
}

export default RoomList;