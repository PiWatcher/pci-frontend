
// page imports
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

// context that manages user login and authentication
export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    // production base url
    // const baseURL = process.env.REACT_APP_BASE_URL;
    const baseURL = "http://localhost"

    // current authentication status
    const [authStatus, setAuthStatus] = useState(true);

    //  current user type 
    const [userRoleName, setUserRoleName] = useState('admin');

    //  current user type 
    const [userAdminPermissions, setUserAdminPermissions] = useState(true);

    //  current user type 
    const [userViewRawData, setUserViewRawData] = useState('');

    // submitted user name
    const [userName, setUserName] = useState('');

    // user token returned from the backend
    const [userToken, setUserToken] = useState('');

    // cookie functionality
    const cookies = new Cookies();


    // sends given user data to backend for authentication
    const authenticateAccount = async (email, password) => {

        const signInEndpoint = `${baseURL}:5000/api/auth/signin`;

        // tries to connect to database and verify account information
        try {
            const response = await axios({
                method: 'post',
                url: signInEndpoint,
                data: {
                    email: email,
                    password: password,
                    user_token: userToken
                }
            });

            // successfully verified
            if (response.status === 200) {


                let responseData = response.data;

                // set user information from response
                setUserName(responseData.full_name);
                setUserRoleName(responseData.role);
                setUserAdminPermissions(responseData.isAdmin);
                setUserViewRawData(responseData.canVewRaw);
                setUserToken(responseData.jwt_token);


                // set cookie with expiration date (7 days)
                cookies.set('piWatcher Auth', userToken, { path: '/', expires: new Date(Date.now() + 604800) });

                setAuthStatus(true);

                return true;
            }
        }

        // failed to sign in
        catch (error) {
            return (false)
        }
    };


    // sends given user data to backend for authentication
    const authenticateCookie = async () => {

        const signInEndpoint = `${baseURL}:5000/api/auth/signin`;

        // tries to connect to database and verify account information
        try {
            const response = await axios({
                method: 'post',
                url: signInEndpoint,
                data: {
                    email: null,
                    password: null,
                    user_token: userToken
                }
            });

            // successfully verified
            if (response.status === 200) {


                let responseData = response.data;

                // set user information from response

                setUserName(responseData.full_name);
                setUserRoleName(responseData.role);
                setUserAdminPermissions(responseData.isAdmin);
                setUserViewRawData(responseData.canVewRaw);

                setAuthStatus(true);

                return true;
            }
        }

        // failed to sign in
        catch (error) {
            return false;
        }
    }


    // sends given user data to backend for account creation
    const createAccount = async (name, email, password) => {

        const signUpEndpoint = `${baseURL}:5000/api/auth/signup`;

        // tries to connect to database and post new account information
        try {
            const response = await axios({
                method: 'post',
                url: signUpEndpoint,
                data: {
                    email: email,
                    password: password,
                    full_name: name
                }
            });

            // successfully signed up
            if (response.status === 201) {
                return true;
            }
        }

        // failed to sign up
        catch (error) {

            return false;
        }
    }

    useEffect(() => {

        // check for cookie
        if (cookies.get('piWatcher Auth')) {

            // if cookie, set token
            setUserToken(cookies.get('piWatcher Auth'));

            authenticateCookie();
        }

    }, [])


    return (
        <AuthContext.Provider value={{ userName, userRoleName, userToken, userAdminPermissions, userViewRawData, authStatus, setAuthStatus, authenticateAccount, createAccount, baseURL }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider
