
// page imports
import React, { useContext, useEffect } from 'react';

// components
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from '../Authentication/Auth';
import Dashboard from '../Dashboard/Dashboard';
import AdminSettings from '../Administrator/AdminSettings';
import UserSettings from '../Settings/UserSettings';

// contexts
import { AuthenticationContext } from '../../contexts/AuthenticationContext';


/** 
* Component: PageRouter
* 
* Redirects user based on authentication status
*/
const PageRouter = () => {

   const {
      // {boolean} if user has admin privileges
      userAdminPermissions,

      // {boolean} if user has successfully been authenticated
      authStatus
   } = useContext(AuthenticationContext);


   /** 
   * Function: useEffect
   * 
   * Redirects user based on authentication status
   */
   useEffect(() => {

      if (authStatus) {
         return (
            <Route exact path="/auth">
               <Redirect to="/dashboard" />
            </Route>
         )
      }

   }, [authStatus])


   /** 
   * Return: PageRouter JSX
   * 
   * If user not authenticated, displays login screen
   * 
   * If user authenticated, displays dashboard
   * 
   * If user had admin privileges, can access admin settings
   * 
   * Anything else redirects back to the login page, which will then forward based on auth status
   */
   return (
      <div className="PageRouter">
         {
            <BrowserRouter >
               <Switch>

                  {/* auth to dashboard */}
                  <Route exact path="/auth" component={Auth}>
                     {authStatus ?
                        <Redirect to="/dashboard" component={Dashboard} /> :
                        null
                     }
                  </Route>

                  {/* dashboard to auth */}
                  {authStatus ?
                     <Route exact path="/dashboard" component={Dashboard} /> :
                     <Redirect to="/auth" component={Auth} />
                  }

                  {/* settings to auth */}
                  {authStatus ?
                     <Route exact path="/settings" component={UserSettings} /> :
                     <Redirect to="/auth" component={Auth} />
                  }

                  {/* admin settings */}
                  {authStatus && userAdminPermissions ?
                     <Route exact path="/admin" component={AdminSettings} /> :
                     <Redirect to="/dashboard" component={Dashboard} />
                  }

                  {/* redirect to login for any other address */}
                  <Route path="*">
                     <Redirect to="/auth" component={Auth} />
                  </Route>

               </Switch>
            </BrowserRouter>
         }
      </div>
   );
}

export default PageRouter;