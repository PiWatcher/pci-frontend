
// styling
import './Room.css';

// page imports
import React, { useState, useEffect, useContext } from 'react';
import upArrow from '../../images/Green_Arrow_Up.svg';
import downArrow from '../../images/Red_Arrow_Down.svg'
import horizontalLine from '../../images/Horizontal_Line.svg';

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
    const [trendIcon, setTrendIcon] = useState(horizontalLine);

    // calculates usage from given data
    const getUsage = (count, capacity) => {

        let usage = Math.trunc((count / capacity) * 100)

        return usage;
    }

    // constructs room data for packaging
    const createRoom = () => {

        let localUsage = getUsage(count, capacity);

        if (localUsage > roomUsage) {
            // set to green up arrow
            setTrendIcon(upArrow);
        }

        else if (localUsage < roomUsage) {

            // set to red down arrow
            setTrendIcon(downArrow);
        }

        else {
            // set to horizontal line
            setTrendIcon(horizontalLine);
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
                    <p>
                        {roomUsage}%
                    </p>
                </div>

                <div className="trend">
                    <p>
                        <img className="logo" src={trendIcon} alt="Current trend of room" />
                    </p>
                </div>
            </div>
        </li>
    )
}

export default Room;
