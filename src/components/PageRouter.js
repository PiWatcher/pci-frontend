
// page imports
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// contexts
import { AuthContext } from '../contexts/AuthContext';

// components
import Auth from './Authentication/Auth';
import Dashboard from './Dashboard';
import AdminSettings from './Admin/AdminSettings';
import AuthForgot from './Authentication/AuthForgot';
import Settings from './Settings/Settings';

// component that redirects based on authentication status
const PageRouter = () => {

   // consumes current user information from AuthContext
   const { userAdminPermissions, authStatus } = useContext(AuthContext);

   // redirects after successful login on authentication page
   useEffect(() => {

      if (authStatus === true) {
         return (
            <Route exact path="/auth">
               <Redirect to="/dashboard" />
            </Route>
         )
      }

   }, [authStatus])


   // if not authenticated, displays login screen
   // if authenticated, displays dashboard
   // if admin, can access admin URL
   // anything else redirects back to the login page
   return (
      <div className="PageRouter">
         {
            <BrowserRouter >
               <Switch>

                  {/* forgot password */}
                  <Route exact path="/authforgot" component={AuthForgot} />

                  {/* auth to dashboard */}
                  <Route exact path="/auth" component={Auth}>
                     {authStatus === true ?
                        <Redirect to="/dashboard" component={Dashboard} /> :
                        null
                     }
                  </Route>

                  {/* dashboard to auth */}
                  {authStatus === true ?
                     <Route exact path="/dashboard" component={Dashboard} /> :
                     <Redirect to="/auth" component={Auth} />
                  }

                  {/* settings to auth */}
                  {authStatus === true ?
                     <Route exact path="/settings" component={Settings} /> :
                     <Redirect to="/auth" component={Auth} />
                  }

                  {/* admin settings */}
                  {authStatus === true && userAdminPermissions === true ?
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