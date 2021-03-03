
// page imports
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// context that manages user login and authentication

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    // current authentication status
    const [authStatus, setAuthStatus] = useState(null);

    // current sign up status
    const [signUpStatus, setSignUpStatus] = useState(false);

    // selected auth type (log in or sing up)
    const [selectedAuth, setSelectedAuth] = useState("Sign In");

    //  current user type
    const [userType, setUserType] = useState('admin');

    // submitted user name
    const [userName, setUserName] = useState('Test User');

    // submitted email 
    const [email, setEmail] = useState('');

    // submitted password
    const [password, setPassword] = useState('');


    const authenticateAccount = async () => {

        const signInUrl = 'http://127.0.0.1:5000/api/auth/signin';

        const signUpURL = 'http://127.0.0.1:5000/api/auth/signup';

        // if log in tab is selected
        if (selectedAuth === "Sign In") {

            // tries to connect to database and verify account information
            try {
                const response = await axios({
                    method: 'post',
                    url: signInUrl,
                    data: {
                        email: email,
                        password: password
                    }
                });

                // successfully verified
                if (response.status === 200) {

                    // set user name to response
                    //setUserName(response.username);

                    setAuthStatus(true);
                }
            }

            // failed to sign in
            catch {
                setAuthStatus(false);
            }
        }

        // if sign up tab is selected
        else if (selectedAuth === "Sign Up") {

            // tries to connect to database and post new account information
            try {
                const response = await axios({
                    method: 'post',
                    url: signUpURL,
                    data: {
                        name: userName,
                        email: email,
                        password: password,
                        user_type: userType
                    }
                });

                // successfully signed up
                if (response.status === 201) {
                    setSignUpStatus(true);
                }
            }

            // failed to sign up
            catch {
                setAuthStatus(false);
            }
        }
    }

    // updates component once email and password have been updated
    useEffect(() => {

        email !== '' && password !== '' && authenticateAccount();

    }, [email, password])


    return (
        <AuthContext.Provider value={{ setUserName, userName, setEmail, setPassword, authStatus, setAuthStatus, selectedAuth, setSelectedAuth, signUpStatus }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
