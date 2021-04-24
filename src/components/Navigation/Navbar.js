
// styling
import './Navbar.css';

// page imports
import React, { useContext } from 'react';
import SearchBar from './SearchBar';
import nauLogo from '../../images/nauLogoDash.svg';
import adminIcon from '../../images/adminIcon.svg';
import settingsIcon from '../../images/settingsIcon.svg';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// contexts
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';

// navbar component
const Navbar = (props) => {

   const { pulledBuildings } = props;

   // consume context
   const { userAdminPermissions, handleUserSignOut } = useContext(AuthContext);
   const { setSelectedBuilding, setSelectedCharts } = useContext(DataContext);

   const navSignOut = () => {

      // clears selection building in state
      setSelectedBuilding('');

      // clears selected rooms in state
      setSelectedCharts([]);

      // signs out from auth context
      handleUserSignOut();
   }

   // custom material ui them
   const navLinkTheme = createMuiTheme({
      overrides: {
         MuiTooltip: {
            tooltip: {
               fontSize: "1em"
            }
         }
      }
   });

   // returns navbar component (includes logo, search bar, admin settings, user settings, and sign out)
   return (
      <div>
         <div className="navbar-component">
            <div className="logo-div">
               <img src={nauLogo} alt="NAU Logo" />
            </div>

            <SearchBar pulledBuildings={pulledBuildings} />

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