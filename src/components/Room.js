
// styling
import './Room.css';

// page imports
import React, { useContext, useState, useEffect } from 'react';
import upArrow from '../images/Green_Arrow_Up.svg';
import downArrow from '../images/Red_Arrow_Down.svg'
import horizontalLine from '../images/Horizontal_Line.svg';

// contexts
import { DataContext } from '../contexts/DataContext';


const Room = (props) => {

    // consumes data from DataContext
    const { setRoom } = useContext(DataContext);

    // state of room name
    const [localRoom, setLocalRoom] = useState('');

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

        setLocalRoom(props.room);

        let localUsage = getUsage(props.count, props.capacity);

        if (localUsage > roomUsage) {
            // set to green up arrow
            setTrendIcon(upArrow);
        }

        else if (localUsage < roomUsage) {

            // set to red down arrow
            setTrendIcon(downArrow);
        }

        // else {

        //    // set to red down arrow
        //    setTrendIcon(horizontalLine);
        //    console.log('same');
        // }

        setRoomUsage(localUsage);
    }


    // updates on data change (new room to create)
    useEffect(() => {

        createRoom();

    }, [props.count])


    return (
        <li key={props.index} onClick={() => setRoom(localRoom)}>
            <div className="list-option">
                <div className="room">
                    <p>
                        {localRoom}
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
