// styling
import './Room.css';

// page imports
import React, { useState, useEffect, useContext } from 'react';
import upArrow from '../../images/Green_Arrow_Up.svg';
import downArrow from '../../images/Red_Arrow_Down.svg'
import horizontalLine from '../../images/Horizontal_Line.svg';

// contexts
import { DataContext } from '../../contexts/DataContext';



const UserList = (props) => {


    // consume props
    const { userList, roleList } = props;

    const [search, setSearch] = useState('');

    const [filteredUserList, setFilteredUserList] = useState([]);

    // pulls search text for processing
    const searchHandler = (e) => {
        if (e.target.id === "roomSearch") {
            setSearch(e.target.value);
        }
    }

    // filters out rooms based on search text
    const userFilter = (filter) => {

        let filteredUsers = usersList.filter(function (item) {
            return item['name'].indexOf(filter) !== -1;
        })

        // maps only rooms that match search query
        let filtered =
            filteredUsers.map((item, index) =>
                <User
                    key={email}
                    name={userName}
                    email={userEmail}
                    role={useRole}
                />)

        setFilteredRoomList(filtered);
    }


    // filters rooms on room list change and query change
    useEffect(() => {

        roomFilter(search);

    }, [search])


    // returns parsed rooms in unordered list
    return (
        <div>
            <input type="text" id="roomSearch" onChange={searchHandler} placeholder="Search for a room" value={search} />
            <div className="room-list-component">
                <ul>
                    {filteredUserList}
                </ul>
            </div>
        </div>
    )
}

export default UserList;
