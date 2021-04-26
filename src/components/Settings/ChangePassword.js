
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

   const { baseURL } = useContext(EnvironmentContext);

   const { userToken } = useContext(AuthenticationContext);

   // local variable for current user password during text input
   const [localCurrentPassword, setLocalCurrentPassword] = useState('');

   // local variable for new user password during text input
   const [localNewPassword, setLocalNewPassword] = useState('');

   // local variable for confirming new user password during text input
   const [localNewPasswordConf, setLocalNewPasswordConf] = useState('');

   const [showAlert, setShowAlert] = useState('');

   const [alertType, setAlertType] = useState('');

   const [alertMessage, setAlertMessage] = useState('');


   /** 
   * Function: handleInputChange
   * 
   * Pulls user input from text forms and stores them in state
   */
   const handleInputChange = (e) => {

      if (e.target.id === "current-password") {
         setLocalCurrentPassword(e.target.value);
      }

      else if (e.target.id === "new-password") {
         setLocalNewPassword(e.target.value);
      }

      else if (e.target.id === "new-password-conf") {
         setLocalNewPasswordConf(e.target.value);
      }
   }


   /** 
  * Function: handleChangePassword
  * 
  * Uses ChangeUserPassword utility function to send request to the back end database and 
  *    update the currently logged in user information.  The user will be displayed a notification on success or failure.
  */
   const handleChangePassword = async (e) => {

      // prevent page refresh after submit
      e.preventDefault();

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