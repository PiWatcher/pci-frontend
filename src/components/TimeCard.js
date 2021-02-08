
// styling
import './TimeCard.css';

// page imports
import React, { useState, useEffect } from 'react';

const TimeCard = () => {

   // spelled out months for date pull
   const months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];

   // state variable for current date
   const [currentDate] = useState(`${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`);

   // state variable for current time
   const [currentTime, setCurrentTime] = useState(`${new Date().toLocaleTimeString('en-US')}`);


   // updates state and time component every second
   useEffect(() => {
      let seconds = setInterval(() => {
         setCurrentTime(`${new Date().toLocaleTimeString('en-US')}`)
      }, 1000)

      return () => clearInterval(seconds);
   }, [])


   // returns component with live updating local time
   return (
      <div className="TimeCard">
         <div className="text-container">
            <h1>Welcome, "User"</h1>
            <div className="date-container">
               {currentDate}
            </div>
            <div className="time-container">
               {currentTime}
            </div>
         </div>
      </div>
   )
}

export default TimeCard;
