
// styling
import './ChangePassword.css';

// page imports
import React, { useContext, useState } from 'react';
import axios from 'axios';

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
    const changePassword = async (e) => {

        // prevent page refresh after submit
        e.preventDefault();

        // endpoint URL
        const userPasswordUpdateEndpoint = `${baseURL}:5000/api/auth/users/update/password`;

        // check if passwords match
        if (localNewPassword === localNewPasswordConf) {

            // tries to submit new password
            try {
                const response = await axios({
                    method: 'post',
                    url: userPasswordUpdateEndpoint,
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                    data: {
                        password: localCurrentPassword,
                        new_password: localNewPassword
                    }
                });

                // successfully connected to endpoint and created role
                if (response.status === 200) {

                    // set alert type
                    setAlertType('success');

                    // show alert
                    setShowAlert(true);
                }
            }

            // failed to create new role
            catch (error) {

                // set alert type
                setAlertType('failure');

                // show alert
                setShowAlert(true);

                // display error in console for debugging
                console.error('Error', error.response);
            }

        }

        // passwords don't match
        else {

            // set alert type
            setAlertType('not-matching');

            // show alert
            setShowAlert(true);
        }
    }

    // returns password reset component
    return (
        <div className="change-password-component">
            <p>Change Password</p>
            <form onSubmit={changePassword}>
                <input type="password" id="current-password" placeholder="current password"
                    pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
                <input type="password" id="new-password" placeholder="new password"
                    pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
                <input type="password" id="new-password-conf" placeholder="confirm new password"
                    pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
                <input type="submit" value="Submit change" />
            </form>

            {showAlert === true && alertType === 'success' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Role Creation Status`}
                    description={`Password update successful.`} />
                :
                null}

            {showAlert === true && alertType === 'failure' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Role Creation Status'}
                    description={`Password update failed.`} />
                :
                null}

            {showAlert === true && alertType === 'not-matching' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Role Creation Status'}
                    description={`New passwords must match.`} />
                :
                null}
        </div>
    )
}

export default ChangePassword;