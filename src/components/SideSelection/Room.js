
// styling
import './Room.css';

// page imports
import React, { useState, useEffect, useContext, useCallback } from 'react';

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

// component for room information
const Room = (props) => {

    // consume props
    const { room, count, capacity } = props;

    // consume contexts
    const { userAdminPermissions, userViewRawData } = useContext(AuthContext);
    const { selectedBuilding, selectedCharts, setSelectedCharts } = useContext(DataContext);

    // state for room usage
    const [roomUsage, setRoomUsage] = useState(0);

    // state for usage color
    const [usageColor, setUsageColor] = useState('low-usage');

    // calculates usage from given data
    const getUsage = (count, capacity) => {

        let usage = Math.trunc((count / capacity) * 100)

        return usage;
    }

    // constructs room data for packaging
    const createRoom = useCallback(() => {

        // calculates usage
        let localUsage = getUsage(count, capacity);

        if (localUsage <= 75) {

            // set to green text
            setUsageColor('low-usage');
        }

        else if (localUsage > 75) {

            // set to red text
            setUsageColor('high-usage');
        }

        // sets usage
        setRoomUsage(localUsage);

    }, [capacity, count]);

    // manages list of selected rooms for chart creation
    const selectRoom = () => {

        // public viewer limit
        let MAX_SELECTED_ROOMS = 1;

        // admin viewer limit
        if (userAdminPermissions === true) {
            MAX_SELECTED_ROOMS = 4;
        }

        // construct building/room object and add to list
        if (selectedCharts.length < MAX_SELECTED_ROOMS) {
            setSelectedCharts([...selectedCharts, { chartID: selectedCharts.length, building: selectedBuilding, room: room, capacity: capacity }]);
        }
    };

    // updates on data change (count)
    useEffect(() => {

        createRoom();

    }, [count, createRoom]);

    return (
        <li key={room} onClick={() => selectRoom(room)}>
            <div className="list-option">
                <div className="room">
                    <p>
                        {room}
                    </p>
                </div>

                {userViewRawData === true ?

                    // display raw count
                    <div className={`usage ${usageColor}`}>
                        {count} / {capacity}
                    </div>
                    :

                    // display percentage 
                    <div className={`usage ${usageColor}`}>
                        {roomUsage}%
                    </div>
                }

            </div>
        </li>
    )
}

export default Room;
