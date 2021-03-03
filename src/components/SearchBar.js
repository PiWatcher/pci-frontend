
// page imports
import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';

// contexts
import { DataContext } from '../contexts/DataContext';
import 'semantic-ui-css/semantic.min.css'


const SearchBar = () => {

   // consumes data from DataContext
   const { buildingList, building, setBuilding, setRoom, setCountList } = useContext(DataContext);


   // pulls selection text from dropdown and passes it back to context
   const handleSelectChange = (e, { value }) => {
      setBuilding(value);
      setCountList([]);
      setRoom('');
   }

   // returns searchbar component
   return (
      <Dropdown className="dropdown"
         onChange={handleSelectChange}
         placeholder={building === "" ? "Select a building" : building}
         fluid
         search
         selection
         options={buildingList.map(item => {
            return {
               key: item.buildingName,
               text: item.buildingName,
               value: item.buildingName
            }
         })}
         selectOnBlur={false}
      />
   );
}

export default SearchBar;