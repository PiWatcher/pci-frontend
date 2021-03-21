// styling
import './UserList.css';

// page imports
import React, { useState, useEffect } from 'react';

// contexts
import User from '../Admin/User';



const UserList = (props) => {


    // consume props
    const { users, roles } = props;

    const [search, setSearch] = useState('');

    const [filteredUserList, setFilteredUserList] = useState([]);

    // pulls search text for processing
    const searchHandler = (e) => {
        if (e.target.id === "userSearch") {
            setSearch(e.target.value);
        }
    }

    // filters out rooms based on search text
    const userFilter = (filter) => {

        let filteredUsers = users.filter(function (item) {
            return item['name'].indexOf(filter) !== -1;
        })

        // maps only rooms that match search query
        let filtered =
            filteredUsers.map((user) =>
                <User
                    key={user.email}
                    name={user.name}
                    email={user.email}
                    role={user.role}
                    roles={roles}
                />)

        setFilteredUserList(filtered);
    }


    // filters rooms on room list change and query change
    useEffect(() => {

        userFilter(search);

    }, [search])


    // returns parsed rooms in unordered list
    return (
        <div className="user-list-component">
            <p>Registered Users</p>
            <input type="text" id="userSearch" onChange={searchHandler} placeholder="Search for a user" value={search} />
            <div className="user-list">
                <ul>
                    {filteredUserList}
                </ul>
            </div>
        </div>
    )
}

export default UserList;
