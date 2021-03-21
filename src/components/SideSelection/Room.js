
// styling
import './Room.css';

// page imports
import React, { useState, useEffect, useContext } from 'react';

// contexts
import { DataContext } from '../../contexts/DataContext';



const Room = (props) => {

    // consume props
    const { room, count, capacity } = props;

    // consume data from DataContext
    const { selectedRooms, setSelectedRooms } = useContext(DataContext);

    // state of room usage
    const [roomUsage, setRoomUsage] = useState(0);

    // state of trend
    const [usageColor, setUsageColor] = useState('low-usage');

    // calculates usage from given data
    const getUsage = (count, capacity) => {

        let usage = Math.trunc((count / capacity) * 100)

        return usage;
    }

    // constructs room data for packaging
    const createRoom = () => {

        let localUsage = getUsage(count, capacity);

        if (localUsage <= 50) {

            // set to green text
            setUsageColor('low-usage');
        }

        else if (localUsage > 50 && localUsage <= 75) {

            // set to red down arrow
            setUsageColor('moderate-usage');
        }

        else if (localUsage > 75 && localUsage <= 100) {

            // set to horizontal line
            setUsageColor('high-usage');
        }

        setRoomUsage(localUsage);
    }

    // constructs room data for packaging
    const selectRoom = () => {

        const MAX_SELECTED_ROOMS = 4;

        if (selectedRooms.length < MAX_SELECTED_ROOMS) {

            setSelectedRooms([...selectedRooms, room])
        }
    }

    // updates on data change (new room to create)
    useEffect(() => {

        createRoom();

    }, [count])


    return (
        <li key={room} onClick={() => selectRoom(room)}>
            <div className="list-option">
                <div className="room">
                    <p>
                        {room}
                    </p>
                </div>

                <div className="usage">
                    <p className={`${usageColor}`}>
                        {roomUsage}%
                    </p>
                </div>
            </div>
        </li>
    )
}

export default Room;
