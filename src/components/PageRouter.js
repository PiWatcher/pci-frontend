
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
            authStatus === true ?
               <Dashboard /> :
               <Auth />

         }
      </div>
   );
}

export default PageRouter;