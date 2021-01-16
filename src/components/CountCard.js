import './CountCard.css';
import React, {useContext} from 'react';
import { CountContext } from '../contexts/CountContext';

const CountCard = () => {

  const { currentCount } = useContext( CountContext );
  
      return (
        <div className="CountCard">
            <div className="text-container">
                Current Count: 
                <div className="num-container">
                    {currentCount} / 100
                </div>
            </div>
        </div>
      )
    }

export default CountCard;
