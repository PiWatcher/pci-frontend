import React, { useContext } from 'react';
import './SearchBar.css';
import { Dropdown } from 'semantic-ui-react';
import { BuildingContext } from '../contexts/BuildingContext';


const SearchBar = () => {

  // consumes context of BuildingContext
  const { buildingList, setBuilding } = useContext( BuildingContext );
  

  // pulls selection text from dropdown and passes it back to context
  const handleSelectChange = (e, { value }) => {
    setBuilding( value );
  }

  // returns searchbar component
  return (
    <div className="search-bar">
        <Dropdown
          onChange = { handleSelectChange }
          placeholder = 'Select a building'
          fluid
          search
          selection
          options = { buildingList }
        />
    </div>
  );  
}
 
export default SearchBar;