
// page imports
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// components
import Auth from './Auth';
import Dashboard from '../Dashboard';
import AdminSettings from '../Admin/AdminSettings';
import AuthForgot from '../Authentication/AuthForgot';

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
   // anything else redirects back to the login page
   return (
      <div className="PageRouter">
         {
            <BrowserRouter >
               <Switch>

                  <Route exact path="/authforgot" component={AuthForgot} />

                  <Route exact path="/auth" component={Auth}>
                     {authStatus === true ?
                        <Redirect to="/dashboard" component={Dashboard} /> :
                        null
                     }
                  </Route>

                  {authStatus === true ?
                     <Route exact path="/dashboard" component={Dashboard} /> :
                     <Redirect to="/auth" component={Auth} />
                  }

                  {/* admin settings */}
                  {authStatus === true && userAdminPermissions === true ?
                     <Route exact path="/admin" component={AdminSettings} /> :
                     <Redirect to="/dashboard" component={Dashboard} />
                  }

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