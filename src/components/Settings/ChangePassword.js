
// styling
import './ChangePassword.css';

// page imports
import React, { useContext, useState } from 'react';

// components
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { EnvironmentContext } from '../../contexts/EnvironmentContext'

// functions
import ChangeUserPassword from '../../utilities/Settings/ChangeUserPassword'


/** 
* Component: ChangePassword
* 
* Component for changing currently logged in user's password
*/
const ChangePassword = () => {

   // {string} base url for the endpoints
   const { baseURL } = useContext(EnvironmentContext);

   // {string} token assigned to the currently logged in user
   const { userToken } = useContext(AuthenticationContext);

   // {string} text pulled from current user password input
   const [localCurrentPassword, setLocalCurrentPassword] = useState('');

   // {string} text pulled from new user password input
   const [localNewPassword, setLocalNewPassword] = useState('');

   // {string} text pulled from new user password confirmation input
   const [localNewPasswordConf, setLocalNewPasswordConf] = useState('');

   // {boolean} if alert should be shown
   const [showAlert, setShowAlert] = useState(false);

   // {string} type of alert to be shown
   const [alertType, setAlertType] = useState('');

   // {string} message to be shown in alert
   const [alertMessage, setAlertMessage] = useState('');


   /** 
   * Function: handleInputChange
   * 
   * Pulls user input from text forms and stores them in state
   * 
   * @param {event} event
   */
   const handleInputChange = (event) => {

      if (event.target.id === "current-password") {
         setLocalCurrentPassword(event.target.value);
      }

      else if (event.target.id === "new-password") {
         setLocalNewPassword(event.target.value);
      }

      else if (event.target.id === "new-password-conf") {
         setLocalNewPasswordConf(event.target.value);
      }
   }


   /** 
  * Function: handleChangePassword
  * 
  * Uses ChangeUserPassword utility function to send request to the back end database and 
  *    update the currently logged in user information.  The user will be displayed a notification on success or failure.
  * 
  * @param {event} event
  */
   const handleChangePassword = async (event) => {

      // prevent page refresh after submit
      event.preventDefault();

      // check if new passwords match
      if (localNewPassword === localNewPasswordConf) {

         const result = await ChangeUserPassword(baseURL, userToken, localCurrentPassword, localNewPassword);

         // if error is returned
         if (result instanceof Error) {

            setAlertType('change-password-failure');

            setAlertMessage(result.message);

         } else {

            setAlertType('change-password-success');

            setAlertMessage(`Password update successful.`);

         }

      } else {

         setAlertType('new-passwords-not-matching');

         setAlertMessage(`New passwords must match.`);

      }

      setShowAlert(true);
   }


   /** 
   * Return: ChangePassword JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div className="change-password-component">
         <p>Change Password</p>
         <form onSubmit={handleChangePassword}>
            <input type="password" id="current-password" placeholder="current password"
               pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
            <input type="password" id="new-password" placeholder="new password"
               pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
            <input type="password" id="new-password-conf" placeholder="confirm new password"
               pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
            <input type="submit" value="Submit change" />
         </form>

         {alertType === 'change-password-success' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Password Change Status`}
               description={alertMessage} />
            :
            null}

         {alertType === 'change-password-failure' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Password Change Status`}
               description={alertMessage} />
            :
            null}

         {alertType === 'new-passwords-not-matching' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Password Change Status`}
               description={alertMessage} />
            :
            null}
      </div>
   )
}

export default ChangePassword;