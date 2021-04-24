
// styling
import './AdminSettings.css';

// page imports
import React, { useState, useContext, useEffect, useCallback } from 'react';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// components
import CleanNavbar from '../Navigation/CleanNavbar';
import UserList from './UserList';
import RoleCreation from './RoleCreation';
import RoleList from './RoleList';
import AlertNotification from '../Notification/AlertNotification';
import PullUsers from '../Utilities/Administrator/PullUsers';
import PullRoles from '../Utilities/Administrator/PullRoles';

// administrator settings page
const AdminSettings = () => {

    // consume context 
    const { userToken, baseURL } = useContext(AuthContext);

    // state for pulled users
    const [pulledUsers, setPulledUsers] = useState([]);

    // state for pulled roles and their permissions
    const [pulledRoles, setPulledRoles] = useState([]);

    // state for where error came from
    const [alertType, setAlertType] = useState('');

    // state for if alert is to be displayed
    const [showAlert, setShowAlert] = useState(false);



    const handleUsersPull = useCallback(async () => {

        const result = await PullUsers(baseURL, userToken);

        // if failure
        if (result instanceof Error) {

            // sets state
            setAlertType('users-pull-failure');

            setShowAlert(true);

        } else {

            const resultData = result.data

            // sorts users in order
            let userList = resultData.users.sort(function (a, b) {
                return a.full_name.localeCompare(b.full_name, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });
            });

            // sets state
            setPulledUsers(userList);
        }

    }, [baseURL, userToken]);

    const handleRolesPull = useCallback(async () => {

        const result = await PullRoles(baseURL, userToken);

        // if failure
        if (result instanceof Error) {

            // sets state
            setAlertType('roles-pull-failure');

            setShowAlert(true);

        } else {

            const resultData = result.data

            // sorts roles in order
            let roleList = resultData.roles.sort(function (a, b) {
                return a.role_name.localeCompare(b.role_name, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });
            });

            // sets state
            setPulledRoles(roleList);
        }
    }, [baseURL, userToken]);


    // pull users and roles on initial component load
    useEffect(() => {
        handleUsersPull();
        handleRolesPull();
    }, [handleUsersPull, handleRolesPull])


    // return admin settings page and children components
    return (
        <div className="admin-container">
            <CleanNavbar />
            <div className="admin-settings-row">

                <div className="role-column">
                    <RoleCreation pullRoles={handleRolesPull} />
                    <RoleList roles={pulledRoles} pullRoles={handleRolesPull} />
                </div>

                <div className="user-column">
                    <UserList users={pulledUsers} roles={pulledRoles} pullUsers={handleUsersPull} />
                </div>
            </div>

            {showAlert && alertType === 'users-pull-failure' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
                    description={`Failed to pull data from endpoint: list of users`} />
                :
                null}

            {showAlert && alertType === 'roles-pull-failure' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
                    description={`Failed to pull data from endpoint: list of roles`} />
                :
                null}
        </div >
    );
}

export default AdminSettings;