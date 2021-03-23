
// page imports
import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';

// contexts
import { DataContext } from '../../contexts/DataContext';
import 'semantic-ui-css/semantic.min.css'


const SearchBar = () => {

   // consumes data from DataContext
   const { buildingList, selectedBuilding, setSelectedBuilding, setSelectedRooms } = useContext(DataContext);


   // pulls selection text from dropdown and passes it back to context
   const handleSelectChange = (e, { value }) => {
      setSelectedBuilding(value);
      setSelectedRooms([]);
   }


   // returns searchbar component
   return (
      <Dropdown className="dropdown"
         onChange={handleSelectChange}
         placeholder={selectedBuilding === "" ? "Search for a building" : selectedBuilding}
         fluid
         search
         selection
         options={buildingList.map(item => {
            return {
               key: item,
               text: item,
               value: item
            }
         })}
         selectOnBlur={false}
      />
   );
}

export default SearchBar;