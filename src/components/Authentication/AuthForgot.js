
// styling
import './AuthForgot.css';

// page imports
import React, { useContext, useState } from 'react';
import nauLogo from '../../images/nauLogoLogin.svg';
import { Link } from 'react-router-dom';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// authentication page
const Auth = () => {

    // consume data from AuthContext
    const { } = useContext(AuthContext);

    // local variable for user password during text input
    const [localEmail, setLocalEmail] = useState('');

    // local variable for user password during text input
    const [localAuthCode, setLocalAuthCode] = useState('');

    // local variable for user password during text input
    const [localNewPassword, setLocalNewPassword] = useState('');

    // local variable for user password during text input
    const [localNewPasswordConf, setLocalNewPasswordConf] = useState('');

    // local variable for user password during text input
    const [emailSent, setEmailSent] = useState(false);

    // local variable for user password during text input
    const [codeVerified, setCodeVerified] = useState(false);

    // local variable for user password during text input
    const [resetConfirmed, setResetConfirmed] = useState(false);

    // places user form input into local temp variables
    const handleInputChange = (e) => {
        if (e.target.id === "email") {
            setLocalEmail(e.target.value);
        }

        else if (e.target.id === "auth-code") {
            setLocalAuthCode(e.target.value);
        }

        else if (e.target.id === "new-password") {
            setLocalNewPassword(e.target.value);
        }

        else if (e.target.id === "new-password-conf") {
            setLocalNewPasswordConf(e.target.value);
        }
    }

    // send email to backend to verify and send reset code
    const getResetCode = (e) => {

        // prevent page refresh after submit
        e.preventDefault();

        // send email to backend
        // if has account and code is sent, flip flag

        //if not, display error alert
    }

    // send auth code to backend to verify
    const verifyResetCode = (e) => {

        // prevent page refresh after submit
        e.preventDefault();

        // send code to backend
        // if verified, flip flag

        //if not, display error alert
    }

    // send new password to backend for update
    const confirmReset = (e) => {

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
        <div className="login">
            <div className="wrapper">
                <img src={nauLogo} alt="NAU Logo" />

                <div className="reset-form">
                    {resetConfirmed === true ?
                        <div className="forgot-password-div">
                            <div className="reset-text">Password has been reset successfully!</div>
                            <div className="return-link">
                                <Link to="/auth">
                                    Return to sign in page.
                                </Link>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="reset-text">Password Reset</div>
                            {codeVerified === true ?
                                <form onSubmit={confirmReset}>
                                    <input type="password" id="new-password" placeholder="new password"
                                        pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
                                    <input type="password" id="new-password-conf" placeholder="confirm new password"
                                        pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
                                    <input type="submit" value="Submit reset" />
                                </form>
                                :
                                <div>
                                    {emailSent === true ?
                                        <form onSubmit={verifyResetCode}>
                                            <input type="auth-code" id="auth-code" placeholder="reset code" onChange={handleInputChange} required />
                                            <input type="submit" value="Submit code" />
                                        </form>
                                        :
                                        <form onSubmit={getResetCode}>
                                            <input type="email" id="email" placeholder="email" pattern="^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@nau.edu$" onChange={handleInputChange} required />
                                            <input type="submit" value="Get reset code" />
                                        </form>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Auth;