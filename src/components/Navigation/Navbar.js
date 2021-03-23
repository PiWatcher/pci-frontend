
// styling
import './Navbar.css';

// page imports
import React, { useContext, useState } from 'react';
import SearchBar from './SearchBar';
import BuildingMap from './BuildingMap';
import nauLogo from '../../images/nauLogoDash.svg';
import mapIcon from '../../images/mapIcon.svg';
import adminIcon from '../../images/adminIcon.svg';
import { Link } from 'react-router-dom';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {


   const { userRole, setAuthStatus } = useContext(AuthContext);

   // flag to show map or not on dashboard
   const [showMap, setShowMap] = useState(false);

   // flip flag for showing map div
   const onMapClick = () => setShowMap(!showMap);

   // sign out of dashboard, clear all data and reset auth status
   const signOut = () => {
      setAuthStatus(null);
   }

   // returns navbar component (includes logo and search bar)
   return (
      <div>
         <div className="navbar-component">
            <div className="logo-div">
               <img src={nauLogo} alt="NAU Logo" />
            </div>

            <div className="search-div">
               <SearchBar />
            </div>

            <div className="map-icon-div">
               <img className="map" onClick={onMapClick} src={mapIcon} alt="Map Icon" />
            </div>


            <Link to="/admin">
               <img className="admin" src={adminIcon} alt=" Admin Icon" />
            </Link>

            <div className="right-side-div">
               {userRole === 'admin' ?
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

         <div className="map-div">
            {showMap ? <BuildingMap /> : null}
         </div>

      </div>
   );
}

export default Navbar;