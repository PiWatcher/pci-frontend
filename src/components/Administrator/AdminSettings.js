
// styling
import './AdminSettings.css';

// page imports
import React, { useState, useContext, useEffect, useCallback } from 'react';

// contexts
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { EnvironmentContext } from '../../contexts/EnvironmentContext'

// components
import CleanNavbar from '../Navigation/CleanNavbar';
import UserList from './UserList';
import RoleCreation from './RoleCreation';
import RoleList from './RoleList';
import AlertNotification from '../Notification/AlertNotification';

// utilities
import PullUsers from '../../utilities/Administrator/PullUsers';
import PullRoles from '../../utilities/Administrator/PullRoles';


/** 
* Component: AdminSettings
* 
* Home layout for admin settings and child components
*/
const AdminSettings = () => {

   // {string} base url for the endpoints
   const { baseURL } = useContext(EnvironmentContext);

   // {string} token assigned to currently logged in user
   const { userToken } = useContext(AuthenticationContext);

   // {list} users returned from the database
   const [pulledUsers, setPulledUsers] = useState([]);

   // {list} roles returned from the database
   const [pulledRoles, setPulledRoles] = useState([]);

   // {string} type of alert to be shown
   const [alertType, setAlertType] = useState('');

   // {boolean} if alert should be shown
   const [showAlert, setShowAlert] = useState(false);

   // {string} message to be displayed in alert
   const [alertMessage, setAlertMessage] = useState('');


   /** 
   * Function: handleUsersPull
   * 
   * Uses PullUsers utility function to pull all created users from the API
   *   and sets them to state
   */
   const handleUsersPull = useCallback(async () => {

      const result = await PullUsers(baseURL, userToken);

      // if error is returned
      if (result instanceof Error) {

         setAlertType('users-pull-failure');

         setAlertMessage(result.message);

         setShowAlert(true);

      } else {

         const resultData = result.data

         // sorts users in natural order
         let userList = resultData.users.sort(function (a, b) {
            return a.full_name.localeCompare(b.full_name, undefined, {
               numeric: true,
               sensitivity: 'base'
            });
         });

         setPulledUsers(userList);
      }

   }, [baseURL, userToken]);


   /** 
   * Function: handleRolesPull
   * 
   * Uses PullRoles utility function to pull all created roles from the API
   *   and sets them to state
   */
   const handleRolesPull = useCallback(async () => {

      const result = await PullRoles(baseURL, userToken);

      // if error is returned
      if (result instanceof Error) {

         setAlertType('roles-pull-failure');

         setAlertMessage(result.message);

         setShowAlert(true);

      } else {

         const resultData = result.data

         // sorts roles in natural order
         let roleList = resultData.roles.sort(function (a, b) {
            return a.role_name.localeCompare(b.role_name, undefined, {
               numeric: true,
               sensitivity: 'base'
            });
         });

         setPulledRoles(roleList);
      }
   }, [baseURL, userToken]);


   /** 
   * Function: useEffect
   * 
   * Calls handleUsersPull and handleRolesPull on component creation
   */
   useEffect(() => {
      handleUsersPull();
      handleRolesPull();
   }, [handleUsersPull, handleRolesPull])


   /** 
   * Return: AdminSettings JSX
   * 
   * Returns the layout for display in the browser
   */
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

         {alertType === 'users-pull-failure' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Users Pull Failure'}
               description={alertMessage} />
            :
            null}

         {alertType === 'roles-pull-failure' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Roles Pull Failure'}
               description={alertMessage} />
            :
            null}
      </div >
   );
}

export default AdminSettings;