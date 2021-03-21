
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
   const { userRole, authStatus } = useContext(AuthContext);


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

                  {authStatus === true && userRole === 'admin' ?
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