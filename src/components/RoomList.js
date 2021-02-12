
// styling
import './RoomList.css';

// page imports
import React, { useContext } from 'react';

// contexts
import { DataContext } from '../contexts/DataContext';



const RoomList = () => {

   // consumes data from DataContext
   const { roomList, setRoom } = useContext(DataContext);

   // FIX: parse for room cleanup for display

   // FIX: each room needs a key
   const listItems = roomList.map((room) => <li key={room} onClick={() => setRoom(room)} >{room}</li>)

   // returns parsed rooms in unordered list
   return (
      <div className="room-list">
         <ul>{listItems}</ul>
      </div>
   )
}

export default RoomList;