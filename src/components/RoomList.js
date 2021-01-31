import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import './RoomList.css';


const RoomList = () => {

    const { roomList, setRoom } = useContext( DataContext );

    // FIX: parse for room cleanup for display

    // FIX: each room needs a key
    const listItems = roomList.map((room) => <li onClick = {() => setRoom(room)} >{room}</li>)

    return (
      <div className="room-list">
        <ul>{listItems}</ul>
      </div>
    )
}
 
export default RoomList;