
// styling
import './BuildingUsage.css';

// page imports
import React, { useState, useEffect } from 'react';

const BuildingUsage = (props) => {

   // consume props
   const { building, buildingInfo } = props;

   // state for building usage
   const [buildingUsage, setBuildingUsage] = useState(0);

   // state of usage color
   const [usageColor, setUsageColor] = useState('');

   // calculates room usage percentage without decimals
   const getBuildingUsage = () => {

      // calculate usage
      let localUsage = (buildingInfo.count / buildingUsage.capacity);

      if (localUsage <= 50) {

         // set to green text
         setUsageColor('low-usage');
      }

      else if (localUsage > 50 && localUsage <= 75) {

         // set to yellow text
         setUsageColor('moderate-usage');
      }

      else if (localUsage > 75 && localUsage <= 100) {

         // set to red text
         setUsageColor('high-usage');
      }

      // set the usage
      setBuildingUsage(localUsage);
   }

   // calculates usage on component load
   useEffect(() => {
      getBuildingUsage();
   }, [])

   // returns the count and percentage component
   return (
      <div className="building-usage-component">

         <div className="building-container">
            <p>
               {building}
            </p>

         </div>
      </div >
   )
}

export default BuildingUsage;
