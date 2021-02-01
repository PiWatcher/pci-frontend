import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { DataContext } from '../contexts/DataContext';


const SearchBar = () => {

  // consumes context of BuildingContext
  const { buildingList, setBuilding } = useContext( DataContext );
  

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