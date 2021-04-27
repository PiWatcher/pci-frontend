
// page imports
import React, { createContext } from 'react';

//exports
export const EnvironmentContext = createContext();


/** 
* Context: EnvironmentContextProvider
* 
* Context that handles the storage and sharing of environment variables set by Docker
*
* @param {props} props
*/
const EnvironmentContextProvider = (props) => {

   // {string} base url shared within utility functions (assigned within docker-compose)
   const baseURL = process.env.REACT_APP_BASE_URL;


   /** 
  * Return: EnvironmentContextProvider JSX
  * 
  * Returns props for use by the children components
  */
   return (
      <EnvironmentContext.Provider value={{ baseURL }}>
         {props.children}
      </EnvironmentContext.Provider>
   )
}

export default EnvironmentContextProvider
