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
        currentCount: this.props.counts,
      }  
  }

  componentDidUpdate(prevProps) {

    if (prevProps !== this.props){
       this.setState({
          currentCount: this.props.counts

       })  
    }

 }
  
  get_current_count = () => {
    return Object.values(Object.values(Object.values(this.props.bldg_data)[0])[3])[5]
  }
  // renders the card with the passed data
  render () {
      
      return (
        
        <div className="CountCard">
            <div className="text-container">
                Current Count: 
                <div className="num-container">
                    
                    {this.state.currentCount} / 100
                </div>
            </div>
        </div>
      )
    }
  }

export default CountCard;
