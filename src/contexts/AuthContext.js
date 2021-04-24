
// page imports
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';


import UserSignIn from '../components/Utilities/Authentication/UserSignIn';

import UserSignUp from '../components/Utilities/Authentication/UserSignUp';

import TokenSignIn from '../components/Utilities/Authentication/TokenSignIn';

// context that manages user login and authentication
export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    // production base url
    // const baseURL = process.env.REACT_APP_BASE_URL;
    const baseURL = "http://localhost"

    // current authentication status
    const [authStatus, setAuthStatus] = useState(false);

    //  current user type 
    const [userRoleName, setUserRoleName] = useState('');

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
    const handleUserSignIn = async (baseURL, email, password) => {

        // await authentication
        const result = await UserSignIn(baseURL, email, password);

        // if failure
        if (result instanceof Error) {

            return result;

        } else {

            let resultData = result.data;

            let resultRole = resultData.role;

            let resultToken = resultData.jwt_token;

            // set user information from response
            setUserName(resultData.full_name);
            setUserRoleName(resultRole.role_name);
            setUserAdminPermissions(resultRole.is_admin);
            setUserViewRawData(resultRole.can_view_raw);
            setUserToken(resultToken);

            cookies.set('piWatcherAuth', { resultToken }, { path: '/', maxAge: 604800, sameSite: 'strict' });

            // set auth status to true
            setAuthStatus(true);
        }
    };

    // sends given user data to backend for authentication
    const handleTokenSignIn = async (cookieToken) => {

        // await authentication
        const result = await TokenSignIn(baseURL, cookieToken);

        // if failure
        if (result instanceof Error) {

            return result;

        } else {

            let resultData = result.data;

            let resultRole = resultData.role;

            // set user information from response
            setUserName(resultData.full_name);
            setUserRoleName(resultRole.role_name);
            setUserAdminPermissions(resultRole.is_admin);
            setUserViewRawData(resultRole.can_view_raw);

            // set auth status to true
            setAuthStatus(true);
        }
    };


    // sends given user data to backend for account creation
    const handleUserSignUp = async (baseURL, name, email, password) => {

        // await authentication
        const result = await UserSignUp(baseURL, name, email, password);

        // if failure
        if (result instanceof Error) {

            return result;

        } else {

            return true;
        }
    };

    // clears user information from state
    const handleUserSignOut = () => {

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

        // // if cookie, authenticate token
        if (authStatus === false && cookies.get('piWatcherAuth') != null) {

            let localResultToken = cookies.get('piWatcherAuth').resultToken;

            setUserToken(localResultToken);

            handleTokenSignIn(localResultToken);
        }
    }, [authStatus, cookies])


    return (
        <AuthContext.Provider value={{ userName, userRoleName, userToken, userAdminPermissions, userViewRawData, authStatus, handleUserSignIn, handleUserSignUp, handleUserSignOut, baseURL }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
