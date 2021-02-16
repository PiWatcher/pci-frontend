
// page imports
import React, { useContext } from 'react';

// contexts
import { AuthContext } from '../contexts/AuthContext';

// components
import Auth from './Auth';
import Dashboard from './Dashboard';


const PageRouter = () => {

   // consumes current authentication status from AuthContext
   const { authStatus } = useContext(AuthContext);

   // if not authenticated, displays login screen
   // if authenticated, displays dashboard
   return (
      <div className="PageRouter">
         {
            authStatus === null || authStatus === false ?
               <Auth /> :
               <Dashboard />
         }
      </div>
   );
}

export default PageRouter;