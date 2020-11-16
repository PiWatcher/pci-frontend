import './CountCard.css';
import React, {Component} from 'react';



class CountCard extends Component {

  // constructor for card component
  constructor(props) {
     
		super(props)

		// sets the state passed down from axios
		this.state = {
		  currentCount: this.props.count
		}
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
