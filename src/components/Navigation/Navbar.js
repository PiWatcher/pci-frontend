
// styling
import './Navbar.css';

// page imports
import React, { useContext } from 'react';
import SearchBar from './SearchBar';
//import BuildingMap from './BuildingMap';
import nauLogo from '../../images/nauLogoDash.svg';
//import mapIcon from '../../images/mapIcon.svg';
import adminIcon from '../../images/adminIcon.svg';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {


   // consume context
   const { userAdminPermissions, setAuthStatus } = useContext(AuthContext);

   const cookies = new Cookies();

   // flag to show map or not on dashboard
   //const [showMap, setShowMap] = useState(false);

   // flip flag for showing map div
   //const onMapClick = () => setShowMap(!showMap);

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

            <div className="search-div">
               <SearchBar />
            </div>
            {/* 
            <div className="map-icon-div">
               <img className="map" onClick={onMapClick} src={mapIcon} alt="Map Icon" />
            </div> */}

            <div className="right-side-div">
               {userAdminPermissions === true ?
                  <div className="admin-icon-div">
                     <Link to="/admin">
                        <img src={adminIcon} alt=" Admin Icon" />
                     </Link>
                  </div>
                  :
                  null
               }

               <div className="sign-out-div" onClick={signOut}>
                  Sign Out
               </div>
            </div>

         </div>

         {/* <div className="map-div">
            {showMap ? <BuildingMap /> : null}
         </div> */}

      </div>
   );
}

export default Navbar;