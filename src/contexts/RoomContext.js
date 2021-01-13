import React, { createContext, useState, useEffect, useContext } from 'react';
import { BuildingContext } from './BuildingContext';
import axios from 'axios'


// context that pulls and parses rooms in the selected building

export const RoomContext = createContext();

const RoomContextProvider = (props) => {

    // consumes state from building selection
    const { building } = useContext( BuildingContext );

    // creates state: list of rooms
    const [ roomList, setRoomList ] = useState([]);

    // creates state: selected room
    const [ room, setRoom] = useState('');


    // API pull and parse logic for rooms in selected building
    const getRooms = async () => {

        const response = await axios('http://127.0.0.1:5000/api/'.concat('SICCS')); // .concat(building)

        const mongoData = response.data;

        // BUG: repeats rooms
        // loop through rooms and adds to list for viewing
        for (var roomIndex = 0; roomIndex < 2; roomIndex++) {

            var roomName = mongoData.data[roomIndex]['endpoint'];

            if (roomList.indexOf(roomName) < 0) {
                setRoomList (roomList => [...roomList, roomName]);
            }
        }
    };


    useEffect(() => {
        building !== '' && getRooms();
    }, [building])


    return (
        <RoomContext.Provider value = {{building, roomList, room, setRoom }}>
            { props.children }
        </RoomContext.Provider>
    )
}

export default RoomContextProvider