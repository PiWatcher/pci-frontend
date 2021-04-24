
// styling
import './Auth.css';

// page imports
import React, { useContext, useState } from 'react';
import nauLogo from '../../images/nauLogoLogin.svg';
import { Link } from 'react-router-dom';
import UserSignUp from '../Utilites/Authentication/UserSignUp';


// components
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { AuthContext } from '../../contexts/AuthContext';


// authentication page
const Auth = () => {

    // consume data from AuthContext
    const {baseURL, handleUserSignIn, handleUserSignUp} = useContext(AuthContext);

    // local variable for user password during text input
    const [localUserName, setLocalUserName] = useState('');

    // local variable for user email during text input
    const [localEmail, setLocalEmail] = useState('');

    // local variable for user password during text input
    const [localPassword, setLocalPassword] = useState('');

    // state for auth type management
    const [localSelectedAuth, setLocalSelectedAuth] = useState("Sign In");

    // current sign up status
    const [signUpStatus, setSignUpStatus] = useState(false);

    // state for alert display
    const [showAlert, setShowAlert] = useState(false);

    // state for alert type
    const [alertType, setAlertType] = useState('');

    // state for alert type
    const [alertMessage, setAlertMessage] = useState('');

    // places user form input into local temp variables
    const handleInputChange = (e) => {
        if (e.target.id === "name") {
            setLocalUserName(e.target.value);
        }

        else if (e.target.id === "email") {
            setLocalEmail(e.target.value.toLowerCase());
        }

        else if (e.target.id === "password") {
            setLocalPassword(e.target.value);
        }
    };

    // passes temp variables to AuthContext state after submit
    const handleSubmit = async (e) => {

        // prevent page refresh after submit
        e.preventDefault();

        // authenticates account 
        if (localSelectedAuth === "Sign In") {

            // await authentication
            const result = await handleUserSignIn(baseURL, localEmail, localPassword);

                // if failure
                if (result instanceof Error) {

                    setAlertType('sign-in-failure');

                    setAlertMessage(result.message)

                    setShowAlert(true);
                }
        }

        // creates user in database
        else if (localSelectedAuth === "Sign Up") {

            const result = await handleUserSignUp(baseURL, localUserName, localEmail, localPassword);


            if(result instanceof Error) {
                // set alert type
                setAlertType('sign-up-failure')

                setAlertMessage(result.message)

                // show alert
                setShowAlert(true);
            } else {

                // set sign up status
                setSignUpStatus(true);
            }
        };
    }

    // sets css for sign in tab and sets local variable to sign in
    const selectSignIn = () => {

        // sets auth choice to sign in
        setLocalSelectedAuth("Sign In");

        // sets css for log in tab selection
        let signIn = document.getElementById("sign-in-id");
        let signUp = document.getElementById("sign-up-id");

        // swaps active classes
        if (signUp.classList.contains("activeLoginType")) {

            signUp.classList.remove("activeLoginType");
            signUp.classList.add("nonActiveLoginType");

            signIn.classList.remove("nonActiveLoginType");
            signIn.classList.add("activeLoginType");
        }
    };


    // sets css for register tab and sets local variables to sing in
    const selectSignUp = () => {

        // sets auth choice to sign up
        setLocalSelectedAuth("Sign Up");

        // sets css for sign up tab selection
        let signIn = document.getElementById("sign-in-id");
        let signUp = document.getElementById("sign-up-id");

        // swaps active classes
        if (signIn.classList.contains("activeLoginType")) {

            signIn.classList.remove("activeLoginType");
            signIn.classList.add("nonActiveLoginType");

            signUp.classList.remove("nonActiveLoginType");
            signUp.classList.add("activeLoginType");
        }
    };

    // returns the login page with input form
    return (
        <div className="login fadeInDown">
            <div className="wrapper">
                <img src={nauLogo} className="fadeIn first" alt="NAU Logo" />

                <div className="auth-functions fadeIn second">
                    <div className="sign-in">
                        <h2 id="sign-in-id" className="activeLoginType" onClick={() => selectSignIn()}> Sign In </h2>
                    </div>
                    <div className="sign-up">
                        <h2 id="sign-up-id" className="nonActiveLoginType" onClick={() => selectSignUp()}> Sign Up </h2>
                    </div>
                </div>

                {
                    // ternary for selecting log in or sign up forms
                    localSelectedAuth === "Sign In" ?

                        <div className="sign-in-form fadeIn third">
                            {
                                <form onSubmit={handleSubmit}>
                                    <input type="hidden" />
                                    <input type="login" id="email" placeholder="email" onChange={handleInputChange} required />
                                    <input type="password" id="password" placeholder="password" onChange={handleInputChange} required />
                                    <input type="submit" value="Sign In" />
                                </form>
                            }
                            <div className="forgot-password-div">
                                <Link to="/authforgot" className="forgot-password-link">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        :

                        <div className="sign-up-form fadeIn third" id="upForm">
                            {
                                // ternary for displaying successful sign up
                                signUpStatus === false ?

                                    <form onSubmit={handleSubmit}>
                                        <input type="name" id="name" placeholder="full name" pattern="^[A-Z][a-z]* [A-Z][a-z]*( [A-Z])?"
                                            onChange={handleInputChange} required />
                                        <input type="login" id="email" placeholder="email"
                                            pattern="^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@nau.edu$" onChange={handleInputChange} required />
                                        <input type="password" id="password" placeholder="password"
                                            pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleInputChange} required />
                                        {/* <p>Password must include at least two types of characters and be six characters long.</p> */}
                                        <input type="submit" value="Sign Up" />
                                    </form>

                                    :

                                    <div className="sign-up-success">
                                        Sign up success!
                                </div>
                            }
                        </div>
                }
            </div>

            {showAlert === true && localSelectedAuth === "Sign In" ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Sign In Failure`}
                    description={alertMessage} />
                :
                null}


            {showAlert === true && localSelectedAuth === "Sign Up" ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Sign Up Failure`}
                    description={alertMessage} />
                :
                null}
        </div>
    )
}

export default Auth;