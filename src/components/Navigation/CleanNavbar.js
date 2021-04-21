
// styling
import './CleanNavbar.css';

// page imports
import React, { useContext } from 'react';
import nauLogo from '../../images/nauLogoDash.svg';
import { Link } from 'react-router-dom';

// contexts
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';

// navbar component without settings links
const CleanNavbar = () => {

   // consume context
   const { signOut } = useContext(AuthContext);
   const { setSelectedBuilding, setSelectedCharts } = useContext(DataContext);

   const navSignOut = () => {

      // clears selection building in state
      setSelectedBuilding('');

      // clears selected rooms in state
      setSelectedCharts([]);

      // signs out from auth context
      signOut();
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
            <div className="clean-sign-out-div" onClick={navSignOut}>
               Sign Out
            </div>
         </div>
      </div>
   );
}

export default CleanNavbar;