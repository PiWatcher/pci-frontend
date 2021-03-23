
// page imports
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


// context that pulls data from backend and parses
export const DataContext = createContext();

const DataContextProvider = (props) => {

   // production base url
   const baseURL = process.env.REACT_APP_BASE_URL;

   // creates state: selected building
   const [selectedBuilding, setSelectedBuilding] = useState('');

   // creates state: selected room
   const [selectedRooms, setSelectedRooms] = useState([]);

   // creates state: list of buildings pulled from endpoint
   const [buildingList, setBuildingList] = useState([]);


   // API pull and parse logic for buildings
   const getBuildings = async () => {

      // tries to pull and parse building data
      try {
         const response = await axios({
            method: 'get',
            url: `${baseURL}:5000/api/data/buildings`
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            // sets state list of buildings and their information
            setBuildingList(response.data);
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

   return (
      <DataContext.Provider value={{
         buildingList, selectedBuilding, setSelectedBuilding, selectedRooms, setSelectedRooms, baseURL
      }}>
         { props.children}
      </DataContext.Provider>
   )
}

export default DataContextProvider
