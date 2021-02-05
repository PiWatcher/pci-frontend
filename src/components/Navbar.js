
// styling
import './Navbar.css';

// page imports
import React, { useContext } from 'react';
import SearchBar from './SearchBar';
import nauLogo from '../images/nauLogo.svg';

// contexts
import { AuthContext } from '../contexts/AuthContext';



const Navbar = () => {

   const { setAuthStatus, email } = useContext(AuthContext);

   const signOut = () => {
      setAuthStatus(false);
   }


   // returns navbar component (includes logo and search bar)
   return (
      <div className="navbar">
         <div className="image-div">
            <img className="logo" src={nauLogo} alt="NAU Logo" />
         </div>
         <div className="search-div">
            <SearchBar />
         </div>
         <div className="sign-out" onClick={signOut}>
            Sign Out
         </div>
      </div>
   );
}

export default Navbar;