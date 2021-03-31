
// styling
import './Room.css';

// page imports
import React, { useState, useEffect, useContext } from 'react';

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';


const Room = (props) => {

    // consume props
    const { room, count, capacity } = props;

    // consume context
    const { userAdminPermissions } = useContext(AuthContext);
    const { selectedBuilding, selectedCharts, setSelectedCharts } = useContext(DataContext);

    // state of room usage
    const [roomUsage, setRoomUsage] = useState(0);

    // state of usage color
    const [usageColor, setUsageColor] = useState('low-usage');

    // calculates usage from given data
    const getUsage = (count, capacity) => {

        let usage = Math.trunc((count / capacity) * 100)

        return usage;
    }

    // constructs room data for packaging
    const createRoom = () => {

        // calculates usage
        let localUsage = getUsage(count, capacity);


        if (localUsage <= 75) {

            // set to green text
            setUsageColor('low-usage');
        }

        else if (localUsage > 75 && localUsage <= 100) {

            // set to red text
            setUsageColor('high-usage');
        }

        // sets usage
        setRoomUsage(localUsage);
    }

    // manages list of selected rooms
    const selectRoom = () => {

        let MAX_SELECTED_ROOMS = 0;

        if (userAdminPermissions === true) {
            MAX_SELECTED_ROOMS = 4;
        }

        else {
            MAX_SELECTED_ROOMS = 1;
        }

        if (selectedCharts.length < MAX_SELECTED_ROOMS) {

            setSelectedCharts([...selectedCharts, { chartID: selectedCharts.length, building: selectedBuilding, room: room }])
        }
    }

    // updates on data change (new room selected)
    useEffect(() => {

        createRoom();

    }, [count])


    // returns room component
    return (
        <li key={room} onClick={() => selectRoom(room)}>
            <div className="list-option">
                <div className="room">
                    <p>
                        {room}
                    </p>
                </div>

                <div className={`usage ${usageColor}`}>
                    {roomUsage} %
                </div>
            </div>
        </li>
    )
}

export default Room;
