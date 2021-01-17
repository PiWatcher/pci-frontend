import React from 'react';
import SearchBar from './SearchBar';
import './Navbar.css';
import nauLogo from '../images/nauLogo.svg';



const Navbar = () => {
  
    // returns navbar component (includes logo and search bar)
    return (
      <div className="navbar">
        <div className="image-div">
          <img className="logo" src={nauLogo} alt="NAU Logo"/>
        </div>
        <div className="search-div">
          <SearchBar />
        </div>
      </div>
    );  
  }
   
  export default Navbar;