
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
    const { } = useContext(AuthContext);

    // local variable for user password during text input
    const [localAuthCode, setLocalAuthCode] = useState('');


    // places user form input into local temp variables
    const handleInputChange = (e) => {
        if (e.target.id === "auth-code") {
            setLocalAuthCode(e.target.value);
        }
    }


    // passes temp variables to AuthContext state after submit
    const handleSubmit = (e) => {

        // send to backend to verify code
        // if verified, redirect to reset password page

        // if not, display alert with error
        // on confirm, redirect to auth page
    }

    // const notifyBackend = () => {

    //     // notify backend to send code

    // }

    // useEffect(() => {

    //     notifyBackend();

    // }, [])


    // returns the login page with input form
    return (
        <div className="login fadeInDown">
            <div className="wrapper">
                <img src={nauLogo} className="fadeIn first" alt="NAU Logo" />

                <div className="sign-in-form fadeIn third">
                    {
                        <form onSubmit={handleSubmit}>
                            <input type="auth-code" id="authcode" placeholder="email" onChange={handleInputChange} required />
                            <input type="submit" value="Sign In" />
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default Auth;