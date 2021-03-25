
// page imports
import React, { createContext, useState } from 'react';
import axios from 'axios';

// context that manages user login and authentication

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    // production base url
    const baseURL = process.env.REACT_APP_BASE_URL;

    // current authentication status
    const [authStatus, setAuthStatus] = useState(true);

    // current sign up status
    const [signUpStatus, setSignUpStatus] = useState(false);

    //  current user type 
    const [userRole, setUserRole] = useState('admin');

    // submitted user name
    const [userName, setUserName] = useState('');

    // user token returned from the backend
    const [userToken, setUserToken] = useState('');


    // sends given user data to backend for authentication
    const authenticateAccount = async (email, password) => {

        const signInURL = `${baseURL}:5000/api/auth/signin`;



        console.log(baseURL);

        // tries to connect to database and verify account information
        try {
            const response = await axios({
                method: 'post',
                url: signInURL,
                data: {
                    email: email,
                    password: password
                }
            });

            // successfully verified
            if (response.status === 200) {


                let responseData = response.data;

                // set user information from response
                setUserName(responseData.full_name);
                setUserRole(responseData.role);
                setUserToken(responseData.jwt_token);

                // set cookie (expires 7 days)

                setAuthStatus(true);
            }
        }

        // failed to sign in
        catch {
            setAuthStatus(false);
        }
    }


    // sends given user data to backend for acccount creation
    const createAccount = async (name, email, password) => {

        const signUpURL = `${baseURL}:5000/api/auth/signup`;



        console.log(baseURL);

        // tries to connect to database and post new account information
        try {
            const response = await axios({
                method: 'post',
                url: signUpURL,
                data: {
                    email: email,
                    password: password,
                    full_name: name
                }
            });

            console.log(response);

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

    // useEffect(() => {

    //     // check for cookie
    //     // if cookie
    //     // set token
    //     // authenticateAccount()

    // }, [])

    return (
        <AuthContext.Provider value={{ userRole, userToken, authStatus, setAuthStatus, signUpStatus, authenticateAccount, createAccount, baseURL }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider
