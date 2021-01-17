import React, { useContext } from 'react';
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
    <Dropdown className="dropdown"
      onChange = { handleSelectChange }
      placeholder = 'Select a building'
      fluid
      search
      selection
      options = { buildingList }
    />
  );  
}
 
export default SearchBar;