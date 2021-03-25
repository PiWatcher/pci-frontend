
// styling
import './BuildingUsage.css';

// page imports
import React, { useState, useEffect } from 'react';


const BuildingUsage = (props) => {

   // consume props
   const { building, buildingInfo } = props;

   // state for building usage
   const [buildingUsage, setBuildingUsage] = useState(0);

   // state for trend symbol
   const [usageColor, setUsageColor] = useState('');


   // calculates room percentage without decimals
   const getBuildingUsage = () => {

      let localUsage = (buildingInfo.count / buildingUsage.capacity);

      if (localUsage <= 50) {

         // set to green text
         setUsageColor('low-usage');
      }

      else if (localUsage > 50 && localUsage <= 75) {

         // set to red down arrow
         setUsageColor('moderate-usage');
      }

      else if (localUsage > 75 && localUsage <= 100) {

         // set to horizontal line
         setUsageColor('high-usage');
      }

      setBuildingUsage(localUsage);
   }

   // updates components with pulled rooms after building selection
   useEffect(() => {
      getBuildingUsage();
   })

   // returns the count and percentage card
   return (
      <div className="building-usage-component">

         <div className="building-container">
            <p>
               {building}
            </p>

         </div>

         <div className={`percent-container ${usageColor}`}>
            {buildingUsage}%
         </div>
      </div>
   )
}

export default BuildingUsage;
