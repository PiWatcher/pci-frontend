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

    // consumes data from DataContext
    const { selectedBuilding, baseURL } = useContext(DataContext);

    // creates state: list of rooms pulled from endpoint
    const [pulledRooms, setPulledRooms] = useState([]);

    const [buildingInfo, setBuildingInfo] = useState({});

    // API pull logic for rooms in selected building
    const pullRoomData = async () => {

        // tries to pull and parse building data
        try {

            const response = await axios({
                method: 'get',
                url: `${baseURL}:5000/api/data/building/rooms`,
                params: {
                    building_name: selectedBuilding
                }
            });

            // successfully connected to endpoint and pulled room data
            if (response.status === 200) {

                // sets state to list of rooms
                setPulledRooms(response.data.data);

                setBuildingInfo({ count: response.data.count_total, capacity: 1 })
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
            <BuildingUsage building={selectedBuilding} buildingInfo={buildingInfo} />
            <RoomList building={selectedBuilding} rooms={pulledRooms} />
        </div>
    )
}

export default SideSelection;