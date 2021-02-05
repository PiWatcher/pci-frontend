
// page imports
import React, { useContext } from 'react';

// contexts
import { AuthContext } from '../contexts/AuthContext';

// components
import Login from './Login';
import Dashboard from './Dashboard';


const PageRouter = () => {

   // consumes current authentication status from AuthContext
   const { authStatus } = useContext(AuthContext);

   // if not authenticated, displays login screen
   // if authenticated, displays dashboard
   return (
      <div className="PageRouter">
         {
            authStatus ?
               <Dashboard /> :
               <Login />
         }
      </div>
   );
}

export default PageRouter;