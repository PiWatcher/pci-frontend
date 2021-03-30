
// styling
import './CleanNavbar.css';

// page imports
import React, { useContext } from 'react';
import nauLogo from '../../images/nauLogoDash.svg';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

// contexts
import { AuthContext } from '../../contexts/AuthContext';


const CleanNavbar = () => {

   // consume context
   const { setAuthStatus } = useContext(AuthContext);

   const cookies = new Cookies();

   // sign out of dashboard reset auth status
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

         <div className="clean-sign-out-div" onClick={signOut}>
            Sign Out
            </div>
      </div>
   );
}

export default CleanNavbar;