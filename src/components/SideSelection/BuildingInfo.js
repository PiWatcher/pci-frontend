
// styling
import './BuildingInfo.css';

// page imports
import React from 'react';

/** 
  * Component: BuildingInfo
  * 
  * Component for displaying the building information within SideSelection
  * 
  * @param {props} props
  */
const BuildingInfo = (props) => {

   const {

      // {string} building selected by the user
      selectedBuilding

   } = props;


   /** 
    * Return: BuildingInfo JSX
    * 
    * Returns the layout for display in the browser
    */
   return (
      <div className="building-info-component">
         <div className="building-container">
            <div className="building-name">
               {selectedBuilding.toUpperCase()}
            </div>
         </div>
      </div >
   )
}

export default BuildingInfo;
