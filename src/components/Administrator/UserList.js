
// styling
import './UserList.css';

// page imports
import React, { useState, useEffect, useCallback } from 'react';
import User from './User';

// list for users
const UserList = (props) => {

    // consume props
    const { users, roles, pullUsers } = props;

    // state for user search
    const [search, setSearch] = useState('');

    // state for list of users
    const [filteredUserList, setFilteredUserList] = useState([]);

    // pulls search text for processing
    const searchHandler = (e) => {
        if (e.target.id === "userSearch") {
            setSearch(e.target.value);
        }
    }

    // filters out users based on search text
    const userFilter = useCallback((filter) => {

        // filters by name
        let filteredUsers = users.filter(function (item) {
            return item['full_name'].toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        })

        // maps only users that match search query
        let filtered =
            filteredUsers.map((user) =>
                <User
                    key={user.email}
                    name={user.full_name}
                    email={user.email}
                    role={user.role}
                    roles={roles}
                    pullUsers={pullUsers}
                />)

        // sets list state
        setFilteredUserList(filtered);

    }, [users, roles, pullUsers]);


    // refilters rooms on user list change, search change, or role list updates
    useEffect(() => {

        userFilter(search);

    }, [search, userFilter])


    // returns user list component and all child components within
    return (
        <div className="user-list-component">
            <p>Registered Users</p>
            <input type="text" id="userSearch" onChange={searchHandler} placeholder="User search" value={search} />
            <div className="user-list">
                <ul>
                    {filteredUserList}
                </ul>
            </div>
        </div>
    )
}

export default UserList;
