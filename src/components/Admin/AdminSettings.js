import './AdminSettings.css';

// page imports
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

import CleanNavbar from '../Navigation/CleanNavbar';
import UserList from './UserList';
import RoleCreation from './RoleCreation';



const AdminSettings = () => {

    const [pulledUsers, setPulledUsers] = useState([]);

    const [pulledRoles, setPulledRoles] = useState([]);


    const { userToken, baseURL } = useContext(AuthContext);

    const userEndpoint = `${baseURL}:5000/api/auth/users`;

    // API pull logic for user information
    const pullUsers = async () => {

        // tries to pull users and their information in database
        try {
            const response = await axios({
                method: 'get',
                url: userEndpoint,
                params: {
                    jwt_token: userToken
                }
            });

            // successfully connected to endpoint and pulled data
            if (response.status === 200) {

                let responseData = response.data;

                let userList = responseData.users;

                // sets state pulled users
                setPulledUsers(userList);
            }
        }

        // failed to pull users
        catch {
            console.log("Failed to pull users.")
        }
    };

    // API pull logic for available user roles
    const pullRoles = async () => {

        // tries to pull available roles
        try {
            const response = await axios({
                method: 'get',
                url: `${baseURL}:5000/api/auth/roles`,
                params: {
                    jwt_token: userToken
                }
            });

            // successfully connected to endpoint and pulled data
            if (response.status === 200) {

                let responseData = response.data;

                let roleList = responseData.roles;

                console.log(roleList);

                // sets state to list of roles
                setPulledRoles(roleList);

            }
        }

        // failed to pull roles
        catch {
            console.log("Failed to pull users.")
        }
    };

    useEffect(() => {
        pullUsers();
        pullRoles();
    }, [])


    // returns the entire dashboard and its child components
    return (
        <div className="admin-container">
            <CleanNavbar />
            <div className="admin-user-list">
                <RoleCreation />
                <UserList users={pulledUsers} roles={pulledRoles} />

            </div>
        </div >
    );
}

export default AdminSettings;