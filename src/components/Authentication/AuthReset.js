
// styling
import './Auth.css';

// page imports
import React, { useContext, useState } from 'react';
import nauLogo from '../../images/nauLogoLogin.svg';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// authentication page
const Auth = () => {

    // consume data from AuthContext
    const { authenticateAccount, createAccount } = useContext(AuthContext);

    // local variable for user password during text input
    const [localUserName, setLocalUserName] = useState('');

    // local variable for user email during text input
    const [localEmail, setLocalEmail] = useState('');

    // local variable for user password during text input
    const [localPassword, setLocalPassword] = useState('');

    // local variable for user password during text input
    const [localPasswordConfirm, setLocalPasswordConfirm] = useState('');


    // places user form input into local temp variables
    const handleInputChange = (e) => {
        if (e.target.id === "new-password") {
            setLocalPassword(e.target.value);
        }

        else if (e.target.id === "new-password-confirm") {
            setLocalPasswordConfirm(e.target.value);
        }
    }


    // passes temp variables to AuthContext state after submit
    const handleSubmit = (e) => {

        // send new user password to backend for updating
        // display success
        // on confirm, redirect to auth page

        // if failure, display error
        // on confirm, redirect to auth page
    }

    // returns the login page with input form
    return (
        <div className="login fadeInDown">
            <div className="wrapper">
                <img src={nauLogo} className="fadeIn first" alt="NAU Logo" />

                <div className="auth-functions fadeIn second">
                    <div className="sign-in">
                        <h2 id="sign-in-id" className="activeLoginType"> Password Reset </h2>
                    </div>
                </div>

                <div className="sign-in-form fadeIn third">
                    {
                        <form onSubmit={handleSubmit}>
                            <input type="login" id="email" placeholder="email" onChange={handleInputChange} required />
                            <input type="password" id="password" placeholder="password" onChange={handleInputChange} required />
                            <input type="submit" value="Sign In" />
                        </form>
                    }
                </div>


            </div>
        </div>
    )
}

export default Auth;