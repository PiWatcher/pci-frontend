
// page imports
import React, { createContext, useState } from 'react';

// exports
export const DataContext = createContext();


/** 
* Context: DataContextProvider
* 
* Context that handles the storage and sharing of user selected building/room data
*
* @param {props} props
*/
const DataContextProvider = (props) => {

   // {string} building selected by the user
   const [selectedBuilding, setSelectedBuilding] = useState('');

   // {list} user selected building/room objects for use in ChartLayout
   const [selectedCharts, setSelectedCharts] = useState([]);


   /** 
   * Return: DataContextProvider JSX
   * 
   * Returns props for use by the children components
   */
   return (
      <DataContext.Provider value={{ selectedBuilding, setSelectedBuilding, selectedCharts, setSelectedCharts }}>
         {props.children}
      </DataContext.Provider>
   )
}

export default DataContextProvider
