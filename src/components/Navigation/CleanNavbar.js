
// styling
import './CleanNavbar.css';

// page imports
import React, { useContext } from 'react';
import nauLogo from '../../images/nauLogoDash.svg';

// contexts
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';



const CleanNavbar = () => {

   const { setAuthStatus } = useContext(AuthContext);

   // sign out of dashboard, clear all data and reset auth status
   const signOut = () => {
      setAuthStatus(null);
   }

   // returns navbar component (includes logo and search bar)
   return (
      <div className="clean-navbar-component">
         <div className="clean-logo-div">
            <Link to="/dashboard">
               <img src={nauLogo} alt="NAU Logo" />
            </Link>
         </div>

         <div className="clean-sign-out-div" onClick={signOut}>
            Sign Out
            </div>
      </div>
   );
}

export default CleanNavbar;