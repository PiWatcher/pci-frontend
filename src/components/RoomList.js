
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


   const parseRoom = (roomString) => {

      let index;
      let capitalizedRoomString;

      // text cleanup for showing
      for (index = 0; index < roomString.length; index++) {
         let name1 = roomString.split('-')[0]
         let name2 = roomString.split('-')[1]
         let cleanedRoomString = name1 + " " + name2
         capitalizedRoomString = cleanedRoomString.charAt(0).toUpperCase()
            + cleanedRoomString.slice(1);
      }

      return capitalizedRoomString;
   }


   const listItems = roomList.map(

      (room) =>
         <li key={room} onClick={() => setRoom(room)}>
            <div className="list-option">
               <div className="room">
                  {parseRoom(room)}
               </div>

               <div className="usage">
                  0%
               </div>

               <div className="trend">
                  <img className="logo" src={trendIcon} alt="Current trend of room" />
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