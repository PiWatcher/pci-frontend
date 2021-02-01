import './CountCard.css';
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';

const CountCard = () => {

  const { currentCount, roomCapacity } = useContext(DataContext);

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
