
// styling
import './Role.css'

// page imports
import React, { useState, useContext } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// components
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AlertNotification from '../Notification/AlertNotification';
import ConfirmNotification from '../Notification/ConfirmNotification';

// functions
import DeleteRole from '../../utilities/Administrator/DeleteRole';

// contexts
import { EnvironmentContext } from '../../contexts/EnvironmentContext'
import { AuthenticationContext } from '../../contexts/AuthenticationContext';


/** 
* Component: Role
* 
* Holds information for each role for display in RoleList
*/
const Role = (props) => {

   const { name, isAdmin, canViewRaw, pullRoles } = props;

   const { baseURL } = useContext(EnvironmentContext);

   const { userToken } = useContext(AuthenticationContext);

   const [showDialogAlert, setShowDialogAlert] = useState(false);

   const [showAlert, setShowAlert] = useState(false);

   const [alertType, setAlertType] = useState('');

   const [alertMessage, setAlertMessage] = useState('');

   // Material UI theme
   const checkBoxTheme = createMuiTheme({
      typography: {
         fontFamily: 'Open Sans',
         fontSize: 16
      },
      props: {
         MuiCheckbox: {
            disableRipple: true,
            color: "primary"
         }
      },
      palette: {
         primary: {
            main: '#003466'
         }
      }
   });


   /** 
   * Function: handleDeleteRole
   * 
   * Uses DeleteRole utility function to delete role from back end 
   *   database and sets appropriate alert based on the response
   */
   const handleDeleteRole = async () => {

      // close confirmation dialog
      setShowDialogAlert(false);

      const result = await DeleteRole(baseURL, userToken, name);

      // if error is returned
      if (result instanceof Error) {

         setAlertType('role-delete-failure');

         setAlertMessage(result.message)

      } else {

         setAlertType('role-delete-success');

         setAlertMessage(result.data.message)
      }

      // show alert
      setShowAlert(true);
   };


   /** 
   * Function: onRoleDeleteSuccess
   * 
   * Hides status alert and re pulls list of roles from back end database
   */
   const onRoleDeleteSuccess = () => {

      setShowAlert(false);

      // re pull list of roles
      pullRoles();
   }


   /** 
   * Return: Role JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <li>
         <div className='role-list-option'>

            <div className='role-info'>
               <div className='role-name'>
                  {name}
               </div>
            </div>

            <MuiThemeProvider theme={checkBoxTheme}>
               <div className='checkbox-div'>
                  <FormControl>
                     <FormGroup>
                        <FormControlLabel
                           control={<Checkbox color='primary' checked={isAdmin} name='isAdmin' />}
                           label="Admin"
                        />
                        <FormControlLabel
                           control={<Checkbox color='primary' checked={canViewRaw} name='canViewRaw' />}
                           label="Raw Data"
                        />
                     </FormGroup>
                  </FormControl>
               </div>

               {/* if roles are admin or public, hide delete option */}
               {name === 'public' || name === 'admin' ?
                  <div className="role-delete">
                  </div>
                  :
                  <div className='role-delete'>
                     <IconButton className='delete-button' aria-label='delete' onClick={() => setShowDialogAlert(true)} >
                        <CloseIcon color='secondary' />
                     </IconButton>
                  </div>
               }
            </MuiThemeProvider>

            <ConfirmNotification showAlert={showDialogAlert} setShowAlert={setShowDialogAlert} onConfirm={handleDeleteRole} title={'Role Delete'}
               description={`Are you sure you want to delete the '${name}' role?`} />

            {alertType === 'role-delete-success' ?
               <AlertNotification showAlert={showAlert} setShowAlert={onRoleDeleteSuccess} title={'Role Delete Status'}
                  description={alertMessage} />
               :
               null}

            {alertType === 'role-delete-failure' ?
               <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Role Delete Status'}
                  description={alertMessage} />
               :
               null}

         </div>
      </li>
   );
}

export default Role;
