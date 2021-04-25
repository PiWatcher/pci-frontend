
// styling
import "./User.css"

// page imports
import React, { useState, useContext } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import _ from 'lodash'

// components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AlertNotification from '../Notification/AlertNotification';
import ConfirmNotification from '../Notification/ConfirmNotification';

// functions
import UpdateUserRole from '../../utilities/Administrator/UpdateUserRole'
import DeleteUser from '../../utilities/Administrator/DeleteUser'

// contexts
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { EnvironmentContext } from '../../contexts/EnvironmentContext'


/** 
* Component: User
* 
* Holds information for each user for display in UserList
*/
const User = (props) => {

   const { name, email, role, roles, pullUsers } = props;

   const { baseURL } = useContext(EnvironmentContext);

   const { userToken, userName } = useContext(AuthenticationContext);

   const [userRole, setUserRole] = useState(role);

   // Material UI menu state
   const [anchorEl, setAnchorEl] = useState(null);

   const [showDialogAlert, setShowDialogAlert] = useState(false);

   const [showAlert, setShowAlert] = useState(false);

   const [alertType, setAlertType] = useState('');

   const [alertMessage, setAlertMessage] = useState('');


   // Material UI theme
   const roleButtonTheme = createMuiTheme({
      typography: {
         fontFamily: 'Open Sans',
         fontSize: 16
      },
      props: {
         MuiButton: {
            disableRipple: true,
         },
         MuiMenuItem: {
            disableRipple: true,
         }
      }
   });


   /** 
   * Function: handleUserRoleUpdate
   * 
   * Uses UpdateUserRole utility function to update the chosen account's role in the back end database
   *  and sets appropriate alert based on the response
   */
   const handleUserRoleUpdate = async (newRole) => {

      const result = await UpdateUserRole(baseURL, userToken, email, newRole);

      // if error is returned
      if (result instanceof Error) {

         setAlertType('update-failure');

         setAlertMessage(result.message)

      } else {

         setUserRole(newRole);

         setAlertType('update-success');
      }

      setShowAlert(true);
   };


   /** 
   * Function: handleMenuClick
   * 
   * Opens material UI menu 
   */
   const handleMenuClick = (e) => {
      setAnchorEl(e.currentTarget);
   };


   /** 
   * Function: handleMenuClose
   * 
   * Calls handleUserRoleUpdate function if a role is selected from the menu
   */
   const handleMenuClose = (e) => {

      let newRole = e.currentTarget.textContent;

      // checks if role has been selected
      if (newRole !== '') {

         // update user role in database
         handleUserRoleUpdate(newRole);
      }

      // close menu
      setAnchorEl(null);
   };


   /** 
   * Function: handleUserDelete
   * 
   * Uses DeleteUser utility function to delete user from the back end 
   *   database and sets the appropriate alert based on the response
   */
   const handleUserDelete = async () => {

      // close confirmation dialog
      setShowDialogAlert(false);

      const result = await DeleteUser(baseURL, userToken, email);

      // if error is returned
      if (result instanceof Error) {

         setAlertType('delete-failure');

         setAlertMessage(result.message)

      } else {

         setAlertType('delete-success');

         console.log(result)

         setAlertMessage(result.data.message)
      }

      setShowAlert(true);
   };


   /** 
   * Function: onUserDeleteSuccess
   * 
   * Hides status alert and re pulls list of users from back end database
   */
   const onUserDeleteSuccess = () => {

      // hide alert
      setShowAlert(false);

      // re pull list of users
      pullUsers();
   }


   /** 
   * Return: User JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <li>
         <div className="user-list-option">
            <div className="user-info">
               <div className="user-name">
                  {name}
               </div>
               <div className="user-email">
                  {email}
               </div>
            </div>

            <MuiThemeProvider theme={roleButtonTheme}>

               <div className="user-role">

                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                     {userRole}
                  </Button>

                  {/* if admin account, block ability change role */}
                  {name === 'Administrator' ?
                     <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={false}
                        onClose={handleMenuClose}
                     >

                        <MenuItem key={role}>{role}</MenuItem>

                     </Menu>
                     :
                     <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                     >

                        {/* mapping list of roles to menu selection options */}
                        {_.map(roles, item => <MenuItem key={item.role_name} onClick={handleMenuClose}>{item.role_name}</MenuItem>)}

                     </Menu>
                  }
               </div>

               {/* if admin or currently logged in account, block ability to delete user */}
               {name === 'Administrator' || name === userName ?
                  <div className="user-delete">
                  </div>
                  :
                  <div className="user-delete">
                     <IconButton className="delete-button" aria-label="delete" onClick={() => setShowDialogAlert(true)} >
                        <CloseIcon color="secondary" />
                     </IconButton>
                  </div>
               }

            </MuiThemeProvider>

            <ConfirmNotification showAlert={showDialogAlert} setShowAlert={setShowDialogAlert} onConfirm={handleUserDelete} title={'User Delete'}
               description={`Are you sure you want to delete the account for ${name}?`} />


            {alertType === 'update-success' ?
               <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'User Role Update Status'}
                  description={`${name} successfully updated to "${userRole}" role.`} />
               :
               null}

            {alertType === 'update-failure' ?
               <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'User Role Update Status'}
                  description={alertMessage} />
               :
               null}

            {alertType === 'delete-success' ?
               <AlertNotification showAlert={showAlert} setShowAlert={onUserDeleteSuccess} title={'User Delete Status'}
                  description={alertMessage} />
               :
               null}

            {alertType === 'delete-failure' ?
               <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'User Delete Status'}
                  description={alertMessage} />
               :
               null}

         </div>
      </li>
   );
}

export default User;
