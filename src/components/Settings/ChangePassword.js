
// styling
import './ChangePassword.css';

// page imports
import React, { useContext, useState } from 'react';
import axios from 'axios';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// authentication page
const ChangePassword = () => {

    // consume data from AuthContext
    const { userToken, baseURL } = useContext(AuthContext);

    // local variable for user password during text input
    const [localNewPassword, setLocalNewPassword] = useState('');

    // local variable for user password during text input
    const [localNewPasswordConf, setLocalNewPasswordConf] = useState('');

    // places user form input into local temp variables
    const handleInputChange = (e) => {

        if (e.target.id === "new-password") {
            setLocalNewPassword(e.target.value);
        }

        else if (e.target.id === "new-password-conf") {
            setLocalNewPasswordConf(e.target.value);
        }
    }

    // send new password to backend for update
    const changePassword = (e) => {

        // prevent page refresh after submit
        e.preventDefault();

        //check if passwords match
        // if they do,send new password to backend
        // if successful, flip flag
        // if not, display alert

        //if not, display error alert
    }

    // returns password reset component
    return (
        <div className="change-password-div">
            <p>Change Password</p>
            <form onSubmit={changePassword}>
                <input type="password" id="new-password" placeholder="new password"
                    pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
                <input type="password" id="new-password-conf" placeholder="confirm new password"
                    pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
                <input type="submit" value="Submit change" />
            </form>
        </div>

    )
}

export default ChangePassword;