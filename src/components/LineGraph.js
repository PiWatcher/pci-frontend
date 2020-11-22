import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './LineGraph.css';

class LineGraph extends Component {

   // constructor for graph component
   constructor(props) {

      super(props);

      // sets the data for the graph visual within the state
      this.state = {
         bldg: this.props.building,
         room: this.props.room,
         graphData: {
            labels: this.props.times,
            // labels: this.get_labels(),
    
            datasets: [
            {
               label: 'Count over time',
               data: this.props.counts,
               // backgroundColor: this.set_value_colors()
            }]   
         }
      
      };
   }


   componentDidUpdate(prevProps) {

      if (prevProps !== this.props){
         this.setState({
            room: this.props.room,
         })  
      }
   }

   // renders the graph with the passed down state
   render(){
      return (
         <div className="LineGraph">
            <Line
               data={this.state.graphData}

               options={{
                  title:{
                     display: true,
                     text: this.state.bldg + " " + this.state.room,
                     fontSize:25
                    },
                  maintainAspectRatio: false
               }}
            />
         </div>
      )
   }
}

export default LineGraph;
