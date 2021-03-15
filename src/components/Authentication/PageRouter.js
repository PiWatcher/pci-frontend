
// page imports
import React, { useContext, useEffect } from 'react';

// contexts
import { AuthContext } from '../../contexts/AuthContext';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";


// components
import Auth from './Auth';
import Dashboard from '../Dashboard';

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
                        <Redirect to="/dashboard" component={Dashboard} /> :
                        null
                     }
                  </Route>

                  {authStatus === true ?
                     <Route path="/dashboard" component={Dashboard} /> :
                     null
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