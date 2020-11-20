import './CountCard.css';
import React, {Component} from 'react';



class CountCard extends Component {

  // constructor for card component
  constructor(props) {
      super(props);
      //this.props = props
      //console.log(count_from_json[0]) 
      // sets the state passed down from axios
      this.state = {
        currentCount: this.get_current_count()
      }
      
      
      
      
  }
  
  get_current_count = () => {
    return Object.values(Object.values(Object.values(this.props.bldg_data)[0])[3])[3]
  }
  // renders the card with the passed data
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
