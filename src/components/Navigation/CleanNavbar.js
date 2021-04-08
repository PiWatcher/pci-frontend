
// styling
import './CleanNavbar.css';

// page imports
import React, { useContext } from 'react';
import nauLogo from '../../images/nauLogoDash.svg';
import { Link } from 'react-router-dom';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// navbar without alternate links
const CleanNavbar = () => {

   // consume context
   const { setAuthStatus, cookies } = useContext(AuthContext);

   // sign out of dashboard
   const signOut = () => {

      // remove cookie
      cookies.remove('piWatcher Auth');

      // swap auth flag
      setAuthStatus(false);
   }

   // returns navbar component (includes logo and and sign out)
   return (
      <div className="clean-navbar-component">
         <div className="clean-logo-div">
            <Link to="/dashboard">
               <img src={nauLogo} alt="NAU Logo" />
            </Link>
         </div>

         <div className="clean-right-side-div">
            <div className="clean-sign-out-div" onClick={signOut}>
               Sign Out
            </div>
         </div>
      </div>
   );
}

export default CleanNavbar;