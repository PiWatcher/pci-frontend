
// page imports
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

// context that manages user login and authentication
export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    // production base url
    // const baseURL = process.env.REACT_APP_BASE_URL;
    const baseURL = "http://localhost"

    // current authentication status
    const [authStatus, setAuthStatus] = useState(false);

    //  current user type 
    const [userRoleName, setUserRoleName] = useState('admin');

    //  current user permission
    const [userAdminPermissions, setUserAdminPermissions] = useState(false);

    //  current user permission 
    const [userViewRawData, setUserViewRawData] = useState(false);

    // submitted user name
    const [userName, setUserName] = useState('');

    // user token returned from the backend
    const [userToken, setUserToken] = useState('');

    // cookie functionality
    const cookies = new Cookies();

    // sends given user data to backend for authentication
    const authenticateAccount = async (email, password) => {

        // endpoint URL
        const signInEndpoint = `${baseURL}:5000/api/auth/signin`;

        // tries to connect to database and verify account information
        try {
            const response = await axios({
                method: 'post',
                url: signInEndpoint,
                data: {
                    email: email,
                    password: password
                }
            });

            // successfully verified
            if (response.status === 200) {

                let responseData = response.data;

                let responseRole = responseData.role;

                let responseToken = responseData.jwt_token;

                // set user information from response
                setUserName(responseData.full_name);
                setUserRoleName(responseRole.role_name);
                setUserAdminPermissions(responseRole.is_admin);
                setUserViewRawData(responseRole.can_view_raw);
                setUserToken(responseData.jwt_token)

                cookies.set('piWatcherAuth', {responseToken}, { path: '/', expires: new Date(Date.now() + 604800)});

                // set auth status to true
                setAuthStatus(true);

                return response;
            }
        }

        // failed to sign in
        catch (error) {

            // display error to console for debugging
            console.error('Error', error.response);

            return error.response.data;
        }
    };

    // sends given user data to backend for authentication
    const authenticateCookie = useCallback(async (cookieToken) => {

        // endpoint URL
        const tokenEndpoint = `${baseURL}:5000/api/auth/token`;

        // tries to connect to database and verify account information
        try {
            const response = await axios({
                method: 'post',
                url: tokenEndpoint,
                headers: {
                    'Authorization': `Bearer ${cookieToken}`
                }
            });

            // successfully verified
            if (response.status === 200) {

                let responseData = response.data;

                let responseRole = responseData.role;

                // set user information from response
                setUserName(responseData.full_name);
                setUserRoleName(responseRole.role_name);
                setUserAdminPermissions(responseRole.is_admin);
                setUserViewRawData(responseRole.can_view_raw);

                // set auth status to true
                setAuthStatus(true);
            }
        }

        // failed to sign in
        catch (error) {

            // display error to console for debugging
            console.error('Error', error.response);

            return false;
        }
    }, [userToken]);


    // sends given user data to backend for account creation
    const createAccount = async (name, email, password) => {

        // endpoint URL
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

                return response;
            }
        }

        // failed to sign up
        catch (error) {

            // display error to console for debugging
            console.error('Error', error.response);

            return error.response;
        }
    }

    // clears user information from state
    const signOut = () => {

        // remove cookie
        cookies.remove('piWatcherAuth');

        // clear user information
        setUserName('');
        setUserRoleName('');
        setUserAdminPermissions('');
        setUserViewRawData('');
        setUserToken('');

        // set auth status to false
        setAuthStatus(false);
    };

    useEffect(() => {

        // if cookie, authenticate token
        if(authStatus === false && cookies.get('piWatcherAuth') != null){

            let localResponseToken = cookies.get('piWatcherAuth').responseToken;

            authenticateCookie(localResponseToken);
        }
    }, [])


    return (
        <AuthContext.Provider value={{ userName, userRoleName, setUserToken, userToken, userAdminPermissions, userViewRawData, authStatus, authenticateAccount, createAccount, signOut, baseURL }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
