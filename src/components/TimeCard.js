
// styling
import './TimeCard.css';

// page imports
import React, { useState, useContext, useEffect } from 'react';

// contexts
import { AuthContext } from '../contexts/AuthContext';

const TimeCard = () => {


   const { userName } = useContext(AuthContext);



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
      <div className="time-card-container">
         <div className="date-container">
            <p>
               {currentDate}
            </p>
         </div>

         <div className="time-container">
            <p>
               {currentTime}
            </p>
         </div>

         <div className="welcome-container">
            <p>
               Welcome, {userName}
            </p>
         </div>
      </div>
   )
}

export default TimeCard;
