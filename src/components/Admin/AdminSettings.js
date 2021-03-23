import './AdminSettings.css';

// page imports
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

import CleanNavbar from '../Navigation/CleanNavbar';
import UserList from '../Admin/UserList';



const AdminSettings = () => {

    const [pulledUsers, setPulledUsers] = useState([{ name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Seth Burchfield', email: 'test@nau.edu', role: 'admin' }, { name: 'Duane Booher', email: 'email@nau.edu', role: 'public' }]);

    const [pulledRoles, setPulledRoles] = useState([{ role_name: 'Admin', is_admin: true, can_view_raw: true }, { role_name: 'Public', is_admin: false, can_view_raw: false }]);

    const { userName, userToken, baseURL } = useContext(AuthContext);

    // API pull and parse logic for rooms in selected building
    const pullUsers = async () => {

        // tries to pull and parse building data
        try {
            const response = await axios({
                method: 'get',
                url: `${baseURL}:5000/api/auth/users`,
                params: {
                    jwt_token: userToken
                }
            });

            // successfully connected to endpoint and pulled data
            if (response.status === 200) {

                let userData = response.data.data;

                // sets state to sorted list of rooms
                setPulledUsers(userData);
            }
        }

        // failed to sign in
        catch {
            console.log("Failed to pull users.")
        }
    };

    // API pull and parse logic for rooms in selected building
    const pullRoles = async () => {

        // tries to pull and parse building data
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

                let roleData = response.data.data;

                // sets state to sorted list of rooms
                setPulledRoles(roleData);
            }
        }

        // failed to sign in
        catch {
            console.log("Failed to pull users.")
        }
    };

    useEffect(() => {
        pullUsers();
        pullRoles();
    })


    // returns the entire dashboard and its child components
    return (
        <div className="admin-container">
            <CleanNavbar />
            <div className="admin-user-list">
                <UserList users={pulledUsers} roles={pulledRoles} pullUsers={pullUsers} />
            </div>
        </div >
    );
}

export default AdminSettings;