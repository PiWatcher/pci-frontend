
// styling
import './RoleList.css';

// page imports
import React, { useState, useEffect } from 'react';
import Role from './Role';

// list for users
const RoleList = (props) => {

    // consume props
    const { roles, pullRoles } = props;

    // state for user search
    const [search, setSearch] = useState('');

    // state for list of users
    const [filteredRoleList, setFilteredRoleList] = useState([]);

    // pulls search text for processing
    const searchHandler = (e) => {
        if (e.target.id === "userSearch") {
            setSearch(e.target.value);
        }
    }

    // filters out users based on search text
    const roleFilter = (filter) => {

        // filters by role name
        let filteredRoles = roles.filter(function (item) {
            return item['role_name'].toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        })

        // maps only roles that match search query
        let filtered =
            filteredRoles.map((role) =>
                <Role
                    key={role.role_name}
                    name={role.role_name}
                    isAdmin={role.is_admin}
                    canViewRaw={role.can_view_raw}
                    pullRoles={pullRoles}
                />)

        // sets list state
        setFilteredRoleList(filtered);
    }


    // refilters rooms on user list change, search change, or role list updates
    useEffect(() => {

        roleFilter(search);

    }, [roles, search])


    // returns parsed users in unordered list
    return (
        <div className="role-list-component">
            <p>Available Roles</p>
            <input type="text" id="userSearch" onChange={searchHandler} placeholder="Search for a user" value={search} />
            <div className="role-list">
                <ul>
                    {filteredRoleList}
                </ul>
            </div>
        </div>
    )
}

export default RoleList;
