import './CountCard.css';
import React, {Component} from 'react';



class CountCard extends Component{

  constructor() {
      super()

      this.state = {
            
          currentCount: 364

      }
  }
    
  render () {
      return (
        <div className="CountCard">
            <div className="text-container">
                Current Count: 
                <div className="num-container">
                    {this.state.currentCount} / 1000
                </div>
            </div>
        </div>
      )
    }
  }

export default CountCard;
