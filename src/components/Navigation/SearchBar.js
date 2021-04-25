
// styling
import './Searchbar.css';
import 'semantic-ui-css/semantic.min.css'

// page imports
import React, { useContext } from 'react';

// contexts
import { DataContext } from '../../contexts/DataContext';

// components
import { Dropdown } from 'semantic-ui-react';


/** 
* Component: Searchbar
* 
* Searchbar component for searching and selecting buildings
*/
const Searchbar = (props) => {

   const { pulledBuildings } = props;

   const { selectedBuilding, setSelectedBuilding } = useContext(DataContext);


   /** 
   * Function: handleSelectChange
   * 
   * Pulls selection text from dropdown and sets it to state
   */
   const handleSelectChange = (e, { value }) => {
      setSelectedBuilding(value);
   }


   /** 
    * Return: Searchbar JSX
    * 
    * Returns the layout for display in the browser
    */
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

export default Searchbar;