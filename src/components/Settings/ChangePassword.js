
// styling
import './ChangePassword.css';

// page imports
import React, { useContext, useState } from 'react';

import ChangeUserPassword from '../Utilities/Settings/ChangeUserPassword'

// components
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// component for password change after login
const ChangePassword = () => {

    // consume data from AuthContext
    const { userToken, baseURL } = useContext(AuthContext);

    // local variable for user password during text input
    const [localCurrentPassword, setLocalCurrentPassword] = useState('');

    // local variable for user password during text input
    const [localNewPassword, setLocalNewPassword] = useState('');

    // local variable for user password during text input
    const [localNewPasswordConf, setLocalNewPasswordConf] = useState('');

    // state for alert
    const [showAlert, setShowAlert] = useState('');

    // state for alert type
    const [alertType, setAlertType] = useState('');

    // state for alert type
    const [alertMessage, setAlertMessage] = useState('');

    // places password form input into local temp variables
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

    // send new password to backend for update
    const handleChangePassword = async (e) => {

        // prevent page refresh after submit
        e.preventDefault();

        // check if new passwords match
        if (localNewPassword === localNewPasswordConf) {

            const result = await ChangeUserPassword(baseURL, userToken, localCurrentPassword, localNewPassword);

            if (result instanceof Error) {
                // set alert type
                setAlertType('change-password-failure');

                setAlertMessage(result.message);

            } else {
                // set alert type
                setAlertType('change-password-success');

                setAlertMessage(`Password update successful.`);

            }
        } else {

            // set alert type
            setAlertType('new-passwords-not-matching');

            setAlertMessage(`New passwords must match.`);

        }

        // show alert
        setShowAlert(true);
    }

    // returns password reset component
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

            {showAlert && alertType === 'change-password-success' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Password Change Status`}
                    description={alertMessage} />
                :
                null}

            {showAlert && alertType === 'change-password-failure' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Password Change Status`}
                    description={alertMessage} />
                :
                null}

            {showAlert && alertType === 'new-passwords-not-matching' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Password Change Status`}
                    description={alertMessage} />
                :
                null}
        </div>
    )
}

export default ChangePassword;