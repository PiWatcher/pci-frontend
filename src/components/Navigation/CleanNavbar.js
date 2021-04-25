
// styling
import './CleanNavbar.css';

// page imports
import React, { useContext } from 'react';
import nauLogo from '../../images/nauLogoDash.svg';

// contexts
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { DataContext } from '../../contexts/DataContext';

// components
import { Link } from 'react-router-dom';


/** 
* Component: CleanNavbar
* 
* Navigation bar component that does not include the searchbar and settings buttons
*/
const CleanNavbar = () => {

   const { handleUserSignOut } = useContext(AuthenticationContext);

   const { setSelectedBuilding, setSelectedCharts } = useContext(DataContext);


   /** 
   * Function: navSignOut
   * 
   * Clears data from state and calls the handleUserSignOut function from auth context
   */
   const navSignOut = () => {

      // clears selection building in state
      setSelectedBuilding('');

      // clears selected rooms in state
      setSelectedCharts([]);

      // signs out from auth context
      handleUserSignOut();
   }


   /** 
    * Return: CleanNavbar JSX
    * 
    * Returns the layout for display in the browser
    */
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