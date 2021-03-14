
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

            let buildingData = response.data;

            let localBuildingList = [];

            // compiles list of buildings
            for (let buildingIndex = 0; buildingIndex < buildingData.data.length; buildingIndex++) {

               let buildingName = buildingData.data[buildingIndex];

               // let buildingName = buildingData.data[buildingIndex]["name"];

               // let buildingNumber = buildingData.data[buildingIndex]["number"];

               // creates building object and pushes to list 
               localBuildingList.push({

                  // name of building
                  buildingName: buildingName,

                  // static building number
                  buildingNumber: 0,

                  // static coordinates
                  buildingCoords: [35.18580, -111.65508]
               });
            }

            // sort buildings alphabetically
            localBuildingList = localBuildingList.sort(function (a, b) {
               return a.buildingName.localeCompare(b.buildingName, undefined, {
                  numeric: false,
                  sensitivity: 'base'
               });
            });

            // sets state to sorted list of buildings
            setBuildingList(localBuildingList);
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
