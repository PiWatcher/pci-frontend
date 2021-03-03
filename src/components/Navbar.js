
// styling
import './Navbar.css';

// page imports
import React, { useContext, useState } from 'react';
import SearchBar from './SearchBar';
import BuildingMap from './BuildingMap';
import nauLogo from '../images/nauLogoDash.svg';
import mapIcon from '../images/mapIcon.svg';

// contexts
import { AuthContext } from '../contexts/AuthContext';



const Navbar = () => {

   const { setEmail, setPassword, setAuthStatus } = useContext(AuthContext);

   // flag to show map or not on dashboard
   const [showMap, setShowMap] = useState(false);

   // flip flag for showing map div
   const onMapClick = () => setShowMap(!showMap);

   // sign out of dashboard, clear all data and reset auth status
   const signOut = () => {
      setEmail('');
      setPassword('');
      setAuthStatus(null);
   }


   // returns navbar component (includes logo and search bar)
   return (
      <div>
         <div className="navbar-component">
            <div className="image-div">
               <img className="logo" src={nauLogo} alt="NAU Logo" />
            </div>

            <div className="search-div">
               <SearchBar />
            </div>

            <div className="mapIcon-div">
               <img className="map" onClick={onMapClick} src={mapIcon} alt="Map Icon" />
            </div>

            <div className="sign-out" onClick={signOut}>
               Sign Out
            </div>
         </div>

         <div className="map-div">
            {showMap ? <BuildingMap /> : null}
         </div>

      </div>
   );
}

export default Navbar;