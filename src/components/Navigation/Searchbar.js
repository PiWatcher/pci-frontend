
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
*
* @param {props} props
*/
const Searchbar = (props) => {

   const {

      // {list} pulled buildings from back end database
      pulledBuildings } = props;

   const {

      // {string} building selected by the user
      selectedBuilding,

      // {function} set the selected building
      setSelectedBuilding

   } = useContext(DataContext);


   /** 
   * Function: handleSelectChange
   * 
   * Pulls selection text from dropdown and sets it to state
   * 
   * @param {event} event
   */
   const handleSelectChange = (event, { value }) => {
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
            options={
               pulledBuildings.map(item => {
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