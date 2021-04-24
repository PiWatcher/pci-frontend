
// styling
import './SearchBar.css';
import 'semantic-ui-css/semantic.min.css'

// page imports
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Dropdown } from 'semantic-ui-react';

// contexts
import { DataContext } from '../../contexts/DataContext';

// search bar with self containing building list state
const SearchBar = (props) => {

   const { pulledBuildings } = props;

   // consumes context
   const { selectedBuilding, setSelectedBuilding } = useContext(DataContext);

   // pulls selection text from dropdown and passes it back to context
   const handleSelectChange = (e, { value }) => {
      setSelectedBuilding(value);
   }

   // returns search dropdown component
   return (
      <div className="search-div">
         <Dropdown
            onChange={handleSelectChange}
            placeholder={selectedBuilding === "" ? "Building search" : selectedBuilding}
            fluid
            search
            selection
            options={pulledBuildings.map(item => {
               return {
                  key: item,
                  text: item,
                  value: item
               }
            })}
            selectOnBlur={false}
         />
      </div>
   );
}

export default SearchBar;