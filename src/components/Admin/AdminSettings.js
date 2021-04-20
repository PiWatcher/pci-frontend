
// styling
import './AdminSettings.css';

// page imports
import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// components
import CleanNavbar from '../Navigation/CleanNavbar';
import UserList from './UserList';
import RoleCreation from './RoleCreation';
import RoleList from './RoleList';
import AlertNotification from '../Notification/AlertNotification';

// administrator settings page
const AdminSettings = () => {

    // consume context 
    const { userToken, baseURL } = useContext(AuthContext);

    // state for pulled users
    const [pulledUsers, setPulledUsers] = useState([]);

    // state for pulled roles and their permissions
    const [pulledRoles, setPulledRoles] = useState([]);

    // state for where error came from
    const [errorCause, setErrorCause] = useState('');

    // state for if alert is to be displayed
    const [showAlert, setShowAlert] = useState(false);

    // API pull logic for user information
    const pullUsers = useCallback(async () => {

        // endpoint URL
        const userEndpoint = `${baseURL}:5000/api/auth/users`;

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

                // sorts users in order
                let userList = responseData.users.sort(function (a, b) {
                    return a.full_name.localeCompare(b.full_name, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                    });
                });

                // sets state
                setPulledUsers(userList);
            }
        }

        // failed to pull users
        catch (error) {

            // sets state
            setErrorCause('users');
            setShowAlert(true);

            // display error in console for debugging
            console.error('Error', error.response);
        }

    }, [baseURL, userToken]);

    // API pull logic for available user roles
    const pullRoles = useCallback(async () => {

        // endpoint URL
        const roleEndpoint = `${baseURL}:5000/api/auth/roles`;

        // tries to pull available roles from database
        try {
            const response = await axios({
                method: 'get',
                url: roleEndpoint,
                params: {
                    jwt_token: userToken
                }
            });

            // successfully connected to endpoint and pulled roles
            if (response.status === 200) {

                let responseData = response.data;

                // sorts roles in order
                let roleList = responseData.roles.sort(function (a, b) {
                    return a.role_name.localeCompare(b.role_name, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                    });
                });

                // sets state
                setPulledRoles(roleList);
            }
        }

        // failed to pull roles
        catch (error) {

            // sets state
            setErrorCause('roles');
            setShowAlert(true);

            // display error in console for debugging
            console.error('Error', error.response);
        }

    }, [baseURL, userToken]);

    // pull users and roles on initial component load
    useEffect(() => {
        pullUsers();
        pullRoles();
    }, [pullUsers, pullRoles])


    // return admin settings page and children components
    return (
        <div className="admin-container">
            <CleanNavbar />
            <div className="admin-settings-row">

                <div className="role-column">
                    <RoleCreation pullRoles={pullRoles} />
                    <RoleList roles={pulledRoles} pullRoles={pullRoles} />
                </div>

                <div className="user-column">
                    <UserList users={pulledUsers} roles={pulledRoles} pullUsers={pullUsers} />
                </div>
            </div>

            {showAlert === true ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
                    description={`Failed to pull data from endpoint: list of ${errorCause}`} />
                :
                null}
        </div >
    );
}

export default AdminSettings;