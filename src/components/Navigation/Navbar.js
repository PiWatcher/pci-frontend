
// styling
import './Navbar.css';

// page imports
import React, { useContext } from 'react';

import nauLogo from '../../images/nauLogoDash.svg';
import adminIcon from '../../images/adminIcon.svg';
import settingsIcon from '../../images/settingsIcon.svg';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// components
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';

// contexts
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { DataContext } from '../../contexts/DataContext';


/** 
* Component: Navbar
* 
* Navigation bar component that does include the searchbar and settings buttons
*
* @param {props} props
*/
const Navbar = (props) => {

   const {

      // {list} pulled buildings from the back end database
      pulledBuildings } = props;

   const {

      // {boolean} if user has admin privileges
      userAdminPermissions,

      // {function} signs out the user from the application
      handleUserSignOut

   } = useContext(AuthenticationContext);

   const {

      // {function} sets the selected building
      setSelectedBuilding,

      // {function} sets the list of selected chart objects
      setSelectedCharts

   } = useContext(DataContext);


   // Material UI Theme
   const navLinkTheme = createMuiTheme({
      overrides: {
         MuiTooltip: {
            tooltip: {
               fontSize: "1em"
            }
         }
      }
   });


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
      <div>
         <div className="navbar-component">
            <div className="logo-div">
               <img src={nauLogo} alt="NAU Logo" />
            </div>

            <Searchbar pulledBuildings={pulledBuildings} />

            <div className="right-side-div">
               <MuiThemeProvider theme={navLinkTheme}>
                  {userAdminPermissions === true ?
                     <div className="admin-icon-div">
                        <Tooltip title="Admin Settings" arrow>
                           <Link to="/admin">
                              <img src={adminIcon} alt=" Admin Icon" />
                           </Link>
                        </Tooltip>
                     </div>
                     :
                     null
                  }

                  <div className="settings-icon-div">
                     <Tooltip title="Settings" arrow>
                        <Link to="/settings">
                           <img src={settingsIcon} alt="Settings Icon" />
                        </Link>
                     </Tooltip>
                  </div>
               </MuiThemeProvider>

               <div className="sign-out-div" onClick={navSignOut}>
                  Sign Out
               </div>
            </div>
         </div>
      </div>
   );
}

export default Navbar;