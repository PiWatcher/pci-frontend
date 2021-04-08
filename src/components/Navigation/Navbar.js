
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
import { unstable_createMuiStrictModeTheme as createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {

   // consume context
   const { userAdminPermissions, setAuthStatus, cookies } = useContext(AuthContext);

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

   // sign out of dashboard, clear all data and reset auth status
   const signOut = () => {

      // remove cookie
      cookies.remove('piWatcher Auth');

      // swap auth flag
      setAuthStatus(false);
   }

   // returns navbar component (includes logo, search bar, admin settings, and sign out)
   return (
      <div>
         <div className="navbar-component">
            <div className="logo-div">
               <img src={nauLogo} alt="NAU Logo" />
            </div>

            <SearchBar />

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

               <div className="sign-out-div" onClick={signOut}>
                  Sign Out
               </div>
            </div>
         </div>
      </div>
   );
}

export default Navbar;