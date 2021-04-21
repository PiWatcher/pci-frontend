
// page imports
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 

// context that stores selected building and rooms
export const DataContext = createContext();

const DataContextProvider = (props) => {

   // production base url
   // const baseURL = process.env.REACT_APP_BASE_URL;
   const baseURL = "http://localhost"

   // creates state: selected building
   const [selectedBuilding, setSelectedBuilding] = useState('');

   // creates state: selected room
   const [selectedCharts, setSelectedCharts] = useState([]);

   // // API pull and parse logic for counts and timestamps
   const mockData = async () => {

      const mockDataEndpoint = `${baseURL}:5000/api/mock/update`

      // tries to pull chart data
      try {
         const response = await axios({
            method: 'get',
            url: mockDataEndpoint,
            params: {
               building: 'Siccs',
               iterations: 1
            }
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            console.log(response);

         }
      }

      // failed to pull chart data
      catch (error) {
         console.error('Error', error.response);
      }
   };

   // on room change or query change, resets pull timer
   useEffect(() => {

      mockData();

      // // five seconds interval for data refresh 
      // const interval = setInterval(() => {
      //    console.log('mocking data');
      //    mockData();
      // }, 5000);

      // return () => clearInterval(interval);

   }, []);

   return (
      <DataContext.Provider value={{
         selectedBuilding, setSelectedBuilding, selectedCharts, setSelectedCharts, baseURL
      }}>
         { props.children}
      </DataContext.Provider>
   )
}

export default DataContextProvider
