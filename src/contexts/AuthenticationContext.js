
// page imports
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import Cookies from 'universal-cookie';

// functions
import UserSignIn from '../utilities/Authentication/UserSignIn';
import UserSignUp from '../utilities/Authentication/UserSignUp';
import TokenSignIn from '../utilities/Authentication/TokenSignIn';

// contexts
import { EnvironmentContext } from './EnvironmentContext'

// exports
export const AuthenticationContext = createContext();


/** 
* Context: AuthenticationContextProvider
* 
* Context that handles the storage and sharing of user authentication data
*
* @param {props} props
*/
const AuthenticationContextProvider = (props) => {

   // {string} base url for endpoints
   const { baseURL } = useContext(EnvironmentContext);

   // {boolean} current user authentication status
   const [authStatus, setAuthStatus] = useState(false);

   // {string} current user role
   const [userRoleName, setUserRoleName] = useState('');

   // {boolean} current user admin permissions
   const [userAdminPermissions, setUserAdminPermissions] = useState(false);

   // {boolean} current user raw data viewing permissions
   const [userViewRawData, setUserViewRawData] = useState(false);

   // {string} current user name
   const [userName, setUserName] = useState('');

   // {string} user token returned from the backend
   const [userToken, setUserToken] = useState('');

   // cookie functionality
   const cookies = new Cookies();


   /** 
   * Function: handleUserSignIn
   * 
   * Uses UserSignIn utility function to send request to the back end database and 
   *    verify the user's login information.
   * 
   * @param {string} email
   * @param {string} password
   */
   const handleUserSignIn = async (email, password) => {

      const result = await UserSignIn(baseURL, email, password);

      // if error is returned
      if (result instanceof Error) {

         return result;

      } else {

         // user data is set to state
         let resultData = result.data;

         let resultRole = resultData.role;

         let resultToken = resultData.jwt_token;

         // set user information from response
         setUserName(resultData.full_name);
         setUserRoleName(resultRole.role_name);
         setUserAdminPermissions(resultRole.is_admin);
         setUserViewRawData(resultRole.can_view_raw);
         setUserToken(resultToken);

         // cookie is created with returned token
         cookies.set('piWatcherAuth', { resultToken }, { path: '/', maxAge: 604800, sameSite: 'strict' });

         setAuthStatus(true);
      }
   };


   /** 
   * Function: handleTokenSignIn
   * 
   * Uses TokenSignIn utility function to send request to the back end database and 
   *    authenticate the supplied user token.  If successful, the matching user is signed in.
   * 
   * @param {string} cookieToken
   */
   const handleTokenSignIn = useCallback(async (cookieToken) => {

      const result = await TokenSignIn(baseURL, cookieToken);

      // if error is returned
      if (result instanceof Error) {

         return result;

      } else {

         // user data is set to state
         let resultData = result.data;

         let resultRole = resultData.role;

         // set user information from response
         setUserName(resultData.full_name);
         setUserRoleName(resultRole.role_name);
         setUserAdminPermissions(resultRole.is_admin);
         setUserViewRawData(resultRole.can_view_raw);

         setAuthStatus(true);
      }
   }, [baseURL]);


   /** 
   * Function: handleUserSignUp
   * 
   * Uses UserSignUp utility function to send a request to the back end database and 
   *    create user account.
   * 
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
   const handleUserSignUp = async (name, email, password) => {

      const result = await UserSignUp(baseURL, name, email, password);

      // if error is returned
      if (result instanceof Error) {

         return result;

      } else {

         return true;
      }
   };


   /** 
   * Function: handleUserSignOut
   * 
   * Clears all user data from state and deletes the user's cookie from the browser.
   */
   const handleUserSignOut = () => {

      // remove cookie
      cookies.remove('piWatcherAuth');

      // clear user information
      setUserName('');
      setUserRoleName('');
      setUserAdminPermissions('');
      setUserViewRawData('');
      setUserToken('');

      setAuthStatus(false);
   };


   /** 
   * Function: useEffect
   * 
   * On page load, checks browser storage for matching cookie. If successful, calls handleTokenSignIn with the token pulled from the cookie
   */
   useEffect(() => {

      // // if cookie, authenticate token
      if (authStatus === false && cookies.get('piWatcherAuth') != null) {

         let localResultToken = cookies.get('piWatcherAuth').resultToken;

         setUserToken(localResultToken);

         handleTokenSignIn(localResultToken);
      }
   }, [authStatus, cookies, handleTokenSignIn])


   /** 
   * Return: AuthenticationContextProvider JSX
   * 
   * Returns props for use by the children components
   */
   return (
      <AuthenticationContext.Provider value={{
         userName, userRoleName, userToken, userAdminPermissions, userViewRawData, authStatus,
         handleUserSignIn, handleUserSignUp, handleUserSignOut
      }}>
         {props.children}
      </AuthenticationContext.Provider>
   )
}

export default AuthenticationContextProvider
