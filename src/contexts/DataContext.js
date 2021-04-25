
// page imports
import React, { createContext, useState } from 'react';

// exports
export const DataContext = createContext();


/** 
* Context: DataContextProvider
* 
* Context that handles the storage and sharing of user selected building/room data
*/
const DataContextProvider = (props) => {

   // selected building in state
   const [selectedBuilding, setSelectedBuilding] = useState('');

   // list of selected building/room objects for use in ChartLayout
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
