import './TimeCard.css';
import React, { useState, useEffect} from 'react';

const TimeCard = () => {

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
 
    useEffect(() => {
        let seconds = setInterval( () => {
            setCurrentTime(new Date().toLocaleString())
        }, 1000)

        return () => clearInterval(seconds);
    }, [])


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
