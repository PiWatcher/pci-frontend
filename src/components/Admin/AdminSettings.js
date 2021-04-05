
// styling
import './AdminSettings.css';

// page imports
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// components
import CleanNavbar from '../Navigation/CleanNavbar';
import UserList from './UserList';
import RoleCreation from './RoleCreation';
import RoleList from './RoleList';
import AlertNotification from '../Notification/AlertNotification';

// administrator settings
const AdminSettings = () => {

    // consume context 
    const { userToken, baseURL } = useContext(AuthContext);

    // state for pulled users
    const [pulledUsers, setPulledUsers] = useState([]);

    // state for pulled roles and permissions
    const [pulledRoles, setPulledRoles] = useState([]);

    // state for pulled roles and permissions
    const [errorCause, setErrorCause] = useState('');

    // state for pulled roles and permissions
    const [showAlert, setShowAlert] = useState(false);

    // API pull logic for user information
    const pullUsers = async () => {

        const userEndpoint = `${baseURL}:5000/api/auth/user`;

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

                console.log("pulled users")

            }
        }

        // failed to pull users
        catch (error) {
            setErrorCause('users');
            setShowAlert(true);
            //alert(error.response.data['description']);
            console.error('Error', error.response);
        }
    };

    // API pull logic for available user roles
    const pullRoles = async () => {

        const roleEndpoint = `${baseURL}:5000/api/auth/roles`;

        // tries to pull available roles
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

                let roleList = responseData.roles;

                // sets state to list of roles
                setPulledRoles(roleList);

                console.log(response);


            }
        }

        // failed to pull roles
        catch (error) {
            setErrorCause('roles');
            setShowAlert(true);
            console.error('Error', error.response);
        }
    };

    // on initial component load pull users and roles
    useEffect(() => {
        pullUsers();
        pullRoles();
    }, [])

    // returns the the admin page and its child components
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
                    description={`Failed to pull data from endpoint: List of ${errorCause}`} />
                :
                null}
        </div >
    );
}

export default AdminSettings;