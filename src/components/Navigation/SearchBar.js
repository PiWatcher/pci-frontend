
// styling
import './SearchBar.css';
import 'semantic-ui-css/semantic.min.css'

// page imports
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

// components
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { DataContext } from '../../contexts/DataContext';

// search bar with self containing building list state
const SearchBar = () => {

   // consumes context
   const { selectedBuilding, setSelectedBuilding, baseURL } = useContext(DataContext);

   // creates state: list of buildings pulled from endpoint
   const [buildingList, setBuildingList] = useState([]);

   // state for alert
   const [showAlert, setShowAlert] = useState(false);

   // pulls selection text from dropdown and passes it back to context
   const handleSelectChange = (e, { value }) => {
      setSelectedBuilding(value);
   }

   // API pull and parse logic for buildings (on dashboard load after login)
   const getBuildings = useCallback(async () => {

      // endpoint URL
      const buildingListEndpoint = `${baseURL}:5000/api/data/buildings`;

      // tries to pull and parse building data
      try {
         const response = await axios({
            method: 'get',
            url: buildingListEndpoint
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            let responseData = response.data.data;

            // sorts buildings
            let localBuildingList = responseData.sort(function (a, b) {
               return a.localeCompare(b, undefined, {
                  numeric: false,
                  sensitivity: 'base'
               });
            });

            // sets state list of buildings
            setBuildingList(localBuildingList);
         }
      }

      // failed to pull and parse the building list
      catch (error) {

         // display alert
         setShowAlert(true);

         // display error to console for debugging
         console.error('Error', error.response);
      }
   }, [baseURL]);

   // pulls buildings on initial page load
   useEffect(() => {

      getBuildings();

   }, [getBuildings])

   // returns search dropdown component
   return (
      <div className="search-div">
         <Dropdown
            onChange={handleSelectChange}
            placeholder={selectedBuilding === "" ? "Building search" : selectedBuilding}
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

         {showAlert === true ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
               description={`Failed to pull data from endpoint: building list`} />
            :
            null}
      </div>
   );
}

export default SearchBar;