
// styling
import './Navbar.css';

// page imports
import React, { useContext, useState } from 'react';
import SearchBar from './SearchBar';
import BuildingMap from './BuildingMap';
import nauLogo from '../images/nauLogo.svg';
import mapIcon from '../images/mapIcon.svg';

// contexts
import { AuthContext } from '../contexts/AuthContext';



const Navbar = () => {

   const { setAuthStatus } = useContext(AuthContext);

   const [showMap, setShowMap] = useState(false);

   const onMapClick = () => setShowMap(!showMap);

   const signOut = () => setAuthStatus(false);


   // returns navbar component (includes logo and search bar)
   return (
      <div>
         <div className="navbar">
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