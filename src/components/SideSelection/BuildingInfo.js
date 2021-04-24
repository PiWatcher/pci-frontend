
// styling
import './BuildingInfo.css';

// page imports
import React from 'react';

// component for displaying selected building information
const BuildingInfo = (props) => {

   // consume props from parent component
   const { selectedBuilding } = props;

   // returns info for selected building
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
