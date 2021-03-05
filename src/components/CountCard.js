
// styling
import './CountCard.css';

// page imports
import React, { useContext, useState, useEffect } from 'react';
import upArrow from '../images/Green_Arrow_Up.svg';
import downArrow from '../images/Red_Arrow_Down.svg'
import horizontalLine from '../images/Horizontal_Line.svg';

// contexts
import { DataContext } from '../contexts/DataContext';


const CountCard = () => {

   // consume data from DataContext
   const { building, roomList } = useContext(DataContext);

   // state for building usage
   const [buildingUsage, setBuildingUsage] = useState(0);

   // state for trend symbol
   const [trendIcon, setTrendIcon] = useState(horizontalLine);


   // calculates room percentage without decimals
   const getBuildingUsage = () => {

      let buildingCount = 0;
      let buildingCapacity = 0;

      for (let roomIndex = 0; roomIndex < roomList.length; roomIndex++) {

         buildingCount += roomList[roomIndex].count;
         buildingCapacity += roomList[roomIndex].capacity;
      }

      let localUsage = Math.trunc((buildingCount / buildingCapacity) * 100);

      if (localUsage > buildingUsage) {

         // set to green up arrow
         setTrendIcon(upArrow);

      }

      else if (localUsage < buildingUsage) {

         // set to red down arrow
         setTrendIcon(downArrow);

      }

      else {

         // set to blue horizontal line
         setTrendIcon(horizontalLine);

      }

      setBuildingUsage(localUsage);
   }

   useEffect(() => {

      building !== '' && getBuildingUsage();

   })

   // returns the count and percentage card
   return (
      <div className="count-card-component">

         <div className="bldg-container">
            <p>
               {building}
            </p>

         </div>

         <div className="count-row">
            <div className="per-container">
               {buildingUsage}%
            </div>

            <div className="trend-container">
               <img className="logo" src={trendIcon} alt="Current trend of building" />
            </div>
         </div>
      </div>
   )
}

export default CountCard;
