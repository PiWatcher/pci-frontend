
// styling
import './RoleCreation.css';

// page imports
import React, { useState, useContext } from 'react';

// components
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import AlertNotification from '../Notification/AlertNotification';

// functions
import CreateRole from '../../utilities/Administrator/CreateRole'

// contexts
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { EnvironmentContext } from '../../contexts/EnvironmentContext'


/** 
* Component: RoleCreation
* 
* Takes user input and sends a role creation request to the back end on submit
* 
* @param {props} props
*/
const RoleCreation = (props) => {

   const {

      // {function} pull roles from the backend database
      pullRoles

   } = props;

   // {string} base url for the endpoints
   const { baseURL } = useContext(EnvironmentContext);

   // {string} token assigned to the currently logged in user
   const { userToken } = useContext(AuthenticationContext);

   // {string} role name pulled from the text field
   const [newRoleName, setNewRoleName] = useState('');

   // {boolean object} role permissions pulled from the check boxes
   const [newRolePermissions, setNewRolePermissions] = useState({ isAdmin: false, canViewRaw: false });

   // destructured role permissions from the state
   const { isAdmin, canViewRaw } = newRolePermissions;

   // {boolean} if alert should be shown
   const [showAlert, setShowAlert] = useState(false);

   // {string} type of alert to be shown
   const [alertType, setAlertType] = useState('');

   // {string} message to be displayed in alert
   const [alertMessage, setAlertMessage] = useState('');


   // Material UI theme
   const checkBoxTheme = createMuiTheme({
      typography: {
         fontFamily: 'Open Sans',
         fontSize: 16
      },
      props: {
         MuiCheckbox: {
            disableRipple: true
         },
      },
      palette: {
         primary: {
            main: '#003466'
         }
      },
   });


   /** 
   * Function: handleFormTextInput
   * 
   *  Pulls new role name from text input and sets it to state
   * 
   * @param {event} event
   */
   const handleFormTextInput = (event) => {
      if (event.target.id === "roleNameForm") {
         setNewRoleName(event.target.value);
      }
   }


   /** 
   * Function: handleCheckBox
   * 
   *  Takes boolean from checked box and sets it to state
   * 
   * @param {event} event
   */
   const handleCheckBox = (event) => {
      setNewRolePermissions({ ...newRolePermissions, [event.target.name]: event.target.checked });
   }


   /** 
   * Function: handleCreateRole
   * 
   *  Uses CreateRole utility function to create a new role and its matching permissions 
   *   within the back end database
   * 
   * @param {event} event
   */
   const handleCreateRole = async (event) => {

      event.preventDefault();

      if (newRoleName !== '') {
         const result = await CreateRole(baseURL, userToken, newRoleName.toLowerCase(), isAdmin, canViewRaw);

         // if error is returned
         if (result instanceof Error) {

            setAlertType('create-role-failure');

            setAlertMessage(result.message)

         } else {

            setAlertType('create-role-success');

            setAlertMessage(`Role of ${newRoleName} has been created successfully.`);
         }

      } else {

         setAlertType('create-role-failure');

         setAlertMessage('Please enter a role name.')

      }

      setShowAlert(true);
   };




   /** 
   * Function: onRoleCreateSuccess
   * 
   * Hides status alert and re pulls list of roles from back end database
   */
   const onRoleCreateSuccess = () => {

      setShowAlert(false);

      // re pull list of roles
      pullRoles();
   }


   /** 
   * Return: RoleCreation JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div className="role-creation-component">
         <p>Role Creation</p>
         <input type="text" id="roleNameForm" onChange={handleFormTextInput} placeholder="New role name" value={newRoleName} />
         <div className="checkbox-div-creation">
            <MuiThemeProvider theme={checkBoxTheme}>
               <FormControl>
                  <FormGroup>
                     <FormControlLabel
                        control={<Checkbox color="primary" checked={isAdmin} onChange={handleCheckBox} name="isAdmin" />}
                        label="Admin privileges"
                     />
                     <FormControlLabel
                        control={<Checkbox color="primary" checked={canViewRaw} onChange={handleCheckBox} name="canViewRaw" />}
                        label="Ability to view raw data"
                     />
                  </FormGroup>
               </FormControl>
            </MuiThemeProvider>
            <form onSubmit={handleCreateRole}>
               <input type="submit" value="Submit new role" />
            </form>
         </div>

         {alertType === 'create-role-success' ?
            <AlertNotification showAlert={showAlert} setShowAlert={onRoleCreateSuccess} title={`Role Creation Success`}
               description={alertMessage} />
            :
            null}

         {alertType === 'create-role-failure' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Role Creation Failure'}
               description={alertMessage} />
            :
            null}
      </div>
   )
}

export default RoleCreation;
