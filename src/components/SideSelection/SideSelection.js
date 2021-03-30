//styling
import "./SideSelection.css"

// page imports
import React, { useContext, useState, useEffect } from 'react';
import RoomList from './RoomList';
import BuildingUsage from './BuildingUsage';
import axios from 'axios';

// contexts
import { DataContext } from '../../contexts/DataContext';


const SideSelection = () => {

    // consumes context
    const { selectedBuilding, baseURL } = useContext(DataContext);

    // creates state for pulled rooms
    const [pulledRooms, setPulledRooms] = useState([]);

    // creates state for building information
    const [buildingInfo, setBuildingInfo] = useState({});

    // API pull logic for rooms in selected building
    const pullRoomData = async () => {

        const roomListEndpoint = `${baseURL}:5000/api/data/building/rooms`;

        // tries to pull room data
        try {

            const response = await axios({
                method: 'get',
                url: roomListEndpoint,
                params: {
                    building_name: selectedBuilding
                }
            });

            // successfully connected to endpoint and pulled rooms in building
            if (response.status === 200) {

                // sets state to list of rooms
                setPulledRooms(response.data.data);

                console.log(response);

                // sets building info
                setBuildingInfo({ count: response.data.count_total, capacity: 1 });
            }
        }

        // failed to pull room
        catch (error) {
            alert(error.response.data['description']);
            console.log(error.response.data['description']);
        }
    };

    // updates room list on selected building change
    useEffect(() => {

        pullRoomData();

        // five seconds interval for data refresh 
        const interval = setInterval(() => {
            console.log('grabbing rooms');
            pullRoomData();
        }, 5000);

        return () => clearInterval(interval);

    }, [selectedBuilding])

    // returns side selection component and its children
    return (
        <div className="room-list-container">
            <BuildingUsage building={selectedBuilding} buildingInfo={buildingInfo} />
            <RoomList building={selectedBuilding} rooms={pulledRooms} />
        </div>
    )
}

export default SideSelection;