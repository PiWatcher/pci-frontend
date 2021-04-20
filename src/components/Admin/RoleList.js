
// styling
import './RoleList.css';

// page imports
import React, { useState, useEffect, useCallback } from 'react';
import Role from './Role';

// list for role components
const RoleList = (props) => {

    // consume props
    const { roles, pullRoles } = props;

    // state for role search
    const [search, setSearch] = useState('');

    // state for list of roles
    const [filteredRoleList, setFilteredRoleList] = useState([]);

    // pulls search text for processing
    const searchHandler = (e) => {
        if (e.target.id === "userSearch") {
            setSearch(e.target.value);
        }
    }

    // filters out roles based on search text
    const roleFilter = useCallback((filter) => {

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

    }, [pullRoles, roles]);


    // refilters rooms on role list change or search change
    useEffect(() => {

        roleFilter(search);

    }, [roles, search, roleFilter])


    // returns role list component and all child components within
    return (
        <div className="role-list-component">
            <p>Available Roles</p>
            <input type="text" id="roleSearch" onChange={searchHandler} placeholder="Role search" value={search} />
            <div className="role-list">
                <ul>
                    {filteredRoleList}
                </ul>
            </div>
        </div>
    )
}

export default RoleList;
