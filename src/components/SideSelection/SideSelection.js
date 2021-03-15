// styling
import './RoomList.css';

// page imports
import React, { useContext, useState, useEffect } from 'react';
import RoomList from './RoomList';
import BuildingUsage from './BuildingUsage';
import axios from 'axios';

// contexts
import { DataContext } from '../../contexts/DataContext';


const SideSelection = () => {

    // consumes data from DataContext
    const { selectedBuilding, baseURL } = useContext(DataContext);

    // creates state: list of rooms pulled from endpoint
    const [pulledRooms, setPulledRooms] = useState([]);

    // API pull and parse logic for rooms in selected building
    const pullRoomData = async () => {

        let localRoomList = [];

        // tries to pull and parse building data
        try {
            const response = await axios({
                method: 'get',
                url: `${baseURL}:5000/api/data/building`,
                params: {
                    building: selectedBuilding
                }
            });

            // successfully connected to endpoint and pulled data
            if (response.status === 200) {

                let roomData = response.data.data;

                // compiles list of rooms (from end of data source for latest count)
                for (let roomIndex = roomData.length - 1; roomIndex >= 0; roomIndex--) {

                    // console.log(localRoomList);

                    let roomName = roomData[roomIndex]["endpoint"];

                    if (roomName != null) {
                        // adds room to list if not already within
                        if (localRoomList.map(function (item) { return item.room; }).indexOf(roomName) === -1) {

                            let roomCount = roomData[roomIndex]["count"];
                            let roomCapacity = roomData[roomIndex]["room_capacity"];

                            // creates building object and pushes to list 
                            localRoomList.push({
                                room: roomName,
                                count: roomCount,
                                capacity: roomCapacity
                            });
                        }
                    }
                }

                // sorts rooms in order
                localRoomList = localRoomList.sort(function (a, b) {
                    return a.room.localeCompare(b.room, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                    });
                });

                // sets state to sorted list of rooms
                setPulledRooms(localRoomList);
            }

        }

        // failed to sign in
        catch {
            console.log("Failed to pull rooms.")
        }
    };


    // filters rooms on room list change and query change
    useEffect(() => {

        pullRoomData();

        // five seconds interval for data refresh 
        const interval = setInterval(() => {
            console.log('grabbing rooms');
            pullRoomData();
        }, 5000);

        return () => clearInterval(interval);

    }, [selectedBuilding])


    // returns parsed rooms in unordered list
    return (
        <div className="room-list-container">
            <BuildingUsage building={selectedBuilding} rooms={pulledRooms} />
            <RoomList building={selectedBuilding} rooms={pulledRooms} />
        </div>
    )
}

export default SideSelection;