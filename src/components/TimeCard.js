
// styling
import './TimeCard.css';

// page imports
import React, { useState, useEffect } from 'react';

const TimeCard = () => {

   // local variable for current time
   const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

   // updates state and time component every second
   useEffect(() => {
      let seconds = setInterval(() => {
         setCurrentTime(new Date().toLocaleString())
      }, 1000)

      return () => clearInterval(seconds);
   }, [])


   // returns component with live updating local time
   return (
      <div className="TimeCard">
         <div className="text-container">
            Current time:
        <div className="num-container">
               {currentTime}
            </div>
         </div>
      </div>
   )
}

export default TimeCard;
