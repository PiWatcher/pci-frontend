
// styling
import './CountCard.css';

// page imports
import React, { useContext, useState, useEffect } from 'react';

// contexts
import { DataContext } from '../contexts/DataContext';


const CountCard = () => {

   // consume data from DataContext
   const { currentCount, roomCapacity } = useContext(DataContext);

   // local variable for room capacity percentage
   const [roomPercentage, setRoomPercentage] = useState(0);


   // calculates room percentage without decimals
   const getCapacityPercentage = () => {
      const percentage = (currentCount / roomCapacity) * 100;
      setRoomPercentage(Math.trunc(percentage));
   }

   // BUG: count card not rerendering in sequence with the graph (issue with async)
   useEffect(() => {

      getCapacityPercentage();

   }, [currentCount])


   // returns the count and percentage card
   return (
      <div className="CountCard">
         <div className="text-container">
            Current Count:
        <div className="num-container">
               {currentCount} / {roomCapacity}
            </div>
            <div className="per-container">
               {roomPercentage} %
        </div>
         </div>
      </div>
   )
}

export default CountCard;
