import './CountCard.css';
import React, {Component} from 'react';



class CountCard extends Component{

    constructor() {
        super()

        this.state = {
            
            currentCount: 245

        }
    }
    
  render () {
      return (
        <div className="count-card">
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
