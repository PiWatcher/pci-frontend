
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
   const { building, currentCount, roomCapacity } = useContext(DataContext);

   // local variable for room capacity percentage
   const [roomPercentage, setRoomPercentage] = useState(0);

   const [trendIcon, setTrendIcon] = useState(upArrow);


   // calculates room percentage without decimals
   const getCapacityPercentage = () => {
      const percentage = (currentCount / roomCapacity) * 100;

      if (percentage > roomPercentage) {

         // set to green up arrow
         setTrendIcon(upArrow);

      }

      else if (percentage < roomPercentage) {

         // set to red down arrow
         setTrendIcon(downArrow);
      }

      else {
         // set to blue horizontal line
         setTrendIcon(horizontalLine);
      }

      setRoomPercentage(Math.trunc(percentage));
   }


   const updateCard = () => {
      getCapacityPercentage();
   }


   // BUG: count card not rerendering in sequence with the graph (issue with async)
   useEffect(() => {

      //updateCard();

   }, [currentCount])


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
               <p>
                  {roomPercentage}%
               </p>
            </div>

            <div className="trend-container">
               <img className="logo" src={trendIcon} alt="Current trend of building" />
            </div>
         </div>
      </div>
   )
}

export default CountCard;
