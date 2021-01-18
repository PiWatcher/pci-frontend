import './CountCard.css';
import React, {useContext, useState, useEffect} from 'react';
import { CountContext } from '../contexts/CountContext';

const CountCard = () => {

  const { currentCount, roomCapacity } = useContext( CountContext );

  const [ roomPercentage, setRoomPercentage ] = useState(0);


  const getCapacityPercentage = () => {
    const percentage = (currentCount / roomCapacity) * 100;
    setRoomPercentage(percentage);
  }

  // BUG: count card not rerendering in sequence with the graph
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
