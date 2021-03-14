
// styling
import './Auth.css';

// page imports
import React, { useContext, useState } from 'react';
import nauLogo from '../../images/nauLogoLogin.svg';

// contexts
import { AuthContext } from '../../contexts/AuthContext';


const Auth = () => {

    // consume data from AuthContext
    const { authStatus, setAuthStatus, signUpStatus, authenticateAccount, createAccount } = useContext(AuthContext);

    // local variable for user password during text input
    const [localUserName, setLocalUserName] = useState('');

    // local variable for user email during text input
    const [localEmail, setLocalEmail] = useState('');

    // local variable for user password during text input
    const [localPassword, setLocalPassword] = useState('');

    // local variable for user password during text input
    const [localSelectedAuth, setLocalSelectedAuth] = useState("Sign In");


    // places user form input into local temp variables
    const handleInputChange = (e) => {
        if (e.target.id === "name") {
            setLocalUserName(e.target.value);
        }

        else if (e.target.id === "email") {
            setLocalEmail(e.target.value);
        }

        else if (e.target.id === "password") {
            setLocalPassword(e.target.value);
        }
    }


    // passes temp variables to AuthContext state after submit
    const handleSubmit = (e) => {

        e.preventDefault();

        // sets if user log in
        if (localSelectedAuth === "Sign In") {

            authenticateAccount(localEmail, localPassword);

        }

        // sets if user sign up
        else if (localSelectedAuth === "Sign Up") {

            createAccount(localUserName, localEmail, localPassword);

        }

        else {
            console.log("Error setting user information to context")
        }
    }


    // sets css for sign in tab and sets local variable to sign in
    const selectSignIn = () => {

        // sets auth choice to sign in
        setLocalSelectedAuth("Sign In");

        // resets auth status to null to restore original values on tab change
        setAuthStatus(null);

        // sets css for log in tab selection
        let signIn = document.getElementById("sign-in-id");
        let signUp = document.getElementById("sign-up-id");

        if (signUp.classList.contains("activeLoginType")) {

            signUp.classList.remove("activeLoginType");
            signUp.classList.add("nonActiveLoginType");

            signIn.classList.remove("nonActiveLoginType");
            signIn.classList.add("activeLoginType");
        }
    }


    // sets css for register tab and sets local variables to sing in
    const selectSignUp = () => {

        // sets auth choice to sign up
        setLocalSelectedAuth("Sign Up");

        // resets auth status to null to restore original values on tab change
        setAuthStatus(null);

        // sets css for sign up tab selection
        let signIn = document.getElementById("sign-in-id");
        let signUp = document.getElementById("sign-up-id");

        if (signIn.classList.contains("activeLoginType")) {

            signIn.classList.remove("activeLoginType");
            signIn.classList.add("nonActiveLoginType");

            signUp.classList.remove("nonActiveLoginType");
            signUp.classList.add("activeLoginType");
        }
    }

    // returns the login page with input form
    return (
        <div className="Login fadeInDown">
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
                                    <input type="login" id="email" placeholder="email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={handleInputChange} required />
                                    <input type="password" id="password" placeholder="password" onChange={handleInputChange} required />
                                    {
                                        // ternary for displaying failed auth verification (wrong email or password)
                                        authStatus === false ?

                                            <div className="failure-text">
                                                Authentication failure. Please check your credentials.
                                            </div>

                                            :

                                            null
                                    }

                                    <input type="submit" value="Sign In" />
                                </form>
                            }
                        </div>

                        :

                        <div className="sign-up-form fadeIn third" id="upForm">
                            {
                                // ternary for displaying successful sign up
                                signUpStatus === false ?

                                    <form onSubmit={handleSubmit}>
                                        <input type="name" id="name" placeholder="full name" onChange={handleInputChange} required />
                                        <input type="login" id="email" placeholder="email"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={handleInputChange} required />
                                        <input type="password" id="password" placeholder="password" onChange={handleInputChange} required />
                                        {
                                            // ternary for displaying failed sign up (based on failed connection to endpoint)
                                            authStatus === false ?

                                                <div className="failure-text">
                                                    Sign up failure. Please contact your administrator.
                                            </div>

                                                :

                                                null
                                        }

                                        <input type="submit" value="Sign Up" />
                                    </form>

                                    :

                                    <div className="sign-up-success">
                                        Sign up success! Please wait for administrator approval.
                                </div>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Auth;