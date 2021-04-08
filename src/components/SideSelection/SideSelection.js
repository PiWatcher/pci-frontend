//styling
import "./SideSelection.css"

// page imports
import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// components
import RoomList from './RoomList';
import BuildingInfo from './BuildingInfo';
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { DataContext } from '../../contexts/DataContext';

// component for sidebar and its child components
const SideSelection = () => {

    // consume context
    const { selectedBuilding, baseURL } = useContext(DataContext);

    // creates state for pulled rooms
    const [pulledRooms, setPulledRooms] = useState([]);

    // state for alert
    const [showAlert, setShowAlert] = useState(false);

    // API pull logic for rooms in selected building
    const pullRoomData = useCallback(async () => {

        // endpoint URL
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

                let responseData = response.data.data;

                // sorts rooms in order
                let localRoomList = responseData.sort(function (a, b) {
                    return a._id.localeCompare(b._id, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                    });
                });

                // sets state to list of rooms
                setPulledRooms(localRoomList);
            }
        }

        // failed to pull room
        catch (error) {

            // display alert
            setShowAlert(true);

            // display error to console for debugging
            console.error('Error', error.response);
        }
    }, [baseURL, selectedBuilding]);

    // updates room list on selected building change
    useEffect(() => {

        pullRoomData();

        // five seconds interval for data refresh 
        const interval = setInterval(() => {
            pullRoomData();
        }, 5000);

        return () => clearInterval(interval);

    }, [selectedBuilding, pullRoomData])

    // returns side selection component and its children
    return (
        <div className="room-list-container">
            <BuildingInfo building={selectedBuilding} />
            <RoomList building={selectedBuilding} rooms={pulledRooms} />

            {showAlert === true ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
                    description={`Failed to pull data from endpoint: List of rooms within ${selectedBuilding}`} />
                :
                null}
        </div>
    )
}

export default SideSelection;