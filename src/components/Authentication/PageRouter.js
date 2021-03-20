
// page imports
import React, { useContext, useEffect } from 'react';

// contexts
import { AuthContext } from '../../contexts/AuthContext';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";


// components
import Auth from './Auth';
import Dashboard from '../Dashboard';
import AdminSettings from '../Admin/AdminSettings';

const PageRouter = () => {

   // consumes current authentication status from AuthContext
   const { authStatus } = useContext(AuthContext);


   // updates components with pulled rooms after building selection
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
   return (
      <div className="PageRouter">
         {
            <BrowserRouter >
               <Switch>

                  <Route path="/auth" component={Auth}>
                     {authStatus === true ?
                        <Redirect to="/dashboard" component={AdminSettings} /> :
                        null
                     }
                  </Route>

                  {authStatus === true ?
                     <Route path="/dashboard" component={AdminSettings} /> :
                     <Redirect to="/auth" component={Auth} />
                  }

                  <Route path="*">
                     <Redirect to="/auth" component={Auth} />
                  </Route>

                  {/* {authStatus === true && userRole == 'admin' ?
                     <Route path="/admin" component={AdminSettings} /> :
                     null
                  } */}

                  <Route path="/admin" component={AdminSettings} />

               </Switch>
            </BrowserRouter>
         }
      </div>
   );
}

export default PageRouter;