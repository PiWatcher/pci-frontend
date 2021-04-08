
// styling
import './BuildingInfo.css';

// page imports
import React, { useState } from 'react';

// component for displaying selected building information
const BuildingInfo = (props) => {

   // consume props from parent component
   const { building, buildingInfo } = props;

   // state for building number
   const [buildingNumber, setBuildingNumber] = useState(4);

   // returns the count and percentage component
   return (
      <div className="building-usage-component">

         <div className="building-container">
            <div className="building-name">
               {building.toUpperCase()}
            </div>
         </div>
      </div >
   )
}

export default BuildingInfo;
