
// styling
import './RoomList.css';

// page imports
import React, { useContext, useState, useEffect } from 'react';

import Room from './Room';

// contexts
import { DataContext } from '../contexts/DataContext';
import { FilledInput } from '@material-ui/core';



const RoomList = () => {

   // consumes data from DataContext
   const { roomList } = useContext(DataContext);

   const [search, setSearch] = useState('');

   const [filteredRoomList, setFilteredRoomList] = useState([]);

   const searchHandler = (e) => {

      if (e.target.id === "roomSearch") {
         setSearch(e.target.value);
      }
   }

   const roomFilter = (filter) => {

      let filteredRooms = roomList.filter(function (item) {
         return item['room'].indexOf(filter) !== -1;
      })

      setFilteredRoomList(filteredRooms);
   }

   let nonFiltered =
      roomList.map((item, index) =>
         <Room
            key={index}
            room={item.room}
            count={item.count}
            capacity={item.capacity}
         />)

   let filtered =
      filteredRoomList.map((item, index) =>
         <Room
            key={index}
            room={item.room}
            count={item.count}
            capacity={item.capacity}
         />)

   useEffect(() => {

      roomFilter(search);

   }, [roomList, search])


   // returns parsed rooms in unordered list
   return (
      <div className="room-list-component">
         <input type="text" id="roomSearch" onChange={searchHandler} placeholder="Search for a room" />
         <ul>
            {search === '' ? nonFiltered : filtered}
         </ul>
      </div>
   )
}

export default RoomList;