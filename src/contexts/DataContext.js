
// page imports
import React, { createContext, useState } from 'react';

// context that pulls data from backend and parses
export const DataContext = createContext();

const DataContextProvider = (props) => {

   // production base url
   // const baseURL = process.env.REACT_APP_BASE_URL;
   const baseURL = "http://localhost"

   // creates state: selected building
   const [selectedBuilding, setSelectedBuilding] = useState('');

   // creates state: selected room
   const [selectedCharts, setSelectedCharts] = useState([]);

   return (
      <DataContext.Provider value={{
         selectedBuilding, setSelectedBuilding, selectedCharts, setSelectedCharts, baseURL
      }}>
         { props.children}
      </DataContext.Provider>
   )
}

export default DataContextProvider
