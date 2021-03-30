
// page imports
import React, { useContext, useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

// contexts
import { DataContext } from '../../contexts/DataContext';
import 'semantic-ui-css/semantic.min.css'


const SearchBar = () => {

   // consumes context
   const { selectedBuilding, setSelectedBuilding, baseURL } = useContext(DataContext);

   // creates state: list of buildings pulled from endpoint
   const [buildingList, setBuildingList] = useState([]);


   // pulls selection text from dropdown and passes it back to context
   const handleSelectChange = (e, { value }) => {
      setSelectedBuilding(value);
   }

   // API pull and parse logic for buildings (on dashboard load after login)
   const getBuildings = async () => {

      const buildingListEndpoint = `${baseURL}:5000/api/data/buildings`;

      // tries to pull and parse building data
      try {
         const response = await axios({
            method: 'get',
            url: buildingListEndpoint
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            // sets state list of buildings and their information
            setBuildingList(response.data.data);
         }
      }

      // failed to pull and parse the building list
      catch {
         console.log("Failed to pull buildings.");
      }
   };

   // pulls buildings on initial page load
   useEffect(() => {
      getBuildings();
   }, [])


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