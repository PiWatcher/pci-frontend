
// styling
import './RoomList.css';

// page imports
import React, { useContext, useState } from 'react';
import upArrow from '../images/Green_Arrow_Up.svg';
import downArrow from '../images/Red_Arrow_Down.svg'
import horizontalLine from '../images/Horizontal_Line.svg';

// contexts
import { DataContext } from '../contexts/DataContext';



const RoomList = () => {

   // consumes data from DataContext
   const { roomList, setRoom } = useContext(DataContext);

   const [trendIcon, setTrendIcon] = useState(horizontalLine);

   const listItems = roomList.map(

      (room) =>
         <li key={room} onClick={() => setRoom(room)}>
            <div className="list-option">
               <div className="room">
                  <p>
                     {room}
                  </p>
               </div>

               <div className="usage">
                  <p>
                     0%
                  </p>

               </div>

               <div className="trend">
                  <p>
                     <img className="logo" src={trendIcon} alt="Current trend of room" />
                  </p>
               </div>
            </div>

         </li>
   )

   // returns parsed rooms in unordered list
   return (
      <div className="room-list-component">
         <ul>{listItems}</ul>
      </div>
   )
}

export default RoomList;